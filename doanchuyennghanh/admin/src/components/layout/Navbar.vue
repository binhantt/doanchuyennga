<template>
  <a-layout-header
    class="flex justify-between items-center bg-white px-4 py-2 shadow-sm border-b border-gray-100"
  >
    <InputField
      v-model="searchValue"
      :icon="SearchOutlined"
      placeholder="Tìm kiếm..."
      class="w-64"
    />
    <div class="flex items-center gap-5">
      <ButtonBadge :icon="BellOutlined" :count="5" @click="onBellClick" />
    <ButtonBadge :icon="MessageOutlined" :count="3" @click="onMessageClick" />

      <a-dropdown trigger="click">
        <div class="flex items-center gap-2">
          <a-avatar style="background-color: #1677ff ; ">
            <UserOutlined class="text-2xl" />
          </a-avatar>
          <div class="text-right flex justify-start flex-col hidden sm:block">
            <p class="text-sm font-semibold text-gray-800 m-0">Admin</p>
            <p class="text-xs text-gray-500 m-0">Quản trị viên</p>
          </div>
        </div>

        <template #overlay>
          <a-menu>
            <a-menu-item key="profile">
              <UserOutlined /> Hồ sơ
            </a-menu-item>
            <a-menu-item key="settings">
              <SettingOutlined /> Cài đặt
            </a-menu-item>
            <a-menu-divider />
            <a-menu-item key="logout" danger>
              <LogoutOutlined /> Đăng xuất
            </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </div>
  </a-layout-header>
</template>

<script setup lang="ts">
import { ref, h } from "vue";
import { BellOutlined, MessageOutlined  ,SearchOutlined, UserOutlined} from "@ant-design/icons-vue";
import InputField from "../common/input/InputField.vue";
import ButtonBadge from "../common/button/ButtonBadge.vue";
const onBellClick = () => console.log("🔔 Mở thông báo");
const onMessageClick = () => console.log("💬 Mở tin nhắn");
const searchValue = ref("");
</script>

<style scoped>

</style>
