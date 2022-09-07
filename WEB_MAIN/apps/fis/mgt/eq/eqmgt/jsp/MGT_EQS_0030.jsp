<%--
=========================================================
*@FileName   : MGT_EQS_0030.jsp
*@FileTitle  : Service Lane 등록 
*@Description: Service Lane 등록
*@author     : 이수영
*@version    : 1.0 - 04/21/2014
*@since      : 04/21/2014

*@Change history:
=========================================================
--%>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="clt-paging"   prefix="paging" %>
	<!-- 공통 Header -->
	<%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
	 <link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css"/>
	
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CoBizCommon.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/SYS_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/apps/fis/mgt/eq/eqmgt/script/MGT_EQS_0030.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/apps/fis/see/bmd/housebl/script/BL_CODE_UTIL.js?ver=<%=CLT_JS_VER%>"></script>
	
	
	<script type="text/javascript">
		function setupPage(){
			loadPage();
		}
		
	</script>
<bean:define id="valMap"  name="EventResponse" property="mapVal"/>

<form name="frm1" method="POST" action="./MGT_EQS_0030.clt" onsubmit="return false;" >
	<!--Command를 담는 공통 -->
	<input type="hidden" name="h_sel_org_cd" value="<bean:write name="valMap" property="sel_org_cd"/>"/>
	<input type="hidden" name="h_sel_des_cd" value="<bean:write name="valMap" property="sel_des_cd"/>"/>
	<input type="hidden" name="h_remark" value="<bean:write name="valMap" property="f_remark"/>"/>
	<input type="hidden" name="h_sel_Frequency_cd" value="<bean:write name="valMap" property="sel_Frequency_cd"/>"/>
	<input type="hidden" name="f_cmd"/>
	<div class="page_title_area clear">
	   <h2 class="page_title"><button type="button"><%=LEV3_NM%></button></h2>
	   <!-- btn_div -->
	   <div class="opus_design_btn TOP">
	   <%-- 
	   		<button style="cursor:hand" btnAuth="<%= roleBtnVO.getAttr3() %>" onclick="doWork('MODIFY')" id="btnModify" class="btn_accent"><bean:message key="Save"/></button>
	   		<button btnAuth="<%= roleBtnVO.getAttr2() %>" onclick="doWork('NEW');" class="btn_normal"><bean:message key="New"/></button>
	   		<button id="deleteBtn" btnAuth="<%= roleBtnVO.getAttr4() %>" class="btn_normal" onClick="doWork('DELETE')"><bean:message key="Delete"/></button>
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
	<div class="wrap_result">
	    <div class="opus_design_inquiry">
	    	<h3 class="title_design"><bean:message key="Service_Lane"/></h3>
	    	<table>
	    		<colgroup>
	    			<col width="100">
	    			<col width="*">
	    		</colgroup>
	    		<tbody>
					<tr>
						<th><bean:message key="Lane"/></th>
						<td>
							<input required type="text" name="lane_cd" alt="Lane Code"  style="width:70px;"  value="<bean:write name="valMap" property="lane_cd"/>"  maxlength="10" onkeypress="keyPress_maxLength(this);" onkeyup="keyUp_maxLength(this);searchDupLaneCd(this);" onblur="strToUpper(this);keyUp_maxLength(this);"  ><!-- 
						--><input required type="text" name="lane_nm" alt="Lane Name"  value="<bean:write name="valMap" property="lane_nm"/>" style="width:250px;" maxlength="50" >
						</td>
					</tr>
					<tr>
						<th><bean:message key="Origin"/></th>
						<td class="table_search_body">
							<logic:notEmpty name="EventResponse">
				             	<bean:define id="cdMap"  name="EventResponse" property="mapVal"/>
				             	<bean:define id="cdList" name="cdMap" property="orgDesCode"/>
			             		<select required id="sel_org_cd" name="sel_org_cd" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:150px;text-align:left">
									<option value=""></option>
	             					<logic:iterate id="codeVO" name="cdList">
		             					<option value='<bean:write name="codeVO" property="cd_val"/>'><bean:write name="codeVO" property="cd_nm"/></option>
	             					</logic:iterate>
	             				</select>
		             		</logic:notEmpty>
						</td>	                        
					</tr>
					<tr>
						<th><bean:message key="Destination"/></th>
						<td>
							<logic:notEmpty name="EventResponse">
				             	<bean:define id="cdMap"  name="EventResponse" property="mapVal"/>
				             	<bean:define id="cdList" name="cdMap" property="orgDesCode"/>
			             		<select required id="sel_des_cd" name="sel_des_cd" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:150px;text-align:left">
									<option value=""></option>
	             					<logic:iterate id="codeVO" name="cdList">
		             					<option value='<bean:write name="codeVO" property="cd_val"/>'><bean:write name="codeVO" property="cd_nm"/></option>
	             					</logic:iterate>
	             				</select>
		             		</logic:notEmpty>
						</td>	                        
					</tr>
					<tr>
						<th><bean:message key="Carrier"/></th>
						<td>
							<input required type="text" name="carrier" value="<bean:write name="valMap" property="carrier"/>"  maxlength="100" alt="Carrier" onkeyup="keyUp_maxLength(this);" dataformat="excepthan" style="ime-mode:disabled;width: 320px" class="search_form">
						</td>
					</tr>
					<tr>
						<th><bean:message key="Frequency"/></th>
						<td>
		             		<select required id="sel_Frequency_cd" name="sel_Frequency_cd" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:150px;text-align:left">
								<option value="W">Weekly</option>
								<option value="D">Daily</option>
	            			</select>
						</td>	
					</tr>
					
					<tr>
	                   <th><bean:message key="Remark"/></th>
	                   <td>
				           <textarea name="f_remark" maxlength="200" onkeypress="keyPress_maxLength(this);" onkeyup="keyUp_maxLength(this);" onblur="keyUp_maxLength(this);" class="search_form" dataformat="excepthan" style="width:470px;height:50px;"></textarea>
	                   </td>
	                </tr>
				</tbody>
			</table>
	    </div>
		<div class="opus_design_grid">
			<h3 class="title_design"><bean:message key="Route_Transit_Time"/></h3>
			<div class="opus_design_btn"><!--
			--><button onclick="doWork('ROWADD');" class="btn_normal"><bean:message key="Add"/></button><!--
			--><button onclick="doWork('ROWUP');" class="btn_normal"><bean:message key="Up"/></button><!--
			--><button onclick="doWork('ROWDOWN');" class="btn_normal"><bean:message key="Down"/></button>
			</div>
			<script language="javascript">comSheetObject('sheet1');</script>
		</div>
	</div>
</div>	
</form>