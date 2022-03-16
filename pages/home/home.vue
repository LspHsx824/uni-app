<template>
	<view>
		<!-- 搜索栏 -->
		<view class="search-box">
			<search  @click="gotoSearch"></search>
		</view>
		
		<!-- 轮播图区域 -->
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
			<swiper-item v-for="(item,i) in swiperList " :key="i">
				<navigator class="swiper-item" :url="'/subpack/goodes_detail/goodes_detail?goods_id=' + item.goods_id">
				          <image :src="item.image_src"></image>
				</navigator>
			</swiper-item>
		</swiper>
		
		<!-- 分类导航区域 -->
		    <view class="nav-list">
		      <view class="nav-item" v-for="(item, i) in navList" :key="i" @click="navClickHandler(item)">
		        <image :src="item.image_src" class="nav-img"></image>
		      </view>
		    </view>
			
			<!-- 楼层区域 -->
			<view class="floor-list">
				<view class="floor-item" v-for="(item,i) in floorList" :key="i">
					<!-- 标题 -->
					<image :src="item.floor_title.image_src" class="floor-title"></image>
					<!-- 楼层的图片区域 -->
					        <view class="floor-img-box">
					          <!-- 左侧大图片的盒子 -->
					          <navigator class="left-img-box" :url="item.product_list[0].url">
					            <image :src="item.product_list[0].image_src" :style="{width: item.product_list[0].image_width + 'rpx'}" mode="widthFix"></image>
					          </navigator>
					          <!-- 右侧 4 个小图片的盒子 -->
					          <view class="right-img-box">
					            <navigator class="right-img-item" v-for="(item2, i2) in item.product_list" :key="i2" v-if="i2 !== 0" :url="item2.url">
					              <image :src="item2.image_src" :style="{width: item2.image_width + 'rpx'}" mode="widthFix"></image>
					            </navigator>
					          </view>
					        </view>
				</view>
			</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				swiperList:[],
				navList: [],
				floorList: []
			};
		},
		onLoad(){
			this.getSwiperList() 
			this.getNavList()
			this.getFloorList()

		},
		methods:{
			async getSwiperList() {
				try{
					const { data:res } = await uni.$http.get('/api/public/v1/home/swiperdata')
					this.swiperList = res.message;
					
				}catch(err){
					return uni.$showMsg()
				}
				
			},
			async getNavList() {
				try{
					const { data: res } = await uni.$http.get('/api/public/v1/home/catitems')
					this.navList = res.message
				}catch(err){
					return uni.$showMsg()
				}
			},
			async getFloorList(){
				try{
					const { data: res } = await uni.$http.get('/api/public/v1/home/floordata')
					
					res.message.forEach( floor =>{
						floor.product_list.forEach( prod=>{
							prod.url = "/subpack/good_list/good_list?" + prod.navigator_url.split('?')[1]
						})
					})
					
					this.floorList = res.message
				}catch(err){
					return uni.$showMsg()
				}
			},
			navClickHandler(item){
				// tabbar页面 只能用 switchTab 方法
				if(item.name === "分类"){
					uni.switchTab({
						url:"/pages/cate/cate"
					})
				}
			},
			gotoSearch(){
				uni.navigateTo({
					url:"/subpack/search/search"
				})
			}
		}
		
	}
</script>

<style lang="scss">
	.search-box{
		position: sticky;
		z-index: 999;
		left:0;
		top:0
	}
	 swiper {
	    height: 330rpx;
	
	    .swiper-item,
	    image {
	      width: 100%;
	      height: 100%;
	    }
	  }
	
	  .nav-list {
	    display: flex;
	    justify-content: space-around;
	    margin: 15px 0;
	
	    .nav-img {
	      width: 128rpx;
	      height: 140rpx;
	    }
	  }
	
	  .floor-title {
	    width: 100%;
	    height: 60rpx;
	  }
	
	  .right-img-box {
	    display: flex;
	    flex-wrap: wrap;
	    justify-content: space-around;
	  }
	
	  .floor-img-box {
	    display: flex;
	    padding-left: 10rpx;
	  }

</style>
