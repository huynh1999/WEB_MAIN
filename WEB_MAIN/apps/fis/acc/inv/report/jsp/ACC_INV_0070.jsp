<%--
=========================================================
*@FileName   : ACC_INV_0070.jsp
*@FileTitle  : Route Creation
*@Description: Route Creation
*@author     : Kang dae soo - Cyberlogitec
*@version    : 1.0 - 10/15/2009
*@since      : 10/15/2009

*@Change history:
=========================================================
--%>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="clt-paging"   prefix="paging" %>
	<!-- 공통 Header -->
	<%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
	<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css"/>
	<!-- 일자 및 달력팝업 호출 -->
	<script language="javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/ACC_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="./apps/fis/acc/inv/report/script/ACC_INV_0070.js?ver=<%=CLT_JS_VER%>"></script>
	<script>
		function setupPage(){
			loadPage();
		}
	</script>
<script language="javascript">
	<!-- 처리시 메시지 -->
	var PARAM1_1 = ' |';
	var PARAM1_2 = ' |';
	var PARAM2_1 = '';
	var PARAM2_2 = '';
	var typeSize_1 = '';
	var typeSize_2 = '';
	
	
	<bean:define id="rtnMap" name="EventResponse" property="mapVal"/>

	<% boolean isBegin = false; %>
    <!-- Lease Term Code 코드조회-->
	<bean:define id="param1List"  name="rtnMap" property="PARAM1"/>
	<logic:iterate id="codeVO" name="param1List">
		<% if(isBegin){ %>
			PARAM1_1+= '|';
			PARAM1_2+= '|';
		<% }else{
			  isBegin = true;
		   } %>
		PARAM1_1+= '<bean:write name="codeVO" property="cd_nm"  filter="false"/>';
        PARAM1_2+= '<bean:write name="codeVO" property="cd_val" filter="false"/>';
    </logic:iterate>    
   	<!--typeSize 코드조회-->
	var typeSize= '<bean:write name="rtnMap" property="typeSize" filter="false"/>';
	typeSize_2 += ' |';
	typeSize_1 += ' |';  
	typeSize_2 += "A" + typeSize.substring(0, typeSize.indexOf(";"));
	typeSize_1 += typeSize.substring(typeSize.indexOf(";")+1, typeSize.length);


</script>
<form name="frm1" method="POST" action="./">
	<!--Command를 담는 공통 -->
	<input type="hidden" name="f_cmd"/> 
	<input type="hidden" name="f_CurPage"/>
	<input type="hidden" name="hid_air_sea_clss_cd"/>
	<input type="hidden" name="hid_bnd_clss_cd"/>
	<input type="hidden" name="hid_trdp_cd"/>
	<input type="hidden" name="hid_curr_cd"/>
	<input type="hidden" name="hid_fm_et_dt"/>
	<input type="hidden" name="hid_to_et_dt"/>
	<input type="hidden" name="hid_clt_cmpl_flg"/>
	<input type="hidden" name="hid_inv_sts_cd"/>
	<input type="hidden" name="title" value="Partner Balance List"/>
	<input type="hidden" name="cmd_type" value="60"/>
	<!-- page_title_area(S)  -->
	<div class="page_title_area clear">
			<!-- page_title(S) -->
			<h2 class="page_title"><button type="button"><bean:message key="Partner_Statement_Report"/></button></h2>
			<!-- page_title(E) -->
			
			<!-- opus_design_btn(S) -->
			<div class="opus_design_btn"><!-- 
				--><button type="button" class="btn_accent" onclick="doWork('SEARCHLIST')"><bean:message key="Search"/></button><!-- 
				--><button type="button" class="btn_normal" onclick="doWork('NEW')"><bean:message key="New"/></button><!-- 
				--><button type="button" class="btn_normal" id="btnModify" onclick="doWork('MODIFY')"><bean:message key="Save"/></button>
			</div>
			<!-- opus_design_btn(E) -->
    
  			<!-- page_location(S) -->
			<div class="location">	
				 <span><bean:message key="Accounting"/></span> &gt;
			 	 <span><bean:message key="Report"/></span> &gt;
			  	 <span><bean:message key="Partner_Statement_Report"/></span>
		   		<a href="" class="ir">URL Copy</a>
			</div>
			<!-- page_location(E) -->
	</div>
    <!-- page_title_area(E) -->
