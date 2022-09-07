<%@ page contentType="text/html; charset=euc-kr" language="java" %>
<%@page import="com.clt.apps.common.util.SimpleLogger"%>
<%@page import="org.apache.log4j.Category"%>
<%@page import="org.apache.log4j.Layout"%>
<%@page import="org.apache.log4j.FileAppender"%>
<%@page import="org.apache.log4j.PatternLayout"%>

<%
//Log Monitor Start
String logFileName =  request.getParameter("logFileName");
String logParam =  request.getParameter("logParam");

//request.getParameter("logfrm"); //PageHelper.getString(request.getParameter("telStr"),"***");

//aa = URLDecoder.decode(aa,"utf-8");

SimpleLogger simLog = new SimpleLogger();

//simLog.makeLog();
simLog.log(logParam, logFileName);

//Log Monitor End

%>