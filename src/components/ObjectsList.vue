<script setup  lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue';
import ObjectCard from './ObjectCard.vue';
import SkeletonCard from './SkeletonCard.vue';
import { lastScrollPosition, objectsList } from '../details/services/globals.ts';
import { getObjects, pageNumber } from '../details/services/apiService.ts';

const emit = defineEmits(['update-parent']);

const resObjects = ref('null');
const isLoaded = ref(false);
const loadingMore = ref(false);
const scrollContainer = ref(null);
const infiniteScrollTrigger = ref<HTMLElement | null>(null);

function getName(name: any): string {
  return `${name.first_name} ${name.last_name} ${name.middle_name}`;
}

function showDetails(id: number) {
  emit('update-parent', id);
}

const onScroll = () => {
  if (scrollContainer.value) {
    lastScrollPosition.value = scrollContainer.value.scrollTop;
  }
};

async function loadObjectsPage() {
  if (loadingMore.value) return;

  loadingMore.value = true;
  console.log('FFFFFFFFFFFFFFFFFFFFFFFFFFF');
  await getObjects().then((response) => {
    resObjects.value = response;
    objectsList.value.push(...response);
    pageNumber.value += 1;
    isLoaded.value = true;
  });
  loadingMore.value = false;
}

onMounted(async () => {
  await getObjects().then((response) => {
    console.log('GGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG');

    resObjects.value = response;
    objectsList.value.push(...response);
    pageNumber.value += 1;
    isLoaded.value = true;
  }).then((r) => {
    setTimeout(() => {
      if (scrollContainer.value) {
        scrollContainer.value.scrollTop = lastScrollPosition.value;
      }
    }, 0);
  });

  const options = {
    root: scrollContainer.value, // Наблюдатель будет относиться к нашему контейнеру
    rootMargin: '0px',
    threshold: 1.0,
  };

  const callback = ([entry]: IntersectionObserverEntry[]) => {
    if (entry.isIntersecting) {
      loadObjectsPage();
    }
  };

  const observer = new IntersectionObserver(callback, options);
  observer.observe(infiniteScrollTrigger.value);
});

onBeforeUnmount(() => {
  if (scrollContainer.value) {
    infiniteScrollTrigger.value = scrollContainer.value.scrollTop;
  }
});
</script>

<template>
  <div class="header">
    <h1>Объекты</h1>
  </div>
  <div
    v-if="isLoaded"
    class="container"
  >
    <div
      ref="scrollContainer"
      class="scrollingContainer"
      @scroll="onScroll"
    >
      <ObjectCard
        v-for="getObject in objectsList"
        :key="getObject.id"
        :object-id="getObject.id"
        :address="getObject.address"
        :name="getName(getObject.client_info)"
        :cash-out="getObject.cashout"
        :money-type="getObject.money_type"
        @open-object="showDetails"
      />
    </div>
    <div
      ref="infiniteScrollTrigger"
      class="scrollTriger"
    />
  </div>
  <div
    v-else
    class="container"
  >
    <SkeletonCard
      v-for="i in 12"
      :key="i"
    />
  </div>
</template>

<style scoped>
h1{
  text-align: center;
  color: white;
  font-size: 25px;
  line-height: 50px;
}
.header{
  min-height: 84px;
}
.container{
  position: absolute;
  right: 0;
  left: 0;
  bottom: 0;
  height: 91%;
  background: white;
  border-radius: 25.5px;
}
.scrollingContainer{
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  margin: 30px 20px 20px 20px;
  padding: 20px;
  gap: 10px;
  background-color: var(--color-light-background);
  border-radius: 10px;
  border: 1px solid var(--color-light-background);
  overflow-y: auto;
  display: grid;
  grid-template-columns: repeat(auto-fill, var(--card-size-width));
  grid-row-gap: 10px;
  grid-column-gap: 1em;
}
.scrollTriger{
  width: 100%;
  height: 10px;
}
</style>
