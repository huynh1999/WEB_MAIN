<%--
=========================================================
*@FileName   : SEE_AMS_0030.jsp
*@FileTitle  : SmartLink AMS Download
*@Description: SmartLink AMS Download
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
	<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css" />
	<title><bean:message key="system.title"/></title>
	<!-- 일자 및 달력팝업 호출 -->
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/CalculationUtil.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="./apps/fis/see/bmd/ams/script/SEE_AMS_0030.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/SEA_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<bean:define id="valMap"  name="EventResponse" property="mapVal"/>

	<%
		String ofc_cd		= userInfo.getOfc_cd();
		String ofc_eng_nm 	= userInfo.getOfc_eng_nm();
		String usrNm 		= userInfo.getUser_name();
		String phn 			= userInfo.getPhn();
		String fax 			= userInfo.getFax();
		String email 		= userInfo.getEml();
	%>
<script type="text/javascript">
<!--
function setupPage(){
	loadPage();
}
//-->
</script>
	<form name="frm1" method="POST" action="./SEE_AMS_0030.clt">
	<input type="hidden" name="f_cmd" id="f_cmd" />
    <input type="hidden" name="f_CurPage" id="f_CurPage" />

	<!-- ------------------------------------------------------ -->
	<!-- 세션 유저 정보    -->
	<input type="hidden" name="f_usr_nm" value="<%= usrNm %>" id="f_usr_nm" />
	<input type="hidden" name="f_phn" value="<%= phn %>" id="f_phn" />
	<input type="hidden" name="f_fax" value="<%= fax %>" id="f_fax" />
	<input type="hidden" name="f_email" value="<%= email %>" id="f_email" />
	<input type="hidden" name="f_ofc_nm" value="<%= ofc_eng_nm %>" id="f_ofc_nm" />
	<!-- ------------------------------------------------------ -->

    <input type="hidden" name="file_name" id="file_name" />
	<input type="hidden" name="title" id="title" />
	<input type="hidden" name="rd_param" id="rd_param" />
	<input type="hidden" name="mailTitle" value="" id="mailTitle" />
	<input type="hidden" name="mailTo" value="" id="mailTo" />

	<!--  Report ==> OutLook연동 파라미터 (S) -->
	<input type="hidden" name="rpt_biz_tp" id="rpt_biz_tp" />
	<input type="hidden" name="rpt_biz_sub_tp" id="rpt_biz_sub_tp" />
	<input type="hidden" name="rpt_trdp_cd" id="rpt_trdp_cd" />
	<!--  Report ==> OutLook연동 파라미터 (E) -->

	<input type="hidden" name="intg_bl_seq" value="" id="intg_bl_seq" />
	<input type="hidden" name="rlt_intg_bl_seq" value="" id="rlt_intg_bl_seq" />
	<input type="hidden" name="s_intg_bl_seq" value="" id="s_intg_bl_seq" />
	<input type="hidden" name="master_bl_no" value="" id="master_bl_no" />
	<input type="hidden" name="house_bl_no" value="" id="house_bl_no" />

	<!-- GridSetting Value -->
	<input type="hidden" name="user_id" value="<%=userInfo.getUsrid()%>" id="user_id" />
	<input type="hidden" name="pageurl" id="pageurl" value="SEE_AMS_0010.clt" />
