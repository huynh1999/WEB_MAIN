<%--
=========================================================
*Copyright(c) 2009 CyberLogitec. All Rights Reserved.
=========================================================

=========================================================
*@FileName   : TabWindow.jsp
*@FileTitle  : Tab 처리를 하기 위한 Window 
*@Description: 
*@author     : Kang,Jung-Gu - Cyberlogitec
*@version    : 1.0 - 08/07/2008
*@since      : 08/07/2008

*@Change history:
=========================================================
--%>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@page pageEncoding="UTF-8"%>
<%@include file="./../../../../../syscommon/header/CLTHeader.jsp"%>
<style>
/* Body ( Basic ) */
body {
	margin-left: 0px;
	margin-top: 0px;
	margin-right: 0px;
	margin-bottom: 0px;
}

.curTbTp {
	height: 21;
	width: 101;
	background-repeat: no-repeat;
	background-image: url(<%=CLT_PATH%>/web/img/main/tab_on.gif);
	font-family: Tahoma, verdana, arial;
	font-size: 10px;
	text-align: left;
	font-weight: bold;
	text-indent: 3px;
	padding-bottom: 0;
	padding-left: 0;
	padding-right: 1;
	color: #ffffff;
	border: 0px;
	cursor: hand;
}

.curTbTp A:link {
	color: #ffffff;
	text-decoration: none;
}

.curTbTp A:visited {
	color: #ffffff;
	text-decoration: none;
}

.curTbTp A:hover {
	color: #ffffff;
	text-decoration: underline;
}

.norTbTp {
	height: 21;
	width: 101;
	background-repeat: no-repeat;
	background-image: url(<%=CLT_PATH%>/web/img/main/tab_off.gif);
	font-family: Tahoma, verdana, arial;
	font-size: 10px;
	text-align: left;
	font-weight: bold;
	text-indent: 3px;
	padding-bottom: 0;
	padding-left: 0;
	padding-right: 1;
	color: #737373;
	border: 0px;
	cursor: hand;
}

.norTbTp A:link {
	color: #737373;
	text-decoration: none;
}

.norTbTp A:visited {
	color: #737373;
	text-decoration: none;
}

.norTbTp A:hover {
	color: #30A5D0;
	text-decoration: underline;
}

.keyTbTp {
	height: 21;
	background-repeat: no-repeat;
	font-family: Tahoma, verdana, arial;
	font-size: 10px;
	text-align: right;
	font-weight: bold;
	text-indent: 3px;
	padding-bottom: 0;
	padding-left: 0;
	padding-right: 1;
	color: #737373;
	border: 0px;
}

.keyTbTp A:link {
	color: #737373;
	text-decoration: none;
}

.keyTbTp A:visited {
	color: #737373;
	text-decoration: none;
}

.keyTbTp A:hover {
	color: #30A5D0;
	text-decoration: underline;
}

.TbBlank {
	width: 1;
	background: url(<%=CLT_PATH%>/web/img/main/blank.gif);
}

