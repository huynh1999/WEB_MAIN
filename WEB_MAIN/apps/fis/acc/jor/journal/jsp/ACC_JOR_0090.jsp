<%
/*=========================================================
 *Copyright(c) 2014 CyberLogitec
 *@FileName : PFM_ACC_0040.jsp
 *@FileTitle : Check Deposit Report
 *@author     : CLT
 *@version    : 1.0
 *@since      : 2014/06/17
 =========================================================*/
%>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@ page import="com.clt.apps.opusbase.system.menu.dto.MenuTreeVO"%>
<%@ page import="java.util.ArrayList"%>
<%@ page import="java.util.Map"%>
<%@ page import="com.clt.syscommon.response.CommonEventResponse"%>
<%@ taglib uri="clt-paging"   prefix="paging" %>
	<!-- 공통 Header -->
	<%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
	<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css" />
	<script type="text/javascript" src="<%=CLT_PATH%>/apps/fis/acc/jor/journal/script/ACC_JOR_0090.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/ACC_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>	
	<!-- 일자 및 달력팝업 호출 -->
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
	
	<%
		String depositRoleLevel = "";
		String checkRoleLevel = ""; 
		
		HttpSession httpSession = request.getSession();
		CommonEventResponse commonEventResponse = (CommonEventResponse) httpSession.getAttribute("menuResponse");
		Map<String, ArrayList<MenuTreeVO>> menuMap = commonEventResponse.getMapVal();

		ArrayList<MenuTreeVO> pgmMenuList = menuMap.get("PGMMENU");
		
		for (MenuTreeVO pgmMenuTreeVO : pgmMenuList) {
			String pgm_url = pgmMenuTreeVO.getPgmURL();
			
			if (pgm_url.indexOf(".clt") > -1){
				pgm_url = pgm_url.substring(2, pgm_url.indexOf(".clt"));
				
				if (pgm_url.equals("ACC_JOR_0020")){ // Deposit List
					depositRoleLevel = "1";
				}
				if (pgm_url.equals("ACC_JOR_0021")){ // Deposit Lv2 List
					depositRoleLevel = "2";
				}
				if (pgm_url.equals("ACC_JOR_0040")){ // Payment List
					checkRoleLevel = "1";
				}
				if (pgm_url.equals("ACC_JOR_0041")){ // Payment Lv2 List
					checkRoleLevel = "2";
				}
				if (pgm_url.equals("ACC_JOR_0042")){ // Payment Lv3 List
					checkRoleLevel = "3";
				}
			}
		}
	%>
	
	
	<script type="text/javascript">
		var ofcCd = "<%= userInfo.getOfc_cd() %>";
		var depositRoleLevel = "<%= depositRoleLevel %>";
		var checkRoleLevel = "<%= checkRoleLevel %>";
		
		function setupPage(){
			loadPage();
		}
	</script>
	
	<bean:define id="valMap"  name="EventResponse" property="mapVal"/>
	
</head>
<form name="frm1" method="POST" action="./">
<input type="hidden" name="file_name" id="file_name" />
<input type="hidden" name="rd_param" id="rd_param" />
<input type="hidden" name="title" id="title" />


<input id="deposit_level" name="deposit_level" type="hidden"  value="<bean:write name="valMap" property="deposit_level"/>"/>
<input id="payment_level" name="payment_level" type="hidden"  value="<bean:write name="valMap" property="payment_level"/>"/>
<input id="ofc_cd" name="ofc_cd" value="<%=userInfo.getOfc_cd()%>" type="hidden" />
<input id="apo_flg" name="apo_flg" value="<%=userInfo.getApo_flg()%>" type="hidden" />	

