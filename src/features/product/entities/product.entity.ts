import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { CategoryEntity } from "../../category/entities/category.entity";
import { PurchasesProductsEntity } from "../../puchase/entities/purchases-products.entity";
import { BaseEntity } from "../../../config/base.entity";

@Entity({ name: "product" })
export class ProductEntity extends BaseEntity {
  
  @Column()
  productName!: string;

  @Column()
  description!: string;

  @Column()
  price!: number;

  @ManyToOne(() => CategoryEntity, (category) => category.products )
  @JoinColumn({name: "category_id"})
  category!: CategoryEntity; 

  @OneToMany( () => PurchasesProductsEntity, (purchaseProduct) => purchaseProduct.product )
  purchaseProduct!: PurchasesProductsEntity[];

}