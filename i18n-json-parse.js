var breakList = [
]
exports.getFlatObj = function (_obj) {
	let expandObj = new Map()
	let handle = (obj, parentKey = "") => {
		Object.keys(obj).forEach(key => {
			if (typeof obj[key] == 'object') {
				handle(obj[key], parentKey + key + '.')
			} else {
				if(!breakList.includes(parentKey + key))
				expandObj.set(parentKey + key, obj[key])
			}
		})
	}
	handle(_obj);
	return expandObj;
}
/**
 * 
 * @param {} obj key 'a.b.c'; value : 'value'
 * @returns 
 */
exports.resetKey = function (obj) {
	let resetObj = {};
	Object.keys(obj).forEach(key => {
		let expand = key.split('.');
		if (!expand.length == 1) {
			resetObj[key] = obj[key];
			return;
		}
		let curObj = resetObj;
		expand.forEach((_k,index)=> {
			if(index == expand.length -1){
				curObj[_k] = obj[key];
			}else{
				curObj[_k] = curObj[_k] || {};
				curObj = curObj[_k]
			}
		})
	})
	return resetObj;
}
