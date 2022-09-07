<%--
=========================================================
*@FileName   : MDM_MCM_0050.jsp
*@FileTitle  : Office Code
*@Description: Office Code
*@author     : Choi,Gil-Ju - Cyberlogitec
*@version    : 1.0 - 01/12/2009
*@since      : 01/12/2009

*@Change history:
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
	<script language="javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/MDM_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/apps/fis/mdm/mcm/office/script/MDM_MCM_0050_NW.js?ver=<%=CLT_JS_VER%>"></script>
	
	<script>	 
	 
		var pDoc = parent.parent.parent.document;
		hideProcess('WORKING', pDoc);
		
		<bean:define id="cdMap"  name="EventResponse" property="mapVal"/>
     	<bean:define id="cdList" name="cdMap" property="GL_CODE"/>
     	<bean:define id="cdList1" name="cdMap" property="FREIGHT_CODE"/>
     	<bean:define id="cdList2" name="cdMap" property="FREIGHT_CODE_NW"/>
     	<bean:define id="cdList_tz" name="cdMap" property="PARAM9"/>
     	
     	<bean:define id="bankList" name="cdMap" property="BANK_LIST"/>
     	<bean:define id="round" name="cdMap" property="PARAM11"/>
     	<bean:define id="fontSize" name="cdMap" property="PARAM1"/>
     	<bean:define id="wgtUtCd" name="cdMap" property="PARAM2"/>
     	<bean:define id="measUtCd" name="cdMap" property="PARAM3"/>
     	<bean:define id="length" name="cdMap" property="PARAM4"/>
     	<bean:define id="postDate" name="cdMap" property="PARAM5"/>
     	<bean:define id="taxType" name="cdMap" property="PARAM6"/>
     	<bean:define id="invPostDate" name="cdMap" property="PARAM7"/>

     	<bean:define id="impPostDate" name="cdMap" property="PARAM8"/>
     	
     	<!--//#376 [ZEN] OFFICE CODE > ACCCOUTING OPTION > INVOICE POST DAET OPTION -->
     	<bean:define id="invRefDate" name="cdMap" property="PARAM10"/>

     	<!--//WMS 고도화 - W/H Storage Account Code -->
     	<bean:define id="wmsFreightCode" name="cdMap" property="WMS_FREIGHT_CODE"/>

     	<bean:define id="repDfltType" name="cdMap" property="repDfltType.PARAM1"/>
     	
     	<bean:define id="ofcVO"  name="EventResponse" property="objVal"/>
     	<!-- Account GL -->
     	var GL_CODE_1 = '';
     	var GL_CODE_2 = '';
     	var FRT_CODE_1 = '';
     	var FRT_CODE_2 = '';
     	var PST_DT_1 = '';
     	var PST_DT_2 = '';
     	<% boolean isBegin = false; %>
    	<logic:iterate id="glVO" name="cdList">
    		<% if(isBegin){ %>
    			GL_CODE_1+= '|';
    			GL_CODE_2+= '|';
    		<% }else{
    			  isBegin = true;
    		   } %>
    		   	GL_CODE_1+= '<bean:write name="glVO" property="gl_cd"/>';
    		   	GL_CODE_2+= '<bean:write name="glVO" property="gl_cd"/>';
        </logic:iterate>
        
        <logic:iterate id="frtCdNwVO" name="cdList2">
			<% if(isBegin){ %>
				FRT_CODE_1+= '|';
				FRT_CODE_2+= '|';
			<% }else{
				  isBegin = true;
			   } %>
			   	FRT_CODE_1+= '<bean:write name="frtCdNwVO" property="gl_cd_rev"/>';
			   	FRT_CODE_2+= '<bean:write name="frtCdNwVO" property="gl_cd_rev"/>';
    	</logic:iterate>
    	
    	<logic:iterate id="codeVO" name="postDate">
			<% if(isBegin){ %>
				PST_DT_1+= '|';
				PST_DT_2+= '|';
			<% }else{
				  isBegin = true;
			   } %>
			   	PST_DT_1+= '<bean:write name="codeVO" property="cd_val"/>';
			  	PST_DT_2+= '<bean:write name="codeVO" property="cd_val"/>';
		</logic:iterate>
	</script>
