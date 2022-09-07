<%--
/*=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : OTH_VSI_0010.jsp
*@FileTitle  : Shipping Instruction Entry
*@author     : CLT
*@version    : 1.0
*@since      : 2014/06/09
=========================================================*/
--%>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@ page import="com.clt.framework.component.util.JSPUtil"%>
<%@ taglib uri="clt-paging"   prefix="paging" %>
	<!-- 공통 Header -->
	<%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
	<bean:define id="tmpMap" name="EventResponse" property="mapVal"/>
	<bean:parameter name="vndr_si_no" id="vndr_si_no" value= ""/>

	<!-- 일자 및 달력팝업 호출 -->
    <link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css"/>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/CalculationUtil.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/apps/fis/see/bmd/housebl/script/BL_CODE_UTIL.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/SUP_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/apps/fis/oth/vsi/script/OTH_VSI_0010.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/autocomplete_ui.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript">
		var pDoc = parent.parent.parent.document;
		hideProcess("WORKING", pDoc);

		var phn = "<%=userInfo.getPhn()%>";
		var fax = "<%=userInfo.getFax()%>";
		var eml = "<%=userInfo.getEml()%>";

		// [Document List] Sheet용 XML setting
		var dcmtListXml = "";
	<bean:define id="vndrSiDocList" name="tmpMap" property="vndrSiDocList"/>
		dcmtListXml = '<?xml version="1.0"?>\n<SHEET>\n  <DATA TOTAL="5">\n';
	<logic:iterate id="comCdDtlVO" name="vndrSiDocList">
		dcmtListXml += '    <TR MERGE="TRUE">\n';
		dcmtListXml += '      <TD></TD>\n';
		dcmtListXml += '      <TD></TD>\n';
		dcmtListXml += '      <TD><bean:write name="comCdDtlVO" property="cd_nm"/></TD>\n';
		dcmtListXml += '      <TD><bean:write name="comCdDtlVO" property="cd_val"/></TD>\n';
		dcmtListXml += '    </TR>\n';
	</logic:iterate>
		dcmtListXml += '  </DATA>\n</SHEET>';
		function setupPage(){
			loadPage();
		}
		var AUTOCOMPLETE_YN = 'N';
		 <logic:notEmpty name="tmpMap" property="autocompleteYn">
	    	AUTOCOMPLETE_YN = '<bean:write name="tmpMap" property="autocompleteYn"/>';
		 </logic:notEmpty>
	</script>
<form name="frm1">
	<!--Command를 담는 공통 -->
	<input type="hidden" name="f_cmd"/>

	<input type="hidden" name="ci_flg" value="0" id="ci_flg" />
	<input type="hidden" name="pl_flg" value="0" id="pl_flg" />
	<input type="hidden" name="lc_flg" value="0" id="lc_flg" />
	<input type="hidden" name="shp_exp_dcl_flg" value="0" id="shp_exp_dcl_flg" />
	<input type="hidden" name="oth_flg" value="0" id="oth_flg" />
	<input type="hidden" name="oth_doc_txt" id="oth_doc_txt" />
	<input type="hidden" name="sndr_usrid" value="<%=userInfo.getUsrid()%>" id="sndr_usrid" />

	<!-- RD raram setting -->
	<input type="hidden" name="file_name" id="file_name" />
	<input type="hidden" name="title" id="title" />
	<input type="hidden" name="rd_param" id="rd_param" />

	<!-- 타이틀, 네비게이션 -->
	
	
		<!-- page_title_area(S) -->
	<div class="page_title_area clear">
		<!-- page_title(S) -->
		<h2 class="page_title"><button type="button"><%=LEV3_NM%></button></h2>
		<!-- page_title(E) -->
		<!-- opus_design_btn(S) -->
		<div class="opus_design_btn TOP">
			<%-- 
			<button type="button" class="btn_accent" onclick="doWork('SEARCH');" style="cursor:hand; display:none;" btnAuth="<%= roleBtnVO.getAttr1() %>"><bean:message key="Search" /></button> 
			<button type="button" class="btn_normal" onclick="doWork('SAVE')"  style="cursor:hand; display:none;" btnAuth="<%= roleBtnVO.getAttr3()%>"><bean:message key="Save" /></button> 
			<button type="button" class="btn_normal" onclick="doWork('PRINT')" style="cursor:hand; display:none;" btnAuth="<%= roleBtnVO.getAttr5() %>"><bean:message key="Print" /></button> 
			<button type="button" class="btn_normal" onClick="doWork('NEW')" style="cursor:hand; display:none;" btnAuth="<%= roleBtnVO.getAttr2() %>"><bean:message key="New" /></button>
			 --%>
		</div>
		<!-- opus_design_btn(E) -->
	
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
	
	
	<!-- opus_design_inquiry(S) -->
