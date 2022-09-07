<%--
=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : SEI_BMD_0021.jsp
*@FileTitle  : 
*@author     : CLT
*@version    : 1.0
*@since      : 2014/08/13
=========================================================
--%>
	<div class= "opus_design_inquiry">
		<table>
			<colgroup>
				<col width="70">
				<col width="150">
				<col width="60">
				<col width="150">
				<col width="75">
				<col width="140">
				<col width="110">
				<col width="200">
				<col width="90">
				<col width="*">
			</colgroup>
			<tbody>
				<tr>
					<th><bean:message key="HBL_No"/></th>
					<td>
                         <input type="text" required  name="bl_no" maxlength="40" value='<bean:write name="hblVO" property="bl_no"/>' onblur="strToUpper(this)" class="search_form" dataformat="excepthan" otherchar = "<%=FWD_OTHER_CHAR%>" style="ime-mode:disabled; text-transform:uppercase;width:119px;"><!-- 
                          --><input type="hidden" name="h_bl_no" id="h_bl_no" value='<bean:write name="hblVO" property="bl_no"/>'>
                    </td>
                    <th><bean:message key="BL_Type"/></th>
					<td>
						<bean:define id="blTypeList" name="valMap" property="blTypeList"/>
						<html:select name="hblVO" property="hbl_tp_cd" styleClass="search_form" style="width:150px;">
							<html:options collection="blTypeList" property="cd_val" labelProperty="cd_nm"/>
						</html:select>
					</td>
					<th><bean:message key="Post_Date"/></th>
                    <td>
                            <input type="text" name="post_dt" value='<wrt:write name="hblVO" property="post_dt" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy"/>' onKeyUp="mkDateFormatType(this, event, false, 1)" onBlur="mkDateFormatType(this, event, true, 1)" size='11' maxlength="10" class="search_form-disable" style="width:115px;" readonly>
                    </td>             
                    <th><bean:message key="AMS_ISF_No"/></th>
                    <td>
                    	<input type="text" name="ams_no" maxlength="20" value="<bean:write name="hblVO" property="ams_no"/>" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:150px;text-transform:uppercase;" onblur="strToUpper(this)"><!-- 
                    	 --><input type="text" name="isf_no" maxlength="20" value='<bean:write name="hblVO" property="isf_no"/>' class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:115px;text-transform:uppercase;" onblur="strToUpper(this)">
                    </td>
                    <td></td>
                    <td></td>      
				</tr>
			<tr>
					<th><a href="javascript:GOTOMBL(frm1.ref_no.value, frm1.rlt_intg_bl_seq.value, 'S', 'I');" style="color:#0000FF"><bean:message key="Ref_No"/></a></th>
					<td>
                          <input required  type="text" name="ref_no" maxlength="20" value="<bean:write name="hblVO" property="ref_no"/>" onblur="strToUpper(this);" onchange="checkRefNo(this);" class="search_form" dataformat="excepthan" otherchar = "<%=FWD_OTHER_CHAR%>" style="ime-mode:disabled; text-transform:uppercase;width:90px;" onKeyDown="fncBlSearch()"><!--
                          --><input type="hidden" name="ref_ofc_cd" value="<bean:write name="hblVO" property="ref_ofc_cd"/>" onblur="strToUpper(this)" class="search_form-disable" style="width:45px;text-transform:uppercase;" readonly><!--
                          --><button type="button" id="brnRef_no" class="input_seach_btn" tabindex="-1" onClick="srOpenPopUp('REF_POPLIST2_BLANK',this)"></button><!--
                          --><input type="hidden" name="rlt_intg_bl_seq" value='<bean:write name="hblVO" property="rlt_intg_bl_seq"/>'>
					<th><bean:message key="MBL_No"/></th>
                    <td>
                       <input type="text" name="mbl_no" maxlength="40" value='<bean:write name="hblVO" property="mbl_no"/>' class="search_form-disable" dataformat="excepthan" style="cursor:hand;ime-mode:disabled; text-transform:uppercase;width:150px;" ondblclick="goToBlPage('view_mbl', this.value)" onblur="strToUpper(this)" readonly>
                    </td>
                    <th id="sub_bl_no_th"><bean:message key="Sub_BL_No"/></th>
					<td>
						 <input name="sub_bl_no" maxlength="20" value='<bean:write name="hblVO" property="sub_bl_no"/>' type="text" class="search_form" onblur="strToUpper(this)" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:115px;">
					</td>
					<th><bean:message key="HSN"/></th>
					<td>
                        <input type="text" name="bl_ser_no" maxlength="20" value="<bean:write name="hblVO" property="bl_ser_no"/>" class="search_form-disable" dataformat="excepthan" style="ime-mode:disabled;width:150px;text-transform:uppercase;" onblur="strToUpper(this)" readonly>
                                   </td>
					<th><bean:message key="Template"/></th>
					<td>
						<input type="text" name="jb_tmplt_nm" value="<bean:write name="hblVO" property="jb_tmplt_nm"/>" class="search_form-disable" style="width:115px;" readonly><!-- 
                        --><button type="button" class="input_seach_btn" tabindex="-1" onClick="openSeiPopUp('WORKFLOW_POPLIST',this)"></button><!--
                        --><html:hidden name="hblVO" property="jb_tmplt_seq"/><label for="sub_mbl_flg"><bean:message key="Sub_MBL"/> </label><input type="checkBox" name="sub_mbl_flg" id="sub_mbl_flg" value="<bean:write name="hblVO" property="sub_mbl_flg"/>" onclick="flgChange(this);">
					</td>
				</tr>
				<tr>
					<th><bean:message key="LC_No"/></th>
					<td>
						<input type="text" name="lc_no" maxlength="40" value='<bean:write name="hblVO" property="lc_no"/>' class="search_form" onblur="strToUpper(this);" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:119px;">
					</td>
					
					<!-- #20969 [BINEX] Ocean Export HBL Customer No filed . Customer No  Export Reference No copy, jsjang 2013.10.7 -->
                    
                     <th><bean:message key="Invoice_No"/></th>
                     <td>
                     	<input type="text" name="inv_no" maxlength="50" value='<bean:write name="hblVO" property="inv_no"/>' class="search_form" onblur="strToUpper(this);" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:150px;">
                     </td>
					 <th><bean:message key="Customer_Ref_No"/></th>
                     <td>
                     	 <input type="text" name="cust_ref_no" maxlength="40"  value='<bean:write name="hblVO" property="cust_ref_no"/>' class="search_form" dataformat="multiLanguage" style="ime-mode:disabled;width:115px;text-transform:uppercase;" onblur="strToUpper(this)">
                     </td>		                     	
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
					 <th id="th_bl_ser" style="visibility:hidden;"><bean:message key="BL_SERIAL_NO"/></th>
                     <td id="td_bl_ser2" style="visibility:hidden;">
                     	 <input type="text" name="hbl_ser_no" required  maxlength="20"  value='<bean:write name="hblVO" property="hbl_ser_no"/>' class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:150px;text-transform:uppercase;" onblur="strToUpper(this);">
                     </td>
                      
				</tr>
			</tbody>
		</table>
			
	</div>
	
	<div class="layout_wrap">
		<!-- layout_vertical_2 a(S) -->
	    <div class="layout_vertical_3 pad_rgt_8">
	    	<div class="sm" style="height:700px;">
	    	<div class="opus_design_inquiry">
	    	<h3 class="title_design"><bean:message key="Customer"/></h3>
		    	<table>
		    		<colgroup>
		    			<col width="70" />
		    			<col width="*" />
		    		</colgroup>
		    		<tbody>
		    			<tr>
							<th><a href="javascript:clearBlPrnr('P01');"><bean:message key="Partner"/></a></th>
							<td>
								<input type="text" name="prnr_trdp_cd" maxlength="20" value='<bean:write name="hblVO" property="prnr_trdp_cd"/>' onKeyDown="codeNameAction('trdpCode_partner',this, 'onKeyDown', 'S', 'I', 'H')" onBlur="strToUpper(this);codeNameAction('trdpCode_partner',this, 'onBlur', 'S', 'I', 'H')" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:50px;"><!-- 
                                --><button type="button" tabindex="-1" name="partner" id="partner" class="partner input_seach_btn" onClick="openSeiPopUp('LINER_POPLIST',this)"></button><!-- 
                                --><input type="text"   name="prnr_trdp_nm" maxlength="50" value='<bean:write name="hblVO" property="prnr_trdp_nm"/>' onblur="strToUpper(this)" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:calc(100% - 83px);" onKeyPress="if(event.keyCode==13){openSeiPopUp('LINER_POPLIST', document.getElementById('partner'), frm1.prnr_trdp_nm.value);}"><!-- 
								--><input type="hidden" name="prnr_trdp_addr" value='<bean:write name="hblVO" property="prnr_trdp_addr"/>'>                                                        
							</td>
				          	
				          </tr>
				          
				          <tr>
				          	<th><a href="javascript:clearBlPrnr('S01');"><bean:message key="Shipper"/></a></th>
							<td>
								<input type="hidden" name="shpr_trdp_cd" value='<bean:write name="hblVO" property="shpr_trdp_cd"/>'  class="search_form" onKeyDown="codeNameAction('trdpCode_shipper',this, 'onKeyDown')" onBlur="strToUpper(this); codeNameAction('trdpCode_shipper',this, 'onBlur')" dataformat="excepthan" style="ime-mode:disabled;width:48px;"><!--
								--><input type="text"   name="shpr_trdp_nm" value='<bean:write name="hblVO" property="shpr_trdp_nm"/>'  onblur="strToUpper(this);checkTrdpCode(this);"  class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:calc(100% - 30px);text-transform:uppercase;" maxlength="50" onKeyPress="if(event.keyCode==13){openSeiPopUp('LINER_POPLIST', document.getElementById('shipper'), frm1.shpr_trdp_nm.value);}"><!--
								--><button type="button" name="shipper" id="shipper" class="input_seach_btn" tabindex="-1" onClick="openSeiPopUp('LINER_POPLIST',this);"></button>
							</td>  				
		    			</tr>
		    			<tr>
		    				<td colspan="2">
								<textarea name="shpr_trdp_addr" class="search_form autoenter_50" dataformat="excepthan" style="width:100%;height:80px;" onblur="strToUpper(this);chkCmpAddr(this, 'Shipper Address');" WRAP="off">
