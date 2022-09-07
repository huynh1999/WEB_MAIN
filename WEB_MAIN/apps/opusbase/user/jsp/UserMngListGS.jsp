<%--
=========================================================
*Copyright(c) 2009 CyberLogitec. All Rights Reserved.
=========================================================

=========================================================
*@FileName   : MGT_AUT_0010.jsp
*@FileTitle  : 최상위 메뉴 표시
*@Description: 최상위 메뉴의 관리
*@author     : Kang,Jung-Gu - Cyberlogitec
*@version    : 1.0 - 2008.12.03
*@since      : 2008.12.03

*@Change history:
*@author     : Tuan.Chau
*@version    : 2.0 - 2014/06/18
*@since      : 2014/06/18
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
                            <TD><![CDATA[<bean:write name="row" property="eng_usr_nm" filter="false"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="locl_usr_nm" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="use_lang_cd"/>]]></TD>
							
							<TD><![CDATA[<bean:write name="row" property="ofc_cd"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="ofc_eng_nm" filter="false"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="dept_cd"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="team_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="role_cd"/>]]></TD>
							
	                        <TD><![CDATA[<bean:write name="row" property="addr" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="eml"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="phn"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="fax"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="sns_info"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="use_flg"/>]]></TD>
                            
                            <TD><![CDATA[<bean:write name="row" property="dflt_wh_ctrt_no"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="dflt_wh_ctrt_nm"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="wh_cfg"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="dflt_wh_cd"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="dflt_ord_tp_cd"/>]]></TD>
                            
                            <TD>0</TD>
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
        <MESSAGE><![CDATA[<%=(String)request.getAttribute("com.clt.framework.core.comm.EXCEPTION_OBJECT      ")%>]]> </MESSAGE>
    </ERROR>
</logic:notEmpty>
