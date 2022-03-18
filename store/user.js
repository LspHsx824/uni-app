export default {
	namespaced:true,
	state:{
		address: JSON.parse(uni.getStorageSync('address') || '{}'),
		
		//用户登录 token
		token: uni.getStorageSync('token') || '',
		 // 用户的基本信息
		userinfo: JSON.parse(uni.getStorageSync('userinfo') || '{}'),
		// 重定向的 object 对象 { openType, from }
		redirectInfo : null
	},
	mutations:{
		updateAddress(state,succ){
			state.address = succ
			this.commit('m_user/saveAddressToStorage')
		},
		// 1. 定义将 address 持久化存储到本地 mutations 方法
	    saveAddressToStorage(state) {
			uni.setStorageSync('address', JSON.stringify(state.address))
	    },
		// 更新用户的基本信息
		updateUserInfo(state, userinfo) {
		    state.userinfo = userinfo
		    // 通过 this.commit() 方法，调用 m_user 模块下的 saveUserInfoToStorage 方法，将 userinfo 对象持久化存储到本地
		    this.commit('m_user/saveUserInfoToStorage')
		},
		saveUserInfoToStorage(state){
			uni.setStorageSync('userinfo', JSON.stringify(state.userinfo))
		},
		// 更新 token 字符串
		updateToken(state, token) {
		    state.token = token
		    // 通过 this.commit() 方法，调用 m_user 模块下的 saveTokenToStorage 方法，将 token 字符串持久化存储到本地
		    this.commit('m_user/saveTokenToStorage')
		},
	    // 将 token 字符串持久化存储到本地
	    saveTokenToStorage(state) {
			uni.setStorageSync('token', state.token)
	    },
		 // 更新重定向的信息对象
		 updateRedirectInfo(state,info){
			 state.redirectInfo = info
		 }
	},
	getters:{
		joinAddress(state){
			let {provinceName,cityName,countyName,detailInfo} = state.address
			if(!provinceName) return ""
			
			return `${provinceName}${cityName}${countyName}${detailInfo}`
		}
	}
}