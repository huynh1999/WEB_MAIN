<%--
=========================================================
*@FileName   : CMM_POP_0261New.jsp
*@FileTitle  : G/L CODE POP UP
*@Description: G/L CODE POP UP
*@author     : Tien.Anh
*@version    : 2018/1/8
*@since      : 2018/1/8

*@Change history:
=========================================================
--%>

<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="clt-paging"   prefix="paging" %>

	<!-- 공통 Header -->
	<%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
	<base target="_self"/>
    
	<title><bean:message key="system.title"/></title>
	<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css"/>

	<!-- 해당 Action별 js -->
	<script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/PUP_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="./apps/fis/mdm/code/gl/script/CMM_POP_0261_NEW.js?ver=<%=CLT_JS_VER%>"></script>

<script type="text/javascript">
<!--
function setupPage() {
	loadPage();
}
//-->
</script>		

<form name="form" method="POST" action="./">
		<!--Command를 담는 공통 -->
	<input	type="hidden" name="f_cmd"/>
	<input  type="hidden" name="f_CurPage"/>
<div class="layer_popup_title">	
	<div class="page_title_area clear">
		<h2 class="page_title"><span><bean:message key="GL_Code"/></span></h2>
		<div class="opus_design_btn"><!--
		--><button type="button" class="btn_accent" onclick="searchList();" >Search</button><!--
		--><button type="button" class="btn_normal"  onclick="doWork('CLOSE')"><bean:message key="Close"/></button>
		</div>
	</div>
</div>
<div class="layer_popup_contents">
	<div class="wrap_search">
		<div class="opus_design_inquiry ">
			<table>
				<colgroup>
					<col width="50"></col>
					<col width="100"></col>
					<col width="50"></col>
					<col width="*"></col>
				</colgroup>
				<tbody>
					<tr>
						<th><bean:message key="Code"/></th>
						<td>
							<input type="text" name="s_ggl_cd" maxlength="50" value="" onKeyDown="doSearch();" onKeyPress="ComKeyOnlyAlphabet('uppernum')" class="search_form" style="width:80px;text-transform:uppercase" onblur="strToUpper(this)">
						</td>
						
						<th><bean:message key="Name"/></th>
						<td>
							<input type="text" name="s_ggl_nm" maxlength="200"  value="" onKeyDown="doSearch();" class="search_form" style="width:150px;text-transform:uppercase" onblur="strToUpper(this)">
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
	
	<div class="wrap_result">
		<div class="opus_design_grid" id="mainTable">
			<script language="javascript">comSheetObject('sheet1');</script>
		</div>
		<div>
			<bean:define id="tmpMapVal" name="EventResponse" property="mapVal"/>
	           <bean:define id="pagingVal" name="tmpMapVal"     property="paging"/>
	           <paging:options name="pagingVal" defaultval="200"/>
		</div>
		<div id="pagingTb" style='font-family: "Tahoma", "Arial", "Verdana";font-size: 11px;'></div>
	</div>
</div>
</form>

