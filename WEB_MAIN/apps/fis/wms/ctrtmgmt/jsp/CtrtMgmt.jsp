<%--
=========================================================
*Copyright(c) 2015 DOU Networks. All Rights Reserved.
*@FileName   : ContractManagement.jsp
*@FileTitle  : Contract Management
*@author     : Vinh Vo - DOU
*@version    : 1.0 - 07/14/2015
*@since      : 07/14/2015

*@Change history:
=========================================================
--%>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="clt-paging"   prefix="paging" %>
	<!-- 공통 Header -->
	<%@include file="./../../../../../syscommon/header/CLTHeader.jsp"%>
	<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css" />
	    <title><bean:message key="system.title"/></title>
	
	<!-- 일자 및 달력팝업 호출 -->
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
	
	<script type="text/javascript" src="./js/common/message/<%=CLT_MSG_PATH%>/WMS_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script> 		
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/MDM_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/apps/fis/wms/ctrtmgmt/script/CtrtMgmt.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/apps/fis/see/bmd/housebl/script/BL_CODE_UTIL.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/autocomplete_ui.js?ver=<%=CLT_JS_VER%>"></script>  <!-- #1199 [Contract] Cannot auto suggestion when name inputted -->
<%
	String ctrt_no = "";
	String s_cus_cd = "";
	String trdo_nm = "";
	ctrt_no = request.getParameter("ctrt_no")== null?"":request.getParameter("ctrt_no");
	s_cus_cd = request.getParameter("s_cus_cd")== null?"":request.getParameter("s_cus_cd");
	trdo_nm = request.getParameter("trdo_nm")== null?"":request.getParameter("trdo_nm");
	//LKH::2015-09-26 WMS3.O 긴급수정
	String wmsUseVer = (String)application.getAttribute("WMS_USE_VER");
	if(wmsUseVer == null){wmsUseVer = "";} 

%>
 <bean:define id="cdMap"  name="EventResponse" property="mapVal"/>
 <bean:define id="warehouseList" name="cdMap" property="whList"/>
 <bean:define id="currCdList" name="cdMap" property="currCdList"/>
 <bean:define id="officeInfo" name="cdMap" property="officeInfo"/>
 <bean:define id="ofcVO" name="officeInfo"/>     
 
<script type="text/javascript">

var trf_cur_cd = "<bean:write name='ofcVO' property='trf_cur_cd'/>";
var whCd = "";
var whNm = "";
var whCd_Nm="";

'<logic:notEmpty name="warehouseList">'
	'<logic:iterate id="item" name="warehouseList">'
		whCd +="|"+'<bean:write name="item" property="wh_cd"/>';
		whNm +="|"+'<bean:write name="item" property="wh_nm"/>';
		whCd_Nm += "|"+'<bean:write name="item" property="wh_cd"/>' +'\t '+'<bean:write name="item" property="wh_nm"/>';
	'</logic:iterate>'
'</logic:notEmpty>'


function setupPage() {
	loadPage();
	//loaddata();
	doWork('SEARCH');
}

//<!-- #1199 [Contract] Cannot auto suggestion when name inputted -->
var AUTOCOMPLETE_YN = 'Y';
 <logic:notEmpty name="cdMap" property="autocompleteYn">
	AUTOCOMPLETE_YN = '<bean:write name="cdMap" property="autocompleteYn"/>';
</logic:notEmpty> 
</script>

<form name="frm1" method="POST" >
	<!--Command를 담는 공통 -->
	<input type="hidden" name="f_ctrt_no" value="<%=ctrt_no%>"/>
	<input type="hidden" name="f_cmd"/> 
	<input type="hidden" name="f_CurPage"> 
    <!-- Button -->
	<div class="page_title_area clear">
	   <h2 class="page_title" id='bigtitle'><button type="button"><%=LEV3_NM%></button></h2>
	   <!-- btn_div -->
	   <div class="opus_design_btn TOP">
