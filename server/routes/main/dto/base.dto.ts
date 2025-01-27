export class BaseResponseApi<T = unknown> {
  data: T | null;
  message: string;
  status: number;
  success: boolean;
  constructor({
    status,
    message,
    success,
    data,
  }: {
    data: T | null;
    message: string;
    status: number;
    success: boolean;
  }) {
    this.message = message;
    this.status = status;
    this.success = success;
    this.data = data;
  }
}
