import { Controller, Get, Res, HttpStatus, Param, Query, Put, Body } from '@nestjs/common';
import { CursoService } from './curso.service';

@Controller('curso')
export class CursoController {
    constructor(private readonly curService: CursoService) {}
    @Get()
    listCrusos(@Res() response){
        this.curService.getCursos().then(res =>{
            response.status(HttpStatus.OK).json(res);
        }).catch(err =>{
            response.status(HttpStatus.FORBIDDEN).json({message: "Error al obtener todos los grupos",
            error: err});
        });
    }
    @Get('grupo')
    listCursosGru(@Res() response, @Query() query){
        this.curService.getCursoGrup(query.grupo_id,query.semestre).then(res =>{
            response.status(HttpStatus.OK).json(res);
        }).catch(err =>{
            response.status(HttpStatus.FORBIDDEN).json({error: err})
        });
    }
    @Put('grupo')
    updateNotaEst(@Body() body, @Res() response, @Query() query){
        console.log(body);
        this.curService.upCurso(query.curso_id,body).then(res =>{
            response.status(HttpStatus.OK).json(res);
        }).catch(err=>{
            response.status(HttpStatus.FORBIDDEN).json({error: err})
        });
    }
}
