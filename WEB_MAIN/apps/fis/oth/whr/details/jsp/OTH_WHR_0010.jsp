<%--
=========================================================
*@FileName   : OTH_WHR_0010.jsp
*@FileTitle  : Warehouse Receipts Entry
*@Description: Warehouse Receipts Entry
*@author     : Chungrue - Cyberlogitec
*@version    : 1.0 - 2011/11/03
*@since      : 2011/11/03

*@Change history:
*@author     : Tuan.Chau
*@version    : 2.0 - 2014/06/19
*@since      : 2014/06/19
=========================================================
--%>
<%@page import="java.util.HashMap"%>
<%@page import="com.clt.framework.core.layer.event.EventResponse"%>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="clt-paging"   prefix="paging" %>
	<!-- 공통 Header -->
	<%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
	<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css" />
	    <title><bean:message key="system.title"/></title>
	    
	<!-- 일자 및 달력팝업 호출 -->
	<script language="javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CoFormControl.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CoBizCommon.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CalculationUtil.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/SUP_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/COM_FRT_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/apps/fis/oth/whr/details/script/OTH_WHR_0010.js?ver=<%=CLT_JS_VER%>"></script>
	<!-- 2016-12-21 자동완성 기능 추가 S -->	
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/autocomplete_ui.js?ver=<%=CLT_JS_VER%>"></script>
	<!-- 2016-12-21  자동완성 기능 추가 E -->	
	<%@ page import="com.clt.syscommon.response.CommonEventResponse"%>
	
	<%
		String ofc_cd		= userInfo.getOfc_cd();
		String ofc_eng_nm = userInfo.getOfc_eng_nm();
		String usrNm = userInfo.getUser_name();
		String email = userInfo.getEml();
		
	%>

	<script>
		var pDoc = parent.parent.parent.document;
		hideProcess('WORKING', pDoc);

		var usrPhn = "<%= userInfo.getPhn() %>";
		var usrFax = "<%= userInfo.getFax() %>";
		var usrEml = "<%= userInfo.getEml() %>";
	</script>
	
	<bean:define id="hmOutParam"  name="EventResponse" property="objVal"/>
    <bean:define id="valMap" name="EventResponse" property="mapVal"/>
	<bean:define id="ofcVO" 		name="valMap" property="ofcInfo"/>
	
	
	<script>
	var AUTOCOMPLETE_YN = 'N';
	 
	<logic:notEmpty name="valMap" property="autocompleteYn">
    	AUTOCOMPLETE_YN = '<bean:write name="valMap" property="autocompleteYn"/>';
	</logic:notEmpty>
	 
		function setSelect(){
			var formObj = document.frm1;
			formObj.f_recp_usrid.value = '<bean:write name="hmOutParam" property="recp_usrid"/>';
			if('Y' == '<bean:write name="hmOutParam" property="hz_good"/>') {
				formObj.f_hz_good.checked = "Y";
			}

			formObj.f_curr_cd.value = '<bean:write name="hmOutParam" property="curr_cd"/>';

			if('<bean:write name="hmOutParam" property="wh_recp_no"/>' == ""){
				formObj.f_curr_cd.value = '<bean:write name="ofcVO" property="trf_cur_cd"/>';
			}	
			
			if('CM' == '<bean:write name="hmOutParam" property="len_ut_cd"/>') {
				formObj.f_len_ut_cd[0].checked = "Y";
			}else{
				formObj.f_len_ut_cd[1].checked = "Y";
			}
			
			
			//TERM_CD 셋팅
			/*
			formObj.f_terms.value   = '<bean:write name="hmOutParam" property="term_cd"/>';
			formObj.f_term_dt.value = '<bean:write name="hmOutParam" property="term_dt"/>';
			
			if(formObj.f_intg_bl_seq.value != "" || formObj.f_oth_seq.value != ""){
				if(formObj.f_terms[0].selected){
					//formObj.f_due_dt.value = f_inv_dt;
				}else{
					
					if(formObj.f_inv_seq.value != ""){
						formObj.f_terms[0].selected = true;
					}else{
						calcCreateTerms();
					}
					
				}
			}
			*/
			
		}
		
		
		
		
		<!-- ###Freight 항목### -->
		var UNITCD1 = '';
		var UNITCD2 = '';
		<!-- Freight Unit 단위 -->
        <logic:notEmpty name="valMap" property="UNITCD">
			<% boolean isBegin = false; %>
            <bean:define id="unitList" name="valMap" property="UNITCD"/>
            <logic:iterate id="codeVO" name="unitList">
                <% if(isBegin){ %>
                    UNITCD1+= '|';
                    UNITCD2+= '|';
                <% }else{
                      isBegin = true;
                   } %>
                UNITCD1+= '<bean:write name="codeVO" property="pck_nm"/>';
                UNITCD2+= '<bean:write name="codeVO" property="pck_ut_cd"/>';
            </logic:iterate>
        </logic:notEmpty>
        
	</script>
