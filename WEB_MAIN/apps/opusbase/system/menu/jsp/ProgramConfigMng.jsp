<%--
=========================================================
*Copyright(c) 2017 CyberLogitec. All Rights Reserved.
=========================================================

=========================================================
*@FileName   :  ProgramConfigMng.jsp
*@FileTitle  :  Program Configuration Management
*@Description:  
*@author     : Thoa Dien - DOU Networks
*@version    : 1.0 - 2017.12.04
*@since      : 2017.12.04

*@Change history:
=========================================================
--%>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
	<!-- 공통 Header -->
    <%@include file="./../../../../../../../../syscommon/header/CLTHeader.jsp"%>
	
	<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css">
	
	<!-- 해당 Action별 js -->
    <script type="text/javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/SYS_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
    <script type="text/javascript" src="./apps/opusbase/system/menu/script/ProgramConfigMng.js?ver=<%=CLT_JS_VER%>"></script>
	
	<bean:define id="valMap"  name="EventResponse" property="mapVal"/>
	
	<script>
		var usr_ofc_cd = "<%=userInfo.getOfc_cd()%>";
		function setupPage(){
		 	loadPage();
		}

		// Target Date Type
		var TargetDateTpCd = ' |';
        var TargetDateTpNm = ' |';
        <% boolean isBegin = false; %>
        <logic:notEmpty name="valMap" property="PARAM1">
	        <% isBegin = false; %>
	        <bean:define id="targetDateTPList"  name="valMap" property="PARAM1"/>
	        <logic:iterate id="codeVO" name="targetDateTPList">
	            <% if(isBegin){ %>
		            TargetDateTpCd+= '|';
		            TargetDateTpNm+= '|';
	            <% }else{
	                  isBegin = true;
	               } %>
	               TargetDateTpCd+= '<bean:write name="codeVO" property="cd_val"/>';
	               TargetDateTpNm+= '<bean:write name="codeVO" property="cd_nm"/>';
	        </logic:iterate>
        </logic:notEmpty>
        
        //Period Base
        var periodDateCd = ' |';
        var periodDateNm = ' |';
		<logic:notEmpty name="valMap" property="PARAM2">
			<% isBegin = false; %>
			<bean:define id="periodDtList"  name="valMap" property="PARAM2"/>
			<logic:iterate id="periodDtVO" name="periodDtList">
				<% if(isBegin){ %>
					periodDateCd+= '|';
					periodDateNm+= '|';
				<% }else{
					  isBegin = true;
				   } %>
				   periodDateCd+= '<bean:write name="periodDtVO" property="cd_val"/>';
				   periodDateNm+= '<bean:write name="periodDtVO" property="cd_nm"/>';
			</logic:iterate>		
		</logic:notEmpty>
		
		//Rows on Page
		var rowOnPageCd = ' |';
		var rowOnPageNm = ' |';
        <logic:notEmpty name="valMap" property="PARAM3">
			<% isBegin = false; %>
            <bean:define id="rowOnPageList" name="valMap" property="PARAM3"/>
            <logic:iterate id="rowPgVO" name="rowOnPageList">
                <% if(isBegin){ %>
                	rowOnPageCd+= '|';
                	rowOnPageNm+= '|';
                <% }else{
                      isBegin = true;
                   } %>
                   rowOnPageCd+= '<bean:write name="rowPgVO" property="cd_val"/>';
                   rowOnPageNm+= '<bean:write name="rowPgVO" property="cd_nm"/>';
            </logic:iterate>
        </logic:notEmpty>
        
      // Office List
		var ofcCd = ' ';
        <%-- <logic:notEmpty name="valMap" property="officeList">
			<% isBegin = false; %>
            <bean:define id="ofcList" name="valMap" property="officeList"/>
            <logic:iterate id="ofcVO" name="ofcList">
                <% if(isBegin){ %>
                	ofcCd+= '|';
                <% }else{
                      isBegin = true;
                   } %>
                   ofcCd+= '<bean:write name="ofcVO" property="ofc_cd"/>';
            </logic:iterate>
        </logic:notEmpty> --%>
	// CO_ID

		<logic:notEmpty name="valMap" property="coIdLst">
			<% isBegin = false; %>
            <bean:define id="coIdList" name="valMap" property="coIdLst"/>
            <logic:iterate id="coId" name="coIdList">
				ofcCd+= '|<bean:write name="coId" property="cd_val"/>';
            </logic:iterate>
        </logic:notEmpty>
	</script>
