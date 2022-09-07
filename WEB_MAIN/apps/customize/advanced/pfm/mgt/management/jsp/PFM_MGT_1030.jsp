<%--
=========================================================
*@FileName   : PFM_MGT_0030.jsp
*@FileTitle  : Profit Report
*@Description: Profit Report
*@author	 : HaeKyoung, Lee - Cyberlogitec
*@version	: 1.0 - 2012/01/10
*@since	  : 2012/01/10

*@Change history:
=========================================================
--%>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="clt-paging"   prefix="paging" %>
	<!-- 공통 Header -->
	<%@include file="./../../../../../../../syscommon/header/CLTHeader.jsp"%>
	<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css" />
	
	<!-- 일자 및 달력팝업 호출 -->
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/CoFormControl.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/CoBizCommon.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/CalculationUtil.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/web/rpt/rdviewer50u.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/PFM_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="./apps/customize/advanced/pfm/mgt/management/script/PFM_MGT_1030.js?ver=<%=CLT_JS_VER%>" ></script>
	
	<bean:define id="valMap"   name="EventResponse" property="mapVal"/>
	<bean:define id="ofcInfo"  name="valMap" property="ofcInfo"/>
		
	<%
		String ofc_cd		= userInfo.getOfc_cd();
		String ofcLoclNm 	= userInfo.getOfc_locl_nm();
		String usrNm 		= userInfo.getUser_name();
		String email 		= userInfo.getEml();
		String cnt_cd 		= userInfo.getOfc_cnt_cd();
		
		String dept_cd		= userInfo.getDept_cd();
	%>

	<script>
		var pDoc = parent.parent.parent.document;
		hideProcess('WORKING', pDoc);
		
		function setupPage()
		{
			loadPage(); 
			setSelect();
			var agent = navigator.userAgent.toLowerCase(); 
			if (agent.indexOf("msie") != -1) { //ie 일 경우 pdfDownLoad 버튼은 무조건 안나온다.
			}else{
				getBtnObj("pdfDowns").style.display = 'inline';
			}
			setTimeout("document.frm1.s_prd_strdt.focus();", 1000);
		}
		
		function setSelect(){
			var formObj = document.frm1;
		}

		var usrNm = "<%= usrNm %>";
	</script>
