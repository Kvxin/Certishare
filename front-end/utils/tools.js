/**
 * 数字转成汉字
 * @params num === 要转换的数字
 * @return 汉字
 * */
const toChinesNum = (num) => {
	let changeNum = ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九"];
	let unit = ["", "十", "百", "千", "万"];
	num = parseInt(num);
	let getWan = (temp) => {
		let strArr = temp.toString().split("").reverse();
		let newNum = "";
		let newArr = [];
		strArr.forEach((item, index) => {
			newArr.unshift(
				item === "0" ? changeNum[item] : changeNum[item] + unit[index]
			);
		});
		let numArr = [];
		newArr.forEach((m, n) => {
			if (m !== "零") numArr.push(n);
		});
		if (newArr.length > 1) {
			newArr.forEach((m, n) => {
				if (newArr[newArr.length - 1] === "零") {
					if (n <= numArr[numArr.length - 1]) {
						newNum += m;
					}
				} else {
					newNum += m;
				}
			});
		} else {
			newNum = newArr[0];
		}

		return newNum;
	};
	let overWan = Math.floor(num / 10000);
	let noWan: string | number = num % 10000;
	if (noWan.toString().length < 4) {
		noWan = "0" + noWan;
	}
	return overWan ? getWan(overWan) + "万" + getWan(noWan) : getWan(num);
};


//节流
const throttle = (fn, delay) => {
	let flag = true
	return function(...args) {
		if (!flag) return
		flag = false
		setTimeout(() => {
			fn.apply(this, ...args)
			flag = true
		}, delay);
	}
}
//防抖
const debounce = (fn, delay) => {
	let timer;
	return function(...args) {
		if (timer) {
			clearInterval(timer)
		} else {
			timer = setInterval(() => {
				fn.apply(this, ...args);
			}, delay)
		}
	}
}


export default {
	throttle,
	debounce,
	toChinesNum
};