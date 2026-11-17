import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

// Uma linha da tabela produtos
// (@ApiProperty: mostra o formato do produto nas respostas do Swagger)
@Entity('produtos')
export class Produto {
  @ApiProperty({ example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'Mochila' })
  @Column()
  nome: string;

  // DECIMAL chega do MySQL como texto; o transformer converte para número
  @ApiProperty({ example: 89.9 })
  @Column('decimal', {
    precision: 10,
    scale: 2,
    transformer: {
      to: (valor: number) => valor,
      from: (valor: string | null) => (valor === null ? null : Number(valor)),
    },
  })
  preco: number;
}
