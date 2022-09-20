const xlsx = require('node-xlsx');
const fs = require('fs');

const {getFlatObj,resetKey} = require('./i18n-json-parse');
console.log('getFlatObj,resetKey',getFlatObj,resetKey);
const jsonPath = 'F:/theSaltWater/edgs-client/src/renderer/locales/lang';
const excelPath = './挤出机采集系统多语言.xls';
// let jsonPath = 'F:/theSaltWater/xzlsjq-oms-mall-web/src/locales';
// let jsonPath = 'F:/theSaltWater/xzlsjq-oms-mall-h5/i18n';
let locales = [];
var readJSONDir = function (pathStr) {
    fs.readdir(pathStr, function (err, files) {
        files.filter(f => f.includes('.json')).forEach(function (file) {
            locales.push(require(pathStr + '/' + file));
        });
        console.log('locales',locales);
        jsonToExcel();
    });
}
// readJSONDir(jsonPath);
var jsonToExcel = function(){
    if(!locales.length){
        console.log('没有数据');
        return;
    }
    let _locales = [];
    locales.forEach(lan =>{
        // 扁平化json {a:{b:1}} => Map([a.b]:1)
        let objMap = getFlatObj(lan)
        _locales.length = objMap.size;
        let i = 0;
        objMap.forEach((value,key) =>{
            if(!_locales[i]){
                _locales[i] = [key];
            } 
            _locales[i].push(objMap.get(_locales[i][0]));
            i++;
        })
    })
    console.log('_locales',_locales); // [[key,l1,l2,l3],[key,l1,l2,l3],...]
    fs.writeFile(excelPath,xlsx.build([{name: 'first', data: _locales}]),function(error){
        if(error){
            console.log('error',error);
        }
    })
}
/**
 * excel 
 * sheet 1
 * key l1 l2 l3
 * 单工作表
 */
var excelToJson = function(){
    var xlsList = xlsx.parse(excelPath).map(sheet => sheet.data);
    let objList = [];
    objList.length = xlsList[0][0].length-1;
    objList.fill(null);
    xlsList[0].forEach((values,pIndex) =>{
        let key = values.shift();
        objList.forEach((obj,index) =>{
            if(!obj)(obj = objList[index] = {});
            obj[key] = values[index];
        })
    })
    writeJSON(JsonList);
}
/**
 * excel 
 * sheet 1      sheet2
 * l1 l2 l3     key
 * 双工作表
 */
var excelToJsonByDoubleSheet = function(){
    var xlsList = xlsx.parse(excelPath).map(sheet => sheet.data);
    let JsonList = [];
    JsonList.length = xlsList[0][0].length;
    JsonList.fill(null);
    xlsList[0].forEach((values,pIndex) =>{
        let key = xlsList[1][pIndex][0];
        JsonList.forEach((obj,index) =>{
            if(!obj)(obj = JsonList[index] = {});
            obj[key] = values[index];
        })
    })
    writeJSON(JsonList);
}
var writeJSON = function(JsonList){
    // console.log('objList[0]',objList);
    JsonList.forEach((obj,pIndex) =>{
        fs.writeFile(`./${pIndex}.json`,JSON.stringify(resetKey(obj),null,4),function(error){
            if(error){
                console.log('error',error);
            }
        })
    })
}
excelToJson()
