<%--
=========================================================
*@FileName   : CMM_POP_0110.jsp
*@FileTitle  : CMM
*@Description: commodity pop
*@author     : 이광훈 - commodity pop
*@version    : 1.0 - 01/05/2009
*@since      : 01/05/2009

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
	<script type="text/javascript" src="./apps/fis/mdm/code/commodity/script/CMM_POP_0110.js?ver=<%=CLT_JS_VER%>"></script>
	
	<!-- 모달창에서 paging이나 submit 할 경우 꼭 추가해야함. -->
	<base target="_self"/>
<% 
String hsGrpCd = request.getParameter("s_hs_grp_cd")== null?"":request.getParameter("s_hs_grp_cd"); 
%>
	
<script>

var hs_grp_cd = '<%=hsGrpCd%>';
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
		<div class="page_title_area clear">
		   <h2 class="page_title"><span><bean:message key="Commodity_Search"/></span></h2>
		   <div class="opus_design_btn">
			   <button type="button" class="btn_accent" onclick="doWork('SEARCHLIST')">Search</button><!-- 
			--><button type="button" class="btn_normal"  onclick="doWork('NEW')"><bean:message key="New"/></button><!-- 
			--><button type="button" class="btn_normal" onclick="doWork('CLOSE')"><bean:message key="Close"/></button>
		   </div>
		</div>
	</div>	
	<div class="layer_popup_contents">
		<!-- Search option -->
	    <div class="wrap_search">	
			<div class="opus_design_inquiry ">
				<table>
					<colgroup>
			        	<col width="160">
			        	<col width="90">
			        	<col width="100">
			        	<col width="*">
				   </colgroup>
				   <tbody>
					<tr>
						<th><bean:message key="HS_Group_Code"/></th>
	                    <td><!-- 
				             --><logic:notEmpty name="EventResponse"><!--
					             	--><bean:define id="group1Map"  name="EventResponse" property="mapVal"/><!--
					             	--><bean:define id="group1List" name="group1Map" property="PARAM2"/><!--
					             	--><select name="s_hs_grp_cd"><!--
			             		--><logic:iterate id="group1VO" name="group1List"><!--
				             			--><option value='<bean:write name="group1VO" property="cd_val"/>'><bean:write name="group1VO" property="cd_nm"/></option><!--
			             		--></logic:iterate><!--
				            --></logic:notEmpty><!--
					        --></select>
	                    </td>
	                    
						<th><bean:message key="Code"/></th>
						<td><!-- 
							 --><input type="text" name="s_commodity_code" class="search_form" value="" style="width:100px" onKeyPress="fncTpCodeSearch()"/></td>
					</tr>
					<tr>
	                    <th><bean:message key="Commodity_Name"/></th>
						<td><!-- 
							 --><input type="text" name="s_key_word" maxlength="100" class="search_form" value="" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:101px" onKeyPress="fncTpCodeSearch()"/><!-- 
						 --></td>
						 
						<th><bean:message key="Group"/></th>
						<td><!-- 
							 --><input type="text" name="s_cmdt_grp_cd" class="search_form" value="" style="width:100px" onKeyPress="fncTpCodeSearch()"/></td>
	                </tr>
	                
					<%-- TinLuong comment: delete Group_Commodity_Name
						<tr>
						<th><bean:message key="Group_Commodity_Name"/></th>
						<td>
				            <logic:notEmpty name="EventResponse">
					             	<bean:define id="groupMap"  name="EventResponse" property="mapVal"/>
					             	<bean:define id="groupList" name="groupMap" property="PARAM1"/>
					             	<select name="sel_cmdt_grp_cd">
					             	<option value=''>ALL</option>
			             		<logic:iterate id="groupVO" name="groupList">
				             			<option value='<bean:write name="groupVO" property="cd_val"/>'><bean:write name="groupVO" property="cd_nm"/></option>
			             		</logic:iterate>
				            </logic:notEmpty>
					        </select>
		               </td>												
					</tr> --%>
					<tbody>
				</table>
			</div>
		</div>
		
		<div class="wrap_result">
	    	<div class="opus_design_inquiry">
		    	<div class="opus_design_grid">
		    		<script type="text/javascript">comSheetObject('sheet1');</script>
		    	</div>
	    		<table>
					<tr>
						<td width="55">
							<bean:define id="tmpMapVal" name="EventResponse" property="mapVal"/>
							<bean:define id="pagingVal" name="tmpMapVal"     property="paging"/>
							<paging:options name="pagingVal" defaultval="200"/>
						</td>								
						<td id="pagingTb" style='font-family: "Tahoma", "Arial", "Verdana";font-size: 11px;'>
						</td>
					</tr>
				</table>
	    	</div>
	    </div>
	 </div>
</form>
</html>

