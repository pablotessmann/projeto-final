using Api.Models;
using Dapper;
using MySqlConnector;

var builder = WebApplication.CreateBuilder(args);

// 1. Connection string: vem do arquivo .env, entregue pelo Docker
var conexao = builder.Configuration.GetConnectionString("Padrao")
    ?? throw new InvalidOperationException(
        "Connection string 'Padrao' não encontrada.");

// 2. CORS: autoriza o site Vue (localhost:3000) a chamar esta API
builder.Services.AddCors(opcoes =>
    opcoes.AddDefaultPolicy(politica => politica
        .WithOrigins("http://localhost:3000")
        .AllowAnyHeader()
        .AllowAnyMethod()));

var app = builder.Build();
app.UseCors();

// 3. Rotas
app.MapGet("/", () => "API do projeto final no ar!");

// Listar todos
app.MapGet("/api/produtos", async () =>
{
    await using var con = new MySqlConnection(conexao);
    return await con.QueryAsync<Produto>(
        "SELECT id, nome, preco FROM produtos ORDER BY nome");
});

// Buscar um pelo id
app.MapGet("/api/produtos/{id:int}", async (int id) =>
{
    await using var con = new MySqlConnection(conexao);
    var produto = await con.QuerySingleOrDefaultAsync<Produto>(
        "SELECT id, nome, preco FROM produtos WHERE id = @id", new { id });
    return produto is null ? Results.NotFound() : Results.Ok(produto);
});

// Cadastrar
app.MapPost("/api/produtos", async (Produto produto) =>
{
    await using var con = new MySqlConnection(conexao);
    produto.Id = await con.ExecuteScalarAsync<int>(
        "INSERT INTO produtos (nome, preco) VALUES (@Nome, @Preco);" +
        "SELECT LAST_INSERT_ID();", produto);
    return Results.Created($"/api/produtos/{produto.Id}", produto);
});

// Atualizar
app.MapPut("/api/produtos/{id:int}", async (int id, Produto produto) =>
{
    await using var con = new MySqlConnection(conexao);
    var linhas = await con.ExecuteAsync(
        "UPDATE produtos SET nome = @Nome, preco = @Preco WHERE id = @Id",
        new { produto.Nome, produto.Preco, Id = id });
    return linhas == 0 ? Results.NotFound() : Results.NoContent();
});

// Excluir
app.MapDelete("/api/produtos/{id:int}", async (int id) =>
{
    await using var con = new MySqlConnection(conexao);
    var linhas = await con.ExecuteAsync(
        "DELETE FROM produtos WHERE id = @id", new { id });
    return linhas == 0 ? Results.NotFound() : Results.NoContent();
});

app.Run();
