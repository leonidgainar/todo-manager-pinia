<template>
  <div class="w-full max-w-xl py-8 px-4">
    <h1 class="text-2xl font-bold">Add new task</h1>
    <VeeForm @submit="addNewTask" class="form">
      <div class="mb-4">
        <label for="title" class="form-label"> Title </label>
        <VeeField
          id="title"
          name="title"
          type="text"
          v-model.trim="title"
          placeholder="Enter the title"
          :rules="{
            required: true,
            min: 3,
            max: 64,
            unique: [tasksStore.getTasksTitle]
          }"
          class="input-text"
        />
        <ErrorMessage name="title" class="text-red-600 text-sm" />
      </div>
      <div class="mb-4">
        <label for="complete" class="form-label">
          <VeeField
            id="complete"
            name="complete"
            type="checkbox"
            :value="true"
            v-model="complete"
            class="mr-2"
          />
          <span class="text-sm"> Task completed </span>
        </label>
      </div>
      <div class="mb-4">
        <label for="assignedTo" class="form-label"> Assigned to </label>
        <VeeField
          as="select"
          id="assignedTo"
          name="assignedTo"
          v-model="assignedTo"
          class="select"
        >
          <option value="" disabled>-- None --</option>
          <option
            v-for="user in usersStore.users"
            :key="user.id"
            :value="user.id"
          >
            {{ user.name }}
          </option>
        </VeeField>
      </div>
      <button type="submit" class="btn-primary">Add task</button>
    </VeeForm>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { nanoid } from "nanoid";

import { useUsersStore } from "../../store/users";
import { useTasksStore } from "../../store/tasks";

const usersStore = useUsersStore();
const tasksStore = useTasksStore();

const title = ref("");
const complete = ref(false);
const assignedTo = ref("");

function addNewTask(_, { resetForm }) {
  const taskId = nanoid();
  tasksStore.addTask({
    id: taskId,
    title: title.value,
    complete: complete.value,
    assignedTo: assignedTo.value
  });
  usersStore.addTaskToUser({ userId: assignedTo.value, taskId });
  resetForm();
}
</script>

<style scoped></style>
