import CheckAuth from "../../util/auth"
import request from "../../util/requests";

// pages/shopcar/shopcar.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        slideButtons: [{
            type: "warn",
            text: "删除"
        }],
        cartList: []
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
        CheckAuth(() => {
            let {
                nickName
            } = wx.getStorageSync('token')
            let tel = wx.getStorageSync('tel')
            request({
                url: `/carts?_expand=good&username=${nickName}&tel=${tel}`
            }).then(res => {
                this.setData({
                    cartList: res
                })
            })
        })
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

    },
    slideButtontap(e) {
        let id = e.currentTarget.dataset.id
        this.setData({
            cartList : this.data.cartList.filter(item => item.id !== id)
        })
        request({
            url: `/carts/${id}`,
            method: "delete"
        })
    },
    handleTap(e) {
        var item = e.currentTarget.dataset.item
        item.checked = !item.checked
        this.handleUpdate(item)
    },
    handleUpdate(item) {
        this.setData({
            cartList: this.data.cartList.map(data => {
                if (data.id === item.id) {
                    return item
                } else {
                    return data
                }
            })
        })
        request({
            url: `/carts/${item.id}`,
            method: "put",
            data: {
                "username": item.username,
                "tel": item.tel,
                "goodId": item.goodId,
                "number": item.number,
                "checked": item.checked,
            }
        })
    },
    handlejian (e) {
        var item = e.currentTarget.dataset.item
        if (item.number === 1) return
        item.number--
        this.handleUpdate(item)
    },
    handlejia (e) {
        var item = e.currentTarget.dataset.item
        item.number++
        this.handleUpdate(item)
    },
    handchange(e) {
       if (e.detail.value.length === 0) {
           // 未全选
           this.setData({
               cartList : this.data.cartList.map(item => ({
                    ...item,
                    checked:false
               }))
           })
          
       } else {
           // 全选
           this.setData({
            cartList : this.data.cartList.map(item => ({
                 ...item,
                 checked:true
            }))
        })
       }
    }
})