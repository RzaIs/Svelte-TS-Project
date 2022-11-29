<script lang="ts">
  import type PostDTO from "@data/models/post/post.dto";
  import { onMount } from "svelte"
  import { inject } from "../../../main"

  const controller = inject.homeController

  let posts: PostDTO[] = controller.postCache
  let hasNext: boolean = false

  onMount(() => {
    controller
      .postFetchCache()
      .then((result) => {
        posts = result.data
        hasNext = result.hasNext
      })
      .catch((e) => alert(e))
  })

  function onLoadMore() {
    controller
      .postFetchMany()
      .then((result) => {
        posts = posts.concat(result.data)
        hasNext = result.hasNext
      })
      .catch((e) => alert(e))
  }
</script>

<table>
  {#each posts as post (post.id)}
    <div>
      <p>{post.id}</p>
      <p>{post.title}</p>
      <p>{post.content}</p>
      <p>{post.type}</p>
      <p>{post.created}</p>
      <p>{post.updated}</p>
      <p>{post.author.username}</p>
      <p>{post.likeStatus}</p>
      <p>{post.numberOfLikes}</p>
    </div>
    <br/>
  {/each}
  {#if hasNext}
    <button on:click={onLoadMore}>load more</button>    
  {/if}
</table>

<style>
</style>
