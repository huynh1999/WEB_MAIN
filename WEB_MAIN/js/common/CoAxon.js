
    /*------------------여기서 부터 공통자바스크립트 함수를 정의한다.     ------------------*/

    /*  AXON Javascript framework */

    /////////////////////////////////////////////////
    ////  Initialization Variables & Functions   ////
    /////////////////////////////////////////////////
    /**
    * Global Variables
    */
     var IdentificationKeyOfPage = "NONE";
     var axon_assember;
     var axon_controller;
     var axon_event;
     var AXON_DEBUG = false;

    ///////////////////////// GROBALINFO AREA ///////////////////////////////
     /**
      * Axon 자바스크립트 정적 환경변수 Object <br>
      * <br><b>Example :</b>
      * <pre>
      *     // 정적 변수의 사용 
      *    	ComWebKey.Trans_Result_Key 로 호출한다.  
      * </pre>
      * @extends CoAxon
      * @class ComWebKey 자바스크립트 파일을 동적로드하기 위한 Object
      * @see ComWebKey
      */
	var ComWebKey = {
		// this is a real path get from  template.jsp parameter. 
		JS_PATH : '',
		// this is a WebKeys class attribute, from template.jsp parameter. 
		Trans_Result_Key : ''
	}

    ///////////////////////// GROBALINFO AREA ///////////////////////////////


    ///////////////////////// ASSEMBLER AREA ///////////////////////////////
    /**
     * 자바스크립트 파일을 동적로드하기 위한 Object이다. <br>
     * <br><b>Example :</b>
     * <pre>
     *     // js폴더의 common.js 파일을 동적으로 로드한다.
     *     axon_assember = new ComAssembler();
     *     axon_assember.include("/js/common");
     * </pre>
     * @extends CoAxon
     * @class ComAssembler 자바스크립트 파일을 동적로드하기 위한 Object
     * @see ComAssembler#include
     */
    function ComAssembler(id)
    {
        version = '1.0';
        included = new Object();
        //if(id!=null)IdentificationKeyOfPage = id;
        //ComLog('IdentificationKeyOfPage=' + IdentificationKeyOfPage );
        //this.include("prototype");
	        
	           //2. 업무페이지  경로 가져오기
	    	//예를 들어 template.jsp에서 다음과 같이 CoAxon.js 파일이 include되어 있다면 <script>태그에서 path 속성을 읽어온다.
	    //<script language="javascript" src="js/CoAxon.js" path="apps/opus/prototype/proposal/jsp/ui_pri_0003.js">
	    var scripts = document.getElementsByTagName("SCRIPT");
	    for(var idx = 0 ; idx < scripts.length ; idx++){
	    	if (scripts[idx].attributes["src"] != undefined && scripts[idx].attributes["src"].value.toLowerCase().indexOf("axon")>=0){
	    		try {
	    			
    	            /*
	         		* 다국어 지원 end
	         		*/
    	            ComWebKey.JS_PATH = scripts[idx].attributes["path"].value;
	    			ComWebKey.Trans_Result_Key = scripts[idx].attributes["msgkey"].value;
	    			
	    			//if (ComWebKey.JS_PATH != ""){
	    				//alert("ComWebKey.JS_PATH =>"+ComWebKey.JS_PATH);
	    			//}
	    		} catch (err){;}
	    		//ComDebug("path =" + sPath);
	    		break;
	    	}
	    }
        
        return this;
    }

    /**
     * 특정경로의 자바스크립트 파일을 동적으로 로드한다. <br>
     * <br><b>Example :</b>
     * <pre>
     *     // js폴더의 common.js 파일을 동적으로 로드한다.
     *     axon_assember = new ComAssembler();
     *     axon_assember.include("/js/common");
     * </pre>
     * @param {string} path     로드할 자바스크립트파일의 경로와 파일명. ".js"는 제거한 파일명만 임.
     **/
    ComAssembler.prototype.include = function(path)
    {
        if(path != null && path != '' && path != undefined){
        	path = path + ".js";
        }

        if(!included[path])
        {
            included[path] = "included";
            var script = document.createElement('script');
            document.getElementsByTagName('head')[0].appendChild(script);   //khlee-반드시 이 위치이어야 함
            script.setAttribute('src',path);
            script.setAttribute('type','text/javascript');

            var loadFunction = function()
            {
                if (this.readyState!="complete") return;
                ComLog('file loaded :' + path);
            };
            script.onreadystatechange = loadFunction;
        }else{
            ComLog('file already loaded :' + path);
        }
        return;
    }

 ///////////////////////// ASSEMBLER AREA ///////////////////////////////


  ///////////////////////// ComController AREA ///////////////////////////////
    /**
     * 이벤트 동적 로드를 위한 Object이다. <br>
     * EVENT개체를 생성하고  body태그 안쪽에 있는 각종 Object를 탐지하여 추후 이벤트 로드시 이용한다.<br>
     * 이 Object는 반드시 페이지로드 완료후 호출해야 한다. <br>
     * <br><b>Example :</b>
     * <pre>
     *     //이벤트 동적 로드 Object를 생성한다.
     *     axon_controller = new ComController();
     *
     *     //이벤트를 동적으로 로드한다.-txtDate1의 onBeforeDeactivate 이벤트에서 txtDate1_deactivate함수를 호출한다.
     *     axon_event.addListener('beforedeactivate', 'txtDate1_deactivate', 'txtDate1');
     * </pre>
     * @extends CoAxon
     * @class ComController 이벤트 동적로드를 위한 Object
     * @see ComEvent#addListener
     */
     function ComController(){
        // Setting Client Env. Info
        BrowserDetect.init();

        version = "v1.0";
        axon_event = new ComEvent();
        //loading = document.createElement('div');
     }
     ComController.prototype.init = function(element)
     {
     }
     /* 2009-01-22 이경희 : 류현수 수석과 협의하여 필요하지 않으므로, 일단 주석으로 막기로 함
     ComController.prototype.init = function(element)
     {
        var ids ;
        if (element.length > 0) {
            for (var i = 0; i < element.length; i++) {
                if (element[i].id != null && element[i].id != '' && element[i].id.indexOf("AXON") )
                {
                    //ComLog("--" + element[i].id + " : " + element[i].nodeName );
                    axon_event.keys[axon_event.keys.length] = element[i];
                    if(element[i].childNodes.length > 0)
                    {
                        this.init(element[i].childNodes);
                    }

                }else {
                    this.init(element[i].childNodes);
                }
            }
        }

        /* 대기 이미지
        // make loading div
         loading.setAttribute("id","AXON_Loading" );
         document.body.appendChild(loading);

         loading.style.position = 'absolute';
         loading.style.background = "url('./img/neuronanim.gif')";
         loading.style.backgroundRepeat = "no-repeat";
         loading.style.width = "412";
         loading.style.height = "312";
         loading.style.top='150px';
         loading.style.left='200px';
         // loading.onclick = function () { alert(this.innerHTML); }
         loading.innerHTML = '<B>Loading ... ...</B>';
         loading.style.visibility ='hidden';
         ...
     }

     ComController.prototype.done = function( url )
     {
        if (!window.ActiveXObject)
        {
            netscape.security.PrivilegeManager.enablePrivilege("UniversalBrowserRead");
        }

        Element.show('AXON_Loading');
        axon_event.allClear();
        var senderAjax = new Ajax.Request(
                    url,
                    {
                        asynchronous:true,
                        method: 'get',
                        onSuccess: showResponse,
                        onException: function(req,exception) {
                            alert("The request had a fatal exception thrown.\n\n" + exception);
                        }
                    }
        );


     }

     function showResponse(responseHttpObj)
        {

            try {
                // Step 1. Create XML DOM Object

                // code for IE
                if (window.ActiveXObject)
                  {
                    var doc=new ActiveXObject("Microsoft.XMLDOM");
                    doc.async="false";
                    doc.loadXML(responseHttpObj.responseText);
                  }
                // code for Mozilla, Firefox, Opera, etc.
                else if (document.implementation && document.implementation.createDocument)
                  {
                    var parser=new DOMParser();
                    doc=parser.parseFromString(responseHttpObj.responseText,"text/xml");
                  }
                else
                  {
                  alert('Your browser cannot handle this script');
                  }
            } catch(e) {
                alert(e.message);
            }
        }
        2009-01-22 이경희 : 류현수 수석과 협의하여 필요하지 않으므로, 일단 주석으로 막기로 함
        */
      ///////////////////////// ComController AREA ///////////////////////////////





     ///////////////////////// EVENT AREA ///////////////////////////////

    /**
     * {@link ComController}에 의해 초기화되는것으로 이벤트를 동적으로 로드한다. <br>
     * <br><b>Example :</b>
     * <pre>
     *     //이벤트를 동적으로 로드한다.-txtDate1의 onBeforeDeactivate 이벤트에서 txtDate1_deactivate함수를 호출한다.
     *     axon_event.addListener('beforedeactivate', 'txtDate1_deactivate', 'txtDate1');
     * </pre>
     * @extends CoAxon
     * @class ComEvent 이벤트 동적 처리를 위한 Object
     * @see ComEvent#addListener
     * @see ComEvent#addListenerForm
     * @see ComEvent#addListenerFormat
     */
     function ComEvent(){
        this.version = 'v1.0';
        this.keys = new Array();
     }

     ComEvent.prototype.toString = function()
     {
        for(var i=0; i<this.keys.length; i++)
        {
            ComLog("::::" + axon_event.keys[i] + "," +axon_event.keys[i].nodeName)
        }
     }
     ComEvent.prototype.allClear = function()
     {
        for(var i=0; i<this.keys.length; i++)
        {
            axon_event.keys[i].value = '';
        }
     }

    /**
     * 특정 Html Object의 이벤트를 동적으로 로드한다. <br>
     * <br><b>Example :</b>
     * <pre>
     *     //이벤트를 동적으로 로드한다.-txtDate1의 onBeforeDeactivate 이벤트에서 txtDate1_deactivate함수를 호출한다.
     *     axon_event.addListener('beforedeactivate', 'txtDate1_deactivate', 'txtDate1');
     *
     *     //여러개 Object의 같은 이벤트에 동일한 함수 호출하는 경우-txtDate1,txtDate2,txtDate3,txtDate4의 onBeforeDeactivate 이벤트에서 obj_deactivate함수를 호출한다.
     *     axon_event.addListener('beforedeactivate', 'obj_deactivate', 'txtDate1', "txtDate2", "txtDate3", "txtDate4");
     *
     *     //이벤트 처리 함수를 정의한다.
     *     function obj_deactivate() {
     *          //입력Validation 확인하기
     *          return ComChkObjValid(event.srcElement);
     *     }
     * </pre>
     * @param {string}  eventName       필수,이벤트명 중 맨앞의 "On"을 제외한 이벤트명
     * @param {string}  functionName    필수,이벤트발생시 호출할 자바스크립트 함수명
     * @param {string}  id1             필수,Html Object의 name 또는 id
     * @param {string}  id2             선택,여러 Html Object의 name 또는 id
     * @see ComEvent#addListenerForm
     * @see ComEvent#addListenerFormat
     */
     ComEvent.prototype.addListener = function(eventName, functionName, id1, id2)
     {
        try
        {
            if (BrowserDetect.browser == "Explorer") {
                for (var i=2; i<arguments.length; i++) {
                    //같은 name이나 id로 여러개가 있는 경우 getElementById는 하나만 처리하므로 getElementsByName으로 변경함
                    var objs = null;
                     
                    if(window[arguments[i]].multiComboElements){
                    	var name = arguments[i]+ '_On' + eventName.replace(/^[a-z]/i, function($1) {return $1.toUpperCase();});
                        if(!window[name]) {
                        	window[name] = eval(functionName);
                        }
                    }else{
                    
                       objs = document.getElementsByName(arguments[i]);
                	   for (var idx=0; idx<objs.length; idx++) {
//                          	alert(id1+"_On" + eventName);
                          objs[idx].attachEvent("on" + eventName, eval(functionName));
                       }
                    }
                                      
                    //document.getElementById(arguments[i]).attachEvent("on" + eventName, eval(functionName));
                }
            }else {
            	if(eval(id1) && eval(id1).Version){
                	var name = id1+ '_On' + eventName.replace(/^[a-z]/i, function($1) {return $1.toUpperCase();});
                    if(!window[name]) {
                    	window[name] = eval(functionName);
                    }
                }
                else {
                    for (var i=2; i<arguments.length; i++) {
                		document.getElementById(arguments[i]).addEventListener(eventName, eval(functionName), false);
                    }
                	
                }
            }
        }catch(err){
            ComLog("[ERROR] AXON ComEvent addListener : " + err.message );
        }
     }

    /**
     * 폼(form)안에 있는 모든 컨트롤의 특정 이벤트를 동적으로 로드한다. <br>
     * exceptid는 폼(form)안의 컨트롤 중 이벤트 동적 로드에서 제외할 HTML컨트롤의 name 또는 id를 의미하며, 원하는 개수만큼 설정할 수 있다. <br>
     * 폼(form)안의 컨트롤 중 OBJECT태그에 의해 생성된 IBSheet, IBMultiCombo, IBTab은 각자 event 캐치방식이 다르므로 동적으로 로드할 수 없다. <br>
     * <br><b>Example :</b>
     * <pre>
     *     //frmCond 폼안의 모든 Object의 onBeforeDeactivate 이벤트에서 obj_deactivate함수를 호출한다.
     *     axon_event.addListenerForm('beforedeactivate', 'obj_deactivate', frmMain);
     *
     *     //frmCond 폼안의 "rdoCity", "mcbo1", "txtAmt"를 제외한 모든 Object의 onBeforeDeactivate 이벤트에서 obj_deactivate함수를 호출한다.
     *     axon_event.addListenerForm('beforedeactivate', 'obj_deactivate', frmMain, "rdoCity", "mcbo1", "txtAmt");
     *
     *     //이벤트 처리 함수를 정의한다.
     *     function obj_deactivate() {
     *          //입력Validation 확인하기
     *          return ComChkObjValid(event.srcElement);
     *     }
     * </pre>
     * @param {string}  eventName       필수,이벤트명 중 맨앞의 "On"을 제외한 이벤트명
     * @param {string}  functionName    필수,이벤트발생시 호출할 자바스크립트 함수명
     * @param {form}    formobj         필수,Form Object
     * @param {string}  exceptid1       선택,Form안에 있는 Html Object 중에서 이벤트로드를 제외할 Object의 name 또는 id
     * @param {string}  exceptid2       선택,Form안에 있는 Html Object 중에서 이벤트로드를 제외할 여러개 Object의 name 또는 id
     * @see ComEvent#addListener
     * @see ComEvent#addListenerFormat
     */
     ComEvent.prototype.addListenerForm = function(eventName, functionName, formobj, exceptid1, exceptid2)
     {
        try
        {
            if (formobj==null || typeof(formobj) != "object" || formobj.tagName != "FORM")
            return ComLog("ComEvent.addListenerForm 함수의 formobj 인자는 FORM 태그가 아닙니다.");

            //Form안에 있는 Html Object 중에서 이벤트로드를 제외할 Object의 Name 또는 ID를 제거한다.
            var exceptid = "|";
            for (var i=3; i<arguments.length; i++) {
                exceptid += arguments[i] + "|";
            }
            var elems = formobj.elements;

            if (BrowserDetect.browser == "Explorer") {
                for(var i=0; i < elems.length; i++) {
                    var elem = elems[i];

                    //IBSheet, IBMultiCombo, IBTab등은 제외
                    //if (elem.classid!=undefined) continue;

                    //Form안에 있는 Html Object 중에서 이벤트로드를 제외할 Object 처리
                    if (exceptid.indexOf("|" + elem.name +"|") >= 0 || exceptid.indexOf("|" + elem.id +"|") >= 0) continue;

                    //Form안에 있는 Html Object 중에서 이벤트로드할 Object 처리-이벤트
                    elem.attachEvent(String("on" + eventName).toLowerCase(), eval(functionName));
                }
            }else {
                for(var i=0; i < elems.length; i++) {
                    var elem = elems[i];

                    //IBSheet, IBMultiCombo, IBTab등은 제외
                    //if (elem.classid!=undefined) continue;

                    //Form안에 있는 Html Object 중에서 이벤트로드를 제외할 Object 처리
                    if (exceptid.indexOf("|" + elem.name +"|") >= 0 || exceptid.indexOf("|" + elem.id +"|") >= 0) continue;

                    //Form안에 있는 Html Object 중에서 이벤트로드할 Object 처리-이벤트
                    elem.addEventListener(eventName, eval(functionName), false);
                }
            }
        }catch(err){
            ComLog("[ERROR] AXON ComEvent addListenerForm : " + err.message );
        }
     }

    /**
     * 폼(form)안에 있는 모든 컨트롤 중 dataformat 속성값이 있는 컨트롤의  특정 이벤트를 동적으로 로드한다. <br>
     * <br><b>Example :</b>
     * <pre>
     *     //frmCond 폼안의 모든 Object의 onBeforeDeactivate 이벤트에서 obj_deactivate함수를 호출한다.
     *     axon_event.addListenerFormat('beforedeactivate', 'obj_deactivate', frmMain);
     *
     *     //이벤트 처리 함수를 정의한다.
     *     function obj_deactivate() {
     *          //입력Validation 확인하기
     *          return ComChkObjValid(event.srcElement);
     *     }
     * </pre>
     * @param {string}  eventName       필수,이벤트명 중 맨앞의 "On"을 제외한 이벤트명
     * @param {string}  functionName    필수,이벤트발생시 호출할 자바스크립트 함수명
     * @param {form}    formobj         필수,Form Object
     * @see ComEvent#addListener
     * @see ComEvent#addListenerForm
     */
     ComEvent.prototype.addListenerFormat = function(eventName, functionName, formobj)
     {
        try
        {
            if (formobj==null || typeof(formobj) != "object" || formobj.tagName != "FORM")
            return ComLog("ComEvent.addListenerForm 함수의 formobj 인자는 FORM 태그가 아닙니다.");

            var elems = formobj.elements;

            if (BrowserDetect.browser == "Explorer") {

                for(var i=0; i < elems.length; i++) {
                    var elem = elems[i];
                    var sFormat = elem.getAttribute("dataformat");

                    //IBSheet, IBMultiCombo, IBTab등은 제외, dataformat 속성이 없는 경우도 제외
                    if (sFormat==null) continue;
                    //if (elem.classid!=undefined || sFormat==null) continue;

                    //Form안에 있는 Html Object 중에서 이벤트 로드를 제외할 Object 처리
                    if (getFormatDelim(sFormat)=="") continue;

                    //Form안에 있는 Html Object 중에서 이벤트 로드할 Object 처리-이벤트
                    elem.attachEvent(String("on" + eventName).toLowerCase(), eval(functionName));
                }
            }else {

                for(var i=0; i < elems.length; i++) {
                    var elem = elems[i];
                    var sFormat = elem.getAttribute("dataformat");

                    //IBSheet, IBMultiCombo, IBTab등은 제외, dataformat 속성이 없는 경우도 제외
                    if (sFormat==null) continue;
                    //if (elem.classid!=undefined || sFormat==null) continue;


                    //Form안에 있는 Html Object 중에서 이벤트 로드를 제외할 Object 처리
                    if (getFormatDelim(sFormat)=="") continue;

                    //Form안에 있는 Html Object 중에서 이벤트 로드할 Object 처리-이벤트
                    elem.addEventListener(eventName, eval(functionName), false);
                }
            }
        }catch(err){
            ComLog("[ERROR] AXON ComEvent addListenerForm : " + err.message );
        }
     }

     /**
      * 폼(form)안에 있는 모든 컨트롤 중 preset 속성값이 있는 컨트롤의  특정 이벤트를 동적으로 로드한다. for Bulk<br>
      * <br><b>Example :</b>
      * <pre>
      *     //frmCond 폼안의 모든 Object중 dataformat속성이 있는 Object의 onKeyUp 이벤트에서 ComEditFormating 함수를 호출한다.
      *     axon_event.addListenerPreset('keyup', 'ComEditFormating', document.form);
      * </pre>
      * @param {string}  eventName       필수,이벤트명 중 맨앞의 "On"을 제외한 이벤트명
      * @param {string}  functionName    필수,이벤트발생시 호출할 자바스크립트 함수명
      * @param {form}    formobj         필수,Form Object
      * @see ComEvent#addListener
      * @see ComEvent#addListenerForm
      */
      ComEvent.prototype.addListenerPreset = function(eventName, functionName, formobj)
      {
         try
         {
             if (formobj==null || typeof(formobj) != "object" || formobj.tagName != "FORM")
             return ComLog("ComEvent.addListenerForm 함수의 formobj 인자는 FORM 태그가 아닙니다.");

             var elems = formobj.elements;

             if (BrowserDetect.browser == "Explorer") {

                 for(var i=0; i < elems.length; i++) {
                     var elem = elems[i];
                     var sFormat = elem.getAttribute("preset");

                     if (sFormat==null) continue;

                     //Form안에 있는 Html Object 중에서 이벤트 로드를 제외할 Object 처리
                     if (getFormatDelim(sFormat)=="") continue;

                     //Form안에 있는 Html Object 중에서 이벤트 로드할 Object 처리-이벤트
                     elem.attachEvent(String("on" + eventName).toLowerCase(), eval(functionName));
                 }
             }else {

                 for(var i=0; i < elems.length; i++) {
                     var elem = elems[i];
                     var sFormat = elem.getAttribute("preset");

                     if (sFormat==null) continue;

                     //Form안에 있는 Html Object 중에서 이벤트 로드를 제외할 Object 처리
                     if (getFormatDelim(sFormat)=="") continue;

                     //Form안에 있는 Html Object 중에서 이벤트 로드할 Object 처리-이벤트
                     elem.addEventListener(eventName, eval(functionName), false);
                 }
             }
         }catch(err){
             ComLog("[ERROR] AXON ComEvent addListenerForm : " + err.message );
         }
      }     

    /**
     * 동적으로 로드된 이벤트를 제거한다. <br>
     * <br><b>Example :</b>
     * <pre>
     *     //이벤트를 제거한다.
     *     axon_event.removeListener('txtDate1', 'beforedeactivate', 'txtDate1_deactivate');
     * </pre>
     * @param {string}  id              필수,Object의 name 또는 id
     * @param {string}  eventName       필수,이벤트명 중 맨앞의 "on"을 제외한 이벤트명
     * @param {string}  functionName    필수,이벤트발생시 호출할 자바스크립트 함수명
     */
     ComEvent.prototype.removeListener = function( id, eventName, functionName )
     {
        try
        {
            if (BrowserDetect.browser == "Explorer") {
                $("#"+id).detachEvent('on' + eventName, eval(functionName));
            }else {
            	$("#"+id).removeEventListener(eventName, eval(functionName), false);
            }
        }catch(err){
            ComLog("[ERROR] AXON ComEvent remove : " + err.message );
        }
     }
     ///////////////////////// EVENT AREA ///////////////////////////////





   ///////////////////////// DEBUG AREA ///////////////////////////////
     var ConSole = {
        show : false,
        consoleDiv : null,

        loadDiv : function()
        {
            this.consoleDiv = document.createElement('iframe');
            this.consoleDiv.setAttribute("id","AXON_IFrame" );
            this.consoleDiv.setAttribute("frameBorder","0" );
            this.consoleDiv.width = 500;
            this.consoleDiv.height= 420;

            this.consoleDiv.style.position = 'absolute';
            this.consoleDiv.style.border = '2px solid #000';
            this.consoleDiv.style.padding='2px';

            //마우스 이동에 따른 처리
             var dragok = false;
             var y,x,dy,dx;

             function up()
             {
                dragok = false;
                document.body.style.cursor="default";
                document.frames("AXON_IFrame").AXON_Logger.style.cursor="default";
                document.frames("AXON_IFrame").AXONLogArea.style.cursor="default";

                document.onmousemove = null;
             }
             function move(){
                if (!dragok) return;
                ConSole.consoleDiv.style.left = dx + event.clientX - x + "px";
                ConSole.consoleDiv.style.top  = dy + event.clientY - y + "px";
                return false;
             }
             function down()
             {
                document.body.style.cursor="move";
                document.frames("AXON_IFrame").AXON_Logger.style.cursor="move";
                document.frames("AXON_IFrame").AXONLogArea.style.cursor="move";

                dx = parseInt(ConSole.consoleDiv.style.left);
                dy = parseInt(ConSole.consoleDiv.style.top);
                x = event.clientX;
                y = event.clientY;

                document.onmousemove = move;
                dragok = true;
                return false;
             }

            this.consoleDiv.onmousedown = down;
            document.onmouseup = up;

            document.body.appendChild(this.consoleDiv);


            var _FrameDoc = document.all.AXON_IFrame.contentWindow.document;
            var _logger = _FrameDoc.createElement('<div id="AXON_Logger" ALIGN=CENTER onkeypress="if(ComGetEvent("keycode")==27) parent.ComLog.close();" style="border:2px solid #000; padding:2px; overflow:hidden; textOverflow:hidden; background-color:#e4e4e4; width:100%; height:100%"/>');
            _FrameDoc.insertBefore(_logger);

            _logger.innerHTML = "[ AXON LOGGING ]<BR>";
            var _area = _FrameDoc.createElement('<textarea id="AXONLogArea" rows=23 cols=55/>');
            _logger.appendChild(_area);

            if (!this.show) {
                this.consoleDiv.style.display ='none';
            }else{
                this.consoleDiv.style.display ='inline';
            }
        },

        append : function(message){
            if (!ConSole.show) return;
            //var txtArea = this.consoleDiv.getElementsByTagName("textarea")[0];
            var txtArea = document.frames("AXON_IFrame").AXONLogArea;
            txtArea.value += message + "\n";
            txtArea.scrollTop = txtArea.scrollHeight;
        }

     }

    /**
     * 디버깅을 위한 AXON Logger에 메시지를 표시한다. AXON Logger(로그창)가 표시되어야 원하는 메시지를 표시할 수 있다. <br>
     * Ctrl+Alt+Shift+D 키를 누르면 로그창을 표시하고, ESC키를 누르면 표시된 로그창이 닫힌다. <br>
     * 또는 ComLog.close()를 호출하면 로그창이 닫힌다. <br>
     * <br><b>Example :</b>
     * <pre>
     *     ComLog("메시지를 표시합니다.");
     * </pre>
     * @extends CoAxon
     * @class ComLog 디버깅을 위한 AXON Logger를 표시하고, 메시지를 표시한다.
     * @param {string} message 메시지 문자열
     * @see ComDebug
     * @see ComDebugFunction
     */
     function ComLog(message)
     {
        //아직 페이지 생성이 완료되지 않은 경우 메시지DIV를 생성할수 없으므로, alert로 표시한다.
        if(document.readyState != "complete"){
            if (AXON_DEBUG) alert("[Axon Logger]\n" + message);
            return;
        }

        //페이지 생성이 완료된 경우 메시지DIV를 생성하고 메시지DIV를 표시한다.
        if (ConSole.show) {
            var bFirstShow = false;
            if (ConSole.consoleDiv == null) {
                ConSole.loadDiv();
                bFirstShow = true;
            } else if (ConSole.consoleDiv.style.display =='none'){
                ConSole.consoleDiv.style.display ='inline';
                bFirstShow = true;
            }

            if (bFirstShow){
                //보이는 화면의 한 가운데 나오기
                var leftPos=(document.body.clientWidth  - ConSole.consoleDiv.width)/2;       if(leftPos<0)   leftPos=0;
                var topPos =(document.body.clientHeight - ConSole.consoleDiv.height)/2;     if(topPos<0)    topPos=0;
                ConSole.consoleDiv.style.left = leftPos;
                ConSole.consoleDiv.style.top  = topPos;
            }
            
            
            ConSole.append(message);
        }
     }

    
    /**
     * 디버깅을 위한 AXON Logger(로그창)를 닫는다. 또는 ESC 키를 누르면 이 함수의 기능과 동일하게 표시한다. <br>
     * <br><b>Example :</b>
     * <pre>
     *     ComLog.close();
     * </pre>
     **/
     ComLog.close = function()
     {
        if (ConSole.consoleDiv == null) return;

        ConSole.show = false;
        document.frames("AXON_IFrame").AXONLogArea.value="";
        ConSole.consoleDiv.style.display ='none';
     }


     /* 단축키 기능 */
     shortcut(
        "Ctrl+Shift+Alt+D",function()
        {
            ConSole.show = true;
            ComLog("starting Axon Logging ...  ");
        }
     );
     shortcut(
        "ESC",function()
        {
            ComLog.close();
        }
     );

 ///////////////////////// DEBUG AREA ///////////////////////////////



     /////////////////////////  CLIENT INFO UTIL AREA /////////////////////////////
     var BrowserDetect = {
        init: function () {
            this.browser = this.searchString(this.dataBrowser) || "An unknown browser";
            this.version = this.searchVersion(navigator.userAgent)
                || this.searchVersion(navigator.appVersion)
                || "an unknown version";
            this.OS = this.searchString(this.dataOS) || "an unknown OS";
            ComLog('You\'re using ' + BrowserDetect.browser + ' ' + BrowserDetect.version + ' on ' + BrowserDetect.OS + '!');
        },
        searchString: function (data) {
            for (var i=0;i<data.length;i++) {
                var dataString = data[i].string;
                var dataProp = data[i].prop;
                this.versionSearchString = data[i].versionSearch || data[i].identity;
                if (dataString) {
                    if (dataString.indexOf(data[i].subString) != -1)
                        return data[i].identity;
                }
                else if (dataProp)
                    return data[i].identity;
            }
        },
        searchVersion: function (dataString) {
            var index = dataString.indexOf(this.versionSearchString);
            if (index == -1) return;
            return parseFloat(dataString.substring(index+this.versionSearchString.length+1));
        },
        dataBrowser: [
            {   string: navigator.userAgent,
                subString: "OmniWeb",
                versionSearch: "OmniWeb/",
                identity: "OmniWeb"
            },
            {
                string: navigator.vendor,
                subString: "Apple",
                identity: "Safari"
            },
            {
                prop: window.opera,
                identity: "Opera"
            },
            {
                string: navigator.vendor,
                subString: "iCab",
                identity: "iCab"
            },
            {
                string: navigator.vendor,
                subString: "KDE",
                identity: "Konqueror"
            },
            {
                string: navigator.userAgent,
                subString: "Firefox",
                identity: "Firefox"
            },
            {
                string: navigator.vendor,
                subString: "Camino",
                identity: "Camino"
            },
            {       // for newer Netscapes (6+)
                string: navigator.userAgent,
                subString: "Netscape",
                identity: "Netscape"
            },
            {
                string: navigator.userAgent,
                subString: "MSIE",
                identity: "Explorer",
                versionSearch: "MSIE"
            },
            {
                string: navigator.userAgent,
                subString: "Gecko",
                identity: "Mozilla",
                versionSearch: "rv"
            },
            {       // for older Netscapes (4-)
                string: navigator.userAgent,
                subString: "Mozilla",
                identity: "Netscape",
                versionSearch: "Mozilla"
            }
        ],
        dataOS : [
            {
                string: navigator.platform,
                subString: "Win",
                identity: "Windows"
            },
            {
                string: navigator.platform,
                subString: "Mac",
                identity: "Mac"
            },
            {
                string: navigator.platform,
                subString: "Linux",
                identity: "Linux"
            }
        ]

    };
     /////////////////////////  CLIENT INFO UTIL AREA /////////////////////////////



     /////////////////////////  KEY UTIL AREA /////////////////////////////
    /**
     * 단추키 기능을 설정한다.
     * 이 함수는 이파일(CoAxon.js)에서만 사용하기 위한 목적으로 만들졌다.
     */
    function shortcut(shortcut,callback,opt) {
        //Provide a set of default options
        var default_options = {
            'type':'keydown',
            'propagate':false,
            'target':document
        }
        if(!opt) opt = default_options;
        else {
            for(var dfo in default_options) {
                if(typeof opt[dfo] == 'undefined') opt[dfo] = default_options[dfo];
            }
        }

        var ele = opt.target
        if(typeof opt.target == 'string') ele = $("#" + opt.target);
        var ths = this;

        //The function to be called at keypress
        var keyfunc = function(e) {
            e = e || window.event;

            var code=ComGetEvent("keycode");
            if(code==null) return;
            
            var character = String.fromCharCode(code).toLowerCase();

            var keys = shortcut.toLowerCase().split("+");
            //Key Pressed - counts the number of valid keypresses - if it is same as the number of keys, the shortcut function is invoked
            var kp = 0;

            //Work around for stupid Shift key bug created by using lowercase - as a result the shift+num combination was broken
            var shift_nums = {
                "`":"~",
                "1":"!",
                "2":"@",
                "3":"#",
                "4":"$",
                "5":"%",
                "6":"^",
                "7":"&",
                "8":"*",
                "9":"(",
                "0":")",
                "-":"_",
                "=":"+",
                ";":":",
                "'":"\"",
                ",":"<",
                ".":">",
                "/":"?",
                "\\":"|"
            }
            //Special Keys - and their codes
            var special_keys = {
                'esc':27,
                'escape':27,
                'tab':9,
                'space':32,
                'return':13,
                'enter':13,
                'backspace':8,

                'scrolllock':145,
                'scroll_lock':145,
                'scroll':145,
                'capslock':20,
                'caps_lock':20,
                'caps':20,
                'numlock':144,
                'num_lock':144,
                'num':144,

                'pause':19,
                'break':19,

                'insert':45,
                'home':36,
                'delete':46,
                'end':35,

                'pageup':33,
                'page_up':33,
                'pu':33,

                'pagedown':34,
                'page_down':34,
                'pd':34,

                'left':37,
                'up':38,
                'right':39,
                'down':40,

                'f1':112,
                'f2':113,
                'f3':114,
                'f4':115,
                'f5':116,
                'f6':117,
                'f7':118,
                'f8':119,
                'f9':120,
                'f10':121,
                'f11':122,
                'f12':123
            }


            for(var i=0; k=keys[i],i<keys.length; i++) {
                //Modifiers
                if(k == 'ctrl' || k == 'control') {
                    if(e.ctrlKey) kp++;

                } else if(k ==  'shift') {
                    if(e.shiftKey) kp++;

                } else if(k == 'alt') {
                        if(e.altKey) kp++;

                } else if(k.length > 1) { //If it is a special key
                    if(special_keys[k] == code) kp++;

                } else { //The special keys did not match
                    if(character == k) kp++;
                    else {
                        if(shift_nums[character] && e.shiftKey) { //Stupid Shift key bug created by using lowercase
                            character = shift_nums[character];
                            if(character == k) kp++;
                        }
                    }
                }
            }

            if(kp == keys.length) {
                callback(e);

                if(!opt['propagate']) { //Stop the event
                    //e.cancelBubble is supported by IE - this will kill the bubbling process.
                	if (e.cancelBubble) e.cancelBubble = true;
                	if (e.stopPropagation) e.stopPropagation();
                	if (e.preventDefault) e.preventDefault();
                	//if (e.returnValue) e.returnValue = false;
                	if (e.cancel != null) e.cancel = true;		
                    return false;
                }
            }
        }

        //Attach the function with the event
        if(ele.addEventListener)  ele.addEventListener(opt['type'], keyfunc, false);
        else if(ele.attachEvent) ele.attachEvent('on'+opt['type'], keyfunc);
        else ele['on'+opt['type']] = keyfunc;
    }
     /////////////////////////  KEY UTIL AREA /////////////////////////////


    ///////////////////////// ComDebug AREA ///////////////////////////////
    var oLogWin, oLogger, oEventChk, oFrontChk;
    var bEventLoad=false;
    var LOG_DEBUG_MODE = true;  //true:디버그모드, false:운영모드, 운영시 반드시 이 변수를 false로 설정해야 한다.

    /**
     * 디버깅을 위한 팝업창을 표시하고, 메시지를 표시한다. 디버깅창은 window.open으로 표시된다. <br>
     * 메시지는 "시간 > 메시지" 형태로 표시된다. <br>
     * 디버깅창에서 "Window Front"를 체크하면 이 함수 호출시 디버깅창을 항상 앞쪽으로 가져와서 표시한다.<br>
     * 디버깅창에서 "Object Event"를 체크하면 페이지에 있는 ActiveX(IBSheet, IBCombo, IBTab)의 각종 이벤트를 catch하여 디버깅 할 수 있다. <br>
     * Ctrl+Shift+X 키를 누르면 디버깅창을 표시할 수 있고, ESC키를 누르면 디버깅창을 닫을 수 있다. <br>
     * LOG_DEBUG_MODE 상수가 false이면 팝업 창이 표시되지 않을수 있으므로, 이 상수를 팝업창 표시여부에 따라 설정하도록 한다. <br>
     * 운영시 특정페이지에서만 디버그로그를 보고자 한다면 해당페이지에서 상수값을 변경하여 사용한다. <br>
     * <br><b>Example :</b>
     * <pre>
     *     ComDebug("txtName=" + txtName.Value);
     *     ComDebug("sheet1_OnSaveEnd : " + ErrMsg);
     * </pre>
     * @extends CoAxon
     * @class ComDebug 디버깅을 위한 팝업창을 표시하고, 메시지를 표시한다.
     * @param {string} msg   필수,표시할 메시지
     * @see ComLog
     * @see ComDebugFunction
     */
    function ComDebug(msg) {        
        if (!LOG_DEBUG_MODE) return;
        
        try {
    
            //로그를 표시할 창이 없으면 생성한다.
        	if (!oLogWin || oLogWin.closed) {        	    
                var CreateLogWindow = function()
                {
                    var sID = "LogArea";
                    
                	oLogWin = window.open("","LogWin","top=5,left=5,width=500,height=400,resizable");
                	if (oLogWin==null) return ComShowMessage("[ComDebug] window.open()으로 팝업여는데 실패했습니다. Internet Explorer 옵션 설정을 변경하세요!!");
                	
                	var oLogDoc = oLogWin.document;
                	var bFirstOpen = (oLogDoc.body.innerHTML=="");
                    
                    //혹시 기존에 창이 열려져 있다면 window내의 textarea를 만들 필요가 없다.
                    if(bFirstOpen) {
                    	//기존에 창이 열려져 있지 않았다면 document의 내용을 기재한다.
                    	var sScript = "<body onkeypress='if(ComGetEvent(\"keycode\")==27) self.close();' style='margin:0,0,0,0' >"
                    	            + "<table width=100% height=100% cellpadding=0 cellspacing=0 border=0 align=center style='font-size:9pt'><tr>\n"
                    				+ "<td align=left style='padding-left:10;height:20;font-weight:700'>Script debugging</td>\n"
                    				+ "<td align=right style='padding-right:10'>\n"
                    				+ "<input type='checkbox' name='chkFront'>Window Front\n"    				
                    				+ "<input type='checkbox' name='chkEvent' onclick='try{opener.loadEventDebug();}catch(err){;}'>Object Event\n"    				
                    				+ "<span style='cursor:hand;width:40;height:18;padding:0,3,0,3;text-align:center;border:1 solid gray;background-color:#eaeaea'\n"
                    				+ " onclick='$(\"#LogArea\").value=\"\"'>clear</span>\n"
                    				+ "</td></tr>"
                    				+ "<tr width=100% height=100%><td colspan=2><textarea id='" + sID +"' style='font:9pt Arial; height:100%; width:100%'></textarea></td><tr>\n"
                    				+ "</table>\n"
                    				+ "</body>";
                    	oLogDoc.write(sScript);
                    } 
                    
                    //열었던 디버깅창을 그대로 두고, 원본페이지를 새로고침하면 디버깅창의 opener를 잃어버리는 문제를 해결하기 위해 아래와 같이 설정함
                    oLogWin.opener = this.window;
                    
                    oLogger = oLogDoc.getElementById(sID);
                    oEventChk= oLogDoc.getElementById("chkEvent");
                    oFrontChk= oLogDoc.getElementById("chkFront");
                    oEventChk.checked = false;
                    
                    if (bFirstOpen) {
                    	//기존에 창이 열려져 있지 않았다면 default로 창 앞으로 표시하기 옵션을 체크한다.
	                    oFrontChk.checked = true;
	                }
	                
                    oLogger.focus();
                }                

        	    CreateLogWindow();
                loadEventDebug();
        	} 
        	
    		oLogger.value += new Date().toTimeString().substr(0,8) + " > " + msg + "\n";
        	oLogger.scrollTop = oLogger.scrollHeight - oLogger.clientHeight;
        	
        	//메시지 발생시 디버깅창을 앞으로 가져온다.
        	if (oFrontChk.checked) oLogWin.focus();

        } catch(err) { 
            ComShowMessage("ComDebug 창 오류입니다. 디버깅창을 닫고 다시 실행(Ctrl+Shift+X)하세요!!");
            ComFuncErrMsg(err.message); 
        }
        
    }

    /**
     * 함수의 인자값을 {@link ComDebug} 함수를 이용하여 디버깅 한다. <br>
     * 메시지 1줄은 "Function Syntax    : 함수명 (인자1타입, 인자2타입...)" 형태로 Syntax가 표시된다. <br>
     * 메시지 2줄은 "Function Arguments : 함수명 (인자1값,   인자2값...)"   형태로 인자값가 표시된다. <br>
     * <br><b>Example :</b>
     * <pre>
     *     function setContainer() {
     *         ComDebugFunction(arguments);   //setContainer함수가 호출된 경우 setContainer함수의 인자값과 타입을 확인한다.
     *     }
     * </pre>
     * @extends CoAxon
     * @class ComDebugFunction 함수의 인자값을 디버깅을 위한 팝업창을 표시하고, 메시지를 표시한다.
     * @param {array} args   필수,caller 함수의 인자배열
     * @see ComLog
     * @see ComDebug
     */
    function ComDebugFunction(args) {
        try {
        	//함수명
            var sFuncName=ComDebugFunction.caller.toString();
            sFuncName = sFuncName.substring(9, sFuncName.indexOf("("));
            
            var aryType = new Array();
            var aryValue = new Array();
            
            for (var i=0; i<args.length; i++) {
            	var sType = args[i].constructor.toString()
            	sType = sType.substring(10, sType.indexOf("("));
            	aryType[i] = sType;
            	switch (sType){
            		case "Array":
            			aryValue[i] = "{" + args[i] + "}";
            			break;
            		case "String":
            			aryValue[i] = "'" + args[i] + "'";
            			break;
            		default:
            			aryValue[i] = args[i];
        				break;
            	}
            }
            ComDebug("-------------------------------------------------------------------------------------------------------");
        	ComDebug("Function Syntax :\t" + sFuncName+"("+ aryType.join(", ")+")");
        	ComDebug("Function Arguments :\t" + sFuncName+"("+ aryValue.join(", ")+")");
            ComDebug("-------------------------------------------------------------------------------------------------------");
            
        } catch(err) { ComFuncErrMsg(err.message); }
    }

    /**
     * ComDebug창에 ActiveX(IBSheet, IBTab, IBMultiCombo)의 이벤트 로그를 표시한다. {@link ComDebug}함수를 위해 사용한다.
     * 이 함수는 이파일(CoAxon.js)에서만 사용하기 위한 목적으로 만들졌다.
     */
    function ComDebugEvent(objid, fname, args){
        try {    
            if (!oLogWin || oLogWin.closed) return;
            if (!oEventChk.checked) return;
            
            var aryParam=new Array();
            for(var i = 0 ; i < args.length ; i++){
                aryParam[i] = args[i];
            }
            var msg = objid + "_" + fname + "=(" + aryParam.join(",") + ")";
            
            ComDebug(msg);
            
        } catch(err) { 
            //ComFuncErrMsg(err.message); 
            ComShowMessage("ComDebug 창 오류입니다. 디버깅창을 닫고 다시 실행(Ctrl+Shift+D)하세요!!");
        }
    }

    /**
     * ComDebug 창에 ActiveX(IBSheet, IBTab, IBMultiCombo)의 이벤트 로그를 catch하여 . {@link ComDebug}함수를 위해 사용한다.
     * 이 함수는 이파일(CoAxon.js)에서만 사용하기 위한 목적으로 만들졌다.
     */
    function loadEventDebug() 
    {
        if(document.readyState != "complete" || bEventLoad) return;
            
        //이벤트 처리하기
        var scripts = document.getElementsByTagName("SCRIPT");
        var scriptsCnt = scripts.length;
        var scriptText = "";
        objs = document.getElementsByTagName("OBJECT");

        //이벤트로그를 봐야할 ActiveX의 id만 "|"로 연결한 문자열을 구성한다.
        var sObjsId="|"
        for(var i = 0; i<objs.length; i++) {
            switch(objs[i].classid){
                case CLSID_IBSHEET: // IBSheet 경우
                case CLSID_IBMCOMBO: // IBMultiCombo 경우
                case CLSID_IBTAB: // IBTab 경우
                    sObjsId+=objs[i].id +"|"
            }
        }
        if (sObjsId == "|") return;

        for(var idx = 0 ; idx < scripts.length ; idx++){
            if (scripts[idx].attributes("for").value == "" || scripts[idx].attributes("event").value == "") continue;

            //Object ID들 중에 해당 이벤트의 for속성에 맞는것이 없으면 그냥 건너뜀
            if (sObjsId.indexOf("|" + scripts[idx].attributes("for").value +"|") < 0)  continue;

            var eventName = scripts[idx].attributes("event").value;
            var eventId  = scripts[idx].attributes("for").value;

            //주의! onBeforeDeactivate, OnFocus이벤트를 catch하면 IBMultiCombo와 IBTab에 의해 오류가 발생할수 있으므로 제거한다.
            if(eventName.indexOf("onBeforeDeactivate")>=0 || eventName.indexOf("OnFocus")>=0) continue;
            if(eventName.indexOf("OnMouseMove")>=0 || eventName.indexOf("OnDebugMsg")>=0 || eventName.indexOf("OnResize")>=0 || eventName.indexOf("OnValidation")>=0) continue;
            if(scripts[idx].text.indexOf("ComDebugEvent") >=0) continue;
            
            scripts[idx].text = 'ComDebugEvent(this.id, "'+eventName+'", arguments);'+scripts[idx].text;
            //alert(scripts[idx].text);
        }
        
        bEventLoad=true;
    }


     /* 단축키 기능 */
     shortcut(
        "Ctrl+Shift+X",function()
        {
            ComDebug("starting Debug ...  ");
        }
     );
       
    
    ///////////////////////// ComDebug AREA ///////////////////////////////
    


    ///////////////////////// Initialization Area ////////////////////////////////
    //1. Axon 만들기
    AXON_DEBUG = false;
    axon_assembler 	= new ComAssembler();
    axon_controller = new ComController();


    ///////////////////////// Initialization Area ////////////////////////////////
