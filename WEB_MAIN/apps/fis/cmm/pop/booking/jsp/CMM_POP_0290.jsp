<%--
=========================================================
*@FileName   : CMM_POP_0290.jsp
*@FileTitle  : CMM
*@Description: booking search pop
*@author     : 이광훈 - booking search pop
*@version    : 1.0 - 01/28/2009
*@since      : 01/28/2009

*@Change history:
=========================================================
--%>

<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="clt-paging"   prefix="paging" %>
	<!-- 공통 Header -->
	<%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
	<title><bean:message key="system.title"/></title>
	<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css"/>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/PUP_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="./apps/fis/cmm/pop/booking/script/CMM_POP_0290.js?ver=<%=CLT_JS_VER%>"></script>
	
	<base target="_self"/>
	
	<script type="text/javascript">
	
		function showMsg(){
			var rslt =  '<bean:write name="EventResponse" property="objVal"/>';
			
			if(rslt == "WORK"){
				ComClosePopup("SUCCESS");
			}else if(rslt == "FAIL"){
				alert('Fail!!!');
			}    
		}
		
		function setupPage(){
			showMsg();
			loadPage();
		}
	</script>
	
<form name="form" method="POST" action="./CMM_POP_0290.clt">
<!--Command를 담는 공통-->
<input	type="hidden" name="f_cmd"/>
<input	type="hidden" name="bkg_seq"/>
<input	type="hidden" name="bkg_sts_cd"/>

	<div class="layer_popup_title">	
		<!-- page_title_area(S) -->
		<div class="page_title_area">
		   	<h2 class="page_title">
		   		<div id="title_reject" style="display:none"><bean:message key="Reject"/></div>
		   		<div id="title_cancel" style="display:none"><bean:message key="Cancel"/></div>
		   		<bean:message key="Reason"/>
		   	</h2>
		   	<!-- btn_div -->
		   	<div class="opus_design_btn">
			   	<div class="opus_design_btn">
					<button type="button" class="btn_accent" onclick="doWork('SAVE')"><bean:message key="Save"/>
				   		<!-- div id="reject" style="display:none"><bean:message key="Reject"/></div>
						<div id="cancel" style="display:none"><bean:message key="Cancel"/></div -->
					</button><!-- 
				 --><button type="button" class="btn_normal" onclick="doWork('CLOSE')"><bean:message key="Close"/></button>
		   		</div>
		   </div>
		</div>
	</div>
	<div class="layer_popup_contents"> 
		<div class="wrap_result">
			<div class="opus_design_inquiry">
				<table>
					<tr>
						<th style="color: red; text-align: left">
							<div id="msg_reject" style="display:none">You have to fill in the reason why you reject the booking.</div>
							<div id="msg_cancel" style="display:none">You have to fill in the reason why you cancel the booking.</div>
						</th>
					</tr>
					<tr height="17px"></tr>
					<tr>								
						<td align="left">
							<table>
								<tr>
									<textarea name="rsn_txt" id="rsn_txt" cols="200" rows="6" maxlength="1000" onkeypress="keyPress_maxLength(this);" onkeyup="keyUp_maxLength(this);" onblur="keyUp_maxLength(this);" style="ime-mode:auto; text-transform:none; width:365px; height:140px;"></textarea>
								</tr>
							</table>		
						</td>
					</tr>
				</table>
			</div>
		</div>	
	</div>
</form>
