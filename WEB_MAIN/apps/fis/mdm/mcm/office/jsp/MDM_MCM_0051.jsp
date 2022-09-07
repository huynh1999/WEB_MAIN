<%--
=========================================================
*Copyright(c) 2009 CyberLogitec. All Rights Reserved.
=========================================================
=========================================================
*@FileName   : SEE_BMD_0020.jsp
*@FileTitle  : HGBL등록
*@Description: HBL 등록 및 조회
*@author     : Kang,Jung-Gu
*@version    : 1.0 - 09/28/2009
*@since      :

*@Change history:
=========================================================
--%>

	<div class="layout_wrap">
		<div class="layout_vertical_3" style="height: 657px;">
			<div class="opus_design_inquiry">
				<h3 class="title_design" style="margin-bottom: 0px;"><bean:message key="Basic_Information"/></h3>
				<table>
					<colgroup>
						<col width="123"></col>
						<col width="110"></col>
						<col width="45"></col>
						<col width="*"></col>
					</colgroup>
					<tbody>
						<tr>
			                <th><bean:message key="Office_Code"/></th>
			                <td><input name="i_ofc_cd" type="text" maxlength="5" required dataformat="excepthan" style="width:50px;text-transform:uppercase;ime-mode:disabled;" onKeyPress="ComKeyOnlyAlphabet('uppernum')" onBlur="javascript:this.value=this.value.toUpperCase();" value="<bean:write name="ofcVO" property="ofc_cd"/>"></td>
					        <td colspan="2"><label for="i_use_flg"><b><bean:message key="Use_YN"/></b></label><input name="i_use_flg" id="i_use_flg" type="checkbox" value="<bean:write name="ofcVO" property="use_flg"/>" onClick="flgChange(this);"></td>
		            	</tr>
		            	<tr>
			                <th><bean:message key="Country_Code"/></th>
			                <td colspan="4"><!--
			                --><input name="i_cnt_cd" type="text"  dataformat="excepthan" style="width:50px;text-transform:uppercase;ime-mode:disabled;" maxlength="2" onKeyDown="codeNameAction('country',this, 'onKeyDown')" onKeyPress="ComKeyOnlyAlphabet('uppernum')" onBlur="codeNameAction('country',this, 'onBlur');strToUpper(this);" value="<bean:write name="ofcVO" property="cnt_cd"/>"><!--
			                --><button type="button" class="input_seach_btn" tabindex="-1" onclick="doWork('COUNTRY_POPLIST', 'I')"></button><!--
			                --><input name="i_cnt_nm" type="text" class="search_form-disable" dataformat="excepthan" style="ime-mode:disabled;width:190px;text-align:left" value="<bean:write name="ofcVO" property="cnt_nm"/>" readOnly></td>
			            </tr>
			            <tr>
			                <th><bean:message key="State_Code"/></th>
			                <td colspan="4"><!--
			                --><input name="i_state_cd" maxlength="2" type="text"  dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:50px;" onKeyDown="codeNameAction('state',this, 'onKeyDown')" onBlur="codeNameAction('state',this, 'onBlur');strToUpper(this);" value="<bean:write name="ofcVO" property="state_cd"/>"><!--
			                --><button type="button" class="input_seach_btn" tabindex="-1" onclick="doWork('STATE_POPLIST', 'I')"></button><!--
			                --><input name="i_state_nm" type="text" class="search_form-disable" dataformat="excepthan" style="ime-mode:disabled;width:190px;text-align:left" value="<bean:write name="ofcVO" property="state_nm"/>" readOnly></td>
			            </tr>
			            <tr>
		                	<th><bean:message key="City"/></th>
		                	<td colspan="4"><!--
			                --><input name="i_loc_cd" maxlength="5" type="text"  dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:50px;" onKeyDown="codeNameAction('location',this, 'onKeyDown')" onBlur="codeNameAction('location',this, 'onBlur');strToUpper(this);" value="<bean:write name="ofcVO" property="loc_cd"/>"><!--
			                --><button type="button" class="input_seach_btn" tabindex="-1" onclick="doWork('LOCATION_POPLIST', 'I')"></button><!--
			                --><input name="i_loc_nm" type="text" class="search_form-disable" dataformat="excepthan" style="ime-mode:disabled;width:190px;text-align:left" value="<bean:write name="ofcVO" property="loc_nm"/>" readOnly></td>
		                </tr>
			            <tr>
			                <th><bean:message key="Parent_Office_Code"/></th>
			                <td colspan="4"><!--
			                --><input name="i_prnt_ofc_cd" type="text"  dataformat="excepthan" style="width:50px;text-transform:uppercase;ime-mode:disabled;" maxlength="5" onKeyDown="codeNameAction('office',this, 'onKeyDown')" onKeyPress="ComKeyOnlyAlphabet('uppernum')" onBlur="codeNameAction('office',this, 'onBlur');strToUpper(this);" value="<bean:write name="ofcVO" property="prnt_ofc_cd"/>"><!--
			                --><button type="button" class="input_seach_btn" tabindex="-1" onclick="doWork('OFFICE_POPLIST', 'I')"></button><!--
			                --><input name="i_prnt_ofc_nm" type="text" class="search_form-disable" dataformat="excepthan" style="ime-mode:disabled;width:190px;text-align:left" value="<bean:write name="ofcVO" property="prnt_ofc_nm"/>" readOnly></td>
			            </tr>
			            <tr>
			                <th><bean:message key="Sales_Office"/></th>
			                <td colspan="4"><!--
			                --><input name="i_sls_ofc_cd" type="text"  dataformat="excepthan" style="width:50px;text-transform:uppercase;ime-mode:disabled;" maxlength="5" onKeyDown="codeNameAction('office',this, 'onKeyDown')" onBlur="codeNameAction('office',this, 'onBlur');strToUpper(this);" value="<bean:write name="ofcVO" property="sls_ofc_cd"/>"><!--
			                --><button type="button" class="input_seach_btn" tabindex="-1" onclick="doWork('OFFICE_POPLIST2', 'I')"></button><!--
			                --><input name="i_sls_ofc_nm" type="text" class="search_form-disable" dataformat="excepthan" style="ime-mode:disabled;width:190px;text-align:left" value="<bean:write name="ofcVO" property="sls_ofc_nm"/>" readOnly></td>
			            </tr>
			             <tr>
			                <th><bean:message key="Financial_Office"/></th>
			                <td colspan="4"><!--
			                --><input name="i_finc_ofc_cd" type="text"  dataformat="excepthan" style="width:50px;text-transform:uppercase;ime-mode:disabled;" maxlength="5" onKeyDown="codeNameAction('office',this, 'onKeyDown')" onKeyPress="ComKeyOnlyAlphabet('uppernum')" onBlur="codeNameAction('office',this, 'onBlur');strToUpper(this);" value="<bean:write name="ofcVO" property="finc_ofc_cd"/>"><!--
			                --><button type="button" class="input_seach_btn" tabindex="-1" onclick="doWork('OFFICE_POPLIST3')"></button><!--
			                --><input name="i_finc_ofc_nm" type="text" class="search_form-disable" dataformat="excepthan" style="ime-mode:disabled;width:190px;text-align:left" value="<bean:write name="ofcVO" property="finc_ofc_nm"/>" readOnly></td>
			            </tr>
			            <tr>
			            	<!--  #138 2017.01.10 Local Currency add start-->
							<th><bean:message key="Tariff_Currency_Code"/></th>
							<td colspan="4"><input name="i_trf_cur_cd" type="text"  dataformat="excepthan" style="width:50px;ime-mode:disabled;text-transform:uppercase;" maxlength="3" onKeyPress="ComKeyOnlyAlphabet('uppernum')" onKeyDown="codeNameAction('currency',this, 'onKeyDown')" onBlur="codeNameAction('currency',this, 'onBlur');strToUpper(this);" value="<bean:write name="ofcVO" property="trf_cur_cd"/>"><!--
			                --><button type="button" class="input_seach_btn" tabindex="-1" onclick="doWork('CURRENCY_POPLIST')"></button><!-- 
			                --><b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<bean:message key="Local_Currency_Code"/></b>
			                <input name="i_locl_cur_cd" type="text"  dataformat="excepthan" style="width:52px;ime-mode:disabled;text-transform:uppercase;" maxlength="3" onKeyPress="ComKeyOnlyAlphabet('uppernum')" onKeyDown="codeNameAction('currency',this, 'onKeyDown')" onBlur="codeNameAction('currency',this, 'onBlur');strToUpper(this);" value="<bean:write name="ofcVO" property="locl_curr_cd"/>"><!--
			                --><button type="button" class="input_seach_btn" tabindex="-1" onclick="doWork('CURRENCY_LOCAL_POPLIST')""></button>
			                </td>
			                <!--  #138 2017.01.10 Local Currency add end-->
						</tr>

						<tr>
					        <th><bean:message key="Name_Eng"/></th>
					        <td colspan="4"><input name="i_ofc_eng_nm" type="text" required dataformat="excepthan" style="width:273px;ime-mode:disabled;text-transform:uppercase;" onBlur="javascript:this.value=this.value.toUpperCase();" maxlength="100" value="<bean:write name="ofcVO" property="ofc_eng_nm"/>" onChange="javascript:strRepnm(this);"></td>
					    </tr>
					    <tr>
					    <!-- #1323 [CLT] Office Code- Local Name 항목 다국어 입력 누락 -->
					        <th><bean:message key="Name_Local"/></th>
					        <td colspan="4"><input name="i_ofc_locl_nm" type="text"  dataformat="multiLanguage" style="<%=MULTI_IMEMODE%>width:273px;text-transform:uppercase;" onBlur="javascript:this.value=this.value.toUpperCase();" maxlength="100" value="<bean:write name="ofcVO" property="ofc_locl_nm"/>"></td>
					    </tr>
					    <tr>
					        <th><bean:message key="Name_Representing"/></th>
					        <td colspan="4"><input name="i_ofc_rep_nm" type="text"  dataformat="excepthan" style="width:273px;ime-mode:isabled;text-transform:uppercase;" onBlur="javascript:this.value=this.value.toUpperCase();" maxlength="100" value="<bean:write name="ofcVO" property="ofc_rep_nm"/>"></td>
					    </tr>
					    <tr>
					        <th><bean:message key="Description"/><br></th>
					        <td colspan="4"><textarea name="i_descr"  onblur="strToUpper(this);keyPress_maxLength(this);" dataformat="excepthan" style="width:273px;height:29px;" maxlength="200" onKeyPress="keyPress_maxLength(this);"><bean:write name="ofcVO" property="descr"/></textarea>
					        </td>
					    </tr>
					    <tr>
					        <th><bean:message key="Address"/><br></th>
					        <td colspan="4"><textarea name="i_ofc_addr"  onblur="strToUpper(this);keyPress_maxLength(this);" dataformat="excepthan" style="width:273px;height:51px;" maxlength="200" onKeyPress="keyPress_maxLength(this);"><bean:write name="ofcVO" property="ofc_addr"/></textarea>
					        </td>
					    </tr>
					    <tr>
			                <th><bean:message key="Zip"/></th>
			                <td><input name="i_ofc_zip"  id="i_ofc_zip" dataformat="excepthan" type="text"  style="width:100px;"  onblur="validateValue(this)" value="<bean:write name="ofcVO" property="ofc_zip"/>" maxlength="10"></td>
			                <th><bean:message key="Phone"/></td>
			                <td><input name="i_ofc_phn"   id="i_ofc_phn" type="text"  dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:118px;" onblur="strToUpper(this);validateValue(this);" value="<bean:write name="ofcVO" property="ofc_phn"/>" maxlength="20"></td>
			            </tr>
			            
			             <tr>
			                <th><bean:message key="Fax"/></th>
			                <td><input name="i_ofc_fax"   id="i_ofc_fax" type="text"  dataformat="excepthan"  onblur="validateValue(this)" style="ime-mode:disabled; text-transform:uppercase;width:100px;" value="<bean:write name="ofcVO" property="ofc_fax"/>" maxlength="20"></td>
		                	<th><bean:message key="Email"/></th>
			                <td><input name="i_ofc_email" type="text"  style="width:118px;" value="<bean:write name="ofcVO" property="ofc_email"/>" maxlength="50"></td>
			            </tr>
			             <tr>
			                <th><bean:message key="URL"/></th>
			                <td colspan="4"><input name="i_ofc_url" type="text"  style="width:273px;" value="<bean:write name="ofcVO" property="ofc_url"/>" maxlength="200"></td>
			            </tr>
			            <tr>
			                <th><bean:message key="OFFICE_TIME_ZONE"/></th>
			                <td colspan="4"><input type="hidden" name="h_time_zone" value="<bean:write name="ofcVO" property="time_zone"/>">
			                		<select name="i_time_zone" style="width:273px;" OnChange="" required><option value=""><!--
									--><logic:iterate id="codeVO" name="cdList_tz"><!--
									--><option value='<bean:write name="codeVO" property="cd_val"/>'><bean:write name="codeVO" property="cd_nm"/></option><!--
									--></logic:iterate><!--
									--></select></td>
			            </tr>			            
			            <tr>
			                <th><bean:message key="IATA_FMC_No"/></th>
			                <td colspan="4"><!--
			                --><input name="i_iata_cd" type="text" dataformat="excepthan" onBlur="javascript:this.value=this.value.toUpperCase();" style="ime-mode:disabled; text-transform:uppercase;width:100px;" value="<bean:write name="ofcVO" property="iata_cd"/>" maxlength="20"><!--
			                --><input name="i_fmc_no" type="text" dataformat="excepthan" onBlur="javascript:this.value=this.value.toUpperCase();" style="ime-mode:disabled; text-transform:uppercase;width:100px;" value="<bean:write name="ofcVO" property="fmc_no"/>" maxlength="20"></td>
			            </tr>
			            <tr>
			                <th><bean:message key="TAX_ID_Type_No"/></th>
			                <td colspan="4"><!--
			                --><input type="hidden" name="h_tax_type" value="<bean:write name="ofcVO" property="tax_type"/>"><!--
			                --><select name="i_tax_type" style="width:100px;" OnChange=""><!--
			                --><logic:iterate id="codeVO" name="taxType"><!--
			                --><option value='<bean:write name="codeVO" property="cd_val"/>'><bean:write name="codeVO" property="cd_nm"/></option><!--
			                --></logic:iterate><!--
			                --></select><!--
			                --><input name="i_tax_no" type="text" dataformat="excepthan" onBlur="javascript:this.value=this.value.toUpperCase();" style="ime-mode:disabled; text-transform:uppercase;width:100px;" value="<bean:write name="ofcVO" property="tax_no"/>" maxlength="20"></td>
			            </tr>

			            <tr>
			                <th><bean:message key="TSA_Security_No"/></th>
			                <td colspan="4">
			                <input name="i_tsa_sec_no" type="text" dataformat="excepthan" onBlur="javascript:this.value=this.value.toUpperCase();" style="ime-mode:disabled; text-transform:uppercase;width:100px;" value="<bean:write name="ofcVO" property="tsa_sec_no"/>" maxlength="15"></td>
			            </tr>
			            
			            <!-- #673 
			            <tr>
			                <th>NIP</th>
			                <td colspan="4">
			                <input name="i_nip" type="text" dataformat="excepthan" onBlur="javascript:this.value=this.value.toUpperCase();" style="ime-mode:disabled; text-transform:uppercase;width:100px;" value="<bean:write name="ofcVO" property="nip"/>" maxlength="15"></td>
			            </tr>
			            <tr>
			                <th>VAT ID-UE</th>
			                <td colspan="4">
			                <input name="i_vat_id_ue" type="text" dataformat="excepthan" onBlur="javascript:this.value=this.value.toUpperCase();" style="ime-mode:disabled; text-transform:uppercase;width:100px;" value="<bean:write name="ofcVO" property="vat_id_ue"/>" maxlength="15"></td>
			            </tr>
			             #673 -->
			            
			            <tr>
			                <th><bean:message key="USE_BL_SERIAL"/></th>
			                <td colspan="4">
			                <input name="i_use_hbl_ser" type="checkbox" value="<bean:write name="ofcVO" property="use_hbl_ser"/>" onClick="flgChange(this);"></td>
			                </td>
			            </tr>			            
					</tbody>
				</table>
			</div>
		</div>
		
		 <div class="layout_vertical_3 pad_left_8">
		 	<div class="opus_design_inquiry">
		 		<h3 class="title_design" style="margin-bottom: 0px;"><bean:message key="Prefix"/></h3>
		 	
	            <table>
					<colgroup>
						<col width="200"></col>
						<col width="*"></col>
					</colgroup>
					<tbody>
						<tr>
			                <th></th>
			                <td id="prfx_modify" ><label for="i_prfx_modify_flg" style="width:80px;"><b><bean:message key="Modify"/></b></label><input name="i_prfx_modify_flg" id="i_prfx_modify_flg" type="checkbox" value="N" onClick="modifyPrfxFlgChange(this);"></td>
		            	</tr>

			            </tr>
						<tr>
			                <th><bean:message key="Invoice_No"/></th>
			                <td><!--
			                --><input name="i_inv_prfx" type="text"  dataformat="excepthan" style="width:80px;text-transform:uppercase;ime-mode:disabled;" maxlength="10" value="<bean:write name="ofcVO" property="inv_prfx"/>" onBlur="javascript:this.value=this.value.toUpperCase();"><!--
			                --><input name="i_inv_seq_no" type="text"  onkeyPress="onlyNumberCheck();" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:80px;text-align:left" maxlength="10" value="<bean:write name="ofcVO" property="inv_seq_no"/>"></td>
			            </tr>
			            <tr>
			                <th><bean:message key="DC_Note_No"/></th>
			                <td><!--
			                --><input name="i_crdr_prfx" type="text"  dataformat="excepthan" style="width:80px;text-transform:uppercase;ime-mode:disabled;" maxlength="10" value="<bean:write name="ofcVO" property="crdr_prfx"/>" onBlur="javascript:this.value=this.value.toUpperCase();"><!--
			                --><input name="i_crdr_seq_no" type="text"  onkeyPress="onlyNumberCheck();" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:80px;text-align:left" maxlength="10" value="<bean:write name="ofcVO" property="crdr_seq_no"/>"></td>
			            </tr>
			            <tr>
			                <th><bean:message key="Ocean_Import_Filing_No"/></th>
			                <td><!--
			                --><input name="i_oi_ref_prfx" type="text"  dataformat="excepthan" style="width:80px;text-transform:uppercase;ime-mode:disabled;" maxlength="10" value="<bean:write name="ofcVO" property="oi_ref_prfx"/>" onBlur="javascript:this.value=this.value.toUpperCase();"><!--
			                --><input name="i_oi_ref_seq_no" type="text"  onkeyPress="onlyNumberCheck();" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:80px;text-align:left" maxlength="10" value="<bean:write name="ofcVO" property="oi_ref_seq_no"/>"><!--  
			                --><label for="i_oi_ref_ymd_prfx" style="width:80px;"><b>YYMM</b></label><input name="i_oi_ref_ymd_prfx" id="i_oi_ref_ymd_prfx" type="checkbox" value="<bean:write name="ofcVO" property="oi_ref_ymd_prfx"/>" onClick="ymdFlgChange(this);"><!--
			                -->&nbsp;&nbsp;&nbsp;<select name="i_oi_ref_ymd_seq" style="width: 35px;" val="<bean:write name="ofcVO" property="oi_ref_ymd_seq"/>">
			                       <option value=""></option>
			                       <option value="2">2</option>
			                       <option value="3">3</option>
			                       <option value="4">4</option>
			                       <option value="5">5</option>
			                       <option value="6">6</option>
			                       <option value="7">7</option>
			                   </select>
			                </td>
			            </tr>
			            <tr>
			                <th><bean:message key="Ocean_Export_Filing_No"/></th>
			                <td><!--
			                --><input name="i_oe_ref_prfx" type="text"  dataformat="excepthan" style="width:80px;text-transform:uppercase;ime-mode:disabled;" maxlength="10" value="<bean:write name="ofcVO" property="oe_ref_prfx"/>" onBlur="javascript:this.value=this.value.toUpperCase();"><!--
			                --><input name="i_oe_ref_seq_no" type="text"  onkeyPress="onlyNumberCheck();" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:80px;text-align:left" maxlength="10" value="<bean:write name="ofcVO" property="oe_ref_seq_no"/>"><!--  
			                --><label for="i_oe_ref_ymd_prfx" style="width:80px;"><b>YYMM</b></label><input name="i_oe_ref_ymd_prfx" id="i_oe_ref_ymd_prfx" type="checkbox" value="<bean:write name="ofcVO" property="oe_ref_ymd_prfx"/>" onClick="ymdFlgChange(this);"><!--
			                -->&nbsp;&nbsp;&nbsp;<select name="i_oe_ref_ymd_seq" style="width: 35px;" val="<bean:write name="ofcVO" property="oe_ref_ymd_seq"/>">
			                       <option value=""></option>
			                       <option value="2">2</option>
			                       <option value="3">3</option>
			                       <option value="4">4</option>
			                       <option value="5">5</option>
			                       <option value="6">6</option>
			                       <option value="7">7</option>
			                   </select>
			                </td>
			            </tr>
			            <tr>
			                <th><bean:message key="Air_Import_Filing_No"/></th>
			                <td><!--
			                --><input name="i_ai_ref_prfx" type="text"  dataformat="excepthan" style="width:80px;text-transform:uppercase;ime-mode:disabled;" maxlength="10" value="<bean:write name="ofcVO" property="ai_ref_prfx"/>" onBlur="javascript:this.value=this.value.toUpperCase();"><!--
			                --><input name="i_ai_ref_seq_no" type="text"  onkeyPress="onlyNumberCheck();" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:80px;text-align:left" maxlength="10" value="<bean:write name="ofcVO" property="ai_ref_seq_no"/>"><!--  
			                --><label for="i_ai_ref_ymd_prfx" style="width:80px;"><b>YYMM</b></label><input name="i_ai_ref_ymd_prfx" id="i_ai_ref_ymd_prfx" type="checkbox" value="<bean:write name="ofcVO" property="ai_ref_ymd_prfx"/>" onClick="ymdFlgChange(this);"><!--
			                -->&nbsp;&nbsp;&nbsp;<select name="i_ai_ref_ymd_seq" style="width: 35px;" val="<bean:write name="ofcVO" property="ai_ref_ymd_seq"/>">
			                       <option value=""></option>
			                       <option value="2">2</option>
			                       <option value="3">3</option>
			                       <option value="4">4</option>
			                       <option value="5">5</option>
			                       <option value="6">6</option>
			                       <option value="7">7</option>
			                   </select>
			                </td>
			            </tr>
			            <tr>
			                <th><bean:message key="Air_Export_Filing_No"/></th>
			                <td><!--
			                --><input name="i_ae_ref_prfx" type="text"  dataformat="excepthan" style="width:80px;text-transform:uppercase;ime-mode:disabled;" maxlength="10" value="<bean:write name="ofcVO" property="ae_ref_prfx"/>" onBlur="javascript:this.value=this.value.toUpperCase();"><!--
			                --><input name="i_ae_ref_seq_no" type="text"  onkeyPress="onlyNumberCheck();" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:80px;text-align:left" maxlength="10" value="<bean:write name="ofcVO" property="ae_ref_seq_no"/>"><!--  
			                --><label for="i_ae_ref_ymd_prfx" style="width:80px;"><b>YYMM</b></label><input name="i_ae_ref_ymd_prfx" id="i_ae_ref_ymd_prfx" type="checkbox" value="<bean:write name="ofcVO" property="ae_ref_ymd_prfx"/>" onClick="ymdFlgChange(this);"><!--
			                -->&nbsp;&nbsp;&nbsp;<select name="i_ae_ref_ymd_seq" style="width: 35px;" val="<bean:write name="ofcVO" property="ae_ref_ymd_seq"/>">
			                       <option value=""></option>
			                       <option value="2">2</option>
			                       <option value="3">3</option>
			                       <option value="4">4</option>
			                       <option value="5">5</option>
			                       <option value="6">6</option>
			                       <option value="7">7</option>
			                   </select>
			                </td>
			            </tr>
			            <tr>
			                <th><bean:message key="Air_Export_HAWB_No"/></th>
			                <td><!--
			                --><input name="i_ae_awb_prfx" type="text"  dataformat="excepthan" style="width:80px;text-transform:uppercase;ime-mode:disabled;" maxlength="10" value="<bean:write name="ofcVO" property="ae_awb_prfx"/>" onBlur="javascript:this.value=this.value.toUpperCase();"><!--
			                --><input name="i_ae_awb_seq_no" type="text"  onkeyPress="onlyNumberCheck();" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:80px;text-align:left" maxlength="10" value="<bean:write name="ofcVO" property="ae_awb_seq_no"/>"><!--
			                --><label for="i_ae_awb_ymd_pfx" style="width:80px;"><b>YYMM</b></label><input name="i_ae_awb_ymd_pfx" id="i_ae_awb_ymd_pfx" type="checkbox" value="<bean:write name="ofcVO" property="ae_awb_ymd_pfx"/>" onClick="ymdFlgChange(this);"><!--
			                -->&nbsp;&nbsp;&nbsp;<select name="i_ae_awb_ymd_seq" style="width: 35px;" val="<bean:write name="ofcVO" property="ae_awb_ymd_seq"/>">
			                       <option value=""></option>
			                       <option value="2">2</option>
			                       <option value="3">3</option>
			                       <option value="4">4</option>
			                       <option value="5">5</option>
			                       <option value="6">6</option>
			                       <option value="7">7</option>
			                   </select>
			                </td>
			            </tr>
			            <tr>
			                <th><bean:message key="Ocean_Export_HBL_No"/></th>
			                <td><!--
			                --><input name="i_oe_hbl_prfx" type="text"  dataformat="excepthan" style="width:80px;text-transform:uppercase;ime-mode:disabled;" maxlength="10" value="<bean:write name="ofcVO" property="oe_hbl_prfx"/>" onBlur="javascript:this.value=this.value.toUpperCase();"><!--
			                --><input name="i_oe_hbl_seq_no" type="text"  onkeyPress="onlyNumberCheck();" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:80px;text-align:left" maxlength="10" value="<bean:write name="ofcVO" property="oe_hbl_seq_no"/>"><!--
			                --><label for="i_oe_hbl_ymd_prfx" style="width:80px;"><b>YYMM</b></label><input name="i_oe_hbl_ymd_prfx" id="i_oe_hbl_ymd_prfx" type="checkbox" value="<bean:write name="ofcVO" property="oe_hbl_ymd_prfx"/>" onClick="ymdFlgChange(this);"><!--
			                -->&nbsp;&nbsp;&nbsp;<select name="i_oe_hbl_ymd_seq" style="width: 35px;" val="<bean:write name="ofcVO" property="oe_hbl_ymd_seq"/>">
			                       <option value=""></option>
			                       <option value="2">2</option>
			                       <option value="3">3</option>
			                       <option value="4">4</option>
			                       <option value="5">5</option>
			                       <option value="6">6</option>
			                       <option value="7">7</option>
			                   </select><!-- 
			                 --></td>
			            </tr>
			            <tr>
			                <th><bean:message key="Carrier_Booking_No"/></th>
			                <td><!--
			                --><input name="i_oe_lnr_bkg_prfx" type="text"  dataformat="excepthan" style="width:80px;text-transform:uppercase;ime-mode:disabled;" maxlength="10" value="<bean:write name="ofcVO" property="oe_lnr_bkg_prfx"/>" onBlur="javascript:this.value=this.value.toUpperCase();"><!--
			                --><input name="i_oe_lnr_bkg_seq_no" type="text"  onkeyPress="onlyNumberCheck();" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:80px;text-align:left" maxlength="10" value="<bean:write name="ofcVO" property="oe_lnr_bkg_seq_no"/>"><!--
			                --><label for="i_oe_lnr_bkg_ymd_prfx" style="width:80px;"><b>YYMM</b></label><input name="i_oe_lnr_bkg_ymd_prfx" id="i_oe_lnr_bkg_ymd_prfx" type="checkbox" value="<bean:write name="ofcVO" property="oe_lnr_bkg_ymd_prfx"/>" onClick="ymdFlgChange(this);"><!--
			                -->&nbsp;&nbsp;&nbsp;<select name="i_oe_lnr_bkg_ymd_seq" style="width: 35px;" val="<bean:write name="ofcVO" property="oe_lnr_bkg_ymd_seq"/>">
			                       <option value=""></option>
			                       <option value="2">2</option>
			                       <option value="3">3</option>
			                       <option value="4">4</option>
			                       <option value="5">5</option>
			                       <option value="6">6</option>
			                       <option value="7">7</option>
			                   </select><!--
			                --></td>
			            </tr>
			            <tr>
			                <th><bean:message key="Customer_Booking_No"/></th>
			                <td><!--
			                --><input name="i_oe_bkg_prfx" type="text"  dataformat="excepthan" style="width:80px;text-transform:uppercase;ime-mode:disabled;" maxlength="10" value="<bean:write name="ofcVO" property="oe_bkg_prfx"/>" onBlur="javascript:this.value=this.value.toUpperCase();"><!--
			                --><input name="i_oe_bkg_seq_no" type="text"  onkeyPress="onlyNumberCheck();" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:80px;text-align:left" maxlength="10" value="<bean:write name="ofcVO" property="oe_bkg_seq_no"/>"><!--
			                --><label for="i_oe_bkg_ymd_prfx" style="width:80px;"><b>YYMM</b></label><input name="i_oe_bkg_ymd_prfx" id="i_oe_bkg_ymd_prfx" type="checkbox" value="<bean:write name="ofcVO" property="oe_bkg_ymd_prfx"/>" onClick="ymdFlgChange(this);"><!--
			                -->&nbsp;&nbsp;&nbsp;<select name="i_oe_bkg_ymd_seq" style="width: 35px;" val="<bean:write name="ofcVO" property="oe_bkg_ymd_seq"/>">
			                       <option value=""></option>
			                       <option value="2">2</option>
			                       <option value="3">3</option>
			                       <option value="4">4</option>
			                       <option value="5">5</option>
			                       <option value="6">6</option>
			                       <option value="7">7</option>
			                   </select><!-- 
			                --></td>
			            </tr>
			            <!-- 
			            <tr>
			                <th><bean:message key="Air_Export_Booking_No"/></th>
			                <td>
			                	<input name="i_ae_bkg_prfx" type="text"  dataformat="excepthan" style="width:80px;text-transform:uppercase;ime-mode:disabled;" maxlength="10" value="<bean:write name="ofcVO" property="ae_bkg_prfx"/>" onBlur="javascript:this.value=this.value.toUpperCase();">
			                	<input name="i_ae_bkg_seq_no" type="text"  onkeyPress="onlyNumberCheck();" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:80px;text-align:left" maxlength="10" value="<bean:write name="ofcVO" property="ae_bkg_seq_no"/>"></td>
			            </tr> -->
			            <tr>
			                <th><bean:message key="Ocean_Quotation_No"/></th>
			                <td><!--
			                --><input name="i_sea_quo_prfx" type="text"  dataformat="excepthan" style="width:80px;text-transform:uppercase;ime-mode:disabled;" maxlength="10" value="<bean:write name="ofcVO" property="sea_quo_prfx"/>" onBlur="javascript:this.value=this.value.toUpperCase();"><!--
			                --><input name="i_sea_quo_seq_no" type="text"  onkeyPress="onlyNumberCheck();" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:80px;text-align:left" maxlength="10" value="<bean:write name="ofcVO" property="sea_quo_seq_no"/>">
			                </td>
			            </tr>
			            <tr>
			                <th><bean:message key="Air_Quotation_No"/></th>
			                <td><!--
			                --><input name="i_air_quo_prfx" type="text"  dataformat="excepthan" style="width:80px;text-transform:uppercase;ime-mode:disabled;" maxlength="10" value="<bean:write name="ofcVO" property="air_quo_prfx"/>" onBlur="javascript:this.value=this.value.toUpperCase();"><!--
			                --><input name="i_air_quo_seq_no" type="text"  onkeyPress="onlyNumberCheck();" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:80px;text-align:left" maxlength="10" value="<bean:write name="ofcVO" property="air_quo_seq_no"/>"></td>
			            </tr>
			            <tr>
			                <th><bean:message key="Warehouse_Receipt_No"/></th>
			                <td><!--
			                --><input name="i_wh_rcpt_prfx" type="text"  dataformat="excepthan" style="width:80px;text-transform:uppercase;ime-mode:disabled;" maxlength="10" value="<bean:write name="ofcVO" property="wh_rcpt_prfx"/>" onBlur="javascript:this.value=this.value.toUpperCase();"><!--
			                --><input name="i_wh_rcpt_seq_no" type="text"  onkeyPress="onlyNumberCheck();" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:80px;text-align:left" maxlength="10" value="<bean:write name="ofcVO" property="wh_rcpt_seq_no"/>"></td>
			            </tr>
			             <!-- Vinh.Vo 2015/02/01 (S) -->
			            <tr>
			                <th><bean:message key="Warehouse_Receiving_File_No"/></th>
			                <td><!--
			                --><input name="i_wh_rcv_prfx" type="text"  dataformat="excepthan" style="width:80px;text-transform:uppercase;ime-mode:disabled;" maxlength="10" value="<bean:write name="ofcVO" property="wh_rcv_prfx"/>" onBlur="javascript:this.value=this.value.toUpperCase();"><!--
			                --><input name="i_wh_rcv_seq_no" type="text"  onkeyPress="onlyNumberCheck();" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:80px;text-align:left" maxlength="10" value="<bean:write name="ofcVO" property="wh_rcv_seq_no"/>"></td>
			            </tr>
			            <tr>
			                <th><bean:message key="Warehouse_Shipping_File_No"/></th>
			                <td><!--
			                --><input name="i_wh_shp_prfx" type="text"  dataformat="excepthan" style="width:80px;text-transform:uppercase;ime-mode:disabled;" maxlength="10" value="<bean:write name="ofcVO" property="wh_shp_prfx"/>" onBlur="javascript:this.value=this.value.toUpperCase();"><!--
			                --><input name="i_wh_shp_seq_no" type="text"  onkeyPress="onlyNumberCheck();" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:80px;text-align:left" maxlength="10" value="<bean:write name="ofcVO" property="wh_shp_seq_no"/>"></td>
			            </tr>
			            <!-- Vinh.Vo 2015/02/01 (E) -->
			            <tr>
			                <th><bean:message key="Truck_Load_No"/></th>
			                <td><!--
			                --><input name="i_trk_prfx" type="text"  dataformat="excepthan" style="width:80px;text-transform:uppercase;ime-mode:disabled;" maxlength="10" value="<bean:write name="ofcVO" property="trk_prfx"/>" onBlur="javascript:this.value=this.value.toUpperCase();"><!--
			                --><input name="i_trk_seq_no" type="text"  onkeyPress="onlyNumberCheck();" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:80px;text-align:left" maxlength="10" value="<bean:write name="ofcVO" property="trk_seq_no"/>"></td>
			            </tr>
			            <tr>
			                <th><bean:message key="Warehouse_Doc_no"/></th>
			                <td><!--
			                --><input name="i_wm_doc_prfx" type="text"  dataformat="excepthan" style="width:80px;text-transform:uppercase;ime-mode:disabled;" maxlength="10" value="<bean:write name="ofcVO" property="wm_doc_prfx"/>" onBlur="javascript:this.value=this.value.toUpperCase();"><!--
			                --><input name="i_wm_doc_seq_no" type="text"  onkeyPress="onlyNumberCheck();" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:80px;text-align:left" maxlength="10" value="<bean:write name="ofcVO" property="wm_doc_seq_no"/>"></td>
			            </tr>			            
			            <tr>
			                <th><bean:message key="Clp_No"/></th>
			                <td><!--
			                --><input name="i_clp_doc_prfx" type="text"  dataformat="excepthan" style="width:80px;text-transform:uppercase;ime-mode:disabled;" maxlength="10" value="<bean:write name="ofcVO" property="clp_prfx"/>" onBlur="javascript:this.value=this.value.toUpperCase();"><!--
			                --><input name="i_clp_doc_seq_no" type="text"  onkeyPress="onlyNumberCheck();" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:80px;text-align:left" maxlength="10" value="<bean:write name="ofcVO" property="clp_seq_no"/>"></td>
			            </tr>
			           </tbody>
			       </table>
			       <h3 class="title_design mar_top_8" style="margin-bottom: 0;"><bean:message key="AES_Setup"/></h3>
			       <table>
					<colgroup>
						<col width="200"></col>
						<col width="*"></col>
					</colgroup>
					<tbody>  
			            <tr>
			                <th><bean:message key="Contact_Name"/></th>
			                <td><input name="i_aes_cntc_nm" type="text"  dataformat="excepthan" style="width:273px;text-transform:uppercase;ime-mode:disabled;" maxlength="50" value="<bean:write name="ofcVO" property="aes_cntc_nm"/>" onBlur="javascript:this.value=this.value.toUpperCase();"></td>
			            </tr>
			            <tr>
			                <th><bean:message key="Address"/></th>
			                <td>
			                	   <textarea name="i_aes_addr"  onblur="strToUpper(this);keyPress_maxLength(this);" dataformat="excepthan" style="width:273px;height:32px;" maxlength="400" onKeyPress="keyPress_maxLength(this);"><bean:write name="ofcVO" property="aes_addr"/></textarea>
			                </td>
			            </tr>
			            <tr>
			                <th ><bean:message key="City"/></th>
			                <td><input name="i_aes_city" type="text"  dataformat="excepthan" style="width:273px;text-transform:uppercase;ime-mode:disabled;" maxlength="50" value="<bean:write name="ofcVO" property="aes_city"/>" onBlur="javascript:this.value=this.value.toUpperCase();"></td>
			            </tr>
			            <tr>
			                <th ><bean:message key="State"/></th>
			                <td><!--
			                --><input name="i_aes_state_cd" type="text"  dataformat="excepthan" style="width:243px;text-transform:uppercase;ime-mode:disabled;" maxlength="5" onKeyDown="codeNameAction('state',this, 'onKeyDown')" onBlur="codeNameAction('state',this, 'onBlur')" value="<bean:write name="ofcVO" property="aes_state_cd"/>"><!--
			                --><button type="button" class="input_seach_btn" tabindex="-1" onclick="doWork('STATE_POPLIST2', 'I')"></button></td>
			            </tr>
			            <tr>
			                <th ><bean:message key="Zip_Code"/></th>
			                <td><!--
			                --><input name="i_aes_zip" type="text" maxlength="20"  dataformat="excepthan" style="width:273px;text-transform:uppercase;ime-mode:disabled;" value="<bean:write name="ofcVO" property="aes_zip"/>" onBlur="javascript:this.value=this.value.toUpperCase();"></td>
			            </tr>
			            <tr>
			                <th ><bean:message key="Country"/></th>
			                <td><!--
			                --><input name="i_aes_cnt_cd" type="text"  dataformat="excepthan" style="width:243px;text-transform:uppercase;ime-mode:disabled;" maxlength="2" onKeyDown="codeNameAction('country',this, 'onKeyDown')" onBlur="codeNameAction('country',this, 'onBlur')" value="<bean:write name="ofcVO" property="aes_cnt_cd"/>"><!--
			                --><button type="button" class="input_seach_btn" tabindex="-1" onclick="doWork('COUNTRY_POPLIST2', 'I')"></button></td>
			            </tr>
			            <tr>
			                <th ><bean:message key="Response_EMail"/></th>
			                <td><input name="i_aes_rspn_email" maxlength="50" type="text"  dataformat="excepthan" style="width:273px;ime-mode:disabled;" value="<bean:write name="ofcVO" property="aes_rspn_email"/>"></td>
			            </tr>
			            <tr>
			                <th ><bean:message key="Party_Type_FW_ZZ"/></th>
			                <td><input name="i_aes_prt_type" type="text"  dataformat="excepthan" style="width:273px;text-transform:uppercase;ime-mode:disabled;" maxlength="5" value="<bean:write name="ofcVO" property="aes_prt_type"/>" onBlur="javascript:this.value=this.value.toUpperCase();"></td>
			            </tr>
					</tbody>
				</table>
			</div>
		</div>
		
		<div class="layout_vertical_3 mar_left_8" style="height: 657px;">
			<div class="opus_design_inquiry">
				<h3 class="title_design" style="margin-bottom: 0;"><bean:message key="IT_Number"/></h3>
	             <table>
					<colgroup>
						<col width="120"></col>
						<col width="*"></col>
					</colgroup>
					<tbody>
						<tr>
			                <th><bean:message key="Next_Number"/></th>
			                <td><input name="i_it_next_no" type="text"  dataformat="excepthan" style="width:80px;text-transform:uppercase;ime-mode:disabled;"  OnChange="checkItNum(this)" maxlength="8" onKeyPress="onlyNumberCheck()" value="<bean:write name="ofcVO" property="it_next_no"/>"></td>
			            </tr>
			            <tr>
			                <th><bean:message key="End"/></th>
			                <td><input name="i_it_end" type="text"  dataformat="excepthan" style="width:80px;text-transform:uppercase;ime-mode:disabled;" OnChange="checkItNum(this)"  onKeyPress="onlyNumberCheck()" maxlength="8" value="<bean:write name="ofcVO" property="it_end"/>"></td>
			            </tr>
			         </tbody>
			       </table>
			       
			       <h3 class="title_design mar_top_8" style="margin-bottom: 0px;"><bean:message key="CCN_CANADA_ONLY"/></h3>
			       <table>
			        <colgroup>
						<col width="120"></col>
						<col width="*"></col>
					</colgroup>
					<tbody>
						<tr>
			                <th><bean:message key="Prefix"/></th>
			                <td><input name="i_ccn_prfx" type="text"  onBlur="strToUpper(this);" dataformat="excepthan" style="width:80px;text-transform:uppercase;ime-mode:disabled;" maxlength="4" value="<bean:write name="ofcVO" property="ccn_prfx"/>"></td>
			            </tr>
			            <tr>
			                <th><bean:message key="Ocean_Current_Number"/></th>
			                <td><input name="i_oi_ccn_seqno" type="text"  dataformat="excepthan" style="width:80px;text-transform:uppercase;ime-mode:disabled;" maxlength="10" onChange="onlyNumberCheck()"  onkeyPress="onlyNumberCheck();" value="<bean:write name="ofcVO" property="oi_ccn_seqno"/>"></td>
			            </tr>
			            <tr>
			                <th><bean:message key="Air_Current_Number"/></th>
			                <td><input name="i_ai_ccn_seqno" type="text"  dataformat="excepthan" style="width:80px;text-transform:uppercase;ime-mode:disabled;"  maxlength="10" onChange="onlyNumberCheck()"  onkeyPress="onlyNumberCheck();" value="<bean:write name="ofcVO" property="ai_ccn_seqno"/>"></td>
			            </tr>
			        	</tbody>
			       	</table>
			       	<h3 class="title_design mar_top_8" style="margin-bottom: 0;"><bean:message key="Unit"/></h3>
			        <table>
					<colgroup>
						<col width="120"></col>
						<col width="*"></col>
					</colgroup>
					<tbody>    
						<tr>
			                <th><bean:message key="Weight"/></th>
			                <td><!--
			                --><input type="hidden" name="h_oth_wgt_ut_cd" value="<bean:write name="ofcVO" property="oth_wgt_ut_cd"/>"><!--
			                --><select name="i_oth_wgt_ut_cd" style="width:80px;" OnChange=""><!--
			                --><logic:iterate id="codeVO" name="wgtUtCd"><!--
			                --><option value='<bean:write name="codeVO" property="cd_val"/>'><bean:write name="codeVO" property="cd_nm"/></option><!--
			                --></logic:iterate><!--
			                --></select></td>
			            </tr>
			            <tr>
			                <th><bean:message key="Measure"/></th>
			                <td><!--
			                --><input type="hidden" name="h_oth_meas_ut_cd" value="<bean:write name="ofcVO" property="oth_meas_ut_cd"/>"><!--
			                --><select name="i_oth_meas_ut_cd" style="width:80px;" OnChange=""><!--
			                --><logic:iterate id="codeVO" name="measUtCd"><!--
			                --><option value='<bean:write name="codeVO" property="cd_val"/>'><bean:write name="codeVO" property="cd_nm"/></option><!--
			                --></logic:iterate><!--
			                --></select></td>
			            </tr>
			            <tr>
			                <th><bean:message key="Size"/></th>
			                <td><!--
			                --><input type="hidden" name="h_oth_size_ut_cd" value="<bean:write name="ofcVO" property="oth_size_ut_cd"/>"><!--
			                --><select name="i_oth_size_ut_cd" style="width:80px;" OnChange=""><!--
			                --><logic:iterate id="codeVO" name="length"><!--
			                --><option value='<bean:write name="codeVO" property="cd_val"/>'><bean:write name="codeVO" property="cd_nm"/></option><!--
			                --></logic:iterate><!--
			                --></select></td>
			            </tr>
			         </tbody>
			        </table>
			        
			        <h3 class="title_design mar_top_8" style="margin-bottom: 0;"><bean:message key="Company_Logo"/></h3>
			         <table>
						<colgroup>
							<col width="120"></col>
							<col width="*"></col>
						</colgroup>
						<tbody> 
						 <tr>
			                <th><bean:message key="Logo1_Square"/></th>
			                <td><!--
			                --><div id="logo_square_id" style="display: none;"><!--
			                --><b><bean:message key="Original_File"/></b>: <a href="javascript:downloadFile('img', 'CLOGO_1');"><labbel id="logo_square_filenm"><bean:write name="ofcVO" property="logo_square_filenm"/></labbel></a> &nbsp;&nbsp;&nbsp;&nbsp;<br><!--
			                --></div><!--
			                --><input tabindex = "-1" type="file" name="logo_square"  size="25"/><!--
			                --><input name="logo_square_flg" type="checkbox" value="Y" onClick="flgChange(this);" style="display: none"><!--
			                --><input type="text" name="logo_square_chk" value="Del" style="width:30px;border:0;background-color:transparent;font-size: 11px;display: none" tabindex="-1" readOnly ><!--
			                --><input type="hidden" name="set_type_logo1" value="CLOGO_1"><!--
			                --><input type="hidden" name="logo_square_upload_yn" ><!--
			                --><input type="hidden" name="logo_square_yn" value="<bean:write name="ofcVO" property="logo_square"/>">
			                <!-- OFVFOUR-7028 [ACE GLOBAL / CARGOCARE] LOGO FILE DUPLICATION ISSUE-->
			                <input type="hidden" name="logo_folder"></td>
			            </tr>
			            <tr>
			                <th>&nbsp;</th>
			                <td>Max size : 0.6 X 0.6 inch</td>
			            </tr>					            
			            <tr>
			                <th><bean:message key="logo2_Rectangle"/></th>
			                <td><!--
			                --><div id="logo_rec_id" style="display: none;"><!--
			                --><b><bean:message key="Original_File"/></b>: <a href="javascript:downloadFile('img', 'CLOGO_2');"><labbel id="logo_rectangle_filenm"><bean:write name="ofcVO" property="logo_rectangle_filenm"/></label></a> &nbsp;&nbsp;&nbsp;&nbsp;<br><!--
			                --></div><!--
			                --><input tabindex = "-1" type="file" name="logo_rectangle"  size="25"/><!--
			                --><input name="logo_rec_flg" type="checkbox" value="Y" onClick="flgChange(this);" style="display: none"><!--
			                --><input type="text" name="logo_rec_chk" value="Del" style="width:30px;border:0;background-color:transparent;font-size: 11px;display: none" tabindex="-1" readOnly ><!--
			                --><input type="hidden" name="set_type_logo2" value="CLOGO_2"><!--
			                --><input type="hidden" name="logo_rectangle_upload_yn" ><!--
			                --><input type="hidden" name="logo_rectangle_yn" value="<bean:write name="ofcVO" property="logo_rectangle"/>"></td>
			            </tr>
			            <tr>
			                <th>&nbsp;</th>
			                <td>Max size : 1.6 X 0.6 inch</td>
			            </tr>					            
			            <tr>
			                <th><bean:message key="Sub_Logo"/></th>
			                <td><!--
			                --><div id="logo_sub_id" style="display: none;"><!--
			                --><b><bean:message key="Original_File"/></b>: <a href="javascript:downloadFile('img', 'CLOGO_3');"><labbel id="logo_sub_filenm"><bean:write name="ofcVO" property="logo_sub_filenm"/></label></a> &nbsp;&nbsp;&nbsp;&nbsp;<br><!--
			                --></div><!--
			                --><input tabindex = "-1" type="file" name="logo_sub"  size="25"/><!--
			                --><input name="logo_sub_flg" type="checkbox" value="Y" onClick="flgChange(this);" style="display: none"><!--
			                --><input type="text" name="logo_sub_chk" value="Del" style="width:30px;border:0;background-color:transparent;font-size: 11px;display: none" tabindex="-1" readOnly ><!--
			                --><input type="hidden" name="set_type_logo3" value="CLOGO_3"><!--
			                --><input type="hidden" name="logo_sub_upload_yn" ><!--		
	                        --><input type="hidden" name="logo_sub_yn" value="<bean:write name="ofcVO" property="logo_sub"/>">
			            </tr>
			            <tr>
			                <th>&nbsp;</th>
			                <td>Max size : 1.2 X 0.4 inch</td>
			            </tr>
					</tbody>
				</table>
				
				
				 <!-- #52013 Stamp Watermark  start  -->
				<h3 class="title_design mar_top_8" style="margin-bottom: 0;"><bean:message key="STAMP_File"/></h3>
			         <table>
						<colgroup>
							<col width="120"></col>
							<col width="*"></col>
						</colgroup>
						<tbody> 
						 <tr>
			                <th><bean:message key="STAMP_NORMAL_File"/></th>
			                <td><!--
			                --><div id="stamp_normal_id" style="display: none;"><!--
			                --><a href="javascript:downloadFile('img', 'STAMP_NORMAL');"><labbel id="stamp_normal_filenm"><bean:write name="ofcVO" property="stamp_normal_filenm"/></labbel></a> &nbsp;&nbsp;&nbsp;&nbsp;<br><!--
			                --></div><!--
			                --><input tabindex = "-1" type="file" name="stamp_normal"  size="25"/><!--
			                --><input name="stamp_normal_flg" type="checkbox" value="Y" onClick="flgChange(this);" style="display: none"><!--
			                --><input type="text" name="stamp_normal_chk" value="Del" style="width:30px;border:0;background-color:transparent;font-size: 11px;display: none" tabindex="-1" readOnly ><!--
			                --><input type="hidden" name="set_type_stamp_normal" value="STAMP_NORMAL"><!--
			                --><input type="hidden" name="stamp_normal_upload_yn" ><!--
			                --><input type="hidden" name="stamp_normal_yn" value="<bean:write name="ofcVO" property="stamp_normal"/>"></td>
			            </tr>
			            <tr>
			                <th>&nbsp;</th>
			                <td>Max size : 1.5 X 1.5 inch</td>
			            </tr>			            		            
			            <tr>
			                <th><bean:message key="STAMP_GUARANTEE_File"/></th>
			                <td><!--
				            --><div id="stamp_guarantee_id" style="display: none;"><!--
			                --><a href="javascript:downloadFile('img', 'STAMP_GUARANTEE');"><labbel id="stamp_guarantee_filenm"><bean:write name="ofcVO" property="stamp_guarantee_filenm"/></labbel></a> &nbsp;&nbsp;&nbsp;&nbsp;<br><!--
			                --></div><!--
			                --><input tabindex = "-1" type="file" name="stamp_guarantee"  size="25"/><!--
			                --><input name="stamp_guarantee_flg" type="checkbox" value="Y" onClick="flgChange(this);" style="display: none"><!--
			                --><input type="text" name="stamp_guarantee_chk" value="Del" style="width:30px;border:0;background-color:transparent;font-size: 11px;display: none" tabindex="-1" readOnly ><!--
			                --><input type="hidden" name="set_type_stamp_guarantee" value="STAMP_GUARANTEE"><!--
			                --><input type="hidden" name="stamp_guarantee_upload_yn" ><!--
			                --><input type="hidden" name="stamp_guarantee_yn" value="<bean:write name="ofcVO" property="stamp_guarantee"/>"></td>
			            </tr>
			            <tr>
			                <th>&nbsp;</th>
			                <td>Max size : 1.5 X 1.5 inch</td>
			            </tr>	

					</tbody>
				</table>
				<!-- #52013 Stamp Watermark  end  -->
			</div>
		</div>
	</div>
