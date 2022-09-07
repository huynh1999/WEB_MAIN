<%--
=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : AII_BMD_0026.jsp
*@FileTitle  : 항공 수입 HGBL등록(TAB STATUS) 
*@author     : CLT
*@version    : 1.0
*@since      : 2014/08/14
=========================================================
--%>
<div class="opus_design_inquiry" >
	<div class="layout_wrap" > 

		<div class="layout_vertical_2" >
			<div class="opus_design_grid">
				<h3 class="title_design"> <bean:message key="Job_Visibility"/></h3>
				<div class="opus_design_btn">
					<button type="button" class="btn_normal" onClick="gridAdd(3);"><bean:message key="Add"/></button>
				</div>
				<div class="opus_design_grid"><script type="text/javascript">comSheetObject('sheet11');</script></div>
			</div>
		</div>

		<div class="layout_vertical_2 pad_left_4">
			<div class="opus_design_grid">
				<h3 class="title_design"> <bean:message key="Document_List"/></h3>
				<div class="opus_design_btn">
					<span id="sDoc" style="display:none;" btnAuth="S_DOC" onClick="doWork('S_DOC');"><button type="button" class="btn_normal"><bean:message key="Print"/></button></span>
					<span id="fileUpObj" style="display:none;"  onClick="doWork('DOCFILE');"><button type="button" class="btn_normal"><bean:message key="Upload"/></button></span>
				</div>
				<div class="opus_design_grid"><script type="text/javascript">comSheetObject('sheet3');</script></div>
			</div>
		</div>
</div>
</div>
<div class="opus_design_grid">
	<h3 class="title_design mar_btm_8"> <bean:message key="History_Search"/></h3>
	<div class="opus_design_grid"><script type="text/javascript">comSheetObject('sheet12');</script></div>
</div>
