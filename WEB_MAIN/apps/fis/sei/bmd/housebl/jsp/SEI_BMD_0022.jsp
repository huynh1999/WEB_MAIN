<%--
=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : SEI_BMD_0022.jsp
*@FileTitle  : 
*@author     : CLT
*@version    : 1.0
*@since      : 2014/08/13
=========================================================
--%>
<div class= "opus_design_inquiry sm">
  	<table>
  		<colgroup>
  			<col width="50" />
  			<col width="50" />
  			<col width="50" />
  			<col width="50" />
  			<col width="50" />
  			<col width="50" />
  			<col width="50" />
  			<col width="*"/>
  		</colgroup>
  		<tbody>
  			<tr>
	  			<th><bean:message key="IT_No"/></th>
				<td id="ashipper"> 
					<input tabindex="1" type="text" name="it_no" value="<bean:write name="hblVO" property="it_no"/>" class="search_form" dataformat="excepthan" style="width:129px;"  maxlength="20" onblur="strToUpper(this)" style="ime-mode:disabled; text-transform:uppercase;"><!-- 
				--><button type="button" class="btn_etc" onClick="getItNum()"  ><bean:message key="IT_No"/></button><!-- 
				--><button type="button" class="btn_etc" onClick="getMblItNo()"><bean:message key="MBL"/> <bean:message key="IT_No"/></button>
				</td>
				<th><bean:message key="Date"/></th>
				<td>
					<input tabindex="2" type="text" name="te_dt_tm" id="te_dt_tm" maxlength="10" value="<wrt:write name="hblVO" property="te_dt_tm" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy"/>" class="search_form" onKeyUp="mkDateFormatType(this, event, false, 1)" onBlur="mkDateFormatType(this, event, true, 1);dateRangeValid(this, 'Date');" dataformat="excepthan" style="ime-mode:disabled;width:100px;"><!-- 
				--><button type="button" class="calendar" tabindex="-1" name="te_dt_tm_cal" id="te_dt_tm_cal"  onclick="doDisplay('DATE1' ,frm1.te_dt_tm);" ></button>
				</td>
				<th><bean:message key="IT_Location"/></th>
				<td>
					<input tabindex="3" type="text" name="it_loc" maxlength="50" value="<bean:write name="hblVO" property="it_loc"/>" onblur="strToUpper(this)" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:129px;">
				</td>
				<th><bean:message key="TE"/></th>
				<td>
					<input tabindex="4" type="text" name="te" maxlength="20" value="<bean:write name="hblVO" property="te"/>" onblur="strToUpper(this)" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:129px;">
				</td>
			</tr>	
			<tr>
				<th><bean:message key="Bond_Carrier"/></th>
				<td>
					<input tabindex="5" type="text" name="bond_carr_cd" maxlength="20" value='<bean:write name="hblVO" property="bond_carr_cd"/>' class="search_form" onKeyDown="codeNameAction('trdpCode_bond',this, 'onKeyDown')" onBlur="strToUpper(this);codeNameAction('trdpCode_bond',this, 'onBlur')" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:129px;"><!-- 
				--><button type="button" name="bond" id="bond" class="input_seach_btn" tabindex="-1" onClick="openSeiPopUp('LINER_POPLIST',this)"></button><!-- 
				--><input tabindex="6" type="text" name="bond_carr_nm" maxlength="50" value='<bean:write name="hblVO" property="bond_carr_nm"/>' class="search_form-disable" dataformat="excepthan" style="ime-mode:disabled;width:113px;text-transform:uppercase;" onblur="strToUpper(this)"   onKeyPress="if(event.keyCode==13){openSeiPopUp('LINER_POPLIST', document.getElementById('bond'), frm1.bond_carr_nm.value);}">
				</td>
				<th><bean:message key="Bond_Number"/></th>
				<td>
					<input tabindex="7" type="text" name="bond_no" maxlength="20" value="<bean:write name="hblVO" property="bond_no"/>" class="search_form" onblur="strToUpper(this)"  dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:129px;">
				</td>
				<th><bean:message key="Goods_Now_at"/></th>
				<td>
					<input tabindex="8" type="text" name="goods_at" maxlength="50" value="<bean:write name="hblVO" property="goods_at"/>" onblur="strToUpper(this)" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:129px;">
				</td>
				<th><bean:message key="Value_of_Goods"/></th>
				<td>
					<input tabindex="9" type="text" name="goods_value" maxlength="50" value="<bean:write name="hblVO" property="goods_value"/>" onblur="strToUpper(this)" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:129px;">
				</td>
			</tr>
			<tr>
				<th><bean:message key="CCN"/></th>
				<td>
					<input tabindex="10" type="text" name="ccn_no" maxlength="30"  onBlur="strToUpper(this);" value='<bean:write name="hblVO" property="ccn_no"/>' class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:222px;"><!-- 
				--><button type="button" id="ashipper" class="btn_etc" onClick="getCcnNum()"  ><bean:message key="CCN"/></button>
				</td>
				<th><bean:message key="Date"/></th>
				<td colspan="5">
					<input tabindex="11" type="text" name="ccn_dt" id="ccn_dt" maxlength="10" value="<wrt:write name="hblVO" property="ccn_dt" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy"/>" class="search_form" onKeyUp="mkDateFormatType(this, event, false, 1)" onBlur="mkDateFormatType(this, event, true, 1);dateRangeValid(this, 'Date');" dataformat="excepthan" style="ime-mode:disabled;width:100px;"><!-- 
				--><button type="button" class="calendar" tabindex="-1" name="ccn_dt_cal" id="ccn_dt_cal"  onclick="doDisplay('DATE1' ,frm1.ccn_dt);" ></button>
				</td>
			</tr>
			<tr>
				<th><bean:message key="PCCN"/></th>
				<td>
					<input tabindex="12" type="text" name="pre_ccn_no" maxlength="30" onBlur="strToUpper(this);" value='<bean:write name="hblVO" property="pre_ccn_no"/>' class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:275px;">
				</td>
				<th><bean:message key="Manifest_From"/></th>
				<td colspan="2">
					<input tabindex="13" type="text" name="mnf_fr_loc" maxlength="20" onBlur="strToUpper(this);" value="<bean:write name="hblVO" property="mnf_fr_loc"/>" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:250px;">
				</td>
				<td colspan="3">
					&nbsp;&nbsp;&nbsp;&nbsp;<b><bean:message key="To_A"/></b>&nbsp;
					<input tabindex="14"  type="text" name="mnf_to_loc" maxlength="20" onBlur="strToUpper(this);" value="<bean:write name="hblVO" property="mnf_to_loc"/>" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:250px;">
				</td>
			</tr>
  		</tbody>
  	</table>
