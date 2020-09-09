import couchbase = require('couchbase');
import {Bucket} from 'couchbase';
export class Conexion {
    private static instance : Conexion;
    private cluster: any;
    private constructor(){
        this.cluster = new couchbase.Cluster('0.0.0.0:8091');
        this.cluster.authenticate('sid_dba', 'asd123');
    }
    static getInstance(): Conexion{
        if(this.instance == undefined){
            console.log('se crea una vez');
            this.instance = new Conexion();
        }
        return this.instance;
    }
    getBucket(cubeta : string) : Bucket{
        const bucket = this.cluster.openBucket(cubeta);
        return bucket;
    }
}