<bean:write name="hblVO" property="shpr_trdp_addr" filter="true"/></textarea>
							</td>
		    			</tr>
		    			
				          <tr>
							<th><a href="javascript:clearBlPrnr('S02');"><bean:message key="Customer"/></a></th>
							<td>
								<input required type="text" id="act_shpr_trdp_cd" name="act_shpr_trdp_cd" required maxlength="20" value="<bean:write name="hblVO" property="act_shpr_trdp_cd"/>" class="search_form" onKeyDown="codeNameAction('trdpCode_ashipper',this, 'onKeyDown', 'S', 'I', 'H')" onBlur="strToUpper(this);codeNameAction('trdpCode_ashipper',this, 'onBlur', 'S', 'I', 'H')" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:50px;"><!--
								--><button type="button" tabindex="-1" name="ashipper" id="ashipper" class="input_seach_btn" tabindex="-1" onClick="openSeiPopUp('LINER_POPLIST',this)"></button><!--
								--><input required type="text" name="act_shpr_trdp_nm"  required value="<bean:write name="hblVO" property="act_shpr_trdp_nm"/>" onblur="strToUpper(this);checkTrdpCode(this);" class="search_form" dataformat="multiLanguage" style="ime-mode:disabled;width:calc(100% - 127px);text-transform:uppercase;" maxlength="50" onKeyPress="if(event.keyCode==13){openSeiPopUp('LINER_POPLIST', document.getElementById('ashipper'), frm1.act_shpr_trdp_nm.value);}"><!--
								--><button type="button" class="btn_etc" name="ashipper" id="ashipper" onClick="openSeiPopUp('PIC_POP', this)" ><bean:message key="PIC"/></button>
							</td>
						</tr>
						<tr>
							<td colspan="2">
								<textarea name="act_shp_info" class="search_form autoenter_50" dataformat="excepthan" style="width:100%;height:40px;" onblur="strToUpper(this);" WRAP="off">
<bean:write name="hblVO" property="act_shp_info" filter="true"/></textarea>
							</td>
						</tr>
				          
		    			<tr>
							<th id="blConObj"><a href="javascript:clearBlPrnr('C01');"><bean:message key="Consignee"/></a></th>
							<td>
								<input type="hidden" name="cnee_trdp_cd"  value='<bean:write name="hblVO" property="cnee_trdp_cd"/>'  onKeyDown="codeNameAction('trdpCode_consignee',this, 'onKeyDown')" onBlur="strToUpper(this);codeNameAction('trdpCode_consignee',this, 'onBlur');" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:48px;"><!--
								--><input type="text"   name="cnee_trdp_nm"  value='<bean:write name="hblVO" property="cnee_trdp_nm"/>'  onblur="strToUpper(this);checkTrdpCode(this);"   class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:calc(100% - 30px);text-transform:uppercase;" maxlength="50" onKeyPress="if(event.keyCode==13){openSeiPopUp('CNEE_POPLIST', document.getElementById('consignee'), frm1.cnee_trdp_nm.value);};"><!--
								--><button type="button" name="consignee" id="consignee" class="input_seach_btn" tabindex="-1" onClick="openSeiPopUp('CNEE_POPLIST',this);"></button>
							</td>
						</tr>
						<tr>
							<td colspan="2">
								<textarea name="cnee_trdp_addr" class="search_form autoenter_50" dataformat="excepthan" style="width:100%;height:80px;" onblur="strToUpper(this);chkCmpAddr(this, 'Consignee Address');" WRAP="off">
<bean:write name="hblVO" property="cnee_trdp_addr" filter="true"/></textarea>
							</td>
						</tr>
						<tr>
							<th><a href="javascript:clearBlPrnr('N01');"><bean:message key="Notify"/></a></th>
							<td>
								<input type="hidden" name="ntfy_trdp_cd"  value='<bean:write name="hblVO" property="ntfy_trdp_cd"/>' class="search_form" onKeyDown="codeNameAction('trdpCode_notify',this, 'onKeyDown')" onBlur="strToUpper(this);codeNameAction('trdpCode_notify',this, 'onBlur')" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:48px;"><!--
								--><input type="text"   name="ntfy_trdp_nm"  value='<bean:write name="hblVO" property="ntfy_trdp_nm"/>' onblur="strToUpper(this);checkTrdpCode(this);" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:calc(100% - 30px);text-transform:uppercase;" maxlength="50" onKeyPress="if(event.keyCode==13){openSeiPopUp('LINER_POPLIST', document.getElementById('notify'), frm1.ntfy_trdp_nm.value);}"><!--
                                --><button type="button" name="notify" id="notify" class="input_seach_btn" tabindex="-1" onClick="openSeiPopUp('LINER_POPLIST',this)"></button>
							</td>
						</tr>
						<tr>
							<td colspan="2">
								<a href="javascript:copyValue('SAC', 'S', 'I', 'H')"><bean:message key="Same_As_Consignee"/></a>&nbsp;
								<a href="javascript:copyValue('CNEE', 'S', 'I', 'H')"><bean:message key="Copy"/></a>
							</td>
						</tr>
						<tr>
							<td colspan="2">
								<textarea name="ntfy_trdp_addr" class="search_form autoenter_50" dataformat="excepthan" style="width:100%;height:80px;" onblur="strToUpper(this);chkCmpAddr(this, 'Notify Address');" WRAP="off">
<bean:write name="hblVO" property="ntfy_trdp_addr" filter="true"/></textarea>
							</td>
						</tr>
						
						<tr>
							<th><a href="javascript:clearBlPrnr('C03');"><bean:message key="Customs_Broker"/></a></th>
                            <td>
                                <input type="text" name="cust_trdp_cd" maxlength="20" value='<bean:write name="hblVO" property="cust_trdp_cd"/>' onKeyDown="codeNameAction('trdpCode_cust',this, 'onKeyDown')" onBlur="strToUpper(this);codeNameAction('trdpCode_cust',this, 'onBlur')" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:50px;"><!-- 
                                 --><button type="button" name="notify" id="cust" class="input_seach_btn" tabindex="-1" onClick="openSeiPopUp('LINER_POPLIST',this)"></button><!--
                                 --><input type="text"   name="cust_trdp_nm" maxlength="50" value='<bean:write name="hblVO" property="cust_trdp_nm"/>' onblur="strToUpper(this);checkTrdpCode(this);" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:calc(100% - 83px);" onKeyPress="if(event.keyCode==13){openSeiPopUp('LINER_POPLIST', document.getElementById('cust'), frm1.cust_trdp_nm.value);}">
                            </td>
						</tr>
						<tr>
							<td colspan="2">
								<textarea name="cust_trdp_addr" class="search_form autoenter_50" dataformat="excepthan" style="width:100%;height:40px;" onblur="strToUpper(this);" WRAP="off">
