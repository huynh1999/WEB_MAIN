<div class="opus_design_grid"  id="mainTable">
	<h3 class="title_design"><bean:message key="Container_List"/></h3>
	<div class="opus_design_btn">
		<button type="button" class="btn_accent" name="cnrtPopAdd" id="cnrtPopAdd" onClick="javascript:getMasterCntrList();" style="cursor:hand;display:inline;"><bean:message key="Add"/></button>
	</div>
	<script type="text/javascript">comSheetObject('sheet3');</script>
</div>

<div class="opus_design_grid"  id="mainTable">
	<h3 class="title_design"><bean:message key="Item"/></h3>
	<div class="opus_design_btn">
		<button type="button" class="btn_accent" name="loadPO" id="loadPO"  onClick="cmdtLoadPO(); " style="cursor:hand;display:none;"><bean:message key="Load_PO"/></button>
		<button type="button" class="btn_accent" name="itmAdd" id="itmAdd" onClick="cmdtRowAdd();" style="cursor:hand;display:none;"><bean:message key="Add"/></button>
	</div>
	<script type="text/javascript">comSheetObject('sheet4');</script>
</div>