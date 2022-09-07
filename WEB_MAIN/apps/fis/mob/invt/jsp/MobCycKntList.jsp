<!-- 공통 Header -->
<%@include file="./../../../../../../syscommon/header/CLTMobHeader.jsp"%>
<div class="well">
	<table class="table panel panel-default">
		<thead>
			<tr>
				<th>Location</th>
				<th>SKU Name</th>
				<th>Qty</th>
			</tr>
		</thead>
		<tbody>
			<tr onClick="javascript:wmsCommonJS.goPage('MobCycKntDtl.clt');">
				<td scope="row">CELL-001</td>
				<td>NEW ITEM 001</td>
				<td>150</td>
			</tr>
			<tr>
				<td scope="row">CELL-001</td>
				<td>NEW ITEM 002</td>
				<td>150</td>
			</tr>
			<tr>
				<td scope="row">CELL-001</td>
				<td>NEW ITEM 003</td>
				<td>100</td>
			</tr>
			<tr>
				<td scope="row">CELL-001</td>
				<td>NEW ITEM 004</td>
				<td>150</td>
			</tr>
			<tr>
				<td scope="row">CELL-001</td>
				<td>NEW ITEM 005</td>
				<td>300</td>
			</tr>
		</tbody>
	</table>
</div>