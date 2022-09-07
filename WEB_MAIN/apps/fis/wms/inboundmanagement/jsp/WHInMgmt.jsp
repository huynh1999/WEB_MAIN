<%
/*--=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : WHInMgmt.jsp
*@FileTitle  : Inbound Booking Management
*@author     : Tin.Luong - DOU Network
*@version    : 1.0
*@since      : 2016.04.27
=========================================================--*/
%>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="clt-paging"   prefix="paging" %>
<%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
	<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css"/>
	<title><bean:message key="system.title"/></title> 
    <script type="text/javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/CalculationUtil.js?ver=<%=CLT_JS_VER%>"></script>
    <script type="text/javascript" src="<%=CLT_PATH%>/js/common/ModalCalendar.js?ver=<%=CLT_JS_VER%>"></script>
    <script type="text/javascript" src="<%=CLT_PATH%>/js/common/CoFormControl.js?ver=<%=CLT_JS_VER%>"></script>
    <script type="text/javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/SUP_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/COM_FRT_MSG.js?ver=<%=CLT_JS_VER%>"></script>
    <script type="text/javascript" src="./apps/fis/wms/inboundmanagement/script/WHInMgmt.js?ver=<%=CLT_JS_VER%>"></script>
    
	<script type="text/javascript" src="./js/common/message/<%=CLT_MSG_PATH%>/WMS_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/autocomplete_ui.js?ver=<%=CLT_JS_VER%>"></script>
	<bean:define id="cdMap"  name="EventResponse" property="mapVal"/>
	<bean:define id="MsList" name="cdMap" property="wb_src_cd"/>
	
<% 

String req_wib_bk_no   = "";
String req_wh_cd   = "";
String req_wh_nm   = "";
String req_bk_sts_cd   = "";
String fwd_bk_no   = "";
String uploadfile   = "";
String req_ctrt_no   = "";

//#1940 [WMS4.0] Inbound / Outbound Status 색상 구분 이후 추가 개선 사항
String BG_BOOKED   = "#8BBDFF";
String BG_COMPLETE = "#FAED7D";
String BG_CANCEL   = "#FFA7A7";
String BG_INIT     = "#f4f6f6";

	//WMS4.0 RATE 자리수 소수점 8자리 까지 늘림
	String wmsRuPoint = (String)application.getAttribute("FRT_RATE_POINT_EIGHT_YN");
	if(wmsRuPoint == null){wmsRuPoint = "N";} 
try {
	req_wib_bk_no   = request.getParameter("req_wib_bk_no")== null?"":request.getParameter("req_wib_bk_no");
	req_wh_cd   = request.getParameter("req_wh_cd")== null?"":request.getParameter("req_wh_cd");
	req_wh_nm   = request.getParameter("req_wh_nm")== null?"":request.getParameter("req_wh_nm");
	req_bk_sts_cd = request.getParameter("bk_sts_cd")== null?"ALL":request.getParameter("bk_sts_cd");
	fwd_bk_no   = request.getParameter("fwd_bk_no")== null?"":request.getParameter("fwd_bk_no");
	uploadfile   = request.getParameter("uploadfile")== null?"":request.getParameter("uploadfile");
	req_ctrt_no   = request.getParameter("req_ctrt_no")== null?"":request.getParameter("req_ctrt_no");
}catch(Exception e) {
	out.println(e.toString());
}	

