import { BaseRouter } from "../../shared/router/router";
import { PurchasesProductsController } from "./controllers/purchases-products.controller";
import { PurchasesProductsMiddleware } from "./middlewares/purchases-products.middleware";

export class PurchasesProductsRouter extends BaseRouter<PurchasesProductsController, PurchasesProductsMiddleware>{
  constructor(){
    super(PurchasesProductsController, PurchasesProductsMiddleware);
  }

  routes(): void {
    this.router.get('/purchaeses-products', (req,res) => this.controller.getPurchasesProducts(req,res));
    this.router.get('/purchaeses-products/:id', (req,res) => this.controller.getPurchasesProductsById(req,res));
    this.router.post(
      '/purchaeses-products',
      ( req, res, next) => [ this.middleware.purchasesProductsValidator(req,res,next) ],
      (req,res) => this.controller.createPurchasesProducts(req,res)
    );
    this.router.put('/purchaeses-products/:id', (req,res) => this.controller.updatePurchasesProducts(req,res));
    this.router.delete('/purchaeses-products/:id', (req,res) => this.controller.deletePurchasesProducts(req,res));
  }
};