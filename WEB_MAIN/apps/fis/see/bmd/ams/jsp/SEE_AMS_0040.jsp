<%--
=========================================================
*@FileName   : SEE_AMS_0040.jsp
*@FileTitle  : SmartLink AMS Detail
*@Description: SmartLink AMS Detail
*@author     : OJG
*@version    : 
*@since      : 

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
	<script language="javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CalculationUtil.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="./apps/fis/see/bmd/ams/script/SEE_AMS_0040.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/SEA_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	
	<bean:define id="mblVo"   name="EventResponse" property="objVal"/>
	<bean:define id="valMap"  name="EventResponse" property="mapVal"/>
	<script>
		function setupPage()
		{
			initFinish();loadPage();
		}
	</script>
<form name="frm1" method="POST" action="./SEE_AMS_0040.clt">
	<input type="hidden" name="f_cmd">
    <input type="hidden" name="f_CurPage"> 
    <div class="layer_popup_title">
	<!-- page_title_area(S) -->
	<div class="page_title_area clear">
		<!-- page_title(S) -->
		<h2 class="page_title"><span id="title">AMS Master B/L</span></h2>
		<!-- page_title(E) -->
		
		<!-- opus_design_btn(S) -->
		<div class="opus_design_btn">
			<button type="button" class="btn_accent"  onclick="ComClosePopup();"><bean:message key="Close"/></button>
		</div>
		<!-- opus_design_btn(E) -->
	<!-- page_title_area(E) -->
	</div>
	</div>	
	<div class="layer_popup_contents">
	<!-- wrap_search(S) -->
<div class="over_wrap" height="100%">
	<div class="wrap_search">
		<div class="opus_design_inquiry ">
			<table>
				<colgroup>
					<col width="150">
					<col width="200">
					<col width="100">
					<col width="*">
				</colgroup>
				<tbody>
	                <tr>
	                	<th><bean:message key="AMS_User"/></th>
	                    <td>
	                    	<bean:write name="mblVo" property="cust_id"/>
	                    </td>
	                    <th><bean:message key="POL"/></th>
	                    <td>
	                    	<input type="text" name="h_pol_ams"  value='<bean:write name="mblVo" property="h_pol_ams" /> ' class="search_form-disable" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:50px;" /><!-- 
	                    --><input type="text" name="pol_nm"  value='<bean:write name="mblVo" property="pol_nm"/>' class="search_form-disable" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:150px;" />
	                    </td>
	                </tr>
	                
	                <tr>
	                	<th><bean:message key="MBL_No"/></th>
	                    <td>
	                    	<input type="text" name="refnbr"  value='<bean:write name="mblVo" property="refnbr"/>' class="search_form-disable" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:150px;" />
	                    </td>
	                    <th><bean:message key="ETD"/></th>
	                    <td>
	                    	<input type="text" name="h_pol_etd"  value='<wrt:write name="mblVo" property="h_pol_etd"  formatType="DATE" fromFormat="yyyyMMdd" format="MM-dd-yyyy"/>'  class="search_form-disable" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:80px;" />
	                    </td>
	                    <td></td>
	                </tr>
	                
	                <tr>
	                	<th><bean:message key="Vessel_Voyage"/></th>
	                    <td>
	                    	<input type="text" name="vsl_fullname"  value='<bean:write name="mblVo" property="vsl_fullname"/>' class="search_form-disable" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:150px;" />&nbsp;<!-- 
	                    --><input type="text" name="vsl_voyage"  value='<bean:write name="mblVo" property="vsl_voyage"/>' class="search_form-disable" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:60px;" />
	                    </td>
	                    <th><bean:message key="POD"/></th>
	                    <td>
	                    	<input type="text" name="pod_ams"  value='<bean:write name="mblVo" property="pod_ams"/>' class="search_form-disable" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:50px;" /><!-- 
	                    --><input type="text" name="pod_nm"  value='<bean:write name="mblVo" property="pod_nm"/>' class="search_form-disable" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:150px;" />
	                    </td>
	                </tr>
	                
	                <tr>
	                	<th><bean:message key="Vessel_Flag"/></th>
	                    <td>
	                    	<input type="text" name="vsl_flag"  value='<bean:write name="mblVo" property="vsl_flag"/>' class="search_form-disable" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:40px;" />
	                    </td>
	                    <th><bean:message key="ETA"/></th>
	                    <td>
	                    	<input type="text" name="pod_eta"  value='<wrt:write name="mblVo" property="pod_eta"  formatType="DATE" fromFormat="yyyyMMdd" format="MM-dd-yyyy"/>' class="search_form-disable" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:80px;" />
	                    </td>
	                    <td></td>
	                </tr>
	                
	                <tr>
	                	<td></td>
	                    <td>
	                    	<bean:write name="mblVo" property="cust_id"/>
	                    </td>
	                    <th><bean:message key="SCAC"/></th>
	                    <td>
	                    	<input type="text" name="scac"  value='<bean:write name="mblVo" property="scac"/>' class="search_form-disable" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:50px;" /><!-- 
	                    --><input type="text" name="carr_nm"  value='<bean:write name="mblVo" property="carr_nm"/>' class="search_form-disable" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:150px;" />
	                    </td>
	                </tr>
                </tbody>
            </table>
		</div>
	</div>
	<!-- wrap_search(E) -->
	<!-- wrap_result(S) -->
	<div class="wrap_result">
		<div class="opus_design_grid">
			<script language="javascript">comSheetObject('sheet1');</script>
		</div>
	</div>
	</div>
	<!-- wrap_result(E) -->
</div>
  </form>

