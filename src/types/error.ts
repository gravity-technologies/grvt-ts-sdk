export class GrvtError extends Error {
  code: number;
  message: string;
  status?: number;

  constructor(code: number, message: string, status?: number) {
    super(message);
    this.name = 'GrvtError';
    this.code = code;
    this.message = message;
    this.status = status;
  }
}
