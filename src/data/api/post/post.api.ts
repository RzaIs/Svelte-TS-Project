import type PaginatedDTO from "@data/models/common/paginated.dto"
import type PostCreateBody from "@data/models/post/post.create.body"
import type PostDTO from "@data/models/post/post.dto"
import type PostGetBody from "@data/models/post/post.get.body"

export default abstract class PostApi {
  abstract getPosts(body: PostGetBody): Promise<PaginatedDTO<PostDTO>>
  abstract createPost(body: PostCreateBody): Promise<PostDTO>
  abstract deletePost(id: string): Promise<void>
  abstract getPost(id: string): Promise<PostDTO>
}
