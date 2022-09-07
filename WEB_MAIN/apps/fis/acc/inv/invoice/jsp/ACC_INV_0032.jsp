<%
/*=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : ACC_INV_0032.jsp
*@FileTitle  : A/P EXPENSE List
*@author     : CLT
*@version    : 1.0
*@since      : 2014/06/20
=========================================================*/
%>
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
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/ACC_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="./apps/fis/acc/inv/invoice/script/ACC_INV_0032.js?ver=<%=CLT_JS_VER%>"></script>
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
		var pDoc = parent.parent.parent.document;
		hideProcess('WORKING', pDoc);
		
		// 51974 [BNX, ZEN] Invoice Create/Edit 권한 추가, Other Office View/Edit 권한 추가
		var ofc_cd = "<%= userInfo.getOfc_cd() %>";
		var edoa_flg = "<%= userInfo.getEdoa_flg() %>";

		
		function setupPage(){
			loadPage();
			selectSel();
		 }
	</script>
	<bean:define id="valMap"  name="EventResponse" property="mapVal"/>
	<bean:define id="ofcInfo"  name="valMap" property="ofcInfo"/>
	<bean:define id="btnRole"  name="valMap" property="btnRole"/>
	<script>
		function selectSel(){
			//frm1.s_ofc_cd.value = '<bean:write name="ofcInfo" property="ofc_cd"/>';
		}
		var btn_role      = '<bean:write name="btnRole" property="attr4"/>';
	</script>
	<form name="frm1" method="POST" action="./ACC_INV_0032.clt">
	<!--Command를 담는 공통 -->
	<input type="hidden" name="f_cmd" id="f_cmd"/>
	<input type="hidden" name="f_CurPage" id="f_CurPage"/>
	<input type="hidden" name="f_air_sea_clss_cd" id="f_air_sea_clss_cd" value=""/>
	<input type="hidden" name="f_biz_clss_cd" id="f_biz_clss_cd" value=""/>
	<input type="hidden" name="f_bnd_clss_cd"  id="f_bnd_clss_cd" value=""/>
	<input type="hidden" name="f_inv_seq" id="f_inv_seq" value=""/>
	<input type="hidden" name="f_inv_no" id="f_inv_no" 	value=""/>
	<input type="hidden" name="f_print_type" id="f_print_type"value=""/>
	<input type="hidden" name="f_intg_bl_seq" id="f_intg_bl_seq"value=""/>
	
	<input type="hidden" name="file_name" id="file_name">
	<input type="hidden" name="title" id="title">
	<input type="hidden" name="rd_param" id="rd_param">
	<input type="hidden" name="mailTitle" id="mailTitle" value="">
	<input type="hidden" name="mailTo" id="mailTo" value="">
	
	<input type="hidden" name="scac_cd" id="scac_cd" value="<bean:write name="valMap" property="scac_cd"/>"/> 
	
	<input type="hidden" name = "block_post" id= "block_post"  value="<bean:write name="valMap" property="block_post"/>"/>
	<input type="hidden" name = "max_jnr_dt" id= "max_jnr_dt"  value="<bean:write name="valMap" property="max_jnr_dt"/>"/>
	
	<input type="hidden" name="f_attr3"  id="f_attr3" 	value="<%=roleBtnVO.getAttr3()%>"/>
	<input type="hidden" name="f_attr4"  id="f_attr4" value="<%=roleBtnVO.getAttr4()%>"/>
	
	<!-- GridSetting Value -->
	<input type="hidden" name="role_cd" id="role_cd"  value="<%=userInfo.getRole_cd()%>" />
	<input type="hidden" name="user_id" id="user_id"  value="<%=userInfo.getUsrid()%>" />
	<input type="hidden" name="ofc_nm" id="ofc_nm"  value="<%=userInfo.getOfc_locl_nm()%>" />
	<input type="hidden" name="ofc_cd" id="ofc_cd"  value="<%=userInfo.getOfc_cd()%>" />
	<input type="hidden" name="pageurl" id="pageurl" value="ACC_INV_0032.clt"/>
	
	<input	type="hidden" name="f_usr_nm" id="f_usr_nm" value="<%= usrNm %>"/>
	<input	type="hidden" name="f_email" id="f_email" value="<%= email %>"/>
	<input	type="hidden" name="f_usrId" id="f_usrId" value="<%= usrId %>"/>
	<input	type="hidden" name="f_usrPhn" id="f_usrPhn" value="<%= usrPhn %>"/>
	<input	type="hidden" name="f_usrFax" id="f_usrFax" value="<%= usrFax %>"/>
	<input	type="hidden" name="f_cnt_cd" id="f_cnt_cd" value="<%= cnt_cd %>"/>
	
	<!--  Report ==> OutLook연동 파라미터 (S) -->
	<input type="hidden" name="rpt_biz_tp" id="rpt_biz_tp"/>
	<input type="hidden" name="rpt_biz_sub_tp" id="rpt_biz_sub_tp"/>
	<input type="hidden" name="rpt_trdp_cd"/>
	<!--  Report ==> OutLook연동 파라미터 (E) -->
	
	<!-- 개인정보 관리화면 정렬순서 2016.03  -->
	<input type="hidden" name="f_orderByInfo"  value="" />	
	
	<div class="page_title_area clear">
			<!-- page_title(S) -->
			<h2 class="page_title"><button type="button"><%=LEV3_NM%></button></h2>
			<!-- page_title(E) -->
			
			<!-- opus_design_btn(S) -->
			<div class="opus_design_btn TOP">
			 	<%-- 
				<button type="button" class="btn_accent" style="cursor:hand; display:none;" btnAuth="<%= roleBtnVO.getAttr1() %>" onclick="doWork('SEARCHLIST')"><bean:message key="Search"/></button> 
				<button type="button" class="btn_normal" style="cursor:hand; display:none;" btnAuth="<%= roleBtnVO.getAttr2() %>" onclick="doWork('NEWAR')"><bean:message key="New"/>(<bean:message key="AR"/>)</button> 
				<button type="button" class="btn_normal" style="cursor:hand; display:none;" btnAuth="<%= roleBtnVO.getAttr2() %>" onclick="doWork('NEWAP')"><bean:message key="New"/>(<bean:message key="AP"/>)</button> 
				<button type="button" class="btn_normal" style="cursor:hand; display:none;" btnAuth="<%= roleBtnVO.getAttr3() %>" id="btnModify" onclick="doWork('MODIFY')"><bean:message key="Save"/></button> 
				<button type="button" class="btn_normal" style="cursor:hand; display:none;" btnAuth="<%= roleBtnVO.getAttr4() %>" id="btnDelete" onclick="doWork('DELETE')"><bean:message key="Delete"/></button> 
				<button type="button" class="btn_normal" style="cursor:hand; display:none;" btnAuth="COPY" onclick="doWork('COPY')" id="btnCopy"><bean:message key="Copy"/></button> 
				<button type="button" class="btn_normal" style="cursor:hand; display:none;" btnAuth="DEPOSIT" onclick="doWork('DEPOSIT')"><bean:message key="Deposit"/></button> 
				<button type="button" class="btn_normal" style="cursor:hand; display:none;" btnAuth="B_CHECK" onclick="doWork('CHECK')"><bean:message key="B.Check"/></button> 
				<button type="button" class="btn_normal" style="cursor:hand; display:none;" id="btnPrint" btnAuth="<%= roleBtnVO.getAttr5() %>" onclick="doWork('PRINT')"><bean:message key="Print"/></button> 
				<button type="button" class="btn_normal" style="display:none;" btnAuth="<%= roleBtnVO.getAttr6() %>" onclick="doWork('EXCEL')" name="btn_DownExcel"><bean:message key="Excel"/></button> 
		    	<button type="button" class="btn_normal" style="display:none;" btnAuth="<%= roleBtnVO.getAttr6() %>" onclick="doWork('EXCEL_ALL')" name="btn_DownExcel"><bean:message key="Excel"/> (ALL)</button> 
				<button type="button" class="btn_normal" style="cursor:hand; display:none;" btnAuth="B_ACCOUNT_SLIP" onclick="doWork('SLIP')"><bean:message key="B.Account_Slip"/></button> 
				<button type="button" class="btn_normal" style="cursor:hand; display:none;" btnAuth="INV_HISTORY" onclick="doWork('INV_HIS')"><bean:message key="History"/></button> 
				<button type="button" class="btn_normal" style="cursor:hand; display:none;" btnAuth="CLEAR" onclick="clearAll();"><bean:message key="Clear"/></button>
				--%>
			</div>
			<!-- opus_design_btn(E) -->
    
  			<!-- page_location(S) -->
			<div class="location">	
				 <span><%=LEV1_NM%></span> &gt;
			 	 <span><%=LEV2_NM%></span> &gt;
			  	 <span><%=LEV3_NM%></span>
		   		<a href="" class="ir">URL Copy</a>
			</div>
			<!-- page_location(E) -->
	</div>
    <!-- page_title_area(E) -->
	
	<!-- inquiry_area(S) -->	
