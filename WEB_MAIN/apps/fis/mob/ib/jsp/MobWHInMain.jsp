<!-- 공통 Header -->
<%@include file="./../../../../../../syscommon/header/CLTMobHeader.jsp"%>
<div class="btn-group btn-group-justified list" role="group" aria-label="...">
	<div class="btn-group btn-group-lg">
		<div class="item" role="group">
			<button type="button" class="btn btn-default active" onClick="javascript:wmsCommonJS.goPage('MobWHInSrch.clt');">
			<span>
				Inbound Complete
			</span>
			</button>
		</div>
	</div>
	<div class="btn-group btn-group-lg">
		<div class="item" role="group">
			<button type="button" class="btn btn-default active" onClick="javascript:wmsCommonJS.goPage('MobWHInPtawySrch.clt');">
			<span>
				Putaway
			</span>
			</button>
		</div>
	</div>
</div>