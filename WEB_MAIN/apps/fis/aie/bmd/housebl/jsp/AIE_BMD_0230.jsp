<%--
=========================================================
*@FileName   : AIE_BMD_0130.jsp
*@FileTitle  : COMMERCIAL Invoice
*@Description: COMMERCIAL Invoice
*@author     : CLT
*@version    : 1.0 - 2014/06/17
*@since      : 2014/06/17

*@Change history:
=========================================================
--%>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@ page import="java.util.HashMap"%>
<%@ taglib uri="clt-paging"   prefix="paging" %>
	<!-- 공통 Header -->
	<%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
	<%
		String parm_wrk_tp = request.getParameter("wrk_tp");
		String air_sea_clss_cd = request.getParameter("air_sea_clss_cd");
		String biz_clss_cd = request.getParameter("biz_clss_cd");
		String bnd_clss_cd = "O";
	%>
	<bean:define id="valMap"  name="EventResponse" property="mapVal"/>
	
	<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css"/>
	
	<!-- 일자 및 달력팝업 호출 -->
	<script language="javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CoFormControl.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CoBizCommon.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="./apps/fis/aie/bmd/housebl/script/AIE_BMD_0230.js?ver=<%=CLT_JS_VER%>" ></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CalculationUtil.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/AIR_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript">
		function setupPage(){
			loadPage();
			setRequiredFrom();
			setLable();
		}
		lableJs = {
				HBL_No :'<bean:message key="HBL_No"/>',
				MBL_No :'<bean:message key="MBL_No"/>',
				MAWB_No :'<bean:message key="MAWB_No"/>',
				HAWB_No :'<bean:message key="HAWB_No"/>',
				AWB_NO : '<bean:message key="AWB_NO"/>'

		}
	</script>
	<!-- page_title_area(S) -->
	<div class="page_title_area">
	   <h2 class="page_title"><button type="button"><%=LEV3_NM%></button></h2>
	   <!-- btn_div -->
	   <div class="opus_design_btn TOP">
<%-- 		   <button type="button" class="btn_accent" style="display:none;" btnAuth="<%= roleBtnVO.getAttr1() %>" onclick="doWork('SEARCHLIST')"><bean:message key="Search"/></button><!-- 
		--><button type="button" class="btn_normal" id="btnModify" style="display:none;" btnAuth="<%= roleBtnVO.getAttr3() %>" onclick="doWork('MODIFY')"><bean:message key="Save"/></button><!-- 
		--><button type="button" class="btn_normal" id="btnPrint" style="display:none;" btnAuth="<%= roleBtnVO.getAttr5() %>" onclick="doWork('PRINT')"><bean:message key="Print"/></button><!-- 
		--><button type="button" class="btn_normal" style="display:none;" btnAuth="CLEAR" onclick="clearAll()"><bean:message key="Clear"/></button>
 --%>	   </div>
	   <!-- btn_div -->
	   <div class="location">
		   <span><%=LEV1_NM%></span> &gt;
		   <span><%=LEV2_NM%></span> &gt;
		   <span><%=LEV3_NM%></span>
		   <a href="" class="ir">URL Copy</a>
	   </div>
	</div>
<form name="frm1" method="POST" action="./AIE_BMD_0230.clt">
	<input type="hidden" name="f_cmd"/>
	<input type="hidden" id="f_wrk_tp" class="db_data" columnName="wrk_tp"/>
	<input type="hidden" id="f_shpr_cd" class="db_data" columnName="shpr_cd"/>
	<input type="hidden" id="f_parm_wrk_tp" value="<%=parm_wrk_tp%>"/>
	<input type="hidden" id="air_sea_clss_cd" value="<%=air_sea_clss_cd%>"/>
	<input type="hidden" id="biz_clss_cd" value="<%=biz_clss_cd%>"/>
	<input type="hidden" id="bnd_clss_cd" value="<%=bnd_clss_cd%>"/>
	<input type="hidden" id="f_wo_no"/>
	<input type="hidden" id="print_yn"/>
	<input type="hidden" id="save_yn"/>
	
	<input type="hidden" id="file_name" name="file_name"/>
	<input type="hidden" id="title" name="title"/>
	<input type="hidden" id="rd_param" name="rd_param"/>
	
