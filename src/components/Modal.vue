<template>
  <div class="modal-backdrop" @click="$emit('close')"></div>
  <div class="modal">
    <div class="modal-header">
      <slot name="header">
        <button class="modal-close" @click="$emit('close')">&times;</button>
      </slot>
    </div>
    <div class="modal-body">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import {onMounted} from "vue";

export default {
  emits: ['close'],
  setup(_,{emit}) {

    onMounted(() => {
      window.addEventListener('keyup', (event) => {
        if (event.code === 'Escape') {
          emit('close');
        }
      });
    });

    return {};
  },
};
</script>

<style>
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
}

.modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  padding: 25px;
  z-index: 1001;
  border-radius: 25px;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-close {
  border: 0;
  background: transparent;
  font-size: 1.5em;
  cursor: pointer;
}
</style>
