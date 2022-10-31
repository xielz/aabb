
import {RouterMount,createRouter} from 'uni-simple-router';

const router = createRouter({
platform: process.env.VUE_APP_PLATFORM,  
	routes: [...ROUTES]
});
// //全局路由前置守卫
// router.beforeEach((to, from, next) => {
// 	console.log("to1",to,"from1",from,"next1",next);
// 	 console.log('跳转前');
// 	 next();
	 
// });

// // 全局路由后置守卫
// router.afterEach((to, from) => {
// 	console.log("to2",to,"from2",from);
//     console.log('跳转结束')
// })



export {
	router,
	RouterMount
}