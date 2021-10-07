import { writable } from 'svelte/store'

export const selectedCards = writable([])

export const bestScore = writable(Infinity)
