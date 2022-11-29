<script lang='ts'>
  import { inject } from "../../../main"
  import { onDestroy, onMount } from "svelte"
  import Auth from "@interface/pages/auth/Auth.svelte"
  import Home from "@interface/pages/home/Home.svelte"
  
  const controller = inject.containerController

  let loginState = controller.loginState

  onMount(() => {
    const loginStateSubscription = controller.observeLoginState.subscribe((state) => {
      loginState = state
    })
    controller.add(loginStateSubscription)
  })

  onDestroy(() => controller.onDisappear())

</script>

{#if loginState}
  <Home/>
{:else}
  <Auth/>
{/if}

<style>

</style>