import { Request, Response } from "express";
import { CategoryService } from "../services/category.service";
import { HttpResponse } from "../../../shared/response/http.response";

export class CategoryController {
  constructor(
    private readonly categoryService: CategoryService = new CategoryService(),
    private readonly httpResponse: HttpResponse = new HttpResponse()
  ) {}

  async getCategories(req:Request, res:Response) {
    try {
      const data = await this.categoryService.findAllCategories();

      if(!data.length) return this.httpResponse.NotFound(res,"No Se encontraron registros");
      
      return this.httpResponse.Ok(res,data);
    } catch (e) {
      this.httpResponse.Error(res,e);
    }
  }

  async getCategoryById(req:Request, res:Response) {
    const { id } = req.params;
    try {
      const data = await this.categoryService.findCategoryById(id);

      if( !data ) return this.httpResponse.NotFound(res, "No existe dato");

      return this.httpResponse.Ok(res, data);
    } catch (e) {
      this.httpResponse.Error(res,e);
    }
  }

  async findCategoryWihProduct(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const data = await this.categoryService.findCategoryWithProduct(id);

      if( !data ) return this.httpResponse.NotFound(res, "No existe el dato");

      return this.httpResponse.Ok(res, data);
    } catch (e) {
      this.httpResponse.Error(res,e);
    }
  }

  async createCategory(req:Request, res:Response) {
    try {
      const data = await this.categoryService.createCategory(req.body);
      return this.httpResponse.Ok(res, data);
    } catch (e) {
      this.httpResponse.Error(res,e);
    }
  }

  async updateCategory(req:Request, res:Response) {
    const { id } = req.params;
    try {
      const data = await this.categoryService.updateCategory(id,req.body);

      if( !data.affected ) return this.httpResponse.NotFound(res, "Hubo un error al actualizar el registro");

      return this.httpResponse.Ok(res, data);
    } catch (e) {
      this.httpResponse.Error(res,e);
    }
  }

  async deleteCategory(req:Request, res:Response) {
    const { id } = req.params;
    try {
      const data = await this.categoryService.deleteCategory(id);

      if( !data.affected ) return this.httpResponse.NotFound(res, "Hubo un error al eliminar el registro");

      return this.httpResponse.Ok(res, data);
    } catch (e) {
      this.httpResponse.Error(res,e);
      
    }
  }
}