<template>
	<view class="settle-container"> 
		<!-- left -->
		<view class="left-box">
			<label class="radio">
				<radio color="#c00000"  :checked="isFullCheck" @click="allStateChange" /><text>全选</text>
			</label>
		</view>
		<!-- center -->
		<view class="mid-box">
			<text class="txt1">合计:</text>
			<text class="txt2">￥{{totalPrice | tofixed}}</text>
		</view>
		<!-- right -->
		<view class="right-box">
			<button class="r-btn" @click="payment">结算({{ selectGoods }})</button>
		</view>
	</view>
</template>

<script>
	import car_mixins from "@/mixins/index.js"
	import { mapGetters,mapState,mapMutations } from "vuex"
	export default {
		name:"goods-settle",
		data() {
			return {
				seconds:3,
				timer:null
			};
		},
		mixins:[car_mixins],
		computed:{
			...mapGetters(["selectGoods","totalPrice",'isFullCheck']),
			...mapGetters("m_user",["joinAddress"]),
			...mapState("m_user",["token"]),
			...mapState(['cart']),
		},
		methods:{
			...mapMutations(["updateAllGoddsState"]),
			...mapMutations("m_user",["updateRedirectInfo"]),
			allStateChange(){
				this.updateAllGoddsState(!this.isFullCheck)
			},
			payment(){
				// 1. 先判断是否勾选了要结算的商品
				if(!this.selectGoods) return uni.$showMsg("请选择要结算的商品！")
				
				// 2. 再判断用户是否选择了收货地址
				if (!this.joinAddress) return uni.$showMsg('请选择收货地址！')
				
				 // 3. 最后判断用户是否登录了
				if (!this.token) return this.delayNavigate()
				// 4. 实现微信支付功能
				this.payOrder()
			},
			 async payOrder() {
			        // 1. 创建订单
			        // 1.1 组织订单的信息对象
			        const orderInfo = {
			          // order_price: this.checkedGoodsAmount,
			          order_price: 0.01,
			          consignee_addr: this.joinAddress,
			          goods: this.cart.filter(x => x.goods_state).map(x => ({
			            goods_id: x.goods_id,
			            goods_number: x.goods_count,
			            goods_price: x.goods_price
			          }))
			        }
			
			        // 1.2 发起请求创建订单
			        const { data: res } = await uni.$http.post('/api/public/v1/my/orders/create', orderInfo)
					
					console.log(res)
					
					if (res.meta.status !== 200) return uni.$showMsg('创建订单失败！')
			
			        // 1.3 得到服务器响应的“订单编号”
			        const orderNumber = res.message.order_number
			
			        // 2. 订单预支付
			        // 2.1 发起请求获取订单的支付信息
			        const { data: res2 } = await uni.$http.post('/api/public/v1/my/orders/req_unifiedorder', { order_number: orderNumber })
			        // 2.2 预付订单生成失败
			        if (res2.meta.status !== 200) return uni.$showMsg('预付订单生成失败！')
			        // 2.3 得到订单支付相关的必要参数
			        const payInfo = res2.message.pay
			
			        // 3. 发起微信支付
			        // 3.1 调用 uni.requestPayment() 发起微信支付
			        const [err, succ] = await uni.requestPayment(payInfo)
			        // 3.2 未完成支付
			        if (err) return uni.$showMsg('订单未支付！')
			        // 3.3 完成了支付，进一步查询支付的结果
			        const { data: res3 } = await uni.$http.post('/api/public/v1/my/orders/chkOrder', { order_number: orderNumber })
			        // 3.4 检测到订单未支付
			        if (res3.meta.status !== 200) return uni.$showMsg('订单未支付！')
			        // 3.5 检测到订单支付完成
			        uni.showToast({
			          title: '订单支付完成！',
			          icon: 'success'
			        })
			      },
			delayNavigate(){
				this.seconds = 3
				this.timer = setInterval(()=>{
					if( this.seconds <= 0){
						clearInterval(this.timer)						
						uni.switchTab({
							url:"/pages/my/my",
							success:()=>{
								this.updateRedirectInfo({
									from:"/pages/cart/cart",
									openType:"switchTab"
								})
							}
						})
						
						return
					}
					this.showTips(this.seconds)
					this.seconds--
				},1000)
			},
			showTips(s){
				uni.showToast({
					icon:"none",
					title: '请登录后再结算！' + s + ' 秒后自动跳转到登录页',
					// 为页面添加透明遮罩，防止点击穿透
					mask:true,
					duration: 1500,
				})
			}
		}
	}
</script>

<style lang="scss">
	.settle-container{
		font-size: 14px;
		width: 100%;
		height: 50px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		position: fixed;
		bottom: 0;
		left: 0;
		background-color: #fff;
		.right-box{
			height: 100%;
			.r-btn{
				line-height: 50px;
				background-color: #c00000;
				width: 100%;
				height: 100%;
				font-size: 14px;
				color:#FFFFFF;
			}
		}
	}
</style>
