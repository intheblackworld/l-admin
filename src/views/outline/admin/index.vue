<template>
  <div class="dashboard-editor-container">
    <!-- <github-corner class="github-corner" /> -->
    <el-button
      v-for="time in nearList"
      :key="time.value + time.label"
      size="medium"
      :type="outlineReq.time == time.value ? 'primary' : 'info'"
      round
      plain
      @click="outlineReq.time = time.value"
    >{{ time.label }}</el-button>
    <panel-group
      :total-people="outlineData.totalPeople"
      :total-date="outlineData.totalDate"
      :total-pay="outlineData.totalPay"
      :total-v-i-p="outlineData.totalVIP"
      @handleSetLineChartData="handleSetLineChartData"
    />
    <h3>報表</h3>
    <el-row style="background:#fff;padding:16px 16px 16px;margin-bottom:32px;">
      <span style="margin-right: 10px;color: #999;">時間區間</span>
      <!-- <el-date-picker
        v-model="conversionReq.range"
        type="daterange"
        align="right"
        unlink-panels
        range-separator="至"
        start-placeholder="開始日期"
        end-placeholder="结束日期"
        :picker-options="pickerOptions"
        style="margin-right: 10px;"
      />-->
      <el-button
        v-for="time in nearList"
        :key="time.value + time.label"
        size="medium"
        :type="conversionReq.time == time.value ? 'primary' : 'info'"
        round
        plain
        @click="conversionReq.time = time.value"
      >{{ time.label }}</el-button>
      <br />
      <br />
      <span style="margin-right: 10px;color: #999;">地區</span>
      <el-select
        v-model="conversionReq.address"
        placeholder="不限"
        multiple
        style="margin-right: 10px;"
      >
        <el-option v-for="address in addressList" :key="address" :label="address" :value="address" />
      </el-select>
      <span style="margin-right: 10px;color: #999;">性別</span>
      <!-- <el-select
        v-model="conversionReq.gender"
        placeholder="不限"
        multiple
        style="margin-right: 10px;"
      >
        <el-option
          v-for="gender in genderList"
          :key="gender.label"
          :label="gender.label"
          :value="gender.value"
        />
      </el-select>-->
      <span style="margin-right: 10px;color: #999;">分數</span>
      <el-select v-model="conversionReq.face" placeholder="不限" multiple style="margin-right: 10px;">
        <el-option v-for="face in faceList" :key="face" :label="face" :value="face" />>
      </el-select>
      <span style="margin-right: 10px;color: #999;">年齡</span>
      <el-select v-model="conversionReq.age" placeholder="不限" multiple style="margin-right: 10px;">
        <el-option v-for="age in ageList" :key="age" :label="age" :value="age" />
      </el-select>
      <br />
      <br />
      <span style="margin-right: 10px;color: #999;">時間格式</span>
      <el-button
        v-for="time in timeList"
        :key="time.value + time.label"
        size="mini"
        :type="timeType == time.value ? 'primary' : 'info'"
        round
        plain
        @click="timeType = time.value"
      >{{ time.label }}</el-button>
    </el-row>
    <!-- 約會失敗原因 -->
    <el-row v-if="chartType == 'date'" style="background:#fff;padding:16px 16px 0;">
      約會失敗原因：
      <br />
      <div v-html="reasonResult"></div>
    </el-row>
    <!-- 數量 -->
    <el-row style="background:#fff;padding:16px 16px 0;">
      <h3>數量</h3>
      <line-chart :chart-data="currentLineChartData[0]" />
    </el-row>
    <!-- 轉換率 -->
    <el-row
      v-if="chartType !== 'vip' && chartType !== 'pay'"
      style="background:#fff;padding:16px 16px 0;margin-bottom:32px;"
    >
      <h3>轉換率</h3>
      <line-chart :chart-data="currentLineChartData[1]" />
    </el-row>
    <!-- <h1>發起約會轉換</h1>
    <el-row :gutter="32">
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <raddar-chart />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <pie-chart />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <bar-chart />
        </div>
      </el-col>
    </el-row>
    <h1>發出邀請轉換</h1>
    <h1>約會成功轉換</h1>
    <h1>付費轉換</h1>
    <h1>約會失敗原因佔比</h1>
    <el-row :gutter="8">
      <el-col
        :xs="{span: 24}"
        :sm="{span: 24}"
        :md="{span: 24}"
        :lg="{span: 12}"
        :xl="{span: 12}"
        style="padding-right:8px;margin-bottom:30px;"
      >
        <transaction-table />
      </el-col>
      <el-col
        :xs="{span: 24}"
        :sm="{span: 12}"
        :md="{span: 12}"
        :lg="{span: 6}"
        :xl="{span: 6}"
        style="margin-bottom:30px;"
      >
        <todo-list />
      </el-col>
      <el-col
        :xs="{span: 24}"
        :sm="{span: 12}"
        :md="{span: 12}"
        :lg="{span: 6}"
        :xl="{span: 6}"
        style="margin-bottom:30px;"
      >
        <box-card />
      </el-col>
    </el-row>-->
  </div>
