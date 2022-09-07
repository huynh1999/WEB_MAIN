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
		<!-- tr>
			<td width="100%" valign="top">
				<table width="100%" border="0" cellpadding="0" cellspacing="0">
					<tr>
			        	<td nowrap class="sub_title" width="190"><img src="<%=CLT_PATH%>/web/img/main/sub_title_arrow.gif" width="7" height="7" hspace="1"><bean:message key="Default_AN_Public_Memo"/></td>
			        	<td width="760"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
			      	</tr>
			    </table>
			    <table width="100%" border="0" cellspacing="0" cellpadding="0">
				  	<tr>
					    <td align="left" valign="top">
					        <table border="0" cellpadding="0" cellspacing="0">
					            <tr>
					                <td class="table_search_body"><textarea name="i_dflt_an_memo" class="search_form" onblur="strToUpper(this);" dataformat="excepthan" style="width:926;height:100px"><bean:write name="ofcVO" property="dflt_an_memo"/></textarea>
				        			</td>
					            </tr>
					        </table>
						</td>
					</tr>
				</table>
			</td>
		</tr>
		<tr>
			<td>
				<table width="100%" border="0" cellspacing="0" cellpadding="0">
					<tr>
						<td height="5"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
					</tr>
				</table>
			</td>
		</tr>
		<tr>
			<td>
				<table width="100%" border="0" cellspacing="0" cellpadding="0">
					<tr>
						<td height="5"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
					</tr>
				</table>
			</td>
		</tr -->
		<tr>
			<td>
				<table width="100%" border="0" cellpadding="0" cellspacing="0">
					<tr>
						<td width="100%" valign="top">
							<table width="100%" border="0" cellpadding="0" cellspacing="0">
								<tr>
						        	<td nowrap class="sub_title" width="190"><img src="<%=CLT_PATH%>/web/img/main/sub_title_arrow.gif" width="7" height="7" hspace="1"><bean:message key="E-Mail_Signature"/></td>
						        	<td width="760"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
						      	</tr>
						    </table>
						    <table width="100%" border="0" cellspacing="0" cellpadding="0">
							  	<tr>
								    <td align="left" valign="top">
								        <table border="0" cellpadding="0" cellspacing="0">
								            <tr>
								                <td class="table_search_body"><textarea name="i_email_sign" class="search_form" onblur="strToUpper(this);" dataformat="excepthan" style="width:600;height:100px"><bean:write name="ofcVO" property="email_sign"/></textarea>
							        			</td>
								            </tr>
								        </table>
									</td>
									<td align="left" valign="top">
								        <table border="0" cellpadding="0" cellspacing="0">
								            <tr>
								                <td class="table_search_body">
								                <textarea name="i_email_sign_exam" class="search_form-disable" onblur="strToUpper(this);" dataformat="excepthan" style="width:319;height:100px;" readOnly>
[Signature Form]
Login Name : $$NAME$$
E-Mail : $$EMAIL$$
FAX : $$FAX$$
TEL : $$TEL$$
								                </textarea>
							        			</td>
								            </tr>
								        </table>
									</td>
								</tr>
							</table>
						</td>
					</tr>
				</table>
			</td>
		</tr>
	</table>