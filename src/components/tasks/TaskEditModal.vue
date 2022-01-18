<template>
  <BaseModal :showModal="showModal">
    <template v-slot:modal-title> Edit task </template>
    <template v-slot:modal-body>
      <VeeForm @submit="saveTask">
        <div class="mb-4">
          <label class="form-label" for="editedTitle"> Title </label>
          <VeeField
            id="editedTitle"
            name="title"
            type="text"
            v-model.trim="title"
            placeholder="Enter the title"
            :rules="{
              required: true,
              min: 3,
              max: 64,
              unique: titleWasChanged ? [tasksStore.getTasksTitle] : false
            }"
            class="input-text"
          />
          <ErrorMessage name="title" class="text-red-600 text-sm" />
        </div>
        <div class="mb-4">
          <label for="status" class="form-label">
            <VeeField
              id="status"
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
          <div class="mb-4">
            <label for="assignedTo" class="form-label"> Assigned to </label>
            <VeeField
              as="select"
              id="assignedTo"
              name="assignedTo"
              v-model="assignedTo"
              class="select"
            >
              <option value="">-- None --</option>
              <option
                v-for="user in usersStore.users"
                :key="user.id"
                :value="user.id"
              >
                {{ user.name }}
              </option>
            </VeeField>
          </div>
        </div>
        <div class="bg-white py-3 sm:px-6 sm:flex sm:flex-row-reverse">
          <button type="submit" class="btn-primary ml-2">Save</button>
          <button
            type="reset"
            class="btn-secondary"
            @click="emit('close-task-modal')"
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

const usersStore = useUsersStore();
const tasksStore = useTasksStore();

const props = defineProps({
  showModal: {
    type: Boolean,
    default: false
  },
  taskId: {
    type: String,
    default: ""
  },
  taskTitle: {
    type: String,
    default: ""
  },
  taskAssignedTo: {
    type: String,
    default: ""
  },
  taskComplete: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(["close-task-modal"]);

const title = ref("");
const assignedTo = ref("");
const complete = ref(false);

watchEffect(() => {
  title.value = props.taskTitle;
  assignedTo.value = props.taskAssignedTo;
  complete.value = props.taskComplete;
});

const titleWasChanged = computed(() => {
  return title.value !== props.taskTitle;
});

function changeTaskAssignedUser() {
  usersStore.deleteTaskFromUser({
    userId: props.taskAssignedTo,
    taskId: props.taskId
  });
  usersStore.addTaskToUser({ userId: assignedTo.value, taskId: props.taskId });
}

function saveTask(_, { resetForm }) {
  const updatedTask = {
    id: props.taskId,
    title: title.value,
    assignedTo: assignedTo.value,
    complete: complete.value || false
  };

  tasksStore.editTask(updatedTask);

  if (assignedTo.value !== props.taskAssignedTo) {
    changeTaskAssignedUser();
  }

  resetForm();
  emit("close-task-modal");
}
</script>
