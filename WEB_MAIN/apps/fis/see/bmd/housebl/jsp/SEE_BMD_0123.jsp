<%--
=========================================================
*Copyright(c) 2009 CyberLogitec. All Rights Reserved.
=========================================================
=========================================================
*@FileName   : SEE_BMD_0123.jsp
*@FileTitle  : A.E.S 등록
*@Description: A.E.S 등록 및 조회
*@author     : PJK
*@version    : 1.0 - 11/14/2011
*@since      :

*@Change history:
=========================================================
--%>
	<div class="opus_design_inquiry">
    <div class="layout_vertical_2 sm" style="width:600px;height:300px;">
        <div class="opus_design_inquiry">
		        	<table>
		        		<tr>
		        			<td width="180px"><h3 class="title_design"><bean:message key="Export_License"/></h3></td>
		        		</tr>
						<tr>
							<th><bean:message key="License_Type"/></th>
							<td class="table_search_body"><!-- 
								 --><select name="s_licen_tp"  style="width:70px;" onchange="optChange('LICENSE_TP');"><!--
		                             --><logic:iterate id="licenseTp" name="valMap" property="licenseTpList"><!--
		                            	 --><option value="<bean:write name="licenseTp" property="cd_val"/>"><bean:write name="licenseTp" property="cd_val"/></option><!--
		                             --></logic:iterate><!--
		                         --></select><!--
								 --><input type="text" maxlength="12" name="s_licen_tp_nm" value="" class="search_form-disable" style="width:230px;" readOnly><!--
								 --><input type="hidden" name="s_h_licen_tp" value="<bean:write name="hblVO" property="licen_tp"/>">
							</td>
			            </tr>
			            <tr>
							<th><bean:message key="License_No"/></th>
							<td class="table_search_body"><input type="text"  maxlength="12" name="s_licen_no" value="<bean:write name="hblVO" property="licen_no"/>"  onblur="strToUpper(this)"   dataformat="excepthan" style="ime-mode:disabled;width:190px;text-transform:uppercase;"></td>
						</tr>
						<tr>
							<th><bean:message key="DDTC_ITAR_Exemption_No"/></td>
							<td><input type="text"  maxlength="12"  name="s_ddtc_itar_no" value="<bean:write name="hblVO" property="ddtc_itar_no"/>"  onblur="strToUpper(this)"   dataformat="excepthan" style="ime-mode:disabled;width:190px;text-transform:uppercase;"></td>
						</tr>
						
						<tr>
							<th><bean:message key="ECCN_No"/></th>
							<td><input type="text"  maxlength="5"  name="s_eccn_no" value="<bean:write name="hblVO" property="eccn_no"/>"  onblur="strToUpper(this)"   dataformat="excepthan" style="ime-mode:disabled;width:190px;text-transform:uppercase;"></td>
						</tr>
						
						<tr>
							<th><bean:message key="DDTC_USML_Category"/></th>
							<td><!-- 
								 --><select name="s_ddtc_usml_cd"  style="width:70px;" onchange="optChange('DDTC_USML');"><!--
									 --><option value=""></option><!--
		                            --><logic:iterate id="ddtcUsmlCd" name="valMap" property="ddtcUsmlCdList"><!--
		                             --><option value="<bean:write name="ddtcUsmlCd" property="cd_val"/>"><bean:write name="ddtcUsmlCd" property="cd_val"/></option><!--
		                            --></logic:iterate><!--
		                         --></select><!--
								 --><input type="text" name="s_ddtc_usml_nm" value="" class="search_form-disable" style="width:230px;" readOnly><!--
								 --><input type="hidden" name="s_h_ddtc_usml_cd" value="<bean:write name="hblVO" property="ddtc_usml_cd"/>">
							</td>
			            </tr>
			            
			            <tr>
							<th><bean:message key="DDTC_Registration_No"/></th>
							<td><input type="text"   maxlength="6"  name="s_ddtc_regi_no" value="<bean:write name="hblVO" property="ddtc_regi_no"/>"  onblur="strToUpper(this)"   dataformat="excepthan" style="ime-mode:disabled;width:190px;text-transform:uppercase;"></td>
						</tr>
						
						<tr>
							<th><bean:message key="DDTC_Qty_Unit"/></th>
							<td><!-- 
								 --><input type="text"  maxlength="3"  name="s_ddtc_pck_qty" value="<bean:write name="hblVO" property="ddtc_pck_qty"/>"  onblur="strToUpper(this)"   dataformat="excepthan" style="ime-mode:disabled;width:70px;text-transform:uppercase;text-align:right;"><!--
		                           --><select name="s_ddtc_pck_ut_cd"  style="width:70px;" onchange="optChange('DDTC_UNIT');"><!--
		                             --><option value=""></option><!--
		                          		 --><logic:iterate id="ddtcUtCd" name="valMap" property="ddtcUtCdList"><!--
		                          		 --><option value="<bean:write name="ddtcUtCd" property="cd_val"/>"><bean:write name="ddtcUtCd" property="cd_val"/></option><!--
		                          		 --></logic:iterate><!--
		                         	 --></select><!--
								 --><input type="text" name="s_ddtc_pck_ut_nm" value="" class="search_form-disable" style="width:155px;" readOnly><!--
								 --><input type="hidden" name="s_h_ddtc_pck_ut_cd" value="<bean:write name="hblVO" property="ddtc_pck_ut_cd"/>">
							</td>
			            </tr>
			            <tr>
							<th><bean:message key="DDTC_Eligible_Party_Certification_Indicator"/></th>
							<td><!-- 
		                         --><select name="s_ddtc_prty_certi_flg"  style="width:70px;"><!--
		                        	 --><logic:iterate id="ynCd" name="valMap" property="ynCdList"><!--
		                        		 --><option value="<bean:write name="ynCd" property="cd_val"/>"><bean:write name="ynCd" property="cd_nm"/></option><!--
		                        	 --></logic:iterate><!--
		                       	 --></select><!--
		                       	 --><input type="hidden" name="s_h_ddtc_prty_certi_flg" value="<bean:write name="hblVO" property="ddtc_prty_certi_flg"/>">
							</td>
			            </tr>
			            
			            <tr>
							<th><bean:message key="DDTC_Significant_Military_Equip_Indicator"/></th>
							<td><!-- 
		                         --><select name="s_ddtc_eq_flg"  style="width:70px;"><!--
		                        	 --><logic:iterate id="ynCd" name="valMap" property="ynCdList"><!--
		                        		 --><option value="<bean:write name="ynCd" property="cd_val"/>"><bean:write name="ynCd" property="cd_nm"/></option><!--
		                        	 --></logic:iterate><!--
		                       	 --></select><!--
		                       	 --><input type="hidden" name="s_h_ddtc_eq_flg" value="<bean:write name="hblVO" property="ddtc_eq_flg"/>">
							</td>
			            </tr>
					</table>
				</div>
        </div>
    
    <div class="layout_vertical_2 mar_left_8" style="height:300px;width:calc(100% - 620px)">
    	<div class="opus_design_grid">
  			<h3 class="title_design"><bean:message key="Carrier"/></h3>
   			<div class="opus_design_btn"><button type="button" class="btn_accent" onclick="doWork('ADD_ROW2')"><bean:message key="Add"/></button></div>
			<script language="javascript">comSheetObject('sheet2');</script>
			<script language="javascript">comSheetObject('sheet3');</script>
    	</div>
    </div>
    </div>
