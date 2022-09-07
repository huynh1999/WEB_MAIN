<%
//System.out.println("test.jsp");
System.out.println(request.getParameter("mrd_view"));
response.sendRedirect(request.getParameter("mrd_view"));
//response.sendRedirect("/fms/RptImageViewer?fileName=CLTLA/1/logo_la_sq.jpg");
%>