<form method="post" name="form" onSubmit="return false;">
	<input type="hidden" name="f_cmd"> 
	<input type="hidden" name="f_CurPage">
	
	<div class="page_title_area clear">
	   <h2 class="page_title"><button type="button"><%=LEV3_NM%></button></h2>
	   <!-- btn_div -->
	   <div class="opus_design_btn TOP">

	   </div>
	   <!-- btn_div -->
	   <div class="location">
		   <span><%=LEV1_NM%></span> &gt;
		   <span><%=LEV2_NM%></span> &gt;
		   <span><%=LEV3_NM%></span>
		   <a href="" class="ir">URL Copy</a>
	   </div>
	</div>
	
	<!-- wrap_search(S) -->
	<!-- #535: [SBS] 다국어 처리 V1.0 2차 -->
	<div class="wrap_search">
		<div class="opus_design_inquiry">
			<table>
				<colgroup>
					<col width="40" />
					<col width="120" />
					<col width="100" />
					<col width="170" />
					<col width="*" />
				</colgroup>
				<tbody>
					<tr>
						<th><bean:message key="Office"/></th>
						<td>
	                        <!-- <select name="f_ofc_cd" class="search_form" style="width:100px;"  >
	                             <option value="">ALL</option> 
	                           
	                        </select> -->
	                        <bean:define id="coIdLst" name="valMap" property="coIdLst"/>
	                        <bean:define id="ofcList" name="valMap" property="officeList"/><!--  
	                                --><select name="f_ofc_cd" style= "width:90px;">
                                       		<%-- <bean:size id="len" name="ofcList" />
                                       	 	 <logic:greaterThan name="len" value="1">
                                         	 	 <option value=''>ALL</option>
                                       		 </logic:greaterThan>
                                   			<logic:iterate id="ofcVO" name="ofcList">
		                                     	<logic:equal name="ofcVO" property="ofc_cd" value="<%= userInfo.getOfc_cd()%>" >
		                                        <option selected="selected"  value='<bean:write name="ofcVO" property="ofc_cd"/>'><bean:write name="ofcVO" property="ofc_cd"/></option>
		                                     	</logic:equal>
		                                     	<logic:notEqual name="ofcVO" property="ofc_cd" value="<%= userInfo.getOfc_cd()%>" >
		                                        <option value='<bean:write name="ofcVO" property="ofc_cd"/>'><bean:write name="ofcVO" property="ofc_cd"/></option>
		                                     	</logic:notEqual>
		                                     </logic:iterate> --%>
		                                     <logic:iterate id="coId" name="coIdLst">
		                                        <option value='<bean:write name="coId" property="cd_val"/>'><bean:write name="coId" property="cd_val"/></option>
		                                     </logic:iterate>
                                       </select> 
						</td>
						<th><bean:message key="Program_Id"/></th>
						<td>
							<input tabindex="text" maxlength="5" value="" name="f_pgm_id" id="f_pgm_id" style="ime-mode:disabled; text-transform:uppercase;width:100px;text-align:left" onblur="strToUpper(this);">
						</td>
						
						<td>
							
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
	
	<div class="wrap_result">
		<div class="opus_design_grid">
		    <div class="opus_design_btn"> 
                <button type="button" id="btnAdd" onClick="doWork('ROWADD')"  class="btn_normal"><bean:message key="Add"/></button>
            </div>
			<script language="javascript">comSheetObject('sheet1');</script>
		</div>
		<div class="opus_design_inquiry">
		<!--- Paging(공통) --->
          <table>
              <tr>
                  <td width="60px"></td>
                  <td align="center">
                      <table>
                          <tr><td id="pagingTb" class="paging" height="10" valign="bottom"></td></tr>
                      </table>
                  </td>
                  <td width="40px" height="10" colspan="2" align="right">&nbsp;</td>
              </tr>
           </table>
    </div>
	</div>
</form>
<script>
    var pDoc = parent.parent.parent.document;
    hideProcess('WORKING', pDoc);   
</script>
</bod>
</html>