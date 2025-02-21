
export class CustomError extends Error {
  public readonly status: number

  public readonly timestamp: string

  public constructor(message: string, status: number){
    super(message);
    this.status = status;
    this.timestamp = new Date().toISOString();
  }

  public static create(message = "Error de insectos", status: number){
    return new CustomError(message, status)
  }
}
