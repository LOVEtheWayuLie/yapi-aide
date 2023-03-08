<template>
  <div ref="dom">
    <NButton @click="() => (btnVisible = !btnVisible)">{{
      btnVisible ? '一键折叠' : '一键展开'
    }}</NButton>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref, watch } from 'vue';
import { NButton } from 'naive-ui';

const dom = ref<HTMLElement>();
const btnVisible = ref(false);

watch(btnVisible, () => {
  const tableDom = dom.value?.parentElement?.parentElement?.nextElementSibling;

  tableDom
    ?.querySelectorAll('.ant-table-row-expanded, .ant-table-row-collapsed')
    .forEach((btn) => {
      (btn as HTMLElement)?.click();
    });
});

onMounted(() => {
  console.log();
});
</script>
