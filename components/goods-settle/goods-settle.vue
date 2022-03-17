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
			<button class="r-btn">结算({{ selectGoods }})</button>
		</view>
	</view>
</template>

<script>
	import car_mixins from "@/mixins/index.js"
	import { mapGetters,mapMutations } from "vuex"
	export default {
		name:"goods-settle",
		data() {
			return {
				
			};
		},
		mixins:[car_mixins],
		computed:{
			...mapGetters(["selectGoods","totalPrice",'isFullCheck'])
		},
		methods:{
			...mapMutations(["updateAllGoddsState"]),
			allStateChange(){
				this.updateAllGoddsState(!this.isFullCheck)
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
