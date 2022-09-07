<%--
=========================================================
*Copyright(c) 2009 CyberLogitec. All Rights Reserved.
=========================================================
=========================================================
*@FileName   : SEE_BMD_0022.jsp
*@FileTitle  : Mark Description
*@Description: 
*@author     : Kang,Jung-Gu
*@version    : 1.0 - 09/28/2009
*@since      :

*@Change history:
=========================================================
--%>
<!-- 	<div class='opus_design_btn'>
		<button type="button" class="btn_normal" onclick="doWork('SAVE')" id="btnSaveBasic"><bean:message key="Save"/></button>
	</div>
 --><div class="layout_wrap">
		<div class="layout_vertical_3" style="width:700px;padding-left:20px">
			<div class="opus_design_inquiry">
				<ul class="b_sett">
				  <li><!-- <input type="checkbox" name="i_sts_set" value="" disabled onChange="activeNxtStep();"> --><bean:message key="Status_Booking"/>
				  		<ul class="mar_left_12">
				        	<li><label><input type="radio" value="" name="st_step_sts_set" id="st_step_sts_set1"><bean:message key="Ready_Create_HBL"/></label>
				            	<ul class="mar_left_12">
				            		<li><label><input type="checkbox" value="" id="next_step_bk_cf" name="next_step_bk_cf" onChange="activeNxtStep();"><bean:message key="Next_Step_When_Booking_Confirmed"/></label>
				                    	<ul class="mar_left_12" id="nxt_bk_cf">
				                        	<li><label><input type="radio" value="" id="nd_step_sts_set1" name="nd_step_sts_set" disabled><bean:message key="Self_Confirm"/></label>
				                            </li>
				                            <li><label><input type="radio" value="" id="nd_step_sts_set2" name="nd_step_sts_set" disabled><bean:message key="Confirmed_by_Authorized"/></label>
				                            </li>
				                        </ul>
				               	 	</li>
				                
				            	</ul>
				            </li>
				            <li>
				            	<label><input type="radio" value="" name="st_step_sts_set" id="st_step_sts_set2"><bean:message key="Booking_is_Confirmed"/></label>
				            </li>
				            <li>
				            	<label><input type="radio" value="" name="st_step_sts_set" id="st_step_sts_set3"><bean:message key="HBL_Created"/> </label>
				            </li>
				        </ul>
				  </li>
				  <li ><input type="checkbox" value="" id="hbl_crt_wt_mbl" name="hbl_crt_wt_mbl" onChange="activeNxtStep();"><bean:message key="HBL_Create_without_MBL"/>
				  	<ul class="mar_left_12" id="nxt_hbl_crt_wt_mbl">
				    	<li><label><bean:message key="HBL_Create_without_MBL"/></label></li>
				        <li><label><bean:message key="Direct_Case"/></label></li>
				        <li><label><bean:message key="Console_Other_Cases"/></label></li>
				        <li><input type="checkbox" value="" id="crt_inv_hbl" name="crt_inv_hbl" disabled><bean:message key="When_creating_an_invoice_on_HBL"/></li>
				    </ul>
				  </li>

