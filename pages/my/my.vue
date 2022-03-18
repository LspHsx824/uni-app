<template>
	<view class="personal-container">
		<!-- 登录 -->
		<my-login v-if="!token"></my-login>
		<!-- 个人中心信息 -->
		<my-info v-else></my-info>
		
	</view>
</template>

<script>
	import {mapState} from "vuex"
	import cat_mixins from "@/mixins/index.js"
	export default {
		data() {
			return {
				
			};
		},
		mixins:[cat_mixins],
		computed:{
			...mapState("m_user",["token"])
		}
	}
</script>

<style lang="scss">

</style>