<div class="over_wrap" height="100%">
	<div class="wrap_search">	
		<div class="opus_design_inquiry entry_pannel">
			<table>
				<colgroup>
					<col width="50"/>
					<col width="*"/>
				</colgroup>
				<tbody>
					<tr>
						<th id="b_no"><bean:message key="HAWB_No"/></th>
						<td><!-- 
						 --><input type="text" name="txt_hbl_no" required maxlength="40" value='' class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:130;text-transform:uppercase;" onblur="strToUpper(this);selectBlInfo();" onkeydown="isBlNoEdit();"/><!-- 
						 --><button type="button" class="input_seach_btn" tabindex="-1" onClick="blPopList()"></button><!-- 
						 --><input type="hidden" id="intg_bl_seq" name="intg_bl_seq" class="search_form db_data" columnName="intg_bl_seq"/><!-- 
						 --><input type="hidden" id="hbl_no" name="hbl_no" class="search_form db_data" columnName="bl_no"/><!-- 
						 --></td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
	<div class="wrap_result" style="width: 100%;">
		<div class="layout_wrap">
			<div style="width: 325px;float: left;" class="opus_design_inquiry">
	   			<table>
	   				<colgroup>
						<col width="50"/>
						<col width="*"/>
					</colgroup>
					<tbody>
						<tr>
							<th><bean:message key="Shipper"/></th>
							<td><textarea id="f_seller" required="true" msg="<bean:message key="Shipper"/>" maxlength="400" onkeypress="keyPress_maxLength(this);" onkeyup="keyUp_maxLength(this);" onblur="strToUpper(this);keyUp_maxLength(this);" class="search_form db_data" dataformat="excepthan" style="width:250px;height:71px;" columnName="shpr_addr"></textarea></td>
						</tr>
						<tr>
							<th><bean:message key="Consignee"/></th>
							<td><textarea id="f_consignee" required="true" msg="<bean:message key="Consignee"/>" maxlength="400" onkeypress="keyPress_maxLength(this);" onkeyup="keyUp_maxLength(this);" onblur="strToUpper(this);keyUp_maxLength(this);" class="search_form db_data" dataformat="excepthan" style="width:250px;height:71px;" columnName="cnee_addr"></textarea></td>
						</tr>
						<tr>
							<th><bean:message key="Vendor"/></th>
							<td>
								<div style="height: 28px;"><!-- 
								--><input type="text" id="f_vendor_cd" name="f_vendor_cd" msg="<bean:message key="Vendor"/>" maxlength="20" class="search_form db_data" onKeyDown="codeNameAction('trdpCode_vendor',this, 'onKeyDown')" onBlur="codeNameAction('trdpCode_vendor',this, 'onBlur');javascript:this.value=this.value.toUpperCase();" dataformat="excepthan" style="ime-mode:auto;text-transform:uppercase;width:70px;" columnName="vndr_cd"><!-- 
								--><button id="vendor_pop" type="button" class="input_seach_btn" tabindex="-1" id="liner" onClick="openPopUp('LINER_POPLIST',this, 'A')"></button><!-- 
								--><input type="text" id="f_vendor_nm" name="f_vendor_nm" msg="<bean:message key="Vendor"/>" maxlength="100" class="search_form db_data" onblur="strToUpper(this)" dataformat="excepthan" style="width:147px;ime-mode:auto;text-transform:uppercase;" onKeyPress="if(event.keyCode==13){openPopUp('LINER_POPLIST', this, document.getElementById('liner'));}"  columnName="vndr_nm"><!-- 
								--></div>
								<textarea id="f_vendor" msg="<bean:message key="Vendor"/>" maxlength="400" onkeypress="keyPress_maxLength(this);" onkeyup="keyUp_maxLength(this);" onblur="strToUpper(this);keyUp_maxLength(this);" class="search_form db_data" dataformat="excepthan" style="width:250px;height:71px;" columnName="vndr_addr"></textarea>
							</td>
						</tr>
					</tbody>
				</table>
	   		</div>
	   		<div style="width: 370px;float: left;" class="opus_design_inquiry">
	   			<table>
	   				<colgroup>
						<col width="80"/>
						<col width="150"/>
						<col width="110"/>
						<col width="*"/>
					</colgroup>
					<tbody>
	                     <tr>
	                         <th><bean:message key="Invoice_No"/></th>
	                         <td><input type="text" id="f_inv_no" maxlength="50" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:250px" onblur="strToUpper(this)" class="db_data" columnName="inv_no"><!-- 
						  	  --><input type="hidden" id="h_inv_no" value=''></td>
	                     </tr>
	                     <tr>
	                         <th><bean:message key="Invoice_Date"/></th>
	                         <td><!-- 
	                          --><input type="text" id="f_inv_dt" maxlength="10" class="search_form db_data" onKeyUp="mkDateFormatType(this, event, false,1)" onBlur="mkDateFormatType(this, event, true,1);dateRangeValid(this, 'Invoice Date');" dataformat="excepthan" style="ime-mode:disabled;width:75px;" columnName="inv_dt" format="date"><!-- 
	                          --><button type="button" class="calendar" tabindex="-1" id="f_inv_dt_cal" onclick="doDisplay('DATE1' ,frm1.f_inv_dt);"></button><!-- 
	                          --></td>
	                    </tr>
	                    <tr>
	                         <th><bean:message key="Country_of_Origin"/></th>
	                         <td><!--
	                         --><input id="f_cnt_origin" type="text" maxlength="2" class="search_form db_data" dataformat="excepthan" style="width:70px;text-transform:uppercase;ime-mode:disabled;" onKeyDown="codeNameAction('country',this, 'onKeyDown')" onBlur="strToUpper(this); codeNameAction('country',this, 'onBlur')" columnName="cnt_cd"><!--
				             --><button type="button" class="input_seach_btn" tabindex="-1" id="country" name="country" onclick="openPopUp('COUNTRY_POPLIST',this, 'I')"></button><!--
				             --><input id="f_cnt_origin_nm" type="text" class="search_form-disable search_form db_data" dataformat="excepthan" style="ime-mode:disabled;width:147px;text-align:left" onblur="strToUpper(this)" readOnly columnName="cnt_nm"><!--
				             --><input id="h_cnt_nm" type="hidden" class="search_form-disable db_data" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:150px;text-align:left" onblur="strToUpper(this)"><!--
				             --></td>
	                    </tr>
	                    <tr>
							<th><bean:message key="Liner"/></th>
							<td><!-- 
								--><input type="text" id="f_carr_trdp_cd" maxlength="20" class="search_form db_data" onKeyDown="codeNameAction('trdpCode_liner',this, 'onKeyDown')" onBlur="codeNameAction('trdpCode_liner',this, 'onBlur');javascript:this.value=this.value.toUpperCase();" dataformat="excepthan" style="ime-mode:auto;text-transform:uppercase;width:70px;" columnName="carr_trdp_cd"><!-- 
								--><button type="button" class="input_seach_btn" tabindex="-1" id="liner" onClick="openPopUp('LINER_POPLIST',this, 'A')"></button><!-- 
								--><input type="text" id="f_carr_trdp_nm"  maxlength="100" value='' class="search_form db_data" onblur="strToUpper(this)" class="search_form" dataformat="excepthan" style="width:147px;ime-mode:auto;text-transform:uppercase;" onKeyPress="if(event.keyCode==13){openPopUp('LINER_POPLIST', this, document.getElementById('liner'));}" columnName="carr_trdp_nm"><!-- 
							--></td>
						</tr>
	                    <tr>
	                         <th id="awb_no"></th>
	                         <td><input type="text" id="f_awb_no" maxlength="50" class="search_form db_data" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:250px" onblur="strToUpper(this)" columnName="bl_no"></td>
	                    </tr>
	                    <tr>
	                         <th>ETA at Dest</th>
	                         <td>
								<input type="text" id="f_eta_dttm" maxlength="10" class="search_form db_data" onKeyUp="mkDateFormatType(this, event, false,1)" onBlur="mkDateFormatType(this, event, true,1);dateRangeValid(this, 'Invoice Date');" dataformat="excepthan" style="ime-mode:disabled;width:75px;" columnName="eta_dttm" format="date"><!-- 
	                          	--><button type="button" class="calendar" id="eta_dttm_cal" onclick="doDisplay('DATE1' ,frm1.f_eta_dttm);"></button><!-- #3468 [BINEX]C/I & P/L 추가 수정
	                          	-->&nbsp;&nbsp;<input type="text" id="f_eta_dttm2" maxlength="4" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:40px;">
							</td>
	                    </tr>
	                    <tr>
	                         <th style="height: 29px;"></th>
	                         <td></td>
	                    </tr>
	                    <tr>
	                         <th>Total Gross Weight</th>
	                         <td><input type="text" id="f_ttl_grs_wgt"  readonly maxlength="50" class="search_form db_data" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:250px; text-align:right;" onblur="strToUpper(this)" columnName="grs_wgt"></td>
	                    </tr>
	                    <tr>
	                         <th>Total Net Weight</th>
	                         <td><input type="text" id="f_ttl_net_wgt" readonly maxlength="50" class="search_form db_data" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:250px; text-align:right;" onblur="strToUpper(this)" columnName="net_wgt_txt"></td>
	                    </tr>

                        </tbody>
                    </table>
	   		</div>
	   		<div style="width: 400px;float: left;" class="opus_design_inquiry">
	   			<table>
	   				<colgroup>
						<col width="80"/>
						<col width="150"/>
						<col width="110"/>
						<col width="*"/>
					</colgroup>
					<tbody>
	                     <tr>
	                         <th>Date Shipped</th>
	                         <td><input type="text" id="f_dept_dt" maxlength="10" class="search_form db_data" onKeyUp="mkDateFormatType(this, event, false,1)" onBlur="mkDateFormatType(this, event, true,1);dateRangeValid(this, 'Invoice Date');" dataformat="excepthan" style="ime-mode:disabled;width:75px;" columnName="etd_dttm" format="date"><!-- 
	                          --><button type="button" class="calendar" tabindex="-1" id="f_inv_dt_cal" onclick="doDisplay('DATE1' ,frm1.f_dept_dt);"></button><!-- 
	                          --></td>
	                     </tr>
	                     <tr>
	                         <th><bean:message key="VSL_VOY"/></th>
	                         <td><input type="text" id="f_vslflt" value='' onblur="strToUpper(this)"  class="search_form db_data" dataformat="excepthan" style="ime-mode:disabled;width:70px;text-transform:uppercase; text-align:right;" maxlength="20" columnName="vsl_flt"></td>
	                    </tr>
	                    <tr>
	                         <th><bean:message key="Departure"/></th>
	                         <td><!--
									--><input type="text" id="f_pol_cd" maxlength="5" onKeyDown="codeNameAction('Location_pol',this, 'onKeyDown','A')" onBlur="strToUpper(this);codeNameAction('Location_pol',this, 'onBlur','A')" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:70px;" class="search_form db_data" columnName="pol_cd"><!--
									--><button type="button" class="input_seach_btn" tabindex="-1" id="pol" name="pol" onClick="openAiePopUp('LOCATION_POPLIST',this)" ></button><!--
                                    --><input type="hidden" id="pol_nod_cd" value='' ><!--
									--><input type="text"   id="f_dept" maxlength="50" class="search_form db_data" dataformat="excepthan" style="ime-mode:disabled;width:147px;text-transform:uppercase;" onblur="strToUpper(this)" onKeyPress="if(event.keyCode==13){openAiePopUp('LOCATION_POPLIST', document.getElementById('pol'), frm1.pol_nm.value);}" columnName="pol_nm"><!--
								--></td>
	                    </tr>
	                    <tr>
	                        <th><bean:message key="Destination"/></th>
	                        <td>
	                        	<input type="text" id="f_pod_cd" maxlength="5" class="search_form db_data" onKeyDown="codeNameAction('Location_air_des',this, 'onKeyDown','A')" onBlur="strToUpper(this);codeNameAction('Location_air_des',this, 'onBlur','A')" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:70px;" columnName="pod_cd"><!--
								--><button type="button" class="input_seach_btn" tabindex="-1" id="air_des" name="air_des" onClick="openAiePopUp('LOCATION_POPLIST',this)" ></button><!--
                                --><input type="hidden" id="pod_nod_cd" value=''><!--
								--><input type="text" id="f_dest"  maxlength="50" class="search_form db_data" dataformat="excepthan" style="ime-mode:disabled;width:147px;text-transform:uppercase;" onblur="strToUpper(this)" onKeyPress="if(event.keyCode==13){openAiePopUp('LOCATION_POPLIST', document.getElementById('air_des'), frm1.pod_nm.value);}" columnName="pod_nm"><!--
								-->
							</td>
	                    </tr>
	                    <tr>
							<th>Term</th>
							<td>
								<select id="f_inco_cd" style="width:250px;" class="search_form db_data" columnName="inco_cd">
									<bean:define id="cdList" name="valMap" property="codeList"/>
									<option value=""></option>
									<logic:iterate id="ComCdDtlVO" name="cdList">
									<option value='<bean:write name="ComCdDtlVO" property="cd_val"/>' >
										<bean:write name="ComCdDtlVO" property="cd_nm"/>
									</option>
									</logic:iterate>
								</select>
							</td>
						</tr>
						<tr>
	                         <th style="height: 29px;"></th>
	                         <td></td>
	                    </tr>
	                    <tr>
	                         <th style="height: 29px;">Memo</th>
	                         <td><textarea id="f_mk_txt" maxlength="400" onkeypress="keyPress_maxLength(this);" onkeyup="keyUp_maxLength(this);" onblur="strToUpper(this);keyUp_maxLength(this);" class="search_form db_data" dataformat="excepthan" style="width:250px;height:80px;" columnName="mk_txt"></textarea></td>
	                    </tr>
                        </tbody>
                    </table>
	   		</div>
	   	</div>
	   	
		<div class="opus_design_grid">
			<h3 class="title_design">Item List </h3>
			<div class="opus_design_btn"> 
				<button id="btnRowAdd2" type="button" onclick="doWork('ROWADD2')" class="btn_normal">Add</button>
			</div>
			<script type="text/javascript">comSheetObject('sheet1');</script>
		</div>
		<div>
			<span id="pagingTb" style='font-family: "Tahoma", "Arial", "Verdana";font-size: 11px;'> </span>
		</div>
	
	</div>

</div>
</form>

