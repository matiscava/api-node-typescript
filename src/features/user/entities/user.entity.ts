import { Column, Entity, OneToOne } from "typeorm";
import { CustomerEntity } from "../../customer/entities/customer.entity";
import { Exclude } from "class-transformer";
import { BaseEntity } from "../../../config/base.entity";
import { RoleType } from "../dto/user.dto";

@Entity({ name: "users" })
export class UserEntity extends BaseEntity {
  
  @Column()
  name!: string;
  
  @Column()
  lastname!: string;
  
  @Column()
  username!: string;
  
  @Column({ unique: true })
  email!: string;

  @Exclude()
  @Column({ select: false })
  password!: string;

  @Column()
  city!: string;

  @Column()
  province!: string;

  @Column({ type: "enum", enum: RoleType, nullable: false})
  role!: RoleType;

  @OneToOne(() => CustomerEntity, (custmer) => custmer.user )
  customer!: CustomerEntity;

}