
<%--=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : WHOutbkMgmt.jsp
*@FileTitle  : Outbound Booking Management
*@author     : Nam.Tran - DOU Network
*@version    : 1.0
*@since      : 2015/04/16
=========================================================--%>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="clt-paging"   prefix="paging" %>
<%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
	<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css"/>
    <script type="text/javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/CalculationUtil.js?ver=<%=CLT_JS_VER%>"></script>
    <script type="text/javascript" src="<%=CLT_PATH%>/js/common/ModalCalendar.js?ver=<%=CLT_JS_VER%>"></script>
    <script type="text/javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/SUP_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
    <script language="javascript" src="<%=CLT_PATH%>/apps/fis/see/bmd/housebl/script/BL_FRT.js?ver=<%=CLT_JS_VER%>"></script>
    <script language="javascript" src="<%=CLT_PATH%>/apps/fis/see/bmd/housebl/script/BL_CODE_UTIL.js?ver=<%=CLT_JS_VER%>"></script>
    <script type="text/javascript" src="apps/fis/wms/whoutbooking/script/WHOutbkMgmt.js?ver=<%=CLT_JS_VER%>"></script>
    
<%
	String fwd_bk_no = "";
	
	try {
		fwd_bk_no = request.getParameter("fwd_bk_no")== null?"":request.getParameter("fwd_bk_no");
	}catch(Exception e) {
		out.println(e.toString());
	}
	String uploadfile = "";

	try {
		uploadfile = request.getParameter("uploadfile") == null ? "" : request.getParameter("uploadfile");
	} catch (Exception e) {
		out.println(e.toString());
	}
%>
   	<script >
   <%-- 	<%=JSPUtil.getIBCodeCombo("fwd_dir"   , "", "WBD", "0", "")%>
   	<%=JSPUtil.getIBCodeCombo("bk_sts_cd" , "", "WBS", "0", "")%>
	<%=JSPUtil.getIBCodeCombo("order_rel" , "", "WB1", "0", "")%>
	<%=JSPUtil.getIBCodeCombo("wb_src_cd" , "", "WB2", "0", "")%>
   	<%=JSPUtil.getIBCodeCombo("ord_tp_cd" , "", "WB3", "0", "")%>   	
   	<%=JSPUtil.getIBCodeCombo("load_tp_cd", "", "WB4", "0", "")%> --%>
	</script>
	
	<logic:notEmpty name="EventResponse">
		<bean:define id="valMap" name="EventResponse" property="mapVal"/>
		
		<bean:define id="fwd_dir" name="valMap" property="fwd_dir"/>
		<bean:define id="bk_sts_cd" name="valMap" property="bk_sts_cd"/>
		<bean:define id="order_rel" name="valMap" property="order_rel"/>
		<bean:define id="wb_src_cd" name="valMap" property="wb_src_cd"/>
		<bean:define id="ord_tp_cd" name="valMap" property="ord_tp_cd"/>
		<bean:define id="load_tp_cd" name="valMap" property="load_tp_cd"/>
		<bean:define id="wh_cd_lst" name="valMap" property="wh_cd_lst"/>
		<bean:define id="currCdList" name="valMap" property="currCdList"/>
		<bean:define id="UNITCD" name="valMap" property="UNITCD"/>
		
	</logic:notEmpty>
	
	<script>
	
	var fwd_dirText = "";
	var fwd_dirCode = "";
	
	'<logic:notEmpty name="fwd_dir">'
		'<logic:iterate id="item" name="fwd_dir">'
			fwd_dirCode+="|"+'<bean:write name="item" property="code"/>';
			fwd_dirText+="|"+'<bean:write name="item" property="name"/>';
		'</logic:iterate>'
		
		fwd_dirCode = fwd_dirCode.substring(1);
		fwd_dirText = fwd_dirText.substring(1);
	'</logic:notEmpty>'
	
	var bk_sts_cdText = "";
	var bk_sts_cdCode = "";
	
	'<logic:notEmpty name="bk_sts_cd">'
		'<logic:iterate id="item" name="bk_sts_cd">'
			bk_sts_cdCode+="|"+'<bean:write name="item" property="code"/>';
			bk_sts_cdText+="|"+'<bean:write name="item" property="name"/>';
		'</logic:iterate>'
		
		bk_sts_cdCode = bk_sts_cdCode.substring(1);
		bk_sts_cdText = bk_sts_cdText.substring(1);
	'</logic:notEmpty>'
	
	var order_relText = "";
	var order_relCode = "";
	
	'<logic:notEmpty name="order_rel">'
		'<logic:iterate id="item" name="order_rel">'
			order_relCode+="|"+'<bean:write name="item" property="code"/>';
			order_relText+="|"+'<bean:write name="item" property="name"/>';
		'</logic:iterate>'
		
		order_relCode = order_relCode.substring(1);
		order_relText = order_relText.substring(1);
	'</logic:notEmpty>'
	
	var wb_src_cdText = "";
	var wb_src_cdCode = "";
	
	'<logic:notEmpty name="wb_src_cd">'
		'<logic:iterate id="item" name="wb_src_cd">'
			wb_src_cdCode+="|"+'<bean:write name="item" property="code"/>';
			wb_src_cdText+="|"+'<bean:write name="item" property="name"/>';
		'</logic:iterate>'
		
		wb_src_cdCode = wb_src_cdCode.substring(1);
		wb_src_cdText = wb_src_cdText.substring(1);
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
	
	var UNITCDText = "";
	var UNITCDCode = "";
	
	'<logic:notEmpty name="UNITCD">'
		'<logic:iterate id="item" name="UNITCD">'
			UNITCDCode+="|"+'<bean:write name="item" property="cd_val"/>';
			UNITCDText+="|"+'<bean:write name="item" property="cd_nm"/>';
		'</logic:iterate>'
		
		UNITCDCode = UNITCDCode.substring(1);
		UNITCDText = UNITCDText.substring(1);
	'</logic:notEmpty>'
	
	</script>
	
	<script type="text/javascript">
	function setupPage(){
		var errMessage = "";
		if (errMessage.length >= 1) {
			ComShowMessage(errMessage);
		} // end if
		loadPage(true);
	}
