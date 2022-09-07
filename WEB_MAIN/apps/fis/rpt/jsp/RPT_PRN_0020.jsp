<!-- 
//=========================================================
//*@FileName   : RPT_PRN_0020.jsp
//*@FileTitle  : RPT
//*@Change history:
//*@author     : Tuan.Chau
//*@version    : 2.0 - 10/06/2014
//*@since      : 10/06/2014
//=========================================================
 -->
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
    <%@include file="./../../../../syscommon/header/CLTHeader.jsp"%>
	<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css"/>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/apps/fis/rpt/RPT_PRN_0020.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/SEA_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/cookie.js?ver=<%=CLT_JS_VER%>"></script>
	<script src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/apps/fis/see/bmd/housebl/script/BL_CODE_UTIL.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript">
		//memo 를 핸들링 하는 부분
		function chkText(){
			/*
			if(document.frm1.bl_type[0].checked) {
				document.frm1.bl_memo.value = "";
				document.frm1.bl_memo.disabled = true;
				document.frm1.stamp_type.disabled = false;
			}else if(document.frm1.bl_type[1].checked){
				document.frm1.bl_memo.value = "";
				document.frm1.bl_memo.disabled = true;
				document.frm1.stamp_type.disabled = true;
			}else{
				document.frm1.bl_memo.disabled = false;
				document.frm1.stamp_type.disabled = false;
			}
			*/
			//#4192 [JAPT] B/L Print form, option popup modification.
			frm1.page_num.value=frm1.page_count.value;
			
			//#6612 [JAPT] e-Signature on HBL Requirements
			//#6714 [JAPT] REVENUE STAMP FUNCTION [ TARGET DEPLOY : July 1st ]
			if(frm1.bl_type[0].checked){
				if(showESigature == 'N'){
					$("#showESigature").prop( "checked", false);
					$("#showRevESigature").prop( "checked", false);
				} else {
					$("#showESigature").prop( "checked", true);
					$("#showRevESigature").prop( "checked", true);
				}
				if(showReStamp == 'N'){
					$("#showReStamp").prop( "checked", false);
				} else {
					$("#showReStamp").prop( "checked", true);
				}
			}else if(frm1.bl_type[1].checked){
				$("#showESigature").prop( "checked", false);
				$("#showRevESigature").prop( "checked", false);
				//#6714 [JAPT] REVENUE STAMP FUNCTION [ TARGET DEPLOY : July 1st ]
				$("#showReStamp").prop( "checked", false);
			} 
		}

		var usrid 		= "<%=userInfo.getUsrid()%>";
		var ofc_cnt_cd1 = "<%=userInfo.getOfc_cnt_cd()%>";
		var tbl_prt_flg = "<%= userInfo.getTbl_prt_flg()%>"
	</script>
