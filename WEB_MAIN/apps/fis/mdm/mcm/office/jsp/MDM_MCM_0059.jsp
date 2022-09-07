<%--
=========================================================
*Copyright(c) 2009 CyberLogitec. All Rights Reserved.
=========================================================
=========================================================
*@FileName   : MDM_MCM_0050.jsp
*@FileTitle  : Office Code Entry > Remark3 Tab
*@Description: Warehouse Remark Tab
*@author     : Wonki Eo
*@version    : 1.0 - 08/23/2018
*@since      : 08/23/2018

*@Change history:
=========================================================
--%>
	<div class="opus_design_inquiry">
		<table>
			<colgroup>
				<col width="781"></col>
				<col width="150"></col>
				<col width="*"></col>
			</colgroup>
			<tbody>
				<tr>
					<td><h3 class="title_design" style="margin-bottom: 0;"><bean:message key="Inbound_Worksheet_Remark"/></h3></td>
					<td><!--
					--><input type="hidden"  value="Font Size" onblur="strToUpper(this);" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:70px;border:0;background-color:transparent;"><!--
					--><input type="hidden" name="h_in_wrk_sht_rmk_font_size" value="<bean:write name="ofcVO" property="in_wrk_sht_rmk_font_size"/>"><!--
					--><select name="i_in_wrk_sht_rmk_font_size" style="width:70px; display: none" OnChange=""><!--
					--><logic:iterate id="codeVO" name="fontSize"><!--
					--><option value='<bean:write name="codeVO" property="cd_val"/>'><bean:write name="codeVO" property="cd_nm"/></option><!--
					--></logic:iterate></select></td>
					<td></td>
				</tr>
				 <tr>
	                <td colspan="3"><textarea name="i_in_wrk_sht_rmk" maxlength="1000" onkeypress="keyPress_maxLength(this);" onkeyup="keyUp_maxLength(this);" onblur="strToUpper(this);" dataformat="multiLanguage" style="<%=MULTI_IMEMODE%>width:926px;height:50px"><bean:write name="ofcVO" property="in_wrk_sht_rmk"/></textarea>
        			</td>
	            </tr>
	        </tbody>
	   </table>
	</div>
	<div class="opus_design_inquiry mar_btm_8">
	   <table>
			<colgroup>
				<col width="781"></col>
				<col width="150"></col>
				<col width="*"></col>
			</colgroup>
			<tbody> 
				<tr>
					<td><h3 class="title_design mar_top_8" style="margin-bottom: 0;"><bean:message key="Inbound_Receipt_Remark"/></h3></td>
					<td><!--
					--><input type="hidden"  value="Font Size" onblur="strToUpper(this);" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:70px;border:0;background-color:transparent;"><!--
					--><input type="hidden" name="h_in_rcpt_rmk_font_size" value="<bean:write name="ofcVO" property="in_rcpt_rmk_font_size"/>"><!--
					--><select name="i_in_rcpt_rmk_font_size" style="width:70px; display: none" OnChange=""><!--
					--><logic:iterate id="codeVO" name="fontSize"><!--
					--><option value='<bean:write name="codeVO" property="cd_val"/>'><bean:write name="codeVO" property="cd_nm"/></option><!--
					--></logic:iterate></select></td>
					<td></td>
				</tr>
				 <tr>
	                <td colspan="3"><textarea name="i_in_rcpt_rmk" maxlength="1000" onkeypress="keyPress_maxLength(this);" onkeyup="keyUp_maxLength(this);" onblur="strToUpper(this);" dataformat="excepthan" style="width:926px;height:50px"><bean:write name="ofcVO" property="in_rcpt_rmk"/></textarea>
        			</td>
	            </tr>
	        </tbody>
	   </table>
	</div>
	<div class="opus_design_inquiry mar_btm_8">
	   <table>
			<colgroup>
				<col width="781"></col>
				<col width="150"></col>
				<col width="*"></col>
			</colgroup>
			<tbody>
				<tr>
					<td><h3 class="title_design mar_top_8" style="margin-bottom: 0;"><bean:message key="Outbound_DO_Remark"/></h3></td>
					<td><!--
					--><input type="hidden"  value="Font Size" onblur="strToUpper(this);" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:70px;border:0;background-color:transparent;"><!--
					--><input type="hidden" name="h_out_do_rmk_font_size" value="<bean:write name="ofcVO" property="out_do_rmk_font_size"/>"><!--
					--><select name="i_out_do_rmk_font_size" style="width:70px; display: none" OnChange=""><!--
					--><logic:iterate id="codeVO" name="fontSize"><!--
					--><option value='<bean:write name="codeVO" property="cd_val"/>'><bean:write name="codeVO" property="cd_nm"/></option><!--
					--></logic:iterate></select></td>
					<td></td>
				</tr>
				 <tr>
	                <td colspan="3"><textarea name="i_out_do_rmk" maxlength="600" onkeypress="keyPress_maxLength(this);" onkeyup="keyUp_maxLength(this);" onblur="strToUpper(this);" dataformat="excepthan" style="width:926px;height:50px"><bean:write name="ofcVO" property="out_do_rmk"/></textarea>
        			</td>
	            </tr>
	    </tbody>
	   </table>
	</div>