<%--
=========================================================
*@FileName   : PFM_MGT_0190.jsp
*@FileTitle  : Trial Balance Report
*@Description: Trial Balance Report
*@author     : LHK
*@version    : 1.0 - 2013/10/12
*@since      : 2013/10/12

*@Change history:
*@author     : Tuan.Chau
*@version    : 2.0 - 2014/07/09
*@since      : 2014/07/09
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
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CoFormControl.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CoBizCommon.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CalculationUtil.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/PFM_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="./apps/fis/pfm/mgt/management/script/PFM_MGT_0190.js?ver=<%=CLT_JS_VER%>"></script>
	
	<bean:define id="valMap"   name="EventResponse" property="mapVal"/>
	
	<%
		String ofc_cd		= userInfo.getOfc_cd();
		String ofc_nm 		= userInfo.getOfc_locl_nm();
		String usrNm 		= userInfo.getUser_name();
		String usrId 		= userInfo.getUsrid();
		String email 		= userInfo.getEml();
		String cnt_cd 		= userInfo.getOfc_cnt_cd();
		String usrphn 		= userInfo.getPhn();
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
	setTimeout("document.frm1.f_fr_dt.focus();", 1000);
}
</script>
<form name="frm1" method="POST" action="./PFM_MGT_0190.clt">
	<!--Command를 담는 공통 -->
	<input type="hidden" name="f_cmd"/>
	<input type="hidden" name="f_CurPage"/>
	
	<input type="hidden" name="file_name">
	<input type="hidden" name="title">
	<input type="hidden" name="rd_param">
	
	<input type="hidden" name="f_usr_id" value="<%= usrId %>"/>
	<input type="hidden" name="f_usr_nm" value="<%= usrNm %>"/>
	<input type="hidden" name="f_email"  value="<%= email %>"/>
	<input type="hidden" name="f_usrphn"  value="<%= usrphn %>"/>
	<input type="hidden" name="f_ofc_cd" value="<%= ofc_cd %>"/>
	<input type="hidden" name="f_ofc_nm" value="<%= ofc_nm %>"/>
	<input type="hidden" name="f_cnt_cd" value="<%= cnt_cd %>"/>
	
	<!-- GL View Table Data Create LKH 2015.02.25 -->
	<input	type="hidden" name="f_usrId" value="<%= usrId %>"/>
	
	<!-- Button -->
	<div class="page_title_area clear">
	   <h2 class="page_title"><button type="button"><%=LEV3_NM%></button></h2>
	   <!-- btn_div -->
	   <div class="opus_design_btn TOP">
	   		<%-- 
	       <button id="btnPrint" type="button" style="cursor:hand; display:none;" btnAuth="<%= roleBtnVO.getAttr5() %>" class="btn_accent" onclick="setTorVal('');doWork('PRINT')"><bean:message key="Print"/></button> 
		   <button type="button" class="btn_normal" style="cursor:hand; display:none;" btnAuth="B_TOR_PRINT" onclick="setTorVal('Y');doWork('PRINT')" id="torPrint">TOR <bean:message key="Print"/></button>
           <button style="cursor:hand; display:none;" type="button" btnAuth="CLEAR" class="btn_normal" onclick="doWork('ALLCLEAR')"><bean:message key="Clear"/></button>
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
	<!-- 
    <div class="wrap_search">
		<div class="opus_design_inquiry" style="width:100%">
			<table>
				<colgroup>
		        	<col width="80">
		        	<col width="*">
				</colgroup>
			    
			</table>
		</div>
	</div>
	 -->