</div>
<!-- layout_wrap(S) -->
<div class= "opus_design_inquiry sm">
<div class="layout_wrap">
    <div class="layout_vertical_2 sm" style="width: 445px; height:70px;">
   		<table>
   		<colgroup>
 			<col width="385" />
 			<col width="*"/>
  		</colgroup>
  		<tbody>
	    	 	<tr>
	    	 		<td class ="pad_btm_4"><h3 class="title_design"><bean:message key="Said"/></h3></td>
	    	 		<td><button type="button" class="btn_etc" name="sadAuto" id="sadAuto" onclick="mkSaidTxt(docObjects[1], frm1.sad_txt);" style="cursor:hand;display:inline;"><bean:message key="Auto"/></button></td>
	    	 	</tr>
		</tbody>
	   	</table>
	   	<table>
   		<colgroup>
 			<col width="50" />
 			<col width="*"/>
  		</colgroup>
  		<tbody>
	    	 	<tr>
	    	 		<td ><textarea tabindex="15"  name="sad_txt" rows="2" maxlength="200" onblur="strToUpper(this);keyUp_maxLength(this);" dataformat="excepthan" style="width:430px;" onkeyup="keyUp_maxLength(this);">
<bean:write name="hblVO" property="sad_txt" filter="true"/></textarea></td>
	    	 		<td></td>
	    	 	</tr>
	    	 </tbody>
    	</table>	
    </div>
    <div class="layout_vertical_2 sm mar_left_8" style="height:70px;width:620px;">
   		<table>
   		<colgroup>
			<col width="385" />
			<col width="*"/>
  		</colgroup>
  		<tbody>
	  		<tr>
	    	 	<td class ="pad_btm_4"><h3 class="title_design"><bean:message key="Say"/></h3></td>
		    	<td><button type="button" class="btn_etc" name="mkSayAuto" id="mkSayAuto" onclick="mkSayTxt(docObjects[1], frm1.say_txt, frm1.intg_bl_seq.value, 'I');" style="cursor:hand;display:inline;"><bean:message key="Auto"/></button></td>
	 		</tr>
	 	</tbody>
	 </table>
	 <table>
   		<colgroup>
 			<col width="50" />
 			<col width="*"/>
  		</colgroup>
  		<tbody>
	   		<tr>
	 			<td><input type="text" tabindex="16"  name="say_txt" value='<bean:write name="hblVO" property="say_txt" filter="true"/>' maxlength="200" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:430px;resize:none;height:30px;" onblur="strToUpper(this)"></td>
				<td></td>
			</tr>
		</tbody>
 		</table>	
    </div>