</script>
	
<form id="form" name="form">
 
 <input type="hidden" name="form_mode" value="NEW" />
<%--  <input type="hidden" name="curr_date" value="<%=DateUtility.transformDate(CalendarUtilities.dateToString(new Date()), "-")%>" />
 <input type="hidden" name="def_wh_cd" value="<%=userInfo.getDef_wh_cd()%>" />
 <input type="hidden" name="def_wh_nm" value="<%=userInfo.getDef_wh_nm()%>" />
 <input type="hidden" name="def_wh_ctrt_no" value="<%=userInfo.getDef_wh_ctrt_no()%>" />
 <input type="hidden" name="def_wh_ctrt_nm" value="<%=userInfo.getDef_wh_ctrt_nm()%>" />
 <input type="hidden" name="def_ord_tp_cd" id="def_ord_tp_cd" value="<%=userInfo.getDef_ord_tp_cd()%>" />
 <input type="hidden" name="user_id" value="<%=userInfo.getUser_id()%>" />
 <input type="hidden" name="user_nm" value="<%=userInfo.getUser_nm()%>" />
 <input type="hidden" name="org_cd" value="<%=userInfo.getOrg_cd()%>" /> --%>
 <input type="hidden" name="uploadfile" value="<%=uploadfile%>"/>
 <input type="hidden" name="f_cmd" value="" />
 <input type="hidden" name="curr_date" value="" />
 <input type="hidden" name="def_wh_cd" value="<%=userInfo.getDef_wh_cd()%>" />
 <input type="hidden" name="def_wh_nm" value="<%=userInfo.getDef_wh_nm()%>" />
 <input type="hidden" name="def_wh_ctrt_no" value="<%=userInfo.getDef_wh_ctrt_no()%>" />
 <input type="hidden" name="def_wh_ctrt_nm" value="<%=userInfo.getDef_wh_ctrt_nm()%>" />
 <input type="hidden" name="def_ord_tp_cd" id="def_ord_tp_cd" value="" />
 <input type="hidden" name="user_id" value="<%=userInfo.getUsrid()%>" />
 <input type="hidden" name="user_nm" value="<%=userInfo.getUser_name()%>" />
 <input type="hidden" name="org_cd" value="<%=userInfo.getOfc_cd()%>" />
 
 <input type="hidden" name="wh_list_ath" value="<%=userInfo.getWh_list_ath()%>" /> <!-- Get list warehouse from TB_SEQ table -->
 <input type="hidden" name="wh_cfg" value="<%=userInfo.getWh_cfg()%>" /> <!-- Get list warehouse from TB_USR table --> 

 <input type="hidden" name="bk_mode" value="I" />

<input type="hidden" name="com_mrdPath">
<input type="hidden" name="com_mrdArguments"> 
<input type="hidden" name="com_mrdBodyTitle"> 

 <input type="hidden" name="svc_tp_cd" value="WB" />
 <input type="hidden" name="doc_ref_tp_cd" value="WOB" />
 <input type="hidden" name="doc_tp_cd" value="WOB" />
 <input type="hidden" name="doc_ref_no" value="" />
 <input type="hidden" name="doc_ref_no2" value="" />

 <input type="hidden" name="old_fwd_dir"/>
 <input type="hidden" name="temp_owner_cd"/>
 <input type="hidden" name="old_ctrt_no"/>
 <input type="hidden" name="temp_ctrt_no"/>
 
  <input type="hidden" name="wave_no" id="wave_no"/>
  
  <div class="page_title_area clear">
	<!-- page_title(S) -->
	<h2 class="page_title"><button type="button"><%=LEV3_NM%></button></h2>
	<!-- page_title(E) -->
	<!-- opus_design_btn(S) -->
	<div class="opus_design_btn TOP">
