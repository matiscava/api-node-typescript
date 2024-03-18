import { NextFunction, Request, Response } from "express";
import { HttpResponse } from "../../../shared/response/http.response";
import { PurchasesProductsDTO } from "../dto/purchases-products.dto";
import { validate } from "class-validator";

export class PurchasesProductsMiddleware {
  constructor(
    private readonly httpResponse: HttpResponse = new HttpResponse(),
  ){};

  purchasesProductsValidator(req: Request, res: Response, next: NextFunction) {
    const { quantityProduct, totalPrice, purchase, product } = req.body;

    const valid = new PurchasesProductsDTO();
    valid.quantityProduct = quantityProduct;
    valid.totalPrice = totalPrice;
    valid.purchase = purchase;
    valid.product = product;

    validate(valid).then((err) => {
      if( !err.length ) {
        this.httpResponse.Error(res,err);
      } else {
        next();
      }
    })
  }
}