<div class="over_wrap" height="100%">
	<div class="wrap_search">
		<div class="opus_design_inquiry entry_pannel ">
			<table>
				<colgroup>
					<col width="70">
					<col width="*">
				</colgroup>
					<tr>
						<th><bean:message key="B.SI"/>&nbsp;<bean:message key="No" /></th>
						<td>
						<input required type="text" name="vndr_si_no" maxlength="20" onblur="strToUpper(this);" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase; width:150px;" onchange="changeVndrSiNo();" value='<bean:write name="vndr_si_no"/>' id="vndr_si_no" />
						</td>
					</tr>
		 
			</table>
		</div>
	</div>

<!-- opus_design_inquiry(E) -->

	<div class="wrap_result">
	<div class="opus_design_inquiry wFit">
	<!-- layout_wrap(S) -->
	<div class="layout_wrap" >
	    <div class="layout_vertical_2 sm" style="width:450px;height:465px">
	   		<table>
	   			<colgroup>
	   				<col width="70">
	   				<col width="75">
	   				<col width="75">
	   				<col width="*">
	   			</colgroup>
	   			<tbody>
		   			<tr>
		   				<th><bean:message key="To" /></th>
		   				<td colspan="3"> 
		   					<input required type="text" name="to_trdp_cd" maxlength="20" onkeypress="getNameByCode(this);" onblur="getNameByCode(this);" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase; width:80px;" id="to_trdp_cd" /><!-- 
		   				--><button type="button"class="input_seach_btn" tabindex="-1" onClick="doDisplay('TRDP_POPUP', document.frm1.to_trdp_nm);"></button><!-- 
		   				--><input required type="text" name="to_trdp_nm" maxlength="50" onblur="strToUpper(this);" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase; width:165px;" onkeypress="doDisplay2('TRDP_POPUP_NAME', this);" id="to_trdp_nm" />
		   				</td>
		   			</tr>
		   			<tr>
		   				<th><bean:message key="Address" /></th>
		   				<td colspan="3">
		   					<textarea maxlength="390" name="to_trdp_addr" class="se arch_form autoenter_50" dataformat="excepthan" style="width:278px; height:44px;" onBlur="strToUpper(this);" id="to_trdp_addr"></textarea>
		   				</td>
		   			</tr>
		   			<tr>
		   				<th><bean:message key="Contact_Person" /></th>
		   				<td>
		   					<input type="text" name="to_trdp_pic_nm" maxlength="20" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase; width:70px;" id="to_trdp_pic_nm" />
		   				</td>
		   				<th><bean:message key="Tel_Fax" /></th>
		   				<td>
		   					<input type="text" name="to_trdp_pic_phn" maxlength="20" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase; width:60px;" id="to_trdp_pic_phn" /><!-- 
		   				--><input type="text" name="to_trdp_pic_fax" maxlength="20" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase; width:62px;" id="to_trdp_pic_fax" />
		   				</td>
		   			</tr>
		   			
		   			
		   			<tr>
		   				<th><bean:message key="Freight" /></th>
		   				<td colspan="3">
								<input required type="text" name="frt_to_trdp_cd" maxlength="20" onkeypress="getNameByCode(this);" onblur="getNameByCode(this);" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase; width:80px;" id="frt_to_trdp_cd"  value='<bean:write name="tmpMap" property="sysOfcCd"></bean:write>MAINCMP'  /><!-- 
							--><button type="button"class="input_seach_btn" tabindex="-1" onClick="doDisplay('TRDP_POPUP', document.frm1.frt_to_trdp_nm);"></button><!-- 
							 --><input required type="text" name="frt_to_trdp_nm" maxlength="50" onblur="strToUpper(this);" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase; width:165px;" onkeypress="doDisplay2('TRDP_POPUP_NAME', this);" id="frt_to_trdp_nm" />
						</td>
		   			</tr>
		   			<tr>
		   				<th><bean:message key="Address" /></th>
		   				<td colspan="3" class="table_search_body" >
								<textarea maxlength="390" name="frt_to_trdp_addr" class="search_form autoenter_50" dataformat="excepthan" style="width:278px; height:44px;" onBlur="strToUpper(this);" id="frt_to_trdp_addr"></textarea>
						</td>
		   			</tr>
		   			<tr>
		   				<th><bean:message key="Contact_Person" /></th>
		   				<td>
		   					<input type="text" name="frt_to_trdp_pic_nm" maxlength="50" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase; width:70px;" id="frt_to_trdp_pic_nm" />
		   				</td>
		   			
		   				<th><bean:message key="Tel_Fax" /></th>
		   				<td>
							<input type="text" name="frt_to_trdp_pic_phn" maxlength="50" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase; width:60px;" id="frt_to_trdp_pic_phn" /><!--
							--><input type="text" name="frt_to_trdp_pic_fax" maxlength="50" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase; width:60px;" id="frt_to_trdp_pic_fax" />
		   				</td>
		   			</tr>
		   		</tbody>
	   		</table>
   			<h3 class="title_design mar_top_8"><bean:message key="Document_List" /></h3>
	   		<div class="opus_design_grid">
	   			<div id="mainTable"><script type="text/javascript">comSheetObject("sheet1");</script></div>
	   		</div>
	    </div>
	    <div class="layout_vertical_2 mar_left_8">
	    	<table>
	    		<colgroup>
	    			<col width="100">
	    			<col width="140">
	    			<col width="130">
	    			<col width="*">
	    		</colgroup>
	    		<tbody>
		    		<tr>
		    			<th><bean:message key="Status" /></th>
		    			<td colspan="3">
							<bean:define id="vndrSiSndStsList" name="tmpMap" property="vndrSiSndStsList"/>
							<select name="sts_cd" style="width:100px">
								<logic:iterate id="comCdDtlVO" name="vndrSiSndStsList">
									<option value='<bean:write name="comCdDtlVO" property="cd_val"/>'><bean:write name="comCdDtlVO" property="cd_nm"/></option>
								</logic:iterate>
							</select>
						</td>
		    		</tr>
		    		<tr>
		    			<th><bean:message key="From" /></th>
		    			<td colspan="3">
							<input type="text" name="sndr_usrnm" maxlength="20" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase; width:100px;" class="search_form-disable" value="<%=userInfo.getUser_name()%>" readonly="" id="sndr_usrnm" /><!-- 
						--><button type="button" class="input_seach_btn" tabindex="-1" onClick="doDisplay('USER_POPUP', document.frm1.sndr_usrnm)"></button>
						</td>
		    		</tr>
		    		<tr>
		    			<th><bean:message key="Send" /> <bean:message key="Date" /></th>
		    			<td>
							<input required style="width:70px;" type="text" name="snd_dt" id="snd_dt" onkeyup="mkDateFormatType(this, event, false, 1)" onblur="mkDateFormatType(this, event, true, 1);dateRangeValid(this, 'Send Date');" size="11" maxlength="10" value="<%=JSPUtil.getKST("MM-dd-yyyy")%>" id="snd_dt" /><!-- 
						--><button type="button" class="calendar" tabindex="-1" name="snd_dt_cal" id="snd_dt_cal"  onclick="doDisplay('DATE11', frm1);">
						</td>
						<th><bean:message key="Estm" /> <bean:message key="Shipping"/> <bean:message key="Date"/></th>
						<td class="table_search_body">
							<input type="text" name="est_shp_dt" id="est_shp_dt" onkeyup="mkDateFormatType(this, event, false, 1)" onblur="mkDateFormatType(this, event, true, 1);dateRangeValid(this, 'Estm. Shipping Date');" size="11" maxlength="10" id="est_shp_dt" style="width:70px;"/><!-- 
						--><button type="button" class="calendar" tabindex="-1" name="est_shp_dt_cal" id="est_shp_dt_cal"  onclick="doDisplay('DATE12', frm1);">
						</td>
		    		</tr>
		    		<tr>
		    			<th><bean:message key="PO_No" /></th>
		    			<td colspan="3">
							<input type="text" name="po_no" maxlength="20" onblur="strToUpper(this);" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase; width:190px;" onkeypress="doDisplay2('TRDP_POPUP', this);" id="po_no" />
		    			</td>
		    		</tr>
		    		<tr>
		    			<th><bean:message key="Document"/> <bean:message key="To" /></th>
		    			<td colspan="3">
							<input required type="text" name="doc_to_trdp_cd" maxlength="20" onkeypress="getNameByCode(this);" onblur="getNameByCode(this);" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase; width:80px;" id="doc_to_trdp_cd" value='<bean:write name="tmpMap" property="sysOfcCd"></bean:write>MAINCMP'  /><!-- 
						--><button type="button"class="input_seach_btn" tabindex="-1" onClick="doDisplay('TRDP_POPUP', document.frm1.doc_to_trdp_nm);"></button><!-- 
						 --><input required type="text" name="doc_to_trdp_nm" maxlength="50" onblur="strToUpper(this);" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase; width:165px;" onkeypress="doDisplay2('TRDP_POPUP_NAME', this);" id="doc_to_trdp_nm" />
						</td>
						
		    		</tr>
		    		<tr>
		    			<th><bean:message key="Address"/></th>
		    			<td colspan="3">
							<textarea maxlength="390" name="doc_to_trdp_addr" class="search_form autoenter_50" dataformat="excepthan" style="width:278px; height:44px;" onBlur="strToUpper(this);" id="doc_to_trdp_addr"></textarea>
						</td>
		    		</tr>
		    		
		    
		    		<tr>
		    			<th><bean:message key="Contact_Person" /></th>
		    			<td >
							<input type="text" name="doc_to_trdp_pic_nm" maxlength="50" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase; width:130px;" id="doc_to_trdp_pic_nm" />
		    			</td>
		    			<th ><bean:message key="Tel_Fax"/></th>
		    			<td >
							<input type="text" name="doc_to_trdp_pic_phn" maxlength="50" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase; width:95px;" id="doc_to_trdp_pic_phn" /><!-- 
						--><input type="text" name="doc_to_trdp_pic_fax" maxlength="50" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase; width:95px;" id="doc_to_trdp_pic_fax" />
						</td>
									
		    		</tr> 
		    	</tbody>
		    </table>
		    <div style="width:553px">
			    <h3 class="title_design"><bean:message key="Remark"/></h3>
		    	<table>
		    		<colgroup>
		    			<col width="*">
		    		</colgroup>
		    		<tbody>
			    		<tr>
			    			<td colspan="4">
								<textarea name="rmk" maxlength="500" onKeyPress="keyPress_maxLength(this);" onKeyUp="keyUp_maxLength(this);" onBlur="strToUpper(this);keyUp_maxLength(this);" class="search_form autoenter_50" dataformat="excepthan" style="width:90%; height:200px;"></textarea>
							</td>
			    		</tr>
			    	</tbody>
		    	</table>
	    	</div>
	   		<div id="mainTable" style="display: none;"><script type="text/javascript">comSheetObject("sheet2");</script></div>
	    </div>
	</div>
	</div>
	<!-- layout_wrap(E) -->
</div>
</div>
</form>
<script type="text/javascript">
	doBtnAuthority("<%= roleBtnVO != null ? roleBtnVO.getAttr_extension() : "" %>");
</script>



