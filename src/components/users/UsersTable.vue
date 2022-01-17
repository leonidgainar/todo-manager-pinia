<template>
  <div v-if="users.length" class="min-w-full sm:px-6 lg:px-6">
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
        <tr v-for="user in users || []" :key="user.id">
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
              <span :title="getTaskById(task)?.title">
                {{ truncateText(getTaskById(task)?.title) }}
              </span>
              <TaskStatusLabel :status="getTaskById(task)?.complete" />
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

<script>
import { mapState, mapActions } from "pinia";
import { useUsersStore } from "../../store/users";
import { useTasksStore } from "../../store/tasks";

import TaskStatusLabel from "../tasks/TaskStatusLabel.vue";
import UserEditModal from "../users/UserEditModal.vue";

export default {
  name: "UsersTable",
  components: {
    TaskStatusLabel,
    UserEditModal
  },

  data() {
    return {
      tableHeaders: ["name", "tasks"],
      currentUser: {
        id: "",
        name: "",
        tasks: []
      },
      showEditModal: false
    };
  },

  computed: {
    ...mapState(useUsersStore, ["users"]),
    ...mapState(useTasksStore, ["getTaskById"])
  },

  methods: {
    ...mapActions(useUsersStore, ["deleteUser"]),
    ...mapActions(useTasksStore, ["unassignTasksFromUser"]),

    deleteUserAndUnassignTask(user) {
      this.deleteUser(user.id);
      if (user.tasks.length) {
        this.unassignTasksFromUser({ userId: user.id, tasks: user.tasks });
      }
    },

    editUser(user) {
      this.currentUser = user;
      this.showEditModal = true;
    },

    closeEditModal() {
      this.currentUser = {};
      this.showEditModal = false;
    },

    truncateText(text, length = 20, suffix = "...") {
      if (text.length > length) {
        return text.substring(0, length) + suffix;
      } else {
        return text;
      }
    }
  }
};
</script>
