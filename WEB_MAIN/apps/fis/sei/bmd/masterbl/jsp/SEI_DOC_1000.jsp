<%--
=========================================================
*@FileName   : SEI_DOC_1000.jsp
*@FileTitle  : Devanning/Segregation Report
*@Description: Devanning/Segregation Report
*@author     : LEE HAE KYOUNG - Cyberlogitec
*@version    : 1.0 - 2011/12/13
*@since      : 2011/12/13

*@Change history:
=========================================================
--%>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="clt-paging"   prefix="paging" %>
	<!-- 공통 Header -->
	<%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
	<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css" />
	
	<!-- 일자 및 달력팝업 호출 -->
	<script language="javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CoFormControl.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CoBizCommon.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CalculationUtil.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/rd/rdviewer50u.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/SEA_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="./apps/fis/sei/bmd/masterbl/script/SEI_DOC_1000.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/autocomplete_ui.js?ver=<%=CLT_JS_VER%>"></script>

	<bean:define id="mblVO"   name="EventResponse" property="objVal"/>

	<%
		String ofc_cd		= userInfo.getOfc_cd();
		String ofcLoclNm 	= userInfo.getOfc_locl_nm();
		String usrNm 		= userInfo.getUser_name();
		String email 		= userInfo.getEml();
		String cnt_cd 		= userInfo.getOfc_cnt_cd();
	%>

	<script>
		var pDoc = parent.parent.parent.document;
		hideProcess('WORKING', pDoc);
	</script>
	<script>
		function setSelect(){
			var formObj = document.frm1;
		}
		function setupPage(){
	       	loadPage();
	       	setSelect();
	       	
	       	setTimeout("document.frm1.s_ref_no.focus();", 1000);
	    }
		var attr_extension = "<%= roleBtnVO.getAttr_extension() %>";
		
		$( document ).ready(function() {
			$("input[name='mbl_ref_no']").on("focus", function(){
				$("input[name='mbl_location_cd']").focus();
			});
			$("input[name='mbl_vsl']").on("focus", function(){
				$("textarea[name='f_remark']").focus();
			});
		});	
		<bean:define id="cdMap"  name="EventResponse" property="mapVal"/>
		var AUTOCOMPLETE_YN = 'Y';
		<logic:notEmpty name="cdMap" property="autocompleteYn">
			AUTOCOMPLETE_YN = '<bean:write name="cdMap" property="autocompleteYn"/>';
		</logic:notEmpty> 
	</script>
