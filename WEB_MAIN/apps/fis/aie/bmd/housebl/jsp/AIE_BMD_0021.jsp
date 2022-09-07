	<div class= "opus_design_inquiry">
		<table>
			<colgroup>
				<col width="70" />
				<col width="150" />
				<col width="120" />
				<col width="125" />
				<col width="100" />
				<col width="125" />
				<col width="135" />
				<col width="125" />
				<col width="100" />
				<col width="125" />
				<col width="100" />
				<col width="125" />
				<col width="100" />
				<col width="125" />
				<col width="100" />
				<col width="*" />
			</colgroup>
			<tbody>
									<tr>
										<th><bean:message key="HAWB_No"/></th>
										<td><input type="text" name="bl_no" maxlength="40" value="<bean:write name="hblVO" property="bl_no"/>" onblur="strToUpper(this);" class="search_form" dataformat="excepthan" otherchar = "<%=FWD_OTHER_CHAR%>" style="ime-mode:disabled; text-transform:uppercase;width:140px;" onclick="strAuto(this);"><!-- 
                                             --><input type="hidden" name="h_bl_no" value="<bean:write name="hblVO" property="bl_no"/>"></td>
										<th><bean:message key="BL_Type"/></th>
										<td>
											<bean:define id="blTypeList" name="valMap" property="blTypeList"/>
											<html:select name="hblVO" property="hbl_tp_cd" styleClass="search_form" style="width:115px;" onchange="setCustmerByBlType(); if(  this.value =='TP') { syncCustomerToCarrier();}"   >
												<html:options collection="blTypeList" property="cd_val" labelProperty="cd_nm"/>
											</html:select>
										</td>
										<th><bean:message key="BL_Date"/></th>
                                        <td>
                                            <input type="text" name="bl_dt_tm" value='<wrt:write name="hblVO" property="bl_dt_tm" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy"/>' onKeyUp="mkDateFormatType(this, event, false,1)" onBlur="mkDateFormatType(this, event, true,1);dateRangeValid(this, 'B/L Date');changeBLDate();" size='11' maxlength="10" class="search_form" style="width:111px"; onchange="changeBLDate();"><!-- 
											 --><button type="button" class="calendar ir" id="bl_dt_tm_cal" name="bl_dt_tm_cal" onclick="doDisplay('DATE1', frm1.bl_dt_tm);"></button>
                                        </td>
                                        <th><bean:message key="Post_Date"/></th>
                                        <td><input type="text" name="post_dt" value='<wrt:write name="hblVO" property="post_dt" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy"/>' onKeyUp="mkDateFormatType(this, event, false,1)" onBlur="mkDateFormatType(this, event, true,1)" size='11' maxlength="10" class="search_form-disable" style="width:115px;" readonly></td>
										<th><bean:message key="Job_Template"/></th>
										<td><input type="text" name="jb_tmplt_nm" value="<bean:write name="hblVO" property="jb_tmplt_nm"/>" class="search_form-disable" style="width:86px;" readonly><!-- 
                                             --><html:hidden name="hblVO"  property="jb_tmplt_seq"/><!-- 
                                             --><button type="button" class="input_seach_btn" tabindex="-1" onClick="openAiePopUp('WORKFLOW_POPLIST',this)"></button></td>
                                        <th><bean:message key="MRN"/></th>
										<td><input type="text" name="mrn_no"   maxlength="20"  value="<bean:write name="hblVO" property="mrn_no"/>"  class="search_form-disable" dataformat="excepthan" style="ime-mode:disabled;width:115px;text-transform:uppercase;" onblur="strToUpper(this)"></td>
										<th><bean:message key="Invoice_No"/></th>
                                        <td><input type="text" name="inv_no" maxlength="50" value='<bean:write name="hblVO" property="inv_no"/>'onblur="strToUpper(this);" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:115px;" onchange="textAdd(frm1.desc_txt, 'INV. NO : ', this.value, frm1.h_inv_no);"><!-- 
											 --><input type="hidden" name="h_inv_no" value='<bean:write name="hblVO" property="inv_no"/>' onblur="strToUpper(this);" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:115px;"></td>
										<th><span id="thCertiStsCd" style="display:none;"><bean:message key="Cargo_State"/></span></th>
										<td>
											<span id="tdCertiStsCd" style="display:none;">
											<bean:define id="certiStsCdList" name="valMap" property="certiStsCdList"/>
                                            <html:select name="hblVO" property="certi_sts_cd" styleClass="search_form" style="width:115px;" >
                                            	<option value=""></option>
                                                <html:options collection="certiStsCdList" property="cd_val" labelProperty="cd_nm"/>
                                            </html:select>
                                            <input type="hidden" name="h_certi_sts_cd" value="<bean:write name="hblVO" property="certi_sts_cd"/>" maxlength="20" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:155px;">
											</span>
										</td>
									</tr>
                                    <tr>
                                    	<th><a href="javascript:GOTOMBL(frm1.ref_no.value, frm1.rlt_intg_bl_seq.value, 'A', 'O');" style="color:#0000FF"><bean:message key="Ref_No"/></a></th>
										<td><!-- 
                                             --><input type="hidden" id="chkDgts" value="F" />
                                               <input type="text" required name="ref_no" maxlength="20" value="<bean:write name="hblVO" property="ref_no"/>" onblur="strToUpper(this);" onchange="checkRefNo(this);" class="search_form" dataformat="excepthan" otherchar = "<%=FWD_OTHER_CHAR%>" style="ime-mode:disabled; text-transform:uppercase;width:111px;" onKeyDown="fncBlSearch()"><!--
                                            --><input type="hidden" name="ref_ofc_cd" value="<bean:write name="hblVO" property="ref_ofc_cd"/>" onblur="strToUpper(this)" class="search_form-disable" style="width:45px;text-transform:uppercase;" readonly><!--
                                            --><button type="button" id="brnRef_no" class="input_seach_btn" tabindex="-1" onClick="srAirOpenPopUp('REF_POPLIST_BLANK', this, 'A', 'O')"></button><!--
                                            --><input type="hidden" name="rlt_intg_bl_seq" value="<bean:write name="hblVO" property="rlt_intg_bl_seq"/>">
                                        </td>
                                        <th><bean:message key="Airline_Bkg"/></th>
                                        <td><input name="lnr_bkg_no" value="<bean:write name="hblVO" property="lnr_bkg_no"/>" type="text" onblur="strToUpper(this);" class="search_form-disable" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:115px;" readonly></td>
                                        <th><bean:message key="MAWB_No"/></th>
                                        <td><input type="text" name="mbl_no" maxlength="40" value='<bean:write name="hblVO" property="mbl_no"/>' class="search_form-disable" onblur="strToUpper(this);" dataformat="excepthan" style="cursor:hand;ime-mode:disabled; text-transform:uppercase;width:115px;" ondblclick="goToBlPage('view_mbl', this.value)" readonly></td>
                                        <th><bean:message key="WO_No"/></th>
										<td><!-- 
											 --><input type="text" name="reserve_field03" maxlength="40" value="<bean:write name="hblVO" property="reserve_field03"/>" class="search_form" onblur="strToUpper(this);" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:86px;"><!-- 
                                            	 --><button type="button" class="input_seach_btn" tabindex="-1" onClick="woOpenPopUp('A')"></button><!-- 
                                         --></td>
                                         <th><bean:message key="Export_Reference_No"/></th>
                                        <td><input type="text" name="exp_ref_no" maxlength="40" value='<bean:write name="hblVO" property="exp_ref_no"/>' class="search_form" onblur="strToUpper(this);" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:115px;" ></td>
                                        <th><bean:message key="Agent_Reference_No"/></th>
                                        <td><input type="text" name="prnr_ref_no" maxlength="40" value='<bean:write name="hblVO" property="prnr_ref_no"/>' class="search_form" onblur="strToUpper(this);" dataformat="multiLanguage" style="ime-mode:disabled; text-transform:uppercase;width:115px;" ></td>                                        
                                    	<th><bean:message key="LC_No"/></th>
                                        <td><!-- 
											 --><input type="text" name="lc_no" maxlength="40" value='<bean:write name="hblVO" property="lc_no"/>' class="search_form" onblur="strToUpper(this);" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:115px;" onchange="textAdd(frm1.desc_txt, 'L/C NO. : ', this.value, frm1.h_lc_no);"><!-- 
											--><input type="hidden" name="h_lc_no" value='<bean:write name="hblVO" property="lc_no"/>' class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:115px;"><!-- 
                                        --></td>
                                        <th><bean:message key="Customer_Ref_No"/></th>
										<td><input type="text" name="cust_ref_no" maxlength="40"  value="<bean:write name="hblVO" property="cust_ref_no"/>"  dataformat="excepthan" style="ime-mode:disabled;width:115px;text-transform:uppercase;" onblur="strToUpper(this)"></td>
                                    </tr>
			</tbody>
		</table>
	</div>

