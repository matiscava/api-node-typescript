import { Column, Entity, JoinColumn, OneToMany, OneToOne } from "typeorm";
import { UserEntity } from "../../user/entities/user.entity";
import { PurchaseEntity } from "../../puchase/entities/purchase.entity";
import { BaseEntity } from "../../../config/base.entity";

@Entity({ name: "customer" })
export class CustomerEntity extends BaseEntity {
  @Column()
  address!: string;

  @Column()
  dni!: number;

  @OneToOne( () => UserEntity, (user) => user.customer )
  @JoinColumn({name: "user_id"})
  user!: UserEntity;

  @OneToMany( () => PurchaseEntity, (purchase) => purchase.customer )
  purchases!: PurchaseEntity[];
}