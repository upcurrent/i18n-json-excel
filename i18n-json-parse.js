/*
 * @version: 
 * @Company: 
 * @Author: 韦轩
 * @LastEditors: 韦轩 wx@zsit.cc
 * @LastEditTime: 2022-09-16 16:38:53
 * @Description: 
 * @FilePath: \edgs-client-devf:\other\openTheBrain\i18n-key-parse.js
 * @Date: 2022-09-08
 */
var breakList = [
	"placeholder.beginDate",
	"placeholder.endDate",
	"placeholder.enterContent",
	"placeholder.select",
	"placeholder.name",
	"placeholder.area",
	"placeholder.company",
	"placeholder.rank",
	"placeholder.city",
	"placeholder.department",
	"placeholder.responsibleArea",
	"placeholder.jobTitle",
	"placeholder.remark",
	"placeholder.wireTransfer",
	"placeholder.letterOfCredit",
	"placeholder.creator",
	"formTipText.importEn",
	"formTipText.importCn",
	"formTipText.positionDesc",
	"formTipText.beginDate",
	"formTipText.area",
	"formTipText.orderNum",
	"formTipText.orderNumReg",
	"navigator.productDetail",
	"userInfo.companyCode",
	"userInfo.placeholder.companyCode",
	"userInfo.placeholder.selectInfo",
	"resetPwd.err.newPwd",
	"message.successAdded",
	"message.successEdit",
	"message.success",
	"message.successAudit",
	"message.successCancel",
	"message.fail",
	"message.successDisable",
	"message.successEnable",
	"message.accountDisable",
	"button.search",
	"button.disable",
	"button.enable",
	"button.add",
	"button.modify",
	"button.export",
	"button.exportCn",
	"button.exportEn",
	"button.import",
	"button.detail",
	"button.ShowDisable",
	"button.yes",
	"button.no",
	"button.ok",
	"button.back",
	"button.next",
	"button.chooseFile",
	"button.showSeparation",
	"button.cancelInput",
	"button.account",
	"button.commit",
	"button.selectFile",
	"button.currency",
	"button.contractSign",
	"button.positive",
	"button.OperationPositive",
	"button.OperationContract",
	"button.refresh",
	"button.checkDetail",
	"button.inputResult",
	"button.setting",
	"button.addToAudit",
	"button.position",
	"button.check",
	"button.accountingList",
	"button.accountingListView",
	"button.accountingMapView",
	"button.allSend",
	"button.upload",
	"button.showImported",
	"button.addToList",
	"button.sendOA",
	"button.addOA",
	"button.updateOA",
	"button.adjustSuperior",
	"cart.transferOrder",
	"message.delConfirm",
	"message.successConfirm",
	"message.disableConfirm",
	"message.enableConfirm",
	"message.notarize",
	"message.successDelete",
	"message.withoutItem",
	"message.staffIdFirst",
	"message.checkStaffId",
	"message.deleteLatest",
	"message.uploadSuccess",
	"message.uploadFail",
	"message.imgMaxSize",
	"message.invaildInput",
	"message.accountSuccess",
	"message.successImport",
	"message.failImport",
	"message.fileTooLarge",
	"message.noExcelFile",
	"message.onlyOnefile",
	"message.delCompeledRecord",
	"message.delPrompt1",
	"message.delPrompt2",
	"message.delPrompt3",
	"message.delPrompt4",
	"message.delPrompt5",
	"message.jobAccount",
	"message.auditRecordTip",
	"message.enterEndDate",
	"message.enterBeginDate",
	"message.password",
	"message.username",
	"message.login",
	"message.sendPassword",
	"message.jobType",
	"message.job",
	]
	exports.getFlatObj = function(_obj) {
		let expandObj = new Map()
		let handle = (obj, parentKey = "") => {
			Object.keys(obj).forEach(key => {
				if (typeof obj[key] == 'object') {
					handle(obj[key], parentKey + key + '.')
				} else {
					// if(!breakList.includes(parentKey + key))
					expandObj.set(parentKey + key,obj[key])
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
	exports.resetKey = function(obj) {
		let resetObj = {};
		Object.keys(obj).forEach(key => {
			let expand = key.split('.');
			let lastKey = expand.pop();
			let curObj = null;
			expand.forEach(_k => {
				if (!curObj) {
					curObj = !resetObj[_k] ? (resetObj[_k] = {}) : resetObj[_k];
				} else {
					curObj[_k] = curObj[_k] || {};
					curObj = curObj[_k]
				}
			})
			curObj[lastKey] = obj[key];
		})
		return resetObj;
	}
	