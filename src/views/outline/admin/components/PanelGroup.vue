<template>
  <el-row :gutter="40" class="panel-group">
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('people')">
        <div class="card-panel-icon-wrapper icon-people">
          <svg-icon icon-class="peoples" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">總人數(註冊完成/開始使用)</div>
          <div>
            男生：
            <count-to
              :start-val="0"
              :end-val="totalPeople.boy.regist"
              :duration="1500"
              class="card-panel-num"
            />/
            <count-to
              :start-val="0"
              :end-val="totalPeople.boy.use"
              :duration="1500"
              class="card-panel-num"
            />
          </div>
          <div>
            女生：
            <count-to
              :start-val="0"
              :end-val="totalPeople.girl.regist"
              :duration="1500"
              class="card-panel-num"
            />/
            <count-to
              :start-val="0"
              :end-val="totalPeople.girl.use"
              :duration="1500"
              class="card-panel-num"
            />
          </div>
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('date')">
        <div class="card-panel-icon-wrapper icon-message">
          <svg-icon icon-class="guide" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">約會(成功/進行中/失敗)</div>
          <count-to
            :start-val="0"
            :end-val="totalDate.success"
            :duration="1500"
            class="card-panel-num"
          />/
          <count-to
            :start-val="0"
            :end-val="totalDate.progress"
            :duration="1500"
            class="card-panel-num"
          />/
          <count-to
            :start-val="0"
            :end-val="totalDate.fail"
            :duration="1500"
            class="card-panel-num"
          />
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('pay')">
        <div class="card-panel-icon-wrapper icon-money">
          <svg-icon icon-class="money" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">付費(人數/金額)</div>
          <count-to
            :start-val="0"
            :end-val="totalPay.people"
            :duration="1500"
            class="card-panel-num"
          />/
          <count-to
            :start-val="0"
            :end-val="totalPay.money"
            :duration="1500"
            class="card-panel-num"
          />
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('vip')">
        <div class="card-panel-icon-wrapper icon-people">
          <svg-icon icon-class="people" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">付費會員數(白銀/黃金)</div>
          <count-to
            :start-val="0"
            :end-val="totalVIP.silver"
            :duration="1500"
            class="card-panel-num"
          />/
          <count-to
            :start-val="0"
            :end-val="totalVIP.gold"
            :duration="1500"
            class="card-panel-num"
          />
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import CountTo from 'vue-count-to'

export default {
  components: {
    CountTo
  },
  props: {
    totalPeople: {
      type: Object,
      default: () => ({
        boy: {
          use: 0, // 開始使用
          regist: 0 // 註冊完成
        },
        girl: {
          use: 0, // 開始使用
          regist: 0 // 註冊完成
        }
      })
    },
    totalDate: {
      type: Object,
      default: () => ({
        success: 0, // 成功
        progress: 0, // 進行中
        fail: 0 // 失敗
      })
    },
    totalPay: {
      type: Object,
      default: () => ({
        people: 0, // 成功
        money: 0 // 失敗
      })
    },
    totalVIP: {
      type: Object,
      default: () => ({
        silver: 0, // VIP 白銀
        gold: 0 // VIP 黃金
      })
    }
  },
  methods: {
    handleSetLineChartData(type) {
      this.$emit('handleSetLineChartData', type)
    }
  }
}
</script>

<style lang="scss" scoped>
.panel-group {
  margin-top: 18px;

  .card-panel-col {
    margin-bottom: 32px;
  }

  .card-panel {
    height: 108px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.05);
    border-color: rgba(0, 0, 0, 0.05);

    &:hover {
      .card-panel-icon-wrapper {
        color: #fff;
      }

      .icon-people {
        background: #40c9c6;
      }

      .icon-message {
        background: #36a3f7;
      }

      .icon-money {
        background: #f4516c;
      }

      .icon-shopping {
        background: #34bfa3;
      }
    }

    .icon-people {
      color: #40c9c6;
    }

    .icon-message {
      color: #36a3f7;
    }

    .icon-money {
      color: #f4516c;
    }

    .icon-shopping {
      color: #34bfa3;
    }

    .card-panel-icon-wrapper {
      float: left;
      margin: 14px 0 0 0px;
      padding: 16px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
      width: 35%;
    }

    .card-panel-icon {
      float: left;
      font-size: 48px;
    }

    .card-panel-description {
      float: right;
      font-weight: bold;
      margin: 20px 0;
      width: 65%;

      .card-panel-text {
        line-height: 18px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 16px;
        margin-bottom: 12px;
      }

      .card-panel-num {
        font-size: 20px;
      }
    }
  }
}

@media (max-width: 550px) {
  .card-panel-description {
    display: none;
  }

  .card-panel-icon-wrapper {
    float: none !important;
    width: 100%;
    height: 100%;
    margin: 0 !important;

    .svg-icon {
      display: block;
      margin: 14px auto !important;
      float: none !important;
    }
  }
}
</style>
