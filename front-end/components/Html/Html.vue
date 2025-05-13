<template>
	<mp-html
		container-style="padding:20px"
		:content="html"
		domain="https://mp-html.oss-cn-hangzhou.aliyuncs.com"
		lazy-load
		scroll-table
		selectable
		use-anchor
		:tag-style="tagStyle"
		:markdown="true"
	/>
</template>

<script setup>
	import { ref, defineProps } from 'vue';
	const tagStyle = ref({
		table: 'box-sizing: border-box; border-top: 1px solid #dfe2e5; border-left: 1px solid #dfe2e5;',
		th: 'border-right: 1px solid #dfe2e5; border-bottom: 1px solid #dfe2e5;',
		td: 'border-right: 1px solid #dfe2e5; border-bottom: 1px solid #dfe2e5;',
		li: 'margin: 5px 0;'
	});
	const props = defineProps({
		html: String
	});
</script>

<style lang="scss"></style>
