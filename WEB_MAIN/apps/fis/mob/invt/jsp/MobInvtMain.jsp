<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<!-- 공통 Header -->
<%@include file="./../../../../../../syscommon/header/CLTMobHeader.jsp"%>

<div class="btn-group btn-group-justified list" role="group" aria-label="...">

	<!-- #2451 [WMS4.0]MOBILE - Inventory Search by Item/Serial/LP# 기능 추가 (S) -->
	<div class="btn-group btn-group-lg">
		<div class="item" role="group">
			<button type="button" class="btn btn-default active" onClick="javascript:wmsCommonJS.goPage('MobInvtSrch.clt');">
			<span>
				Inventory<br/>Search
			</span>
			</button>
		</div>
	</div>
	<!-- #2451 [WMS4.0]MOBILE - Inventory Search by Item/Serial/LP# 기능 추가 (E) -->

	<div class="btn-group btn-group-lg">
		<div class="item" role="group">
			<button type="button" class="btn btn-default active" onClick="javascript:wmsCommonJS.goPage('MobInvMoveSrch.clt');">
			<span>
				Movement
			</span>
			</button>
		</div>
	</div>

</div>