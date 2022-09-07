function doWork(srcName){
	var formObj=document.frm1;
	
    switch(srcName) {
		case 'Print':
			$("input[name='title']").val("DISCLAIMER / GUARANTEE OF CHARGES");
			$("input[name='file_name']").val("disclaimer.mrd");

			var intgBlSeq = $("input[name='intg_bl_seq']").val();
			var refNo = $("input[name='f_ref_no']").val();
			var hblNo = $("input[name='f_bl_no']").val();
			var dsclm_rmk = $("textarea[name='dsclm_rmk']").val();
			var cntr = $("input[name='cntr']").val();
			
			//Parameter Setting
			var param = "[" + intgBlSeq + "]";
			param +="[" + refNo + "]";
			param += "[" + hblNo + "]";
			param += "[" + dsclm_rmk + "]";
			param += "[" + cntr + "]";
			param += "[" + usrnm + "]";
			
			formObj.rd_param.value=param;
			
			popPOST(formObj, "RPT_RD_0010.clt", "popTest", 1025, 740);
		break;
		
		case "CLOSE":
			window.close(); 
		break;
	}
}