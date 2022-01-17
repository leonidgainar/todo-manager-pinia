import { defineStore } from "pinia";

export const useTasksStore = defineStore("tasks", {
  state: () => ({
    tasks: []
  }),

  getters: {
    getTaskById: (state) => (id) => {
      return state.tasks.find((task) => task.id === id);
    },
    getTasksTitle: (state) => {
      return state.tasks.map(({ title }) => title);
    }
  },

  actions: {
    addTask(task) {
      this.tasks.push(task);
    },

    editTask(updatedTask) {
      const taskIndex = this.tasks.findIndex(
        (task) => task.id === updatedTask.id
      );
      if (taskIndex !== -1) {
        this.tasks[taskIndex] = updatedTask;
      }
    },

    deleteTask(taskId) {
      this.tasks = this.tasks.filter((task) => task.id !== taskId);
    },

    unassignTasksFromUser(payload) {
      const { userId, tasks } = payload;
      this.tasks.map((task) => {
        if (tasks.includes(task.id) && task.assignedTo === userId) {
          task.assignedTo = "";
        }
      });
    }
  }
});
