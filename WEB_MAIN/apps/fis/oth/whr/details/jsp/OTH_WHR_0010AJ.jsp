<%--
=========================================================
*@FileName   : ACC_INV_0010GS.jsp
*@FileTitle  : Invoice Create
*@Description: Invoice Create
*@author     : Chungrue - Cyberlogitec
*@version    : 1.0 - 2011/11/04
*@since      : 2011/11/04

*@Change history:
=========================================================
--%>

<%@ page contentType="text/xml; charset=UTF-8"%>
<%@page pageEncoding="UTF-8"%>
<%@include file="./../../../../../../syscommon/header/CLTGSHeader.jsp"%>
<%-- 정상처리 --%>
<logic:empty name="com.clt.framework.core.comm.EXCEPTION_OBJECT      ">
	<logic:notEmpty name="EventResponse" property="objVal">
		<bean:define id="hmOutParam"  name="EventResponse" property="objVal"/>
		<DATA>
			<intg_bl_seq><![CDATA[<bean:write name="hmOutParam" property="intg_bl_seq" filter="false" />]]></intg_bl_seq>
			<oth_seq><![CDATA[<bean:write name="hmOutParam" property="oth_seq" filter="false" />]]></oth_seq>
			<air_sea_clss_cd><![CDATA[<bean:write name="hmOutParam" property="air_sea_clss_cd" filter="false" />]]></air_sea_clss_cd>
			<biz_clss_cd><![CDATA[<bean:write name="hmOutParam" property="biz_clss_cd" filter="false" />]]></biz_clss_cd>
			<bnd_clss_cd><![CDATA[<bean:write name="hmOutParam" property="bnd_clss_cd" filter="false" />]]></bnd_clss_cd>
			<inv_seq><![CDATA[<bean:write name="hmOutParam" property="inv_seq" filter="false" />]]></inv_seq>
			<bl_no><![CDATA[<bean:write name="hmOutParam" property="bl_no" filter="false" />]]></bl_no>
			<oth_no><![CDATA[<bean:write name="hmOutParam" property="oth_no" filter="false" />]]></oth_no>
			<inv_no><![CDATA[<bean:write name="hmOutParam" property="inv_no" filter="false" />]]></inv_no>
			<wh_recp_no><![CDATA[<bean:write name="hmOutParam" property="wh_recp_no" filter="false" />]]></wh_recp_no>
			<wh_cd><![CDATA[<bean:write name="hmOutParam" property="wh_cd" filter="false" />]]></wh_cd>
			<wh_nm><![CDATA[<bean:write name="hmOutParam" property="wh_nm" filter="false" />]]></wh_nm>
			<del_carrier><![CDATA[<bean:write name="hmOutParam" property="del_carrier" filter="false" />]]></del_carrier>
			<recp_dt><![CDATA[<wrt:write name="hmOutParam" property="recp_dt" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy" filter="false" />]]></recp_dt>
			<recp_tm><![CDATA[<wrt:write name="hmOutParam" property="recp_tm" formatType="DATE" fromFormat="HHmm" format="HH:mm" filter="false" />]]></recp_tm>
			<del_by><![CDATA[<bean:write name="hmOutParam" property="del_by" filter="false" />]]></del_by>
			<recp_usrid><![CDATA[<bean:write name="hmOutParam" property="recp_usrid" filter="false" />]]></recp_usrid>
			<recp_usrnm><![CDATA[<bean:write name="hmOutParam" property="recp_usrnm" filter="false" />]]></recp_usrnm>
			<ttl_amt><![CDATA[<bean:write name="hmOutParam" property="ttl_amt" filter="false" />]]></ttl_amt>
			<trk_bl_no><![CDATA[<bean:write name="hmOutParam" property="trk_bl_no" filter="false" />]]></trk_bl_no>
			<check_no><![CDATA[<bean:write name="hmOutParam" property="check_no" filter="false" />]]></check_no>
			<loc_nm><![CDATA[<bean:write name="hmOutParam" property="loc_nm" filter="false" />]]></loc_nm>
			<po_no><![CDATA[<bean:write name="hmOutParam" property="po_no" filter="false" />]]></po_no>
			<maker_cd><![CDATA[<bean:write name="hmOutParam" property="maker_cd" filter="false" />]]></maker_cd>
			<maker_nm><![CDATA[<bean:write name="hmOutParam" property="maker_nm" filter="false" />]]></maker_nm>
			<cmdt_cd><![CDATA[<bean:write name="hmOutParam" property="cmdt_cd" filter="false" />]]></cmdt_cd>
			<cmdt_nm><![CDATA[<bean:write name="hmOutParam" property="cmdt_nm" filter="false" />]]></cmdt_nm>
			<shpr_cd><![CDATA[<bean:write name="hmOutParam" property="shpr_cd" filter="false" />]]></shpr_cd>
			<shpr_nm><![CDATA[<bean:write name="hmOutParam" property="shpr_nm" filter="false" />]]></shpr_nm>
			<cnee_cd><![CDATA[<bean:write name="hmOutParam" property="cnee_cd" filter="false" />]]></cnee_cd>
			<cnee_nm><![CDATA[<bean:write name="hmOutParam" property="cnee_nm" filter="false" />]]></cnee_nm>
			<op_useid><![CDATA[<bean:write name="hmOutParam" property="op_useid" filter="false" />]]></op_useid>
			<op_usenm><![CDATA[<bean:write name="hmOutParam" property="op_usenm" filter="false" />]]></op_usenm>
			<rmk><![CDATA[<bean:write name="hmOutParam" property="rmk" filter="false" />]]></rmk>
			<size_ut_cd><![CDATA[<bean:write name="hmOutParam" property="size_ut_cd" filter="false" />]]></size_ut_cd>
	  	</DATA>
	</logic:notEmpty>
</logic:empty>