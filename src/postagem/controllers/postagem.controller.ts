import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  HttpCode,
  HttpStatus,
  Param,
  Body,
  HttpException,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/guard/jwt-auth.guard';
import { PostagemService } from '../services/postagem.service';
import { Postagem } from '../entities/postagem.entity';

@UseGuards(JwtAuthGuard)
@Controller('/postagens')
export class PostagemController {
  constructor(private readonly postagemService: PostagemService) {}

  @Get()
  @HttpCode(HttpStatus.OK) // HTTP Status 200
  findAll(): Promise<Postagem[]> {
    return this.postagemService.findaAll();
  }
  @Get('/:id')
  @HttpCode(HttpStatus.OK) // HTTP Status 200
  findById(@Param('id', ParseIntPipe) id: number): Promise<Postagem> {
    return this.postagemService.findById(id);
  }
  @Get('/titulo/:titulo')
  @HttpCode(HttpStatus.OK) // HTTP Status 200
  findByTitulo(@Param('titulo') titulo: string): Promise<Postagem[]> {
    return this.postagemService.findByTitulo(titulo);
  }
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() postagem: Postagem): Promise<Postagem> {
    return this.postagemService.create(postagem);
  }

  //check this on Insomnia
  @Put()
  @HttpCode(HttpStatus.OK)
  update(@Body() postagem: Postagem): Promise<Postagem> {
    return this.postagemService.update(postagem);
  }
  //check this on Insomnia
  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT) // HTTP Status 200
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.postagemService.delete(id);
  }
}
