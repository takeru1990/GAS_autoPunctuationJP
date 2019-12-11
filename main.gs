// UIに実行ボタンを置く
function onOpen() {
  var ui = DocumentApp.getUi();
  ui.createMenu('自動化')
    .addItem('句読点を挿入', 'main')
    .addToUi();
}
 
// 処理の本体
function main() {
 
  //ドキュメントのテキストを読み取る
  var doc = DocumentApp.getActiveDocument();
  var text　=　doc.getBody().getText();
   
   
  //make replece words list1
  var arr1 = list1();
  text = replace(text, arr1);
   
   
  // 読点を付ける
  text = docPunctuate(text);
   
   
  // 読点を句点に変える
  var arr2 = list2();
  text = replace(text, arr2)
 
  doc.getBody().setText(text);
   
}
