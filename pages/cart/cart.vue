<template>
	<view class="cart-container" v-if="cart.length !== 0 ">
		<!-- 收货地址栏 -->
		<goods-address></goods-address>
		
		<!-- 购物车标题 -->
		<view class="cart-title">
			<uni-icons type="shop" size="18"></uni-icons>
			<text class="cart-title-text">购物车</text>
		</view>
		
		<!-- 购物车商品 -->
		<uni-swipe-action>
			<block v-for="(goods,i) in cart" :key="i">
				<uni-swipe-action-item :right-options="options" @click="handlerDelete(goods)">
					<goods-item :goods="goods"
								:show-radio="true"
								:show-count="true"
								@radio-change="stateChange" 
								@num-change="numChange"></goods-item>
				</uni-swipe-action-item>
			</block>
		</uni-swipe-action>
		
		<!-- 商品结算 -->
		<goods-settle></goods-settle>
	</view>
	<!-- 空白购物车区域 -->
	  <view class="empty-cart" v-else>
		<image src="/static/cart_empty@2x.png" class="empty-img"></image>
		<text class="tip-text">空空如也~</text>
	  </view>
</template>

<script>
	import cat_mixins from "@/mixins/index.js"
	import {mapState,mapMutations} from "vuex"
	
	export default {
		data() {
			return {
				options:[
					{
						text:"删除",
						style:{
							   backgroundColor: '#c00000'
						}
					}
				]
			};
		},
		mixins:[cat_mixins],
		computed:{
			...mapState(["cart"])
		},
		methods:{
			...mapMutations(["updateState","updateNum","removeGoodsById"]),
			stateChange(item){
				this.updateState(item)
			},
			numChange(item){
				this.updateNum(item)
			},
			handlerDelete(item){
				this.removeGoodsById(item)
			}
		}
		
	}
</script>

<style lang="scss">
	.cart-container{
		padding-bottom: 50px;
		.cart-title {
		  height: 40px;
		  display: flex;
		  align-items: center;
		  font-size: 14px;
		  padding-left: 5px;
		  border-bottom: 1px solid #efefef;
		  .cart-title-text {
			margin-left: 10px;
		  }
		}
	}
	.empty-cart {
	  display: flex;
	  flex-direction: column;
	  align-items: center;
	  padding-top: 150px;
	
	  .empty-img {
	    width: 90px;
	    height: 90px;
	  }
	
	  .tip-text {
	    font-size: 12px;
	    color: gray;
	    margin-top: 15px;
	  }
	}
</style>
