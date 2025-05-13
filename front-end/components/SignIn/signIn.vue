<template>
	<!-- 打卡日历页面 -->
	<view class="all">
		<view class="bar">
			<!-- 上一个月 -->
			<view class="previous" @click="changeMonth(-1)">
				<button class="barbtn">{{ langType == 'ch' ? '上一月' : 'Last' }}</button>
			</view>
			<!-- 显示年月 -->
			<view class="date">{{ nowYear || '--' }} 年 {{ nowMonth || '--' }} 月</view>
			<!-- 下一个月 -->
			<view class="next" @click="changeMonth(1)">
				<button class="barbtn">{{ langType == 'ch' ? '下一月' : 'Nex/' }}</button>
			</view>
		</view>
		<!-- 显示星期 -->
		<view class="week-area">
			<view class="week-txt" v-for="(item, index) in weeksTxt[langType]" :key="index">
				{{ item }}
			</view>
		</view>

		<view class="myDateTable">
			<view v-for="(item, j) in calendarDays" :key="j" class="dateCell">
				<view v-if="item.date == undefined || item.date == null" class="cell"></view>
				<template v-else>
					<!-- 已签到日期 -->
					<view v-if="item.isSign == true" class="cell greenColor bgWhite">
						{{ item.date }}
					</view>
					<!-- 漏签 -->
					<view
						@click="clickSign(item.date, 0)"
						class="cell outSignStyle"
						v-else-if="item.isBeforeToday && item.isThisMonth"
					>
						<!-- redColor bgGray -->
						{{ item.date }}
						<view class="redDot"></view>
					</view>
					<!-- 今日未签到-->
					<view
						@click="clickSign(item.date, 1)"
						class="cell whiteColor bgBlue"
						v-else-if="item.date == today && nowMonth == toMonth && nowYear == toYear"
					>
						签到
					</view>
					<!-- 当前日期之后 -->
					<view class="whiteColor cell" v-else>
						{{ item.date }}
					</view>
				</template>
			</view>
		</view>
	</view>
</template>

