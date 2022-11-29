import type PostApi from "@data/api/post/post.api"
import type PostLocalData from "@data/local.data/post/post.local.data"
import type PaginatedDTO from "@data/models/common/paginated.dto"
import type PostDTO from "@data/models/post/post.dto"
import type PostRepo from "@data/repositories/post/post.repo"

export default class PostRepoImp implements PostRepo {

  constructor(
    private api: PostApi,
    private localData: PostLocalData
  ) { }

  async fetchAndCachePosts(params: {
    page: number,
    count: number
  }): Promise<PaginatedDTO<PostDTO>> {
    let step = 0
    try {
      const result = await this.api.getPosts(params)
      step = 1
      this.localData.savePosts(result.data)
      return result
    } catch (error) {
      throw Error(`POST@1.${step}`)
    }
  }

  async fetchPosts(params: {
    page: number,
    count: number
  }): Promise<PaginatedDTO<PostDTO>> {
    try {
      return await this.api.getPosts(params)
    } catch (error) {
      throw Error('POST@2.0')
    }
  }

  async createPost(params: {
    title: string,
    content: string,
    type: 'URL' | 'TEXT' | 'IMAGE'
  }): Promise<PostDTO> {
    try {
      return await this.api.createPost(params)
    } catch (error) {
      throw Error('POST@3.0')    
    }
  }


  async deletePost(id: string): Promise<void> {
    try {
      await this.api.deletePost(id)
    } catch (error) {
      throw Error('POST@4.0')        
    }
  }

  async fetchPost(id: string): Promise<PostDTO> {
    try {
      return await this.api.getPost(id)
    } catch (error) {
      throw Error('POST@5.0')        
    }
  }

  clearCache(): void {
    this.localData.clearAllCache()
  }

  get cachedPosts(): PostDTO[] {
    return this.localData.cachedPosts
  }
}