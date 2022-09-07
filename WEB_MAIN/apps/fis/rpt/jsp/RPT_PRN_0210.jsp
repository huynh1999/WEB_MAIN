<%--
=========================================================
*@FileName   : RPT_PRN_0210.jsp
*@FileTitle  : CMM
*@Description: package search pop
*@author     : 
*@version    : 
*@since      : 

*@Change history:
*@author     : Tuan.Chau
*@version    : 2.0 - 2014/07/17
*@since      : 2014/07/17
=========================================================
--%>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
    <%@include file="./../../../../syscommon/header/CLTHeader.jsp"%>
	<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css"/>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/PFM_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/apps/fis/rpt/RPT_PRN_0210.js?ver=<%=CLT_JS_VER%>"></script>

	<style>
		body {border-top-width:8px!important;}
	</style>
	
<%
	String ofcCd = userInfo.getOfc_cd();
    String usrId = userInfo.getUsrid();
    
    //#5178 [AIF] Block function/button add to Other Operation Profit Report popup
    String ofcLoclNm 	= userInfo.getOfc_locl_nm();
	String usrNm 		= userInfo.getUser_name();
	String ofcEngNm 	= userInfo.getOfc_eng_nm();
	String usrPhn		= userInfo.getPhn();
	String usrFax		= userInfo.getFax();
	String email 		= userInfo.getEml();
	String eml_con      = userInfo.getEml_con();
	String cnt_cd 		= userInfo.getOfc_cnt_cd();
%>
	
	<bean:parameter name="ref_no" id="ref_no"/>
	<bean:parameter name="oth_seq" id="oth_seq"/>
	<bean:parameter name="air_sea_clss_cd" id="air_sea_clss_cd"/>
	<bean:parameter name="bnd_clss_cd" id="bnd_clss_cd"/>
	<bean:parameter name="biz_clss_cd" id="biz_clss_cd"/>
	
	<bean:define id="valMap"  	 name="EventResponse" property="mapVal"/>
	<bean:define id="ofcInfo"  name="valMap" property="ofcInfo"/>
	<script>	
	<!-- ###Profit Curr 항목### -->
	var GLO_USR_ID = "<%=usrId%>";
	var PROFITCURR = '';
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
	</logic:notEmpty>
	
	
	var MULTI_CURR_FLAG = "<%="Y".equals((String)application.getAttribute("MULTI_CURR_FLAG")) ? "Y" : "N" %>";	//[20141125 OJG] - Multi Currency 사용 여부
	

	</script>	
	
<script type="text/javascript">
<!--
function setupPage() {
	loadPage();
}
//-->
var prn_ofc_cd = "<%=(String)application.getAttribute("PRNT_OFC_CD")%>";
//#1299 [BNX] One Currency 옵션 - Office Code화면 Accounting Decimal Point 적용 보완
var xch_rt_dp_cnt = Number("<bean:write name="ofcInfo" property="xch_rt_dp_cnt"/>");
</script>
<!-- OFVFOUR-8210: [KHAN] Remove the validation when hitting the Block button -->
<!--  Complete Image  -->
<div id="COMPLETE_IMG" style="position:fixed;display:none; filter:alpha(opacity = 100); width:280px;height:60px;top:50%;left:50%;margin:-30px 0 0 -140px;z-index:999">
	<iframe src='<%=CLT_PATH%>/js/common/completed.html' scrolling='no'  style='margin-top: 0px; width:100%; height: 60px;'></iframe>
