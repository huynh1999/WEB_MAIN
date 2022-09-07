<%--
=========================================================
*Copyright(c) 2009 CyberLogitec. All Rights Reserved.
=========================================================
=========================================================
*@FileName   : AIC_WOM_0010.jsp
*@FileTitle  :
*@Description:
*@author     :
*@version    :
*@since      :
*@Change history:
*@author     :	Tuan.Chau	
*@version    :	2.0
*@since      :	2014-06-24
=========================================================
--%>
<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
    <%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
    <link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css"/>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CalculationUtil.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/AIR_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/apps/fis/aie/bmd/workorder/script/AIC_WOM_0010.js?ver=<%=CLT_JS_VER%>"></script>
	<!-- 2016-12-21 자동완성 기능 추가 S -->	
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/autocomplete_ui.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/COM_FRT_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	
	<bean:define id="woPickDeliVO"  name="EventResponse" property="objVal"/>
	<bean:define id="valMap" name="EventResponse" property="mapVal"/>

    <bean:define id="officeInfo" name="valMap" property="officeInfo"/>
    <bean:define id="ofcVO" name="officeInfo"/>
	
	<bean:parameter name="air_sea_clss_cd" id="air_sea_clss_cd" value= ""/>
	<bean:parameter name="bnd_clss_cd" id="bnd_clss_cd" value =""/>
	<bean:parameter name="biz_clss_cd" id="biz_clss_cd" value=""/>
	<bean:parameter name="bkg_seq" id="bkg_seq" value=""/>

	<script language="javascript">
	var AUTOCOMPLETE_YN = 'N';
	 
	<logic:notEmpty name="valMap" property="autocompleteYn">
    	AUTOCOMPLETE_YN = '<bean:write name="valMap" property="autocompleteYn"/>';
	</logic:notEmpty>
	 
        function btnLoad(){
            if(frm1.wo_sts_cd.value=='NA'){
				/*
				if(frm1.bkg_no.value!=''){
	                btnAdd.style.display    = 'inline';
				}else{
					// booking no 가 없을때
					if(frm1.oth_seq.value == "") {
						// Other 에서 넘어온 Other seq 가 없으면 조회버튼 표시
						getObj('bkgBtn').style.display = 'inline';
					} else {
						// Other 에서 넘어온 Other seq 가 있으면 조회버튼 숨김
						getObj('bkgBtn').style.display = 'none';
					}
				}
				*/
			//저장
			}else if(frm1.wo_sts_cd.value=='A'){
			//	btnAdd.style.display   = 'none';
		        getBtnObj('cancelObj').style.display= 'none';
		   		//btnBL.style.display= 'none';
				//btnModify.style.display   = 'inline';
		        getBtnObj('btnDelete').style.display = 'inline';
		        getBtnObj('btnPrint')==null?"":getBtnObj('btnPrint').style.display = 'inline';
		        getBtnObj('btnPrintPOD')==null?"":getBtnObj('btnPrintPOD').style.display = 'inline';
		        getBtnObj('btnPrintPN')==null?"":getBtnObj('btnPrintPN').style.display = 'inline';
		        getBtnObj('btnPrintCO')==null?"":getBtnObj('btnPrintCO').style.display = 'inline';
		        getBtnObj('btnPrintLO')==null?"":getBtnObj('btnPrintLO').style.display = 'inline';
		        getBtnObj('btnSblPrint')==null?"":getBtnObj('btnSblPrint').style.display = 'inline';
				//issObj.style.display  = 'inline';
		        //btnCopy.style.display  = 'inline';

			//Issue
			}else if(frm1.wo_sts_cd.value=='B'){
            //    btnModify.style.display   = 'none';
				getBtnObj('issObj').style.display   = 'none';
				getBtnObj('btnDelete').style.display = 'none';

				getBtnObj('btnPrint')==null?"":getBtnObj('btnPrint').style.display = 'inline';
				getBtnObj('btnPrintPOD')==null?"":getBtnObj('btnPrintPOD').style.display = 'inline';
		        getBtnObj('btnPrintPN')==null?"":getBtnObj('btnPrintPN').style.display = 'inline';
		        getBtnObj('btnPrintCO')==null?"":getBtnObj('btnPrintCO').style.display = 'inline';
		        getBtnObj('btnPrintLO')==null?"":getBtnObj('btnPrintLO').style.display = 'inline';
		        getBtnObj('btnSblPrint')==null?"":getBtnObj('btnSblPrint').style.display = 'inline';
				
				getBtnObj('cancelObj').style.display= 'inline';
				getBtnObj('btnCopy').style.display  = 'inline';
			}
		}
        function setupPage(){        	
        	loadPage();
        	loadData();
        	btnLoad();
        	setTimeout("document.frm1.f_wo_no.focus();", 1000);
		}
	</script>

<!--  tabindex 선언-->
<% int tabindex=1;%>

<form name="frm1" method="POST" action="./AIC_WOM_0010.clt">
	<input type="hidden" name="f_cmd">
	<input type="hidden" name="file_name">
	<input type="hidden" name="title">
	<input type="hidden" name="rd_param">
	<input type="hidden" name="mailTitle">
	<input type="hidden" name="mailTo">
	<!-- //#6889 [NONGHAO] ADJUSTMENT ON HB/L OUTPUT -->
	<input type="hidden" name="rpt_file_name_title"/>
	<input type="hidden" name="ofc_eng_nm" value="<%=userInfo.getOfc_eng_nm() %>">
	<input type="hidden" name="user_ofc_cd" value="<%=userInfo.getOfc_cd() %>">
	<input type="hidden" name="ofc_locl_nm" value="<%=userInfo.getOfc_locl_nm() %>">
	<input type="hidden" name="eml" value="<%=userInfo.getEml() %>">
	<input type="hidden" name="user_name" value="<%=userInfo.getUser_name() %>">
	<input type="hidden" name="user_fax" value="<%=userInfo.getFax() %>">
	<input type="hidden" name="user_phn" value="<%=userInfo.getPhn() %>">

	<!--  Report ==> OutLook연동 파라미터 (S) -->
	<input type="hidden" name="rpt_biz_tp"/>
	<input type="hidden" name="rpt_biz_sub_tp"/>
	<input type="hidden" name="rpt_trdp_cd"/>
	<!--  Report ==> OutLook연동 파라미터 (E) -->

	<input type="hidden" name="sys_ofc_cd" value="<bean:write name="valMap" property="sysOfcCd"/>">
	<input type="hidden" name="air_sea_clss_cd"  value="<bean:write name="air_sea_clss_cd"/>">
	<input type="hidden" name="bnd_clss_cd"  value="<bean:write name="bnd_clss_cd"/>">
	<input type="hidden" name="biz_clss_cd"  value="<bean:write name="biz_clss_cd"/>">
	
	<!-- #1307 [Starway/Starcluser] EDI with Hyundai Glovis America (Weight Ratio) -->
	<input type="hidden" name="h_volume"  value="">
	<input type="hidden" name="k_volume"  value="">
	<!-- OFVFOUR-7798: [Southeast] Update the Title/Subject of Pickup# Notice -->
	<input type="hidden" name="mbl_no_ref"  value="<bean:write name="woPickDeliVO" property="mbl_no_ref"/>">

	<html:hidden name="woPickDeliVO" property="intg_bl_seq"/>
	<%-- <html:hidden name="woPickDeliVO" property="bkg_no"/> --%>
	<html:hidden name="woPickDeliVO" property="wo_sts_cd"/>
	<%-- <html:hidden name="woPickDeliVO" property="bnd_clss_cd"/> --%>
	<html:hidden name="woPickDeliVO" property="oth_seq"/>
	<input type="hidden" name="pkup_rmk" value="<bean:write name="ofcVO" property="pkup_rmk"/>">
	<input type="hidden" name="wh_instr_rmk" value="<bean:write name="ofcVO" property="wh_instr_rmk"/>">
	<input type="hidden" name="cstms_instr_rmk" value="<bean:write name="ofcVO" property="cstms_instr_rmk"/>">
	<input type="hidden" name="wh_lodg_instr_rmk" value="<bean:write name="ofcVO" property="wh_lodg_instr_rmk"/>">
	<!-- page_title_area(S) -->
	<div class="page_title_area">
	   <h2 class="page_title"><button type="button"><%=LEV3_NM%></button></h2>
	   <!-- btn_div TEST-->
	   <div class="opus_design_btn TOP">
	   <%-- 
		   <button type="button" class="btn_accent" onClick="doWork('SEARCH')" style="display: none;" btnAuth="<%= roleBtnVO.getAttr1() %>"><bean:message key="Search"/></button>
		   <button type="button" class="btn_normal" onClick="doWork('NEW')" style="display: none;" btnAuth="<%= roleBtnVO.getAttr2() %>"><bean:message key="New"/></button>
		   <span style="display: none;" btnAuth="<%= roleBtnVO.getAttr3() %>"><button type="button" class="btn_normal" id="btnSave" onClick="doWork('SAVE')" style='display:inline;'><bean:message key="Save"/></button></span>
		   <button type="button" id="btnSaveX" class="btn_normal"  style="display:none;" btnAuth="<%= roleBtnVO.getAttr3() %>" onclick="saveCloseBtnClick()"><bean:message key="Save_X"/></button>
		   <span style="display: none;" btnAuth="<%= roleBtnVO.getAttr4() %>"><button type="button" class="btn_normal" id="btnDelete" onClick="doWork('REMOVE')" style="display: none;"><bean:message key="Delete"/></button></span>
		   <span style="display: none;" bbtnAuth="ISSUE"><button type="button" class="btn_normal" id="issObj" onClick="doWork('ISSUE')" style="display: none;"><bean:message key="Issue"/></button></span>
		   <span style="display: none;" btnAuth="CANCEL"><button type="button" class="btn_normal"  id="cancelObj" onClick="doWork('CANCEL')" style="display: none;"><bean:message key="Issue"/> <bean:message key="Cancel"/></button></span>
		   <span style="display: none;" btnAuth="SBL_PRINT"><button type="button" class="btn_normal" id="btnSblPrint" onClick="doWork('SBL_PRINT')" style="display: none;"><bean:message key="SBL_Print"/></button></span>
		   <span style="display: none;" btnAuth="<%= roleBtnVO.getAttr5() %>"><button type="button" class="btn_normal" id="btnPrint" onClick="doWork('PRINT')" style="display: none;"><bean:message key="Print"/></button></span>
		   <span style="display: none;" btnAuth="<%= roleBtnVO.getAttr5() %>"><button type="button" class="btn_normal" id="btnPrint" onClick="doWork('PRINT_DO')" style="display: none;"><bean:message key="B.DO"/></button></span>
		   <span style="display: none;" btnAuth="<%= roleBtnVO.getAttr5() %>"><button type="button" class="btn_normal" id="btnPrint" onClick="doWork('PRINT_PN')" style="display: none;"><bean:message key="B.Pickup_Notice"/></button></span>
		   <span style="display: none;" btnAuth="COPY"><button type="button" class="btn_normal" id="btnCopy" onClick="doWork('COPY')" style="display: none;"><bean:message key="Copy"/></button></span>
		   <span  style="display: none;" btnAuth="HBL"><button type="button" class="btn_normal" onclick="doWork('HOUSEBL');" style="display: none;"><bean:message key="HBL"/></button></span>
		   <span  style="display: none;" btnAuth="SEND_EDI"><button type="button" class="btn_normal" onclick="doWork('EDI');" style="display: inline;"><bean:message key="Send_EDI"/></button></span>
 		--%>   
	   </div>
	   <!-- btn_div -->
	   <div class="location">
        <!-- location 내용 동적생성 (별도 코딩 불필요) -->
		   <span><%=LEV1_NM%></span> &gt;
		   <span><%=LEV2_NM%></span> &gt;
		   <span><%=LEV3_NM%></span>
		   <a href="" class="ir">URL Copy</a>
		</div>
	</div>