</head>
	<form name="frm1" method="POST" action="./ADV_CST_0010.clt">
	<!--Command를 담는 공통 -->
	<input type="hidden" name="f_cmd" id="f_cmd" />
	<input type="hidden" name="f_CurPage" id="f_CurPage" />
	<input type="hidden" name="file_name" id="file_name" />
	<input type="hidden" name="title" id="title" />
	<input type="hidden" name="rd_param" id="rd_param" />
	<input type="hidden" name="f_usr_nm" value="<%= usrNm %>" id="f_usr_nm" />
	<input type="hidden" name="f_email" value="<%= email %>" id="f_email" />
	<input type="hidden" name="f_ofc_cd" value="<%= ofc_cd %>" id="f_ofc_cd" />
	<input type="hidden" name="f_ofc_locl_nm" value="<%= ofcLoclNm %>" id="f_ofc_locl_nm" />
	<input type="hidden" name="f_cnt_cd" value="<%= cnt_cd %>" id="f_cnt_cd" />
	<input type="hidden" name="f_dept_cd" value="<%= dept_cd %>" id="f_dept_cd" />
	<input type="hidden" name="rpt_tp_opt" id="rpt_tp_opt" />
	<input type="hidden" name="rpt_sub_opt" id="rpt_sub_opt" />
	<input type="hidden" name="f_sys_ofc_cd" id="f_sys_ofc_cd" value="<bean:write name="valMap" property="sysOfcCd"/>"/>
	
	
	<div class="page_title_area clear">
	   <h2 class="page_title"><button type="button"><%=LEV3_NM%></button></h2>
	   <!-- btn_div -->
	   <div class="opus_design_btn TOP"><!-- 
		    --><span style="display:none;" btnAuth="<%= roleBtnVO.getAttr5() %>" ><button  type="button"  style="cursor:hand; display:none;" id = "pdfDowns" class="btn_accent" onclick="pdfDown('PRINT')"><bean:message key="PDF_download"/></button></span><!--
		    --><button id="btnPrint" type="button" style="cursor:hand; display:none;" btnAuth="<%= roleBtnVO.getAttr5() %>" class="btn_accent" onclick="doWork('PRINT')"><bean:message key="Print"/></button><!-- 
	    --></div>
	   <!-- btn_div -->
	   <div class="location">
		   <span><%=LEV1_NM%></span> &gt;
		   <span><%=LEV2_NM%></span> &gt;
		   <span><%=LEV3_NM%></span>
		   <a href="" class="ir">URL Copy</a>
	   </div>
	</div> 
	<div class="over_wrap">
		<div class="wrap_search">	
			<div class="opus_design_inquiry entry_pannel" >
				<table>
					<colgroup>
						<col width="70" />
						<col width="120" />
						<col width="120" />
						<col width="120" />
					</colgroup>
					<tbody>
						<tr>
							<th><bean:message key="Office"/></th>
							<td colspan="4">
								<bean:define id="oficeList" name="valMap" property="ofcList"/>
									<select id="s_ofc_cd" name="s_ofc_cd" style="width:275px;"/>
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
						<tr>
							<th rowspan="3"><bean:message key="Department"/></th>
							<td><input name="s_ex_dptm_flg" id="s_ex_dptm_flg" type="checkbox" value="EX" onclick="chk_onchange(this.value)"><label for="s_ex_dptm_flg"><bean:message key="Export"/></label></td>
							<td><input name="s_oe_dptm_flg" id="s_oe_dptm_flg" type="checkbox" value="SE" onclick="chk_onchange(this.value)"><label for="s_oe_dptm_flg"><bean:message key="Ocean_Export"/></label></td>
							<td><input name="s_ae_dptm_flg" id="s_ae_dptm_flg" type="checkbox" value="AE" onclick="chk_onchange(this.value)"><label for="s_ae_dptm_flg"><bean:message key="Air_Export"/></label></td>
							<td>
								<button type="button" class="btn_etc" onclick="doWork('ALL')"><bean:message key="All"/></button><button type="button" class="btn_etc" onclick="doWork('CLEAR')"><bean:message key="Clear"/></button>
							</td>
						</tr>
						<tr>
							<td><input name="s_im_dptm_flg" id="s_im_dptm_flg" type="checkbox" value="IM" onclick="chk_onchange(this.value)"><label for="s_im_dptm_flg"><bean:message key="Import"/></label></td>
							<td><input name="s_oi_dptm_flg" id="s_oi_dptm_flg" type="checkbox" value="SI" onclick="chk_onchange(this.value)"><label for="s_oi_dptm_flg"><bean:message key="Ocean_Import"/></label></td>
							<td colspan="2"><input name="s_ai_dptm_flg" id="s_ai_dptm_flg" type="checkbox" value="AI" onclick="chk_onchange(this.value)"><label for="s_ai_dptm_flg"><bean:message key="Air_Import"/></label></td>
						</tr>
						<tr>
							<td colspan="4"><input name="s_on_dptm_flg" id="s_on_dptm_flg" type="checkbox" value="OO" ><label for="s_on_dptm_flg"><bean:message key="Other_Operation"/></label></td>
						</tr>
						<tr>
	            			<th><bean:message key="Option"/></th>
	           				<td><input type="radio" name="s_grd_opt" id="s_grd_opt1" value="A" checked ><label for="s_grd_opt1"><bean:message key="All"/></label></td>
	           				<td><input type="radio" name="s_grd_opt" id="s_grd_opt2" value="S" ><label for="s_grd_opt2"><bean:message key="Summary"/></label></td>
	           				<td colspan="2"><input type="radio" name="s_grd_opt" id="s_grd_opt3" value="D" ><label for="s_grd_opt3"><bean:message key="Detail"/></label><input type="hidden" name="s_grd_opt_val" id="s_grd_opt_val" /></td>
	           				
	           			</tr>
	           			<tr>
							<th><bean:message key="Period"/></th>
							<td>
								<select name="s_dt_clss_cd">
									<option value="BPDT">B/L Post Date</option>
									<option value="PDT">Invoice Post Date</option>
									<option value="IDT">Invoice Date</option>
								</select>
							</td>
							<td colspan="3"><!-- 
								 --><input type="text" style="width: 70px;" name="s_prd_strdt" onKeyUp="mkDateFormatType(this, event, false, 1)" onBlur="mkDateFormatType(this, event, true, 1)" size='11' maxlength="10" class="search_form"><!--  
								 --><span class="dash">~</span><!-- 
								 --><input type="text" style="width: 70px;" name="s_prd_enddt" onKeyUp="mkDateFormatType(this, event, false, 1)" onBlur="mkDateFormatType(this, event, true, 1)" size='11' maxlength="10" class="search_form"><!--
								 --><button type="button" class="calendar ir"  onclick="doDisplay('DATE11', frm1);"><!-- 
							 --></td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	</div>
<iframe name="pdfDn" style="width:0;height:0;visibility:hidden" border=0></iframe>	
</form>

<script type="text/javascript">
doBtnAuthority("<%= roleBtnVO != null ? roleBtnVO.getAttr_extension() : "" %>");
</script>	
	
</body>
</html>


