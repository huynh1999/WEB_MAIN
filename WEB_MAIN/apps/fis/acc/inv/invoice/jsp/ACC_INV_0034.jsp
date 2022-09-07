<%--
=========================================================
*@FileName   : ACC_INV_0034.jsp
*@FileTitle  : A/P EXPENSE OTHER BRANCH List
*@Description: A/P EXPENSE OTHER BRANCH List
*@author     : Chungrue - Cyberlogitec
*@version    : 1.0 - 2012/05/15
*@since      : 2012/05/15

*@Change history:
=========================================================
--%>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="clt-paging"   prefix="paging" %>
	<!-- 공통 Header -->
	<%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
	<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css"/>
	
	<!-- 일자 및 달력팝업 호출 -->
	<script language="javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/ACC_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="./apps/fis/acc/inv/invoice/script/ACC_INV_0034.js?ver=<%=CLT_JS_VER%>"></script>
	<script>
		var pDoc = parent.parent.parent.document;
		hideProcess('WORKING', pDoc);
		
		function setupPage(){
			loadPage();selectSel();
		}
	</script>
	
	
	<bean:define id="valMap"  name="EventResponse" property="mapVal"/>
	<bean:define id="ofcInfo"  name="valMap" property="ofcInfo"/>
	<bean:define id="btnRole"  name="valMap" property="btnRole"/>
	
	
	<script>
		function selectSel(){
			//frm1.s_ofc_cd.value = '<bean:write name="ofcInfo" property="ofc_cd"/>';
		}

		var btn_role      = '<bean:write name="btnRole" property="attr4"/>';
	</script>
	
