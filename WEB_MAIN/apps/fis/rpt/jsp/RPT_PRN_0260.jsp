<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>

    <%@include file="./../../../../syscommon/header/CLTHeader.jsp"%>
	<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css" />
	<script language="javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/PFM_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/apps/fis/rpt/RPT_PRN_0260.js?ver=<%=CLT_JS_VER%>"></script>
<%-- 	<script language="javascript" src="<%=CLT_PATH%>/web/script/DateFormat.js?ver=<%=CLT_JS_VER%>"></script> --%>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CoBizCommon.js?ver=<%=CLT_JS_VER%>"></script>
	
<%
	String ofcCd = userInfo.getOfc_cd();

	String ofcLoclNm 	= userInfo.getOfc_locl_nm();
	String usrNm 		= userInfo.getUser_name();
	String ofcEngNm 	= userInfo.getOfc_eng_nm();
	String usrId		= userInfo.getUsrid();
	String usrPhn		= userInfo.getPhn();
	String usrFax		= userInfo.getFax();
	String email 		= userInfo.getEml();
	String eml_con      = userInfo.getEml_con();
	String cnt_cd 		= userInfo.getOfc_cnt_cd();
	
%>
	
	<bean:parameter name="bkg_no" id="bkg_no"/>
	<bean:parameter name="bkg_seq" id="bkg_seq"/>
	<bean:parameter name="biz_clss_cd" id="biz_clss_cd"/>
	<bean:parameter name="entry_yn" id="entry_yn"/>
	
	<bean:define id="valMap"  	 name="EventResponse" property="mapVal"/>
	<bean:define id="ofcInfo"  name="valMap" property="ofcInfo"/>
	
	<script>	
	<!-- ###Profit Curr 항목### -->
	<%-- var PROFITCURR = '';
	<logic:notEmpty name="valMap" property="profitCurrList">
	<% boolean isBegin = false; %>
	<bean:define id="paramProfitCurrList"  name="valMap" property="profitCurrList"/>
    <logic:iterate id="CurrVO" name="paramProfitCurrList">
	<% if(isBegin){ %>
    	 PROFITCURR+= '|';
    <% }else{
    	 isBegin = true;
       } %>
    	PROFITCURR+= '<bean:write name="CurrVO" property="curr_cd"/>';
	</logic:iterate>
	</logic:notEmpty> --%>
	
	var BKGSTSCD = ' |';
	var BKGSTSNM = ' |';
	<% boolean isBegin = false; %>
    <bean:define id="bkgStsCdList" name="valMap" property="bkgStsCdList"/>
	<logic:iterate id="BgkStsCdVO" name="bkgStsCdList">
		<% if(isBegin){ %>
			BKGSTSCD+= '|';
			BKGSTSNM+= '|';
		<% }else{
			  isBegin = true;
		   } %>
		   BKGSTSCD+= '<bean:write name="BgkStsCdVO" property="cd_val"/>';
		   BKGSTSNM+= '<bean:write name="BgkStsCdVO" property="cd_nm"/>';
	</logic:iterate>
	
	var MULTI_CURR_FLAG = "<%="Y".equals((String)application.getAttribute("MULTI_CURR_FLAG")) ? "Y" : "N" %>";	//[20141125 OJG] - Multi Currency 사용 여부
	
	function setupPage(){
		loadPage();
    }
	//#1299 [BNX] One Currency 옵션 - Office Code화면 Accounting Decimal Point 적용 보완
	var xch_rt_dp_cnt = Number("<bean:write name="ofcInfo" property="xch_rt_dp_cnt"/>");
	</script>

<div id="WORKING_IMG" style="position: fixed;left: 0; right: 0; bottom: 0; top: 0;z-index: 100;display: none;" valign="middle" align="center">     
     <iframe src='<%=CLT_PATH%>/js/common/wait.html' scrolling='no' frameborder='0' style="position: absolute;top: 40%;left: 40%;"></iframe>
</div>
<!--  Complete Image  -->
<div id="COMPLETE_IMG" style="position:fixed;display:none; filter:alpha(opacity = 100); width:280px;height:60px;top:50%;left:50%;margin:-30px 0 0 -140px;z-index:999">
	<iframe src='<%=CLT_PATH%>/js/common/completed.html' scrolling='no'  style='margin-top: 0px; width:100%; height: 60px;'></iframe>
