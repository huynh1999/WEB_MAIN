function doWork(srcName){ 
    var formObj=document.frm1;
    switch(srcName) {
       	case "SAVE":
       		ComClosePopup(formObj.f_qry.value);
       	break;
       	case "CANCEL":
       		ComClosePopup();
       	break;  
    }
}
/**
 * Sheet 기본 설정 및 초기화
 * body 태그의 onLoad 이벤트핸들러 구현
 * 화면을 브라우저에서 로딩한 후에 선처리해야 하는 기능을 추가한다
 */
function loadPage() {
	var formObj=document.frm1;
	var arg=parent.rtnary;
    formObj.f_qry.value=arg[0]; 	
}