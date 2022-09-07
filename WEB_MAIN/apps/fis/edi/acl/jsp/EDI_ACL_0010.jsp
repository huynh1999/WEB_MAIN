<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.util.HashMap"%>
    <%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
    <bean:define id="valMap"  name="EventResponse" property="mapVal"/>
    <link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css"/>
    <title><bean:message key="system.title"/></title>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CoFormControl.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CoBizCommon.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/CalculationUtil.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/apps/fis/edi/acl/script/EDI_ACL_0010.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/EDI_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
    <script type="text/javascript">
	    
        
	</script>
		
	<script type="text/javascript">
		var ofc_cd = "<%=userInfo.getOfc_cd()%>";
		
		function setupPage(){
			initFinish();
			loadPage();
		}
		
	</script>
</head>
<form name="frm1" method="POST" action="./EDI_ACL_0010.clt">
    <input type="hidden" name="f_cmd">
    
	<input type="hidden" name="user_id"  				value="<%=userInfo.getUsrid()%>" />
	<input type="hidden" name="pageurl" id="pageurl" 	value="EDI_ACL_0010.clt"/>
	<input type="hidden" name="msg_no" id="msg_no" 		value=""/>

	
	<div class="page_title_area clear">
	   <h2 class="page_title"><button type="button"><%=LEV3_NM%></button></h2>
	   <!-- btn_div -->
	   <div class="opus_design_btn TOP">
	   	   <%-- 
		   <button style="cursor:hand; display:none;" type="button" btnAuth="<%= roleBtnVO.getAttr1() %>" class="btn_accent" onclick="doWork('SEARCHLIST')"><bean:message key="Search"/></button>
		   <button style="cursor:hand; display:none;" id="btnSave" name="btnSave" type="button" btnAuth="<%= roleBtnVO.getAttr3() %>" class="btn_normal" onclick="doWork('SAVE')"><bean:message key="Save"/></button>
		   <button style="cursor:hand; display:none;" id="btnValidate" name="btnValidate" type="button" btnAuth="<%= roleBtnVO.getAttr3() %>" class="btn_normal" onclick="doWork('VALIDATE')"><bean:message key="Validate"/></button>
		   <button style="cursor:hand; display:none;" id="btnSend" name="btnSend" type="button" btnAuth="<%= roleBtnVO.getAttr3() %>" class="btn_normal" onclick="doWork('SEND_EDI')"><bean:message key="Send_EDI"/></button>
		   <button type="button" class="btn_normal" id="btn_cancel_edi" name="btn_cancel_edi" onclick="doWork('SEND_CANCEL_EDI')"><bean:message key="VGM"/> <bean:message key="Cancel_EDI"/></button>
		   <!-- button style="cursor:hand; display:none;" type="button" btnAuth="<%= roleBtnVO.getAttr4() %>" class="btn_normal" onClick="doWork('DELETE')"><bean:message key="Delete"/></button-->
		   <!-- button style="cursor:hand; display:none;" type="button" btnAuth="RECEIVE" class="btn_normal" onClick="doWork('RECEIVE')">Receive</button-->
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
					<col width="110">
					<col width="150">
					<col width="100">
					<col width="180">
					<col width="120">
					<col width="210">
	  				<col width="80">
					<col width="*">
				</colgroup>
				<tbody>
	               <tr>
	                 <th><bean:message key="Bkg_No"/></th>
	                 <td><input type="text" name="f_bkg_no" maxlength="40" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:140px;"  onkeydown="entSearch();" /></td>
	                 <th><bean:message key="Naccs_Reg_Date"/></th>
	                 <td>
	                	<input style="width:75px;" type="text" name="f_rgst_strdt" onKeyUp="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};" onBlur="chkCmprPrd(firCalFlag, false, this, this, frm1.f_rgst_enddt);firCalFlag=false;" size='11' maxlength="10" class="search_form">
	                 	<span class="dash">~</span>
	                 	<input style="width:75px;" type="text" name="f_rgst_enddt" onKeyUp="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};" onBlur="chkCmprPrd(firCalFlag, false, this, frm1.f_rgst_strdt, this);firCalFlag=false;" size='11' maxlength="10" class="search_form">
	                 	<button type="button" class="calendar ir" name="btn_calendar" id="f_rgst_dt_cal" onclick="doDisplay('DATE1', frm1);"></button></td>
					 </td>
					<th><bean:message key="Shipper"/></th>
	                <td><input type="text"   name="f_shpr_nm" value='' onblur="strToUpper(this)" style="width:195px;text-transform:uppercase;" onkeydown="entSearch();" ></td>
	                <th><bean:message key="Consignee"/></th>
	                <td><input type="text"   name="f_cnee_nm" value='' onblur="strToUpper(this)" style="width:203px;text-transform:uppercase;"  onkeydown="entSearch();"></td>
	               </tr>
	               
	               <tr>
	                 <th><bean:message key="HBL_No"/></th>
	                 <td><input type="text" name="f_hbl_no" maxlength="40" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:140px;"  onkeydown="entSearch();" /></td>
	                      
	                 <th><bean:message key="Container_No"/></th>
	                 <td><input type="text" name="f_cntr_no" maxlength="40" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:194px;"  onkeydown="entSearch();" /></td>
					
	                 <th><bean:message key="POL"/></th>
	                 <td><!--
                      --><input type="text"   name="f_pol_cd" id="f_pol_cd" maxlength="5"    value='' class="search_form" onKeyDown="codeNameAction_OEH('location_pol',this, 'onKeyDown')" onBlur="codeNameAction_OEH('location_pol',this, 'onBlur');" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:54px;"/><!--
                      --><button type="button" class="input_seach_btn" tabindex="-1" onclick="doWork('POL_LOCATION_POPLIST')"></button><!--
                      --><input type="text"   name="f_pol_nm"  maxlength="50"  class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:108px;" onKeyPress="if(event.keyCode==13){doWork('POL_LOCATION_POPLIST', frm1.f_pol_nm.value);}"/>
                      </td>
	                      
	                 <th><bean:message key="POD"/></th>
	                 <td><!--
                      --><input type="text"   name="f_pod_cd" id="f_pod_cd" maxlength="5"    value='' class="search_form" onKeyDown="codeNameAction_OEH('location_pod',this, 'onKeyDown')" onBlur="codeNameAction_OEH('location_pod',this, 'onBlur');" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:55px;"/><!--
                      --><button type="button" class="input_seach_btn" tabindex="-1" onclick="doWork('POD_LOCATION_POPLIST')"></button><!--
                      --><input type="text"   name="f_pod_nm"  maxlength="50"  class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:115px;" onKeyPress="if(event.keyCode==13){doWork('POD_LOCATION_POPLIST', frm1.f_pol_nm.value);}"/>
                      </td>
	              </tr>
	              <tr>
	               	 <th><bean:message key="MBL_No"/></th>
	                 <td><input type="text" name="f_mbl_no" maxlength="40" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:140px;"  onkeydown="entSearch();"/></td>
	                 <th><bean:message key="Carrier"/></th>
	                 <td><input type="text" name="f_crr_nm" maxlength="40" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:194px;"  onkeydown="entSearch();"/></td>
	                 <th><bean:message key="Vessel_Voyage"/></th>
	                 <td><!--
                         --><input type="hidden" name="f_trnk_vsl_cd" value='' class="search_form" onKeyDown="codeNameAction('srVessel',this, 'onKeyDown')" onblur="codeNameAction('srVessel',this, 'onBlur');javascript:this.value=this.value.toUpperCase();" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:40px;" ><!--
                         --><input type="text" name="f_trnk_vsl_nm" value='' class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:167px;text-transform:uppercase;" maxlength="50" onblur="strToUpper(this)" onKeyPress="if(event.keyCode==13){vslPopup(frm1.f_trnk_vsl_nm.value.toUpperCase());}" ><!-- 
                         --><button type="button" name="trunkvessel" id="trunkvessel" class="input_seach_btn" tabindex="-1" onClick="vslPopup('')"></button><!-- 
                         --><input type="text" name="f_trnk_voy_no" value='' class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:60px;text-transform:uppercase;" maxlength="10" onblur="strToUpper(this)" />
					</td>
	                 <th><bean:message key="Export_Ctrl_No"/></th>
	                 <td><!--
	                 --><input type="text" name="f_exp_ctrl_no" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:203px;"onblur="strToUpper(this)"  onkeydown="entSearch();" /></td>
					</tr>
					
				</tbody>
			</table>
		</div>
	</div>
	
	<div class="wrap_result">
		
		<div class="layout_wrap">
			<!-- opus_design_grid(S) -->
			<div class="opus_design_grid"  id="mainTable">
				<h3 class="title_design"><bean:message key="Acl_EDI_List"/></h3>
				<!-- opus_design_btn(S) -->
				<div class="opus_design_btn"><!-- 
					 --><button style="display: inline; margin-left: 5px; cursor: hand" id="fileUpObj" btnAuth="fileUpObj" name="fileUpObj"  type="button" class="btn_normal" onClick="doWork('DOCFILE')"><bean:message key="Upload"/></button>
				</div>
			    <script type="text/javascript">comSheetObject('sheet1');</script>
			</div>
			<!-- opus_design_grid(E) -->
    	</div>
		
		
		
		
		
		
		<div class="layout_wrap">
		    <div class="layout_flex_fixed" style="width:850px;float:left!important" >
				<h3 class="title_design"> <bean:message key="Container_List"/></h3>
		        <div class="opus_design_grid">
						<script type="text/javascript">comSheetObject('sheet2');</script>
				</div>
			</div>
			<div class="layout_flex_fixed" style="width:360px;float:left!important" >
		    	<div id="disp_val_msg" style="width:350px;float:right!important;">
					<div class="layout_flex_fixed" style="width:340px;float:right!important">
				   		<h3 class="title_design"><bean:message key="Marks_and_Numbers"/></h3>
					</div>
					<table>
			 			<tr>
			 				<td>
			 					<textarea name="mk_no" cols="200" rows="14"  readOnly style = "background-color:#f4f6f6;ime-mode:disabled; text-transform:none; font-family:TAHOMA; overflow:auto; resize:none; white-space: pre-wrap;"></textarea>
			 				</td>
			 			</tr>
			 		</table>
				</div>
		    </div>
		    
		   <div style="padding-left: 360px;">
		    	<div id="disp_val_msg" style="width:350px;float:right!important;">
					<div class="layout_flex_fixed" style="width:340px;float:right!important">
				   		<h3 class="title_design"><bean:message key="Goods_Description"/></h3>
					</div>
					<table>
			 			<tr>
			 				<td>
			 					<textarea name="gds_desc" cols="200" rows="14"  readOnly style = "background-color:#f4f6f6;ime-mode:disabled; text-transform:none; font-family:TAHOMA; overflow:auto; resize:none; white-space: pre-wrap;"></textarea>
			 				</td>
			 			</tr>
			 		</table>
				</div>
		    </div>
		</div>
	</div>                  
</div>
</form>
  
<script type="text/javascript">
doBtnAuthority("<%= roleBtnVO.getAttr_extension() %>");
</script>

