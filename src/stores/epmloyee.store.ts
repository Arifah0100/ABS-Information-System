import { EmployeesDto } from './../service/rest-api/api';
import { defineStore } from 'pinia';
import employeeService from 'src/service/employee.service';

export interface IEmployees {
  id: number;
  empID: number;
  firstName: string;
  middleName: string;
  lastName: string;
  startDate: string;
  department: string;
  position: string;
  profileId?: string;
  contactNumber?: string;
  emailAddress?: string;
  gender: string;
  address?: string;
}

export interface IEmployeeState {
  employees: IEmployees[];
  employeeAccount?: IEmployees;
}

export const useEmployeeStore = defineStore('employee-store', {
  state: () =>
    ({
      employees: [],
    } as IEmployeeState),

  getters: {},

  actions: {
    async addEmployee(payload: EmployeesDto) {
      const result = await employeeService.create(payload);
      await this.getAllEmployee();
    },
    async updateEmployee(payload: any) {
      const result = await employeeService.update(payload.id, payload);
      await this.getAllEmployee();
    },
    async deleteEmployee(id: number) {
      const result = await employeeService.delete(id);
      await this.getAllEmployee();
    },
    async getAllEmployee() {
      const result = await employeeService.getAll();
      return result;
    },
    async getOneEmployee(id: number) {
      const result = await employeeService.getOne(id);
    },
  },
});