<div class="over_wrap" height="100%">	
	<div class="wrap_search">	
		<div class="opus_design_inquiry entry_pannel ">
			<table>
				<colgroup>
					<col width="120">
					<col width="*">
				</colgroup>
				<tbody>
					<tr>
						<th><bean:message key="Work_Order_No"/></th>
						<td>
							<input tabindex="<%=tabindex++%>"  type="text" name="f_wo_no" maxlength="20" value="<bean:write name="woPickDeliVO" property="wo_no"/>" class="search_form" onblur="strToUpper(this);" dataformat="excepthan" style="ime-mode:disabled;text-transform:uppercase;width:100px"><!-- 
						 --><button type="button" class="input_seach_btn" tabindex="-1" onclick="doWork('WO_POPLIST')"></button><!-- 
						 --></td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
		<input type="hidden" tabindex="-1" name="bkg_seq" type="text"  maxlength="20"  readOnly value="<bean:write name="bkg_seq"/>" />
	<div class="wrap_result" style="min-width:1320px;">
			<div class= "opus_design_inquiry">
				<table>
					<tr height="10px"></tr>
				</table>			
				<table>
					<colgroup>
						<logic:equal name="biz_clss_cd" value="">
							<col width="110">
							<col width="180">
						</logic:equal>	
						<logic:notEqual name="biz_clss_cd" value="">
							<col width="110">
							<col width="145">
						</logic:notEqual>							
						<logic:equal name="biz_clss_cd" value="M">
						<col width="110">
						<col width="145">
						</logic:equal>
						<col width="110">
						<col width="145">
						
						<logic:equal name="air_sea_clss_cd" value="A">
							<logic:equal name="biz_clss_cd" value="H">
								<col width="110">
								<col width="*">						
							</logic:equal>
							<logic:equal name="biz_clss_cd" value="M">
								<col width="80">
								<col width="*">
							</logic:equal>
						</logic:equal>
						<logic:notEqual name="air_sea_clss_cd" value="M">
						<col width="110">
						<col width="*">
						</logic:notEqual>												
					</colgroup>
					<tbody>
					<tr>
						<!--work Order No  -->
						<th><bean:message key="Work_Order_No"/></th>
						<td><input tabindex="-1" name="wo_no" type="text"  maxlength="20" class="search_form-disable" onblur="strToUpper(this);" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:107px" readOnly value='<bean:write name="woPickDeliVO" property="wo_no"/>' ></td>

						<!--filing No.  -->
						<logic:equal name="biz_clss_cd" value="M">
						<th><bean:message key="Ref_No"/></th>
						 <td><input  tabindex="<%=tabindex++%>" required type="text" name="ref_no" maxlength="40" value='<bean:write name="woPickDeliVO" property="ref_no"/>' class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:107px" onBlur="strToUpper(this);frm1.intg_bl_seq.value='';nextTab(this);doWork('HBLSMRY');"><!-- 
					    --><button type="button" class="input_seach_btn" tabindex="-1" onclick="doWork('REF_POPLIST')"></button><!-- 
						-->
						</td>                        
						</logic:equal>
						
                        <!--bill to ref no  -->
                        <th><bean:message key="Bill_to_ref_no"/></th>
                        <td><input tabindex="<%=tabindex++%>" name="bill_to_ref_no" value='<bean:write name="woPickDeliVO" property="bill_to_ref_no"/>' maxlength="20" type="text" class="search_form" onBlur="strToUpper(this);" dataformat="multiLanguage" style="ime-mode:auto; text-transform:uppercase;width:107px;"'></td>
						
						

						<!--workorder type  -->
						<th><bean:message key="WO_Kind"/></th>
						<td><!-- 
						 --><bean:define id="wotypeList" name="valMap" property="wotypeList"/><!-- 
						 --><html:select tabindex="3" name="woPickDeliVO" property="wo_tp_cd" styleClass="search_form" style="width:107px;"><!-- 
						 --><html:options collection="wotypeList" property="cd_val" labelProperty="cd_nm"/><!-- 
						 --></html:select><!-- 
						--></td>
					</tr>
				</tbody>
			</table>
				<table>
					<colgroup>
						<logic:equal name="air_sea_clss_cd" value="S">
							<col width="110">
							<col width="145">
						</logic:equal>
						<logic:equal name="biz_clss_cd" value="M">
							<col width="110">
							<col width="145">
						</logic:equal>
						<logic:equal name="biz_clss_cd" value="H">
							<col width="110">
							<col width="145">
						</logic:equal>
						<logic:equal name="biz_clss_cd" value="">
							<col width="110">
							<col width="180">
						</logic:equal>				
						<logic:equal name="biz_clss_cd" value="CU">
							<col width="110">
							<col width="145">
						</logic:equal>	
						<logic:equal name="biz_clss_cd" value="CA">
							<col width="110">
							<col width="145">
						</logic:equal>	
						<col width="110">
						<col width="145">
						<col width="110">
						<col width="145">
						<col width=80>
						<col width="*">
					</colgroup>
					<tbody>
					<tr>
					
						<!--Carrier Bkg No  -->
                       		<logic:equal name="air_sea_clss_cd" value="S">
	                            <th><bean:message key="Liner_Bkg_No"/></th>
	                            <td><input tabindex="<%=tabindex++%>" type="text" name="lnr_bkg_no"  maxlength="20" value='<bean:write name="woPickDeliVO" property="lnr_bkg_no"/>' onblur="strToUpper(this)" class="search_form" dataformat="excepthan" style="ime-mode:auto;text-transform:uppercase;width:107px;">
                            </logic:equal>
                            
	                         <logic:notEqual name="air_sea_clss_cd" value="S">
	                           	 	<input tabindex="<%=tabindex++%>" type="hidden" name="lnr_bkg_no" value="" onblur="strToUpper(this)" dataformat="excepthan" style="ime-mode:disabledtext-transform:uppercase;width:100px;">
	                            </td>
	                         </logic:notEqual>		


						<!--BL No/ Other Bl No/ Bookging No  -->
						<logic:equal name="biz_clss_cd" value="H">
							<th><bean:message key="BL_No"/></th>
							<td><!-- 
							 --><input  tabindex="<%=tabindex++%>" required type="text" name="bl_no" maxlength="40" value='<bean:write name="woPickDeliVO" property="bl_no"/>' class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:107px" onBlur="strToUpper(this);frm1.intg_bl_seq.value='';doWork('HBLSMRY');"><!--
							 --><button type="button" class="input_seach_btn" tabindex="-1" onclick="doWork('HBL_POPLIST')"></button><!--
							 --></td>
						</logic:equal>
						<logic:equal name="biz_clss_cd" value="M">
							<th><bean:message key="BL_No"/></th>
							<td><!--
							 --><input tabindex="<%=tabindex++%>" required type="text" name="mbl_no" maxlength="40" value='<bean:write name="woPickDeliVO" property="bl_no"/>' class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:107px" onBlur="strToUpper(this);nextTab(this);frm1.intg_bl_seq.value='';doWork('HBLSMRY');"><!--
							 --><button type="button" class="input_seach_btn" tabindex="-1" onclick="doWork('MBL_POPLIST')"></button><!-- 
							 --></td>
						</logic:equal>
						<!--Other Filing No  -->
						<logic:equal name="biz_clss_cd" value="">
							<th><bean:message key="Other_Reference_No"/></th>
							<td><input  tabindex="<%=tabindex++%>" required type="text" name="oth_ref_no" id="oth_ref_no" maxlength="40" value='<bean:write name="woPickDeliVO" property="bl_no"/>' onblur="strToUpper(this);" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:107px" onChange="frm1.intg_bl_seq.value='';doWork('HBLSMRY');"><!--
							  --><button type="button" class="btn_etc" onclick="doWork('HBLSMRY');"><bean:message key="Search"/></button></td>
						</logic:equal>
						<logic:equal name="biz_clss_cd" value="CU" >
							<th><bean:message key="Booking_No"/></th>
							<td><!-- 
							 --><input  tabindex="<%=tabindex++%>" required type="text" name="bkg_no" id="bkg_no" maxlength="40" value='<bean:write name="woPickDeliVO" property="bkg_no"/>' onblur="strToUpper(this);" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:107px" onChange="doWork('HBLSMRY');"><!-- 
							 --><button type="button" class="input_seach_btn" tabindex="-1" onClick="doWork('BKNO_DO_POPLIST_BLANK')"></button><!-- 
							 --></td>
						</logic:equal>
						<logic:equal name="biz_clss_cd" value="CA" >
							<th><bean:message key="Booking_No"/></th>
							<td><!-- 
							 --><input  tabindex="<%=tabindex++%>" required type="text" name="bkg_no" id="bkg_no" maxlength="40" value='<bean:write name="woPickDeliVO" property="bkg_no"/>' onblur="strToUpper(this);" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:107px" onChange="doWork('HBLSMRY');"><!-- 
							 --><button type="button" class="input_seach_btn" tabindex="-1" onClick="doWork('BKNO_DO_POPLIST_BLANK')"></button><!-- 
							 --></td>
						</logic:equal>                 

                        <!--WH ref no  -->
                         	<th><bean:message key="WH_Ref_no"/></th>
                         	<td><input tabindex="<%=tabindex++%>" name="wh_ref_no" value='<bean:write name="woPickDeliVO" property="wh_ref_no"/>' maxlength="20" type="text" class="search_form" onBlur="strToUpper(this);" dataformat="multiLanguage" style="ime-mode:auto; text-transform:uppercase;width:107px;"'></td>
						
						<!--Customs Type Code-->
                        <th><bean:message key="Customs_Type"/></th>
                        <td><!-- 
							 --><bean:define id="cstmsTypeList" name="valMap" property="cstmsTypeList"/><!-- 
							 --><html:select tabindex="6" name="woPickDeliVO" property="cstms_tp_cd" styleClass="search_form" style="width:107px;"><!-- 
							 --><option value=""></option><!--	
							 --><html:options collection="cstmsTypeList" property="cd_val" labelProperty="cd_nm"/><!-- 
							 --></html:select><!-- 
							 -->
	                    </td>				
			
				        <th><bean:message key="Cut_Off_Time"/></th>
					  	<td><!-- 
							   --><input tabindex="<%=tabindex++%>" type="text" name="cut_off_dt" value='<wrt:write name="woPickDeliVO" property="cut_off_dt" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy"/>'  maxlength="10" onkeyPress="onlyNumberCheck();mkDateFormatType(this, event, false,1);"  onKeyUp="mkDateFormatType(this, event, false,1)" onBlur="mkDateFormatType(this, event, true,1);dateRangeValid(this, 'Cut-Off Time');" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:78px;"><!-- 
							   --><button type="button" class="calendar ir" id="cut_off_dt_cal" onclick="doDisplay('DATE4', frm1);"></button><!-- 
							   --><input tabindex="<%=tabindex++%>" type="text" name="cut_off_tm"  value='<wrt:write name="woPickDeliVO" property="cut_off_tm" formatType="DATE" fromFormat="HHmm" format="HH:mm"/>' maxlength="4" class="search_form"  dataformat="excepthan" style="ime-mode:disabled;width:38px;" onBlur="timeCheck(this);" onkeypress="onlyNumberCheck();"> ~ <!-- 
								 --><input tabindex="<%=tabindex++%>" type="text" name="cut_off_to_tm" value='<wrt:write name="woPickDeliVO" property="cut_off_to_tm" formatType="DATE" fromFormat="HHmm" format="HH:mm"/>' maxlength="4" class="search_form"  dataformat="excepthan" style="ime-mode:disabled;width:38px;" onBlur="timeCheck(this);" onkeypress="onlyNumberCheck();"><!--
							   -->
				        </td>	
					</tr>
					
					</tbody>
				</table>
			</div>	
	</div>
	<div class="wrap_result" style="min-width:1320px;">
		<div class="layout_wrap">
			
			
			<!--Pickup Work Order 중에 첫번째 DIV  -->
			<div class="layout_vertical_3 pad_left_8" style="width:400px;min-width:400px;">
				<div class="opus_design_inquiry sm" style="width:100%;height:780px">
					<h3 class="title_design"><bean:message key="Party_Information"/></h3>
					
					<!--Bill to  -->
					<table>
						<colgroup>
							<col width="127">
							<col width="*">
						</colgroup>
							<tbody>
			             <logic:notEqual name="woPickDeliVO" property="wo_sts_cd" value="NA">
								<tr>
			                        <th style="text-align:left"><a href="javascript:clearBlPrnr('B02');"><bean:message key="Bill_To"/></a></th>
										<td><!-- 
			                         --><input tabindex="<%=tabindex++%>" required type="text"   maxlength="20" name="bill_to_trdp_cd" value='<bean:write name="woPickDeliVO" property="bill_to_trdp_cd"/>' class="search_form" dataformat="multiLanguage" style="<%=MULTI_IMEMODE%>text-transform:uppercase;width:55px;"  onKeyDown="codeNameAction('partner_bill',this, 'onKeyDown')" onBlur="strToUpper(this);codeNameAction('partner_bill',this, 'onBlur')"><!-- 
			                         --><button type="button" class="input_seach_btn" tabindex="-1" id="bil" onclick="doWork('PARTNER_POPLIST',this)"></button><!-- 
			                         --><input tabindex="<%=tabindex++%>" required type="text"   maxlength="50"  name="bill_to_trdp_nm" class="search_form" dataformat="multiLanguage" style="<%=MULTI_IMEMODE%>text-transform:uppercase;width:145px;" onBlur="strToUpper(this);" value='<bean:write name="woPickDeliVO" property="bill_to_trdp_nm"/>' id="bil" onKeyPress="if(event.keyCode==13){doWork('PARTNER_POPLIST_NAME', this);}"><!-- 
			                         --></td>
			                    </tr>
			                    <tr>
			                        <td colspan="2"><textarea tabindex="<%=tabindex++%>" required name="bill_to_trdp_addr" maxlength="400" class="search_form" dataformat="multiLanguage" style="<%=MULTI_IMEMODE%>width:360px;height:60px" onBlur="strToUpper(this);checkTxtAreaLn(this, 62, 6, this.value)"><bean:write name="woPickDeliVO" property="bill_to_trdp_addr"/></textarea></td>
			                    </tr>
 						</logic:notEqual>
 
 						<logic:equal name="woPickDeliVO" property="wo_sts_cd"  value="NA">
								<tr>
			                        <th style="text-align:left"><a href="javascript:clearBlPrnr('B02');"><bean:message key="Bill_To"/></a></th>
			                        <td><!-- 
			                         --><input tabindex="<%=tabindex++%>" required type="text"   maxlength="20" name="bill_to_trdp_cd" value='' class="search_form" dataformat="multiLanguage" style="<%=MULTI_IMEMODE%>text-transform:uppercase;width:55px;"  onKeyDown="codeNameAction('partner_bill',this, 'onKeyDown')" onBlur="strToUpper(this);codeNameAction('partner_bill',this, 'onBlur')"><!-- 
			                         --><button type="button" class="input_seach_btn" tabindex="-1" id="bil" onclick="doWork('PARTNER_POPLIST',this)"></button><!-- 
			                         --><input tabindex="<%=tabindex++%>" required type="text"   maxlength="50"  name="bill_to_trdp_nm" class="search_form" dataformat="multiLanguage" style="<%=MULTI_IMEMODE%>text-transform:uppercase;width:145px;" onBlur="strToUpper(this);" value='' id="bil" onKeyPress="if(event.keyCode==13){doWork('PARTNER_POPLIST_NAME', this);}"><!-- 
			                         --></td>
			                    </tr>
			                    <tr>
			                        <td colspan="2"><textarea tabindex="<%=tabindex++%>" required name="bill_to_trdp_addr" maxlength="400" class="search_form" dataformat="multiLanguage" style="<%=MULTI_IMEMODE%>width:360px;height:60px" onBlur="strToUpper(this);checkTxtAreaLn(this, 62, 6, this.value)"></textarea></td>
			                    </tr>
 						</logic:equal>
							</tbody>
					</table>
					
				<table>
					<colgroup>
						<col width="127">
						<col width="*">
					</colgroup>
					<tbody>
                     <tr>
                         <th style="text-align:left"><bean:message key="Contact_Phone_Fax"/></th>
                         <td><input tabindex="<%=tabindex++%>" name="bill_to_pic" maxlength="50" type="text" class="search_form" onBlur="strToUpper(this);" dataformat="multiLanguage" style="<%=MULTI_IMEMODE%>text-transform:uppercase;width:75px;" value='<bean:write name="woPickDeliVO" property="bill_to_pic"/>'><!--  
                         --><input  tabindex="<%=tabindex++%>" name="bill_to_phn" maxlength="30" type="text" class="search_form"  dataformat="excepthan" style="ime-mode:disabled;width:75px;" value='<bean:write name="woPickDeliVO" property="bill_to_phn"/>'><!--
                         --><input tabindex="<%=tabindex++%>" name="bill_to_fax" maxlength="30" type="text" class="search_form"  dataformat="excepthan" style="ime-mode:disabled;width:75px;" value='<bean:write name="woPickDeliVO" property="bill_to_fax"/>'></td>
                     </tr>
                 </table>
                 
                 
					<!--trucker  -->
					<table>
						<colgroup>
							<col width="127">
							<col width="*">
						</colgroup>
							<tbody>
			                     <tr>
			                        <th style="text-align:left"><a href="javascript:clearBlPrnr('TR');"><bean:message key="Trucker"/></a></th>
			                        <td><!-- 
			                         --><input type="text"  tabindex="<%=tabindex++%>"  name="trucker_trdp_cd" maxlength="20" value='<bean:write name="woPickDeliVO" property="trucker_trdp_cd"/>' class="search_form" dataformat="multiLanguage" style="<%=MULTI_IMEMODE%>text-transform:uppercase;width:55px;"  onKeyDown="codeNameAction('partner_trucker',this, 'onKeyDown')" onBlur="strToUpper(this);codeNameAction('partner_trucker',this, 'onBlur')"><!-- 
			                         --><button type="button" class="input_seach_btn" tabindex="-1" id="trk" onclick="doWork('PARTNER_POPLIST', this)"></button><!-- 
			                         --><input type="text" tabindex="<%=tabindex++%>"  maxlength="50"  name="trucker_trdp_nm" class="search_form" onBlur="strToUpper(this);" dataformat="multiLanguage" style="<%=MULTI_IMEMODE%>text-transform:uppercase;width:145px;" value='<bean:write name="woPickDeliVO" property="trucker_trdp_nm"/>' id="trk" onKeyPress="if(event.keyCode==13){doWork('PARTNER_POPLIST_NAME', this);}"><!-- 
			                         --></td>
			                    </tr>
			                    <tr>
			                    	<td colspan="2"><textarea tabindex="<%=tabindex++%>" name="trucker_trdp_addr" class="search_form" dataformat="multiLanguage" style="<%=MULTI_IMEMODE%>width:360px;height:60px" onBlur="strToUpper(this);checkTxtAreaLn(this, 62, 6, this.value)" maxlength="400" ><bean:write name="woPickDeliVO" property="trucker_trdp_addr"/></textarea></td>
			                    </tr>
							</tbody>
					</table>
					
				<table>
					<colgroup>
						<col width="127">
						<col width="*">
					</colgroup>
					<tbody>
                     <tr>
                         <th style="text-align:left"><bean:message key="Contact_Phone_Fax"/></th>
                         <td><input tabindex="<%=tabindex++%>" name="trucker_pic" maxlength="50" type="text" class="search_form" dataformat="multiLanguage" style="<%=MULTI_IMEMODE%>text-transform:uppercase;width:75px;" value='<bean:write name="woPickDeliVO" property="trucker_pic"/>'><!--
                         --><input tabindex="<%=tabindex++%>" name="trucker_phn" maxlength="30" type="text" class="search_form"  dataformat="excepthan" style="ime-mode:disabled;width:75px;" value='<bean:write name="woPickDeliVO" property="trucker_phn"/>'><!--
                         --><input tabindex="<%=tabindex++%>" name="trucker_fax" maxlength="30" type="text" class="search_form"  dataformat="excepthan" style="ime-mode:disabled;width:75px;" value='<bean:write name="woPickDeliVO" property="trucker_fax"/>'></td>
                     </tr>
                 </table>   
                 
                               
                 <!-- Customs Broker -->
					<table>
						<colgroup>
							<col width="127">
							<col width="*">
						</colgroup>
							<tbody>
			                     <tr>
			                        <th style="text-align:left"><a href="javascript:clearBlPrnr('C03');"><bean:message key="C_Broker"/></a></th>
		                        <td><!-- 
		                         --><input type="text"  tabindex="<%=tabindex++%>"  name="cstms_cust_cd" maxlength="20" value='<bean:write name="woPickDeliVO" property="cstms_cust_cd"/>' class="search_form" dataformat="multiLanguage" style="<%=MULTI_IMEMODE%>text-transform:uppercase;width:55px;"  onKeyDown="codeNameAction('partner_cstms_cust',this, 'onKeyDown')" onBlur="strToUpper(this);codeNameAction('partner_cstms_cust',this, 'onBlur')"><!-- 
		                         --><button type="button" class="input_seach_btn" tabindex="-1" id="cstms_cust" onclick="doWork('PARTNER_POPLIST', this)"></button><!-- 
		                         --><input type="text" tabindex="<%=tabindex++%>"  maxlength="50"  name="cstms_cust_nm" class="search_form" onBlur="strToUpper(this);" dataformat="excepthan" style="<%=MULTI_IMEMODE%>text-transform:uppercase;width:145px;" value='<bean:write name="woPickDeliVO" property="cstms_cust_nm"/>' id="cstms_cust" onKeyPress="if(event.keyCode==13){doWork('PARTNER_POPLIST_NAME', this);}"><!-- 
		                         --></td>
			                    </tr>
			                    <tr>
			                    	<td colspan="2"><textarea tabindex="<%=tabindex++%>"  name="cstms_cust_addr" maxlength="400" class="search_form" dataformat="multiLanguage" style="<%=MULTI_IMEMODE%>width:360px;height:60px" onBlur="strToUpper(this);checkTxtAreaLn(this, 62, 6, this.value)"><bean:write name="woPickDeliVO" property="cstms_cust_addr"/></textarea></td>
			                    </tr>
							</tbody>
					</table>
					
				<table>
					<colgroup>
						<col width="127">
						<col width="*">
					</colgroup>
					<tbody>
                     <tr>
                         <th style="text-align:left"><bean:message key="Contact_Phone_Fax"/></th>
	                        <td><input tabindex="<%=tabindex++%>" name="cstms_cust_pic" maxlength="50" type="text" class="search_form" dataformat="multiLanguage" style="<%=MULTI_IMEMODE%>text-transform:uppercase;width:75px;" value='<bean:write name="woPickDeliVO" property="cstms_cust_pic"/>'><!--
	                        --><input tabindex="<%=tabindex++%>" name="cstms_cust_phn" maxlength="30" type="text" class="search_form"  dataformat="excepthan" style="ime-mode:disabled;width:75px;" value='<bean:write name="woPickDeliVO" property="cstms_cust_phn"/>'><!--
	                        --><input tabindex="<%=tabindex++%>" name="cstms_cust_fax" maxlength="30" type="text" class="search_form"  dataformat="excepthan" style="ime-mode:disabled;width:75px;" value='<bean:write name="woPickDeliVO" property="cstms_cust_fax"/>'></td> 
                     </tr>
                 </table>  
                 
                 <!-- Business Unit-->
					<table>
						<colgroup>
							<col width="127">
							<col width="*">
						</colgroup>
							<tbody>
			                     <tr>
			                        <th style="text-align:left"><bean:message key="Business_Unit"/></th>
			                        <td ><!-- 
			                         --><input type="text"  tabindex="<%=tabindex++%>"  name="biz_unit_trdp_cd" maxlength="20" value='<bean:write name="woPickDeliVO" property="biz_unit_trdp_cd"/>' class="search_form" dataformat="multiLanguage" style="<%=MULTI_IMEMODE%>text-transform:uppercase;width:55px;"  onKeyDown="codeNameAction('partner_biz',this, 'onKeyDown')" onBlur="strToUpper(this);codeNameAction('partner_biz',this, 'onBlur')"><!-- 
			                         --><button type="button" class="input_seach_btn" tabindex="-1" id="biz" onclick="doWork('PARTNER_POPLIST', this)"></button><!-- 
			                         --><input type="text" tabindex="<%=tabindex++%>"  maxlength="50"  name="biz_unit_trdp_nm" class="search_form" onBlur="strToUpper(this);" dataformat="multiLanguage" style="<%=MULTI_IMEMODE%>text-transform:uppercase;width:145px;" value='<bean:write name="woPickDeliVO" property="biz_unit_trdp_nm"/>' id="biz" onKeyPress="if(event.keyCode==13){doWork('PARTNER_POPLIST_NAME', this);}"><!-- 
			                         --></td>
			                    </tr>
							</tbody>
					</table>                 
                                 
                 <!-- Warehouse-->
					<table>
						<colgroup>
							<col width="127">
							<col width="*">
						</colgroup>
							<tbody>
			                     <tr>
			                        <th style="text-align:left"><a href="javascript:clearBlPrnr('WH');"><bean:message key="Warehouse"/></a></th>
			                        <td ><!-- 
			                         --><input type="text"  tabindex="<%=tabindex++%>"  name="wh_cd" maxlength="20" value='<bean:write name="woPickDeliVO" property="wh_cd"/>' class="search_form" dataformat="multiLanguage" style="<%=MULTI_IMEMODE%>text-transform:uppercase;width:55px;"  onKeyDown="codeNameAction('partner_wh',this, 'onKeyDown')" onBlur="strToUpper(this);codeNameAction('partner_wh',this, 'onBlur')"><!-- 
			                         --><button type="button" class="input_seach_btn" tabindex="-1" id="wh" onclick="doWork('PARTNER_POPLIST', this)"></button><!-- 
			                         --><input type="text" tabindex="<%=tabindex++%>"  maxlength="50"  name="wh_nm" class="search_form" onBlur="strToUpper(this);" dataformat="multiLanguage" style="<%=MULTI_IMEMODE%>text-transform:uppercase;width:145px;" value='<bean:write name="woPickDeliVO" property="wh_nm"/>' id="wh" onKeyPress="if(event.keyCode==13){doWork('PARTNER_POPLIST_NAME', this);}"><!-- 
			                         --></td>
			                    </tr>
			                    <tr>
			                    	<td colspan="2"><textarea tabindex="<%=tabindex++%>"  name="wh_addr" maxlength="400" class="search_form" dataformat="multiLanguage" style="<%=MULTI_IMEMODE%>width:360px;height:60px" onBlur="strToUpper(this);checkTxtAreaLn(this, 62, 6, this.value)"><bean:write name="woPickDeliVO" property="wh_addr"/></textarea></td>
			                    </tr>
							</tbody>
					</table>
					
				<table>
					<colgroup>
						<col width="127">
						<col width="*">
					</colgroup>
					<tbody>
	                     <tr>
                         <th style="text-align:left"><bean:message key="Contact_Phone_Fax"/></th>
	                        <td><input tabindex="<%=tabindex++%>" name="wh_pic" maxlength="50" type="text" class="search_form" dataformat="multiLanguage" style="<%=MULTI_IMEMODE%>text-transform:uppercase;width:75px;" value='<bean:write name="woPickDeliVO" property="wh_pic"/>'><!--
	                        --><input tabindex="<%=tabindex++%>" name="wh_phn" maxlength="30" type="text" class="search_form"  dataformat="excepthan" style="ime-mode:disabled;width:75px;" value='<bean:write name="woPickDeliVO" property="wh_phn"/>'><!--
	                        --><input tabindex="<%=tabindex++%>" name="wh_fax" maxlength="30" type="text" class="search_form"  dataformat="excepthan" style="ime-mode:disabled;width:75px;" value='<bean:write name="woPickDeliVO" property="wh_fax"/>'></td> 
                        </tr>
	                     <tr>
                         <th style="text-align:left;"><bean:message key="Driver"/>/<br/><bean:message key="Tel_Truck_Plate_NO"/></th>

                         <td>
                         <input tabindex="<%=tabindex++%>" name="drv_nm" value='<bean:write name="woPickDeliVO" property="drv_nm"/>' maxlength="20" type="text" class="search_form" onBlur="strToUpper(this);" dataformat="multiLanguage" style="ime-mode:auto; text-transform:uppercase;width:75px;"'><!-- 
	                         --><input tabindex="<%=tabindex++%>" name="drv_phn" maxlength="30" type="text" class="search_form"  dataformat="excepthan" style="ime-mode:disabled;width:75px;" value='<bean:write name="woPickDeliVO" property="drv_phn"/>'><!--
	                         --><input tabindex="<%=tabindex++%>" name="trk_plat_no" value='<bean:write name="woPickDeliVO" property="trk_plat_no"/>' maxlength="20" type="text" class="search_form" onBlur="strToUpper(this);" dataformat="multiLanguage" style="ime-mode:auto; text-transform:uppercase;width:75px;"'><!--
	                         -->
                         
                         </td>
	                     </tr>
	                     <tr>
		                     <th style="text-align:left"><bean:message key="PO_Load_Time"/></th>
					  	    <td colspan="3"><!-- 
							   --><input tabindex="<%=tabindex++%>" type="text" name="wh_dt" value='<wrt:write name="woPickDeliVO" property="wh_dt" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy"/>'  maxlength="10" onkeyPress="onlyNumberCheck();mkDateFormatType(this, event, false,1);"  onKeyUp="mkDateFormatType(this, event, false,1)" onBlur="mkDateFormatType(this, event, true,1);dateRangeValid(this, 'Load Time');" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:75px;"><!-- 
							   --><button type="button" class="calendar ir" id="wh_dt_cal" onclick="doDisplay('DATE5', frm1);"></button><!-- 
							   --><input tabindex="<%=tabindex++%>" type="text" name="wh_tm"  value='<wrt:write name="woPickDeliVO" property="wh_tm" formatType="DATE" fromFormat="HHmm" format="HH:mm"/>' maxlength="4" class="search_form"  dataformat="excepthan" style="ime-mode:disabled;width:54px;" onBlur="timeCheck(this);" onkeypress="onlyNumberCheck();">~ <!-- 
								 --><input tabindex="<%=tabindex++%>" type="text" name="wh_to_tm" value='<wrt:write name="woPickDeliVO" property="wh_to_tm" formatType="DATE" fromFormat="HHmm" format="HH:mm"/>' maxlength="4" class="search_form"  dataformat="excepthan" style="ime-mode:disabled;width:54px;" onBlur="timeCheck(this);" onkeypress="onlyNumberCheck();"><!--
							   -->
				            </td>
			            </tr>
	                     
                 </table>    
                 
                                
                 <!-- Customer-->
					<table>
						<colgroup>
							<col width="127">
							<col width="*">
						</colgroup>
							<tbody>
			                     <tr>
			                        <th style="text-align:left"><bean:message key="Customer"/></th>
			                        <td><!-- 
			                         --><input type="text"  tabindex="<%=tabindex++%>"  name="cust_cd" maxlength="20" value='<bean:write name="woPickDeliVO" property="cust_cd"/>' class="search_form" dataformat="multiLanguage" style="<%=MULTI_IMEMODE%>text-transform:uppercase;width:55px;"  onKeyDown="codeNameAction('partner_cust',this, 'onKeyDown')" onBlur="strToUpper(this);codeNameAction('partner_cust',this, 'onBlur')"><!-- 
			                         --><button type="button" class="input_seach_btn" tabindex="-1" id="cust" onclick="doWork('PARTNER_POPLIST', this)"></button><!-- 
			                         --><input type="text" tabindex="<%=tabindex++%>"  maxlength="50"  name="cust_nm" class="search_form" onBlur="strToUpper(this);" dataformat="multiLanguage" style="<%=MULTI_IMEMODE%>text-transform:uppercase;width:145px;" value='<bean:write name="woPickDeliVO" property="cust_nm"/>' id="cust" onKeyPress="if(event.keyCode==13){doWork('PARTNER_POPLIST_NAME', this);}"><!-- 
			                         --></td>
			                    </tr>
			                    <tr>
			                    	<td colspan="2"><textarea tabindex="<%=tabindex++%>"  name="cust_addr" maxlength="400" class="search_form" dataformat="multiLanguage" style="<%=MULTI_IMEMODE%>width:360px;height:60px" onBlur="strToUpper(this);checkTxtAreaLn(this, 62, 6, this.value)"><bean:write name="woPickDeliVO" property="cust_addr"/></textarea></td>
			                    </tr>
							</tbody>
					</table>
					
				<table>
					<colgroup>
						<col width="127">
						<col width="*">
					</colgroup>
					<tbody>
	                     <tr>
                         <th style="text-align:left"><bean:message key="Contact_Phone_Fax"/></th>
	                        <td><input tabindex="<%=tabindex++%>" name="cust_pic" maxlength="50" type="text" class="search_form" dataformat="multiLanguage" style="<%=MULTI_IMEMODE%>text-transform:uppercase;width:75px;" value='<bean:write name="woPickDeliVO" property="cust_pic"/>'><!--
	                        --><input tabindex="<%=tabindex++%>" name="cust_phn" maxlength="30" type="text" class="search_form"  dataformat="excepthan" style="ime-mode:disabled;width:75px;" value='<bean:write name="woPickDeliVO" property="cust_phn"/>'><!--
	                        --><input tabindex="<%=tabindex++%>" name="cust_fax" maxlength="30" type="text" class="search_form"  dataformat="excepthan" style="ime-mode:disabled;width:75px;" value='<bean:write name="woPickDeliVO" property="cust_fax"/>'> </td>
	                          
                        </tr>
                 </table>                     
                 
						
				</div>
			</div>
			
			
			<!--Pickup Work Order 중에 가운데 DIV  -->
			<div class="layout_vertical_3 pad_left_8" style="width:500px;min-width:500px;">
				<div class="opus_design_inquiry sm" style="width:100%;height:780px">
					
					<!-- Vessel & Route 정보 -->
					<h3 class="title_design"><bean:message key="Vessel_Route"/></h3>
					<table>
						<colgroup>
							<col width="127">
							<col width="205">
							<col width="*">
						</colgroup>
							<tbody>
			                   <tr>
									<th style="text-align:left"> 
			                           <logic:equal name="air_sea_clss_cd" value="S"> 
			                           	<bean:message key="Liner"/> 
			                           </logic:equal> 
			                           <logic:equal name="air_sea_clss_cd" value=""> 
			                           	<bean:message key="Liner"/> 
			                           </logic:equal> 
			                           <logic:equal name="air_sea_clss_cd" value="A"> 
			                           	<bean:message key="Air_Line"/> 
			                          	</logic:equal> 
			                        </th>
			                        
			                        <td colspan="2">                         
			                         <input tabindex="<%=tabindex++%>" type="text" name="lnr_trdp_cd" maxlength="20"  value='<bean:write name="woPickDeliVO" property="lnr_trdp_cd"/>' class="search_form" onKeyDown="codeNameAction('partner_liner',this, 'onKeyDown')" onBlur="codeNameAction('partner_liner',this, 'onBlur');javascript:this.value=this.value.toUpperCase();" dataformat="excepthan" style="ime-mode:auto;text-transform:uppercase;width:55px;"><!-- 
			                         --><button type="button" class="input_seach_btn" tabindex="-1" id="liner" onClick="doWork('PARTNER_POPLIST', this)" ></button><!-- 
			                         --><input tabindex="<%=tabindex++%>" type="text" name="lnr_trdp_nm"  maxlength="50" value='<bean:write name="woPickDeliVO" property="lnr_trdp_nm"/>' class="search_form" onblur="strToUpper(this)" class="search_form" dataformat="excepthan" style="width:145px;ime-mode:auto;text-transform:uppercase;" onKeyPress="if(event.keyCode==13){doWork('PARTNER_POPLIST_NAME', document.getElementById('liner'));}"><!-- 
			                         -->
			                         </td>
			                    </tr>
			                    <tr>
			                       <th style="text-align:left"><bean:message key="VSL_VOY"/></th>
				                   <td>
								   		<input tabindex="-1" type="text" name="trnk_vsl_nm" maxlength="5" value='<bean:write name="woPickDeliVO" property="trnk_vsl_nm"/>' class="search_form-disable" readOnly dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:233px;" onBlur="strToUpper(this);"> 
				                         	
				                   </td>
				                   <td>
				                   	   <input tabindex="-1" type="text" name="trnk_voy" value='<bean:write name="woPickDeliVO" property="trnk_voy"/>' class="search_form-disable" readOnly maxlength="50" dataformat="excepthan" style="ime-mode:disabled;width:100px;text-transform:uppercase;" onblur="strToUpper(this);">
				                   </td>
											                         
			                    </tr>
			                    <tr>
			                    	<th style="text-align:left"> 
			                           	<bean:message key="POL"/> / <bean:message key="ETD"/> 
			                        </th>
			                        
			                        <td>                         
			                  		<input tabindex="-1" type="text" name="pol_cd" maxlength="5" value='<bean:write name="woPickDeliVO" property="pol_cd"/>' class="search_form-disable"  readOnly dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:55px;"  onBlur="strToUpper(this);"><!-- 
			                         --><input tabindex="-1" type="text" name="pol_nm"  value='<bean:write name="woPickDeliVO" property="pol_nm"/>' class="search_form-disable" readOnly maxlength="50" dataformat="excepthan" style="ime-mode:disabled;width:174px;text-transform:uppercase;" onblur="strToUpper(this);">

			                         </td>
			                         <td>
			                            <input readonly name="etd_dt_tm" value='<wrt:write name="woPickDeliVO" property="etd_dt_tm" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy"/>' type="text" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:75px;"  size='11' maxlength="10" class="search_form">
			                         </td>
			                    </tr>
			                    <tr>
			                    	<th style="text-align:left"> 
			                           	<bean:message key="POD"/> / <bean:message key="ETA"/> 
			                        </th>
			                        
			                        <td>                         
										<input tabindex="-1" type="text" name="pod_cd" maxlength="5" value='<bean:write name="woPickDeliVO" property="pod_cd"/>' class="search_form-disable" readOnly dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:55px;" onBlur="strToUpper(this);"><!-- 
			                         --><input tabindex="-1" type="text" name="pod_nm" value='<bean:write name="woPickDeliVO" property="pod_nm"/>' class="search_form-disable" readOnly maxlength="50" dataformat="excepthan" style="ime-mode:disabled;width:174px;text-transform:uppercase;" onblur="strToUpper(this);">
			                         </td>
			                         <td>
			                         	<input readonly name="eta_dt_tm" value='<wrt:write name="woPickDeliVO" property="eta_dt_tm" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy"/>' type="text" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:75px;"  size='11' maxlength="10" class="search_form">
			                         </td>
			                    </tr>
							</tbody>
					</table>
				<table>
					<tr height="20px"></tr>
				</table>		
					<!--  Pickup & Delivery 정보 -->
					<h3 class="title_design"><bean:message key="Pickup_Delivery"/></h3>
					
					<!-- empty Pickup --> 
					<table>
						<colgroup>
							<col width="127">
							<col width="*">
						</colgroup>
							<tbody>
	                    <tr>
                              <th style="text-align:left">
                              <a href="javascript:clearBlPrnr('PU');">
                              <logic:equal name="air_sea_clss_cd" value="S">
                               <logic:equal name="bnd_clss_cd" value="O">
                                   <bean:message key="Empty_Pickup"/>
                               </logic:equal>                               
                               <logic:notEqual name="bnd_clss_cd" value="O">
                                   <bean:message key="Pickup"/>
                               </logic:notEqual>
                              </logic:equal>
                              <logic:notEqual name="air_sea_clss_cd" value="S">
                             	 <bean:message key="Pickup"/>
                              </logic:notEqual>
                              </a>
                              </th>			                        
	                        
                              <td><!-- 
                               --><input tabindex="<%=tabindex++%>" type="text"   name="pickup_trdp_cd" maxlength="20" value='<bean:write name="woPickDeliVO" property="pickup_trdp_cd"/>' class="search_form" dataformat="multiLanguage" style="<%=MULTI_IMEMODE%>text-transform:uppercase;width:55px;"  onKeyDown="codeNameAction('partner_pickup',this, 'onKeyDown')" onBlur="strToUpper(this);codeNameAction('partner_pickup',this, 'onBlur')"><!-- 
                               --><button type="button" class="input_seach_btn" tabindex="-1" id="pic" onclick="doWork('PARTNER_POPLIST', this)"></button><!-- 
                               --><input tabindex="<%=tabindex++%>" type="text"  maxlength="50"  name="pickup_trdp_nm" class="search_form" onBlur="strToUpper(this);" dataformat="multiLanguage" style="<%=MULTI_IMEMODE%>text-transform:uppercase;width:145px;" value='<bean:write name="woPickDeliVO" property="pickup_trdp_nm"/>' id="pic" onKeyPress="if(event.keyCode==13){doWork('PARTNER_POPLIST_NAME', this);}"><!-- 
                               --></td>
	                    </tr>
	                    <tr>
	                        <td colspan="2"><textarea  tabindex="<%=tabindex++%>" name="pickup_trdp_addr" class="search_form" dataformat="multiLanguage" style="<%=MULTI_IMEMODE%>width:360px;height:60px" maxlength="400" onBlur="strToUpper(this);checkTxtAreaLn(this, 62, 6, this.value)" ><bean:write name="woPickDeliVO" property="pickup_trdp_addr"/></textarea></td>
	                    </tr>

	                     <tr>
	                         <th style="text-align:left"><bean:message key="Contact_Phone_Fax"/></th>
	                                <td><input tabindex="<%=tabindex++%>" name="pickup_pic" maxlength="50" type="text" class="search_form" onBlur="strToUpper(this);" dataformat="multiLanguage"  style="<%=MULTI_IMEMODE%>text-transform:uppercase;width:75px;" value='<bean:write name="woPickDeliVO" property="pickup_pic"/>'><!-- 
	                                 --><input tabindex="<%=tabindex++%>" name="pickup_phn" maxlength="30" type="text" class="search_form"  dataformat="excepthan" style="ime-mode:disabled;width:75px;" value='<bean:write name="woPickDeliVO" property="pickup_phn"/>'><!-- 
	                                 --><input tabindex="<%=tabindex++%>" name="pickup_fax" maxlength="30" type="text" class="search_form"  dataformat="excepthan" style="ime-mode:disabled;width:75px;" value='<bean:write name="woPickDeliVO" property="pickup_fax"/>'><!-- 
	                                 --></td>
	                     </tr>
	                     
	                     <tr>
	                     	<th style="text-align:left"><bean:message key="Est_Time_Ref_no"/></th>
	               			<td><!-- 
							 --><input tabindex="<%=tabindex++%>" type="text" name="pickup_dt" value='<wrt:write name="woPickDeliVO" property="pickup_dt" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy"/>'  maxlength="10" onkeyPress="onlyNumberCheck();mkDateFormatType(this, event, false,1)" onKeyUp="mkDateFormatType(this, event, false,1);" onBlur="mkDateFormatType(this, event, true,1);dateRangeValid(this, 'Pickup Date');" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:75px;"><!-- 
							 --><button type="button" class="calendar ir" id="pickup_dt_cal" onclick="doDisplay('DATE1', frm1);"></button><!-- 
							 --><input tabindex="<%=tabindex++%>" type="text" name="pickup_tm" value='<wrt:write name="woPickDeliVO" property="pickup_tm" formatType="DATE" fromFormat="HHmm" format="HH:mm"/>' maxlength="4" class="search_form"  dataformat="excepthan" style="ime-mode:disabled;width:54px;" onBlur="timeCheck(this);" onkeypress="onlyNumberCheck();">~ <!-- 
							 --><input tabindex="<%=tabindex++%>" type="text" name="pickup_to_tm" value='<wrt:write name="woPickDeliVO" property="pickup_to_tm" formatType="DATE" fromFormat="HHmm" format="HH:mm"/>' maxlength="4" class="search_form"  dataformat="excepthan" style="ime-mode:disabled;width:54px;" onBlur="timeCheck(this);" onkeypress="onlyNumberCheck();"><!--
							 --></td>
							 
							 <td>
							 	<input tabindex="<%=tabindex++%>" name="pickup_ref_no" value='<bean:write name="woPickDeliVO" property="pickup_ref_no"/>' maxlength="40" type="text" onBlur="strToUpper(this);" class="search_form" dataformat="multiLanguage" style="ime-mode:auto;text-transform:uppercase;width:100px;"'>
							 </td>
	                     </tr>
	                  </tbody>
                 </table>
                 
                 
                 
					<!--  Freight Pickup -->
					<table>
						<colgroup>
							<col width="127">
							<col width="*">
						</colgroup>
							<tbody>
	                    <tr>
                              <th style="text-align:left"><a href="javascript:clearBlPrnr('DL');">
                               <logic:equal name="air_sea_clss_cd" value="S">
	                               <logic:equal name="bnd_clss_cd" value="O">
	                                   <bean:message key="Freight_Pickup"/>
	                               </logic:equal>                               
	                               <logic:notEqual name="bnd_clss_cd" value="O">
	                                   <bean:message key="Delivery"/>
	                               </logic:notEqual>
                               </logic:equal>
                               <logic:notEqual name="air_sea_clss_cd" value="S">
                              	 <bean:message key="Delivery"/>
								</logic:notEqual>
                               </a>              
                               </th>		                        
	                        
                              <td><!-- 
                               --><input tabindex="<%=tabindex++%>" type="text"   name="delivery_trdp_cd" maxlength="20" value='<bean:write name="woPickDeliVO" property="delivery_trdp_cd"/>' class="search_form" dataformat="multiLanguage" style="<%=MULTI_IMEMODE%>text-transform:uppercase;width:55px;"  onKeyDown="codeNameAction('partner_delivery',this, 'onKeyDown')" onBlur="strToUpper(this);codeNameAction('partner_delivery',this, 'onBlur')"><!-- 
                               --><button type="button" class="input_seach_btn" tabindex="-1" id="del" onclick="doWork('PARTNER_POPLIST', this)"></button><!-- 
                               --><input tabindex="<%=tabindex++%>" type="text"   name="delivery_trdp_nm" maxlength="50" class="search_form" dataformat="multiLanguage" style="<%=MULTI_IMEMODE%>text-transform:uppercase;width:145px;" onBlur="strToUpper(this);" value='<bean:write name="woPickDeliVO" property="delivery_trdp_nm"/>' id="del" onKeyPress="if(event.keyCode==13){doWork('PARTNER_POPLIST_NAME', this);}"><!-- 
                               --></td>
	                    </tr>
	                    <tr>
	                        <td colspan="2"><textarea tabindex="<%=tabindex++%>" name="delivery_trdp_addr" maxlength="400" class="search_form" onBlur="strToUpper(this);checkTxtAreaLn(this, 62, 6, this.value)" dataformat="multiLanguage" style="<%=MULTI_IMEMODE%>width:360px;height:60px"><bean:write name="woPickDeliVO" property="delivery_trdp_addr"/></textarea></td>
	                    </tr>

	                     <tr>
	                         <th style="text-align:left"><bean:message key="Contact_Phone_Fax"/></th>
	                         <td><input tabindex="<%=tabindex++%>" name="delivery_pic" maxlength="50" type="text" class="search_form" onBlur="strToUpper(this);" dataformat="multiLanguage" style="<%=MULTI_IMEMODE%>text-transform:uppercase;width:75px;" value='<bean:write name="woPickDeliVO" property="delivery_pic"/>'><!--  
	                         --><input tabindex="<%=tabindex++%>" name="delivery_phn" maxlength="30" type="text" class="search_form"  dataformat="excepthan" style="ime-mode:disabled;width:75px;" value='<bean:write name="woPickDeliVO" property="delivery_phn"/>'><!--
	                         --><input tabindex="<%=tabindex++%>" name="delivery_fax" maxlength="30" type="text" class="search_form"  dataformat="excepthan" style="ime-mode:disabled;width:75px;" value='<bean:write name="woPickDeliVO" property="delivery_fax"/>'></td>
	                     </tr>
	                     
	                     <tr>
	                     	<th style="text-align:left"><bean:message key="Est_Time_Ref_no"/></th>
							  <td><!-- 
							   --><input tabindex="<%=tabindex++%>" type="text" name="delivery_dt" value='<wrt:write name="woPickDeliVO" property="delivery_dt" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy"/>'  maxlength="10" onkeyPress="onlyNumberCheck();mkDateFormatType(this, event, false,1);"  onKeyUp="mkDateFormatType(this, event, false,1)" onBlur="mkDateFormatType(this, event, true,1);dateRangeValid(this, 'Delivery Date');" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:75px;"><!-- 
							   --><button type="button" class="calendar ir" id="delivery_dt_cal" onclick="doDisplay('DATE2', frm1);"></button><!-- 
							   --><input tabindex="<%=tabindex++%>" type="text" name="delivery_tm"  value='<wrt:write name="woPickDeliVO" property="delivery_tm" formatType="DATE" fromFormat="HHmm" format="HH:mm"/>' maxlength="4" class="search_form"  dataformat="excepthan" style="ime-mode:disabled;width:54px;" onBlur="timeCheck(this);" onkeypress="onlyNumberCheck();">~ <!-- 
								 --><input tabindex="<%=tabindex++%>" type="text" name="delivery_to_tm" value='<wrt:write name="woPickDeliVO" property="delivery_to_tm" formatType="DATE" fromFormat="HHmm" format="HH:mm"/>' maxlength="4" class="search_form"  dataformat="excepthan" style="ime-mode:disabled;width:54px;" onBlur="timeCheck(this);" onkeypress="onlyNumberCheck();"><!--
							   --></td>
							 
							 <td>
							 	<input tabindex="<%=tabindex++%>" name="delivery_ref_no"  value='<bean:write name="woPickDeliVO" property="delivery_ref_no"/>' maxlength="40" type="text" class="search_form" onBlur="strToUpper(this);" dataformat="multiLanguage" style="ime-mode:auto; text-transform:uppercase;width:100px;">
							 </td>
	                     </tr>
	                  </tbody>
                 </table>					
					
					<!--  Loaded Return-->
					<table>
						<colgroup>
							<col width="127">
							<col width="*">
						</colgroup>
							<tbody>
	                    <tr>
								<th style="text-align:left">
                               <logic:equal name="air_sea_clss_cd" value="S">
	                               <logic:equal name="bnd_clss_cd" value="O">
	                                   <bean:message key="Loaded_Return"/>
	                               </logic:equal>                               
	                               <logic:notEqual name="bnd_clss_cd" value="O">
	                                   <bean:message key="Return"/>
	                               </logic:notEqual>
                               </logic:equal>
                               <logic:notEqual name="air_sea_clss_cd" value="S">
                              	 <bean:message key="Return"/>
								</logic:notEqual>
								</th>		                        
	                        
	                            <td><!-- 
	                             --><input tabindex="<%=tabindex++%>" type="text" name="return_trdp_cd" maxlength="20" class="search_form" dataformat="multiLanguage" style="<%=MULTI_IMEMODE%>text-transform:uppercase;width:55px;" value='<bean:write name="woPickDeliVO" property="return_trdp_cd"/>' onKeyDown="codeNameAction('partner_trsp',this, 'onKeyDown')" onBlur="strToUpper(this);codeNameAction('partner_trsp',this, 'onBlur')"><!-- 
	                             --><button type="button" class="input_seach_btn" tabindex="-1" id="trn" onclick="doWork('PARTNER_POPLIST', this)"></button><!-- 
	                             --><input tabindex="<%=tabindex++%>" type="text" name="return_trdp_nm" maxlength="50" value='<bean:write name="woPickDeliVO" property="return_trdp_nm"/>' class="search_form" onBlur="strToUpper(this);" dataformat="multiLanguage" style="<%=MULTI_IMEMODE%>text-transform:uppercase;width:145px;" id="trn" onKeyPress="if(event.keyCode==13){doWork('PARTNER_POPLIST_NAME', this);}"><!-- 
	                             --></td>
	                    </tr>
	                    <tr>
	                        <td colspan="2"><textarea tabindex="<%=tabindex++%>" name="return_trdp_addr" maxlength ="400" class="search_form" dataformat="multiLanguage" style="<%=MULTI_IMEMODE%>width:360px;height:60px"onBlur="strToUpper(this);checkTxtAreaLn(this, 62, 6, this.value)"><bean:write name="woPickDeliVO" property="return_trdp_addr"/></textarea></td>
	                    </tr>

	                     <tr>
	                         <th style="text-align:left"><bean:message key="Contact_Phone_Fax"/></th>
	                         <td><input tabindex="<%=tabindex++%>" name="return_pic" maxlength="50" type="text" class="search_form" onBlur="strToUpper(this);" dataformat="multiLanguage" style="<%=MULTI_IMEMODE%>text-transform:uppercase;width:75px;" value='<bean:write name="woPickDeliVO" property="return_pic"/>'><!--  
	                         --><input tabindex="<%=tabindex++%>" name="return_phn" maxlength="30" type="text" class="search_form"  dataformat="excepthan" style="ime-mode:disabled;width:75px;" value='<bean:write name="woPickDeliVO" property="return_phn"/>'><!--
	                         --><input tabindex="<%=tabindex++%>" name="return_fax" maxlength="30" type="text" class="search_form"  dataformat="excepthan" style="ime-mode:disabled;width:75px;" value='<bean:write name="woPickDeliVO" property="return_fax"/>'></td>
	                     </tr>
	                     
	                     <tr>
	                     	<th style="text-align:left"><bean:message key="Est_Time_Ref_no"/></th>
							  <td><!-- 
								 <td><!-- 
								  --><input tabindex="<%=tabindex++%>" type="text" name="return_dt" value='<wrt:write name="woPickDeliVO" property="return_dt" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy"/>'  maxlength="10" onkeyPress="onlyNumberCheck();mkDateFormatType(this, event, false,1);"  onKeyUp="mkDateFormatType(this, event, false,1)" onBlur="mkDateFormatType(this, event, true,1);dateRangeValid(this, 'Delivery Date');" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:75px;"><!-- 
								  --><button type="button" class="calendar ir" id="return_dt_cal" onclick="doDisplay('DATE3', frm1);"></button><!-- 
								  --><input tabindex="<%=tabindex++%>" type="text" name="return_tm"  value='<wrt:write name="woPickDeliVO" property="return_tm" formatType="DATE" fromFormat="HHmm" format="HH:mm"/>' maxlength="4" class="search_form"  dataformat="excepthan" style="ime-mode:disabled;width:54px;" onBlur="timeCheck(this);" onkeypress="onlyNumberCheck();">~ <!-- 
								 --><input tabindex="<%=tabindex++%>" type="text" name="return_to_tm" value='<wrt:write name="woPickDeliVO" property="return_to_tm" formatType="DATE" fromFormat="HHmm" format="HH:mm"/>' maxlength="4" class="search_form"  dataformat="excepthan" style="ime-mode:disabled;width:54px;" onBlur="timeCheck(this);" onkeypress="onlyNumberCheck();"><!--
								  --></td>
							 
							 <td>
							 	<input tabindex="<%=tabindex++%>" name="return_ref_no"  value='<bean:write name="woPickDeliVO" property="return_ref_no"/>' onBlur="strToUpper(this);" maxlength="20" type="text" class="search_form" dataformat="multiLanguage" style="ime-mode:auto; text-transform:uppercase;width:100px;"'></td>
							 </td>
	                     </tr>
	                  </tbody>
                 </table>	             
                 
                 
                 
                 
                 
				</div>
			</div>

			<!--Pickup Work Order 중에 세번째(마지막) DIV  -->
			
			<div class="layout_vertical_3 pad_left_8" style="width:400px;min-width:400px;">
				<div class="opus_design_inquiry sm" style="width:100%;height:780px">
				
				<h3 class="title_design"><bean:message key="Shipment_Item"/></h3>
				
					<table>
						<colgroup>
							<col width="127">
							<col width="205">
							<col width="*">
						</colgroup>
							<tbody>
			                   <tr>
									<th style="text-align:left"> 
			                           	<bean:message key="Cargo_Type"/> 
			                        </th>
			                        
			                        <td colspan="2">
										<bean:define id="cargoTpCdList" name="valMap" property="cargoTpCdList"/>
										<html:select name="woPickDeliVO" property="cargo_tp_cd" styleClass="search_form" style="width:100px;">
											<html:options collection="cargoTpCdList" property="cd_val" labelProperty="cd_nm"/>
										</html:select>
			                         </td>
			                    </tr>
			                    <tr>
			                        <th style="text-align:left"><bean:message key="Commodity"/></th>
			                        <td colspan="2">
			                        	<input tabindex="-1" type="text" name="cgo_itm_cmdt_cd" maxlength="13" value='<bean:write name="woPickDeliVO" property="cgo_itm_cmdt_cd"/>' class="search_form-disable" readOnly dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:55px;" onBlur="strToUpper(this);"><!-- 
			                         --><input tabindex="-1" type="text" name="cgo_itm_cmdt_nm" value='<bean:write name="woPickDeliVO" property="cgo_itm_cmdt_nm"/>' class="search_form-disable" readOnly maxlength="100" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:170px;" onblur="strToUpper(this);">
									</td>
											                         
			                    </tr>
			                    <tr>
			                        <th style="text-align:left"><bean:message key="Package"/></th>
			                        <td>
			                        	<input tabindex="<%=tabindex++%>" type="text" name="cgo_pck_qty" maxlength="7" value="<wrt:write name="woPickDeliVO" property="cgo_pck_qty" formatType="MONEY" format="#,###"/>" onkeyPress="onlyNumberCheck();" onkeyup="numberCommaLen(this,7,0)" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:80px;text-align:right"><!-- 
			                         --><bean:define id="pckList" name="valMap" property="pckCdList"/><!-- 
			                         --><html:select name="woPickDeliVO" property="cgo_pck_ut_cd" styleClass="search_form" style="width:145px;">
			                             <option></option>
			                             <html:options collection="pckList" property="pck_ut_cd" labelProperty="pck_nm"/>
			                            </html:select>
			                         </td>
			                    </tr>
			                    <tr>
			                    	<th style="text-align:left"> 
			                           	<bean:message key="GWeight"/> 
			                        </th>
									<logic:equal name="air_sea_clss_cd" value="A">
									<td><!-- 
									 --><input  tabindex="<%=tabindex++%>"  required type="text" name="act_wgt_k" maxlength="10" value="<wrt:write name="woPickDeliVO" property="act_wgt_k" formatType="MONEY" format="#,##0.00"/>" onkeyPress="onlyNumberCheck('.');" onchange="weightChange(this);" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:80px;text-align:right;"><!-- 
									 --><input tabindex="-1"  required type="text" name="grs_wgt_ut_cd" value="KG" style="width:32px;border:0;background-color:transparent;" readOnly><!-- 
									 --><input tabindex="<%=tabindex++%>"  required type="text" name="act_wgt_l" maxlength="10" value="<wrt:write name="woPickDeliVO" property="act_wgt_l" formatType="MONEY" format="#,##0.00"/>" onkeyPress="onlyNumberCheck('.');" onchange="weightChange(this);" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:80px;text-align:right;"><!-- 
									 --><input tabindex="-1"  required type="text" name="grs_wgt_ut_cd1" value="LB" style="width:20px;border:0;background-color:transparent;" readOnly><!-- 
									 --></td>
									</logic:equal> 
									<logic:notEqual name="air_sea_clss_cd" value="A">
									<td><!-- 
									 --><input  tabindex="<%=tabindex++%>"   type="text" name="act_wgt_k" maxlength="10" value="<wrt:write name="woPickDeliVO" property="act_wgt_k" formatType="MONEY" format="#,##0.00"/>" onkeyPress="onlyNumberCheck('.');" onchange="weightChange(this);" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:80px;text-align:right;"><!-- 
									 --><input tabindex="-1"   type="text" name="grs_wgt_ut_cd" value="KG" style="width:32px;border:0;background-color:transparent;" readOnly><!-- 
									 --><input tabindex="<%=tabindex++%>"   type="text" name="act_wgt_l" maxlength="10" value="<wrt:write name="woPickDeliVO" property="act_wgt_l" formatType="MONEY" format="#,##0.00"/>" onkeyPress="onlyNumberCheck('.');" onchange="weightChange(this);" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:80px;text-align:right;"><!-- 
									 --><input tabindex="-1"   type="text" name="grs_wgt_ut_cd1" value="LB" style="width:20px;border:0;background-color:transparent;" readOnly><!-- 
									 --></td>
									</logic:notEqual>
			                    </tr>
			                    
			                    <tr>
									<logic:equal name="air_sea_clss_cd" value="S">
										<th style="text-align:left"><bean:message key="Measurement"/></th>
									</logic:equal>
									<logic:equal name="air_sea_clss_cd" value="A">
										<th style="text-align:left"><bean:message key="Measurement"/></th>
									</logic:equal>
									<logic:equal name="air_sea_clss_cd" value="S">
										<td><!-- 
										 --><input tabindex="<%=tabindex++%>"  type="text" name="cgo_meas_m" maxlength="11" value="<wrt:write name="woPickDeliVO" property="cgo_meas_m" formatType="MONEY" format="#,##0.000"/>" onkeyPress="onlyNumberCheck('.');" onchange="numberCommaLen(this,8,3);chkComma(this,8,3);cbmChange(this);" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:80px;text-align:right;"><!-- 
										 --><input tabindex="-1"  type="text" name="meas_ut_cd"  value="CBM" style="width:32px;border:0;background-color:transparent;" readOnly><!-- 
										 --><input tabindex="<%=tabindex++%>"  type="text" name="cgo_meas_f" maxlength="11" value="<wrt:write name="woPickDeliVO" property="cgo_meas_f" formatType="MONEY" format="#,##0.000"/>" onkeyPress="onlyNumberCheck('.');" onchange="numberCommaLen(this,8,3);chkComma(this,8,3);cbmChange(this);" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:80px;text-align:right;"><!-- 
										 --><input tabindex="-1"  type="text" name="meas_ut_cd1" value="CFT" style="width:30px;border:0;background-color:transparent;" readOnly><!-- 
				                         --></td>
				                         <td></td>
									</logic:equal>
									<logic:notEqual name="air_sea_clss_cd" value="S">
										<logic:equal name="air_sea_clss_cd" value="">
											<th style="text-align:left"><bean:message key="Measurement"/></th>
										</logic:equal>
										<td><!-- 
										 --><input tabindex="<%=tabindex++%>" type="text" name="cgo_meas_m" maxlength="11" value="<wrt:write name="woPickDeliVO" property="cgo_meas_m" formatType="MONEY" format="#,##0.000"/>" onkeyPress="onlyNumberCheck('.');" onchange="numberCommaLen(this,8,3);chkComma(this,8,3);cbmChange(this);" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:80px;text-align:right;"><!-- 
										 --><input tabindex="-1" type="text" name="meas_ut_cd"  value="CBM" style="width:32px;border:0;background-color:transparent;" readOnly ><!-- 
										 --><input tabindex="<%=tabindex++%>" type="text" name="cgo_meas_f" maxlength="11" value="<wrt:write name="woPickDeliVO" property="cgo_meas_f" formatType="MONEY" format="#,##0.000"/>" onkeyPress="onlyNumberCheck('.');" onchange="numberCommaLen(this,8,3);chkComma(this,8,3);cbmChange(this);" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:80px;text-align:right;"><!-- 
										 --><input tabindex="-1" type="text" name="meas_ut_cd1" value="CFT" style="width:30px;border:0;background-color:transparent;" readOnly ><!-- 
										 --></td>
										 <td></td>
									</logic:notEqual>
									
						       </tr>			                    
								<tr>
									<td colspan="2" style="text-align:right">
										<logic:equal name="air_sea_clss_cd" value="S">
											<button id="ashipper" type="button" class="btn_etc" onClick="updateWgt()"><bean:message key="Update"/></button>
										</logic:equal>
									</td>
								</tr>
			                    <tr>
			                        <th style="text-align:left"><bean:message key="Container_Summary"/></th>
			                        <td colspan="2">
			                        	<input tabindex="-1" readonly type="text" name="cntr_info" maxlength="7" value="<bean:write name="woPickDeliVO" property="cntr_info"/>" dataformat="excepthan" style="width:230px;text-align:left"/>
			                         </td>
			                    </tr>
			                    <tr>
			                        <th style="text-align:left"><bean:message key="Container_Qty"/></th>
			                        <td colspan="2">
			                        	
			                        
			                         </td>
			                    </tr>			                    
							</tbody>
					</table>
					<div class="opus_design_grid" id="mainTable" style="width:360px;">
						<div  style="margin-bottom:10px"><script type="text/javascript">comSheetObject('sheet1');</script>	</div>
					</div>				
					<div class="opus_design_grid" style="display: none;">
						<script type="text/javascript">comSheetObject('sheet2');</script>		
							 </div>	
					<table>
						<colgroup>
							<col width="127">
							<col width="205">
							<col width="*">
						</colgroup>
							<tbody>
			                   <tr>
									<th style="text-align:left"> 
			                           	<bean:message key="Export_Ref_No"/> 
			                        </th>

			                    </tr>
								<tr>
								<td colspan="2"><textarea tabindex="<%=tabindex++%>" name="exp_ref_no" maxlength="200" class="search_form" dataformat="multiLanguage" style="<%=MULTI_IMEMODE%>width:360px;height:70px" onBlur="strToUpper(this);checkTxtAreaLn(this, 62, 6, this.value)"><bean:write name="woPickDeliVO" property="exp_ref_no"/></textarea></td>
								<td></td>
								</tr>
							</tbody>
					</table>				
				
				<h3 class="title_design"><bean:message key="Management"/></h3>
				
				
				   <table>
						<colgroup>
							<col width="127">
							<col width="205">
							<col width="*">
						</colgroup>
							<tbody>
			                   <tr>
									<th style="text-align:left"> 
			                           	<bean:message key="Print_Mark_Desc"/> 
			                        </th>
									<td colspan="2"><input tabindex="<%=tabindex++%>" name="prt_md_yn" id="prt_md_yn" type="checkbox" value='<bean:write name="woPickDeliVO" property="prt_md_yn"/>'></td>
			                    </tr>

			                   <tr>
									<th style="text-align:left"> 
			                           	<bean:message key="Issued_By"/> /<bean:message key="at"/>  
			                        </th>
									<td colspan="2">
										<input readonly name='rgst_usrid' type="text" style="width:75px" value='<bean:write name="woPickDeliVO" property="rgst_usrid"/>' ><input name="rgst_tms" id="rgst_tms" value="<wrt:write name="woPickDeliVO" property="rgst_tms" formatType="DATE" fromFormat="MMddyyyyHHmmss" format="MM-dd-yyyy HH:mm:ss"/>" type="text" class="search_form" readOnly dataformat="excepthan" style="ime-mode:disabled;width:130px;"  maxlength="10" class="search_form" tabindex="-1">
									</td>
			                    </tr>

			                   <tr>
									<th style="text-align:left"> 
			                           	<bean:message key="Modified_by"/> /<bean:message key="at"/>  
			                        </th>
									<td colspan="2">
										<input readonly name='modi_usrid' type="text" style="width:75px" value = '<bean:write name="woPickDeliVO" property="modi_usrid"/>'  ><input name="modi_tms" id="modi_tms" value="<wrt:write name="woPickDeliVO" property="modi_tms" formatType="DATE" fromFormat="MMddyyyyHHmmss" format="MM-dd-yyyy HH:mm:ss"/>" type="text" class="search_form" readOnly dataformat="excepthan" style="ime-mode:disabled;width:130px;"  maxlength="10" class="search_form" tabindex="-1">
									</td>
			                    </tr>

							</tbody>
					</table>	
									
				<div class="wrap_result_tab">
					<ul id="ulTab" class="opus_design_tab">
			            <li id=Tab01 class="nowTab">
			            	<a href="#" style="cursor:hand;" onClick="javascript:goTabSelect('01');">
			            		<span><bean:message key="Remark"/></span>
			            	</a>
			            </li>
			            <li id=Tab02>
			            	<a href="#" style="cursor:hand;" onClick="javascript:goTabSelect('02');">
			            		<span><bean:message key="Trucking"/></span>
			            	</a>
			            </li>
			            <li id=Tab03>
			            	<a href="#" style="cursor:hand;" onClick="javascript:goTabSelect('03');">
			            		<span><bean:message key="Customs"/></span>
			            	</a>
			            </li>
			            <li id=Tab04>
			            	<a href="#" style="cursor:hand;" onClick="javascript:goTabSelect('04');">
			            		<span><bean:message key="Warehouse_Loading"/></span>
			            	</a>
			            </li>

			        </ul>				
				</div>
				
				
				
				<div id="tabLayer" name="tabLayer" style="display:inline">
					<textarea tabindex="<%=tabindex++%>" name="rmk" maxlength="1000" class="search_form"  dataformat="multiLanguage" style="<%=MULTI_IMEMODE%>width:360px;height:80px;text-transform:none; " onChange="lengthChk(this);"><logic:notEmpty name="woPickDeliVO" property="wo_no"><bean:write name="woPickDeliVO" property="rmk"/></logic:notEmpty></textarea>
				</div>
				<div id="tabLayer" name="tabLayer" style="display:none">
					<textarea tabindex="<%=tabindex++%>"" name="wh_instr_txt" maxlength="1000" class="search_form"  dataformat="multiLanguage" style="<%=MULTI_IMEMODE%>width:360px;height:80px;text-transform:none;" onChange="lengthChk(this);"><logic:notEmpty name="woPickDeliVO" property="wo_no"><bean:write name="woPickDeliVO" property="wh_instr_txt"/></logic:notEmpty></textarea>
				</div>
				<div id="tabLayer" name="tabLayer" style="display:none">
					<textarea tabindex="<%=tabindex++%>" name="cstms_instr_txt" maxlength="1000" class="search_form" dataformat="multiLanguage" style="<%=MULTI_IMEMODE%>width:360px;height:80px;text-transform:none;" onChange="lengthChk(this);"><logic:notEmpty name="woPickDeliVO" property="wo_no"><bean:write name="woPickDeliVO" property="cstms_instr_txt"/></logic:notEmpty></textarea>
				</div>				
				<div id="tabLayer" name="tabLayer" style="display:none">
					<textarea tabindex="<%=tabindex++%>" name="wh_lodg_instr_txt" maxlength="1000" class="search_form" dataformat="multiLanguage" style="<%=MULTI_IMEMODE%>width:360px;height:80px;text-transform:none;" onChange="lengthChk(this);"><logic:notEmpty name="woPickDeliVO" property="wo_no"><bean:write name="woPickDeliVO" property="wh_lodg_instr_txt"/></logic:notEmpty></textarea>
				</div>



			</div>
							
			
		</div>
	</div>
					
	
	
	<%-- 
	
	<div class="wrap_result">
		<div class="layout_wrap">
			<div class="layout_vertical_3 pad_left_8" style="width:550px;float:left!important">
				<div class="opus_design_inquiry" style="width:100%">
				<table>
					<colgroup>
						<col width="120">
						<col width="145">
						<col width="90">
						<col width="*">
					</colgroup>
					<tbody>
						<tr>
							<th><bean:message key="Work_Order_No"/></th>
							<td><input tabindex="-1" name="wo_no" type="text"  maxlength="20" class="search_form-disable" onblur="strToUpper(this);" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:135px" readOnly value='<bean:write name="woPickDeliVO" property="wo_no"/>' ></td>
							<th><bean:message key="WO_Kind"/></th>
							<td><!-- 
							 --><bean:define id="wotypeList" name="valMap" property="wotypeList"/><!-- 
							 --><html:select tabindex="3" name="woPickDeliVO" property="wo_tp_cd" styleClass="search_form" style="width:125px;"><!-- 
							 -->     <html:options collection="wotypeList" property="cd_val" labelProperty="cd_nm"/><!-- 
							 --></html:select><!-- 
							 --></td>
						</tr>
					</tbody>
				</table>
				<div id="org_route" style="display:block;" class="mar_top_8">
					<table>
						<colgroup>
							<col width="120">
							<col width="*">
						</colgroup>
						<tbody>
                           <tr>
                               <th>
                               <logic:equal name="air_sea_clss_cd" value="S">
	                               <logic:equal name="bnd_clss_cd" value="O">
	                                   <bean:message key="Empty_Pickup"/>
	                               </logic:equal>                               
	                               <logic:notEqual name="bnd_clss_cd" value="O">
	                                   <bean:message key="Pickup"/>
	                               </logic:notEqual>
                               </logic:equal>
                               <logic:equal name="air_sea_clss_cd" value="A">
                              	 <bean:message key="Pickup"/>
                               </logic:equal>
                               </th>
                               <td><!-- 
                                --><input tabindex="6" type="text"   name="pickup_trdp_cd" maxlength="20" value='<bean:write name="woPickDeliVO" property="pickup_trdp_cd"/>' class="search_form" dataformat="multiLanguage" style="<%=MULTI_IMEMODE%>text-transform:uppercase;width:80px;"  onKeyDown="codeNameAction('partner_pickup',this, 'onKeyDown')" onBlur="strToUpper(this);codeNameAction('partner_pickup',this, 'onBlur')"><!-- 
                                --><button type="button" class="input_seach_btn" tabindex="-1" id="pic" onclick="doWork('PARTNER_POPLIST', this)"></button><!-- 
                                --><input tabindex="7" type="text"  maxlength="50"  name="pickup_trdp_nm" class="search_form" onBlur="strToUpper(this);" dataformat="multiLanguage" style="<%=MULTI_IMEMODE%>text-transform:uppercase;width:278px;" value='<bean:write name="woPickDeliVO" property="pickup_trdp_nm"/>' id="pic" onKeyPress="if(event.keyCode==13){doWork('PARTNER_POPLIST_NAME', this);}"><!-- 
                                --></td>
                           </tr>
                           <tr>
                               <th><bean:message key="Address"/></th>
                               <td><textarea  tabindex="8" name="pickup_trdp_addr" class="search_form" dataformat="multiLanguage" style="<%=MULTI_IMEMODE%>width:391px;height:45px" maxlength="400" onBlur="strToUpper(this);checkTxtAreaLn(this, 62, 6, this.value)" ><bean:write name="woPickDeliVO" property="pickup_trdp_addr"/></textarea></td>
                           </tr>
                        </tbody>
					</table>
                        <table>
                        	<colgroup>
								<col width="120">
								<col width="87">
								<col width="95">
								<col width="*">
							</colgroup>
							<tbody>
	                            <tr>
	                                <th><bean:message key="Contact_Person"/></th>
	                                <td><input tabindex="9" name="pickup_pic" maxlength="50" type="text" class="search_form" onBlur="strToUpper(this);" dataformat="multiLanguage"  style="<%=MULTI_IMEMODE%>text-transform:uppercase;width:80px;" value='<bean:write name="woPickDeliVO" property="pickup_pic"/>'></td>
	                                <th><bean:message key="Tel_Fax"/></th>
	                                <td><input tabindex="10" name="pickup_phn" maxlength="30" type="text" class="search_form"  dataformat="excepthan" style="ime-mode:disabled;width:102px;" value='<bean:write name="woPickDeliVO" property="pickup_phn"/>'><!-- 
	                                 --><input tabindex="11" name="pickup_fax" maxlength="30" type="text" class="search_form"  dataformat="excepthan" style="ime-mode:disabled;width:102px;" value='<bean:write name="woPickDeliVO" property="pickup_fax"/>'><!-- 
	                                 --></td>
	                            </tr>
	                             <tr>
	                               <th><bean:message key="Reference_No"/></th>
	                               <td><input tabindex="12" name="pickup_ref_no" value='<bean:write name="woPickDeliVO" property="pickup_ref_no"/>' maxlength="40" type="text" onBlur="strToUpper(this);" class="search_form" dataformat="multiLanguage" style="ime-mode:auto;text-transform:uppercase;width:80px;"'></td>
	                               <th><bean:message key="Pickup_Time"/></th>
								<td><!-- 
								 --><input tabindex="13" type="text" name="pickup_dt" value='<wrt:write name="woPickDeliVO" property="pickup_dt" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy"/>'  maxlength="10" onkeyPress="onlyNumberCheck();mkDateFormatType(this, event, false,1)" onKeyUp="mkDateFormatType(this, event, false,1);" onBlur="mkDateFormatType(this, event, true,1);dateRangeValid(this, 'Pickup Date');" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:78px;"><!-- 
								 --><button type="button" class="calendar ir" id="pickup_dt_cal" onclick="doDisplay('DATE1', frm1);"></button><!-- 
								 --><input tabindex="14" type="text" name="pickup_tm" value='<wrt:write name="woPickDeliVO" property="pickup_tm" formatType="DATE" fromFormat="HHmm" format="HH:mm"/>' maxlength="5" class="search_form"  dataformat="excepthan" style="ime-mode:disabled;width:38px;" onchange="timeCheck(this);" onkeypress="onlyNumberCheck();"> ~ <!-- 
								 --><input tabindex="15" type="text" name="pickup_to_tm" value='<wrt:write name="woPickDeliVO" property="pickup_to_tm" formatType="DATE" fromFormat="HHmm" format="HH:mm"/>' maxlength="5" class="search_form"  dataformat="excepthan" style="ime-mode:disabled;width:38px;" onchange="timeCheck(this);" onkeypress="onlyNumberCheck();"><!--
								 --></td>
	                             </tr>
	                          </tbody>
                         </table>
				</div>
				<div id="des_route" style="display:block;" class="mar_top_8">
                      <table>
                      	<colgroup>
							<col width="120">
							<col width="*">
						</colgroup>
						<tbody>
                          <tr>
                              <th>
                               <logic:equal name="air_sea_clss_cd" value="S">
	                               <logic:equal name="bnd_clss_cd" value="O">
	                                   <bean:message key="Freight_Pickup"/>
	                               </logic:equal>                               
	                               <logic:notEqual name="bnd_clss_cd" value="O">
	                                   <bean:message key="Delivery"/>
	                               </logic:notEqual>
                               </logic:equal>
                               <logic:equal name="air_sea_clss_cd" value="A">
                              	 <bean:message key="Delivery"/>
                               </logic:equal>                               
                               </th>
                              <td><!-- 
                               --><input tabindex="16" type="text"   name="delivery_trdp_cd" maxlength="20" value='<bean:write name="woPickDeliVO" property="delivery_trdp_cd"/>' class="search_form" dataformat="multiLanguage" style="<%=MULTI_IMEMODE%>text-transform:uppercase;width:80px;"  onKeyDown="codeNameAction('partner_delivery',this, 'onKeyDown')" onBlur="strToUpper(this);codeNameAction('partner_delivery',this, 'onBlur')"><!-- 
                               --><button type="button" class="input_seach_btn" tabindex="-1" id="del" onclick="doWork('PARTNER_POPLIST', this)"></button><!-- 
                               --><input tabindex="17" type="text"   name="delivery_trdp_nm" maxlength="50" class="search_form" dataformat="multiLanguage" style="<%=MULTI_IMEMODE%>text-transform:uppercase;width:278px;" onBlur="strToUpper(this);" value='<bean:write name="woPickDeliVO" property="delivery_trdp_nm"/>' id="del" onKeyPress="if(event.keyCode==13){doWork('PARTNER_POPLIST_NAME', this);}"><!-- 
                               --></td>
                          </tr>
                          <tr>
                              <th><bean:message key="Address"/></th>                              <td><textarea tabindex="18" name="delivery_trdp_addr" maxlength="400" class="search_form" onBlur="strToUpper(this);checkTxtAreaLn(this, 62, 6, this.value)" dataformat="multiLanguage" style="<%=MULTI_IMEMODE%>width:391px;height:45px"><bean:write name="woPickDeliVO" property="delivery_trdp_addr"/></textarea></td>
                          </tr>
                         </tbody>
                      </table>
                      <table>
                      	  <colgroup>
								<col width="120">
								<col width="87">
								<col width="95">
								<col width="*">
							</colgroup>
							<tbody>
                          <tr>
                              <th><bean:message key="Contact_Person"/></th>
                              <td><input tabindex="19" name="delivery_pic" maxlength="50" type="text" class="search_form" onBlur="strToUpper(this);" dataformat="multiLanguage" style="<%=MULTI_IMEMODE%>text-transform:uppercase;width:80px;" value='<bean:write name="woPickDeliVO" property="delivery_pic"/>'></td>
                              <th><bean:message key="Tel_Fax"/></th>
                              <td><!-- 
                               --><input tabindex="20" name="delivery_phn" maxlength="30" type="text" class="search_form"  dataformat="excepthan" style="ime-mode:disabled;width:102px;" value='<bean:write name="woPickDeliVO" property="delivery_phn"/>'><!-- 
                               --><input tabindex="21" name="delivery_fax" maxlength="30" type="text" class="search_form"  dataformat="excepthan" style="ime-mode:disabled;width:102px;" value='<bean:write name="woPickDeliVO" property="delivery_fax"/>'><!-- 
                               --></td>
                          </tr>
                          <tr>
                              <th><bean:message key="Reference_No"/></th>
                              <td><input tabindex="22" name="delivery_ref_no"  value='<bean:write name="woPickDeliVO" property="delivery_ref_no"/>' maxlength="40" type="text" class="search_form" onBlur="strToUpper(this);" dataformat="multiLanguage" style="ime-mode:auto; text-transform:uppercase;width:80px;"></td>
                              <th><bean:message key="Delevery_Time"/></th>
							  <td><!-- 
							   --><input tabindex="23" type="text" name="delivery_dt" value='<wrt:write name="woPickDeliVO" property="delivery_dt" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy"/>'  maxlength="10" onkeyPress="onlyNumberCheck();mkDateFormatType(this, event, false,1);"  onKeyUp="mkDateFormatType(this, event, false,1)" onBlur="mkDateFormatType(this, event, true,1);dateRangeValid(this, 'Delivery Date');" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:78px;"><!-- 
							   --><button type="button" class="calendar ir" id="delivery_dt_cal" onclick="doDisplay('DATE2', frm1);"></button><!-- 
							   --><input tabindex="24" type="text" name="delivery_tm"  value='<wrt:write name="woPickDeliVO" property="delivery_tm" formatType="DATE" fromFormat="HHmm" format="HH:mm"/>' maxlength="5" class="search_form"  dataformat="excepthan" style="ime-mode:disabled;width:38px;" onchange="timeCheck(this);" onkeypress="onlyNumberCheck();"> ~ <!-- 
								 --><input tabindex="25" type="text" name="delivery_to_tm" value='<wrt:write name="woPickDeliVO" property="delivery_to_tm" formatType="DATE" fromFormat="HHmm" format="HH:mm"/>' maxlength="5" class="search_form"  dataformat="excepthan" style="ime-mode:disabled;width:38px;" onchange="timeCheck(this);" onkeypress="onlyNumberCheck();"><!--
							   --></td>
                          </tr>
                          </tbody>
                      </table>
                     <table class="mar_top_8">
                     	<colgroup>
							<col width="120">
							<col width="*">
						</colgroup>
						<tbody>
							<tr>
								<th>
                               <logic:equal name="air_sea_clss_cd" value="S">
	                               <logic:equal name="bnd_clss_cd" value="O">
	                                   <bean:message key="Loaded_Return"/>
	                               </logic:equal>                               
	                               <logic:notEqual name="bnd_clss_cd" value="O">
	                                   <bean:message key="Return"/>
	                               </logic:notEqual>
                               </logic:equal>
                               <logic:equal name="air_sea_clss_cd" value="A">
                              	 <bean:message key="Return"/>
                               </logic:equal>                                    
								</th>
	                            <td><!-- 
	                             --><input tabindex="26" type="text" name="return_trdp_cd" maxlength="20" class="search_form" dataformat="multiLanguage" style="<%=MULTI_IMEMODE%>text-transform:uppercase;width:80px;" value='<bean:write name="woPickDeliVO" property="return_trdp_cd"/>' onKeyDown="codeNameAction('partner_trsp',this, 'onKeyDown')" onBlur="strToUpper(this);codeNameAction('partner_trsp',this, 'onBlur')"><!-- 
	                             --><button type="button" class="input_seach_btn" tabindex="-1" id="trn" onclick="doWork('PARTNER_POPLIST', this)"></button><!-- 
	                             --><input tabindex="27" type="text" name="return_trdp_nm" maxlength="50" value='<bean:write name="woPickDeliVO" property="return_trdp_nm"/>' class="search_form" onBlur="strToUpper(this);" dataformat="multiLanguage" style="<%=MULTI_IMEMODE%>text-transform:uppercase;width:278px;" id="trn" onKeyPress="if(event.keyCode==13){doWork('PARTNER_POPLIST_NAME', this);}"><!-- 
	                             --></td>
	                        </tr>
	                        <tr>
	                            <th><bean:message key="Address"/></td>
	                            <td><textarea tabindex="28" name="return_trdp_addr" maxlength ="400" class="search_form" dataformat="multiLanguage" style="<%=MULTI_IMEMODE%>width:391px;height:45px"onBlur="strToUpper(this);checkTxtAreaLn(this, 62, 6, this.value)"><bean:write name="woPickDeliVO" property="return_trdp_addr"/></textarea></td>
	                        </tr>
	                    </tbody>
					 </table>
                    <table>
                     	<colgroup>
							<col width="120">
							<col width="87">
							<col width="95">
							<col width="*">
						</colgroup>
						<tbody>
							<tr>
								<th><bean:message key="Contact_Person"/></th>
	                            <td><input tabindex="29" name="return_pic" maxlength="50" type="text" class="search_form" onBlur="strToUpper(this);" dataformat="multiLanguage" style="<%=MULTI_IMEMODE%>text-transform:uppercase;width:80px;" value='<bean:write name="woPickDeliVO" property="return_pic"/>'></td>
	                            <th><bean:message key="Tel_Fax"/></th>
	                            <td><!-- 
	                             --><input tabindex="30" name="return_phn" maxlength="30" type="text" class="search_form"  dataformat="excepthan" style="ime-mode:disabled;width:102px;" value='<bean:write name="woPickDeliVO" property="return_phn"/>'><!-- 
	                             --><input tabindex="31" name="return_fax" maxlength="30" type="text" class="search_form"  dataformat="excepthan" style="ime-mode:disabled;width:102px;" value='<bean:write name="woPickDeliVO" property="return_fax"/>'><!-- 
	                             --></td>
	                             
	                         </tr>
	                         <tr>
	                             <th><bean:message key="Reference_No"/></th>
	                             <td><input tabindex="32" name="return_ref_no"  value='<bean:write name="woPickDeliVO" property="return_ref_no"/>' onBlur="strToUpper(this);" maxlength="20" type="text" class="search_form" dataformat="multiLanguage" style="ime-mode:auto; text-transform:uppercase;width:80px;"'></td>
	                             <th><bean:message key="Delevery_Time"/></th>
								 <td><!-- 
								  --><input tabindex="33" type="text" name="return_dt" value='<wrt:write name="woPickDeliVO" property="return_dt" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy"/>'  maxlength="10" onkeyPress="onlyNumberCheck();mkDateFormatType(this, event, false,1);"  onKeyUp="mkDateFormatType(this, event, false,1)" onBlur="mkDateFormatType(this, event, true,1);dateRangeValid(this, 'Delivery Date');" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:78px;"><!-- 
								  --><button type="button" class="calendar ir" id="return_dt_cal" onclick="doDisplay('DATE3', frm1);"></button><!-- 
								  --><input tabindex="34" type="text" name="return_tm"  value='<wrt:write name="woPickDeliVO" property="return_tm" formatType="DATE" fromFormat="HHmm" format="HH:mm"/>' maxlength="5" class="search_form"  dataformat="multiLanguage" style="ime-mode:disabled;width:38px;" onchange="timeCheck(this);" onkeypress="onlyNumberCheck();"> ~ <!-- 
								 --><input tabindex="35" type="text" name="return_to_tm" value='<wrt:write name="woPickDeliVO" property="return_to_tm" formatType="DATE" fromFormat="HHmm" format="HH:mm"/>' maxlength="5" class="search_form"  dataformat="excepthan" style="ime-mode:disabled;width:38px;" onchange="timeCheck(this);" onkeypress="onlyNumberCheck();"><!--
								  --></td>
	                         </tr>
	                      </tbody>
                     </table>
                 </div>
			</div>
