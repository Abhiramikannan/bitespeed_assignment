import { Response } from "express";
export class ResponseStructure {
  private success?: boolean;
  constructor(
    private statusCode?: number,
    private payload?: any,
    private message?: string
  ) {}

  setSuccess(
    success: boolean,
    statusCode: number,
    payload: any,
    message: string
  ) {
    this.statusCode = statusCode;
    this.payload = payload;
    this.success = success;
    this.message = message;
    return this;
  }

  setError(statusCode: number, message: string, payload: any = {}) {
    this.statusCode = statusCode;
    this.message = message;
    this.success = false;
    this.payload = payload;

    return this;
  }

  send(res: Response) {
    if (this.success) {
      return res.status(this.statusCode!).json({
        success: this.success,
        payload: this.payload,
        message: this.message,
      });
    }
    return res.status(this.statusCode!).json({
      success: false,
      message: this.message,
      payload: this.payload,
    });
  }
}

const response = new ResponseStructure();
export { response };
