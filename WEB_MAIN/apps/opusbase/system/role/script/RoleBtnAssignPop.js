/*=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : 
*@FileTitle  : 
*@author     : CLT
*@version    : 1.0
*@since      : 2015/03/11
=========================================================*/
var pgm_seq = null;
var btn_tp_cd = null;
var role_cd = null;
var attr_extension = null;

function doWork(srcName){
    var formObj=document.frm1;
    pgm_seq = formObj.pgm_seq.value;
    btn_tp_cd = formObj.btn_tp_cd.value;
    btn_nm = formObj.btn_nm.value;
	
    try {
        switch(srcName) {
	        case "SEARCHLIST":
	        	alert("SEARCHLIST");
	        	break;    
    	   case "APPLY":
    		   var retArray="";
    		   var elms = formObj.usrSetBtn.options;
    		   
    		   for( i = 0, k = elms.length; i < k; i++ ) {
                   retArray += retArray != "" ? "," + elms[i].value: elms[i].value;
               }
    		   ComClosePopup(retArray);
               break;
    	   case "CLEAR":
    		   initBtnCodeVal();	
    		   break;
           case "SAVE":
        	   if(btn_tp_cd=="" || btn_nm==""){
        		   alert(getLabel('FMS_COM_ALT010'));
        		   return;
        	   }else{
        		   if(confirm(getLabel('FMS_COM_CFMSAV'))){
        			   ajaxSendPost(addBtnAction, 'reqVal', '&goWhere=aj&bcKey=getPgmBtnChk&pgm_seq='+pgm_seq+'&btn_tp_cd='+btn_tp_cd, './GateServlet.gsl');
        		   }
        	   	   break;
        	   }
    	   case "ADD":
    		   var reg_id = formObj.user_id.value;
    		   var ofc_cd = formObj.ofc_cd.value;
    		   var param = null;
    		   
    		   param =	'&pgm_seq=' + pgm_seq;
    		   param +=	'&btn_tp_cd=' + btn_tp_cd;
    		   param +=	'&btn_nm=' + btn_nm;
    		   param +=	'&reg_id=' + reg_id;
    		   param +=	'&ofc_cd=' + ofc_cd;
    		   
    		   ajaxSendPost(refreshBtnMenu, 'reqVal', '&goWhere=aj&bcKey=addPgmBtn' + param, './GateServlet.gsl');
    	   	   break;
    	   case "MODIFY":
    		   doShowProcess();
    		   ajaxSendPost(refreshBtnMenu, 'reqVal', '&goWhere=aj&bcKey=updatePgmBtnNm&pgm_seq='+pgm_seq+'&btn_tp_cd='+btn_tp_cd+'&btn_nm='+btn_nm, './GateServlet.gsl');
    	   	   break;	   
    	   case "DELETE":
    		   if(btn_tp_cd=="" || btn_nm==""){
        		   alert(getLabel('FMS_COM_ALT004'));
        		   return;
        	   }else{
        		   if(confirm(getLabel('FMS_COM_CFMDEL'))){
        			   if($("select option[value='"+ btn_tp_cd +"']").val() == ""){
                		   alert(getLabel('FMS_COM_ALT010'));
                		   return;
                	   }
            		   
            		   $("select option[value='"+ btn_tp_cd +"']").remove();
            		   
            		   var param = null;
            		   
            		   param =	'&pgm_seq=' + pgm_seq;
            		   param +=	'&btn_tp_cd=' + btn_tp_cd;
            		   param +=	'&role_cd=' + role_cd;
            		   
            		   ajaxSendPost(refreshBtnMenu, 'reqVal', '&goWhere=aj&bcKey=removePgmBtn' + param, './GateServlet.gsl');
	   	 			}
        	   }
    		   
    		   break;	   
       	   case "CLOSE":
       	    	ComClosePopup();

        } // end switch
	}catch(e) {
        if(e == "[object Error]"){
        	//Unexpected Error occurred. Please contact Help Desk!
        	alert(getLabel('FMS_COM_ERR002') + "\n\n: CMM_POP_0010.001");
        } 
        else{
        	//System Error! + MSG
        	alert(getLabel('FMS_COM_ERR001') + " - " + e + "\n\n: CMM_POP_0010.002");
        }
	}
}