</div>
<!-- layout_wrap(E) -->
	<!-- OFVFOUR-8085: [Lever Logistics] OIH B/L - Custom Clerance Port/Date -->
	<div class="layout_wrap sm">
		<h3 class="title_design"><bean:message key="Customs_Clearance"/></h3>
		<table>
			<colgroup>
				<col width="109" />
				<col width="50" />
				<col width="50" />
				<col width="50" />
				<col width="*" />
			</colgroup>
			<tbody>
			<tr>
				<th><bean:message key="Port"/>/<bean:message key="Date"/></th>
				<td>
					<input type="text" name="cstms_clr_port_cd" maxlength="5"  value='<bean:write name="hblVO" property="cstms_clr_port_cd"/>' class="search_form" onKeyDown="codeNameAction('Location_cstms_clr',this, 'onKeyDown','S')" onBlur="strToUpper(this);codeNameAction('Location_cstms_clr',this, 'onBlur','S')" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:75px;"><!--
							--><button type="button" name="cstms_clr_port" id="cstms_clr_port" class="input_seach_btn" tabindex="-1" onClick="openSeiPopUp('LOCATION_POPLIST',this)"></button><!--
							--><input type="text" name="cstms_clr_port_nm" maxlength="50" value='<bean:write name="hblVO" property="cstms_clr_port_nm"/>' class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:138px;text-transform:uppercase;" onblur="strToUpper(this)" onKeyPress="if(event.keyCode==13){openSeiPopUp('LOCATION_POPLIST', document.getElementById('cstms_clr_port'), frm1.cstms_clr_port_nm.value);}"><!--
						    --><input type="text" name="cstms_clr_dt" id="cstms_clr_dt" maxlength="10" value='<wrt:write name="hblVO" property="cstms_clr_dt" formatType="DATE" fromFormat="yyyyMMdd" format="MM-dd-yyyy"/>' onKeyUp="mkDateFormatType(this, event, false, 1)" onBlur="mkDateFormatType(this, event, true, 1);" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:70px;" size='10'><!--
							--><button type="button" class="calendar" tabindex="-1" name="cstms_clr_date_cal" id="cstms_clr_date_cal"  onclick="doDisplay('DATE1', frm1.cstms_clr_dt);" ></button>
				</td>
				<th></th>
				<td></td>
				<td></td>
			</tr>
			</tbody>
		</table>
	</div>

<!-- layout_wrap(S) -->
<div class="layout_wrap">
    <div class="layout_vertical_4 sm" style="width:201px;margin-top:8px;height:280px;">
    	 <h3 class="title_design"><bean:message key="Mark"/></h3>	
   		<table>
    	 	<tr>
    	 		<td>
    	 			<textarea tabindex="17" name="mk_txt" maxlength="4000" rows="16" onblur="strToUpper(this);" dataformat="excepthan" style="width:191px;" WRAP="off" onkeyup="rowCount(frm1,10,rider_ocean);">
