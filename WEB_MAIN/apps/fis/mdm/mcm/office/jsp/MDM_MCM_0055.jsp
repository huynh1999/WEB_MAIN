<%--
=========================================================
*Copyright(c) 2009 CyberLogitec. All Rights Reserved.
=========================================================
=========================================================
*@FileName   : SEE_BMD_0025.jsp
*@FileTitle  : HGBL등록 > Work Order
*@Description: Work Order 등록화면
*@author     : Kang,Jung-Gu
*@version    : 1.0 - 09/28/2009
*@since      :

*@Change history:
=========================================================
--%>
	<div class="layout_wrap">
		<div class="layout_vertical_2"  style="width:500px">
			<div class="opus_design_inquiry">
				<table>
					<colgroup>
						<col width="200px"></col>
						<col width="100px"></col>
						<col width="*"></col>
					</colgroup>
					<tbody>
						<tr>
							<td><h3 class="title_design" style="margin-bottom: 0;"><bean:message key="Ocean"/></h3></td>
							<td colspan="2"></td>
							</tr>
						<tr>
							<td><h3 class="title_design mar_top_8" style="margin-bottom: 0;"><bean:message key="OI_AN_Additional_Remark"/></h3></td>
							<td align="right"><!--
							--><input type="hidden"  value="Font Size" onblur="strToUpper(this);" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:70px;border:0;background-color:transparent;"><!--
							--><input type="hidden" name="h_oi_an_font_size" value="<bean:write name="ofcVO" property="oi_an_font_size"/>"><!--
							--><select name="i_oi_an_font_size" style="width:70px; display: none" OnChange=""><!--
							--><logic:iterate id="codeVO" name="fontSize"><!--
							--><option value='<bean:write name="codeVO" property="cd_val"/>'><bean:write name="codeVO" property="cd_nm"/></option><!--
							--></logic:iterate><!--
							--></select></td>
							<td></td>
						</tr>
						<tr>
						    <td colspan="3"><!--
							--><textarea name="i_oi_an_rmk" maxlength="1500" onkeypress="keyPress_maxLength(this);" onkeyup="keyUp_maxLength(this);" onblur="strToUpper(this);" dataformat="excepthan" style="width:494px;height:50px"><bean:write name="ofcVO" property="oi_an_rmk"/></textarea></td>
							<td></td>
						</tr>
						<tr>
			                <th>OI <bean:message key="Cargo_Release"/></th>
			                <td><input name="i_oi_cgor_pic_info" type="text" maxlength="200"  onblur="strToUpper(this);" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;ime-mode:disabled;width:248px;text-align:left" value="<bean:write name="ofcVO" property="oi_cgor_pic_info"/>"></td>
			           		<td></td>
			            </tr>
			            <tr>
							<th><bean:message key="1st_Description_LCL"/></th>
			            	<td>
			                	<textarea name="i_oi_an_lcl_desc"  onblur="strToUpper(this);" maxlength="400" onkeypress="keyPress_maxLength(this);" onkeyup="keyUp_maxLength(this);"  dataformat="excepthan" style="width:248px;height:32px">
<bean:write name="ofcVO" property="oi_an_lcl_desc"/></textarea>
			                </td>
			           		<td></td>
			            </tr>
			            <tr>
			                <th><bean:message key="1st_Description_FCL"/></th>
			                <td>
			                	<textarea name="i_oi_an_fcl_desc"  onblur="strToUpper(this);" maxlength="400" onkeypress="keyPress_maxLength(this);" onkeyup="keyUp_maxLength(this);"  dataformat="excepthan" style="width:248px;height:32px">
<bean:write name="ofcVO" property="oi_an_fcl_desc"/></textarea>
							</td>
			           		<td></td>
						</tr>
						<tr>
							<td><h3 class="title_design mar_top_8" style="margin-bottom: 0;"><bean:message key="Export_BL_Body_Default"/></h3></td>
							<td colspan="2"></td>
						</tr>
						<tr>
			            	<th><bean:message key="AS_AGENT_FOR_THE_CARRIER"/></th>
			                <td><input name="i_sea_body" type="text" maxlength="200" onblur="strToUpper(this);" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:248px;ime-mode:disabled;" value="<bean:write name="ofcVO" property="sea_body"/>"></td>
							<td></td>
						</tr>
						<tr>
			                <th><bean:message key="1st_Description_LCL"/></th>
			                <td>
			                	<textarea name="i_sea_lcl_desc"  onblur="strToUpper(this);" maxlength="200" onkeypress="keyPress_maxLength(this);" onkeyup="keyUp_maxLength(this);"  dataformat="excepthan" style="width:248px;height:32px">