<!--Command를 담는 공통 -->
<input type="hidden" name="f_cmd" id="f_cmd" />
<input type="hidden" name="f_CurPage" id="f_CurPage" />
<!-- page_title_area(S) -->
<div class="page_title_area clear">
	<h2 class="page_title"><button type="button"><%=LEV3_NM%></button></h2>
	   <!-- btn_div -->
	   <div class="opus_design_btn TOP">
	  		<%-- 
		   <button id="btnPrint" type="button" style="display: none;" btnAuth="<%= roleBtnVO.getAttr5() %>" class="btn_accent" onclick="doWork('PRINT')"><bean:message key="Print"/></button>
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
<!-- page_title_area(E) -->
<!-- wrap_search(S) -->
<div class="over_wrap" height="100%">
<div class="wrap_search">
<!-- opus_design_inquiry(S) -->
<div class="opus_design_inquiry entry_pannel ">
	<table>
		<colgroup>
			<col width="120" />
			<col width="20" />
			<col width="100" />
			<col width="20" />
			<col width="100" />
			<col width="*" />
		</colgroup>
		<tbody>
			<tr>
				<th><label style="background-color:#d4f6ff;"><bean:message key="Report_Type"/></label></th>
                <td>
                	<input name="f_rpt_tp_1" id="f_rpt_tp_1" type="checkbox" value="" >
                </td>
                <td><label for="f_rpt_tp_1"><bean:message key="Check_Journal"/></label></td>
                <td>
                	<input name="f_rpt_tp_2" id="f_rpt_tp_2" type="checkbox" value="" checked >
                </td>
                <td><label for="f_rpt_tp_2"><bean:message key="Deposit_Journal"/></label></td>
                <td><button id="btnPrint" type="button" btnAuth="<%= roleBtnVO.getAttr5() %>" class="btn_etc" onclick="doWork('ALL')"><bean:message key="All"/></button><!-- 
                 --><button id="btnPrint" type="button" btnAuth="<%= roleBtnVO.getAttr5() %>" class="btn_etc" onclick="doWork('CLEAR')"><bean:message key="Clear"/></button></td>
			</tr>
		</tbody>
	</table>
	<table>
		<colgroup>
			<col width="120" />
			<col width="*" />
		</colgroup>
		<tbody>
			<tr>
				<th><bean:message key="Branch"/></th>
                <td>
                    <bean:define id="oficeList" name="valMap" property="ofcList"/>
                    <select required name="f_ofc_cd" style="width:150px;" >
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
			</tr>
		</tbody>
	</table>
	<table>
		<colgroup>
			<col width="120" />
			<col width="120" />
			<col width="*" />
		</colgroup>
		<tbody>
			<tr>
				<th><bean:message key="Period"/></th>
				<td>
					<input type="radio" name="f_per_radio" id="f_per_radio1" value="1"><label for="f_per_radio1"><bean:message key="Post_Date"/></label>
				</td>
				<td>
               		<input type="radio" name="f_per_radio" id="f_per_radio2" value="2" checked><label for="f_per_radio2"><bean:message key="Bank_Date"/></label>
               	</td>
			</tr>
			<tr>
				<td></td>
				<td>
                    From&nbsp;&nbsp;&nbsp;<input type="text" required name="per_strdt" onKeyUp="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};" onBlur="chkCmprPrd(firCalFlag, false, this, this, frm1.per_enddt);firCalFlag=false;" style="width:70;" maxlength="10" class="search_form">
                </td>
                <td>
                	To&nbsp;&nbsp;&nbsp;<input type="text" required name="per_enddt"   onKeyUp="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};" onBlur="chkCmprPrd(firCalFlag, false, this, frm1.per_strdt, this);firCalFlag=false;" style="width:70;" maxlength="10" class="search_form">
                    <button type="button" name="per_dt_cal" id="per_dt_cal"  class="calendar ir" onclick="doDisplay('DATE11', frm1);"></button>
                </td>
			</tr>			
			<!-- #1180 [ZEN CONTINENTAL] Add fillter TP type on Check Deposit Report screen by Duc.Nguyen 2017-09-05 -->
			<tr>
				<th><bean:message key="Partner_Type"/></th>
				<td>
					<bean:define id="cdList" name="valMap" property="tpType"/>
                    <select required name="f_trdp_tp_cd" style="width:150px;" >
                    <bean:size id="len" name="cdList" />
                    <logic:greaterThan name="len" value="1">
                    	<option selected="selected" value=''>ALL</option>
                    </logic:greaterThan>
	                <logic:iterate id="codeVO" name="cdList">
	                	<option value='<bean:write name="codeVO" property="cd_val"/>'><bean:write name="codeVO" property="cd_nm"/></option>
	                </logic:iterate>
                    </select>
				</td>
				
			</tr>
			<tr>
				<th><bean:message key="Sort_By_Summary"/></th>
                <td>
                	<input type="radio" name="f_sort_summ_radio" id="f_sort_summ_radio1" value="1"><label for="f_sort_summ_radio1"><bean:message key="Vendor_Customer"/></label>
                </td>
                <td><input type="radio" name="f_sort_summ_radio" id="f_sort_summ_radio2" value="2" checked><label for="f_sort_summ_radio2"><bean:message key="Bank"/></label></td>
			</tr>
			<tr>
                <td></td>
                <td><input type="radio" name="f_sort_summ_radio" id="f_sort_summ_radio3" value="3"><label for="f_sort_summ_radio3"><bean:message key="Pay_to_Recd_from"/></label></td>
                <td><input type="radio" name="f_sort_summ_radio" id="f_sort_summ_radio4" value="4"><label for="f_sort_summ_radio4"><bean:message key="Date"/></label></td>
            </tr> 
		</tbody>
	</table>
	<table>
		<colgroup>
			<col width="120" />
			<col width="120" />
			<col width="120" />
			<col width="10" />
			<col width="10" />
			<col width="*" />
		</colgroup>
		<tbody>
			<tr>
                  <th><bean:message key="Sort_By_Detail"/></th>
	          	  <td><input type="radio" name="f_sort_dtl_radio" id="f_sort_dtl_radio1" value="1" checked><label for="f_sort_dtl_radio1"><bean:message key="Date"/></label></td>
		          <td><input type="radio" name="f_sort_dtl_radio" id="f_sort_dtl_radio2" value="2" ><label for="f_sort_dtl_radio2"><bean:message key="Check_No"/></label></td>
                  <td><input name="f_show_dtl" id="f_show_dtl" type="checkbox" value="" ></td>
                  <td><label for="f_show_dtl"><bean:message key="Show_Detail"/></label></td>
                  <td></td>
             </tr>
		</tbody>
	</table>
</div>
<!-- opus_design_inquiry(E) -->
</div>
<!-- wrap_search(E) -->
    
</div>
</form>	
<script type="text/javascript">
doBtnAuthority("<%= roleBtnVO.getAttr_extension() %>");
</script>	
<script>
	var pDoc = parent.parent.parent.document;
	hideProcess('WORKING', pDoc);
</script>

