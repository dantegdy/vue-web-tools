<!--抽奖组件-->
<template>
  <div class="container">
    <div class="show-name" @click="clickBtn">
      <span v-if="nameList.length == 0">
        {{ noDataTip }}
      </span>
      <span v-else>
        {{ curName }}
      </span>
    </div>
    <!--控制盒子-->
    <div class="control-div">
      <!--奖项切换-->
      <div class="option-div">
        <el-radio-group v-model="curOpt" size="large" style="margin: 10px">
          <el-radio-button
            v-for="item in optionsData"
            :key="item"
            :label="item"
          />
        </el-radio-group>
      </div>
      <div class="btn-div">
        <el-button
          class="btn"
          size="small"
          color="#b79900"
          @click="isParticipant = true"
          >参与人员</el-button
        >
        <el-button
          class="btn"
          size="small"
          color="#b79900"
          @click="isHistoryList = true"
          >抽奖历史</el-button
        >
      </div>
    </div>
    <el-dialog v-model="isShowMsg">
      <h1 style="width: 100%; text-align: center" v-if="nameList.length !== 0">
        恭喜
        <span style="color: #f00">{{ curName }}</span>
        获得
        <span style="color: #f00">{{ curOpt }}</span>
      </h1>
      <h1 style="width: 100%; text-align: center" v-else>
        请先导入参与人员数据！
      </h1>
    </el-dialog>
    <div class="com-div">
      <Participant
        :isParticipant="isParticipant"
        @close="isParticipant = false"
        @getNameList="getNameList"
      />
      <HistoryList
        :isHistoryList="isHistoryList"
        @close="isHistoryList = false"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, toRaw } from "vue";
import { fetchData } from "@/tools/fetchData";
import Participant from "./Participant.vue";
import HistoryList from "./HistoryList.vue";
let curName = ref("请开始"),
  optionsData = ref(["特等奖", "一等奖", "二等奖", "三等奖"]), //奖项
  curOpt = ref("三等奖"), //当前选中
  noDataTip = "无数据",
  isStop = ref(true), //默认停止
  isShowMsg = ref(false),
  isParticipant = ref(false), //人员弹窗状态
  isHistoryList = ref(false),
  nameList = ref([]); //名字列表

function dataInit() {
  const url = "lottery/sign_in_data";
  fetchData(url)
    .then((res) => {
      const { data } = res;
      console.log(data);
      localStorage.setItem("tabData", JSON.stringify(data));
    })
    .then(() => {
      const tabList = JSON.parse(localStorage.getItem("tabData"));
      tabList && (nameList.value = tabList);
    });
}
dataInit();

// onMounted(() => {
//   console.log('onMounted')
//   const tabList = JSON.parse(localStorage.getItem("tabData"));
//   tabList && (nameList.value = tabList);
// });

//获取人员姓名
function getNameList(data) {
  nameList = data;
}

//点击按钮
function clickBtn() {
  if (isStop.value) {
    handleStart();
  } else {
    handleStop();
  }
}
function popUp() {
  isShowMsg.value = true;
  setTimeout(() => {
    isShowMsg.value = false;
  }, 2000);
}
//点击开始
function handleStart() {
  if (nameList.value.length == 0) {
    // isShowMsg.value = true;
    popUp();
    // showMsg.value = "请先导入参与人员数据！";
  } else {
    isStop.value = false;
    forNameList(nameList.value); //循环数组
  }
}

//洗牌算法(乱序数组)
function shuffle(arr) {
  var l = arr.length;
  var index, temp;
  while (l > 0) {
    index = Math.floor(Math.random() * l);
    temp = arr[l - 1];
    arr[l - 1] = arr[index];
    arr[index] = temp;
    l--;
  }
  return arr;
}

//循环列表
function forNameList(list) {
  list = shuffle(list);
  for (let i = 0; i < list.length; i++) {
    setTimeout(() => {
      if (!isStop.value) {
        curName.value = list[i].name;
        i == list.length - 1 && forNameList(nameList.value); //数组耗尽循环
      }
    }, 50 * i);
  }
}

//停止
function handleStop() {
  isStop.value = true; //停止循环
  // isShowMsg.value = true;
  popUp();
  let tabData = JSON.parse(localStorage.getItem("tabData")); //取出总人员
  let luckDrawHis = JSON.parse(localStorage.getItem("luckDrawHis"))
    ? JSON.parse(localStorage.getItem("luckDrawHis"))
    : [];
  tabData.forEach((t) => {
    if (t.name == curName.value) {
      luckDrawHis.push({
        prize: curOpt.value, //奖项
        name: curName.value, //姓名
        corporation: t.corporation, //公司名
      });
    }
  });
  localStorage.setItem("luckDrawHis", JSON.stringify(luckDrawHis)); //数据存入本地
  let tempList = []; //临时列表
  nameList.value.forEach((n) => {
    if (n.name !== curName.value) {
      tempList.push(n);
    }
  });
  nameList.value = tempList; //重新赋值姓名列表
  localStorage.setItem("tabData", JSON.stringify(nameList.value)); //数据存入本地
}
</script>

<style lang="scss" scoped>
::v-deep .el-radio-button__inner {
  background-color: #b79900;
  font-size: 3vh;
  font-weight: 900;
  border: 0px solid #f00;
  color: #fff;

  &:hover {
    border: 0px solid #f00;
    color: #fff;
  }
}

::v-deep .el-radio-button__original-radio:checked + .el-radio-button__inner {
  background-color: #fd3c3c;
  color: #fff;
  border: 0px solid #f00;
}

.container {
  height: 100vh;
  width: 100vw;
  background-image: url(../assets/img/bg2.png);
  background-size: cover;
  background-position: center;
  display: flex;

  .show-name {
    height: 50vh;
    width: 50vh;
    background-color: rgba(255, 255, 255, 0.2);
    box-shadow: 0px 0px 20px black;
    margin: auto;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 15vh;
    font-weight: 900;
    color: #fff;
    border-radius: 100%;
    user-select: none;

    &:hover {
      background-color: rgba(255, 255, 255, 0.3);
      box-shadow: 0px 0px 50px black;
    }
  }

  .control-div {
    height: 50vh;
    position: absolute;
    right: 0;
    bottom: 0;
    margin: 10px;
    border-radius: 20px;

    .option-div {
      width: 100%;
      display: flex;
      justify-content: center;
    }

    .btn-div {
      .btn {
        display: flex;
        flex-direction: column;
        box-shadow: 0px 0px 10px black;
        color: #fff;
        margin: 10vh auto;
        padding: 20px;
        font-weight: 900;
        font-size: 3vh;
      }
    }
  }
}
</style>
