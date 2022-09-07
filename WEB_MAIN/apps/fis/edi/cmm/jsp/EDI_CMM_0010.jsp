<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.util.HashMap"%>
    <%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
    
    <title><bean:message key="system.title"/></title>
    <link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css"/>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/CalculationUtil.js?ver=<%=CLT_JS_VER%>"></script>

	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/EDI_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/COM_FRT_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/apps/fis/see/bmd/housebl/script/BL_CODE_UTIL.js?ver=<%=CLT_JS_VER%>"></script>
    <script type="text/javascript" src="<%=CLT_PATH%>/apps/fis/edi/cmm/script/EDI_CMM_0010.js?ver=<%=CLT_JS_VER%>"></script>

	<bean:define id="hblVO"   name="EventResponse" property="objVal"/>
	<bean:define id="valMap"  name="EventResponse" property="mapVal"/>
    <script type="text/javascript">
		var ofc_cd = "<%=userInfo.getOfc_cd()%>";
		
		<!-- Liner Code -->
		var LNRCD = '';
		 <% boolean isBegin = false; %>
        <logic:notEmpty name="valMap" property="LINER_LIST">
            <bean:define id="lnrcdList" name="valMap" property="LINER_LIST"/>
            <logic:iterate id="codeVO" name="lnrcdList">
                <% if(isBegin){ %>
                	LNRCD+= '|';
                <% }else{
                      isBegin = true;
                   } %>
                   LNRCD+= '<bean:write name="codeVO" property="cd_val"/>';
            </logic:iterate>
        </logic:notEmpty>
        
		function setupPage(){
			loadPage();
		}
		
	</script>
</head>
<%
	String f_lnr_trdp_nm = request.getParameter("f_lnr_trdp_nm");
	String f_trnk_vsl_nm = request.getParameter("f_trnk_vsl_nm");
	String f_trnk_voy    = request.getParameter("f_trnk_voy");
	
	if(f_lnr_trdp_nm == null){
		f_lnr_trdp_nm = "";
	}
	
	if(f_trnk_vsl_nm == null){
		f_trnk_vsl_nm = "";
	}
	
	if(f_trnk_voy == null){
		f_trnk_voy = "";
	}

	
%>
<form name="frm1" method="POST" action="./EDI_CMM_0010.clt">
	<input type="hidden" name="f_cmd">
	<input type="hidden" name="intg_bl_seq">
	<input type="hidden" name="msg_no"  value="<bean:write name="hblVO" property="msg_no"/>">
	<input type="hidden" name="msg_no_seq"  value="<bean:write name="hblVO" property="msg_no_seq"/>">
	<input type="hidden" name="si_sts" value="<bean:write name="hblVO" property="si_sts"/>">
	<input type="hidden" name="bl_frt_tp"  value="<bean:write name="hblVO" property="bl_frt_tp"/>">
	<input type="hidden" name="si_bl_tp"  value="<bean:write name="hblVO" property="si_bl_tp"/>">
	<input type="hidden" name="user_id"  value="<%=userInfo.getUsrid()%>" />
	<input type="hidden" name="pageurl" id="pageurl" value="EDI_CMM_0010.clt"/>
	<input type="hidden" name="si_cmdt_check" value ="">
	<input type="hidden" name="hbl_cnt"  value="<bean:write name="hblVO" property="hbl_cnt"/>">

	<div class="page_title_area clear">
		<h2 class="page_title"><button type="button"><%=LEV3_NM%></button></h2>
		<!-- btn_div -->
		<div class="opus_design_btn TOP">
			<!-- <button type="button" class="btn_accent" onClick="doWork('SEARCHLIST')" ><bean:message key="Search"/></button>
   			<button type="button" class="btn_accent" onclick="doWork('MODIFY')" ><bean:message key="Save"/></button>
			<button type="button" class="btn_accent" onclick="doWork('SEND_EDI')" ><bean:message key="Send_EDI"/></button> -->
		</div>
		<!-- btn_div -->
		<div class="location">
			<span><%=LEV1_NM%></span> &gt;
			<span><%=LEV2_NM%></span> &gt;
			<span><%=LEV3_NM%></span>
			<a href="" class="ir">URL Copy</a>
		</div>
	</div>
