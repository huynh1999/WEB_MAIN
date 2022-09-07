<%--
=========================================================
*@FileName   : CMM_POP_0060.jsp
*@FileTitle  : CMM
*@Description: user id search pop
*@author     : 이광훈 -  user id search  pop
*@version    : 1.0 - 01/06/2009
*@since      : 01/06/2009

*@Change history:
*@author     : Tuan.Chau
*@version    : 2.0 - 10/06/2014
*@since      : 10/06/2014
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
	<script type="text/javascript" src="./apps/fis/sys/aut/user/script/CMM_POP_0060.js?ver=<%=CLT_JS_VER%>"></script>
	
<script>
function setupPage(){
	loadPage();
	//doWork('SEARCHLIST');
}
</script>
	
<form name="form" method="POST" action="./">
		<!--Command를 담는 공통
		 -->
		<input	type="hidden" name="f_cmd"/>
		<input	type="hidden" name="openMean"/>
		<!--#342 [CLA] VOLUME & PROFIT REPORT IMPROVEMENTS - 2. addition [CHK)] multi-selection Duc.Nguyen 2017.09.21)  -->
		<input type="hidden" name="f_MultiSelect" />
	<div class="layer_popup_title">	
		<div class="page_title_area clear">
		   <h2 class="page_title"><span><bean:message key="User_Info"/></span></h2>
		   <div class="opus_design_btn">
		   <!--#342 [CLA] VOLUME & PROFIT REPORT IMPROVEMENTS - 2. addition [CHK)] multi-selection Duc.Nguyen 2017.09.21)  -->
		   <button type="button" style="display:none" id="btnApply" class="btn_normal" onclick="doWork('APPLY')" ><bean:message key="Apply"/></button><!-- 
		    --><button type="button" class="btn_accent" onclick="doWork('SEARCHLIST')">Search</button><!-- 
			--><button type="button" class="btn_normal" onclick="doWork('CLOSE')"><bean:message key="Close"/></button>
		   </div>
		</div>
	</div>
	<div class="layer_popup_contents">
		<!-- Search option -->
	    <div class="wrap_search">	
			<div class="opus_design_inquiry ">
				<table>
					<tr>
						<th width="90px"><bean:message key="User_Name"/></th>
						<td width="150px"><input type="text" name="s_user_name" class="search_form" value="" dataformat="multiLanguage"  style="<%=MULTI_IMEMODE%>text-transform:uppercase;width:150" onKeyPress="fncTpCodeSearch()" maxlength="50"/></td>
						<th width="60px"><bean:message key="Office"/></th>
						<td><input type="text" name="s_office_name" maxlength="50" class="search_form" value="" dataformat="multiLanguage"  style="<%=MULTI_IMEMODE%>text-transform:uppercase;width:150" onKeyPress="fncTpCodeSearch()"/></td>
					    <th width="90px"><bean:message key="Status"/></th>
					    <td>
					        <select name="USE_YN">
                            	<option value="Y" SELECTED>Enable</option>
                            	<option value="N">Disable</option>
                            </select>
					    </td>
					</tr>
					<!-- #6407 [Binex-LA] Volume & Profit Report Issue (#2447) -->
					<tr>
						<th width="60px"><bean:message key="Team"/></th>
						<td><input type="text" name="s_team_nm" maxlength="50" class="search_form" value="" dataformat="multiLanguage"  style="<%=MULTI_IMEMODE%>text-transform:uppercase;width:150" onKeyPress="fncTpCodeSearch()"/></td>
					</tr>
				</table>
			</div>
		</div>
	
		<div class="wrap_result">
	    	<div class="opus_design_grid">
		    	<script type="text/javascript">comSheetObject('sheet1');</script>
		    </div>
		</div>
	</div>
</form>