<!-- layout_wrap(S) -->
<div class="layout_wrap">
    <div class="layout_vertical_3 pad_rgt_8">
		<!-- OFVFOUR-7814 [AIF] ADDING TEAM INFORMATION ON THE ALL ENTRY SCREEN -->
			<div class= "opus_design_inquiry sm" style="height:730px;">
				<table>
					<colgroup>
						<col width="70"/>
						<col width="40px" />
						<col width="100px" />
						<col width="100px" />
						<col width="*"/>
					</colgroup>
					<tbody>
							<tr><td colspan="5"><h3 class="title_design"><bean:message key="Customer"/></h3></td></tr>
                                           <tr>
                                               <th><a href="javascript:clearBlPrnr('P01');"><bean:message key="Partner"/></a></th>
                                               <td colspan="4"><!-- 
                                                    --><input type="text" name="prnr_trdp_cd" maxlength="20" value='<bean:write name="hblVO" property="prnr_trdp_cd"/>' onKeyDown="codeNameAction('trdpCode_partner',this, 'onKeyDown', 'A', 'O', 'H')" onBlur="strToUpper(this);codeNameAction('trdpCode_partner',this, 'onBlur', 'A', 'O', 'H')" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:50px;"><!--
                                                   --><button type="button" class="input_seach_btn" tabindex="-1" id="partner" name="partner" onClick="openAiePopUp('LINER_POPLIST',this)" ></button><!--
                                                   --><input type="text"   name="prnr_trdp_nm" maxlength="50" value='<bean:write name="hblVO" property="prnr_trdp_nm"/>' onblur="strToUpper(this)" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:calc(100% - 87px);" onKeyPress="if(event.keyCode==13){openAiePopUp('LINER_POPLIST', document.getElementById('partner'), frm1.prnr_trdp_nm.value);}"><!--
									--><input type="hidden" name="prnr_trdp_addr" value='<bean:write name="hblVO" property="prnr_trdp_addr"/>'><!--                                                      
                                               --></td>
                                           </tr>
							<tr>
								<th><a href="javascript:clearBlPrnr('S02');"><bean:message key="Customer"/></a></th>
								<td colspan="4"><!--
									--><input type="text" name="act_shpr_trdp_cd"  required maxlength="20" value='<bean:write name="hblVO" property="act_shpr_trdp_cd"/>' class="search_form" onKeyDown="codeNameAction('trdpCode_ashipper',this, 'onKeyDown', 'A', 'O', 'H')" onBlur="strToUpper(this);codeNameAction('trdpCode_ashipper',this, 'onBlur', 'A', 'O', 'H');if(  frm1.hbl_tp_cd.value =='TP') { syncCustomerToCarrier();}" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:48px;"><!--
									--><button type="button" class="input_seach_btn" tabindex="-1" id="ashipper" name="ashipper" onClick="openAiePopUp('LINER_POPLIST',this); "></button><!--
									--><input type="text" name="act_shpr_trdp_nm" required value='<bean:write name="hblVO" property="act_shpr_trdp_nm"/>' onblur="strToUpper(this);checkTrdpCode(this);if(  frm1.hbl_tp_cd.value =='TP') { syncCustomerToCarrier();}" class="search_form" dataformat="multiLanguage" style="ime-mode:disabled;width:calc(100% - 130px);text-transform:uppercase;" maxlength="50" onKeyPress="if(event.keyCode==13){openAiePopUp('LINER_POPLIST', document.getElementById('ashipper'), frm1.act_shpr_trdp_nm.value); }   "><!--
									--><button id="ashipper" name="ashipper" type="button" class="btn_etc" onClick="openAiePopUp('PIC_POP', this)"><bean:message key="PIC"/></button><!--
								--></td>
							</tr>
                                           <tr>
                                               <td colspan="5">
                                                   <textarea name="act_shp_info" class="search_form autoenter_50px" onblur="strToUpper(this);" dataformat="excepthan" style="width:99%;height:40px" WRAP="off" maxlength="500">
<bean:write name="hblVO" property="act_shp_info" filter="true"/></textarea>
                                               </td>
                                           </tr>
                                           
							<tr>
								<th id="blShpObj"><a href="javascript:clearBlPrnr('S01');"><bean:message key="Shipper"/></a></th>
								<td colspan="4"><!--
									--><input type="hidden"   name="shpr_trdp_cd" maxlength="20" value='<bean:write name="hblVO" property="shpr_trdp_cd"/>'  class="search_form" onKeyDown="codeNameAction('trdpCode_shipper',this, 'onKeyDown')" onBlur="strToUpper(this);codeNameAction('trdpCode_shipper',this, 'onBlur')" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:50px;"><!--
									--><input type="text"   name="shpr_trdp_nm" maxlength="50" value='<bean:write name="hblVO" property="shpr_trdp_nm"/>'  onblur="strToUpper(this);checkTrdpCode(this);"  class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:calc(100% - 33px);;text-transform:uppercase;" onKeyPress="if(event.keyCode==13){openAiePopUp('LINER_POPLIST', document.getElementById('shipper'), frm1.shpr_trdp_nm.value);};"><!--
									--><button type="button" class="input_seach_btn" tabindex="-1" id="shipper" name="shipper" onClick="openAiePopUp('LINER_POPLIST',this);"></button><!--
								--></td>
							</tr>
							<tr>
								<td colspan="5">
									<textarea name="shpr_trdp_addr" class="search_form autoenter_50px" dataformat="excepthan" style="width:99%;height:80px;" onblur="strToUpper(this);chkCmpAddr(this, 'Shipper Address')" WRAP="off">
<bean:write name="hblVO" property="shpr_trdp_addr" filter="true"/></textarea>
								</td>
							</tr>
							<tr>
								<th id="blConObj"><a href="javascript:clearBlPrnr('C01');"><bean:message key="Consignee"/></a></th>
								<td colspan="4"><!--
									--><input type="hidden" name="cnee_trdp_cd"  maxlength="20" value='<bean:write name="hblVO" property="cnee_trdp_cd"/>'  onKeyDown="codeNameAction('trdpCode_consignee',this, 'onKeyDown')" onBlur="strToUpper(this);codeNameAction('trdpCode_consignee',this, 'onBlur');" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:50px"><!--
									--><input type="text"   name="cnee_trdp_nm"  maxlength="50" value='<bean:write name="hblVO" property="cnee_trdp_nm"/>'  onblur="strToUpper(this);checkTrdpCode(this);"   class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:calc(100% - 33px);text-transform:uppercase;" onKeyPress="if(event.keyCode==13){openAiePopUp('LINER_POPLIST', document.getElementById('consignee'), frm1.cnee_trdp_nm.value);}"><!--
									--><button type="button" class="input_seach_btn" tabindex="-1" id="consignee" name="consignee" onClick="openAiePopUp('LINER_POPLIST',this);" ></button><!--
								--></td>
							</tr>
							<tr>
								<td colspan="5">
									<textarea name="cnee_trdp_addr" class="search_form autoenter_50px" dataformat="excepthan" style="width:99%;height:80px;" onblur="strToUpper(this);chkCmpAddr(this, 'Consignee Address')" WRAP="off">
