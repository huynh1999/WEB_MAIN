<!-- Original:  Richard Gorremans (RichardG@spiritwolfx.com) -->
<!-- Web Site:  http://www.spiritwolfx.com -->
<!-- This script and many more are available free online at -->
<!-- The JavaScript Source!! http://javascript.internet.com -->
/* USAGE:
    mm/dd/yyyy: <input type="text" name="testDateFormat1" size='10' maxlength="10" onFocus="javascript:vDateType='1'" onKeyUp="DateFormat(this,this.value,event,false,'1')" onBlur="DateFormat(this,this.value,event,true,'1')">
   - yyyy/mm/dd: <input type="text" name="testDateFormat3" size='10' maxlength="10" onFocus="javascript:vDateType='2'" onKeyUp="DateFormat(this,this.value,event,false,'2')" onBlur="DateFormat(this,this.value,event,true,'2')">
   - dd/mm/yyyy: <input type="text" name="testDateFormat5" size='10' maxlength="10" onFocus="javascript:vDateType='3'" onKeyUp="DateFormat(this,this.value,event,false,'3')" onBlur="DateFormat(this,this.value,event,true,'3')">
*/
<!-- Begin
// Check browser version
var isNav4 = false, isNav5 = false, isIE4 = false

// If you are using any Java validation on the back side you will want to use the / because
// Java date validations do not recognize the dash as a valid date separator.
var vDateType = 3; // Global value for type of date format
//                1 = mm/dd/yyyy
//                2 = yyyy/dd/mm  (Unable to do date check at this time)
//                3 = dd/mm/yyyy
var vYearType = 4; //Set to 2 or 4 for number of digits in the year for Netscape
var vYearLength = 4; // Set to 4 if you want to force the user to enter 4 digits for the year before validating.
var err = 0; // Set the error code to a default of zero

if(navigator.appName == "Netscape") {
	if (navigator.appVersion < "5") {
		isNav4 = true;
		isNav5 = false;
	}else{
		if (navigator.appVersion > "4") {
			isNav4 = false;
			isNav5 = true;
		}
	}
}else {
	isIE4 = true;
}

function getDateFromStr(inDate){
	if(inDate!=''&&inDate.length==8){
		var mYear = inDate.substr(0,4);
		var mMonth= inDate.substr(4,2);
		var mDay =  inDate.substr(6,2);

		return mYear+strSeperator+mMonth+strSeperator+mDay;
	}else{
		return inDate;
	}
}

//obj = object
//event = event
//dateCheck
//  :True  = Verify that the vDateValue is a valid date
//  :False = Format values being entered into vDateValue only
function mkDateFormat(obj, event, dateCheck) {
	DateFormat(obj, obj.value, event, dateCheck, 2);
}

function mkDateFormatType(obj, event, dateCheck, type) {
	DateFormat(obj, obj.value, event, dateCheck, type);
}

function mkDateFormatTypes(obj, event, dateCheck, type) {
	DateFormats(obj, obj.value, event, dateCheck, type);
}

