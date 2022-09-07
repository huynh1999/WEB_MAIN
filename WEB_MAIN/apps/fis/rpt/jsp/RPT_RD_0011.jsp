<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@page import="com.clt.framework.core.layer.event.EventResponse"%>
<%@page import="com.clt.syscommon.response.CommonEventResponse"%>
<%@page import="java.util.HashMap"%>
<%
	CommonEventResponse eventResponse = (CommonEventResponse)request.getAttribute("EventResponse");
	HashMap resultMap = eventResponse.getMapVal();
	String result = (String)resultMap.get("result");
%>

<script type="text/javascript">
	function setupPage(){
	}

	var msg = "";
<%
	if(result.equals("0")){//메일 발송 성공
%>
	//alert("Mail Send Success");
	// alert("SENDING. PLEASE CHECK EMAIL HISTORY FOR ITS STATUS.");
	msg = "SENDING. PLEASE CHECK EMAIL HISTORY FOR ITS STATUS.";
	parent.notify(msg, "Y");
<%
	}else if(result.equals("1")){//메일 발송 실패
%>
	// alert("Mail Send Failed");
	msg = "Mail Send Failed";
	parent.notify(msg);
<%
	}else if(result.equals("2")){//Fax 발송 성공
%>
	// alert("Fax Send Success");
	msg = "Fax Send Success";
	parent.notify(msg, "Y");
<%
	}else if(result.equals("3")){//Fax 발송 실패
%>
	// alert("Fax Send Failed");
	msg = "Fax Send Failed";
	parent.notify(msg);
<%
	}
%>
</script>
