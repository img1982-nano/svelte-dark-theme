import { apply } from '@jill64/svelte-html'
import type { Handle } from '@sveltejs/kit'
import { bakery } from './bakery'
import { store } from './store.svelte'
import { isThemeValue } from './util/isThemeValue'

export const onRender = (options?: { cookieKey?: string }): Handle => {
  const { cookieKey = 'svelte-dark-theme' } = options ?? {}

  return ({ event, resolve }) => {
    const { request, cookies } = event

    const isPageRequest = request.headers.get('Accept')?.includes('text/html')

    if (!isPageRequest) {
      return resolve(event)
    }

    const { bakedCookies } = bakery(cookieKey).bake(cookies)
    const obj = bakedCookies[cookieKey]

    store.setting = obj.setting

    const value = isThemeValue(obj.setting) ? obj.setting : obj.media

    store.server = value

    return resolve(event, {
      transformPageChunk: apply({
        class: value
      })
    })
  }
}
