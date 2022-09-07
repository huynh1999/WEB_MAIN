<%
/*=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : EDI_CSTM_0090.jsp
*@FileTitle  : EDI 전문내용 확인
*@author     : CLT
*@version    : 1.0
*@since      : 2014/07/28
=========================================================*/
%>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@ page import="java.util.HashMap"%>
    <%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
<%-- 	<bean:define id="blVO"  name="EventResponse" property="objVal"/> --%>
    <link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css" />
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/CoFormControl.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/CoBizCommon.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/apps/fis/edi/cstm/krcstm/script/EDI_CSTM_0090.js?ver=<%=CLT_JS_VER%>"></script>
	 <script type="text/javascript">
		function setupPage(){
		}
	</script>
	<bean:define id="mapObj" name="EventResponse" property="mapVal"/>
	<form name="frm1" method="POST" action="./EDI_CSTM_0090.clt">
	<div class="page_title_area clear">
			<!-- page_title(S) -->
			<h2 class="page_title"><bean:message key="EDI_Full_Contents"/></h2>
			<!-- page_title(E) -->
			<!-- opus_design_btn(S) -->
			<div class="opus_design_btn">
			<!-- 2016.04.12 C.W.Park Modified -->
			   <button type="button" class="btn_accent" name="btnClose" id="btnClose" onclick="doWork('CLOSE')"><bean:message key="Close"/></button>
			</div>
			<!-- opus_design_btn(E) -->
	</div>
    <!-- page_title_area(E) -->	

	 <!-- wrap search (S) -->
<div class="over_wrap" height="100%">
 	<div class="wrap_search">
	    <!-- inquiry_area(S) -->	
		<div class="opus_design_inquiry entry_pannel ">
		    <table>
		    	<colgroup>
			        	<col width="40">
			        	<col width="50">
			        	<col width="*">
			        </colgroup>
				        <tbody>
			               <tr>
								<th>전문번호</th>
 								<th><bean:write name="mapObj" property="edi_msg_no"/></th>
								<td></td>
							</tr>
							<tr>
								<!-- 2016.04.12 C.W.Park Modified -->
								<td colspan=3>
									<textarea cols="127" rows="20" readonly>
									<bean:write name="mapObj" property="edi_msg_txt"/>
									</textarea>
								</td>
								<td></td>
								<td></td>
							</tr>
			         </tbody>
             </table>
		</div>
	     <!-- inquiry_area(S) -->	
	</div>
	<!-- wrap search (E) -->		
</div>
</form>

