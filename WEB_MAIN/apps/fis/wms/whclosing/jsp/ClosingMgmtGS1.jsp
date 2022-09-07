<%--
=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
=========================================================

=========================================================
*@FileName   : WWHM_WHM_0009GS.jsp
*@FileTitle  : 
*@Description: 
*@author     : Thoa.Dien - Cyberlogitec
*@version    : 1.0 - 2014/12/22
*@since      : 2014/12/22

*@Change history:
=========================================================
--%>
<%@ page contentType="text/xml; charset=UTF-8"%>
<%@page pageEncoding="UTF-8"%>
<%@include file="./../../../../../../syscommon/header/CLTGSHeader.jsp"%>
<%-- 정상처리 --%>
<logic:empty name="com.clt.framework.core.comm.EXCEPTION_OBJECT      ">
	<logic:empty name="EventResponse" property="listVal">
		<SHEET>
			<DATA TOTAL="0"></DATA>
		</SHEET>	
	</logic:empty>
	<%-- 조회 결과가 있는 경우 --%>
	<%-- LKH::2015-11-03 WMS4.O --%>
	<logic:notEmpty name="EventResponse" property="listVal">
		<bean:define id="rowSet1" name="EventResponse" property="listVal"/>
		<SHEET>
			<DATA TOTAL="<bean:write name="EventResponse" property="listValCnt"/>">
			<logic:iterate id="row1" name="rowSet1">
				<tr>
					<TD><bean:write name="row1" property="cls_key"/></TD>
					<TD><bean:write name="row1" property="cls_no"/></TD>
					<TD><bean:write name="row1" property="cls_dt"/></TD>
					<TD><bean:write name="row1" property="set_fr_dt"/></TD>
					<TD><bean:write name="row1" property="set_to_dt"/></TD>
					<TD><bean:write name="row1" property="ofc_cd"/></TD>
					<TD><bean:write name="row1" property="ctrt_no"/></TD>
					<TD><bean:write name="row1" property="ctrt_nm"/></TD>
					<TD><bean:write name="row1" property="merge_key"/></TD>
					<TD><bean:write name="row1" property="chk1"/></TD>
					<TD><bean:write name="row1" property="cust_cd"/></TD>
					<TD><bean:write name="row1" property="cust_nm"/></TD>
					<TD><bean:write name="row1" property="sts_cd"/></TD>
					<TD><bean:write name="row1" property="so_no"/></TD>
					<TD><bean:write name="row1" property="sb_cls_cd"/></TD>
					<TD><bean:write name="row1" property="sub_tot"/></TD>
					<TD><bean:write name="row1" property="rn"/></TD>
					<TD><bean:write name="row1" property="chk2"/></TD>
					<TD><bean:write name="row1" property="inv_no"/></TD>
					<TD><bean:write name="row1" property="inv_seq"/></TD>
					<TD><bean:write name="row1" property="rate_tp_cd"/></TD>
					<TD><bean:write name="row1" property="order_rel"/></TD>
					<TD><bean:write name="row1" property="frt_cd"/></TD>
					<TD><bean:write name="row1" property="frt_nm"/></TD>
					<TD><bean:write name="row1" property="curr_cd"/></TD>
					<TD><bean:write name="row1" property="unit_cd"/></TD>
					<TD><bean:write name="row1" property="unit_qty"/></TD>
					<TD><bean:write name="row1" property="unit_price"/></TD>
					<TD><bean:write name="row1" property="basic_amt"/></TD>
					<TD><bean:write name="row1" property="adjust_amt"/></TD>
					<TD><bean:write name="row1" property="tot_amt"/></TD>
					<TD><bean:write name="row1" property="wh_cd"/></TD>
					<TD><bean:write name="row1" property="wh_nm"/></TD>
					<TD></TD>
					<TD><bean:write name="row1" property="rmk"/></TD>
					<TD><bean:write name="row1" property="rmk2"/></TD>
					<TD><bean:write name="row1" property="rtp_no"/></TD>
					<TD><bean:write name="row1" property="src_tp_cd"/></TD>
					<TD><bean:write name="row1" property="cls_seq"/></TD>
					<TD><bean:write name="row1" property="cls_agr_no"/></TD>
					<TD><bean:write name="row1" property="cls_frt_seq"/></TD>
					<TD><bean:write name="row1" property="dtl_unit_cd"/></TD>
					<TD><bean:write name="row1" property="ibflag"/></TD>
					<TD><bean:write name="row1" property="dtl_frt_nm"/></TD>
					<TD><bean:write name="row1" property="frt_seq"/></TD>
					<TD><bean:write name="row1" property="wm_doc_seq"/></TD>
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
