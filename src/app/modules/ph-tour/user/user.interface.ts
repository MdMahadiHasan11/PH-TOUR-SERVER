import { Types } from "mongoose";

export enum Role {
  SUPER_ADMIN = "SUPER_ADMIN",
  USER = "USER",
  ADMIN = "ADMIN",
  GUIDE = "GUIDE",
}

//auth
//email,pass,google
export interface IAuthProvider {
  provider: string;
  providerId: string;
}

export enum isActive {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  BLOCKED = "BLOCKED",
}
export interface IUser {
  name: string;
  email: string;
  password: string;
  phone: string;
  picture?: string;
  address?: string;
  isDeleted?: boolean;
  isActive?: isActive;
  isVerified?: boolean;

  auths: IAuthProvider[];
  role: Role;
  booking?: Types.ObjectId[];
  guides?: Types.ObjectId[];
}
