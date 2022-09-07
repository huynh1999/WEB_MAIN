<%
/*=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   :  MGT_OFC_0010.jsp
*@FileTitle  : Management
*@author     : CLT
*@version    : 1.0
*@since      : 2014/06/10
=========================================================*/
%>

<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="clt-paging"   prefix="paging" %>
    <!-- 공통 Header -->
    <%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
    <link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css"/>
    <script type="text/javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/CalculationUtil.js?ver=<%=CLT_JS_VER%>"></script>
    <script type="text/javascript" src="<%=CLT_PATH%>/js/common/ModalCalendar.js?ver=<%=CLT_JS_VER%>"></script>
    <script type="text/javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/SUP_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
    <script type="text/javascript" src="./apps/fis/mgt/ofc/incentive/script/MGT_OFC_0010.js?ver=<%=CLT_JS_VER%>"></script>

    <script>
    	var ofc_cd = "<%= userInfo.getOfc_cd() %>";
    	
    	<!-- OFC_CD -->
		var OFCCD = '';
		
		<bean:define id="valMap" name="EventResponse" property="mapVal"/>
    	<bean:define id="oficeList" name="valMap" property="ofcList"/> 
    	
        <logic:notEmpty name="valMap" property="ofcList">
			<% boolean isBegin = false; %>
            <bean:define id="ofcList" name="valMap" property="ofcList"/>
            <logic:iterate id="ofcVO" name="ofcList">
                <% if(isBegin){ %>
                       OFCCD += '|';
                <% }else{
                       isBegin = true;
                   } %>
                OFCCD+= '<bean:write name="ofcVO" property="ofc_cd"/>';
            </logic:iterate>
        </logic:notEmpty>
    	
		function setupPage()
		{
			loadPage();
			doWork('SEARCHLIST');
		}

	</script>

<form name="frm1" method="POST" action="./MGT_OFC_0010.clt" enctype="multipart/form-data">
    <!--Command를 담는 공통 -->
    <input type="hidden" name="f_cmd" id="f_cmd" />
    <input type="hidden" name="f_CurPage" id="f_CurPage" />
    <!-- 타이틀, 네비게이션 -->
    
     <div class="page_title_area clear">
	   <h2 class="page_title"><button type="button"><%=LEV3_NM%></button></h2>
	   <!-- btn_div -->
	   <div class="opus_design_btn TOP">
	   <%-- 
	   		<button type="button" class="btn_accent" onclick="doWork('SEARCHLIST');" style="cursor:hand; display:none;" btnAuth="<%= roleBtnVO.getAttr1() %>"><bean:message key="Search" /></button>
	   		<button type="button" class="btn_normal" onclick="doWork('ROWADD')"  style="cursor:hand; display:none;" btnAuth="<%= roleBtnVO.getAttr2() %>"><bean:message key="Add" /></button>
	   		<button type="button" class="btn_normal" onclick="doWork('ADD')" style="cursor:hand; display:none;" btnAuth="<%= roleBtnVO.getAttr3() %>" id="btnAdd" ><bean:message key="Save" /></button>
	   		 --%>
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
 		<div class= "opus_design_inquiry entry_pannel ">
 			<table>
				<colgroup>
					<col width="120">
					<col width="200">
					<col width="120">
					<col width="200">
					<col width="*">
				</colgroup>
 				<tbody>
 					<tr>
 						<th><bean:message key="Office"/></th>
						<td> 
	                    	<select name="f_ofc_cd" style="width:150;" /> 
	                    	<bean:size id="len" name="oficeList" /> 
	                     		<logic:greaterThan name="len" value="1"> 
	                        		<option value=''>ALL</option> 
	                     		</logic:greaterThan> 
	                      		<logic:iterate id="ofcVO" name="oficeList"> 
	                      			<option value='<bean:write name="ofcVO" property="ofc_cd"/>'><bean:write name="ofcVO" property="ofc_cd"/></option>
	                     			<!--
	                     			<logic:equal name="ofcVO" property="ofc_cd" value="<%= userInfo.getOfc_cd()%>" >
	                            		<option selected="selected"  value='<bean:write name="ofcVO" property="ofc_cd"/>'><bean:write name="ofcVO" property="ofc_cd"/></option>
	                         		</logic:equal>
	                         		<logic:notEqual name="ofcVO" property="ofc_cd" value="<%= userInfo.getOfc_cd()%>" >
	                            		<option value='<bean:write name="ofcVO" property="ofc_cd"/>'><bean:write name="ofcVO" property="ofc_cd"/></option>
	                         		</logic:notEqual>
	                         		--> 
	                      		</logic:iterate> 
	                      	</select> 
	                    </td>
 						<th><bean:message key="Month" /> (MM-YYYY)</th>
 						<td>
                            <input type="text" name="f_yrmon" onkeyPress="onlyNumberCheck();" onKeyUp="onlyNumberCheck();" onblur ="isValidMMYYYY(this);" onClick="removeSeparator(this);" size='6' maxlength="6" class="search_form"><!-- 
		                 --><button type="button" class="calendar ir" id="f_yrmon_cal" onclick="doDisplay('DATE1', frm1);"></button>
                        </td>
                        <td></td>
 					</tr>
 				</tbody>
 			</table>
 		</div>
	</div>
 	<!-- opus_design_inquiry(E) -->
 	<!-- opus_design_Grid(S) -->
 	<div class="wrap_result">
 		<div class="opus_design_inquiry">
		 	<div class="opus_design_grid">
		 		<script type="text/javascript">comSheetObject('sheet1');</script>
		 	</div>
		 	<table>
				<tr>
					<td width="100">
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
<script type="text/javascript">
doBtnAuthority("<%= roleBtnVO != null ? roleBtnVO.getAttr_extension() : "" %>");
</script>

