/**
 * Created by Mumuxiz.
 * Date: 2019/09/19 15:36
 * Describe: 全局注册组件
 */
import Vue from 'vue'

import mBreadcrumb from '../components/m-breadcrumb'
import mDatePicker from '../components/m-date-picker'
import mInputLimit from '../components/m-input-limit'
import mSideMenu from '../components/m-side-menu'
import mSmsCode from '../components/m-sms-code'
import mTable from '../components/m-table'
import mPagination from '../components/m-pagination'

Vue.component('m-breadcrumb', mBreadcrumb);
Vue.component('m-date-picker', mDatePicker);
Vue.component('m-input-limit', mInputLimit);
Vue.component('m-side-menu', mSideMenu);
Vue.component('m-sms-code', mSmsCode);
Vue.component('m-table', mTable);
Vue.component('m-pagination', mPagination);
