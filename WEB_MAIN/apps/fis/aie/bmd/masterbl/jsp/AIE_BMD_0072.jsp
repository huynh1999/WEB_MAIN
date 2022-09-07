<%
/*=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : 
*@FileTitle  :  
*@author     : Tuan.Chau
*@version    : 2.0
*@since      : 2014/07/28
=========================================================*/
%>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="clt-paging"   prefix="paging" %>

	<%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
	<title><bean:message key="system.title"/></title>
	<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css"/>
	
	<script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/AIR_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="./apps/fis/aie/bmd/masterbl/script/AIE_BMD_0072.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
	<base target="_self"/>
	
	<script language="javascript">
	var ofc_cd = "<%=userInfo.getOfc_cd()%>";
	
	function setupPage() {
		loadPage();
	}
	</script>
		
<form name="form" method="POST" action="./">
		<input	type="hidden" name="f_cmd"/>
		<input	type="hidden" name="f_CurPage"/>
		<input	type="hidden" name="file_name"/>
		<input	type="hidden" name="rd_param"/>
		<input	type="hidden" name="title"/>
		
		<input	type="hidden" name="intg_bl_seq"/>
	<div class="layer_popup_title">
		<div class="page_title_area">
		   <h2 class="page_title"><span><bean:message key="PRE-Pouch"/></span></h2>
		   <!-- btn_div -->
		   <div class="opus_design_btn">
			   <button type="button" class="btn_accent" onclick="doWork('PRINT')" id="btnPrint" name="btnPrint"><bean:message key="Print"/></button><!-- 
			 --><button type="button" class="btn_normal" onclick="doWork('CLOSE')" id="btnClose" name="btnClose"><bean:message key="Close"/></button>
		   </div>
		</div>
	</div>
	<div class="layer_popup_contents">
<div class="over_wrap" height="100%">
		<div class="wrap_search">
			<div class="opus_design_inquiry ">
				<table>
			        <tr>
			            <th width="130"><bean:message key="Office"/></th>
			        </tr>
			        <tr>
			        	<td width="70">
			                <input type="radio" name="ofc_for" id="ofc_for1" value="1"><label for="ofc_for1">TYO</label>
			            </td>
			            <td width="70">
			                <input type="radio" name="ofc_for" id="ofc_for2" value="2"><label for="ofc_for2">OSA</label>
			            </td>
			            <td></td>
			        </tr>
			    </table>
			</div>
		</div>
	</div>
</div>
</form>
