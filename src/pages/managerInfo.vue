<template>
  <q-page>
    <div class="q-pa-md">
      <q-table
        class="my-sticky-header-table"
        title="Manage Accounts"
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
              dense
              debounce="300"
              v-model="filter"
              placeholder="Search"
            >
              <template v-slot:append>
                <q-icon name="search" />
              </template>
            </q-input>
            <div>
              <q-btn
                color="primary"
                dense
                flat
                icon="add"
                label="Add Account"
                @click="showAddDialog = true"
              />
              <q-tooltip :offset="[0, 8]">Add Account</q-tooltip>
            </div>
            <q-dialog v-model="showAddDialog" persistent>
              <AddEmployeeComponent />
            </q-dialog>
          </div>
        </template>

        <template v-slot:body-cell-action="props">
          <q-td :props="props">
            <!----Edit Dialog-->
            <div class="q-gutter-sm">
              <q-btn
                round
                color="warning"
                icon="edit"
                size="sm"
                flat
                dense
                @click="showEditDialog = true"
              >
                <q-tooltip class="bg-warning text-black" :offset="[10, 10]">
                  Edit
                </q-tooltip>
              </q-btn>
              <q-dialog v-model="showEditDialog" persistent>
                <EditEmployeeComponent />
              </q-dialog>

              <!---------------Delete Dialog--------------->
              <q-btn
                color="red-10"
                icon="delete"
                size="sm"
                class="q-ml-sm"
                flat
                round
                dense
                @click="showDeleteDialog = true"
              >
                <q-tooltip class="bg-red-10" :offset="[10, 10]">
                  Delete
                </q-tooltip>
              </q-btn>
              <q-btn
                round
                color="primary"
                icon="more_vert"
                size="md"
                flat
                dense
              >
                <q-tooltip class="bg-primary" :offset="[10, 10]">
                  Details
                </q-tooltip>
              </q-btn>
            </div>
          </q-td>
        </template>
      </q-table>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { EmployeesDto } from 'src/service/rest-api';
import { useEmployeeStore } from 'src/stores/epmloyee.store';
import { QTableColumn } from 'quasar';
import AddEmployeeComponent from '../components/EmployeeComponents/AddEmployeeComponent.vue';
import EditEmployeeComponent from 'src/components/EmployeeComponents/EditEmployeeComponent.vue';

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
  components: { AddEmployeeComponent, EditEmployeeComponent },
  data() {
    return {
      filter: '',
      addRowAccount: false,
      showAddDialog: false,
      showEditDialog: false,
      showDeleteDialog: false,
    };
  },

  setup() {
    return {
      columns,
      employeeStore,
      model: ref(null),
      step: ref(1),
      genderOption: ['Male', 'Female'],
      date: ref('2019/02/01'),
    };
  },

  async created() {
    await employeeStore.init();
  },

  methods: {
    onRejected(rejectedEntries: string | any[]) {
      // Notify plugin needs to be installed
      // https://quasar.dev/quasar-plugins/notify#Installation
      this.$q.notify({
        type: 'negative',
        message: `${rejectedEntries.length} file(s) did not pass validation constraints`,
      });
    },
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
