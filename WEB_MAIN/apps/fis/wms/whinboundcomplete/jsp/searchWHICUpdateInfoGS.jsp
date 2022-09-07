<%--
=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
=========================================================

=========================================================
*@FileName   : WWHM_WHM_0009GS.jsp
*@FileTitle  : 
*@Description: 
*@author     : Thoa.Dien - Cyberlogitec
*@version    : 1.0 - 2014/12/22
*@since      : 2014/12/22

*@Change history:
=========================================================
--%>
<%@ page contentType="text/xml; charset=UTF-8"%>
<%@page pageEncoding="UTF-8"%>
<%@include file="./../../../../../../syscommon/header/CLTGSHeader.jsp"%>
<%-- 정상처리 --%>
<logic:empty name="com.clt.framework.core.comm.EXCEPTION_OBJECT      ">
		<%-- 조회 결과가 없는 경우 --%>
			<logic:empty name="EventResponse" property="mapVal">
				<SHEET>
					<DATA TOTAL="0"></DATA>
				</SHEET>	
			</logic:empty>
		<%-- 조회 결과가 있는 경우 --%>
			<logic:notEmpty name="EventResponse" property="mapVal">
				<bean:define id="rowSet" name="EventResponse" property="mapVal"/>
				
				<logic:notEmpty name="rowSet" property="field">
					<bean:define id="rowSetField" name="rowSet" property="field"/>
					<FIELD>
						<DATA TOTAL="1">
								<wib_in_no><![CDATA[<bean:write name="rowSetField" property="wib_in_no"/>]]></wib_in_no>
								<wib_bk_no><![CDATA[<bean:write name="rowSetField" property="wib_bk_no"/>]]></wib_bk_no>
								<cust_ord_no><![CDATA[<bean:write name="rowSetField" property="cust_ord_no"/>]]></cust_ord_no>
								<in_sts_cd><![CDATA[<bean:write name="rowSetField" property="in_sts_cd"/>]]></in_sts_cd>
								<inbound_dt><![CDATA[<bean:write name="rowSetField" property="inbound_dt"/>]]></inbound_dt>
								<inbound_hm><![CDATA[<bean:write name="rowSetField" property="inbound_hm"/>]]></inbound_hm>
								<owner_cd><![CDATA[<bean:write name="rowSetField" property="owner_cd"/>]]></owner_cd>
								<owner_nm><![CDATA[<bean:write name="rowSetField" property="owner_nm"/>]]></owner_nm>
								<ctrt_no><![CDATA[<bean:write name="rowSetField" property="ctrt_no"/>]]></ctrt_no>
								<ctrt_nm><![CDATA[<bean:write name="rowSetField" property="ctrt_nm"/>]]></ctrt_nm>
								<wh_cd><![CDATA[<bean:write name="rowSetField" property="wh_cd"/>]]></wh_cd>
								<wh_nm><![CDATA[<bean:write name="rowSetField" property="wh_nm"/>]]></wh_nm>
								<freetime_day><![CDATA[<bean:write name="rowSetField" property="freetime_day"/>]]></freetime_day>
								<lastfree_dt><![CDATA[<bean:write name="rowSetField" property="lastfree_dt"/>]]></lastfree_dt>
								<modi_loc_dt><![CDATA[<bean:write name="rowSetField" property="modi_loc_dt"/>]]></modi_loc_dt>
								<modi_ofc_cd><![CDATA[<bean:write name="rowSetField" property="modi_ofc_cd"/>]]></modi_ofc_cd>
								<modi_nm><![CDATA[<bean:write name="rowSetField" property="modi_nm"/>]]></modi_nm>
								<custms_ref_no><![CDATA[<bean:write name="rowSetField" property="custms_ref_no"/>]]></custms_ref_no>
								<rmk><![CDATA[<bean:write name="rowSetField" property="rmk"/>]]></rmk>
								<form_mode><![CDATA[<bean:write name="rowSetField" property="form_mode"/>]]></form_mode>
						</DATA>
					</FIELD>
				</logic:notEmpty>
				
				<logic:notEmpty name="rowSet" property="sheet">
				<bean:define id="rowSetSheet" name="rowSet" property="sheet"/>
				<bean:size id="sheet1_size" name="rowSetSheet"/>
				<SHEET>
					<DATA TOTAL="<bean:write name="sheet1_size"/>">
					<logic:iterate id="row" name="rowSetSheet">
						<tr>
							<TD></TD>
							<TD><bean:write name="row" property="item_cd"/></TD>
							<TD><bean:write name="row" property="item_nm"/></TD>
							<TD><bean:write name="row" property="lot_attrib_02"/></TD>
							<TD><bean:write name="row" property="estimated_unit"/></TD>
							<TD><bean:write name="row" property="estimated_qty"/></TD>
							<TD><bean:write name="row" property="snd_pkgunit"/></TD>
							<TD><bean:write name="row" property="snd_pkgqty"/></TD>
							<TD><bean:write name="row" property="inbound_loc_nm"/></TD>
							<TD><bean:write name="row" property="dmg_pkgunit"/></TD>
							<TD><bean:write name="row" property="dmg_pkgqty"/></TD>
							<TD><bean:write name="row" property="dmg_loc_nm"/></TD>
							<TD><bean:write name="row" property="in_item_ea_qty"/></TD>
							<TD><bean:write name="row" property="in_item_pe_qty"/></TD>
							<TD><bean:write name="row" property="os_item_ea_qty"/></TD>
							<TD><bean:write name="row" property="inbound_loc_nm"/></TD>
							<TD><bean:write name="row" property="in_item_cbm"/></TD>
							<TD><bean:write name="row" property="in_item_cbf"/></TD>
							<TD><bean:write name="row" property="in_item_grs_kgs"/></TD>
							<TD><bean:write name="row" property="in_item_grs_lbs"/></TD>
							<TD><bean:write name="row" property="in_item_net_kgs"/></TD>
							<TD><bean:write name="row" property="in_item_net_lbs"/></TD>
							<TD><bean:write name="row" property="po_no"/></TD>
							<TD><bean:write name="row" property="eq_tpsz_cd"/></TD>
							<TD><bean:write name="row" property="eq_no"/></TD>
							<TD><bean:write name="row" property="seal_no"/></TD>
							<TD><bean:write name="row" property="lot_attrib_03"/></TD>
							<TD><bean:write name="row" property="lot_attrib_04"/></TD>
							<TD><bean:write name="row" property="lot_attrib_05"/></TD>
							<TD><bean:write name="row" property="lot_id"/></TD>
							<TD><bean:write name="row" property="rmk"/></TD>
							<TD></TD>
							<TD></TD>
							<TD></TD>
							<TD><bean:write name="row" property="po_sys_no"/></TD>
							<TD><bean:write name="row" property="item_sys_no"/></TD>
							<TD><bean:write name="row" property="item_seq"/></TD>
							<TD><bean:write name="row" property="ctrt_no"/></TD>
							<TD><bean:write name="row" property="putaway_cnt"/></TD>
							<TD><bean:write name="row" property="ob_cnt"/></TD>
							<TD><bean:write name="row" property="file_seq"/></TD>
							<TD><bean:write name="row" property="file_path"/></TD>
							<TD><bean:write name="row" property="file_sys_nm"/></TD>
							<TD><bean:write name="row" property="file_org_nm"/></TD>
							<TD><bean:write name="row" property="file_size"/></TD>
							<TD><bean:write name="row" property="snd_ea_qty"/></TD>
							<TD><bean:write name="row" property="dmg_ea_qty"/></TD>
							<TD><bean:write name="row" property="eq_tp_cd"/></TD>
							<TD><bean:write name="row" property="wib_bk_no"/></TD>
							<TD><bean:write name="row" property="wib_in_no"/></TD>
							<TD><bean:write name="row" property="inbound_loc_cd"/></TD>
							<TD><bean:write name="row" property="dmg_loc_cd"/></TD>
							<TD><bean:write name="row" property="in_item_ea_qty_org"/></TD>
							<TD><bean:write name="row" property="inbound_loc_cd_org"/></TD>
							<TD><bean:write name="row" property="attach_add"/></TD>
							<TD><bean:write name="row" property="attach_del"/></TD>
			            </tr>
					</logic:iterate>
					</DATA>
				</SHEET>
			</logic:notEmpty>
		</logic:notEmpty>
</logic:empty>
<%-- 오류발생 --%>
<logic:notEmpty name="com.clt.framework.core.comm.EXCEPTION_OBJECT">
	<ERROR>
		<MESSAGE><![CDATA[ <bean:message name="com.clt.framework.core.comm.EXCEPTION_OBJECT" property="message"/>]]> </MESSAGE>
	</ERROR>
</logic:notEmpty>
