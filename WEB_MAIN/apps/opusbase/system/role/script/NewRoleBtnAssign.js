/*=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : RoleBtnAssign.js
*@FileTitle  : 롤 프로그램 매핑화면
*@author     : CLT
*@version    : 1.0
*@since      : 2014/06/04
=========================================================*/
var rtnary=new Array(1);
var callBackFunc = "";
var show_complete = "N";
var roleSheetObj;
var btnRoleCheckMsg;
function doWork(srcName){
	if(!btnGetVisible(srcName)){	//버튼의 단축키 사용가능여부 체크
		return;
	}
    var formObj=document.form;
    var sheetObj=docObjects[1];
    try {
    	switch(srcName) {
        	case 'SAVE':
        		formObj.f_cmd.value=ADD;
        		if(checkPgmBnt(sheetObj)){
        			if(confirm(getLabel('FMS_COM_CFMCON'))){
                       doProcess=true;
                       show_complete = "Y";
                       document.form.deleteButten.value = deleteButtonArr;
                       
                       //bug #2634 그리드에 데이터가 한건도 없고 제거하려는 버튼이 있는경우  버튼제거를 위해 빈로우를 생성해준다.
                       if(sheetObj.RowCount() == 0){
                    	   if(deleteButtonArr != ""){
                    		   var intRows=sheetObj.LastRow()+1;
                    		   sheetObj.DataInsert(intRows);                    		   
                    		   sheetObj.SetCellValue(intRows,"ibflag","D");
                    	   }
                       }
                       
                       sheetObj.DoSave("ProgramButtonRoleMngGS.clt", FormQueryString(formObj),"ibflag",false);
                   }
               }else{
            	   if(btnRoleCheckMsg == 1){
            		   alert(getLabel('BTN_ROLE_CHECK_MSG'));
            	   }else{
            		   alert(getLabel('BTN_ROLE_CHECK_MSG2'));
            	   }
            	   
               }
        	break;
        	
        	case 'SEARCH' :
        		var formObj=document.form;
        	    var sheetObj=docObjects[0];
        		if(formObj.f_rolecd_cd.value != ''){
        			if(form.callValue.value != formObj.f_rolecd_cd.value){
        				form.f_cmd.value=SEARCHLIST;
        				sheetObj.DoSearch("NewRoleBtnAssignGS.clt", FormQueryString(formObj) );
        			}
        			formObj.f_role_cd.value = formObj.f_rolecd_cd.value;
        		}
        		$("#dfltBtn").html("");
        		roleSheetObj.RemoveAll();
        	break;
        } // end switch
    }catch(e) {
        if(e == "[object Error]"){
        	//Unexpected Error occurred. Please contact Help Desk!
        	alert(getLabel('FMS_COM_ERR002'));
        } 
        else{
        	//System Error! + MSG
        	alert(getLabel('FMS_COM_ERR001') + " - " + e );
        }
    }
	}
//Role을 선택한경우 조회
function dispMenus(obj){
	doWork("SEARCH");
}
//--------------------------------------------------------------------------------------------------------------
//IBSheet 설정
//--------------------------------------------------------------------------------------------------------------
	var docObjects=new Array();
	var sheetCnt=0;
/**
* Sheet 기본 설정 및 초기화
* body 태그의 onLoad 이벤트핸들러 구현
* 화면을 브라우저에서 로딩한 후에 선처리해야 하는 기능을 추가한다
*/
function loadPage() {
	for(var i=0;i<docObjects.length;i++){
		//khlee-시작 환경 설정 함수 이름 변경
		comConfigSheet(docObjects[i], SYSTEM_FIS);
		initSheet(docObjects[i],i+1);
		//khlee-마지막 환경 설정 함수 추가
		comEndConfigSheet(docObjects[i]);
	}
	//roleBtnControl(document, attr1, attr2, attr3, attr4, attr5, attr6, attr7, attr8, attr9);
	// Add by pomsjung
	//roleBtnControl(document, attr1, attr2, attr3, attr4, attr5, attr6, attr7, attr8, attr9, attr_extension);
}
/**
* IBSheet Object를 배열로 등록
* 향후 다른 항목들을 일괄처리할 필요가 있을 때 배열로 담는 프로세스를 추가할 수 있다
* 배열은 소스 상단에 정의
*/
function setDocumentObject(sheet_obj){
	docObjects[sheetCnt++]=sheet_obj;
	
}
/**
 * 시트 초기설정값, 헤더 정의
 * param : sheetObj ==> 시트오브젝트, sheetNo ==> 시트오브젝트 태그의 아이디에 붙인 일련번호
 * 시트가 다수일 경우 시트 수만큼 case를 추가하여 시트 초기화모듈을 구성한다
 */
