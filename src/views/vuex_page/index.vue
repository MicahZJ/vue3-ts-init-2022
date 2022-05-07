<template>
  <div id="vuex-wrapper">
    <span class="test">VueX4测试用例{{count}}</span>
    <br>
    <el-button type="primary" @click="test()">vuex按钮</el-button>
    <br>
    <span class="test">VueX4测试用例{{double}}</span>
    <br>
    <el-button type="primary" @click="test2()">vuex按钮</el-button>
  </div>
</template>

<script src="./control.ts"></script>

<style scoped lang="stylus" src="./style.styl"/>
