<script>
	import checkUpdate from '@/uni_modules/uni-upgrade-center-app/utils/check-update';
	checkUpdate();
	export default {
		onLaunch: function () {
			console.log('App Launch');
		},
		onShow: function () {
			console.log('App Show');
		},
		onHide: function () {
			console.log('App Hide');
		}
	};
</script>

<style lang="scss">
	/*每个页面公共css */
	@import '@/static/iconfont.css';
	@import '@/uni_modules/uview-plus/index.scss';
	@import 'colorui/main.css';
	@import 'colorui/icon.css';
	@import 'colorui/animation.css';
	@import 'static/iconfont-weapp-icon.css';
	// @import url('https://picturebed.kvxin.top/certishare_asstes/css/iconfont-weapp-icon.css');
	/* 高度使用100vh，在h5环境下会多出一些宽度导致可以上下滑动，使用以下方法可以解决问题*/
	uni-page-body,
	html,
	body {
		height: 100%;
		display: flex;
		width: 750rpx;
		justify-content: center;
	}
	#app {
		width: 100%;
		background-color: #fff;
		height: 100vh;
	}
	@font-face {
		font-family: 'iconfont-color';
		src: url('//at.alicdn.com/t/c/font_4445148_c6jgoqggrh8.woff2?t=1710143573894')
				format('woff2'),
			url('//at.alicdn.com/t/c/font_4445148_c6jgoqggrh8.woff?t=1710143573894') format('woff'),
			url('//at.alicdn.com/t/c/font_4445148_c6jgoqggrh8.ttf?t=1710143573894')
				format('truetype');
	}
	@font-face {
		font-family: 'iconfont-normal';
		src: url('//at.alicdn.com/t/c/font_4361578_9kawpihlgz.ttf?t=1708960541784')
			format('truetype');
	}

	.iconfont-color {
		font-family: iconfont-color;
	}
	.iconfont-normal {
		font-family: iconfont-normal;
	}
	/* #ifdef MP-WEIXIN */
	page {
		// background-color: red;
		display: flex;
		justify-content: center;
	}
	/* #endif */
</style>
