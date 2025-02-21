export type Rol = 'admin' | 'user'

export interface UserEntity {
  roleId: string;
  username: string,
  name: string,
  email: string,
  lastname: string,
  password: string
  premiun?: boolean
}