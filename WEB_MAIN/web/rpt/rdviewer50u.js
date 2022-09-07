var RDServer  = "/rfn [http://"+location.host+"/RDServer/rdagent.jsp]";  //RDServer RDAgnet url
var RD_path   = "http://"+location.host+"/fms/apps/fis/rpt/mrd/";            // Report file 위치
var URL       = "./web/rpt/cab" ;         // report 컴포넌트 다운로드 위치
//var RdReport = "/fwd/report/jsp/rdReport.jsp" ;            // popup 으로 rd를 호출하는 공통 파일

var parmModalObj = window.dialogArguments;                 // modal 로 넘겨준 param 정보

// RDVistaSupport.dll Security Patch 2017.06.15
function comRdVistaObject(){
	document.write('<object');
	document.write('   id=RDVistaSupport');
	document.write('   classid="clsid:1F84CC38-1227-4D76-A4E3-E48AE0714178"');
	document.write('   width=0%');
	document.write('   height=0%');
	document.write('   codebase="' + URL + '/RDVistaSupport.cab#version=1,0,0,22">');
	document.write('</OBJECT>');
}

function comRdObject(id){
	document.write('<OBJECT id="'+ id + '"');
	document.write('  classid="clsid:5A7B56B3-603D-4953-9909-1247D41967F8"');
	document.write('  codebase="'+ URL + '/rdviewer50u.cab#version=5,0,0,437"');
	document.write('   width="100%" height="100%">');
	document.write(' <param name="Visible" value="false"> ');
	document.write(' <param name="UseUTF8" value="true"> ');
	document.write(' <param name="AutoSizeMode" value="true"> ');
	document.write('</OBJECT>');

	comRdVistaObject();
	setrdObject(eval("document.all."+id));
}

function setrdObject(rd_obj){
	rdObjects[rdCnt++] = rd_obj;
}

function comRdObjectPopup(id){
	document.write('<OBJECT id="'+ id + '"');
	document.write('  classid="clsid:5A7B56B3-603D-4953-9909-1247D41967F8"');
	document.write('  codebase="'+ URL + '/rdviewer50u.cab#version=5,0,0,437"');
	document.write('   width="100%" height="100%">');
	document.write('</OBJECT>');

	comRdVistaObject();
}

function comTChartObject(){
	document.write('<object ');
	document.write('   width=0%');
	document.write('   height=0%');
	document.write('   classid="CLSID:FAB9B41C-87D6-474D-AB7E-F07D78F2422E"');
	document.write('  codebase="' + URL + '/teechart7.cab#version=7,0,1,5">');
	document.write('</object>');
	
	comRdVistaObject();
}

function comRdpdfObject(){
	document.write('<object');
	document.write('   id=rdpdf50');
	document.write('   classid="clsid:0D0862D3-F678-48B5-876B-456457E668BC"');
	document.write('   width=0%');
	document.write('   height=0%');
	document.write('   codebase="' + URL + '/rdpdf50.cab#version=2,1,0,64">');
	document.write('</OBJECT>');
	
	comRdVistaObject();
}

function comRdbarcodeObject(){
	document.write('<object');
	document.write('   id=rdbarcode5');
	document.write('   classid="clsid:AA30E61C-DBC4-4DF6-B2CC-FAE39282CF56"');
	document.write('   width=0%');
	document.write('   height=0%');
	document.write('   codebase="' + URL + '/rdbarcode5.cab#version=5,5,1,54">');
	document.write(' </object>');
	
	comRdVistaObject();
}

// 폼태그의 모든 컨트롤 데이타를 name[value] 포맷으로 가져오기
function RD_FormQueryString(form , no ) {
  if (typeof form != "object" || form.tagName != "FORM") {
	alert("FormQueryString함수의 인자는 FORM 태그가 아닙니다.");
	return "";
  }

	var name = new Array(form.elements.length);
	var value = new Array(form.elements.length);
	var j = 0;
	var plain_text="";

	//사용가능한 컨트롤을 배열로 생성한다.
	len = form.elements.length;
	for (i = 0; i < len; i++) {
	  //클래스 아이디로 제품을 구분함-아래는 HTMl제품
	  if(form.elements[i].classid==undefined){

	  switch (form.elements[i].type) {
		case "button":
		case "reset":
		case "submit":
		  break;
		case "radio":
		case "checkbox":
					if (form.elements[i].checked == true) {
						name[j] = form.elements[i].name;
						value[j] = form.elements[i].value;
						j++;
					}
					break;
			case "select-one":
					name[j] = form.elements[i].name;
					var ind = form.elements[i].selectedIndex;
					if(ind >= 0) {
						if (form.elements[i].options[ind].value != '')
							value[j] = form.elements[i].options[ind].value;
						else
							value[j] = '';
					} else {
						value[j] = "";
					}
					j++;
					break;
			case "select-multiple":
					name[j] = form.elements[i].name;
					var llen = form.elements[i].length;
					var increased = 0;
					for( k = 0; k < llen; k++) {
						if (form.elements[i].options[k].selected) {
							name[j] = form.elements[i].name;
							if (form.elements[i].options[k].value != '')
								value[j] = form.elements[i].options[k].value;
							else
								value[j] = '';
							j++;
							increased++;
						}
					}
					if(increased > 0) {
						j--;
					} else {
						value[j] = "";
					}
					j++;
					break;
				default :
					name[j] = form.elements[i].name;
					value[j] = form.elements[i].value;
					j++;
		}
	//IB에서 제공하는 컨트롤의 값을 조합한다.
	}else{
	  switch(form.elements[i].classid){
		case "CLSID:BFED6FBB-30E3-4402-B5D6-C31F40B56A0E":  // IBMaskEdit 경우
		  name[j] = form.elements[i].name==""?form.elements[i].id:form.elements[i].name;
				value[j] = form.elements[i].Value;
				j++;
		  break;
		case "CLSID:0B0683AE-1FB7-438f-AA3C-087E11C8AE2D": // IBMultiCombo 경우
		  name[j] = form.elements[i].name==""?form.elements[i].id:form.elements[i].name;
				value[j] = form.elements[i].Code;
				j++;
				break;
	  }
	}
	}

  //QueryString을 조합한다.
	for (i = 0; i < j; i++) {
		 if (name[i] != '') plain_text += "frm" + no + "_" + name[i]+ "[" + value[i] + "] ";
	}

  //마지막에 &를 없애기 위함
  if (plain_text != "")
	plain_text = plain_text.substr(0, plain_text.length -1);
	return plain_text;
}


