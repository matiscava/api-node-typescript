import { NextFunction, Request, Response } from "express";
import { HttpResponse } from "../../../shared/response/http.response";
import { CategoryDTO } from "../dto/category.dto";
import { validate } from "class-validator";

export class CategoryMiddleware {

  constructor(
    private readonly httpResponse: HttpResponse = new HttpResponse(),
  ){};

  categoryValidator( req:Request, res:Response, next:NextFunction ) {
    const { category, colorBadge } = req.body;

    const valid = new CategoryDTO();

    valid.category = category;
    valid.colorBadge = colorBadge;

    validate(valid).then((err) => {
      if ( err.length ) {
       return this.httpResponse.Error(res, err); 
      } else {
        next();
      }
    });
  }
}