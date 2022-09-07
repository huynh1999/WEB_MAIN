<!-- layout_wrap(S) -->
<div class="opus_design_inquiry" >
	<div class="layout_wrap" > 
	    <div class="layout_vertical_2" >
	        <!-- opus_design_grid(S) -->
	        <div class="opus_design_grid"  id="mainTable">
	        <h3 class="title_design"><bean:message key="Job_Visibility"/></h3>	
	        <div class="opus_design_btn">
				<button type="button" class="btn_accent" onclick="gridAdd(6);"><bean:message key="Add"/></button>
			</div>
	        <span class="clear"></span>	
	            <script type="text/javascript">comSheetObject('sheet11');</script>
	        </div>
	        <!-- opus_design_grid(E) -->
	    </div>
	    
	    <div class="layout_vertical_2 pad_left_8">
	        <!-- opus_design_grid(S) -->
	        <div class="opus_design_grid" id="mainTable">
	        <h3 class="title_design"><bean:message key="Document_List"/></h3>
	        <div class="opus_design_btn">
				<button type="button" class="btn_accent" name="sndEmlObj" id="sndEmlObj" style="display: none;" onClick="doWork('SNDEML')"><bean:message key="Email"/></button>
				<button type="button" class="btn_normal" name="sDoc" id="sDoc" style="cursor:hand; display:none;" btnAuth="S_DOC" onClick="doWork('S_DOC');"><bean:message key="Print"/></button>
				<button type="button" class="btn_normal" name="fileUpObj" id="fileUpObj" style="display: none;" onClick="doWork('DOCFILE')"><bean:message key="Upload"/></button>
			</div>
	        	<span class="clear"></span>
	            <script type="text/javascript">comSheetObject('sheet10');</script>
	        </div>
	        <!-- opus_design_grid(E) -->
	    </div>
	</div>
</div>

<div class="layout_wrap opus_design_inquiry">
    <div class="layout_vertical_2">
        <!-- opus_design_grid(S) -->
        <div style="padding-top:10px;"><h3 class="title_design"><bean:message key="History_Search"/></h3></div>
        <div class="opus_design_grid">
        <span class="clear"></span> 
	        <script type="text/javascript">comSheetObject('sheet12');</script>
	        <!-- opus_design_grid(E) -->
	    </div>
    </div>
    
    <div class="layout_vertical_2 pad_left_8">
	        <!-- opus_design_grid(S) -->
	     <div class="opus_design_grid">
	        <h3 class="title_design"><bean:message key="User_Defined_Field"/></h3>
	        <div class="opus_design_btn">
				<button id="addRowByUDF" name="addRowByUDF" type="button" class="btn_accent" onclick="gridAdd(13);"><bean:message key="Add"/></button>
		    </div>
		  	<span class="clear"></span>
	            <script type="text/javascript">comSheetObject('sheet17');</script>
	    </div>
 	</div>
 	
</div>

<!-- opus_design_grid(S) -->
<!-- <h3 class="title_design">
	<bean:message key="History_Search" />
</h3>
<div class="opus_design_grid" id="mainTable">
	<script type="text/javascript">comSheetObject('sheet12');</script>
</div> -->
<!-- opus_design_grid(E) -->
