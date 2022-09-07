<!-- layout_wrap(S) -->
<div class="layout_wrap opus_design_inquiry">
    <div class="layout_vertical_2">
        <!-- opus_design_grid(S) -->
        
        <div class="opus_design_grid pad_rgt_8">
	        <h3 class="title_design"><bean:message key="Job_Visibility"/></h3>
	        <div class="opus_design_btn">
			<button type="button" class="btn_accent" onclick="gridAdd(8);"><bean:message key="Add"/></button>
	        </div>
	        <span class="clear"></span>
            <script type="text/javascript">comSheetObject('sheet11');</script>
        </div>
        <!-- opus_design_grid(E) -->
    </div>
    <div class="layout_vertical_2">
	        <!-- opus_design_grid(S) -->
	        <div class="opus_design_grid">
	        	<h3 class="title_design"><bean:message key="Document_List"/></h3>
		        <div class="opus_design_btn">
					<button type="button" class="btn_accent" name="sDoc" id="sDoc" onClick="doWork('S_DOC')" btnAuth="S_DOC"><bean:message key="Print"/></button><!--
					--><button type="button" class="btn_normal" name="sndEmlObj" id="sndEmlObj" onClick="doWork('SNDEML')" style="display: none; margin-left: 5px; cursor: hand"><bean:message key="Email"/></button><!--		
		       		--><button type="button" class="btn_normal" name="fileUpObj" id="fileUpObj" onClick="doWork('DOCFILE')" style="display: none; margin-left: 5px; cursor: hand"><bean:message key="Upload"/></button>
		        </div>
		        <span class="clear"></span>
	            <script type="text/javascript">comSheetObject('sheet3');</script>
	        </div>
	        <!-- opus_design_grid(E) -->
	</div>
<!-- layout_wrap(E) -->
</div>
<!-- layout_wrap(S) -->
<div class="layout_wrap opus_design_inquiry">
    <div class="layout_vertical_2 pad_rgt_8">
        <!-- opus_design_grid(S) -->
        <div style="padding-top:10px;"><h3 class="title_design"><bean:message key="History_Search"/></h3></div>
        <div class="opus_design_grid">
        <span class="clear"></span> 
	        <script type="text/javascript">comSheetObject('sheet12');</script>
	        <!-- opus_design_grid(E) -->
	    </div>
    </div>
    
    <div class="layout_vertical_2">
	        <!-- opus_design_grid(S) -->
	     <div class="opus_design_grid">
	        <h3 class="title_design"><bean:message key="User_Defined_Field"/></h3>
	        <div class="opus_design_btn">
				<button id="addRowByUDF" name="addRowByUDF" type="button" class="btn_accent" onclick="gridAdd(14);"><bean:message key="Add"/></button>
		    </div>
		    <span class="clear"></span>	
	            <script type="text/javascript">comSheetObject('sheet15');</script>
	    </div>
 	</div>
 	
</div>
<!-- layout_wrap(E) -->
