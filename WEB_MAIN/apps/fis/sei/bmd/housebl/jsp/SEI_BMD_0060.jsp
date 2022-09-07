<%
/*=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : SEI_BMD_0060.jsp
*@FileTitle  : House B/L Search 
*@author     : CLT
*@version    : 1.0
*@since      : 2014/06/10
=========================================================*/
%>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="clt-paging"   prefix="paging" %>
	<!-- 공통 Header -->
	<%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
	<!-- 일자 및 달력팝업 호출 -->
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/SEA_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="./apps/fis/sei/bmd/housebl/script/SEI_BMD_0060.js?ver=<%=CLT_JS_VER%>"></script>

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
        
        <!-- ###Office Info## -->
	    <bean:define id="officeInfo" name="valMap" property="officeInfo"/>
	    <bean:define id="ofcVO" name="officeInfo"/>	    	    
	    var oi_cgor_pic_info = "<bean:write name="ofcVO" property="oi_cgor_pic_info"/>";
	    <bean:define id="ofcVOS" name="officeInfo"/>
	    
    </script>
	<form name="frm1" method="POST" action="./SEI_BMD_0060.clt">
	<input id="f_cmd" name="f_cmd" type="hidden" />
    <input id="f_CurPage" name="f_CurPage" type="hidden" />

	<!-- Report Value -->
	<input id="title" name="title" value="" type="hidden" />
	<input id="file_name" name="file_name" value="" type="hidden" />
	<input id="rd_param" name="rd_param" value="" type="hidden" />

	<input id="mailTitle" name="mailTitle" value="" type="hidden" />
	<input id="mailTo" name="mailTo" value="" type="hidden" />

	<input id="intg_bl_seq" name="intg_bl_seq" value="" type="hidden" />
	<input id="rlt_intg_bl_seq" name="rlt_intg_bl_seq" value="" type="hidden" />
	<input id="f_intg_bl_seq" name="f_intg_bl_seq" value="" type="hidden" />
	<input id="master_bl_no" name="master_bl_no" value="" type="hidden" />
	<input id="house_bl_no" name="house_bl_no" value="" type="hidden" />
	
	<!-- #50591 [BNX TORONTO] FREIGHT LOCATION인 RAIL 회사인 CN과 CP의 CONTAINER LIST 및 EXCEL 다운로드 화면 추가 -->
	<input id="f_cn_cp" name="f_cn_cp" value="" type="hidden" />
	
	<!-- GridSetting Value -->
	<input id="user_id" name="user_id" value="<%=userInfo.getUsrid()%>" type="hidden" />

	<!-- CCN Value -->
	<input id="f_email" name="f_email" value="<%=userInfo.getEml()%>" type="hidden" />
	<input id="f_phone" name="f_phone" value="<%=userInfo.getPhn()%>" type="hidden" />
	<input id="f_fax" name="f_fax" value="<%=userInfo.getFax()%>" type="hidden" />
	<input id="f_user_ofc_cd" name="f_user_ofc_cd" value="<%=userInfo.getOfc_cd()%>" type="hidden" />
	 
	<input id="use_hbl_ser" name="use_hbl_ser" value="<bean:write name="ofcVOS" property="use_hbl_ser"/>" type="hidden" />
	
	
	<input type="hidden" name="pageurl" id="pageurl" value="SEI_BMD_0060.clt"/>
	
	<!--  Document List ==> Common Memo 연동 파라미터 (S) -->
    <input type="hidden" name="palt_mnu_cd" id="palt_mnu_cd" />
    <input type="hidden" name="opr_no" id="opr_no" />
	<!--  Document List ==> Common Memo 연동 파라미터 (E) -->
	
	<!-- jsjang 2013.8.20 #17610 : [BINEX] 7. Email 전송 History -->
	<input type="hidden" name="rpt_intg_bl_seq"/>	
	
	<!-- #18782 : [BINEX, GPL] OBL RCV and Release update function (From BL List) -->
	<input id="f_rlsd_flg" name="f_rlsd_flg" value="" type="hidden" />
	<input id="r_intg_bl_seq" name="r_intg_bl_seq" value="" type="hidden" />
	<input id="f_rlsd_dt_tm" name="f_rlsd_dt_tm" value="" type="hidden" />
	<input id="f_org_bl_rcvd_flg" name="f_org_bl_rcvd_flg" value="" type="hidden" />
	<input id="f_rcvd_dt_tm" name="f_rcvd_dt_tm" value="" type="hidden" />
	
	<input id="linkFlag" name="linkFlag"  value="<bean:write name="valMap" property="linkFlag"/>" type="hidden" />
	
	<!-- 개인정보 관리화면 정렬순서 2016.03  -->
	<input type="hidden" name="f_orderByInfo"  value="" />	
	
	<div>
		<div class="page_title_area clear">
			<!-- page_title(S) -->
			<h2 class="page_title"><button type="button"><%=LEV3_NM%></button></h2>
			<!-- page_title(E) -->
			
			<!-- opus_design_btn(S) -->
			<div class="opus_design_btn TOP">
				<%-- <!-- 
				--><button type="button" class="btn_accent" style="cursor:hand; display:none;" btnAuth="<%= roleBtnVO.getAttr1() %>" onclick="document.frm1.f_CurPage.value='';doWork('SEARCHLIST')" name="btnSearch"><bean:message key="Search"/></button><!-- 
				--><button type="button" class="btn_normal" style="cursor:hand; display:none;" btnAuth="<%= roleBtnVO.getAttr2() %>" onclick="doWork('NEW')" name="btnNew"><bean:message key="New"/></button><!-- 
				--><button type="button" class="btn_normal" style="cursor:hand; display:none;" btnAuth="CLEAR" onClick="clearAll();"><bean:message key="Clear"/></button><!-- 
				--><button type="button" class="btn_normal" style="cursor:hand; display:none;" btnAuth="COPY"  id="btnCopy"  onClick="doWork('HBL_COPY');"><bean:message key="Copy"/></button><!-- 
				--><button type="button" class="btn_normal" style="cursor:hand; display:none;" btnAuth="ACCOUNTING" id="btnAccounting"  onclick="doWork('GOTOACCT')"><bean:message key="Accounting"/></button><!--
				--><button type="button" class="btn_normal" style="cursor:hand; display:none;" btnAuth="VERIFICATION"  id="btnVerification" onclick="doWork('GOTOVERIFY')"><bean:message key="Payment_Verify"/></button><!-- 
				--><button type="button" class="btn_normal" style="cursor:hand; display:none;" btnAuth="B_AN" onClick="doWork('ArrivalNotice');"><bean:message key="B.AN"/></button><!--
				--><button type="button" class="btn_normal" style="cursor:hand; display:none;" btnAuth="P_CL" onClick="doWork('PreliminaryClaim');"><bean:message key="P.CL"/></button><!-- 
				--><button type="button" class="btn_normal" style="cursor:hand; display:none;" btnAuth="CCN" onClick="doWork('CCN');"><bean:message key="CCN"/> <bean:message key="Print"/></button><!-- 
				--><button type="button" class="btn_normal" style="cursor:hand; display:none;" btnAuth="B_DO" onClick="doWork('DELIVERY_ORDER');"><bean:message key="B.DO"/></button><!-- 
				--><button type="button" class="btn_normal" style="cursor:hand; display:none;" btnAuth="REL_ORDER" onclick="doWork('RELEASE_ORDER')"><bean:message key="REL_Order"/></button><!-- 
				--><button type="button" class="btn_normal" style="cursor:hand; display:none;" btnAuth="B_IT_TE" onClick="doWork('ITNTE');"><bean:message key="B.IT_TE"/></button><!-- 
				--><button type="button" class="btn_normal" style="cursor:hand; display:none;" btnAuth="POD" onclick="doWork('P_O_D')"><bean:message key="POD"/></button><!-- 
				--><button type="button" class="btn_normal" style="cursor:hand; display:none;" btnAuth="C_CERTIFICATE" onClick="doWork('CERTIFICATE');"><bean:message key="C.Certificate"/></button><!-- 
				--><button type="button" class="btn_normal" style="cursor:hand; display:none;" btnAuth="USDA_HOLD" onclick="doWork('USDA_HOLD_NOTICE')"><bean:message key="USDA_Hold"/></button><!-- 
				--><button type="button" class="btn_normal" style="cursor:hand; display:none;" btnAuth="P_REPORT" onClick="doWork('PROFIT_REPORT');"><bean:message key="P_Report"/></button><!-- 
				--><button type="button" class="btn_normal" style="cursor:hand; display:none;" btnAuth="<%= roleBtnVO.getAttr3() %>"  id="btnModify" onClick="doWork('MODIFY');"><bean:message key="Save"/></button><!-- 
				--><button type="button" class="btn_normal" style="cursor:hand; display:none;" btnAuth="<%= roleBtnVO.getAttr6() %>" onClick="doWork('EXCEL');" name="btn_DownExcel"><bean:message key="Excel"/></button><!-- 
				--><button type="button" class="btn_normal" style="display:none;" btnAuth="<%= roleBtnVO.getAttr6() %>" onclick="doWork('EXCEL_ALL')" name="btn_DownExcel"><bean:message key="Excel"/> (ALL)</button><!-- 
		    	--><button type="button" class="btn_normal" style="cursor:hand; display:none;" btnAuth="<%= roleBtnVO.getAttr4() %>" onClick="doWork('DELETE');"><bean:message key="Delete"/></button><!-- 
				--><button type="button" class="btn_normal" style="cursor:hand; display:none;" btnAuth="PU_DI" onClick="doWork('WORK_ORDER');"><bean:message key="PU_DI"/></button><!-- 
				--><button type="button" class="btn_normal" style="cursor:hand; display:none;" btnAuth="LOG" onClick="doWork('LOG');"><bean:message key="LOG"/></button><!-- 
				--><button type="button" class="btn_normal" style="cursor:hand; display:none;" btnAuth="CN_EXCEL" onClick="doWork('CN');"><bean:message key="CN"/></button><!-- 
				--><button type="button" class="btn_normal" style="cursor:hand; display:none;" btnAuth="CP_EXCEL" onClick="doWork('CP');"><bean:message key="CP"/></button><!--
				--><button type="button" class="btn_normal" style="cursor:hand; display:none;" btnAuth="B_DO_VTM" onClick="doWork('DELIVERY_ORDER_VIETNAM');"><bean:message key="B.DO.VTM"/></button> --%> 
				
			</div>
			<!-- opus_design_btn(E) -->
			
  			<!-- page_location(S) -->
			<div class="location">	
				 <span><%=LEV1_NM%></span> &gt;
			 	 <span><%=LEV2_NM%></span> &gt;
			  	 <span><%=LEV3_NM%></span>
		   		<a href="" class="ir">URL Copy</a>
			</div>
		</div>
			<!-- page_location(E) -->
	</div>
	    <!-- page_title_area(E) -->
	
	<!-- inquiry_area(S) -->	
	<div class="over_wrap" height="100%">
		<div class="wrap_search">
			<div class="opus_design_inquiry src_pannel">
				<table>	
					<colgroup>
				        <col width="100">
			        	<col width="135">
			        	<col width="80">
			        	<col width="135">
			        	<col width="80">
			        	<col width="110">
			        	<col width="80">
			        	<col width="*">
				   </colgroup>
				        <tbody>
							<tr>
								<th><bean:message key="Ref_No"/></th>
								<td>
									<input type="text" name="f_ref_no" id="f_ref_no" maxlength="20" value="<bean:write name="valMap" property="f_ref_no"/>"  class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:100px;" onkeydown="entSearch();"/>
								</td>
								<th><bean:message key="MBL_No"/></th>
								<td>
									<input type="text" name="f_mbl_no" id="f_mbl_no" maxlength="40" value="<bean:write name="valMap" property="f_mbl_no"/>" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:99px;" onkeydown="entSearch();"/>
								</td>
								<th><bean:message key="HBL_No"/></th>
								<td>
									<input type="text" name="f_hbl_no" id="f_hbl_no" maxlength="40" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:99px;" onkeydown="entSearch();"/>
								</td>
								<th><bean:message key="Office"/></th>
								<td>
									<bean:define id="oficeList" name="valMap" property="ofcList"/>
									<input  type="hidden" name="s_ofc_cd"  id="s_ofc_cd" value="<bean:write name="valMap" property="ofc_cd"/>"/> 
									<select name="f_ofc_cd" id="f_ofc_cd" style= "width:65px;">
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
				<span class="buttonset fr">
					<button type="button" class="de-search" id="logDetailSearch">Detailed Search</button>
				</span>
		    </div>		    
	        <div class="opus_design_inquiry tbl_pannel">
					<table>	
					<colgroup>
				        <col width="105">
			        	<col width="135">
			        	<col width="80">
			        	<col width="160">
			        	<col width="130">
			        	<!-- OFVFOUR-7264 [SOUTH EAST WORLD WIDE] ADDING PO NO. SEARCH OPTION IN OIH B/L LIST -->
			        	<col width="105">
			        	<col width="135">
			        	<col width="70">
			        	<col width="40">
						<!-- OFVFOUR-8056: [BNX-LA] Adding Search option in AR/AP list and OIH List screen -->
						<col width="110">
			        	<col width="*">
			        </colgroup>	       
			        	 <tbody>
							<tr>
								<th><bean:message key="Container"/></th>
								<td>
									<input type="text" name="f_cntr_no" id="f_cntr_no" maxlength="14" value='' class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:100px;" onkeydown="entSearch();">
								</td>
								<th><bean:message key="Consignee"/></th>
								<td><!-- 
									--><input type="text" name="f_cnee_trdp_nm" id="f_cnee_trdp_nm" maxlength="50" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:113px;" onKeyPress="if(event.keyCode==13){doWork('CNEE_TRDP_POPLIST', frm1.f_cnee_trdp_nm.value);}"/><!-- 
									--><button type="button" class="input_seach_btn" tabindex="-1"  onclick="doWork('CNEE_TRDP_POPLIST')"></button>
								</td>
								<td align="right"><!-- 
								--><select name="f_tp_type" id="f_tp_type"  style="width:135px; font-weight: bold;" onChange="searchValueClear(this);"><!--
									--><option selected='selected'value='SHP'><bean:message key="Shipper"/></option><!--
									--><option value='CUS'><bean:message key="Customer"/></option><!--
									--><option value='NOT'><bean:message key="Notify"/></option><!--
									--><option value='PAR'><bean:message key="Partner"/></option><!--
									--><option value='CBR'><bean:message key="Customer"/>&nbsp;<bean:message key="Broker"/></option><!--
								--></select><!--
									--><button type="button" class="input_seach_btn" tabindex="-1"  onclick="doWork('PRNR_TRDP_POPLIST')"></button><!--
									--><input type="text" name="f_prnr_trdp_nm" id="f_prnr_trdp_nm" maxlength="50"  class="search_form" dataformat="multiLanguage" style="<%=MULTI_IMEMODE%>text-transform:uppercase;width:140px;" onKeyPress="if(event.keyCode==13){doWork('PRNR_TRDP_POPLIST', frm1.f_prnr_trdp_nm.value);}"/>
								</td>
								 <!-- OFVFOUR-7264 [SOUTH EAST WORLD WIDE] ADDING PO NO. SEARCH OPTION IN OIH B/L LIST -->
	                            <th><bean:message key="PO_No"/></th>
		                        <td>
		                            <input type="text" id="f_po_no" name="f_po_no" maxlength="20" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:100px;" onkeydown="entSearch();"/>
		                        </td>
								<td>
									<select name="f_date_type" id="f_date_type"  style="width:130px; font-weight: bold;" onChange="searchValueClear(this);">
										<option value='ETA' checked><bean:message key="ETA"/></option>
										<option value='ETD'><bean:message key="ETD"/></option>
										<option value='PDT'><bean:message key="Post_Date"/></option>
									</select><!--
									--><input type="text" id="f_strdt" name="f_strdt" style="width:75px;" size='10' maxlength="10" class="search_form" dataformat="mdy" onBlur="chkCmprPrd(firCalFlag, false, this, this, frm1.f_enddt);mkDateFormatType(this,event,true,1);" onFocus="select();"><span class="dash">~</span><!--
									--><input type="text" id="f_enddt" name="f_enddt" style="width:75px;" size='10' maxlength="10" class="search_form" dataformat="mdy" onBlur="chkCmprPrd(firCalFlag, false, this, frm1.f_strdt, this);mkDateFormatType(this,event,true,1);" onFocus="select();">
								</td>
								<td><button type="button" class="calendar" tabindex="-1" name="f_strdt_cal" id="f_strdt_cal" onclick="doDisplay('DATE11', frm1);"></button></td>
								<!-- OFVFOUR-8056: [BNX-LA] Adding Search option in AR/AP list and OIH List screen -->
								<th style="text-align:right; width:80px;"><bean:message key="Commodity"/></th>
								<td>
									<input type="text" id="f_cmdt_nm" name="f_cmdt_nm" maxlength="20" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:130px;" onkeydown="entSearch();"/>
									<button type="button" name="commodity" id="commodity" class="input_seach_btn" tabindex="-1" onClick="openPopUp('COMMODITY_POPLIST',this)"></button>
									<input type="hidden" id="f_cmdt_cd" name="f_cmdt_cd" maxlength="20" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:130px;" onkeydown="entSearch();"/>
								</td>
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
								<th><bean:message key="IT_No"/></th>
								<td>
									<input type="text" name="f_it_no" id="f_it_no" maxlength="20" value='' class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:115px;" onkeydown="entSearch();">
								</td>
								<th><bean:message key="Cust_Ref_No"/></th>
								<td>
									<input type="text" name="f_cust_ref_no" maxlength="40"  value="" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:99px;text-transform:uppercase;" onblur="strToUpper(this)" onkeydown="entSearch();">
								</td>
								<td align="right"><!-- 
								--><select name="f_ams_isf_sel_cd" id="f_ams_isf_sel_cd"  style="font-weight: bold;" onChange="searchValueClear(this);"><!--
								--><option value='AMS'><bean:message key="AMS_No"/></option><!--
								--><option value='ISF'><bean:message key="ISF_No"/></option><!--
								--></select>
								</td>
								<td>
									<input type="text" name="f_ams_no" maxlength="40"  value="" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:126px;text-transform:uppercase;" onblur="strToUpper(this)" onkeydown="entSearch();">
								</td>
								<th><bean:message key="Ship_Mode"/></th>
								<td>
									<bean:define id="shipModeList" name="valMap" property="shipModeList"/>
									<select name="f_shp_mod_cd" style= "width:65px;">
										<option value=''>ALL</option>
										<logic:iterate id="comVO" name="shipModeList">
											<option value='<bean:write name="comVO" property="cd_val"/>'><bean:write name="comVO" property="cd_nm"/></option>
										</logic:iterate>
									</select>
								</td>
								<td align="right"><!-- 
								--><select name="f_isb_pic_sel_cd" id="f_isb_pic_sel_cd"  style="width:100px; font-weight: bold;" onChange="searchValueClear(this);"><!--
								OFVFOUR-7976: [MATRIX] ADDING CS PIC ON ALL B/L ENTRY AND TRADE PARTNER ENTRY SCREEN
								--><option value='OR'><bean:message key="Issued_By"/> Or <bean:message key="Sales_PIC"/> Or <bean:message key="Cs_Pic"/></option><!--
								--><option value='ISB'><bean:message key="Issued_By"/></option><!--
								--><option value='PIC'><bean:message key="Sales_PIC"/></option><!--
								OFVFOUR-7976: [MATRIX] ADDING CS PIC ON ALL B/L ENTRY AND TRADE PARTNER ENTRY SCREEN
								--><option value='CSPIC'><bean:message key="Cs_Pic"/></option><!--
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
								<th><bean:message key="CY_CFS_Location"/></th>
								<td><!-- 
									--><input type="text" name="f_cfs_trdp_nm" id="f_cfs_trdp_nm"  maxlength="50" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:115px;" onKeyPress="if(event.keyCode==13){doWork('CFS_TRDP_POPLIST', frm1.f_cfs_trdp_nm.value);}"/><!-- 
									--><button type="button" class="input_seach_btn" tabindex="-1"  onclick="doWork('CFS_TRDP_POPLIST')"></button>
								</td>
								<th id="sub_bl_no_th"><bean:message key="Sub_BL_No"/></th>
								<td><!--
								--><input type="text" name="f_sub_bl_no" maxlength="20" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:115px;text-transform:uppercase;" onblur="strToUpper(this)" onkeydown="entSearch();">
								</td>
								<th><bean:message key="CCN"/></th>
								<td>
									<input type="text" name="f_ccn_no" maxlength="30"  value="" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:113px;text-transform:uppercase;" onblur="strToUpper(this)" onkeydown="entSearch();">
								</td>
								<logic:equal name="ofcVOS" property="use_hbl_ser" value="Y" >              
		                            <th><bean:message key="Bl_Serial_No"/></th>
		                            <td>
		                           	    <input style="width:66px;text-transform:uppercase;" type="text" name="f_bl_ser_no_frm" id="f_bl_ser_no_frm" maxlength="8" class="search_form" onkeypress="onlyNumberAndAnphabet(event)"><span class="dash">~</span><!-- 
									 --><input style="width:66px;text-transform:uppercase;" type="text" name="f_bl_ser_no_to" id="f_bl_ser_no_to"  maxlength="8" class="search_form" onkeypress="onlyNumberAndAnphabet(event)">
		                            </td>
                            	</logic:equal>
								<th id="show_entr_no" style="display: none"><bean:message key="Entry_No"/></th>
				            	<td id="show_entr_no" style="display: none"><input type="text" name="f_entr_no" maxlength="20" onBlur="strToUpper(this);" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:115px;" onkeydown="entSearch();"></td>
				            	
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
							<tr>
								<th><bean:message key="PCS"/></th>
								<td><!--
									--><input type="text" name="fm_pck_qty" id="fm_pck_qty" class="search_form" dataformat="excepthan" style="ime-mode isabled;width:55px;" onKeyPress="ComKeyOnlyNumber(this)" onchange="copyPckQty();"/><span class="dash">~</span><!-- 
									--><input type="text" name="to_pck_qty" class="search_form" id="to_pck_qty" onKeyPress="ComKeyOnlyNumber(this)" dataformat="excepthan" style="ime-mode:disabled;width:55px;"/>
								</td>
								<td align="right"><!-- 
								--><select name="f_grs_wgt_sel_cd" id="f_grs_wgt_sel_cd"  style="font-weight: bold;" onChange="searchValueClear(this);"><!--
								--><option value='KG'><bean:message key="GWeight_K"/></option><!--
								--><option value='LG'><bean:message key="GWeight_L"/></option><!--
								--></select>
								</td>
								<td><!--
									--><input type="text" name="fm_grs_wgt" id="fm_grs_wgt" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:55px;" onKeyPress="ComKeyOnlyNumber(this, '.')" onchange="copyGrsWgt();"/><span class="dash">~</span><!-- 
									--><input type="text" name="to_grs_wgt" id="to_grs_wgt" class="search_form" onKeyPress="ComKeyOnlyNumber(this, '.')" dataformat="excepthan" style="ime-mode:disabled;width:55px;"/>
								</td>
								<th><bean:message key="CBM"/></th>
								<td><!-- 
									--><input type="text" name="fm_meas" id="fm_meas" class="search_form" dataformat="excepthan" style="ime-mode isabled;width:55px;" onKeyPress="ComKeyOnlyNumber(this, '.')" onchange="copyMeas();"/><span class="dash">~</span><!-- 
									--><input type="text" name="to_meas" id="to_meas" class="search_form" onKeyPress="ComKeyOnlyNumber(this, '.')" dataformat="excepthan" style="ime-mode:disabled;width:55px;"/>
								</td>
								<th><bean:message key="F_Dest_short"/></th>
	                            <td><!-- 
	                               	 --><input type="text"   name="f_fnl_dest_loc_cd" id="f_fnl_dest_loc_cd" maxlength="5"   value='' class="search_form" onKeyDown="codeNameAction('location_dest',this, 'onKeyDown')" onBlur="codeNameAction('location_dest',this, 'onBlur');" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:55px;"/><!--
	                                 --><button type="button" class="input_seach_btn" tabindex="-1"  onclick="doWork('DEST_LOCATION_POPLIST')"></button><!--
	                                 --><input type="text"   name="f_fnl_dest_loc_nm" id="f_fnl_dest_loc_nm" maxlength="50" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:110px;" onKeyPress="if(event.keyCode==13){doWork('DEST_LOCATION_POPLIST', frm1.f_fnl_dest_loc_nm.value);}"/>
	                            </td>
								<td></td><td></td>
							</tr>	
							<tr>
								<th><bean:message key="POR"/></th>
								<td><!--
								--><input type="text"   name="f_por_cd" id="f_por_cd" maxlength="5"    value='' class="search_form" onKeyDown="codeNameAction('location_por',this, 'onKeyDown')" onBlur="codeNameAction('location_por',this, 'onBlur');" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:55px;"/><!--
								--><button type="button" class="input_seach_btn" tabindex="-1" onclick="doWork('POR_LOCATION_POPLIST')"></button><!--
								--><input type="text"   name="f_por_nm"  maxlength="50"  class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:110px;" onKeyPress="if(event.keyCode==13){doWork('POR_LOCATION_POPLIST', frm1.f_por_nm.value);}"/>
								</td>
								<th><bean:message key="POL"/></th>
								<td><!--
								--><input type="text"   name="f_pol_cd" id="f_pol_cd" maxlength="5"    value='' class="search_form" onKeyDown="codeNameAction('location_pol',this, 'onKeyDown')" onBlur="codeNameAction('location_pol',this, 'onBlur');" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:55px;"/><!--
								--><button type="button" class="input_seach_btn" tabindex="-1" onclick="doWork('POL_LOCATION_POPLIST')"></button><!--
								--><input type="text"   name="f_pol_nm"  maxlength="50"  class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:110px;" onKeyPress="if(event.keyCode==13){doWork('POL_LOCATION_POPLIST', frm1.f_pol_nm.value);}"/>
								</td>
								<th><bean:message key="POD"/></th>
								<td><!--
								--><input type="text"   name="f_pod_cd" id="f_pod_cd" maxlength="5"    value='' class="search_form" onKeyDown="codeNameAction('location_pod',this, 'onKeyDown')" onBlur="codeNameAction('location_pod',this, 'onBlur');" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:55px;"/><!--
								--><button type="button" class="input_seach_btn" tabindex="-1" onclick="doWork('POD_LOCATION_POPLIST')"></button><!--
								--><input type="text"   name="f_pod_nm"  maxlength="50"  class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:110px;" onKeyPress="if(event.keyCode==13){doWork('POD_LOCATION_POPLIST', frm1.f_pol_nm.value);}"/>
								</td>
								<th><bean:message key="DEL"/></th>
								<td><!--
								--><input type="text"   name="f_del_cd" id="f_del_cd" maxlength="5"    value='' class="search_form" onKeyDown="codeNameAction('location_del',this, 'onKeyDown')" onBlur="codeNameAction('location_del',this, 'onBlur');" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:55px;"/><!--
								--><button type="button" class="input_seach_btn" tabindex="-1" onclick="doWork('DEL_LOCATION_POPLIST')"></button><!--
								--><input type="text"   name="f_del_nm"  maxlength="50"  class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:110px;" onKeyPress="if(event.keyCode==13){doWork('DEL_LOCATION_POPLIST', frm1.f_del_nm.value);}"/>
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
					<table border="0" width="1100">
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
			<!-- grid_area(E) -->
			<h3 class="title_design"><bean:message key="MBL_List"/></h3>
			<div class="opus_design_grid" id="mainTable">
				<script type="text/javascript">comSheetObject('sheet2');</script>
			</div> 
		<!-- grid_area(E) -->	
			 <div class="opus_design_grid" style="width:57%"><%@include file="/apps/fis/cmm/mem/jsp/CMM_MEM_0010.jsp"%></div>	
			 
			<div style="width:57%;display:none;">
				<script type="text/javascript">comSheetObject('sheet4');</script>
			</div> 
			
			
		</div> <!-- end of wrap result -->
	</div> <!-- end of over wrap -->
			
    </form>

<script type="text/javascript">
	doBtnAuthority("<%= roleBtnVO.getAttr_extension() %>");	
</script>	