<bean:write name="hblVO" property="cust_trdp_addr" filter="true"/></textarea>
							</td>
						</tr>
		    		</tbody>
		    	</table>
	    	</div>
	    	<div class="opus_design_inquiry" >
	    	<h3 class="title_design"><bean:message key="Contribution"/></h3>	
		    	<table>
		    		<colgroup>
		    			<col width="137px" />
		    			<col width="90px" />
		    			<col width="100px" />
		    			<col width="*" />
		    		</colgroup>
		    		<tbody>
						<tr>
							<th><bean:message key="Contrib_Office"/></th>
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
		    				<th><bean:message key="Contrib_Dept"/></th>
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
	    </div>
	    <!-- layout_vertical_2 a(E) -->
	    
	    <!-- layout_vertical_2 a(S) -->
	    <div class="layout_vertical_3 pad_rgt_8" style="width:34%;">
	    	<div class="sm" style="height:700px;">
	    	<div class="opus_design_inquiry" >
	    	<h3 class="title_design"><bean:message key="Vessel"/></h3>	
		    	<table>
		    		<colgroup>
		    			<col width="70px" />
		    			<col width="*" />
		    		</colgroup>
		    		<tbody>
		    			<tr>
                            <th><bean:message key="On_Board"/></th>
                            <td>
                                <input name="obrd_dt_tm" id="obrd_dt_tm" value='<wrt:write name="hblVO" property="obrd_dt_tm" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy"/>'   type="text" class="search_form" onKeyUp="mkDateFormatType(this, event, false, 1)" onBlur="mkDateFormatType(this, event, true, 1);dateRangeValid(this, 'Onboard Date');" dataformat="excepthan" style="ime-mode:disabled;width:75px;" maxlength="10"><!-- 
                                 --><button type="button" class="calendar" tabindex="-1" name="obrd_dt_tm_cal" id="obrd_dt_tm_cal"  onclick="doDisplay('DATE1',frm1.obrd_dt_tm);" ></button>
                            </td>
                        </tr>
                        <tr>
                            <th><bean:message key="Pre_VSL_VOY"/></th>
                            <td>
                                <input type="hidden" name="pre_vsl_cd" value='<bean:write name="hblVO" property="pre_vsl_cd"/>' class="search_form" onKeyDown="codeNameAction('srVessel_Pre',this, 'onKeyDown')" onBlur="codeNameAction('srVessel_Pre',this, 'onBlur')" dataformat="excepthan" style="ime-mode:disabled;width:40px;"><!-- 
                                --><input type="text"   name="pre_vsl_nm" maxlength="50" value='<bean:write name="hblVO" property="pre_vsl_nm"/>' onblur="strToUpper(this)" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:115px;text-transform:uppercase;" onKeyPress="if(event.keyCode==13){openSeiPopUp('VESSEL_POPLIST', document.getElementById('prevesel'), frm1.pre_vsl_nm.value);}"><!-- 
                                --><button type="button" name="prevesel" id="prevesel" class="input_seach_btn" tabindex="-1" onClick="openSeiPopUp('VESSEL_POPLIST',this)"></button><span class="dash">/</span><!-- 
                                --><input type="text" name="pre_voy"    value='<bean:write name="hblVO" property="pre_voy"/>' onblur="strToUpper(this)" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:80px;text-transform:uppercase;" maxlength="15">
                            </td>
                        </tr>
                        <tr>
                            <th><bean:message key="VSL_VOY"/></th>
                            <td>
                                <input type="hidden" name="trnk_vsl_cd" value='<bean:write name="hblVO" property="trnk_vsl_cd"/>' class="search_form" onKeyDown="codeNameAction('srVessel',this, 'onKeyDown')" onBlur="codeNameAction('srVessel',this, 'onBlur')" dataformat="excepthan" style="ime-mode:disabled;width:40px;"><!-- 
                                --><input type="text" name="trnk_vsl_nm"   value='<bean:write name="hblVO" property="trnk_vsl_nm"/>' onblur="strToUpper(this)" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:115px;text-transform:uppercase;" maxlength="50" onKeyPress="if(event.keyCode==13){openSeiPopUp('VESSEL_POPLIST', document.getElementById('trunkvessel'), frm1.trnk_vsl_nm.value);}"><!-- 
                                --><button type="button" name="trunkvessel" id="trunkvessel" class="input_seach_btn" tabindex="-1" onClick="openSeiPopUp('VESSEL_POPLIST',this)"></button><span class="dash">/</span><!-- 
                                --><input type="text" name="trnk_voy"      value='<bean:write name="hblVO" property="trnk_voy"/>'   onblur="strToUpper(this)"  class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:80px;text-transform:uppercase;" maxlength="15">
                            </td>
                         </tr>
                         <tr>
                             <th><bean:message key="Lane"/></th>
                             <td>
                             <!-- bean:define id="laneList" name="valMap" property="laneList"/-->
                             <bean:define id="laneList" name="valMap" property="laneCodeList"/> <!-- #3376 [JTC] Japan Trust 용 Profit Report 개발 -->
								<html:select name="hblVO" property="lane_cd" styleClass="search_form" style="width:115px;" onchange="laneCdChange();">
									<option value=""></option>
									<html:options collection="laneList" property="cd_val" labelProperty="cd_nm"/>
								</html:select> 
								<input type="hidden" name="svc_lane_nm" id="svc_lane_nm" value="<bean:write name="hblVO" property="svc_lane_nm"/>">
                             </td>
                         </tr>
                         <tr>
   							<th><bean:message key="Berth_Date"/></th>
							<td>
								<input type="text" name="berth_dt" id="berth_dt" value='<wrt:write name="hblVO" property="berth_dt" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy"/>' onKeyUp="mkDateFormatType(this, event, false, 1)" onBlur="mkDateFormatType(this, event, true, 1);" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:115px;" size='11' maxlength="10"><!-- 
                                   --><button type="button" class="calendar" tabindex="-1" name="berth_dt_cal" id="berth_dt_cal"  onclick="doDisplay('DATE1', frm1.berth_dt);" ></button>
							</td>
						</tr>
		    		</tbody>
		    	</table>
	    	</div>
	    	
	    	<div class="opus_design_inquiry" >
	    	<h3 class="title_design"><bean:message key="Route"/></h3>	
		    	<table>
		    		<colgroup>
		    			<col width="50px" />
		    			<col width="150px" />
		    			<col width="50px" />
		    			<col width="*" />
		    		</colgroup>
		    		<tbody>
						<tr>
							<th><bean:message key="POR"/></th>
							<td>
								<input type="text" name="por_cd" maxlength="5" value='<bean:write name="hblVO" property="por_cd"/>' class="search_form" onKeyDown="codeNameAction('Location_por',this, 'onKeyDown','S')" onBlur="strToUpper(this);codeNameAction('Location_por',this, 'onBlur','S')" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:51px;" ><!-- 
							--><button type="button" name="por" id="por" class="input_seach_btn" tabindex="-1" onClick="openSeiPopUp('LOCATION_POPLIST',this)"></button><!-- 
							--><input type="text" name="por_nm" maxlength="50" value='<bean:write name="hblVO" property="por_nm"/>' class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:103px;text-transform:uppercase;" onblur="strToUpper(this);" onKeyPress="if(event.keyCode==13){openSeiPopUp('LOCATION_POPLIST', document.getElementById('por'), frm1.por_nm.value);}">
							</td>
							<th><bean:message key="ETD"/></th>
							<td>
								<input type="text" name="etd_por_tm" id="etd_por_tm" maxlength="10" value='<wrt:write name="hblVO" property="etd_por_tm" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy"/>' onKeyUp="mkDateFormatType(this, event, false, 1)" onBlur="mkDateFormatType(this, event, true, 1);dateRangeValid(this, 'ETD');" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:70px;" size='10'><!-- 
							--><button type="button" class="calendar" tabindex="-1" name="etd_dt_tm_cal" id="etd_dt_tm_cal"  onclick="doDisplay('DATE1', frm1.etd_por_tm);" ></button>
							</td>
						</tr>
						<tr>
							<th><bean:message key="POL"/></th>
							<td>
								<input required  type="text" name="pol_cd" maxlength="5"  value='<bean:write name="hblVO" property="pol_cd"/>' class="search_form" onKeyDown="codeNameAction('Location_pol',this, 'onKeyDown','S')" onBlur="strToUpper(this);codeNameAction('Location_pol',this, 'onBlur','S')" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:51px;"><!-- 
							--><button type="button" name="pol" id="pol" class="input_seach_btn" tabindex="-1" onClick="openSeiPopUp('LOCATION_POPLIST',this)"></button><!-- 
							--><input required  type="text" name="pol_nm" maxlength="50" value='<bean:write name="hblVO" property="pol_nm"/>' class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:103px;text-transform:uppercase;" onblur="strToUpper(this)" onKeyPress="if(event.keyCode==13){openSeiPopUp('LOCATION_POPLIST', document.getElementById('pol'), frm1.pol_nm.value);}">
							</td>
							<th><bean:message key="ETD"/></th>
							<td>
								<input required  type="text" name="etd_dt_tm" id="etd_dt_tm" maxlength="10" value='<wrt:write name="hblVO" property="etd_dt_tm" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy"/>' onKeyUp="mkDateFormatType(this, event, false, 1)" onBlur="mkDateFormatType(this, event, true, 1);dateRangeValid(this, 'ETD');" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:70px;" size='10'><!-- 
							--><button type="button" class="calendar" tabindex="-1" name="etd_dt_tm_cal" id="etd_dt_tm_cal"  onclick="doDisplay('DATE1', frm1.etd_dt_tm);" ></button>
							</td>
						</tr>
						<tr>
							<th><bean:message key="POD"/></th>
							<td>
								<input required  type="text" name="pod_cd" maxlength="5" value='<bean:write name="hblVO" property="pod_cd"/>' class="search_form" onKeyDown="codeNameAction('Location_pod',this, 'onKeyDown','S')" onBlur="strToUpper(this);codeNameAction('Location_pod',this, 'onBlur','S')" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:51px;"><!-- 
							--><button type="button" name="pod" id="pod" class="input_seach_btn" tabindex="-1" onClick="openSeiPopUp('LOCATION_POPLIST',this)"></button><!-- 
							--><input required  type="text" name="pod_nm" maxlength="50"  value='<bean:write name="hblVO" property="pod_nm"/>' class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:103px;text-transform:uppercase;" onblur="strToUpper(this);" onKeyPress="if(event.keyCode==13){openSeiPopUp('LOCATION_POPLIST', document.getElementById('pod'), frm1.pod_nm.value);}">
							</td>
							<th><bean:message key="ETA"/></th>
							<td>
								<input required  type="text" name="eta_dt_tm" id="eta_dt_tm" maxlength="10" value='<wrt:write name="hblVO" property="eta_dt_tm" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy"/>' onKeyUp="mkDateFormatType(this, event, false, 1)" onBlur="mkDateFormatType(this, event, true, 1);dateRangeValid(this, 'ETA');" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:70px;" size='10'><!-- 
							--><button type="button" class="calendar" tabindex="-1" name="eta_dt_tm_cal" id="eta_dt_tm_cal"  onclick="doDisplay('DATE1', frm1.eta_dt_tm);" ></button>
							</td>
						</tr>
						<tr>
							<th><bean:message key="DEL"/></th>
							<td>
								<input type="text" name="del_cd" maxlength="5" value='<bean:write name="hblVO" property="del_cd"/>' class="search_form" onKeyDown="codeNameAction('Location_del',this, 'onKeyDown','S')" onBlur="strToUpper(this);codeNameAction('Location_del',this, 'onBlur','S')" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:51px;"><!-- 
							--><button type="button" name="del" id="del" class="input_seach_btn" tabindex="-1" onClick="openSeiPopUp('LOCATION_POPLIST',this)"></button><!-- 
							--><input type="text" name="del_nm" maxlength="50" value='<bean:write name="hblVO" property="del_nm"/>' class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:103px;text-transform:uppercase;" onblur="strToUpper(this)" onKeyPress="if(event.keyCode==13){openSeiPopUp('LOCATION_POPLIST', document.getElementById('del'), frm1.del_nm.value);}">
							</td>
							<th><bean:message key="ETA"/></th>
							<td>
								<input type="text" name="d_eta_dt_tm" id="d_eta_dt_tm" value='<wrt:write name="hblVO" property="d_eta_dt_tm" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy"/>' onKeyUp="mkDateFormatType(this, event, false, 1)" onBlur="mkDateFormatType(this, event, true, 1);dateRangeValid(this, 'ETA');" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:70px;" size='10' maxlength="10"><!-- 
							--><button type="button" class="calendar" tabindex="-1" name="d_eta_dt_tm_cal" id="d_eta_dt_tm_cal"  onclick="doDisplay('DATE1', frm1.d_eta_dt_tm);" ></button>
							</td>
						</tr>
						<tr>
							<th><bean:message key="F_Dest_short"/></th>
							<td>
								<input type="text" name="fnl_dest_loc_cd" maxlength="5" value='<bean:write name="hblVO" property="fnl_dest_loc_cd"/>' class="search_form" onKeyDown="codeNameAction('Location_dest',this, 'onKeyDown','S')" onBlur="strToUpper(this);codeNameAction('Location_dest',this, 'onBlur','S')" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:51px;"><!-- 
							--><button type="button" name="dest" id="dest" class="input_seach_btn" tabindex="-1" onClick="openSeiPopUp('LOCATION_POPLIST',this)"></button><!-- 
							--><input type="text" name="fnl_dest_loc_nm" maxlength="50" value='<bean:write name="hblVO" property="fnl_dest_loc_nm"/>' class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:103px;text-transform:uppercase;" onblur="strToUpper(this)" onKeyPress="if(event.keyCode==13){openSeiPopUp('LOCATION_POPLIST', document.getElementById('dest'), frm1.fnl_dest_loc_nm.value);}">
							</td>
							<th><bean:message key="ETA"/></th>
							<td>
								<input type="text" name="f_eta_dt_tm" id="f_eta_dt_tm" value='<wrt:write name="hblVO" property="f_eta_dt_tm" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy"/>' onKeyUp="mkDateFormatType(this, event, false, 1)" onBlur="mkDateFormatType(this, event, true, 1);dateRangeValid(this, 'ETA');" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:70px;" size='10' maxlength="10"><!-- 
							--><button type="button" class="calendar" tabindex="-1" name="f_eta_dt_tm_cal" id="f_eta_dt_tm_cal"  onclick="doDisplay('DATE1', frm1.f_eta_dt_tm);" ></button>
							</td>
							
						</tr>
                        <tr>
                            <th><bean:message key="Liner"/></th>
                            <td colspan="3">
                                <input type="text"   name="lnr_trdp_cd"  required maxlength="20" value='<bean:write name="hblVO" property="lnr_trdp_cd"/>' onKeyDown="codeNameAction('trdpCode_liner',this, 'onKeyDown')" onBlur="strToUpper(this);codeNameAction('trdpCode_liner',this, 'onBlur')" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:51px;"><!-- 
							--><button type="button" name="liner" id="liner" class="input_seach_btn" tabindex="-1" onClick="openSeiPopUp('LINER_POPLIST',this)"></button><!-- 
							--><input type="text"   name="lnr_trdp_nm"  required maxlength="60" value='<bean:write name="hblVO" property="lnr_trdp_nm"/>' onblur="strToUpper(this)" class="search_form" dataformat="excepthan" style="width:260px;text-transform:uppercase;" onKeyPress="if(event.keyCode==13){openSeiPopUp('LINER_POPLIST', document.getElementById('liner'), frm1.lnr_trdp_nm.value);}">
                            </td>
                        </tr>
		    		</tbody>
		    	</table>
		    </div>
		    
		    <div class="opus_design_inquiry" >
		    	<table>
		    		<colgroup>
		    			<col width="137px" />
		    			<col width="98px" />
		    			<col width="47px" />
		    			<col width="*" />
		    		</colgroup>
		    		<tbody>
						<tr>
							<th><a href="javascript:clearBlPrnr('A01');"><bean:message key="Forwarding_Agent"/></a></th>
							<td colspan="3">
                                <input type="text" name="agent_trdp_cd" maxlength="20" value='<bean:write name="hblVO" property="agent_trdp_cd"/>' onKeyDown="if(this.readOnly==true){return};codeNameAction('trdpCode_agent',this, 'onKeyDown')" onBlur="strToUpper(this);codeNameAction('trdpCode_agent',this, 'onBlur')" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:70px;"><!-- 
							--><button type="button" name="agent" id="agent" class="input_seach_btn" tabindex="-1" onClick="if(frm1.agent_trdp_cd.readOnly==true){return};openSeiPopUp('LINER_POPLIST',this)"></button><!-- 
							--><input type="text"   name="agent_trdp_nm" maxlength="50" value='<bean:write name="hblVO" property="agent_trdp_nm"/>' onblur="strToUpper(this)" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:149px;" onKeyPress="if(this.readOnly==true){return};if(event.keyCode==13){openSeiPopUp('LINER_POPLIST', document.getElementById('agent'), frm1.agent_trdp_nm.value);}"><!-- 
							--><input type="hidden" name="agent_trdp_addr" value='<bean:write name="hblVO" property="agent_trdp_addr"/>'>                                                        
							</td>
						</tr>
						<tr>
							<th><bean:message key="Door_Delivery_Location"/></th>
							<td colspan="3">
							<!--  OFVFOUR-7736 [SENKO USA] Consignee and Delivery Location -->
								<input type="text" name="door_loc_cd" maxlength="20" value='<bean:write name="hblVO" property="door_loc_cd"/>' class="search_form" onKeyDown="codeNameAction('trdpCode_door',this, 'onKeyDown', 'S', 'I', 'H')" onBlur="strToUpper(this);codeNameAction('trdpCode_door',this, 'onBlur', 'S', 'I', 'H')" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:70px;"><!-- 
							--><button type="button" name="door" id="door" class="input_seach_btn" tabindex="-1" onClick="openSeiPopUp('LINER_POPLIST',this)"></button><!-- 
							--><input type="text" name="door_loc_nm" maxlength="50" value='<bean:write name="hblVO" property="door_loc_nm"/>' class="search_form" dataformat="multiLanguage" style="ime-mode:disabled;width:149px;text-transform:uppercase;" onblur="strToUpper(this)" onKeyPress="if(event.keyCode==13){openSeiPopUp('LINER_POPLIST', document.getElementById('door'), frm1.door_loc_nm.value);}">
							</td>
						</tr>
						<!--  OFVFOUR-7736 [SENKO USA] Consignee and Delivery Location -->
						<span class="clear"></span>
						<tr>
							<th></th>
							<td  colspan="3">
								<textarea readonly name="lgl_addr" id="lgl_addr" dataformat="excepthan" style="width: 252px;  height:40px; display:none;" ><bean:write name="hblVO" property="lgl_addr" filter="true"/></textarea>
							</td>
						</tr>
						<span class="clear"></span>
						<tr>
							<th><bean:message key="CY_CFS_Location"/></th>
							<td colspan="3">
								<input type="text"   name="cfs_trdp_cd" maxlength="20" value='<bean:write name="hblVO" property="cfs_trdp_cd"/>' onKeyDown="codeNameAction('trdpCode_cfs',this, 'onKeyDown')" onBlur="strToUpper(this);codeNameAction('trdpCode_cfs',this, 'onBlur')" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:70px;"><!-- 
							--><button type="button" name="cfs" id="cfs" class="input_seach_btn" tabindex="-1" onClick="openSeiPopUp('LINER_POPLIST',this)"></button><!-- 
							--><input type="text"   name="cfs_trdp_nm" maxlength="50" value='<bean:write name="hblVO" property="cfs_trdp_nm"/>' onblur="strToUpper(this)" class="search_form" dataformat="multiLanguage" style="ime-mode:disabled; text-transform:uppercase;width:149px;" onKeyPress="if(event.keyCode==13){openSeiPopUp('LINER_POPLIST', document.getElementById('cfs'), frm1.cfs_trdp_nm.value);}">
							</td>
						 </tr>
                         <tr>
								<th><bean:message key="Available"/></th>
								<td>
									<input type="text" name="avail_dt_tm" id="avail_dt_tm" value='<wrt:write name="hblVO" property="avail_dt_tm" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy"/>' onKeyUp="mkDateFormatType(this, event, false, 1)" onBlur="mkDateFormatType(this, event, true, 1)" size='11' maxlength="10" class="search_form" style="width:70px;"><!-- 
									--><button type="button" class="calendar" tabindex="-1" name="avail_dt_tm_cal" id="avail_dt_tm_cal"  onclick="doDisplay('DATE1', frm1.avail_dt_tm);" ></button>
								</td>
		                        <th><bean:message key="LFD"/></th>
		                        <td>
		                            <input type="text" name="lfd_dt_tm" id="lfd_dt_tm" value='<wrt:write name="hblVO" property="lfd_dt_tm" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy"/>' onKeyUp="mkDateFormatType(this, event, false, 1)" onBlur="mkDateFormatType(this, event, true, 1);dateRangeValid(this, 'LFD');" size='11' maxlength="10" class="search_form" style="width:70px;"><!-- 
								--><button type="button" class="calendar" tabindex="-1" name="lfd_dt_tm_cal" id="lfd_dt_tm_cal"  onclick="doDisplay('DATE1', frm1.lfd_dt_tm);" ></button>
								</td>
                          </tr>
                        <tr id="CFS_FIELD" style="display: none;">
                            <th><bean:message key="Customs_Release"/></th>
                            <td>
                                <input type="text" name="csms_rlse_dt" id="csms_rlse_dt" value='<wrt:write name="hblVO" property="csms_rlse_dt" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy"/>' onKeyUp="mkDateFormatType(this, event, false, 1)" onBlur="mkDateFormatType(this, event, true, 1)" size='11' maxlength="10" class="search_form" style="width:70px;"><!--
									--><button type="button" class="calendar" tabindex="-1" name="csms_rlse_dt_cal" id="csms_rlse_dt_cal"  onclick="doDisplay('DATE1', frm1.csms_rlse_dt);" ></button>
                            </td>
                            <th><bean:message key="CFS_PU"/></th>
                            <td>
                                <input type="text" name="pkup_dt" id="pkup_dt" value='<wrt:write name="hblVO" property="pkup_dt" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy"/>' onKeyUp="mkDateFormatType(this, event, false, 1)" onBlur="mkDateFormatType(this, event, true, 1);dateRangeValid(this, 'LFD');" size='11' maxlength="10" class="search_form" style="width:70px;"><!--
								--><button type="button" class="calendar" tabindex="-1" name="pkup_dt_cal" id="pkup_dt_cal"  onclick="doDisplay('DATE1', frm1.pkup_dt);" ></button>
                            </td>
                        </tr>
                        <tr id="CFS_FIELD" style="display: none;">
                            <th><bean:message key="Entry_No"/></th>
                            <td colspan="3">
                                <input type="text"  name="entr_no" maxlength="20" value='<bean:write name="hblVO" property="entr_no"/>' onBlur="strToUpper(this);" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:252px;">
                            </td>
                        </tr>
                          <tr>
                             	<th><bean:message key="GO_Date"/></th>
                                <td>
	                            	<input type="text" name="go_dt_tm" id="go_dt_tm" value='<wrt:write name="hblVO" property="go_dt_tm" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy"/>' onKeyUp="mkDateFormatType(this, event, false, 1)" onBlur="mkDateFormatType(this, event, true, 1);dateRangeValid(this, 'G.O Date');" size='11' maxlength="10" class="search_form" style="width:70px;"><!-- 
								--><button type="button" class="calendar" tabindex="-1" name="go_dt_tm_cal" id="go_dt_tm_cal"  onclick="doDisplay('DATE1', frm1.go_dt_tm);" ></button>
                       			 </td>
                       			<!--  <td colspan="2">(<bean:message key="Last_Free_Date"/>)</td> HanhLe Modification-->
                       			 <td colspan="2"></td>
                        		
                        </tr>
                        <tr>
                                <th><bean:message key="Country_of_Origin"/></th>
				                <td colspan="3">
				                	<input name="cnt_cd" type="text" maxlength="2" class="search_form" dataformat="excepthan" style="width:70px;text-transform:uppercase;ime-mode:disabled;" onKeyDown="codeNameAction('country',this, 'onKeyDown')" onBlur="strToUpper(this);codeNameAction('country',this, 'onBlur')" value="<bean:write name="hblVO" property="cnt_cd"/>"><!-- 
								--><button type="button" name="country" id="country" class="input_seach_btn" tabindex="-1" onClick="doWork('COUNTRY_POPLIST', 'I')"></button><!-- 
								--><input name="cnt_nm" type="text" maxlength="50" class="search_form-disable" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:149px;text-align:left" onblur="strToUpper(this)" value="<bean:write name="hblVO" property="cnt_nm"/>" onchange="" readOnly>
				                </td>
						</tr>
						<tr>
							<th><bean:message key="Trucker"/></th>
							<td colspan="3">
                                <input type="text" name="trk_trdp_cd" maxlength="20" value='<bean:write name="hblVO" property="trk_trdp_cd"/>' onKeyDown="codeNameAction('trdpCode_trk',this, 'onKeyDown')" onBlur="strToUpper(this);codeNameAction('trdpCode_trk',this, 'onBlur')" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:70px;"><!-- 
								--><button type="button" name="trk" id="trk" class="input_seach_btn" tabindex="-1" onClick="openSeiPopUp('LINER_POPLIST',this)"></button><!-- 
								--><input type="text"   name="trk_trdp_nm" maxlength="50" value='<bean:write name="hblVO" property="trk_trdp_nm"/>' onblur="strToUpper(this)" class="search_form" dataformat="multiLanguage" style="ime-mode:disabled; text-transform:uppercase;width:149px;" onKeyPress="if(event.keyCode==13){openSeiPopUp('LINER_POPLIST', document.getElementById('trk'), frm1.trk_trdp_nm.value);}"><!-- 
								--><input type="hidden" name="trk_trdp_addr" value='<bean:write name="hblVO" property="trk_trdp_addr"/>'>                                                        
							</td>
			            </tr>
			            
			            <tr style="display:none">
                              <th><bean:message key="Warehouse_Korea_Only"/></th>
                              <td colspan="3">
                                  <input type="hidden" name="cfs_nod_cd" value='<bean:write name="hblVO" property="cfs_nod_cd"/>' class="search_form" onKeyDown="codeNameAction('Nodecode_cfs',this, 'onKeyDown')" onBlur="strToUpper(this);codeNameAction('Nodecode_cfs',this, 'onBlur')" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:58;"><!-- 
								--><input type="text" name="cfs_loc_nm" value='<bean:write name="hblVO" property="cfs_loc_nm"/>' class="search_form-disable" onblur="strToUpper(this)" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:223px;" readonly><!-- 
								--><button type="button" name="cfs" id="cfs" class="input_seach_btn" tabindex="-1" onClick="getWhCd('S')"></button>
                                  <html:hidden name="hblVO" property="cfs_loc_cd"/>
                              </td>
                       </tr>
                       <tr style="display:none">
                               <th><bean:message key="Clearance_Korea_Only"/></th>
                               <td colspan="3">
								<bean:define id="clrList" name="valMap" property="CLRTPCD"/>
                                <html:select name="hblVO" property="csts_clr_tp" styleClass="search_form"  style="width:252px;">
									<option value=""></option>
                                    <html:options collection="clrList" property="cd_val" labelProperty="cd_nm"/>
                                </html:select>
                                              </td>
                       </tr>
	    			</tbody>
	    		</table>
	    	</div>
	    	</div>
	    </div>
	    <!-- layout_vertical_2 a(E) -->
	    
	    <!-- layout_vertical_2 a(S) -->
	    <div class="layout_vertical_3">
	    	<div class="sm" style="height:700px;">
	    	<div class="opus_design_inquiry" >
	    	<h3 class="title_design"><bean:message key="Shippment_and_Item"/></h3>
		    	<table>
		    		<colgroup>
		    			<col width="100px" />
		    			<col width="100px" />
		    			<col width="95px" />
		    			<col width="*" />
		    		</colgroup>
		    		<tbody>
		    			<tr>
							<th><bean:message key="Ship_Mode"/></th>
							<td>
								<bean:define id="shipModeList" name="valMap" property="shipModeList"/>
								<html:select  name="hblVO" property="shp_mod_cd" styleClass="input1" style="width:85px; " onchange="shipModeChange();shipModeChangeDef(this);">
									<html:options  collection="shipModeList" property="cd_val" labelProperty="cd_nm"/>
								</html:select>
							</td>
							<th><bean:message key="Incoterms"/></th>
							<td>
								<bean:define id="incotermsList" name="valMap" property="incotermsList"/>
                                <html:select name="hblVO" property="inco_cd" styleClass="search_form" style="width:75px;">
                                	<option value=""></option>
                                    <html:options collection="incotermsList" property="cd_val" labelProperty="cd_nm"/>
                                </html:select>
							</td>
						</tr>
						<tr>
							<th><bean:message key="Commodity"/></th>
							<td colspan="3">
								<input type="text" name="rep_cmdt_cd" maxlength="12" value="<bean:write name="hblVO" property="rep_cmdt_cd"/>" class="search_form" onKeyDown="codeNameAction('commodity',this, 'onKeyDown')" onBlur="strToUpper(this);codeNameAction('commodity',this, 'onBlur')" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:85px;"><!-- 
								--><button type="button" name="commodity" id="commodity" class="input_seach_btn" tabindex="-1" onClick="openSeiPopUp('COMMODITY_POPLIST',this)"></button><!-- 
								--><input type="text" name="rep_cmdt_nm" value="<bean:write name="hblVO" property="rep_cmdt_nm"/>" maxlength="100" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:153px;" onBlur="strToUpper(this);" onchange="textAdd(frm1.desc_txt, '', this.value, frm1.h_rep_cmdt_nm);" onKeyPress="if(event.keyCode==13){openSeiPopUp('COMMODITY_POPLIST', this);}">
								<input type="hidden" name="h_rep_cmdt_nm" value="<bean:write name="hblVO" property="rep_cmdt_nm"/>" maxlength="200" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:150px;">
							</td>
						</tr>
                        <tr>
                            <th><bean:message key="Package"/></th>
                            <td colspan="3">
                                <input type="text" name="pck_qty" value="<bean:write name="hblVO" property="pck_qty"/>" onkeyPress="onlyNumberCheck();" 
                                onkeyup="numberCommaLen(this,7,0)" onblur="setPacQty();" maxlength="7"  
                                onchange="textAddPck(frm1.desc_txt,this.value, frm1.pck_qty_container);" class="search_form zero_remove" 
                                dataformat="excepthan" style="ime-mode:disabled;width:85px;text-align:right"><!-- 
								
								--><bean:define id="pckList" name="valMap" property="pckCdList"/><!-- 
								--><html:select name="hblVO" property="pck_ut_cd" styleClass="search_form" style="width:182px;" 
								onchange="setPacQty();textAddPck(frm1.desc_txt
															,$('select[name=pck_ut_cd] option:selected').text()
															,frm1.pck_ut_cd_container);">
                                    <option></option>
                                    <html:options collection="pckList" property="pck_ut_cd" labelProperty="pck_nm"/>
                                </html:select> 
                            </td>
							<!-- #3810 [JAPT] OIH Description - package auto shownig. -->
							<div>
                            	<input type="hidden" name = "pck_qty_container" value="<bean:write name="hblVO" property="pck_qty"/>">
								<input type="hidden" name = "pck_ut_cd_container"> 
							</div>                                 
                        </tr>
                       	<tr>
							<th><bean:message key="GWeight"/></th>
							<td colspan="3">
								<input type="text" name="grs_wgt" value="<bean:write name="hblVO" property="grs_wgt"/>" onkeyPress="onlyNumberCheck('.');" onchange="numberCommaLen(this,8,obl_decimal_len);chkComma(this,8,obl_decimal_len);weightChange(this);" maxlength="13" class="search_form zero_remove" dataformat="excepthan" style="ime-mode:disabled;width:85px;text-align:right;"><!-- 
								--><input type="text" name="grs_wgt_ut_cd" value="KG" style="width:50px;border:0;background-color:transparent;" readOnly tabindex="1"><!-- 
								--><input type="text" name="grs_wgt1" value="<bean:write name="hblVO" property="grs_wgt1"/>" onkeyPress="onlyNumberCheck('.');" onchange="numberCommaLen(this,8,obl_decimal_len);chkComma(this,8,obl_decimal_len);weightChange(this);" maxlength="13" class="search_form zero_remove" dataformat="excepthan" style="ime-mode:disabled;width:85px;text-align:right;"><!-- 
								--><input type="text" name="grs_wgt_ut_cd1" value="LB" style="width:30px;border:0;background-color:transparent;" readOnly tabindex="2">
							</td>
						</tr>
						<tr>
							<th><bean:message key="Measurement"/></th>
							<td colspan="3">
								<input type="text" name="meas" value="<bean:write name="hblVO" property="meas"/>" onkeyPress="onlyNumberCheck('.');" onchange="numberCommaLen(this,8,obl_decimal_len);chkComma(this,8,obl_decimal_len);cbmChange(this);" maxlength="13" class="search_form zero_remove" dataformat="excepthan" style="ime-mode:disabled;width:85px;text-align:right;"><!--  
								--><input type="text" name="meas_ut_cd" value="CBM" style="width:50px;border:0;background-color:transparent;" readOnly tabindex="5"><!-- 
								--><input type="text" name="meas1" value="<bean:write name="hblVO" property="meas1"/>" onkeyPress="onlyNumberCheck('.');" onchange="numberCommaLen(this,8,obl_decimal_len);chkComma(this,8,obl_decimal_len);cbmChange(this);" maxlength="13" class="search_form zero_remove" dataformat="excepthan" style="ime-mode:disabled;width:85px;text-align:right;"><!--  
								--><input type="text" name="meas_ut_cd1" value="CFT" style="width:30px;border:0;background-color:transparent;" readOnly tabindex="6">
							</td>
						</tr>
					</tbody>
		    	</table>
		    </div>
		    
		    
		    <div class="opus_design_grid" style="max-width:500px">
	    		<input type="hidden" name="size_ut_cd1" id="size_ut_cd1" value='<bean:write name="hblVO" property="size_ut_cd"/>'/>
				<span align="left" valign="top"><input type="radio" name="size_ut_cd" id="size_ut_cd_cm" value="CM" onClick="javascript:chkSizeType();"><label for="size_ut_cd_cm"><bean:message key="Cm"/></label>
			   	<input type="radio" name="size_ut_cd" id="size_ut_cd_in" value="INCH" onClick="javascript:chkSizeType();" checked><label for="size_ut_cd_in"><bean:message key="Inch"/></label></span>
				<div class="opus_design_btn">
					   <button type="button" tabindex="-1" class="btn_accent" onClick="setSizeUp(docObjects[11], 150)"><bean:message key="Plus"/></button><!-- 
					--><button type="button" tabindex="-1" class="btn_normal" onClick="setSizeDown(docObjects[11], 130)"><bean:message key="Minus"/></button><!-- 
					--><button type="button" tabindex="-1" class="btn_normal" onClick="whRcptOpenPopUp2('SI')"><bean:message key="W/H"/></button><!-- 
					--><button type="button" tabindex="-1" class="btn_normal" onClick="doWork('CAL_CBM_NEW')"><bean:message key="Add"/></button>	
				</div>
				<!-- OFVFOUR-7654[PQC][OIH B/L Entry] The system is broken when opening UI -->
				<span class = "clear"></span>  
				<script type="text/javascript">comSheetObject('sheet13', '-1');
				/* 속도개선  */
				comConfigSheet(docObjects[11], SYSTEM_FIS);
				initSheet(docObjects[11], (11+1) );
				comEndConfigSheet(docObjects[11]);
				</script>
				<input type="hidden" name="wh_recp_no" value="<bean:write name="hblVO" property="wh_recp_no"/>">
			</div>
		    
		    <div class="opus_design_inquiry" >
		    	<table>
		    		<colgroup>
		    			<col width="137px" />
		    			<col width="90px" />
		    			<col width="100px" />
		    			<col width="*" />
		    		</colgroup>
		    		<tbody>
                        <tr>
	                        	<th><bean:message key="Tariff_Currency_Code"/></th>
	                            <td>
	                                <bean:define id="currCdList" name="valMap" property="currCdList"/>
	                                <html:select name="hblVO" property="curr_cd" styleClass="search_form" style="width:85px;">
	                                    <html:options collection="currCdList" property="cd_val" labelProperty="cd_nm"/>
	                                </html:select>
	                                <input type="hidden" name="h_curr_cd" value="<bean:write name="hblVO" property="curr_cd"/>">
	                            </td>
	                            <th><bean:message key="Freight"/></th>
	                            <td>
	                                <bean:define id="frtList" name="valMap" property="frtCdList"/>
	                                <html:select name="hblVO" property="frt_term_cd" styleClass="search_form" style="width:90px;">
	                                    <html:options collection="frtList" property="cd_val" labelProperty="cd_nm"/>
	                                </html:select> 
	                            </td>
                        </tr>
                        <tr>
	                            <th><bean:message key="SVC_Term"/></th>
	                            <td>
	                                <bean:define id="serviceList" name="valMap" property="serviceList"/>
	                                <html:select name="hblVO" property="fm_svc_term_cd" styleClass="search_form" style = "width:85px;" onchange="svcTermChange();">
	                                    <html:options collection="serviceList" property="cd_val" labelProperty="cd_nm"/>
	                                </html:select>
	                            </td>
	                            <td> ~ </td>
	                            <td>   
	                                <html:select name="hblVO" property="to_svc_term_cd" styleClass="search_form" style = "width:90px;">
	                                    <html:options collection="serviceList" property="cd_val" labelProperty="cd_nm"/>
	                                </html:select> 
	                            </td>
                        </tr>
                        <tr>
		                            <th><bean:message key="Sales_Type"/></th>
		                            <td>
		                                <bean:define id="slsList" name="valMap" property="slsCdList"/>
		                                <!-- #1174 [BNX] Sales PIC based on Sales type does not simultaneously update -->
										<!-- OFVFOUR-7976: [MATRIX] ADDING CS PIC ON ALL B/L ENTRY AND TRADE PARTNER ENTRY SCREEN -->
		                                <html:select name="hblVO" property="nomi_flg" styleClass="input1"  style="width:85px;" onchange="changeSalesType();changeCSType();">
		                                    <html:options collection="slsList" property="cd_val" labelProperty="cd_nm"/>
		                                </html:select>
		                            </td>
		                            <th><bean:message key="Ship_Type"/></th>
									<td>
		                                        <bean:define id="shpList" name="valMap" property="shpCdList"/>
		                                        <html:select name="hblVO" property="shp_tp_cd" styleClass="search_form" style="width:90px;">
		                                            <html:options collection="shpList" property="cd_val" labelProperty="cd_nm"/>
		                                        </html:select> 
									</td>
                         </tr>
                         <tr>
                                    <th><bean:message key="Profit_Share"/></th>
                                    <td>
                                        <input type="text" name="profit_share" maxlength="5" value="<bean:write name="hblVO" property="profit_share"/>" class="search_form zero_remove" onKeyPress="ComKeyOnlyNumber(this)" style="width:85px;text-align:right;"><!--
                                        --><input type="hidden" name="h_profit_share" value="<bean:write name="hblVO" property="profit_share"/>"><!-- 
                                        --><input type="text" value="%" class="search_form" style="width:15px;border:0;background-color:transparent;" tabindex="1">
                                    </td>
                                    <!-- #1619 [CLT] Original B/L Type-  -->
		                             <th><bean:message key="OBL_Type"/></th>
		                             <td>
			                             <bean:define id="oblCdList" name="valMap" property="oblCdList"/>
			                             <html:select name="hblVO" property="obl_tp_cd" styleClass="search_form" style="width:90px;">
			                             <html:options collection="oblCdList" property="cd_val" labelProperty="cd_nm"/>
			                             </html:select> 
			                             <input type="hidden" name="h_obl_tp_cd" value="<bean:write name="hblVO" property="obl_tp_cd"/>">
		                             </td>   
                                    <!--                                              
                                    <th><bean:message key="Express_BL"/></th>
									<td>
										<bean:define id="yesNoCdList" name="valMap" property="yesNoCdList"/>
										<html:select name="hblVO" property="express_tp_cd" styleClass="search_form" style="width:90px;">
											<html:options collection="yesNoCdList" property="cd_val" labelProperty="cd_nm"/>
										</html:select>
									</td>-->
                           </tr>
                           <tr>
                                    <th><bean:message key="Cargo_Type"/></th>
									<td>
										<bean:define id="cargoTpCdList" name="valMap" property="cargoTpCdList"/>
										<html:select name="hblVO" property="cargo_tp_cd" styleClass="search_form" style="width:85px;">
											<html:options collection="cargoTpCdList" property="cd_val" labelProperty="cd_nm"/>
										</html:select>
									</td>
									<th><bean:message key="Service_Scope"/></th>
									<td>
										<bean:define id="svcScopeList" name="valMap" property="svcScopeList"/>
										<html:select name="hblVO" property="svc_scope" styleClass="search_form" style="width:90px;">
											<option value=""></option>
											<html:options collection="svcScopeList" property="cd_val" labelProperty="cd_nm"/>
										</html:select>
									</td>
                          </tr>
                          <tr>
									<td colspan="2"><label for="org_bl_rcvd_flg"  style="font-weight: bold"><bean:message key="Original_BL_Received"/></label><input type="checkBox" name="org_bl_rcvd_flg" id="org_bl_rcvd_flg" value="<bean:write name="hblVO" property="org_bl_rcvd_flg"/>" onclick="flgChange(this);setToday(this);"></td>
									<th><bean:message key="Received_Date"/></th>
                                    <td><input type="text" name="rcvd_dt_tm" id="rcvd_dt_tm" value="<wrt:write name="hblVO" property="rcvd_dt_tm" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy"/>" class="search_form" onKeyUp="mkDateFormatType(this, event, false, 1)" onBlur="mkDateFormatType(this, event, true, 1);dateRangeValid(this, 'Received Date');" dataformat="excepthan" style="ime-mode:disabled;width:75px;" size='11' maxlength="10"><!-- 
                                        --><button type="button" class="calendar" tabindex="-1" name="rcvd_dt_tm_cal" id="rcvd_dt_tm_cal"  onclick="doDisplay('DATE1' ,frm1.rcvd_dt_tm);" ></button></td>
                          </tr>
                          <tr>
                                    <td colspan="2"><label for="ror_flg" style="font-weight: bold"><bean:message key="ROR"/></label><input type="checkBox" name="ror_flg" id="ror_flg" value="<bean:write name="hblVO" property="ror_flg"/>" onclick="flgChange(this);">
                                    &nbsp;&nbsp;&nbsp;&nbsp;<label for="rlsd_flg" style="font-weight: bold"><bean:message key="Released"/></label><input type="checkBox" name="rlsd_flg" id="rlsd_flg" value="<bean:write name="hblVO" property="rlsd_flg"/>" onclick="flgChange(this);setToday(this);"></td>
									<th><bean:message key="Released_Date"/></th>
                                    <td><input type="text" name="rlsd_dt_tm" id="rlsd_dt_tm" value="<wrt:write name="hblVO" property="rlsd_dt_tm" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy"/>" class="search_form" onKeyUp="mkDateFormatType(this, event, false, 1)" onBlur="mkDateFormatType(this, event, true, 1);dateRangeValid(this, 'Released Date');" dataformat="excepthan" style="ime-mode:disabled;width:75px;" size='11' maxlength="10"><!-- 
                                    --><button type="button" class="calendar" tabindex="-1" name="rlsd_dt_tm_cal" id="rlsd_dt_tm_cal"  onclick="doDisplay('DATE1' ,frm1.rlsd_dt_tm);" ></button>
                           			 </td>
                        </tr>
                        <tr>
                        		<!-- #657 [OCEAN BLUE, IMPEX] B/L SELECTION FLAG TO SHOW ON VISIBILITY PORTAL -->
                        		<th ><!-- 
                        		 --><label for="inter_use_flag" style="font-weight: bold"><bean:message key="Internal"/></label><!--
                                 --></th>
                                 <td><input type="checkBox" name="inter_use_flag" id="inter_use_flag" value="<bean:write name="hblVO" property="inter_use_flag"/>" onclick="flgChange(this);"></td>
	                            <th><bean:message key="Released_by"/></th>
	                            <td>
	                                <input type="text"   name="rlsd_usrid"  value="<bean:write name="hblVO" property="rlsd_usrid"/>"  class="search_form-disable" style="width:75px;"><!-- 
                                    --><button type="button" name="rlsd_by" id="rlsd_by" class="input_seach_btn" tabindex="-1" onClick="openSeiPopUp('USER_POPLIST',this)"></button>
	                                <input type="hidden" name="rlsd_usr_nm" value="<bean:write name="hblVO" property="rlsd_usr_nm"/>" class="search_form-disable" style="width:120px;" readOnly>
	                                <input type="hidden" name="rlsd_dept_cd" value="<bean:write name="hblVO" property="rlsd_dept_cd"/>">
	                            </td>
                        </tr>
                         <tr>
                         	<td colspan="4">
                         		<h3 class="title_design"><bean:message key="Management"/></h3>
                         	</td>
                         </tr>
                         <tr>
                             <th><bean:message key="Date_issued"/></th>
                             <td>
                                 <input type="text" name="bl_iss_dt" id="bl_iss_dt" value="<wrt:write name="hblVO" property="bl_iss_dt" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy"/>" class="search_form" onKeyUp="mkDateFormatType(this, event, false, 1)" onBlur="mkDateFormatType(this, event, true, 1);dateRangeValid(this, 'Date Issued');" dataformat="excepthan" style="ime-mode:disabled;width:70px;" size='11' maxlength="10"><!-- 
                                    --><button type="button" class="calendar" tabindex="-1" name="bl_iss_dt_cal" id="bl_iss_dt_cal"  onclick="doDisplay('DATE1' ,frm1.bl_iss_dt);" ></button>
                             </td>
                              <th><bean:message key="Issued_By"/></th>
                                <td>
									<input type="text"   name="opr_usrid" value="<bean:write name="hblVO" property="issued_by"/>" class="search_form-disable" readOnly style="width:75px;"><!-- 
                                    --><button type="button" name="oprBtn" id="oprBtn" class="input_seach_btn" tabindex="-1" onClick="openSeiPopUp('OPR_POPLIST',this)"></button>
									<input type="hidden" name="opr_usrnm" id="opr_usrnm"   value="<bean:write name="hblVO" property="proc_usrnm"/>">
	                                <input type="hidden" name="opr_ofc_cd"  id="opr_ofc_cd" value="<bean:write name="hblVO" property="proc_ofccd"/>">
	                                <input type="hidden" name="opr_dept_cd" id="opr_dept_cd" value="<bean:write name="hblVO" property="proc_dept_cd"/>">
                             	</td>
						 </tr>
						 <tr>
							<th><bean:message key="Team_cd"/></th>
							<td>
								<input type="text" name="team_cd"  readOnly style="width:100px;">
							</td>
							 <!-- OFVFOUR-7976: [MATRIX] ADDING CS PIC ON ALL B/L ENTRY AND TRADE PARTNER ENTRY SCREEN -->
							 <th><bean:message key="Cs_Pic"/></th>
							 <td>
								 <input type="text"   name="cs_usrid"  value="<bean:write name="hblVO" property="cs_usrid"/>" style="width:75px;" class="search_form-disable" readOnly><!--
                              		--><button type="button" name="csperson" id="csperson" class="input_seach_btn" tabindex="-1" onClick="openSeiPopUp('USER_POPLIST',this)"></button>
								 <input type="hidden" name="cs_usr_nm" value="<bean:write name="hblVO" property="cs_usr_nm"/>" class="search_form-disable" style="width:120px;" readOnly>
						</tr>
                         <tr>
                             <th><bean:message key="Sales_OFC"/></th>
                             <td>
                                 <input type="text"   name="sls_ofc_cd" value='<bean:write name="hblVO" property="sls_ofc_cd"/>' class="search_form-disable" style="width:70px;" readonly><!-- 
                                    --><button type="button" class="input_seach_btn" tabindex="-1" onClick="openSeiPopUp('OFFICE_GRID_POPLIST',this)"></button>
                             </td>
                             <th><bean:message key="Sales_PIC"/></th>
                             <td>
                                 <input type="text"   name="sls_usrid"  value="<bean:write name="hblVO" property="sls_usrid"/>"  class="search_form-disable" style="width:75px;" readonly><!-- 
                                    --><button type="button" name="salesperson" id="salesperson" class="input_seach_btn" tabindex="-1" onClick="openSeiPopUp('USER_POPLIST',this)"></button>
                                 <input type="hidden" name="sls_usr_nm" id="sls_usr_nm" value='<bean:write name="hblVO" property="sls_usr_nm"/>' class="search_form-disable" style="width:120px;" readOnly>
                                 <input type="hidden" name="sls_dept_cd" id="sls_dept_cd" value='<bean:write name="hblVO" property="sls_dept_cd"/>'>
                             </td>
                         </tr>
		    		</tbody>
		    	</table>
		    </div>
	    </div>
	    </div>
	    <!-- layout_vertical_2 a(E) -->
	 </div>
