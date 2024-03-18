import { Request, Response } from "express";
import { ProductService } from "../services/product.service";
import { HttpResponse } from "../../../shared/response/http.response";

export class ProductController {
  constructor (
    private readonly productService: ProductService = new ProductService(),
    private readonly httpResponse: HttpResponse = new HttpResponse(),
  ) {}

  async getProducts(req: Request, res: Response) {
    try {
      const data = await this.productService.findAllProducts();

      if( !data.length ) return this.httpResponse.NotFound(res, "No se encontraron registros");

      return this.httpResponse.Ok(res,data);
    } catch (e) {
      console.error(e); 
      return this.httpResponse.Error(res,e);
    }
  }

  async getProductById(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const data = await this.productService.findProductById(id);
      return this.httpResponse.Ok(res,data);
    } catch (e) {
      console.error(e);
      return this.httpResponse.Error(res,e);
    }
  }

  async getProductByName(req: Request, res: Response) {
    const { search } = req.query;
    try {
      if(search !== undefined ) {
        const data = await this.productService.findProductsByName(search);

        if ( !data ) return this.httpResponse.NotFound(res, "No se encontró ningún registro");

        return this.httpResponse.Ok (res, data);
      }
    } catch (e) {
      console.error(e);
      return this.httpResponse.Error(res,e);  
    }
  }

  async createProduct(req: Request, res: Response) {
    try {
      const data = await this.productService.createProduct(req.body);
      
      return this.httpResponse.Ok(res,data);
    } catch (e) {
      console.error(e);
      return this.httpResponse.Error(res,e);
    }
  }

  async updateProduct(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const data = await this.productService.updateProduct(id, req.body);
      
      if(!data.affected) return this.httpResponse.NotFound(res, "Hubo un error al editar el registro");
      
      return this.httpResponse.Ok(res,data);
    } catch (e) {
      console.error(e);
      return this.httpResponse.Error(res,e);
    }
  }

  async deleteProduct(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const data = await this.productService.deleteProduct(id);

      if(!data.affected) return this.httpResponse.NotFound(res, "Hubo un error al eliminar el registro");

      return this.httpResponse.Ok(res,data);
    } catch (e) {
      console.error(e);
      return this.httpResponse.Error(res,e);
    }
  }
}