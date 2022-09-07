<%--
=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : AIE_BMD_0040.jsp
*@FileTitle  : MAWB등록
*@author     : CLT
*@version    : 1.0
*@since      : 2014/08/13
=========================================================
--%>

<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.util.HashMap"%>
    <%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
    <bean:define id="hblVO"   name="EventResponse" property="objVal"/>
    <bean:define id="valMap"  name="EventResponse" property="mapVal"/>

    <title><bean:message key="system.title"/></title>
    <link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css"/>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CalculationUtil.js?ver=<%=CLT_JS_VER%>"></script>
	<!-- 2016-12-21 자동완성 기능 추가 S -->	
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/autocomplete_ui.js?ver=<%=CLT_JS_VER%>"></script>
	<!-- 2016-12-21  자동완성 기능 추가 E -->
	<script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/COM_FRT_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/apps/fis/see/bmd/housebl/script/BL_FRT.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/apps/fis/see/bmd/housebl/script/BL_CODE_UTIL.js?ver=<%=CLT_JS_VER%>"></script>
    <script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/AIR_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
    <script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/ACC_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
    <script language="javascript" src="<%=CLT_PATH%>/apps/fis/aii/bmd/masterbl/script/AII_BMD_0040.js?ver=<%=CLT_JS_VER%>"></script>
	<script>
	var uod_flg ="<%= userInfo.getUod_flg()%>"
	var usrDept = "<%=userInfo.getDept_cd()%>";
	var usrId = "<%= userInfo.getUsrid() %>";
	var ofc_cd = "<%= userInfo.getOfc_cd() %>";
	var usrNm = "<%= userInfo.getUser_name() %>";
	var AUTOCOMPLETE_YN = 'N';
	//#4092 [Zen] Role Control Option to add "Create or Edit Other Office Data"
	var edob_flg;
	var ref_ofc_cd;
	//OFVFOUR-7862: [ZEN] Add Role "Edit B/L Filing No."
	var eblfn_flg;

	<logic:notEmpty name="valMap" property="autocompleteYn">
    	AUTOCOMPLETE_YN = '<bean:write name="valMap" property="autocompleteYn"/>';
	</logic:notEmpty>
	
		function dispBizBtns(dispTp){
			//Freight버튼
			getObj("sdBtns").style.display    = dispTp;
			getObj("bcBtns").style.display    = dispTp;
			getObj("dcBtns").style.display    = dispTp;

			getBtnObj("finalModiObj").style.display = 'none';
		}
        function btnLoad(){
            
        	// post date 수정 권한
        	//if(user_role_cd=="ADM"){
        	//	frm1.post_dt.className = "search_form";
        	//	frm1.post_dt.readOnly = false;
        		
        		//2012.11.14 요청사항에 의해서 일단 숨김
        		//finalModiObj").style.display = 'inline';
        	//}
        	
			//frm1.ref_no.className = 'search_form';
		    //frm1.ref_no.readOnly  = false;
			frm1.ref_no.className = 'search_form-disable';
		    frm1.ref_no.readOnly  = true;
		    
	     	/* #428 [ZEN] AFTER AR/AP/DC CREATION, FILING # SHOULD BE NOT UPDATED */
	     	/* O04 롤코드가 있으면 수정가능 or 롤코드가 없을땐 인보이스가 없을때 수정가능  (ref_no) */
		    //alert("html = " + frm1.f_modify.value);
		    if(frm1.f_modify.value == 'UPDATE'){
				frm1.ref_no.className = 'search_form';
			    frm1.ref_no.readOnly  = false;		    	
		    }
		    
            if(frm1.bl_sts_cd.value=='NA'){
				///btnAdd").style.display = 'inline'
				getBtnObj("btnAccounting").style.display = 'none';
                //frm1.bl_no.className = 'search_form';
                //frm1.bl_no.readOnly  = false;

                frm1.mrn_no.className = 'search_form';
                frm1.mrn_no.readOnly  = false;
                
                frm1.bl_ser_no.className = 'search_form';
                frm1.bl_ser_no.readOnly  = false;
		
            }else{
            	getBtnObj("btnAccounting").style.display = 'inline';
            	//getBtnObj("btnFileLabel").style.display = 'inline'; 
            	getBtnObj("btnPProfit").style.display  = 'inline';
            	
				//btnAdd").style.display = 'none';
				 if(frm1.bl_sts_cd.value=='MC'){
				    frm1.mrn_no.className = 'search_form';
					frm1.mrn_no.readOnly  = false;
					
					frm1.bl_ser_no.className = 'search_form';
					frm1.bl_ser_no.readOnly  = false;
		
					//frm1.bl_no.className = 'search_form-disable';
					//frm1.bl_no.readOnly  = true;
		
					//printObj").style.display = 'inline';
					//mkHb").style.display = 'inline';
					//btnModify").style.display  = 'inline';
					getBtnObj("btnDelete").style.display   = 'inline';
					getBtnObj("cnfMblObj").style.display= 'none';
			
					//emlSnd").style.display  = 'inline';
//					getObj("fileUp").style.display  = 'inline';    
					getObj("sDoc").style.display  = 'inline';    
					getBtnObj("btnCopy").style.display = 'inline'; 
					getBtnObj("hblObj").style.display = 'inline';   
					getBtnObj("btnAuthority").style.display= 'inline';
					
					dispBizBtns('inline');
					//#27542 [BINEX] B/L Entry 에 Pickup & Delivery Order 연계 기능 추가
					getObj("goWoObj").style.display = 'inline';
// 				}else if(frm1.bl_sts_cd.value=='HO'){
// 					//btnModify").style.display  = 'none';
					
// 					getBtnObj("btnSave").style.display  = 'none';
					
// 					getBtnObj("btnDelete").style.display   = 'none';
// 					getBtnObj("cnfMblObj").style.display= 'none';
			
// 					//emlSnd").style.display  = 'none';
// 					getObj("fileUp").style.display  = 'none';    
// 					getObj("sDoc").style.display  = 'none';    
// 					getBtnObj("btnCopy").style.display = 'inline';
// 					getBtnObj("hblObj").style.display = 'inline';
// 					getBtnObj("btnAuthority").style.display= 'inline';
					
// 					dispBizBtns('none');
// 					//#27542 [BINEX] B/L Entry 에 Pickup & Delivery Order 연계 기능 추가
// 					getObj("goWoObj").style.display = 'inline';
				}else if(frm1.bl_sts_cd.value=='HF'){
					//btnModify").style.display  = 'none';
					getBtnObj("btnSave").style.display  = 'none';
					getBtnObj("btnSaveX").style.display  = 'none';
					
					getBtnObj("btnDelete").style.display   = 'none';
					getBtnObj("cnfMblObj").style.display= 'none';
			
					//emlSnd").style.display  = 'none';
//					getObj("fileUp").style.display  = 'none';    
					getObj("sDoc").style.display  = 'none';    
					getBtnObj("btnCopy").style.display = 'inline';
					getBtnObj("hblObj").style.display = 'none';
					getBtnObj("btnAuthority").style.display= 'inline';
					
					dispBizBtns('none');
					//#27542 [BINEX] B/L Entry 에 Pickup & Delivery Order 연계 기능 추가
					getObj("goWoObj").style.display = 'inline';
					
					// #48835 - [CARGOIS] COPY 한 HBL 의 이상한 현상
		            // Block 된 B/L일 경우 Filing No 수정 못하도록 수정
		           	frm1.ref_no.className = 'search_form-disable';
		            frm1.ref_no.readOnly  = true;
				}else{
					getBtnObj("hblObj").style.display = 'none';
					getBtnObj("btnCopy").style.display = 'none';
//					getObj("fileUp").style.display  = 'none';
					getObj("sDoc").style.display  = 'none';
					getBtnObj("cnfMblObj").style.display= 'none';
				}
			}
			//OFVFOUR-7862: [ZEN] Add Role "Edit B/L Filing No."
			if (eblfn_flg != 'Y') {
				frm1.ref_no.disabled = true;
			}
            fnbtnCtl();

        }

        <!-- ###Office Info## -->
        <% boolean isBegin = false; %>
        <bean:define id="officeInfo" name="valMap" property="officeInfo"/>
        <bean:define id="ofcVO" name="officeInfo"/>
        var v_ofc_cd = "<bean:write name="ofcVO" property="ofc_cd"/>";
        var oth_size_ut_cd = "<bean:write name="ofcVO" property="oth_size_ut_cd"/>";
        var air_body = "<bean:write name="ofcVO" property="air_body"/>";
        var ofc_post_dt = "<bean:write name="ofcVO" property="post_dt_imp"/>";
        var ofc_curr_cd = "<bean:write name="ofcVO" property="trf_cur_cd"/>";
        var ofc_locl_curr_cd = "<bean:write name="ofcVO" property="locl_curr_cd"/>"; //#138 Local Currency 
        var departure_dt = "<bean:message key='Departure_Date'/>";

        var user_ofc_cnt_cd = "<%=userInfo.getOfc_cnt_cd()%>";

        <!-- ###Freight 항목### -->
		//#3411 [JTC]Accounting & Performance 수정사항
		//Unit Code Blank 삭제
		var UNITCD1 = '';
		var UNITCD2 = '';
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
			   ARFRTCD1+= '<bean:write name="FrtCdVO" property="frt_cd" filter="true"/>';
			   ARFRTCD2+= '<bean:write name="FrtCdVO" property="frt_cd" filter="true"/>' + ": " + '<bean:write name="FrtCdVO" property="frt_cd_nm" filter="true"/>';
		</logic:iterate>
        
        <!-- ###FRT_CD LIST 항목 AP### -->
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
			   APFRTCD1+= '<bean:write name="FrtCdVO" property="frt_cd" filter="true"/>';
			   APFRTCD2+= '<bean:write name="FrtCdVO" property="frt_cd" filter="true"/>' + ": " + '<bean:write name="FrtCdVO" property="frt_cd_nm" filter="true"/>';
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
			   DCFRTCD1+= '<bean:write name="FrtCdVO" property="frt_cd" filter="true"/>';
			   DCFRTCD2+= '<bean:write name="FrtCdVO" property="frt_cd" filter="true"/>' + ": " + '<bean:write name="FrtCdVO" property="frt_cd_nm" filter="true"/>';
		</logic:iterate>

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
    	
		<!-- Currency 조회 -->
		<%  String ofc_curr     = "";
		    String partner_curr = "";
		%>
        <logic:notEmpty name="valMap" property="OfcCurrency">
            <bean:define id="curMap" name="valMap" property="OfcCurrency"/>
            <%  HashMap tmpMap = (HashMap)curMap;
                ofc_curr     = (String)tmpMap.get("ofccurr_cd");
                partner_curr = (String)tmpMap.get("tocurr_cd");
            %>
        </logic:notEmpty>

        var user_role_cd = "<%=userInfo.getRole_cd()%>";
        var MULTI_CURR_FLAG = "<%="Y".equals((String)application.getAttribute("MULTI_CURR_FLAG")) ? "Y" : "N" %>";	//[20141125 OJG] - Multi Currency 사용 여부
        
		//#512 [BNX] VND(베트남) - USD 환율 차로 인한 환율 계산 오류
		var vat_rt_dp_cnt = Number("<bean:write name="ofcVO" property="vat_rt_dp_cnt"/>");
		var xch_rt_dp_cnt = Number("<bean:write name="ofcVO" property="xch_rt_dp_cnt"/>");

		function fnbtnCtl(){
			var attr_extension = "<%= roleBtnVO.getAttr_extension() %>";

			// 51974 [BNX, ZEN] Invoice Create/Edit 권한 추가, Other Office View/Edit 권한 추가
			//권한이 있는 경우(Check) 현재 있는 Role 권한이 그대로 처리되도록 함
			//권한이 없는 경우(unCheck) 된 경우 User 의 Office 와 동일한 DATA가 아닌 경우 Save 버튼을 Hidden 시킨다.
			var formObj=document.frm1;
			//#4092 [Zen] Role Control Option to add "Create or Edit Other Office Data"
			edob_flg 		= "<%=userInfo.getEdob_flg()%>"; //ENABLE EDITING OTHER OFFICE (B/L)
			//OFVFOUR-7862: [ZEN] Add Role "Edit B/L Filing No."
			eblfn_flg = "<%=userInfo.getEblfn_flg()%>";
			ofc_cd 		= "<%=userInfo.getOfc_cd()%>";  
			var ref_ofc_cd =  formObj.h_ref_ofc_cd.value;
			//alert(edob_flg + " "+ofc_cd+" "+ref_ofc_cd);
			var btnflag = "Y";
			if (edob_flg == "N"){
				if (ofc_cd != ref_ofc_cd){  
					btnflag = "N";
				}
			}  
			if (ref_ofc_cd == "") {  btnflag = "Y"; }
			if (btnflag == "Y"){
				//기존유지
				//$("#btnSave").show();
				//$("#closeModiObj").show();
				//$("#btnDelete").show(); 
			}else{
				$("#btnSave").hide();
				$("#btnSaveX").hide();
				//$("#closeModiObj").hide();
				$("#btnDelete").hide(); 
			}
 

			doBtnAuthority(attr_extension);  
		}
        
		//#3779 [CLT] v4.7.0 entry화면 new 버튼 클릭 시 tab 제목
        var pageName = "<%=LEV3_NM%>";
   </script>
