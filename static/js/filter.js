export function dateFormat(value, format) {
     let pattern = value.replace(/-/g, "/"); //把"-"，替换成"/" ios
     let date = new Date(pattern);
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
      }:${min < 10 ? "0" + min : min}:${s < 10 ? "0" + s : s} `;
     }
     if (format == "yyyy-mm-dd") {
         result = `${y}-${m < 10 ? "0" + m : m}-${d < 10 ? "0" + d : d}`;
     }
     if (format == "yyyy-mm") {
         result = `${y}-${m < 10 ? "0" + m : m}`;
     }

     if (format == "mm-dd") {
         result = ` ${m < 10 ? "0" + m : m}-${d < 10 ? "0" + d : d}`;
     }

     if (format == "hh:mm") {
         result = ` ${h < 10 ? "0" + h : h}:${min < 10 ? "0" + min : min}`;
     }
	 if (format == "mm-dd hh:mm") {
	     result = ` ${m < 10 ? "0" + m : m}-${d < 10 ? "0" + d : d} ${h < 10 ? "0" + h : h}:${min < 10 ? "0" + min : min}`;
	 }
	 
     if (format == "hh:mm:ss") {
         result = ` ${h < 10 ? "0" + h : h}:${min < 10 ? "0" + min : min}:${s < 10 ? "0" + s : s}`;
     }
     if (format == "yyyy") {
         result = `${y}`;
     }
     return result;
 };
 
 
 export function dateFormatTxt(value, format) {
      let pattern = value.replace(/-/g, "/"); //把"-"，替换成"/" ios
      let date = new Date(pattern);
      let y = date.getFullYear();
      let m = date.getMonth() + 1;
      let d = date.getDate();
      let h = date.getHours();
      let min = date.getMinutes();
      let s = date.getSeconds();
      let result = "";
 
      if (format == "mm-dd") {
          result = ` ${m < 10 ? "" + m : m}月${d < 10 ? "" + d : d}`;
      }
      return result;
  };
 
 
 
 
 export function dateWeek(value, format) {
      let pattern = value.replace(/-/g, "/"); //把"-"，替换成"/" ios
      let date = new Date(pattern);
      let y = date.getFullYear();
      let m = date.getMonth() + 1;
      let d = date.getDate();
      let h = date.getHours();
      let min = date.getMinutes();
      let s = date.getSeconds();
	  var days = date.getDay();
	  switch(days) {		
	        case 1:
	              days = '周一';	
	              break;	
	        case 2:
	              days = '周二';
	              break;	
	        case 3:
	              days = '周三';	
	              break;
	        case 4:	
	              days = '周四';		
	              break;		
	        case 5:		
	              days = '周五';	
	              break;	
	        case 6:		
	              days = '周六';		
	              break;			
	        case 0:	
	              days = '周日';
	              break;
				  }
	  
	  
      let result = "";
      if (format == undefined) {
          result = `${y}-${m < 10 ? "0" + m : m}-${d < 10 ? "0" + d : d} ${
         h < 10 ? "0" + h : h
       }:${min < 10 ? "0" + min : min}:${s < 10 ? "0" + s : s}`;
	   
      }
      if (format == "yyyy-mm-dd") {
          result = `${y}-${m < 10 ? "0" + m : m}-${d < 10 ? "0" + d : d} ${days}`;
      }
      if (format == "yyyy-mm") {
          result = `${y}-${m < 10 ? "0" + m : m}`;
      }
      if (format == "mm-dd") {
          result = ` ${mm < 10 ? "0" + mm : mm}:${d < 10 ? "0" + d : d}`;
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
      return result;
  }
 
 export default {
     dateFormat,
	 dateWeek,
	 dateFormatTxt
 }
