<%--
=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : WHInListSearch.jsp
*@FileTitle  : 
*@Description: 
*@author     : Tien.Duong - Cyberlogitec
*@version    : 1.0 - 2016/08/31
*@since      : 2016/08/31

*@Change history:
=========================================================
--%>
<%@ page contentType="text/xml; charset=UTF-8"%>
<%@page pageEncoding="UTF-8"%>
<%@include file="./../../../../../../syscommon/header/CLTGSHeader.jsp"%>
<%-- 정상처리 --%>
<logic:empty name="com.clt.framework.core.comm.EXCEPTION_OBJECT      ">
		<%-- 조회 결과가 없는 경우 --%>
			<logic:empty name="EventResponse" property="listVal">
				<SHEET>
					<DATA TOTAL="0"></DATA>
				</SHEET>	
			</logic:empty>
		<%-- 조회 결과가 있는 경우 --%>
			<logic:notEmpty name="EventResponse" property="listVal">
				<bean:define id="rowSet" name="EventResponse" property="listVal"/>
				<SHEET>
					<DATA TOTAL="<bean:write name="EventResponse" property="listValCnt"/>">
					<logic:iterate id="row" name="rowSet">
						<tr>
							<%-- OFVFOUR-7671 [PQC] The system there are some UIs has broken when opening UIs --%>
							<TD><![CDATA[<bean:write name="row" property="cust_ord_no"/>]]></TD> 		
							<TD><![CDATA[<bean:write name="row" property="bk_sts_nm"/>]]></TD>   		
							<TD><![CDATA[<bean:write name="row" property="putawy_sts_nm"/>]]></TD> <!-- //#1881 [BINEX WMS4.0] PUTAWAY LOCATION COLUMN ADD TO INBOUND LIST -->
							<TD><![CDATA[<bean:write name="row" property="inv_sts_nm"/>]]></TD> <!-- //#2321 [WMS4.0] INVOICE PAID STATUS TO BE ADDED TO IN/OUTBOUND LIST -->
							<TD><![CDATA[<bean:write name="row" property="cust_ord_no"/>]]></TD> 		
							<TD><![CDATA[<bean:write name="row" property="ctrt_nm"/>]]></TD>   		
							<TD><![CDATA[<bean:write name="row" property="item_cd"/>]]></TD>   		
							<TD><![CDATA[<bean:write name="row" property="item_nm"/>]]></TD>   		
							<TD><![CDATA[<bean:write name="row" property="est_in_dt"/>]]></TD>  		
							<TD><![CDATA[<bean:write name="row" property="inbound_dt"/>]]></TD>   	    	  	
							<TD><![CDATA[<bean:write name="row" property="lot_no"/>]]></TD>           
							<TD><![CDATA[<bean:write name="row" property="exp_dt"/>]]></TD>   		
							<TD><![CDATA[<bean:write name="row" property="lot_04"/>]]></TD>   		
							<TD><![CDATA[<bean:write name="row" property="lot_05"/>]]></TD>			
							<TD><![CDATA[<bean:write name="row" property="item_pkgunit"/>]]></TD>   	
							<TD><![CDATA[<bean:write name="row" property="item_pkgqty"/>]]></TD>   	
							<TD><![CDATA[<bean:write name="row" property="pkg_info"/>]]></TD>   		
							<TD><![CDATA[<bean:write name="row" property="item_ea_qty"/>]]></TD>   	
							<TD><![CDATA[<bean:write name="row" property="snd_pkgunit"/>]]></TD>   	
							<TD><![CDATA[<bean:write name="row" property="snd_pkgqty"/>]]></TD>   	
							<TD><![CDATA[<bean:write name="row" property="snd_ea_qty"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="inbound_loc_nm"/>]]></TD>   
							<TD><![CDATA[<bean:write name="row" property="item_pkgqty"/>]]></TD> <!-- Estimated Qty Column -->
							<TD><![CDATA[<bean:write name="row" property="snd_pkgqty"/>]]></TD> <!-- Received Qty Column --> 
							<TD><![CDATA[<bean:write name="row" property="trucker_cd"/>]]></TD><!-- Trucker Code Column -->   	  
							<TD><![CDATA[<bean:write name="row" property="trucker_nm"/>]]></TD><!-- Trucker Name Column -->
							<TD><![CDATA[<bean:write name="row" property="dlv_ord_no"/>]]></TD><!-- D/O Column --> 
							<TD><![CDATA[<bean:write name="row" property="os_item_ea_qty"/>]]></TD>   
							<TD><![CDATA[<bean:write name="row" property="item_ser_no"/>]]></TD>			
							<TD><![CDATA[<bean:write name="row" property="lic_plat_no"/>]]></TD>			
							<TD><![CDATA[<bean:write name="row" property="in_item_cbm"/>]]></TD>   	
							<TD><![CDATA[<bean:write name="row" property="in_item_cbf"/>]]></TD>   	
							<TD><![CDATA[<bean:write name="row" property="in_item_grs_kgs"/>]]></TD>  
							<TD><![CDATA[<bean:write name="row" property="in_item_grs_lbs"/>]]></TD>  
							<TD><![CDATA[<bean:write name="row" property="in_item_net_kgs"/>]]></TD>  
							<TD><![CDATA[<bean:write name="row" property="in_item_net_lbs"/>]]></TD>  
							<TD><![CDATA[<bean:write name="row" property="wib_bk_no"/>]]></TD>   		
							<TD><![CDATA[<bean:write name="row" property="po_no"/>]]></TD>   			
							<TD><![CDATA[<bean:write name="row" property="mbl_no"/>]]></TD>   		
							<TD><![CDATA[<bean:write name="row" property="hbl_no"/>]]></TD>   		
							<TD><![CDATA[<bean:write name="row" property="lot_id"/>]]></TD>   		
							<TD><![CDATA[<bean:write name="row" property="ref_no"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="commc_inv_no"/>]]></TD><!-- Invoice No Column -->
							<TD><![CDATA[<bean:write name="row" property="rmk"/>]]></TD><!-- Remark Column -->          		
							<TD><![CDATA[<bean:write name="row" property="ord_tp_nm"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="wh_cd"/>]]></TD>  		
							<TD><![CDATA[<bean:write name="row" property="dmg_pkgunit"/>]]></TD>   	
							<TD><![CDATA[<bean:write name="row" property="dmg_pkgqty"/>]]></TD>   	
							<TD><![CDATA[<bean:write name="row" property="dmg_loc_nm"/>]]></TD>   	
							<TD><![CDATA[<bean:write name="row" property="in_item_ea_qty"/>]]></TD>   
							<TD><![CDATA[<bean:write name="row" property="in_item_pe_qty"/>]]></TD>   
							<TD><![CDATA[<bean:write name="row" property="curr_cd"/>]]></TD>			
							<TD><![CDATA[<bean:write name="row" property="unit_price"/>]]></TD>		
							<TD><![CDATA[<bean:write name="row" property="wh_nm"/>]]></TD>			
							<TD><![CDATA[<bean:write name="row" property="bk_sts_cd"/>]]></TD>   		
							<TD><![CDATA[<bean:write name="row" property="ctrt_no"/>]]></TD>			
							
							<TD><![CDATA[<bean:write name="row" property="rgst_id"/>]]></TD>		
							<TD><![CDATA[<bean:write name="row" property="rgst_loc_dt"/>]]></TD>					
			            </tr>
					</logic:iterate>
					</DATA>
				</SHEET>
			</logic:notEmpty>
</logic:empty>
<%-- 오류발생 --%>
<logic:notEmpty name="com.clt.framework.core.comm.EXCEPTION_OBJECT      ">
	<ERROR>
		<logic:empty name="systemLanguage">
			<MESSAGE><![CDATA[ <bean:message name="com.clt.framework.core.comm.EXCEPTION_OBJECT      " property="message"/>]]> </MESSAGE>
		</logic:empty>
		<logic:notEmpty name="systemLanguage">
			<MESSAGE><![CDATA[ <bean:write name="com.clt.framework.core.comm.EXCEPTION_OBJECT      " property="message"/>]]> </MESSAGE>
		</logic:notEmpty>
	</ERROR>
</logic:notEmpty>