</div>
<style> body { border-top-width: 6px!important; } </style>
<form name="frm1" method="POST" action="./">
	<input	type="hidden" name="f_cmd"/> 
	<!-- Report Value -->
	<input	type="hidden" name="cmd_type"/>
	<input	type="hidden" name="file_name"/>
	<input	type="hidden" name="rd_param"/>
	<input	type="hidden" name="title"/>
	
	<input	type="hidden" name="f_ofc_cd" value="<%= userInfo.getOfc_cd()%>"/>
	
	<!--  #2627 - [CLT] ACCT REPORT - ONE CURRENCY OPTION CURRENCY SETUP - item 2 by thoa.dien 170828 -->
	<logic:notEmpty name="ofcInfo" property="locl_curr_cd">
		<input  type="hidden" name="h_curr_cd" value="<bean:write name="ofcInfo" property="locl_curr_cd"/>"/>
	</logic:notEmpty>
	<logic:empty name="ofcInfo" property="locl_curr_cd">
		<input  type="hidden" name="h_curr_cd" value="<bean:write name="ofcInfo" property="trf_cur_cd"/>"/>
	</logic:empty>
	
	<!-- Report Value -->
	<input	type="hidden" name="bkg_seq" value='<bean:write name="bkg_seq"/>'/>
	<input	type="hidden" name="bkg_no" value='<bean:write name="bkg_no"/>'/>
	<input	type="hidden" name="biz_clss_cd" value='<bean:write name="biz_clss_cd"/>'/>
	<input	type="hidden" name="entry_yn" value='<bean:write name="entry_yn"/>'/>
	
	<input	type="hidden" name="one_curr_rate_sql" value=''/>
	
	<!-- #18793, [GPL]Profit Report jsjang 2013.11.8 -->
	<!-- Report Value -->
	<input	type="hidden" name="f_usrId"  value="<%= usrId %>"/>
	<input	type="hidden" name="f_usrPhn" value="<%= usrPhn %>"/>
	<input	type="hidden" name="f_usrFax" value="<%= usrFax %>"/>
	<input	type="hidden" name="f_usr_nm" value="<%= usrNm %>"/>
	<input	type="hidden" name="f_email"  value="<%= email %>"/>
	<input	type="hidden" name="f_eml_content"  value="<%= eml_con %>"/>
	<input	type="hidden" name="f_cnt_cd" value="<%= cnt_cd %>"/>
	
	<input	type="hidden" name="mailTitle" value=""/>
	<input	type="hidden" name="mailTo" value=""/>
	
	<!--  Report ==> OutLook연동 파라미터 (S) -->
	<input type="hidden" name="rpt_biz_tp"/>
	<input type="hidden" name="rpt_biz_sub_tp"/>

	<!--  Report ==> OutLook연동 파라미터 (E) -->	
	<div class="layer_popup_title">	
		<!-- page_title_area -->
		<div class="page_title_area clear">
			<h2 class="page_title"><bean:message key="Pro_forma_Profit_Report"/></h2>
		   <!-- btn_div -->
		   <div class="opus_design_btn TOP">
			   <%--<button type="button" class="btn_accent" onclick="doWork('SEARCHLIST')"><bean:message key="Search"/></button><!-- 
			--><button type="button" class="btn_normal" onclick="doWork('PRINT')"><bean:message key="Print"/></button><!-- 
			--><span style="display: none;" btnAuth="CONFIRM"><button type="button" class="btn_normal" style="display:none;" onClick="doWork('CONFIRM');" name="btn_Confirm" id="btn_Confirm"><bean:message key="Confirm"/></button></span><!--
			--><button type="button" class="btn_normal" onclick="doWork('EXCEL')"><bean:message key="Excel"/></button><!-- 
			--><button type="button" class="btn_normal" onclick="doWork('CLOSE');"><bean:message key="Close"/></button>--%>
		   </div>
		</div>
	</div>
	<div class="layer_popup_contents">
