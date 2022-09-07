<%--
=========================================================
*Copyright(c) 2009 CyberLogitec. All Rights Reserved.
=========================================================
=========================================================
*@FileName   : SEE_BMD_0020.jsp
*@FileTitle  : HGBL등록
*@Description: HBL 등록 및 조회
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
 					<col width="50px"></col>
 					<col width="140px"></col>
 					<col width="70px"></col>
 					<col width="140px"></col>
 					<col width="70px"></col>
 					<col width="120px"></col>
 					<col width="70px"></col>
 					<col width="130px"></col>
 					<col width="70px"></col>
 					<col width="130px"></col>
 					<col width="70px"></col>
 					<col width="130px"></col>
 					<col width="70px"></col>
 					<col width="130px"></col>
 					<col width="70px"></col>
 					<col width="130px"></col>
 					<col width="70px"></col>
 					<col width="*"></col>
 				</colgroup>
 				<tbody>
 					<tr>
						<th><bean:message key="HAWB_No"/></th>
						<td><!--
						--><input required type="text" name="bl_no" maxlength="40" value="<bean:write name="hblVO" property="bl_no"/>" onblur="strToUpper(this)"  dataformat="excepthan" otherchar = "<%=FWD_OTHER_CHAR%>" style="ime-mode:disabled; text-transform:uppercase;width:135px;"><!--
						--><input type="hidden" name="h_bl_no" value="<bean:write name="hblVO" property="bl_no"/>"></td>
						<th><a href="javascript:GOTOMBL(frm1.ref_no.value, frm1.rlt_intg_bl_seq.value, 'A', 'I');" style="color:#0000FF"><bean:message key="Ref_No"/></a></th>
						<td><!--
						--><input required type="text" name="ref_no" maxlength="20" value="<bean:write name="hblVO" property="ref_no"/>" onblur="strToUpper(this);" onchange="checkRefNo(this);"  style="ime-mode:disabled;width:105px;text-transform:uppercase;" dataformat="excepthan" otherchar = "<%=FWD_OTHER_CHAR%>" onKeyDown="fncBlSearch()"><!--
						--><input type="hidden" name="ref_ofc_cd" value="<bean:write name="hblVO" property="ref_ofc_cd"/>" onblur="strToUpper(this)" class="search_form-disable" style="width:35px;text-transform:uppercase;" readonly><!--
						--><button type="button" id="brnRef_no" class="input_seach_btn" tabindex="-1"  onClick="srAirOpenPopUp('REF_POPLIST3_BLANK',this, 'A', 'I')"></button><!--
						--><input type="hidden" name="rlt_intg_bl_seq" value="<bean:write name="hblVO" property="rlt_intg_bl_seq"/>"></td>
						<th><bean:message key="MAWB_No"/></th>
                        <td><input type="text" name="mbl_no" maxlength="40"  value='<bean:write name="hblVO" property="mbl_no"/>' class="search_form-disable" dataformat="excepthan" style="cursor:hand;ime-mode:disabled; text-transform:uppercase;width:135px;" ondblclick="goToBlPage('view_mbl', this.value)" readonly></td>
						<th><bean:message key="BL_Type"/></th>
						<td><!--
						--><bean:define id="blTypeList" name="valMap" property="blTypeList"/><!--
						--><html:select name="hblVO" property="hbl_tp_cd" styleClass="search_form" style="width:135px;"><!--
						--><html:options collection="blTypeList" property="cd_val" labelProperty="cd_nm"/><!--
						--></html:select></td>
						<th><bean:message key="Post_Date"/></th>
                        <td><input type="text" name="post_dt" value='<wrt:write name="hblVO" property="post_dt" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy"/>' onkeyPress="onlyNumberCheck();" onKeyUp="mkDateFormatType(this, event, false, 1)" onBlur="mkDateFormatType(this, event, true, 1);" size='11' maxlength="10" class="search_form-disable" style="width:115px;" readonly></td>
						<th style="display: none"><bean:message key="AMS_ISF_No"/></td>
                        <td style="display: none"><!--
						--><input type="text" name="ams_no" maxlength="20" value="<bean:write name="hblVO" property="ams_no"/>"  dataformat="excepthan" style="ime-mode:disabled;width:60px;text-transform:uppercase;" onblur="strToUpper(this)"><!--
						--><input type="text" name="isf_no" maxlength="20" value="<bean:write name="hblVO" property="isf_no"/>"  dataformat="excepthan" style="ime-mode:disabled;width:60px;text-transform:uppercase;" onblur="strToUpper(this)">
						</td>						
					</tr>
					<tr>
						<th><bean:message key="HSN"/></th>
						<td><input type="text" name="bl_ser_no" maxlength="20" value="<bean:write name="hblVO" property="bl_ser_no"/>"  dataformat="excepthan" style="ime-mode:disabled;width:123px;text-transform:uppercase;" onblur="strToUpper(this)"></td>
						<th><bean:message key="Customer_Ref_No"/></th>
						<td><input type="text" name="cust_ref_no" maxlength="40"  value="<bean:write name="hblVO" property="cust_ref_no"/>"  dataformat="multiLanguage" style="ime-mode:disabled;width:115px;text-transform:uppercase;" onblur="strToUpper(this)"></td>
                        <th><bean:message key="Agent_Reference_No"/></th>
						<td><input type="text" name="prnr_ref_no" maxlength="40" value="<bean:write name="hblVO" property="prnr_ref_no"/>"  dataformat="multiLanguage" style="ime-mode:disabled;width:123px;text-transform:uppercase;" onblur="strToUpper(this)"></td>
						<th><bean:message key="Job_Template"/></th>
						<td><!--
						--><input type="text" name="jb_tmplt_nm" value="<bean:write name="hblVO" property="jb_tmplt_nm"/>" class="search_form-disable" style="width:90px;" readonly><!--
						--><button type="button" class="input_seach_btn" tabindex="-1"  onClick="openAiiPopUp('WORKFLOW_POPLIST',this)"></button><!--
						--><html:hidden name="hblVO" property="jb_tmplt_seq"/></td>
					</tr>
 				</tbody>
 			</table>
 		</div>
 			
 		<div class="layout_wrap">
 			<div class="layout_vertical_3 pad_rgt_8">
	 			<div class="opus_design_inquiry sm" style="height:800px;">
				<table>
					<colgroup>
						<col width="60px"></col>
						<col width="50px" />
						<col width="100px" />
						<col width="100px" />
						<col width="100px" />
						<col width="*"/>
					</colgroup>
					<tbody>
						<tr>
							<td colspan="6"><h3 class="title_design"><bean:message key="Customer"/></h3></td>
						</tr>
						<tr>
                            <th><a href="javascript:clearBlPrnr('P01');"><bean:message key="Partner"/></a></th>
                            <td colspan="5"><!--
                            --><input type="text" name="prnr_trdp_cd" maxlength="20" value='<bean:write name="hblVO" property="prnr_trdp_cd"/>' onKeyDown="codeNameAction('trdpCode_partner',this, 'onKeyDown', 'A', 'I', 'H')" onBlur="strToUpper(this);codeNameAction('trdpCode_partner',this, 'onBlur', 'A', 'I', 'H')"  dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:70px;"><!--
                            --><button type="button" class="input_seach_btn" tabindex="-1" id="partner" onClick="openAiiPopUp('LINER_POPLIST',this)"></button><!--
                            --><input type="text"   name="prnr_trdp_nm" maxlength="50" value='<bean:write name="hblVO" property="prnr_trdp_nm"/>' onblur="strToUpper(this)"  dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:calc(100% - 103px);" onKeyPress="if(event.keyCode==13){openAiiPopUp('LINER_POPLIST', document.getElementById('partner'), frm1.prnr_trdp_nm.value);}"><!--
                            --><input type="hidden" name="prnr_trdp_addr" value='<bean:write name="hblVO" property="prnr_trdp_addr"/>'></td>
                        </tr>
                        <tr>
							<th><a href="javascript:clearBlPrnr('S01');"><bean:message key="Shipper"/></a></th>
							<td colspan="5"><!--
                            --><input type="hidden" name="shpr_trdp_cd" maxlength="20" value='<bean:write name="hblVO" property="shpr_trdp_cd"/>'   onKeyDown="codeNameAction('trdpCode_shipper',this, 'onKeyDown')" onBlur="strToUpper(this);codeNameAction('trdpCode_shipper',this, 'onBlur')" dataformat="excepthan" style="ime-mode:disabled;width:48px;"><!--
                            --><input type="text"   name="shpr_trdp_nm" maxlength="50" value='<bean:write name="hblVO" property="shpr_trdp_nm"/>'  onblur="strToUpper(this);checkTrdpCode(this);"   dataformat="excepthan" style="ime-mode:disabled;width:calc(100% - 29px);text-transform:uppercase;" onKeyPress="if(event.keyCode==13){openAiiPopUp('LINER_POPLIST', document.getElementById('shipper'), frm1.shpr_trdp_nm.value);};"><!--
                            --><button type="button" class="input_seach_btn" tabindex="-1" id="shipper" onClick="openAiiPopUp('LINER_POPLIST',this);"></button></td>
						</tr>
						<tr>
							<td colspan="6"><textarea name="shpr_trdp_addr" class="search_form autoenter_50" dataformat="excepthan" style="width:100%;height:80px;" onblur="strToUpper(this);chkCmpAddr(this, 'Shipper Address')" WRAP="off">
