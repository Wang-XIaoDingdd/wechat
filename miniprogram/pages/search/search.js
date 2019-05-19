const app = getApp()
var text = ""
var searchScore=0
var searchName=""
var choice =[0,0,0]


Page({
    data: {
        inputShowed: false,
        inputVal: "",
        input_score:"123",
        counterId:"",
        id:"",
        arr:[],
        searchcomplete:"",
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
      // var index1 = multiArray[0][multiIndex[0]];
      // var index2 = multiArray[1][multiIndex[1]];
      // var index3 = multiArray[2][multiIndex[2]];
      console.log(searchName)
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
        multiIndex: e.detail.value  //e.detial.value返回每个选择的下标：3位的数组
      })
    },
    
  bindMultiPickerColumnChange: function (e) {
    console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
    var data = {
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex
    };
    console.log('multiarray:',this.data.multiArray,'multiindex',this.data.multiIndex);
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
    choice = [this.data.multiIndex[0],this.data.multiIndex[1],this.data.multiIndex[2]],
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