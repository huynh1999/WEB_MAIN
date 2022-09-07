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
	<logic:empty name="EventResponse" property="listVal">
		<SHEET>
			<DATA TOTAL="0"></DATA>
		</SHEET>	
	</logic:empty>
	<logic:notEmpty name="EventResponse" property="listVal">
		<bean:define id="rowSet" name="EventResponse" property="listVal"/>
		<SHEET>
			<DATA TOTAL="1">
			<logic:iterate id="rowSheet3" name="rowSet">
	            <tr>
					<TD><bean:write name="rowSheet3" property="ibflag"/></TD>			
					<TD><bean:write name="rowSheet3" property="strg_sys_no"/></TD>  		
					<TD><bean:write name="rowSheet3" property="strg_cd"/></TD>  		
					<TD><bean:write name="rowSheet3" property="item_cd"/></TD>  			
					<TD><bean:write name="rowSheet3" property="item_nm"/></TD>   		
					<TD><bean:write name="rowSheet3" property="item_pkgunit"/></TD> 		
					<TD><bean:write name="rowSheet3" property="item_pkgqty"/></TD>   	
					<TD><bean:write name="rowSheet3" property="item_ea_qty"/></TD>   	
					<TD><bean:write name="rowSheet3" property="allc_sum_ea_qty"/></TD>   
					<TD><bean:write name="rowSheet3" property="un_alloc_ea_qty"/></TD> 	
					<TD><bean:write name="rowSheet3" property="chk"/></TD>   				
					<TD><bean:write name="rowSheet3" property="wh_loc_cd_nm"/></TD>   	
					<TD><bean:write name="rowSheet3" property="allc_item_ea_qty"/></TD>   			
					<TD></TD>   			
					<TD><bean:write name="rowSheet3" property="pick_item_ea_qty"/></TD>   			
					<TD></TD>   			
					<TD><bean:write name="rowSheet3" property="ship_item_ea_qty"/></TD>   			
					<TD><bean:write name="rowSheet3" property="outbound_dt"/></TD>   			
					<TD><bean:write name="rowSheet3" property="out_pe_qty"/></TD>   			
					<TD><bean:write name="rowSheet3" property="lot_no"/></TD>  
					<TD><bean:write name="rowSheet3" property="lot_04"/></TD>			
					<TD><bean:write name="rowSheet3" property="lot_05"/></TD>			
					<TD><bean:write name="rowSheet3" property="exp_dt"/></TD>			
					<TD><bean:write name="rowSheet3" property="lot_id"/></TD>			
					<TD><bean:write name="rowSheet3" property="lic_plat_no"/></TD>   			
					<TD><bean:write name="rowSheet3" property="inbound_dt"/></TD>		
					<TD><bean:write name="rowSheet3" property="po_no_in"/></TD>			
					<TD><bean:write name="rowSheet3" property="wob_bk_no_org"/></TD>			
					<TD><bean:write name="rowSheet3" property="sao_sys_no"/></TD>			
					<TD><bean:write name="rowSheet3" property="item_sys_no"/></TD>			
					<TD><bean:write name="rowSheet3" property="item_seq"/></TD>			
					<TD><bean:write name="rowSheet3" property="pickd_flg"/></TD>   			
					<TD><bean:write name="rowSheet3" property="bk_sts_cd"/></TD>   			
					<TD><bean:write name="rowSheet3" property="lp_cnt"/></TD>   			
					<TD><!-- allc_cnt --></TD>   			
					<TD><bean:write name="rowSheet3" property="item_cbm"/></TD>   			
					<TD><bean:write name="rowSheet3" property="item_cbf"/></TD>   			
					<TD><bean:write name="rowSheet3" property="item_grs_kgs"/></TD>   			
					<TD><bean:write name="rowSheet3" property="item_grs_lbs"/></TD>   			
					<TD><bean:write name="rowSheet3" property="item_net_kgs"/></TD>   			
					<TD><bean:write name="rowSheet3" property="item_net_lbs"/></TD>   			
					<TD><bean:write name="rowSheet3" property="walc_no"/></TD>   			
					<TD><bean:write name="rowSheet3" property="wib_bk_no"/></TD>   			
					<TD><bean:write name="rowSheet3" property="po_sys_no"/></TD>   			
					<TD><bean:write name="rowSheet3" property="wh_loc_cd"/></TD>   			
					<TD><bean:write name="rowSheet3" property="cust_ord_no"/></TD>   			
					<TD><bean:write name="rowSheet3" property="ord_tp_nm"/></TD>   			
					<TD><bean:write name="rowSheet3" property="bk_sts_nm"/></TD>   			
					<TD><bean:write name="rowSheet3" property="allc_merge_key"/></TD>   			
					<TD><bean:write name="rowSheet3" property="rn"/></TD>   			
					<TD><bean:write name="rowSheet3" property="load_plan_item_ea_qty"/></TD>   			
					<TD><bean:write name="rowSheet3" property="est_out_dt"/></TD>   			
					<TD><!-- dlv_ord_no --></TD>   			
					<TD><!-- tro_sts_nm --></TD>   			
					<TD><bean:write name="rowSheet3" property="eq_tpsz_cd"/></TD>   			
					<TD><!-- eq_tp_cd --></TD>   			
					<TD><bean:write name="rowSheet3" property="eq_no"/></TD>   			
					<TD><bean:write name="rowSheet3" property="seal_no"/></TD>   			
					<TD><bean:write name="rowSheet3" property="trucker_cd"/></TD>   			
					<TD><bean:write name="rowSheet3" property="trucker_nm"/></TD>   			
					<TD><bean:write name="rowSheet3" property="ctrt_no"/></TD>   			
					<TD><bean:write name="rowSheet3" property="ctrt_nm"/></TD>   			
					<TD><bean:write name="rowSheet3" property="wh_cd"/></TD>   			
					<TD>0</TD>   			
					<TD><bean:write name="rowSheet3" property="bk_sts_cd_grp"/></TD>   			
					<TD><bean:write name="rowSheet3" property="pkg_lv1_qty"/></TD>   			
					<TD><bean:write name="rowSheet3" property="lv1_cbm"/></TD>   			
					<TD><bean:write name="rowSheet3" property="lv1_cbf"/></TD>   			
					<TD><bean:write name="rowSheet3" property="lv1_grs_kgs"/></TD>   			
					<TD><bean:write name="rowSheet3" property="lv1_grs_lbs"/></TD>   			
					<TD><bean:write name="rowSheet3" property="lv1_net_kgs"/></TD>   			
					<TD><bean:write name="rowSheet3" property="lv1_net_lbs"/></TD>   			
					<TD><bean:write name="rowSheet3" property="pe_qty"/></TD>   			
					<TD><bean:write name="rowSheet3" property="consol_no"/></TD>   			
					<TD><bean:write name="rowSheet3" property="shipno"/></TD>   			
					<TD><bean:write name="rowSheet3" property="shipno_seq"/></TD>   			
					<TD><bean:write name="rowSheet3" property="lp_id"/></TD>   			
					<TD><bean:write name="rowSheet3" property="lp_seq"/></TD>   			
					<TD><bean:write name="rowSheet3" property="tro_flg"/></TD>   			
					<TD><bean:write name="rowSheet3" property="dlv_ord_no_org"/></TD>   			
					<TD><bean:write name="rowSheet3" property="tro_seq"/></TD>   			
					<TD><bean:write name="rowSheet3" property="wob_bk_no"/></TD> 
					<TD><bean:write name="rowSheet3" property="pick_item_ea_qty"/></TD>   			
					<TD><bean:write name="rowSheet3" property="ship_item_ea_qty"/></TD>  			
					<TD><bean:write name="rowSheet3" property="lp_no"/></TD>  			
					<TD><bean:write name="rowSheet3" property="item_ser_no"/></TD>  			
	            </tr>
			</logic:iterate>
			</DATA>
		</SHEET>
	</logic:notEmpty>
</logic:empty>
<%-- 오류발생 --%>
<logic:notEmpty name="com.clt.framework.core.comm.EXCEPTION_OBJECT      ">
	<ERROR>
		<MESSAGE><![CDATA[ <bean:write name="com.clt.framework.core.comm.EXCEPTION_OBJECT      " property="message"/>]]> </MESSAGE>
	</ERROR>
</logic:notEmpty>
