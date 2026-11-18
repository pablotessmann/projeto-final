import { ApiProperty } from '@nestjs/swagger';

// Dados que o cliente envia para cadastrar ou alterar uma categoria (sem o id)
export class CategoriaDto {
  @ApiProperty({ example: 'Papelaria' })
  nome: string;

  // required: false -> o Swagger mostra o campo como opcional
  @ApiProperty({ example: 'Cadernos, canetas e lápis', required: false })
  descricao?: string;
}