<script setup>
	import { ref, watch, onMounted } from 'vue';
	const props = defineProps({
		isReplenishSign: {
			type: Boolean,
			default: false
		},
		isFullCalendar: {
			type: Boolean,
			default: true
		},
		yearMonth: {
			type: String,
			default: () => `${new Date().getFullYear()}-${new Date().getMonth() + 1}`
		},
		dataSource: {
			type: Array,
			default: () => []
		},
		langType: {
			type: String,
			default: 'ch' //en
		}
	});
	const calendarDays = ref([]);
	const SignData = ref([]);
	const nowYear = ref(0);
	const nowMonth = ref(0);
	const today = ref(parseInt(new Date().getDate()));
	const toMonth = ref(parseInt(new Date().getMonth() + 1));
	const toYear = ref(parseInt(new Date().getFullYear()));
	const weeksTxt = ref({
		ch: ['日', '一', '二', '三', '四', '五', '六'],
		en: ['Sun', 'Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat']
	});
	const toIOSDate = (strDate) => {
		return strDate ? strDate.replace(/-/g, '/') : strDate;
	};
	const getMonthDayLength = (year, month) => {
		return new Date(year, month, 0).getDate();
	};
	const getFirstDayOfWeek = (year, month, day = 1) => {
		return new Date(Date.UTC(year, month - 1, day)).getDay();
	};
	const getOperateMonthDate = (yy, mm, num) => {
		let month = parseInt(mm) + parseInt(num);
		let year = parseInt(yy);
		if (month > 12) {
			month = 1;
			year++;
		} else if (month < 1) {
			month = 12;
			year--;
		}
		return { month, year };
	};
	const clickSign = (date, type) => {
		var strTip = '签到';
		if (type == 0) {
			if (!props.isReplenishSign) {
				console.log('————补签功能未开启————');
				return;
			}
			strTip = '补签';
		}
		uni.showToast({
			title: date + '号' + strTip + '成功',
			icon: 'success',
			position: 'bottom'
		});
		uni.$emit('clickChange', nowYear.value + '-' + nowMonth.value + '-' + date);
	};

	const buildCalendar = (y, m) => {
		nowYear.value = y;
		nowMonth.value = m;
		calculateEmptyGrids(y, m);
		calculateDays(y, m);
		if (props.isFullCalendar) {
			fullCell();
		}
	};
	const onSignDataChange = (newData, oldData = []) => {
		SignData.value = newData;
		matchSign();
	};
	const matchSign = () => {
		console.log('执行了');
		var signs = SignData.value;
		var daysArr = calendarDays.value;
		for (var i = 0; i < signs.length; i++) {
			var current = new Date(toIOSDate(signs[i])).getTime();
			for (var j = 0; j < daysArr.length; j++) {
				if (current == new Date(toIOSDate(daysArr[j].fullDate)).getTime()) {
					daysArr[j].isSign = true;
				}
			}
		}
		calendarDays.value = daysArr;
	};
	const calculateEmptyGrids = (year, month) => {
		calendarDays.value = [];
		const firstDayOfWeek = getFirstDayOfWeek(year, month);
		if (firstDayOfWeek > 0) {
			for (let i = 0; i < firstDayOfWeek; i++) {
				calendarDays.value.push({
					date: null,
					fullDate: null,
					isBeforeToday: true,
					isSign: false,
					isThisMonth: false
				});
			}
		}
	};
	const calculateDays = (year, month) => {
		const thisMonthDays = getMonthDayLength(year, month);
		const toDate = new Date(toYear.value + '/' + toMonth.value + '/' + today.value);
		for (let i = 1; i <= thisMonthDays; i++) {
			const fullDate = year + '-' + month + '-' + i;
			const isBeforeToday = new Date(toIOSDate(fullDate)) < toDate;
			calendarDays.value.push({
				date: i,
				fullDate,
				isBeforeToday,
				isSign: false,
				isThisMonth: true
			});
		}
	};
	const changeMonth = (type) => {
		const nowYear = parseInt(nowYear.value);
		const nowMonth = parseInt(nowMonth.value);
		const newObj = getOperateMonthDate(nowYear, nowMonth, type);
		buildCalendar(newObj.year, newObj.month); // 重新构建日历数据
		uni.$emit('dateChange', nowYear.value + '-' + nowMonth.value); //传给调用模板页面去拿新数据
	};
	const fullCell = () => {
		const endDay = getMonthDayLength(nowYear.value, nowMonth.value);
		const beforeEmptyLength = getFirstDayOfWeek(nowYear.value, nowMonth.value);
		const afterEmptyLength = 6 - getFirstDayOfWeek(nowYear.value, nowMonth.value, endDay);

		const last = getOperateMonthDate(nowYear.value, nowMonth.value, -1);
		const lastMonthEndDay = getMonthDayLength(last.year, last.month);
		for (let i = 0; i < beforeEmptyLength; i++) {
			const date = lastMonthEndDay - beforeEmptyLength + i + 1;
			calendarDays.value[i].date = date;
			calendarDays.value[i].fullDate = last.year + '-' + last.month + '-' + date;
		}
		const next = getOperateMonthDate(nowYear.value, nowMonth.value, 1);
		for (let i = 1; i <= afterEmptyLength; i++) {
			calendarDays.value.push({
				date: i, // 显示的日期
				fullDate: next.year + '-' + next.month + '-' + i, // 日期yyyy-mm-dd格式
				isBeforeToday: false, // 今日之前
				isSign: false, // 是否签到
				isThisMonth: false // 是本月
			});
		}
	};
	watch(
		() => props.dataSource,
		(newData, oldData) => {
			SignData.value = newData;
			matchSign();
		},
		{
			deep: true
		}
	);

	onMounted(() => {
		if (!/en|ch/g.test(props.langType)) {
			props.langType = 'ch'; // 非中英，则固定中文
		}
		const ymArr = props.yearMonth.split('-');
		buildCalendar(ymArr[0], ymArr[1]);
		onSignDataChange(props.dataSource);
	});
</script>

<style>
	.all {
		margin-top: 20rpx;
	}

	.all .bar {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		margin: 30rpx 20rpx;
		padding: 10rpx;
	}

	.bar .barbtn {
		height: 30px;
		line-height: 30px;
		font-size: 12px;
	}

	.all .week-area {
		display: flex;
		justify-content: space-between;
		padding: 10px 0;
		box-sizing: border-box;
		width: 91vw;
		margin: 10px auto;
		border-radius: 10px;
	}
	.all .week-txt {
		text-align: center;
		width: 13vw;
	}
	.myDateTable {
		margin: 0 auto;
		width: 91vw;
		padding: 2vw;
		border-radius: 10px;
		background: linear-gradient(#74aada, #94db98);
	}
	.myDateTable .dateCell {
		width: 13vw;
		padding: 1vw;
		display: inline-block;
		text-align: center;
		font-size: 16px;
		box-sizing: border-box;
		overflow: hidden;
	}

	.dateCell .cell {
		display: flex;
		border-radius: 50%;
		height: 11vw;
		justify-content: center;
		align-items: center;
		box-sizing: border-box;
		flex-direction: column;
	}

	.whiteColor {
		color: #fff;
	}

	.greenColor {
		color: #01b90b;
		font-weight: bold;
	}

	.bgWhite {
		background-color: #fff;
	}

	.bgGray {
		background-color: rgba(255, 255, 255, 0.42);
	}

	.bgBlue {
		font-size: 14px;
		background-color: #4b95e6;
	}

	.redColor {
		color: #ff0000;
	}
	.outSignStyle {
		border: 1px solid #ffffff;
		color: #ffffff;
	}
	.redDot {
		width: 3px;
		height: 3px;
		border-radius: 50%;
		background-color: red;
	}
</style>
