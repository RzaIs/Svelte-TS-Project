export default abstract class RSAEncryptor {
  abstract encrypt(text: string, publicKey: string): Promise<string>
}