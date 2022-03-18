<template>
	<view>
		<view class="login">
		<!-- 提示登录的图标 -->
		   <uni-icons type="contact-filled" size="100" color="#AFAFAF"></uni-icons>
		   <!-- 登录按钮 -->
		   <button  type="primary" 
					class="btn-login" 
					
					@click="getUserInfo">一键登录</button>
		   <!-- 登录提示 -->
		   <view class="tips-text">登录后尽享更多权益</view>
		   
		</view>
		<view class="mask">
			
		</view>
	</view>
</template>

<script>
	import { mapMutations,mapState} from "vuex"
	import loginInfo from "./loginData.js"
	export default {
		name:"my-login",
		data() {
			return {
			};
		},
		computed:{
			...mapState('m_user', ['redirectInfo']),
		},
		methods:{
			...mapMutations("m_user",['updateUserInfo','updateToken','updateRedirectInfo']),
			async getUserInfo(){
				
				const [err,res] = await uni.getUserProfile({
										desc:"用户登录"
									})
						// console.log(res)
				// 判断是否获取用户信息成功
				    if (res.errMsg === 'getUserInfo:fail auth deny') 
						return uni.$showMsg('您取消了登录授权！')
						// console.log(res.userInfo)
				// 获取用户信息成功， e.detail.userInfo 就是用户的基本信息
					const userInfo = Object.assign(res.userInfo,{
						// gender:1,
						city:"Shijiazhuang-shanghai",
						province:"Hebei",
						country:"China"
					})
					this.updateUserInfo(userInfo)
					
				// 获取登录成功后的 Token 字符串
					this.getToken(res,userInfo)
			},
			async getToken(info,userInfo){
				try{
					 // 调用微信登录接口
					  const [err, res] = await uni.login()
					  // 准备参数对象
					/*  const query = {
					    code: res.code,
					    encryptedData: info.encryptedData,
					    iv: info.iv,
					    rawData: userInfo,
					    signature: info.signature
					  }
					    // 换取 token   登录接口  以废弃，需要提供 模拟 token
					 // const { data: loginResult } = await uni.$http.post('/api/public/v1/users/wxlogin', query)
					 // 2. 更新 vuex 中的 token
					  // console.log("----",loginResult) */
					  
					 this.updateToken(loginInfo.message.token)
					 this.navigateBack()
					 uni.$showMsg('登录成功')
				}catch(err){
					  return uni.$showMsg('登录失败！')
				}
				  
			},
			// 返回登录之前的页面
			navigateBack(){
				console.log("aaaa")
				// redirectInfo 不为 null，并且导航方式为 switchTab
				  if (this.redirectInfo && this.redirectInfo.openType === 'switchTab') {
				    // 调用小程序提供的 uni.switchTab() API 进行页面的导航
				    uni.switchTab({
				      // 要导航到的页面地址
				      url: this.redirectInfo.from,
				      // 导航成功之后，把 vuex 中的 redirectInfo 对象重置为 null
				      complete: () => {
				        this.updateRedirectInfo(null)
				      }
				    })
				  }
			}
		}
	}
</script>

<style lang="scss">
.login{
  // 登录盒子的样式
  height: 750rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #f8f8f8;
  position: relative;
  overflow: hidden;

  // 绘制登录盒子底部的半椭圆造型
  &::after {
    content: ' ';
    display: block;
    position: absolute;
    width: 100%;
    height: 40px;
    left: 0;
    bottom: 0;
    background-color: white;
    border-radius: 100%;
    transform: translateY(50%);
  }

  // 登录按钮的样式
  .btn-login {
    width: 90%;
    border-radius: 100px;
    margin: 15px 0;
    background-color: #c00000;
  }

  // 按钮下方提示消息的样式
  .tips-text {
    font-size: 12px;
    color: gray;
  }
}
.mask{
	width: 100vw;
	height: 180px;
	background-color: #fff;
}

</style>