<!-- 			 <div class="opus_design_grid" id="mainTable" style="width:510px;">
					<script type="text/javascript">comSheetObject('sheet1');</script>		
				</div>	
 -->			</div>
			<div class="layout_vertical_3 pad_left_8" style="width:500px">
				<div class="opus_design_inquiry" style="width:100%">
				<table>
					<colgroup>
						<col width="120">
						<col width="145">
						<col width="90">
						<col width="*">
					</colgroup>
					<tbody>
					<tr>
						<logic:equal name="biz_clss_cd" value="H">
							<th><bean:message key="BL_No"/></th>
							<td><!-- 
							 --><input  tabindex="36" required type="text" name="bl_no" maxlength="40" value='<bean:write name="woPickDeliVO" property="bl_no"/>' class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:120px" onBlur="strToUpper(this);frm1.intg_bl_seq.value='';doWork('HBLSMRY');"><!-- 
							 --><button type="button" class="input_seach_btn" tabindex="-1" onclick="doWork('HBL_POPLIST')"></button><!-- 
							 --></td>
							 <td></td>
							 <td></td>
						</logic:equal>
						<logic:equal name="biz_clss_cd" value="M">
							<th><bean:message key="BL_No"/></th>
							<td><!-- 
							 --><input tabindex="36" required type="text" name="mbl_no" maxlength="40" value='<bean:write name="woPickDeliVO" property="bl_no"/>' class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:125px" onBlur="strToUpper(this);frm1.intg_bl_seq.value='';doWork('HBLSMRY');"><!-- 
							 --><button type="button" class="input_seach_btn" tabindex="-1" onclick="doWork('MBL_POPLIST')"></button><!-- 
							 --></td>
							<th><bean:message key="Ref_No"/></th>
							<td><!-- 
							 --><input  tabindex="37" required type="text" name="ref_no" maxlength="40" value='<bean:write name="woPickDeliVO" property="bill_to_ref_no"/>' class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:120px" onBlur="strToUpper(this);frm1.intg_bl_seq.value='';doWork('HBLSMRY');"><!-- 
							 --><button type="button" class="input_seach_btn" tabindex="-1" onclick="doWork('REF_POPLIST')"></button><!-- 
							 --></td>
							 <td></td>
						</logic:equal>
						<logic:equal name="biz_clss_cd" value="">
							<th><bean:message key="Other_Reference_No"/></th>
							<td><input  tabindex="37" required type="text" name="oth_ref_no" id="oth_ref_no" maxlength="40" value='<bean:write name="woPickDeliVO" property="bl_no"/>' onblur="strToUpper(this);" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:120px" onChange="frm1.intg_bl_seq.value='';doWork('HBLSMRY');"></td>
							<td><button type="button" class="btn_etc" onclick="doWork('HBLSMRY');"><bean:message key="Search"/></button></td>
							<td></td>
						</logic:equal>
						<logic:equal name="biz_clss_cd" value="CU" >
							<th><bean:message key="Booking_No"/></th>
							<td><!-- 
							 --><input  tabindex="36" required type="text" name="bkg_no" id="bkg_no" maxlength="40" value='<bean:write name="woPickDeliVO" property="bkg_no"/>' onblur="strToUpper(this);" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:120px" onChange="doWork('HBLSMRY');"><!-- 
							 --><button type="button" class="input_seach_btn" tabindex="-1" onClick="doWork('BKNO_DO_POPLIST_BLANK')"></button><!-- 
							 --></td>
							 <td></td>
							 <td></td>
						</logic:equal>
						<logic:equal name="biz_clss_cd" value="CA" >
							<th><bean:message key="Booking_No"/></th>
							<td><!-- 
							 --><input  tabindex="36" required type="text" name="bkg_no" id="bkg_no" maxlength="40" value='<bean:write name="woPickDeliVO" property="bkg_no"/>' onblur="strToUpper(this);" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:120px" onChange="doWork('HBLSMRY');"><!-- 
							 --><button type="button" class="input_seach_btn" tabindex="-1" onClick="doWork('BKNO_DO_POPLIST_BLANK')"></button><!-- 
							 --></td>
							 <td></td>
							 <td></td>
						</logic:equal>
						<td colspan="5" style="display: none;">
							 <div class="opus_design_grid" style="display: none;">
								<script type="text/javascript">comSheetObject('sheet2');</script>		
							 </div>	
						</td>
					</tr>	
					</tbody>
				</table>
                  <table class="mar_top_8">
                  	<colgroup>
						<col width="120">
						<col width="*">
					</colgroup>
					<tbody>
                     <tr>
                        <th><bean:message key="Bill_To"/></th>
                        <td><!-- 
                         --><input tabindex="38" required type="text"   maxlength="20" name="bill_to_trdp_cd" value='<bean:write name="woPickDeliVO" property="bill_to_trdp_cd"/>' class="search_form" dataformat="multiLanguage" style="<%=MULTI_IMEMODE%>text-transform:uppercase;width:75px;"  onKeyDown="codeNameAction('partner_bill',this, 'onKeyDown')" onBlur="strToUpper(this);codeNameAction('partner_bill',this, 'onBlur')"><!-- 
                         --><button type="button" class="input_seach_btn" tabindex="-1" id="bil" onclick="doWork('PARTNER_POPLIST',this)"></button><!-- 
                         --><input tabindex="39" required type="text"   maxlength="50"  name="bill_to_trdp_nm" class="search_form" dataformat="multiLanguage" style="<%=MULTI_IMEMODE%>text-transform:uppercase;width:238px;" onBlur="strToUpper(this);" value='<bean:write name="woPickDeliVO" property="bill_to_trdp_nm"/>' id="bil" onKeyPress="if(event.keyCode==13){doWork('PARTNER_POPLIST_NAME', this);}"><!-- 
                         --></td>
                    </tr>
                    <tr>
                        <th><bean:message key="Address"/></th>
                        <td><textarea tabindex="40" required name="bill_to_trdp_addr" maxlength="400" class="search_form" dataformat="multiLanguage" style="<%=MULTI_IMEMODE%>width:346px;height:45px" onBlur="strToUpper(this);checkTxtAreaLn(this, 62, 6, this.value)"><bean:write name="woPickDeliVO" property="bill_to_trdp_addr"/></textarea></td>
                    </tr>
                    </tbody>
				</table>
				<table>
					<colgroup>
						<col width="120">
						<col width="87">
						<col width="95">
						<col width="*">
					</colgroup>
					<tbody>
                     <tr>
                         <th><bean:message key="Contact_Person"/></th>
                         <td><input tabindex="41" name="bill_to_pic" maxlength="50" type="text" class="search_form" onBlur="strToUpper(this);" dataformat="multiLanguage" style="<%=MULTI_IMEMODE%>text-transform:uppercase;width:80px;" value='<bean:write name="woPickDeliVO" property="bill_to_pic"/>'></td>
                         <th><bean:message key="Tel_Fax"/></th>
                         <td><!-- 
                          --><input  tabindex="42" name="bill_to_phn" maxlength="30" type="text" class="search_form"  dataformat="excepthan" style="ime-mode:disabled;width:80px;" value='<bean:write name="woPickDeliVO" property="bill_to_phn"/>'><!-- 
                          --><input tabindex="43" name="bill_to_fax" maxlength="30" type="text" class="search_form"  dataformat="excepthan" style="ime-mode:disabled;width:81px;" value='<bean:write name="woPickDeliVO" property="bill_to_fax"/>'><!-- 
                          --></td>
                     </tr>
                     <tr>
                         <th><bean:message key="Reference_No"/></th>
                         <td colspan="3"><input tabindex="44" name="bill_to_ref_no" value='<bean:write name="woPickDeliVO" property="bill_to_ref_no"/>' maxlength="20" type="text" class="search_form" onBlur="strToUpper(this);" dataformat="multiLanguage" style="ime-mode:auto; text-transform:uppercase;width:80px;"'></td>
                     </tr>
                 </table>
				<table class="mar_top_8">
					<colgroup>
						<col width="120">
						<col width="*">
					</colgroup>
					<tbody>
                    <tr>
                        <th><bean:message key="Trucker"/></th>
                        <td><!-- 
                         --><input type="text"  tabindex="45"  name="trucker_trdp_cd" maxlength="20" value='<bean:write name="woPickDeliVO" property="trucker_trdp_cd"/>' class="search_form" dataformat="multiLanguage" style="<%=MULTI_IMEMODE%>text-transform:uppercase;width:80px;"  onKeyDown="codeNameAction('partner_trucker',this, 'onKeyDown')" onBlur="strToUpper(this);codeNameAction('partner_trucker',this, 'onBlur')"><!-- 
                         --><button type="button" class="input_seach_btn" tabindex="-1" id="trk" onclick="doWork('PARTNER_POPLIST', this)"></button><!-- 
                         --><input type="text" tabindex="46"  maxlength="50"  name="trucker_trdp_nm" class="search_form" onBlur="strToUpper(this);" dataformat="multiLanguage" style="<%=MULTI_IMEMODE%>text-transform:uppercase;width:234px;" value='<bean:write name="woPickDeliVO" property="trucker_trdp_nm"/>' id="trk" onKeyPress="if(event.keyCode==13){doWork('PARTNER_POPLIST_NAME', this);}"><!-- 
                         --></td>
                      </tr>
                      <tr>
                          <th><bean:message key="Address"/></th>
                          <td><textarea tabindex="47" name="trucker_trdp_addr" class="search_form" dataformat="multiLanguage" style="<%=MULTI_IMEMODE%>width:347px;height:45px" onBlur="strToUpper(this);checkTxtAreaLn(this, 62, 6, this.value)" maxlength="400" ><bean:write name="woPickDeliVO" property="trucker_trdp_addr"/></textarea></td>
                      </tr>
                      </tbody>
				</table>
                <table>
                	<colgroup>
						<col width="120">
						<col width="87">
						<col width="95">
						<col width="*">
					</colgroup>
					<tbody>
	                    <tr>
	                        <th><bean:message key="Contact_Person"/></th>
	                        <!-- #34862 - [BINEX]Work Order - Trucker 정보 Link -->
	                        <td><input tabindex="48" name="trucker_pic" maxlength="50" type="text" class="search_form" dataformat="multiLanguage" style="<%=MULTI_IMEMODE%>text-transform:uppercase;width:80px;" value='<bean:write name="woPickDeliVO" property="trucker_pic"/>'></td>
	                        <th><bean:message key="Tel_Fax"/></th>
	                        <td><!-- 
	                         --><input tabindex="49" name="trucker_phn" maxlength="30" type="text" class="search_form"  dataformat="excepthan" style="ime-mode:disabled;width:80px;" value='<bean:write name="woPickDeliVO" property="trucker_phn"/>'><!-- 
	                         --><input tabindex="50" name="trucker_fax" maxlength="30" type="text" class="search_form"  dataformat="excepthan" style="ime-mode:disabled;width:81px;" value='<bean:write name="woPickDeliVO" property="trucker_fax"/>'><!-- 
	                         --></td>
	                    </tr>
	                 </tbody>
                </table>

