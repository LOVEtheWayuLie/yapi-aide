<template>
  <div class="app" @click="visible = !visible">展开</div>
  <div class="layout-panel" v-show="visible"></div>
  <!-- <HelloWorld msg="Vite + Vue" /> -->
</template>

<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import HelloWorld from './components/HelloWorld.vue';
import { ref } from 'vue';

const visible = ref(false);
</script>

<style lang="less">
.app {
  @size: 36px;

  position: fixed;
  right: 0;
  bottom: 50px;
  width: @size;
  height: @size;
  line-height: @size;
  text-align: center;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: @size;
  box-shadow: 0 0 6px -1px;
  cursor: pointer;
  user-select: none;
}

/** 面板 */
.layout-panel {
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 100;
  width: 80%;
  height: 80%;
  background-color: #fff;
  box-shadow: 0 0 10px 1px;
  transform: translate(-50%, -50%);
}
</style>
