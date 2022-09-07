<%--
=========================================================
*@FileName   : SEE_BMD_0110.jsp
*@FileTitle  : Bank Draft
*@Description: Bank Draft
*@author     : Chungrue - Cyberlogitec
*@version    : 1.0 - 2011/11/01
*@since      : 2011/11/01

*@Change history:
=========================================================
--%>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="clt-paging"   prefix="paging" %>
	<!-- 공통 Header -->
	<%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
	<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css" />
	
	<!-- 일자 및 달력팝업 호출 -->
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/CalculationUtil.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/CoFormControl.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/SEA_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/COM_FRT_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/apps/fis/see/bmd/housebl/script/BL_CODE_UTIL.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/apps/fis/see/bmd/housebl/script/SEE_BMD_0110.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/autocomplete_ui.js?ver=<%=CLT_JS_VER%>"></script>
	<style>
<!--
td.table_body_c {
	border: 1px solid gray;
	text-align: center;
}
-->
</style>
	<%
		String userNm = userInfo.getUser_name();
		String eMail  = userInfo.getEml();
						
		String blNo   = request.getParameter("txt_hbl_no")== null?"":request.getParameter("txt_hbl_no");
		String intgBlNo=request.getParameter("intg_bl_seq")== null?"":request.getParameter("intg_bl_seq");
	%>
	
	
	<bean:define id="valMap" name="EventResponse" property="mapVal"/>
	
	
	<script>
		var blNo 	 = '<%=blNo%>';
		var intgBlNo = '<%=intgBlNo%>';
	
		var pDoc = parent.parent.parent.document;
		hideProcess('WORKING', pDoc);

	<!-- 처리시 메시지 -->
	var CNF_MSG1 = '<bean:message key="Do_you_want_to_run"/>';
	var PARAM1_1 = '';
	var PARAM1_2 = '';
	var PARAM2_1 = '';
	var PARAM2_2 = '';
	
	function setupPage(){
    	loadPage();
    }
	//<!-- #1160 Cannot auto suggestion when name inputted -->
	var AUTOCOMPLETE_YN = 'Y';
	 <logic:notEmpty name="valMap" property="autocompleteYn">
		AUTOCOMPLETE_YN = '<bean:write name="valMap" property="autocompleteYn"/>';
	</logic:notEmpty> 
	</script>
	</script>

<form name="frm1" method="POST" action="./">
<!--Command를 담는 공통 -->
<input type="hidden" name="f_cmd"/>
<input type="hidden" name="f_CurPage"/>
<input type="hidden" name="trdp_cd"/>

<input type="hidden" name="file_name"/>
<input type="hidden" name="title"/>
<input type="hidden" name="rd_param"/>

<input type="hidden" name="userNm"   value="<%= userNm %>"/>
<input type="hidden" name="eMail"    value="<%= eMail %>"/>
<input type="hidden" name="code_nm"  value="<bean:write name="valMap" property="code_nm"/>"/>
<input type="hidden" name="pic_nm"   value="<bean:write name="valMap" property="pic_nm"/>"/>
<input type="hidden" name="pic_phn"  value="<bean:write name="valMap" property="pic_phn"/>"/>
<input type="hidden" name="sub_code" value="<bean:write name="valMap" property="sub_code"/>"/>
<input type="hidden" name="dflt_addr" value="<bean:write name="valMap" property="dflt_addr"/>"/>
	<!-- page_title_area(S) -->
	<div class="page_title_area">
	   <h2 class="page_title"><button type="button"><%=LEV3_NM%></button></h2>
	   <!-- btn_div -->
	   <div class="opus_design_btn TOP">
		   <%-- <button type="button" class="btn_accent" style="display: none;" btnAuth="<%= roleBtnVO.getAttr5() %>" onclick="doWork('PRINT')"><bean:message key="Print"/></button> --%>
	   </div>
	   <!-- btn_div -->
	   <div class="location">
		   <span><%=LEV1_NM%></span> &gt;
		   <span><%=LEV2_NM%></span> &gt;
		   <span><%=LEV3_NM%></span>
		   <a href="" class="ir">URL Copy</a>
	   </div>
	</div>
    <!--빈공간 -->