function mkDateFormatRtn(obj, event, dateCheck, type) {
	return DateFormat(obj, obj.value, event, dateCheck, type);
}
// vDateName = object name
// vDateValue = value in the field being checked
// e = event
// dateCheck
// True  = Verify that the vDateValue is a valid date
// False = Format values being entered into vDateValue only
// vDateType
// 1 = mm/dd/yyyy
// 2 = yyyy/mm/dd
// 3 = dd/mm/yyyy
function DateFormats(vDateName, vDateValue, e, dateCheck, dateType) {
	if (e.keyCode == 13 && vDateValue == "") {
		var objPrefix = (vDateName.name.replace("_str", "_").replace("_end", "_").replace("_fm", "").replace("_to", "") + "_cal");
		var colBtnImg = document.getElementById(objPrefix);
		if (colBtnImg != null && colBtnImg != "undefined" && colBtnImg != undefined) {
			document.getElementById(objPrefix).fireEvent("onclick");
			return;
		}
	}

	vDateType = dateType;

	//Enter a tilde sign for the first number and you can check the variable information.
	if (vDateValue == "~") {
		alert("AppVersion = "+navigator.appVersion+" \nNav. 4 Version = "+isNav4+" \nNav. 5 Version = "+isNav5+" \nIE Version = "+isIE4+" \nYear Type = "+vYearType+" \nDate Type = "+vDateType+" \nSeparator = "+strSeperator);
		vDateName.value = "";
		vDateName.focus();
		return true;
	}
	var whichCode = (window.Event) ? e.which : e.keyCode;

	// Check to see if a seperator is already present.
	// bypass the date if a seperator is present and the length greater than 8
	if (vDateValue.length > 8 && isNav4) {
		if ((vDateValue.indexOf("-") >= 1) || (vDateValue.indexOf("/") >= 1))
			return true;
	}
	if(vDateValue.length>9){

	}
	//Eliminate all the ASCII codes that are not valid
	var alphaCheck = " abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ/-";
	if (alphaCheck.indexOf(vDateValue) >= 1) {
		if (isNav4) {
			vDateName.value = "";
			vDateName.focus();
			vDateName.select();
			return false;
		}else {

			vDateName.value = vDateName.value.substr(0, (vDateValue.length-1));
			return false;
		}
	}

	if (whichCode == 8){ //Ignore the Netscape value for backspace. IE has no value
		return false;
	}else {
		//Create numeric string values for 0123456789/
		//The codes provided include both keyboard and keypad values
		var strCheck = '47,48,49,50,51,52,53,54,55,56,57,58,59,95,96,97,98,99,100,101,102,103,104,105';

		if (strCheck.indexOf(whichCode) != -1) {

			//Nescape
			if (isNav4) {

				if (((vDateValue.length < 6 && dateCheck) || (vDateValue.length == 7 && dateCheck)) && (vDateValue.length >=1)) {
					//Invalid Date\nPlease Re-Enter
					alert(getLabel('FMS_COM_ALT002'));
					
					vDateName.value = "";
					vDateName.focus();
					vDateName.select();
					return false;
				}
				if (vDateValue.length == 6 && dateCheck) {
					var mDay = vDateName.value.substr(2,2);
					var mMonth = vDateName.value.substr(0,2);
					var mYear = vDateName.value.substr(4,4)

					//Turn a two digit year into a 4 digit year
					if (mYear.length == 2 && vYearType == 4) {
						var mToday = new Date();
						//If the year is greater than 30 years from now use 19, otherwise use 20
						var checkYear = mToday.getFullYear() + 30;
						var mCheckYear = '20' + mYear;
						if (mCheckYear >= checkYear)
							mYear = '19' + mYear;
						else
							mYear = '20' + mYear;
					}
					var vDateValueCheck = mMonth+strSeperator+mDay+strSeperator+mYear;
					if (!dateValid(vDateValueCheck)) {
						//Invalid Date\nPlease Re-Enter
						alert(getLabel('FMS_COM_ALT002'));
						
						vDateName.value = "";
						vDateName.focus();
						vDateName.select();
						return false;
					}
					return true;
				}else {

					// Reformat the date for validation and set date type to a 1
					if (vDateValue.length >= 8  && dateCheck) {
						if (vDateType == 1) // mmddyyyy
						{
							var mDay = vDateName.value.substr(2,2);
							var mMonth = vDateName.value.substr(0,2);
							var mYear = vDateName.value.substr(4,4)
							vDateName.value = mMonth+strSeperator+mDay+strSeperator+mYear;
						}

						if (vDateType == 2) // yyyymmdd
						{
							var mYear = vDateName.value.substr(0,4)
							var mMonth = vDateName.value.substr(4,2);
							var mDay = vDateName.value.substr(6,2);
							vDateName.value = mYear+strSeperator+mMonth+strSeperator+mDay;
						}

						if (vDateType == 3) // ddmmyyyy
						{
							var mMonth = vDateName.value.substr(2,2);
							var mDay = vDateName.value.substr(0,2);
							var mYear = vDateName.value.substr(4,4)
							vDateName.value = mDay+strSeperator+mMonth+strSeperator+mYear;
						}

						//Create a temporary variable for storing the DateType and change
						//the DateType to a 1 for validation.
						var vDateTypeTemp = vDateType;
						vDateType = 1;
						var vDateValueCheck = mMonth+strSeperator+mDay+strSeperator+mYear;
						if (!dateValid(vDateValueCheck)) {
							//Invalid Date\nPlease Re-Enter
							alert(getLabel('FMS_COM_ALT002'));
							
							vDateType = vDateTypeTemp;
							vDateName.value = "";
							vDateName.focus();
							vDateName.select();
							return false;
						}
						vDateType = vDateTypeTemp;
						return true;
					}else {
						if (((vDateValue.length < 8 && dateCheck) || (vDateValue.length == 9 && dateCheck)) && (vDateValue.length >=1)) {
							//Invalid Date\nPlease Re-Enter
							alert(getLabel('FMS_COM_ALT002'));
							
							vDateName.value = "";
							vDateName.focus();
							vDateName.select();
							return false;
						}
					}
				}


	//IE
	}else {

		// Non isNav Check
		if (((vDateValue.length < 8 && dateCheck) || (vDateValue.length == 9 && dateCheck)) && (vDateValue.length >=1)) {
			//Invalid Date\nPlease Re-Enter
			alert(getLabel('FMS_COM_ALT002'));
			
			vDateName.value = "";
			vDateName.focus();
			return false;
		}

		if (vDateValue.length >= 8) {
			if (window.event.type == "blur") {
				var sepCnt = vDateValue.split(strSeperator).length - 1;
				if(sepCnt<2){
					alert(getLabel('FMS_COM_ALT002'));
					
					vDateName.value = "";
					vDateName.focus();
					return false;
				}
			}
		}

		// Reformat date to format that can be validated. mm/dd/yyyy
		if (vDateValue.length >= 8 && dateCheck) {

			var sepCnt = vDateValue.split(strSeperator).length - 1;
			if(sepCnt<2){
				alert(getLabel('FMS_COM_ALT002'));
				
				vDateName.value = "";
				vDateName.focus();
				return false;
			}
			
			// Additional date formats can be entered here and parsed out to
			// a valid date format that the validation routine will recognize.
			if (vDateType == 1) // mm/dd/yyyy
			{
				var mMonth = vDateName.value.substr(0,2);
				var mDay = vDateName.value.substr(3,2);
				var mYear = vDateName.value.substr(6,4)
			}
			if (vDateType == 2) // yyyy/mm/dd
			{
				var mYear = vDateName.value.substr(0,4)
				var mMonth = vDateName.value.substr(5,2);
				var mDay = vDateName.value.substr(8,2);
			}
			if (vDateType == 3) // dd/mm/yyyy
			{
				var mDay = vDateName.value.substr(0,2);
				var mMonth = vDateName.value.substr(3,2);
				var mYear = vDateName.value.substr(6,4)
			}

			// Create temp. variable for storing the current vDateType
			var vDateTypeTemp = vDateType;

			// Change vDateType to a 1 for standard date format for validation
			// Type will be changed back when validation is completed.
			vDateType = 1;

			// Store reformatted date to new variable for validation.
			var vDateValueCheck = mMonth+strSeperator+mDay+strSeperator+mYear;


			if (mYear.length == 2 && vYearType == 4 && dateCheck) {

				//Turn a two digit year into a 4 digit year
				var mToday = new Date();
				//If the year is greater than 30 years from now use 19, otherwise use 20
				var checkYear = mToday.getFullYear() + 30;
				var mCheckYear = '20' + mYear;

				if (mCheckYear >= checkYear)
					mYear = '19' + mYear;
				else
					mYear = '20' + mYear;

				vDateValueCheck = mMonth+strSeperator+mDay+strSeperator+mYear;

				// Store the new value back to the field.  This function will
				// not work with date type of 2 since the year is entered first.
				if (vDateTypeTemp == 1) // mm/dd/yyyy
					vDateName.value = mMonth+strSeperator+mDay+strSeperator+mYear;

				if (vDateTypeTemp == 3) // dd/mm/yyyy
				vDateName.value = mDay+strSeperator+mMonth+strSeperator+mYear;

			}
			
			if (vYearLength == 4) {
				if (mYear.length < 4) {
					//Invalid Date\nPlease Re-Enter
					alert(getLabel('FMS_COM_ALT002'));
					vDateName.value = "";
					vDateName.focus();
					return false;
				} else if(parseInt(mYear) < 1900) {
					//Year must be greater than 1900.
					alert(getLabel('FMS_COM_ALT041'));
					vDateName.value = "";
					vDateName.focus();
					return false;
				}
			}


			if (!dateValid(vDateValueCheck)) {
				//Invalid Date\nPlease Re-Enter
				alert(getLabel('FMS_COM_ALT002'));
				
				vDateType = vDateTypeTemp;
				vDateName.value = "";
				vDateName.focus();
				return false;
			}
			vDateType = vDateTypeTemp;
			return true;

		}else {

			if (vDateType == 1) {
				if (vDateValue.length == 2) {
					vDateName.value = vDateValue+strSeperator;
				}
				if (vDateValue.length == 5) {
					vDateName.value = vDateValue+strSeperator;
				}
			}

			if (vDateType == 2) {
				if (vDateValue.length == 4) {
					vDateName.value = vDateValue+strSeperator;
				}
				if (vDateValue.length == 7) {
					vDateName.value = vDateValue+strSeperator;
				}
			}

			if (vDateType == 3) {
					if (vDateValue.length == 2) {
						vDateName.value = vDateValue+strSeperator;
					}
					if (vDateValue.length == 5) {
						vDateName.value = vDateValue+strSeperator;
				   }
				}
				return true;
			   }
			}
			if (vDateValue.length == 10&& dateCheck) {
				if (!dateValid(vDateName)) {
				// Un-comment the next line of code for debugging the dateValid() function error messages
				//alert(888);
				//Invalid Date\nPlease Re-Enter
				alert(getLabel('FMS_COM_ALT002'));
					
				vDateName.focus();
				vDateName.select();
			   }
			}
			return false;
	//onblur인 경우
	}else {
			// If the value is not in the string return the string minus the last
			// key entered.
			if (isNav4) {
				vDateName.value = "";
				vDateName.focus();
				vDateName.select();
				return false;
			}else{
				// OYH MM-DD-YYYY 형태일때 vDateName 값을 설정한다. ()
				if (vDateName.length > 10 ){
					vDateName.value = vDateName.value.substr(0, (vDateValue.length));
				}
				return false;
			}
		}
	}
}

