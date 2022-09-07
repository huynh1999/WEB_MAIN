<%
/*=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : SEE_BMD_0070.jsp
*@FileTitle  : Master B/L Search 
*@author     : CLT
*@version    : 1.0
*@since      : 2014/06/12
=========================================================*/
%>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="clt-paging"   prefix="paging" %>
	<!-- 공통 Header -->
	<%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
	<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css"/>    
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/SEA_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="./apps/fis/see/bmd/masterbl/script/SEE_BMD_0600.js?ver=<%=CLT_JS_VER%>"></script>
	<bean:define id="valMap"  name="EventResponse" property="mapVal"/>
	
<script type="text/javascript">

		function setupPage(){
			loadPage();
		}
		document.title = 'Tracking';
</script>
<%
	String air_sea_clss_cd = (String)request.getParameter("air_sea_clss_cd");
%>
	<form name="frm1" method="POST" action="./SEE_BMD_0070.clt">
	<input id="f_cmd" name="f_cmd" type="hidden" />
	<input id="air_sea_clss_cd" name="air_sea_clss_cd" type="hidden" value='<bean:write name="valMap" property="air_sea_clss_cd"/>' />
	<input id="bnd_clss_cd" name="bnd_clss_cd" type="hidden" value='<bean:write name="valMap" property="bnd_clss_cd"/>' />
	<input id="biz_clss_cd" name="biz_clss_cd" type="hidden" value='<bean:write name="valMap" property="biz_clss_cd"/>' />
	
	<div class="page_title_area clear">
			<!-- page_title(S) -->
			<h2 class="page_title" style="font-weight: 400">Tracking</h2>
			<!-- page_title(E) -->
			
			<!-- opus_design_btn(S) -->
			<div class="opus_design_btn" >
				<button type="button" class="btn_accent" style="display:inline;"  onclick="doWork('SEARCHLIST')" name="btnSearch"><bean:message key="Search"/></button>
			</div>
			<!-- opus_design_btn(E) -->
	</div>
    <!-- page_title_area(E) -->
	


	<!-- inquiry_area(S) -->	
	<div class="wrap_search">		
		<div class="opus_design_inquiry ">
			<table >	
				<colgroup>
			        <col width="70">
		        	<col width="70">
		        	<col width="150">
		        	<col width="70">
		        	<col width="250">
		        	<col width="70">
		        	<col width="70">
		        	<col width="*">
				</colgroup>
				<tbody>
					<tr>
						<td></td>
						<% if( air_sea_clss_cd.equals("S") ){ %>
						<th><input type="radio" name="search_radio" id="search_radio" value="blNO">&nbsp;&nbsp;<bean:message key="MBL_No"/></th>
						<% }else{ %>
						<th><bean:message key="MAWB_No"/></th>
						<% } %>
						<td>
							<input type="text" name="f_bl_no"  id="f_bl_no" maxlength="50" value='<bean:write name="valMap" property="bl_no"/>' class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:115px;">
						</td>
						
						<% if( air_sea_clss_cd.equals("S") ){ %>
						<th>
							<input type="radio" name="search_radio" id="search_radio" value="cntrNo">&nbsp;&nbsp;<bean:message key="Cntr_No"/>
						</th> 
						<td colspan="3">
                        	<bean:define id="cntrList" name="valMap" property="cntrList"/> 
	                    	<select name="f_cntr_no" class="search_form" style="width:100px;">
	                            	<logic:iterate id="CntrLstVO" name="cntrList">
	                                	<option value='<bean:write name="CntrLstVO" property="cntr_no"/>'><bean:write name="CntrLstVO" property="cntr_no"/></option>
	                                </logic:iterate>
	                        </select>						    
						</td> 						
						<% }else{ %>
						<td colspan="5"></td>
						<% } %>
						<td></td>
					</tr>
				
						
				</tbody>
			</table>
		</div>				
	</div>	    
	<!-- inquiry_area(E) -->
	

</form>
	<iframe name="ifrm1"  src='' frameborder="0" scrolling="no" width="100%" height="800" >
	</iframe>
