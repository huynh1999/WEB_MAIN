<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<%@ taglib uri="/WEB-INF/tld/struts-bean.tld" prefix="bean" %>
<%@ taglib uri="/WEB-INF/tld/struts-html.tld" prefix="html" %>
<%@ taglib uri="/WEB-INF/tld/struts-logic.tld" prefix="logic" %> 
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Sample Tag</title>
</head>
<body>
<logic:empty name="com.clt.framework.core.comm.EXCEPTION_OBJECT      ">
	<h2>Hello ^.^</h2>
</logic:empty>
<logic:notEmpty name="com.clt.framework.core.comm.EXCEPTION_OBJECT      ">
	<bean:message name="com.clt.framework.core.comm.EXCEPTION_OBJECT      " property="message"/>
	<%		
		//out.print(request.getAttribute("com.clt.framework.core.comm.EXCEPTION_OBJECT      "));
	%>
</logic:notEmpty>
</body>
</html>