import { IsNotEmpty } from 'class-validator';
import { Tema } from 'src/tema/entities/tema.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn,
} from 'typeorm';
import { Transform, TransformFnParams } from 'class-transformer';

@Entity({ name: 'tb_postagens' })
export class Postagem {
  @PrimaryGeneratedColumn() // define a Chave Primaria e auto_increment
  id: number;

  @Transform(({ value }: TransformFnParams) => value?.trim)
  @IsNotEmpty()
  @Column({ length: 100, nullable: false })
  titulo: string;

  @Transform(({ value }: TransformFnParams) => value?.trim)
  @IsNotEmpty()
  @Column({ length: 1000, nullable: false })
  texto: string;

  @UpdateDateColumn()
  data: Date;

  @ManyToOne(() => Tema, (tema) => tema.postagem, {
    onDelete: 'CASCADE',
    
  })
  tema: Tema;
  
}
