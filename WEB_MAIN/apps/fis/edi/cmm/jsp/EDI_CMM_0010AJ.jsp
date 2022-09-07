<%--
=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
=========================================================
=========================================================
*@FileName   : EDI_CMM_0010AJ.jsp
*@FileTitle  : EDI Portal
*@Description: 
*@author     : 
*@version    : 
*@since      : 

*@Change history:
=========================================================
--%>
<%@ page contentType="text/xml; charset=UTF-8"%>
<%@include file="./../../../../../../syscommon/header/CLTGSHeader.jsp"%>
<logic:empty name="com.clt.framework.core.comm.EXCEPTION_OBJECT      ">
	<logic:notEmpty name="EventResponse" property="objVal">
		<bean:define id="hblVO"   name="EventResponse" property="objVal"/>
    	<bean:define id="valMap"  name="EventResponse" property="mapVal"/>
		<DATA>
			<shpr_trdp_cd><![CDATA[<bean:write name="hblVO" property="shpr_trdp_cd" filter="false" />]]></shpr_trdp_cd>
			<shpr_trdp_nm><![CDATA[<bean:write name="hblVO" property="shpr_trdp_nm" filter="false" />]]></shpr_trdp_nm>
			<shpr_trdp_addr><![CDATA[<bean:write name="hblVO" property="shpr_trdp_addr" filter="false" />]]></shpr_trdp_addr>
			<shpr_pic_nm><![CDATA[<bean:write name="hblVO" property="shpr_pic_nm" filter="false" />]]></shpr_pic_nm>
			<shpr_pic_phn><![CDATA[<bean:write name="hblVO" property="shpr_pic_phn" filter="false" />]]></shpr_pic_phn>
			<shpr_pic_fax><![CDATA[<bean:write name="hblVO" property="shpr_pic_fax" filter="false" />]]></shpr_pic_fax>
			<shpr_pic_eml><![CDATA[<bean:write name="hblVO" property="shpr_pic_eml" filter="false" />]]></shpr_pic_eml>
		
			<cnee_trdp_cd><![CDATA[<bean:write name="hblVO" property="cnee_trdp_cd" filter="false" />]]></cnee_trdp_cd>
			<cnee_trdp_nm><![CDATA[<bean:write name="hblVO" property="cnee_trdp_nm" filter="false" />]]></cnee_trdp_nm>
			<cnee_trdp_addr><![CDATA[<bean:write name="hblVO" property="cnee_trdp_addr" filter="false" />]]></cnee_trdp_addr>
			<cnee_pic_nm><![CDATA[<bean:write name="hblVO" property="cnee_pic_nm" filter="false" />]]></cnee_pic_nm>
			<cnee_pic_phn><![CDATA[<bean:write name="hblVO" property="cnee_pic_phn" filter="false" />]]></cnee_pic_phn>
			<cnee_pic_fax><![CDATA[<bean:write name="hblVO" property="cnee_pic_fax" filter="false" />]]></cnee_pic_fax>
			<cnee_pic_eml><![CDATA[<bean:write name="hblVO" property="cnee_pic_eml" filter="false" />]]></cnee_pic_eml>
		
			<ntfy_trdp_cd><![CDATA[<bean:write name="hblVO" property="ntfy_trdp_cd" filter="false" />]]></ntfy_trdp_cd>
			<ntfy_trdp_nm><![CDATA[<bean:write name="hblVO" property="ntfy_trdp_nm" filter="false" />]]></ntfy_trdp_nm>
			<ntfy_trdp_addr><![CDATA[<bean:write name="hblVO" property="ntfy_trdp_addr" filter="false" />]]></ntfy_trdp_addr>
			<ntfy_pic_nm><![CDATA[<bean:write name="hblVO" property="ntfy_pic_nm" filter="false" />]]></ntfy_pic_nm>
			<ntfy_pic_phn><![CDATA[<bean:write name="hblVO" property="ntfy_pic_phn" filter="false" />]]></ntfy_pic_phn>
			<ntfy_pic_fax><![CDATA[<bean:write name="hblVO" property="ntfy_pic_fax" filter="false" />]]></ntfy_pic_fax>
			<ntfy_pic_eml><![CDATA[<bean:write name="hblVO" property="ntfy_pic_eml" filter="false" />]]></ntfy_pic_eml>
		
			<carr_trdp_cd><![CDATA[<bean:write name="hblVO" property="carr_trdp_cd" filter="false" />]]></carr_trdp_cd>
			<carr_trdp_nm><![CDATA[<bean:write name="hblVO" property="carr_trdp_nm" filter="false" />]]></carr_trdp_nm>
			<carr_trdp_addr><![CDATA[<bean:write name="hblVO" property="carr_trdp_addr" filter="false" />]]></carr_trdp_addr>
			<carr_pic_nm><![CDATA[<bean:write name="hblVO" property="carr_pic_nm" filter="false" />]]></carr_pic_nm>
			<carr_pic_phn><![CDATA[<bean:write name="hblVO" property="carr_pic_phn" filter="false" />]]></carr_pic_phn>
			<carr_pic_fax><![CDATA[<bean:write name="hblVO" property="carr_pic_fax" filter="false" />]]></carr_pic_fax>
			<carr_pic_eml><![CDATA[<bean:write name="hblVO" property="carr_pic_eml" filter="false" />]]></carr_pic_eml>

			<obl_tp_nm><![CDATA[<bean:write name="hblVO" property="obl_tp_nm" filter="false" />]]></obl_tp_nm>
			<org_bl_qty><![CDATA[<bean:write name="hblVO" property="org_bl_qty" filter="false" />]]></org_bl_qty>
			<bl_frt_tp><![CDATA[<bean:write name="hblVO" property="bl_frt_tp" filter="false" />]]></bl_frt_tp>
			<bl_split_cnt><![CDATA[<bean:write name="hblVO" property="bl_split_cnt" filter="false" />]]></bl_split_cnt>
			<si_bl_tp><![CDATA[<bean:write name="hblVO" property="si_bl_tp" filter="false" />]]></si_bl_tp>
			<lnr_bkg_no><![CDATA[<bean:write name="hblVO" property="lnr_bkg_no" filter="false" />]]></lnr_bkg_no>
			<intg_bl_seq><![CDATA[<bean:write name="hblVO" property="intg_bl_seq" filter="false" />]]></intg_bl_seq>
			<hbl_cnt><![CDATA[<bean:write name="hblVO" property="hbl_cnt" filter="false" />]]></hbl_cnt>
		
			<por_cd><![CDATA[<bean:write name="hblVO" property="por_cd" filter="false" />]]></por_cd>
			<pol_cd><![CDATA[<bean:write name="hblVO" property="pol_cd" filter="false" />]]></pol_cd>			
			<pod_cd><![CDATA[<bean:write name="hblVO" property="pod_cd" filter="false" />]]></pod_cd>
			<del_cd><![CDATA[<bean:write name="hblVO" property="del_cd" filter="false" />]]></del_cd>
			<por_nm><![CDATA[<bean:write name="hblVO" property="por_nm" filter="false" />]]></por_nm>
			<pol_nm><![CDATA[<bean:write name="hblVO" property="pol_nm" filter="false" />]]></pol_nm>
			<pod_nm><![CDATA[<bean:write name="hblVO" property="pod_nm" filter="false" />]]></pod_nm>
			<del_nm><![CDATA[<bean:write name="hblVO" property="del_nm" filter="false" />]]></del_nm>
			<un_por_cd><![CDATA[<bean:write name="hblVO" property="un_por_cd" filter="false" />]]></un_por_cd>
			<un_pol_cd><![CDATA[<bean:write name="hblVO" property="un_pol_cd" filter="false" />]]></un_pol_cd>
			<un_pod_cd><![CDATA[<bean:write name="hblVO" property="un_pod_cd" filter="false" />]]></un_pod_cd>
			<un_del_cd><![CDATA[<bean:write name="hblVO" property="un_del_cd" filter="false" />]]></un_del_cd>
			<si_rmk><![CDATA[<bean:write name="hblVO" property="si_rmk" filter="false" />]]></si_rmk>
		</DATA>
	</logic:notEmpty>    
</logic:empty>
