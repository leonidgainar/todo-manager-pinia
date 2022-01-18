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
          :rules="{
            required: true,
            min: 3,
            max: 64,
            unique: [usersStore.getUsersName]
          }"
          class="input-text"
        />
        <ErrorMessage name="name" class="text-red-600 text-sm" />
      </div>
      <button type="submit" class="btn-primary">Add user</button>
    </VeeForm>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useUsersStore } from "../../store/users";

const usersStore = useUsersStore();

const name = ref("");

function addNewUser(_, { resetForm }) {
  usersStore.addUser({ name: name.value, tasks: [] });
  resetForm();
}
</script>

<style scoped></style>
