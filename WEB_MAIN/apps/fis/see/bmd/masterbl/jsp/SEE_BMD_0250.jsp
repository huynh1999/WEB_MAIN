<%--
=========================================================
*@FileName   : SEE_BMD_0250.jsp
*@FileTitle  : B/L split
*@Description:
*@author     : 
*@version    : 
*@since      : 
=========================================================
--%>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="clt-paging"   prefix="paging" %>
<%@page import="java.util.HashMap"%>
<%@page import="java.util.List"%>
<%@page import="com.clt.syscommon.response.CommonEventResponse"%>
	<!-- 공통 Header -->
	<%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
	<title><bean:message key="system.title"/></title>
	<!-- 일자 및 달력팝업 호출 -->
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/SEA_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
    <script type="text/javascript" src="<%=CLT_PATH%>/apps/fis/see/bmd/housebl/script/BL_CODE_UTIL.js?ver=<%=CLT_JS_VER%>"></script>
    <script type="text/javascript" src="<%=CLT_PATH%>/js/common/CalculationUtil.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="./apps/fis/see/bmd/masterbl/script/SEE_BMD_0250.js?ver=<%=CLT_JS_VER%>"></script>
	<bean:define id="valMap"  name="EventResponse" property="mapVal"/>	
	 <script type="text/javascript">
	 	var user_ofc_cnt_cd = "<%=userInfo.getOfc_cnt_cd()%>";
		var uod_flg ="<%= userInfo.getUod_flg()%>";
		var usrId = "<%= userInfo.getUsrid() %>";
		var prn_ofc_cd = "<%=(String)application.getAttribute("PRNT_OFC_CD")%>";
		
		var BKGPCKCD = ' |';
		var BKGPCKNM = ' |';
		<% boolean isBegin = false; %>
	    <bean:define id="pckCdList" name="valMap" property="pckCdList"/>
		<logic:iterate id="BkgPckCdVO" name="pckCdList">
			<% if(isBegin){ %>
				BKGPCKCD+= '|';
				BKGPCKNM+= '|';
			<% }else{
				  isBegin = true;
			   } %>
			   BKGPCKCD+= '<bean:write name="BkgPckCdVO" property="pck_ut_cd"/>';
			   BKGPCKNM+= '<bean:write name="BkgPckCdVO" property="pck_nm"/>';
		</logic:iterate>				
		</script>								
	<%
		String ofc_cd		= userInfo.getOfc_cd();
		String ofc_eng_nm = userInfo.getOfc_eng_nm();
		String usrNm = userInfo.getUser_name();
		String phn = userInfo.getPhn();
		String fax = userInfo.getFax();
		String email = userInfo.getEml();
	%>
	<script type="text/javascript">
	function setupPage() {
		loadPage();
	}
	</script>
	<script type="text/javascript">
	function setHdr2(){
<%
		CommonEventResponse eventResponse = (CommonEventResponse)request.getAttribute("EventResponse");
		String voColHdrGS = "";
		HashMap tmpMapVal = eventResponse.getMapVal();
		voColHdrGS = (String)tmpMapVal.get("voColHdr");

%>
	}
