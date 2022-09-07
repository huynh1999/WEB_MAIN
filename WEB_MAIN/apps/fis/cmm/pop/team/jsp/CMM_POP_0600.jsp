<%--
=========================================================
*@FileName   : CMM_POP_0600.jsp
*@FileTitle  : CMM
*@Description: Team search pop
*@author     : Team search pop
*@version    : 
*@since      : 01/09/2017
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
	<script type="text/javascript" src="./apps/fis/cmm/pop/team/script/CMM_POP_0600.js?ver=<%=CLT_JS_VER%>"></script>
<script>
function setupPage(){
	loadPage();
}
</script>	
<form name="form" method="POST" action="./">
		<!--Command를 담는 공통
		 -->
		<input	type="hidden" name="f_cmd"/>
		<input	type="hidden" name="openMean"/>
	<div class="layer_popup_title">	
		<div class="page_title_area clear">
		   <h2 class="page_title"><span><bean:message key="Team_Info"/></span></h2>
		   <div class="opus_design_btn">
			   <button type="button" class="btn_accent" onclick="doWork('SEARCHLIST')" >Search</button><!-- 
			--><button type="button" class="btn_normal"  onclick="doWork('CLOSE')"><bean:message key="Close"/></button>
		   </div>
		</div>
	</div>
	<div class="layer_popup_contents">
		<!-- Search option -->
	    <div class="wrap_search">	
			<div class="opus_design_inquiry ">
				<table>
					<tr>
						<th width="50px"><bean:message key="Team"/></th>
						<td width="150px"><input type="text" name="s_team_name" class="search_form" value="" dataformat="multiLanguage"  style="<%=MULTI_IMEMODE%>text-transform:uppercase;width:150" onKeyPress="fncTpCodeSearch()" maxlength="50"/></td>
						<th width="50px"><bean:message key="Status"/></th>
					    <td>
					        <select name="USE_YN">
                            	<option value="Y" SELECTED>Enable</option>
                            	<option value="N">Disable</option>
                            </select>
					    </td>
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


