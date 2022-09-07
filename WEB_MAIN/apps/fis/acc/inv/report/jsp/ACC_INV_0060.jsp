<%--
=========================================================
*@FileName	: ACC_INV_0060.jsp
*@FileTitle	: Performance Report2
*@Description: Performance Report2
*@author	 : Kang dae soo - Cyberlogitec
*@version	: 1.0 - 11/15/2009
*@since		: 11/15/2009

*@Change history:
=========================================================
--%>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="clt-paging"	prefix="paging" %>
	<!-- 공통 Header -->
	<%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
	<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css"/>
	<!-- 일자 및 달력팝업 호출 -->
	<script language="javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/ACC_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="./apps/fis/acc/inv/report/script/ACC_INV_0060.js?ver=<%=CLT_JS_VER%>"></script>
	<script>
		function setupPage(){
			loadPage();
		}
	</script>
<form name="frm1" method="POST" action="./">
	<!--Command를 담는 공통 -->
	<input type="hidden" name="f_cmd"/> 
	<input type="hidden" name="f_CurPage"/>
	<!-- page_title_area(S)  -->
	<div class="page_title_area clear">
			<!-- page_title(S) -->
			<h2 class="page_title"><button type="button"><bean:message key="Sales_Profit_Summary_Report_II"/></button></h2>
			<!-- page_title(E) -->
			
			<!-- opus_design_btn(S) -->
			<div class="opus_design_btn"><!-- 
				--><button type="button" class="btn_accent" onclick="doWork('SEARCHLIST')"><bean:message key="Search"/></button><!-- 
				--><button type="button" class="btn_normal" onclick="doWork('NEW')"><bean:message key="New"/></button><!-- 
				--><button type="button" class="btn_normal" onclick="doWork('PRINT')"><bean:message key="Print"/></button>
			</div>
			<!-- opus_design_btn(E) -->
    
  			<!-- page_location(S) -->
			<div class="location">	
				 <span><bean:message key="Home"/></span> &gt;
			 	 <span><bean:message key="MDM"/></span> &gt;
			  	 <span><bean:message key="Sales_Profit_Summary_Report_II"/></span>
		   		<a href="" class="ir">URL Copy</a>
			</div>
			<!-- page_location(E) -->
	</div>
    <!-- page_title_area(E) -->
