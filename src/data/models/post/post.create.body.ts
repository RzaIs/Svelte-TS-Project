export default interface PostCreateBody {
  title: string
  content: string
  type: 'URL' | 'TEXT' | 'IMAGE'
}