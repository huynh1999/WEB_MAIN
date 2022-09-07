<%--=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : WHOutWorkSht.jsp
*@FileTitle  : Outbound Worksheet
*@author     : Khoa.Nguyen - DOU Network
*@version    : 1.0
*@since      : 2016/04/26
=========================================================--%>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="clt-paging"   prefix="paging" %>
<%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
	<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css"/>
    <script type="text/javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/CalculationUtil.js?ver=<%=CLT_JS_VER%>"></script>
    <script type="text/javascript" src="<%=CLT_PATH%>/js/common/ModalCalendar.js?ver=<%=CLT_JS_VER%>"></script>
    <script type="text/javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/SUP_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
    <script language="javascript" src="<%=CLT_PATH%>/apps/fis/see/bmd/housebl/script/BL_FRT.js?ver=<%=CLT_JS_VER%>"></script>
    <script language="javascript" src="<%=CLT_PATH%>/apps/fis/see/bmd/housebl/script/BL_CODE_UTIL.js?ver=<%=CLT_JS_VER%>"></script>
    <script type="text/javascript" src="apps/fis/wms/common/js/WHOutWorkSht.js?ver=<%=CLT_JS_VER%>"></script>
<%

	String wob_bk_no = "";

	try {
		wob_bk_no = request.getParameter("wob_bk_no") == null ? "" : request.getParameter("wob_bk_no");
	} catch (Exception e) {
		out.println(e.toString());
	}
%>
<script type="text/javascript">
function setupPage(){
	var errMessage = "";
	if (errMessage.length >= 1) {
		ComShowMessage(errMessage);
	} // end if
	loadPage(true);
}
</script>
<form id="form" name="form">
	<input type="hidden" name="paper_size" id="paper_size" value="<%-- <%=userInfo.getPaper_size()%> --%>" />
	<input type="hidden" name="f_cmd" id="f_cmd" value="" />
	<input type="hidden" id="title" name="title" value=""/>
	<input type="hidden" id="file_name" name="file_name" value=""/>
	<input type="hidden" id="rd_param" name="rd_param" value=""/>
	<div class="page_title_area clear">
		<h2 class="page_title">
			<span><bean:message key="Outbound_Worksheet"/></span>
		</h2>
		<div class="opus_design_btn">
			<button type="button" class="btn_accent" name="btnSave" id="btnSave" onClick="doWork('SAVE');"><bean:message key="Save"/></button><!--
			--><button type="button" class="btn_normal" name="btnDelete" id="btnDelete" onClick="doWork('DELETE');"><bean:message key="Delete"/></button><!--
			 --><button type="button" class="btn_normal" name="btnPrint" id="btnPrint" onClick="doWork('PRINT');"><bean:message key="Print"/></button><!-- 
			 --><button type="button" class="btn_normal" name="btnClose" id="btnClose" onClick="doWork('CLOSE');"><bean:message key="Close"/></button>
		</div>
	</div>
	<div class="wrap_search">
		<div class="opus_design_inquiry sm ">			
			<table>
			    <colgroup>
                    <col width="50" />
                    <col width="300" />
                    <col width="50" />
                    <col width="*" />
                </colgroup>
                <tr>
			        <th><bean:message key="Order_No"/></th>
			        <td colspan="3">
			        	<input name="cust_ord_no" id="cust_ord_no" type="text" readonly tabindex="-1" />
			        	<input name="wob_bk_no" id="wob_bk_no" type="hidden" value="<%=wob_bk_no%>"/>	
			        	<input type="hidden" name="work_sht_yn" id="work_sht_yn" />
			        	<input type="hidden" name="wh_cd" id="wh_cd" />			     
			        </td>   
		        </tr>                
				<tr>
					<th><bean:message key="Supervisor"/></th>
					<td>
						<input name="supv_nm" id="supv_nm" type="text" required maxlength="100" style="ime-mode:disabled;text-transform:uppercase;" dataformat="excepthan" onblur="strToUpper(this);"/>
					</td>
					<th><bean:message key="Working_by"/></th>
					<td>
						<input name="work_by" id="work_by" type="text" maxlength="100" style="ime-mode:disabled;text-transform:uppercase;width: 100%" dataformat="excepthan" onblur="strToUpper(this);"/>
					</td>  					                                        
				</tr>
				<tr>
					<th><bean:message key="Working"/><br/><bean:message key="Instruction"/></th>
					<td colspan="3">
						<textarea name="msg_to_work" id="msg_to_work" style="height:50px" maxlength="100" dataformat="excepthan" onblur="strToUpper(this);"></textarea>				 
					</td>
                </tr>      
				<!-- <tr><td colspan="4"><p class="line_bluedot"></p></td></tr>
                <tr>					
	                <th>Print Size</th>
					<td>
						<script language="javascript" type="text/javascript">comComboObject('print_size_tp', 1, 120, 1);</script>
					</td>      
				</tr> -->
			</table>
		</div>
		<div class="opus_design_grid clear"  style="display:none;">
			<script type="text/javascript">comSheetObject('sheet1');</script>
		</div>
		<div id="printArea" name="printArea"></div>
	</div>
	<div id="COMPLETE_IMG" style="position:fixed;display:none; filter:alpha(opacity = 100); width:280px;height:60px;top:50%;left:50%;margin:-30px 0 0 -140px;z-index:999">
		<iframe src='<%=CLT_PATH%>/js/common/completed.html' scrolling='no'  style='margin-top: 0px; width:100%; height: 60px;'></iframe>
</div>
</form>