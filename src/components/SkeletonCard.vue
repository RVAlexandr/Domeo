<script setup lang="ts">
</script>

<template>
  <div class="skeleton-product-card">
    <div class="skeleton-text" />
  </div>
</template>

<style scoped>
.skeleton-product-card {
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
</style>
