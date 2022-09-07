<%--
=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
=========================================================

=========================================================
*@FileName   : ClosingInOutMgmtGS.jsp
*@FileTitle  : 
*@Description: 
*@author     : LSY - Cyberlogitec
*@version    : 1.0 - 2016/11/14
*@since      : 2016/11/14

*@Change history:
=========================================================
--%>
<%@ page contentType="text/xml; charset=UTF-8"%>
<%@page pageEncoding="UTF-8"%>
<%@include file="./../../../../../../syscommon/header/CLTGSHeader.jsp"%>
<%-- 정상처리 --%>
<logic:empty name="com.clt.framework.core.comm.EXCEPTION_OBJECT      ">
	<%-- 조회 결과가 없는 경우 --%>
	<logic:empty name="EventResponse" property="mapVal">
		<SHEET>
			<DATA TOTAL="0"></DATA>
		</SHEET>	
	</logic:empty>
	<%-- 조회 결과가 있는 경우 --%>
	<logic:notEmpty name="EventResponse" property="mapVal">
		<bean:define id="rowSet" name="EventResponse" property="mapVal"/>
		<SHEET>
			<ETC-DATA> 
			    <ETC KEY="mess"><bean:write name="rowSet" property="strMess"/></ETC>
			    <ETC KEY="cls_no"><bean:write name="rowSet" property="cls_no"/></ETC>
			</ETC-DATA> 
		</SHEET>
		<logic:notEmpty name="rowSet" property="hdrCnt">
			<CHECK2>
				<hdrCnt><![CDATA[<bean:write name="rowSet" property="hdrCnt"/>]]></hdrCnt>
			</CHECK2>
		</logic:notEmpty>
		<logic:notEmpty name="rowSet" property="listCnt">
			<CHECK>
				<listCnt><![CDATA[<bean:write name="rowSet" property="listCnt"/>]]></listCnt>
			</CHECK>
		</logic:notEmpty>

		<logic:notEmpty name="rowSet" property="whEtrVO">
			<bean:define id="whEtrVO" name="rowSet" property="whEtrVO"/>
			<INFO>
				<WH_OFC_CD><bean:write name="whEtrVO" property="wh_ofc_cd"/></WH_OFC_CD>
				<WH_CURR_CD><bean:write name="whEtrVO" property="wh_curr_cd"/></WH_CURR_CD>
			</INFO>
		</logic:notEmpty>
		
		<logic:notEmpty name="rowSet" property="contractInfo">
			<bean:define id="contractInfo" name="rowSet" property="contractInfo"/>
			<INFO>
				<CTRT_CUST_CD><bean:write name="contractInfo" property="ctrt_cust_cd"/></CTRT_CUST_CD>
				<CTRT_CUST_NM><bean:write name="contractInfo" property="ctrt_cust_nm" filter="false"/></CTRT_CUST_NM>
			</INFO>
		</logic:notEmpty>
		
		<logic:notEmpty name="rowSet" property="header">
			<bean:define id="rowSetField" name="rowSet" property="header"/>
			<FIELD>
				<DATA TOTAL="1">
					<logic:iterate id="rowField" name="rowSetField">
						<listCnt><![CDATA[<bean:write name="rowSet" property="listCnt"/>]]></listCnt>
						<cls_no><![CDATA[<bean:write name="rowField" property="cls_no"/>]]></cls_no>
						<cust_nm><![CDATA[<bean:write name="rowField" property="cust_nm" filter="false"/>]]></cust_nm>
						<cust_cd><![CDATA[<bean:write name="rowField" property="cust_cd"/>]]></cust_cd>
						<sort_by><![CDATA[<bean:write name="rowField" property="sort_by"/>]]></sort_by>
						<inv_ttl_amt><![CDATA[<bean:write name="rowField" property="inv_ttl_amt"/>]]></inv_ttl_amt>
						<curr_cd><![CDATA[<bean:write name="rowField" property="curr_cd"/>]]></curr_cd>
						<sts_cd><![CDATA[<bean:write name="rowField" property="sts_cd"/>]]></sts_cd>
						<sts_nm><![CDATA[<bean:write name="rowField" property="sts_nm"/>]]></sts_nm>
						<cls_dt><![CDATA[<bean:write name="rowField" property="cls_dt"/>]]></cls_dt>
						<set_fr_dt><![CDATA[<bean:write name="rowField" property="set_fr_dt"/>]]></set_fr_dt>
						<set_to_dt><![CDATA[<bean:write name="rowField" property="set_to_dt"/>]]></set_to_dt>
						<period><![CDATA[<bean:write name="rowField" property="period"/>]]></period>
						<f_remark><![CDATA[<bean:write name="rowField" property="f_remark" filter="false"/>]]></f_remark>
						<wm_doc_seq><![CDATA[<bean:write name="rowField" property="wm_doc_seq"/>]]></wm_doc_seq>
						<ref_no><![CDATA[<bean:write name="rowField" property="ref_no"/>]]></ref_no>
					</logic:iterate>
				</DATA>
			</FIELD>
		</logic:notEmpty>
		
		<logic:notEmpty name="rowSet" property="sheet1">
			<bean:define id="rowSetSheet1" name="rowSet" property="sheet1"/>
			
			<bean:size id="sheet1_size" name="rowSetSheet1"/>
			<SHEET1>
				<DATA TOTAL="<bean:write name="sheet1_size" />">
				<logic:iterate id="rowSheet" name="rowSetSheet1">
					<tr>
						<TD></TD>
						<TD></TD>
						<TD><bean:write name="rowSheet" property="tj_dt"/></TD>
						<TD><bean:write name="rowSheet" property="rate_tp_cd"/></TD>
						<TD><bean:write name="rowSheet" property="cust_ord_no"/></TD>
						<TD><bean:write name="rowSheet" property="ord_tp_cd"/></TD>
						<TD><bean:write name="rowSheet" property="cust_cd"/></TD>
						<TD><bean:write name="rowSheet" property="cust_nm"/></TD>
						<TD><bean:write name="rowSheet" property="frt_cd"/></TD>
						<TD><bean:write name="rowSheet" property="frt_nm"/></TD>
						<TD><bean:write name="rowSheet" property="unit_cd"/></TD>
						<TD><bean:write name="rowSheet" property="unit_cd2"/></TD>
						<TD><bean:write name="rowSheet" property="curr_cd"/></TD>
						<TD><bean:write name="rowSheet" property="unit_price"/></TD>
						<TD><bean:write name="rowSheet" property="qty"/></TD>
						<TD><bean:write name="rowSheet" property="inv_amt"/></TD>
						<TD><bean:write name="rowSheet" property="item_cd"/></TD>
						<TD><bean:write name="rowSheet" property="cls_no"/></TD>
						<TD><bean:write name="rowSheet" property="cls_dt"/></TD>
						<TD><bean:write name="rowSheet" property="inv_seq"/></TD>
						<TD><bean:write name="rowSheet" property="wh_cd"/></TD>
						<TD><bean:write name="rowSheet" property="ctrt_no"/></TD>
						<TD><bean:write name="rowSheet" property="ofc_cd"/></TD>
						<TD><bean:write name="rowSheet" property="inv_ttl_amt"/></TD>
						<TD><bean:write name="rowSheet" property="sell_buy_tp_cd"/></TD>
						<TD><bean:write name="rowSheet" property="frt_seq"/></TD>
						<TD><bean:write name="rowSheet" property="wib_bk_frt_seq"/></TD>
						<TD><bean:write name="rowSheet" property="rating_flg"/></TD>
						<TD><bean:write name="rowSheet" property="sts_cd"/></TD>
						<TD><bean:write name="rowSheet" property="wib_bk_no"/></TD>
		            </tr>
				</logic:iterate>
				</DATA>
			</SHEET1>
		</logic:notEmpty>
	</logic:notEmpty>
</logic:empty>
<%-- 오류발생 --%>
<%-- 오류발생 --%>
<logic:notEmpty name="com.clt.framework.core.comm.EXCEPTION_OBJECT      ">
	<ERROR>
		<MESSAGE><![CDATA[ <bean:write name="com.clt.framework.core.comm.EXCEPTION_OBJECT      " property="message"/>]]> </MESSAGE>
	</ERROR>
</logic:notEmpty>
