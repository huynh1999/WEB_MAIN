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

    <input type="hidden" name="f_ofc_cnt_cd" id="f_ofc_cnt_cd"   value="">
    <input type="hidden" name="hid_act_cnt_cd" id="hid_act_cnt_cd" value="">
    
    <input type="hidden" name="ppdOrgCurr"  id="ppdOrgCurr"   value="">
    <input type="hidden" name="ofc_curr"    id="ofc_curr"   value="<%=ofc_curr%>">
    <input type="hidden" name="trf_cur_cd"  id="trf_cur_cd"   value="<%=trf_cur_cd%>">
	<input type="hidden" name="xcrtDt"      id="xcrtDt"    value="<bean:write name="hblVO" property="eta_dt_tm"/>">
        
    <input type="hidden" name="cctOrgCurr"  id="cctOrgCurr"   value="">
    <input type="hidden" name="objPfx"      id="objPfx"    value="">
    <input type="hidden" name="curRow2"     id="curRow2"    value="">
    
    <input type="hidden" name="ppdToCurrency" id="ppdToCurrency" value="<%=partner_curr%>">
    <input type="hidden" name="ppdOrgCurr"   id="ppdOrgCurr"  value="<%=partner_curr%>">

    <!--Invoice추가-->    
    <input type="hidden" name="tax_bil_flg" id="tax_bil_flg"  value="">  
    <input type="hidden" name="inv_dt"     id="inv_dt"   value="">
    <input type="hidden" name="inv_due_dt" id="inv_due_dt"   value="">  
    <input type="hidden" name="inv_rmk"    id="inv_rmk"  value="">  
    <input type="hidden" name="buy_inv_no"  id="buy_inv_no" value="">  
    
    <!-- check freight -->
    <input type="hidden" name="chk_fr_trdp_cd"   id="chk_fr_trdp_cd"   value="">  
    <input type="hidden" name="chk_fr_trdp_nm"    id="chk_fr_trdp_nm"  value=""> 
    <input type="hidden" name="chk_fr_inv_curr_cd" id="chk_fr_inv_curr_cd" value=""> 


	<div class="opus_design_grid" >
		 <h3 class="title_design"><bean:message key="Account_Receivable"/></h3>	
			<div class="opus_design_btn">
				<div class="grid_option_left">
					<button type="button" class="btn_accent" onClick="setFrtSizeUp(docObjects[4], 'frtTableS')"><bean:message key="Plus"/></button><!--  
				--><button type="button" class="btn_normal" onClick="setFrtSizeDown(docObjects[4], 'frtTableS')"><bean:message key="Minus"/></button>
				</div>
				<div class="grid_option_left"  style="display:none;" id="sdBtns" >
					<button type="button" class="btn_normal"  onClick="goToInvoice(docObjects[4], 'LOCAL')"><bean:message key="Create_NewAR"/></button><!--
				--><button type="button" class="btn_normal"  onClick="goToInvoiceModify('LOCAL')"><bean:message key="ViewEdit_Invoice"/></button><!--
				--><span id="btnPierpass"><button type="button" class="btn_normal"  onClick="addPierPassFrt(frm1.intg_bl_seq.value, 'H', frm1.shp_mod_cd.value, 'I', 'S')"><bean:message key="PIERPASS"/></button></span><!--		
				--><span id="btnCTF"><button type="button" class="btn_normal"  onClick="addCtfCfFrt(frm1.intg_bl_seq.value, 'H', frm1.shp_mod_cd.value, 'I', 'S','CTF')"><bean:message key="CLEAN_TRUCK_FEE"/></button></span><!--		
				--><span id="btnCF"><button type="button" class="btn_normal"  onClick="addCtfCfFrt(frm1.intg_bl_seq.value, 'H', frm1.shp_mod_cd.value, 'I', 'S','CF')"><bean:message key="CHASSIS_FEE"/></button></span><!--		
				--><button type="button" class="btn_normal"  onClick="setDfltFrt('', 'S', 'I', 'H')"><bean:message key="Default"/> <bean:message key="New"/></button><!--
				--><button type="button" class="btn_normal"  onClick="frtRowAdd('ROWADD', docObjects[4], 'S', 'I', 'H');afterRowAdd('AR');"><bean:message key="Add"/></button><!--
				--><button type="button" class="btn_normal"  onclick="frtRowCopy('AR', docObjects[4], docObjects[9],'', 'S', 'I', 'H');" > <bean:message key="Copy_toAgent"/></button><!--
				 #2504 [PATENT]Debit Note & AP for billing code based invoices
				 --><span id="spanARprint" style="display:none;"><button type="button" class="btn_normal"  onClick="goToCmbPrint(docObjects[4],'AR');" ><bean:message key="Debit_Print"/></button></span>
				
				</div>
			</div>	
			<table>
				<tr id="cntrListTd">
					<td id="mainTable">
						<script type="text/javascript">comSheetObject('sheet7');</script>
					</td>
				</tr>
				<tr>
					<td id="mainTable">
						<script type="text/javascript">comSheetObject('sheet8');</script>
					</td>
				</tr>
			</table>
