<!-- 공통 Header -->
<%@include file="./../../../../../../syscommon/header/CLTMobHeader.jsp"%>
<div class="panel panel-default">
	<div class="panel-body title-align-center">
		SDKANG / LA Warehouse
	</div>
</div>
	<form class="form-horizontal">
		<div class="well">
			<div class="row form-group form-margin-bottom">
				<label for="orderLineId" class="form-title">Warehouse</label>
				<div class="col-xs-7 form-padding-0">
					<select class="form-control">
						<option>A CDC</option>
						<option>2</option>
						<option>3</option>
						<option>4</option>
						<option>5</option>
					</select>
				</div>
			</div>
			<div class="form-group form-margin-bottom">
				<label for="orderLineId" class="form-title">Language</label>
				<div class="col-xs-7 form-padding-0">
					<select class="form-control">
						<option>English</option>
						<option>2</option>
						<option>3</option>
						<option>4</option>
						<option>5</option>
					</select>
				</div>
			</div>
		</div>
		<div class="btn-group btn-group-justified" role="group" aria-label="...">
			<div class="btn-group" role="group">
			  	<button type="button" class="btn btn-info" data-dismiss="modal" onClick="javascript:wmsCommonJS.goPage('MobUserPwdMng.clt');">Change Password</button>
			</div>
		</div>
		<div class="navbar-fixed-bottom btn-group-justified" role="group">
			<button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
			<button type="button" class="btn btn-primary">Save</button>
		</div>

	</form>
<div class="navbar-fixed-bottom">
	<div class="btn-group btn-group-justified" role="group" aria-label="...">
		<div class="btn-group" role="group">
		  	<button type="button" style="width:50%" class="btn btn-default" data-dismiss="modal">Cancel</button>
		<button type="button" style="width:50%" class="btn btn-primary">Save</button>
		</div>
	</div>
</div>