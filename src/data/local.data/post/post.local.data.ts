import type PostDTO from "@data/models/post/post.dto"

export default abstract class PostLocalData {
  abstract get cachedPosts(): PostDTO[]
  abstract savePosts(posts: PostDTO[]): void
  abstract clearAllCache(): void
}