<div class="over_wrap" style="height:100%">
	<div class="wrap_search">
		<div class="opus_design_inquiry entry_pannel">
			<table>
				<colgroup>
					<col width="100">
					<col width="300">
					<col width="100">
					<col width="*">
				</colgroup>
				<tbody>
					<tr>
						<th><bean:message key="Liner"/></th>
						<td>
							<input type="text" id="f_lnr_trdp_nm" name="f_lnr_trdp_nm" maxlength="50" value="<%=f_lnr_trdp_nm%>" readonly="readonly" onblur="strToUpper(this);" class="search_form-disable" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:300px;">
						</td>
						<th><bean:message key="Vessel_Voyage"/></th>
						<td>
							<input type="text"   id="f_trnk_vsl_nm"  name="f_trnk_vsl_nm" value="<%=f_trnk_vsl_nm%>" readonly="readonly" class="search_form-disable" dataformat="excepthan" style="ime-mode:disabled;width:300px;text-transform:uppercase;" maxlength="50" onblur="strToUpper(this)">
							<input type="text"   id="f_trnk_voy" name="f_trnk_voy"    value="<%=f_trnk_voy%>"  readonly="readonly" class="search_form-disable" dataformat="excepthan" style="ime-mode:disabled;width:113px;text-transform:uppercase;" maxlength="8" onblur="strToUpper(this)">
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
	
	<div class="wrap_result">
	<!-- layout_wrap(S) -->
		<div class="layout_wrap">
		    <div class="layout_flex_fixed" style="width:680px;float:left!important">
		    	<h3 class="title_design"><bean:message key="MBL_List"/></h3>
		        <!-- opus_design_grid(S) -->
		        <div class="opus_design_grid">
		            <script type="text/javascript">comSheetObject('sheet1');</script>
		        </div>
			</div>
			<div style="padding-left: 688px;">
			<!-- inquiry_area(S) -->	
   				<table>
   					<tr>
   						<td><h3 class="title_design"><bean:message key="Basic_Information"/></h3></td>
   					</tr>
   				</table>

				<div class="layout_vertical_2" style="width:47%;">
					<div class="opus_design_inquiry sm" style="height:680px;">		
				    	<h3 class="title_design" style="margin-bottom:0"><bean:message key="Customer"/></h3>
				    	<table style="margin-bottom:15px;"> 
							<colgroup>
				    			<col width="15%" />
				    			<col width="*" />
				    		</colgroup>
							<tbody>
								<tr>
									<th><bean:message key="Shipper"/></a></th>
									<td colspan="2">
										<input type="text" name="shpr_trdp_nm" value='<bean:write name="hblVO" property="shpr_trdp_nm"/>'  id="shpr_trdp_nm_id" readonly="readonly" style="width:calc(100% - 5px);"><!-- 
										--><input type="hidden" name="shpr_trdp_cd" value='<bean:write name="hblVO" property="shpr_trdp_cd"/>'  class="search_form" onKeyDown="codeNameAction('trdpCode_shipper',this, 'onKeyDown')" onBlur="codeNameAction('trdpCode_shipper',this, 'onBlur');javascript:this.value=this.value.toUpperCase();" dataformat="excepthan" style="ime-mode:disabled;resize:none;width:48;">
									</td>
								</tr>
								<tr>
									<td colspan="3">
										<textarea name="shpr_trdp_addr" class="search_form autoenter_50px" dataformat="excepthan" style="width:calc(100% - 5px);height:60px;" onblur="strToUpper(this);chkCmpAddr(this, 'Shipper Address')" WRAP="off">
<bean:write name="hblVO" property="shpr_trdp_addr" filter="false"/></textarea>
										</td>
									</tr>
									<tr>	
										<th><bean:message key="PIC"/></th>
										<td colspan="2"><input type="text" name="shpr_pic_nm" style="width:calc(100% - 5px);" value='<bean:write name="hblVO" property="shpr_pic_nm"/>'  id="shpr_pic_nm"  class="search_form" </td>
								</tr>
								<tr>
									<th><bean:message key="Phone_FAX"/></th>
									<td><input type="text" name="shpr_pic_phn" style="width:calc(100% - 5px);" value='<bean:write name="hblVO" property="shpr_pic_phn"/>'  id="shpr_pic_phn"  class="search_form" </td>
									<td><input type="text" name="shpr_pic_fax" style="width:calc(100% - 5px);" value='<bean:write name="hblVO" property="shpr_pic_fax"/>'  id="shpr_pic_fax"  class="search_form" </td>
								</tr>
								<tr>
									<th><bean:message key="Email"/></th>
									<td colspan="2"><input type="text" name="shpr_pic_eml" style="width:calc(100% - 5px);"" value='<bean:write name="hblVO" property="shpr_pic_eml"/>'  id="shpr_pic_eml"  class="search_form" </td>
								</tr>   
							</tbody>
						</table>
				    	
				    	<table style="margin-bottom:15px;"> 
							<colgroup>
				    			<col width="15%" />
				    			<col width="*" />
				    		</colgroup>
							<tbody>
								<tr>
									<th><bean:message key="Consignee"/></a></th>
									<td colspan="2">
										<input type="text" name="cnee_trdp_nm" value='<bean:write name="hblVO" property="cnee_trdp_nm"/>'  id="cnee_trdp_nm_id"  readonly="readonly" style="width:calc(100% - 5px);"><!--
										--><input type="hidden" name="cnee_trdp_cd" value='<bean:write name="hblVO" property="cnee_trdp_cd"/>'  class="search_form" onKeyDown="codeNameAction('trdpCode_shipper',this, 'onKeyDown')" onBlur="codeNameAction('trdpCode_shipper',this, 'onBlur');javascript:this.value=this.value.toUpperCase();" dataformat="excepthan" style="ime-mode:disabled;resize:none;width:48;">
									</td>
								</tr>
								<tr>
									<td colspan="3">
										<textarea name="cnee_trdp_addr" class="search_form autoenter_50px" dataformat="excepthan" style="width:calc(100% - 5px);height:60px;" onblur="strToUpper(this);chkCmpAddr(this, 'Shipper Address')" WRAP="off">
