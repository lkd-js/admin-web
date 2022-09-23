<template>
  <div class="goods">
    <el-form
      :inline="true"
      :model="searchData"
      class="demo-form-inline"
      @keyup.enter="onSearch"
    >
      <el-form-item label="商品名">
        <el-input v-model="searchData.title" placeholder="请输入关键字" />
      </el-form-item>
      <el-form-item label="详情">
        <el-input v-model="searchData.introduce" placeholder="请输入关键字" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSearch">点击搜索</el-button>
        <el-button type="primary" @click="resetSearch">重置</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="showList.show" stripe style="width: 100%">
      <el-table-column prop="id" label="ID" width="180" />
      <el-table-column prop="title" label="标题" width="180" />
      <el-table-column prop="introduce" label="详情" />
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="1000"
      :page-count="count"
      @current-change="updatePage"
    />
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  reactive,
  onMounted,
  toRefs,
  computed,
  ref,
  watch,
} from "vue";
import { InitData } from "@/type/goods";
import { getGoods } from "@/request/api/home";

export default defineComponent({
  setup() {
    const data = reactive(new InitData());

    const getGoodList = () => {
      getGoods()
        .then((res) => {
          // console.log(res.data);
          data.list = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    };

    onMounted(() => {
      getGoodList();
    });

    //计算展示列表
    const showList = reactive({
      show: computed(() =>
        data.list.slice(
          (data.pageData.page - 1) * data.pageData.pagesize,
          data.pageData.page * data.pageData.pagesize
        )
      ),
    });
    //计算总页数
    const count = ref(
      computed(() => {
        return Math.ceil(data.list.length / data.pageData.pagesize);
      })
    );

    // 更新页面列表
    const updatePage = (page: number) => {
      data.pageData.page = page;
    };

    // 搜索
    const onSearch = () => {
      // console.log("submit!");
      if (data.searchData.title || data.searchData.introduce) {
        if (data.searchData.title && data.searchData.introduce) {
          data.list = data.list.filter((v) => {
            return (
              v.title.indexOf(data.searchData.title) !== -1 &&
              v.introduce.indexOf(data.searchData.introduce) !== -1
            );
          });
        } else if (data.searchData.title) {
          data.list = data.list.filter((v) => {
            return v.title.indexOf(data.searchData.title) !== -1;
          });
        } else if (data.searchData.introduce) {
          data.list = data.list.filter((v) => {
            return v.introduce.indexOf(data.searchData.introduce) !== -1;
          });
        }
      }
      // console.log(data.list);
    };

    // 重置搜索选项
    const resetSearch = () => {
      data.searchData.title = "";
      data.searchData.introduce = "";
    };

    // 监视搜索关键词，及时更新数据
    watch(
      () => data.searchData,
      () => {
        if (data.searchData.title === "" && data.searchData.introduce === "") {
          getGoodList();
        }
      },
      {
        deep: true,
      }
    );

    return {
      ...toRefs(data),
      onSearch,
      resetSearch,
      showList,
      count,
      updatePage,
    };
  },
});
</script>