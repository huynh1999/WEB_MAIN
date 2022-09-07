<%--=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : WHOutMgmt.jsp
*@FileTitle  : Outbound Management
*@author     : Khoa.Nguyen - DOU Network
*@version    : 1.0
*@since      : 2016/04/26
=========================================================--%>
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
    <script type="text/javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/SUP_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
    <script language="javascript" src="<%=CLT_PATH%>/apps/fis/see/bmd/housebl/script/BL_FRT.js?ver=<%=CLT_JS_VER%>"></script>
    <script language="javascript" src="<%=CLT_PATH%>/apps/fis/see/bmd/housebl/script/BL_CODE_UTIL.js?ver=<%=CLT_JS_VER%>"></script>
    <script type="text/javascript" src="apps/fis/wms/outboundmanagement/script/WHOutMgmt.js?ver=<%=CLT_JS_VER%>"></script>
    <script type="text/javascript" src="<%=CLT_PATH%>/js/common/autocomplete_ui.js?ver=<%=CLT_JS_VER%>"></script>
    
	<script type="text/javascript" src="./js/common/message/<%=CLT_MSG_PATH%>/WMS_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
<%
	String req_wob_bk_no = "";
	String req_wh_cd   = "";
	String req_wh_nm   = "";
	String fwd_bk_no   = "";
	String uploadfile   = "";
	
	//#1940 [WMS4.0] Inbound / Outbound Status 색상 구분 이후 추가 개선 사항
	String BG_BOOKED   = "#8BBDFF";
	String BG_ALLOCATED= "#E4F7BA";
	String BG_PICKED   = "#CEF76E";
	String BG_COMPLETE = "#FAED7D";
	String BG_CANCEL   = "#FFA7A7";
	String BG_INIT     = "#f4f6f6";
	
	//WMS4.0 RATE 자리수 소수점 8자리 까지 늘림
	String wmsRuPoint = (String)application.getAttribute("FRT_RATE_POINT_EIGHT_YN");
	if(wmsRuPoint == null){wmsRuPoint = "N";} 
	try {
		req_wob_bk_no   = request.getParameter("req_wob_bk_no")== null?"":request.getParameter("req_wob_bk_no");
		req_wh_cd   = request.getParameter("req_wh_cd")== null?"":request.getParameter("req_wh_cd");
		req_wh_nm   = request.getParameter("req_wh_nm")== null?"":request.getParameter("req_wh_nm");
		fwd_bk_no   = request.getParameter("fwd_bk_no")== null?"":request.getParameter("fwd_bk_no");
		uploadfile   = request.getParameter("uploadfile")== null?"":request.getParameter("uploadfile");
	}catch(Exception e) {
		out.println(e.toString());
	}	
%>
<logic:notEmpty name="EventResponse">
	<bean:define id="valMap" 	   name="EventResponse" property="mapVal"/>
	<bean:define id="bk_sts_cd" name="valMap" property="bk_sts_cd"/>
	<bean:define id="ord_tp_cd" name="valMap" property="ord_tp_cd"/>
	<bean:define id="load_tp_cd" name="valMap" property="load_tp_cd"/>
	<bean:define id="trade_tp_cd" name="valMap" property="trade_tp_cd"/>
	<bean:define id="fwd_tp_cd" name="valMap" property="fwd_tp_cd"/>
	<bean:define id="warehouse" name="valMap" property="warehouse"/>
	<bean:define id="currCdList" name="valMap" property="currCdList"/>
	<bean:define id="HandlingUnit" name="valMap" property="pkg_unit_info"/>
	
	<bean:define id="tpszList"  name="valMap" property="cntrTpszList"/>
	<bean:define id="rate_tp_cd" name="valMap" property="rate_tp_cd"/>
	<bean:define id="FrtList" name="valMap" property="Freight"/>
	<bean:define id="lic_plat_ut_list" name="valMap" property="lic_plat_ut_list"/>
	<bean:define id="trkTpszList" name="valMap" property="trkTpszList"/>
</logic:notEmpty>
	
<script>

//#1940 [WMS4.0] Inbound / Outbound Status 색상 구분 이후 추가 개선 사항
var bgBooked   = "<%=BG_BOOKED %>";
var bgAllocated= "<%=BG_ALLOCATED%>";
var bgPicked   = "<%=BG_PICKED%>";
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

var ord_tp_cdText = "";
var ord_tp_cdCode = "";

'<logic:notEmpty name="ord_tp_cd">'
	'<logic:iterate id="item" name="ord_tp_cd">'
		ord_tp_cdCode+="|"+'<bean:write name="item" property="code"/>';
		ord_tp_cdText+="|"+'<bean:write name="item" property="name"/>';
	'</logic:iterate>'
	
	ord_tp_cdCode = ord_tp_cdCode.substring(1);
	ord_tp_cdText = ord_tp_cdText.substring(1);
'</logic:notEmpty>'

var load_tp_cdText = "";
var load_tp_cdCode = "";
	
	'<logic:notEmpty name="load_tp_cd">'
		'<logic:iterate id="item" name="load_tp_cd">'
			load_tp_cdCode+="|"+'<bean:write name="item" property="code"/>';
			load_tp_cdText+="|"+'<bean:write name="item" property="name"/>';
		'</logic:iterate>'
		
		load_tp_cdCode = load_tp_cdCode.substring(1);
		load_tp_cdText = load_tp_cdText.substring(1);
	'</logic:notEmpty>'
	
var trade_tp_cdText = "IMPORT|EXPORT|DOMESTIC";
var trade_tp_cdCode = "IMP|EXP|DOM";
	
	/* '<logic:notEmpty name="trade_tp_cd">'
		'<logic:iterate id="item" name="trade_tp_cd">'
			trade_tp_cdCode+="|"+'<bean:write name="item" property="code"/>';
			trade_tp_cdText+="|"+'<bean:write name="item" property="name"/>';
		'</logic:iterate>'
		
		trade_tp_cdCode = trade_tp_cdCode.substring(1);
		trade_tp_cdText = trade_tp_cdText.substring(1);
	'</logic:notEmpty>' */
	
