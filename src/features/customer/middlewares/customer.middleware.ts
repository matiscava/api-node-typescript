import { NextFunction, Request, Response } from "express";
import { HttpResponse } from "../../../shared/response/http.response";
import { CustomerDTO } from "../dto/customer.dto";
import { validate } from "class-validator";

export class CustomerMiddleware {

  constructor(
    private readonly httpResponse: HttpResponse = new HttpResponse(),
  ) {};

  customerValidator( req: Request, res: Response, next: NextFunction) {
    const { address, dni, user } = req.body;

    const valid = new CustomerDTO();

    valid.address = address;
    valid.dni = dni;
    valid.user = user;

    validate(valid).then( (err) => {
      if(err.length) {
        return this.httpResponse.Error(res,err);
      } else {
        next();
      }
    });
  }

};