<script setup lang="ts">
defineProps({
  objectId: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  cashOut: {
    type: Number,
    required: true,
  },
  moneyType: {
    type: Number,
    required: true,
  },
});

const moneyTypes = {
  1: 'Наличный',
  2: 'Безналичный',
};
function getMoneyType(object: any, row: number):string {
  return object[row];
}

</script>

<template>
  <div class="card">
    <div class="idTitle">
      {{ "ID " + objectId }}
    </div>

    <div class="cardTitle">
      Адрес:
    </div>
    <div class="cardValue">
      {{ address }}
    </div>

    <div class="cardTitle">
      Клиент:
    </div>
    <div class="cardValue">
      {{ name }}
    </div>

    <div class="hContainer">
      <div class="vCon">
        <div class="cardTitle">
          К выдаче:
        </div>
        <div class="cardValue">
          {{ cashOut + " Р" }}
        </div>
      </div>

      <div class="vCon">
        <div class="cardTitle">
          Тип расчёта:
        </div>
        <div class="cardValue">
          {{ getMoneyType(moneyTypes, moneyType) }}
        </div>
      </div>
    </div>

    <button
      class="transparent-button"
      @click="$emit('open-object', objectId)"
    >
      Посмотреть детали
      <svg
        viewBox="0 0 24 24"
        width="24"
        height="24"
        style="display: inline-block; vertical-align: middle; margin-left: 5px; fill: currentColor;"
      >
        <path
          transform="translate(0, 2)"
          d="M13.6677 6L14.0202 5.64645L14.3738 6L14.0202 6.35355L13.6677 6ZM1.16655 6.5C0.890514 6.5 0.665556 6.27614 0.665556 6C0.665556 5.72386 0.890514 5.5 1.16677 5.5V6.5ZM9.02021 0.646447L14.0202 5.64645L13.3131 6.35355L8.3131 1.35355L9.02021 0.645447ZM14.0202 6.35355L9.02021 11.3536L8.3131 10.6464L13.3131 5.64645L14.0202 6.35355ZM13.6677 6.5H1.16655V5.5H13.6677V6.5Z"
          fill="#788596"
        />
      </svg>
    </button>
  </div>
</template>

<style scoped>
.card{
  width: var(--card-size-width);
  height: 200px;
  border-radius: 12px;
  padding: 16px;
  gap: 12px;
  background: white;

  display: flex;
  flex-direction: column;
  align-items: stretch;
}

.idTitle{
  color: var(--color-background);
  font-size: 15px;
}

.cardTitle{
  color: var(--color-text-lightgray);
  font-size: 12px;
}

.cardValue{
  color: var(--color-text-darkgray);
  font-size: 14px;
  height: 1lh;
}

.hContainer{
  display: flex;
  flex-direction: row;
}

.vCon{
  flex: 1;
}

.transparent-button {
  display: flex;
  width: 100%;
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
