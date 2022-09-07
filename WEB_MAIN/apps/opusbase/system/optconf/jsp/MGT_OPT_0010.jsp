<%--
=========================================================
*@FileName   : MGT_OPT_0010.jsp
*@FileTitle  : MAC Address Management
*@Description: MAC Address Management
*@author     : Kim,Jin-Hyuk - Cyberlogitec
*@version    : 1.0 - 2011/09/23
*@since      : 2011/09/23
*@Change history:
	<script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/SYS_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
=========================================================
--%>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="clt-paging"   prefix="paging" %>
	<!-- 공통 Header -->
	<%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
	<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css" />
	    <title><bean:message key="system.title"/></title>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CoFormControl.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/SYS_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/apps/opusbase/system/optconf/script/MGT_OPT_0010.js?ver=<%=CLT_JS_VER%>"></script>
	
	<bean:define id="valMap"  name="EventResponse" property="mapVal"/>
	<bean:define id="oficeList" name="valMap" property="ofcList"/>
	<script>
		var pDoc = parent.parent.parent.document;
		hideProcess('WORKING', pDoc);
		$(document).ready(function(){
			//var tmp_ofc_cd = document.getElementById("s_ofc_cd").value;
			
			//$("#f_sys_ofc_cd_pre_fix").val(tmp_ofc_cd).prop("selected", true);
			//$("#f_sys_ofc_cd_pre_fix").find("option:eq(0)").prop("selected", true);
			//$("#f_sys_ofc_cd_pre_fix > option[@value='"+ tmp_ofc_cd  +"']").prop("selected", true);
			//alert(tmp_ofc_cd);
			
		});
	</script>
	<bean:define id="mapVal" name="EventResponse" property="mapVal"/>
	<script language="javascript">
	
	var prop_cdCode = "";
	
	<logic:iterate id="ofcVO" name="oficeList">
	prop_cdCode+=  '|' + '<bean:write name="ofcVO" property="ofc_cd"/>';
	</logic:iterate>	
	prop_cdCode = prop_cdCode.substring(1);
	
	function setupPage(){ 
		loadPage();
		if(frm1.show_complete.value == "Y"){
			showCompleteProcess();
		}
	}
	</script>
