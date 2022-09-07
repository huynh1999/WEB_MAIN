<%--
=========================================================
*@FileName   : ACC_SLP_0030.jsp
*@FileTitle  : Slip List
*@Description: Slip List
*@author     : Chungrue - Cyberlogitec
*@version    : 1.0 - 2012/01/19
*@since      : 2012/01/19

*@Change history:
=========================================================
--%>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@ page import="com.clt.apps.opusbase.utils.LoginUserUtil,com.clt.apps.opusbase.login.dto.UserInfoVO"%>
<%@ page import="java.util.ArrayList,com.clt.apps.opusbase.system.role.dto.RoleBtnVO"%>
<%@ taglib uri="clt-paging"   prefix="paging" %>
	<!-- 공통 Header -->
	<%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
	<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css" />
	    <title><bean:message key="system.title"/></title>
	
	<!-- 일자 및 달력팝업 호출 -->
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/ACC_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="./apps/fis/acc/slp/slip/script/ACC_SLP_0030.js?ver=<%=CLT_JS_VER%>"> </script>
	<script>
		var pDoc = parent.parent.parent.document;
		hideProcess('WORKING', pDoc);

	</script>
	
	
	
	<%
		/*
		ArrayList aList = (ArrayList)LoginUserUtil.getRoleBtnInfo(request);
		
		String btnRole = "";
		for(int i=0;i<aList.size();i++){
			roleBtnVO = (RoleBtnVO)aList.get(i);
			if(roleBtnVO.getPgm_mnu_nm().equals("Slip List")){
				btnRole = roleBtnVO.getAttr4();
			}
		}
		System.out.println("btnRole :"+btnRole);
		*/
	%>
	
	
	<bean:define id="valMap"   name="EventResponse" property="mapVal"/>
	<bean:define id="bankSel"  name="valMap" property="bankSel"/>
	<bean:define id="ofcInfo"  name="valMap" property="ofcInfo"/>
	<bean:define id="btnRole"  name="valMap" property="btnRole"/>
	<bean:define id="slip_post"  name="valMap" property="slip_post"/>
	
	<script>
		function setSelection(){
			//frm1.s_ofc_cd.value = '<bean:write name="ofcInfo" property="ofc_cd"/>';
		}
		
		var btn_role      = '<bean:write name="btnRole" property="attr4"/>';

		var ofcCd = "<%= userInfo.getOfc_cd() %>";
		var usrNm = "<%= userInfo.getUser_name() %>";
		
		//#1280 [UFF] To be able to print multiple Journal Entries from Journal List
		var ofcLoclNm ="<%= userInfo.getOfc_locl_nm()%>";
		var ofcEngNm  ="<%= userInfo.getOfc_eng_nm() %>";
		var ofcCurrCd ="<%= userInfo.getOfc_curr_cd() %>";
		
	</script>
	
	<script>
	function setupPage(){
		loadPage();
		setSelection();
	}
	</script>
<form name="frm1" method="POST" action="./ACC_SLP_0030.clt">
	<!--Command를 담는 공통 -->
	<input type="hidden" name="f_cmd"/>
	<input type="hidden" name="f_CurPage"/>
	<input type="hidden" name="slip_post_dt" value="<bean:write name="slip_post"/>"/>
	
	<input type="hidden" name="file_name"/>
	<input type="hidden" name="rd_param"/>
	<input type="hidden" name="title"/>
	
	<input type="hidden" name="user_id"  value="<%=userInfo.getUsrid()%>" />
	
	<div class="page_title_area clear">
	   <h2 class="page_title"><button type="button"><%=LEV3_NM%></button></h2>
	   <!-- btn_div -->
	   <div class="opus_design_btn TOP">
	   		<%-- 
            <button type="button" class="btn_accent" style="display: none;" btnAuth="<%= roleBtnVO.getAttr1() %>" onclick="doWork('SEARCHLIST')"><bean:message key="Search"/></button> 
			<button type="button" class="btn_normal" style="display: none;" btnAuth="<%= roleBtnVO.getAttr2() %>" onclick="doWork('NEW')"><bean:message key="New"/></button>
			<button type="button" class="btn_normal" id="btnPrint" style="display: none;" btnAuth="<%= roleBtnVO.getAttr5() %>" onclick="doWork('PRINT')"><bean:message key="Print"/></button> 
			<button type="button" class="btn_normal" style="display: none;" btnAuth="CLEAR" onclick="clearAll();"><bean:message key="Clear"/></button>
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
	
	<!-- opus_design_inquiry(S) -->
