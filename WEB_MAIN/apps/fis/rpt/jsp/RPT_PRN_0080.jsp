<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
    <%@include file="./../../../../syscommon/header/CLTHeader.jsp"%>
	<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css"/>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/apps/fis/rpt/RPT_PRN_0080.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/cookie.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript">
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
		}
		function setupPage()
		{
			loadPage();

		}
		var usrid = "<%=userInfo.getUsrid()%>"; 
		var ofc_cnt_cd1 = "<%=userInfo.getOfc_cnt_cd()%>";
	</script>

<bean:define id="tmpMap"  name="EventResponse" property="mapVal"/>

<style> body { border-top-width: 6px!important; } </style>
<form name="frm1" method="POST" action="./">
	<input	type="hidden" name="f_cmd" id="f_cmd"/> 
	<input	type="hidden" name="intg_bl_seq"  id="intg_bl_seq" value="<bean:write name="tmpMap" property="intg_bl_seq"/>"/>

	<!-- Report Value -->
	<input	type="hidden" name="cmd_type" id="cmd_type"/>
	<input	type="hidden" name="title" id="title" value="B/L Print"/>
	<input	type="hidden" name="stamp" id="stamp"/>
	<input	type="hidden" name="all" id="all"/>
	<input	type="hidden" name="rider_flg"  id="rider_flg" value="<bean:write name="tmpMap" property="rider_flg"/>"/>
	<input	type="hidden" name="h_agent_text" id="h_agent_text" value="<bean:write name="tmpMap" property="agent_text"/>"/>
	<input	type="hidden" name="file_name" id="file_name"/>
	<input	type="hidden" name="title" id="title"/>
	<input	type="hidden" name="rd_param" id="rd_param"/>
	<input	type="hidden" name="mailTitle" id="mailTitle" value="<bean:write name="tmpMap" property="mailTitle"/>"/>
	<input	type="hidden" name="mailTo" id="mailTo" value="<bean:write name="tmpMap" property="mailTo"/>"/>
	<input	type="hidden" name="refOfcCd" value="<bean:write name="tmpMap" property="refOfcCd"/>"/>
	
	<!--  Report ==> OutLook연동 파라미터 (S) -->
	<input type="hidden" name="rpt_biz_tp" id="rpt_biz_tp"/>
	<input type="hidden" name="rpt_biz_sub_tp" id="rpt_biz_sub_tp"/>
	<!--  Report ==> OutLook연동 파라미터 (E) -->
	
	<input type="hidden" name="prn_type"  id="prn_type" value="<bean:write name="tmpMap" property="prn_type"/>"/>
	<input type="hidden" name="cmdVal" id="cmdVal" value="<bean:write name="tmpMap" property="cmdVal"/>"/>
	<input type="hidden" name="desc_flg1" id="desc_flg1" value="<bean:write name="tmpMap" property="desc_flg1"/>"/>
	<input type="hidden" name="desc_flg2" id="desc_flg2" value="<bean:write name="tmpMap" property="desc_flg2"/>"/>
	<input type="hidden" name="charge_flg1" id="charge_flg1" value="<bean:write name="tmpMap" property="charge_flg1"/>"/>
	<input type="hidden" name="charge_flg2" id="charge_flg2" value="<bean:write name="tmpMap" property="charge_flg2"/>"/>
	
	<!-- #24114, [BINEX]AWB PRINT, jsjang 2013.12.5 -->
	<input type="hidden" name="desc_flg3" id="desc_flg3" value="<bean:write name="tmpMap" property="desc_flg3"/>"/>
	<input type="hidden" name="desc_flg4" id="desc_flg4" value="<bean:write name="tmpMap" property="desc_flg4"/>"/>
	<input type="hidden" name="charge_flg3" id="charge_flg3" value="<bean:write name="tmpMap" property="charge_flg3"/>"/>
	<input type="hidden" name="charge_flg4" id="charge_flg4" value="<bean:write name="tmpMap" property="charge_flg4"/>"/>
	<input type="hidden" name="cnt_cd" value="<bean:write name="tmpMap" property="cnt_cd"/>"/>

	<input type="hidden" name="encode_by_carr" value="<bean:write name="tmpMap" property="by_carr"/>"/>
	<input type="hidden" name="encode_sign_ship" value="<bean:write name="tmpMap" property="sign_ship"/>"/>
	<input type="hidden" name="encode_sign_carr" value="<bean:write name="tmpMap" property="sign_carr"/>"/>
	
	<!--#52512 [CLT] RD File Name을 표준화| Standardization of File Name during downloading the report -->
	<input type="hidden" name="rpt_file_name_title"/>
	
	<!--  OE HBL Form -->
	<input	type="hidden" name="ae_hbl_form" value="<bean:write name="tmpMap" property="ae_hbl_form"/>"/>

	<input type="hidden" id="prt_option" name="prt_option" value="opt_print"/>

	<div class="layer_popup_title">	
		 <div class="page_title_area clear">
		   <h2 class="page_title" style="padding-left: 0px"><bean:message key="BL_Print"/></h2>
			   <!-- btn_div -->
			   <div class="opus_design_btn">
				   <button id="btnPrint" type="button" class="btn_accent" onclick="doWork('PRINT');"><bean:message key="Print"/></button><!-- 
					--><button type="button" class="btn_accent" onclick="doWork('PREVIEW')" id="btnPreview"><bean:message key="Preview"/></button><!-- 
				    --><button type="button" class="btn_normal" onclick="doWork('CLOSE');"><bean:message key="Close"/></button>
			   </div>
			   <!-- btn_div -->
			    <div class="location">	
				</div>
		</div>
	</div>
	<div class="layer_popup_contents">
