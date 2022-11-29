import type PaginatedDTO from "@data/models/common/paginated.dto"
import type PostDTO from "@data/models/post/post.dto"
import type PostRepo from "@data/repositories/post/post.repo"
import BaseController from "@interface/base/base.controller"

export default class HomeController extends BaseController {

  private page: number = 0
  private defaultPageCount: number = 32

  constructor(private postRepo: PostRepo) {
    super()
  }

  get postCache(): PostDTO[] {
    return this.postRepo.cachedPosts
  }

  async postFetchCache(): Promise<PaginatedDTO<PostDTO>> {
    const result = await this.postRepo.fetchAndCachePosts({
      count: this.defaultPageCount,
      page: 0
    })
    this.page += 1
    return result
  }

  async postFetchMany(): Promise<PaginatedDTO<PostDTO>> {
    const result = await this.postRepo.fetchPosts({
      count: this.defaultPageCount,
      page: this.page
    })
    this.page += 1
    return result
  }
}
