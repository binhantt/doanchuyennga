<template>
  <form @submit.prevent="onSubmit" class="space-y-5">
    <InputField
      label="Tên người dùng"
      :icon="ICONS.Users"
      v-model="form.email"
      placeholder="Nhập tên người dùng"
    />
    <InputField
      label="Mật khẩu"
      :icon="ICONS.Lock"
      type="password"
      v-model="form.password"
      placeholder="Nhập mật khẩu"
    />
    <div class="flex items-center justify-between text-sm">
      <Checkbox label="Ghi nhớ đăng nhập" v-model="form.remember" />
      <a href="#" class="text-blue-600 hover:underline">Quên mật khẩu?</a>
    </div>
    <ButtonPrimary type="submit" class="w-full">
      Đăng nhập
    </ButtonPrimary>
  </form>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { useLogin } from "../auth/hooks/useLogin";
import InputField from "../../../components/common/InputField.vue";
import ButtonPrimary from "../../../components/common/ButtonPrimary.vue";
import Checkbox from "../../../components/common/Checkbox.vue";
import { ICONS } from "../../../components/constants/icon";
const form = ref({
  email: "",
  password: "",
  remember: false,
});
console.log(form)
const { login } = useLogin();
const onSubmit = async () => {
  await login(form.value);
};
</script>
