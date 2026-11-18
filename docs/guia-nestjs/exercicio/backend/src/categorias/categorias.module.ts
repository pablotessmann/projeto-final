import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Categoria } from './categoria.entity';
import { CategoriasController } from './categorias.controller';
import { CategoriasService } from './categorias.service';

// Junta tudo o que é de categorias: entidade, service e controller
@Module({
  imports: [TypeOrmModule.forFeature([Categoria])],
  controllers: [CategoriasController],
  providers: [CategoriasService],
})
export class CategoriasModule {}
