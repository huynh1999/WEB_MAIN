
<%@ page contentType="text/xml; charset=UTF-8"%>
<%@page pageEncoding="UTF-8"%>
<%@include file="./../../../../../../syscommon/header/CLTGSHeader.jsp"%>
<logic:empty name="com.clt.framework.core.comm.EXCEPTION_OBJECT      ">
	<logic:notEmpty name="EventResponse" property="mapVal">
		<bean:define id="mapVal"  name="EventResponse" property="mapVal"/>
		
		<COMMON>
		
			<logic:empty name="mapVal" property="res">
				<res><![CDATA[N]]></res>
			</logic:empty>
			
			<logic:notEmpty name="mapVal" property="res">
				<res><bean:write name="mapVal" property="res"/></res>
			</logic:notEmpty>
			
			
			<logic:empty name="mapVal" property="WHOutbkFileList">
				<SHEET3>
					<SHEET>
						<DATA TOTAL="0"></DATA>
					</SHEET>
				</SHEET3>
			</logic:empty>
				
			<logic:notEmpty name="mapVal" property="WHOutbkFileList">
				
				<bean:define id="rowSet" name="mapVal" property="WHOutbkFileList"/>
				
				<SHEET3>
					<SHEET>
						<DATA TOTAL="<bean:write name="mapVal" property="WHOutbkFileListSize"/>">
						<logic:iterate id="row" name="rowSet">
							<tr>
								<TD></TD>
								<TD></TD>
								<TD><bean:write name="row" property="file_org_nm"/></TD>
								<TD><bean:write name="row" property="upload_date"/></TD>
								<TD><bean:write name="row" property="file_size"/></TD>
								<TD><bean:write name="row" property="doc_no"/></TD>
								<TD><bean:write name="row" property="file_path"/></TD>
								<TD><bean:write name="row" property="file_sys_nm"/></TD>
								<TD><bean:write name="row" property="svc_tp_cd"/></TD>
								<TD><bean:write name="row" property="doc_ref_tp_cd"/></TD>
								<TD><bean:write name="row" property="doc_tp_cd"/></TD>
				            </tr>
						</logic:iterate>
						</DATA>
					</SHEET>
				</SHEET3>
			</logic:notEmpty>
			
		</COMMON>
	
  	</logic:notEmpty>
</logic:empty>
