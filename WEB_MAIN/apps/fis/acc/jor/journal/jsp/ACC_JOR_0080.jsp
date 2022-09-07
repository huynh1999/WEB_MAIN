<%--
=========================================================
*@FileName   : ACC_JOR_0080.jsp
*@FileTitle  : Batch Accounting
*@Description: Batch Accounting
*@author     : Chungrue - Cyberlogitec
*@version    : 1.0 - 2011/12/05
*@since      : 2011/12/05

*@Change history:
=========================================================
--%>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="clt-paging"   prefix="paging" %>
	<!-- 공통 Header -->
	<%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
	<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css" />
	    <title><bean:message key="system.title"/></title>
	
	<!-- 일자 및 달력팝업 호출 -->
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/CalculationUtil.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/CoFormControl.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/ACC_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="./apps/fis/acc/jor/journal/script/ACC_JOR_0080.js?ver=<%=CLT_JS_VER%>" ></script>
	<script>
		var pDoc = parent.parent.parent.document;
		hideProcess('WORKING', pDoc);
		
	</script>
	
	
	<bean:define id="valMap"  name="EventResponse" property="mapVal"/>
	<bean:define id="bankSel"  name="valMap" property="bankSel"/>
	<bean:define id="paramBankList"  name="valMap" property="bankList"/>
	
	<script>
	function setupPage(){
		loadPage();
		
	}
	</script>
	


	<form name="frm1" method="POST" action="./ACC_JOR_0080.clt">
	<!--Command를 담는 공통 -->
	<input type="hidden" name="f_cmd"/>
	<input type="hidden" name="f_CurPage"/>
	<input type="hidden" name="f_param_val"/>
	
	<input type="hidden" name="dft_rvn_bank" value='<bean:write name="valMap" property="bankSel"/>'/>
	
	<logic:iterate id="BankVO" name="paramBankList">
		<input type="hidden" name='bank_excel_form<bean:write name="BankVO" property="bank_seq"/>' value='<bean:write name="BankVO" property="clr_dt_cell"/>|<bean:write name="BankVO" property="chk_no_cell"/>|<bean:write name="BankVO" property="amt_cell"/>'>
	</logic:iterate>
   	
   	<div class="page_title_area clear">
	   <h2 class="page_title"><button type="button"><%=LEV3_NM%></button></h2>
	   <!-- btn_div -->
	   <div class="opus_design_btn TOP">
	   		<%-- 
		   <button type="button" class="btn_accent" id="btnPrint" style="display:none;" btnAuth="APPLY" onclick="doWork('COMMAND01')"><bean:message key="Apply"/></button>
		   <button type="button" class="btn_normal" id="btnPrint" style="display:none;" btnAuth="<%= roleBtnVO.getAttr6() %>" onclick="doWork('EXCEL')" name="btn_DownExcel"><bean:message key="Excel"/></button>
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
		<div class="opus_design_inquiry entry_pannel" style="width:100%">
			<table >
				<colgroup>
		        	<col width="40">
		        	<col width="*">
				</colgroup>
			    <tbody>
			    	<tr>
						<th><bean:message key="Bank"></bean:message></th>
                        <td >
                            <select name="f_bank_seq" style="width:200px;">
								<logic:iterate id="BankVO" name="paramBankList">
                           			<option value='<bean:write name="BankVO" property="bank_seq"/>'><bean:write name="BankVO" property="bank_nm"/></option>
                           		</logic:iterate>
                           	</select>
                        </td>
					</tr>
				</tbody>
			</table>
			
			
		</div>	
		</div>
	
	<!-- opus_design_grid(S) -->
	<div class="wrap_result">
	<div class="opus_design_grid clear">
	<script type="text/javascript">comSheetObject('sheet1');</script>
	<script type="text/javascript">comSheetObject('sheet2');</script>
	<table >
        <tr>
            <td height="10"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
        </tr>
    </table>
	<!-- opus_design_inquiry(S) -->
	<div class="opus_design_data">
		<table>
			<tbody>
				<colgroup>
					<col width="150" />
					<col width="120" />
					<col width="130" />
					<col width="200" />
					<col width="130" />
					<col width="120" />
					<col width="130" />
					<col width="*" />
				</colgroup>
				<tr>
					<th><bean:message key="Not_Cleared_Amount"></bean:message></th>
                    <td><input id="f_not_clr_amt" name="f_not_clr_amt" value="" style="width:100px;text-align:right;font-weight:bold" class="search_form-disable" readonly="" type="text" /></td>
					<th><bean:message key="Not_Cleared_Count"></bean:message></th>
                    <td><input id="f_not_clr_cnt" name="f_not_clr_cnt" value="" style="width:50px;text-align:right;font-weight:bold" class="search_form-disable" readonly="" type="text" /></td>
					<th><bean:message key="Cleared_Amount"></bean:message></th>
                    <td><input id="f_clr_amt" name="f_clr_amt" value="" style="width:100px;text-align:right;font-weight:bold" class="search_form-disable" readonly="" type="text" /></td>
					<th><bean:message key="Cleared_Count"></bean:message></th>
                    <td><input id="f_clr_cnt" name="f_clr_cnt" value="" style="width:50px;text-align:right;font-weight:bold" class="search_form-disable" readonly="" type="text" /></td>
				</tr>
			</tbody>
		</table>
	</div>
	</div>
	<!-- opus_design_inquiry(E) -->
</div>
</div>
</form>
	
<form name="frm2" method="POST" action="./GateServlet.gsl">
	<input id="goWhere" name="goWhere" value="fd" type="hidden" />
    <input id="bcKey" name="bcKey" value="blFileDown" type="hidden" />
    <input id="s_palt_doc_seq" name="s_palt_doc_seq" value="" type="hidden" />
    <input id="docType" name="docType" value="" type="hidden" />
</form>	

<script type="text/javascript">
doBtnAuthority("<%= roleBtnVO.getAttr_extension() %>");
</script>	
	


