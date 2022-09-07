<%-------------------- 공통팝업페이지에 포함할 스크립트 START --------------------%>
<SCRIPT LANGUAGE="javascript">
<!--
<%
	// Popup 모드 (1: function 호출형, 2: target 세팅형)
	String pop_mode=request.getParameter("pop_mode");	
	if(pop_mode == null || pop_mode.equals(""))
		pop_mode="1";
	// 호출할 부모창의 스크립트 메소드 (pop_mode가 1(function 호출형) 인 경우)
	String func=request.getParameter("func");
	// 값을 세팅할 부모창의 Object목록 (pop_mode가 2(target 세팅형) 인 경우)
	String targetObjList=request.getParameter("targetObjList");
	// Multi Sheet인 경우, 데이터를 가져올 Sheet 정보
	String sheet=request.getParameter("sheet");	
	// Multi Sheet인 경우, Sheet의 Index 정보
	String sheetIdx=request.getParameter("sheetIdx");
	// Sheet에서 팝업 호출시, Target이 되는 Cell의 row/col 정보
	String row=request.getParameter("row");
	String col=request.getParameter("col");	
	String strDisplay=request.getParameter("display");
	String strPopOpt=null;
	String popKind=null;
	if("none".equals(strDisplay)) {
		popKind="none";
	} else {
		if(strDisplay != null && strDisplay.length() >= 3) {
			strPopOpt=strDisplay.substring(0,3);
		}
		if(strPopOpt != null) {
			if("0,1".equals(strPopOpt)) {
				popKind="checkbox";
			} else if("1,0".equals(strPopOpt)) {
				popKind="radio";
			} else if("0,0".equals(strPopOpt)) {
				popKind="row";
			} 
		}
	}
	//popKind = "none";
