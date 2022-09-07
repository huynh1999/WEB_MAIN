<!--  area S -->
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
			<col width="*">
		</colgroup>
		<tbody>
			<!-- search line 1 S -->
			<tr> 
				<!-- 1. HB/L No. -->
				<th><bean:message key="HBL_No"/></th> 
				<td>
                    <input type="text"  required readonly name="hbl_no" maxlength="40" value='<bean:write name="hblVO" property="hbl_no"/>' onblur="strToUpper(this)" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:130px;" onclick="strAuto(this);">
                    <input type="hidden" name="h_bl_no" value="<bean:write name="hblVO" property="hbl_no"/>">
                </td>
                <!-- 2. Co-Load B/L No. -->
				<th><bean:message key="CO_LOAD_BL_NO"/></th> 
				<td>
                    <input type="text" required name="bl_no" maxlength="20" value='<bean:write name="hblVO" property="bl_no"/>' onblur="strToUpper(this)" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:130px;" onclick="strAuto(this);">
                    <input type="hidden" name="c_bl_no" value="<bean:write name="hblVO" property="bl_no"/>">
                </td> 
                <!-- 4. MBL_No -->
                <th><bean:message key="MBL_No"/></th>
                <td><input type="text" name="mbl_no" maxlength="40" value='<bean:write name="hblVO" property="mbl_no"/>' class="search_form-disable" onblur="strToUpper(this)" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:130px;" ondblclick="goToBlPage('view_mbl', this.value)" tabindex="-1" readonly></td>
                <td>&nbsp;</td>
			    <td>&nbsp;</td>
			    <td>&nbsp;</td>                
			</tr>
			<!-- search line 1 E -->
			<!-- search line 2 S -->
			<tr> 
                <!-- 6. MRN -->
                <th><bean:message key="MRN"/></th>
				<td><input type="text" name="mrn_no"  maxlength="20" value='<bean:write name="hblVO" property="mrn_no"/>' class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:130px;text-transform:uppercase;" onblur="strToUpper(this)"></td>				
            
				<!-- 7. Customer Ref. No -->				
                <th><bean:message key="Customer_Ref_No"/></th> 
                <td><input type="text" name="cust_ref_no" maxlength="40"  value="<bean:write name="hblVO" property="cust_ref_no"/>" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:130px;text-transform:uppercase;" onblur="strToUpper(this)" onchange="textdescAdd(frm1.exp_ref_no, '', this.value, frm1.h_cust_ref_no);"> 
                     <input type="hidden" name="h_cust_ref_no" value='<bean:write name="hblVO" property="cust_ref_no"/>'>
                </td>
                <!-- 8. No.of Original B/L -->		
                <th><bean:message key="No_of_Original_BL"/></th>
			    <td>
			       <input type="text" name="org_bl_qty" maxlength="3" value="<bean:write name="hblVO" property="org_bl_qty"/>" onkeyPress="onlyNumberCheck();" onkeyup="numberCommaLen(this,7,0)" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:60px;text-align:right" class="search_form">
			    </td>
			    <td>&nbsp;</td>
			    <td>&nbsp;</td>
			    <td>&nbsp;</td>
			</tr>
			<!-- search line 3 E -->
			</tbody>
		</table>
