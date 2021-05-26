<template>
  <el-scrollbar wrap-class="scrollbar-wrapper">
    <el-menu
      :show-timeout="200"
      :default-active="$route.path"
      :collapse="isCollapse"
      mode="vertical"
      active-text-color="#4979FF"
    >
      <sidebar-item
        v-for="route in fmt_permission_routes"
        :key="route.path"
        :item="route"
        :base-path="route.path"
      />
    </el-menu>
  </el-scrollbar>
</template>

<script>
import { mapGetters } from "vuex";
import SidebarItem from "./SidebarItem";
export default {
  components: { SidebarItem },
  computed: {
    ...mapGetters(["permission_routes", "sidebar"]),
    fmt_permission_routes() {
      return this.permission_routes.filter((item) => !item.hidden);
    },
    isCollapse() {
      return !this.sidebar.opened;
    },
  },
};
</script>
