
<script>
	var dfPerfCurr = 'KRW';
</script>
<%
	boolean sdIns = true;
	boolean sdInsDisp = true;
	boolean bcIns = true;
	boolean bcInsDisp = true;
	String to_rt_ut = "";
	String trf_cur_cd = "";   //Invoice Currency
%>
<!--Selling/Debit-->
<logic:notEmpty name="valMap" property="SFRT">
    <bean:define id="sellCnfCk" name="valMap" property="SFRT"/>
    <logic:equal name="sellCnfCk" property="flg" value="Y">
        <% sdIns = false; %>
    </logic:equal>

    <logic:equal name="sellCnfCk" property="invflg" value="Y">
        <% sdInsDisp = false; %>
    </logic:equal>
</logic:notEmpty>

<!--Buying/Crebit-->
<logic:notEmpty name="valMap" property="BFRT">
    <bean:define id="buyCnfCk" name="valMap" property="BFRT"/>
    <logic:equal name="buyCnfCk" property="flg" value="Y">
        <% bcIns = false; %>
    </logic:equal>
    
    <logic:equal name="buyCnfCk" property="invflg" value="Y">
        <% bcInsDisp = false; %>
    </logic:equal>
</logic:notEmpty>

<!-- Currency 조회 -->
<logic:notEmpty name="valMap" property="OfcCurrency">
	<bean:define id="curMap" name="valMap" property="OfcCurrency"/>
	<%  HashMap tmpMap = (HashMap)curMap;
		ofc_curr   = (String)tmpMap.get("ofccurr_cd");
		trf_cur_cd = (String)tmpMap.get("trf_cur_cd");
		to_rt_ut   = (String)tmpMap.get("to_rt_ut");
	%>