// Sheet 에서 xml data 가져오기
function RD_GetDataSearchXml(sheet_obj,no)  {

  //함수 인자 유효성 확인
  if (typeof sheet_obj != "object" || sheet_obj.tagName != "OBJECT") {
	alert("Data2SearchXml 함수의 sheet_obj 인자는 IBSheet가 아닙니다.");
	return "";
  }

  var rowXml = "";
  var allXml = "<SHEET" + no + ">  <DATA TOTAL='"+ sheet_obj.TotalRows +"'>";

  var rowcount = sheet_obj.RowCount + sheet_obj.headerRows - 1;
  for (ir = sheet_obj.HeaderRows; ir <= rowcount; ir++) {
	rowXml = "<TR>";
	for (ic = 0; ic<= sheet_obj.LastCol; ic++) {
	  rowXml += "<TD><![CDATA[" + sheet_obj.CellValue(ir,ic) + "]]></TD>";
	}
	rowXml += "</TR>";

	allXml += rowXml;
  }

  allXml += "  </DATA></SHEET" + no + ">";

  return allXml;
}

 /**
  * Report 모달창을 화면의 중앙에 활성화 한다.
  */
 function rdObjModal(sURL,parmObj,sWidth,sHeight) {
 // preSet
  parmObj['FORM'] = document.form;

  var height = screen.height;
  var width = screen.width;
	 var leftpos = width/2 - sWidth/2;
  var toppos = height/2 - sHeight/2;

  if(leftpos<0) leftpos=0;

	 if(toppos<0) toppos=0;

  var sFeatures = new Array();

  sFeatures[0] = (sWidth > 0)? "dialogWidth:"+sWidth+"px":"dialgWidth:300px";
  sFeatures[1] = (sHeight > 0)? "dialogHeight:"+sHeight+"px":"dialogHeight:300px";
  sFeatures[2] = (toppos > 0)? "dialogTop:"+toppos+"px":"";
  sFeatures[3] = (leftpos > 0)? "dialogLeft:"+leftpos+"px":"";
  sFeatures[4] = (!toppos && !leftpos)? "center:Yes":"";
  sFeatures[5] = "resizeable:No";
  sFeatures[6] = "help:No";
  sFeatures[7] = "status:No";
  sFeatures[8] = "center:Yes;";

  sFeatures = sFeatures.join(";");

  window.showModalDialog(sURL,parmObj,sFeatures);
 }


 /**
  * Report modaless창을 화면의 중앙에 활성화 한다.
  */
 function rdObjModaless(sURL,parmObj,sWidth,sHeight) {
 // preSet
  parmObj['FORM'] = document.form;

  var height = screen.height;
  var width = screen.width;
	 var leftpos = width/2 - sWidth/2;
  var toppos = height/2 - sHeight/2;

  if(leftpos<0) leftpos=0;

	 if(toppos<0) toppos=0;

  var sFeatures = new Array();

  sFeatures[0] = (sWidth > 0)? "dialogWidth:"+sWidth+"px":"dialgWidth:300px";
  sFeatures[1] = (sHeight > 0)? "dialogHeight:"+sHeight+"px":"dialogHeight:300px";
  sFeatures[2] = (toppos > 0)? "dialogTop:"+toppos+"px":"";
  sFeatures[3] = (leftpos > 0)? "dialogLeft:"+leftpos+"px":"";
  sFeatures[4] = (!toppos && !leftpos)? "center:Yes":"";
  sFeatures[5] = "resizeable:No";
  sFeatures[6] = "help:No";
  sFeatures[7] = "status:No";
  sFeatures[8] = "center:Yes;";

  sFeatures = sFeatures.join(";");

  window.showModelessDialog(sURL,parmObj,sFeatures);
 }
