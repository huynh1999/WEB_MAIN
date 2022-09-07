<%--
=========================================================
*@FileName   : PFM_MGT_0070.jsp
*@FileTitle  : Total Profit Report (B)
*@Description: Total Profit Report (B)
*@author     : HaeKyoung, Lee - Cyberlogitec
*@version    : 1.0 - 2012/02/03
*@since      : 2012/02/03

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
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/CoFormControl.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/CoBizCommon.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/CalculationUtil.js?ver=<%=CLT_JS_VER%>"></script>
	
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/PFM_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="./apps/fis/pfm/mgt/management/script/PFM_MGT_0070.js?ver=<%=CLT_JS_VER%>" />
	
	
	
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
		function setupPage()
		{
			loadPage();
			setSelect();
			var agent = navigator.userAgent.toLowerCase(); 
			if (agent.indexOf("msie") != -1) { //ie 일 경우 pdfDownLoad 버튼은 무조건 안나온다.
			}else{
				getBtnObj("pdfDowns").style.display = 'inline';
			}
		}
		function setSelect(){
			var formObj = document.frm1;
			
			
		}

		var usrNm = "<%= usrNm %>";
	</script>
	<form name="frm1" method="POST" action="./PFM_MGT_0070.clt">
	<!--Command를 담는 공통 -->
	<input type="hidden" name="f_cmd" id="f_cmd" />
	<input type="hidden" name="f_CurPage" id="f_CurPage" />

	<input type="hidden" name="file_name" id="file_name" />
	<input type="hidden" name="title" id="title" />
	<input type="hidden" name="rd_param" id="rd_param" />

	<input type="hidden" name="f_usr_nm" id="f_usr_nm"  value="<%= usrNm %>"/>
	<input type="hidden" name="f_email" id="f_email" value="<%= email %>" />
	<input type="hidden" name="f_ofc_cd" value="<%= ofc_cd %>" />
	<input type="hidden" name="f_ofc_locl_nm" id="f_ofc_cd" value="<%= ofcLoclNm %>"/>
	<input type="hidden" name="f_cnt_cd" id="f_cnt_cd" value="<%= cnt_cd %>" />

	<input type="hidden" name="s_pre_prd_strdt" id="s_pre_prd_strdt" />
	<input type="hidden" name="s_pre_prd_enddt" id="s_pre_prd_enddt" />
	
	<div class="page_title_area clear">
	   <h2 class="page_title"><button type="button"><bean:message key="Total_Profit_Report_b"/></button></h2>
	   <!-- btn_div -->
	   <div class="opus_design_btn TOP">
<%-- 	       <span style="display:none;" btnAuth="<%= roleBtnVO.getAttr5() %>" ><button  type="button"  style="cursor:hand; display:none;" id = "pdfDowns" class="btn_accent" onclick="pdfDown('PRINT')"><bean:message key="PDF_download"/></button></span><!--
		   --><button id="btnPrint" type="button"  style="cursor:hand; display:none;" btnAuth="<%= roleBtnVO.getAttr5() %>" class="btn_accent" onclick="doWork('PRINT')"><bean:message key="Print"/></button><!-- 
 --%>	    --></div>
	   <!-- btn_div -->
	   <div class="location">
		   <span><%=LEV1_NM%></span> &gt;
		   <span><%=LEV2_NM%></span> &gt;
		   <span><%=LEV3_NM%></span>
		   <a href="" class="ir">URL Copy</a>
	   </div>
	</div> 
	<div class="wrap_result">	
		<div class="opus_design_inquiry">
		<table>
			<colgroup>
				<col width="40" />
				<col width=""/>
			</colgroup>
						<tr>
                            <th><bean:message key="Date"/></th>
                            <td><input type="text" style="width: 70px;" name="s_prd_strdt" onKeyUp="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};" onBlur="chkCmprPrd(firCalFlag, false, this, this, frm1.s_prd_enddt);firCalFlag=false;" size='11' maxlength="10" class="search_form"><!--
                              --><span class="dash">~</span><!-- 
                                 --><input type="text" style="width: 70px;" name="s_prd_enddt" onKeyUp="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};" onBlur="chkCmprPrd(firCalFlag, false, this, frm1.s_prd_strdt, this);firCalFlag=false;" size='11' maxlength="10" class="search_form"><!-- 
								 --><button type="button" id="s_prd_dt_cal" name="s_prd_dt_cal" class="calendar ir"  onclick="doDisplay('DATE11', frm1);">
							</td>
                        </tr>
                        <tr>
		                  <th>Office</th>
		                  <td>
			                  	<bean:define id="oficeList" name="valMap" property="ofcList"/>
			                 	<select name="s_ofc_cd" style="width:225px;"/>
			
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
		</table>
    </div>
     
     <!-- layout_wrap(S) -->
	<div class="layout_wrap pad_top_8">
		<table>
			<colgroup>
				<col width="120" />
				<col width="*" />
			</colgroup>
              <tr>
              	<td><h3 class="title_design"><bean:message key="To_Currency"/></h3>
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
	    <div class="layout_vertical_2 pad_rgt_8" style="width:310px !important;">
		        <!-- opus_design_grid(S) -->
		        <h3>Current</h3>
		        <div class="opus_design_grid">
		            <script type="text/javascript">comSheetObject('sheet1');</script>
		        </div>
		        <!-- opus_design_grid(E) -->
	    </div>
	    <div class="layout_vertical_2" style="width:310px !important;">
	        <!-- opus_design_grid(S) -->
		        <h3>Previous</h3>
		        <div class="opus_design_grid">
		            <script type="text/javascript">comSheetObject('sheet2');</script>
		        </div>
		        <!-- opus_design_grid(E) -->
	    </div>
	</div>
	<!-- layout_wrap(E) -->
</div>               
<iframe name="pdfDn" style="width:0;height:0;visibility:hidden" border=0></iframe>
</form>

<script type="text/javascript">
doBtnAuthority("<%= roleBtnVO != null ? roleBtnVO.getAttr_extension() : "" %>");
</script>	
			

