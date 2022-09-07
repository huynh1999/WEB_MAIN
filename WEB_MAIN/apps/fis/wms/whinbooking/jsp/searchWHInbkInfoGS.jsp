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
<logic:empty name="com.clt.framework.core.comm.EXCEPTION_OBJECT">
		<%-- 조회 결과가 없는 경우 --%>
			<logic:empty name="EventResponse" property="mapVal">
				<SHEET>
					<DATA TOTAL="0"></DATA>
				</SHEET>	
			</logic:empty>
		<%-- 조회 결과가 있는 경우 --%>
			<logic:notEmpty name="EventResponse" property="mapVal">
				<bean:define id="rowSet" name="EventResponse" property="mapVal"/>
				
				<logic:notEmpty name="rowSet" property="listCnt">
					<CHECK>
						<listCnt><![CDATA[<bean:write name="rowSet" property="listCnt"/>]]></listCnt>
					</CHECK>
				</logic:notEmpty>
				
				<logic:notEmpty name="rowSet" property="header">
 					<bean:define id="rowSetField" name="rowSet" property="header"/>
					<FIELD>
						<DATA TOTAL="1">
							<logic:iterate id="rowField" name="rowSetField">
								<listCnt><![CDATA[<bean:write name="rowSet" property="listCnt"/>]]></listCnt>
								<wib_bk_no><![CDATA[<bean:write name="rowField" property="wib_bk_no"/>]]></wib_bk_no>
								<so_no><![CDATA[<bean:write name="rowField" property="so_no"/>]]></so_no>
								<ctrt_no><![CDATA[<bean:write name="rowField" property="ctrt_no"/>]]></ctrt_no>
								<ctrt_nm><![CDATA[<bean:write name="rowField" property="ctrt_nm"/>]]></ctrt_nm>
								<eff_fr_dt><![CDATA[<bean:write name="rowField" property="eff_fr_dt"/>]]></eff_fr_dt>
								<eff_to_dt><![CDATA[<bean:write name="rowField" property="eff_to_dt"/>]]></eff_to_dt>
								<ctrt_cust_cd><![CDATA[<bean:write name="rowField" property="ctrt_cust_cd"/>]]></ctrt_cust_cd>
								<ctrt_cust_nm><![CDATA[<bean:write name="rowField" property="ctrt_cust_nm"/>]]></ctrt_cust_nm>
								<sales_ofc_cd><![CDATA[<bean:write name="rowField" property="sales_ofc_cd"/>]]></sales_ofc_cd>
								<sales_ofc_nm><![CDATA[<bean:write name="rowField" property="sales_ofc_nm"/>]]></sales_ofc_nm>
								<sales_pic_id><![CDATA[<bean:write name="rowField" property="sales_pic_id"/>]]></sales_pic_id>
								<sales_pic_nm><![CDATA[<bean:write name="rowField" property="sales_pic_nm"/>]]></sales_pic_nm>
								<rtp_no><![CDATA[<bean:write name="rowField" property="rtp_no"/>]]></rtp_no>
								<wh_cd><![CDATA[<bean:write name="rowField" property="wh_cd"/>]]></wh_cd>
								<wh_nm><![CDATA[<bean:write name="rowField" property="wh_nm"/>]]></wh_nm>
								<bk_date><![CDATA[<bean:write name="rowField" property="bk_date"/>]]></bk_date>
								<ord_tp_cd><![CDATA[<bean:write name="rowField" property="ord_tp_cd"/>]]></ord_tp_cd>
								<bk_sts_cd><![CDATA[<bean:write name="rowField" property="bk_sts_cd"/>]]></bk_sts_cd>
								<est_in_dt><![CDATA[<bean:write name="rowField" property="est_in_dt"/>]]></est_in_dt>
								<load_tp_cd><![CDATA[<bean:write name="rowField" property="load_tp_cd"/>]]></load_tp_cd>
								<fwd_dir><![CDATA[<bean:write name="rowField" property="fwd_dir"/>]]></fwd_dir>
								<order_rel><![CDATA[<bean:write name="rowField" property="order_rel"/>]]></order_rel>
								<main_svc_type><![CDATA[<bean:write name="rowField" property="main_svc_type"/>]]></main_svc_type>
								<main_svc_nm><![CDATA[<bean:write name="rowField" property="main_svc_nm"/>]]></main_svc_nm>
								<ctrt_ord_tp_nm><![CDATA[<bean:write name="rowField" property="ctrt_ord_tp_nm"/>]]></ctrt_ord_tp_nm>
								<owner_cd><![CDATA[<bean:write name="rowField" property="owner_cd"/>]]></owner_cd>
								<owner_addr1><![CDATA[<bean:write name="rowField" property="owner_addr1"/>]]></owner_addr1>
								<owner_addr2><![CDATA[<bean:write name="rowField" property="owner_addr2"/>]]></owner_addr2>
								<owner_addr3><![CDATA[<bean:write name="rowField" property="owner_addr3"/>]]></owner_addr3>
								<owner_addr4><![CDATA[<bean:write name="rowField" property="owner_addr4"/>]]></owner_addr4>
								<owner_addr5><![CDATA[<bean:write name="rowField" property="owner_addr5"/>]]></owner_addr5>
								<supp_cd><![CDATA[<bean:write name="rowField" property="supp_cd"/>]]></supp_cd>
								<supp_nm><![CDATA[<bean:write name="rowField" property="supp_nm"/>]]></supp_nm>
								<supp_addr1><![CDATA[<bean:write name="rowField" property="supp_addr1"/>]]></supp_addr1>
								<supp_addr2><![CDATA[<bean:write name="rowField" property="supp_addr2"/>]]></supp_addr2>
								<supp_addr3><![CDATA[<bean:write name="rowField" property="supp_addr3"/>]]></supp_addr3>
								<supp_addr4><![CDATA[<bean:write name="rowField" property="supp_addr4"/>]]></supp_addr4>
								<supp_addr5><![CDATA[<bean:write name="rowField" property="supp_addr5"/>]]></supp_addr5>
								<supp_type><![CDATA[<bean:write name="rowField" property="supp_type"/>]]></supp_type>
								<buyer_cd><![CDATA[<bean:write name="rowField" property="buyer_cd"/>]]></buyer_cd>
								<buyer_nm><![CDATA[<bean:write name="rowField" property="buyer_nm"/>]]></buyer_nm>
								<buyer_addr1><![CDATA[<bean:write name="rowField" property="buyer_addr1"/>]]></buyer_addr1>
								<buyer_addr2><![CDATA[<bean:write name="rowField" property="buyer_addr2"/>]]></buyer_addr2>
								<buyer_addr3><![CDATA[<bean:write name="rowField" property="buyer_addr3"/>]]></buyer_addr3>
								<buyer_addr4><![CDATA[<bean:write name="rowField" property="buyer_addr4"/>]]></buyer_addr4>
								<buyer_addr5><![CDATA[<bean:write name="rowField" property="buyer_addr5"/>]]></buyer_addr5>
								<buyer_type><![CDATA[<bean:write name="rowField" property="buyer_type"/>]]></buyer_type>
								<cust_ord_no><![CDATA[<bean:write name="rowField" property="cust_ord_no"/>]]></cust_ord_no>
								<commc_inv_no><![CDATA[<bean:write name="rowField" property="commc_inv_no"/>]]></commc_inv_no>
								<dlv_ord_no><![CDATA[<bean:write name="rowField" property="dlv_ord_no"/>]]></dlv_ord_no>
								<job_no><![CDATA[<bean:write name="rowField" property="job_no"/>]]></job_no>
								<rmk><![CDATA[<bean:write name="rowField" property="rmk"/>]]></rmk>
								<vsl_cd><![CDATA[<bean:write name="rowField" property="vsl_cd"/>]]></vsl_cd>
								<vsl_nm><![CDATA[<bean:write name="rowField" property="vsl_nm"/>]]></vsl_nm>
								<voy><![CDATA[<bean:write name="rowField" property="voy"/>]]></voy>
								<hbl_no><![CDATA[<bean:write name="rowField" property="hbl_no"/>]]></hbl_no>
								<mbl_no><![CDATA[<bean:write name="rowField" property="mbl_no"/>]]></mbl_no>
								<carrier_cd><![CDATA[<bean:write name="rowField" property="carrier_cd"/>]]></carrier_cd>
								<carrier_nm><![CDATA[<bean:write name="rowField" property="carrier_nm"/>]]></carrier_nm>
								<pol><![CDATA[<bean:write name="rowField" property="pol"/>]]></pol>
								<pol_nm><![CDATA[<bean:write name="rowField" property="pol_nm"/>]]></pol_nm>
								<etd><![CDATA[<bean:write name="rowField" property="etd"/>]]></etd>
								<pod><![CDATA[<bean:write name="rowField" property="pod"/>]]></pod>
								<pod_nm><![CDATA[<bean:write name="rowField" property="pod_nm"/>]]></pod_nm>
								<eta><![CDATA[<bean:write name="rowField" property="eta"/>]]></eta>
								<del><![CDATA[<bean:write name="rowField" property="del"/>]]></del>
								
								<del_nm><![CDATA[<bean:write name="rowField" property="del_nm"/>]]></del_nm>
								<del_dt><![CDATA[<bean:write name="rowField" property="del_dt"/>]]></del_dt>
								<est_cmpl_dt><![CDATA[<bean:write name="rowField" property="est_cmpl_dt"/>]]></est_cmpl_dt>
								<src_cd><![CDATA[<bean:write name="rowField" property="src_cd"/>]]></src_cd>
								<in_sts_cd><![CDATA[<bean:write name="rowField" property="in_sts_cd"/>]]></in_sts_cd>
								<unload_sht_cnt><![CDATA[<bean:write name="rowField" property="unload_sht_cnt"/>]]></unload_sht_cnt>
								<src_tp_cd><![CDATA[<bean:write name="rowField" property="src_tp_cd"/>]]></src_tp_cd>
								<ref_no><![CDATA[<bean:write name="rowField" property="ref_no"/>]]></ref_no>
								<ic_cnt><![CDATA[<bean:write name="rowField" property="ic_cnt"/>]]></ic_cnt>
								<user_id><![CDATA[<bean:write name="rowField" property="user_id"/>]]></user_id>
								<wo_no><![CDATA[<bean:write name="rowField" property="wo_no"/>]]></wo_no>
								<org_cd><![CDATA[<bean:write name="rowField" property="org_cd"/>]]></org_cd>
							</logic:iterate>
						</DATA>
					</FIELD>
				</logic:notEmpty>
				
				<logic:notEmpty name="rowSet" property="house">
 					<bean:define id="rowSetSheet1" name="rowSet" property="house"/>
 					
 					<bean:size id="sheet1_size" name="rowSetSheet1"/>
					<SHEET1>
						<DATA TOTAL="<bean:write name="sheet1_size" />">
						<logic:iterate id="rowSheet" name="rowSetSheet1">
							<tr>
								<TD><bean:write name="rowSheet" property="hbl_no"/></TD>
				            </tr>
						</logic:iterate>
						</DATA>
					</SHEET1>
				</logic:notEmpty>
				
				<logic:notEmpty name="rowSet" property="master">
 					<bean:define id="rowSetSheet2" name="rowSet" property="master"/>
 					
 					<bean:size id="sheet2_size" name="rowSetSheet2"/>
					<SHEET2>
						<DATA TOTAL="<bean:write name="sheet2_size" />">
						<logic:iterate id="rowSheet" name="rowSetSheet2">
							<tr>
								<TD><bean:write name="rowSheet" property="mbl_no"/></TD>
				            </tr>
						</logic:iterate>
						</DATA>
					</SHEET2>
				</logic:notEmpty>
				
				<logic:notEmpty name="rowSet" property="booking">
 					<bean:define id="rowSetSheet3" name="rowSet" property="booking"/>
 					
 					<bean:size id="sheet3_size" name="rowSetSheet3"/>
 					
					<SHEET3>
						<DATA TOTAL="<bean:write name="sheet3_size" />">
						<logic:iterate id="rowSheet3" name="rowSetSheet3">
							<tr>
								<TD></TD>
								<TD></TD>
								<TD><bean:write name="rowSheet3" property="item_cd"/></TD>
								<TD><bean:write name="rowSheet3" property="item_nm"/></TD>
								<TD><bean:write name="rowSheet3" property="lot_no"/></TD>
								<TD><bean:write name="rowSheet3" property="item_pkgunit"/></TD>
								<TD><bean:write name="rowSheet3" property="item_pkgqty"/></TD>
								<TD><bean:write name="rowSheet3" property="pkg_info"/></TD>
								<TD><bean:write name="rowSheet3" property="item_ea_qty"/></TD>
								<TD><bean:write name="rowSheet3" property="item_cbm"/></TD>
								<TD><bean:write name="rowSheet3" property="item_cbf"/></TD>
								<TD><bean:write name="rowSheet3" property="item_grs_kgs"/></TD>
								<TD><bean:write name="rowSheet3" property="item_grs_lbs"/></TD>
								<TD><bean:write name="rowSheet3" property="item_net_kgs"/></TD>
								<TD><bean:write name="rowSheet3" property="item_net_lbs"/></TD>
								<TD><bean:write name="rowSheet3" property="po_no"/></TD>
								<TD><bean:write name="rowSheet3" property="eq_tpsz_cd"/></TD>
								<TD><bean:write name="rowSheet3" property="eq_no"/></TD>
								<TD><bean:write name="rowSheet3" property="seal_no"/></TD>
								<TD></TD>
								<TD><bean:write name="rowSheet3" property="inbound_dt"/></TD>
								<TD><bean:write name="rowSheet3" property="exp_dt"/></TD>
								<TD><bean:write name="rowSheet3" property="lot_04"/></TD>
								<TD><bean:write name="rowSheet3" property="lot_05"/></TD>
								<TD><bean:write name="rowSheet3" property="fix_lot_id"/></TD>
								<TD></TD>
								<TD><bean:write name="rowSheet3" property="cntr_ref_no"/></TD>
								<TD><bean:write name="rowSheet3" property="hbl_no"/></TD>
								<TD><bean:write name="rowSheet3" property="mbl_no"/></TD>
								<TD><bean:write name="rowSheet3" property="pol"/></TD>
								<TD><bean:write name="rowSheet3" property="etd"/></TD>
								<TD><bean:write name="rowSheet3" property="pod"/></TD>
								<TD><bean:write name="rowSheet3" property="eta"/></TD>
								<TD><bean:write name="rowSheet3" property="del"/></TD>
								<TD><bean:write name="rowSheet3" property="carrier_cd"/></TD>
								<TD><bean:write name="rowSheet3" property="carrier_nm"/></TD>
								<TD><bean:write name="rowSheet3" property="vsl_cd"/></TD>
								<TD><bean:write name="rowSheet3" property="vsl_nm"/></TD>
								<TD><bean:write name="rowSheet3" property="voy"/></TD>
								<TD><bean:write name="rowSheet3" property="curr_cd"/></TD>
								<TD><bean:write name="rowSheet3" property="unit_price"/></TD>
								<TD><bean:write name="rowSheet3" property="po_sys_no"/></TD>
								<TD><bean:write name="rowSheet3" property="item_sys_no"/></TD>
								<TD></TD>
								<TD></TD>
								<TD></TD>
								<TD></TD>
								<TD><bean:write name="rowSheet3" property="item_seq"/></TD>
								<TD><bean:write name="rowSheet3" property="ctrt_no"/></TD>
								<TD><bean:write name="rowSheet3" property="eq_tp_cd"/></TD>
								<TD><bean:write name="rowSheet3" property="pkg_lv1_qty"/></TD>
								<TD></TD>
								<TD><bean:write name="rowSheet3" property="pkg_lv2_qty"/></TD>
								<TD></TD>
								<TD><bean:write name="rowSheet3" property="pkg_lv3_qty"/></TD>
								<TD></TD>
								<TD><bean:write name="rowSheet3" property="pkg_lv4_qty"/></TD>
								<TD></TD>
								<TD><bean:write name="rowSheet3" property="lv1_cbm"/></TD>
								<TD><bean:write name="rowSheet3" property="lv1_cbf"/></TD>
								<TD><bean:write name="rowSheet3" property="lv1_grs_kgs"/></TD>
								<TD><bean:write name="rowSheet3" property="lv1_grs_lbs"/></TD>
								<TD><bean:write name="rowSheet3" property="lv1_net_kgs"/></TD>
								<TD><bean:write name="rowSheet3" property="lv1_net_lbs"/></TD>
								<TD><bean:write name="rowSheet3" property="invalid_yn"/></TD>
								<TD><bean:write name="rowSheet3" property="su_valid_yn"/></TD>
								<TD><bean:write name="rowSheet3" property="org_item_sys_no"/></TD>
				            </tr>
						</logic:iterate>
						</DATA>
					</SHEET3>
				</logic:notEmpty>
				
				<logic:notEmpty name="rowSet" property="doc">
 					<bean:define id="rowSetSheet4" name="rowSet" property="doc"/>
 					
 					<bean:size id="sheet4_size" name="rowSetSheet4"/>
 					
					<SHEET4>
						<DATA TOTAL="<bean:write name="sheet4_size" />">
						<logic:iterate id="rowSheet4" name="rowSetSheet4">
							<tr>
								<TD></TD>
								<TD><bean:write name="rowSheet4" property="field_name"/></TD>
								<TD><bean:write name="rowSheet4" property="field_val"/></TD>
								<TD><bean:write name="rowSheet4" property="doc_type"/></TD>
				            </tr>
						</logic:iterate>
						</DATA>
					</SHEET4>
				</logic:notEmpty>
				
				<logic:notEmpty name="rowSet" property="attachment">
 					<bean:define id="rowSetSheet5" name="rowSet" property="attachment"/>
 					
 					<bean:size id="sheet5_size" name="rowSetSheet5"/>
 					
					<SHEET5>
						<DATA TOTAL="<bean:write name="sheet5_size" />">
						<logic:iterate id="rowSheet5" name="rowSetSheet5">
							<tr>
								<TD></TD>
								<TD></TD>
								<TD><bean:write name="rowSheet5" property="file_org_nm"/></TD>
								<TD><bean:write name="rowSheet5" property="upload_date"/></TD>
								<TD><bean:write name="rowSheet5" property="file_size"/></TD>
								<TD><bean:write name="rowSheet5" property="doc_no"/></TD>
								<TD><bean:write name="rowSheet5" property="file_path"/></TD>
								<TD><bean:write name="rowSheet5" property="file_sys_nm"/></TD>
								<TD><bean:write name="rowSheet5" property="svc_tp_cd"/></TD>
								<TD><bean:write name="rowSheet5" property="doc_ref_tp_cd"/></TD>
								<TD><bean:write name="rowSheet5" property="doc_tp_cd"/></TD>
				            </tr>
						</logic:iterate>
						</DATA>
					</SHEET5>
				</logic:notEmpty>
			</logic:notEmpty>
</logic:empty>
<%-- 오류발생 --%>
<logic:notEmpty name="com.clt.framework.core.comm.EXCEPTION_OBJECT">
	<ERROR>
		<MESSAGE><![CDATA[ <bean:message name="com.clt.framework.core.comm.EXCEPTION_OBJECT" property="message"/>]]> </MESSAGE>
	</ERROR>
</logic:notEmpty>
