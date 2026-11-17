import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProdutoDto } from './produto.dto';
import { Produto } from './produto.entity';

// Regras de acesso ao banco para a tabela produtos.
// O TypeORM monta o SQL com parâmetros (nada de juntar texto).
@Injectable()
export class ProdutosService {
  constructor(
    @InjectRepository(Produto)
    private readonly repositorio: Repository<Produto>,
  ) {}

  listar() {
    return this.repositorio.find({ order: { nome: 'ASC' } });
  }

  buscarPorId(id: number) {
    return this.repositorio.findOneBy({ id });
  }

  criar(dados: ProdutoDto) {
    const produto = this.repositorio.create({ nome: dados.nome, preco: dados.preco });
    return this.repositorio.save(produto);
  }

  // Retorna quantas linhas foram alteradas (0 = id não existe)
  async atualizar(id: number, dados: ProdutoDto) {
    const resultado = await this.repositorio.update(id, {
      nome: dados.nome,
      preco: dados.preco,
    });
    return resultado.affected ?? 0;
  }

  // Retorna quantas linhas foram excluídas (0 = id não existe)
  async excluir(id: number) {
    const resultado = await this.repositorio.delete(id);
    return resultado.affected ?? 0;
  }
}
