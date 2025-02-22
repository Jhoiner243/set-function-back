import dotenv from 'dotenv'
dotenv.config()

export const {
  PORT = 3000,
  SALTS_ROUNDS = 10,
  SECRET_KEY_JWT = "muy veloz, yo soy veloz",
  API_KEY = "nada"
} = process.env

