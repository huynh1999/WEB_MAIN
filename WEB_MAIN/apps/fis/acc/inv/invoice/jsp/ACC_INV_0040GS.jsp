<%--
=========================================================
*@FileName   : ACC_INV_0040GS.jsp
*@FileTitle  : Invoice List
*@Description: Invoice List
*@author     : Chungrue - Cyberlogitec
*@version    : 1.0 - 2011/11/09
*@since      : 2011/11/09

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
				<bean:define id="tmpMapVal" name="EventResponse" property="mapVal"/>
				<bean:define id="strIdx" name="tmpMapVal" property="beginIdx"/>
				<% 
				boolean isBegin = true;
				int cnt = Integer.parseInt(strIdx.toString());
				%>
				<bean:define id="rowSet" name="EventResponse" property="listVal"/>
				<SHEET>
					<DATA TOTAL="<bean:write name="EventResponse" property="listValCnt"/>">
					<logic:iterate id="row" name="rowSet">
						<tr>
							<TD></TD>
							<TD></TD>
                            <TD><![CDATA[<bean:write name="row" property="inv_tp"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="post_dt"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="inv_dt"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="inv_due_dt"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="inv_no"  filter="false"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="trdp_nm" filter="false"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="biz_no"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="inv_aply_curr_cd" />]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="duty_tax_amt"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="non_taxable_amt"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="taxable_amt"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="vat_amt"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="whd_amt"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="inv_sum_amt"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="pay_amt"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="last_pay_dt"/>]]></TD>
                            
                            <%-- #1820 [PATENT] Invoice List - Tax Invoice No. Tax Bill, Financial Office 항목 추가  --%>
                            <TD><![CDATA[<bean:write name="row" property="last_chk_no"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="tax_no"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="tax_bil_flg"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="tax_no"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="tax_bil_flg"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="finc_ofc_cd"/>]]></TD>
                            
                            <TD><![CDATA[<bean:write name="row" property="bal_amt"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="hbl_no"/>]]></TD>
							<!-- OFVFOUR-8038: [BNX-TOR] Adding Rlsd.Date column into AR/AP list -->
							<TD><![CDATA[<bean:write name="row" property="rlsd_dt_tm"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="over_due"/>]]></TD>
						    <TD><![CDATA[<bean:write name="row" property="mbl_no" filter="false"/>]]></TD>							
                            <TD><![CDATA[<bean:write name="row" property="ref_no" filter="false"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="oth_ref_no" filter="false"/>]]></TD>
                             
                            <%-- WMS ACCOUNT LKH 2015.01.20 --%>
                            <TD><![CDATA[<bean:write name="row" property="wms_seq" filter="false"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="wms_ref_no" filter="false"/>]]></TD>
                            
                            <TD><![CDATA[<bean:write name="row" property="imp_ref_no" filter="false"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="cust_ref_no" filter="false"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="vnd_inv_no" filter="false"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="ship_trdp_nm" filter="false"/>]]></TD><!-- #874 [STARWAY] SHIP TO COLUMN ADD ON AR/AP LIST SCREEN -->
							<TD><![CDATA[<bean:write name="row" property="ofc_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="inv_rmk"  filter="false"/>]]></TD>
							<%-- #2108 [PATENT] INVOICE LIST - POL/POD 추가 --%>
							<TD><![CDATA[<bean:write name="row" property="pol_nm" />]]></TD>
							<TD><![CDATA[<bean:write name="row" property="etd_dt_tm"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="pod_nm" />]]></TD>	
							<TD><![CDATA[<bean:write name="row" property="eta_dt_tm"/>]]></TD>
							<!-- #5105 [Split - 1] [Best Ocean] Created Time and Last Modify Time columns add to BL List -->
                            <TD><![CDATA[<bean:write name="row" property="rgst_usr_nm" />]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="rgst_tms" />]]></TD>
                            <!-- #5105 [Split - 1] [Best Ocean] Created Time and Last Modify Time columns add to BL List -->
                            <TD><![CDATA[<bean:write name="row" property="modi_usr_nm" />]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="modi_tms" />]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="inv_modi_tms" />]]></TD>
                            
							<%-- #27785 [AIF] Add "TP Code" and "Alias" Columns to the AR/AP List Screen --%>
							<TD><![CDATA[<bean:write name="row" property="trdp_cd" />]]></TD>
							<TD><![CDATA[<bean:write name="row" property="shrt_nm" />]]></TD>
							
							<%-- #5408 [JTC] Invoice List 에 Local Amount 컬럼 추가 --%>
							<TD><![CDATA[<bean:write name="row" property="locl_ttl_amt" />]]></TD>
							
							<%-- #5395 [Star Cluster Mexico] Voucher Type & Voucher No. Column add to Invoice List --%>
							<TD><![CDATA[<bean:write name="row" property="vchr_tp_nm" />]]></TD>
							<TD><![CDATA[<bean:write name="row" property="vchr_no" />]]></TD>
							<%-- OFVFOUR-8196: [BNX] Adding Bank Date Column in AR/AP list --%>
							<TD><![CDATA[<bean:write name="row" property="clr_dt" />]]></TD>
							
							<TD><![CDATA[<bean:write name="row" property="inv_seq" />]]></TD>
							<TD><![CDATA[<bean:write name="row" property="intg_bl_seq" />]]></TD>
							<TD><![CDATA[<bean:write name="row" property="oth_seq" />]]></TD>
							<%-- <TD><![CDATA[<bean:write name="row" property="trdp_cd" />]]></TD> --%>
							<TD><![CDATA[<bean:write name="row" property="sell_buy_tp_cd" />]]></TD>
							<TD><![CDATA[<bean:write name="row" property="bl_cnt_cd" />]]></TD>
							<TD><![CDATA[<bean:write name="row" property="ref_ofc_cd" />]]></TD>
							<TD><![CDATA[<bean:write name="row" property="clt_cmpl_flg" />]]></TD>
							<TD><![CDATA[<bean:write name="row" property="jnr_no" />]]></TD>
							<TD><![CDATA[<bean:write name="row" property="cmb_inv_seq" />]]></TD>
							<TD></TD>
							<TD><![CDATA[<bean:write name="row" property="duty_tax_tot_amt" />]]></TD>
							<TD><![CDATA[<bean:write name="row" property="non_taxable_tot_amt" />]]></TD>
							<TD><![CDATA[<bean:write name="row" property="taxable_tot_amt" />]]></TD>
							<TD><![CDATA[<bean:write name="row" property="vat_tot_amt" />]]></TD>
							<TD><![CDATA[<bean:write name="row" property="whd_tot_amt" />]]></TD>
							<TD><![CDATA[<bean:write name="row" property="profit_amt" />]]></TD>
							<TD>1</TD>
							<TD><![CDATA[<bean:write name="row" property="pay_tot_amt" />]]></TD>
							<TD><![CDATA[<bean:write name="row" property="bal_tot_amt" />]]></TD>
							<TD><![CDATA[<bean:write name="row" property="locl_ttl_tot_amt" />]]></TD> <!-- //#5408 [JTC] Invoice List 에 Local Amount 컬럼 추가 -->
							<TD><![CDATA[<% if(isBegin){ isBegin = false; %><bean:write name="tmpMapVal" property="pagingTbl"/><%}%>]]></TD>
							
							<TD><![CDATA[<bean:write name="row" property="m_intg_bl_seq" />]]></TD>
							<TD><![CDATA[<bean:write name="row" property="bnd_clss_cd" />]]></TD>
							<TD><![CDATA[<bean:write name="row" property="air_sea_clss_cd" />]]></TD>
							<TD><![CDATA[<bean:write name="row" property="trx_modi_tms" />]]></TD>
							
							<%-- #964 [SHINE] Account Slip 기능 보완 - 전체 Accounting 기능 --%>
							<TD><![CDATA[<bean:write name="row" property="slip_no" />]]></TD>
							<TD><![CDATA[<bean:write name="row" property="bloked_by" />]]></TD>
							<TD><![CDATA[<bean:write name="row" property="issued_by" />]]></TD>
							<TD><![CDATA[<bean:write name="row" property="block_dt" />]]></TD>
							
							<%-- #5395 [Star Cluster Mexico] Voucher Type & Voucher No. Column add to Invoice List --%>
							<%-- #1799 [PATENT] VOUCHER 양식 - Deposit/Payment for CHINA Account Slip [Form] 
							<TD><![CDATA[<bean:write name="row" property="vchr_no" />]]></TD>
							<TD><![CDATA[<bean:write name="row" property="vchr_tp_nm" />]]></TD>--%>
							
							<TD><![CDATA[<bean:write name="row" property="o_inv_no" />]]></TD>
							<%-- #6301 [JAPT] Mail sending function related request --%>
							<TD><![CDATA[<bean:write name="row" property="lnr_bkg_no" />]]></TD>
							<TD><![CDATA[<bean:write name="row" property="trnk_vsl_nm" />]]></TD>
							<TD><![CDATA[<bean:write name="row" property="trnk_voy" />]]></TD>
							
							<%-- OFVFOUR-6122 [Star-Mex] OPUS Invoice List - Invoice Amount Total by Currency --%>
							<TD><![CDATA[<bean:write name="row" property="tot_cnt" />]]></TD>
							<TD><![CDATA[<bean:write name="row" property="subsum_add_tot_cnt" />]]></TD>
							<TD><![CDATA[<bean:write name="row" property="rownum" />]]></TD>
							
							
			            </tr>
					</logic:iterate>
					</DATA>
				</SHEET>
			</logic:notEmpty>
</logic:empty>
<%-- 오류발생 --%>
<logic:notEmpty name="com.clt.framework.core.comm.EXCEPTION_OBJECT      ">
	<ERROR>
		<MESSAGE><![CDATA[ <bean:message name="com.clt.framework.core.comm.EXCEPTION_OBJECT      " property="message"/>]]> </MESSAGE>
	</ERROR>
</logic:notEmpty>