%>
	<bean:define id="HandlingUnit" name="cdMap" property="pkg_unit_info"/>
	<bean:define id="MsList" name="cdMap" property="ord_tp_cd"/>
	<bean:define id="MsList_tpcd" name="cdMap" property="load_tp_cd"/>
	<bean:define id="whcombo" name="cdMap" property="warehouse"/>
	<bean:define id="currCd" name="cdMap" property="currCdList"/>
	<bean:define id="skuCd" name="cdMap" property="skuCdList"/>
	<bean:define id="tpszList"  name="cdMap" property="cntrTpszList"/>
	<bean:define id="rate_tp_cd" name="cdMap" property="rate_tp_cd"/>
	<bean:define id="FrtList" name="cdMap" property="Freight"/>
	<bean:define id="lic_plat_ut_list" name="cdMap" property="lic_plat_ut_list"/>
	<bean:define id="trkTpszList" name="cdMap" property="trkTpszList"/>

	<script  type="text/javascript">

	//#1940 [WMS4.0] Inbound / Outbound Status 색상 구분 이후 추가 개선 사항
	var bgBooked   = "<%=BG_BOOKED %>";
	var bgComplete = "<%=BG_COMPLETE %>";
	var bgCancel   = "<%=BG_CANCEL %>";
	var bgInit     = "<%=BG_INIT %>";
	   
	var handlingUnitCode = "";
	var handlingUnitText = "";
	
	'<logic:notEmpty name="HandlingUnit">'
		'<logic:iterate id="ComCdDtlVO" name="HandlingUnit">'
			handlingUnitCode+="|"+'<bean:write name="ComCdDtlVO" property="codeCd"/>';
			handlingUnitText+="|"+'<bean:write name="ComCdDtlVO" property="codeCd"/> :<bean:write name="ComCdDtlVO" property="codeNm"/>';
		'</logic:iterate>'
		
		//handlingUnitCode = handlingUnitCode.substring(1);
		//handlingUnitText = handlingUnitText.substring(1);
	'</logic:notEmpty>'
	
	var currCdListText = "";
	var currCdListCode = "";
	
	'<logic:notEmpty name="MsList">'
		'<logic:iterate id="codeVO" name="MsList">'
			currCdListCode+="|"+'<bean:write name="codeVO" property="code"/>';
			currCdListText+="|"+'<bean:write name="codeVO" property="name"/>';
		'</logic:iterate>'
		
		currCdListCode = currCdListCode.substring(1);
		currCdListText = currCdListText.substring(1);
	'</logic:notEmpty>'
	
	var load_tp_cdCode = "";
	var load_tp_cdText = "";
	'<logic:notEmpty name="MsList_tpcd">'
		'<logic:iterate id="codeVO" name="MsList_tpcd">'
			load_tp_cdCode+="|"+'<bean:write name="codeVO" property="code"/>';
			load_tp_cdText+="|"+'<bean:write name="codeVO" property="name"/>';
		'</logic:iterate>'
		
		load_tp_cdCode = load_tp_cdCode.substring(1);
		load_tp_cdText = load_tp_cdText.substring(1);
	'</logic:notEmpty>'
	
	var WHCDLIST = "";
	var WHNMLIST = "";
	<bean:define id="whcombo" name="cdMap" property="warehouse"/>
    <logic:iterate id="WhVO" name="whcombo">
           WHCDLIST+= '|';
           WHNMLIST+= '|';
           WHCDLIST+= '<bean:write name="WhVO" property="wh_cd"/>';
           WHNMLIST+= '<bean:write name="WhVO" property="wh_nm"/>';
    </logic:iterate>
    
	var currCdText = "";
	var currCdCode = "";
	
	'<logic:notEmpty name="currCd">'
		'<logic:iterate id="item" name="currCd">'
			currCdCode+="|"+'<bean:write name="item" property="cd_val"/>';
			currCdText+="|"+'<bean:write name="item" property="cd_nm"/>';
		'</logic:iterate>'
		
		currCdCode = currCdCode.substring(1);
		currCdText = currCdText.substring(1);
	'</logic:notEmpty>'
	
	var skuCdText = "";
	var skuCdCode = "";
	var skuSerialChkInfo = [];  //#2333 [WMS4.0] MOBILE VALIDATION OF SERIAL # (NO DUPLICATE)
	var temp = "";
	
	'<logic:notEmpty name="skuCd">'
		'<logic:iterate id="skuitem" name="skuCd">'
			skuCdCode+="|"+'<bean:write name="skuitem" property="item_cd"/>';
			skuCdText+="|"+'<bean:write name="skuitem" property="item_nm"/>';
			//#2333 [WMS4.0] MOBILE VALIDATION OF SERIAL # (NO DUPLICATE) (S)
			temp = "";
			temp += '<bean:write name="skuitem" property="item_cd"/>';
			temp += '|<bean:write name="skuitem" property="use_serial_flag"/>';
			temp += '|<bean:write name="skuitem" property="serial_req_flag"/>';
			temp += '|<bean:write name="skuitem" property="serial_uniq_flag"/>';
			skuSerialChkInfo.push(temp);
			//#2333 [WMS4.0] MOBILE VALIDATION OF SERIAL # (NO DUPLICATE) (E)
		'</logic:iterate>'
		skuCdCode = skuCdCode.substring(1);
		skuCdText = skuCdText.substring(1); 
	'</logic:notEmpty>'

	var rate_tp_cdText = "";
    var rate_tp_cdCode = "";

    <logic:notEmpty name="rate_tp_cd">
    <logic:iterate id="item" name="rate_tp_cd">
    rate_tp_cdCode+="|"+'<bean:write name="item" property="code"/>';
    rate_tp_cdText+="|"+'<bean:write name="item" property="name"/>';
    </logic:iterate>

    rate_tp_cdCode = rate_tp_cdCode.substring(1);
    rate_tp_cdText = rate_tp_cdText.substring(1);
    </logic:notEmpty>
	
	var TPCD1 = '';
    var TPCD2 = '';
    var TPCD3 = '';
    <% boolean isBegin = false; %>
    <!--Role 코드조회-->
    <logic:iterate id="codeVO" name="tpszList">
        <% if(isBegin){ %>
            TPCD1+= '|';
            TPCD2+= '|';
            TPCD3+= '|';
        <% }else{
              isBegin = true;
           } %>
        TPCD1+= '<bean:write name="codeVO" property="cntr_tpsz_cd"/>';
        TPCD2+= '<bean:write name="codeVO" property="cntr_tpsz_cd"/>';
        TPCD3+= '<bean:write name="codeVO" property="cntr_grp_cd"/>';
    </logic:iterate>
    
    /*Freight code  */
    var FreightText = ' |';
    var FreightCode = ' |';
    <%boolean isBegin_Freight = false; %>
    <bean:define id="FrtList" name="cdMap" property="Freight"/>
    <logic:iterate id="FrtVO" name="FrtList">
    <% if(isBegin_Freight){ %>
    FreightCode+= '|';
    FreightText+= '|';
    <% }else{
          isBegin_Freight = true;
       } %>
    FreightCode+= '<bean:write name="FrtVO" property="frt_cd" filter="false"/>';
    FreightText+= '<bean:write name="FrtVO" property="frt_cd" filter="false"/>'+': '+'<bean:write name="FrtVO" property="frt_cd_nm" filter="false"/>';
    </logic:iterate>

	// License Plate No
    var LIC_PLATE_CD = '';
    var LIC_PLATE_TEXT = '';
    <% isBegin = false; %>
    <bean:define id="lic_plat_ut_list" name="cdMap" property="lic_plat_ut_list"/>
    <logic:iterate id="LICVO" name="lic_plat_ut_list">
    <% if(isBegin){ %>
	    LIC_PLATE_CD+= '|';
	    LIC_PLATE_TEXT+= '|';
    <% }else{
          isBegin = true;
       } %>
       LIC_PLATE_CD+= '<bean:write name="LICVO" property="lic_plat_ut_cd"/>';
       LIC_PLATE_TEXT+= '<bean:write name="LICVO" property="lic_plat_ut_cd"/>';
    </logic:iterate>
    
	// Truck Code List
    var TRUCK_CD = '';
    var TRUCK_TEXT = '';
    <% isBegin = false; %>
    <bean:define id="trkTpszList" name="cdMap" property="trkTpszList"/>
    <logic:iterate id="TRKVO" name="trkTpszList">
    <% if(isBegin){ %>
	    TRUCK_CD+= '|';
	    TRUCK_TEXT+= '|';
    <% }else{
          isBegin = true;
       } %>
       TRUCK_CD+= '<bean:write name="TRKVO" property="trk_tp_ct"/>';
       TRUCK_TEXT+= '<bean:write name="TRKVO" property="descr"/>';
    </logic:iterate>
    
	</script> 
	
	
<script type="text/javascript">
	function setupPage(){
		//WMS4.0 RATE 자리수 소수점 8자리 까지 늘림
		gJsWmsRuPoint = '<%=wmsRuPoint%>';
		var errMessage = "";
		if (errMessage.length >= 1) {
			ComShowMessage(errMessage);
		} // end if
		loadPage(true);
	}
	//[#1307][INBOUND MANAGEMENT] Cannot auto suggestion when input name
	var AUTOCOMPLETE_YN = 'Y';
	<logic:notEmpty name="cdMap" property="autocompleteYn">
		AUTOCOMPLETE_YN = '<bean:write name="cdMap" property="autocompleteYn"/>';
	</logic:notEmpty>
</script>
<form id="form" name="form" method="POST" action="./WHInMgmt.clt" enctype="multipart/form-data">
<input type="hidden" name="fwd_bk_no" id="fwd_bk_no" value="<%= fwd_bk_no %>" />
<input type="hidden" name="uploadfile" id="uploadfile" value="<%= uploadfile %>" />
<input type="hidden" name="form_mode" value="NEW" />
<input type="hidden" id="f_cmd" value=""/>
<input type="hidden" name="ofc_cd" id="ofc_cd" value="<%=userInfo.getOfc_cd()%>" />
<input type="hidden" name="wh_ofc_cd" id="wh_ofc_cd" value="" />
<input type="hidden" name="wh_curr_cd" id="wh_curr_cd" value="" />
<input type="hidden" name="def_wh_cd" id="def_wh_cd" value="<%=userInfo.getDef_wh_cd()%>" />
<input type="hidden" name="def_wh_nm" id="def_wh_nm" value="<%=userInfo.getDef_wh_nm()%>" />
<input type="hidden" name="def_wh_ctrt_no" id="def_wh_ctrt_no" value="<%=userInfo.getDef_wh_ctrt_no()%>" />
<input type="hidden" name="def_wh_ctrt_nm" id="def_wh_ctrt_nm" value="<%=userInfo.getDef_wh_ctrt_nm()%>" />
<input type="hidden" name="def_wh_rtp_no" id="def_wh_rtp_no"/>
<input type="hidden" name="def_owner_cd" id="def_owner_cd"/>
<input type="hidden" name="sel_wib_bk_no" id="sel_wib_bk_no" />
<input type="hidden" name="form_mode" id="form_mode" />
<input type="hidden" name="sel_tab" id="sel_tab" />
<input type="hidden" name="sel_ctrt_no" id="sel_ctrt_no" />
<input type="hidden" name="sel_ctrt_nm" id="sel_ctrt_nm" />
<input type="hidden" name="sel_wh_cd" id="sel_wh_cd" />
<input type="hidden" name="sel_wh_nm" id="sel_wh_nm" />
<input type="hidden" name="ctrt_no_org" id="ctrt_no_org" />
<input type="hidden" name="wh_cd_org" id="wh_cd_org" />
<input type="hidden" name="svc_tp_cd" value="WB" />
<input type="hidden" name="doc_ref_tp_cd" value="WIB" />
<input type="hidden" name="doc_tp_cd" value="WIB" />
<input type="hidden" name="doc_ref_no" value="" />
<input type="hidden" name="doc_ref_no2" value="" />

