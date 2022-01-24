import { Injectable } from '@angular/core';
declare var $: any;

@Injectable({
  providedIn: 'root'
})
export class FileManagerService {

  constructor() { }

  // ------------- read file as byte[] -----------
  readFileBytes(file): Promise<any> {
    const reader  = new FileReader();
    const future = new Promise((resolve, reject) => {
      reader.addEventListener('load',  () => {
        const arrayBuffer:any = reader.result;
        const array = new Uint8Array(arrayBuffer);
        const fileByteArray: any [] = [];
        for (let i = 0; i < array.length; i++) {
          fileByteArray.push(array[i]);
        }
        resolve( fileByteArray);
      }, false);
      reader.addEventListener("error", function (event) {
        reject(event);
      }, false);
      reader.readAsArrayBuffer(file);
    });
    return future;
  }

 // ------------- read file as base 64 -----------
 readFileBase64(file): Promise<any> {
     const reader  = new FileReader();
     const future = new Promise((resolve, reject) => {
      reader.addEventListener('load',  () => {
        resolve(reader.result);
      }, false);
      reader.addEventListener('error', (event)=> {
        reject(event);
      }, false);
      reader.readAsDataURL(file);
    });
    return future;
  }

  // ------------- byte Array To Uint8 Array  -----------
  byteArrayToUint8Array(byteArray): any {
    let uint8Array = new Uint8Array(byteArray.length);
    for(let i = 0; i < byteArray.length; i++) {
      uint8Array[i] = byteArray[i];
    }
    return uint8Array;
  }

  _base64ToArrayBuffer(base64) {
    var binary_string = window.atob(base64);
    var len = binary_string.length;
    var bytes = new Uint8Array(len);
    for (var i = 0; i < len; i++) {
      bytes[i] = binary_string.charCodeAt(i);
    }
    return bytes;
  }

  getImagUrl(file){
    return URL.createObjectURL( new Blob([file.buffer], { type: 'image/png' }));
  }

  // ------------- download file  -----------
  downloadFile(content, type, fileName, filePath = null){
    const file = new Blob([filePath ? this._base64ToArrayBuffer(content) : this.byteArrayToUint8Array(content)], {type: type});
    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
      window.navigator.msSaveOrOpenBlob(file);
    } else {
      var objectUrl = URL.createObjectURL(file);
      window.open(objectUrl);
    }
    // FileSaver.saveAs(content, fileName);
  }
  downloadContent(content, contentType): void{
    const byteArray = new Uint8Array(atob(content).split('').map(char => char.charCodeAt(0)));
    window.open(window.URL.createObjectURL(new Blob([byteArray], {type: contentType})));
  }
}
