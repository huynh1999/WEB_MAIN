<%
/*=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : AIE_BMD_0320.jsp
*@FileTitle  : Master B/L Search 
*@author     : CLT
*@version    : 1.0
*@since      : 2014/06/11
=========================================================*/
%>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="clt-paging"   prefix="paging" %>
	<!-- 공통 Header -->
	<%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
	<bean:define id="valMap"  name="EventResponse" property="mapVal"/>
	<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css"/>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CalculationUtil.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/AIR_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="./apps/fis/aie/bmd/masterbl/script/AIE_BMD_0320.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript">
	
	
	var ofc_cd = "<%= userInfo.getOfc_cd() %>";
	var edob_flg = "<%= userInfo.getEdob_flg() %>";
	var uod_flg ="<%= userInfo.getUod_flg()%>"
	var usrDept = "<%=userInfo.getDept_cd()%>";

	var usrId = "<%= userInfo.getUsrid() %>";
	var usrPhn = "<%= userInfo.getPhn() %>";
	var usrFax = "<%= userInfo.getFax() %>";
	var usrNm = "<%= userInfo.getUser_name() %>";
	var usrEml = "<%= userInfo.getEml() %>";
	var user_ofc_cnt_cd = "<%=userInfo.getOfc_cnt_cd()%>";
	
	<% boolean isBegin = false; %>
	
    <!-- ofc Code -->
	var OFCCD1 = '';
	var OFCCD2 = '';
    <logic:notEmpty name="valMap" property="ofcList">
		<% isBegin = false; %>
        <bean:define id="ofcList" name="valMap" property="ofcList"/>
        <logic:iterate id="OfcVO" name="ofcList">
            <% if(isBegin){ %>
            	OFCCD1+= '|';
            	OFCCD2+= '|';
            <% }else{
                  isBegin = true;
               } %>
               OFCCD1+= '<bean:write name="OfcVO" property="ofc_cd" filter="false"/>';
               OFCCD2+= '<bean:write name="OfcVO" property="ofc_cd"/>';
        </logic:iterate>
    </logic:notEmpty>	
    
    <!-- B/L Type Code -->
	var BLTYPECD1 = '';
	var BLTYPECD2 = '';
    <logic:notEmpty name="valMap" property="blTypeList">
		<% isBegin = false; %>
        <bean:define id="blTypeList" name="valMap" property="blTypeList"/>
        <logic:iterate id="codeVO" name="blTypeList">
            <% if(isBegin){ %>
            	BLTYPECD1+= '|';
            	BLTYPECD2+= '|';
            <% }else{
                  isBegin = true;
               } %>
               BLTYPECD1+= '<bean:write name="codeVO" property="cd_nm" filter="false"/>';
               BLTYPECD2+= '<bean:write name="codeVO" property="cd_val"/>';
        </logic:iterate>
    </logic:notEmpty>	
    
    <!-- Package Type Code -->
	var PCKUTCD1 = '';
	var PCKUTCD2 = '';
    <logic:notEmpty name="valMap" property="pckCdList">
		<% isBegin = false; %>
        <bean:define id="pckCdList" name="valMap" property="pckCdList"/>
        <logic:iterate id="PckUtCdVO" name="pckCdList">
            <% if(isBegin){ %>
            	PCKUTCD1+= '|';
            	PCKUTCD2+= '|';
            <% }else{
                  isBegin = true;
               } %>
               PCKUTCD1+= '<bean:write name="PckUtCdVO" property="pck_nm" filter="false"/>';
               PCKUTCD2+= '<bean:write name="PckUtCdVO" property="pck_ut_cd"/>';
        </logic:iterate>
    </logic:notEmpty>	
    

	
	
	
	function setupPage(){
		loadPage();
	}	
	
	</script>
	<form name="frm1" method="POST" action="./">
	<input id="f_cmd" name="f_cmd" type="hidden" />
	<input id="f_CurPage" name="f_CurPage" type="hidden" />
	<input id="pol" name="pol" type="hidden" /> <!-- #581 -->
	<!-- GridSetting Value -->
	<input id="user_id" name="user_id" value="<%=userInfo.getUsrid()%>" type="hidden" />
	
	<div class="page_title_area clear">
				<!-- page_title(S) -->
				<h2 class="page_title"><button type="button"><%=LEV3_NM%></button></h2>
				<!-- page_title(E) -->
				
				<!-- opus_design_btn(S) -->
				<div class="opus_design_btn TOP">

				</div>
				<!-- opus_design_btn(E) -->
	    
	  			<!-- page_location(S) -->
				<div class="location">	
					 <span><%=LEV1_NM%></span> &gt;
				 	 <span><%=LEV2_NM%></span> &gt;
				  	 <span><%=LEV3_NM%></span>
			   		<a href="" class="ir">URL Copy</a>
				</div>
				<!-- page_location(E) -->
	</div>
	<!-- page_title_area(E) -->
	
	<!-- inquiry_area(S) -->	
	<!-- inquiry_area(E) -->	
<div class="over_wrap" height="100%">	
	<!-- grid_area(S) -->
		<div class="wrap_result">
			<div class="opus_design_inquiry">	
				<!-- grid_area1(S) -->	
				<div class="opus_design_grid" id="mainTable">
					<script type="text/javascript">comSheetObject('sheet1');</script>
				</div> 
			</div>
				<!-- grid_area1(E) -->	
				
			<div class="layout_wrap">
			    <div class="layout_flex_fixed" style="width:700px;float:left!important" >
			    	<div id="disp_val_msg" style="width:100%;float:left!important;">
						<div class="layout_flex_fixed" style="width:770px;float:left!important">
					   		<h3 class="title_design"><bean:message key="Validation_Message"/></h3>
						</div>
						<table>
				 			<tr>
				 				<td>
				 					<textarea name="val_msg" cols="200" rows="14"  readOnly style = "background-color:#f4f6f6;ime-mode:disabled; text-transform:none; font-family:TAHOMA; overflow:auto; resize:none; white-space: pre-wrap;"></textarea>
				 				</td>
				 			</tr>
				 		</table>
					</div>
			    </div>
			</div>		
		</div>
		
		
			<div class="opus_design_inquiry">	
				<!-- grid_area2(S) -->	
				<div class="opus_design_grid" id="" style="display:none"><!-- display:none; -->
					<script type="text/javascript">comSheetObject('sheet2');</script>
				</div> 
			</div>
				<!-- grid_area2(E) -->	
	</div>				
    </form>
<script type="text/javascript">
	doBtnAuthority("<%= roleBtnVO.getAttr_extension() %>");
</script>	