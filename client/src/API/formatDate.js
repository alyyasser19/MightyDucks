import moment from "moment";

export const formatDate = (str) =>{
    var formattedDate = moment(str).format('L');
    var formatted = formattedDate.split('/');
    formattedDate = formatted[1] + '/' + formatted[0] + '/' + formatted[2] + " " + moment(str).format('LT');
    
  }

  //export default formatDate;