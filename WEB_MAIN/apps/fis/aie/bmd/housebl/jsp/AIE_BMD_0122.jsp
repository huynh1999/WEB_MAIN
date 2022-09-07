<%--
=========================================================
*Copyright(c) 2009 CyberLogitec. All Rights Reserved.
=========================================================
=========================================================
*@FileName   : AIE_BMD_0122.jsp
*@FileTitle  : A.E.S 등록
*@Description: A.E.S 등록 및 조회
*@author     : PJK
*@version    : 1.0 - 12/12/2011
*@since      :

*@Change history:
=========================================================
--%>
<!-- layout_wrap(S) -->
<div class="layout_wrap">
    <div class="layout_vertical_2 sm" style="width:550px;height:530px">
        <div class="opus_design_inquiry">
        	<h3 style="margin-bottom:0" class="title_design"><bean:message key="USPPI"/></h3>
			<table>
				<tr>
					<th width="130px"><bean:message key="Name"/></th>
					<td><input type="text" maxlength="50"   name="s_shp_nm" value="<bean:write name="hblVO" property="shp_nm"/>"  onblur="strToUpper(this)" onKeyPress="if(event.keyCode==13){companyPopup('USPPI',frm1.s_shp_nm.value);}" dataformat="excepthan" style="ime-mode:disabled;width:204px;text-transform:uppercase;"><!-- 
					 --><button type="button" class="input_seach_btn" tabindex="-1" onClick="companyPopup('USPPI');"></button></td>
	            </tr>
				<tr>
					<th><bean:message key="Contact_Name"/></th>
					<td><!-- 
					 --><input type="text"   name="s_shp_pic_f" maxlength="50" value="<bean:write name="hblVO" property="shp_pic_f"/>"  onblur="strToUpper(this)"  dataformat="excepthan" style="ime-mode:disabled;width:100px;text-transform:uppercase;"><!-- 
					 --><input type="text"   name="s_shp_pic_l" maxlength="50" value='<bean:write name="hblVO" property="shp_pic_l"/>'  onblur="strToUpper(this)"  dataformat="excepthan" style="ime-mode:disabled;width:100px;text-transform:uppercase;"><!-- 
					 --></td>
				</tr>
				<tr>
					<th><bean:message key="Phone"/></th>
					<td><input type="text" name="s_shp_phn" maxlength="30" value="<bean:write name="hblVO" property="shp_phn"/>"  onblur="strToUpper(this)" onkeyPress="onlyIntCheck();" dataformat="excepthan" style="ime-mode:disabled;width:205px;text-transform:uppercase;" ></td>
				</tr>
				<tr>
					<th><bean:message key="Address"/></th>
					<td><textarea name="s_shp_addr" maxlength="400" onkeypress="keyPress_maxLength(this);" onkeyup="keyUp_maxLength(this);" onblur="strToUpper(this);keyUp_maxLength(this);" dataformat="excepthan" style="width:320px;height:45px;"><bean:write name="hblVO" property="shp_addr"/></textarea></td>
				</tr>
				<tr>
					<th><bean:message key="City_State"/></th>
					<td><input type="text" maxlength="25"    name="s_shp_city_nm" value="<bean:write name="hblVO" property="shp_city_nm"/>"  onblur="strToUpper(this)"  dataformat="excepthan" style="ime-mode:disabled;width:100px;text-transform:uppercase;"><!-- 
					 --><input type="text" maxlength="2"  name="s_shp_state_cd" value="<bean:write name="hblVO" property="shp_state_cd"/>"  onblur="strToUpper(this)"  dataformat="excepthan" style="ime-mode:disabled;width:100px;text-transform:uppercase;"></td>
				</tr>
				<tr>
					<th><bean:message key="Zip_Code_Country"/></th>
					<td><!-- 
					 --><input type="text" maxlength="9"   name="s_shp_zip" id="s_shp_zip" value="<bean:write name="hblVO" property="shp_zip"/>"  onblur="strToUpper(this);validateValue(this)"  dataformat="excepthan" style="ime-mode:disabled;width:100px;text-transform:uppercase;"><!-- 
					 --><input type="text" maxlength="2"   name="s_shp_cnt" value="<bean:write name="hblVO" property="shp_cnt"/>"  onblur="strToUpper(this)"  dataformat="excepthan" style="ime-mode:disabled;width:100px;text-transform:uppercase;"><!-- 
					 --><button type="button" class="input_seach_btn" tabindex="-1" onClick="countryPopup('USPPI');"></button></td>
				</tr>
				<tr>
					<th><bean:message key="ID_Type_ID"/></th>
					<td><!-- 
					 --><select name="s_shp_tax_type" style="width:150px;"><!-- 
					 --><option></option><!-- 
					 --><logic:iterate id="idTp" name="valMap" property="idTpList"><!-- 
					 --><option value="<bean:write name="idTp" property="cd_val"/>"><bean:write name="idTp" property="cd_nm"/></option><!-- 
					 --></logic:iterate><!-- 
					 --></select><!-- 
					 --><input type="hidden" name="s_h_shp_tax_type" value="<bean:write name="hblVO" property="shp_tax_type"/>"><!-- 
					 --><input type="text"   maxlength="20"  name="s_shp_id" value="<bean:write name="hblVO" property="shp_id"/>"  onblur="strToUpper(this)"  dataformat="excepthan" style="ime-mode:disabled;width:79px;text-transform:uppercase;"><!-- 
					 --></td>
				</tr>
			</table>
			
			<h3 class="title_design mar_top_8"><bean:message key="Ultimate_Consignee"/></h3>
			<table>
				<tr>
					<th width="130px"><bean:message key="Name"/></th>
					<td><input type="text"   name="s_ult_cnee_nm"  maxlength="50" value="<bean:write name="hblVO" property="ult_cnee_nm"/>"  onblur="strToUpper(this)" onKeyPress="if(event.keyCode==13){companyPopup('ULT',frm1.s_ult_cnee_nm.value);}" dataformat="excepthan" style="ime-mode:disabled;width:204px;text-transform:uppercase;"><!-- 
					 --><button type="button" class="input_seach_btn" tabindex="-1" onClick="companyPopup('ULT');"></button></td>
	            </tr>
				<tr>
					<th><bean:message key="Contact_Name"/></th>
					<td><input type="text"   name="s_ult_cnee_pic" maxlength="50"  value="<bean:write name="hblVO" property="ult_cnee_pic"/>"  onblur="strToUpper(this)"  dataformat="excepthan" style="ime-mode:disabled;width:204px;text-transform:uppercase;"></td>
				</tr>
				<tr>
					<th><bean:message key="Phone"/></th>
					<td><input type="text"   name="s_ult_cnee_phn"  maxlength="30" value="<bean:write name="hblVO" property="ult_cnee_phn"/>" onkeyPress="onlyIntCheck();" onblur="strToUpper(this)"  dataformat="excepthan" style="ime-mode:disabled;width:205px;text-transform:uppercase;"></td>
				</tr>
				<tr>
					<th><bean:message key="Address"/></th>
					<td><textarea name="s_ult_cnee_addr"  maxlength="400" onkeypress="keyPress_maxLength(this);" onkeyup="keyUp_maxLength(this);" onblur="strToUpper(this);keyUp_maxLength(this);" dataformat="excepthan" style="width:320px;height:45px;"><bean:write name="hblVO" property="ult_cnee_addr"/></textarea></td>
				</tr>
				<tr>
					<th><bean:message key="City_State"/></th>
					<td><!-- 
					 --><input type="text"  maxlength="25"   name="s_ult_cnee_city_nm" value="<bean:write name="hblVO" property="ult_cnee_city_nm"/>"  onblur="strToUpper(this)"  dataformat="excepthan" style="ime-mode:disabled;width:100px;text-transform:uppercase;"><!-- 
					 --><input type="text"   maxlength="2"  name="s_ult_cnee_state_cd" value="<bean:write name="hblVO" property="ult_cnee_state_cd"/>"  onblur="strToUpper(this)"  dataformat="excepthan" style="ime-mode:disabled;width:100px;text-transform:uppercase;"><!-- 
					 --></td>
				</tr>
				<tr>
					<th><bean:message key="Postal_Code_Country"/></th>
					<td><!-- 
					 --><input type="text"   maxlength="9"  name="s_ult_cnee_zip" id="s_ult_cnee_zip" value="<bean:write name="hblVO" property="ult_cnee_zip"/>"  onblur="strToUpper(this);validateValue(this)"  dataformat="excepthan" style="ime-mode:disabled;width:100px;text-transform:uppercase;"><!-- 
					 --><input type="text"   maxlength="2"  name="s_ult_cnee_cnt" value="<bean:write name="hblVO" property="ult_cnee_cnt"/>"  onblur="strToUpper(this)"  dataformat="excepthan" style="ime-mode:disabled;width:100px;text-transform:uppercase;"><!-- 
					 --><button type="button" class="input_seach_btn" tabindex="-1" onClick="countryPopup('ULT');"></button></td>
				</tr>
				<tr>
	    			<th><bean:message key="Type"/></th>
                	<td nowrap><!-- 
                     --><select name="s_ult_cnee_tp"  style="width:204px;">
                       	<option value="">SELECT</option>
                     	<logic:iterate id="cnee_tp" name="valMap" property="cneeTpList"><!--
                    	 --><option value="<bean:write name="cnee_tp" property="cd_val"/>"><bean:write name="cnee_tp" property="cd_val"/>-<bean:write name="cnee_tp" property="cd_nm"/></option><!--
                     --></logic:iterate><!--
                   	 --></select><!--
                   	 --><input type="hidden" name="s_h_ult_cnee_tp" value="<bean:write name="hblVO" property="ult_cnee_tp"/>">
                	</td>
	    		</tr>
				
				
			</table>
        </div>
    </div>
    <div class="layout_vertical_2 sm mar_left_8" style="width:calc(100% - 560px);height:530px">
        <div class="opus_design_inquiry">
        	<h3 style="margin-bottom:0" class="title_design"><bean:message key="Freight_Forwarder"/></h3>
        	<table width="100%" border="0" cellpadding="0" cellspacing="0">
				<tr>
					<th width="130px"><bean:message key="Name"/></th>
					<td><!-- 
					 --><input type="text"  maxlength="50"    name="s_fwd_nm" value="<bean:write name="hblVO" property="fwd_nm"/>"  onblur="strToUpper(this)" onKeyPress="if(event.keyCode==13){companyPopup('FWD',frm1.s_fwd_nm.value);}" dataformat="excepthan" style="ime-mode:disabled;width:204px;text-transform:uppercase;"><!-- 
					 --><button type="button" class="input_seach_btn" tabindex="-1" onClick="companyPopup('FWD');"></button></td>
	            </tr>
				<tr>
					<th><bean:message key="Contact_Name"/></th>
					<td><input type="text"  maxlength="50"   name="s_fwd_pic" value="<bean:write name="hblVO" property="fwd_pic"/>"  onblur="strToUpper(this)"  dataformat="excepthan" style="ime-mode:disabled;width:204px;text-transform:uppercase;"></td>
				</tr>
				<tr>
					<th><bean:message key="Phone"/></th>
					<td><input type="text"  maxlength="30"   name="s_fwd_phn" value="<bean:write name="hblVO" property="fwd_phn"/>" onkeyPress="onlyIntCheck();" onblur="strToUpper(this)"  dataformat="excepthan" style="ime-mode:disabled;width:204px;text-transform:uppercase;"></td>
				</tr>
				<tr>
					<th><bean:message key="Address"/></th>
					<td><textarea name="s_fwd_addr"  maxlength="400" onkeypress="keyPress_maxLength(this);" onkeyup="keyUp_maxLength(this);" onblur="strToUpper(this);keyUp_maxLength(this);" dataformat="excepthan" style="width:320px;height:45px;"><bean:write name="hblVO" property="fwd_addr"/></textarea></td>
				</tr>
				<tr>
					<th><bean:message key="City_State"/></th>
					<td><input type="text"   maxlength="25"  name="s_fwd_city_nm" value="<bean:write name="hblVO" property="fwd_city_nm"/>"  onblur="strToUpper(this)"  dataformat="excepthan" style="ime-mode:disabled;width:100px;text-transform:uppercase;"><!-- 
					 --><input type="text"   maxlength="2"  name="s_fwd_state_cd" value="<bean:write name="hblVO" property="fwd_state_cd"/>"  onblur="strToUpper(this)"  dataformat="excepthan" style="ime-mode:disabled;width:100px;text-transform:uppercase;"></td>
				</tr>
				<tr>
					<th><bean:message key="Zip_Code_Country"/></th>
					<td><!-- 
					 --><input type="text"  maxlength="9"   name="s_fwd_zip" id= "s_fwd_zip" value="<bean:write name="hblVO" property="fwd_zip"/>"  onblur="strToUpper(this);validateValue(this)"  dataformat="excepthan" style="ime-mode:disabled;width:100px;text-transform:uppercase;"><!-- 
					 --><input type="text"  maxlength="2"   name="s_fwd_cnt" value="<bean:write name="hblVO" property="fwd_cnt"/>"  onblur="strToUpper(this)"  dataformat="excepthan" style="ime-mode:disabled;width:100px;text-transform:uppercase;"><!-- 
					 --><button type="button" class="input_seach_btn" tabindex="-1" onClick="countryPopup('FWD');"></button></td>
				</tr>
				<tr>
					<th><bean:message key="ID_Type_ID"/></th>
					<td><select name="s_fwd_tax_type" style="width:150;"><!-- 
					 --><option></option><!-- 
					 --><logic:iterate id="idTp" name="valMap" property="idTpList"><!-- 
					 --><option value="<bean:write name="idTp" property="cd_val"/>"><bean:write name="idTp" property="cd_nm"/></option><!-- 
					 --></logic:iterate><!-- 
					 --></select><!-- 
					 --><input type="hidden" name="s_h_fwd_tax_type" value="<bean:write name="hblVO" property="fwd_tax_type"/>"><!-- 
					 --><input type="text"   maxlength="20"  name="s_fwd_id" value="<bean:write name="hblVO" property="fwd_id"/>"  onblur="strToUpper(this)"  dataformat="excepthan" style="ime-mode:disabled;width:103px;text-transform:uppercase;"><!-- 
					 --></td>
				</tr>
			</table>
			<h3 class="title_design mar_top_8"><bean:message key="Intermediate_Consignee"/></h3>
			<table width="100%" border="0" cellpadding="0" cellspacing="0">
				<tr>
					<th width="130px"><bean:message key="Name"/></th>
					<td><!-- 
					 --><input type="text"   maxlength="50" name="s_inter_cnee_nm" value="<bean:write name="hblVO" property="inter_cnee_nm"/>"  onblur="strToUpper(this)" onKeyPress="if(event.keyCode==13){companyPopup('INTER',frm1.s_inter_cnee_nm.value);}" dataformat="excepthan" style="ime-mode:disabled;width:204px;text-transform:uppercase;"><!-- 
					 --><button type="button" class="input_seach_btn" tabindex="-1" onClick="companyPopup('INTER');"></button></td>
		            </tr>
				<tr>
					<th><bean:message key="Contact_Name"/></th>
					<td><input type="text"  maxlength="50" name="s_inter_cnee_pic" value="<bean:write name="hblVO" property="inter_cnee_pic"/>"  onblur="strToUpper(this)"  dataformat="excepthan" style="ime-mode:disabled;width:204px;text-transform:uppercase;"></td>
				</tr>
				<tr>
					<th><bean:message key="Phone"/></th>
					<td><input type="text"  maxlength="30" name="s_inter_cnee_phn" value="<bean:write name="hblVO" property="inter_cnee_phn"/>" onkeyPress="onlyIntCheck();" onblur="strToUpper(this)"  dataformat="excepthan" style="ime-mode:disabled;width:204px;text-transform:uppercase;"></td>
				</tr>
				<tr>
					<th><bean:message key="Address"/></th>
					<td><textarea  maxlength="400" onkeypress="keyPress_maxLength(this);" onkeyup="keyUp_maxLength(this);" onblur="strToUpper(this);keyUp_maxLength(this);" name="s_inter_cnee_addr" dataformat="excepthan" style="width:320px;height:45px;"><bean:write name="hblVO" property="inter_cnee_addr"/></textarea></td>
				</tr>
				<tr>
					<th><bean:message key="City_State"/></th>
					<td><input type="text"  maxlength="25" name="s_inter_cnee_city_nm" value="<bean:write name="hblVO" property="inter_cnee_city_nm"/>"  onblur="strToUpper(this)"  dataformat="excepthan" style="ime-mode:disabled;width:100px;text-transform:uppercase;"><!-- 
					 --><input type="text"  maxlength="2"  name="s_inter_cnee_state_cd" value="<bean:write name="hblVO" property="inter_cnee_state_cd"/>"  onblur="strToUpper(this)"  dataformat="excepthan" style="ime-mode:disabled;width:100px;text-transform:uppercase;"><!-- 
					 --></td>
					</tr>
					<tr>
						<th><bean:message key="Postal_Code_Country"/></th>
						<td><input type="text"  maxlength="9"   name="s_inter_cnee_zip" id="s_inter_cnee_zip" value="<bean:write name="hblVO" property="inter_cnee_zip"/>"  onblur="strToUpper(this);validateValue(this)"  dataformat="excepthan" style="ime-mode:disabled;width:100px;text-transform:uppercase;"><!-- 
						 --><input type="text"  maxlength="2"   name="s_inter_cnee_cnt" value="<bean:write name="hblVO" property="inter_cnee_cnt"/>"  onblur="strToUpper(this)"  dataformat="excepthan" style="ime-mode:disabled;width:100px;text-transform:uppercase;"><!-- 
						 --><button type="button" class="input_seach_btn" tabindex="-1" onClick="countryPopup('INTER');"></button></td>
					</tr>
				</table>
        </div>
    </div>
</div>
<!-- layout_wrap(E) -->