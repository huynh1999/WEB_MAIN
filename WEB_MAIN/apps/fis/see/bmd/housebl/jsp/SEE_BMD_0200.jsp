<%--
=========================================================
*Copyright(c) 2009 CyberLogitec. All Rights Reserved.
=========================================================
=========================================================
*@FileName   : SEE_BMD_0200.jsp
*@FileTitle  : OEH Booking 등록
*@Description: OEH Booking 등록 및 조회
*@author     : You,Ji-Won
*@version    : 1.0 - 09/28/2009
*@since      :

*@Change history:
*@author     : Hoang.Pham
*@version    : 2.0 - 2014/12/25
*@since      : 2014/12/25
=========================================================
--%>
<%@page import="com.clt.apps.fis.mdm.mcm.office.dto.OfcVO"%>
<%@page import="com.clt.syscommon.response.CommonEventResponse"%>
<%@page import="com.clt.framework.core.layer.event.EventResponse"%>
<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.util.HashMap"%>
<%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
<bean:define id="hblVO"   name="EventResponse" property="objVal"/>
<bean:define id="valMap"  name="EventResponse" property="mapVal"/>

<title><bean:message key="system.title"/></title>
<script type="text/javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js?ver=<%=CLT_JS_VER%>"></script>
<script type="text/javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
<script type="text/javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
<script type="text/javascript" src="<%=CLT_PATH%>/js/common/CalculationUtil.js?ver=<%=CLT_JS_VER%>"></script>
<!-- 2016-12-12 자동완성 기능 추가 S -->	
<script type="text/javascript" src="<%=CLT_PATH%>/js/common/autocomplete_ui.js?ver=<%=CLT_JS_VER%>"></script>
<!-- 2016-12-12 자동완성 기능 추가 E -->
<script type="text/javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/SEA_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
<script type="text/javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/COM_FRT_MSG.js?ver=<%=CLT_JS_VER%>"></script>
<script type="text/javascript" src="<%=CLT_PATH%>/apps/fis/see/bmd/housebl/script/SEE_BMD_0200.js?ver=<%=CLT_JS_VER%>"></script>
<script type="text/javascript" src="<%=CLT_PATH%>/apps/fis/see/bmd/housebl/script/BL_FRT.js?ver=<%=CLT_JS_VER%>"></script>
<script type="text/javascript" src="<%=CLT_PATH%>/apps/fis/see/bmd/housebl/script/BL_CODE_UTIL.js?ver=<%=CLT_JS_VER%>"></script>
<script>	
var AUTOCOMPLETE_YN = 'N';

<logic:notEmpty name="valMap" property="autocompleteYn">
	AUTOCOMPLETE_YN = '<bean:write name="valMap" property="autocompleteYn"/>';
</logic:notEmpty>

	function btnLoad(){
		if (frm1.bkg_seq.value == "") {
			getBtnObj("btn_CreateHBL").style.display = 'none';
			getBtnObj("btnAdd").style.display = 'inline';
			getBtnObj("btnSaveX").style.display  = 'inline';
			getBtnObj("btnModify").style.display  = 'none';
			getBtnObj("btnReady").style.display  = 'none';
			getBtnObj("btnReject").style.display  = 'none';
			getBtnObj("btnConfirm").style.display  = 'none';
			getBtnObj("btnCancel").style.display  = 'none';
			getBtnObj("btnDelete").style.display  = 'none';
			getBtnObj("btnPrint").style.display = 'none';
			getBtnObj("btnCopyBL").style.display = 'none';  /* #2461 [PATENT] Customer Booking 화면에서 House B/L Copy Form 인쇄 */
			getBtnObj("btnCopy").style.display = 'none';
			dispBizBtns('none');
		} else {
			
			getBtnObj("btnAdd").style.display = 'none';
			getBtnObj("btnPrint").style.display = 'inline';
			getBtnObj("btnCopyBL").style.display = 'inline'; /* #2461 [PATENT] Customer Booking 화면에서 House B/L Copy Form 인쇄 */
			getBtnObj("btnCopy").style.display = 'inline';
			
			var dispTp = "none";
			
			if(getBkgEditMode(frm1.bkg_sts_cd.value) == "Y"){
				dispTp = "inline"
			}
			
			getBtnObj("btnModify").style.display = dispTp;
			getBtnObj("btnSaveX").style.display = dispTp;
			getBtnObj("btnDelete").style.display  = dispTp;
			dispBizBtns(dispTp);
			
			if(frm1.bkg_sts_cd.value == 'CR'){ // Created
				
				getBtnObj("btn_CreateHBL").style.display = 'none';
				getBtnObj("btnReady").style.display  = 'inline';
				getBtnObj("btnReject").style.display  = 'none';
				getBtnObj("btnConfirm").style.display  = 'none';
				getBtnObj("btnCancel").style.display  = 'none';
			
			} else if(frm1.bkg_sts_cd.value == 'RD'){ // Ready
			
				getBtnObj("btn_CreateHBL").style.display = 'none';
				getBtnObj("btnReady").style.display  = 'none';
				getBtnObj("btnReject").style.display  = 'inline';
				getBtnObj("btnConfirm").style.display  = 'inline';
				getBtnObj("btnCancel").style.display  = 'none';
				
			} else if(frm1.bkg_sts_cd.value == 'RJ'){ // Rejected
			
				getBtnObj("btn_CreateHBL").style.display = 'none';
				getBtnObj("btnReady").style.display  = 'none';
				getBtnObj("btnReject").style.display  = 'none';
				getBtnObj("btnConfirm").style.display  = 'none';
				getBtnObj("btnCancel").style.display  = 'none';
				
			} else if(frm1.bkg_sts_cd.value == 'CF'){ // Confirmed
			
				getBtnObj("btn_CreateHBL").style.display = 'inline';
				getBtnObj("btnReady").style.display  = 'none';
				getBtnObj("btnReject").style.display  = 'none';
				getBtnObj("btnConfirm").style.display  = 'none';
				getBtnObj("btnCancel").style.display  = 'inline';
				
			} else if(frm1.bkg_sts_cd.value == 'CN'){ // Confirm Canceled
			
				getBtnObj("btn_CreateHBL").style.display = 'none';
				getBtnObj("btnReady").style.display  = 'none';
				getBtnObj("btnReject").style.display  = 'none';
				getBtnObj("btnConfirm").style.display  = 'none';
				getBtnObj("btnCancel").style.display  = 'none';
				
			} else if(frm1.bkg_sts_cd.value == 'BL'){ // BL Created
			
				getBtnObj("btn_CreateHBL").style.display = 'none';
				getBtnObj("btnReady").style.display  = 'none';
				getBtnObj("btnReject").style.display  = 'none';
				getBtnObj("btnConfirm").style.display  = 'none';
				getBtnObj("btnCancel").style.display  = 'none';
				
			}
		}
		
		if (frm1.carrier_bkg_seq.value != "") {
			getBtnObj("btnCarrierBooking").style.display  = 'none';
		} else {
			getBtnObj("btnCarrierBooking").style.display  = 'inline';
		}

	}
	
	function dispBizBtns(dispTp){
		//Freight버튼
		getObj("sdBtns").style.display    = dispTp;
		getObj("bcBtns").style.display    = dispTp;
		getObj("dcBtns").style.display    = dispTp;
		getObj("woBtns").style.display    = dispTp;
	}	
	
    <!-- ###Office Info## -->
    <bean:define id="officeInfo" name="valMap" property="officeInfo"/>
    <bean:define id="ofcVO" name="officeInfo"/>
    var v_ofc_cd = "<bean:write name="ofcVO" property="ofc_locl_nm"/>";

    var user_ofc_cnt_cd = "<%=userInfo.getOfc_cnt_cd()%>";
    
    //[20130926 OJG ]Booking Confirm 출력용 변수.
    var v_ofc_eng_nm = "<bean:write name="ofcVO" property="ofc_eng_nm"/>";	
    var v_eml = "<%=userInfo.getEml()%>";												
	var v_ofc_cd = "<%=userInfo.getOfc_cd()%>";
	var v_phn = "<%=userInfo.getPhn()%>";  
	var v_fax = "<%=userInfo.getFax()%>";
	
	//#2879 [Zimex] after v450, booking confirmation issue
	var usrNm = "<%=userInfo.getUser_name()%>";
	var usrDeptCd = "<%=userInfo.getDept_cd()%>";
	
       /* jsjang 2013.08.27 office, ooh_bkg_rmk 정보 처리 변경 */
	var prn_ofc_cd = "<%=(String)application.getAttribute("PRNT_OFC_CD")%>";
	
	var TPCD1 = '';
    var TPCD2 = '';
    var TPCD3 = '';
    <% boolean isBegin = false; %>
    <!--Role 코드조회-->
    <bean:define id="tpszList" name="valMap" property="cntrTpszList"/>
    <logic:iterate id="codeVO" name="tpszList">
    <% if (isBegin) { %>
    TPCD1 += '|';
    TPCD2 += '|';
    TPCD3 += '|';
    <% } else {
        isBegin = true;
    } %>
    TPCD1 += '<bean:write name="codeVO" property="cntr_tpsz_cd"/>';
    TPCD2 += '<bean:write name="codeVO" property="cntr_tpsz_cd"/>';
    TPCD3 += '<bean:write name="codeVO" property="cntr_grp_cd"/>';
    </logic:iterate>
    
    var MULTI_CURR_FLAG = "<%="Y".equals((String)application.getAttribute("MULTI_CURR_FLAG")) ? "Y" : "N" %>";	//[20141125 OJG] - Multi Currency 사용 여부
    
    var APFRTCD1 = ' |';
	var APFRTCD2 = ' |';
	<% isBegin = false; %>
    <bean:define id="apFrtCdList" name="valMap" property="apFrtCdList"/>
	<logic:iterate id="FrtCdVO" name="apFrtCdList">
		<% if(isBegin){ %>
			APFRTCD1+= '|';
			APFRTCD2+= '|';
		<% }else{
			  isBegin = true;
		   } %>
		   APFRTCD1+= '<bean:write name="FrtCdVO" property="frt_cd" filter="false"/>';
		   APFRTCD2+= '<bean:write name="FrtCdVO" property="frt_cd" filter="false"/>' + ": " + '<bean:write name="FrtCdVO" property="frt_cd_nm" filter="false"/>';
	</logic:iterate>
	
	
	<!-- ###Freight 항목### -->
	var UNITCD1 = ' |';
	var UNITCD2 = ' |';
	<!-- Freight Unit 단위 -->
    <logic:notEmpty name="valMap" property="UNITCD">
		<% isBegin = false; %>
        <bean:define id="unitList" name="valMap" property="UNITCD"/>
        <logic:iterate id="codeVO" name="unitList">
            <% if(isBegin){ %>
                UNITCD1+= '|';
                UNITCD2+= '|';
            <% }else{
                  isBegin = true;
               } %>
            UNITCD1+= '<bean:write name="codeVO" property="cd_nm"/>';
            UNITCD2+= '<bean:write name="codeVO" property="cd_val"/>';
        </logic:iterate>
    </logic:notEmpty>
    
	<!-- 요구사항 #25606 : [B/L Entry] B/L에서의 Freight Input 시 Currency 선택 옵션 변경 //-->
    var CURRCD = '';
	<% isBegin = false; %>
    <bean:define id="currCdList" name="valMap" property="currCdList"/>
    <logic:iterate id="codeVO" name="currCdList">
        <% if(isBegin){ %>
               CURRCD += '|';
        <% }else{
        	isBegin = true;
           } %>
        CURRCD+= '<bean:write name="codeVO" property="cd_val"/>';
    </logic:iterate>
    
    <!-- ###FRT_CD LIST 항목 AR### -->
    var ARFRTCD1 = ' |';
	var ARFRTCD2 = ' |';
	<% isBegin = false; %>
    <bean:define id="arFrtCdList" name="valMap" property="arFrtCdList"/>
	<logic:iterate id="FrtCdVO" name="arFrtCdList">
		<% if(isBegin){ %>
			ARFRTCD1+= '|';
			ARFRTCD2+= '|';
		<% }else{
			  isBegin = true;
		   } %>
		   ARFRTCD1+= '<bean:write name="FrtCdVO" property="frt_cd" filter="false"/>';
		   ARFRTCD2+= '<bean:write name="FrtCdVO" property="frt_cd" filter="false"/>' + ": " + '<bean:write name="FrtCdVO" property="frt_cd_nm" filter="false"/>';
	</logic:iterate>
	
	<!-- ###FRT_CD LIST 항목 DC### -->
    var DCFRTCD1 = ' |';
	var DCFRTCD2 = ' |';
	<% isBegin = false; %>
    <bean:define id="dcFrtCdList" name="valMap" property="dcFrtCdList"/>
	<logic:iterate id="FrtCdVO" name="dcFrtCdList">
		<% if(isBegin){ %>
			DCFRTCD1+= '|';
			DCFRTCD2+= '|';
		<% }else{
			  isBegin = true;
		   } %>
		   DCFRTCD1+= '<bean:write name="FrtCdVO" property="frt_cd" filter="false"/>';
		   DCFRTCD2+= '<bean:write name="FrtCdVO" property="frt_cd" filter="false"/>' + ": " + '<bean:write name="FrtCdVO" property="frt_cd_nm" filter="false"/>';
	</logic:iterate>
	
	var BKGSTSCD = ' |';
	var BKGSTSNM = ' |';
	<% isBegin = false; %>
    <bean:define id="bkgStsCdList" name="valMap" property="bkgStsCdList"/>
	<logic:iterate id="BgkStsCdVO" name="bkgStsCdList">
		<% if(isBegin){ %>
			BKGSTSCD+= '|';
			BKGSTSNM+= '|';
		<% }else{
			  isBegin = true;
		   } %>
		   BKGSTSCD+= '<bean:write name="BgkStsCdVO" property="cd_val"/>';
		   BKGSTSNM+= '<bean:write name="BgkStsCdVO" property="cd_nm"/>';
	</logic:iterate>
	//#1892 [PATENT] BKG SPLIT/COMBINE 점검항목
	   BKGSTSCD+= '|CB';
	   BKGSTSNM+= '|Combine';
    
	var ofc_curr_cd = "<bean:write name="ofcVO" property="trf_cur_cd"/>";
	
	//#138 Local Currency 추가
	var ofc_locl_curr_cd = "<bean:write name="ofcVO" property="locl_curr_cd"/>";
	
	<!-- Currency 조회 -->
	<%  String ofc_curr = "";
		String trf_cur_cd = "";   //Invoice Currency
	    String to_rt_ut = "";
	%>
	
	<logic:notEmpty name="valMap" property="OfcCurrency">
		<bean:define id="curMap" name="valMap" property="OfcCurrency"/>
		<%  HashMap tmpMap = (HashMap)curMap;
			ofc_curr   = (String)tmpMap.get("ofccurr_cd");
			trf_cur_cd = (String)tmpMap.get("trf_cur_cd");
			to_rt_ut   = (String)tmpMap.get("to_rt_ut");
		%>
	</logic:notEmpty>
		
	var obdtCur = '<%=to_rt_ut%>';
	
	//#512 [BNX] VND(베트남) - USD 환율 차로 인한 환율 계산 오류
	var vat_rt_dp_cnt = Number("<bean:write name="ofcVO" property="vat_rt_dp_cnt"/>");
	var xch_rt_dp_cnt = Number("<bean:write name="ofcVO" property="xch_rt_dp_cnt"/>");
	
	//##1803 [PATENT] CONSOLITION 기능 보완
	<!-- ###Package 코드## -->
	var PCKCD1 = '|';
	var PCKCD2 = '|';
	<% isBegin = false; %>
    <bean:define id="pckList" name="valMap" property="pckCdList"/>
	<logic:iterate id="pckVO" name="pckList">
		<% if(isBegin){ %>
			PCKCD1+= '|';
			PCKCD2+= '|';
		<% }else{
			  isBegin = true;
		   } %>
		PCKCD1+= '<bean:write name="pckVO" property="pck_nm"/>';
		PCKCD2+= '<bean:write name="pckVO" property="pck_ut_cd"/>';
	</logic:iterate>
	
