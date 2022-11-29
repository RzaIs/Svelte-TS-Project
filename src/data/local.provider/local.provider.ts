import type { CookieKeys, LocalStorageKeys } from "@data/local.provider/local.keys"

export default abstract class LocalProvider {
  abstract writeToLocalStorage<T>(value: T, key: LocalStorageKeys): void
  abstract readFromLocalStorage<T>(key: LocalStorageKeys): T | null
  abstract deleteFromLocalStorage(key: LocalStorageKeys): void

  abstract writeToCookie(value: string, key: CookieKeys): void
  abstract readFromCookie(key: CookieKeys): string | undefined
  abstract deleteFromCookie(key: CookieKeys): void
}