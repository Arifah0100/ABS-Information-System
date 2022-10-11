<template>
  <div class="q-pa-md">
    <q-table
      class="my-sticky-header-table"
      title="Manager Information"
      :grid="$q.screen.xs"
      :rows="rows"
      :columns="columns"
      row-key="name"
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
</template>

<script>
const columns = [
  { name: 'action', align: 'center', label: '', field: 'action' },
  {
    name: 'id',
    align: 'center',
    label: 'Employee ID',
    field: 'id',
    sortable: true,
  },
  {
    name: 'name',
    required: true,
    label: 'Full Name',
    align: 'center',
    field: (row) => row.name,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: 'startdate',
    align: 'center',
    label: 'Start Date',
    field: 'startdate',
    sortable: true,
  },
  {
    name: 'position',
    align: 'center',
    label: 'Position Title',
    field: 'position',
    sortable: true,
  },
  {
    name: 'department',
    align: 'center',
    label: 'Department Name',
    field: 'department',
    sortable: true,
  },
];

const rows = [
  {
    name: 'Analyn Villa',
    id: 159,
    startdate: 6.0,
    position: 'Collection Specialist',
    department: 'Collection',
    manager: 'Laureen',
  },
  {
    name: 'Princess Jacinto',
    id: 237,
    startdate: 9.0,
    position: 'Collection Specialist',
    department: 'Collection',
    manager: 'Laureen',
  },
  {
    name: 'Reynan Zuniega',
    id: 262,
    startdate: 16.0,
    position: 'Collection Specialist',
    department: 'Collection',
    manager: 'Laureen',
  },
  {
    name: 'Claude Erika Zaragoza',
    id: 305,
    startdate: 3.7,
    position: 'Collection Specialist',
    department: 'Collection',
    manager: 'Laureen',
  },
  {
    name: 'Alex Austero Jr.',
    id: 356,
    startdate: 16.0,
    position: 'Collection Specialist',
    department: 'Collection',
    manager: 'Laureen',
  },
  {
    name: 'JOhnson Satuito',
    id: 375,
    startdate: 0.0,
    position: 'Collection Specialist',
    department: 'Collection',
    manager: 'Laureen',
  },
  {
    name: 'Jayme Dologdog',
    id: 392,
    startdate: 0.2,
    position: 'Collection Specialist',
    department: 'Collection',
    manager: 'Laureen',
  },
  {
    name: 'Camille PeÑa',
    id: 408,
    startdate: 3.2,
    position: 'Collection Specialist',
    department: 'Collection',
    manager: 'Laureen',
  },
  {
    name: 'Dory Etareja',
    id: 452,
    startdate: 25.0,
    position: 'Collection Specialist',
    department: 'Collection',
    manager: 'Laureen',
  },
  {
    name: 'Marlito Escobar',
    id: 518,
    position: 'Collection Specialist',
    department: 'Collection',
    manager: 'Laureen',
  },
];

export default {
  setup() {
    return {
      columns,
      rows,
    };
  },
};
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