<bean:write name="hblVO" property="cnee_trdp_addr" filter="true"/></textarea>
								</td>
							</tr>
							<tr>
								<th><a href="javascript:clearBlPrnr('N01');"><bean:message key="Notify"/></a></th>
								<td colspan="4"><!--
									--><input type="hidden" name="ntfy_trdp_cd"  value='<bean:write name="hblVO" property="ntfy_trdp_cd"/>' class="search_form" onKeyDown="codeNameAction('trdpCode_notify',this, 'onKeyDown')" onBlur="strToUpper(this);codeNameAction('trdpCode_notify',this, 'onBlur')" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:50px"><!--
									--><input type="text"   name="ntfy_trdp_nm"  value='<bean:write name="hblVO" property="ntfy_trdp_nm"/>' onblur="strToUpper(this);checkTrdpCode(this);" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:calc(100% - 33px);text-transform:uppercase;" maxlength="50" onKeyPress="if(event.keyCode==13){openAiePopUp('LINER_POPLIST', document.getElementById('notify'), frm1.ntfy_trdp_nm.value);}"><!--
                                                   --><button type="button" class="input_seach_btn" tabindex="-1" id="notify" name="notify" onClick="openAiePopUp('LINER_POPLIST',this)"></button><!--
								--></td>
							</tr>
							<tr>
								<td colspan="5"><!--
									--><a href="javascript:copyValue('SAC', 'A', 'O', 'H')"><bean:message key="Same_As_Consignee"/></a>&nbsp;<!--
									--><a href="javascript:copyValue('CNEE', 'A', 'O', 'H')"><bean:message key="Copy"/></a><!--
								--></td>
							</tr>
							<tr>
								<td colspan="5">
									<textarea name="ntfy_trdp_addr" class="search_form autoenter_50px" dataformat="excepthan" style="width:99%;height:80px;" onblur="strToUpper(this);chkCmpAddr(this, 'Notify Address');notifyKeyIn();" WRAP="off">
