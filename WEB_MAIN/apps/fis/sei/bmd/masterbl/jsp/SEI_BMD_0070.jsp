<%
/*=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : SEI_BMD_0070.jsp
*@FileTitle  : MBL Search 
*@author     : CLT
*@version    : 1.0
*@since      : 2014/06/14
=========================================================*/
%>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="clt-paging"   prefix="paging" %>
	<!-- 공통 Header -->
	<%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/SEA_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="./apps/fis/sei/bmd/masterbl/script/SEI_BMD_0070.js?ver=<%=CLT_JS_VER%>"></script>

	<bean:define id="valMap"  name="EventResponse" property="mapVal"/>
	
	<%
		String ofc_cd		= userInfo.getOfc_cd();
		String ofcLoclNm 	= userInfo.getOfc_locl_nm();
		String usrNm 		= userInfo.getUser_name();
		String email 		= userInfo.getEml();
		String cnt_cd 		= userInfo.getOfc_cnt_cd();
		String usrPhn 		= userInfo.getPhn();
		String usrFax 		= userInfo.getFax();
		
	%>
	<script type="text/javascript">
	
		// 51974 [BNX, ZEN] Invoice Create/Edit 권한 추가, Other Office View/Edit 권한 추가
		var ofc_cd = "<%= userInfo.getOfc_cd() %>";
		var edob_flg = "<%= userInfo.getEdob_flg() %>";
		var uod_flg ="<%= userInfo.getUod_flg()%>"
		var usrDept = "<%=userInfo.getDept_cd()%>";
		var usrId = "<%= userInfo.getUsrid() %>";
		var usrNm = "<%= userInfo.getUser_name() %>";
		function setupPage(){
			loadPage();
			
			setTimeout("document.frm1.f_ref_no.focus();", 1000);
		}
		
		<!-- ###Office Info## -->
	    <bean:define id="officeInfo" name="valMap" property="officeInfo"/>
	    <bean:define id="ofcVO" name="officeInfo"/>
	    var oi_cgor_pic_info = "<bean:write name="ofcVO" property="oi_cgor_pic_info"/>";
	    
	    
	</script>
	<form name="frm1" method="POST" action="./SEI_BMD_0070.clt">
	<input id="f_cmd" name="f_cmd" type="hidden" />
	<input id="f_CurPage" name="f_CurPage" type="hidden" />

	<input id="intg_bl_seq" name="intg_bl_seq" value="" type="hidden" />
	<input id="s_intg_bl_seq" name="s_intg_bl_seq" value="" type="hidden" />
	<input id="master_bl_no" name="master_bl_no" value="" type="hidden" />
	<input id="house_bl_no" name="house_bl_no" value="" type="hidden" />
	
	<!-- PRINT 관련 필드 -->
	<input id="file_name" name="file_name" type="hidden" />
	<input id="title" name="title" type="hidden" />
	<input id="rd_param" name="rd_param" type="hidden" />

	<input id="f_usr_nm" name="f_usr_nm" value="<%= usrNm %>" type="hidden" />

	<!-- CCN Value -->
	<input id="f_email" name="f_email" value="<%= email %>" type="hidden" />
	<input id="f_phone" name="f_phone" value="<%= usrPhn %>" type="hidden" />
	<input id="f_fax" name="f_fax" value="<%= usrFax %>" type="hidden" />
	<input id="f_user_ofc_cd" name="f_user_ofc_cd" value="<%= ofc_cd %>" type="hidden" />


	<input id="f_cnt_cd" name="f_cnt_cd" value="<%= cnt_cd %>" type="hidden" />

	<!-- GridSetting Value -->
	<input id="user_id" name="user_id" value="<%=userInfo.getUsrid()%>" type="hidden" />
	<input type="hidden" name="pageurl" id="pageurl" value="SEI_BMD_0070.clt"/>
	
	<!-- 개인정보 관리화면 정렬순서 2016.03  -->
	<input type="hidden" name="f_orderByInfo"  value="" />	
	
	<!-- #18782 : [BINEX, GPL] OBL RCV and Release update function (From BL List) -->
	<input id="f_rlsd_flg" name="f_rlsd_flg" value="" type="hidden" />
	<input id="f_intg_bl_seq" name="f_intg_bl_seq" value="" type="hidden" />
	<input id="f_rlsd_dt_tm" name="f_rlsd_dt_tm" value="" type="hidden" />
	<!-- #4724	[Best Ocean] Ocean Import OBL Received and Received Date column and entry add -->
	<input id="f_org_bl_rcvd_flg" name="f_org_bl_rcvd_flg" value="" type="hidden" />
	<input id="f_rcvd_dt_tm" name="f_rcvd_dt_tm" value="" type="hidden" />
		
	<input type="hidden" name="mailTitle" value="">
	<input type="hidden" name="mailTo" value="">
	
	<input id="linkFlag" name="linkFlag"  value="<bean:write name="valMap" property="linkFlag"/>" type="hidden" />

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
			--><button type="button" class="btn_normal" style="cursor:hand; display:none;" btnAuth="COPY"  id="btnCopy" onClick="doWork('MBL_COPY');"><bean:message key="Copy"/></button><!-- 
			--><button type="button" class="btn_normal" style="cursor:hand; display:none;" btnAuth="ACCOUNTING"  id="btnAccounting" onclick="doWork('GOTOACCT')"><bean:message key="Accounting"/></button><!--
			--><button type="button" class="btn_normal" style="cursor:hand; display:none;" btnAuth="VERIFICATION"  id="btnVerification" onclick="doWork('GOTOVERIFY')"><bean:message key="Payment_Verify"/></button><!-- 
			--><button type="button" class="btn_normal" style="cursor:hand; display:none;" btnAuth="B_AN" onClick="doWork('ArrivalNotice');"><bean:message key="B.AN"/></button><!-- 
			--><button type="button" class="btn_normal" style="cursor:hand; display:none;" btnAuth="CCN" onClick="doWork('CCN');"><bean:message key="CCN"/> <bean:message key="Print"/></button><!-- 
			--><button type="button" class="btn_normal" style="cursor:hand; display:none;" btnAuth="B_MANIFEST" onClick="doWork('CargoManifest');"><bean:message key="B.Manifest"/></button><!-- 
			--><button type="button" class="btn_normal" style="cursor:hand; display:none;" btnAuth="DEV_SEG" onClick="doWork('devanningSegregation');"><bean:message key="DEV_SEG"/></button><!-- 
			--><button type="button" class="btn_normal" style="cursor:hand; display:none;" btnAuth="USDA_HOLD" onclick="doWork('USDA_HOLD_NOTICE')"><bean:message key="USDA_Hold"/></button><!-- 
			--><button type="button" class="btn_normal" style="cursor:hand; display:none;" btnAuth="OOTOFSTATE" onClick="doWork('OUTPRINT')"><bean:message key="Ootofstate"/></button><!-- 
			--><button type="button" class="btn_normal" style="cursor:hand; display:none;" btnAuth="TRACKING" onClick="doWork('CARGO_TRACKING');"><bean:message key="Tracking"/></button><!-- 
			--><button type="button" class="btn_normal" style="cursor:hand; display:none;" btnAuth="P_REPORT" onClick="doWork('PROFIT_REPORT');"><bean:message key="P_Report"/></button><!-- 
			--><button type="button" class="btn_normal" style="cursor:hand; display:none;" btnAuth="PR_BY_HBL" onClick="doWork('PROFIT_REPORT_BY_HBL');"><bean:message key="PR_BY_HBL"/></button><!-- 
			--><button type="button" class="btn_normal" style="cursor:hand; display:none;" btnAuth="LOG" onClick="doWork('LOG');"><bean:message key="LOG"/></button><!-- 
			--><button type="button" class="btn_normal" style="cursor:hand; display:none;" btnAuth="<%= roleBtnVO.getAttr6() %>" onClick="doWork('EXCEL');" name="btn_DownExcel"><bean:message key="Excel"/></button><!-- 
			--><button type="button" class="btn_normal" style="display:none;" btnAuth="<%= roleBtnVO.getAttr6() %>" onclick="doWork('EXCEL_ALL')" name="btn_DownExcel"><bean:message key="Excel"/> (ALL)</button><!-- 
		    --><button type="button" class="btn_normal" style="cursor:hand; display:none;" btnAuth="<%= roleBtnVO.getAttr3() %>"  id="btnModify"  onClick="doWork('MODIFY');"><bean:message key="Save"/></button><!-- 
			--><button type="button" class="btn_normal" style="cursor:hand; display:none;" btnAuth="<%= roleBtnVO.getAttr4() %>" onClick="doWork('DELETE');"><bean:message key="Delete"/></button><!--
			--><button type="button" class="btn_normal" style="cursor:hand; display:none;" btnAuth="FILE_LABEL" onClick="doWork('FILE_LABEL');"><bean:message key="FILE_LABEL"/></button>
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
                            <th><bean:message key="Office"/></th>
                            <td >
                                <div id="div_subcode">
                                    <bean:define id="oficeList" name="valMap" property="ofcList"/>
                                    <input  type="hidden" name="s_ofc_cd" id="s_ofc_cd" od="s_ofc_cd" value="<bean:write name="valMap" property="ofc_cd"/>"/> 
                                    <select name="f_ofc_cd" id="f_ofc_cd"  style="width: 70px;" >
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
                                </div>
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
					<!-- OFVFOUR-8056: [BNX-LA] Adding Search option in AR/AP list and OIH List screen -->
					<col width="110">
		        	<col width="*">
		        </colgroup>	       
		        	 <tbody>
                         <tr>
                            <th><bean:message key="Container"/></th>
                            <td>
                                <input type="text" name="f_cntr_no" maxlength="14" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:100px;" onkeydown="entSearch();"/>
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
								    --><option value='CAR'><bean:message key="Carrier"/></option><!--
								    --><option value='BCA'><bean:message key="Billing_Carrier"/></option><!--
								    --><option value='TRI'><bean:message key="Triangle_Agent"/></option><!--
								    --><option value='FWD'><bean:message key="Forwarding_Agent"/></option><!--
								--></select><!--
					   	        --><button type="button" class="input_seach_btn" tabindex="-1"  onclick="doWork('PRNR2_TRDP_POPLIST')"></button>
							</td>
                            <td>
                                <input type="text" name="f_prnr_trdp_nm" id="f_prnr_trdp_nm" maxlength="50"  class="search_form" dataformat="multiLanguage" style="<%=MULTI_IMEMODE%>text-transform:uppercase;width:120px;" onKeyPress="if(event.keyCode==13){doWork('PRNR2_TRDP_POPLIST', frm1.f_prnr_trdp_nm.value);}"/>
                            </td>
                            <td>
                            	<select name="f_date_type" id="f_date_type"  style="width:130px; font-weight: bold;" onChange="searchValueClear(this);">
									<option value='ETA' checked><bean:message key="ETA"/></option>
									<option value='FEA'><bean:message key="Delivery_ETA"/></option>
									<option value='ETD'><bean:message key="ETD"/></option>
									<option value='PDT'><bean:message key="Post_Date"/></option>
								</select><!--
							--><input type="text" id="f_strdt" name="f_strdt" style="width:75px;" size='10' maxlength="10" class="search_form" dataformat="mdy" onBlur="chkCmprPrd(firCalFlag, false, this, this, frm1.f_enddt);mkDateFormatType(this,event,true,1);" onFocus="select();"><span class="dash">~</span><!--
							--><input type="text" id="f_enddt" name="f_enddt" style="width:75px;" size='10' maxlength="10" class="search_form" dataformat="mdy" onBlur="chkCmprPrd(firCalFlag, false, this, frm1.f_strdt, this);mkDateFormatType(this,event,true,1);" onFocus="select();"><!--
							--><button type="button" class="calendar" tabindex="-1" name="f_strdt_cal" id="f_strdt_cal" onclick="doDisplay('DATE11', frm1);"></button>
							</td>
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
							<th><bean:message key="Vessel"/></th>
							<td>
								<input type="text" name="f_trnk_vsl_nm" id="f_trnk_vsl_nm" maxlength="35"  class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:100px;" onkeydown="entSearch();"/>
							</td>
							<th><bean:message key="Agent_Reference_No"/></th>
							<td>
								<input type="text" name="f_imp_ref_no" maxlength ="40" value="" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:75px;text-transform:uppercase;" onblur="strToUpper(this)" onkeydown="entSearch();">
							</td>
							<th><bean:message key="BL_Type"/></th>
							<td>
								<bean:define id="blTypeList" name="valMap" property="blTypeList"/>
									<select name="f_hbl_tp_cd" id="f_hbl_tp_cd" class="search_form" style="width:115px;">
									<option value="">ALL</option>
									<logic:iterate id="bltypeVO" name="blTypeList">
									<option value='<bean:write name="bltypeVO" property="cd_val"/>'><bean:write name="bltypeVO" property="cd_nm"/></option>
									</logic:iterate>
								</select>
							</td>
							<th><bean:message key="Ship_Mode"/></th>
							<td>
								<bean:define id="shipModeList" name="valMap" property="shipModeList"/>
								<select name="f_shp_mod_cd" id="f_shp_mod_cd" style="width: 70px" >
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
							<td colspan=20>
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
								--><input type="text" name="f_cy_cfs_trdp_nm" id="f_cfs_trdp_nm"  maxlength="50" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:115px;" onKeyPress="if(event.keyCode==13){doWork('CY_CFS_TRDP_POPLIST', frm1.f_cy_cfs_trdp_nm.value);}"/><!-- 
								--><button type="button" class="input_seach_btn" tabindex="-1" onclick="doWork('CY_CFS_TRDP_POPLIST')"></button>
							</td>
							<th><bean:message key="CCN"/></th>
							<td colspan=1>
								<input type="text" name="f_ccn_no" maxlength ="30" value="" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:100;text-transform:uppercase;" onblur="strToUpper(this)" onkeydown="entSearch();">
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
							<td></td><td></td><td></td><td></td><td></td><td></td>
						</tr>
						<tr>
							<th><bean:message key="POR"/></th>
							<td><!-- 
							--><input type="text"   name="f_por_cd" id="f_por_cd" maxlength="5" value='' class="search_form" onKeyDown="codeNameAction('location_por',this, 'onKeyDown')" onBlur="codeNameAction('location_por',this, 'onBlur');" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:45px;"/><!--
							--><button type="button" class="input_seach_btn" tabindex="-1" onclick="doWork('POR_LOCATION_POPLIST')"></button><!-- 
							--><input type="text"   name="f_por_nm" id="f_por_nm" maxlength="50"  class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:100px;" onKeyPress="if(event.keyCode==13){doWork('POR_LOCATION_POPLIST', frm1.f_por_nm.value);}"/>
							</td>
							<th><bean:message key="POL"/></th>
							<td><!-- 
								--><input type="text"   name="f_pol_cd" id="f_pol_cd" maxlength="5" value='' class="search_form" onKeyDown="codeNameAction('location_pol',this, 'onKeyDown')" onBlur="codeNameAction('location_pol',this, 'onBlur');" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:45px;"/><!--
								--><button type="button" class="input_seach_btn" tabindex="-1" onclick="doWork('POL_LOCATION_POPLIST')"></button><!-- 
								--><input type="text"   name="f_pol_nm" id="f_pol_nm" maxlength="50"  class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:100px;" onKeyPress="if(event.keyCode==13){doWork('POL_LOCATION_POPLIST', frm1.f_pol_nm.value);}"/>
							</td>
							<th><bean:message key="POD"/></th>
							<td><!-- 
								--><input type="text"   name="f_pod_cd" id="f_pod_cd"  maxlength="5" value='' class="search_form" onKeyDown="codeNameAction('location_pod',this, 'onKeyDown')" onBlur="codeNameAction('location_pod',this, 'onBlur');" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:45px;"/><!-- 
								--><button type="button" class="input_seach_btn" tabindex="-1" onclick="doWork('POD_LOCATION_POPLIST')"></button><!-- 
								--><input type="text"   name="f_pod_nm" id="f_pod_nm" maxlength="50"  class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:100px;" onKeyPress="if(event.keyCode==13){doWork('POD_LOCATION_POPLIST', frm1.f_pod_nm.value);}"/>
							</td>
							<th><bean:message key="DEL"/></th>
							<td colspan=10><!-- 
								--><input type="text"   name="f_del_cd" id="f_del_cd"  maxlength="5" value='' class="search_form" onKeyDown="codeNameAction('location_del',this, 'onKeyDown')" onBlur="codeNameAction('location_del',this, 'onBlur');" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:45px;"/><!-- 
								--><button type="button" class="input_seach_btn" tabindex="-1" onclick="doWork('DEL_LOCATION_POPLIST')"></button><!-- 
								--><input type="text"   name="f_del_nm" id="f_del_nm" maxlength="50" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:100px;" onKeyPress="if(event.keyCode==13){doWork('DEL_LOCATION_POPLIST', frm1.f_del_nm.value);}"/>
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
			<div class="opus_design_grid">
				<h3 class="title_design"><bean:message key="MBL_List"/></h3>
				
				<div class="opus_design_btn"> 
					<button  onClick="setMblSizeUp(docObjects[0])" style="cursor:hand" type="button" class="btn_normal"><bean:message key="Plus"/></button>
					<button onClick="setMblSizeDown(docObjects[0])" style="cursor:hand" type="button" class="btn_normal"><bean:message key="Minus"/></button></td>
				</div>
				<script type="text/javascript">comSheetObject('sheet1');</script>
			</div>
			<table>
				<tr>
					<td width="55px">
						<bean:define id="tmpMapVal" name="EventResponse" property="mapVal"/> 
						 <bean:define id="pagingVal" name="tmpMapVal"     property="paging"/> 
						 <paging:options name="pagingVal" defaultval="200"/> 
					</td>
					<td id="pagingTb" style='font-family: "Tahoma", "Arial", "Verdana";font-size: 11px;'></td>
				</tr>   
			</table>
		</div> 
		<div>
			       
     	 </div>
		<!-- grid_area(E) -->
		<div class="opus_design_grid">
			<h3 class="title_design"><bean:message key="HBL_List"/></h3>
			<div class="opus_design_btn"> 
				<button  onClick="setHblSizeUp(docObjects[1])" style="cursor:hand" type="button" class="btn_normal"><bean:message key="Plus"/></button>
				<button onClick="setHblSizeDown(docObjects[1])" style="cursor:hand" type="button" class="btn_normal"><bean:message key="Minus"/></button></td>
			</div>
			<script type="text/javascript">comSheetObject('sheet2');</script>
		</div> 
		
		<div class="opus_design_grid" style="width:57%"><%@include file="/apps/fis/cmm/mem/jsp/CMM_MEM_0010.jsp"%></div>	  
		
	<!-- grid_area(E) -->	
	</div>
</div> <!-- end of over_wrap -->	
</form>

<script type="text/javascript">
	doBtnAuthority("<%= roleBtnVO.getAttr_extension() %>");
</script>