<div class="over_wrap" height="100%">
	<div class="wrap_search">
		<div class="opus_design_inquiry  ">
			<table>
				<colgroup>
					<col width="50">
					<col width="50">
					<col width="60">
					<col width="100">
					<col width="90">
					<col width="100">
					<col width="90">
					<col width="*">
				</colgroup>
				<tbody>
                   <tr>
                      <th><span id="hdd" style="display:none">&nbsp;</span>
                             <select name="date_cd" style="font-weight: bold;">
                                 <option value="B"><bean:message key="Billing_Date"/></option>
                                 <option value="E"><bean:message key="ETD_ETA"/></option>
                             </select>
                      </th>
						<td>
							<input name="fm_et_dt" id="fm_et_dt" type="text" value='' onKeyUp="mkDateFormat(this,event,false)" onBlur="mkDateFormat(this, event, true)" class="search_form" style="width:72px;" maxlength="12"/><!-- 
						--><button type="button" class="calendar ir" id="fm_et_dt_cal" onclick="doDisplay('DATE1', frm1);"></button><!-- 
						-->~&nbsp;<!-- 
						--><input name="to_et_dt" id="to_et_dt" type="text" value='' onKeyUp="mkDateFormat(this,event,false)" onBlur="mkDateFormat(this, event, true)" class="search_form" style="width:72px;" maxlength="12"/><!-- 
						--><button type="button" class="calendar ir" id="to_et_dt_cal" onclick="doDisplay('DATE2', frm1);"></button>
						</td>
						<th><bean:message key="Bound"/></th>
						<td>
							<select name="bnd_clss_cd" class="search_form">
								<bean:define id="rtnMap" name="EventResponse" property="mapVal"/>
								<option value=''>ALL</option>
								<bean:define id="param1List"  name="rtnMap" property="PARAM1"/>
                            	<logic:iterate id="codeVO" name="param1List">
								<option value='<bean:write name="codeVO" property="cd_val"  filter="false"/>'><bean:write name="codeVO" property="cd_nm"  filter="false"/></option>
								</logic:iterate>
							</select>
						</td>
						<th><bean:message key="Sea_Air"/></th>
                        <td>
                        	<select name="air_sea_clss_cd" class="search_form">
                        		<option value="S">Sea</option>
                        		<option value="A">Air</option>
                        	</select>
						</td>
                    </tr>
                    <tr>
							<th><bean:message key="Partner"/></th>
							<td>
								<input name="trdp_cd" value='' maxlength="20" type="text" class="search_form" onKeyDown="codeNameAction('trdpCode',this, 'onKeyDown')" onBlur="codeNameAction('trdpCode',this, 'onBlur');javascript:this.value=this.value.toUpperCase();" dataformat="excepthan" style="ime-mode:disabled;text-transform:uppercase;width:50;"><!-- 
							--><button type="button" class="input_seach_btn" tabindex="-1" id="trdp_cd"  onclick="doWork('PARTNER_POPLIST')"></button><!-- 
							--><input name="trdp_nm" maxlength="50" value='' type="text" class="search_form-disable" dataformat="excepthan" style="ime-mode:disabled;text-transform:uppercase;width:100px;" readonly>
							</td>
							<th><bean:message key="Option"/></th>
							<td>
								<select name="clt_cmpl_flg" class="search_form">
									<option value=''>완료포함</option>
									<option value='N'>미포함</option>
								</select>
							</td>
							<th><bean:message key="Status"/></th>
							<td>
								<select name="inv_sts_cd" class="search_form">
									<option value=''>ALL</option>
									<option value='IS'>Invoice Issue</option>
									<option value='IC'>Invoice Confirm</option>
								</select>
							</td>
							<th><bean:message key="Dept"/></th>
							<td>
								<select name="dept_cd">
								<bean:define id="rtnMap" name="EventResponse" property="mapVal"/>
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
		</div>
	</div>
	<div class="wrap_result">
		<div class="opus_design_grid">
			<h3 class="title_design"><bean:message key="Basic_Information"/></h3>
			<div class="opus_design_btn"><!-- 
				--><button type="button" class="btn_accent" onclick="doWork('EXCEL')" id="excel" name="btn_DownExcel" style="display:none"><bean:message key="Excel"/></button><!-- 
				--><button type="button" class="btn_normal" onclick="doWork('BALPRINT')" id="balPrint" style="display:none"><bean:message key="Balance"/></button><!-- 
				--><button type="button" class="btn_normal" onclick="doWork('ROWADD')" id="rowAdd" style="display:none"><bean:message key="New"/></button>
			</div>
			<script language="javascript">comSheetObject('sheet1');</script>
		</div>
		<div class="opus_design_grid">
			<h3 class="title_design"><bean:message key="Detail_Information"/></h3>
			<div class="opus_design_btn"><!-- 
				--><button type="button" class="btn_accent" onclick="doWork('SUBEXCEL')" id="subexcel" style="display:none" name="btn_DownExcel"><bean:message key="Excel"/></button><!-- 
				--><span id="prn"><button type="button" class="btn_normal" onclick="doWork('PRINT')" id="btnPrint" style="display:none"><bean:message key="Print"/></button></span><!-- 
				--><button type="button" class="btn_normal" onclick="doWork('ROWADD2')" id="rowAdd2" style="display:none"><bean:message key="New"/></button>
			</div>
			<script language="javascript">comSheetObject('sheet2');</script>
		</div>
	</div>
</div>
</form>
<script>
	var pDoc = parent.parent.parent.document;
	hideProcess('WORKING', pDoc);
</script>
