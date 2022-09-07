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
			<wms_seq><![CDATA[<bean:write name="othDetailsVO" property="wms_seq" filter="false" />]]></wms_seq>
					<doc_ref_no><![CDATA[<bean:write name="othDetailsVO" property="doc_ref_no" filter="false" />]]></doc_ref_no>
					<sts_cd><![CDATA[<bean:write name="othDetailsVO" property="sts_cd" filter="false" />]]></sts_cd>
					<post_dt><![CDATA[<bean:write  name="othDetailsVO" property="post_dt"  filter="false" />]]></post_dt>
					<ofc_cd><![CDATA[<bean:write name="othDetailsVO" property="ofc_cd" filter="false" />]]></ofc_cd>
					<wh_cd><![CDATA[<bean:write name="othDetailsVO" property="wh_cd" filter="false" />]]></wh_cd>
					<cust_cd><![CDATA[<bean:write name="othDetailsVO" property="cust_cd" filter="false" />]]></cust_cd>
					<cust_nm><![CDATA[<bean:write name="othDetailsVO" property="cust_nm" filter="false" />]]></cust_nm>
					<cust_ref_no><![CDATA[<bean:write name="othDetailsVO" property="cust_ref_no" filter="false" />]]></cust_ref_no>
					
						
					<int_memo><![CDATA[<bean:write name="othDetailsVO" property="int_memo" filter="false" />]]></int_memo>
					<ext_memo><![CDATA[<bean:write name="othDetailsVO" property="ext_memo" filter="false" />]]></ext_memo>
					<cntr_info><![CDATA[<bean:write name="othDetailsVO" property="cntr_info" filter="false" />]]></cntr_info>				
					<mbl_no><![CDATA[<bean:write name="othDetailsVO" property="mbl_no" filter="false" />]]></mbl_no>
					<hbl_no><![CDATA[<bean:write name="othDetailsVO" property="hbl_no" filter="false" />]]></hbl_no>
					<curr_cd><![CDATA[<bean:write name="othDetailsVO" property="curr_cd" filter="false" />]]></curr_cd>
					
										
					
					<sls_usrid><![CDATA[<bean:write name="othDetailsVO" property="sls_usrid" filter="false" />]]></sls_usrid>
					<sls_ofc_cd><![CDATA[<bean:write name="othDetailsVO" property="sls_ofc_cd" filter="false" />]]></sls_ofc_cd>
					<opr_usrid><![CDATA[<bean:write name="othDetailsVO" property="opr_usrid" filter="false" />]]></opr_usrid>
					
					<ctrb_ofc_cd><![CDATA[<bean:write name="othDetailsVO" property="ctrb_ofc_cd" filter="false" />]]></ctrb_ofc_cd>
					<ctrb_dept_cd><![CDATA[<bean:write name="othDetailsVO" property="ctrb_dept_cd" filter="false" />]]></ctrb_dept_cd>
					<ctrb_ratio_yn><![CDATA[<bean:write name="othDetailsVO" property="ctrb_ratio_yn" filter="false" />]]></ctrb_ratio_yn>
					<ctrb_mgn><![CDATA[<bean:write name="othDetailsVO" property="ctrb_mgn" filter="false" />]]></ctrb_mgn>
					
	  	</DATA>
	</logic:notEmpty>
</logic:empty>