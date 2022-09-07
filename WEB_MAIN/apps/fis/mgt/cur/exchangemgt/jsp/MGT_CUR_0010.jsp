<%
/*=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   :  MGT_CUR_0010.jsp
*@FileTitle  : Management
*@author     : CLT
*@version    : 1.0
*@since      : 2014/06/10
=========================================================*/
%>

<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="clt-paging"   prefix="paging" %>
    <!-- 공통 Header -->
    <%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
    <link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css"/>
    <script type="text/javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/CalculationUtil.js?ver=<%=CLT_JS_VER%>"></script>
    <script type="text/javascript" src="<%=CLT_PATH%>/js/common/ModalCalendar.js?ver=<%=CLT_JS_VER%>"></script>
    <script type="text/javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/SUP_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
    <script type="text/javascript" src="./apps/fis/mgt/cur/exchangemgt/script/MGT_CUR_0010.js?ver=<%=CLT_JS_VER%>"></script>
	

	<%
		String ofc_cd		= userInfo.getOfc_cd();
	%>

    <script>
        var pDoc = parent.parent.parent.document;
        hideProcess('WORKING', pDoc);

        var PARAM1_1 = '';
    	var PARAM1_2 = '';

        <bean:define id="rtnMap" name="EventResponse" property="mapVal"/>       

        var dfCurrency = '<bean:write name="rtnMap" property="STDCURR"/>';
        var dfUnit     = '<bean:write name="rtnMap" property="STDRATE"/>';

        <!-- Currency Code 코드조회    	-->
    	<bean:define id="currList"  name="rtnMap" property="PARAM1"/>
    	<logic:iterate id="codeVO" name="currList">
    		PARAM1_1+= '|'+'<bean:write name="codeVO" property="cd_val"/>';
    		PARAM1_2+= '|'+'<bean:write name="codeVO" property="cd_nm" />';
        </logic:iterate>
        
        <!-- #799[BNX] (베트남) ACCOUNTING VAT 기능 추가 -->
        var ofc_cd = "<%=ofc_cd%>";
    	var vat_rt_dp_cnt = "0";
    	var xch_rt_dp_cnt = "4";

	function setupPage()
	{
		initFinish();
		loadPage();
		doWork('SEARCHLIST');
	}

	</script>

<form name="frm1" method="POST" action="./MGT_CUR_0010.clt" enctype="multipart/form-data">
    <!--Command를 담는 공통 -->
    <input type="hidden" name="f_cmd" id="f_cmd" />
    <input type="hidden" name="f_CurPage" id="f_CurPage" />
    <input type="hidden" name="trdp_cd" id="trdp_cd" />
    <!-- 타이틀, 네비게이션 -->
    
     <div class="page_title_area clear">
	   <h2 class="page_title"><button type="button"><%=LEV3_NM%></button></h2>
	   <!-- btn_div -->
	   <div class="opus_design_btn TOP">
	   	<%-- 
		   <button type="button" class="btn_accent" onclick="doWork('SEARCHLIST');" style="cursor:hand; display:none;" btnAuth="<%= roleBtnVO.getAttr1() %>"><bean:message key="Search" /></button>
		   <button type="button" class="btn_normal" onclick="doWork('ROWADD')"  style="cursor:hand; display:none;" btnAuth="<%= roleBtnVO.getAttr2() %>"><bean:message key="Add" /></button>
		   <button type="button" class="btn_normal" onclick="doWork('ADD')" style="cursor:hand; display:none;" btnAuth="<%= roleBtnVO.getAttr3() %>" id="btnAdd" ><bean:message key="Save" /></button>
		   <% if ("KR".equals(userInfo.getOfc_cnt_cd())) { %>
		   <button type="button" class="btn_normal" onClick="doWork('FILE')" style="cursor:hand; display:none;" btnAuth="READ"><bean:message key="Read" /></button>
	   	   <% } %>
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
	
