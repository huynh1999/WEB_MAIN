<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%
	String sendCode = request.getParameter("sendCode") != null ? request.getParameter("sendCode") : "";
	String corpfrcode = request.getParameter("corpfrcode") != null ? request.getParameter("corpfrcode") : "";
	String etc1 = request.getParameter("etc1") != null ? request.getParameter("etc1") : "";
	
	String rntUrl = "http://" + request.getServerName() + ":" + request.getServerPort()
		+ etc1 + "/RPT_FAX_0011.fax";
%>

<script type="text/javascript">
<%
	if(corpfrcode.equals("")){
%>
	window.close();
<%
	}
	if(sendCode.equals("300")){
%>
	alert("Fax success");
<%
	}else if(!corpfrcode.equals("")){
%>
	alert("Fax failed");
<%
	}
%>

function loadPage(){
<%
	if(!corpfrcode.equals("") || !sendCode.equals("300")){
%>
	document.frm1.submit();
<%
	}else{
%>
	window.close();
<%
	}
%>
}
</script>
<body onload="loadPage()">
<form name="frm1" method="POST" action="<%= rntUrl %>">
	<input type="hidden" name="f_cmd" value="4"/> 
	<input type="hidden" name="rtn_send_code" value="<%= sendCode %>"/> 
	<input type="hidden" name="rtn_corp_code" value="<%= corpfrcode %>"/> 
</form>
</body>