<!-- page_title_area(S) -->
	<div class="page_title_area clear ">
		<!-- page_title(S) -->
		<h2 class="page_title"><button type="button"><%=LEV3_NM%></button></h2>
		<!-- page_title(E) -->
			
		<!-- opus_design_btn(S) -->
		<div class="opus_design_btn TOP">
			<%-- 
			<button type="button" class="btn_accent" btnAuth="<%= roleBtnVO.getAttr1() %>" onclick="document.forms[0].f_CurPage.value='';doWork('SEARCHLIST')" id="btnSearch" name="btnSearch" style="display:none;"><bean:message key="Search"/></button>
			<button type="button" class="btn_normal" style="display:none;" btnAuth="VERIFY" onclick="document.forms[0].f_CurPage.value='';doWork('VERIFY')"><bean:message key="Verify"/></button>
			<button type="button" class="btn_normal" style="display:none;" btnAuth="CREATE_BL" onclick="document.forms[0].f_CurPage.value='';doWork('CREATE_BL')"><bean:message key="Create_BL"/></button>
			<button type="button" class="btn_normal" style="display:none;" btnAuth="MASTER_HISTORY_PRINT" onclick="document.forms[0].f_CurPage.value='';doWork('MASTER_HISTORY_PRINT')"><bean:message key="Master_History_Print"/></button>
			<button type="button" class="btn_normal" style="display:none;" btnAuth="HISTORY_PRINT" onclick="document.forms[0].f_CurPage.value='';doWork('HISTORY_PRINT')"><bean:message key="History_Print"/></button>
			<button type="button" class="btn_normal" style="display:none;" btnAuth="HISTORY_PRINT" onclick="document.forms[0].f_CurPage.value='';doWork('CARGO_TRACKING')"><bean:message key="Tracking"/></button>
			<button type="button" class="btn_normal" onclick="document.forms[0].f_CurPage.value='';doWork('VIEW_AMS_MBL')">View AMS MBL</button>
			<button type="button" class="btn_normal" onclick="document.forms[0].f_CurPage.value='';doWork('VIEW_AMS_HBL')">View AMS HBL</button>
			 --%>
		</div>
		
		<!-- opus_design_btn(E) -->	
		    <!-- page_location(S) -->
		<div class="location">
        <!-- location 내용 동적생성 (별도 코딩 불필요) -->
			<span><%=LEV1_NM%></span> &gt;
		    <span><%=LEV2_NM%></span> &gt;
		    <span><%=LEV3_NM%></span>
		    <a href="" class="ir">URL Copy</a>
		</div>
	</div>
    <!-- page_location(E) -->