<script>
function setupPage(){
	loadPage();
	setSelect();
}
</script>
	<form name="frm1" method="POST" action="./OTH_WHR_0010.clt">

	<!--Command를 담는 공통 -->
	<input type="hidden" name="f_cmd"/>
	<input type="hidden" name="f_save_sts_flg"/>
	<input type="hidden" name="f_CurPage"/>
	
	<input type="hidden" name="trdp_cd"/>
	<input type="hidden" name="f_intg_bl_seq" 		value="<bean:write name="hmOutParam" property="intg_bl_seq"/>"/>
	<input type="hidden" name="f_oth_seq" 			value="<bean:write name="hmOutParam" property="oth_seq"/>"/>
	<!--  input type="hidden" name="f_bl_no" 			value=""/ -->
	<input type="hidden" name="f_air_sea_clss_cd" 	value="<bean:write name="hmOutParam" property="air_sea_clss_cd"/>"/>
	<input type="hidden" name="f_biz_clss_cd" 		value="<bean:write name="hmOutParam" property="biz_clss_cd"/>"/>
	<input type="hidden" name="f_bnd_clss_cd" 		value="<bean:write name="hmOutParam" property="bnd_clss_cd"/>"/>
	<input type="hidden" name="f_inv_seq"	 		value="<bean:write name="hmOutParam" property="inv_seq"/>"/>
	
	<input type="hidden" name = "f_frgn_curr_cd">
	<input type="hidden" name = "f_frgn_amt">
	<input type="hidden" name = "f_frgn_vat_amt">
	<input type="hidden" name = "f_frgn_sum_amt">
	<input type="hidden" name = "f_curRow">
	
	<input type="hidden" name = "temp_bl_no" value="<bean:write name="hmOutParam" property="bl_no"/>"/>
	<input type="hidden" name = "temp_oth_no" value="<bean:write name="hmOutParam" property="oth_no"/>"/>
	<input type="hidden" name = "temp_inv_no" value="<bean:write name="hmOutParam" property="inv_no"/>"/>
	
	<input type="hidden" name = "f_old_sum_amt">

	<!-- ------------------------------------------------------ -->
	<!-- 세션 유저 정보    -->
	<input	type="hidden" name="f_usr_nm" value="<%= usrNm %>"/>
	<input	type="hidden" name="f_email" value="<%= email %>"/>
	<input	type="hidden" name="f_ofc_cd" value="<%= ofc_cd %>"/>
	<input	type="hidden" name="f_ofc_nm" value="<%= ofc_eng_nm %>"/>
	<!-- ------------------------------------------------------ -->
	
	<!-- ------------------------------------------------------ -->
	<!-- 프린트용    -->
	<input type="hidden" name="file_name">
	<input type="hidden" name="title">
	<input type="hidden" name="rd_param">
	
	<input type="hidden" name="t_wh_recp_no" value='<bean:write name="hmOutParam" property="wh_recp_no"/>' >

	<input type="hidden" name="old_recp_no" value="<bean:write name="hmOutParam" property="wh_recp_no"/>"/>
	
	<!-- ------------------------------------------------------ -->
	
    <!-- Button -->
	<div class="page_title_area clear">
	   <h2 class="page_title"><button type="button"><%=LEV3_NM%></button></h2>
	   <!-- btn_div -->
	   <div class="opus_design_btn TOP">
