import bcrypt from 'bcrypt';
import { CustomError } from '../../app/custom-error';
import { ResPostUserDto, Validations } from "../../app/validations";
import { SALTS_ROUNDS } from "../../config";
import { db } from "../../prisma/db";
import { UserEntity } from "./domain/entities/user.entity";

export class UserRepository extends ResPostUserDto{
  public static async create({username, lastname, name, email, premiun, password, roleId}: UserEntity){
    //Validamos que no esten enviando cosas raras

    //Validamos username
    Validations.username(username)
    console.log(username)
    const userExist = await db.user.findUnique(
      {
        where: {username}
      }
    )

    if(userExist) throw new Error(CustomError.create("Error el username ya existe", 406).message);

    //Validamos name
    Validations.nombre(name)

    //Validamos el lastname
    Validations.lastname(lastname)

    //Validamos el email
    Validations.email(email)

    //Validamos la password
    Validations.password(password)

    Validations.rol(roleId)

    const hashPassword = await bcrypt.hash(password, SALTS_ROUNDS)

    const newUser = await db.user.create({
      data: {
        username: username,
        password: hashPassword,
        roleId: roleId,
        isPremium: premiun,
        name: name,
        lastname: lastname,
        email: email,
      }
    })

    console.log(newUser)
    return ResPostUserDto.success("Operacion exitosa", 200);
  }


  public static async login({ username, password }: { username: string; password: string }) {

    Validations.password(password)

    // Buscar el usuario con su contraseña en una sola consulta
    const user = await db.user.findUnique({
      where: { username },
      select: { username: true, password: true, id: true }
    });

    if (!user) {
      throw new Error(CustomError.create("Error: el username no existe", 404).message);
    }

    // Comparar contraseñas
    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      throw new Error(CustomError.create("Invalid password", 400).message);
    }

    // Retornamos solo el username para seguridad
    return { username: user.username, id: user.id };
  }
}