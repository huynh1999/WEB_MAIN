<%
/*=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : SEE_BMD_0130.jsp
*@FileTitle  : COMMERCIAL Invoice
*@Description: COMMERCIAL Invoice
*@author     : CLT
*@version    : 1.0
*@since      : 2014/06/12
=========================================================*/
%>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="clt-paging"   prefix="paging" %>
	<!-- 공통 Header -->
	<%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
	<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css"/>

	<!-- 일자 및 달력팝업 호출 -->
	<script language="javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CoFormControl.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CoBizCommon.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/SEA_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/apps/fis/see/bmd/housebl/script/BL_CODE_UTIL.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="./apps/fis/see/bmd/housebl/script/SEE_BMD_0130.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/autocomplete_ui.js?ver=<%=CLT_JS_VER%>"></script>

	<bean:define id="valMap" name="EventResponse" property="mapVal"/>
	<bean:define id="plVO"   name="valMap" property="plInfo"/>
	<%
		String ofc_cd		= userInfo.getOfc_cd();
		String ofcLoclNm = userInfo.getOfc_locl_nm();
		String usrNm = userInfo.getUser_name();
		String email = userInfo.getEml();
		String cnt_cd = userInfo.getOfc_cnt_cd();
	%>

	<script>
		var pDoc = parent.parent.parent.document;
		hideProcess('WORKING', pDoc);

		function setSelect(){
			var formObj = document.frm1;
		}

		function setupPage(){
			loadPage();
		}
		var attr_extension = "<%= roleBtnVO.getAttr_extension() %>";
		//<!-- #1169 Cannot auto suggestion when name inputted -->
		var AUTOCOMPLETE_YN = 'Y';
		 <logic:notEmpty name="valMap" property="autocompleteYn">
			AUTOCOMPLETE_YN = '<bean:write name="valMap" property="autocompleteYn"/>';
		</logic:notEmpty>
	</script>
<form name="frm1" method="POST" action="./SEE_BMD_0130.clt">
	<!--Command를 담는 공통 -->
	<input type="hidden" name="f_cmd"/>
	<input type="hidden" name="f_CurPage"/>
	<input type="hidden" name="trdp_cd"/>
	<input type="hidden" name="f_intg_bl_seq" value=""/>

	<input type="hidden" name="f_wrk_tp" 	  value='<bean:write name="plVO" property="wrk_tp"/>'/>
	<input type="hidden" name="print_yn"	  value='<bean:write name="plVO" property="print_yn"/>'/>
	<input type="hidden" name="save_yn"	  	  value='<bean:write name="plVO" property="save_yn"/>'/>

	<input type="hidden" name="file_name">
	<input type="hidden" name="title">
	<input type="hidden" name="rd_param">

	<input	type="hidden" name="f_usr_nm" value="<%= usrNm %>"/>
	<input	type="hidden" name="f_email"  value="<%= email %>"/>
	<input	type="hidden" name="f_ofc_cd" value="<%= ofc_cd %>"/>
	<input	type="hidden" name="f_cnt_cd" value="<%= cnt_cd %>"/>

	<!-- #2313 [Split - 1] [Split - 1] [UFF] CERTIFICATE OF ORIGIN ERROR (Ocean Export) -->
	<input type="hidden" name="biz_clss_cd" id="biz_clss_cd" value="H"/>
	<input type="hidden" name="bnd_clss_cd" id="bnd_clss_cd" value="O"/>
	<input type="hidden" name="air_sea_clss_cd" id="air_sea_clss_cd" value="S"/>

	<!-- page_title_area(S) -->
	<div class="page_title_area">
	   <h2 class="page_title"><button type="button"><%=LEV3_NM%></button></h2>
	   <!-- btn_div -->
	   <div class="opus_design_btn TOP">
