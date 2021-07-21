<template>
  <div class="app-container" v-loading="loading">
    <div class="padding-content">
      <el-card class="box-card">
        <div>尽情享用</div>
        <div>
          项目地址:
          <a href="https://github.com/g0ngjie/dynamic-router" target="_blank"
            >Github</a
          >
          <a href="https://gitee.com/g0ngjie/dynamic-router" target="_blank"
            >Gitee</a
          >
        </div>
      </el-card>
    </div>

    <div class="padding-content">
      <el-button size="mini" type="primary" @click="openModal()"
        >添加</el-button
      >
    </div>
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column prop="id" label="Id" />
      <el-table-column prop="path" label="Path" />
      <el-table-column prop="name" label="Name" />
      <el-table-column
        prop="createDate"
        label="CreateDate"
        :formatter="fmtDate"
      />
      <el-table-column
        prop="updateDate"
        label="UpdateDate"
        :formatter="fmtUDate"
      />
      <el-table-column label="option">
        <template slot-scope="{ row }">
          <el-button type="text" @click="handleDel(row)">删除</el-button>
          <el-button type="text" @click="openModal(row)">修改</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog append-to-body :visible.sync="isShow">
      <el-form
        :model="form"
        ref="form"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item
          label="Name"
          prop="name"
          :rules="[{ required: true, message: '不能为空' }]"
        >
          <el-input
            v-model="form.name"
            @keyup.enter.native="validate"
            placeholder="示例: 用户管理"
            style="width: 80%;"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="Path"
          prop="path"
          :rules="[
            { required: true, message: '不能为空' },
            { validator: validPath, trigger: 'blur' },
          ]"
        >
          <el-input
            v-model="form.path"
            @keyup.enter.native="validate"
            placeholder="示例: /user"
            style="width: 80%;"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="isShow = false">取 消</el-button>
        <el-button size="mini" type="primary" @click="validate"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getMenusList, addMenu, delMenu, updateMenu } from "@/api/index";
import moment from "moment";
import { handleClick } from "@beeweb/logger";

export default {
  data() {
    return {
      tableData: [],
      isShow: false,
      form: {},
      loading: false,
      isEdit: false,
      validPath: (_, value, callback) => {
        if (value.trim() === "/") {
          return callback(new Error("根路径已经存在，请换其他的路径来试"));
        } else if (!value.startsWith("/")) {
          return callback(new Error("请以 / 为前缀，规范设置请求路径"));
        }
        return callback();
      },
    };
  },
  methods: {
    reload() {
      setTimeout(() => {
        location.reload();
      }, 500);
    },
    fmtDate({ createDate }) {
      return moment(createDate).format("YYYY-MM-DD HH:mm");
    },
    fmtUDate({ updateDate }) {
      return moment(updateDate).format("YYYY-MM-DD HH:mm");
    },
    handleDel({ id }) {
      this.$confirm("确认删除？")
        .then(async () => {
          const { code } = await delMenu({ id });
          if (code === 100) {
            this.$message.success("删除成功");
            handleClick({ event: "删除", id });
            this.reload();
          }
        })
        .catch(() => {});
    },
    openModal(row = {}) {
      this.isEdit = JSON.stringify(row) !== "{}";
      this.form = row;
      this.isShow = true;
      this.$nextTick(() => this.$refs.form.clearValidate());
    },
    validate() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          if (this.isEdit) this.handleUpdate();
          else this.handleSubmit();
        }
      });
    },
    async handleUpdate() {
      const { code } = await updateMenu(this.form);
      if (code === 100) {
        this.$message.success("修改成功");
        handleClick({ event: "修改", data: this.form });
        this.isShow = false;
        this.reload();
      }
    },
    async handleSubmit() {
      const { code, msg } = await addMenu(this.form);
      this.isShow = false;
      if (code === 100) {
        this.$message.success("添加成功");
        handleClick({ event: "添加", data: this.form });
        this.reload();
      } else this.$message.error(msg || "发生了一些不可预估的事情");
    },
    async initList() {
      this.loading = true;
      const { body, code } = await getMenusList();
      this.loading = false;
      if (code === 100) this.tableData = body || [];
    },
  },
  created() {
    this.initList();
  },
};
</script>

<style lang="scss" scoped>
.box-card {
  font-size: 13px;
  color: #333;
  div {
    margin: 2px 0;
  }
  a {
    color: #409eff;
    margin-right: 10px;
    font-weight: 700;
  }
}
</style>
