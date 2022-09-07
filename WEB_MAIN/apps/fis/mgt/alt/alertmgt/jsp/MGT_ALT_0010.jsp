<%--
=========================================================
*@FileName   : MGT_ALT_0010.jsp
*@FileTitle  :
*@Description: 
*@author     : 
*@version    :
*@since      :

*@Change history:
=========================================================
--%>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="clt-paging"   prefix="paging" %>
	<!-- 공통 Header -->
	<%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
	<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css" />
	<script language="javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/SYS_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/apps/fis/mgt/alt/alertmgt/script/MGT_ALT_0010.js?ver=<%=CLT_JS_VER%>"></script>
	

	<script>
	<bean:define id="valMap" name="EventResponse" property="mapVal"/>
	<!-- OFC_CD -->
	var ofc_cd = "<%= userInfo.getOfc_cd() %>";
	var OFCCD = 'ALL|';
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
    
    /* User Role  */
    /* #2364 */
    var user_role_cd = '<%=userInfo.getRole_cd()%>';
    
	<!-- Alert Entity Type -->
	var ETTCD = '|';
	var ETTVAL = '|';
	<% boolean isBegin = false; %>
    <bean:define id="alertEttList" name="valMap" property="alertEttList"/>
    <logic:iterate id="codeVO" name="alertEttList">
        <% if(isBegin){ %>
        ETTCD += '|';
        ETTVAL += '|';
        <% }else{
        	isBegin = true;
           } %>
        //ETTCD+= '<bean:write name="codeVO" property="cd_nm"/>';
        //ETTVAL+= '<bean:write name="codeVO" property="rmk"/>';
        ETTCD+= '<bean:write name="codeVO" property="cd_val"/>';
        ETTVAL+= '<bean:write name="codeVO" property="cd_nm"/>';

    </logic:iterate>

    <!-- Customer Type -->
	var CUST_CD = '';
	var CUST_VAL = '';
    <bean:define id="alertCustomerList" name="valMap" property="alertCustomerList"/>
    <logic:iterate id="codeVO" name="alertCustomerList">
        <% if(isBegin){ %>
        CUST_CD += '|';
        CUST_VAL += '|';
        <% }else{
        	isBegin = true;
           } %>
           CUST_CD+= '<bean:write name="codeVO" property="cd_val"/>';
           CUST_VAL+= '<bean:write name="codeVO" property="cd_nm"/>';
    </logic:iterate>

    <!-- Trade Partner Type -->
	var TP_CD = '';
	var TP_VAL = '';
    <bean:define id="tradePartnerTypeList" name="valMap" property="tradePartnerTypeList"/>
    <logic:iterate id="codeVO" name="tradePartnerTypeList">
        <% if(isBegin){ %>
        TP_CD += '|';
        TP_VAL += '|';
        <% }else{
        	isBegin = true;
           } %>
           TP_CD+= '<bean:write name="codeVO" property="cd_val"/>';
           TP_VAL+= '<bean:write name="codeVO" property="cd_nm"/>';
    </logic:iterate>
    
	function setupPage(){
       	loadPage();
    }
	</script>
<bean:define id="valMap"  name="EventResponse" property="mapVal"/>

<form name="frm1" method="POST" action="./MGT_ALT_0010.clt" >
	<!--Command를 담는 공통 -->
	<input type="hidden" name="f_cmd"/> 
	<input type="hidden" name="f_CurPage"/>

	<!-- page_title_area -->
	<div class="page_title_area clear">
		<h2 class="page_title"><button type="button"><%=LEV3_NM%></button></h2>
		<!-- btn_div -->
		<div class="opus_design_btn TOP">
		<%-- 
			<button type="button" class="btn_accent"   <%= null != roleBtnVO? "style='display:none;' btnAuth='" + roleBtnVO.getAttr1() + "'"  : "" %> onclick="doWork('SEARCHLIST')"><bean:message key="Search"/></button>
			<button type="button" class="btn_normal"  <%= null != roleBtnVO? "style='display:none;' btnAuth='" + roleBtnVO.getAttr3() + "'"  : "" %> id="btnSave" onclick="doWork('SAVE')"><bean:message key="Save"/></button>
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
	<div class="wrap_search">
	    <!-- inquiry_area(S) -->	
		<div class="opus_design_inquiry entry_pannel ">
			<!-- h3 class="title_design"><bean:message key="Search_Condition"/></h3 -->
		    <table>
		        <colgroup>
		        	<col width="80px" />
		        	<col width="*" />
		        </colgroup>
		        <tbody>
		        	<tr>
		        		<th><bean:message key="Name"/></th>
				        <td>
				        	<input name="alt_nm" type="text" maxlength="50" value='' class="search_form" onblur="strToUpper(this);" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:100px;" onKeyPress="if(event.keyCode==13){doWork('SEARCHLIST');}">
				        </td>
		        	</tr>
		        </tbody>
	        </table>
		</div>
	     <!-- inquiry_area(S) -->	
	</div>
	<!-- wrap search (E) -->
	
	<!-- wrap_result(S) -->
	<div class="wrap_result">
		<%@ include file = "./MGT_ALT_0011.jsp"%>
	</div>
</div>
</form>

<iframe name="ifrm1" src="" frameborder="0" scrolling="no" width="0" height="0"></iframe>


<script type="text/javascript">
	var attr_extension = "<%= null!=roleBtnVO ?roleBtnVO.getAttr_extension():"" %>";
	doBtnAuthority(attr_extension);
</script>	

