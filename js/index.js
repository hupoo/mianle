/*
 * @Author: hupooW 
 * @Date: 2018-01-12 11:06:11 
 * @Last Modified by: hupooW
 * @Last Modified time: 2018-03-22 19:18:50
 */

//  验证码
// 验证码
function createCode(len) {
    var code = "";
    var codeLength = len || 4; //验证码的长度    
    var checkCode = document.getElementById("code");
    // 最直接的生成随机字符串
    code += Math.random().toString(32).substr(2, codeLength);
    checkCode.value = code.toUpperCase();//把code值赋给验证码    
};

// 文字复制  @prames  传入要复制的对象

function jsCopy(obj) {
    const range = document.createRange();
    range.selectNode(document.getElementById(obj));
    const selection = window.getSelection();
    if (selection.rangeCount > 0) {
        selection.removeAllRanges();
    } else {
        selection.addRange(range);
    }
    document.execCommand('copy');
}

// 波浪
function wave() {
    
    var canvas = document.getElementById('canvas');
    canvas.width = canvas.parentNode.clientWidth;
    canvas.height = canvas.parentNode.clientHeight;
    var ctx = canvas.getContext('2d');
    // Create context
    // Set waves opacities
    const wavesOpacities = [0.8, 0.6, 0.4, 0.2, 0.1];
    // Set parameters
    const params = {
        AMPLITUDE_WAVES: canvas.height, //波浪高度
        AMPLITUDE_MIDDLE: canvas.height / 3, //波浪中间高度
        AMPLITUDE_SIDES: canvas.height / 2, //波浪旁边高度
        OFFSET_SPEED: 120,//波浪震动速度
        SPEED: 3,//波浪震动速度
        OFFSET_WAVES: 40,//波浪偏移量
        NUMBER_WAVES: 3,//波浪个数
        COLOR: ['#fff', '#f5f5f5', '#f4f4f4'],//波浪颜色
        NUMBER_CURVES: 2,//波峰个数
        OFFSET_CURVE: true,//波浪是否偏移
        RESET: false
    };

    let speedInc = 0;
    // Render
    const render = () => {
        //画布大小
        canvas.width = canvas.parentNode.clientWidth;
        canvas.height = canvas.parentNode.clientHeight;
        ctx.fillStyle = 'rgba(0, 0, 0, 0)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        // For each wave
        for (let j = params.NUMBER_WAVES - 1; j >= 0; j--) {
            // offset between waves
            let offset = speedInc + j * Math.PI * params.OFFSET_WAVES;

            // Color and increase gradually opacity
            ctx.fillStyle = params.COLOR[j];

            ctx.globalAlpha = wavesOpacities[j];
            // 振荡
            // 定义的高度cubicbezier振幅 

            // Speed amplitude variation between 0 and AMPLITUDE_SIDES ( half height window)
            // Set height amplitude of borders points (left and right of the window) -> no offset here
            let leftRange = ((Math.sin((offset / params.OFFSET_SPEED))) / 2 * params.AMPLITUDE_SIDES) + (canvas.height - params.AMPLITUDE_SIDES) / 2;
            let rightRange = ((Math.sin((offset / params.OFFSET_SPEED))) / 2 * params.AMPLITUDE_SIDES) + (canvas.height - params.AMPLITUDE_SIDES) / 2;

            // Speed amplitude variation between 0 and AMPLITUDE_WAVES ( height window)
            // Set height amplitude of the first and second points of a curve
            let leftCurveRange = (Math.sin((offset / params.OFFSET_SPEED) + 2) + 1) / 2 * params.AMPLITUDE_WAVES + (canvas.height - params.AMPLITUDE_WAVES) / 2;
            let rightCurveRange = (Math.sin((offset / params.OFFSET_SPEED) + 1) + 1) / 2 * params.AMPLITUDE_WAVES + (canvas.height - params.AMPLITUDE_WAVES) / 2;

            // Speed amplitude variation between 0 and AMPLITUDE_MIDDLE
            // Set height amplitude of the last point of a curve
            let endCurveRange = ((Math.sin((offset / params.OFFSET_SPEED) + 2) + 1) / 2 * params.AMPLITUDE_MIDDLE) + (canvas.height - params.AMPLITUDE_MIDDLE) / 2;

            // Reverse amplitude of the first and second points of a curve (only needed with 3 curves or more)
            let reverseLeftCurveRange = endCurveRange - rightCurveRange + endCurveRange;
            let reverseRightCurveRange = endCurveRange - leftCurveRange + endCurveRange;

            // Neutralise curves first and second point amplitude
            if (params.OFFSET_CURVE === false) {

                leftCurveRange = rightCurveRange;
                reverseRightCurveRange = reverseLeftCurveRange;

            }

            // Draw and fill path
            ctx.beginPath();

            // Draw first point from Left
            ctx.moveTo(0, leftRange);

            // Draw bezier curves based on amplitude

            // Draw each points of the first curve
            // bezierCurveTo() see https://www.w3schools.com/TAGs/canvas_beziercurveto.asp
            ctx.bezierCurveTo(canvas.width / (params.NUMBER_CURVES * 3), leftCurveRange, canvas.width / (params.NUMBER_CURVES * 3 / 2), rightCurveRange, canvas.width / params.NUMBER_CURVES, endCurveRange);

            // Draw each points of other curves if needed
            for (let i = 1; i < params.NUMBER_CURVES; i++) {

                // Reverse waves amplitude 1 / 2 times
                const finalRightCurveRange = i % 2 !== 0 ? rightCurveRange : reverseRightCurveRange;
                const finalLeftCurveRange = i % 2 !== 0 ? leftCurveRange : reverseLeftCurveRange;

                // Set points curve
                const secondPtX = canvas.width * (i / params.NUMBER_CURVES) + canvas.width / (params.NUMBER_CURVES * 3);
                const secondPtY = endCurveRange - finalRightCurveRange + endCurveRange;
                const thirdPtX = canvas.width * (i / params.NUMBER_CURVES) + canvas.width * (2 / (params.NUMBER_CURVES * 3));
                const thirdPtY = endCurveRange - finalLeftCurveRange + endCurveRange;
                const lastPtX = canvas.width * ((i + 1) / params.NUMBER_CURVES);
                const lastPtY = i === params.NUMBER_CURVES - 1 ? rightRange : endCurveRange;

                ctx.bezierCurveTo(secondPtX, secondPtY, thirdPtX, thirdPtY, lastPtX, lastPtY);

            }

            // Draw last lines

            ctx.lineTo(canvas.width, canvas.height);
            ctx.lineTo(0, canvas.height);
            ctx.lineTo(0, rightRange);

            ctx.closePath();
            ctx.fill();
        }

        // Speed
        speedInc += params.SPEED;
    };

    // RAF
    TweenMax.ticker.addEventListener('tick', render);

}