<!-- 추가 시작 부분 2017-04-11-->
	

				<table class="mar_top_8">
					<colgroup>
						<col width="120">
						<col width="*">
					</colgroup>
					<tbody>
                    <tr>
                        <th><bean:message key="C_Broker"/></th>
                        <td><!-- 
                         --><input type="text"  tabindex="51"  name="cstms_cust_cd" maxlength="20" value='<bean:write name="woPickDeliVO" property="cstms_cust_cd"/>' class="search_form" dataformat="multiLanguage" style="<%=MULTI_IMEMODE%>text-transform:uppercase;width:80px;"  onKeyDown="codeNameAction('partner_cstms_cust',this, 'onKeyDown')" onBlur="strToUpper(this);codeNameAction('partner_cstms_cust',this, 'onBlur')"><!-- 
                         --><button type="button" class="input_seach_btn" tabindex="-1" id="cstms_cust" onclick="doWork('PARTNER_POPLIST', this)"></button><!-- 
                         --><input type="text" tabindex="52"  maxlength="50"  name="cstms_cust_nm" class="search_form" onBlur="strToUpper(this);" dataformat="multiLanguage" style="<%=MULTI_IMEMODE%>text-transform:uppercase;width:234px;" value='<bean:write name="woPickDeliVO" property="cstms_cust_nm"/>' id="cstms_cust_nm" onKeyPress="if(event.keyCode==13){doWork('PARTNER_POPLIST_NAME', this);}"><!-- 
                         --></td>
                      </tr>
                      </tbody>
				</table>
                <table>
                	<colgroup>
						<col width="120">
						<col width="87">
						<col width="95">
						<col width="*">
					</colgroup>
					<tbody>
	                    <tr>
	                        <th><bean:message key="Contact_Person"/></th>
	                        <td><input tabindex="53" name="cstms_cust_pic" maxlength="50" type="text" class="search_form" dataformat="multiLanguage" style="<%=MULTI_IMEMODE%>text-transform:uppercase;width:80px;" value='<bean:write name="woPickDeliVO" property="cstms_cust_pic"/>'></td>
	                        <th><bean:message key="Tel_Fax"/></th>
	                        <td><!-- 
	                         --><input tabindex="54" name="cstms_cust_phn" maxlength="30" type="text" class="search_form"  dataformat="excepthan" style="ime-mode:disabled;width:80px;" value='<bean:write name="woPickDeliVO" property="cstms_cust_phn"/>'><!-- 
	                         --><input tabindex="55" name="cstms_cust_fax" maxlength="30" type="text" class="search_form"  dataformat="excepthan" style="ime-mode:disabled;width:81px;" value='<bean:write name="woPickDeliVO" property="cstms_cust_fax"/>'><!-- 
	                         --></td>
	                    </tr>
	                 </tbody>
                </table>


				<table class="mar_top_8">
					<colgroup>
						<col width="120">
						<col width="87">
						<col width="95">
						<col width="*">
					</colgroup>
					<tbody>
                    <tr>
                        <th><bean:message key="Customs_Type"/></th>
                        <td><!-- 
							 --><bean:define id="cstmsTypeList" name="valMap" property="cstmsTypeList"/><!-- 
							 --><html:select tabindex="56" name="woPickDeliVO" property="cstms_tp_cd" styleClass="search_form" style="width:107px;"><!-- 
							 --><option value=""></option><!--	
							 --><html:options collection="cstmsTypeList" property="cd_val" labelProperty="cd_nm"/><!-- 
							 --></html:select><!-- 
							 -->
	                    </td>
	                    <td></td>
	                    <td></td>
	                    </tr>
	                    <tr>                        
                        <th><bean:message key="Cut_Off_Time"/></th>
					  	<td><!-- 
							   --><input tabindex="57" type="text" name="cut_off_dt" value='<wrt:write name="woPickDeliVO" property="cut_off_dt" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy"/>'  maxlength="10" onkeyPress="onlyNumberCheck();mkDateFormatType(this, event, false,1);"  onKeyUp="mkDateFormatType(this, event, false,1)" onBlur="mkDateFormatType(this, event, true,1);dateRangeValid(this, 'Cut-Off Time');" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:78px;"><!-- 
							   --><button type="button" class="calendar ir" id="cut_off_dt_cal" onclick="doDisplay('DATE4', frm1);"></button><!-- 
							   --><input tabindex="58" type="text" name="cut_off_tm"  value='<wrt:write name="woPickDeliVO" property="cut_off_tm" formatType="DATE" fromFormat="HHmm" format="HH:mm"/>' maxlength="5" class="search_form"  dataformat="excepthan" style="ime-mode:disabled;width:38px;" onchange="timeCheck(this);" onkeypress="onlyNumberCheck();"> ~ <!-- 
								 --><input tabindex="59" type="text" name="cut_off_to_tm" value='<wrt:write name="woPickDeliVO" property="cut_off_to_tm" formatType="DATE" fromFormat="HHmm" format="HH:mm"/>' maxlength="5" class="search_form"  dataformat="excepthan" style="ime-mode:disabled;width:38px;" onchange="timeCheck(this);" onkeypress="onlyNumberCheck();"><!--
							   -->
				        </td>
                      </tr>

                      </tbody>
				</table>

				<table class="mar_top_8">
					<colgroup>
						<col width="120">
						<col width="*">
					</colgroup>
					<tbody>
                      <tr>
                      	<th><bean:message key="Export_Ref_No"/></th>
                      	<td><input tabindex="60" name="exp_ref_no" maxlength="50" type="text" class="search_form" dataformat="multiLanguage" style="<%=MULTI_IMEMODE%>text-transform:uppercase;width:347px;" value='<bean:write name="woPickDeliVO" property="exp_ref_no"/>'></td>
                      </tr>

                      </tbody>
				</table>                      


				<table class="mar_top_8">
					<colgroup>
						<col width="120">
						<col width="87">
						<col width="95">
						<col width="*">
					</colgroup>
					<tbody>
                    <tr>
                        <th><bean:message key="Warehouse"/></th>
                        <td colspan="3"><!-- 
                         --><input type="text"  tabindex="61"  name="wh_cd" maxlength="20" value='<bean:write name="woPickDeliVO" property="wh_cd"/>' class="search_form" dataformat="multiLanguage" style="<%=MULTI_IMEMODE%>text-transform:uppercase;width:80px;"  onKeyDown="codeNameAction('partner_wh',this, 'onKeyDown')" onBlur="strToUpper(this);codeNameAction('partner_wh',this, 'onBlur')"><!-- 
                         --><button type="button" class="input_seach_btn" tabindex="-1" id="wh" onclick="doWork('PARTNER_POPLIST', this)"></button><!-- 
                         --><input type="text" tabindex="62"  maxlength="50"  name="wh_nm" class="search_form" onBlur="strToUpper(this);" dataformat="multiLanguage" style="<%=MULTI_IMEMODE%>text-transform:uppercase;width:234px;" value='<bean:write name="woPickDeliVO" property="wh_nm"/>' id="wh_nm" onKeyPress="if(event.keyCode==13){doWork('PARTNER_POPLIST_NAME', this);}"><!-- 
                         --></td>
                      </tr>
                      
                      </tbody>

	                    <tr>
	                        <th><bean:message key="Contact_Person"/></th>
	                        <td ><input tabindex="63" name="wh_pic" maxlength="50" type="text" class="search_form" dataformat="multiLanguage" style="<%=MULTI_IMEMODE%>text-transform:uppercase;width:80px;" value='<bean:write name="woPickDeliVO" property="wh_pic"/>'></td>
	                        <th><bean:message key="Tel_Fax"/></th>
	                        <td><!-- 
	                         --><input tabindex="64" name="wh_phn" maxlength="30" type="text" class="search_form"  dataformat="excepthan" style="ime-mode:disabled;width:80px;" value='<bean:write name="woPickDeliVO" property="wh_phn"/>'><!-- 
	                         --><input tabindex="65" name="wh_fax" maxlength="30" type="text" class="search_form"  dataformat="excepthan" style="ime-mode:disabled;width:80px;" value='<bean:write name="woPickDeliVO" property="wh_fax"/>'><!-- 
	                         --></td>
	                    </tr>
	                    <!--#2045 hsk  -->
	                     <tr>
                         	<th><bean:message key="Driver"/></th>
                         	<td><input tabindex="66" name="drv_nm" value='<bean:write name="woPickDeliVO" property="drv_nm"/>' maxlength="20" type="text" class="search_form" onBlur="strToUpper(this);" dataformat="multiLanguage" style="ime-mode:auto; text-transform:uppercase;width:80px;"'></td>
							<th style="font-size:10px;"><bean:message key="Tel"/>/<bean:message key="Truck_Plate_No"/></th>
	                         <td><!-- 
	                         --><input tabindex="64" name="drv_phn" maxlength="30" type="text" class="search_form"  dataformat="excepthan" style="ime-mode:disabled;width:80px;" value='<bean:write name="woPickDeliVO" property="drv_phn"/>'><!--
	                         --><input tabindex="66" name="trk_plat_no" value='<bean:write name="woPickDeliVO" property="trk_plat_no"/>' maxlength="20" type="text" class="search_form" onBlur="strToUpper(this);" dataformat="multiLanguage" style="ime-mode:auto; text-transform:uppercase;width:80px;"'><!--
	                         --></td>
                         </tr>	                    
	                    
	                     <tr>
                         	<th><bean:message key="Reference_No"/></th>
                         	<td><input tabindex="66" name="wh_ref_no" value='<bean:write name="woPickDeliVO" property="wh_ref_no"/>' maxlength="20" type="text" class="search_form" onBlur="strToUpper(this);" dataformat="multiLanguage" style="ime-mode:auto; text-transform:uppercase;width:80px;"'></td>
							<th></th>
                            <td></td>
                         </tr>
                         <tr>	
                         	<th><bean:message key="PO_Load_Time"/></th>
					  	    <td colspan="3"><!-- 
							   --><input tabindex="67" type="text" name="wh_dt" value='<wrt:write name="woPickDeliVO" property="wh_dt" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy"/>'  maxlength="10" onkeyPress="onlyNumberCheck();mkDateFormatType(this, event, false,1);"  onKeyUp="mkDateFormatType(this, event, false,1)" onBlur="mkDateFormatType(this, event, true,1);dateRangeValid(this, 'Load Time');" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:80px;"><!-- 
							   --><button type="button" class="calendar ir" id="wh_dt_cal" onclick="doDisplay('DATE5', frm1);"></button><!-- 
							   --><input tabindex="68" type="text" name="wh_tm"  value='<wrt:write name="woPickDeliVO" property="wh_tm" formatType="DATE" fromFormat="HHmm" format="HH:mm"/>' maxlength="5" class="search_form"  dataformat="excepthan" style="ime-mode:disabled;width:38px;" onchange="timeCheck(this);" onkeypress="onlyNumberCheck();"> ~ <!-- 
								 --><input tabindex="69" type="text" name="wh_to_tm" value='<wrt:write name="woPickDeliVO" property="wh_to_tm" formatType="DATE" fromFormat="HHmm" format="HH:mm"/>' maxlength="5" class="search_form"  dataformat="excepthan" style="ime-mode:disabled;width:38px;" onchange="timeCheck(this);" onkeypress="onlyNumberCheck();"><!--
							   -->
				            </td>

                     	</tr>
	                 </tbody>
                </table>

				<table class="mar_top_8">
					<colgroup>
						<col width="120">
						<col width="*">
					</colgroup>
					<tbody>
                    <tr>
                        <th><bean:message key="Customer"/></th>
                        <td><!-- 
                         --><input type="text"  tabindex="70"  name="cust_cd" maxlength="20" value='<bean:write name="woPickDeliVO" property="cust_cd"/>' class="search_form" dataformat="multiLanguage" style="<%=MULTI_IMEMODE%>text-transform:uppercase;width:80px;"  onKeyDown="codeNameAction('partner_cust',this, 'onKeyDown')" onBlur="strToUpper(this);codeNameAction('partner_cust',this, 'onBlur')"><!-- 
                         --><button type="button" class="input_seach_btn" tabindex="-1" id="cust" onclick="doWork('PARTNER_POPLIST', this)"></button><!-- 
                         --><input type="text" tabindex="71"  maxlength="50"  name="cust_nm" class="search_form" onBlur="strToUpper(this);" dataformat="multiLanguage" style="<%=MULTI_IMEMODE%>text-transform:uppercase;width:234px;" value='<bean:write name="woPickDeliVO" property="cust_nm"/>' id="cust_nm" onKeyPress="if(event.keyCode==13){doWork('PARTNER_POPLIST_NAME', this);}"><!-- 
                         --></td>
                      </tr>
                      <tr>
                        <th><bean:message key="Address"/></th>
                        <td><textarea tabindex="72"  name="cust_addr" maxlength="400" class="search_form" dataformat="multiLanguage" style="<%=MULTI_IMEMODE%>width:346px;height:45px" onBlur="strToUpper(this);checkTxtAreaLn(this, 62, 6, this.value)"><bean:write name="woPickDeliVO" property="cust_addr"/></textarea></td>
              	      </tr>
               	   </tbody>
				</table>
                <table>
                	<colgroup>
						<col width="120">
						<col width="87">
						<col width="95">
						<col width="*">
					</colgroup>
					<tbody>
	                    <tr>
	                        <th><bean:message key="Contact_Person"/></th>
	                        <!-- #34862 - [BINEX]Work Order - Trucker 정보 Link -->
	                        <td><input tabindex="73" name="cust_pic" maxlength="50" type="text" class="search_form" dataformat="multiLanguage" style="<%=MULTI_IMEMODE%>text-transform:uppercase;width:80px;" value='<bean:write name="woPickDeliVO" property="cust_pic"/>'></td>
	                        <th><bean:message key="Tel_Fax"/></th>
	                        <td><!-- 
	                         --><input tabindex="74" name="cust_phn" maxlength="30" type="text" class="search_form"  dataformat="excepthan" style="ime-mode:disabled;width:80px;" value='<bean:write name="woPickDeliVO" property="cust_phn"/>'><!-- 
	                         --><input tabindex="75" name="cust_fax" maxlength="30" type="text" class="search_form"  dataformat="excepthan" style="ime-mode:disabled;width:81px;" value='<bean:write name="woPickDeliVO" property="cust_fax"/>'><!-- 
	                         --></td>
	                    </tr>
	                 </tbody>
                </table>
