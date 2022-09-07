<%--
=========================================================
*Copyright(c) 2008 CyberLogitec. All Rights Reserved.
=========================================================

=========================================================
*@FileName   : CLTMobCommonJS.jsp
*@FileTitle  : 
*@Description: 공통으로 사용하는 JS.
*@author     : Changh-Hwa Suk 
*@version    : 1.0 - 02/10/2017
*@since      : 02/10/2017

*@Change history:
=========================================================
--%>
<%
if ("".equals(CLT_MSG_PATH)){
	CLT_MSG_PATH = "EN";
}
%>
<script type="text/javascript" SRC="./js/common/ajax_util.js"></script>
<script type="text/javascript" SRC="./js/common/CoBizCommon.js"></script>
<script type="text/javascript" SRC="./js/common/CoCommon.js"></script>   
<script type="text/javascript" SRC="./js/common/CoFormControl.js"   TYPE="text/javascript"></script>   
<script type="text/javascript" src="./apps/fis/mob/resources/mobile/js/lib/jquery-2.0.3.min.js"></script>
<script type="text/javascript" src="./apps/fis/mob/resources/mobile/js/lib/jquery.number.js"></script>
<script type="text/javascript" src="./apps/fis/mob/resources/mobile/js/lib/jquery-confirm.js"></script>
<script type="text/javascript" src="./apps/fis/mob/resources/mobile/js/common.js"></script>
<script type="text/javascript" src="./apps/fis/mob/resources/mobile/script/common/clt.util.js"></script>
<script type="text/javascript" src="./apps/fis/mob/resources/mobile/script/common/clt.mask.js"></script>
<script type="text/javascript" src="./apps/fis/mob/resources/mobile/script/common/clt.common.js"></script>
<script type="text/javascript" src="./apps/fis/mob/resources/mobile/script/common/esl.common.js"></script>
<script type="text/javascript" src="./apps/fis/mob/resources/mobile/script/common/wms.common.js"></script>
<script type="text/javascript" src="./apps/fis/mob/resources/dist/js/bootstrap.min.js"></script>
<script type="text/javascript" src="./apps/fis/mob/resources/dist/js/bootstrap-datetimepicker.js"></script>
<script type="text/javascript" src="./apps/fis/mob/resources/dist/js/locales/bootstrap-datetimepicker.ua.js" charset="UTF-8"></script>
<script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/message.js?ver=<%=CLT_JS_VER%>"></script>
<script type="text/javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/MOB_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
<script type="text/javascript" src="js/common/CoAxon.js?ver=<%=CLT_JS_VER%>"></script>  <!-- //#2010 [BINEX WMS4.0] ITEM LOT4,LOT5,Customer Order No 특수문자 처리 -->


<script type="text/javascript">
	$(document).ready(function() {
		//#2010 [BINEX WMS4.0] ITEM LOT4,LOT5,Customer Order No 특수문자 처리
		if(document.form!= undefined || document.form!= null){
			axon_event.addListenerFormat('keyup', 'ComEditFormating', document.form);
		} 
	});
</script>