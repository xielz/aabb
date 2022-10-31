import config from './index.config.js';
const oldUrl = config.oldUrl;
const bengdiUrl = config.bengdiUrl;
const baseUrl = config.baseUrl;


//登录
var Login = baseUrl + "connect/token";
//选择类型
var codeOutlist=baseUrl+"api/app/new-stu-verify/by-code-to-list";
//查询实习申请表
var internApply=baseUrl+"api/app/exercise/intern-apply";
//查询家庭联系人
var familyContact=baseUrl+"api/app/family-contact";
//pdf预览
var internApplyPdf=baseUrl+"api/app/exercise/intern-apply-pDf";
//上传
var uploadFile=baseUrl+"api/app/exercise/upload-img";
//查询顶岗图片
var queryApplyImg=baseUrl+"api/app/exercise/intern-apply-img";
//删除顶岗图片
var delApplyImg=baseUrl+"api/app/exercise/file";
//图片上传完下一步
var uploadAudit=baseUrl+"api/app/exercise/audit";
//实习审批状态
var auditStatus=baseUrl+"api/app/exercise/audit-status";
//家庭联系人列表选择
var familyContactList=baseUrl+"api/app/family-contact/list";
//指导老师
var batchTeacherList=baseUrl+"api/app/exercise/batch-teacher";
//学院相关的单位
var enterpriseList=baseUrl+"api/app/exercise/enterprise-list";
//查询单位信息
var enterpriseInfo=baseUrl+"api/app/enterprise";
//添加单位信息
var saveEnterprise=baseUrl+"api/app/exercise/enterprise";
//省县市
var levelPath=baseUrl+"api/app/p-cC/path";
//换岗
var changeIntern=baseUrl+"api/app/exercise/change-intern";
 //下载
const download=baseUrl;
//换岗图片上传完下一步
var changeInternAudit=baseUrl+"api/app/exercise/change-intern-audit";
//换岗审批状态
var changeInternStatus=baseUrl+"api/app/exercise/change-intern-audit-status";
//换岗pdf预览
var changeInternApplyPdf=baseUrl+"api/app/exercise/change-intern-apply-pDf";
//当天的签到	
var dataSignStatus=baseUrl+"api/app/sign-in/sign-status";

//当天签到提交	
var dataSign=baseUrl+"api/app/sign-in/sign";
//点击日历查看签到情况
var dataSignInfo=baseUrl+"api/app/sign-in/sign-info";
//签到圆点 
var calendarDot=baseUrl+"api/app/sign-in/calendar";
//打卡饼图
var chartTotalCount=baseUrl+"api/app/sign-in/total-count";


//日志姓名
var blogsInfo=baseUrl+"api/app/exercise/student-about-info";
//返回日志id
var blogsInfoId=baseUrl+"api/cms-kit-admin/blogs";
//查询所有的日志(发布)
var blogsList=baseUrl+"api/cms-kit-admin/blogs/blog-posts";
//日志查询详情图片
var blogsMedia=baseUrl+"api/cms-kit/media";
//点赞
var givePost=baseUrl+"api/cms-kit-public/reactions/BlogPost";
//这条日志的所有评论  
var blogsComment=baseUrl+"api/cms-kit-public/comments/BlogPost";
//日志上传图片
var blogsUploadImg=baseUrl+"api/cms-kit-admin/media/BlogPost";
//日志删除图片
var delBlogsImg=baseUrl+"api/cms-kit-admin/media";

//发起对话
var chatClient=baseUrl+"api/app/chat-client";
//聊天记录
var chatRecord=baseUrl+"api/app/chat";
//发消息
var sendMsg=baseUrl+"api/app/chat/send-message";
//定时器30s刷新消息
var timingList=baseUrl+"api/app/chat/list";

