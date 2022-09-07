<div class="layout_wrap">
	<div class="layout_vertical_3">
		<div class="opus_design_inquiry">
			<table>
				<colgroup>
					<col width="10px"></col>
					<col width="*"></col>
				</colgroup>
				<tbody>
					<tr>
						<th><bean:message key="Report_Type" />
						</th>
						<td colspan="4"><input type="hidden" name="h_rpt_tp_cd"	value="<bean:write name="ofcVO" property="rpt_tp_cd"/>">
							<select name="i_rpt_tp_cd" style="width: 100px;" OnChange="" required>
									<logic:iterate id="codeVO" name="repDfltType">
										<option value='<bean:write name="codeVO" property="cd_val"/>'>
											<bean:write name="codeVO" property="cd_nm" />
									</logic:iterate>
							</select>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</div>





<div class="opus_design_grid">
	<h3 class="title_design"><bean:message key="Setup"/></h3>
	<div class="opus_design_btn">
		<button id="btnRowAdd2" type="button" onClick="doWork('ROWADD_RPT')" class="btn_normal"><bean:message key="Add"/></button>
		<button id="btnSave2" type="button" onClick="doWork('SAVE_RPT');" class="btn_normal"><bean:message key="Save"/></button>
	</div>
	<script type="text/javascript">comSheetObject('sheetOfficeReport');</script>
</div>