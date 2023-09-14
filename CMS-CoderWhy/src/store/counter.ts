import { defineStore } from 'pinia'
const useCounterStore = defineStore('counter', {
  state: () => ({
    counter: 100
  }),
  getters: {
    doubleCounters(state) {
      return state.counter * 2
    }
  },
  actions: {
    changeCounterActions(newCounter: number) {
      this.counter = newCounter
    }
  }
})

export default useCounterStore
