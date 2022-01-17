import { defineStore } from "pinia";
import { nanoid } from "nanoid";

export const useUsersStore = defineStore("users", {
  state: () => ({
    users: []
  }),

  getters: {
    getUserById: (state) => (id) => {
      return state.users.find((user) => user.id === id);
    },
    getUsersName: (state) => {
      return state.users.map(({ name }) => name);
    }
  },

  actions: {
    addUser(user) {
      this.users.push({ id: nanoid(), ...user });
    },

    editUser(updatedUser) {
      const userIndex = this.users.findIndex(
        (user) => user.id === updatedUser.id
      );
      if (userIndex !== -1) {
        this.users[userIndex] = updatedUser;
      }
    },

    deleteUser(userId) {
      this.users = this.users.filter((user) => user.id !== userId);
    },

    addTaskToUser(payload) {
      const { userId, taskId } = payload;
      const userIndex = this.users.findIndex((user) => user.id === userId);
      if (userIndex !== -1) {
        this.users[userIndex].tasks.push(taskId);
      }
    },

    deleteTaskFromUser(payload) {
      const { userId, taskId } = payload;
      const userIndex = this.users.findIndex((user) => user.id === userId);
      if (userIndex !== -1) {
        this.users[userIndex].tasks = this.users[userIndex].tasks.filter(
          (task) => task !== taskId
        );
      }
    }
  }
});
