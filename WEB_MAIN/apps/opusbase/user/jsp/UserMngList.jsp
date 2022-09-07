<%--
=========================================================
*Copyright(c) 2009 CyberLogitec. All Rights Reserved.
=========================================================

=========================================================
*@FileName   : MGT_AUT_0010.jsp
*@FileTitle  : 최상위 메뉴 표시
*@Description: 최상위 메뉴의 관리
*@author     : Kang,Jung-Gu - Cyberlogitec
*@version    : 1.0 - 2008.12.03
*@since      : 2008.12.03

*@Change history:
*@author     : Tuan.Chau
*@version    : 2.0 - 2014/06/18
*@since      : 2014/06/18
=========================================================
--%>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="clt-paging"   prefix="paging" %>
<%@include file="./../../../../../../../../syscommon/header/CLTHeader.jsp"%>
	<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css">
    <script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/SYS_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="./apps/opusbase/user/script/UserMngList.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
	
	
	<script>
		<!-- 처리시 메시지 -->
		var CNF_MSG1 = '<bean:message key="Do_you_want_to_run"/>';
		var ROLCD1 = '';
		var ROLCD2 = '';
		
		var LANGCD1= '';
		var LANGCD2= '';
		
		var DPTCD1 = '';
		var DPTCD2 = '';
		
		var TEAMCD1 = '';
		var TEAMCD2 = '';
		
		var OBORDTPCD1 = '';
		var OBORDTPCD2 = '';
		
		var WHCDLIST1 = '';
		var WHCDLIST2 = '';
		var whCd_Nm = '';

		<bean:define id="rtnMap" name="EventResponse" property="mapVal"/>
		<% boolean isBegin = false; %>
		<!--Role 코드조회-->
		<bean:define id="rolList"  name="rtnMap" property="ROLLIST"/>
		<logic:iterate id="codeVO" name="rolList">
			<% if(isBegin){ %>
				ROLCD1+= '|';
				ROLCD2+= '|';
			<% }else{
				  isBegin = true;
			   } %>
			ROLCD1+= '<bean:write name="codeVO" property="code_label" filter="false"/>';
			ROLCD2+= '<bean:write name="codeVO" property="code" filter="false"/>';
		</logic:iterate>
		
		<!--언어코드-->
		<% isBegin = false; %>
		<bean:define id="langList" name="rtnMap" property="LANGLIST"/>
		<logic:iterate id="langVO" name="langList">
			<% if(isBegin){ %>
				LANGCD1+= '|';
				LANGCD2+= '|';
			<% }else{
				  isBegin = true;
			   } %>
			LANGCD1+= '<bean:write name="langVO" property="cd_nm"/>';
			LANGCD2+= '<bean:write name="langVO" property="cd_val"/>';
		</logic:iterate>
		
		
		
		<% isBegin = false; %>
        <bean:define id="dptList" name="rtnMap" property="DEPTLIST"/>
        <logic:iterate id="dptVO" name="dptList">
            <% if(isBegin){ %>
                DPTCD1+= '|';
                DPTCD2+= '|';
            <% }else{
                  isBegin = true;
               } %>
            DPTCD1+= '<bean:write name="dptVO" property="cd_nm"/>';
            DPTCD2+= '<bean:write name="dptVO" property="cd_val"/>';
        </logic:iterate>
        
        <% isBegin = false; %>
        <bean:define id="teamList" name="rtnMap" property="TEAMLIST"/>
        <logic:iterate id="teamVO" name="teamList">
            <% if(isBegin){ %>
            	TEAMCD1+= '|';
            	TEAMCD2+= '|';
            <% }else{
                  isBegin = true;
               } %>
            TEAMCD1+= '<bean:write name="teamVO" property="cd_nm"/>';
            TEAMCD2+= '<bean:write name="teamVO" property="cd_val"/>';
        </logic:iterate>
        
        /*vinh.vo 07/10/2015 (S)*/
        
		//Get Outbound Order Type List
		
        <% isBegin = false; %>
        <bean:define id="ObOrdTpList" name="rtnMap" property="OB_ORD_TP_LIST"/>
        <logic:iterate id="ObOrdTpVO" name="ObOrdTpList">
            <% if(isBegin){ %>
	            OBORDTPCD1+= '|';
	            OBORDTPCD2+= '|';
            <% }else{
                  isBegin = true;
               } %>
               OBORDTPCD1+= '<bean:write name="ObOrdTpVO" property="cd_nm"/>';
               OBORDTPCD2+= '<bean:write name="ObOrdTpVO" property="cd_val"/>';
        </logic:iterate>
        
        //Get Warehouse Code List
        
        <% isBegin = false; %>
        <bean:define id="WhList" name="rtnMap" property="WH_LIST"/>
        <logic:iterate id="WhVO" name="WhList">
            <% if(isBegin){ %>
            WHCDLIST1+= '|';
            WHCDLIST2+= '|';
            <% }else{
                  isBegin = true;
               } %>
               WHCDLIST1+= '<bean:write name="WhVO" property="wh_nm"/>';
               WHCDLIST2+= '<bean:write name="WhVO" property="wh_cd"/>';
               whCd_Nm += "|"+'<bean:write name="WhVO" property="wh_cd"/>' +'\t '+'<bean:write name="WhVO" property="wh_nm"/>';
        </logic:iterate>
        
        /*vinh.vo 07/10/2015 (E)*/
        /* Get list warehouse for combobox TinLuong DOU 20160412 (S)*/
     /*    var whCd = "";
		var whNm = "";
		var whCd_Nm="";
		
		'<logic:notEmpty name="warehouseList">'
			'<logic:iterate id="item" name="warehouseList">'
				whCd +="|"+'<bean:write name="item" property="wh_cd"/>';
				whNm +="|"+'<bean:write name="item" property="wh_nm"/>';
				whCd_Nm += "|"+'<bean:write name="item" property="wh_cd"/>' +'\t '+'<bean:write name="item" property="wh_nm"/>';
			'</logic:iterate>'
			
		'</logic:notEmpty>' */
		/* Get list warehouse for combobox TinLuong DOU 20160412 (E)*/
	</script>
