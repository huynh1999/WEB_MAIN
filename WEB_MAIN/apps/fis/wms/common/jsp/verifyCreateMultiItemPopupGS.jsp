<%--
=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
=========================================================

=========================================================
*@FileName   : verifyCreateMultiItemPopupGS.jsp
*@FileTitle  : 
*@Description: 
*@author     : LKH - Cyberlogitec
*@version    : 1.0 
*@since      :  

*@Change history: 
=========================================================
--%>
<%@ page contentType="text/xml; charset=UTF-8"%>
<%@page pageEncoding="UTF-8"%>
<%@include file="./../../../../../../syscommon/header/CLTGSHeader.jsp"%>
<%-- 정상처리 --%>
<logic:empty name="com.clt.framework.core.comm.EXCEPTION_OBJECT">
		<%-- 조회 결과가 없는 경우 --%>
			<logic:empty name="EventResponse" property="mapVal">
				<SHEET>
					<DATA TOTAL="0"></DATA>
				</SHEET>	
			</logic:empty>
		<%-- 조회 결과가 있는 경우 --%>
			<logic:notEmpty name="EventResponse" property="mapVal">
				<bean:define id="rowSet" name="EventResponse" property="mapVal"/>
				
				<logic:notEmpty name="rowSet" property="listCnt">
					<CHECK>
						<listCnt><![CDATA[<bean:write name="rowSet" property="listCnt"/>]]></listCnt>
					</CHECK>
				</logic:notEmpty>
				
				<logic:notEmpty name="rowSet" property="header">
 					<bean:define id="rowSetField" name="rowSet" property="header"/>
					<FIELD>
						<DATA TOTAL="1">
							<logic:iterate id="rowField" name="rowSetField">
								<listCnt><![CDATA[<bean:write name="rowSet" property="listCnt"/>]]></listCnt>
								<ctrt_no><![CDATA[<bean:write name="rowField" property="ctrt_no"/>]]></ctrt_no>								
							</logic:iterate>
						</DATA>
					</FIELD>
				</logic:notEmpty>
				
 					<bean:define id="rowSetSheet1" name="rowSet" property="itemCheckList"/>
 					<bean:size id="sheet1_size" name="rowSetSheet1"/>
					<SHEET1>
						<DATA TOTAL="<bean:write name="sheet1_size" />">
						<logic:iterate id="rowSheet" name="rowSetSheet1">
							<bean:write name="rowSheet" property="item_cd"/>^**^
						</logic:iterate>
						</DATA>
					</SHEET1>
				
 					<bean:define id="rowSetSheet2" name="rowSet" property="unitCode"/>
 					<bean:size id="sheet2_size" name="rowSetSheet2"/>
					<SHEET2>
						<DATA TOTAL="<bean:write name="sheet2_size" />">
						<logic:iterate id="rowSheet" name="rowSetSheet2">
							<![CDATA[<bean:write name="rowSheet" property="codeCd"/>^**^]]>
						</logic:iterate>
						</DATA>
					</SHEET2>
				
 					<bean:define id="rowSetSheet3" name="rowSet" property="htsCode"/>
 					<bean:size id="sheet3_size" name="rowSetSheet3"/>
					<SHEET3>
						<DATA TOTAL="<bean:write name="sheet3_size" />">
						<logic:iterate id="rowSheet" name="rowSetSheet3">
							<![CDATA[<bean:write name="rowSheet" property="cmdt_cd"/>^**^]]>
						</logic:iterate>
						</DATA>
					</SHEET3>
				
				
 					<bean:define id="rowSetSheet4" name="rowSet" property="groupCode"/>
 					<bean:size id="sheet4_size" name="rowSetSheet4"/>
					<SHEET4>
						<DATA TOTAL="<bean:write name="sheet4_size" />">
						<logic:iterate id="rowSheet" name="rowSetSheet4">
							<![CDATA[<bean:write name="rowSheet" property="item_grp_cd"/>^**^]]>
						</logic:iterate>
						</DATA>
					</SHEET4>
					
					<bean:define id="rowSetSheet5" name="rowSet" property="item_duplicate"/>
 					<bean:size id="sheet5_size" name="rowSetSheet5"/>
					<SHEET5>
						<DATA TOTAL="<bean:write name="sheet5_size" />">
						<logic:iterate id="rowSheet" name="rowSetSheet5">
							<bean:write name="rowSheet" property="item_cd"/>^**^
						</logic:iterate>
						</DATA>
					</SHEET5>
					
			</logic:notEmpty>
</logic:empty>
<%-- 오류발생 --%>
<logic:notEmpty name="com.clt.framework.core.comm.EXCEPTION_OBJECT">
	<ERROR>
		<MESSAGE><![CDATA[ <bean:message name="com.clt.framework.core.comm.EXCEPTION_OBJECT" property="message"/>]]> </MESSAGE>
	</ERROR>
</logic:notEmpty>
