import { DeleteResult, UpdateResult } from "typeorm";
import * as bcrypt from "bcrypt";
import { RoleType, UserDTO } from "../dto/user.dto";
import { UserEntity } from "../entities/user.entity";
import { BaseService } from "../../../config/base.service";

export class UserService extends BaseService<UserEntity> {
  constructor() {
    super(UserEntity);
  }

  async findAllUsers():Promise<UserEntity[]>{
    return (await this.execRepository).find();
  }

  async findUserById(id: string):Promise<UserEntity | null>{
    return (await this.execRepository).findOneBy({id});
  }

  async findUserWithRole(id:string, role: RoleType): Promise<UserEntity | null> {
    const user = (await this.execRepository)
      .createQueryBuilder("user")
      .where({ id })
      .andWhere({ role })
      .getOne();

    return user;
  }

  async findUserWithRelation(id: string):Promise<UserEntity | null>{
    return (await this.execRepository)
    .createQueryBuilder('user')
    .leftJoinAndSelect('user.customer','customer')
    .where({ id })
    .getOne();
  }

  async findUserByEmail(email:string):Promise<UserEntity | null> {
    return (await this.execRepository)
    .createQueryBuilder('user')
    .addSelect('user.password')
    .where({ email })
    .getOne();
  }

  async findUserByUsername(username:string):Promise<UserEntity | null> {
    return (await this.execRepository)
    .createQueryBuilder('user')
    .addSelect('user.password')
    .where({ username })
    .getOne();
  }



  async createUser(body: UserDTO):Promise<UserEntity>{
    const newUser = (await this.execRepository).create(body);
    const hash = await bcrypt.hash(newUser.password.trim(), 10);

    newUser.password = hash;

    return (await this.execRepository).save(newUser);
  }

  async deleteUser(id:string): Promise<DeleteResult> {
    return (await this.execRepository).delete({id});
  }

  async updateUser(id:string, infoUpdate:UserDTO): Promise<UpdateResult> {
    return (await this.execRepository).update(id,infoUpdate);
  }

}