<!-- 				  <li><input type="checkbox" value="" name="hbl_creation"><bean:message key="HBL_Creation"/></label>
				  	<ul class="mar_left_12">
				    	<li><label><bean:message key="Not_being_checked_HBL_No"/></label></li>
				    </ul>
				  </li>
 -->
				  <li><input type="checkbox" value="" name="crt_inv_by_clk_prt"><bean:message key="Creating_invoice_by_clicking_Print"/>
				  	<ul class="mar_left_12">
				    	<li><label><bean:message key="Shown_Invoice_Print_button"/></label></li>
				    </ul>
				  </li>
				   <li><bean:message key="Invoice_Approval"/>
				  		<ul class="mar_left_12">
				        	<li><label><input type="radio" value="" name="st_inv_apro" onChange="activeNxtStep();"><bean:message key="Creator_Self_Approval"/></label>
				            	<ul class="mar_left_12">
				            		<li><label><input type="radio" value="" name="nd_inv_apro" id="nd_inv_apro1" onClick="setCheckInv();"><bean:message key="Invoice_on_being_created"/></label></li>
				                    <li><label><input type="radio" value="" name="nd_inv_apro" id="nd_inv_apro2" onClick="setCheckInv();"><bean:message key="By_using_Self_Approval_button"/></label></li>
				            	</ul>
				            </li>
				            <li>
				            	<label><input type="radio" value="" name="st_inv_apro" onChange="activeNxtStep();"><bean:message key="Audit_Team_Manager_Approval"/></label>
				            </li>
				            
				        </ul>
				  </li>
				  <li><bean:message key="CSR_Approval"/>
				  		<ul class="mar_left_12">
				        	<li><label><input type="radio" value="" name="st_csr_apro"><bean:message key="Self_Approval"/></label>
				            	
				            </li>
				            <li>
				            	<label><input type="radio" value="" name="st_csr_apro"><bean:message key="Audit_Team_Manager_Approval"/></label>
				            </li>
				            
				        </ul>
				  </li>
				</ul>
			</div>
		</div>
		
		<div class="layout_vertical_3 pad_left_8" style="width:400px;" id="active_company">
			<div class="opus_design_inquiry" style="margin-left:20px">
				<h3 class="title_design" style="margin-bottom: 10;"><bean:message key="Auto_Calculating"/>
					<button type="button" class="btn_alert floatR" onclick="doWork('SAVE')" id="btnSaveBasic">&nbsp;&nbsp;<bean:message key="Save"/>&nbsp;&nbsp;</button>				
				</h3>
				<table>
					<colgroup>
						<col width="100"></col>
						<col width="100"></col>
						<col width="*"></col>
					</colgroup>
					<tbody>
					
						<tr>
							<input type="hidden" name="h_kgs_lbs_auto_calc" value="<bean:write name="ofcVO" property="kgs_lbs_auto_calc"/>">
			                <td><input type="radio" name="i_kgs_lbs_auto_calc" value="BOTHSIDE" checked/><bean:message key="KG_GR_LS_LBS"/></td>
			                <td><input type="radio" name="i_kgs_lbs_auto_calc" value="LBSTOKGS"/><bean:message key="KG_GR_LBS"/></td>
			                <td><input type="radio" name="i_kgs_lbs_auto_calc" value="KGSTOLBS"/><bean:message key="KG_LS_LBS"/></td>
			            </tr>
					</tbody>
				</table>
				<h3 class="title_design" style="margin-bottom: 10px;margin-top:10px"><bean:message key="Decimal_Place_and_Round"/></h3>
				<table>
					<colgroup>
						<col width="150"></col>
						<col width="*"></col>
					</colgroup>
					<tbody>
						<tr>
							<th><h3 class="title_design" style="margin-bottom: 5px;text-align: left;margin-left:20px"><bean:message key="Air_Document"/></h3></th>
							<td></td>
						</tr>
						<tr>
			                <th><bean:message key="GWeight"/></th>
			                <td>
			                	<input type="text" name="i_air_grs_wgt_dcm_plc" value="<bean:write name="ofcVO" property="air_grs_wgt_dcm_plc"/>" maxlength="1" onKeyPress="onlyNumberCheck('.')" style="width:42px; text-align: center">
			                	<input type="hidden" name="h_air_grs_wgt_rnd" value="<bean:write name="ofcVO" property="air_grs_wgt_rnd"/>">
			                		<select name="i_air_grs_wgt_rnd" style="width:150px;" OnChange="" required>
										<logic:iterate id="codeVO" name="round">
											<option value='<bean:write name="codeVO" property="cd_val"/>'><bean:write name="codeVO" property="cd_nm"/></option>
										</logic:iterate>
									</select>
				             </td>
			            </tr>
			            <tr>
			                <th><bean:message key="Volume_Weight"/></th>
			                <td>
			                	<input type="text" name="i_air_vol_wgt_dcm_plc" value="<bean:write name="ofcVO" property="air_vol_wgt_dcm_plc"/>" maxlength="1" onKeyPress="onlyNumberCheck('.')" style="width:42px; text-align: center">
			                	<input type="hidden" name="h_air_vol_wgt_rnd" value="<bean:write name="ofcVO" property="air_vol_wgt_rnd"/>">
			                		<select name="i_air_vol_wgt_rnd" style="width:150px;" OnChange="" required>
										<logic:iterate id="codeVO" name="round">
											<option value='<bean:write name="codeVO" property="cd_val"/>'><bean:write name="codeVO" property="cd_nm"/></option>
										</logic:iterate>
									</select>
				                </td>
			            </tr>
			            <tr>
			                <th><bean:message key="Chargeable_Weight"/></th>
			                <td>
			                	<input type="text" name="i_air_chg_wgt_dcm_plc" value="<bean:write name="ofcVO" property="air_chg_wgt_dcm_plc"/>" maxlength="1" onKeyPress="onlyNumberCheck('.')" style="width:42px; text-align: center">
			                	<input type="hidden" name="h_air_chg_wgt_rnd" value="<bean:write name="ofcVO" property="air_chg_wgt_rnd"/>">
			                		<select name="i_air_chg_wgt_rnd" style="width:150px;" OnChange="" required>
										<logic:iterate id="codeVO" name="round">
											<option value='<bean:write name="codeVO" property="cd_val"/>'><bean:write name="codeVO" property="cd_nm"/></option>
										</logic:iterate>
									</select>
				                </td>
			            </tr>
			            <tr>
							<th><h3 class="title_design" style="margin: 5px 0 5px;text-align: left;margin-left:20px"><bean:message key="Ocean_Document"/></h3></th>
							<td></td>
						</tr>
			            <tr>
			                <th><bean:message key="GWeight"/></th>
			                <td>
			                	<input type="text" name="i_sea_grs_wgt_dcm_plc" value="<bean:write name="ofcVO" property="sea_grs_wgt_dcm_plc"/>" maxlength="1" onKeyPress="onlyNumberCheck('.')" style="width:42px; text-align: center">
			                	<input type="hidden" name="h_sea_grs_wgt_rnd" value="<bean:write name="ofcVO" property="sea_grs_wgt_rnd"/>">
			                		<select name="i_sea_grs_wgt_rnd" style="width:150px;" OnChange="" required>
										<logic:iterate id="codeVO" name="round">
											<option value='<bean:write name="codeVO" property="cd_val"/>'><bean:write name="codeVO" property="cd_nm"/></option>
										</logic:iterate>
									</select>
				                </td>
			            </tr>
			            <tr>
			                <th><bean:message key="Volume_Weight"/></th>
			                <td>
			                	<input type="text" name="i_sea_vol_wgt_dcm_plc" value="<bean:write name="ofcVO" property="sea_vol_wgt_dcm_plc"/>" maxlength="1" onKeyPress="onlyNumberCheck('.')" style="width:42px; text-align: center">
			                	<input type="hidden" name="h_sea_vol_wgt_rnd" value="<bean:write name="ofcVO" property="sea_vol_wgt_rnd"/>">
			                		<select name="i_sea_vol_wgt_rnd" style="width:150px;" OnChange="" required>
										<logic:iterate id="codeVO" name="round">
											<option value='<bean:write name="codeVO" property="cd_val"/>'><bean:write name="codeVO" property="cd_nm"/></option>
										</logic:iterate>
									</select>
				                </td>
			            </tr>
					</tbody>
				</table>
			</div>
		</div>
	</div>
					            