<bean:write name="hblVO" property="cnee_trdp_addr" filter="false"/></textarea>
										</td>
									</tr>
									<tr>	
										<th><bean:message key="PIC"/></th>
										<td colspan="2"><input type="text" name="cnee_pic_nm" style="width:calc(100% - 5px);" value='<bean:write name="hblVO" property="cnee_pic_nm"/>'  id="cnee_pic_nm"  class="search_form" </td>
								</tr>
								<tr>
									<th><bean:message key="Phone_FAX"/></th>
									<td><input type="text" name="cnee_pic_phn" style="width:calc(100% - 5px);" value='<bean:write name="hblVO" property="cnee_pic_phn"/>'  id="cnee_pic_phn"  class="search_form" </td>
									<td><input type="text" name="cnee_pic_fax" style="width:calc(100% - 5px);" value='<bean:write name="hblVO" property="cnee_pic_fax"/>'  id="cnee_pic_fax"  class="search_form" </td>
								</tr>
								<tr>
									<th><bean:message key="Email"/></th>
									<td colspan="2"><input type="text" name="cnee_pic_eml" style="width:calc(100% - 5px);"" value='<bean:write name="hblVO" property="cnee_pic_eml"/>'  id="cnee_pic_eml"  class="search_form" </td>
								</tr>   
							</tbody>
						</table>
						
				    	<table style="margin-bottom:15px;"> 
							<colgroup>
				    			<col width="15%" />
				    			<col width="*" />
				    		</colgroup>
							<tbody>
								<tr>
									<th><bean:message key="Notify"/></a></th>
									<td colspan="2">
										<input type="text" name="ntfy_trdp_nm" value='<bean:write name="hblVO" property="ntfy_trdp_nm"/>'  id="ntfy_trdp_nm_id"  readonly="readonly" style="width:calc(100% - 5px);"><!--
										--><input type="hidden" name="ntfy_trdp_cd" value='<bean:write name="hblVO" property="ntfy_trdp_cd"/>'  class="search_form" onKeyDown="codeNameAction('trdpCode_shipper',this, 'onKeyDown')" onBlur="codeNameAction('trdpCode_shipper',this, 'onBlur');javascript:this.value=this.value.toUpperCase();" dataformat="excepthan" style="ime-mode:disabled;resize:none;width:48;">
									</td>
								</tr>
								<tr>
									<td colspan="3">
										<textarea name="ntfy_trdp_addr" class="search_form autoenter_50px" dataformat="excepthan" style="width:calc(100% - 5px);height:60px;" onblur="strToUpper(this);chkCmpAddr(this, 'Shipper Address')" WRAP="off">