<%-- 		   <button type="button" btnAuth="HBL" class="btn_accent" onclick="doWork('GO_HBL')" style="display:none;"><bean:message key="HBL"/></button><!-- 
		--><button type="button" btnAuth="<%= roleBtnVO.getAttr2() %>" 	class="btn_normal" onclick="doWork('NEW')" style="display:none;"><bean:message key="New"/></button><!-- 
		--><button id="btnModify" type="button" btnAuth="<%= roleBtnVO.getAttr3() %>" 	class="btn_normal" onclick="doWork('MODIFY')" style="display:none;"><bean:message key="Save"/></button><!-- 
		--><button id="btnDelete" type="button" btnAuth="<%= roleBtnVO.getAttr4() %>" 	class="btn_normal" onclick="doWork('DELETE')" style="display:none;"><bean:message key="Delete"/></button><!-- 
		--><button id="btnPrint" type="button" btnAuth="<%= roleBtnVO.getAttr5() %>" 	class="btn_normal" onclick="doWork('PRINT')" style="display:none;"><bean:message key="Print"/></button>
 --%>	   </div>
	   
	   <!-- btn_div -->
	   <div class="location">
		   <span><%=LEV1_NM%></span> &gt;
		   <span><%=LEV2_NM%></span> &gt;
		   <span><%=LEV3_NM%></span>
		   <a href="" class="ir">URL Copy</a>
	   </div>
	</div>
	<!-- Search option -->
