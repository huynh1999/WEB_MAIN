<%--
=========================================================
*@FileName   : MDM_MCM_0080.jsp
*@FileTitle  : Container Type Size
*@Description: Container Type Size
*@author     : Choi,Gil-Ju - Cyberlogitec
*@version    : 1.0 - 01/13/2009
*@since      : 01/13/2009

*@Change history:
*@author     : Tuan.Chau
*@version    : 2.0 - 10/06/2014
*@since      : 10/06/2014
=========================================================
--%>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="clt-paging"   prefix="paging" %>
	<!-- 공통 Header -->
	<%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
	
	<bean:define id="valMap"  name="EventResponse" property="mapVal"/>
	
	<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css" />
	    <title><bean:message key="system.title"/></title>
	<!-- 일자 및 달력팝업 호출 -->
	<script language="javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/MDM_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="./apps/fis/mdm/code/container/script/MDM_MCM_0080.js?ver=<%=CLT_JS_VER%>" /></script>
	
	
	<script>
        var CNTR_GRP_CD = '';
        var CNTR_GRP_NM = '';
        <% boolean isBegin = false; %>
        <!--Role 코드조회-->
        <bean:define id="cntrGrpCdList"  name="valMap" property="cntrGrpCdList"/>
        <logic:iterate id="ComCdDtlVO" name="cntrGrpCdList">
            <% if(isBegin){ %>
            CNTR_GRP_CD+= '|';
            CNTR_GRP_NM+= '|';
               
            <% }else{
                  isBegin = true;
               } %>
               CNTR_GRP_CD+= '<bean:write name="ComCdDtlVO" property="cd_val"/>';
               CNTR_GRP_NM+= '<bean:write name="ComCdDtlVO" property="cd_nm"/>';
        </logic:iterate>
        
        var AFR_CNTR_SZ_CD = '|';
        var AFR_CNTR_SZ_NM = '|';
        <% isBegin = false; %>
        <!--AFR Container Size 코드조회-->
        <bean:define id="afrCntrSzCdList"  name="valMap" property="afrCntrSzCdList"/>
        <logic:iterate id="ComCdDtlVO" name="afrCntrSzCdList">
            <% if(isBegin){ %>
            AFR_CNTR_SZ_CD+= '|';
            AFR_CNTR_SZ_NM+= '|';
               
            <% }else{
                  isBegin = true;
               } %>
               AFR_CNTR_SZ_CD+= '<bean:write name="ComCdDtlVO" property="cd_val"/>';
               AFR_CNTR_SZ_NM+= '<bean:write name="ComCdDtlVO" property="cd_nm"/>';
        </logic:iterate>
        
        var AFR_CNTR_TP_CD = '|';
        var AFR_CNTR_TP_NM = '|';
        <% isBegin = false; %>
        <!--AFR Container Type 코드조회-->
        <bean:define id="afrCntrTpCdList"  name="valMap" property="afrCntrTpCdList"/>
        <logic:iterate id="ComCdDtlVO" name="afrCntrTpCdList">
            <% if(isBegin){ %>
            AFR_CNTR_TP_CD+= '|';
            AFR_CNTR_TP_NM+= '|';
               
            <% }else{
                  isBegin = true;
               } %>
               AFR_CNTR_TP_CD+= '<bean:write name="ComCdDtlVO" property="cd_val"/>';
               AFR_CNTR_TP_NM+= '<bean:write name="ComCdDtlVO" property="cd_nm"/>';
        </logic:iterate>

		var pDoc = parent.parent.parent.document;
		hideProcess('WORKING', pDoc);
        

	</script>
<script>
function setupPage(){
	loadPage();
}
</script>
	<form name="frm1" method="POST" action="./">
	<!--Command를 담는 공통 -->
	<input type="hidden" name="f_cmd"/> 
	<input type="hidden" name="f_CurPage"/>
	<input type="hidden" name="trdp_cd"/>

	<!-- Button -->
	<div class="page_title_area clear">
	   <h2 class="page_title"><button type="button"><%=LEV3_NM%></button></h2>
		<div class="opus_design_btn TOP">
		<%-- 
		   	<button type="button" class="btn_accent" <%= null != roleBtnVO? "style='display:none;' btnAuth='" + roleBtnVO.getAttr1() + "'"  : "" %> onclick="doWork('SEARCHLIST')">Search</button>
		   	<button type="button" class="btn_normal" onclick="doWork('ROWADD')"><bean:message key="Add"/></button>
		   	<button id="btnModify" type="button"  <%= null != roleBtnVO? "style='display:none;' btnAuth='" + roleBtnVO.getAttr3() + "'"  : "" %> class="btn_normal" onclick="doWork('MODIFY')"><bean:message key="Save"/></button>
		   	 --%>
		</div>
		    <!-- btn_div -->
		<div class="location">
		   <span><%=LEV1_NM%></span> &gt;
		   <span><%=LEV2_NM%></span> &gt;
		   <span><%=LEV3_NM%></span>
		   <a href="" class="ir">URL Copy</a>
		</div>
	</div>

	<div class="over_wrap" style="height:100%">	
		<div class="wrap_search">
			<div class="opus_design_inquiry ">
			</div>
		</div>
		<div class="wrap_result">
	    	<div class="opus_design_grid">
		    	
		    	<script language="javascript">comSheetObject('sheet1');</script>
		    </div>
		</div>
	</div>	
</form>


<script type="text/javascript">
	var attr_extension = "<%= null!=roleBtnVO ?roleBtnVO.getAttr_extension():"" %>";
	doBtnAuthority(attr_extension);
	</script>	
