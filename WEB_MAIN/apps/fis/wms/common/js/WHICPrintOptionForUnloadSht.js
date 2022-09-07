//comboObjects
var comboObjects = new Array();
var comboCnt = 0; 

/*
 * Combo Object를 배열로 등록
 */    
function setComboObject(combo_obj){
	comboObjects[comboCnt++] = combo_obj;
}
 
function loadPage() {
	
	
	//IBMultiCombo초기화
    for(var c=0; c<comboObjects.length; c++){
        initCombo(comboObjects[c], c+1);
    }
    
    //print size default value selected
    //$("#print_size_tp")[0].Code = $("#paper_size").val();
    document.form.print_size_tp.value = document.form.paper_size.value;
	//control
	initControl();


}

function doWork(srcName){
	/***** 탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한 *****/
	/*******************************************************/
	var formObj=document.form;
	try {
		switch(srcName) {
			case "CLOSE" :
				btn_Close();
				break;
			case "Print" :
				btn_Print();
				break;
		} 
	}catch(e) {
		if( e == "[object Error]") {
			//ComShowMessage(OBJECT_ERROR);
		} else {
			//ComShowMessage(e);
		}
	}
}

/**
 * Combo 기본 설정 
 * param : comboObj ==> 콤보오브젝트, comboNo ==> 콤보오브젝트 태그의 아이디에 붙인 일련번호
 * 콤보가 다수일 경우 콤보 수만큼 case를 추가하여 시트 초기화모듈을 구성한다 
 */ 
// function initCombo(comboObj, comboNo) {
//	var vTextSplit = null;
//	var vCodeSplit = null;
//	
//	switch(comboObj.id) {
//		case "print_size_tp":
//			var txt = "A4|Letter";
//			var val = "A4|LT";
//			vTextSplit = txt.split("|");
//			vCodeSplit = val.split("|");				
//			with(comboObj) {
//				comboObj.DropHeight=125;
//				for(var j=0;j<vCodeSplit.length; j++){
//					InsertItem(j,  vTextSplit[j], vCodeSplit[j]);
//				}
//				comboObj.index = 0;
//	     	} 			
//			break;
//	}
//} 
 
function initControl() {
	// axon_event.addListenerFormat('keypress', 'obj_keypress', document.getElementById("form"));
}


/*
 * Close
 */
function btn_Close(){
	ComClosePopup();
}

/*
 * Print
 */
function btn_Print(){
	var formObj=document.form;
	//--프린트 생성
	var mrd_size = "";
	if($("#print_size_tp")[0].Code == "LT")
	{
		mrd_size = "_LT";
	}
	
//	$("#com_mrdArguments").val('[' + $("#wib_bk_no").val() + ']');
//	$("#com_mrdPath").val("^@@^" + "WH_IN_WORK" + mrd_size + ".mrd");
//	ComOpenRDPopupModal("dialogWidth:750px;dialogHeight:600px;status:no");
//	
	
	var fileName ="^@@^" + "WH_IN_WORK" + mrd_size + ".mrd" ;
	var param = "^@@^" +"[" + formObj.wib_bk_no.value + "]" ;
	fileName = fileName.substring(4);
	param = param.substring(4);
	formObj.file_name.value= fileName;
	formObj.rd_param.value=param;
	popPOST(formObj, 'RPT_RD_0030.clt', 'popTest', 1025, 740);
}

