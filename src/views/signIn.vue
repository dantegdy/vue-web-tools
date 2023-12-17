<template>
  <div class="body" v-if="isMobile">
    <div class="header">
      <div class="header_logo">
        <img src="../assets/img/youngo_logo.png" />
      </div>
      <div>年会签到表</div>
    </div>
    <div class="form">
      <el-form :model="form" label-width="120px">
        <el-form-item label="姓名">
          <el-input
            class="name_input"
            v-model="form.name"
            placeholder="请输入姓名"
          />
        </el-form-item>
        <el-form-item label="所属公司">
          <el-select v-model="form.corporation" placeholder="请选择所属公司">
            <el-option label="粤港湾" value="粤港湾" />
            <el-option label="港湾科技" value="港湾科技" />
            <el-option label="瑞恒建筑" value="瑞恒建筑" />
            <el-option label="君盛" value="君盛" />
            <el-option label="瑞信" value="瑞信" />
          </el-select>
        </el-form-item>
        <el-form-item label="手机号">
          <el-input
            class="phone_input"
            v-model="form.phone"
            placeholder="请输入手机号"
          ></el-input>
          <el-button type="primary" @click="getCode">发送验证码</el-button>
        </el-form-item>
        <el-form-item label="验证码">
          <el-input
            class="code_input"
            v-model="form.code"
            placeholder="请输入验证码"
          />
        </el-form-item>
        <el-row justify="center">
          <el-button type="primary" @click="signIn">提交</el-button>
        </el-row>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { fetchData } from "@/tools/fetchData";
import judgeDevice from "@/tools/judgeDevice";

// do not use same name with ref
const form = reactive({
  name: "",
  phone: "",
  corporation: "",
  code: "",
});
const isMobile = ref(false);

onMounted(() => {
  isMobile.value = judgeDevice();
  if (!isMobile.value) {
    alert("请在移动端打开！");
    useRouter().push("/lottery");
  }
});

// 获取验证码
const getCode = () => {
  const params = {
    phone: form.phone,
  };
  fetchData("lottery/get_code", { method: "POST", params });
};
// 签到
const signIn = () => {
  console.log("submit!");
  fetchData("lottery/sign_in", { method: "POST", params: form });
};
</script>

<style lang="scss" scoped>
.body {
  height: 100vh;
  width: 100%;
  line-height: 1.4;
  display: flex;
  flex-direction: column;
}
.header {
  padding: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 32px;
  .header_logo {
    width: 70%;
    img {
      width: 100%;
    }
  }
}
.form {
  padding: 0 20px;

  .name_input {
    width: 150px;
  }
  .phone_input {
    width: 150px;
    padding-right: 8px;
  }
  .code_input {
    width: 150px;
  }
}
</style>
