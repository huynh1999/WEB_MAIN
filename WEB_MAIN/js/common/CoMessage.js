/*=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : something.js
*@FileTitle  : Some Title 
*@author     : CLT
*@version    : 1.0
*@since      : 2014/04/08
=========================================================*/

    /*------------------여기서 부터 공통자바스크립트 함수를 정의한다.     ------------------*/

    OBJECT_ERROR     = 'The service is not available now.';
    END_MESSAGE      = 'Do you really want to exit?';

    var msgs = new Array(); 

    // 일반 입력 형식 관련 메세지
    msgs['COM0361'] = 'There is no data to save. ({?msg1})';
    msgs['COM0362'] = 'Are you sure you want to delete the Item? If deleted, items added to Kitting selection would also be deleted.';
    msgs['COM12111'] = 'The service is not available at the moment.';
    msgs['COM12112'] = 'Do you really want to exit?';
    msgs['COM12113'] = 'Please select {?msg1}';
    msgs['COM12114'] = 'Please check {?msg1}';
    msgs['COM12115'] = '{?msg1} has been duplicated.';
    msgs['COM12116'] = '{?msg1} has been completed.';
    msgs['COM0104'] = 'No Container is selected.';
    msgs['COM0219'] = 'The selected shipments will be added to the opened MCLP. Continue?';
    msgs['COM0345'] = 'The Location in From and the Location in To must not be the same.';
	msgs['COM0348'] = 'The Qty in To cannot exceed the Qty in From (Current Locaton).\n The Qty of Current Location:{?msg1}  The Qty of To Location :{?msg2}';
	msgs['COM0349'] = 'The items cannot be moved due to excess of the Qty of the Current Location.\n The Qty of Current Location: {?msg1}  The Qty of To Location :{?msg2}';
	msgs['COM0351'] = 'The Movement case does not exist.';
	msgs['COM0353'] = '{?msg1} The moved down stock list is cleared when modified. Are you sure you want to change?';
	msgs['COM0354'] = 'There are Locations duplicated in To.({?msg1})';
	msgs['COM0358'] = 'Please enter at least one (1) case over inventory movement information. ';
	msgs['COM0369'] = 'The capacity (CFT) in the To Location cannot exceed the capacity in the Current Location. ({?msg1})\nCurrent Location :{?msg2}  To Location :{?msg3}';
    msgs['COM0131'] = 'Invalid Console No';
   // msgs['COM0336'] = 'Merging is not possible.'; TinLuong Comment 20150611 not use
    msgs['COM12117'] = '{?msg1} has been canceled.';
    msgs['COM0314']  = 'SOUND UNIT of the input does not correspond to the UNIT to LV1 ~ LV4 of the current item.';
    msgs['COM0315'] = 'UNIT DAMAGE entered in a UNIT that are not up LV1 ~ LV4 of the current item.';
    msgs['COM0337'] = 'Add only the same Type are available.';
    msgs['COM12118'] = 'Please select {?msg2} of {?msg1}.';
    msgs['COM0335'] = "At least one of the date filters or one of other filters (Console No, Booking No, Cust Order No, Item, LOT ID) is required.";
    msgs['COM12119'] = 'Please select only one  {?msg2} of {?msg1}.';
    msgs['COM12120'] = 'Please enter {?msg2} of {?msg1} first row.';
    msgs['COM12121'] = 'Processing the addition of {?msg1}';
    msgs['COM0262'] = "Please 'Cancel' this Console No. if you want to completely delete this Console No.";
    msgs['COM12122'] = '{?msg1} can only contain numbers.';
    msgs['COM12123'] = '{?msg1} can only contain letters.';
    msgs['COM12124'] = '{?msg1} cannot contain numbers.\n\n Please enter letters only.';
    msgs['COM12125'] = '{?msg1} cannot contain letters.\n\n Please enter numbers only.';
    msgs['COM12131'] = '{?msg1} cannot contain 2 byte characters.';
    msgs['COM12126'] = 'Please enter {?msg1} in Korean.';
    msgs['COM12127'] = 'Please enter {?msg1} in either English letters or numbers.';
    msgs['COM12128'] = 'Please enter {?msg1} using a combination of English letters and numbers.';
    msgs['COM12129'] = '{?msg1} cannot contain special characters.';
    msgs['COM12130'] = 'Please enter {?msg2} of {?msg1}.';
    
    msgs['COM0022'] = 'It can not be split.';
    msgs['COM002723'] = 'Please input Split Qty.';
    msgs['COM0038'] = 'Do you want to add container(s)?';

    // 날짜 형식 관련 메세지
    msgs['COM12131'] = '{?msg1} must be greater than or equal to the current date.';
    msgs['COM12132'] = 'Please enter a valid date format: YYYY-MM-DD';
    msgs['COM12133'] = '{?msg1} must be {?msg3} than {?msg2}.';
    msgs['COM12134'] = 'Please enter a valid date format for({?msg1}) : YYYY-MM-DD';

    // 숫자 형식 관련 메세지
    msgs['COM12135'] = 'Please round {?msg3} from a minimum of {?msg2} decimal place to a maximum {?msg1} decimal place.';
    msgs['COM12136'] = 'Please round {?msg1} to a whole number.';
    msgs['COM12137'] = '{?msg1} must start with {?msg2} and must be {?msg3} characters long.';

    // 단순 메세지
    msgs['COM12138'] = 'Please enter {?msg1} or {?msg2}.';
    msgs['COM12139'] = 'Please select {?msg1} or {?msg2}.';
    msgs['COM12140'] = 'Please enter {?msg2} of {?msg1} first row.';
    msgs['COM12141'] = 'Please select {?msg2} of {?msg2}.';
    msgs['COM12142'] = '{?msg1} must be shorter than {?msg2} characters long.';
    msgs['COM12143'] = '{?msg1} must be longer than {?msg2} characters long.';

    // 로그인 관련 메세지
    msgs['COM12144'] = 'The User ID you entered cannot be found.\n\n Please try again.';
    msgs['COM12145'] = 'Please enter your user ID and Password.';
    msgs['COM12146'] = 'Please enter your User ID and Password, and press OK button.';

    // 저장 관련 메세지
    msgs['COM12147'] = 'Do you want to save ({?msg1})?';
    msgs['COM12148'] = 'Saving ({?msg1}) has been cancelled.';
    msgs['COM12149'] = 'Registering ({?msg1}) has been completed';
    msgs['COM12150'] = 'Registering ({?msg1}) has failed';
    msgs['COM12151'] = 'Saving ({?msg1}) has failed';
    msgs['COM12152'] = '{?msg1} has been changed.\n\n Do you want to save these changes?';
    msgs['COM12153'] = '{?msg1} has been changed.\n\n Please save the changes and exit the program.';

    // 수정 관련 메세지
    msgs['COM12154'] = 'Do you want to update {?msg1}?';
    msgs['COM12155'] = '{?msg1} update has been cancelled.';
    msgs['COM12156'] = '{?msg1} update has been completed.';
    msgs['COM12157'] = '{?msg1} update has failed.';
    msgs['COM12158'] = 'Do you want to update the selected {?msg1}?';
    msgs['COM12159'] = 'The selected {?msg1} update has been cancelled.';
    msgs['COM12160'] = 'Updating {?msg1} ......';

    // 조회 관련 메세지
    msgs['COM12161'] = 'There is no corresponding data for the searched criteria.: {?msg1}.';
    msgs['COM12162'] = 'Opening advanced search of {?msg1} ....';
    msgs['COM12163'] = 'Searching {?msg1} ......';
    msgs['COM12164'] = 'Reading {?msg1} ......';

    // 삭제 관련 메세지
    msgs['COM12165'] = 'Do you want to delete {?msg1}?';
    msgs['COM12166'] = '{?msg1} deletion has been cancelled.';
    msgs['COM12167'] = '{?msg1} has been deleted.';
    msgs['COM12168'] = '{?msg1} has not been deleted.';
    msgs['COM12169'] = 'Do you want to delete {?msg1} and {?msg2}?';
    msgs['COM12170'] = '{?msg1} and {?msg2} deletion has been cancelled.';
    msgs['COM12171'] = 'Do you want to delete the selected {?msg1}?';
    msgs['COM12172'] = 'Deletion of the selected {?msg1} has been cancelled.';

    // 문자열 관련 메세지
    msgs['COM12173'] = '{?msg1} must not be over {?msg2} characters long.';
    msgs['COM12174'] = '{?msg1} must be at least {?msg2} characters long.';
    msgs['COM12175'] = '{?msg1} must be either {?msg2} or {?msg3} characters long.';

    // 추가 메세지
    msgs['COM12176'] = 'Please select at least one.';
    msgs['COM12177'] = 'Please select only one.';
    msgs['COM12178'] = 'Please enter only numbers.';
    msgs['COM12179'] = 'Please enter the correct date.\n\n Format : YYYY-MM-DD';
    msgs['COM12180'] = 'Please enter the correct date.\n\n Format : YYYY-MM';
    msgs['COM12181'] = 'Please enter the correct date.\n\n Format : YY-MM-DD';
    msgs['COM12182'] = "Please enter today's or a future date.";

    msgs['COM12183'] = 'This process may take a long time.\n\nYou must not navigate away from this page during the approval.\n\nWould you like to continue?';
    msgs['COM12184'] = 'The selected approval will be disapproved.\n\nDo you want to continue?';
    msgs['COM12185'] = 'Header Setting {?msg1} - Success !!';
    msgs['COM12186'] = 'The approved route cannot be deleted.';
    msgs['COM12187'] = 'Please enter correct date.\n\n Format : {?msg1}';

    msgs['COM12188'] = "Are you sure you want to delete it? If yes, click the 'Save' button.";
    msgs['COM12189'] = 'Nothing selected';
    
    //warehouse module
    ComShowCodeMessage("COM130304");
    msgs['COM12192'] = 'Location [{?msg1}] is currently in use; cannot be deleted.';
    msgs['COM12195'] = 'Code field must contain at least 5 characters.';
    msgs['COM12196'] = 'Please enter the Name field. ';
    msgs['COM12197'] = 'Please enter the Alias field.';
    msgs['COM12198'] = 'There is no item.';
    msgs['COM12199'] = '[Location] Duplicated Location Code [{?msg1}]. Please check again.';
    msgs['COM12200'] = '[Location] Duplicated Line-Row-Floor [row {?msg1}]. Please check again.';
    msgs['COM12201'] = 'Deleted successfully.';
    msgs['COM12202'] = 'Please enter the Code field.';
    msgs['COM12203'] = '[Contact Person] Please input information.';
    msgs['COM12204'] = '[Location] Please enter the Location code.';
    msgs['COM12205'] = 'Could not run the query of your database. Please contact system administrator.';
    msgs['COM12206'] = 'Warehouse Code was not found.';
    msgs['COM12207'] = 'Duplicated data. Please check the Warehouse Code again.';
    msgs['COM12208'] = 'Please check inputted data. ';
    msgs['COM12209'] = 'Code used for Customer must be an unique code. ';
    msgs['COM12210'] = 'Duplicated internal code. ';
    msgs['COM12211'] = 'Duplicated data.';
    msgs['COM12212'] = 'This column cannot be hidden. ';
    msgs['COM12213'] = 'Please only use numbers. ';
    msgs['COM12214'] = 'Maximum Measurement is {?msg1} CBM';
    msgs['COM12215'] = 'Maximum Length/Width/Height is {?msg1} Inch';
    msgs['COM12216'] = 'Maximum Length/Width/Height is 9,999,999.01 CM';
    msgs['COM12217'] = 'Maximum Weight is 9,999,999.01 LBS';
    msgs['COM12218'] = 'Maximum Measurement is 9,999,999.01 CFT';
    msgs['COM12219'] = 'Maximum Price is 999,999,999.99';
    msgs['COM12220'] = 'Invalid characters are used. Please only use numbers. ';
    msgs['COM12221'] = 'Please enter search condition(s).';
    msgs['COM12222'] = 'Item does not exist.';
    msgs['COM12223'] = 'Unexpected error has occurred. Please contact Helpdesk for assistance.';
    msgs['COM12224'] = 'Unexpected error has occurred. Please contact Helpdesk for assistance.';
    msgs['COM12225'] = 'The Maximum Weight is {?msg1} KGS';
    msgs['COM12226'] = 'Please select Customer field before adding new items.';
    msgs['COM12227'] = 'Saving data has failed. Please check and save again.';
    msgs['COM12228'] = 'Duplicated! \n\nThere are two items having the same unit and location.' //'Row {?msg1} has the same Item and Location from another row.\n Please check again!';
    msgs['COM12229'] = 'Item cannot be blank; please select an item. ';
    msgs['COM12230'] = 'Inner Quantity must be greater than zero (0).';
    msgs['COM12231'] = 'Carton Quantity must be great than zero (0).';
    msgs['COM12232'] = 'Filing No. entered already exists. Please check again.';
    msgs['COM12233'] = 'Please select Warehouse.';
    msgs['COM12234'] = 'Please input Customer.';
    msgs['COM12235'] = 'Please select Received By.';
    msgs['COM12236'] = 'Please input Received Date.';
    msgs['COM12237'] = 'Please input Received Time.';
    msgs['COM12238'] = 'At least one (1) item must be added. ';
    msgs['COM12239'] = 'Please input mandatory field(s) before saving.';
    msgs['COM12240'] = 'Filing No. entered does not exist. ';
    msgs['COM12241'] = 'Duplicated Data! \n\n W/H {?msg1} File No.';
    msgs['COM12242'] = 'Please delete one (1) record at a time.';
    msgs['COM12243'] = 'Receiving has been confirmed already; it cannot be deleted.';
    msgs['COM12244'] = 'Please select one (1) item from the list.';
    msgs['COM12245'] = 'Please select Warehouse before adding new item(s).';
    msgs['COM12246'] = 'Please select Customer before adding new item(s).';
    msgs['COM12247'] = 'Total Quantity must be greater than zero (0).';
    msgs['COM12248'] = 'Please check Contract (Storage Closing Unit) set up.';
    msgs['COM0352'] = 'Do you want to proceed with this  Movement?';
    
    msgs['COM12249'] = 'Shipped processing and item deletion can not be processed simultaneously. \n\nDelete the Item first and process it Shipped.';
    msgs['COM12250'] = 'Received processing and item deletion can not be processed simultaneously. \n\nDelete the Item first and process it Received.';
    
    msgs['COM12251'] = 'Receiving No. entered does not exist. ';
    msgs['COM12252'] = 'Shipping No. entered does not exist. ';
    msgs['COM12253'] = 'Doc.Filing No. entered does not exist. ';
    
	/**
	* OPUS COMMON MESSAGE ADD 
	*/
	// save massage  
	msgs['COM130101'] = 'Do you want to save {?msg1}?';
	msgs['COM130102'] = '{?msg1} was saved successfully.';
	msgs['COM130103'] = 'Failed to save {?msg1}.  Please try again.';
	msgs['COM130104'] = 'There is no content to save.';
	msgs['COM130105'] = 'Duplicated Items will be deleted. Do you want to save {?msg1}?';
	// input message
	msgs['COM130201'] = 'Please input coMessage english{?msg1}.';
	// delete message 
	msgs['COM130301'] = 'Do you want to delete {?msg1}?';
	msgs['COM130302'] = "You can't delete {?msg1}.";
	msgs['COM130303'] = '{?msg1} was deleted successfully.';
	msgs['COM130304'] = 'Failed to delete {?msg1}. Please try again.';
	// select message
	msgs['COM130401'] = 'There is no data to search.';
	msgs['COM130402'] = "{?msg1} doesn't exist";
	msgs['COM130403'] = 'Mandatory field is missing. Please enter {?msg1}.';
	msgs['COM130404'] = '{?msg1} is mandatory. Please enter {?msg2}.';
	msgs['COM130405'] = '{?msg1} was searched successfully.';
	msgs['COM130406'] = 'Failed to search {?msg1}. Please try again.';
	msgs['COM130407'] = "{?msg1} doesn't exist. Do you want to create this code ?" ;

	
	// update message 
	msgs['COM130501'] = 'Do you want to update {?msg1}?';
	msgs['COM130502'] = '{?msg1} was updated successfully.';
	msgs['COM130503'] = 'There is no updated data to save.';
	msgs['COM130504'] = 'The Data has changed. Do you want to save it?';
	msgs['COM130505'] = 'Failed to update {?msg1}. Please try again.';
	// transmit message 
	msgs['COM130601'] = '{?msg1} was transmitted successfully.';
	msgs['COM130602'] = 'Do you want to transmit {?msg1} to {?msg2}?';
	msgs['COM130603'] = 'Failed to transmit {?msg1}. Please try again.';
	// insert message 
	msgs['COM130701'] = '{?msg1} was inserted successfully.';
	msgs['COM130702'] = 'Failed to insert {?msg1}. Please try again.';
	// calculate massage 
	msgs['COM130801'] = '{?msg1} was calculated successfully.';
	msgs['COM130802'] = 'Failed to calculate {?msg1}. Please try again.';
	// approve message 
	msgs['COM130901'] = '{?msg1} was approved successfully.';
	msgs['COM130902'] = 'Failed to approve {?msg1}. Please try again.';
	// print message 
	msgs['COM131001'] = '{?msg1} was printed successfully.';
	msgs['COM131002'] = 'There is no data to print.';
	msgs['COM131003'] = 'Failed to print {?msg1}. Please try again.';
	// download message 
	msgs['COM131101'] = '{?msg1} was downloaded successfully.';
	msgs['COM131102'] = 'Failed to download {?msg1}. Please try again.';
	// upload message 
	msgs['COM131201'] = '{?msg1} was uploaded successfully.';
	msgs['COM131202'] = 'Failed to upload {?msg1}. Please try again.';
	msgs['COM131203'] = 'All of the information will be initialized. Do you want to proceed?';
	// duplication message 
	msgs['COM131301'] = '{?msg1} Duplication occurred.';
	msgs['COM131302'] = '{?msg1} is duplicated.';
	msgs['COM131303'] = '{?msg1} is duplicated. Proceed anyway?';
	// datetime message 
	msgs['COM131401'] = 'Date format is wrong. Please enter a valid date format(YYYY-MM-DD).';
	// email message 
	//msgs['COM131501'] = 'Mail address isn\'t exact. Please check it again.';
	//msgs['COM131501'] = 'Mail transmission was faild. Please try again.';
	//msgs['COM131501'] = 'Mail was transmitted to [person] successfully.';
	msgs['COM131501'] = 'Wrong Email Address format. Please, enter the correct Email Address';
	// authority message 
	msgs['COM131601'] = 'You have no authority to inquire {?msg1}.';
	msgs['COM131602'] = 'You have no authority to create {?msg1}.';
	msgs['COM131603'] = 'You have no authority to delete {?msg1}.';
	msgs['COM131604'] = 'You have no authority to update {?msg1}.';
	// caps lock message 
	msgs['COM131701'] = 'Please check Caps Lock.';
	//number message 
	msgs['COM131801'] = 'Please input a numeric value/ numeric values.';
	msgs['COM271801'] = 'Please input a numeric value bigger than 0 for Sounds Receiving.';
	// length message 
	msgs['COM131901'] = '{?msg1} exceeds field length.';
	// duration message
	msgs['COM132001'] = '{?msg1} exceeds maximum duration {?msg2}.';
	msgs['COM132002'] = 'End date must be greater than start date';
	msgs['COM132003'] = '{?msg1} must be greater than {?msg2}';
	// system error message
	msgs['COM132101'] = 'Unexpected system error took place during data processing. Please try again later.';
	// etc message
	msgs['COM132201'] = '{?msg1} is invalid.';
	msgs['COM132202'] = '{?msg1} is not available.';
	// data unmatch message
	msgs['COM132301'] = '{?msg1} and {?msg2} are not matching. Please check again.';
	
	msgs['COM132401'] = 'Invalid date';
	//msgs['COM132501'] = 'Since there exists no searched criteria, it is impossible to download in the [EXCEL] format.';
	msgs['COM132501'] = 'Cannot export to [Excel] format; no data has been searched.';	//2016.12.07 변경
	msgs['COM132601'] = 'Data Saved Successfully!!';
	msgs['COM0409'] = 'There is no data to save!';
	
	/*Vinh.Vo (S)*/
	//msgs['COM132602'] = 'Please input date !';
	// #364 [OCEAN BLUE] EXCEL (ALL) NOT WORKING AFTER SEARCHING DATA BY POST DATE
	msgs['COM132602'] = 'Please check date range; ETD for Export, ETA for Import.';
	
	msgs['COM132603'] = ' W/H have already selected';
	msgs['COM132604'] = 'You are creating new data, do you want to remove it ?';
	msgs['COM132605'] = 'Please retrieve and select a contract';
	msgs['COM132606'] = 'Please input Contract No.';
	msgs['COM132607'] = 'Do you want to create ?';
	msgs['COM132608'] = 'Date cannot exceed {?msg1} months. {?msg2}';
	msgs['COM132609'] = 'Please Search or New first !';
	msgs['COM132610'] = 'Are you sure you want to clear all the data?';
	msgs['COM132611'] = 'Do you want to copy?';
	msgs['COM132612'] = 'This button is developing';
	msgs['COM132613'] = 'Failed to cancel. Please try again!';
	msgs['COM132614'] = 'Please retrieve data first!';
	msgs['COM132615'] = 'Please confirm data first!';
	msgs['COM132616'] = 'Too many letters or numbers.';
	msgs['COM132617'] = 'Failed to upload file';
	msgs['COM132618'] = 'Failed to delete file';
	msgs['COM132619'] = 'Can not cancel Confirmed item.';
	msgs['COM132620'] = 'Can not {?msg1}. because some data already {?msg2}.';
	// #2900 PQC★[CLA] - AIR 화면 적용 MISSING EXCEL(ALL) FUNCTION KEY
	msgs['COM132621'] = 'Please check date range; ETD for Export';	
	// issue #1187 - Forwarding v4 - Test
	msgs['COM132622'] = 'Please check date range: Post Date.';
	/*Vinh.Vo (E)*/
	msgs['COM0682'] = 'Please Input CN/TR Type.';
	msgs['COM0129'] = 'Please enter Container Type.';
	msgs['COM0122'] = 'Please check {?msg1}.';
	msgs['COM0098'] = 'At least {?msg2} characters must be inputted to search the field for {?msg1}.';

	
	
	msgs['COM0029'] = 'Contract No. entered does not exist. ';

	msgs['COM0278'] = 'Please Input {?msg1}.';
	msgs['COM0119'] = 'Please check file';

	msgs['COM0410'] = 'Failed to save. Please try again.';

	
	msgs['COM0125'] = 'Please enter {?msg1}.';
	
	msgs['COM0082'] = 'It is necessary to enter a {?msg1} .';
	
	msgs['COM0114'] = 'Please input the {?msg1}.';
	
	msgs['COM0215'] = 'The maximum input characters : {?msg1}';
	
	msgs['COM0261'] = 'AQ/HQ Office user cannot create freight & charge. Please request to an authorized user.';


	msgs['COM0165'] = 'Row No. {?msg1} : It is necessary to enter a {?msg2} .';
	
	msgs['COM0160'] = 'Row No. {?msg1} : {?msg2} .';
	
	msgs['COM0239'] = '{?msg1} cannot have more than one.';
	
	msgs['COM0107'] = 'One, at least, of [ {?msg1} ] is required.';
	
	msgs['COM0291'] = 'Changes made to Rate Details have not been saved. Are you sure you want to continue without saving the changes?';

	
	msgs['COM0309'] = 'All of the data you inputted on this page will not be saved. Are you sure you want to continue?';

	
	msgs['COM0063'] = 'Do you want to save?';
	

	msgs['COM0424'] = 'Do you want to delete the selected order?';

	
	msgs['COM0437'] = 'Nothing selected to delete. Please check again.';

	
	msgs['COM0053'] = 'Do you want to delete?';
	
	msgs['COM0079'] = 'It has been canceled successfully.';

	
	msgs['COM0247'] = 'Do you want to Confirm?';
	
	msgs['COM0386'] = 'Do you want to Confirm Cancellation?';

	
	msgs['COM0350'] = 'Do you want to cancel all of plan and header information?';

	
	msgs['COM0266'] = '{?msg1} does not exist.';
	
	msgs['COM0404'] = "It's being processed. Please do not close your window and check back after a few minutes. ";

	
	msgs['COM0093'] = 'It has been saved successfully.';

	
	msgs['COM0253'] = 'Nothing selected';
	
	msgs['COM0168'] = 'Same MCLP No.';
	
	msgs['COM0343'] = 'Loading Plan already applied. Do you want to overwrite and apply again?';
	
	msgs['COM0080'] = 'It has been deleted successfully.';

	
	msgs['COM0037'] = 'Do you want to Apply?';
	
	msgs['COM0307'] = 'It has been confirmed successfully.';

	
	msgs['COM0051'] = 'Do you want to Delete Container?';
	
	
	msgs['COM0387'] = 'Confirm Cancel has been completed.';

	
	msgs['COM0395'] = 'AQ/HQ office user cannot {?msg1}.';
	
	msgs['COM0323'] = 'There is no data to save';
	
	msgs['COM0005'] = '{?msg1} is mandatory. Please check the data!';
	
	msgs['COM0290'] = "All of the rate's details will be deleted. Would you like to continue?";
	
	msgs['COM0170'] = 'Please select more than one (1).';

	msgs['COM0273'] = 'All of the details of the selected Rate(s) No. will be copied and saved. Would you like to continue? ';
	
	msgs['COM0221'] = 'The Item No. is mandatory.';
	
	msgs['COM0222'] = 'The Contract No. is mandatory.';
	
	msgs['COM0185'] = 'There is no data. {?msg1}';
	
	msgs['COM0225'] = '{?msg1} is duplicated.';
	
	msgs['COM0011'] = 'All of the console shipments would be cancelled and initialized.';

	msgs['COM0289'] = 'Please {?msg1} Info Search First.';
	
	msgs['COM0317'] = 'You cannot cancel because Warehouse Outbound has been created already.';

	
	msgs['COM0061'] = 'Do you want to Reinstate?';

	
	msgs['COM0268'] = 'It has been reinstated successfully.';
	
	msgs['COM0040'] = 'Do you want to cancel?';
	
	msgs['COM0041'] = 'Do you want to inactive the item?';
	
	msgs['COM0042'] = 'Do you want to restore?';

	
	msgs['COM0226'] = 'Do you want to update?';
	
	msgs['COM0081'] = 'It is mandatory for {?msg1} .';
	
	msgs['COM0133'] = 'Please enter No.';
	
	msgs['COM0359'] = 'Please select row(s) to save. ';


	msgs['COM0213'] = 'Please enter {?msg1} or specific value\n({?msg2}).';
	
	msgs['COM0192'] = 'Warehouse Booking No. does not exist.';

	
	msgs['COM0294'] = 'PO/ITEM will be deleted. Are you sure you want to continue?';

	
	msgs['COM0036'] = 'Do you want to Save?';

	
	msgs['COM0016'] = 'Booking No. entered is duplicated.';

	msgs['COM0243'] = 'Work Order exists. Would you like to create another new Work Order?';
	
	msgs['COM0035'] = 'Do you want to Create a new Work Order?';
		
	msgs['COM0272'] = 'Updating Contract Information would change all the account info (Owner/Shipper/Consignee). Do you want to proceed?';
	
	msgs['COM0373'] = 'ROW COPY is not allowed.';
	
	msgs['COM0254'] = 'Please select only one (1).';

	
	msgs['COM0162'] = 'Row No. {?msg1} : It is mandatory for {?msg2} .';
	

	msgs['COM0320'] = 'The Inbound Location and Putaway Location are the same. Please update.';

	
	msgs['COM0004'] = '{?msg1} is duplicated.';
	
	msgs['COM0220'] = 'Please [Select] for CLP Creation.';
	
	msgs['COM0228'] = 'Nothing selected';
	
	msgs['COM0286'] = 'Please select one (1) or more Booking to move.';

	
	msgs['COM0342'] = 'It has been canceled successfully. {?msg1} Do you want to leave this screen?';

	msgs['COM0341'] = 'All Outbound Complete information will be deleted.';

	
	msgs['COM0324'] = 'Allocation has been completed.';
	
	msgs['COM0015'] = 'Booking No. entered does not exist.';


	msgs['COM0415'] = 'Completed successfully.';

	
	msgs['COM0355'] = 'The total quantity shipment equals zero (0). ({?msg1})';

	
	msgs['COM0338'] = 'The Unregistered Item in Item Master exists. First, please define the Pack Unit.';
	
	msgs['COM0310'] = '{?msg1} for multiple different Warehouses is not acceptable.';
	
	msgs['COM0311'] = 'Would you like to allocate?';
	
	msgs['COM0332'] = 'Allocation Qty Unit is zero (0).';

	msgs['COM0331'] = 'Allocation Qty Unit has exceeded the Ordered Qty. ';

	
	msgs['COM0383'] = 'Effective Date of Row [{?msg1}] and Row [{?msg2}]{?msg3} is duplicated. ';

	
	msgs['COM0048'] = 'Do you want to copy?';
	
	msgs['COM0330'] = 'Allocation has not been assigned. ';

	msgs['COM0340'] = 'You cannot proceed with Outbound Complete since Load Plan No. has not be generated yet.';

	
	msgs['COM0327'] = 'Console No will be created to continue.';
	
	msgs['COM0126'] = 'Please enter Booking No.';
	

	msgs['COM0333'] = 'Allocation cannot be canceled since the booking has been completed.';
	msgs['COM0334'] = 'The entire allocation cannot be canceled since some outbound data has been completed.';

	msgs['COM0316'] = 'Please issue the Booking first.';
	
	msgs['COM0115'] = 'Please enter PO/Item in one (1) row.';

	
	msgs['COM0605'] = 'The maximum input characters : Supervisor[{?msg1}]';
	
	msgs['COM0607'] = 'The maximum input characters : Working Instruction[{?msg1}]';
	
	msgs['COM0610'] = 'Row No. {?msg1} : It is mandatory for [Putaway] Loc.';
	
	msgs['COM0611'] = 'Row No. {?msg1} : It is mandatory for [Putaway] Unit.';
	
	msgs['COM0612'] = 'Row No. {?msg1} : It is mandatory for [Putaway] QTY.';
	
	msgs['COM0613'] = 'Putaway Measure exceeds Received Measure.[CBM]\n\n(Putaway:{?msg1}       Received:{?msg2})';
	
	msgs['COM0614'] = 'Putaway Measure exceeds Received Measure.[CBF]\n\n(Putaway:{?msg1}       Received:{?msg2})';
	
	msgs['COM0615'] = 'Putaway Measure exceeds Received Measure.[G.KGS]\n\n(Putaway:{?msg1}       Received:{?msg2})';
	
	msgs['COM0616'] = 'Putaway Measure exceeds Received Measure.[G.LBS]\n\n(Putaway:{?msg1}       Received:{?msg2})';
	
	msgs['COM0617'] = 'Putaway Measure exceeds Received Measure.[N.KGS]\n\n(Putaway:{?msg1}       Received:{?msg2})';
	
	msgs['COM0618'] = 'Putaway Measure exceeds Received Measure.[N.LGS]\n\n(Putaway:{?msg1}       Received:{?msg2})';
	
	msgs['COM0421'] = 'Putaway quantity exceeds Received quantity.\n\n(Putaway:{?msg1}       Received:{?msg2})';
	
	msgs['COM0045'] = 'Do you want to cancel the Warehouse Booking?';
	
	msgs['COM0046'] = 'Nothing selected';
	
	msgs['COM0047'] = 'Please enter a correct value. Hour: between 0 ~23.';

	msgs['COM0048'] = 'Please enter a correct value. Minute: between 0 ~ 59.';

	msgs['COM0049'] = 'The End Time must be greater than the Start Time.';
	
	msgs['COM0319'] = 'Do you want to cancel all the location and header information?';
	
	msgs ['COM0385'] = 'Please select relative Settlement Period ({?msg1}). Selected date(s) are out of range.';

	msgs['COM0356'] = 'Entire Wave cannot be deleted since some outbound data has been completed.';

		
	//msgs['COM0393'] = '입력 또는 수정한내역 중 Billing Customer가 이미 Confirm 된 건이 존재합니다.\nBilling Customer : [{?msg1}]';
	msgs['COM0393'] = 'The data confirmed by the Billing Customer must not be modified.\nBilling Customer : [{?msg1}]';
    
	msgs['COM0002'] = '{?msg1} does not exist.';
	
