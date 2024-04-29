import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppModule } from '../src/app.module';


describe('Testes dos Modulos Usuario e Auth (e2e)', () => {
  
  let token: any;
  let usuarioId: any;
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: 'db_blogpessoal_test.db',
          entities: [__dirname + "./../src/**/entities/*.entity.ts"],
          synchronize: true,
          dropSchema: true,
        }),
        AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () =>  {
    await app.close();
  });

  it("01 - Cadastrar um novo Usuario", async () => {
    const resposta = await request(app.getHttpServer())
    .post("/usuarios/cadastrar")
    .send({
      nome: 'Root',
      usuario: 'root@root.com',
      senha: "rootroot",
      foto: '-'
    })
    expect(201)

    usuarioId = resposta.body.id;

  })

    it("02 - Não Deve Cadastrar um Usuário Duplicado", async () => {
      await request(app.getHttpServer())
      .post("/usuarios/cadastrar")
      .send({
        nome: 'Root',
        usuario: 'root@root.com',
        senha: 'rootroot',
        foto: ' ',
      })
      expect(400)

    })

    it("03 - Deve autenticar o Uusuario (Login)", async () => {
    const resposta = await request(app.getHttpServer())
    .post("/usuarios/logar")
    .send({
      usuario: 'root@root.com',
      senha: 'rootroot',

    })
    .expect(200)

    token = resposta.body.token;

    console.log("Token: " + token);
  }) 

  it("04 - Listar todos os Usuários", async () =>  {
    return request(app.getHttpServer())
    .get('/usuarios/all')
    .set('Authorization', `${token}`)
    .send({}) 
    expect(200)
  })

  it("05 - Atualizar um Usuário", async () =>  {
    return request(app.getHttpServer())
    .put('/usarios/atualizar')
    .set('Authorization', `${token}`)
    .send({
      id: usuarioId,
      nome: 'Karen',
      usuario: 'root@root.com',
      senha: 'karen123',
      foto: ' ',
    })
     .expect(200)
     .then( resposta => {
     expect('Karen').toEqual(resposta.body.nome);
    })
  })
});
