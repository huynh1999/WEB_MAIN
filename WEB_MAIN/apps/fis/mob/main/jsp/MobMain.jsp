<!-- 공통 Header -->
<%@include file="./../../../../../../syscommon/header/CLTMobHeader.jsp"%>
<div class="btn-group btn-group-justified list" role="group" aria-label="...">
	<div class="btn-group btn-group-lg">
		<div class="item ico_set ico_set01" role="group">
			<button onClick="javascript:wmsCommonJS.goPage('MobWHInMain.clt');" type="button" class="btn btn-default">
			<span>
				Inbound
			</span>
			</button>
		</div>
	</div>
	<div class="btn-group btn-group-lg">
		<div class="item ico_set ico_set02" role="group">
			<button onClick="javascript:wmsCommonJS.goPage('MobWHOutMain.clt');" type="button" class="btn btn-default">
			<span>
				Outbound
			</span>
			</button>
		</div>
	</div>
	<div class="btn-group btn-group-lg">
		<div class="item ico_set ico_set03" role="group">
			<button onClick="javascript:wmsCommonJS.goPage('MobInvMain.clt');" type="button" class="btn btn-default">
			<span>
				Inventory
			</span>
			</button>
		</div>
	</div>
</div>