<script type="text/javascript">
<!--
var th_debit_note = "<bean:message key='B.CR_DB'/>";
	
function setupPage() {
	loadPage();
	loaddata();
	if(frm1.show_complete.value == "Y"){
		showCompleteProcess();
		frm1.show_complete.value = "N"; 
	}
}
//-->
</script>
<form name="frm1" method="POST" action="./MDM_MCM_0050.clt" enctype="multipart/form-data">
	<!--Command를 담는 공통 -->
	<input type="hidden" name="f_cmd"/> 
	<input type="hidden" name="f_CurPage"/>
	<input type="hidden" name="i_9_it_next_no"/>
	<input type="hidden" name="sys_ofc_cd" value="<bean:write name="ofcVO" property="sys_ofc_cd"/>" id="sys_ofc_cd" />
	<input type="hidden" name="is_User" value="<bean:write name="ofcVO" property="is_User"/>" id="is_User" />
	<input type="hidden" name="f_role_cd" value="<%=userInfo.getRole_cd()%>">
        <!-- 타이틀, 네비게이션 --> 
        
    <input type="hidden" name="show_complete" 	value='<bean:write name="cdMap" property="show_complete"/>'>        
    <input type="hidden" name="svr_ip"/> 
    
    <!--  jsjang 2013.8.29 #17604 : [BINEX] 1. Tab에 Save한 다음 Current Screen 에서 Refresh. -->
    <input type="hidden" name="f_isNumSep" 	value='<bean:write name="cdMap" property="f_isNumSep"/>'>    
    
    <!-- Basis Setting  -->
    <input type="hidden" name="sts_set" value="<bean:write name="ofcVO" property="sts_set"/>"/>
    <input type="hidden" name="no_mbl" value="<bean:write name="ofcVO" property="no_mbl"/>"/>
    <input type="hidden" name="cre_hbl_flg" value="<bean:write name="ofcVO" property="cre_hbl_flg"/>"/>
    <input type="hidden" name="prn_cre_inv" value="<bean:write name="ofcVO" property="prn_cre_inv"/>"/>
    <input type="hidden" name="inv_apro" value="<bean:write name="ofcVO" property="inv_apro"/>"/>
    <input type="hidden" name="csr_apro" value="<bean:write name="ofcVO" property="csr_apro"/>"/>
    <input type="hidden" name="f_com_cd"/>
    <input type="hidden" name="f_co_cd" value="dummyData"/>
    <!-- Button -->
	<div class="page_title_area clear">
	   <h2 class="page_title" id='bigtitle'><button type="button"><%=LEV3_NM%></button></h2>
	   <!-- btn_div -->
	   <div class="opus_design_btn TOP">
	   <%-- 
		   <button type="button" class="btn_accent" <%= null != roleBtnVO? "style='display:none;' btnAuth='" + roleBtnVO.getAttr1() + "'"  : "" %> onclick="doWork('SEARCH')"><bean:message key="Search"/></button>
		   <button type="button" class="btn_normal" <%= null != roleBtnVO? "style='display:none;' btnAuth='" + roleBtnVO.getAttr2() + "'"  : "" %> onClick="doWork('NEW')"><bean:message key="New"/></button>
		   <button type="button" class="btn_normal" <%= null != roleBtnVO? "style='display:none;' btnAuth='" + roleBtnVO.getAttr3() + "'"  : "" %> onclick="doWork('SAVE')" id="btnSave"><bean:message key="Save"/></button>
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
	
	<!-- Search option -->
