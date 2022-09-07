<%--
=========================================================
*Copyright(c) 2009 CyberLogitec. All Rights Reserved.
=========================================================
=========================================================
*@FileName   : AII_BMD_0020.jsp
*@FileTitle  : 항공 수입 HGBL등록
*@Description: HBL 등록 및 조회
*@author     : Kang,Jung-Gu
*@version    : 1.0 - 09/28/2009
*@since      :

*@Change history:
*@author     : Tuan.Chau
*@version    : 2.0 - 2014/07/15
=========================================================
--%>
	<div class="opus_design_inquiry">
		<table>
			<colgroup>
				<col width="110px"></col>
				<col width="160px"></col>
				<col width="100px"></col>
				<col width="160px"></col>
				<col width="100px"></col>
				<col width="120px"></col>
				<col width="100px"></col>
				<col width="160px"></col>
				<col width="*"></col>
			</colgroup>
			<tbody>
				<tr>
					<th><bean:message key="IT_Clsass_Entry_No"/></th>
					<td><!--
					--><input tabindex="1" type="text" name="it_class" maxlength="20" value="<bean:write name="hblVO" property="it_class"/>"  dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:50px;"><!--
					--><input tabindex="2" type="text" name="it_no" value="<bean:write name="hblVO" property="it_no"/>"  dataformat="excepthan" style="width:100px;"  maxlength="20" onblur="strToUpper(this)" style="ime-mode:disabled; text-transform:uppercase;"><!--
					--><span id="ashipper" onClick="getItNum()"><button type="button" class="btn_etc"><bean:message key="IT_No"/></button></span></td>
					
					<th><bean:message key="Date"/></th>
					<td><!--
					--><input tabindex="3" type="text" name="te_dt_tm" maxlength="10" value="<wrt:write name="hblVO" property="te_dt_tm" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy"/>"  onkeyPress="onlyNumberCheck();" onKeyUp="mkDateFormatType(this, event, false, 1)" onBlur="mkDateFormatType(this, event, true, 1);dateRangeValid(this, 'Date');" dataformat="excepthan" style="ime-mode:disabled;width:100px;"><!--
					--><button type="button" id="te_dt_tm_cal" onclick="doDisplay('DATE1' ,frm1.te_dt_tm);" class="calendar" tabindex="-1"></button></td>
					
					<th><bean:message key="IT_Location"/></th>
					<td><input tabindex="4" type="text" name="it_loc" maxlength="50" value="<bean:write name="hblVO" property="it_loc"/>" onblur="strToUpper(this)"  dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:120px;"></td>
					<th><bean:message key="TE"/></th>
					<td><input tabindex="5" type="text" name="te" maxlength="20" value="<bean:write name="hblVO" property="te"/>"  onblur="strToUpper(this)" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:120px;"></td>
					<td></td>
				</tr>
				<tr>
					<th><bean:message key="Bond_Carrier"/></th>
					<td><!--
					--><input tabindex="6" type="text" name="bond_carr_cd" maxlength="20" value='<bean:write name="hblVO" property="bond_carr_cd"/>'  onKeyDown="codeNameAction('trdpCode_bond',this, 'onKeyDown')" onBlur="strToUpper(this);codeNameAction('trdpCode_bond',this, 'onBlur')" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:50px;"><!--
					--><button type="button" class="input_seach_btn" tabindex="-1" id="bond" onClick="openAiiPopUp('LINER_POPLIST',this)"></button><!--
					--><input tabindex="7" type="text" name="bond_carr_nm" maxlength="50" value='<bean:write name="hblVO" property="bond_carr_nm"/>'  dataformat="excepthan" style="ime-mode:disabled;width:130px;text-transform:uppercase;" onblur="strToUpper(this)"   onKeyPress="if(event.keyCode==13){openAiiPopUp('LINER_POPLIST', document.getElementById('bond'), frm1.bond_carr_nm.value);}"></td>
					<th><bean:message key="Bond_Number"/></th>
					<td><input tabindex="8" type="text" name="bond_no" maxlength="20" value="<bean:write name="hblVO" property="bond_no"/>"  onblur="strToUpper(this)" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:130px;"></td>
					<th><bean:message key="Goods_Now_at"/></th>
					<td><input tabindex="9" type="text" name="goods_at" maxlength="50" value="<bean:write name="hblVO" property="goods_at"/>" onblur="strToUpper(this)"  dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:120px;"></td>
					<th><bean:message key="Value_of_Goods"/></th>
					<td><input tabindex="10" type="text" name="goods_value" maxlength="50" value="<bean:write name="hblVO" property="goods_value"/>" onblur="strToUpper(this)"  dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:120px;"></td>
					<td></td>
				</tr>
				<tr>
					<th><bean:message key="CCN"/></th>
					<td><input tabindex="11" type="text" name="ccn_no" maxlength="30"  onBlur="strToUpper(this);"  value='<bean:write name="hblVO" property="ccn_no"/>'  dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:155px;"><!--
					--><span id="ashipper" onClick="getCcnNum()"><button type="button" class="btn_etc"><bean:message key="CCN"/></button></span><!--
					--></td>
					<th><bean:message key="Date"/></th>
					<td><!--
					--><input tabindex="12" type="text" name="ccn_dt" maxlength="10" value="<wrt:write name="hblVO" property="ccn_dt" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy"/>"  onKeyUp="mkDateFormatType(this, event, false, 1)" onBlur="mkDateFormatType(this, event, true, 1);dateRangeValid(this, 'Date');" dataformat="excepthan" style="ime-mode:disabled;width:100px;"><!--
					--><button type="button" id="ccn_dt_cal" onclick="doDisplay('DATE1' ,frm1.ccn_dt);" class="calendar" tabindex="-1"></button></td>
					<th><bean:message key="UCR_No"/></th>
					<td>
						<input type="text" name="ucr_no" maxlength="35" value="<bean:write name="hblVO" property="ucr_no"/>" class="search_form" onblur="strToUpper(this)" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:120px;"> 
		            </td>
					<td></td>
				</tr>
			</tbody>
		</table>
		<table>
			<colgroup>
				<col width="110px"></col>
				<col width="160px"></col>
				<col width="100px"></col>
				<col width="160px"></col>
				<col width="50px"></col>
				<col width="*"></col>
			</colgroup>
			<tbody>
				<tr>
					<th><bean:message key="PCCN"/></th>
					<td><input tabindex="13" type="text" name="pre_ccn_no" maxlength="30" onBlur="strToUpper(this);" value='<bean:write name="hblVO" property="pre_ccn_no"/>'  dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:213px;"></td>
					<th><bean:message key="Manifest_From"/></th>
					<td><input tabindex="14" type="text" name="mnf_fr_loc" maxlength="20"  onBlur="strToUpper(this);" value="<bean:write name="hblVO" property="mnf_fr_loc"/>" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:250px;"></td>
					<th><bean:message key="To_A"/></th>
					<td colspan="3"><input tabindex="15"  type="text" name="mnf_to_loc" maxlength="20"  onBlur="strToUpper(this);" value="<bean:write name="hblVO" property="mnf_to_loc"/>" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:215px;"></td>
					<td></td>
				</tr>
				</tbody>
			</table>
		</div>
			<div class= "opus_design_inquiry sm">
			<div class="layout_wrap">
			<div class="layout_vertical_3 sm" style="height:410px; width:360px;">
				<h3 class="title_design"><bean:message key="Mark"/></h3>
				<div>
					<textarea tabindex="16" name="mk_txt" rows="25" onblur="strToUpper(this)" dataformat="excepthan" style="width:350px;" WRAP="off" onkeyup="rowCount(frm1,15,rider_ocean, 'A');" maxlength="4000">
