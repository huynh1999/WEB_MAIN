<%--
=========================================================
*@FileName   : ACC_INV_0040.jsp
*@FileTitle  : Invoice List
*@Description: Invoice List
*@author     : Chungrue - Cyberlogitec
*@version    : 1.0 - 2011/11/09
*@since      : 2011/11/09

*@Change history:
=========================================================
--%>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="clt-paging"   prefix="paging" %>
	<!-- 공통 Header -->
	<%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
<% 
	//WMS ACCOUNT LKH 2015.01.20
	String wmsUseFlag = (String)application.getAttribute("WMS_USE_FLAG");
	if(wmsUseFlag == null){wmsUseFlag = "N";} 
	
	//WMS3.0/4.0 버전 구분 WMS 고도화
	String wmsUseVer = (String)application.getAttribute("WMS_USE_VER");
	if(wmsUseVer == null){wmsUseVer = "";} 
%>		
	<!-- 일자 및 달력팝업 호출 -->
	<script language="javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/ACC_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="./apps/fis/acc/inv/invoice/script/ACC_INV_0040.js?ver=<%=CLT_JS_VER%>"></script>
	<script>
		var pDoc = parent.parent.parent.document;
		hideProcess('WORKING', pDoc);
		//WMS ACCOUNT LKH 2015.01.20
		var wmsUseFlag = "<%=wmsUseFlag%>";
	</script>

	<%
		String ofc_cd		= userInfo.getOfc_cd();
		String ofcLoclNm 	= userInfo.getOfc_locl_nm();
		String usrNm 		= userInfo.getUser_name();
		String ofcEngNm 	= userInfo.getOfc_eng_nm();
		String usrId		= userInfo.getUsrid();
		String usrPhn		= userInfo.getPhn();
		String usrFax		= userInfo.getFax();
		String email 		= userInfo.getEml();
		String cnt_cd 		= userInfo.getOfc_cnt_cd();		
		String jo_flg 		= userInfo.getJo_flg();
		String efc_flg 		= userInfo.getEfc_flg(); //EDIT AFTER CREATING INVOICES
	%>
	
	<bean:define id="valMap"  name="EventResponse" property="mapVal"/>
	<bean:define id="ofcInfo"  name="valMap" property="ofcInfo"/>
	<bean:define id="btnRole"  name="valMap" property="btnRole"/>
	
	
	<script>

		var p_hbl_no 	  	= '<bean:write name="valMap" property="s_hbl_no"/>';
		var p_mbl_no 	  	= '<bean:write name="valMap" property="s_mbl_no"/>';
		var p_intg_bl_seq 	= '<bean:write name="valMap" property="s_intg_bl_seq"/>';
		var p_ref_no	  	= '<bean:write name="valMap" property="s_ref_no"/>';
		var p_oth_ref_no  	= '<bean:write name="valMap" property="s_oth_ref_no"/>';
		var p_oth_seq  	  	= '<bean:write name="valMap" property="s_oth_seq"/>';
		//WMS ACCOUNT LKH 2015.01.20
		var p_wms_ref_no  	  	= '<bean:write name="valMap" property="s_wms_ref_no"/>';
		var p_wms_seq  	  		= '<bean:write name="valMap" property="s_wms_seq"/>';
		var p_no_chk  	  		= '<bean:write name="valMap" property="s_no_chk"/>';
		
		// 51974 [BNX, ZEN] Invoice Create/Edit 권한 추가, Other Office View/Edit 권한 추가
		var ofc_cd = "<%= userInfo.getOfc_cd() %>";
		var edoa_flg = "<%= userInfo.getEdoa_flg() %>";
		var efc_flg = "<%= efc_flg%>";
		
		function setupPage(){
			loadPage();
			
		}
		
		/*
		script 오류로 주석처리..
    	// 51974 [BNX, ZEN] Invoice Create/Edit 권한 추가, Other Office View/Edit 권한 추가
		function fnbtnCtl(args){
			if(args == 1){
				doBtnAuthority(attr_extension);  
			} 
		}
		*/
		
	</script>
	
	<form name="frm1" method="POST" action="./ACC_INV_0040.clt">
	<!--Command를 담는 공통 -->
	<input type="hidden" name="f_cmd"/>
	<input type="hidden" name="f_CurPage"/>
	
	<input type="hidden" name="f_intg_bl_seq" 		value="" id="f_intg_bl_seq"/>
	<input type="hidden" name="f_bl_no" 			value=""/>
	<input type="hidden" name="f_air_sea_clss_cd" 	value="<bean:write name="valMap" property="f_air_sea_clss_cd"/>"/>
	<input type="hidden" name="f_biz_clss_cd" 		value=""/>
	<input type="hidden" name="f_bnd_clss_cd" 		value="<bean:write name="valMap" property="f_bnd_clss_cd"/>"/>
	
	<!-- WMS ACCOUNT LKH 2015.01.20 -->
	<input type="hidden" name="f_wms_seq" 		value=""/>
	<input type="hidden" name="s_wms_seq" 		value=""/>
	<input type="hidden" name="f_wms_sts_cd"    value=""/>
	
	<input type="hidden" name="f_inv_seq" 			value=""/>
	<input type="hidden" name="f_oth_seq" 			value=""/>
	<input type="hidden" name="s_oth_seq" 			value=""/>
	<input type="hidden" name="f_inv_no" 			value=""/>
	<input type="hidden" name="f_print_type" 		value=""/>
	<input type="hidden" name="f_bl_cnt_cd"	 		value=""/>
	<input type="hidden" name="f_ref_ofc_cd" 		value=""/>
	<input type="hidden" name="f_trdp_cd" 			value=""/>
	<input type="hidden" name="carr_trdp_cd" 		value="<bean:write name="valMap" property="s_carr_trdp_cd"/>"/>
	<input type="hidden" name="carr_trdp_nm" 		value="<bean:write name="valMap" property="s_carr_trdp_nm"/>"/>
	
	<input type="hidden" name="linkFlag" 		value="<bean:write name="valMap" property="linkFlag"/>"/>
	<input type="hidden" name="blType" 		value="<bean:write name="valMap" property="blType"/>"/>
	<input type="hidden" name="refType" 		value="<bean:write name="valMap" property="refType"/>"/>
	
	<!-- Link시 검색기간 제외 조회 옵션처리 -->
	<input type="hidden" name="linkOpt" 		value="<bean:write name="valMap" property="linkOpt"/>"/>
	
	<input type="hidden" name="f_attr3" 			value="<%=roleBtnVO.getAttr3()%>"/>
	<input type="hidden" name="f_attr4" 			value="<%=roleBtnVO.getAttr4()%>"/>
	<input type="hidden" name="f_btn_role" 			value=""/>
	<input type="hidden" name="h_mbl_no" 			value="<bean:write name="valMap" property="s_mbl_no"/>"/>
	<input type="hidden" name="s_intg_bl_seq" 		value=""/>	
	
	<input type="hidden" name="file_name">
	<input type="hidden" name="title">
	<input type="hidden" name="rd_param">
	
	<input type="hidden" name="mailTitle" value="">
	<input type="hidden" name="mailTo" value="">
	
	<!-- GridSetting Value -->
	<input type="hidden" name="role_cd"  value="<%=userInfo.getRole_cd()%>" />
	<input type="hidden" name="user_id"  value="<%=userInfo.getUsrid()%>" />
	<input type="hidden" name="ofc_nm"  value="<%=userInfo.getOfc_locl_nm()%>" />
	<input type="hidden" name="ofc_cd"  value="<%=userInfo.getOfc_cd()%>" />
	<input type="hidden" name="pageurl" id="pageurl" value="ACC_INV_0040.clt"/>
	
	<!--  Report ==> OutLook연동 파라미터 (S) -->
	<input type="hidden" name="rpt_biz_tp"/>
	<input type="hidden" name="rpt_biz_sub_tp"/>
	<input type="hidden" name="rpt_trdp_cd"/>
	<input type="hidden" name="rpt_pdf_file_nm"/>
	<!--  Report ==> OutLook연동 파라미터 (E) -->

	
	<!-- #21736, [COMMON]Accounting 관련 권한 jsjang 2013.11.18 -->
	<input	type="hidden" name="jo_flg" value="<%= jo_flg %>"/>
	<input	type="hidden" name="f_block_yn" value=""/>
	<input	type="hidden" name="f_oth_sts_cd" value=""/>
	
	<input type="hidden" name = "block_post"  value="<bean:write name="valMap" property="block_post"/>"/>
	<input type="hidden" name = "max_jnr_dt"  value="<bean:write name="valMap" property="max_jnr_dt"/>"/>
	
	<!-- #39982 - [YICHENG]AR/P List - Invoice Print 수정 (Batch Print)  -->
	<input	type="hidden" name="f_ofc_cd" value="<%= ofc_cd %>"/>
	<input	type="hidden" name="f_usrId"  value="<%= usrId %>"/>
	<input	type="hidden" name="f_usrPhn" value="<%= usrPhn %>"/>
	<input	type="hidden" name="f_usrFax" value="<%= usrFax %>"/>
	<input	type="hidden" name="f_usr_nm" value="<%= usrNm %>"/>
	<input	type="hidden" name="f_email"  value="<%= email %>"/>
	<input	type="hidden" name="f_cnt_cd" value="<%= cnt_cd %>"/>
	<input	type="hidden" name="f_ofc_loc_nm" value="<%= ofcLoclNm %>"/>
	<!-- #1729 [BNX] 베트남 Local Statement/ Agent Statement - Header 명칭 변경  -->
	<input	type="hidden" name="f_ofc_eng_nm" value="<%= ofcEngNm %>"/>
	
	<!-- #52016 [CLC]e-TAX프로그램 연계 -->
	<input	type="hidden" name="x_ref_ofc_cd" id="x_ref_ofc_cd"  value=""/>
	<input	type="hidden" name="x_intg_bl_seq" id="x_intg_bl_seq"  value=""/>
	<input	type="hidden" name="x_inv_seq" id="x_inv_seq"  value=""/>
	<input	type="hidden" name="x_inv_no" id="x_inv_no"  value=""/>
	
	<!-- OFVFOUR-8205 [AZ Cargo] Display the file name when sending invoice emails -->
	<input	type="hidden" name="attachFileName" value=""/>
	
		<!-- 개인정보 관리화면 정렬순서 2016.03  -->
	<input type="hidden" name="f_orderByInfo"  value="" />
	
	<!-- WMS 고도화 -->
	<input type="hidden" name="wmsUseVer"  value="<%= wmsUseVer %>" />
	
    <!-- 타이틀, 네비게이션 -->
		<!-- OFVFOUR-7746: [SENKO USA] Add HB/L no. to Title field on emails for D/N and C/N -->
		<input type="hidden" name="chkMailAr" value="<bean:write name="valMap" property="chkMailAR"/>"/>
		<input type="hidden" name="chkMailAp" value="<bean:write name="valMap" property="chkMailAP"/>"/>
		<input type="hidden" name="chkMailDc" value="<bean:write name="valMap" property="chkMailDC"/>"/>