var fwd_tp_cdText = "OWN|OTH";
var fwd_tp_cdCode = "OWN|OTH";
	
	/* '<logic:notEmpty name="fwd_tp_cd">'
		'<logic:iterate id="item" name="fwd_tp_cd">'
			fwd_tp_cdCode+="|"+'<bean:write name="item" property="code"/>';
			fwd_tp_cdText+="|"+'<bean:write name="item" property="name"/>';
		'</logic:iterate>'
		
		fwd_tp_cdCode = fwd_tp_cdCode.substring(1);
		fwd_tp_cdText = fwd_tp_cdText.substring(1);
	'</logic:notEmpty>' */
	
var bk_sts_cdText = "Booked|Allocated|Picked|Shipped|Cancel";  <!-- //#1950 WMS4.0 In/outBound Status 관리 개선   Completed => Shipped  -->
var bk_sts_cdCode = "I|A|P|X|C";

/* '<logic:notEmpty name="bk_sts_cd">'
	'<logic:iterate id="item" name="bk_sts_cd">'
		bk_sts_cdCode+="|"+'<bean:write name="item" property="code"/>';
		bk_sts_cdText+="|"+'<bean:write name="item" property="name"/>';
	'</logic:iterate>'
	
	bk_sts_cdCode = bk_sts_cdCode.substring(1);
	bk_sts_cdText = bk_sts_cdText.substring(1);
'</logic:notEmpty>'  */
var wh_cdText = "";
var wh_cdCode = "";

	'<logic:notEmpty name="warehouse">'
		'<logic:iterate id="item" name="warehouse">'
			wh_cdCode+="|"+'<bean:write name="item" property="wh_cd"/>';
			wh_cdText+="|"+'<bean:write name="item" property="wh_nm"/>';
		'</logic:iterate>'
		
		wh_cdCode = wh_cdCode.substring(1);
		wh_cdText = wh_cdText.substring(1);
	'</logic:notEmpty>'
var currCdListText = "";
var currCdListCode = "";

'<logic:notEmpty name="currCdList">'
	'<logic:iterate id="item" name="currCdList">'
		currCdListCode+="|"+'<bean:write name="item" property="cd_val"/>';
		currCdListText+="|"+'<bean:write name="item" property="cd_nm"/>';
	'</logic:iterate>'
	
	currCdListCode = currCdListCode.substring(1);
	currCdListText = currCdListText.substring(1);
'</logic:notEmpty>'

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
    
 	/*Freight code  */
    var FreightText = ' |';
    var FreightCode = ' |';
    <%boolean isBegin_Freight = false; %>
    <bean:define id="FrtList" name="valMap" property="Freight"/>
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
    <%isBegin = false; %>
    <bean:define id="lic_plat_ut_list" name="valMap" property="lic_plat_ut_list"/>
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
    <bean:define id="trkTpszList" name="valMap" property="trkTpszList"/>
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
	
	// [1325][OUTBOUND MANAGEMENT] Cannot auto suggestion when input name.
	var AUTOCOMPLETE_YN = 'Y';
	<logic:notEmpty name="valMap" property="autocompleteYn">
		AUTOCOMPLETE_YN = '<bean:write name="valMap" property="autocompleteYn"/>';
	</logic:notEmpty>
