<%@ page contentType="text/xml; charset=UTF-8"%>
<%@page pageEncoding="UTF-8"%>
<%@include file="./../../../../../../syscommon/header/CLTGSHeader.jsp"%>
<%-- 정상처리 --%>
<logic:empty name="com.clt.framework.core.comm.EXCEPTION_OBJECT      ">
	<%-- 조회 결과가 없는 경우 --%>
	<logic:empty name="EventResponse" property="mapVal">
			<RESULT>0</RESULT>
	</logic:empty>
	<%-- 조회 결과가 있는 경우 --%>
	<logic:notEmpty name="EventResponse" property="mapVal">
		<COMON>
		
			<RESULT>1</RESULT>
		
			<bean:define id="mapVal" name="EventResponse" property="mapVal"/>
			
			
			<logic:empty name="mapVal" property="WHOutbkInfo">
				<INFO></INFO>
			</logic:empty>
			
			<logic:notEmpty name="mapVal" property="WHOutbkInfo">
				<bean:define id="WHOutbkInfo" name="mapVal" property="WHOutbkInfo"/>
				
				<INFO>
					<wob_bk_no><bean:write name="WHOutbkInfo" property="wob_bk_no"/></wob_bk_no>
					<so_no><bean:write name="WHOutbkInfo" property="so_no"/></so_no>
					<ctrt_no><bean:write name="WHOutbkInfo" property="ctrt_no"/></ctrt_no>
					<ctrt_nm><bean:write name="WHOutbkInfo" property="ctrt_nm"/></ctrt_nm>
					<ctrt_cust_cd><bean:write name="WHOutbkInfo" property="ctrt_cust_cd"/></ctrt_cust_cd>
					<bk_stff_ofc_cd><bean:write name="WHOutbkInfo" property="sales_ofc_cd"/></bk_stff_ofc_cd>
					<bk_stff_ofc_nm><bean:write name="WHOutbkInfo" property="bk_stff_ofc_nm"/></bk_stff_ofc_nm>
					<bk_stff_id><bean:write name="WHOutbkInfo" property="bk_stff_id"/></bk_stff_id>
					<bk_stff_nm><bean:write name="WHOutbkInfo" property="sales_pic_nm"/></bk_stff_nm>
					<rtp_no><bean:write name="WHOutbkInfo" property="rtp_no"/></rtp_no>
					<wh_cd><bean:write name="WHOutbkInfo" property="wh_cd"/></wh_cd>
					<wh_nm><bean:write name="WHOutbkInfo" property="wh_nm"/></wh_nm>
					<bk_date><bean:write name="WHOutbkInfo" property="bk_date"/></bk_date>
					<ord_tp_cd><bean:write name="WHOutbkInfo" property="ord_tp_cd"/></ord_tp_cd>
					<bk_sts_cd><bean:write name="WHOutbkInfo" property="bk_sts_cd"/></bk_sts_cd>
					<est_out_dt><bean:write name="WHOutbkInfo" property="est_out_dt"/></est_out_dt>
					<load_tp_cd><bean:write name="WHOutbkInfo" property="load_tp_cd"/></load_tp_cd>
					<fwd_dir><bean:write name="WHOutbkInfo" property="fwd_dir"/></fwd_dir>
					<order_rel><bean:write name="WHOutbkInfo" property="order_rel"/></order_rel>
					<main_svc_type><bean:write name="WHOutbkInfo" property="main_svc_type"/></main_svc_type>
					<main_svc_tp_nm><bean:write name="WHOutbkInfo" property="main_svc_tp_nm"/></main_svc_tp_nm>
					<ctrt_ord_tp_nm><bean:write name="WHOutbkInfo" property="ctrt_ord_tp_nm"/></ctrt_ord_tp_nm>
					<owner_cd><bean:write name="WHOutbkInfo" property="owner_cd"/></owner_cd>
					<owner_nm><bean:write name="WHOutbkInfo" property="owner_nm"/></owner_nm>
					<owner_addr1><bean:write name="WHOutbkInfo" property="owner_addr1"/></owner_addr1>
					<owner_addr2><bean:write name="WHOutbkInfo" property="owner_addr2"/></owner_addr2>
					<owner_addr3><bean:write name="WHOutbkInfo" property="owner_addr3"/></owner_addr3>
					<owner_addr4><bean:write name="WHOutbkInfo" property="owner_addr4"/></owner_addr4>
					<owner_addr5><bean:write name="WHOutbkInfo" property="owner_addr5"/></owner_addr5>
					<supp_cd><bean:write name="WHOutbkInfo" property="supp_cd"/></supp_cd>
					<supp_nm><bean:write name="WHOutbkInfo" property="supp_nm"/></supp_nm>
					<supp_addr1><bean:write name="WHOutbkInfo" property="supp_addr1"/></supp_addr1>
					<supp_addr2><bean:write name="WHOutbkInfo" property="supp_addr2"/></supp_addr2>
					<supp_addr3><bean:write name="WHOutbkInfo" property="supp_addr3"/></supp_addr3>
					<supp_addr4><bean:write name="WHOutbkInfo" property="supp_addr4"/></supp_addr4>
					<supp_addr5><bean:write name="WHOutbkInfo" property="supp_addr5"/></supp_addr5>
					<supp_type><bean:write name="WHOutbkInfo" property="supp_type"/></supp_type>
					<buyer_cd><bean:write name="WHOutbkInfo" property="buyer_cd"/></buyer_cd>
					<buyer_nm><bean:write name="WHOutbkInfo" property="buyer_nm"/></buyer_nm>
					<buyer_addr1><bean:write name="WHOutbkInfo" property="buyer_addr1"/></buyer_addr1>
					<buyer_addr2><bean:write name="WHOutbkInfo" property="buyer_addr2"/></buyer_addr2>
					<buyer_addr3><bean:write name="WHOutbkInfo" property="buyer_addr3"/></buyer_addr3>
					<buyer_addr4><bean:write name="WHOutbkInfo" property="buyer_addr4"/></buyer_addr4>
					<buyer_addr5><bean:write name="WHOutbkInfo" property="buyer_addr5"/></buyer_addr5>
					<buyer_type><bean:write name="WHOutbkInfo" property="buyer_type"/></buyer_type>
					<cust_ord_no><bean:write name="WHOutbkInfo" property="cust_ord_no"/></cust_ord_no>
					<commc_inv_no><bean:write name="WHOutbkInfo" property="commc_inv_no"/></commc_inv_no>
					<dlv_ord_no><bean:write name="WHOutbkInfo" property="dlv_ord_no"/></dlv_ord_no>
					<job_no><bean:write name="WHOutbkInfo" property="job_no"/></job_no>
					<rmk><bean:write name="WHOutbkInfo" property="rmk"/></rmk>
					<vsl_cd><bean:write name="WHOutbkInfo" property="vsl_cd"/></vsl_cd>
					<vsl_nm><bean:write name="WHOutbkInfo" property="vsl_nm"/></vsl_nm>
					<voy><bean:write name="WHOutbkInfo" property="voy"/></voy>
					<hbl_no><bean:write name="WHOutbkInfo" property="hbl_no"/></hbl_no>
					<mbl_no><bean:write name="WHOutbkInfo" property="mbl_no"/></mbl_no>
					<carrier_cd><bean:write name="WHOutbkInfo" property="carrier_cd"/></carrier_cd>
					<carrier_nm><bean:write name="WHOutbkInfo" property="carrier_nm"/></carrier_nm>
					<pol><bean:write name="WHOutbkInfo" property="pol"/></pol>
					<pol_nm><bean:write name="WHOutbkInfo" property="pol_nm"/></pol_nm>
					<etd><bean:write name="WHOutbkInfo" property="etd"/></etd>
					<pod><bean:write name="WHOutbkInfo" property="pod"/></pod>
					<pod_nm><bean:write name="WHOutbkInfo" property="pod_nm"/></pod_nm>
					<eta><bean:write name="WHOutbkInfo" property="eta"/></eta>
					<del><bean:write name="WHOutbkInfo" property="del"/></del>
					<del_nm><bean:write name="WHOutbkInfo" property="del_nm"/></del_nm>
					<est_cmpl_dt><bean:write name="WHOutbkInfo" property="est_cmpl_dt"/></est_cmpl_dt>
					<src_cd><bean:write name="WHOutbkInfo" property="src_cd"/></src_cd>
					<wave_no><bean:write name="WHOutbkInfo" property="wave_no"/></wave_no>
					<req_dept><bean:write name="WHOutbkInfo" property="req_dept"/></req_dept>
					<req_applicant><bean:write name="WHOutbkInfo" property="req_applicant"/></req_applicant>
					<src_tp_cd><bean:write name="WHOutbkInfo" property="src_tp_cd"/></src_tp_cd>
					<ref_no><bean:write name="WHOutbkInfo" property="ref_no"/></ref_no>
					<out_cnt><bean:write name="WHOutbkInfo" property="out_cnt"/></out_cnt>
					<user_id><bean:write name="WHOutbkInfo" property="user_id"/></user_id>
					<wo_no><bean:write name="WHOutbkInfo" property="wo_no"/></wo_no>
					<org_cd><bean:write name="WHOutbkInfo" property="org_cd"/></org_cd>
					<rtncd><bean:write name="WHOutbkInfo" property="rtncd"/></rtncd>
					<rtnmsg><bean:write name="WHOutbkInfo" property="rtnmsg"/></rtnmsg>
				</INFO>
			</logic:notEmpty>
			
			
			<logic:empty name="mapVal" property="WHOutbkItemList">
				<SHEET1>
					<SHEET>
						<DATA TOTAL="0"></DATA>
					</SHEET>
				</SHEET1>
			</logic:empty>
			
			<logic:notEmpty name="mapVal" property="WHOutbkItemList">
				<bean:define id="rowSet" name="mapVal" property="WHOutbkItemList"/>
				
				<SHEET1>
					<SHEET>
						<DATA TOTAL="<bean:write name="mapVal" property="WHOutbkItemListSize"/>">
						<logic:iterate id="row" name="rowSet">
							<tr>
								<TD></TD>
								<TD></TD>
								<TD><bean:write name="row" property="item_cd"/></TD>
								<TD><bean:write name="row" property="item_nm"/></TD>
								<TD><bean:write name="row" property="lot_no"/></TD>
								<TD><bean:write name="row" property="item_pkgunit"/></TD>
								<TD><bean:write name="row" property="item_pkgqty"/></TD>
								<TD><bean:write name="row" property="pkg_info"/></TD>
								<TD><bean:write name="row" property="item_ea_qty"/></TD>
								<TD><bean:write name="row" property="stock_qty"/></TD>
								<TD><bean:write name="row" property="item_cbm"/></TD>
								<TD><bean:write name="row" property="item_cbf"/></TD>
								<TD><bean:write name="row" property="item_grs_kgs"/></TD>
								<TD><bean:write name="row" property="item_grs_lbs"/></TD>
								<TD><bean:write name="row" property="item_net_kgs"/></TD>
								<TD><bean:write name="row" property="item_net_lbs"/></TD>
								<TD><bean:write name="row" property="inbound_dt"/></TD>
								<TD><bean:write name="row" property="exp_dt"/></TD>
								<TD><bean:write name="row" property="lot_04"/></TD>
								<TD><bean:write name="row" property="lot_05"/></TD>
								<TD><bean:write name="row" property="fix_lot_id"/></TD>
								<TD></TD>
								<TD><bean:write name="row" property="cust_item_cd"/></TD>
								<TD><bean:write name="row" property="sao_no"/></TD>
								<TD><bean:write name="row" property="item_remark"/></TD>
								<TD><bean:write name="row" property="curr_cd"/></TD>
								<TD><bean:write name="row" property="unit_price"/></TD>
								<TD><bean:write name="row" property="sao_sys_no"/></TD>
								<TD><bean:write name="row" property="item_sys_no"/></TD>
								<TD><bean:write name="row" property="item_seq"/></TD>
								<TD></TD>
								<TD></TD>
								<TD><bean:write name="row" property="pkg_lv1_qty"/></TD>
								<TD><bean:write name="row" property="lv1_cbm"/></TD>
								<TD><bean:write name="row" property="lv1_cbf"/></TD>
								<TD><bean:write name="row" property="lv1_grs_kgs"/></TD>
								<TD><bean:write name="row" property="lv1_grs_lbs"/></TD>
								<TD><bean:write name="row" property="lv1_net_kgs"/></TD>
								<TD><bean:write name="row" property="lv1_net_lbs"/></TD>
								<TD><bean:write name="row" property="invalid_yn"/></TD>
				            </tr>
						</logic:iterate>
						</DATA>
					</SHEET>
				</SHEET1>
			</logic:notEmpty>
			
			<logic:empty name="mapVal" property="WHOutbkDocList">
				<SHEET2>
					<SHEET>
						<DATA TOTAL="0"></DATA>
					</SHEET>
				</SHEET2>
			</logic:empty>
			
			<logic:notEmpty name="mapVal" property="WHOutbkDocList">
				<bean:define id="rowSet" name="mapVal" property="WHOutbkDocList"/>
				<SHEET2>
					<SHEET>
						<DATA TOTAL="<bean:write name="mapVal" property="WHOutbkDocListSize"/>">
						<logic:iterate id="row" name="rowSet">
							<tr>
								<TD></TD>
								<TD><bean:write name="row" property="field_name"/></TD>
								<TD><bean:write name="row" property="field_val"/></TD>
								<TD><bean:write name="row" property="doc_type"/></TD>
				            </tr>
						</logic:iterate>
						</DATA>
					</SHEET>
				</SHEET2>
			</logic:notEmpty>
			
			<logic:empty name="mapVal" property="WHOutbkFileList">
				<SHEET3>
					<SHEET>
						<DATA TOTAL="0"></DATA>
					</SHEET>
				</SHEET3>
			</logic:empty>
			
			<logic:notEmpty name="mapVal" property="WHOutbkFileList">
				
				<bean:define id="rowSet" name="mapVal" property="WHOutbkFileList"/>
				
				<SHEET3>
					<SHEET>
						<DATA TOTAL="<bean:write name="mapVal" property="WHOutbkFileListSize"/>">
						<logic:iterate id="row" name="rowSet">
							<tr>
								<TD></TD>
								<TD></TD>
								<TD><bean:write name="row" property="file_org_nm"/></TD>
								<TD><bean:write name="row" property="upload_date"/></TD>
								<TD><bean:write name="row" property="file_size"/></TD>
								<TD><bean:write name="row" property="doc_no"/></TD>
								<TD><bean:write name="row" property="file_path"/></TD>
								<TD><bean:write name="row" property="file_sys_nm"/></TD>
								<TD><bean:write name="row" property="svc_tp_cd"/></TD>
								<TD><bean:write name="row" property="doc_ref_tp_cd"/></TD>
								<TD><bean:write name="row" property="doc_tp_cd"/></TD>
				            </tr>
						</logic:iterate>
						</DATA>
					</SHEET>
				</SHEET3>
			</logic:notEmpty>
			
			<%-- searchWHItemCodeInfo --%>
			<logic:empty name="mapVal" property="WHItemCodeInfo">
				<WHITEMCODEINFO></WHITEMCODEINFO>
			</logic:empty>
			
			<logic:notEmpty name="mapVal" property="WHItemCodeInfo">
			<bean:define id="WHItemCodeInfo" name="mapVal" property="WHItemCodeInfo"/>
			<WHITEMCODEINFO>
				<ctrt_no><bean:write name="WHItemCodeInfo" property="ctrt_no"/></ctrt_no> 
				<item_sys_no><bean:write name="WHItemCodeInfo" property="item_sys_no"/></item_sys_no> 
				<item_cd><bean:write name="WHItemCodeInfo" property="item_cd"/></item_cd> 
				<item_nm><bean:write name="WHItemCodeInfo" property="item_nm"/></item_nm> 
				<lot_no><bean:write name="WHItemCodeInfo" property="lot_no"/></lot_no> 
				<item_pkgbaseqty><bean:write name="WHItemCodeInfo" property="item_pkgbaseqty"/></item_pkgbaseqty> 
				<item_pkgunit><bean:write name="WHItemCodeInfo" property="item_pkgunit"/></item_pkgunit> 
				<pkg_lv1_unit_cd><bean:write name="WHItemCodeInfo" property="pkg_lv1_unit_cd"/></pkg_lv1_unit_cd> 
				<pkg_lv1_qty><bean:write name="WHItemCodeInfo" property="pkg_lv1_qty"/></pkg_lv1_qty> 
				<pkg_lv3_unit_cd><bean:write name="WHItemCodeInfo" property="pkg_lv3_unit_cd"/></pkg_lv3_unit_cd> 
				<pkg_lv3_qty><bean:write name="WHItemCodeInfo" property="pkg_lv3_qty"/></pkg_lv3_qty> 
				<pkg_lv4_unit_cd><bean:write name="WHItemCodeInfo" property="pkg_lv4_unit_cd"/></pkg_lv4_unit_cd> 
				<pkg_lv4_qty><bean:write name="WHItemCodeInfo" property="pkg_lv4_qty"/></pkg_lv4_qty> 
				<lv1_cbm><bean:write name="WHItemCodeInfo" property="lv1_cbm"/></lv1_cbm> 
				<lv1_cbf><bean:write name="WHItemCodeInfo" property="lv1_cbf"/></lv1_cbf> 
				<lv1_grs_kgs><bean:write name="WHItemCodeInfo" property="lv1_grs_kgs"/></lv1_grs_kgs> 
				<lv1_grs_lbs><bean:write name="WHItemCodeInfo" property="lv1_grs_lbs"/></lv1_grs_lbs> 
				<lv1_net_kgs><bean:write name="WHItemCodeInfo" property="lv1_net_kgs"/></lv1_net_kgs> 
				<lv1_net_lbs><bean:write name="WHItemCodeInfo" property="lv1_net_lbs"/></lv1_net_lbs> 
				<item_remark><bean:write name="WHItemCodeInfo" property="item_remark"/></item_remark> 
				<pkg_info><bean:write name="WHItemCodeInfo" property="pkg_info"/></pkg_info> 
				<unit_curr_cd><bean:write name="WHItemCodeInfo" property="unit_curr_cd"/></unit_curr_cd> 
				<unit_price><bean:write name="WHItemCodeInfo" property="unit_price"/></unit_price> 
				<pkg_pl_std_qty><bean:write name="WHItemCodeInfo" property="pkg_pl_std_qty"/></pkg_pl_std_qty> 
				<pkg_pl_over_wgt><bean:write name="WHItemCodeInfo" property="pkg_pl_over_wgt"/></pkg_pl_over_wgt> 
				<item_grp_cd_include_yn><bean:write name="WHItemCodeInfo" property="item_grp_cd_include_yn"/></item_grp_cd_include_yn> 
				<item_grp_cd><bean:write name="WHItemCodeInfo" property="item_grp_cd"/></item_grp_cd> 
				<exception_msg><bean:write name="WHItemCodeInfo" property="exception_msg"/></exception_msg> 
				<user_id><bean:write name="WHItemCodeInfo" property="user_id"/></user_id> 
				<org_cd><bean:write name="WHItemCodeInfo" property="org_cd"/></org_cd> 
				<rtncd><bean:write name="WHItemCodeInfo" property="rtncd"/></rtncd> 
				<rtnmsg><bean:write name="WHItemCodeInfo" property="rtnmsg"/></rtnmsg>
			</WHITEMCODEINFO>
			</logic:notEmpty>
			
			<%-- searchPutawayEaQty --%>
			
			<logic:empty name="mapVal" property="PutawayEaQty">
				<PUTAWAYEAQTY></PUTAWAYEAQTY>
			</logic:empty>
			
			<logic:notEmpty name="mapVal" property="PutawayEaQty">
				<bean:define id="PutawayEaQty" name="mapVal" property="PutawayEaQty"/>
				
				<PUTAWAYEAQTY>
					<putaway_pkgunit><bean:write name="PutawayEaQty" property="putaway_pkgunit"/></putaway_pkgunit>
					<putaway_pkgqty><bean:write name="PutawayEaQty" property="putaway_pkgqty"/></putaway_pkgqty>
					<ctrt_no><bean:write name="PutawayEaQty" property="ctrt_no"/></ctrt_no>
					<item_sys_no><bean:write name="PutawayEaQty" property="item_sys_no"/></item_sys_no>
					<os><bean:write name="PutawayEaQty" property="os"/></os>
					<lvl1_unit><bean:write name="PutawayEaQty" property="lvl1_unit"/></lvl1_unit>
					<lvl1_qty><bean:write name="PutawayEaQty" property="lvl1_qty"/></lvl1_qty>
					<lvl2_unit><bean:write name="PutawayEaQty" property="lvl2_unit"/></lvl2_unit>
					<lvl2_qty><bean:write name="PutawayEaQty" property="lvl2_qty"/></lvl2_qty>
					<lvl3_unit><bean:write name="PutawayEaQty" property="lvl3_unit"/></lvl3_unit>
					<lvl3_qty><bean:write name="PutawayEaQty" property="lvl3_qty"/></lvl3_qty>
					<lvl4_unit><bean:write name="PutawayEaQty" property="lvl2_unit"/></lvl4_unit>
					<lvl4_qty><bean:write name="PutawayEaQty" property="lvl2_unit"/></lvl4_qty>
					<suYn><bean:write name="PutawayEaQty" property="suYn"/></suYn>
					<putaway_ea_qty><bean:write name="PutawayEaQty" property="putaway_ea_qty"/></putaway_ea_qty>
					<suValue><bean:write name="PutawayEaQty" property="suValue"/></suValue>
				</PUTAWAYEAQTY>
			</logic:notEmpty>
			
			<%--Save Resutl--%>
			
			<logic:notEmpty name="mapVal" property="saveMess1">
				<saveMess1><bean:write name="mapVal" property="saveMess1"/></saveMess1>
				<saveMess2><bean:write name="mapVal" property="saveMess2"/></saveMess2>
			</logic:notEmpty>
			
			<%--cancelWHOutbkInfo--%>
			
			<logic:empty name="mapVal" property="CANCELWHOUTBKINFO">
				<CANCELWHOUTBKINFO></CANCELWHOUTBKINFO>
			</logic:empty>
			
			<logic:notEmpty name="mapVal" property="CANCELWHOUTBKINFO">
				<bean:define id="CANCELWHOUTBKINFO" name="mapVal" property="CANCELWHOUTBKINFO"/>
				
				<CANCELWHOUTBKINFO>
					<rtncd><bean:write name="CANCELWHOUTBKINFO" property="rtncd"/></rtncd>
					<rtnmsg><bean:write name="CANCELWHOUTBKINFO" property="rtnmsg"/></rtnmsg>
					
				</CANCELWHOUTBKINFO>
				
			</logic:notEmpty>
			
			<%--callReinstateWHOutbk--%>
			
			<logic:empty name="mapVal" property="CALLREINSTATEWHOUTBK">
				<CALLREINSTATEWHOUTBK></CALLREINSTATEWHOUTBK>
			</logic:empty>
			
			<logic:notEmpty name="mapVal" property="CALLREINSTATEWHOUTBK">
				<bean:define id="CALLREINSTATEWHOUTBK" name="mapVal" property="CALLREINSTATEWHOUTBK"/>
				
				<CALLREINSTATEWHOUTBK>
					<rtncd><bean:write name="CALLREINSTATEWHOUTBK" property="rtncd"/></rtncd>
					<rtnmsg><bean:write name="CALLREINSTATEWHOUTBK" property="rtnmsg"/></rtnmsg>
					<message><bean:write name="mapVal" property="message"/></message>
					
				</CALLREINSTATEWHOUTBK>
				
			</logic:notEmpty>
			
		</COMON>
	</logic:notEmpty>
</logic:empty>
<%-- 오류발생 --%> 
<logic:notEmpty name="com.clt.framework.core.comm.EXCEPTION_OBJECT      ">
	<ERROR>
		<MESSAGE><![CDATA[ <bean:message name="com.clt.framework.core.comm.EXCEPTION_OBJECT      " property="message"/>]]> </MESSAGE>
	</ERROR>
</logic:notEmpty>
