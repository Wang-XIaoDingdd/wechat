const app = getApp()
var test = ""
Page({
    data: {
        inputShowed: false,
        inputVal: "",
        input_score:"123",
        counterId:"",
        id:"",
    },
    input: function(e)
    {
        this.setData({
          input_score: e.detail.value
        })
        test = e.detail.value;
        console.log("显示一下：",test)
    },
    addtest:function(e){
        
      const db = wx.cloud.database()      //建立引用

      console.log("显示一下：",test)


      db.collection('grade').add({     //使用collection
        data: {
          count: 1,
          txt: test,
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
    add: function (e) {
        
        const db = wx.cloud.database()      //建立引用
        var id = e.target.dataset.id;

        test = e.detail.value;
        console.log("显示一下：",test)


        db.collection('grade').add({     //使用collection
          data: {
            count: 1,
            txt: test,
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