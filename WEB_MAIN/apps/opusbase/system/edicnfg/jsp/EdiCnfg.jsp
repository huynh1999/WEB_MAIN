<%--
=========================================================
*Copyright(c) 2008 CyberLogitec. All Rights Reserved.
=========================================================

=========================================================
*@FileName   : EdiCnfg.jsp
*@FileTitle  : Edi Config Settings
*@Description: Edi Config Settings
*@author     : 
*@version    : 
*@since      : 

*@Change history:
=========================================================
--%>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="clt-paging"   prefix="paging" %>
	<!-- 공통 Header -->
	<%@include file="./../../../../../../../../syscommon/header/CLTHeader.jsp"%>
	
	<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css"/>
	
    <bean:define id="valMap"  name="EventResponse" property="mapVal"/>
    	
	<!-- 해당 Action별 js -->
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
    <script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/SYS_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
    <script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/FMS_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="./apps/opusbase/system/edicnfg/script/EdiCnfg.js?ver=<%=CLT_JS_VER%>"></script>
	
	<script>
	
	<!-- ###Tp 코드## -->
	var TPCD1 = '';
	var TPCD2 = '';
	<% boolean isBegin = false; %>
    <bean:define id="tpList" name="valMap" property="TpCDList"/>
	<logic:iterate id="ComCdDtlVO" name="tpList">
		<% if(isBegin){ %>
			TPCD1+= '|';
			TPCD2+= '|';
		<% }else{
			  isBegin = true;
		   } %>
		TPCD1+= '<bean:write name="ComCdDtlVO" property="cd_val"/>';
		TPCD2+= '<bean:write name="ComCdDtlVO" property="cd_nm"/>';
	</logic:iterate>
	
		var ln_lang_tp = "<%=userInfo.getUse_lang_cd()%>";
		function setupPage(){
		 	loadPage();
		}
		
	</script>
<form method="post" name="form" onSubmit="return false;">
	<input type="hidden" name="f_cmd"> 
	<input type="hidden" name="f_CurPage">
	
	<div class="page_title_area clear">
	   <h2 class="page_title"><button type="button"><%=LEV3_NM%></button></h2>
	   <!-- btn_div -->
	   <div class="opus_design_btn TOP">
	   <!-- 
		   	<button type="button" class="btn_accent" onclick="doWork('SEARCHLIST');"><bean:message key="Search"/></button> 
			<button type="button" class="btn_normal" onclick="doWork('ROWADD')"><bean:message key="Add"/></button>
			<button type="button" class="btn_normal" id="btnSave" onclick="doWork('SAVE')"><bean:message key="Save"/></button> 
		 -->
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
	<!-- wrap_search(S) -->
	<!-- #535: [SBS] 다국어 처리 V1.0 2차 -->
	<div class="wrap_search">
		<div class="opus_design_inquiry entry_pannel">
			<table>
				<colgroup>
				<col width="40" />
				<col width="80" />
				<col width="110" />
				<col width="80" />
				<col width="110" />
				<col width="80" />
				<col width="*" />
				</colgroup>
				<tbody>
					<tr>
						<th>SCAC&nbsp;</th>
						<td>
							<input tabindex="text" maxlength="4" value="" name="f_scac" id="f_scac" style="width: 100px;" dataformat="engup" onKeyPress="">
						</td>
						<th>TP&nbsp;</th>
						<td>
							<!--  input tabindex="text" maxlength="3" value="" name="f_tp" id="f_tp" style="width: 100px;" onKeyPress="" -->
							<select name="f_tp" style="width:55px;" class="search_form">
								<option value=""></option>
								    <logic:iterate id="ComCdDtlVO" name="tpList">
											<option value="<bean:write name="ComCdDtlVO" property="cd_val"/>"><bean:write name="ComCdDtlVO" property="cd_nm"/></option>
									</logic:iterate>
							</select>							
						</td>
						<th></th>
						<td>
						</td>
						<td>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
	
	<div class="wrap_result">
		<div class="opus_design_grid">
			<script language="javascript">comSheetObject('sheet1');</script>
		</div>
		<div class="opus_design_inquiry">
		
    </div>
	</div>
</div>	
</form>
<script>
    var pDoc = parent.parent.parent.document;
    hideProcess('WORKING', pDoc);   
</script>
</bod>
</html>