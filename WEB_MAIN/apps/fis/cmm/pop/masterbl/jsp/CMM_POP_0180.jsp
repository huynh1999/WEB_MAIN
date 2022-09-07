<%--
=========================================================
*@FileName   : CMM_POP_0180.jsp
*@FileTitle  : CMM
*@Description: masterbl search pop
*@author     : 이광훈 - masterbl search pop
*@version    : 1.0 - 01/23/2009
*@since      : 01/23/2009

*@Change history:
=========================================================
--%>

<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="clt-paging"   prefix="paging" %>
	<%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
	<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css" />

	<script language="javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/PUP_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="./apps/fis/cmm/pop/masterbl/script/CMM_POP_0180.js?ver=<%=CLT_JS_VER%>"></script>
	
	<base target="_self"/>
	
	<script language="javascript">
		var ofc_cd = '<%=userInfo.getOfc_cd()%>';
		var uod_flg ="<%= userInfo.getUod_flg()%>"
	    var usrId = "<%= userInfo.getUsrid() %>";
		var usrNm = "<%= userInfo.getUser_name() %>";
		var usrDept = "<%=userInfo.getDept_cd()%>";
		function setupPage(){
			loadPage();
	       	initFinish();
	    }
	</script>
<form name="form" method="POST" action="./">
	<input	type="hidden" name="f_cmd"/>
	<input	type="hidden" name="air_sea_clss_cd"/>
	<input	type="hidden" name="bnd_clss_cd"/>
	<input	type="hidden" name="f_CurPage"/> 	
	<!--#342 [CLA] VOLUME & PROFIT REPORT IMPROVEMENTS - 2. addition [CHK)] multi-selection Duc.Nguyen 2017.09.21)  -->
	<input type="hidden" name="f_MultiSelect" />
	<div class="layer_popup_title">
		<!-- page_title_area -->
		<div class="page_title_area clear">
		   <h2 class="page_title">
				<span id = "hblHrdTx"  style="display:none"><bean:message key="MBL"/> <bean:message key="Search"/></span>
	            <span id = "hawbHrdTx" style="display:none"><bean:message key="MAWB"/> <bean:message key="Search"/></span>
		   </h2>
		   <!-- btn_div -->
		   <div class="opus_design_btn">
		   <!--#342 [CLA] VOLUME & PROFIT REPORT IMPROVEMENTS - 2. addition [CHK)] multi-selection Duc.Nguyen 2017.09.21)  -->
		   <button type="button" style="display:none" id="btnApply" class="btn_normal" onclick="doWork('APPLY')" ><bean:message key="Apply"/></button><!-- 
		    --><button type="button" class="btn_accent" onclick="doWork('SEARCHLIST')"><bean:message key="Search"/></button><!-- 
			--><button type="button" class="btn_normal" id="btnSave" onclick="doWork('CLOSE')"><bean:message key="Close"/></button>
		   </div>
		</div>
	</div>
	<div class="layer_popup_contents">
		<!-- wrap_search (S) -->
		<bean:define id="valMap"  name="EventResponse" property="mapVal"/>
		<bean:define id="oficeList" name="valMap" property="ofcList"/>	
		<div class="wrap_search">	
		   	<div class="opus_design_inquiry ">
				<table>
					<tr>
						<th width="60"><!-- 
						 --><span id = "mbl" style="display:none"><bean:message key="MBL_No"/></span><!-- 
						 --><span id = "mawb" style="display:none"><bean:message key="MAWB_No"/></span></th>
	                     <td width="130"><input type="text" maxlength="40" name="f_mbl_no" class="search_form" dataformat="excepthan" style="ime-mode isabled;text-transform:uppercase;width:130px;" onKeyPress="fncTpCodeSearch()"/></td>
	                     <th width="100"><bean:message key="Ref_No"/></th>
	                     <td width="120"><input type="text" name="f_ref_no" maxlength="20"  class="search_form" dataformat="excepthan" style="ime-mode isabled;text-transform:uppercase;width:130px;" onKeyPress="fncTpCodeSearch()"/></td>
						 <td>
							<div id = "div_etd" style="display:none"> 
						 	<table> 
						 		<tr> 
						 			<th width="80px"> 
						 				<span id = "hblTx"  style="display:none"><bean:message key="ETD"/></span> 
						 				<span id = "hawbTx" style="display:none"><bean:message key="Flight_Date"/></span> 
						 			</th> 
						 			<td class="table_search_body"> 
						 				<input type="text" name="etd_strdt" id="etd_strdt" class="search_form" dataformat="excepthan" style="width:80px;ime-mode:disabled" maxlength="10" onKeyUp="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};" onBlur="chkCmprPrd(firCalFlag, false, this, this, form.etd_enddt);firCalFlag=false;"><!-- 
						 			-->~&nbsp;<!-- 
						 			--><input type="text" name="etd_enddt" id="etd_enddt" class="search_form" dataformat="excepthan" style="width:80px;ime-mode:disabled" maxlength="10" onKeyUp="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};" onBlur="chkCmprPrd(firCalFlag, false, this, form.etd_strdt, this);firCalFlag=false;"><!-- 
						 			--><button id="etd_dt_cal" type="button" class="calendar" tabindex="-1" onclick="doDisplay('DATE11', form);"></button> 
						 			</td> 
						 		</tr> 
						 	</table> 
						 </div> 
						 <div id="div_eta" style="display:none"> 
						 	<table> 
						 		<tr> 
						 			<th width="60px"> 
						               <span id = "etaTx" style="display:none"><bean:message key="ETA"/></span> 
						               <span id = "arTx"  style="display:none"><bean:message key="Arrival_Date"/></span> 
						 			</th> 
						 			<td> 
						 				<input type="text" name="eta_strdt" id="eta_strdt" class="search_form" dataformat="excepthan" style="width:80px;ime-mode:disabled" maxlength="10" onKeyUp="mkDateFormatType(this, event, false, 1)" onBlur="mkDateFormatType(this, event, true, 1)"><!-- 
						 			-->~&nbsp;<!-- 
						 			--><input type="text" name="eta_enddt" id="eta_enddt" class="search_form" dataformat="excepthan" style="width:80px;ime-mode:disabled" maxlength="10" onKeyUp="mkDateFormatType(this, event, false, 1)" onBlur="mkDateFormatType(this, event, true, 1)"><!-- 
						 			--><button id="eta_dt_cal" type="button" class="calendar" tabindex="-1" onclick="doDisplay('DATE12', form);"></button> 
						 			</td> 
						 		</tr> 
						 	</table> 
						 </div> 
						 <div id="div_etd_eta" style="display:none"> 
						 	<table> 
						 		<tr> 
						 			<th width="60px"><span id = "etdEtaTx" style="display:none"><bean:message key="ETD_ETA"/></span></th> 
						 			<td class="table_search_body"> 
						 				<input type="text" name="etd_eta_strdt" id="etd_eta_strdt" class="search_form" dataformat="excepthan" style="width:80px;ime-mode:disabled" maxlength="10" onKeyUp="mkDateFormatType(this, event, false, 1)" onBlur="mkDateFormatType(this, event, true, 1)"><!-- 
						 			-->~&nbsp;<!-- 
						 			--><input type="text" name="etd_eta_enddt" id="etd_eta_enddt" class="search_form" dataformat="excepthan" style="width:80px;ime-mode:disabled" maxlength="10" onKeyUp="mkDateFormatType(this, event, false, 1)" onBlur="mkDateFormatType(this, event, true, 1)"><!-- 
						 			--><button id="eta_dt_cal" type="button" class="calendar" tabindex="-1" onclick="doDisplay('DATE12', form);"></button> 
						 			</td> 
						 		</tr> 
						 	</table> 
						 </div> 
						 </td>
					</tr>
					<tr>
	                    <th><bean:message key="Shipper"/></th>
	                    <td><input type="text" name="f_shpr_nm" maxlength="50" class="search_form" dataformat="excepthan" style="ime-mode isabled;text-transform:uppercase;width:130px;" onKeyPress="fncTpCodeSearch()"/></td>
	                    <!-- <th><bean:message key="Issued_By"/></th>
	                    <td><input type="text" name="f_pic_id" value='' class="search_form" dataformat="excepthan" style="ime-mode isabled;text-transform:uppercase;width:130px;"></td>  -->
	                    <td align="right"><!-- 
	                        --><div id="rptType_Filing01" style="display:none"><select name="f_isb_pic_sel_cd" id="f_isb_pic_sel_cd"  style="width:100px; font-weight: bold;" onChange="searchValueClear(this);"><!--
								    --><option value='OR'><bean:message key="Issued_By"/> Or <bean:message key="Sales_PIC"/></option><!--
								    --><option value='ISB'><bean:message key="Issued_By"/></option><!--
								    --><option value='PIC'><bean:message key="Sales_PIC"/></option><!--
								--></select>
								</div>
								<div id="rptType_Filing02" style="display:none"><label style="font-weight: bold;"><bean:message key="Consignee"/></label></div>
						</td>                                
						<td>
							<div id="rptType_Filing03" style="display:none;">
							    <input type="text" name="opr_usrid" style="width:100px;"><!-- 
								--><button type="button" name="oprBtn" id="oprBtn" class="input_seach_btn" tabindex="-1" onClick="doWork('OPR_POPLIST')"></button>
	                               <input type="hidden" name="proc_usrnm" class="search_form-disable" readOnly>
	                               <input type="hidden" name="opr_usrnm">
								<input type="hidden" name="opr_ofc_cd">
								<input type="hidden" name="opr_dept_cd">
								<input type="hidden" name="sls_tp_cd">
							</div>
							<div id="rptType_Filing04" style="display:none">
							     <input type="text" name="f_cnee_nm" id="f_cnee_nm" maxlength="50" class="search_form" dataformat="excepthan" style="ime-mode isabled;text-transform:uppercase;width:130px;" onKeyPress="fncTpCodeSearch()"/>
							</div>
			            </td>
	                    <td> 
						  <table> 
						  	<tr> 
						        <th width="80px"><bean:message key="Office"/></th> 
						  			<td class="table_search_body" > 
						  				<div id="div_subcode"> 
						  	             	<select required required name="f_ofc_cd" style="width:100px;"/> 
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
						             	</div> 
						  			</td> 
						  	</tr> 
						  </table> 
						  </td>			
					</tr>
					
					<tr>
						<th><bean:message key="Liner_Bkg_No"/></th>
                        	<td width="130" class="table_search_body">
                        		<input type="text" maxlength="30" name="f_lnr_bkg_no" class="search_form" dataformat="excepthan" style="ime-mode isabled;text-transform:uppercase;width:130px;" onKeyPress="fncTpCodeSearch()"/></td>
                    	<td colspan="4">
                    		<div id="rptType_Filing05" style="display:none"><img src="<%=CLT_PATH%>/web/img/main/blank.gif" /></div>
                    		<div id="rptType_Filing06" style="display:none">
                    			<select name="f_isb_pic_sel_cd" id="f_isb_pic_sel_cd"  style="width:100px; font-weight: bold;" onChange="searchValueClear(this);"><!--
								    --><option value='OR'><bean:message key="Issued_By"/> Or <bean:message key="Sales_PIC"/></option><!--
								    --><option value='ISB'><bean:message key="Issued_By"/></option><!--
								    --><option value='PIC'><bean:message key="Sales_PIC"/></option><!--
								--></select>
								<input type="text" name="opr_usrid" style="width:100px;margin-left: -3px;"><!-- 
								--><button type="button" name="oprBtn" id="oprBtn" class="input_seach_btn" tabindex="-1" onClick="doWork('OPR_POPLIST')"></button>
	                               <input type="hidden" name="proc_usrnm" class="search_form-disable" readOnly>
	                               <input type="hidden" name="opr_usrnm">
								<input type="hidden" name="opr_ofc_cd">
								<input type="hidden" name="opr_dept_cd">
								<input type="hidden" name="sls_tp_cd">
                    		</div>
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

