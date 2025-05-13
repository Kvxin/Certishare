<template>
	<view class="charts-box">
		<qiun-data-charts type="pie" :opts="opts" :chartData="chartData" />
	</view>
</template>

<script setup>
	import { ref, onMounted, defineProps } from 'vue';
	const chartData = ref({});
	const props = defineProps({
		types: Object
	});
	const opts = ref({
		color: [
			'#1890FF',
			'#91CB74',
			'#FAC858',
			'#EE6666',
			'#73C0DE',
			'#3CA272',
			'#FC8452',
			'#9A60B4',
			'#ea7ccc'
		],
		padding: [5, 5, 5, 5],
		enableScroll: false,
		extra: {
			pie: {
				activeOpacity: 0.5,
				activeRadius: 10,
				offsetAngle: 0,
				labelWidth: 15,
				border: true,
				borderWidth: 3,
				borderColor: '#FFFFFF',
				linearType: 'custom'
			}
		}
	});

	const getServerData = () => {
		// 将props.types转换为图表需要的数据格式
		let seriesData = Object.keys(props.types).map((key) => ({
			name: key, // 属性名作为name
			value: props.types[key] // 属性值作为value
		}));

		let res = {
			series: [
				{
					data: seriesData
				}
			]
		};

		chartData.value = JSON.parse(JSON.stringify(res));
	};

	onMounted(() => {
		getServerData();
	});
</script>

<style lang="scss">
	.charts-box {
		width: 100%;
		height: 200px;
	}
</style>
