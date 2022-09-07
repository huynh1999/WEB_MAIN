<%--
=========================================================
*@FileName   : SEE-BMD-0010GS.jsp
*@FileTitle  : 최상위 메뉴 표시
*@Description: 최상위 메뉴의 관리
*@author     : 이광훈 - 주문
*@version    : 1.0 - 12/22/2008
*@since      : 12/22/2008

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
			<bean:define id="rowSet" name="EventResponse" property="listVal" />
				
				<SHEET>
					<DATA TOTAL="<bean:write name="EventResponse" property="listValCnt"/>">
					<logic:iterate id="row" name="rowSet">
						<tr>	
							<TD></TD>
							<TD><![CDATA[<bean:write name="row" property="ref_no"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="bl_no"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="lnr_bkg_no"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="cntr_no"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="trnk_vsl_nm" />]]></TD>
							<TD><![CDATA[<bean:write name="row" property="trnk_voy" />]]></TD>
							<TD><![CDATA[<bean:write name="row" property="pol_nm" />]]></TD>
							<TD><![CDATA[<bean:write name="row" property="trnk_vsl_cd" />]]></TD>
							<TD><![CDATA[<bean:write name="row" property="pol_cd" />]]></TD>
							<TD><![CDATA[<bean:write name="row" property="intg_bl_seq" />]]></TD>
							<TD><![CDATA[<bean:write name="row" property="cntr_tpsz_cd" />]]></TD>
							<TD><![CDATA[<bean:write name="row" property="lloyd_no" />]]></TD>
							<TD><![CDATA[<bean:write name="row" property="intg_bkg_seq" />]]></TD>
							
							<TD></TD>  
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
