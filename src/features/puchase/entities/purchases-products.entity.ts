import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { PurchaseEntity } from "./purchase.entity";
import { ProductEntity } from "../../product/entities/product.entity";
import { BaseEntity } from "../../../config/base.entity";

@Entity({ name: "purchases-products" })
export class PurchasesProductsEntity extends BaseEntity {
  
  @Column()
  quantityProduct!: number;

  @Column()
  totalPrice!: number;
  
  @ManyToOne(() => PurchaseEntity, (purchase) => purchase.purchaseProduct )
  @JoinColumn({ name: "purchase_id" })
  purchase!: PurchaseEntity;
  
  @ManyToOne(() => ProductEntity, (product) => product.purchaseProduct )
  @JoinColumn({ name: "product_id" })
  product!: ProductEntity;


}