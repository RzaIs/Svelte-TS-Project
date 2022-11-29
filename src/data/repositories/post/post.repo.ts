import type PaginatedDTO from "@data/models/common/paginated.dto"
import type PostDTO from "@data/models/post/post.dto"

export default abstract class PostRepo {
  abstract fetchAndCachePosts(params: {
    page: number,
    count: number
  }): Promise<PaginatedDTO<PostDTO>>

  abstract fetchPosts(params: {
    page: number,
    count: number
  }): Promise<PaginatedDTO<PostDTO>>

  abstract createPost(params: {
    title: string,
    content: string,
    type: string
  }): Promise<PostDTO>

  abstract deletePost(id: string): Promise<void>
  abstract fetchPost(id: string): Promise<PostDTO>
  abstract clearCache(): void
  abstract get cachedPosts(): PostDTO[]
}