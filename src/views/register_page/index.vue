<template>
  <div id="register-wrapper">
    <span class="title">Welcome</span>
    <el-form
            ref="ruleFormRef"
            :model="ruleForm"
            status-icon
            :rules="rules"
            :label-position="'top'"
            class="demo-ruleForm"
    >
      <el-form-item label="公司" prop="company">
        <el-input v-model="ruleForm.company" />
      </el-form-item>
      <el-form-item label="姓名" prop="userName">
        <el-input v-model="ruleForm.userName" />
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="ruleForm.email" />
      </el-form-item>
      <el-form-item label="手机" prop="phone">
        <el-input v-model="ruleForm.phone" />
      </el-form-item>
      <el-form-item label="验证码" prop="verification">
        <el-col :span="13">
          <el-input v-model="ruleForm.verification"
                    placeholder="请输入验证码" minlength="6" maxlength="6" />
        </el-col>
        <el-col :span="2">
          <el-button type="warning"
                     :loading="checkCodeBtn.loading"
                     :disabled="checkCodeBtn.disabled"
                     @click="getCheckCode" style="margin-left: 5px">
            {{ checkCodeBtn.text }}
          </el-button>
        </el-col>
      </el-form-item>
      <el-form-item label="微信号" prop="wechat">
        <el-input v-model="ruleForm.wechat" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm(ruleFormRef)">提交申请</el-button>
        <el-button @click="resetForm(ruleFormRef)">重新填写</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script src="./control.ts" lang="ts"></script>

<style scoped lang="stylus" src="./style.styl"/>
