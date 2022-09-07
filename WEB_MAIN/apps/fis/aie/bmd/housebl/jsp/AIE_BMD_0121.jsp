<%--
=========================================================
*Copyright(c) 2009 CyberLogitec. All Rights Reserved.
=========================================================
=========================================================
*@FileName   : AIE_BMD_0121.jsp
*@FileTitle  : A.E.S 등록
*@Description: A.E.S 등록 및 조회
*@author     : PJK
*@version    : 1.0 - 12/12/2011
*@since      :

*@Change history:
=========================================================
--%>
<div class="opus_design_inquiry">
	<table>
		<colgroup>
			<col width="100px"></col>
			<col width="220px"></col>
			<col width="100px"></col>
			<col width="220px"></col>
			<col width="100px"></col>
		</colgroup>
		<tr>
			<th><bean:message key="HAWB_No"/></th>
			<td><input type="text" name="s_hbl_no" maxlength="40" value="<bean:write name="hblVO" property="hbl_no"/>" onblur="strToUpper(this)" class="search_form-disable" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:115px" readonly><!-- 
			 --><input type="hidden" name="s_intg_bl_seq" value="<bean:write name="hblVO" property="intg_bl_seq"/>"></td>
			<th><bean:message key="Departure"/></th>
			<td><!-- 
			 --><input type="text" name="s_pol_cd" maxlength ="5" value='<bean:write name="hblVO" property="pol_cd"/>' onBlur="strToUpper(this);codeCheck('Location_pol',this)" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:70px;"><!-- 
			 --><button type="button" id="pol" class="input_seach_btn" tabindex="-1" onClick="doWork('LOCATION_POPLIST',this)"></button><!-- 
			 --><input type="text" name="s_pol_nm" maxlength ="50" value='<bean:write name="hblVO" property="pol_nm"/>' class="search_form-disable" onBlur="strToUpper(this);" dataformat="excepthan" style="ime-mode:disabled;width:140px;text-transform:uppercase;" readonly><!-- 
			 --></td>
			<th><bean:message key="Status"/></th>
			<td><input type="text" name="s_aes_sts" maxlength="5" value="<bean:write name="hblVO" property="aes_sts"/>" onblur="strToUpper(this)" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:130px;"></td>
		</tr>
        <tr>
			<th><bean:message key="Trans_Ref_No"/></th>
            <td><input type="text" name="s_lnr_bkg_no" value="<bean:write name="hblVO" property="lnr_bkg_no"/>" class="search_form-disable" dataformat="excepthan" style="ime-mode:disabled;width:115px;text-transform:uppercase;" readonly></td>
            <th><bean:message key="ETD"/></th>
			<td><!-- 
			 --><input type="text" id="s_etd_dt_tm" name="s_etd_dt_tm" maxlength="10" value='<wrt:write name="hblVO" property="etd_dt_tm" formatType="DATE" fromFormat="yyyyMMdd" format="MM-dd-yyyy"/>' dataformat="excepthan" style="ime-mode:disabled;width:70px;" onkeyPress="onlyNumberCheck();mkDateFormatType(this, event, false,1)" onKeyUp="mkDateFormatType(this, event, false,1)" onBlur="mkDateFormatType(this, event, true,1);dateRangeValid(this, 'ETD');"><!-- 
			 --><button type="button" class="calendar" tabindex="-1" onclick="doDisplay('DATE1' ,frm1.s_etd_dt_tm);"></button></td>
            <th><bean:message key="ITN"/></th>
            <td><input type="text" name="s_it_no" maxlength ="30" value="<bean:write name="hblVO" property="it_no"/>" onblur="strToUpper(this)" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:130px;"></td>
         </tr>
         <tr>
			<th><bean:message key="Transport_Code"/></th>
            <td><select name="s_trs_cd" style="width:215px;"><!-- 
             --><logic:iterate id="transCd" name="valMap" property="transCdList"><!-- 
            	 --><option value="<bean:write name="transCd" property="cd_val"/>"><bean:write name="transCd" property="cd_val"/>-<bean:write name="transCd" property="cd_nm"/></option><!-- 
             --></logic:iterate><!-- 
             --></select><!-- 
             --><input type="hidden" name="s_h_trs_cd" value="<bean:write name="hblVO" property="trs_cd"/>"></td>
			<th><bean:message key="Destination"/></th>
			<td><input type="text" name="s_pod_cd" maxlength="5" value='<bean:write name="hblVO" property="pod_cd"/>' onBlur="strToUpper(this);codeCheck('Location_pod',this)" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:70px;"><!-- 
             --><button type="button"  id="pod" class="input_seach_btn" tabindex="-1" onClick="doWork('LOCATION_POPLIST',this)"></button><!-- 
             --><input type="text" name="s_pod_nm" maxlength="50" value='<bean:write name="hblVO" property="pod_nm"/>' class="search_form-disable" dataformat="excepthan" style="ime-mode:disabled;width:140px;text-transform:uppercase;" readonly></td>
			
			<th>Filing <bean:message key="Option"/></th>
            <td >
            <input type="radio" name="s_file_tp" id="s_file_tp2" value="2" checked="checked"><label for="s_file_tp2"><bean:message key="Option"/> 2</label> 
            <input type="radio" name="s_file_tp" id="s_file_tp4" value="4" ><label for="s_file_tp4"><bean:message key="Option"/> 4</label></td>
           
          </tr>
          <tr>
			<th><bean:message key="Destination_Country"/></th>
            <td colspan="5"><input name="s_cnt_cd" type="text" dataformat="excepthan" style="width:30px;ime-mode:disabled;text-transform:uppercase;" value="<bean:write name="hblVO" property="cnt_cd"/>" maxlength="2" onBlur="strToUpper(this);codeCheck('country',this)"><!-- 
             --><button type="button" class="input_seach_btn" tabindex="-1" onClick="doWork('COUNTRY_POPLIST',this)"></button><!-- 
             --><input name="s_cnt_nm" type="text" class="search_form-disable" style="width:153px;" value="<bean:write name="hblVO" property="cnt_nm"/>" readOnly></td>
          </tr>
          <tr>
			<th><bean:message key="State_Of_Origin"/></th>
            <td><input type="text"   name="s_state_cd" value="<bean:write name="hblVO" property="state_cd"/>" dataformat="excepthan" style="width:30px;ime-mode:disabled;text-transform:uppercase;" maxlength="2" onBlur="strToUpper(this);codeCheck('state_us',this)"><!-- 
             --><button type="button" class="input_seach_btn" tabindex="-1" onClick="doWork('STATE_POPLIST2',this)"></button><!-- 
             --><input type="text"   name="s_state_nm" value="<bean:write name="hblVO" property="state_nm"/>"  class="search_form-disable" style="width:153px;" readOnly></td>
			<th><bean:message key="Carrier"/></th>
			<td colspan="3"><input type="text" name="s_carr_trdp_cd1" maxlength="20"  value="<bean:write name="hblVO" property="carr_trdp_cd1"/>" onBlur="strToUpper(this);" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:70px;"><!-- 
			 --><input type="text" name="s_carr_trdp_nm1" maxlength="50" value="<bean:write name="hblVO" property="carr_trdp_nm1"/>" onBlur="strToUpper(this);" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:140px;"></td>
           </tr>
           <tr>
			   <th><bean:message key="Inbond_Type"/></th>
               <td><!-- 
                --><select name="s_ibd_tp" style="width:215px;"><!-- 
                --><option></option><!-- 
                --><logic:iterate id="inbondTp" name="valMap" property="inbondTpList"><!-- 
                --><option value="<bean:write name="inbondTp" property="cd_val"/>"><bean:write name="inbondTp" property="cd_val"/>-<bean:write name="inbondTp" property="cd_nm"/></option><!-- 
                --></logic:iterate><!-- 
                --></select><!-- 
                --><input type="hidden" name="s_h_ibd_tp" value="<bean:write name="hblVO" property="ibd_tp"/>"><!-- 
                --></td>
				<th><bean:message key="Flight_Flag"/></th>
				<td colspan="3"><!-- 
				 --><input type="text" name="s_vsl_nm" value="<bean:write name="hblVO" property="trnk_vsl_nm"/>" class="search_form-disable" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:185px;" readOnly><!-- 
				 --><input type="text" name="s_vsl_flg" value="" class="search_form-disable" style="width:25px;" readOnly><!-- 
				 --><input type="hidden" name="s_vsl_cd" value="<bean:write name="hblVO" property="trnk_vsl_cd"/>"><!-- 
				 --></td>
            </tr>
            <tr>
				<th><bean:message key="Import_Entry_No"/></th>
				<td><input type="text" name="s_imp_en_no" maxlength="15" value="<bean:write name="hblVO" property="imp_en_no"/>" onblur="strToUpper(this)" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:115px;"></td>
                <td colspan="4"><!-- 
	                 --><table><!-- 
		                 --><tr><!-- 
			                 --><td width="170px" style="padding-left: 44px;font-weight: bold;"><label for="s_rt_flg"><bean:message key="Routed_Export_Transaction"/></label></td><!-- 
			                 --><td><!-- 
			                	 --><input type="checkBox" name="s_rt_flg" id="s_rt_flg" value="<bean:write name="hblVO" property="rt_flg"/>" onclick="flgChange(this);"><!-- 
			                 --></td><!-- 
		                 --></tr><!-- 
	                 --></table><!-- 
                 --></td>
            </tr>
            <tr>
				<th><bean:message key="Foreign_Trade_Zone"/></th>
				<td><input type="text" name="s_ftz_cd" maxlength="5" value="<bean:write name="hblVO" property="ftz_cd"/>" onblur="strToUpper(this)" style="width:115px;text-transform:uppercase;"></td>
                <td colspan="4"><!-- 
                 --><table><!-- 
                 --><tr><!-- 
                 --><td width="170px" style="padding-left: 44px;font-weight: bold;"><label for="s_haz_flg"><bean:message key="Hazardous_Material"/></label></td><!-- 
                 --><td><!-- 
                 --><input type="checkBox" name="s_haz_flg" id="s_haz_flg" value="<bean:write name="hblVO" property="haz_flg"/>" onclick="flgChange(this);"><!-- 
                 --></td><!-- 
                 --></tr><!-- 
                 --></table><!-- 
                 --></td>
             </tr>
             <tr>
				<th><bean:message key="Export_Code"/></th>
                <td><!-- 
                 --><select name="s_exp_cd" style="width:215px;"><!-- 
                 --><logic:iterate id="exportCd" name="valMap" property="exportCdList"><!-- 
                	 --><option value="<bean:write name="exportCd" property="cd_val"/>"><bean:write name="exportCd" property="cd_val"/>-<bean:write name="exportCd" property="cd_nm"/></option><!-- 
                 --></logic:iterate><!-- 
                 --></select><!-- 
                 --><input type="hidden" name="s_h_exp_cd" value="<bean:write name="hblVO" property="exp_cd"/>"></td>
                <td colspan="4"><!-- 
	                 --><table><!-- 
	                 --><tr><!-- 
	                 --><td width="170px" style="padding-left: 44px;font-weight: bold;"><label for="s_cntr_flg"><bean:message key="Containerized"/></label></td><!-- 
	                 --><td><input type="checkBox" name="s_cntr_flg" id="s_cntr_flg" disabled></td><!-- 
	                 --></tr><!-- 
	                 --></table><!-- 
                 --></td>
            </tr>
            <tr>
				<th><bean:message key="Response_Email"/></th>
				<td><input type="text" name="s_rsps_eml" maxlength="50" value="<bean:write name="hblVO" property="rsps_eml"/>" style="width:215px;"></td>
                <td colspan="4"><!-- 
                 --><table><!-- 
                 --><tr><!-- 
                  --><td width="170px" style="padding-left: 44px;font-weight: bold;"><label for="s_rcc_flg"><bean:message key="Company_Related"/></label></td><!-- 
                   --><td><input type="checkBox" name="s_rcc_flg" id="s_rcc_flg" value="<bean:write name="hblVO" property="rcc_flg"/>" onclick="flgChange(this);"></td><!-- 
                   --></tr><!-- 
                   --></table><!-- 
                   --></td>
           </tr>
	</table>
</div>
<table class="line_bluedot"><tr><td></td></tr></table>
<div class="opus_design_grid">
	<h3 style="margin-bottom:0" class="title_design"><bean:message key="Commodity"/></h3>
	<div class="opus_design_btn">
		 <button type="button" class="btn_normal" onClick="doWork('ADD_ROW1')"><bean:message key="Add"/></button>
	</div>
 	<script type="text/javascript">comSheetObject('sheet1');</script>
</div>