<script>
function setupPage(){
	loadPage();
	doWork('SEARCHLIST');
}
</script>
<form name="frm1" method="POST" target="./MGT_AUT_0010.clt">
    <input type="hidden" name="f_cmd"     value="">
	<input type="hidden" name="f_CurPage" value="">
	<input type="hidden" name="f_usrid" value="">
	<input type="hidden" name="user_id"  value="<%=userInfo.getUsrid()%>" />
	<input type="hidden" name="user_qty"  value="<bean:write name="rtnMap" property="user_qty"/>	" />
		
<!-- Button -->
<div class="page_title_area clear">
   <h2 class="page_title"><button type="button"><%=LEV3_NM%></button></h2>
   <!-- btn_div -->
   <div class="opus_design_btn TOP">
   <!-- 
	    <button type="button" class="btn_accent" onclick="clearAll();searchList();"><bean:message key="Search"/></button> 
	   	<button type="button" class="btn_accent" onclick="doWork('ROWADD')"><bean:message key="Add"/></button>
	   	<button id="btnSave" type="button" class="btn_normal" onclick="doWork('SAVE')"><bean:message key="Save"/></button> 
	   	<button type="button" class="btn_normal" onclick="doWork('EXCEL')" name="btn_DownExcel"><bean:message key="Excel"/></button>
	   	 -->
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

