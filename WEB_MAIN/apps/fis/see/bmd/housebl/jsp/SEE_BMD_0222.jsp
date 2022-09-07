 <div class= "opus_design_inquiry">	
  	<table>
  		<colgroup>
  			<col width="160">
  			<col width="210">
  			<col width="120">
  			<col width="60">
  			<col width="110">
  			<col width="172">
  			<col width="140">
  			<col width="*">
  		</colgroup>
  		
	</table>
</div>

<div class= "opus_design_inquiry sm">
<div class="layout_wrap" >
	    <div class="layout_vertical_2 sm" style="width:450px;height:80px">
	    	<table>
	    	<tr>
	    		<td><h3 class="title_design"><bean:message key="Said"/></h3></td>
	    		<td class="opus_design_btn"><button type="button" class="btn_etc" name="sadAuto" id="sadAuto" onclick="mkSaidTxt(docObjects[1], frm1.sad_txt);" ><bean:message key="Auto"/></button>
	    		</td>
	    	</tr>
	    	<tr>
	    		<td colspan="2">
	    			<textarea name="sad_txt" rows="2" maxlength="200" onblur="strToUpper(this);keyUp_maxLength(this);" dataformat="excepthan" style="width:440px;" onkeyup="keyUp_maxLength(this);">
<bean:write name="hblVO" property="sad_txt" filter="false"/></textarea>
	    		</td>
	    	</tr>
	    	</table>
	    </div>
	    <div class="layout_vertical_2 sm mar_left_4" style="width:450px;height:80px">
	    	<table>
	    	<tr>
	    		<td><h3 class="title_design"><bean:message key="Say"/></h3></td>
	    		<td class="opus_design_btn"><button type="button" class="btn_etc" name="mkSayAuto" id="mkSayAuto" onclick="mkSayTxt(docObjects[1], frm1.say_txt, frm1.intg_bl_seq.value, 'O');" ><bean:message key="Auto"/></button>
	    		</td>
	    	</tr>
	    	<tr>
	    		<td colspan="2">
	    			<input type="text" row="2" name="say_txt" value="<bean:write name="hblVO" property="say_txt" filter="false"/>" class="search_form" maxlength="200" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:655px;height:30px;" onblur="strToUpper(this)">
	    		</td>
	    	</tr>
	    	</table>
	    </div>
</div>

 	<table>
 		<colgroup>
 			<col width="100">
 			<col width="200">
 			<col width="100">
 			<col width="200">
 			<col width="100">
 			<col width="*">
 		</colgroup>
 		<tbody>
  		<tr>
			<th><bean:message key="GWeight"/></th>
			<td>
				<input type="text" name="mk_grs_wgt" value='<bean:write name="hblVO" property="mk_grs_wgt"/>' onkeyPress="onlyNumberCheck('.');" onchange="this.value = doMoneyFmt(this.value);" maxlength="13" class="search_form zero_remove" dataformat="excepthan" style="ime-mode:disabled;width:60px;text-align:right;"><!--  
				--><input type="text" name="mk_grs_wgt_ut_cd" value="K" style="width:20px;border:0;background-color:transparent;" readOnly tabindex="1"><!-- 
				--><input type="text" name="mk_grs_wgt1" value='<bean:write name="hblVO" property="mk_grs_wgt1"/>' onkeyPress="onlyNumberCheck('.');" onchange="this.value = doMoneyFmt(this.value);" maxlength="13" class="search_form zero_remove" dataformat="excepthan" style="ime-mode:disabled;width:60px;text-align:right;"><!-- 
				--><input type="text" name="mk_grs_wgt_ut_cd1" value="L" style="width:20px;border:0;background-color:transparent;" readOnly tabindex="2">
			</td>
			<th><bean:message key="Measurement"/></th>
			<td>
				<input type="text" name="mk_meas" value='<bean:write name="hblVO" property="mk_meas"/>' onkeyPress="onlyNumberCheck('.');" onchange="this.value = doMoneyFmt(this.value);" maxlength="13" class="search_form zero_remove" dataformat="excepthan" style="ime-mode:disabled;width:79px;text-align:right;"><!-- 
				--><input type="text" name="mk_meas_ut_cd" value="CBM" style="width:40px;border:0;background-color:transparent;" readOnly tabindex="5"><!-- 
				--><input type="text" name="mk_meas1" value='<bean:write name="hblVO" property="mk_meas1"/>' onkeyPress="onlyNumberCheck('.');" onchange="this.value = doMoneyFmt(this.value);" maxlength="13" class="search_form zero_remove" dataformat="excepthan" style="ime-mode:disabled;width:79px;text-align:right;"><!-- 
				--><input type="text" name="mk_meas_ut_cd1" value="CFT" style="width:30px;border:0;background-color:transparent;" readOnly tabindex="6">
			</td>
			<th></th>
			<td></td>
		</tr>
	</tbody>
 	</table>

