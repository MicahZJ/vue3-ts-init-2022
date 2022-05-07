<template lang="pug">
div#result-wrapper
  el-result(icon="success"
    title="申请成功"
    sub-title="请保持电话畅通，稍后会有工作人员致电联系")
    template(#extra)
      el-button(type="primary" @click="goBack()") 返回申请页面
</template>

<script src="./control.ts"></script>

<style scoped lang="stylus" src="./style.styl"/>