<input type="hidden" name="req_wib_bk_no" id="req_wib_bk_no" value="<%=req_wib_bk_no%>" />
<input type="hidden" name="req_wh_cd" id="req_wh_cd" value="<%=req_wh_cd%>" />
<input type="hidden" name="req_wh_nm" id="req_wh_nm" value="<%=req_wh_nm%>" />
<input type="hidden" name="req_bk_sts_cd" id="req_bk_sts_cd" value="<%=req_bk_sts_cd%>" />
<input type="hidden" name="req_ctrt_no" id="req_ctrt_no" value="<%=req_ctrt_no%>" />

<!-- #2807 [BINEX WMS4.0] LOT04, LOT05 NICKNAME CUSTOMIZATION -->
<input type="hidden" id="lot4_alias" />
<input type="hidden" id="lot5_alias" />

<!-- #1209 [WMS4.0][Release Test]Inbound Management - Excel Upload -->
<input type="hidden" name="xls_no" id="xls_no" />

<input type="hidden" name="user_id" id="user_id"  value="<%=userInfo.getUsrid()%>" />
<input type="hidden" name="pageurl" id="pageurl" value="WHInMgmt.clt"/>
<div class="page_title_area clear">
	<!-- page_title(S) -->
	<h2 class="page_title" id="bigtitle"><button type="button"><span><%=LEV3_NM%></span></button></h2>
	<!-- page_title(E) -->
	<!-- opus_design_btn(S) -->
	<div class="opus_design_btn TOP">
   		<%-- <button type="button" class="btn_accent" name="btn_search" 			id="btn_search" 			onclick="doWork('SEARCHLIST')" 	<%= null != roleBtnVO? "style='display:none;' btnAuth='" + roleBtnVO.getAttr1() + "'"  : "" %>><bean:message key="Search"/></button><!-- 
			--><button type="button" class="btn_normal" name="btn_new" 				id="btn_new"				onclick="doWork('NEW')" 		<%= null != roleBtnVO? "style='display:none;' btnAuth='" + roleBtnVO.getAttr2() + "'"  : "" %>><bean:message key="New"/></button><!--
			--><button type="button" class="btn_normal" name="btnSave" 			    id="btnSave" 				onclick="doWork('SAVE')" 		<%= null != roleBtnVO? "style='display:none;' btnAuth='" + roleBtnVO.getAttr3() + "'"  : "" %>><bean:message key="Save"/></button><!-- 
			--><button type="button" class="btn_normal" name="btn_delete" 			id="btn_delete" 			onclick="doWork('DELETE')" 		<%= null != roleBtnVO? "style='display:none;' btnAuth='" + roleBtnVO.getAttr4() + "'"  : "" %> ><bean:message key="Delete"/></button><!-- 
			--><button type="button" class="btn_normal" name="btn_cancel" 			id="btn_cancel"				onclick="doWork('CANCEL')" 		<%= null != roleBtnVO? "style='display:none;' btnAuth='" + roleBtnVO.getAttr3() + "'"  : "" %>><bean:message key="C_Cancel"/></button><!--
			--><button type="button" class="btn_normal" name="btn_Putaway" 			id="btn_Putaway"			onclick="doWork('btn_Putaway')" <%= null != roleBtnVO? "style='display:none;' btnAuth='" + roleBtnVO.getAttr3() + "'"  : "" %>><bean:message key="Putaway"/></button><!--
			--><button type="button" class="btn_normal" name="btn_excel" 			id="btn_excel" 				onclick="doWork('EXCEL')" 		<%= null != roleBtnVO? "style='display:none;' btnAuth='" + roleBtnVO.getAttr6() + "'"  : "" %>><bean:message key="Excel"/></button><!--
			--><button type="button" class="btn_normal" name="btnPrint" 			id="btnPrint" 				onclick="doWork('PRINT')" 		<%= null != roleBtnVO? "style='display:none;' btnAuth='" + roleBtnVO.getAttr5() + "'"  : "" %>><bean:message key="Print"/></button><!--
			--><button type="button" class="btn_normal" name="link_Excel_Download" 	id="link_Excel_Download" 	onclick="doWork('link_Excel_Download')" <%= null != roleBtnVO? "style='display:none;' btnAuth='" + roleBtnVO.getAttr6() + "'"  : "" %>><bean:message key="Template_DL"/></button><!--
			--><button type="button" class="btn_normal" name="link_Excel_Upload" 	id="link_Excel_Upload" 		onclick="doWork('link_Excel_Upload')"	<%= null != roleBtnVO? "style='display:none;' btnAuth='" + roleBtnVO.getAttr6() + "'"  : "" %>><bean:message key="Excel_UL"/></button><!--
	 		--> --%>
	 </div>
	<!-- opus_design_btn(E) -->
	<div class="location">
        <!-- location 내용 동적생성 (별도 코딩 불필요) -->
			<span><%=LEV1_NM%></span> &gt;
		    <span><%=LEV2_NM%></span> &gt;
		    <span><%=LEV3_NM%></span>
		    <a href="" class="ir">URL Copy</a>
		</div>