<form name="frm1" method="POST" action="./SEI_DOC_1000.clt">
	<!--Command를 담는 공통 -->
	<input type="hidden" name="f_cmd"/>
	<input type="hidden" name="f_CurPage"/>
	
	<input type="hidden" name="file_name">
	<input type="hidden" name="title">
	<input type="hidden" name="rd_param">
	<input type="hidden" name="f_usr_nm" value="<%= usrNm %>"/>
	<input type="hidden" name="f_email" value="<%= email %>"/>
	<input type="hidden" name="f_ofcLoclNm" value="<%= ofcLoclNm %>"/>
	<input type="hidden" name="f_ofc_cd" value="<%= ofc_cd %>"/>
	<input type="hidden" name="f_cnt_cd" value="<%= cnt_cd %>"/>
	<input type="hidden" name="f_intg_bl_seq" value = '<bean:write name="mblVO" property="intg_bl_seq"/>'>
	<input type="hidden" name="f_mbl_pck_qty" >
	<input type="hidden" name="f_mbl_grs_wgt" >
	<input type="hidden" name="f_mbl_meas" >
	<input type="hidden" name="f_cntr_info" value = '<bean:write name="mblVO" property="cntr_info"/>'>
	<input type="hidden" name="intg_bl_seq" value = '<bean:write name="mblVO" property="intg_bl_seq"/>'>
	<input type="hidden" name="mailTo" value='<bean:write name="mblVO" property="pic_eml"/>'/>
	
	<!--  Report ==> OutLook�곕룞 �뚮씪誘명꽣 (S) -->
	<input type="hidden" name="rpt_biz_tp"/>
	<input type="hidden" name="rpt_biz_sub_tp"/>
	<input type="hidden" name="rpt_trdp_cd"/>
	<!--  Report ==> OutLook�곕룞 �뚮씪誘명꽣 (E) -->

	<input type="hidden" name="s_intg_bl_seq" value = "<bean:write name="mblVO" property="intg_bl_seq"/>">
	<!-- page_title_area -->
	<div class="page_title_area clear">
	   <h2 class="page_title"><button type="button"><%=LEV3_NM%></button></h2>
	   <!-- btn_div -->
	   <div class="opus_design_btn TOP">
		   <%-- 
		   <button type="button" class="btn_accent" style="cursor:hand; display:none;" btnAuth="<%= roleBtnVO.getAttr1() %>" onclick="doWork('SEARCH')"><bean:message key="Search"/></button><!-- 
		--><button type="button" class="btn_normal" style="cursor:hand; display:none;" btnAuth="<%= roleBtnVO.getAttr3() %>" onclick="doWork('ADD')"><bean:message key="Save"/></button><!-- 
		--><button type="button" class="btn_normal" id="btnPrint" style="cursor:hand; display:none;" btnAuth="<%= roleBtnVO.getAttr5() %>" onclick="doWork('PRINT')"><bean:message key="Print"/></button><!-- 
		--><button type="button" class="btn_normal" id="btnDevaning_Report" style="cursor:hand; display:none;" btnAuth="DEVANING_REPORT" onclick="doWork('DEVANING_REPORT')"><bean:message key="Devaning_Report"/></button><!-- 
		--><button type="button" class="btn_normal" style="cursor:hand; display:none;" btnAuth="CLEAR" onclick="clearAll()"><bean:message key="Clear"/></button><!-- 
		--><button type="button" class="btn_normal" style="cursor:hand; display:none;" btnAuth="SEND_EDI" onclick="doWork('SEND_EDI')"><bean:message key="Send_EDI"/></button> --%>
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
	<!-- wrap_search (S) -->
	<div class="wrap_search">	
		<div class="opus_design_inquiry entry_pannel ">
			<table>
				<colgroup>
					<col width="80">
					<col width="180">
					<col width="70">
					<col width="*">
				</colgroup>
				<tbody>
					<tr>
					    <th width="80px"><bean:message key="Ref_No"/></th>
						<td width="180px"><!-- 
						 --><input name="s_ref_no" maxlength="20" value="<bean:write name="mblVO" property="ref_no"/>" type="text" class="search_form" dataformat="excepthan" style="width:130;" style="ime-mode:disabled;width:115;text-transform:uppercase;" onblur="strToUpper(this)"><!-- 
						 --><button type="button" class="input_seach_btn" tabindex="-1" onClick="openPopUp('REF_POPLIST',this)"></button></td>
						<th width="70px" nowrap class="table_search_head"><bean:message key="MBL_No"/></th>
						<td><!-- 
						 --><input name="s_mbl_no"  maxlength="40" value="<bean:write name="mblVO" property="mbl_no"/>" type="text" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:130;text-transform:uppercase;" onblur="strToUpper(this)"><!-- 
						 --><button type="button" class="input_seach_btn" tabindex="-1" onClick="openPopUp('MBL_POPLIST',this)"></button><!-- 
						 --><input type="hidden" name="s_intg_bl_seq" value = "<bean:write name="mblVO" property="intg_bl_seq"/>"><!-- 
						 --></td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
	
	<!-- wrap_result (S) -->
	<div class="wrap_result">
		<div class="opus_design_inquiry">
			<table>
				<colgroup>
					<col width="80">
					<col width="200">
					<col width="150">
					<col width="*">
				</colgroup>
				<tbody>
                 <tr>
                     <th><bean:message key="To"/></th>
                     <td><!-- 
                      --><input name="mbl_to_cd" type="text" maxlength="20" value='<bean:write name="mblVO" property="cfs_trdp_cd"/>' class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:70px;"  onKeyDown="codeNameAction('toCd', this, 'onKeyDown')" onBlur="codeNameAction('toCd', this, 'onBlur');"><!-- 
                      --><button type="button" class="input_seach_btn" tabindex="-1" onClick="openPopUp('TO_PARTNER_POPLIST')"></button><!-- 
                      --><input name="mbl_to_nm" type="text" maxlength="50" value='<bean:write name="mblVO" property="cfs_trdp_nm"/>' class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:230px;" onKeyPress="if(event.keyCode==13){openPopUp('TO_PARTNER_POPLIST_NAME');}"><!-- 
                      --><input type="hidden" name="cfs_firm_cd" value = '<bean:write name="mblVO" property="cfs_firm_cd"/>'><!-- 
                      --><input type="hidden" name="cfs_trdp_nm" value='<bean:write name="mblVO" property="cfs_trdp_nm"/>'/><!-- 
                      --><input type="hidden" name="cfs_lgl_addr" value='<bean:write name="mblVO" property="cfs_lgl_addr"/>'/><!-- 
                      --><input type="hidden" name="cfs_city_nm" value='<bean:write name="mblVO" property="cfs_city_nm"/>'/><!-- 
                      --><input type="hidden" name="cfs_zip_cd" value='<bean:write name="mblVO" property="cfs_zip_cd"/>'/><!-- 
                      --><input type="hidden" name="cfs_state_cd" value='<bean:write name="mblVO" property="cfs_state_cd"/>'/><!-- 
                      --></td>
                     <th><bean:message key="Ref_No"/></th>
                     <td><input name="mbl_ref_no" readonly type="text" value='<bean:write name="mblVO" property="ref_no"/>' class="search_form-disable" style="width:300px;"></td>
                 </tr>
                 <tr>
                     <th><bean:message key="Location"/></th>
                     <td><!-- 
                      --><input name="mbl_location_cd" type="text" maxlength="20" value='<bean:write name="mblVO" property="cy_trdp_cd"/>' class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:70px;"  onKeyDown="codeNameAction('locCd', this, 'onKeyDown')" onBlur="codeNameAction('locCd', this, 'onBlur');"><!-- 
                      --><button type="button" class="input_seach_btn" tabindex="-1" onClick="openPopUp('LOC_PARTNER_POPLIST')"></button><!-- 
                      --><input name="mbl_location_nm" type="text" maxlength="50" value='<bean:write name="mblVO" property="cy_trdp_nm"/>' class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:230px;" onKeyPress="if(event.keyCode==13){openPopUp('LOC_PARTNER_POPLIST_NAME');}"><!-- 
                      --></td>
                     <th><bean:message key="Vessel"/>/<bean:message key="Voyage"/></th>
                     <td><!-- 
                      --><input name="mbl_vsl" readonly type="text" value='<bean:write name="mblVO" property="trnk_vsl_nm"/>' class="search_form-disable" style="width:180px;"><!-- 
                      --><input name="mbl_voy" readonly type="text" value='<bean:write name="mblVO" property="trnk_voy"/>' class="search_form-disable" style="width:115px;"><!-- 
                      --></td>
                 </tr>
                 <tr>
                     <td colspan="2"></td>
                     <th><bean:message key="Master_BL"/></th>
                     <td><!-- 
                      --><input name="mbl_no" readonly type="text" value='<bean:write name="mblVO" property="mbl_no"/>' class="search_form-disable" style="width:300px;"><!-- 
                      --><input type="hidden" name="mbl_it_no" value = '<bean:write name="mblVO" property="mbl_it_no"/>'><!-- 
                      --></td>
                 </tr>
                 <tr>
                     <td colspan="2"></td>
                     <th><bean:message key="Container_No"/></th>
                     <td><input name="f_cntr_no" readonly type="text" value="" class="search_form-disable" style="width:300px;"></td>
                 </tr>
                 <tr>
                     <td colspan="2"></td>
                     <th><bean:message key="Seal_No_Cntr_Size"/></th>
                     <td><!-- 
                      --><input name="f_seal_no" readonly type="text" value="" class="search_form-disable" style="width:180px;"><!-- 
                      --><input name="f_tpsz_no" readonly type="text" value="" class="search_form-disable" style="width:115px;"><!-- 
                      --></td>
                 </tr>
                </tbody>
             </table>
		</div>
		<table class="line_bluedot"><tr><td></td></tr></table>
		<div class="opus_design_grid" style="width: 1200px;">
			<script language="javascript">comSheetObject('sheet1');</script>
		</div>
		<div class="opus_design_grid" style="display: none;">
			<script language="javascript">comSheetObject('sheet2');</script>
		</div>
		<div class="opus_design_inquiry">
			<table width="750px" border="0" cellspacing="0" cellpadding="0">
				<tr>
					<th width="50px"><bean:message key="Total"/></th>
                    <td width="150px"><input type="text" name="f_total" value="" style="width:100px;text-align:right" class="search_form-disable" readOnly></td>
					<th width="30px"><bean:message key="Qty"/></th>
                    <td width="90px;"><input type="text" name="f_qty_tot" value="" style="width:70px;text-align:right" class="search_form-disable" readOnly></td>
					<th width="30px"><bean:message key="Weight"/></th>
                    <td width="165px"><!-- 
                     --><input type="text" name="f_wgt_tot" value="" style="width:70px;text-align:right" class="search_form-disable" readOnly><!-- 
                     --><input type="text" name="f_wgt1_tot" value="" style="width:70px;text-align:right" class="search_form-disable" readOnly><!-- 
                     --></td>
					<th width="30px"><bean:message key="Measure"/></th>
					<td><!-- 
					 --><input type="text" name="f_meas_tot" value="" style="width:70px;text-align:right" class="search_form-disable" readOnly><!-- 
					 --><input type="text" name="f_meas1_tot" value="" style="width:70px;text-align:right" class="search_form-disable" readOnly><!-- 
					 --></td>
				</tr>
			</table>
			<table class="line_bluedot"><tr><td></td></tr></table>
			<div>
			<h3 class="title_design mar_btm_8"><bean:message key="Remark_Special_Instruction"/></h3>
			<table>
               <tr>
                	<td nowrap class="table_search_body">
                		<textarea name="f_remark" maxlength="400" class="search_form" dataformat="excepthan" style="width:600px;height:70px;" onblur="strToUpper(this)"><bean:write name="mblVO" property="rmk_dev"/></textarea>
                	</td>
               </tr>
	         </table>
	         </div>
		</div>
	</div>
</div>	
</form>

<script type="text/javascript">
doBtnAuthority(attr_extension);
</script>	

