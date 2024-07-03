import { defineStore } from 'pinia';

export const useCounterStore = defineStore('counter', {
  state: () => ({
    count: 0,
    user: {
      id: ''
    }
  }),
  actions: {
    // 定义 setUserIP action
    setUserIP(ip) {
      this.user.id = ip;
    }
  }
});