<bean:write name="hblVO" property="ntfy_trdp_addr" filter="false"/></textarea>
										</td>
									</tr>
									<tr>	
										<th><bean:message key="PIC"/></th>
										<td colspan="2"><input type="text" name="ntfy_pic_nm" style="width:calc(100% - 5px);" value='<bean:write name="hblVO" property="ntfy_pic_nm"/>'  id="ntfy_pic_nm"  class="search_form" </td>
								</tr>
								<tr>
									<th><bean:message key="Phone_FAX"/></th>
									<td><input type="text" name="ntfy_pic_phn" style="width:calc(100% - 5px);" value='<bean:write name="hblVO" property="ntfy_pic_phn"/>'  id="ntfy_pic_phn"  class="search_form" </td>
									<td><input type="text" name="ntfy_pic_fax" style="width:calc(100% - 5px);" value='<bean:write name="hblVO" property="ntfy_pic_fax"/>'  id="ntfy_pic_fax"  class="search_form" </td>
								</tr>
								<tr>
									<th><bean:message key="Email"/></th>
									<td colspan="2"><input type="text" name="ntfy_pic_eml" style="width:calc(100% - 5px);"" value='<bean:write name="hblVO" property="ntfy_pic_eml"/>'  id="ntfy_pic_eml"  class="search_form" </td>
								</tr>   
							</tbody>
						</table>
					</div>
				</div>
				<div class="layout_vertical_2" style="padding-left:8px; width:53%;">
					<div class="opus_design_inquiry sm" style="height:680px;">
						<h3 class="title_design" style="margin-bottom:0"><bean:message key="Route"/></h3>
						<table style="margin-bottom:8px;"> 
							<colgroup>
								<col width="15%" />
								<col width="*" />
				    		</colgroup>
							<tbody>
								<tr>
									<th><bean:message key="POR"/></th>	
									<td>
										<input type="text" id="por_cd" name="por_cd"  maxlength="5" value='<bean:write name="hblVO" property="por_cd"/>' style="width:15%;" class="search_form" readonly="readonly">
										<input type="text" id="por_nm" name="por_nm"value='<bean:write name="hblVO" property="por_nm"/>' class="search_form" style="width:50%;" readonly="readonly">
										<input type="text" id="un_por_cd" name="un_por_cd" value='<bean:write name="hblVO" property="un_por_cd"/>' class="search_form" dataformat="excepthan"  onBlur="javascript:this.value=this.value.toUpperCase();"  style="width:20%; text-transform:uppercase;" maxlength="5">
										<button type="button" name="shipper" id="shipper" class="input_seach_btn" tabindex="-1" onClick="doWork('SET_UNLOC_CODE','POR')"></button>
									</td>
								</tr>
								<tr>
									<th><bean:message key="POL"/></th>
									<td>
										<input type="text" id="pol_cd" name="pol_cd" maxlength="5" value='<bean:write name="hblVO" property="pol_cd"/>' style="width:15%; class="search_form" dataformat="excepthan"  readonly="readonly">
										<input type="text" id="pol_nm" name="pol_nm" value='<bean:write name="hblVO" property="pol_nm"/>' class="search_form" style="width:50%;" dataformat="excepthan"  readonly="readonly">
										<input type="text" id="un_pol_cd" name="un_pol_cd" value='<bean:write name="hblVO" property="un_pol_cd"/>' class="search_form" dataformat="excepthan"  onBlur="javascript:this.value=this.value.toUpperCase();"  style="width:20%; text-transform:uppercase;" maxlength="5">
										<button type="button" name="shipper" id="shipper" class="input_seach_btn" tabindex="-1" onClick="doWork('SET_UNLOC_CODE','POL')"></button>
									</td>
								</tr>
								<tr>
									<th><bean:message key="POD"/></th>
									<td>
										<input type="text" id="pod_cd" name="pod_cd" maxlength="5" value='<bean:write name="hblVO" property="pod_cd"/>' style="width:15%; class="search_form" dataformat="excepthan"  readonly="readonly">
										<input type="text" id="pod_nm" name="pod_nm" value='<bean:write name="hblVO" property="pod_nm"/>' class="search_form" style="width:50%;" dataformat="excepthan"  readonly="readonly">
										<input type="text" id="un_pod_cd" name="un_pod_cd" value='<bean:write name="hblVO" property="un_pod_cd"/>' class="search_form" dataformat="excepthan"  onBlur="javascript:this.value=this.value.toUpperCase();" style="width:20%; text-transform:uppercase;" maxlength="5">
										<button type="button" name="shipper" id="shipper" class="input_seach_btn" tabindex="-1" onClick="doWork('SET_UNLOC_CODE','POD')"></button>
									</td>
								</tr>
								<tr>
									<th><bean:message key="DEL"/></th>
									<td>
										<input type="text" id="del_cd" name="del_cd" maxlength="5" value='<bean:write name="hblVO" property="del_cd"/>' style="width:15%;  class="search_form" dataformat="excepthan"  readonly="readonly">
										<input type="text" id="del_nm" name="del_nm" value='<bean:write name="hblVO" property="del_nm"/>' class="search_form" style="width:50%;" dataformat="excepthan"  readonly="readonly">
										<input type="text" id="un_del_cd" name="un_del_cd" value='<bean:write name="hblVO" property="un_del_cd"/>' class="search_form" dataformat="excepthan"  onBlur="javascript:this.value=this.value.toUpperCase();" style="width:20%; text-transform:uppercase;" maxlength="5">
										<button type="button" name="shipper" id="shipper" class="input_seach_btn" tabindex="-1" onClick="doWork('SET_UNLOC_CODE','DEL')"></button>
									</td>
								</tr>
							</tbody>
						</table>
						<h3 class="title_design" style="margin-bottom:0"><bean:message key="OBL_Type"/></h3>
						
						<table style="margin-bottom:8px;"> 
							<colgroup>
								<col width="70%" />
								<col width="10%" />
								<col width="*" />
				    		</colgroup>
							<tbody>
								<tr>
									<td><input type="text" style="width:calc(100%);" name="obl_tp_nm" id="obl_tp_nm"  value="<bean:write name="hblVO" property="obl_tp_nm"/>" readonly="readonly"></td>
									<th><bean:message key="No"/></th>
									<td>
										<input type="text" id="org_bl_qty" name="org_bl_qty" maxlength="3" value="0" onkeypress="onlyNumberCheck();" onkeyup="numberCommaLen(this,7,0)" class="search_form" dataformat="excepthan" style="width:calc(100%); ime-mode:disabled; text-align:right">
									</td>
								</tr>
								<tr>
									<th colspan="3">
										<input type="radio" name="bl_frt_tp_radio" id="bl_frt_tp_frted" value="Freighted" checked="checked" />
										<label for="bl_frt_tp_frted">Freighted</label> 
										<input type="radio" name="bl_frt_tp_radio" id="bl_frt_tp_unfrt" value="Unfreighted"/>
										<label for="bl_frt_tp_unfrt">Unfreighted</label>
									</th>
								</tr>
							</tbody>
						</table>
						<h3 class="title_design" style="margin-bottom:0"><bean:message key="Liner_Bkg"/></h3>
						<table style="margin-bottom:8px;"> 
							<colgroup>
								<col width="50%" />
								<col width="15%" />
								<col width="*" />
				    		</colgroup>
							<tbody>
								<tr>
									<td><input type="text" style="width:calc(100%);" name="lnr_bkg_no" id="lnr_bkg_no" value="<bean:write name="hblVO" property="lnr_bkg_no"/>" readonly="readonly"></td>
								</tr>
								<tr>
									<th>
										<input type="text" name="bl_split_cnt" id="bl_split_cnt" value="<bean:write name="hblVO" property="bl_split_cnt"/>" readonly="readonly" style="display:none; width: 30px" />
										<input type="checkbox" disabled="disabled" name="si_bl_tp_chk" id="bl_tp_split" value="S" />
										<label id="bl_tp_split_lbl"  for="si_bl_tp_split">Split B/L</label> 
										<input type="checkbox" disabled="disabled"  name="si_bl_tp_chk" id="bl_tp_combine" value="C"/>
										<label id="bl_tp_combine_lbl" for="bl_tp_combine">Combine B/L</label>
									</th>
								</tr>
								<tr>
									<td colspan="3">
										<h3 class="title_design" sytle="margin-bottom:0"><bean:message key="Remark"/></h3>
									</td>
								</tr>
								<tr>
									<td colspan="3">
									<textarea name="si_rmk" maxlength="512" id="si_rmk" class="search_form autoenter_50px" dataformat="excepthan" style="width:calc(100%);height:30px;" WRAP="off"><bean:write name="hblVO" property="si_rmk"/></textarea>
									</td>
								</tr>
							</tbody>
						</table>
				        <div class="opus_design_grid"  id="cmdtSheetDiv" style="display:none;">
							<h3 class="title_design" style="margin-bottom:0"><bean:message key="Item"/> <bean:message key="List"/></h3>
				            <script type="text/javascript">comSheetObject('sheet2');</script>
				        </div>
					</div>
				</div>
			</div>
			
			<div id="disp_val_msg" style="width:80%;;float:left!important;">
				<div class="layout_flex_fixed" style="width:770px;float:left!important">
			   		<h3 class="title_design"><bean:message key="Validation_Message"/></h3>
				</div>
			
				<table>
		 			<tr>
		 				<td>
		 					<textarea name="val_msg" cols="200" rows="7"  readOnly style = "background-color:#f4f6f6;ime-mode:disabled; text-transform:none; font-family:TAHOMA; overflow:auto; resize:none; white-space: pre-wrap;"></textarea>
		 				</td>
		 				<td valign="top"" style="padding: 5px;">
		 					<button onClick="disp_val_msg.style.display='none';" style="cursor:hand" type="button" class="btn_normal"><bean:message key="Close"/></button>		
		 				</td>
		 			</tr>
		 		</table>
			</div>
		</div>  
		      
	</div>        
	      
</div>
</form>
