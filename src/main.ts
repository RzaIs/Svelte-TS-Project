import App from './App.svelte'
import DataInject from '@data/inject/data.inject'
import InterfaceInject from '@interface/inject/interface.inject'

export const inject: InterfaceInject = new InterfaceInject(
  new DataInject('http://localhost:3000/')
)

const app = new App({
  target: document.getElementById('app')!
})

export default app
