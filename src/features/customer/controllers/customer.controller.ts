import { Request, Response } from "express";
import { CustomerService } from "../services/customer.service";
import { HttpResponse } from "../../../shared/response/http.response";

export class CustomerController {
  constructor (
    private readonly customerService: CustomerService = new CustomerService(),
    private readonly httpResponse: HttpResponse = new HttpResponse(),
  ) {}

  async getCustomers(req: Request, res: Response) {
    try {
      const data = await this.customerService.findAllCustomers();

      if(!data.length) return this.httpResponse.NotFound(res, "No se encontraron datos");

      return this.httpResponse.Ok(res, data);
    } catch (e) {
      console.error(e);
      return this.httpResponse.Error(res, e);
    }
  }

  async getCustomerById(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const data = await this.customerService.findCustomerById(id);

      if( !data ) return this.httpResponse.NotFound(res, "No se econtro el registro");

      return this.httpResponse.Ok(res, data);
    } catch (e) {
      console.error(e);
      return this.httpResponse.Error(res, e);
    }
  }

  async createCustomer(req: Request, res: Response) {
    try {
      const data = await this.customerService.createCustomer(req.body);
      return this.httpResponse.Ok(res, data);
    } catch (e) {
      console.error(e);
      return this.httpResponse.Error(res, e);
    }
  }

  async deleteCustomer(req: Request, res: Response) {
    const { id } = req.body;
    try {
      const data = await this.customerService.deleteCustomer(id);

      if ( !data.affected ) return this.httpResponse.NotFound(res, "Hubo un error al eliminar el registro");

      return this.httpResponse.Ok(res, data);
    } catch (e) {
      console.error(e);
      return this.httpResponse.Error(res, e);
    }
  }

  async updateCustomer(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const data = await this.customerService.updateCustomer(id, req.body);

      if ( !data.affected ) return this.httpResponse.NotFound(res, "Hubo un error al actualizar el registro");

      return this.httpResponse.Ok(res, data);
    } catch (e) {
      console.error(e);
      return this.httpResponse.Error(res, e);
    }
  }
}