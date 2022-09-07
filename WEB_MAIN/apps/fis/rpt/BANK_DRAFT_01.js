function doWork(srcName){
	var formObj = document.form;
    switch(srcName) {
		case 'Print':
			for(var i = 0 ; i < formObj.f_to_radio.length ; i++){
				if(formObj.f_to_radio[i].checked == true){
					formObj.f_to_type.value = formObj.f_to_radio[i].value;
					break;
				}
			}
			
			formObj.cmd_type.value = '64';
			
			popPOST(form, 'RPT_PRN_0010.clt', 'popTest', 1025, 740);
		break;
		
		case "CLOSE":
	    	window.close();
    	break;
    	
    }
}



function loadPage(){
	var formObj = document.form;
	
	formObj.cmd_type.value = '64';
	popPOST(form, 'RPT_PRN_0010.clt', 'popTest', 1025, 740);
	
	window.close();
}