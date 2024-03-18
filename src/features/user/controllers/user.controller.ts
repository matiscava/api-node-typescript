import { Request, Response } from "express";
import { UserService } from "../services/user.service";
import { DeleteResult, UpdateResult } from "typeorm";
import { HttpResponse } from "../../../shared/response/http.response";

export class UserController {
  constructor(
    private readonly userService: UserService = new UserService(),
    private readonly httpResponse: HttpResponse = new HttpResponse(),
    ) {  } 

  async getUsers(req: Request, res: Response) {
    try {
      const data = await this.userService.findAllUsers();
      if(!data.length) return this.httpResponse.NotFound(res,"No existe el dato");

      this.httpResponse.Ok(res,data);
    } catch (error) {
      this.httpResponse.Error(res,error);
    }
  }
  
  async getUserById(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const data = await this.userService.findUserById(id);
      if(data == null) return this.httpResponse.NotFound(res, `No se encontró el Usuario con ID: ${id}`);
      this.httpResponse.Ok(res, data);
    } catch (error) {
      this.httpResponse.Error(res,error);
    }
  }
  
  async getUserWithRelationById(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const data = await this.userService.findUserWithRelation(id);
      if(data == null) return this.httpResponse.NotFound(res, `No se encontró el Usuario con ID: ${id}`);
      this.httpResponse.Ok(res, data);
    } catch (error) {
      this.httpResponse.Error(res,error);
    }
  }
  
  async createUser(req: Request, res: Response) {
    try {
      const data = await this.userService.createUser(req.body);
      this.httpResponse.Ok(res, data);
    } catch (error) {
      this.httpResponse.Error(res,error);
    }
  }
  
  async updateUser(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const data : UpdateResult = await this.userService.updateUser(id,req.body);

      if(!data.affected) return this.httpResponse.NotFound(res, "Hubo un error al actualizar el dato")

      this.httpResponse.Ok(res, data);
    } catch (error) {
      this.httpResponse.Error(res,error);
    }
  }
  
  async deleteUser(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const data : DeleteResult = await this.userService.deleteUser(id);

      if(!data.affected) return this.httpResponse.NotFound(res, "Hubo un error al eliminar el dato")

      this.httpResponse.Ok(res, data);
    } catch (error) {
      this.httpResponse.Error(res,error);
    }
  }
}