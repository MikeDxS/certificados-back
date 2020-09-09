import { Injectable } from '@nestjs/common';
import {Estudiante} from './dto/estudiante';
import {Conexion} from '../conexion';
import couchbase = require('couchbase');

/*var cluster = new couchbase.Cluster('192.168.0.16:8091');
cluster.authenticate('sid_dba', 'asd123');
var cubeta = cluster.openBucket('estudiantes');*/
var con = Conexion.getInstance();
var cubeta = con.getBucket('estudiantes');
var N1qlQuery = couchbase.N1qlQuery;
@Injectable()
export class EstudianteService {
    getEstudiantes(): Promise<any>{
        const cons = new Promise((resolve,reject) =>{
            const consulta = N1qlQuery.fromString('SELECT e.nombre|| " " || e.otros_nombres|| " " ||e.primer_apellido|| " " ||e.segundo_apellido nombre_completo, e.codigo codigo, e.email correo, e.proyecto_curricular proyecto_curricular FROM estudiantes e');
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
    insEstudiante(idEstudiante: string, doc: Estudiante): Promise<any>{
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
    upEstudiante(idEstudiante: string, doc: Estudiante): Promise<any>{
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
    delEstudiante(idEstudiante: string): Promise<any>{
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
