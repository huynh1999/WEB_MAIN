<!-- 공통 Header -->
<%@include file="./../../../../../../syscommon/header/CLTMobHeader.jsp"%>
<div  class="well">
	<table class="table panel panel-default">
		<tbody>
			<tr onClick="javascript:wmsCommonJS.goPage('MobWHInDtl.clt);">
				<td class="info width-120">Contract</td>
				<td>SDKANG</td>
			</tr>
			<tr>
				<td class="info width-120">SKU</td>
				<td>ITEM-EA-01</td>
			</tr>
			<tr>
				<td class="info width-120">Description</td>
				<td>NEW ITEM 01</td>
			</tr>
			<tr>
				<td class="info width-120">Item Lot</td>
				<td>LOT</td>
			</tr>
			<tr>
				<td class="info width-120">Lot 4</td>
				<td>RED</td>
			</tr>
			<tr>
				<td class="info width-120">Lot 5</td>
				<td>LARGE</td>
			</tr>
			<tr>
				<td class="info width-120">LP#</td>
				<td>LP-23</td>
			</tr>
			<tr>
				<td class="info width-120">From Loc.</td>
				<td></td>
			</tr>
			<tr>
				<td class="info width-120">Movable Qty</td>
				<td>100</td>
			</tr>
		</tbody>
	</table>
	<form class="form-horizontal">
		<div class="well">
			<div class="row form-group form-margin-bottom">
				<label for="orderLineId" class="form-title">Move. Date</label>
				<div class="col-xs-7 form-padding-0">
					<input type="text" class="form-control" placeholder="Move. Date">
				</div>
			</div>
			<div class="form-group form-margin-bottom">
				<label for="orderLineId" class="form-title">To Loc.</label>
				<div class="col-xs-7 form-padding-0">
					<input type="text" class="form-control" id="s" placeholder="To Loc.">
				</div>
			</div>
			<div class="form-group form-margin-bottom">
				<label for="orderLineId" class="form-title">LP#</label>
				<div class="col-xs-7 form-padding-0">
					<input type="text" class="form-control" id="s" placeholder="LP#">
				</div>
			</div>
			<div class="form-group form-margin-bottom">
				<label for="orderLineId" class="form-title">Moved Qty</label>
				<div class="col-xs-7 form-padding-0">
					<input type="text" class="form-control" id="s" placeholder="Moved Qty">
				</div>
			</div>
		</div>
		<div class="modal-footer">
			<div class="btn-group btn-group-justified" role="group" aria-label="...">
				<div class="btn-group" role="group">
				  	<button type="button" style="width:50%" class="btn btn-default" data-dismiss="modal">Cancel</button>
					<button type="button" style="width:50%" class="btn btn-primary">Save</button>
				</div>
			</div>
		</div>

	</form>

