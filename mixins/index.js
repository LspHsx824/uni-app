import { mapGetters} from "vuex"

export default {
	computed:{
		...mapGetters(["totalGoods"])
	},
	onShow(){
		this.setBage()
	},
	watch:{
		totalGoods(){
			this.setBage()
		}
	},
	filters:{
		tofixed(num){
			return Number(num).toFixed(2)
		}
	},
	methods:{
		setBage(){
			uni.setTabBarBadge({
				index:2,
				text:this.totalGoods + ""
			})
		}
	}
}