<%--
=========================================================
*@FileName   : AIE_BMD_0310.jsp
*@FileTitle  : Air Quotation Search 
*@Description: Air Quotation 목록으로 조회한다.
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
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/AIR_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="./apps/fis/aie/bmd/masterbl/script/AIE_BMD_0310.js?ver=<%=CLT_JS_VER%>"></script>
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
	<input	type="hidden" name="f_ofc_cd" id="f_ofc_cd" value="<%= ofc_cd %>"/>
	<input	type="hidden" name="f_ofc_nm" id="f_ofc_nm" value="<%= ofc_eng_nm %>"/>

    <!-- Report Value -->
	<input type="hidden" name="title" id="title" value="">
	<input type="hidden" name="file_name" id="file_name" value="">
	<input type="hidden" name="rd_param" id="rd_param" value="">
	<input type="hidden" name="mailTitle" id="mailTitle" value="">
	<input type="hidden" name="mailTo" id="mailTo" value="">
	<input type="hidden" name="qttn_no" id="qttn_no" value="">
	<input type="hidden" name="qttn_seq" id="qttn_seq" value="">
	
	<input type="hidden" name="air_sea_clss_cd" id="air_sea_clss_cd" value="<bean:write name="valMap" property="air_sea_clss_cd"/>" />
	<input type="hidden" name="bnd_clss_cd" id="bnd_clss_cd" value="<bean:write name="valMap" property="bnd_clss_cd"/>" />
	
	<!--  Report ==> OutLook연동 파라미터 (S) -->
	<input type="hidden" name="rpt_biz_tp" id="rpt_biz_tp"/>
	<input type="hidden" name="rpt_biz_sub_tp" id="rpt_biz_sub_tp"/>
	<!--  Report ==> OutLook연동 파라미터 (E) -->
	
	<!-- GridSetting Value -->
	<input type="hidden" name="user_id" id="user_id"  value="<%=userInfo.getUsrid()%>" />
	<input type="hidden" name="pageurl" id="pageurl" value="AIE_BMD_0310.clt"/>
	<div class="page_title_area clear">
		<!-- page_title(S) -->
		<h2 class="page_title"><button type="button"><%=LEV3_NM%></button></h2>
		<!-- page_title(E) -->
		
	   <!-- btn_div 310-->
	   <div class="opus_design_btn TOP">
	   		<%-- 
		   <button type="button" class="btn_accent" style="display:none;" btnAuth="<%= roleBtnVO.getAttr1() %>" onclick="document.forms[0].f_CurPage.value='';doWork('SEARCHLIST')" id="btn_Retrieve" name="btn_Retrieve"><bean:message key="Search"/></button>
		   <button type="button" class="btn_normal" style="display:none;" btnAuth="<%= roleBtnVO.getAttr2() %>"  onClick="doWork('NEW');" id="btn_New" name="btn_New"><bean:message key="New"/></button>
		   <button type="button" class="btn_normal" style="display:none;" btnAuth="CLEAR" onClick="clearAll();" id="btn_Clear" name="btn_Clear"><bean:message key="Clear"/></button>
		   <button type="button" class="btn_normal" style="display:none;" btnAuth="COPY" id="btnCopy"  onClick="doWork('COPY');"><bean:message key="Copy"/></button>	  
		   <button type="button" class="btn_normal" style="display:none;" btnAuth="<%= roleBtnVO.getAttr5() %>" onClick="doWork('PRINT');" id="btnPrint" name="btnPrint"><bean:message key="Print"/></button>
		   <button type="button" class="btn_normal" style="display:none;" btnAuth="<%= roleBtnVO.getAttr6() %>" onClick="doWork('EXCEL');" name="btn_DownExcel" id="btn_DownExcel"><bean:message key="Excel"/></button>
		   <button type="button" class="btn_normal" style="display:none;" btnAuth="<%= roleBtnVO.getAttr4() %>" onClick="doWork('DELETE');" name="btn_Delete" id="btn_Delete"><bean:message key="Delete"/></button>
 		   --%>		   
	   </div>
	   <!-- btn_div -->
	   	<div class="location">
        <!-- location 내용 동적생성 (별도 코딩 불필요) -->
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
					<col width="80">
					<col width="120">
					<col width="70">
					<col width="250">
					<col width="70">
					<col width="160">
					<col width="140">
					<col width="*">
				</colgroup>
				<tbody>
					<tr>
						<th><bean:message key="Quotation_No"/></th>
                        <td>
                        	<input type="text" name="f_qttn_no" id="f_qttn_no" maxlength="20" style="ime-mode:disabled; text-transform:uppercase;width:150px;" onkeydown="entSearch();"/></td>
						<th><bean:message key="Quotation_Date"/></th>
						<td>
							<input type="text" name="f_qttn_strdt" id="f_qttn_strdt" onKeyUp="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};" onBlur="chkCmprPrd(firCalFlag, false, this, this, frm1.f_qttn_enddt);firCalFlag=false;" size='10' maxlength="10" style="width:77px;"><!--
							--><span class="dash">~</span><input type="text" name="f_qttn_enddt" id="f_qttn_enddt" onKeyUp="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};" onBlur="chkCmprPrd(firCalFlag, false, this, frm1.f_qttn_strdt, this);firCalFlag=false;" size='10' maxlength="10"  style="width:77px;"><!--
							--><button type="button" id="qttn_dt_cal" name="qttn_dt_cal" onclick="doDisplay('DATE11', frm1);" class="calendar" tabindex="-1"></button></td>
						<th><bean:message key="Quoted_By"/></th>
		               	<td>
		               		<input type="text"   name="f_opr_usr_id" id="f_opr_usr_id" class="search_form" style="width:80px;"><!--
		               		--><button type="button"  id="btn_opr_usr_id" name="btn_opr_usr_id" class="input_seach_btn" tabindex="-1" onClick="doWork('OPR_POPLIST')"></button></td>
					</tr>
					<tr>
						<th><bean:message key="Customer"/></th>
                        <td>
                        	<input type="text" name="f_cust_cd" id="f_cust_cd" maxlength="20" class="search_form" onKeyDown="codeNameAction('CUST',this,'onKeyDown')" onBlur="strToUpper(this);codeNameAction('CUST',this,'onBlur');" style="ime-mode:disabled; text-transform:uppercase;width:60px;" onblur="strToUpper(this);"><!--
                           	--><button type="button" id="cust" name="cust" class="input_seach_btn" tabindex="-1" onClick="doWork('CUST_POPLIST')"></button><!--
                            --><input type="text" name="f_cust_nm" id="f_cust_nm" maxlength="200" class="search_form" style="ime-mode:disabled;text-transform:uppercase;width:180px;" onblur="strToUpper(this)" onKeyPress="if(event.keyCode==13){doWork('CUST_POPLIST_NAME');}">
                     	</td>
						<!-- <th><bean:message key="POR"/></th>
                       	<td>
                       		<input type="text" name="f_por_cd" id="f_por_cd" maxlength="5" class="search_form" onKeyDown="codeNameAction('POR',this, 'onKeyDown','A')" onBlur="strToUpper(this);codeNameAction('POR',this, 'onBlur','A')" style="ime-mode:disabled; text-transform:uppercase;width:60px;">
                           		<button type="button"  id="por" name="por" class="input_seach_btn" tabindex="-1" onClick="locOpenPopUp(this,'A')"></button>
                            	<input type="text" name="f_por_nm" id="f_por_nm" maxlength="50" class="search_form" style="ime-mode:disabled;width:238px;text-transform:uppercase;" onblur="strToUpper(this)" onKeyPress="if(event.keyCode==13){locOpenPopUp(document.getElementById('por'), 'A');}">
						</td> -->
						<th><bean:message key="POL"/></th>
						<td>
							<input type="text" name="f_pol_cd" id="f_pol_cd" maxlength="5" class="search_form" onKeyDown="codeNameAction('POL',this, 'onKeyDown','A')" onBlur="strToUpper(this);codeNameAction('POL',this, 'onBlur','A')" style="ime-mode:disabled; text-transform:uppercase;width:60px;"><!--
							--><button type="button"  id="pol" name="pol" class="input_seach_btn" tabindex="-1" onClick="locOpenPopUp(this,'A')"></button><!--
							--><input type="text" name="f_pol_nm" id="f_pol_nm" maxlength="50" class="search_form" style="ime-mode:disabled; text-transform:uppercase;width:180px;text-transform:uppercase;" onblur="strToUpper(this);" onKeyPress="if(event.keyCode==13){locOpenPopUpName(document.getElementById('pol'), 'A');}">
						</td>
						<th><bean:message key="POD"/></th>
						<td>
							<input type="text" name="f_pod_cd" id="f_pod_cd" maxlength="5" class="search_form" onKeyDown="codeNameAction('POD',this, 'onKeyDown','A')" onBlur="strToUpper(this);codeNameAction('POD',this, 'onBlur','A')" style="ime-mode:disabled; text-transform:uppercase;width:60px;"><!--
							--><button type="button"  id="pod" name="pod" class="input_seach_btn" tabindex="-1" onClick="locOpenPopUp(this,'A')"></button><!--
							--><input type="text" name="f_pod_nm" id="f_pod_nm" maxlength="50" class="search_form" style="ime-mode:disabled; text-transform:uppercase;width:180px;text-transform:uppercase;" onblur="strToUpper(this);" onKeyPress="if(event.keyCode==13){locOpenPopUpName(document.getElementById('pod'), 'A');}">
						</td>
						<th><bean:message key="Show_Total_Amount"/></th>
                        <td>
							<input type="checkBox" name="show_ttl_amt_chk" id="show_ttl_amt_chk" >
                     	</td>
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
</form>
<script type="text/javascript">
	doBtnAuthority("<%= roleBtnVO.getAttr_extension() %>");
</script>
<%@page import="java.net.URLEncoder"%>	