//vDateName = object name
//vDateValue = value in the field being checked
//e = event
//dateCheck
//True  = Verify that the vDateValue is a valid date
//False = Format values being entered into vDateValue only
//vDateType
//1 = mm/dd/yyyy
//2 = yyyy/mm/dd
//3 = dd/mm/yyyy
function DateFormat(vDateName, vDateValue, e, dateCheck, dateType) {
	dateFmtOK = false;
	if (e.keyCode == 13 && vDateValue == "") {
		var objPrefix = (vDateName.name.replace("_str", "_").replace("_end", "_").replace("_fm", "").replace("_to", "") + "_cal");
		var colBtnImg = document.getElementById(objPrefix);
		if (colBtnImg != null && colBtnImg != "undefined" && colBtnImg != undefined) {
			document.getElementById(objPrefix).fireEvent("onclick");
			return;
		}
	}

	vDateType = dateType;

	//Enter a tilde sign for the first number and you can check the variable information.
	
	/* jsjang 2013.8.9 #19288 요건에 의하여 불필요 로직이므로 주석처리
	if (vDateValue == "~") {
		alert("AppVersion = "+navigator.appVersion+" \nNav. 4 Version = "+isNav4+" \nNav. 5 Version = "+isNav5+" \nIE Version = "+isIE4+" \nYear Type = "+vYearType+" \nDate Type = "+vDateType+" \nSeparator = "+strSeperator);
		vDateName.value = "";
		vDateName.focus();
		return true;
	}
	*/
	
	var whichCode = (e.which) ? e.which : e.keyCode;
	
	if (e.type == "blur") whichCode = 0;

	// Check to see if a seperator is already present.
	// bypass the date if a seperator is present and the length greater than 8
	if (vDateValue.length > 8 && isNav4) {
		if ((vDateValue.indexOf("-") >= 1) || (vDateValue.indexOf("/") >= 1))
			dateFmtOK = true;
			return true;
	}
	if(vDateValue.length>9){

	}
	

	//#2555 [LBS]Date Validation 오류
	if (vDateValue.search(/[^0-9\-]/) != -1) {
		alert(getLabel('FMS_COM_ALT002'));
		if (isNav4) {
			vDateName.value = "";
			vDateName.focus();
			vDateName.select();
			return false;
		}else {

			vDateName.value = "";
			return false;
		}
	}

	if (whichCode == 8){ //Ignore the Netscape value for backspace. IE has no value
		return false;
	}else {
		//Create numeric string values for 0123456789/
		//The codes provided include both keyboard and keypad values
		var strCheck = '47,48,49,50,51,52,53,54,55,56,57,58,59,81,95,96,97,98,99,100,101,102,103,104,105';

		if (strCheck.indexOf(whichCode) != -1) {

			//Nescape
			if (isNav4) {

				if (((vDateValue.length < 6 && dateCheck) || (vDateValue.length == 7 && dateCheck)) && (vDateValue.length >=1)) {
					//Invalid Date\nPlease Re-Enter
					alert(getLabel('FMS_COM_ALT002'));
					
					vDateName.value = "";
					vDateName.focus();
					vDateName.select();
					return false;
				}
				if (vDateValue.length == 6 && dateCheck) {
					var mDay = vDateName.value.substr(2,2);
					var mMonth = vDateName.value.substr(0,2);
					var mYear = vDateName.value.substr(4,4)

					//Turn a two digit year into a 4 digit year
					if (mYear.length == 2 && vYearType == 4) {
						var mToday = new Date();
						//If the year is greater than 30 years from now use 19, otherwise use 20
						var checkYear = mToday.getFullYear() + 30;
						var mCheckYear = '20' + mYear;
						if (mCheckYear >= checkYear)
							mYear = '19' + mYear;
						else
							mYear = '20' + mYear;
					}
					var vDateValueCheck = mMonth+strSeperator+mDay+strSeperator+mYear;
					if (!dateValid(vDateValueCheck)) {
						//Invalid Date\nPlease Re-Enter
						alert(getLabel('FMS_COM_ALT002'));
						
						vDateName.value = "";
						vDateName.focus();
						vDateName.select();
						return false;
					}
					dateFmtOK = true;
					return true;
				}else {

					// Reformat the date for validation and set date type to a 1
					if (vDateValue.length >= 8  && dateCheck) {
						if (vDateType == 1) // mmddyyyy
						{
							var mDay = vDateName.value.substr(2,2);
							var mMonth = vDateName.value.substr(0,2);
							var mYear = vDateName.value.substr(4,4)
							vDateName.value = mMonth+strSeperator+mDay+strSeperator+mYear;
						}

						if (vDateType == 2) // yyyymmdd
						{
							var mYear = vDateName.value.substr(0,4)
							var mMonth = vDateName.value.substr(4,2);
							var mDay = vDateName.value.substr(6,2);
							vDateName.value = mYear+strSeperator+mMonth+strSeperator+mDay;
						}

						if (vDateType == 3) // ddmmyyyy
						{
							var mMonth = vDateName.value.substr(2,2);
							var mDay = vDateName.value.substr(0,2);
							var mYear = vDateName.value.substr(4,4)
							vDateName.value = mDay+strSeperator+mMonth+strSeperator+mYear;
						}

						//Create a temporary variable for storing the DateType and change
						//the DateType to a 1 for validation.
						var vDateTypeTemp = vDateType;
						vDateType = 1;
						var vDateValueCheck = mMonth+strSeperator+mDay+strSeperator+mYear;
						if (!dateValid(vDateValueCheck)) {
							//Invalid Date\nPlease Re-Enter
							alert(getLabel('FMS_COM_ALT002'));
							
							vDateType = vDateTypeTemp;
							vDateName.value = "";
							vDateName.focus();
							vDateName.select();
							return false;
						}
						vDateType = vDateTypeTemp;
						dateFmtOK = true;
						return true;
					}else {
						if (((vDateValue.length < 8 && dateCheck) || (vDateValue.length == 9 && dateCheck)) && (vDateValue.length >=1)) {
							//Invalid Date\nPlease Re-Enter
							alert(getLabel('FMS_COM_ALT002'));
							
							vDateName.value = "";
							vDateName.focus();
							vDateName.select();
							return false;
						}
					}
				}


	//IE
	}else {
		
		/* jsjang 2013.8.12 #16909 날짜 입력 Start */
		//Turn a two digit year into a 4 digit year
		var vToday = new Date();
		var vYear;
		//If the year is greater than 30 years from now use 19, otherwise use 20
		var chkYear = vToday.getFullYear();
		var vYear = chkYear;	

/*		// 입력모드인지 수정모드인지 판단
		alert(1);
		if (vDateValue.length > 8 ) {
			return true;		
		}
		*/
		
		// 년도를 체크한다.
		if (vDateValue.length == 6 && dateCheck) {
			var sepCnt = vDateValue.split(strSeperator).length - 1;
			if(sepCnt<2){
				var mToday = new Date();
				var sYear;
				var checkYear = mToday.getFullYear() + 30;
				var mCheckYear = '20';

				if (mCheckYear >= checkYear)
					sYear = '19';
				else
					sYear = '20';

				var mMonth = vDateName.value.substr(0,2);
				var mDay = vDateName.value.substr(2,2);
				var mYear = sYear+vDateName.value.substr(4,2);	
				
				vDateValueCheck = mMonth+strSeperator+mDay+strSeperator+mYear;
				//alert(vDateValueCheck);
			}else{
				vDateValueCheck = vDateValue+vYear;
			}
			if (!dateValid(vDateValueCheck)) {
				//Invalid Date\nPlease Re-Enter
				alert(getLabel('FMS_COM_ALT002'));
				
				//vDateType = vDateTypeTemp;
				vDateName.value = "";
				vDateName.focus();
				return false;
			}
			vDateName.value = vDateValueCheck;
			dateFmtOK = true;
			return false;
		}
		
		
		if ( (vDateValue.length == 4) && dateCheck) {
			var sepCnt = vDateValue.split(strSeperator).length - 1;
			
			if(sepCnt<2){
				
					var mMonth = vDateName.value.substr(0,2);
					var mDay = vDateName.value.substr(2,2);
					var mYear = vYear;		
				
			}	
			var vDateTypeTemp = vDateType;
			vDateValueCheck = mMonth+strSeperator+mDay+strSeperator+mYear;
			//alert(vDateValueCheck);
			
			if (!dateValid(vDateValueCheck)) {
				//Invalid Date\nPlease Re-Enter
				alert(getLabel('FMS_COM_ALT002'));
				
				vDateType = vDateTypeTemp;
				vDateName.value = "";
				vDateName.focus();
				return false;
			}
			vDateType = vDateTypeTemp;
			vDateName.value = vDateValueCheck;
			dateFmtOK = true;
			return true;			
		}		
		/* jsjang 2013.8.12 #16909 날짜 입력 End */

		// Non isNav Check
		if (((vDateValue.length < 8 && dateCheck) || (vDateValue.length == 9 && dateCheck)) && (vDateValue.length >=1)) {
			//Invalid Date\nPlease Re-Enter
			alert(getLabel('FMS_COM_ALT002'));
			
			vDateName.value = "";
			vDateName.focus();
			return false;
		}

		// Reformat date to format that can be validated. mm/dd/yyyy
		if (vDateValue.length >= 8 && dateCheck) {

			var sepCnt = vDateValue.split(strSeperator).length - 1;

			// Additional date formats can be entered here and parsed out to
			// a valid date format that the validation routine will recognize.
			if (vDateType == 1) // mm/dd/yyyy
			{
				var mMonth = vDateName.value.substr(0,2);
				var mDay = vDateName.value.substr(3,2);
				var mYear = vDateName.value.substr(6,4)
			}
			if (vDateType == 2) // yyyy/mm/dd
			{
				var mYear = vDateName.value.substr(0,4)
				var mMonth = vDateName.value.substr(5,2);
				var mDay = vDateName.value.substr(8,2);
			}
			if (vDateType == 3) // dd/mm/yyyy
			{
				var mDay = vDateName.value.substr(0,2);
				var mMonth = vDateName.value.substr(3,2);
				var mYear = vDateName.value.substr(6,4)
			}
			
			if(sepCnt<2){
				/*
				alert(getLabel('FMS_COM_ALT002'));
				
				vDateName.value = "";
				vDateName.focus();
				return false;
				*/
				
				var mMonth = vDateName.value.substr(0,2);
				var mDay = vDateName.value.substr(2,2);
				var mYear = vDateName.value.substr(6,4);	
			}			

			// Create temp. variable for storing the current vDateType
			var vDateTypeTemp = vDateType;

			// Change vDateType to a 1 for standard date format for validation
			// Type will be changed back when validation is completed.
			vDateType = 1;

			// Store reformatted date to new variable for validation.
			var vDateValueCheck = mMonth+strSeperator+mDay+strSeperator+mYear;


			if (mYear.length == 2 && vYearType == 4 && dateCheck) {

				//Turn a two digit year into a 4 digit year
				var mToday = new Date();
				//If the year is greater than 30 years from now use 19, otherwise use 20
				var checkYear = mToday.getFullYear() + 30;
				var mCheckYear = '20' + mYear;

				if (mCheckYear >= checkYear)
					mYear = '19' + mYear;
				else
					mYear = '20' + mYear;

				vDateValueCheck = mMonth+strSeperator+mDay+strSeperator+mYear;

				// Store the new value back to the field.  This function will
				// not work with date type of 2 since the year is entered first.
				if (vDateTypeTemp == 1) // mm/dd/yyyy
					vDateName.value = mMonth+strSeperator+mDay+strSeperator+mYear;

				if (vDateTypeTemp == 3) // dd/mm/yyyy
				vDateName.value = mDay+strSeperator+mMonth+strSeperator+mYear;

			}
			
			if (vYearLength == 4) {
				if (mYear.length < 4) {
					//Invalid Date\nPlease Re-Enter
					alert(getLabel('FMS_COM_ALT002'));
					vDateName.value = "";
					vDateName.focus();
					return false;
				} else if(parseInt(mYear) < 1900) {
					//Year must be greater than 1900.
					alert(getLabel('FMS_COM_ALT041'));
					vDateName.value = "";
					vDateName.focus();
					return false;
				}
			}


			if (!dateValid(vDateValueCheck)) {
				//Invalid Date\nPlease Re-Enter
				alert(getLabel('FMS_COM_ALT002'));
				
				vDateType = vDateTypeTemp;
				vDateName.value = "";
				vDateName.focus();
				return false;
			}
			vDateType = vDateTypeTemp;
			dateFmtOK = true;
			return true;

		}else {
			
			if (vDateType == 1) {
				if (vDateValue.length == 2) {
					vDateName.value = vDateValue+strSeperator;
				}
				if (vDateValue.length == 5) {
					vDateName.value = vDateValue+strSeperator;
				}
			}

			if (vDateType == 2) {
				if (vDateValue.length == 4) {
					vDateName.value = vDateValue+strSeperator;
				}
				if (vDateValue.length == 7) {
					vDateName.value = vDateValue+strSeperator;
				}
			}

			if (vDateType == 3) {
					if (vDateValue.length == 2) {
						vDateName.value = vDateValue+strSeperator;
					}
					if (vDateValue.length == 5) {
						vDateName.value = vDateValue+strSeperator;
				   }
				}
				dateFmtOK = true;
				return true;
			   }
			}
			if (vDateValue.length == 10&& dateCheck) {
				if (!dateValid(vDateName)) {
				// Un-comment the next line of code for debugging the dateValid() function error messages
				//alert(888);
				//Invalid Date\nPlease Re-Enter
				alert(getLabel('FMS_COM_ALT002'));
					
				vDateName.focus();
				vDateName.select();
			   }
			}
			return false;
	//onblur인 경우
	}else {
		
			// If the value is not in the string return the string minus the last
			// key entered.
			if (isNav4) {
				vDateName.value = "";
				vDateName.focus();
				vDateName.select();
				dateFmtOK = true;
				return false;
			}else{
				
				// OYH MM-DD-YYYY 형태일때 vDateName 값을 설정한다. ()
				if (vDateName.length > 10 ){
					vDateName.value = vDateName.value.substr(0, (vDateValue.length));
				}
				dateFmtOK = true;
				return false;
			}
		}
	}
	dateFmtOK = true;
}

