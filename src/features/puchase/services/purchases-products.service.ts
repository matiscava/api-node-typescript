import { DeleteResult, UpdateResult } from "typeorm";
import { PurchasesProductsDTO } from "../dto/purchases-products.dto";
import { PurchasesProductsEntity } from "../entities/purchases-products.entity";
import { BaseService } from "../../../config/base.service";
import { ProductService } from "../../product/services/product.service";

export class PurchasesProductsService extends BaseService<PurchasesProductsEntity> {
  constructor(
    private readonly productService: ProductService = new ProductService()
  ) {
    super(PurchasesProductsEntity);
  }

  async findAllPurchasesProducts():Promise<PurchasesProductsEntity[]>{
    return (await this.execRepository).find();
  }

  async findPurchaseProductById(id: string):Promise<PurchasesProductsEntity | null>{
    return (await this.execRepository).findOneBy({id});
  }

  async createPurchasesProducts(body: PurchasesProductsDTO):Promise<PurchasesProductsEntity>{
    const newPurchaseProduct =  (await this.execRepository).create(body); // crea una instancia del registro en memoria
    const product = await this.productService.findProductById(newPurchaseProduct.product.id);

    newPurchaseProduct.totalPrice = product!.price * newPurchaseProduct.quantityProduct;

    return (await this.execRepository).save(newPurchaseProduct);
  }

  async deletePurchasesProducts(id:string): Promise<DeleteResult> {
    return (await this.execRepository).delete({id});
  }

  async updatePurchasesProducts(id:string, infoUpdate:PurchasesProductsDTO): Promise<UpdateResult> {
    return (await this.execRepository).update(id,infoUpdate);
  }

}