<%--
=========================================================
*@FileName   : CMM_POP_0220.jsp
*@FileTitle  : Invoice Exchange Rate Search
*@Description: Invoice환률 조회 팝업
*@author     : Kang,Jung Gu - Cyberlogitec
*@version    : 1.0 - 01/21/2009
*@since      : 01/19/2009

*@Change history:
=========================================================
--%>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="clt-paging"   prefix="paging" %>
	<!-- 공통 Header -->
	<%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
	<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css"/>
	
	<script language="javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
    <script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/PUP_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
    <script language="javascript" src="./apps/fis/cmm/pop/exchangemgt/script/CMM_POP_0220.js?ver=<%=CLT_JS_VER%>"></script>
    
    <script>
		function setupPage(){
			loadPage();setToday();doWork('SEARCHLIST02');
		}
	</script>	
<form name="frm1" method="POST" action="./">
	<!--Command를 담는 공통 -->
	<input type="hidden" name="f_cmd"/> 
	<input type="hidden" name="f_CurPage"/>
	<input type="hidden" name="trdp_cd"/>
	<input type="hidden" name="openMean"/>

<%  String currFrm  = "";
	String currInv  = "";
	String trdpCod  = "";
	String trdpNam  = "";
%>
	<bean:define id="hMap"    name="EventResponse" property="mapVal"/>
	<bean:define id="tmpFrm"   name="hMap" property="f_fm_curr_cd"/>
	<bean:define id="tmpInv"   name="hMap" property="f_inv_curr_cd"/>
	
	<logic:notEmpty name="hMap" property="f_trdp_cd">
		<bean:define id="tmpTrcd"  name="hMap" property="f_trdp_cd"/>
		<% trdpCod  = tmpTrcd.toString(); %>	
	</logic:notEmpty>

    <logic:notEmpty name="hMap" property="f_trdp_nm">
        <bean:define id="tmpTrnm"  name="hMap" property="f_trdp_nm"/>   
        <% trdpNam  = tmpTrnm.toString(); %>
    </logic:notEmpty>
	
	<html:hidden name="hMap" property="f_dft_dt"/> 
<%
		currFrm  = tmpFrm.toString();
		currInv  = tmpInv.toString();
%>
	<div class="layer_popup_title">	
		<!-- page_title_area(S) -->
		<div class="page_title_area">
		   <h2 class="page_title"><span><bean:message key="Invoice_Exchange_Rate_Search"/></span></h2>
		   <!-- btn_div -->
		   <div class="opus_design_btn">
			   <button type="button" class="btn_accent" onclick="doWork('SEARCHLIST02')"><bean:message key="Search"/></button><!-- 
			 --><button type="button" class="btn_normal" onclick="ComClosePopup();"><bean:message key="Close"/></button>
		   </div>
		</div>
	</div>
	<div class="layer_popup_contents">
		<!-- wrap search(S) -->
		<div class="wrap_search">
			<div class="opus_design_inquiry  ">
				<table>
					<colgroup>
						<col width="30">
						<col width="50">
						<col width="90">
						<col width="120">
						<col width="120">
						<col width="*">
					</colgroup>
					<tbody>
	                  <tr>
	                      <th><bean:message key="Curr"/></th>
	                      <td>
	                          <input name="f_fm_curr_cd"  type="text" value="<%=currFrm%>" class="search_form" style="width:30px;" readOnly><!-- 
	                       -->/&nbsp;<!-- 
	                       --><input name="f_inv_curr_cd" type="text" value="<%=currInv%>" class="search_form" style="width:30px;" readOnly>
	                      </td>
	                      <th><bean:message key="Customer"/></th>
	                      <td>                                                                       
							   <input type="text" name="f_trdp_cd" size='8'  maxlength="10" class="search_form" onKeyDown="codeNameAction('CUST', this, 'onKeyDown');" onblur="strToUpper(this);codeNameAction('CUST', this, 'onBlur');" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:70px;"><!-- 
							--><button type="button" class="input_seach_btn" tabindex="-1"  onclick="doWork('TRDP_POPLIST')"></button><!-- 
							--><input type="text" name="f_trdp_nm" size='24' class="search_form-disable" disabled="true"/>
	                       </td>
	                      <th>
	                          <input type="radio" name="f_dt_clss_cd" id="f_dt_clss_cd1" value="D" onclick="chgDisp(1)" checked><label for="f_dt_clss_cd1"><bean:message key="Day"/></label> 
	                          <input type="radio" name="f_dt_clss_cd" id="f_dt_clss_cd2" value="M" onclick="chgDisp(2)"><label for="f_dt_clss_cd2"><bean:message key="Month"/></label>                                    
	                      </th>
	                      <td>
	                          <div id="dayVal" style="display:block;">
									<input type="text" name="etd_strdt" id="etd_strdt" value="<wrt:write name="hMap" property="f_dft_dt" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy"/>" onKeyUp="mkDateFormatType(this, event, false, 1)" onBlur="mkDateFormatType(this, event, true, 1)" size='11' maxlength="10" class="search_form"><!-- 
								--><button type="button" class="calendar" tabindex="-1" name="etd_dt_cal" id="f_post_dt_cal" onclick="doDisplay('DATE01', frm1);"></button>
	                          </div>
	                          <div id="monthVal" style="display:none;">
	                              <select name="f_etd_year">
	                              </select><!-- 
	                           -->/&nbsp;<!-- 
	                           --><select name="f_etd_month">
	                                  <option value="01">1</option><option value="02">2</option><option value="03">3</option>
	                                  <option value="04">4</option><option value="05">5</option><option value="06">6</option>
	                                  <option value="07">7</option><option value="08">8</option><option value="09">9</option>
	                                  <option value="10">10</option><option value="11">11</option><option value="12">12</option>
	                              </select>
	                          </div>                                  
	                      </td>
	                  </tr>
	                  </tbody>
	              </table>
			</div>
		</div>
	    <div class="wrap_result">
			<div class="opus_design_grid">
				<script language="javascript">comSheetObject('sheet1');</script>
			</div>
		</div>
	</div>
</form>

