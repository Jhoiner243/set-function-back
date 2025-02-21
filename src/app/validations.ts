import { CustomError } from "../app/custom-error";
import { db } from "../prisma/db";
import { baseResponseDto } from "./base.dto";


export class ResPostUserDto extends baseResponseDto {
  public static override success(message= 'Operacion éxitosa', status= 200): baseResponseDto {
    return new ResPostUserDto(message, status)
  }
  public static override error(message= 'Error en la operacion', status= 200): baseResponseDto {
    return new ResPostUserDto(message, status)
  }
}


export class Validations {
  public static async username(username: string){
    if(username === null || username === undefined) new Error('No se admiten username de tipo undefined')

    if(typeof username !== "string" ){
     throw new Error(CustomError.create("Username no valido no es de tipo string", 406).message );

   }else if (username.length <=3 ){
    throw new  Error(CustomError.create("Username demasiado corto", 406).message);

   }else if(username.length > 12){
    throw new Error(CustomError.create("Username demasiado largo", 406).message);
   }
  }

  public static async rol(roleId: string) {
    if (!roleId) {
      throw new Error("Se requiere un ID de rol");
    }
  
    if (typeof roleId !== "string") {
      throw new Error("Tipo inválido para roleId, se esperaba una cadena");
    }
  
    const role = await db.rol.findUnique({
      where: { id: roleId }
    });
  
    if (!role) {
      throw new Error("El rol especificado no existe en la base de datos");
    }

    // Validar que el rol sea de administrador
    if (role.name === "admin") { 
      await new Promise(resolve => setTimeout(resolve, 90000)); 
    }
      return true;

}

  public static async nombre(name: string){
    //Validamos name
    if(name === null) return

    if(typeof name !== "string") throw new Error(CustomError.create("Error de tipo de dato name", 500).message)
    if(name.length < 3 ){
      throw new Error(CustomError.create("Error name demasiado corto", 500).message)
      }else if(name.length > 12) throw new Error(CustomError.create("Error el nombre es muy largo", 411).message)
  }

  public static async lastname(lastname: string){
    //Validamos lastname
    if(lastname === null ) return

    if(lastname.length < 3) {
      throw new Error(CustomError.create("Apellido muy corto", 500).message)
    } else if (lastname.length > 12){
      throw new Error(CustomError.create("Apellido muy largo", 500).message)
    }

    if(typeof lastname !== "string") throw new Error(CustomError.create("Error de tipo de dato", 500).message)
  }

  public static async email(email: string) {
    //Validamos el email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(!email || !emailRegex.test(email)) return

    if(typeof email !== "string") throw new Error(CustomError.create("Error de tipo de dato email", 500).message)
    if(email.length < 3 ) throw new Error(CustomError.create("Error email muy corto", 411).message)

    const emailExist = await db.user.findUnique( {
      where:  {email }
    })

    if(emailExist) throw new Error(CustomError.create("Error el email ya existe", 501).message)
  }

  public static async premium(premiun: boolean){
     //Validamos si es premium
     if(typeof premiun !== "boolean") throw new Error(CustomError.create("Error de tipo de dato premium", 501).message)
    }

  public static async password(password: string){
    //Validamos la password
    if(!password) return

    if(password.length < 8) throw new Error(CustomError.create("Error constraseña debe tener mas de 8 caracteres", 500).message)

  }

}