function dateValid(objName) {
	var strDate;
	var strDateArray;
	var strDay;
	var strMonth;
	var strYear;
	var intday;
	var intMonth;
	var intYear;
	var booFound = false;
	var datefield = objName;
	var strSeparatorArray = new Array("-"," ","/",".");
	var intElementNr;

	// var err = 0;
	var strMonthArray = new Array(12);
	strMonthArray[0] = "Jan";
	strMonthArray[1] = "Feb";
	strMonthArray[2] = "Mar";
	strMonthArray[3] = "Apr";
	strMonthArray[4] = "May";
	strMonthArray[5] = "Jun";
	strMonthArray[6] = "Jul";
	strMonthArray[7] = "Aug";
	strMonthArray[8] = "Sep";
	strMonthArray[9] = "Oct";
	strMonthArray[10] = "Nov";
	strMonthArray[11] = "Dec";

	//strDate = datefield.value;
	strDate = objName;
	if (strDate.length < 1) {
		return true;
	}

	for (intElementNr = 0; intElementNr < strSeparatorArray.length; intElementNr++) {
		if (strDate.indexOf(strSeparatorArray[intElementNr]) != -1) {
			strDateArray = strDate.split(strSeparatorArray[intElementNr]);
			if (strDateArray.length != 3) {
				err = 1;
				return false;
			}else {
				strDay = strDateArray[0];
				strMonth = strDateArray[1];
				strYear = strDateArray[2];
			}
			booFound = true;
	   }
	}

	if (booFound == false) {
		if (strDate.length>5) {
			strDay = strDate.substr(0, 2);
			strMonth = strDate.substr(2, 2);
			strYear = strDate.substr(4);
		}
	}

	//Adjustment for short years entered
	if (strYear.length == 2) {
		strYear = '20' + strYear;
	}
	strTemp = strDay;
	strDay = strMonth;
	strMonth = strTemp;
	intday = parseInt(strDay, 10);
	if (isNaN(intday)) {
		err = 2;
		return false;
	}

	intMonth = parseInt(strMonth, 10);
	if (isNaN(intMonth)) {
		for (i = 0;i<12;i++) {
			if (strMonth.toUpperCase() == strMonthArray[i].toUpperCase()) {
				intMonth = i+1;
				strMonth = strMonthArray[i];
				i = 12;
			}
		}
		if (isNaN(intMonth)) {
			err = 3;
			return false;
	   }
	}
	intYear = parseInt(strYear, 10);

	if (intYear < 1000) {
		err = 4;
		return false;
	}
	if (isNaN(intYear)) {
		err = 4;
		return false;
	}
	if (intMonth>12 || intMonth<1) {
		err = 5;
		return false;
	}
	if ((intMonth == 1 || intMonth == 3 || intMonth == 5 || intMonth == 7 || intMonth == 8 || intMonth == 10 || intMonth == 12) && (intday > 31 || intday < 1)) {
		err = 6;
		return false;
	}
	if ((intMonth == 4 || intMonth == 6 || intMonth == 9 || intMonth == 11) && (intday > 30 || intday < 1)) {
		err = 7;
		return false;
	}

	if (intMonth == 2) {
		if (intday < 1) {
			err = 8;
			return false;
		}
		if (LeapYear(intYear) == true) {
			if (intday > 29) {
				err = 9;
				return false;
			}
		}else {
			if (intday > 28) {
				err = 10;
				return false;
			}
		}
	}
	return true;
}

