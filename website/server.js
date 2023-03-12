const express = require('express');
const app  = express();
const path = require('path');
const fs = require('fs');
const cors = require('cors');
const router = express.Router();

// 解析json
const bodyParser = require('body-parser')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

// 跨域解决
app.use(cors());
// 导入路由
app.use(router);



router.get('/', async (req, res) => {
    // res.send({
	// 	status:0,			//状态，0表示成功，1表示失败
	// 	msg:'GET请求成功', //状态描述
	// 	data:{
    //         "name": "Poter",
    //         "year": 19
    //     }		  // 需要响应给客户端的具体数据
	// })
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    const result = fs.readFileSync(path.resolve(__dirname,"./src/assets/imges/code.jpg"), 'base64') 
    res.send(result) // 返回 base 类型的图片数据
})

router.post('/user/login', (req, res) => {
    // console.log(req.body);
    const result = {
        "code": "200",
        "msg": "登录成功，点击跳转至首页" 
    }
    res.send(JSON.stringify(result));
})

router.post('/user/captcha', (req, res) => {
    const result = {
        "code": "200",
        "msg": "操作成功",
        "data": {
            "captcha": "iVBORw0KGgoAAAANSUhEUgAAAGQAAAAoCAIAAACHGsgUAAAQdUlEQVR4Xu3adbhVVRrH8UvYiIFgt2IX2N2B3YWJXdiBLYqdqICK3WJjYU4wgVMy46DjOM04Os0gIuDzzGfWe113P2eve+6dGf/0/WM/5+6z9orv+r2x9rktLV/bf2VvvfXWN5J9M9m3kn072fjx47+T7LvJvpfs+8kmTJjwdrIfJPthsh8l+3GynyR7J9nEiRN/muxnyd5N9vNkk5K999577yf7RbIPkv0y2YcffvirZL9O9ptkv032u2S/T/aHZJMnT/5jso+S/SnZx8k++eSTPyf7S7K/Jvtbsr8n+0eyfyabMmXKv5JNTfbpp5+2CyuTqsPKpNqDFaQCViZVh9VAqg4rk2oOq4FUHVYmVYdVJRWwMqkOYBVlFbCKsqrC6lBWAauJrAJWUVYBK0gFrCayClhFWQWsTsoqYGVSbbCKPliUVcBqIqs6rKKsAlYTWQWsDmVVhVWUVcAqyipgVWUVsIqyKsAqyipgNZFVwCqSqsNqIquAVZRVHVYTWQWsoqwCVidlFbCC1LRp09pgFX2wKKuA1UlZBayirKqwirIKWEVS7cEqyipgFWXVHqy6rMqwirIKWE1kFbCCVMAqyipgNZDSuAFWh7IKWE1kFbCKsgpYVVIBqyirgDUtWSusoqwCFkw+vPbaaz77UIfVoawCVibl8yuvvPLSSy8ZcdCgQfqPlk18MEgFrCayClgNsvKI5QSyTsoqYDXIql1YDbK6884799133/POO2/EiBFNZFWH1SAroJ999tkXXnjh9NNPv+uuu7baaqtDDz30oYceOuuss1599VUS+59Du896CFkZKGBhZy3Dhg07+eST77//fpN0303XgFWVVcAqyipgffbZZ22wirJi1nbcccf16tWre/fuPXr0OOecc+qwiqQClmvA0vLJJ590PfXUU0866aQNNthg4YUX3nDDDddaa61tttnmyiuvVL4UZZUtYLmpTZDy5xtvvEGkd9xxxzXXXDNy5MixY8eSLZpg2Y+LLrrIcAsuuOBSSy215ppr7rbbbkOHDtWGwPVDbu3JKmBVZdUMVpbVLbfcctRRRy233HKaGfKCCy5wv4msdOXxxx9//KmnntJMn/6021TpJu5mv/76688555xgzT333LPPPrtu+/Xrd/7555NeMbTH9c033xQNTAn666+//u677x4zZozejjnmmKeffvqwww678MILhcKXX36Zyijo4IMPPvvss3fdddfWRba0GM6ur7LKKptssonGDz/8MN83Iq1xT+Dak1UBVl1WZjZkyJDBgwcvvfTSmh155JHm9OKLL9ZhWQbFUTuNXH755WYzYMCAG264wW5rDNYll1zC++aff36MbPU666yz7LLLzjbbbLrt0qULzZ5xxhlwmH2DrJ577jk7ZEoAnXLKKddee62x9txzz1VXXVV82GOPPYA20M4770yhTzzxBPkQl/U///zze+211wILLJBhZeMliy66qMl4ZODAgai9/vrr+NZhZVJtsIo+GEkQrOOPP36++ebTDAiiIPt6aAfIU9Zvn1dYYQXCcccy7LNvt9xySwsgz1122eWxxx4z0euuu46g7PNCCy3UrVs3VxIYNWoUaVRhCWR0dNttt5nG7bffvvfee5sJNfEpoFG2JT5Y/AEHHGDQE0444cwzz7zsssseeOAB0WDJJZe0bSuuuKIG0Ky22moazzXXXC1phxhd2ydtPP7oo48KefRVlFUBVoOs2M0337z99tt37dpVMzu83nrrcZYsK82wGDduHKDoWLa92nzzzbX3rRCuB5O2DKJzNWPNdt99d09Rig5RoA6rAu7EE09UTAQplCP2r7HGGhyqb9++Ol933XWtzSLd5FM+kBgQO+ywQ58+fWL9tAkBb+CbvtJAZDQfEfPee++VUvSm2WKLLeaaqdkDW2jOIDQErCA1ffr0NlhFH3QlBI6jjRnYfK6UfVBLXsYpNt54Y/fnmGMOc9JYzLb5mnFMpCxYrLU2X9lwqxJf8SUZ/SMiaSy++OKnnXYaWT3zzDOUJY74yqokMmEOpuWXX97KiYI6fMDuwAMP7N27t/DUs2dPDfbZZx+q4Zt8Sm9iheLRfQh6J5MB5U1DqLYMeuONN6688spEZ8661XLeeee1f5J+UVZlWFVZKUQpQkfauAo0cj9MKPhWCBcpqNe2UIcrb7LC/v37ayNPSYUiDjkIH/2TeUQedN9ARGTqdOomXrfeequlgujPKCzoxZ6Da3TrwYugjj76aFy01MzmWbMo5k/BgXLNUANuKNOJgLE6OOxftRaNsst2Cg7ok55m5m85Bx10UB3W9GStsIqyCliyYWujlpaNNtrI2tw0xj333EM+9pDf2VIpZu21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"
        }
    }
    res.send(JSON.stringify(result));
})

app.listen(3000, function(){
    console.log('3000端口监听中...');
});