<div class="wrap_search">	
	<div class="opus_design_inquiry entry_pannel ">
		<table width="500">
			<tr>
				<th style="width:80px"><bean:message key="User_ID"/></th>
				<td style="width:100px">
					<input type="text" name="s_usrid" maxlength="12" value="" class="search_form" style="ime-mode:disabled; width:80;" dataformat="excepthan" onKeyDown="entSearch()">
				</td>
				<th style="width:100px"><bean:message key="Local_Name"/></th>
				<td style="width:150px">
					<input type="text" name="s_locl_usr_nm"  maxlength="300" value="" class="search_form" style="ime-mode:disabled; width:180;" dataformat="excepthan" onKeyDown="entSearch()">
				</td>
				<th style="width:80px"><bean:message key="Office"/></th>
				<td style="width:130px">
					<bean:define id="oficeList"  name="rtnMap" property="OFCLIST"/>
	            	<select name="s_ofc_cd" class="search_form" style="width:102;">
	            		<option value="">ALL</option>
	            		<logic:iterate id="ofcVO" name="oficeList">
		             	<option value='<bean:write name="ofcVO" property="ofc_cd"/>'><bean:write name="ofcVO" property="ofc_cd"/></option>
	             		</logic:iterate>
	            	</select>
				</td>
				<th style="width:80px"><bean:message key="Role"/></th>
				<td style="width:180px">
					<select name="s_role_cd" class="search_form" style="width:152;">
	            		<option value="">ALL</option>
	            		<logic:iterate id="codeVO" name="rolList">
		             	<option value='<bean:write name="codeVO" property="code"/>'><bean:write name="codeVO" property="code_label"/></option>
	             		</logic:iterate>
	            	</select>
				</td>
				<td nowrap class="table_search_body">
                	<table  border="0" cellpadding="0" cellspacing="0">
                    	<tr>
                    		<td width="60" nowrap class="table_search_body"><input type="radio" name="s_use_flg" id="s_use_flg_y" value="Y" checked="checked" ><bean:message key="Enable"/></td>
                    		<td width="60" nowrap class="table_search_body"><input type="radio" name="s_use_flg" id="s_use_flg_n" value="N" ><bean:message key="Disable"/></td>
                    		<td width="60" nowrap class="table_search_body"><input type="radio" name="s_use_flg" id="s_use_flg_a" value="" > <bean:message key="All"/></td>
                     	</tr>
                     </table>
              	</td>
			</tr>
		</table>
	</div>
</div>
<div>
	<table>
		<tr height="12px"></tr>
		<tr>
			<th style="color: red;" align="left">&nbsp;&nbsp;&nbsp;*Default password after new user creation or password reset : 1111</th>
		</tr>
	</table>
</div>	
<div class="wrap_result">
   	<h3 class="title_design"><bean:message key="Basic_Information"/></h3>
   	<div class="opus_design_grid" id="mainTable">
    	<script language="javascript">comSheetObject('sheet1');</script>
    </div>
    <div class="layout_wrap opus_design_inquiry">
    	<div class="layout_vertical_2" style="padding-top:10px">
    		<h3 class="title_design"><bean:message key="USR_ACS_INFO"/></h3>
		    <div class="opus_design_grid pad_rgt_8">
		    	<script language="javascript">comSheetObject('sheet2');</script>
		    </div>
		</div>
    	<div class="layout_vertical_2">
    		<div class="opus_design_grid" >
	        	<h3 class="title_design"><bean:message key="IP_MGMT_INFO"/></h3>
		        <div class="opus_design_btn">
					<button type="button" class="btn_normal" disabled="disabled" id="btnAdd2" onclick="doWork('IP_ROWADD')" ><bean:message key="Add"/></button> 
					<button type="button" class="btn_normal" disabled="disabled" id="btnSave2" onclick="doWork('IP_SAVE')" ><bean:message key="Save"/></button>
		        </div>
		    	<script language="javascript">comSheetObject('sheet3');</script>
		    </div>
		</div>
    </div>
</div>
</div>
</form>
<script>
    var pDoc = parent.parent.parent.document;
    hideProcess('WORKING', pDoc);   
</script>

