<%--
=========================================================
*Copyright(c) 2009 CyberLogitec. All Rights Reserved.
=========================================================
=========================================================
*@FileName   : AII_BMD_0020.jsp
*@FileTitle  : 항공 수입 HGBL등록
*@Description: HBL 등록 및 조회
*@author     : Kang,Jung-Gu
*@version    : 1.0 - 09/28/2009
*@since      :

*@Change history:
*@author     : Tuan.Chau
*@version    : 2.0 - 2014/07/15
=========================================================
--%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

	<div class="opus_design_grid">
		<h3 class="title_design mar_btm_8"><bean:message key="Work_Order_List"/></h3>
		<div class="opus_design_btn">
			<span id="goWoObj" style="display:none;">
				<button type="button" class="btn_normal" onClick="doWork('WORKORDER')"><bean:message key="WorkOrder"/></button>
			</span>
		</div>
		<div id="mainTable"><script language="javascript">comSheetObject('sheet15');</script></div>		
	</div>
