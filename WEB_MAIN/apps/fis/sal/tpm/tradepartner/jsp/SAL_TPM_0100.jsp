<%--
=========================================================
*Copyright(c) 2009 CyberLogitec. All Rights Reserved.
=========================================================
=========================================================
*@FileName   : SAL_TPM_0100.jsp
*@FileTitle  : Sales Daily Report Entry
*@Description:
*@author     : PJK
*@version    : 1.0 - 04/04/2012
*@since      :

*@Change history:
=========================================================
--%>
<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
	<%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
    <link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css" />

    <script language="javascript" src="<%=CLT_PATH%>/js/common/CalculationUtil.js?ver=<%=CLT_JS_VER%>"></script>
    <script language="javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
    <script language="javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js?ver=<%=CLT_JS_VER%>"></script>
    <script language="javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
    <script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/SAL_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
    <script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/COM_FRT_MSG.js?ver=<%=CLT_JS_VER%>"></script>
    <script language="javascript" src="<%=CLT_PATH%>/apps/fis/see/bmd/housebl/script/BL_CODE_UTIL.js?ver=<%=CLT_JS_VER%>"></script>
    <script language="javascript" src="<%=CLT_PATH%>/apps/fis/sal/tpm/tradepartner/script/SAL_TPM_0100.js?ver=<%=CLT_JS_VER%>"></script>
    <script type="text/javascript" src="<%=CLT_PATH%>/js/common/autocomplete_ui.js?ver=<%=CLT_JS_VER%>"></script>  <!-- #1247 [Sales Report Entry] Cannot auto suggestion when input Customer name -->
	<bean:define id="valMap" name="EventResponse" property="mapVal"/>
    <script>
	    function setupPage(){
	    	loadPage();
	    }
	    var AUTOCOMPLETE_YN = 'Y';
	    <logic:notEmpty name="valMap" property="autocompleteYn">
			AUTOCOMPLETE_YN = '<bean:write name="valMap" property="autocompleteYn"/>';
		</logic:notEmpty> 
    </script>
	
	<form name="frm1" method="POST" action="./SAL_TPM_0101.clt" enctype="multipart/form-data">
    <input type="hidden" name="f_cmd">

    <input type="hidden" name="cntc_seq" value='<bean:write name="valMap" property="cntc_seq"/>'>
    <input type="hidden" name="division" value='<bean:write name="valMap" property="division"/>'>
    <input type="hidden" name="h_sls_pson_pic" value='<bean:write name="valMap" property="sls_pson_pic"/>'>
    <input type="hidden" name="save_flg" value='<bean:write name="valMap" property="save_flg"/>'>
    <input type="hidden" name="save_x_flg" value='<bean:write name="valMap" property="save_x_flg"/>'>
	
	 <!-- page_title_area -->
	<div class="page_title_area clear">
	   <h2 class="page_title"><button type="button"><%=LEV3_NM%></button></h2>
	   <!-- btn_div -->
	   <div class="opus_design_btn TOP">
<%-- 	   <!--
			<button type="button" class="btn_accent" onClick="doWork('NEW')" style="display:none;" btnAuth="<%= roleBtnVO.getAttr2() %>"><bean:message key="New"/></button>
			<button type="button" class="btn_normal" id="btnModify" onClick="doWork('MODIFY')" style="display:none;" btnAuth="<%= roleBtnVO.getAttr3() %>"><bean:message key="Save"/></button>
		-->	
 --%>	   </div>
	   <!-- btn_div -->
	   <div class="location">
		   <span><%=LEV1_NM%></span> &gt;
		   <span><%=LEV2_NM%></span> &gt;
		   <span><%=LEV3_NM%></span>
		   <a href="" class="ir">URL Copy</a>
	   </div>
	</div>
