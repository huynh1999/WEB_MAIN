<%--
=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
=========================================================
*@FileName   : WaveSmpMgmtGS.jsp
*@FileTitle  : 
*@Description: 
*@author     : Tien.Duong
*@version    : 1.0
*@since      : 2016/05/04

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
				
				<%-- Wave Form --%>
				<logic:notEmpty name="rowSet" property="header">
 					<bean:define id="rowSetField" name="rowSet" property="header"/>
					<FIELD>
						<DATA TOTAL="1">
							<logic:iterate id="rowField" name="rowSetField">
								<wave_no><bean:write name="rowField" property="wave_no"/></wave_no>
								<wh_cd><bean:write name="rowField" property="wh_cd"/></wh_cd>	
								<wave_rgst_dt><bean:write name="rowField" property="wave_rgst_dt"/></wave_rgst_dt>
								<rmk><bean:write name="rowField" property="rmk"/></rmk>
								<pick_dt><bean:write name="rowField" property="pick_dt"/></pick_dt>
								<pick_hm_fr><bean:write name="rowField" property="pick_hm_fr"/></pick_hm_fr>
								<pick_hm_to><bean:write name="rowField" property="pick_hm_to"/></pick_hm_to>
								<outbound_dt><bean:write name="rowField" property="outbound_dt"/></outbound_dt> 
								<outbound_hm_fr><bean:write name="rowField" property="outbound_hm_fr"/></outbound_hm_fr>
								<outbound_hm_to><bean:write name="rowField" property="outbound_hm_to"/></outbound_hm_to>
								<consol_no><bean:write name="rowField" property="consol_no"/></consol_no>	
								<pick_sht_yn><bean:write name="rowField" property="pick_sht_yn"/></pick_sht_yn>
								<tro_no><bean:write name="rowField" property="tro_no"/></tro_no>
								<src_cd><bean:write name="rowField" property="src_cd"/></src_cd>
							</logic:iterate>
						</DATA>
					</FIELD>
				</logic:notEmpty>
				
				<%-- Tab2. Wave tab - order list --%>
				<logic:notEmpty name="rowSet" property="orderlist">
 					<bean:define id="rowSetSheet2" name="rowSet" property="orderlist"/>
					<SHEET2>
						<DATA>
							<logic:iterate id="rowSheet2" name="rowSetSheet2">
								<tr>
									<TD></TD>
									<TD></TD> 	
									<TD></TD>  		
									<TD><bean:write name="rowSheet2" property="cust_ord_no"/></TD>
									<TD><bean:write name="rowSheet2" property="bk_sts_nm"/></TD> 
									<TD><bean:write name="rowSheet2" property="est_out_dt"/></TD>
									<TD><bean:write name="rowSheet2" property="ship_to"/></TD>   
									<TD><bean:write name="rowSheet2" property="ctrt_no"/></TD>  	
									<TD><bean:write name="rowSheet2" property="ctrt_nm"/></TD>   
									<TD><bean:write name="rowSheet2" property="wob_bk_no"/></TD> 
									<TD><bean:write name="rowSheet2" property="bk_date"/></TD>   
									<TD><bean:write name="rowSheet2" property="wh_cd"/></TD>   	
									<TD><bean:write name="rowSheet2" property="wh_nm"/></TD>   	
									<TD><bean:write name="rowSheet2" property="bk_sts_cd"/></TD> 
									<TD><bean:write name="rowSheet2" property="wave_no"/></TD>   
									<TD><bean:write name="rowSheet2" property="walc_no"/></TD>   
									<TD><bean:write name="rowSheet2" property="issu_cnt"/></TD>  
									<TD><bean:write name="rowSheet2" property="lp_cnt"/></TD>   	
									<TD><bean:write name="rowSheet2" property="allc_cnt"/></TD>	
									<TD><bean:write name="rowSheet2" property="pickd_cnt"/></TD>	
									<TD><bean:write name="rowSheet2" property="buyer_cd"/></TD>
					            </tr>
							</logic:iterate>
						</DATA>
					</SHEET2>
				</logic:notEmpty>
				<%-- Tab2. Wave tab - SKU List --%>
				<logic:notEmpty name="rowSet" property="skulist">
 					<bean:define id="rowSetSheet3" name="rowSet" property="skulist"/>
					<SHEET3>
						<DATA>
							<logic:iterate id="rowSheet3" name="rowSetSheet3">
								<tr>
									<TD><bean:write name="rowSheet3" property="wob_bk_no_org"/></TD> 	
									<TD><bean:write name="rowSheet3" property="item_sys_no"/></TD>  		
									<TD><bean:write name="rowSheet3" property="item_seq"/></TD> 			
									<TD><bean:write name="rowSheet3" property="manual_alloc_img"/></TD> 	
									<TD><bean:write name="rowSheet3" property="strg_sys_no"/></TD>  		
									<TD><bean:write name="rowSheet3" property="cust_ord_no"/></TD>   	
									<TD><bean:write name="rowSheet3" property="item_cd"/></TD>  			
									<TD><bean:write name="rowSheet3" property="item_nm"/></TD>   		
									<TD><bean:write name="rowSheet3" property="item_pkgunit"/></TD> 		
									<TD><bean:write name="rowSheet3" property="item_pkgqty"/></TD>   	
									<TD><bean:write name="rowSheet3" property="item_ea_qty"/></TD>   	
									<TD><bean:write name="rowSheet3" property="allc_sum_ea_qty"/></TD>   
									<TD><bean:write name="rowSheet3" property="un_alloc_ea_qty"/></TD> 	
									<TD><bean:write name="rowSheet3" property="rn"/></TD>   				
									<TD><bean:write name="rowSheet3" property="lot_no"/></TD>   			
									<TD><bean:write name="rowSheet3" property="wh_loc_cd_nm"/></TD>   	
									<TD><bean:write name="rowSheet3" property="chk"/></TD>   			
									<TD><bean:write name="rowSheet3" property="allc_item_ea_qty"/></TD>	
									<TD><bean:write name="rowSheet3" property="item_cbm"/></TD>			
									<TD><bean:write name="rowSheet3" property="item_cbf"/></TD>			
									<TD><bean:write name="rowSheet3" property="item_grs_kgs"/></TD>		
									<TD><bean:write name="rowSheet3" property="item_grs_lbs"/></TD>		
									<TD><bean:write name="rowSheet3" property="item_net_kgs"/></TD>		
									<TD><bean:write name="rowSheet3" property="item_net_lbs"/></TD>		
									<TD><bean:write name="rowSheet3" property="wob_bk_no"/></TD>			
									<TD><bean:write name="rowSheet3" property="wib_bk_no"/></TD>			
									<TD><bean:write name="rowSheet3" property="inbound_dt"/></TD>		
									<TD><bean:write name="rowSheet3" property="po_no_in"/></TD>			
									<TD><bean:write name="rowSheet3" property="lot_id"/></TD>			
									<TD><bean:write name="rowSheet3" property="exp_dt"/></TD>			
									<TD><bean:write name="rowSheet3" property="lot_04"/></TD>			
									<TD><bean:write name="rowSheet3" property="lot_05"/></TD>			
									<TD><bean:write name="rowSheet3" property="ibflag"/></TD>			
									<TD><bean:write name="rowSheet3" property="walc_no"/></TD>			
									<TD><bean:write name="rowSheet3" property="sao_sys_no"/></TD>		
									<TD><bean:write name="rowSheet3" property="po_sys_no"/></TD>			
									<TD><bean:write name="rowSheet3" property="wh_loc_cd"/></TD>			
									<TD><bean:write name="rowSheet3" property="rum"/></TD>				
									<TD><bean:write name="rowSheet3" property="lp_cnt"/></TD>			
									<TD><bean:write name="rowSheet3" property="bk_sts_cd"/></TD>
					            </tr>
							</logic:iterate>
						</DATA>
					</SHEET3>
				</logic:notEmpty>
				<%-- Tab3. Allocation list --%>
				<logic:notEmpty name="rowSet" property="allocationlist">
 					<bean:define id="rowSetSheet4" name="rowSet" property="allocationlist"/>
					<SHEET4>
						<DATA>
							<logic:iterate id="rowSheet4" name="rowSetSheet4">
								<tr> 		
									<TD><bean:write name="rowSheet4" property="wob_bk_no_org"/></TD> 		
									<TD></TD>  				
									<TD><bean:write name="rowSheet4" property="cust_ord_no"/></TD> 			
									<TD><bean:write name="rowSheet4" property="ord_tp_nm"/></TD> 			
									<TD><bean:write name="rowSheet4" property="bk_sts_nm"/></TD>  			
									<TD><bean:write name="rowSheet4" property="item_sys_no"/></TD>   		
									<TD><bean:write name="rowSheet4" property="item_seq"/></TD>  			
									<TD><bean:write name="rowSheet4" property="item_cd"/></TD>   			
									<TD><bean:write name="rowSheet4" property="item_nm"/></TD> 				
									<TD><bean:write name="rowSheet4" property="allc_merge_key"/></TD>   		
									<TD><bean:write name="rowSheet4" property="lot_no"/></TD>   				
									<TD><bean:write name="rowSheet4" property="wh_loc_cd_nm"/></TD>   		
									<TD><bean:write name="rowSheet4" property="allc_item_ea_qty"/></TD> 		
									<TD></TD>   				
									<TD><bean:write name="rowSheet4" property="pick_item_ea_qty"/></TD>   	
									<TD><bean:write name="rowSheet4" property="rn"/></TD>   					
									<TD><bean:write name="rowSheet4" property="load_plan_item_ea_qty"/></TD> 
									<TD><bean:write name="rowSheet4" property="ship_item_ea_qty"/></TD>		
									<TD><bean:write name="rowSheet4" property="est_out_dt"/></TD>			
									<TD><bean:write name="rowSheet4" property="outbound_dt"/></TD>			
									<TD><bean:write name="rowSheet4" property="out_pe_qty"/></TD>			
									<TD><bean:write name="rowSheet4" property="dlv_ord_no"/></TD>			
									<TD><bean:write name="rowSheet4" property="tro_sts_nm"/></TD>			
									<TD><bean:write name="rowSheet4" property="eq_tpsz_cd"/></TD>			
									<TD><bean:write name="rowSheet4" property="eq_tp_cd"/></TD>				
									<TD><bean:write name="rowSheet4" property="eq_no"/></TD>					
									<TD><bean:write name="rowSheet4" property="seal_no"/></TD>				
									<TD><bean:write name="rowSheet4" property="trucker_cd"/></TD>			
									<TD><bean:write name="rowSheet4" property="trucker_nm"/></TD>			
									<TD><bean:write name="rowSheet4" property="item_cbm"/></TD>				
									<TD><bean:write name="rowSheet4" property="item_cbf"/></TD>				
									<TD><bean:write name="rowSheet4" property="item_grs_kgs"/></TD>			
									<TD><bean:write name="rowSheet4" property="item_grs_lbs"/></TD>			
									<TD><bean:write name="rowSheet4" property="item_net_kgs"/></TD>			
									<TD><bean:write name="rowSheet4" property="item_net_lbs"/></TD>			
									<TD><bean:write name="rowSheet4" property="wib_bk_no"/></TD>				
									<TD><bean:write name="rowSheet4" property="inbound_dt"/></TD>			
									<TD><bean:write name="rowSheet4" property="po_no_in"/></TD>				
									<TD><bean:write name="rowSheet4" property="lot_id"/></TD>				
									<TD><bean:write name="rowSheet4" property="exp_dt"/></TD>				
									<TD><bean:write name="rowSheet4" property="lot_04"/></TD>				
									<TD><bean:write name="rowSheet4" property="lot_05"/></TD>				
									<TD><bean:write name="rowSheet4" property="wob_bk_no"/></TD>				
									<TD><bean:write name="rowSheet4" property="ctrt_no"/></TD>				
									<TD><bean:write name="rowSheet4" property="ctrt_nm"/></TD>				
									<TD><bean:write name="rowSheet4" property="wh_cd"/></TD>					
									<TD></TD>				
									<TD><bean:write name="rowSheet4" property="walc_no"/></TD>				
									<TD><bean:write name="rowSheet4" property="sao_sys_no"/></TD>			
									<TD><bean:write name="rowSheet4" property="po_sys_no"/></TD>				
									<TD><bean:write name="rowSheet4" property="wh_loc_cd"/></TD>				
									<TD><bean:write name="rowSheet4" property="issu_cnt"/></TD>				
									<TD><bean:write name="rowSheet4" property="lp_cnt"/></TD>				
									<TD><bean:write name="rowSheet4" property="bk_sts_cd"/></TD>				
									<TD><bean:write name="rowSheet4" property="bk_sts_cd_grp"/></TD>			
									<TD><bean:write name="rowSheet4" property="pkg_lv1_qty"/></TD>			
									<TD><bean:write name="rowSheet4" property="lv1_cbm"/></TD>				
									<TD><bean:write name="rowSheet4" property="lv1_cbf"/></TD>				
									<TD><bean:write name="rowSheet4" property="lv1_grs_kgs"/></TD>			
									<TD><bean:write name="rowSheet4" property="lv1_grs_lbs"/></TD>			
									<TD><bean:write name="rowSheet4" property="lv1_net_kgs"/></TD>			
									<TD><bean:write name="rowSheet4" property="lv1_net_lbs"/></TD>			
									<TD><bean:write name="rowSheet4" property="pe_qty"/></TD>				
									<TD><bean:write name="rowSheet4" property="pickd_flg"/></TD>				
									<TD><bean:write name="rowSheet4" property="lp_no"/></TD>					
									<TD><bean:write name="rowSheet4" property="consol_no"/></TD>				
									<TD><bean:write name="rowSheet4" property="shipno"/></TD>				
									<TD><bean:write name="rowSheet4" property="shipno_seq"/></TD>			
									<TD><bean:write name="rowSheet4" property="lp_id"/></TD>					
									<TD><bean:write name="rowSheet4" property="lp_seq"/></TD>				
									<TD><bean:write name="rowSheet4" property="tro_flg"/></TD>				
									<TD><bean:write name="rowSheet4" property="dlv_ord_no_org"/></TD>		
									<TD><bean:write name="rowSheet4" property="tro_seq"/></TD>
					            </tr>
							</logic:iterate>
						</DATA>
					</SHEET4>
				</logic:notEmpty>
				<%-- Tab3. Un-allocated list --%>
				<logic:notEmpty name="rowSet" property="unallocatedlist">
 					<bean:define id="rowSetSheet5" name="rowSet" property="unallocatedlist"/>
					<SHEET5>
						<DATA>
							<logic:iterate id="rowSheet5" name="rowSetSheet5">
								<tr> 		
									<TD><bean:write name="rowSheet5" property="wob_bk_no_org"/></TD> 	
									<TD><bean:write name="rowSheet5" property="item_sys_no"/></TD>  		
									<TD><bean:write name="rowSheet5" property="item_seq"/></TD> 			
									<TD><bean:write name="rowSheet5" property="manual_alloc_img"/></TD> 	
									<TD><bean:write name="rowSheet5" property="strg_sys_no"/></TD>  		
									<TD><bean:write name="rowSheet5" property="cust_ord_no"/></TD>   	
									<TD><bean:write name="rowSheet5" property="item_cd"/></TD>  			
									<TD><bean:write name="rowSheet5" property="item_nm"/></TD>  			
									<TD><bean:write name="rowSheet5" property="item_pkgunit"/></TD>  	
									<TD><bean:write name="rowSheet5" property="item_pkgqty"/></TD>  		
									<TD><bean:write name="rowSheet5" property="item_ea_qty"/></TD>  		
									<TD><bean:write name="rowSheet5" property="allc_sum_ea_qty"/></TD>  	
									<TD><bean:write name="rowSheet5" property="un_alloc_ea_qty"/></TD>  	
									<TD><bean:write name="rowSheet5" property="stock_qty"/></TD>  		
									<TD><bean:write name="rowSheet5" property="rn"/></TD>  				
									<TD><bean:write name="rowSheet5" property="lot_no"/></TD>  			
									<TD><bean:write name="rowSheet5" property="wh_loc_cd_nm"/></TD>  	
									<TD><bean:write name="rowSheet5" property="allc_item_ea_qty"/></TD>  
									<TD><bean:write name="rowSheet5" property="item_cbm"/></TD>  		
									<TD><bean:write name="rowSheet5" property="item_cbf"/></TD>  		
									<TD><bean:write name="rowSheet5" property="item_grs_kgs"/></TD>  	
									<TD><bean:write name="rowSheet5" property="item_grs_lbs"/></TD>  	
									<TD><bean:write name="rowSheet5" property="item_net_kgs"/></TD>  	
									<TD><bean:write name="rowSheet5" property="item_net_lbs"/></TD>  	
									<TD><bean:write name="rowSheet5" property="wob_bk_no"/></TD>  		
									<TD><bean:write name="rowSheet5" property="wib_bk_no"/></TD>  		
									<TD><bean:write name="rowSheet5" property="inbound_dt"/></TD>  		
									<TD><bean:write name="rowSheet5" property="po_no_in"/></TD>  		
									<TD><bean:write name="rowSheet5" property="lot_id"/></TD>  			
									<TD><bean:write name="rowSheet5" property="exp_dt"/></TD>  			
									<TD><bean:write name="rowSheet5" property="lot_04"/></TD>   			
									<TD><bean:write name="rowSheet5" property="lot_05"/></TD>   			
									<TD></TD> 			
									<TD><bean:write name="rowSheet5" property="walc_no"/></TD> 			
									<TD><bean:write name="rowSheet5" property="sao_sys_no"/></TD> 		
									<TD><bean:write name="rowSheet5" property="po_sys_no"/></TD> 		
									<TD><bean:write name="rowSheet5" property="wh_loc_cd"/></TD> 		
									<TD><bean:write name="rowSheet5" property="rum"/></TD>   			
									<TD><bean:write name="rowSheet5" property="lp_cnt"/></TD> 
					            </tr>
							</logic:iterate>
						</DATA>
					</SHEET5>
				</logic:notEmpty>
				<%-- Tab3. Outbound summary --%>
				<logic:notEmpty name="rowSet" property="outboundsummary">
 					<bean:define id="rowSetSheet6" name="rowSet" property="outboundsummary"/>
					<SHEET6>
						<DATA>
						<logic:iterate id="rowSheet6" name="rowSetSheet6">
							<tr> 		
								<TD><bean:write name="rowSheet6" property="cust_ord_no"/></TD> 		
								<TD><bean:write name="rowSheet6" property="outbound_pl_qty"/></TD>  	
								<TD><bean:write name="rowSheet6" property="outbound_bx_qty"/></TD> 	
								<TD><bean:write name="rowSheet6" property="outbound_ea_qty"/></TD> 	
								<TD><bean:write name="rowSheet6" property="outbound_sqft"/></TD>  	
								<TD><bean:write name="rowSheet6" property="outbound_cbm"/></TD>   	
								<TD><bean:write name="rowSheet6" property="outbound_grs_kgs"/></TD>  
								<TD><bean:write name="rowSheet6" property="outbound_net_kgs"/></TD>  
								<TD></TD> 			
								<TD><bean:write name="rowSheet6" property="wob_bk_no"/></TD>   		
								<TD><bean:write name="rowSheet6" property="wh_cd"/></TD>
				            </tr>
						</logic:iterate>
						</DATA>
					</SHEET6>
				</logic:notEmpty>
			</logic:notEmpty>
</logic:empty>
<%-- 오류발생 --%>
<logic:notEmpty name="com.clt.framework.core.comm.EXCEPTION_OBJECT      ">
	<ERROR>
		<MESSAGE><![CDATA[ <bean:write name="com.clt.framework.core.comm.EXCEPTION_OBJECT      " property="message"/>]]> </MESSAGE>
	</ERROR>
</logic:notEmpty>
