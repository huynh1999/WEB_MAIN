<%--
=========================================================
*Copyright(c) 2008 CyberLogitec. All Rights Reserved.
=========================================================
=========================================================
*@FileName   : RPT_FAX_0010_2GS.jsp
*@FileTitle  : 전체 데이터 저장을 위한 Hidden 그리드
*@Description: 
*@author     : PJK - Cyberlogitec
*@version    : 1.0 - 12/15/2011
*@since      : 12/15/2011

*@Change history:
*@author     : Tuan.Chau
*@version    : 2.0 - 18/07/2014
*@since      : 18/07/2014
=========================================================
--%>
<%@ page contentType="text/xml; charset=UTF-8"%>
<%@page pageEncoding="UTF-8"%>
<%@include file="./../../../../../../../../syscommon/header/CLTGSHeader.jsp"%>
<logic:empty name="com.clt.framework.core.comm.EXCEPTION_OBJECT      ">
       <SHEET>
           <DATA TOTAL="0"></DATA>
       </SHEET>    
</logic:empty>
<logic:notEmpty name="com.clt.framework.core.comm.EXCEPTION_OBJECT      ">
    <ERROR>
        <MESSAGE><![CDATA[ <bean:message name="com.clt.framework.core.comm.EXCEPTION_OBJECT      " property="message"/>]]> </MESSAGE>
    </ERROR>
</logic:notEmpty>
