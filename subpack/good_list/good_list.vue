<template>
	<view class="goods-list">
		<view v-for="(goods,i) in goodsList" :key="i" @click="gotoDetail(goods)">
			<goods-item  :goods="goods">
				
			</goods-item>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				goodsList:[],
				queryObj:{
					query:"",
					cid:"",
					pagenum:1,
					pagesize:10
				},
				 // 总数量，用来实现分页
				total: 0,
				isLoading:false
			};
		},
		onLoad(options){
			this.queryObj.query = options.query || ''
			this.queryObj.cid = options.cid || ''
			
			// 初始化加载 
			this.getGoodsList()
		},
		methods:{
			async getGoodsList(isPullDown = false){
				this.isLoading = true;
				  // 判断是否还有下一页数据

				try{
					const { data: res } = await uni.$http.get('/api/public/v1/goods/search', this.queryObj)
					
					if( isPullDown){
						this.goodsList = [...res.message.goods,...this.goodsList,]
						uni.stopPullDownRefresh()
					}else{
						this.goodsList = [...this.goodsList,...res.message.goods]
					}
					
					// console.log(this.goodsList[0].goods_name)
					this.total = res.message.total
					this.isLoading = false
				}catch(err){
					this.isLoading = false
					return  uni.$showMsg()
				}
			},
			gotoDetail(item){
				console.log(item)
				uni.navigateTo({
					url:"/subpack/goodes_detail/goodes_detail?goods_id=" + item.goods_id
				})
			}
		},
		onReachBottom(){
			/* 判断数据是否加载完毕 */
			if (this.queryObj.pagenum * this.queryObj.pagesize >= this.total) return uni.$showMsg('数据加载完毕！')
			/* 数据是否在加载中 */
			if(this.isLoading) return
			
			this.queryObj.pagenum++
			this.getGoodsList()
		},
		onPullDownRefresh(){
			/* 判断数据是否加载完毕 */
			
			if (this.queryObj.pagenum * this.queryObj.pagesize >= this.total) return uni.$showMsg('数据加载完毕！')
			
			this.queryObj.pagenum++
			this.getGoodsList(true)
			
		}
	}
</script>

<style lang="scss">
 
</style>