//#48748 - [BINEX] BL ENTRY 에서 TERM으로 DATE 관련 WARNING 추가
function dateRangeValid(objName, valName) {
	
	var opt_key_sec = "BL_WARNING_DAYS";
    ajaxSendPost(setBlWarningDaysReq, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key_sec, "./GateServlet.gsl");
    
	var strDate = objName.value.replaceAll("-", "");
	var strDay;
	var strMonth;
	var strYear;
	
	if(strDate.length < 1) return;
	if(BL_WARNING_DAYS == "0" || BL_WARNING_DAYS == "") return;
	
	strYear = strDate.substr(4);
	strDay = strDate.substr(2, 2);
	strMonth = strDate.substr(0, 2);
	
	var mToday = new Date();
	var inputDate = new Date(strYear, strMonth - 1, strDay);
	
	if((inputDate < new Date(mToday.getFullYear(), mToday.getMonth(), mToday.getDate() - Number(BL_WARNING_DAYS))) || (inputDate > new Date(mToday.getFullYear(), mToday.getMonth(), mToday.getDate() + Number(BL_WARNING_DAYS)))){
		var objArr = new Array();
		objArr[0] = valName; 
		objArr[1] = BL_WARNING_DAYS;     
		alert(getLabel2('FMS_COM_ALT082', objArr));
		objName.value = "";
		objName.focus();
		return;
	}
}

function dateRangeGridValid(sheetObj, Row, ColId, valName) {
	
	var opt_key_sec = "BL_WARNING_DAYS";
    ajaxSendPost(setBlWarningDaysReq, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key_sec, "./GateServlet.gsl");
    
	var strDate = sheetObj.GetCellValue(Row, ColId);
	var strDay;
	var strMonth;
	var strYear;
	
	if(strDate.length < 1) return;
	if(BL_WARNING_DAYS == "0" || BL_WARNING_DAYS == "") return;
	
	strYear = strDate.substr(0, 4);
	strMonth = strDate.substr(4, 2);
	strDay = strDate.substr(6, 2);
	
	var mToday = new Date();
	var inputDate = new Date(strYear, strMonth - 1, strDay);
	
	if((inputDate < new Date(mToday.getFullYear(), mToday.getMonth(), mToday.getDate() - Number(BL_WARNING_DAYS))) || (inputDate > new Date(mToday.getFullYear(), mToday.getMonth(), mToday.getDate() + Number(BL_WARNING_DAYS)))){
		var objArr = new Array();
		objArr[0] = valName; 
		objArr[1] = BL_WARNING_DAYS;     
		alert(getLabel2('FMS_COM_ALT082', objArr));
		sheetObj.SetCellValue(Row, ColId, "");
		sheetObj.SelectCell(Row, ColId, false);
		return;
	}
}

var BL_WARNING_DAYS = "180";

function setBlWarningDaysReq(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	if (doc[0]=="OK" && doc[1]!="undefined" && doc[1]!=undefined ) {
		BL_WARNING_DAYS = doc[1];
	}
}

//#1455 - [WMS4.0] [BNX ATL] Date Entry Range Validation to WMS
function dateWmsRangeValid(objName, valName, futureFlg) {
	
	var opt_key_sec = "WMS_WARNING_DAYS";
	ajaxSendPost(setWmsWarningDaysReq, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key_sec, "./GateServlet.gsl");
	
	var strDate = objName.value.replaceAll("-", "");
	var strDay;
	var strMonth;
	var strYear;
	
	if(strDate.length < 1) return;
	if(WMS_WARNING_DAYS == "0" || WMS_WARNING_DAYS == "") return;
	
	strYear = strDate.substr(4);
	strDay = strDate.substr(2, 2);
	strMonth = strDate.substr(0, 2);
	
	var mToday = new Date();
	var inputDate = new Date(strYear, strMonth - 1, strDay);
	
	// 미래 일자 입력 불가
	if (futureFlg == "true") {
		if (inputDate > mToday) {
			alert(getLabel('WMS_MSG005'));
			objName.value = "";
			objName.focus();
			return;
		}
	}
	
	if((inputDate < new Date(mToday.getFullYear(), mToday.getMonth(), mToday.getDate() - Number(WMS_WARNING_DAYS))) || (inputDate > new Date(mToday.getFullYear(), mToday.getMonth(), mToday.getDate() + Number(WMS_WARNING_DAYS)))){
		var objArr = new Array();
		objArr[0] = valName; 
		objArr[1] = WMS_WARNING_DAYS;     
		alert(getLabel2('FMS_COM_ALT082', objArr));
		objName.value = "";
		objName.focus();
		return;
	}
}

var WMS_WARNING_DAYS = "180";

function setWmsWarningDaysReq(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	if (doc[0]=="OK" && doc[1]!="undefined" && doc[1]!=undefined ) {
		WMS_WARNING_DAYS = doc[1];
	}
}

function LeapYear(intYear) {
	if (intYear % 100 == 0) {
		if (intYear % 400 == 0) return true;
	} else {
		if ((intYear % 4) == 0) return true;
	}
	return false;
}
//  End -->


/**
 *오늘 일자를 yyyyMMdd로 호출함
 */
function todayStr() {
	var today = new Date()
	var rtnStr = today.getFullYear();
		rtnStr+= strSeperator;
		rtnStr+= (today.getMonth()+1)<10?'0'+(today.getMonth()+1):(today.getMonth()+1);
		rtnStr+= strSeperator;
	    rtnStr+= today.getDate();
	return rtnStr;
}

// MMDDYYYY
function todayStrNewStyle() {
	var today = new Date()
	var rtnStr = (today.getMonth()+1)<10?'0'+(today.getMonth()+1):(today.getMonth()+1);
	rtnStr+= strSeperator;
	rtnStr+= today.getDate();
	rtnStr+= strSeperator;
	rtnStr += today.getFullYear();
	return rtnStr;
}

function todayYear() {
	var today = new Date()
	var rtnStr = today.getFullYear();
	return rtnStr;
}

function todayMonth() {
	var today = new Date()
	var rtnStr= today.getMonth()+1;
	return rtnStr;
}

function todayDate() {
	var today = new Date()
	var rtnStr= today.getDate();
	return rtnStr;
}

/**
 * 기본 조회기간 일자 범위
 */
var DEFAULT_DT_PERIOD = 60;

/**
 * 로드시 From ~ To 일자를 Setting함
 * @fromDtObj
 * @toDtObj
 * @isCheckVal true: fromDtObj에 값이 있는지 확인함. 값이 있는 경우 기본값을 생성하지 않음. false: 무조건 기본값을 Setting함
 */
function setFromToDt(fromDtObj, toDtObj, isCheckVal){

	if(isCheckVal){
		//시작일자가 없는경우 Default일자를 Setting함
		if(fromDtObj.value==''){
			//From일자 Setting함
			fromDtObj.value = getDateStr(false, DEFAULT_DT_PERIOD);

			//To일자 Setting함
			toDtObj.value   = getTodayStr();
		}

	}else{
		//From일자 Setting함
		fromDtObj.value = getDateStr(false, DEFAULT_DT_PERIOD);

		//To일자 Setting함
		toDtObj.value   = getTodayStr();
	}
}


