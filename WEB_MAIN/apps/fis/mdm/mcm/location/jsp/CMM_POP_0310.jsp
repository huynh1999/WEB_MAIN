<%--
=========================================================
*@FileName   : CMM_POP_0310.jsp
*@FileTitle  : CMM
*@Description: State Code Popup
*@author     : Kim,Jin-Hyuk
*@version    : 1.0 - 2011/10/17
*@since      : 2011/10/17

*@Change history:
*@author     : Tuan.Chau
*@version    : 2.0 - 2014/06/10
*@since      : 2014/06/10
=========================================================
--%>

<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="clt-paging"   prefix="paging" %>

	<!-- 공통 Header -->
	<%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
	<title><bean:message key="system.title"/></title>
	<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css"/>

	<!-- 해당 Action별 js -->
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/PUP_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="./apps/fis/mdm/mcm/location/script/CMM_POP_0310.js?ver=<%=CLT_JS_VER%>"></script>
	
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/shortcut.js?ver=<%=CLT_JS_VER%>"></script>
	
	<base target="_self"/>
<script>
function setupPage(){
	loadPage();
}
</script>
<form name="form" method="POST" action="./">
		<input	type="hidden" name="f_cmd"/>
		<input	type="hidden" name="openMean"/>
		<input	type="hidden" name="f_CurPage"/> 
		
		<input	type="hidden" name="s_conti_code"/> 
		<input	type="hidden" name="s_cnt_code"/>
		<input	type="hidden" name="view_code"/>
	<div class="layer_popup_title">
		<div class="page_title_area clear">
		   <h2 class="page_title"><span><bean:message key="State_Code"/></span></h2>
		   
		   <!-- btn_div -->
		   <div class="opus_design_btn">
			   <button type="button" class="btn_accent" onclick="doWork('SEARCHLIST')">Search</button><!-- 
			--><button type="button" class="btn_normal" onclick="doWork('CLOSE')"><bean:message key="Close"/></button>
		   </div>
		</div>	
	</div>
	<div class="layer_popup_contents">
		<div class="wrap_search">	
			<div class="opus_design_inquiry ">
					<table>
						<tr>
							<th><bean:message key="Country_Code"/></th>
							<td colspan="2"><!-- 
								 --><input type="text" name="s_cnt_cd" class="search_form" value="" style="width:150px" onKeyPress="fncTpCodeSearch()"/></td>
						</tr>
						<tr>
							<th width="100px"><bean:message key="State_Code"/></th>
							<td width="150px"><!--  
								 --><input type="text" name="s_state_cd" class="search_form" value="" style="width:150px" onKeyPress="fncTpCodeSearch()"/></td>
								 
							<th width="100px"><bean:message key="State_Name"/></th>
							<td><!-- 
								 --><input type="text" name="s_state_nm" class="search_form" value="" style="width:150px" onKeyPress="fncTpCodeSearch()"/></td>
						</tr>
					</table>
			</div>
		</div>
		<div class="wrap_result">
			<div class="opus_design_inquiry">
	    	<div class="opus_design_grid">
	    		<script type="text/javascript">comSheetObject('sheet1');</script>
	    	<div>
				<table>
					<tr>
						<td width="55">
	<!-------------------- Display option Begin -------------------->
							<bean:define id="tmpMapVal" name="EventResponse" property="mapVal"/>
							<bean:define id="pagingVal" name="tmpMapVal"     property="paging"/>
							<paging:options name="pagingVal" defaultval="200"/>
	<!-------------------- Display option End -------------------->					
						</td>								
						<td align="center">
							<table>
								<tr>
									<td id="pagingTb" style='font-family: "Tahoma", "Arial", "Verdana";font-size: 11px;'>
									</td>
								</tr>
							</table>		
						</td>
					</tr>
				</table>
				</div>
			</div>
		</div>
	</div>
</form>
</html>

