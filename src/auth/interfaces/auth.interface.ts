import { RoleType } from "../../features/user/dto/user.dto";

export interface PayloadToken {
  role: RoleType,
  sub: string,
}