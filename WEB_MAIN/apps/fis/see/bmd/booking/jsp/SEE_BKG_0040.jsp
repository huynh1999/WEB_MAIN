<%--
=========================================================
*@FileName   : SEE_BMD_0510.jsp
*@FileTitle  : Carrier Booking And House B/L Search 
*@Description: Carrier Booking And House B/L 목록으로 조회한다.
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
	<script type="text/javascript" src="./apps/fis/see/bmd/booking/script/SEE_BKG_0040.js?ver=<%=CLT_JS_VER%>"></script>
	<bean:define id="valMap"  name="EventResponse" property="mapVal"/>
	<script type="text/javascript">
		<bean:define id="officeInfo" name="valMap" property="officeInfo"/>
        <bean:define id="ofcVO" name="officeInfo"/>
		var sea_body = "<bean:write name="ofcVO" property="sea_body"/>";
		var BKGSTSCD = ' |';
		var BKGSTSNM = ' |';
		<% boolean isBegin = false; %>
	    <bean:define id="bkgStsCdList" name="valMap" property="bkgStsCdList"/>
		<logic:iterate id="BgkStsCdVO" name="bkgStsCdList">
			<% if(isBegin){ %>
				BKGSTSCD+= '|';
				BKGSTSNM+= '|';
			<% }else{
				  isBegin = true;
			   } %>
			   BKGSTSCD+= '<bean:write name="BgkStsCdVO" property="cd_val"/>';
			   BKGSTSNM+= '<bean:write name="BgkStsCdVO" property="cd_nm"/>';
		</logic:iterate>		
		var BKGNOMICD = ' |';
		var BKGNOMINM = ' |';
		<% boolean isBegin1 = false; %>
	    <bean:define id="slsCdList" name="valMap" property="slsCdList"/>
		<logic:iterate id="BgslsCdVO" name="slsCdList">
			<% if(isBegin1){ %>
				BKGNOMICD+= '|';
				BKGNOMINM+= '|';
			<% }else{
				  isBegin1 = true;
			   } %>
			   BKGNOMICD+= '<bean:write name="BgslsCdVO" property="cd_val"/>';
			   BKGNOMINM+= '<bean:write name="BgslsCdVO" property="cd_nm"/>';
		</logic:iterate>	
		
		var user_ofc_cnt_cd = "<%=userInfo.getOfc_cnt_cd()%>";
		var uod_flg ="<%= userInfo.getUod_flg()%>";
		var usrId = "<%= userInfo.getUsrid() %>";
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
    <input type="hidden" name="chk_bkg_seq"  />
    <input type="hidden" name="main_bkg_seq"  />
    <input type="hidden" name="chk_origin"  />
    <input type="hidden" name="combine_no"  />
    <input type="hidden" name="lnr_bkg_no"  />
    
	<!-- 세션 유저 정보  -->
	<input	type="hidden" name="f_usr_nm" id="f_usr_nm" value="<%= usrNm %>"/>
	<input	type="hidden" name="f_phn" id="f_phn" value="<%= phn %>"/>
	<input	type="hidden" name="f_fax" id="f_fax" value="<%= fax %>"/>
	<input	type="hidden" name="f_email" id="f_email" value="<%= email %>"/>
	<input	type="hidden" name="u_ofc_cd" id="u_ofc_cd" value="<%= ofc_cd %>"/>
	<input	type="hidden" name="f_ofc_nm" id="f_ofc_nm" value="<%= ofc_eng_nm %>"/>
	
	<!--  select 조건 추가 combo로 적용 -->
	<input type="hidden" name="f_prnr_trdp_nm" id="f_prnr_trdp_nm"/>
	<input type="hidden" name="f_shpr_trdp_nm" id="f_shpr_trdp_nm"/>
	<input type="hidden" name="f_cnee_trdp_nm" id="f_cnee_trdp_nm"/>
	<input type="hidden" name="f_ntfy_trdp_nm" id="f_ntfy_trdp_nm"/>
	<input type="hidden" name="f_ahpr_trdp_nm" id="f_ahpr_trdp_nm"/>
	<input type="hidden" name="f_mbl_no" id="f_mbl_no"/>
	<input type="hidden" name="f_hbl_no" id="f_hbl_no"/>
	<input type="hidden" name="f_po_no" id="f_po_no"/>
	<input type="hidden" name="f_lc_no" id="f_lc_no"/>
	
	<!-- #414 [Brutos] Booking entry -> print -> Email -->
	<input type="hidden" name="intg_bl_seq" id="intg_bl_seq"/>
	<input type="hidden" name="rpt_trdp_cd" id="rpt_trdp_cd"/>

	<!-- GridSetting Value -->
	<input type="hidden" name="user_id" id="user_id"  value="<%=userInfo.getUsrid()%>" />
	<input type="hidden" name="pageurl" id="pageurl" value="SEE_BMD_0510.clt"/>
	<div class="page_title_area clear">
	   <h2 class="page_title"><button type="button"><%=LEV3_NM%></button></h2>
	   <!-- btn_div -->
	   <div class="opus_design_btn TOP">
		   <%-- 
		   <button type="button" class="btn_accent" style="display:none;" btnAuth="<%= roleBtnVO.getAttr1() %>" onclick="document.forms[0].f_CurPage.value='';doWork('SEARCHLIST')" id="btn_Retrieve" name="btn_Retrieve"><bean:message key="Search"/></button>
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
<div class="over_wrap" height="100%">
	<div class="wrap_search">
		<div class="opus_design_inquiry entry_pannel" style="width: 1400px">
			<table>
				<colgroup>
					<col width="95">
					<col width="120">
					<col width="70">
					<col width="220">
					<col width="110">
					<col width="150">
					<col width="70">
					<col width="*">
				</colgroup>
				<tbody>
					<tr>
						<th><bean:message key="Booking_Type"/></th>	
                        <td><select name="f_biz_clss_cd" id="f_biz_clss_cd" style="width:100px">
								<option value='M'><bean:message key="Carrier_Booking"/></option>
								<option value='H'><bean:message key="Customer_Booking"/></option>
							</select>
						</td>	
						<th><bean:message key="Bkg_Date"/></th>
						<td><input type="text" name="f_bkg_strdt" id="f_bkg_strdt" onKeyUp="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};" onBlur="chkCmprPrd(firCalFlag, false, this, this, frm1.f_bkg_enddt);firCalFlag=false;" size='10' maxlength="10" style="width:77px;"><!--
						--><span class="dash">~</span><input type="text" name="f_bkg_enddt" id="f_bkg_enddt" onKeyUp="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};" onBlur="chkCmprPrd(firCalFlag, false, this, frm1.f_bkg_strdt, this);firCalFlag=false;" size='10' maxlength="10"  style="width:77px;"><!--
						--><button type="button" id="bkg_dt_cal" name="bkg_dt_cal" onclick="doDisplay('DATE11', frm1);" class="calendar" tabindex="-1"></button></td>
						<th><bean:message key="Ship_Mode"/></th>
                        <td>
							<bean:define id="shipModeList" name="valMap" property="shipModeList"/>
							<select name="f_shp_mod_cd" id="f_shp_mod_cd" style="width:130px">
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
                    <tr>
                        <th><bean:message key="Carrier_Bkg_No"/></th>
                        <td><input type="text" name="f_lnr_bkg_no" id="f_lnr_bkg_no" maxlength="40" style="ime-mode:disabled; text-transform:uppercase;width:100px;" onkeydown="entSearch();"/></td>
						<th><select name="f_sel_trdp_tp" id="f_sel_trdp_tp" style="width:100px" onChange="searchValueClear('TRDP');">
								<option value='PRNR'><bean:message key="Partner"/></option>
								<option value='SHPR'><bean:message key="Shipper"/></option>
								<option value='CNEE'><bean:message key="Consignee"/></option>
								<option value='NTFY'><bean:message key="Notify"/></option>
								<option value='AHPR'><bean:message key="A_Shipper"/></option>
							</select>
						</th>
						<td><input type="text" name="f_sel_trdp_nm" id="f_sel_trdp_nm" maxlength="50" style="ime-mode:disabled; text-transform:uppercase;width:101px;" onKeyPress="if(event.keyCode==13){doWork('TRDP_POPLIST', frm1.f_sel_trdp_nm.value);}"/><!--
						--><button type="button"  id="btn_trdp" name="btn_trdp" class="input_seach_btn" tabindex="-1" onclick="doWork('TRDP_POPLIST')"></button></td>
                        <th><bean:message key="Vessel_Name"/></th>
                        <td><input type="text" name="f_trnk_vsl_nm" id="f_trnk_vsl_nm" maxlength="50"  style="ime-mode:disabled; text-transform:uppercase;width:130px;" onkeydown="entSearch();"/></td>
						
						                        

					</tr>
					                        					
					<tr>
                        <th><bean:message key="POL"/></th>
                        <td><input type="text"   name="f_pol_cd" id="f_pol_cd"  maxlength="5" value=''  onKeyDown="codeNameAction('location_pol',this, 'onKeyDown','S')" onBlur="codeNameAction('location_pol',this, 'onBlur','S');" style="ime-mode:disabled; text-transform:uppercase;width:55px;"/><!-- 
                        	--><button type="button"  id="pol" name="pol" class="input_seach_btn" tabindex="-1" onclick="doWork('POL_LOCATION_POPLIST')"></button><!-- 
                            --><input type="text"   name="f_pol_nm" id="f_pol_nm"  maxlength="50"   style="ime-mode:disabled; text-transform:uppercase;width:110px;" onKeyPress="if(event.keyCode==13){doWork('POL_LOCATION_POPLIST', frm1.f_pol_nm.value);}"/></td>
                        <th><bean:message key="POD"/></th>
                        <td><input type="text" name="f_pod_cd" maxlength="5" value='' onKeyDown="codeNameAction('location_pod',this, 'onKeyDown','S')" onBlur="codeNameAction('location_pod',this, 'onBlur','S');" style="ime-mode:disabled; text-transform:uppercase;width:55px;"/><!-- 
                        	--><button type="button"  id="pod" name="pod" class="input_seach_btn" tabindex="-1" onclick="doWork('POD_LOCATION_POPLIST')"></button><!--
                        	--><input type="text" name="f_pod_nm" id="f_pod_nm" maxlength="50"   style="ime-mode:disabled; text-transform:uppercase;width:110px;" onKeyPress="if(event.keyCode==13){doWork('POD_LOCATION_POPLIST', frm1.f_pod_nm.value);}"/>
                        </td>
                        <td></td>
						<td></td>
						<td></td>
						<td></td>
					</tr>
                    </tr>

				</tbody>
			</table>
		</div>
	</div>
	<div class="wrap_result">
	<div class="opus_design_grid">
		<!-- combine 완료 후 보여줌 -->		
	    <h3> &nbsp;&nbsp;<span id="combineMsg" ></span></h3>
		<div class="opus_design_btn"> 	
		<input name="f_chk_o" type="checkbox" valign="middle"> <bean:message key="Keep_Original_Booking"/><!--&nbsp;&nbsp;
		<button id="btnCombine" onClick="javascript:combineBkg();" type="button" class="btn_normal" style="float: right;"><bean:message key="Combine"/></button> -->
		</div>
		<div class="opus_design_grid">
			<script type="text/javascript">comSheetObject('sheet1');</script>
		</div>
		</div>
	</div>
</div>
</form>

