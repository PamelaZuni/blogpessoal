import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { IsNotEmpty } from "class-validator";
import { Postagem } from "src/postagem/entities/postagem.entity";

@Entity({name: "tb_temas"})
export class Tema {
  static id(id: any) {
    throw new Error("Method not implemented.");
  }
  [x: string]: any;
  
  @PrimaryGeneratedColumn()
  id: number

  @IsNotEmpty()
  @Column({length: 255, nullable: false})
  descricao: string

  @OneToMany(() => Postagem, (postagem) => postagem.tema)
  postagem: Postagem[]
}
