import { IsNotEmpty } from "class-validator";
import { UserDTO } from "../../user/dto/user.dto";
import { BaseDTO } from "../../../config/base.dto";

export class CustomerDTO extends BaseDTO {
  
  @IsNotEmpty()
  address!: string;

  @IsNotEmpty()
  dni!: number;

  @IsNotEmpty()
  user!: UserDTO;

}