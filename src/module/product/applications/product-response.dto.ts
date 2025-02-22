import { baseResponseDto } from '../../../app/base.dto'
import { ProductoEntity } from '../domain/entities/producto.entity'

export class ResGetProductDto {
  public readonly data: ProductoEntity[] = []

  public readonly timestamp: string = ''

  public readonly status: number = 200

  public readonly message: string = ''

  public constructor (data: ProductoEntity[],message: string, status: number){
    this.data = data;
    this.message = message
    this.status = status;
    this.timestamp = new Date().toISOString();
  }

  public static success(data: ProductoEntity[], message = "Datos obtenidos correctamente"): ResGetProductDto {
    console.log(data)
    return new ResGetProductDto(data, message, 200)
  }

  public static error(data = [] ,message = "Error datos no obtenidos"): ResGetProductDto{
    return new ResGetProductDto(data, message, 500)
  }
}

export class ReqPostProductoDto implements Omit<ProductoEntity, "id">{
  public readonly name: string = ''

  public readonly createdAt: Date 

  public readonly price: number = 0

  public constructor (name: string, createdAt: Date,
    price: number
  ){
    this.createdAt = createdAt;
    this.name = name;
    this.price = price;
  }

}
export class ResPostProductDto extends baseResponseDto {
  public static override success(message = "Producto agregado exitosamente", status= 200): baseResponseDto {
   return new ResPostProductDto(message, status)
  }

  public static override error(message =  "Error al agregar el producto", status = 500): baseResponseDto {
    return new ResPostProductDto(message, status)
  }
}