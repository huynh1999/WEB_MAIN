<%--
=========================================================
*Copyright(c) 2008 CyberLogitec. All Rights Reserved.
=========================================================

=========================================================
*@FileName   : TOPMENUGS.jsp
*@FileTitle  : 최상위 메뉴 표시
*@Description: 최상위 메뉴의 관리
*@author     : Kang,Jung-Gu - Cyberlogitec
*@version    : 1.0 - 08/07/2008
*@since      : 08/07/2008

*@Change history:
=========================================================
--%>
<%@ page contentType="text/xml; charset=UTF-8"%>
<%@page pageEncoding="UTF-8"%>
<%@include file="./../../../../../../../../syscommon/header/CLTGSHeader.jsp"%>

<%-- 정상처리 --%>
<logic:empty name="com.clt.framework.core.comm.EXCEPTION_OBJECT      ">
		<%-- 조회 결과가 없는 경우 --%>
			<logic:empty name="EventResponse" property="listVal">
				<SHEET>
					<DATA TOTAL="0"></DATA>
				</SHEET>	
			</logic:empty>
		<%-- 조회 결과가 있는 경우 --%>
			<logic:notEmpty name="EventResponse" property="listVal">
				<bean:define id="rowSet" name="EventResponse" property="listVal"/>
				<SHEET>
					<DATA TOTAL="<bean:write name="EventResponse" property="listValCnt"/>">
					<logic:iterate id="row" name="rowSet">
						<tr>	
							<TD></TD>
							<TD></TD>
							<TD><![CDATA[<bean:write name="row" property="mnu_seq"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="mnu_nm"   filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="srt_seq"/>]]></TD>
							<!-- #535: [SBS] 다국어 처리 V1.0 -->
							<TD><![CDATA[<bean:write name="row" property="mnu_nm_en"   filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="mnu_nm_zh"   filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="mnu_nm_ja"   filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="mnu_nm_ko"   filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="mnu_desc" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="use_flg"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="cur_cnt"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="mnu_img_index"/>]]></TD>
			            </tr>
					</logic:iterate>
						</DATA>
				</SHEET>
			</logic:notEmpty>
</logic:empty>
