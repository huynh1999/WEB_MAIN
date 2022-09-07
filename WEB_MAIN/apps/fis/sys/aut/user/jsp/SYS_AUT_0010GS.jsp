<%--
=========================================================
*Copyright(c) 2008 CyberLogitec. All Rights Reserved.
=========================================================

=========================================================
*@FileName   : login.jsp
*@FileTitle  : 로그인 화면
*@Description: 로그인 화면
*@author     : Kang,Jung-Gu - Cyberlogitec
*@version    : 1.0 - 08/07/2008
*@since      : 08/07/2008

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
                            <TD><![CDATA[<bean:write name="row" property="usrid"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="eng_usr_nm"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="locl_usr_nm"/>]]></TD>
                            <TD IMAGE="1"><![CDATA[<bean:write name="row" property="ofc_eng_nm"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="use_lang_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="role_cd"/>]]></TD>
	                        <TD><![CDATA[<bean:write name="row" property="addr" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="eml"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="phn"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="use_flg"/>]]></TD>
                            <TD>0</TD>
                            <TD IMAGE="1"><![CDATA[<bean:write name="row" property="ofc_cd"/>]]></TD>
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
