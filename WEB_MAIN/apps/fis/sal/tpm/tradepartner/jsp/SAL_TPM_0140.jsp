<%--
=========================================================
*@FileName   : SAL_TPM_0030.jsp
*@FileTitle  : Trade Partner ManagementList
*@Description: Trade Partner ManagementList
*@author     : Choi,Gil-Ju - Cyberlogitec
*@version    : 1.0 - 01/07/2009
*@since      : 01/07/2009

*@Change history:
=========================================================
--%>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="clt-paging"   prefix="paging" %>
	<!-- 공통 Header -->
	<%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
	<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css" />
	
	<!-- 일자 및 달력팝업 호출 -->
	<script language="javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/SAL_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	
	<script language="javascript" src="<%=CLT_PATH%>/apps/fis/sal/tpm/tradepartner/script/SAL_TPM_0140.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/autocomplete_ui.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/unload_warning.js?ver=<%=CLT_JS_VER%>"></script>
	
    <bean:define id="valMap"  name="EventResponse" property="mapVal"/>
	
	<%
		String ofc_cd		= userInfo.getOfc_cd();
		String ofcLoclNm 	= userInfo.getOfc_locl_nm();
		String usrNm 		= userInfo.getUser_name();
		String email 		= userInfo.getEml();
		String cnt_cd 		= userInfo.getOfc_cnt_cd();
	%>
	
	<script>
	
		var pDoc = parent.parent.parent.document;
		hideProcess('WORKING', pDoc);

		/* var TPCD = '';
        var TPNM = ''; */
        
<%--         <% boolean isBegin = false; %>
        <!--Role 코드조회-->
        <bean:define id="codeList"  name="valMap" property="payType"/>
        <logic:iterate id="codeVO" name="codeList">
            <% if(isBegin){ %>
                TPCD+= '|';
                TPNM+= '|';
            <% }else{
                  isBegin = true;
               } %>
            TPCD+= '<bean:write name="codeVO" property="cd_val"/>';
            TPNM+= '<bean:write name="codeVO" property="cd_nm"/>';
        </logic:iterate> --%>
        
        var CNTR_GRP_CD = '';
        var CNTR_GRP_NM = '';
        <% boolean isBegin = false; %>
        <!--Role 코드조회-->
        <bean:define id="cntrGrpCdList"  name="valMap" property="cntrGrpCdList"/>
        <logic:iterate id="ComCdDtlVO" name="cntrGrpCdList">
            <% if(isBegin){ %>
            CNTR_GRP_CD+= '|';
            CNTR_GRP_NM+= '|';
               
            <% }else{
                  isBegin = true;
               } %>
               CNTR_GRP_CD+= '<bean:write name="ComCdDtlVO" property="cd_val"/>';
               CNTR_GRP_NM+= '<bean:write name="ComCdDtlVO" property="cd_nm"/>';
        </logic:iterate>
        
    	var AUTOCOMPLETE_YN = 'Y';
	</script>
	
	<script>
	    function setupPage(){
	    	loadPage();
	    }
	</script>
	<form name="frm1" method="POST" action="./">
	<!--Command를 담는 공통 -->
	<input type="hidden" name="f_cmd"/> 
	<input type="hidden" name="f_CurPage"/>
		
	<input	type="hidden" name="f_usr_nm" value="<%= usrNm %>"/>
	<input	type="hidden" name="f_email"  value="<%= email %>"/>
	<input	type="hidden" name="f_ofc_cd" value="<%= ofc_cd %>"/>
	<input	type="hidden" name="f_ofc_nm" value="<%= ofcLoclNm %>"/>
	<input	type="hidden" name="f_cnt_cd" value="<%= cnt_cd %>"/>
	<input  type="hidden" name="f_trdp_cd" />
	
	<!-- GridSetting Value -->
	<input type="hidden" name="user_id"  value="<%=userInfo.getUsrid()%>" />
	<input type="hidden" name="pageurl" id="pageurl" value="SAL_TPM_0030.clt"/>
	 <!-- page_title_area -->
	<div class="page_title_area clear">
	   <h2 class="page_title"><button type="button"><%=LEV3_NM%></button></h2>
	   <!-- btn_div -->
	   <div class="opus_design_btn TOP">
	   <%-- 
		   <button type="button" class="btn_accent" btnAuth="<%= roleBtnVO.getAttr1() %>" onclick="document.forms[0].f_CurPage.value='';doWork('SEARCHLIST')" style="display: none;"><bean:message key="Search"/></button> 
		   <button type="button" class="btn_normal" btnAuth="<%= roleBtnVO.getAttr3() %>" onclick="doWork('MODIFY')" style="display: none;"><bean:message key="Save"/></button>
		   <button type="button" class="btn_normal" btnAuth="<%= roleBtnVO.getAttr6() %>" onclick="doWork('EXCEL')" style="display: none;" name="btn_DownExcel"><bean:message key="Excel"/></button>
		   <button type="button" class="btn_normal" btnAuth="CLEAR" onclick="clearAll()" style="display: none;"><bean:message key="Clear"/></button>
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
	<!-- wrap_search (S) -->
