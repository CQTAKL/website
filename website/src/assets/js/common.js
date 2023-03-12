
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

