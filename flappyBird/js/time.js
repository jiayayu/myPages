(function (Fly) {

    'use strict';

    function Time(params) {
        this.ctx = params.ctx;
        this.beginTime = params.beginTime;
        this.x = params.x || 0;
        this.y = params.y || 0;
        
    }

    Time.prototype.render = function () {

        var ctx = this.ctx;
        var time = +new Date;

        var h = 0,
            m = 0,
            s = 0,
            ms = 0,
            t = 0;
        t = time -this.beginTime;
        ms = t%1000;
        s = Math.floor(t/1000)%60;
        m = Math.floor(Math.floor(t/1000)/60)%60;
        h = Math.floor(Math.floor(Math.floor(t/1000)/60));

        ms = ms>100?ms:(ms>10?'0'+ms:'00'+ms);
        s = s>10?s:'0'+s;
        m = m>10?m:'0'+m;
        h = h>10?h:'0'+h;

        ctx.fillText(''+h+':'+m+':'+s+':'+ms+'',800,15);
        ctx.font = '15px  "微软雅黑"';
        ctx.textAlign = 'right';
       
    },
    Time.prototype.restore = function () {
        this.beginTime = +new Date;
    };

    // 暴露给 全局对象 Fly
    Fly.Time = Time;

})(Fly);