<script type="text/javascript">
<!--
function setupPage() {
	setOfficeData();
	loadPage();
	btnLoad();
	doHideProcess();
	doWork('SEARCHLIST01');
	loadData();

	//2016.04.21 C.W.Park Added
	//#52109 버튼 로딩 후 ofc별 blck_dt 셋업
	//setBlock_dt();
}
//-->
</script>
<form name="frm1" method="POST" action="./AII_BMD_0040.clt" class="filter">
    <input type="hidden" name="f_cmd">
    <html:hidden name="hblVO"  property="bl_sts_cd"/>   
    <html:hidden name="hblVO"  property="intg_bl_seq"/>
    <html:hidden name="hblVO"  property="sr_no"/>
    <html:hidden name="valMap" property="f_intg_bl_seq"/>
    <input type="hidden" name="mk_bl_no" value="<bean:write name="hblVO" property="bl_no"/>">
    <input type="hidden" name="h_bl_no" value="<bean:write name="hblVO" property="bl_no"/>">
    <!-- Report Value -->    
    <input type="hidden" name="file_name">
	<input type="hidden" name="title">
	<input type="hidden" name="rd_param">
	<input type="hidden" name="user_id"  value="<%=userInfo.getUsrid()%>" />
    
    <!-- check freight -->
    <input type="hidden" name="chk_fr_trdp_cd"      value="">  
    <input type="hidden" name="chk_fr_trdp_nm"      value=""> 
    <input type="hidden" name="chk_fr_inv_curr_cd"  value=""> 
    
   	<!-- #47413 [IMPEX]B/L COPY 기능보완  --> 
	<input type="hidden" name="copy_bl_seq" 	value='<bean:write name="valMap" property="org_bl_seq"></bean:write>'/>
    
    <!-- 조회된 Ref_no , ref 번호 변경시 비교를 위해서 -->
    <input type="hidden" name="sel_ref_no"  value='<bean:write name="hblVO" property="ref_no"/>'>
    
    <!-- 업데이트 시에 변경된 값과 비교해 보기 위해서 -->
    <input type="hidden" name="org_post_dt"  value='<wrt:write name="hblVO" property="post_dt" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy"/>'> 
    
     <!-- 업데이트 시에 변경된 값과 비교해 보기 위해서 Block page에서 post_dt 변경후 화면에서 아래 값들을 변경 체크 위해 유지 -->     
    <input type="hidden" name="org_etd_dt_tm"  id="org_etd_dt_tm" value='<wrt:write name="hblVO" property="etd_dt_tm" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy"/>'>
    <input type="hidden" name="org_eta_dt_tm"  id="org_eta_dt_tm" value='<wrt:write name="hblVO" property="eta_dt_tm" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy"/>'>
    <input type="hidden" name="org_f_eta_dt_tm"  id="org_f_eta_dt_tm" value='<wrt:write name="hblVO" property="f_eta_dt_tm" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy"/>'>
        <!-- #52320 [COMMON] Transaction 변경처리시 Block Date 까지 Check 하도록 수정  --> 
    <input type="hidden" name="trx_modi_tms" value="" id="trx_modi_tms" />
    
    <!--  jsjang 2013.8.29 #17604 : [BINEX] 1. Tab에 Save한 다음 Current Screen 에서 Refresh. -->
    <input type="hidden" name="f_isNumSep" 	value='<bean:write name="valMap" property="f_isNumSep"/>'> 
    
    <!--#428 [ZEN] AFTER AR/AP/DC CREATION, FILING # SHOULD BE NOT UPDATED  -->
    <input type="hidden" name="f_modify"   id="f_modify"   value="<bean:write name="valMap" property="f_modify"/>">
    
    <!--#6669 [Zencon] OPUS UPLOADED DOCUMENT SHOWS REGARDLESS OF MODULE  -->
	<input type="hidden" name="f_palt_mnu_cd"   id="f_palt_mnu_cd"   value="AIM">
        
    <!-- Button -->
	<div class="page_title_area clear">
	   <h2 class="page_title" id='bigtitle'><button type="button"><%=LEV3_NM%></button></h2>
	   <!-- btn_div -->
	   <div class="opus_design_btn TOP">
		   <%-- 
		   <span style="display:none;" btnAuth="FINAL"><button type="button" class="btn_accent" style="display:none;" onclick="doWork('FINAL_MODIFY')" id="finalModiObj"><bean:message key="Final"/></button></span>
		   <span btnAuth="<%= roleBtnVO.getAttr1() %>" style="display:none;" onclick="doWork('SEARCHLIST')"><button type="button" class="btn_accent"><bean:message key="Search"/></button></span>
		   <span onClick="doWork('NEW')" style="display:none;" btnAuth="<%= roleBtnVO.getAttr2() %>"><button type="button" class="btn_normal"><bean:message key="New"/></button></span>
		   <span style="display:none;" btnAuth="<%= roleBtnVO.getAttr3() %>"><button type="button" class="btn_normal" onclick="doWork('SAVE')" id="btnSave" style="display:inline;"><bean:message key="Save"/></button></span>
		   <button type="button" id="btnSaveX" class="btn_normal"  style="display:none;" btnAuth="<%= roleBtnVO.getAttr3() %>" onclick="saveCloseBtnClick()"><bean:message key="Save_X"/></button>
		   <span style="display:none;" btnAuth="MBL_CONFIRM"><button type="button" class="btn_normal" onclick="doWork('MBLCNF')" id="cnfMblObj" style="display:none"><bean:message key="MBL_Confirm"/></button></span>
		   <span style="display:none;" btnAuth="COPY"><button type="button" class="btn_normal" onclick="doWork('COPY')" id="btnCopy" style="display:none"><bean:message key="Copy"/></button></span>
		   <span style="display:none;" btnAuth="ACCOUNTING""><button style="display:none;" type="button" class="btn_normal" onclick="doWork('GOTOACCT')" id="btnAccounting"><bean:message key="Accounting"/></button></span>
		   <span style="display:none;" btnAuth="<%= roleBtnVO.getAttr5() %>"><button type="button" class="btn_normal" onClick="doWork('AUTHORITY')" id="btnAuthority" style="display:none"><bean:message key="B.Authority"/></button></span>
		   <span style="display:none;" btnAuth="P_REPORT"><button type="button"class="btn_normal" onclick="doWork('PROFIT_REPORT')" id="btnPProfit" style="display:none;"><bean:message key="P_Report"/></button></span>
		   <span style="display:none;" btnAuth="M_F"><button type="button" class="btn_normal" onclick="doWork('MFPRINT')" id="printObj"><bean:message key="M_F"/></button></span>
		   <span style="display:none;" btnAuth="<%= roleBtnVO.getAttr4() %>"><button type="button" class="btn_normal" onclick="doWork('REMOVE')" id="btnDelete" style="display:none"><bean:message key="Delete"/></button></span>
		   <span style="display:none;" btnAuth="HAWB_CREATE"><button type="button" class="btn_normal" onclick="doWork('HBL_ENTRY')" id="hblObj" style="display:none;"><bean:message key="HAWB_Create"/></button></span>
		   <span style="display: none;" btnAuth="FILE_LABEL"><button style="display:none;" type="button" class="btn_normal" onclick="doWork('FILE_LABEL')" name="btnFileLabel" id="btnFileLabel" ><bean:message key="FILE_LABEL"/></button></span>
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
	
	<!-- Search option -->