</script>
<script type="text/javascript">
    function setupPage() {
        loadPage();
        btnLoad();
        doHideProcess();
        loadData();
    }

    var attr_extension = "<%= roleBtnVO.getAttr_extension() %>";
    var dfPerfCurr = 'KRW';
</script>
<form name="frm1">
    <input type="hidden" name="f_cmd" id="f_cmd">
    <input type="hidden" name="h_ofc_cnt_cd" id="h_ofc_cnt_cd">
    <input type="hidden" name="title" id="title"/>
    <input type="hidden" name="file_name" id="file_name"/>
    <input type="hidden" name="rd_param" id="rd_param"/>
    <input type="hidden" name="f_ref_no" id="f_ref_no"/>
    <input type="hidden" name="h_temp_val" id="h_temp_val" value="">
    <input type="hidden" name="post_dt" id="post_dt" value="">
    <input type="hidden" name="user_id" id="user_id" value="<%=userInfo.getUsrid()%>"/>
    <!--  Report ==> OutLook연동 파라미터 (S) -->
    <input type="hidden" name="rpt_biz_tp" id="rpt_biz_tp"/>
    <input type="hidden" name="rpt_biz_sub_tp" id="rpt_biz_sub_tp"/>
    <!--  Report ==> OutLook연동 파라미터 (E) -->
    <html:hidden name="hblVO" property="bkg_seq"/>
    <html:hidden name="hblVO" property="intg_bl_seq"/>
    <html:hidden name="valMap" property="f_bkg_seq"/>
    <input type="hidden" name="title_form" id="title_form" value="<%=LEV3_NM%>">
    <input type="hidden" name="autho" value="<%= roleBtnVO.getAttr5() %>">
    <!-- jsjang 2013.08.28 office, ooh_bkg_rmk 정보 처리 변경 -->
    <input type="hidden" name="h_ooh_bkg_rmk" id="h_ooh_bkg_rmk" value="<bean:write name="ofcVO" property="ooh_bkg_rmk"/>">
	<input type="hidden" name="f_isNumSep" value='<bean:write name="valMap" property="f_isNumSep"></bean:write>' id="f_isNumSep"/>
    <input type="hidden" name="xcrtDt" id="xcrtDt" value="<bean:write name="hblVO" property="obrd_dt_tm"/>">
    
    <input type="hidden" name="rpt_trdp_cd" id="rpt_trdp_cd"/>
    <input type="hidden" name="biz_clss_cd" id="biz_clss_cd" value="H"/>
    <input type="hidden" name="trx_modi_tms" id="trx_modi_tms" value="" />
    
    <!-- Freight 탭에서 공통 Add, Default New 사용하기 위해 필요 -->
    <input type="hidden" name="bkg_entry_yn" id="bkg_entry_yn" value="Y" />
    <!-- input type="hidden" name="shp_mod_cd" id="shp_mod_cd" value="" /-->
<!--     
	<input type="hidden" name="carr_trdp_cd" id="carr_trdp_cd" value="" />
    <input type="hidden" name="carr_trdp_nm" id="carr_trdp_nm" value="" />
 -->    
 <input type="hidden" name="cust_rt" id="cust_rt" value="" />
    <input type="hidden" name="cust_amt" id="cust_amt" value="" />
    <input type="hidden" name="agent_rt" id="agent_rt" value="" />
    <input type="hidden" name="agent_amt" id="agent_amt" value="" />
   
    <!--#1773 [PATENT] Freight Default Unit Option -->
    <input type="hidden" name="ref_ofc_cd" id="ref_ofc_cd" value="<%=userInfo.getOfc_cd()%>"/>
    
    <input type="hidden" name="rgst_ofc_cd" id="rgst_ofc_cd" value="<bean:write name="hblVO" property="rgst_ofc_cd"/>" />
 
     <!--#1024 [PATENT] Booking Entry 개선 및 Quotation Audit 기능 개발  -->
    <input type="hidden" name="c_bkg_seq"   id="c_bkg_seq"   value="<bean:write name="valMap" property="c_bkg_seq"></bean:write>">
    <input type="hidden" name="c_create"    id="c_create"    value="<bean:write name="valMap" property="c_create"></bean:write>"/>
    
    
    <input type="hidden" name="rgst_usrid" value="<bean:write name="hblVO" property="rgst_usrid"/>" class="search_form-disable" tabindex="-1" readOnly style="width:70px;">
    <input type="hidden" name="f_clp_no"  value="<bean:write name="hblVO" property="clp_no"/>"  id="f_clp_no">
       
	<div class="page_title_area clear">
   <h2 class="page_title"><button type="button"><%=LEV3_NM%></button></h2>
	   <!-- btn_div -->
	   <div class="opus_design_btn TOP">
			<%-- 		      
		   <span style="display: none;" btnAuth="<%= roleBtnVO.getAttr1() %>"><button type="button" class="btn_accent" onClick="doWork('SEARCHLIST')" id="btn_Retrieve" name="btn_Retrieve"><bean:message key="Search"/></button></span>
		   <span style="display: none;" btnAuth="<%= roleBtnVO.getAttr1() %>"><button type="button" class="btn_normal" style="display:none;" onClick="doWork('CREATEHBL');" name="btn_CreateHBL" id="btn_CreateHBL"><bean:message key="Create_HouseBL"/></button></span> 
		   <span style="display: none;" btnAuth="<%= roleBtnVO.getAttr2() %>"><button type="button" class="btn_normal" onClick="doWork('NEW');" id="btn_New" name="btn_New"><bean:message key="New"/></button></span>
		   <span style="display: none;" btnAuth="<%= roleBtnVO.getAttr3() %>"><button type="button" class="btn_normal" style="display:none;" onClick="doWork('ADD')" id="btnAdd" name="btnAdd"><bean:message key="Save"/></button></span>
		   <span style="display: none;" btnAuth="<%= roleBtnVO.getAttr3() %>"><button type="button" class="btn_normal" style="display:none;" onClick="doWork('MODIFY')" id="btnModify" name="btnModify"><bean:message key="Save"/></button></span>
		   <button type="button" id="btnSaveX" class="btn_normal"  style="display:none;" btnAuth="<%= roleBtnVO.getAttr3() %>" onclick="saveCloseBtnClick()"><bean:message key="Save_X"/></button>
		   <span style="display: none;" btnAuth="P_REPORT"><button type="button" class="btn_normal" style="display:none;" onClick="doWork('PROFIT_REPORT')" id="btnPProfit" name="btnPProfit"><bean:message key="P_Report"/></button></span>
	 	   <span style="display: none;" btnAuth="READY"><button type="button" class="btn_normal" style="display:none;" onClick="doWork('READY')" name="btnReady" id="btnReady"><bean:message key="Ready"/></button></span>
		   <span style="display: none;" btnAuth="CONFIRM"><button type="button" class="btn_normal" style="display:none;" onClick="doWork('CONFIRM')" name="btnConfirm" id="btnConfirm"><bean:message key="Confirm"/></button></span>
		   <span style="display: none;" btnAuth="REJECT"><button type="button" class="btn_normal" style="display:none;" onClick="doWork('REJECT')" name="btnReject" id="btnReject"><bean:message key="Reject"/></button></span>
		   <span style="display: none;" btnAuth="CANCEL"><button type="button" class="btn_normal" style="display:none;" onClick="doWork('CANCEL')" name="btnCancel" id="btnCancel"><bean:message key="Cancel"/></button></span>
	 	   <span style="display: none;" btnAuth="COPY"><button type="button" class="btn_normal" id="btnCopy" name="btnCopy" onClick="doWork('COPY');"><bean:message key="Copy"/></button></span> 
		   <span style="display: none;" btnAuth="<%= roleBtnVO.getAttr5() %>"><button type="button" class="btn_normal" style="display:none;" onClick="doWork('PRINT');" id="btnPrint" name="btnPrint"><bean:message key="Print"/></button></span>
		   <span style="display: none;" btnAuth="<%= roleBtnVO.getAttr4() %>"><button type="button" class="btn_normal" style="display:none;" onClick="doWork('REMOVE');" name="btnDelete" id="btnDelete"><bean:message key="Delete"/></button></span>
 	   	   <span style="display: inline;" ><button type="button" class="btn_normal" style="display:inline;" onClick="doWork('CREAT_CARRIER_BOOKING');" name="btnCarrierBooking" id="btnCarrierBooking"><bean:message key="Carrier_Booking"/></button></span>
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
	<div class= "wrap_search_tab">
	  <div class= "opus_design_inquiry">
	  	<table>
	  		<colgroup>
				<col width="80">
				<col width="780">
				<col width="80">
				<col width="*">
	  		</colgroup>
	  		<tbody>
	  			<tr>
					<th><bean:message key="Booking_No"/></th>
					<td><!-- #1734 [CLA] Sales > Order > Carrier Booking Entry Bkg. No 조회 타입 수정 => required 삭제
					--><%-- <input type="text" name="f_bkg_no" id="f_bkg_no" required="required" value="<bean:write name="valMap" property="f_bkg_no"/>" dataformat="excepthan" style="ime-mode:disabled; width:115px;text-transform:uppercase;" onblur="strToUpper(this);"> --%><!--
					--><input type="text" name="f_bkg_no" id="f_bkg_no" value="<bean:write name="valMap" property="f_bkg_no"/>" dataformat="excepthan" style="ime-mode:disabled; width:115px;text-transform:uppercase;" onblur="strToUpper(this);"><!--
					--><button type="button"  id="btn_Booking_No" name="btn_Booking_No" class="input_seach_btn" tabindex="-1" onClick="openPopUp('BKNO_POPLIST_BLANK',this)"></button><!--
					--></td>
					<th><bean:message key="Booking_Status"/></th>
					<td>
						<bean:define id="bkgStsCdList" name="valMap" property="bkgStsCdList"/>
                       	<html:select name="hblVO" property="bkg_sts_cd" styleClass="search_form" style="width:155px;" disabled="true">
                           	<html:options collection="bkgStsCdList" property="cd_val" labelProperty="cd_nm"/>
                        </html:select>
                    	<input type="hidden" name="h_bkg_sts_cd" value="<bean:write name="hblVO" property="bkg_sts_cd"/>">
					</td>
	  			</tr>
	  		</tbody>
	  	</table>
		</div>
	</div>	
	
	<div class="wrap_result_tab">
		<div class="opus_design_grid" id="mainTable" style="display: none;">
			<script type="text/javascript">comSheetObject('sheet1');</script>
		</div>
		<ul id="ulTab" class="opus_design_tab">
            <li id=Tab01 class="nowTab">
            	<a href="#" style="cursor:hand;" onClick="javascript:goTabSelect('01');">
            		<span><bean:message key="Booking"/></span>
            	</a>
            </li>
            <li id=Tab02>
            	<a href="#" style="cursor:hand;" onClick="javascript:goTabSelect('02');">
            		<span><bean:message key="Container"/></span>
            	</a>
            </li>
            <%-- li id=Tab03>
            	<a href="#" style="cursor:hand;" onClick="javascript:goTabSelect('03');">
            		<span><bean:message key="Remark"/></span>
            	</a>
            </li  --%>
            <li id=Tab04>
            	<a href="#" style="cursor:hand;" onClick="javascript:goTabSelect('04');">
            		<span><bean:message key="Freight"/></span>
            	</a>
            </li>
