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
	<script type="text/javascript" src="<%=CLT_PATH%>/apps/fis/edi/cmm/script/EDI_CMM_0020.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/EDI_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/COM_FRT_MSG.js?ver=<%=CLT_JS_VER%>"></script>
    
    <script type="text/javascript">
	    <!-- vgm관련 seal party code -->
		var SEALPTYCD1 = '|';
		var SEALPTYCD2 = '|';
		<% boolean isBegin = false; %>
	    <logic:notEmpty name="valMap" property="SEALPTYCD">
	        <bean:define id="sealpartycdList" name="valMap" property="SEALPTYCD"/>
	        <logic:iterate id="codeVO" name="sealpartycdList">
	            <% if(isBegin){ %>
	            	SEALPTYCD1+= '|';
	            	SEALPTYCD2+= '|';
	            <% }else{
	                  isBegin = true;
	               } %>
	               SEALPTYCD1+= '<bean:write name="codeVO" property="cd_nm"/>';
	               SEALPTYCD2+= '<bean:write name="codeVO" property="cd_val"/>';
	        </logic:iterate>
	    </logic:notEmpty>
				
		var VGMWGTCD1 = '';
		var VGMWGTCD2 = '';
		<% isBegin = false; %>
	    <logic:notEmpty name="valMap" property="VGMWGTCD">
	        <bean:define id="vgmWgtCdList" name="valMap" property="VGMWGTCD"/>
	        <logic:iterate id="codeVO" name="vgmWgtCdList">
	            <% if(isBegin){ %>
	           		VGMWGTCD1+= '|';
	           		VGMWGTCD2+= '|';
	            <% }else{
	                  isBegin = true;
	               } %>
	               VGMWGTCD1+= '<bean:write name="codeVO" property="cd_nm"/>';
	               VGMWGTCD2+= '<bean:write name="codeVO" property="cd_val"/>';
	        </logic:iterate>
	    </logic:notEmpty>
	
		var VGMMETHODCD1 = '';
		var VGMMETHODCD2 = '';
		<% isBegin = false; %>
	    <logic:notEmpty name="valMap" property="VGMMETHODCD">
	        <bean:define id="vgmMethodList" name="valMap" property="VGMMETHODCD"/>
	        <logic:iterate id="codeVO" name="vgmMethodList">
	            <% if(isBegin){ %>
	            	VGMMETHODCD1+= '|';
	            	VGMMETHODCD2+= '|';
	            <% }else{
	                  isBegin = true;
	               } %>
	               VGMMETHODCD1+= '<bean:write name="codeVO" property="cd_nm"/>';
	               VGMMETHODCD2+= '<bean:write name="codeVO" property="cd_val"/>';
	        </logic:iterate>
	    </logic:notEmpty>
	
		var VGMCNTRTPCD1 = '';
		var VGMCNTRTPCD2 = '';
		<% isBegin = false; %>
	    <logic:notEmpty name="valMap" property="VGMCNTRTPCD">
	        <bean:define id="vgmCntrTpList" name="valMap" property="VGMCNTRTPCD"/>
	        <logic:iterate id="codeVO" name="vgmCntrTpList">
	            <% if(isBegin){ %>
	            	VGMCNTRTPCD1+= '|';
	            	VGMCNTRTPCD2+= '|';
	            <% }else{
	                  isBegin = true;
	               } %>
	               VGMCNTRTPCD1+= '<bean:write name="codeVO" property="cd_nm"/>';
	               VGMCNTRTPCD2+= '<bean:write name="codeVO" property="cd_val"/>';
	        </logic:iterate>
	    </logic:notEmpty>
	    
		<!-- Liner Code For EDI -->
		var EDILNRCD = '';
		<% isBegin = false; %>
	    <logic:notEmpty name="valMap" property="EDI_LINER_LIST">
	        <bean:define id="edilnrcdList" name="valMap" property="EDI_LINER_LIST"/>
	        <logic:iterate id="codeVO" name="edilnrcdList">
	            <% if(isBegin){ %>
	            	EDILNRCD+= '|';
	            <% }else{
	                  isBegin = true;
	               } %>
	               EDILNRCD+= '<bean:write name="codeVO" property="cd_nm"/>';
	        </logic:iterate>
	    </logic:notEmpty>
	    
		<!-- Liner Code For Email -->
		var EMLLNRCD = '';
		<% isBegin = false; %>
	    <logic:notEmpty name="valMap" property="EML_LINER_LIST">
	        <bean:define id="emllnrcdList" name="valMap" property="EML_LINER_LIST"/>
	        <logic:iterate id="codeVO" name="emllnrcdList">
	            <% if(isBegin){ %>
	            	EMLLNRCD+= '|';
	            <% }else{
	                  isBegin = true;
	               } %>
	               EMLLNRCD+= '<bean:write name="codeVO" property="cd_nm"/>';
	        </logic:iterate>
	    </logic:notEmpty>
	    
	    <!-- Liner Code -->
		var LNRCD = '';
		<% isBegin = false; %>
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
        
        var SI_VNDR_CD = '';
        <logic:notEmpty name="valMap" property="SI_VNDR_CD">
        	SI_VNDR_CD = '<bean:write name="valMap" property="SI_VNDR_CD"/>';
        </logic:notEmpty>
        
	</script>
		
	<script type="text/javascript">
		var ofc_cd = "<%=userInfo.getOfc_cd()%>";
		
		function setupPage(){
			loadPage();
		}
		
	</script>
