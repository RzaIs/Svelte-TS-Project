import type { LocalStorageKeys, CookieKeys } from "@data/local.provider/local.keys"
import type LocalProvider from "@data/local.provider/local.provider"

export default class LocalProviderImp implements LocalProvider {

  writeToLocalStorage<T>(value: T, key: LocalStorageKeys): void {
    const json: string = JSON.stringify(value)
    localStorage.setItem(key, json)
  }

  readFromLocalStorage<T>(key: LocalStorageKeys): T | null {
    const json: string | null = localStorage.getItem(key)
    if (json === null) return null
    return JSON.parse(json)
  }

  deleteFromLocalStorage(key: LocalStorageKeys): void {
    localStorage.removeItem(key)
  }

  // do not use ' ' or '=' in value or key
  writeToCookie(value: string, key: CookieKeys): void {
    document.cookie = `${key}=${value}`
  }

  // do not use ' ' or '=' in value or key
  readFromCookie(key: CookieKeys): string | undefined {
    const value = document.cookie.split('; ')
      .find((row) => row.startsWith(key))
      ?.split('=')[1]
    return value
  }

  // do not use ' ' or '=' in value or key
  deleteFromCookie(key: CookieKeys): void {
    document.cookie = `${key}=`
  }
}