</div>
<div class="over_wrap" height="100%">
<div class= "wrap_search_tab">

	<div class="opus_design_inquiry">
		<table>
			<colgroup>
					<col width="50">
					<col width="*">
			</colgroup>
			<tbody>
				<tr>
					<td><select style="width: 100px;" name="list_in_search_tp" id="list_in_search_tp" class="search_form" onchange="list_in_search_tp_onchange();">
							<option value='CUST_ORD_NO'>Order No.</option>
							<option value='WIB_BK_NO'>Booking No.</option>
							</select></td>
					<td><input name="list_in_no" id = "list_in_no" type="text" dataformat="excepthan" onblur="strToUpper(this);" style="width: 190px;ime-mode:disabled;text-transform:uppercase;" onKeyDown="if(event.keyCode==13){doWork('SEARCHLIST');}"/></td>
				</tr>
			</tbody>
		</table>
	</div>
	<!--showseal S-->
	<div id="showseal" style="left: 415px;top: 242px;position: absolute;display: none;z-index: 9999;height: 131px;width: 220px;border: 4px solid #aacef4;visibility: visible;color: black;background-color: white;padding: 5px;">
		<div>
			<h3><bean:message key="Seal_No"/></h3>
			<table class = "grid_2">
				<tr>
					<td>
						<input name="seal_no1" id="seal_no1" type="text" style="ime-mode:disabled;text-transform:uppercase;width:100%" id="seal_no1" maxlength="30" dataformat="etc" />
					</td>
				</tr>
				<tr>
					<td>
						<input name="seal_no2" id="seal_no2" type="text" style="ime-mode:disabled;text-transform:uppercase;width:100%" id="seal_no2" maxlength="30" dataformat="etc" />
					</td>
				</tr>
				<tr>
					<td>
						<input name="seal_no3" id="seal_no3" type="text" style="ime-mode:disabled;text-transform:uppercase;width:100%" id="seal_no3" maxlength="30" dataformat="etc" />
					</td>
				</tr>
			</table>
		</div>
		<div align="center">
           <button align="center" class="btn_etc" type="button" onclick="btn_seal_OK();"><bean:message key="OK"/></button><!-- 
			--><button align="center" class="btn_etc" type="button" onclick="btn_seal_Close();"><bean:message key="Close"/></button>
		</div>
	</div>
	<!--showaddr S  -->
	<div id="showaddr" style="left: 752px;top: 125px;position: absolute;display: none;z-index: 9999;height: 152px;width: 360px;border: 4px solid #aacef4;visibility: visible;color: black;background-color: white;padding: 5px;">
	<div>
		<h3><bean:message key="Address"/></h3>
		<table class = "grid_2">
			<tr>
				<td>
					<textarea name="addr1" id="addr1" maxlength="500" style="width:100%;height:90px; ime-mode:disabled; text-transform:uppercase;resize:none;" onblur="strToUpper(this);"></textarea>
				</td>
			</tr>
		</table>
	</div>
	<div align="center">
		<button align="center" class="btn_etc" type="button" onclick="btn_addr_OK();"><bean:message key="OK"/></button><!-- 
		 --><button align="center" class="btn_etc" type="button" onclick="btn_addr_Close();"><bean:message key="Close"/></button>
	</div>
	</div>
