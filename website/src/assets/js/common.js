
// 判断是否是手机号
export function isPhoneNumber(tel) {
    const reg =/^0?1[3|4|5|6|7|8][0-9]\d{8}$/;
    return reg.test(tel);
}

// 判断是否是邮箱
export function isMail(mail) {
    const reg = /^([a-zA-Z\d][\w-]{2,})@(\w{2,})\.([a-z]{2,})(\.[a-z]{2,})?$/;
    return reg.test(mail);
} 

// 判断是否有非法注入
export function isInjection(text) {
    const reg = /select|update|delete|exec|count|'|"|=|;|>|<|%/i;
    return reg.test(text);
}

// 判断是否是数字或者字母
export function isNumberOrLetter(text) {
    const reg = /^[0-9a-zA-Z]*$/;
    return reg.test(text);
}

// 判断密码强度
export function passwordStrength(text){
    if (text.match(/[^0-9a-zA-Z!@#$%^&*_]+/g)) return [false, "包含非法字符"];
    if (text.length < 8 || text.length > 20) return [false, "密码位数必须为8到20位"];
    if (isInjection(text)) return [false, "密码中存在非法字符"];

    let lv = 0;
    if (text.match(/[a-z]/g)) { lv++; }; // 验证是否包含小写字母
    if (text.match(/[A-Z]/g)) { lv++; }; // 验证是否包含大写字母
    if (text.match(/[0-9]/g)) { lv++; }; // 验证是否包含数字
    if(text.match(/[!@#$%^&*_]/g)) {lv++ }; // 验证是否包含特殊字符
    if (lv < 2) return [false, "密码至少包含大小写字母,数字,特殊字符其中两种"];
    return [true, "密码强度正常"];

}

// 防抖函数
export function debounce(func, wait=1000){
	let timeout;
    return function(){
        // this 和 参数的传递
        const context = this;
        const args = [...arguments];
        // 是为了让 debounce 函数最终返回的函数 this 指向不变以及依旧能接受到 e 参数
        if(timeout) clearTimeout(timeout);
        timeout = setTimeout(function(){
            func.apply(context, args);
            // 如果是箭头函数调用的话可以直接func.apply(this, arguments);
        }, wait);
    }
}

// 节流函数
export function throttle(func, wait=1000){
    let timeout;
    return function(){
        const context = this;
        const args = arguments;
        if(!timeout){
            timeout = setTimeout(function(){
				timeout = null;
                func.apply(context, args);
                // 如果这里使用的是箭头函数 func.apply(this, arguments)
            }, wait);
        }
    }
}

// 设置名字
export function setName(showRealName, realName, nickName){
    if(!realName) return nickName;
    return showRealName ? realName : nickName;
}

// 设置地区的位置编号
export function setCountryId(index){
    const arr = ["北京市","天津市","河北省","山西省","内蒙古自治区","辽宁省","吉林省","黑龙江省","上海市","江苏省","浙江省","安徽省","福建省","江西省","山东省","河南省","湖北省","湖南省","广东省","广西壮族自治区","海南省","重庆市","四川省","贵州省","云南省","西藏自治区","陕西省","甘肃省","青海省","宁夏回族自治区","新疆维吾尔族自治区","国外"];
    return arr[index-1];
}

Date.prototype.format = function(fmt) { //author: meizz
    const time = new Date(); 
    var o = {
        "M+": time.getMonth() + 1, //月份 
        "d+": time.getDate(), //日 
        "h+": time.getHours(), //小时 
        "m+": time.getMinutes(), //分 
        "s+": time.getSeconds(), //秒 
        "q+": Math.floor((time.getMonth() + 3) / 3), //季度 
        "S": time.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (time.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}