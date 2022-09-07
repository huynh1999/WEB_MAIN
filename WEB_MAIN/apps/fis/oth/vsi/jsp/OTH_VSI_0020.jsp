<%
/*=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : OTH_VSI_0020.jsp
*@FileTitle  : Shipping Instruction List
*@author     : CLT
*@version    : 1.0
*@since      : 2014/06/12
=========================================================*/
%>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="clt-paging"   prefix="paging" %>
	<%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
	<!-- 공통 Header -->
	<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css"/>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/SUP_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="./apps/fis/oth/vsi/script/OTH_VSI_0020.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript">
	function setupPage(){
		loadPage();
		}
		var pDoc = parent.parent.parent.document;
		hideProcess("WORKING", pDoc);
	</script>
	<%
		String ofc_cd = userInfo.getOfc_cd();
		String ofc_eng_nm = userInfo.getOfc_eng_nm();
		String usrNm = userInfo.getUser_name();
		String phn = userInfo.getPhn();
		String fax = userInfo.getFax();
		String email = userInfo.getEml();
	%>
	
<form name="frm1">
	<!-- Command를 담는 공통 --><!-- 
	 --><input id="f_cmd" name="f_cmd" type="hidden" /><!--
	 --><input id="s_ca_no" name="s_ca_no" type="hidden" /><!--
	 --><input id="s_intg_bl_seq" name="s_intg_bl_seq" type="hidden" /><!--
	 --><input id="s_biz_clss_cd" name="s_biz_clss_cd" type="hidden" /><!--
	 --><input id="f_usr_nm" name="f_usr_nm" value="<%= usrNm %>" type="hidden" /><!--
	 --><input id="f_phn" name="f_phn" value="<%= phn %>" type="hidden" /><!--
	 --><input id="f_fax" name="f_fax" value="<%= fax %>" type="hidden" /><!--
	 --><input id="f_email" name="f_email" value="<%= email %>" type="hidden" /><!--
	 --><input id="f_ofc_nm" name="f_ofc_nm" value="<%= ofc_eng_nm %>" type="hidden" />
	
	    <!-- Report Value --><!--
	--><input id="title" name="title" value="" type="hidden" /><!--
	--><input id="file_name" name="file_name" value="" type="hidden" /><!--
	--><input id="rd_param" name="rd_param" value="" type="hidden" /><!--
	--><input id="mailTitle" name="mailTitle" value="" type="hidden" /><!--
	--><input id="mailTo" name="mailTo" value="" type="hidden" /><!--
	--><input id="intg_bl_seq" name="intg_bl_seq" value="" type="hidden" /><!--
	--><input id="rlt_intg_bl_seq" name="rlt_intg_bl_seq" value="" type="hidden" /><!--
	--><input id="s_intg_bl_seq" name="s_intg_bl_seq" value="" type="hidden" /><!--
	--><input id="master_bl_no" name="master_bl_no" value="" type="hidden" /><!--
	--><input id="house_bl_no" name="house_bl_no" value="" type="hidden" />
	
	<!--  Report ==> OutLook연동 파라미터 (S) --><!-- 
	--><input id="rpt_biz_tp" name="rpt_biz_tp" type="hidden" /><!--
	--><input id="rpt_biz_sub_tp" name="rpt_biz_sub_tp" type="hidden" />
	<!--  Report ==> OutLook연동 파라미터 (E) -->
	<div class="page_title_area clear">
			<!-- page_title(S) -->
			<h2 class="page_title"><button type="button"><%=LEV3_NM%></button></h2>
			<!-- page_title(E) -->
			
			<!-- opus_design_btn(S) -->
			<div class="opus_design_btn TOP">
				<%-- 
				<button type="button" class="btn_accent" style="cursor:hand; display:none;" btnAuth="<%= roleBtnVO.getAttr1() %>" onclick="doWork('SEARCHLIST');" id="btnSearch" name="btnSearch"><bean:message key="Search"/></button> 
				<button type="button" class="btn_normal" style="cursor:hand; display:none;" btnAuth="<%= roleBtnVO.getAttr2() %>" onclick="doWork('NEW')" id="btnNew" name="btnNew"><bean:message key="New"/></button>
				<button type="button" class="btn_normal" style="cursor:hand; display:none;" btnAuth="<%= roleBtnVO.getAttr5() %>" onclick="doWork('PRINT');"><bean:message key="Print"/></button>
				<button type="button" class="btn_normal" style="cursor:hand; display:none;" btnAuth="CLEAR" onclick="doWork('CLEAR');"><bean:message key="Clear"/></button>
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
	
	<!-- wrap search (S) -->
