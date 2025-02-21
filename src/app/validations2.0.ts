import { z } from 'zod';

// Clase base mejorada con tipado genérico
export  class BaseResponseDto<T = unknown> {
  constructor(
    public message: string,
    public status: number,
    public data?: T,
    public error?: string
  ) {}

  static success<T>(message: string, status: number, data?: T): BaseResponseDto<T> {
    return new this(message, status, data);
  }

  static error(message: string, status: number, error?: string): BaseResponseDto {
    return new this(message, status, undefined, error);
  }
}

// Implementación específica para usuarios
export class ResPostUserDto<T = unknown> extends BaseResponseDto<T> {
  static override success<T>(message = 'Operación exitosa', status = 200, data?: T) {
    return super.success(message, status, data) as ResPostUserDto<T>;
  }

  static override error(message = 'Error en la operación', status = 500, error?: string) {
    return super.error(message, status, error) as ResPostUserDto;
  }
}

// Esquemas de validación con Zod
export const UserValidations = {
  username: z.string()
    .min(3, 'El username debe tener al menos 3 caracteres')
    .max(12, 'El username no puede exceder los 12 caracteres')
    .refine(val => !!val, 'El username es requerido'),
  };

// Clase para manejo de errores de validación
export class ValidationError extends Error {
  constructor(
    public override message: string,
    public statusCode: number = 400,
    public details?: z.ZodIssue[]
  ) {
    super(message);
    Object.setPrototypeOf(this, ValidationError.prototype);
  }

  toResponseDto() {
    return ResPostUserDto.error(
      this.message,
      this.statusCode,
      this.details?.map(d => d.message).join(', ')
    );
  }
}

// Ejemplo de uso en un servicio
export class UserService {
  static async validateUsername(username: string) {
    const result = UserValidations.username.safeParse(username);
    
    if (!result.success) {
      throw new ValidationError(
        'Error de validación de username',
        400,
        result.error.issues
      );
    }

    return ResPostUserDto.success('Username válido', 200, { username });
  }
}