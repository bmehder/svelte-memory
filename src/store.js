import { writable } from 'svelte/store'

export const articles = writable([])

export const bestScore = writable(Infinity)
