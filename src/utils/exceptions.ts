export class BaseException extends Error {
  status: number;
  message: string;
}

export class NotFoundException extends BaseException {
  status = 404;
  constructor(msg?: string) {
    super()
    this.message = msg || 'Not Found!'
  }
}

export class UnauthorizedException extends BaseException {
  status = 401;
  constructor(msg?: string) {
    super()
    this.message = msg || 'Authorized Error!'
  }
}

export class ForbiddenException extends BaseException {
  status = 403;
  constructor(msg?: string) {
    super()
    this.message = msg || 'Access Forbidden!'
  }
}