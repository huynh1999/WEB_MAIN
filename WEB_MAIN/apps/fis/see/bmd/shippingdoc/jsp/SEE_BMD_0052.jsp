<%--
=========================================================
*@FileName   : SEE_BMD_0051.jsp
*@FileTitle  : Shipping Document
*@Description: Shipping Document 등록 수정한다.
*@author     : PhiTran
*@since      : 06/12/2014
=========================================================
--%>

<%@ page contentType="text/xml; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@ page import="com.clt.apps.fis.mdm.mcm.partner.dto.TradePartnerManagementVO"%>
<%@ taglib uri="clt-paging"   prefix="paging" %>
<!-- 공통 Header -->
<%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>

<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css"/>

<script type="text/javascript" src="<%=CLT_PATH%>/js/common/EmailChecker.js?ver=<%=CLT_JS_VER%>"></script>
<script type="text/javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/SEA_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
<script type="text/javascript" src="./apps/fis/see/bmd/shippingdoc/script/SEE_BMD_0052.js?ver=<%=CLT_JS_VER%>"></script>


<script>
		function setupPage(){
			loadPage();
			doDispFileList();
		}
</script>
<% StringBuffer toMail = new StringBuffer(); %>
<bean:define id="objVO"  name="EventResponse" property="objVal"/>	
<bean:define id="tmpMap" name="EventResponse" property="mapVal"/>
<bean:define id="usrLst" name="tmpMap"        property="userList"/>
<logic:iterate id="usrVO" name="usrLst">
	<% TradePartnerManagementVO tmpVO = (TradePartnerManagementVO)usrVO;
		toMail.append(tmpVO.getPic_nm());
		toMail.append(" <");
	    toMail.append(tmpVO.getPic_eml());
        toMail.append(">, ");
	%>
</logic:iterate>
	 
<div id="WORKING_IMG" style="position:absolute;background-color:#FFFFFF;width:357;height:130;display:none;" valign="middle" align="center">
    <iframe src='<%=CLT_PATH%>/js/common/wait.html' scrolling='no' frameborder='0' style='margin-top:0px;width:360px; height:135px; border:none;display:block'></iframe>
</div>
<style> body { border-top-width: 6px!important; } </style>
<form name="frm1" method="POST" action="./SEE_BMD_0051.clt">
	<!--Command를 담는 공통 -->
    <input type="hidden" name="f_cmd" value=""/> 
    <html:hidden name="objVO" property="intg_bl_seq"/>
    <html:hidden name="objVO" property="intg_bl_rgst_tms"/>
    <html:hidden name="objVO" property="palt_doc_seq"/>
		
	<input type="hidden" name="openMean"  id="openMean"   value=""/> 
		
    <div class="layer_popup_title">
    <div class="page_title_area clear">
	   		<h2 class="page_title"><bean:message key="Email_Send"/></h2>
		   <div class="location">	
			</div>
		   <!-- btn_div -->
	</div>
	</div>
	<div class="layer_popup_contents">
	<div class="wrap_search">
		<!-- opus_design_inquiry(S) -->
		<div class="opus_design_inquiry ">
			<table>
				<colgroup>
					<col width="70px" />				
					<col width="*" />				
					
			   <tbody>
			   		<tr>
						<th><bean:message key="To"/></th>
						<td>
							<input type="text" name="eml_to_addr" value='<%=toMail%>' maxlength="400" class="search_form" style="width:333px;"/>
						</td>
					</tr>
	                <tr>
	                    <th><bean:message key="CC"/></th>
	                    <td><input type="text" name="eml_cc_addr" value='' maxlength="400" class="search_form" style="width:333px;"/></td>
	                </tr>
	                <tr>
	                    <th><bean:message key="Title"/></th>
	                    <td><input type="text" name="eml_tit" value='' maxlength="100" class="search_form" style="width:333px;"/></td>
	                </tr>
			   </tbody>
			</table>
		</div>
		<!-- opus_design_inquiry(E) -->
	</div>
	
	<div class="wrap_search">
		<!-- opus_design_inquiry(S) -->
		<div class="opus_design_inquiry">
			<table>
				<colgroup>
					<col width="70px" />				
					<col width="*" />				
					
			   <tbody>
			   		<tr>
						<th><bean:message key="Contents"/></th>
                        <td><textarea name="eml_msg" cols="62" rows="8" style="width:333px; resize:none;"></textarea></td>
	                </tr>
			   </tbody>
			</table>
		</div>
		<!-- opus_design_inquiry(E) -->
	</div>
	
	<div class="wrap_result">
	<!-- opus_design_grid(S) -->
	<div class="opus_design_grid" id="mainTable" style="width: 424px;">
		<h3 class="title_design"><bean:message key="Attach_File"/></h3>
		<!-- opus_design_btn (S) -->
		<div class="opus_design_btn">
			<button class="btn_accent" type="button" onclick="doWork('ADD')"><bean:message key="Send"/></button><!--
			--><button class="btn_normal" type="button" onclick="window.close();" ><bean:message key="Close"/></button>
			</div>
		<!-- opus_design_btn (E) -->
		<script type="text/javascript">comSheetObject('sheet1');</script>	
		<script type="text/javascript">comSheetObject('sheet2');</script>		
	</div>
	<!-- opus_design_grid(E) -->
</div>
</div>
	
    </form>