<div class="over_wrap" height="100%">
    <div class="wrap_search_tab">	
		<div class="opus_design_inquiry ">
			<table>
				<colgroup>
					<col width="50px"></col>
					<col width="180px"></col>
					<col width="70px"></col>
					<col width="180px"></col>
					<col width="*"></col>
				</colgroup>
				<tbody>
					<tr>
                    	<th><bean:message key="Ref_No"/></th>
                        <td><!--
                        --><input name="f_ref_no" maxlength="20" value="<bean:write name="valMap" property="f_ref_no"/>" type="text"  dataformat="excepthan" style="width:130;" style="ime-mode:disabled;width:115;text-transform:uppercase;" onblur="strToUpper(this)" onKeyDown="entSearch()"><!--
                        --><button type="button" class="input_seach_btn" tabindex="-1" onClick="srAirOpenPopUp('REF_POPLIST2', this, 'A', 'I')"></button></td>
                        <th><bean:message key="MAWB_No"/></th>
                        <td><!--
                        --><input name="f_bl_no"  maxlength="40" value="<bean:write name="valMap" property="f_bl_no"/>" type="text"  dataformat="excepthan" style="ime-mode:disabled;width:150;text-transform:uppercase;" onblur="strToUpper(this)" onKeyDown="entSearch()"><!--
                        --><button type="button" class="input_seach_btn" tabindex="-1" onClick="openAiiMasterPopUp('MBL_POPLIST',this)"></button></td>
                        <td>&nbsp;</td>
                    </tr>
				</tbody>
			</table>
		</div>
	</div>
    
    <div class="wrap_result_tab">
   		<div class="opus_design_grid" style="display: none;">
    		<script language="javascript">comSheetObject('sheet1');</script>
    	</div>
	    <ul id="ulTab" class="opus_design_tab">
	        <li class="nowTab"><a href="#" id=Tab01 style="cursor:hand;" onClick="javascript:goTabSelect('01');"><span><bean:message key="Master_AWB_Entry"/></span></a></li>
	        <li><a href="#" id=Tab02 style="cursor:hand;" onClick="javascript:goTabSelect('02');"><span><bean:message key="Mark_Desc"/></span></a></li>
	        <!-- OFVFINS-398: [HESED INTERNATIONAL] NEW CUSTOMER SETUP (AWS3) -->
	        <li <%=userInfo.getUse_bl_freight_tab().equals("N")?"style=\"display:none\"":"" %>><a href="#" id=Tab03 style="cursor:hand;" onClick="javascript:goTabSelect('03');"><span><bean:message key="Freight"/></span></a></li>
	        <li><a href="#" id=Tab04 style="cursor:hand;" onClick="javascript:goTabSelect('04');"><span><bean:message key="Work_Order"/></span></a></li>
	        <li><a href="#" id=Tab05 style="cursor:hand;" onClick="javascript:goTabSelect('05');"><span><bean:message key="Shipping_Document"/></span></a></li>
	        <li><a href="#" id=Tab06 style="cursor:hand;" onClick="javascript:goTabSelect('06');"><span><bean:message key="Status"/></span></a></li>
	    </ul>
	 
	 <div id="tabLayer" name="tabLayer"style="display:inline;">
			<div class="opus_design_inquiry">
				<table>
	 				<colgroup>
	 					<col width="60">
	 					<col width="200">
	 					<col width="70">
	 					<col width="140">
	 					<col width="100">
	 					<col width="130">
	 					<col width="50">
	 					<col width="120">
	 					<col width="*">
	 				</colgroup>
	 				<tbody>
					<tr>
						<th><bean:message key="Ref_No"/></th>
                              <td><!--
                              --><input type="text" name="ref_no" maxlength="20" value='<bean:write name="hblVO" property="ref_no"/>' dataformat="excepthan" otherchar = "<%=FWD_OTHER_CHAR%>" style="ime-mode:disabled;width:122px;text-transform:uppercase;" onblur="strToUpper(this)" onclick="if(frm1.ref_no.value=='AUTO'){frm1.ref_no.value=''}"><!--
                              --><bean:define id="ofcList" name="valMap" property="ofcList"/><!--
                              --><html:select name="hblVO" property="ref_ofc_cd" styleClass="search_form" style="width:55px;" onchange="ofcChDEta();setBlock_dt(true);"><!--
                              --><html:options collection="ofcList" property="ofc_cd" labelProperty="ofc_cd"/><!--
                              --></html:select><!--
                              --><input type="hidden" name="h_ref_ofc_cd" value="<bean:write name="hblVO" property="ref_ofc_cd"/>"><!--
                              --><input type="hidden" name="h_post_dt_imp" value="<bean:write name="hblVO" property="i_post_dt_imp"/>"></td>
						<th><bean:message key="MAWB"/></th>
						<td><input type="text" name="bl_no" value='<bean:write name="hblVO" property="bl_no"/>' onKeyDown="setCarrierCd(this)" dataformat="excepthan" otherchar = "<%=FWD_OTHER_CHAR%>" style="ime-mode:disabled;width:120px;text-transform:uppercase;" onblur="strToUpper(this);setCarrierCd(this);" maxlength="40"></td>
						
						<th><bean:message key="MRN"/></th>
						<td><input type="text" name="mrn_no"  maxlength="20"   value="<bean:write name="hblVO" property="mrn_no"/>" class="search_form-disable" dataformat="excepthan" style="ime-mode:disabled;width:120px;text-transform:uppercase;" onblur="strToUpper(this)" readonly></td>
						
						<th><bean:message key="MSN"/></th>
						<td><input type="text" name="bl_ser_no" maxlength="20" value="<bean:write name="hblVO" property="bl_ser_no"/>" class="search_form-disable" dataformat="excepthan" style="ime-mode:disabled;width:120;text-transform:uppercase;" onblur="strToUpper(this)" readonly></td>
						<td></td>
					</tr>
					<tr>
						<th><bean:message key="BL_Type"/></th>
						<td><!--
                              --><bean:define id="blTypeList" name="valMap" property="blTypeList"/><!--
                              --><html:select name="hblVO" property="hbl_tp_cd" styleClass="search_form" style="width=130px;" onchange="fnSalesChange()"> <!-- #1948 [C&L, CBM] SALES PIC ASSIGNMENT ON MASTER B/L
                              --><html:options collection="blTypeList" property="cd_val" labelProperty="cd_nm"/><!--
                              --></html:select></td>
						<th><bean:message key="Post_Date"/></th>
                              <td><input type="text" name="post_dt" value='<wrt:write name="hblVO" property="post_dt" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy"/>' onKeyUp="mkDateFormatType(this, event, false, 1)" onBlur="mkDateFormatType(this, event, true, 1)" size='11' maxlength="10" class="search_form-disable" style="width:120px;" readonly></td>
                              <th><bean:message key="Agent_Reference_No"/></th>
                              <td><input type="text" name="imp_ref_no" value="<bean:write name="hblVO" property="imp_ref_no"/>" dataformat="excepthan" style="ime-mode:disabled;width:120px;text-transform:uppercase;" onblur="strToUpper(this)" maxlength="40"></td>
					</tr>
					</tbody>
				</table>
				</div>
				<div class="layout_wrap">
			 	<div class="layout_vertical_3 sm"  style="height:560px;">
			 		<div class="opus_design_inquiry" >
						<table>
							<colgroup>
								<col width="60px"></col>
								<col width="*"></col>
							</colgroup>
							<tbody>
								<tr>
									<td colspan="2"><h3 class="title_design" style="margin-bottom:0;"><bean:message key="Customer"/></h3></td>
								</tr>
								<tr>
									<th><a href="javascript:clearBlPrnr('S01');"><bean:message key="Shipper"/></a></th>
									<td nowrap class="table_search_body"><!--
									--><input type="text"   name="shpr_trdp_cd" maxlength="20" value='<bean:write name="hblVO" property="shpr_trdp_cd"/>'   onKeyDown="codeNameAction('trdpCode_shipper',this, 'onKeyDown')" onBlur="strToUpper(this);codeNameAction('trdpCode_shipper',this, 'onBlur')" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:48px;"><!--
									--><button type="button" width="50px" class="input_seach_btn" tabindex="-1" id="shipper" onclick="openAiiMasterPopUp('LINER_POPLIST',this)"></button><!--
									--><input type="text"   name="shpr_trdp_nm" value='<bean:write name="hblVO" property="shpr_trdp_nm"/>'  onblur="strToUpper(this);checkTrdpCode(this);"   dataformat="excepthan" style="ime-mode:disabled;width:calc(100% - 131px);text-transform:uppercase;" maxlength="50" onKeyPress="if(event.keyCode==13){openAiiMasterPopUp('LINER_POPLIST', document.getElementById('shipper'), frm1.shpr_trdp_nm.value);}"><!--
									--><span id="shipper" style="cursor:hand" onClick="openAiiMasterPopUp('PIC_POP', this)"><button type="button" class="btn_etc"><bean:message key="PIC"/></button></span></td>
								</tr>
								<tr>
									<td colspan="2"><textarea name="shpr_trdp_addr" class="search_form autoenter_50" maxlength="400" dataformat="excepthan" style="width:100%;height:80px;" onblur="strToUpper(this);chkCmpAddr(this, 'Shipper Address')" WRAP="off">
<bean:write name="hblVO" property="shpr_trdp_addr" filter="true"/></textarea></td>
								</tr>
								<tr>
									<th><a href="javascript:clearBlPrnr('C01');"><bean:message key="Consignee"/></a></th>
									<td><!--
									--><input type="hidden" name="cnee_trdp_cd"  value='<bean:write name="hblVO" property="cnee_trdp_cd"/>'  onKeyDown="codeNameAction('trdpCode_consignee',this, 'onKeyDown')" onBlur="codeNameAction('trdpCode_consignee',this, 'onBlur');"  dataformat="excepthan" style="ime-mode:disabled;width:48px;"><!--
									--><input type="text"   name="cnee_trdp_nm"  value='<bean:write name="hblVO" property="cnee_trdp_nm"/>'  onblur="strToUpper(this);checkTrdpCode(this);"    dataformat="excepthan" style="ime-mode:disabled;width:calc(100% - 30px);text-transform:uppercase;" maxlength="50" onKeyPress="if(event.keyCode==13){openAiiMasterPopUp('LINER_POPLIST', document.getElementById('consignee'), frm1.cnee_trdp_nm.value);}"><!--
									--><button type="button" class="input_seach_btn" tabindex="-1" id="consignee" onclick="openAiiMasterPopUp('LINER_POPLIST',this)"></button></td>
								</tr>
								<tr>
									<td colspan="2">
										<textarea name="cnee_trdp_addr" class="search_form autoenter_50" maxlength="400" dataformat="excepthan" style="width:100%;height:80px;" onblur="strToUpper(this);chkCmpAddr(this, 'Consignee Address')" WRAP="off">
