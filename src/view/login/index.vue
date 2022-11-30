<!--
 * @Author: HULONG
 * @Date: 2022-09-28 10:05:48
 * @LastEditors: [you name]
 * @LastEditTime: 2022-11-30 10:55:07
 * @Description: 
-->
<template>
  <div class="login_box w-full h-full flex items-center justify-center">
    <div class="main_container rounded-[8px] w-[400px] p-[32px] bg-light-900">
      <Form
        :model="formState"
        :wrapper-col="{ span: 24 }"
        @finish="handleLogin"
      >
        <FormItem
          name="username"
          :rules="[{ required: true, message: '请输入用户名' }]"
        >
          <Input v-model:value="formState.username" placeholder="请输入用户名">
          </Input>
        </FormItem>
        <FormItem
          name="password"
          :rules="[{ required: true, message: '请输入密码' }]"
        >
          <InputPassword
            v-model:value="formState.password"
            placeholder="请输入密码"
          />
        </FormItem>
        <FormItem :wrapper-col="{ span: 24 }">
          <Button block type="primary" html-type="submit" :loading="loading"
            >登录</Button
          >
        </FormItem>
      </Form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Form, FormItem, Input, InputPassword, Button } from 'ant-design-vue'
import { reactive } from 'vue'
import { useRequest } from 'vue-request'
import { useRouter } from 'vue-router'
import { FormState } from './type'
import { loginApi } from '/@/api/user'
import { PageEnum } from '/@/enums/page'
import { useUserStore } from '/@/store/modules/user'

const formState = reactive<FormState>({
  username: '',
  password: '',
})
const userStore = useUserStore()
const router = useRouter()
const { loading, data, run } = useRequest(loginApi, {
  manual: true,
})
/**
 * @description: 登录按钮
 * @return {*}
 */
const handleLogin = async () => {
  userStore.setToken('')
  await run(formState)
  if (!data.value) return
  await userStore.setToken(data.value as string)
  userStore.setUserName(formState.username)
  router.push(PageEnum.BASE_HOME)
}
</script>
<style lang="less" scoped>
.main_container {
  box-shadow: 1px 3px 10px #000;
  transition: all 0.5s;
  &:hover {
    transform: translate(2px, -5px);
  }
}
</style>
