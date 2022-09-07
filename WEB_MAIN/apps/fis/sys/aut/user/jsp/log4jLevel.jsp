<%@ page contentType="text/html;charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="clt-paging"   prefix="paging" %>

<%@ page import="java.util.LinkedList"%>
<%@ page import="java.util.Collections"%>
<%@ page import="java.util.Comparator"%>
<%@ page import="java.util.Enumeration"%>
<%@ page import="java.util.List"%>
<%@ page import="org.apache.log4j.Category"%>
<%@ page import="org.apache.log4j.Level"%>
<%@ page import="org.apache.log4j.Logger"%>

<!-- 공통 Header -->
<%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
<%-- <link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css"/> --%>
	
<%!
	public static List<Category> getAllCategories() {
		Logger root = Logger.getRootLogger();
		
		List<Category> results = new LinkedList<Category>();
		Enumeration currentCategories = root.getLoggerRepository().getCurrentCategories();
		while(currentCategories.hasMoreElements()) {
			Category category = (Category) currentCategories.nextElement();
			results.add(category);
		}
		
		Collections.sort(results, new Comparator<Category>(){
			public int compare(Category o1, Category o2) {
				if (o1 == null || o2 == null) return 0;
				if (o1.getName() == null || o2.getName() == null) return 0;
				return o1.getName().compareTo(o2.getName());
			}});
		
		results.add(0, root);
		
		return results;
	}
	
	public static void setLogLeve(String categoryName, Level level) {
		Category category = findCategory(categoryName);
		if (category == null) {
			System.out.println("[Log4JUtil] Can not find category: " + categoryName);
			return;
		}
		
		category.setLevel(level);
	}
	
	private static Category findCategory(String categoryName) {
		if (categoryName == null) return null;
		Logger root = Logger.getRootLogger();
		if ("root".equals(categoryName)) return root;
		Enumeration categories = root.getLoggerRepository().getCurrentCategories();
		while(categories.hasMoreElements()) {
			Category category = (Category) categories.nextElement();
			if (categoryName.equals(category.getName())) return category;
		}
		return null;
	}
%>
<%
	String level = request.getParameter("level");
	String[] categoryNames = request.getParameterValues("categoryNames");
	if (level != null && level.trim().length() > 0) {
		if (categoryNames == null) categoryNames = new String[0];
		for(String categoryName : categoryNames) {
			setLogLeve(categoryName, Level.toLevel(level, null));
		}
		//response.sendRedirect("log4jLevel.jsp");
		response.encodeURL("./SYS_LOG_0010.clt");
		return;
	} 
%>

<html>
<head>

<style type="text/css">
caption {
  position: absolute;
  font-size: 0;
  left: -99999px;
}
.table-box-wrap {
	position: relative;
    margin-left: 10px;
    margin-right: 10px;
    padding-top: 25px;
    border: 1px solid #ccc;
}
.table-box-wrap .table-box {
    max-height: 600px;
    overflow: auto;
    overflow-x: hidden;
}
.table-box-wrap .table-box table {
    width: 100%;
    table-layout: fixed;
    border-spacing: 0;
    border-collapse: collapse;
}
.table-box-wrap .table-box table thead tr {
    position: absolute;
    top: 0;
}
.table-box-wrap .table-box table thead tr th {
    font-family: "Arial", "Dotum", "Helvetica", "AppleGothic", sans-serif;
    font-size:12px;
    height:24px;
    vertical-align: middle;
    font-weight: bold;
    /* text-align: center; */
    color:#ffffff;
    background-color:#27415d;
    border-right:1px solid #eeeeee;
    border-left:1px solid #eeeeee;
}

.table-box-wrap .table-box table td {
    background-color:rgb(244,244,244);
    border-right:1px solid #eeeeee;
    border-bottom:1px solid #c3d0d9;
    border-right:1px solid #c3d0d9;
    border-left:1px solid #c3d0d9;
}

.table-box-wrap .table-box table tr {
    display: inline-table;
    width: 100%;
    table-layout: fixed;
}

.table-box-wrap .table-box table tbody tr {
   display: table-row;
}

</style>

<script>

$(document).ready(function() {
	toggleCheckBox(true);
	document.getElementsByName("selectAll")[0].checked = true;
	var rootLevel = $("#categoryLevel").text();
	$("#levelSel").val(rootLevel);
});

function toggleCheckBox(checked) {
	var inputs = document.getElementsByTagName('input');
	for(var i = 0; i < inputs.length; i++) {
		if (inputs[i].type != 'checkbox') continue;
		if (inputs[i].name != 'categoryNames') continue;
		inputs[i].checked = checked;
	}
}

function iBatisSqlLog(isOn) {
	var iBatisSqlLogLevel = document.getElementById('iBatisSqlLogLevel');
	if (isOn) {
		iBatisSqlLogLevel.value = 'DEBUG';
	} else {
		iBatisSqlLogLevel.value = 'OFF';
	}
	var iBatisSqlLogForm = document.getElementById('iBatisSqlLogForm');
	iBatisSqlLogForm.target = 'saveLogLevel';
	iBatisSqlLogForm.submit();	
}

