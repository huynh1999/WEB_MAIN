<%--
=========================================================
*@FileName   : PFM_MGT_0100.jsp
*@FileTitle  : Balance Sheet Report
*@Description: Balance Sheet Report
*@author     : Chungrue
*@version    : 1.0 - 2012/02/06
*@since      : 2012/02/06

*@Change history:
*@author     : Tuan.Chau
*@version    : 2.0 - 2014/07/10
*@since      : 2014/07/10
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
	<script language="javascript" src="./apps/fis/pfm/mgt/management/script/PFM_MGT_0100.js?ver=<%=CLT_JS_VER%>" ></script>
	<!-- #1438 [PATENT] 0215_24 ACCOUNTING REPORT - MULTI OFFICE SELECTION -->	
	<%-- <script src="<%=CLT_PATH%>/js/common/jquery-3.2.1.min.js?ver=<%=CLT_JS_VER%>"></script> --%>
	<script src="<%=CLT_PATH%>/js/common/multiple-select.js?ver=<%=CLT_JS_VER%>"></script>
	<link href="<%=CLT_PATH%>/js/common/multiple-select.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css">	
	<script>
        $(function() {
            $('#s_ofc_cd').multipleSelect({
            	 width: '100%',
                 placeholder: "ALL",
                 selectAll: false
            });
        });
    </script>
	<bean:define id="valMap"   name="EventResponse" property="mapVal"/>
	<bean:define id="ofcInfo"  name="valMap" property="ofcInfo"/>
	
	<%
		String ofc_cd		= userInfo.getOfc_cd();
		String ofc_nm 		= userInfo.getOfc_locl_nm();
		String usrNm 		= userInfo.getUser_name();
		String email 		= userInfo.getEml();
		String cnt_cd 		= userInfo.getOfc_cnt_cd();
		//GL View Table Data Create LKH 2015.02.25
		String usrId		= userInfo.getUsrid();
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
		var usrId = "<%= userInfo.getUsrid() %>";
		var usrPhn = "<%= userInfo.getPhn() %>";
		var usrFax = "<%= userInfo.getFax() %>";
		var usrEml = "<%= email %>";
		
	//  #2627 - [CLT] ACCT REPORT - ONE CURRENCY OPTION CURRENCY SETUP - item 2 by thoa.dien 170828
		var ofc_curr_cd = "<bean:write name="ofcInfo" property="locl_curr_cd"/>";
		if (ofc_curr_cd == "" || ofc_curr_cd == "undefined"){
			 ofc_curr_cd = "<bean:write name="ofcInfo" property="trf_cur_cd"/>";
		}
		
		function setupPage() {
			loadPage();
			setSelect();
			var agent = navigator.userAgent.toLowerCase(); 
			if (agent.indexOf("msie") != -1) { //ie 일 경우 pdfDownLoad 버튼은 무조건 안나온다.
			}else{
				getBtnObj("pdfDowns").style.display = 'inline';
			}
		}
		// #1299 [BNX] One Currency 옵션 - Office Code화면 Accounting Decimal Point 적용 보완
		var xch_rt_dp_cnt = Number("<bean:write name="ofcInfo" property="xch_rt_dp_cnt"/>");
	</script>
<form name="frm1" method="POST" action="./PFM_MGT_0100.clt">
	<!--Command를 담는 공통 -->
	<input type="hidden" name="f_cmd"/>
	<input type="hidden" name="f_CurPage"/>
	
	<input type="hidden" name="file_name">
	<input type="hidden" name="title">
	<input type="hidden" name="rd_param">
	
	<input type="hidden" name="f_usr_nm" value="<%= usrNm %>"/>
	<input type="hidden" name="f_email"  value="<%= email %>"/>
	<input type="hidden" name="f_ofc_cd" value="<%= ofc_cd %>"/>
	<input type="hidden" name="f_ofc_nm" value="<%= ofc_nm %>"/>
	<input type="hidden" name="f_cnt_cd" value="<%= cnt_cd %>"/>
	
	<input type="hidden" name="f_sys_ofc_cd" value="<bean:write name="valMap" property="sysOfcCd"/>"/>
	<input type="hidden" name="f_year_end_post_dt" value="<bean:write name="valMap" property="yearEndPostDt"/>"/>
	<input type="hidden" name="f_sys_beg_ym" value="<bean:write name="valMap" property="sysBegYM"/>"/>
	<input type="hidden" name="f_sel_ofc" id="f_sel_ofc" value=""/>
	
	<!-- GL View Table Data Create LKH 2015.02.25 -->
	<input	type="hidden" name="f_usrId" value="<%= usrId %>"/>
	
	<!-- Button -->
	<div class="page_title_area clear">
	   <h2 class="page_title"><button type="button"><%=LEV3_NM%></button></h2>
	   <!-- btn_div -->
	   <div class="opus_design_btn TOP">
	   		<%-- 
		   <span style="display:none;" btnAuth="<%= roleBtnVO.getAttr5() %>" ><button type="button" style="display:none;" id = "pdfDowns" class="btn_accent" onclick="setTorVal('');pdfDown('PRINT')"><bean:message key="PDF_download"/></button></span>
		   <button id="btnPrint" type="button" style="display:none;" btnAuth="<%= roleBtnVO.getAttr5() %>" class="btn_accent" onclick="setTorVal('');doWork('PRINT')"><bean:message key="Print"/></button> 
		   <button id="exPrint" type="button" style="display:none;" btnAuth="B_TOR_PRINT" class="btn_normal" onclick="setTorVal('Y');doWork('PRINT')">TOR <bean:message key="Print"/></button>
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
	
	<!-- Search option -->
