<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { getObjectById } from '../details/services/apiService.ts';
import { ObjectData } from '../details/models/objectData.ts';

const objectData = ref<ObjectData>(null);
const isLoaded = ref<boolean>(false);

onMounted(async () => {
  // objectId.value = route.params.id;
  await getObjectById().then((response) => {
    objectData.value = response;
    isLoaded.value = true;
  });
});

const moneyType = {
  1: 'Наличный',
  2: 'Безналичный',
};
function getType(object: any, row: number):string {
  return object[row];
}

const flatType = {
  0: 'Жилое',
  1: 'Не жилое',
};

const repairType = {
  1: 'Черновой ремонт',
  2: 'Косметический ремонт',
  3: 'Капитальный ремонт',
  4: 'Евро ремонт',
};
const statusType = {
  1: 'Новый',
  2: 'В работе',
  3: 'Работы завершены',
};
const elevatorType = {
  true: 'Есть',
  false: 'Нет',
};

function getName(name: ObjectData): string {
  return `${name.clientInfo.firstName} ${name.clientInfo.lastName} ${name.clientInfo.middleName}`;
}
</script>

<template>
  <div>
    <h1 v-if="isLoaded">
      {{ "Объект " + objectData.id }}
    </h1>
  </div>
  <div class="container">
    <div v-if="isLoaded">
      <h4>
        Информация по объекту
      </h4>
      <button
        class="transparent-button"
        @click="$emit('back-to-objects')"
      >
        <svg
          viewBox="0 0 24 24"
          width="24"
          height="24"
          style="display: inline-block; vertical-align: middle; fill: currentColor;"
        >
          <path
            d="M1.33337 5.33333L0.97982 5.68689L0.626267 5.33333L0.97982 4.97978L1.33337 5.33333ZM15.1667 12C15.1667 12.2761 14.9428 12.5 14.6667 12.5C14.3906 12.5 14.1667 12.2761 14.1667 12L15.1667 12ZM5.14649 9.85355L0.97982 5.68689L1.68693 4.97978L5.85359 9.14645L5.14649 9.85355ZM0.97982 4.97978L5.14649 0.813113L5.85359 1.52022L1.68693 5.68689L0.97982 4.97978ZM1.33337 4.83333L8.66671 4.83333L8.66671 5.83333L1.33337 5.83333L1.33337 4.83333ZM15.1667 11.3333L15.1667 12L14.1667 12L14.1667 11.3333L15.1667 11.3333ZM8.66671 4.83333C12.2566 4.83333 15.1667 7.74348 15.1667 11.3333L14.1667 11.3333C14.1667 8.29576 11.7043 5.83333 8.66671 5.83333L8.66671 4.83333Z"
            fill="#788596"
          />
        </svg>
        Вернуться к списку
      </button>
      <div class="hContainer">
        <div class="cardTitle">
          {{ "ID " + objectData.id }}
        </div>

        <div class="vcon">
          <div class="hContainer">
            <div class="cardTitle" />
            <div class="vcon">
              <div class="cardTitle">
                К сдаче {{ objectData.cashOut }}
              </div>
              <div class="cardValue">
                {{ getType(moneyType, objectData.moneyType) }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="hContainer">
        <div class="vcon">
          <div class="hContainer">
            <div class="cardTitle">
              Наименование ЖК
            </div>
            <div class="cardValue">
              {{ objectData.flatInfo.residentalComplex }}
            </div>
          </div>
          <div class="hContainer">
            <div class="cardTitle">
              Тип помещения
            </div>
            <div class="cardValue">
              {{ getType(flatType, objectData.flatInfo.flatType) }}
            </div>
          </div>
          <div class="hContainer">
            <div class="cardTitle">
              Тип ремонта
            </div>
            <div class="cardValue">
              {{ getType(repairType, objectData.flatInfo.repairType) }}
            </div>
          </div>
          <div class="hContainer">
            <div class="cardTitle">
              Площадь
            </div>
            <div class="cardValue" />
            {{ objectData.flatInfo.area }}
          </div>
          <div class="hContainer">
            <div class="cardTitle">
              Исполнитель
            </div>
            <div class="cardValue">
              {{ "" }}
            </div>
          </div>
          <div class="hContainer">
            <div class="cardTitle">
              Статус
            </div>
            <div class="cardValue">
              {{ getType(statusType, objectData.status) }}
            </div>
          </div>
          <div class="hContainer">
            <div class="cardTitle">
              Лифт
            </div>
            <div class="cardValue">
              {{ getType(elevatorType, objectData.flatInfo.elevator) }}
            </div>
          </div>
        </div>

        <div class="vcon">
          <div class="hContainer">
            <div class="cardTitle">
              Клиент
            </div>
            <div class="cardValue">
              {{ getName(objectData) }}
            </div>
          </div>
          <div class="hContainer">
            <div class="cardTitle">
              Телефон
            </div>
            <div class="cardValue">
              {{ objectData.clientInfo.phone }}
            </div>
          </div>
          <div class="hContainer">
            <div class="cardTitle">
              Почта
            </div>
            <div class="cardValue">
              {{ objectData.clientInfo.mail }}
            </div>
          </div>
        </div>
      </div>
      <h4>
        Теги
      </h4>
    </div>

    <div
      v-else
      class="skeleton-text"
    />
  </div>
</template>

<style scoped>
.skeleton-text {
  width: 100%;
  height: 2em;
  margin-top: 1rem;
  background-color: #878787;
  border-radius: 4px;
  animation: pulse 1s infinite ease-in-out;
}
@keyframes pulse {
  0%   { opacity: .6; }
  50%  { opacity: 1; }
  100% { opacity: .6; }
}

h1{
  text-align: center;
  color: white;
  font-size: 24px;
  line-height: 44px;
}

.container{
  position: absolute;
  right: 0;
  left: 0;
  bottom: 0;
  height: 85%;
  background: white;
  border-top-left-radius: 40px;
  padding: 20px;
}

.hContainer{
  display: flex;
}

.vcon{
  margin: 8px;
  flex: 1;
}

.cardValue{
  color: var(--color-text-darkgray);
  width: fit-content;
  flex: 1 1;
  height: 1lh;
}
.cardTitle{
  color: var(--color-text-lightgray);
  flex: 1;
}

.transparent-button {
  display: flex;
  height: 36px;
  background-color: transparent;
  border: none;
  justify-content: center;
  color: #616161;
  font-size: 14px;
  padding: 10px 20px;
  border-radius: 8px;
  transition: background-color 0.3s ease-in-out;
}

.transparent-button:focus,
.transparent-button:hover {
  outline: none;
  background-color: rgba(0, 0, 0, 0.3);
}

.transparent-button:active {
  background-color: rgba(0, 0, 0, 0.5);
}
</style>