<div class="over_wrap" height="100%">
 	<div class="wrap_search">
	    <!-- inquiry_area(S) -->	
		<div class="opus_design_inquiry entry_pannel ">
		    <table>
		        <colgroup>
		        	<col width="65">
		        	<col width="310">
		        	<col width="85">
		        	<col width="310">
		        	<col width="67">
		        	<col width="*">
		        </colgroup>
		        <tbody>
	        	<tr>
					<th><bean:message key="To"/></th>
					<td><!-- 
						 --><input type="text" name="f_to_trdp_cd" id="f_to_trdp_cd" maxlength="20" onKeyPress="getNameByCode(this);" onBlur="getNameByCode(this);" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase; width:75px"><!--
						 --><button type="button" class="input_seach_btn" tabindex="-1" onClick="doDisplay('TRDP_POPUP', document.frm1.f_to_trdp_nm);"></button><!--
						 --><input type="text" name="f_to_trdp_nm" id="f_to_trdp_nm" maxlength="50" onblur="strToUpper(this);" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase; width:190px" onKeyPress="doDisplay2('TRDP_POPUP_NAME', this);">
					</td>
					<th><bean:message key="Freight"/>&nbsp;<bean:message key="To"/></th>
					<td><!--
						 --><input type="text" name="f_frt_to_trdp_cd" id="f_frt_to_trdp_cd" maxlength="20" onKeyPress="getNameByCode(this);" onBlur="getNameByCode(this);" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase; width:75px"><!--
						 --><button type="button" class="input_seach_btn" tabindex="-1" onClick="doDisplay('TRDP_POPUP', document.frm1.f_frt_to_trdp_nm);"></button><!--
						 --><input type="text" name="f_frt_to_trdp_nm" id="f_frt_to_trdp_nm" maxlength="50" onblur="strToUpper(this);" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase; width:190px" onKeyPress="doDisplay2('TRDP_POPUP_NAME', this);">
					</td>
					<th><bean:message key="Status"/></th>
					<td>
						<logic:notEmpty name="EventResponse">
						<bean:define id="tmpMap"  name="EventResponse" property="mapVal"/>
						<bean:define id="vndrSiSndStsList" name="tmpMap" property="vndrSiSndStsList"/>
						<select name="f_sts_cd" id="f_sts_cd" style="width:155px;">
						<option value="">ALL</option>
						<logic:iterate id="comCdDtlVO" name="vndrSiSndStsList">
								<option value='<bean:write name="comCdDtlVO" property="cd_val"/>'><bean:write name="comCdDtlVO" property="cd_nm"/></option>
						</logic:iterate>
						</select>
					</logic:notEmpty>
					</td>
				</tr>
		        </tbody>
	        </table>
	        
            <table>
	        <colgroup>
	        	<col width="65">
	        	<col width="210">
	        	<col width="185">
	        	<col width="210">
	        	<col width="167">
	        	<col width="*">
	        </colgroup>
	        <tbody>
					<tr>
						<th><bean:message key="Send"/>&nbsp;<bean:message key="Date"/></th>
						<td><!-- 
							 --><input type="text" name="f_snd_strdt" id="f_snd_strdt" onKeyUp="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};" onBlur="chkCmprPrd(firCalFlag, false, this, this, frm1.f_snd_enddt);firCalFlag=false;" style="width:75px;" maxlength="10"><span class="dash">~</span><!--
							 --><input type="text" name="f_snd_enddt" id="f_snd_enddt" onKeyUp="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};" onBlur="chkCmprPrd(firCalFlag, false, this, frm1.f_snd_strdt, this);firCalFlag=false;" style="width:75px" maxlength="10"><!--
							 --><button id="f_snd_dt_cal" name="f_snd_dt_cal" onclick="doDisplay('DATE11', frm1);" type="button" class="calendar" tabindex="-1"></button>
						</td>
						<th><bean:message key="Estm"/><bean:message key="Shipping"/><bean:message key="Date"/></th>
						<td><!--
							 --><input type="text" name="f_est_shp_strdt" id="f_est_shp_strdt" onKeyUp="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};" onBlur="chkCmprPrd(firCalFlag, false, this, this, frm1.f_est_shp_enddt);firCalFlag=false;" style="width:75px;" maxlength="10"><span class="dash">~</span><!--
							 --><input type="text" name="f_est_shp_enddt" id="f_est_shp_enddt" onKeyUp="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};" onBlur="chkCmprPrd(firCalFlag, false, this, frm1.f_est_shp_strdt, this);firCalFlag=false;" style="width:75px;" maxlength="10"><!--
							 --><button id="f_est_shp_dt_cal" name="f_est_shp_dt_cal" onclick="doDisplay('DATE22', frm1);" type="button" class="calendar" tabindex="-1"></button>
						</td>
						<th><bean:message key="PO_No"/></th>
						<td><!-- 
							 --><input name="f_po_no" id="f_po_no" type="text" maxlength="20" dataformat="excepthan" style="ime-mode isabled;text-transform:uppercase;width:155px;" onblur="strToUpper(this)" onkeydown="entSearch();"/>
						</td>
					</tr>
		        </tbody>
	        </table>
		</div>
	     <!-- inquiry_area(E) -->	
	</div>
	<!-- wrap search (E) -->
	
	<div class="wrap_result">     
		<!-- layout_wrap(S) -->
		<div class="layout_wrap">
		        <!-- opus_design_grid(S) -->
		        <div class="opus_design_grid">
		            <script type="text/javascript">comSheetObject('sheet1');</script>
		        </div>
		        <!-- opus_design_grid(E) -->
		</div>
		<!-- layout_wrap(E) -->
	</div>
</div>
</form>
<script type="text/javascript">
	doBtnAuthority("<%= roleBtnVO.getAttr_extension() %>");
</script>

