<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
    <%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
	<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css"/>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/apps/fis/acc/inv/invoice/script/ACC_INV_0050.js?ver=<%=CLT_JS_VER%>"></script>
	
	<bean:define id="valMap"   name="EventResponse" property="mapVal"/>

<%
	String ofc_cd		= userInfo.getOfc_cd();
	String ofcLoclNm 	= userInfo.getOfc_locl_nm();
	String usrNm 		= userInfo.getUser_name();
	String ofcEngNm 	= userInfo.getOfc_eng_nm();
	String usrId		= userInfo.getUsrid();
	String usrPhn		= userInfo.getPhn();
	String usrFax		= userInfo.getFax();
	String email 		= userInfo.getEml();
	String cnt_cd 		= userInfo.getOfc_cnt_cd();
	
%>
	<bean:parameter id="f_inv_no"     name="f_inv_no" value=""/> 
	<bean:parameter id="f_print_type" name="f_print_type" value=""/> 
	<bean:parameter id="f_inv_seq"    name="f_inv_seq" value=""/> 
	<bean:parameter id="f_bl_cnt_cd"  name="f_bl_cnt_cd" value=""/> 
	<bean:parameter id="f_ref_ofc_cd" name="f_ref_ofc_cd" value=""/> 
	<bean:parameter id="f_oth_seq" 	  name="f_oth_seq" value=""/> 
	<bean:parameter id="f_trdp_cd" 	  name="f_trdp_cd" value=""/> 
	<bean:parameter id="mailTitle" 	  name="mailTitle" value=""/> 
	<bean:parameter id="mailTo" 	  name="mailTo" value=""/> 
	<script>
		function setupPage(){
			loadPage();
		}
	</script>
<style> body { border-top-width: 6px!important; } </style>
<form name="form" method="POST" action="./">
	<!-- Report Value -->
	<input	type="hidden" name="f_cmd"/> 
	<input	type="hidden" name="file_name"/> 
	<input	type="hidden" name="rd_param"/> 
	<input	type="hidden" name="f_ofc_cd" value="<%= ofc_cd %>"/>
	<input	type="hidden" name="f_usrId"  value="<%= usrId %>"/>
	<input	type="hidden" name="f_usrPhn" value="<%= usrPhn %>"/>
	<input	type="hidden" name="f_usrFax" value="<%= usrFax %>"/>
	<input	type="hidden" name="f_usr_nm" value="<%= usrNm %>"/>
	<input	type="hidden" name="f_email"  value="<%= email %>"/>
	<input	type="hidden" name="f_cnt_cd" value="<%= cnt_cd %>"/>
	<input	type="hidden" name="f_to_type"/>
	<input	type="hidden" name="cmd_type"/>
	<input	type="hidden" name="title"/>
	<input	type="hidden" name="f_ofc_loc_nm" value="<%= ofcLoclNm %>"/>
	
	<input	type="hidden" name="mailTitle" value="<bean:write name="mailTitle"/>"/>
	<input	type="hidden" name="mailTo" value="<bean:write name="mailTo"/>"/>
	
	<input	type="hidden" name="f_print_type" value="<bean:write name="f_print_type"/>"/>
	<input	type="hidden" name="f_search_type"/>
	<input	type="hidden" name="f_order_type"/>
	
	<input name="f_bl_cnt_cd"  type="hidden" value='<bean:write name="f_bl_cnt_cd"/>'>
	<input name="f_ref_ofc_cd" type="hidden" value='<bean:write name="f_ref_ofc_cd"/>'>
	<input name="f_oth_seq"    type="hidden" value='<bean:write name="f_oth_seq"/>'>
	<input name="f_trdp_cd"    type="hidden" value='<bean:write name="f_trdp_cd"/>'>
	
	<input name="h_main_trdp_cd"    type="hidden">
	<input name="h_temp_trdp_cd"    type="hidden">
	
	<!--  Report ==> OutLook연동 파라미터 (S) -->
	<input type="hidden" name="rpt_biz_tp"/>
	<input type="hidden" name="rpt_biz_sub_tp"/>
	<input type="hidden" name="rpt_trdp_cd" value='<bean:write name="f_trdp_cd"/>'/>
	<!--  Report ==> OutLook연동 파라미터 (E) -->
	
	<input name="logo1"    type="hidden" value='<bean:write name="valMap" property="logoInfo"/>'>
	
	<!-- page_title_area(S) -->
	<div class="page_title_area">
	   <h2 class="page_title"><span><bean:message key="Invoice_Print"/></span></h2>
	   <!-- btn_div -->
	   <div class="opus_design_btn">
		   <button type="button" class="btn_accent" onclick="doWork('Print')"><bean:message key="Print"/></button><!-- 
		 --><button type="button" class="btn_normal" onclick="doWork('CLOSE')"><bean:message key="Close"/></button>
	   </div>
	</div>
	<!-- wrap search(S) -->