<bean:write name="hblVO" property="mk_txt" filter="true"/></textarea>
    	 		</td>
    	 	</tr>
   		 </table>	
        
    </div>
    <div class="layout_vertical_4 sm mar_left_8" style="width:360px;margin-top:8px;height:280px;">
    	 <h3 class="title_design"><bean:message key="Description"/></h3>	
    		<table>
	    	 	<tr>
	    	 		<td>
	    	 			<input type="hidden" name="rider_lbl" id="rider_lbl" value="" style="resize:none;text-align:right;width:200px;border:0;background-color:transparent;"/>
	    	 			<textarea tabindex="18" name="desc_txt" maxlength="4000" rows="16" onblur="strToUpper(this);" dataformat="excepthan" style="resize:none;ime-mode:disabled; text-transform:uppercase;font-family:TAHOMA;font-size:12px;overflow:scroll;width:351px;" WRAP="off" onkeyup="rowCount(frm1,10,rider_ocean);">
<bean:write name="hblVO" property="desc_txt" filter="true"/></textarea>
	    	 		</td>
	    	 	</tr>
    		 </table>	
    </div>
    
    <div class="layout_vertical_4 sm mar_left_8" style="margin-top:8px;height:280px;width:495px;">
    		<table>
					
		    	 	<tr>
	    	 			<h3 class="title_design"><bean:message key="Internal_Remark"/></h3>
					</tr>    	 				
	    	 		<tr>
	    	 			<textarea tabindex="19" name="rmk" rows="8" onblur="strToUpper(this);" class="search_form" style="ime-mode:auto;width:300px;"><bean:write name="hblVO" property="rmk" filter="true"/></textarea>
	    	 		</tr>
		    	 	<tr>
						<h3 class="title_design"><bean:message key="PO_No"/></h3>
					</tr>
					<tr>
						<textarea tabindex="20" name="po_no" rows="7" onblur="strToUpper(this);" dataformat="excepthan" class="search_form" style="ime-mode:disabled;text-transform:uppercase;width:300px;height:103px"><bean:write name="hblVO" property="po_no"/></textarea>
		    	 	</tr>
    		 </table>	
    </div>
    
    <div class="layout_vertical_4" style="width:30px;">
   		<table>
    	 	<tr><td><img src="<%=CLT_PATH%>/web/img/main/Rider_Icon.gif" style="display:none" width="45" height="42" border="0" id="rider_ocean" valign="top"/></td></tr>
   		 </table>	
   	</div>
   
</div>
    
    
<div class="opus_design_btn sm" style="margin-top:8px;width:1060px;">
<button type="button" class="btn_etc" style="cursor:hand;display:block;"  onclick="addCntrInfo(docObjects[1], 'M', 'OI');" ><bean:message key="Add_Container_Info"/></button>
<!-- layout_wrap(E) -->
</div> 

<div class="opus_design_inquiry sm pad_top_8" >
  <h3 class="title_design"><bean:message key="AN_PUBLIC_REMARK"/></h3>	
 <div class= "opus_design_inquiry">
 <!-- #6939 [EXEL]Could not create House ocean import -->
  <textarea tabindex="20" name="desc_txt1" maxlength="1000" rows="3" onblur="strToUpper(this);" class="search_form" style="ime-mode:auto;width:900px;" >
<bean:write name="hblVO" property="desc_txt1" filter="true"/></textarea>
 </div>
</div>
    <div class="opus_design_inquiry sm" style="width:920px;">
        <h3 class="title_design sm"><bean:message key="CFS_Remark"/></h3>
				  <textarea name="cfs_rmk" rows="3" maxlength="200" onblur="strToUpper(this);" class="search_form" style="ime-mode:auto;width:900px; height: 25px; padding-top: 4px;" >
<bean:write name="hblVO" property="cfs_rmk" filter="true"/></textarea>
    </div>
</div>				