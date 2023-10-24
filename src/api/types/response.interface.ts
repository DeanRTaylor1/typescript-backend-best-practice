export interface ApiResponse<T> {
  status: number;
  code: number;
  data: T;
  message: string;
}
