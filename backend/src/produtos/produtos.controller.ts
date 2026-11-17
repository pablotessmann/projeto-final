import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { ProdutoDto } from './produto.dto';
import { Produto } from './produto.entity';
import { ProdutosService } from './produtos.service';

// Rotas /api/produtos (os @Api... servem só para a documentação do Swagger)
@ApiTags('produtos')
@Controller('api/produtos')
export class ProdutosController {
  constructor(private readonly produtosService: ProdutosService) {}

  // Listar todos
  @Get()
  @ApiOperation({ summary: 'Lista todos os produtos' })
  @ApiOkResponse({ type: [Produto] })
  listar() {
    return this.produtosService.listar();
  }

  // Buscar um pelo id (ParseIntPipe: o id precisa ser número)
  @Get(':id')
  @ApiOperation({ summary: 'Busca um produto pelo id' })
  @ApiOkResponse({ type: Produto })
  @ApiNotFoundResponse({ description: 'Produto não encontrado' })
  async buscar(@Param('id', ParseIntPipe) id: number) {
    const produto = await this.produtosService.buscarPorId(id);
    if (!produto) throw new NotFoundException();
    return produto;
  }

  // Cadastrar (responde 201 com o produto e o id novo)
  @Post()
  @ApiOperation({ summary: 'Cadastra um produto' })
  @ApiCreatedResponse({ type: Produto })
  criar(@Body() dados: ProdutoDto) {
    return this.produtosService.criar(dados);
  }

  // Atualizar (responde 204 = sucesso sem conteúdo)
  @Put(':id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Altera um produto' })
  @ApiNoContentResponse({ description: 'Produto alterado' })
  @ApiNotFoundResponse({ description: 'Produto não encontrado' })
  async atualizar(@Param('id', ParseIntPipe) id: number, @Body() dados: ProdutoDto) {
    const linhas = await this.produtosService.atualizar(id, dados);
    if (linhas === 0) throw new NotFoundException();
  }

  // Excluir (responde 204 = sucesso sem conteúdo)
  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Exclui um produto' })
  @ApiNoContentResponse({ description: 'Produto excluído' })
  @ApiNotFoundResponse({ description: 'Produto não encontrado' })
  async excluir(@Param('id', ParseIntPipe) id: number) {
    const linhas = await this.produtosService.excluir(id);
    if (linhas === 0) throw new NotFoundException();
  }
}