<!-- page_title_area -->
	<div class="page_title_area clear">
	   <h2 class="page_title"><button type="button"><%=LEV3_NM%></button></h2>
	   <!-- btn_div -->
	   <div class="opus_design_btn TOP">
	   	   <%-- 
		   <button type="button" class="btn_accent" style="display:none;" btnAuth="<%= roleBtnVO.getAttr1() %>" onclick="document.forms[0].f_CurPage.value='';FIRST_SEARCH_YN = 'N';doWork('SEARCHLIST')"><bean:message key="Search"/></button> 
		   <button type="button" class="btn_normal" style="display:none;" btnAuth="<%= roleBtnVO.getAttr2() %>" onclick="doWork('NEW')"><bean:message key="New"/></button>
		   <button type="button" class="btn_normal" style="display:none;" btnAuth="<%= roleBtnVO.getAttr3() %>" onclick="doWork('MODIFY')" id="btnModify"><bean:message key="Save"/></button>
		   <button type="button" class="btn_normal" style="display:none;" btnAuth="<%= roleBtnVO.getAttr4() %>" onclick="doWork('DELETE')" id="btnDelete"><bean:message key="Delete"/></button>
		   <button type="button" class="btn_normal" style="display:none;" btnAuth="<%= roleBtnVO.getAttr5() %>" onclick="doWork('PRINT')" id="btnPrint"><bean:message key="Print"/></button>
		   <button type="button" class="btn_normal" style="display:none;" btnAuth="PRINT_BLOCK" onclick="doWork('PRINT_BLOCK')" id="btnPrintBlock"><bean:message key="Print_L"/></button>
		   <button type="button" class="btn_normal" style="display:none;" btnAuth="B_BATCH_PRINT" onclick="doWork('BATCHPRINT')"><bean:message key="B.Batch_Print"/></button>
		   <button type="button" class="btn_normal" style="display:none;" btnAuth="B_AR" onclick="doWork('GOLOCAL')"><bean:message key="B.AR"/></button>
		   <button type="button" class="btn_normal" style="display:none;" btnAuth="CR_DB" onclick="doWork('GOCRDB')"><bean:message key="CR_DB"/></button>
		   <button type="button" class="btn_normal" style="display:none;" btnAuth="AP" onclick="doWork('GOAP')"><bean:message key="AP"/></button>
		   <button type="button" class="btn_normal" style="display:none;" btnAuth="DEPOSIT" onclick="doWork('DEPOSIT')"><bean:message key="Deposit"/></button>
		   <button type="button" class="btn_normal" style="display:none;" btnAuth="B_CHECK" onclick="doWork('CHECK')"><bean:message key="B.Check"/></button>
		   <button type="button" class="btn_normal" style="display:none;" btnAuth="HISTORY" onclick="doWork('HISTORY')" id="paidBtn1"><bean:message key="Paid_History"/></button>
		   <button type="button" class="btn_normal" style="display:none;" btnAuth="<%= roleBtnVO.getAttr6() %>" onclick="doWork('EXCEL')" name="btn_DownExcel"><bean:message key="Excel"/></button>
		   <button type="button" class="btn_normal" style="display:none;" btnAuth="<%= roleBtnVO.getAttr6() %>" onclick="doWork('EXCEL_ALL')" name="btn_DownExcel"><bean:message key="Excel"/> (ALL)</button>
		   <button type="button" class="btn_normal" style="display:none;" btnAuth="B_ACCOUNT_SLIP" onclick="doWork('SLIP')"><bean:message key="B.Account_Slip"/></button>
		   <button type="button" class="btn_normal" style="display:none;" btnAuth="<%= roleBtnVO.getAttr6() %>" onClick="doWork('LOG');"><bean:message key="LOG"/></button>
		   <button type="button" class="btn_normal" style="display:none;" btnAuth="INV_HISTORY" onclick="doWork('INV_HIS')"><bean:message key="History"/></button>
		   <button type="button" class="btn_normal" style="display:none;" btnAuth="PROFIT_REPORT" onclick="doWork('PROFIT_REPORT')"><bean:message key="Profit_Report"/></button>
		   <button type="button" class="btn_normal" style="display:none;" btnAuth="CLEAR" onclick="clearAll()"><bean:message key="Clear"/></button>		   
		   <button type="button" class="btn_normal" style="display:none;" btnAuth="INV_XML" onclick="doWork('TOXML')" name="btn_DownXml">toXML</button>
		   --%>
	   </div>
	   <!-- btn_div -->
	   <div class="location">
		   <span><%=LEV1_NM%></span>&gt;
		   <span><%=LEV2_NM%></span>&gt;
		   <span><%=LEV3_NM%></span>
		   <a href="" class="ir">URL Copy</a>
	   </div>
	</div>
            <!-- //page_title_area -->

	