<bean:write name="hblVO" property="mk_txt" filter="true"/></textarea>
				</div>
			</div>
			
			<div class="layout_vertical_3 sm mar_left_4" style="height:410px; width:360px;">
				<h3 class="title_design"><bean:message key="Description"/></h3>
				<div>
					<textarea tabindex="17" name="desc_txt" rows="25" onblur="strToUpper(this)" dataformat="excepthan" style="width:351px;" WRAP="off" onkeyup="rowCount(frm1,15,rider_ocean, 'A');" maxlength="4000">
<bean:write name="hblVO" property="desc_txt" filter="true"/></textarea>
					<input type="hidden" name="rider_lbl" value="" onblur="strToUpper(this)" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;text-align:right;width:267px;border:0;background-color:transparent;"/>
				</div>
			</div>
			
			<div class="layout_vertical_3 sm mar_left_4" style="height:410px; width:360px;">
				<div>
					<h3 class="title_design"><bean:message key="Internal_Remark"/></h3>
					<div>
						<textarea tabindex="19" name="rmk"  rows="8" onblur="strToUpper(this);"  style="ime-mode:auto;width:351px;" WRAP="off" maxlength="400">
<bean:write name="hblVO" property="rmk" filter="true"/></textarea>
						<img src="<%=CLT_PATH%>/web/img/main/overlimit.gif" style="display:none;"width="29" height="29" border="0" id="rider_ocean" valign="top">
					</div>
				</div>
				<div style="height: 10px"></div>
				<div>
					<!-- #1572 [CARGOZONE] AIH ENTRY - AUTHORITY TO MAKE ENTRY REMARK MAPPING ERROR -->
					<h3 class="title_design"><bean:message key="Authority_to_Make_Entry_Remark"/></h3>
					<div>
						<textarea tabindex="19" name="att_mk_txt"  rows="8" onblur="strToUpper(this);"  style="ime-mode:auto;width:351px;" WRAP="off" maxlength="4000">
<bean:write name="hblVO" property="att_mk_txt" filter="true"/></textarea>
					</div>
				</div>
			</div>
			</div>
			<div style="height: 10px"></div>
			<div>
				<h3 class="title_design"><bean:message key="AN_PUBLIC_REMARK"/></h3>
				<div>
					<textarea tabindex="20" name="desc_txt1" rows="3" onblur="strToUpper(this);" style="ime-mode:auto;width:1000px;" maxlength="800">
<bean:write name="hblVO" property="desc_txt1" filter="true"/></textarea>
				</div>
			</div>
		</div>
			
			<div class="opus_design_grid">
				<h3 class="title_design pad_btm_8"><bean:message key="Item"/></h3>
				<div class="opus_design_btn">
					<button type="button" class="btn_accent" name="loadPO" id="loadPO"  onClick="cmdtLoadPO(); " style="cursor:hand;display:none;"><bean:message key="Load_PO"/></button>
					<button type="button" class="btn_accent" name="itmAdd" id="itmAdd"  onClick="cmdtRowAdd(); " style="cursor:hand;display:none;"><bean:message key="Add"/></button>
				</div>
				<script type="text/javascript">comSheetObject('sheet8');</script>
			</div>