import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

// Uma linha da tabela categorias
@Entity('categorias')
export class Categoria {
  @ApiProperty({ example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'Papelaria' })
  @Column()
  nome: string;

  // nullable: true -> a coluna aceita NULL (campo opcional)
  @ApiProperty({ example: 'Cadernos, canetas e lápis', nullable: true })
  @Column({ type: 'varchar', nullable: true })
  descricao: string | null;
}
