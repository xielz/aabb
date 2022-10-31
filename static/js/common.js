import config from './index.config.js';
const dingType = config.dingType; //跳转类型  1、钉钉   2、H5  3、App 4、cookie
// uni.setStorageSync('sign','2022010001');
// uni.setStorageSync('pswd','Qdl8YwjNpl5djeUkIzper3GQyEN9cHNZEERCQ/JMGw/2O/I/NqGAXiuugop+5zB9WtI9iS/DLOyVfkGRGzi7Te/+NAlmDfAI8ClD8PcleK3Y5/M/ftCQyvRnjwDg5tNwsCBUF7xX+0DOS5xOgNPbeHeSGuYMIYyTt1px1cjGVj4=');	


// _this.$http.sendRequest(_this.api.completed, 'POST', _this.info).then(function(res) {
//封装request请求
const sendRequest = (url, method = 'GET', data = {}, contentType) => {
	//判断header提交数据类型
	let types = '';
	let responseType = "text";
	// ||method == 'DELETE'
	if (method == 'post') {
		types = 'application/x-www-form-urlencoded';
	} else if (method == 'get') {
		responseType = "arraybuffer";
	} else {
		types = 'application/json;charset=UTF-8';
	}

	var header = {
		'Content-Type': types,
		'Accept': 'application/json, text/javascript, */*; q=0.01',
	}

	if (dingType == 2) {
		var access_token = uni.getStorageSync('access_token') || '';
		header = Object.assign({
			'Authorization': 'Bearer ' + access_token
		}, header);
	}


	// uni.showLoading({
	// 	title: "加载中"
	// });


	var access_token = uni.getStorageSync('access_token') || '';
	return new Promise(function(resolve, reject) {
		uni.request({
			url: url,
			data: data,
			method: method,
			withCredentials: true,
			// header: {
			// 	'Content-Type': types,
			// 	'Accept': 'application/json, text/javascript, */*; q=0.01',
			// 	'Authorization': 'Bearer ' + access_token,
			// },
			header: header,
			responseType: responseType,
			success(res) {
				if (res.header.authorization) {
					uni.setStorageSync('access_token', res.header.authorization);
				} else {
					//console.log("res.data.Tag",res.statusCode)
					var code = res.statusCode;
					// console.log("res.data.Tag",code)
					switch (code) {
						//ok
						case 400:
							resolve(res);
							uni.showToast({
								title: '服务器异常请稍后再试v1',
								icon: 'none'
							});
							break;
						case 404:
							uni.showToast({
								title: '服务器异常请稍后再试v2',
								icon: 'none'
							});
							break;
						case 500:
							uni.showToast({
								title: '服务器异常请稍后再试v3',
								icon: 'none'
							});
							break;
							// case 1001:
							// 	uni.showModal({
							// 		title: '提示',
							// 		content: '身份已过期，请重新登录后再来操作！',
							// 		success: ress => {
							// 			if (ress.confirm) {
							// 				uni.redirectTo({
							// 					url: '/pages/Login/Login'
							// 				})
							// 			}
							// 		}
							// 	})
							// 	break;
						default:
							resolve(res);
							break;
					}
					//   var code = res.statusCode;
					//   switch (code) {
					//       case 401:
					//           uni.showModal({
					//               title: '登录提示',
					//               content: '身份已过期，请重新登录后再来操作！',
					//               success: ress => {
					//                   if (ress.confirm) {
					//                       uni.redirectTo({
					//                       	url:'/pages/Message/MessageInfo'
					//                       })
					//                   }
					//               }
					//           })
					//           break;
					//       default:
					//           resolve(res);
					//           break;
					//   }
				}
			},
			fail(err) {
				reject(err);
			},
			complete() {
				//uni.hideLoading();
			}
		})
	})
}