<bean:write name="hblVO" property="shpr_trdp_addr" filter="true"/></textarea></td>
						</tr>
							<th><a href="javascript:clearBlPrnr('S02');"><bean:message key="Customer"/></a></th>
							<td colspan="5"><!--
                            --><input required type="text" name="act_shpr_trdp_cd" maxlength="20" value='<bean:write name="hblVO" property="act_shpr_trdp_cd"/>'  onKeyDown="codeNameAction('trdpCode_ashipper',this, 'onKeyDown', 'A', 'I', 'H')" onBlur="strToUpper(this);codeNameAction('trdpCode_ashipper',this, 'onBlur', 'A', 'I', 'H')" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:70px;"><!--
                            --><button type="button" class="input_seach_btn" tabindex="-1" id="ashipper" onClick="openAiiPopUp('LINER_POPLIST',this)"></button><!--
                            --><input required type="text" name="act_shpr_trdp_nm" value='<bean:write name="hblVO" property="act_shpr_trdp_nm"/>' onblur="strToUpper(this)"  dataformat="multiLanguage" style="ime-mode:disabled;width:calc(100% - 153px);text-transform:uppercase;" maxlength="50" onKeyPress="if(event.keyCode==13){openAiiPopUp('LINER_POPLIST', document.getElementById('ashipper'), frm1.act_shpr_trdp_nm.value);}"><!--
                            --><span id="ashipper" style="cursor:hand" onClick="openAiiPopUp('PIC_POP', this)"><button type="button" class="btn_etc"><bean:message key="PIC"/></button></span></td>
						</tr>
						<tr>
                            <td colspan="6"><!--
                            --><textarea name="act_shp_info" class="search_form autoenter_50" dataformat="excepthan" style="width:100%;height:40px;" onblur="strToUpper(this);" WRAP="off">
<bean:write name="hblVO" property="act_shp_info" filter="true"/></textarea></td>
                        </tr>
                        <tr>						
						<tr>
							<th><a href="javascript:clearBlPrnr('C01');"><bean:message key="Consignee"/></a></th>
							<td colspan="5"><!--
                            --><input type="hidden" name="cnee_trdp_cd"  value='<bean:write name="hblVO" property="cnee_trdp_cd"/>'  onKeyDown="codeNameAction('trdpCode_consignee',this, 'onKeyDown')" onBlur="strToUpper(this);codeNameAction('trdpCode_consignee',this, 'onBlur');"  dataformat="excepthan" style="ime-mode:disabled;width:48px;"><!--
                            --><input type="text"   name="cnee_trdp_nm"  value='<bean:write name="hblVO" property="cnee_trdp_nm"/>'  onblur="strToUpper(this);checkTrdpCode(this);"    dataformat="excepthan" style="ime-mode:disabled;width:calc(100% - 29px);text-transform:uppercase;" maxlength="50" onKeyPress="if(event.keyCode==13){openAiiPopUp('CNEE_POPLIST', document.getElementById('consignee'), frm1.cnee_trdp_nm.value);};"><!--
                            --><button type="button" class="input_seach_btn" tabindex="-1" id="consignee" onClick="openAiiPopUp('CNEE_POPLIST',this);"></button></td>
						</tr>
						<tr>
							<td colspan="6"><textarea name="cnee_trdp_addr" class="search_form autoenter_50" dataformat="excepthan" style="width:100%;height:80px;" onblur="strToUpper(this);chkCmpAddr(this, 'Consignee Address')" WRAP="off">
<bean:write name="hblVO" property="cnee_trdp_addr" filter="true"/></textarea></td>
						</tr>
						<tr>
							<th><a href="javascript:clearBlPrnr('N01');"><bean:message key="Notify"/></a></th>
							<td colspan="5"><!--
                            --><input type="hidden" name="ntfy_trdp_cd"  value='<bean:write name="hblVO" property="ntfy_trdp_cd"/>'  onKeyDown="codeNameAction('trdpCode_notify',this, 'onKeyDown')" onBlur="strToUpper(this);codeNameAction('trdpCode_notify',this, 'onBlur')" dataformat="excepthan" style="ime-mode:disabled;width:48px;"><!--
                            --><input type="text"   name="ntfy_trdp_nm"  value='<bean:write name="hblVO" property="ntfy_trdp_nm"/>' onblur="strToUpper(this);checkTrdpCode(this);"  dataformat="excepthan" style="ime-mode:disabled;width:calc(100% - 29px);text-transform:uppercase;" maxlength="50" onKeyPress="if(event.keyCode==13){openAiiPopUp('LINER_POPLIST', document.getElementById('notify'), frm1.ntfy_trdp_nm.value);}"><!--
                            --><button type="button" class="input_seach_btn" tabindex="-1" id="notify" onClick="openAiiPopUp('LINER_POPLIST',this)"></button></td>
						</tr>
						<tr>
							<td colspan="5"><!--
                            --><img src="<%=CLT_PATH%>/web/img/main/ico_t2.gif" border="0"><a href="javascript:copyValue('SAC', 'A', 'I', 'H')"><bean:message key="Same_As_Consignee"/></a>&nbsp;<!--
                            --><img src="<%=CLT_PATH%>/web/img/main/ico_t2.gif" border="0"><a href="javascript:copyValue('CNEE', 'A', 'I', 'H')"><bean:message key="Copy"/></a></td>
						</tr>
						<tr>
							<td colspan="6"><textarea name="ntfy_trdp_addr" class="search_form autoenter_50" dataformat="excepthan" style="width:100%;height:80px;" onblur="strToUpper(this);chkCmpAddr(this, 'Notify Address')" WRAP="off">
