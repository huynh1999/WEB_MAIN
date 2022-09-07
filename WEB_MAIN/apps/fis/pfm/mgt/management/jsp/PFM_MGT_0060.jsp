
<%
/*=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : PFM_MGT_0060.jsp
*@FileTitle  : Total Profit Report(A)
*@author     : CLT
*@version    : 1.0
*@since      : 2014/07/11
========================================================= */
%>

<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="clt-paging"   prefix="paging" %>
	<!-- 공통 Header -->
	<%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
	<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css" />
	    <title><bean:message key="system.title"/></title>
	
	<!-- 일자 및 달력팝업 호출 -->
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
<!--	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/MonthCalendar.js?ver=<%=CLT_JS_VER%>"></script>-->
<!--	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/ModalCalendar.js?ver=<%=CLT_JS_VER%>"></script>-->
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/CoFormControl.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/CoBizCommon.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/CalculationUtil.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/PFM_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="./apps/fis/pfm/mgt/management/script/PFM_MGT_0060.js?ver=<%=CLT_JS_VER%>" />
	
	
	<bean:define id="valMap"   name="EventResponse" property="mapVal"/>
	<bean:define id="ofcInfo"  name="valMap" property="ofcInfo"/>
		
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

	</script>
	
	<script>
		function setSelect(){
			var formObj = document.frm1;
			
			
		}

		var usrNm = "<%= usrNm %>";
	</script>
	
	<script>
	function setupPage(){
		loadPage();
		setSelect();
		var agent = navigator.userAgent.toLowerCase(); 
		if (agent.indexOf("msie") != -1) { //ie 일 경우 pdfDownLoad 버튼은 무조건 안나온다.
		}else{
			getBtnObj("pdfDowns").style.display = 'inline';
		}
	}
	</script>

	<form name="frm1" method="POST" action="./PFM_MGT_0060.clt">
	<!--Command를 담는 공통 -->
	<input type="hidden" name="f_cmd"/>
	<input type="hidden" name="f_CurPage"/>
	
	<input type="hidden" name="file_name">
	<input type="hidden" name="title">
	<input type="hidden" name="rd_param">
	
	<input type="hidden" name="f_usr_nm" value="<%= usrNm %>"/>
	<input type="hidden" name="f_email" value="<%= email %>"/>
	<input type="hidden" name="f_ofc_cd" value="<%= ofc_cd %>"/>
	<input type="hidden" name="f_ofc_locl_nm" value="<%= ofcLoclNm %>"/>
	<input type="hidden" name="f_cnt_cd" value="<%= cnt_cd %>"/>
	
	<div class="page_title_area clear">
	   <h2 class="page_title"><button type="button"><%=LEV3_NM%></button></h2>
	   <!-- btn_div -->
	   <div class="opus_design_btn TOP">
<%-- 		   <span style="display:none;" btnAuth="<%= roleBtnVO.getAttr5() %>" ><button type="button" class="btn_accent" style="cursor:hand; display:none;"  id = "pdfDowns" onclick="pdfDown('PRINT')"><bean:message key="PDF_download"/></button></span><!--
		   --><button type="button" class="btn_accent" style="cursor:hand; display:none;" btnAuth="<%= roleBtnVO.getAttr5() %>" id="btnPrint" onclick="doWork('PRINT')"><bean:message key="Print"/></button>
 --%>	   </div>
	   <!-- btn_div -->
	   <div class="location">
		   <span><%=LEV1_NM%></span> &gt;
		   <span><%=LEV2_NM%></span> &gt;
		   <span><%=LEV3_NM%></span>
		   <a href="" class="ir">URL Copy</a>
	   </div>
	</div>
	
	<div class="wrap_result">
		<div class="opus_design_inquiry" style="width:100%">
			<table >
				<colgroup>
		        	<col width="60">
		        	<col width="*">
				</colgroup>
			    <tbody>
			    	<tr>
                            <th><bean:message key="Date"></bean:message></th>
                            <td><input id="s_prd_strdt" name="s_prd_strdt" style="width: 70px;" onkeyup="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};" onblur="chkCmprPrd(firCalFlag, false, this, this, frm1.s_prd_enddt);firCalFlag=false;" size="11" maxlength="10" class="search_form" type="text" /><span class="dash">~</span><!-- 
							--><input id="s_prd_enddt" name="s_prd_enddt" style="width: 70px;" onkeyup="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};" onblur="chkCmprPrd(firCalFlag, false, this, frm1.s_prd_strdt, this);firCalFlag=false;" size="11" maxlength="10" class="search_form" type="text" /><!-- 
							--><button type="button" onclick="doDisplay('DATE11', frm1);" class="calendar" tabindex="-1"></button></td>
                        </tr>
				</tbody>
			</table>
			<table >
				<colgroup>
		        	<col width="60">
		        	<col width="*">
				</colgroup>
			    <tbody>
			    	<tr>
                            <th>Office</th>
                            <td>
                            <bean:define id="oficeList" name="valMap" property="ofcList"/>
								<select name="s_ofc_cd" style="width:183px;">
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
			<table >
				<colgroup>
		        	<col width="60">
		        	<col width="100">
		        	<col width="*">
				</colgroup>
			    <tbody>
                    <tr>
                    	<th><bean:message key="Currency"></bean:message></th>
                        <td colspan="2"><input name="s_curr_opt" id="f_curr_multi" value="M" checked="" type="radio" /><label for="f_curr_multi"><bean:message key="Multi_Currency"/></label></td>
                   	</tr>
                    <tr>
                    		<td></td>
		                	<td><input name="s_curr_opt" id="f_curr_one" value="O" onclick='javascript:if(frm1.s_curr_cd.value != ""){doWork("CURR_SEARCH");}' type="radio"/><label for="f_curr_one"><bean:message key="One_Currency"/></label></td>		               
		          			<td style="padding-left: 20px;">
		          				<table>
		          				<tr>
		          					<td width="95px"><h3 class="title_design"><bean:message key="To_Currency"/></h3></td>
				                    <td>
					            		<select name=s_curr_cd OnChange="doWork('CURR_SEARCH');">
						            		<option value=""></option>
	                            			<bean:define id="paramCurrList"  name="valMap" property="currList"/>
											<logic:iterate id="CurrVO" name="paramCurrList">
	                            			<option value='<bean:write name="CurrVO"/>'><bean:write name="CurrVO"/></option>
	                            			</logic:iterate>
                            			</select>                            	
                            		</td>
                        		</tr>
                    			</table>
                    		</td>
                    	</tr>
				</tbody>
			</table>
			<div class="opus_design_grid" style="width:350px;padding-left: 60px;">
	   			<script type="text/javascript">comSheetObject('sheet1');</script>
	   		</div>
		</div>
   		
   	</div>
	
	<script type="text/javascript">
	doBtnAuthority("<%= roleBtnVO.getAttr_extension() %>");
	</script>
	<iframe name="pdfDn" style="width:0;height:0;visibility:hidden" border=0></iframe>
    </form>
    
   