</div>
</div>



			<div class="layout_vertical_3 pad_left_8">
				<div class="opus_design_inquiry" style="width:100%">
				
                <table>
                	<colgroup>
						<col width="120">
						<col width="231">
						<col width="70">
						<col width="*">
                	</colgroup>
				<tr>
                        <th> 
                           <logic:equal name="air_sea_clss_cd" value="S"> 
                           	<bean:message key="Liner"/> 
                           </logic:equal> 
                           <logic:equal name="air_sea_clss_cd" value=""> 
                           	<bean:message key="Liner"/> 
                           </logic:equal> 
                           <logic:equal name="air_sea_clss_cd" value="A"> 
                           	<bean:message key="Air_Line"/> 
                          	</logic:equal> 
                        </th>
                        <td> 
                        	<input tabindex="85" type="text" name="lnr_trdp_cd" maxlength="20"  value='<bean:write name="woPickDeliVO" property="lnr_trdp_cd"/>' class="search_form" onKeyDown="codeNameAction('partner_liner',this, 'onKeyDown')" onBlur="codeNameAction('partner_liner',this, 'onBlur');javascript:this.value=this.value.toUpperCase();" dataformat="excepthan" style="ime-mode:auto;text-transform:uppercase;width:50px;"><!-- 
                         --><button type="button" class="input_seach_btn" tabindex="-1" id="liner" onClick="doWork('PARTNER_POPLIST', this)" ></button><!-- 
                         --><input tabindex="86" type="text" name="lnr_trdp_nm"  maxlength="50" value='<bean:write name="woPickDeliVO" property="lnr_trdp_nm"/>' class="search_form" onblur="strToUpper(this)" class="search_form" dataformat="excepthan" style="width:140px;ime-mode:auto;text-transform:uppercase;" onKeyPress="if(event.keyCode==13){doWork('PARTNER_POPLIST_NAME', document.getElementById('liner'));}"><!-- 
                         -->
                         </td>
                       		<logic:equal name="air_sea_clss_cd" value="S">
	                            <th><bean:message key="Liner_Bkg_No"/></th>
	                            <td><input tabindex="87" type="text" name="lnr_bkg_no"  maxlength="20" value='<bean:write name="woPickDeliVO" property="lnr_bkg_no"/>' onblur="strToUpper(this)" class="search_form" dataformat="excepthan" style="ime-mode:auto;text-transform:uppercase;width:100px;"></td>
                            </logic:equal>
                            
	                         <logic:notEqual name="air_sea_clss_cd" value="S">
	                         	<td>
	                           	 	<input tabindex="88" type="hidden" name="lnr_bkg_no" value="" onblur="strToUpper(this)" dataformat="excepthan" style="ime-mode:disabledtext-transform:uppercase;width:100px;">
	                            </td>
	                         </logic:notEqual>
                       </tr>                	
                	<tr>
                        <th><bean:message key="VSL_VOY"/></th>
                        <td>
							<input tabindex="-1" type="text" name="trnk_vsl_nm" maxlength="5" value='<bean:write name="woPickDeliVO" property="trnk_vsl_nm"/>' class="search_form-disable" readOnly dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:80px;" onBlur="strToUpper(this);"><!-- 
                         --><input tabindex="-1" type="text" name="trnk_voy" value='<bean:write name="woPickDeliVO" property="trnk_voy"/>' class="search_form-disable" readOnly maxlength="50" dataformat="excepthan" style="ime-mode:disabled;width:140px;text-transform:uppercase;" onblur="strToUpper(this);">
                         </td>
                    </tr>
                    
                    