<bean:write name="hblVO" property="cnee_trdp_addr" filter="true"/></textarea>
									</td>
								</tr>
								<tr>
		                            <th><bean:message key="Manifest_To"/></th>
		                            <td><input type="text" name="manifest_to" maxlength="50"  value='<bean:write name="hblVO" property="manifest_to"/>'  dataformat="excepthan" style="ime-mode:disabled;width:100%;text-transform:uppercase;" onblur="strToUpper(this)"></td>
		                        </tr>
		                        <tr>
		                            <th><a href="javascript:clearBlPrnr('A01');"><bean:message key="Forwarding_Agent"/></a></th>
		                            <td>
		                                <input type="hidden" name="agent_trdp_cd"  value='<bean:write name="hblVO" property="agent_trdp_cd"/>'  class="search_form" onKeyDown="codeNameAction('trdpCode_agent',this, 'onKeyDown')" onBlur="codeNameAction('trdpCode_agent',this, 'onBlur');javascript:this.value=this.value.toUpperCase();" dataformat="excepthan" style="ime-mode:disabled;resize:none; text-transform:uppercase;width:48px;"><!-- 
		                             --><input type="text"   name="agent_trdp_nm"  value='<bean:write name="hblVO" property="agent_trdp_nm"/>'  class="search_form" dataformat="excepthan" style="ime-mode:disabled;resize:none;width:calc(100% - 30px);text-transform:uppercase;" onblur="strToUpper(this);checkTrdpCode(this);" maxlength="50" onKeyPress="if(event.keyCode==13){openAieMasterPopUp('LINER_POPLIST', document.getElementById('agent'), frm1.agent_trdp_nm.value);}"><!-- 
		                             --><button type="button" name="agent" id="agent" class="input_seach_btn" tabindex="-1" onClick="openAieMasterPopUp('LINER_POPLIST',this)"></button>
		                            </td>
		                        </tr>
		                        <tr>
		                        	<td colspan="2">
		                        		<textarea name="agent_trdp_addr" class="search_form autoenter_50px" dataformat="excepthan" style="ime-mode:disabled;resize:none;resize:none;width:100%;height:80px;text-transform:uppercase;overflow:hidden;font-family:TAHOMA;" onblur="strToUpper(this);chkCmpAddr(this, 'Agent Address')" WRAP="off"><bean:write name="hblVO" property="agent_trdp_addr" filter="true"/></textarea>
		                            </td>
		                        </tr>
		                    </table>
		                   </div>
		                    <div class="opus_design_inquiry" >
			    	<h3 class="title_design"><bean:message key="Contribution"/></h3>	
				    	<table>
				    		<colgroup>
				    			<col width="137px" />
				    			<col width="90px" />
				    			<col width="100px" />
				    			<col width="*" />
				    		</colgroup>
				    		<tbody>
								<tr>
									<th><bean:message key="Contrib_Office"/></th>
		                             <td>
		                                 <input type="text"   name="ctrb_ofc_cd" value='<bean:write name="hblVO" property="ctrb_ofc_cd"/>' class="search_form" onKeyDown="codeNameAction('officeCd_ctrbOfc',this, 'onKeyDown')" onBlur="strToUpper(this);codeNameAction('officeCd_ctrbOfc',this, 'onBlur')" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:70px;"><!-- 
		                                    --><button type="button" name="ctrbOfc" id="ctrbOfc" class="input_seach_btn" tabindex="-1" onClick="openSeiPopUp('OFFICE_GRID_POPLIST',this)"></button>
		                             </td>
									<th><bean:message key="Use_Ratio"/></th>
									<td>
										<input type="checkBox" name="ctrb_ratio_yn" id="ctrb_ratio_yn" value="<bean:write name="hblVO" property="ctrb_ratio_yn"/>" onclick="flgChange(this);frm1.ctrb_mgn.value = '';">
										<input type="text" name="ctrb_mgn" value="<bean:write name="hblVO" property="ctrb_mgn"/>" onkeyPress="onlyNumberCheck('.');" onchange="numberCommaLen(this,20,2);chkComma(this,20,2);" onBlur="checkRatioValid();" maxlength="23" class="search_form zero_remove" dataformat="excepthan" style="ime-mode:disabled;width:85px;text-align:right;">
									</td>
				    			</tr>
				    			<tr>
				    				<th><bean:message key="Contrib_Dept"/></th>
									<td>
										<bean:define id="ctrbDeptList" name="valMap" property="ctrbDeptList"/>
		                                <html:select name="hblVO" property="ctrb_dept_cd" styleClass="search_form" style="width:100px;">
		                                    <option value=""></option>
		                                    <html:options collection="ctrbDeptList" property="cd_val" labelProperty="cd_nm"/>
		                                </html:select>
									</td>
								</tr>
				    		</tbody>
				    	</table>
				    </div>
		                   </div>
		            	<div class="layout_vertical_3 sm mar_left_8" style="height:560px;">
		            		<div class="opus_design_inquiry" >
		                 	<table>
							<colgroup>
								<col width="93px"></col>
								<col width="100px"></col>
								<col width="93px"></col>
								<col width="150px"></col>
								<col width="*"></col>
							</colgroup>
							<tbody>
								<tr>
									<td><h3 class="title_design" style="margin-bottom:0;"><bean:message key="Flight_Info"/></h3></td>
								</tr>
								
								<tr>
		                            <th><bean:message key="Airline"/></th>
		                            <td colspan="3"><!--
		                            --><input type="text" required  name="lnr_trdp_cd" maxlength="20" value='<bean:write name="hblVO" property="lnr_trdp_cd"/>' onKeyDown="codeNameAction('trdpCode_imp_air_carr',this, 'onKeyDown')" onBlur="strToUpper(this);codeNameAction('trdpCode_imp_air_carr',this, 'onBlur')"  dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:90px;"><!--
		                            --><button type="button" class="input_seach_btn" tabindex="-1" id="liner" onClick="openAiiMasterPopUp('LINER_POPLIST_M',this)"></button><!--
		                            --><input type="text" required  name="lnr_trdp_nm" maxlength="50" value='<bean:write name="hblVO" property="lnr_trdp_nm"/>' onblur="strToUpper(this)"  dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:140px;" onKeyPress="if(event.keyCode==13){openAiiMasterPopUp('LINER_POPLIST_M', document.getElementById('liner'), frm1.lnr_trdp_nm.value);}"><!--
		                            --><input type="hidden" name="obrd_dt_tm"  value='<wrt:write name="hblVO" property="obrd_dt_tm" formatType="DATE" fromFormat="yyyyMMdd" format="yyyy-MM-dd"/>'  onKeyUp="mkDateFormat(this,event,false)" onBlur="mkDateFormat(this, event, true)" dataformat="excepthan" style="ime-mode:disabled;width:70px;"></td>
		                            <td></td>
		                        </tr>
		                        <tr>
		                            <th><bean:message key="Flight_No"/></th>
		                            <td><input type="text" name="flt_no"      value='<bean:write name="hblVO" property="flt_no"/>'   onblur="strToUpper(this)"   dataformat="excepthan" style="ime-mode:disabled;width:90px;text-transform:uppercase;" maxlength="20"></td>
		                            <td colspan="3"></td>
		                        </tr>
		                        
		                        <tr>
		                            <th><span id="flight_dt_word"><bean:message key="Flight_Date"/></span></th>
		                            <td style="text-align: left"><!--
		                            --><input type="text" name="etd_dt_tm" value='<wrt:write name="hblVO" property="etd_dt_tm" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy"/>' onKeyUp="mkDateFormatType(this, event, false,1)" onBlur="mkDateFormatType(this, event, true,1);dateRangeValid(this, 'Departure Date');" style="width:90px" maxlength="10" ><!--
		                            --><button type="button" id="etd_dt_tm_cal" onclick="doDisplay('DATE1' ,frm1.etd_dt_tm);" class="calendar" tabindex="-1"></button></td>
		                            <th>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<bean:message key="Time"/></th>
		                            <td><!--
		                            	--><input type="text" name="etd_tm"    value='<wrt:write name="hblVO" property="etd_tm" formatType="DATE" fromFormat="HHmm" format="HH:mm"/>' maxlength="4"  dataformat="num" style="ime-mode:disabled;width:44px;" onchange="timeCheck(this);" onkeypress="onlyNumberCheck();"></td>
		                            <td></td>
		                        </tr>
		                        
		                        <tr>
									<th><bean:message key="ETA_of_FPOE"/></th>
									<td><!--
		                            --><input type="text" name="eta_fpoe_tm" value='<wrt:write name="hblVO" property="eta_fpoe_tm" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy"/>' onKeyUp="mkDateFormatType(this, event, false, 1)" onBlur="mkDateFormatType(this, event, true, 1);dateRangeValid(this, 'ETA of FPOE');"  dataformat="excepthan" style="ime-mode:disabled;width:90px;" size='11' maxlength="10"><!--
		                            --><button type="button" id="eta_fpoe_tm_cal" onclick="doDisplay('DATE1', frm1.eta_fpoe_tm);" class="calendar" tabindex="-1"></button></td>
		                            <th><bean:message key="Time"/></th>
									<td><!--
										--><input type="text" name="fpoe_tm"    value='<wrt:write name="hblVO" property="fpoe_tm" formatType="DATE" fromFormat="HHmm" format="HH:mm"/>' maxlength="4"  dataformat="num" style="ime-mode:disabled;width:44px;" onchange="timeCheck(this);" onkeypress="onlyNumberCheck();">
									</td>
									<td></td>
								</tr>						                                                
								<tr>
									<th><bean:message key="Arrival_Date"/></th>
		                            <td><!--
		                            --><input type="text" required name="eta_dt_tm" value='<wrt:write name="hblVO" property="eta_dt_tm" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy"/>' onKeyUp="mkDateFormatType(this, event, false,1)" onBlur="mkDateFormatType(this, event, true,1);dateRangeValid(this, 'Arrival Date');txtAtChange(this, frm1.f_eta_dt_tm)" style="width:90px" maxlength="10" ><!--
		                            --><button type="button" id="eta_dt_tm_cal" onclick="doDisplay('DATE1' ,frm1.eta_dt_tm);" class="calendar" tabindex="-1"></button></td>
		                            <th><bean:message key="Time"/></th>
		                            <td><!-- 
		                            	--><input type="text" name="eta_tm"   value='<wrt:write name="hblVO" property="eta_tm" formatType="DATE" fromFormat="HHmm" format="HH:mm"/>' maxlength="4"   dataformat="num" style="ime-mode:disabled;width:44px;" onchange="timeCheck(this);" onkeypress="onlyNumberCheck();"></td>
		                            <td></td>
		                        </tr>
		                                          
		                        <tr>
									<!-- <th><div id="st_hear_r"><bean:message key="F_ETA"/></div><div id="st_hear"><bean:message key="F_ETA"/></div></th> -->
									<th><bean:message key="F_ETA"/></th>
								
									<td><!--
		                            --><input type="text" name="f_eta_dt_tm" value='<wrt:write name="hblVO" property="f_eta_dt_tm" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy"/>' onKeyUp="mkDateFormatType(this, event, false, 1)" onBlur="mkDateFormatType(this, event, true, 1);dateRangeValid(this, 'Delivery ETA');"  dataformat="excepthan" style="ime-mode:disabled;width:90px;" size='11' maxlength="10"><!--
		                            --><button type="button" id="f_eta_dt_tm_cal" onclick="doDisplay('DATE1', frm1.f_eta_dt_tm);" class="calendar" tabindex="-1"></button></td>
		                            <th><bean:message key="Time"/></th>
									<td><!--
										 --><input type="text" name="f_eta_tm"    value='<wrt:write name="hblVO" property="f_eta_tm" formatType="DATE" fromFormat="HHmm" format="HH:mm"/>' maxlength="4"  dataformat="num" style="ime-mode:disabled;width:44px;" onchange="timeCheck(this);" onkeypress="onlyNumberCheck();"></td>
									<td></td>
								</tr>
		                        
		                        <tr>
									<th><bean:message key="Billing_Carrier"/></th>
									<td colspan="3"><!--
		                            --><input type="text"   name="carr_trdp_cd" value='<bean:write name="hblVO" property="carr_trdp_cd"/>' onKeyDown="codeNameAction('trdpCode_carr',this, 'onKeyDown');"  onblur="strToUpper(this); codeNameAction('trdpCode_carr',this, 'onKeyDown');"  dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:90px;" maxlength="20;" onKeyPress="ComKeyOnlyAlphabet('uppernum');"><!--
		                            --><button type="button" class="input_seach_btn" tabindex="-1" id="carr"  onClick="openAiiMasterPopUp('LINER_POPLIST',this)"></button><!--
		                            --><input type="text"   name="carr_trdp_nm" value='<bean:write name="hblVO" property="carr_trdp_nm"/>' onblur="strToUpper(this)"  dataformat="multiLanguage" style="ime-mode:disabled; text-transform:uppercase;width:140px;" onKeyPress="if(event.keyCode==13){openAiiMasterPopUp('LINER_POPLIST', document.getElementById('carr'), frm1.carr_trdp_nm.value);}" maxlength="50"><!--
		                            --><input type="hidden" name="carr_trdp_addr" value='<bean:write name="hblVO" property="carr_trdp_addr"/>'>
									</td>
									<td></td>
								</tr>
								
								<tr>
									<td><h3 class="title_design mar_top_8" style="margin-bottom:0;"><bean:message key="Route"/></h3></td>
								</tr>
								
								<tr>
									<th><bean:message key="Departure"/></th>
									<td colspan="3"><!--
		                            --><input type="text" required  name="pol_cd" maxlength="5" value='<bean:write name="hblVO" property="pol_cd"/>' onKeyDown="codeNameAction('Location_pol',this, 'onKeyDown','A')" onBlur="strToUpper(this);codeNameAction('Location_pol',this, 'onBlur','A')" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:90px;" ><!--
		                            --><button type="button" class="input_seach_btn" tabindex="-1" id=pol  onClick="openAiiMasterPopUp('LOCATION_POPLIST',this)"></button><!--
		                            --><input type="text" required  name="pol_nm"  maxlength="50"   value='<bean:write name="hblVO" property="pol_nm"/>'  dataformat="excepthan" style="ime-mode:disabled;width:140px;text-transform:uppercase;" onblur="strToUpper(this)" onKeyPress="if(event.keyCode==13){openAiiMasterPopUp('LOCATION_POPLIST', document.getElementById('pol'), frm1.pol_nm.value);}"><!--
		                            --><input type="hidden" name="pol_nod_cd"     value='<bean:write name="hblVO" property="pol_nod_cd"/>' ></td>
		                            <td></td>
								</tr>
		                        <tr>
		                            <th><bean:message key="Trans_1"/></th>
		                            <td colspan="3"><!--
		                            --><input type="text" name="ts1_port_cd" maxlength="5" value='<bean:write name="hblVO" property="ts1_port_cd"/>' onKeyDown="codeNameAction('Location_ts1',this, 'onKeyDown','A')" onBlur="strToUpper(this);codeNameAction('Location_ts1',this, 'onBlur','A');setDestination()"  dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:90px;"><!--
		                            --><button type="button" class="input_seach_btn" tabindex="-1" id="ts1"  onClick="openAiiMasterPopUp('LOCATION_POPLIST',this)"></button><!--
		                            --><input type="text" name="ts1_flt_no"  value='<bean:write name="hblVO" property="ts1_flt_no"/>'  dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:140px;" maxlength="15" onblur="strToUpper(this)" onKeyPress="if(event.keyCode==13){openAiiMasterPopUp('LOCATION_POPLIST', document.getElementById('ts1'), frm1.ts1_flt_no.value);}"></td>
		                            <td></td>
		                        </tr>
		                        <tr>
		                            <th><bean:message key="Trans_2"/></th>
		                            <td colspan="3"><!--
		                            --><input type="text" name="ts2_port_cd" maxlength="5" value='<bean:write name="hblVO" property="ts2_port_cd"/>' onKeyDown="codeNameAction('Location_ts2',this, 'onKeyDown','A')" onBlur="strToUpper(this);codeNameAction('Location_ts2',this, 'onBlur','A');setDestination()"  dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:90px;"><!--
		                            --><button type="button" class="input_seach_btn" tabindex="-1" id="ts2"  onClick="openAiiMasterPopUp('LOCATION_POPLIST',this)"></button><!--
		                            --><input type="text" name="ts2_flt_no"  value='<bean:write name="hblVO" property="ts2_flt_no"/>'   dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:140px;" maxlength="15" onblur="strToUpper(this)" onKeyPress="if(event.keyCode==13){openAiiMasterPopUp('LOCATION_POPLIST', document.getElementById('ts2'), frm1.ts2_flt_no.value);}"></td>
		                            <td></td>
		                        </tr>
		                        <tr>
		                            <th><bean:message key="Trans_3"/></th>
		                            <td colspan="3"><!--
		                            --><input type="text" name="ts3_port_cd" maxlength="5"value='<bean:write name="hblVO" property="ts3_port_cd"/>' onKeyDown="codeNameAction('Location_ts3',this, 'onKeyDown','A')" onBlur="strToUpper(this);codeNameAction('Location_ts3',this, 'onBlur','A');setDestination()"  dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:90px;"><!--
		                            --><button type="button" class="input_seach_btn" tabindex="-1" id="ts3"  onClick="openAiiMasterPopUp('LOCATION_POPLIST',this)"></button><!--
		                            --><input type="text" name="ts3_flt_no"  value='<bean:write name="hblVO" property="ts3_flt_no"/>'   dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:140px;" maxlength="15" onblur="strToUpper(this)" onKeyPress="if(event.keyCode==13){openAiiMasterPopUp('LOCATION_POPLIST', document.getElementById('ts3'), frm1.ts3_flt_no.value);}"></td>
		                            <td></td>
		                        </tr>
		                   		<tr>
		                            <th><bean:message key="First_Port_of_Entry"/></th>
		                            <td colspan="3"><!--
		                            --><input type="text" name="first_port_cd" maxlength="5" value='<bean:write name="hblVO" property="first_port_cd"/>'  onKeyDown="codeNameAction('Location_first',this, 'onKeyDown','A')" onBlur="codeNameAction('Location_first',this, 'onBlur','A');javascript:this.value=this.value.toUpperCase();" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:90px;"><!--
		                            --><button type="button" class="input_seach_btn" tabindex="-1" id="first" onClick="openAiiMasterPopUp('LOCATION_POPLIST',this)"></button><!--
		                            --><input type="text" name="first_port_nm" value='<bean:write name="hblVO" property="first_port_nm"/>'  dataformat="excepthan" style="ime-mode:disabled;width:140px;text-transform:uppercase;" onblur="strToUpper(this)" onKeyPress="if(event.keyCode==13){openAiiMasterPopUp('LOCATION_POPLIST', document.getElementById('first'), frm1.first_port_nm.value);}"  maxlength="50"></td>
		                            <td></td>
		                        </tr>					                                                
								<tr>
									<th><bean:message key="Destination"/></th>
									<td colspan="3"><!--
		                            --><input type="text" required id="pod_cd" name="pod_cd" maxlength="5" value='<bean:write name="hblVO" property="pod_cd"/>' onKeyDown="codeNameAction('Location_air_des',this, 'onKeyDown','A')" onBlur="strToUpper(this);codeNameAction('Location_air_des',this, 'onBlur','A');if(frm1.first_port_cd.value == ''){codeNameAction('Location_air_des',this, 'onBlur');}" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:90px;"  ><!--
		                            --><button type="button" class="input_seach_btn" tabindex="-1" id="air_des" onClick="openAiiMasterPopUp('LOCATION_POPLIST',this)" ></button><!--
		                            --><input type="text" required  name="pod_nm"  maxlength="50"   value='<bean:write name="hblVO" property="pod_nm"/>'      dataformat="excepthan" style="ime-mode:disabled;width:140px;text-transform:uppercase;" onblur="strToUpper(this)" onKeyPress="if(event.keyCode==13){openAiiMasterPopUp('LOCATION_POPLIST', document.getElementById('air_des'), frm1.pod_nm.value);}"><!--
		                            --><input type="hidden" name="pod_nod_cd"     value='<bean:write name="hblVO" property="pod_nod_cd"/>'>
									</td>
									<td></td>
								</tr>
								<tr>
		                            <th><bean:message key="Last_Foreign_Port"/></th>
		                            <td colspan="4"><input type="text" name="last_port_cd" value='<bean:write name="hblVO" property="last_port_cd"/>'  dataformat="excepthan" style="ime-mode:disabled;width:263px;text-transform:uppercase;" onblur="strToUpper(this)" maxlength="12"></td>
		                        </tr>
		                        <tr>
									<th><bean:message key="Freight_Location"/></th>
									<td colspan="3"><!--
		                            --><input type="text"   name="frt_loc_cd" maxlength="20" value='<bean:write name="hblVO" property="frt_loc_cd"/>' onKeyDown="codeNameAction('trdpCode_frt_loc',this, 'onKeyDown')" onBlur="strToUpper(this);codeNameAction('trdpCode_frt_loc',this, 'onBlur')"  dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:90px;"><!--
		                            --><button type="button" class="input_seach_btn" tabindex="-1" id="frt_loc"  onClick="openAiiMasterPopUp('LINER_POPLIST',this)" ></button><!--
		                            --><input type="text"   name="frt_loc_nm" maxlength="50" value='<bean:write name="hblVO" property="frt_loc_nm"/>' onblur="strToUpper(this)"  dataformat="multiLanguage" style="ime-mode:disabled; text-transform:uppercase;width:140px;" onKeyPress="if(event.keyCode==13){openAiiMasterPopUp('LINER_POPLIST', document.getElementById('frt_loc'), frm1.frt_loc_nm.value);}"></td>
		                            <td></td>
								</tr>
								<tr id="trKrOnlyWh" style="display: none">
		                            <th><bean:message key="Warehouse"/></th>
		                            <td colspan="3"><!--
		                           --><input type="hidden" name="cfs_nod_cd" maxlength="5" value='<bean:write name="hblVO" property="cfs_nod_cd"/>'  onKeyDown="codeNameAction('Nodecode_cfs',this, 'onKeyDown')" onBlur="strToUpper(this);codeNameAction('Nodecode_cfs',this, 'onBlur')" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:80px;"><!--
		                           --><input type="text" name="cfs_loc_nm" value='<bean:write name="hblVO" property="cfs_loc_nm"/>' class="search_form-disable" onBlur="strToUpper(this);" dataformat="excepthan" style="ime-mode:disabled;width:234px;" readonly><!--
		                           --><button type="button" class="input_seach_btn" tabindex="-1" id="cfs" onClick="getWhCd('A')"></button><!--
		                           --><html:hidden name="hblVO" property="cfs_loc_cd"/></td>
		                        </tr>
								<tr>
		                         	 <th><bean:message key="Storage_Start_Date"/></th>
		                             <td colspan="3"><!--
		                            --><input type="text" name="sto_start_dt" value='<wrt:write name="hblVO" property="sto_start_dt" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy"/>' onkeyPress="onlyNumberCheck();" onKeyUp="mkDateFormatType(this, event, false, 1)" onBlur="mkDateFormatType(this, event, true, 1);dateRangeValid(this, 'Storage Start Date');" size='11' maxlength="10"  style="width:90px;"><!--
		                            --><button type="button" id="sto_start_dt_cal" onclick="doDisplay('DATE1', frm1.sto_start_dt);" class="calendar" tabindex="-1"></button></td>
		                        </tr>
							</tbody>
							</table>
						</div>
						</div>
						
						<div class="layout_vertical_3 sm mar_left_8" style="width:calc(34% - 16px); height:560px;">
							<div class="opus_design_inquiry" >
		                 	<table>
							<colgroup>
								<col width="105px"></col>
								<col width="210px"></col>
								<col width="60px"></col>
								<col width="150px"></col>
								<col width="*"></col>
							</colgroup>
							<tbody>
								<tr>
									<td><h3 class="title_design" style="margin-bottom:0;"><bean:message key="Account_Information"/></h3></td>
									<td></td>
									<td></td>
									<td></td>
									<td></td>
								</tr>
								<tr>
		                            <th><bean:message key="Commodity"/></th>
		                            <td><!--
		                            --><input type="text" name="rep_cmdt_cd" value='<bean:write name="hblVO" property="rep_cmdt_cd"/>'  onKeyDown="codeNameAction('commodity',this, 'onKeyDown')" onBlur="strToUpper(this);codeNameAction('commodity',this, 'onBlur')" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:60px;" maxlength="13"><!--
		                            --><button type="button" class="input_seach_btn" tabindex="-1"  id="commodity"   onClick="openAiiMasterPopUp('COMMODITY_POPLIST',this)" ></button><!--
		                            --><input type="text" name="rep_cmdt_nm" value='<bean:write name="hblVO" property="rep_cmdt_nm"/>' maxlength="100"  onBlur="strToUpper(this);" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:148px;" onchange="" onKeyPress="if(event.keyCode==13){openAiiMasterPopUp('COMMODITY_POPLIST', this);}"></td>
		                        </tr>
								<tr>
									<th><bean:message key="Package"/></th>
									<td><!--
		                            --><input type="text" name="pck_qty" value="<bean:write name="hblVO" property="pck_qty"/>" onkeyPress="onlyNumberCheck();" onkeyup="numberCommaLen(this,7,0)" maxlength="7" class="search_form zero_remove" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:89px;text-align:right"><!--
		                            --><bean:define id="pckList" name="valMap" property="pckCdList"/><!--
		                            --><html:select name="hblVO" property="pck_ut_cd" styleClass="search_form" style="width:148px;"><!--
		                            --><option></option><!--
		                            --><html:options collection="pckList" property="pck_ut_cd" labelProperty="pck_nm"/><!--
		                            --></html:select></td>
								</tr>
								
								<tr>
									<th><bean:message key="GWeight"/></th>
									<td><!--
		                            --><input type="text" name="grs_wgt" value="<bean:write name="hblVO" property="grs_wgt"/>" onkeyPress="onlyNumberCheck('.');" onchange="numberCommaLen(this,8,1);chkComma(this,8,1);weightChange(this);" maxlength="13" class="search_form zero_remove" dataformat="excepthan" style="ime-mode:disabled;width:89px;text-align:right;" onchange="weightChange();"><!--
		                            --><input type="text" name="grs_wgt_ut_cd" value="KG" style="width:35px;border:0;background-color:transparent;" readOnly tabindex="1">&nbsp;&nbsp;&nbsp;<!--
		                            --><input type="text" name="grs_wgt1" value="<bean:write name="hblVO" property="grs_wgt1"/>" onkeyPress="onlyNumberCheck('.');" onchange="numberCommaLen(this,8,1);chkComma(this,8,1);weightChange(this);" maxlength="13" class="search_form zero_remove" dataformat="excepthan" style="ime-mode:disabled;width:83px;text-align:right;"><!--
		                            --><input type="text" name="grs_wgt_ut_cd1" value="LB" style="width:35px;border:0;background-color:transparent;" readOnly tabindex="2"></td>
		                            <td></td>
		                            <td></td>
								</tr>
								<tr>
									<th><bean:message key="Chargeable_Weight"/></th>
									<td><!--
		                            --><input type="text" name="chg_wgt" value="<bean:write name="hblVO" property="chg_wgt"/>" onkeyPress="onlyNumberCheck('.');" onchange="numberCommaLen(this,8,1);chkComma(this,8,1);weightChange(this);" maxlength="13" class="search_form zero_remove" dataformat="excepthan" style="ime-mode:disabled;width:89px;text-align:right;"><!--
		                            --><input type="text" name="chg_wgt_ut_cd" value="KG" style="width:35px;border:0;background-color:transparent;" readOnly tabindex="1">&nbsp;&nbsp;&nbsp;<!--
		                            --><input type="text" name="chg_wgt1" value="<bean:write name="hblVO" property="chg_wgt1"/>" onkeyPress="onlyNumberCheck('.');" onchange="numberCommaLen(this,8,1);chkComma(this,8,1);weightChange(this);" maxlength="13" class="search_form zero_remove" dataformat="excepthan" style="ime-mode:disabled;width:83px;text-align:right;"><!--
		                            --><input type="text" name="chg_wgt_ut_cd1" value="LB" style="width:35px;border:0;background-color:transparent;" readOnly tabindex="2"></td>
		                            <td></td>
		                            <td></td>
								</tr>
								<tr>
									<th><bean:message key="Volume_Weight"/></th>
									<td><input type="text" name="vol_wgt" value="<bean:write name="hblVO" property="vol_wgt"/>" onkeyPress="onlyNumberCheck('.');" onchange="numberCommaLen(this,8,1);chkComma(this,8,1);weightChange(this);" maxlength="13" class="search_form zero_remove" dataformat="excepthan" style="ime-mode:disabled;width:89px;text-align:right;">&nbsp;<!-- 
									--><input type="text" value='<bean:message key="CBM"/>' style="width:44px;border:0;background-color:transparent;font-weight:bold;text-align:right;" readonly/><!--  
									--><input type="text" name="vol_meas" value="<bean:write name="hblVO" property="vol_meas"/>" onkeyPress="onlyNumberCheck('.');" onchange="numberCommaLen(this,8,6);chkComma(this,8,6);weightChange(this);" maxlength="13" class="search_form zero_remove" dataformat="excepthan" style="ime-mode:disabled;width:83px;text-align:right;"></td>
									<td></td>
		                            <td></td>
								</tr>
								
								<tr>
									<th onclick="sumHblValue();" style="cursor:hand;"><button type="button" class="btn_etc"><bean:message key="Sum"/></button></th>
									<td colspan="4"></td>
								</tr>
								<tr>
		                       		<th><bean:message key="Freight"/></th>
		                            <td><!--
		                            --><bean:define id="frtList" name="valMap" property="frtCdList"/><!--
		                            --><html:select name="hblVO" property="frt_term_cd" styleClass="search_form" style="width:89px;"><!--
		                            --><html:options collection="frtList" property="cd_val" labelProperty="cd_nm"/><!--
		                            --></html:select><!--
		                            --><input type="hidden" name="h_frt_term_cd" value="<bean:write name='hblVO' property='frt_term_cd' />" />
		                            </td>
		                       	</tr>
		                       	
		                       	 <tr>
		                        	<th><bean:message key="Tariff_Currency_Code"/></th>
		                            <td><!--
		                            --><bean:define id="currCdList" name="valMap" property="currCdList"/><!--
		                            --><html:select name="hblVO" property="curr_cd" styleClass="search_form" style="width:89px;"><!--
		                            --><html:options collection="currCdList" property="cd_val" labelProperty="cd_nm"/><!--
		                            --></html:select><!--
		                            --><input type="hidden" name="h_curr_cd" value="<bean:write name="hblVO" property="curr_cd"/>"></td>
		                        </tr>
		                        
		                      <tr>
		                      	 <th><bean:message key="Internal"/></th>
		                         <td><!--
		                          --><input type="checkBox" name="inter_use_flag" id="inter_use_flag" value="<bean:write name="hblVO" property="inter_use_flag"/>" onclick="flgChange(this);"><!-- 
								  --></td>
		                      </tr>		                        
		                        <tr>
									<td><h3 class="title_design mar_top_8" style="margin-bottom:0;"><bean:message key="Management"/></h3></td>
								</tr>
								<tr>
		                            <th><bean:message key="Date_issued"/></th>
		                            <td><!--
		                            --><input type="text" name="bl_iss_dt" value="<wrt:write name="hblVO" property="bl_iss_dt" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy"/>"  onKeyUp="mkDateFormatType(this, event, false, 1)" onBlur="mkDateFormatType(this, event, true, 1);dateRangeValid(this, 'Date Issued');" dataformat="excepthan" style="ime-mode:disabled;width:89px;" size='11' maxlength="10"><!--
		                            --><button type="button" id="bl_iss_dt_cal" onclick="doDisplay('DATE1' ,frm1.bl_iss_dt);" class="calendar" tabindex="-1"></button></td>
		                        </tr>
		                        <tr>
		                            <th><bean:message key="Issued_By"/></th>
		                            <td><!--
		                            --><input type="text"   name="opr_usrid" value="<bean:write name="hblVO" property="issued_by"/>" class="search_form-disable" readOnly style="width:89px;"><!--
		                            --><button type="button" class="input_seach_btn" tabindex="-1" id="oprBtn"  onClick="openAiiMasterPopUp('OPR_POPLIST',this)" ></button><!--
		                            --><input type="hidden" name="opr_usrnm"   value="<bean:write name="hblVO" property="proc_usrnm"/>"><!--
		                            --><input type="hidden" name="opr_ofc_cd"  value="<bean:write name="hblVO" property="proc_ofccd"/>"><!--
		                            --><input type="hidden" name="opr_dept_cd" value="<bean:write name="hblVO" property="proc_dept_cd"/>"></td>
		                        </tr>
								<!-- OFVFOUR-7814 [AIF] ADDING TEAM INFORMATION ON THE ALL ENTRY SCREEN -->
								<tr>
									<th><bean:message key="Team_cd"/></th>
									<td>
										<input type="text" name="team_cd" readOnly style="width:117px;">
									</td>
								</tr>
		                        <tr>
		                          <th><bean:message key="Sales_Type"/></th>
								  <td><bean:define id="slsList" name="valMap" property="slsCdList"/>
		                                <html:select name="hblVO" property="nomi_flg" style="width:89px;" styleClass="input1" onchange="fnSalesChange()"> <!-- #1948 [C&L, CBM] SALES PIC ASSIGNMENT ON MASTER B/L -->
		                                    <html:options collection="slsList" property="cd_val" labelProperty="cd_nm"/>
		                               </html:select>
								  </td>  		                        
		                        </tr>
		                        <tr>
		                          <th><bean:message key="Sales_OFC"/></th>
		                          <td><!--
		                            --><input type="text" name="sls_ofc_cd" value="<bean:write name="hblVO" property="sls_ofc_cd"/>" class="search_form-disable" style="width:89px;" readonly><!--
		                            --><button type="button" class="input_seach_btn" tabindex="-1" onClick="openAiiMasterPopUp('OFFICE_GRID_POPLIST',this)" ></button></td>
		                       </tr>
		                       <tr>
		                          <th><bean:message key="Sales_PIC"/></th>
		                          <td><!--
		                            --><input type="text"   name="sls_usrid"  value="<bean:write name="hblVO" property="sls_usrid"/>"  class="search_form-disable" style="width:89px;" readOnly><!--
		                            --><button type="button" class="input_seach_btn" tabindex="-1" id="salesperson" onClick="openAiiMasterPopUp('USER_POPLIST',this)" ></button><!--
		                            --><input type="hidden" name="sls_usr_nm" value="<bean:write name="hblVO" property="sls_usr_nm"/>" class="search_form-disable" style="width:120px;" readOnly><!--
		                            --><input type="hidden" name="sls_dept_cd" value="<bean:write name="hblVO" property="sls_dept_cd"/>"></td>
		                      </tr>
							</tbody>
						</table>
					</div>
					</div>
					</div>
			<h3 class="title_design mar_top_8" ><bean:message key="HAWB_List"/></h3>
	    	<div class="opus_design_grid">
	    		<script language="javascript">comSheetObject('sheet2');
				/* 속도개선  */
				comConfigSheet(docObjects[1], SYSTEM_FIS);
				initSheet(docObjects[1], (1+1) );
				comEndConfigSheet(docObjects[1]);			    		
	    		</script>
	    	</div>
	</div>
	
	<div id="tabLayer" name="tabLayer"style="display:none;">
		<div class="opus_design_inquiry sm">
			<div class= "opus_design_inquiry sm">
			<table>
				<colgroup>
					<col width="40px"></col>
					<col width="160px"></col>
					<col width="100px"></col>
					<col width="160px"></col>
					<col width="100px"></col>
					<col width="160px"></col>
					<col width="*"></col>
				</colgroup>
				<tbody>
					<tr>
						<th><bean:message key="CCN"/></th>
						<td><input type="text" name="ccn_no" maxlength="30" onBlur="strToUpper(this);" value="<bean:write name="hblVO" property="ccn_no"/>"  dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:160px;"></td>
						<th><bean:message key="Manifest_From"/></th>
						<td><input type="text" name="mnf_fr_loc" maxlength="20" onBlur="strToUpper(this);" value="<bean:write name="hblVO" property="mnf_fr_loc"/>"  dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:160px;"></td>
						<th><bean:message key="To_A"/></th>
						<td><input type="text" name="mnf_to_loc" maxlength="20" onBlur="strToUpper(this);" value="<bean:write name="hblVO" property="mnf_to_loc"/>"  dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:160px;"></td>
						<td></td>
					</tr>
				</tbody>
			</table>
			</div>
			
			<div class="sm mar_top_4" style="width:725px;">
				<h3 class="title_design"><bean:message key="Handling_Information"/></h3>
				<textarea name="hndl_info_txt" cols="182" rows="2" maxlength="500" onkeypress="keyPress_maxLength(this);" onkeyup="keyUp_maxLength(this);" onblur="strToUpper(this);keyUp_maxLength(this);" dataformat="excepthan" style="width: 900px;">