const appid = config.AuthorizerAppid;
const GetWeiXinInfo = config.GetWeiXinInfo;
const ComponentAppid = config.ComponentAppid;
const JumpUrl = config.JumpUrl;
//登录
function Login(url) {
	// scope应用授权作用域， snsapi_base （未关注，不弹出授权页面，直接跳转，只能获取用户openid），
	// snsapi_userinfo （弹出授权页面，可通过openid拿到昵称、性别、所在地。并且， 即使在未关注的情况下，只要用户授权，也能获取其信息 ）
	var hrefUrl =
		"https://open.weixin.qq.com/connect/oauth2/authorize?appid=" +
		appid +
		"&redirect_uri=" +
		encodeURIComponent(GetWeiXinInfo) +
		"&response_type=code&scope=snsapi_base&state=" +
		encodeURIComponent(JumpUrl + url) +
		"&component_appid=" +
		ComponentAppid +
		"#wechat_redirect";
	// alert(hrefUrl);
	window.location.href = hrefUrl;
}


// base64H5
function getUrlBase64(url, callback) {
	var canvas = document.createElement("canvas");
	var ctx = canvas.getContext("2d");
	var img = new Image;

	img.crossOrigin = 'anonymous';
	img.src = url;
	//或 img.src = url + '?v=' + Math.random(); // 处理缓存

	img.onload = function() {
		canvas.height = img.height;
		canvas.width = img.width;
		ctx.drawImage(img, 0, 0, img.width, img.height);
		var ext = img.src.substring(img.src.lastIndexOf(".") + 1).toLowerCase();
		var dataURL = canvas.toDataURL("image/" + ext);
		callback.call(this, dataURL);
		canvas = null;
	};
}

// base64H5 app
function getUniappBase64(url, callback) {
	// #ifdef H5
	uni.request({
		url: url,
		method: 'GET',
		responseType: 'arraybuffer',
		success: ress => {
			let base64 = uni.arrayBufferToBase64(ress.data); //把arraybuffer转成base64 
			base64 = 'data:image/jpeg;base64,' + base64 //不加上这串字符，在页面无法显示的哦
			//	console.log('转换结果',base64)
			callback.call(this, base64);
		},
		fail: (e) => {
			console.log("图片转换失败");
		}
	})
	// #endif


	// #ifdef APP-PLUS
	const reader = new plus.io.FileReader();
	// url 为file:// ....
	plus.io.resolveLocalFileSystemURL(url, entry => {
		entry.file(file => {
			reader.onloadend = e => {
				// e.target.result就是base64字符串
				const base64 = e.target.result;
				callback.call(this, base64);
			};
			reader.readAsDataURL(file);
		}, function(e) {
			console.log("333", e.message);
		});
	}, e => {
		console.log("444", e)
	});

	// #endif

}

// 压缩图片 H5
function compressImg(file) {
	return new Promise((resolve, reject) => {
		let reader = new FileReader();
		reader.onloadend = function(e) {
			let img = new Image();
			img.onload = function() {
				let canvas = document.createElement("canvas");
				let ctx = canvas.getContext("2d");
				let tCanvas = document.createElement("canvas");
				let tctx = tCanvas.getContext("2d");
				let width = img.width;
				let height = img.height;
				// 如果图片大于一百万像素，计算压缩比并将大小压至100万以下
				let ratio;
				if ((ratio = width * height / 1000000) > 1) {
					console.log("大于100万像素");
					ratio = Math.sqrt(ratio);
					width /= ratio;
					height /= ratio;
				} else {
					ratio = 1;
				}
				canvas.width = width;
				canvas.height = height;
				ctx.fillStyle = "#fff"; // 铺底色
				ctx.fillRect(0, 0, canvas.width, canvas.height);
				// 如果图片像素大于100万则使用瓦片绘制
				let count;
				if ((count = width * height / 1000000) > 1) {
					count = ~~(Math.sqrt(count) + 1); // 计算要分成多少块瓦片
					// 计算每块瓦片的宽和高
					let nw = ~~(width / count);
					let nh = ~~(height / count);
					tCanvas.width = nw;
					tCanvas.height = nh;
					for (let i = 0; i < count; i++) {
						for (let j = 0; j < count; j++) {
							tctx.drawImage(img, i * nw * ratio, j * nh * ratio, nw * ratio,
								nh * ratio,
								0, 0, nw, nh);
							ctx.drawImage(tCanvas, i * nw, j * nh, nw, nh);
						}
					}
				} else {
					ctx.drawImage(img, 0, 0, width, height);
				}

				// let canvasWidth = img.width; // 图片原始长宽
				// let canvasHeight = img.height;
				// let canvas = document.createElement('canvas');
				// let ctx = canvas.getContext('2d');
				// // 创建固定750宽度的图片，可自定义大小
				// canvas.width = 750;
				// canvas.height = (750 * canvasHeight) / canvasWidth;
				// ctx.drawImage(img, 0, 0, 750, (750 * canvasHeight) / canvasWidth);
				canvas.toBlob(
					function(blob) {
						// 创建file文件
						let pressFile = new File([blob], file.name, {
							type: file.type
						});
						Object.defineProperty(pressFile, 'path', {
							get: () => URL.createObjectURL(blob)
						});
						return resolve(pressFile);
					},
					file.type,
					0.7 // 图片质量，值0-1之间，可不填默
				);
			};

			img.src = e.target.result;
		};
		// 读取 File 对象，然后触发 loadend 事件
		reader.readAsDataURL(file);
	});
}