<div class="over_wrap" height="100%">
	<div class="wrap_search">
		<div class="opus_design_inquiry entry_pannel ">
			<table>
				<colgroup>
						<col width="80">
						<col width="200">
						<col width="80">
						<col width="230">
						<col width="55">
						<col width="100">
						<!-- #904   [SBM] Journal List 조회 조건 확인 및 수정  -->
						<!-- col width="40">
						<col width="100"-->
						
						<col width="40">
						<col width="*">
					</colgroup>
				<tbody>
					<tr>
						<th><bean:message key="Post_Date"></bean:message></th>
						<td><!-- 
						--><input style="width: 70px;" id="s_post_strdt" name="s_post_strdt" onkeyup="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};" onblur="chkCmprPrd(firCalFlag, false, this, this, form.s_post_enddt);firCalFlag=false;" onFocus="select();" size="11" maxlength="10" class="search_form" type="text" /><span class="dash">~</span><!-- 
						--><input style="width: 70px;" id="s_post_enddt" name="s_post_enddt" onkeyup="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};" onblur="chkCmprPrd(firCalFlag, false, this, form.s_post_strdt, this);firCalFlag=false;" onFocus="select();" size="11" maxlength="10" class="search_form" type="text" /><!-- 
						--><button class="calendar ir" onclick="doDisplay('DATE1', frm1);" name="s_post_dt_cal" id="s_post_dt_cal" type="button"></button>
						</td>
                        <th><bean:message key="Slip_No"></bean:message></th>
						<td><input id="s_acct_slip_no" maxlength="20" name="s_acct_slip_no" class="search_form" onkeydown="entSearch();" onblur="strToUpper(this);" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:183px;" type="text" /></td>
                        
						<th><bean:message key="Branch"></bean:message></th>
                        <td>
                            <bean:define id="oficeList" name="valMap" property="ofcList"/>
                            <select required name="s_ofc_cd" style="width:100px;">

                            <bean:size id="len" name="oficeList" />
                            <logic:greaterThan name="len" value="1">
                            	<option value=''>ALL</option>
                            </logic:greaterThan>

	                        <logic:iterate id="ofcVO" name="oficeList">
	                            <logic:equal name="ofcVO" property="ofc_cd" value="<%= userInfo.getOfc_cd()%>" >
	                            <option selected="selected"  value='<bean:write name="ofcVO" property="ofc_cd"/>'><bean:write name="ofcVO" property="ofc_cd"/></option>
	                         	</logic:equal>
	                         	<logic:notEqual name="ofcVO" property="ofc_cd" value="<%= userInfo.getOfc_cd()%>" >
	                            <option value='<bean:write name="ofcVO" property="ofc_cd"/>'><bean:write name="ofcVO" property="ofc_cd"/></option>
	                         	</logic:notEqual>
	                        </logic:iterate>
                            </select>
                        </td>

						<!-- #2696 [BINEX] GENERAL JOURNAL FILTER BY YEAR END PROCESSED DATA -->
						<!-- Source hidden & default  'SL' -->
						<th style="display:none"><bean:message key="Source"></bean:message></th>
                        <td class="table_search_body"style="display:none">
                            <select name="s_type" style="width:100px;">
                            	<option value="">ALL</option>
                                <option value="SL" selected>SL</option>
                                <option value="AR">AR</option>
                                <option value="CD">CD</option>
                                <option value="AP">AP</option>
                                <option value="DP">DP</option>
                                <option value="CK">CK</option>
                            </select>
                        </td>
					</tr>
					<tr>
						<th><bean:message key="Invoice_Date"></bean:message></th>
						<td >
							<input style="width: 70px;" type="text" name="s_inv_strdt" onKeyUp="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};" onBlur="chkCmprPrd(firCalFlag, false, this, this, frm1.s_inv_enddt);firCalFlag=false;" size='11' maxlength="10" class="search_form"><span class="dash">~</span><!-- 
							--><input style="width: 70px;" type="text" name="s_inv_enddt" onKeyUp="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};" onBlur="chkCmprPrd(firCalFlag, false, this, frm1.s_inv_strdt, this);firCalFlag=false;" size='11' maxlength="10" class="search_form"><!-- 
							--><button class="calendar ir" onclick="doDisplay('DATE2', frm1);" name="s_inv_dt_cal" id="s_inv_dt_cal" type="button"></button>
						</td>

						<th><bean:message key="Amount"></bean:message></th>
						<td><input id="s_amt_fr" name="s_amt_fr" value="" onkeypress="onlyNumberCheck('-');" onkeyup="if(event.keyCode==13){firAmtFlag=true;};" onblur="chkCmprAmt(firAmtFlag, false, this, this, frm1.s_amt_to);firAmtFlag=false;" onchange="addComma(this);" maxlength="13" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:100px;text-align:right;" type="text" /><span class="dash">~</span><!-- 
							--><input id="s_amt_to" name="s_amt_to" value="" onkeypress="onlyNumberCheck('-');" onkeyup="if(event.keyCode==13){firAmtFlag=true;};" onblur="chkCmprAmt(firAmtFlag, false, this, frm1.s_amt_fr, this);firAmtFlag=false;" onchange="addComma(this);" maxlength="13" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:100px;text-align:right;" type="text" /></td>

						<th><bean:message key="Type"></bean:message></th>
                        <td width="120" class="table_search_body">
                        <bean:define id="partyList"  name="valMap" property="partyList"/>
                            <select name="s_com_tp" style="width:100px;">
                            	<option value=''>ALL</option>                          
                            	<logic:iterate id="codeVO" name="partyList">                            	
                                <option value='<bean:write name="codeVO" property="cd_val"/>'><bean:write name="codeVO" property="cd_nm"/></option>
                            	</logic:iterate>
                            </select>
                            <input id="s_com_nm" maxlength="20" name="s_com_nm" class="search_form" onkeydown="entSearch();" onblur="strToUpper(this);" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:183px;" type="text" />
                        </td>
						<!-- #904   [SBM] Journal List 조회 조건 확인 및 수정  -->
						<!-- th><bean:message key="IF"></bean:message></th>
                        <td width="70" class="table_search_body">
                            <select name="s_if_yn" style="width:60px;">
                            	<option value="">ALL</option>
                                <option value="Y">Y</option>
                                <option value="N">N</option>
                            </select>
                        </td -->

						<th><bean:message key="Deleted"></bean:message></th>
                        <td width="" class="table_search_body">
                            <select name="s_del_yn" style="width:60px;">
                            	<option value="">ALL</option>
                                <option value="Y">Y</option>
                                <option value="N" selected>N</option>
                            </select>
                        </td>

					</tr>
				</tbody>
			</table>
			<!-- 
			<table>
				<colgroup>
					<col width="80" />
					<col width="*" />
					
				</colgroup>
				<tbody>
					<tr>
						<th><bean:message key="Slip_No"></bean:message></th>
						<td><input id="s_acct_slip_no" maxlength="20" name="s_acct_slip_no" class="search_form" onkeydown="entSearch();" onblur="strToUpper(this);" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:183px;" type="text" /></td>
					</tr>
				</tbody>
			</table>
			 -->
		</div>
	</div>
	<div class="wrap_result">
    		<div class="opus_design_grid" >
    			<script type="text/javascript">comSheetObject('sheet1');</script>
    		</div>
    	</div>
	<script type="text/javascript">
	doBtnAuthority("<%= roleBtnVO.getAttr_extension() %>");
	</script>	
</div>
</form>
		


