export default interface PostDTO {
  id: string
  title: string
  content: string
  type: 'URL' | 'TEXT' | 'IMAGE'
  created: string
  updated: string
  likeStatus: 'LIKED' | 'DISLIKED' | 'NONE'
  numberOfLikes: number
  author: {
    id: string,
    username: string
  }
}