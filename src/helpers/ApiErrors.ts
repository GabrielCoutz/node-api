export class ApiError extends Error {
  constructor(
    message: string,
    public readonly status: number,
    public readonly errorName: string,
  ) {
    super(message);
  }
}

export class BadRequestError extends ApiError {
  constructor(message: string) {
    super(message, 400, 'BadRequestError');
  }
}

export class ConflictError extends ApiError {
  constructor(message: string) {
    super(message, 409, 'ConflictError');
  }
}

export class UnauthorizedError extends ApiError {
  constructor(message: string) {
    super(message, 401, 'UnauthorizedError');
  }
}

export class NotFoundError extends ApiError {
  constructor(message: string) {
    super(message, 404, 'NotFoundError');
  }
}

export class MethodNotAllowedError extends ApiError {
  constructor() {
    super(
      'Desculpe, mas ainda não suportamos este método =)',
      405,
      'MethodNotAllowedError',
    );
  }
}