<div class="over_wrap" height="100%">    
	<div class="wrap_search">	
		<div class="opus_design_inquiry entry_pannel ">
			<table>
				<colgroup>
					<col width="60" />
					<col width="*" />
				</colgroup>
				<tbody>
				<tr>
					<th><bean:message key="HBL_No"/></th>
					<td><!-- 
					 --><input type="text" name="txt_hbl_no"  value="" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:115px;text-transform:uppercase;" onblur="strToUpper(this)" onKeyDown="openPopup('HBL_POPLIST')"><!-- 
					 --><button type="button" class="input_seach_btn" tabindex="-1" onClick="doWork('HBL_POPLIST');"></button><!-- 
					 --><input type="hidden" name="intg_bl_seq"><!-- 
					 --></td>
				</tr>
				</tbody>
			</table>
		</div>
	</div>
	<div class="wrap_result">
		<div class="opus_design_inquiry">
			<table>
				<colgroup>
					<col width="50" />
					<col width="420" />
					<col width="80" />
					<col width="*" />
				</colgroup>
				<tbody>
                <tr>
                    <th><bean:message key="US"/></th>
                    <td><input type="text" name="txt_us_amt" value="" style="width:100px" class="search_form" onkeyPress="onlyNumberCheck();" onBlur="setUSValue();" onchange="numberCommaLen(this,15,2);chkComma(this,15,2);"></td>
                    <th><bean:message key="Issue_Date"/></th>
                    <td><!-- 
                     --><input type="text" name="issue_dt" id="issue_dt" onkeyPress="onlyNumberCheck();mkDateFormatType(this, event, false,1);" onKeyUp="mkDateFormatType(this, event, false,1)" onBlur="mkDateFormatType(this, event, true,1);dateRangeValid(this, 'Date Issued');" size='11' style="width:75px;"><!-- 
                     --><button type="button" class="calendar" tabindex="-1" onclick="doDisplay('DATE1', frm1);"></button><!-- 
                     --></td>
                </tr>
                <tr>
                    <td colspan="4"><input type="text" name="txt_first_ext" value="AT SIGHT" onblur="strToUpper(this);" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:400px" class="search_form" > <b>of this FIRST of Exchange [Second unpaid]</b></td>
                </tr>
            </table>
           	<table>
           		<colgroup>
					<col width="465" />
					<col width="85" />
					<col width="*" />
				</colgroup>
				<tbody>
               <tr>
                  <td><!-- 
                   --><b><i><u>Pay to the Order of </u></i></b>&nbsp;<input type="text" name="txt_ship_nm" value="" onblur="strToUpper(this)" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:286px" class="search_form" onKeyPress="openPopup('CUSTOMER_POPLIST')"><!-- 
                   --><button type="button" class="input_seach_btn" tabindex="-1" onClick="doWork('CUSTOMER_POPLIST')"></button><!-- 
                   --></td>
				  <th><bean:message key="LC_No"/></th>
                  <td><input type="text" name="txt_lc_no" value="" onblur="strToUpper(this);" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:105px" class="search_form" ></td>
               </tr>
               </tbody>
           	</table>
			<table>
				<colgroup>
					<col width="80" />
					<col width="320" />
					<col width="80" />
					<col width="150" />
					<col width="*" />
				</colgroup>
				<tbody>
				<tr>
					<th width="80px"><bean:message key="Open_Bank"/></th>
					<td width="320px"><input type="text" name="txt_open_bank" value="" onblur="strToUpper(this);" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:316px" class="search_form" ></td>
					<th width="80px" nowrap class="text_body_title"><bean:message key="Open_Date"/></th>
					<td width="150px"><!-- 
					 --><input type="text" name="open_dt" id="open_dt" onkeyPress="onlyNumberCheck();mkDateFormatType(this, event, false,1);" onKeyUp="mkDateFormatType(this, event, false,1)" onBlur="mkDateFormatType(this, event, true,1);dateRangeValid(this, 'Open Date');" size='11' style="width:75px;"><!-- 
					 --><button type="button" class="calendar" tabindex="-1" id="open_dt_cal" onclick="doDisplay('DATE2', frm1);"></button><!-- 
					 --></td>
					<td><b>Issued By &nbsp;Unite States Dollars</b></td>
				</tr>
				</tbody>
			</table>
                   
			<table>
				<colgroup>
					<col width="*" />
				</colgroup>
				<tbody>
				<tr>
					<td><input type="text" name="txt_input_01" onblur="strToUpper(this);" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:400px" class="search_form" value='"DRAWN UNDER DOCUMENTARY CREDIT NO.:'></td>
				</tr>
				</tbody>
			</table>
			
			<div class="layout_wrap">
				<div style="float: left;width: 36%;">
					<table>
						<tr>
							<td colspan="4"><b><bean:message key="for_Value_received_and_charge_the_same_to"/> <i><u>account of</u></i></b></td>
						</tr>	
						<tr>
							<th><i><u><bean:message key="To"/></u></i></th>
							<td>
								<input type="text" name="txt_to_nm" value="" onblur="strToUpper(this);" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:350px" class="search_form" onKeyPress="openPopup('CUSTOMER_POPLIST2')"><!-- 
							--><button type="button" class="input_seach_btn" tabindex="-1" onClick="doWork('CUSTOMER_POPLIST2')"></button>
							</td>
						</tr>
						<tr>
							<td>&nbsp;</td>
							<td><textarea name="txt_to_addr" class="search_form" onKeyDown="javascript:this.value=this.value.toUpperCase();" onblur="strToUpper(this);" dataformat="excepthan" style="width:350px;height:40px;" ></textarea></td>
						</tr>
						<tr>
							<th><bean:message key="No"/></th>
							<td><input type="text" name="txt_no_nm"  value="" onblur="strToUpper(this);" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:350px" class="search_form" ></td>
						</tr>      				
					</table>
				</div>
				<div style="float: left;width: 44%;">
					<table>
						<colgroup>
							<col width="*" />
						</colgroup>
						<tbody>
						<tr>
							<td><input type="text" name="txt_nty_nm" value=""  onblur="strToUpper(this);" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:350px" class="search_form" ></td>
						</tr>
						<tr>
							<td><textarea name="txt_input_02"  class="search_form" onKeyDown="javascript:this.value=this.value.toUpperCase();" onblur="strToUpper(this);" dataformat="excepthan" style="ime-mode:disabled;width:350px;height:40px;text-transform:uppercase;overflow:hidden;white-space: pre-wrap;" WRAP="on"></textarea></td>
						</tr>         
						<tr>
							<td><b><bean:message key="Authorized_Signature"/></b></td>
						</tr>	
						<tr>
							<td><input tabindex="-1" type="text" name="txt_input_03" onblur="strToUpper(this);" style="width:350px;border:0;background-color:transparent;" class="search_form" value="" readOnly></td>
						</tr>
						</tbody>
					</table>
				</div>
			</div>
							<table class="line_bluedot"><tr><td></td></tr></table>
			<table>
			<colgroup>
					<col width="460" />
					<col width="*" />
				</colgroup>
				<tbody>
				<tr>
					<td><textarea name="txt_glt_addr" class="search_form" onKeyDown="javascript:this.value=this.value.toUpperCase();" onblur="strToUpper(this);" dataformat="excepthan" style="width:376px;height:40px;" ></textarea></td>
					<td><b><bean:message key="Original_Copy"/></b> 
					 <table width="150px" style="border: 1px;"> 
					 	<tr> 
					 	<td width="10px"></td> 
					 	<td> 
					 			<input type="radio" name="origin_cpy" id="origin_cpy1" value=""><label for="origin_cpy1"><bean:message key="Original"/></label> 
					 			<input type="radio" name="origin_cpy" id="origin_cpy2" value="" checked><label for="origin_cpy2"><bean:message key="Copy"/></label> 
					 		</td> 
					 	</tr> 
					 </table></td>
				</tr>
			</table>
			<table>
				<colgroup>
						<col width="50" />
						<col width="463" />
						<col width="*" />
				</colgroup>
				<tbody>
				<tr>
					<th width="50px"><i><u>Gentlemen</u></i></th>
					<td width="463px"><!-- 
					 --><input type="text" name="txt_glt_nm" value="" onblur="strToUpper(this);" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:350px" class="search_form" onKeyPress="openPopup('CUSTOMER_POPLIST3')"><!-- 
					 --><button type="button" class="input_seach_btn" tabindex="-1" id="shipper" onClick="doWork('CUSTOMER_POPLIST3')"></button><!-- 
					 --></td>
					<td><input type="checkbox" name="origin_cpy_chk" id="origin_cpy_chk"><label for="origin_cpy_chk"><bean:message key="For_Collection"/></label></td>
				</tr>
				</tbody>
			</table>
			<table>
				<colgroup>
						<col width="150" />
						<col width="105" />
						<col width="264" />
						<col width="*" />
				</colgroup>
				<tbody>
       			<tr>
                    <th width="150px"><bean:message key="We_enclosed_Draft_Number"/></th>
					<td width="105px"><input type="text" name="txt_input_04" value="" onblur="strToUpper(this);" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:100px" class="search_form" ></td>
					<td width="264px"><b><bean:message key="and_documents_listed_below"/></b></td>
	                <td><input type="checkbox" name="origin_cpy_chk" id="origin_cpy_chk2"><label for="origin_cpy_chk2">for</label></td>
				</tr>
				</tbody>
			</table>
			<table>
				<colgroup>
						<col width="40" />
						<col width="493" />
						<col width="*" />
				</colgroup>
				<tbody>
               <tr>
                   <th><bean:message key="Initial"/></th>
                   <td><input type="text" name="txt_input_05" value="" onblur="strToUpper(this);" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:180px" class="search_form" ></td>
                   <td><input type="checkbox" name="origin_cpy_chk" id="origin_cpy_chk3" checked><label for="origin_cpy_chk3"><bean:message key="For_payment_negotiation_under_LC"/></label></td>
				</tr>
				</tbody>
			</table>
			<div class="opus_design_data">
                    <table style="width: 640px" class="grid_2">
	                    <colgroup>
							<col width="80px" />
							<col width="80px" />
							<col width="80px" />
							<col width="80px" />
							<col width="80px" />
							<col width="80px" />
							<col width="80px" />
							<col width="*" />
						</colgroup>
						<tbody>
                    	<tr>
                    		<th style="text-align:center;">BILLS OF<br>LADING</td>
                    		<th style="text-align:center;">B/L<br><bean:message key="Copy"/></td>
                    		<th style="text-align:center;">COMM.<br>INV</td>
                    		<th style="text-align:center;">INS.<br>CIF</td>
                    		<th style="text-align:center;">CIF.<br>ORG</td>
                    		<th style="text-align:center;">CONS.<br>INV</td>
                    		<th style="text-align:center;">PKNG.<br>LIST</td>
                    		<th style="text-align:center;">WGT.<br>CTF</td>
                    	</tr>
                    	
                    	<tr>
                    		<td class="table_body_c"><input type="text" name="txt_input_06" value="" onblur="strToUpper(this);" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:100px" class="search_form" style="text-align:center"></td>
                    		<td class="table_body_c"><input type="text" name="txt_input_07" value="" onblur="strToUpper(this);" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:100px" class="search_form" style="text-align:center"></td>
                    		<td class="table_body_c"><input type="text" name="txt_input_08" value="" onblur="strToUpper(this);" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:100px" class="search_form" style="text-align:center"></td>
                    		<td class="table_body_c"><input type="text" name="txt_input_09" value="" onblur="strToUpper(this);" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:100px" class="search_form" style="text-align:center"></td>
                    		<td class="table_body_c"><input type="text" name="txt_input_10" value="" onblur="strToUpper(this);" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:100px" class="search_form" style="text-align:center"></td>
                    		<td class="table_body_c"><input type="text" name="txt_input_11" value="" onblur="strToUpper(this);" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:100px" class="search_form" style="text-align:center"></td>
                    		<td class="table_body_c"><input type="text" name="txt_input_12" value="" onblur="strToUpper(this);" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:100px" class="search_form" style="text-align:center"></td>
                    		<td class="table_body_c"><input type="text" name="txt_input_13" value="" onblur="strToUpper(this);" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:100px" class="search_form" style="text-align:center"></td>
                    	</tr>
                    	</tbody>
                    </table>
             </div>
                    <table>
	                    <colgroup>
							<col width="150" />
							<col width="*" />
						</colgroup>
						<tbody>
                        <tr>
                            <td><b><bean:message key="Other_Instructions"/></b></td>
                        </tr>
                        <tr>
                        	<td colspan="2"><textarea name="txt_input_14" class="search_form" onKeyDown="javascript:this.value=this.value.toUpperCase();" onblur="strToUpper(this);" dataformat="excepthan" style="width:875px;height:60px;" ></textarea></td>
                        </tr>
                        </tbody>
                    </table>
		</div>
	</div>
</div>	
</form>
		
<script type="text/javascript">
doBtnAuthority("<%= roleBtnVO.getAttr_extension() %>");
</script>	

