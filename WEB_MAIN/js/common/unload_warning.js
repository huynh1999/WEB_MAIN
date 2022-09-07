 // #111
	$(function() {
		$.fn.bindLF = function(name, fnFirst, fnLast) {
		    this.on(name, fnFirst);
		    this.each(function() {
		        var handlers = $._data(this, 'events')[name.split('.')[0]];
		        var handler = handlers.pop();
		        handlers.splice(0, 0, handler);
		    });

		    this.on(name, fnLast);
		    this.each(function() {
		        var handlers = $._data(this, 'events')[name.split('.')[0]];

		         var hsucess = null;
		         $.each(handlers, function (i, h) {
		             if (h.handler == fnLast) {
		                 hsucess = h;
		             }
		         });
		         var index = handlers.indexOf(hsucess);
		         if (index > -1) {
		             handlers.splice(index, 1);
		             handlers.push(hsucess);
		         }
		    });
		};

		$(".wrap_result_tab :input").on("input", function(){
			warning.changed = true;
		});

		$("#btnSave").click(function(){
			warning.changed = false;
		});
		
		$("#btnNew").bindLF('click', mFirst, mLast);
	});

	function warning(){
		var _modSheets = docObjects.filter(function(_sheet){
		  	return _sheet.GetVisible() && _sheet.GetSheetHeight() && _sheet.IsDataModified();
		}); 

	    if (!warning.disabled && (warning.changed || _modSheets.length)) {
	        doHideProcess();
			warning.changed = false;
	        return "";
	    }
	}           

	//#2121 [CLA] SAVE/X BUTTON TO BE ADDED ON TRADE PARTNER ENTRY
	//save/x 시에 warning message 안띄우게 하는 로직.
	window.onbeforeunload = function() {
		if(saveCloseBtnYn != 'Y') {
			return warning();
		}
	}
	
	var isWarningDisabled = function(_flag) {
	    warning.disabled = _flag;
	}
	var initWarn = function() {
	    isWarningDisabled(false); 
	};
	var mLast = function(){ 
	    setTimeout(initWarn, 1000);
	};
	var mFirst = function(){ 
	    isWarningDisabled(true); 
	};	 