function setFromToDtEndPlus(fromDtObj, fromAddCnt, toDtObj, toAddCnt){

	if(fromAddCnt==-1){
		fromAddCnt = DEFAULT_DT_PERIOD;
	}
	//From일자 Setting함
	fromDtObj.value = getDateStr(false, fromAddCnt);

	//To일자 Setting함
	toDtObj.value   = getDateStr(true, toAddCnt);
}

/**
 * 현재일자를 시스템 Default 데이터 포맷으로 리턴함
 *  Default Date Format = MM-dd-yyyy
 *  @param formatStr must be like this format: yyyy-MM-dd
 */
function getTodayStr(formatStr) {
	var today = new Date()
	var rtnStr = '';
	var tmpVal = '';

	tmpVal = today.getMonth()+1;

	if(tmpVal<10){
		rtnStr+= '0';
	}
	rtnStr+= tmpVal;
	rtnStr+= strSeperator;

	tmpVal = today.getDate();
	if(tmpVal<10){
		rtnStr+= '0';
	}
	rtnStr+= tmpVal;
	rtnStr+= strSeperator;

	rtnStr+= today.getFullYear();

	if (formatStr != undefined) {
		var month = today.getMonth()+ 1;
		month = month >= 10 ? month : ("0" + month);
		var mDt = today.getDate();
		mDt = mDt >= 10 ? mDt : ("0" + mDt);
		rtnStr = formatStr.replace('yyyy', today.getFullYear()).replace('MM', month).replace('dd', mDt);
	}
    return rtnStr;
}

/**
 * 현재 일자를 기준으로 원하는 날자를 계산한다.
 * @rtnObj 결과를 담을 Object
 * @isPlus 계산타입 true:이후일자 조회, false: 이전일자조회
 * @calcNum 추가/차감할 일자
 */
function getDateStr(isPlus, calcNum){
	var plann = eval(calcNum);
	var annitime;

	var Meet = new Date();
	if(isPlus == true){
		annitime = Meet.getTime()+plann*1000*3600*24;
	}else{
		annitime = Meet.getTime()-plann*1000*3600*24;
	}

	var anniday = new Date();
	anniday.setTime(annitime);

	var plusmonth = anniday.getMonth()+1;
	var plusyear  = anniday.getFullYear();//(anniday.getYear()<100)?"19"+anniday.getYear():anniday.getYear();
	var plusday   = anniday.getDate();

	return fullZero(plusmonth,2)+"-"+fullZero(plusday,2)+"-"+plusyear ;
}


/**
 * 현재 일자를 기준으로 원하는 날자를 계산한다.
 * @rtnObj 결과를 담을 Object
 * @isPlus 계산타입 true:이후일자 조회, false: 이전일자조회
 * @calcNum 추가/차감할 일자
 */
function getToday(isPlus, calcNum){
	var plann = eval(calcNum);
	var annitime;

	var Meet = new Date();
	if(isPlus == true){
		annitime = Meet.getTime()+plann*1000*3600*24;
	}else{
		annitime = Meet.getTime()-plann*1000*3600*24;
	}

	var anniday = new Date();
	anniday.setTime(annitime);

	var plusmonth = anniday.getMonth()+1;
	var plusyear  = (anniday.getYear()<100)?"19"+anniday.getYear():anniday.getYear();
	var plusday   = anniday.getDate();

	//2011.11.02 Chungrue 수정 mm-dd-yyyy
	return  fullZero(plusmonth,2)+"-"+fullZero(plusday,2)+"-"+plusyear;
}

function timeFormat(obj){
	if((ComGetEvent("keycode")>47&&ComGetEvent("keycode")<58)||(ComGetEvent("keycode")>95&&ComGetEvent("keycode")<106)){
		var tmpStr = obj.value;
		var curLen = tmpStr.length;

		if(curLen==1){
			if(tmpStr>2){
				alert('Invalid time!');
				obj.value = '';
				obj.focus();
			}
		}else if(curLen==2){
			//2010.12.15 김진혁 수정, 시간을 00:00 ~ 24:00로 입력할 수 있도록 확장, 기존은 tmpStr<1||tmpStr>24 였음.
			if(tmpStr<0||tmpStr>24){
				alert('Invalid time!');
				obj.value = '';
				obj.focus();
			}else{
				obj.value = tmpStr+':';
			}
		}else if(curLen>2){
			var idxLen = tmpStr.indexOf(':');
			if(idxLen==-1){
				obj.value = tmpStr.substring(0, 2)+':'+tmpStr.substring(2);
			}

			if(tmpStr.length==4){
				if(tmpStr.substring(3)>6){
					alert('Invalid time!');
					obj.value = '';
					obj.focus();
				}

			}else if(tmpStr.length==5){
				if(tmpStr.substring(3)>60){
					alert('Invalid time!');
					obj.value = '';
					obj.focus();
				}
			}
		}

	//}else if(ComGetEvent("keycode")==8||ComGetEvent("keycode")==9||ComGetEvent("keycode")==37||ComGetEvent("keycode")==39||ComGetEvent("keycode")==229){
	//}else{
		//var tmpStr = obj.value;
		//obj.value = tmpStr.substring(0, tmpStr.length-1);
	}
}

/**
 * 문자에 일자 포맷적
 */
function mkStrToDate(dateStr){
	if(dateStr.length==8){
		var rtnStr = dateStr.substring(0, 4)+'-'+dateStr.substring(4, 6)+'-'+dateStr.substring(6);
		return rtnStr;
	}else{
		return dateStr;
	}
}

/**
 * 문자에 시간 포맷적용
 */
function mkStrToTime(timeStr){
	if(timeStr.length==4){
		var rtnStr = timeStr.substring(0, 2)+':'+timeStr.substring(2);
		return rtnStr;
	}else{
		return timeStr;
	}
}

/*
 * 현재일자에서 diffMonth 만큼 떨어진 월의 첫번째 날을 반환
 */
function getMonthFirstDate(diffMonth){
	if(diffMonth == undefined){
		 diffMonth = 0;
	}

	var date, diffDate = "";
	var year, month, day = "";

    date = new Date();

    diffDate = new Date(date.getFullYear(), date.getMonth() + diffMonth, 1);
    month = diffDate.getMonth()+1;
    day   = diffDate.getDate();
    year  = diffDate.getFullYear();
    if(month<10){month = '0'+ month;}
	if(day<10){day =  '0' + day;}

	return month + "-" + day + "-" + year;
}

/*
 * 현재일자에서 diffMonth 만큼 떨어진 월의 마지막 날을 반환
 */
function getMonthLastDate(diffMonth){
	if(diffMonth == undefined){
		 diffMonth = 0;
	}

	var date, diffDate = "";
    var year, month, day = "";

    date = new Date();

    diffDate = new Date(date.getFullYear(), date.getMonth() + 1 + diffMonth, 0);
    month1 = diffDate.getMonth()+1;
    day1   = diffDate.getDate();
    year1  = diffDate.getFullYear();
    if(month1<10){month1 = '0'+ month1;}
    if(day1<10){day1 =  '0' + day1;}

    return month1 + "-" + day1 + "-" + year1;
}

function mkCharDateFormat(orgDate){
	//Month String Setting
	var strMonthArray = new HashMap();
	strMonthArray.put("01", "JANUARY");
	strMonthArray.put("02", "FEBRUARY");
	strMonthArray.put("03", "MARCH");
	strMonthArray.put("04", "APRIL");
	strMonthArray.put("05", "MAY");
	strMonthArray.put("06", "JUNE");
	strMonthArray.put("07", "JULY");
	strMonthArray.put("08", "AUGUST");
	strMonthArray.put("09", "SEPTEMBER");
	strMonthArray.put("10", "OCTOBER");
	strMonthArray.put("11", "NOVEMBER");
	strMonthArray.put("12", "DECEMBER");

	var tempDate = "";
	var month 	 = "";
	var day 	 = "";
	var year 	 = "";
	var result	 = "";

	if(orgDate!=""){
		tempDate = orgDate.replaceAll("-", "");
		month 	 = tempDate.substring(0,2);
		day 	 = tempDate.substring(2,4);
		year 	 = tempDate.substring(4,8);

		//Clean On Board에서 사용하는 Format
		result = strMonthArray.get(month) + " " + day + ", " + year;
	}

	return result;
}

