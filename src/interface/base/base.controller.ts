import type { Subscription } from "rxjs"

export default class BaseController {
  private subscriptions = new Set<Subscription>()

  add(subscription: Subscription) {
    this.subscriptions.add(subscription)
  }
  
  onDisappear() {
    this.subscriptions.forEach((s) => s.unsubscribe())
    this.subscriptions.clear()
  }
}