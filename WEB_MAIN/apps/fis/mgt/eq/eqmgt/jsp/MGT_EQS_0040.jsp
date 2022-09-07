<%--
=========================================================
*@FileName   : MGT_EQS_0040.jsp
*@FileTitle  : Service Lane LIST 조회
*@Description: Service Lane LIST 조회
*@author     : 이수영
*@version    : 1.0 - 04/22/2014
*@since      : 04/22/2014

*@Change history:
=========================================================
--%>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
	<!-- 공통 Header -->
	<%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
	<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css"/>
	
	<script language="JavaScript">
		function setupPage(){
			loadPage();
		}
	</script>
	
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CoBizCommon.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/SYS_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/apps/fis/mgt/eq/eqmgt/script/MGT_EQS_0040.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/apps/fis/see/bmd/housebl/script/BL_CODE_UTIL.js?ver=<%=CLT_JS_VER%>"></script>
	
<form name="frm1" method="POST" action="./MGT_EQS_0040.clt" onSubmit="return false;" >
	<!--Command를 담는 공통 -->
	<input type="hidden" name="f_cmd"/> 
	<div class="page_title_area clear">
	   <h2 class="page_title"><button type="button"><%=LEV3_NM%></button></h2>
	   <!-- btn_div -->
	   <div class="opus_design_btn TOP">
	   <%-- 
	   		<button onclick="doWork('SEARCHLIST')" class="btn_accent"><bean:message key="Search"/></button>
	   		<button onclick="doWork('NEW');" class="btn_normal"><bean:message key="New"/></button>
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
	    <div class="opus_design_inquiry entry_pannel ">
	    	<table>
	    		<colgroup>
	    			<col width="40">
	    			<col width="150">
	    			<col width="60">
	    			<col width="120">
	    			<col width="90">
	    			<col width="120">
	    			<col width="60">
	    			<col width="*">
	    		</colgroup>
	    		<tbody>
	    			<tr>
	    				<th><bean:message key="Lane"/></th>
						<td>
                            <input type="text" name="lane_cd"  alt="Lane Code"  style="width:150px;"  maxlength="10" onkeypress="keyPress_maxLength(this);" onkeyup="keyUp_maxLength(this);" onblur="strToUpper(this);keyUp_maxLength(this);"  >
						</td>
	    				<th><bean:message key="Origin"/></th>
						<td>
                            <logic:notEmpty name="EventResponse">
			             	<bean:define id="cdMap"  name="EventResponse" property="mapVal"/>
			             	<bean:define id="cdList" name="cdMap" property="orgDesCode"/>
		             		<select required id="sel_org_cd" name="sel_org_cd" class="search_form">
								<option value="ALL">ALL</option>
             					<logic:iterate id="codeVO" name="cdList">
	             					<option value='<bean:write name="codeVO" property="cd_val"/>'><bean:write name="codeVO" property="cd_nm"/></option>
             					</logic:iterate>
             				</select>
	             		</logic:notEmpty>
						</td>
	    				<th><bean:message key="Destination"/></th>
						<td>
                            <logic:notEmpty name="EventResponse">
				             	<bean:define id="cdMap"  name="EventResponse" property="mapVal"/>
				             	<bean:define id="cdList" name="cdMap" property="orgDesCode"/>
			             		<select required id="sel_des_cd" name="sel_des_cd" class="search_form" >
									<option value="ALL">ALL</option>
	             					<logic:iterate id="codeVO" name="cdList">
		             					<option value='<bean:write name="codeVO" property="cd_val"/>'><bean:write name="codeVO" property="cd_nm"/></option>
	             					</logic:iterate>
	             				</select>
		             		</logic:notEmpty>
						</td>
						<th><bean:message key="Carrier"/></th>
						<td>
                            <input type="text" name="carrier" value="" maxlength="20" alt="Carrier" dataformat="excepthan" style="ime-mode:disabled;width: 320px" class="search_form">
						</td>
	    			</tr>
	    		</tbody>
	    	</table>
	    </div>
	</div>
	<div class="wrap_result">
		<div class="opus_design_grid">
			<script language="javascript">comSheetObject('sheet1');</script>
		</div>
	</div>
</div>
</form>

