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
	<div class="layout_wrap">
		<div class="layout_vertical_4" style="width:23%;">
			<div class="opus_design_inquiry">
				<h3 class="title_design" style="margin-bottom: 0;"><bean:message key="GL"/></h3>
				<table>
					<colgroup>
						<col width="100"></col>
						<col width="*"></col>
					</colgroup>
					<tbody>
						<tr>
			                <th><bean:message key="AR"/></th>
			                <td><!--
			                --><input type="hidden" name="h_gl_ar" value="<bean:write name="ofcVO" property="gl_ar"/>"><!--
			                --><select name="i_gl_ar" style="width:120px;" ><!--
			                --><option value=""><!--
			                --><logic:iterate id="glVO" name="cdList"><!--
			                --><option value='<bean:write name="glVO" property="gl_cd"/>'><bean:write name="glVO" property="gl_cd"/></option><!--
			                --></logic:iterate><!--
			                --></select></td>
			            </tr>
			            <tr>
			                <th><bean:message key="AP"/></th>
			                <td><!--
			                --><input type="hidden" name="h_gl_ap" value="<bean:write name="ofcVO" property="gl_ap"/>"><!--
			                --><select name="i_gl_ap" style="width:120px;" ><!--
			                --><option value=""><!--
			                --><logic:iterate id="glVO" name="cdList"><!--
			                --><option value='<bean:write name="glVO" property="gl_cd"/>'><bean:write name="glVO" property="gl_cd"/></option><!--
			                --></logic:iterate><!--
			                --></select></td>
			            </tr>
			            <tr>
			                <th id="th_debit_note"><bean:message key="Debit_Note"/></th>
			                <td><!--
			                --><input type="hidden" name="h_gl_agent_ar" value="<bean:write name="ofcVO" property="gl_agent_ar"/>"><!--
			                --><select name="i_gl_agent_ar" style="width:120px;" ><!--
			                --><option value=""><!--
			                --><logic:iterate id="glVO" name="cdList"><!--
			                --><option value='<bean:write name="glVO" property="gl_cd"/>'><bean:write name="glVO" property="gl_cd"/></option><!--
			                --></logic:iterate><!--
			                --></select></td>
			            </tr>
			            <tr id="tr_credit">
			                <th><bean:message key="Credit_Note"/></th>
			                <td><!--
			                --><input type="hidden" name="h_gl_agent_ap" value="<bean:write name="ofcVO" property="gl_agent_ap"/>"><!--
			                --><select name="i_gl_agent_ap" style="width:120px;" ><!--
			                --><option value=""><!--
			                --><logic:iterate id="glVO" name="cdList"><!--
			                --><option value='<bean:write name="glVO" property="gl_cd"/>'><bean:write name="glVO" property="gl_cd"/></option><!--
			                --></logic:iterate><!--
			                --></select></td>
			            </tr>
						<input type="hidden" name="h_gl_agent_oth" value="">
						<input type="hidden" name="i_gl_agent_oth" value="">
						<input type="hidden" name="h_gl_agent_oi" value="">
						<input type="hidden" name="i_gl_agent_oi" value="">
						<input type="hidden" name="h_gl_agent_oe" value="">
						<input type="hidden" name="i_gl_agent_oe" value="">
						<input type="hidden" name="h_gl_agent_ai" value="">
						<input type="hidden" name="i_gl_agent_ai" value="">
						<input type="hidden" name="h_gl_agent_ae" value="">
						<input type="hidden" name="i_gl_agent_ae" value="">
			            <tr>
			                <th><bean:message key="Retained_Earning"/></th>
			                <td><!--
			                --><input type="hidden" name="h_gl_re_earn" value="<bean:write name="ofcVO" property="gl_re_earn"/>"><!--
			                --><select name="i_gl_re_earn" style="width:120px;" ><!--
			                --><option value=""><!--
			                --><logic:iterate id="glVO" name="cdList"><!--
			                --><option value='<bean:write name="glVO" property="gl_cd"/>'><bean:write name="glVO" property="gl_cd"/></option><!--
			                --></logic:iterate><!--
			                --></select></td>
			            </tr>
			            <tr>
			                <th><bean:message key="Exchange_Profit"/></th>
			                <td><!--
			                --><input type="hidden" name="h_gl_ex_profit" value="<bean:write name="ofcVO" property="gl_ex_profit"/>"><!--
			                --><select name="i_gl_ex_profit" style="width:120px;" ><!--
			                --><option value=""><!--
			                --><logic:iterate id="glVO" name="cdList"><!--
			                --><option value='<bean:write name="glVO" property="gl_cd"/>'><bean:write name="glVO" property="gl_cd"/></option><!--
			                --></logic:iterate><!--
			                --></select></td>
			            </tr>
			            <tr>
			                <th><bean:message key="Exchange_Loss"/></th>
			                <td><!--
			                --><input type="hidden" name="h_gl_ex_loss" value="<bean:write name="ofcVO" property="gl_ex_loss"/>"><!--
			                --><select name="i_gl_ex_loss" style="width:120px;" ><!--
			                --><option value=""><!--
			                --><logic:iterate id="glVO" name="cdList"><!--
			                --><option value='<bean:write name="glVO" property="gl_cd"/>'><bean:write name="glVO" property="gl_cd"/></option><!--
			                --></logic:iterate><!--
			                --></select></td>
			            </tr>
			            <tr>
			                <th><bean:message key="Miscellaneous_Profit"/></th>
			                <td><!--
			                --><input type="hidden" name="h_gl_misc_profit" value="<bean:write name="ofcVO" property="gl_misc_profit"/>"><!--
			                --><select name="i_gl_misc_profit" style="width:120px;" ><!--
			                --><option value=""><!--
			                --><logic:iterate id="glVO" name="cdList"><!--
			                --><option value='<bean:write name="glVO" property="gl_cd"/>'><bean:write name="glVO" property="gl_cd"/></option><!--
			                --></logic:iterate><!--
			                --></select></td>
			            </tr>
			            <tr>
			                <th><bean:message key="Miscellaneous_Loss"/></th>
			                <td><!--
			                --><input type="hidden" name="h_gl_misc_loss" value="<bean:write name="ofcVO" property="gl_misc_loss"/>"><!--
			                --><select name="i_gl_misc_loss" style="width:120px;" ><!--
			                --><option value=""><!--
			                --><logic:iterate id="glVO" name="cdList"><!--
			                --><option value='<bean:write name="glVO" property="gl_cd"/>'><bean:write name="glVO" property="gl_cd"/></option><!--
			                --></logic:iterate><!--
			                --></select></td>
			            </tr>
			            <!-- #1437 [PATENT] 0215_23 Daily Block / Monthly Closing Additional Function -->
			            <tr>
			                <th><bean:message key="Foreign_Currency_Translation_Gain"/></th>
			                <td><!--
			                --><input type="hidden" name="h_gl_xcrt_gain" value="<bean:write name="ofcVO" property="gl_xcrt_gain"/>"><!--
			                --><select name="i_gl_xcrt_gain" style="width:120px;" ><!--
			                --><option value=""><!--
			                --><logic:iterate id="glVO" name="cdList"><!--
			                --><option value='<bean:write name="glVO" property="gl_cd"/>'><bean:write name="glVO" property="gl_cd"/></option><!--
			                --></logic:iterate><!--
			                --></select></td>
			            </tr>
			            <!-- #1437 [PATENT] 0215_23 Daily Block / Monthly Closing Additional Function -->
			            <tr>
			                <th><bean:message key="Foreign_Currency_Translation_Loss"/></th>
			                <td><!--
			                --><input type="hidden" name="h_gl_xcrt_lss" value="<bean:write name="ofcVO" property="gl_xcrt_lss"/>"><!--
			                --><select name="i_gl_xcrt_lss" style="width:120px;" ><!--
			                --><option value=""><!--
			                --><logic:iterate id="glVO" name="cdList"><!--
			                --><option value='<bean:write name="glVO" property="gl_cd"/>'><bean:write name="glVO" property="gl_cd"/></option><!--
			                --></logic:iterate><!--
			                --></select></td>
			            </tr>
			            <% /* [20150204 OJG] VAT - Accounting Configuration Comment %>
			            <tr>
			                <th><bean:message key="GL_VAT_Rev"/></th>
			                <td><!--
			                --><input type="hidden" name="h_gl_vat_rev" value="<bean:write name="ofcVO" property="gl_vat_rev"/>"><!--
			                --><select name="i_gl_vat_rev" style="width:120px;" ><!--
			                --><option value=""><!--
			                --><logic:iterate id="glVO" name="cdList"><!--
			                --><option value='<bean:write name="glVO" property="gl_cd"/>'><bean:write name="glVO" property="gl_cd"/></option><!--
			                --></logic:iterate><!--
			                --></select></td>
			            </tr>
			            <tr>
			                <th><bean:message key="GL_VAT_Cost"/></th>
			                <td><!--
			                --><input type="hidden" name="h_gl_vat_cost" value="<bean:write name="ofcVO" property="gl_vat_cost"/>"><!--
			                --><select name="i_gl_vat_cost" style="width:120px;" ><!--
			                --><option value=""><!--
			                --><logic:iterate id="glVO" name="cdList"><!--
			                --><option value='<bean:write name="glVO" property="gl_cd"/>'><bean:write name="glVO" property="gl_cd"/></option><!--
			                --></logic:iterate><!--
			                --></select></td>
			            </tr>
			            <tr>
			                <th><bean:message key="GL_VAT_Exp"/></th>
			                <td><!--
			                --><input type="hidden" name="h_gl_vat_exp" value="<bean:write name="ofcVO" property="gl_vat_exp"/>"><!--
			                --><select name="i_gl_vat_exp" style="width:120px;" ><!--
			                --><option value=""><!--
			                --><logic:iterate id="glVO" name="cdList"><!--
			                --><option value='<bean:write name="glVO" property="gl_cd"/>'><bean:write name="glVO" property="gl_cd"/></option><!--
			                --></logic:iterate><!--
			                --></select></td>
			            </tr>
			            <% */ %>
					</tbody>
				</table>
			</div>
		</div>
		
		<div class="layout_vertical_4 pad_left_8" style="width:28%;">
			<div class="opus_design_inquiry" >
				<h3 class="title_design" style="margin-bottom: 0;"><bean:message key="DC_Note_Profit_Share"/></h3>
				<table>
					<colgroup>
						<col width="100"></col>
						<col width="*"></col>
					</colgroup>
					<tbody>
						<tr>
			                <th><bean:message key="Agent_Profit_Share_Ocean_Import"/></th>
			                <td><!--
			                --><input type="hidden" name="h_gl_agent_ps_oi" value="<bean:write name="ofcVO" property="gl_agent_ps_oi"/>"><!--
			                --><select name="i_gl_agent_ps_oi" style="width:100px;" ><!--
			                --><option value=""><!--
			                --><logic:iterate id="frtCdVO" name="cdList1"><!--
			                --><option value='<bean:write name="frtCdVO" property="frt_cd"/>'><bean:write name="frtCdVO" property="frt_cd"/></option><!--
			                --></logic:iterate><!--
			                --></select></td>
			            </tr>
			            <tr>
			                <th><bean:message key="Agent_Profit_Share_Ocean_Export"/></th>
			                <td><!--
			                --><input type="hidden" name="h_gl_agent_ps_oe" value="<bean:write name="ofcVO" property="gl_agent_ps_oe"/>"><!--
			                --><select name="i_gl_agent_ps_oe" style="width:100px;" ><!--
			                --><option value=""><!--
			                --><logic:iterate id="frtCdVO" name="cdList1"><!--
			                --><option value='<bean:write name="frtCdVO" property="frt_cd"/>'><bean:write name="frtCdVO" property="frt_cd"/></option><!--
			                --></logic:iterate><!--
			                --></select></td>
			            </tr>
			            <tr>
			                <th><bean:message key="Agent_Profit_Share_Air_Import"/></th>
			                <td><!--
			                --><input type="hidden" name="h_gl_agent_ps_ai" value="<bean:write name="ofcVO" property="gl_agent_ps_ai"/>"><!--
			                --><select name="i_gl_agent_ps_ai" style="width:100px;" ><!--
			                --><option value=""><!--
			                --><logic:iterate id="frtCdVO" name="cdList1"><!--
			                --><option value='<bean:write name="frtCdVO" property="frt_cd"/>'><bean:write name="frtCdVO" property="frt_cd"/></option><!--
			                --></logic:iterate></select></td>
			            </tr>
			            <tr>
			                <th><bean:message key="Agent_Profit_Share_Air_Export"/></th>
			                <td><!--
			                --><input type="hidden" name="h_gl_agent_ps_ae" value="<bean:write name="ofcVO" property="gl_agent_ps_ae"/>"><!--
			                --><select name="i_gl_agent_ps_ae" style="width:100px;" ><!--
			                --><option value=""><!--
			                --><logic:iterate id="frtCdVO" name="cdList1"><!--
			                --><option value='<bean:write name="frtCdVO" property="frt_cd"/>'><bean:write name="frtCdVO" property="frt_cd"/></option><!--
			                --></logic:iterate></select></td>
			            </tr>
			            <tr>
			                <th><bean:message key="Agent_Profit_Share_Other"/></th>
			                <td><!--
			                --><input type="hidden" name="h_gl_agent_ps_oth" value="<bean:write name="ofcVO" property="gl_agent_ps_oth"/>"><!--
			                --><select name="i_gl_agent_ps_oth" style="width:100px;" ><!--
			                --><option value=""><!--
			                --><logic:iterate id="frtCdVO" name="cdList1"><!--
			                --><option value='<bean:write name="frtCdVO" property="frt_cd"/>'><bean:write name="frtCdVO" property="frt_cd"/></option><!--
			                --></logic:iterate><!--
			                --></select></td>
			            </tr>
			            <tr>
			                <th><bean:message key="OEM_Profit_Share"/></th>
			                <td nowrap>
			                	<input type="text" name="oem_pro_share" onkeyPress="onlyNumberCheck();" maxlength="5" value="<bean:write name="ofcVO" property="oem_pro_share" />" style="width:100px;text-align:right" > %
 	                	    </td>
			            </tr>
			            <tr>
			                <th><bean:message key="OEH_Profit_Share"/></th>
			                <td nowrap>
			                	<input type="text" name="oeh_pro_share" onkeyPress="onlyNumberCheck();" maxlength ="5" value="<bean:write name="ofcVO" property="oeh_pro_share" />" style="width:100px;text-align:right" > %
			                </td>
			            </tr>
			            <tr>
			                <th><bean:message key="OIM_Profit_Share"/></th>
			                <td nowrap>
			                	<input type="text" name="oim_pro_share" onkeyPress="onlyNumberCheck();" maxlength ="5" value="<bean:write name="ofcVO" property="oim_pro_share" />" style="width:100px;text-align:right" > %
			                </td>
			            </tr>
			            <tr>
			                <th><bean:message key="OIH_Profit_Share"/></th>
			                <td nowrap>
			                	<input type="text" name="oih_pro_share" onkeyPress="onlyNumberCheck();" maxlength ="5" value="<bean:write name="ofcVO" property="oih_pro_share" />" style="width:100px;text-align:right" > %
			                </td>
			            </tr>
			            <tr>
			                <th><bean:message key="AEH_Profit_Share"/></th>
			                <td nowrap>
			                	<input type="text" name="aeh_pro_share" onkeyPress="onlyNumberCheck();" maxlength ="5" value="<bean:write name="ofcVO" property="aeh_pro_share" />" style="width:100px;text-align:right" > %
			                </td>	
			            </tr>
					</tbody>
				</table>
				
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
				
			</div>
		</div>
		
		<div class="layout_vertical_4 pad_left_8" style="width:22%;">
			<div class="opus_design_inquiry" >
				<h3 class="title_design" style="margin-bottom: 0;"><bean:message key="Accounting_Options"/></h3>
				<table>
					<colgroup>
						<col width="100"></col>
						<col width="*"></col>
					</colgroup>
					<tbody>
						<tr>
			                <th><bean:message key="BL_Post_Date_Export"/></th>
			                <td><!--
			                --><input type="hidden" name="h_post_dt_exp" value="<bean:write name="ofcVO" property="post_dt_exp"/>"><!--
			                --><select name="i_post_dt_exp" style="width:100px;" OnChange=""><!--
			                --><logic:iterate id="codeVO" name="postDate"><!--
			                --><option value='<bean:write name="codeVO" property="cd_val"/>'><bean:write name="codeVO" property="cd_nm"/></option><!--
			                --></logic:iterate></select></td>
			            </tr>
			            <tr>
			                <th><bean:message key="BL_Post_Date_Import"/></th>
			                <td><!--
			                --><input type="hidden" name="h_post_dt_imp" value="<bean:write name="ofcVO" property="post_dt_imp"/>"><!--
			                --><select name="i_post_dt_imp" style="width:100px;" OnChange=""><!--
			                --><logic:iterate id="codeVO" name="impPostDate"><!--
			                --><option value='<bean:write name="codeVO" property="cd_val"/>'><bean:write name="codeVO" property="cd_nm"/></option><!--
			                --></logic:iterate></select></td>
			            </tr>
			            <!-- //#376 [ZEN] OFFICE CODE > ACCCOUTING OPTION > INVOICE POST DAET OPTION -->
			            <tr>
			                <th><bean:message key="Invoice_Post_Date"/></th>
			                <td><!--
			                --><input type="hidden" name="h_post_dt_acct" value="<bean:write name="ofcVO" property="post_dt_acct"/>"><!--
			                --><select name="i_post_dt_acct" style="width:100px;" OnChange=""><!--
			                --><logic:iterate id="codeVO" name="invRefDate"><!--
			                --><option value='<bean:write name="codeVO" property="cd_val"/>'><bean:write name="codeVO" property="cd_nm"/></option><!--
			                --></logic:iterate></select></td>
			            </tr>
			            <tr>
			                <th><bean:message key="Invoice_Date"/></th>
			                <td><!--
			                --><input type="hidden" name="h_post_dt_inv" value="<bean:write name="ofcVO" property="post_dt_inv"/>"><!--
			                --><select name="i_post_dt_inv" style="width:100px;" OnChange=""><!--
			                --><logic:iterate id="codeVO" name="invPostDate"><!--
			                --><option value='<bean:write name="codeVO" property="cd_val"/>'><bean:write name="codeVO" property="cd_nm"/></option><!--
			                --></logic:iterate></select></td>
			            </tr>
			            <tr>
			                <th><bean:message key="DC_Date"/></th>
			                <td><!--
			                --><input type="hidden" name="h_post_dt_crdr" value="<bean:write name="ofcVO" property="post_dt_crdr"/>"><!--
			                --><select name="i_post_dt_crdr" style="width:100px;" OnChange=""><!--
			                --><logic:iterate id="codeVO" name="invPostDate"><!--
			                --><option value='<bean:write name="codeVO" property="cd_val"/>'><bean:write name="codeVO" property="cd_nm"/></option><!--
			                --></logic:iterate></select></td>
			            </tr>
					</tbody>
				</table>
				
				<h3 class="title_design" style="margin-bottom: 0;"><bean:message key="Accounting_Decimal_Point"/></h3>
				<table>
					<colgroup>
						<col width="130"></col>
						<col width="*"></col>
					</colgroup>
					<tbody>
						<tr>
			                <th><bean:message key="Vat_Per"/></th>
			                <td><!--
			                --><input type="text" name="i_vat_rt_dp_cnt" onkeyPress="onlyNumberCheck();" maxlength ="2" value="<bean:write name="ofcVO" property="vat_rt_dp_cnt"/>" style="width:100px;text-align:right" >
			                </td>
			            </tr>
			            <tr>
			                <th><bean:message key="Ex_Rate"/></th>
			                <td><!--
			                --><input type="text" name="i_xch_rt_dp_cnt" onkeyPress="onlyNumberCheck();" maxlength ="2" value="<bean:write name="ofcVO" property="xch_rt_dp_cnt"/>" style="width:100px;text-align:right" >
			                </td>
			            </tr> 
					</tbody>
				</table>
				
				<!-- #1098 [BNX] INDIA 오피스 - 요구사항 항목 -->
				<h3 class="title_design" style="margin-bottom: 0;"><bean:message key="Tax_Option"/></h3>
				<table>
					<colgroup>
						<col width="130"></col>
						<col width="*"></col>
					</colgroup>
					<tbody>
						<tr>
			                <th><bean:message key="Tax_Count"/></th>
			                <td><!--
			                --><input type="hidden" name="h_tax_opt" value="<bean:write name="ofcVO" property="tax_opt"/>"><!--
			                --><select name="i_tax_opt" style="width:100px;"><!--
			                --><option value='1'>1</option><!--
			                --><option value='2'>2</option><!--
			                --><option value='3'>3</option><!--
			                --></select>			                
			                </td>
			            </tr>
					</tbody>
				</table>
				
				<h3 class="title_design" style="margin-bottom: 0;"><bean:message key="Journal_Currency_for_China"/></h3>
				<table>
					<colgroup>
						<col width="130"></col>
						<col width="*"></col>
					</colgroup>
					<tbody>
						<tr>
							<th><bean:message key="Currency"/>1</th>
			                <td><input name="i_jnr_dflt_curr_cd1" type="text"  dataformat="excepthan" style="width:70px;ime-mode:disabled;text-transform:uppercase;" maxlength="3" onKeyPress="ComKeyOnlyAlphabet('uppernum')" onKeyDown="codeNameAction('currency',this, 'onKeyDown')" onBlur="codeNameAction('currency',this, 'onBlur');strToUpper(this);" value="<bean:write name="ofcVO" property="jnr_dflt_curr_cd1"/>"><!--
			                --><button type="button" class="input_seach_btn" tabindex="-1" onclick="doWork('JNR_CURR_POPLIST1')""></button></td>
			            </tr> 
			            <tr>
							<th><bean:message key="Currency"/>2</th>
			                <td><input name="i_jnr_dflt_curr_cd2" type="text"  dataformat="excepthan" style="width:71px;ime-mode:disabled;text-transform:uppercase;" maxlength="3" onKeyPress="ComKeyOnlyAlphabet('uppernum')" onKeyDown="codeNameAction('currency',this, 'onKeyDown')" onBlur="codeNameAction('currency',this, 'onBlur');strToUpper(this);" value="<bean:write name="ofcVO" property="jnr_dflt_curr_cd2"/>"><!--
			                --><button type="button" class="input_seach_btn" tabindex="-1" onclick="doWork('JNR_CURR_POPLIST2')""></button></td>
			            </tr>  
			            <tr>
							<th><bean:message key="Currency"/>3</th>
			                <td><input name="i_jnr_dflt_curr_cd3" type="text"  dataformat="excepthan" style="width:71px;ime-mode:disabled;text-transform:uppercase;" maxlength="3" onKeyPress="ComKeyOnlyAlphabet('uppernum')" onKeyDown="codeNameAction('currency',this, 'onKeyDown')" onBlur="codeNameAction('currency',this, 'onBlur');strToUpper(this);" value="<bean:write name="ofcVO" property="jnr_dflt_curr_cd3"/>"><!--
			                --><button type="button" class="input_seach_btn" tabindex="-1" onclick="doWork('JNR_CURR_POPLIST3')""></button></td>
			            </tr>  
			            <tr>
							<th><bean:message key="Currency"/>4</th>
			                <td><input name="i_jnr_dflt_curr_cd4" type="text"  dataformat="excepthan" style="width:71px;ime-mode:disabled;text-transform:uppercase;" maxlength="3" onKeyPress="ComKeyOnlyAlphabet('uppernum')" onKeyDown="codeNameAction('currency',this, 'onKeyDown')" onBlur="codeNameAction('currency',this, 'onBlur');strToUpper(this);" value="<bean:write name="ofcVO" property="jnr_dflt_curr_cd4"/>"><!--
			                --><button type="button" class="input_seach_btn" tabindex="-1" onclick="doWork('JNR_CURR_POPLIST4')""></button></td>
			            </tr>  
			            <tr>
							<th><bean:message key="Currency"/>5</th>
			                <td><input name="i_jnr_dflt_curr_cd5" type="text"  dataformat="excepthan" style="width:71px;ime-mode:disabled;text-transform:uppercase;" maxlength="3" onKeyPress="ComKeyOnlyAlphabet('uppernum')" onKeyDown="codeNameAction('currency',this, 'onKeyDown')" onBlur="codeNameAction('currency',this, 'onBlur');strToUpper(this);" value="<bean:write name="ofcVO" property="jnr_dflt_curr_cd5"/>"><!--
			                --><button type="button" class="input_seach_btn" tabindex="-1" onclick="doWork('JNR_CURR_POPLIST5')""></button></td>
			            </tr>   
					</tbody>
				</table>
				
			</div>
		</div>
		
		<div class="layout_vertical_4 pad_left_8" style="width:27%;">
			<div class="opus_design_inquiry" >
				<h3 class="title_design" style="margin-bottom: 0;"><bean:message key="Ocean_PIERPASS"/></h3>
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
			                <th><bean:message key="Rate"/></th>
			                <td><!--
			                -->20'&nbsp;<!--
			                --><input type="text" name="i_pps_cntr20_rt" maxlength="17" value="<bean:write name="ofcVO" property="pps_cntr20_rt"/>" class="search_form zero_remove" onKeyPress="onlyNumberCheck('.')" onchange="numberCommaLen(this,14,2);chkComma(this,14,2);" dataformat="excepthan" style="ime-mode:disabled;width:50px;text-align:right"><!--
			                --><bean:message key="Over"/> 40'&nbsp;<!--
			                --><input type="text" name="i_pps_cntr40_rt" maxlength="17" value="<bean:write name="ofcVO" property="pps_cntr40_rt"/>" class="search_form zero_remove" onKeyPress="onlyNumberCheck('.')" onchange="numberCommaLen(this,14,2);chkComma(this,14,2);" dataformat="excepthan" style="ime-mode:disabled;width:50px;text-align:right"><!--
			                --><bean:message key="CBM"/>&nbsp;<!--
			                --><input type="text" name="i_pps_cbm_rt"    maxlength="17" value="<bean:write name="ofcVO" property="pps_cbm_rt"/>" class="search_form zero_remove" onKeyPress="onlyNumberCheck('.')" onchange="numberCommaLen(this,14,2);chkComma(this,14,2);" dataformat="excepthan" style="ime-mode:disabled;width:50px;text-align:right"></td>
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
			            	<th><bean:message key="Rate"/></th>
			                <td><!--
			                -->20'&nbsp;<!--
			                --><input type="text" name="i_ctf_cntr20_rt" maxlength="17" value="<bean:write name="ofcVO" property="ctf_cntr20_rt"/>" class="search_form zero_remove" onKeyPress="onlyNumberCheck('.')" onchange="numberCommaLen(this,14,2);chkComma(this,14,2);" dataformat="excepthan" style="ime-mode:disabled;width:50px;text-align:right"><!--
			                --><bean:message key="Over"/> 40'&nbsp;<!--
			                --><input type="text" name="i_ctf_cntr40_rt" maxlength="17" value="<bean:write name="ofcVO" property="ctf_cntr40_rt"/>" class="search_form zero_remove" onKeyPress="onlyNumberCheck('.')" onchange="numberCommaLen(this,14,2);chkComma(this,14,2);" dataformat="excepthan" style="ime-mode:disabled;width:50px;text-align:right"><!--
			                --><bean:message key="CBM"/>&nbsp;<!--
			                --><input type="text" name="i_ctf_cbm_rt"    maxlength="17" value="<bean:write name="ofcVO" property="ctf_cbm_rt"/>" class="search_form zero_remove" onKeyPress="onlyNumberCheck('.')" onchange="numberCommaLen(this,14,2);chkComma(this,14,2);" dataformat="excepthan" style="ime-mode:disabled;width:50px;text-align:right"></td>
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
			            	<th><bean:message key="Rate"/></th>
			            	<td><!--
			                -->20'&nbsp;<!--
			                --><input type="text" name="i_cf_cntr20_rt" maxlength="17" value="<bean:write name="ofcVO" property="cf_cntr20_rt"/>" class="search_form zero_remove" onKeyPress="onlyNumberCheck('.')" onchange="numberCommaLen(this,14,2);chkComma(this,14,2);" dataformat="excepthan" style="ime-mode:disabled;width:50px;text-align:right"><!--
			                --><bean:message key="Over"/> 40'&nbsp;<!--
			                --><input type="text" name="i_cf_cntr40_rt" maxlength="17" value="<bean:write name="ofcVO" property="cf_cntr40_rt"/>" class="search_form zero_remove" onKeyPress="onlyNumberCheck('.')" onchange="numberCommaLen(this,14,2);chkComma(this,14,2);" dataformat="excepthan" style="ime-mode:disabled;width:50px;text-align:right"><!--
			                --><bean:message key="CBM"/>&nbsp;<!--
			                --><input type="text" name="i_cf_cbm_rt"    maxlength="17" value="<bean:write name="ofcVO" property="cf_cbm_rt"/>" class="search_form zero_remove" onKeyPress="onlyNumberCheck('.')" onchange="numberCommaLen(this,14,2);chkComma(this,14,2);" dataformat="excepthan" style="ime-mode:disabled;width:50px;text-align:right"></td>
			            </tr>
					</tbody>
				</table>
			</div>
		</div>
	</div>
					            
