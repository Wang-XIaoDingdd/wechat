var index1 = "必修课"
var index2 = "公共基础课"
var index3 = "计算机学院"
//每列的第一个上传数据库时赋初始值
var choice = [0, 0, 0]
Page({
  /**
   * 页面的初始数据
   */
  data: {
    multiArray: [['必修课', '选修课'], ['公共基础课', '专业基础课', '大类基础课', '专业课'], ['全部']],
    objectMultiArray: [
      [
        {
          id: 0,
          name: '必修课'
        },
        {
          id: 1,
          name: '选修课'
        }
      ], [
        {
          id: 0,
          name: '公共基础课'
        },
        {
          id: 1,
          name: '专业基础课'
        },
        {
          id: 2,
          name: '大类基础课'
        },
        {
          id: 3,
          name: '专业课'
        }
      ], [
        {
          id: 0,
          name: '全部'
        }
      ]
    ],
    multiIndex: [0, 0, 0],
    //这里data中的数据是给出一个初值！！
  },
  
  formsubmit: function (e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    var info = e.detail.value;
    const db = wx.cloud.database()      //建立引用
    console.log('fmultichoice!!', e.detail.value.MultiPicker)
    // var index1 = multiArray[0][multiIndex[0]];
    // var index2 = multiArray[1][multiIndex[1]];
    // var index3 = multiArray[2][multiIndex[2]];
    db.collection('record').add({     //使用collection
      data: {
        classname: e.detail.value.classname,
        evaluation: e.detail.value.evaluation,
        score: e.detail.value.slider,
        choice: choice,
        col1: index1,
        col2: index2,
        col3: index3,
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
        console.log('[数据库] [新增记录] 成功，记录 _id: ', res._id, input_score)
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

  formreset: function () {
    console.log('form发生了reset事件')
  },

  bindMultiPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      multiIndex: e.detail.value  //e.detial.value返回每个选择的下标：3位的数组
    })
  },

  bindMultiPickerColumnChange: function (e) {
    console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
    var data = {
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex
    };
    console.log('multiarray:', this.data.multiArray, 'multiindex', this.data.multiIndex);
    data.multiIndex[e.detail.column] = e.detail.value;
    switch (e.detail.column) {
      case 0://修改第一列
        switch (data.multiIndex[0]) {
          case 0://第一列的下标为0
            data.multiArray[1] = ['公共基础课', '专业基础课', '大类基础课', '专业课'];
            data.multiArray[2] = ['全部'];
            break;
          case 1:
            data.multiArray[1] = ['通识课', '体育课', '实践课'];
            data.multiArray[2] = ['全部'];
            break;
        }
        data.multiIndex[1] = 0;
        data.multiIndex[2] = 0;
        break;
      case 1://修改第二列
        switch (data.multiIndex[0]) {
          case 0://第一列下标为0时
            switch (data.multiIndex[1]) {
              case 0:
                data.multiArray[2] = ['全部'];
                break;
              case 1:
                data.multiArray[2] = ['全部'];
                break;
              case 2:
                data.multiArray[2] = ['全部'];
                break;
              case 3:
                data.multiArray[2] = ['全部'];
                break;
            }
            break;
          case 1://第一列的下标为1
            switch (data.multiIndex[1]) {
              case 0://第二列的下标为0时
                data.multiArray[2] = ['全部'];
                break;
              case 1:
                data.multiArray[2] = ['全部'];
                break;
              case 2:
                data.multiArray[2] = ['科技实践', '艺术实践', '文化实践'];
                break;
            }
            break;
        }

        data.multiIndex[2] = 0;
        console.log(data.multiIndex);
        break;
    }
      index1 = this.data.multiArray[0][this.data.multiIndex[0]],
      index2 = this.data.multiArray[1][this.data.multiIndex[1]],
      index3 = this.data.multiArray[2][this.data.multiIndex[2]],
      choice = [this.data.multiIndex[0], this.data.multiIndex[1], this.data.multiIndex[2]],
      this.setData(data);
  },

  add: function (e) {

    const db = wx.cloud.database()      //建立引用
    console.log("显示一下：", text)


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
        console.log('[数据库] [新增记录] 成功，记录 _id: ', res._id, input_score)
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

  find: function () {
    const db = wx.cloud.database()
    // 查询当前用户所有的 counters
    search = e.detail.value;
    db.collection('record').where({
      _openid: this.data.openid,
      score: search,
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