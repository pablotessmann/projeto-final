import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoriaDto } from './categoria.dto';
import { Categoria } from './categoria.entity';

// Acesso ao banco para a tabela categorias
@Injectable()
export class CategoriasService {
  constructor(
    @InjectRepository(Categoria)
    private readonly repositorio: Repository<Categoria>,
  ) {}

  listar() {
    return this.repositorio.find({ order: { nome: 'ASC' } });
  }

  buscarPorId(id: number) {
    return this.repositorio.findOneBy({ id });
  }

  criar(dados: CategoriaDto) {
    const categoria = this.repositorio.create({
      nome: dados.nome,
      descricao: dados.descricao ?? null,
    });
    return this.repositorio.save(categoria);
  }

  // Retorna quantas linhas foram alteradas (0 = id não existe)
  async atualizar(id: number, dados: CategoriaDto) {
    const resultado = await this.repositorio.update(id, {
      nome: dados.nome,
      descricao: dados.descricao ?? null,
    });
    return resultado.affected ?? 0;
  }

  // Retorna quantas linhas foram excluídas (0 = id não existe)
  async excluir(id: number) {
    const resultado = await this.repositorio.delete(id);
    return resultado.affected ?? 0;
  }
}
