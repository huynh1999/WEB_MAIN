<div class= "opus_design_inquiry">
	<table>
		<colgroup>
			<col width="70">
			<col width="150">
			<col width="90">
			<col width="150">
			<col width="70">
			<col width="150">
			<col width="70">
			<col width="150">
			<col width="70">
			<col width="150">
			<col width="70">
			<col width="*">
		</colgroup>
		<tbody>
			<tr>
				<th><bean:message key="HBL_No"/></th>
				<td>
                    <input type="text" name="bl_no" maxlength="40" value='<bean:write name="hblVO" property="bl_no"/>' onblur="strToUpper(this)" class="search_form" dataformat="excepthan" otherchar = "<%=FWD_OTHER_CHAR%>" style="ime-mode:disabled; text-transform:uppercase;width:130px;" onclick="strAuto(this);">
                    <input type="hidden" name="h_bl_no" value="<bean:write name="hblVO" property="bl_no"/>">
                </td>
				<th><bean:message key="BL_Type"/></th>
				<td>
					<bean:define id="blTypeList" name="valMap" property="blTypeList"/>
					<html:select name="hblVO" property="hbl_tp_cd" styleClass="search_form" style="width:115px;">
						<html:options collection="blTypeList" property="cd_val" labelProperty="cd_nm"/>
					</html:select>
				</td>
				<th><bean:message key="Liner_Bkg"/></th>
                <td><input name="lnr_bkg_no" value='<bean:write name="hblVO" property="lnr_bkg_no"/>' type="text" class="search_form-disable" onblur="strToUpper(this)" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:125px;" tabindex="-1" readonly></td>
                <th><bean:message key="MBL_No"/></th>
                <td><input type="text" name="mbl_no" maxlength="40" value='<bean:write name="hblVO" property="mbl_no"/>' class="search_form-disable" onblur="strToUpper(this)" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:130px;" ondblclick="goToBlPage('view_mbl', this.value)" tabindex="-1" readonly></td>
                <!-- #3355 [JTC]Dock Receipt 수정 -->
                <th><bean:message key="AMS_ISF_No"/></th>
                <td><input type="text" name="ams_no" maxlength="20" value="<bean:write name="hblVO" property="ams_no"/>" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:130px;text-transform:uppercase;" onblur="strToUpper(this)"><!-- 
                --><input type="text" name="isf_no" maxlength="20" value='<bean:write name="hblVO" property="isf_no"/>' class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:115px;text-transform:uppercase;" onblur="strToUpper(this)"><!-- 
                --></td>
                <td></td>
                <td></td>
			</tr>
			<tr>
                <th><a href="javascript:GOTOMBL(frm1.ref_no.value, frm1.rlt_intg_bl_seq.value, 'S', 'O');" style="color:#0000FF"><bean:message key="Ref_No"/></a></th>
				<td><!--  input required  type="text" name="ref_no" id="ref_no" maxlength="20" value='<bean:write name="hblVO" property="ref_no"/>' onblur="strToUpper(this);" onchange="checkRefNo(this);" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:100px;" onKeyDown="javascript:if(event.keyCode == '13'){event.preventDefault();fncBlSearch();}"-->
				<input type="hidden" id="chkDgt" value="F" />
				<input type="text" name="ref_no" id="ref_no" maxlength="20" value='<bean:write name="hblVO" property="ref_no"/>' onblur="strToUpper(this);" onchange="checkRefNo(this);" class="search_form" dataformat="excepthan" otherchar = "<%=FWD_OTHER_CHAR%>" style="ime-mode:disabled; text-transform:uppercase; width:100px;"><!-- 
                    --><input type="hidden" name="ref_ofc_cd" value='<bean:write name="hblVO" property="ref_ofc_cd"/>' onblur="strToUpper(this)" class="search_form-disable" style="width:45px;text-transform:uppercase;" tabindex="-1" readonly><!-- 
                    --><button type="button" id="brnRef_no" class="input_seach_btn" tabindex="-1" onClick="srOpenPopUp('REF_POPLIST1_BLANK',this)"></button><!-- 
                    --><input type="hidden" name="rlt_intg_bl_seq" value='<bean:write name="hblVO" property="rlt_intg_bl_seq"/>'></td>
				<th><bean:message key="Post_Date"/></th>
                <td><input type="text" name="post_dt" value='<wrt:write name="hblVO" property="post_dt" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy"/>' onKeyUp="mkDateFormatType(this, event, false,1)" onBlur="mkDateFormatType(this, event, true,1)" size='11' maxlength="10" class="search_form-disable" style="width:115px;" tabindex="-1" readonly></td>
                <th><bean:message key="MRN"/></th>
				<td><input type="text" name="mrn_no"  maxlength="20" value='<bean:write name="hblVO" property="mrn_no"/>' class="search_form-disable" dataformat="excepthan" style="ime-mode:disabled;width:125px;text-transform:uppercase;" onblur="strToUpper(this)" readonly></td>
				<th><bean:message key="Document_No"/></th>
				<td><input type="text" name="doc_recpt_no" maxlength="20" value='<bean:write name="hblVO" property="doc_recpt_no"/>' onblur="strToUpper(this);" class="search_form" dataformat="excepthan" style="ime-mode:disabled;text-transform:uppercase;width:130px;" ></td>
				<th style="display:none"><bean:message key="Template"/></th>
				<th><bean:message key="TLI_NO"/></th>
				<td>
						<input type="text" name="tli_no" maxlength="30" value='<bean:write name="hblVO" property="tli_no"/>' onblur="strToUpper(this);" class="search_form" dataformat="excepthan" style="ime-mode:disabled;text-transform:uppercase;width:130px;" ><!-- 
					 --><label for="sub_mbl_flg"><bean:message key="Sub_MBL"/></label><!-- 
					 --><input type="checkbox" name="sub_mbl_flg" id="sub_mbl_flg" value="<bean:write name="hblVO" property="sub_mbl_flg"/>" onclick="flgChange(this);" />
				</td>
				
				<td colspan="3" style="display:none"><input type="text" name="jb_tmplt_nm" value='<bean:write name="hblVO" property="jb_tmplt_nm"/>' class="search_form-disable" style="width:100px;" tabindex="-1" readonly><!-- 
					 --><button type="button" class="input_seach_btn" tabindex="-1" onClick="openPopUp('WORKFLOW_POPLIST',this)"></button><!--
					 --><html:hidden name="hblVO" property="jb_tmplt_seq"/>
				</td>
			</tr>
			<tr>
				<th><bean:message key="LC_No"/></th>
				<td><input type="text" name="lc_no" maxlength="40" value='<bean:write name="hblVO" property="lc_no"/>' class="search_form" onblur="strToUpper(this)" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:130px;" onchange="textdescAdd(frm1.desc_txt, 'L/C NO. : ', this.value, frm1.h_lc_no);"><!-- 
					--><input type="hidden" name="h_lc_no" value='<bean:write name="hblVO" property="lc_no"/>'></td>
				<th><bean:message key="Invoice_No"/></th>
				<td><input type="text" name="inv_no" maxlength="50" value='<bean:write name="hblVO" property="inv_no"/>'onblur="strToUpper(this)" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:115px;" onchange="textdescAdd(frm1.desc_txt, 'INV. NO : ', this.value, frm1.h_inv_no);"><!-- 
					--><input type="hidden" name="h_inv_no" value='<bean:write name="hblVO" property="inv_no"/>'></td>

				<!-- #20969 [BINEX] Ocean Export HBL Customer No filed . Customer No  Export Reference No copy, jsjang 2013.10.7 -->
				<th><bean:message key="Booking_No"/></th>
				<td><input type="text" name="bkg_no" maxlength="20" value='<bean:write name="hblVO" property="bkg_no"/>' onblur="strToUpper(this);" onchange="checkBkgNo(this);" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:96px;" onKeyDown="fncBkgSearch()"><!-- 
                    --><button type="button" class="input_seach_btn" tabindex="-1" onClick="doWork('BKNO_POPLIST_OEH',this)"></button> <!-- #1266 [CLT] OEH B/L Entry Ã¬ÂÂÃ¬ÂÂ Booking Ã«Â²ÂÃ­ÂÂ¸Ã¬Â§ÂÃ¬Â Â Ã¬ÂÂ Booking Data Copy Ã«Â¡ÂÃ¬Â§Â -->
                    <input type="hidden" name="bkg_seq" value='<bean:write name="hblVO" property="bkg_seq"/>'>
                    <input type="hidden" name="org_bkg_seq" value='<bean:write name="hblVO" property="bkg_seq"/>'>
                    <input type="hidden" name="f_bkg_no" value='<bean:write name="hblVO" property="bkg_no"/>'></td>
                <th><bean:message key="Customer_Ref_No"/></th>
                <td><input type="text" name="cust_ref_no" maxlength="40"  value="<bean:write name="hblVO" property="cust_ref_no"/>" class="search_form" dataformat="multiLanguage" style="ime-mode:disabled;width:115px;text-transform:uppercase;width:130px;" onblur="strToUpper(this)" onchange="textdescAdd(frm1.exp_ref_no, '', this.value, frm1.h_cust_ref_no);"><!-- 
                     --><input type="hidden" name="h_cust_ref_no" value='<bean:write name="hblVO" property="cust_ref_no"/>'></td>
                <th><bean:message key="Agent_Reference_No"/></th>
                <td><input type="text" name="prnr_ref_no" maxlength="40"  value="<bean:write name="hblVO" property="prnr_ref_no"/>" class="search_form" dataformat="multiLanguage" style="ime-mode:disabled;width:115px;text-transform:uppercase;width:130px;" onblur="strToUpper(this)" ></td>
				<th><bean:message key="WO_No"/></th>
				<td><input type="text" name="reserve_field03" maxlength="40" value='<bean:write name="hblVO" property="reserve_field03"/>' class="search_form" onblur="strToUpper(this)" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:100px;" onchange="checkWONo();" onKeyDown="fncWOSearch()"><!-- 
                --><button type="button" class="input_seach_btn" tabindex="-1" onClick="woOpenPopUp('S')"></button></td>
                <!--#1430 [PATENT] 0215_15 B/L TYPE DIVERSELY-->
                <%-- #1619 [CLT] Original B/L Type- 
                <th><bean:message key="Release_Type"/></th>
                <td>
                <bean:define id="RlTypeList" name="valMap" property="RlTypeList"/>
					<html:select name="hblVO" property="bl_rlse_tp_cd" styleClass="search_form" style="width:100px;">
					<option></option>
					<html:options collection="RlTypeList" property="cd_val" labelProperty="cd_nm"/>
					</html:select>
                </td>
                 --%>
			</tr>
			</tbody>
		</table>
		