// 手机号码验证
   
function isPhone(str) {
    var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
    if (!myreg.test(str)) {
        return false;
    } else {
        return true;
    }
}  
// 手机登录验证
function validatemobile(mobile) {
    var dialog = window.YDUI.dialog;
    if (mobile.length == 0) {
        dialog.toast('请输入手机号', 'none', 1000);
        return false;
    } else
    if (mobile.length != 11) {
        dialog.toast('请输入完整的手机号码！', 'none', 1000);
        return false;
    } else
    if (!isPhone(res)) {
        dialog.toast('请输入有效的手机号码！', 'none', 1000);
        return false;
    }
    else{
        return ture;
    }
}

 function addCls(obj,className){
     obj.addClass(className);
 }
function removeCls(obj, className){
    obj.removeClass(className);
 }

function toggleCls(obj, obj2, className,flag) {
    if (flag==='add') {
        obj.addClass(className).siblings(obj2).removeClass(className);
    }
    if (flag === 'move'){
        obj.removeClass(className).siblings(obj2).addClass(className);
    }
    else{
        return false;
    }
 }

var cookie = {

    //根据key值获取对应的cookie
    get: function (key) {
        //获取cookie
        var data = document.cookie;
        //获取key第一次出现的位置    pwd=
        var startIndex = data.indexOf(key + '=');
        //  name=123;pwd=abc
        //如果开始索引值大于0表示有cookie
        if (startIndex > -1) {
            //key的起始位置等于出现的位置加key的长度+1
            startIndex = startIndex + key.length + 1;
            //结束位置等于从key开始的位置之后第一次;号所出现的位置
            var endIndex = data.indexOf(';', startIndex);
            //如果未找到结尾位置则结尾位置等于cookie长度，之后的内容全部获取
            endIndex = endIndex < 0 ? data.length : endIndex;
            return decodeURIComponent(data.substring(startIndex, endIndex));

        } else {
            return '';
        }
    },

    set: function (key, value, time) {
        //默认保存时间
        var time = time;
        //获取当前时间
        var cur = new Date();
        var undefined;
        //设置指定时间
        cur.setTime(cur.getTime() + time * 24 * 3600 * 1000);
        //创建cookie  并且设置生存周期为GMT时间
        document.cookie = key + '=' + encodeURIComponent(value) + ';expires=' + (time === undefined ? '' : cur.toGMTString());

    },
    del: function (key) {
        //获取cookie
        var data = this.get(key);
        //如果获取到cookie则重新设置cookie的生存周期为过去时间
        if (data !== false) {
            this.set(key, data, -1);
        }
    }

};