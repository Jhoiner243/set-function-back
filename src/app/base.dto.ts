export class baseResponseDto {
  public readonly message: string = ""

  public readonly status: number = 200

  public readonly timestamp: string = ""

  public constructor(message: string, status: number){
    this.status = status;
    this.message = message;
    this.timestamp = new Date().toISOString()
  }

  public static success(message = "Esta es un respuesta exitosa", status = 200): baseResponseDto{
    return new baseResponseDto(message, status)
  }

  public static error(message = "Esta es una respuesta de error", status = 500): baseResponseDto{
    return new baseResponseDto(message, status)
  }
}