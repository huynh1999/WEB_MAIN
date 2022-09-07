<%
/*=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : 
*@FileTitle  : 
*@author     : CLT
*@version    : 1.0
*@since      : 2014/07/25
=========================================================*/
%>
<%--
=========================================================
*@FileName   : AIE_BMD_0190.jsp
*@FileTitle  : Shipping Advice C.B(Customs Borker)
*@Description: Shipping Advice C.B(Customs Borker)
*@author     : PJK - Cyberlogitec
*@version    : 1.0 - 01/02/2012
*@since      : 01/02/2012

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
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/AIR_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/apps/fis/aie/bmd/housebl/script/AIE_BMD_0190.js?ver=<%=CLT_JS_VER%>"></script>

	<bean:define id="valMap"  name="EventResponse" property="mapVal"/>

	<script type="text/javascript">
		var usrNm = "<%= userInfo.getUser_name() %>";
		var usrPhn = "<%= userInfo.getPhn() %>";
		var usrFax = "<%= userInfo.getFax() %>";
		
		function setupPage(){
	    	loadPage();
	    }
	</script>

	<form name="frm1" method="POST" action="./">
	<!-- Report Value -->
	<input id="file_name" name="file_name" type="hidden" />
	<input id="rd_param" name="rd_param" type="hidden" />
	<input id="title" name="title" type="hidden" />

	<input id="mailTitle" name="mailTitle" value="" type="hidden" />
	<input id="mailTo" name="mailTo" value="" type="hidden" />

	<!--Command를 담는 공통 -->
	<input id="f_cmd" name="f_cmd" type="hidden" />
	<input id="f_CurPage" name="f_CurPage" type="hidden" />
	
	<!-- page_title_area(S) -->
	<div class="page_title_area">
	   <h2 class="page_title"><button type="button"><%=LEV3_NM%></button></h2>
	   <!-- btn_div -->
	   <div class="opus_design_btn">
		   <button type="button" id="btnPrint" class="btn_accent"  onclick="doWork('Print')"><bean:message key="Print"/></button>
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
		<div class="opus_design_inquiry entry_pannel ">
			<table>
					<colgroup>
						<col width="100">
						<col width="*">
					</colgroup>
					<tbody>
						<tr>
                        	<th><bean:message key="HAWB_No"/></th>
							<td><input type="text" name="f_bl_no"  maxlength="40" value="<bean:write name="valMap" property="f_bl_no"/>" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:135;text-transform:uppercase;" onblur="strToUpper(this);"/><!-- 
		                     --><button type="button" class="input_seach_btn" tabindex="-1" onClick="doPop('HBL_POPLIST')"></button></td>
                        </tr>
					</tbody>
			</table>
		</div>
	</div>
	<div class="wrap_result">
			<div class="opus_design_inquiry">
			<h3  class="title_design"><bean:message key="Basic_Information"/></h3>
				<table>
					<colgroup>
						<col width="150">
						<col width="150">
						<col width="150">
						<col width="150">
						<col width="*">
					</colgroup>
					<tbody>
						<tr>
	                        <th><bean:message key="To"/></th>
			                <td><input type="radio" name="s_to_radio" id="s_to_radio1" value="agt"><label for="s_to_radio1"><bean:message key="Agent"/></label></td>
			                <td><input type="radio" name="s_to_radio" id="s_to_radio2" value="shp" checked><label for="s_to_radio2"><bean:message key="Shipper"/></label></td>
			                <td><input type="radio" name="s_to_radio" id="s_to_radio3" value="cne"><label for="s_to_radio3"><bean:message key="Consignee"/></label></td>
			                <td><input type="radio" name="s_to_radio" id="s_to_radio4" value="ntf"><label for="s_to_radio4"><bean:message key="Notify_Party"/></label></td>
	                    </tr>
	                    <tr>
			                <td></td>
			                <td><input type="radio" name="s_to_radio" id="s_to_radio5" value="oth"><label for="s_to_radio5"><bean:message key="Other_Company"/></label></td>
			                <td colspan="3"><input type="text" name="s_trdp_cd" value="" onKeyDown="codeNameAction('trdpcode',this, 'onKeyDown')" onBlur="codeNameAction('trdpcode',this, 'onBlur')" style="width:50px" class="search_form"><!-- 
		                     --><button type="button" class="input_seach_btn" tabindex="-1" onClick="doPop('TRDP_POPLIST')"></button><!-- 
		                     --><input type="text" name="s_trdp_nm" value="" style="width:150px" onKeyPress="if(event.keyCode==13){doWork('TRDP_POPLIST');}" class="search_form"></td>
			            </tr>  
					       </tbody>
				</table>  
				<table>
			        <tr>
			            <td height="7"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"/></td>
			        </tr>
    			</table>   
				<table>
					<colgroup>
						<col width="150">
						<col width="130">
						<col width="55">
						<col width="80">
						<col width="120">
						<col width="*">
					</colgroup>
					<tbody>
							<tr>
								<th><bean:message key="Report_To_Customs"/></th>
		                        <td><input name="s_mst_cust_flg" id="s_mst_cust_flg" type="checkbox"><label for="s_mst_cust_flg"><bean:message key="Master_Customs"/></label></td>
		                        <td><bean:message key="Entry_Time"/></td>
		                        <td>
				                	<input type="text" name="s_ent_tm" value="" onkeyup="timeFormat(this)" maxlength="5" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:40px;">
				                </td>
				                <td><bean:message key="Customs_Date"/></td>
								<td><input type="text" name="s_cust_dt" id="s_cust_dt" value="<wrt:write name="valMap" property="f_bl_dt_tm" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy"/>" onKeyUp="mkDateFormatType(this, event, false,1)" onBlur="mkDateFormatType(this, event, true,1)" size='11' maxlength="10" class="search_form"><!--
								--><button type="button" id="s_cust_dt_cal" onclick="doDisplay('DATE1', frm1);" class="calendar" tabindex="-1"></button> </td>
							</tr>
					       </tbody>
				</table>
				<table>
			        <tr>
			            <td height="7"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"/></td>
			        </tr>
    			</table>      
				<table>
					<colgroup>
						<col width="150">
						<col width="*">
					</colgroup>
					<tbody>
						<tr>
                            <th><bean:message key="Attention"/></th>
                            <td><input name="s_attn" type="text" class="search_form" style="width:180;" maxlength="100" value=""/></td>
                        </tr>
			       </tbody>
				</table>     	            
			         
			               
			</div>
			</div>
    
</div>
	</form>


<script>
	var pDoc = parent.parent.parent.document;
	hideProcess('WORKING', pDoc);
</script>