<div class="over_wrap" height="100%">
    <div class="wrap_search_tab">	
		<div class="opus_design_inquiry ">
			<table>
				<colgroup>
					<col width="80"></col>
					<col width="*"></col>
				</colgroup>
				<tbody>
					<tr>
                    	<th><bean:message key="Office_Code"/></th>
                        <td><!--
                        --><input type="text" name="s_ofc_cd" maxlength="5" value="<bean:write name="cdMap" property="s_ofc_cd"/>" required style="text-transform:uppercase;width:60;" onKeyPress="if(event.keyCode==13){codeNameAction('office',this, 'onKeyDown');doWork('SEARCH');}" onKeyPress="ComKeyOnlyAlphabet('uppernum')" onBlur="codeNameAction('office',this, 'onBlur')"><!--
                        --><button type="button" class="input_seach_btn" tabindex="-1" id="pod" onclick="doWork('OFFICE_POPLIST4')"></button><!--
                        --><input name="s_ofc_nm" class="search_form-disable" type="text" dataformat="excepthan" style="ime-mode:disabled;width:200px;text-align:left" value="<bean:write name="cdMap" property="s_ofc_nm"/>" readOnly></td>
                    </tr>
				</tbody>
			</table>
		</div>
	</div>
	
	<div class="wrap_result_tab">
	    <ul id="ulTab" class="opus_design_tab">
	        <li class="nowTab"><a href="#" id=Tab01 style="cursor:hand;" onClick="javascript:goTabSelect('01');"><span><bean:message key="Basic_Information"/></span></a></li>
	        <li><a href="#" id=Tab02 style="cursor:hand;" onClick="javascript:goTabSelect('02');"><span><bean:message key="Basic_Setting"/></span></a></li>
	        <li><a href="#" id=Tab03 style="cursor:hand;" onClick="javascript:goTabSelect('03');"><span><bean:message key="Accounting"/></span></a></li>
	        <li><a href="#" id=Tab04 style="cursor:hand;" onClick="javascript:goTabSelect('04');"><span><bean:message key="Document_Key"/></span></a></li>
	        <li><a href="#" id=Tab05 style="cursor:hand;" onClick="javascript:goTabSelect('05');"><span><bean:message key="Remark"/></span></a></li>
	        <!--<li><a href="#" id=Tab06 style="cursor:hand;" onClick="javascript:goTabSelect('06');"><span><bean:message key="Report"/></span></a></li>-->
<%-- 	        <li><a href="#" id=Tab06 style="cursor:hand;" onClick="javascript:goTabSelect('08');" style="display:none"><span><bean:message key="Terms"/></span></a></li> --%>
<%-- 	        <li><a href="#" id=Tab06 style="cursor:hand;" onClick="javascript:goTabSelect('09');" style="display:none"><span><bean:message key="Setup"/></span></a></li> --%>
	    </ul>
	 
		<div id="tabLayer" name="tabLayer"><!--Booking&BL-->
			   <%@ include file = "./MDM_MCM_0051_NW.jsp"%>
		</div>
		<div id="tabLayer" name="tabLayer" style="display:none"><!--Basic Setting-->
			   <%@ include file = "./MDM_MCM_0052_NW.jsp"%>
		</div>
		<div id="tabLayer" name="tabLayer" style="display:none"><!--Accounting-->
			   <%@ include file = "./MDM_MCM_0053_NW.jsp"%>
		</div>
		<div id="tabLayer" name="tabLayer" style="display:none"><!--Document Key-->
			   <%@ include file = "./MDM_MCM_0054_NW.jsp"%>
		</div>
		<div id="tabLayer" name="tabLayer" style="display:none"><!--Remark-->
				<%@ include file = "./MDM_MCM_0055_NW.jsp"%>
		</div>
		<%-- 
		<div id="tabLayer" name="tabLayer"><!--Report-->
				<%@ include file = "./MDM_MCM_0058.jsp"%>
		</div>
		
				
		<div id="tabLayer" name="tabLayer"  style="display:none"><!--Status-->
				<%@ include file = "./MDM_MCM_0056.jsp"%>
		</div>
		<div id="tabLayer" name="tabLayer"  style="display:none"><!--Status-->
				<%@ include file = "./MDM_MCM_0057.jsp"%>
		</div> --%>

	</div>
</div>
</form>

<form name="frm2" method="POST" action="./GateServlet.gsl">
	<input type="hidden" name="goWhere" value="fd" id="goWhere" />
    <input type="hidden" name="bcKey" value="ofcFileDown" id="bcKey" />
    <input type="hidden" name="v_ofc_cd" value="" id="v_ofc_cd" />
    <input type="hidden" name="v_set_type" value="" id="v_set_type"/>	
    <input type="hidden" name="docType" value="" id="docType" />
</form>	

<script type="text/javascript">
	var attr_extension = "<%= null!=roleBtnVO ?roleBtnVO.getAttr_extension():"" %>";
	doBtnAuthority(attr_extension);
	</script>