function initSheet(sheetObj,sheetNo) {
	switch(sheetNo) {
         case 1:      //IBSheet1 init
        	 with(sheetObj){
        	 SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:0, FrozenCol:6 } );

        	 var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
        	 var headers = [ { Text:getLabel('NEW_ROLE_BTN_HDR'), Align:"Center"}];
        	 InitHeaders(headers, info);

        	 var cols = [
                        {Type:"Text", Hidden:0, Width:100, Align:"Left", ColMerge:0, SaveName:"top_mnu_nm", KeyField:0, CalcLogic:"", Format:"", PointCount:0, UpdateEdit:0, InsertEdit:0},
                        {Type:"Text", Hidden:0, Width:100, Align:"Left", ColMerge:0, SaveName:"pgm_mnu_nm", KeyField:0, CalcLogic:"", Format:"", PointCount:0, UpdateEdit:0, InsertEdit:0},
                        {Type:"Text", Hidden:0, Width:220, Align:"Left", ColMerge:0, SaveName:"sub_mnu_nm", KeyField:0, CalcLogic:"", Format:"", PointCount:0, UpdateEdit:0, InsertEdit:0},
                        {Type:"Text", Hidden:1, Width:0, Align:"Center", ColMerge:0, SaveName:"pgm_id" },
                        {Type:"Text", Hidden:1, Width:0, Align:"Center", ColMerge:0, SaveName:"pgm_url" },
                        {Type:"Text", Hidden:1, Width:0, Align:"Center", ColMerge:0, SaveName:"ibflag" }
                    ];
					InitColumns(cols);
					SetEditable(1);
					SetSheetHeight($(window).height()-150);
					SetSheetWidth(450);
					SetEditable(1);
					resizeSheet();
                 }
           break;
         case 2:      //IBSheet1 init
        	 with(sheetObj){
        	 roleSheetObj = sheetObj;
        	 SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:0, FrozenCol:0} );

        	 var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
        	 var headers = [ { Text:getLabel('PGM_BTN_ROLE_HDR1'), Align:"Center"}];
        	 InitHeaders(headers, info);

        	 var cols = [
							{Type:"DelCheck", Hidden:0, Width:50, Align:"Center", ColMerge:0, SaveName:"curSelec", Sort:false},
							{Type:"Text", Hidden:1, Width:100, Align:"Left", ColMerge:0, SaveName:"btn_id", CalcLogic:"", Format:"", PointCount:0, UpdateEdit:0, InsertEdit:0, Sort:false},
							{Type:"Text", Hidden:0, Width:100, Align:"Center", ColMerge:0, SaveName:"btn_key", CalcLogic:"", Format:"", PointCount:0, UpdateEdit:0, InsertEdit:0, Sort:false},
							{Type:"Text", Hidden:1, Width:100, Align:"Left", ColMerge:0, SaveName:"btn_pos",  CalcLogic:"", Format:"", PointCount:0, UpdateEdit:0, InsertEdit:0, Sort:false},
							{Type:"Int", Hidden:0, Width:60, Align:"Center", ColMerge:0, SaveName:"srt_seq", CalcLogic:"", Format:"", PointCount:0, UpdateEdit:1, InsertEdit:1},
							{Type:"Combo", Hidden:0, Width:60, Align:"Left", ColMerge:0, SaveName:"mst_be", CalcLogic:"", Format:"", PointCount:0, UpdateEdit:0, InsertEdit:0, Sort:false},
							{Type:"Combo", Hidden:0, Width:120, Align:"Left", ColMerge:0, SaveName:"css_clss", CalcLogic:"", Format:"", PointCount:0, UpdateEdit:1, InsertEdit:1, Sort:false},
							{Type:"Text", Hidden:0, Width:60, EditLen :1, Align:"Left", ColMerge:0, SaveName:"btn_grp", CalcLogic:"", Format:"", PointCount:0, UpdateEdit:1, InsertEdit:1, Sort:false},
							{Type:"Combo", Hidden:1, Width:80, Align:"Left", ColMerge:0, SaveName:"use_flg", CalcLogic:"", Format:"", PointCount:0, UpdateEdit:1, InsertEdit:1, Sort:false},
							{Type:"Combo", Hidden:1, Width:80, Align:"Left", ColMerge:0, SaveName:"init_disp", CalcLogic:"", Format:"", PointCount:0, UpdateEdit:1, InsertEdit:1, Sort:false},
							{Type:"Text", Hidden:0, Width:100, Align:"Left", ColMerge:0, SaveName:"rmk", CalcLogic:"", Format:"", PointCount:0, UpdateEdit:0, InsertEdit:0, Sort:false},
							{Type:"Combo", Hidden:1, Width:110, Align:"Left", ColMerge:0, SaveName:"lnk_prmtr", CalcLogic:"", Format:"", PointCount:0, UpdateEdit:0, InsertEdit:0, Sort:false},
							{Type:"Text", Hidden:1, Width:100, Align:"Left", ColMerge:0, SaveName:"btn_actin", CalcLogic:"", Format:"", PointCount:0, UpdateEdit:0, InsertEdit:0, Sort:false},
							{Type:"Text", Hidden:1, Width:0, Align:"Center", ColMerge:0, SaveName:"pgm_id", Sort:false},
							{Type:"Text", Hidden:1, Width:0, Align:"Center", ColMerge:0, SaveName:"rgst_ofc_cd", Sort:false},
							{Type:"Status", Hidden:1, Width:0, Align:"Center", ColMerge:0, SaveName:"ibflag", Sort:false}
                    ];
				   InitColumns(cols);
	  	           SetEditable(1);
	  	           SetSheetHeight($(window).height()-150);
	  	           SetSheetWidth(570);
	  	           SetColProperty("use_flg", {ComboText:"Y|N", ComboCode:"Y|N"} );
	  	           SetColProperty("mst_be", {ComboText:"Y|N", ComboCode:"Y|N"} );
	  	           SetColProperty("lnk_prmtr", {ComboText:"Y|N", ComboCode:"Y|N"} );
	  	           SetColProperty("init_disp", {ComboText:"Y|N", ComboCode:"Y|N"} );
	  	           SetColProperty("css_clss", {ComboText:btCssName, ComboCode:btCssCode} );
                 }
           break;
    }
}