</template>

<script>
import PanelGroup from './components/PanelGroup'
import LineChart from './components/LineChart'
// import RaddarChart from './components/RaddarChart'
// import PieChart from './components/PieChart'
// import BarChart from './components/BarChart'
// import TransactionTable from './components/TransactionTable'
// import TodoList from './components/TodoList'
// import BoxCard from './components/BoxCard'
import _ from 'lodash'
import moment from 'moment'
import { getLastWeek } from '@/utils/date'
import status from '@/utils/status'
import { fetchOutline, fetchConversion } from '@/api/trend'

export default {
  name: 'DashboardAdmin',
  components: {
    // GithubCorner,
    PanelGroup,
    LineChart,
    // RaddarChart,
    // PieChart,
    // BarChart,
    // TransactionTable,
    // TodoList,
    // BoxCard
  },
  data() {
    return {
      reasonResult: '',
      addressList: ['台北', '桃園', '新竹', '台中', '台南', '高雄'],
      ageList: [
        18,
        19,
        20,
        21,
        22,
        23,
        24,
        25,
        26,
        27,
        28,
        29,
        30,
        31,
        32,
        33,
        34,
        35,
      ],
      genderList: [
        {
          label: '男生',
          value: '0',
        },
        {
          label: '女生',
          value: '1',
        },
      ],
      faceList: [5, 6, 6.5, 7, 7.5, 8, 8.5, 9],
      nearList: [
        {
          label: '最近一週',
          value: 'one_week',
        },
        {
          label: '最近一個月',
          value: 'one_month',
        },
        {
          label: '最近三個月',
          value: 'three_month',
        },
        {
          label: '最近六個月',
          value: 'six_month',
        },
        {
          label: '最近一年',
          value: 'twelve_month',
        },
      ],
      timeList: [
        // {
        //   label: '月',
        //   value: 'month',
        // },
        {
          label: '週',
          value: 'week',
        },
        {
          label: '天',
          value: 'day',
        },
      ],
      lineChartData: {
        people: {},
        date: {},
        pay: {},
        vip: {},
      },
      currentLineChartData: [
        {
          countData: [],
          countNames: [],
          transData: [],
          transNames: [],
          colors: [],
          xAxis: [],
        },
        {
          countData: [],
          countNames: [],
          transData: [],
          transNames: [],
          colors: [],
          xAxis: [],
        },
      ],
      lineChartOption: {},
      outlineReq: {
        time: 'one_month',
      },
      conversionReq: {
        address: [],
        age: [],
        gender: [],
        face: [],
        // range: [],
        time: 'one_month',
      },
      outlineData: {
        totalPeople: {
          all: {
            use: 0, // 開始使用
            regist: 0 // 選擇性別
          },
          boy: {
            use: 0, // 開始使用
            regist: 0, // 註冊完成
          },
          girl: {
            use: 0, // 開始使用
            regist: 0, // 註冊完成
          },
        },
        totalDate: {
          success: 0, // 成功
          progress: 0, // 進行中
          fail: 0, // 失敗
        },
        totalPay: {
          people: 0,
          amount: 0,
        },
        totalVIP: {
          silver: 0, // VIP 白銀
          gold: 0, // VIP 黃金
        },
      },
      conversionData: {
        people: {},
        date: {},
        pay: {},
        vip: {},
      },
      timeType: 'week',
      chartType: 'people',
    }
  },
  watch: {
    outlineReq: {
      handler(newName, oldName) {
        fetchOutline(this.outlineReq)
          .then(res => {
            this.outlineData = res.data
          })
          .catch(err => {
            console.log(err)
          })
      },
      immediate: true,
      deep: true,
    },
    conversionReq: {
      handler(newName, oldName) {
        fetchConversion(this.conversionReq)
          .then(res => {
            this.conversionData = res.data
            this.transRegistTrend()
            this.transDateTrend()
            this.transPayTrend()
            this.countFailReason(res.data.date.fail)
            this.currentLineChartData = this.lineChartData[this.chartType]
          })
          .catch(err => {
            console.log(err)
          })
      },
      deep: true,
    },

    timeType() {
      this.transRegistTrend()
      this.transDateTrend()
      this.currentLineChartData = this.lineChartData[this.chartType]
    },
  },
  created() {
    fetchConversion(this.conversionReq)
      .then(res => {
        this.conversionData = res.data
        this.transRegistTrend()
        this.transDateTrend()
        this.transPayTrend()
        this.transVipTrend()
        this.countFailReason(res.data.date.fail)
        this.currentLineChartData = this.lineChartData['people']
      })
      .catch(err => {
        console.log(err)
      })
  },
  methods: {
    countFailReason(failDateproduct) {
      // 計算約會失敗原因
      const failReasons = failDateproduct.map(date => date.status)
      const counts = {}
      for (var i = 0; i < failReasons.length; i++) {
        var num = failReasons[i]
        counts[num] = counts[num] ? counts[num] + 1 : 1
      }
      let reasons = Object.keys(counts).map(key => ({
        reason: key,
        count: counts[key],
      }))
      reasons = _.orderBy(reasons, ['count'], ['desc'])

      const reasonResult = reasons
        .map(
          item =>
            `${
              _.find(status.dateProductStatusList, { value: item.reason }).text
            }：${item.count}次`,
        )
        .join('<br />')
      this.reasonResult = reasonResult
    },
    handleSetLineChartData(type) {
      this.chartType = type
      this.currentLineChartData = this.lineChartData[type]
    },

    resetLineChartData() {
      this.currentLineChartData = [
        {
          countData: [],
          countNames: [],
          transData: [],
          transNames: [],
          colors: [],
          xAxis: [],
        },
        {
          countData: [],
          countNames: [],
          transData: [],
          transNames: [],
          colors: [],
          xAxis: [],
        },
      ]
    },

    // 產生日期(星期)列表
    generateDate(day) {
      const weekTW = ['日', '一', '二', '三', '四', '五', '六']
      const weekDay = weekTW[day.format('d')]
      return day.format('YYYY-MM-DD') + `(${weekDay})`
    },

    // 產生月份列表
    generateMonth(day) {
      return day.format('MM') + '月'
    },

    // 計算圖表的橫軸時間參數相關
    calculateOptions() {
      let k // 幾個節點
      let allDays // 時間範圍
      let timeRange // 真實的值 不format
      let countDays // 時間區間 月 週 天
      let xAxis // 橫軸節點名稱

      const getLastWeekValue = i => {
        const weekOfDay = parseInt(moment().format('E')) // 计算今天是这周第几天
        const last_monday = moment().subtract(weekOfDay + 7 * i - 1, 'days') // 周一日期
        const last_sunday = moment().subtract(weekOfDay + 7 * (i - 1), 'days') // 周日日期
        return [last_monday, last_sunday]
      }

      switch (this.conversionReq.time) {
        // 計算一個月有幾天
        // moment().subtract(index, 'month').startOf('month').daysInMonth()
        case 'one_week':
          allDays = 7
          break
        case 'one_month':
          allDays = moment()
            .startOf('month')
            .daysInMonth()
          break
        case 'three_month':
          allDays =
            moment()
              .subtract(2, 'month')
              .startOf('month')
              .daysInMonth() +
            moment()
              .subtract(1, 'month')
              .startOf('month')
              .daysInMonth() +
            moment()
              .subtract(0, 'month')
              .startOf('month')
              .daysInMonth()
          break
        case 'six_month':
          allDays =
            moment()
              .subtract(5, 'month')
              .startOf('month')
              .daysInMonth() +
            moment()
              .subtract(4, 'month')
              .startOf('month')
              .daysInMonth() +
            moment()
              .subtract(3, 'month')
              .startOf('month')
              .daysInMonth() +
            moment()
              .subtract(2, 'month')
              .startOf('month')
              .daysInMonth() +
            moment()
              .subtract(1, 'month')
              .startOf('month')
              .daysInMonth() +
            moment().daysInMonth()
          break
        default:
          allDays = 28
          break
      }

      switch (this.timeType) {
        case 'day':
          countDays = 1
          k = Math.round(allDays / countDays)
          xAxis = _.reverse(
            _.range(k).map(index => {
              return this.generateDate(moment().subtract('d', index))
            }),
          )
          break
        case 'week':
          countDays = 7
          k = Math.round(allDays / countDays)
          // xAxis = _.reverse(
          //   _.range(k).map(index => {
          //     return `${this.generateDate(moment().subtract('w', index).subtract('d', 7))} ~ ${this.generateDate(moment().subtract('w', index))}`
          //   }),
          // )
          xAxis = _.reverse(
            _.range(k).map(index => {
              const weekRange = getLastWeek(index)
              return `${weekRange[0]}(一) ~ ${weekRange[1]}(日)`
            }),
          )

          timeRange = [getLastWeekValue(k - 1)[0], getLastWeekValue(0)[1]]
          break
        case 'month':
          countDays = 28
          k = Math.round(allDays / countDays)
          xAxis = _.reverse(
            _.range(k).map(index => {
              return `${moment()
                .subtract(index, 'month')
                .startOf('month')
                .format('MM')}月`
            }),
          )
          break
        default:
          break
      }

      return {
        k,
        countDays,
        xAxis,
        timeRange,
      }
    },

    // 計算符合時間的條件的數量
    calculateList(list, key, k, countDays, timeKey, timeRange) {
      // this.calculateList(people, 'boy', k, countDays, 'first_use_time', [])
      // list: 資料
      // key: 鍵值(boy, girl, regist_boy, regist_girl, success_date ....)
      // k: k棒數量
      // countDays: 計算天數
      // timeKey: 計算的key
      // timeRange: [最前面的那一週的禮拜一, 本週的禮拜天]
      const weekOfDay = parseInt(moment().format('E')) // 计算今天是这周第几天
      // return [last_monday, last_sunday]
      // const weekRange = getLastWeek(index)
      // return `${weekRange[0]} ~ ${weekRange[1]}`
      const countList = []
      _.range(k).forEach(i => {
        const last_monday = moment().subtract(weekOfDay + 7 * i - 1 + 1, 'days') // 周一日期
        const last_sunday = moment().subtract(weekOfDay + 7 * (i - 1), 'days') // 周日日期

        // if (key === 'regist_girl') {
        //   console.log('last_monday', last_monday.format('YYYY-MM-DD'))
        //   console.log('last_sunday', last_sunday.format('YYYY-MM-DD'))
        // }
        const fit = list[key].filter(item => {
          return (
            moment(item[timeKey]).isBefore(
              this.timeType === 'week'
                ? last_sunday
                : moment().subtract(countDays * i, 'days'),
            ) &&
            moment(item[timeKey]).isAfter(
              this.timeType === 'week'
                ? last_monday
                : moment().subtract(countDays * (i + 1), 'days'),
            )
          )
        })
        // if (key == 'regist_girl') {
        //   console.log(key, fit)
        // }
        countList.push(fit.length)
      })
      return _.reverse(countList)
    },

    // 計算符合時間的條件的金額
    calculateMoneyList(list, key, k, countDays, timeKey) {
      const countList = []
      const weekOfDay = parseInt(moment().format('E')) // 计算今天是这周第几天
      _.range(k).forEach(i => {
        const fit = list[key].filter(item => {
          const last_monday = moment().subtract(
            weekOfDay + 7 * i - 1 + 1,
            'days',
          ) // 周一日期
          const last_sunday = moment().subtract(weekOfDay + 7 * (i - 1), 'days') // 周日日期
          return (
            moment(item[timeKey]).isBefore(
              this.timeType === 'week'
                ? last_sunday
                : moment().subtract(countDays * i, 'days'),
            ) &&
            moment(item[timeKey]).isAfter(
              this.timeType === 'week'
                ? last_monday
                : moment().subtract(countDays * (i + 1), 'days'),
            )
          )
        })
        countList.push(
          fit.reduce(function(acc, val) {
            return acc + val.money
          }, 0),
        )
      })

      // console.log(countList)
      return _.reverse(countList)
    },

    calculateTrans(fractionList, denominatorList) {
      return denominatorList.map((denominator, index) =>
        ((fractionList[index] / denominator) * 100).toFixed(2),
      )
    },

    // 轉換註冊相關資料
    transRegistTrend() {
      const people = this.conversionData.people
      const { k, countDays, xAxis, timeRange } = this.calculateOptions()
      const alls = this.calculateList(
        people,
        'all',
        k,
        countDays,
        'createdAt',
        timeRange,
      )
      const boys = this.calculateList(
        people,
        'boy',
        k,
        countDays,
        'first_use_time',
        timeRange,
      )
      const girls = this.calculateList(
        people,
        'girl',
        k,
        countDays,
        'first_use_time',
        timeRange,
      )

      const regist_alls = this.calculateList(
        people,
        'regist_all',
        k,
        countDays,
        'first_use_time',
        timeRange,
      )
      const regist_boys = this.calculateList(
        people,
        'regist_boy',
        k,
        countDays,
        'first_regist_time',
        timeRange,
      )
      const regist_girls = this.calculateList(
        people,
        'regist_girl',
        k,
        countDays,
        'first_regist_time',
        timeRange,
      )
      // 計算轉換率：註冊人數 / 使用人數
      const trans_boys = this.calculateTrans(regist_boys, boys)
      const trans_girls = this.calculateTrans(regist_girls, girls)
      this.lineChartData.people = [
        {
          countData: [alls, regist_alls, regist_boys, regist_girls, boys, girls],
          countNames: [
            '點擊開始使用人數',
            '選擇了性別人數',
            '男生註冊人數',
            '女生註冊人數',
            '男生使用人數',
            '女生使用人數',
          ],
          transData: [],
          transNames: [],
          xAxis,
          colors: ['#666', '#000', '#3888fa', '#FF005A', '#A2B6D2', '#E5A8BD'],
        },
        {
          countData: [],
          countNames: [],
          transData: [trans_boys, trans_girls],
          transNames: ['男生註冊轉換率', '女生註冊轉換率'],
          colors: ['#3888fa', '#FF005A'],
          xAxis,
        },
      ]
    },

    // 轉換約會相關資料
    transDateTrend() {
      const date = this.conversionData.date
      const { k, countDays, xAxis } = this.calculateOptions()
      const success = this.calculateList(
        date,
        'success',
        k,
        countDays,
        'updatedAt',
      )
      const progress = this.calculateList(
        date,
        'progress',
        k,
        countDays,
        'updatedAt',
      )
      const waiting = this.calculateList(
        date,
        'waiting',
        k,
        countDays,
        'updatedAt',
      )
      const fail = this.calculateList(date, 'fail', k, countDays, 'updatedAt')

      const total = this.calculateList(date, 'total', k, countDays, 'updatedAt')
      // console.log(success)
      // console.log(waiting)
      // console.log(progress)
      // console.log(fail)
      // console.log(total)

      // 計算轉換率：約會(成功/等待/進行/失敗) / 總約會
      const trans_success = this.calculateTrans(success, total)
      const trans_waiting = this.calculateTrans(waiting, total)
      const trans_progress = this.calculateTrans(progress, total)
      const trans_fail = this.calculateTrans(fail, total)
      this.lineChartData.date = [
        {
          countData: [success, waiting, progress, fail],
          countNames: ['成功約會數', '等待約會數', '進行約會數', '失敗約會數'],
          transData: [],
          transNames: [],
          xAxis,
          colors: ['#42f598', '#cf8b1f', '#2966a6', '#e62958'],
        },
        {
          countData: [],
          countNames: [],
          transData: [trans_success, trans_waiting, trans_progress, trans_fail],
          transNames: [
            '約會成功率',
            '約會等待比率',
            '約會進行中比率',
            '約會失敗率',
          ],
          colors: ['#42f598', '#cf8b1f', '#2966a6', '#e62958'],
          xAxis,
        },
      ]
    },

    // 轉換付費相關資料
    transPayTrend() {
      const pay = this.conversionData.pay
      const { k, countDays, xAxis, timeRange } = this.calculateOptions()
      const money = this.calculateMoneyList(
        pay,
        'money',
        k,
        countDays,
        'datetime',
      )
      const people = this.calculateList(
        pay,
        'people',
        k,
        countDays,
        'datetime',
        timeRange,
      )
      // console.log(money, people)
      // const total = this.calculateList(date, 'total', k, countDays, 'updatedAt')

      // 計算轉換率：約會(成功/進行/失敗) / 總約會
      // const trans_success = this.calculateTrans(success, total)
      // const trans_progress = this.calculateTrans(progress, total)
      // const trans_fail = this.calculateTrans(fail, total)
      this.lineChartData.pay = [
        {
          countData: [money, people],
          countNames: ['付款金額', '付款人數'],
          transData: [],
          transNames: [],
          colors: ['#EED367', '#A167EE'],
          xAxis,
        },
        {
          countData: [],
          countNames: [],
          transData: [],
          transNames: [],
          colors: [],
          xAxis,
          // transData: [trans_success, trans_progress, trans_fail],
          // transNames: ['約會成功率', '約會進行中比率', '約會失敗率'],
          // colors: ['#51E57B', '#ECC436', '#E72B2B'],
          // xAxis,
        },
      ]
    },

    // 轉換付費相關資料
    transVipTrend() {
      const vip = this.conversionData.vip
      const { k, countDays, xAxis, timeRange } = this.calculateOptions()
      const silver = this.calculateList(
        vip,
        'silver',
        k,
        countDays,
        'upgrade_time',
        timeRange,
      )

      const gold = this.calculateList(
        vip,
        'gold',
        k,
        countDays,
        'upgrade_time',
        timeRange,
      )
      // const total = this.calculateList(date, 'total', k, countDays, 'updatedAt')

      // 計算轉換率：約會(成功/進行/失敗) / 總約會
      // const trans_success = this.calculateTrans(success, total)
      // const trans_progress = this.calculateTrans(progress, total)
      // const trans_fail = this.calculateTrans(fail, total)
      this.lineChartData.vip = [
        {
          countData: [silver, gold],
          countNames: ['VIP白銀會員', 'VIP黃金會員'],
          transData: [],
          transNames: [],
          colors: ['#82A9AF', '#FCEC07'],
          xAxis,
        },
        {
          countData: [],
          countNames: [],
          transData: [],
          transNames: [],
          colors: [],
          xAxis,
          // transData: [trans_success, trans_progress, trans_fail],
          // transNames: ['約會成功率', '約會進行中比率', '約會失敗率'],
          // colors: ['#51E57B', '#ECC436', '#E72B2B'],
          // xAxis,
        },
      ]
    },
  },
}
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  position: relative;

  .github-corner {
    position: absolute;
    top: 0px;
    border: 0;
    right: 0;
  }

  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}

@media (max-width: 1024px) {
  .chart-wrapper {
    padding: 8px;
  }

  .dashboard-editor-container {
    padding: 8px;
  }
}
</style>
