import * as dotenv from "dotenv";
import { DataSource, DataSourceOptions } from "typeorm";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";
import { AppDataSource } from "./data.source";

export abstract class ConfigServer {
  constructor(){
    const nodeNameEnv = this.createPathEnv(this.nodeEnv);
    dotenv.config({
      path: nodeNameEnv,
    })
  }

  public getEnvironment(k:string): string | undefined {
    return process.env[k]; // process.env['PORT']
  }

  public getNumberEnv(k:string): number {
    return Number(this.getEnvironment(k));
  }

  public get nodeEnv(): string {
    return this.getEnvironment('NODE_ENV')?.trim() || '';
  }

  public createPathEnv(path: string): string {
    const arrEnv: Array<string> = ['env']; // ['hola','mundo']

    if( path.length ) { // production.release
      const stringToArray = path.split('.');
      arrEnv.unshift(...stringToArray); // ['hola','mundo','env']
    }
    return `.${arrEnv.join('.')}`; // '.hola.mundo.env'
  }

  get initConnect(): Promise<DataSource> {
    return AppDataSource.initialize();    
  }

}