//压缩图片app
function compressImgApp(img, callback) {
	plus.io.resolveLocalFileSystemURL(img, (entry) => { //通过URL参数获取目录对象或文件对象
		entry.file((file) => { // 可通过entry对象操作图片 
			console.log('压缩前图片信息:' + JSON.stringify(file)); //压缩前图片信息
			if (file.size > 104800) { //   如果大于100Kb进行压缩
				plus.zip.compressImage({ // 5+ plus.zip.compressImage 了解一下，有详细的示例
					src: img, //src: 压缩原始图片的路径    
					dst: img.replace('.png', 'yasuo.png').replace('.PNG',
							'yasuo.PNG').replace('.jpg', 'yasuo.jpg')
						.replace('.JPG', 'yasuo.JPG'),
					width: '40%', //dst: (String 类型 )压缩转换目标图片的路径，这里先在后面原始名后面加一个yasuo区分一下
					height: '40%', //width,height: (String 类型 )缩放图片的宽度,高度
					quality: 55, //quality: (Number 类型 )压缩图片的质量 比例 1-100
					overwrite: true, //overwrite: (Boolean 类型 )覆盖生成新文件
					// format:'jpg'   //format: (String 类型 )压缩转换后的图片格式
				}, (event) => {
					console.log('压缩后图片信息:' + JSON.stringify(event));
					//返回压缩后的图片路径
					callback(event.target);
				}, function(err) {
					console.log('解析文件URL失败: ' + err.message);
				});
			} else { //小于100kb跳过压缩，直接返回现有的src
				callback(img);

			}
		});
	}, (e) => { // 返回错误信息
		console.log('解析文件URL失败: ' + e.message);
	});

}


/**
 * H5端图片压缩
 *  参数说明：
 *  imgSrc 图片url
 *  type 返回图片类型  默认blob 
 *  callback 回调设置返回值 
 */
function compressImgH5(imgSrc, type, callback) {
	var img = new Image();
	img.src = imgSrc;
	img.onload = function() {
		var that = this;
		var h = that.height; // 默认按比例压缩
		var w = that.width;
		var canvas = document.createElement('canvas');
		var ctx = canvas.getContext('2d');
		var width = document.createAttribute("width");
		width.nodeValue = w;
		var height = document.createAttribute("height");
		height.nodeValue = h;
		canvas.setAttributeNode(width);
		canvas.setAttributeNode(height);
		ctx.drawImage(that, 0, 0, w, h);
		var quality = 0.03; //压缩比例  0-1
		var base64 = canvas.toDataURL('image/jpeg', quality);
		canvas = null;

		if (type == 'base64') {
			console.log("base64压缩后大小", base64)
			callback(base64);
		} else {
			var blob = base64ToBlob(base64);
			var blobUrl = window.URL.createObjectURL(blob); //blob地址	
			console.log("blobUrl", blobUrl);
			console.log("blob压缩后大小", blob.size);
			callback(blobUrl);
		}
	}


}
// base转Blob
function base64ToBlob(base64) {
	var arr = base64.split(','),
		mime = arr[0].match(/:(.*?);/)[1],
		bstr = atob(arr[1]),
		n = bstr.length,
		u8arr = new Uint8Array(n);
	while (n--) {
		u8arr[n] = bstr.charCodeAt(n);
	}
	return new Blob([u8arr], {
		type: mime
	});


}




