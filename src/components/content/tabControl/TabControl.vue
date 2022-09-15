<!--
 * @Author: {baixiao}
 * @Date: 2022-09-13 17:45:51
 * @LastEditors: {baixiao}
 * @LastEditTime: 2022-09-13 18:40:06
 * @Description: 
-->
<template>
  <div class="tab-control">
    <div
      class="tab-control-item"
      v-for="(item, index) of tabs"
      :key="index"
      :class="{ active: index === currIndex }"
      @click="handleSwitchTab(index)"
    >
      <span>{{ item }}</span>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
export default {
  name: 'TabControl',
  props: {
    tabs: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  setup(props, { emit }) {
    const currIndex = ref(0);
    const handleSwitchTab = (index) => {
      currIndex.value = index;
      emit('changeIndex', index);
    };
    return {
      currIndex,
      handleSwitchTab,
    };
  },
};
</script>

<style lang="scss" scoped>
.tab-control {
  width: 100%;
  height: 40px;
  line-height: 40px;
  display: flex;
  text-align: center;
  font-size: var(--font-size);
  background-color: #ffffff;
  position: sticky;
  top: 45px;
  left: 0;
  z-index: 10;
  .tab-control-item {
    flex: 1;
    span {
      padding: 5px;
    }
  }
  .active {
    color: var(--color-tint);
    span {
      border-bottom: 3px solid var(--color-tint);
    }
  }
}
</style>
