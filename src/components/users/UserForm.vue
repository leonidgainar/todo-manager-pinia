<template>
  <div class="w-full max-w-xl py-8 px-4">
    <h1 class="text-2xl font-bold">Add new user</h1>
    <VeeForm @submit="addNewUser" class="form">
      <div class="mb-4">
        <label class="form-label" for="name"> Name </label>
        <VeeField
          id="name"
          type="text"
          name="name"
          v-model.trim="name"
          placeholder="Enter the name"
          :rules="{ required: true, min: 3, max: 64, unique: [getUsersName] }"
          class="input-text"
        />
        <ErrorMessage name="name" class="text-red-600 text-sm" />
      </div>
      <button type="submit" class="btn-primary">Add user</button>
    </VeeForm>
  </div>
</template>

<script>
import { mapState, mapActions } from "pinia";
import { useUsersStore } from "../../store/users";

export default {
  name: "UserForm",

  data() {
    return {
      name: ""
    };
  },

  computed: {
    ...mapState(useUsersStore, ["getUsersName"])
  },

  methods: {
    ...mapActions(useUsersStore, ["addUser"]),

    addNewUser(_, { resetForm }) {
      this.addUser({ name: this.name, tasks: [] });
      resetForm();
    }
  }
};
</script>

<style scoped></style>