</head>
<form name="frm1" method="POST" action="./EDI_CMM_0020.clt">
    <input type="hidden" name="f_cmd">
    <input type="hidden" name="p_lnr_trdp_cd" value='<bean:write name="valMap" property="lnr_trdp_cd"/>'>
    <input type="hidden" name="p_lnr_trdp_nm" value='<bean:write name="valMap" property="lnr_trdp_nm"/>'>
    <input type="hidden" name="p_trnk_vsl_nm" value='<bean:write name="valMap" property="trnk_vsl_nm"/>'>
    <input type="hidden" name="p_trnk_voy" value='<bean:write name="valMap" property="trnk_voy"/>'>
	<input type="hidden" name="intg_bl_seq">
	<input type="hidden" name="vgm_valid_yn">
	<input type="hidden" name="si_valid_yn">
	<input type="hidden" name="pck_qty">
	<input type="hidden" name="pck_ut_cd">
	<input type="hidden" name="grs_wgt">
	<input type="hidden" name="meas">
	<input type="hidden" name="cntr_cnt">
	<input type="hidden" name="itn_no">
	<input type="hidden" name="no_name_cntr_cnt">
	<input type="hidden" name="no_tpsz_cntr_cnt">
	<input type="hidden" name="desc_txt">
	<input type="hidden" name="hbl_cnt">
	<input type="hidden" name="lnr_bkg_no">
	<input type="hidden" name="item_cnt">
	<input type="hidden" name="no_item_desc_wgt_cnt">
	<input type="hidden" name="no_item_meas_cnt">
	<input type="hidden" name="no_vgm_cgo_wgt_cnt">
	<input type="hidden" name="no_vgm_cgo_wgt_tp_cnt">
	<input type="hidden" name="no_vgm_dt_cnt">
	<input type="hidden" name="no_vgm_tm_cnt">
	<input type="hidden" name="no_vgm_method_cnt">
	<input type="hidden" name="no_vgm_cntr_tp_cnt">
	<input type="hidden" name="no_vgm_spc_trdp_nm_cnt">
	<input type="hidden" name="no_vgm_spc_trdp_pic_cnt">
	<input type="hidden" name="no_vgm_am_trdp_nm_cnt">
	<input type="hidden" name="no_vgm_am_trdp_pic_cnt">
	<input type="hidden" name="user_id"  value="<%=userInfo.getUsrid()%>" />
	<input type="hidden" name="pageurl" id="pageurl" value="EDI_CMM_0020.clt"/>
	
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
               		<col width="100">
               		<col width="340">
               		<col width="100">
               		<col width="200">
               		<col width="80">
               		<col width="*">
               	</colgroup>
        		<tr>
                   	<th><bean:message key="Liner"/></th>
					<td>
						<input required type="text" name="f_lnr_trdp_cd" maxlength="20" onKeyDown="codeNameAction('trdpCode',this, 'onKeyDown')" onBlur="strToUpper(this);codeNameAction('trdpCode',this, 'onBlur');" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:75px;"><!-- 
                    	--><button type="button" name="liner" id="liner" class="input_seach_btn" tabindex="-1" onClick="doWork('CARR_TRDP_POPLIST')"></button><!-- 
                        --><input required type="text" name="f_lnr_trdp_nm" maxlength="50" onblur="strToUpper(this);" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:173px;" onKeyPress="if(event.keyCode==13){doWork('CARR_TRDP_POPLIST', frm1.f_lnr_trdp_nm.value);}">
					</td>
					
                       <th><bean:message key="Liner_Bkg_No"/></th>
                       <td><!-- 
                        	--><input name="f_lnr_bkg_no"  maxlength="100" value="" type="text" dataformat="excepthan" style="ime-mode:disabled;width:120;text-transform:uppercase;" onblur="strToUpper(this)" onkeydown="entSearch();">
                       </td>
					<th><bean:message key="Status"/></th>
					<td> 
						 <select name="f_status"/>
							 <option value=''>ALL</option>
							 <option value='N'>New</option>
							 <option value='SV'>Saved</option>
							 <option value='S'>Sending</option>
							 <option value='E'>Error</option>
							 <option value='T'>Transmitted</option>
							 <option value='R'>Rejected</option>
							 <option value='A'>Accepted</option>
						 </select>
					</td>													
             	</tr>
                <tr>
                   	<th><bean:message key="VSL_VOY"/></th>
					<td>
						<input required type="text" id="f_trnk_vsl_nm" name="f_trnk_vsl_nm" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:170px;text-transform:uppercase;" maxlength="50" onblur="strToUpper(this)"><!--
				    --><button type="button" name="trunkvessel" id="trunkvessel" class="input_seach_btn" tabindex="-1" onClick="vslPopup('')"></button><!-- 
                    --><input required type="text" id="f_trnk_voy" name="f_trnk_voy" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:78px;text-transform:uppercase;" maxlength="10" onblur="strToUpper(this)">
						<input type="hidden" name="f_trnk_vsl_cd" value='' class="search_form"  readonly>
					</td>
					<th><bean:message key="Ref_No"/></th>
                    <td>
                    	<input name="f_ref_no" maxlength="20" value="" type="text" dataformat="excepthan" style="ime-mode:disabled;width:120;text-transform:uppercase;" onblur="strToUpper(this)" onkeydown="entSearch();"><!--
				    --><button type="button" name="btns_search1" id="btns_search1" class="input_seach_btn" tabindex="-1" onClick="srOpenPopUp('REF_POPLIST_BLANK',this)"></button>
                   	</td>
					<th><bean:message key="MBL_No"/></th>
                    <td>
                    	<input name="f_mbl_no" maxlength="40" value="" type="text" dataformat="excepthan" style="ime-mode:disabled;width:120;text-transform:uppercase;" onblur="strToUpper(this)" onkeydown="entSearch();"><!--
				    --><button type="button" name="btns_search1" id="btns_search1" class="input_seach_btn" tabindex="-1" onClick="srOpenPopUp('MBL_POPLIST_BLANK',this)">
                    </td>
             	</tr>
          	</table>
		</div>
	</div>
	
	<div class="wrap_result">
		<div class="layout_wrap">
			<h3 class="title_design"> <bean:message key="MBL_List"/></h3>
	        <div class="opus_design_grid">
				<script language="javascript">comSheetObject('sheet1');</script>
			</div>
		</div>
		<div class="layout_wrap">
		    <div class="layout_flex_fixed" style="width:550px;float:left!important" >
				<h3 class="title_design"> <bean:message key="Item"/> <bean:message key="List"/></h3>
		        <div class="opus_design_grid">
					<script language="javascript">comSheetObject('sheet2');</script>
				</div>
			</div>
			<div style="padding-left: 558px;">
				<h3 class="title_design"> <bean:message key="VGM_Container_List"/></h3>
		        <div class="opus_design_grid">
						<script type="text/javascript">comSheetObject('sheet3');</script>
				</div>
			</div>
		</div>
		
		<div class="layout_wrap">
		    <div class="layout_flex_fixed" style="width:700px;float:left!important" >
		    	<div id="disp_val_msg" style="width:100%;float:left!important;">
					<div class="layout_flex_fixed" style="width:770px;float:left!important">
				   		<h3 class="title_design"><bean:message key="Validation_Message"/></h3>
					</div>
					<table>
			 			<tr>
			 				<td>
			 					<textarea name="val_msg" cols="200" rows="14"  readOnly style = "background-color:#f4f6f6;ime-mode:disabled; text-transform:none; font-family:TAHOMA; overflow:auto; resize:none; white-space: pre-wrap;"></textarea>
			 				</td>
			 			</tr>
			 		</table>
				</div>
		    </div>
		    <div style="padding-left: 708px;">
		    	<h3 class="title_design"> <bean:message key="History"/></h3>
		        <div class="opus_design_grid">
					<script language="javascript">comSheetObject('sheet4');</script>
				</div>
		    </div>
		</div>
	</div>                  
</div>
</form>
  
<script type="text/javascript">
doBtnAuthority("<%= roleBtnVO.getAttr_extension() %>");
</script>