</div>
<form name="frm1" method="POST" action="./">
	<input	type="hidden" name="f_cmd"/> 
	<!-- Report Value -->
	<input	type="hidden" name="cmd_type"/>
	<input	type="hidden" name="file_name"/>
	<input	type="hidden" name="rd_param"/>
	<input	type="hidden" name="title"/>
	<input	type="hidden" name="f_usr_id" value="<%= userInfo.getUsrid()%>"/>
	<input	type="hidden" name="f_ofc_cd" value="<%= userInfo.getOfc_cd()%>"/>
	
	<!--  #2627 - [CLT] ACCT REPORT - ONE CURRENCY OPTION CURRENCY SETUP - item 2 by thoa.dien 170828-->
	<logic:notEmpty name="ofcInfo" property="locl_curr_cd">
		<input  type="hidden" name="h_curr_cd" value="<bean:write name="ofcInfo" property="locl_curr_cd"/>"/>
	</logic:notEmpty>
	<logic:empty name="ofcInfo" property="locl_curr_cd">
		<input type="hidden" name="h_curr_cd" value="<bean:write name="ofcInfo" property="trf_cur_cd"/>"/>
	</logic:empty>
	
	<!-- Report Value -->
	<input	type="hidden" name="oth_seq" value='<bean:write name="oth_seq"/>'/>
	<input	type="hidden" name="air_sea_clss_cd" value='<bean:write name="air_sea_clss_cd"/>'/>
	<input	type="hidden" name="bnd_clss_cd" value='<bean:write name="bnd_clss_cd"/>'/>
	<input	type="hidden" name="biz_clss_cd" value='<bean:write name="biz_clss_cd"/>'/>
	
	<input	type="hidden" name="one_curr_rate_sql" value=''/>
	<!--  #3593 [JTC]Profit Report & Performance Report 수정 사항 -->
	<input  type="hidden" name="locl_curr_cd" value="<bean:write name="ofcInfo" property="locl_curr_cd"/>"/>
	<input  type="hidden" name="gl_view_falg" value=""/>	
	
	<!-- #5178 [AIF] Block function/button add to Other Operation Profit Report popup (B) -->	
	<input type="hidden" name="s_block_status" value=""/>
	<input type="hidden" name="s_inv_block_status" value=""/>
	
	<!-- Report Value (invoice) -->
	<input	type="hidden" name="f_usrId"  value="<%= usrId %>"/>
	<input	type="hidden" name="f_usrPhn" value="<%= usrPhn %>"/>
	<input	type="hidden" name="f_usrFax" value="<%= usrFax %>"/>
	<input	type="hidden" name="f_usr_nm" value="<%= usrNm %>"/>
	<input	type="hidden" name="f_email"  value="<%= email %>"/>
	<input	type="hidden" name="f_eml_content"  value="<%= eml_con %>"/>
	<input	type="hidden" name="f_cnt_cd" value="<%= cnt_cd %>"/>
	
	
	<input	type="hidden" name="mailTitle" value=""/>
	<input	type="hidden" name="mailTo" value=""/>
	<input  type="hidden" name="f_inv_seq" value=""/>
	<input  type="hidden" name="oth_seq_tmp" />
	<input	type="hidden" name="f_ofc_loc_nm" value="<%= ofcLoclNm %>"/>
	
	<!--  Report ==> OutLook연동 파라미터 -->
	<input type="hidden" name="rpt_biz_tp"/>
	<input type="hidden" name="rpt_biz_sub_tp"/>

	<!--  #5178 [AIF] Block function/button add to Other Operation Profit Report popup (E) -->	
	
	<div class="layer_popup_title">
		<div class="page_title_area clear">
			<h2 class="page_title"><span><bean:message key="Profit_Report"/></span></h2>
			<div class="opus_design_btn"><!--
			--><button type="button" class="btn_accent" onclick="doWork('SEARCHLIST')"><bean:message key="Search"/></button><!--
			--><button type="button" class="btn_accent" onclick="doWork('Print')" id="btnPrint"><bean:message key="Print"/></button><!--
			--><button type="button" class="btn_normal" style="display:inline;" id="btnBlock" btnAuth="BLOCK" onClick="doWork('BLOCK')"><bean:message key="Block"/></button><!--
			--><button type="button" class="btn_normal"  onclick="doWork('CLOSE')"><bean:message key="Close"/></button>
			</div>
		</div>
	</div>
	<div class="layer_popup_contents">
