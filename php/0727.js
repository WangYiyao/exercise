var dayOfWeek = [
{
"day": "1",
"openHours": "700",
"closeHours": "2200",
"latestDropOffHours": null,
"prepHours": null,
"closedIndicator": null,
"open24HoursIndicator": null
},
{
"day": "2",
"openHours": "700",
"closeHours": "2200",
"latestDropOffHours": null,
"prepHours": null,
"closedIndicator": null,
"open24HoursIndicator": null
},
{
"day": "3",
"openHours": "1700",
"closeHours": "2200",
"latestDropOffHours": null,
"prepHours": null,
"closedIndicator": null,
"open24HoursIndicator": null
},
{
"day": "4",
"openHours": "700",
"closeHours": "2200",
"latestDropOffHours": null,
"prepHours": null,
"closedIndicator": null,
"open24HoursIndicator": null
},
{
"day": "5",
"openHours": "7100",
"closeHours": "200",
"latestDropOffHours": null,
"prepHours": null,
"closedIndicator": null,
"open24HoursIndicator": null
},
{
"day": "6",
"openHours": "700",
"closeHours": "2200",
"latestDropOffHours": null,
"prepHours": null,
"closedIndicator": null,
"open24HoursIndicator": null
},
{
"day": "7",
"openHours": "7100",
"closeHours": "200",
"latestDropOffHours": null,
"prepHours": null,
"closedIndicator": null,
"open24HoursIndicator": null
}
];
  
function createGroup(day,openHours,closeHours){
  var obj = new Object();
  obj.days = new Array();
  obj.days.push(parseInt(day));
  obj.openHours = openHours;
  obj.closeHours = closeHours;

  return obj;
}

function getDate(arr){
  var week = ['','Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
  var length = arr.length;
  var strArray = new Array();
  if(length == 2){
    strArray.push(week[arr[0]]);
    strArray.push(week[arr[1]]);
  }
  else if(length == 1){
    strArray.push(week[arr[0]]);
  }
  else{
    var start = 0;
    var space = 0;
    var continuousDays = new String();
    for(var i = 1; i < length+1; i++){
      space++;
      if(arr[start] + space != arr[i]){  // 不连续
        if(i - start == 1){
          strArray.push(week[arr[start]]);
        }
        else if(i - start == 2){
          strArray.push(week[arr[start]]);
          strArray.push(week[arr[start+1]]);
        }
        else{
          continuousDays = week[arr[start]] + "-" + week[arr[i-1]];
          strArray.push(continuousDays);
        } 
        start = i;
        space = 0;
      }
    }
  }//end else

  return strArray.join(',');
}
// var a = [1,2,4,5,6,7];
// console.log(getDate(a));

function getTime(openHours,closeHours){
  openHours = openHours.toString(10);
  openHours = openHours.substring(0,openHours.length-2) + ":" + openHours.slice(-2);
  closeHours = closeHours.toString(10);
  closeHours = closeHours.substring(0,closeHours.length-2) + ":" + closeHours.slice(-2);
  return openHours + "am-" + closeHours + "pm";
}

// console.log(getTime(700,1010));

function fun(dayOfWeek){
  var dayOfWeekLen = dayOfWeek.length;
  var groupArr = new Array();
  var groupLen = 0;
  groupArr[groupLen++] = createGroup(dayOfWeek[0].day,dayOfWeek[0].openHours,dayOfWeek[0].closeHours);
  for(var i = 1; i < dayOfWeekLen; i++){
    for(var j = 0; j < groupLen; j++){   //判断有没有相同的营业时间 直接加入
      if(dayOfWeek[i].openHours == groupArr[j].openHours && dayOfWeek[i].closeHours == groupArr[j].closeHours){
        groupArr[j].days.push(parseInt(dayOfWeek[i].day));  //如果有 添加到days
        break;
      }  
    }
    if(j == groupLen)
      groupArr[groupLen++] = createGroup(dayOfWeek[i].day,dayOfWeek[i].openHours, dayOfWeek[i].closeHours);
  }
  
  var itemArray = new Array();
  for(var m = 0; m < groupLen; m++){
    var pp = getDate(groupArr[m].days);
    var item = getDate(groupArr[m].days) + ": " + getTime(groupArr[m].openHours,groupArr[m].closeHours);
    itemArray.push(item);
  }
  return itemArray.join("; ");
}

console.log(fun(dayOfWeek));
