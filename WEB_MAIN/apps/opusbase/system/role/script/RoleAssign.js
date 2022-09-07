/*=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : SYS_ROL_0020.js
*@FileTitle  : 롤 프로그램 매핑화면
*@author     : CLT
*@version    : 1.0
*@since      : 2014/06/04
=========================================================*/
function doWork(srcName){
	if(!btnGetVisible(srcName)){	//버튼의 단축키 사용가능여부 체크
		return;
	}
    var formObj=document.form;
    try {
        switch(srcName) {
        	case "POP":		//롤관리 팝업호출
        		popGET('./RoleMng.clt', '', 800, 500);
        	break;
        	case 'ADD':		//롤관리 팝업호출
        		if(formObj.f_rolecd_cd.value==''){
        			//Please select a rule!
        			alert(getLabel('FMS_COM_ALT004'));
        			return;
        		}else{
        			//Do you want to proceed?
                    if(confirm(getLabel('FMS_COM_CFMSAV'))){
	                    doShowProcess();
		        		formObj.f_cmd.value=ADD;
		        		formObj.submit();
	        		}
        		}
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
	if(obj.value!=''){
		if(form.callValue.value!=obj.value){
			//Process Bar 
     	    doShowProcess();
			form.f_cmd.value=SEARCHLIST;
			form.submit();		
		}
	}
}
function folder_toggle(level1_seq, level2_seq, level){
	if(level == 1){
		var folder_icon="folder_icon_"+level1_seq;
		var folder_icon=document.getElementsByName(folder_icon);
		for(var i=1;i<folder_icon.length;i++){
			if(folder_icon[i].style.display != 'none'){
				folder_icon[i].style.display='none';
			}else{	
				folder_icon[i].style.display='block';
			}	
		}
	}
	if(level == 2){
			var file_icon="file_icon_"+level1_seq+"_"+level2_seq;
			var file_icons=document.getElementsByName(file_icon);
			for(var i=0;i<file_icons.length;i++){
				if(file_icons[i].style.display != 'none'){
					file_icons[i].style.display='none';
				}else{	
					file_icons[i].style.display='block';
				}	
			}
	}
}
var menuCnt=200;   //100 ->200 기존 화면중 100 넘은것들에 대하여 인식이 안됨 20150302 Skwoo
var pgmCnt=1500;   //900 ->999  기존 화면중 900 넘은것들에 대하여 인식이 안됨. 999 넘은 것들이 발생하여 전체 체크가 되지 않음. 1,500으로 변경. 2016.03.02 
function selectCheckBox(bChecked, level){
	
	var formObj=document.form;
	var level=level.split("_");
	var level1MenuSeq=level[0];
	var level2MenuSeq=level[1];
	var level3MenuSeq=level[2];
	var menuSeq="";
	var pgmSeq="";
	var level1Checked=false;
	var level2Checked=false;
	
	if(level[1] == "" && level[2] == ""){   //first level node
		for(var i=0; i<menuCnt; i++){
			menuSeq="menuSeq_" + level[0] + "_" + i + "_";
			//Level1 Checkbox Control			
			if(document.getElementById(menuSeq) != null){			 
				document.getElementById(menuSeq).checked=bChecked;
				//Level2 Checkbox Control
				for(var j=0; j<pgmCnt; j++){
					pgmSeq="pgmSeq_" + level[0] + "_" +  i + "_" +  j;
					if(document.getElementById(pgmSeq) != null){
						document.getElementById(pgmSeq).checked=bChecked;
					}
				}
			}
		}
	}
	//Level2 check
	if(level[1] != "" && level[2] == ""){   //Second level node
		//Level3 Checkbox Control
		for(var i=0; i<pgmCnt; i++){
			pgmSeq="pgmSeq_" + level[0] + "_" +  level[1] + "_" +  i;
			if(document.getElementById(pgmSeq) != null){
				document.getElementById(pgmSeq).checked=bChecked;
			}
		}
		//Level1 Checkbox Control
		if(!bChecked){ 
			for(var i=0; i<menuCnt; i++){
				menuSeq="menuSeq_" + level[0] + "_" + i + "_";
				//Level1 Checkbox Control
				if(document.getElementById(menuSeq) != null && document.getElementById(menuSeq).checked){
					level1Checked=true;
				}
			}
			document.getElementById("menuSeq_" + level[0] + "__").checked=level1Checked;
		}else{
			document.getElementById("menuSeq_" + level[0] + "__").checked=true;
		}
	}
	//Level3 check
	if(level[1] != "" && level[2] != ""){   // Third level node
			//Level1 check		
		if(bChecked){
			 document.getElementById("menuSeq_" + level[0] + "_" + level[1] + "_").checked=true;
			 document.getElementById("menuSeq_" + level[0] + "__").checked=true;
		}else{
			for(var i=0; i<pgmCnt; i++){
				if(document.getElementById("pgmSeq_" + level[0] + "_" + level[1] + "_" + i)!=null && document.getElementById("pgmSeq_" + level[0] + "_" + level[1] + "_" + i).checked){
					level2Checked=true;
					break;
				}
			}
			//alert(level2Checked);
			document.getElementById("menuSeq_" + level[0] + "_" + level[1] + "_").checked=level2Checked;
			//alert();
			for(var i=0; i<menuCnt; i++){
				menuSeq="menuSeq_" + level[0] + "_" + i + "_";
				if(document.getElementById(menuSeq) != null && document.getElementById(menuSeq).checked){
					level1Checked=true;
					break;
				}
			}
			document.getElementById("menuSeq_" + level[0] + "__").checked=level1Checked;
		}	
	}
}
/**
* Sheet 기본 설정 및 초기화
* body 태그의 onLoad 이벤트핸들러 구현
* 화면을 브라우저에서 로딩한 후에 선처리해야 하는 기능을 추가한다
*/
function loadPage() {
	var formObj=document.form;
	if(formObj.save_yn.value == "Y"){
		//alert(getLabel('FMS_COM_NTYCOM'));
		/* LHK 20130822 #19443 Save & Complete Alert message 변경 */
		//showCompleteProcess();
	}
}