</div>
<div class= "wrap_result_tab">
	<ul id="ulTab" class="opus_design_tab">
        <li id=Tab01 class="nowTab"><a href="#" style="cursor:hand;" onClick="javascript:goTabSelect('01');"><span><bean:message key="FORM"/></span></a></li>
        <li id=Tab02><a href="#" style="cursor:hand;" onClick="javascript:goTabSelect('02');"><span><bean:message key="Freight"/></span></a></li>
        <li id=Tab03><a href="#" style="cursor:hand;" onClick="javascript:goTabSelect('03');"><span><bean:message key="Doc_Detail"/></span></a></li>
        <li id=Tab04><a href="#" style="cursor:hand;" onClick="javascript:goTabSelect('04');"><span><bean:message key="Attachment"/></span></a></li>
    </ul>
 <!-- Tab1 - FORM (S)  -->
 <div id="tabLayer" name="tabLayer" style="display:inline">  
 	<div class="TB_input" id="divForm" name="divForm">
	<div class= "opus_design_inquiry" style="width:1200px;">
		<table>
			<colgroup>
				<col width="50">
				<col width="155">
				<col width="50">
				<col width="100">
				<col width="50">
				<col width="195">
				<col width="50">
				<col width="*">
			</colgroup>
			<tr>
				<th><bean:message key="Warehouse"/></th>
				<td colspan="3"><bean:define id="MsList" name="cdMap" property="warehouse"/>
					<select name="wh_cd" id="wh_cd" class="search_form" style="width: 190px;" required>
						<logic:iterate id="codeVO" name="MsList">
							<option value='<bean:write name="codeVO" property="wh_cd"/>'><bean:write name="codeVO" property="wh_nm"/></option>
						</logic:iterate>
					</select>
					<input type="hidden" name="label_unit" id="label_unit" />
					<input type="hidden" name="sum_bx_label_qty" id="sum_bx_label_qty" />
					<input type="hidden" name="rcv_cnt" id="rcv_cnt" value="0"/>
				</td>
				<th><bean:message key="Order_No"/></th>
				<td colspan="3"><input name="cust_ord_no" required id="cust_ord_no" type="text" dataformat="engup" otherchar = "<%=WMS_OTHER_CHAR%>" onblur="strToUpper(this);" maxlength="100" style="width:255px;ime-mode:disabled;text-transform:uppercase;"/><!-- 
					 --><input name="wib_bk_no" id="wib_bk_no" type="text" tabindex="-1" dataformat="etc" style="width:125px;" readonly="readonly"/>
				</td>
			</tr>
			<tr><td colspan="8"><p class="line_bluedot"></p></td></tr>
			<tr>
				<th><bean:message key="Contract_No"/></th>
				<td  colspan="3"><input name="ctrt_no" id="ctrt_no" type="text" style="ime-mode:disabled;text-transform:uppercase;width:100px;" dataformat="excepthan" onblur="strToUpper(this);" maxlength="10" required="required"
									OnKeyDown="if(event.keyCode==13){getCtrtInfo(this);}" onblur="strToUpper(this);getCtrtInfo(this);" onChange="getCtrtInfo(this)"/><!-- 						
					 --><button type="button" name="btn_ctrt_no" id="btn_ctrt_no" class="input_seach_btn" tabindex="-1" onclick="doWork('btn_ctrt_no');"  ></button><!-- 
					 --><input name="ctrt_nm" id="ctrt_nm" type="text" style="ime-mode:disabled;text-transform:uppercase;width:235px;" dataformat="excepthan" onblur="strToUpper(this);" OnKeyDown="if(event.keyCode==13){CtrtPopup('form');}" required/><!-- 
					 --><input name="rtp_no" id="rtp_no" type="hidden"/>
				</td>
				<th><bean:message key="Status"/></th>
				<td><input name="bk_sts_nm" id="bk_sts_nm" type="text"  dataformat="etc" tabindex="-1" style="width:115px;border-width:0;font-weight: bold;" readonly="readonly"/><!-- #1940 [WMS4.0] Inbound / Outbound Status 색상 구분 이후 추가 개선 사항  
					 --><input name="bk_sts_cd" id="bk_sts_cd" type="hidden" />
				</td>
				<th><bean:message key="Order_Type"/></th>
				<td><bean:define id="MsList" name="cdMap" property="ord_tp_cd"/>
					<select name="ord_tp_cd" id="ord_tp_cd" class="search_form" style="width:120px;">
						<logic:iterate id="codeVO" name="MsList">
							<option value='<bean:write name="codeVO" property="code"/>'><bean:write name="codeVO" property="name"/></option>
						</logic:iterate>
					</select>
				</td>
			</tr>
			<tr>
				<th><bean:message key="Owner"/></th>
				<td colspan="3">
					<input type="hidden" name="owner_cd" id="owner_cd" type="text" style="width:100px;ime-mode:disabled;text-transform:uppercase;" dataformat="excepthan" onBlur="strToUpper(this);CustomerPopup('owner_cd');" maxlength="10" required><!-- 
				 --><input name="owner_nm" id="owner_nm" required type="text" style="width:339px;text-transform:uppercase;" onblur="strToUpper(this);" onKeyPress="if(event.keyCode==13){on_enter_customer('owner_cd', this.value);}" dataformat="excepthan" maxlength="500"  /><!-- 
				 --><button type="button" name="btn_owner_cd" id="btn_owner_cd" class="input_seach_btn" tabindex="-1" onclick="CustomerPopup('owner_cd')"  ></button>
				</td>
				<th><bean:message key="Putaway"/></th>
				<td><input name="putawy_sts_nm" id="putawy_sts_nm" type="text"  dataformat="etc" tabindex="-1" style="width:115px;border-width:0;font-weight: bold;background:<%=BG_INIT %>" readonly="readonly"/>
				</td>

			</tr>
			<tr>
				<th></th>
				<td rowspan="3" colspan="3"><textarea required name="owner_addr1" id="owner_addr1" maxlength="300" 
								style="width:368px;height:87px; ime-mode:disabled; text-transform:uppercase;resize:none;" onblur="strToUpper(this);"></textarea></td>

				<th><bean:message key="Booking_Date"/></th>
				<td><input name="bk_date" id="bk_date" required type="text" style="width:85px;" dataformat="mdy" maxlength="10" OnBeforeDeactivate="ComAddSeparator(this)" OnBeforeActivate="ComClearSeparator(this)" 
							onkeypress="onlyNumberCheck();" 
							onkeyup='mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};' 
							onblur='chkCmprPrd(firCalFlag, false, this, this, this);firCalFlag=false;dateWmsRangeValid(this, "Booking Date")' /><!-- 
				 --><button type="button" class="calendar ir" name="btn_bk_date" id="btn_bk_date" onClick="doWork('btn_bk_date');" tabindex="-1"></button>
				<th style="display: none;"><bean:message key="Loading_Type"/></th>
				<td style="display: none;"><bean:define id="MsList" name="cdMap" property="load_tp_cd"/>
					<select name="load_tp_cd" id="load_tp_cd" class="search_form" style="width:120px;">
						<logic:iterate id="codeVO" name="MsList">
							<option value='<bean:write name="codeVO" property="code"/>'><bean:write name="codeVO" property="name"/></option>
						</logic:iterate>
					</select>
				</td>
			</tr>
			<tr>
				<th></th>
				<th><bean:message key="Estimate_Date"/></th>
				<td><input name="est_in_dt" id="est_in_dt" type="text" style="width:85px;" maxlength="10" 
						onkeyup="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};" onkeypress="onlyNumberCheck();" onblur='mkDateFormatType(this, event, true,1);dateWmsRangeValid(this, "Estimate Date")' required/><!-- 
				--><button type="button" class="calendar ir" name="btn_est_in_dt" id="btn_est_in_dt" onClick="doWork('btn_est_in_dt');" tabindex="-1"></button><!-- 
				--><input name="est_in_hm" id="est_in_hm" type="text" style="width:40px;" maxlength="4" onchange="timeCheck(this);" maxlength="5" OnBeforeDeactivate="ComAddSeparator(this, 'hm');" OnBeforeActivate="ComClearSeparator(this, 'hm');"/>
				</td>
				<th style="display: none;"><bean:message key="EID_Type"/></th>
				<td style="display: none;"><bean:define id="MsList" name="cdMap" property="order_rel"/>
					<select name="trade_tp_cd" id="trade_tp_cd" class="search_form" style="width: 120px;">
						<option value="IMP">IMPORT</option>
						<option value="EXP">EXPORT</option>
						<option value="DOM">DOMESTIC</option>
					</select>
				</td>
			</tr>
			<tr>
				<th></th>
				<th style="vertical-align:top;"><bean:message key="Inbound_Date"/></th>
				<td style="vertical-align:top"><input name="inbound_dt" id="inbound_dt" type="text" style="width:85px;" maxlength="10" OnBeforeDeactivate="ComAddSeparator(this)" OnBeforeActivate="ComClearSeparator(this)" 
					onkeypress="onlyNumberCheck();" onkeyup='mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};' 
					onblur='chkCmprPrd(firCalFlag, false, this, this, this);firCalFlag=false;dateWmsRangeValid(this, "Inbound Date", "true");'/><!-- 
				--><button type="button" class="calendar ir" name="btn_inbound_dt" id="btn_inbound_dt" onClick="doWork('btn_inbound_dt');" tabindex="-1"></button><!--  
			    --><input name="inbound_hm" id="inbound_hm" type="text" style="width:40px;"  maxlength="4" onchange="timeCheck(this);" maxlength="5" OnBeforeDeactivate="ComAddSeparator(this, 'hm');" OnBeforeActivate="ComClearSeparator(this, 'hm');"/><!-- 	
				--><button type="button" name="btn_today" id="btn_today" class="btn_etc" tabindex="-1" onclick="setInboundDtToday();">Today</button><!--
				--></td>
				<th style="display: none;"><bean:message key="FWD_Type"/></th>
				<td style="display: none;"><select style="width: 120px;" name="fwd_tp_cd" id="fwd_tp_cd" class="search_form" onchange="">
						<option value="OWN">OWN</option>
						<option value="OTH">OTH</option>
					</select>
				</td>
			</tr>
			<tr style="display: none;">
				<th></th>
				<th style="vertical-align:top"><bean:message key="In_Summary"/></th>
				<td colspan="3" style="padding-top:2px;">
					<table class = "grid_2 wAuto">
						<colgroup>
							<col width="55" />
							<col width="55" />
							<col width="55" />
							<col width="56" />
							<col width="56" />
							<col width="56" />
							<col width="*" />
						</colgroup>
						<tr>
							<th style="text-align: left;"><strong>PL</strong></th>
							<th style="text-align: left;"><strong>BX</strong></th>
							<th style="text-align: left;"><strong>EA</strong></th>
							<th style="text-align: left;"><strong>SQ FT</strong></th>
							<th style="text-align: left;"><strong>CBM</strong></th>
							<th style="text-align: left;"><strong>GWT(kg)</strong></th>
							<th style="text-align: left;"><strong>NWT(kg)</strong></th>
						</tr>
						<tr>
							<td><input name="inbound_pl_qty"		id="inbound_pl_qty"     	type="text" value="0" dataformat="int" style="width:100%;text-align:right" /></td>
							<td><input name="inbound_bx_qty"		id="inbound_bx_qty"     	type="text" value="0" dataformat="int" style="width:100%;text-align:right" /></td>
							<td><input name="inbound_ea_qty"		id="inbound_ea_qty"     	type="text" value="0" dataformat="int" style="width:100%;text-align:right" /></td>
							<td><input name="inbound_sqft"		    id="inbound_sqft"        	type="text" value="0.000" dataformat="float" style="width:100%;text-align:right" onkeypress="onlyNumberCheck();" onchange="checkNumFormat(this, '9999999999.00000');chkComma(this,10,5);autoCalculator(this);"/></td>
							<td><input name="inbound_cbm"			id="inbound_cbm"     		type="text" value="0.00000" dataformat="float" style="width:100%;text-align:right" onkeypress="onlyNumberCheck();" onchange="checkNumFormat(this, '9999999999.00000');chkComma(this,10,5);autoCalculator(this);"/></td>
							<td><input name="inbound_grs_kgs"		id="inbound_grs_kgs"     	type="text" value="0.000" dataformat="float" style="width:100%;text-align:right" onkeypress="onlyNumberCheck();" onchange="checkNumFormat(this, '9999999999.00000');chkComma(this,10,5);autoCalculator(this);"/></td>
							<td><input name="inbound_net_kgs"		id="inbound_net_kgs"     	type="text" value="0.000" dataformat="float" style="width:50px;text-align:right" onkeypress="onlyNumberCheck();" onchange="checkNumFormat(this, '9999999999.00000');chkComma(this,10,5);autoCalculator(this);"/></td>
						</tr>
					</table>
				</td>
			</tr>
			<tr><td colspan="8"><p class="line_bluedot"></p></td></tr>
			<tr>
				<th><bean:message key="Trucker"/></th>
				<td colspan="3"><input name="trucker_cd" id="trucker_cd" type="text" style="width:70px;ime-mode:disabled;text-transform:uppercase;" dataformat="excepthan" onblur="strToUpper(this);getInfo_TruckerCode(this);" maxlength="10" /><!-- 						
					 --><button type="button" class="input_seach_btn" name="btn_trucker_cd" id="btn_trucker_cd" onClick="CustomerPopup('trucker_cd');" tabindex="-1"></button><!-- 
					 --><input name="trucker_nm" id="trucker_nm" type="text" style="ime-mode:disabled;text-transform:uppercase;width:265px;" dataformat="excepthan" onblur="strToUpper(this);" OnKeyPress="if(event.keyCode==13){CustomerPopup('trucker_cd','e');}" maxlength="100"/>
				</td>
				<th><bean:message key="Vendor"/></th>
				<td colspan="3"><input name="supp_cd" id="supp_cd" type="text" style="width:80px;ime-mode:disabled;text-transform:uppercase;" dataformat="excepthan" onblur="strToUpper(this);getInfo_SuppCd(this)" maxlength="10" /><!-- 
					 --><button type="button" class="input_seach_btn" name="btn_supp_cd" id="btn_supp_cd" onClick="doWork('btn_supp_cd');" tabindex="-1"></button><!-- 					
					 --><input id="supp_addr1" name="supp_addr1" type="hidden" style="ime-mode:disabled;text-transform:uppercase;width:285px;" maxlength="50" dataformat="excepthan" onblur="strToUpper(this);" onkeydown="if(event.keyCode==13){CustomerPopup('supp_addr1','e');}"/><!--
					 --><!-- <button type="button" class="multiple_inq" tabindex="-1" name="btn_supp_addr" id="btn_supp_addr" onclick="doWork('btn_supp_addr')"></button> --><!--
					 --><input id="supp_nm" name="supp_nm" type="text" style="ime-mode:disabled;text-transform:uppercase;width:285px;" maxlength="50" dataformat="excepthan" onblur="strToUpper(this);" onkeypress="if(event.keyCode==13){CustomerPopup('supp_nm','e');}"/>
				</td>
			</tr>
			<tr>
				<th><bean:message key="TR_CNTR"/></th>
				<td colspan="3"><input name="eq_tpsz_cd" id="eq_tpsz_cd" type="text" dataformat="excepthan" onkeyup="validation2BytesChar(this);" onchange="validation2BytesChar(this);" onblur="strToUpper(this);" style="width:70px;ime-mode:disabled;text-transform:uppercase;" maxlength="4"/><!-- 
					 --><button type="button" class="input_seach_btn" name="btn_eq_tpsz_cd" id="btn_eq_tpsz_cd" onClick="doWork('btn_eq_tpsz_cd')" tabindex="-1"></button><!-- 
					 --><input name="eq_no" id="eq_no" type="text" dataformat="excepthan" maxlength="20" style="ime-mode:disabled;text-transform:uppercase;width:71px" onkeyup="validation2BytesChar(this);" onchange="validation2BytesChar(this);" onblur="strToUpper(this);" maxlength="20"/><!-- 
					 --><input name="eq_tp_cd" id="eq_tp_cd" type="hidden" /> 
					<strong><bean:message key="Seal_No"/></strong>
					<input name="seal_no" id="seal_no" type="text" dataformat="excepthan" onkeyup="validation2BytesChar(this);" onchange="validation2BytesChar(this);" onblur="strToUpper(this);" style="width:107px;ime-mode:disabled;text-transform:uppercase;" maxlength="100"/><!-- 
					--><button type="button" class="btn_etc" tabindex="-1" name="btn_seal_no" id="btn_seal_no" onclick="doWork('btn_seal_no')">..</button>
				</td>
				<th><bean:message key="Reference_No"/></th>
				<td><input name="ref_no" id="ref_no" type="text" dataformat="excepthan" onkeyup="validation2BytesChar(this);" onchange="validation2BytesChar(this);" onblur="strToUpper(this);" maxlength="20" style="ime-mode:disabled;text-transform:uppercase;"/></td>
				<th><bean:message key="Invoice_No"/></th>
				<td><input name="commc_inv_no" id="commc_inv_no" type="text" dataformat="excepthan" onkeyup="validation2BytesChar(this);" onchange="validation2BytesChar(this);" onblur="strToUpper(this);" maxlength="30" style="width:130px;ime-mode:disabled;text-transform:uppercase;" /></td>
			</tr>
			<tr>
				<th><bean:message key="DO_No"/></th>
				<td colspan="3"><input name="dlv_ord_no" id="dlv_ord_no" type="text" dataformat="excepthan" onkeyup="validation2BytesChar(this);" onchange="validation2BytesChar(this);" onblur="strToUpper(this);" style="ime-mode:disabled;text-transform:uppercase;width:174px" maxlength="30"/>
					<strong><bean:message key="Work_Sheet"/></strong>
					<button type="button" class="btn_etc"  onClick="btn_uploading_sheet();" id="btn_create_uploading_sheet" name="btn_create_uploading_sheet"><bean:message key="Create"/></button><!-- 						
				 	--><img src="<%=CLT_PATH%>/web/img/main/icon_doc.gif" style="cursor:hand;" name="btn_document_uploading_sheet" id="btn_document_uploading_sheet" onclick="btn_uploading_sheet()" /><!-- 
			     	--><input type="hidden" name="unload_sht_yn" id="unload_sht_yn" />
				</td>
				<th><span id="rmk_title1"><bean:message key="Remark"/></span><span id="rmk_title2" style="display:none"><bean:message key="Reason"/></span></th>
				<td colspan="3" rowspan="2"><textarea name="rmk" id="rmk" onkeypress="keyPress_maxLength(this);" onkeyup="keyUp_maxLength(this);" style="height:27px;width:396px" dataformat="excepthan" onblur="strToUpper(this);" maxlength="800"></textarea></td>
			</tr>
			<tr><td colspan="8"><p class="line_bluedot"></p></td></tr>
		</table>
	</div>
		<div style="width:1120px; margin-top:-15px; padding:5px 0 5px 0;"><center><span id="btn_show_nm"><img src="<%=CLT_PATH%>/web/img/main/04_icon_show.gif" style="cursor:hand" onClick="btn_show_shipping(true)"></img></span><!-- 
			--><span id="btn_hide_nm" style="display:none"><img src="<%=CLT_PATH%>/web/img/main/04_icon_hide.gif" style="cursor:hand" onClick="btn_show_shipping(false)"></img></span></center></div>
			
		<div class= "opus_design_inquiry" style="display:none;"  id="show_shipping">
			<table>
				<colgroup>
					<col width="75" />
					<col width="412" />
					<col width="240" />
					<col width="*" />
				</colgroup>	
			
			<tr>
				<th><bean:message key="Master_BL"/></th>
				<td><input name="mbl_no" id="mbl_no" type="text" onkeypress="keyPress_maxLength(this);" onkeyup="keyUp_maxLength(this);" dataformat="excepthan" onblur="strToUpper(this);" maxlength="20" style="width:368px;ime-mode:disabled;text-transform:uppercase;" /></td>
				<th><bean:message key="POL_ETD"/></th>
				<td><input name="pol" id="pol" type="text" style="width:70px;ime-mode:disabled;text-transform:uppercase;" dataformat="excepthan" onBlur="strToUpper(this);onblur_Pol(this.name)" maxlength="8"/><!-- 
					 --><button type="button" name="btn_pol" id="btn_pol" class="input_seach_btn" tabindex="-1" onclick="doWork('btn_pol')" ></button><!-- 
					 --><input name="pol_nm" id="pol_nm" type="text" style="ime-mode:disabled;text-transform:uppercase;width:179px;" dataformat="excepthan" onblur="strToUpper(this);" OnKeyDown="if(event.keyCode==13){podPopup('pol','e');}"/><span class='dash'>/</span><!--  
					 --><input name="etd" id="etd" type="text" style="width:75px;" maxlength="10" 
					 	OnBeforeDeactivate="ComAddSeparator(this)" 
					 	OnBeforeActivate="ComClearSeparator(this)" 
					 	onkeypress="onlyNumberCheck();" 
						onkeyup="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};" 
						onblur="chkCmprPrd(firCalFlag, false, this, this, this);firCalFlag=false;"/><!-- 
					 --><button type="button" name="btn_etd" id="btn_etd" class="calendar ir" tabindex="-1" onclick="doWork('btn_etd')"></button>
				</td>
			</tr>
			<tr>
				<th><bean:message key="House_BL"/></th>
				<td><input name="hbl_no" id="hbl_no" onkeypress="keyPress_maxLength(this);" onkeyup="keyUp_maxLength(this);" type="text" dataformat="excepthan" onblur="strToUpper(this);" maxlength="20" style="width:368px;ime-mode:disabled;text-transform:uppercase;" /></td>
				<th><bean:message key="POD_ETA"/></th>
				<td><input name="pod" id="pod" type="text" style="width:70px;ime-mode:disabled;text-transform:uppercase;" dataformat="excepthan" onBlur="strToUpper(this);onblur_Pod(this.name);" maxlength="8"/><!-- 
					 --><button type="button" name="btn_pod" id="btn_pod" class="input_seach_btn" tabindex="-1" onclick="doWork('btn_pod')" ></button><!-- 
					 --><input name="pod_nm" id="pod_nm" type="text" style="ime-mode:disabled;text-transform:uppercase;width:179px;" 	dataformat="excepthan" onblur="strToUpper(this);" OnKeyDown="if(event.keyCode==13){podPopup('pod','e');}"/><span class='dash'>/</span><!-- 
					 --><input name="eta" id="eta" type="text" style="width:75px;" maxlength="10" 
							 OnBeforeDeactivate="ComAddSeparator(this)" 
							 OnBeforeActivate="ComClearSeparator(this)" 
							 onkeypress="onlyNumberCheck();" 
							 onkeyup="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};" 
							 onblur="chkCmprPrd(firCalFlag, false, this, this, this);firCalFlag=false;"/><!-- 
					 --><button type="button" name="btn_eta" id="btn_eta" class="calendar ir" tabindex="-1" onclick="doWork('btn_eta')"></button>
				</td>	
			</tr>
			<tr>
				<th><bean:message key="VSL_VOY"/></th>
				<td><input name="vsl_cd" id="vsl_cd" type="text" style="width:80px;ime-mode:disabled;text-transform:uppercase;" dataformat="excepthan" onBlur="strToUpper(this);vslCdSearch(this);" maxlength="10"/><!-- 
					 --><button type="button" name="btn_vsl_cd" id="btn_vsl_cd" class="input_seach_btn" tabindex="-1" onclick="doWork('btn_vsl_cd')"  ></button><!-- 
					 --><input name="vsl_nm" id="vsl_nm" type="text" style="width:172px;ime-mode:disabled;text-transform:uppercase;" dataformat="excepthan" onBlur="strToUpper(this);"  maxlength="140" OnKeyDown="if(event.keyCode==13){vslPopup();}"/><!-- 
					 --><span class="dash">/</span><input name="voy" id="voy" type="text" onkeypress="keyPress_maxLength(this);" onkeyup="keyUp_maxLength(this);" style="width:70px;ime-mode:disabled;text-transform:uppercase;" dataformat="excepthan" onblur="strToUpper(this);" maxlength="11" />
				</td>
				<th><bean:message key="DEL"/></th>
				<td>
					<input name="del" id="del" type="text" style="width:70px;ime-mode:disabled;text-transform:uppercase;" dataformat="excepthan" onBlur="strToUpper(this);onblur_Del(this.name);" maxlength="8"/><!-- 
					 --><button type="button" name="btn_del" id="btn_del" class="input_seach_btn" tabindex="-1" onclick="doWork('btn_del')" ></button><!-- 
					 --><input name="del_nm" id="del_nm" type="text" style="ime-mode:disabled;text-transform:uppercase;width:179px;"  dataformat="excepthan" onblur="strToUpper(this);" OnKeyDown="if(event.keyCode==13){podPopup('del','e');}"/>
				</td>
			</tr>
			<tr>
				<th><bean:message key="Carrier"/></th>
				<td colspan="4"><input name="carrier_cd" id="carrier_cd"  type="text" style="width:80px;ime-mode:disabled;text-transform:uppercase;" dataformat="excepthan" onBlur="strToUpper(this);getInfo_Carrier(this)" maxlength="8"/><!-- 
					 --><button type="button" name="btn_carrier_cd" id="btn_carrier_cd" class="input_seach_btn" tabindex="-1" onclick="doWork('btn_carrier_cd')" ></button><!-- 
					 --><input name="carrier_nm" id="carrier_nm" type="text" style="ime-mode:disabled;text-transform:uppercase;width:172px;" dataformat="excepthan" onblur="strToUpper(this);" OnKeyDown="if(event.keyCode==13){CustomerPopup('carrier_cd','e');}"/>
				</td>
			</tr>
		</table>
	</div>
	</div>
	<div class="opus_design_grid clear">
		<!-- opus_design_grid(S) -->
		<div class="opus_design_btn">
		<!-- #4608 [WMS] In/Outbound Management to have [Multi Row Add] button : Button Format Modified -->
			<table>  
				<tr>
					<!-- #2129 [BINEX WMS4.0] INBOUND COMPLETE CANCEL DELETES SAVED SERIAL #(#1882) -->
					<td><button type="button" class="btn_normal" id="btn_restore" name="btn_restore" style="display: none" onClick="doWork('sheet2_btn_restore');"><bean:message key="Restore"/></button></td> 
				 	<td style="width:50px"><button type="button" class="btn_normal" id="btn_row_add_sheet2" name="btn_row_add_sheet2" onClick="doWork('sheet2_btn_row_add');"><bean:message key="Add"/></button></td>
				 	
				 	<td><input type="text" style="width:40px;text-align:right;margin-bottom: 4px;" name="copy_cnt" value="1" onkeyPress="onlyNumberCheck();" onkeyup="numberCommaLen(this,7,0);" maxlength="3" ></td>
				 	<td><button type="button" class="btn_normal" id="btn_multi_row_add_sheet2" name="btn_multi_row_add_sheet2" onClick="doWork('sheet2_btn_multi_row_add');">Multi Row Add</button></td>
				 	
				 	<td style="width:50px"><button type="button" class="btn_normal" id="sheet2_btn_show" name="sheet2_btn_show" onClick="doWork('sheet2_btn_show');">>></button></td>
				 	<td><button type="button" class="btn_normal" id="sheet2_btn_hide" name="sheet2_btn_hide" onClick="doWork('sheet2_btn_hide');" style="display: none;"><<</button></td>
			 	</tr>
		 	</table>
		</div>
		<script type="text/javascript">comSheetObject('sheet2');</script>
		<!-- opus_design_grid(E) -->
	</div>
	<div class="opus_design_grid clear" style="display: none;">
		<!-- opus_design_grid(S) -->
		<div class="opus_design_btn">  
		</div>
		<script type="text/javascript">comSheetObject('sheet7');</script>
		<!-- opus_design_grid(E) -->
	</div>