</script>
<form name="frm1">
	<input type="hidden" name="f_cmd" id="f_cmd">
    <input type="hidden" name="f_CurPage" id="f_CurPage"> 
    <input type="hidden" name="f_intg_bl_seq">
    <input type="hidden" name="f_ref_no">
    <input type="hidden" name="chk_origin"  />    
    <input type="hidden" name="cntrListSeq"  />
    <input type="hidden" name="org_biz_clss_cd"  />
    <input type="hidden" name="intg_bl_seq">
	<!-- 세션 유저 정보  -->
	<input	type="hidden" name="f_usr_nm" id="f_usr_nm" value="<%= usrNm %>"/>
	<input	type="hidden" name="f_phn" id="f_phn" value="<%= phn %>"/>
	<input	type="hidden" name="f_fax" id="f_fax" value="<%= fax %>"/>
	<input	type="hidden" name="f_email" id="f_email" value="<%= email %>"/>
	<input	type="hidden" name="u_ofc_cd" id="u_ofc_cd" value="<%= ofc_cd %>"/>
	<input	type="hidden" name="f_ofc_nm" id="f_ofc_nm" value="<%= ofc_eng_nm %>"/>
	<!-- GridSetting Value -->
	<input type="hidden" name="user_id" id="user_id"  value="<%=userInfo.getUsrid()%>" />
	<input type="hidden" name="pageurl" id="pageurl" value="SEE_BKG_0030.clt"/>
	<input type="hidden" name="voColHdr">
	<input type="hidden" name="voColOpt">

	<div class="page_title_area clear">
	   <h2 class="page_title"><button type="button"><%=LEV3_NM%></button></h2>
	   <!-- btn_div -->
	   <div class="opus_design_btn TOP">
		   <%-- 
		   <button type="button" class="btn_accent" style="display:none;" btnAuth="<%= roleBtnVO.getAttr1() %>" onclick="document.forms[0].f_CurPage.value='';doWork('SEARCHLIST')" id="btn_Retrieve" name="btn_Retrieve"><bean:message key="Search"/></button>
		   <button type="button" class="btn_normal" style="display:none;" btnAuth="<%= roleBtnVO.getAttr4() %>" onClick="doWork('DELETE');" name="btn_Delete" id="btn_Delete"><bean:message key="Delete"/></button>
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
	<div class="wrap_search">
		<div class="opus_design_inquiry" style="width: 1400px">
			<table>
				<colgroup>
					<col width="150">
					<col width="150">
					<col width="120">
					<col width="*">
				</colgroup>
				<tbody>
                    <tr>
                    	<th><input type="radio" name="f_biz_clss_cd" id="f_master_bl" value="M" checked> <bean:message key="Master_BL"/></td>
					    <th><input type="radio" name="f_biz_clss_cd" id="f_house_bl" value="H"> <bean:message key="House_BL"/></td>
                        <th><bean:message key="BL_No"/></th>
						<td><input type="text" name="f_bl_no" id="f_bl_no" required="required" dataformat="excepthan" style="ime-mode:disabled; width:115px;text-transform:uppercase;" onblur="strToUpper(this);" onkeydown="entSearch();"><!--
						--><button type="button"  id="btn_Bl_No" name="btn_Bl_No" class="input_seach_btn" tabindex="-1" onClick="javascript:openBlPopUp(this);"></button>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
	<div class="wrap_result">
	   <h3 class="title_design"><bean:message key="BL_LIST"/></h3>
		<div class="opus_design_grid">    
			<script type="text/javascript">comSheetObject('sheet1');</script><!-- original -->
		</div>
	</div>
	<div class="wrap_result">
    	<div class="layout_vertical_2" style="width: 20%"><!-- Split -->
        	<div class="opus_design_inquiry sm">
            <h3 class="title_design"><bean:message key="Split"/></h3>
           <table height="185">
		 	<colgroup>
		 	        <col width="30" >
		        	<col width="100" >
		        	<col width="*">
		    </colgroup>
		    <tbody >
	            <tr height="50">
	            	<td></td>
	                <th><bean:message key="Number_Of_Split"/></th>
                    <td>
                    	<input Required name="f_split_no" type="text" class="search_form" dataformat="num" style="ime-mode:disabled; text-transform:uppercase;width:50px;" maxlength="5" onKeyPress="ComKeyOnlyAlphabet('uppernum')" onBlur="javascript:this.value=this.value.toUpperCase();">
                    	<button type="button" class="btn_etc" onClick="javascript:splitBl();"><bean:message key="Split"/></button>
                    </td>
	            </tr>
	            <tr valign="top">
	                <td></td>
                    <td colspan="2">
                    	<input name="f_chk_o" type="checkbox"> <bean:message key="Keep_Original_Booking"/> 
                    </td>
	            </tr>
	        </tbody>
	      </table>  
            </div>
        </div>
        <div class="layout_vertical_2 mar_left_8" style="width: 79%">
        <h3 class="title_design"><bean:message key="BLs"/></h3>
            <div class="opus_design_grid">       
            <script type="text/javascript">comSheetObject('sheet2');</script>
            </div>
        </div>
     </div>	
	<div class="wrap_result">
		<h3 class="title_design"><bean:message key="Container_List"/></h3>    	
		<div class="opus_design_grid">
		   <script type="text/javascript">comSheetObject('sheet3');</script>
		</div>
     </div>
     <div class="wrap_result">
        <h3 class="title_design"><bean:message key="PO"/></h3>
        <div class="opus_design_grid "id="mainTable">
			<script type="text/javascript">comSheetObject('sheet4');</script>
		</div>
	</div>	
	<div class="opus_design_grid">
			<script type="text/javascript">comSheetObject('sheet5');</script>
	</div>
</form>	