</logic:notEmpty>
	<script>
		var obdtCur = '<%=to_rt_ut%>';
	</script>

	<input type="hidden" name="f_ofc_cnt_cd"   id="f_ofc_cnt_cd" value="">
	<input type="hidden" name="hid_act_cnt_cd" id="hid_act_cnt_cd" value="">
	
	<input type="hidden" name="ppdOrgCurr"   id="ppdOrgCurr"  value="">
	<input type="hidden" name="ofc_curr"     id="ofc_curr"  value="<%=ofc_curr%>">
    <input type="hidden" name="trf_cur_cd"   id="trf_cur_cd"  value="<%=trf_cur_cd%>">
    <input type="hidden" name="xcrtDt"       id="xcrtDt"  value="<bean:write name="hblVO" property="obrd_dt_tm"/>">

	<input type="hidden" name="cctOrgCurr" id="cctOrgCurr"     value="">
	<input type="hidden" name="objPfx"    id="objPfx"     value="">
	<input type="hidden" name="curRow2"   id="curRow2"     value="">

	
	<input type="hidden" name="ppdToCurrency" id="ppdToCurrency" value="<%=partner_curr%>">
	<input type="hidden" name="ppdOrgCurr"    id="ppdOrgCurr" value="<%=partner_curr%>">

    <!--Invoice추가-->    
    <input type="hidden" name="tax_bil_flg" id="tax_bil_flg"  value="">  
    <input type="hidden" name="inv_dt"     id="inv_dt"  value="">
    <input type="hidden" name="inv_due_dt" id="inv_due_dt"  value="">  
    <input type="hidden" name="inv_rmk"    id="inv_rmk"  value="">  
    <input type="hidden" name="buy_inv_no" id="buy_inv_no"  value="">  
    
    <!-- check freight -->
    <input type="hidden" name="chk_fr_trdp_cd"    id="chk_fr_trdp_cd"  value="">  
    <input type="hidden" name="chk_fr_trdp_nm"     id="chk_fr_trdp_nm" value=""> 
    <input type="hidden" name="chk_fr_inv_curr_cd" id="chk_fr_inv_curr_cd" value=""> 
    
	<div class="opus_design_grid">
		<h3 class="title_design"><bean:message key="Account_Receivable"/></h3>
			<div class="opus_design_btn">
				<div class="grid_option_left">
					<button type="button" class="btn_accent" onClick="setFrtSizeUp(docObjects[5], 'frtTableS')"><bean:message key="Plus"/></button><!-- 
				 --><button type="button" class="btn_normal"  onClick="setFrtSizeDown(docObjects[5], 'frtTableS')"><bean:message key="Minus"/></button>	
				 </div>
				<div class="grid_option_left" style="display:none;" id="sdBtns" >
				 <button type="button" class="btn_normal"  onClick="goToInvoice(docObjects[5],'LOCAL')" ><bean:message key="Create_NewAR"/></button><!--
				 --><button type="button" class="btn_normal"  onClick="goToInvoiceModify('LOCAL')" ><bean:message key="ViewEdit_Invoice"/></button><!--
				 --><span id="btnPierpass"><button type="button" class="btn_normal"  onClick="addPierPassFrt(frm1.intg_bl_seq.value, 'H', frm1.shp_mod_cd.value, 'O', 'S')" ><bean:message key="PIERPASS"/></button></span><!--
				 --><button type="button" class="btn_normal"  onclick="setDfltFrt('', 'S', 'O', 'H');" ><bean:message key="Default"/> <bean:message key="New"/></button><!--
				 --><button type="button" class="btn_normal"  onclick="frtRowAdd('ROWADD', docObjects[5], 'S', 'O', 'H');afterRowAdd('AR');" > <bean:message key="Add"/></button><!--
				 --><button type="button" class="btn_normal"  onclick="frtRowCopy('AR', docObjects[5], docObjects[13],'', 'S', 'O', 'H');" > <bean:message key="Copy_toAgent"/></button><!--
				 #2504 [PATENT]Debit Note & AP for billing code based invoices
				 --><span id="spanARprint" style="display:none;"><button type="button" class="btn_normal"  onClick="goToCmbPrint(docObjects[5],'AR');" ><bean:message key="Debit_Print"/></button></span>				 	
				</div>
			</div>
			<script type="text/javascript">comSheetObject('sheet7');</script>
			<script type="text/javascript">comSheetObject('sheet8');</script>
	</div>
	<div class="opus_design_grid" id="mainTable">
		<h3 class="title_design"><bean:message key="Debit_Credit"/></h3>
			<div class="opus_design_btn">
				<div class="grid_option_left">
					<button type="button" class="btn_accent" onClick="setFrtSizeUp(docObjects[13], 'frtTableDC')"><bean:message key="Plus"/></button>
					<button type="button" class="btn_normal"  onClick="setFrtSizeDown(docObjects[13], 'frtTableDC')"><bean:message key="Minus"/></button>
				</div>	
				<div class="grid_option_left" style="display:none;" id="dcBtns" >
				<button type="button" class="btn_normal"  onClick="goToInvoice(docObjects[13], 'DC')" ><bean:message key="Create_NewDC"/></button><!--
				--><button type="button" class="btn_normal"  onClick="goToInvoiceModify('DC')" ><bean:message key="ViewEdit_Invoice"/></button><!--
				--><button type="button" class="btn_normal"  onClick="setDfltFrt('dc_', 'S', 'O', 'H')" ><bean:message key="Default"/> <bean:message key="New"/></button><!--
				--><button type="button" class="btn_normal"  onclick="frtRowAdd('DCROWADD', docObjects[13], 'S', 'O', 'H');afterRowAdd('DC');" ><bean:message key="Add"/></button><!--
				--><button type="button" class="btn_normal"  onclick="frtRowCopy('DC', docObjects[13], docObjects[5], docObjects[6], 'S', 'O', 'H');" > <bean:message key="Copy_toLocal"/></button>	
				</div>
			</div>
		<script type="text/javascript">comSheetObject('sheet14');</script>
	</div>
	<div class="opus_design_grid" id="mainTable">
		<h3 class="title_design"><bean:message key="Account_Payable"/></h3>
			<div class="opus_design_btn">
				<div class="grid_option_left">
					<button type="button" class="btn_accent" onClick="setFrtSizeUp(docObjects[6], 'frtTableB')"><bean:message key="Plus"/></button>
					<button type="button" class="btn_normal"  onClick="setFrtSizeDown(docObjects[6], 'frtTableB')"><bean:message key="Minus"/></button>
				</div>	
				<div class="grid_option_left" style="display:none;" id="bcBtns" >
				<button type="button" class="btn_normal"  onClick="goToInvoice(docObjects[6], 'AP')" ><bean:message key="Create_AP"/></button><!--
				--><button type="button" class="btn_normal"  onClick="goToInvoiceModify('AP')" ><bean:message key="ViewEdit_Invoice"/></button><!--
				--><button type="button" class="btn_normal"  onClick="setDfltFrt('b_', 'S', 'O', 'H')" ><bean:message key="Default"/> <bean:message key="New"/></button><!--
				--><button type="button" class="btn_normal"  onclick="frtRowAdd('BCROWADD', docObjects[6], 'S', 'O', 'H');afterRowAdd('AP');" ><bean:message key="Add"/></button><!--
				--><button type="button" class="btn_normal"  onclick="frtRowCopy('AP', docObjects[6], docObjects[13],'', 'S', 'O', 'H');" > <bean:message key="Copy_toAgent"/></button><!--
				#2504 [PATENT]Debit Note & AP for billing code based invoices 
				--><span id="spanAPprint" style="display:none;"><button type="button" class="btn_normal"  onClick="goToCmbPrint(docObjects[6],'AP');" ><bean:message key="AP_Print"/></button></span>	
				</div>
			</div>
		<script type="text/javascript">comSheetObject('sheet9');</script>
	</div>
		