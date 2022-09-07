<%
/*=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : AIC_BMD_0010.jsp
*@FileTitle  : Carrier Schedule 등록 및 수정
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
	<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css">
    <script type="text/javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js?ver=<%=CLT_JS_VER%>"></script>
    <script type="text/javascript" src="<%=CLT_PATH%>/js/common/ModalCalendar.js?ver=<%=CLT_JS_VER%>"></script>
    <script type="text/javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
    <script type="text/javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
    <script type="text/javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/SUP_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
    <script type="text/javascript" src="<%=CLT_PATH%>/apps/fis/aic/bmd/linerinfo/script/AIC_BMD_0010.js?ver=<%=CLT_JS_VER%>"></script>
    <script>
	 function setupPage(){
    	loadPage();
    	fncFormStart();
    	doWork('SEARCHLIST');
	 }
  </script>
	<form name="frm1"><!-- 
	 --><input type="hidden" id="f_cmd" name="f_cmd"><!--
	 --><input type="hidden" id="f_trf_ctrt_no" name="f_trf_ctrt_no"><!--
	 --><input type="hidden" id="f_CurPage" name="f_CurPage">	
	 
	   <!-- page_title_area(S) -->
		<div class="page_title_area clear">
			<!-- page_title(S) -->
			<h2 class="page_title"><button type="button"><%=LEV3_NM%></button></h2>
			<!-- page_title(E) -->
			
			<!-- btn_div -->
		   <div class="opus_design_btn TOP"> 
		   	 <%-- 
		     <button type="button" class="btn_accent" onclick="doWork('SEARCHLIST');" style="cursor:hand; display:none;" btnAuth="<%= roleBtnVO.getAttr1() %>"><bean:message key="Search"/></button>
		     <button type="button" class="btn_normal" id="btnNew" name="btnNew" onclick="doWork('NEW')"  style="cursor:hand; display:none;" btnAuth="<%= roleBtnVO.getAttr2() %>"><bean:message key="New"/></button>
		     <button type="button" class="btn_normal" id="btnModify" style="cursor:hand; display:none;" btnAuth="<%= roleBtnVO.getAttr3() %>" onclick="doWork('MODIFY')"><bean:message key="Save"/></button>
		     --%>
		   </div>
		   <!-- btn_div -->
    
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
    
    <!-- wrap search (S) -->
<div class="over_wrap" height="100%">
 	<div class="wrap_search">
	<!-- inquiry_area(S) -->	
	<div class="opus_design_inquiry entry_pannel ">
		<table>	
			<colgroup>
		        	<col width="70" />
		        	<col width="200" />
		        	<col width="90" />
		        	<col width="200" />
		        	<col width="60" />
		        	<col width="*" />
		   </colgroup>
		   <tbody>
					<tr>
	                         <th><bean:message key="Departure"/></th>
	                         <td><!-- 
	                              --><input type="text" name="f_dep_loc_cd" maxlength="5" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:60px;" onKeyDown="codeNameAction('location_pol',this, 'onKeyDown')" onBlur="strToUpper(this);codeNameAction('location_pol',this, 'onBlur')"><!-- 
	                             --><button id="img_dep_loc_cd"  type="button" class="input_seach_btn" tabindex="-1" onClick="doDisplay('POPUP_POR')"></button><!-- 
	                              --><input type="text" name="f_dep_loc_nm" class="search_form-disable" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:120px;" readonly>
	                         </td>
	                         <th><bean:message key="Destination"/></th>
	                         <td><!-- 
	                             --><input type="text" maxlength="5" name="f_dest_loc_cd" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:60px;" onKeyDown="codeNameAction('location_pod',this, 'onKeyDown')" onBlur="strToUpper(this);codeNameAction('location_pod',this, 'onBlur')"><!-- 
	                              --><button id="img_dest_loc_cd" type="button" class="input_seach_btn" tabindex="-1" onClick="doDisplay('POPUP_POD');"></button><!-- 
	                             --><input type="text" name="f_dest_loc_nm" class="search_form-disable" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:120px;" readonly>
	                         </td>
                             <th><bean:message key="Office"/></th>
							 <td>
								<div id="div_subcode">
							           	<logic:notEmpty name="EventResponse">
					             			<bean:define id="ofcMap"  name="EventResponse" property="mapVal"/>
					             			<bean:define id="oficeList" name="ofcMap" property="ofcList"/>
					             			<input	type="hidden" name="f_ofc_cd" value='<bean:write name="ofcMap" property="ofc_cd"/>'/> 
				                            <select name="ofc_cd" style="width:100px;"/>
				                            <bean:size id="len" name="oficeList" />
				                            <logic:greaterThan name="len" value="1">
				                            	<option value=''>ALL</option>
				                            </logic:greaterThan>
					                        <logic:iterate id="ofcVO" name="oficeList">
					                            <logic:equal name="ofcVO" property="ofc_cd" value="<%= userInfo.getOfc_cd()%>" >
					                            <option selected="selected"  value='<bean:write name="ofcVO" property="ofc_cd"/>'><bean:write name="ofcVO" property="ofc_cd"/></option>
					                         	</logic:equal>
					                         	<logic:notEqual name="ofcVO" property="ofc_cd" value="<%= userInfo.getOfc_cd()%>" >
					                            <option value='<bean:write name="ofcVO" property="ofc_cd"/>'><bean:write name="ofcVO" property="ofc_cd"/></option>
					                         	</logic:notEqual>
					                        </logic:iterate>
				                            </select>
					             		</logic:notEmpty>
							     </div>
							</td>
					</tr>
			</tbody>
		</table>
		
		<table>
			
			<colgroup>
		        	<col width="70" />
		        	<col width="200" />
		        	<col width="90" />
		        	<col width="*" />
		   </colgroup>
		   <tbody>
                <tr>
                    <th><bean:message key="Carrier"/></th>
                    <td><!-- 
                           --><input type="text" maxlength="20" name="f_trdp_cd" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:60px;" onKeyDown="codeNameAction('partner_text',this, 'onKeyDown')" onBlur="strToUpper(this);codeNameAction('partner_text',this, 'onBlur')"><!-- 
                           --><button id="img_trdp_cd" type="button" class="input_seach_btn" tabindex="-1" onClick="doDisplay('LINER_POPLIST')"></button><!-- 
                           --><input type="text" name="f_trdp_nm" class="search_form-disable" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:120px;" readonly>
                    </td>
                    <th><bean:message key="Period"/></th>
                    <td><!-- 
                         --><input name="f_prd_dt" type="text" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:60px;" size='6' maxlength="6" onkeyPress="onlyNumberCheck();" onKeyUp="onlyNumberCheck();" onblur ="isValidMMYYYY(this);" onClick="removeSeparator(this);" ><!-- 
						 --><button type="button" class="calendar ir" name="f_prd_dt_cal" id="f_prd_dt_cal" onclick="doDisplay2('DATE1', frm1);" ></button>
                    </td>
                </tr>
                </tbody>
            </table>
            
	</div>	
	
	<!-- inquiry_area(E) -->
	</div>
	<!-- wrap search (E) -->
    <!-- grid_area(S) -->
	<div class="wrap_result">
		<div class="opus_design_inquiry">
		<div class="opus_design_grid">
			<table>
				<colgroup>
			        	<col width="70" />
			        	<col width="*" />
			   </colgroup>
			   <tbody>
				<tr>
					<th><bean:message key="Period"/></th>
					<td><input type="text" name="i_prd_dt" id="i_prd_dt" class="search_form-disable" style="width:70px;" maxlength="7" readonly><!-- 
					 --><button id="i_prd_dt_cal" onclick="doDisplay2('DATE2', frm1);"  type="button" class="calendar ir"></button></td>
					<td>
						<div class="opus_design_btn"><!-- 
							--><button type="button" class="btn_accent"  onclick="doWork('EXCEL')" name="btn_DownExcel">Excel</button><!-- 
							--><button type="button" class="btn_normal"  onclick="doWork('ROWADD')">Add</button>
						</div></td>
				</tr>
				</tbody>
			</table>
			<script type="text/javascript">comSheetObject('sheet1');</script>
			<table border="0" width="1100">
				<tr>
					<td width="100">
						<bean:define id="tmpMapVal" name="EventResponse" property="mapVal"/>
						<bean:define id="pagingVal" name="tmpMapVal"     property="paging"/>
						<paging:options name="pagingVal" defaultval="200"/>
					</td>
					<td align="center" width="900">
						<table width="900">
							<tr>
								<td width="900" id="pagingTb" style='font-family: "Tahoma", "Arial", "Verdana";font-size: 11px;'>
								</td>
							</tr>
						</table>		
					</td>
					<td width="100"></td>
				</tr>
			</table>
		</div> 
		</div>
		</div>
	<!-- grid_area(E) -->	
</div>
</form>
<script type="text/javascript">
	doBtnAuthority("<%= roleBtnVO.getAttr_extension() %>");
</script>	

