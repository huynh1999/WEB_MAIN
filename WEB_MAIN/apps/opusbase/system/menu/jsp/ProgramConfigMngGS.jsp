<%--
=========================================================
*Copyright(c) 2017 CyberLogitec. All Rights Reserved.
=========================================================

=========================================================
*@FileName   : ProgramConfigMngGS.jsp
*@FileTitle  : Program Configuration Management
*@Description:  
*@author     : Thoa Dien - DOU Networks
*@version    : 1.0 - 04/12/2017
*@since      : 04/12/2017

*@Change history:
=========================================================
--%>
<%@ page contentType="text/xml; charset=UTF-8"%>
<%@page pageEncoding="UTF-8"%>
<%@include file="./../../../../../../../../syscommon/header/CLTGSHeader.jsp"%>

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
							<TD></TD>
							<TD></TD>
							<TD><![CDATA[<bean:write name="row" property="ofc_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="pgm_id"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="pgm_nm"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="tgt_dt_tp_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="prd_bse_tp_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="fm_dt"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="to_dt"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="prd_max_dt"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="use_init_set_flg" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="init_dat_lod_flg" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="pg_row_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="use_ib_hd_flg" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="dflt_ib_hd_desc" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="use_dtl_set_flg" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="dtl_set_desc" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="rgst_tms"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="modi_tms"/>]]></TD>
			            </tr>
					</logic:iterate>
						</DATA>
				</SHEET>
			</logic:notEmpty>
</logic:empty>
