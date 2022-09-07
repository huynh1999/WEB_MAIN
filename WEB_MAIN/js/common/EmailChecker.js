function checkAllEml(addrStr){
    var addrArr = addrStr.split(',');
    var isBegin  = false;
    var isOk = true;
    var beginStr = '<';
    var endStr   = '>';
    for(var i = 0; i < addrArr.length;i++){
        if(trim(addrArr[i])!=''){
            if(addrArr[i].indexOf(beginStr)>0){

                var chkEml = '';
                isBegin = false;
                for(var j = 0; j < addrArr[i].length; j++){
                
                    //시작하는 Character
                    if(addrArr[i].charAt(j)==beginStr){
                        isBegin = true;
                    }else if(isBegin){
                        if(addrArr[i].charAt(j)!=endStr){
                            chkEml+= addrArr[i].charAt(j);
                        }
                    }
                }
                if(emailCheck(chkEml)==false){
                    isOk = false;
                    break;
                }

            }else{
                if(emailCheck(addrArr[i])==false){
                    isOk = false;
                    break;
                }
            }
        }
    }
    return isOk;
}

function emailCheck (emailStr) {
    var checkTLD=1;
    var knownDomsPat=/^(com|net|org|edu|int|mil|gov|arpa|biz|aero|name|coop|info|pro|museum)$/;
    var emailPat=/^(.+)@(.+)$/;
    var specialChars="\\(\\)><@,;:\\\\\\\"\\.\\[\\]";
    var validChars="\[^\\s" + specialChars + "\]";
    var quotedUser="(\"[^\"]*\")";
    var ipDomainPat=/^\[(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})\]$/;

    var atom=validChars + '+';
    var word="(" + atom + "|" + quotedUser + ")";
    var userPat=new RegExp("^" + word + "(\\." + word + ")*$");
    var domainPat=new RegExp("^" + atom + "(\\." + atom +")*$");
    
    var matchArray=emailStr.match(emailPat);
    if (matchArray==null) {
        alert("Email address seems incorrect (check @ and .'s)");
        return false;
    }
    
    var user  = matchArray[1];
    var domain= matchArray[2];
    for (i=0; i<user.length; i++) {
        if (user.charCodeAt(i)>127) {
            alert("Ths username contains invalid characters.");
            return false;
        }
    }
    
    for (i=0; i<domain.length; i++) {
        if (domain.charCodeAt(i)>127) {
            alert("Ths domain name contains invalid characters.");
            return false;
        }
    }

    if (user.match(userPat)==null) {
        alert("The username doesn't seem to be valid.");
        return false;
    }

    var IPArray=domain.match(ipDomainPat);
    if (IPArray!=null) {
        for (var i=1;i<=4;i++) {
            if (IPArray[i]>255) {
                alert("Destination IP address is invalid!");
                return false;
           }
        }
        return true;
    }

    var atomPat=new RegExp("^" + atom + "$");
    var domArr=domain.split(".");
    var len=domArr.length;
    for (i=0;i<len;i++) {
        if (domArr[i].search(atomPat)==-1) {
            alert("The domain name does not seem to be valid.");
            return false;
       }
    }
    
	//#659 Balloon 관련 개선사항 검토 요청  3) 메일 수신자 validation 관련 Validation 주석
//    if (checkTLD && domArr[domArr.length-1].length!=2 && domArr[domArr.length-1].toLowerCase().search(knownDomsPat)==-1) {
//
//    	alert("The address must end in a well-known domain or two letter " + "country.");
//        return false;    	
//    }

    if (len<2) {
        alert("This address is missing a hostname!");
        return false;
    }

    return true;    
}