<%--
		   <button type="button" class="btn_accent" onclick="form.f_CurPage.value=1;doWork('SEARCH')"  style="display:none;" btnAuth="<%= roleBtnVO.getAttr1() %>" ><bean:message key="Search"/></button>
		   <button type="button" class="btn_normal" onClick="doWork('NEW')" style="display:none;" btnAuth="<%= roleBtnVO.getAttr2() %>" ><bean:message key="New"/></button>
		   <button type="button" class="btn_normal" onclick="doWork('MODIFY')" id="btnSave" style="display:none;" btnAuth="<%= roleBtnVO.getAttr3() %>" ><bean:message key="Save"/></button>
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
	<div class="over_wrap" style="height:100%">
	<div class="wrap_search">	
		<div class="opus_design_inquiry entry_pannel ">
			<table>
				<colgroup>
					<col width="80"></col>
					<col width="330"></col>
					<col width="80"></col>
					<col width="150"></col>
					<col width="60"></col>
					<col width="330"></col>
					<col width="30"></col>
					<col width="*"></col>
				</colgroup>
				<tbody>
					<tr>
                    	<th><bean:message key="Contract_No"/></th>
                        <td><!--
                        --><input type="text" name="s_ctrt_no"  style="text-transform:uppercase;width:80px;" maxlength="10" dataformat="engup" otherchar="_-" onkeydown="if(event.keyCode==13){searchTlCtrtInfo(this, frm1.s_ctrt_nm);}"  onblur="searchTlCtrtInfo(this, frm1.s_ctrt_nm);"><!--
                        --><button type="button" class="input_seach_btn" tabindex="-1" id="pod" onclick="doWork('CTRT_POPLIST')"></button><!--
                        --><input name="s_ctrt_nm" type="text"  style="text-transform:uppercase;width:200px;text-align:left" maxlength="100" onkeydown="if(event.keyCode==13){doWork('CTRT_POPLIST_NAME');}"></td>
                        <th><bean:message key="Delete_YN"/></th>
                        <td>	
                        	<input type="radio"  id="Y" name="radYN"/><!--
                        	--><label for="Y"><bean:message key="Yes"/></label>
                        	
                        	<input type="radio"  id="N" name="radYN" checked/><!--
                        	--><label for="N"><bean:message key="No"/></label>
                        	
                        	<input type="radio"  id="A" name="radYN" /><!--
                        	--><label for="A"><bean:message key="All"/></label>
                        </td>
                        <th><bean:message key="Customer"/></th>
						<td><!-- 
                        --><input type="text" name="s_cus_cd" dataformat="engup" style="text-transform:uppercase;width:78px;"maxlength="20" onblur="searchTlCustInfo(this,frm1.s_cus_nm);" value="<%=s_cus_cd%>"><!--
                        --><button type="button" class="input_seach_btn" tabindex="-1" id="pod_s_cus_cd" name="pod_s_cus_cd" onclick="Cust_Popup('s_cust')"></button><!--
                        --><input name="s_cus_nm" id="s_cus_nm" type="text"  style="width:200px;text-align:left"  dataformat="excepthan" onblur="strToUpper(this);" onkeydown="if(event.keyCode==13){Cust_Name_Popup('s_cust');}" value="<%=trdo_nm%>">							</td>
                        <th><bean:message key="Valid"/></th>
                        <td>
                        	<input type="radio"  id="valid_Y" name="valid_YN"/ checked><!--
                        	--><label for="Y"><bean:message key="Yes"/></label>
                        	
                        	<input type="radio"  id="valid_N" name="valid_YN"  /><!--
                        	--><label for="N"><bean:message key="No"/></label>
                        	
                        	<input type="radio"  id="valid_A" name="valid_YN"  /><!--
                        	--><label for="A"><bean:message key="All"/></label>                        
                        </td>
                    </tr>
				</tbody>
			</table>
		</div>
	</div>
	<div class='wrap_result'>
	<div class="layout_wrap">
		<div class="layout_vertical_2" >
		<div class="opus_design_inquiry">
			<div class="opus_design_inquiry" style="height: 320px;">
				<h3 class="title_design" style="margin-bottom: 0px;"><bean:message key="Contract_List"/></h3>
				<div class="opus_design_grid">
					<script type='text/javascript'>comSheetObject('sheet1');</script>
				</div>
					<%-- <table>
	              	<tr>
							<td width="100">
								<bean:define id="tmpMapVal" name="EventResponse" property="mapVal"/>
								<bean:define id="pagingVal" name="tmpMapVal"     property="paging"/>
								<paging:options name="pagingVal" defaultval="200"/>
							</td>
							<td align="center" width="900">
								<table width="900">
									<tr>
										<td width="900" id="pagingTb" style='font-family: "Tahoma", "Arial", "Verdana";font-size: 11px;'>
										</td>
									</tr>
								</table>		
							</td>
							<td width="100"></td>
						</tr>
              </table>
               --%>
               <div class="opus_design_inquiry">
              <table border="0" width="720">
					<tr>
						<td width="100">
							<bean:define id="tmpMapVal" name="EventResponse" property="mapVal"/>
							<bean:define id="pagingVal" name="tmpMapVal"     property="paging"/>
							<paging:options name="pagingVal" defaultval="200"/>
						</td>
						<td align="center" width="700">
							<table width="700">
								<tr>
									<td width="700" id="pagingTb" style='font-family: "Tahoma", "Arial", "Verdana";font-size: 11px;'>
									</td>
								</tr>
							</table>
						</td>
						<td width="100"></td>
					</tr>
				</table>
				</div>
			</div>
			</div>
		</div>
		
		<div class="layout_vertical_2 pad_left_8" >
			<!-- #6027 [LATONA] WMS 개선 문의사항 - Auto Allocation 이후, LP 수량 수정 가능하도록 -->
			<div class="opus_design_inquiry sm" style="height: 370px; min-width:770px">
				<h3 class="title_design" style="margin-bottom: 0px;"><bean:message key="Basic_Information"/></h3>
				<table>
					<colgroup>
						<col width="150px"></col>
						<col width="45px"></col>
						<col width="45px"></col>
						<col width="25px"></col>
						<col width="45px"></col>
						<col width="80px"></col>
						<col width="40px"></col>
						<col width="*"></col>
					</colgroup >
					<tbody>
						<tr><!-- LKH::2015-09-27 WMS3.O 긴급수정3 -->
	                    	<th><bean:message key="Contract_No"/></th>
	                    	<td>
	                    		<input type="text" name="d_ctrt_cd" id="d_ctrt_cd" style="width:100px;ime-mode:disabled;text-transform:uppercase;" dataformat="engup" onBlur="strToUpper(this);getCtrtInfo(this)"  maxlength="10" required OnKeyDown="if(event.keyCode==13){getCtrtInfo(this);}">
	                    	</td>
	                    	<th></th>
	                        <th><bean:message key="Delete_Flag"/></th>
	                        <td>
		                        <select name="cbxDel_Flg" id="cbxDel_Flg" style="width:40px;">
		                        	<option value = "N"><bean:message key="N"/></option>
		                        	<option value = "Y"><bean:message key="Y"/></option>
		                        </select>
		                    </td>
	                        <td colspan="3"></td>
	                    </tr>                    
	                    <tr>
	                    	<th><bean:message key="Contract_Name"/></th>
	                        <td colspan = "7">
	                        	<input type="text" id="d_ctrt_nm" name="d_ctrt_nm"  dataformat="engup" otherchar = " ()-_" value="" maxlength="100" style="width:200px;text-transform:uppercase;" required >
	                        </td>
	                    </tr>                    
	                    <tr>
				 			<th><bean:message key="Valid_Date"/></th>
				           	<td colspan="7">
				           	<input type="text" id="frm_dt" name="frm_dt" value="" onkeyup="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};" onblur="chkCmprPrd(firCalFlag, false, this, this, form.to_dt);firCalFlag=false;" onkeypress="onlyNumberCheck();"
				           		size="11" style="width: 78px" maxlength="10" required/><!-- 
							 --><span class="dash">~</span><!-- 
							 --><input type="text" id="to_dt" name="to_dt" value="" onkeyup="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};" onblur="chkCmprPrd(firCalFlag, false, this, form.frm_dt, this);firCalFlag=false;" onkeypress="onlyNumberCheck();"
							 	size="11" style="width: 78px" maxlength="10" required/><!-- 
							 --><button type="button" class="calendar ir" name="btn_date" id="btn_date" onclick="doDisplay('DATE11' ,frm1,frm1.frm_dt,frm1.to_dt);"></button>
				 			</td>
						</tr>
						
						<tr>
				 			<th><bean:message key="Sales_Office"/></th>
				           	<td colspan="7"><!--
                        --><input type="text" name="d_ofc_cd" dataformat="engup" style="text-transform:uppercase;width:78px;" maxlength="10" onblur="searchORGName(this, frm1.d_ofc_nm);" required><!--
                        --><button type="button" class="input_seach_btn" tabindex="-1" id="pod_ofc_cd" name="pod_ofc_cd" onclick="doWork('SL_OFC_POPLIST')"></button><!--
                        --><input name="d_ofc_nm" type="text" style="width:200px;text-align:left" required dataformat="excepthan" onblur="strToUpper(this);" onkeydown="if(event.keyCode==13){doWork('SL_OFC_POPLIST');}">
				 			</td>
				   		</tr>
				   		
						<tr>
				 			<th><bean:message key="Sales_PIC"/></th>
				           	<td colspan="7"><!--
                        --><input type="text" name="d_pic_cd" dataformat="engup" style="text-transform:uppercase;width:78px;" maxlength="12" onblur="searchSalesPIC(this, frm1.d_pic_nm);" required><!--
                        --><button type="button" class="input_seach_btn" tabindex="-1" id="pod_d_pic_cd" name="pod_d_pic_cd" onclick="doWork('SL_PIC_POPLIST')"></button><!--
                        --><input name="d_pic_nm" id="d_pic_nm" type="text"  style="width:200px;text-align:left" required dataformat="excepthan" onkeydown="if(event.keyCode==13){doWork('SL_PIC_POPLIST_BY_NM');}">
				 			</td>
				   		</tr>
				   		<tr>
				 			<th><bean:message key="Main_Customer"/></th>
				           	<td colspan="7"><!--
                        --><input type="text" name="d_cus_cd" dataformat="engup" style="text-transform:uppercase;width:78px;"maxlength="20" onblur="searchTlCustInfo(this,frm1.d_cus_nm);" required><!--
                        --><button type="button" class="input_seach_btn" tabindex="-1" id="pod_d_cus_cd" name="pod_d_cus_cd" onclick="Cust_Popup('d_cust')"></button><!--
                        --><input name="d_cus_nm" id="d_cus_nm" type="text"  style="text-transform:uppercase;width:200px;text-align:left" required dataformat="excepthan" onblur="strToUpper(this);" onKeyPress="if(this.readOnly==true){return;};if(event.keyCode==13){Cust_Name_Popup('d_cust');}" autocomplete="off">
				 			</td>
				   		</tr>
	                    
					</tbody>
				</table>
				
				<!-- #3223 UI 변경 -->
				<h3 class="title_design" style="margin-top: 10px;"><bean:message key="Warehouse_Configuration"/></h3>
				<table>
					<colgroup>
						<col width="150px"></col>
						<col width="45px"></col>
						<col width="45px"></col>
						<col width="25px"></col>
						<col width="45px"></col>
						<col width="80px"></col>
						<col width="40px"></col>
						<col width="*"></col>
					</colgroup >

					<tbody>
				   		<tr>
				   			<th><bean:message key="Calculation_Method"/></th>
				   			<td colspan="2">
				   				<select name="cal_method_cd" id="cal_method_cd" style="width:155px;" onchange="onchangeCalMethod(this)" required>
	                          		<bean:define id="calMethodList"  name="cdMap" property="calMethodList"/>
								    <logic:iterate id="calMethod" name="calMethodList">
	                          			<option value='<bean:write name="calMethod" property="cd_val"/>'><bean:write name="calMethod" property="cd_nm"/></option>
	                          		</logic:iterate>
	                        	</select>
	                        </td>
				   			<th>
				   				<span style="display: none; width: 25px;" id="rate_text"><bean:message key="Rate"/></span>
				   				<span style="display: none; width: 100px;" id="rate_per_vol"><bean:message key="Rate_Per_Volumn"/></span><!-- #2511 [WMS4.0]Storage closing without each item's rate data -->
				   			</th>
				   			<td>
				   				<select required name="sel_curr_cd" id="sel_curr_cd" style="display: none;width: 65px" >
	                          		<bean:define id="currCdList"  name="cdMap" property="currCdList"/>
								    <logic:iterate id="currCd" name="currCdList">
	                          			<option value='<bean:write name="currCd" property="cd_val"/>'><bean:write name="currCd" property="cd_nm"/></option>
	                          		</logic:iterate>
	                        	</select>
	                        </td>
	                        <td>
	                        	<input required name="i_rate" id="i_rate" type="text" class="L_input"  style="display: none;width:80px;text-align:right" onkeypress="onlyNumberCheck();" onchange="checkNumFormat(this, '9999999999.00');chkComma(this,12,2);"/>
	                        	<input required name="i_rate_per_vol" id="i_rate_per_vol" type="text" class="L_input"  style="display: none; width:80px; text-align:right" onkeypress="onlyNumberCheck();" onchange="checkNumFormat(this, '9999999999.0000000'); chkComma(this,12,7);"/><!-- #2511 [WMS4.0]Storage closing without each item's rate data -->
	                        </td>
				   			<th>
				   				<span style="display: none;" id="cycle_text"><bean:message key="Cycle"/></span>
				   				<span style="display: none; width: 55px;" id="vol_unit_text"><bean:message key="Volumn_Unit"/></span><!-- #2511 [WMS4.0]Storage closing without each item's rate data -->
				   			</th>
				   			<td>
				   				<select required name="sel_cycle" id="sel_cycle" style="display:none;">
									<bean:define id="fixedRateCycleList"  name="cdMap" property="fixedRateCycleList"/>
									<logic:iterate id="cycleCd" name="fixedRateCycleList">
										<option value='<bean:write name="cycleCd" property="cd_val"/>'><bean:write name="cycleCd" property="cd_nm"/></option>
	                          		</logic:iterate>
	                        	</select>
	                        	<!-- #2511 [WMS4.0]Storage closing without each item's rate data (S) -->
	                        	<select required name="sel_vol_unit" id="sel_vol_unit" style="display:none;">
	                        		<option value=""></option>
	                          		<bean:define id="volUnitList"  name="cdMap" property="volUnitList"/>
	                          		<logic:iterate id="volUntCd" name="volUnitList">
	                          			<option value='<bean:write name="volUntCd" property="cd_val"/>'><bean:write name="volUntCd" property="cd_nm"/></option>
	                          		</logic:iterate>
	                        	</select>
	                        	<!-- #2511 [WMS4.0]Storage closing without each item's rate data (E) -->
	                        </td>
				   		</tr>
				   		<tr>
				   			<th><label for='incl_ib_dt_flg'><bean:message key="Include_Inbound_Date"/></label></th>
				   			<td><input name="incl_ib_dt_flg" id='incl_ib_dt_flg' type="checkbox"/></td>
				   			<th colspan="3"><label for='incl_ob_dt_flg'><bean:message key="Include_Outbound_Date"/></label></th>
				   			<td colspan="3"><input name="incl_ob_dt_flg" id='incl_ob_dt_flg' type="checkbox"/></td>
				   		</tr>
				   		
				   		<tr id="Calculation_Method_EDB" style="display:none; color: red;" >
				   			<th></th>
				   			<td colspan="7">
				   				<bean:message key="Calculation_Method_EDB"/>
	                        </td>
	                    </tr>
	                    
	                    <tr id="Calculation_Method_DAY" style="display:none; color: red;" >
	                 	   <th></th>
				   			<td colspan="7">
				   				<bean:message key="Calculation_Method_DAY"/>
	                        </td>
	                    </tr>
	                    
	                    <tr id="Calculation_Method_FIX" style="display:none; color: red;" >
	                	    <th></th>
				   			<td colspan="7">
				   				<bean:message key="Calculation_Method_FIX"/>
	                        </td>
	                    </tr>
	                    
	                    <tr id="Calculation_Method_DTV" style="display:none; color: red;" >
	                    	<th></th>
				   			<td colspan="7">
				   				<bean:message key="Calculation_Method_DTV"/>
	                        </td>
	                    </tr>
				  						   		
				   		<!-- #2807 [BINEX WMS4.0] LOT04, LOT05 NICKNAME CUSTOMIZATION -->
				   		<tr>
				   			<th><label for=''><bean:message key="LOT4_Alias"/></label></th>
				   			<td colspan="2"><input type="text" name="lot4_alias" id="lot4_alias" maxlength="100"></td>
				   			<th><label for=''><bean:message key="LOT5_Alias"/></label></th>
				   			<td colspan="4"><input type="text" name="lot5_alias" id="lot5_alias" maxlength="100"></td>
				   		</tr>
				   		<!-- #6027 [LATONA] WMS 개선 문의사항 - Auto Allocation 이후, LP 수량 수정 가능하도록 -->
				   		<tr>
	                    	<th><label for=''><bean:message key="ovr_aloc_yn"/></label></th>
				   			<td colspan="7">
				   				<select name="ovr_aloc_yn" id="cbxovr_aloc_yn" style="width:40px;">
		                        	<option value = "N"><bean:message key="N"/></option>
		                        	<option value = "Y"><bean:message key="Y"/></option>
		                        </select>
	                        </td>
	                    </tr>
					</tbody>
				</table>
				
			</div>
		</div>
	</div>
	
	<!-- LKH::2015-09-26 WMS3.O 긴급수정 -->
		<div class = "opus_design_grid" style="display:none">
			<h3 class="title_design" style="margin-bottom: 0px;"><bean:message key="Warehouse_Information"/></h3>
			<div class="opus_design_btn">
				<button type="button" class="btn_normal" onclick="doWork('ROWADD2')"><bean:message key="Add"/></button>
			</div>
			
			<script type="text/javascript">comSheetObject('sheet2');</script>
		</div>
	</div>
	<br><br>
	</div>
</form>

<script type="text/javascript">
var attr_extension = "<%= roleBtnVO.getAttr_extension() %>";
doBtnAuthority(attr_extension);
</script>