%>	
	var sheet=<%= sheet %>
	var sheetObj=null;
	// 2007.01.25 : Sheet 수에 상관없이 가장 마지막 Sheet를 세팅함
	sheetObj=docObjects[docObjects.length - 1];
	/*
	if(sheet == 2) {
		sheetObj=docObjects[1];
	} else {
		sheetObj=docObjects[0];
	}*/
	function comPopupOK() {
		<%
			if(pop_mode != null && pop_mode.equals("1")) {
		%>
				callParentFunc();
		<%
			} else if(pop_mode != null && pop_mode.equals("2")) {
		%>
				setParentTarget();
		<%
			}
		%>
	}
	// 부모창의 function을 호출
	function callParentFunc() {
		<%
			if(func == null || func.equals("")) {
		%>
  		ComClosePopup(); 
				return;
		<%
			}
		%>
		var rArray=null; //행데이터를 담고 있는 배열
		// 단일선택(Radio) 또는 다중선택(CheckBox) 일 때..
		if("<%=popKind%>" == "radio" || "<%=popKind%>" == "checkbox") {
			rArray=getCheckedRows();
			if(rArray == null) {
				ComShowCodeMessage("COM12114", "row");
				return;
			}
        }
        // 선택박스가 없는경우.. 단일선택
        else if("<%=popKind%>" == "row") {
        	rArray=getSelectedRow();
        	if(rArray == null) {
				ComShowCodeMessage("COM12114", "row");
				return;
			}
        }
        // 모두선택인 경우
        else if("<%=popKind%>" == "none") {
        	rArray=getAllRows();
        	if(rArray == null) {
				ComShowCodeMessage("COM12114", "row");
				return;
			}
        }
		// 모달창인 경우는 window 객체로부터 opener를 획득
			//opener=window.dialogArguments;
			var opener = window.dialogArguments;
			if (!opener) opener=window.opener;
			if (!opener) opener = parent;
		try {
			<%
				if(func != null && !func.equals("")) {					
					if(row != null && col != null) {
						if(sheetIdx != null && sheetIdx != "") {
			%>
							opener.<%= func %>(rArray, <%=row%>, "<%=col%>", <%=sheetIdx%>);
  							ComClosePopup(); 
			<%
						} else {
			%>
							opener.<%= func %>(rArray, <%=row%>, "<%=col%>");
  							ComClosePopup(); 
			<%
						}
					} else {
			%>
						opener.<%= func %>(rArray);
 	 						ComClosePopup(); 
			<%
					}
				}
			%>
		}
		catch(e) {
		 	ComShowCodeMessage("COM12111");
		}
	}
	// 부모창의 Target Object에 값 세팅
	function setParentTarget() {
		<%
			// Target 정보가 없을시 Return
			if(targetObjList == null || targetObjList.equals("")) {
		%>
  				ComClosePopup(); 
				return;
		<%
			} else {
			java.util.StringTokenizer tokenTarget=new java.util.StringTokenizer(targetObjList, "|");
			while(tokenTarget.hasMoreTokens()) {
				String unit=(String)tokenTarget.nextToken();
				if(unit.indexOf(":") != -1) {
					java.util.StringTokenizer tokenUnit=new java.util.StringTokenizer(unit, ":");
					String popSource=(String)tokenUnit.nextToken();
					String parentTarget=(String)tokenUnit.nextToken();
		%> 
					// 모달창인 경우는 window 객체로부터 opener를 획득			        
					if(!opener)
						opener=window.dialogArguments;
					var rArray=null; 	// 행데이터를 담고 있는 배열
					var val="";	// Target Object에 세팅할 값
					var tagName=opener.document.all["<%=parentTarget%>"].tagName;
					// 단일선택(Radio) 또는 다중선택(CheckBox) 일 때..
					if("<%=popKind%>" == "radio" || "<%=popKind%>" == "checkbox") {
						rArray=getCheckedRows("<%=popSource%>");
			        }
			        // 선택박스가 없는경우.. 단일선택
			        else {
			        	rArray=getSelectedRow("<%=popSource%>");
			        }
					// Target Object에 입력할 값을 획득
					for(var i=0; i<rArray.length; i++) {
						if(i == 0) {
							val += rArray[i];
							// Combo박스인 경우는 맨 처음 값으로 세팅 후 break
							if(tagName == "SELECT") {								
								break;
							}
						} else {
							// 중복체크
							if(!chkDup(val, rArray[i]))
								val += "," + rArray[i];
						}
					}
					// Target Object에 값 세팅
					try {
						opener.document.all["<%=parentTarget%>"].value=val;
						try {
							// Target Object에 OnChange 이벤트 발생시킨다.
							// => 이것은 Onchange 이벤트를 지정한 Object에만 영향을 끼친다.
							opener.document.all["<%=parentTarget%>"].fireEvent("onchange");
						} catch(e) {}
  					ComClosePopup(); 
					}
					catch(e) {
					 	ComShowCodeMessage("COM12111");
					}
		<%		
				}
			}	
			}
		%>
	}
	function chkDup(val, ind) {
		var bDup=false;
		var arrVal=val.split(",");
		for(var i=0; i<arrVal.length; i++) {
			if(arrVal[i] == ind) {
				bDup=true;
				break;
			}
		}
		return bDup;
	}
	function getSelectedRow(colName) {
		var colsCnt=sheetObj.LastCol()+ 1;
		var rows=sheetObj.RowCount();
		var rArray=null; //행데이터를 담고 있는 배열
    	var cArray=null; //열데이터를 담고 있는 배열
		var selectRow=sheetObj.GetSelectRow();
       	if(selectRow == 0) {
       		return null;
       	}
       	else {
       		rArray=new Array(1);
       		// 특정 컬럼명이 지정된 경우
       		if(colName != null && colName != "") {
//       			cArray = sheetObj.CellValue(i, colName);
				cArray=sheetObj.GetCellValue(selectRow, colName);
       		} else {
	       		cArray=new Array(colsCnt);
	  			for(var j=0; j<cArray.length; j++) {
				cArray[j]=sheetObj.GetCellValue(selectRow, j);
	            }
	        }
            rArray[0]=cArray;
            return rArray;
       	}
	}
	function getAllRows() {
		var checkRows;
		var colsCnt=sheetObj.LastCol()+ 1;
		var rows=sheetObj.RowCount();
		var rArray=null; //행데이터를 담고 있는 배열
    	var cArray=null; //열데이터를 담고 있는 배열
    	var idx=0;
    	var rowCount=sheetObj.RowCount();
    	rArray=new Array(rowCount);
		for(var i=0; i < rowCount; i++) {
			cArray=new Array(colsCnt);
			for(var j=0; j<cArray.length; j++) {
			cArray[j]=sheetObj.GetCellValue(i + sheetObj.HeaderRows(), j);
            }        
	        rArray[idx++]=cArray;
  		}
	  	return rArray;
	}
	function getCheckedRows(colName) {
		var checkRows;
		var colsCnt=sheetObj.LastCol()+ 1;
		var rows=sheetObj.RowCount();
		var rArray=null; //행데이터를 담고 있는 배열
    	var cArray=null; //열데이터를 담고 있는 배열
		checkRows=sheetObj.CheckedRows("<%=popKind%>");
		if(checkRows == 0) {  			
  			return null;
  		}
  		else {
  			var idx=0;
	  		rArray=new Array(checkRows);
			for(var i=0; i < rows; i++) {
				if(sheetObj.GetCellValue(i, "<%=popKind%>") == 1) {
		  			cArray=null;
		  			// 특정 컬럼명이 지정된 경우
		  			if(colName != null && colName != "") {
					cArray=sheetObj.GetCellValue(i, colName);
		  			} else {
		  				cArray=new Array(colsCnt);
			  			for(var j=0; j<cArray.length; j++) {
					cArray[j]=sheetObj.GetCellValue(i, j);
	                    }
	                }
                    rArray[idx++]=cArray;
	     		}
	  		}
	  	}
	  	return rArray;
	}
<%-- 	function window::onload() {
<%
	String[] display=null; 
	/* display 옵션 String의 갯수가 3이하인 경우는 Hidden 옵션이 없으므로,  
	   아래 If 조건문에 strDisplay.length() > 3 추가(2006-10-20 by Hyung Choon Roh) */
	if(strDisplay != "none" && strDisplay != null && !strDisplay.equals("") && strDisplay.length() > 3) {
		display=strDisplay.split(","); 
	}
	for (int i=0; display != null && i<display.length; i++) {
		if (display[i].equals("0")) {
%>
		sheetObj.SetColHidden(<%= i %>,1);// 마지막컬럼인인 특정셋팅 컬럼인지는 모르겠으나 히든설정이 안되는것도 있음(수정바람~~!)
<%
	    }
	}
%>
	} --%>
-->
</SCRIPT>
<%-------------------- 공통팝업페이지에 포함할 스크립트 END --------------------%>
