/**
 * 화면로드 후 초기값 세팅
 */

function loadPage() {
    var arg=parent.rtnary;
    for(var i=0; i<arg.length; i++){
    	frm1.val_msg.value += ((i+1) + ". " + arg[i] + "\n");
    }
}

function doWork(srcName){
	switch(srcName) {
		case "CLOSE":	//팝업종료
			ComClosePopup();
		break;
	}
}