<div class="over_wrap" height="100%">
	<div class="wrap_search ">
		<div class="opus_design_inquiry entry_pannel">
			<table>	
					<colgroup>
				        	<col width="105">
				        	<col width="215">
				        	<col width="100">
				        	<col width="195">
				        	<col width="134">
				        	<col width="100">
				        	<col width="85">
				        	<col width="*">
				   </colgroup>
			        <tbody>
						<tr>
								<th>
								    <select name="s_date_type" class="search_form">
										<option value="PDT" selected><bean:message key="Post_Date"/></option>
										<option value="IDT"><bean:message key="Invoice_Date"/></option>
										<option value="DDT"><bean:message key="Due_Date"/></option>
									</select>
								</th>
								<td><!-- 
									--><input style="width:75px" type="text" name="s_post_strdt" id="s_post_strdt" onKeyUp="mkDateFormatType(this, event, false,1);if(event.keyCode==13){firCalFlag=true;};" onBlur="chkCmprPrd(firCalFlag, false, this, this, frm1.s_post_enddt);firCalFlag=false;" onFocus="select();" size='11' maxlength="10" class="search_form"><span class="dash">~</span><!-- 
									--><input style="width:75px" type="text" name="s_post_enddt" id="s_post_enddt" onKeyUp="mkDateFormatType(this, event, false,1);if(event.keyCode==13){firCalFlag=true;};" onBlur="chkCmprPrd(firCalFlag, false, this, frm1.s_post_strdt, this);firCalFlag=false;" onFocus="select();" size='11' maxlength="10" class="search_form"><!-- 
									--><button type="button" class="calendar" tabindex="-1" name="eta_dt_cal" id="s_post_dt_cal" onclick="doDisplay('DATE1', frm1);"></button>
								</td>
								<th><bean:message key="Vendor"/></th>
		                        <td><!-- 
						            --><input type="text" name="s_bill_to_cd" id="s_bill_to_cd" maxlength="20" value="" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:50px" onKeyDown="codeNameAction('BILLTO',this, 'onKeyDown')" onBlur="codeNameAction('BILLTO',this, 'onBlur')" class="search_form"><!-- 
						            --><button type="button" class="input_seach_btn" tabindex="-1" id="billto" onClick="doWork('CUSTOMER_POPLIST')"></button><!--
						            --><input type="text" name="s_bill_to_nm" id="s_bill_to_nm" maxlength="50" value="" dataformat="multiLanguage" style="ime-mode:disabled; text-transform:uppercase;width:120px" onKeyDown="custEnterAction(this,'CUSTOMER_NAME')" class="search_form">
		                        </td>
								<th><bean:message key="Type"/></th>
								<td>
									<select name="s_sell_buy_tp_cd" id="s_sell_buy_tp_cd" style="width:100px;">
										<option value="">ALL</option>
										<option value="S"><bean:message key="AR"/></option>
										<option value="B"><bean:message key="AP"/></option>
									</select>
								</td>
								<th><bean:message key="Office"/></th>
		                        <td>
		                            <bean:define id="oficeList" name="valMap" property="ofcList"/>
		                            <select required name="s_ofc_cd" id="s_ofc_cd" style="width:100px;">
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
			
			<table>	
					<colgroup>
				        	<col width="105">
				        	<col width="215">
				        	<col width="100">
				        	<col width="140">
				        	<col width="121">
				        	<col width="*">
				   </colgroup>
			        <tbody>
							<tr>
								<th><bean:message key="Invoice_No"/></th>
								<td><!-- 
									--><input type="hidden" name="s_inv_seq" id="s_inv_seq"><!-- 
									--><input type="text" name="s_inv_no" id="s_inv_no"  maxlength="50" value="" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:203px;text-transform:uppercase;" onBlur="strToUpper(this);">
								</td>
								<th><bean:message key="Amount"/></th>
								<td><!-- 
									--><input type="text" name="s_amt_fr" id="s_amt_fr" onkeyPress="onlyNumberCheck('-.');" onKeyUp="if(event.keyCode==13){firAmtFlag=true;};" onBlur="chkCmprAmt(firAmtFlag, false, this, this, frm1.s_amt_to);firAmtFlag=false;" onchange="addComma(this);setAmount();" maxlength="13" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:100px;text-align:right;"><span class="dash">~</span><!-- 
									--><input type="text" name="s_amt_to" id="s_amt_to" onkeyPress="onlyNumberCheck('-.');" onKeyUp="if(event.keyCode==13){firAmtFlag=true;};" onBlur="chkCmprAmt(firAmtFlag, false, this, frm1.s_amt_fr, this);firAmtFlag=false;" onchange="addComma(this);" maxlength="13" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:100px;text-align:right;">
								</td>
								<th><bean:message key="Last_CK_No"/></th>
								<td><input type="text" name="s_last_chk_no" id="s_last_chk_no" value="" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:100px;text-transform:uppercase;" onBlur="strToUpper(this);"></td>
								<td></td>
							</tr>
				</tbody>
			</table>
		</div>	
	</div>
	<!-- inquiry_area(E) -->
	
	<!-- grid_area(S) -->
	<div class="wrap_result">
		<div class="opus_design_grid" id="mainTable">
			<script type="text/javascript">comSheetObject('sheet1');</script>
		</div> 
		<!--- Paging(공통) --->
        <table>
            <tr>
                <td width="60">
            <!--- Display option Begin --->
                    <bean:define id="pagingVal" name="valMap"     property="paging"/>
                    <paging:options name="pagingVal" defaultval="200"/>
            <!--- Display option End --->                 
                </td>
                <td align="center">
                    <table>
                        <tr>
                            <td id="pagingTb" align="center" class="paging" height="10" valign="bottom"></td>
                            <td width="60"></td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
        <div class="opus_design_grid" style="width:57%"><%@include file="/apps/fis/cmm/mem/jsp/CMM_MEM_0010.jsp"%></div>
	</div>
	<!-- grid_area(E) -->
</div>
	</form>
	
<script type="text/javascript">
	doBtnAuthority("<%= roleBtnVO.getAttr_extension() %>");
</script>