<bean:write name="ofcVO" property="sea_lcl_desc"/></textarea>
			                </td>
			           		<td></td>
			            </tr>
			            <tr>
			                <th><bean:message key="1st_Description_FCL"/></th>
			                <td>
			                	<textarea name="i_sea_fcl_desc"  onblur="strToUpper(this);" maxlength="200" onkeypress="keyPress_maxLength(this);" onkeyup="keyUp_maxLength(this);"  dataformat="excepthan" style="width:248px;height:32px">
<bean:write name="ofcVO" property="sea_fcl_desc"/></textarea>
							</td>
			           		<td></td>
			           </tr>
			            <tr>
			                <th><bean:message key="Clean_On_Board"/></th>
			                <td><input name="i_sea_cob" type="text" maxlength="200"  onblur="strToUpper(this);" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;ime-mode:disabled;width:248px;text-align:left" value="<bean:write name="ofcVO" property="sea_cob"/>"></td>
			            	<td></td>	
			            </tr>
			            <tr>
			                <th><bean:message key="Master_Export_Instruction"/></th>
			                <td><!--
							--><input name="i_sea_mei" type="text" maxlength="200"  onblur="strToUpper(this);" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;ime-mode:disabled;width:248px;text-align:left" value="<bean:write name="ofcVO" property="sea_mei"/>"></td>
			           		<td></td>
			            </tr>
			             <tr>
			                <th><bean:message key="Master_Set_CO"/></th>
			                <td><!--
							--><input name="i_sea_msco" type="text" maxlength="200"  onblur="strToUpper(this);" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;ime-mode:disabled;width:248px;text-align:left" value="<bean:write name="ofcVO" property="sea_msco"/>"></td>
			            	<td></td>
			            </tr>
			             <tr>
			                <th><bean:message key="Cargo_Desc_Lcl"/></th>
			                <td><!--
							--><input name="i_lcl_cgo_desc" type="text" maxlength="200"  onblur="strToUpper(this);" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;ime-mode:disabled;width:248px;text-align:left" value="<bean:write name="ofcVO" property="lcl_cgo_desc"/>"></td>
			            	<td></td>
			            </tr>
			            <tr>
			                <td ><!--
							--><input name="i_vsl_show_flg" id="i_vsl_show_flg" type="checkbox" onclick="flgChange(this);" value="<bean:write name="ofcVO" property="vsl_show_flg"/>"><label for="i_vsl_show_flg"><bean:message key="Show_Vessel"/></label><!--
							-->&nbsp;&nbsp;&nbsp;&nbsp;<!--
							--><input name="i_load_port_show_flg" id="i_load_port_show_flg" type="checkbox" onclick="flgChange(this);" value="<bean:write name="ofcVO" property="load_port_show_flg"/>"><label for="i_load_port_show_flg"><bean:message key="Show_Loading_Port"/></label><!--
							--><input type="hidden" name="i_cntr_40hq_desc"/><!--
							--><input type="hidden" name="i_cntr_45_desc"/><!--
							--></td>
							<td></td>
							<td></td>
			            </tr>
					</tbody>
				</table>
			</div>
		</div>
		
		<div class="layout_vertical_2 pad_left_8">
			<div class="opus_design_inquiry" style="height: 342px;">
				<table width="100%">
					<colgroup>
						<col width="102px"></col>
						<col width="220px"></col>
						<col width="*"></col>
					</colgroup>
					<tbody>
						<tr>
							<td><h3 class="title_design" style="margin-bottom: 0;"><bean:message key="Air"/></h3></td>
							<td></td>
							<td></td>
						</tr>
						<tr>
							<td><h3 class="title_design mar_top_8" style="margin-bottom: 0;"><bean:message key="AI_AN_Additional_Remark"/></h3></td>
							<td align="right"><!--
							--><input type="hidden"  value="Font Size" onblur="strToUpper(this);" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:70px;border:0;background-color:transparent;"><!--
							--><input type="hidden" name="h_ai_an_font_size" value="<bean:write name="ofcVO" property="ai_an_font_size"/>"><!--
							--><select name="i_ai_an_font_size" style="width:70px; display: none" OnChange=""><!--
							--><logic:iterate id="codeVO" name="fontSize"><!--
							--><option value='<bean:write name="codeVO" property="cd_val"/>'><bean:write name="codeVO" property="cd_nm"/></option><!--
							--></logic:iterate><!--
							--></select></td>
							<td></td>
						</tr>
						<tr>
			                <td colspan="3"><textarea name="i_ai_an_rmk" maxlength="1500" onkeypress="keyPress_maxLength(this);" onkeyup="keyUp_maxLength(this);" onblur="strToUpper(this);" dataformat="excepthan" style="width:450px;height:50px"><bean:write name="ofcVO" property="ai_an_rmk"/></textarea>
		        			</td>
			            </tr>
			            <tr>
			                <th>AI <bean:message key="Cargo_Release"/></th>
			                <td><input name="i_ai_cgor_pic_info" type="text" maxlength="200"  onblur="strToUpper(this);" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;ime-mode:disabled;width:267px;text-align:left" value="<bean:write name="ofcVO" property="ai_cgor_pic_info"/>"></td>
			           		<td></td>
			            </tr>
						<tr>
							<td><h3 class="title_design mar_top_8" style="margin-bottom: 0;"><bean:message key="HAWB_Print"/></h3></td>
							<td></td>
							<td></td>
						</tr>
						<tr>
			                <th><bean:message key="AS_AGENT_OF_THE_CARRIER"/></th>
			                <td><input name="i_air_body" type="text" maxlength="200" onblur="strToUpper(this);" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:267px;text-transform:uppercase;ime-mode:disabled;" value="<bean:write name="ofcVO" property="air_body"/>"></td>
			            </tr>
			            
						<tr>
							<td colspan="2"><h3 class="title_design mar_top_8" style="margin-bottom: 0;"><bean:message key="AEM_Handling_Information"/></h3></td>
							<td></td>
						</tr>
						<tr>
			                <td colspan="3"><textarea name="i_aem_hand_info" maxlength="1000" onkeypress="keyPress_maxLength(this);" onkeyup="keyUp_maxLength(this);" onblur="strToUpper(this);" dataformat="excepthan" style="width:450px;height:50px"><bean:write name="ofcVO" property="aem_hand_info"/></textarea></td>
			            </tr>
			            
			            <tr>
							<td colspan="2"><h3 class="title_design mar_top_8" style="margin-bottom: 0;"><bean:message key="AEH_Handling_Information"/></h3></td>
							<td></td>
						</tr>
						<tr>
			                <td colspan="3"><textarea name="i_aeh_hand_info" maxlength="1000" onkeypress="keyPress_maxLength(this);" onkeyup="keyUp_maxLength(this);" onblur="strToUpper(this);" dataformat="excepthan" style="width:450px;height:50px"><bean:write name="ofcVO" property="aeh_hand_info"/></textarea></td>
			            </tr>
					</tbody>
				</table>
			</div>
		</div>
	</div>
	<div class="opus_design_inquiry pad_top_8">
		<table>
			<colgroup>
				<col width="190px"></col>
				<col></col>
			</colgroup>
			<tbody>
				<tr>
					<td><h3 class="title_design" style="margin-bottom: 0;"><bean:message key="Default_AN_Public_Memo"/></h3></td>
				</tr>
				<tr>
				<!-- #6939 [EXEL]Could not create House ocean import -->
	                <td colspan="2" ><textarea name="i_dflt_an_memo" maxlength="1000" onkeypress="keyPress_maxLength(this);" onkeyup="keyUp_maxLength(this);" onblur="strToUpper(this);" dataformat="excepthan" style="width:100%;height:100px"><bean:write name="ofcVO" property="dflt_an_memo"/></textarea>
        			</td>
	            </tr>
			</tbody>
		</table>
	</div>
	
	<div class="opus_design_grid">
		<h3 class="title_design"><bean:message key="Ocean_Export_HBL_Remark"/></h3>
		<div class="opus_design_btn">
		     <button type="button" class="btn_normal" onClick="doWork('REMARK')"><bean:message key="Add"/></button>
		     <button type="button" class="btn_normal" onClick="doWork('DEL')"><bean:message key="Del"/></button>
		</div>
		<div><script language="javascript">comSheetObject('sheet1');</script></div>
	</div>
