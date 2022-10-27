<template>
  <q-card class="bg-primary text-white" style="max-width: 1000px">
    <q-bar class="q-py-lg text-overline">
      Edit Employee
      <q-space />

      <q-btn dense flat icon="close" v-close-popup>
        <q-tooltip class="bg-white text-primary">Close</q-tooltip>
      </q-btn>
    </q-bar>

    <q-card-section class="q-pt-none">
      <q-form @submit="stepCheck()">
        <div class="q-pa-md">
          <q-card flat class="text-black">
            <div class="row no-wrap q-pa-xl">
              <div class="column">
                <div class="q-gutter-md q-pb-md row" style="max-width: 800px">
                  <q-input
                    class="col"
                    dense
                    outlined
                    bg-color="white"
                    v-model="employee.firstName"
                    label="First Name"
                    readonly
                  />
                  <q-input
                    outlined
                    dense
                    class="col"
                    bg-color="white"
                    v-model="employee.middleName"
                    label="Middle Name"
                    readonly
                  />
                  <q-input
                    outlined
                    dense
                    class="col"
                    bg-color="white"
                    v-model="employee.lastName"
                    label="Last Name"
                    readonly
                  />
                </div>
                <div class="q-gutter-md row q-pb-md" style="max-width: 800px">
                  <q-input
                    outlined
                    dense
                    class="col"
                    bg-color="white"
                    v-model="employee.empID"
                    label="Employee ID"
                    readonly
                  />
                  <q-input
                    class="col"
                    :options="genderOption"
                    dense
                    outlined
                    bg-color="white"
                    v-model="employee.gender"
                    label="Gender"
                    transition-show="flip-up"
                    transition-hide="flip-down"
                    readonly
                  />
                  <q-input
                    outlined
                    dense
                    class="col"
                    bg-color="white"
                    v-model="employee.emailAddress"
                    label="Email Address"
                    readonly
                  />
                </div>
                <div class="q-gutter-md row q-pb-md" style="max-width: 800px">
                  <q-input
                    outlined
                    dense
                    class="col"
                    bg-color="white"
                    v-model="employee.contactNumber"
                    label="Contact Number"
                    readonly
                  />
                  <q-input
                    outlined
                    dense
                    class="col"
                    bg-color="white"
                    v-model="employee.address"
                    label="Address"
                    readonly
                  />
                </div>
                <div class="q-gutter-md q-pb-md row" style="max-width: 800px">
                  <q-input
                    class="col"
                    dense
                    outlined
                    bg-color="white"
                    v-model="employee.department"
                    label="Department"
                    readonly
                  />
                  <q-input
                    outlined
                    dense
                    class="col"
                    bg-color="white"
                    v-model="employee.position"
                    label="Position"
                    readonly
                  />
                  <q-input
                    outlined
                    v-model="employee.startDate"
                    class="col"
                    bg-color="white"
                    dense
                    label="Started Date"
                    readonly
                  />
                </div>
              </div>

              <q-separator vertical inset class="q-mx-lg" />

              <div class="column items-center">
                <q-avatar size="150px">
                  <img src="https://cdn.quasar.dev/img/avatar4.jpg" />
                </q-avatar>

                <div class="text-h6 q-mt-md q-mb-xs text-uppercase">
                  {{ employee.firstName }} {{ employee.middleName }}
                  {{ employee.lastName }}
                </div>
              </div>
            </div>
          </q-card>

          <q-card-actions align="right">
            <q-btn glossy label="Cancel" />
            <q-btn color="negative" glossy label="Save" />
          </q-card-actions>
        </div>
      </q-form>
    </q-card-section>
  </q-card>
</template>

<script lang="ts">
import { useEmployeeStore } from 'src/stores/epmloyee.store';
import { defineComponent, ref } from 'vue';
import { EmployeesDto } from '../../service/rest-api';

const employeeStore = useEmployeeStore();

export default defineComponent({
  data() {
    const employee: EmployeesDto = {
      empID: '',
      firstName: '',
      middleName: '',
      lastName: '',
      startDate: '',
      department: '',
      position: '',
      gender: '',
      contactNumber: '',
      emailAddress: '',
      address: '',
      profileId: '',
    };
    return {
      employee,
      error1: false,
      error2: false,
    };
  },
  setup() {
    return {
      employeeStore,
      model: ref(null),
      step: ref(1),
      genderOption: ['Male', 'Female'],
      date: ref('2019/02/01'),
    };
  },
  methods: {
    stepCheck() {
      if (this.step == 1) {
        if (
          !this.employee.empID &&
          !this.employee.firstName &&
          !this.employee.middleName &&
          !this.employee.lastName &&
          !this.employee.gender
        ) {
          this.error1 = true;
          return;
        } else {
          this.error1 = false;
          this.step = 2;
        }
      } else if (this.step == 2) {
        if (
          !this.employee.startDate &&
          !this.employee.department &&
          !this.employee.position
        ) {
          this.error2 = true;
          return;
        } else {
          this.error2 = false;
          this.step = 3;
        }
      }
    },
    async onEditEmployee() {
      try {
        await employeeStore.updateEmployee(this.employee);
        this.onReset();
        this.$q.notify({
          type: 'positive',
          message: 'Successfully Edit.',
        });
      } catch (error) {}
    },
    async onReset() {
      this.employee = {
        empID: '',
        firstName: '',
        middleName: '',
        lastName: '',
        startDate: '',
        department: '',
        position: '',
        gender: '',
        contactNumber: '',
        emailAddress: '',
        address: '',
        profileId: '',
      };
    },
  },
});
</script>

<style></style>