</div>

	<div class="opus_design_grid" id="mainTable" >
		 <h3 class="title_design"><bean:message key="Debit_Credit"/></h3>	
			<div class="opus_design_btn">
				<div class="grid_option_left">
					<button type="button" class="btn_accent" onClick="setFrtSizeUp(docObjects[9], 'frtTableDC')"><bean:message key="Plus"/></button><!--  
					--><button type="button" class="btn_normal" onClick="setFrtSizeDown(docObjects[9], 'frtTableDC')"><bean:message key="Minus"/></button>	
				</div>
				<div class="grid_option_left" id="dcBtns" style="display:none;" >
				<button type="button" class="btn_normal" id="btnDCAnList" style="display:none;" onClick="selectAnList(docObjects[9], 'dc_');"><bean:message key="B.AN"/></button><!--
				--><button type="button" class="btn_normal" onClick="goToInvoice(docObjects[9], 'DC');"><bean:message key="Create_NewDC"/></button><!--
				--><button type="button" class="btn_normal" onClick="goToInvoiceModify('DC');"><bean:message key="ViewEdit_Invoice"/></button><!--		
				--><button type="button" class="btn_normal" onClick="setDfltFrt('dc_', 'S', 'I', 'H')"><bean:message key="Default"/> <bean:message key="New"/></button><!--
				--><button type="button" class="btn_normal" onClick="frtRowAdd('DCROWADD', docObjects[9], 'S', 'I', 'H');afterRowAdd('DC');"><bean:message key="Add"/></button><!--
				--><button type="button" class="btn_normal"  onclick="frtRowCopy('DC', docObjects[9], docObjects[4], docObjects[5], 'S', 'I', 'H');" > <bean:message key="Copy_toLocal"/></button>
				</div>
			</div>
				
		<script type="text/javascript">comSheetObject('sheet14');</script>
	</div>

	<div class="opus_design_grid" id="mainTable" >
		 <h3 class="title_design"><bean:message key="Account_Payable"/></h3>	
			<div class="opus_design_btn">
				<div class="grid_option_left">
					<button type="button" class="btn_accent" onClick="setFrtSizeUp(docObjects[5], 'frtTableB')"><bean:message key="Plus"/></button><!--  
					--><button type="button" class="btn_normal" onClick="setFrtSizeDown(docObjects[5], 'frtTableB')"><bean:message key="Minus"/></button>	
				</div>
				<div class="grid_option_left" id="bcBtns" style="display:none;" >
				   <button type="button" class="btn_normal" onClick="goToInvoice(docObjects[5], 'AP');"><bean:message key="Create_AP"/></button><!--
				--><button type="button" class="btn_normal" onClick="goToInvoiceModify('AP');"><bean:message key="ViewEdit_Invoice"/></button><!--
				--><button type="button" class="btn_normal" onClick="setDfltFrt('b_', 'S', 'I', 'H')"><bean:message key="Default"/> <bean:message key="New"/></button><!--
				--><button type="button" class="btn_normal" onClick="frtRowAdd('BCROWADD', docObjects[5], 'S', 'I', 'H');afterRowAdd('AP');"><bean:message key="Add"/></button><!--
				--><button type="button" class="btn_normal"  onclick="frtRowCopy('AP', docObjects[5], docObjects[9],'', 'S', 'I', 'H');" > <bean:message key="Copy_toAgent"/></button><!--
				#2504 [PATENT]Debit Note & AP for billing code based invoices 
				--><span id="spanAPprint" style="display:none;"><button type="button" class="btn_normal"  onClick="goToCmbPrint(docObjects[5],'AP');" ><bean:message key="AP_Print"/></button></span>
				</div>
			</div>
				
			<script type="text/javascript">comSheetObject('sheet9');</script>
</div>

	<div class="opus_design_grid" id="mainTable" style="display: none;">
		 <h3 class="title_design"><bean:message key="AN_Freight"/></h3>	
			<div class="opus_design_btn">
				<button type="button" id="anBtns" class="btn_accent" onClick="gridAdd(10);" style="display:inline;"><bean:message key="Add"/></button> 
			</div>
				
			<script type="text/javascript">comSheetObject('sheet15');</script>
	</div>
	<div class="opus_design_inquiry" style="display: none;">
			<div class="opus_design_data">
				<table>
					<tbody>
						<colgroup>
							<col width="80px" />
							<col width="145px" />
							<col width="80px" />
							<col width="145px" />
							<col width="80px" />
							<col width="145px" />
							<col width="80px" />
							<col width="*" />
						</colgroup>
						<tr>
                   				<th><bean:message key="Invoice_No"/></th>
								<td>
		                            <input type="text" name="an_inv_no" maxlength="50" value="<bean:write name="hblVO" property="an_inv_no"/>" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:90c;">
		                        </td>
		                        
		                        <th><bean:message key="Due_Date"/></th>
								<td>
		                            <input name="an_due_dt" id="an_due_dt" value='<wrt:write name="hblVO" property="an_due_dt" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy"/>'   type="text" class="search_form" onKeyUp="mkDateFormatType(this, event, false, 1)" onBlur="mkDateFormatType(this, event, true, 1)" dataformat="excepthan" style="ime-mode:disabled;width:70px;" maxlength="10" ><!-- 
		                             --><button type="button" class="calendar" tabindex="-1" name="an_due_dt_cal" id="an_due_dt_cal"  onclick="doDisplay('DATE1',frm1.an_due_dt);" ></button>
		                        </td>
		                        
		                        <th><bean:message key="Currency"/></th>
								<td>
		                            <input type="text" name="an_curr_cd" value="<bean:write name="hblVO" property="an_curr_cd"/>" class="search_form" style="width:90px;">
		                        </td>
		                        
		                        <th><bean:message key="Total"/></th>
								<td>
		                            <input type="text" name="an_total_amt" value="" class="search_form" style="width:90px;text-align:right">
		                        </td>
                   		</tr>
					</tbody>
				</table>
			</div>
</div>	
   
