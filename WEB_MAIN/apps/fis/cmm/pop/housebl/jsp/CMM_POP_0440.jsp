<%
/*=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : CMM_POP_0440.jsp
*@FileTitle  : Plan No Pop 
*@author     : CLT
*@version    : 1.0
*@since      : 2017/03/20
=========================================================*/
%>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="clt-paging"   prefix="paging" %>
	<!-- 공통 Header -->
	<%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
	<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css"/>
	
	<!-- 일자 및 달력팝업 호출 -->
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/PUP_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="./apps/fis/cmm/pop/housebl/script/CMM_POP_0440.js?ver=<%=CLT_JS_VER%>"></script>
		
	<script type="text/javascript">
	
		function setupPage(){			
			loadPage(); 
			//initFinish();
		}	
		
	</script>

	<form name="form" method="POST" action="./">
		<input type="hidden" name="f_cmd">
	    <input type="hidden" name="f_CurPage"> 
	    
	    <!-- Combo Value -->
		<input type="hidden" name="f_carrier_bkg_no" />
		<input type="hidden" name="f_customer_bkg_no" />
					
		<div class="layer_popup_title">
			<!-- page_title_area -->
			<div class="page_title_area clear">
			   <h2 class="page_title">
					<bean:message key="Consolidation_List"/> <bean:message key="Search"/>
			   </h2>
			   <!-- btn_div -->
			   <div class="opus_design_btn">
				   <button type="button" class="btn_accent" onclick="doWork('SEARCHLIST')"><bean:message key="Search"/></button><!-- 
				--><button type="button" class="btn_normal" onclick="doWork('CLOSE')"><bean:message key="Close"/></button>
			   </div>
			</div>
		</div>		
		
		<div class="layer_popup_contents">
		<!-- wrap_search (S) -->
		<bean:define id="valMap"  name="EventResponse" property="mapVal"/>
		<div class="wrap_search">	
		   	<div class="opus_design_inquiry ">
				<table>
					<tr>
						<th width="60"><bean:message key="Plan_No"/></th>
	                     <td width="130"><input type="text" maxlength="40" name="f_plan_no" class="search_form" dataformat="excepthan" style="ime-mode isabled;text-transform:uppercase;width:130px;" onKeyPress="fncTpCodeSearch()"/></td>
	                     <th><bean:message key="POL"/></th>
                         	<td>
                             	<input type="text" name="pol_cd" maxlength="5" class="search_form" onKeyDown="codeNameAction('Location_pol',this, 'onKeyDown','S')" onBlur="strToUpper(this);codeNameAction('Location_pol_oeh',this, 'onBlur','S');cobChange();" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:50px;"><!--
								--><button type="button" name="pol" id="pol" class="input_seach_btn" tabindex="-1" onClick="doWork('POL_POPLIST',this);"></button><!--
								--><input type="text" name="pol_nm" maxlength="50" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:145px;text-transform:uppercase;" onblur="strToUpper(this);cobChange();" onKeyPress="if(event.keyCode==13){openPopUp('LOCATION_POPLIST', document.getElementById('pol'), frm1.f_pol_nm.value);}" onchange="cobChange();">
                         	</td>						 
					</tr>
					<tr>
						<th>
	                    <select name="f_cntr_no" onChange="searchValueClear(this);" style="width: 100px; font-weight: bold;"> 
					        <option value='CNTR_No'><bean:message key="Container_No"/></option>
							<option value='REF_No'><bean:message key="REF_No"/></option>
				    	</select> 
	                    </th>
	                    <td><input type="text" name="f_ref_no" maxlength="50" class="search_form" dataformat="excepthan" style="ime-mode isabled;text-transform:uppercase;width:130px;" onKeyPress="fncTpCodeSearch()"/></td>
	                    <th><bean:message key="POD"/></th>
                        	<td>
                        		<input type="text" name="pod_cd" maxlength="5" class="search_form" onKeyDown="codeNameAction('Location_pod',this, 'onKeyDown','S')" onBlur="strToUpper(this);codeNameAction('Location_pod',this, 'onBlur','S')" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:50px;"><!--
								--><button type="button" name="pod" id="pod" class="input_seach_btn" tabindex="-1" onClick="doWork('POD_POPLIST',this);"></button><!--
								--><input type="text" name="pod_nm" maxlength="50" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:145px;" onchange="cobChange();" onblur="strToUpper(this);cobChange();" onKeyPress="if(event.keyCode==13){openPopUp('LOCATION_POPLIST', document.getElementById('pod'), frm1.pod_nm.value);}">
							</td> 	                    		
					</tr>					
				</table>
			</div>
		</div>
		<!-- wrap_result (S) -->
	    <div class="wrap_result">
			<div class="opus_design_inquiry">
				<div class="opus_design_grid">
				<script language="javascript">comSheetObject('sheet1');</script>
				</div>
				<table>
		           <tr>
		             <td width="55px"> 
		              <bean:define id="tmpMapVal" name="EventResponse" property="mapVal"/> 
		              <bean:define id="pagingVal" name="tmpMapVal"     property="paging"/> 
		              <paging:options name="pagingVal" defaultval="200"/> 
		              </td>								
					<td align="center"> 
					 <table> 
					 	<tr> 
					 		<td id="pagingTb" style='font-family: "Tahoma", "Arial", "Verdana";font-size: 11px;'></td> 
					 	</tr> 
					 </table></td>
					<td width="55"></td>
					</tr>
				</table>
				</div>
		</div>
		<!-- wrap_result (E) -->
	</div>	
		
    </form>