<div class="over_wrap" height="100%">
	<div class="wrap_search">
		<div class="opus_design_inquiry entry_pannel" style="width:100%">
			<table>
				<colgroup>
		        	<col width="80">
		        	<col width="130">
		        	<col width="*">
				</colgroup>
			    <tbody>
			    <tr>
			    	<th><bean:message key="Period"/></th>
	                    <td> 
	                     <select required name="f_dt_clss_cd" OnChange="" style="width: 140px"> 
	                     	<option value="P" selected><bean:message key="Posting_Date"/></option> 
	                     	<option value="R"><bean:message key="Created_Date"/></option> 
	                      </select> 
	                     </td>
	                    <td><!-- 
	                     --><input type="text" style="width: 70px;" name="f_fr_dt" id="f_fr_dt" required onKeyUp="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};" onBlur="chkCmprPrd(firCalFlag, false, this, this, frm1.f_to_dt);firCalFlag=false;" size='11' maxlength="10" class="search_form"><!-- 
	                     --><span class="dash">~</span><!-- 
	                     --><input type="text" style="width: 70px;" name="f_to_dt" id="f_to_dt" required onKeyUp="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};" onBlur="chkCmprPrd(firCalFlag, false, this, frm1.f_fr_dt, this);firCalFlag=false;" size='11' maxlength="10" class="search_form"><!-- 
	                     --><button type="button" class="calendar ir" name="f_dt_cal" id="f_dt_cal" onclick="doDisplay('DATE11', frm1);"></button><!-- 
	                     --></td>
			    
			    	<!-- 
			    	<th><bean:message key="Period"/></th>
			    	<td>
	        				<input required type="text" id="f_fr_dt" name="f_fr_dt" value='<bean:write name="valMap" property="beginDate"/>' dataformat="excepthan" style="width:75px;ime-mode:disabled;" onKeyPress="ComKeyOnlyNumber(this, '-')" onKeyUp="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};" onBlur="mkDateFormatType(this,event,false,1);chkCmprPrd(firCalFlag, false, this, this, frm1.f_to_dt);firCalFlag=false;" maxlength="10" class="search_form"> 
	        				<button type="button" id="f_fr_dt_cal" onclick="doDisplay('DATE1', frm1);" class="calendar" tabindex="-1"></button>
				        	<input required type="text" id="f_to_dt" name="f_to_dt" dataformat="excepthan" style="width:75px;ime-mode:disabled;" onKeyPress="ComKeyOnlyNumber(this, '-')" onKeyUp="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};" onBlur="mkDateFormatType(this,event,false,1);chkCmprPrd(firCalFlag, false, this, frm1.f_fr_dt, this);firCalFlag=false;" maxlength="10" class="search_form"> 
				            <button id="f_dt_cal" type="button" id="f_fr_dt_cal" onclick="doDisplay('DATE2', frm1);" class="calendar" tabindex="-1"></button>
					</td>
					 -->
			    </tr>
			    <tr>
			    	<td colspan="2"></td>
			    </tr>
                 <tr>
                 	<th><bean:message key="Branch"/></th>
					<td>
						<!--
	                    --><bean:define id="oficeList" name="valMap" property="ofcList"/><!--
	                    --><select name="s_ofc_cd" style="width:140px;"/><!--
	                    --><bean:size id="len" name="oficeList" /><!--
	                    	--><logic:greaterThan name="len" value="1"><!--
	                    --><option value=''>ALL</option><!--
	                    --></logic:greaterThan><!--
	                    --><logic:iterate id="ofcVO" name="oficeList"><!--
	                    	--><logic:equal name="ofcVO" property="ofc_cd" value="<%= userInfo.getOfc_cd()%>" >
	                            <option selected="selected"  value='<bean:write name="ofcVO" property="ofc_cd"/>'><bean:write name="ofcVO" property="ofc_cd"/></option>
	                         	</logic:equal>
	                         	<logic:notEqual name="ofcVO" property="ofc_cd" value="<%= userInfo.getOfc_cd()%>" >
	                            <option value='<bean:write name="ofcVO" property="ofc_cd"/>'><bean:write name="ofcVO" property="ofc_cd"/></option>
	                         	</logic:notEqual><!--
	                    --></logic:iterate><!--
	                    --></select>
					</td>
       			</tr>
			    
       		</tbody>
       	</table>
       	
              <table>
                   	<colgroup>
                   		<col width="80">
                   		<col width="150">
			        	<col width="100">
			        	<col width="*">
					</colgroup>
			    <tbody>
              		<input type="hidden" name="rpt_tp" value="">
              	</tbody>
              	</table>
       			<span id="exp_view_layer" style="display:block">
               	
		       </span>
    </div>
    </div>
    <div class="opus_design_grid">
   		<script language="javascript">comSheetObject('sheet1');</script>
   	</div>
</div>
</form>
		
<script type="text/javascript">
doBtnAuthority("<%= roleBtnVO.getAttr_extension() %>");
</script>	
		
</body>
</html>

