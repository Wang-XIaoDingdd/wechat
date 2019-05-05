const app = getApp()
var text = ""
var searchScore=0
var searchName=""
// var classes = [
//       {name:'西方电影叙事入门'},
//       {name:'西方哲学'},
//       {name:'微信小程序设计与制作'},
//       {name:'吉他入门'},
//       {name:'日语二外'},
//       {name:'网球'}
//     ];

Page({
    data: {
        inputShowed: false,
        inputVal: "",
        input_score:"123",
        counterId:"",
        id:"",
        arr:[],
        searchcomplete:"",
        multiArray: [['无脊柱动物', '脊柱动物'], ['扁性动物', '线形动物', '环节动物', '软体动物', '节肢动物'], ['猪肉绦虫', '吸血虫']],
        objectMultiArray: [
      [
        {
          id: 0,
          name: '无脊柱动物'
        },
        {
          id: 1,
          name: '脊柱动物'
        }
      ], [
        {
          id: 0,
          name: '扁性动物'
        },
        {
          id: 1,
          name: '线形动物'
        },
        {
          id: 2,
          name: '环节动物'
        },
        {
          id: 3,
          name: '软体动物'
        },
        {
          id: 3,
          name: '节肢动物'
        }
      ], [
        {
          id: 0,
          name: '猪肉绦虫'
        },
        {
          id: 1,
          name: '吸血虫'
        }
      ]
    ],
        multiIndex: [0, 0, 0],
    },
    bindKeyInput(e) {
      this.setData({
        inputValue: e.detail.value
      })
    },
    formsubmit: function (e) {
      console.log('form发生了submit事件，携带数据为：', e.detail.value)
      console.log(e.detail.value.input)
      const db = wx.cloud.database();      //建立引用
      searchName = e.detail.value.input;
      console.log(searchName)
      db.collection('record').where({
        _openid: this.data.openid,
        classname:searchName,
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
      this.setData({
        searchcomplete: "已经查询完毕所有内容！"});
    },
  
    formreset: function () {
      console.log('form发生了reset事件')
      this.setData({
        searchcomplete: "",
        arr:[],
      });
    },

    bindMultiPickerChange: function (e) {
      console.log('picker发送选择改变，携带值为', e.detail.value)
      this.setData({
        multiIndex: e.detail.value
      })
    },
    
  bindMultiPickerColumnChange: function (e) {
    console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
    var data = {
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex
    };
    data.multiIndex[e.detail.column] = e.detail.value;
    switch (e.detail.column) {
      case 0:
        switch (data.multiIndex[0]) {
          case 0:
            data.multiArray[1] = ['扁性动物', '线形动物', '环节动物', '软体动物', '节肢动物'];
            data.multiArray[2] = ['猪肉绦虫', '吸血虫'];
            break;
          case 1:
            data.multiArray[1] = ['鱼', '两栖动物', '爬行动物'];
            data.multiArray[2] = ['鲫鱼', '带鱼'];
            break;
        }
        data.multiIndex[1] = 0;
        data.multiIndex[2] = 0;
        break;
      case 1:
        switch (data.multiIndex[0]) {
          case 0:
            switch (data.multiIndex[1]) {
              case 0:
                data.multiArray[2] = ['猪肉绦虫', '吸血虫'];
                break;
              case 1:
                data.multiArray[2] = ['蛔虫'];
                break;
              case 2:
                data.multiArray[2] = ['蚂蚁', '蚂蟥'];
                break;
              case 3:
                data.multiArray[2] = ['河蚌', '蜗牛', '蛞蝓'];
                break;
              case 4:
                data.multiArray[2] = ['昆虫', '甲壳动物', '蛛形动物', '多足动物'];
                break;
            }
            break;
          case 1:
            switch (data.multiIndex[1]) {
              case 0:
                data.multiArray[2] = ['鲫鱼', '带鱼'];
                break;
              case 1:
                data.multiArray[2] = ['青蛙', '娃娃鱼'];
                break;
              case 2:
                data.multiArray[2] = ['蜥蜴', '龟', '壁虎'];
                break;
            }
            break;
        }
        data.multiIndex[2] = 0;
        console.log(data.multiIndex);
        break;
    }
    this.setData(data);
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