function BuycompressImg(file) {
	return new Promise((resolve, reject) => {

		return resolve(file);
	});
}

function CurrentDate(format) {
	let date = new Date();
	let y = date.getFullYear();
	let m = date.getMonth() + 1;
	let d = date.getDate();
	let h = date.getHours();
	let min = date.getMinutes();
	let s = date.getSeconds();
	let result = "";
	if (format == undefined) {
		result = `${y}-${m < 10 ? "0" + m : m}-${d < 10 ? "0" + d : d} ${
        h < 10 ? "0" + h : h
      }:${min < 10 ? "0" + min : min}`;
	}
	if (format == "yyyy-mm-dd hh:mm:ss") {
		result = `${y}-${m < 10 ? "0" + m : m}-${d < 10 ? "0" + d : d} ${
         h < 10 ? "0" + h : h
       }:${min < 10 ? "0" + min : min}:${s < 10 ? "0" + s : s}`;
	}
	if (format == "yyyy-mm-dd") {
		result = `${y}-${m < 10 ? "0" + m : m}-${d < 10 ? "0" + d : d}`;
	}
	if (format == "yyyy-mm") {
		result = `${y}-${m < 10 ? "0" + m : m}`;
	}
	if (format == "mm") {
		result = `${m < 10 ? "0" + m : m}`;
	}
	if (format == "mm-dd") {
		result = ` ${m < 10 ? "0" + m : m}:${dd< 10 ? "0" + dd : dd}`;
	}

	if (format == "hh:mm") {
		result = ` ${h < 10 ? "0" + h : h}:${min < 10 ? "0" + min : min}`;
	}
	if (format == "hh:mm:ss") {
		result = ` ${h < 10 ? "0" + h : h}:${min < 10 ? "0" + min : min}:${s < 10 ? "0" + s : s}`;
	}
	if (format == "yyyy") {
		result = `${y}`;
	}
	if (format == "yyyy年mm") {
		result = `${y}年${m < 10 ? "0" + m : m}`;
	}
	if (format == "yyyymmdd") {
		result = `${y}${m < 10 ? "0" + m : m}${d < 10 ? "0" + d : d}`;
	}
	if (format == "yyyymm") {
		result = `${y}${m < 10 ? "0" + m : m}`;
	}
	return result;
}

//根据年月返回 当月天数 _this.$http.getDaysInMonth('2022','08')
function getDaysInMonth(year, month) {
	month = parseInt(month, 10); //parseInt(number,type)这个函数后面如果不跟第2个参数来表示进制的话，默认是10进制。
	var temp = new Date(year, month, 0);
	return temp.getDate();
}

//时间戳
function timeStamp(time, mode) {
	const timeFormat = uni.$u.timeFormat,
		toast = uni.$u.toast
	switch (mode) {
		case 'datetime':
			return timeFormat(time, 'yyyy-mm-dd hh:MM')
		case 'date':
			return timeFormat(time, 'yyyy-mm-dd')
		case 'year-month':
			return timeFormat(time, 'yyyy-mm')
		case 'time':
			return time
		default:
			return ''
	}
}

function notMore(means, clickName, ...data) {
	// @click="$notMoreTap(savebtn,'notTap',item.id,item.tb_name)"
	// means是点击后需要执行的方法
	// clickName是一个变量的名字控制是否是第一次点击
	// data是点击需要传的参数:用逗号隔开就可以，...为剩余运算符，除去前两位传的参数，剩下的传的参数都会留在data里
	let that = this;
	if (that[clickName]) {
		// 第一次点击
		that[clickName] = false;
		if (data && data.length > 0) {
			if (data.length != 0 && data[0] != '') {
				means(...data);
			}
		} else {
			means();
		}
		setTimeout(() => {
			that[clickName] = true;
		}, 2000)
	} else {
		// uni.showToast({
		// 	title:'请不要重复点击',
		// 	icon:'none'
		// })

		console.log("请不要重复点击")
	}
}


function isEmpty(obj) {
	if (typeof obj == "undefined" || obj == null || obj == "") {
		return true;
	} else {
		return false;
	}
}

// if (_this.$http.isEmpty(_this.Title)) {
// 	uni.showToast({
// 		title: '请输入事单名称',
// 		icon: 'none'
// 	});
// 	return false;
// }