<!-- page_title_area(E) -->
<div class="over_wrap" height="100%">
<div class= "wrap_search">
		<div class= "opus_design_inquiry entry_pannel">
		<table>
			<colgroup>
				<col width="110">
				<col width="150">
				<col width="100">
				<col width="180">
				<col width="120">
				<col width="210">
  				<col width="80">
				<col width="*">
			</colgroup>
			<tbody>
               <tr>
                 <th><bean:message key="Download_Status"/></th>
                 <td><!--
                 --><select name="f_dl_sts" style="width:140px"><!--
                 --><option value="">All</option><!--
                 --><bean:define id="dlStsList" name="valMap" property="dlStsList"/><!--
                 --><logic:iterate id="dlStsVO" name="dlStsList"><!--
                 --><option value='<bean:write name="dlStsVO" property="cd_val"/>'><bean:write name="dlStsVO" property="cd_nm"/></option><!--
                 --></logic:iterate><!--
                 --></select></td>
                 <th><bean:message key="Download_Date"/></th>
                 <td><!--
                 --><input style="width:75px;" type="text" name="f_dnld_strdt" onKeyUp="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};" onBlur="chkCmprPrd(firCalFlag, false, this, this, frm1.f_dnld_enddt);firCalFlag=false;" size='11' maxlength="10" class="search_form"><!--
                 --><span class="dash">~</span><!--
                 --><input style="width:75px;" type="text" name="f_dnld_enddt" onKeyUp="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};" onBlur="chkCmprPrd(firCalFlag, false, this, frm1.f_dnld_strdt, this);firCalFlag=false;" size='11' maxlength="10" class="search_form"><!--
                 --><button type="button" class="calendar ir" name="btn_calendar" id="f_dnld_dt_cal" onclick="doDisplay('DATE1', frm1);"></button></td>
				
				<th><bean:message key="Shipper"/></th>
                <td><input type="text"   name="f_shpr_nm" value='' onblur="strToUpper(this)" style="width:195px;text-transform:uppercase;" onkeydown="entSearch();" ></td>
                <th><bean:message key="Consignee"/></th>
                <td><input type="text"   name="f_cnee_nm" value='' onblur="strToUpper(this)" style="width:203px;text-transform:uppercase;"  onkeydown="entSearch();"></td>
               </tr>
               
               <tr>
                 <th><bean:message key="HBL_No"/></th>
                 <td><input type="text" name="f_hbl_no" maxlength="40" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:140px;"  onkeydown="entSearch();" /></td>
                      
                 <th><bean:message key="ETD"/></th>
                 <td><!--
                 --><input style="width:75px;" type="text" name="f_etd_strdt" onKeyUp="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};" onBlur="chkCmprPrd(firCalFlag, false, this, this, frm1.f_etd_enddt);firCalFlag=false;" size='11' maxlength="10" class="search_form"><!--
                 --><span class="dash">~</span><!--
                 --><input style="width:75px;" type="text" name="f_etd_enddt" onKeyUp="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};" onBlur="chkCmprPrd(firCalFlag, false, this, frm1.f_etd_strdt, this);firCalFlag=false;" size='11' maxlength="10" class="search_form"><!--
                 --><button type="button" class="calendar ir" name="btn_calendar" id="etd_dt_cal" onclick="doDisplay('DATE2', frm1);"></button></td>
				
                 <th><bean:message key="POL"/></th>
                 <td><!--
                 --><input type="text" name="f_pol_cd" maxlength="5" value='' onKeyDown="codeNameAction('location_pol',this, 'onKeyDown')" onBlur="codeNameAction('location_pol',this, 'onBlur');" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:55px;"/><!--
                 --><button type="button" name="btns_search1"  class="input_seach_btn" tabindex="-1" onclick="doWork('POL_LOCATION_POPLIST')"></button><!--
                 --><input type="text" name="f_pol_nm" maxlength="50"dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:107px;" onKeyPress="if(event.keyCode==13){doWork('POL_LOCATION_POPLIST', frm1.f_pol_nm.value);}"/></td>
                      
                 <th><bean:message key="POD"/></th>
                 <td><!--
                 --><input type="text" name="f_pod_cd" maxlength="5" value='' onKeyDown="codeNameAction('location_pod',this, 'onKeyDown')" onBlur="codeNameAction('location_pod',this, 'onBlur');" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:55px;"/><!--
                 --><button type="button" name="btns_search1"  class="input_seach_btn" tabindex="-1" onclick="doWork('POD_LOCATION_POPLIST')"></button><!--
                 --><input type="text" name="f_pod_nm" maxlength="50"dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:115px;" onKeyPress="if(event.keyCode==13){doWork('POD_LOCATION_POPLIST', frm1.f_pod_nm.value);}"/></td>
              </tr>
              <tr>
               	 <th><bean:message key="MBL_No"/></th>
                 <td><input type="text" name="f_mbl_no" maxlength="40" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:140px;"  onkeydown="entSearch();"/></td>
                 <th><bean:message key="ETA"/></th>
                 <td><!--
                 --><input style="width:75px;" type="text" name="f_eta_strdt" onKeyUp="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};" onBlur="chkCmprPrd(firCalFlag, false, this, this, frm1.f_eta_enddt);firCalFlag=false;" size='11' maxlength="10" class="search_form"><!--
                 --><span class="dash">~</span><!--
                 --><input style="width:75px;" type="text" name="f_eta_enddt" onKeyUp="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};" onBlur="chkCmprPrd(firCalFlag, false, this, frm1.f_eta_strdt, this);firCalFlag=false;" size='11' maxlength="10" class="search_form"><!--
                 --><button type="button" class="calendar ir" name="btn_calendar" id="eta_dt_cal" onclick="doDisplay('DATE3', frm1);"></button></td>
                 <th><bean:message key="Vessel_Voyage"/></th>
                 <td><!--
                 --><input type="text" name="f_trnk_vsl" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:140px;"onblur="strToUpper(this)"  onkeydown="entSearch();" /><!--
                 --><input type="text" name="f_trnk_voy" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:51px;" onblur="strToUpper(this)"  onkeydown="entSearch();" /></td>
                 <!-- /* #1309-[BINEX] OI AMS LIST TO HAVE "AGENT ID" SEARCH FIELD */ -->
                 <th><bean:message key="Agent_ID"/></th>
                 <td><!--
                 --><input type="text" name="f_agent_id" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:203px;"onblur="strToUpper(this)"  onkeydown="entSearch();" /></td>
			</tr>
			<tr>
				 <th><bean:message key="Ref_No"/></th>
                 <td><input type="text" name="f_ref_no" maxlength="40" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:140px;"  onkeydown="entSearch();"/></td>
                 <th><bean:message key="Container_No"/></th>
                 <td><input type="text" name="f_cntr_no" maxlength="40" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:194px;"  onkeydown="entSearch();" /></td>
                      
                 <th><bean:message key="Customer_Ref_No"/></th>
                 <td ><input type="text" name="f_cust_ref_no" maxlength="30" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:140px;"  onkeydown="entSearch();"/></td>
                 <!-- <th><bean:message key="Office"/></th> -->
                 <!-- <td><input type="text" name="f_ofc_cd" maxlength="30" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:174px;"  onkeydown="entSearch();"/><!--
                 --><!-- <button type="button" name="btns_search1"  class="input_seach_btn" tabindex="-1" onclick="doWork('OFFICE_POPLIST')"></button></td> -->
			</tr>
		</tbody>
	</table>