function mkCharMonthFormat(orgMonth){
	//Month String Setting
	var strMonthArray = new HashMap();
	strMonthArray.put("01", "January");
	strMonthArray.put("02", "February");
	strMonthArray.put("03", "March");
	strMonthArray.put("04", "April");
	strMonthArray.put("05", "May");
	strMonthArray.put("06", "June");
	strMonthArray.put("07", "July");
	strMonthArray.put("08", "August");
	strMonthArray.put("09", "September");
	strMonthArray.put("10", "October");
	strMonthArray.put("11", "November");
	strMonthArray.put("12", "December");

	var result	 = "";

	if(orgMonth!=""){
		result = strMonthArray.get(orgMonth);
	}

	return result;
}

//HashMap 제공
function HashMap(){
	var mapVal  = {};    // private
    var pos     = new Array();
    this.get = function( key ){
        return mapVal[ key ];
    }
    this.getPos = function(n){
        return mapVal[ pos[n] ];
    }
    this.getKey = function( n){
    	return pos[n];
    }
    this.remove = function( n ){
        var ary = new Array();
        for( var i=0; i<pos.length; i++ ){
            if( i != n ){
                ary.push( pos[i] );
            }
        }
        pos = ary;
    }
    this.put = function( key, val ){
        mapVal[key] = val;
        var flg = true;
        for( var i=0; i<pos.length; i++ ){
            if( key == pos[i] ){
            	flg = false;
            }
        }
        if( flg ){
        	pos.push( key );
        }
    }
    this.size = function(){
        return pos.length;
    }
}


// Cursor가 blur됬을때 날싸포맷을 셋팅한다. mm-dd-yyyy
function setDateFormat(obj){

	var length = obj.value.length;
	if(length == 8){
		var strSeperator = "-";

		var mDay = obj.value.substr(2,2);
		var mMonth = obj.value.substr(0,2);
		var mYear = obj.value.substr(4,4)
		obj.value = mMonth+strSeperator+mDay+strSeperator+mYear;
	}


}


/**
 * 처음 Object와 두번째 Object 사이의 일자를 반환한다.
 * 이경우에 두번째 Object가 처음 Object 보다 나중 일자이다.
 * @param fromObj   Object
 * @param toObj     Object
 * @return int 두 Object 사이의 일자
 */
function getDaysBetweenFormat(fromObj, toObj, format) {
	var numstr1 = fromObj.value.replace(/\/|\-|\.|\s|\:/g, "");
	var numstr2 = toObj.value.replace(/\/|\-|\.|\s|\:/g, "");

	var userDtTm1 = "";
	var userDtTm2 = "";
	if (format == "MM-dd-yyyy") {
		userDtTm1 = new Date(numstr1.substr(4, 4), parseInt2(numstr1.substr(0, 2)) - 1, parseInt2(numstr1.substr(2, 2)));
		userDtTm2 = new Date(numstr2.substr(4, 4), parseInt2(numstr2.substr(0, 2)) - 1, parseInt2(numstr2.substr(2, 2)));

	} else if(format == "hh:mm") {
		if (numstr1 == "" ) numstr1 = "0000";
		if (numstr2 == "" ) numstr2 = "0000";
		userDtTm1 = new Date("", "", "", parseInt2(numstr1.substr(0, 2)), parseInt2(numstr1.substr(2, 2)));
		userDtTm2 = new Date("", "", "", parseInt2(numstr2.substr(0, 2)), parseInt2(numstr2.substr(2, 2)));

	} else {
		userDtTm1 = new Date(numstr1.substr(0, 4), parseInt2(numstr1.substr(4, 2)) - 1, parseInt2(numstr1.substr(6, 2)));
		userDtTm2 = new Date(numstr2.substr(0, 4), parseInt2(numstr2.substr(4, 2)) - 1, parseInt2(numstr2.substr(6, 2)));
	}

	var day_gab = Math.floor((userDtTm2.getTime() - userDtTm1.getTime()) / (60*60*24*1000));
	return day_gab;
}


/**
 * Check period data[from~to]
 * @param isReq period is mandatory field.
 * @param fmObj Form date object
 * @param toObj To date object
 * @return false: invalid input value, true: valid input value
 */
function chkSearchCmprPrd(isReq, fmObj, toObj){
 	//Date field is mandatory.
 	if(isReq){
 		if(fmObj.value==''){
 			alert(getLabel('FMS_COM_ALT002'));
 			fmObj.focus();
 			return false;
 			
 		}else if(toObj.value==''){
 			alert(getLabel('FMS_COM_ALT002'));
 			toObj.focus();
 			return false;
 		}

 	//Date field is optional.	
 	}else{
 		if(fmObj.value==''&&toObj.value!=''){
 			alert(getLabel('FMS_COM_ALT002'));
 			fmObj.focus();
 			return false;
 			
 		}else if(fmObj.value!=''&&toObj.value==''){
 			alert(getLabel('FMS_COM_ALT002'));
 			toObj.focus();
 			return false;
 		}
 	}
 	
 	
    if(compareTwoDate(fmObj.value, toObj.value)){
     	// curObj.value = '';
     	alert(getLabel('FMS_COM_ALT033'));
     	fmObj.focus();
     	return false;
    }else{
     	return true;
    }
}


 
/**
 * Check period data[from~to]
 * @param isReq period is mandatory field.
 * @param curObj The object which calls this function
 * @param fmObj Form date object
 * @param toObj To date object
 * @return false: invalid input value, true: valid input value
 */
function chkCmprPrd(flagVal, isReq, curObj, fmObj, toObj){
	if(flagVal){
 		if(curObj.value==''){
 			return;
 		}
 	}
	
 	if(!mkDateFormatRtn(curObj, event, true,1)){
 		return;
 	}
 	
 	//If the period is mandatory item. 
 	if(isReq){
 		if(curObj.value==''){
 			alert(getLabel('FMS_COM_ALT002'));
 			curObj.focus();
 			return;
 		}

 	 	if(curObj==fmObj&&fmObj.value==''&&toObj.value!=''){
 	 		alert(getLabel('FMS_COM_ALT002'));
 	 		fmObj.focus();
 	 		return;
 	 		
 	 	}else if(curObj==toObj&&toObj.value==''&&fmObj.value!=''){
 	 		alert(getLabel('FMS_COM_ALT002'));
 	 		toObj.focus();
 	 		return;
 	 	}
 	}

 	//Compare From ~ to date 
    if(compareTwoDate(fmObj.value, toObj.value)){
     	curObj.value = '';
     	alert(getLabel('FMS_COM_ALT033'));
     	curObj.focus();
     	return;
     }
}


/***
 * compare two date
 * 
 * return 
 *  true: if fromDate > toDate
 * */
function compareTwoDate(fromDateValue, toDateValue)
{
 	if(toDateValue == ""){
 		return false;
 	}
 		
 	fromDateValue = fromDateValue.replaceAll('-', '');
 	toDateValue   = toDateValue.replaceAll('-', '');
 	
 	var dayFrom   = fromDateValue.substring(2, 4);
 	var monthFrom = fromDateValue.substring(0, 2);
 	var yearFrom  = fromDateValue.substring(4, 8);
 	
 	var dayTo   = toDateValue.substring(2, 4);
 	var monthTo = toDateValue.substring(0, 2);
 	var yearTo  = toDateValue.substring(4, 8);
 	
     var dateFrom = new Date(yearFrom, monthFrom - 1, dayFrom);          
     var dateTo   = new Date(yearTo,   monthTo - 1,   dayTo);
     var timeDiff = dateTo.getTime() - dateFrom.getTime();
 	if(timeDiff < 0){
 		return true;
 	}
	return false;
}

