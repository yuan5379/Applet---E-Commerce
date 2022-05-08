function CheckAuth(callback) {
    // 有手机号
   if (wx.getStorageSync('tel')) {
        callback()
   } else {
       // 如果没有 token
       if (wx.getStorageSync('token')) {
           wx.navigateTo({
             url: '/pages/telform/telform',
           })
       } else {
           // 什么都没有，跳转授权
           wx.navigateTo({
             url: '/pages/auth/auth',
           })
       }
   }
}
export default CheckAuth