<div class="over_wrap" height="100%">
	<!-- wrap_search (S) -->
	<div class="wrap_result">	
		<div class="opus_design_inquiry">
			<h3 class="title_design"><bean:message key="Visiting_Notes"/></h3>
            <table>
            	<colgroup>
            		<col width="90">
            		<col width="*">
            	</colgroup>
            	<tbody>
	                <tr>
	                    <th><bean:message key="Date"/></th>
	                    <td><!-- 
	                     --><input required type="text" name="visit_tm_fm" value='<wrt:write name="valMap" property="visit_tm_fm" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy"/>'  maxlength="10"  onkeypress="onlyNumberCheck();" onKeyUp="mkDateFormatType(this, event, false,1)" onBlur="mkDateFormatType(this, event, true,1);dateRangeValid(this, 'Date');" class="search_form" style="width:80px;"><!-- 
	                     --><button type="button" class="calendar ir" onclick="doDisplay('DATE1', frm1);"></button></td>
	                </tr>
	                <tr>
	                    <th><bean:message key="Visit_Time"/></th>
	                    <td><input type="text"  name="visit_tm_to" value='<wrt:write name="valMap" property="visit_tm_to" formatType="TIME" fromFormat="HHmm" format="HH:mm"/>' maxlength="5" class="search_form" style="width:40px;" onkeyPress="onlyNumberCheck();" onkeyup="timeFormat(this);"></td>
	                </tr>
	                <tr>
	                    <th class="table_search_head_r"><label style="background-color:#d4f6ff;"><bean:message key="Type"/></label></th>
	                    <td>
	                        <table>
				                <tr>
				                    <td width="120px"><input type="radio" name="division_radio" id="division_radio1" value="Q" checked onClick="search_opt_sheet()">&nbsp;<label for="division_radio1"><bean:message key="Quotation"/></label></td>
				                    <td width="105px"><input type="radio" name="division_radio" id="division_radio2" value="B" onClick="search_opt_sheet()">&nbsp;<label for="division_radio2"><bean:message key="Bidding"/></label></td>
				                    <td width="95px"><input  type="radio" name="division_radio" id="division_radio3" value="C" onClick="search_opt_sheet()">&nbsp;<label for="division_radio3"><bean:message key="Claim"/></label></td>
				                    <td width="135px"><input type="radio" name="division_radio" id="division_radio4" value="N" onClick="search_opt_sheet()">&nbsp;<label for="division_radio4"><bean:message key="New_Customer"/></label></td>
				                    <td><input type="radio" name="division_radio" id="division_radio5" value="G" onClick="search_opt_sheet()" >&nbsp;<label for="division_radio5"><bean:message key="General"/></label></td>
				                </tr>
				            </table>
				        </td>
	                </tr>
	                <tr>
	                	<th><bean:message key="Customer"/></th>
	                    <td><input required type="text"  name="trdp_cd" maxlength="20" value='<bean:write name="valMap" property="trdp_cd"/>' class="search_form" dataformat="multiLanguage" style="<%=MULTI_IMEMODE%>text-transform:uppercase;width:80px;"  onKeyDown="codeNameAction('partner_pickup',this, 'onKeyDown')" onBlur="strToUpper(this);codeNameAction('partner_pickup',this, 'onBlur')"><!-- 
	                     --><button type="button" class="input_seach_btn" tabindex="-1" onclick="doWork('PARTNER_POPLIST', this)"></button><!-- 
	                     --><input type="text"   name="trdp_nm" maxlength="50" class="search_form" onblur="strToUpper(this);" dataformat="multiLanguage" style="<%=MULTI_IMEMODE%>text-transform:uppercase;width:150px;" value='<bean:write name="valMap" property="trdp_nm"/>' id="pic" onKeyPress="if(event.keyCode==13){doWork('PARTNER_POPLIST_NAME', this);}">
						    <input type="hidden"  name="trdp_cd_ori" maxlength="20" value='<bean:write name="valMap" property="trdp_cd"/>' class="search_form" dataformat="multiLanguage" style="<%=MULTI_IMEMODE%>text-transform:uppercase;width:80px;" >
						</td>
	                </tr>
	                <tr>
	                	<th><bean:message key="Customer_PIC"/></th>
	                    <td><select name="sls_pson_pic" class="search_form" style="width:263px;"></select></td>
	                </tr>
	                <tr>
	                	<th><bean:message key="Attachment"/></th>
	                    <td><!-- 
	                        --><logic:notEmpty name="valMap" property="sls_his_flat_nm"><!-- 
	                        --><b><bean:message key="Original_File"/></b>: <a href="javascript:downloadFile();"><bean:write name="valMap" property="sls_his_flat_nm"/></a> &nbsp;&nbsp;&nbsp;&nbsp;<br><!-- 
	                        --><input tabindex = "-1" type="file" name="sls_his_flat_url" class="search_form" size="60"/><!-- 
	                        --><input type="hidden" name="sls_his_flat_nm_org" value='<bean:write name="valMap" property="sls_his_flat_nm"/>' class="search_form" size="60"/><!-- 
	                        --><input name="sls_his_flat_nm_flg" type="checkbox" value="Y" onClick="flgChange(this);"><!-- 
	                        --><input type="text" name="sls_his_flat_nm_chk" value="Del" style="width:16;border:0;background-color:transparent;font-size: 11px" tabindex="-1" readOnly><!-- 
	                        --></logic:notEmpty><!-- 
	                        --><logic:empty name="valMap" property="sls_his_flat_nm"><!-- 
	                        --><input type="file" name="sls_his_flat_url" class="search_form" size="60"/><!-- 
	                        --></logic:empty><!-- 
	                        --><input type="hidden" name="sls_his_flat_nm_yn" value="<bean:write name="valMap" property="sls_his_flat_nm"/>">
	                    </td>
	                </tr>
	                <tr>
	                	<th><bean:message key="Subject"/></th>
	                    <td>
	                    	<input required name="sls_his_tit" maxlength="100" onkeypress="keyPress_maxLength(this);" onkeyup="keyUp_maxLength(this);" value='<bean:write name="valMap" property="sls_his_tit"/>' type="text" class="search_form" style="width:540px;"/>
	                    </td>
	                </tr>
	                <tr>
	                	<th><bean:message key="Description"/></th>
	                    <td>
	                    	<textarea required name="sls_his_ctnt" maxlength="4000" onkeypress="keyPress_maxLength(this);" onkeyup="keyUp_maxLength(this);" onblur="keyUp_maxLength(this);" class="search_form"  style="ime-mode:auto;text-transform:none;width:540px;height:300px"><bean:write name="valMap" property="sls_his_ctnt"/></textarea>
	                    </td>
	                </tr>
	            </tbody>
            </table>
		</div>
	</div>
</div>	
	<!-- wrap_search (E) -->
	<!-- wrap_result (S) -->
    <div class="wrap_result">
		<div class="opus_design_grid" style="display: none;">
			<script language="javascript">comSheetObject('sheet1');</script>
		</div>
	</div>
	<!-- wrap_result (E) -->
</form>

<form name="frm2" method="POST" action="./GateServlet.gsl">
	<input type="hidden" name="goWhere" value="fd"/>
    <input type="hidden" name="bcKey"   value="paFileDown"/>
    <input type="hidden" name="trdp_cd" value=""/>
    <input type="hidden" name="cntc_seq" value=""/>
</form>
		
<script type="text/javascript">
doBtnAuthority("<%= roleBtnVO.getAttr_extension() %>");
</script>	