</div>
 <!-- Tab1 - FORM (E)  -->
 <!-- Tab2 Freight (S)  -->
 <div id="tabLayer" name="tabLayer" style="display:none;">
     		<div class="opus_design_inquiry">
				<table>
					<colgroup>
						<col width="40" />
						<col width="100" />
						<col width="50" />
						<col width="100" />
						<col width="50" />
						<col width="*" />
					</colgroup>
					<tbody>	
						<tr>
							<th><bean:message key="Bill_To"/></th>
							<td>
							<input name="bill_to_cd" id="bill_to_cd" type="text" style="ime-mode:disabled;text-transform:uppercase;width:70px;" dataformat="excepthan" onblur="strToUpper(this);codeName('CUSTUMER',this, 'onBlur');" maxlength="10" onkeypress="if(event.keyCode==13){codeName('CUSTUMER',this, 'onKeyDown');}" onchange=""/><!-- 	
							 --><button type="button" name="btn_bill_to_cd" id="btn_bill_to_cd" class="input_seach_btn" tabindex="-1" onclick="doWork('btn_bill_to_cd')"></button><!-- 					
							 --><input name="bill_to_nm" id="bill_to_nm" onkeypress="if(event.keyCode==13){CustomerPopup('bill_to_cd','e');}" type="text" style="ime-mode:disabled;text-transform:uppercase;width:250px;" dataformat="excepthan" onblur="strToUpper(this);"  />
							</td>

							<th>
							<bean:message key="Total_Amount"/>
							</th>
							<td>
							 <span style="color: blue;font: bold;" id="sp_curr_cd"></span> <input name="s_inv_ttl_amt" id="s_inv_ttl_amt" onkeydown="if(event.keyCode==13){CustomerPopup('trucker_cd','e');}" type="text" style="ime-mode:disabled;text-transform:uppercase;width:250px;" dataformat="excepthan" onblur="strToUpper(this);" disabled="disabled"  />
							</td>
							<th>
							<bean:message key="Status"/>
							</th>
							<td>
							 	<input name="s_sts_nm" id="s_sts_nm" type="text" style="ime-mode:disabled;width:250px;font-weight: bold" disabled="disabled"  />
							</td>
						</tr>
					
					</tbody>
				</table>
			</div>
			
			<div class="opus_design_grid clear">
			<div class="opus_design_btn">
			 <button name="btn_rating" id="btn_rating" type="button" class="btn_accent" onClick="doWork('rating');" disabled="disabled"><bean:message key="Rating"/></button>
			 <button name="btn_frtAdd" id="btn_frtAdd" type="button" class="btn_accent" onClick="doWork('frt_add')" disabled="disabled"><bean:message key="Add"/></button>
			</div>
				<script type="text/javascript">comSheetObject('sheet6');</script>
			</div>
		</div>	
 <!--  Tab2 Freight (E)  -->
 <!-- Tab3 - DOC DETAIL (S)  -->
