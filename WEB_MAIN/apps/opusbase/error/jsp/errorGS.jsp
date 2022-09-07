<%@ taglib uri="struts-bean"  prefix="bean"%>
<%@ taglib uri="struts-html"  prefix="html"%>
<%@ taglib uri="struts-logic" prefix="logic"%>
<%@ taglib uri="clt-rowset"   prefix="clt"%>
<%@ taglib uri="clt-writer"   prefix="wrt"%>
<%@ page import="com.clt.framework.core.layer.event.EventException"%>

<%
	EventException err = (com.clt.framework.core.layer.event.EventException)request.getAttribute("com.clt.framework.core.comm.EXCEPTION_OBJECT      ");
	System.out.println(request.getAttribute("com.clt.framework.core.comm.EXCEPTION_OBJECT      "));

%>

<logic:notEmpty name="com.clt.framework.core.comm.EXCEPTION_OBJECT      ">
	<ERROR>
		<MESSAGE><![CDATA[ <bean:message name="com.clt.framework.core.comm.EXCEPTION_OBJECT      " property="message"/>]]> </MESSAGE>
	</ERROR>
</logic:notEmpty>

<!-- Error Page-->
<!-- screen name="ErrorGS" template="templateIBSheet">
    <parameter key="body"  value="/apps/opusbase/error/jsp/errorGS.jsp"/>
</screen -->