//小球运动弧线
function ballbezier(points, times) {
	// 0、以3个控制点为例，点A,B,C,AB上设置点D,BC上设置点E,DE连线上设置点F,则最终的贝塞尔曲线是点F的坐标轨迹。
	// 1、计算相邻控制点间距。
	// 2、根据完成时间,计算每次执行时D在AB方向上移动的距离，E在BC方向上移动的距离。
	// 3、时间每递增100ms，则D,E在指定方向上发生位移, F在DE上的位移则可通过AD/AB = DF/DE得出。
	// 4、根据DE的正余弦值和DE的值计算出F的坐标。
	// 邻控制AB点间距
	var bezier_points = [];
	var points_D = [];
	var points_E = [];
	const DIST_AB = Math.sqrt(Math.pow(points[1]['x'] - points[0]['x'], 2) + Math.pow(points[1]['y'] - points[0]['y'],
		2));
	// 邻控制BC点间距
	const DIST_BC = Math.sqrt(Math.pow(points[2]['x'] - points[1]['x'], 2) + Math.pow(points[2]['y'] - points[1]['y'],
		2));
	// D每次在AB方向上移动的距离
	const EACH_MOVE_AD = -(DIST_AB / times);
	// E每次在BC方向上移动的距离
	const EACH_MOVE_BE = -(DIST_BC / times);
	// 点AB的正切
	const TAN_AB = (points[1]['y'] - points[0]['y']) / (points[1]['x'] - points[0]['x']);
	// 点BC的正切
	const TAN_BC = (points[2]['y'] - points[1]['y']) / (points[2]['x'] - points[1]['x']);
	// 点AB的弧度值
	const RADIUS_AB = Math.atan(TAN_AB);
	// 点BC的弧度值
	const RADIUS_BC = Math.atan(TAN_BC);
	// 每次执行
	for (var i = 1; i <= times; i++) {
		// AD的距离
		var dist_AD = EACH_MOVE_AD * i;
		// BE的距离
		var dist_BE = EACH_MOVE_BE * i;
		// D点的坐标
		var point_D = {};
		point_D['x'] = dist_AD * Math.cos(RADIUS_AB) + points[0]['x'];
		point_D['y'] = dist_AD * Math.sin(RADIUS_AB) + points[0]['y'];
		points_D.push(point_D);
		// E点的坐标
		var point_E = {};
		point_E['x'] = dist_BE * Math.cos(RADIUS_BC) + points[1]['x'];
		point_E['y'] = dist_BE * Math.sin(RADIUS_BC) + points[1]['y'];
		points_E.push(point_E);
		// 此时线段DE的正切值
		var tan_DE = (point_E['y'] - point_D['y']) / (point_E['x'] - point_D['x']);
		// tan_DE的弧度值
		var radius_DE = Math.atan(tan_DE);
		// 地市DE的间距
		var dist_DE = Math.sqrt(Math.pow((point_E['x'] - point_D['x']), 2) + Math.pow((point_E['y'] - point_D['y']),
			2));
		// 此时DF的距离
		var dist_DF = (dist_AD / DIST_AB) * dist_DE;
		// 此时DF点的坐标
		var point_F = {};
		point_F['x'] = dist_DF * Math.cos(radius_DE) + point_D['x'];
		point_F['y'] = dist_DF * Math.sin(radius_DE) + point_D['y'];
		bezier_points.push(point_F);
	}
	return {
		'bezier_points': bezier_points
	};
}

//开始时间 结束时间 计算总时长
// _this.EndTime = e.year + "-" + e.month + "-" + e.day + " " + e.hour + ":" + e.minute + ":" + e.second;		// _this.duration = _this.$http.initTime(_this.beginTime, _this.EndTime)
function initTime(start, end) {
	const timeLength = '';
	let h = '';
	let m = '';
	let s = '';
	if (start && end) {
		const duringTime = (new Date(end).getTime() - new Date(start).getTime()) / 1000;
		h = Math.floor(duringTime / 3600);
		m = Math.floor((duringTime % 3600) / 60);
		s = Math.floor((duringTime % 3600) / 3600);
		const hString = h + '小时';
		const mString = m + '分';
		const sString = s + '秒';
		return h ? hString + '' + mString : mString;
	} else {
		return '--';
	}
}