<div id="tabLayer" name="tabLayer" style="display:none"> 
	<div class= "opus_design_grid clear" style="margin-bottom:8px;">
		<script type="text/javascript">comSheetObject('sheet3');</script>
	</div> 
</div>
 <!-- Tab3 - DOC DETAIL (E)  -->
 <!-- Tab4 - ATTACHMENT (S)  -->
<div id="tabLayer" name="tabLayer" style="display:none"> 
<div class="opus_design_inquiry">
	<table>
		<colgroup>
			<col width="50" />
			<col width="120" />
			<col width="50" />
			<col width="220" />
			<col width="*" />
		</colgroup>
		<tr>
			<th><bean:message key="Order_No"/></th>
			<td><input name="file_cust_ord_no" id="file_cust_ord_no" type="text" style="width:102px;"  tabindex="-1" readonly /></td>
			<td><input name="c_wib_bk_no" id="c_wib_bk_no" type="hidden" style="width:102px;"  tabindex="-1" readonly /></td>
			<th><bean:message key="File_Path"/></th>
			<td>
			<div id="logo_rec_id" style="display: none;"></div><!--
            --><input tabindex = "-1" type="file" name="logo_rectangle" id="logo_rectangle"  size="25"/><!--
            --><input name="logo_rec_flg" type="checkbox" value="Y"  style="display: none">
				<button type="button" class="btn_etc" name="btn_file_delete" id="btn_file_delete" onClick="btn_File_Delete();"><bean:message key="File_Delete"/></button><!--  
				 --><button type="button" class="btn_etc" name="btn_file_upload" id="btn_file_upload" onClick="btn_File_Upload();"><bean:message key="File_Upload"/></button> 
			</td>
			
		</tr>
	</table>
