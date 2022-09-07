<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<html>
<head>
<script language="javascript">
	var msg = "To safeguard your account and data, you will need to create a new password to regain access.\nFor additional protection, we recommend that you change your password on a regular basis.\nYou will now be prompted to create a new password.";
	alert(msg);
	var url = "/"+location.pathname.split("/")[1]+"/UserPwdMng.clt"
	document.location.href = url;
	
</script>
	
</head>
<body>

</body>
</html>
