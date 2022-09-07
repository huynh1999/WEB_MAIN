<%--
=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : MDM_MCM_0120.jsp
*@FileTitle  : Commodity Code
*@author     : CLT
*@version    : 1.0
*@since      : 2014/06/05
=========================================================
--%>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="clt-paging"   prefix="paging" %>
	<!-- 공통 Header -->
	<%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
	<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css" />
	    <title><bean:message key="system.title"/></title>
	
	<!-- 일자 및 달력팝업 호출 -->
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="./apps/fis/mdm/code/commodity/script/MDM_MCM_0120.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/MDM_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	
	<script>
		var pDoc = parent.parent.parent.document;
		hideProcess('WORKING', pDoc);

		<!-- 처리시 메시지 -->
	var CNF_MSG1 = '<bean:message key="Do_you_want_to_run"/>';
	var PARAM1_1 = ' |';
	var PARAM1_2 = ' |';
	var PARAM2_1 = '';
	var PARAM2_2 = '';

	<bean:define id="rtnMap" name="EventResponse" property="mapVal"/>

	<% boolean isBegin = false; %>
    <!-- GROUP Commodity Code 코드조회-->
	<bean:define id="param1List"  name="rtnMap" property="PARAM1"/>
	<logic:iterate id="codeVO" name="param1List">
		<% if(isBegin){ %>
			PARAM1_1+= '|';
			PARAM1_2+= '|';
		<% }else{
			  isBegin = true;
		   } %>
		PARAM1_1+= '<bean:write name="codeVO" property="cd_nm"/>';
        PARAM1_2+= '<bean:write name="codeVO" property="cd_val"/>';
     </logic:iterate>

	<% isBegin = false; %>
    <!-- HS GROUP Code 코드조회-->
	<bean:define id="param2List"  name="rtnMap" property="PARAM2"/>
	<logic:iterate id="codeVO" name="param2List">
		<% if(isBegin){ %>
			PARAM2_1+= '|';
			PARAM2_2+= '|';
		<% }else{
			  isBegin = true;
		   } %>
		PARAM2_1+= '<bean:write name="codeVO" property="cd_nm"/>';
        PARAM2_2+= '<bean:write name="codeVO" property="cd_val"/>';
    </logic:iterate>
	</script>

<script type="text/javascript">
<!--
function setupPage(){
	loadPage();
	//setSelect();
	searchList();
}

//-->
</script>
	<form name="frm1" method="POST" action="./">
	<!--Command를 담는 공통 -->
	<input type="hidden" name="f_cmd" id="f_cmd"/>
	<input type="hidden" name="f_CurPage" id="f_CurPage"/>
	<input type="hidden" name="trdp_cd" id="trdp_cd"/>
    <!-- 타이틀, 네비게이션 -->
<!-- page_title_area(S) -->
	<div class="page_title_area clear ">
		<!-- page_title(S) -->
		<h2 class="page_title"><button type="button"><%=LEV3_NM%></button></h2>
		<!-- page_title(E) -->
			
		<!-- opus_design_btn(S) -->
		<div class="opus_design_btn TOP" >
		<%-- 
			<button type="button" class="btn_accent" <%= null != roleBtnVO? "style='display:none;' btnAuth='" + roleBtnVO.getAttr1() + "'"  : "" %> onclick="searchList();">Search</button>
			<button type="button" class="btn_normal" onclick="doWork('ROWADD')" >Add</button>
			<button type="button" class="btn_normal"  <%= null != roleBtnVO? "style='display:none;' btnAuth='" + roleBtnVO.getAttr3() + "'"  : "" %> onclick="doWork('MODIFY')" id="btnModify">Save</button>
			 --%>
		</div>
		<!-- opus_design_btn(E) -->	
		    <!-- page_location(S) -->
		<div class="location">
        <!-- location 내용 동적생성 (별도 코딩 불필요) -->
			<span><%=LEV1_NM%></span> &gt;
		   <span><%=LEV2_NM%></span> &gt;
		   <span><%=LEV3_NM%></span>
		   <a href="" class="ir">URL Copy</a>
		</div>
	</div>
    <!-- page_location(E) -->   
     
<div class="over_wrap" height="100%">
<div class= "wrap_search">
		<div class= "opus_design_inquiry entry_pannel">
            <table>
            	<colgroup>
            		<col width="110">
            		<col width="150">
            		<col width="120">
            		<col width="110">
            		<col width="90">
            		<col width="*">
            	</colgroup>
            	<tbody>
	              <tr>
	                  <th><bean:message key="HS_Group_Code"/></th>
                      <td>
	                      <logic:notEmpty name="EventResponse">
	                      <bean:define id="group1Map"  name="EventResponse" property="mapVal"/>
	                      <bean:define id="group1List" name="group1Map" property="PARAM2"/>
	                      <select 	name="sel_hs_grp_cd" style="width:150px;">
	                      <logic:iterate id="group1VO" name="group1List">
	                      <option value='<bean:write name="group1VO" property="cd_val"/>'><bean:write name="group1VO" property="cd_nm"/></option>
	                      </logic:iterate>
	                      </logic:notEmpty>
	                      </select></td>
	
                        <th><bean:message key="Commodity_Code"/></th>
                        <td><input type="text" name="txt_cmdt_cd" maxlength="10" value="" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:100px" onKeyPress="ComKeyOnlyAlphabet('uppernum')" class="" ></td>
			
                        <th style="display:none;"><bean:message key="Group_Name"/></th>
                        <td>
	                      <logic:notEmpty name="EventResponse">
	                      <bean:define id="groupMap"  name="EventResponse" property="mapVal"/>
	                      <bean:define id="groupList" name="groupMap" property="PARAM1"/>
	                      <select name="sel_cmdt_grp_cd"  style="display:none;">
	                      <option value=""></option>
	                      <logic:iterate id="groupVO" name="groupList" >
	                      <option value='<bean:write name="groupVO" property="cd_val"/>'><bean:write name="groupVO" property="cd_nm"/></option>
	                      </logic:iterate>
	                      </logic:notEmpty>
	                      </select></td>
                    	</tr>

					
                    <tr>
                        <th><bean:message key="Commodity_Name"/></th>
                        <td><input type="text" name="txt_cmdt_nm" maxlength="100" value="" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:150px" class=""></td>
                        
                        <th><bean:message key="Description"/></th>
                        <td><input type="text" name="txt_disc" maxlength="200" value="" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:100px" class=""></td>
                    
                        <th><bean:message key="Use_YN"/></th>
                        <td colspan="2">
                      <select name="f_delt_flg" style="width:80px;">
                      <option value=""></option>
                      <option value="N">Yes</option>
                      <option value="Y">No</option>
                      </select></td>
                    </tr>
                    </tbody>
                </table>
	</div>
</div>    
<div class="wrap_result"> 	
	<div class="opus_design_grid">	
		<script type="text/javascript">comSheetObject('sheet1');</script>
	</div>	
 	<table>
        <tr>
            <td width="55px">
                <bean:define id="tmpMapVal" name="EventResponse" property="mapVal"/>
                <bean:define id="pagingVal" name="tmpMapVal"     property="paging"/>
                <paging:options name="pagingVal" defaultval="200"/>
            </td>                               
           <td id="pagingTb" style='font-family: "Tahoma", "Arial", "Verdana";font-size: 12px;'>
           </td>
        </tr>
    </table>
</div>
</div>
</form>   

<script type="text/javascript">
	var attr_extension = "<%= null!=roleBtnVO ?roleBtnVO.getAttr_extension():"" %>";
	doBtnAuthority(attr_extension);
	</script>	 


