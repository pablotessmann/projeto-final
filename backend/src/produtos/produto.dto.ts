import { ApiProperty } from '@nestjs/swagger';

// Dados que o cliente envia para cadastrar ou alterar um produto (sem o id).
// Os @ApiProperty fazem o Swagger mostrar os campos e um exemplo.
export class ProdutoDto {
  @ApiProperty({ example: 'Mochila' })
  nome: string;

  @ApiProperty({ example: 89.9 })
  preco: number;
}
