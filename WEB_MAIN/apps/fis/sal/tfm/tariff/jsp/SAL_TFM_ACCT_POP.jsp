<%--
=========================================================
*@FileName   : SAL_TFM_ACCT_POP.jsp
*@FileTitle  : Ocean Rate Named Account Pop-up
*@Description: Ocean Rate Named Account Pop-up
*@author     : CLT
*@version    : 1.0 - 08/01/2017
*@since      : 08/01/2017

*@Change history:
*@author     : 
*@version    : 
*@since      : 
=========================================================
--%>

<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="clt-paging"   prefix="paging" %>

<!-- 공통 Header -->
<%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
<bean:define id="valMap"  name="EventResponse" property="mapVal"/>
<title><bean:message key="system.title"/></title>
<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css"/>

<!-- 해당 Action별 js -->
<script type="text/javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/PUP_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
<script type="text/javascript" src="./apps/fis/sal/tfm/tariff/script/SAL_TFM_ACCT_POP.js?ver=<%=CLT_JS_VER%>"></script>
<script type="text/javascript">

	function setupPage() {
		loadPage();
	}

	<!-- Customer/Vendor Type Code -->
	var CUST_VNDR_CD = '';
	var CUST_VNDR_VAL = '';
	<logic:notEmpty name="valMap" property="UNITCD">
		<bean:define id="custVndrTpList"  name="valMap" property="custVndrTpList"/>
		<logic:iterate id="codeVO" name="custVndrTpList">
			CUST_VNDR_CD  += '<bean:write name="codeVO" property="cd_val"/>' + '|';
			CUST_VNDR_VAL += '<bean:write name="codeVO" property="cd_nm"/>' + '|';
		</logic:iterate>
	</logic:notEmpty>
	CUST_VNDR_CD  = CUST_VNDR_CD.substring(0, CUST_VNDR_CD.length - 1);
	CUST_VNDR_VAL = CUST_VNDR_VAL.substring(0, CUST_VNDR_VAL.length - 1);

	<!-- Account Code -->
	var ACCT_CD = '';
	<logic:notEmpty name="valMap" property="UNITCD">
		<bean:define id="acctCdList" name="valMap" property="acctCdList"/>
		<logic:iterate id="acct_cd" name="acctCdList">
			ACCT_CD  += '<bean:write name="acct_cd"/>' + '|';
		</logic:iterate>
	</logic:notEmpty>
	ACCT_CD  = ACCT_CD.substring(0, ACCT_CD.length - 1);

</script>

<form name="form" method="POST" action="./">
	<!-- Command를 담는 공통 -->
	<input type="hidden" name="f_cmd"/>
	<input type="hidden" name="rt_no"/>

	<div class="layer_popup_title">
		<div class="page_title_area clear">
			<h2 class="page_title"><span>Named Account</span></h2>
			<div class="opus_design_btn"><!--
			--><button type="button" class="btn_accent" onclick="doWork('SAVE')" ><bean:message key="Save"/></button><!--
			--><button type="button" class="btn_normal"  onclick="doWork('CLOSE')"><bean:message key="Close"/></button>
			</div>
		</div>
	</div>
	<div class="layer_popup_contents">
		<div class="wrap_result">
			<div class="opus_design_grid" id="mainTable">
				<div class="opus_design_btn">
					<div class="grid_option_left">
						<button type="button" class="btn_normal" onClick="addRow();"><bean:message key="Add"/></button>
					</div>
				</div>
				<script type="text/javascript">comSheetObject('sheet1');</script>
			</div>
		</div>
	</div>
</form>