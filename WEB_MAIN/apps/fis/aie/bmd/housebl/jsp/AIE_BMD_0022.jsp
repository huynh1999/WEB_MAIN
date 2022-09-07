<!-- opus_design_grid(S) -->
<div class="opus_design_grid">
	<h3 class="title_design mar_btm_8"><bean:message key="Rate_Combination_Point"/></h3>
	<!-- opus_design_btn(S) -->
	<div class="opus_design_btn">
		<button style="display:none;cursor:hand" type="button" class="btn_accent" name="rcpBtnObj" onClick="javascript:gridAdd(9);"		id="rcpBtnObj"><bean:message key="New"/></button>
	</div>
	<!-- opus_design_btn(E) -->
	
   <script language="javascript">comSheetObject('sheet2');</script>
</div>
<!-- opus_design_grid(E) -->

<!-- layout_wrap(S) -->
<div class= "opus_design_inquiry sm">
<div class="layout_wrap">
    <div class="layout_vertical_2 sm" style="width:530px;">
    	<table>
    		<colgroup>
    			<col width="330" />
    			<col width="" />
    		</colgroup>
				<tr>
					<td colspan="1"><h3 class="title_design">
							<bean:message key="Handling_Information" />
						</h3></td>
					<td align="right"><span id="tdCertiHndlInfo" style="display: none;">
								 <bean:define id="certiHndlInfoList" name="valMap" property="certiHndlInfoList" />
								 <html:select name="hblVO" property="certi_hndl_info" styleClass="search_form" style="width:200px;" onchange="setCertiHndlInfo();">
									<option value=""></option>
								    <html:options collection="certiHndlInfoList" property="cd_val" labelProperty="cd_nm" />
								</html:select>
								<input type="hidden" name="h_certi_hndl_info" value="<bean:write name="hblVO" property="certi_hndl_info"/>">
					</span></td>
				</tr>
				<tr>
    			<td colspan="2"><textarea name="hndl_info_txt" id="hndl_info_txt" cols="80" rows="5" maxlength="500" onkeypress="keyPress_maxLength(this);" onkeyup="keyUp_maxLength(this);" onblur="strToUpper(this);keyUp_maxLength(this);" style="width:530px;">
<bean:write name="hblVO" property="hndl_info_txt" filter="true"/></textarea></td>
    		</tr>
    		<tr>
    			<td><h3 class="title_design mar_btm_4" style="margin-bottom:0px;"><bean:message key="Mark"/></h3></td> 
    			 <td><button type="button" class="btn_etc" id="addAuto"  name="addAuto" style="cursor:hand;display:none;" onclick="addInst();"><bean:message key="Add_Instruction"/></button></td>
    		</tr>
    		<tr>
    			<td colspan="2"><textarea name="mk_txt" rows="16" maxlength="4000" onkeypress="keyPress_maxLength(this);" onkeyup="rowCount(frm1,12,rider_ocean, 'A');keyUp_maxLength(this);" onblur="strToUpper(this);keyUp_maxLength(this);" dataformat="excepthan" style="width:530px;" WRAP="off">
<bean:write name="hblVO" property="mk_txt" filter="true"/></textarea></td>
    		</tr>
    	</table>
    </div>	
    <div class="layout_vertical_2 mar_left_8 sm" style="width:calc(100% - 610px)">
    	<table>
    		<colgroup>
    			<col width="450" />
    			<col width="" />
    		</colgroup>
    		<tr>
    			<td colspan="2"><h3 class="title_design"><bean:message key="Account_Info"/></h3></td>
    		</tr>
    		<tr>
    			<td colspan="2"><textarea name="acctg_info_txt" cols="80" rows="5" maxlength="1000" onkeypress="keyPress_maxLength(this);" onkeyup="keyUp_maxLength(this);" onblur="strToUpper(this);keyUp_maxLength(this);" style="width:530px;">
<bean:write name="hblVO" property="acctg_info_txt" filter="true"/></textarea></td>
    		</tr>
    		<tr>
    			<td><h3 class="title_design mar_btm_4" style="margin-bottom:0px;"><bean:message key="Nature_and_Quantity_of_Goods"/></h3></td> 
    			<td>
    			 <button type="button" class="btn_etc" id="addAuto"  name="addAuto"  style="cursor:hand;display:none;" onclick="addInst();"><bean:message key="Add_Instruction"/></button>
    			<input tabindex="-1" type="hidden" name="rider_lbl" id="rider_lbl" value="" style="text-align:right;width:90px;border:0;background-color:transparent;"/>
    			</td>
    		</tr>
    		<tr>
    			<td ><textarea name="desc_txt" rows="16" maxlength="4000" onkeypress="keyPress_maxLength(this);" onkeyup="rowCount(frm1,12,rider_ocean, 'A');keyUp_maxLength(this);" onblur="strToUpper(this);keyUp_maxLength(this);" dataformat="excepthan" style="width:530px;" WRAP="off">
