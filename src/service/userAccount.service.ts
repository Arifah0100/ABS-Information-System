import { absApiService } from './abs-api.service';
import { UsersDto } from './rest-api';
import { DefaultApi } from './rest-api/api';

class UserService extends DefaultApi {
  async create(payload: UsersDto) {
    const response = await absApiService.addUser(payload);
    if (response.status === 201) {
      return response.data;
    } else {
      [];
    }
  }

  async getAll() {
    const response = await absApiService.getUsers();
    if (response.status === 200) {
      return response.data;
    } else {
      [];
    }
  }

  async getOne(id: number) {
    const response = await absApiService.getUser(id);
    if (response.status === 200) {
      return response.data;
    } else {
      [];
    }
  }

  async update(id: number, payload: UsersDto) {
    const response = await absApiService.updateUser(id, payload);
    if (response.status === 200) {
      return response.data;
    } else {
      [];
    }
  }

  async delete(id: number) {
    const response = await absApiService.deleteUser(id);
    if (response.status === 200) {
      return response.data;
    } else {
      [];
    }
  }

  async getUserProfile() {
    const response = await absApiService.getProfile();
    return response.data;
  }
}

const userService = new UserService();
export default userService;