<%-- 		   <button type="button" class="btn_accent" style="display:none;" btnAuth="<%= roleBtnVO.getAttr1() %>" onclick="doWork('SEARCHLIST')"><bean:message key="Search"/></button><!-- 
		--><button type="button" class="btn_normal" id="btnModify" style="display:none;" btnAuth="<%= roleBtnVO.getAttr3() %>" onclick="doWork('MODIFY')"><bean:message key="Save"/></button><!-- 
		--><button type="button" class="btn_normal" id="btnPrint" style="display:none;" btnAuth="<%= roleBtnVO.getAttr5() %>" onclick="doWork('PRINT')"><bean:message key="Print"/></button><!-- 
		--><button type="button" class="btn_normal" style="display:none;" btnAuth="CLEAR" onclick="clearAll()"><bean:message key="Clear"/></button>
 --%>	   </div>
	   <!-- btn_div -->
	   <div class="location">
		   <span><%=LEV1_NM%></span> &gt;
		   <span><%=LEV2_NM%></span> &gt;
		   <span><%=LEV3_NM%></span>
		   <a href="" class="ir">URL Copy</a>
	   </div>
	</div>
<div class="over_wrap" height="100%">	
	<div class="wrap_search">	
		<div class="opus_design_inquiry entry_pannel ">
			<table>
				<colgroup>
					<col width="80"/>
					<col width="*"/>
				</colgroup>
				<tbody>
					<tr>
						<th><bean:message key="HBL_No"/></th>
						<td><input required type="text" name="txt_hbl_no"  maxlength="40" value='<bean:write name="plVO" property="bl_no"/>' dataformat="excepthan" style="ime-mode:disabled;width:130px;text-transform:uppercase;" onblur="strToUpper(this)"><!-- 
						 --><button type="button" class="input_seach_btn" tabindex="-1" onClick="doWork('HBL_POPLIST')"></button><!-- 
						 --><input type="hidden" name="intg_bl_seq" value='<bean:write name="plVO" property="intg_bl_seq"/>'><!-- 
						 --><input type="hidden" name="hbl_no" value='<bean:write name="plVO" property="bl_no"/>'>
						 </td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
	<div class="wrap_result" style="width: 1200px;">
		<div class="layout_wrap">
	   		<div style="width: 31%;float: left;" class="opus_design_inquiry">
	   			<table>
	   				<colgroup>
						<col width="80"/>
						<col width="*"/>
					</colgroup>
					<tbody>
						<tr>
							<th><bean:message key="Shipper"/></th>
							<td><textarea name="f_seller" maxlength="400" onkeypress="keyPress_maxLength(this);" onkeyup="keyUp_maxLength(this);" onblur="strToUpper(this);keyUp_maxLength(this);" dataformat="excepthan" style="width:250px;height:80px;" ><bean:write name="plVO" property="seller_addr"/></textarea></td>
						</tr>
						<tr>
							<th><bean:message key="Consignee"/></th>
							<td><textarea name="f_consignee" maxlength="400" onkeypress="keyPress_maxLength(this);" onkeyup="keyUp_maxLength(this);" onblur="strToUpper(this);keyUp_maxLength(this);" dataformat="excepthan" style="width:250px;height:80px;" ><bean:write name="plVO" property="cnee_addr"/></textarea></td>
						</tr>
						<tr>
							<th><bean:message key="Notify"/></th>
							<td><textarea name="f_notify" maxlength="400" onkeypress="keyPress_maxLength(this);" onkeyup="keyUp_maxLength(this);" onblur="strToUpper(this);keyUp_maxLength(this);" dataformat="excepthan" style="width:250px;height:80px;" ><bean:write name="plVO" property="notify_addr"/></textarea></td>
						</tr>
					</tbody>
				</table>
	   		</div>
	   		<div style="width: 69%;float: left;" class="opus_design_inquiry">
	   			<table>
	   				<colgroup>
						<col width="100"/>
						<col width="200"/>
						<col width="110"/>
						<col width="*"/>
					</colgroup>
					<tbody>
	                     <tr>
	                         <th><bean:message key="Invoice_No"/></th>
	                         <td><input type="text" name="f_inv_no" maxlength="50" value='<bean:write name="plVO" property="inv_no"/>' dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:250px" onblur="strToUpper(this)" onchange="textdescAdd(frm1.f_desc_good, 'INV. NO : ', this.value, frm1.h_inv_no);"><!-- 
						  	 --><input type="hidden" name="h_inv_no" value='<bean:write name="plVO" property="inv_no"/>'></td>
	                         <th><bean:message key="Invoice_Date"/></th>
	                         <td><input type="text" name="f_inv_dt" maxlength="10" value='<bean:write name="plVO" property="inv_dt"/>' onKeyUp="mkDateFormatType(this, event, false,1)" onBlur="mkDateFormatType(this, event, true,1)" dataformat="excepthan" style="ime-mode:disabled;width:75px;"><!-- 
	                          --><button type="button" class="calendar ir" onclick="doDisplay('DATE1' ,frm1);"></button></td>
	                     </tr>
	                     <tr>
	                         <th><bean:message key="LC_No"/></th>
	                         <td><input type="text" name="f_lc_no" maxlength="200" value='<bean:write name="plVO" property="lc_no"/>' dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:250px" onblur="strToUpper(this)" onchange="textdescAdd(frm1.f_desc_good, 'L/C NO. : ', this.value, frm1.h_lc_no);"><!--
                              --><input type="hidden" name="h_lc_no" value='<bean:write name="plVO" property="lc_no"/>'></td>
	                         <th><bean:message key="LC_DATE"/></th>
	                         <td><input type="text" name="f_lc_dt" maxlength="10" value='<bean:write name="plVO" property="lc_dt"/>' onKeyUp="mkDateFormatType(this, event, false,1)" onBlur="mkDateFormatType(this, event, true,1)" dataformat="excepthan" style="ime-mode:disabled;width:75px;"><!-- 
	                          --><button type="button" class="calendar ir" onclick="doDisplay('DATE2' ,frm1);"></button></td>
	                     </tr>
	                     <tr>
	                         <th><bean:message key="LC_ISS_BNK"/></th>
	                         <td colspan="3"><input type="text" name="f_lc_issue_bank" maxlength="200" value='<bean:write name="plVO" property="lc_issue_bank"/>' dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:250px" onblur="strToUpper(this)"></td>
	                     </tr>
	                     <tr>
	                         <th><bean:message key="Terms_Payment"/></th>
	                         <td  colspan="3"><input type="text" name="f_termpay" maxlength="20" value='<bean:write name="plVO" property="svc_term"/>' style="width:250px;text-transform:uppercase" onblur="strToUpper(this)"></td>
	                     </tr>
	                     <tr>
	                         <th><bean:message key="Departure"/></th>
	                         <td><input type="text" name="f_dept" maxlength="50" value='<bean:write name="plVO" property="pol_nm"/>' dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:250px" onblur="strToUpper(this)"></td>
	                         <th><bean:message key="Departure_Date"/></th>
	                         <td><input type="text" name="f_dept_dt" maxlength="10" value='<bean:write name="plVO" property="etd_dttm"/>' onKeyUp="mkDateFormatType(this, event, false,1)" onBlur="mkDateFormatType(this, event, true,1)" dataformat="excepthan" style="ime-mode:disabled;width:75px;"><!-- 
	                          --><button type="button" class="calendar ir" onclick="doDisplay('DATE3' ,frm1);"></button></td>
	                     </tr>
	                     <tr>
	                         <th><bean:message key="Destination"/></th>
	                         <td  colspan="3"><input type="text" name="f_dest" maxlength="50" value='<bean:write name="plVO" property="pod_nm"/>' dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:250px" onblur="strToUpper(this)"></td>
	                     </tr>
	                     <tr>
	                     	<th><bean:message key="Liner"/></th>
	                         <td colspan="3"><input type="text" name="f_carr_trdp_cd" maxlength="20"  value='<bean:write name="plVO" property="carr_trdp_cd"/>' onKeyDown="codeNameAction('partner_liner',this, 'onKeyDown')" onBlur="codeNameAction('partner_liner',this, 'onBlur');javascript:this.value=this.value.toUpperCase();" dataformat="excepthan" style="ime-mode:auto;text-transform:uppercase;width:70px;"><!-- 
	                          --><button type="button" class="input_seach_btn" tabindex="-1" onClick="openPopUp('LINER_POPLIST',this)"></button><!-- 
	                          --><input type="text" name="f_carr_trdp_nm" id="f_carr_trdp_nm" maxlength="100" value='<bean:write name="plVO" property="carr_trdp_nm"/>' onblur="strToUpper(this)" dataformat="excepthan" style="width:147px;ime-mode:auto;text-transform:uppercase;" onKeyPress="if(event.keyCode==13){openPopUp('LINER_POPLIST_NAME', document.getElementById('f_carr_trdp_nm'));}">
	                          </td>
	                     </tr>
	                     <tr>
	                         <th><bean:message key="Vessel_Flight"/></th>
	                         <td colspan="3"><input type="text" name="f_vslflt" maxlength="100" value='<bean:write name="plVO" property="vsl_flt"/>' dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:250px" onblur="strToUpper(this)"></td>
	                     </tr>
                     </tbody>
                 </table>
	   		</div>
	   	</div>
		<table class="grid2">
			<colgroup>
				<col width="200"/>
				<col width="100"/>
				<col width="350"/>
				<col width="150"/>
				<col width="150"/>
			</colgroup>
			<tbody>
				<tr>
					<th height="25px"><bean:message key="Marks_and_Numbers"/></th>
					<th>Q'TY/UOM</th>
					<th><bean:message key="Description_of_Packages_and_Goods"/></th>
					<th><bean:message key="Unit_Price"/></th>
					<th><bean:message key="Amount"/></th>
				</tr>
				<tr>
					<td><textarea name="f_mark_num" maxlength="4000" onkeypress="keyPress_maxLength(this);" onkeyup="keyUp_maxLength(this);" onblur="strToUpper(this);keyUp_maxLength(this);" dataformat="excepthan" style="width:100%;height:250px;" ><bean:write name="plVO" property="mk_txt"/></textarea></td>
					<td><textarea name="f_qty" maxlength="500" onkeypress="keyPress_maxLength(this);" onkeyup="keyUp_maxLength(this);" onblur="strToUpper(this);keyUp_maxLength(this);" dataformat="excepthan" style="width:100%;height:250px;text-align:right"><bean:write name="plVO" property="qty"/></textarea></td>
					<td><textarea name="f_desc_good" maxlength="4000" onkeypress="keyPress_maxLength(this);" onkeyup="keyUp_maxLength(this);" onblur="strToUpper(this);keyUp_maxLength(this);" dataformat="excepthan" style="width:100%;height:250px;" ><bean:write name="plVO" property="desc_txt"/></textarea></td>
					<td><textarea name="f_unit" maxlength="1000" onkeypress="keyPress_maxLength(this);" onkeyup="keyUp_maxLength(this);" onblur="strToUpper(this);keyUp_maxLength(this);" dataformat="excepthan" style="width:100%;height:250px;text-align:right" ><bean:write name="plVO" property="price"/></textarea></td>
					<td><textarea name="f_amt" maxlength="1000" onkeypress="keyPress_maxLength(this);" onkeyup="keyUp_maxLength(this);" onblur="strToUpper(this);keyUp_maxLength(this);" dataformat="excepthan" style="width:100%;height:250px;text-align:right" ><bean:write name="plVO" property="amount"/></textarea></td>
				</tr>
			</tbody>
		</table>
	</div>
</div>	
</form>
		
<script type="text/javascript">
doBtnAuthority(attr_extension);
</script>	

