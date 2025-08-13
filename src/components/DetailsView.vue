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
    console.log(objectData);
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
  <div class="pageContainer">
    <div class="header">
      <h1 v-if="isLoaded">
        {{ "Объект " + objectData.id }}
      </h1>
    </div>
    <div class="container">
      <div v-if="isLoaded">
        <div class="pageHeader">
          <div class="pageHeaderTitle">
            Информация по объекту
          </div>
        </div>

        <div class="content">
          <div class="buttonContainer">
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
          </div>

          <div class="card">
            <div class="hContainer">
              <div class="hContainer">
                <div class="cardTitle">
                  {{ "ID " + objectData.id }}
                </div>
                <div class="cardTitle">
                  {{ objectData.tags[0].message }}
                </div>
              </div>
              <div>
                <div class="hContainer">
                  <div class="cardTitle" />
                  <div>
                    <div class="hContainer">
                      <div class="cardParam">
                        К сдаче
                      </div>
                      <div class="cardTitleValue">
                        {{ objectData.cashOut + " ₽" }}
                      </div>
                    </div>
                    <div class="cardParamValue">
                      {{ getType(moneyType, objectData.moneyType) }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="hContainer">
            <div class="card">
              <div class="hContainer">
                <div class="cardTitle">
                  Общая информация
                </div>
                <div class="cardTitleValue">
                  {{ objectData.cashOut + " ₽" }}
                </div>
              </div>
              <div class="hContainer">
                <div class="cardParam">
                  Наименование ЖК
                </div>
                <div class="cardParamValue">
                  {{ objectData.flatInfo.residentalComplex }}
                </div>
              </div>
              <div class="hContainer">
                <div class="cardParam">
                  Тип помещения
                </div>
                <div class="cardParamValue">
                  {{ getType(flatType, objectData.flatInfo.flatType) }}
                </div>
              </div>
              <div class="hContainer">
                <div class="cardParam">
                  Тип ремонта
                </div>
                <div class="cardParamValue">
                  {{ getType(repairType, objectData.flatInfo.repairType) }}
                </div>
              </div>
              <div class="hContainer">
                <div class="cardParam">
                  Площадь
                </div>
                <div class="cardParamValue" />
                {{ objectData.flatInfo.area + " кв.м" }}
              </div>
              <div class="hContainer">
                <div class="cardParam">
                  Исполнитель
                </div>
                <div class="cardParamValue">
                  {{ "" }}
                </div>
              </div>
              <div class="hContainer">
                <div class="cardParam">
                  Статус
                </div>
                <div class="cardParamValue">
                  {{ getType(statusType, objectData.status) }}
                </div>
              </div>
              <div class="hContainer">
                <div class="cardParam">
                  Лифт
                </div>
                <div class="cardParamValue">
                  {{ getType(elevatorType, objectData.flatInfo.elevator) }}
                </div>
              </div>
              <div class="hr" />
              <div class="cardTitle">
                Теги
              </div>
              <div class="tags">
                <div
                  v-for="tag in objectData.tags"
                >
                  {{ tag.message }}
                </div>
              </div>
            </div>
            <div class="card">
              <div class="hContainer">
                <div class="cardTitle">
                  Клиент
                </div>
                <div class="cardTitleValue">
                  {{ getName(objectData) }}
                </div>
              </div>
              <div class="hContainer">
                <div class="cardParam">
                  Телефон
                </div>
                <div class="cardParamValue">
                  {{ objectData.clientInfo.phone }}
                </div>
              </div>
              <div class="hContainer">
                <div class="cardParam">
                  Почта
                </div>
                <div class="cardParamValue">
                  {{ objectData.clientInfo.mail }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        v-else
        class="skeleton-text"
      />
    </div>
  </div>
</template>

<style scoped>
@import '../assets/styles.css';
.pageContainer {
  height: 100vh;
  display: flex;
  flex-direction: column;
}
.header{
  min-height: 84px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.container{
  flex-grow: 1;
  border-top-left-radius: 38px;
  background-color: var(--color-gray-background);
}
.pageHeader{
  height: 42px;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid var(--color-button-background);
  border-top-left-radius: 36px;
}
.pageHeaderTitle{
  text-align: center;
  color: #000000;
  font-size: 14px;
  line-height: 20px;
  font-family: SFProDisplay, sans-serif;
}
.content{
  flex-grow: 1;
  background-color: var(--color-gray-background);
  padding: 20px;

}
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
  font-family: SFProDisplay, sans-serif;
}
.hContainer{
  display: flex;
  justify-content: space-between;
  gap: 10px;

}
.card{
  display: flex;
  flex-direction: column;
  flex: 1;
  height: 100%;
  border-radius: 12px;
  padding: 20px;
  background-color: white;
  justify-content: space-between;
  margin-bottom: 12px;
  gap: 8px;
}
h3{
  font-size: 15px;
  line-height: 20px;
  color: var(--color-main-black);
}
.cardTitle{
  color: var(--color-main-black);
  text-align: left;
  font-size: 15px;
  line-height: 20px;
  margin-bottom: 12px;
  font-family: SFProDisplay, sans-serif;
}
.cardTitleValue{
  color: var(--color-main-black);
  height: 1lh;
  text-align: right;
  font-size: 15px;
  line-height: 20px;
  font-family: SFProDisplay, sans-serif;
}
.cardParam{
  color: var(--color-text-lightgray);
  text-align: left;
  font-size: 12px;
  line-height: 16px;
  font-family: SFProDisplay, sans-serif;

}
.cardParamValue{
  color: var(--color-text-gray);
  height: 1lh;
  text-align: right;
  font-size: 12px;
  line-height: 16px;
  font-family: SFProDisplay, sans-serif;
}
.buttonContainer{
  height: 100%;
  margin-bottom: 20px;
}
.transparent-button {
  display: flex;
  height: 28px;
  background-color: transparent;
  border: none;
  justify-content: center;
  color: var(--color-button-text-gray);
  font-size: 14px;
  line-height: 20px;
  padding-top: 5px;
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
.hr {
  width: 100%;
  border-top: 1px solid var(--color-button-background);
  margin: 8px;
}
.tags{
  display: flex;
  gap: 16px;
}
</style>