<%-- 		<button type="button" 	style="display:none;" btnAuth="<%= roleBtnVO.getAttr1() %>"		class="btn_accent" name="btn_search" 	id="btn_search" 	onclick="doWork('SEARCHLIST')">Search</button><!-- 
		--><button type="button" style="display:none;" btnAuth="<%= roleBtnVO.getAttr3() %>"	class="btn_normal" name="btn_save" 		id="btn_save" 		onclick="doWork('SAVE')">Save</button><!-- 
		--><button type="button" style="display:none;" btnAuth="COPY"							class="btn_normal" name="btn_copy" 		id="btn_copy" 		onclick="doWork('btn_copy')">Copy</button><!-- 
		--><button type="button" style="display:none;" btnAuth="REINSTATE"						class="btn_normal" name="btn_reinstate" id="btn_reinstate" 	onclick="doWork('btn_reinstate')">Reinstate</button><!-- 
		--><button type="button" style="display:none;" btnAuth="<%= roleBtnVO.getAttr2() %>"	class="btn_normal" name="btn_new" 		id="btn_new"		onclick="doWork('NEW')">New</button><!-- 
		--><button type="button" style="display:none;" btnAuth="CANCEL"							class="btn_normal" name="btn_cancel" 	id="btn_cancel"		onclick="doWork('btn_cancel')">Cancel</button><!--
		--><button type="button" style="display:none;" btnAuth="ALLOCATION"						class="btn_normal" name="lnk_allocation"id="lnk_allocation"	onclick="doWork('lnk_allocation')">Allocation</button><!--
		--><button type="button" style="display:none;" btnAuth="LOAD_PLAN"						class="btn_normal" name="lnk_load_plan" id="lnk_load_plan"	onclick="doWork('lnk_load_plan')">Load Plan</button><!--
		--><button type="button" style="display:none;" btnAuth="OUTBOUND_COMPLETE"				class="btn_normal" name="lnk_outbound" 	id="lnk_outbound" 	onclick="doWork('lnk_outbound')">Outbound Complete</button><!--
		--><button type="button" style="display:none;" btnAuth="<%= roleBtnVO.getAttr5() %>"	class="btn_normal" name="lnk_print" 	id="lnk_print" 		onclick="doWork('lnk_print')">Print</button> 
 --%>	 </div>
	<!-- opus_design_btn(E) -->
	<!-- page_location(S) -->
		 <div class="location">
		   <span><%=LEV1_NM%></span> &gt;
		   <span><%=LEV2_NM%></span> &gt;
		   <span><%=LEV3_NM%></span>
	   </div>
	<!-- page_location(E) -->
</div>

<div class="over_wrap" height="100%">
<div class= "wrap_search_tab">
	<div class="opus_design_inquiry">
		<table>
			<colgroup>
				<col width="80" />
				<col width="*"/>
			</colgroup>
			<tbody>
				<tr>					
					<th>Booking No.</th>
					<td><input name="c_wob_bk_no" id="c_wob_bk_no" type="text" class="L_input" style="width:228px;ime-mode:disabled;text-transform:uppercase;" dataformat="engup" onBlur="strToUpper(this);" maxlength="20" value="<%=fwd_bk_no%>" /></td>
				</tr>
			</tbody>	
		</table>
	</div>
</div>

  <div class="wrap_result_tab">
	<ul id="ulTab" class="opus_design_tab">
        <li id=Tab01 class="nowTab"><a href="#" style="cursor:hand;" onClick="javascript:goTabSelect('01');"><span>Header</span></a></li><!-- 
         --><li id=Tab02><a href="#" style="cursor:hand;" onClick="javascript:goTabSelect('02');"><span>Booking Item</span></a></li><!-- 
          --><li id=Tab03><a href="#" style="cursor:hand;" onClick="javascript:goTabSelect('03');"><span>Doc Detail</span></a></li><!-- 
          --><li id=Tab04><a href="#" style="cursor:hand;" onClick="javascript:goTabSelect('04');"><span>Attachment</span></a></li><!-- 
     --></ul>
			
	<div id="tabLayer" name="tabLayer" style="display:inline">
	 <%@ include file = "./WHOutbkMgmt_01.jsp"%>
	</div>
	
	<div id="tabLayer" name="tabLayer" style="display:none">
	 <%@ include file = "./WHOutbkMgmt_02.jsp"%>
	</div>
	
	<div id="tabLayer" name="tabLayer" style="display:none">
	 <%@ include file = "./WHOutbkMgmt_03.jsp"%>
	</div>
	
	<div id="tabLayer" name="tabLayer" style="display:none">
	 <%@ include file = "./WHOutbkMgmt_04.jsp"%>
	</div>
</div>
</div>
</form>  

<script type="text/javascript">
var attr_extension = "<%= roleBtnVO.getAttr_extension() %>";
doBtnAuthority(attr_extension);
</script>
<form name="frm1" method="POST" action="./GateServlet.gsl">
	<input type="hidden" name="goWhere" value="fd" id="goWhere" />
    <input type="hidden" name="bcKey" value="downloadTlFileTemplateWMS" id="bcKey" />
    <input type="hidden" name="file_path" value="" id="file_path" />
    <input type="hidden" name="file_name" value="" id="file_name"/>	
    <input type="hidden" name="docType" value="" id="docType" />
</form>	

<iframe name="ifra_hidden" style="width:0;height:0;visibility:hidden" border=0></iframe>

