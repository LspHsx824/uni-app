<template>
	<view class="search-container">
		<view class="search-box">
			<!-- 设置圆角 -->
			<uni-search-bar class="search"   
							placeholder="搜索" bgColor="#fff" :radius="18"  
							cancelButton="none" 
							@confirm="search" 
							@input="input"></uni-search-bar>
		</view>
		
		<!-- 搜索建议 -->
		<view class="sugg-list" v-if="kw">
			<view class="sugg-item" v-for="(item,i) in searchList" :key="i" @click="gotoDetail(item)">
				<view class="goods-name">{{item.goods_name}}</view>
				<uni-icons type="arrowright" size="16"></uni-icons>
			</view>
		</view>
		
		<!-- 搜索历史 -->
		<view class="history-box" v-else>
			<view class="history-title">
				<text>搜索历史</text>
				<uni-icons type="trash" size="17" @click="clearHistory"></uni-icons>
			</view>
			<view class="history-list">
				 <uni-tag :text="item" v-for="(item, i) in newHistoryList" :key="i" @click="gotoGoodsList(item)"></uni-tag>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				timer: null,
				kw:"",
				searchList:[],
				historyList:["a","app","apler"]
			};
		},
		computed:{
			newHistoryList() {
				return [...this.historyList].reverse()
			}
		},
		onLoad(){
			this.historyList = JSON.parse(uni.getStorageSync('kw') || '[]')
		},
		methods:{
			search(){
				console.log("搜索")
			},
			input(e){
				clearTimeout(this.timer)
				
				this.timer = setTimeout(()=>{
					this.kw = e
					console.log(this.kw)
					this.getSearchList()
					this.saveSearchHistory()
				},500)
			},
			async getSearchList(){
				if(this.kw.trim() !==0){
					try{
						const { data: res } = await uni.$http.get('/api/public/v1/goods/qsearch', { query: this.kw })
						this.searchList = res.message
					}catch(err){
						return uni.$showMsg()
					}
				}
			},
			gotoDetail(item){
				uni.navigateTo({
							url:"/subpack/goodes_detail/goodes_detail?goods_id="+item.goods_id
				        })
			},
			saveSearchHistory(){
				/* 方法一
				const flag = this.historyList.some( item => item === this.kw)
				if( flag ) return 
				this.historyList.unshift(this.kw) // [a,a] */
				
			/* 	方法二 使用 Set 集合 */
				const set = new Set(this.historyList)
				set.delete(this.kw)
				set.add(this.kw)
				this.historyList = Array.from(set)
				uni.setStorageSync('kw', JSON.stringify(this.historyList))
			},
			clearHistory(){
				 // 清空 data 中保存的搜索历史
				  this.historyList = []
				  // 清空本地存储中记录的搜索历史
				  uni.setStorageSync('kw', '[]')
			},
			gotoGoodsList(kw){
				uni.navigateTo({
					url:"/subpack/good_list/good_list?query="+kw
				})
			}
		}
	}
</script>

<style lang="scss">
	.search-container{
		.search-box{
			background-color: #c00000;
			width: 100%;
		}
		 .sugg-list {
		    padding: 0 5px;
		
		    .sugg-item {
		      display: flex;
		      align-items: center;
		      justify-content: space-between;
		      font-size: 12px;
		      padding: 13px 0;
		      border-bottom: 1px solid #efefef;
		
		      .goods-name {
		        white-space: nowrap;
		        overflow: hidden;
		        text-overflow: ellipsis;
		        margin-right: 3px;
		      }
		    }
		  }
		.history-box{
			padding: 0 5px;
			.history-title{
					display: flex;
				    justify-content: space-between;
				    align-items: center;
				    height: 40px;
				    font-size: 13px;
				    border-bottom: 1px solid #efefef;
			}
			.history-list{
				display: flex;
				flex-wrap: wrap;
				 .uni-tag {
				      margin-top: 5px;
				      margin-right: 5px;
				    }
			}
			
		}
	}
	
</style>
