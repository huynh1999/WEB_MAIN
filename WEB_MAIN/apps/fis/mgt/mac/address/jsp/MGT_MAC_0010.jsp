<%--
=========================================================
*@FileName   : MGT_MAC_0010.jsp
*@FileTitle  : MAC Address Management
*@Description: MAC Address Management
*@author     : Kim,Jin-Hyuk - Cyberlogitec
*@version    : 1.0 - 2011/09/23
*@since      : 2011/09/23
*@Change history:
	<script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/SYS_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
=========================================================
--%>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="clt-paging"   prefix="paging" %>
	<!-- 공통 Header -->
	<%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
	<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css" />
	    <title><bean:message key="system.title"/></title>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CoFormControl.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/SYS_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/apps/fis/mgt/mac/address/script/MGT_MAC_0010.js?ver=<%=CLT_JS_VER%>"></script>
	<%
	String usrId		= userInfo.getUsrid();
	%>
	<script>
	
		var pDoc = parent.parent.parent.document;
		hideProcess('WORKING', pDoc);
		
 		var PARAM1_1 = '';
 		var PARAM1_2 = '';

		<!-- #65: #52672 - [CLA] Security Management / OPUS Forwarding 보안 문제  -->
 		<bean:define id="rtnMap" name="EventResponse" property="mapVal"/>
 		<% boolean isBegin = false; %> 
     	<!--Bound Class Code 코드조회-->
			<bean:define id="logStsList"  name="rtnMap" property="PARAM1"/>
 		<logic:iterate id="codeVO" name="logStsList">
 			<% if(isBegin){ %> 
 				PARAM1_1+= '|';
 				PARAM1_2+= '|';
 			<% }else{ 
 			  	isBegin = true;
 		   	} %> 
 			PARAM1_1+= '<bean:write name="codeVO" property="cd_nm"/>';
         	PARAM1_2+= '<bean:write name="codeVO" property="cd_val"/>';
     	</logic:iterate>
	</script>
	
	<script language="javascript">
	function setupPage(){
		loadPage();
	}
	</script>
</head>
<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css">
<!--ajax 사용시 -->
<style type="text/css">
<!--
style1 {color: #CC0000}
-->
</style>

	<form name="frm1" method="POST" action="./">
	<!--Command를 담는 공통 -->
	<input type="hidden" name="f_cmd"/>
	<input type="hidden" name="work_flg"/>
	<input type="hidden" name="f_CurPage"/>
	<input type="hidden" name="f_Flag"/>
		
	<div class="page_title_area clear">
	   <h2 class="page_title"><button type="button"><%=LEV3_NM%></button></h2>
	   <!-- btn_div -->
	   <div class="opus_design_btn TOP">
	   <%-- 
		   <button type="button" class="btn_accent" <%= null != roleBtnVO? "style='display:none;' btnAuth='" + roleBtnVO.getAttr1() + "'"  : "" %> onclick="document.forms[0].f_CurPage.value='';doWork('SEARCHLIST')">Search</button>
		     --%>
	   </div>
	   <!-- btn_div -->
	   <div class="location">
		   <span><%=LEV1_NM%></span> &gt;
		   <span><%=LEV2_NM%></span> &gt;
		   <span><%=LEV3_NM%></span>
		   <a href="" class="ir">URL Copy</a>
	   </div>
	</div>
		
<div class="over_wrap" height="100%">
	<div class="wrap_search">	
		<div class="opus_design_inquiry entry_pannel ">
			<table>
				<colgroup>
					<col width="40">
					<col width="120">
					<col width="40">
					<col width="130">
					<col width="40">
					<col width="*">
				</colgroup>
                <tr>
                <th><bean:message key="Date"/></th>
				<td>
					<input style="width:75px;" type="text" name="f_strdt" onKeyUp="mkDateFormatType(this,event,false,1);if(ComGetEvent('keycode')==13){firCalFlag=true;};" onBlur="chkCmprPrd(firCalFlag, false, this, this, frm1.f_enddt);firCalFlag=false;" size='11' maxlength="10" class="search_form"><!-- 
				 --><span class="dash">~</span><!-- 
				 --><input style="width:75px;" type="text" name="f_enddt" onKeyUp="mkDateFormatType(this,event,false,1);if(ComGetEvent('keycode')==13){firCalFlag=true;};" onBlur="chkCmprPrd(firCalFlag, false, this, frm1.f_strdt, this);firCalFlag=false;" size='11' maxlength="10" class="search_form"><!-- 
				 --><button type="button" class="calendar ir" name="f_dt_cal" id="f_dt_cal"  onclick="doDisplay('DATE1', frm1);"></button>
				</td>
				
				<th><bean:message key="User_ID"/></th>
				<td>
					<input type="text" name="f_usrid" maxlength="12" value="<%=usrId%>" class="search_form" style="ime-mode:disabled; width:80;" dataformat="excepthan" onKeyDown="entSearch()">
				</td>
				<th><bean:message key="Status"/></th>
				<td>
<%--                        <select name="f_status" class="search_form" style="width:180px;" onchange="">
                           <option value="">ALL</option>
                           <logic:iterate id="codeVO" name="logStsList">
                               <option value='<bean:write name="codeVO" property="cd_val"/>'><bean:write name="codeVO" property="cd_nm"/></option>
                           </logic:iterate>
                       </select> --%>
                       <select name="f_status" class="search_form" style="width:80px;" onchange="">
                           <option value="">ALL</option>
                           <option value='S'>Success</option>
                           <option value='F'>Fail</option>
                       </select>
				</td>
				
                </tr>
            </table>
		</div>
	</div>
	
	<div class="wrap_result">
    	<div class="opus_design_grid">
    		<script type="text/javascript">comSheetObject('sheet1');</script>
    	</div>
		<table>
	        <tr>
	            <td width="55">
	                <bean:define id="tmpMapVal" name="EventResponse" property="mapVal"/>
	                <bean:define id="pagingVal" name="tmpMapVal"     property="paging"/>
	                <paging:options name="pagingVal" defaultval="200"/>
	            </td>                               
	            <td align="center">
	                <table>
	                    <tr>
	                        <td id="pagingTb" style='font-family: "Tahoma", "Arial", "Verdana";font-size: 11px;'>
	                        </td>
	                    </tr>
	                </table>        
	            </td>
	            <td width="55"></td>
	        </tr>
	    </table>
    </div>
</div>
</form>


<script type="text/javascript">
	var attr_extension = "<%= null!=roleBtnVO ?roleBtnVO.getAttr_extension():"" %>";
	doBtnAuthority(attr_extension);
	</script>


