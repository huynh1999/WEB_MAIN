<%--
=========================================================
*@FileName   : SEE_BMD_0210.jsp
*@FileTitle  : Booking And House B/L Search 
*@Description: Booking And House B/L 목록으로 조회한다.
*@author     : Kang,Jung-Gu
*@version    : 
*@since      : 

*@Change history:
*@author     : Hoang.Pham
*@version    : 2.0 - 2014/12/25
*@since      : 2014/12/25
=========================================================
--%>
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
	<script type="text/javascript" src="./apps/fis/see/bmd/housebl/script/SEE_BMD_0210.js?ver=<%=CLT_JS_VER%>"></script>
	<bean:define id="valMap"  name="EventResponse" property="mapVal"/>

	<script type="text/javascript">
		<bean:define id="officeInfo" name="valMap" property="officeInfo"/>
        <bean:define id="ofcVO" name="officeInfo"/>
		var sea_body = "<bean:write name="ofcVO" property="sea_body"/>";
		
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
	<script type="text/javascript">
	function setupPage() {
		loadPage();
	}
	</script>
<form name="frm1">
	<input type="hidden" name="f_cmd" id="f_cmd">
    <input type="hidden" name="f_CurPage" id="f_CurPage"> 
    
	<!-- 세션 유저 정보  -->
	<input	type="hidden" name="f_usr_nm" id="f_usr_nm" value="<%= usrNm %>"/>
	<input	type="hidden" name="f_phn" id="f_phn" value="<%= phn %>"/>
	<input	type="hidden" name="f_fax" id="f_fax" value="<%= fax %>"/>
	<input	type="hidden" name="f_email" id="f_email" value="<%= email %>"/>
	<input	type="hidden" name="u_ofc_cd" id="u_ofc_cd" value="<%= ofc_cd %>"/>
	<input	type="hidden" name="f_ofc_nm" id="f_ofc_nm" value="<%= ofc_eng_nm %>"/>

    <!-- Report Value -->
	<input type="hidden" name="title" id="title" value="">
	<input type="hidden" name="file_name" id="file_name" value="">
	<input type="hidden" name="rd_param" id="rd_param" value="">
	<input type="hidden" name="mailTitle" id="mailTitle" value="">
	<input type="hidden" name="mailTo" id="mailTo" value="">
	<input type="hidden" name="bkg_no" id="bkg_no" value="">
	<input type="hidden" name="bkg_seq" id="bkg_seq" value="">
	
	<!--  Report ==> OutLook연동 파라미터 (S) -->
	<input type="hidden" name="rpt_biz_tp" id="rpt_biz_tp"/>
	<input type="hidden" name="rpt_biz_sub_tp" id="rpt_biz_sub_tp"/>
	<!--  Report ==> OutLook연동 파라미터 (E) -->
	
	<!--  select 조건 추가 combo로 적용 -->
	<input type="hidden" name="f_po_no" id="f_po_no"/>
	<input type="hidden" name="f_lc_no" id="f_lc_no"/>
	<input type="hidden" name="f_lnr_bkg_no" id="f_lnr_bkg_no"/>
	<input type="hidden" name="f_biz_clss_cd" id="f_biz_clss_cd" value="H"/>
	
	<!-- #414 [Brutos] Booking entry -> print -> Email -->
	<input type="hidden" name="intg_bl_seq" id="intg_bl_seq"/>
	<input type="hidden" name="rpt_trdp_cd" id="rpt_trdp_cd"/>

	<!-- GridSetting Value -->
	<input type="hidden" name="user_id" id="user_id"  value="<%=userInfo.getUsrid()%>" />
	<input type="hidden" name="pageurl" id="pageurl" value="SEE_BMD_0210.clt"/>
	<div class="page_title_area clear">
	   <h2 class="page_title"><button type="button"><%=LEV3_NM%></button></h2>
	   <!-- btn_div -->
	   <div class="opus_design_btn"><!--
	   --><button type="button" class="btn_accent" style="display:none;" btnAuth="<%= roleBtnVO.getAttr1() %>" onclick="document.forms[0].f_CurPage.value='';doWork('SEARCHLIST')" id="btn_Retrieve" name="btn_Retrieve"><bean:message key="Search"/></button><!--
	   <!-- [20160830 OJG] EDI 전송기능 제거 
	   <button type="button" class="btn_normal" style="display:none;" btnAuth="SND_BKG_EDI" onClick="doWork('SEND_BKG_EDI');"><bean:message key="BKG"/> <bean:message key="EDI"/>
	   --><button type="button" class="btn_normal" style="display:none;" btnAuth="<%= roleBtnVO.getAttr2() %>"  onClick="doWork('NEW');" id="btn_New" name="btn_New"><bean:message key="New"/></button><!--
	   --><button type="button" class="btn_normal" style="display:none;" btnAuth="CLEAR" onClick="clearAll();" id="btn_Clear" name="btn_Clear"><bean:message key="Clear"/></button><!--
 	   --><button type="button" class="btn_normal" style="display:none;" btnAuth="COPY" onClick="doWork('COPY');" id="btnCopy" name="btnCopy"><bean:message key="Copy"/></button><!-- 
	   --><button type="button" class="btn_normal" style="display:none;" btnAuth="<%= roleBtnVO.getAttr5() %>" onClick="doWork('PRINT');" id="btnPrint" name="btnPrint"><bean:message key="Print"/></button><!--
	   --><button type="button" class="btn_normal" style="display:none;" btnAuth="<%= roleBtnVO.getAttr6() %>" onClick="doWork('EXCEL');" name="btn_DownExcel" id="btn_DownExcel"><bean:message key="Excel"/></button><!--
	   --><button type="button" class="btn_normal" style="display:none;" btnAuth="<%= roleBtnVO.getAttr4() %>" onClick="doWork('DELETE');" name="btn_Delete" id="btn_Delete"><bean:message key="Delete"/></button></div>
	   <!-- btn_div -->
	   <div class="location">
		   <span><%=LEV1_NM%></span> &gt;
		   <span><%=LEV2_NM%></span> &gt;
		   <span><%=LEV3_NM%></span>
		   <a href="" class="ir">URL Copy</a>
	   </div>
	</div>
	<div class="wrap_search">
		<div class="opus_design_inquiry" style="width: 1400px">
			<table>
				<colgroup>
					<col width="80">
					<col width="120">
					<col width="70">
					<col width="250">
					<col width="70">
					<col width="160">
					<col width="80">
					<col width="210">
					<col width="70">
					<col width="70">
					<col width="40">
					<col width="*">
				</colgroup>
				<tbody>
					<tr>
						<th><bean:message key="Bkg_No"/></th>
                        <td><input type="text" name="f_bkg_no" id="f_bkg_no" maxlength="40" style="ime-mode:disabled; text-transform:uppercase;width:100px;" onkeydown="entSearch();"/></td>
						<th><bean:message key="Bkg_Date"/></th>
						<td><input type="text" name="f_bkg_strdt" id="f_bkg_strdt" onKeyUp="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};" onBlur="chkCmprPrd(firCalFlag, false, this, this, frm1.f_bkg_enddt);firCalFlag=false;" size='10' maxlength="10" style="width:77px;"><!--
						--><span class="dash">~</span><input type="text" name="f_bkg_enddt" id="f_bkg_enddt" onKeyUp="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};" onBlur="chkCmprPrd(firCalFlag, false, this, frm1.f_bkg_strdt, this);firCalFlag=false;" size='10' maxlength="10"  style="width:77px;"><!--
						--><button type="button" id="bkg_dt_cal" name="bkg_dt_cal" onclick="doDisplay('DATE11', frm1);" class="calendar" tabindex="-1"></button></td>
						<th><bean:message key="Partner"/></th>
						<td><input type="text" name="f_prnr_trdp_nm" id="f_prnr_trdp_nm" maxlength="50" style="ime-mode:disabled; text-transform:uppercase;width:95px;" onKeyPress="if(event.keyCode==13){doWork('PRNR_TRDP_POPLIST', frm1.f_prnr_trdp_nm.value);}"/><!--
						--><button type="button"  id="btn_Partner" name="btn_Partner" class="input_seach_btn" tabindex="-1" onclick="doWork('PRNR_TRDP_POPLIST')"></button></td>
					    <th><bean:message key="Consignee"/></th>
                        <td><input type="text" name="f_cnee_trdp_nm" maxlength="50" style="ime-mode:disabled; text-transform:uppercase;width:95px;" onKeyPress="if(event.keyCode==13){doWork('CNEE_TRDP_POPLIST', frm1.f_cnee_trdp_nm.value);}"/><!-- 
						--><button type="button"  id="btn_Consignee" name="btn_Consignee" class="input_seach_btn" tabindex="-1" onclick="doWork('CNEE_TRDP_POPLIST')"></button></td>
			          	<th><bean:message key="Ship_Mode"/></th>
                        <td>
							<bean:define id="shipModeList" name="valMap" property="shipModeList"/>
							<select name="f_shp_mod_cd" id="f_shp_mod_cd" style="width:60px">
								<option value=''>ALL</option>
								<logic:iterate id="comVO" name="shipModeList">
								<option value='<bean:write name="comVO" property="cd_val"/>'><bean:write name="comVO" property="cd_nm"/></option>
								</logic:iterate>
							</select>
						</td>
						<th><bean:message key="Office"/></th>
                        <td>
                           <bean:define id="oficeList" name="valMap" property="ofcList"/><input  type="hidden" name="s_ofc_cd" value="<bean:write name="valMap" property="ofc_cd"/>"/><!--  
                           --><select name="f_ofc_cd" id="f_ofc_cd" style="width:70px">
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
					<col width="80">
					<col width="110">
					<col width="80">
					<col width="250">
					<col width="70">
					<col width="160">
					<col width="80">
					<col width="120">
					<col width="150">
					<col width="*">
				</colgroup>
				<tbody>
					<tr>
						<th><bean:message key="HBL_No"/></th>
                        <td><input type="text" name="f_hbl_no" id="f_hbl_no" maxlength="40" style="ime-mode:disabled; text-transform:uppercase;width:100px;" onkeydown="entSearch();"/></td>
                        <th><bean:message key="POL"/></th>
                        <td><input type="text"   name="f_pol_cd" id="f_pol_cd"  maxlength="5" value=''  onKeyDown="codeNameAction('location_pol',this, 'onKeyDown','S')" onBlur="codeNameAction('location_pol',this, 'onBlur','S');" style="ime-mode:disabled; text-transform:uppercase;width:55px;"/><!-- 
                        	--><button type="button"  id="pol" name="pol" class="input_seach_btn" tabindex="-1" onclick="doWork('POL_LOCATION_POPLIST')"></button><!-- 
                            --><input type="text"   name="f_pol_nm" id="f_pol_nm"  maxlength="50"   style="ime-mode:disabled; text-transform:uppercase;width:110px;" onKeyPress="if(event.keyCode==13){doWork('POL_LOCATION_POPLIST', frm1.f_pol_nm.value);}"/></td>
                        <th><bean:message key="Shipper"/></th>
                        <td><input type="text" name="f_shpr_trdp_nm" id="f_shpr_trdp_nm" maxlength="50"  style="ime-mode:disabled; text-transform:uppercase;width:95px;" onKeyPress="if(event.keyCode==13){doWork('SHIP_TRDP_POPLIST', frm1.f_shpr_trdp_nm.value);}"/><!-- 
                        	--><button type="button"  id="shpr" name="shpr" class="input_seach_btn" tabindex="-1" onclick="doWork('SHIP_TRDP_POPLIST')"></button></td>
                        <th><bean:message key="Notify"/></th>
                        <td><input type="text" name="f_ntfy_trdp_nm" maxlength="50"  style="ime-mode:disabled; text-transform:uppercase;width:95px;" onKeyPress="if(event.keyCode==13){doWork('NTFY_TRDP_POPLIST', frm1.f_ntfy_trdp_nm.value);}"/><!-- 
							--><button type="button"  id="btn_Notify" name="btn_Notify" class="input_seach_btn" tabindex="-1" onclick="doWork('NTFY_TRDP_POPLIST')"></button></td>
                        <th><select name="f_sel_cd" id="f_sel_cd" style="width:120px" onChange="searchValueClear();">
								<option value='PO_NO'><bean:message key="PO_No"/></option>
								<option value='LC_NO'><bean:message key="LC_No"/></option>
								<option value='LNR_BKG_NO'><bean:message key="Liner_Bkg"/></option>
							</select></th>
                    	<td><input type="text" name="f_sel_no" id="f_sel_no" maxlength="20" style="ime-mode:disabled; text-transform:uppercase;width:177px" onkeydown="entSearch();"/></td>
					</tr>
				</tbody>
			</table>
			<table>
				<colgroup>
					<col width="80">
					<col width="100">
					<col width="90">
					<col width="230">
					<col width="70">
					<col width="160">
					<col width="80">
					<col width="*">
				</colgroup>
				<tbody>
					<tr>
						<th></th>
						<td></td>
                        <th><bean:message key="POD"/></th>
                        <td><input type="text" name="f_pod_cd" maxlength="5" value='' onKeyDown="codeNameAction('location_pod',this, 'onKeyDown','S')" onBlur="codeNameAction('location_pod',this, 'onBlur','S');" style="ime-mode:disabled; text-transform:uppercase;width:55px;"/><!-- 
                        	--><button type="button"  id="pod" name="pod" class="input_seach_btn" tabindex="-1" onclick="doWork('POD_LOCATION_POPLIST')"></button><!--
                        	--><input type="text" name="f_pod_nm" id="f_pod_nm" maxlength="50"   style="ime-mode:disabled; text-transform:uppercase;width:110px;" onKeyPress="if(event.keyCode==13){doWork('POD_LOCATION_POPLIST', frm1.f_pod_nm.value);}"/>
                        </td>
                        <th><bean:message key="A_Shipper"/></th>
                        <td><input type="text" name="f_ahpr_trdp_nm" id="f_ahpr_trdp_nm" maxlength="50"  style="ime-mode:disabled; text-transform:uppercase;width:95px;" onKeyPress="if(event.keyCode==13){doWork('ASHIP_TRDP_POPLIST', frm1.f_ahpr_trdp_nm.value);}"/><!--
                        	--><button type="button"  id="aShpr" name="aShpr" class="input_seach_btn" tabindex="-1" onclick="doWork('ASHIP_TRDP_POPLIST')"></button></td>
                        <th><bean:message key="Vessel_Name"/></th>
                        <td><input type="text" name="f_trnk_vsl_nm" id="f_trnk_vsl_nm" maxlength="50"  style="ime-mode:disabled; text-transform:uppercase;width:95px;" onkeydown="entSearch();"/></td>
                    </tr>
				</tbody>
			</table>
		</div>
	</div>
	<div class="wrap_result">
		<div class="opus_design_grid">
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
</form>
<script type="text/javascript">
	doBtnAuthority("<%= roleBtnVO.getAttr_extension() %>");
	$('.tab_search_form').css("height", "25px");
</script>
<%@page import="java.net.URLEncoder"%>	