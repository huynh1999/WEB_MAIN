<div class="layout_wrap">
    <div class="layout_vertical_2">
			<!-- opus_design_grid(S) -->
			<div class="opus_design_grid"  id="mainTable">
				<h3 class="title_design"><bean:message key="Job_Visibility"/></h3>
				<!-- opus_design_btn(S) -->
				<div class="opus_design_btn"><!-- 
					 --><button type="button" class="btn_accent" onclick="gridAdd(5);"><bean:message key="Add"/></button>
				</div>
				<!-- opus_design_btn(E) -->
				
			    <script type="text/javascript">comSheetObject('sheet11');</script>
			</div>
			<!-- opus_design_grid(E) -->
    </div>
    <div class="layout_vertical_2 pad_left_8">
			<!-- opus_design_grid(S) -->
			<div class="opus_design_grid"  id="mainTable">
				<h3 class="title_design"><bean:message key="Document_List"/></h3>
				<!-- opus_design_btn(S) -->
				<div class="opus_design_btn"><!-- 
					 --><button style="cursor:hand; display:none;" id="sDoc" btnAuth="S_DOC" name="sDoc"  type="button" class="btn_accent" onClick="doWork('S_DOC');"><bean:message key="Print"/></button><!--
					 --><button style="display: none; margin-left: 5px; cursor: hand" id="fileUpObj" btnAuth="fileUpObj" name="fileUpObj"  type="button" class="btn_normal" onClick="doWork('DOCFILE')"><bean:message key="Upload"/></button>
				</div>
				<!-- opus_design_btn(E) -->
				
			    <script type="text/javascript">comSheetObject('sheet3');</script>
			</div>
			<!-- opus_design_grid(E) -->
    </div>
</div>  

	<!-- opus_design_grid(S) -->
	<h3 class="title_design clear mar_btm_8" style="margin-bottom:0px;"><bean:message key="History_Search"/></h3>
	<div class="opus_design_grid"  id="mainTable">
	    <script type="text/javascript">comSheetObject('sheet12');</script>
	</div>
	<!-- opus_design_grid(E) -->
