<%--=========================================================
*Copyright(c) 2015 DOU NetsWork. All Rights Reserved.
*@FileName   : WHOutbkMgmt_01.jsp
*@FileTitle  : Outbound Booking Management( Booking Item )
*@author     : Vinh.Vo - DOU Network
*@version    : 1.0
*@since      : 2015/07/28
=========================================================--%>

	<div class="opus_design_grid">
	<!-- opus_design_grid(S) -->
	<div class="opus_design_btn">
			 <button type="button" 	class="btn_normal" name="excel_upload" 			id="excel_upload" 		onclick="doWork('excel_upload')"		>Excel Upload</button><!-- 
		  --><button type="button" 	class="btn_normal" name="template_download" 	id="template_download" 	onclick="doWork('template_download')"	>Template Download</button><!-- 
		  --><button type="button" 	class="btn_normal" name="btn_add" 				id="btn_add" 			onclick="doWork('btn_add')"				>Add</button><!-- 
		  --><button type="button" 	class="btn_normal" name="bk_item_row_delete" 	id="bk_item_row_delete"	onclick="doWork('bk_item_row_delete')"	>Del</button><!-- 
		  --><button type="button" 	class="btn_normal" name="stock_selection" 		id="stock_selection"	onclick="doWork('stock_selection')"		>Stock Selection</button><!-- 
		  --><button type="button" 	class="btn_normal" name="btn_Excel" 			id="btn_Excel"			onclick="doWork('btn_Excel')"			>Excel</button><!-- 
	 --></div>
		<script type="text/javascript">comSheetObject('sheet1');</script>
	</div>
