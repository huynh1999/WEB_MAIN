
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
        ofc_curr     = (String)tmpMap.get("ofccurr_cd");
        trf_cur_cd = (String)tmpMap.get("trf_cur_cd");
        to_rt_ut    = (String)tmpMap.get("to_rt_ut");
    %>
</logic:notEmpty>
    <script>
        var obdtCur = '<%=to_rt_ut%>';
    </script>

    <input type="hidden" name="f_ofc_cnt_cd"   id="f_ofc_cnt_cd"   value="">
    <input type="hidden" name="hid_act_cnt_cd" id="hid_act_cnt_cd" value="">
    
    <input type="hidden" name="ppdOrgCurr"     id="ppdOrgCurr" value="">
    <input type="hidden" name="ofc_curr"       id="ofc_curr" value="<%=ofc_curr%>">
    <input type="hidden" name="trf_cur_cd"     id="trf_cur_cd" value="<%=trf_cur_cd%>">
	<input type="hidden" name="xcrtDt"         id="xcrtDt"  value="<wrt:write name="hblVO" property="etd_dt_tm" formatType="DATE" fromFormat="MMddyyyyHHmm" format="MMddyyyy"/>">
        
    <input type="hidden" name="cctOrgCurr"     id="cctOrgCurr"  value="">
    <input type="hidden" name="objPfx"         id="objPfx"    value="">
    <input type="hidden" name="curRow2"        id="curRow2" value="">
    
    <input type="hidden" name="ppdToCurrency"  id="ppdToCurrency" value="<%=partner_curr%>">
    <input type="hidden" name="ppdOrgCurr"     id="ppdOrgCurr" value="<%=partner_curr%>">

    <!--Invoice추가-->    
    <input type="hidden" name="tax_bil_flg" id="tax_bil_flg"  value="">  
    <input type="hidden" name="inv_dt"      id="inv_dt" value="">
    <input type="hidden" name="inv_due_dt"  id="inv_due_dt"  value="">  
    <input type="hidden" name="inv_rmk"     id="inv_rmk"  value="">  
    <input type="hidden" name="buy_inv_no"  id="buy_inv_no"  value="">  

	<!-- check freight -->
    <input type="hidden" name="chk_fr_trdp_cd"     id="chk_fr_trdp_cd"      value="">  
    <input type="hidden" name="chk_fr_trdp_nm"     id="chk_fr_trdp_nm"   value=""> 
    <input type="hidden" name="chk_fr_inv_curr_cd" id="chk_fr_inv_curr_cd"  value=""> 
    
<!-- opus_design_grid(S) -->
<div class="opus_design_grid"  id="mainTable">
	<h3 class="title_design"><bean:message key="Account_Receivable"/></h3>
	<!-- opus_design_btn(S) -->
	<div class="opus_design_btn">
		<div class="grid_option_left">
			<button  type="button" class="btn_accent" onClick="setFrtSizeUp(docObjects[2], 'frtTableS')"><bean:message key="Plus"/></button>
			<button  type="button" class="btn_accent" onClick="setFrtSizeDown(docObjects[2], 'frtTableS')"><bean:message key="Minus"/></button>
		</div>	
		<div class="grid_option_left" id="sdBtns" style="display:none;">
			<button style="cursor:hand" type="button" class="btn_accent" onClick="goToInvoice(docObjects[2], 'LOCAL')"><bean:message key="Create_NewAR"/></button><!--
			--><button style="cursor:hand" type="button" class="btn_accent" onClick="goToInvoiceModify('LOCAL')"><bean:message key="ViewEdit_Invoice"/></button><!--
			--><button style="cursor:hand" type="button" class="btn_accent" onClick="setAirDfltFrt('', 'A', 'O', 'H')"><bean:message key="Default"/> <bean:message key="New"/></button><!--
			--><button style="cursor:hand" type="button" class="btn_accent" onclick="frtRowAdd('ROWADD', docObjects[2], 'A', 'O', 'H');afterRowAdd('AR');"><bean:message key="Add"/></button><!--
			--><button type="button" class="btn_normal"  onclick="frtRowCopy('AR', docObjects[2], docObjects[8],'', 'A', 'O', 'H');" > <bean:message key="Copy_toAgent"/></button><!--
			 #2504 [PATENT]Debit Note & AP for billing code based invoices
			 --><span id="spanARprint" style="display:none;"><button type="button" class="btn_normal"  onClick="goToCmbPrint(docObjects[2],'AR');" ><bean:message key="Debit_Print"/></button></span>
			
		</div>
	</div>
	<!-- opus_design_btn(E) -->
	
    <script type="text/javascript">comSheetObject('sheet6');</script>
