import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Postagem } from '../entities/postagem.entity';
import { DeleteResult, ILike, Repository } from 'typeorm';
import { TemaService } from 'src/tema/services/tema.service';

@Injectable()
export class PostagemService {
  constructor(
    @InjectRepository(Postagem)
    private postagemRepository: Repository<Postagem>,
    private temaService: TemaService
  ) {}

  async findaAll(): Promise<Postagem[]> {
    return await this.postagemRepository.find({
      relations: {
        tema: true
      }
    });
  }
//is shoqing error all the time
  async findById(id: number): Promise<Postagem> {

    let postagem = await this.postagemRepository.findOne({
      where:{
        id
      },
      relations: {
        tema: true
      }

    });

    if (!postagem)
      throw new HttpException('Postagem nao encontrada!', HttpStatus.NOT_FOUND);
    return postagem;
  }

  async findByTitulo(titulo: string) : Promise<Postagem[]>{
    return await this.postagemRepository.find({
      where:{
        titulo: ILike(`%${titulo}%`)
        },
        relations: {
          tema: true
        }
    })
  }

  async create(postagem: Postagem): Promise<Postagem>{

    if (postagem.tema){

      let tema = await this.temaService.findById(postagem.tema.id)

      if(tema)
        throw new HttpException("Tema não foi encontrado!" , HttpStatus.NOT_FOUND)

      return await this.postagemRepository.save(postagem);

    }
    return await this.postagemRepository.save(postagem);
  }

  async update(postagem: Postagem): Promise<Postagem>{

    let buscaPostagem: Postagem = await this.findById(postagem.id);

    if (!buscaPostagem || !postagem.id)
      throw new HttpException('Postagem não foi encontrada!', HttpStatus.NOT_FOUND)

    if (postagem.tema){

      let tema = await this.temaService.findById(postagem.tema.id)

      if(tema)
        throw new HttpException("Tema não foi encontrado!" , HttpStatus.NOT_FOUND)

      return await this.postagemRepository.save(postagem);

    }
    
    return await this.postagemRepository.save(postagem);
  }
  // INSERT INTO tb_postagens (titulo, texto, data) VALUES (?, ?, server);

  async delete(id: number): Promise<DeleteResult>{

    let buscaPostagem: Postagem = await this.findById(id);

    if (!buscaPostagem)
      throw new HttpException('Postagem não foi encontrada!', HttpStatus.NOT_FOUND)
    
    return await this.postagemRepository.delete(id);
  }

  }

