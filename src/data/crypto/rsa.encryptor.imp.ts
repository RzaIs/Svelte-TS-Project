import JSEncrypt from "jsencrypt"
import type RSAEncryptor from "@data/crypto/rsa.encryptor"


export default class RSAEncryptorImp implements RSAEncryptor {

  private encryptor = new JSEncrypt()

  encrypt(text: string, publicKey: string): Promise<string> {
    return new Promise((resolve, reject) => {
      this.encryptor.setPublicKey(publicKey)
      const encryptedText = this.encryptor.encrypt(text)
      if (encryptedText === false) reject(Error('encrypt'))
      else resolve(encryptedText)
    })
  }
}