<!-- 추가 부분 끝 2017-04-11 -->                    
                    
                	<tr>
                        <th><bean:message key="POL"/></th>
                        <td>
							<input tabindex="-1" type="text" name="pol_cd" maxlength="5" value='<bean:write name="woPickDeliVO" property="pol_cd"/>' class="search_form-disable"  readOnly dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:80px;"  onBlur="strToUpper(this);"><!-- 
                         --><input tabindex="-1" type="text" name="pol_nm"  value='<bean:write name="woPickDeliVO" property="pol_nm"/>' class="search_form-disable" readOnly maxlength="50" dataformat="excepthan" style="ime-mode:disabled;width:140px;text-transform:uppercase;" onblur="strToUpper(this);">
                         </td>
                        <th><bean:message key="POD"/></th>
                        <td>
							<input tabindex="-1" type="text" name="pod_cd" maxlength="5" value='<bean:write name="woPickDeliVO" property="pod_cd"/>' class="search_form-disable" readOnly dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:75px;" onBlur="strToUpper(this);"><!-- 
                         --><input tabindex="-1" type="text" name="pod_nm" value='<bean:write name="woPickDeliVO" property="pod_nm"/>' class="search_form-disable" readOnly maxlength="50" dataformat="excepthan" style="ime-mode:disabled;width:140px;text-transform:uppercase;" onblur="strToUpper(this);">
                         </td>
                    </tr>
                    <tr>
                        <th><bean:message key="Commodity"/></th>
                        <td>
                        	<input tabindex="-1" type="text" name="cgo_itm_cmdt_cd" maxlength="13" value='<bean:write name="woPickDeliVO" property="cgo_itm_cmdt_cd"/>' class="search_form-disable" readOnly dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:80px;" onBlur="strToUpper(this);"><!-- 
                         --><input tabindex="-1" type="text" name="cgo_itm_cmdt_nm" value='<bean:write name="woPickDeliVO" property="cgo_itm_cmdt_nm"/>' class="search_form-disable" readOnly maxlength="100" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:140px;" onblur="strToUpper(this);">
						</td>
                        <th><bean:message key="Package"/></th>
                        <td>
                        	<input tabindex="77" type="text" name="cgo_pck_qty" maxlength="7" value="<wrt:write name="woPickDeliVO" property="cgo_pck_qty" formatType="MONEY" format="#,###"/>" onkeyPress="onlyNumberCheck();" onkeyup="numberCommaLen(this,7,0)" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:75px;text-align:right"><!-- 
                         --><bean:define id="pckList" name="valMap" property="pckCdList"/><!-- 
                         --><html:select tabindex="78" name="woPickDeliVO" property="cgo_pck_ut_cd" styleClass="search_form" style="width:140px;">
                             <option></option>
                             <html:options collection="pckList" property="pck_ut_cd" labelProperty="pck_nm"/>
                            </html:select>
                         </td>
                    </tr>
                   <tr>
						<th><bean:message key="GWeight"/></th>
						<logic:equal name="air_sea_clss_cd" value="A">
						<td><!-- 
						 --><input  tabindex="79"  required type="text" name="act_wgt_k" maxlength="10" value="<wrt:write name="woPickDeliVO" property="act_wgt_k" formatType="MONEY" format="#,##0.00"/>" onkeyPress="onlyNumberCheck('.');" onchange="numberCommaLen(this,8,2);chkComma(this,8,2);weightChange(this);" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:80px;text-align:right;"><!-- 
						 --><input tabindex="-1"  required type="text" name="grs_wgt_ut_cd" value="KG" style="width:21px;border:0;background-color:transparent;" readOnly tabindex="1"><!-- 
						 --><input tabindex="80"  required type="text" name="act_wgt_l" maxlength="10" value="<wrt:write name="woPickDeliVO" property="act_wgt_l" formatType="MONEY" format="#,##0.00"/>" onkeyPress="onlyNumberCheck('.');" onchange="numberCommaLen(this,8,2);chkComma(this,8,2);weightChange(this);" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:75px;text-align:right;"><!-- 
						 --><input tabindex="-1"  required type="text" name="grs_wgt_ut_cd1" value="LB" style="width:20px;border:0;background-color:transparent;" readOnly tabindex="2"><!-- 
						 --></td>
						</logic:equal> 
						<logic:notEqual name="air_sea_clss_cd" value="A">
						<td><!-- 
						 --><input  tabindex="79"   type="text" name="act_wgt_k" maxlength="10" value="<wrt:write name="woPickDeliVO" property="act_wgt_k" formatType="MONEY" format="#,##0.00"/>" onkeyPress="onlyNumberCheck('.');" onchange="numberCommaLen(this,8,2);chkComma(this,8,2);weightChange(this);" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:80px;text-align:right;"><!-- 
						 --><input tabindex="-1"   type="text" name="grs_wgt_ut_cd" value="KG" style="width:21px;border:0;background-color:transparent;" readOnly tabindex="1"><!-- 
						 --><input tabindex="80"   type="text" name="act_wgt_l" maxlength="10" value="<wrt:write name="woPickDeliVO" property="act_wgt_l" formatType="MONEY" format="#,##0.00"/>" onkeyPress="onlyNumberCheck('.');" onchange="numberCommaLen(this,8,2);chkComma(this,8,2);weightChange(this);" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:75px;text-align:right;"><!-- 
						 --><input tabindex="-1"   type="text" name="grs_wgt_ut_cd1" value="LB" style="width:20px;border:0;background-color:transparent;" readOnly tabindex="2"><!-- 
						 --></td>
						</logic:notEqual>
						<logic:equal name="air_sea_clss_cd" value="S">
							<th><bean:message key="Measurement"/></th>
						</logic:equal>
						<logic:equal name="air_sea_clss_cd" value="A">
							<th><bean:message key="Measurement"/></th>
						</logic:equal>
						<logic:equal name="air_sea_clss_cd" value="S">
							<td><!-- 
							 --><input tabindex="81"  type="text" name="cgo_meas_m" maxlength="11" value="<wrt:write name="woPickDeliVO" property="cgo_meas_m" formatType="MONEY" format="#,##0.000"/>" onkeyPress="onlyNumberCheck('.');" onchange="numberCommaLen(this,8,3);chkComma(this,8,3);cbmChange(this);" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:75px;text-align:right;"><!-- 
							 --><input tabindex="-1"  type="text" name="meas_ut_cd"  value="CBM" style="width:32px;border:0;background-color:transparent;" readOnly tabindex="5"><!-- 
							 --><input tabindex="82"  type="text" name="cgo_meas_f" maxlength="11" value="<wrt:write name="woPickDeliVO" property="cgo_meas_f" formatType="MONEY" format="#,##0.000"/>" onkeyPress="onlyNumberCheck('.');" onchange="numberCommaLen(this,8,3);chkComma(this,8,3);cbmChange(this);" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:75px;text-align:right;"><!-- 
							 --><input tabindex="-1"  type="text" name="meas_ut_cd1" value="CFT" style="width:30px;border:0;background-color:transparent;" readOnly tabindex="6"><!-- 
	                         --><button id="ashipper" type="button" class="btn_etc" onClick="updateWgt()"><bean:message key="Update"/></button></td>
	                         <td></td>
						</logic:equal>
						<logic:notEqual name="air_sea_clss_cd" value="S">
							<td><!-- 
							 --><input tabindex="83" type="text" name="cgo_meas_m" maxlength="11" value="<wrt:write name="woPickDeliVO" property="cgo_meas_m" formatType="MONEY" format="#,##0.000"/>" onkeyPress="onlyNumberCheck('.');" onchange="numberCommaLen(this,8,3);chkComma(this,8,3);cbmChange(this);" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:75px;text-align:right;"><!-- 
							 --><input tabindex="-1" type="text" name="meas_ut_cd"  value="CBM" style="width:32px;border:0;background-color:transparent;" readOnly tabindex="5"><!-- 
							 --><input tabindex="84" type="text" name="cgo_meas_f" maxlength="11" value="<wrt:write name="woPickDeliVO" property="cgo_meas_f" formatType="MONEY" format="#,##0.000"/>" onkeyPress="onlyNumberCheck('.');" onchange="numberCommaLen(this,8,3);chkComma(this,8,3);cbmChange(this);" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:75px;text-align:right;"><!-- 
							 --><input tabindex="-1" type="text" name="meas_ut_cd1" value="CFT" style="width:30px;border:0;background-color:transparent;" readOnly tabindex="6"><!-- 
							 --></td>
							 <td></td>
						</logic:notEqual>
					</tr>    
					 <tr>
                          	<td colspan="4"><b><label for="print_md_yn"><bean:message key="Print_The_BL_Mark_Descriptio"/></label></b>&nbsp;<input tabindex="89" name="prt_md_yn" id="prt_md_yn" type="checkbox" value='<bean:write name="woPickDeliVO" property="prt_md_yn"/>'></td>
                         </tr>
                		 <tr>
                             <th><bean:message key="Remark"/></th>
                             <td colspan="3"><textarea tabindex="90" name="rmk" maxlength="1000" class="search_form"  dataformat="multiLanguage" style="<%=MULTI_IMEMODE%>width:540px;height:80px;text-transform:none; " onChange="lengthChk(this);"><logic:notEmpty name="woPickDeliVO" property="wo_no"><bean:write name="woPickDeliVO" property="rmk"/></logic:notEmpty></textarea></td>
                         </tr>
                         
                         <tr>
                             <th><bean:message key="Trucking_Instruction"/></th>
                             <td colspan="3"><textarea tabindex="91" name="wh_instr_txt" maxlength="1000" class="search_form"  dataformat="multiLanguage" style="<%=MULTI_IMEMODE%>width:540px;height:80px;text-transform:none;" onChange="lengthChk(this);"><logic:notEmpty name="woPickDeliVO" property="wo_no"><bean:write name="woPickDeliVO" property="wh_instr_txt"/></logic:notEmpty></textarea></td>
                         </tr>
                         
                         <tr>
                             <th><bean:message key="Customs_Instruction"/></th>
                             <td colspan="3"><textarea tabindex="92" name="cstms_instr_txt" maxlength="1000" class="search_form" dataformat="multiLanguage" style="<%=MULTI_IMEMODE%>width:540px;height:80px;text-transform:none;" onChange="lengthChk(this);"><logic:notEmpty name="woPickDeliVO" property="wo_no"><bean:write name="woPickDeliVO" property="cstms_instr_txt"/></logic:notEmpty></textarea></td>
                         </tr>
                         <tr>
                             <th><bean:message key="Warehouse_Loading_Instruction"/></th>
                             <td colspan="3"><textarea tabindex="93" name="wh_lodg_instr_txt" maxlength="1000" class="search_form" dataformat="multiLanguage" style="<%=MULTI_IMEMODE%>width:540px;height:80px;text-transform:none;" onChange="lengthChk(this);"><logic:notEmpty name="woPickDeliVO" property="wo_no"><bean:write name="woPickDeliVO" property="wh_lodg_instr_txt"/></logic:notEmpty></textarea></td>
                         </tr>                         
                    </tbody>
                   </table>
               <table>
	               	<colgroup>
						<col width="120">
						<col width="231">
						<col width="95">
						<col width="*">
	               	</colgroup>
	               	<tbody>
 
					</tbody>
				</table>
				<table>
	               	<colgroup>
						<col width="120">
						<col width="231">
						<col width="95">
						<col width="*">
                	</colgroup>
	               	<tbody>	                         

                        </tbody>
                 </table>
			</div>
			</div>
		</div>
	</div>
</form> --%>

