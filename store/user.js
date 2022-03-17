export default {
	namespaced:true,
	state:{
		address: JSON.parse(uni.getStorageSync('address') || '{}'),
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
	},
	getters:{
		joinAddress(state){
			let {provinceName,cityName,countyName,detailInfo} = state.address
			if(!provinceName) return ""
			
			return `${provinceName}${cityName}${countyName}${detailInfo}`
		}
	}
}