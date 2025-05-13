import moment from 'moment'



/**
 * 日期转换汉字
 * @params dateStr 日期 '2023-01-09'
 * @return 二〇二三年一月九日
 * */
export const convertChineseDate = (dateStr) => {
	let date = new Date(dateStr);
	let chinese = ["〇", "一", "二", "三", "四", "五", "六", "七", "八", "九"];
	let y = date.getFullYear().toString();
	let m = (date.getMonth() + 1).toString();
	let d = date.getDate().toString();
	let result = "";
	//年
	for (let i = 0; i < y.length; i++) {
		result += chinese[y.charAt(i)];
	}
	result += "年";
	//月
	if (m.length == 2) {
		let temp = "十";
		if (m.charAt(1) != "0") {
			temp += chinese[m.charAt(1)];
		}
		result += temp;
	} else {
		result += chinese[m];
	}
	result += "月";
	//日
	if (d.length == 2) {
		let temp = "";
		if (d.charAt(0) != "1") {
			temp += chinese[d.charAt(0)];
		}
		temp += "十";
		if (d.charAt(1) != "0") {
			temp += chinese[d.charAt(1)];
		}
		result += temp;
	} else {
		result += chinese[d];
	}
	result += "日";
	return result;
};
export const formatTimestamp = timestamp => {
	const milliseconds = timestamp * 1000;
	const date = new Date(milliseconds);
	const year = date.getFullYear();
	const month = `0${date.getMonth() + 1}`.slice(-2);
	const day = `0${date.getDate()}`.slice(-2);
	const hours = `0${date.getHours()}`.slice(-2);
	const minutes = `0${date.getMinutes()}`.slice(-2);
	const seconds = `0${date.getSeconds()}`.slice(-2);
	const formattedTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
	return formattedTime;
}