</script>
<form id="form" name="form" method="POST" action="./WHOutMgmt.clt" enctype="multipart/form-data">
	<input type="hidden" name="fwd_bk_no" id="fwd_bk_no" value="<%= fwd_bk_no %>" />
	<input type="hidden" name="uploadfile" id="uploadfile" value="<%= uploadfile %>" />
	<input type="hidden" name="def_wh_cd" id="def_wh_cd" value="<%=userInfo.getDef_wh_cd()%>" />
	<input type="hidden" name="def_wh_nm" id="def_wh_nm" value="<%=userInfo.getDef_wh_nm()%>" />
	<input type="hidden" name="def_wh_ctrt_no" id="def_wh_ctrt_no" value="<%=userInfo.getDef_wh_ctrt_no()%>" />
	<input type="hidden" name="def_wh_ctrt_nm" id="def_wh_ctrt_nm" value="<%=userInfo.getDef_wh_ctrt_nm()%>" />
	<input type="hidden" name="def_wh_rtp_no" id="def_wh_rtp_no"/>
	<input type="hidden" name="def_owner_cd" id="def_owner_cd"/>
	<input type="hidden" name="def_ord_tp_cd" id="def_ord_tp_cd" value="<%=userInfo.getDflt_ord_tp_cd()%>"/>
	<input type="hidden" name="sel_wob_bk_no" id="sel_wob_bk_no" />
	<input type="hidden" name="sel_wave_no" id="sel_wave_no" />
	<input type="hidden" name="form_mode" id="form_mode" />
	<input type="hidden" name="sel_tab" id="sel_tab" />
	<input type="hidden" name="sel_ctrt_no" id="sel_ctrt_no" />
	<input type="hidden" name="sel_ctrt_nm" id="sel_ctrt_nm" />
	<input type="hidden" name="sel_wh_cd" id="sel_wh_cd" />
	<input type="hidden" name="sel_wh_nm" id="sel_wh_nm" />
	<input type="hidden" name="ctrt_no_org" id="ctrt_no_org" />
	<input type="hidden" name="wh_cd_org" id="wh_cd_org" />
	<input type="hidden" name="svc_tp_cd" id="svc_tp_cd" value="WB" />
	<input type="hidden" name="doc_ref_tp_cd" id="doc_ref_tp_cd" value="WOB" />
	<input type="hidden" name="doc_tp_cd" id="doc_tp_cd" value="WOB" />
	<input type="hidden" name="doc_ref_no" id="doc_ref_no" value="" />
	<input type="hidden" name="doc_ref_no2" id="doc_ref_no2" value="" />
	<input type="hidden" name="req_wob_bk_no" id="req_wob_bk_no" value="<%=req_wob_bk_no%>" />
	<input type="hidden" name="req_wh_cd" id="req_wh_cd" value="<%=req_wh_cd%>" />
	<input type="hidden" name="req_wh_nm" id="req_wh_nm" value="<%=req_wh_nm%>" />
	<input type="hidden" name="f_cmd" value="0" />
	<input type="hidden" name="wh_ofc_cd" id="wh_ofc_cd" value="" />
	<input type="hidden" name="wh_curr_cd" id="wh_curr_cd" value="" />

	<!-- #2807 [BINEX WMS4.0] LOT04, LOT05 NICKNAME CUSTOMIZATION -->
	<input type="hidden" id="lot4_alias" />
	<input type="hidden" id="lot5_alias" />
	
	<!-- #4562 [Korex] WMS Outbound Delivery Status (v461.14) -->
	<input type="hidden" name="full_dlvr_dttm" id="full_dlvr_dttm" value="" />

	<input type="hidden" name="user_id" id="user_id"  value="<%=userInfo.getUsrid()%>" />
	<input type="hidden" name="pageurl" id="pageurl" value="WHOutMgmt.clt"/>
	<div class="page_title_area clear">
		<!-- page_title(S) -->
		<h2 class="page_title" id='bigtitle'><button type="button"><span><%=LEV3_NM%></span></button></h2>
		<!-- page_title(E) -->
		<!-- opus_design_btn(S) -->
		<div class="opus_design_btn TOP">
 			<%-- <button type="button" 	class="btn_accent" 	name="btn_search" 			id="btn_search" 			onclick="doWork('SEARCHLIST')" 	<%= null != roleBtnVO? "style='display:none;' btnAuth='" + roleBtnVO.getAttr1() + "'"  : "" %>><bean:message key="Search"/></button><!-- 
			--><button type="button" class="btn_normal" name="btn_new" 				id="btn_new"				onclick="doWork('NEW')" 		<%= null != roleBtnVO? "style='display:none;' btnAuth='" + roleBtnVO.getAttr2() + "'"  : "" %>><bean:message key="New"/></button><!--
			--><button type="button" class="btn_normal" name="btn_save" 			id="btn_save" 				onclick="doWork('SAVE')" 		<%= null != roleBtnVO? "style='display:none;' btnAuth='" + roleBtnVO.getAttr3() + "'"  : "" %>><bean:message key="Save"/></button><!-- 
			--><button type="button" class="btn_normal" name="btn_delete" 			id="btn_delete" 			onclick="doWork('DELETE')" 		<%= null != roleBtnVO? "style='display:none;' btnAuth='" + roleBtnVO.getAttr4() + "'"  : "" %> ><bean:message key="Delete"/></button><!-- 
			--><button type="button" class="btn_normal" name="btn_cancel" 			id="btn_cancel"				onclick="doWork('CANCEL')" 		<%= null != roleBtnVO? "style='display:none;' btnAuth='CANCEL'"  : "" %>><bean:message key="C_Cancel"/></button><!--
			--><button type="button" class="btn_normal" name="btn_excel" 			id="btn_excel" 				onclick="doWork('EXCEL')" 		<%= null != roleBtnVO? "style='display:none;' btnAuth='" + roleBtnVO.getAttr6() + "'"  : "" %>><bean:message key="Excel"/></button><!--
			--><button type="button" class="btn_normal" name="btn_print" 			id="btn_print" 				onclick="doWork('PRINT')" 		<%= null != roleBtnVO? "style='display:none;' btnAuth='" + roleBtnVO.getAttr5() + "'"  : "" %>><bean:message key="Print"/></button><!--
			--><button type="button" class="btn_normal" name="link_Wave" 			id="link_Wave" 				onclick="doWork('link_Wave')" 	<%= null != roleBtnVO? "style='display:none;' btnAuth='WAVE'"  : "" %>><bean:message key="Wave"/></button><!--
			--><button type="button" class="btn_normal" name="link_Excel_Download" 	id="link_Excel_Download" 	onclick="doWork('link_Excel_Download')" <%= null != roleBtnVO? "style='display:none;' btnAuth='UPLOAD_EXCEL'"  : "" %>><bean:message key="Template_DL"/></button><!--
			--><button type="button" class="btn_normal" name="link_Excel_Upload" 	id="link_Excel_Upload" 		onclick="doWork('link_Excel_Upload')"	<%= null != roleBtnVO? "style='display:none;' btnAuth='UPLOAD_EXCEL'"  : "" %>><bean:message key="Excel_UL"/></button> 
		 --%></div>
		<!-- opus_design_btn(E) -->
		<!-- page_location(S) -->
	 	<div class="location">
		   <span><%=LEV1_NM%></span> &gt;
		   <span><%=LEV2_NM%></span> &gt;
		   <span><%=LEV3_NM%></span>
	   	</div>
		<!-- page_location(E) -->
	</div>
	<div class="over_wrap" >
		<div class='wrap_search_tab'>
			<div class="opus_design_inquiry ">
				<table>
					<colgroup>
							<col width="50">
							<col width="*">
					</colgroup>
					<tbody>
						<tr>
							<td><select style="width: 100px;" name="list_in_search_tp" id="list_in_search_tp" class="search_form" onchange="list_in_search_tp_onchange();">
									<option value='CUST_ORD_NO'>Order No.</option>
									<option value='WOB_BK_NO'>Booking No.</option>
									</select></td>
							<td><input name="list_in_no" id = "list_in_no" type="text" dataformat="excepthan" onblur="strToUpper(this);" style="width: 190px;ime-mode:disabled;text-transform:uppercase;" onKeyDown="if(event.keyCode==13){doWork('SEARCHLIST');}"/></td>
						</tr>
					</tbody>
				</table>
			</div>
		
		</div>
		<div class="wrap_result_tab">
			<ul id="ulTab" class="opus_design_tab">
		         	<li id=Tab01 class="nowTab"><a href="#" style="cursor:hand;" onClick="javascript:goTabSelect('01');"><span><bean:message key="FORM"/></span></a></li><!-- 
		         --><li id=Tab02><a href="#" style="cursor:hand;" onClick="javascript:goTabSelect('02');"><span><bean:message key="Freight"/></span></a></li><!-- 
		          --><li id=Tab03><a href="#" style="cursor:hand;" onClick="javascript:goTabSelect('03');"><span><bean:message key="Doc_Detail"/></span></a></li><!-- 
		          --><li id=Tab04><a href="#" style="cursor:hand;" onClick="javascript:goTabSelect('04');"><span><bean:message key="Attachment"/></span></a></li><!-- 
	     --></ul>
	    	<%-- <div id="tabLayer" name="tabLayer" style="display:inline">
			 	<div class="opus_design_inquiry">
					<table>
						<colgroup>
							<col width="50" />
							<col width="250" />
							<col width="50" />
	                       	<col width="300" />
							<col width="50" />
							<col width="*" />
						</colgroup>
						<tr>
							<th><bean:message key="Warehouse"/></th>
							<td>
								<select name="list_wh_cd" id="list_wh_cd" class="search_form" style="width: 200px;" required>
		                			<logic:notEmpty name ="valMap" property="warehouse">                      	
										<logic:iterate id="item" name="warehouse">
				                        	<option value='<bean:write name="item" property="wh_cd"/>'><bean:write name="item" property="wh_nm"/></option>
				                        </logic:iterate>
			                        </logic:notEmpty>
								</select>					
							</td>
							<th><bean:message key="Contract_Name"/></th>
							<td>
								<input name="list_ctrt_no" id="list_ctrt_no" type="text" style="width:80px;ime-mode:disabled;text-transform:uppercase;" dataformat="engup" otherchar="-_" onBlur="strToUpper(this);getCtrtInfo(this);" maxlength="10" /><!-- 						
								 --><button type="button" name="btn_list_ctrt_no" id="btn_list_ctrt_no" class="input_seach_btn" tabindex="-1" onClick="doWork('btn_list_ctrt_no');"></button><!-- 
								 --><input name="list_ctrt_nm" id="list_ctrt_nm" type="text" style="width:150px;ime-mode:disabled;text-transform:uppercase;" dataformat="excepthan" onBlur="strToUpper(this);" onkeypress="if(event.keyCode==13){CtrtPopup('list');}"/>
								<input name="list_rtp_no" id="list_rtp_no" type="hidden" />	
								<input name="list_owner_cd" id="list_owner_cd" type="hidden" />
							</td>
	                       	<th><bean:message key="Status"/></th>
							<td>
								<select name="list_bk_sts_cd" id="list_bk_sts_cd" class="search_form" style="width: 120px;">
								</select>
							</td>
						</tr>
	                   	<tr>
							<th>
								<select name="list_in_search_tp" id="list_in_search_tp" class="search_form" style="width: 90px;">
								</select>
							</th>
							<td>
								<input name="list_in_no" id = "list_in_no" type="text" style="width:200px;ime-mode:disabled;text-transform:uppercase;" dataformat="excepthan" onblur="strToUpper(this);"  />
							</td>
							<th>
								<select name="list_in_date_tp" id="list_in_date_tp" class="search_form" style="width: 110px;">
								</select>
							</th>
							<td>
								<input name="list_fm_date" id="list_fm_date" type="text"  maxlength="10" style="width:80px;" 
								onblur="chkCmprPrd(firCalFlag, false, this, this, form.list_to_date);firCalFlag=false;" 
								onKeyUp="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};"
								onkeypress="onlyNumberCheck();" onblur="mkDateFormatType(this, event, true,1)"/><span class="dash">~</span><!--
								--><input name="list_to_date" id="list_to_date" type="text"  maxlength="10" style="width:80px;" 
								onblur="chkCmprPrd(firCalFlag, false, this, form.list_fm_date, this);firCalFlag=false;" 
								onKeyUp="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};"
								onkeypress="onlyNumberCheck();" onblur="mkDateFormatType(this, event, true,1)"/><!--
								--><button class="calendar" tabindex="-1" type="button" name="btn_list_to_date" id="btn_list_to_date" onClick="doWork('btn_list_to_date');"></button>
							</td>
							<th><bean:message key="Order_Type"/></th>
							<td>
								<select name="list_ord_tp_cd" id="list_ord_tp_cd" class="search_form" style="width: 120px;">
								</select>
							</td>
						</tr>
					</table>
					<!------------------------------------------ Grid1 Area ---------------------------------------------------------->
				</div>
				<div class="opus_design_grid" id="mainTable">
					<div class="opus_design_btn">
					 <button type="button" class="btn_accent" onClick="sheet1RowAdd_OnClick()"><bean:message key="Add"/></button>
					</div>
					<script type="text/javascript">comSheetObject('sheet1');</script>
				</div>
			</div> --%>
			<div id="tabLayer" name="tabLayer" style="display:inline;">
				<div id="showseal" style="left: 415px;top: 242px;position: absolute;display: none;z-index: 9999;height: 131px;width: 220px;border: 4px solid #aacef4;visibility: visible;color: black;background-color: white;padding: 5px;">
					<div>
						<h3><bean:message key="Seal_No"/></h3>
						<table class = "grid_2">
							<tr>
								<td>
									<input name="seal_no1" type="text" onkeypress="keyPress_maxLength(this);" onkeyup="keyUp_maxLength(this);" style="ime-mode:disabled;text-transform:uppercase;width:100%" id="seal_no1" maxlength="30" dataformat="excepthan" onblur="strToUpper(this);" />
								</td>
							</tr>
							<tr>
								<td>
									<input name="seal_no2" type="text" onkeypress="keyPress_maxLength(this);" onkeyup="keyUp_maxLength(this);" style="ime-mode:disabled;text-transform:uppercase;width:100%" id="seal_no2" maxlength="30" dataformat="excepthan" onblur="strToUpper(this);" />
								</td>
							</tr>
							<tr>
								<td>
									<input name="seal_no3" type="text" onkeypress="keyPress_maxLength(this);" onkeyup="keyUp_maxLength(this);" style="ime-mode:disabled;text-transform:uppercase;width:100%" id="seal_no3" maxlength="30" dataformat="excepthan" onblur="strToUpper(this);" />
								</td>
							</tr>
						</table>
					</div>
					<div align="center">
			           <button align="center" class="btn_etc" type="button" onclick="btn_seal_OK();"><bean:message key="OK"/></button><!-- 
						--><button align="center" class="btn_etc" type="button" onclick="btn_seal_Close();"><bean:message key="Close"/></button>
					</div>
				</div>
				<div id="showaddr" style="left: 679px;top: 111px;position: absolute;display: none;z-index: 9999;height: 152px;width: 360px;border: 4px solid #aacef4;visibility: visible;color: black;background-color: white;padding: 5px;">
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
			<!------------------------------------------ Header Area ---------------------------------------------------------->
			<!-- Form Tab  -->
			<div class="TB_input" id="divForm" name="divForm">
				<div class="opus_design_inquiry">
					<table>
						<colgroup>
							<col width="50" />
							<col width="155" />
							<col width="50" />
							<col width="250" />
							<col width="50" />
							<col width="192" />
							<col width="50" />
							<col width="*" />
						</colgroup>
						<tr>
							<th><bean:message key="Warehouse"/></th>
							<td colspan="3">
								<select name="wh_cd" id="wh_cd" class="search_form" style="width: 353px;" required>
		                			<logic:notEmpty name ="valMap" property="warehouse">                      	
										<logic:iterate id="item" name="warehouse">
				                        	<option value='<bean:write name="item" property="wh_cd"/>'><bean:write name="item" property="wh_nm"/></option>
				                        </logic:iterate>
			                        </logic:notEmpty>
								</select>		
							</td>
							<th><bean:message key="Order_No"/></th>
							<td colspan="3">
								<input name="cust_ord_no" id="cust_ord_no" type="text" onkeypress="keyPress_maxLength(this);" onkeyup="keyUp_maxLength(this);" dataformat="engup" otherchar = "<%=WMS_OTHER_CHAR%>" onblur="strToUpper(this);" maxlength="100" style="ime-mode:disabled;text-transform:uppercase;width:260px;" required/><!-- 
								 --><input name="wob_bk_no" id="wob_bk_no" type="text" style="width:120px;" readonly="readonly" tabindex="-1"/>
								<input type="hidden" id="wave_no" name="wave_no" />
								<input type="hidden" id="smp_wave_flg" name="smp_wave_flg" />
							</td>
						</tr>
						<tr><td colspan="8"><p class="line_bluedot"></p></td></tr>
						<tr>
							<th><bean:message key="Contract_No"/></th>
							<td  colspan="3">
								<input name="ctrt_no" id="ctrt_no" type="text" style="width:80px;ime-mode:disabled;text-transform:uppercase;" required dataformat="engup" otherchar="-_" onBlur="strToUpper(this);" onchange="getCtrtInfo(this);" maxlength="10" /><!-- 						
								 --><button type="button" name="btn_ctrt_no" id="btn_ctrt_no" class="input_seach_btn" tabindex="-1" onClick="doWork('btn_ctrt_no');"></button><!-- 
								 --><input name="ctrt_nm" id="ctrt_nm" type="text" style="width:240px;ime-mode:disabled;text-transform:uppercase;" required dataformat="excepthan" onBlur="strToUpper(this);" onkeypress="if(event.keyCode==13){CtrtPopup('form');}" maxlength="100"/>
								<input name="rtp_no" id="rtp_no" type="hidden"/>
							</td>
							<th><bean:message key="Status"/></th>
							<td><input name="bk_sts_nm" id="bk_sts_nm" type="text" dataformat="etc" style="width:109px;border-width:0;font-weight: bold;" readonly="readonly" tabindex="-1"/> <!-- #1940 [WMS4.0] Inbound / Outbound Status 색상 구분 이후 추가 개선 사항 -->
								<input name="bk_sts_cd" id="bk_sts_cd" type="hidden" />
							</td>
							<th><bean:message key="Order_Type"/></th>
							<td>
								<select name="ord_tp_cd" id="ord_tp_cd" class="search_form" style="width: 120px;">
								</select>
							</td>
						</tr>
						<tr>
							<th><bean:message key="Owner"/></th>
							<td colspan="3">
								<input type="hidden" name="owner_cd" id="owner_cd" type="text"/>
								<input id="owner_nm" name="owner_nm" type="text" dataformat="excepthan" onblur="strToUpper(this);" required style="ime-mode:disabled;text-transform:uppercase;width:324px;" maxlength="50" onkeyup="keyUp_maxLength(this);" onkeypress="keyPress_maxLength(this);if(event.keyCode==13){CustomerPopup('owner_cd','e');}"/><!-- 
								 --><button type="button" name="btn_owner_cd" id="btn_owner_cd" class="input_seach_btn" tabindex="-1" onclick="doWork('btn_owner_cd')"></button>
							</td>
							<th><bean:message key="Booking_Date"/></th>
							<td><input name="bk_date" id="bk_date" type="text" style="width:80px;" required maxlength="10" onKeyUp="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};"
								onkeypress="onlyNumberCheck();" onblur='mkDateFormatType(this, event, true,1);dateWmsRangeValid(this, "Booking Date");'/><!-- 
								 --><button class="calendar" tabindex="-1" type="button" name="btn_bk_date" id="btn_bk_date" onClick="doWork('btn_bk_date');"></button>
							<th style="display: none;"><bean:message key="Loading_Type"/></th>
							<td style="display: none;">
								<select name="load_tp_cd" id="load_tp_cd" class="search_form" style="width: 120px;">
								</select>
							</td>
						</tr>
						<tr>
							<th></th>
							<td rowspan="5" colspan="3" style="vertical-align: top;"><textarea name="owner_addr1" id="owner_addr1" required maxlength="1000" onkeypress="keyPress_maxLength(this);" onkeyup="keyUp_maxLength(this);" style="width:353px;height:87px; ime-mode:disabled; text-transform:uppercase;resize:none;" onblur="strToUpper(this);"></textarea></td>
							
							<th><bean:message key="Estimate_Date"/></th>
							<td><input name="est_out_dt" id="est_out_dt" type="text" style="width:80px;" required maxlength="10" onKeyUp="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};"
								onkeypress="onlyNumberCheck();" onblur='mkDateFormatType(this, event, true,1);dateWmsRangeValid(this, "Estimate Date");'/><!-- 
								 --><button class="calendar" tabindex="-1" type="button" name="btn_est_out_dt" id="btn_est_out_dt" onClick="doWork('btn_est_out_dt');"></button><!-- 
								 --><input name="est_out_hm" id="est_out_hm" type="text" style="width:40px;" dataformat="hm" maxlength="5" onbeforedeactivate="ComAddSeparator(this, 'hm');setHm(this);" onbeforeactivate="ComClearSeparator(this, 'hm');" onblur="timeCheck(this);"/>
							</td>
							<th style="display: none;"><bean:message key="EID_Type"/></th>
							<td style="display: none;">
								<select name="trade_tp_cd" id="trade_tp_cd" class="search_form" style="width: 120px;">
								</select>
							</td>
						</tr>
						<tr>
							<th></th>
							<th><bean:message key="Outbound_Date"/></th>
							<td><!-- 
							 --><input name="outbound_dt" id="outbound_dt" type="text" style="width:80px;" dataformat="mdy" readonly="readonly"/><!-- 
							  --></td>
							<th style="display: none;"><bean:message key="FWD_Type"/></th>
							<td style="display: none;">
								<select name="fwd_tp_cd" id="fwd_tp_cd" class="search_form" style="width: 120px;">
								</select>
							</td>
						</tr>
						<!-- #4562 [Korex] WMS Outbound Delivery Status (v461.14) -->
						<tr>
							<th></th>
							<th>Delivered</th>
							<td>
								<input type="checkbox" name="dlvr_flg" id="dlvr_flg" onchange="checkDelivered()" onclick="flgChange(this);">		
							</td>
							<th>Delivered Date</th>
							<td> 
							    <input type="text" name="rcv_shp_dt" id="rcv_shp_dt" maxlength="10" onkeypress="onlyNumberCheck();mkDateFormatType(this, event, false,1)" onkeyup="onlyNumberCheck();mkDateFormatType(this, event, false,1)" onblur="onlyNumberCheck();mkDateFormatType(this, event, true,1);dateRangeValid(this, 'Shipping Date');" style="width:75px;text-align:center;"> 
							    <button type="button" id="rcv_dt_cal" name="rcv_dt_cal" onClick="doWork('btn_rcv_shp_dt');" class="calendar" tabindex="-1"></button>
							    <input type="text" name="rcv_shp_tm" id="rcv_shp_tm" maxlength="4" style="width:50px;text-align:center;" onchange="timeCheck(this);" onkeypress="onlyNumberCheck();">
							</td>
						</tr>
						<tr>
							<th></th>
							<th><bean:message key="Ship_To"/></th>
							<td colspan="4"><input required name="buyer_cd" id="buyer_cd" type="text" style="width:80px;ime-mode:disabled;text-transform:uppercase;" dataformat="excepthan" onblur="strToUpper(this);getInfo_BuyCd(this)" maxlength="10"/><!-- 						
										 --><button type="button" id="btn_buyer_cd" name="btn_buyer_cd" class="input_seach_btn" tabindex="-1" onclick="doWork('btn_buyer_cd')"></button><!-- 
										 --><input required type="text" id="buyer_nm" name="buyer_nm" style="ime-mode:disabled;text-transform:uppercase;width:282px;" maxlength="50" dataformat="excepthan" onblur="strToUpper(this);" onkeypress="if(event.keyCode==13){CustomerPopup('buyer_nm','e');}"/><!-- 
										 --><!-- <button type="hidden" class="multiple_inq" tabindex="-1" name="btn_owner_addr" id="btn_owner_addr" onclick="doWork('btn_buyer_addr')"></button> -->
										<!-- <input id="buyer_addr1" name="buyer_addr1" style="ime-mode:disabled;text-transform:uppercase;width:282px;" maxlength="4000" dataformat="excepthan" onblur="strToUpper(this);" onkeydown="if(event.keyCode==13){CustomerPopup('buyer_addr1','e');}"/> -->
							</td>
						</tr>
						<tr>
							<th></th>
							<th><bean:message key="Ship_To_Address"/></th>
							<td colspan="4">
								<textarea id="buyer_addr1" name="buyer_addr1" style="ime-mode:disabled;text-transform:uppercase;width:6px;height:80px;width:395px;" maxlength="400" dataformat="excepthan" onblur="strToUpper(this);"></textarea>
							</td>
						</tr>
						<tr>
							<th colspan="4"></th>
							<th><bean:message key="Reference_No"/></th>
							<!-- OFVFOUR-8098 [MTS] WMS - Outbound Management and Closing In & Out -->
							<td><input name="ref_no" id="ref_no" type="text" onkeypress="keyPress_maxLength(this);" onkeyup="keyUp_maxLength(this);" style="ime-mode:disabled;text-transform:uppercase;width: 153px" dataformat="excepthan" onblur="strToUpper(this);" maxlength="50"/></td>
							<th><bean:message key="Invoice_No"/></th>
							<td><input name="commc_inv_no" id="commc_inv_no" type="text" onkeypress="keyPress_maxLength(this);" onkeyup="keyUp_maxLength(this);" dataformat="excepthan" onblur="strToUpper(this);" maxlength="30" style="ime-mode:disabled;text-transform:uppercase;width:131px" /></td>
						</tr>
						<tr><td colspan="8"><p class="line_bluedot"></p></td></tr>
						<tr>
							<th><bean:message key="Trucker"/></th>
							<td colspan="3"><input name="trucker_cd" id="trucker_cd" type="text" style="ime-mode:disabled;text-transform:uppercase;width:70px;" dataformat="excepthan" onblur="strToUpper(this);getInfo_TruckerCode(this);" maxlength="10" /><!-- 	
								 --><button type="button" name="btn_trucker_cd" id="btn_trucker_cd" class="input_seach_btn" tabindex="-1" onclick="doWork('btn_trucker_cd')"></button><!-- 					
								 --><input name="trucker_nm" maxlength="100" onkeypress="if(event.keyCode==13){CustomerPopup('trucker_cd','e');}" id="trucker_nm" type="text" style="ime-mode:disabled;text-transform:uppercase;width:250px;" dataformat="excepthan" onblur="strToUpper(this);"  />
							</td>
							<th><span id="rmk_title1"><bean:message key="Remark"/></span><span id="rmk_title2" style="display:none"><bean:message key="Reason"/></span>
							</th>
							<td colspan="3" rowspan="3">
								<textarea name="rmk" id="rmk" maxlength="1000" onkeypress="keyPress_maxLength(this);" onkeyup="keyUp_maxLength(this);" style="height:80px;width:395px;resize: none" onblur="strToUpper(this);"></textarea>
							</td>
						</tr>
						<tr>
							<th><bean:message key="TR_CNTR"/></th>
							<td><input name="eq_tpsz_cd" id="eq_tpsz_cd" type="text" onkeypress="keyPress_maxLength(this);" onkeyup="keyUp_maxLength(this);" dataformat="excepthan" onblur="strToUpper(this);" style="ime-mode:disabled;text-transform:uppercase;width:40px" maxlength="4"/><!-- 
								 --><button type="button" name="btn_eq_tpsz_cd" id="btn_eq_tpsz_cd" class="input_seach_btn" tabindex="-1" onclick="doWork('btn_eq_tpsz_cd')"></button><!-- 
								 --><input name="eq_no" id="eq_no" type="text" onkeypress="keyPress_maxLength(this);" onkeyup="keyUp_maxLength(this);" dataformat="excepthan" onblur="strToUpper(this);" maxlength="20" style="ime-mode:disabled;text-transform:uppercase;width:71px"/>
								<input name="eq_tp_cd" id="eq_tp_cd" type="hidden" />
							</td>
							<th><bean:message key="Seal_No"/></th>
							<td ><input name="seal_no" id="seal_no" type="text" onkeypress="keyPress_maxLength(this);" onkeyup="keyUp_maxLength(this);" dataformat="excepthan" onblur="strToUpper(this);" style="width:96px" maxlength="100"/><!-- 
								 --><button type="button" class="btn_etc" tabindex="-1" name="btn_seal_no" id="btn_seal_no" onclick="doWork('btn_seal_no')">..</button>
							</td>
						</tr>
						<tr>
							<th><bean:message key="DO_No"/></th>
							<td><input name="dlv_ord_no" id="dlv_ord_no" maxlength="30" type="text" onkeypress="keyPress_maxLength(this);" onkeyup="keyUp_maxLength(this);" dataformat="excepthan" onblur="strToUpper(this);" style="ime-mode:disabled;text-transform:uppercase;width:144px"/></td>
							<th><bean:message key="Work_Sheet"/></th>
							<td>
								<button type="button" class="btn_etc"  onClick="btn_uploading_sheet();" id="btn_create_uploading_sheet" name="btn_create_uploading_sheet"><bean:message key="Create"/></button><!-- 						
							 --><img src="<%=CLT_PATH%>/web/img/main/icon_doc.gif" style="cursor:hand;" name="btn_document_uploading_sheet" id="btn_document_uploading_sheet" onclick="btn_uploading_sheet()" />
								<input type="hidden" name="work_sht_yn" id="work_sht_yn" />
							</td>
						</tr>
						<tr><td colspan="8"><p class="line_bluedot"></p></td></tr>
					</table>
				</div>
			<div style="width:1000px; margin-top:-15px; padding:5px 0 5px 0;"><center><span id="btn_show_nm"><img src="<%=CLT_PATH%>/web/img/main/04_icon_show.gif" style="cursor:hand" onClick="btn_show_shipping(true)"></img></span><!-- 
				--><span id="btn_hide_nm" style="display:none"><img src="<%=CLT_PATH%>/web/img/main/04_icon_hide.gif" style="cursor:hand" onClick="btn_show_shipping(false)"></img></span></center></div>
				
			<div class= "opus_design_inquiry" style="display:none;"  id="show_shipping">
				<table>
					<colgroup>
						<col width="75" />
						<col width="412" />
						<col width="150" />
						<col width="*" />
					</colgroup>
						<tr>
							<th><bean:message key="Master_BL"/></th>
							<td><input name="mbl_no" id="mbl_no" type="text" onkeypress="keyPress_maxLength(this);" onkeyup="keyUp_maxLength(this);" dataformat="excepthan" onblur="strToUpper(this);" maxlength="20" style="ime-mode:disabled;text-transform:uppercase;width:353px" /></td>
							<th><bean:message key="POL_ETD"/></th>
							<td>
								<input name="pol" id="pol" type="text" style="ime-mode:disabled;text-transform:uppercase;width:70px;" dataformat="excepthan" onblur="strToUpper(this);onblur_Pol(this.name);" maxlength="8" /><!-- 
								 --><button type="button" name="btn_pol" id="btn_pol" class="input_seach_btn" tabindex="-1" onclick="doWork('btn_pol')"></button><!-- 
								 --><input name="pol_nm" id="pol_nm" type="text" dataformat="excepthan" onblur="strToUpper(this);" style="ime-mode:disabled;text-transform:uppercase;width:180px;" onkeydown="if(event.keyCode==13){podPopup('pol','e');}" /><!-- 
								 --><span class="dash">/</span><input name="etd" id="etd" type="text" style="width:80px;" maxlength="10" onKeyUp="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};"
								onkeypress="onlyNumberCheck();" onblur="mkDateFormatType(this, event, true,1)"/><!-- 
								 --><button class="calendar" tabindex="-1" type="button" name="btn_etd" id="btn_etd" onClick="doWork('btn_etd');"></button>
							</td>
							
						</tr>
						<tr>
							<th><bean:message key="House_BL"/></th>
							<td><input name="hbl_no" id="hbl_no" type="text" onkeypress="keyPress_maxLength(this);" onkeyup="keyUp_maxLength(this);" dataformat="excepthan" onblur="strToUpper(this);" maxlength="20" style="ime-mode:disabled;text-transform:uppercase;width:353px" /></td>
							<th><bean:message key="POD_ETA"/></th>
							<td>
								<input name="pod" id="pod" type="text" style="ime-mode:disabled;text-transform:uppercase;width:70px;" dataformat="excepthan" onblur="strToUpper(this);onblur_Pod(this.name)" maxlength="8" /><!-- 
								 --><button type="button" name="btn_pod" id="btn_pod" class="input_seach_btn" tabindex="-1" onclick="doWork('btn_pod')"></button><!-- 
								 --><input name="pod_nm" id="pod_nm" type="text" style="ime-mode:disabled;text-transform:uppercase;width:180px;" dataformat="excepthan" onblur="strToUpper(this);" onkeydown="if(event.keyCode==13){podPopup('pod','e');}" /><!-- 
								 --><span class="dash">/</span><input name="eta" id="eta" type="text" style="width:80px;" maxlength="10" onKeyUp="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};"
								onkeypress="onlyNumberCheck();" onblur="mkDateFormatType(this, event, true,1)"/><!-- 
								 --><button class="calendar" tabindex="-1" type="button" name="btn_eta" id="btn_eta" onClick="doWork('btn_eta');"></button>
							</td>	
						</tr>
						<tr>
							<th><bean:message key="VSL_VOY"/></th>
							<td>
								<input name="vsl_cd" id="vsl_cd" type="text" style="ime-mode:disabled;text-transform:uppercase;width:70px;" dataformat="excepthan" onblur="strToUpper(this);" maxlength="10" /><!-- 
								 --><button type="button" name="btn_vsl_cd" id="btn_vsl_cd" class="input_seach_btn" tabindex="-1" onclick="doWork('btn_vsl_cd')"></button><!-- 
								 --><input name="vsl_nm" id="vsl_nm" type="text" dataformat="excepthan" onblur="strToUpper(this);" onkeydown="if(event.keyCode==13){vslPopup();}" style="ime-mode:disabled;text-transform:uppercase;width:186px;" maxlength="35" /><!-- 
								 --><span class="dash">/</span><input name="voy"  id="voy" type="text" onkeypress="keyPress_maxLength(this);" onkeyup="keyUp_maxLength(this);" style="ime-mode:disabled;text-transform:uppercase;width:52px;" dataformat="excepthan" onblur="strToUpper(this);" maxlength="11" />
							</td>
							<th><bean:message key="DEL"/></th>
							<td>
								<input name="del" id="del" type="text" style="ime-mode:disabled;text-transform:uppercase;width:70px;" dataformat="excepthan" onblur="strToUpper(this);onblur_Del(this.name);" maxlength="8" /><!-- 
								 --><button type="button" name="btn_del" id="btn_del" class="input_seach_btn" tabindex="-1" onclick="doWork('btn_del')"></button><!-- 
								 --><input name="del_nm" id="del_nm" type="text" style="ime-mode:disabled;text-transform:uppercase;width:180px;"onblur="strToUpper(this);" onkeydown="if(event.keyCode==13){podPopup('del', 'e');}" />
							</td>
						</tr>
						<tr>
							<th><bean:message key="Carrier"/></th>
							<td colspan="4">
								<input name="carrier_cd" id="carrier_cd" type="text" style="ime-mode:disabled;text-transform:uppercase;width:70px;" dataformat="excepthan" onblur="strToUpper(this);" maxlength="8" /><!-- 
								 --><button type="button" name="btn_carrier_cd" id="btn_carrier_cd" class="input_seach_btn" tabindex="-1" onclick="doWork('btn_carrier_cd')"></button><!-- 
								 --><input name="carrier_nm" id="carrier_nm" type="text" style="ime-mode:disabled;text-transform:uppercase;width:250px;" dataformat="excepthan" onblur="strToUpper(this);" onkeydown="if(event.keyCode==13){CustomerPopup('carrier_cd','e');}" />
							</td>
						</tr>
					</table>
	      			</div>
	      		</div>
	      		<div class="opus_design_grid clear"  style="margin-top: 10px">
				<div class="opus_design_btn">
					<table>
						<tr>
						 	<td><button type="button" class="btn_accent" id="stockSelection" onClick="btn_stockSelection();"><bean:message key="Stock_Selection"/></button></td>
						    <td><button type="button" class="btn_normal" id="allocComplete" disabled="disabled" onClick="allocCmplPopup();"><bean:message key="AllocComplete"/></button></td> 
						    <td style="width:50px;"><button type="button" class="btn_normal" onClick="sheet2RowAdd_OnClick()"><bean:message key="Add"/></button></td>
						    
						    <td><input type="text" style="width:30px;text-align:right;margin-bottom: 4px;" name="copy_cnt" value="1" onkeyPress="onlyNumberCheck();" onkeyup="numberCommaLen(this,7,0);" maxlength="3" ></td>
				 			<td><button type="button" class="btn_normal" id="btn_multi_row_add_sheet2" name="btn_multi_row_add_sheet2" onClick="doWork('sheet2_btn_multi_row_add');">Multi Row Add</button></td>
						    
						    <td><button type="button" class="btn_normal" id="sheet2_btn_show" name="sheet2_btn_show" onClick="doWork('sheet2_btn_show');">>></button></td> 
					 	    <td><button type="button" class="btn_normal" id="sheet2_btn_hide" name="sheet2_btn_hide" onClick="doWork('sheet2_btn_hide');" style="display: none;"><<</button></td>
					 	</tr>
			 	    </table>
				</div>
				<script type="text/javascript">comSheetObject('sheet2');</script>
			</div>
	  			</div>	
	  		<!-- Freight tab -->
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
								 <span  style="color: blue;font: bold;" id="sp_curr_cd"></span> <input name="s_inv_ttl_amt" id="s_inv_ttl_amt" onkeydown="if(event.keyCode==13){CustomerPopup('trucker_cd','e');}" type="text" style="ime-mode:disabled;text-transform:uppercase;width:250px;" dataformat="excepthan" onblur="strToUpper(this);" disabled="disabled"  />
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
			<!-- Freight -->	
			<div id="tabLayer" name="tabLayer" style="display:none;">
				<div class="opus_design_grid">
					<script type="text/javascript">comSheetObject('sheet3');</script>
				</div>
			</div>	
			
			<div id="tabLayer" name="tabLayer" style="display:none;">
				<div class="opus_design_inquiry">
					<table>
						<colgroup>
							<col width="50" />
							<col width="120" />
							<col width="50" />
							<col width="220" />
							<col width="*" />
						</colgroup>
						<tbody>
							<tr>
								<th><bean:message key="Order_No"/></th>
								<td><input name="file_cust_ord_no" id="file_cust_ord_no" type="text" style="width:102px;"  tabindex="-1" readonly /></td>
								<th><bean:message key="File_Path"/></th>
								<td>
								<div id="logo_rec_id" style="display: none;"><!--
				                --></div><!--
				                --><input tabindex = "-1" type="file" name="logo_rectangle"  size="25"/><!--
				                --><input name="logo_rec_flg" type="checkbox" value="Y"  style="display: none">
				                <button type="button" class="btn_etc" name="btn_file_delete" id="btn_file_delete" onClick="btn_File_Delete();"><bean:message key="File_Delete"/></button>
								<button type="button" class="btn_etc" name="btn_file_upload" id="btn_file_upload" onClick="btn_File_Upload();"><bean:message key="File_Upload"/></button> 
								</td>
							</tr>
						</tbody>
					</table>
				</div>
				<div class="opus_design_grid clear">
					<script type="text/javascript">comSheetObject('sheet4');</script>
				</div>
			</div>
		</div>
		<div id="hiddenSheet" class="opus_design_grid clear" style="display: none;">
			<script type="text/javascript">comSheetObject('sheet5');</script>
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