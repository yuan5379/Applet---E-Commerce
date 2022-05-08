function request(params,isHeader=false) {
  // 显示 loading
  wx.showLoading({
    title: '正在加载中',
  })
    return new Promise((resolve,reject) => {
      wx.request({
        ...params,
        url:'http://localhost:5002'+params.url,
        success:(res) => {
          if(isHeader){
            resolve({
              list: res.data,
              total:res.header["X-Total-Count"]
            })
          } else {
            resolve(res.data)
          }
        },
        fail:(err) => {
          reject(err)
        },
        complete:() => {
           // 隐藏 loading
           wx.hideLoading()
        }
      })
  })
  }
  
  export default request