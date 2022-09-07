<%--
=========================================================
*@FileName   : WHM_WHM_0001_WHGS.jsp
*@FileTitle  : Warehouse Entry
*@Description: 
*@author     : Vinh Vo - Dou
*@version    : 1.0 - 2014/12/23
*@since      : 2014/12/23

*@Change history:
=========================================================
--%>
<%@ page contentType="text/xml; charset=UTF-8"%>
<%@page pageEncoding="UTF-8"%>
<%@include file="./../../../../../../syscommon/header/CLTGSHeader.jsp"%>
<%-- 정상처리 --%>
<logic:empty name="com.clt.framework.core.comm.EXCEPTION_OBJECT">
		
				<bean:define id="valMap" name="EventResponse" property="mapVal"/>
				
				<logic:notEmpty name="valMap" property="res">
					<CHECK>
						<result><![CDATA[<bean:write name="valMap" property="res"/>]]></result>
					</CHECK>
				</logic:notEmpty>
				
				<logic:notEmpty name="valMap" property="attachment">
				
 					<bean:define id="rowSetSheet" name="valMap" property="attachment"/>
 					
 					<bean:size id="sheet_size" name="rowSetSheet"/>
					<SHEET>
						<DATA TOTAL="<bean:write name="sheet_size" />">
						<logic:iterate id="rowSheet" name="rowSetSheet">
							<tr>
								<TD></TD>
								<TD></TD>
								<TD><bean:write name="rowSheet" property="file_org_nm"/></TD>
								<TD><bean:write name="rowSheet" property="upload_date"/></TD>
								<TD><bean:write name="rowSheet" property="file_size"/></TD>
								<TD><bean:write name="rowSheet" property="doc_no"/></TD>
								<TD><bean:write name="rowSheet" property="file_path"/></TD>
								<TD><bean:write name="rowSheet" property="file_sys_nm"/></TD>
								<TD><bean:write name="rowSheet" property="svc_tp_cd"/></TD>
								<TD><bean:write name="rowSheet" property="doc_ref_tp_cd"/></TD>
								<TD><bean:write name="rowSheet" property="doc_tp_cd"/></TD>
				            </tr>
						</logic:iterate>
						</DATA>
					</SHEET>
				</logic:notEmpty>	
</logic:empty>
<%-- 오류발생 --%>
<logic:notEmpty name="com.clt.framework.core.comm.EXCEPTION_OBJECT      ">
	<ERROR>
		<MESSAGE><![CDATA[ <bean:message name="com.clt.framework.core.comm.EXCEPTION_OBJECT" property="message"/>]]> </MESSAGE>
	</ERROR>
</logic:notEmpty>
