import { EmployeesDto } from './../service/rest-api/api';
import { defineStore } from 'pinia';
import employeeService from 'src/service/employee.service';

export interface IEmployees {
  id: number;
  empID: string;
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
    async init() {
      const res = await fetch('http://localhost:3000/employees');
      const data = await res.json();
      this.employees = data;
    },
    async addEmployee(payload: EmployeesDto) {
      const result = await employeeService.create(payload);
      await this.init();
    },
    async updateEmployee(payload: any) {
      const result = await employeeService.update(payload.id, payload);
      await this.init();
    },
    async deleteEmployee(id: number) {
      const result = await employeeService.delete(id);
      await this.init();
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