<div class="over_wrap" height="100%">
	<div class="wrap_search">
        <div class="opus_design_inquiry src_pannel">
			<table>	
				<colgroup>
			        <col width="120">
		        	<col width="120">
		        	<col width="100">
		        	<col width="100">
		        	<col width="90">
		        	<col width="110">
		        	<col width="130">
		        	<col width="110">
		        	<col width="70">
		        	<col width="*">
		        </colgroup>	       
				<tbody>
					<tr>
						<%-- <th><bean:message key="Ref_No"/></th> --%>
						<th><!-- 
						--><select name="f_ref_no_type" id="f_ref_no_type"  style="width:112px; font-weight: bold;"><!--
						    --><option selected='selected' value='fileNo'><bean:message key="Ref_No"/></option><!--
						    --><option value='othRefNo'><bean:message key="Other_Reference_No"/></option><!--
						    --><option value='wmsRefNo'><bean:message key="WMS_Filing_No_INV_List"/></option><!--
						--></select>
					   	</th>						
						
						</th>
						<td>
							<input type="text" id="f_ref_no" name="f_ref_no" maxlength="20" value="<bean:write name="valMap" property="f_ref_no"/>" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:100px;" onkeydown="entSearch();"/>
						</td>
						<th><!-- 
						--><select name="f_bl_type" id="f_bl_type"  style="width:80px; font-weight: bold;" onChange="searchValueClear(this);"><!--
								    --><option selected='selected'value='HBL'><bean:message key="HBL_No"/></option><!--
								    --><option value='MBL'><bean:message key="MBL_No"/></option><!--
								--></select>
					   	</th>
					   	<td>
					   		<input type="text" name="f_mhbl_no" id="f_mhbl_no" maxlength="50" value="<bean:write name="valMap" property="f_mhbl_no"/>" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:100px;" onkeydown="entSearch();"/>
					   	</td>
						<th><bean:message key="Invoice_No"/></th>
						<td>
							<input type="hidden" name="s_inv_seq">
							<input type="text" name="s_inv_no"  maxlength="50" value="" class="search_form" dataformat="excepthan" style="ime-mode:disabled;text-transform:uppercase;" onBlur="strToUpper(this);" onkeydown="entSearch();">
						</td>
						<th><bean:message key="Vendor_Invoice_No"/></th>
						<td>
							<input type="hidden" name="s_inv_seq">
							<input type="hidden" name="s_no_chk">
							<input type="text" name="s_v_inv_no"  maxlength="50" value="" class="search_form" dataformat="excepthan" style="ime-mode:disabled;text-transform:uppercase;" onBlur="strToUpper(this);" onkeydown="entSearch();">
						</td>
						<th><bean:message key="Office"/></th>
						<td>
							<bean:define id="oficeList" name="valMap" property="ofcList"/>
							<select name="s_ofc_cd" style="width:130px;">
							<bean:size id="len" name="oficeList" />
							<logic:greaterThan name="len" value="1">
								<option value=''>ALL</option>
							</logic:greaterThan>
							<logic:iterate id="ofcVO" name="oficeList">
								<logic:equal name="ofcVO" property="ofc_cd" value="<%= userInfo.getOfc_cd()%>" >
	                            <option selected="selected"  value='<bean:write name="ofcVO" property="ofc_cd"/>'><bean:write name="ofcVO" property="ofc_cd"/></option>
	                         	</logic:equal>
	                         	<logic:notEqual name="ofcVO" property="ofc_cd" value="<%= userInfo.getOfc_cd()%>" >
	                            <option value='<bean:write name="ofcVO" property="ofc_cd"/>'><bean:write name="ofcVO" property="ofc_cd"/></option>
	                         	</logic:notEqual>
							</logic:iterate>
							</select>
						</td>
						
						
					</tr>
				</tbody>
			</table>
