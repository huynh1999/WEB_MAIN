<%--
=========================================================
*@FileName   : AIE_BMD_0061.jsp
*@FileTitle  : 
*@Description:
*@author     : Choi,Gil-Ju - Cyberlogitec
*@version    : 1.0 - 01/09/2009
*@since      : 01/09/2009

*@Change history:
*@author     : Tuan.Chau
*@version    : 2.0 - 2014/07/25
*@since      : 2014/07/25
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
	<script language="javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/COM_FRT_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/apps/fis/see/bmd/housebl/script/BL_CODE_UTIL.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/AIR_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/apps/fis/aie/bmd/housebl/script/AIE_BMD_0061.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/cookie.js?ver=<%=CLT_JS_VER%>"></script>

	<bean:define id="hmOutParam"  name="EventResponse" property="objVal"/>
    <bean:define id="valMap" name="EventResponse" property="mapVal"/>
 <script type="text/javascript">
<!--
function setupPage() {
	loadPage();
}
//-->
</script>
<style> body { border-top-width: 6px!important; } </style>
<form name="frm1" method="POST" action="./">
	<!--Command를 담는 공통 -->
	<input type="hidden" name="f_cmd"/> 
	<input type="hidden" name="f_CurPage"/>
	
	<bean:parameter name="intg_bl_seq" id="intg_bl_seq"/>
	<bean:parameter name="biz_clss_cd" id="biz_clss_cd"/>
	<input type="hidden" name="intg_bl_seq"  value="<bean:write name="intg_bl_seq"/>">                     
	<input type="hidden" name="biz_clss_cd"  value="<bean:write name="biz_clss_cd"/>">                     
	<input type="hidden" name="hbl_cnt"  value="<bean:write name="hmOutParam" property="hbl_cnt"/>">                     
	<input type="hidden" name="mbl_pck"  value="<bean:write name="hmOutParam" property="mbl_pck_qty"/>">                     
	<input type="hidden" id="prt_option" name="prt_option" value="opt_print"/>

	<!-- ------------------------------------------------------------------------- -->
	<!-- 프린터용 -->
	<input type="hidden" name="file_name">
	<input type="hidden" name="title">
	<input type="hidden" name="rd_param">
	<input type="hidden" name="ofc_eng_nm" value="<%=userInfo.getOfc_eng_nm() %>">
	<input type="hidden" name="eml" value="<%=userInfo.getEml() %>">
	<input type="hidden" name="user_name" value="<%=userInfo.getUser_name() %>">
	<!-- ------------------------------------------------------------------------- -->
	<div class="layer_popup_title">
		<div class="page_title_area clear">
		   <h2 class="page_title"><bean:message key="Air_Label"/></h2>
		   <!-- btn_div -->
		   <div class="opus_design_btn">
			   <button type="button" class="btn_accent" onclick="doWork('PRINT')" id="btnPrint" name="btnPrint"><bean:message key="Print"/></button><!--
				--><button type="button" class="btn_accent" onclick="doWork('PREVIEW')" id="btnPreview"><bean:message key="Preview"/></button><!-- 
			   --><button type="button" class="btn_normal" onclick="doWork('CLOSE')" id="btnClose" name="btnClose"><bean:message key="Close"/></button>
		   </div>
		</div>
	</div>
	<div class="layer_popup_contents">
<div class="over_wrap" height="100%">
		<div class="wrap_search">	
			<div class="opus_design_inquiry entry_pannel ">
	            <table>
	            	<colgroup>
	            		<col width="120"></col>
	            		<col width="120"></col>
	            		<col width="*"></col>
	            	</colgroup>
	            	<tbody>
		              <tr>
		                	<td colspan="3"><h3 class="title_design"><bean:message key="Basic_Information"/></h3></td>
		              </tr>
		              <tr>
	                     	<th><bean:message key="MAWB_No"/><!-- M1234 --></th>
	                       <td colspan="2">
	                       	<input name="mbl_no" type="text" value='<bean:write name="hmOutParam" property="mbl_no"/>' maxlength="40" style="width:210px;" class="search_form-disable" readOnly>
	                       </td>
	                   </tr>
	                   <tr>
	                        <th><bean:message key="HAWB_No"/><!-- M1234 --></th>
	                        <td colspan="2">
	                        	<input name="hbl_no" type="text" value='<bean:write name="hmOutParam" property="hbl_no"/>' maxlength="40" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:210px;" class="search_form-disable" readOnly>
	                        </td>
	                    </tr>
	                    <tr>
	                        <th><bean:message key="Number_of_Total_Master_Pieces"/><!-- M1234 --></th>
	                        <td>
	                        	<input name="mbl_pck_qty" type="text" value='' maxlength="8" onkeyPress="onlyNumberCheck();" style="width:50px;text-align:right" class="search_form">
	                        </td>
	                        <th> <bean:message key="Number_of_Current_Master_Total_Pieces"/>: <bean:write name="hmOutParam" property="mbl_pck_qty"/><!-- M1234 --></th>
	                    </tr>
	                    <tr>
	                        <th><bean:message key="Number_of_Total_House_Pieces"/><!-- M1234 --></th>
	                        <td>
	                        	<input name="pck_qty" type="text" onkeyPress="onlyNumberCheck();" value='<bean:write name="hmOutParam" property="pck_qty"/>' maxlength="3" style="width:50px;text-align:right" class="search_form">
	                        </td>
	                        <th> <bean:message key="Number_of_Current_House_Total_Pieces"/>: <bean:write name="hmOutParam" property="pck_qty"/><!-- M1234 --></th>
	                    </tr>
	                    <tr>
	                        <th><bean:message key="Header_Type"/><!-- M1234 --></th>
	                        <td colspan="2">
	                        	<input type="radio" name="header_type" id="header_type1" value="AIR" checked><label for="header_type1"><bean:message key="Airline_Name"/></label>
	                        	<input type="radio" name="header_type" id="header_type2" value="NONE"><label for="header_type2"><bean:message key="None"/></label>
	                        </td>
	                    </tr>
	                    <tr>
	                        <th><bean:message key="Display_Option"/><!-- M1234 --></th>
	                        <td colspan="2">
	                        	<input type="checkbox" name="display_option" id="display_option" value="HOUSE" checked="checked"><label for="display_option"><bean:message key="Show_Number_of_Total_House_Pieces"/></label>
	                        	<input type="checkbox" name="display_option" id="display_option2" value="HAWB" checked="checked"><label for="display_option2"><bean:message key="Show_HAWB_No"/></label> 
	                        </td>
	                    </tr>
	                    <tr>
	                        <th><bean:message key="Fowarder_Name_on_LABEL"/><!-- M1234 --></th>
	                        <td colspan="2">
	                        	<input name="forwarder_name" type="text" value='<%=userInfo.getOfc_eng_nm() %>' maxlength="200" style="width:270px;" class="search_form">
	                        </td>
	                    </tr>
	            	</tbody>
	            </table>
			</div>
		</div>
    	<div style="float: right; margin-right:0; font-weight: bold;"><input type="checkbox" name="chk_auto_close" id="chk_auto_close" /><label><bean:message key="AUTO_CLOSE"/></label></div>
	</div>
</div>
</form>
<script>
	var pDoc = parent.parent.parent.document;
	hideProcess('WORKING', pDoc);
</script>