<bean:write name="hblVO" property="ntfy_trdp_addr" filter="true"/></textarea></td>
						</tr>
						<tr>
							<th><a href="javascript:clearBlPrnr('C03');"><bean:message key="Customs_Broker"/></a></th>
                            <td colspan="5"><!--
                            --><input type="text" name="cust_trdp_cd" maxlength="20" value='<bean:write name="hblVO" property="cust_trdp_cd"/>' onKeyDown="codeNameAction('trdpCode_cust',this, 'onKeyDown')" onBlur="strToUpper(this);codeNameAction('trdpCode_cust',this, 'onBlur')"  dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:70px;"><!--
                            --><button type="button" class="input_seach_btn" tabindex="-1" id="cust" onClick="openAiiPopUp('LINER_POPLIST',this)"></button><!--
                            --><input type="text"   name="cust_trdp_nm" maxlength="50" value='<bean:write name="hblVO" property="cust_trdp_nm"/>' onblur="strToUpper(this);checkTrdpCode(this);"  dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:calc(100% - 103px);" onKeyPress="if(event.keyCode==13){openAiiPopUp('LINER_POPLIST', document.getElementById('cust'), frm1.cust_trdp_nm.value);}"></td>
                      	</tr>
                      	<tr>
                            <td colspan="6"><!--
                            --><textarea name="cust_trdp_addr" class="search_form autoenter_50" dataformat="excepthan" style="width:100%;height:40px;" onblur="strToUpper(this);" WRAP="off">
