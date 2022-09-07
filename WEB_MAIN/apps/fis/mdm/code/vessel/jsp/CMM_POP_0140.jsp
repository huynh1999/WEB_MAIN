<%--
=========================================================
*@FileName   : CMM_POP_0140.jsp
*@FileTitle  : CMM
*@Description: vessel pop
*@author     : 이광훈 - vessel pop
*@version    : 1.0 - 12/30/2008
*@since      : 12/30/2008

*@Change history:
=========================================================
--%>

<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="clt-paging"   prefix="paging" %>

	<!-- 공통 Header -->
	<%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
    <link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css" />

	<!-- 해당 Action별 js -->
	<script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/PUP_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="./apps/fis/mdm/code/vessel/script/CMM_POP_0140.js?ver=<%=CLT_JS_VER%>"></script>
	<!-- 모달창에서 paging이나 submit 할 경우 꼭 추가해야함. -->
	<base target="_self"/>
	<script language="javascript">
		function setupPage(){
	       	loadPage();
	       	//doWork('SEARCHLIST');
	    }
	</script>
<form name="form" method="POST" action="./">
	<!--Command를 담는 공통		 -->
	<input	type="hidden" name="f_cmd"/>
	<input	type="hidden" name="openMean"/>
	<input	type="hidden" name="f_CurPage"/>	
	<div class="layer_popup_title">
		<!-- page_title_area -->
		<div class="page_title_area clear">
		   <h2 class="page_title">
				<span><bean:message key="Vessel_Search"/></span>
		   </h2>
		   <!-- btn_div -->
		   <div class="opus_design_btn">
			   <button type="button" class="btn_accent" onclick="doWork('SEARCHLIST')"><bean:message key="Search"/></button><!-- 
			--><button type="button" class="btn_normal"  onclick="doWork('NEW')"><bean:message key="New"/></button><!-- 
			--><button type="button" class="btn_normal" onclick="doWork('CLOSE')"><bean:message key="Close"/></button>
		   </div>
		</div>
	</div>
	<div class="layer_popup_contents">
		<div class="wrap_search">	
		   	<div class="opus_design_inquiry entry_pannel ">
		   		<table>											
					<tr>
						<th width="100"><bean:message key="Vessel_Name"/></th>
						<td width="180"><input type="text" name="s_vessel_name" class="search_form" value="" style="width:150px" onKeyPress="fncTpCodeSearch()"/></td>
						<th width="100"><bean:message key="Vessel_Code"/></th>
						<td><input type="text" name="s_vessel_code" class="search_form" value="" style="width:150px" onKeyPress="fncTpCodeSearch()"/></td>
					</tr>
				</table>
		   	</div>
		</div>
		<!-- wrap_result (S) -->
	    <div class="wrap_result">
			<div class="opus_design_grid">
				<script language="javascript">comSheetObject('sheet1');</script>
				 <div>
		       <!-------------------- Display option Begin -------------------->
											<bean:define id="tmpMapVal" name="EventResponse" property="mapVal"/>
											<bean:define id="pagingVal" name="tmpMapVal"     property="paging"/>
											<paging:options name="pagingVal" defaultval="200"/>
	<!-------------------- Display option End -------------------->					
				<span id="pagingTb" style='font-family: "Tahoma", "Arial", "Verdana";font-size: 11px;'> </span>
				</div>
				
			</div>
		</div>
	</div>