</div>
<div class="opus_design_grid clear">
		<!-- opus_design_grid(S) -->
		<script type="text/javascript">comSheetObject('sheet4');</script>
		<!-- opus_design_grid(E) -->
</div>
</div>
</div>
 <!-- Tab4 - ATTACHMENT (E)  -->
<div class="wrap_result">
	<!-- <div class="opus_design_grid clear">
		opus_design_grid(S)
		<div class="opus_design_btn">  
			<button type="button" class="btn_normal" id="btn_row_add_sheet2" name="btn_row_add_sheet2" onClick="doWork('sheet2_btn_row_add');"><bean:message key="Add"/></button>
		</div>
		<script type="text/javascript">comSheetObject('sheet2');</script>
		opus_design_grid(E)
	</div> -->
	<div style="display:none;">
	<!-- Excel sheet -->
		<div class="opus_design_grid clear">
			<script type="text/javascript">comSheetObject('sheet5');</script>
		</div>
	</div>
</div>
		
</div>
</form>
<script type="text/javascript">
	var attr_extension = "<%= null!=roleBtnVO ?roleBtnVO.getAttr_extension():"" %>";
	doBtnAuthority(attr_extension);
</script>
<form name="frm1" method="POST" action="./GateServlet.gsl">
	<input type="hidden" name="goWhere" value="fd" id="goWhere" />
    <input type="hidden" name="bcKey" value="downloadTlFileTemplateWMS" id="bcKey" />
    <input type="hidden" name="file_path" value="" id="file_path" />
    <input type="hidden" name="file_name" value="" id="file_name"/>	
    <input type="hidden" name="docType" value="" id="docType" />
</form>	

