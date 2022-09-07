<%
/*=========================================================
*Copyright(c) 2015 CyberLogitec. All Rights Reserved.
*@FileName   :  MGT_HIS_0020.jsp
*@FileTitle  : HISTORY MANAGEMENT
*@author     : CLT
*@version    : 1.0
*@since      : 2015/07/17
=========================================================*/
%>


<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="clt-paging"   prefix="paging" %>
	<!-- 공통 Header -->
	<%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
	<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css"/>
	    <title><bean:message key="system.title"/></title>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/SYS_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/apps/fis/mgt/his/hismgt/script/MGT_HIS_0020.js?ver=<%=CLT_JS_VER%>"></script>
	
	<script type="text/javascript">
		function setupPage()
			{
				loadPage();
			}
	</script>
	
	<form name="frm1" method="POST" action="./">
	<!--Command를 담는 공통 -->
	<input type="hidden" name="f_cmd"/>
	
	
	  <div class="page_title_area clear">
	   <h2 class="page_title"><button type="button"><%=LEV3_NM%></button></h2>
	   <!-- btn_div -->
	   <div class="opus_design_btn"><!--
	   --><button type="button" class="btn_accent" onClick="doWork('SEARCHLIST')"  style="cursor:hand;" ><bean:message key="Search" /></button><!--
	   --><button type="button" class="btn_normal" onclick="doWork('ADD')" style="cursor:hand;" id="btnAdd" ><bean:message key="Save"/></button>
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
	<div class= "wrap_search">
 		<div class= "opus_design_inquiry ">
 			<table>
				<colgroup>
					<col width="140">
					<col width="210">
					<col width="100">
					<col width="*">
				</colgroup>
 				<tbody>
 					<tr>
                          <th><bean:message key="Physical_Entity_Name"/></th>
                          <td class="table_search_body">
                          	<select name="Table_in" id="Table_in" class="search_form" style="width:200px;">
                          		<!-- 
                          		<option value="">ALL</option>
                          		<option value="TB_ADD_INFO_BND">ADDITIONAL INFORMATION BOUND</option>
                          		<option value="TB_BL_PRNR">B/L PARTNER</option>
                          		<option value="TB_INTG_BL">INTEGRATION B/L</option>
                          		<option value="TB_CNTR_LIST"><bean:message key="Container_List"/></option>
                          		<option value="TB_CNTR_SMRY">CONTAINER SUMMARY</option>
                          		<option value="TB_SHP_CMDT">SHIPPING COMMODITY</option>
                          		<option value="TB_DIM">DIMENSION</option>
                          		<option value="TB_BL_TRSP_ROUT">B/L TRANSPortATION ROUTE</option>
                          		<option value="TB_CGO_RT">CARGO RATE</option>
                          		<option value="TB_FRT"><bean:message key="Freight"/></option>
                          		 -->
                          	</select>
                          </td>
                          <th><bean:message key="Warning"/></th>
                          <td>
                          	<select name="Warning_in" id="Warning_in" class="search_form" style="width:200px;">
                          		<option value="">ALL</option>
                          		<option value="Nomal">Nomal</option>
                          		<option value="Error">Error</option>
                          		<option value="New"><bean:message key="New"/></option>
                          	</select>
                          </td>
                      </tr>
 				</tbody>
 			</table>
 		</div>
	</div>
 	<!-- opus_design_inquiry(E) -->
 	<!-- opus_design_Grid(S) -->
 	<div class="wrap_result">
	 	<div class="opus_design_grid">
	 		<script type="text/javascript">comSheetObject('sheet1');</script>
	 	</div>
	 	<div class="opus_design_grid">
	 		<script type="text/javascript">comSheetObject('sheet2');</script>
	 	</div>
 	</div>
			
</div>
</form>
<script type="text/javascript">
	doBtnAuthority("<%= roleBtnVO != null ? roleBtnVO.getAttr_extension() : "" %>");
	var pDoc = parent.parent.parent.document;
	hideProcess('WORKING', pDoc);
</script>

