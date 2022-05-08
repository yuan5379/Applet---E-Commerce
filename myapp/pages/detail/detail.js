import CheckAuth from "../../util/auth"
import request from "../../util/requests"

// pages/detail/detail.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        info: null,
        commentlist: [],
        current: 0
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        wx.setNavigationBarTitle({
            title: options.name,
        })
        this.getDatailInfo(options.id)
        this.getCommentInfo()
    },
    getDatailInfo(id) {
        request({
            url: `/goods/${id}`
        }).then(res => {
            this.setData({
                info: res
            })
        })
    },
    getCommentInfo() {
        request({
            url: `/comments`
        }).then(res => {
            this.setData({
                commentlist: res
            })
        })
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

    },
    handleTop(evt) {
        wx.previewImage({
            current: evt.currentTarget.dataset.current, // 当前显示图片的http链接
            urls: this.data.info.slides.map(item => `http:localhost:5002${item}`) // 需要预览的图片http链接列表
        })
    },
    handleActive(evt) {
        this.setData({
            current: evt.currentTarget.dataset.index
        })
    },
    handleAdd() {
        /**
         * 判断本地存储是否有手机号信息，如果有直接加入
         * 没有手机号，判断有没有 token信息，如果有，引导调整手机号绑定
         * 没有 token 信息，引导用户授权页面
         */
        CheckAuth(() => {
            let {
                nickName
            } = wx.getStorageSync('token')
            let tel = wx.getStorageSync('tel')
            var goodId = this.data.info.id
            request({
                url: `/carts`,
                data: {
                    tel,
                    goodId,
                    nickName
                }
            }).then(res => {
                if (res.length === 0) {
                    return request({
                        url: "/carts",
                        method: "post",
                        data: {
                            "username": nickName,
                            "tel": tel,
                            "goodId": goodId,
                            "number": 1,
                            "checked": false,
                        }
                    })
                } else {
                    return request({
                        url: `/carts/${res[0].id}`,
                        method: "put",
                        data: {
                           ...res[0],
                           number:res[0].number+1
                        }
                    })
                }
            }).then(res => {
                wx.showToast({
                  title: '加入购物车成功',
                })
            })
        })
    },
    handleTap () {
        wx.switchTab({
          url: '/pages/shopcar/shopcar',
        })
    }
})