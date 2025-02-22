import { db } from "../../../../prisma/db";
import { ResGetProductDto, ResPostProductDto } from "../../applications/product-response.dto";
import { ProductoEntity } from "../../domain/entities/producto.entity";

export class ImpProductDto {
  public async getProduct(): Promise<ResGetProductDto>{
    try {
      const res: ProductoEntity[] = await db.product.findMany()

      if(!res){
        return ResGetProductDto.error([], "Error al obtener productos")
      }

      return ResGetProductDto.success(res, "Productos obtenidos correctamente")
    } catch (err) {
      return ResGetProductDto.error([], "Error al obtener productos")
    }
      
  }

  public async reqPostProduct({name, price}): Promise<ResPostProductDto>{
    try {
     const newProduct = await db.product.create(
        {data: {
          name,
          price
        }}
      )

      if(!newProduct){
        return ResPostProductDto.error("Error al crear el producto", 500)
      }

      return ResPostProductDto.success("Producto agregado exitosamente", 200)
    } catch{
      return ResPostProductDto.error("Error al crear producto", 500)
    }
  }
}