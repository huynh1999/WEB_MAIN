<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
    <%@include file="./../../../../syscommon/header/CLTHeader.jsp"%>
	<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css"/>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/PFM_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/apps/fis/rpt/RPT_PRN_0190.js?ver=<%=CLT_JS_VER%>"></script>
	
<%
	String ofcCd = userInfo.getOfc_cd();
    String glo_usr_id = userInfo.getUsrid();
%>
	
	<bean:parameter name="ref_no" id="ref_no"/>
	<bean:parameter name="mbl_no" id="mbl_no"/>
	<bean:parameter name="intg_bl_seq" id="intg_bl_seq"/>
	<bean:parameter name="air_sea_clss_cd" id="air_sea_clss_cd"/>
	<bean:parameter name="bnd_clss_cd" id="bnd_clss_cd"/>
	<bean:parameter name="biz_clss_cd" id="biz_clss_cd"/>
	
	<bean:define id="valMap"  	 name="EventResponse" property="mapVal"/>
	<bean:define id="ofcInfo"  name="valMap" property="ofcInfo"/>
	
	<script>	
	<!-- ###Profit Curr 항목### -->
	var GLO_USR_ID = "<%=glo_usr_id%>";
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
	
	
	function setupPage(){
		loadPage();
	}
	// #1299 [BNX] One Currency 옵션 - Office Code화면 Accounting Decimal Point 적용 보완
	var xch_rt_dp_cnt = Number("<bean:write name="ofcInfo" property="xch_rt_dp_cnt"/>");
	</script>	
<style> body { border-top-width: 6px!important; } </style>
<form name="frm1" method="POST" action="./">
	<input	type="hidden" name="f_cmd"/> 
	<!-- Report Value -->
	<input	type="hidden" name="cmd_type"/>
	<input	type="hidden" name="file_name"/>
	<input	type="hidden" name="rd_param"/>
	<input	type="hidden" name="title"/>
	
	<input	type="hidden" name="f_ofc_cd" value="<%= userInfo.getOfc_cd()%>"/>
	<!--  #2627 - [CLT] ACCT REPORT - ONE CURRENCY OPTION CURRENCY SETUP - item 2 -->
	<logic:notEmpty name="ofcInfo" property="locl_curr_cd">
		<input  type="hidden" name="h_curr_cd" value="<bean:write name="ofcInfo" property="locl_curr_cd"/>"/>
	</logic:notEmpty>
	<logic:empty name="ofcInfo" property="locl_curr_cd">
		<input type="hidden" name="h_curr_cd" value="<bean:write name="ofcInfo" property="trf_cur_cd"/>"/>
	</logic:empty>
	
	<!-- Report Value -->
	<input	type="hidden" name="intg_bl_seq" value='<bean:write name="intg_bl_seq"/>'/>
	<input	type="hidden" name="air_sea_clss_cd" value='<bean:write name="air_sea_clss_cd"/>'/>
	<input	type="hidden" name="bnd_clss_cd" value='<bean:write name="bnd_clss_cd"/>'/>
	<input	type="hidden" name="biz_clss_cd" value='<bean:write name="biz_clss_cd"/>'/>
	
	<input	type="hidden" name="one_curr_rate_sql" value=''/>
	
	<!--  #3593 [JTC]Profit Report & Performance Report 수정 사항 -->
	<input  type="hidden" name="locl_curr_cd" value="<bean:write name="ofcInfo" property="locl_curr_cd"/>"/>
	<input  type="hidden" name="gl_view_falg" value=""/>	
	
	<div class="layer_popup_title">
		<div class="page_title_area clear">
			<h2 class="page_title"><span><bean:message key="Profit_Report_by_HBL"/></span></h2>
			<div class="opus_design_btn">
				<button type="button" class="btn_accent" onclick="doWork('SEARCHLIST')" ><bean:message key="Search"/></button><!-- 
			--><button type="button" class="btn_normal"  onclick="doWork('Print')"><bean:message key="Print"/></button><!-- 
			--><button type="button" class="btn_normal" onclick="doWork('EXCEL')" name="btn_DownExcel"><bean:message key="Excel"/></button><!-- 
			--><button type="button" class="btn_normal"  onclick="doWork('MINIMIZE')" name="btn_minimize" id="btn_minimize"><bean:message key="Minimize"/></button><!-- 
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
						<col width="50">
						<col width="100">
						<col width="110">
						<col width="*">
					</colgroup>
					<tbody>
				        <tr>
				            <th><bean:message key="Ref_No"/></th>
				            <td>
				            	<input name="f_ref_no" type="text" class="search_form-disable" value="<bean:write name="ref_no"/>" class="search_form" readOnly></td>
				            <th>
				            	<span id = "mbl" style="display:none"><bean:message key="MBL_No"/></span>
								<span id = "mawb" style="display:none"><bean:message key="MAWB_No"/></span>
				            </th>
				            <td>
				            	<input name="f_bl_no" type="text" class="search_form-disable" value="<bean:write name="mbl_no"/>" style="width:130px;" class="search_form" readOnly></td>           
				        </tr>
			        </tbody>
			    </table>
			</div>
			<div class="opus_design_inquiry" id="mainForm">
				<table>
					<colgroup>
						<col width="100">
						<col width="*">
					</colgroup>
					<tbody>
						<tr>
							<th colspan="2" style="text-align: left;"><bean:message key="Currency"/></th>
						</tr>
			           <tr>     
			               <td colspan='2'>
	                         	<input type="radio" name="f_curr_opt" id="f_curr_multi" value="M" checked/><label for="f_curr_multi"><bean:message key="Multi_Currency"/></label>
			               </td>
			          </tr>   
		          </tbody>
	            </table>
				<div class="layout_wrap">
					<div class="layout_vertical_2" style="width: 365px;">
						<table>
							<colgroup>
								<col width="100">
								<col width="80">
								<col width="*">
							</colgroup>
							<tbody>
				           <tr> 
				                <td>
		                       		<input type="radio" name="f_curr_opt" id="f_curr_one" value="O" onClick="javascript:if(frm1.f_curr_cd.value != ''){doWork('CURR_SEARCH');}"/><label for="f_curr_one"><bean:message key="One_Currency_to"/></label>
				               </td>
				               <td><select name="f_curr_cd" OnChange="doWork('CURR_SEARCH');">
	                            		<bean:define id="paramCurrList"  name="valMap" property="currList"/>
										<logic:iterate id="CurrVO" name="paramCurrList">
	                            			<option value='<bean:write name="CurrVO"/>'><bean:write name="CurrVO"/></option>
	                            		</logic:iterate>
	                            	</select>
	                           </td>
				               <td>
				                    <bean:message key="Base_on"/>
	                            	<bean:define id="Exange_Rate_Type" name="valMap" property="Exange_Rate_Type"/>
									<select id="ex_rate_type" name="ex_rate_type" OnChange="doWork('CURR_SEARCH');">								
										<logic:iterate id="comVO" name="Exange_Rate_Type">
										<option value='<bean:write name="comVO" property="cd_val"/>'><bean:write name="comVO" property="cd_nm"/></option>									
										</logic:iterate>
									</select>                              	
	                            </td>
				          </tr> 
				          </tbody>
			            </table>
					</div>
					<div class="layout_vertical_2">
						<div class="opus_design_grid" style="width: 320px">
							<script language="javascript">comSheetObject('sheet1');</script>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="wrap_result">
			<div class="opus_design_grid">
				<script language="javascript">comSheetObject('sheet2');</script>
			</div>
		</div>
	</div>
</div>
</form>



