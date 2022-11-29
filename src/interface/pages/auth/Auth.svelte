<script lang="ts">
  import { inject } from "../../../main"
  import { AuthType } from "@interface/pages/auth/controller"

  const controller = inject.authController

  let authType = AuthType.LOGIN

  let email: string = ""
  let username: string = ""
  let password: string = ""

  function onSubmit(event: SubmitEvent) {
    event.preventDefault()
    switch (authType) {
      case AuthType.LOGIN:
        controller.login({
          username,
          password,
        })
        break
      case AuthType.REGISTER:
        controller.register({
          email,
          username,
          password,
        })
        break
    }
  }

  function onChangeAuthType(type: AuthType) {
    authType = type
  }
</script>

<div>
  {#if authType === AuthType.LOGIN}
    <p>Don't have an account yet?</p>
    <button on:click={() => onChangeAuthType(AuthType.REGISTER)}>
      REGISTER
    </button>
  {:else}
    <p>Already have an account?</p>
    <button on:click={() => onChangeAuthType(AuthType.LOGIN)}> LOGIN </button>
  {/if}
  <form on:submit={onSubmit}>
    {#if authType === AuthType.REGISTER}
      <p>
        <input type="email" bind:value={email} required />
      </p>
    {/if}
    <p>
      <input type="text" bind:value={username} required />
    </p>
    <p>
      <input type="password" bind:value={password} required />
    </p>
    {#if authType === AuthType.LOGIN}
      <p>
        <input type="submit" value="login" />
      </p>
    {:else}
      <p>
        <input type="submit" value="register" />
      </p>
    {/if}
  </form>
</div>

<style>
</style>
