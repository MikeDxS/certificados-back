import { Controller, Get, Res, HttpStatus } from '@nestjs/common';
import { GrupoService } from './grupo.service';

@Controller('grupo')
export class GrupoController {
    constructor(private readonly gruService: GrupoService) {}
    @Get()
    listGrupos(@Res() response){
        this.gruService.getGrupos().then(res =>{
            response.status(HttpStatus.OK).json(res);
        }).catch(err =>{
            response.status(HttpStatus.FORBIDDEN).json({message: "Error al obtener todos los grupos",
            error: err});
        });
    }
}