<div class="over_wrap" height="100%">
	<div class="wrap_search">
		<div class="opus_design_inquiry ">
			<table>
				<colgroup>
					<col width="90">
					<col width="*">
				</colgroup>
				<tbody>
			        <tr>
			            <th style="text-align: left;"><input type="radio" name="prn_radio" id="prn_radio1"><label for="prn_radio1"><bean:message key="Invoice_No"/></label></th>
			            <td>
			            	<input name="f_inv_no" type="text" maxlength="50" value='<bean:write name="f_inv_no"/>' class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:155px"><!-- 
			              --><input name="f_inv_seq" type="hidden" value='<bean:write name="f_inv_seq"/>'>
			            </td>           
			        </tr>
			        <tr>
			            <th style="text-align: left;"><input type="radio" name="prn_radio" id="prn_radio2"><label for="prn_radio2"><bean:message key="Date"/></label></th>
			            <td>
			            	<input name="f_strdt" id="f_strdt" type="text" value='' class="search_form" onKeyUp="mkDateFormatType(this, event, false,1)" onBlur="mkDateFormatType(this, event, true,1)" style="width:70px">~&nbsp;<!-- 
			             --><input name="f_enddt" id="f_enddt" type="text" value='' class="search_form" onKeyUp="mkDateFormatType(this, event, false,1)" onBlur="mkDateFormatType(this, event, true,1)" style="width:70px"><!-- 
			             --><button type="button" class="calendar ir" id="f_dt_cal" onclick="doDisplay('DATE1', form);"></button>
			            </td>           
			        </tr>
		        </tbody>
		    </table>
		    	<table>
		    		<colgroup>
		    			<col width="130">
		    			<col width="*">
		    		</colgroup>
                	<tr>
                    	<td><b><bean:message key="Date_Type"/></b></td>
                    	<td><b><bean:message key="List_By"/></b></td>
                    </tr>
                    <tr>
                    	<td>
                    		<table style="width: 130px;">
                       			<tr>
                       				<td>
                       					<input type="radio" name="date_radio" id="date_radio1" value=""><label for="date_radio1"><bean:message key="Post_Date"/></label>
                       				</td>
                       			</tr>
                       			<tr>
                       				<td>
										<input type="radio" name="date_radio" id="date_radio2" value="" checked><label for="date_radio2"><bean:message key="Invoice_Date"/></label>
                       				</td>
                       			</tr>
                       		</table>
                    	</td>
                    	<td>
                    		<table style="width: 130px;">
                       			<tr>
                       				<td>
                       					<input type="radio" name="sort_radio" id="sort_radio1" value=""><label for="sort_radio1"><bean:message key="Date"/></label>
                       				</td>
                       			</tr>
                       			<tr>
                       				<td>
										<input type="radio" name="sort_radio" id="sort_radio2" value="" checked><label for="sort_radio2"><bean:message key="Number"/></label>
                       				</td>
                       			</tr>
                       		</table>
                    	</td>
                    </tr>
                </table>
		</div>
	</div>
    <input type="hidden" name="main_trdp">
</div>
</form>




