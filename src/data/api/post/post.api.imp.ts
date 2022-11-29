import type PostApi from '@data/api/post/post.api'
import type AuthLocalData from '@data/local.data/auth/auth.local.data'
import { CookieKeys } from '@data/local.provider/local.keys'
import type LocalProvider from '@data/local.provider/local.provider'
import type PaginatedDto from '@data/models/common/paginated.dto'
import type PostCreateBody from '@data/models/post/post.create.body'
import type PostDto from '@data/models/post/post.dto'
import type PostGetBody from '@data/models/post/post.get.body'
import type { Axios, AxiosRequestConfig } from 'axios'

export default class PostApiImp implements PostApi {
  private urls = {
    post: "post",
    postByID: "post/{id}",
    paginatedPost: "post/paginated"
  }

  constructor(
    private axios: Axios,
    private authLocalData: AuthLocalData
  ) { }

  get config(): AxiosRequestConfig {
    return {
      headers: {
        'Authorization': 'Bearer ' + this.authLocalData.accessToken,
        'refresh-token': this.authLocalData.refreshToken
      }
    }
  }

  async getPosts(body: PostGetBody): Promise<PaginatedDto<PostDto>> {
    return (
      await this.axios.post(this.urls.paginatedPost, body, this.config)
    ).data
  }

  async createPost(body: PostCreateBody): Promise<PostDto> {
    return (
      await this.axios.post(this.urls.post, body, this.config)
    ).data
  }

  async deletePost(id: string): Promise<void> {
    return await this.axios.delete(this.urls.postByID.replace('{id}', id), this.config)
  }

  async getPost(id: string): Promise<PostDto> {
    return (
      await this.axios.get(this.urls.postByID.replace('{id}', id), this.config)
    ).data
  }
}