<%--
=========================================================
*Copyright(c) 2015 DOU Networks. All Rights Reserved.
*@FileName   : MonthlyStorageRpt.js
*@FileTitle  : Monthly Storage Report
*@author     : Vinh Vo - DOU
*@version    : 1.0 - 07/17/2015
*@since      : 07/17/2015

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
	<script language="javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/MDM_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/apps/fis/wms/whinventory/script/MonthlyStorageRpt.js?ver=<%=CLT_JS_VER%>"></script>
	
<%

//UserInfoDto userInfo = (UserInfoDto) session.getAttribute("AbstractAccountInfo");
// UserInfoDto userInfo = null;
String CLT_PATH = ".";


String loc_cd 		= "";
String loc_nm 		= "";
try {
	loc_cd  	= request.getParameter("loc_cd")== null?"":request.getParameter("loc_cd");
	loc_nm  	= request.getParameter("loc_nm")== null?"":request.getParameter("loc_nm");
}catch(Exception e) {
	out.println(e.toString());
}


%>
	<bean:define id="cdMap"  name="EventResponse" property="mapVal"/>
<script type="text/javascript">
function setupPage() {
	loadPage();
	//loaddata();
}
</script>

<form name="frm1" method="POST" >
	<!--Command를 담는 공통 -->
	<input type="hidden" name="f_cmd"/> 
	<input type="hidden" name="out_cnt" value="0" /> 
	<input type="hidden" name="def_wh_cd" value="<%=userInfo.getDef_wh_cd()%>" />
	<input type="hidden" name="def_wh_nm" value="<%=userInfo.getDef_wh_nm()%>" />
	<input type="hidden" name="def_wh_ctrt_no" value="<%=userInfo.getDef_wh_ctrt_no()%>" />
	<input type="hidden" name="def_wh_ctrt_nm" value="<%=userInfo.getDef_wh_ctrt_nm()%>" />
	<input type="hidden" name="user_id" value="<%=userInfo.getUsrid()%>" />
	<input type="hidden" name="org_cd" value="<%=userInfo.getOfc_cd()%>" />
	<input type="hidden" name="user_id" id="user_id"  value="<%=userInfo.getUsrid()%>" />
	<input type="hidden" name="pageurl" id="pageurl" value="MonthlyStorage.clt"/>
    <!-- Button -->
	<div class="page_title_area clear">
	   <h2 class="page_title" id='bigtitle'><button type="button"><%=LEV3_NM%></button></h2>
	   <!-- btn_div -->
	   <div class="opus_design_btn TOP">
<%-- 	   <!--
	   --><button type="button" class="btn_accent" onclick="doWork('CREATE')" style="display:none;" btnAuth="CREATE" ><bean:message key="Create"/></button><!--
	   --><button type="button" class="btn_normal" onClick="doWork('SEARCH')" style="display:none;" btnAuth="<%= roleBtnVO.getAttr1() %>" ><bean:message key="Search"/></button><!--
	   --><button type="button" class="btn_normal" onclick="doWork('EXCEL')" style="display:none;" btnAuth="<%= roleBtnVO.getAttr6() %>" ><bean:message key="Excel"/></button>
 --%>	   
	   </div>
	   <!-- btn_div -->
	  
	   <div class="location">
		   <span><%=LEV1_NM%></span> &gt;
		   <span><%=LEV2_NM%></span> &gt;
		   <span><%=LEV3_NM%></span>
	   </div>
	</div>
	
	<!-- Search option -->
	<div class="over_wrap" height="100%">
    <div class="wrap_search">	
		<div class="opus_design_inquiry ">
			<table>
				<colgroup>
					<col width="80"></col>
					<col width="230"></col>
					<col width="100"></col>
					<col width="280"></col>
					<col width="120"></col>
					<col width="*"></col>
				</colgroup>
				<tbody>
					<tr>
                    	<th><bean:message key="Warehouse"/></th>
						<td>
							<bean:define id="MsList" name="cdMap" property="warehouse"/>
							<select name="wh_cd" id="wh_cd" class="search_form" style="width: 180px;" required>
								<option value=""></option>
								<logic:iterate id="codeVO" name="MsList">
									<option value='<bean:write name="codeVO" property="wh_cd"/>'><bean:write name="codeVO" property="wh_nm"/></option>
								</logic:iterate>
							</select>
						</td>
                        <th><bean:message key="Contract_No1"/></th>
						<td><!--
                        --><input type="text" name="ctrt_no" dataformat ="engup" otherchar = "-_" style="text-transform:uppercase;width:80px;" onkeydown="if(event.keyCode==13){getCtrtInfo(this, frm1.ctrt_nm);}" onblur="getCtrtInfo(this, frm1.ctrt_nm);" required><!--
                        --><button type="button" class="input_seach_btn" tabindex="-1" id="pod" onclick="doWork('CTRT_POPLIST')"></button><!--
                        --><input name="ctrt_nm" type="text"  dataformat="engup" otherchar = " ()-_" style="text-transform:uppercase;width:120px;text-align:left" required>
                        </td>
						<th><bean:message key="Storage_Month"/></th>
						<td><input name="rpt_fr_dt" id="rpt_fr_dt" type="text" class="L_input"  maxlength="10" style="width:75px;" 
						onblur="chkCmprPrd(firCalFlag, false, this, this, form.rpt_to_dt);firCalFlag=false;" 
						onKeyUp="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};"
						onkeypress="onlyNumberCheck();" onkeyup="mkDateFormatType(this, event, false,1)" required/><span class="dash">~</span><!--
						--><input name="rpt_to_dt" id="rpt_to_dt" type="text" class="L_input"  maxlength="10" style="width:75px;" 
						onblur="chkCmprPrd(firCalFlag, false, this, form.rpt_fr_dt, this);firCalFlag=false;" 
						onKeyUp="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};"
						onkeypress="onlyNumberCheck();" onkeyup="mkDateFormatType(this, event, false,1)" required/><!--
						--><button class="calendar" tabindex="-1" type="button" name="btn_date" id="btn_date" onclick="doDisplay('DATE11' ,frm1,frm1.rpt_fr_dt,frm1.rpt_to_dt);"></button>
						</td>
                    </tr>
				</tbody>
			</table>
		</div>
	</div>
	
	<div class = "wrap_result">
		<div class = "opus_design_grid">
			<script type="text/javascript">comSheetObject('sheet1');</script>
		</div>
	</div>
	</div>
</form>

<script type="text/javascript">
var attr_extension = "<%= roleBtnVO.getAttr_extension() %>";
doBtnAuthority(attr_extension);
</script>