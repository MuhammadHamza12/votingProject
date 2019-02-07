import moment from 'moment';
// conversion from 24 hr to 12 hr with AM/PM
export function convert24To12(time24) {
  var ts = time24;
  var H = +ts.substr(0, 2);
  var h = (H % 12) || 12;
  h = (h < 10) ? ('0' + h) : h; // leading 0 at the left for 1 digit hours
  var ampm = H < 12 ? ' AM' : ' PM';
  ts = h + ts.substr(2, 3) + ampm;
  return ts;
}
export function comparisonOfTwoTimeString(startTime, EndTime) {
  return startTime.trim() == EndTime.trim();
}

export function getCurrentTimeInto12hr() {
  var d = new Date();
  d.setHours(d.getHours()); // offset from local time
  var h = (d.getHours() % 12) || 12; // show midnight & noon as 12
  return (
    (h < 10 ? '0' : '') + h +
    (d.getMinutes() < 10 ? ':0' : ':') + d.getMinutes() +
    // optional seconds display
    // ( d.getSeconds() < 10 ? ':0' : ':') + d.getSeconds() + 
    (d.getHours() < 12 ? ' AM' : ' PM')
  );
}
export function gettingDateIntoRequiredFormate(date) {
  try{
    const newSplit = date.split('-');
    return `${newSplit[2]}-${newSplit[1]}-${newSplit[0]}`;
  }catch(e){
    console.log(e);
  }  
}
export function TotalVotingTimeInMiliseconds(date, startTime, endTime) {
  const momentDate = moment(`${date} ${startTime}`);
  const momentDate2 = moment(`${date} ${endTime}`);
  const date1 = new Date(momentDate.toDate());
  const date2 = new Date(momentDate2.toDate());
  return date2.getTime() - date1.getTime();
}
export function getFixedDate (date, startTime){
  const momentDate = moment(`${date} ${startTime}`);
  const date1 = new Date(momentDate.toDate());
  return date1.getTime();
}
export function TotalVotingStartTimeInMiliseconds(date, startTime){
  const momentDate = moment(`${date} ${startTime}`);
  const date1 = new Date(momentDate.toDate());
  const currentDate= new Date().getTime();
  return date1.getTime() - currentDate;
}
export function TotalVotingEndTimeInMiliseconds(date,endTime){
  const momentDate = moment(`${date} ${endTime}`);
  const date1 = new Date(momentDate.toDate());
  const currentDate= new Date().getTime();
  return date1.getTime() - currentDate;
}
export function getCurrentDate() {
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth() + 1; //January is 0!
  var yyyy = today.getFullYear();
  if (dd < 10) {
    dd = '0' + dd;
  }
  if (mm < 10) {
    mm = '0' + mm;
  }
  today = mm + '-' + dd + '-' + yyyy;
  return today;
}
export default {
  getCurrentDate,
  TotalVotingTimeInMiliseconds,
  gettingDateIntoRequiredFormate,
  comparisonOfTwoTimeString,
  convert24To12
};