</div>
	<!-- layout_wrap(S) -->
	<div class="layout_wrap"  style="min-width: 1440px;">
		<div class="layout_vertical_3" style="width:34%;min-width:585px;" >
			<!-- layout_vertical a (S) -->
		    <div class="layout_vertical_2" style="width: 48%;">
				<!-- OFVFOUR-7814 [AIF] ADDING TEAM INFORMATION ON THE ALL ENTRY SCREEN -->
				<div class="opus_design_inquiry sm" style="height:700px;">
		    	<h3 class="title_design"><bean:message key="Customer"/></h3>
				<table>
					<colgroup>
						<col width="70px" />
						<col width="40px" />
						<col width="*" />
					</colgroup>
					<tbody>
						<tr>
							<th><a href="javascript:clearBlPrnr('P01');"><bean:message key="Partner"/></a></th>
							<td colspan="2"><input type="text" name="prnr_trdp_cd" maxlength="20" value='<bean:write name="hblVO" property="prnr_trdp_cd"/>' onKeyDown="codeNameAction('trdpCode_partner',this, 'onKeyDown', 'S', 'O', 'H')" onBlur="strToUpper(this);codeNameAction('trdpCode_partner',this, 'onBlur', 'S', 'O', 'H')" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:50px;"><!-- 
	                            --><button type="button" name="partner" id="partner" class="input_seach_btn" tabindex="-1" onClick="openPopUp('LINER_POPLIST',this)"></button><!-- 
	                            --><input type="text"   name="prnr_trdp_nm" maxlength="50" value='<bean:write name="hblVO" property="prnr_trdp_nm"/>' onblur="strToUpper(this)" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:121px;" onKeyPress="if(event.keyCode==13){openPopUp('LINER_POPLIST', document.getElementById('partner'), frm1.prnr_trdp_nm.value);}"><!-- 
								--><input type="hidden" name="prnr_trdp_addr" value='<bean:write name="hblVO" property="prnr_trdp_addr"/>'>                                                        </td>
			            </tr>
			            <tr>
							<th><a href="javascript:clearBlPrnr('S02');"><bean:message key="Customer"/></a></th>
							<td colspan="2"><input required type="text" name="act_shpr_trdp_cd" maxlength="20" value='<bean:write name="hblVO" property="act_shpr_trdp_cd"/>' class="search_form" onKeyDown="codeNameAction('trdpCode_ashipper',this, 'onKeyDown', 'S', 'O', 'H');checkTrdpCode(this);" onBlur="strToUpper(this);codeNameAction('trdpCode_ashipper',this, 'onBlur', 'S', 'O', 'H');checkTrdpCode(this);" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:50px;"><!--
								--><button type="button" name="ashipper" id="ashipper" class="input_seach_btn" tabindex="-1" onClick="openPopUp('LINER_POPLIST',this)"></button><!--
								--><input type="text" required  name="act_shpr_trdp_nm" maxlength="50" value='<bean:write name="hblVO" property="act_shpr_trdp_nm"/>' onblur="strToUpper(this);checkTrdpCode(this);" class="search_form" dataformat="multiLanguage" style="ime-mode:disabled;width:121px;text-transform:uppercase;" onKeyPress="if(event.keyCode==13){openPopUp('LINER_POPLIST', document.getElementById('ashipper'), frm1.act_shpr_trdp_nm.value);}"></td>
						</tr>
	                          <tr style="display:none">
	                              <td colspan="2"><textarea name="act_shp_info" class="search_form autoenter_50px" onblur="strToUpper(this);chkCmpAddr(this, 'Actual Shipper')" dataformat="excepthan" style="width:260px;height:60px;" WRAP="off"><bean:write name="hblVO" property="act_shp_info" filter="true"/></textarea></td>
	                          </tr>
						<tr>
							<th id="blShpObj"><a href="javascript:clearBlPrnr('S01');"><bean:message key="Shipper"/></a></th>
							<td colspan="2"><input type="text"   name="shpr_trdp_nm" maxlength="50" value='<bean:write name="hblVO" property="shpr_trdp_nm"/>'  onblur="strToUpper(this);checkTrdpCode(this);"  class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:175px;text-transform:uppercase;" onKeyPress="if(event.keyCode==13){openPopUp('LINER_POPLIST', document.getElementById('shipper'), frm1.shpr_trdp_nm.value);}"><!-- 
								--><button type="button" name="shipper" id="shipper" class="input_seach_btn" tabindex="-1" onClick="openPopUp('LINER_POPLIST',this);"></button><!-- 
								--><input type="hidden" name="shpr_trdp_cd" value='<bean:write name="hblVO" property="shpr_trdp_cd"/>'  class="search_form" onKeyDown="codeNameAction('trdpCode_shipper',this, 'onKeyDown')" onBlur="strToUpper(this);codeNameAction('trdpCode_shipper',this, 'onBlur')" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:48px;"></td>
						</tr>
						<tr>
							<td colspan="3">
								<textarea name="shpr_trdp_addr" class="search_form autoenter_50px" dataformat="excepthan" style="width:270px;height:80px;" onblur="strToUpper(this);chkCmpAddr(this, 'Shipper Address')" WRAP="off"><bean:write name="hblVO" property="shpr_trdp_addr" filter="true"/></textarea>
							</td>
						</tr>
						<tr>
							<th id="blConObj"><a href="javascript:clearBlPrnr('C01');"><bean:message key="Consignee"/></a></th>
							<td colspan="2"><input type="hidden" name="cnee_trdp_cd"  value='<bean:write name="hblVO" property="cnee_trdp_cd"/>'  onKeyDown="codeNameAction('trdpCode_consignee',this, 'onKeyDown')" onBlur="strToUpper(this);codeNameAction('trdpCode_consignee',this, 'onBlur');" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:48;"><!-- 
								--><input type="text"   name="cnee_trdp_nm"  maxlength="50" value='<bean:write name="hblVO" property="cnee_trdp_nm"/>'  onblur="strToUpper(this);checkTrdpCode(this);"   class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:175px;text-transform:uppercase;" onKeyPress="if(event.keyCode==13){openPopUp('LINER_POPLIST', document.getElementById('consignee'), frm1.cnee_trdp_nm.value);}"><!-- 
								--><button type="button" name="consignee" id="consignee" class="input_seach_btn" tabindex="-1" onClick="openPopUp('LINER_POPLIST',this);"></button></td>
						</tr>
						<tr>
							<td colspan="3"><textarea name="cnee_trdp_addr" class="search_form autoenter_50px" dataformat="excepthan" style="width:270px;height:80px;" onblur="strToUpper(this);chkCmpAddr(this, 'Consignee Address')" WRAP="off"><bean:write name="hblVO" property="cnee_trdp_addr" filter="true"/></textarea></td>
						</tr>
						<tr>
							<th><a href="javascript:clearBlPrnr('N01');"><bean:message key="Notify"/></a></th>
							<td colspan="2"><input type="hidden" name="ntfy_trdp_cd"  value='<bean:write name="hblVO" property="ntfy_trdp_cd"/>' class="search_form" onKeyDown="codeNameAction('trdpCode_notify',this, 'onKeyDown')" onBlur="strToUpper(this);codeNameAction('trdpCode_notify',this, 'onBlur')" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:48px;"><!-- 
								--><input type="text"   name="ntfy_trdp_nm"  value='<bean:write name="hblVO" property="ntfy_trdp_nm"/>' onblur="strToUpper(this);checkTrdpCode(this);" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:175px;text-transform:uppercase;" maxlength="50" onKeyPress="if(event.keyCode==13){openPopUp('LINER_POPLIST', document.getElementById('notify'), frm1.ntfy_trdp_nm.value);}"><!-- 
	                            --><button type="button" name="notify" id="notify" class="input_seach_btn" tabindex="-1" onClick="openPopUp('LINER_POPLIST',this)"></button></td>
						</tr>
						<tr>
							<td colspan="3"><a href="javascript:copyValue('SAC', 'S', 'O', 'H')"><bean:message key="Same_As_Consignee"/></a>&nbsp;<!-- 
								--><a href="javascript:copyValue('CNEE', 'S', 'O', 'H')"><bean:message key="Copy"/></a></td>
						</tr>
						<tr>
							<td colspan="3"><textarea name="ntfy_trdp_addr" class="search_form autoenter_50px" dataformat="excepthan" style="width:270px;height:80px;" onblur="strToUpper(this);chkCmpAddr(this, 'Notify Address')" WRAP="off"><bean:write name="hblVO" property="ntfy_trdp_addr" filter="true"/></textarea></td>
						</tr>
						<tr height="7px"></tr>
						<tr>
	                    	<td colspan="3">
	                        	<h3 class="title_design"><bean:message key="Contribution"/></h3>
	                      	</td>
	                  	</tr>
	                  	<tr>
	                  		<th colspan="2"><bean:message key="Contrib_Office"/></th>
	                 		<td>
	                        	<input type="text"   name="ctrb_ofc_cd" value='<bean:write name="hblVO" property="ctrb_ofc_cd"/>' class="search_form" onKeyDown="codeNameAction('officeCd_ctrbOfc',this, 'onKeyDown')" onBlur="strToUpper(this);codeNameAction('officeCd_ctrbOfc',this, 'onBlur')" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:70px;"><!-- 
	                            --><button type="button" name="ctrbOfc" id="ctrbOfc" class="input_seach_btn" tabindex="-1" onClick="openSeiPopUp('OFFICE_GRID_POPLIST',this)"></button>
	                      	</td>
	                  	</tr>
	                  	<tr>
			    			<th colspan="2"><bean:message key="Contrib_Dept"/></th>
							<td>
								<bean:define id="ctrbDeptList" name="valMap" property="ctrbDeptList"/>
	                           	<html:select name="hblVO" property="ctrb_dept_cd" styleClass="search_form" style="width:100px;">
	                               	<option value=""></option>
	                       		<html:options collection="ctrbDeptList" property="cd_val" labelProperty="cd_nm"/>
	                            </html:select>
							</td>
						</tr>
					</tbody>
				</table>
				</div>
		    </div>
		    <!-- layout_vertical a (E) -->
		    <!-- layout_vertical b (S) -->
		    
		    <div class="layout_vertical_2 "  style="width: 52%;">
				<!-- OFVFOUR-7814 [AIF] ADDING TEAM INFORMATION ON THE ALL ENTRY SCREEN -->
				<div class="opus_design_inquiry sm" style="height:700px;">
		    	<h3 class="title_design"></h3>
		    			<table>
		  					<colgroup>
		  						<col width="70px" />
		  						<col width="*" />
		  					</colgroup>
		  					<tbody>
					        	<tr>
	                                <th><a href="javascript:clearBlPrnr('C03');"><bean:message key="C_Broker"/></a></th>
	                                <td><input type="text" name="cust_trdp_cd" maxlength="20" value='<bean:write name="hblVO" property="cust_trdp_cd"/>' onKeyDown="codeNameAction('trdpCode_cust',this, 'onKeyDown')" onBlur="strToUpper(this);codeNameAction('trdpCode_cust',this, 'onBlur')" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:50px;"><!--
	                                   --><button type="button" name="cust" id="cust" class="input_seach_btn" tabindex="-1" onClick="openPopUp('LINER_POPLIST',this)"></button><!--
	                                    --><input type="text"   name="cust_trdp_nm" maxlength="50" value='<bean:write name="hblVO" property="cust_trdp_nm"/>' onblur="strToUpper(this);checkTrdpCode(this);" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:92px;text-transform:uppercase;" onKeyPress="if(event.keyCode==13){openPopUp('LINER_POPLIST', document.getElementById('cust'), frm1.cust_trdp_nm.value);}"></td>
	                            </tr>
	                            <tr>
	                                <td colspan="2"><textarea name="cust_trdp_addr" class="search_form autoenter_50px" onblur="strToUpper(this);chkCmpAddr(this, 'Customs Broker')" dataformat="excepthan" style="width:285px;height:80px;" WRAP="off"><bean:write name="hblVO" property="cust_trdp_addr" filter="true"/></textarea></td>
	                            </tr>
	                            <tr>
	                            	<th colspan="2" style="text-align: left;"><bean:message key="Export_Reference_No"/></th>
	                            </tr>
	                            <tr>
	                                <td colspan="2"><textarea name="exp_ref_no" maxlength="200" class="search_form autoenter_50px" onblur="strToUpper(this);" dataformat="excepthan" style="width:285px;height:80px;" WRAP="off"><bean:write name="hblVO" property="exp_ref_no" filter="true"/></textarea></td>
	                            </tr>
								<tr>
									<th><a href="javascript:clearBlPrnr('A01');"><bean:message key="Forwarding_Agent"/></a></th>
									<td><input type="text" name="agent_trdp_cd" maxlength="20" value='<bean:write name="hblVO" property="agent_trdp_cd"/>' onKeyDown="codeNameAction('trdpCode_agent',this, 'onKeyDown')" onBlur="strToUpper(this);codeNameAction('trdpCode_agent',this, 'onBlur')" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:50px;"><!--
			                            --><button type="button" name="agent" id="agent" class="input_seach_btn" tabindex="-1" onClick="openPopUp('LINER_POPLIST',this)"></button><!--
			                            --><input type="text"   name="agent_trdp_nm" maxlength="50" value='<bean:write name="hblVO" property="agent_trdp_nm"/>' onblur="strToUpper(this)" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:92px;" onKeyPress="if(event.keyCode==13){openPopUp('LINER_POPLIST', document.getElementById('agent'), frm1.agent_trdp_nm.value);}"><!--
										--><input type="hidden" name="agent_trdp_addr" value='<bean:write name="hblVO" property="agent_trdp_addr"/>'>                                                        </td>
					            </tr>
								<tr>
									<th><a href="javascript:clearBlPrnr('P03');"><bean:message key="Triangle_Agent"/></a></th>
									<td><input type="text" name="prnr_trdp_cd2" maxlength="20" value='<bean:write name="hblVO" property="prnr_trdp_cd2"/>' onKeyDown="codeNameAction('trdpCode_partner2',this, 'onKeyDown')" onBlur="strToUpper(this);codeNameAction('trdpCode_partner2',this, 'onBlur')" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:50px;"><!--
			                            --><button type="button" name="partner2" id="partner2" class="input_seach_btn" tabindex="-1" onClick="openPopUp('LINER_POPLIST',this)"></button><!--
			                            --><input type="text"   name="prnr_trdp_nm2" maxlength="50" value='<bean:write name="hblVO" property="prnr_trdp_nm2"/>' onblur="strToUpper(this)" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:92px;" onKeyPress="if(event.keyCode==13){openPopUp('LINER_POPLIST', document.getElementById('partner2'), frm1.prnr_trdp_nm2.value);}"><!--
										--><input type="hidden" name="prnr_trdp_addr2" value='<bean:write name="hblVO" property="prnr_trdp_addr2"/>'></td>
					            </tr> 
								<tr>
									<th><a href="javascript:clearBlPrnr('V01');"><bean:message key="Vendor"/></a></th>
									<td><input type="text" name="vndr_trdp_cd" maxlength="20" value='<bean:write name="hblVO" property="vndr_trdp_cd"/>' onKeyDown="codeNameAction('trdpCode_vndr',this, 'onKeyDown')" onBlur="strToUpper(this);codeNameAction('trdpCode_vndr',this, 'onBlur')" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:50px;"><!--
										--><button type="button" name="vndr" id="vndr" class="input_seach_btn" tabindex="-1" onClick="openPopUp('LINER_POPLIST', this)"></button><!--
										--><input type="text" name="vndr_trdp_nm" maxlength="50" value='<bean:write name="hblVO" property="vndr_trdp_nm"/>' onblur="strToUpper(this);checkTrdpCode(this);" class="search_form" dataformat="multiLanguage" style="ime-mode:disabled;width:92px;text-transform:uppercase;" onKeyPress="if(event.keyCode==13){openPopUp('LINER_POPLIST', document.getElementById('vndr'), frm1.vndr_trdp_nm.value);}"><!--
										--><input type="hidden" name="vndr_trdp_addr" value='<bean:write name="hblVO" property="vndr_trdp_addr"/>'></td>
								</tr>
								<tr>
									<th><bean:message key="Trucker"/></th>
									<td><input type="text" name="trk_trdp_cd" maxlength="20" value='<bean:write name="hblVO" property="trk_trdp_cd"/>' onKeyDown="codeNameAction('trdpCode_trk',this, 'onKeyDown')" onBlur="strToUpper(this);codeNameAction('trdpCode_trk',this, 'onBlur')" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:50px;"><!--
	                                    --><button type="button" name="trk" id="trk" class="input_seach_btn" tabindex="-1" onClick="openPopUp('LINER_POPLIST',this)"></button><!--
	                                    --><input type="text"   name="trk_trdp_nm" maxlength="50" value='<bean:write name="hblVO" property="trk_trdp_nm"/>' onblur="strToUpper(this)" class="search_form" dataformat="multiLanguage" style="ime-mode:disabled; text-transform:uppercase;width:92px;" onKeyPress="if(event.keyCode==13){openPopUp('LINER_POPLIST', document.getElementById('trk'), frm1.trk_trdp_nm.value);}"><!--
										--><input type="hidden" name="trk_trdp_addr" value='<bean:write name="hblVO" property="trk_trdp_addr"/>'>                                                        </td>
					            </tr>
	                           	<tr>
		                            <th colspan="2" style="text-align: left;"><bean:message key="Container_Summary"/></th>
		                        </tr>
		                        <tr>
		                            <td colspan="2"><input type="text" name="cntr_info" value='<bean:write name="hblVO" property="cntr_info"/>' onBlur="strToUpper(this)" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:285px;" maxlength="50"></td>
		                        </tr>
		                        <tr height="7px">&nbsp;</tr>
								<tr>
	                    			<td colspan="4">
	                        			<h3 style="font-size:12px;">&nbsp;</h3>
	                      			</td>
	                  			</tr>
	                  			<tr height="45px">&nbsp;</tr>
	                  			<tr>
		                        	<th><bean:message key="Use_Ratio"/></th>
									<td colspan="3">
										<input type="checkBox" name="ctrb_ratio_yn" id="ctrb_ratio_yn" value="<bean:write name="hblVO" property="ctrb_ratio_yn"/>" onclick="flgChange(this);clickCtrbRatioYn();">
										<input type="text" name="ctrb_mgn" value="<bean:write name="hblVO" property="ctrb_mgn"/>" onkeyPress="onlyNumberCheck('.');" onchange="numberCommaLen(this,20,2);chkComma(this,20,2);" onBlur="checkRatioValid();" maxlength="23" class="search_form zero_remove" dataformat="excepthan" style="ime-mode:disabled;width:85px;text-align:right;">
									</td>
								</tr>
		  					</tbody>
		  				</table>
		  			</div>
		    </div>
	    </div>
	    <!-- layout_vertical b (E) -->
	    <!-- layout_vertical c (S) -->
	    
	    <div class="layout_vertical_3 mar_left_4" style="width:23%;min-width: 340px;" >
			<!-- OFVFOUR-7814 [AIF] ADDING TEAM INFORMATION ON THE ALL ENTRY SCREEN -->
			<div class="opus_design_inquiry sm" style="height:700px;">
	    		<table>
	    			<colgroup>
				    			<col width="75px" />
				    			<col width="75px" />
				    			<col width="*" />
				    </colgroup>
				    <tbody>
				    	<tr>
							<td colspan="4"><h3 class="title_design"><bean:message key="Vessel"/></h3>	</td>
						</tr>
                        <tr>
                            <th><bean:message key="On_Board"/></th>
                            <td colspan="3"><input name="obrd_dt_tm" id="obrd_dt_tm" value='<wrt:write name="hblVO" property="obrd_dt_tm" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy"/>'   type="text" class="search_form" onKeyUp="mkDateFormatType(this, event, false,1)" onBlur="mkDateFormatType(this, event, true,1);dateRangeValid(this, 'Onboard');cobChange();" dataformat="excepthan" style="ime-mode:disabled;width:70px;" maxlength="10"><!-- 
                                 --><button type="button" class="calendar" tabindex="-1" name="obrd_dt_tm_cal" id="obrd_dt_tm_cal"  onclick="doDisplay('DATE1',frm1.obrd_dt_tm);" ></button></td>
                        </tr>
                        <tr>
                            <th><bean:message key="VSL_VOY"/></th>
                            <td colspan="3"><input type="hidden" name="trnk_vsl_cd" maxlength="50" value='<bean:write name="hblVO" property="trnk_vsl_cd"/>' class="search_form" onKeyDown="codeNameAction('srVessel',this, 'onKeyDown')" onBlur="strToUpper(this);codeNameAction('srVessel',this, 'onBlur');cobChange();" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:40px;"><!--
                                --><input type="text" name="trnk_vsl_nm"   value='<bean:write name="hblVO" property="trnk_vsl_nm"/>' onblur="strToUpper(this);cobChange();" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:130px;text-transform:uppercase;" maxlength="50" onchange="cobChange();" onKeyPress="if(event.keyCode==13){openPopUp('VESSEL_POPLIST', document.getElementById('trunkvessel'), frm1.trnk_vsl_nm.value);}"><!--
                                --><button type="button" name="trunkvessel" id="trunkvessel" class="input_seach_btn" tabindex="-1" onClick="openPopUp('VESSEL_POPLIST',this);"></button><!--
                                --><input type="text" name="trnk_voy"      value='<bean:write name="hblVO" property="trnk_voy"/>'   onchange="cobChange();" onblur="strToUpper(this);cobChange();"  class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:65px;text-transform:uppercase;" maxlength="15"></td>
                        </tr>
                         <tr>
                             <th><bean:message key="Lane"/></th>
                             <td>
                             <!-- bean:define id="laneList" name="valMap" property="laneList"/-->
                             <bean:define id="laneList" name="valMap" property="laneCodeList"/> <!-- #3376 [JTC] Japan Trust 용 Profit Report 개발 -->
								<html:select name="hblVO" property="lane_cd" styleClass="search_form" style="width:130px;" onchange="laneCdChange();">
									<option value=""></option>
									<html:options collection="laneList" property="cd_val" labelProperty="cd_nm"/>
								</html:select> 
								<input type="hidden" name="svc_lane_nm" id="svc_lane_nm" value="<bean:write name="hblVO" property="svc_lane_nm"/>">
                             </td>
                         </tr>                        
                        <tr>
                            <td colspan="4"><h3 class="title_design mar_top_8" style="margin-bottom:0px;"><bean:message key="Route"/></h3>	</td>
                        </tr>
                        <tr>
                        	<td colspan="2"></td>
                        	<td colspan="2"><button type="button" class="btn_etc" name="btn_msnbonded" id="btn_msnbonded" onClick="doWork('TRANSSHIPPED')"><bean:message key="Transshipped"/></button><!--
	                        	--><input type="hidden" name="pre_vsl_cd"  value='<bean:write name="hblVO" property="pre_vsl_cd"/>' ><!--
								--><input type="hidden" name="pre_vsl_nm"  value='<bean:write name="hblVO" property="pre_vsl_nm"/>' ><!--
								--><input type="hidden" name="pre_voy"  value='<bean:write name="hblVO" property="pre_voy"/>' ><!--
								--><input type="hidden" name="ts1_port_cd"  value='<bean:write name="hblVO" property="ts1_port_cd" />' ><!--
								--><input type="hidden" name="ts1_port_nm"  value='<bean:write name="hblVO" property="ts1_port_nm"/>' ><!--
								--><input type="hidden"  name="ts1_etd_dt_tm" value='<wrt:write name="hblVO" property="ts1_etd_dt_tm" formatType="DATE" fromFormat="yyyyMMdd" format="MM-dd-yyyy"/>'  ><!--
								--><input type="hidden"  name="ts1_eta_dt_tm" value='<wrt:write name="hblVO" property="ts1_eta_dt_tm" formatType="DATE" fromFormat="yyyyMMdd" format="MM-dd-yyyy"/>'   ></td>
                        </tr>
						<tr>
						<th><bean:message key="POR"/></th>
						<td colspan="3"><input type="text" name="por_cd" maxlength="5" value='<bean:write name="hblVO" property="por_cd"/>' class="search_form" onKeyDown="codeNameAction('Location_por',this, 'onKeyDown','S')" onBlur="strToUpper(this);codeNameAction('Location_por',this, 'onBlur','S')" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:50px;"><!--
							--><button type="button" name="por" id="por" class="input_seach_btn" tabindex="-1" onClick="openPopUp('LOCATION_POPLIST',this)"></button><!--
							--><input type="text" name="por_nm" maxlength="50" value='<bean:write name="hblVO" property="por_nm"/>' class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:145px;text-transform:uppercase;" onblur="strToUpper(this)" onKeyPress="if(event.keyCode==13){openPopUp('LOCATION_POPLIST', document.getElementById('por'), frm1.por_nm.value);}"></td>
					</tr>
					<tr>
						<th><bean:message key="POL"/></th>
						<td colspan="3"><input type="text" required   name="pol_cd" maxlength="5" value='<bean:write name="hblVO" property="pol_cd"/>' class="search_form" onKeyDown="codeNameAction('Location_pol',this, 'onKeyDown','S')" onBlur="strToUpper(this);codeNameAction('Location_pol_oeh',this, 'onBlur','S');cobChange();" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:50px;"><!--
							--><button type="button" name="pol" id="pol" class="input_seach_btn" tabindex="-1" onClick="openPopUp('LOCATION_POPLIST',this);"></button><!--
							--><input type="text" required  name="pol_nm" maxlength="50" value='<bean:write name="hblVO" property="pol_nm"/>' class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:145px;text-transform:uppercase;" onblur="strToUpper(this);cobChange();" onKeyPress="if(event.keyCode==13){openPopUp('LOCATION_POPLIST', document.getElementById('pol'), frm1.pol_nm.value);}" onchange="cobChange();"><!--
							--><input type="hidden" name="pol_cnt_cd" value=""></td>
					</tr>
					<tr>
						<th><bean:message key="POD"/></th>
						<td colspan="3"><input type="text" required  name="pod_cd" maxlength="5" value='<bean:write name="hblVO" property="pod_cd"/>' class="search_form" onKeyDown="codeNameAction('Location_pod',this, 'onKeyDown','S')" onBlur="strToUpper(this);codeNameAction('Location_pod',this, 'onBlur','S')" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:50px;"><!--
							--><button type="button" name="pod" id="pod" class="input_seach_btn" tabindex="-1" onClick="openPopUp('LOCATION_POPLIST',this)"></button><!--
							--><input type="text" required  name="pod_nm" maxlength="50"  value='<bean:write name="hblVO" property="pod_nm"/>' class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:145px;text-transform:uppercase;" onchange="cobChange();" onblur="strToUpper(this);cobChange();" onKeyPress="if(event.keyCode==13){openPopUp('LOCATION_POPLIST', document.getElementById('pod'), frm1.pod_nm.value);}"></td>
					</tr>
					<tr>
						<th><bean:message key="DEL"/></th>
						<td colspan="3"><input type="text" name="del_cd" maxlength="5" value='<bean:write name="hblVO" property="del_cd"/>' class="search_form" onKeyDown="codeNameAction('Location_del',this, 'onKeyDown','S')" onBlur="strToUpper(this);codeNameAction('Location_del',this, 'onBlur','S')" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:50px;"><!--
							--><button type="button" name="del" id="del" class="input_seach_btn" tabindex="-1" onClick="openPopUp('LOCATION_POPLIST',this)"></button><!--
							--><input type="text" name="del_nm" maxlength="50" value='<bean:write name="hblVO" property="del_nm"/>' class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:145px;text-transform:uppercase;" onblur="strToUpper(this)" onKeyPress="if(event.keyCode==13){openPopUp('LOCATION_POPLIST', document.getElementById('del'), frm1.del_nm.value);}"></td>
					</tr>
					<tr>
						<th><bean:message key="F_Dest"/></th>
						<td colspan="3"><input type="text" name="fnl_dest_loc_cd" maxlength="5" value='<bean:write name="hblVO" property="fnl_dest_loc_cd"/>' class="search_form" onKeyDown="codeNameAction('Location_dest',this, 'onKeyDown','S')" onBlur="strToUpper(this);codeNameAction('Location_dest',this, 'onBlur','S')" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:50px;"><!--
							--><button type="button" name="dest" id="dest" class="input_seach_btn" tabindex="-1" onClick="openPopUp('LOCATION_POPLIST',this)"></button><!--
							--><input type="text" name="fnl_dest_loc_nm" maxlength="50" value='<bean:write name="hblVO" property="fnl_dest_loc_nm"/>' class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:145px;text-transform:uppercase;" onblur="strToUpper(this)" onKeyPress="if(event.keyCode==13){openPopUp('LOCATION_POPLIST', document.getElementById('dest'), frm1.fnl_dest_loc_nm.value);}"></td>
					</tr>
					<tr>
						<th><bean:message key="Liner"/></th>
						<td colspan="3"><input type="text" name="lnr_trdp_cd" maxlength="20" value='<bean:write name="hblVO" property="lnr_trdp_cd"/>' onKeyDown="codeNameAction('trdpCode_liner',this, 'onKeyDown');setLiner()" onBlur="strToUpper(this);codeNameAction('trdpCode_liner',this, 'onBlur');setLiner()" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:50px;"><!--
                            --><button type="button" name="liner" id="liner" class="input_seach_btn" tabindex="-1" onClick="openPopUp('LINER_POPLIST',this);setLiner();"></button><!--
                            --><input type="text"   name="lnr_trdp_nm" maxlength="50"  value='<bean:write name="hblVO" property="lnr_trdp_nm"/>' onblur="strToUpper(this);setLiner()" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:145px;" onkeyup="setLiner2()" onKeyPress="if(event.keyCode==13){openPopUp('LINER_POPLIST', document.getElementById('liner'), frm1.lnr_trdp_nm.value);}"></td>
					</tr>
					<tr>
						<th><bean:message key="ETD_Of_POR"/></th>
						<td colspan="3"><input name="etd_por_tm" value='<wrt:write name="hblVO" property="etd_por_tm" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy"/>'   type="text" class="search_form" onKeyUp="mkDateFormatType(this, event, false,1)" onBlur="mkDateFormatType(this, event, true,1);dateRangeValid(this, 'ETD of POR');cobChange();" dataformat="excepthan" style="ime-mode:disabled;width:79px;" maxlength="10"><!-- 
							--><button type="button" class="calendar" tabindex="-1" name="f_etd_dt_cal" id="f_etd_dt_cal"  onclick="doDisplay('DATE1', frm1.etd_por_tm);" ></button></td>
					</tr>
					<tr>
						<th><bean:message key="ETD_of_POL"/></th>
						<td colspan="3"><input required type="text" name="etd_dt_tm" maxlength="10" value='<wrt:write name="hblVO" property="etd_dt_tm" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy"/>' class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:79px;" onKeyUp="mkDateFormatType(this, event, false,1)" onBlur="mkDateFormatType(this, event, true,1);dateRangeValid(this, 'ETD of POL');chgOnboard(this);"><!-- 
							--><button type="button" class="calendar" tabindex="-1" name="f_etd_dt_cal" id="f_etd_dt_cal"  onclick="doDisplay('DATE1', frm1.etd_dt_tm);" ></button></td>
					</tr>
					<tr>
						<th><bean:message key="ETA_of_POD"/></th>
						<td colspan="3"><input type="text" name="eta_dt_tm" maxlength="10" value='<wrt:write name="hblVO" property="eta_dt_tm" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy"/>' class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:79px;" onKeyUp="mkDateFormatType(this, event, false,1)" onBlur="mkDateFormatType(this, event, true,1);dateRangeValid(this, 'ETA of POD');"><!-- 
							--><button type="button" class="calendar" tabindex="-1" name="f_etd_dt_cal" id="f_etd_dt_cal"  onclick="doDisplay('DATE1', frm1.eta_dt_tm);" ></button></td>
					</tr>
					<tr>
						<th><bean:message key="Cargo_Pick_Up"/></th>
						<td colspan="3"><input type="text" name="cgo_pu_trdp_cd" maxlength="20" value='<bean:write name="hblVO" property="cgo_pu_trdp_cd"/>' onKeyDown="codeNameAction('trdpCode_cgo_pu',this, 'onKeyDown')" onBlur="strToUpper(this);codeNameAction('trdpCode_cgo_pu',this, 'onBlur')" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:50px;"><!--
							--><button type="button" name="cgo_pu" id="cgo_pu" class="input_seach_btn" tabindex="-1" onClick="openPopUp('LINER_POPLIST', this)"></button><!--
							--><input type="text" name="cgo_pu_trdp_nm" maxlength="50" value='<bean:write name="hblVO" property="cgo_pu_trdp_nm"/>' onblur="strToUpper(this);checkTrdpCode(this);" class="search_form" dataformat="multiLanguage" style="ime-mode:disabled;width:92px;text-transform:uppercase;" onKeyPress="if(event.keyCode==13){openPopUp('LINER_POPLIST', document.getElementById('cgo_pu'), frm1.cgo_pu_trdp_nm.value);}"><!--
							--></td>
					</tr>				
					<tr>
						<th></th>
						<td colspan="3">
							<textarea name="cgo_pu_trdp_addr" id="cgo_pu_trdp_addr" class="search_form autoenter_50" dataformat="multiLanguage" style="width:222px;height:40px;" onblur="strToUpper(this);chkCmpAddr(this, 'Notify Address')" WRAP="off"><bean:write name="hblVO" property="cgo_pu_trdp_addr" filter="true"/></textarea>
						</td>
					</tr>
					<tr>
                           <th><a href="javascript:clearBlPrnr('WH');"><bean:message key="Warehouse"/></a></th>
                           <td colspan="3"><input type="text" name="wh_trdp_cd" maxlength="20" value='<bean:write name="hblVO" property="wh_trdp_cd"/>'   onBlur="strToUpper(this);codeNameAction('trdpCode_warehouse',this, 'onBlur');" class="search_form" onKeyDown="codeNameAction('trdpCode_warehouse',this, 'onKeyDown')" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:50px;"><!--
                              --><button type="button" name="warehouse" id="warehouse" class="input_seach_btn" tabindex="-1" onClick="openPopUp('LINER_POPLIST',this)"></button><!--
                               --><input type="text"   name="wh_trdp_nm" maxlength="50" value='<bean:write name="hblVO" property="wh_trdp_nm"/>' onblur="strToUpper(this);checkTrdpCode(this);" class="search_form" dataformat="multiLanguage" style="ime-mode:disabled;width:145px;text-transform:uppercase;" onKeyPress="if(event.keyCode==13){openPopUp('LINER_POPLIST', document.getElementById('warehouse'), frm1.wh_trdp_nm.value);}">
                               <input type="hidden" name="wh_trdp_addr" value='<bean:write name="hblVO" property="wh_trdp_addr"/>'>
                               </td>
                    </tr>
					<tr>
						<th><bean:message key="Incoterms"/></th>
						<td colspan="2" style="font-weight:bold;"><bean:define id="incotermsList" name="valMap" property="incotermsList"/>
                            <html:select name="hblVO" property="inco_cd" styleClass="search_form" style="width:70px;">
                            	<option value=""></option>
                                <html:options collection="incotermsList" property="cd_val" labelProperty="cd_nm"/>
                            </html:select>
							<bean:message key="Ship_Mode"/>
							<bean:define id="shipModeList" name="valMap" property="shipModeList"/>
							<html:select name="hblVO" property="shp_mod_cd" styleId="shp_mod_cd" styleClass="input1" style="width:75px;" onchange="shipModeChange();shipModeChangeDef(this);mkSaidTxt(docObjects[2], frm1.sad_txt);" >
								<html:options collection="shipModeList" property="cd_val" labelProperty="cd_nm"/>
							</html:select>
						</td>
					</tr>
					<tr>
						<th><bean:message key="Commodity"/></th>
						<td colspan="3">
							<input type="text" name="rep_cmdt_cd" maxlength="13" value="<bean:write name="hblVO" property="rep_cmdt_cd"/>" class="search_form" onKeyDown="codeNameAction('commodity',this, 'onKeyDown')" onBlur="strToUpper(this);codeNameAction('commodity',this, 'onBlur')" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:50px;"><!--
							--><button type="button" name="commodity" id="commodity" class="input_seach_btn" tabindex="-1" onClick="openPopUp('COMMODITY_POPLIST',this)"></button><!--
							--><input type="text" name="rep_cmdt_nm" value="<bean:write name="hblVO" property="rep_cmdt_nm"/>" maxlength="100" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:145px;" onBlur="strToUpper(this);" onchange="textAdd(frm1.desc_txt, '', this.value, frm1.h_rep_cmdt_nm);" onKeyPress="if(event.keyCode==13){openPopUp('COMMODITY_POPLIST', this);}"><!--
							--><input type="hidden" name="h_rep_cmdt_nm" maxlength="50" value="<bean:write name="hblVO" property="rep_cmdt_nm"/>" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:145px;">
						</td>
					</tr>

					<tr>
						<th><a href="javascript:clearBlPrnr('STATE_CD');"><bean:message key="State_Of_Origin"/></a></th>
						<td colspan="3"><input type="text"   name="state_cd" maxlength="2" value="<bean:write name="hblVO" property="state_cd"/>" onKeyDown="codeNameAction('state',this, 'onKeyDown')" onBlur="strToUpper(this);codeNameAction('state',this, 'onBlur')" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:50px;"><!--
                           --><button type="button" name="state" id="state" class="input_seach_btn" tabindex="-1" onClick="openPopUp('STATE_POPLIST',this)"></button><!--
                           --><input type="text" maxlength="50"  name="state_nm" onblur="strToUpper(this)" class="search_form-disable" style="width:145px;text-transform:uppercase;" onblur="strToUpper(this)"  value="<bean:write name="hblVO" property="state_nm"/>" onKeyPress="if(event.keyCode==13){openPopUp('STATE_POPLIST', this);}" readOnly></td><!--
							--><input type="hidden" name="state_cnt_cd" value='<bean:write name="hblVO" property="state_cnt_cd"/>'></td>
					</tr>
		            <tr>
		                <th><a href="javascript:clearBlPrnr('CNT_CD');"><bean:message key="Dest_Country"/></a></th>
		                <td colspan="3"><input name="cnt_cd" type="text" class="search_form" dataformat="excepthan" style="width:50px;text-transform:uppercase;ime-mode:disabled;" maxlength="2" onKeyDown="codeNameAction('country',this, 'onKeyDown')" onBlur="strToUpper(this);codeNameAction('country',this, 'onBlur')" value="<bean:write name="hblVO" property="cnt_cd"/>"><!--
		                	--><button type="button" name="country" id="country" class="input_seach_btn" tabindex="-1" onClick="doWork('COUNTRY_POPLIST', 'I')"></button><!--
		                	--><input name="cnt_nm" type="text" class="search_form-disable" dataformat="excepthan" style="ime-mode:disabled;width:145px;text-align:left" value="<bean:write  name="hblVO" property="cnt_nm"/>" onblur="strToUpper(this)"  tabindex="-1" readOnly></td>
		            </tr>
					</tbody>	
	    		</table>
	    	</div>
	    </div>
	    <!-- layout_vertical c (E) -->
	    <!-- layout_vertical d (S) -->
	    <div class="layout_vertical_3 mar_left_4" style="width: 35%;min-width: 422px;" >
			<!-- OFVFOUR-7814 [AIF] ADDING TEAM INFORMATION ON THE ALL ENTRY SCREEN -->
			<div class="opus_design_inquiry sm" style="height:700px;">
	    	<h3 class="title_design"><bean:message key="Shippment_and_Item"/></h3>
		    <table>
		    	<colgroup>
		    		<col width="70px" />
		    		<col width="*" />
		    	</colgroup>
		    	<tbody>
		    		<tr>
						<th><bean:message key="Package"/></th>

