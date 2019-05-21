// pages/result/result.js
// var pre_choice = wx.getStorageSync('choice')
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
    // pre_choice = wx.getStorageSync('choice')
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