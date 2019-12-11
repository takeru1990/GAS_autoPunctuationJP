function sendHttpPost(text){
     
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
        'method' : 'post',
        'payload' : payload
    };
     
 
    // レスポンスの後半だけ残して，タグを取り除いて，1-2行目を消す
    var res = UrlFetchApp.fetch(url, options).getContentText('EUC-JP');
 
    res = res.split('<h3>')[2];
    res = res.replace(/<("[^"]*"|'[^']*'|[^'">])*>/g,''); 
    res = res.replace(/^変換文\n\n/,'');
 
    return res;
 
}