<div class="over_wrap" height="100%">
    <div class="wrap_search">	
		<div class="opus_design_inquiry entry_pannel ">
			<table>
            	<colgroup>
            		<col width="130"></col>
            		<col width="*"></col>
            	</colgroup>
            	<tbody>
					<tr>
						<th><bean:message key="Warehouse_Receipt_No"/></th>
						<td>
							<input type="text" name="f_wh_recp_no" maxlength="20"  value='<bean:write name="hmOutParam" property="wh_recp_no"/>' onKeyPress="ComKeyOnlyAlphabet('uppernum', '40|41|44|46|47|91|93')" onBlur="checkDuplicateReceiptNo();javascript:this.value=this.value.toUpperCase();" dataformat="excepthan" style="ime-mode:disabled;width:235px;text-transform:uppercase;">
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
	
	<div class="wrap_result">	
		<div class="opus_design_inquiry">
            <table>
            	<colgroup>
            		<col width="130"></col>
            		<col width="250"></col>
            		<col width="130"></col>
            		<col width="*"></col>
            	</colgroup>
            	<tr>
                  <th><bean:message key="W/H_Location"/></th>
                  <td><!-- 
				  --><input type="text" name="f_wh_cd" maxlength="20" required value="<bean:write name="hmOutParam" property="wh_cd"/>" onKeyDown="codeNameAction('trdpcode_warehouse',this, 'onKeyDown')" onBlur="strToUpper(this);codeNameAction('trdpcode_warehouse',this, 'onBlur')" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:75px"><!-- 
				  --><button type="button" class="input_seach_btn" tabindex="-1" id="billto" onclick="doWork('WH_POPLIST')"></button><!-- 
				  --><input type="text" name="f_wh_nm" required maxlength="50" value="<bean:write name="hmOutParam" property="wh_nm"/>" onBlur="strToUpper(this);"  dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:135px" onKeyPress="if(event.keyCode==13){doWork('WH_POPLIST_NAME');}" ><!-- 
				  --></td>
                  
                  <th><bean:message key="Carrier"/><!--M1234--></th>
                  <td><input type="text" name="f_del_carrier" maxlength="50" value='<bean:write name="hmOutParam" property="del_carrier"/>' onBlur="strToUpper(this);" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:245px;text-align:left" ></td>
              	</tr>
              	<tr>
                    <th><bean:message key="Received_Date_Time"/><!--M1234--></th>
                    <td><!-- 
				    --><input type="text" required name="f_recp_dt" id="f_recp_dt" value='<wrt:write name="hmOutParam" property="recp_dt" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy"/>'  maxlength="10" onkeyPress="onlyNumberCheck();mkDateFormatType(this, event, false,1)" onKeyUp="onlyNumberCheck();mkDateFormatType(this, event, false,1)" onBlur="onlyNumberCheck();mkDateFormatType(this, event, true,1);dateRangeValid(this, 'Received Date/Time');"  style="width:75px;"><!-- 
				    --><button type="button" id="f_recp_dt_cal" onclick="doDisplay('DATE1', frm1);" class="calendar" tabindex="-1"></button><!-- 
				    --><input type="text" required name="f_recp_tm" value='<wrt:write name="hmOutParam" property="recp_tm" formatType="DATE" fromFormat="HHmm" format="HH:mm"/>' maxlength="4"   style="width:50px;" onchange="timeCheck(this);" onkeypress="onlyNumberCheck();"></td>
                    <th><bean:message key="Trucking_Company"/><!--M1234--></th>
                    <td><input type="text" name="f_del_by" maxlength="50" value='<bean:write name="hmOutParam" property="del_by"/>' onBlur="strToUpper(this);" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:245px;text-align:left" ></td>
                </tr>
                
                <tr>
                    <th><bean:message key="Received_By"/><!--M1234--></th>
                    <td><!-- 
				    --><input type="text" name="f_recp_usrid" value="<bean:write name="hmOutParam" property="recp_usrid"/>"  dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:75px;" maxlength="12" onKeyDown="codeNameAction('user',this, 'onKeyDown')" onBlur="codeNameAction('user',this, 'onBlur')"><!-- 
				    --><button type="button" class="input_seach_btn" tabindex="-1" onclick="doWork('RECP_USER_POPLIST')"></button><!-- 
				    --><input type="text" name="f_recp_usrnm" value='<bean:write name="hmOutParam" property="recp_usrnm"/>' class="search_form-disable" onBlur="" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:137px;text-align:left" readOnly></td>
                    
                    <th><bean:message key="Amount"/><!--M1234--></th>
                    <td ><!-- 
				    --><input type="text" name="f_ttl_amt" value='<bean:write name="hmOutParam" property="ttl_amt"/>'  onkeyPress="onlyNumberCheck('.');" onkeyUp="onlyNumberCheck('.');" onchange="onlyNumberCheck('.');numberCommaLen(this,8,2);chkComma(this,8,2);" onBlur="onlyNumberCheck('.');numberCommaLen(this,8,2);chkComma(this,8,2);"  maxlength="13" dataformat="excepthan" style="ime-mode:disabled;width:175px;text-align:right"><!-- 
				    --><select name="f_curr_cd" style="width:65px;"><!-- 
				    --><bean:define id="paramCurrList"  name="valMap" property="currList"/><!-- 
				    --><logic:iterate id="CurrVO" name="paramCurrList"><!-- 
				    --><option value='<bean:write name="CurrVO"/>'><bean:write name="CurrVO"/></option><!-- 
				    --></logic:iterate><!-- 
				    --></select></td>
                </tr>
                <tr>
                   <th><bean:message key="Trucking_Filing_No"/><!--M1234--></th>
                   <td><input type="text" name="f_trk_bl_no" maxlength="20" value="<bean:write name="hmOutParam" property="trk_bl_no"/>" onBlur="strToUpper(this);" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:245px" ></td>
                   <th><bean:message key="Check_No"/><!--M1234--></th>
                   <td><input type="text" name="f_check_no" maxlength="20" value='<bean:write name="hmOutParam" property="check_no"/>' onBlur="strToUpper(this);" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:245px;text-align:left" ></td>
               </tr>
               <tr>
                   <th>Location<!--M1234--></th>
                   <td><input type="text" name="f_loc_nm" maxlength="50" value="<bean:write name="hmOutParam" property="loc_nm"/>" onBlur="strToUpper(this);" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:245px" ></td>
                   <th><bean:message key="PO_No"/><!--M1234--></th>
                   <td><input type="text" name="f_po_no" maxlength="20" value='<bean:write name="hmOutParam" property="po_no"/>' onBlur="strToUpper(this);" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:245px;text-align:left" ></td>
               </tr>
               <tr>
                  <th><bean:message key="Maker"/><!--M1234--></th>
                  <td><!-- 
				    --><input type="text" name="f_maker_cd" maxlength="20"  value="<bean:write name="hmOutParam" property="maker_cd"/>" onKeyDown="codeNameAction('trdpcode_maker',this, 'onKeyDown')" onBlur="strToUpper(this);codeNameAction('trdpcode_maker',this, 'onBlur')" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:75px" ><!-- 
				    --><button type="button" class="input_seach_btn" tabindex="-1" id="billto" onClick="doWork('MAKER_POPLIST')"></button><!-- 
				    --><input type="text" name="f_maker_nm" maxlength="50" value="<bean:write name="hmOutParam" property="maker_nm"/>" onBlur="strToUpper(this);" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:135px" onKeyPress="if(event.keyCode==13){doWork('MAKER_POPLIST_NAME');}" ></td>
                  
                  <th><bean:message key="Commodity"/><!--M1234--></th>
                  <td ><!-- 
				    --><input type="text" name="f_cmdt_cd" maxlength="12" value='<bean:write name="hmOutParam" property="cmdt_cd"/>'  dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:75px;" onKeyDown="codeNameAction('commodity',this, 'onKeyDown')" onBlur="strToUpper(this);codeNameAction('commodity',this, 'onBlur')"><!-- 
				    --><button type="button" class="input_seach_btn" tabindex="-1" onclick="doWork('COMMODITY_POPLIST')"></button><!-- 
				    --><input type="text" name="f_cmdt_nm" value='<bean:write name="hmOutParam" property="cmdt_nm"/>'  maxlength="300" onBlur="strToUpper(this);" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:137px;" onKeyPress="if(event.keyCode==13){doWork('COMMODITY_POPLIST_NAME');}"></td>
              </tr>
              <tr>
                  <th><bean:message key="Shipper"/><!--M1234--></th>
                  <td><!-- 
				    --><input type="text" name="f_shpr_cd" maxlength="20" value="<bean:write name="hmOutParam" property="shpr_cd"/>" onKeyDown="codeNameAction('trdpcode_shipper',this, 'onKeyDown')" onBlur="strToUpper(this);codeNameAction('trdpcode_shipper',this, 'onBlur')" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:75px" ><!-- 
				    --><button type="button" class="input_seach_btn" tabindex="-1" id="billto" onClick="doWork('SHIPPER_POPLIST')"></button><!-- 
				    --><input type="text" name="f_shpr_nm" maxlength="50" value="<bean:write name="hmOutParam" property="shpr_nm"/>" onBlur="strToUpper(this);"  dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:135px" onKeyPress="if(event.keyCode==13){doWork('SHIPPER_POPLIST_NAME');}" ></td>
                  
                  <th><label for="f_hz_good"><bean:message key="Hazardous_Goods"/></label><!--M1234--></th>
                  <td><input name="f_hz_good" id="f_hz_good" type="checkbox" value="Y"></td>
              </tr>
              <tr>
                  <th><bean:message key="Consignee"/><!--M1234--></th>
                  <td><!-- 
				    --><input type="text" name="f_cnee_cd" maxlength="20" value="<bean:write name="hmOutParam" property="cnee_cd"/>" onKeyDown="codeNameAction('trdpcode_consignee',this, 'onKeyDown')" onBlur="strToUpper(this);codeNameAction('trdpcode_consignee',this, 'onBlur')" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:75px" ><!-- 
				    --><button type="button" class="input_seach_btn" tabindex="-1" id="billto" onClick="doWork('CONSIGNEE_POPLIST')"></button><!-- 
				    --><input type="text" name="f_cnee_nm" maxlength="50" value="<bean:write name="hmOutParam" property="cnee_nm"/>" onBlur="strToUpper(this);"  dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:135px" onKeyPress="if(event.keyCode==13){doWork('CONSIGNEE_POPLIST_NAME');}" ></td>
                  
                  <th><bean:message key="Operator"/><!--M1234--></th>
                  <td><!-- 
				    --><input type="text" name="f_op_useid" maxlength="12" value="<bean:write name="hmOutParam" property="op_useid"/>"  dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:75px;" onKeyDown="codeNameAction('usergs',this, 'onKeyDown')" onBlur="codeNameAction('usergs',this, 'onBlur')"><!-- 
				    --><button type="button" class="input_seach_btn" tabindex="-1" id="billto" onClick="doWork('USER_POPLIST')"></button><!-- 
				    --><input type="text" name="f_op_usenm" value="<bean:write name="hmOutParam" property="op_usenm"/>" class="search_form-disable" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:137px;text-align:left" readOnly></td>
              </tr>
              <tr>
	           	 <td></td>
              	 <td></td>
             	 <th><bean:message key="HBL_No"/><!--M1234--></th>
                 <td ><input type="text" name="f_bl_no" maxlength="20" value='<bean:write name="hmOutParam" property="bl_no"/>' onBlur="strToUpper(this);" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:245px;text-align:left" ></td>
              </tr>
              <tr>
                  <th><bean:message key="Remark"/></th>
                  <td colspan="3"><textarea name="f_rmk" maxlength="200"  onBlur="strToUpper(this);" dataformat="excepthan" style="width:500px;height:50px;"><bean:write name="hmOutParam" property="rmk"/></textarea></td>
              </tr>
          </table>
   </div>
   		<div class="opus_design_grid">
   			<input type="hidden" name="size_ut_cd1" value="<bean:write name="hmOutParam" property="size_ut_cd"/>"/>
			<input type="radio" name="f_len_ut_cd" id="f_len_ut_cd1" value="CM" onClick="javascript:chkSizeType();"><label for="f_len_ut_cd1"><bean:message key="Cm"/></label>&nbsp;&nbsp;&nbsp;<!-- 
			    --><input type="radio" name="f_len_ut_cd" id="f_len_ut_cd2" value="INCH" onClick="javascript:chkSizeType();"><label for="f_len_ut_cd2"><bean:message key="Inch"/></label>
	   		<div class="opus_design_btn">
	   			<button id="rowAddBtn" type="button" class="btn_normal" onclick="doWork('ROWADD')"><bean:message key="Add"/></button>
	   		</div>
	   		<script type="text/javascript">comSheetObject("sheet1");</script>
	   		<script language="javascript">comSheetObject('sheet2');</script>
   		</div>
	   <div class="opus_design_inquiry">
	   		<table>
	   			<colgroup>
	   				<col width="230px"></col>
	   				<col width="30px"></col>
	   				<col width="40px"></col>
	   				<col width="70px"></col>
	   				<col width="65px"></col>
	   				<col width="65px"></col>
	   				<col width="65px"></col>
	   			</colgroup>
				<tr>
					<th>Total</th>
					<th></th>
                    <td><input type="text" name="f_pck_qty_tot" value="" style="width:40px;text-align:right" class="search_form-disable" readOnly> PCS</td>
					<td></td>
                    <td><input type="text" name="f_wgt_k_tot" value="" style="width:65px;text-align:right" class="search_form-disable" readOnly> KG&nbsp;&nbsp;&nbsp;&nbsp;</td>
                    <td><input type="text" name="f_wgt_l_tot" value="" style="width:65px;text-align:right" class="search_form-disable" readOnly> LB&nbsp;&nbsp;&nbsp;&nbsp;</td>
                    <td><input type="text" name="f_meas_tot" value="" style="width:65px;text-align:right" class="search_form-disable" readOnly> CBM&nbsp;&nbsp;&nbsp;&nbsp;</td>
                    <td>&nbsp;&nbsp;&nbsp;Total Actual Weight(KG) <input type="text" name="f_act_wgt_tot" value="" style="width:65px;text-align:right" class="search_form-disable" readOnly></td>
				</tr>
			</table>
	   </div>
	</div>
</div>
</form>
  
<script type="text/javascript">
var attr_extension = "<%= roleBtnVO.getAttr_extension() %>";
doBtnAuthority(attr_extension);
</script>	