<bean:write name="hblVO" property="hndl_info_txt" filter="true"/></textarea>
			</div>
			
			<div class="layout_wrap">
			<div class="layout_vertical_2 sm mar_top_8" style="width:315px; height:290px;">
				<div>
					<h3 class="title_design mar_top_8"><bean:message key="Mark"/></h3>
					<span id="addAuto" onclick="addInst();" style="display:none;"><h3 class="title_design"><bean:message key="Add_Instruction"/></h3></span>
				</div>
				<div>
					<textarea name="mk_txt" rows="16" maxlength="4000" onkeypress="keyPress_maxLength(this);" onkeyup="rowCount(frm1,15,rider_ocean, 'A');keyUp_maxLength(this);" onblur="strToUpper(this);keyUp_maxLength(this);" dataformat="excepthan" style="width:100%;" WRAP="off">
<bean:write name="hblVO" property="mk_txt" filter="true"/></textarea>
				</div>
			</div>
			<div class="layout_vertical_2 sm pad_left_8 mar_top_8" style="width:415px; height:290px;">
				<div>
					<h3 class="title_design mar_top_8"><bean:message key="Description"/></h3>
					<span id="addAuto" onclick="addInst();" style="cursor:hand;display:none;"><h3 class="title_design"><bean:message key="Add_Instruction"/></h3></span>
					<input tabindex="-1" type="hidden" name="rider_lbl" value="" onblur="strToUpper(this);" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;text-align:right;width:110;border:0;background-color:transparent;"/>
				</div>
				<div>
					<textarea name="desc_txt" rows="16" maxlength="4000" onkeypress="keyPress_maxLength(this);" onkeyup="rowCount(frm1,15,rider_ocean, 'A');keyUp_maxLength(this);" onblur="strToUpper(this);keyUp_maxLength(this);" dataformat="excepthan" style="width:100%;" WRAP="off">