<!-- #4131 [JAPT] EHBL Description ERROR & Db/Cr NOTE -->
<!-- Remove setPacQty() logic from JAPT Request-->
<%-- 						<td><input type="text" name="pck_qty" value="<bean:write name="hblVO" property="pck_qty"/>" onkeyPress="onlyNumberCheck();" onkeyup="numberCommaLen(this,7,0)" onblur="setPacQty();" maxlength="7"  class="search_form zero_remove" dataformat="excepthan" style="ime-mode:disabled;width:60px;text-align:right"> 
							<bean:define id="pckList" name="valMap" property="pckCdList"/>
							<html:select name="hblVO" property="pck_ut_cd" styleClass="search_form" style="width:150px;" onchange="setPacQty();">
								<option></option>
								<html:options collection="pckList" property="pck_ut_cd" labelProperty="pck_nm"/>
							</html:select></td> --%>
						<td><input type="text" name="pck_qty" value="<bean:write name="hblVO" property="pck_qty"/>" onkeyPress="onlyNumberCheck();" onkeyup="numberCommaLen(this,7,0)" maxlength="7"  class="search_form zero_remove" dataformat="excepthan" style="ime-mode:disabled;width:80px;text-align:right"> 
							<bean:define id="pckList" name="valMap" property="pckCdList"/>
							<html:select name="hblVO" property="pck_ut_cd" styleClass="search_form" style="width:150px;" >
								<option></option>
								<html:options collection="pckList" property="pck_ut_cd" labelProperty="pck_nm"/>
							</html:select></td>							
					</tr>
					<tr>
					<!-- #2268 [UNICO, PREMIER] Decimal place of container weight to be 3 decimal digits -->
						<th><bean:message key="GWeight"/></th>
						<td><input type="text" name="grs_wgt" value="<bean:write name="hblVO" property="grs_wgt"/>" onkeyPress="onlyNumberCheck('.');" onchange="numberCommaLen(this,8,obl_decimal_len);chkComma(this,8,obl_decimal_len);weightChange(this);amountChange(frm1.agent_rt);amountChange(frm1.cust_rt);" maxlength="13" class="search_form zero_remove" dataformat="excepthan" style="ime-mode:disabled;width:80px;text-align:right;"><!--
		                	--><input type="text" name="grs_wgt_ut_cd" value="KG" style="width:40px;border:0;background-color:transparent;" tabindex="-1" readOnly><!--
		                	--><input type="text" name="grs_wgt1" value="<bean:write name="hblVO" property="grs_wgt1"/>" onkeyPress="onlyNumberCheck('.');" onchange="numberCommaLen(this,8,obl_decimal_len);chkComma(this,8,obl_decimal_len);weightChange(this);amountChange(frm1.agent_rt);amountChange(frm1.cust_rt);" maxlength="13" class="search_form zero_remove" dataformat="excepthan" style="ime-mode:disabled;width:80px;text-align:right;"><!--
		                	--><input type="text" name="grs_wgt_ut_cd1" value="LB" style="width:30px;border:0;background-color:transparent;" tabindex="-1" readOnly></td>
					</tr>
					<tr>
						<th><bean:message key="Measurement"/></th>
						<td><input type="text" name="meas" value="<bean:write name="hblVO" property="meas"/>" onkeyPress="onlyNumberCheck('.');" onchange="numberCommaLen(this,8,obl_decimal_len);chkComma(this,8,obl_decimal_len);cbmChange(this);amountChange(frm1.agent_rt);amountChange(frm1.cust_rt);" maxlength="13" class="search_form zero_remove" dataformat="excepthan" style="ime-mode:disabled;width:80px;text-align:right;"><!--
		                	--><input type="text" name="meas_ut_cd" value="CBM" style="width:40px;border:0;background-color:transparent;" tabindex="-1" readOnly><!--
		                	--><input type="text" name="meas1" value="<bean:write name="hblVO" property="meas1"/>" onkeyPress="onlyNumberCheck('.');" onchange="numberCommaLen(this,8,obl_decimal_len);chkComma(this,8,obl_decimal_len);cbmChange(this);amountChange(frm1.agent_rt);amountChange(frm1.cust_rt);" maxlength="13" class="search_form zero_remove" dataformat="excepthan" style="ime-mode:disabled;width:80px;text-align:right;"><!--
		                	--><input type="text" name="meas_ut_cd1" value="CFT" style="width:30px;border:0;background-color:transparent;" tabindex="-1" readOnly>
						</td>
					</tr>
		    	</tbody>
		    </table>
		    
			<div class="opus_design_grid" style="max-width:500px">
				<table>
					<colgroup>
						<col width="170"></col>
						<col width="*"></col>
					</colgroup>
					<tbody>
						<tr>
							<td>
								<input type="hidden" name="size_ut_cd1" id="size_ut_cd1" value='<bean:write name="hblVO" property="size_ut_cd"/>'/>
								<input type="radio" name="size_ut_cd" id="size_ut_cd_cm" value="CM" onClick="javascript:chkSizeType();" /><!--
								--><label for="size_ut_cd_cm"><bean:message key="Cm"/></label><!--
								--><input type="radio" name="size_ut_cd" id="size_ut_cd_in" value="INCH" onClick="javascript:chkSizeType();" /><!--
								--><label for="size_ut_cd_in"><bean:message key="Inch"/></label>
							</td>
							<td>
								<div class="opus_design_btn">
								<button type="button" class="btn_accent" onClick="setSizeUp(docObjects[1], 200)"><bean:message key="Plus"/></button><!--
								--><button type="button" class="btn_normal" onClick="setSizeDown(docObjects[1], 130)"><bean:message key="Minus"/></button><!--
								--><button type="button" class="btn_normal" onClick="whRcptOpenPopUp2('S')"><bean:message key="W/H"/></button><!--
								--><button type="button" class="btn_normal" onClick="doWork('CAL_CBM_NEW')"><bean:message key="Add"/></button>
								</div>	
								<input type="hidden" name="wh_recp_no" value='<bean:write name="hblVO" property="wh_recp_no"/>'>	
							</td>
						</tr>
					</tbody>
				</table>
				<script type="text/javascript">comSheetObject('sheet13');
				/* 속도개선  */
				comConfigSheet(docObjects[1], SYSTEM_FIS);
				initSheet(docObjects[1], (1+1) );
				comEndConfigSheet(docObjects[1]);
				</script>
			</div>
		    	<table>
		    		<colgroup>
		    			<col width="130px" />
		    			<col width="125px" />
		    			<col width="90px" />
		    			<col width="*" />
		    		</colgroup>
		    		<tbody>
						<tr>
							<th><bean:message key="Buying_Rate_Amount"/></th>
							<td colspan="2" ><input type="text" name="agent_rt" maxlength="10" value="<bean:write name="hblVO" property="agent_rt"/>" class="search_form zero_remove" style="width:40px;text-align:right;" onKeyPress="ComKeyOnlyNumber(this, '.')" onChange="amountChange(this);"><!-- 
							--><input type="text" name="agent_amt" maxlength="20" value="<bean:write name="hblVO" property="agent_amt"/>" class="search_form zero_remove" style="width:77px;text-align:right;" onKeyPress="ComKeyOnlyNumber(this, '.')" onChange="amountChange(this)"><!-- 
							--><bean:define id="currCdList" name="valMap" property="currCdList"/><!-- 
							--><html:select name="hblVO" property="agent_curr_cd" styleClass="search_form" style="width:60px;">
									<html:options collection="currCdList" property="cd_val" labelProperty="cd_nm"/>
								</html:select><!--
		                	--><input type="hidden" name="h_agent_curr_cd" value="<bean:write name="hblVO" property="agent_curr_cd"/>"><!--
		                	--><bean:define id="frtList" name="valMap" property="frtCdList"/>
                                <html:select name="hblVO" property="frt_term_a_cd" styleClass="search_form" style="width:94px;">
                                    <html:options collection="frtList" property="cd_val" labelProperty="cd_nm"/>
                                </html:select><!--
             				--><input type="hidden" name="h_frt_term_a_cd" value="<bean:write name="hblVO" property="frt_term_a_cd"/>"> 
		                	</td>
		                	<th></th>
						</tr>
						<tr>
							<th><bean:message key="Selling_Rate_Amount"/></th>
							<td colspan="2"><input type="text" name="cust_rt" maxlength="10" value="<bean:write name="hblVO" property="cust_rt"/>" class="search_form zero_remove" style="width:40px;text-align:right;" onKeyPress="ComKeyOnlyNumber(this, '.')" onChange="amountChange(this);"><!-- 
							--><input type="text" name="cust_amt" maxlength="20" value="<bean:write name="hblVO" property="cust_amt"/>" class="search_form zero_remove" style="width:77px;text-align:right;" onKeyPress="ComKeyOnlyNumber(this, '.')" onChange="amountChange(this)"><!-- 
							--><html:select name="hblVO" property="cust_curr_cd" styleClass="search_form" style="width:60px;">
									<html:options collection="currCdList" property="cd_val" labelProperty="cd_nm"/>
								</html:select><!--
		                	--><input type="hidden" name="h_cust_curr_cd" value="<bean:write name="hblVO" property="cust_curr_cd"/>"><!--
		                	--><bean:define id="frtList" name="valMap" property="frtCdList"/>
                                <html:select name="hblVO" property="frt_term_c_cd" styleClass="search_form" style="width:94px;" onchange="descFreight();">
                                    <html:options collection="frtList" property="cd_val" labelProperty="cd_nm"/>
                                </html:select><!--
             				--><input type="hidden" name="h_frt_term_c_cd" value="<bean:write name="hblVO" property="frt_term_c_cd"/>">
							</td>
							<th></th>
						</tr>
					</tbody>
				</table>
                      <table>
			    		<colgroup>
			    			<col width="110px" />
			    			<col width="130px" />
			    			<col width="85px" />
			    			<col width="*" />
			    		</colgroup>
			    		<tbody>  
                             <tr>
                                 <th><bean:message key="SVC_Term"/></th>
                                 <td><bean:define id="serviceList" name="valMap" property="serviceList"/>
                                     <html:select name="hblVO" property="fm_svc_term_cd" styleClass="search_form" style="width:55px;" onchange="svcTermChange();">
                                         <html:options collection="serviceList" property="cd_val" labelProperty="cd_nm"/>
                                     </html:select><span class="dash">~</span><!-- 
                                   --><html:select name="hblVO" property="to_svc_term_cd" styleClass="search_form" style="width:55px;">
                                         <html:options collection="serviceList" property="cd_val" labelProperty="cd_nm"/>
                                     </html:select><!--
		                			--><input type="hidden" name="h_fm_svc_term_cd" value="<bean:write name="hblVO" property="fm_svc_term_cd"/>"><!--
		                			--><input type="hidden" name="h_to_svc_term_cd" value="<bean:write name="hblVO" property="to_svc_term_cd"/>">
                                 </td>
                                 <th><bean:message key="Profit_Share"/></th>
                                 <td>
                                 	<input type="text" name="profit_share" maxlength="5" value="<bean:write name="hblVO" property="profit_share"/>" class="search_form zero_remove" onKeyPress="ComKeyOnlyNumber(this)" style="width:30px;text-align:right;"><!--
									--><input type="hidden" name="h_profit_share" value="<bean:write name="hblVO" property="profit_share"/>"><!-- 
									--><input type="text" value="%" class="search_form" style="width:20px;border:0;background-color:transparent;" tabindex="-1">
								</td>
                             </tr>
                             <tr>
                             <!-- #1619 [CLT] Original B/L Type  -->
	                             <th><bean:message key="OBL_Type"/></th>
	                             <td>
		                             <bean:define id="oblCdList" name="valMap" property="oblCdList"/>
		                             <html:select name="hblVO" property="obl_tp_cd" styleClass="search_form" style="width:105px;" onchange="expressChange(frm1.exp_frt_desc, frm1.h_obl_tp_cd);">
		                             <html:options collection="oblCdList" property="cd_val" labelProperty="cd_nm"/>
		                             </html:select> 
		                             <input type="hidden" name="h_obl_tp_cd" value="<bean:write name="hblVO" property="obl_tp_cd"/>">
	                             </td>
                             <!--  
                             	<th><bean:message key="Express_BL"/></th>
								<td>
								<bean:define id="yesNoCdList" name="valMap" property="yesNoCdList"/>
								<html:select name="hblVO" property="express_tp_cd" styleClass="search_form" style="width:75;" onchange="expressChange(frm1.exp_frt_desc, frm1.h_express_tp_cd);">
									<html:options collection="yesNoCdList" property="cd_val" labelProperty="cd_nm"/>
								</html:select><  !--
		                	-- ><input type="hidden" name="h_express_tp_cd" value="<bean:write name="hblVO" property="express_tp_cd"/>"/>
							</td>
							-->
                            <th><bean:message key="Cargo_Type"/></th>
							<td><bean:define id="cargoTpCdList" name="valMap" property="cargoTpCdList"/>
								<html:select name="hblVO" property="cargo_tp_cd" styleClass="search_form" style="width:85px;">
									<html:options collection="cargoTpCdList" property="cd_val" labelProperty="cd_nm"/>
								</html:select>
							</td>
                        </tr>
						<tr>
							<th><bean:message key="Sales_Type"/></th>
							<td><bean:define id="slsList" name="valMap" property="slsCdList"/>
							<!-- #1174 [BNX] Sales PIC based on Sales type does not simultaneously update -->
                                <html:select name="hblVO" property="nomi_flg" style="width:105px;" styleClass="input1" onchange="changeSalesType();">
                                    <html:options collection="slsList" property="cd_val" labelProperty="cd_nm"/>
                                </html:select>
							</td>
							<th><bean:message key="Ship_Type"/></th>
							<td class="table_search_body"><bean:define id="shpList" name="valMap" property="shpCdList"/>
                               <html:select name="hblVO" property="shp_tp_cd" styleClass="search_form" style="width:85px;" >
                                   <html:options collection="shpList" property="cd_val" labelProperty="cd_nm"/>
                               </html:select></td>
						</tr>
					</tbody>
				</table>
				
				<table>
			    		<colgroup>
			    			<col width="110px" />
			    			<col width="130px" />
			    			<col width="87px" />
			    			<col width="*" />
			    		</colgroup>
			    		<tbody>
						<tr>
							<th><bean:message key="W/H_Cut_Off_Date"/></th>
							<td ><input type="text" name="wh_cut_off_dt" id="wh_cut_off_dt" maxlength="10" value='<wrt:write name="hblVO" property="wh_cut_off_dt" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy"/>' class="search_form"  dataformat="excepthan" style="ime-mode:disabled;width:75px;" onKeyUp="mkDateFormatType(this, event, false, 1)" onBlur="mkDateFormatType(this, event, true, 1);dateRangeValid(this, 'W/H Cut-Off Date');"><!-- 
							--><button type="button" class="calendar" tabindex="-1" name="f_etd_dt_cal" id="f_etd_dt_cal"  onclick="doDisplay('DATE1', frm1.wh_cut_off_dt);" ></button>
							</td>
							<th><bean:message key="Time"/></th>
							<td><input type="text" name="wh_cut_off_tm" value='<wrt:write name="hblVO" property="wh_cut_off_tm" formatType="DATE" fromFormat="HHmm" format="HH:mm"/>' maxlength="4" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:40px;" onchange="timeCheck(this);" onkeypress="onlyNumberCheck();">
							</td>
						</tr>
						<!-- #3608 [JTC]OEH Entry  DOC Cut-Off Date  -->
						<tr>
							<th><bean:message key="HBL_Cut_Off_Date"/></th>
							<td ><input type="text" name="hbl_cut_off_dt" id="hbl_cut_off_dt" maxlength="10" value='<wrt:write name="hblVO" property="hbl_cut_off_dt" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy"/>' class="search_form"  dataformat="excepthan" style="ime-mode:disabled;width:75px;" onKeyUp="mkDateFormatType(this, event, false, 1)" onBlur="mkDateFormatType(this, event, true, 1);dateRangeValid(this, 'HB/L Cut-Off Date');"><!-- 
							--><button type="button" class="calendar" tabindex="-1" name="f_etd_dt_cal" id="f_etd_dt_cal"  onclick="doDisplay('DATE1', frm1.hbl_cut_off_dt);" ></button>
							</td>
							<th><bean:message key="Time"/></th>
							<td><input type="text" name="hbl_cut_off_tm" value='<wrt:write name="hblVO" property="hbl_cut_off_tm" formatType="DATE" fromFormat="HHmm" format="HH:mm"/>' maxlength="4" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:40px;" onchange="timeCheck(this);" onkeypress="onlyNumberCheck();">
							</td>
						</tr>
						<tr>
							<th><bean:message key="Released"/></th>
							<td>
								<input type="checkBox" name="rlsd_flg" id="rlsd_flg" value="<bean:write name="hblVO" property="rlsd_flg"/>" onclick="flgChange(this);setToday(this);">
							</td>
							<th><bean:message key="Released_Date"/></th>
                            <td><input type="text" name="rlsd_dt_tm" id="rlsd_dt_tm" value="<wrt:write name="hblVO" property="rlsd_dt_tm" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy"/>" class="search_form" onKeyUp="mkDateFormatType(this, event, false, 1)" onBlur="mkDateFormatType(this, event, true, 1);dateRangeValid(this, 'Released Date');" dataformat="excepthan" style="ime-mode:disabled;width:75px;" size='11' maxlength="10"><!-- 
                            --><button type="button" class="calendar" tabindex="-1" name="rlsd_dt_tm_cal" id="rlsd_dt_tm_cal"  onclick="doDisplay('DATE1' ,frm1.rlsd_dt_tm);" ></button>
                   			</td>
						</tr>
			    		<tr>
		                	<!-- #30 #52843 -->
							<th><bean:message key="Surrendered"/></th>
							<td><input type="checkbox" name="surrend" id="surrend" value="<bean:write name="hblVO" property="surrend"/>" onclick="flgChange(this);" /></td> 
							<th><bean:message key="Released_by"/></th>
                            <td>
                                <input type="text"   name="rlsd_usrid"  value="<bean:write name="hblVO" property="rlsd_usrid"/>"  class="search_form-disable" style="width:75px;"><!-- 
                                  --><button type="button" name="rlsd_by" id="rlsd_by" class="input_seach_btn" tabindex="-1" onClick="openSeiPopUp('USER_POPLIST',this)"></button>
                                <input type="hidden" name="rlsd_usr_nm" value="<bean:write name="hblVO" property="rlsd_usr_nm"/>" class="search_form-disable" style="width:120px;" readOnly>
                                <input type="hidden" name="rlsd_dept_cd" value="<bean:write name="hblVO" property="rlsd_dept_cd"/>">
                            </td>
			    		</tr>
						<tr><!-- #657 [OCEAN BLUE, IMPEX] B/L SELECTION FLAG TO SHOW ON VISIBILITY PORTAL (S) -->
							<!-- #2923 [CLA] [#2760 Split - 1] BL LIST & HBL ENTRY UI IMPROVEMENT - Thoa.Dien 170912 -->
		                	<th><bean:message key="Internal"/></th>
							<td><input type="checkbox" name="inter_use_flag" id="inter_use_flag" value="<bean:write name="hblVO" property="inter_use_flag"/>" onclick="flgChange(this);" /></td>
							<!-- #657 [OCEAN BLUE, IMPEX] B/L SELECTION FLAG TO SHOW ON VISIBILITY PORTAL (E) -->
							<th><bean:message key="Bkg_Date"/></th>
							<td><input type="text" name="bkg_dt_tm" id="bkg_dt_tm" maxlength="10" value="<wrt:write name="hblVO" property="bkg_dt_tm" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy"/>" class="search_form" onKeyUp="mkDateFormatType(this, event, false,1)" onBlur="mkDateFormatType(this, event, true,1);dateRangeValid(this, 'Bkg. Date');" dataformat="excepthan" style="ime-mode:disabled;width:75px; font-size: 11px;"><!-- 
							--><button type="button" class="calendar" tabindex="-1" name="bkg_dt_tm_cal" id="bkg_dt_tm_cal"  onclick="doDisplay('DATE1' ,frm1.bkg_dt_tm);" ></button></td>
						</tr>
						<input type="hidden" name="doc_cut_off_dt" >
						<input type="hidden" name="doc_cut_off_tm" >
                        <tr>
							<td><h3 class="title_design mar_top_8" style="margin-bottom:0;"><bean:message key="Management"/></h3></td>
						</tr>						
						<tr>
							<th><bean:message key="Sales_OFC"/></th>
							<td><input type="text"   name="sls_ofc_cd" value="<bean:write name="hblVO" property="sls_ofc_cd"/>" class="search_form-disable" style="width:75px;" tabindex="-1" readonly><!-- 
							--><button type="button" class="input_seach_btn" tabindex="-1" onclick="openPopUp('OFFICE_GRID_POPLIST',this);" ></button>
							</td>
							<th><bean:message key="Sales_PIC"/></th>
                            <td><input type="text"   name="sls_usrid"  value="<bean:write name="hblVO" property="sls_usrid"/>"  class="search_form-disable" style="width:75px;" readOnly><!-- 
							--><button type="button" name="salesperson" id="salesperson" class="input_seach_btn" tabindex="-1" onClick="openPopUp('USER_POPLIST',this)"></button><!--
		                	--><input type="hidden" name="sls_usr_nm" value="<bean:write name="hblVO" property="sls_usr_nm"/>" class="search_form-disable" style="width:120;" tabindex="-1" readOnly><!--
		                	--><input type="hidden" name="sls_dept_cd" value="<bean:write name="hblVO" property="sls_dept_cd"/>"></td>
						</tr>
						<tr>
							<th id="blIsDtObj"><bean:message key="Date_issued"/></th>
							<td><input type="text" name="bl_iss_dt" id="bl_iss_dt" maxlength="10" value="<wrt:write name="hblVO" property="bl_iss_dt" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy"/>" class="search_form" onKeyUp="mkDateFormatType(this, event, false,1)" onBlur="mkDateFormatType(this, event, true,1);dateRangeValid(this, 'Date Issued');" dataformat="excepthan" style="ime-mode:disabled;width:75px; font-size: 11px;"><!-- 
							--><button type="button" class="calendar" tabindex="-1" name="bl_iss_dt_cal" id="bl_iss_dt_cal"  onclick="doDisplay('DATE1' ,frm1.bl_iss_dt);" ></button></td>						
							<th><bean:message key="Issued_By"/></th>
							<td><input type="text"   name="opr_usrid" value="<bean:write name="hblVO" property="issued_by"/>" class="search_form-disable" tabindex="-1" readOnly style="width:75px;"><!-- 
							--><button type="button" class="input_seach_btn" tabindex="-1" id="oprBtn" name="oprBtn" onClick="openPopUp('OPR_POPLIST',this)"></button><!--
		                	--><input type="hidden" name="opr_usrnm"   value="<bean:write name="hblVO" property="proc_usrnm"/>"><!--
		                	--><input type="hidden" name="opr_ofc_cd"  value="<bean:write name="hblVO" property="proc_ofccd"/>"><!--
		                	--><input type="hidden" name="asgn_usrid"   value="<bean:write name="hblVO" property="asgn_usrid"/>"><!--
		                	--><input type="hidden" name="opr_dept_cd" value="<bean:write name="hblVO" property="proc_dept_cd"/>"></td>
						</tr>
						<!-- OFVFOUR-7814 [AIF] ADDING TEAM INFORMATION ON THE ALL ENTRY SCREEN -->
						<tr>
							<th><bean:message key="Team_cd"/></th>
							<td>
								<input type="text" name="team_cd" readOnly style="width:105px;">
							</td>
						</tr>
		    		</tbody>
		    	</table>
	    </div>
	    </div>
	    <!-- layout_vertical d (E) -->
	</div>
	<!-- layout_wrap(E) -->
				
	<div class="opus_design_grid">
		<script type="text/javascript">comSheetObject('sheet2');</script>
	</div>

