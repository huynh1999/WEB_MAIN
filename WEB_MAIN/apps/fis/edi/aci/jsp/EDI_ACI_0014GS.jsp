<%--
=========================================================
*@FileName   : 
*@FileTitle  : 
*@Description: 
*@author     : 
*@version    : 
*@since      : 
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
						<%
								int cnt=0;
						%>
						{data:[
						      <logic:iterate id="row" name="rowSet" >
						       {
						       f_seq:"<%cnt++;%>"
						        ,radio:""
						        ,hbl_no:"<bean:write name="row" property="hbl_no"/>"
						        ,ccn_no:"<bean:write name="row" property="ccn_no"/>"
						        ,hbl_cmpl_flg:"<bean:write name="row" property="hbl_cmpl_flg"/>"
						        ,msg_sts_cd:"<bean:write name="row" property="msg_sts_cd"/>"
						        ,rsk_ass_cd:"<bean:write name="row" property="rsk_ass_cd"/>"
						        ,mtch_sts_cd:"<bean:write name="row" property="mtch_sts_cd"/>"
						        ,pre_hbl_no:"<bean:write name="row" property="pre_hbl_no"/>"
						        ,level:"<bean:write name="row" property="level"/>"
						        ,ibflag:""
						        ,Indexing:""
						       }
						       <logic:notEqual name="EventResponse" property="listValCnt" value="<%=String.valueOf(cnt)%>">,</logic:notEqual>
						      </logic:iterate>
					     ]}
                
            </logic:notEmpty>
</logic:empty>
<%-- 오류발생 --%>
<logic:notEmpty name="com.clt.framework.core.comm.EXCEPTION_OBJECT      ">
    <ERROR>
        <MESSAGE><![CDATA[ <bean:message name="com.clt.framework.core.comm.EXCEPTION_OBJECT      " property="message"/>]]> </MESSAGE>
    </ERROR>
</logic:notEmpty>