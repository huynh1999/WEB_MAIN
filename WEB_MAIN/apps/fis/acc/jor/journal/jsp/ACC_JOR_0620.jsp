<%--
=========================================================
*@FileName   : ACC_JOR_0620.jsp
*@FileTitle  :  Service Contract Report
*@Description: Service Contract Report
*@author     : cej - Cyberlogitec
*@version    : 1.0 - 2016
*@since      : 2016

*@Change history:  
*@author     : cej
*@version    : 2.0 - 2016
*@since      : 2016
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
	<script language="javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/ACC_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/COM_FRT_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="./apps/fis/acc/jor/journal/script/ACC_JOR_0620.js?ver=<%=CLT_JS_VER%>" ></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/apps/fis/see/bmd/housebl/script/BL_CODE_UTIL.js?ver=<%=CLT_JS_VER%>"></script>
	
	<%
		String ofcLoclNm = userInfo.getOfc_locl_nm();
		String usrNm 	 = userInfo.getUser_name();
		String email 	 = userInfo.getEml();
		String cnt_cd 	 = userInfo.getOfc_cnt_cd();
		String ofc_eng_nm 	= userInfo.getOfc_eng_nm();
	%>
	
	<script>
		var pDoc = parent.parent.parent.document;
		hideProcess('WORKING', pDoc);
	</script>

 
<script type="text/javascript">
<!--
function setupPage() {
	loadPage();
}
var ofc_eng_nm = "<%=ofc_eng_nm%>";
var usrNm = "<%= userInfo.getUser_name() %>";
//-->
</script>
<form name="frm1" method="POST" action="./ACC_JOR_0620.clt">
	<!--Command를 담는 공통 -->
	<input type="hidden" name="f_cmd"/>
	<input type="hidden" name="f_CurPage"/>
	
	<!-- GridSetting Value -->
	<input type="hidden" name="role_cd" value="<%=userInfo.getRole_cd()%>" />
	<input type="hidden" name="user_id" value="<%=userInfo.getUsrid()%>" />
	<input type="hidden" name="ofc_nm"  value="<%=userInfo.getOfc_locl_nm()%>" />
	<input type="hidden" name="ofc_cd"  value="<%=userInfo.getOfc_cd()%>" />
	<input type="hidden" name="pageurl" id="pageurl" value="ACC_JOR_0620.clt"/>
 
	<input type="hidden" name="file_name" value="">
	<input type="hidden" name="title" value="">
	<input type="hidden" name="rd_param" value="">
	
	<!-- Button -->
	<div class="page_title_area clear">
	   <h2 class="page_title"><button type="button"><%=LEV3_NM%></button></h2>
	   <!-- btn_div -->
	   <div class="opus_design_btn TOP">
	   <%-- 
	   		<button type="button" btnAuth="<%= roleBtnVO.getAttr5() %>" class="btn_normal" onclick="doWork('PRINT')" style="display:none;"><bean:message key="Print"/></button>
	   		<button type="button"  	class="btn_normal" onclick="clearAll();"><bean:message key="Clear"/></button>
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
		<div class="opus_design_inquiry entry_pannel ">
			<table id="mainForm">
				<colgroup>
					<col width="90">
					<col width="360">
					<col width="50">
					<col width="520">
					<col width="*">
				</colgroup>
				<tbody> 
					 
					<tr>
						<th><bean:message key="Post_Date"/></th>
                        <td><input style="width:75px;" type="text" required name="f_start_date" maxlength="10" onKeyUp="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};" onBlur="chkCmprPrd(firCalFlag, false, this, this, frm1.f_start_date);firCalFlag=false;" size='11' class="search_form"><!--
                        --><span class="dash">~</span><!--
                        --><input style="width:75px;" type="text" required name="f_end_date" maxlength="10" onKeyUp="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};" onBlur=" chkCmprPrd(firCalFlag, false, this, frm1.f_end_date, this);firCalFlag=false;" size='11' class="search_form"><!--
                        --><button type="button" id="s_search_dt_cal" onclick="doDisplay('DATE1', frm1);" class="calendar" tabindex="-1"></button>
                        </td>
						<th><bean:message key="Effective_Date"/></th>
                        <td><input style="width:75px;" type="text" name="frm_dt" maxlength="10" onKeyUp="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};" onBlur="chkCmprPrd(firCalFlag, false, this, this, frm1.frm_dt);firCalFlag=false;" size='11' class="search_form"><!--
                        --><span class="dash">~</span><!--
                        --><input style="width:75px;" type="text" name="to_dt" maxlength="10" onKeyUp="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};" onBlur=" chkCmprPrd(firCalFlag, false, this, frm1.to_dt, this);firCalFlag=false;" size='11' class="search_form"><!--
                        --><button type="button" id="s_to_dt_cal" onclick="doDisplay('DATE2', frm1);" class="calendar" tabindex="-1"></button>
                        </td> 
					</tr>
					<tr>	
			    		<th><bean:message key="Service_Contract_No"/></th>
		                <td><!--
                        --><input type="text" name="f_service_contract_no" required maxlength="30" onBlur="strToUpper(this);" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:195px" class="search_form"> 
	                	</td>
						<th><bean:message key="MQC_TEU"/></th>
						<!-- #417 [ZEN] AFTER V4.2 RELEASE // SERVICE CONTRACT REPORT -->
                        <td><input type="text" name="f_mqc_teu" maxlength="30" value="0" onBlur="strToUpper(this);" dataformat="float" style="ime-mode:disabled; text-transform:uppercase;width:195px" class="search_form"> 
                        </td> 
					</tr>
					<tr>	
							<th><bean:message key="Liner"/></th>
							<!-- #417 [ZEN] AFTER V4.2 RELEASE // SERVICE CONTRACT REPORT -->
							<td><input type="text" name="lnr_trdp_cd" maxlength="20" value='' onKeyDown="lnr_trdp_nmClear();codeNameAction('trdpCode_liner_search',this, 'onKeyDown');" onBlur="lnr_trdp_nmClear();strToUpper(this);codeNameAction('trdpCode_liner_search',this, 'onBlur');" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:50px;"><!--
                            --><button type="button" name="liner" id="liner" class="input_seach_btn" tabindex="-1" onClick="doWork('CARR_TRDP_POPLIST');"></button><!--
                            --><input type="text"   name="lnr_trdp_nm" maxlength="50"  value='' onblur="strToUpper(this);" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:113px;"  onKeyPress="if(event.keyCode==13){doWork('CARR_TRDP_POPLIST', frm1.lnr_trdp_nm.value);}">
                            </td>
                            <th></th>
                            <td></td>                            
					</tr>
					<tr>	                            
      			</tbody>
			</table>
		</div>
	</div>
	
</div>
</form>
<script type="text/javascript">
	doBtnAuthority("<%= roleBtnVO.getAttr_extension() %>");
</script>