<div class="over_wrap" height="100%">
	<div class= "wrap_search">
 		<div class= "opus_design_inquiry entry_pannel ">
 			<table>
				<colgroup>
					<col width="80">
					<col width="130">
					<col width="70">
					<col width="300">
					<col width="120">
					<col width="*">
				</colgroup>
 				<tbody>
 					<tr>
 						<th><bean:message key="Apply_Scope" /></th>
 						<td>
                            <select required style="width:110px;" name="f_curr_tp_cd" onchange="changeType();">
                                   <option value="S" selected>Common</option>
                                   <option value="N"><bean:message key="Customer"/></option>
                            </select>
                        </td>
                        <th><bean:message key="Customer" /></th>
                        <td>                                                                       
                            <input type="text" name="f_trdp_cd" size="10" maxlength="10" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:80px;" onkeydown="codeNameAction('trdpCode',this, 'onKeyDown')" onblur="codeNameAction('trdpCode',this, 'onBlur');javascript:this.value=this.value.toUpperCase();" id="f_trdp_cd" /><!--
                         --><button type="button" name="cust" id="cust" class="input_seach_btn" tabindex="-1" onClick="doWork('TRDP_POPLIST')"></button><!--
                         --><input type="text" name="f_trdp_nm" size="24" class="search_form-disable" readonly="" id="f_trdp_nm" />
						</td>
						<% if ("KR".equals(userInfo.getOfc_cnt_cd())) { %>
						<th><bean:message key="File" /></th>
						<td>	
							<input type="file" name="file_url" id="file_url" />	
						</td>
						<% } %>
 					</tr>
 					<tr>
 						<th><bean:message key="From_Currency" /></th>
 						<td><!--
 						--><input name="f_fm_curr_cd" maxlength="6" type="text" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:70px;" id="f_fm_curr_cd" /><!--
 						--><button type="button" class="input_seach_btn" tabindex="-1" onClick="doWork('CURRENCY_POPLIST')"></button></td>
                        <th><bean:message key="Apply_Date" /></th>
                        <td><!--
 						--><input required type="text" name="f_aply_fm_dt" id="f_aply_fm_dt" maxlength="10" dataformat="excepthan" style="width:70px;ime-mode:disabled" onkeyup="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};" onblur="chkCmprPrd(firCalFlag, false, this, this, form.f_aply_to_dt);firCalFlag=false;" id="f_aply_fm_dt" /><span class="dash">~</span>
 						   <input required type="text" name="f_aply_to_dt" maxlength="10" style="width:80px;ime-mode:disabled" onkeyup="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};" onblur="chkCmprPrd(firCalFlag, false, this, form.f_aply_fm_dt, this);firCalFlag=false;" id="f_aply_to_dt" /><!--
 						--><button type="button" class="calendar" tabindex="-1" name="f_aply_dt_cal" id="f_aply_dt_cal"  onclick="doDisplay('DATE01', frm1);"></button>
                        </td>
                        <th><bean:message key="Day_Month_Type" /></th>
                        <td  align="left">
                            <select name="f_dt_clss_cd">
                               <option value=""></option>
                               <option value="D">Day</option>
                               <option value="M">Month</option>
                            </select>
                        </td>
 					</tr>
 				</tbody>
 			</table>
 		</div>
	</div>
 	<!-- opus_design_inquiry(E) -->
 	<!-- opus_design_Grid(S) -->
 	<div class="wrap_result">
 		<div class="opus_design_inquiry">
		 	<div class="opus_design_grid">
		 		<script type="text/javascript">comSheetObject('sheet1');</script>
		 	</div>
		 	<table>
				<tr>
					<td width="100">
						<bean:define id="tmpMapVal" name="EventResponse" property="mapVal"/>
						<bean:define id="pagingVal" name="tmpMapVal"     property="paging"/>
						<paging:options name="pagingVal" defaultval="200"/>
					</td>
					<td id="pagingTb" style='font-family: "Tahoma", "Arial", "Verdana";font-size: 11px;'>
					</td>
				</tr>
			</table>
		</div>
 	</div>
</div>
</form>
<script type="text/javascript">
doBtnAuthority("<%= roleBtnVO != null ? roleBtnVO.getAttr_extension() : "" %>");
</script>

