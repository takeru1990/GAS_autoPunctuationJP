function docPunctuate(txt){
     
  // テキストを1000文字ごとに分割して読点挿入
  var size = 1000;
  var len = txt.length;
  var out = "";
   
  for(var i=0; size*i<=len; i++){
    out += punctuate(txt.substr(size*i, size));
  }
   
 
  return zen2han(out);
   
}

function punctuate(text){
     
    // Endpoint
    var url = 'http://pumpkin.i.ryukoku.ac.jp/cgi-bin/dokuten_insert/di.cgi';
     
     
    // payload を作成
    text = EscapeEUCJP(text);
    var enter = EscapeEUCJP('予測')
     
    var payload = '';
    payload += 'input_sentence=' + text;
    payload += '&';
    payload += 'enter=' + enter;
     
   
    // options を作る
    var options =
    {
        "method" : "post",
        'payload' : payload
    };
       
     
    // レスポンスの後半だけ残して，タグを取り除いて，1-2行目を消す
    var res = UrlFetchApp.fetch(url, options).getContentText('EUC-JP');
   
    res = res.split('<h3>')[2];
    res = res.replace(/<("[^"]*"|'[^']*'|[^'">])*>/g,'');    
    res = res.replace(/^変換文\n\n/,'');
    res = res.replace(/\n/gm,'');
   
    return res;
 
}

// https://b.0218.jp/20151023001654.html
// ここからコピー
function zen2han(val) {
   
  var regex = /[Ａ-Ｚａ-ｚ０-９！＂＃＄％＆＇（）＊＋，－．／：；＜＝＞？＠［＼］＾＿｀｛｜｝]/g;
 
  // 入力値の全角を半角の文字に置換
  value = val
    .replace(regex, function(s) {
      return String.fromCharCode(s.charCodeAt(0) - 0xfee0);
    })
    //.replace(/[‐－―]/g, "-") // ハイフンなど
    //.replace(/[～〜]/g, "~") // チルダ
    .replace(/　/g, " "); // スペース
 
  return value;
 
}
