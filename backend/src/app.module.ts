import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { ProdutosModule } from './produtos/produtos.module';

// Dados do banco: vêm do arquivo .env, entregue pelo Docker
function lerVariavel(nome: string): string {
  const valor = process.env[nome];
  if (!valor) {
    throw new Error(`Variável ${nome} não encontrada. Confira o arquivo .env`);
  }
  return valor;
}

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'mysql',
        host: lerVariavel('DB_HOST'),
        port: Number(process.env.DB_PORT ?? 3306),
        username: lerVariavel('DB_USER'),
        password: lerVariavel('DB_PASSWORD'),
        database: lerVariavel('DB_NAME'),
        // registra sozinho as entidades usadas nos módulos (forFeature)
        autoLoadEntities: true,
        // NUNCA alterar as tabelas do alwaysdata automaticamente
        synchronize: false,
      }),
    }),
    ProdutosModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
