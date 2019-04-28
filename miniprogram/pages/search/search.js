const app = getApp()
var text = ""
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
        text
         = e.detail.value;
        console.log("显示一下：",text
        )
    },
    formsubmit: function (e) {
      console.log('form发生了submit事件，携带数据为：', e.detail.value)
      console.log(e.detail.value.radiogroup,e.detail.value.slider)
      var info = e.detail.value;
      const db = wx.cloud.database()      //建立引用
      db.collection('record').add({     //使用collection
        data: {
          count: 1,
          evaluation: e.detail.value.radiogroup,
          score:e.detail.value.slider,
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
    
    delete: function() {
      if (this.data._openid) {
        const db = wx.cloud.database()
        db.collection('grade').doc(this.data._id).remove({
          success: res => {
            wx.showToast({
              title: '删除成功',
            })
            this.setData({
              _id: '',
              count: null,
              txt:null
            })
          },
          fail: err => {
            wx.showToast({
              icon: 'none',
              title: '删除失败',
            })
            console.error('[数据库] [删除记录] 失败：', err)
          }
        })
      } else {
        wx.showToast({
          title: '无记录可删，请见创建一个记录',
        })
      }
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