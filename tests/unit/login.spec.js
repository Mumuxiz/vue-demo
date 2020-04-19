/**
 * Created by Mumuxiz.
 * Date: 2019/11/04 17:22
 * Describe: 登录页面测试用例
 */
// 允许你通过 shallowMount 方法只挂载一个组件而不渲染其子组件
import { mount, createLocalVue } from '@vue/test-utils'
import login from '@/views/login/login.vue'
import axios from 'axios'
import Vue from 'vue'
import ElementUI from 'element-ui'
const localVue = createLocalVue()
localVue.use(ElementUI)

// import bread from '@/components/m-breadcrumb.vue'

describe('登录页面', () => {
  it('测试登录', () => {
    // const value = 0.1 + 0.2
    // expect(value).toBeCloseTo(0.3) // 这句可以运行

    const wrapper = mount(login, {
      localVue,
      propsData: {
        crumbList: ['首页']
      }
    })

    // const value = 0.1 + 0.2
    // expect(value).toBeCloseTo(0.3) // 这句可以运行

    wrapper.find('button.btn').trigger('click')
    return Vue.nextTick().then(function () {
      expect(axios.get).toBe(1)
    })
  })
})
