const app = getApp()

Page({
    data: {
        inputShowed: false,
        inputVal: "",
        input_score:"",
        counterId:"",
        id:"",
        add:null,
    },
    add: function (e) {
        var that = this;
        const db = wx.cloud.database()      //建立引用
        var id = e.target.dataset.id;
        //console.log(content);
        this.setData({
            input_score: e.detail.value
          })
        db.collection('grade').add({     //使用collection
          data: {
            count: 1,
            txt: input_score,
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
    showInput: function () {
        this.setData({
            inputShowed: true
        });
    },
    hideInput: function () {
        this.setData({
            inputVal: "",
            inputShowed: false
        });
    },
    clearInput: function () {
        this.setData({
            inputVal: ""
        });
    },
    inputTyping: function (e) {
        this.setData({
            inputVal: e.detail.value
        });
    }
});