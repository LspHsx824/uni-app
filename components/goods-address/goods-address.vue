<template>
	<view class="address-container">
		<view class="address-box" v-if="JSON.stringify(address) === '{}'">
			<button type="primary" size="mini" @click="chooseAddress" >请选择收货地址+</button>
		</view>
		
		 <!-- 渲染收货信息的盒子 -->
		    <view class="address-info-box" v-else @click="chooseAddress">
		      <view class="row1">
		        <view class="row1-left">
		          <view class="username">收货人：{{address.userName}}</view>
		        </view>
		        <view class="row1-right">
		          <view class="phone">电话：{{address.telNumber}}</view>
		          <uni-icons type="arrowright" size="16"></uni-icons>
		        </view>
		      </view>
		      <view class="row2">
		        <view class="row2-left">收货地址：</view>
		        <view class="row2-right">{{joinAddress}}</view>
		      </view>
		    </view>
		
		<image src="@/static/cart_border@2x.png" class="address-img"></image>
	</view>
</template>

<script>
	// 1. 按需导入 mapState 和 mapMutations 这两个辅助函数
	import { mapState, mapGetters,mapMutations, } from 'vuex'
	export default {
		name:"goods-address",
		data() {
			return {
				// address: {}
			};
		},
		computed:{
			...mapState("m_user",["address"]),
			...mapGetters("m_user",["joinAddress"])
		},
		methods:{
				  ...mapMutations('m_user',['updateAddress']),	
			async chooseAddress(){
				 const [err,succ]  =  await uni.chooseAddress().catch(err => err)
				  // 2. 用户成功的选择了收货地址
				     if (err === null && succ.errMsg === 'chooseAddress:ok') {
				       // 为 data 里面的收货地址对象赋值
				       this.updateAddress(succ)
				     }
			}
		}
	}
</script>

<style lang="scss">
	.address-container{
		.address-box{
			display: flex;
			justify-content: center;
			align-items: center;
			height: 90px;
		}
		.address-img{
			width: 100%;
			height:5px;
		}
		.address-info-box {
		    font-size: 12px;
		    height: 90px;
		    display: flex;
		    flex-direction: column;
		    justify-content: center;
		    padding: 0 5px;
		
		    .row1 {
		      display: flex;
		      justify-content: space-between;
		
		      .row1-right {
		        display: flex;
		        justify-content: space-between;
		        align-items: center;
		      }
		    }
		
		    .row2 {
		      display: flex;
		      align-items: center;
		      margin-top: 10px;
		
		      .row2-left {
		        white-space: nowrap;
		      }
		    }
		  }
	}
</style>