<bean:write name="hblVO" property="ntfy_trdp_addr" filter="true"/></textarea>
								</td>
							</tr>
							
							<tr>
								<td colspan="5">
									<label for="disp_ntfy_flg"><bean:message key="Display_NOTIFY_on_HAWB"/></label><input type="checkBox" name="disp_ntfy_flg" id="disp_ntfy_flg" value="<bean:write name="hblVO" property="disp_ntfy_flg"/>" onclick="flgChange(this);displayChange()">
								</td>
							</tr>
							<tr>
								<th><a href="javascript:clearBlPrnr('V01');"><bean:message key="Vendor"/></a></th>
								<td colspan="4"><!--
									--><input type="text" name="vndr_trdp_cd" maxlength="20" value='<bean:write name="hblVO" property="vndr_trdp_cd"/>' onKeyDown="codeNameAction('trdpCode_vndr',this, 'onKeyDown')" onBlur="strToUpper(this);codeNameAction('trdpCode_vndr',this, 'onBlur')" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:50px;"><!--
									--><button type="button" class="input_seach_btn" tabindex="-1" onClick="openAiePopUp('LINER_POPLIST',this)" id="vndr" name="vndr"></button><!--
									--><input type="text"name="vndr_trdp_nm" maxlength="50" value='<bean:write name="hblVO" property="vndr_trdp_nm"/>' onblur="strToUpper(this);checkTrdpCode(this);" class="search_form" dataformat="multiLanguage" style="ime-mode:disabled;width:calc(100% - 87px);text-transform:uppercase;" onKeyPress="if(event.keyCode==13){openAiePopUp('LINER_POPLIST', document.getElementById('vndr'), frm1.vndr_trdp_nm.value);}"><!--
									--><input type="hidden" name="vndr_trdp_addr" value='<bean:write name="hblVO" property="vndr_trdp_addr"/>'><!--
								--></td>
							</tr>
							<%-- <tr>
								<td colspan="2">
									<label for="disp_ntfy_flg"><bean:message key="Display_NOTIFY_on_HAWB"/></label><input type="checkBox" name="disp_ntfy_flg" id="disp_ntfy_flg" value="<bean:write name="hblVO" property="disp_ntfy_flg"/>" onclick="flgChange(this);displayChange()">
								</td>
							</tr> --%>
							<tr>
								<th><a href="javascript:clearBlPrnr('P03');"><bean:message key="Triangle_Agent"/></a></th	>
								<td colspan="4"><!--
                                                   --><input type="text" name="prnr_trdp_cd2" maxlength="20" value='<bean:write name="hblVO" property="prnr_trdp_cd2"/>' onKeyDown="codeNameAction('trdpCode_partner2',this, 'onKeyDown')" onBlur="strToUpper(this);codeNameAction('trdpCode_partner2',this, 'onBlur')" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:50px;"><!--
                                                   --><button type="button" class="input_seach_btn" tabindex="-1"  onClick="openAiePopUp('LINER_POPLIST',this)" id="partner2" name="partner2"></button><!--
                                                   --><input type="text"   name="prnr_trdp_nm2" maxlength="50" value='<bean:write name="hblVO" property="prnr_trdp_nm2"/>' onblur="strToUpper(this)" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:calc(100% - 87px);" onKeyPress="if(event.keyCode==13){openAiePopUp('LINER_POPLIST', document.getElementById('partner2'), frm1.prnr_trdp_nm2.value);}"><!--
									--><input type="hidden" name="prnr_trdp_addr2" value='<bean:write name="hblVO" property="prnr_trdp_addr2"/>'><!--                                                   
								--></td>
				            </tr>
	    					<tr height="7px"></tr>
							<tr>
		                    	<td colspan="5">
		                        	<h3 class="title_design"><bean:message key="Contribution"/></h3>
		                      	</td>
		                  	</tr>
		                  	<tr>
		                  		<th colspan="2"><bean:message key="Contrib_Office"/></th>
		                 		<td>
		                        	<input type="text"   name="ctrb_ofc_cd" value='<bean:write name="hblVO" property="ctrb_ofc_cd"/>' class="search_form" onKeyDown="codeNameAction('officeCd_ctrbOfc',this, 'onKeyDown')" onBlur="strToUpper(this);codeNameAction('officeCd_ctrbOfc',this, 'onBlur')" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:70px;"><!-- 
		                            --><button type="button" name="ctrbOfc" id="ctrbOfc" class="input_seach_btn" tabindex="-1" onClick="openSeiPopUp('OFFICE_GRID_POPLIST',this)"></button>
		                      	</td>
		                      	<th><bean:message key="Use_Ratio"/></th>
								<td>
									<input type="checkBox" name="ctrb_ratio_yn" id="ctrb_ratio_yn" value="<bean:write name="hblVO" property="ctrb_ratio_yn"/>" onclick="flgChange(this);clickCtrbRatioYn();">
									<input type="text" name="ctrb_mgn" value="<bean:write name="hblVO" property="ctrb_mgn"/>" onkeyPress="onlyNumberCheck('.');" onchange="numberCommaLen(this,20,2);chkComma(this,20,2);" onBlur="checkRatioValid();" maxlength="23" class="search_form zero_remove" dataformat="excepthan" style="ime-mode:disabled;width:85px;text-align:right;">
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
    
    <div class="layout_vertical_3 pad_rgt_8">
		<!-- OFVFOUR-7814 [AIF] ADDING TEAM INFORMATION ON THE ALL ENTRY SCREEN -->
			<div class= "opus_design_inquiry sm" style="height:730px;">
				<table>
					<colgroup>
						<col width="100" /> 
						<col width="100" />
						<col width="87" />
						<col width="*" />
					</colgroup>
					<tbody>
							<tr>
								<td colspan=""><h3 class="title_design"><bean:message key="Flight_Info"/></h3></td>
							</tr>
							<tr>
								<th><bean:message key="Airline"/></th>
								<td colspan="3"><!-- 
									 --><input type="text"   name="lnr_trdp_cd" maxlength="20" value='<bean:write name="hblVO" property="lnr_trdp_cd"/>' onKeyDown="codeNameAction('trdpCode_exp_air_carr',this, 'onKeyDown')" onBlur="strToUpper(this);codeNameAction('trdpCode_exp_air_carr',this, 'onBlur')" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:70px;"><!--
									--><button type="button" class="input_seach_btn" tabindex="-1" id="liner" name="liner" onClick="openAiePopUp('LINER_POPLIST_M',this)"></button><!--
									--><input type="text"   name="lnr_trdp_nm" maxlength="50" value='<bean:write name="hblVO" property="lnr_trdp_nm"/>' onblur="strToUpper(this)" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:130px;" onKeyPress="if(event.keyCode==13){openAiePopUp('LINER_POPLIST_M', document.getElementById('liner'), frm1.lnr_trdp_nm.value);}"><!--
									--><input type="hidden" name="obrd_dt_tm"  value='<wrt:write name="hblVO" property="obrd_dt_tm" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy"/>' class="search_form" onKeyUp="mkDateFormat(this,event,false)" onBlur="mkDateFormat(this, event, true)" dataformat="excepthan" style="ime-mode:disabled;width:70px;"><!--
								--></td>
							</tr>
							<tr>
								<th><bean:message key="Flight_No"/></th>
								<td colspan="3"><input type="text" name="flt_no"      value='<bean:write name="hblVO" property="flt_no"/>'   onblur="strToUpper(this)"  class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:70px;text-transform:uppercase;" maxlength="20"></td>
							</tr>
                             <tr>
                                 <th><bean:message key="Flight_Date"/></th>
                                 <td><!--
                                     --><input type="text" name="etd_dt_tm" required value='<wrt:write name="hblVO" property="etd_dt_tm" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy"/>' onKeyUp="mkDateFormatType(this, event, false,1)" onBlur="mkDateFormatType(this, event, true,1);dateRangeValid(this, 'Flight Date');" size='11' maxlength="10" class="search_form" style="width:70px;"><!--
									 --><button type="button" class="calendar ir" id="etd_dt_tm_cal" name="etd_dt_tm_cal" onclick="doDisplay('DATE1' ,frm1.etd_dt_tm);"></button><!--
                                 --></td>
                                 <th><bean:message key="Time"/></th>
                                 <td><input type="text" name="etd_tm"    value='<wrt:write name="hblVO" property="etd_tm" formatType="DATE" fromFormat="HHmm" format="HH:mm"/>' maxlength="4" class="search_form" dataformat="num" style="ime-mode:disabled;width:40px;" onchange="timeCheck(this);" onkeypress="onlyNumberCheck();"></td>
                             </tr>
							<tr>
								<th><bean:message key="Arrival_Date"/></th>
                                <td><!--
                                    --><input type="text" name="eta_dt_tm" value='<wrt:write name="hblVO" property="eta_dt_tm" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy"/>' onKeyUp="mkDateFormatType(this, event, false,1)" onBlur="mkDateFormatType(this, event, true,1);dateRangeValid(this, 'Arrival Date');" size='11' maxlength="10" class="search_form" style="width:70px;"><!--
									--><button type="button" class="calendar ir" id="eta_dt_tm_cal" name="eta_dt_tm_cal"  onclick="doDisplay('DATE1' ,frm1.eta_dt_tm);"></button><!--
                                --></td>
                                <th><bean:message key="Time"/></th>
                                <td><input type="text" name="eta_tm"    value='<wrt:write name="hblVO" property="eta_tm" formatType="DATE" fromFormat="HHmm" format="HH:mm"/>' maxlength="4" class="search_form" dataformat="num" style="ime-mode:disabled;width:40px;" onchange="timeCheck(this);" onkeypress="onlyNumberCheck();"></td>
                            </tr>
							<tr><!-- #3376 [JTC] Japan Trust 용 Profit Report 개발 -->
								<th><bean:message key="Lane"/></th>
								<td colspan="3">
	                             	<bean:define id="laneList" name="valMap" property="laneCodeList"/>
									<html:select name="hblVO" property="lane_cd" styleClass="search_form" style="width:115px;" onchange="laneCdChange();">
										<option value=""></option>
										<html:options collection="laneList" property="cd_val" labelProperty="cd_nm"/>
									</html:select> 
									<input type="hidden" name="svc_lane_nm" id="svc_lane_nm" value="<bean:write name="hblVO" property="svc_lane_nm"/>">								
								</td>
							</tr>                            
                            <tr>
                            	<td colspan="4"><h3 class="title_design mar_top_8" style="margin-bottom:0px;"><bean:message key="Route"/></h3></td>
                            </tr>
							<tr>
								<th><bean:message key="Departure"/></th>
								<td colspan="3"><!--
									--><input type="text"   name="pol_cd"  required maxlength="5" value='<bean:write name="hblVO" property="pol_cd"/>' onKeyDown="codeNameAction('Location_pol',this, 'onKeyDown','A')" onBlur="strToUpper(this);codeNameAction('Location_pol',this, 'onBlur','A')" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:70px;" class="search_form"><!--
									--><button type="button" class="input_seach_btn" tabindex="-1" id="pol" name="pol" onClick="openAiePopUp('LOCATION_POPLIST',this)" ></button><!--
                                                  --><input type="hidden" name="pol_nod_cd"     value='<bean:write name="hblVO" property="pol_nod_cd"/>' ><!--
									--><input type="text"   name="pol_nm"  required maxlength="50"   value='<bean:write name="hblVO" property="pol_nm"/>' class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:130px;text-transform:uppercase;" onblur="strToUpper(this)" onKeyPress="if(event.keyCode==13){openAiePopUp('LOCATION_POPLIST', document.getElementById('pol'), frm1.pol_nm.value);}"><!--
								--></td>
							</tr>
							<tr>
								<th><bean:message key="First_To"/></th>
								<td colspan="3"><!--
									--><input type="text"   name="fst_to_cd" maxlength="5" value='<bean:write name="hblVO" property="fst_to_cd"/>' onKeyDown="codeNameAction('Location_fst',this, 'onKeyDown','A')" onBlur="strToUpper(this);codeNameAction('Location_fst',this, 'onBlur','A')" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:70px;" class="search_form"><!--
									--><button type="button" class="input_seach_btn" tabindex="-1" id="fst" name="fst" onClick="openAiePopUp('LOCATION_POPLIST',this)" ></button><!--
									--><input type="text" name="fst_to_nm" maxlength="50" value='<bean:write name="hblVO" property="fst_to_nm"/>' class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:130px;text-transform:uppercase;" onblur="strToUpper(this)" onKeyPress="if(event.keyCode==13){openAiePopUp('LOCATION_POPLIST', document.getElementById('fst'), frm1.fst_to_nm.value);}"><!--
								--></td>
							</tr>
                            <tr>
                                <th><bean:message key="Trans_1"/></th>
                                <td colspan="3"><!--
                                    --><input type="text" name="ts1_port_cd" maxlength="5" value='<bean:write name="hblVO" property="ts1_port_cd"/>' onKeyDown="codeNameAction('Location_ts1',this, 'onKeyDown','A')" onBlur="strToUpper(this);codeNameAction('Location_ts1',this, 'onBlur','A');setDestination()" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:70px;"><!--
                                    --><button type="button" class="input_seach_btn" tabindex="-1" id="ts1" name="ts1" onClick="openAiePopUp('LOCATION_POPLIST',this)"></button><!--
                                    --><input type="text" name="ts1_flt_no"  maxlength="15" value='<bean:write name="hblVO" property="ts1_flt_no"/>' class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:130px;" onblur="strToUpper(this)"  onKeyPress="if(event.keyCode==13){openAiePopUp('LOCATION_POPLIST', document.getElementById('ts1'), frm1.ts1_flt_no.value);}"><!--
								--></td>
                             </tr>
                             <tr>
                                 <th><bean:message key="Trans_2"/></th>
                                 <td colspan="3"><!--
                                     --><input type="text" name="ts2_port_cd" maxlength="5" value='<bean:write name="hblVO" property="ts2_port_cd"/>' onKeyDown="codeNameAction('Location_ts2',this, 'onKeyDown','A')" onBlur="strToUpper(this);codeNameAction('Location_ts2',this, 'onBlur','A');setDestination()" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:70px;"><!--
                                     --><button type="button" class="input_seach_btn" tabindex="-1" id="ts2" name="ts2" onClick="openAiePopUp('LOCATION_POPLIST',this)" ></button><!--
                                     --><input type="text" name="ts2_flt_no" maxlength="15" value='<bean:write name="hblVO" property="ts2_flt_no"/>'  class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:130px;" onblur="strToUpper(this)" onKeyPress="if(event.keyCode==13){openAiePopUp('LOCATION_POPLIST', document.getElementById('ts2'), frm1.ts2_flt_no.value);}"><!--
                                 --></td>
                             </tr>
                             <tr>
                                 <th><bean:message key="Trans_3"/></th>
                                 <td colspan="3"><!--
                                     --><input type="text" name="ts3_port_cd" maxlength="5" value='<bean:write name="hblVO" property="ts3_port_cd"/>' onKeyDown="codeNameAction('Location_ts3',this, 'onKeyDown','A')" onBlur="strToUpper(this);codeNameAction('Location_ts3',this, 'onBlur','A');setDestination()" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:70px;"><!--
                                     --><button type="button" class="input_seach_btn" tabindex="-1" id="ts3" name="ts3" onClick="openAiePopUp('LOCATION_POPLIST',this)" ></button><!--
                                     --><input type="text" name="ts3_flt_no"  maxlength="15" value='<bean:write name="hblVO" property="ts3_flt_no"/>'  class="search_form" style="width:130px;text-transform:uppercase;" onblur="strToUpper(this)"  onKeyPress="if(event.keyCode==13){openAiePopUp('LOCATION_POPLIST', document.getElementById('ts3'), frm1.ts3_flt_no.value);}"><!--
                                 --></td>
                            </tr>
							<tr>
								<th><bean:message key="Destination"/></th>
								<td colspan="3"><!--
									--><input type="text" required id="pod_cd" name="pod_cd" maxlength="5" value='<bean:write name="hblVO" property="pod_cd"/>' onKeyDown="codeNameAction('Location_air_des',this, 'onKeyDown','A')" onBlur="strToUpper(this);codeNameAction('Location_air_des',this, 'onBlur','A')" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:70px;" class="search_form"><!--
									--><button type="button" class="input_seach_btn" tabindex="-1" id="air_des" name="air_des" onClick="openAiePopUp('LOCATION_POPLIST',this)" ></button><!--
                                                   --><input type="hidden" name="pod_nod_cd"     value='<bean:write name="hblVO" property="pod_nod_cd"/>'><!--
									--><input type="text" required  name="pod_nm"  maxlength="50"  value='<bean:write name="hblVO" property="pod_nm"/>'     class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:130px;text-transform:uppercase;" onblur="strToUpper(this)" onKeyPress="if(event.keyCode==13){openAiePopUp('LOCATION_POPLIST', document.getElementById('air_des'), frm1.pod_nm.value);}"><!--
								--></td>
							</tr>
							<tr id="trKrOnlyWh" style="display: none">
	                            <th><bean:message key="Warehouse"/></th>
	                            <td colspan="3"><!--
	                           --><input type="hidden" name="cfs_nod_cd" maxlength="5" value='<bean:write name="hblVO" property="cfs_nod_cd"/>'  onKeyDown="codeNameAction('Nodecode_cfs',this, 'onKeyDown')" onBlur="strToUpper(this);codeNameAction('Nodecode_cfs',this, 'onBlur')" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:80px;"><!--
	                           --><input type="text" name="cfs_loc_nm" value='<bean:write name="hblVO" property="cfs_loc_nm"/>' class="search_form-disable" onBlur="strToUpper(this);" dataformat="excepthan" style="ime-mode:disabled;width:calc(100% - 45px);" readonly><!--
	                           --><button type="button" class="input_seach_btn" tabindex="-1" id="cfs" onClick="getWhCd('A')"></button><!--
	                           --><html:hidden name="hblVO" property="cfs_loc_cd"/></td>
	                        </tr>
							<tr>
								<th><bean:message key="Issued_By"/></th>
								<td colspan="3"><!--
									--><input type="text"   name="opr_usrid" value="<bean:write name="hblVO" property="issued_by"/>" class="search_form-disable" readOnly style="width:70px;"><!--
									--><button type="button" class="input_seach_btn" tabindex="-1" id="oprBtn" name="oprBtn" onClick="openAiePopUp('OPR_POPLIST',this)" ></button><!--
									--><input type="hidden" name="opr_usrnm"   value="<bean:write name="hblVO" property="proc_usrnm"/>"><!--
									--><input type="hidden" name="opr_ofc_cd"  value="<bean:write name="hblVO" property="proc_ofccd"/>"><!--
									--><input type="hidden" name="opr_dept_cd" value="<bean:write name="hblVO" property="proc_dept_cd"/>"><!--
								--></td>
							</tr>
							<!-- OFVFOUR-7814 [AIF] ADDING TEAM INFORMATION ON THE ALL ENTRY SCREEN -->
							<tr>
								<th><bean:message key="Team_cd"/></th>
								<td>
									<input type="text" name="team_cd" readOnly style="width:115px;">
								</td>
							</tr>
							<tr>
								<th><bean:message key="Booking_Date"/></th>
								<td><!--
									--><input type="text" name="bkg_dt_tm" maxlength="10" value="<wrt:write name="hblVO" property="bkg_dt_tm" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy"/>" class="search_form" onKeyUp="mkDateFormatType(this, event, false,1)" onBlur="mkDateFormatType(this, event, true,1);dateRangeValid(this, 'Booking Date');" dataformat="excepthan" style="ime-mode:disabled;width:70px;"><!--
									--><button type="button" class="calendar ir" id="bkg_dt_tm_cal" name="bkg_dt_tm_cal" onclick="doDisplay('DATE1' ,frm1.bkg_dt_tm);"></button><!--
								--></td>
								<th id="blIsDtObj"><bean:message key="Issue_Date"/></th>
								<td><!--
									--><input type="text" name="bl_iss_dt" maxlength="10" value="<wrt:write name="hblVO" property="bl_iss_dt" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy"/>" class="search_form" onKeyUp="mkDateFormatType(this, event, false,1)" onBlur="mkDateFormatType(this, event, true,1);dateRangeValid(this, 'Date Issued');" dataformat="excepthan" style="ime-mode:disabled;width:70px;"><!--
									--><button type="button" class="calendar ir" id="bl_iss_dt_cal" name="bl_iss_dt_cal" onclick="doDisplay('DATE1' ,frm1.bl_iss_dt);" ></button><!--
								--></td>
							</tr>
							<tr>
								<th><bean:message key="Sales_OFC"/></th>
								<td><!--
									--><input type="text"   name="sls_ofc_cd" value="<bean:write name="hblVO" property="sls_ofc_cd"/>" class="search_form-disable" style="width:70px;" readonly><!--
									--><button type="button" class="input_seach_btn" tabindex="-1" onClick="openAiePopUp('OFFICE_GRID_POPLIST',this)" ></button><!--
								--></td>
								<th><bean:message key="Sales_PIC"/></th>
                                               <td><!--
                                                   --><input type="text"   name="sls_usrid"  value="<bean:write name="hblVO" property="sls_usrid"/>"  class="search_form-disable" style="width:70px;" readOnly><!--
                                                   --><button type="button" class="input_seach_btn" tabindex="-1"  id="salesperson" name="salesperson" onClick="openAiePopUp('USER_POPLIST',this)" style="cursor:hand;" ></button><!--
									--><input type="hidden" name="sls_usr_nm" value="<bean:write name="hblVO" property="sls_usr_nm"/>" class="search_form-disable" style="width:120px;" readOnly><!--
									--><input type="hidden" name="sls_dept_cd" value="<bean:write name="hblVO" property="sls_dept_cd"/>"><!--
                                               --></td>
							</tr>
							<tr>
								<th><a href="javascript:clearBlPrnr('A01');"><bean:message key="Forwarding_Agent"/></a></th>
								<td colspan="3"><!--
								--><input type="text" name="agent_trdp_cd" maxlength="20" value='<bean:write name="hblVO" property="agent_trdp_cd"/>' onKeyDown="codeNameAction('trdpCode_agent',this, 'onKeyDown')" onBlur="strToUpper(this);codeNameAction('trdpCode_agent',this, 'onBlur')" class="search_form" style="ime-mode:disabled; text-transform:uppercase;width:70px;"><!--
								--><button type="button" class="input_seach_btn" tabindex="-1" id="agent" name="agent" onClick="openAiePopUp('LINER_POPLIST',this)" style="cursor:hand" align="absmiddle"></button><!--
								--><input type="text"   name="agent_trdp_nm" maxlength="50" value='<bean:write name="hblVO" property="agent_trdp_nm"/>' onblur="strToUpper(this)" class="search_form" style="ime-mode:disabled; text-transform:uppercase;width:130px;" onKeyPress="if(event.keyCode==13){openAiePopUp('LINER_POPLIST', document.getElementById('agent'), frm1.agent_trdp_nm.value);}"><!--
								--><input type="hidden" name="agent_trdp_addr" value='<bean:write name="hblVO" property="agent_trdp_addr"/>'><!--
							--></td>
				            </tr>
							<tr>
								<th><bean:message key="Country_of_Origin"/></th>
				                <td colspan="3"><!--
				                	--><input name="cnt_cd" type="text" maxlength="2" class="search_form" dataformat="excepthan" style="width:70px;text-transform:uppercase;ime-mode:disabled;" onKeyDown="codeNameAction('country',this, 'onKeyDown')" onBlur="strToUpper(this); codeNameAction('country',this, 'onBlur')" value="<bean:write name="hblVO" property="cnt_cd"/>"><!--
				                	--><button type="button" class="input_seach_btn" tabindex="-1" id="country" name="country" onclick="doWork('COUNTRY_POPLIST', 'I')"></button><!--
				                	--><input name="cnt_nm" type="text" class="search_form-disable" dataformat="excepthan" style="ime-mode:disabled;width:130px;text-align:left" onblur="strToUpper(this)"  value="<bean:write name="hblVO" property="cnt_nm"/>" onchange="textAdd(frm1.desc_txt, 'COUNTRY OF ORIGIN. : ', this.value, frm1.h_cnt_nm);"readOnly><!--
				                	--><input name="h_cnt_nm" type="hidden" class="search_form-disable" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:150px;text-align:left" onblur="strToUpper(this)"  value="<bean:write name="hblVO" property="cnt_nm"/>"><!--
				                --></td>
							</tr>
							<tr>
								<th><a href="javascript:clearBlPrnr('I01');"><bean:message key="Issuing_Carrier"/></a></th>
								<td colspan="3"><!--
									--><input type="text" name="iss_trdp_cd" value='<bean:write name="hblVO" property="iss_trdp_cd"/>' class="search_form" onKeyDown="codeNameAction('trdpCode_iss',this, 'onKeyDown')" onBlur="strToUpper(this);codeNameAction('trdpCode_iss',this, 'onBlur')" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:70px;"><!--
									--><button type="button" class="input_seach_btn" tabindex="-1" id="iss" name="iss" onClick="openAiePopUp('LINER_POPLIST',this)"></button><!--
									--><input type="text" name="iss_trdp_nm" value='<bean:write name="hblVO" property="iss_trdp_nm"/>' onblur="strToUpper(this);checkTrdpCode(this);" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:130px;text-transform:uppercase;" maxlength="50" onKeyPress="if(event.keyCode==13){openAiePopUp('LINER_POPLIST', document.getElementById('iss'), frm1.iss_trdp_nm.value);}"><!--
								--></td>
							</tr>
                            <tr>
                                <td colspan="4">
                                    <textarea name="iss_trdp_addr" id="iss_trdp_addr" class="search_form autoenter_50px" onBlur="strToUpper(this);" dataformat="excepthan" style="width:96%;height:80px" WRAP="off" maxlength="800">
