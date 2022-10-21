import { absApiService } from './abs-api.service';
import { DefaultApi, EmployeesDto } from './rest-api/api';

class EmployeeService extends DefaultApi {
  async create(payload: EmployeesDto) {
    const response = await absApiService.addEmployee(payload);
    if (response.status === 201) {
      return response.data;
    }
    throw new Error(response.statusText);
  }

  async getAll() {
    const response = await absApiService.getEmployees();
    if (response.status === 200) {
      return response.data;
    } else {
      [];
    }
  }

  async getOne(id: number) {
    const response = await absApiService.getEmployee(id);
    if (response.status === 200) {
      return response.data;
    }
    throw new Error(response.statusText);
  }

  async update(id: number, payload: EmployeesDto) {
    const response = await absApiService.updateEmployee(id, payload);
    if (response.status === 200) {
      return response.data;
    }
    throw new Error(response.statusText);
  }

  async delete(id: number) {
    const response = await absApiService.deleteEmployee(id);
    if (response.status === 200) {
      return response.data;
    }
    throw new Error(response.statusText);
  }
}

const employeeService = new EmployeeService();
export default employeeService;
