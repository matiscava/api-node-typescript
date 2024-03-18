import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { CustomerEntity } from "../../customer/entities/customer.entity";
import { PurchasesProductsEntity } from "./purchases-products.entity";
import { BaseEntity } from "../../../config/base.entity";
import { StatusPurchase } from "../dto/purchase.dto";

@Entity({ name: "purchase" })
export class PurchaseEntity extends BaseEntity {
  
  @Column({type: "enum", enum: StatusPurchase})
  status!: StatusPurchase;

  @Column()
  paymentMethod!: string;

  @ManyToOne(() => CustomerEntity, (customer) => customer.purchases )
  @JoinColumn({name: "customer_id"})
  customer!: CustomerEntity; 

  @OneToMany(() => PurchasesProductsEntity, (purchaseEntity) => purchaseEntity.purchase)
  purchaseProduct!: PurchasesProductsEntity[];
}