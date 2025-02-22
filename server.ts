import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { server } from './index';
import { PORT, SECRET_KEY_JWT } from './src/config';
import { PromptRepository } from './src/module/gemini-ai/infrastructure/prompt-repository';
import { ImpProductDto } from './src/module/product/infrastructure/repositories/product.repository';
import { UserEntity } from './src/module/user/domain/entities/user.entity';
import { UserRepository } from './src/module/user/user-repository';
import { db } from './src/prisma/db';

// Creamos un middleware

server.post('/login', async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    const user = await UserRepository.login({ username, password });

    const token = jwt.sign(
      { id: user.id, username: user.username },
      SECRET_KEY_JWT,
      { expiresIn: '1h' }
    );

    res
      .cookie('access_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 1000 * 60 * 60
      })
      .status(200)
      .send({ user, token });
      console.log(user,'token:', token)
  } catch (error) {
    res.status(500).json({ error: "Error en el servidor" });
  }
});

server.post('/register', async (req: Request, res: Response) => {
  const { username, name, lastname, email, password, premiun, roleId}: UserEntity = req.body;

  try {
      const user = await UserRepository.create({username,lastname, name, email, password, premiun, roleId });
      if(!user) res.status(500).json("Error no se ha creado el usuario")
  
       res.json('Usuario creado éxitosamente')

  } catch(error){
    res.status(500).send(error);
  }
});

server.post('/prompts', async  (req, res) => {
  try {
  const {prompts} = req.body

    if(prompts === undefined) return

  const prompt = await PromptRepository.prompt(prompts)

  res.json(prompt)
  } catch{
    res.status(500).json("Error interno de servidor")
  }
})

server.get('/registerRol', async (req, res) => {
  try {
    const roles = await db.rol.findMany()

    res.send(roles)
    if(!roles)  res.status(401).json("Error al obtener roles")
  } catch (error) {
    res.status(500).json("Error de servidor")
  }
})

server.post('logout', () => {
  //Limpiamos las cookies
  //y enviamos mensaje y tambien redireccionamos
})

server.get('users', () => {})

server.get('/products', (req: Request, res: Response) => {
  const token = req.cookies.access_token

  if(!token) res.status(401).send('Access not authorized')

  try{
    const data = jwt.verify(token, SECRET_KEY_JWT)
    res.render(`proctected ${data}`)

    const productImplements =  new ImpProductDto()

     res.json(productImplements.getProduct())
  }catch(error){
    res.status(500).send("Error interno")
  }
})

server.post('/products', (req, res) => {
  try {
    const {name, price} = req.body

    const newProduct = new ImpProductDto()
    
    newProduct.reqPostProduct({name, price})

    res.json("Producto añadido correctamente")
  } catch(err){
    return console.table(err)
  }
})


server.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
})