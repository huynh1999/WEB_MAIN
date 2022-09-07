<%--
=========================================================
*Copyright(c) 2009 CyberLogitec. All Rights Reserved.
=========================================================
=========================================================
*@FileName   : AII_BMD_0020.jsp
*@FileTitle  : 항공 수입 HGBL등록
*@Description: HBL 등록 및 조회
*@author     : Kang,Jung-Gu
*@version    : 1.0 - 09/28/2009
*@since      :

*@Change history:
*@author     : Tuan.Chau
*@version    : 2.0 - 2014/07/15
=========================================================
--%>
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

<!-- Currency ì¡°í -->
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

    <input type="hidden" name="f_ofc_cnt_cd"   value="">
    <input type="hidden" name="hid_act_cnt_cd" value="">
    
    <input type="hidden" name="ppdOrgCurr"     value="">
    <input type="hidden" name="ofc_curr"       value="<%=ofc_curr%>">
    <input type="hidden" name="trf_cur_cd"     value="<%=trf_cur_cd%>">
	<input type="hidden" name="xcrtDt"         value="<wrt:write name="hblVO" property="eta_dt_tm" formatType="DATE" fromFormat="yyyyMMddHHmm" format="yyyyMMdd"/>">
        
    <input type="hidden" name="cctOrgCurr"     value="">
    <input type="hidden" name="objPfx"         value="">
    <input type="hidden" name="curRow2"        value="">
    
    <input type="hidden" name="ppdToCurrency" value="<%=partner_curr%>">
    <input type="hidden" name="ppdOrgCurr"    value="<%=partner_curr%>">

    <!--Invoiceì¶ê°-->    
    <input type="hidden" name="tax_bil_flg"  value="">  
    <input type="hidden" name="inv_dt"       value="">
    <input type="hidden" name="inv_due_dt"   value="">  
    <input type="hidden" name="inv_rmk"      value="">  
    <input type="hidden" name="buy_inv_no"   value="">  

    <!-- check freight -->
    <input type="hidden" name="chk_fr_trdp_cd"      value="">  
    <input type="hidden" name="chk_fr_trdp_nm"      value=""> 
    <input type="hidden" name="chk_fr_inv_curr_cd"  value=""> 
    
    <div class="opus_design_grid">
		<h3 class="title_design"> <bean:message key="Account_Receivable"/></h3>
		<div class="opus_design_btn">
			<button type="button" class="btn_normal" onClick="setFrtSizeUp(docObjects[1], 'frtTableS')"><bean:message key="Plus"/></button><!--
			--><button type="button" class="btn_normal" onClick="setFrtSizeDown(docObjects[1], 'frtTableS')"><bean:message key="Minus"/></button>
			<span id="sdBtns" style="display:none;">
				<button type="button" class="btn_normal" onClick="goToInvoice(docObjects[1], 'LOCAL')"><bean:message key="Create_NewAR"/></button><!--
			--><button type="button" class="btn_normal" onClick="goToInvoiceModify('LOCAL')"><bean:message key="ViewEdit_Invoice"/></button><!--
			--><button type="button" class="btn_normal" onClick="setAirDfltFrt('', 'A', 'I', 'H')"><bean:message key="Default"/> <bean:message key="New"/></button><!--
			--><button type="button" class="btn_normal" onClick="frtRowAdd('ROWADD', docObjects[1], 'A', 'I', 'H');afterRowAdd('AR');"><bean:message key="Add"/></button><!--
			--><button type="button" class="btn_normal"  onclick="frtRowCopy('AR', docObjects[1], docObjects[6],'', 'A', 'I', 'H');" > <bean:message key="Copy_toAgent"/></button><!--
			 #2504 [PATENT]Debit Note & AP for billing code based invoices
			 --><span id="spanARprint" style="display:none;"><button type="button" class="btn_normal"  onClick="goToCmbPrint(docObjects[1],'AR');" ><bean:message key="Debit_Print"/></button></span>
			
			</span>
		</div>
		<div id="mainTable"><script language="javascript">comSheetObject('sheet5');</script></div>
	</div>
	
	<div class="opus_design_grid">
		<h3 class="title_design"> <bean:message key="Debit_Credit"/></h3>
		<div class="opus_design_btn">
			<button type="button" class="btn_normal" onClick="setFrtSizeUp(docObjects[6], 'frtTableDC')"><bean:message key="Plus"/></button><!--
			--><button type="button" class="btn_normal" onClick="setFrtSizeDown(docObjects[6], 'frtTableDC')"><bean:message key="Minus"/></button>
			<span id="dcBtns" style="display:none;">
				<button type="button" class="btn_normal" onClick="goToInvoice(docObjects[6], 'DC')"><bean:message key="Create_NewDC"/></button><!--
			--><button type="button" class="btn_normal" onClick="goToInvoiceModify('DC')"><bean:message key="ViewEdit_Invoice"/></button><!--
			--><button type="button" class="btn_normal" onClick="setAirDfltFrt('dc_', 'A', 'I', 'H')"><bean:message key="Default"/> <bean:message key="New"/></button><!--
			--><button type="button" class="btn_normal" onclick="frtRowAdd('DCROWADD', docObjects[6], 'A', 'I', 'H');afterRowAdd('DC');"><bean:message key="Add"/></button><!--
		    --><button type="button" class="btn_normal"  onclick="frtRowCopy('DC', docObjects[6], docObjects[1], docObjects[2], 'A', 'I', 'H');" > <bean:message key="Copy_toLocal"/></button>	
			</span>
		</div>
		<div id="mainTable"><script language="javascript">comSheetObject('sheet14');</script></div>
	</div>
	
	<div class="opus_design_grid">	
		<h3 class="title_design"> <bean:message key="Account_Payable"/></h3>
		<div class="opus_design_btn">
			<button type="button" class="btn_normal" onClick="setFrtSizeUp(docObjects[2], 'frtTableB')"><bean:message key="Plus"/></button><!--
			--><button type="button" class="btn_normal" onClick="setFrtSizeDown(docObjects[2], 'frtTableB')"><bean:message key="Minus"/></button>
			<span id="bcBtns" style="display:none;">
				<button type="button" class="btn_normal" onClick="goToInvoice(docObjects[2], 'AP')"><bean:message key="Create_AP"/></button><!--
			--><button type="button" class="btn_normal" onClick="goToInvoiceModify('AP')"><bean:message key="ViewEdit_Invoice"/></button><!--
			--><button type="button" class="btn_normal" onClick="setAirDfltFrt('b_', 'A', 'I', 'H')"><bean:message key="Default"/> <bean:message key="New"/></button><!--
			--><button type="button" class="btn_normal" onclick="frtRowAdd('BCROWADD', docObjects[2], 'A', 'I', 'H');afterRowAdd('AP');"><bean:message key="Add"/></button><!--
			--><button type="button" class="btn_normal"  onclick="frtRowCopy('AP', docObjects[2], docObjects[6],'', 'A', 'I', 'H');" > <bean:message key="Copy_toAgent"/></button><!--
			#2504 [PATENT]Debit Note & AP for billing code based invoices 
			--><span id="spanAPprint" style="display:none;"><button type="button" class="btn_normal"  onClick="goToCmbPrint(docObjects[2],'AP');" ><bean:message key="AP_Print"/></button></span>

			
			</span>
		</div>
		<div id="mainTable"><script language="javascript">comSheetObject('sheet6');</script></div>
	</div>