</head>
<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css">
<!--ajax 사용시 -->
<style type="text/css">
<!--
style1 {color: #CC0000}
-->
</style>

	<form name="frm1" method="POST" action="./">
	<!--Command를 담는 공통 -->
	<input type="hidden" name="f_cmd"/>
	<input type="hidden" name="work_flg"/>
	<input type="hidden" name="f_CurPage"/>
	<input type="hidden" name="f_Flag"/>
	<input type="hidden" name="show_complete" 	value='<bean:write name="mapVal" property="SHOW_COMPLETE"/>'>	
		
	<div class="page_title_area clear">
	   <h2 class="page_title"><button type="button"><%=LEV3_NM%></button></h2>
	   <!-- btn_div -->
	   <div class="opus_design_btn TOP">
	   <%-- 
		   <button type="button" class="btn_accent" <%= null != roleBtnVO? "style='display:none;' btnAuth='" + roleBtnVO.getAttr1() + "'"  : "" %> onclick="document.forms[0].f_CurPage.value='';doWork('SEARCHLIST')">Search</button> 
		   <button type="button" class="btn_normal"  <%= null != roleBtnVO? "style='display:none;' btnAuth='" + roleBtnVO.getAttr3() + "'"  : "" %> id="btnSave" onclick="doWork('ROWADD')"><bean:message key="Add"/></button>
		   <button type="button" class="btn_normal"  <%= null != roleBtnVO? "style='display:none;' btnAuth='" + roleBtnVO.getAttr3() + "'"  : "" %> id="btnSave" onclick="doWork('SAVE')"><bean:message key="Save"/></button> 
		   <!-- <button type="button" class="btn_normal" id="btnSave" onclick="doWork('EXCEL')" name="btn_DownExcel"><bean:message key="Excel"/></button> -->
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
	<!-- wrap_search(S) -->	
	<div class="wrap_search">
		<h3 class="title_design"></h3>
		<div class="opus_design_inquiry ">
			<table>
				<colgroup>
				<col width="40" />
				<col width="80" />
				<col width="110" />
				<col width="80" />
				<col width="110" />
				<col width="80" />
				<col width="*" />
				</colgroup>
				<tbody>
					<tr>
						<th>KEY&nbsp;</th>
						<td>
							<input tabindex="text" maxlength="30" value="" name="f_opt_key" id="f_opt_key" style="width: 150px;" dataformat="" onkeydown="entSearch();" >							
						</td>
						<th>VALUE&nbsp;</th>
						<td>			
							<input tabindex="text" maxlength="" value="" name="f_opt_val" id="f_opt_val" style="width: 100px;" dataformat="" onkeydown="entSearch();">
						</td>
						<th>DESC.&nbsp;</th>
						<td>
							<input tabindex="text" maxlength="" value="" name="f_opt_desc" id="f_opt_desc" style="width: 200px;" dataformat="" onkeydown="entSearch();">
						</td>
						<td>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
	
	<div class="wrap_result">
   		<h3 class="title_design"><bean:message key="System_Option_List" /></h3>
   		<div class="opus_design_grid">
   			<script type="text/javascript">comSheetObject('sheet1');</script>
   		</div>
   		<div class="opus_design_grid" style="width:560px;">
   		<h3 class="title_design"><bean:message key="Server_Configuration_List" /></h3>
			<div class="opus_design_btn" > 
				<button type="button" class="btn_normal"  <%= null != roleBtnVO? "style='display:none;' btnAuth='" + roleBtnVO.getAttr3() + "'"  : "" %> id="btnSysOfcCdSave" onclick="doWork('SEQ_SAVE')"><bean:message key="Save"/></button>
			</div>   		
   			<script type="text/javascript">comSheetObject('sheet2');</script>
   		</div>
    
	<!-- 52308 [COMMON] System Option Settings 에서 TB_SEQ 의 SYS_OFC_CD update 추가 -->
		<div class="opus_design_inquiry" style="display:none">	
			<table style="width:230px;">
				<tr>
					<th width="100px"><bean:message key="System_Office"/></th>
					<!-- td>&nbsp;&nbsp;&nbsp;<input type="text" required name="f_sys_ofc_cd_pre_fix" id="f_sys_ofc_cd_pre_fix" maxlength="5"  value="<bean:write name="mapVal" property="sys_ofc_cd_pre_fix"/>"  style="width:55px;text-transform:uppercase;" onblur="strToUpper(this)"></td-->
					<td>&nbsp;&nbsp;&nbsp;
					<!-- input type="text" required name="f_sys_ofc_cd_pre_fix" id="f_sys_ofc_cd_pre_fix" maxlength="5"  value="<bean:write name="mapVal" property="sys_ofc_cd_pre_fix"/>"  style="width:55px;text-transform:uppercase;" onblur="strToUpper(this)"-->
					
					<bean:define id="chg_ofc_cd_pre_fix" name="valMap" property="sys_ofc_cd_pre_fix"/>
					<!--  
	                                --><!-- input  type="text" name="s_ofc_cd" value="<bean:write name="mapVal" property="ofc_cd"/>"/-->
	                <!-- input  type="text" id="s_ofc_cd" name="s_ofc_cd" value="<%= userInfo.getOfc_cd()  %> " /-->
	                                <!--  #4  [CLT] System Office - Combobox로 변경
	                                --><select id="f_sys_ofc_cd_pre_fix" name="f_sys_ofc_cd_pre_fix" style= "width:108px;">
                                       		<bean:size id="len" name="oficeList" />
                                       	 	
                                   			<logic:iterate id="ofcVO" name="oficeList">
		                                     	<logic:equal name="ofcVO" property="ofc_cd" value='<%= (String) chg_ofc_cd_pre_fix %>' >
		                                        <option selected="selected"  value='<bean:write name="ofcVO" property="ofc_cd"/>'><bean:write name="ofcVO" property="ofc_cd"/></option>
		                                     	</logic:equal>
		                                     	<logic:notEqual name="ofcVO" property="ofc_cd" value='<%= (String) chg_ofc_cd_pre_fix %>' >
		                                        <option value='<bean:write name="ofcVO" property="ofc_cd"/>'><bean:write name="ofcVO" property="ofc_cd"/></option>
		                                     	</logic:notEqual>
		                                     </logic:iterate>
                                       </select>
					</td>
					<td style="padding-top: 5px"><button type="button" class="btn_normal"  <%= null != roleBtnVO? "style='display:none;' btnAuth='" + roleBtnVO.getAttr3() + "'"  : "" %> id="btnSysOfcCdSave" onclick="doWork('SYSOFCCD_SAVE')"><bean:message key="Save"/></button></td>
				</tr>
				<tr>
					<th width="100px"><bean:message key="Location_Type"/></th>
					<!-- td>&nbsp;&nbsp;&nbsp;<input type="text" required name="f_sys_ofc_cd_pre_fix" id="f_sys_ofc_cd_pre_fix" maxlength="5"  value="<bean:write name="mapVal" property="sys_ofc_cd_pre_fix"/>"  style="width:55px;text-transform:uppercase;" onblur="strToUpper(this)"></td-->
					<td>&nbsp;&nbsp;&nbsp;
					<!-- input type="text" required name="f_sys_ofc_cd_pre_fix" id="f_sys_ofc_cd_pre_fix" maxlength="5"  value="<bean:write name="mapVal" property="sys_ofc_cd_pre_fix"/>"  style="width:55px;text-transform:uppercase;" onblur="strToUpper(this)"-->
					
					<!-- bean:define id="oficeList" name="valMap" property="ofcList"/-->
					<!-- bean:define id="chg_ofc_cd_pre_fix" name="valMap" property="sys_ofc_cd_pre_fix"/-->
					<bean:define id="loc_cd" name="valMap" property="loc_cd"/>
					<!--  
	                --><!-- input  type="text" name="s_ofc_cd" value="<bean:write name="mapVal" property="ofc_cd"/>"/-->
	                <!-- input  type="text" id="s_ofc_cd" name="s_ofc_cd" value="<%= userInfo.getOfc_cd()  %> " /-->
	                <!--  #4  [CLT] System Office - Combobox로 변경
	                --><select id="f_loc_cd" name="f_loc_cd" style= "width:108px;">
	                <% if("US".equals((String) loc_cd)   ){ %>
                  	       	<option selected="selected"  value='US'>US</option>
                  	       	<option value='UN'>UN</option>
                  	<% } else if("UN".equals((String) loc_cd)   ) { %>       	                         	
		                  	<option selected="selected"  value='UN'>UN</option>
                  	       	<option value='US'>US</option>
                  	<% } else { %>       	                         	
		                  	<option selected="selected"  value='US'>US</option>
                  	       	<option value='UN'>UN</option>
                  	<% } %>       	
			           </select>
					</td>
					<td style="padding-top: 5px"><button type="button" class="btn_normal"  <%= null != roleBtnVO? "style='display:none;' btnAuth='" + roleBtnVO.getAttr3() + "'"  : "" %> id="btnLocCdSave" onclick="doWork('LOCCD_SAVE')"><bean:message key="Save"/></button></td>
				</tr>				
			</table>
		</div>
	</div>	
</div>		
			                       
		
		
</form>

<script type="text/javascript">
	var attr_extension = "<%= null!=roleBtnVO ?roleBtnVO.getAttr_extension():"" %>";
	doBtnAuthority(attr_extension);
	</script>
