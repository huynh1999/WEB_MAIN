<%
/*=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : CMM_POP_0350.jsp
*@FileTitle  : Work Order Search Pop
*@author     : CLT
*@version    : 1.0
*@since      : 2014/07/24
=========================================================*/
%>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="clt-paging"   prefix="paging" %>

	<%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
	<title><bean:message key="system.title"/></title>
	<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css"/>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/PUP_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="./apps/fis/cmm/pop/workorder/script/CMM_POP_0350.js?ver=<%=CLT_JS_VER%>"></script>
	<bean:define id="valMap" name="EventResponse" property="mapVal"/>
	<script type="text/javascript">
			function setupPage(){
				loadPage();
				doWork('SEARCHLIST');
			}
	</script>
<form name="form" method="POST" action="./">
	<input type="hidden" name="f_cmd" id="f_cmd" />
	<input type="hidden" name="air_sea_clss_cd" id="air_sea_clss_cd" />
	<input type="hidden" name="bnd_clss_cd" id="bnd_clss_cd" />
	<input type="hidden" name="biz_clss_cd" id="biz_clss_cd" />
	<input type="hidden" name="f_CurPage" id="f_CurPage" />
	<div class="layer_popup_title">		 
		<div class="page_title_area clear">
			<!-- page_title(S) -->
			<h2 class="page_title"><bean:message key="Work_Order_Search"/></h2>
			<!-- page_title(E) -->
			
			<!-- opus_design_btn(S) -->
			<div class="opus_design_btn">
			   <button type="button" class="btn_accent" onclick="doWork('SEARCHLIST')"><bean:message key="Search"/></button><!-- 
			--><button type="button" class="btn_normal"  onclick="doWork('CLOSE')"><bean:message key="Close"/></button>
			</div>
			<!-- opus_design_btn(E) -->
		</div>
	   <!-- page_title_area(E) -->
	</div>
	<div class="layer_popup_contents">
		<!-- wrap search (S) -->
	 	<div class="wrap_search">
		    <!-- inquiry_area(S) -->	
			<div class="opus_design_inquiry entry_pannel ">
			    <table>
			        <colgroup>
			        	<col width="110" />
			        	<col width="*" />
			        </colgroup>
			        <tbody>
						<tr>
							<th><bean:message key="Work_Order_No"/></th>
	                        <td>
	                        	<input name="f_wo_no" id="f_wo_no" type="text" class="search_form" dataformat="excepthan" style="ime-mode:disabled;text-transform:uppercase;width:100px;" onKeyPress="fncTpCodeSearch()"/>
	                        </td>
						</tr>
			        </tbody>
		        </table>
			</div>
		     <!-- inquiry_area(S) -->	
		</div>
		<!-- wrap search (E) -->
		
		<!-- grid_area(S) -->
		<div class="wrap_result">
			<div class="opus_design_inquiry wFit">
				<div class="opus_design_grid" id="mainTable">
					<script type="text/javascript">comSheetObject('sheet1');</script>
				</div>
				<table>
		             <tr>
		                <td width="55">
							<bean:define id="pagingVal" name="valMap" property="paging"/>
							<paging:options name="pagingVal" defaultval="200"/>
						</td>								
						<td id="pagingTb" style='font-family: "Tahoma", "Arial", "Verdana";font-size: 11px;'>
						</td>
					</tr>
				</table>
			</div>
		</div>
		<!-- grid_area(E) -->	
	</div>  
</form>


