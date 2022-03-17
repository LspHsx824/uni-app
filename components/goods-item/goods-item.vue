<template>
	<view class="goods-item">
		<!-- left -->
		<view class="goods-item-left">
			<label class="radio">
				<radio :checked="goods.goods_state"  v-if="showRadio" color="#c00000"  
					   @click="handlerChange"/>
			</label>
		     <image :src="goods.goods_small_logo || defaultPic" class="goods-pic"></image>
		 </view>
		 
		 <!-- right -->
		 <view class="goods-item-right">
		             <!-- 商品标题 -->
		    <view class="goods-name">{{goods.goods_name}}</view>
		        <view class="goods-info-box">
		               <!-- 商品价格 -->
					<view class="goods-price">￥{{goods.goods_price|tofixed}}</view>
					<uni-number-box v-if="showCount" 
								:value="goods.goods_count" 
								:min="1"
								@change="numChange">
					</uni-number-box>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import cart_mixins from "@/mixins/index.js"
	export default {
		name:"goods-item",
		data() {
			return {
				defaultPic: 'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png'
			};
		},
		mixins:[cart_mixins],
		props:{
			goods:{
				type:Object,
				default:()=> {}
			},
			showRadio:{
				type:Boolean,
				default:false
			},
			showCount:{
				type:Boolean,
				default:false
			}
			
		},
		// filters:{
		// 	tofixed(num){
		// 		return Number(num).toFixed(2)
		// 	}
		// },
		methods:{
			handlerChange(){
				this.$emit("radio-change",{
					goods_id:this.goods.goods_id,
					goods_state:!this.goods.goods_state
				})
			},
			numChange(val){
				this.$emit("num-change",{
					goods_id:this.goods.goods_id,
					goods_count:Number(val)
				})
			}
		}
	}
</script>

<style lang="scss">
 .goods-item {
    display: flex;
    padding: 10px 5px;
    border-bottom: 1px solid #f0f0f0;

    .goods-item-left {
      margin-right: 5px;
	  display: flex;
	  justify-content: center;
	  align-items: center;
      .goods-pic {
        width: 100px;
        height: 100px;
        display: block;
      }
    }

    .goods-item-right {
      display: flex;
      flex-direction: column;
	  justify-content: space-between;
      .goods-name {
        font-size: 13px;
      }

      .goods-info-box {
		  display: flex;
		  justify-content: space-between;
		  align-items: center;
		  
        .goods-price {
          color: #C00000;
          font-size: 16px;
        }
      }
    }
  }
</style>
