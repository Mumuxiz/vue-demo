<template>
  <div class="permission main-box">
    <div class="text-right">
      <el-button type="primary" icon="el-icon-refresh" @click="syncActions">同步至数据库</el-button>
      <el-button type="primary" icon="el-icon-refresh" @click="syncActions">带参跳转至产品</el-button>
    </div>
    <el-tree
      :data="treeData"
      node-key="id"
      default-expand-all
      :props="{label: 'name', children: 'children'}"
      :expand-on-click-node="false">
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <span v-html="fmtName(data)"></span>
        <div class="fr r">
          <el-button
            type="text"
            size="mini"
            @click="() => append(data)">
            启用
          </el-button>
          <el-button
            type="text"
            size="mini"
            @click="() => remove(node, data)">
            禁用
          </el-button>
        </div>
      </span>
    </el-tree>
  </div>
</template>

<script>
// import {createActionsFromMenu, createActionsFromServer, createElTreeData, equals} from "../../utils/permission";
// import kqMenuConfigs from '../../config/menu/index'
import {createMenu, createActionsFromServer, equal, createElTreeData} from "../../utils/permission";

export default {
  name: 'permission',
  data () {
    return {
      id: 1000,
      isInitState: true,
      treeData:[],
      defaultAction: {
        action_id: '',
        action_name: '',
        action_code: '',
        action_desc: '',
        parent_code: '',
        status: 1,
        type: 1,
        is_check: 1,
        parent_id: ''
      },
      serverData: [],
      localData: [],
      localActionIndex: 0
    }
  },
  created () {
    this.getList();
  },
  methods: {
    equal,
    createElTreeData,
    fmtName(data){
      let prefix = data.parent_id ? data.parent_id + '-' : ''
      let desc = data.action_desc ? `<span class="danger">(${data.action_desc})</span>` : ''
      return `${prefix}${data.action_id}【<span class="success text-bold">${data.action_code}</span>】${data.action_name}${desc}`
    },
    append(data) {
      const newChild = { id: id++, label: 'testtest', children: [] };
      if (!data.children) {
        this.$set(data, 'children', []);
      }
      data.children.push(newChild);
    },

    remove(node, data) {
      const parent = node.parent;
      const children = parent.data.children || parent.data;
      const index = children.findIndex(d => d.id === data.id);
      children.splice(index, 1);
    },
    getList () {
      this.localActionIndex = 0;
      this.$axios.get('/actionList').then(resp => {
        console.log(resp);
        this.serverData = createActionsFromServer(resp.data);
        this.treeData = createElTreeData(resp.data);
      })
    },
    syncActions () {
      this.localData = createMenu();
      console.log(this.localData);
      this.runAction();
    },
    goProduct () {
      this.$router.push('/product')
    },
    // 执行操作名配置对比：新增或编辑
    runAction () {
      let localItem, serverItem;
      localItem = this.localData[this.localActionIndex];
      if (!localItem) {
        this.$message.error('根据菜单配置，生成本地action数据失败!');
        return;
      }



      // 获取parent_id
      // 本地数据无父级code，则为一级，及parent_id为0
      if (!localItem.parent_code) {
        localItem.parent_id = 0;
      } else {
        localItem.parent_id = this.serverData[localItem.parent_code].action_id
      }


      // 获取action_code对应的服务器数据
      serverItem = this.serverData[localItem.action_code];
      if (serverItem) {
        // 是否更新
        if (equal(serverItem, localItem)) {
          this.countIndex()
        } else {
          let params = {...localItem};
          params.action_id = serverItem.action_id;
          // 更新
          this.$axios.post('/editAction', params).then(resp => {
            this.countIndex()
          }).catch(e => {
            this.$message.error(e.message)
          })
        }
      } else {
        this.$axios.post('/addAction', localItem).then(resp => {
          console.log(resp);
          this.countIndex()
        })
      }


    },
    /**
     * 统计出来数量
     */
    countIndex () {
      console.log(this.localActionIndex);
      this.localActionIndex++;
      if (this.localActionIndex === this.localData.length) {
        // 删除多余操作名
        this._delActions();
      } else {
        this.runAction()
      }
    },
    /**
     * 删除操作名
     * @param addCount 新增数量
     * @param editCount 编辑数量
     * @return {Promise<void>}
     */
    async _delActions () {
      let tmp = JSON.parse(JSON.stringify(this.serverData))
      // 删除已有的操作名，
      // 剩下的则为需要删除的
      this.localData.forEach(item => {
        delete tmp[item.action_code]
      });

      // 待删除元素
      let delIds = [];
      for (let key in tmp) {
        if (tmp.hasOwnProperty(key)) {
          delIds.push(tmp[key].action_id)
        }
      }
      // 获取删除元素长度
      let delCount = delIds.length;

      // 定义错误对象
      let err;

      // 删除操作
      if (delCount) {
        try {
          await this.$axios.post('/removeAction', {action_ids: delIds})
        } catch (e) {
          err = e
        }
      }

      // 最后提示内容
      if (err) {
        this.$message.error(err.message)
      } else {
        // let message = []
        // if (addCount) message.push(`新增${addCount}个`)
        // if (editCount) message.push(`编辑${editCount}个`)
        // if (delCount) message.push(`删除${delCount}个`)
        this.$message.success('操作名同步完成')
      }
      // 更新列表
      this.getList()
    }
  }
}
</script>


<style lang="scss">
  $height: 32px;
  .el-tree {
    .el-tree-node__content {
      height: $height;
    }
    .custom-tree-node {
      position: relative;
      width: 100%;
      font-size: 14px;
      height: $height;
      box-sizing: border-box;
      line-height: $height;
      border-bottom: 1px #ccc dashed;
      .r {
        position: absolute;
        top: 0;
        right: 0;
        .el-button {
          padding: 0;
        }
      }
    }
  }
</style>
