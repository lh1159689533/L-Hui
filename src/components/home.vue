<template>
	<div>
		<el-button type="primary" @click="get">测试</el-button>
		<canvas id="cv"></canvas>
	</div>
</template>
<script>
	import snow from './snow/index'
	export default {
		name: 'home',
		data () {
			return {
				i: 1
			}
		},
		methods: {
			get () {
				snow.init(document.getElementById('cv'))
			}
		}
	}
</script>