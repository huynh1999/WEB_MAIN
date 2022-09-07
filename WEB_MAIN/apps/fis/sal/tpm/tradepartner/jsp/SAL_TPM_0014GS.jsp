<%--
=========================================================
*@FileName   : SAL_TPM_0014GS.jsp
*@FileTitle  : Trade Partner Management
*@Description: Trade Partner Management
*@author     : Choi,Gil-Ju - Cyberlogitec
*@version    : 1.0 - 01/07/2009
*@since      : 01/07/2009

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
				<bean:define id="rowSet" name="EventResponse" property="listVal"/>
				<SHEET>
					<DATA TOTAL="<bean:write name="EventResponse" property="listValCnt"/>">
					<logic:iterate id="row" name="rowSet">
						<tr>	
							<TD></TD>
							<TD></TD>
							<TD><![CDATA[<bean:write name="row" property="rep_flg"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="pic_eml_flg"/>]]></TD>
							<%-- OFVFOUR-7534 [PQC][S/I & VGM EDI] The screen was freezing after searching data --%>
							<TD><![CDATA[<bean:write name="row" property="pic_nm"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="trd_div_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="pic_phn"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="pic_mphn"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="pic_fax"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="pic_eml"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="pic_desc" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="sheet4"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="cntc_pson_seq"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="trd_div_nm"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="rgst_ofc_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="trdp_cd"/>]]></TD>
			            </tr>
					</logic:iterate>
					</DATA>
				</SHEET>
			</logic:notEmpty>
</logic:empty>
<%-- 오류발생 --%>
<logic:notEmpty name="com.clt.framework.core.comm.EXCEPTION_OBJECT      ">
	<ERROR>
		<MESSAGE><![CDATA[<bean:message name="com.clt.framework.core.comm.EXCEPTION_OBJECT      " property="message"/>]]> </MESSAGE>
	</ERROR>
</logic:notEmpty>
