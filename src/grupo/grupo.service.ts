import { Injectable } from '@nestjs/common';
import {Conexion} from '../conexion';
import {Grupo} from './dto/grupo';
import couchbase = require('couchbase');
var con = Conexion.getInstance();
var cubeta = con.getBucket('grupos');
var N1qlQuery = couchbase.N1qlQuery;
@Injectable()
export class GrupoService {
    getGrupos(): Promise<any>{
        const cons = new Promise((resolve,reject) =>{
            const consulta = N1qlQuery.fromString('select meta(g).id id, g.nombre nombre, g.descripcion descripcion, g.organizacion grupo from `grupos` g');
            cubeta.operationTimeout = 3000;
            cubeta.query(consulta, function(err, rows) {
                if(err){
                    reject(err);
                }
                else {
                    resolve(rows);
                }
            });
        });
        return cons;
    }
    insGrupo(idEstudiante: string, doc: Grupo): Promise<any>{
        const cons = new Promise((resolve,reject) =>{
            cubeta.insert(idEstudiante,doc,(err, result) =>{
                if(err){
                    reject(err);
                }else{
                    resolve(result);
                }
            });
        });
        return cons;
    }
    upGrupo(idEstudiante: string, doc: Grupo): Promise<any>{
        const cons = new Promise((resolve,reject) =>{
            cubeta.upsert(idEstudiante,doc,(err, result) =>{
                if(err){
                    reject(err);
                }else{
                    resolve(result);
                }
            });
        });
        return cons;
    }
    delGrupo(idEstudiante: string): Promise<any>{
        const cons = new Promise((resolve,reject) =>{
            cubeta.remove(idEstudiante,(err, result) =>{
                if(err){
                    reject(err);
                }else{
                    resolve(result);
                }
            });
        });
        return cons;
    }
}