.transparent {
	filter: alpha(opacity =   60);
	-moz-opacity: 0.6;
	opacity: 0.6;
}
</style>
<script>

	var sixd  = 1;
	var ldx   = 1;
	var tabCount  = 1;
	var urlArr = new Array();
	var adpls = false;

	var highCnt=1;
	
	// Tab의 순서를 기억하기 위한 ArrayList
	var arrList = new ArrayList();
	// ArrList에 Home 입력
	arrList.add(0);
	// 버튼 클리핑 막기위한 딜레이용 Array
	//var lastinputtime = new Array();
	//var curDate = new Date();
    //this.lastinputtime[0] = curDate.getHours();
    //this.lastinputtime[1] = curDate.getMinutes();
    //this.lastinputtime[2] = curDate.getSeconds();
    //this.lastinputtime[3] = curDate.getMilliseconds();	
    //var beforeCld = 0;
	
    // waiting중인지 체크
    var isProcessing = false;
    
	// focus가 가있는 tabId
	var currTabId = 0;
	
	// X버튼을 눌러서 Tab을 삭제할 시 포커스가 가있는지를 알려주는 flag
	var isSameTab = false;
	
	var tmpCnt = 0;

	function mkNewFrame(val1, val2){
		
		var rowArr = winTbl.rows;
		var cellArr = rowArr[0].cells;
		
		//------[20130926 OJG] Program 접근권한체크-----
		var bAccPgm =false;
		var urlStr = "";
		
		//#25296
		var tabName = "";
		
		for(var i=0; i<parent.pgmUrl.length; i++){
			strIdx = val2.indexOf("./");
			endIdx = val2.indexOf("?");
			
			if(strIdx < 0){
				strIdx = 0;
			} 
			
			if(endIdx < 0){
				endIdx = val2.length;
			}
			
			urlStr = val2.substring(strIdx, endIdx);
			// LHK, 20131017 버튼으로 Page 이동시 Program만 등록되고 role 관련 처리는 현재 setting 할 수 없으며, 
			// 모든 user 에게 open 되는 버튼으로 Dock Receipt("./SEE_BMD_0180.clt")은 예외적으로 처리
			if(parent.pgmUrl[i].indexOf(urlStr) >= 0 || urlStr == "./SEE_BMD_0180.clt"){	
				bAccPgm = true;
				//#25296 urlStr로 취득한 pgmNm을  val1로 세팅한다 
				tabName = parent.pgmNm[i];
				break;
			}
		}

		//#25296 urlStr로 취득한 pgmNm을  val1로 세팅한다 
		if (tabName != 'undefined' && tabName != undefined && tabName !="") {
			val1 = tabName;
		}
		
		if(!bAccPgm){
			alert(getLabel('FMS_COM_ALT048'));
			return;
		}
		
		//------[20130926 OJG] Program 접근권한체크-----	
		if(cellArr.length<=15){
			var isCreate = true;
			if(!adpls){
				//trade partner '' popup 에서 entry 화면 New 호출시에는 무조건 새창을 생성한다.
				//'./SAL_TPM_0010.clt?callId=NEW' 가 아닐 경우만 확인한다.
				if(val2 != "./SAL_TPM_0010.clt?callId=NEW"){
					if(checkTabUrl(val1, val2)){
						isCreate = false;
					}
				}
			}
			if(isCreate){
				setFrame(parseInt(sixd));
				var curTabCnt = parseInt(ldx);
				curTabCnt = curTabCnt+1;
				highCnt = curTabCnt;
				tmpCnt = 0;
				//highCnt = curTabCnt+1;
				var td=document.createElement("TD");
				td.id = "tb"+curTabCnt;
				td.innerHTML = "<div id=\"div"+curTabCnt+"\" width=\"100%\" height=\"100%\" ><iframe id=\"if"+curTabCnt+"\" src=\""+val2+"\" width=\"100%\" height=\"100%\" border=\"0\" frameborder=\"NO\"  frameborder=\"0\"></iframe></div>";
				rowArr[0].appendChild(td);
				
				//alert(curTabCnt);
				aTbs(curTabCnt, val1);
				arrList.add(curTabCnt);
				
				//List에 현재 값을 담는다.
				currTabId = curTabCnt;
				
				sixd = curTabCnt;
				ldx++;
				urlArr[ldx] = val2;
				tabCount++;
				if(tabCount>1){
					setScroll(true);
				}
			}
		}else{
			alert('Only 15 menu tab can be made!\nPlease close a window!');
		}
	}

	function setScroll(isRight){
		var toWhere = 'left';
		if(isRight){
			toWhere = 'right';
		}
		for(var i = 0; i < 24; i++){
			mnuScroll.doScroll(toWhere);
		}
	}

	// URL에 해당하는 Tab이 존재하는 체크한다.
	function checkTabUrl(val1, url){
		var rtv = false;
		for(var i = 0; i < urlArr.length; i++){
			if(urlArr[i]==url){
				clickTab(i);
				rtv = true;
				break;
			}
		}
		return rtv;
	}

	
	function doClearUrl(uix){
		var uixInt = parseInt(uix);
		urlArr[uixInt] = '';
	}

	// 새로운프레임에 값을 세팅한다.
	function setFrame(curTabCnt){
		var oij = document.getElementById("if"+curTabCnt);
		var oid = document.getElementById("div"+curTabCnt);
		if(oij!=null){
			
			oid.style.display = "none"; //20130906 주석 처리함
			var ort = document.getElementById("tb"+curTabCnt);//ort.display = "none"; //20130906 ort.display  -- ort.style.display로 변경
			//iframe를 display 하게 되면 시트에서 resize 이벤트가 발생 하여 시크롤이 제일 처음으로 돌아가는 현상으로 인하여 소스 변경
			var olb = document.getElementById("tabLbl"+curTabCnt);
			var oib = document.getElementById("inTbObj"+curTabCnt);
			oib.className = 'norTbTp';
			olb.className = 'norTbTp';
		}
	}

	function aTbs(tabId, val1){
		var rowArr  = tabTbl.rows;
		var cellArr = rowArr[0].cells;
		var td=document.createElement('TD');

		var xBtn = "<font size='2'>X</font>&nbsp;";
		td.id = 'tabLbl'+tabId;
		var inStr = "<table width=\"101px\" id=\"inTbObj"+tabId+"\" class=\"curTbTp\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\">";
		inStr+= "    <tr> ";
		inStr+= "        <td id=\"btntd"+tabId+"\" onclick=\"javascript:clickTab("+tabId+")\" width=\"92px\">";
		inStr+= "            <span style=width:80px;overflow:hidden;text-overflow:ellipsis;\"><NOBR>";
		inStr+= val1;
		inStr+= "</NOBR></span> ";
		inStr+= "</td>";
		inStr+= "        <td onclick=\"javascript:moveAndDelete("+tabId+")\" width=\"8px\" align=\"center\" style=\"cursor:hand;paddings-right:0px;font-weight: bold;\" align=\"absmiddle\">";
//		inStr+= "        <a href=\"javascript:;\"><td onclick=\"javascript:doDeleteWin("+tabId+")\" width=\"8px\" align=\"center\" style=\"cursor:pointer;paddings-right:0px;font-weight: bold;\" align=\"absmiddle\">";
		inStr+= xBtn;
//		inStr+= "        </a></td> ";
		inStr+= "        </td> ";
		inStr+= "    </tr> ";
		inStr+= " </table> ";
		td.onclick = function(){
			//clickTab(tabId);
		}; 
		td.title = val1;
		td.className = 'curTbTp';
		td.innerHTML = inStr;rowArr[0].appendChild(td);
	}

	function moveAndDelete(cld){

		
		isProcessing = true;
		isBlocking = false;
		var intCld = parseInt(cld);
		
		// x버튼 클릭한 Tab의 순서가  currTabId과  같으면 마지막을 선택하자. - 스크롤 유지를 위한 로직
		isSameTab = false;
		if (parseInt(currTabId) ==  intCld) {
			
			isSameTab = true;
			
			// 생성된 Tab이 2개 이상일때만 체크(기존 Home포함 3)
			if ( arrList.length() > 2){
			
				// 현재 tab이 마지막 탭이라면 바로 전 탭에 포커스를 준다.
				var lstTab = arrList.length();
				var beforLastTab = parseInt(lstTab)-1;
				// arrList에서 바로 전 탭의 TabId를 취득한다.
				beforLastTab = parseInt(beforLastTab);
				var xx = parseInt(beforLastTab-1);
				var tabId= arrList.get(xx);
				clickTab(tabId);
			}
		}
		
 		try {setTimeout(function() { doDeleteWin(intCld);}, 30);} catch(e) {} 
	}
	
	function dSt(cld){
		clickTab(cld);
	}
		
	function clickTab(cld){

		cld = parseInt(cld);
		
		//currTabId에 cld를 입력한다.
		currTabId = cld;
		
		sixd = parseInt(sixd);
		
		setFrame(sixd);

		var olb  = document.getElementById("tabLbl"+cld);
		var oib = document.getElementById("inTbObj"+cld);oib.className= 'curTbTp';
		olb.className = 'curTbTp';
		var ort = document.getElementById("tb"+cld);
		//20130906 ort.display  -- ort.style.display로 변경
		//iframe를 display 하게 되면 시트에서 resize 이벤트가 발생 하여 시크롤이 제일 처음으로 돌아가는 현상으로 인하여 소스 변경
		//ort.display = "block";
		var oij = document.getElementById("if"+cld);
		var oid = document.getElementById("div"+cld);
		oid.style.display = "block"; //20130906 주석
		sixd = cld;


		//화면이 다 그려지기 전에 영역에 focus가 들어가게 되면 시트에서 resize 이벤트가 발생 하여 스크롤이 위로 붙는 현상으로 인하여 focus 주는 로직에 시간 타임을 줌
		try {setTimeout(function() { setFocus(ort,oid,oij,cld);}, 30);} catch(e) {}

	}
	
	function setFocus(ort,oid,oij,cld){
		if(ort.innerHTML !== "") {

			oij.contentWindow.focus();		
		
			try {
				for(var i=0; i<oij.contentWindow.document.forms[0].elements.length; i++){
					if(oij.contentWindow.document.forms[0].elements[i].type == "text"){
						try {
							oij.contentWindow.document.forms[0].elements[i].focus();
							break;
						} catch(e) {
							return;
						}
					}
				}
			} catch (e){
				return;
			}
			
			$(oij.contentWindow.document).ready(function(){	
				$("form:not(.filter) :input:visible:enabled:first").focus();
			});
		}
	}


	function doDeleteWin(cld, isShortCut) {

		cld = parseInt(cld);
		
		if (true == isShortCut){

			isSameTab = true;
			isProcessing = true;
			isBlocking = false;
			
			var intCld = parseInt(cld);
			
			clickTab(intCld);
		}

		// 짧은 시간에 여러번 클릭방지를 위해 체크로직 추가
		if (!isBlocking && isProcessing) {
			isBlocking = true;

			if(tabCount>1 &&  arrList.length()>1){
				
				// arrList에서 현재 TabId를 삭제
				for (var i=0; i<arrList.length();i++) {
					if (arrList.get(i) == cld ){
						arrList.remove(i);
						break;
					}
				} 
				
				var winObjId = "tb"+cld;
				var winTbl = document.getElementById("winTbl");
				var winRows = winTbl.rows[0]; 
				var winCol = winRows.cells;
	
				for(var i = 0; i < winCol.length; i++){
					if(winCol[i].id==winObjId){     
						winRows.deleteCell(i);
						break;
					}
				}
				
				winObjId = "tabLbl"+cld;
				winTbl = document.getElementById("tabTbl");
				winRows = winTbl.rows[0]; 
				winCol = winRows.cells;
				for(var i = 0; i < winCol.length; i++){
					if(winCol[i].id==winObjId){
						winRows.deleteCell(i);
						break;
					}
				}
		
				doClearUrl(cld);
				tabCount--;
				if(tabCount==1) {
					clickTab(1);
				} else {
					winCol = winRows.cells;
					var ikx = winCol.length-1;
					var tmpLbl = winCol[ikx].id;	
					
							
					
					if(cld==sixd){
						clickTab(tmpLbl.substring(6));
					}
							
					// x버튼 클릭한 Tab의 순서가  currTabId과  같으면 마지막을 선택하자.
					if (isSameTab && arrList.length() > 1) {
						try {setTimeout(function() {eval("document.all.btntd"+tmpLbl.substring(6)+".click();");}, 30);} catch(e) {}
					}
				}
			}
		} else {

			// 무리한 버튼 클릭으로 인한 에러시 
			if ( arrList.length() > 2){
				tabCount++;
				// 현재 tab이 마지막 탭이라면 바로 전 탭에 포커스를 준다.
				var lstTab = arrList.length();
				var xx = parseInt(lstTab-1);
				var tabId= arrList.get(xx);
				clickTab(tabId);
			}
		} 	
	
		isProcessing = false;
		
	} 
	
	
	function ArrayList(){    
		
		this.array = new Array();  
		
		this.add = function(obj){
			this.array[this.array.length] = obj;     
		};     
		
		this.iterator = function (){         
			return new Iterator(this);     
		};     
		
		this.length = function (){         
			return this.array.length;     
		};     
		
		this.get = function (index){         
			return this.array[index];     
		};     
		
		this.remove = function (index){  
			this.newArr = new Array();
			
			var j = 0;
			for (var i=0;i<this.array.length;i++){  
				if (i != index) {
					this.newArr[j] = this.array[i]; 
					j++;
				}				     
			}     
			this.array = new Array();
			this.array = this.newArr;  
		};     
		
		this.addAll = function (obj){         
			if (obj instanceof Array){             
				for (var i=0;i<obj.length;i++){                 
					this.add(obj[i]);             
				}         
			} else if (obj instanceof ArrayList){             
				for (var i=0;i<obj.length();i++){                 
					this.add(obj.get(i));             
				}         
			}     
		}; 
	}
	
	function Iterator (arrayList){     
		this.arrayList;     
		this.index = 0;     
		this.hasNext = function (){         
			return this.index < this.arrayList.length();     
		};     
		this.next = function() {         
			return this.arrayList.get(index++);     
		}; 
	} 
	
	
	function doWork(){
		return;
	}
	
    </script>
