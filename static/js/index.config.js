
const CONFIG = {
	// 开发环境配置
	development: {
		baseUrl: '/baseUrl/', // 后台接口请求地址 
		// dingType:2,//跳转类型    1、钉钉   2、H5  3、App 4、cookie	
		dingType:2,
	},
	// 生产环境配置
	production: {
		// baseUrl: 'https://signinpod.anyunhulian.com/', // 后台接口请求地址	
		
		// baseUrl: 'https://exercitation.anyunhulian.com/'
		baseUrl: '/',
		// baseUrl:'https://exercitation.anyunhulian.com:18443/',
		dingType:4,//跳转类型    1、钉钉   2、H5  3、App 4、cookie	
	}
 
};
export default CONFIG[process.env.NODE_ENV];
