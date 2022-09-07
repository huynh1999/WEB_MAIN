<%--
=========================================================
*@FileName   : ARI_DOC_1010GS.jsp
*@FileTitle  : AUTHORITY TO MAKE ENTRY
*@Description: AUTHORITY TO MAKE ENTRY
*@author     : Chungrue
*@version    : 1.0 - 2011/12/07
*@since      : 2011/12/07

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
							<TD><![CDATA[<bean:write name="row" property="bl_no"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="cust_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="cust_nm" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="brk_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="brk_nm" filter="false" />]]></TD>
							<TD><![CDATA[<bean:write name="row" property="chk"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="cust_fax_flg"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="cust_eml_flg"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="brk_fax_flg"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="brk_eml_flg"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="intg_bl_seq"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="cust_fax"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="cust_eml"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="brk_fax"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="brk_eml"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="cust_pic_nm" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="brk_pic_nm" filter="false" />]]></TD> 
							<TD></TD>
							<TD></TD>
							<TD></TD>
							<TD></TD>
							<TD></TD>
							<TD></TD>
							<TD></TD>
							<TD></TD>
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