</div>
</div>		
<div class="wrap_result">			
<h3 class="title_design">Ocean Import AMS Download</h3>
	<div class="opus_design_grid">	
		<table class = "sm">
		 <tr height="20" >
               	 <th width="150" class="table_search_head">
                       <bean:message key="Current_Status_BG_Color"/>
                    </th>
                     
                    <th bgcolor="#8BBDFF" width="70" class="table_search_head">
                       <bean:message key="Download"/>
                    </th>
                    <th bgcolor="#FAED7D" width="80" class="table_search_head">
                       <bean:message key="BL_Created"/>
                    </th>
                    <th bgcolor="#FFA7A7" width="50" class="table_search_head">
                       <bean:message key="Error"/>
                    </th>
                    <th width="30"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"/></th>
                    
                    
                    <th width="135" class="table_search_head">
                       <bean:message key="Load_Status_BG_Color"/>
                    </th>
                    <th bgcolor="#E4F7BA" class="table_search_head">
                    	<bean:message key="Load_to_OK_1Y"/>
                    </th>
                    <th bgcolor="#CEF76E" class="table_search_head">
                    	<bean:message key="OK_to_Load"/>
                    </th>
                    <th bgcolor="#FFFFA1" class="table_search_head">
                    	<bean:message key="Do_Not_Load"/>
                    </th>
                    <th bgcolor="#FF9090" class="table_search_head">
                    	<bean:message key="Deleted"/>
                    </th>
                    <th bgcolor="#DB9CFF" class="table_search_head">
                    	<bean:message key="Amended"/>
                    </th>
                    <th bgcolor="#FFA9FF" class="table_search_head">
                    	<bean:message key="Hold"/>
                    </th>
                    <th bgcolor="#5AB1C0" class="table_search_head">
                    	<bean:message key="Rejected"/>
                    </th>
               </tr>
            </table>  
		<script type="text/javascript">comSheetObject('sheet1');</script>
	</div>
</div>                               
</div>
    </form>
    

<form name="frm2" method="POST" target="result" action="http://www.e-smartlink.com/ws/svcblock.do">
	<input type="hidden" name="svcTpCd" value="01" id="svcTpCd" />
	<input type="hidden" name="blNo" value="" id="blNo" />
	<input type="hidden" name="scacCd" value="" id="scacCd" />
	<input type="hidden" name="blockFlg" value="" id="blockFlg" />
</form>    
  
<script type="text/javascript">
doBtnAuthority("<%= roleBtnVO.getAttr_extension() %>");
</script>	
	    
<iframe name = "result0" src='' scrolling='no' frameborder='0' style='margin-top:0px;width:0px; height:0px; border:none;display:block'>
</iframe>

<%
	for(int i=1; i<100; i++){
%>
	<iframe name = "result<%=i%>" src='' scrolling='no' frameborder='0' style='margin-top:0px;width:0px; height:0px; border:none;display:block'>
	</iframe>
<%
	}
%>

</body>

<%@page import="java.net.URLEncoder"%></html>