<bean:write name="hblVO" property="desc_txt" filter="true"/></textarea>
					<img src="<%=CLT_PATH%>/web/img/main/overlimit.gif" style="display:none;"width="29" height="29" border="0" id="rider_ocean" valign="top">
				</div>
			</div>
			</div>
		</div>
	</div>
	<%--
=========================================================
*Copyright(c) 2009 CyberLogitec. All Rights Reserved.
=========================================================
=========================================================
*@FileName   : SEE_BMD_0024.jsp
*@FileTitle  : HGBL등록 > Freight
*@Description: Freight 등록화면
*@author     : Kang,Jung-Gu
*@version    : 1.0 - 09/28/2009
*@since      :

*@Change history:
=========================================================
--%>

<div id="tabLayer" name="tabLayer"style="display:none;">
<script>
	var dfPerfCurr = 'KRW';
</script>
<%
	boolean sdIns = true;
	boolean sdInsDisp = true;
	boolean bcIns = true;
	boolean bcInsDisp = true;
	String to_rt_ut = "";
	String trf_cur_cd = "";   //Invoice Currency
%>
<!--Selling/Debit-->
<logic:notEmpty name="valMap" property="SFRT">
    <bean:define id="sellCnfCk" name="valMap" property="SFRT"/>
    <logic:equal name="sellCnfCk" property="flg" value="Y">
        <% sdIns = false; %>
    </logic:equal>

    <logic:equal name="sellCnfCk" property="invflg" value="Y">
        <% sdInsDisp = false; %>
    </logic:equal>
