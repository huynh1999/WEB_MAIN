<%--=========================================================
*Copyright(c) 2015 DOU NetsWork. All Rights Reserved.
*@FileName   : WHOutbkMgmt_01.jsp
*@FileTitle  : Outbound Booking Management( Doc Detail )
*@author     : Vinh.Vo - DOU Network
*@version    : 1.0
*@since      : 2015/07/28
=========================================================--%>

	
	<div class="opus_design_inquiry">
		<table>
			<colgroup>
				<col width="50" />
				<col width="220" />
				<col width="*" />
			</colgroup>
			<tbody>
				<tr>
					<th><bean:message key="File_Path"/></th>
					<td>
					<div id="logo_rec_id" style="display: none;"><!--
	                --></div><!--
	                --><input tabindex = "-1" type="file" name="logo_rectangle"  size="25"/><!--
	                --><input name="logo_rec_flg" type="checkbox" value="Y"  style="display: none">
					<button type="button" class="btn_etc" name="btn_file_upload" id="btn_file_upload" onClick="doWork('btn_file_upload');"><bean:message key="File_Upload"/></button> 
					</td>
					<td class="T_Right" style="float: right;">
					<button type="button" class="btn_etc" name="btn_file_delete" id="btn_file_delete" onClick="doWork('btn_file_delete');"><bean:message key="File_Delete"/></button> 
					</td>
				</tr>
			</tbody>
		</table>
	</div>
	<div class="opus_design_grid clear" >
		<script type="text/javascript">comSheetObject('sheet3');</script>
	</div>
