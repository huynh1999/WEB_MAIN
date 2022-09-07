<%--
=========================================================
*Copyright(c) 2009 CyberLogitec. All Rights Reserved.
=========================================================
=========================================================
*@FileName   : SEE_BMD_0026.jsp
*@FileTitle  : HGBL등록 > Job Visibility
*@Description:
*@author     : Kang,Jung-Gu
*@version    : 1.0 - 09/28/2009
*@since      :

*@Change history:
=========================================================
--%>
	<table width="100%" height="415" border="0" cellpadding="0" cellspacing="0">
		<tr>
			<td width="450" valign="top">
				<table width="100%" border="0" cellpadding="0" cellspacing="0">
					<tr>
			        	<td nowrap class="sub_title" width="140"><img src="<%=CLT_PATH%>/web/img/main/sub_title_arrow.gif" width="7" height="7" hspace="1"><bean:message key="Operation_Options"/></td>
			        	<td width="310"></td>
			      	</tr>
			    </table>
			    <table width="100%" border="0" cellspacing="0" cellpadding="0">
				  	<tr>
					    <td align="left" valign="top">
					        <table border="0" cellpadding="0" cellspacing="0">
					            <tr>
					                <td class="table_search_body">
					                	<input name="i_oper1_flg" id="i_oper1_flg" type="checkbox" onclick="flgChange(this);" value="<bean:write name="ofcVO" property="oper1_flg"/>"><label for="i_oper1_flg">Do not use default country code on company profile</label>
					                </td>
					            </tr>
					            <tr>
					                <td class="table_search_body">
					                	<input name="i_oper2_flg" id="i_oper2_flg" type="checkbox" onclick="flgChange(this);" value="<bean:write name="ofcVO" property="oper2_flg"/>"><label for="i_oper2_flg">Create CR/DB by Sub-Agent w/multiple HB/L(s)(OEM)</label>
					                </td>
					            </tr>
					            <tr>
					                <td class="table_search_body">
					                	<input name="i_oper3_flg" id="i_oper3_flg" type="checkbox" onclick="flgChange(this);" value="<bean:write name="ofcVO" property="oper3_flg"/>"><label for="i_oper3_flg">Do not copy ETA to Final ETA(OIM)</label>
					                </td>
					            </tr>
					            <tr>
					                <td class="table_search_body">
					                	<input name="i_oper4_flg" id="i_oper4_flg" type="checkbox" onclick="flgChange(this);" value="<bean:write name="ofcVO" property="oper4_flg"/>"><label for="i_oper4_flg">Do not use Co-Loader for Release order(OIH)</label>
					                </td>
					            </tr>
					            <tr>
					                <td class="table_search_body">
					                	<input name="i_oper5_flg" id="i_oper5_flg" type="checkbox" onclick="flgChange(this);" value="<bean:write name="ofcVO" property="oper5_flg"/>"><label for="i_oper5_flg">Always auto calculate Pcs. Weight on HAWB(AEM)</label>
					                </td>
					            </tr>
					            <tr>
					                <td class="table_search_body">
					                	<input name="i_oper6_flg" id="i_oper6_flg" type="checkbox" onclick="flgChange(this);" value="<bean:write name="ofcVO" property="oper6_flg"/>"><label for="i_oper6_flg">Round off Weight(0.5)(AEH)</label>
					                </td>
					            </tr>
					        </table>
						</td>
					</tr>
				</table>
			</td>
			<td width="450" valign="top">
				<table width="100%" border="0" cellpadding="0" cellspacing="0">
					<tr>
			        	<td nowrap class="sub_title" width="140"><img src="<%=CLT_PATH%>/web/img/main/sub_title_arrow.gif" width="7" height="7" hspace="1"><bean:message key="Accounting_Options"/></td>
			        	<td width="310"></td>
			      	</tr>
			    </table>
			    <table width="100%" border="0" cellspacing="0" cellpadding="0">
				  	<tr>
					    <td align="left" valign="top">
					        <table border="0" cellpadding="0" cellspacing="0">
					            <tr>
					                <td class="table_search_body">
					                	<input name="i_acc1_flg" id="i_acc1_flg" type="checkbox" onclick="flgChange(this);" value="<bean:write name="ofcVO" property="acc1_flg"/>"><label for="i_acc1_flg">Allow A/P Edit after closing Accounting</label>
					                </td>
					            </tr>
					            <tr>
					                <td class="table_search_body">
					                	<input name="i_acc2_flg" id="i_acc2_flg" type="checkbox" onclick="flgChange(this);" value="<bean:write name="ofcVO" property="acc2_flg"/>"><label for="i_acc2_flg">Block A/P after posting payment</label>
					                </td>
					            </tr>
					            <tr>
					                <td class="table_search_body">
					                	<input name="i_acc3_flg" id="i_acc3_flg" type="checkbox" onclick="flgChange(this);" value="<bean:write name="ofcVO" property="acc3_flg"/>"><label for="i_acc3_flg">Block CR/DB after posting payment</label>
					                </td>
					            </tr>
					            <tr>
					                <td class="table_search_body">
					                	<input name="i_acc4_flg" id="i_acc4_flg" type="checkbox" onclick="flgChange(this);" value="<bean:write name="ofcVO" property="acc4_flg"/>"><label for="i_acc4_flg">Do not ask "Print check" alert Msg.</label>
					                </td>
					            </tr>
					            <tr>
					                <td class="table_search_body">
					                	<input name="i_acc5_flg" id="i_acc5_flg" type="checkbox" onclick="flgChange(this);" value="<bean:write name="ofcVO" property="acc5_flg"/>"><label for="i_acc5_flg">Show consignee name on "Ship to" when printing invoice(Export Only)</label>
					                </td>
					            </tr>
					        </table>
						</td>
					</tr>
				</table>
