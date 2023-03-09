<template>
  <div ref="domR">
    <NButton @click="() => (btnVisibleR = !btnVisibleR)">{{
      btnVisibleR ? '一键折叠' : '一键展开'
    }}</NButton>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue';
import { NButton } from 'naive-ui';
import $ from 'jquery';

const domR = ref<HTMLElement>();
const btnVisibleR = ref(false);

/** 展开或者折叠 */
function collapsedOrExpanded() {
  if (!domR.value) {
    console.warn('dom元素不存在');
    return;
  }
  const tableDom = $(domR.value)
    .parents('.interface-title')
    .nextUntil('.interface-title');
  const arr = $(tableDom).find(
    btnVisibleR.value
      ? '.ant-table-row-collapsed:visible'
      : '.ant-table-row-expanded:visible'
  );

  arr.trigger('click');

  if (arr && arr.length > 0) {
    collapsedOrExpanded();
  }
}

watch(btnVisibleR, () => {
  collapsedOrExpanded();
});

onMounted(() => {});
</script>
