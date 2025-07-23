export class BaseResponseDto<T> {
  statusCode: number;
  message: string;
  data: T;

  constructor(data: T, message = 'Success', statusCode = 200) {
    this.data = data;
    this.message = message;
    this.statusCode = statusCode;
  }
}
