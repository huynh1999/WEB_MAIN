<%--
=========================================================
*Copyright(c) 2009 CyberLogitec. All Rights Reserved.
=========================================================
=========================================================
*@FileName   : SEE_BMD_0020.jsp
*@FileTitle  : HGBL등록 > Container Tab
*@Description: Container
*@author     : Kang,Jung-Gu
*@version    : 1.0 - 09/28/2009
*@since      :

*@Change history:
=========================================================
--%>

	<div class="opus_design_inquiry mar_btm_8">
		<table>
			<colgroup>
				<col width="781"></col>
				<col width="150"></col>
				<col width="*"></col>
			</colgroup>
			<tbody>
				<tr>
					<td><h3 class="title_design" style="margin-bottom: 0;"><bean:message key="Invoice_Remark"/></h3></td>
					<td><!--
					--><input type="hidden"  value="Font Size" onblur="strToUpper(this);" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:70px;border:0;background-color:transparent;"><!--
					--><input type="hidden" name="h_inv_font_size" value="<bean:write name="ofcVO" property="inv_font_size"/>"><!--
					--><select name="i_inv_font_size" style="width:70px; display: none"><!--
					--><logic:iterate id="codeVO" name="fontSize"><!--
					--><option value='<bean:write name="codeVO" property="cd_val"/>'><bean:write name="codeVO" property="cd_nm"/></option><!--
					--></logic:iterate><!--
					--></select></td>
		        	<td></td>
				</tr>
				<tr>
	                <td colspan="3"><textarea name="i_inv_rmk" maxlength="1000" onkeypress="keyPress_maxLength(this);" onkeyup="keyUp_maxLength(this);" onblur="strToUpper(this);" dataformat="excepthan" style="width:926px;height:50px"><bean:write name="ofcVO" property="inv_rmk"/></textarea></td>
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
					<td><h3 class="title_design mar_top_8" style="margin-bottom: 0;"><bean:message key="Invoice_Remark_for_Carrier"/></h3></td>
					<td><!--
					--><input type="hidden"  value="Font Size" onblur="strToUpper(this);" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:70px;border:0;background-color:transparent;"><!--
					--><input type="hidden" name="h_inv_carr_font_size" value="<bean:write name="ofcVO" property="inv_carr_font_size"/>"><!--
					--><select name="i_inv_carr_font_size" style="width:70px; display: none" OnChange=""><!--
					--><logic:iterate id="codeVO" name="fontSize"><!--
					--><option value='<bean:write name="codeVO" property="cd_val"/>'><bean:write name="codeVO" property="cd_nm"/></option><!--
					--></logic:iterate><!--
					--></select></td>
		        	<td></td>
				</tr>
				<tr>
	                <td colspan="3"><textarea name="i_inv_carr_rmk" maxlength="1000" onkeypress="keyPress_maxLength(this);" onkeyup="keyUp_maxLength(this);" onblur="strToUpper(this);" dataformat="excepthan" style="width:926px;height:50px"><bean:write name="ofcVO" property="inv_carr_rmk"/></textarea></td>
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
					<td><h3 class="title_design mar_top_8" style="margin-bottom: 0;"><bean:message key="DC_Note_Remark"/></h3></td>
					<td><!--
					--><input type="hidden"  value="Font Size" onblur="strToUpper(this);" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:70px;border:0;background-color:transparent;"><!--
					--><input type="hidden" name="h_crdr_font_size" value="<bean:write name="ofcVO" property="crdr_font_size"/>"><!--
					--><select name="i_crdr_font_size" style="width:70px; display: none" OnChange=""><!--
					--><logic:iterate id="codeVO" name="fontSize"><!--
					--><option value='<bean:write name="codeVO" property="cd_val"/>'><bean:write name="codeVO" property="cd_nm"/></option><!--
					--></logic:iterate><!--
					--></select></td>
		        	<td></td>
				</tr>
				<tr>
	                <td colspan="3"><textarea name="i_crdr_rmk" maxlength="1000" onkeypress="keyPress_maxLength(this);" onkeyup="keyUp_maxLength(this);" onblur="strToUpper(this);" dataformat="excepthan" style="width:926px;height:50px"><bean:write name="ofcVO" property="crdr_rmk"/></textarea>
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
					<td><h3 class="title_design mar_top_8" style="margin-bottom: 0"><bean:message key="Customer_Statement_Remark"/></h3></td>
					<td><!--
					--><input type="hidden"  value="Font Size" onblur="strToUpper(this);" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:70px;border:0;background-color:transparent;"><!--
					--><input type="hidden" name="h_locl_stmt_font_size" value="<bean:write name="ofcVO" property="locl_stmt_font_size"/>"><!--
					--><select name="i_locl_stmt_font_size" style="width:70px; display: none" OnChange=""><!--
					--><logic:iterate id="codeVO" name="fontSize"><!--
					--><option value='<bean:write name="codeVO" property="cd_val"/>'><bean:write name="codeVO" property="cd_nm"/></option><!--
					--></logic:iterate><!--
					--></select></td>
		        	<td></td>
				</tr>
				<tr>
	                <td colspan="3"><textarea name="i_locl_stmt_rmk" maxlength="1000" onkeypress="keyPress_maxLength(this);" onkeyup="keyUp_maxLength(this);" onblur="strToUpper(this);" dataformat="excepthan" style="width:926px;height:50px"><bean:write name="ofcVO" property="locl_stmt_rmk"/></textarea>
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
					<td><h3 class="title_design mar_top_8" style="margin-bottom: 0;"><bean:message key="Agent_Statement_Remark"/></h3></td>
					<td><!--
					--><input type="hidden"  value="Font Size" onblur="strToUpper(this);" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:70px;border:0;background-color:transparent;"><!--
					--><input type="hidden" name="h_agent_stmt_font_size" value="<bean:write name="ofcVO" property="agent_stmt_font_size"/>"><!--
					--><select name="i_agent_stmt_font_size" style="width:70px; display: none" OnChange=""><!--
					--><logic:iterate id="codeVO" name="fontSize"><!--
					--><option value='<bean:write name="codeVO" property="cd_val"/>'><bean:write name="codeVO" property="cd_nm"/></option><!--
					--></logic:iterate><!--
					--></select></td>
		        	<td></td>
				</tr>
				<tr>
	                <td colspan="3"><textarea name="i_agent_stmt_rmk" maxlength="1000" onkeypress="keyPress_maxLength(this);" onkeyup="keyUp_maxLength(this);" onblur="strToUpper(this);" dataformat="excepthan" style="width:926px;height:50px"><bean:write name="ofcVO" property="agent_stmt_rmk"/></textarea>
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
					<td><h3 class="title_design mar_top_8" style="margin-bottom: 0;"><bean:message key="BL_Dock_Receipt_Remarks"/></h3></td>
					<td><!--
					--><input type="hidden"  value="Font Size" onblur="strToUpper(this);" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:70px;border:0;background-color:transparent;"><!--
					--><input type="hidden" name="h_agent_stmt_font_size" value="<bean:write name="ofcVO" property="agent_stmt_font_size"/>"><!--
					--><select name="i_agent_stmt_font_size" style="width:70px; display: none" OnChange=""><!--
					--><logic:iterate id="codeVO" name="fontSize"><!--
					--><option value='<bean:write name="codeVO" property="cd_val"/>'><bean:write name="codeVO" property="cd_nm"/></option><!--
					--></logic:iterate><!--
					--></select></td>
		        	<td></td>
				</tr>
				<tr>
	                <td colspan="3"><textarea name="i_dock_rcpt_rmk" maxlength="1000" onkeypress="keyPress_maxLength(this);" onkeyup="keyUp_maxLength(this);" onblur="urlRemark(this);" style="width:926px;height:100px;text-transform:none;"><bean:write name="ofcVO" property="dock_rcpt_rmk"/></textarea>
        			</td>
	            </tr>
			</tbody>
		</table>
	</div>
