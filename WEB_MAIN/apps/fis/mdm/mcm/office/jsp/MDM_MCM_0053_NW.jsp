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
		<button type="button" class="btn_normal" onclick="doWork('SAVE')" id="btnSave"><bean:message key="Save"/></button>
	</div>
 -->	
 <div class="layout_wrap">
	<div class="layout_vertical_2" style="width:400px;">
		<div class="opus_design_inquiry" style="height: 300px;">
			<h3 class="title_design" style="margin-bottom: 0;"><bean:message key="Bank_Setup"/></h3>
			<table>
				<colgroup>
					<col width="150"></col>
					<col width="*"></col>
				</colgroup>
				<tbody>
					<tr>
		                <th><bean:message key="Default_Revenue_Bank"/></th>
		                <td><!--
		                --><input type="hidden" name="h_rvn_bank_seq" value="<bean:write name="ofcVO" property="rvn_bank_seq"/>"><!--
		                --><select id="i_rvn_bank_seq" name="i_rvn_bank_seq" style="width:150px;" ><!--
		                --><option value=""><!--
		                --><logic:iterate id="bankVO" name="bankList"><!--
		                --><option value='<bean:write name="bankVO" property="bank_seq"/>'><bean:write name="bankVO" property="bank_nm"/></option><!--
		                --></logic:iterate><!--
		                --></select></td>
		            </tr>
		            <tr>
		                <th><bean:message key="Default_Cost_Bank"/></th>
		                <td><!--
		                --><input type="hidden" name="h_cost_bank_seq" value="<bean:write name="ofcVO" property="cost_bank_seq"/>"><!--
		                --><select id="i_cost_bank_seq" name="i_cost_bank_seq" style="width:150px;" ><!--
		                --><option value=""><!--
		                --><logic:iterate id="bankVO" name="bankList"><!--
		                --><option value='<bean:write name="bankVO" property="bank_seq"/>'><bean:write name="bankVO" property="bank_nm"/></option><!--
		                --></logic:iterate><!--
		                --></select></td>
		            </tr>
				</tbody>
			</table>
			<h3 class="title_design" style="margin-bottom: 0;"><bean:message key="Warehouse"/></h3>
			<table>
				<colgroup>
					<col width="150"></col>
					<col width="*"></col>
				</colgroup>
				<tbody>
					<tr>
		                <th><bean:message key="W/H"/> <bean:message key="Storage"/> <bean:message key="Code"/></th>
		                <td><!--
		                --><input type="hidden" name="h_wh_sto_acc_cd" value="<bean:write name="ofcVO" property="wh_sto_acc_cd"/>"><!--
		                --><select name="i_wh_sto_acc_cd" style="width:150px;" ><!--
		                --><option value=""></option><!--
		                --><logic:iterate id="codeVO" name="wmsFreightCode"><!--
		                --><option value='<bean:write name="codeVO" property="frt_cd"/>'><bean:write name="codeVO" property="frt_cd"/> : <bean:write name="codeVO" property="frt_cd_nm"/></option><!--
		                --></logic:iterate></select></td><!--
		                --></select></td>
		            </tr>
				</tbody>
			</table>
			<h3 class="title_design" style="margin-bottom: 0;"><bean:message key="Accounting_Decimal_Point"/></h3>
			<table>
				<colgroup>
					<col width="150"></col>
					<col width="*"></col>
				</colgroup>
				<tbody>
					<tr>
		                <th><bean:message key="Vat_Per"/></th>
		                <td><!--
		                --><input type="text" name="i_vat_rt_dp_cnt" onkeyPress="onlyNumberCheck();" maxlength ="2" value="<bean:write name="ofcVO" property="vat_rt_dp_cnt"/>" style="width:150px;text-align:right" >
		                </td>
		            </tr>
		            <tr>
		                <th><bean:message key="Ex_Rate"/></th>
		                <td><!--
		                --><input type="text" name="i_xch_rt_dp_cnt" onkeyPress="onlyNumberCheck();" maxlength ="2" value="<bean:write name="ofcVO" property="xch_rt_dp_cnt"/>" style="width:150px;text-align:right" >
		                </td>
		            </tr> 
				</tbody>
			</table>
			
			<!-- #1098 [BNX] INDIA 오피스 - 요구사항 항목 -->
			<h3 class="title_design" style="margin-bottom: 0;"><bean:message key="Tax_Option"/></h3>
			<table>
				<colgroup>
					<col width="150"></col>
					<col width="*"></col>
				</colgroup>
				<tbody>
					<tr>
		                <th><bean:message key="Tax_Count"/></th>
		                <td><!--
		                --><input type="hidden" name="h_tax_opt" value="<bean:write name="ofcVO" property="tax_opt"/>"><!--
		                --><select name="i_tax_opt" style="width:150px;"><!--
		                --><option value='1'>1</option><!--
		                --><option value='2'>2</option><!--
		                --><option value='3'>3</option><!--
		                --></select>			                
		                </td>
		            </tr>
				</tbody>
			</table>
	</div>
	</div>	
	
	<div class="layout_vertical_2 pad_left_8" style="width:400px;">
		<div class="opus_design_inquiry" style="height: 300px;">
			<h3 class="title_design" style="margin-bottom: 0;"><bean:message key="Ocean_PIERPASS"/>
				<button type="button" class="btn_alert floatR" onclick="doWork('SAVE')" id="btnSave">&nbsp;&nbsp;<bean:message key="Save"/>&nbsp;&nbsp;</button>
			</h3>
			<table>
				<colgroup>
					<col width="120"></col>
					<col width="*"></col>
				</colgroup>
				<tbody>
					<tr>
						<th><bean:message key="Use_YN"/></th>
						<td>
							<input name="i_pps_use_flg" id="i_pps_use_flg" type="checkbox" value="<bean:write name="ofcVO" property="pps_use_flg"/>" onClick="flgChange(this);"></td>
						</td>
					</tr>
					<tr>
		                <th><bean:message key="Pay_To"/></th>
		                <td><!--
		                --><input name="i_pps_payto_trdp_cd" value='<bean:write name="ofcVO" property="pps_payto_trdp_cd"/>' type="text"  onKeyDown="codeNameAction('trdpcode',this, 'onKeyDown')" onBlur="codeNameAction('trdpcode',this, 'onBlur');javascript:this.value=this.value.toUpperCase();" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:42px;" onblur="strToUpper(this);"><!--
		                --><button type="button" class="input_seach_btn" tabindex="-1" id="payto" onClick="doWork('PPS_PAYTO_POPLIST',this)"></button><!--
		                --><input type="text" name="i_pps_payto_trdp_nm" value='<bean:write name="ofcVO" property="pps_payto_trdp_nm"/>'  dataformat="excepthan" style="ime-mode:disabled;width:180px;text-transform:uppercase;" onblur="strToUpper(this)" onKeyPress="if(event.keyCode==13){doWork('PPS_PAYTO_POPLIST_NAME', frm1.i_pps_payto_trdp_nm.value);}" maxlength="50"></td>
		            </tr>
		            <tr>
		                <th><bean:message key="Rate_20"/></th>
		                <td>
		                	<input type="text" name="i_pps_cntr20_rt" maxlength="16" value="<bean:write name="ofcVO" property="pps_cntr20_rt"/>" class="search_form zero_remove" onKeyPress="onlyNumberCheck('.')" onchange="numberCommaLen(this,14,2);chkComma(this,14,2);" dataformat="excepthan" style="ime-mode:disabled;width:50px;text-align:right">
		                	<bean:message key="Over_40"/>&nbsp;
		                	<input type="text" name="i_pps_cntr40_rt" maxlength="16" value="<bean:write name="ofcVO" property="pps_cntr40_rt"/>" class="search_form zero_remove" onKeyPress="onlyNumberCheck('.')" onchange="numberCommaLen(this,14,2);chkComma(this,14,2);" dataformat="excepthan" style="ime-mode:disabled;width:50px;text-align:right">
		                	<bean:message key="CBM"/>&nbsp;
		                	<input type="text" name="i_pps_cbm_rt"    maxlength="16" value="<bean:write name="ofcVO" property="pps_cbm_rt"/>" class="search_form zero_remove" onKeyPress="onlyNumberCheck('.')" onchange="numberCommaLen(this,14,2);chkComma(this,14,2);" dataformat="excepthan" style="ime-mode:disabled;width:50px;text-align:right">
		                </td>
		            </tr>
				</tbody>
			</table>
			<h3 class="title_design" style="margin-bottom: 0;"><bean:message key="CLEAN_TRUCK_FEE"/></h3>
			<table>
				<colgroup>
					<col width="120"></col>
					<col width="*"></col>
				</colgroup>
				<tbody>
					<tr>
						<th><bean:message key="Use_YN"/></th>
						<td>
							<input name="i_ctf_use_flg" id="i_ctf_use_flg" type="checkbox" value="<bean:write name="ofcVO" property="ctf_use_flg"/>" onClick="flgChange(this);"></td>
						</td>
					</tr>
					<tr>
		                <th><bean:message key="Pay_To"/></th>
		                <td><!--
		                --><input name="i_ctf_payto_trdp_cd" value='<bean:write name="ofcVO" property="ctf_payto_trdp_cd"/>' type="text"  onKeyDown="codeNameAction('trdpcode',this, 'onKeyDown')" onBlur="codeNameAction('trdpcode',this, 'onBlur');javascript:this.value=this.value.toUpperCase();" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:42px;" onblur="strToUpper(this);"><!--
		                --><button type="button" class="input_seach_btn" tabindex="-1" id="payto" onClick="doWork('CTF_PAYTO_POPLIST',this)"></button><!--
		                --><input type="text" name="i_ctf_payto_trdp_nm" value='<bean:write name="ofcVO" property="ctf_payto_trdp_nm"/>'  dataformat="excepthan" style="ime-mode:disabled;width:180px;text-transform:uppercase;" onblur="strToUpper(this)" onKeyPress="if(event.keyCode==13){doWork('CTF_PAYTO_POPLIST_NAME', frm1.i_ctf_payto_trdp_nm.value);}" maxlength="50"></td>
		            </tr>
		            <tr>
		            	<th><bean:message key="Rate_20"/></th>
		                <td>	
		               		<input type="text" name="i_ctf_cntr20_rt" maxlength="16" value="<bean:write name="ofcVO" property="ctf_cntr20_rt"/>" class="search_form zero_remove" onKeyPress="onlyNumberCheck('.')" onchange="numberCommaLen(this,14,2);chkComma(this,14,2);" dataformat="excepthan" style="ime-mode:disabled;width:50px;text-align:right">	
		               		<bean:message key="Over_40"/>&nbsp;
		                	<input type="text" name="i_ctf_cntr40_rt" maxlength="16" value="<bean:write name="ofcVO" property="ctf_cntr40_rt"/>" class="search_form zero_remove" onKeyPress="onlyNumberCheck('.')" onchange="numberCommaLen(this,14,2);chkComma(this,14,2);" dataformat="excepthan" style="ime-mode:disabled;width:50px;text-align:right">	
		                	<bean:message key="CBM"/>&nbsp;	
		                	<input type="text" name="i_ctf_cbm_rt"    maxlength="16" value="<bean:write name="ofcVO" property="ctf_cbm_rt"/>" class="search_form zero_remove" onKeyPress="onlyNumberCheck('.')" onchange="numberCommaLen(this,14,2);chkComma(this,14,2);" dataformat="excepthan" style="ime-mode:disabled;width:50px;text-align:right"></td>
		            </tr>
				</tbody>
			</table>
			<h3 class="title_design" style="margin-bottom: 0;"><bean:message key="CHASSIS_FEE"/></h3>
			<table>
				<colgroup>
					<col width="120"></col>
					<col width="*"></col>
				</colgroup>
				<tbody>
					<tr>
						<th><bean:message key="Use_YN"/></th>
						<td>
							<input name="i_cf_use_flg" id="i_cf_use_flg" type="checkbox" value="<bean:write name="ofcVO" property="cf_use_flg"/>" onClick="flgChange(this);"></td>
						</td>
					</tr>
					<tr>
		                <th><bean:message key="Pay_To"/></th>
		                <td><!--
		                --><input name="i_cf_payto_trdp_cd" value='<bean:write name="ofcVO" property="cf_payto_trdp_cd"/>' type="text"  onKeyDown="codeNameAction('trdpcode',this, 'onKeyDown')" onBlur="codeNameAction('trdpcode',this, 'onBlur');javascript:this.value=this.value.toUpperCase();" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:42px;" onblur="strToUpper(this);"><!--
		                --><button type="button" class="input_seach_btn" tabindex="-1" id="payto" onClick="doWork('CF_PAYTO_POPLIST',this)"></button><!--
		                --><input type="text" name="i_cf_payto_trdp_nm" value='<bean:write name="ofcVO" property="cf_payto_trdp_nm"/>'  dataformat="excepthan" style="ime-mode:disabled;width:180px;text-transform:uppercase;" onblur="strToUpper(this)" onKeyPress="if(event.keyCode==13){doWork('CF_PAYTO_POPLIST_NAME', frm1.i_cf_payto_trdp_nm.value);}" maxlength="50"></td>
		            </tr>
		            <tr>
		            	<th><bean:message key="Rate_20"/></th>
		            	<td>
		                	<input type="text" name="i_cf_cntr20_rt" maxlength="16" value="<bean:write name="ofcVO" property="cf_cntr20_rt"/>" class="search_form zero_remove" onKeyPress="onlyNumberCheck('.')" onchange="numberCommaLen(this,14,2);chkComma(this,14,2);" dataformat="excepthan" style="ime-mode:disabled;width:50px;text-align:right">
		              	 	<bean:message key="Over_40"/>&nbsp;
		                	<input type="text" name="i_cf_cntr40_rt" maxlength="16" value="<bean:write name="ofcVO" property="cf_cntr40_rt"/>" class="search_form zero_remove" onKeyPress="onlyNumberCheck('.')" onchange="numberCommaLen(this,14,2);chkComma(this,14,2);" dataformat="excepthan" style="ime-mode:disabled;width:50px;text-align:right">
		               		<bean:message key="CBM"/>&nbsp;
		                	<input type="text" name="i_cf_cbm_rt"    maxlength="16" value="<bean:write name="ofcVO" property="cf_cbm_rt"/>" class="search_form zero_remove" onKeyPress="onlyNumberCheck('.')" onchange="numberCommaLen(this,14,2);chkComma(this,14,2);" dataformat="excepthan" style="ime-mode:disabled;width:50px;text-align:right">
		                </td>
		            </tr>
				</tbody>
			</table>
		</div>
	</div>
		

