<template>
  <BaseModal :showModal="showModal">
    <template v-slot:modal-title> Edit user </template>
    <template v-slot:modal-body>
      <VeeForm @submit="saveUser">
        <div class="mb-4">
          <label class="form-label" for="editedName"> Name </label>
          <VeeField
            id="editedName"
            name="name"
            type="text"
            v-model.trim="name"
            placeholder="Enter the name"
            :rules="{
              required: true,
              min: 3,
              max: 64,
              unique: nameWasChanged ? [usersStore.getUsersName] : false
            }"
            class="input-text"
          />
          <ErrorMessage name="name" class="text-red-600 text-sm" />
        </div>
        <div class="mb-4">
          <label class="form-label mt-4" for="tasks"> Tasks </label>
          <ul v-if="tasks.length" id="tasks">
            <li v-for="task in tasks" :key="task">
              <div
                class="flex py-2 border-solid border-b-2 w-full justify-between"
              >
                <div>
                  {{ tasksStore.getTaskById(task)?.title }}
                  <TaskStatusLabel
                    class="ml-4"
                    :status="tasksStore.getTaskById(task)?.complete"
                  />
                </div>
                <button @click="deleteTaskFromList(task)">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5 fill-red-600"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            </li>
          </ul>
          <div v-else>This user doesn't have some tasks assigned to them.</div>
        </div>
        <div class="bg-white py-3 sm:px-6 sm:flex sm:flex-row-reverse">
          <button type="submit" class="btn-primary ml-2">Save</button>
          <button
            type="reset"
            class="btn-secondary"
            @click="emit('close-user-modal')"
          >
            Cancel
          </button>
        </div>
      </VeeForm>
    </template>
  </BaseModal>
</template>

<script setup>
import { ref, defineProps, defineEmits, computed, watchEffect } from "vue";

import { useUsersStore } from "../../store/users";
import { useTasksStore } from "../../store/tasks";

import BaseModal from "../BaseModal.vue";
import TaskStatusLabel from "../tasks/TaskStatusLabel.vue";

const usersStore = useUsersStore();
const tasksStore = useTasksStore();

const props = defineProps({
  showModal: {
    type: Boolean,
    default: false
  },
  userId: {
    type: String,
    default: ""
  },
  userName: {
    type: String,
    default: ""
  },
  userTasks: {
    type: Array,
    default: () => []
  }
});

const emit = defineEmits(["close-user-modal"]);

const name = ref("");
const tasks = ref([]);

let tasksToDelete = [];

watchEffect(() => {
  name.value = props.userName;
  tasks.value = props.userTasks;
});

const nameWasChanged = computed(() => {
  return name.value !== props.userName;
});

function deleteTaskFromList(taskId) {
  tasks.value = tasks.value.filter((task) => task !== taskId);
  tasksToDelete.push(taskId);
}

function deleteAssignedTasks() {
  tasksStore.unassignTasksFromUser({
    userId: props.userId,
    tasks: tasksToDelete
  });
  tasksToDelete = [];
}

function saveUser(_, { resetForm }) {
  const updatedUser = {
    id: props.userId,
    name: name.value,
    tasks: tasks.value
  };
  usersStore.editUser(updatedUser);

  if (tasksToDelete.length) {
    deleteAssignedTasks();
  }

  resetForm();
  emit("close-user-modal");
}
</script>
