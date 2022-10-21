<template>
  <q-page>
    <div class="q-pa-md">
      <q-table
        class="my-sticky-header-table"
        title="Employee Information"
        :grid="$q.screen.xs"
        :rows="employeeStore.employees"
        :columns="columns"
        row-key="empID"
      >
        <template v-slot:top-right>
          <div class="q-gutter-sm row">
            <q-input
              outlined
              rounded
              densea
              debounce="300"
              v-model="filter"
              placeholder="Search"
            >
              <template v-slot:append>
                <q-icon name="search" />
              </template>
            </q-input>
            <div style="max-width: 300px">
              <q-btn
                color="primary"
                dense
                flat
                icon="add"
                label="Add Account"
                @click="addNewAccount = true"
              />
              <q-tooltip :offset="[0, 8]">Add Account</q-tooltip>
            </div>
          </div>
        </template>
        <template v-slot:body-cell-action="props">
          <q-td :props="props">
            <div class="q-gutter-sm">
              <q-btn
                round
                color="warning"
                icon="edit"
                size="sm"
                flat
                dense
                @click="openEditDialog(props.row.student)"
                ><q-tooltip class="bg-warning text-black" :offset="[10, 10]">
                  Edit
                </q-tooltip></q-btn
              >
              <q-dialog v-model="editRowAccount" persistent>
                <q-card style="width: 1100px; max-width: 100vw">
                  <q-card-section class="row">
                    <q-toolbar>
                      <div class="text-h6">Edit Account</div>
                      <q-space />
                      <q-btn
                        flat
                        round
                        dense
                        icon="close"
                        color="primary"
                        v-close-popup
                      />
                    </q-toolbar>
                  </q-card-section>
                </q-card>
              </q-dialog>
              <q-btn
                color="red-10"
                icon="delete"
                size="sm"
                class="q-ml-sm"
                flat
                round
                dense
                @click="deleteSpecificAccount(props.row)"
                ><q-tooltip class="bg-red-10" :offset="[10, 10]">
                  Delete
                </q-tooltip></q-btn
              >
              <q-btn
                round
                color="primary"
                icon="more_vert"
                size="md"
                flat
                dense
                @click="openDetailDialog(props.row)"
                ><q-tooltip class="bg-primary" :offset="[10, 10]">
                  Details
                </q-tooltip></q-btn
              >
            </div>
          </q-td>
        </template>
      </q-table>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { EmployeesDto } from 'src/service/rest-api';
import { useEmployeeStore } from 'src/stores/epmloyee.store';
import { QTableColumn } from 'quasar';

const columns: QTableColumn[] = [
  { name: 'action', align: 'center', label: '', field: 'action' },
  {
    name: 'empID',
    align: 'center',
    label: 'Employee ID',
    field: (row: EmployeesDto) => row.empID,
    sortable: true,
  },
  {
    name: 'name',
    required: true,
    label: 'Full Name',
    align: 'center',
    field: (row: EmployeesDto) =>
      `${row.firstName} ${row.middleName} ${row.lastName}`,
    sortable: true,
  },
  {
    name: 'startdate',
    align: 'center',
    label: 'Start Date',
    field: (row: EmployeesDto) => row.startDate,
    sortable: true,
  },
  {
    name: 'position',
    align: 'center',
    label: 'Position Title',
    field: (row: EmployeesDto) => row.position,
    sortable: true,
  },
  {
    name: 'department',
    align: 'center',
    label: 'Department Name',
    field: (row: EmployeesDto) => row.department,
    sortable: true,
  },
  {
    name: 'manager',
    align: 'center',
    label: 'Hiring Manager',
    field: (row: EmployeesDto) => row.position,
    sortable: true,
  },
];
const employeeStore = useEmployeeStore();
export default defineComponent({
  // data() {
  //   const employeeForm: EmployeesDto = {
  //     empID: 0,
  //     firstName: '',
  //     middleName: '',
  //     lastName: '',
  //     startDate: '',
  //     department: '',
  //     position: '',
  //     gender: '',
  //   };
  // },
  setup() {
    return {
      columns,
      employeeStore,
    };
  },

  async created() {
    await employeeStore.getAllEmployee();
  },

  // async addEmployee() {},
});
</script>

<style lang="sass">
.my-sticky-header-table
  /* height or max-height is important */
  height: 100%
  max-height: 100%
  width: 100%
  max-width: 100%

  .q-table__top,
  .q-table__bottom,

thead tr:first-child th
    /* bg color is important for th; just specify one */
  background-color: white

  thead tr th
    position: sticky
    z-index: 1
  thead tr:first-child th
    top: 0

  /* this is when the loading indicator appears */
  &.q-table--loading thead tr:last-child th
    /* height of all previous header rows */
    top: 48px
</style>
