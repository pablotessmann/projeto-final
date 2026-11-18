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
import { CategoriaDto } from './categoria.dto';
import { Categoria } from './categoria.entity';
import { CategoriasService } from './categorias.service';

// Rotas /api/categorias
@ApiTags('categorias')
@Controller('api/categorias')
export class CategoriasController {
  constructor(private readonly categoriasService: CategoriasService) {}

  @Get()
  @ApiOperation({ summary: 'Lista todas as categorias' })
  @ApiOkResponse({ type: [Categoria] })
  listar() {
    return this.categoriasService.listar();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Busca uma categoria pelo id' })
  @ApiOkResponse({ type: Categoria })
  @ApiNotFoundResponse({ description: 'Categoria não encontrada' })
  async buscar(@Param('id', ParseIntPipe) id: number) {
    const categoria = await this.categoriasService.buscarPorId(id);
    if (!categoria) throw new NotFoundException();
    return categoria;
  }

  @Post()
  @ApiOperation({ summary: 'Cadastra uma categoria' })
  @ApiCreatedResponse({ type: Categoria })
  criar(@Body() dados: CategoriaDto) {
    return this.categoriasService.criar(dados);
  }

  @Put(':id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Altera uma categoria' })
  @ApiNoContentResponse({ description: 'Categoria alterada' })
  @ApiNotFoundResponse({ description: 'Categoria não encontrada' })
  async atualizar(@Param('id', ParseIntPipe) id: number, @Body() dados: CategoriaDto) {
    const linhas = await this.categoriasService.atualizar(id, dados);
    if (linhas === 0) throw new NotFoundException();
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Exclui uma categoria' })
  @ApiNoContentResponse({ description: 'Categoria excluída' })
  @ApiNotFoundResponse({ description: 'Categoria não encontrada' })
  async excluir(@Param('id', ParseIntPipe) id: number) {
    const linhas = await this.categoriasService.excluir(id);
    if (linhas === 0) throw new NotFoundException();
  }
}
