import { Controller, Get, Res, HttpStatus, Param } from '@nestjs/common';
import {EstudianteService} from './estudiante.service';
import { response } from 'express';

@Controller('estudiante')
export class EstudianteController {
    constructor(private readonly estService: EstudianteService) {}

    @Get()
    listEstudiantes(@Res() response){
        this.estService.getEstudiantes().then(res =>{
            response.status(HttpStatus.OK).json(res);
        }).catch(err =>{
            response.status(HttpStatus.OK).json({error: "Error al obtener estudiantes"+err});
        });
    }

    @Get(':id')
    estudianteID(@Res() response, @Param('id') idEstudiante){}
}