<bean:write name="hblVO" property="iss_trdp_addr" filter="true"/></textarea>
                                </td>
                            </tr>
					</tbody>
				</table>
			</div>
    </div>
    
	 <div class="layout_vertical_3" style="width:34%">
		<!-- OFVFOUR-7814 [AIF] ADDING TEAM INFORMATION ON THE ALL ENTRY SCREEN -->
     	<div class= "opus_design_inquiry sm" style="height:730px;">
			<div class= "opus_design_inquiry">
				<table>
					<colgroup>
						<col width="100" />
						<col width="100" />
						<col width="50" />
						<col width="*" />
					</colgroup>
					<tbody>
												<tr><td colspan="4"><h3 class="title_design"><bean:message key="Account_Information"/></h3></td></tr>
                                                <tr>
                                                    <th><bean:message key="Commodity"/></th>
                                                    <td colspan="3"><!-- 
                                                         --><input type="text" name="rep_cmdt_cd" maxlength="13" value='<bean:write name="hblVO" property="rep_cmdt_cd"/>' class="search_form" onKeyDown="codeNameAction('commodity',this, 'onKeyDown')" onBlur="strToUpper(this);codeNameAction('commodity',this, 'onBlur')" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:80px;"><!--
                                                        --><button type="button" class="input_seach_btn" tabindex="-1" id="commodity" name="commodity" onClick="openAiePopUp('COMMODITY_POPLIST',this)" ></button><!--
                                                        --><input type="text" name="rep_cmdt_nm" value='<bean:write name="hblVO" property="rep_cmdt_nm"/>' maxlength="100" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:177px;" onblur="strToUpper(this)" onchange="textAdd1(frm1.desc_txt, '', this.value, frm1.h_rep_cmdt_nm, 1);" onKeyPress="if(event.keyCode==13){openAiePopUp('COMMODITY_POPLIST', this);}"><!--
                                                        --><input type="hidden" name="h_rep_cmdt_nm" value='<bean:write name="hblVO" property="rep_cmdt_nm"/>' maxlength="20" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:155px;"><!--
                                                    --></td>
                                                </tr>
												<tr>
													<th><bean:message key="Package"/></th>
													<td colspan="3">
														<input type="text" name="pck_qty" value="<bean:write name="hblVO" property="pck_qty"/>" onkeyPress="onlyNumberCheck();" onkeyup="numberCommaLen(this,7,0)" maxlength="7"  class="search_form zero_remove" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:80px;text-align:right" onblur="pckChange();"><!--  
														 --><bean:define id="pckList" name="valMap" property="pckCdList"/><!-- 
														 --><html:select name="hblVO" property="pck_ut_cd" styleClass="search_form" style="width:206px;">
															<option></option>
															<html:options collection="pckList" property="pck_ut_cd" labelProperty="pck_nm"/>
														</html:select> 
													</td>
												</tr>
                                            	<tr>
		                                            <th><bean:message key="Incoterms"/></th>
													<td>
														<bean:define id="incotermsList" name="valMap" property="incotermsList"/>
                                                        <html:select name="hblVO" property="inco_cd" styleClass="search_form" style="width:80px;" onchange="textAdd(frm1.desc_txt, '', this.value, frm1.h_inco_cd);">
                                                        	<option value=""></option>
                                                            <html:options collection="incotermsList" property="cd_val" labelProperty="cd_nm"/>
                                                        </html:select>
                                                        <input type="hidden" name="h_inco_cd" value="<bean:write name="hblVO" property="inco_cd"/>" maxlength="20" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:155px;">
													</td>
													<th><bean:message key="Rate"/></th>
													<td>
														<bean:define id="rateClssCdList" name="valMap" property="rateClssCdList"/>
                                                        <html:select name="hblVO" property="rt_clss_cd" styleClass="search_form" style="width:140px;" onchange="rtChange();">
                                                        	<option value=""></option>
                                                            <html:options collection="rateClssCdList" property="cd_val" labelProperty="cd_nm"/>
                                                        </html:select>
													</td>
												</tr>
                                                <tr>
                                                    <th><bean:message key="Cargo_Type"/></th>
													<td colspan="3">
														<bean:define id="cargoTpCdList" name="valMap" property="cargoTpCdList"/>
														<html:select name="hblVO" property="cargo_tp_cd" styleClass="search_form" style="width:290px;" onchange="cargoDesc();">
															<html:options collection="cargoTpCdList" property="cd_val" labelProperty="cd_nm"/>
														</html:select>
													</td>
                                                </tr>
												
					</tbody>
				</table>
				
				<table>
					<colgroup>
						<col width="160" />
						<col width="100" />
						<col width="38" />
						<col width="*" />
					</colgroup>
												<tr>
													<th><bean:message key="Gross_Weight_SPHR"/></th>
													<td colspan="3"><!-- 
														 --><input type="text" name="agent_grs_wgt" value="<bean:write name="hblVO" property="agent_grs_wgt"/>" onkeyPress="onlyNumberCheck('.');" onchange="numberCommaLen(this,8,1);chkComma(this,8,1);weightChange(this);sGrsChange();amountChange(frm1.agent_rt);sRtChange();amountChange(frm1.cust_rt);cRtChange();" maxlength="13" class="search_form zero_remove" dataformat="excepthan" style="ime-mode:disabled;width:80px;text-align:right;"><!-- 
														--><input type="text" name="agent_grs_wgt_ut_cd" value="KG" style="width:50px;border:0;background-color:transparent;" readOnly tabindex="-1"><!-- 
														--><input type="text" name="agent_grs_wgt1" value="<bean:write name="hblVO" property="agent_grs_wgt1"/>" onkeyPress="onlyNumberCheck('.');" onchange="numberCommaLen(this,8,1);chkComma(this,8,1);weightChange(this);sGrsChange();amountChange(frm1.agent_rt);sRtChange();amountChange(frm1.cust_rt);cRtChange();" maxlength="13" class="search_form zero_remove" dataformat="excepthan" style="ime-mode:disabled;width:80px;text-align:right;"><!-- 
														--><input type="text" name="agent_grs_wgt_ut_cd1" value="LB" style="width:20px;border:0;background-color:transparent;" readOnly tabindex="-1"><!-- 
													--></td>
												</tr>
												<tr>
													<th><bean:message key="Gross_Weight_CNEE"/></th>
													<td colspan="3"><!-- 
														--><input type="text" name="grs_wgt" value="<bean:write name="hblVO" property="grs_wgt"/>" onkeyPress="onlyNumberCheck('.');" onchange="numberCommaLen(this,8,1);chkComma(this,8,1);weightChange(this);cGrsChange();amountChange(frm1.agent_rt);sRtChange();amountChange(frm1.cust_rt);cRtChange();" maxlength="13" class="search_form zero_remove" dataformat="excepthan" style="ime-mode:disabled;width:80px;text-align:right;"><!-- 
														--><input type="text" name="grs_wgt_ut_cd" value="KG" style="width:50px;border:0;background-color:transparent;" readOnly tabindex="-1"><!-- 
														--><input type="text" name="grs_wgt1" value="<bean:write name="hblVO" property="grs_wgt1"/>" onkeyPress="onlyNumberCheck('.');" onchange="numberCommaLen(this,8,1);chkComma(this,8,1);weightChange(this);cGrsChange();amountChange(frm1.agent_rt);sRtChange();amountChange(frm1.cust_rt);cRtChange();" maxlength="13" class="search_form zero_remove" dataformat="excepthan" style="ime-mode:disabled;width:80px;text-align:right;"><!-- 
														--><input type="text" name="grs_wgt_ut_cd1" value="LB" style="width:20px;border:0;background-color:transparent;" readOnly tabindex="-1"><!-- 
													--></td>
												</tr>
												<tr>
													<th><bean:message key="Chargeable_Weight_SPHR"/></th>
													<td colspan="3"><!-- 
														--><input type="text" name="agent_chg_wgt" value="<bean:write name="hblVO" property="agent_chg_wgt"/>" onkeyPress="onlyNumberCheck('.');" onchange="numberCommaLen(this,8,1);chkComma(this,8,1);weightChange(this);sChgChange();amountChange(frm1.cust_rt);cRtChange();" maxlength="13" class="search_form zero_remove" dataformat="excepthan" style="ime-mode:disabled;width:80px;text-align:right;"><!-- 
														--><input type="text" name="agent_chg_wgt_ut_cd" value="KG" style="width:50px;border:0;background-color:transparent;" readOnly tabindex="-1"><!-- 
														--><input type="text" name="agent_chg_wgt1" value="<bean:write name="hblVO" property="agent_chg_wgt1"/>" onkeyPress="onlyNumberCheck('.');" onchange="numberCommaLen(this,8,1);chkComma(this,8,1);weightChange(this);sChgChange();amountChange(frm1.cust_rt);cRtChange();" maxlength="13" class="search_form zero_remove" dataformat="excepthan" style="ime-mode:disabled;width:80px;text-align:right;"><!-- 
														--><input type="text" name="agent_chg_wgt_ut_cd1" value="LB" style="width:20px;border:0;background-color:transparent;" readOnly tabindex="-1"><!-- 
													--></td>
												</tr>
												<tr>
													<th><bean:message key="Chargeable_Weight_CNEE"/></th>
													<td colspan="3"><!-- 
														--><input type="text" name="chg_wgt" value="<bean:write name="hblVO" property="chg_wgt"/>" onkeyPress="onlyNumberCheck('.');" onchange="numberCommaLen(this,8,1);chkComma(this,8,1);weightChange(this);cChgChange();amountChange(frm1.cust_rt);cRtChange();" maxlength="13" class="search_form zero_remove" dataformat="excepthan" style="ime-mode:disabled;width:80px;text-align:right;"><!-- 
														--><input type="text" name="chg_wgt_ut_cd" value="KG" style="width:50px;border:0;background-color:transparent;" readOnly tabindex="-1"><!-- 
														--><input type="text" name="chg_wgt1" value="<bean:write name="hblVO" property="chg_wgt1"/>" onkeyPress="onlyNumberCheck('.');" onchange="numberCommaLen(this,8,1);chkComma(this,8,1);weightChange(this);cChgChange();amountChange(frm1.cust_rt);cRtChange();" maxlength="13" class="search_form zero_remove" dataformat="excepthan" style="ime-mode:disabled;width:80px;text-align:right;"><!-- 
														--><input type="text" name="chg_wgt_ut_cd1" value="LB" style="width:20px;border:0;background-color:transparent;" readOnly tabindex="-1"><!-- 
													--></td>
												</tr>
												<tr>
													<th><bean:message key="Volume_Weight"/></th>
													<td>
														<input type="text" name="vol_wgt" value="<bean:write name="hblVO" property="vol_wgt"/>" onkeyPress="onlyNumberCheck('.');" onchange="numberCommaLen(this,8,1);chkComma(this,8,1);weightChange(this);" maxlength="13" class="search_form zero_remove" dataformat="excepthan" style="ime-mode:disabled;width:80px;text-align:right;">
													</td>
													<th><bean:message key="CBM"/></th>
													<td><!-- 
														--><input type="text" name="vol_meas" value="<bean:write name="hblVO" property="vol_meas"/>" onkeyPress="onlyNumberCheck('.');" onchange="numberCommaLen(this,7,6);chkComma(this,7,6);weightChange(this);" maxlength="13" class="search_form zero_remove" dataformat="excepthan" style="ime-mode:disabled;width:80px;text-align:right;"><!-- 
														--><input type="hidden" name="h_vol_meas" value="<bean:write name="hblVO" property="vol_meas"/>" maxlength="20" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:155px;"><!-- 
													--></td>
												</tr>
				</table>
			</div>
	    	
	        <!-- opus_design_grid(S) -->
	        <div class="opus_design_grid">
				<input type="hidden" name="size_ut_cd1" id="size_ut_cd1" value="<bean:write name="hblVO" property="size_ut_cd"/>"/><!-- 
			 --><input type="radio" name="size_ut_cd" id="size_ut_cd3" value="CM" onClick="javascript:chkSizeType();"><label for="size_ut_cd3"><bean:message key="Cm"/></label> <!-- 
			 --><input type="radio" name="size_ut_cd" id="size_ut_cd2" value="INCH" onClick="javascript:chkSizeType();" checked><label for="size_ut_cd2"><bean:message key="Inch"/></label>
      	 		<div class="opus_design_btn"><!-- 
					 --><button type="button" class="btn_normal" onClick="setSizeUp(docObjects[1], 210)"	><bean:message key="Plus"/></button><!--
					--><button type="button" class="btn_normal" onClick="setSizeDown(docObjects[1], 120)" 	><bean:message key="Minus"/></button><!--	
					--><button type="button" class="btn_normal" onClick="whRcptOpenPopUp2('A')"			    ><bean:message key="W/H"/></button><!--
					--><button type="button" class="btn_normal" onClick="javascript:gridAdd(1);"			><bean:message key="Add"/></button><!--			
					--><input type="hidden" name="wh_recp_no" id="wh_recp_no" value="<bean:write name="hblVO" property="wh_recp_no"/>">
				</div>
				<!-- OFVFOUR-7654[PQC][OIH B/L Entry] The system is broken when opening UI -->
				<span class = "clear"></span>
		         <script type="text/javascript">comSheetObject('sheet4','-1');
					/* 속도개선  */
					comConfigSheet(docObjects[1], SYSTEM_FIS);
					initSheet(docObjects[1], (1+1) );
					comEndConfigSheet(docObjects[1]);		         
		         </script>
	        </div>
	        <!-- opus_design_grid(E) -->
	    
			<div class= "opus_design_inquiry">
				<table>
					<colgroup>
						<col width="120" />
						<col width="*" />
					</colgroup>
					<tbody>
												<tr>
													<th><bean:message key="Buying_Rate_Amount"/></th>
													<td><!-- 
														--><input type="hidden" name="agent_unit_chk1" value="<bean:write name="hblVO" property="agent_unit_chk"/>"/><!-- 
														--><input type="radio" name="agent_unit_chk" id="agent_unit_chk2" value="K" onclick="amountChange(this);sRtChange();" ><label for="agent_unit_chk1">KG</label>&nbsp;<!-- 
														--><input type="radio" name="agent_unit_chk" id="agent_unit_chk3" value="L" onclick="amountChange(this);sAmtChange();"><label for="agent_unit_chk2">LB</label>&nbsp;&nbsp;&nbsp;&nbsp;<!-- 
														--><input type="text" name="agent_rt" maxlength="8" value="<bean:write name="hblVO" property="agent_rt"/>" class="search_form zero_remove" style="width:40px;text-align:right;" onKeyPress="ComKeyOnlyNumber(this, '.')" onChange="amountChange(this);sRtChange();" ><!-- 
														--><input type="text" name="agent_amt" maxlength="20" value="<bean:write name="hblVO" property="agent_amt"/>" class="search_form zero_remove" style="width:75px;text-align:right;" onKeyPress="ComKeyOnlyNumber(this, '.')" onChange="amountChange(this);sAmtChange();"><!-- 
														--><html:select name="hblVO" property="agent_curr_cd" styleClass="search_form" style="width:60px;">
															<html:options collection="currCdList" property="cd_val" labelProperty="cd_nm"/>
														</html:select><!-- 
														--><input type="hidden" name="h_agent_curr_cd" value="<bean:write name="hblVO" property="agent_curr_cd"/>"><!-- 
													--></td>
												</tr>
												<tr>
													<th><bean:message key="Selling_Rate_Amount"/></th>
													<td><!-- 
														--><input type="hidden" name="customer_unit_chk1" value="<bean:write name="hblVO" property="customer_unit_chk"/>"/><!-- 
														--><input type="radio" name="customer_unit_chk" id="customer_unit_chk2" value="K" onclick="amountChange(this);cRtChange();"><label for="customer_unit_chk1">KG</label>&nbsp;<!-- 
														--><input type="radio" name="customer_unit_chk" id="customer_unit_chk3" value="L" onclick="amountChange(this);cAmtChange();"><label for="customer_unit_chk2">LB</label>&nbsp;&nbsp;&nbsp;&nbsp;<!-- 
														--><input type="text" name="cust_rt" maxlength="8" value="<bean:write name="hblVO" property="cust_rt"/>" class="search_form zero_remove" style="width:40px;text-align:right;" onKeyPress="ComKeyOnlyNumber(this, '.')" onChange="amountChange(this);cRtChange();"><!-- 
														--><input type="text" name="cust_amt" value="<bean:write name="hblVO" property="cust_amt"/>" class="search_form zero_remove" style="width:75px;text-align:right;" onKeyPress="ComKeyOnlyNumber(this, '.')" onChange="amountChange(this);cAmtChange();"><!-- 
														--><html:select name="hblVO" property="cust_curr_cd" styleClass="search_form" style="width:60px;">
															<html:options collection="currCdList" property="cd_val" labelProperty="cd_nm"/>
														</html:select><!-- 
														--><input type="hidden" name="h_cust_curr_cd" value="<bean:write name="hblVO" property="cust_curr_cd"/>"><!-- 
													--></td>
												</tr>
					</tbody>
				</table>
				<table>
					<colgroup>
						<col width="100" />
						<col width="120" />
						<col width="107" />
						<col width="*" />
					</colgroup>
					<tbody>
												
                                                <tr>
                                                    <th><bean:message key="Freight_Term"/></th>
                                                    <td>
                                                        <bean:define id="frtList" name="valMap" property="frtCdList"/>
                                                        <html:select name="hblVO" property="frt_term_cd" styleClass="search_form">
                                                            <html:options collection="frtList" property="cd_val" labelProperty="cd_nm"/>
                                                        </html:select> 
                                                        <input type="hidden" name="h_frt_term_cd" value="<bean:write name="hblVO" property="frt_term_cd"/>">
                                                    </td>
                                                    <th><bean:message key="Other_Charge"/></th>
                                                    <td>
                                                        <bean:define id="frtList" name="valMap" property="frtCdList"/>
                                                        <html:select name="hblVO" property="otr_chg_term_cd" styleClass="search_form"  style="width:85px">
                                                            <html:options collection="frtList" property="cd_val" labelProperty="cd_nm"/>
                                                        </html:select>
                                                        <input type="hidden" name="h_otr_chg_term_cd" value="<bean:write name="hblVO" property="otr_chg_term_cd"/>"> 
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th><bean:message key="Profit_Share"/></th>
                                                    <td>
                                                        <input type="text" name="profit_share" maxlength="5" value="<bean:write name="hblVO" property="profit_share"/>" class="search_form zero_remove" style="width:30px;text-align:right;" onKeyPress="ComKeyOnlyNumber(this)">
								                        <input type="hidden" name="h_profit_share" value="<bean:write name="hblVO" property="profit_share"/>">                                                        
                                                        <input type="text" value="%" class="search_form" style="width:20px;border:0;background-color:transparent;" tabindex=-1 readonly>
                                                    </td>
                                                    <th><bean:message key="Sales_Type"/></th>
                                                    <td >
                                                        <bean:define id="slsList" name="valMap" property="slsCdList"/>
                                                        <html:select name="hblVO" property="nomi_flg" style="width:85px" styleClass="input1" onchange="changeSalesType();">
                                                            <html:options collection="slsList" property="cd_val" labelProperty="cd_nm"/>
                                                        </html:select>
                                                    </td>
                                                </tr>
                                                <tr>
                                                </tr>
                                                <tr>
                                                    <th><bean:message key="DV_Carriage"/></th>
                                                    <td>
                                                        <input type="text" name="decl_crr_val" maxlength="50"  value='<bean:write name="hblVO" property="decl_crr_val"/>' class="search_form" onblur="strToUpper(this)" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:85px;">
                                                    </td>
                                                    <th><bean:message key="DV_Customs"/></th>
                                                    <td>
                                                        <input type="text" name="decl_cstms_val" maxlength="50" value='<bean:write name="hblVO" property="decl_cstms_val"/>' class="search_form" onblur="strToUpper(this);getCheckAmt(this);" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:85px;">
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th><bean:message key="Ship_Type"/></th>
													<td>
                                                        <bean:define id="shpList" name="valMap" property="shpCdList"/>
                                                        <html:select name="hblVO" property="shp_tp_cd" styleClass="search_form" style="width:85px;" >
                                                            <html:options collection="shpList" property="cd_val" labelProperty="cd_nm"/>
                                                        </html:select> 
													</td>
                                                    <th><bean:message key="Insurance"/></th>
                                                    <td>
                                                        <input type="text" name="amt_insur_val" maxlength="50" value='<bean:write name="hblVO" property="amt_insur_val"/>' class="search_form" onblur="strToUpper(this)" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:85px;">
                                                    </td>
                                                </tr>
                                                <tr>
                                                	<th><bean:message key="Internal"/></th>
                                                	<td colspan="3"><!-- 
                                                	--><input type="checkBox" name="inter_use_flag" id="inter_use_flag" value="<bean:write name="hblVO" property="inter_use_flag"/>" onclick="flgChange(this);"><!--
                                                	--></td>
                                                </tr>
					</tbody>
				</table>
			</div>
			</div>
    	</div>
</div>
<!-- layout_wrap(E) -->
