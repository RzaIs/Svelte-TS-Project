export default interface AuthRegisterBody {
  email: string
  username: string
  encryptedPassword: string
  keyID: string
}