import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EstudianteController } from './estudiante/estudiante.controller';
import { EstudianteService } from './estudiante/estudiante.service';
import { CursoController } from './curso/curso.controller';
import { CursoService } from './curso/curso.service';
import { GrupoController } from './grupo/grupo.controller';
import { GrupoService } from './grupo/grupo.service';

@Module({
  imports: [],
  controllers: [AppController, EstudianteController, CursoController, GrupoController],
  providers: [AppService, EstudianteService, CursoService, GrupoService],
})
export class AppModule {}
