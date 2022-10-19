import { absApiService } from './../service/abs-api.service';

import { defineStore } from 'pinia';

export interface AUser {
  id?: number;
  status: string;
  dateCreated: string;
  userType: string;
  username?: string;
  password?: string;
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    currentUser: undefined as AUser | undefined,
  }),

  getters: {
    isLoggedIn: (state) => !!state.currentUser,
  },

  actions: {
    async loginUser(username: string, password: string) {
      const user = await absApiService.loginUser(username, password);
      this.currentUser = user;
      return user;
    },

    async logout() {
      if (this.currentUser) {
        absApiService.logoutUser();
        this.currentUser = undefined;
      }
    },

    async authUser() {
      try {
        this.currentUser =
          this.currentUser || (await absApiService.getCurrentUser());
      } catch {
        this.currentUser = undefined;
      }
    },

    async changePassword(changePassword: string) {
      await absApiService.changePassword(changePassword);
    },

    async verifyPin(payload: string) {
      const val = await absApiService.verifyPassword(payload);
      if (val) {
        return true;
      }
      return false;
    },
  },
});
