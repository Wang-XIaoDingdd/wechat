Page({

  /**
   * 页面的初始数据
   */
  data: {
    'pre_choice': ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var choice = wx.getStorageSync('choice');
    this.setData({
      'pre_choice' : choice
    });
      const db = wx.cloud.database();      //建立引用
      db.collection('record').where({
        _openid: this.data.openid,
        // classname:searchName,
        choice:choice,
      }).get({
        success: res => {
          this.setData({
            queryResult: JSON.stringify(res.data, null, 2),
            arr:res.data,
          })
          console.log('arr：：', arr)
          console.log('[数据库] [查询记录] 成功: ', res)
        },
        fail: err => {
          wx.showToast({
            icon: 'none',
            title: '查询记录失败'
          })
          console.error('[数据库] [查询记录] 失败：', err)
        }
      })
      this.setData({
        searchcomplete: "已经查询完毕所有内容！"});
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})