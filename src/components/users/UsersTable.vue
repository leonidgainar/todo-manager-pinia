<template>
  <div v-if="usersStore.users.length" class="min-w-full sm:px-6 lg:px-6">
    <h1 class="text-2xl font-bold">Users</h1>
    <table class="min-w-full table-container">
      <thead class="bg-gray-50">
        <tr>
          <th class="table-header" v-for="header in tableHeaders" :key="header">
            {{ header }}
          </th>
          <th class="px-6 py-3">
            <span class="sr-only">Edit</span>
          </th>
        </tr>
      </thead>
      <tbody class="table-body">
        <tr v-for="user in usersStore.users || []" :key="user.id">
          <td class="px-6 py-4 text-left align-top">
            <span :title="user.name">
              {{ truncateText(user.name) }}
            </span>
          </td>
          <td class="px-6 py-4 text-left align-top">
            <div
              v-for="task in user.tasks"
              :key="task"
              class="flex justify-between text-gray-900 mb-2"
            >
              <span :title="tasksStore.getTaskById(task)?.title">
                {{ truncateText(tasksStore.getTaskById(task)?.title) }}
              </span>
              <TaskStatusLabel
                :status="tasksStore.getTaskById(task)?.complete"
              />
            </div>
          </td>
          <td class="px-6 py-4 align-top text-right text-xs">
            <button class="btn-primary mb-2" @click="editUser(user)">
              Edit
            </button>
            <button
              class="btn-danger ml-2"
              @click="deleteUserAndUnassignTask(user)"
            >
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <UserEditModal
    @close-user-modal="closeEditModal()"
    v-bind="{
      showModal: showEditModal,
      userId: currentUser.id,
      userName: currentUser.name,
      userTasks: currentUser.tasks
    }"
  />
</template>

<script setup>
import { ref } from "vue";

import { useUsersStore } from "../../store/users";
import { useTasksStore } from "../../store/tasks";

import TaskStatusLabel from "../tasks/TaskStatusLabel.vue";
import UserEditModal from "../users/UserEditModal.vue";

const usersStore = useUsersStore();
const tasksStore = useTasksStore();

const tableHeaders = ["name", "tasks"];

const showEditModal = ref(false);

const currentUser = ref({
  id: "",
  name: "",
  tasks: []
});

function deleteUserAndUnassignTask(user) {
  usersStore.deleteUser(user.id);
  if (user.tasks.length) {
    tasksStore.unassignTasksFromUser({ userId: user.id, tasks: user.tasks });
  }
}

function editUser(user) {
  currentUser.value = user;
  showEditModal.value = true;
}

function closeEditModal() {
  currentUser.value = {};
  showEditModal.value = false;
}

function truncateText(text, length = 20, suffix = "...") {
  if (text.length > length) {
    return text.substring(0, length) + suffix;
  } else {
    return text;
  }
}
</script>