</logic:notEmpty>

<!--Buying/Crebit-->
<logic:notEmpty name="valMap" property="BFRT">
    <bean:define id="buyCnfCk" name="valMap" property="BFRT"/>
    <logic:equal name="buyCnfCk" property="flg" value="Y">
        <% bcIns = false; %>
    </logic:equal>
    
    <logic:equal name="buyCnfCk" property="invflg" value="Y">
        <% bcInsDisp = false; %>
    </logic:equal>
</logic:notEmpty>

<!-- Currency 조회 -->
<logic:notEmpty name="valMap" property="OfcCurrency">
	<bean:define id="curMap" name="valMap" property="OfcCurrency"/>
	<%  HashMap tmpMap = (HashMap)curMap;
		ofc_curr   = (String)tmpMap.get("ofccurr_cd");
		trf_cur_cd = (String)tmpMap.get("trf_cur_cd");
		to_rt_ut   = (String)tmpMap.get("to_rt_ut");
	%>
</logic:notEmpty>
	<script>
		var obdtCur = '<%=to_rt_ut%>';
	</script>

	<input type="hidden" name="f_ofc_cnt_cd"   value="">
	<input type="hidden" name="hid_act_cnt_cd" value="">
	
	<input type="hidden" name="ppdOrgCurr"     value="">
	<input type="hidden" name="ofc_curr"       value="<%=ofc_curr%>">
    <input type="hidden" name="trf_cur_cd"     value="<%=trf_cur_cd%>">
    <input type="hidden" name="xcrtDt"         value="<bean:write name="hblVO" property="obrd_dt_tm"/>">

	<input type="hidden" name="cctOrgCurr"     value="">
	<input type="hidden" name="objPfx"         value="">
	<input type="hidden" name="curRow2"        value="">

	<input type="hidden" name="ppdToCurrency" value="<%=partner_curr%>">
	<input type="hidden" name="ppdOrgCurr"    value="<%=partner_curr%>">

    <!--Invoice추가-->    
    <input type="hidden" name="tax_bil_flg"  value="">  
    <input type="hidden" name="inv_dt"       value="">
    <input type="hidden" name="inv_due_dt"   value="">  
    <input type="hidden" name="inv_rmk"      value="">  
    <input type="hidden" name="buy_inv_no"   value=""> 
    <div class="opus_design_grid">
		<h3 class="title_design"><bean:message key="Account_Receivable"/></h3>
		<div class="opus_design_btn">
			<div class="grid_option_left">
				<button type="button" class="btn_normal" onClick="setFrtSizeUp(docObjects[3], 'frtTableS')"><bean:message key="Plus"/></button><!--
				--><button type="button" class="btn_normal" onClick="setFrtSizeDown(docObjects[3], 'frtTableS')"><bean:message key="Minus"/></button>
			</div>
			<div class="grid_option_left"  id="sdBtns" style="display:none;">
				<button type="button" class="btn_normal" onClick="goToInvoice(docObjects[3], 'LOCAL')"><bean:message key="Create_NewAR"/></button><!--
				--><button type="button" class="btn_normal" onClick="goToInvoiceModify('LOCAL')"><bean:message key="ViewEdit_Invoice"/></button><!--
				--><button type="button" class="btn_normal" onClick="setDfltFrt('', 'A', 'I', 'M')"><bean:message key="Default"/> <bean:message key="New"/></button><!--
				--><button type="button" class="btn_normal" onClick="frtRowAdd('ROWADD', docObjects[3], 'A', 'I', 'M');afterRowAdd('AR');"><bean:message key="Add"/></button><!--
				--><button type="button" class="btn_normal"  onclick="frtRowCopy('AR', docObjects[3], docObjects[5],'', 'A', 'I', 'M');" > <bean:message key="Copy_toAgent"/></button><!--
				 #2504 [PATENT]Debit Note & AP for billing code based invoices
				 --><span id="spanARprint" style="display:none;"><button type="button" class="btn_normal"  onClick="goToCmbPrint(docObjects[3],'AR');" ><bean:message key="Debit_Print"/></button></span>
					
			</div>
		</div>
		<div id="frtTableS"><script language="javascript">comSheetObject('sheet7');</script></div>
	</div>
	
	<div class="opus_design_grid">
		<h3 class="title_design"> <bean:message key="Debit_Credit"/></h3>
		<div class="opus_design_btn">
			<div class="grid_option_left">
				<button type="button" class="btn_normal" onClick="setFrtSizeUp(docObjects[5], 'frtTableDC')"><bean:message key="Plus"/></button><!--
				--><button type="button" class="btn_normal" onClick="setFrtSizeDown(docObjects[5], 'frtTableDC')"><bean:message key="Minus"/></button>
			</div>
			<div class="grid_option_left"   id="dcBtns" style="display:none;"><!--
				--><button type="button" class="btn_normal" onClick="goToInvoice(docObjects[5], 'DC')"><bean:message key="Create_NewDC"/></button><!--
				--><button type="button" class="btn_normal" onClick="goToInvoiceModify('DC')"><bean:message key="ViewEdit_Invoice"/></button><!--
				--><button type="button" class="btn_normal" onClick="setDfltFrt('dc_', 'A', 'I', 'M')"><bean:message key="Default"/> <bean:message key="New"/></button><!--
				--><button type="button" class="btn_normal" onClick="frtRowAdd('DCROWADD', docObjects[5], 'A', 'I', 'M');afterRowAdd('DC');"><bean:message key="Add"/></button><!--
				--><button type="button" class="btn_normal"  onclick="frtRowCopy('DC', docObjects[5], docObjects[3], docObjects[4], 'A', 'I', 'M');" > <bean:message key="Copy_toLocal"/></button>
			</div>
		</div>
		<div id="mainTable"><script language="javascript">comSheetObject('sheet9');</script></div>
	</div>
	
	<div class="opus_design_grid">	
		<h3 class="title_design"> <bean:message key="Account_Payable"/></h3>
		<div class="opus_design_btn">
			<div class="grid_option_left">
				<button type="button" class="btn_normal" onClick="setFrtSizeUp(docObjects[4], 'frtTableB')"><bean:message key="Plus"/></button><!--
				--><button type="button" class="btn_normal" onClick="setFrtSizeDown(docObjects[4], 'frtTableB')"><bean:message key="Minus"/></button>
			</div>
			<div class="grid_option_left" id="bcBtns" style="display:none;">
				<button type="button" class="btn_normal" onClick="goToInvoice(docObjects[4], 'AP')"><bean:message key="Create_AP"/></button><!--
				--><button type="button" class="btn_normal" onClick="goToInvoiceModify('AP')"><bean:message key="ViewEdit_Invoice"/></button><!--
				--><button type="button" class="btn_normal" onClick="setDfltFrt('b_', 'A', 'I', 'M')"><bean:message key="Default"/> <bean:message key="New"/></button><!--
				--><button type="button" class="btn_normal" onClick="frtRowAdd('BCROWADD', docObjects[4], 'A', 'I', 'M');afterRowAdd('AP');"><bean:message key="Add"/></button><!--
				--><button type="button" class="btn_normal"  onclick="frtRowCopy('AP', docObjects[4], docObjects[5],'', 'A', 'I', 'M');" > <bean:message key="Copy_toAgent"/></button><!--
				#2504 [PATENT]Debit Note & AP for billing code based invoices 
				--><span id="spanAPprint" style="display:none;"><button type="button" class="btn_normal"  onClick="goToCmbPrint(docObjects[4],'AP');" ><bean:message key="AP_Print"/></button></span>
					
			</div>
		</div>
		<div id="mainTable"><script language="javascript">comSheetObject('sheet8');</script></div>
	</div>
