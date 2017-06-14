/*去除首尾空格函数*/
function fntrimspace(str)
{
	while(str.substring(0,1)==" ")
	{
		str=str.substring(1);
	}
	while(str.substring(str.length-1)==" ")
	{
		str=str.substring(0,str.length-1);
	}
	return str;
}
		
/*检测字符串所占的字节数*/
function mbStringLength(s)
{
	var totalLength = 0;
	var i;
	var charCode;
	for (i = 0; i < s.length; i++) {
		charCode = s.charCodeAt(i);
		if (charCode < 0x007f) 
		{
			totalLength = totalLength + 1;
		}
		 else if ((0x0080 <= charCode) && (charCode <= 0xffff)) 
		 {
		totalLength += 2;
		}
	}	
	return totalLength;
}
/*验证EMail*/
function isEmail(email)
{
	str=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
	var result=str.test(email);
	return result;
}
/*验证连接是否正确*/
function isLink(strLink)
{
	if (strLink.indexOf("http://")<0)
	{
		return false;
	}
	else
	{
		return true;
	}
}
/*验证日期正确*/
function isDate(strDate)
{
	var str=/^[1-2]\d{3}-(0?[1-9]|1[0-2])-(0?[1-9]|[12][0-9]|3[0-1])$/ ; 
	var result=strDate.match(str);
	return result;
}
//验证手机号
function isMobile(obj) {
    var partten = /^((13|15|18)+\d{9})$/;
    var result=partten.test(obj);
	return result;
}
//验证邮政编码
function isPost(post)
{
	var str=/^\d{6}$/;
	var result=str.test(post);
	return result;
}
$(function(){
	$("#btnsumitaa").bind("click", function(event)
	{
		var flag=1;
		/*必须填写的表单的验证*/
		$(".notnull").each(function(i){
			var strmsg=$(this).attr("strmsg");
			var strlen=$(this).attr("strlen");
			var strFunc=$(this).attr("strFunc");
			var val=fntrimspace($(this).val());
		    var hasChkb=$("#hasbtnChkb").val();
			var nameStr=$(this).attr("name");
			var strChkHide=$(this).attr("strChkHide");
			var flagchk=0;
			var flagrnd=0;
			if ($(this).hasClass("hasChkbtn"))//判断是否是Checkbox
			{
				if(flagchk==0)
				{
					 if($(".hasChkbtn[name='"+nameStr+"']:checkbox[checked]").length<1)
					 {
						 alert(strmsg);
						 $(".hasChkbtn[name='"+nameStr+"']").eq(0).focus();
						 flag=0;
						 flagchk=1;
						 return false;
					  }					
				}	  
			}
			else if($(this).hasClass("hasRadiobtn"))//判断是否是radio
			{
				if(flagrnd==0)
				{
					 if($(".hasRadiobtn[name='"+nameStr+"']:radio[checked]").length<1)
					 {
						 alert(strmsg);
						 $(".hasRadiobtn[name='"+nameStr+"']").eq(0).focus();
						 flag=0;
						 flagrnd=1;
						 return false;
					  }
				}	  
			}
			else
			{
				if (val=="")
				{
					alert(strmsg+"不能为空!");
					$(this).focus();
					flag=0;
					return false;
				}
				if (strlen!="" && strlen!=null)
				{
					if(mbStringLength(val)>strlen)
					{
						alert(strmsg+"长度不能超过"+strlen+"字节数!");
						$(this).focus();
						flag=0;
						return false;
					}
				}
				if (strFunc=="isEmail")
				{
					if(!isEmail(val))
					{
						alert("Email格式不正确!");
						$(this).focus();
						flag=0;
						return false;
					}
				}
				else if (strFunc=="isMobile")
				{
					if(!isMobile(val))
					{
						alert("手机格式不正确!");
						$(this).focus();
						flag=0;
						return false;
					}
				}
				else if (strFunc=="isPost")
				{
					if(!isPost(val))
					{
						alert("邮政编码格式不正确!");
						$(this).focus();
						flag=0;
						return false;
					}
				}
				//主要是用于图片的设置标记
				else if (strFunc=="setPicFile")
				{
					setPic=$(this).attr("setPic");
					$("#"+setPic).val("1");
				}
				else if (strFunc=="isLink")
				{
					if(!isLink(val))
					{
						alert("链接是以http://开头!");
						$(this).focus();
						flag=0;
						return false;
					}
				}
				else if (strFunc=="isDate")
				{
					if(!isDate(val))
					{
						alert("日期格式不正确!");
						$(this).focus();
						flag=0;
						return false;
					}
				}
			}
		});
		
		/*非必填的表单的长度验证*/
		$(".cannull").each(function(i){
			var strmsg=$(this).attr("strmsg");
			var strlen=$(this).attr("strlen");
			strFunc=$(this).attr("strFunc");
			var val=$(this).val();
			if (val!="")
			{
				if (strlen!="" && strlen!=null)
				{
					if(mbStringLength(val)>strlen)
					{
						alert(strmsg+"长度不能超过"+strlen+"字节数!");
						$(this).focus();
						flag=0;
						return false;
					}
				}
				//主要是用于图片的设置标记
				if (strFunc=="setPicFile")
				{
					setPic=$(this).attr("setPic");
					$("#"+setPic).val("1");
				}
				else if (strFunc=="isLink")
				{
					if(!isLink(val))
					{
						alert("链接是以http://开头!");
						$(this).focus();
						flag=0;
						return false;
					}
				}
				else if (strFunc=="isDate")
				{
					if(!isDate(val))
					{
						alert("日期格式不正确!");
						$(this).focus();
						flag=0;
						return false;
					}
				}
			}
		});
		
		if (!flag)
		{
			return false;
		}
		else
		{
			/*if ($("#content_html").attr("class")!="cannull")
			{
				if(window.content_html.getHTML()=="")
				{
					alert("详细内容不能为空!");
					flag=0;
					return false;
				}
				else
				{
					$("#aaaa").val(window.content_html.getHTML());
					$("#btttnfrm").submit();
				}	
			}
			else
			{
				$("#btttnfrm").submit();	
			}*/
		}
	});
});
  
