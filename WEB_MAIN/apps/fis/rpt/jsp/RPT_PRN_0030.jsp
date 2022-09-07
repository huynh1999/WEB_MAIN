<%
/*=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : RPT_PRN_0030.jsp
*@FileTitle  : Label_Print
*@author     : CLT
*@version    : 1.0
*@since      : 2014/07/28
=========================================================*/
%>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
    <%@include file="./../../../../syscommon/header/CLTHeader.jsp"%>
	<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css"/>
	<script type="text/javascript" src="<%=CLT_PATH%>/apps/fis/rpt/RPT_PRN_0030.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript">
	function setupPage()
	{
		
	}
		//memo 를 핸들링 하는 부분
		function chkText(){
			/*
			if(document.frm1.bl_type[0].checked) {
				document.frm1.bl_memo.value = "";
				document.frm1.bl_memo.disabled = true;
			}else{
				document.frm1.bl_memo.disabled = false;
			}
			*/
		}
	</script>
</head>
<form name="frm1" method="POST" action="./">
<input type="hidden" name="title" id="title" value="Label Print">
<input type="hidden" name="cmd_type" id="cmd_type" value="26">
<!-- page_title_area(S) -->
	<div class="page_title_area clear">
		<!-- page_title(S) -->
		<h2 class="page_title"><span id="title"><bean:message key="Label_Print"/></span></h2>
		<!-- page_title(E) -->
		<!-- opus_design_btn(S) -->
		<div class="opus_design_btn">
			<button type="button" class="btn_accent" onclick="doWork('Print')" id="btnPrint" name="btnPrint"><bean:message key="Print"/></button><!-- 
			 --><button type="button" class="btn_normal" onclick="doWork('CLOSE')"><bean:message key="Close"/></button>		
		<!-- opus_design_btn(E) -->
		</div>
		<!-- page_location(S) -->
		<div class="location">	
			<span id="navigation">
			<%=LEV1_NM%> > <%=LEV2_NM%> > <span class="navi_b"><%=LEV3_NM%></span>
			</span>
		</div>
		<!-- page_location(E) -->
	</div>
	<!-- page_title_area(E) -->
<div class="over_wrap" height="100%">
	<div class= "wrap_search">
  		<!-- opus_design_inquiry(S) -->
		<div class="opus_design_inquiry entry_pannel" style="width:300px">
			<table>
				<colgroup>
					<col width="100" />
					<col width="*" />
				</colgroup>
				<tbody>
	            	<tr>
		                <th><bean:message key="Local_Name"/> : </th>
		                <td></td>
		            </tr>
		            <tr>
		            	<td colspan="2"><input type="text" name="loc_name"  id="loc_name" class="search_form"></td>
		            </tr>
	            	<tr>
		                <th><bean:message key="Local_Address"/> : </th>
		                <td></td>
		            </tr>
		            <tr>
		            	<td colspan="2"><input type="text" name="loc_addr" id="loc_addr" class="search_form"></td>
		            </tr>
	            	<tr>
		                <th><bean:message key="Attention"/> : </th>
		                <td></td>
		            </tr>
		            <tr>
		            	<td colspan="2"><input type="text" name="attn" id="attn" class="search_form"></td>
		            </tr>
	            	<tr>
		                <th>ZIP CODE :</th>
		                <td></td>
		            </tr>
		            <tr>
		            	<td colspan="2"><input type="text" name="zip_code" id="zip_code" class="search_form"></td>
		            </tr>
				</tbody>
			</table>
		</div>
		<!-- opus_design_inquiry(E) -->
	</div>		
</div>
</form>