<div class="over_wrap" height="100%">
	<div class="wrap_search">	
		<div class="opus_design_inquiry entry_pannel ">
			<table>
				<colgroup>
					<col width="100">
					<col width="200">
 					<col width="70">
					<col width="*">
				</colgroup>
				<tbody>
               <tr>
                 <th><bean:message key="Trade_Partner"/></th>
                 <td>
                    <input type="text" name="s_e_trdp_cd" id="s_e_trdp_cd" maxlength="20" onKeyDown="codeNameAction('partner', this, 'onKeyDown')" onBlur="strToUpper(this);codeNameAction('partner',this, 'onBlur')" class="search_form" dataformat="multiLanguage" style="<%=MULTI_IMEMODE%>text-transform:uppercase;width:70px;"><!--  
                   --><button type="button" class="input_seach_btn" tabindex="-1" onclick="doWork('LINER_POPLIST')"></button><!-- 
                   --><input name="s_e_trdp_nm" type="text" class="search_form" dataformat="multiLanguage"  style="<%=MULTI_IMEMODE%>text-transform:uppercase;width:250px;" maxlength="20" onKeyPress="if(event.keyCode==13){doWork('LINER_POPLIST_NAME')}"><!-- 
                  --></td>
                <th><bean:message key="TP_Type"/></th>
                <td> 
                    <logic:notEmpty name="EventResponse">
	             	<bean:define id="cdMap"  name="EventResponse" property="mapVal"/>
	             	<bean:define id="cdList" name="cdMap" property="tpType"/>
             		<select name="s_trdp_tp_cd" required  style="width:140px;" onchange="searchList();">
             			<option value="">All</option>
           				<logic:iterate id="codeVO" name="cdList">
            			<option value='<bean:write name="codeVO" property="cd_val"/>'><bean:write name="codeVO" property="cd_nm"/></option>
           				</logic:iterate>
           			</select>
            		</logic:notEmpty>
				</td>
               </tr>
		      </tbody>
        </table> 
		</div>
	</div>
	
	<div class="wrap_result">
		<!-- layout_wrap(S) -->
		<div class="layout_wrap">
		    <div class="layout_vertical_3" style="width:30%;">
				 <!-- opus_design_grid(S) -->
				 <div class="opus_design_grid" >
			     	<h3 class="title_design" style="height: 23px;">Trade Partner</h3>
					<script type="text/javascript">comSheetObject('sheet1');</script>
				 </div>				 
				  <div class="opus_design_inquiry">
				<!--- Paging(공통) --->
	              <table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-top:32px;">
	                  <tr>
	                      <td width="60px">
	                      	<bean:define id="tmpMapVal" name="EventResponse" property="mapVal"/>
	                      	<bean:define id="pagingVal" name="tmpMapVal"     property="paging"/>
	                      	<paging:options name="pagingVal" defaultval="200"/>
	                      </td>
	                      <td align="center">
	                          <table  border="0" width="100%">
	                              <tr><td id="pagingTb" style='font-family: "Tahoma", "Arial", "Verdana";font-size: 11px;'></td>
	                              </tr>
	                          </table>
	                      </td>
	                      <td width="40px" height="10" colspan="2" align="right">&nbsp;</td>
	                  </tr>
	               </table>
	        	</div>
				 
		    </div>
		    
		   
		    
		    <div class="layout_vertical_3 mar_left_8" style="width:69%;">			
				<!-- opus_design_grid(S) -->
				<div class="opus_design_grid" >
					<h3 class="title_design">Free Day</h3>
 					<!-- opus_design_btn(S) -->
					<div class="opus_design_btn">
						<button type="button" class="btn_normal" onclick="doWork('FREEDAY_ADD')"    id="btnLclAdd"   name="btnAddSibling"><bean:message key="Add"/></button> 
						<%-- <button type="button" class="btn_normal" onclick="doWork('LCLDELETE')" id="btnLclDel"   name="btnAddChild"><bean:message key="Delete"/></button> --%> 
						<button type="button" class="btn_normal" onclick="doWork('FREEDAY_SAVE')"   id="btnLclSave"  name="btnSave"><bean:message key="Save"/></button>
					</div>
					<!-- opus_design_btn(E) -->
					
					<script type="text/javascript">comSheetObject('sheet2');</script>
				</div>
				<!-- opus_design_grid(E) -->
				
				
			</div>
		<!-- layout_wrap(E) -->
		</div>
	</div>
	
</div>

</form>
		
<script type="text/javascript">
doBtnAuthority("<%= roleBtnVO.getAttr_extension() %>");
</script>

