<%--
/*=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : RPT_PRN_0110.jsp
*@FileTitle  : Option
*@author     : CLT
*@version    : 1.0
*@since      : 2014/07/29
=========================================================*/
--%>


<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
    <%@include file="./../../../../syscommon/header/CLTHeader.jsp"%>
	 <link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css"/>
	<script type="text/javascript" src="<%=CLT_PATH%>/apps/fis/rpt/RPT_PRN_0110.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/CoBizCommon.js?ver=<%=CLT_JS_VER%>"></script>
	<bean:define id="tmpMap"  name="EventResponse" property="mapVal"/>
	<script>
		function setupPage()
		{}
	</script>
<style> body { border-top-width: 6px!important; } </style>
<form name="frm1" id="frm1" method="POST">
	<input type="hidden" name="open_type" id="open_type" value="<bean:write name="tmpMap" property="open_type"/>"/>
	<input type="hidden" name="cmb_inv_seq" id="cmb_inv_seq" value="<bean:write name="tmpMap" property="cmb_inv_seq"/>"/> 
	<input type="hidden" name="sell_buy_tp_cd" id="sell_buy_tp_cd" value="<bean:write name="tmpMap" property="sell_buy_tp_cd"/>"/>
	<logic:equal name="tmpMap"  property="open_type" value="L">
		<input type="hidden" id="date_cd" value="<bean:write name="tmpMap" property="date_cd"/>"/>
	</logic:equal>
	<input type="hidden" name="title" id="title" value="COMBINED INVOICE"/>
	<input type="hidden" name="cmd_type" id="cmd_type"/>
	<input type="hidden" name="stamp" id="stamp"/>
	<!-- page_title_area(S) -->
	<div class="page_title_area clear">
		<!-- page_title(S) -->
		<h2 class="page_title"><span id="title"><bean:message key="Option"/></span></h2>
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
		<div class="opus_design_inquiry entry_pannel ">
			<table>
				<tbody>
					<colgroup>
						<col width="110" />
						<col width="*" />
					</colgroup>
	            	<tr>
		                <td colspan="2"><b><bean:message key="Document_Type"/></b></td>
		            </tr>
		            <tr>
		                <td><input name="doc_type" id="doc_type1" type="radio" value="Y" checked="checked"><label for="doc_type1"><bean:message key="Internal"/></label></td>
		                <td><input name="doc_type" id="doc_type2" type="radio" value="N"><label for="doc_type2"><bean:message key="External"/></label></td>
	              	</tr>
	            	<tr>
		                <td colspan="2"><b><bean:message key="Approval_Stamp"/></b></td>
		            </tr>
		            <tr>
		            	<td><input name="app_stamp" id="app_stamp1" type="radio" value="Y" checked="checked"><label for="app_stamp1">YES</label></td>
		                <td><input name="app_stamp" id="app_stamp2" type="radio" value="N"><label for="app_stamp2">NO</label></td>
		            </tr>
	            	<tr>
		                <td colspan="2"><b><bean:message key="Remark"/></b></td>
		            </tr>
		            <tr>
		            	<td colspan="2"><textarea name="remark" class="search_form" style="width:280px;height:100px" ><bean:write name="tmpMap" property="remark"/></textarea></td>
		            </tr>
				</tbody>	
			</table>
		</div>
	</div>	
</div>
</form>