<script>
function setupPage(){
	loadPage();
}
</script>	
<bean:define id="tmpMap"  name="EventResponse" property="mapVal"/>
<style> body { border-top-width: 6px!important; } </style>
<form name="frm1" method="POST" action="./">
	<input	type="hidden" name="f_cmd"/> 
	<input	type="hidden" name="intg_bl_seq" value="<bean:write name="tmpMap" property="intg_bl_seq"/>"/>

	<!-- Report Value -->
	<input	type="hidden" name="cmd_type"/>
	<input	type="hidden" name="title" value="B/L Print"/>
	<input	type="hidden" name="stamp"/>
	<input	type="hidden" name="all"/>
	<input	type="hidden" name="rider_flg" value="<bean:write name="tmpMap" property="rider_flg"/>"/>
	<input	type="hidden" name="h_agent_text" value="<bean:write name="tmpMap" property="agent_text"/>"/>
	<input	type="hidden" name="file_name"/>
	<input	type="hidden" name="title"/>
	<input	type="hidden" name="rd_param"/>
	<input	type="hidden" name="mailTitle" value="<bean:write name="tmpMap" property="mailTitle"/>"/>
	<input	type="hidden" name="mailTo" value="<bean:write name="tmpMap" property="mailTo"/>"/>
		
	<!-- /* #999 [SHINE] B/L 회사명 변경 옵션  (기본 Form에만 적용하고, 고객 요구 시 변경 적용하기로 함 )*/ -->
	<input	type="hidden" name="reserve_field06" value="<bean:write name='tmpMap' property='reserve_field06'/>" />
	<input	type="hidden" name="ofc_rep_nm" value="<bean:write name='tmpMap' property='ofc_rep_nm'/>"/>
	<input	type="hidden" name="ofc_nm" value="<bean:write name='tmpMap' property='ofc_nm'/>"/>
	<!-- /* #999 [SHINE] B/L 회사명 변경 옵션  (기본 Form에만 적용하고, 고객 요구 시 변경 적용하기로 함 )*/ -->
	
	<!-- #1247 [CLT] HB/L Company Name - Print 시 저장 요청 및 Document Package 시 표시	 -->
	<input	type="hidden" name="sign_ship" value="<bean:write name='tmpMap' property='sign_ship'/>" />

	<!-- #4110 [JAPT] House B/L item add, 'Prepaid at' on HBL Print option. -->
	<input	type="hidden" name="frt_term_c_cd" value="<bean:write name='tmpMap' property='frt_term_c_cd'/>"/>
	
	<!--  Report ==> OutLook연동 파라미터 (S) -->
	<input type="hidden" name="rpt_biz_tp"/>
	<input type="hidden" name="rpt_biz_sub_tp"/>
	<!--  Report ==> OutLook연동 파라미터 (E) -->
	
	<!--  OE HBL Form -->
	<input	type="hidden" name="oe_hbl_form" value="<bean:write name="tmpMap" property="oe_hbl_form"/>"/>
	<!--#52512 [CLT] RD File Name을 표준화| Standardization of File Name during downloading the report -->
	<input type="hidden" name="rpt_file_name_title"/>

	<input type="hidden" id="prt_option" name="prt_option" value="opt_print"/>
	
	<!-- OFVFOUR-7452 [SOUTH EAST WORLD WIDE] CREATING HB/L PRINT FUNCTION IN OIH B/L ENTRY -->
	<input	type="hidden" name="airSeaTp" value="<bean:write name='tmpMap' property='airSeaTp'/>"/>
	<input	type="hidden" name="bndTp" value="<bean:write name='tmpMap' property='bndTp'/>"/>
	<input	type="hidden" name="bizTp" value="<bean:write name='tmpMap' property='bizTp'/>"/>
	<!-- #2933 [CARGOZONE] OE HBL PRINT FREIGHT ARRANGE DEFAULT FLAG -->
	<!-- /* #1739 [Patent] OEH B/L Print 의 Freight Arrange Default 설정 Option 처리 */ 
	<input	type="hidden" name="frtArrFlg" value="<bean:write name="tmpMap" property="frtArrFlg"/>"/>
	-->
	
	<!--  Logo Yn Form -->
	<input	type="hidden" name="logoYn" value="<bean:write name="tmpMap" property="logoYn"/>"/>	
	<input	type="hidden" name="cntr_info_flag" id="cntr_info_flag" value="<bean:write name='tmpMap' property='cntrInfoFlag'/>"/>
	<input	type="hidden" name="shp_mod_cd" id="shp_mod_cd" value="<bean:write name='tmpMap' property='shp_mod_cd'/>"/>
	<input	type="hidden" name="oehBlPrintJaOpt" id="oehBlPrintJaOpt" value="<bean:write name='tmpMap' property='oehBlPrintJaOpt'/>"/>
	<!-- 6301 [JAPT] Mail sending function related request-->
	<input	type="hidden" name="lnr_bkg_no" id="lnr_bkg_no" value="<bean:write name='tmpMap' property='lnr_bkg_no'/>"/>
	<input	type="hidden" name="trnk_vsl_nm" id="trnk_vsl_nm" value="<bean:write name='tmpMap' property='trnk_vsl_nm'/>"/>
	<input	type="hidden" name="trnk_voy" id="trnk_voy" value="<bean:write name='tmpMap' property='trnk_voy'/>"/>
	<input	type="hidden" name="etd_dt_tm" id="etd_dt_tm" value="<bean:write name='tmpMap' property='etd_dt_tm'/>"/>
	<div class="layer_popup_title">
		<!-- Button -->
		<div class="page_title_area clear">
	   	   <h2 class="page_title" align="left"><bean:message key="BL_Print"/></h2>
		   <div class="opus_design_btn">
			   <button id="btnPrint" type="button" class="btn_accent" onclick="doWork('Print')"><bean:message key="Print"/></button><!--
				--><button type="button" class="btn_accent" onclick="doWork('PREVIEW')" id="btnPreview"><bean:message key="Preview"/></button><!-- 
			   --><button type="button" class="btn_normal" onclick="doWork('CLOSE')"><bean:message key="Close"/></button>
		   </div>
		</div>
	</div>
	<div class="layer_popup_contents">
