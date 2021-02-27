/**
 * 上传附件转base64
 * @param {File} file 文件流
 */
export const fileByBase64 = (file, callback) => {
  var reader = new FileReader();
  // 传入一个参数对象即可得到基于该参数对象的文本内容
  reader.readAsDataURL(file);
  reader.onload = function(e) {
    // target.result 该属性表示目标对象的DataURL
    // console.log(e.target.result);
    callback ? callback(e.target.result) : null;
  };
};

/**
 * base64转Blob
 * @param {*} data
 */
export const base64ByBlob = (base64, callback) => {
  var arr = base64.split(","),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  // console.log(new Blob([u8arr], { type: mime }));
  callback ? callback(new Blob([u8arr], { type: mime })) : null;
};

// blob转url
// var url = window.URL.createObjectURL(blob);