//去重  _this.arrayUnique(_this.repeatPersonListAll, "userId");
function arrayUnique(arr, name) {
	var hash = {};
	return arr.reduce(function(item, next) {
		hash[next[name]] ? '' : hash[next[name]] = true && item.push(next);
		return item;
	}, []);
}


// 获取上一个月 格式为yyyy-mm-dd的日期 注释为日期只显年月   _this.$http.getPreMonth("2022-02")
function getPreMonth(date) {
	var arr = date.split('-');
	var year = arr[0]; //获取当前日期的年份
	var month = arr[1]; //获取当前日期的月份
	var day = arr[2]; //获取当前日期的日
	// var days = new Date(year, month, 0);
	// days = days.getDate(); //获取当前日期中月的天数
	var year2 = year;
	var month2 = parseInt(month) - 1;
	if (month2 == 0) {
		year2 = parseInt(year2) - 1;
		month2 = 12;
	}
	// var day2 = day;
	// var days2 = new Date(year2, month2, 0);
	// days2 = days2.getDate();
	// if (day2 > days2) {
	//     day2 = days2;
	// }
	if (month2 < 10) {
		month2 = '0' + month2;
	}
	// var t2 = year2 + '-' + month2 + '-' + day2;
	var t2 = year2 + '-' + month2;
	return t2;
}

// 获取下一个月 格式为yyyy-mm-dd的日期 注释为日期只显年月   _this.$http.getNextMonth("2022-02")
function getNextMonth(date) {
	var arr = date.split('-');
	var year = arr[0]; //获取当前日期的年份
	var month = arr[1]; //获取当前日期的月份
	// var day = arr[2]; //获取当前日期的日
	// var days = new Date(year, month, 0);
	// days = days.getDate(); //获取当前日期中的月的天数
	var year2 = year;
	var month2 = parseInt(month) + 1;
	if (month2 == 13) {
		year2 = parseInt(year2) + 1;
		month2 = 1;
	}
	// var day2 = day;
	// var days2 = new Date(year2, month2, 0);
	// days2 = days2.getDate();
	// if (day2 > days2) {
	//     day2 = days2;
	// }
	if (month2 < 10) {
		month2 = '0' + month2;
	}

	// var t2 = year2 + '-' + month2 + '-' + day2;
	var t2 = year2 + '-' + month2;
	return t2;
}

// 两个年月日的时间差  _this.$http.monthDayDiff(data, currentData);
function monthDayDiff(rstart, endDate) {
	let flag = [1, 3, 5, 7, 8, 10, 12, 4, 6, 9, 11, 2];
	let start = new Date(rstart);
	let end = new Date(endDate);
	let year = end.getFullYear() - start.getFullYear();
	let month = end.getMonth() - start.getMonth();
	let day = end.getDate() - start.getDate();
	//    console.log(year, month, day);
	if (month == 0 && day == 0) {
		month = 0;
		day = 0
	}
	if (month < 0) {
		year--;
		month = end.getMonth() + (12 - start.getMonth());
	}

	if (day < 0) {
		month--;
		if (month < 0) {
			year--
			month = 11
			if (year < 0) {
				year = 0
			}
		}

		let index = flag.findIndex((temp) => {
			return temp === start.getMonth() + 1;
		});
		let monthLength;
		if (index <= 6) {
			monthLength = 31;
		} else if (index > 6 && index <= 10) {
			monthLength = 30;
		} else {
			monthLength = 28;
		}
		day = end.getDate() + (monthLength - start.getDate());
	}

	// let result = `${year}年${month}月${day}天`;
	let result = `${day}`;
	return result;
	// this.certificationStr.years = result;

	console.log("result", result);
}

module.exports = {
	sendRequest,
	appid,
	Login,
	getUrlBase64,
	compressImg,
	compressImgH5,
	compressImgApp,
	base64ToBlob,
	CurrentDate,
	timeStamp,
	notMore,
	isEmpty,
	BuycompressImg,
	getUniappBase64,
	ballbezier,
	initTime,
	arrayUnique,
	dingType,
	getPreMonth,
	getNextMonth,
	getDaysInMonth,
	monthDayDiff
}
