<%
/*=========================================================
 *Copyright(c) 2014 CyberLogitec
 *@FileName : SEE_BMD_0028.jsp
 *@FileTitle : Customer Contact Person
 *@author     : CLT
 *@version    : 1.0
 *@since      : 2014/06/17
 =========================================================*/
%>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="clt-paging"   prefix="paging" %>
	<%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
	<bean:define id="trdObj" name="EventResponse" property="objVal"/>

	<title><bean:message key="system.title"/></title>
	<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css" />
	<script type="text/javascript" src="<%=CLT_PATH%>/apps/fis/see/bmd/housebl/script/SEE_BMD_0028.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/SEA_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script>
		function setupPage(){
			loadPage();doWork('SEARCHLIST');
		}
	</script>
<form name="frm1" method="POST" action="./">
<input type="hidden" name="f_cmd" id="f_cmd" />
<input type="hidden" name="openMean" id="openMean" />
<input type="hidden" name="trdp_tp" id="trdp_tp" />
<input type="hidden" name="trdp_cd" id="trdp_cd" />
<input type="hidden" name="intg_bl_seq" id="intg_bl_seq" />
<!-- page_title_area(S) -->
<div class="layer_popup_title">
<div class="page_title_area clear">
	<h2 class="page_title"><span><bean:message key="Contact_Person"/></span></h2>
	   <!-- btn_div -->
	   <div class="opus_design_btn">
		   <button  type="button" class="btn_accent" onclick="doWork('MODIFY')"><bean:message key="Charge_Contact_Person"/></button><button  type="button" class="btn_normal" onclick="doWork('CLOSE')"><bean:message key="Close"/></button>
	   </div>
</div>
</div>
<!-- page_title_area(E) -->
<!-- wrap_search(S) -->
<div class="layer_popup_contents">
<div class="over_wrap" height="100%">
<div class="wrap_search">
<!-- opus_design_inquiry(S) -->
<div class="opus_design_inquiry ">
	<table>
		<tbody>
			<colgroup>
				<col width="10" />
				<col width="100" />
				<col width="100" />
				<col width="*" />
			</colgroup>
			<tr>
				<th><bean:message key="Customer"/></th>
				<td>
					<input type="text" name="s_trdp_cd" id="s_trdp_cd" value="<bean:write name="trdObj" property="trdp_cd"/>" class="search_form-disable" style="width:90px" readOnly/>
					<input type="text" name="s_trdp_nm" id="s_trdp_nm" value="<bean:write name="trdObj" property="eng_nm"/>"  class="search_form-disable" style="width:180px" readOnly/>
				</td>
				<th><bean:message key="Corporation_No"/></th>
                <td>
                    <input type="text" name="s_regno" id="s_regno" value="<bean:write name="trdObj" property="biz_no"/>" class="search_form-disable" style="width:140px" readOnly/>
                </td>
			</tr>
		</tbody>
	</table>
</div>
<!-- opus_design_inquiry(E) -->
</div>
<!-- wrap_search(E) -->

<!-- wrap_result(S) -->
<div class="wrap_result">
<!-- opus_design_grid(S) -->
<div class="opus_design_grid">
	<script type="text/javascript">comSheetObject('sheet1');</script>
</div>
<!-- opus_design_grid(E) -->
</div>
</div>
</div>
</form>

