<div class="opus_design_inquiry">
	<table>
		<tr>
			<th width="70px">Year</th>							
			<td width="70px"><input required type="text" name="year_val" maxlength="4" value="" style="text-transform:uppercase;width:50px;" onkeypress="return isNumberKey(event)"></td>
			<th width="40px"><bean:message key="Week"/></th>
			<td width="50px"><!-- 
			 --><select required name="week_val" style="width:55px;" onchange="chkWeek()"/><!-- 
			 -->	<logic:iterate id="week"  collection="<%=weekArr%>"><!-- 
			 -->	<option value='<bean:write name="week"/>'><bean:write name="week"/></option><!-- 
			 -->	</logic:iterate><!-- 
			 --></select><!-- 
			 --></td>
			<td><input name="weekarea" type="text" class="search_form-disable" dataformat="excepthan" style="ime-mode:disabled;width: 160px;text-align:Rigth" value="" readOnly></td>
		</tr>
	</table>
</div>
<div class="opus_design_grid">
	<div class="opus_design_inquiry">
	<div style="width:1800px;">
		<script language="javascript">comSheetObject('sheet1');</script>
	</div>
	 <table>	 	 
	     <tr>
	         <td width="60px"><!---
	           ---><bean:define id="pagingVal" name="valMap"     property="paging"/><!-- 
	           --><paging:options name="pagingVal" defaultval="50"/><!--- 
	           ---></td>
	          <td id="pagingTb" align="center" class="paging" height="10" valign="bottom"></td> 
	     </tr>
	 </table>
	 </div>
</div>