//	msgs['COM0390'] = 'Confirm 대상건이 존재하지않습니다.';
	msgs['COM0390'] = 'There is no Saved data to confirm.';
	
	msgs['COM0365'] = 'The required (EA) quantity and Assigned (EA) number does not match.';
	
	//msgs['COM0364'] = '현재고를 초과할수없습니다.\n현재고:{?msg1}  Assigned qty(ea):{?msg2}';
	msgs['COM0364'] = 'The Assigned Qty must not exceed the Current Qty. \nCurrent Qty:{?msg1}  Assigned Qty(ea):{?msg2}';
	
	msgs['COM0360'] = 'Quantity must be greater than zero.({?msg1})';
	
	msgs['COM0004'] = '{?msg1} is duplicated.';
	
	msgs['COM0366'] = 'The Component Qty(EA) must be the same with the total Qty(EA) of De-Kit.\nComponent Qty:{?msg1}   De-Kit Qty:{?msg2}';	
	
	msgs['COM0367'] = 'Data deleted successfully!';
	
	//msgs['COM0391'] = 'The confirmation you want to cancel is not exist.';
	msgs['COM0391'] = 'The confirmation you want to cancel does not exist.';
	msgs['COM0392'] = 'Confirmation cannot be canceled due to already allocated item(s).';
	
	msgs['COM0313'] = 'The Level 1 information of the item does not exist.';
	msgs['COM0344'] = 'The entered Code does not match the units for the item.';	
	msgs['COM0227'] = 'A New Console No. will be created. Would you like to continue?';
	msgs['COM0347'] = 'The Unallocated Cases does not exist.';
	msgs['COM0400'] = 'There is not unallocated item.';
	msgs['COM151007'] = 'There is no data to do Closing.';
	msgs['COM151008'] = 'Do you want to do Closing?';
	msgs['COM1510081'] = '[Date Input] must be greater than [Closing Date]';
	msgs['COM1510082'] = 'It is an already closed date, please select another date.';
	msgs['COM1510083'] = '[Date Input] must be greater than [Starting Date]';
	msgs['COM1510084'] = 'Closing Date must not be later than Today';
	msgs['COM1510085'] = 'This Receiving is already closed';
	msgs['COM1510086'] = 'This Shipping is already closed';
	msgs['COM1510087'] = 'The Received Date must be later than the last closing date';
	msgs['COM1510088'] = 'The Shipped Date must be later than the last closing date';
	msgs['COM03230'] = 'Bigger than Max-value.';
	msgs['COM03233'] = 'Smaller than Min-value.';
	msgs['COM03231'] = 'There is nothing to save.';
	msgs['COM0322'] = 'Please add the Block';
	msgs['COM0321'] = 'Please add the Zone';
	msgs['COM0325'] = 'Please add the Location';
	msgs['COM0326'] = 'Please add the Property';
	msgs['COM0336'] = 'It cannot be merged. \n Please select an item (It has to be more than two).';
	msgs['COM0328'] = 'There is nothing to delete.';
	msgs['COM0363'] = 'Changing {?msg1} will clear all information you have inputted on the screen.\nAre you sure you want to change? ';
	msgs['COM0329'] = 'Current LOAD PLAN quantity is {?msg1}.';
	msgs['COM0339'] = 'Current available ALLOCATION quantity is {?msg1}.';
	msgs['COM0456'] = 'Allocation should be done first.';
	msgs['COM0457'] = '{?msg1} can contain number, alphabet, \nand Special character(-,#,+,(,))';
	msgs['COM0499'] = 'Allocation is complete,\nBut un-allocated item remain.';
	
	msgs['COM0323'] = 'There is no data to save';
	msgs['COM0802'] = 'Strategy Key is mandatory. Please check it up!';
	msgs['COM0803'] = 'Priority 1 Criterion is mandatory. Please check it up!';
	msgs['COM0804'] = 'Priority 1 Alignment is mandatory. Please check it up!';
	msgs['COM0805'] = 'Please Input Priority2 Criterion.';
	msgs['COM0806'] = 'Please Input Priority2 Alignment.';
	msgs['COM0807'] = 'Please Input Priority3 Criterion.';
	msgs['COM0808'] = 'Please Input Priority3 Alignment.';
	msgs['COM0809'] = 'Please Input Priority4 Criterion.';
	msgs['COM0810'] = 'Please Input Priority4 Alignment.';
	msgs['COM0811'] = '{?msg1} and {?msg2} are different!';
	msgs['COM0812'] = "You can't select 'Location' and 'Liscense Plate#' because the Calculation Method is Daily In & Out. ";
	msgs['COM0813'] = '{?msg1} is finished Until {?msg2}';
	msgs['COM0814'] = "{?msg1} can't be out of the range of {?msg2}.";
	msgs['COM0815'] = 'The {?msg1} exists!\nPlease try again after deleting {?msg2}.';
	msgs['COM0816'] = "Status has changed, please search again.";
	msgs['COM0538'] = 'Please check up print option.';
	msgs['COM0493'] = 'Please Input the Warehouse.';
	msgs['COM0539'] = 'The maximum input characters : Supervisor[100]';
	msgs['COM0540'] = 'The maximum input characters : Working Instruction[1000]';
	msgs['COM0541'] = 'The maximum input chCOM0395aracters : Driver[100]';
	msgs['COM0542'] = 'The maximum input characters : Licence No[20]';
	msgs['COM0543'] = 'The maximum input characters : Gate No[20]';
	msgs['COM0774'] = 'There is no data. (Order List Sheet)';
	msgs['COM0771'] = 'Please Input picking qty.';
	msgs['COM0439'] = 'Do you want to picking?';
	msgs['COM0452'] = 'Picking was already completed';
	msgs['COM0444'] = 'Completed order cannot be partial canceled.';//Complete된 Order는 부분취소가 불가능합니다.';
	msgs['COM0772'] = 'Please Input Outbound Date.';
	msgs['COM0488'] = "Entered outbound date have to be same with today's date.";
	msgs['COM0773'] = 'Please Input CNTR/TR No.';
	msgs['COM0442'] = 'Same items split cannot be loaded into the same container/truck.';
	msgs['COM0449'] = 'Please check up outbound result information.\n(Outbound Date, CN/TR Type, CN/TR No)';
	msgs['COM0454'] = 'Shipping was already completed';
	msgs['COM0448'] = 'The information is the same with Completed information.';
	msgs['COM0450'] = 'Shipping quantity cannot be greater than Picking quantity.';
	msgs['COM0458'] = 'Picking QTY cannot be greater than Allocated QTY.';
	msgs['COM0453'] = "Caution! Shipping Qty is  '0'";
	msgs['COM0441'] = 'Do you want to shipping?';
	
	msgs['COM0608'] = 'Please check up Print Option.';
	msgs['COM0445'] = 'You cannot do additional allocation because Picking process was already completed.';
	msgs['COM0688'] = 'Order created by EDI is not possible to work.';
	msgs['COM0689'] = 'This booking is already canceled.';
	msgs['COM0357'] = 'You cannot cancel entire wave because completing was already finished.';
	msgs['COM0455'] = 'You cannot cancel Wave because Packing was already completed.';
	
	msgs['COM0569'] = 'Row No. {?msg1} : W/H Code is required.';
	msgs['COM0570'] = 'Row No. {?msg1} : Contract Code is required.';
	msgs['COM0571'] = 'Row No. {?msg1} : Order No is required.';
	msgs['COM0572'] = 'Row No. {?msg1} : Order Type is required.';
	msgs['COM0573'] = 'Row No. {?msg1} : Estimated Date is required.';
	msgs['COM0574'] = 'Row No. {?msg1} : EID Type is required.';
	msgs['COM0575'] = 'Row No. {?msg1} : FWD Type is required.';
	msgs['COM0576'] = 'Row No. {?msg1} : UOM is required.';
	msgs['COM0549'] = 'Row No. {?msg1} : SKU Code is required.';
	msgs['COM0550'] = 'Row No. {?msg1} : Description is required.';
	msgs['COM0551'] = 'Row No. {?msg1} : EA Level Unit is required.';
	msgs['COM0577'] = 'Row No. {?msg1} : W/H Code exceeds field length.';
	msgs['COM0578'] = 'Row No. {?msg1} : Contract Code exceeds field length.';
	msgs['COM0579'] = 'Row No. {?msg1} : Order No exceeds field length.';
	msgs['COM0580'] = 'Row No. {?msg1} : Order Type exceeds field length.';
	msgs['COM0581'] = 'Row No. {?msg1} : EID Type exceeds field length.';
	msgs['COM0582'] = 'Row No. {?msg1} : FWD Type exceeds field length.';
	msgs['COM0552'] = 'Row No. {?msg1} : SKU Code exceeds field length.';
	msgs['COM0553'] = 'Row No. {?msg1} : Description exceeds field length.';
	msgs['COM0554'] = 'Row No. {?msg1} : Group Code exceeds field length.';
	msgs['COM0555'] = 'Row No. {?msg1} : EA Level Unit exceeds field length.';
	msgs['COM0556'] = 'Row No. {?msg1} : IN Level Unit exceeds field length.';
	msgs['COM0557'] = 'Row No. {?msg1} : IN Level Qty exceeds field length.';
	msgs['COM0558'] = 'Row No. {?msg1} : BX Level Unit exceeds field length.';
	msgs['COM0559'] = 'Row No. {?msg1} : BX Level Qty exceeds field length.';
	msgs['COM0560'] = 'Row No. {?msg1} : PL Level Unit exceeds field length.';
	msgs['COM0561'] = 'Row No. {?msg1} : PL Level Qty exceeds field length.';
	msgs['COM0583'] = 'Row No. {?msg1} : Lot No exceeds field length.';
	msgs['COM0584'] = 'Row No. {?msg1} : UOM exceeds field length.';
	msgs['COM0585'] = 'Row No. {?msg1} : Location exceeds field length.';
	msgs['COM0586'] = 'Row No. {?msg1} : CNTR/TR Type exceeds field length.';
	msgs['COM0587'] = 'Row No. {?msg1} : CNTR/TR No exceeds field length.';
	msgs['COM0588'] = 'Row No. {?msg1} : Seal No exceeds field length.';
	msgs['COM0589'] = 'Row No. {?msg1} : D/O No. exceeds field length.';
	msgs['COM0590'] = 'Row No. {?msg1} : M/BL No exceeds field length.';
	msgs['COM0591'] = 'Row No. {?msg1} : H/BL No exceeds field length.';
	msgs['COM0592'] = 'Row No. {?msg1} : Reference No exceeds field length.';
	msgs['COM0593'] = 'Row No. {?msg1} : Invoice No exceeds field length.';
	msgs['COM0694'] = 'Row No. {?msg1} : Lot 04 exceeds field length.';
	msgs['COM0695'] = 'Row No. {?msg1} : Lot 05 exceeds field length.';
	msgs['COM0565'] = 'Row No. {?msg1} : Currency exceeds field length.';
	msgs['COM0775'] = 'Row No. {?msg1} : It is duplicated.(Order No : {?msg2})';
	msgs['COM0776'] = 'Row No. {?msg1} : It is duplicated.(Priority Criterion : {?msg2})';
	msgs['COM0777'] = "uncheck the booking whose status is not 'Booked'.";
	msgs['COM0778'] = "Set the ToLOC first";
	msgs['COM0779'] = "The Order Quantity is 0. Input the Order Quantity.";
	msgs['COM0780'] = "Data has changed, please save frist.";
	msgs['COM0781'] = "Select only 1 booking.";
	msgs['COM0782'] = "This booking is processed with WAVE operation. Please proceed with WAVE button.";
	msgs['COM0783'] = "Do you want to add this {?msg1} as default to this Item {?msg2} ?";
	/* #3306-[BINEX] [WMS4.0] CLOSING ENTRY TO HAVE CURRENCY COLUMN */
	msgs['COM0784'] = "You can not proceed with closing since some items have different currency than others. \nYou must have one currency for all items. \n\nPlease check item setting or delete different currency items to proceed.";
	/* #3390-Check Authority WMS CODE */
	msgs['COM0785'] = 'Not authenticated.\r\nYou are not authorized to access Warehouse.';
	
	msgs['COM0786'] = 'Please check {?msg1} again!!.\r\n Integer: 3, Decimal point: 2.';
	msgs['COM0787'] = 'Please check {?msg1} again!!.\r\n Data must be less than {?msg1}.';
	/* #6027 [LATONA] WMS 개선 문의사항 - Auto Allocation 이후, LP 수량 수정 가능하도록 */
	msgs['COM0788'] = 'Allocation Qty Unit has exceeded the Ordered Qty. \n\nWould you like to continue?';

	////OFVFOUR-7899: [Matrix] Set mandatory field in OIH, AEH, AIH B/L entry
	msgs['COM0789'] = 'Please enter a Mandatory Value! - Incoterms';
	msgs['COM0790'] = 'Please enter a Mandatory Value! - Service Scope';
	/**
	
	msgs['COM0342'] = "It is canceled successfully. {?msg1} 화면으로 이동하시겠습니까?";

	msgs['COM0383'] = '현재입력된 Row[{?msg1}] Effective Date가 Row[{?msg2}]{?msg3}와 중복됩니다.';
    
	/**
     * 사용자의 의사결정을 포함하는 확인메시지박스 표시한다. confirm() 함수 대신 이 함수를 사용한다. <br>
     * <br><b>Example :</b>
     * <pre>
     *     if(ComShowConfirm("정말 삭제하시겠습니까?")) return;  //확인메시지를 표시하고, 결과가 true이면 return 한다.
     * <pre>
     * @param {string} sMsg 필수,메시지 문자열
     * @returns bool <br>
     *          true  : 확인메시지에서 "확인"을 누른 경우<br>
     *          false : 확인메시지에서 "취소"을 누른 경우<br>
     * @see #ComShowCodeConfirm
     */
    function ComShowConfirm(sMsg) {
        return (confirm(sMsg));
    }

    /**
     * 메시지 표시한다. alert()함수 대신 이 함수를 사용한다. <br>
     * <br><b>Example :</b>
     * <pre>
     *     ComShowMessage("입력값이 올바르지 않습니다.");  //메시지를 표시한다.
     * <pre>
     * @param {string} sMsg 필수,메시지 문자열
     * @return 없음
     * @see #ComShowCodeMessage
     */
    function ComShowMessage(sMsg)
    {
        try {
            if (sMsg.length < 1) return;
            alert(ComReplaceStr(sMsg,"<||>","\n")); //?-왜 굳이 "<||>" 글자를 줄바꿈 글자로 사용했을까?
        } catch(err) { ComFuncErrMsg(err.message); }
    }
     
     /**
      * 메시지 표시한다. alert()함수 대신 이 함수를 사용한다. <br>
      * <br><b>Example :</b>
      * <pre>
      *     ComShowMessage("입력값이 올바르지 않습니다.");  //메시지를 표시한다.
      * <pre>
      * @param {string} sMsg 필수,메시지 문자열
      * @param {string} Detail 필수,Detail 메시지 문자열
      * @return 없음
      * @see #ComShowCodeMessage
      */
	function ComShowMessage(sMsg,Detail){
		try {
			if (sMsg.length < 1) return;
			if(Detail == null || Detail.length < 1){
				alert(ComReplaceStr(sMsg,"<||>", "\n"));
			}else if(!window.confirm(ComReplaceStr(sMsg,"<||>", "\n"))){ //?-왜 굳이 "<||>" 글자를 줄바꿈 글자로 사용했을까?
				if (Detail.length < 1) return;
             	alert(ComReplaceStr(Detail,"☜☞", "\n")); 
			}
         } catch(err) { ComFuncErrMsg(err.message); }
     }
      
    /**
     * 메시지코드를 받아서 {@link #ComGetMsg} 함수에서 해당 메시지 코드를 찾아서 사용자 확인메시지 표시한다. <br>
     * <br><b>Example :</b>
     * <pre>
     *     if (!ComShowCodeConfirm("COM12112")) return;              //ComGetMsg("COM12112")인 확인메시지를 표시한다.
     *     if (!ComShowCodeConfirm("COM12147", "매출내역")) return;  //ComGetMsg("COM12147", "매출내역")인 확인메시지를 표시한다.
     *     ComShowConfirm(ComGetMsg("COM12112"));                   //1줄코드와 동일한 기능을 처리한다.
     * <pre>
     * @param {string} sMsgNo 필수,메시지코드
     * @param {string} msg1   선택,메시지 변수1
     * @param {string} msg2   선택,메시지 변수2
     * @param {string} msg3   선택,메시지 변수3
     * @returns bool <br>
     *          true  : 확인메시지에서 "확인"을 누른 경우<br>
     *          false : 확인메시지에서 "취소"을 누른 경우<br>
     * @see #ComGetMsg
     * @see #ComShowConfirm
     */
    function ComShowCodeConfirm(sMsgNo, msg1, msg2, msg3) {
        try {
            return ComShowConfirm (ComGetMsg(sMsgNo, msg1, msg2, msg3));
        } catch(err) { ComFuncErrMsg(err.message); }
    }

    /**
     * 메시지코드를 받아서 {@link #ComGetMsg2} 함수에서 해당 메시지 코드를 찾아서 사용자 확인메시지 표시한다. <br>
     * <br><b>Example :</b>
     * <pre>
     * 		var mText = new Array("매출내역");
     *     	if (!ComShowCodeConfirm2("COM12147", mText)) return;  //ComGetMsg2("COM12147", mText)인 확인메시지를 표시한다.
     * <pre>
     * @param {string} sMsgNo 필수,메시지코드
     * @param {string[]} arrMsg 필수,메시지 변수배열
     * @returns bool <br>
     *          true  : 확인메시지에서 "확인"을 누른 경우<br>
     *          false : 확인메시지에서 "취소"을 누른 경우<br>
     * @see #ComGetMsg2
     * @see #ComShowCodeConfirm
     */
    function ComShowCodeConfirm2(sMsgNo, arrMsg) {
        try {
            return ComShowConfirm (ComGetMsg2(sMsgNo, arrMsg));
        } catch(err) { ComFuncErrMsg(err.message); }
    }

    /**
     * 메시지코드를 받아서 {@link #ComGetMsg} 함수에서 해당 메시지 코드를 찾아서 메시지 표시한다. <br>
     * <br><b>Example :</b>
     * <pre>
     *     ComShowCodeMessage("COM12111");              //ComGetMsg("COM12111")인 메시지를 표시한다.
     *     ComShowCodeMessage("COM12114", "선택여부");  //ComGetMsg("COM12111", "선택여부")인 메시지를 표시한다.
     *     ComShowMessage(ComGetMsg("COM12111"));      //1줄코드와 동일한 기능을 처리한다.
     * <pre>
     * @param {string} sMsgNo 필수,메시지코드
     * @param {string} msg1   선택,메시지 변수1
     * @param {string} msg2   선택,메시지 변수2
     * @param {string} msg3   선택,메시지 변수3
     * @return 없음
     * @see #ComGetMsg
     * @see #ComShowMessage
     */
    function ComShowCodeMessage(sMsgNo, msg1, msg2, msg3) {
        try {
            ComShowMessage (ComGetMsg(sMsgNo, msg1, msg2, msg3));
        } catch(err) { ComFuncErrMsg(err.message); }
    }

    /**
     * 메시지코드를 받아서 {@link #ComGetMsg2} 함수에서 해당 메시지 코드를 찾아서 메시지 표시한다. <br>
     * <br><b>Example :</b>
     * <pre>
     * 		var mText = new Array("선택여부");
     *     	ComShowCodeMessage2("COM12114", mText);  //ComGetMsg2("COM12111", mText)인 메시지를 표시한다.
     * <pre>
     * @param {string} sMsgNo 필수,메시지코드
     * @param {string[]} arrMsg 필수,메시지 변수배열
     * @return 없음
     * @see #ComGetMsg2
     */
    function ComShowCodeMessage2(sMsgNo, arrMsg) {
        try {
            ComShowMessage (ComGetMsgs2(sMsgNo, arrMsg));
        } catch(err) { ComFuncErrMsg(err.message); }
    }

    /**
     * 메시지코드의 메시지 문자열을 찾아서 리턴한다. <br>
     * 메시지코드는 전역변수인 msgs 문자열배열에 저장되어 있다. <br>
     * <br><b>Example :</b>
     * <pre>
     *     sMsg = ComGetMsg("COM12112");              //메시지코드 "COM12112"인 문자열을 반환한다.
     *     sMsg = ComGetMsg("COM12115", "이름");      //메시지코드 "COM12115"이고, 첫번째 메시지 변수는 "이름"을 넣은 문자열을 반환한다.
     * <pre>
     * @param {string} sMsgNo 필수,메시지코드
     * @param {string} msg1   선택,메시지 변수1
     * @param {string} msg2   선택,메시지 변수2
     * @param {string} msg3   선택,메시지 변수3
     * @return 없음
     * @see #ComSetMsg
     * @see #ComShowCodeConfirm
     * @see #ComShowCodeMessage
     */
    function ComGetMsg(sMsgNo, msg1, msg2, msg3)
    {
        try {
            var ret = "";
            sMsgNo = sMsgNo.toUpperCase();

            if (msgs[sMsgNo]) {
                ret = msgs[sMsgNo];

                if (ret.indexOf("{?msg1}") >= 0) ret = ComReplaceStr(ret, "{?msg1}", msg1);
                if (ret.indexOf("{?msg2}") >= 0) ret = ComReplaceStr(ret, "{?msg2}", msg2);
                if (ret.indexOf("{?msg3}") >= 0) ret = ComReplaceStr(ret, "{?msg3}", msg3);
            }

            return ret;
        } catch(err) { ComFuncErrMsg(err.message); }
    }

    /**
     * 메시지코드의 메시지 문자열을 찾아서 리턴한다. <br>
     * 치환 문자가 3개 이상인경우 배열로 처리한다. <br>
     * 메시지코드는 전역변수인 msgs 문자열배열에 저장되어 있다. <br>
     * <br><b>Example :</b>
     * <pre>
     * 		var mText = new Array("이름");
     *     	sMsg = ComGetMsg2("COM12115", mText);      //메시지코드 "COM12115"이고, 첫번째 메시지 변수는 "이름"을 넣은 문자열을 반환한다.
     * <pre>
     * @param {string} sMsgNo 필수,메시지코드
     * @param {string[]} arrMsg 필수,메시지 변수배열
     * @return 없음
     * @see #ComShowCodeConfirm2
     * @see #ComShowCodeMessage2
     */
    function ComGetMsg2(sMsgNo, arrMsg)
    {
        try {
            var ret = "";
            sMsgNo = sMsgNo.toUpperCase();

            if (msgs[sMsgNo]) {
                ret = msgs[sMsgNo];
                for(var i = 0; i < arrMsg.length ; i++){
                	if (ret.indexOf("{?msg"+String(i+1)+"}") >= 0) 
                		ret = ComReplaceStr(ret, "{?msg"+String(i+1)+"}", arrMsg[i]);
                }
            }

            return ret;
        } catch(err) { ComFuncErrMsg(err.message); }
    }

    /**
     * 메시지코드의 메시지 문자열을 전역변수인 msgs 문자열 배열에 설정한다. <br>
     * sMsgNo인자는 설정하고자 하는 메시지코드를 "업무구분영문3자리 + 숫자코드5자리"로 설정한다. 메시지코드는 자동으로 대문자로 등록된다. <br>
     * sMsgText인자는 표시할 메시지로, 가변메시지가 있다면 "{?msg1}", "{?msg2}", "{?msg3}" 3가지로 문자열내에 설정한다. <br>
     * <br><b>Example :</b>
     * <pre>
     *     ComSetMsg("SCE90002", "When you enter POR, POL, POD, DEL, you must enter between VVD or BKG Date."); //가변메시지가 없는 경우
     *     ComSetMsg("COA10011", "{?msg2} of {?msg1} should be equal to or less than {?msg3}.");                //가변메시지가 있는 경우
     * <pre>
     * @param {string} sMsgNo 필수,메시지코드
     * @param {string} msg1   선택,메시지 변수1
     * @param {string} msg2   선택,메시지 변수2
     * @param {string} msg3   선택,메시지 변수3
     * @return 없음
     * @see #ComGetMsg
     * @see #ComShowCodeConfirm
     * @see #ComShowCodeMessage
     */
    function ComSetMsg(sMsgNo, sMsgText)
    {
        try {
            sMsgNo = sMsgNo.toUpperCase();
            msgs[sMsgNo] = sMsgText;
        } catch(err) { ComFuncErrMsg(err.message); }
    }

    /**
     * 함수의 처리 중 에러가 발생한 경우 이 함수를 이용하여 에러 메시지를 표시한다. <br>
     * 다음과 같은 메시지가 표시된다. <br>
     * &nbsp;&nbsp;&nbsp;&nbsp; [함수명 Error] 에러메시지 <br>
     * <br><b>Example :</b>
     * <pre>
     *     try {.... 중략....
     *     } catch(err) { ComFuncErrMsg(err.message); } //"[함수명 Error] err.message"가 표시됨
     * <pre>
     * @param {string} err_msg 필수,에러메시지
     */
    function ComFuncErrMsg(err_msg) {
        var sFuncName = "";
        try {
            sFuncName=ComFuncErrMsg.caller.toString();
            sFuncName = sFuncName.substring(9, sFuncName.indexOf("("));
        } catch(err){;}

        alert("["+sFuncName+" Error] " + err_msg);
    }
