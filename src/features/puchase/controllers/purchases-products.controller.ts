import { Request, Response } from "express";
import { PurchasesProductsService } from "../services/purchases-products.service";

export class PurchasesProductsController {
  constructor(private readonly purchasesProductsService: PurchasesProductsService = new PurchasesProductsService()) {  } 

  async getPurchasesProducts(req: Request, res: Response) {
    try {
      const data = await this.purchasesProductsService.findAllPurchasesProducts();
      res.status(200).json(data);
    } catch (error) {
      console.error(error);
    }
  }
  
  async getPurchasesProductsById(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const data = await this.purchasesProductsService.findPurchaseProductById(id);
      res.status(200).json(data);
    } catch (error) {
      console.error(error);
    }
  }
  
  async createPurchasesProducts(req: Request, res: Response) {
    try {
      const data = await this.purchasesProductsService.createPurchasesProducts(req.body);
      res.status(200).json(data);
    } catch (error) {
      console.error(error);
    }
  }
  
  async updatePurchasesProducts(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const data = await this.purchasesProductsService.updatePurchasesProducts(id,req.body);
      res.status(200).json(data);
    } catch (error) {
      console.error(error);
    }
  }
  
  async deletePurchasesProducts(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const data = await this.purchasesProductsService.deletePurchasesProducts(id);
      res.status(200).json(data);
    } catch (error) {
      console.error(error);
    }
  }
}