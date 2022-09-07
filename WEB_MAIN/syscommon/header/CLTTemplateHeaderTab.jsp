<%--
=========================================================
*Copyright(c) 2008 CyberLogitec. All Rights Reserved.
=========================================================

=========================================================
*@FileName   : CLTTemplateHeaderTab.jsp
*@FileTitle  :
*@Description: 
*@author     : OJG
*@version    : 1.0 - 07/17/2014
*              1.1 - 11/10/2017
*@since      : 11/10/2017

*@Change history:
=========================================================
--%>
<%@ page import="java.util.HashMap"%>
<%@ page import="com.clt.apps.opusbase.utils.LoginUserUtil,com.clt.apps.opusbase.login.dto.UserInfoVO"%>
<%@ page import="java.util.ArrayList,com.clt.apps.opusbase.system.role.dto.RoleBtnVO"%>
<%@ page import="com.clt.apps.opusbase.main.dto.NaviVo,com.clt.apps.opusbase.utils.NaviInfo"%>
<!-- TH S -->
<%@include file="./CLTWebAppGblVarTab.jsp"%>
<%@ taglib uri="struts-bean"  prefix="bean"%>
<script src="<%=CLT_PATH%>/syscommon/script/templateHeader.js?ver=<%=CLT_JS_VER%>"></script>
<script language="javascript">
<% 
if(userInfo != null){
	//2012.11.27 Lee Hae Kyoung 
	if(roleBtnVO!=null){
		out.println("var attr1 = \"" + roleBtnVO.getAttr1() + "\";");	// attr1: Retrieve
		out.println("var attr2 = \"" + roleBtnVO.getAttr1() + "\";");	// attr2: New(Add)
		out.println("var attr3 = \"" + roleBtnVO.getAttr1() + "\";");	// attr3: Save
		out.println("var attr4 = \"" + roleBtnVO.getAttr1() + "\";");	// attr4: Delete
		out.println("var attr5 = \"" + roleBtnVO.getAttr1() + "\";");	// attr5: Print
		out.println("var attr6 = \"" + roleBtnVO.getAttr1() + "\";");	// attr6: Excel
		out.println("var attr7 = \"" + roleBtnVO.getAttr1() + "\";");
		out.println("var attr8 = \"" + roleBtnVO.getAttr1() + "\";");
		out.println("var attr9 = \"" + roleBtnVO.getAttr1() + "\";");
		out.println("var attr_extention = \"" + roleBtnVO.getAttr_extension() + "\";");	// Add by pomsjung
		out.println("var url = \"" + roleBtnVO.getPgm_url() + "\";");
		out.println("var prm_seq = \"" + roleBtnVO.getPgm_mnu_seq() + "\";"); // PGM  (Add by pomsjung))
 	}

MULTI_LANGUAGE = userInfo.getMulti_language();
if ("Y".equals(MULTI_LANGUAGE)){
	MULTI_IMEMODE = "ime-mode:auto;";
}
POPUP_FULL_SCREEN = userInfo.getPopup_full_screen();

ArrayList<HashMap> conditionList = userInfo.getConditionList();
HashMap<String, Object> conditionMap = new HashMap<String, Object>();

naviVo = NaviInfo.getNaviInfo(pageUrl, CLT_MSG_PATH);

String pgmId = "";
String initDatLod = "";
String dtTgt = "";
String useInitSet = "";
String dtFm = "";
String dtTo = "";
String pgRow = "";
String prdMaxDt = "0";
String prdBseTpCd = "";
boolean conditionFlag = false;

for(int i = 0; i < conditionList.size(); i++){
	conditionMap = conditionList.get(i);
	if(null != naviVo){
		if(naviVo.getPgm_id().equals((String) conditionMap.get("PGM_ID"))){
			pgmId = (String) conditionMap.get("PGM_ID");
			initDatLod = (String) conditionMap.get("INIT_DAT_LOD_FLG");
			dtTgt = (String) conditionMap.get("TGT_DT_TP_CD");
			useInitSet = (String) conditionMap.get("USE_INIT_SET_FLG");
			dtFm = (String) conditionMap.get("FM_DT");
			dtTo = (String) conditionMap.get("TO_DT");
			pgRow = (String) conditionMap.get("PG_ROW");
			prdMaxDt = String.valueOf(conditionMap.get("PRD_MAX_DT"));
			prdBseTpCd = (String) conditionMap.get("PRD_BSE_TP_CD");
			if(null != prdBseTpCd){
				if("WK0".equals(prdBseTpCd)){
					prdMaxDt = String.valueOf(Integer.parseInt(prdMaxDt) * 7);
				}else if("YR0".equals(prdBseTpCd)){
					prdMaxDt = String.valueOf(Integer.parseInt(prdMaxDt) * 366);
				}else if("MON".equals(prdBseTpCd)){
					prdMaxDt = String.valueOf(Integer.parseInt(prdMaxDt) * 31);
				}
			}
			conditionFlag = true;
			break;
		}
	}
	
	if("".equals(prdMaxDt) || "0".equals(prdMaxDt)){
		//prdMaxDt = "0";
		//기본 180일 세팅 추후 수정
		prdMaxDt = "9999"; //#5203 [BINEX] AFTER V470.06 RELEASE, PERIOD RANGE SETTING : 180 -> 400
	}
}
%>
var initDatLod = "<%=initDatLod%>";
var dtTgt = "<%=dtTgt%>";
var useInitSet = "<%=useInitSet%>";
var dtFm = "<%=dtFm%>";
var dtTo = "<%=dtTo%>";
var pgRow = "<%=pgRow%>";
var prdMaxDt = <%=prdMaxDt%>;
var conditionFlag = <%=conditionFlag%>;
var loadSearchFlag = false;

<%
// #535: [SBS] 다국어 처리 V1.0 
if(naviVo != null){
	LEV1_NM = 	naviVo.getLev1_nm();
	LEV2_NM = 	naviVo.getLev2_nm();
	LEV3_NM = 	naviVo.getLev3_nm();
	PGM_ID  =   naviVo.getPgm_id();
	PGM_DESC = naviVo.getPgm_desc(); //#380 [CLT] Zendesk Help Guide 기능 - zE.SetHelpCenterSuggestions
}				
%>
var pgm_id = '<%=PGM_ID%>';
var TEMPLAT_PGM_DESC = '<%=PGM_DESC%>'; 
//#5664 [Webtrans] Popup size option complaint
var POPUP_FULL_SCREEN = '<%=POPUP_FULL_SCREEN%>';
function setCondition(type, rObj, fStDt, fEndDt){
	var formObj=document.frm1;
	
	if(conditionFlag){
		
		if('' != type){
			if("R" == type){
				for(var i = 0; i < rObj.length; i++) {
					if(rObj[i].value == dtTgt) {
						rObj[i].checked = true;
						break;
					}
				}
			}else if("S" == type){
				rObj.value = dtTgt;
			}
		}
			
		
		//#3793 [JAPT] BL EDI validation and text change
		if(pgRow != null && pgRow !=""&&pgRow != "null"){
			formObj.f_Paging.value = pgRow;
		} 
		
		if("Y" == useInitSet){	
			fStDt.value = dtFm;
			fEndDt.value = dtTo;
		}
	}
}
<% }else{ %>
	location.href='./NoSession.clt';
<% } %>
</script>
<!-- TH E -->