<div class="over_wrap" height="100%">
		<div class="wrap_search">	
		   	<div class="opus_design_inquiry" style="width: 850px;">
		   		<table>
		   			<colgroup>
						<col width="76">
						<col width="*">
	  				</colgroup>
			        <tr>
			            <th><bean:message key="Bkg_No"/></th>
			            <td><input name="f_bkg_no" type="text" class="search_form-disable" value="<bean:write name="bkg_no"/>" class="search_form" readOnly></td>
			        </tr>
			    </table>
		   	</div>
	   		<div id="mainForm" class="opus_design_inquiry" style="width: 850px;">
	   			<div class="layout_wrap">
		   			<div class="layout_vertical_2" style="width:400px !important;">
			   			<table>
					      	<tr>
					        	<td align="left">
						            <table>
						           		<tr> 
							                <td width="100%" colspan='2'><b><bean:message key="Currency"/></b></td>
							           </tr>  
							           <tr>     
							               <td colspan='2'><input type="radio" name="f_curr_opt" id="f_curr_multi" value="M" checked onClick="removeSheet1();"/> <bean:message key="Multi_Currency"/></td>
							          </tr>   
							           <tr> 
							               <td width="90px" valign="top"><input type="radio" name="f_curr_opt" id="f_curr_one" value="O" onClick="javascript:if(frm1.f_curr_cd.value != ''){doWork('CURR_SEARCH');}"/> <bean:message key="One_Currency"/></td>
							          	   <td>
							          		<table>
							          			<tr>
								          			<th width="80px" valign="top"><img src="<%=CLT_PATH%>/web/img/main/ico_t2.gif" border="0"><bean:message key="To_Currency"/></th>
						                            <td valign="top">&nbsp;&nbsp;
						                            	<bean:define id="paramCurrList"  name="valMap" property="currList"/>
											            <select name="f_curr_cd" OnChange="doWork('CURR_SEARCH');">
															<logic:iterate id="CurrVO" name="paramCurrList">
						                            			<option value='<bean:write name="CurrVO"/>'><bean:write name="CurrVO"/></option>
						                            		</logic:iterate>
						                            	</select>                     	
						                            </td>
							          			</tr>
							          		</table>
							          	</td>		               
							          </tr> 
						            </table>
					        	</td>
					      	</tr>
					    </table>
					</div>
					<div class="layout_vertical_2" style="width:400px !important;">
			   			<table>
					      	<tr height="50px">
					        	<td></td>
					       	</tr>
					    </table>
					    <div class="opus_design_grid" id="mainTable" style="width: 320px;">
							<script language="javascript">comSheetObject('sheet1');</script>
						</div>
					</div>
				</div>
				<div>
					<table>
				      	<tr>
				      		<td>
								<input type="checkBox" name="chk_incl_bkg" id="chk_incl_bkg" onclick="javascript:if(frm1.f_curr_cd.value != '' && getRadioVal(document.getElementsByName('f_curr_opt')) == 'O'){doWork('CURR_SEARCH');};removeSheet2();" checked> <b><bean:message key="Include_profit_of_linked_booking"/></b>
								<input type="hidden" name="incl_bkg" value=""/>
							</td>
				       	</tr>
				    </table>
				</div>
	   		</div>
	   	</div>
	   	<div class="wrap_result" >
	   		<h3 class="title_design"><bean:message key="Freight_List"/></h3>
	   		<div class="opus_design_grid">
				<script language="javascript">comSheetObject('sheet2');</script>
			</div>
		   	<div class="layout_vertical" style="width:100% !important; text-align:right;">
	   			<b><bean:message key="Confirmed_By"/></b>
	   			<input name="f_confirm_by" type="text" class="search_form-disable" value="" style="width:120px;" readOnly>
	   			&nbsp;&nbsp;&nbsp;&nbsp;
	   			<b><bean:message key="at"/></b> 
				<input name="f_confirm_at" type="text" class="search_form-disable" value="" style="width:80px;" readOnly>
		   	</div>		
	   	</div>
	   	<iframe name="ifrm1" src="" frameborder="0" scrolling="no" width="200" height="0"></iframe>
	   	<script language="javascript">comSheetObject('sheet3');</script>
	</div>
</div>
</form>
<script type="text/javascript">
<%
	if(roleBtnVO != null){
%>
		doBtnAuthority("<%= roleBtnVO.getAttr_extension() %>");
<%
	}
%>
</script>