<div class="over_wrap" height="100%">
	<div class="wrap_search">
		<div class="opus_design_inquiry ">
			<table>
				<colgroup>
					<col width="65">
					<col width="120">
					<col width="100">
					<col width="65">
					<col width="95">
					<col width="65">
					<col width="95">
					<col width="65">
					<col width="95">
					<col width="*">
				</colgroup>
				<tbody>
					<tr>
						<th><bean:message key="Sea_Air"/></th>
	                    <td>
	                     	<select required name="air_sea_clss_cd" class="search_form">
	                     		<option value="S">Sea</option>
	                     		<option value="A">Air</option>
	                     	</select>
						</td>
						<th><bean:message key="Report_Type"/></th>
                        <td class="table_search_body">
                        	<select required name="rpt_type" class="search_form">
                        		<option value="dept">Team</option>
                        		<option value="usr">Salesman</option>
                        		<option value="cust"><bean:message key="Customer"/></option>
                        		<option value="del">Delivery Place</option>
                        	</select>
						</td>
						<th><bean:message key="Bound"/></th>
						<td>
							<select required name="bnd_clss_cd" class="search_form">
							<bean:define id="rtnMap" name="EventResponse" property="mapVal"/>
								<option value=''>ALL</option>
								<bean:define id="param1List"  name="rtnMap" property="PARAM1"/>
	                           	<logic:iterate id="codeVO" name="param1List">
								<option value='<bean:write name="codeVO" property="cd_val"  filter="false"/>'><bean:write name="codeVO" property="cd_nm"  filter="false"/></option>
								</logic:iterate>
							</select>
						</td>
						<th><bean:message key="ETD_ETA"/></th>
						<td>
							<input required name="fm_et_dt" id="fm_et_dt" type="text" value='' onKeyUp="mkDateFormat(this,event,false)" onBlur="mkDateFormat(this, event, true)" class="search_form" style="width:72px;" maxlength="12"/><!-- 
						 --><button type="button" class="calendar ir" id="fm_et_dt_cal" onclick="doDisplay('DATE1', frm1);"></button><!-- 
						 -->~&nbsp;<!-- 
						 --><input required name="to_et_dt" id="to_et_dt" type="text" value='' onKeyUp="mkDateFormat(this,event,false)" onBlur="mkDateFormat(this, event, true)" class="search_form" style="width:72px;" maxlength="12"/><!-- 
						 --><button type="button" class="calendar ir" id="to_et_dt_cal" onclick="doDisplay('DATE2', frm1);"></button>
						</td>
						<th><bean:message key="Team"/></th>
						<td>
							<select required name="dept_cd">
								<option value=''>ALL</option>
								<bean:define id="param2List"  name="rtnMap" property="PARAM2"/>
		                           	<logic:iterate id="codeVO" name="param2List">
									<option value='<bean:write name="codeVO" property="cd_val"  filter="false"/>'><bean:write name="codeVO" property="cd_nm"  filter="false"/></option>
									</logic:iterate>
							</select>
						</td>
						
					</tr>
				</tbody>
			</table>
			<table>
				<colgroup>
					<col width="30">
					<col width="120">
					<col width="30">
					<col width="120">
					<col width="30">
					<col width="120">
					<col width="40">
					<col width="120">
					<col width="60">
					<col width="*">
				</colgroup>
				<tbody>
					 <tr>
						<th><bean:message key="POL"/></th>
						<td>
							<input name="pol_cd" maxlength="5" value='' type="text" class="search_form" onKeyDown="codeNameAction('Location_pol',this, 'onKeyDown')" onBlur="codeNameAction('Location_pol',this, 'onBlur');javascript:this.value=this.value.toUpperCase();" dataformat="excepthan" style="ime-mode:disabled;text-transform:uppercase;width:50;"><!-- 
						 --><button type="button" class="input_seach_btn" tabindex="-1" id="pol"  onclick="doWork('POL_POPLIST')"></button>
						</td>
						<th><bean:message key="POD"/></th>
						<td>
							<input name="pod_cd" maxlength="5" value='' type="text" class="search_form" onKeyDown="codeNameAction('Location_pod',this, 'onKeyDown')" onBlur="codeNameAction('Location_pod',this, 'onBlur');javascript:this.value=this.value.toUpperCase();" dataformat="excepthan" style="ime-mode:disabled;text-transform:uppercase;width:50;"><!-- 
						 --><button type="button" class="input_seach_btn" tabindex="-1" id="pod"  onclick="doWork('POD_POPLIST')"></button>
						</td>
						<th><bean:message key="DEL"/></th>
						<td>
							<input name="del_cd" maxlength="5" value='' type="text" class="search_form" onKeyDown="codeNameAction('Location_del',this, 'onKeyDown')" onBlur="codeNameAction('Location_del',this, 'onBlur');javascript:this.value=this.value.toUpperCase();" dataformat="excepthan" style="ime-mode:disabled;text-transform:uppercase;width:50;"><!-- 
						 --><button type="button" class="input_seach_btn" tabindex="-1" id="del"  onclick="doWork('DEL_POPLIST')"></button>
						</td>
						<th><bean:message key="User"/></th>
						<td>
							<input name="usr_cd" value='' type="text" class="search_form" onKeyDown="codeNameAction('user',this, 'onKeyDown')" onBlur="codeNameAction('user',this, 'onBlur');javascript:this.value=this.value.toUpperCase();" dataformat="excepthan" style="ime-mode:disabled;text-transform:uppercase;width:50;"><!-- 
						 --><button type="button" class="input_seach_btn" tabindex="-1" id="user"  onclick="doWork('USER_POPLIST')"></button><!-- 
						 --><input name="usr_nm" value='' type="text" class="search_form-disable" dataformat="excepthan" style="ime-mode:disabled;text-transform:uppercase;width:100;" disabled="true">
						</td>
						<th><bean:message key="Customer"/></th>
						<td>
							<input name="trdp_cd" maxlength="20" value='' type="text" CUSTOMER_POPLIST="search_form" onKeyDown="codeNameAction('trdpCode',this, 'onKeyDown')" onBlur="codeNameAction('trdpCode',this, 'onBlur');javascript:this.value=this.value.toUpperCase();" dataformat="excepthan" style="ime-mode:disabled;text-transform:uppercase;width:50;"><!-- 
						 --><button type="button" class="input_seach_btn" tabindex="-1" id="trdp_cd"  onclick="doWork('CUSTOMER_POPLIST')"></button><!-- 
						 --><input name="trdp_nm" maxlength="20" value='' type="text" class="search_form-disable" dataformat="excepthan" style="ime-mode:disabled;text-transform:uppercase;width:100;" disabled="true">
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
	<div class="wrap_result">
		<div class="opus_design_grid">
			<h3 class="title_design"><bean:message key="Basic_Information"/></h3>
			<div class="opus_design_btn"><!-- 
				--><button type="button" class="btn_accent" onclick="doWork('EXCEL')" id="excel" style="display:none" name="btn_DownExcel"><bean:message key="Excel"/></button><!-- 
				--><button type="button" class="btn_normal" onclick="doWork('ROWADD')" id="rowAdd" style="display:none"><bean:message key="New"/></button>
			</div>
			<script language="javascript">comSheetObject('sheet1');</script>
			<script language="javascript">comSheetObject('sheet2');</script>
		</div>
	</div>
</div>
</form>
<script>
	var pDoc = parent.parent.parent.document;
	hideProcess('WORKING', pDoc);
</script>
