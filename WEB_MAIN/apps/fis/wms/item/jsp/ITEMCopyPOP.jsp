<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="clt-paging"   prefix="paging" %>

<!-- 공통 Header -->
<%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
<base target="_self"/>

<!-- 해당 Action별 js -->
<script type="text/javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/PUP_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
<script type="text/javascript" src="./apps/fis/wms/item/script/ITEMCopy_POP.js?ver=<%=CLT_JS_VER%>"></script>
<!--ajax 사용시 -->
<script type="text/javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
<script type="text/javascript">
    function setupPage(){

    }
</script>

<form name="form">
<div class="layer_popup_title">
    <div class="page_title_area clear">
        <h2 class="page_title">
            <span><bean:message key="Item_Copy"/></span>
        </h2>
        <!-- btn_div -->
        <div class="opus_design_btn">
            <button type="button" class="btn_accent" onclick="doWork('SAVE')"><bean:message key="Yes"/></button><!--
		--><button type="button" class="btn_normal" onclick="doWork('CLOSE')"><bean:message key="Cancel"/></button>
        </div>
    </div>
</div>

<div class="layer_popup_contents">
    <div class="opus_design_inquiry sm">
        <table>
            <tbody>
                <tr>
                    <td colspan="2" style="height: 30px; font-weight: bold;">The selected Item will be copied to<td>
                </tr>
                <tr>
                    <th><bean:message key="Contract_No"/></th>
                    <td><input name="ctrt_no" type="text" class="input1" id="ctrt_no" style="width:80px;ime-mode:disabled;text-transform:uppercase;" dataformat="engup" otherchar="-_" onBlur="strToUpper(this);searchTlCtrtInfo();" maxlength="10"/><!--
                     --><button type="button" name="btn_ctrt_no" id="btn_ctrt_no"class="input_seach_btn" tabindex="-1" onclick="btn_ctrt()"></button><!--
                     --><input name="ctrt_nm" type="text" class="input1" id="in_ctrt_nm" style="width:130px;ime-mode:disabled;text-transform:uppercase;" dataformat="engup" otherchar = " ()-_" onBlur="strToUpper(this);" OnKeyDown="if(event.keyCode==13){searchCtrtPop(this);}" maxlength="100"/><!--
                     --></td>
                </tr>
                <tr>
                    <td colspan="2" style="height: 30px; font-weight: bold;">Would you like to process?<td>
                </tr>
            </tbody>
        </table>
    </div>
</div>
</form>