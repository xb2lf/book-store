<!--
 * @Author: {baixiao}
 * @Date: 2022-09-15 09:55:40
 * @LastEditors: {baixiao}
 * @LastEditTime: 2022-09-15 12:39:15
 * @Description: 
-->
<template>
  <div class="address-edit-box">
    <nav-bar>
      <template v-slot:default>{{ title }}</template>
    </nav-bar>
    <van-address-edit
      class="edit"
      :area-list="areaList"
      :address-info="addressInfo"
      :show-delete="type === 'edit'"
      show-set-default
      show-search-result
      :search-result="searchResult"
      :area-columns-placeholder="['请选择', '请选择', '请选择']"
      @save="handleSave"
      @delete="handleDelete"
    />
  </div>
</template>

<script>
import { Toast } from 'vant';
import { useRoute, useRouter } from 'vue-router';
import { reactive, onMounted, toRefs, computed } from 'vue';
import {
  addAddress,
  editAddress,
  deleteAddress,
  getAddressDetail,
} from '@/network/address';
import { tdist } from '@/utils/address';
import NavBar from '@/components/common/navBar/NavBar.vue';
export default {
  name: 'AddressEdit',
  components: {
    NavBar,
  },
  setup() {
    const route = useRoute();
    const router = useRouter();

    const state = reactive({
      areaList: {
        province_list: {}, // 省
        city_list: {}, // 市
        county_list: {}, // 县
      },
      searchResult: [],
      addressInfo: {},
      type: 'add',
      addressId: '',
      title: '',
    });

    // 计算属性
    const title = computed(() => {
      // 判断state里面的类型
      console.log(state);
      return state.type == 'add' ? '新增地址' : '编辑地址';
    });
    // 保存地址信息
    const handleSave = (content) => {
      // 保存数据存放到参数中
      const params = {
        name: content.name,
        phone: content.tel,
        province: content.province,
        city: content.city,
        county: content.county,
        address: content.addressDetail,
        is_default: content.isDefault ? 1 : 0, // 判断是否为默认地址
      };
      // 如果类型为 编辑 状态
      if (state.type == 'edit') {
        // 调用 修改数据接口
        editAddress(state.addressId, params); // params传递修改好的数据
      } else if (state.type == 'add') {
        // 调用 添加数据接口
        addAddress(params);
      }
      // 轻提示
      Toast.success('保存成功');
      setTimeout(() => {
        router.back();
      }, 500);
    };
    // 删除地址
    const handleDelete = () => {
      // 传递删除的id，直接调用接口
      deleteAddress(state.addressId).then((res) => {
        if (res.status == '204') {
          Toast.success('删除成功');
          // 删除成功后，500ms中回到原来位置
          setTimeout(() => {
            router.back();
          }, 500);
        }
      });
    };

    // 挂载数据
    onMounted(() => {
      // 省市区 列表 构造出来
      let _province_list = {}; // 省列表
      let _city_list = {}; // 市列表
      let _county_list = {}; // 县列表
      //遍历所有 省数据
      tdist.getLev1().forEach((p) => {
        // 把 省 的id拿出来
        _province_list[p.id] = p.text;
        // 遍历所有 市数据
        tdist.getLev2(p.id).forEach((c) => {
          _city_list[c.id] = c.text;
          tdist.getLev3(c.id).forEach((q) => {
            _county_list[q.id] = q.text;
          });
        });
      });

      state.areaList.province_list = _province_list;
      state.areaList.city_list = _city_list;
      state.areaList.county_list = _county_list;
      // 接收参数
      const { type, addressId } = route.query;
      // 加到状态里面
      state.type = type;
      state.addressId = addressId;
      // 如果状态为edit编辑的时候
      if (type === 'edit') {
        // 获取到当前编辑id
        getAddressDetail(addressId).then((res) => {
          // 地址详情赋值给一个变量
          const addressDetail = res;
          // 定义一个空的区域码
          let _areaCode = '';
          // 省份
          const province = tdist.getLev1();
          // Object中entries属性可以拿到键和值
          // 区-市-省，反着拿
          Object.entries(state.areaList.county_list).forEach(([id, text]) => {
            // 先找出当前对应的区
            if (text == addressDetail.county) {
              // 找到区对应的几个省份
              const provinceIndex = province.findIndex(
                (item) => item.id.substr(0, 2) == id.substr(0, 2)
              );
              // 找到区对应的几个市区
              /* const cityItem = Object.entries(state.areaList.city_list).filter(
                ([cityId, city]) => cityId.substr(0, 4) == id.substr(0, 4)
              )[0]; */
              const cityItem = Object.entries(state.areaList.city_list).filter(
                ([cityId]) => cityId.substr(0, 4) == id.substr(0, 4)
              )[0];
              // 对比找到的省份和接口返回的省份是否相等，因为有一些区会重名
              if (
                province[provinceIndex].text == addressDetail.province &&
                cityItem[1] == addressDetail.city
              ) {
                _areaCode = id;
              }
            }
          });
          // 编辑地址信息，显示在编辑栏表单中
          state.addressInfo = {
            name: addressDetail.name,
            tel: addressDetail.phone,
            province: addressDetail.province,
            city: addressDetail.city,
            county: addressDetail.county,
            areaCode: _areaCode, //区域码
            addressDetail: addressDetail.address,
            isDefault: !!addressDetail.is_default,
          };
        });
      }
    });

    return {
      ...toRefs(state),
      handleSave,
      handleDelete,
      title,
    };
  },
};
</script>

<style lang="scss" scoped>
.edit {
  margin-top: 45px;
  .van-field__body {
    textarea {
      height: 26px !important;
    }
  }
  ::v-deep(.van-button) {
    background-color: #44b883;
    border: 1px solid #44b883;
  }
  ::v-deep(.van-button:nth-child(2)) {
    background-color: #ee0a24;
    border: 1px solid #ee0a24;
    color: #ffffff;
  }
}
.address-edit-box {
  margin-top: 44px;
  .van-address-edit {
    .van-button--danger {
      background: var(--color-tint);
      border-color: var(--color-tint);
    }
    .van-switch--on {
      background: var(--color-tint);
    }
  }
}
</style>
