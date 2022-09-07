<%--
=========================================================
*@FileName   : OTH_VSI_0010GS.jsp
*@FileTitle  : Shipping Instruction Entry
*@Description: Shipping Instruction Entry
*@author     : Cyberlogitec
*@version    : 1.0 - 02/28/2013
*@since      : 02/28/2013

*@Change history:
=========================================================
--%>
<%@ page contentType="text/xml; charset=UTF-8"%>
<%@page pageEncoding="UTF-8"%>
<%@include file="./../../../../../../syscommon/header/CLTGSHeader.jsp"%>
<%-- 정상처리 --%>
<logic:empty name="com.clt.framework.core.comm.EXCEPTION_OBJECT      ">
	<SHEET>
	<%-- 조회 결과가 없는 경우 --%>
	<logic:empty name="EventResponse" property="objVal">
		<ETC-DATA>
			<ETC KEY="result_yn">N</ETC>
		</ETC-DATA>
	</logic:empty>
	<%-- 조회 결과가 있는 경우 --%>
	<logic:notEmpty name="EventResponse" property="objVal">
	<bean:define id="tmpObj" name="EventResponse" property="objVal"/>
		<ETC-DATA>
			<ETC KEY="result_yn">Y</ETC>
			<ETC KEY=""><bean:write name="tmpObj" property="vndr_si_no"/></ETC>
			<ETC KEY="vndr_si_no"><bean:write name="tmpObj" property="vndr_si_no"/></ETC>
			<ETC KEY="sts_cd"><bean:write name="tmpObj" property="sts_cd"/></ETC>
			<ETC KEY="sndr_usrid"><bean:write name="tmpObj" property="sndr_usrid"/></ETC>
			<ETC KEY="snd_dt"><bean:write name="tmpObj" property="snd_dt"/></ETC>
			<ETC KEY="est_shp_dt"><bean:write name="tmpObj" property="est_shp_dt"/></ETC>
			<ETC KEY="po_no"><bean:write name="tmpObj" property="po_no"/></ETC>
			<ETC KEY="to_trdp_cd"><bean:write name="tmpObj" property="to_trdp_cd"/></ETC>
			<ETC KEY="to_trdp_nm"><bean:write name="tmpObj" property="to_trdp_nm"/></ETC>
			<ETC KEY="to_trdp_addr"><bean:write name="tmpObj" property="to_trdp_addr"/></ETC>
			<ETC KEY="to_trdp_pic_nm"><bean:write name="tmpObj" property="to_trdp_pic_nm"/></ETC>
			<ETC KEY="to_trdp_pic_phn"><bean:write name="tmpObj" property="to_trdp_pic_phn"/></ETC>
			<ETC KEY="to_trdp_pic_fax"><bean:write name="tmpObj" property="to_trdp_pic_fax"/></ETC>
			<ETC KEY="to_trdp_pic_eml"><bean:write name="tmpObj" property="to_trdp_pic_eml"/></ETC>
			<ETC KEY="frt_to_trdp_cd"><bean:write name="tmpObj" property="frt_to_trdp_cd"/></ETC>
			<ETC KEY="frt_to_trdp_nm"><bean:write name="tmpObj" property="frt_to_trdp_nm"/></ETC>
			<ETC KEY="frt_to_trdp_addr"><bean:write name="tmpObj" property="frt_to_trdp_addr"/></ETC>
			<ETC KEY="frt_to_trdp_pic_nm"><bean:write name="tmpObj" property="frt_to_trdp_pic_nm"/></ETC>
			<ETC KEY="frt_to_trdp_pic_phn"><bean:write name="tmpObj" property="frt_to_trdp_pic_phn"/></ETC>
			<ETC KEY="frt_to_trdp_pic_fax"><bean:write name="tmpObj" property="frt_to_trdp_pic_fax"/></ETC>
			<ETC KEY="frt_to_trdp_pic_eml"><bean:write name="tmpObj" property="frt_to_trdp_pic_eml"/></ETC>
			<ETC KEY="doc_to_trdp_cd"><bean:write name="tmpObj" property="doc_to_trdp_cd"/></ETC>
			<ETC KEY="doc_to_trdp_nm"><bean:write name="tmpObj" property="doc_to_trdp_nm"/></ETC>
			<ETC KEY="doc_to_trdp_addr"><bean:write name="tmpObj" property="doc_to_trdp_addr"/></ETC>
			<ETC KEY="doc_to_trdp_pic_nm"><bean:write name="tmpObj" property="doc_to_trdp_pic_nm"/></ETC>
			<ETC KEY="doc_to_trdp_pic_phn"><bean:write name="tmpObj" property="doc_to_trdp_pic_phn"/></ETC>
			<ETC KEY="doc_to_trdp_pic_fax"><bean:write name="tmpObj" property="doc_to_trdp_pic_fax"/></ETC>
			<ETC KEY="doc_to_trdp_pic_eml"><bean:write name="tmpObj" property="doc_to_trdp_pic_eml"/></ETC>
			<ETC KEY="ci_flg"><bean:write name="tmpObj" property="ci_flg"/></ETC>
			<ETC KEY="pl_flg"><bean:write name="tmpObj" property="pl_flg"/></ETC>
			<ETC KEY="lc_flg"><bean:write name="tmpObj" property="lc_flg"/></ETC>
			<ETC KEY="shp_exp_dcl_flg"><bean:write name="tmpObj" property="shp_exp_dcl_flg"/></ETC>
			<ETC KEY="oth_flg"><bean:write name="tmpObj" property="oth_flg"/></ETC>
			<ETC KEY="oth_doc_txt"><bean:write name="tmpObj" property="oth_doc_txt"/></ETC>
			<ETC KEY="rmk"><bean:write name="tmpObj" property="rmk"/></ETC>
			<ETC KEY="sndr_usrnm"><bean:write name="tmpObj" property="sndr_usrnm"/></ETC>
		</ETC-DATA>
	</logic:notEmpty>
	</SHEET>
</logic:empty>
<%-- 오류발생 --%>
<logic:notEmpty name="com.clt.framework.core.comm.EXCEPTION_OBJECT      ">
	<ERROR>
		<MESSAGE><![CDATA[<bean:message name="com.clt.framework.core.comm.EXCEPTION_OBJECT      " property="message"/>]]> </MESSAGE>
	</ERROR>
</logic:notEmpty>