<div class="over_wrap" height="100%">
		<div class="wrap_search">
			<div class="opus_design_inquiry ">
			<table>
				<colgroup>
					<col width="100px"></col>
					<col width="100px"></col>
					<col width="*"></col>
				</colgroup>
				<tbody>
				<tr><!-- WMS ACCOUNT LKH 2015.01.20 -->
					<th width="100px"><logic:equal name="air_sea_clss_cd" value="W"><bean:message key="WMS_Filing_No"/></logic:equal>
						<logic:notEqual name="air_sea_clss_cd" value="W"><bean:message key="Other_Reference_No"/></logic:notEqual></th>
		            <td  width="100px"><input name="f_ref_no" type="text" class="search_form-disable" value="<bean:write name="ref_no"/>" class="search_form" readOnly></td>
		            <td></td>
		        </tr>
	           </tbody>
	          </table> 
	          </div>
		</div>
		 
		<div id="mainForm" class="opus_design_inquiry">
	   			<div class="layout_wrap">
		   			<div class="layout_vertical_2" style="width:450px;">
		   				<table>
		   					<colgroup>
								<col width="80">
								<col width="80">
								<col width="*">
							</colgroup>
			           		<tr> 
				                <th colspan='3' style="text-align:left;height: 20px;"><bean:message key="Print_Option"/></th>
				           	</tr>  
				           <tr> 
				               <td><input type="radio" name="f_prn_opt" id="f_opt_dtl" value="D" onClick="prn_opt_sheet()"><label for="f_opt_dtl"><bean:message key="Detail"/></label></td>
				               <td><input type="radio" name="f_prn_opt" id="f_opt_sum" value="S" onClick="prn_opt_sheet()"><label for="f_opt_sum"><bean:message key="Summary"/></label></td>
				               <td></td>
				           </tr>    
			            </table>
			            <table><tr height="10px"></tr></table>
			            <table>
			            	<colgroup>
								<col width="*">
							</colgroup>
			           		<tr> 
				                <th style="text-align:left;height: 20px;" colspan="2"><bean:message key="Currency"/></th>
					        </tr>  
					        <tr>     
				                <td><input type="radio" name="f_curr_opt" id="f_curr_multi" value="M" checked/><label for="f_curr_multi"><bean:message key="Multi_Currency"/></label></td>
				                <td></td>
				            </tr>   
				           <tr> 
				               <td width="90px"><input type="radio" name="f_curr_opt" id="f_curr_one" value="O" onClick="javascript:if(frm1.f_curr_cd.value != ''){doWork('CURR_SEARCH');}"/><label for="f_curr_one"><bean:message key="One_Currency_to"/></label>				          	   
				          	   	   <bean:define id="paramCurrList"  name="valMap" property="currList"/>
						            <select name="f_curr_cd" OnChange="doWork('CURR_SEARCH');">
										<logic:iterate id="CurrVO" name="paramCurrList">
	                            			<option value='<bean:write name="CurrVO"/>'><bean:write name="CurrVO"/></option>
	                            		</logic:iterate>
	                            	</select></td>
				          		<td>
				          			<bean:message key="Base_on"/>&nbsp;
				          			<bean:define id="Exange_Rate_Type" name="valMap" property="Exange_Rate_Type"/>
									<select id="ex_rate_type" name="ex_rate_type" OnChange="doWork('CURR_SEARCH');">								
										<logic:iterate id="comVO" name="Exange_Rate_Type">
											<option value='<bean:write name="comVO" property="cd_val"/>'><bean:write name="comVO" property="cd_nm"/></option>									
										</logic:iterate>
									</select> 
				          	   </td>		               
				            </tr> 
			            </table>		   				
					</div>
					<div class="layout_vertical_2">			   			
			   			<div class="opus_design_grid" id="mainTable" style="width: 320px;">
							<script language="javascript">comSheetObject('sheet1');</script>
						</div>
					</div>
					<table><tr height="5px"></tr></table>
				</div>
	   		</div>
	   	</div>
	   	<div class="wrap_result" >
			<div class="opus_design_grid" style="width:1195px;">
				<div id="mainTable2" >
					<script language="javascript">comSheetObject('sheet2');</script>
				</div>
				<div id="mainTable3" style="display:none;">
					<script language="javascript">comSheetObject('sheet3');</script>
				</div>
			</div>
			<div class="opus_design_inquiry">
				<div class="layout_wrap">
		   			<div class="layout_flex_fixed">
		   				
		   			</div>
		   			<div class="layout_flex_flex" style="padding-left:calc(100% - 420px)">
		   				<div style="display:none;" id="blockDiv_D">
							<table>
			   					<colgroup>
									<col width="*">
								</colgroup> 
					           <tr> 
					               <td><select name="f_block" id="f_block_d" OnChange="doWork('BLOCK_SEARCH_D',this.value);"></select><!--  
					               --><b><bean:message key="Blocked_By"/></b>&nbsp;<!--  
					               --><input name="f_block_name_d" type="text" class="search_form-disable" value="" style="width:120px;" readOnly><!--  
					               --><b><bean:message key="at"/></b>&nbsp;<!--  
					               --><input name="f_block_tms_d" type="text" class="search_form-disable" value="" style="width:80px;" readOnly></td>
					           </tr>    
				            </table>
						</div>
						<div style="display:none;" id="blockDiv_S">
							<table>
			   					<colgroup>
									<col width="*">
								</colgroup> 
					           <tr> 
					               <td><select name="f_block" id="f_block_s" OnChange="doWork('BLOCK_SEARCH_S',this.value);"></select><!--  
					               --><b><bean:message key="Blocked_By"/></b>&nbsp;<!--  
					               --><input name="f_block_name_s" type="text" class="search_form-disable" value="" style="width:120px;" readOnly><!--  
					               --><b><bean:message key="at"/></b>&nbsp;<!--  
					               --><input name="f_block_tms_s" type="text" class="search_form-disable" value="" style="width:80px;" readOnly></td>
					           </tr>    
				            </table>
						</div>
		   			</div>
		   		</div>								
			</div>
<!-- 		   	<iframe name="ifrm1" src="" frameborder="0" scrolling="no" width="200" height="0"></iframe> -->
	   	</div>
</div>
</form>

