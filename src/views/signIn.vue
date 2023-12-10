<template>
  <div class="body">
    <div class="header">
      <img src="" />
      <dic>年会签到表</dic>
    </div>
    <div class="form">
      <el-form :model="form" label-width="120px">
        <el-form-item label="姓名">
          <el-input v-model="form.name" placeholder="请输入姓名" />
        </el-form-item>
        <el-form-item label="所属公司">
          <el-select
            v-model="form.region"
            placeholder="请选择所属公司"
          >
            <el-option label="粤港湾" value="粤港湾" />
            <el-option label="港湾科技" value="港湾科技" />
            <el-option label="瑞恒建筑" value="瑞恒建筑" />
            <el-option label="君盛" value="君盛" />
          </el-select>
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="form.name" placeholder="请输入手机号" />
        </el-form-item>
        <el-form-item label="Activity time">
          <el-col :span="11">
            <el-date-picker
              v-model="form.date1"
              type="date"
              placeholder="Pick a date"
              style="width: 100%"
            />
          </el-col>
          <el-col :span="2" class="text-center">
            <span class="text-gray-500">-</span>
          </el-col>
          <el-col :span="11">
            <el-time-picker
              v-model="form.date2"
              placeholder="Pick a time"
              style="width: 100%"
            />
          </el-col>
        </el-form-item>
        <el-form-item label="Instant delivery">
          <el-switch v-model="form.delivery" />
        </el-form-item>
        <el-form-item label="Activity type">
          <el-checkbox-group v-model="form.type">
            <el-checkbox label="Online activities" name="type" />
            <el-checkbox label="Promotion activities" name="type" />
            <el-checkbox label="Offline activities" name="type" />
            <el-checkbox label="Simple brand exposure" name="type" />
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="Resources">
          <el-radio-group v-model="form.resource">
            <el-radio label="Sponsor" />
            <el-radio label="Venue" />
          </el-radio-group>
        </el-form-item>
        <el-form-item label="Activity form">
          <el-input v-model="form.desc" type="textarea" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">Create</el-button>
          <el-button>Cancel</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from "vue";

// do not use same name with ref
const form = reactive({
  name: "",
  region: "",
  date1: "",
  date2: "",
  delivery: false,
  type: [],
  resource: "",
  desc: "",
});

const onSubmit = () => {
  console.log("submit!");
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
  justify-content: center;
  font-size: 32px;
}
.form{
  padding: 0 40px;
}
</style>