function loadPage() {
	var formObj=document.frm1;
	formObj.pgm_seq.value = parent.rtnary[0];
	formObj.attr_extension.value = parent.rtnary[1];
	formObj.role_cd.value = parent.rtnary[2];
	
	pgm_seq = parent.rtnary[0];
	role_cd = parent.rtnary[2];
	attr_extension = parent.rtnary[1];
	
	ajaxSendPost(getBtnSeqOption, 'reqVal', '&goWhere=aj&bcKey=getPgmBtnSeq&pgm_seq='+pgm_seq+'&role_cd='+role_cd+'&attr_extension='+attr_extension, './GateServlet.gsl');
	
	//로그인 유저가 CLT MASTER가 아닐 경우 버튼 등록/수정/삭제 창 숨김 처리
	var user_cd = formObj.user_cd.value
	if(user_cd != "Master"){
		$("#btnEditer").hide();
	}
}

function initBtnCodeVal(){
	var formObj=document.frm1;
	
	formObj.btn_tp_cd.value = '';
	formObj.btn_nm.value = '';
}

function setBtnCodeVal(btnTpCd, btnName){
	var formObj=document.frm1;
	
	formObj.btn_tp_cd.value = btnTpCd;
	formObj.btn_nm.value = btnName;
}

/*
*Source Select의 요소(option)를 Target Select로 이동한다.
*/
function moveList(callFrom, sourceObj, targetObj){
    var elms = sourceObj.options;
    var targetelms = targetObj.options;
    var idx = sourceObj.selectedIndex;
    if(callFrom=='USRD_ALL'||callFrom=='DFLT_ALL'){
        idx = 9999;
    }
    
    if(idx< 0 || idx == null){
            return;
    }else{
        if(callFrom=='USRD_ALL'||callFrom=='DFLT_ALL'){
            for( i = 0, k = elms.length; i < k; i++ ) {
                var oOption = document.createElement("OPTION");
                targetObj.options.add(oOption);
                oOption.innerHTML = elms[i].text;
                oOption.value = elms[i].value;
            }

            //삭제
            for( i = elms.length-1; i >=0; i--) {
                sourceObj.remove(i);
            }        
        }else{
            var inIdx  = 0;
            var itmArr = new Array();
            for( i = 0, k = elms.length; i < k; i++ ) {
                if(elms[i].selected){
                    itmArr[inIdx++] = elms[i];
                }
            }
            
            //원본삭제
            for(var j = inIdx-1; j >=0; j--){
                for( i = 0, k = elms.length; i < k; i++ ) {
                    if(itmArr[j]==elms[i]){
                        sourceObj.remove(i);
                    }
                }
            }
            
            //복사
            var tgtIdx = targetObj.selectedIndex;
            var isAdd = true;
            if(tgtIdx==-1){
                isAdd = false;
            }else{
                tgtIdx++;
            }
            
            for(var i = 0; i < itmArr.length; i++){
                //Target에 복사함
                var oOption = document.createElement("OPTION");
                
                if(isAdd){
                    targetObj.options.add(oOption, tgtIdx++);
                }else{
                    targetObj.options.add(oOption);
                }
                oOption.innerHTML = itmArr[i].text;
                oOption.value = itmArr[i].value;            
            }
        }
    }
}

function getBtnSeqOption(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK' && doc[1] != '' && doc[1] !='undefined'){
		var options = doc[1].split("@@^");
		
		$("#dfltBtn").append(options[0]);
		$("#usrSetBtn").append(options[1]);
	}
}

function addBtnAction(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK' && doc[1] != '' && doc[1] !='undefined'){
		if(doc[1] == 'ADD'){
			doWork('ADD');
		}else{
			doWork('MODIFY');
		}
	}
}

function refreshBtnMenu(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK' && doc[1] != '' && doc[1] !='undefined'){
		if(doc[1] == "SUCCESS"){
			attr_extension = "";
			
			for(var i = 0; i < $("#usrSetBtn option").size(); i++){
				attr_extension += $("#usrSetBtn option").eq(i).val();
				if(i + 1 < $("#usrSetBtn option").size()){
					attr_extension += ",";
				}
			}
			$("#dfltBtn").empty();
			$("#usrSetBtn").empty();

			ajaxSendPost(getBtnSeqOption, 'reqVal', '&goWhere=aj&bcKey=getPgmBtnSeq&pgm_seq='+pgm_seq+'&role_cd='+role_cd+'&attr_extension='+attr_extension, './GateServlet.gsl');
			alert(getLabel('FMS_COM_NTYCOM'));
		}
	}
}