<div class="layout_wrap" >
	    <div class="layout_vertical_2 sm" style="width:450px">
	 		 		<table>
	    			<tr>
	    				<td><h3 class="title_design"><bean:message key="Mark"/></h3></td>
	    			</tr>
	    			<tr>
	    				<td>
	    				<textarea name="mk_txt" rows="20" maxlength="4000" cols="20" onblur="strToUpper(this);keyUp_maxLength(this);" dataformat="excepthan" style="width:440px;height:288px;" onKeyPress="keyPress_maxLength(this);" onkeyup="rowCount(frm1,15,rider_ocean);keyUp_maxLength(this);">
<bean:write name="hblVO" property="mk_txt" filter="false"/></textarea>
	    				</td>
	    			</tr>
	    			</table>
	    	
	    </div>
	    
	    <div class="layout_vertical_2 sm mar_left_4" style="width:450px">
 		 	<div class= "opus_design_inquiry">
    			<table>
	    			<tr>
	    				<td><h3 class="title_design"><bean:message key="Description"/></h3></td>
	    			</tr>
	    			<tr>
	    				<td>
	    					<input tabindex="-1" type="hidden" name="rider_lbl" value="" onblur="strToUpper(this)" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;text-align:right;width:340px;border:0;background-color:transparent;"/><!-- 
	    					--><textarea name="desc_txt1" rows="2" maxlength="800" onblur="strToUpper(this);keyUp_maxLength(this);" dataformat="excepthan" style="width:440px;" onkeyup="rowCount(frm1,2,rider_ocean);keyUp_maxLength(this);">
<bean:write name="hblVO" property="desc_txt1" filter="false"/></textarea>
	    				</td>
	    			</tr>
	    			<tr>
	    				<td><textarea name="desc_txt" rows="17" maxlength="4000" onKeyPress = "keyPress_maxLength(this);" onblur="strToUpper(this);keyUp_maxLength(this);" dataformat="excepthan" style="width:440px;height:250px;" WRAP="off" onkeyup="rowCount(frm1,15,rider_ocean);keyUp_maxLength(this);">
<bean:write name="hblVO" property="desc_txt" filter="false"/></textarea>
	    				</td>
	    			</tr>
    			</table>
	    	</div>
	    </div>
	    
	    <div class="layout_vertical_2 sm mar_left_4" style="width:300px">
 		 	<div class= "opus_design_inquiry">
	    			<table> 
		    			<tr>
                            <td> 
                                <img src="<%=CLT_PATH%>/web/img/main/Rider_Icon.gif" style="display:none;"width="45" height="42" border="0" id="rider_ocean" valign="top" />
                            </td>
                        </tr> 
                        <tr>
	                        <td valign="top" height="250px;">
	                            <textarea name="clean_on_board" rows="8" maxlength="200" onkeypress="keyPress_maxLength(this);" onkeyup="keyUp_maxLength(this);"  onblur="strToUpper(this);descChk(this,40);keyUp_maxLength(this);" dataformat="excepthan" style="width:200px;" WRAP="off" ></textarea>
	                            <input type="hidden" name="h_clean_on_board" value="<bean:write name="hblVO" property="clean_on_board"/>">
	                        </td>
	                    </tr>
	    			</table>
	    	</div>
	    </div>
</div>


<div class="layout_wrap">
	    <div class="layout_vertical_2 sm" style="width:650px">
	    	<table>
	    	<colgroup>
	    		<col width="150px">
	    		<col width="150px">
	    		<col width="*">
	    	</colgroup>
	    		<tr>	
		  			<td>
		  			<button type="button" class="btn_etc" onclick="addCntrInfo(docObjects[1], 'H', 'OE');"><bean:message key="Add_Container_Info"/></button>
					</td>
					<th><bean:message key="Show_Weight_on_BL_as"/></th>
		      		<td>
			      		<bean:define id="wgtDispCdList" name="valMap" property="wgtDispCdList"/>
						<html:select name="hblVO" property="wgt_disp_cd" styleClass="search_form" style="width:117px;">
							<html:options collection="wgtDispCdList" property="cd_val" labelProperty="cd_nm"/>
						</html:select>
						<input type="hidden" name="h_wgt_disp_cd" id="h_wgt_disp_cd" value='<bean:write name="hblVO" property="wgt_disp_cd"/>'>
					</td>
				</tr>		
	    		
	    	</table>
	    </div>	   
</div>
</div>

 


