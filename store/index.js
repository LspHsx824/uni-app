import Vue from "vue"
import Vuex from "vuex"

import moduleUser from "./user.js"

Vue.use(Vuex)

const actions = {
	
}

const mutations = {
	addToCart(state,goods){
		const findresult = state.cart.find( item=> item.goods_id === goods.goods_id)
		
		if( !findresult ){
			state.cart.push(goods)
		}else{
			findresult.goods_count++
		}
		this.commit("saveToStorage")
	},
	updateState(state,goods){
		const findresult = state.cart.find( item=> item.goods_id === goods.goods_id)
		if( findresult ) findresult.goods_state = goods.goods_state
		this.commit("saveToStorage")
	},
	updateNum(state,goods){
		const findresult = state.cart.find( item=> item.goods_id === goods.goods_id)
		if( findresult ) findresult.goods_count = goods.goods_count
		this.commit("saveToStorage")
	},
	removeGoodsById(state,goods){
		state.cart = state.cart.filter( item=> item.goods_id !== goods.goods_id)
		this.commit("saveToStorage")
	},
	updateAllGoddsState(state,newState){
		state.cart.forEach( item=> item.goods_state = newState)
		this.commit("saveToStorage")
	},
	saveToStorage(state){
		uni.setStorageSync('cart', JSON.stringify(state.cart))
	},
	
}

const state = {
	cart:JSON.parse(uni.getStorageSync('cart') || '[]')
}

const getters = {
	totalGoods(state){
		
		return state.cart.reduce( (pre,cur)=> pre += cur.goods_count ,0)
	},
	selectGoods(state){
		return state.cart.filter( item=> item.goods_state).reduce( (t,v)=> t += v.goods_count,0 )
		
	},
	totalPrice(state){
		return state.cart.filter( item=> item.goods_state).reduce( (t,v)=> t += (v.goods_count*v.goods_price),0 )
		
	},
	isFullCheck(state){
		return state.cart.every( item=> item.goods_state)
	}
	
}


export default new Vuex.Store({
	actions,
	mutations,
	state,
	getters,
	modules:{
		"m_user":moduleUser
	}
})