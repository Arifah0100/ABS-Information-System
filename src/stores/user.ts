import { defineStore } from 'pinia';
import { UsersDto } from 'src/service/rest-api';
import userService from 'src/service/userAccount.service';

interface IUserAccountState {
  accounts: UsersDto[];
  activeAccount?: UsersDto;
}

export const useCounterStore = defineStore('user', {
  state: () =>
    ({
      accounts: [],
    } as IUserAccountState),

  getters: {},

  actions: {
    async addAccount(payload: any): Promise<any> {
      const result = await userService.create(payload);
      return result;
    },

    async editAccount(payload: any): Promise<any> {
      const result = await userService.update(payload.id, payload);
      return result;
    },

    async deleteAccount(id: number): Promise<any> {
      const result = await userService.delete(id);
      return result;
    },

    async getAllUser(): Promise<any> {
      const res = await userService.getAll();
      return res;
    },

    async getOneUser(id: number): Promise<any> {
      const res = await userService.getOne(id);
    },

    async getProfile(): Promise<any> {
      const res = await userService.getUserProfile();
      return res;
    },
  },
});
