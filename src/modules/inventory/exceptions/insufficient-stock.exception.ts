import { HttpException, HttpStatus } from '@nestjs/common';

export class InsufficientStockException extends HttpException {
  constructor() {
    super(`Insufficient stock of item`, HttpStatus.BAD_REQUEST);
  }
}