function resizeSheet() {
	ComResizeSheet(docObjects[0]);
}

var cur_row

function sheet1_OnClick(sheetObj,Row,Col){
	roleSheetObj.RemoveAll();
	form.f_cmd.value=SEARCHLIST;
	cur_row = Row;
	var pgmId=sheetObj.GetCellValue(cur_row, "pgm_id");
	var pgmUrl=sheetObj.GetCellValue(cur_row, "pgm_url");

	form.p_pgm_id.value=pgmId;

	// Role에 등록된 버튼
	if(roleSheetObj){
		var opt = {Sync : 1 };
		//roleSheetObj.DoSearch("ProgramButtonRoleMngGS.clt", FormQueryString(form),opt);
	}
	
	// 버튼 생성에 필요한 데이터.
	if($("#f_rolecd_cd").val() != ""){
		ajaxSendPost(selectProgramButtonLocal, 'reqVal', '&goWhere=aj&bcKey=selectProgramButton&roleBtn=Y&pgmId='+pgmId+'&role='+$("#f_rolecd_cd option:selected").val()+"&isAdm=Y", './GateServlet.gsl');
	}
}

function sheet2_OnChange(sheetObj,Row,Col){
	if(Col==6){
//		var checkVal = sheetObj.Rows[Row].C8+"";
		var checkVal = sheetObj.GetCellValue(Row, "btn_grp");
//		if(sheetObj.Rows[Row].C8){
			if(checkVal.match(RegExp("[A-Z]")) || checkVal.match(RegExp("[a-z]"))){
				if(checkVal.match(RegExp("[a-z]"))){
					sheetObj.SetCellValue(Row, "btn_grp", checkVal.toUpperCase());
				}
			}else{
				sheetObj.SetCellValue(Row, "btn_grp", "");
			}
//		}
	}
}