</div>
<!-- opus_design_grid(E) -->

<!-- opus_design_grid(S) -->
<div class="opus_design_grid"  id="mainTable">
	<h3 class="title_design"><bean:message key="Debit_Credit"/></h3>
	<!-- opus_design_btn(S) -->
	<div class="opus_design_btn">
		<button type="button" class="btn_accent" onClick="setFrtSizeUp(docObjects[8], 'frtTableDC')"><bean:message key="Plus"/></button>
		<button type="button" class="btn_accent" onClick="setFrtSizeDown(docObjects[8], 'frtTableDC')"><bean:message key="Minus"/></button>
		<div id="dcBtns" style="display:none;">
			<button style="cursor:hand" type="button" class="btn_accent" onClick="goToInvoice(docObjects[8], 'DC')"><bean:message key="Create_NewDC"/></button>
			<button style="cursor:hand" type="button" class="btn_accent" onClick="goToInvoiceModify('DC')"><bean:message key="ViewEdit_Invoice"/></button>
			<button style="cursor:hand" type="button" class="btn_accent" onClick="setAirDfltFrt('dc_', 'A', 'O', 'H');selectTrdpCharge();"><bean:message key="Default"/> <bean:message key="New"/></button>
			<button style="cursor:hand" type="button" class="btn_accent" onclick="frtRowAdd('DCROWADD', docObjects[8], 'A', 'O', 'H');afterRowAdd('DC');"><bean:message key="Add"/></button><!--
		  --><button type="button" class="btn_normal"  onclick="frtRowCopy('DC', docObjects[8], docObjects[2], docObjects[3], 'A', 'O', 'H');" > <bean:message key="Copy_toLocal"/></button>	
		</div>
	</div>
	<!-- opus_design_btn(E) -->
	
    <script type="text/javascript">comSheetObject('sheet14');</script>
</div>
<!-- opus_design_grid(E) -->

<!-- opus_design_grid(S) -->
<div class="opus_design_grid"  id="mainTable">
	<h3 class="title_design"><bean:message key="Account_Payable"/></h3>
	<!-- opus_design_btn(S) -->
	<div class="opus_design_btn">
		<button type="button" class="btn_accent" onClick="setFrtSizeUp(docObjects[3], 'frtTableB')"><bean:message key="Plus"/></button><!--
		--><button type="button" class="btn_accent" onClick="setFrtSizeDown(docObjects[3], 'frtTableB')"><bean:message key="Minus"/></button>
		<div id="bcBtns" style="display:none;">
			<button style="cursor:hand" type="button" class="btn_accent" onClick="goToInvoice(docObjects[3], 'AP')"><bean:message key="Create_AP"/></button><!--
			--><button style="cursor:hand" type="button" class="btn_accent" onClick="goToInvoiceModify('AP')"><bean:message key="ViewEdit_Invoice"/></button><!--
			--><button style="cursor:hand" type="button" class="btn_accent" onClick="setAirDfltFrt('b_', 'A', 'O', 'H')"><bean:message key="Default"/> <bean:message key="New"/></button><!--
			--><button style="cursor:hand" type="button" class="btn_accent" onclick="frtRowAdd('BCROWADD', docObjects[3], 'A', 'O', 'H');afterRowAdd('AP');"><bean:message key="Add"/></button><!--
			--><button type="button" class="btn_normal"  onclick="frtRowCopy('AP', docObjects[3], docObjects[8],'', 'A', 'O', 'H');" > <bean:message key="Copy_toAgent"/></button><!--
			#2504 [PATENT]Debit Note & AP for billing code based invoices 
			--><span id="spanAPprint" style="display:none;"><button type="button" class="btn_normal"  onClick="goToCmbPrint(docObjects[3],'AP');" ><bean:message key="AP_Print"/></button></span>

		</div>
	</div>
	<!-- opus_design_btn(E) -->
	
    <script type="text/javascript">comSheetObject('sheet7');</script>
</div>
<!-- opus_design_grid(E) -->
  
   