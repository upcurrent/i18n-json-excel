const xlsx = require('node-xlsx');
const fs = require('fs');

const {getFlatObj,resetKey} = require('./i18n-json-parse');
console.log('getFlatObj,resetKey',getFlatObj,resetKey);
const jsonPath = 'F:/theSaltWater/edgs-client/src/renderer/locales/lang';
const excelPath = './挤出机采集系统多语言.xls';
// let jsonPath = 'F:/theSaltWater/xzlsjq-oms-mall-web/src/locales';
// let jsonPath = 'F:/theSaltWater/xzlsjq-oms-mall-h5/i18n';
let locales = [];
var walkDir = function (pathStr) {
    fs.readdir(pathStr, function (err, files) {
        files.filter(f => f.includes('.json')).forEach(function (file) {
            locales.push(require(pathStr + '/' + file));
        });
        console.log('locales',locales);
        managerJSON();
    });
}
// walkDir(jsonPath);
var managerJSON = function(){
    if(!locales.length){
        console.log('没有数据');
        return;
    }
    // 扁平
    let _locales = [];
    locales.forEach(lan =>{
        let obj = getFlatObj(lan)
        _locales.length = obj.size;
        let i = 0;
        obj.forEach((value,key) =>{
            if(!_locales[i]){
                _locales[i] = [key];
            } 
            _locales[i].push(obj.get(_locales[i][0]));
            i++;
        })
    })
    console.log('_locales',_locales);
    fs.writeFile(excelPath,xlsx.build([{name: 'first', data: _locales}]),function(error){
        if(error){
            console.log('error',error);
        }
    })
}

var excelToJson = function(){
    var xlsList = xlsx.parse(excelPath).map(sheet => sheet.data);
    let objList = [];
    objList.length = xlsList[0][0].length;
    objList.fill(null);
    xlsList[0].forEach((values,pIndex) =>{
        let key = xlsList[1][pIndex][0];
        objList.forEach((obj,index) =>{
            if(!obj)(obj = objList[index] = {});
            obj[key] = values[index];
        })
    })
    // console.log('objList[0]',objList);
    objList.forEach((obj,pIndex) =>{
        fs.writeFile(`./${pIndex}.json`,JSON.stringify(resetKey(obj),null,4),function(error){
            if(error){
                console.log('error',error);
            }
        })
    })
}
excelToJson()
