import { Injectable } from '@nestjs/common';
import { Conexion } from '../conexion';
import {Curso} from './dto/curso';
import couchbase = require('couchbase');
import { rejects } from 'assert';
var con = Conexion.getInstance();
var cubeta = con.getBucket('cursos');
var N1qlQuery = couchbase.N1qlQuery;
@Injectable()
export class CursoService {
    getCursos(): Promise<any>{
        const cons = new Promise((resolve,reject) =>{
            const consulta = N1qlQuery.fromString('SELECT c.semestre semestre, c.grupo_id grupo_id, c.estudiante_id estudiante_id, c.nota nota FROM cursos c');
            cubeta.operationTimeout = 120*1000;
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
    insCurso(idEstudiante: string, doc: Curso): Promise<any>{
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
    upCurso(idEstudiante: string, doc: Curso): Promise<any>{
        const cons = new Promise((resolve,reject) =>{
            console.log(doc);
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
    delCurso(idEstudiante: string): Promise<any>{
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
    getCursoGrup(grupo_id: string, semestre: string): Promise<any>{
        const cons = new Promise((resolve,reject)=>{
            const vcon = `SELECT META(c).id curso_id, c.estudiante_id estudiante_id, e.nombre||' '||e.otros_nombres||' '||e.primer_apellido||' '||e.segundo_apellido nombre,c.nota nota, c.grupo_id grupo_id, c.semestre semestre FROM cursos c JOIN estudiantes e ON c.estudiante_id = META(e).id WHERE c.semestre=${semestre} AND c.grupo_id='${grupo_id}'`;
            const consulta = N1qlQuery.fromString(vcon);
            cubeta.operationTimeout = 120*1000;
            cubeta.query(consulta, function(err,rows){
                if (err) {
                    reject(err);
                }
                else{
                    resolve(rows);
                }
            });
        });
        return cons;
    }
}