<%--             <li id=Tab05><a href="#" style="cursor:hand;" onClick="javascript:goTabSelect('05');"><span><bean:message key="Work_Order"/></span></a></li> --%>
			
			<li id=Tab07>
				<a href="#" style="cursor:hand;" onClick="javascript:goTabSelect('07');">
					<span><bean:message key="Work_Order"/></span></a>
			
			</li>
			<li id=Tab05>
				<a href="#" style="cursor:hand;" onClick="javascript:goTabSelect('06');">
					<span><bean:message key="Status"/></span
				></a>
			</li>
        </ul>
        <div id="tabLayer" name="tabLayer" style="display:inline"><!--Booking&BL-->
		<div class="opus_design_inquiry wFit">
			<table>
				<colgroup>
					<col width="91">
					<col width="270">
					<col width="123">
					<col width="170">
					<col width="80">
					<col width="100">
					<col width="100">
					<col width="*">
				</colgroup>
				<tbody>
					<tr>
						<th><bean:message key="Booking_No"/></th>
						<td><input type="text" name="bkg_no" id="bkg_no" maxlength="30" value='<bean:write name="hblVO" property="bkg_no"/>' onblur="strToUpper(this)" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:110px;" onclick="if(frm1.bkg_no.value=='AUTO'){frm1.bkg_no.value=''}"><!--
							--><input type="hidden" name="h_bkg_no" id="h_bkg_no" value="<bean:write name="hblVO" property="bkg_no"/>"><!--
							--><input type="text" name="bkg_dt_tm" id="bkg_dt_tm" maxlength="10" value="<wrt:write name="hblVO" property="bkg_dt_tm" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy"/>" class="search_form" onKeyUp="mkDateFormatType(this, event, false,1)" onBlur="mkDateFormatType(this, event, true,1);dateRangeValid(this, 'Booking Date');" dataformat="excepthan" style="ime-mode:disabled;width:70px;" required="required"><!--
							--><button type="button" id="bkg_dt_tm_cal" name="bkg_dt_tm_cal" onclick="doDisplay('DATE1' ,frm1.bkg_dt_tm);" class="calendar" tabindex="-1"></button></td>  
                        <th><bean:message key="BL_Type"/></th>
						<td>
							<bean:define id="blTypeList" name="valMap" property="blTypeList"/>
							<html:select name="hblVO" property="hbl_tp_cd" styleClass="search_form" style="width:100px;" onchange="">
								<html:options collection="blTypeList" property="cd_val" labelProperty="cd_nm"/>
							</html:select>
						</td>
						<th><bean:message key="Ship_Mode"/></th>
						<td>
							<bean:define id="shipModeList" name="valMap" property="shipModeList"/>
							<html:select name="hblVO" property="shp_mod_cd" styleClass="search_form" style="width:100px; background-color: #d4f6ff;" onchange="shipModeChange();">
								<html:options collection="shipModeList" property="cd_val" labelProperty="cd_nm"/>
							</html:select>
						</td>
						<th><bean:message key="Sales_Type"/></th>
						<td><bean:define id="slsList" name="valMap" property="slsCdList"/>
                            <html:select name="hblVO" property="nomi_flg" style="width:105px; background-color: #d4f6ff;" styleClass="width:70px;" onchange="changeSalesType();">
                                <html:options collection="slsList" property="cd_val" labelProperty="cd_nm"/>
                            </html:select>
						</td>											
						<!-- #1619 [CLT] Original B/L Type- 항목 정리 -->
						<th><bean:message key="OBL_Type"/></th>
                        <td>
	                        <bean:define id="oblCdList" name="valMap" property="oblCdList"/>
	                        <html:select name="hblVO" property="obl_tp_cd" styleClass="search_form" style="width:80px;">
	                        <html:options collection="oblCdList" property="cd_val" labelProperty="cd_nm"/>
	                        </html:select> 
	                        <input type="hidden" name="h_obl_tp_cd" value="<bean:write name="hblVO" property="obl_tp_cd"/>">
                        </td>
                        <%-- 
						<th><bean:message key ="Release_Type"/></th>
						<td>
							<bean:define id="RlTypeList" name="valMap" property="RlTypeList"/>
							<html:select name="hblVO" property="bl_rlse_tp_cd" styleClass="search_form" style="width:100px;">
							    <option></option>
								<html:options collection="RlTypeList" property="cd_val" labelProperty="cd_nm"/>
							</html:select>							
						</td>
 						--%>
					</tr>
					<tr>
		  				<th><bean:message key="System_Bkg_No"/></th>
						<td><input type="text" name="carrier_bkg_no" id="carrier_bkg_no"  value="<bean:write name="hblVO" property="carrier_bkg_no"/>" dataformat="excepthan" style="ime-mode:disabled;width:110px;text-transform:uppercase;" onblur="strToUpper(this);" onchange="checCarrierNo(this)"><!--
						    --><input type="hidden" name="carrier_bkg_seq" id="carrier_bkg_seq"  value="<bean:write name="hblVO" property="carrier_bkg_seq"/>" style="width:115px;text-transform:uppercase;" onblur="strToUpper(this);"><!--
						    --><input type="hidden" name="h_carrier_bkg_seq" id="h_carrier_bkg_seq"  value="<bean:write name="hblVO" property="carrier_bkg_seq"/>" style="width:115px;text-transform:uppercase;" onblur="strToUpper(this);"><!--
							--><button type="button"  id="btn_carrier_bkg_no" name="btn_carrier_bkg_no" class="input_seach_btn" tabindex="-1" onClick="carrierPopUp('LNRBKNO_POPLIST_BLANK',this)"></button>
						</td>					
						<th><bean:message key="Liner_Bkg"/></th>
						<td><input type="text" name="lnr_bkg_no" id="lnr_bkg_no" value='<bean:write name="hblVO" property="lnr_bkg_no"/>' class="search_form" onblur="strToUpper(this)" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:100px;" maxlength="100"><!-- 
							--><input type="hidden" name="h_lnr_bkg_no" id="h_lnr_bkg_no" value="<bean:write name="hblVO" property="lnr_bkg_no"/>">
						</td>	
                        <th><bean:message key="Service_Contract_No"/></th>
                        <td>
                            <input name="lnr_ctrt_no" id="lnr_ctrt_no" maxlength="20" value='<bean:write name="hblVO" property="lnr_ctrt_no"/>' type="text" class="search_form" onblur="strToUpper(this)" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:100px;" >
                        </td>		
                     	<th><bean:message key="LC_No"/></th>
                        <td>
                            <input type="text" name="lc_no" id="lc_no" maxlength="40" value='<bean:write name="hblVO" property="lc_no"/>' class="search_form" onblur="strToUpper(this)" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:105px;" > 
                        </td>                        				
						<th><bean:message key="HBL_No"/></th>
						<td><input type="text" name="bl_no" id="bl_no" maxlength="40" value='<bean:write name="hblVO" property="bl_no"/>' onblur="strToUpper(this)" class="search_form-disable" style="ime-mode:disabled; text-transform:uppercase;width:110px;" tabindex="-1" readonly>
						</td>
						<td></td>
					</tr>				
					<%-- tr>
						<th><bean:message key="Booking_No"/></th>
						<td><input type="text" name="bkg_no" id="bkg_no" maxlength="30" value='<bean:write name="hblVO" property="bkg_no"/>' onblur="strToUpper(this)" class="search_form" style="ime-mode:disabled; text-transform:uppercase;width:110px;" onclick="if(frm1.bkg_no.value=='AUTO'){frm1.bkg_no.value=''}"><!--
							--><input type="hidden" name="h_bkg_no" id="h_bkg_no" value="<bean:write name="hblVO" property="bkg_no"/>"><!--
							--><input type="text" name="bkg_dt_tm" id="bkg_dt_tm" maxlength="10" value="<wrt:write name="hblVO" property="bkg_dt_tm" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy"/>" class="search_form" onKeyUp="mkDateFormatType(this, event, false,1)" onBlur="mkDateFormatType(this, event, true,1);dateRangeValid(this, 'Booking Date');" style="ime-mode:disabled;width:70px;" required="required"><!--
							--><button type="button" id="bkg_dt_tm_cal" name="bkg_dt_tm_cal" onclick="doDisplay('DATE1' ,frm1.bkg_dt_tm);" class="calendar" tabindex="-1"></button></td>  
						<th><bean:message key="HBL_No"/></th>
						<td><input type="text" name="bl_no" id="bl_no" maxlength="40" value='<bean:write name="hblVO" property="bl_no"/>' onblur="strToUpper(this)" class="search_form-disable" style="ime-mode:disabled; text-transform:uppercase;width:110px;" tabindex="-1" readonly></td>

						<th><bean:message key="Liner_Bkg"/></th>
						<td><input name="lnr_bkg_no" id="lnr_bkg_no" value='<bean:write name="hblVO" property="lnr_bkg_no"/>' type="text" class="search_form" onblur="strToUpper(this)" style="ime-mode:disabled; text-transform:uppercase;width:110px;" ></td>
						<th><bean:message key="Carrier_SC_No"/></th>
						<td><input name="lnr_ctrt_no" id="lnr_ctrt_no" maxlength="20" value='<bean:write name="hblVO" property="lnr_bkg_no"/>' type="text" class="search_form" onblur="strToUpper(this)" style="ime-mode:disabled; text-transform:uppercase;width:110px;" ></td>
						<th><bean:message key="LC_No"/></th>
						<td><input type="text" name="lc_no" id="lc_no" maxlength="40" value='<bean:write name="hblVO" property="lc_no"/>' class="search_form" onblur="strToUpper(this)" style="ime-mode:disabled; text-transform:uppercase;width:110px;" ></td>
					</tr --%>
				</tbody>
			</table>
		</div>
		<div class="layout_wrap">
			<div class="layout_vertical_3 pad_rgt_8">
				<div class="opus_design_inquiry sm" style="height: 700px;">
				<h3 class="title_design"><bean:message key="Customer"/></h3>
					<table>
						<colgroup>
							<col width="65">
							<col width="*">
						</colgroup>
						<tbody>

				            <tr>
				            	<th><a href="javascript:clearBlPrnr('S01');"><bean:message key="Shipper"/></a></th>
								<td><input type="text" name="shpr_trdp_nm" id="shpr_trdp_nm" maxlength="50" value='<bean:write name="hblVO" property="shpr_trdp_nm"/>'  onblur="strToUpper(this);strToUpper(this);checkTrdpCode(this);"  class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:calc(100% - 30px);text-transform:uppercase;" onKeyPress="if(event.keyCode==13){openPopUp('LINER_POPLIST', document.getElementById('shipper'), frm1.shpr_trdp_nm.value);setActShipper();setCargoPuckup();}"><!--
									--><button type="button"  id="shipper" name="shipper" class="input_seach_btn" tabindex="-1" onClick="openPopUp('LINER_POPLIST',this);setActShipper();setCargoPuckup();"></button><!--
									--><input type="hidden" name="shpr_trdp_cd" id="shpr_trdp_cd" value='<bean:write name="hblVO" property="shpr_trdp_cd"/>'  class="search_form" onKeyDown="codeNameAction('trdpCode_shipper',this, 'onKeyDown')" onBlur="strToUpper(this);codeNameAction('trdpCode_shipper',this, 'onBlur')" style="ime-mode:disabled; text-transform:uppercase;width:48;">
								</td>
				            </tr>
						</tbody>
					</table>
					<table>
						<tr>
							<td>
								<textarea name="shpr_trdp_addr" id="shpr_trdp_addr" class="search_form autoenter_50" dataformat="excepthan" style="width:100%;height:80px;" onblur="strToUpper(this);chkCmpAddr(this, 'Shipper Address')" WRAP="off"><bean:write name="hblVO" property="shpr_trdp_addr" filter="false"/></textarea>
							</td>
						</tr>
					</table>
					<table>
						<colgroup>
							<col width="65">
							<col width="*">
						</colgroup>
						<tbody>
							<tr>
								<th><a href="javascript:clearBlPrnr('C01');"><bean:message key="Consignee"/></a></th>
								<td><input type="hidden" name="cnee_trdp_cd"  value='<bean:write name="hblVO" property="cnee_trdp_cd"/>'  onKeyDown="codeNameAction('trdpCode_consignee',this, 'onKeyDown')" onBlur="strToUpper(this);codeNameAction('trdpCode_consignee',this, 'onBlur');" class="search_form" style="ime-mode:disabled; text-transform:uppercase;width:48px;"><!--
									--><input type="text"   name="cnee_trdp_nm"  maxlength="50" value='<bean:write name="hblVO" property="cnee_trdp_nm"/>'  onblur="strToUpper(this);checkTrdpCode(this);"   class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:calc(100% - 30px);text-transform:uppercase;" onKeyPress="if(event.keyCode==13){openPopUp('LINER_POPLIST', document.getElementById('consignee'), frm1.cnee_trdp_nm.value);}"><!--
									--><button type="button"  id="consignee" name="consignee" class="input_seach_btn" tabindex="-1" onClick="openPopUp('LINER_POPLIST',this);"></button>
								</td>
							</tr>
						</tbody>
					</table>
					<table>
						<tr>
							<td><textarea name="cnee_trdp_addr" id="cnee_trdp_addr" class="search_form autoenter_50" dataformat="excepthan" style="width:100%;height:80px;" onblur="strToUpper(this);chkCmpAddr(this, 'Consignee Address')" WRAP="off"><bean:write name="hblVO" property="cnee_trdp_addr" filter="false"/></textarea></td>
						</tr>
					</table>
					<table>
						<colgroup>
							<col width="65">
							<col width="*">
						</colgroup>
						<tbody>
							<tr>
								<th><a href="javascript:clearBlPrnr('N01');"><bean:message key="Notify"/></a></th>
								<td><input type="hidden" name="ntfy_trdp_cd" id="ntfy_trdp_cd"  value='<bean:write name="hblVO" property="ntfy_trdp_cd"/>' class="search_form" onKeyDown="codeNameAction('trdpCode_notify',this, 'onKeyDown')" onBlur="strToUpper(this);codeNameAction('trdpCode_notify',this, 'onBlur')" style="ime-mode:disabled; text-transform:uppercase;width:48;"><!--
									--><input type="text" name="ntfy_trdp_nm" id="ntfy_trdp_nm" value='<bean:write name="hblVO" property="ntfy_trdp_nm"/>' onblur="strToUpper(this);checkTrdpCode(this);" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:calc(100% - 30px);text-transform:uppercase;" maxlength="50" onKeyPress="if(event.keyCode==13){openPopUp('LINER_POPLIST', document.getElementById('notify'), frm1.ntfy_trdp_nm.value);}"><!--
									--><button type="button"  id="notify" name="notify" class="input_seach_btn" tabindex="-1" onClick="openPopUp('LINER_POPLIST',this)"></button>
								</td>
							</tr>
						</tbody>
					</table>
					<table>
						<colgroup>
							<col width="120">
							<col width="*">
						</colgroup>
						<tr>
							<td><img src="<%=CLT_PATH%>/web/img/main/ico_t2.gif" border="0"><a href="javascript:copyValue('SAC', 'S', 'O', 'H')"><bean:message key="Same_As_Consignee"/></a></td>
							<td><img src="<%=CLT_PATH%>/web/img/main/ico_t2.gif" border="0"><a href="javascript:copyValue('CNEE', 'S', 'O', 'H')"><bean:message key="Copy"/></a></td>
						</tr>
					</table>
					<table>
						<tr>
							<td><textarea name="ntfy_trdp_addr" id="ntfy_trdp_addr" class="search_form autoenter_50" dataformat="excepthan" style="width:100%;height:80px;" onblur="strToUpper(this);chkCmpAddr(this, 'Notify Address')" WRAP="off"><bean:write name="hblVO" property="ntfy_trdp_addr" filter="false"/></textarea></td>
						</tr>
					
					</table>
					<table>
						<tr>
							<th><a href="javascript:clearBlPrnr('P01');"><bean:message key="Partner"/></a></th>
							<td><input type="text" name="prnr_trdp_cd" maxlength="20" value='<bean:write name="hblVO" property="prnr_trdp_cd"/>' onKeyDown="codeNameAction('trdpCode_partner',this, 'onKeyDown', 'S', 'O', 'H')" onBlur="strToUpper(this);codeNameAction('trdpCode_partner',this, 'onBlur', 'S', 'O', 'H')" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:50px;"><!--
								--><button type="button"  id="partner" name="partner" class="input_seach_btn" tabindex="-1" onClick="openPopUp('LINER_POPLIST',this)"></button><!--
								--><input type="text"   name="prnr_trdp_nm" id="prnr_trdp_nm" maxlength="50" value='<bean:write name="hblVO" property="prnr_trdp_nm"/>' onblur="strToUpper(this)" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:140px;" onKeyPress="if(event.keyCode==13){openPopUp('LINER_POPLIST', document.getElementById('partner'), frm1.prnr_trdp_nm.value);}"><!--
								--><input type="hidden" name="prnr_trdp_addr" id="prnr_trdp_addr" value='<bean:write name="hblVO" property="prnr_trdp_addr"/>'>                                                        
							</td>
			            </tr>
						<tr>
							<th><a href="javascript:clearBlPrnr('S02');"><bean:message key="Customer"/></a></th>
							<td><input type="text" name="act_shpr_trdp_cd" id="act_shpr_trdp_cd" maxlength="20" value='<bean:write name="hblVO" property="act_shpr_trdp_cd"/>' class="search_form" onKeyDown="codeNameAction('trdpCode_ashipper',this, 'onKeyDown', 'S', 'O', 'H');" onBlur="strToUpper(this);codeNameAction('trdpCode_ashipper',this, 'onBlur', 'S', 'O', 'H');" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:50px;" required="required"><!--
								--><button type="button"  id="ashipper" name="ashipper" class="input_seach_btn" tabindex="-1" onClick="openPopUp('LINER_POPLIST',this)"></button><!--
								--><input type="text" name="act_shpr_trdp_nm" id="act_shpr_trdp_nm" maxlength="50" value='<bean:write name="hblVO" property="act_shpr_trdp_nm"/>' onblur="strToUpper(this);" class="search_form" dataformat="multiLanguage" style="ime-mode:disabled;width:140px;text-transform:uppercase;" onKeyPress="if(event.keyCode==13){openPopUp('LINER_POPLIST', document.getElementById('ashipper'), frm1.act_shpr_trdp_nm.value);}" required="required">
							</td>
							<th><bean:message key="REF_No"/></th>
							<td><input type="text" name="cust_ref_no" id="cust_ref_no" maxlength="40"  value="<bean:write name="hblVO" property="cust_ref_no"/>" class="search_form" dataformat="multiLanguage" style="ime-mode:disabled;text-transform:uppercase;width:100px;" onblur="strToUpper(this)" ></td>
						</tr>
							<tr>
								<th><a href="javascript:clearBlPrnr('C03');"><bean:message key="C_Broker"/></a></th>
								<td><input type="text" name="cust_trdp_cd" id="cust_trdp_cd" maxlength="20" value='<bean:write name="hblVO" property="cust_trdp_cd"/>' class="search_form" onKeyDown="codeNameAction('trdpCode_cust',this, 'onKeyDown', 'S', 'O', 'H');" onBlur="strToUpper(this);codeNameAction('trdpCode_cust',this, 'onBlur', 'S', 'O', 'H');" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:50px;"><!--
									--><button type="button"  id="cust" name="cust" class="input_seach_btn" tabindex="-1" onClick="openPopUp('LINER_POPLIST',this)"></button><!--
									--><input type="text" name="cust_trdp_nm" id="cust_trdp_nm" maxlength="50" value='<bean:write name="hblVO" property="cust_trdp_nm"/>' onblur="strToUpper(this);" class="search_form" dataformat="multiLanguage" style="ime-mode:disabled;width:140px;text-transform:uppercase;" onKeyPress="if(event.keyCode==13){openPopUp('LINER_POPLIST', document.getElementById('cust'), frm1.cust_trdp_nm.value);}">
								<!-- #1559 C/Broker 팝업 조회시 addr 항목이 있어야  하므로 input box 추가함. CRUD 쿼리에는 해당 항목 빠져있음-->
								<input type="hidden" name="cust_trdp_addr" id="cust_trdp_addr" value='<bean:write name="hblVO" property="cust_trdp_cd"/>'/>
								</td>
								<th></th>
								<td></td>
							</tr>
							<tr>
								<th><a href="javascript:clearBlPrnr('V01');"><bean:message key="Vendor"/></a></th>
								<td><input type="text" name="vndr_trdp_cd" maxlength="20" value='<bean:write name="hblVO" property="vndr_trdp_cd"/>' onKeyDown="codeNameAction('trdpCode_vndr',this, 'onKeyDown')" onBlur="strToUpper(this);codeNameAction('trdpCode_vndr',this, 'onBlur')" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:50px;"><!--
									--><button type="button" name="vndr" id="vndr" class="input_seach_btn" tabindex="-1" onClick="openPopUp('LINER_POPLIST', this)"></button><!--
									--><input type="text" name="vndr_trdp_nm" maxlength="50" value='<bean:write name="hblVO" property="vndr_trdp_nm"/>' onblur="strToUpper(this);checkTrdpCode(this);" class="search_form" dataformat="multiLanguage" style="ime-mode:disabled;width:140px;text-transform:uppercase;" onKeyPress="if(event.keyCode==13){openPopUp('LINER_POPLIST', document.getElementById('vndr'), frm1.vndr_trdp_nm.value);}"><!--
									--><input type="hidden" name="vndr_trdp_addr" value='<bean:write name="hblVO" property="vndr_trdp_addr"/>'></td>
							</tr>
							<tr>
								<th><bean:message key="Trucker"/></th>
								<td><input type="text" name="trk_trdp_cd" id="trk_trdp_cd" maxlength="20" value='<bean:write name="hblVO" property="trk_trdp_cd"/>' onKeyDown="codeNameAction('trdpCode_trk',this, 'onKeyDown')" onBlur="strToUpper(this);codeNameAction('trdpCode_trk',this, 'onBlur')" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:50px;"><!--
									--><button type="button"  id="trk" name="trk" class="input_seach_btn" tabindex="-1" onClick="openPopUp('LINER_POPLIST',this)"></button><!--
									--><input type="text"   name="trk_trdp_nm" id="trk_trdp_nm" maxlength="50" value='<bean:write name="hblVO" property="trk_trdp_nm"/>' onblur="strToUpper(this)" class="search_form" dataformat="multiLanguage" style="ime-mode:disabled; text-transform:uppercase;width:140px;" onKeyPress="if(event.keyCode==13){openPopUp('LINER_POPLIST', document.getElementById('trk'), frm1.trk_trdp_nm.value);}">
								</td>
				            </tr>						
					</table>
					<table style="display:none"><!-- [20130926 OJG] ì ë³´ì´ê² ì²ë¦¬ -->
                      	<tr>
                          	<td><textarea name="act_shp_info" id="act_shp_info" class="search_form autoenter_50" onblur="strToUpper(this);chkCmpAddr(this, 'Actual Shipper')" style="width:250;height:60px;" WRAP="off"><bean:write name="hblVO" property="act_shp_info" filter="false"/></textarea></td>
                       	</tr>
                   	</table>
                   	
					<%-- table>
						<colgroup>
							<col width="120">
							<col width="*">
						</colgroup>
						<tr>
							<th><bean:message key="Empty_Pickup"/></th>
                             <td><input name="pu_trdp_cd" id="pu_trdp_cd" value='<bean:write name="hblVO" property="pu_trdp_cd"/>' type="text" class="search_form" onKeyDown="codeNameAction('trdpCode_pu',this, 'onKeyDown')" onBlur="codeNameAction('trdpCode_pu',this, 'onBlur');javascript:this.value=this.value.toUpperCase();" style="ime-mode:disabled; text-transform:uppercase;width:50px;" onblur="strToUpper(this);"><!--
                             	--><button type="button"  id="pu" name="pu" class="input_seach_btn" tabindex="-1" onClick="openPopUp('LINER_POPLIST',this)"></button><!--
                             	--><input type="text" name="pu_trdp_nm" id="pu_trdp_nm" value='<bean:write name="hblVO" property="pu_trdp_nm"/>' class="search_form" style="ime-mode:disabled;width:82px;text-transform:uppercase;" onblur="strToUpper(this)" onKeyPress="if(event.keyCode==13){openPopUp('LINER_POPLIST', document.getElementById('pu'), frm1.pu_trdp_nm.value);}" maxlength="50">
                             </td>
						</tr>
						<tr>
							<th><bean:message key="Pier"/></th>
                            <td><input name="rcv_wh_cd" id="rcv_wh_cd" value='<bean:write name="hblVO" property="rcv_wh_cd"/>' type="text" class="search_form" onKeyDown="codeNameAction('trdpCode_rcv',this, 'onKeyDown')" onBlur="codeNameAction('trdpCode_rcv',this, 'onBlur');javascript:this.value=this.value.toUpperCase();" style="ime-mode:disabled; text-transform:uppercase;width:50px;" onblur="strToUpper(this);"><!--
                            	--><button type="button"  id="rcv" name="rcv" class="input_seach_btn" tabindex="-1" onClick="openPopUp('LINER_POPLIST',this)"></button><!--
                            	--><input type="text" name="rcv_wh_nm" id="rcv_wh_nm" value='<bean:write name="hblVO" property="rcv_wh_nm"/>' class="search_form" style="ime-mode:disabled;width:82px;text-transform:uppercase;" onblur="strToUpper(this)" onKeyPress="if(event.keyCode==13){openPopUp('LINER_POPLIST', document.getElementById('rcv'), frm1.rcv_wh_nm.value);}" maxlength="50">
                            </td>
						</tr>

					</table --%>
					<%-- <table>
						<colgroup>
							<col width="120">
							<col width="*">
						</colgroup>
						<tbody>
							<tr>
	                       		<th><bean:message key="Customer_Ref_No"/></th>
		                     	<td><input type="text" name="cust_ref_no" id="cust_ref_no" maxlength="40"  value="<bean:write name="hblVO" property="cust_ref_no"/>" class="search_form" style="ime-mode:disabled;text-transform:uppercase;width:165px;" onblur="strToUpper(this)" ></td>
	                       	</tr>
						</tbody>
                    </table> --%>					
				</div>
			</div>
			<div class="layout_vertical_3 pad_rgt_8" style="min-width: 34%;" >
				<div class="opus_design_inquiry sm" style="height: 700px;">
					<table>
						<colgroup>
							<col width="110">
							<col width="230">
							<col width="80">
							<col width="*">
						</colgroup>
						<tbody>


						</tbody>
					</table>				            
					<h3 class="title_design"><bean:message key="Vessel"/></h3>
					<table>
						<colgroup>
							<col width="110">
							<col width="*">
						</colgroup>
						<tbody>
							<tr>
								<th><bean:message key="Liner"/></th>
								<td><input type="text" name="lnr_trdp_cd" id="lnr_trdp_cd" maxlength="20" value='<bean:write name="hblVO" property="lnr_trdp_cd"/>' onKeyDown="codeNameAction('trdpCode_liner',this, 'onKeyDown');" onBlur="strToUpper(this);codeNameAction('trdpCode_liner',this, 'onBlur');" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:50px;"><!--
									--><button type="button"  id="liner" name="liner" class="input_seach_btn" tabindex="-1" onClick="openPopUp('LINER_POPLIST',this);"></button><!--
									--><input type="text"   name="lnr_trdp_nm" id="lnr_trdp_nm" maxlength="50"  value='<bean:write name="hblVO" property="lnr_trdp_nm"/>' onblur="strToUpper(this);" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:140px;" onKeyPress="if(event.keyCode==13){openPopUp('LINER_POPLIST', document.getElementById('liner'), frm1.lnr_trdp_nm.value);}">
								</td>
							</tr>
							<tr>
								<th><bean:message key="VSL_VOY"/></th>
                                <td><input type="hidden" name="trnk_vsl_cd" id="trnk_vsl_cd" maxlength="50" value='<bean:write name="hblVO" property="trnk_vsl_cd"/>' class="search_form" onKeyDown="codeNameAction('srVessel',this, 'onKeyDown')" onBlur="strToUpper(this);codeNameAction('srVessel',this, 'onBlur');" style="ime-mode:disabled; text-transform:uppercase;width:40px;"><!--
                                	--><input type="text" name="trnk_vsl_nm" id="trnk_vsl_nm" value='<bean:write name="hblVO" property="trnk_vsl_nm"/>' onblur="strToUpper(this);" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:79px;text-transform:uppercase;" maxlength="50" onKeyPress="if(event.keyCode==13){openPopUp('VESSEL_POPLIST', document.getElementById('trunkvessel'), frm1.trnk_vsl_nm.value);}"><!--
                                	--><button type="button"  id="trunkvessel" name="trunkvessel" class="input_seach_btn" tabindex="-1" onClick="openPopUp('VESSEL_POPLIST',this);"></button><!--
                                	--><input type="text" name="trnk_voy" id="trnk_voy" value='<bean:write name="hblVO" property="trnk_voy"/>' onblur="strToUpper(this);"  class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:111px;text-transform:uppercase;" maxlength="15">
                               	</td>
							</tr>
							<tr>
								<th><a href="javascript:clearBlPrnr('B01');"><bean:message key="Billing_Carrier"/></a></th>
								<td>
									<input type="text" name="carr_trdp_cd" maxlength="20" value='<bean:write name="hblVO" property="carr_trdp_cd"/>' onKeyDown="codeNameAction('trdpCode_carr',this, 'onKeyDown')" onBlur="strToUpper(this);codeNameAction('trdpCode_carr',this, 'onKeyDown')" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:50px;"><!--
									--><button type="button" name="carr" id="carr" class="input_seach_btn" tabindex="-1" onClick="openSeeMasterPopUp('LINER_POPLIST',this)"></button><!--
									--><input type="text" name="carr_trdp_nm" id="carr_trdp_nm" maxlength="50" value='<bean:write name="hblVO" property="carr_trdp_nm"/>' onblur="strToUpper(this)" class="search_form" dataformat="multiLanguage" style="ime-mode:disabled; text-transform:uppercase;width:140px;" onKeyPress="if(event.keyCode==13){openSeeMasterPopUp('LINER_POPLIST', document.getElementById('carr'), frm1.carr_trdp_nm.value);}"><!-- 
									--><input type="hidden" name="carr_trdp_addr" id="carr_trdp_addr" value='<bean:write name="hblVO" property="carr_trdp_addr"/>'>                             
								</td>
							</tr>							
						</tbody>
					</table>
					<h3 class="title_design"><bean:message key="Route"/></h3>
					<table>
						<colgroup>
							<col width="110">
							<col width="230">
							<col width="30">
							<col width="*">
						</colgroup>
						<tbody>
							<tr>
								<td colspan="2" align="right">
									<button type="button" class="btn_etc" name="btn_msnbonded" id="btn_msnbonded" onClick="doWork('TRANSSHIPPED')"><bean:message key="Transshipped"/></button>
									<input type="hidden" name="pre_vsl_cd"  value='<bean:write name="hblVO" property="pre_vsl_cd"/>' >
									<input type="hidden" name="pre_vsl_nm"  value='<bean:write name="hblVO" property="pre_vsl_nm"/>' >
									<input type="hidden" name="pre_voy"  value='<bean:write name="hblVO" property="pre_voy"/>' >
									<input type="hidden" name="ts1_port_cd"  value='<bean:write name="hblVO" property="ts1_port_cd" />' >
									<input type="hidden" name="ts1_port_nm"  value='<bean:write name="hblVO" property="ts1_port_nm"/>' >
									<input type="hidden"  name="ts1_etd_dt_tm" value='<wrt:write name="hblVO" property="ts1_etd_dt_tm" formatType="DATE" fromFormat="yyyyMMdd" format="MM-dd-yyyy"/>'  >
									<input type="hidden"  name="ts1_eta_dt_tm" value='<wrt:write name="hblVO" property="ts1_eta_dt_tm" formatType="DATE" fromFormat="yyyyMMdd" format="MM-dd-yyyy"/>'   >
								</td>
							</tr>
							<tr>
	                           	<th><bean:message key="SVC_Term"/></th>
                               	<td><bean:define id="serviceList" name="valMap" property="serviceList"/>
                                   	<html:select name="hblVO" property="fm_svc_term_cd" styleClass="search_form" style="width:104px;" onchange="svcTermChange();">
                                   		<html:options collection="serviceList" property="cd_val" labelProperty="cd_nm"/>
                                   </html:select><span class="dash">~</span><!--
                                   --><html:select name="hblVO" property="to_svc_term_cd" styleClass="search_form" style="width:103px;">
                                   		<html:options collection="serviceList" property="cd_val" labelProperty="cd_nm"/>
                                   </html:select><!--
                                   --><input type="hidden" name="h_fm_svc_term_cd" id="h_fm_svc_term_cd" value="<bean:write name="hblVO" property="fm_svc_term_cd"/>"><!--
                                   --><input type="hidden" name="h_to_svc_term_cd" id="h_to_svc_term_cd" value="<bean:write name="hblVO" property="to_svc_term_cd"/>">
                              	</td>
                              	<th><div style="display:none"><bean:message key="Lane"/></div></th> <!-- #3376 [JTC] Japan Trust  Lane 삭제-->
								<td><input type="hidden" name="svc_lane_nm" id="svc_lane_nm" maxlength="50" value="<bean:write name="hblVO" property="svc_lane_nm"/>" class="search_form" onKeyDown="" onblur="strToUpper(this)" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:99px;">
	                       	</tr>						
							<tr>
								<th><bean:message key="POR"/></th>
                                <td><input type="text" name="por_cd" id="por_cd" maxlength="5" value='<bean:write name="hblVO" property="por_cd"/>' class="search_form" onKeyDown="codeNameAction('Location_por',this, 'onKeyDown','S')" onBlur="strToUpper(this);codeNameAction('Location_por',this, 'onBlur','S')" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:50px;"><!--
                                	--><button type="button"  id="por" name="por" class="input_seach_btn" tabindex="-1" onClick="openPopUp('LOCATION_POPLIST',this)"></button><!--
                                	--><input type="text" name="por_nm" id="por_nm" maxlength="50" value='<bean:write name="hblVO" property="por_nm"/>' class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:140px;text-transform:uppercase;" onblur="strToUpper(this)" onKeyPress="if(event.keyCode==13){openPopUp('LOCATION_POPLIST', document.getElementById('por'), frm1.por_nm.value);}">
								</td>
								<th><bean:message key="ETD"/></th>
								<td><input name="etd_por_tm" id="etd_por_tm" value='<wrt:write name="hblVO" property="etd_por_tm" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy"/>'   type="text" class="search_form" onKeyUp="mkDateFormatType(this, event, false,1)" onBlur="mkDateFormatType(this, event, true,1);dateRangeValid(this, 'ETD of POR');" dataformat="excepthan" style="ime-mode:disabled;width:70px;" maxlength="10"><!-- 
									--><button type="button" id="etd_por_tm_cal" name="etd_por_tm_cal" onclick="doDisplay('DATE1' ,frm1.etd_por_tm);" class="calendar" tabindex="-1"></button></td>
								
							</tr>
							<tr>
								<th><bean:message key="POL"/></th>
								<td><input type="text" name="pol_cd" id="pol_cd" maxlength="5" value='<bean:write name="hblVO" property="pol_cd"/>' class="search_form" onKeyDown="codeNameAction('Location_pol',this, 'onKeyDown','S')" onBlur="strToUpper(this);codeNameAction('Location_pol',this, 'onBlur','S')" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:50px;" required="required"><!--
									--><button type="button"  id="pol" name="pol" class="input_seach_btn" tabindex="-1" onClick="openPopUp('LOCATION_POPLIST',this)"></button><!--
									--><input type="text" name="pol_nm" id="pol_nm" maxlength="50"  value='<bean:write name="hblVO" property="pol_nm"/>' class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:140px;text-transform:uppercase;" onblur="strToUpper(this);" onKeyPress="if(event.keyCode==13){openPopUp('LOCATION_POPLIST', document.getElementById('pol'), frm1.pol_nm.value);}" required="required">
								</td>
								<th><bean:message key="ETD"/></th>
								<td><input type="text" name="etd_dt_tm" id="etd_dt_tm" maxlength="10" value='<wrt:write name="hblVO" property="etd_dt_tm" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy"/>' class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:70px;" onKeyUp="mkDateFormatType(this, event, false,1)" onBlur="mkDateFormatType(this, event, true,1);dateRangeValid(this, 'ETD of POL');" required="required"><!-- 
									--><button type="button" id="etd_dt_tm_cal" name="etd_dt_tm_cal" onclick="doDisplay('DATE1' ,frm1.etd_dt_tm);" class="calendar" tabindex="-1"></button>
								</td>								
							</tr>
							<tr>
								<th><bean:message key="POD"/></th>
								<td><input type="text" name="pod_cd" id="pod_cd" maxlength="5" value='<bean:write name="hblVO" property="pod_cd"/>' class="search_form" onKeyDown="codeNameAction('Location_pod',this, 'onKeyDown','S')" onBlur="strToUpper(this);codeNameAction('Location_pod',this, 'onBlur','S')" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:50px;" required="required"><!--
									--><button type="button"  id="pod" name="pod" class="input_seach_btn" tabindex="-1" onClick="openPopUp('LOCATION_POPLIST',this)"></button><!--
									--><input type="text" name="pod_nm" id="pod_nm" maxlength="50"  value='<bean:write name="hblVO" property="pod_nm"/>' class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:140px;text-transform:uppercase;" onblur="strToUpper(this);" onKeyPress="if(event.keyCode==13){openPopUp('LOCATION_POPLIST', document.getElementById('pod'), frm1.pod_nm.value);}" required="required">
								</td>
								<th><bean:message key="ETA"/></th>
								<td><input type="text" name="eta_dt_tm" id="eta_dt_tm" maxlength="10" value='<wrt:write name="hblVO" property="eta_dt_tm" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy"/>' class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:70px;" onKeyUp="mkDateFormatType(this, event, false,1)" onBlur="mkDateFormatType(this, event, true,1);dateRangeValid(this, 'ETA of POD');"><!-- 
									--><button type="button" id="eta_dt_tm_cal" name="eta_dt_tm_cal" onclick="doDisplay('DATE1' ,frm1.eta_dt_tm);" class="calendar" tabindex="-1"></button>
								</td>								
							</tr>
							<tr>
								<th><bean:message key="DEL"/></th>
								<td><input type="text" name="del_cd" id="del_cd" maxlength="5" value='<bean:write name="hblVO" property="del_cd"/>' class="search_form" onKeyDown="codeNameAction('Location_del',this, 'onKeyDown','S')" onBlur="strToUpper(this);codeNameAction('Location_del',this, 'onBlur','S')" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:50px;"><!--
									--><button type="button"  id="del" name="del" class="input_seach_btn" tabindex="-1" onClick="openPopUp('LOCATION_POPLIST',this)"></button><!--
									--><input type="text" name="del_nm" id="del_nm" maxlength="50" value='<bean:write name="hblVO" property="del_nm"/>' class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:140px;text-transform:uppercase;" onblur="strToUpper(this)" onKeyPress="if(event.keyCode==13){openPopUp('LOCATION_POPLIST', document.getElementById('del'), frm1.del_nm.value);}">
								</td>
							</tr>
						</tbody>
					</table>
					<table>
						<colgroup>
							<col width="110">
							<col width="*">
						</colgroup>
						<tbody>
							<tr>
								<th><bean:message key="F_Dest"/></th>
								<td><input type="text" name="fnl_dest_loc_cd" id="fnl_dest_loc_cd" maxlength="5" value='<bean:write name="hblVO" property="fnl_dest_loc_cd"/>' class="search_form" onKeyDown="codeNameAction('Location_dest',this, 'onKeyDown','S')" onBlur="strToUpper(this);codeNameAction('Location_dest',this, 'onBlur','S')" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:50px;"><!--
									--><button type="button"  id="dest" name="dest" class="input_seach_btn" tabindex="-1" onClick="openPopUp('LOCATION_POPLIST',this)"></button><!--
									--><input type="text" name="fnl_dest_loc_nm" id="fnl_dest_loc_nm" maxlength="50" value='<bean:write name="hblVO" property="fnl_dest_loc_nm"/>' class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:140px;text-transform:uppercase;" onblur="strToUpper(this)" onKeyPress="if(event.keyCode==13){openPopUp('LOCATION_POPLIST', document.getElementById('dest'), frm1.fnl_dest_loc_nm.value);}">
								</td>
							</tr>
							<tr>
								<th><bean:message key="Cargo_Pick_Up"/></th>
								<td><input type="text" name="cgo_pu_trdp_cd" id="cgo_pu_trdp_cd" maxlength="20" value='<bean:write name="hblVO" property="cgo_pu_trdp_cd"/>' onKeyDown="codeNameAction('trdpCode_cgo_pu',this, 'onKeyDown')" onBlur="strToUpper(this);codeNameAction('trdpCode_cgo_pu',this, 'onBlur')" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:50px;"><!--
									--><button type="button"  id="cgo_pu" name="cgo_pu" class="input_seach_btn" tabindex="-1" onClick="openPopUp('LINER_POPLIST', this)"></button><!--
									--><input type="text" name="cgo_pu_trdp_nm" id="cgo_pu_trdp_nm" maxlength="50" value='<bean:write name="hblVO" property="cgo_pu_trdp_nm"/>' onblur="strToUpper(this);" class="search_form" dataformat="multiLanguage" style="ime-mode:disabled;width:140px;text-transform:uppercase;" onKeyPress="if(event.keyCode==13){openPopUp('LINER_POPLIST', document.getElementById('cgo_pu'), frm1.cgo_pu_trdp_nm.value);}"> 
								</td>
							</tr>
							<tr>
								<th></th>
								<td>
									<textarea name="cgo_pu_trdp_addr" id="cgo_pu_trdp_addr" class="search_form autoenter_50" dataformat="multiLanguage" style="width:222px;height:50px;" onblur="strToUpper(this);chkCmpAddr(this, 'Notify Address')" WRAP="off" maxlength="20"><bean:write name="hblVO" property="cgo_pu_trdp_addr" filter="false"/></textarea>
								</td>
							</tr>
							<tr>
								<th><bean:message key="Empty_Pickup"/></th>
	                             <td><input name="pu_trdp_cd" id="pu_trdp_cd" dataformat="excepthan" maxlength="20" value='<bean:write name="hblVO" property="pu_trdp_cd"/>' type="text" class="search_form" onKeyDown="codeNameAction('trdpCode_pu',this, 'onKeyDown')" onBlur="codeNameAction('trdpCode_pu',this, 'onBlur');javascript:this.value=this.value.toUpperCase();" style="ime-mode:disabled; text-transform:uppercase;width:50px;" onblur="strToUpper(this);"><!--
	                             	--><button type="button"  id="pu" name="pu" class="input_seach_btn" tabindex="-1" onClick="openPopUp('LINER_POPLIST',this)"></button><!--
	                             	--><input type="text" name="pu_trdp_nm" dataformat="multiLanguage" id="pu_trdp_nm" maxlength="50" value='<bean:write name="hblVO" property="pu_trdp_nm"/>' class="search_form" style="ime-mode:disabled;width:140px;text-transform:uppercase;" onblur="strToUpper(this)" onKeyPress="if(event.keyCode==13){openPopUp('LINER_POPLIST', document.getElementById('pu'), frm1.pu_trdp_nm.value);}">
	                             </td>
							</tr>
							<tr>
							<!-- #2911 [Exel AWS #2] Customer Booking Entry field name -->
							<% if("CN".equals(userInfo.getOfc_cnt_cd())){ %>
								<th><bean:message key="Warehouse"/></a></th>
							<% }else{ %>
								<th><bean:message key="Cargo_Delivery"/></a></th>
							<% } %>
								<td><input type="text" name="rcv_wh_cd" id="rcv_wh_cd" maxlength="20" value='<bean:write name="hblVO" property="rcv_wh_cd"/>' onKeyDown="codeNameAction('trdpCode_rcv',this, 'onKeyDown')" onBlur="strToUpper(this);codeNameAction('trdpCode_rcv',this, 'onBlur')" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:50px;"><!--
									--><button type="button"  id=rcv name="rcv" class="input_seach_btn" tabindex="-1" onClick="openPopUp('LINER_POPLIST', this)"></button><!--
									--><input type="text" name="rcv_wh_nm" id="rcv_wh_nm" maxlength="50" value='<bean:write name="hblVO" property="rcv_wh_nm"/>' onblur="strToUpper(this);" class="search_form" dataformat="multiLanguage" style="ime-mode:disabled;width:140px;text-transform:uppercase;" onKeyPress="if(event.keyCode==13){openPopUp('LINER_POPLIST', document.getElementById('rcv'), frm1.rcv_wh_nm.value);}">
								</td>
							</tr>
							<%-- <tr>
								<th><bean:message key="Liner_Bkg"/></th>
	                           	<td><input name="lnr_bkg_no" id="lnr_bkg_no" value='<bean:write name="hblVO" property="lnr_bkg_no"/>' type="text" class="search_form" onblur="strToUpper(this)" style="ime-mode:disabled; text-transform:uppercase;width:223px;" ></td>
							</tr>
							<tr>
								<th><bean:message key="Carrier_SC_No"/></th>
	                           	<td><input name="lnr_ctrt_no" id="lnr_ctrt_no" maxlength=20 value='<bean:write name="hblVO" property="lnr_bkg_no"/>' type="text" class="search_form" onblur="strToUpper(this)" style="ime-mode:disabled; text-transform:uppercase;width:223px;" ></td>
							</tr> --%>
						</tbody>
					</table>
					<table>
						<colgroup>
							<col width="100">
							<col width="110">
							<col width="67">
							<col width="*">
						</colgroup>
						<tbody>		
							<tr>
								<!-- #1424 Rail_Cut_off_Date에서 라벨명만 변경  -->
								<th>
										<bean:message key="Pre_Carriage_Date"/>
								</th>
								<td><input type="text" name="rail_cut_off_dt" id="rail_cut_off_dt" maxlength="10" value='<wrt:write name="hblVO" property="rail_cut_off_dt" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy"/>' class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:80px;" onKeyUp="mkDateFormatType(this, event, false, 1)" onBlur="mkDateFormatType(this, event, true, 1);dateRangeValid(this, 'Rail Cut-Off Date');"><!--
									--><button type="button" id="rail_cut_off_dt_cal" name="rail_cut_off_dt_cal" onclick="doDisplay('DATE1' ,frm1.rail_cut_off_dt);" class="calendar" tabindex="-1"></button>
								</td>
								<th><bean:message key="Time"/></th>
								<td><input type="text" name="rail_cut_off_tm" id="rail_cut_off_tm" value='<wrt:write name="hblVO" property="rail_cut_off_tm" formatType="DATE" fromFormat="HHmm" format="HH:mm"/>' maxlength="4" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:40px;" onchange="timeCheck(this);" onkeypress="onlyNumberCheck();"></td>
							</tr>									
							<tr>
								<th><bean:message key="W/H_Cut_Off_Date"/></th>
								<td><input type="text" name="wh_cut_off_dt" id="wh_cut_off_dt" maxlength="10" value='<wrt:write name="hblVO" property="wh_cut_off_dt" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy"/>' class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:80px;" onKeyUp="mkDateFormatType(this, event, false, 1)" onBlur="mkDateFormatType(this, event, true, 1);dateRangeValid(this, 'W/H Cut-Off Date');"><!--
									--><button type="button" id="wh_cut_off_dt_cal" name="wh_cut_off_dt_cal" onclick="doDisplay('DATE1' ,frm1.wh_cut_off_dt);" class="calendar" tabindex="-1"></button>
								</td>
								<th><bean:message key="Time"/></th>
								<td><input type="text" name="wh_cut_off_tm" id="wh_cut_off_tm" value='<wrt:write name="hblVO" property="wh_cut_off_tm" formatType="DATE" fromFormat="HHmm" format="HH:mm"/>' maxlength="4" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:40px;" onchange="timeCheck(this);" onkeypress="onlyNumberCheck();"></td>
							</tr>	
							<tr>
								<th><bean:message key="Port_Open_Date"/></th>
								<td><input type="text" name="port_open_dt" id="port_open_dt" maxlength="10" value='<wrt:write name="hblVO" property="port_open_dt" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy"/>' class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:80px;" onKeyUp="mkDateFormatType(this, event, false, 1)" onBlur="mkDateFormatType(this, event, true, 1);dateRangeValid(this, 'Port Open Date');"><!--
									--><button type="button" id="port_open_dt_cal" name="port_open_dt_cal" onclick="doDisplay('DATE1' ,frm1.port_open_dt);" class="calendar" tabindex="-1"></button>
								</td>
								<th><bean:message key="Time"/></th>
								<td><input type="text" name="port_open_tm" id="port_open_tm" value='<wrt:write name="hblVO" property="port_open_tm" formatType="DATE" fromFormat="HHmm" format="HH:mm"/>' maxlength="4" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:40px;" onchange="timeCheck(this);" onkeypress="onlyNumberCheck();"></td>
							</tr>							
							<tr> <!-- #1421 [PATENT] 0215_01 CY Cut-Off Date / Time for Customer Booking Entry -->
								<th><bean:message key="Port_Cut_Off_Date"/></th>
								<td><input type="text" name="cut_off_dt" id="cut_off_dt" maxlength="10" value='<wrt:write name="hblVO" property="cut_off_dt" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy"/>' class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:80px;" onKeyUp="mkDateFormatType(this, event, false, 1)" onBlur="mkDateFormatType(this, event, true, 1);dateRangeValid(this, 'Port Cut-Off Date');"><!--
									--><button type="button" id="cut_off_dt_cal" name="cut_off_dt_cal" onclick="doDisplay('DATE1' ,frm1.cut_off_dt);" class="calendar" tabindex="-1"></button>
								</td>
								<th><bean:message key="Time"/></th>
								<td><input type="text" name="cut_off_tm" id="cut_off_tm" value='<wrt:write name="hblVO" property="cut_off_tm" formatType="DATE" fromFormat="HHmm" format="HH:mm"/>' maxlength="4" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:40px;" onchange="timeCheck(this);" onkeypress="onlyNumberCheck();"></td>
							</tr>

							<tr>
								<th><bean:message key="DOC_Cut_Off_Date"/></th>
								<td><input type="text" name="doc_cut_off_dt" id="doc_cut_off_dt" maxlength="10" value='<wrt:write name="hblVO" property="doc_cut_off_dt" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy"/>' class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:80px;" onKeyUp="mkDateFormatType(this, event, false, 1)" onBlur="mkDateFormatType(this, event, true, 1);dateRangeValid(this, 'DOC Cut-Off Date');"><!--
									--><button type="button" id="doc_cut_off_dt_cal" name="doc_cut_off_dt_cal" onclick="doDisplay('DATE1' ,frm1.doc_cut_off_dt);" class="calendar" tabindex="-1"></button>
								</td>
								<th><bean:message key="Time"/></th>
								<td><input type="text" name="doc_cut_off_tm" id="doc_cut_off_tm" value='<wrt:write name="hblVO" property="doc_cut_off_tm" formatType="DATE" fromFormat="HHmm" format="HH:mm"/>' maxlength="4" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:40px;" onchange="timeCheck(this);" onkeypress="onlyNumberCheck();"></td>
							</tr>	
							<tr>
								<th><bean:message key="CSTMS_Cut_Off_Date"/></th>
								<td><input type="text" name="cstms_cut_off_dt" id="cstms_cut_off_dt" maxlength="10" value='<wrt:write name="hblVO" property="cstms_cut_off_dt" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy"/>' class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:80px;" onKeyUp="mkDateFormatType(this, event, false, 1)" onBlur="mkDateFormatType(this, event, true, 1);dateRangeValid(this, 'CSTMS Cut-Off Date');"><!--
									--><button type="button" id="cstms_cut_off_dt_cal" name="cstms_cut_off_dt_cal" onclick="doDisplay('DATE1' ,frm1.cstms_cut_off_dt);" class="calendar" tabindex="-1"></button>
								</td>
								<th><bean:message key="Time"/></th>
								<td><input type="text" name="cstms_cut_off_tm" id="cstms_cut_off_tm" value='<wrt:write name="hblVO" property="cstms_cut_off_tm" formatType="DATE" fromFormat="HHmm" format="HH:mm"/>' maxlength="4" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:40px;" onchange="timeCheck(this);" onkeypress="onlyNumberCheck();"></td>
							</tr>
							<tr>
								<th><bean:message key="VGM_Cut_Off_Date"/></th>
								<td><input type="text" name="vgm_cut_off_dt" id="vgm_cut_off_dt" maxlength="10" value='<wrt:write name="hblVO" property="vgm_cut_off_dt" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy"/>' class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:80px;" onKeyUp="mkDateFormatType(this, event, false, 1)" onBlur="mkDateFormatType(this, event, true, 1);dateRangeValid(this, 'VGM Cut-Off Date');"><!--
									--><button type="button" id="vgm_cut_off_dt_cal" name="vgm_cut_off_dt_cal" onclick="doDisplay('DATE1' ,frm1.vgm_cut_off_dt);" class="calendar" tabindex="-1"></button>
								</td>
								<th><bean:message key="Time"/></th>
								<td><input type="text" name="vgm_cut_off_tm" id="vgm_cut_off_tm" value='<wrt:write name="hblVO" property="vgm_cut_off_tm" formatType="DATE" fromFormat="HHmm" format="HH:mm"/>' maxlength="4" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:40px;" onchange="timeCheck(this);" onkeypress="onlyNumberCheck();"></td>
							</tr>														
						</tbody>
					</table>						

				</div>
			</div>
			<div class="layout_vertical_3">
				<div class="opus_design_inquiry sm" style="height: 700px;">
					<h3 class="title_design"><bean:message key="Shippment_and_Item"/></h3>
					<table>
						<colgroup>
							<col width="133">
							<col width="*">
						</colgroup>
						<tbody>
							<tr>
                           		<th><bean:message key="Freight"/></th>
                               <td colspan="3">
                                   <bean:define id="frtList" name="valMap" property="frtCdList"/>
                                   <html:select name="hblVO" property="frt_term_cd" styleClass="search_form" style="width:80px;">
                                       <html:options collection="frtList" property="cd_val" labelProperty="cd_nm"/>
                                   </html:select><!-- 
                                   --><input type="hidden" name="h_frt_term_cd" value="<bean:write name="hblVO" property="frt_term_cd"/>">
                               </td>
                            </tr>
						</tbody>
					</table>
					<table>
						<colgroup>
							<col width="133">
							<col width="*">
						</colgroup>
						<tbody>

							<tr>
								<th><bean:message key="Commodity"/></th>
								<td><input type="text" name="rep_cmdt_cd" id="rep_cmdt_cd" maxlength="13" value="<bean:write name="hblVO" property="rep_cmdt_cd"/>" class="search_form" onKeyDown="codeNameAction('commodity',this, 'onKeyDown')" onBlur="strToUpper(this);codeNameAction('commodity',this, 'onBlur')" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:80px;"><!--
									--><button type="button"  id="commodity" name="commodity" class="input_seach_btn" tabindex="-1" onClick="openPopUp('COMMODITY_POPLIST',this)"></button><!--
									--><input type="text" name="rep_cmdt_nm" id="rep_cmdt_nm" value="<bean:write name="hblVO" property="rep_cmdt_nm"/>" maxlength="100" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:112px;" onBlur="strToUpper(this);" onchange="" onKeyPress="if(event.keyCode==13){openPopUp('COMMODITY_POPLIST', this);}">
								</td>
							</tr>
						</tbody>
					</table>					
					<table>
						<colgroup>
							<col width="133">
							<col width="*">
						</colgroup>
						<tbody>
							<tr>
								<th><bean:message key="Package"/></th>
								<td><input type="text" name="pck_qty" id="pck_qty" value="<bean:write name="hblVO" property="pck_qty"/>" onkeyPress="onlyNumberCheck();" onkeyup="numberCommaLen(this,7,0)" maxlength="7"  class="search_form zero_remove" dataformat="excepthan" style="ime-mode:disabled;width:80px;text-align:right"><!--
									--><bean:define id="pckList" name="valMap" property="pckCdList"/><!--
									--><html:select name="hblVO" property="pck_ut_cd" styleClass="search_form" style="width:140px;" >
											<option></option>
											<html:options collection="pckList" property="pck_ut_cd" labelProperty="pck_nm"/>
										</html:select> 
								</td>
							</tr>
						</tbody>
					</table>
					<table>
						<colgroup>
							<col width="133">
							<col width="*">
						</colgroup>
						<tbody>
							<tr>
								<th><bean:message key="GWeight"/></th>
								<td><input type="text" name="grs_wgt" id="grs_wgt" value="<bean:write name="hblVO" property="grs_wgt"/>" onkeyPress="onlyNumberCheck('.');" onchange="numberCommaLen(this,8,2);chkComma(this,8,2);weightChange(this);" maxlength="13" class="search_form zero_remove" dataformat="excepthan" style="ime-mode:disabled;width:80px;text-align:right;"><!--
									--><input type="text" name="grs_wgt_ut_cd" id="grs_wgt_ut_cd" value="KG" style="width:35px;border:0;background-color:transparent;" tabindex="-1" readOnly><!--
									--><input type="text" name="grs_wgt1" id="grs_wgt1" value="<bean:write name="hblVO" property="grs_wgt1"/>" onkeyPress="onlyNumberCheck('.');" onchange="numberCommaLen(this,8,2);chkComma(this,8,2);weightChange(this);" maxlength="13" class="search_form zero_remove" dataformat="excepthan" style="ime-mode:disabled;width:70px;text-align:right;"><!--
									--><input type="text" name="grs_wgt_ut_cd1" id="grs_wgt_ut_cd1" value="LB" style="width:30px;border:0;background-color:transparent;" tabindex="-1" readOnly>
								</td>
							</tr>
						</tbody>
					</table>
					<table>
						<colgroup>
							<col width="133">
							<col width="*">
						</colgroup>
						<tbody>
							<tr>
								<th><bean:message key="Measurement"/></th>
								<td><input type="text" name="meas" id="meas" value="<bean:write name="hblVO" property="meas"/>" onkeyPress="onlyNumberCheck('.');" onchange="numberCommaLen(this,8,3);chkComma(this,8,3);cbmChange(this);" maxlength="13" class="search_form zero_remove" dataformat="excepthan" style="ime-mode:disabled;width:80px;text-align:right;"><!--
									--><input type="text" name="meas_ut_cd" id="meas_ut_cd" value="CBM" style="width:35px;border:0;background-color:transparent;" tabindex="-1" readOnly><!--
									--><input type="text" name="meas1" id="meas1" value="<bean:write name="hblVO" property="meas1"/>" onkeyPress="onlyNumberCheck('.');" onchange="numberCommaLen(this,8,3);cbmChange(this);" maxlength="13" class="search_form zero_remove" dataformat="excepthan" style="ime-mode:disabled;width:70px;text-align:right;"><!--
									--><input type="text" name="meas_ut_cd1" id="meas_ut_cd1" value="CFT" style="width:30px;border:0;background-color:transparent;" tabindex="-1" readOnly>
								</td>
							</tr>
						</tbody>
					</table>
                   	<table>
                   		<colgroup>
							<col width="133">
							<col width="*">
						</colgroup>
						<tbody>
							<tr>
                            	<th><bean:message key="Cargo_Type"/></th>
								<td>
									<bean:define id="cargoTpCdList" name="valMap" property="cargoTpCdList"/>
									<html:select name="hblVO" property="cargo_tp_cd" styleClass="search_form" style="width:80px;">
										<html:options collection="cargoTpCdList" property="cd_val" labelProperty="cd_nm"/>
									</html:select>
								</td>
                        	</tr>
                    	<tr>
                        	<th style="text-align: right;"><bean:message key="Container_Summary"/></th>
                        	<td><input type="text" readOnly name="cntr_info" id="cntr_info" value='<bean:write name="hblVO" property="cntr_info" filter="false"/>' onBlur="strToUpper(this)" class="search_form" style="ime-mode:disabled; text-transform:uppercase;width:226px;" maxlength="500" tabindex="-1"></td>
                      	</tr>                        	
						</tbody>
               		</table>
                   	<table>
						<colgroup>
							<col width="133">
							<col width="*">
						</colgroup>
						<tbody>
	                    	<tr>
	                    		<th style="height: 29px;text-align: right;"><bean:message key="Export_Reference_No"/></th>
	                    		<td><textarea name="exp_ref_no" class="search_form autoenter_50" onblur="strToUpper(this);chkCmpAddr(this, 'Export Reference No.')" dataformat="excepthan" style="width:226px;height:80px;" WRAP="off"><bean:write name="hblVO" property="exp_ref_no" filter="false"/></textarea></td>
	                     	</tr>
                     	</tbody>
                    </table>

					<!-- #2461 [PATENT] Customer Booking 화면에서 House B/L Copy Form 인쇄 (S) -->
					<table>
						<colgroup>
							<col width="133">
							<col width="*">
						</colgroup>
						<tbody>
							<tr>
								<th style="height: 29px;text-align: right;"><bean:message key="Mark"/></th>
								<td><textarea name="mk_txt" class="search_form autoenter_50" onblur="strToUpper(this);" dataformat="excepthan" style="width:226px;height:80px;" WRAP="off" maxlength="4000"><bean:write name="hblVO" property="mk_txt" filter="false"/></textarea></td>
							</tr>
						</tbody>
					</table>
					<table>
						<colgroup>
							<col width="133">
							<col width="*">
						</colgroup>
						<tbody>
							<tr>
								<th style="height: 29px;text-align: right;"><bean:message key="Description"/></th>
								<td><textarea name="desc_txt" class="search_form autoenter_50" onblur="strToUpper(this);" dataformat="excepthan" style="width:226px;height:80px;" WRAP="off"  maxlength="4000"><bean:write name="hblVO" property="desc_txt" filter="false"/></textarea></td>
							</tr>
						</tbody>
					</table>
					<!-- #2461 [PATENT] Customer Booking 화면에서 House B/L Copy Form 인쇄 (E) -->

                    <table>
                    	<colgroup>
                    		<col width="133">
                    		<col width="65">
                    		<col width="30">
                    		<col width="65">
                    		<col width="*">
                    	</colgroup>
                    	<tr>
							<th><bean:message key="Service"/> </th>
							<td><bean:message key="Trucking"/></td>
							<td><input type="checkbox" id="trkg_svc_flg" name="trkg_svc_flg" value="<bean:write name="hblVO" property="trkg_svc_flg"/>" /></td>
							<td><bean:message key="Customs"/></td>
							<td><input type="checkbox" id="cstms_svc_flg" name="cstms_svc_flg" value="<bean:write name="hblVO" property="cstms_svc_flg"/>" onchange="checkCstmsCd();"/>
							<bean:define id="cstmsTypeList" name="valMap" property="cstmsTypeList"/>
								<html:select name="hblVO" property="cstms_tp_cd" styleClass="search_form" style="width:107px;" disabled="true"><!-- 
								--><option value=""></option><!--	
								--><html:options collection="cstmsTypeList" property="cd_val" labelProperty="cd_nm"/><!-- 
								--></html:select><!-- 
								-->
							</td>
                    	</tr>
                    </table>               		
					<%-- table>
						<colgroup>
							<col width="120">
							<col width="110">
							<col width="30">
							<col width="*">
						</colgroup>
						<tbody>
						    <!-- #739	[Epsylog] Implement Requirement -->
							<tr>
								<th><bean:message key="Port_Open_Date"/></th>
								<td><input type="text" name="port_open_dt" id="port_open_dt" maxlength="10" value='<wrt:write name="hblVO" property="port_open_dt" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy"/>' class="search_form"  style="ime-mode:disabled;width:70px;" onKeyUp="mkDateFormatType(this, event, false, 1)" onBlur="mkDateFormatType(this, event, true, 1);dateRangeValid(this, 'Port Open Date');"><!--
									--><button type="button" id="port_open_dt_cal" name="port_open_dt_cal" onclick="doDisplay('DATE1' ,frm1.port_open_dt);" class="calendar" tabindex="-1"></button>
								</td>
								<th><bean:message key="Time"/></th>
								<td><input type="text" name="port_open_tm" id="port_open_tm" value='<wrt:write name="hblVO" property="port_open_tm" formatType="DATE" fromFormat="HHmm" format="HH:mm"/>' maxlength="4" class="search_form" style="ime-mode:disabled;width:40px;" onchange="timeCheck(this);" onkeypress="onlyNumberCheck();"></td>
							</tr>
							<tr>
								<th><bean:message key="Port_Cut_Off_Date"/></th>
								<td><input type="text" name="cut_off_dt" id="cut_off_dt" maxlength="10" value='<wrt:write name="hblVO" property="cut_off_dt" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy"/>' class="search_form"  style="ime-mode:disabled;width:70px;" onKeyUp="mkDateFormatType(this, event, false, 1)" onBlur="mkDateFormatType(this, event, true, 1);dateRangeValid(this, 'Port Cut-Off Date');"><!--
									--><button type="button" id="cut_off_dt_cal" name="cut_off_dt_cal" onclick="doDisplay('DATE1' ,frm1.cut_off_dt);" class="calendar" tabindex="-1"></button>
								</td>
								<th><bean:message key="Time"/></th>
								<td><input type="text" name="cut_off_tm" id="cut_off_tm" value='<wrt:write name="hblVO" property="cut_off_tm" formatType="DATE" fromFormat="HHmm" format="HH:mm"/>' maxlength="4" class="search_form" style="ime-mode:disabled;width:40px;" onchange="timeCheck(this);" onkeypress="onlyNumberCheck();"></td>
							</tr>
							<tr>
								<th><bean:message key="Rail_Cut_Off_Date"/></th>
								<td><input type="text" name="rail_cut_off_dt" id="rail_cut_off_dt" maxlength="10" value='<wrt:write name="hblVO" property="rail_cut_off_dt" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy"/>' class="search_form"  style="ime-mode:disabled;width:70px;" onKeyUp="mkDateFormatType(this, event, false, 1)" onBlur="mkDateFormatType(this, event, true, 1);dateRangeValid(this, 'Rail Cut-Off Date');"><!--
									--><button type="button" id="rail_cut_off_dt_cal" name="rail_cut_off_dt_cal" onclick="doDisplay('DATE1' ,frm1.rail_cut_off_dt);" class="calendar" tabindex="-1"></button>
								</td>
								<th><bean:message key="Time"/></th>
								<td><input type="text" name="rail_cut_off_tm" id="rail_cut_off_tm" value='<wrt:write name="hblVO" property="rail_cut_off_tm" formatType="DATE" fromFormat="HHmm" format="HH:mm"/>' maxlength="4" class="search_form" style="ime-mode:disabled;width:40px;" onchange="timeCheck(this);" onkeypress="onlyNumberCheck();"></td>
							</tr>
							<tr>
								<th><bean:message key="DOC_Cut_Off_Date"/></th>
								<td><input type="text" name="doc_cut_off_dt" id="doc_cut_off_dt" maxlength="10" value='<wrt:write name="hblVO" property="doc_cut_off_dt" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy"/>' class="search_form"  style="ime-mode:disabled;width:70px;" onKeyUp="mkDateFormatType(this, event, false, 1)" onBlur="mkDateFormatType(this, event, true, 1);dateRangeValid(this, 'DOC Cut-Off Date');"><!--
									--><button type="button" id="doc_cut_off_dt_cal" name="doc_cut_off_dt_cal" onclick="doDisplay('DATE1' ,frm1.doc_cut_off_dt);" class="calendar" tabindex="-1"></button>
								</td>
								<th><bean:message key="Time"/></th>
								<td><input type="text" name="doc_cut_off_tm" id="doc_cut_off_tm" value='<wrt:write name="hblVO" property="doc_cut_off_tm" formatType="DATE" fromFormat="HHmm" format="HH:mm"/>' maxlength="4" class="search_form" style="ime-mode:disabled;width:40px;" onchange="timeCheck(this);" onkeypress="onlyNumberCheck();"></td>
							</tr>
							<!-- #739	[Epsylog] Implement Requirement -->
							<tr>
								<th><bean:message key="VGM_Cut_Off_Date"/></th>
								<td><input type="text" name="vgm_cut_off_dt" id="vgm_cut_off_dt" maxlength="10" value='<wrt:write name="hblVO" property="vgm_cut_off_dt" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy"/>' class="search_form"  style="ime-mode:disabled;width:70px;" onKeyUp="mkDateFormatType(this, event, false, 1)" onBlur="mkDateFormatType(this, event, true, 1);dateRangeValid(this, 'VGM Cut-Off Date');"><!--
									--><button type="button" id="vgm_cut_off_dt_cal" name="vgm_cut_off_dt_cal" onclick="doDisplay('DATE1' ,frm1.vgm_cut_off_dt);" class="calendar" tabindex="-1"></button>
								</td>
								<th><bean:message key="Time"/></th>
								<td><input type="text" name="vgm_cut_off_tm" id="vgm_cut_off_tm" value='<wrt:write name="hblVO" property="vgm_cut_off_tm" formatType="DATE" fromFormat="HHmm" format="HH:mm"/>' maxlength="4" class="search_form" style="ime-mode:disabled;width:40px;" onchange="timeCheck(this);" onkeypress="onlyNumberCheck();"></td>
							</tr>
						</tbody>
					</table --%>
					<%--  table>
						<colgroup>
							<col width="120">
							<col width="*">
						</colgroup>
						<tr>
							<th><bean:message key="Sales_OFC"/></th>
							<td><input type="text"   name="sls_ofc_cd" id="sls_ofc_cd" value="<bean:write name="hblVO" property="sls_ofc_cd"/>" class="search_form-disable" style="width:70px;" tabindex="-1" readonly><!--
								--><button type="button"  id="btn_Sales_OFC" name="btn_Sales_OFC" class="input_seach_btn" tabindex="-1" onClick="openPopUp('OFFICE_GRID_POPLIST',this)"></button>
							</td>
						</tr>
						<tr>
							<th><bean:message key="Sales_PIC"/></th>
			               	<td><input type="text"   name="sls_usrid" id="sls_usrid" value="<bean:write name="hblVO" property="sls_usrid"/>"  class="search_form-disable" style="width:70px;" readOnly><!--
			               		--><button type="button"  id="salesperson" name="salesperson" class="input_seach_btn" tabindex="-1" onClick="openPopUp('USER_POPLIST',this)"></button><!--
			               		--><input type="hidden" name="sls_usr_nm" id="sls_usr_nm" value="<bean:write name="hblVO" property="sls_usr_nm"/>" class="search_form-disable" style="width:120px;" tabindex="-1" readOnly><!--
			               		--><input type="hidden" name="sls_dept_cd" id="sls_dept_cd" value="<bean:write name="hblVO" property="sls_dept_cd"/>"></td>
						</tr>
					</table --%>
					<table>
						<colgroup>
							<col width="133">
							<col width="100">
							<col width="20">
							<col width="*">
						</colgroup>
						<tbody>
						    <tr>
                            	<th><bean:message key="Assignee"/></th>
                            	<td>
                            		<input type="text" name="asgn_usrid" value="<bean:write name="hblVO" property="asgn_usrid"/>" class="search_form-disable" tabindex="-1" readOnly style="width:70px;"><!-- 
                            		 --><button type="button" name="asgnBtn" id="asgnBtn" class="input_seach_btn" tabindex="-1" onClick="openPopUp('ASGN_POPLIST',this)"></button>  
                            	</td>
                            
                            </tr>						
							<tr>
								<th><bean:message key="Sales_OFC"/></th>
								<td><input type="text"   name="sls_ofc_cd" id="sls_ofc_cd" value="<bean:write name="hblVO" property="sls_ofc_cd"/>" class="search_form-disable" style="width:70px;" tabindex="-1" readonly><!--
									--><button type="button"  id="btn_Sales_OFC" name="btn_Sales_OFC" class="input_seach_btn" tabindex="-1" onClick="openPopUp('OFFICE_GRID_POPLIST',this)"></button>
								</td>
								<th><bean:message key="PIC"/></th>
				               	<td><input type="text"   name="sls_usrid" id="sls_usrid" value="<bean:write name="hblVO" property="sls_usrid"/>"  class="search_form-disable" style="width:70px;" readOnly tabindex="-1"><!--
				               		--><button type="button"  id="salesperson" name="salesperson" class="input_seach_btn" tabindex="-1" onClick="openPopUp('USER_POPLIST',this)"></button><!--
				               		--><input type="hidden" name="sls_usr_nm" id="sls_usr_nm" value="<bean:write name="hblVO" property="sls_usr_nm"/>" class="search_form-disable" style="width:120px;" tabindex="-1" readOnly><!--
				               		--><input type="hidden" name="sls_dept_cd" id="sls_dept_cd" value="<bean:write name="hblVO" property="sls_dept_cd"/>"></td>
							</tr>
						
						</tbody>					
					</table>
					<table>
						<colgroup>
							<col width="133">
							<col width="80">
							<col width="18">
							<col width="*">

						</colgroup>
						<tbody>
	                      	<tr>
                            	<th><bean:message key="Issued_By"/></th>
                                <td>
                                	<input type="text" name="iss_usrid" value="<bean:write name="hblVO" property="iss_usrid"/>" class="search_form-disable" tabindex="-1" readOnly style="width:70px;"><!-- 
                                	 --><button type="button" name="issBtn" id="issBtn" class="input_seach_btn" tabindex="-1" onClick="openPopUp('ISS_POPLIST',this)"></button> 
                            	</td>
                            	<th><bean:message key="At"/></th>
                            	<td>
                            		<input name="rgst_tms" id="rgst_tms" value="<wrt:write name="hblVO" property="rgst_tms" formatType="DATE" fromFormat="MMddyyyyHHmmss" format="MM-dd-yyyy HH:mm:ss"/>" type="text" class="search_form" readOnly dataformat="excepthan" style="ime-mode:disabled;width:130px;"  maxlength="10" class="search_form" tabindex="-1">
                            	</td>
                            </tr> 
                            <tr>
                            	<th><bean:message key="Modified_By"/></th>
                                <td>
                                	<input type="text" name="modi_usrid" value="<bean:write name="hblVO" property="modi_usrid"/>" class="search_form-disable" tabindex="-1" readOnly style="width:70px;"> 
                            	</td>
                            	<th><bean:message key="At"/></th>
                            	<td>
                            		<input name="modi_tms" id="modi_tms" value="<wrt:write name="hblVO" property="modi_tms" formatType="DATE" fromFormat="MMddyyyyHHmmss" format="MM-dd-yyyy HH:mm:ss"/>" type="text" class="search_form" readOnly dataformat="excepthan" style="ime-mode:disabled;width:130px;"  maxlength="10" class="search_form" tabindex="-1">
                            	</td>
                            </tr>  
						</tbody>
					</table>
				</div>
			</div>
		</div>
		
			<div class="layout_vertical_3 pad_rgt_8"  >
				<div class="opus_design_inquiry sm">
					<h3 class="title_design"><bean:message key="Remark"/></h3>
					<table>
						<tr>
			       			<td>
			           			<textarea name="rmk" id="rmk" cols="200" rows="6" maxlength="400" onkeypress="keyPress_maxLength(this);" onkeyup="keyUp_maxLength(this);" onblur="strToUpper(this);keyUp_maxLength(this);" style="ime-mode:auto; width: 100%; height: 100%;"><bean:write name="hblVO" property="rmk" filter="false"/></textarea>
			           		</td>
			       		</tr> 
					</table>
				</div>
			</div>

			<div class="layout_vertical_3 pad_rgt_8" style="min-width:34%;">
				<div class="opus_design_inquiry sm">
					<h3 class="title_design"><bean:message key="Internal_Remark"/></h3>
					<table>
						<tr>
			       			<td>
			           			<textarea name="inter_rmk_txt" id="inter_rmk_txt" cols="200" rows="6" maxlength="400" onkeypress="keyPress_maxLength(this);" onkeyup="keyUp_maxLength(this);" onblur="strToUpper(this);keyUp_maxLength(this);" style="ime-mode:auto; width: 100%; height: 100%;"><bean:write name="hblVO" property="inter_rmk_txt" filter="false"/></textarea>
			           		</td>
			       		</tr> 
					</table>
				</div>
			</div>
			
			<div class="layout_vertical_3 ">
				<div class="opus_design_inquiry sm">
					<h3 class="title_design"><bean:message key="Booking_Status"/></h3>
					<table>
						<tr>
			       			<td>
			           			<textarea name="rsn_txt" id="rsn_txt" cols="200" rows="6" maxlength="400" onkeypress="keyPress_maxLength(this);" onkeyup="keyUp_maxLength(this);" onblur="keyUp_maxLength(this);" style="ime-mode:auto; text-transform:none; width:100%; height:100%;" readonly="readonly" tabindex="-1"></textarea>
			           		</td>
			       		</tr> 
					</table>
				</div>
			</div>			
		<%-- <div class="opus_design_inquiry sm">
			<h3 class="title_design"><bean:message key="Remark"/></h3>
			<table>
				<tr>
		       		<td>
		           		<textarea name="rmk" id="rmk" cols="200" rows="4" maxlength="400" onkeypress="keyPress_maxLength(this);" onkeyup="keyUp_maxLength(this);" onblur="strToUpper(this);keyUp_maxLength(this);" style="width: 1270px">
