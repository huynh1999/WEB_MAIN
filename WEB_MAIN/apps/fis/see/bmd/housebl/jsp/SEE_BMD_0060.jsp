<%
/*=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : SEE_BMD_0060.jsp
*@FileTitle  : Booking And House B/L Search 
*@author     : CLT
*@version    : 1.0
*@since      : 2014/06/16
=========================================================*/
%>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="clt-paging"   prefix="paging" %>
	<!-- 공통 Header -->
	<%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
	<title><bean:message key="system.title"/></title>
	<!-- 일자 및 달력팝업 호출 -->
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/SEA_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="./apps/fis/see/bmd/housebl/script/SEE_BMD_0060.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/apps/fis/see/bmd/housebl/script/BL_CODE_UTIL.js?ver=<%=CLT_JS_VER%>"></script>

	<bean:define id="valMap"  name="EventResponse" property="mapVal"/>

	<script type="text/javascript">
	
		// 51974 [BNX, ZEN] Invoice Create/Edit 권한 추가, Other Office View/Edit 권한 추가
		var ofc_cd = "<%= userInfo.getOfc_cd() %>";
		var edob_flg = "<%= userInfo.getEdob_flg() %>";	
		var uod_flg ="<%= userInfo.getUod_flg()%>"
		var usrDept = "<%=userInfo.getDept_cd()%>";
		var usrId = "<%= userInfo.getUsrid() %>";
		var usrNm = "<%= userInfo.getUser_name() %>";
		//#6837 : [JAPT] B/L Type column add request on BL List
		<% boolean isBegin = false; %>
		<bean:define id="blTypeList"  name="valMap" property="blTypeList"/>
		<logic:iterate id="bltypeVO" name="blTypeList">
			<% if (isBegin) { %>
				COMBOBLTypeTEXT+= '|';
				COMBOBLTypeCODE+= '|';
			<% } else {
				  isBegin = true;
			   } %>
		   	COMBOBLTypeTEXT+= '<bean:write name="bltypeVO" property="cd_nm"  filter="false"/>';
		   	COMBOBLTypeCODE+= '<bean:write name="bltypeVO" property="cd_val" filter="false"/>';
		</logic:iterate>
		function setupPage(){
			loadPage(); 
		}
		
		var isMng = <bean:write name="valMap" property="isMng"/>;
		<bean:define id="officeInfo" name="valMap" property="officeInfo"/>
	       <bean:define id="ofcVO" name="officeInfo"/>
		var sea_body = "<bean:write name="ofcVO" property="sea_body"/>";
		// #3942 [Impex] Preliminary Claim add to Export
		var oi_cgor_pic_info = "<bean:write name="ofcVO" property="oi_cgor_pic_info"/>";
		var user_ofc_cnt_cd = "<%=userInfo.getOfc_cnt_cd()%>";
		var prn_ofc_cd = "<%=(String)application.getAttribute("PRNT_OFC_CD")%>";
	</script>
	<%
		String ofc_cd		= userInfo.getOfc_cd();
		String ofc_eng_nm = userInfo.getOfc_eng_nm();
		String usrNm = userInfo.getUser_name();
		String phn = userInfo.getPhn();
		String fax = userInfo.getFax();
		String email = userInfo.getEml();
	%>

	<form name="frm1" method="POST" action="./SEE_BMD_0060.clt">
		<input type="hidden" name="f_cmd">
	    <input type="hidden" name="f_CurPage"> 
	    
		<!-- 세션 유저 정보  -->
		<input	type="hidden" name="f_usr_nm" value="<%= usrNm %>"/>
		<input	type="hidden" name="f_phn" value="<%= phn %>"/>
		<input	type="hidden" name="f_fax" value="<%= fax %>"/>
		<input	type="hidden" name="f_email" value="<%= email %>"/>
		<input	type="hidden" name="u_ofc_cd" value="<%= ofc_cd %>"/>
		<input	type="hidden" name="f_ofc_nm" value="<%= ofc_eng_nm %>"/>
	
	    <!-- Report Value -->
		<input type="hidden" name="title" value="">
		<input type="hidden" name="file_name" value="">
		<input type="hidden" name="rd_param" value="">
		<input type="hidden" name="mailTitle" value="">
		<input type="hidden" name="mailTo" value="">
		<input type="hidden" name="intg_bl_seq" value="">
		<input type="hidden" name="rlt_intg_bl_seq" value="">
		<input type="hidden" name="s_intg_bl_seq" value="">
		<input type="hidden" name="master_bl_no" value=""> 
		<input type="hidden" name="house_bl_no" value=""> 
		
		<input type="hidden" name="f_intg_bl_seq" id="f_intg_bl_seq" />
		<!--  Report ==> OutLook연동 파라미터 (S) -->
		<input type="hidden" name="rpt_biz_tp"/>
		<input type="hidden" name="rpt_biz_sub_tp"/>
		<!--  Report ==> OutLook연동 파라미터 (E) -->
		
		<!--  select 조건 추가 combo로 적용 -->
		<input type="hidden" name="f_lc_no"/>
		<input type="hidden" name="f_inv_no"/>
		<input type="hidden" name="f_lnr_bkg_no"/>
		
		<!-- GridSetting Value -->
		<input type="hidden" name="user_id"  value="<%=userInfo.getUsrid()%>" />
		<input type="hidden" name="pageurl" id="pageurl" value="SEE_BMD_0060.clt"/>
		
		<!-- 개인정보 관리화면 정렬순서 2016.03  -->
		<input type="hidden" name="f_orderByInfo"  value="" />
		
		<!-- #944 : <!-- #18782 : [BINEX, GPL] OBL RCV and Release update function (From BL List) --> 
		<input id="f_rlsd_flg" name="f_rlsd_flg" value="" type="hidden" />
		<input id="r_intg_bl_seq" name="r_intg_bl_seq" value="" type="hidden" />
		<input id="f_rlsd_dt_tm" name="f_rlsd_dt_tm" value="" type="hidden" />
		
		<input id="linkFlag" name="linkFlag"  value="<bean:write name="valMap" property="linkFlag"/>" type="hidden" />
	
		<div class="page_title_area clear">
				<!-- page_title(S) -->
				<h2 class="page_title"><button type="button"><%=LEV3_NM%></button></h2>
				<!-- page_title(E) -->
				
					
				<!-- opus_design_btn(S) -->
				<div class="opus_design_btn TOP">
					<%-- <!-- 
					--><button type="button" class="btn_accent" style="cursor:hand; display:none;" btnAuth="<%= roleBtnVO.getAttr1() %>" onclick="document.frm1.f_CurPage.value='';doWork('SEARCHLIST')" name="btnSearch"><bean:message key="Search"/></button><!-- 
					--><button type="button" class="btn_normal" style="cursor:hand; display:none;" btnAuth="<%= roleBtnVO.getAttr1() %>" onclick="doWork('MODIFY')" name="btnModify"><bean:message key="Save"/></button><!--
					--><button type="button" class="btn_normal" style="cursor:hand; display:none;" btnAuth="<%= roleBtnVO.getAttr2() %>"  onClick="doWork('NEW');" name="btnNew"><bean:message key="New"/></button><!-- 
					--><button type="button" class="btn_normal" style="cursor:hand; display:none;" btnAuth="CLEAR" onClick="clearAll();"><bean:message key="Clear"/></button><!-- 
					--><button type="button" class="btn_normal" style="cursor:hand; display:none;" btnAuth="COPY" id="btnCopy" onClick="doWork('COPY');"><bean:message key="Copy"/></button><!-- 
					--><button type="button" class="btn_normal" style="cursor:hand; display:none;" btnAuth="<%= roleBtnVO.getAttr5() %>"  id="btnPrint"  onClick="doWork('PRINT');"><bean:message key="Print"/></button><!-- 
					--><button type="button" class="btn_normal" style="cursor:hand; display:none;" btnAuth="HI_PRINT" id="btnHiPrint"  onclick="doWork('HI_PRINT')"><bean:message key="Hawaii_Print"/></button><!--
					--><button type="button" class="btn_normal" style="cursor:hand; display:none;" btnAuth="LABEL" onclick="doWork('PACKAGE_LABEL')"><bean:message key="Label"/></button><!-- 
					--><button type="button" class="btn_normal" style="cursor:hand; display:none;" btnAuth="LABEL2" onclick="doWork('PACKAGE_LABEL2')"><bean:message key="Label"/>2</button><!--					
					--><button type="button" class="btn_normal" style="cursor:hand; display:none;" btnAuth="ACCOUNTING" id="btnAccounting" onclick="doWork('GOTOACCT')"><bean:message key="Accounting"/></button><!-- 
					--><button type="button" class="btn_normal" style="cursor:hand; display:none;" btnAuth="VERIFICATION"  id="btnVerification" onclick="doWork('GOTOVERIFY')"><bean:message key="Payment_Verify"/></button><!--
					--><button type="button" class="btn_normal" style="cursor:hand; display:none;" btnAuth="B_CONFIRM" onclick="doWork('BOOKING_CONFIRMATION')"><bean:message key="B.CONFIRM"/></button><!-- 
					--><button type="button" class="btn_normal" style="cursor:hand; display:none;" btnAuth="B_SA" onClick="doWork('ShippingAdvice');"><bean:message key="B.SA"/></button><!-- 
					--><button type="button" class="btn_normal" style="cursor:hand; display:none;" btnAuth="B_AES" onClick="doWork('AES');"><bean:message key="B.AES"/></button><!-- 
					--><button type="button" class="btn_normal" style="cursor:hand; display:none;" btnAuth="D_RECEIPT" onClick="doWork('DockReceipt');"><bean:message key="D.Receipt"/></button><!-- 
					--><button type="button" class="btn_normal" style="cursor:hand; display:none;" btnAuth="USDA" onClick="doWork('USDA_HEAT_TREATMENT');"><bean:message key="USDA"/></button><!-- 
					--><button type="button" class="btn_normal" style="cursor:hand; display:none;" btnAuth="P_REPORT" onClick="doWork('PROFIT_REPORT');"><bean:message key="P_Report"/></button><!-- 
					--><button type="button" class="btn_normal" style="cursor:hand; display:none;" btnAuth="LOG" onClick="doWork('LOG');"><bean:message key="LOG"/></button><!-- 
					--><button type="button" class="btn_normal" style="cursor:hand; display:none;" btnAuth="<%= roleBtnVO.getAttr6() %>" onClick="doWork('EXCEL');" name="btn_DownExcel"><bean:message key="Excel"/></button><!-- 
					--><button type="button" class="btn_normal" style="display:none;" btnAuth="<%= roleBtnVO.getAttr6() %>" onclick="doWork('EXCEL_ALL')" name="btn_DownExcel"><bean:message key="Excel"/> (ALL)</button><!-- 
		    		--><button type="button" class="btn_normal" style="cursor:hand; display:none;" btnAuth="<%= roleBtnVO.getAttr4() %>" onClick="doWork('DELETE');"><bean:message key="Delete"/></button> --%>
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
		<div class="over_wrap" height="100%">
			<!-- inquiry_area(S) -->	
			<div class="wrap_search">
				<div class="opus_design_inquiry src_pannel">
					<table>	
						<colgroup>
					        <col width="100">
				        	<col width="100">
				        	<col width="80">
				        	<col width="100">
				        	<col width="80">
				        	<col width="100">
				        	<col width="120">
				        	<col width="100">
				        	<col width="80">
				        	<col width="*">
					   </colgroup>
					        <tbody>
								<tr>
	                            	<th><bean:message key="Ref_No"/></th>
	                                <td>
	                                    <input type="text" name="f_ref_no" id="f_ref_no" maxlength="20" value="<bean:write name="valMap" property="f_ref_no"/>" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:100px;" onkeydown="entSearch();"/>
	                                </td>
	                                <th><bean:message key="MBL_No"/></th>
	                                <td>
	                                    <input type="text" name="f_mbl_no"  id="f_mbl_no" maxlength="40" value="<bean:write name="valMap" property="f_mbl_no"/>" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:100px;" onkeydown="entSearch();"/>
	                                </td>
		                            <th><bean:message key="HBL_No"/></th>
		                            <td>
		                                <input type="text" name="f_hbl_no" id="f_hbl_no" maxlength="40" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:100px;" onkeydown="entSearch();"/>
		                            </td>
		                            <th><bean:message key="Liner_Bkg_No"/></th>
		                            <td>
		                                <input type="text" name="f_bkg_no" id="f_bkg_no" maxlength="40" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:100px;" onkeydown="entSearch();"/>
		                            </td>
		                            
	                                <th><bean:message key="Office"/></th>
	                                <td><bean:define id="oficeList" name="valMap" property="ofcList"/>
	                                    <input  type="hidden" name="s_ofc_cd" id="s_ofc_cd" value="<bean:write name="valMap" property="ofc_cd"/>"/> 
	                                    <select name="f_ofc_cd" id="f_ofc_cd" style="width:100px">
		                                    <bean:size id="len" name="oficeList" />
		                                    <logic:greaterThan name="len" value="1">
		                                    <option value=''>ALL</option>
		                                    </logic:greaterThan>
		                                   	<logic:iterate id="ofcVO" name="oficeList">
		                                        <%-- <option value='<bean:write name="ofcVO" property="ofc_cd"/>'><bean:write name="ofcVO" property="ofc_cd"/></option> --%>
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
					<span class="buttonset fr">
						<button type="button" class="de-search" id="logDetailSearch">Detailed Search</button> 
					</span>
				</div>	
				
				<div class="opus_design_inquiry tbl_pannel">
					<table>	
					<colgroup>
				        <col width="105">
			        	<col width="80">
			        	<col width="80">
			        	<col width="130">
			        	<col width="130">
			        	<col width="70">
			        	<col width="80">
			        	<col width="100">
			        	<col width="80">
						<!-- 8056 -->
						<col width="110">
			        	<col width="*">	
			        </colgroup>	       
			        	 <tbody>
	                            <tr>
	                            	<th><bean:message key="Container"/></th>
	                                <td>
	                                    <input type="text" name="f_cntr_no" id="f_cntr_no" maxlength="20" value="<bean:write name="valMap" property="f_cntr_no"/>" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:100px;" onkeydown="entSearch();"/>
	                                </td>
		                            <th><bean:message key="Consignee"/></th>
		                            <td><!-- 
		                                --><input type="text" name="f_cnee_trdp_nm" id="f_cnee_trdp_nm" maxlength="50" class="search_form" dataformat="multiLanguage" style="<%=MULTI_IMEMODE%>text-transform:uppercase;width:115px;" onKeyPress="if(event.keyCode==13){doWork('CNEE_TRDP_POPLIST', frm1.f_cnee_trdp_nm.value);}"/><!--
									    --><button type="button" class="input_seach_btn" tabindex="-1" onclick="doWork('CNEE_TRDP_POPLIST')"></button>
		                            </td>
		                            <td align="right"><!-- 
		                                --><select name="f_tp_type" id="f_tp_type"  style="width:135px; font-weight: bold;" onChange="searchValueClear(this);"><!--
										    --><option selected='selected'value='SHP'><bean:message key="Shipper"/></option><!--
										    --><option value='CUS'><bean:message key="Customer"/></option><!--
										    --><option value='NOT'><bean:message key="Notify"/></option><!--
										    --><option value='PAR'><bean:message key="Partner"/></option><!--
										    --><option value='CBR'><bean:message key="Customer"/>&nbsp;<bean:message key="Broker"/></option><!--
										    --><option value='CAR'><bean:message key="Carrier"/></option><!--
										--></select><!--
							   	        --><button type="button" class="input_seach_btn" tabindex="-1"  onclick="doWork('PRNR2_TRDP_POPLIST')"></button>
									</td>
		                            <td>
		                                <input type="text" name="f_prnr_trdp_nm" id="f_prnr_trdp_nm" maxlength="50"  class="search_form" dataformat="multiLanguage" style="<%=MULTI_IMEMODE%>text-transform:uppercase;width:151px;" onKeyPress="if(event.keyCode==13){doWork('PRNR2_TRDP_POPLIST', frm1.f_prnr_trdp_nm.value);}"/>
		                            </td>
		                            <th><bean:message key="PO_No"/></th>
		                            <td>
		                            	<input type="text" id="f_po_no" name="f_po_no" maxlength="20" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:100px;" onkeydown="entSearch();"/>
		                            </td>
		                            <td>
									    <select name="f_date_type" id="f_date_type"  style="width:130px; font-weight: bold;" onChange="searchValueClear(this);">
										     <option value='ETD'><bean:message key="ETD"/></option>
										     <option value='ETA'><bean:message key="ETA"/></option>
										     <option value='PDT'><bean:message key="Post_Date"/></option>
										     <option value='DCT'><bean:message key="DOC_Cut_Off_Date"/></option>
										</select><!-- 
									--><input type="text" id="f_strdt" name="f_strdt" style="width:75px;" size='10' maxlength="10" class="search_form" dataformat="mdy" onBlur="chkCmprPrd(firCalFlag, false, this, this, frm1.f_enddt);mkDateFormatType(this,event,true,1);" onFocus="select();"><span class="dash">~</span><!--
									--><input type="text" id="f_enddt" name="f_enddt" style="width:75px;" size='10' maxlength="10" class="search_form" dataformat="mdy" onBlur="chkCmprPrd(firCalFlag, false, this, frm1.f_strdt, this);mkDateFormatType(this,event,true,1);" onFocus="select();"><!--
									--><button type="button" class="calendar" tabindex="-1" name="f_strdt_cal" id="f_strdt_cal" onclick="doDisplay('DATE11', frm1);"></button>
									</td>
									<!-- OFVFOUR-8056: [BNX-LA] Adding Search option in AR/AP list and OIH List screen -->
									<th style="text-align:center; width:80px;"><bean:message key="Commodity"/></th>
									<td>
										<input type="text" id="f_cmdt_nm" name="f_cmdt_nm" maxlength="20" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:130px;" onkeydown="entSearch();"/>
										<button type="button" name="commodity" id="commodity" class="input_seach_btn" tabindex="-1" onClick="openPopUp('COMMODITY_POPLIST',this)"></button>
										<input type="hidden" id="f_cmdt_cd" name="f_cmdt_cd" maxlength="20" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:130px;" onkeydown="entSearch();"/>
									</td>
									<td></td>
	                            </tr>
						</tbody>
					</table>
					</div>
				
	            <div class="opus_design_inquiry tbl_pannel">
				<table id="searchMore" style="display: none;">
					<colgroup>
				        <col width="105">
			        	<col width="160">
			        	<col width="93">
			        	<col width="160">
			        	<col width="93">
			        	<col width="160">
			        	<col width="85">
			        	<col width="160">
			        	<col width="85">
			        	<col width="*">
				   </colgroup>
				        <tbody>
							<tr>
	                            <th style="text-align:right"><bean:message key="Vessel"/></th>
	                            <td>
								    <input type="text" name="f_trnk_vsl_nm"  id="f_trnk_vsl_nm" maxlength="50" value='' class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:100px;" onkeydown="entSearch();"> 
				     		    </td>
	                            <td align="right"><!-- 
	                                --><select name="f_no_type" id="f_no_type"  style="width:135px; font-weight: bold;" onChange="searchValueClear(this);"><!--
									    --><option selected='selected'value='LC'><bean:message key="LC_No"/></option><!--
									    --><option value='INV'><bean:message key="Inv_No"/></option><!--
									    --><option value='BKG'><bean:message key="Liner_Bkg"/></option><!--
									    --><option value='TLI'><bean:message key="TLI_NO"/></option>
									--></select>
								</td>
	                            <td>
	                                <input type="text" name="f_no" id="f_no" maxlength="50"  class="search_form" dataformat="multiLanguage" style="<%=MULTI_IMEMODE%>text-transform:uppercase;width:120px;" onkeydown="entSearch();"> 
	                            </td>
								<th><bean:message key="Incoterms"/></th>
									<td><bean:define id="incotermsList" name="valMap" property="incotermsList"/>
										<select name="f_inco_cd" style="width:52px">
											<option value=''>ALL</option>
											<logic:iterate id="comVO" name="incotermsList">
											<option value='<bean:write name="comVO" property="cd_val"/>'><bean:write name="comVO" property="cd_nm"/></option>
											</logic:iterate>
										</select>
									</td>
								<th><bean:message key="Ship_Mode"/></th>
									<td>
										<bean:define id="shipModeList" name="valMap" property="shipModeList"/>
										<select name="f_shp_mod_cd"  id="f_shp_mod_cd" style="width:59px">
											<option value=''>ALL</option>
											<logic:iterate id="comVO" name="shipModeList">
											<option value='<bean:write name="comVO" property="cd_val"/>'><bean:write name="comVO" property="cd_nm"/></option>
											</logic:iterate>
										</select>
									</td>
							    <td align="right"><!-- 
	                                --><select name="f_isb_pic_sel_cd" id="f_isb_pic_sel_cd"  style="width:100px; font-weight: bold;" onChange="searchValueClear(this);"><!--
									    --><option value='OR'><bean:message key="Issued_By"/> Or <bean:message key="Sales_PIC"/></option><!--
									    --><option value='ISB'><bean:message key="Issued_By"/></option><!--
									    --><option value='PIC'><bean:message key="Sales_PIC"/></option><!--
									--></select>
								</td>
								<td>
								    <input type="text" name="opr_usrid" style="width:80px;"><!-- 
									--><button type="button" name="oprBtn" id="oprBtn" class="input_seach_btn" tabindex="-1" onClick="doWork('OPR_POPLIST')"></button>
	                                <input type="hidden" name="proc_usrnm" class="search_form-disable" readOnly style="width:120px;">
	                                <input type="hidden" name="opr_usrnm">
									<input type="hidden" name="opr_ofc_cd">
									<input type="hidden" name="opr_dept_cd">		
									<input type="hidden" name="sls_tp_cd">
			                    </td>
				     		</tr>
						    <tr>
	                            <th><bean:message key="POR"/></th>
								<td><!--
	                            --><input type="text"   name="f_por_cd" id="f_por_cd" maxlength="5"    value='' class="search_form" onKeyDown="codeNameAction_OEH('location_por',this, 'onKeyDown')" onBlur="codeNameAction_OEH('location_por',this, 'onBlur');" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:55px;"/><!--
	                            --><button type="button" class="input_seach_btn" tabindex="-1" onclick="doWork('POR_LOCATION_POPLIST')"></button><!--
	                            --><input type="text"   name="f_por_nm"  maxlength="50"  class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:110px;" onKeyPress="if(event.keyCode==13){doWork('POR_LOCATION_POPLIST', frm1.f_por_nm.value);}"/>
	                            </td>
	                            <th><bean:message key="POL"/></th>
								<td><!--
	                            --><input type="text"   name="f_pol_cd" id="f_pol_cd" maxlength="5"    value='' class="search_form" onKeyDown="codeNameAction_OEH('location_pol',this, 'onKeyDown')" onBlur="codeNameAction_OEH('location_pol',this, 'onBlur');" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:55px;"/><!--
	                            --><button type="button" class="input_seach_btn" tabindex="-1" onclick="doWork('POL_LOCATION_POPLIST')"></button><!--
	                            --><input type="text"   name="f_pol_nm"  maxlength="50"  class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:110px;" onKeyPress="if(event.keyCode==13){doWork('POL_LOCATION_POPLIST', frm1.f_pol_nm.value);}"/>
	                            </td>
	                            <th><bean:message key="POD"/></th>
								<td><!--
	                            --><input type="text"   name="f_pod_cd" id="f_pod_cd" maxlength="5"    value='' class="search_form" onKeyDown="codeNameAction_OEH('location_pod',this, 'onKeyDown')" onBlur="codeNameAction_OEH('location_pod',this, 'onBlur');" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:55px;"/><!--
	                            --><button type="button" class="input_seach_btn" tabindex="-1" onclick="doWork('POD_LOCATION_POPLIST')"></button><!--
	                            --><input type="text"   name="f_pod_nm"  maxlength="50"  class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:110px;" onKeyPress="if(event.keyCode==13){doWork('POD_LOCATION_POPLIST', frm1.f_pol_nm.value);}"/>
	                            </td>
	                            <th><bean:message key="DEL"/></th>
								<td><!--
	                            --><input type="text"   name="f_del_cd" id="f_del_cd" maxlength="5"    value='' class="search_form" onKeyDown="codeNameAction_OEH('location_del',this, 'onKeyDown')" onBlur="codeNameAction_OEH('location_del',this, 'onBlur');" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:55px;"/><!--
	                            --><button type="button" class="input_seach_btn" tabindex="-1" onclick="doWork('DEL_LOCATION_POPLIST')"></button><!--
	                            --><input type="text"   name="f_del_nm"  maxlength="50"  class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:110px;" onKeyPress="if(event.keyCode==13){doWork('DEL_LOCATION_POPLIST', frm1.f_del_nm.value);}"/>
	                            </td>
	                             <!-- OFVFOUR-7105 [JAPAN TRUST] Adding "Original B/L Type" Column and Search on B/L List -->
	                            <th><bean:message key="OBL_Type"/></th>
	                      		<td>
	                                <bean:define id="oblCdList" name="valMap" property="oblCdList"/>
	                                <select name="f_obl_tp_cd" class="search_form" style="width:100px;">
	                                    <option value="">ALL</option>
	                                    <logic:iterate id="oblCdList" name="oblCdList">
	                                        <option value='<bean:write name="oblCdList" property="cd_val"/>'><bean:write name="oblCdList" property="cd_nm"/></option>
	                                    </logic:iterate>
	                                </select>
	                            </td>
	                            <td></td><td></td>
						    </tr>
						</tbody>
					</table>
	        	</div>  
			</div>
			<!-- inquiry_area(E) -->
		
			<!-- grid_area(S) -->
			<div class="wrap_result">
					<!-- grid_area1(S) -->	
					
				<div class="opus_design_inquiry">
					<div class="opus_design_grid" id="mainTable">
						<h3 class="title_design"><bean:message key="HBL_List"/></h3>
						<div class="opus_design_btn"> 
							<button  onClick="setHblSizeUp(docObjects[0])" style="cursor:hand" type="button" class="btn_normal"><bean:message key="Plus"/></button>
							<button onClick="setHblSizeDown(docObjects[0])" style="cursor:hand" type="button" class="btn_normal"><bean:message key="Minus"/></button></td>
						</div>
						<script type="text/javascript">comSheetObject('sheet1');</script>
					</div>
					<div> 
			              <table>
			              	<tr>
									<td width="100">
										<bean:define id="tmpMapVal" name="EventResponse" property="mapVal"/>
										<bean:define id="pagingVal" name="tmpMapVal"     property="paging"/>
										<paging:options name="pagingVal" defaultval="200"/>
									</td>
									<td align="center" width="900">
										<table width="900">
											<tr>
												<td width="900" id="pagingTb" style='font-family: "Tahoma", "Arial", "Verdana";font-size: 11px;'>
												</td>
											</tr>
										</table>		
									</td>
									<td width="100"></td>
								</tr>
			              </table>
			         </div>
		     	</div>
					
					<!-- grid_area2(S) -->	
					<h3 class="title_design"><bean:message key="MBL_List"/></h3>
					<div class="opus_design_grid" id="mainTable">
						<script type="text/javascript">comSheetObject('sheet2');</script>
					</div> 
					<!-- grid_area2(E) -->	
					
					<div class="opus_design_grid" style="width:57%"><%@include file="/apps/fis/cmm/mem/jsp/CMM_MEM_0010.jsp"%></div>	  
					
			   </div>
			   <!-- grid_area(E) -->	
		</div>	   
    </form>
		
<script type="text/javascript">
	doBtnAuthority("<%= roleBtnVO.getAttr_extension() %>");
</script>	