//删除换岗图片
var changeDelApplyImg=baseUrl+"api/app/file/file";
//获取实习报告
var getConclusion=baseUrl+"api/app/exercise/cms-conclusion-list";
//获取实习报告类型
var getConclusionType=baseUrl+"api/app/exercise/blog-post-conclusion-type";
//获取实习报告提交
var conclusionAudit=baseUrl+"api/app/exercise/cms-conclusion-audit";
//获取实习报告评价
var getRatings=baseUrl+"api/cms-kit-public/ratings/BlogPost";
//获取实习报告审批
var getExamine=baseUrl+"api/app/exercise/conclusion-audit";
//获取实习报告保存后内容
var getConclusionInfo=baseUrl+"api/app/v-exercise-cms-blog-posts/list";
//修改密码
var editPwd=baseUrl+"api/account/my-profile/change-password";
//修改头像
var editPortrait=baseUrl+"api/app/student/update-image";
//修改手机号
var editPhone=baseUrl+"api/app/student/phone-number";
//首页代办
var opertaionReport=baseUrl+"api/app/v-to-do-opertaion-report";
//查看所有代办
var opertaionReportAll=baseUrl+"api/app/v-to-do-opertaion-details/list";
//日志所有
var getblogInfo=baseUrl+"api/app/v-exercise-cms-blog-posts";

//创建三方协议  承诺书id
var tripleSafetyId=baseUrl+"api/app/exercise/triple-and-safety";
//三方协议  承诺书信息
var tripleSafetyInfo=baseUrl+"api/app/exercise/triple-and-safety-info";
//三方协议  承诺书上传图片保存
var tripleSafetyUpload=baseUrl+"api/app/exercise/triple-and-safety-img";
//三方协议  承诺书删除图片
var tripleSafetyDel=baseUrl+"api/app/exercise/triple-and-safety-img-cleer";
//三方协议  承诺书提交 审批流
var tripleSafetyAudit=baseUrl+"api/app/exercise/triple-and-safety-audit";
//实习档案状态
var internStatus=baseUrl+"api/app/exercise/intern-status";

//实习成绩单 打卡
var punch=baseUrl+"api/app/v-exercise-report-by-batch/list";
//实习成绩单 提交日志
var punchLog=baseUrl+"api/app/v-exercise-cmsblogposts-report/list";
//实习单位老师 打分
var punchTeacher=baseUrl+"api/app/exercise/evaluate-info";

//验证钉钉登录
var checkDingLogin=baseUrl+"api/app/ding-talk/check-login";

//验证cookie登录
var cookieLogin=baseUrl+"api/account/login";
//cookie登录退出
var cookieOut=baseUrl+"api/account/logout";
//保险列表
var getInsurance=baseUrl+"api/app/insurance/list";
//保险删除添加
var operateInsurance=baseUrl+"api/app/insurance";



export default {
	Login,
	codeOutlist,
	internApply,
	familyContact,
	internApplyPdf,
	uploadFile,
	queryApplyImg,
	delApplyImg,
	uploadAudit,
	auditStatus,
	familyContactList,
	batchTeacherList,
	enterpriseList,
	enterpriseInfo,
	saveEnterprise,
	levelPath,
	changeIntern,
	download,
	changeInternAudit,
	changeInternStatus,
	changeInternApplyPdf,
	dataSignStatus,
	dataSign,
	dataSignInfo,
	calendarDot,
	chartTotalCount,
	blogsInfo,
	blogsInfoId,
	blogsList,
	blogsMedia,
	givePost,
	blogsComment,
	blogsUploadImg,
	delBlogsImg,
	chatClient,
	chatRecord,
	sendMsg,
	timingList,
	changeDelApplyImg,
	getConclusion,
	getConclusionType,
	conclusionAudit,
	getRatings,
	getExamine,
	getConclusionInfo,
	editPwd,
	editPortrait,
	editPhone,
	opertaionReport,
	opertaionReportAll,
	getblogInfo,
	tripleSafetyId,
	tripleSafetyInfo,
	tripleSafetyUpload,
	tripleSafetyDel,
	tripleSafetyAudit,
	internStatus,
	punch,
	punchLog,
	punchTeacher,
	checkDingLogin,
	cookieLogin,
	cookieOut,
	getInsurance,
	operateInsurance

}
