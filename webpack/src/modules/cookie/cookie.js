/**
 * cookie功能库
 * 提供增加，修改，删除cookie功能
 */


 var cookie = {
 	get : function  (name) {
 		var xarr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
		if (xarr != null)
			return decodeURIComponent(xarr[2]);
		return null;
 	},
 	set : function  (key, value,expiredays) {

 		var cookieText= encodeURIComponent(key) + "=" + encodeURIComponent(value)+";";
 		var exdate = new Date();
 		exdate.setDate(exdate.getDate() + expiredays);	
 		cookieText+="expires=" + exdate.toGMTString() + ";path=/;";
 		document.cookie = cookieText;
 	},
 	del : function  (key) {
 		var value = this.get(key);
 		var exdate = new Date();
 		exdate.setDate(exdate.getDate()-1);	

 		if(value && value!=''){
 			document.cookie = encodeURIComponent(key) + '=' + escape(value) +';path=/;expires=' + exdate.toGMTString();
 		}

 	}

 }

 module.exports = cookie;