</div>

<div id="tabLayer" name="tabLayer"style="display:none;">
	<div class="opus_design_grid">
		<h3 class="title_design mar_btm_8"> <bean:message key="Work_Order_List"/></h3>
		<div class="opus_design_btn">
			<span id="goWoObj" class="opus_design_btn" style="display:none;">
				<button type="button" class="btn_normal" onClick="doWork('WORKORDER')"><bean:message key="WorkOrder"/></button>
			</span>
		</div>
		<div id="mainTable"><script language="javascript">comSheetObject('sheet12');</script></div>		
	</div>
</div>

<!-- Tab: 5 -->
<div id="tabLayer" name="tabLayer"style="display:none;">
	<div class="opus_design_grid">
		<h3 class="title_design"> <bean:message key="Shipping_Document"/></h3>
		<div class="opus_design_btn">
			<span id="emlSnd" onClick="doWork('SNDEML')" style="display:none;"><button type="button" class="btn_normal" ><bean:message key="Email"/></button></span>
			<span id="sDoc" style="display:none;" btnAuth="S_DOC" onClick="doWork('S_DOC');"><button type="button" class="btn_normal"><bean:message key="Print"/></button></span>
			<span id="fileUp" style="display:inline;"  onClick="doWork('DOCFILE');"><button type="button" class="btn_normal"><bean:message key="Upload"/></button></span>
		</div>
		<div id="mainTable"><script language="javascript">comSheetObject('sheet3');</script></div>		
	</div>
</div>

<!-- Tab 6 -->
<div id="tabLayer" name="tabLayer"style="display:none;">
	<h3 class="title_design"> <bean:message key="History_Search"/></h3>
	<div class="opus_design_grid">
		<div id="mainTable"><script language="javascript">comSheetObject('sheet11');</script></div>
	</div>		
</div>
</div>
</div>
</form>
<form name="frm2" method="POST" action="./GateServlet.gsl">
    <input type="hidden" name="goWhere" value="fd"/>
    <input type="hidden" name="bcKey"   value="blFileDown"/>
    <input type="hidden" name="s_palt_doc_seq" value=""/>
    <input type="hidden" name="intg_bl_seq" value=""/>
    <input type="hidden" name="docType" value=""/>
</form>

<script type="text/javascript">
var attr_extension = "<%= roleBtnVO.getAttr_extension() %>";
fnbtnCtl();

</script>	
	
<!-- 2010.12.17 김진혁 추가, 수입은 최초화면 loading될 때 Collect로 셋팅 -->
<script>
/*  if('<bean:write name="hblVO" property="frt_term_cd"/>'==""){
	frm1.otr_chg_term_cd.value = "CC";
}  */
</script>


