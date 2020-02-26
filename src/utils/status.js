export default {
  // 1 可審核 - 代表資料填寫齊全，可以審核了 (可審核才會出現在後台列表)
  // 2 等待配對 - 代表審核通過了，尚無約會
  // 3 等待約會媒合 - 女生：已選擇了約會時段及電影或正在考慮中，男生選了約會時段還沒確定
  // 4 已配對連線
  // 5 被 ban - 代表黑名單
  userStatusList: [
    {
      value: '0',
      text: '尚未註冊'
    },
    {
      value: '00',
      text: '註冊未完成'
    },
    {
      value: '01',
      text: '註冊未完成'
    },
    {
      value: '02',
      text: '註冊未完成'
    },
    {
      value: '03',
      text: '註冊未完成'
    },
    {
      value: '04',
      text: '註冊未完成'
    },
    {
      value: '041',
      text: '註冊未完成(選擇特質))'
    },
    {
      value: '042',
      text: '註冊未完成(選擇興趣))'
    },
    {
      value: '043',
      text: '註冊未完成(選擇職業))'
    },
    {
      value: '05',
      text: '註冊未完成'
    },
    {
      value: '06',
      text: '註冊未完成'
    },
    {
      value: '07',
      text: '註冊未完成'
    },
    {
      value: '08',
      text: '註冊未完成'
    },
    {
      value: '091',
      text: '照片更換中'
    },
    {
      value: '099',
      text: '已註冊，驗證未通過(照片不符規範)，已通知'
    },
    {
      value: '1',
      text: '已註冊，尚未驗證通過'
    },
    {
      value: '10',
      text: '已註冊，驗證未通過(照片不符規範)'
    },
    {
      value: '11',
      text: '已註冊，驗證通過，尚未推播'
    },
    {
      value: '2',
      text: '驗證通過，已推播，可配對'
    },
    {
      value: '3',
      text: '約會媒合中'
    },
    {
      value: '4',
      text: '約會配對成功'
    },
    {
      value: '41',
      text: '評價約會對象中'
    },
    {
      value: '42',
      text: '評價約會對象中'
    },
    {
      value: '43',
      text: '評價約會對象中'
    },
    {
      value: '5',
      text: '目前黑名單'
    }
  ],
  dateProductStatusList: [
    {
      value: '000',
      text: '剛創建(無性別)'
    },
    {
      value: '00',
      text: '剛創建(有性別)'
    },
    {
      value: '001',
      text: '女生正在填資料'
    },
    {
      value: '01',
      text: '女生選好等待男生選擇'
    },
    { value: '02', text: '等待女生確認' },
    { value: '11', text: '已媒合開啟雙方對話' },
    { value: '111', text: '開始敲定約會細節，準備敲定電影院' },
    { value: '112', text: '已敲定電影院，準備敲定時間' },
    { value: '113', text: '等待對方確認細節' },
    { value: '12', text: '已敲定約會細節' },
    { value: '13', text: '約會當天開啟對話' },
    { value: '14', text: '約會結束可評價本次約會 ' },
    { value: '15', text: '約會完全結束(有人評價完)' },
    { value: '16', text: '約會完全結束(兩人評價完)' },
    { value: '20', text: '女生拒絕邀約的次數用完，結束約會' },
    { value: '21', text: '女生拒絕' },
    { value: '22', text: '男方沒回應(過24小時)' },
    { value: '23', text: '女方沒回應(過24小時)' },
    { value: '24', text: '男方取消本次約會' },
    { value: '25', text: '女方取消本次約會(之前的數據跟女生拒絕約會混在一起了)' },
    { value: '26', text: '男方爽約' },
    { value: '27', text: '女方爽約' },
    { value: '28', text: '約會過期下架' },
    { value: '29', text: '沒配對到主動取消約會' },
    { value: '30', text: '發現違規行為' }
  ],
  // 檢舉狀況回報
  questionList: [
    {
      value: '1',
      text: '見面前索要或提供聯絡方式'
    },
    {
      value: '2',
      text: '對方放鳥或當天取消'
    },
  ],
  face: [
    {
      value: '0',
      text: '照片不符規範'
    }
  ]
}