var buttonAllArr = [];
var buttonArr = [];
var buttonIdx = [];
var selectButtonArr = [];
var selectButtonIdx = [];
var tempData=[];
var deleteButtonArr = [];
function selectProgramButtonLocal(rtnVal){
	var doc=getAjaxMsgXML(rtnVal);

	// PGM_BTN에 등록된 리스트
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			if(doc[1] != "-1"){
				var arrData = JSON.parse(doc[1]);
				buttonAllArr = arrData;
				if(buttonAllArr.length > 0){
					setActionButtonLocal();
				}
			}
		}
	}

}
function setActionButtonLocal(){
	$("#dfltBtn").html("");
	var defaultSetting = false;
	$.each(buttonAllArr,function(index, value){
		if(value.role_btn_yn == 'N' || value.role_btn_yn == 'I'){
			$("#dfltBtn").append("<option value='"+value.btn_id+"'>"+value.btn_key+"</option>");
		}else{
			selectButtonArr.push(value);
			defaultSetting = true;
		}
	});
	if(defaultSetting){
		moveList('add', 'default')
	}
}
function setBtnCodeVal(obj){
	selectButtonArr = [];
	selectButtonIdx = [];
	var selectBoxObj;
	if(obj){
		selectBoxObj = $("#dfltBtn option")
	}else{
		selectBoxObj = $("#dfltBtn option:selected")
	}

	$.each(selectBoxObj, function(index, button){
		//#1949 [CARGOZONE] BUTTON ROLE MANAGEMENT SAVE ERROR
		selectButtonArr.push(buttonAllArr.filter(function(idx){ return idx.btn_id == button.value }))
		selectButtonIdx.push(button.index);
	});

}
var colName = {"C2":"btn_id","C3":"btn_key","C4":"btn_pos","C5":"srt_seq","C6":"mst_be","C7":"css_clss","C8":"btn_grp","C9":"use_flg","C10":"init_disp","C11":"rmk","C12":"lnk_prmtr","C13":"btn_actin","C14":"pgm_id", "C15":"ibflag"};
var orgColName = {"C2":"btn_id","C3":"btn_key","C4":"btn_pos","C5":"pb_srt_seq","C6":"mst_be","C7":"pb_css_clss","C8":"pb_btn_grp","C9":"pb_use_flg","C10":"init_disp","C11":"rmk","C12":"lnk_prmtr","C13":"btn_actin","C14":"pgm_id", "C15":"ibflag"};
function moveList(action, selectItem){
	var defaultSetting;
	if(action == "add"){
		if(selectItem){
			if(selectItem == 'all'){
				setBtnCodeVal(selectItem);
			}else{
				defaultSetting = true;
			}
		}
		if(selectButtonArr.length > 0){
			$.each(selectButtonArr, function(idx, item){
				var intRows=roleSheetObj.LastRow()+1;
				
				roleSheetObj.DataInsert(intRows);
				$.each(roleSheetObj.Cols, function(idx1, item1){
					if(colName[idx1]){
						var colValue
						if(defaultSetting){
							if(item[colName[idx1]]){
								colValue = item[colName[idx1]].trim();
							}
						}else{
							if(item[0][orgColName[idx1]]){
								colValue = item[0][orgColName[idx1]].trim();
							}
						}
						if(idx1 == "C9"){
							colValue = 'Y';
						}
						roleSheetObj.SetCellValue(intRows, idx1, colValue);
					}
				});
				var roleBtnYn;
				if(defaultSetting){
					roleBtnYn = item.role_btn_yn;
				}else{
					roleBtnYn = item[0].role_btn_yn;
				}
				
				if(roleBtnYn == 'I'){
					roleSheetObj.SetCellValue(intRows, "ibflag", "I");
				}else{
					roleSheetObj.SetCellValue(intRows, "ibflag", "U");
				}
				deleteButtonArr.splice(deleteButtonArr.indexOf(item.btn_id),1)
				
			});
			if(!defaultSetting){
				if(selectItem == 'all'){
					var optionLength = $("#dfltBtn option").length - 1;
					$.each($("#dfltBtn option"), function(idx, item){
						$("#dfltBtn option:eq("+ (optionLength - idx)+")").remove();
					});
					
				}else{
					var deleteIdx;
					$.each(selectButtonIdx, function(idx, item){
						if(idx == 0){
							deleteIdx = item;
						}
						$("#dfltBtn option:eq("+deleteIdx+")").remove();
					});
				}
			}
			selectButtonArr = [];
		}
	}else{
		tempData = [];
		if(selectItem){
			var deleteBtnId="";
			if(roleSheetObj.RowCount() > 0){
				var rowCnt = roleSheetObj.RowCount();
				$.each(roleSheetObj.Rows, function(idx, item){
					if(idx <= rowCnt){
						$("#dfltBtn").append("<option value='"+item.C2+"'>"+item.C3+"</option>");
						deleteButtonArr.push(item.C2);
					}
				});
				
				roleSheetObj.RemoveAll();
			}
		}else{
			$.each(roleSheetObj.Rows, function(idx, item){
				if(item.C1 == 1){
					$("#dfltBtn").append("<option value='"+item.C2+"'>"+item.C3+"</option>");
					deleteButtonArr.push(item.C2);
					roleSheetObj.RowDelete(item.ibidx);
				}
			});
		}
	}

}