<bean:write name="hblVO" property="desc_txt" filter="true"/></textarea></td>
    			<td valign="top" ><img src="<%=CLT_PATH%>/web/img/main/Rider_Icon.gif" style="display:none;"width="45" height="42" border="0" id="rider_ocean" valign="top"></td>
    		</tr>
    	</table>
    </div>
</div>
<!-- layout_wrap(E) -->
	<div class= "opus_design_inquiry mar_top_4">
		<table>
			<colgroup>
				<col width="132" />
				<col width="150" />
				<col width="140" />
				<col width="133" />
				<col width="40" />
				<col width="*" />
			</colgroup>
			<tbody>
					<tr>
						<th><bean:message key="Show_Dimension_on"/></th>
						<td colspan=4>
							<button type="button" class="btn_etc"  name="mk_dim" id="mk_dim" onClick="searchDim('MK_DIM', this)"><bean:message key="Mark"/></button><!-- 
							 --><button type="button" class="btn_etc" name="desc_dim"  id="desc_dim" onClick="searchDim('DESC_DIM', this)"><bean:message key="Description"/></button><!-- 
							 --><button type="button" class="btn_etc" onclick="addItemInfo(docObjects[10]);" style="width:110px"><bean:message key="Item_Information"/></button> 
							    <b><bean:message key="Show_Weight_on_BL_as"/></b> 
				      		    <bean:define id="wgtDispCdList" name="valMap" property="wgtDispCdList"/><!-- 
							 --><html:select name="hblVO" property="wgt_disp_cd" styleClass="search_form" style="width:80px;"><!-- 
							 --><html:options collection="wgtDispCdList" property="cd_val" labelProperty="cd_nm"/>
							</html:select><!-- 
							 --><input type="hidden" name="h_wgt_disp_cd" value="<bean:write name="hblVO" property="wgt_disp_cd"/>"> 
							    <b><bean:message key="ITN_No"/></b><!--  
							 --><input type="text" name="itn_no" maxlength="30" value="<bean:write name="hblVO" property="itn_no"/>" class="search_form" onblur="strToUpper(this)" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:150px;"><!-- 
			            	 --><button type="button" class="btn_etc" onClick="frm1.itn_no.value='NO EEI 30.37(A)';"><bean:message key="Auto"/></button> 
			            	    <b><bean:message key="UCR_No"/></b><!-- 
			            	  --><input type="text" name="ucr_no" maxlength="35" value="<bean:write name="hblVO" property="ucr_no"/>" class="search_form" onblur="strToUpper(this)" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:160px;">
			            </td>			            	 
					</tr>
					<tr>
						<th style="vertical-align:top; padding-top:26px" rowspan="2">
							<bean:message key="Remark_for_Manifest"/>
						</th>
			      		<td style="vertical-align:top; padding-top:26px" rowspan="2">
			      			<textarea name="rmk" maxlength="400" onkeypress="keyPress_maxLength(this);" onkeyup="keyUp_maxLength(this);" onblur="strToUpper(this);keyUp_maxLength(this);" class="search_form" dataformat="multiLanguage" style="width:404px;height:93px;">
							<bean:write name="hblVO" property="rmk" filter="true"/></textarea>
							
						</td>
						<td style="padding-left:15px">
						    	<h3 class="title_design"><bean:message key="PO_No"/></h3>
			    				<textarea name="po_no" cols="182" rows="5" maxlength="300" onblur="strToUpper(this)" onchange="textdescAdd(frm1.desc_txt, 'PO NO. : ', this.value, frm1.h_po_no);" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;font-family:TAHOMA;font-size:12px;overflow:hidden;width:260px;height:93px;resize:none;"><bean:write name="hblVO" property="po_no" filter="true"/></textarea>
			    				<input type="hidden" name="h_po_no" id="h_po_no" value='<bean:write name="hblVO" property="po_no"/>'>
						    </td>
						    <td colspan="3" style="padding-left:5px">
						    	<h3 class="title_design"><bean:message key="Item_No"/></h3>
			    				<textarea name="item_no" cols="182" rows="5" maxlength="300" style="ime-mode:disabled; text-transform:uppercase;font-family:TAHOMA;font-size:12px;overflow:hidden;width:261px;height:93px;resize:none;"></textarea>
			    				<input type="hidden" name="h_po_no" id="h_po_no" value=''>
			    				</td>						

					</tr>
			</tbody>
		</table>
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

<div class="opus_design_grid" id="mainTable">
	<h3 class="title_design" id="exDeclareTitle" name="exDeclareTitle" style="display:none;"><bean:message key="Korea_Customs_Export_Declaration"/></h3>
	<div class="opus_design_btn">
		<button type="button" class="btn_normal" name="exDeclareAdd" id="exDeclareAdd"  onClick="exDeclareRowAdd(); " style="cursor:hand;display:block;"><bean:message key="Add"/></button>
	</div>
	<script type="text/javascript">comSheetObject('sheet9');</script>
</div>