/***
 * compare two date
 * 
 * return 
 *  true: if fromDate > toDate
 * */
function compareTwoDateYmd(fromDateValue, toDateValue)
{
 	if(toDateValue == ""){
 		return false;
 	}
 		
 	fromDateValue = fromDateValue.replaceAll('-', '');
 	toDateValue   = toDateValue.replaceAll('-', '');
 	
 	var yearFrom  = fromDateValue.substring(0, 4);
 	var monthFrom = fromDateValue.substring(4, 6);
 	var dayFrom   = fromDateValue.substring(6, 8);
 	
 	var yearTo  = toDateValue.substring(0, 4);
 	var monthTo = toDateValue.substring(4, 6);
 	var dayTo   = toDateValue.substring(6, 8);
 	
     var dateFrom = new Date(yearFrom, monthFrom - 1, dayFrom);          
     var dateTo   = new Date(yearTo,   monthTo - 1,   dayTo);
     var timeDiff = dateTo.getTime() - dateFrom.getTime();
 	if(timeDiff < 0){
 		return true;
 	}
	return false;
}
 
 
 /**
  * 입력된 문자열이 일자 Format YYYYMM이 맞는지를 확인 - (/, -, .) 제거되고 비교
  * @param str   문자열
  * @return true 일자 , false
 */
 function isValidFormYYYYMM ( obj, dateCheck) {
    str = obj.value.replace(/\/|\|\./g,"");
    
    if(trim(str).length==0){
 	return;   
    }
    
    var alphaCheck = " abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ/-";
    if (alphaCheck.indexOf(obj.value) >= 1) {
 		if (isNav4) {
 			obj.value = "";
 			obj.focus();
 			return false;
 		}else {
 			obj.value = obj.value.substr(0, (obj.value.length-1));
 			return false;
 		}
    }   
    
    if(dateCheck == false)
    {
 	   if (obj.value.length == 4) // yyyymmdd
 	   {
 			var mYear = obj.value.substr(0,4)
 			obj.value = mYear+"-";
 			return;
 	   }  
    }
    
    if(dateCheck == true)
    {   
       if (str.length == 6) {
		   var year  = str.substr(0,4);
		   var month  = str.substr(4,2);

		   if ( parseInt2( year ) >= 1900 && isMonth( month )){
			   obj.value= year+"-"+month;
		       return;
		   }else {
			   alert(getLabel('FMS_COM_ALT040'));
			   obj.value="";
		       return;
		   } 	
       }else if (str.length != 7) {
 		   alert(getLabel('FMS_COM_ALT040'));
 		   obj.value="";
 	       return;	
 	   }else{
 		   var year  = str.substr(0,4);
 		   var month  = str.substr(5,2);

 		   if ( parseInt2( year ) >= 1900 && isMonth( month )){
 			   obj.value= year+"-"+month;
 		       return;
 		   }else {
 			   alert(getLabel('FMS_COM_ALT040'));
 			   obj.value="";
 		       return;
 		   }		   
 	   }
   
    }
 }
  
 /** ----------------------------------------------------------------------------
 * 특정 날짜에 대해 지정한 값만큼 가감(+-)한 날짜를 반환
 * 입력 파라미터 -----
 * pInterval : "yyyy" 는 연도 가감, "m" 은 월 가감, "d" 는 일 가감
 * pAddVal  : 가감 하고자 하는 값 (정수형)
 * pYyyymmdd : 가감의 기준이 되는 날짜
 * pDelimiter : pYyyymmdd 값에 사용된 구분자를 설정 (없으면 "" 입력)
 * 반환값 ----
 * yyyymmdd 또는 함수 입력시 지정된 구분자를 가지는 yyyy?mm?dd 값
 * 사용예 ---
 * 2008-01-01 에 3 일 더하기 ==> addDate("d", 3, "2008-08-01", "-");
 * 20080301 에 8 개월 더하기 ==> addDate("m", 8, "20080301", "");
  --------------------------------------------------------------------------- */
function addDate(pInterval, pAddVal, pYyyymmdd, pDelimiter)
    {
     var yyyy;
     var mm;
     var dd;
     var cDate;
     var oDate;
     var cYear, cMonth, cDay;
     
     if (pDelimiter != "") {
	  pYyyymmdd = pYyyymmdd.replace(eval("/\\" + pDelimiter + "/g"), "");
	 }
	 
	
	 yyyy = pYyyymmdd.substr(0, 4);
	 mm  = pYyyymmdd.substr(4, 2);
	 dd  = pYyyymmdd.substr(6, 2);
	 
	 if (pInterval == "yyyy") {
	  yyyy = (yyyy * 1) + (pAddVal * 1); 
	 } else if (pInterval == "m") {
	  mm  = (mm * 1) + (pAddVal * 1);
	 } else if (pInterval == "d") {
	  dd  = (dd * 1) + (pAddVal * 1);
	 }
	 
	
	 cDate = new Date(yyyy, mm - 1, dd) // 12월, 31일을 초과하는 입력값에 대해 자동으로 계산된 날짜가 만들어짐.
	 cYear = cDate.getFullYear();
	 cMonth = cDate.getMonth() + 1;
	 cDay = cDate.getDate();
	 
	 cMonth = cMonth < 10 ? "0" + cMonth : cMonth;
	 cDay = cDay < 10 ? "0" + cDay : cDay;
		
		 
	 return cYear + pDelimiter + cMonth + pDelimiter + cDay;
	     
}

/**
 * Check period data[from~to]
 * @param isReq period is mandatory field.
 * @param curObj The object which calls this function
 * @param fmObj Form date object
 * @param toObj To date object
 * @return false: invalid input value, true: valid input value
 */
function chkCmprPrdSc(fmObj, toObj){
	
 	if(fmObj.value==''&&toObj.value!=''){
 		alert(getLabel('FMS_COM_ALT002'));
 		fmObj.focus();
 		return false;
 	}
 	
 	if(fmObj.value!=''&&toObj.value==''){
 		alert(getLabel('FMS_COM_ALT002'));
 		toObj.focus();
 		return false;
 	}
 	
 	//Compare From ~ to date 
    if(compareTwoDate(fmObj.value, toObj.value)){
     	alert(getLabel('FMS_COM_ALT033'));
     	fmObj.focus();
     	return false;
     }
    
    if(compareTwoDateSc(fmObj.value, toObj.value)){
     	alert(getLabel2("FMS_COM_ALT132",new Array(prdMaxDt.toString())));
     	fmObj.focus();
     	return false;
     }
    
    return true;
}


/***
 * compare two date
 * 
 * return 
 *  true: if fromDate > toDate
 * */
function compareTwoDateSc(fromDateValue, toDateValue)
{
 	if(toDateValue == ""){
 		return false;
 	}
 		
 	fromDateValue = fromDateValue.replaceAll('-', '');
 	toDateValue   = toDateValue.replaceAll('-', '');
 	
 	var dayFrom   = fromDateValue.substring(2, 4);
 	var monthFrom = fromDateValue.substring(0, 2);
 	var yearFrom  = fromDateValue.substring(4, 8);
 	
 	var dayTo   = toDateValue.substring(2, 4);
 	var monthTo = toDateValue.substring(0, 2);
 	var yearTo  = toDateValue.substring(4, 8);
 	
 	var dateFrom = new Date(yearFrom, monthFrom - 1, dayFrom);          
 	var dateTo   = new Date(yearTo,   monthTo - 1,   dayTo);
 	var timeDiff = dateTo.getTime() - dateFrom.getTime();
 	var currDay  = 24 * 60 * 60 * 1000;// 시 * 분 * 초 * 밀리세컨

 	if(prdMaxDt <= (timeDiff / currDay)){
 		return true;
 	}
	return false;
}