<div class="over_wrap" height="100%">
	<div class= "wrap_search">
  		<div class= "opus_design_inquiry">
  			<table style="width:340px">
  				<colgroup>
  					<col width="85px">
  					<col width="85px">
  					<col width="85px">
  					<col width="*">
  				</colgroup>
  				
  				<tr>
			            <td><b><bean:message key="AWB_Type"/></b></td>
			            <td colspan="3">
			            <input name="biz_clss" type="text" value='<bean:write name="tmpMap" property="biz_clss"/>' class="search_form" border:0;background-color:transparent;" readOnly>
			            </td>
			    		
			    </tr>
			    <tr>
			            <td><b><bean:message key="AWB_No"/></b></td>
			            <td colspan="2">
			            	<input name="house_bl_no" type="text" value='<bean:write name="tmpMap" property="house_bl_no"/>' class="search_form" border:0;background-color:transparent;" readOnly>
			            </td>
			            <td  id="rule1">
			            	<input type="checkBox" name="clause_rule" id="clause_rule" onclick="flgChange(this);" value=""><label for="clause_rule">Show Rule Clause</label>
			            </td>
			     </tr>
			     <tr>
			            <td colspan="4"><b><bean:message key="For"/></b></td>
			            
			     </tr>
			        <tr>
			        	<div id="tblForCA">
			        	<td >
			                <input type="checkbox" name="bl_for_s" id="bl_for_s" value="Y" ><label for="bl_for_s"><bean:message key="Shipper"/></label>
			            </td>
			        	<td>
			                <input type="checkbox" name="bl_for_i" id="bl_for_i" value="Y" ><label for="bl_for_i"><bean:message key="Issuing_Carrier"/></label>
			            </td>			            
			            <td>
			                <input type="checkbox" name="bl_for_c" id="bl_for_c" value="Y" checked><label for="bl_for_c"><bean:message key="Consignee"/></label>
			            </td>
			        	<td>
			                <input type="checkbox" name="bl_for_d" id="bl_for_d" value="Y" ><label for="bl_for_d"><bean:message key="Delivery_Receipt"/></label>
			            </td>
			            </div>
			          </tr>  
			         <tr>
			            <td colspan="4"><b><bean:message key="Original_Copy"/></b></td>
			            	
			        </tr>
			        <tr>	
			        	<td colspan="4">
			        		<table>
			        			<tr>
			        				<td>
						                <input type="radio" name="bl_type" id="bl_type1" value="1" onclick="javascript:chkText();chkBlType();"><label for="bl_type1"><bean:message key="Original"/></label>
						            </td>
						            <td>
						                <input type="radio" name="bl_type" id="bl_type2" value="2" onclick="javascript:chkText();chkBlType();" checked><label for="bl_type2"><bean:message key="Copy"/></label>
						            </td>
						            <td>
						            	<input type="checkBox" name="show_org" id="show_org" onclick="flgChange(this);"><label for="show_org">Show 'Original On'</label>
						            </td>
						            <td>
						            	<input type="checkBox" name="show_rider" id="show_rider" onclick="flgChange(this);" disabled><label for="show_rider">Original Rider</label>
						            </td>
			        			</tr>
			        		</table>
			        	</td>
			        </tr>
			        <!-- // #473 [IMPEX] AIR EXPORT HAWB DRAFT VERSION OPTION -->
			        <logic:equal name="tmpMap" property="biz_clss" value="House">
			        <tr>
			            <td colspan="4"><b><bean:message key="Release_Type"/></b></td>
			            	
			        </tr>		        
			        <tr>
			            <td colspan="4">
			                <bean:define id="Air_Release_Type" name="tmpMap" property="Air_Release_Type"/>
							<select id="show_bl_type" name="show_bl_type" style= "width:310px;">								
								<logic:iterate id="comVO" name="Air_Release_Type">
									<option value='<bean:write name="comVO" property="cd_val"/>'><bean:write name="comVO" property="cd_nm"/></option>									
								</logic:iterate>
							</select>
		                </td>
		               	
			        </tr>
			        </logic:equal>
			       	 <tr>
			            <td colspan="4"><b><bean:message key="SCI"/></b></td>
			            	
			        </tr>
			        <tr>
			            <td colspan="4">
			                <input type="text" name="sci" maxlength="100" style="width:310px;" value="<bean:write name="tmpMap" property="sci"/>">
		                </td>
		               	
			        </tr>
			        <tr>
			            <td colspan="4"><b><bean:message key="Destination_Country"/></b></td>
			           	
			        </tr>
			        <tr>
			            <td colspan="4" >
			                <input type="text" name="dest_cnt" maxlength="500" style="width:310px;" value="<bean:write name="tmpMap" property="dest_cnt"/>">
		                </td>
		                	
			        </tr>
			        <tr>
			            <td colspan="4"><b><bean:message key="By_First_Carrier"/></b></td>
			            	
			        </tr>
			        <tr>
			            <td colspan="4">
			                <input type="text" name="by_carr" maxlength="500" style="width:310px;">
		                </td>
		                	
			        </tr>
			        <tr>
			            <td colspan="4"><b><bean:message key="Signature_of_Shipper"/></b></td>
			            	
			        </tr>
			        <tr>
			            <td colspan="4">
							<textarea name="sign_ship" onblur="strToUpper(this);" class="search_form" maxlength="500" style="width:310px;height:38px;"></textarea>
						</td>
							
			        </tr>
			        <tr>
			            <td colspan="4"><b><bean:message key="Signature_of_Issuing_Carrier"/></b></td>
			           	
			        </tr>
			        <tr>
			            <td colspan="4" >
							<textarea name="sign_carr" onblur="strToUpper(this);" class="search_form" maxlength="500" style="width:310px;height:28px;"></textarea>
						</td>
							
			        </tr> 
			        <tr>
			        	<td colspan="4">
			        		<table id="awb_prn_pop_sign" style="width:100%">
			        	   <tr> 
					            <td><b><bean:message key="Signature_of_Shipper_or_Agent"/></b></td> 
					        </tr>
					        <tr> 
					            <td>
					            	 <input type="text" name="sign_agent" maxlength="100" style="width:310px;" value="<%=userInfo.getUser_name()%>"> 
								</td> 
					        </tr>			
					        </table>
			        	</td>
			        </tr>
			              
			        <tr>
		                <td colspan="2"><b><bean:message key="Freight_Arrange"/></b></td>
		                <logic:equal name="tmpMap" property="biz_clss" value="Master">
		               		<td colspan="2"><b><bean:message key="Flight_Type"/></b></td>
		               	</logic:equal>
		            </tr>
	              	<tr>
		                <td>
			                <input name="frt_flg" id="frt_flg1" type="radio" value="Y" <logic:notEqual name="tmpMap" property="frt_flg"  value="N">checked</logic:notEqual>><label for="frt_flg1">YES</label>
			            </td>
			            <td colspan="1">
			                <input name="frt_flg" id="frt_flg2" type="radio" value="N" <logic:equal name="tmpMap" property="frt_flg"  value="N">checked</logic:equal>><label for="frt_flg2">NO</label>
		                </td>
		                <logic:equal name="tmpMap" property="biz_clss" value="Master">
			                <td colspan="2">
			                	<input name="flight_type" id="flight_type1" type="radio" value="C" checked><label for="flight_type1">CARGO</label>
			                	<input name="flight_type" id="flight_type2" type="radio" value="P"><label for="flight_type2">PASSENGER</label>
			                </td>
		                </logic:equal>
	              	</tr>
	              	<tr>
		                <td colspan="4"><b><bean:message key="Display_Description"/></b></td>
		              	
		            </tr>
	              	<tr>
	              		<!-- #24114, [BINEX]AWB PRINT, jsjang 2013.12.5 Bl office code : canada -->
		                <td>
			            	<input type="checkBox" name="desc_flg" id="desc_flg" onclick="flgChange(this);" value="Y"><label for="desc_flg"><bean:message key="Shipper" /></label>
			            </td>
			            
			            <td>
			            	<input type="checkBox" name="desc_flg" id="desc_flg21" onclick="flgChange(this);" value="Y"><label for="desc_flg21"><bean:message key="Issuing_Carrier" /></label>
			            </td>
			            
			            <td>
			            	<input type="checkBox" name="desc_flg" id="desc_flg31" onclick="flgChange(this);" value="Y"><label for="desc_flg31"><bean:message key="Consignee"/></label>
			            </td>
			            
		                <td >
			            	<input type="checkBox" name="desc_flg" id="desc_flg41" onclick="flgChange(this);" value="Y"><label for="desc_flg41"><bean:message key="Delivery_Receipt"/></label>
			            </td>	
			           	            
	              	</tr>	    
	              	<tr>
		                <td colspan="4"><b><bean:message key="Display_Charge"/></b></td>
		            	
		            </tr>
	              	<tr>
	              		<!-- #24114, [BINEX]AWB PRINT, jsjang 2013.12.5 Bl office code : canada -->
		                <td>
			            	<input type="checkBox" name="charge_flg" id="charge_flg" onclick="flgChange(this);" value="Y"><label for="charge_flg"><bean:message key="Shipper"/></label>
			            </td>
			            <td>
			            	<input type="checkBox" name="charge_flg" id="charge_flg21" onclick="flgChange(this);" value="Y"><label for="charge_flg21"><bean:message key="Issuing_Carrier"/></label>
			            </td>
			            
		                <td>
			            	<input type="checkBox" name="charge_flg" id="charge_flg31" onclick="flgChange(this);" value="Y"><label for="charge_flg31"><bean:message key="Consignee"/></label>
			            </td>
			            <td>
			            	<input type="checkBox" name="charge_flg" id="charge_flg41" onclick="flgChange(this);" value="Y"><label for="charge_flg41"><bean:message key="Delivery_Receipt"/></label>
			            </td>			            
	              	</tr> 
  			</table>
  		</div>
  	</div>
	</div>
    <div style="float: right; margin-right:0; font-weight: bold;"><input type="checkbox" name="chk_auto_close" id="chk_auto_close" /><label><bean:message key="AUTO_CLOSE"/></label></div>
	
    <iframe name="ifr_hidden" id="ifr_hidden" style="width:0;height:0;visibility:hidden" border=0></iframe>
</div>
</form>