<!-- 				<span class="buttonset fr">
					<button type="button" class="de-search" id="logDetailSearch">Detailed Search</button> 
                </span> -->			
		</div>
		
		<div class="opus_design_inquiry tbl_pannel">
			<table>	
			<colgroup>
		        <col width="125">
	        	<col width="200">
	        	<col width="100">
	        	<col width="200">
	        	<col width="70">
	        	<col width="110">
	        	<col width="100">
	        	<col width="100">
	        	<col width="95">
				<!-- OFVFOUR-8056: [BNX-LA] Adding Search option in AR/AP list and OIH List screen -->
				<col width="130">
	        	<col width="*">	
	        </colgroup>	       
	        	 <tbody>
					<tr>
						<th><bean:message key="Bill_To"/></th>
						<td>
							<input class="input_search" type="text" name="s_bill_to_cd" maxlength="20" value="" style="ime-mode:disabled; text-transform:uppercase;width:90px"  dataformat="excepthan"  onKeyDown="codeNameAction('BILLTO',this, 'onKeyDown')" onBlur="codeNameAction('BILLTO',this, 'onBlur')" class="search_form"><!--
							 --><button type="button" class="input_seach_btn" tabindex="-1" name="billto" id="billto" onClick="doWork('CUSTOMER_POPLIST')" ></button><!-- 
							 --><input type="text" name="s_bill_to_nm" maxlength="50" value="" onKeyDown="custEnterAction(this,'CUSTOMER_NAME')" style="ime-mode:disabled; text-transform:uppercase;width:140px"  dataformat="multiLanguage"  class="search_form">
						</td>
						<th><bean:message key="Amount"/></th>
						<td>
							<input type="text" name="s_amt_fr" onkeyPress="onlyNumberCheck('-.');" onkeyDown="entSearch();"  onKeyUp="if(ComGetEvent('keycode')==13){firAmtFlag=true;};" onBlur="chkCmprAmt(firAmtFlag, false, this, this, frm1.s_amt_to);firAmtFlag=false;" onchange="addComma(this);setAmount();" maxlength="13" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:90px;text-align:right;"><span class="dash">~</span><!-- 
						 --><input type="text" name="s_amt_to" onkeyPress="onlyNumberCheck('-.');" onkeyDown="entSearch();"  onKeyUp="if(ComGetEvent('keycode')==13){firAmtFlag=true;};" onBlur="chkCmprAmt(firAmtFlag, false, this, frm1.s_amt_fr, this);firAmtFlag=false;" onchange="addComma(this);" maxlength="13" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:90px;text-align:right;">
						</td>
						<th><bean:message key="Type"/></th>
						<td>
							<select name="s_type_cd" style="width:70px;">
								<option value="">ALL</option>
								<option value="LC"><bean:message key="AR"/></option>
								<option value="CD"><bean:message key="CR_DB"/></option>
								<option value="AP"><bean:message key="AP"/></option>
							</select>
						</td>
						<th>
							<input type="radio" name="f_date_type" id="f_date_type1" value="PDT" checked><label for="f_date_type1"><bean:message key="Post_Date"/></label><!--
							--><input type="radio" name="f_date_type" id="f_date_type2" value="IDT"><label for="f_date_type2"><bean:message key="Invoice_Date"/></label><!--
							--><input type="radio" name="f_date_type" id="f_date_type3" value="DDT"><label for="f_date_type3"><bean:message key="Due_Date"/></label> 
						</th>
						<td>
							   <input type="text" id="f_strdt" name="f_strdt" style="width:75px;" size='10' maxlength="10" class="search_form" dataformat="mdy" onBlur="chkCmprPrd(firCalFlag, false, this, this, frm1.f_enddt);mkDateFormatType(this,event,true,1);" onFocus="select();"><span class="dash">~</span><!--
							--><input type="text" id="f_enddt" name="f_enddt" style="width:75px;" size='10' maxlength="10" class="search_form" dataformat="mdy" onBlur="chkCmprPrd(firCalFlag, false, this, frm1.f_strdt, this);mkDateFormatType(this,event,true,1);" onFocus="select();"><!--
							--><button type="button" class="calendar" tabindex="-1" name="f_strdt_cal" id="f_strdt_cal" onclick="doDisplay('DATE1', frm1);"></button>
						</td>
						<!-- #3463 OFVFOUR-7374[StarCluster-Mex] Invoice Exchange Rate and Currency Option -->
						<th><bean:message key="Currency"/></th>
						<td >
		                   	<select name="f_curr_cd" style="width:90px;">
		                   	<option value=''>ALL</option>
		                   	<bean:define id="currencyList" name="valMap" property="currencyList"/>
		                       <logic:iterate id="currVO" name="currencyList">
		                       	<option value='<bean:write name="currVO" property="cd_val"/>'><bean:write name="currVO" property="cd_nm"/></option>
		                       </logic:iterate>
		                   	</select>
						</td>
						<!-- OFVFOUR-8056: [BNX-LA] Adding Search option in AR/AP list and OIH List screen -->
						<th style="text-align:right"><bean:message key="Container_No"/></th>
						<td>
							<input type="text" id="f_cntr_no" name="f_cntr_no" maxlength="20" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:130px;" onkeydown="entSearch();"/>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
		
		<div class="opus_design_inquiry tbl_pannel">
			<table><!--  id="searchMore" style="display:inline" -->
				<colgroup>
					<col width="125">
		        	<col width="130">
		        	<col width="130">
		        	<col width="130">
		        	<col width="130">
		        	<col width="130">
		        	<col width="130">
		        	<col width="130">
		        	<col width="120">
		        	<col width="120">
		        	<col width="120">
		        	<col width="*">
				</colgroup>
				<tbody>
					<tr>
						<th style="text-align:right"><bean:message key="Cust_Ref_No"/></th>
						<td>
							<input type="text" id="f_cust_ref_no" name="f_cust_ref_no" maxlength="20" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:130px;" onkeydown="entSearch();"/>
						</td>
						<th style="text-align:right"><bean:message key="Agent_Ref_No"/></th>
						<td>
							<input type="text" id="f_agt_ref_no" name="f_agt_ref_no" maxlength="20" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:130px;" onkeydown="entSearch();"/>
						</td>
						<th><bean:message key="Tax_Invoice_No"/></th>
						<td>
							<input type="text" name="s_tax_no"  maxlength="20" value="" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:130px;text-transform:uppercase;" onBlur="strToUpper(this);" onkeydown="entSearch();">
						</td>
						<th>Tax ID NO.</th>
						<td>
							<input type="text" name="s_biz_no"  maxlength="50" value="" class="search_form" dataformat="multiLanguage" style="ime-mode:disabled;width:130px;text-transform:uppercase;" onBlur="strToUpper(this);" onkeydown="entSearch();">
						</td>
						<!-- #874 [STARWAY] SHIP TO COLUMN ADD ON AR/AP LIST SCREEN -->
						<th><bean:message key="Ship_to"/></th>
						<td>
							<input type="text" name="s_ship_to"  maxlength="50" value="" class="search_form" dataformat="multiLanguage" style="ime-mode:disabled;width:130px;text-transform:uppercase;" onBlur="strToUpper(this);" onkeydown="entSearch();">
						</td>
						<th><bean:message key="Remark"/></th>
						<td>
							<input type="text" name="s_inv_rmk"  maxlength="50" value="" class="search_form" dataformat="multiLanguage" style="ime-mode:disabled;width:130px;text-transform:uppercase;" onBlur="strToUpper(this);" onkeydown="entSearch();">
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
	<div class="wrap_result">
		<div class="opus_design_grid" style="padding-top:5px">
			<script language="javascript">comSheetObject('sheet1');</script>
		</div>

    	<div class="opus_design_inquiry">
		<!--- Paging(공통) --->
              <table width="100%" border="0" cellspacing="0" cellpadding="0">
                  <tr>
                      <td width="60">
                  <!--- Display option Begin --->
                          <bean:define id="pagingVal" name="valMap"     property="paging"/>
                          <paging:options name="pagingVal" defaultval="200"/>
                  <!--- Display option End --->                 
                      </td>
                      <td align="center">
                          <table  border="0" width="100%">
                              <tr>
                                  <td id="pagingTb" align="center" class="paging" height="10" valign="bottom"></td>
                                  <td width="60"></td>
                              </tr>
                          </table>
                      </td>
                  </tr>
               </table>
        </div>
        <div class="opus_design_grid" style="width:57%"><%@include file="/apps/fis/cmm/mem/jsp/CMM_MEM_0010.jsp"%></div>	 
     </div>
</div>
</form>
<script type="text/javascript">
//script 오류로 주석처리
//fnbtnCtl(1);    	// 51974 [BNX, ZEN] Invoice Create/Edit 권한 추가, Other Office View/Edit 권한 추가
doBtnAuthority("<%= roleBtnVO.getAttr_extension() %>");
</script>	
<input type="hidden" id="returnFunc" />		