<bean:write name="hblVO" property="cust_trdp_addr" filter="true"/></textarea></td>
                        </tr>
	                    <tr>
                            <th><a href="javascript:clearBlPrnr('T01');"><bean:message key="Third_Party"/></a></th>
                            <td colspan="5"><!--
                            --><input type="text" name="third_trdp_cd" maxlength="20" value='<bean:write name="hblVO" property="third_trdp_cd"/>' onKeyDown="codeNameAction('trdpCode_third',this, 'onKeyDown')" onBlur="strToUpper(this);codeNameAction('trdpCode_third',this, 'onBlur')"  dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:70px;"><!--
                            --><button type="button" class="input_seach_btn" tabindex="-1" id="third" onClick="openAiiPopUp('LINER_POPLIST',this)"></button><!--
                            --><input type="text"   name="third_trdp_nm" maxlength="50" value='<bean:write name="hblVO" property="third_trdp_nm"/>' onblur="strToUpper(this)"  dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:calc(100% - 103px);" onKeyPress="if(event.keyCode==13){openAiiPopUp('LINER_POPLIST', document.getElementById('third'), frm1.third_trdp_nm.value);}"><!--
                            --><input type="hidden" name="third_trdp_addr" value='<bean:write name="hblVO" property="third_trdp_addr"/>'></td>
                        </tr>
                        <tr>
							<th><a href="javascript:clearBlPrnr('P03');"><bean:message key="Triangle_Agent"/></a></th>
							<td colspan="5"><!--
                            --><input type="text"   name="prnr_trdp_cd2" maxlength="20" value='<bean:write name="hblVO" property="prnr_trdp_cd2"/>' onKeyDown="codeNameAction('trdpCode_partner2',this, 'onKeyDown')" onBlur="strToUpper(this);codeNameAction('trdpCode_partner2',this, 'onBlur')"  dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:70px;"><!--
                            --><button type="button" class="input_seach_btn" tabindex="-1" id="partner2"  onClick="openAiiPopUp('LINER_POPLIST',this)"></button><!--
                            --><input type="text"   name="prnr_trdp_nm2" maxlength="50" value='<bean:write name="hblVO" property="prnr_trdp_nm2"/>' onblur="strToUpper(this)"  dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:calc(100% - 103px);" onKeyPress="if(event.keyCode==13){openAiiPopUp('LINER_POPLIST', document.getElementById('partner2'), frm1.prnr_trdp_nm2.value);}"><!--
                            --><input type="hidden" name="prnr_trdp_addr2" value='<bean:write name="hblVO" property="prnr_trdp_addr2"/>'></td>
						</tr>
						<tr>
							<th><a href="javascript:clearBlPrnr('A01');"><bean:message key="Forwarding_Agent"/></a></th>
							<td colspan="5"><!--
							--><input type="text" name="agent_trdp_cd" maxlength="20" value='<bean:write name="hblVO" property="agent_trdp_cd"/>' onKeyDown="codeNameAction('trdpCode_agent',this, 'onKeyDown')" onBlur="strToUpper(this);codeNameAction('trdpCode_agent',this, 'onBlur')" class="search_form" style="ime-mode:disabled; text-transform:uppercase;width:70px;"><!--
							--><button type="button" class="input_seach_btn" tabindex="-1" id="agent" name="agent" onClick="openAiePopUp('LINER_POPLIST',this)" style="cursor:hand" align="absmiddle"></button><!--
							--><input type="text"   name="agent_trdp_nm" maxlength="50" value='<bean:write name="hblVO" property="agent_trdp_nm"/>' onblur="strToUpper(this)" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:calc(100% - 103px);" onKeyPress="if(event.keyCode==13){openAiiPopUp('LINER_POPLIST', document.getElementById('agent'), frm1.agent_trdp_nm.value);}"><!--
							--><input type="hidden" name="agent_trdp_addr" value='<bean:write name="hblVO" property="agent_trdp_addr"/>'><!--
						--></td>
			            </tr>
						<tr height="7px"></tr>
						<tr>
	                    	<td colspan="5">
	                        	<h3 class="title_design"><bean:message key="Contribution"/></h3>
	                      	</td>
	                  	</tr>
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
			
			<div class="layout_vertical_3 pad_rgt_8">
				<div class="opus_design_inquiry sm" style="height:800px;">
                 <table>
					<colgroup>
						<col width="135px"></col>
						<col width="100px"></col>
						<col width="30px"></col>
						<col width="*"></col>
					</colgroup>
					<tbody>
						<tr>
							<td><h3 class="title_design"><bean:message key="Flight_Info"/></h3></td>
						</tr>
						<tr>
                            <th><bean:message key="Airline"/></th>
                            <td colspan="3"><!--
                            --><input required type="text"   name="lnr_trdp_cd" maxlength="20" value='<bean:write name="hblVO" property="lnr_trdp_cd"/>' onKeyDown="codeNameAction('trdpCode_himp_air_carr',this, 'onKeyDown')" onBlur="strToUpper(this);codeNameAction('trdpCode_himp_air_carr',this, 'onBlur')"  dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:80px;"><!--
                            --><button type="button" class="input_seach_btn" tabindex="-1" id="liner" onClick="openAiiPopUp('LINER_POPLIST_M',this)"></button><!--
                            --><input required type="text"   name="lnr_trdp_nm" maxlength="50" value='<bean:write name="hblVO" property="lnr_trdp_nm"/>' onblur="strToUpper(this)"  dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:140px;" onKeyPress="if(event.keyCode==13){openAiiPopUp('LINER_POPLIST_M', document.getElementById('liner'), frm1.lnr_trdp_nm.value);}"><!--
                            --><input type="hidden" name="obrd_dt_tm"  value='<wrt:write name="hblVO" property="obrd_dt_tm" formatType="DATE" fromFormat="yyyyMMdd" format="yyyy-MM-dd"/>'  onKeyUp="mkDateFormat(this,event,false)" onBlur="mkDateFormat(this, event, true)" dataformat="excepthan" style="ime-mode:disabled;width:70px;"></td>
                        </tr>
						<tr>
                             <th><bean:message key="Flight_No"/></th>
                             <td colspan="4"><input type="text" name="flt_no"      value='<bean:write name="hblVO" property="flt_no"/>'   onblur="strToUpper(this)"   dataformat="excepthan" style="ime-mode:disabled;width:80px;text-transform:uppercase;" maxlength="20"></td>
						</tr>
						<tr>
                             <th><bean:message key="Flight_Date"/></th>
                             <td><!--
                            --><input style="width:80px;" type="text" name="etd_dt_tm" value='<wrt:write name="hblVO" property="etd_dt_tm" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy"/>' onkeyPress="onlyNumberCheck();" onKeyUp="mkDateFormatType(this, event, false,1)" onBlur="mkDateFormatType(this, event, true,1);dateRangeValid(this, 'Flight Date');" size='11' maxlength="10" ><!--
                            --><button type="button" id="etd_dt_tm_cal" onclick="doDisplay('DATE1' ,frm1.etd_dt_tm);" class="calendar" tabindex="-1"></button></td>
                             <th><bean:message key="Time"/></th>
                             <td><input type="text" name="etd_tm" value='<wrt:write name="hblVO" property="etd_tm" formatType="DATE" fromFormat="HHmm" format="HH:mm"/>' maxlength="4"  dataformat="num" style="ime-mode:disabled;width:50px;" onchange="timeCheck(this);" onkeypress="onlyNumberCheck();"></td>
                        </tr>
                        <tr>
							<th><bean:message key="ETA_of_FPOE"/></th>
							<td><!--
                            --><input style="width:80px;" type="text" name="eta_fpoe_tm" value='<wrt:write name="hblVO" property="eta_fpoe_tm" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy"/>' onKeyUp="mkDateFormatType(this, event, false, 1)" onBlur="mkDateFormatType(this, event, true, 1);dateRangeValid(this, 'ETA of FPOE');"  dataformat="excepthan" style="ime-mode:disabled;width:90px;" size='11' maxlength="10"><!--
                            --><button type="button" id="eta_fpoe_tm_cal" onclick="doDisplay('DATE1', frm1.eta_fpoe_tm);" class="calendar" tabindex="-1"></button></td>
                            <th><bean:message key="Time"/>
							<td><input type="text" name="fpoe_tm"    value='<wrt:write name="hblVO" property="fpoe_tm" formatType="DATE" fromFormat="HHmm" format="HH:mm"/>' maxlength="4"  dataformat="num" style="ime-mode:disabled;width:50px;" onchange="timeCheck(this);" onkeypress="onlyNumberCheck();"></td>
							<td></td>
						</tr>						                                                
						<tr>
							<th><bean:message key="Arrival_Date"/></th>
                            <td><!--
                            --><input required  style="width:80px;" type="text" name="eta_dt_tm" value='<wrt:write name="hblVO" property="eta_dt_tm" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy"/>' onkeyPress="onlyNumberCheck();" onKeyUp="mkDateFormatType(this, event, false,1)" onBlur="mkDateFormatType(this, event, true,1);dateRangeValid(this, 'Arrival Date');" size='11' maxlength="10" ><!--
                            --><button type="button" id="eta_dt_tm_cal" onclick="doDisplay('DATE1' ,frm1.eta_dt_tm);" class="calendar" tabindex="-1"></button></td>
                            <th><bean:message key="Time"/></th>
                            <td><input type="text" name="eta_tm"    value='<wrt:write name="hblVO" property="eta_tm" formatType="DATE" fromFormat="HHmm" format="HH:mm"/>' maxlength="4"   dataformat="num" style="ime-mode:disabled;width:50px;" onchange="timeCheck(this);" onkeypress="onlyNumberCheck();"></td>
                        </tr>
                                            
                         <tr>
                             <th><bean:message key="F_ETA"/></th>
                             <td><!--
                            --><input style="width:80px;" type="text" name="f_eta_dt_tm" value='<wrt:write name="hblVO" property="f_eta_dt_tm" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy"/>' onkeyPress="onlyNumberCheck();" onKeyUp="mkDateFormatType(this, event, false,1)" onBlur="mkDateFormatType(this, event, true,1);dateRangeValid(this, 'Final ETA');" size='11' maxlength="10" ><!--
                            --><button type="button" id="f_eta_dt_tm_cal" onclick="doDisplay('DATE1' ,frm1.f_eta_dt_tm);" class="calendar" tabindex="-1"></button></td>
                             <th><bean:message key="Time"/></th>
                             <td><input type="text" name="f_eta_tm"    value='<wrt:write name="hblVO" property="f_eta_tm" formatType="DATE" fromFormat="HHmm" format="HH:mm"/>' maxlength="4"  dataformat="num" style="ime-mode:disabled;width:50px;" onchange="timeCheck(this);" onkeypress="onlyNumberCheck();"></td>
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
                      </tbody>
				</table>
				<table>
					<colgroup>
						<col width="93px"></col>
						<col width="100px"></col>
						<col width="30px"></col>
						<!-- <col width="30px"></col> -->
						<col width="*"></col>
					</colgroup>
					<tbody>
                         <tr>
                             <td><h3 class="title_design mar_top_8" style="margin-bottom:0;"><bean:message key="Route"/></h3></td>
                         </tr>
                         <tr>
							<th><bean:message key="Departure"/></th>
							<td colspan="3"><!--
                            --><input required  type="text"   name="pol_cd" maxlength="5" value='<bean:write name="hblVO" property="pol_cd"/>' onKeyDown="codeNameAction('Location_pol',this, 'onKeyDown','A')" onBlur="strToUpper(this);codeNameAction('Location_pol',this, 'onBlur','A')" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:80px;" ><!--
                            --><button type="button" class="input_seach_btn" tabindex="-1" id="pol" onClick="openAiiPopUp('LOCATION_POPLIST',this)"></button><!--
                            --><input required  type="text"   name="pol_nm"  maxlength="50"   value='<bean:write name="hblVO" property="pol_nm"/>'  dataformat="excepthan" style="ime-mode:disabled;width:140px;text-transform:uppercase;" onblur="strToUpper(this)" onKeyPress="if(event.keyCode==13){openAiiPopUp('LOCATION_POPLIST', document.getElementById('pol'), frm1.pol_nm.value);}"><!--
                            --><input type="hidden" name="pol_nod_cd"     value='<bean:write name="hblVO" property="pol_nod_cd"/>' ></td>
						</tr>
                        <tr>
                            <th><bean:message key="Trans_1"/></th>
                            <td colspan="3"><!--
                            --><input type="text" name="ts1_port_cd" maxlength="5" value='<bean:write name="hblVO" property="ts1_port_cd"/>' onKeyDown="codeNameAction('Location_ts1',this, 'onKeyDown','A')" onBlur="strToUpper(this);codeNameAction('Location_ts1',this, 'onBlur','A');setDestination()"  dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:80px;"><!--
                            --><button type="button" class="input_seach_btn" tabindex="-1" id="ts1" onClick="openAiiPopUp('LOCATION_POPLIST',this)"></button><input type="text" name="ts1_flt_no"  value='<bean:write name="hblVO" property="ts1_flt_no"/>'  dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:140px;" maxlength="15" onblur="strToUpper(this)"  onKeyPress="if(event.keyCode==13){openAiiPopUp('LOCATION_POPLIST', document.getElementById('ts1'), frm1.ts1_flt_no.value);}"></td>
                        </tr>
                         <tr>
                             <th><bean:message key="Trans_2"/></th>
                             <td colspan="3"><!--
                            --><input type="text" name="ts2_port_cd" maxlength="5" value='<bean:write name="hblVO" property="ts2_port_cd"/>' onKeyDown="codeNameAction('Location_ts2',this, 'onKeyDown','A')" onBlur="strToUpper(this);codeNameAction('Location_ts2',this, 'onBlur','A');setDestination()"  dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:80px;"><!--
                            --><button type="button" class="input_seach_btn" tabindex="-1" id="ts2" onClick="openAiiPopUp('LOCATION_POPLIST',this)"></button><!--
                            --><input type="text" name="ts2_flt_no"  value='<bean:write name="hblVO" property="ts2_flt_no"/>'   dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:140px;" maxlength="15" onblur="strToUpper(this)" onKeyPress="if(event.keyCode==13){openAiiPopUp('LOCATION_POPLIST', document.getElementById('ts2'), frm1.ts2_flt_no.value);}"></td>
                         </tr>
                         <tr>
                             <th><bean:message key="Trans_3"/></th>
                             <td colspan="3"><!--
                            --><input type="text" name="ts3_port_cd" maxlength="5" value='<bean:write name="hblVO" property="ts3_port_cd"/>' onKeyDown="codeNameAction('Location_ts3',this, 'onKeyDown','A')" onBlur="strToUpper(this);codeNameAction('Location_ts3',this, 'onBlur','A');setDestination()"  dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:80px;"><!--
                            --><button type="button" class="input_seach_btn" tabindex="-1" id="ts3" onClick="openAiiPopUp('LOCATION_POPLIST',this)"></button><!--
                            --><input type="text" name="ts3_flt_no"  value='<bean:write name="hblVO" property="ts3_flt_no"/>'   dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:140px;" maxlength="15" onblur="strToUpper(this)" onKeyPress="if(event.keyCode==13){openAiiPopUp('LOCATION_POPLIST', document.getElementById('ts3'), frm1.ts3_flt_no.value);}"></td>
                         </tr>
                   		<tr>
                            <th><bean:message key="First_Port_of_Entry"/></th>
                            <td colspan="3"><!--
                            --><input type="text" name="first_port_cd" maxlength="5" value='<bean:write name="hblVO" property="first_port_cd"/>'  onKeyDown="codeNameAction('Location_first',this, 'onKeyDown','A')" onBlur="codeNameAction('Location_first',this, 'onBlur','A');javascript:this.value=this.value.toUpperCase();" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:80px;"><!--
                            --><button type="button" class="input_seach_btn" tabindex="-1" id="first" onClick="openAiiMasterPopUp('LOCATION_POPLIST',this)"></button><!--
                            --><input type="text" name="first_port_nm" value='<bean:write name="hblVO" property="first_port_nm"/>'  dataformat="excepthan" style="ime-mode:disabled;width:140px;text-transform:uppercase;" onblur="strToUpper(this)" onKeyPress="if(event.keyCode==13){openAiiMasterPopUp('LOCATION_POPLIST', document.getElementById('first'), frm1.first_port_nm.value);}"  maxlength="50"></td>
                            <td></td>
                        </tr>					                                                
						 <tr>
							<th><bean:message key="Destination"/></th>
							<td colspan="3"><!--
                            --><input required  type="text" id="pod_cd" name="pod_cd" maxlength="5" value='<bean:write name="hblVO" property="pod_cd"/>' onKeyDown="codeNameAction('Location_air_des',this, 'onKeyDown','A')" onBlur="strToUpper(this);codeNameAction('Location_air_des',this, 'onBlur','A')" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:80px;"  ><!--
                            --><button type="button" class="input_seach_btn" tabindex="-1" id="air_des" onClick="openAiiPopUp('LOCATION_POPLIST',this)"></button><!--
                            --><input required  type="text"   name="pod_nm" maxlength="50"    value='<bean:write name="hblVO" property="pod_nm"/>'      dataformat="excepthan" style="ime-mode:disabled;width:140px;text-transform:uppercase;" onblur="strToUpper(this)" onKeyPress="if(event.keyCode==13){openAiiPopUp('LOCATION_POPLIST', document.getElementById('air_des'), frm1.pod_nm.value);}"><!--
                            --><input type="hidden" name="pod_nod_cd"     value='<bean:write name="hblVO" property="pod_nod_cd"/>'></td>
						 </tr>
						
						 <tr>
							<th><bean:message key="Final_Destination"/></th>
							<td colspan="3"><!--
                            --><input type="text"   name="fnl_dest_loc_cd" maxlength="5" value='<bean:write name="hblVO" property="fnl_dest_loc_cd"/>' onKeyDown="codeNameAction('Location_wh',this, 'onKeyDown')" onBlur="strToUpper(this);codeNameAction('Location_wh',this, 'onBlur')" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:80px;"  ><!--
                            --><button type="button" class="input_seach_btn" tabindex="-1" id="wh" onClick="openAiiPopUp('LOCATION_POPLIST',this)"></button><!--
                            --><input type="text"   name="fnl_dest_loc_nm" maxlength="50"    value='<bean:write name="hblVO" property="fnl_dest_loc_nm"/>'      dataformat="excepthan" style="ime-mode:disabled;width:140px;text-transform:uppercase;" onblur="strToUpper(this)" onKeyPress="if(event.keyCode==13){openAiiPopUp('LOCATION_POPLIST', document.getElementById('wh'), frm1.fnl_dest_loc_nm.value);}"></td>
						 </tr>
						
						 <tr>
							<th><bean:message key="Door_Delivery_Location"/></th>
							<td colspan="3"><!--
                            --><input type="text" name="door_loc_cd" maxlength="20" value='<bean:write name="hblVO" property="door_loc_cd"/>'  onKeyDown="codeNameAction('trdpCode_door',this, 'onKeyDown')" onBlur="strToUpper(this);codeNameAction('trdpCode_door',this, 'onBlur')" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:80px;"><!--
                            --><button type="button" class="input_seach_btn" tabindex="-1" id="door" onClick="openAiiPopUp('LINER_POPLIST',this)"></button><!--
                            --><input type="text" name="door_loc_nm" maxlength="50" value='<bean:write name="hblVO" property="door_loc_nm"/>'  dataformat="multiLanguage" style="ime-mode:disabled;width:140px;text-transform:uppercase;" onblur="strToUpper(this)" onKeyPress="if(event.keyCode==13){openAiiPopUp('LINER_POPLIST', document.getElementById('door'), frm1.door_loc_nm.value);}"></td>
						 </tr>
						 <tr>
							<th><bean:message key="Freight_Location"/></th>
							<td colspan="3"><!--
                            --><input type="text"   name="cfs_trdp_cd" maxlength="20" value='<bean:write name="hblVO" property="cfs_trdp_cd"/>' onKeyDown="codeNameAction('trdpCode_cfs',this, 'onKeyDown')" onBlur="strToUpper(this);codeNameAction('trdpCode_cfs',this, 'onBlur')"  dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:80px;"><!--
                            --><button type="button" class="input_seach_btn" tabindex="-1" id="cfs" onClick="openAiiPopUp('LINER_POPLIST',this)"></button><!--
                            --><input type="text"   name="cfs_trdp_nm" maxlength="50" value='<bean:write name="hblVO" property="cfs_trdp_nm"/>' onblur="strToUpper(this)"  dataformat="multiLanguage" style="ime-mode:disabled; text-transform:uppercase;width:140px;" onKeyPress="if(event.keyCode==13){openAiiPopUp('LINER_POPLIST', document.getElementById('cfs'), frm1.cfs_trdp_nm.value);}"></td>
						 </tr>
						 <tr id="trKrOnlyWh" style="display: none">
                             <th><bean:message key="Warehouse"/></th>
                             <td colspan="3"><!--
                            --><input type="hidden" name="cfs_nod_cd" maxlength="5" value='<bean:write name="hblVO" property="cfs_nod_cd"/>'  onKeyDown="codeNameAction('Nodecode_cfs',this, 'onKeyDown')" onBlur="strToUpper(this);codeNameAction('Nodecode_cfs',this, 'onBlur')" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:80px;"><!--
                            --><input type="text" name="cfs_loc_nm" value='<bean:write name="hblVO" property="cfs_loc_nm"/>' class="search_form-disable" onBlur="strToUpper(this);" dataformat="excepthan" style="ime-mode:disabled;width:calc(100% - 25px);" readonly><!--
                            --><button type="button" class="input_seach_btn" tabindex="-1" id="cfs" onClick="getWhCd('A')"></button><!--
                            --><html:hidden name="hblVO" property="cfs_loc_cd"/></td>
                         </tr>
						 <!-- #399 [BNXON, Common] Available date is not shown on Air Import Arival Notice -->
                         <tr>
							<th><bean:message key="Warehouse_Arrived_On"/></th>
							<td colspan="3"><!--
                            --><input type="text" name="wh_arrv_dt_tm" value='<wrt:write name="hblVO" property="wh_arrv_dt_tm" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy"/>' onkeyPress="onlyNumberCheck();" onKeyUp="mkDateFormatType(this, event, false, 1)" onBlur="mkDateFormatType(this, event, true, 1);dateRangeValid(this, 'Warehouse Arrived On');"  dataformat="excepthan" style="ime-mode:disabled;width:80px;" size='11' maxlength="10"><!--
                            --><button type="button" id="wh_arrv_dt_tm_cal" onclick="doDisplay('DATE1', frm1.wh_arrv_dt_tm);" class="calendar" tabindex="-1"></button><!--
                            --><input type="text" name="wh_arrv_tm"  value='<wrt:write name="hblVO" property="wh_arrv_tm" formatType="DATE" fromFormat="HHmm" format="HH:mm"/>' maxlength="4"  dataformat="excepthan" style="ime-mode:disabled;width:40px;" onchange="timeCheck(this);" onkeypress="onlyNumberCheck();"></td>
						 </tr>
                         <tr>
                         	 <th><bean:message key="Storage_Start_Date"/></th>
                             <td colspan="3"><!--
                            --><input type="text" name="sto_start_dt" value='<wrt:write name="hblVO" property="sto_start_dt" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy"/>' onkeyPress="onlyNumberCheck();" onKeyUp="mkDateFormatType(this, event, false, 1)" onBlur="mkDateFormatType(this, event, true, 1);dateRangeValid(this, 'Storage Start Date');" size='11' maxlength="10"  style="width:80px;"><!--
                            --><button type="button" id="sto_start_dt_cal" onclick="doDisplay('DATE1', frm1.sto_start_dt);" class="calendar" tabindex="-1"></button></td>
                         </tr>
						 <tr>
							<th><bean:message key="Available"/></th>
							<td colspan="1"><!--
								--><input type="text" name="avail_dt_tm" id="avail_dt_tm" value='<wrt:write name="hblVO" property="avail_dt_tm" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy"/>' onKeyUp="mkDateFormatType(this, event, false, 1)" onBlur="mkDateFormatType(this, event, true, 1)" size='11' maxlength="10" class="search_form" style="width:80px;"><!-- 
								--><button type="button" class="calendar" tabindex="-1" name="avail_dt_tm_cal" id="avail_dt_tm_cal"  onclick="doDisplay('DATE1', frm1.avail_dt_tm);" ></button>
							</td>							
						 </tr>
						 <tr>
						 	<th><bean:message key="GO_Date"/></th>
                            <td colspan="1"><!--
                            --><input type="text" name="go_dt_tm" value='<wrt:write name="hblVO" property="go_dt_tm" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy"/>' onkeyPress="onlyNumberCheck();" onKeyUp="mkDateFormatType(this, event, false, 1)" onBlur="mkDateFormatType(this, event, true, 1);dateRangeValid(this, 'G.O Date');" size='11' maxlength="10"  style="width:80px;"><!--
                            --><button type="button" id="go_dt_tm_cal" onclick="doDisplay('DATE1', frm1.go_dt_tm);" class="calendar" tabindex="-1"></button></td>
						 </tr>
                         <tr>
                             <th><bean:message key="Foreign_Destination"/></th>
                             <td colspan="3"><input type="text"   name="foreign_dest" maxlength="50" value='<bean:write name="hblVO" property="foreign_dest"/>'  onBlur="strToUpper(this);" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:253px;"></td>
                         </tr>
						 <tr>
							<th><bean:message key="Doc_Pickup_On"/></th>
							<td colspan="1"><!--
                            --><input type="text" name="doc_pkup_on_dt_tm" value='<wrt:write name="hblVO" property="doc_pkup_on_dt_tm" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy"/>' onkeyPress="onlyNumberCheck();" onKeyUp="mkDateFormatType(this, event, false, 1)" onBlur="mkDateFormatType(this, event, true, 1);dateRangeValid(this, 'Doc. Pickup On');"  dataformat="excepthan" style="ime-mode:disabled;width:80px;" size='11' maxlength="10"><!--
                            --><button type="button" id="doc_pkup_on_dt_tm_cal" onclick="doDisplay('DATE1', frm1.doc_pkup_on_dt_tm);" class="calendar" tabindex="-1"></button><!--
                            --><input type="text" name="doc_pkup_on_tm"    value='<wrt:write name="hblVO" property="doc_pkup_on_tm" formatType="DATE" fromFormat="HHmm" format="HH:mm"/>' maxlength="4"  dataformat="excepthan" style="ime-mode:disabled;width:40px;" onchange="timeCheck(this);" onkeypress="onlyNumberCheck();"></td>
						  </tr>
						  <tr>
  						 	<th><bean:message key="Doc_Pickup_By"/></th>
                            <td colspan="1"><input type="text"   name="doc_pkup_by" maxlength="50" value='<bean:write name="hblVO" property="doc_pkup_by"/>'  dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:180px;"></td>
						  </tr>
                          <tr>
							  <th><bean:message key="Cargo_Released_On"/></th>
							  <td colspan="1"><!--
                            --><input type="text" name="cgo_rlsd_on_dt_tm" value='<wrt:write name="hblVO" property="cgo_rlsd_on_dt_tm" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy"/>' onkeyPress="onlyNumberCheck();" onKeyUp="mkDateFormatType(this, event, false, 1)" onBlur="mkDateFormatType(this, event, true, 1);dateRangeValid(this, 'Cargo Released On');"  dataformat="excepthan" style="ime-mode:disabled;width:80px;" size='11' maxlength="10"><!--
                            --><button type="button" id="cgo_rlsd_on_dt_tm_cal" onclick="doDisplay('DATE1', frm1.cgo_rlsd_on_dt_tm);" class="calendar" tabindex="-1"></button><!--
                            --><input type="text" name="cgo_rlsd_on_tm"    value='<wrt:write name="hblVO" property="cgo_rlsd_on_tm" formatType="DATE" fromFormat="HHmm" format="HH:mm"/>' maxlength="4"  dataformat="excepthan" style="ime-mode:disabled;width:40px;" onchange="timeCheck(this);" onkeypress="onlyNumberCheck();"></td>
						  </tr>
						  <tr>
						  	 <th><bean:message key="Cargo_Released_To"/></th>
                             <td colspan="1"><input type="text"   name="cgo_rlsd_to" maxlength="50" value='<bean:write name="hblVO" property="cgo_rlsd_to"/>'  onBlur="strToUpper(this);" dataformat="multiLanguage" style="ime-mode:disabled; text-transform:uppercase;width:180px;"></td>
						  </tr>
					</tbody>
				</table>
			</div>
		</div>
			<div class="layout_vertical_3" style="width:34%;">
				<div class="opus_design_inquiry sm" style="height:800px;">
                 	<table>
					<colgroup>
						<col width="80px"></col>
						<col width="102px"></col>
						<col width="60px"></col>
						<col width="150px"></col>
						<col width="*"></col>
					</colgroup>
					<tbody>
						<tr>
							<td colspan="2"><h3 class="title_design"><bean:message key="Account_Information"/></h3></td>
							<td></td>
							<td></td>
							<td></td>
						</tr>
						<tr>
							<th><bean:message key="Commodity"/></th>
							<td colspan="3"><!--
                            --><input type="text" name="rep_cmdt_cd" maxlength="13" value='<bean:write name="hblVO" property="rep_cmdt_cd"/>'  onKeyDown="codeNameAction('commodity',this, 'onKeyDown')" onBlur="strToUpper(this);codeNameAction('commodity',this, 'onBlur')" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:63px;"><!--
                            --><button type="button" class="input_seach_btn" tabindex="-1" id="commodity" onClick="openAiiPopUp('COMMODITY_POPLIST',this)"></button><!--
                            --><input type="text" name="rep_cmdt_nm" value='<bean:write name="hblVO" property="rep_cmdt_nm"/>' maxlength="100"  dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:150px;" onBlur="strToUpper(this);" onchange="textAdd(frm1.desc_txt, '', this.value, frm1.h_rep_cmdt_nm);"  onKeyPress="if(event.keyCode==13){openAiiPopUp('COMMODITY_POPLIST', this);}"><!--
                            --><input type="hidden" name="h_rep_cmdt_nm" value='<bean:write name="hblVO" property="rep_cmdt_nm"/>' maxlength="200"  dataformat="excepthan" style="ime-mode:disabled;width:150px;"></td>
                            <td></td>
						</tr>
                        <tr>
                            <th><bean:message key="Package"/></th>
                            <td colspan="3"><!--
                            --><input type="text" name="pck_qty" value="<bean:write name="hblVO" property="pck_qty"/>" onkeyPress="onlyNumberCheck();" onkeyup="numberCommaLen(this,7,0)" maxlength="7"  class="search_form zero_remove" dataformat="excepthan" style="ime-mode:disabled;width:92px;text-align:right"><!--
                            --><bean:define id="pckList" name="valMap" property="pckCdList"/><!--
                            --><html:select name="hblVO" property="pck_ut_cd" styleClass="search_form" style="width:150px;"><!--
                            --><option></option><!--
                            --><html:options collection="pckList" property="pck_ut_cd" labelProperty="pck_nm"/><!--
                            --></html:select></td>
                            <td></td>
                        </tr>
                        <tr>
                            <th><bean:message key="Incoterms"/></th>
							<td colspan="3"><!--
                            --><bean:define id="incotermsList" name="valMap" property="incotermsList"/><!--
                            --><html:select name="hblVO" property="inco_cd" styleClass="search_form" style="width:92px;"  ><!--
                            --><option value=""></option><!--
                            --><html:options collection="incotermsList" property="cd_val" labelProperty="cd_nm"/><!--
                            --></html:select></td>
                            <td></td>
                        </tr>
                        <tr>
							<th><bean:message key="GWeight"/></th>
							<td colspan="3"><!--
                            --><input type="text" name="grs_wgt" value="<bean:write name="hblVO" property="grs_wgt"/>" onkeyPress="onlyNumberCheck('.');" onchange="numberCommaLen(this,8,1);chkComma(this,8,1);weightChange(this);" maxlength="13" class="search_form zero_remove" dataformat="excepthan" style="ime-mode:disabled;width:92px;text-align:right;"><!--
                            --><input type="text" name="grs_wgt_ut_cd" value="KG" style="width:62px;border:0;background-color:transparent;" readOnly tabindex="1"><!--
                            --><input type="text" name="grs_wgt1" value="<bean:write name="hblVO" property="grs_wgt1"/>" onkeyPress="onlyNumberCheck('.');" onchange="numberCommaLen(this,8,1);chkComma(this,8,1);weightChange(this);" maxlength="13" class="search_form zero_remove" dataformat="excepthan" style="ime-mode:disabled;width:85px;text-align:right;"><!--
                            --><input type="text" name="grs_wgt_ut_cd1" value="LB" style="width:30px;border:0;background-color:transparent;" readOnly tabindex="2"></td>
                            <td></td>
						</tr>
						<tr>
							<th><bean:message key="Chargeable_Weight"/></th>
							<td colspan="3"><!--
                            --><input type="text" name="chg_wgt" value="<bean:write name="hblVO" property="chg_wgt"/>" onkeyPress="onlyNumberCheck('.');" onchange="numberCommaLen(this,8,1);chkComma(this,8,1);weightChange(this);" maxlength="13" class="search_form zero_remove" dataformat="excepthan" style="ime-mode:disabled;width:92px;text-align:right;"><!--
                            --><input type="text" name="chg_wgt_ut_cd" value="KG" style="width:62px;border:0;background-color:transparent;" readOnly tabindex="1"><!--
                            --><input type="text" name="chg_wgt1" value="<bean:write name="hblVO" property="chg_wgt1"/>" onkeyPress="onlyNumberCheck('.');" onchange="numberCommaLen(this,8,1);chkComma(this,8,1);weightChange(this);" maxlength="13" class="search_form zero_remove" dataformat="excepthan" style="ime-mode:disabled;width:85px;text-align:right;"><!--
                            --><input type="text" name="chg_wgt_ut_cd1" value="LB" style="width:30px;border:0;background-color:transparent;" readOnly tabindex="2"><!--
                            --><input type="hidden" name="vol_wgt" value=""/><!--
                            --><input type="hidden" name="vol_meas" value=""/></td>
                            <td></td>
						</tr>
						<tr>
							<th><bean:message key="Tariff_Currency_Code"/></th>
                            <td><!--
                            --><bean:define id="currCdList" name="valMap" property="currCdList"/><!--
                            --><html:select name="hblVO" property="curr_cd" styleClass="search_form" style="width:92px;"><!--
                            --><html:options collection="currCdList" property="cd_val" labelProperty="cd_nm"/><!--
                            --></html:select><!--
                            --><input type="hidden" name="h_curr_cd" value="<bean:write name="hblVO" property="curr_cd"/>"></td>
                            <th><bean:message key="Freight"/></th>
                            <td><!-- 
                            --><bean:define id="frtList" name="valMap" property="frtCdList"/><!--
                            --><html:select name="hblVO" property="frt_term_cd" styleClass="search_form" style="width:85px;"><!--
                            --><html:options collection="frtList" property="cd_val" labelProperty="cd_nm"/></html:select></td>
                            <td></td>
						</tr>
					</tbody>
				</table>
			<div class="opus_design_grid">
			    <input type="hidden" name="size_ut_cd1" value="<bean:write name="hblVO" property="size_ut_cd"/>"/>
		   		<input type="radio" name="size_ut_cd" id="size_ut_cd2" value="CM" onClick="javascript:chkSizeType();"><label for="size_ut_cd2"><bean:message key="Cm"/></label>&nbsp;
		   		<input type="radio" name="size_ut_cd" id="size_ut_cd3" value="INCH" onClick="javascript:chkSizeType();" checked><label for="size_ut_cd3"><bean:message key="Inch"/></label>
		   		
		   	   <div class="opus_design_btn"><!--
                         --><button type="button" class="btn_normal" onClick="setSizeUp(docObjects[7], 210)"><bean:message key="Plus"/></button><!--
                         --><button type="button" class="btn_normal" onClick="setSizeDown(docObjects[7], 120)"><bean:message key="Minus"/></button><!--
                         --><button type="button" class="btn_normal" onClick="whRcptOpenPopUp2('AI')"><bean:message key="W/H"/></button><!--
                         --><input type="hidden" name="wh_recp_no" value="<bean:write name="hblVO" property="wh_recp_no"/>"><!--
                         --><button type="button" class="btn_normal"onClick="javascript:gridAdd(7);"><bean:message key="Add"/></button></div>
                <!-- OFVFOUR-7654[PQC][OIH B/L Entry] The system is broken when opening UI -->
                <span class = "clear"></span>        
				<script language="javascript">comSheetObject('sheet4');
				/* 속도개선  */
				comConfigSheet(docObjects[7], SYSTEM_FIS);
				initSheet(docObjects[7], (7+1) );
				comEndConfigSheet(docObjects[7]);					
				</script>
			</div>
				<table>
					<colgroup>
						<col width="80px"></col>
						<col width="102px"></col>
						<col width="60px"></col>
						<col width="150px"></col>
						<col width="*"></col>
					</colgroup>
					<tbody>
						<!-- tr>
                            <th><bean:message key="Surrender"/></th>
                            <td colspan="3">
                            	<bean:define id="srdList" name="valMap" property="srdCdList"/>
                            	<html:select name="hblVO" property="srd_flg" styleClass="search_form" style="width:110px;">
                            	<html:options collection="srdList" property="cd_val" labelProperty="cd_nm"/>
                            	</html:select></td>
                            <td></td>
                        </tr> -->
                        <tr>
                             <th><bean:message key="Sales_Type"/></th>
                             <td><!--
                            --><bean:define id="slsList" name="valMap" property="slsCdList"/><!--
                            --><html:select name="hblVO" property="nomi_flg" styleClass="input1" style="width:110px;" onchange="changeSalesType();"><!--
                            --><html:options collection="slsList" property="cd_val" labelProperty="cd_nm"/><!--
                            --></html:select></td>
                             <th><bean:message key="Ship_Type"/></th>
							 <td><!--
                            --><bean:define id="shpList" name="valMap" property="shpCdList"/><!--
                            --><html:select name="hblVO" property="shp_tp_cd" styleClass="search_form" style="width:80px;"><!--
                            --><html:options collection="shpList" property="cd_val" labelProperty="cd_nm"/><!--
                            --></html:select></td>
                            <td></td>
                        </tr>
                        <tr>
                             <th><bean:message key="LC_No"/></th>
                             <td colspan="3"><!--
                            --><input type="text" name="lc_no" maxlength="40" value='<bean:write name="hblVO" property="lc_no"/>'  onBlur="strToUpper(this);" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:203px;"><!--
                            --></td>
                            <td></td>
						</tr>
						<tr>
                             <th><bean:message key="Invoice_No"/></th>
                             <td colspan="3"><input type="text" name="inv_no" maxlength="50" value='<bean:write name="hblVO" property="inv_no"/>'  onBlur="strToUpper(this);" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:203px;"></td>
                             <td></td>
                        </tr>
						<tr>
							<th><bean:message key="PO_No"/></th>
                            <td colspan="3"><input type="text" name="po_no" maxlength="40" value='<bean:write name="hblVO" property="po_no"/>'  onBlur="strToUpper(this);" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:203px;"></td>
                            <td></td>
						</tr>
						<tr>
                            <th><bean:message key="Country_of_Origin"/></th>
			                <td colspan="3"><!--
                            --><input name="cnt_cd" type="text"  dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:50px;" maxlength="2" onKeyDown="codeNameAction('country',this, 'onKeyDown')" onBlur="strToUpper(this);codeNameAction('country',this, 'onBlur')" value="<bean:write name="hblVO" property="cnt_cd"/>"><!--
                            --><button type="button" class="input_seach_btn" tabindex="-1" id="country" onclick="doWork('COUNTRY_POPLIST', 'I')"></button><!--
                            --><input name="cnt_nm" type="text" class="search_form-disable" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:120px;text-align:left" onBlur="strToUpper(this);" value="<bean:write name="hblVO" property="cnt_nm"/>" onchange="" readOnly></td>
                            <td></td>
						</tr>
						<tr>
							<th><bean:message key="Trucker"/></th>
							<td colspan="3"><!--
                            --><input type="text" name="trk_trdp_cd" maxlength="20" value='<bean:write name="hblVO" property="trk_trdp_cd"/>' onKeyDown="codeNameAction('trdpCode_trk',this, 'onKeyDown')" onBlur="strToUpper(this);codeNameAction('trdpCode_trk',this, 'onBlur')"  dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:50px;"><!--
                            --><button type="button" class="input_seach_btn" tabindex="-1" id="trk" onClick="openAiiPopUp('LINER_POPLIST',this)"></button><!--
                            --><input type="text"   name="trk_trdp_nm" maxlength="50" value='<bean:write name="hblVO" property="trk_trdp_nm"/>' onblur="strToUpper(this)"  dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:120px;" onKeyPress="if(event.keyCode==13){openAiiPopUp('LINER_POPLIST', document.getElementById('trk'), frm1.trk_trdp_nm.value);}"><!--
                            --><input type="hidden" name="trk_trdp_addr" value='<bean:write name="hblVO" property="trk_trdp_addr"/>'></td>
                            <td></td>
			            </tr>
			            <!-- #657 [OCEAN BLUE, IMPEX] B/L SELECTION FLAG TO SHOW ON VISIBILITY PORTAL -->
			            <tr>
			            	<th><bean:message key="Internal"/></th>
                          	<td colspan="3"><!-- 
                          	--><input type="checkBox" name="inter_use_flag" id="inter_use_flag" value="<bean:write name="hblVO" property="inter_use_flag"/>" onclick="flgChange(this);"><!--
                         	--></td>
                        </tr>
                     </tbody>
                 </table>
                 <h3 style="margin-bottom:0" class="title_design mar_top_8"><bean:message key="Management"/></h3>
                 <table>
                        <tr>
                             <th><bean:message key="Date_issued"/></th>
                             <td><!--
                            --><input type="text" name="bl_iss_dt" value="<wrt:write name="hblVO" property="bl_iss_dt" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy"/>"  onkeyPress="onlyNumberCheck();" onKeyUp="mkDateFormatType(this, event, false, 1)" onBlur="mkDateFormatType(this, event, true, 1);dateRangeValid(this, 'Date Issued');" dataformat="excepthan" style="ime-mode:disabled;width:80px;" size='11' maxlength="10"><!--
                            --><button type="button" id="bl_iss_dt_cal" onclick="doDisplay('DATE1' ,frm1.bl_iss_dt);" class="calendar" tabindex="-1"></button></td>
                             <th><bean:message key="Issued_By"/></th>
                             <td colspan="4"><!--
                            --><input type="text"   name="opr_usrid" value="<bean:write name="hblVO" property="issued_by"/>" class="search_form-disable" readOnly style="width:80px;"><!--
                            --><button type="button" class="input_seach_btn" tabindex="-1" id="oprBtn" onClick="openAiiPopUp('OPR_POPLIST',this)"></button><!--
                            --><input type="hidden" name="opr_usrnm"   value="<bean:write name="hblVO" property="proc_usrnm"/>"><!--
                            --><input type="hidden" name="opr_ofc_cd"  value="<bean:write name="hblVO" property="proc_ofccd"/>"><!--
                            --><input type="hidden" name="opr_dept_cd" value="<bean:write name="hblVO" property="proc_dept_cd"/>"></td>
                            <td></td>
                        </tr>	       
						<!-- OFVFOUR-7814 [AIF] ADDING TEAM INFORMATION ON THE ALL ENTRY SCREEN -->
						<tr>
							<th><bean:message key="Team_cd"/></th>
							<td>
								<input type="text" name="team_cd" readOnly style="width:110px;">
							</td>
						</tr>	       
                        <tr>
                            <th><bean:message key="Sales_OFC"/></th>
                            <td><!--
                            --><input type="text"   name="sls_ofc_cd" value="<bean:write name="hblVO" property="sls_ofc_cd"/>" class="search_form-disable" style="width:80px;" readonly><!--
                            --><button type="button" class="input_seach_btn" tabindex="-1" onClick="openAiiPopUp('OFFICE_GRID_POPLIST',this)"></button></td>
                            <th><bean:message key="Sales_PIC"/></th>
                            <td><!--
                            --><input type="text"   name="sls_usrid"  value="<bean:write name="hblVO" property="sls_usrid"/>"  class="search_form-disable" style="width:80px;" readOnly><!--
                            --><button type="button" class="input_seach_btn" tabindex="-1" id="salesperson" onClick="openAiiPopUp('USER_POPLIST',this)"></button><!--
                            --><input type="hidden" name="sls_usr_nm" value="<bean:write name="hblVO" property="sls_usr_nm"/>" class="search_form-disable" style="width:120px;" readOnly><!--
                            --><input type="hidden" name="sls_dept_cd" value="<bean:write name="hblVO" property="sls_dept_cd"/>"></td>
                            <td></td>
                        </tr>                                        
                 </table>
			</div>
 		</div>
</div>