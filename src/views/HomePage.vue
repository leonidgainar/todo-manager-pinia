<template>
  <h1 class="text-3xl font-bold underline">Home Page</h1>
  <div class="grid grid-cols-1 lg:grid-cols-2">
    <div class="flex justify-center">
      <UserForm />
    </div>
    <div class="flex justify-center">
      <TaskForm />
    </div>
  </div>
  <div class="grid grid-cols-1 xl:grid-cols-2">
    <div class="flex justify-center mt-4">
      <UsersTable />
    </div>
    <div class="flex justify-center mt-4">
      <TasksTable />
    </div>
  </div>
</template>

<script>
import UserForm from "../components/users/UserForm.vue";
import TaskForm from "../components/tasks/TaskForm.vue";
import UsersTable from "../components/users/UsersTable.vue";
import TasksTable from "../components/tasks/TasksTable.vue";

export default {
  name: "HomePage",

  components: {
    UserForm,
    TaskForm,
    UsersTable,
    TasksTable
  }
};
</script>

<style scoped></style>
