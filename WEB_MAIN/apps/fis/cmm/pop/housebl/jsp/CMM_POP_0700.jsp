<%/*=========================================================
			 *Copyright(c) 2014 CyberLogitec. All Rights Reserved.
			 *@FileName   : CMM_POP_0320.jsp
			 *@FileTitle  : ?
			 *@author     : CLT
			 *@version    : 1.0
			 *@since      : 2014/07/24
			 =========================================================*/%>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="clt-paging"   prefix="paging" %>
	<!-- 공통 Header -->
	<%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
	<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css" />
	<title><bean:message key="system.title"/></title>
	
	<!-- 일자 및 달력팝업 호출 -->
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/PUP_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/COM_FRT_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/apps/fis/cmm/pop/housebl/script/CMM_POP_0700.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/apps/fis/see/bmd/housebl/script/BL_CODE_UTIL.js?ver=<%=CLT_JS_VER%>"></script>
	

	<script type="text/javascript">
		function setupPage(){
			loadPage();
		}
	</script>
<form name="frm1" method="POST" action="./">

<div class="layer_popup_title">
	<!-- page_title_area -->
	<div class="page_title_area clear">
		<h2 class="page_title">
			<span><bean:message key="BKG_Copy"/></span>
		</h2>
		<!-- btn_div -->
		<div class="opus_design_btn">
			<button type="button" class="btn_normal" onclick="doWork('CLOSE')"><bean:message key="Close"/></button>
		</div>
	</div>
<%-- 	<div class="page_title_area clear">
		<!-- btn_div -->
		<table width="250" border="0" cellspacing="0" cellpadding="0">
			<tr>
				<td height="3"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
			</tr>
		</table>
		<div align="center">
		<span>Do you want to Copy?</span>
		<table width="250" border="0" cellspacing="0" cellpadding="0">
			<tr>
				<td height="3"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
			</tr>
		</table>
		</div>
		<div align="center">
			<button type="button" class="btn_normal" onclick="doWork('YES')">Yes</button>
			<button type="button" class="btn_normal" onclick="doWork('NO')">No</button>
		</div>
		<table width="250" border="0" cellspacing="0" cellpadding="0">
			<tr>
				<td height="3"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
			</tr>
		</table>
		<div>
		<table width="250" border="0" cellspacing="0" cellpadding="0">
			<tr>
				<td height="12"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
			</tr>
		</table>
		</div>
	</div>
 --%>
    <div style="font-size: 12px; margin:10px 0px 0px 15px;">
		<span class="warning_msg"></span>
	</div>
 	<div>
		<table width="250" border="0" cellspacing="0" cellpadding="0">
			<tr>
				<td height="2"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
			</tr>
		</table>
	</div>
	<div>

		<table border="0"  cellspacing="0" cellpadding="0">
			<tr align="left">
				<td width="10px"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
				<td width="50px"><input name="all_chk" id="all_chk" type="checkbox" onclick="allCheck(this)"><label for="all_chk"><bean:message key="All"/></label></td>
				<td width="45px"><input name="ar_chk" id="ar_chk" type="checkbox"><label for="ar_chk"><bean:message key="AR"/></label></td>
				<td width="45px"><input name="ap_chk" id="ap_chk" type="checkbox"><label for="ap_chk"><bean:message key="AP"/></label></td>
				<td width="45px"><input name="dc_chk" id="dc_chk" type="checkbox"><label for="dc_chk"><bean:message key="DC"/></label></td>
				<td width="60px" style="display: none" id = "col_rt_chk"><input name="rt_chk" id="rt_chk" type="checkbox"><label for="rt_chk"><bean:message key="BL_Rate"/></label></td>
				<td width="10px"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
			</tr>
		</table>
		<table  border="0" cellspacing="0" cellpadding="0">
			<tr>
				<td height="5"><img src="<%=CLT_PATH%>/web/img/main/blank.gif">
				</td>
			</tr>
		</table>
		<table id = "tb_hbl_etry_chk"  border="0"  cellspacing="0" cellpadding="0">
			<tr align="left">	
				<td width="7px"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
				<td width="70px" id = "col_shmt_itm_chk" ><input name="shmt_itm_chk" id="shmt_itm_chk" type="checkbox"><label for="shmt_itm_chk"><bean:message key="Shipment_Item"/></label></td>
				<td width="70px" style="display: none" id = "col_mrk_desc_chk" ><input name="mrk_desc_chk" id="mrk_desc_chk" type="checkbox"><label for="mrk_desc_chk"><bean:message key="Mark_Description"/></label></td>
				<td width="60px" id = "col_rmk_chk" ><input name="rmk_chk" id="rmk_chk" type="checkbox"><label for="rmk_chk"><bean:message key="Remark"/></label></td>
				<td width="*" id = "col_shpr_csne_chk" style="display: none"><input name="shpr_csne_chk" id="shpr_csne_chk" type="checkbox"><label for="shpr_csne_chk"><bean:message key="Shipper_Consignee"/></label></td>
			</tr>
		</table>
	</div>
	<table width="250" border="0" cellspacing="0" cellpadding="0">
		<tr>
			<td height="20"><img src="<%=CLT_PATH%>/web/img/main/blank.gif">
			</td>
		</tr>
	</table>
	<div align="center">
		<button type="button" class="btn_normal" onclick="doWork('YES')">OK</button>
	</div>
	</div>
</form>
<script>
	var pDoc = parent.parent.parent.document;
	hideProcess('WORKING', pDoc);
</script>