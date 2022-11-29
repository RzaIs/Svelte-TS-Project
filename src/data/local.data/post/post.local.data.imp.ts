import type PostLocalData from "@data/local.data/post/post.local.data"
import { LocalStorageKeys } from "@data/local.provider/local.keys"
import type LocalProvider from "@data/local.provider/local.provider"
import type PostDTO from "@data/models/post/post.dto"

export default class PostLocalDataImp implements PostLocalData {

  constructor(private localProvider: LocalProvider) { }

  get cachedPosts(): PostDTO[] {
    return this.localProvider.readFromLocalStorage(LocalStorageKeys.PostCache) ?? []
  }

  savePosts(posts: PostDTO[]): void {
    this.localProvider.writeToLocalStorage(posts, LocalStorageKeys.PostCache)
  }
  clearAllCache(): void {
    this.localProvider.deleteFromLocalStorage(LocalStorageKeys.PostCache)
  }
}