<div class="over_wrap" style="height:100%">
		<div class="wrap_search" style="padding-left:10px">
	    	<div class="opus_design_grid">
	    		<table border="0" cellpadding="0" cellspacing="0" height="100%">
			        <tr>
			            <th width="130px" scope="row" nowrap class="table_search_head" align="left"><bean:message key="BL_Number"/></th>
			            <td width="90px" class="table_search_body"><!-- 
			            	 --><input name="house_bl_no" type="text" value='<bean:write name="tmpMap" property="house_bl_no"/>' class="search_form" style="width:120px;border:0;background-color:transparent;" readOnly></td>
	<!-- 		            <td style="width: 200px;"></td> -->
			            <td id="rule1" scope="row" nowrap class="table_search_head"><!-- 
			            	 --><input type="checkBox" name="clause_rule" id="clause_rule" onclick="flgChange(this);"><label for="clause_rule"><bean:message key="Show_Rule_Clause"/></label>
			            </td>           
			        </tr>
			        <tr height="3px"/>
			        <tr>
			            <th scope="row" nowrap class="table_search_head" colspan="4" align="left"><bean:message key="BL_Print_Option"/></th>
			        </tr>
			        <tr height="3px"/>
			        <tr>
			        	<td class="table_search_body">
			                <input type="radio" name="bl_type" id="bl_type1" value="1" onclick="javascript:chkText();" checked><label for="bl_type1"><bean:message key="Original"/></label>
			            </td>
			            <td class="table_search_body" colspan="2">
			                <input type="radio" name="bl_type" id="bl_type2" value="2" onclick="javascript:chkText();" checked><label for="bl_type2"><bean:message key="Copy"/></label>
	<!-- 		             <td style="width: 200px;"></td> -->
							<!-- #3356 [JTC]HB/L Form 개발 -->
							&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
							&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
							<input type="text" name="page_num" style="text-align:center;width:20px;" value='1' dataformat="num" maxlength="1">/
			                <input type="text" name="page_count" style="text-align:center;width:50px;" value='<bean:write name="tmpMap" property="printCnt"/>'> <bean:message key="BLs"/>
		                </td>
			        </tr>
			        
			        <tr height="5px"/>
			        <tr>
			        	<td class="table_search_body" colspan="3">
			                <input type="text" name="agent_text" style="text-align:center;width:400px;" dataformat="engup" otherchar="()_\-,.& " value="">
			            </td>
			        </tr>
			        
			        
			        <!-- // #473 [IMPEX] AIR EXPORT HAWB DRAFT VERSION OPTION -->
			        <tr height="3px"/>
			        <tr>
		                <th scope="row" nowrap class="table_search_head" colspan="3" align="left"><bean:message key="Release_Type"/></th>
		            </tr>
		            <tr>
			            <td colspan="4">
			                <bean:define id="Ocean_Release_Type" name="tmpMap" property="Ocean_Release_Type"/>
							<select id="show_bl_type" name="show_bl_type" style= "width:310px;">								
								<logic:iterate id="comVO" name="Ocean_Release_Type">
									<option value='<bean:write name="comVO" property="cd_val"/>'><bean:write name="comVO" property="cd_nm"/></option>									
								</logic:iterate>
							</select>
		                </td>
		               	
			        </tr>
			        <!-- #3356 [JTC]HB/L Form 개발 -->
			        <tr height="3px"/>
			        <tr  <logic:notEqual name="tmpMap" property="oehBlPrintJaOpt" value="Y" >style="display:none;"</logic:notEqual>>
			            <td colspan="4" ><!-- 
			            	 --><input type="checkBox" name="showVeslPol" id="showVeslPol"><label id="showVeslPol_lbl" for="showVeslPol"><bean:message key="Show_Vessel_POL"/></label>
			            	 <input type="checkBox" name="showExRate" id="showExRate"><label id="showExRate_lbl" for="showExRate"><bean:message key="Show_Exchange_Rate"/></label>
			            </td>  
			        </tr>	
			        <tr height="3px"/>
			        <tr  <logic:notEqual name="tmpMap" property="oehBlPrintJaOpt" value="Y" >style="display:none;"</logic:notEqual>>
			            <td colspan="4"><!-- 
			            	 --><input type="checkBox" name="showOnDt" id="showOnDt"><label id="showOnDt_lbl" for="showOnDt"><bean:message key="Show_onboard_date"/></label>
			            	 <input type="checkBox" name="showCont" id="showCont"><label id="showCont_lbl" for="showCont"><bean:message key="Show_for_Container"/></label>
			            </td>   
			        </tr>			        		        
			        <tr height="3px"/>
			        <tr  <logic:notEqual name="tmpMap" property="oehBlPrintJaOpt" value="Y" >style="display:none;"</logic:notEqual>>
			            <td colspan="4"><!-- 
			            	 --><input type="checkBox" name="showTelex" id="showTelex"><label id="showTelex_lbl" for="showTelex"><bean:message key="Show_Telex_Released"/></label><!-- 
			            	 --><input type="checkBox" name="showCntrBlMark" id="showCntrBlMark" value="Y" style="margin-left: -2px;"><label id="showCntrBlMark_lbl" for="showCntrBlMark"><bean:message key="Show_for_Cntr_Bl_Mark"/></label>
			            </td>           
			        </tr>
			        <!-- #6612 [JAPT] e-Signature on HBL Requirements -->
			        <tr height="3px"/>
			        <tr id="showEsig_tr" name="showESig_tr">
			            <td colspan="4"> 
			            	 <input type="checkBox" name="showESigature" id="showESigature"><label id="showESigature_lbl" for="showESigature"><bean:message key="Show_eSignature"/></label>
			            	 <input type="checkBox" name="showRevESigature" id="showRevESigature" style="margin-left: 11px;"><label id="showRevESigature_lbl" for="showRevESigature"><bean:message key="Show_Rev_eSignature"/></label>
			            </td>           
			        </tr>
			         <!-- #6714 [JAPT] REVENUE STAMP FUNCTION [ TARGET DEPLOY : July 1st ] -->
			        <tr height="3px"/>
			        <tr id="showStamp_tr" name="showStamp_tr">
			            <td colspan="4"> 
			            	 <input type="checkBox" name="showReStamp" id="showReStamp"><label id="showReStamp_lbl" for="showReStamp"><bean:message key="Show_RevenueStamp"/></label>
			            </td>           
			        </tr>
			        			        
		            <!-- 
		            <tr height="3px"/>
	              	<tr>
		                <td class="table_search_body">
		                <input name="show_bl_type" id="show_bl_type1" type="radio" value="1" onclick="javascript:chkText();"><label for="show_bl_type1"><bean:message key="Original"/></label>
			            </td>
			            <td class="table_search_body"><input name="show_bl_type" id="show_bl_type2" type="radio" value="2" onclick="javascript:chkText();"><label for="show_bl_type2"><bean:message key="NonNegotiable"/></label>
			            </td>
			            <td class="table_search_body"><input name="show_bl_type" id="show_bl_type3" type="radio" value="3" onclick="javascript:chkText();"><label for="show_bl_type3"><bean:message key="Draft"/></label>
		                </td>
	              	</tr>
	              	<tr height="3px"/>
	              	<tr>
		                <td class="table_search_body"><input name="show_bl_type" id="show_bl_type4" type="radio" value="4" onclick="javascript:chkText();"><label for="show_bl_type4"><bean:message key="Copy"/></label>
			            </td>
			            <td class="table_search_body"><input name="show_bl_type" id="show_bl_type5" type="radio" value="5" onclick="javascript:chkText();"><label for="show_bl_type5"><bean:message key="Telex_Release"/></label>
			            </td>
			            <td class="table_search_body"><input name="show_bl_type" id="show_bl_type6" type="radio" value="6" onclick="javascript:chkText();"><label for="show_bl_type6"><bean:message key="Seaway_Bill"/></label>
		                </td>
	              	</tr>	
	              	<tr height="3px"/>
	              	<tr>
		                <td class="table_search_body"><input name="show_bl_type" id="show_bl_type7" type="radio" value="7" onclick="javascript:chkText();" checked="checked"><label for="show_bl_type7"><bean:message key="None"/></label>
		                </td>
	              	</tr>
	              	 -->
	              	<tr height="3px"/>
	              	<tr>
		                <th scope="row" nowrap class="table_search_head" colspan="2" align="left"><bean:message key="Freight_Arrange"/></th>
		            </tr>
		            <tr height="3px"/>
	              	<tr>
		                <td class="table_search_body">
			                <input name="frt_flg" id="frt_flg1" type="radio" value="Y" checked="checked"><label for="frt_flg1">YES</label>
			            </td>
			            <td class="table_search_body">
			                <input name="frt_flg" id="frt_flg2" type="radio" value="N"><label for="frt_flg2">NO</label>
		                </td>
	              	</tr>
	              	<tr height="3px"/>
	              	<tr>
		                <th scope="row" nowrap class="table_search_head" colspan="2" align="left"><bean:message key="Title_Name"/></th>
		            </tr>
		            <tr height="3px"/>
	              	<tr>
		                <td class="table_search_body" colspan="2"><!-- 
			                 --><input name="title_name" id="title_id1" type="radio" value="1" onclick="initSetting(1);" checked><label for="title_id1"><bean:message key="Bill_of_Lading"/></label>
			            </td>
	              	</tr>
			        <tr>
			        	<td class="table_search_body" colspan="3">
			                <input type="text" name="ofc_text" style="text-align:left;width:400px;" dataformat="engup" otherchar="()_\-,.& " value="">
			            </td>
			        </tr>  			              	
	              	<tr height="3px"/>
	              	<tr>
			            <td class="table_search_body" colspan="2"><!-- 
			                 --><input name="title_name" id="title_id2" type="radio" value="2" onclick="initSetting(2);"><label for="title_id2"><bean:message key="Forwarder_Cargo_Receipt"/></label>
		                </td>
	              	</tr>
	              	<tr height="3px"/>
	              	<!-- #354 [PRIMEX] OEH BL PRINT, USERS TO UPDATE THE TITLE --> 
	              	<tr>
			            <td class="table_search_body" colspan="2"><!-- 
			                 --><input name="title_name" id="title_id3" type="radio" value="3" onclick="initSetting(3);"> &nbsp;<input type="text" name="bl_usr_def_nm" style="width:150px;" value="<bean:write name='tmpMap' property='bl_usr_def_nm'/>">
		                </td>
	              	</tr>
					<!-- #4110 [JAPT] House B/L item add, 'Prepaid at' on HBL Print option. -->
	              	<tr height="3px"/ >
	              	<tr id="prepaid_at_tr" name ="prepaid_at_tr">
	              		<th scope="row" nowrap class="table_search_head" align="left"><bean:message key="Prepaid_At"/> :</th>
	              		<td class="table_search_body"><!-- 
		              		 --><input type="text" name="prepaid_at" style="width:150px;text-transform:uppercase;" value="<bean:write name='tmpMap' property='prepaid_at'/>">
	              		</td>
	              	</tr>	              	
	              	<tr height="3px"/>
	              	<tr>
	              		<th scope="row" nowrap class="table_search_head" align="left"><bean:message key="Received_By"/> :</th>
	              		<td class="table_search_body"><!-- 
		              		 --><select name="rcvd_by" styleClass="search_form" style="width:150px;" readonly><!-- 
								 --><option value="1"><%=userInfo.getOfc_locl_nm()%></option><!-- 
							 --></select>
	              		</td>
	              	</tr>
	              	<!-- 6911 [BNX] Cargo Receipt-->
	              	<tr height="3px"/>
	              		<tr>
							<th scope="row" nowrap class="table_search_head" align="left"><bean:message key="Received_Date_Time"/> :</th>
							 -- <td class="table_search_body" width="98px"><!-- 
							 --><input type="text" name="rcvd_dt_tm" style="width:77px;" maxlength="10" onKeyUp="mkDateFormatType(this, event, false, 1)" onBlur="mkDateFormatType(this, event, true, 1)"><!-- 
							 --><button type="button" class="calendar" tabindex="-1" id="rcvd_dt_tm_cal" onclick="doDisplay('DATE1' ,frm1.rcvd_dt_tm);"></button><!-- 
							 --><input type="text" name="rcvd_tm" maxlength="4" class="search_form" dataformat="num" style="ime-mode:disabled;width:40px;" onchange="timeCheck(this);" onkeypress="onlyNumberCheck();">
							 </td>
						</tr>

	              	<tr height="3px"/>
	              	<tr>
	              		<th scope="row" nowrap class="table_search_head" align="left"><bean:message key="Received_Person"/> :</th>
	              		<td class="table_search_body"><!-- 
		              		 --><input type="text" name="rcvd_pic" style="width:150px;" readonly>
	              		</td>
	              	</tr>
	              	<tr height="3px"/>
	              	<tr>
		                <th scope="row" nowrap class="table_search_head" align="left"><bean:message key="Remark"/></th>
		                <td class="table_search_body" colspan="2">
	                         <div id="div_subcode"><!-- 
					             --><logic:notEmpty name="EventResponse"><!--
							             	--><bean:define id="selList1" name="tmpMap" property="PARAM1"/><!--
							             	--><select id="rmk_cd" name="rmk_cd" ><!--
					             		--><logic:iterate id="lst1" name="selList1"><!--
						             			--><option value='<bean:write name="lst1" property="cd_val"/>' ><bean:write name="lst1" property="cd_nm" filter="false"/></option><!--
					             		--></logic:iterate><!--
						             		--></select><!--
						         --></logic:notEmpty><!--						         
						     --></div>
			            </td>
		            </tr>
	              	<tr height="3px"></tr>
			    </table>
	    	</div>
    	<div style="float: right; margin-right:0; font-weight: bold;"><input type="checkbox" name="chk_auto_close" id="chk_auto_close" /><label><bean:message key="AUTO_CLOSE"/></label></div>
	    </div>
	</div>
</div>
</form>