<!--			
				<table width="100%" border="0" cellspacing="0" cellpadding="0">
				  	<tr>
					    <td align="left" valign="top">
					        <table border="0" cellpadding="0" cellspacing="0">
					            <tr>
					                <td width="150" nowrap class="table_search_head"><bean:message key="BL_Post_Date_Export"/></td>
					                <td nowrap class="table_search_body">
					                	<input type="hidden" name="h_post_dt_exp" value="<bean:write name="ofcVO" property="post_dt_exp"/>">
						        		<select name="i_post_dt_exp" style="width:80px;" OnChange="">
						        			<logic:iterate id="codeVO" name="postDate">
				             					<option value='<bean:write name="codeVO" property="cd_val"/>'><bean:write name="codeVO" property="cd_nm"/></option>
			             					</logic:iterate>
			                           	</select>
					                </td>
					            </tr>
					        </table>
						</td>
					</tr>
				</table>
				<table width="100%" border="0" cellspacing="0" cellpadding="0">
				  	<tr>
					    <td align="left" valign="top">
					        <table border="0" cellpadding="0" cellspacing="0">
					            <tr>
					                <td width="150" nowrap class="table_search_head"><bean:message key="BL_Post_Date_Import"/></td>
					                <td nowrap class="table_search_body">
					                	<input type="hidden" name="h_post_dt_imp" value="<bean:write name="ofcVO" property="post_dt_imp"/>">
						        		<select name="i_post_dt_imp" style="width:80px;" OnChange="">
						        			<logic:iterate id="codeVO" name="postDate">
				             					<option value='<bean:write name="codeVO" property="cd_val"/>'><bean:write name="codeVO" property="cd_nm"/></option>
			             					</logic:iterate>
			                           	</select>
					                </td>
					            </tr>
					        </table>
						</td>
					</tr>
				</table>
				<table width="100%" border="0" cellspacing="0" cellpadding="0">
				  	<tr>
					    <td align="left" valign="top">
					        <table border="0" cellpadding="0" cellspacing="0">
					            <tr>
					                <td width="150" nowrap class="table_search_head"><bean:message key="Invoice_Date"/></td>
					                <td nowrap class="table_search_body">
					                	<input type="hidden" name="h_post_dt_inv" value="<bean:write name="ofcVO" property="post_dt_inv"/>">
						        		<select name="i_post_dt_inv" style="width:80px;" OnChange="">
						        			<logic:iterate id="codeVO" name="invPostDate">
				             					<option value='<bean:write name="codeVO" property="cd_val"/>'><bean:write name="codeVO" property="cd_nm"/></option>
			             					</logic:iterate>
			                           	</select>
					                </td>
					            </tr>
					        </table>
						</td>
					</tr>
				</table>
				<table width="100%" border="0" cellspacing="0" cellpadding="0">
				  	<tr>
					    <td align="left" valign="top">
					        <table border="0" cellpadding="0" cellspacing="0">
					            <tr>
					                <td width="150" nowrap class="table_search_head"><bean:message key="DC_Date"/></td>
					                <td nowrap class="table_search_body">
					                	<input type="hidden" name="h_post_dt_crdr" value="<bean:write name="ofcVO" property="post_dt_crdr"/>">
						        		<select name="i_post_dt_crdr" style="width:80px;" OnChange="">
						        			<logic:iterate id="codeVO" name="invPostDate">
				             					<option value='<bean:write name="codeVO" property="cd_val"/>'><bean:write name="codeVO" property="cd_nm"/></option>
			             					</logic:iterate>
			                           	</select>
					                </td>
					            </tr>
					        </table>
						</td>
					</tr>
				</table>
-->
			</td>
		</tr>
	</table>