<bean:write name="hblVO" property="rmk" filter="false"/></textarea>
		           </td>
		       </tr> 
			</table>
		</div> --%>
		</div>

		<div id="tabLayer" name="tabLayer" style="display: none">
		<div class="opus_design_inquiry">
			<!--Container-->
			<div class="layout_vertical_2" style="width: 20%; padding-right: 10px;">
				<div class="opus_design_grid">
					<h3 class="title_design">
						<bean:message key="Booking_Quantity" />
					</h3>

					<div class="opus_design_btn">
						<button type="button"  class="btn_accent" name="cnrtAdd"
							id="cnrtAdd" onClick="cntrGridAdd(sheet3);">
							<bean:message key="Add" />
						</button>
					</div>
					<div class="opus_design_grid"><script type="text/javascript">comSheetObject('sheet3');</script></div>
				</div>
			</div>
			<!--#1423  [PATENT] 0215_04 Customer Booking Entry - Additional Items-->
			<!-- Container tab - Container List -->
			<div class="layout_vertical_2 pad_left_4" style="width: 80%;padding-bottom: 10px;">
				<div class="opus_design_grid">
					<h3 class="title_design" >
						<bean:message key="Container_List" />
					</h3>
					<div class="opus_design_btn" style>
						<button type="button"  class="btn_accent" name="cnrtAdd"
							id="cnrtListAdd" onClick="getLnrBkgCntrList();">
							<bean:message key="Add" />
						</button>
					</div>
					<div class="opus_design_grid"><script type="text/javascript">comSheetObject('sheet11');</script></div>
				</div>
				
				
			</div>
		
		
				<div class="opus_design_grid">
					<h3 class="title_design mar_btm_8">
						<bean:message key="PO" />
					</h3>
	
					<div class="opus_design_btn">
						<button type="button" class="btn_normal" onClick="doWork('PO_ADD')">
							<bean:message key="Load_PO" />
						</button>
					</div>
					<script type="text/javascript">comSheetObject('sheet2');</script>
				</div>
			</div>
		</div>
		<%-- div id="tabLayer" name="tabLayer" style="display:none">
			<div class="layout_vertical_2" style="width:600px">
				<div class="opus_design_inquiry sm">
					<h3 class="title_design"><bean:message key="Remark"/></h3>
					<table>
						<tr>
			       			<td>
			           			<textarea name="rmk" id="rmk" cols="200" rows="16" maxlength="1000" onkeypress="keyPress_maxLength(this);" onkeyup="keyUp_maxLength(this);" onblur="strToUpper(this);keyUp_maxLength(this);" style="width: 100%; height: 100%;">
