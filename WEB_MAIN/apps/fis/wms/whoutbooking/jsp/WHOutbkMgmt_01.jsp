<%--=========================================================
*Copyright(c) 2015 DOU NetsWork. All Rights Reserved.
*@FileName   : WHOutbkMgmt_01.jsp
*@FileTitle  : Outbound Booking Management( Header Tab)
*@author     : Vinh.Vo - DOU Network
*@version    : 1.0
*@since      : 2015/07/28
=========================================================--%>

	<div class="opus_design_inquiry">
		<table>
			<colgroup>
				<col width="124" />
				<col width="220" />
				<col width="180" />
				<col width="220" />
				<col width="180" />
				<col width="*" />
	        </colgroup>
	        <tbody>
				<tr>
					<th>Booking No.</th>
					<td><input name="wob_bk_no" id="wob_bk_no" type="text" class="L_input_R" tabindex="-1" style="width: 207px;" readonly /></td>
	                <th>Warehouse</th>
	                	<td>
	                		<select name="wh_cd" id="wh_cd" class="search_form"  onchange="check_authority_wh();" style="width: 207px;" required>
	                			<option value=""></option>
	                			<logic:notEmpty name ="valMap" property="wh_cd_lst">                      	
									<logic:iterate id="item" name="wh_cd_lst">
			                        	<option value='<bean:write name="item" property="wh_cd"/>'><bean:write name="item" property="wh_nm"/></option>
			                        </logic:iterate>
		                        </logic:notEmpty>
							</select>
	                    </td>
					<th>Booking Date</th>
					<td>
						<input type="text" id="bk_date" name="bk_date" value="" onkeypress="onlyNumberCheck();" 
                	 			onkeyup="mkDateFormatType(this, event, false,1)" onblur="mkDateFormatType(this, event, true,1)" size="11" style="width: 78px" maxlength="10"/><!-- 
						 --><button type="button" class="calendar ir" name="btn_date" id="btn_date" onclick="doDisplay('DATE1' ,form,form.bk_date);"></button>
						</td>
				</tr>
				
				<tr>
					<th><input name="ord_tp_cd_1" id="ord_tp_cd_1" type="hidden" />Order Type</th>
					<td>
						
						<select name="ord_tp_cd" id="ord_tp_cd" class="search_form"  style="width: 207px;" required>
						</select>
					</td>
					
					<th><input name="bk_sts_cd_1" id="bk_sts_cd_1" type="hidden" />Booking Status</th>
					<td>
							
							<select name="bk_sts_cd" id="bk_sts_cd" class="search_form" style="width: 207px;">
							</select>
						<input name="issue" id="issue" type="checkbox" /><label for="issue">Issue</label>
					</td>
					
	                <th>Estimated Out Date</th>
	                <td>
                	 	<input type="text" id="est_out_dt" name="est_out_dt" value="" onkeypress="onlyNumberCheck();" 
                	 			onkeyup="mkDateFormatType(this, event, false,1)" onblur="mkDateFormatType(this, event, true,1)" size="11" style="width: 78px" maxlength="10" required/><!-- 
						 --><button type="button" class="calendar ir" name="btn_date" id="btn_date" onclick="doDisplay('DATE1' ,form,form.est_out_dt);"></button>
	                 </td>
				</tr>
				
				<tr>
					<th><input name="load_tp_cd_1" id="load_tp_cd_1" type="hidden" />Loading Type</th>
					<td>
					<!-- <script>ComComboObject('load_tp_cd', 1, 207, 1);</script> -->
						
						<select name="load_tp_cd" id="load_tp_cd" class="search_form" style="width: 207px;">
						</select>
					</td>
					<th><input name="fwd_dir_1" id="fwd_dir_1" type="hidden" />Forwarding Direction</th>
					<td>
					<!-- <script>ComComboObject('fwd_dir', 1, 209, 1, 1);</script> -->
						<select name="fwd_dir" id="fwd_dir" class="search_form" style="width: 207px;" onchange="fwd_dir_OnChange()" required>
						</select>
					</td>
					<th><input name="order_rel_1" id="order_rel_1" type="hidden" />Order Relation</th>
					<td>
					<!-- <script >ComComboObject('order_rel', 1, 207, 1);</script> -->
						<select name="order_rel" id="order_rel" class="search_form" style="width: 207px;">
						</select>
					</td>
            	</tr>
				
				<tr>
					<th><a style="color:#0000FF" href="javascript:btn_link_ctrt();" id="btn_link_ctrt"><span class="point_B">Contract No.</span></a></th>
					<td>
						<input name="ctrt_no" type="text" class="input" style="width:178px;ime-mode:disabled;text-transform:uppercase;" dataformat="engup" otherchar="-_" onBlur="strToUpper(this);" maxlength="10"  /><!-- 
						 --><button type="button" name="btn_ctrt_no" id="btn_ctrt_no" class="input_seach_btn" tabindex="-1" onclick="doWork('btn_ctrt_no')"></button><!-- 
					 --><input name="rtp_no" type="text" class="L_input_R" style="width:209px;ime-mode:disabled;text-transform:uppercase;display: none" dataformat="excepthan" onBlur="strToUpper(this);" maxlength="20" readOnly tabindex="-1"/><!--
					 --><input name="so_no" type="text" class="L_input_R" style="width:207px;ime-mode:disabled;text-transform:uppercase;display: none" dataformat="excepthan" onBlur="strToUpper(this);" maxlength="15"  readOnly tabindex="-1" /><!--
					 --></td>
					 <th>Contract Name</th>
					<td>
						<input name="ctrt_nm" type="text" class="L_input_R" dataformat="engup" otherchar = " ()-_" style="width:207px;" readOnly tabindex="-1" /><!-- 
					 --></td>
					 <th>Sales Office/Person</th>
					<td>
						<input name="bk_stff_ofc_cd" id="bk_stff_ofc_cd" type="text" class="L_input_R" style="width:60px;" readOnly tabindex="-1" /><!--  
						 --><input name="bk_stff_nm"  id="bk_stff_nm" type="text" class="L_input_R" style="width:143px;" readOnly tabindex="-1" /><!-- 
						 --><input name="bk_stff_id" id="bk_stff_id" type="hidden" class="L_input_R" style="width:60px;height:14px;" readOnly tabindex="-1" /><!-- 
					--></td>
				</tr>
				
				<tr>
					<th>Owner</th>
					<td>
						<input name="owner_cd" type="text" class="input" style="width:60px;ime-mode:disabled;text-transform:uppercase; display: none" dataformat="excepthan" onBlur="strToUpper(this);ajaxTradePaner(this)" maxlength="10" OnKeyDown="if(event.keyCode==13){ajaxTradePaner(this)}"/><!-- 
						 --><input name="owner_nm" type="text" class="L_input" required style="width:178px;ime-mode:disabled;text-transform:uppercase;" dataformat="excepthan" onBlur="strToUpper(this);" maxlength="50"/><!-- 
					 	--><button type="button" name="btn_owner" id="btn_owner" class="input_seach_btn" tabindex="-1" onclick="TRDP_POP(form.owner_cd, form.owner_nm)"></button><!-- 
						 --></td>
					<th >Shipper</th>
					<td>
						<input name="supp_cd" type="text" class="L_input" style="width:60px;ime-mode:disabled;text-transform:uppercase; display: none" dataformat="excepthan" onBlur="strToUpper(this);ajaxTradePaner(this)" maxlength="10" OnKeyDown="if(event.keyCode==13){ajaxTradePaner(this)}"/><!-- 
						 --><input name="supp_nm" type="text" class="L_input" style="width:178px;ime-mode:disabled;text-transform:uppercase" dataformat="excepthan" onBlur="strToUpper(this);" maxlength="50"/><!-- 
					 --><button type="button" name="btn_supp" id="btn_supp" class="input_seach_btn" tabindex="-1" onclick="TRDP_POP(form.supp_cd, form.supp_nm)"></button><!-- 
						 --></td>
					<th >Consignee</th>
					<td>
						<input name="buyer_cd" type="text" class="L_input" style="width:60px;ime-mode:disabled;text-transform:uppercase; display: none" dataformat="excepthan" onBlur="strToUpper(this);ajaxTradePaner(this)" maxlength="10" OnKeyDown="if(event.keyCode==13){ajaxTradePaner(this)}"/><!-- 
						 --><input name="buyer_nm" type="text" class="L_input" style="width:178px;ime-mode:disabled;text-transform:uppercase;" dataformat="excepthan" onBlur="strToUpper(this);" maxlength="50"/><!-- 
					 --><button type="button" name="btn_buyer" id="btn_buyer" class="input_seach_btn" tabindex="-1" onclick="TRDP_POP(form.buyer_cd, form.buyer_nm)"></button><!-- 
						 --></td>
				</tr>
				
				<tr>
					<th></th>
					<td >
				    <textarea name="owner_addr1" class="search_form autoenter_50" dataformat="excepthan" style="width:207px;height:80px;" onblur="" WRAP="off" required></textarea>
				    </td>
				   
				    <th></th>
				    <td >
				    <textarea name="supp_addr1" class="search_form autoenter_50" dataformat="excepthan" style="width:207px;height:80px;" onblur="" WRAP="off" ></textarea>
				    </td>
				    
				    <th></th>
				    <td >
				    <textarea name="buyer_addr1" class="search_form autoenter_50" dataformat="excepthan" style="width:207px;height:80px;" onblur="" WRAP="off" ></textarea>
				    </td>
				</tr>
				
				<tr>
					<th>Cust Order No.</th>
					<td>
						<input name="cust_ord_no" type="text" class="L_input" style="width:207px;ime-mode:disabled;text-transform:uppercase;" dataformat="engup" otherchar = "<%=WMS_OTHER_CHAR%>" onBlur="strToUpper(this);" maxlength="100"/><!-- 
					 --></td>
					<th>Commercial Invoice No.</th>
					<td>
						<input name="commc_inv_no" type="text" class="L_input" style="width:207px;ime-mode:disabled;text-transform:uppercase;" dataformat="engup" onBlur="strToUpper(this);" maxlength="30"/><!-- 
					 --></td>
					<th>Delivery Order No.</th>
					<td>
						<input name="dlv_ord_no" type="text" class="L_input" style="width:207px;ime-mode:disabled;text-transform:uppercase;" dataformat="engup" onBlur="strToUpper(this);" maxlength="30"/><!-- 
						 --><input name="job_no" type="hidden" class="L_input" style="width:200px;ime-mode:disabled;text-transform:uppercase;" dataformat="excepthan" onBlur="strToUpper(this);" maxlength="30" />
					</td>
				</tr>
				
				<tr>
					<th>Request Department</th>
					<td>
						<input name="req_dept" type="text" class="L_input" dataformat="eng" style="width: 207px;text-transform:uppercase;" maxlength="20" /><!-- 
					 --></td>
					<th>Request Applicant</th>
					<td>
						<input name="req_applicant" id="req_applicant" type="text" class="L_input" style="width: 207px;text-transform:uppercase;" maxlength="20" dataformat="eng" /><!-- 
					 --><input name="src_tp_cd" type="text" class="L_input_R" style="width: 207px;display: none" tabindex="-1" readonly /></td>
					<!-- <th>Creation Type</th>
					<td colspan="2"><input name="src_tp_cd" type="text" class="L_input_R" style="width: 207px;" tabindex="-1" readonly /></td> -->
				</tr>
				
				<tr>
                        <th>Reference No.</th>
                        <td>
                            <input name="ref_no" type="text" class="L_input" style="width:207px;ime-mode:disabled;text-transform:uppercase;" dataformat="engup" onBlur="strToUpper(this);" maxlength="20"/>
                        </td>
                        <th></th>
                        <td></td>
                        <th></th>
                        <td></td>
                    </tr>
							    
				<tr>
					<th><span id="show_remark" style="display:none;">Reason for ADJ</span><span id="hide_remark">Remark</span></th>
					<td colspan="5"><textarea name="rmk" id="rmk"  class="L_textarea" maxlength="1000" onBlur="rmk_len_chk();" dataformat="excepthan"></textarea></td>
				</tr>
			</tbody>
		</table>
	</div>
	
	<div style="padding:5px 0 5px 0;"><center><span id="btn_show_nm"><img src="<%=CLT_PATH%>/web/img/main/04_icon_show.gif" style="cursor:hand" onClick="btn_show_shipping(true)"></img></span><!-- 
	--><span id="btn_hide_nm" style="display:none"><img src="<%=CLT_PATH%>/web/img/main/04_icon_hide.gif" style="cursor:hand" onClick="btn_show_shipping(false)"></img></span></center></div>
	
	<div class= "opus_design_inquiry" style="display:none;"  id="show_shipping">
		<table border="0">
			<colgroup>
				<col width="124" />
				<col width="150" />
				<col width="150" />
				<col width="150" />
				<col width="149" />
				<col width="*" />
			</colgroup>
			<tbody>
				<tr>
					<th>Vessel/Voyage</th>
					<td colspan = "3">
					    <input name="vsl_cd" type="text" class="L_input" id="vsl_cd" style="width:250px;ime-mode:disabled;text-transform:uppercase;" dataformat="engup" onBlur="strToUpper(this);searchAjaxColInfo(form, this.value, 'vsl_cd');" maxlength="10"/><!-- 
					     --><button type="button" name="btn_vsl_cd" id="btn_vsl_cd" class="input_seach_btn" tabindex="-1" onclick="doWork('VESSEL_POPLIST')"></button><!-- 
                       	 --><input name="vsl_nm" type="text" class="L_input" id="vsl_nm" style="width:117px;ime-mode:disabled;text-transform:uppercase;" dataformat="excepthan" onBlur="strToUpper(this);" maxlength="35" OnKeyDown="if(event.keyCode==13){btn_vsl_nm()}"/><!--  
                       	 --><input name="voy" type="text" class="L_input" id="voy" style="width:50px;ime-mode:disabled;text-transform:uppercase;" dataformat="excepthan" onBlur="strToUpper(this);" maxlength="11"/><!-- 
                     --></td>
					<th>Carrier</th>
					<td>
						<input name="carrier_cd" type="text" class="L_input" id="carrier_cd" style="width:50px;ime-mode:disabled;text-transform:uppercase;" dataformat="engup" onBlur="strToUpper(this);ajaxTradePaner(this)" maxlength="10" OnKeyDown="if(event.keyCode==13){ajaxTradePaner(this)}"/><!-- 
						 --><button type="button" name="btn_carrier" id="btn_carrier" class="input_seach_btn" tabindex="-1" onclick="TRDP_POP(form.carrier_cd,form.carrier_nm)"></button><!-- 
                       	 --><input name="carrier_nm" type="text" class="L_input_R" id="carrier_nm" style="width:150px;" readOnly tabindex="-1"/><!-- 							
					 --></td>
				</tr>
				<tr>
					<th>House B/L No.</th>
					<td><input name="hbl_no" type="text" class="L_input" id="hbl_no" style="width:208px;ime-mode:disabled;text-transform:uppercase;" dataformat="engup" onBlur="strToUpper(this);" maxlength="20"/></td>
					<th></th>
					<td></td>
					<th>POL/ETD</th>
					<td>
						<input name="pol" type="text" class="L_input" id="pol" style="width:50px;ime-mode:disabled;text-transform:uppercase;" dataformat="engup" onBlur="strToUpper(this);codeNameAction('Location_pol',this, 'onBlur')" maxlength="5"/><!-- 
						 --><button type="button" name="on_btn_pol" id="on_btn_pol" class="input_seach_btn" tabindex="-1" onclick="LOCATION_POP(form.pol, form.pol_nm)"></button><!-- 						
						 --><input name="pol_nm" type="text" class="L_input_R" id="pol_nm" style="width:150px;" readOnly tabindex="-1"/><!-- 
						 --><span class="dash">/</span><!-- 
						 --><input type="text" id="etd" name="etd" value="" onkeypress="onlyNumberCheck();" 
                	 			onkeyup="mkDateFormatType(this, event, false,1)" onblur="mkDateFormatType(this, event, true,1)" size="11" style="width: 78px" maxlength="10"/><!-- 
						 --><button type="button" class="calendar ir" name="btn_date" id="btn_date" onclick="doDisplay('DATE1' ,form,form.etd);"></button><!-- 
				 --></td>
				</tr>
				<tr>
					<th>Master B/L No.</th>
					<td><input name="mbl_no" type="text" class="L_input" id="mbl_no" style="width:208px;ime-mode:disabled;text-transform:uppercase;" dataformat="engup" onBlur="strToUpper(this);" maxlength="20"/></td>
					<th></th>
					<td></td>
					<th>POD/ETA</th>
					<td>
						<input name="pod" type="text" class="L_input" id="pod" style="width:50px;ime-mode:disabled;text-transform:uppercase;" dataformat="engup" onBlur="strToUpper(this);codeNameAction('Location_pod',this, 'onBlur')" maxlength="5"/><!-- 
						 --><button type="button" name="on_btn_pod" id="on_btn_pod" class="input_seach_btn" tabindex="-1" onclick="LOCATION_POP(form.pod, form.pod_nm)"></button><!-- 						
						 --><input name="pod_nm" type="text" class="L_input_R" id="pod_nm" style="width:150px;" readOnly tabindex="-1"/><!-- 
						 --><span class="dash">/</span><!-- 
						 --><input type="text" id="eta" name="eta" value="" onkeypress="onlyNumberCheck();" 
                	 			onkeyup="mkDateFormatType(this, event, false,1)" onblur="mkDateFormatType(this, event, true,1)" size="11" style="width: 78px" maxlength="10"/><!-- 
						 --><button type="button" class="calendar ir" name="btn_date" id="btn_date" onclick="doDisplay('DATE1' ,form,form.eta);"></button><!-- 
				 --></td>
				</tr>
				<tr>
					<th></th>
					<td></td>
					<th></th>
					<td></td>
					<th>DEL</th>
					<td>
						<input name="del" type="text" class="L_input" id="del" style="width:50px;ime-mode:disabled;text-transform:uppercase;" dataformat="engup" onBlur="strToUpper(this);codeNameAction('Location_del',this, 'onBlur')" maxlength="5"/><!-- 
						 --><button type="button" name="on_btn_del" id="on_btn_del" class="input_seach_btn" tabindex="-1" onclick="LOCATION_POP(form.del, form.del_nm)"></button><!-- 						
						 --><input name="del_nm" type="text" class="L_input_R" id="del_nm" style="width:150px;" readOnly tabindex="-1"/><!-- 
					 --></td>
				</tr>
			</tbody>
       	</table>
	</div>
