<%--
=========================================================
*@FileName   : SAL_TPM_0011.jsp
*@FileTitle  : SAL
*@Description: trade partner pop
*@author     : 최길주 - trade partner pop
*@version    : 1.0 - 01/05/2009
*@since      : 01/05/2009

*@Change history: 
=========================================================
--%>

<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
	<!-- 공통 Header -->
	<%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
    <link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css" />

    <script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/SAL_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<!-- 해당 Action별 js -->
	<script language="javascript" src="<%=CLT_PATH%>/apps/fis/sal/tpm/tradepartner/script/SAL_TPM_0011.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
	<base target="_self"/>
	<script>
		function setupPage(){
			loadPage();
		}
	</script>
<form name="frm1" method="POST" action="./" enctype="multipart/form-data">
		<!--Command를 담는 공통
		 -->
		<input	type="hidden" name="f_cmd"/>
		<input	type="hidden" name="f_Submit"/>
		<input	type="hidden" name="s_trdp_cd"/>
		<input	type="hidden" name="cntc_seq"/>
		<input	type="hidden" name="f_sls_his_flat_url"/>
		<logic:notEmpty name="EventResponse">
	    	<bean:define id="rtnMap"  name="EventResponse" property="mapVal"/>
	   		<input	type="hidden" name="returnValue" value='<bean:write name="rtnMap" property="returnValue"/>'>
  		</logic:notEmpty>
		<div class="layer_popup_title">
		<div class="page_title_area clear ">
			<!-- page_title(S) -->
			<h2 class="page_title"><span><bean:message key="Customer_Contact_Information"/></span></h2>
			<!-- page_title(E) -->
				
			<!-- opus_design_btn(S) -->
			<div class="opus_design_btn" >
				<button type="button" class="btn_accent" id="btnAdd" onclick="doWork('ADD')"><bean:message key="Save"/></button><!-- 
				--><button type="button" class="btn_normal" onClick="doWork('CLOSE');"><bean:message key="Close"/></button>
			</div>
		</div>
		</div>
		<div class="layer_popup_contents">
		<div class="wrap_result">
			<div class="opus_design_inquiry">
				<table>
					<colgroup>
						<col width="80">
						<col width="*">
					</colgroup>
					<tbody>
						<tr>
							<th><bean:message key="PIC"/></th>
							<td>
								<select name="sls_pson_pic" class="search_form" style="width:120px;">
	             				</select>
							</td>
						</tr>
						<tr>
							<th><bean:message key="Title"/></th>
							<td>
								<input name="sls_his_tit" type="text" class="search_form" style="width:100%;" maxlength="100">
							</td>
						</tr>
						<tr>
							<th><bean:message key="File_Attach"/></th>
							<td>
								<input name="sls_his_flat_nm" style='overflow:hidden;border-style:none;border-top-width:0px;border-bottom-width:0px;background:none;cursor:hand;width:350px;' disabled="true"/>
							</td>
						</tr>
						<tr>
							<td></td>
							<td>
								<input type="file" name="sls_his_flat_url" class="search_form" style="width:280px;">
							</td>
						</tr>
						<tr>
							<th><bean:message key="Contents"/></th>
							<td>
								<textarea name="sls_his_ctnt" style="ime-mode:auto;text-transform:none;width:100%;height:100px" maxlength="1000"></textarea>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
			<div class="opus_design_grid">
				<script language="javascript">comSheetObject('sheet1');</script>
			</div>
		</div>	
		</div>	   
	</form>
	<!-- <iframe name="ifrm1" src="" frameborder="0" scrolling="no" width="0" height="0"></iframe> -->
	<form name="frm2" method="POST" action="./GateServlet.gsl">
		<input type="hidden" name="goWhere" value="fd"/>
	    <input type="hidden" name="bcKey"   value="paFileDown"/>
	    <input type="hidden" name="trdp_cd" value=""/>
	    <input type="hidden" name="cntc_seq" value=""/>
	</form>