<div class="over_wrap" height="100%">	
    <div class="wrap_result" style="width:700px;"> 
		<div class="opus_design_inquiry sm">
             <table>
             	<colgroup>
		        	<col width="40">
		        	<col width="40">
		        	<col width="*">
				</colgroup>
			    <tbody>
                 <tr>
       				<th><bean:message key="As_of"/></th>
       				<td>
        				<input type="text" name="f_fr_dt" value="" style="width:75px" onfocusout="doWork('CURR_SEARCH');"  onKeyUp="mkDateFormatType(this, event, false,1)" onBlur="mkDateFormatType(this, event, true,1)" maxlength="10" class="search_form">
 						<button type="button" id="f_fr_dt_cal" onclick="doDisplay('DATE1', frm1);" class="calendar" tabindex="-1"></button>
					</td>
					<td>
						<input type="radio" name="f_dt_tp_radio" id="f_dt_tp_radio" class="radio_select" checked><label for="f_dt_tp_radio"><bean:message key="Post_Date"/></label>
						<!--  <input type="radio" name="f_dt_tp_radio" id="f_dt_tp_radio2" class="radio_select"><label for="f_dt_tp_radio2"><bean:message key="Invoice_Date"/></label> #52526 Invoice Date 기능 Hidden 처리  -->
						<!-- #1004 [AGL] BALANCE SHEET AND TRIAL BALANCE TO HAVE INVOICE DATE OPTION -->
						<input type="radio" name="f_dt_tp_radio" id="f_dt_tp_radio2" class="radio_select" style="display:none;"><label for="f_dt_tp_radio2" style="display:none;" id="f_dt_tp_radio2_label"><bean:message key="Invoice_Date"/></label>
					</td>
       			</tr>
             </table>
         </div>
		<div class="opus_design_inquiry sm">
             <table>
             	<colgroup>
		        	<col width="40">
		        	<col width="*">
				</colgroup>
				<tbody>
				<!-- #1438 [PATENT] 0215_24 ACCOUNTING REPORT - MULTI OFFICE SELECTION -->
					<tr>
	       			    <th><bean:message key="Branch"/></th>
	                   	<td>
	                   	<div style="max-width:140px;">
	                   	<bean:define id="oficeList" name="valMap" property="ofcList"/>
	                   	<select name="s_ofc_cd" id = "s_ofc_cd" class="form-control" multiple="multiple">
						<logic:iterate id="ofcVO" name="oficeList">
		                    <logic:equal name="ofcVO" property="ofc_cd" value="<%= userInfo.getOfc_cd()%>" >
		                    	<option selected="selected"  value="<bean:write name="ofcVO" property="ofc_cd"/>"><bean:write name="ofcVO" property="ofc_cd"/></option>
		                    </logic:equal>
		                    <logic:notEqual name="ofcVO" property="ofc_cd" value="<%= userInfo.getOfc_cd()%>" >
		                    	<option value="<bean:write name="ofcVO" property="ofc_cd"/>"><bean:write name="ofcVO" property="ofc_cd"/></option>
		                    </logic:notEqual>
	                	</logic:iterate>
	                   	</select>
	                   	</div>
	                   	</td>
	                 </tr>
				<%--
	                 <tr>
	                   	<td><bean:define id="oficeList" name="valMap" property="ofcList"/>
	                   	<select name="s_ofc_cd" style="width:140px;"/>
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
	                   	</select></td>
	                  </tr>
	                --%>
                 </tbody>
             </table>
        </div>
		<div class="opus_design_inquiry sm">
             <table>
				<tbody>             
       			<colgroup>
	       			<col width="100">
	       			<col width="150">
	       			<col width="*">
       			</colgroup>
       			<tbody>
	       			<tr>
	       				<th style="text-align: left" class="pad_top_8"><bean:message key="Report_Option"/></th>
	       				<td colspan="2"></td>
	       			</tr>
	       			<tr>
	       				<td style="width:230px;">
	        				<input type="radio" name="rpt_opt" id="rpt_opt1" value="" onClick="setCheck()"><label for="rpt_opt1"><bean:message key="Physical_Year_Beginning_Balance"/></label>						
	        				<input type="radio" name="rpt_opt" id="rpt_opt2" value="" onClick="setCheck()" style="display:none;"> <!-- <label for="rpt_opt2"><bean:message key="Monthly_Journalizing"/></label> -->
						</td>
						<td>
	        				<input type="radio" name="rpt_opt" id="rpt_opt3" value="" checked onClick="setCheck()"><label for="rpt_opt3"><bean:message key="None"/></label>
						</td>
						<td></td>
	       			</tr>
	       		</tbody>
             </table>
        </div>
	  	<div class="opus_design_inquiry sm">
             <table>
				<tbody>             
       			<colgroup>
	       			<col width="100">
	       			<col width="150">
	       			<col width="*">
       			</colgroup>
       			<tbody>
           			<tr>
           				<th style="text-align: left" class="pad_top_8"><bean:message key="Report_Type"/></th>
           				<td></td><td></td>
           			</tr>
           			<tr>
           				<td><input type="radio" name="rtp_type" id="rtp_type1" value="" checked><label for="rtp_type1"><bean:message key="Standard"/></label></td>
    					<td><input type="radio" name="rtp_type" id="rtp_type2" value=""><label for="rtp_type2"><bean:message key="Yearly_Comparison"/></label></td>
    					<td></td>
           			</tr>
           		</tbody>
             </table>
        </div>
	  	<div class="opus_design_inquiry sm">
             <table>
				<tbody>             
       			<colgroup>
	       			<col width="100">
	       			<col width="150">
	       			<col width="*">
       			</colgroup>
       			<tbody>
           			<tr>
           				<th style="text-align: left" class="pad_top_8"><bean:message key="Order_By"/></th>
           				<td></td>
           				<td></td>
	              	</tr>
	              	<tr>
              			<td><input type="radio" name="order_by" id="order_by1" value="" checked><label for="order_by1"><bean:message key="GL_No"/></label></td>
	            		<td nowrap class="text_check_title"><input type="radio" name="order_by" id="order_by2" value=""><label for="order_by2"><bean:message key="GL_Description"/></label></td>
	            		<td></td>
	              	</tr>
				</tbody>
	      	</table>
	      	<div style="display:none">
				<script language="javascript">comSheetObject('sheet1');</script>
			</div>
	    </div>
		<div class="opus_design_inquiry sm">
	        <table>
	       		<colgroup>
		       	<col width="150">
		       	<col width="100">
		       	<col width="*">
	       		</colgroup>
	       		<tbody>
                    <tr>
           				<th style="text-align: left" class="pad_top_8"><bean:message key="Currency"/></th>
           				<td></td>
           				<td></td>
           			</tr>
           			
                    <tr>
              			<td><input type="radio" name="s_curr_opt" id="f_curr_multi" value="M" checked><label for="f_curr_multi"><bean:message key="Multi_Currency"/></label></td>
	            		<td></td>
	            		<td></td>
           			</tr>

           			<tr>
           				<td>
             				<input type="radio" name="s_curr_opt" id="f_curr_one" value="O" onClick="javascript:if(frm1.s_curr_cd.value != ''){doWork('CURR_SEARCH');}"/> <bean:message key="One_Currency"/>
	               		</td>
	               		<td>
	                    	<h3 class="title_design"><bean:message key="To_Currency"/></h3>
	                    </td>
	            		<td>
	                    	<select name="s_curr_cd" OnChange="doWork('CURR_SEARCH');" >
                          			<bean:define id="paramCurrList"  name="valMap" property="currList"/>
								<logic:iterate id="CurrVO" name="paramCurrList">
                          			<option value='<bean:write name="CurrVO"/>'><bean:write name="CurrVO"/></option>
                    			</logic:iterate>
                   			</select>   
                         </td>
                     </tr>
		            </tbody>
		        </table>
		        <div class="opus_design_grid clear" id="mainTable" style="width: 360px;">
					<script type="text/javascript">comSheetObject('sheet2');</script>
				</div>
		</div>
	</div>
</div>
<iframe name="pdfDn" style="width:0;height:0;visibility:hidden" border=0></iframe>
</form>
		
<script type="text/javascript">
doBtnAuthority("<%= roleBtnVO.getAttr_extension() %>");
</script>
