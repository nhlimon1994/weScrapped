// load/execute after jquery
function uuid() {
  let bytes = window.crypto.getRandomValues(new Uint8Array(32));
  const randomBytes = () => (bytes = bytes.slice(1)) && bytes[0];
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c => 
      (c ^ randomBytes() & 15 >> c / 4).toString(16)
    );
}

function removeDashesFromGuid(guid) {
  //removes all dashes at once
  let ret = guid.replace(/-/g,'');
    /*let ret = guid.replace("-","");
    ret = ret.replace("-",""); 
    ret = ret.replace("-",""); 
    ret = ret.replace("-",""); */
    return ret;
}


function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  var expires = "expires="+ d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/;secure;samesite=strict";
}

function getProspectId() {

    //Make sure this is called after the everflowTransactionId is set
    let prospectId = "";
    prospectId = $("#prospectId").val();
    if (prospectId == "" || prospectId == null || prospectId.length == 0) {
        prospectId = getCookie("prospectId");
    }
     if (prospectId == "" || prospectId == null || prospectId.length == 0) {
        prospectId = $("#everflowTransactionId").val();
    }
    //if (prospectId == "" || prospectId == null || prospectId.length == 0) {
    //    prospectId = removeDashesFromGuid(uuid());
    //}
    
    if (prospectId != "" && prospectId != null && prospectId.length > 0) {
        setCookie("prospectId", prospectId, 360);
    }
    
    return prospectId;
}

//function getTrialEndDate(trialDays) {
function getTrialDates(trialDays) {
        //Handle the dynamic dates (as-of, trial period)
    let monthNames = new Array("January", "February", "March", "April", "May", " June", "July", "August", "September", "October", "November", "December");
    let monthNamesAbb = new Array("Jan", "Feb", "Mar", "Apr", "May", " Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"); 
    let now = new Date();    
    let day = now.getDate();
    let year = now.getFullYear();
    let month = monthNames[now.getMonth()];
    let asOfDate = month + ' ' + day + ', ' + year; 
    let nowTrial = new Date();
    nowTrial.setDate(now.getDate() + parseInt(trialDays));
    let dayTrial = nowTrial.getDate();
    let yearTrial = nowTrial.getFullYear();
    let monthTrial = monthNamesAbb[nowTrial.getMonth()];    
    let trialEndDate1 = monthTrial + '. ' + dayTrial + ' ' + yearTrial 
    let trialEndDate2 = (parseInt(nowTrial.getMonth()) + 1).toString() + "/" + dayTrial + "/" + yearTrial
    //Element 1 is formatted like Mar. 15 2021, element 2 is formated like 03/15/2021
    return JSON.parse(`{"asOfDate": "${asOfDate}",  "trialEndFormat1": "${trialEndDate1}", "trialEndFormat2": "${trialEndDate2}"}`);
    
}

function logToOrigin (action, logDataString) {
  
  return;

	let prospectId = "";
	let pathname = window.location.pathname;

	try {
	    prospectId = getProspectId();
	    $("#prospectId").val(prospectId);
	} catch (err) {
	}

	let data = {
	    "page": "signupPath"
	  , "prospectId": prospectId
	  , "logCategory": "Event"
	  , "logType": "PageLoad"
	  , "logTypeDetail": action
	  , "dataValue": ""
	  , "debugDataObject": {"currentPath": pathname}
	}

	$.ajax({  
    url: "../../dbapi2_7143515.html",
    type: 'POST',
    cache: false,
    xhrFields: {
      withCredentials: true
    },
    data: data,
    async: true,	  
		success: function (data1, textStatus1, xhr1) {  
			console.log("logs written");
		},  
		error: function (xhr1, textStatus1, errorThrown1) {  
			console.log('logging error');  					
		}  
	});  							
}

