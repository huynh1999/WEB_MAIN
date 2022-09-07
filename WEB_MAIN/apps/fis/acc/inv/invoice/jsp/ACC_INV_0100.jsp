<%--
=========================================================
*@FileName   : ACC_INV_0100.jsp
*@FileTitle  : Journal History
*@Description: Journal History
*@author     : Chungrue - Cyberlogitec
*@version    : 1.0 - 2012/02/17
*@since      : 2012/02/17

*@Change history:
=========================================================
--%>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="clt-paging"   prefix="paging" %>
	
	<base target="_self"/>
	
	<!-- 공통 Header -->
	<%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
	<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css" />
	
	<!-- 일자 및 달력팝업 호출 -->
	<script language="javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CalculationUtil.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/ACC_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="./apps/fis/acc/inv/invoice/script/ACC_INV_0100.js?ver=<%=CLT_JS_VER%>"></script>
	<script>
		var pDoc = parent.parent.parent.document;
		hideProcess('WORKING', pDoc);
		
		function setupPage(){
			loadPage();
	    }
	</script>
			
<form name="frm1" method="POST" action="./ACC_INV_0100.clt">
	<!--Command를 담는 공통 -->
	<input type="hidden" name="f_cmd"/>
	<input type="hidden" name="f_CurPage"/>
	
	<input type="hidden" name="f_inv_seq" 		value=""/>
	<div class="layer_popup_title">
		<!-- page_title_area -->
		<div class="page_title_area clear">
		   <h2 class="page_title">
				<span><bean:message key="Paid_History"/></span>
		   </h2>
		   <!-- btn_div -->
		   <div class="opus_design_btn">
			   <button type="button" class="btn_accent" onclick="doWork('CLOSE')"><bean:message key="Close"/></button>
		   </div>
		</div>
	</div>
	<div class="layer_popup_contents">
		<div class="wrap_result">	
			<div class="layout_wrap" style="width: 800px;">
			    <div style="float: left;width: 350px;">
			        <div class="opus_design_inquiry">
			        	<table border="0" cellpadding="0" cellspacing="0">
	                        <tr>
	                            <th width="110px">Bill To/Vendor :</th>
	                            <td><input type="text" name="bill_to" value="" style="width:200px;text-align:right" class="search_form-disable" readOnly></td>
	                        </tr>
	                        <tr>
	                            <th>Invoice Amount :</th>
	                            <td><input type="text" name="inv_amt" value="" style="width:200px;text-align:right" class="search_form-disable" readOnly></td>
	                        </tr>
	                        <tr>
	                            <th><bean:message key="Paid_Amount"/> :</th>
	                            <td><input type="text" name="pay_amt" value="" style="width:200px;text-align:right" class="search_form-disable" readOnly></td>
	                        </tr>
	                        <tr>
	                            <th>Due Amount :</th>
	                            <td><input type="text" name="due_amt" value="" style="width:200px;text-align:right" class="search_form-disable" readOnly></td>
	                        </tr>
	                    </table>
	                    
	                    <hr style="width: 300px;"/>
					    
					    <table border="0" cellpadding="0" cellspacing="0">
	                        <tr>
	                            <th width="110px"><bean:message key="Post_Date"/> :</th>
	                            <td>
						            <input type="text" name="post_dt" value="" style="width:200px;text-align:right" class="search_form-disable" readOnly>
	                            </td>
	                        </tr>
	                        <tr>
	                            <th>Currency :</th>
	                            <td nowrap class="table_search_body">
						            <input type="text" name="curr_cd" value="" style="width:200px;text-align:right" class="search_form-disable" readOnly>
	                            </td>
	                        </tr>
	                        <tr>
	                            <th><bean:message key="Bank_Date"/> :</th>
	                            <td><input type="text" name="clr_dt" value="" style="width:200px;text-align:right" class="search_form-disable" readOnly></td>
	                        </tr>
	                        <tr>
	                            <th><bean:message key="Bank"/> :</th>
	                            <td><input type="text" name="bank_nm" value="" style="width:200px;text-align:right" class="search_form-disable" readOnly></td>
	                        </tr>
	                        <tr>
	                            <th><bean:message key="Void_Date"/> :</th>
	                            <td><input type="text" name="void_dt" value="" style="width:200px;text-align:right" class="search_form-disable" readOnly></td>
	                        </tr>
	                        <tr>
	                            <th>Check No :</th>
	                            <td><input type="text" name="chk_no" value="" style="width:200px;text-align:right" class="search_form-disable" readOnly></td>
	                        </tr>
	                        <tr>
	                            <th><bean:message key="Payment_Total"/> :</th>
	                            <td><input type="text" name="ttl_pay_amt" value="" style="width:200px;text-align:right" class="search_form-disable" readOnly></td>
	                        </tr>
	                        <tr>
	                            <th>Remark :</th>
	                            <td><textarea name="rmk" style="width:200px;height:50;" class="search_form-disable" readOnly></textarea></td>
	                        </tr>
	                    </table>
		   			</div>
			    </div>
			    <div style="float: left;width: 450px;">
			        <!-- opus_design_grid(S) -->
			        <div class="opus_design_grid">
			            <script type="text/javascript">comSheetObject('sheet1');</script>
			        </div>
			        <!-- opus_design_grid(E) -->
			    </div>
			</div>
		</div>
	</div>
</form>
