export class BaseResponseApi<T = unknown> {
  data: T | null;
  message: string;
  error_message: unknown;
  status: number;
  success: boolean;
  constructor({
    status,
    message,
    success,
    data,
    error_message,
  }: {
    data: T | null;
    message: string;
    status: number;
    success: boolean;
    error_message: unknown;
  }) {
    this.message = message;
    this.status = status;
    this.success = success;
    this.data = data;
    this.error_message = error_message;
  }
}
