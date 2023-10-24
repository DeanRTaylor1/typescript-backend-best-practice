import { StatusCodeEnum } from "api/enum/api.enum";

export interface ApiResponse<T> {
  status: boolean;
  code: StatusCodeEnum;
  data: T;
  message: string;
}
