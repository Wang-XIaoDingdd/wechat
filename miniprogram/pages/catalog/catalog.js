// pages/catalog/catalog.js
var searchScore=""
var searchName=""
Page({
  /**
   * 页面的初始数据
   */
  data: {
    arr:[],
  },
  //一系列按钮跳转
  jumpPage1:function(){  
    wx.navigateTo({
      url:'/pages/public-optional/public-optional',
    })
  },
  jumpPage2:function(){  
    wx.navigateTo({
      url:'/pages/english/english',
    })
  },
  jumpPage3:function(){  
    wx.navigateTo({
      url:'/pages/tech-prac/tech-prac',
    })
  },
  jumpPage4:function(){  
    wx.navigateTo({
      url:'/pages/art-prac/art-prac',
    })
  },
  jumpPage5:function(){  
    wx.navigateTo({
      url:'/pages/ltera-prac/ltera-prac',
    })
  },
  jumpPage6:function(){  
    wx.navigateTo({
      url:'/pages/PE/PE',
    })
  },

//输入框
  bindKeyInput(e) {
    this.setData({
      inputValue: e.detail.value
    })
  },

  formsubmit: function (e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    console.log(e.detail.value.input, e.detail.value.slider)
    var info = e.detail.value;
    const db = wx.cloud.database();      //建立引用
    searchScore = e.detail.value.slider;
    searchName = e.detail.value.input;
    console.log(searchName)
    db.collection('record').where({
      _openid: this.data.openid,
      name:searchName,
      score:searchScore,
    }).get({
      success: res => {
        this.setData({
          queryResult: JSON.stringify(res.data, null, 2),
          arr:res.data,

        })
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
    
  },

  formreset: function () {
    console.log('form发生了reset事件')
  },
  add:function(e){

    const db = wx.cloud.database()      //建立引用
    console.log("显示一下：",text)


    db.collection('grade').add({     //使用collection
      data: {
        count: 1,
        evaluation: text
        ,
      },

      success: res => {
        // 在返回结果中会包含新创建的记录的 _id
        this.setData({
          counterId: res._id,
          count: 1
        })
        wx.showToast({
          title: '新增记录成功',
        })
        console.log('[数据库] [新增记录] 成功，记录 _id: ', res._id,input_score)
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '新增记录失败'
        })
        console.error('[数据库] [新增记录] 失败：', err)
      }
    })
  },
  find: function() {
    const db = wx.cloud.database()
    // 查询当前用户所有的 counters
    search = e.detail.value;
    db.collection('record').where({
      _openid: this.data.openid,
      score:search,
    }).get({
      success: res => {
        this.setData({
          queryResult: JSON.stringify(res.data, null, 2)
        })
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