<form name="frm1" method="POST" action="./ACC_INV_0034.clt">
	<!--Command를 담는 공통 -->
	<input type="hidden" name="f_cmd"/>
	<input type="hidden" name="f_CurPage"/>
	
	<input type="hidden" name="f_air_sea_clss_cd" 	value=""/>
	<input type="hidden" name="f_biz_clss_cd" 		value=""/>
	<input type="hidden" name="f_bnd_clss_cd" 		value=""/>
	
	<input type="hidden" name="f_inv_seq" 			value=""/>
	<input type="hidden" name="f_inv_no" 			value=""/>
	<input type="hidden" name="f_print_type" 		value=""/>
	
	<!-- GridSetting Value -->
	<input type="hidden" name="role_cd"  value="<%=userInfo.getRole_cd()%>" />
	<input type="hidden" name="user_id"  value="<%=userInfo.getUsrid()%>" />
	<input type="hidden" name="pageurl" id="pageurl" value="ACC_INV_0034.clt"/>
	<!-- page_title_area(S)  -->
	<div class="page_title_area clear">
			<!-- page_title(S) -->
			<h2 class="page_title"><button type="button"><%=LEV3_NM%></button></h2>
			<!-- page_title(E) -->
			
			<!-- opus_design_btn(S) -->
			<div class="opus_design_btn"><!-- 
				--><button type="button" class="btn_accent" onclick="doWork('SEARCHLIST')"><bean:message key="Search"/></button><!-- 
				--><span id="saveBtn2"><button type="button" class="btn_normal" id="btnModify" onclick="doWork('MODIFY')"><bean:message key="Save"/></button></span><!-- 
				--><span id="deleteBtn2"><button type="button" class="btn_normal" id="btnDelete" onclick="doWork('DELETE')"><bean:message key="Delete"/></button></span><!-- 
				--><button type="button" class="btn_normal" onclick="doWork('GOEXP')"><bean:message key="Expense"/></button><!-- 
				--><button type="button" class="btn_normal" onclick="clearAll()"><bean:message key="Clear"/></button>
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
<div class="over_wrap" height="100%">
	<div class="wrap_search">
		<div class="opus_design_inquiry ">
			<table>
				<colgroup>
					<col width="90">
					<col width="200">
					<col width="80">
					<col width="200">
					<col width="70">
					<col width="*">
				</colgroup>
				<tbody>
				<tr>
					<th><bean:message key="Post_Date"/></th>
					<td>
						<input type="text" name="s_post_strdt" id="s_post_strdt" onKeyUp="mkDateFormatType(this, event, false,1)" onBlur="mkDateFormatType(this, event, true,1)" size='11' maxlength="10" class="search_form"><!-- 
					-->~&nbsp;<!-- 
					--><input type="text" name="s_post_enddt" id="s_post_enddt" onKeyUp="mkDateFormatType(this, event, false,1)" onBlur="mkDateFormatType(this, event, true,1)" size='11' maxlength="10" class="search_form"><!-- 
					--><button type="button" class="calendar" tabindex="-1" name="etd_dt_cal" id="s_post_dt_cal" onclick="doDisplay('DATE1', frm1);"></button>
					</td>
					<th><bean:message key="Vendor"/></th>
                    <td>
			            <input type="text" name="s_bill_to_cd" maxlength="20" value="" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:50px" onKeyDown="codeNameAction('BILLTO',this, 'onKeyDown')" onBlur="codeNameAction('BILLTO',this, 'onBlur')" class="search_form"><!-- 
			         --><button type="button" class="input_seach_btn" tabindex="-1" id="billto"  onclick="doWork('CUSTOMER_POPLIST')"></button><!-- 
			         --><input type="text" name="s_bill_to_nm" maxlength="50" value="" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:120px" onKeyDown="custEnterAction(this,'CUSTOMER')" class="search_form">
                     </td>
					<th><bean:message key="Office"/></th>
                    <td>
                           <bean:define id="oficeList" name="valMap" property="ofcList"/>
                           <select required name="s_ofc_cd" style="width:100px;"/>
                           <bean:size id="len" name="oficeList" />
                           <logic:greaterThan name="len" value="1">
                           <option value=''>ALL</option>
                           </logic:greaterThan>
                       <logic:iterate id="ofcVO" name="oficeList">
                               <option value='<bean:write name="ofcVO" property="ofc_cd"/>'><bean:write name="ofcVO" property="ofc_cd"/></option>
                       </logic:iterate>
                           </select>
                       </td>
                                   
				</tr>
				<tr>
					<th><bean:message key="Invoice_Date"/></th>
					<td>
						<input type="text" name="s_inv_strdt" id="s_inv_strdt" onKeyUp="mkDateFormatType(this, event, false,1)" onBlur="mkDateFormatType(this, event, true,1)" size='11' maxlength="10" class="search_form"><!-- 
					-->~&nbsp;<!-- 
					--><input type="text" name="s_inv_enddt" id="s_inv_enddt" onKeyUp="mkDateFormatType(this, event, false,1)" onBlur="mkDateFormatType(this, event, true,1)" size='11' maxlength="10" class="search_form"><!-- 
					--><button type="button" class="calendar" tabindex="-1" name="s_inv_dt_cal" id="s_post_dt_cal" onclick="doDisplay('DATE2', frm1);"></button>
					</td>
					<th><bean:message key="Invoice_No"/></th>
					<td>
						<input type="hidden" name="s_inv_seq">
						<input type="text" name="s_inv_no"  maxlength="50" value="" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:120px;text-transform:uppercase;" onBlur="strToUpper(this);">
					</td>
					<th><bean:message key="Amount"/></th>
					<td>
						<input type="text" name="s_amt_fr" value="" onkeyPress="onlyNumberCheck();" onchange="addComma(this);setAmount()" maxlength="13" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:100px;text-align:right;">~&nbsp;<!-- 
					--><input type="text" name="s_amt_to" value="" onkeyPress="onlyNumberCheck();" onchange="addComma(this)" maxlength="13" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:100px;text-align:right;">
					</td>
				</tr>
				</tbody>
		</table>
		</div>
	</div>
	<div class="wrap_result">
		<div class="opus_design_grid">
			<script language="javascript">comSheetObject('sheet1');</script>
			 <table>
                    <tr>
                        <td width="60">
                    <!--- Display option Begin --->
                            <bean:define id="pagingVal" name="valMap"     property="paging"/>
                            <paging:options name="pagingVal" defaultval="200"/>
                    <!--- Display option End --->                 
                        </td>
                        <td align="center">
                            <table  border="0" width="100%">
                                <tr>
                                    <td id="pagingTb" align="center" class="paging" height="10" valign="bottom"></td>
                                    <td width="60"></td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
		</div>
	</div>    
</div>
</form>