</head>
<div id="WORKING_IMG"
	style="z-index: 1; position: absolute; width: 100%; height: 100%; display: none; background-color: #CCCCFF; margin-top: 0px; margin-left: 0px;"
	class="transparent" valign="middle" align="center">
	<table style="margin-top: 25%;">
		<tr>
			<td><img src='<%=CLT_PATH%>/web/img/main/processing.gif'
				border="0" style="z-index: 0; filter: alpha(opacity =   100)" />
			</td>
		</tr>
	</table>
</div>
<div id="COMPLETE_IMG"
	style="z-index: 1; position: absolute; display: none; filter: alpha(opacity =   100); width: 280px; height: 60px; left: 480px; top: 0px;"
	valign="middle" align="center">
	<iframe src='<%=CLT_PATH%>/js/common/completed.html' scrolling='no'
		frameborder='0'
		style='margin-top: 0px; width: 280px; height: 60px; border: none; display: block'>
	</iframe>
</div>
<body
	style="margin-top: 0px; margin-left: 0px; margin-right: 0px; margin-bottom: 0px;"
	bgcolor="#FFFFFF" scroll="no">
	<table border="0" cellspacing="0" cellpadding="0" bgcolor=""
		width="100%" height="100%">
		<tr>
			<td><img src="<%=CLT_PATH%>/web/img/main/blank.gif" height="4">
			</td>
		</tr>
		<tr>
			<td height="97%" width="100%">
				<table id="winTbl" border="0" cellspacing="0" cellpadding="0"
					bgcolor="" width="100%" height="100%">
					<tr>
						<td id="tb1" width="0%">
							<div id="div1">
								<iframe id="if1" src="./Main.clt" width="100%" height="100%"
									border="0" frameborder="NO" frameborder="0"></iframe>
							</div></td>
					</tr>
				</table></td>
		</tr>
		<tr>
			<td align="left">
				<table border="0" cellpadding="0" height="21" width="970"
					cellspacing="0" bgcolor="#FFFFFF" style="padding-top: 5px;">
					<tr>
						<td width="15px"><img
							src="<%=CLT_PATH%>/web/img/main/paging_l.gif"
							onclick="setScroll(false)" style="cursor: hand;" border="0"
							align="absmiddle">
						</td>
						<td><img src="<%=CLT_PATH%>/web/img/main/blank.gif" width="2">
						</td>
						<td>
							<div id="key"
								style="position: relative; width: 1200px; overflow: hidden; z-index: 0">
								<table id="keyTbl" align="right" border="0" cellspacing="0"
									cellpadding="0" height="21" bgcolor="#ffffff"
									style="padding-top: 0px;">
									<tr>
										<td class="keyTbTp">ALT+1:Print&nbsp;&nbsp;&nbsp;
											ALT+2:Copy&nbsp;&nbsp;&nbsp; ALT+Q:Save&nbsp;&nbsp;&nbsp;
											F2:Acct&nbsp;&nbsp;&nbsp; ALT+W:New&nbsp;&nbsp;&nbsp;
											ALT+F1:Search&nbsp;&nbsp;&nbsp;
											ALT+4:Close&nbsp;&nbsp;&nbsp;
											F8:M to H&nbsp;&nbsp;&nbsp;
											ALT+5:HOUSE B/L CREATE&nbsp;&nbsp;&nbsp;
										</td>
									</tr>
								</table>
								<div id="mnuScroll"
									style="position: absolute; top: 0; left: 0; width: 1200px; overflow: hidden; z-index: 1; filter: alpha(opacity =   100)">
									<table id="tabTbl" border="0" cellspacing="0" cellpadding="0"
										height="21" bgcolor="#ffffff" style="padding-top: 0px;">
										<tr>
											<td id="tabLbl1" class="curTbTp" onclick="clickTab(1);">
												<table id="inTbObj1" class="curTbTp" border="0"
													cellspacing="0" cellpadding="0">
													<tr>
														<td id="tb1" title='Home'>Home</td>
													</tr>
												</table></td>
										</tr>
									</table>
								</div>
							</div></td>
						<td width="10px"><img
							src="<%=CLT_PATH%>/web/img/main/paging_r.gif"
							onclick="setScroll(true)" style="cursor: hand;" border="0"
							align="absmiddle">
						</td>
					</tr>
				</table></td>
		</tr>
	</table>
</body>
</html>