function checkPgmBnt(sheetObj2){
	var groupArr = []; 
	var groupAll = [];
	var retValue = true;
	
	// 등록 된 모든 버튼 
	$.each(sheetObj2.Rows, function(idx, item){
		if(idx <= sheetObj2.RowCount()){
			var group = new Object();
			group.id = item.C8;
			group.seq = item.C5;
			group.must_bt = item.C6;
			groupAll.push(group);
			
			if (item.C8) {
				
				var matched = false;
				
				$.map(groupArr, function(arr, arrIdx) {
					 if (arr.id == item.C8) {
					   arr.cnt += 1;
					   matched = true;
					 }
				})
				
				if (!matched){
					 group.cnt = 1;
					 groupArr.push(group);
				}
			}
		}
	});
	
	// seq로 재정렬
	groupAll.sort(function(a,b){ return a.seq < b.seq ? -1 : a.seq > b.seq ? 1 : 0;})
	
	if (groupArr.length > 0) {
		var groupCnt = 0;
		var chkID = '';
		var chkCnt = 0;
		var found = false;

		$.each(groupArr, function(idx, item){
			//groupCnt = item.cnt;
			//chkID = item.id;
			chkCnt = 0;
			found = false;
			
			$.each(groupAll, function(idxAll, itemAll){
				if (itemAll.id == item.id){
					found = true;
					chkCnt++;
				} else {
					if (found){
						if (chkCnt != item.cnt){
							retValue = false;
							btnRoleCheckMsg = 1;
							return false;	
						} else {
							return true;
						}						
					}
				}
				if(itemAll.id){
					if(itemAll.must_bt != 'N'){
						retValue = false;
						btnRoleCheckMsg = 2;
						return false;
					}
				}
			})			
		})			
	}

	return retValue;
}
