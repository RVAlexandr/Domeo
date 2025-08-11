<script setup lang="ts">
import { onMounted, ref } from 'vue';
import DetailsView from './components/DetailsView.vue';
import ObjectsList from './components/ObjectsList.vue';
import { objectId } from './details/services/globals.ts';

const type = ref<number>(1);

defineEmits(['backToObjects']);

function objectsList() {
  type.value = 1;
}

function openDetails(id: number) {
  objectId.value = id;
  type.value = 2;
}

onMounted(() => {
  objectsList();
});
</script>

<template>
  <ObjectsList
    v-if="type === 1"
    @update-parent="openDetails"
  />

  <DetailsView
    v-else-if="type===2"
    @back-to-objects="objectsList"
  />
  <div v-else>
    Loading
  </div>
</template>

<style scoped>
</style>
