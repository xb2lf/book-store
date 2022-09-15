<template>
  <div class="address-box">
    <nav-bar>
      <template v-slot:default>{{ title }}</template>
    </nav-bar>
    <div
      v-show="list.length == 0"
      style="margin-top: 200px; text-align: center"
    >
      还没有地址信息，去添加吧！
    </div>

    <div class="address-item">
      <!-- <van-address-list
        v-model="chosenAddressId"
        :list="list"
        default-tag-text="默认"
        @add="handleAdd"
        @edit="handleEdit"
        @select="handleSelect"
      /> -->
      <van-address-list
        v-model="chosenAddressId"
        :list="list"
        default-tag-text="默认"
        @add="handleAdd"
        @edit="handleEdit"
      />
    </div>
  </div>
</template>

<script>
import { useRoute, useRouter } from 'vue-router';
import { computed, reactive, toRefs, onMounted } from 'vue';
import { getAddressList } from '@/network/address';
import NavBar from '@/components/common/navBar/NavBar.vue';
export default {
  name: 'Address',
  components: { NavBar },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const title = computed(() => route.meta.title);
    const state = reactive({
      chosenAddressId: '1',
      list: [],
    });

    const handleAdd = () => {
      router.push({ path: '/addressedit', query: { type: 'add' } });
    };

    const handleEdit = (item) => {
      router.push({
        path: '/addressedit',
        query: { type: 'edit', addressId: item.id },
      });
    };

    const handleSelect = (item) => {
      router.push({
        path: '/addressedit',
        query: { type: 'edit', addressId: item.id },
      });
    };

    onMounted(() => {
      getAddressList().then((res) => {
        // 如果data长度为0的话
        if (!res.data.length) {
          // 初始化空数组list
          state.list = [];
          return;
        }
        // 不为空, map遍历数据
        state.list = res.data.map((item) => {
          return {
            // 过滤数据
            id: item.id,
            name: item.name,
            tel: item.phone,
            // 省市县地址信息保存到一个变量address中
            address: `${item.province} ${item.city} ${item.county} ${item.address}`,
            // 判断是否为默认地址
            isDefault: !!item.is_default,
          };
        });
        state.chosenAddressId = state.list[0].id;
      });
    });

    return {
      title,
      ...toRefs(state),
      handleAdd,
      handleEdit,
      handleSelect,
    };
  },
};
</script>

<style lang="scss" scoped>
.address-box {
  height: 300px;
  .van-radio__icon {
    display: none;
  }
  .address-item {
    margin-top: 45px;
    .van-button {
      background: var(--color-tint);
      border-color: var(--color-tint);
    }
  }
}
.van-address-list__bottom {
  bottom: 100px !important;
}
</style>
