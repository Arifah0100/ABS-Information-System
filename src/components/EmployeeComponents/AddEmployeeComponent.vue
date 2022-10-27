<template>
  <q-card class="bg-primary text-white" style="max-width: 1000px">
    <q-bar class="q-py-lg">
      Add Employee

      <q-space />

      <q-btn dense flat icon="close" v-close-popup>
        <q-tooltip class="bg-white text-primary">Close</q-tooltip>
      </q-btn>
    </q-bar>

    <q-card-section class="q-pt-none">
      <q-form @submit="stepCheck()">
        <div class="q-pa-md">
          <q-stepper
            v-model="step"
            ref="stepper"
            color="primary"
            animated
            class="bg-primary"
            active-color="white"
            done-color="lime"
            flat
          >
            <q-step
              :name="1"
              title="Employee Information"
              icon="settings"
              :error="error1"
              :caption="error1 ? 'Please fill up all required inputs' : ''"
              :done="step > 1"
            >
              <div class="q-gutter-md q-pb-md row" style="max-width: 800px">
                <q-input
                  class="col"
                  dense
                  outlined
                  bg-color="white"
                  v-model="employee.firstName"
                  label="First Name"
                  :rules="[
                    (val) =>
                      (val && val.length > 0) || 'Please fill this field',
                  ]"
                />
                <q-input
                  outlined
                  dense
                  class="col"
                  bg-color="white"
                  v-model="employee.middleName"
                  label="Middle Name"
                  :rules="[
                    (val) =>
                      (val && val.length > 0) || 'Please fill this field',
                  ]"
                />
                <q-input
                  outlined
                  dense
                  class="col"
                  bg-color="white"
                  v-model="employee.lastName"
                  label="Last Name"
                  :rules="[
                    (val) =>
                      (val && val.length > 0) || 'Please fill this field',
                  ]"
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
                  :rules="[
                    (val) =>
                      (val && val.length > 0) || 'Please fill this field',
                  ]"
                />
                <q-select
                  class="col"
                  :options="genderOption"
                  dense
                  outlined
                  bg-color="white"
                  v-model="employee.gender"
                  label="Gender"
                  transition-show="flip-up"
                  transition-hide="flip-down"
                  :rules="[
                    (val) =>
                      (val && val.length > 0) || 'Please fill this field',
                  ]"
                />
                <q-input
                  outlined
                  dense
                  class="col"
                  bg-color="white"
                  v-model="employee.emailAddress"
                  label="Email Address"
                />
              </div>
              <div class="q-gutter-md row" style="max-width: 800px">
                <q-input
                  outlined
                  dense
                  class="col"
                  bg-color="white"
                  v-model="employee.contactNumber"
                  label="Contact Number"
                />
                <q-input
                  outlined
                  dense
                  class="col"
                  bg-color="white"
                  v-model="employee.address"
                  label="Address"
                />
                <q-file
                  outlined
                  dense
                  class="col"
                  bg-color="white"
                  label="Profile"
                  counter
                  accept=".jpg, .png, image/*"
                  clearable
                >
                  <template v-slot:prepend>
                    <q-icon name="cloud_upload" />
                  </template>
                </q-file>
              </div>
            </q-step>

            <q-step
              :name="2"
              title="Job Information"
              :error="error2"
              icon="create_new_folder"
              :caption="error2 ? 'Please fill up all required inputs!' : ''"
              :done="step > 2"
            >
              <div class="q-gutter-md q-pb-md row" style="max-width: 800px">
                <q-input
                  class="col"
                  dense
                  outlined
                  bg-color="white"
                  v-model="employee.department"
                  label="Department"
                  :rules="[
                    (val) =>
                      (val && val.length > 0) || 'Please fill this field',
                  ]"
                />
                <q-input
                  outlined
                  dense
                  class="col"
                  bg-color="white"
                  v-model="employee.position"
                  label="Position"
                  :rules="[
                    (val) =>
                      (val && val.length > 0) || 'Please fill this field',
                  ]"
                />
                <q-input
                  outlined
                  v-model="employee.startDate"
                  mask="date"
                  :rules="['date']"
                  class="col"
                  bg-color="white"
                  dense
                  label="Started Date"
                >
                  <template v-slot:append>
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy
                        cover
                        transition-show="scale"
                        transition-hide="scale"
                      >
                        <q-date v-model="employee.startDate">
                          <div class="row items-cfill justify-end">
                            <q-btn
                              v-close-popup
                              label="Close"
                              color="primary"
                              flat
                            />
                          </div>
                        </q-date>
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
              </div>
            </q-step>

            <q-step :name="3" title="Confirmation" icon="assignment">
              <q-card flat class="text-black">
                <div class="row no-wrap q-pa-xl">
                  <div class="column">
                    <div
                      class="q-gutter-md q-pb-md row"
                      style="max-width: 800px"
                    >
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
                    <div
                      class="q-gutter-md row q-pb-md"
                      style="max-width: 800px"
                    >
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
                    <div
                      class="q-gutter-md row q-pb-md"
                      style="max-width: 800px"
                    >
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
                    <div
                      class="q-gutter-md q-pb-md row"
                      style="max-width: 800px"
                    >
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

                  <div class="column text-center">
                    <q-avatar size="150px">
                      <img src="assets/ABS.png" />
                    </q-avatar>

                    <div
                      class="text-subtitle2 text-center q-mt-md q-mb-xs text-uppercase"
                    >
                      {{ employee.firstName }} {{ employee.middleName }}
                      {{ employee.lastName }}
                    </div>
                  </div>
                </div>
              </q-card>
            </q-step>

            <template v-slot:navigation>
              <q-stepper-navigation>
                <q-btn
                  v-if="step < 3"
                  color="positive"
                  label="Continue"
                  type="submit"
                />
                <q-btn
                  v-if="step === 3"
                  label="Confirm Add"
                  color="positive"
                  @click="onAddNewEmployee()"
                  v-close-popup
                />
                <q-btn
                  v-if="step > 1"
                  color="red-5"
                  @click="$refs.stepper.previous()"
                  :label="step === 3 ? 'Edit' : 'Back'"
                  class="q-ml-sm"
                />
              </q-stepper-navigation>
            </template>
          </q-stepper>
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
    async onAddNewEmployee() {
      try {
        await employeeStore.addEmployee(this.employee);
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
