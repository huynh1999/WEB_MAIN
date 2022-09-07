<!-- 공통 Header -->
<%@include file="./../../../../../../syscommon/header/CLTMobHeader.jsp"%>
<div class="well">
	<div class="ol-md-12 form-wrapper">
		<label for="order">Contract</label>
		<input type="text" class="form-control" placeholder="Contract" aria-describedby="basic-addon1">
	</div>
	<div class="ol-md-12 form-wrapper">
		<label for="estimateDate">Plan Date</label>
		<input type="text" class="form-control" placeholder="Plan Date" aria-describedby="basic-addon1">
	</div>
	<div class="ol-md-12 form-wrapper">
		<label for="order">SKU</label>
		<input type="text" class="form-control" placeholder="SKU" aria-describedby="basic-addon1">
	</div>
	<div class="ol-md-12 form-wrapper">
		<label for="order">From Location</label>
		<input type="text" class="form-control" placeholder="From Location" aria-describedby="basic-addon1">
	</div>
</div>
<div class="navbar-fixed-bottom">
	<div class="btn-group btn-group-justified" role="group" aria-label="...">
	  <div class="btn-group" role="group">
	    <button type="button" class="btn btn-primary" onClick="javascript:wmsCommonJS.goPage('MobCycKntList.clt');">Search</button>
	  </div>
	</div>
</div>