</div>
<!-- area E -->

	<!-- layout_wrap(S) -->
	<div class="layout_wrap" style="min-width:1300px;">
		<!-- layout_vertical a (S) -->
	    <div class="layout_vertical_4" style="width:277px;">
	    	<div class="opus_design_inquiry sm" style="height:450px;">
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
						<td><input type="text" readonly name="prnr_trdp_cd" maxlength="20" value='<bean:write name="hblVO" property="prnr_trdp_cd"/>' onKeyDown="codeNameAction('trdpCode_partner',this, 'onKeyDown', 'S', 'O', 'H')" onBlur="strToUpper(this);codeNameAction('trdpCode_partner',this, 'onBlur', 'S', 'O', 'H')" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:50px;"><!-- 
                            --><button type="button" name="partner" id="partner" class="input_seach_btn" tabindex="-1" onClick="openPopUp('LINER_POPLIST_BLANK', document.getElementById('partner'), frm1.prnr_trdp_nm.value);"></td><!-- 
                            --><td><input type="text"   readonly name="prnr_trdp_nm" maxlength="50" value='<bean:write name="hblVO" property="prnr_trdp_nm"/>' onblur="strToUpper(this)" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:121px;" onKeyPress="if(event.keyCode==13){openPopUp('LINER_POPLIST', document.getElementById('partner'), frm1.prnr_trdp_nm.value);}"></td><!-- 
							--><input type="hidden" name="prnr_trdp_addr" value='<bean:write name="hblVO" property="prnr_trdp_addr"/>'>                                                        </td>
		            </tr>
					<tr>
						<th id="blShpObj"><a href="javascript:clearBlPrnr('S01');"><bean:message key="Shipper"/></a></th>
						<td colspan="2"><input type="text"   name="shpr_trdp_nm" maxlength="50" value='<bean:write name="hblVO" property="shpr_trdp_nm"/>'  onblur="strToUpper(this);checkTrdpCode(this);"  class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:175px;text-transform:uppercase;" onKeyPress="if(event.keyCode==13){openPopUp('LINER_POPLIST', document.getElementById('shipper'), frm1.shpr_trdp_nm.value);}"><!-- 
							--><button type="button" name="shipper" id="shipper" class="input_seach_btn" tabindex="-1" onClick="openPopUp('LINER_POPLIST',this);"></button><!-- 
							--><input type="hidden" name="shpr_trdp_cd" value='<bean:write name="hblVO" property="shpr_trdp_cd"/>'  class="search_form" onKeyDown="codeNameAction('trdpCode_shipper',this, 'onKeyDown')" onBlur="strToUpper(this);codeNameAction('trdpCode_shipper',this, 'onBlur')" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:48px;"></td>
					</tr>
					<tr>
						<td colspan="3">
							<textarea name="shpr_trdp_addr" class="search_form autoenter_50px" dataformat="excepthan" style="width:270px;height:80px;" onblur="strToUpper(this);chkCmpAddr(this, 'Shipper Address')" WRAP="off"><bean:write name="hblVO" property="shpr_trdp_addr" filter="false"/></textarea>
						</td>
					</tr>
					<tr>
						<th id="blConObj"><a href="javascript:clearBlPrnr('C01');"><bean:message key="Consignee"/></a></th>
						<td colspan="2"><input type="hidden" name="cnee_trdp_cd"  value='<bean:write name="hblVO" property="cnee_trdp_cd"/>'  onKeyDown="codeNameAction('trdpCode_consignee',this, 'onKeyDown')" onBlur="strToUpper(this);codeNameAction('trdpCode_consignee',this, 'onBlur');" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:48;"><!-- 
							--><input type="text"   name="cnee_trdp_nm"  maxlength="50" value='<bean:write name="hblVO" property="cnee_trdp_nm"/>'  onblur="strToUpper(this);checkTrdpCode(this);"   class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:175px;text-transform:uppercase;" onKeyPress="if(event.keyCode==13){openPopUp('LINER_POPLIST', document.getElementById('consignee'), frm1.cnee_trdp_nm.value);}"><!-- 
							--><button type="button" name="consignee" id="consignee" class="input_seach_btn" tabindex="-1" onClick="openPopUp('LINER_POPLIST',this);"></button></td>
					</tr>
					<tr>
						<td colspan="3"><textarea name="cnee_trdp_addr" class="search_form autoenter_50px" dataformat="excepthan" style="width:270px;height:80px;" onblur="strToUpper(this);chkCmpAddr(this, 'Consignee Address')" WRAP="off"><bean:write name="hblVO" property="cnee_trdp_addr" filter="false"/></textarea></td>
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
						<td colspan="3"><textarea name="ntfy_trdp_addr" class="search_form autoenter_50px" dataformat="excepthan" style="width:270px;height:80px;" onblur="strToUpper(this);chkCmpAddr(this, 'Notify Address')" WRAP="off"><bean:write name="hblVO" property="ntfy_trdp_addr" filter="false"/></textarea></td>
					</tr>
					<tr height="7px"></tr>					
				</tbody>
			</table>
			</div>
	    </div>
	    <!-- layout_vertical a (E) -->
	    
	    <!-- layout_vertical b (S) -->
	    <div class="layout_vertical_4 pad_rgt_4" style="width:275px;">
	    	<div class="opus_design_inquiry sm" style="height:450px;">
	    	<h3 class="title_design"></h3> 
  					<table>
	  					<colgroup>
	  						<col width="70px" />
	  						<col width="*" />
	  					</colgroup>
	  					<tbody>			                
                            <!-- export references No -->
                            <tr>
                            	<th colspan="2" style="text-align: left;"><bean:message key="Export_Reference_No"/></th>
                            </tr>
                            <tr>
                                <td colspan="2">
                                	<textarea name="exp_ref_no" class="search_form autoenter_50px" onblur="strToUpper(this);chkCmpAddr(this, 'Export Reference No.')" dataformat="excepthan" style="width:263px;height:80px;" WRAP="off"><bean:write name="hblVO" property="exp_ref_no" filter="false"/></textarea>
								</td>
                            </tr>
                           	<tr>
	                            <th colspan="2" style="text-align: left;"><bean:message key="Container_Summary"/></th>
	                        </tr>
	                        <tr>
	                            <td colspan="2"><input type="text" name="cntr_info" value='<bean:write name="hblVO" property="cntr_info"/>' onBlur="strToUpper(this)" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:263px;" maxlength="50"></td>
	                        </tr>
	                        <tr height="7px">&nbsp;</tr>
							<tr>
                    			<td colspan="4">
                        			<h3 style="font-size:12px;">&nbsp;</h3>
                      			</td>
                  			</tr>
                  			
	  					</tbody>
	  				</table>
	  			</div>
	    </div>
	    <!-- layout_vertical b (E) -->
	    
	    <!-- layout_vertical c (S) -->	    
	    <div class="layout_vertical_4 pad_rgt_4" style="width:350px;">
	    	<div class="opus_design_inquiry sm" style="height:450px;">
	    		<table>
	    			<colgroup>
				    			<col width="115px" />
				    			<col width="75px" />
				    			<col width="75px" />
				    			<col width="*" />
				    </colgroup>
				    <tbody>
				    	<tr>
							<td colspan="4"><h3 class="title_design"><bean:message key="Vessel"/></h3>	</td>
						</tr>
						<!--  Onboard -->
                        <tr>
                            <th><bean:message key="On_Board"/></th>
                            <td colspan="3"><input name="obrd_dt_tm" id="obrd_dt_tm" value='<wrt:write name="hblVO" property="obrd_dt_tm" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy"/>'   type="text" class="search_form" onKeyUp="mkDateFormatType(this, event, false,1)" onBlur="mkDateFormatType(this, event, true,1);dateRangeValid(this, 'Onboard');cobChange();" dataformat="excepthan" style="ime-mode:disabled;width:70px;" maxlength="10"><!-- 
                                 --><button type="button" class="calendar" tabindex="-1" name="obrd_dt_tm_cal" id="obrd_dt_tm_cal"  onclick="doDisplay('DATE1',frm1.obrd_dt_tm);" ></button></td>
                        </tr>
                        <!--  VSL/VOY -->
                        <tr>
                            <th><bean:message key="VSL_VOY"/></th>
                            <td colspan="3"><input type="hidden" name="trnk_vsl_cd" maxlength="50" value='<bean:write name="hblVO" property="trnk_vsl_cd"/>' class="search_form" onKeyDown="codeNameAction('srVessel',this, 'onKeyDown')" onBlur="strToUpper(this);codeNameAction('srVessel',this, 'onBlur');cobChange();" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:40px;"><!--
                                --><input type="text" name="trnk_vsl_nm"   value='<bean:write name="hblVO" property="trnk_vsl_nm"/>' onblur="strToUpper(this);cobChange();" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:130px;text-transform:uppercase;" maxlength="50" onchange="cobChange();" onKeyPress="if(event.keyCode==13){openPopUp('VESSEL_POPLIST', document.getElementById('trunkvessel'), frm1.trnk_vsl_nm.value);}"><!--
                                --><button type="button" name="trunkvessel" id="trunkvessel" class="input_seach_btn" tabindex="-1" onClick="openPopUp('VESSEL_POPLIST',this);"></button><!--
                                --><input type="text" name="trnk_voy"      value='<bean:write name="hblVO" property="trnk_voy"/>'   onchange="cobChange();" onblur="strToUpper(this);cobChange();"  class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:65px;text-transform:uppercase;" maxlength="15"></td>
                        </tr>
                        <tr>
                            <td colspan="4"><h3 class="title_design mar_top_8" style="margin-bottom:0px;"><bean:message key="Route"/></h3>	</td>
                        </tr>
                        <tr>
                        	<td colspan="4" align="right"><button type="button" class="btn_etc" name="btn_msnbonded" id="btn_msnbonded" onClick="doWork('TRANSSHIPPED')"><bean:message key="Transshipped"/></button><!--
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
						<td colspan="3"><input type="text" readonly name="lnr_trdp_cd" maxlength="20" value='<bean:write name="hblVO" property="lnr_trdp_cd"/>' onKeyDown="codeNameAction('trdpCode_liner',this, 'onKeyDown');setLiner()" onBlur="strToUpper(this);codeNameAction('trdpCode_liner',this, 'onBlur');setLiner()" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:50px;"><!--
                            --><button type="button" name="liner" id="liner" class="input_seach_btn" tabindex="-1" onClick="openPopUp('LINER_POPLIST_BLANK', document.getElementById('liner'), frm1.lnr_trdp_nm.value);"></button><!--
                            --><input type="text"  readonly name="lnr_trdp_nm" maxlength="50"  value='<bean:write name="hblVO" property="lnr_trdp_nm"/>' onblur="strToUpper(this);setLiner()" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:145px;" onKeyPress="if(event.keyCode==13){openPopUp('LINER_POPLIST', document.getElementById('liner'), frm1.lnr_trdp_nm.value);}"></td>
					</tr>
					<tr>
						<th><bean:message key="ETD_of_POL"/></th>
						<td><input required type="text" name="etd_dt_tm" maxlength="10" value='<wrt:write name="hblVO" property="etd_dt_tm" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy"/>' class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:70px;" onKeyUp="mkDateFormatType(this, event, false,1)" onBlur="mkDateFormatType(this, event, true,1);dateRangeValid(this, 'ETD of POL');chgOnboard(this);"></td>
						<th><bean:message key="ETA_of_POD"/></th>
						<td><input type="text" name="eta_dt_tm" maxlength="10" value='<wrt:write name="hblVO" property="eta_dt_tm" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy"/>' class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:75px;" onKeyUp="mkDateFormatType(this, event, false,1)" onBlur="mkDateFormatType(this, event, true,1);dateRangeValid(this, 'ETA of POD');"></td>
					</tr>
					<tr>
						<th><bean:message key="ETD_Of_POR"/></th>
						<td colspan="3"><input name="etd_por_tm" value='<wrt:write name="hblVO" property="etd_por_tm" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy"/>'   type="text" class="search_form" onKeyUp="mkDateFormatType(this, event, false,1)" onBlur="mkDateFormatType(this, event, true,1);dateRangeValid(this, 'ETD of POR');cobChange();" dataformat="excepthan" style="ime-mode:disabled;width:70px;" maxlength="10"></td>
					</tr>
					<tr>						
						<th><bean:message key="Ship_Mode"/></th>
						<td><bean:define id="shipModeList" name="valMap" property="shipModeList"/>
							<html:select name="hblVO" property="shp_mod_cd" styleClass="input1" style="width:75px;" onchange="shipModeChange();shipModeChangeDef(this);" >
								<html:options collection="shipModeList" property="cd_val" labelProperty="cd_nm"/>
							</html:select></td>
					</tr>
					<!-- Commodity -->
					<tr>
						<th><bean:message key="Commodity"/></th>
						<td colspan="3">
							<input type="text" name="rep_cmdt_cd" maxlength="13" value="<bean:write name="hblVO" property="rep_cmdt_cd"/>" class="search_form" onKeyDown="codeNameAction('commodity',this, 'onKeyDown')" onBlur="strToUpper(this);codeNameAction('commodity',this, 'onBlur')" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:50px;"><!--
							--><button type="button" name="commodity" id="commodity" class="input_seach_btn" tabindex="-1" onClick="openPopUp('COMMODITY_POPLIST',this)"></button><!--
							--><input type="text" name="rep_cmdt_nm" value="<bean:write name="hblVO" property="rep_cmdt_nm"/>" maxlength="100" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:145px;" onBlur="strToUpper(this);" onchange="textAdd(frm1.desc_txt, '', this.value, frm1.h_rep_cmdt_nm);" onKeyPress="if(event.keyCode==13){openPopUp('COMMODITY_POPLIST', this);}"><!--
							--><input type="hidden" name="h_rep_cmdt_nm" maxlength="50" value="<bean:write name="hblVO" property="rep_cmdt_nm"/>" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:145px;">
						</td>
					</tr>					
				    </tbody>	
	    		</table>
	    	</div>
	    </div>
	    <!-- layout_vertical c (E) -->
	    
	    <!-- layout_vertical d (S) -->
	    <div class="layout_vertical_4" style="width:calc(100% - 902px);">
	    	<div class="opus_design_inquiry sm" style="height:450px;">
	    	<h3 class="title_design"><bean:message key="Shippment_and_Item"/></h3>
		    <table>
		    	<colgroup>
		    		<col width="70px" />
		    		<col width="*" />
		    	</colgroup>
		    	<tbody>
		    		<tr>
						<th><bean:message key="Package"/></th>
						<td><input type="text" name="pck_qty" value="<bean:write name="hblVO" property="pck_qty"/>" onkeyPress="onlyNumberCheck();" onkeyup="numberCommaLen(this,7,0)" onblur="setPacQty();" maxlength="7"  class="search_form zero_remove" dataformat="excepthan" style="ime-mode:disabled;width:60px;text-align:right"> 
							<bean:define id="pckList" name="valMap" property="pckCdList"/>
							<html:select name="hblVO" property="pck_ut_cd" styleClass="search_form" style="width:150px;" onchange="setPacQty();">
								<option></option>
								<html:options collection="pckList" property="pck_ut_cd" labelProperty="pck_nm"/>
							</html:select></td>
					</tr>
					<tr>
						<th><bean:message key="GWeight"/></th>
						<td><input type="text" name="grs_wgt" value="<bean:write name="hblVO" property="grs_wgt"/>" onkeyPress="onlyNumberCheck('.');" onchange="numberCommaLen(this,8,3);chkComma(this,8,3);weightChange(this);amountChange(frm1.agent_rt);amountChange(frm1.cust_rt);" maxlength="13" class="search_form zero_remove" dataformat="excepthan" style="ime-mode:disabled;width:60px;text-align:right;"><!--
		                	--><input type="text" name="grs_wgt_ut_cd" value="K" style="width:40px;border:0;background-color:transparent;" tabindex="-1" readOnly><!--
		                	--><input type="text" name="grs_wgt1" value="<bean:write name="hblVO" property="grs_wgt1"/>" onkeyPress="onlyNumberCheck('.');" onchange="numberCommaLen(this,8,3);chkComma(this,8,3);weightChange(this);amountChange(frm1.agent_rt);amountChange(frm1.cust_rt);" maxlength="13" class="search_form zero_remove" dataformat="excepthan" style="ime-mode:disabled;width:60px;text-align:right;"><!--
		                	--><input type="text" name="grs_wgt_ut_cd1" value="L" style="width:30px;border:0;background-color:transparent;" tabindex="-1" readOnly></td>
					</tr>
					<tr>
						<th><bean:message key="Measurement"/></th>
						<td><input type="text" name="meas" value="<bean:write name="hblVO" property="meas"/>" onkeyPress="onlyNumberCheck('.');" onchange="numberCommaLen(this,8,3);chkComma(this,8,3);cbmChange(this);amountChange(frm1.agent_rt);amountChange(frm1.cust_rt);" maxlength="13" class="search_form zero_remove" dataformat="excepthan" style="ime-mode:disabled;width:60px;text-align:right;"><!--
		                	--><input type="text" name="meas_ut_cd" value="CBM" style="width:40px;border:0;background-color:transparent;" tabindex="-1" readOnly><!--
		                	--><input type="text" name="meas1" value="<bean:write name="hblVO" property="meas1"/>" onkeyPress="onlyNumberCheck('.');" onchange="numberCommaLen(this,8,3); cbmChange(this);amountChange(frm1.agent_rt);amountChange(frm1.cust_rt);" maxlength="13" class="search_form zero_remove" dataformat="excepthan" style="ime-mode:disabled;width:60px;text-align:right;"><!--
		                	--><input type="text" name="meas_ut_cd1" value="CFT" style="width:30px;border:0;background-color:transparent;" tabindex="-1" readOnly>
						</td>
					</tr>
		    	</tbody>
		    </table>
			
		    	<table>
		    		<colgroup>
		    			<col width="130px" />
		    			<col width="125px" />
		    			<col width="90px" />
		    			<col width="*" />
		    		</colgroup>
		    		<tbody>
						
					</tbody>
				</table>
				<table>
		    		<colgroup>
		    			<col width="100px" />
		    			<col width="125px" />
		    			<col width="90px" />
		    			<col width="*" />
		    		</colgroup>
		    		<tbody>
                        <tr>
                            <th><bean:message key="Buying_Freight"/></th>
                            <td><bean:define id="frtList" name="valMap" property="frtCdList"/>
                                <html:select name="hblVO" property="frt_term_a_cd" styleClass="search_form" style="width:85px;">
                                    <html:options collection="frtList" property="cd_val" labelProperty="cd_nm"/>
                                </html:select><!--
             				--><input type="hidden" name="h_frt_term_a_cd" value="<bean:write name="hblVO" property="frt_term_a_cd"/>"> 
                            </td>
                            <th><bean:message key="Selling_Freight"/></th>
                            <td><bean:define id="frtList" name="valMap" property="frtCdList"/>
                                <html:select name="hblVO" property="frt_term_c_cd" styleClass="search_form" style="width:85px;" onchange="descFreight();">
                                    <html:options collection="frtList" property="cd_val" labelProperty="cd_nm"/>
                                </html:select><!--
             				--><input type="hidden" name="h_frt_term_c_cd" value="<bean:write name="hblVO" property="frt_term_c_cd"/>">
                            </td>
                        </tr>
                    </tbody>
                 </table>
                       
                      <table>
			    		<colgroup>
			    			<col width="100px" />
			    			<col width="125px" />
			    			<col width="90px" />
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
                                 
                             </tr>
                             <tr>
                             	<th><bean:message key="Express_BL"/></th>
								<td>
								<bean:define id="yesNoCdList" name="valMap" property="yesNoCdList"/>
								<html:select name="hblVO" property="express_tp_cd" styleClass="search_form" style="width:75;" onchange="expressChange(frm1.exp_frt_desc, frm1.h_express_tp_cd);">
									<html:options collection="yesNoCdList" property="cd_val" labelProperty="cd_nm"/>
								</html:select><!--
		                	--><input type="hidden" name="h_express_tp_cd" value="<bean:write name="hblVO" property="express_tp_cd"/>"/>
							</td>
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
                                <html:select name="hblVO" property="nomi_flg" style="width:105px;" styleClass="input1">
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
			    			<col width="100px" />
			    			<col width="125px" />
			    			<col width="90px" />
			    			<col width="*" />
			    		</colgroup>
			    		<tbody> 
						<tr>							
							<th id="blIsDtObj"><bean:message key="Date_issued"/></th>
							<td><input type="text" name="bl_iss_dt" id="bl_iss_dt" maxlength="10" value="<wrt:write name="hblVO" property="bl_iss_dt" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy"/>" class="search_form" onKeyUp="mkDateFormatType(this, event, false,1)" onBlur="mkDateFormatType(this, event, true,1);dateRangeValid(this, 'Date Issued');" dataformat="excepthan" style="ime-mode:disabled;width:65px; font-size: 11px;"><!-- 
							--><button type="button" class="calendar" tabindex="-1" name="bl_iss_dt_cal" id="bl_iss_dt_cal"  onclick="doDisplay('DATE1' ,frm1.bl_iss_dt);" ></button>
							</td>					
							<th><bean:message key="Issued_By"/></th>
							<td colspan="3"><input type="text"   name="opr_usrid" value="<bean:write name="hblVO" property="issued_by"/>" class="search_form-disable" tabindex="-1" readOnly style="width:75px;"><!-- 
							--><button type="button" class="input_seach_btn" tabindex="-1" onClick="openPopUp('OPR_POPLIST',this)"></button><!--
		                	--><input type="hidden" name="opr_usrnm"   value="<bean:write name="hblVO" property="proc_usrnm"/>"><!--
		                	--><input type="hidden" name="opr_ofc_cd"  value="<bean:write name="hblVO" property="proc_ofccd"/>"><!--
		                	--><input type="hidden" name="opr_dept_cd" value="<bean:write name="hblVO" property="proc_dept_cd"/>"></td>
						</tr>						
		    		</tbody>
		    	</table>
	    	</div>
	    </div>
	    <!-- layout_vertical d (E) -->
	    
	    <!--  Container List grid S -->
	    <div class="opus_design_grid">
			<h3 class="title_design pad_btm_8"><bean:message key="Container_List"/></h3>
			<div class="opus_design_btn">
				<button type="button" style="display:none;" class="btn_accent" name="cnrtPopAdd" id="cnrtPopAdd" onClick="javascript:getMasterCntrList();if(docObjects[1].RowCount()>0){cntrInfoSet(docObjects[1]);}"><bean:message key="Add"/></button>
			</div>
			<script type="text/javascript">comSheetObject('sheet2');</script>
			
		</div>
		<!--  container grid E -->
		
	</div>
	<!-- layout_wrap(E) -->