<bean:write name="hblVO" property="rmk" filter="false"/></textarea>
			           		</td>
			       		</tr> 
					</table>
				</div>
			</div>
			<div class="layout_vertical_2 pad_left_8" style="width:calc(100% - 600px);">
				<div class="opus_design_inquiry sm">
					<h3 class="title_design"><bean:message key="Internal_Remark"/></h3>
					<table>
						<tr>
			       			<td>
			           			<textarea name="rsn_txt" id="rsn_txt" cols="200" rows="16" maxlength="1000" onkeypress="keyPress_maxLength(this);" onkeyup="keyUp_maxLength(this);" onblur="keyUp_maxLength(this);" style="ime-mode:auto; text-transform:none; width:100%; height:100%;" readonly="readonly"></textarea>
			           		</td>
			       		</tr> 
					</table>
				</div>
			</div>
        </div --%>
        <div id="tabLayer" name="tabLayer" style="display:none">
        	<div id="frtTableS">
				<div class="opus_design_grid" id="mainTable">
					<h3 class="title_design"><bean:message key="Account_Receivable"/></h3>
					<div class="opus_design_btn">
						<div class="grid_option_left" style="margin-right: 50px; display:none;" id="profitBtns">
							<b><span style="float: left; margin-right: 10px; padding-top: 5px;"><bean:message key="Profit"/></span></b>
							<input type="text" name="profit" size='11' class="search_form-disable" style="float:left;ime-mode:disabled;resize:none;width:110;text-align:right;" readonly>
						</div>
						<div class="grid_option_left">
							<button type="button" class="btn_accent" onClick="setFrtSizeUp(docObjects[3], 'frtTableS')"><bean:message key="Plus"/></button><!--
							--><button type="button" class="btn_normal"  onClick="setFrtSizeDown(docObjects[3], 'frtTableS')"><bean:message key="Minus"/></button><!--
							--><button style="display: none;" type="button" class="btn_normal"  onClick="goToInvoice(docObjects[3], 'LOCAL')" ><bean:message key="B.AR"/></button><!--
							--><button style="display: none;" type="button" class="btn_normal"  onClick="goToInvoiceModify('LOCAL')" ><bean:message key="Invoice"/></button>
						</div>
						<div class="grid_option_left" style="display:none;" id="sdBtns" >
							<button id="FrtArAddDefault" type="button" class="btn_normal"  onClick="setDfltFrt('', 'S', 'O', 'H');afterRowAdd('AR');" ><bean:message key="Default"/> <bean:message key="New"/></button><!--
							--><button id="FrtArAdd" type="button" class="btn_normal"  onclick="frtRowAdd('ROWADD', docObjects[3], 'S', 'O', 'H');afterRowAdd('AR');" ><bean:message key="Add"/></button>
						</div>						
					</div>
				<script type="text/javascript">comSheetObject('sheet5');</script>
				</div>
			</div>
			<div class="opus_design_grid" id="mainTable">
				<h3 class="title_design"><bean:message key="Debit_Credit"/></h3>
				<div class="opus_design_btn">
					<div class="grid_option_left">
						<button type="button" class="btn_accent" onClick="setFrtSizeUp(docObjects[4], 'frtTableDC')"><bean:message key="Plus"/></button><!--
						--><button type="button" class="btn_normal"  onClick="setFrtSizeDown(docObjects[4], 'frtTableDC')"><bean:message key="Minus"/></button><!--
						--><button style="display: none;" type="button" class="btn_normal"  onClick="goToInvoice(docObjects[4], 'DC')" ><bean:message key="B.DC"/></button><!--
						--><button style="display: none;" type="button" class="btn_normal"  onClick="goToInvoiceModify('DC')" ><bean:message key="Invoice"/></button>
					</div>
					<div class="grid_option_left" style="display:none;" id="dcBtns" >
						<button id="FrtDcAddDefault" type="button" class="btn_normal"  onClick="setDfltFrt('dc_', 'S', 'O', 'H');afterRowAdd('DC');" ><bean:message key="Default"/> <bean:message key="New"/></button><!--
						--><button id="FrtDcAdd" type="button" class="btn_normal"  onclick="frtRowAdd('DCROWADD', docObjects[4], 'S', 'O', 'H');afterRowAdd('DC');" ><bean:message key="Add"/></button>
					</div>
				</div>
				<script type="text/javascript">comSheetObject('sheet7');</script>
			</div>
			<div class="opus_design_grid" id="mainTable">
				<h3 class="title_design"><bean:message key="Account_Payable"/></h3>
				<div class="opus_design_btn">
					<div class="grid_option_left">
						<button type="button" class="btn_accent" onClick="setFrtSizeUp(docObjects[5], 'frtTableB')"><bean:message key="Plus"/></button><!-- 
					--><button type="button" class="btn_normal"  onClick="setFrtSizeDown(docObjects[5], 'frtTableB')"><bean:message key="Minus"/></button><!--
					--><button style="display: none;" type="button" class="btn_normal"  onClick="goToInvoice(docObjects[5], 'AP')" ><bean:message key="B.AP"/></button><!-- 
					--><button style="display: none;" type="button" class="btn_normal"  onClick="goToInvoiceModify('AP')" ><bean:message key="Invoice"/></button><!-- 
					--><span style="display: none;" id="btnPierpass"><button type="button" class="btn_normal"  onClick="addPierPassFrt(frm1.intg_bl_seq.value, 'H', frm1.shp_mod_cd.value, 'O', 'B')" ><bean:message key="PIERPASS"/></button></span> 
					</div>
					<div class="grid_option_left" style="display:none;" id="bcBtns" >
					<button id="FrtApAddDefault" type="button" class="btn_normal"  onClick="setDfltFrt('b_', 'S', 'O', 'H');afterRowAdd('AP');" ><bean:message key="Default"/> <bean:message key="New"/></button><!-- 
					--><button id="FrtApAdd" type="button" class="btn_normal"  onclick="frtRowAdd('BCROWADD', docObjects[5], 'S', 'O', 'H');afterRowAdd('AP');" ><bean:message key="Add"/></button>
					</div>
				</div>
				<script type="text/javascript">comSheetObject('sheet6');</script>
			</div>
        </div>
        <!--sheet8 사용안하는 IBSheet List -->
        <div id="tabLayer" name="tabLayer" style="display:none">
        	<div class="opus_design_grid" id="mainTable">
				<h3 class="title_design mar_btm_8"><bean:message key="Work_Order_List"/></h3>

				<script type="text/javascript">comSheetObject('sheet8');</script>
			</div>
        </div>
	    <div id="tabLayer" name="tabLayer" style="display:none"><!--Status-->
   			<h3 class="title_design"><bean:message key="History_Search"/></h3>
	    	<div class="opus_design_grid">
				<script type="text/javascript">comSheetObject('sheet9');</script>
				<script type="text/javascript">comSheetObject('sheet10');</script>
			</div>
		</div>

	    <div id="tabLayer" name="tabLayer" style="display:none"><!--Status-->
   			<h3 class="title_design"><bean:message key="Work_Order_List"/></h3>
	    	<div class="opus_design_grid">
		    	<div class="opus_design_btn">
		    		<div class="grid_option_left" style="display:none;" id="woBtns" >
						<button type="button" class="btn_normal" name="goWoObj" id="goWoObj" onClick="doWork('WORKORDER')" style="margin-left:9px;cursor:hand"> <bean:message key="WorkOrder"/></button>
					</div>
				</div>
				<script type="text/javascript">comSheetObject('sheet12');</script>
			</div>
		</div>


    </div>
</div>
</form>
<form name="frm2" method="POST" action="./GateServlet.gsl">
    <input type="hidden" name="goWhere" id="goWhere" value="fd"/>
    <input type="hidden" name="bcKey" id="bcKey"   value="blFileDown"/>
    <input type="hidden" name="s_palt_doc_seq" id="s_palt_doc_seq" value=""/>
    <input type="hidden" name="docType" id="docType" value=""/>
</form>
 <script type="text/javascript">
	doBtnAuthority(attr_extension);
</script>	