function iBatisSqlLog2() {
	
 	var inputs = document.getElementsByTagName('input');
	var checkFlag = false;
	for(var i = 0; i < inputs.length; i++) {
		if (inputs[i].type == 'checkbox') {
			if (inputs[i].checked) {
				checkFlag = true;
			} 
		}
	}
	
	if (!checkFlag) {
		alert("Please select Category from the list!");
	} else { 
		if(confirm(getLabel('FMS_COM_CFMCON'))){
			var iBatisSqlLogForm = document.getElementById('iBatisSqlLogForm');
			iBatisSqlLogForm.target = 'saveLogLevel';
			iBatisSqlLogForm.submit();
			setTimeout(logLevelPageReset, 1000);
		}
	}
}

function logLevelPageReset() {
	//setTimeout(location.reload(true), 3000);
	location.reload();
}

</script>

</head>

<body>
<form id="iBatisSqlLogForm" name="iBatisSqlLogForm" method="POST" action="./SYS_LOG_0010.clt">
	<div class="page_title_area">
		<h2 class="page_title"><button type="button">Log4J Level Set</button></h2>
	</div>
	<div class="opus_design_btn TOP">
		<div class='buttonAear' style="margin-right: 10px;">
			<select name="level" id="levelSel">
				<option value="DEBUG">DEBUG</option>
				<option value="INFO">INFO</option>
				<option value="WARN">WARN</option>
				<option value="ERROR">ERROR</option>
			</select>
			<!-- <input type="submit" value="Change selected logger levels!"/> -->
			<button type="button" class="btn_normal" onclick="javascript:iBatisSqlLog2();">Change Selected Log Level</button>
			<!-- 
			<button type="button" class="btn_normal" onclick="javascript:logLevelPageReset();">Reset</button>
			<a href="javascript:iBatisSqlLog(true);">[iBatis SQL log ON!]</a>
			<a href="javascript:iBatisSqlLog(false);">[iBatis SQL log OFF!]</a>
			-->
		</div>
	</div>
	<div class="table-box-wrap">
		<div class="table-box">
			<table>
				<colgroup>
					<col width="40px">
					<col width="*">
					<col width="100px">
				</colgroup>
				<thead>
					<tr>
						<th scope="col" style="text-align: center;width: 40px"><input name="selectAll" type="checkbox" onclick="toggleCheckBox(this.checked)"/></th>
						<th scope="col" style="text-align: left;">&nbsp;&nbsp;&nbsp;&nbsp;Category</th>
						<th scope="col" style="text-align: center;;width: 118px">Level</th>
					</tr>
				</thead>
	
				<tbody>
					<%
					List<Category> categories = getAllCategories();
					for(Category category : categories) {
					%>
					<tr>
						<td style="text-align: center;"><input name="categoryNames" type="checkbox" value="<%=category.getName()%>"/></td>
						<td style="text-align: left;">&nbsp;&nbsp;&nbsp;&nbsp;<%=category.getName()%></td>
						<td style="text-align: center;"><span id="categoryLevel"><%=category.getLevel() != null ? category.getLevel() : ""%></span></td>
					</tr>
					<%	}	%>
				</tbody>
			</table>
		</div>
		<input id="iBatisSqlLogLevel" type="hidden" name="level" value="OFF">
	 	<input type="hidden" name="categoryNames" value="java.sql.Connection">
		<input type="hidden" name="categoryNames" value="java.sql.Statement">
		<input type="hidden" name="categoryNames" value="java.sql.PreparedStatement">
		<input type="hidden" name="categoryNames" value="java.sql.ResultSet"> 
	</div>
	
	<%-- 
	<div height="100%">
		<div class="wrap_result_tab" style="min-width:800px;">
			<div class="opus_design_inquiry"  style="overflow-y: auto; height:600px;">
				<table style="padding-left: 10px">
					<colgroup>
						<col width="40px" />
						<col width="*" />
						<col width="100px" />
					</colgroup>
					<thead> 
						<tr>
							<th scope="col" class="table_head" style="text-align: center;"><input name="selectAll" type="checkbox" onclick="toggleCheckBox(this.checked)"/></th>
							<th scope="col" class="table_head" style="text-align: left;">&nbsp;&nbsp;&nbsp;&nbsp;Category</th>
							<th scope="col" class="table_head" style="text-align: center;">Level</th>
						</tr>
					</thead> 	
					<tbody> 
						<%
							List<Category> categories = getAllCategories();
							for(Category category : categories) {
						%>
						<tr>
							<td class="table_body" style="text-align: center;"><input name="categoryNames" type="checkbox" value="<%=category.getName()%>"/></td>
							<td class="table_body" style="text-align: left;">&nbsp;&nbsp;&nbsp;&nbsp;<%=category.getName()%></td>
							<td class="table_body" style="text-align: center;"><span id="categoryLevel"><%=category.getLevel() != null ? category.getLevel() : ""%></span></td>
						</tr>
						<%	}	%>
					</tbody>
				</table>
			</div>
		</div>
		<input id="iBatisSqlLogLevel" type="hidden" name="level" value="OFF">
	 	<input type="hidden" name="categoryNames" value="java.sql.Connection">
		<input type="hidden" name="categoryNames" value="java.sql.Statement">
		<input type="hidden" name="categoryNames" value="java.sql.PreparedStatement">
		<input type="hidden" name="categoryNames" value="java.sql.ResultSet"> 
	</div> --%>
</form>
<iframe name="saveLogLevel" id="saveLogLevel" style="width:0;height:0;visibility:hidden" border=0></iframe>
</body>
</html>
