import validator from 'validator';
var extendsFunc = function() {
    function isDate (strDate) {
        return  validator.isDate(strDate, strictMode=true);
    }
    // var strSeparator = "-";
    // var strDateArray;
    // var intYear;
    // var intMonth;
    // var intDay;
    // strDateArray = strDate.split(strSeparator);
    // if (strDateArray.length != 3) return false;
    // intYear = parseInt(strDateArray[0], 10);
    // intMonth = parseInt(strDateArray[1], 10);
    // intDay = parseInt(strDateArray[2], 10);
    // if (isNaN(intYear) || isNaN(intMonth) || isNaN(intDay)) return false;
    // if (intMonth > 12 || intMonth < 1) return false;
    // if ((intMonth == 1 || intMonth == 3 || intMonth == 5 || intMonth == 7 || intMonth == 8 || intMonth == 10 || intMonth == 12) && (intDay > 31 || intDay < 1)) return false;
    // if ((intMonth == 4 || intMonth == 6 || intMonth == 9 || intMonth == 11) && (intDay > 30 || intDay < 1)) return false;
    // if (intMonth == 2) {
    //     if (intDay < 1) return false;
    // }
    // return true;
//  });

// YYYY-MM-DDTHH:MMZ
    function isUTC (date){
        return validator.isISO8601(date);
   //return /\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z)/.test(date);
 };
}

export default extendsFunc;