<template>
	<view class="search-container"  @click="searchGoods" >
		<view class="my-search-box" >
			<uni-icons type="search" sizi="17"></uni-icons>
			<text class="placeholder">搜索</text>
		</view>
	</view>
</template>

<script>
	export default {
		name:"search",
		data() {
			return {
				
			};
		},
		methods:{
			searchGoods(){
				this.$emit("click")
			}
		}
	}
</script>

<style lang="scss">
	.search-container{
		background-color: #c00000;
		display: flex;
		height: 50px;
		justify-content: center;
		align-items: center;
		padding: 0 10px;
		.my-search-box{
			background-color: #fff;
			width: 100%;
			height: 30px;
			
			border-radius:18px;
			border:1px solid #c00000;
			line-height: 30px;
			font-size: 14px;
			text-align: center;
			.placeholder{
				margin-right:5px
			}
		}
	}

</style>
