// 置換を実行する
function replace(txt, arr) {
     
  //do replace
  for(var i in arr){  
    var re = new RegExp(arr[i][0], 'g');
    var txt= txt.replace(re, arr[i][1]);
  }
   
  return txt;
}
