<template>
	<view class="scroll-view">
		<!-- 搜索框 -->
		<search @click="searchGoods"></search>
		<view class="goods-view">
		<!-- 左侧滚动视图 -->
		<scroll-view scroll-y="true" class="left-scroll" :style="{height: wh +'px'}">
			<!-- <view class="left-item active">XXXX</view> -->
			
			<block v-for="(item,i) in cateList" :key="i">
				<view :class="['left-item',{active:i === active}]"
					  @click="activeClick(i)"
				 >{{item.cat_name}}</view>
			</block>
			
		</scroll-view>
		<!-- 右侧滚动视图 -->
		<scroll-view scroll-y="true" class="right-scroll"  :style="{height: wh +'px'}"  :scroll-top="scrollTop">
			<view class="right-item" v-for="(item2,i) in cateLevel2" :key="i">
				<view class="cate-lv2-title">
					/ {{ item2.cat_name}} /
				</view>
				
				<!-- 二级分类下的 content -->
				<view class="lv3-box" >
					<!-- 三级分类 -->
					<view class="lv3-item" v-for="(item3,i) in item2.children" :key="i"  @click="gotoGoodsList(item3)">
						<image :src="item3.cat_icon" class="lv3-img" ></image>
						<text class="lv3-txt">{{ item3.cat_name}}</text>
					</view>
				</view>
			</view>
		</scroll-view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				wh:0,
				active:0,
				cateList:[],
				scrollTop:0,
				cateLevel2: [], // 二级分类
			};
		},
		onLoad(){
			const sysInfo = uni.getSystemInfoSync()
			this.wh = sysInfo.windowHeight - 50
			// console.log(this.wh)
			this.getCateList()
		},
		methods:{
			async getCateList(){
				try{
					const { data:res} = await uni.$http.get('/api/public/v1/categories')
					this.cateList = res.message;
					this.cateLevel2 = res.message[0].children
				}catch(err){
					return uni.$showMsg()
				}
			},
			activeClick(i){
				this.active = i;
				this.cateLevel2 = this.cateList[i].children
				this.scrollTop = Math.random()
			},
			gotoGoodsList(item){
				uni.navigateTo({
					url:`/subpack/good_list/good_list?cid=${item.cat_id}`
				})
			},
			searchGoods(){
				uni.navigateTo({
					url:"/subpack/search/search"
				})
			}
		}
	}
</script>

<style lang="scss">
	.scroll-view{
		.goods-view{
			display: flex;
		}
		.left-scroll{
			display: flex;
			width: 120px;
			.left-item{
				// align-items: center;
				text-align: center;
				justify-content: center;
				line-height: 60px;
				position: relative;
				font-size: 12px;
				background-color: #f7f7f7;
				&.active{
					background-color: #EEEEEE;
					&::before{
						content: "";
						display: block;
						width: 3px;
						height: 30px;
						position: absolute;
						top:50%;
						left:0;
						transform: translateY(-50%);
						background-color: red;
						z-index: 1;
					}
				}
			}
		}
		.right-scroll{
			.cate-lv2-title{
				font-weight: 700;
				font-size: 12px;
				text-align: center;
				padding: 15px 0;
				
			}
			.lv3-box{
				display: flex;
				flex-wrap: wrap;
				.lv3-item{
					justify-content: center;
					display: flex;
					align-items: center;
					flex-direction: column;
					width: 33.33%;
					margin-bottom: 10px;
					.lv3-img{
						width: 60px;
						height: 60px;
					}
					.lv3-txt{
						font-size: 12px;
						padding-top: 10px ;
					}
				}
			}
		}
	}
	

</style>