</div>
<div class="layout_wrap">
	<div class="layout_wrap" style="width:1340px">
		<div class="layout_vertical_3" style="width:30%;">
				<div class="wrap_result">
		        	<div class="opus_design_grid">
		        		<div class="opus_design_btn">
						     <button type="button" class="btn_normal" onClick="doWork('SAVE_ACCT_GL')"><bean:message key="Save"/></button>
						</div>
						<!-- opus_design_btn(E) -->
		        		<script type="text/javascript">comSheetObject('sheet1');</script>
		        	</div>
				</div>
		</div>
		<div class="layout_vertical_3 pad_left_8" style="width:40%;">
				<div class="wrap_result">
		        <!-- opus_design_grid(E) -->
		        	<div class="opus_design_grid">
		        		<div class="opus_design_btn">
						     <button type="button" class="btn_normal" onClick="doWork('SAVE_PRF_SHR')"><bean:message key="Save"/></button>
						</div>
						<!-- opus_design_btn(E) -->
		        		<script type="text/javascript">comSheetObject('sheet2');</script>
		        	</div>
				</div>
		</div>
		<div class="layout_vertical_3 pad_left_8" style="width:30%;">
				<div class="wrap_result">
		        <!-- opus_design_grid(E) -->
		        	<div class="opus_design_grid">
		        		<div class="opus_design_btn">
						     <button type="button" class="btn_normal" onClick="doWork('SAVE_ACCT_OPT')"><bean:message key="Save"/></button>
						</div>
						<!-- opus_design_btn(E) -->
		        		<script type="text/javascript">comSheetObject('sheet3');</script>
		        	</div>
				</div>
		</div>	
	</div>
</div>

	