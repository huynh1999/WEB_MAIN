<%--
=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : AII_BMD_0020.jsp
*@FileTitle  : 항공 수입 HGBL등록 
*@author     : CLT
*@version    : 1.0
*@since      : 2014/08/14
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
    <script language="javascript" src="<%=CLT_PATH%>/apps/fis/aii/bmd/housebl/script/AII_BMD_0020.js?ver=<%=CLT_JS_VER%>"></script>
    
    <%
		String ofc_cd		= userInfo.getOfc_cd();
		String ofcLoclNm 	= userInfo.getOfc_locl_nm();
		String usrNm 		= userInfo.getUser_name();
		String usrId		= userInfo.getUsrid();
		String usrPhn		= userInfo.getPhn();
		String usrFax		= userInfo.getFax();
		String email 		= userInfo.getEml();
		String cnt_cd 		= userInfo.getOfc_cnt_cd();
	%>
	
	<script>
	var uod_flg ="<%= userInfo.getUod_flg()%>"
	var usrDept = "<%=userInfo.getDept_cd()%>";
	var usrId = "<%= userInfo.getUsrid() %>";
	var ofc_cd = "<%= userInfo.getOfc_cd() %>";
	var usrNm = "<%= userInfo.getUser_name() %>";
	//#4092 [Zen] Role Control Option to add "Create or Edit Other Office Data"
	var edob_flg;
	var ref_ofc_cd;	
	var AUTOCOMPLETE_YN = 'N';
	 
	<logic:notEmpty name="valMap" property="autocompleteYn">
    	AUTOCOMPLETE_YN = '<bean:write name="valMap" property="autocompleteYn"/>';
	</logic:notEmpty>
	 
		function btnLoad(){
			frm1.ref_no.className = 'search_form-disable';
		    frm1.ref_no.readOnly  = true;
		    getObj("brnRef_no").disabled  = true;
		    
	     	/* #428 [ZEN] AFTER AR/AP/DC CREATION, FILING # SHOULD BE NOT UPDATED */
	     	/* O04 롤코드가 있으면 수정가능 or 롤코드가 없을땐 인보이스가 없을때 수정가능  (ref_no) */
		    //alert("html = " + frm1.f_modify.value);
		    if(frm1.f_modify.value == 'UPDATE'){
				frm1.ref_no.className = 'search_form';
			    frm1.ref_no.readOnly  = false;	
			    getObj("brnRef_no").disabled  = false;
		    }	
		    
			if(frm1.bl_sts_cd.value=='NA'){
                //mblMk").style.display  = 'inline';
                //tmplObj").style.display = 'inline';
				getBtnObj("btnAccounting").style.display = 'none';

			}else{
				getBtnObj("btnAccounting").style.display = 'inline';
				//getBtnObj("btnDO").style.display = 'inline';
				//getBtnObj("btnDOV").style.display = 'inline';
				if(frm1.bl_sts_cd.value=='HC'){
        			//mblMk").style.display  = 'none';
					//frm1.bl_no.className = 'search_form-disable';
					//frm1.bl_no.readOnly  = true;
					//tmplObj").style.display= 'none';
					//btnAdd").style.display = 'none';
			
					//hblCnfObj").style.display = 'inline';
					getBtnObj("btnDelete").style.display = 'inline';
					//dimAdd").style.display = 'inline';
                    getBtnObj("btnfromBlModiObj").style.display = 'inline';
					//rcpBtnObj").style.display = 'inline';
		            //btnModify").style.display = 'inline';
					getBtnObj("btnCopy").style.display  = 'inline';

					getBtnObj("btnPrint").style.display = 'inline';
					getBtnObj("btnPreliminary").style.display = 'inline';
		
                    // sndEmlObj").style.display = 'inline';
                    getObj("fileUpObj").style.display = 'inline';
		
		            //Freight버튼
            		getObj("sdBtns").style.display    = 'inline';
            		getObj("bcBtns").style.display    = 'inline';
            		getObj("dcBtns").style.display    = 'inline';
					//#27542 [BINEX] B/L Entry 에 Pickup & Delivery Order 연계 기능 추가
					getObj("goWoObj").style.display = 'inline';
					getBtnObj("btnAuthority").style.display= 'inline';
					getObj("itmAdd").style.display = 'inline';
					getObj("loadPO").style.display = 'inline';
					
// 				}else if(frm1.bl_sts_cd.value=='HO'){
// 					//btnAdd").style.display = 'none';
// 					getBtnObj("closeModiObj").style.display = 'inline';
//                     //hblCnfObj").style.display = 'none';
//                     //btnModify").style.display = 'none';
                    
//                     getBtnObj("btnSave").style.display = 'none';
//                     getBtnObj("btnfromBlModiObj").style.display = 'inline';
                    
//                     getBtnObj("btnDelete").style.display  = 'none';
//                     getBtnObj("btnCopy").style.display = 'inline';
//                     getBtnObj("btnPrint").style.display= 'inline';
//                     getBtnObj("btnPreliminary").style.display = 'inline';
// 					//#27542 [BINEX] B/L Entry 에 Pickup & Delivery Order 연계 기능 추가
// 					getObj("goWoObj").style.display = 'inline';
// 					getBtnObj("btnAuthority").style.display= 'inline';
// 					getObj("itmAdd").style.display = 'none';
// 					getObj("loadPO").style.display = 'none';
					
				}else{
					//btnAdd").style.display = 'none';
					getBtnObj("btnSave").style.display = 'none';
					getBtnObj("btnSaveX").style.display = 'none';
					getBtnObj("btnfromBlModiObj").style.display = 'inline';
					
					getBtnObj("closeModiObj").style.display = 'inline';
					getBtnObj("btnDelete").style.display  = 'none';
					getBtnObj("btnCopy").style.display = 'inline';
					getBtnObj("btnPrint").style.display= 'inline';
					getBtnObj("btnPreliminary").style.display = 'inline';
					// sndEmlObj").style.display = 'inline';
					getObj("fileUpObj").style.display = 'inline';
					//#27542 [BINEX] B/L Entry 에 Pickup & Delivery Order 연계 기능 추가
					getObj("goWoObj").style.display = 'inline';
					getBtnObj("btnAuthority").style.display= 'inline';
					getObj("itmAdd").style.display = 'none';
					getObj("loadPO").style.display = 'none';
					
					// #48835 - [CARGOIS] COPY 한 HBL 의 이상한 현상
		            // Block 된 B/L일 경우 Filing No 수정 못하도록 수정
		           	frm1.ref_no.className = 'search_form-disable';
		            frm1.ref_no.readOnly  = true;
		            getObj("brnRef_no").disabled  = true;	
				}
			}
			
			
			// Chungrue 추가 GLOVIS EDI
			if('<%=ofc_cd%>' == "SEL"){
				getBtnObj("goalsObj").style.display = "inline";
			}else{
				getBtnObj("goalsObj").style.display = "none";
			}
			
			fnbtnCtl();
		}
		
		/**
		*BL복사 시
		*/
		function searhCopyFrt(){
			<logic:notEmpty name="valMap" property="org_bl_seq">
				//Selling/Debit Freight 조회
				docObjects[4].DoSearch4Post("./AII_BMD_0024GS.clt",   'f_search_tp=CP&f_cmd='+SEARCHLIST06+'&intg_bl_seq=<bean:write name="valMap" property="org_bl_seq"/>');
		
				//Buying/Crebit List 조회
				docObjects[5].DoSearch4Post("./AII_BMD_0024_1GS.clt", 'f_search_tp=CP&f_cmd='+SEARCHLIST07+'&intg_bl_seq=<bean:write name="valMap" property="org_bl_seq"/>');
			</logic:notEmpty>
		}
		
        <% boolean isBegin = false; %>
		
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
		
		<!-- ###Freight 항목### -->
		//#3411 [JTC]Accounting & Performance 수정사항
		//Unit Code Blank 삭제
		var UNITCD1 = '';
		var UNITCD2 = '';
		<% isBegin = false; %>
        <logic:notEmpty name="valMap" property="UNITCD">
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
		
        <!-- ###Rcp Class 항목### -->
        var RCPCD1 = ' ';
        var RCPCD2 = ' ';
        <logic:notEmpty name="valMap" property="RCPCD">
            <bean:define id="rcpList" name="valMap" property="RCPCD"/>
            <logic:iterate id="codeVO" name="rcpList">
                RCPCD1+= '|<bean:write name="codeVO" property="cd_nm"/>';
                RCPCD2+= '|<bean:write name="codeVO" property="cd_val"/>';
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
		
        <!-- ###JOB_STS LIST 항목 ### -->
        var JBCD1 = '';
		var JBCD2 = '';
		<% isBegin = false; %>
        <bean:define id="jobStsList" name="valMap" property="jobStsList"/>
		<logic:iterate id="JobStsVO" name="jobStsList">
			<% if(isBegin){ %>
				JBCD1+= '|';
				JBCD2+= '|';
			<% }else{
				  isBegin = true;
			   } %>
			   JBCD1+= '<bean:write name="JobStsVO" property="bse_tm_cd"/>';
			   JBCD2+= '<bean:write name="JobStsVO" property="bse_tm_nm"/>';
		</logic:iterate>
		
		
        function fmMbl(){
        <logic:notEmpty name="valMap" property="fmMbl">
            //btnAdd").style.display = 'inline';
            //frm1.bl_no.className = 'search_form';
            //frm1.bl_no.readOnly  = false;
            frm1.bl_no.focus();
        </logic:notEmpty>
        }

        <!-- ###Office Info## -->
        <% isBegin = false; %>
        <bean:define id="officeInfo" name="valMap" property="officeInfo"/>
        <bean:define id="ofcVO" name="officeInfo"/>
        var v_ofc_cd = "<bean:write name="ofcVO" property="ofc_cd"/>";
        var oth_size_ut_cd = "<bean:write name="ofcVO" property="oth_size_ut_cd"/>";
        var air_body = "<bean:write name="ofcVO" property="air_body"/>";
        var ofc_post_dt = "<bean:write name="ofcVO" property="post_dt_imp"/>";
        var ofc_curr_cd = "<bean:write name="ofcVO" property="trf_cur_cd"/>";
        var ofc_locl_curr_cd = "<bean:write name="ofcVO" property="locl_curr_cd"/>"; //#138 Local Currency 
        var ai_cgor_pic_info = "<bean:write name="ofcVO" property="ai_cgor_pic_info"/>";

        var user_ofc_cnt_cd = "<%=userInfo.getOfc_cnt_cd()%>";
        var login_user_ofc_cd = "<%=ofc_cd%>";
        var attr_extension = "<%= roleBtnVO.getAttr_extension() %>";
        var MULTI_CURR_FLAG = "<%="Y".equals((String)application.getAttribute("MULTI_CURR_FLAG")) ? "Y" : "N" %>";	//[20141125 OJG] - Multi Currency 사용 여부
        
		//#512 [BNX] VND(베트남) - USD 환율 차로 인한 환율 계산 오류
		var vat_rt_dp_cnt = Number("<bean:write name="ofcVO" property="vat_rt_dp_cnt"/>");
		var xch_rt_dp_cnt = Number("<bean:write name="ofcVO" property="xch_rt_dp_cnt"/>");

		function fnbtnCtl(){
			
			// 51974 [BNX, ZEN] Invoice Create/Edit 권한 추가, Other Office View/Edit 권한 추가
			//권한이 있는 경우(Check) 현재 있는 Role 권한이 그대로 처리되도록 함
			//권한이 없는 경우(unCheck) 된 경우 User 의 Office 와 동일한 DATA가 아닌 경우 Save 버튼을 Hidden 시킨다.
			var formObj=document.frm1;
			//#4092 [Zen] Role Control Option to add "Create or Edit Other Office Data"
			edob_flg 		= "<%=userInfo.getEdob_flg()%>"; //ENABLE EDITING OTHER OFFICE (B/L) 
			ofc_cd 		= "<%=userInfo.getOfc_cd()%>"; 
			var ref_ofc_cd =  formObj.ref_ofc_cd.value;
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
				$("#btnPrint").hide(); 
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
	btnLoad();
	loadPage();
	loadData();
	doHideProcess();
	fmMbl();
}
//-->
</script>
<form name="frm1" method="POST" action="./AII_BMD_0020.clt" class="filter">
	<input type="hidden" name="f_cmd">
	<input type="hidden" name="h_ofc_cnt_cd">
	<html:hidden name="hblVO"  property="bl_sts_cd"/>	
    <html:hidden name="hblVO"  property="intg_bl_seq"/>
	<html:hidden name="valMap" property="f_intg_bl_seq"/>
	<input type="hidden" name="mk_bl_no" value="<bean:write name="hblVO" property="bl_no"/>">
	<input	type="hidden" name="f_ref_no"/>
	<input type="hidden" name="copy_ref_no" id="copy_ref_no" value="<bean:write name="hblVO" property="copy_ref_no"/>">
	<input type="hidden" name="g_ofc_cd" value="<%=ofc_cd%>">
	<input type="hidden" name="email" value="<%=email%>">
	<input type="hidden" name="usrNm" value="<%=usrNm%>">
	<input type="hidden" name="usrPhn" value="<%=usrPhn%>">
	<input type="hidden" name="usrFax" value="<%=usrFax%>">
	
	<input type="hidden" name="mailTitle" value="">
	<input type="hidden" name="mailTo" value="">
	<input type="hidden" name="h_ccn_no" value="">
	
	<input type="hidden" name="file_name">
	<input type="hidden" name="title">
	<input type="hidden" name="rd_param">
	<input type="hidden" name="user_id"  value="<%=userInfo.getUsrid()%>" />
	
	<input type="hidden" name="h_mbl_curr_cd" value="<bean:write name="hblVO" property="mbl_curr_cd"/>">
	<input type="hidden" name="h_dflt_an_memo" id="h_dflt_an_memo" value="<bean:write name="ofcVO" property="dflt_an_memo"/>"/>
	
    <input type="hidden" name="f_isNumSep" 	value='<bean:write name="valMap" property="f_isNumSep"/>'>	
    
    <!--  Report ==> OutLook연동 파라미터 (S) -->
	<input type="hidden" name="rpt_biz_tp" id="rpt_biz_tp" />
	<input type="hidden" name="rpt_biz_sub_tp" id="rpt_biz_sub_tp" />	
	<input type="hidden" name="rpt_pdf_file_nm"/>

	<!-- #47413 [IMPEX]B/L COPY 기능보완  --> 
	<input type="hidden" name="copy_bl_seq" 	value='<bean:write name="valMap" property="org_bl_seq"></bean:write>'/>
    <!-- #52320 [COMMON] Transaction 변경처리시 Block Date 까지 Check 하도록 수정  --> 
    <input type="hidden" name="trx_modi_tms" value="" id="trx_modi_tms" />
    	
	<!-- #52036 Credit_Restriction_Applied --> 
    <input type="hidden" name="credit_flg" value="<%= userInfo.getCredit_flg() %>"/>
    
    <input type="hidden" name="mrn_no" id="mrn_no" value="<bean:write name="hblVO" property="mrn_no"/>">
    <!--#428 [ZEN] AFTER AR/AP/DC CREATION, FILING # SHOULD BE NOT UPDATED  -->
    <input type="hidden" name="f_modify"   id="f_modify"   value="<bean:write name="valMap" property="f_modify"/>">
    <input type="hidden" name="sel_ref_no" id="sel_ref_no" maxlength="20" value='<bean:write name="hblVO" property="ref_no"/>'><!-- 조회된 Ref_no , ref 번호 변경시 비교를 위해서 -->
    
    <!--#6669 [Zencon] OPUS UPLOADED DOCUMENT SHOWS REGARDLESS OF MODULE  -->
	<input type="hidden" name="f_palt_mnu_cd"   id="f_palt_mnu_cd"   value="AIH">
	<!--OFVFOUR-7707[Matrix] Restriction to block creating HBL in case the credit of customer exceeds credit limit  -->
	<input type="hidden" name="f_credit_flg"   id="f_credit_flg"   value="N">
    
	<!-- Button -->
	<div class="page_title_area clear">
	   <h2 class="page_title" id='bigtitle'><button type="button"><%=LEV3_NM%></button></h2>
	   <!-- btn_div -->
	   <div class="opus_design_btn TOP">
		   <%-- 
		   <span onClick="doWork('SEARCHLIST')" style="display:none;" btnAuth="<%= roleBtnVO.getAttr1() %>"><button type="button" class="btn_accent"><bean:message key="Search"/></button></span>
		   <span onClick="doWork('NEW')" style="display:none;" btnAuth="<%= roleBtnVO.getAttr2() %>"><button type="button" class="btn_normal"><bean:message key="New"/></button></span>
		   <span onClick="doWork('SAVE')" style="display:none;" btnAuth="<%= roleBtnVO.getAttr3() %>"><button id="btnSave" type="button" class="btn_normal" style="display:inline;"><bean:message key="Save"/></button></span>
		   <button type="button" id="btnSaveX" class="btn_normal"  style="display:none;" btnAuth="<%= roleBtnVO.getAttr3() %>" onclick="saveCloseBtnClick()"><bean:message key="Save_X"/></button>
		   <span onClick="doWork('HBL_ADD')" style="display:none;" btnAuth="<%= roleBtnVO.getAttr3() %>"><button id="btnfromBlModiObj" type="button" class="btn_normal" style="display:none;"><bean:message key="HBL_ADD_AGAIN"/></button></span>
		   <span onClick="doWork('CLOSE_MODIFY')" style="display:none;" btnAuth="<%= roleBtnVO.getAttr3() %>"><button id="closeModiObj" type="button" class="btn_normal" style="display:none;"><bean:message key="Save"/></button></span>
		   <span onClick="doWork('HBLCRE')" style="display:none;" btnAuth="HBL_CREATION"><button id="hblCreObj" type="button" class="btn_normal" style="display:none;"><bean:message key="HBL_Creation"/></button></span>
		   <span onClick="doWork('COPY')" style="display:none;" btnAuth="COPY"><button id="btnCopy" type="button" class="btn_normal" style="display:none;"><bean:message key="Copy"/></button></span>
		   <span onClick="doWork('ArrivalNotice')" style="display:none;" btnAuth="B_AN"><button id="btnPrint" type="button" class="btn_normal" style="display:none;"><bean:message key="B.AN"/></button></span>
		   <span onClick="doWork('PreliminaryClaim')" style="display:none;" btnAuth="P_CL"><button id="btnPreliminary" type="button" class="btn_normal"><bean:message key="P.CL"/></button></span>
		   <span onClick="doWork('DELIVERY_ORDER')" style="display:none;" btnAuth="B_DO"><button id="btnDO" type="button" class="btn_normal" style="display:none;"><bean:message key="B.DO"/></button></span>
		   <span onClick="doWork('RELEASE_ORDER')" style="display:none;" btnAuth="REL_ORDER"><button type="button" class="btn_normal"><bean:message key="REL_Order"/></button></span>
		   <span onClick="doWork('AUTHORITY')" style="display:none;" btnAuth="<%= roleBtnVO.getAttr5() %>"><button id="btnAuthority" type="button" class="btn_normal" style="display:none;"><bean:message key="B.Authority"/></button></span>
		   <span onClick="doWork('GOALS')" style="display:none;" btnAuth="B_GOALS"><button id="goalsObj" type="button" class="btn_normal" style="display:none;"><bean:message key="B.Goals"/></button></span>
		   <span onClick="doWork('GOTOACCT')" style="display:none;" btnAuth="ACCOUNTING"><button id="btnAccounting" type="button" class="btn_normal" style="display:none;"><bean:message key="Accounting"/></button></span>
		   <span onClick="doWork('PROFIT_REPORT')" style="display:none;" btnAuth="P_REPORT"><button type="button" class="btn_normal"><bean:message key="P_Report"/></button></span>
		   <span onClick="doWork('REMOVE')" style="display:none;" btnAuth="<%= roleBtnVO.getAttr4() %>"><button id="btnDelete" type="button" class="btn_normal" style="display:none;"><bean:message key="Delete"/></button></span>
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
					<col width="80px"></col>
					<col width="700px"></col>
					<col width="100px"></col>
				</colgroup>
				<tbody>
					<tr>
                        <th><bean:message key="HAWB_No"/></th>
                        <td><!--
                        --><input type="text" name="f_bl_no" maxlength="40"  value="<bean:write name="valMap" property="f_bl_no"/>" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:115px;text-transform:uppercase;" onblur="strToUpper(this)" onKeyDown="entSearch()"><!--
                        --><button type="button" class="input_seach_btn" tabindex="-1" onClick="openAiiPopUp('HBL_POPLIST',this)"></button></td>
                        <th><bean:message key="Status"/> :&nbsp;<input tabindex="-1" type="text" name="bl_sts_label" value="<bean:write name="hblVO" property="bl_sts_label"/>" class="search_form" style="width:130px;border:0;background-color:#f7f9fc;padding-top:5;color:#B60500" readOnly></th>
                        <td></td>
                    </tr>
				</tbody>
			</table>
		</div>
	</div>
	
	<div class="wrap_result_tab">
   		<div class="opus_design_grid" id="mainTable" style="display: none;">
    		<script language="javascript">comSheetObject('sheet1');</script>
    	</div>
	    <ul id="ulTab" class="opus_design_tab">
	        <li class="nowTab"><a href="#" id=Tab01 style="cursor:hand;" onClick="javascript:goTabSelect('01');"><span><bean:message key="House_AWB_Entry"/></span></a></li>
	        <li><a href="#" id=Tab02 style="cursor:hand;" onClick="javascript:goTabSelect('02');"><span><bean:message key="Mark_Desc"/></span></a></li>
	        <!-- OFVFINS-398: [HESED INTERNATIONAL] NEW CUSTOMER SETUP (AWS3) -->
	        <li <%=userInfo.getUse_bl_freight_tab().equals("N")?"style=\"display:none\"":"" %>><a href="#" id=Tab03 style="cursor:hand;" onClick="javascript:goTabSelect('03');"><span><bean:message key="Freight"/></span></a></li>
	        <li><a href="#" id=Tab04 style="cursor:hand;" onClick="javascript:goTabSelect('04');"><span><bean:message key="Work_Order"/></span></a></li>
	        <li><a href="#" id=Tab05 style="cursor:hand;" onClick="javascript:goTabSelect('05');"><span><bean:message key="Status"/></span></a></li>
	    </ul>
	
	<div id="tabLayer" name="tabLayer"style="display:inline;"><!--Booking&BL-->
		   <%@ include file = "./AII_BMD_0021.jsp"%>
	</div>
	<div id="tabLayer" name="tabLayer"style="display:none;"><!--Mark Description-->
		   <%@ include file = "./AII_BMD_0023.jsp"%>
	</div>
	<div id="tabLayer" name="tabLayer"style="display:none;"><!--Freight-->
			<%@ include file = "./AII_BMD_0024.jsp"%>
	</div>
	<div id="tabLayer" name="tabLayer"style="display:none;"><!--WorkOrder-->
			<%@ include file = "./AII_BMD_0027.jsp"%>
	</div>
	<div id="tabLayer" name="tabLayer"style="display:none;"><!--Status-->
			<%@ include file = "./AII_BMD_0026.jsp"%>
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
fnbtnCtl();
</script>	
	
<!-- 2010.12.17 김진혁 추가, 수입은 최초화면 loading될 때 Collect로 셋팅 -->
<script>
if('<bean:write name="hblVO" property="frt_term_cd"/>'==""){
	frm1.frt_term_cd.value = "CC";
	//frm1.otr_chg_term_cd.value = "CC";
}
</script>
</body>
</html>

