/**
 * Created by Admin on 2017/4/12.
 */
(function (Fly) {

    'use strict';

    function Sky(params) {
        this.ctx = params.ctx;
        this.img = params.img;
        this.x = params.x || 0;
        this.y = params.y || 0;
        this.imgW = this.img.width;
        this.speed = -0.15;

    }

    Sky.prototype.render = function (t) {
        var ctx = this.ctx;

        ctx.drawImage(this.img,this.x,this.y);

        this.x += this.speed * t;

        //判断天空位置 实现无线循环
        if(this.x <= -this.imgW){
            //当前x为 -imgW  所以要加 imgW*2 才行
            this.x += this.imgW *2;
        }
    };

    // 暴露给 全局对象 Fly
    Fly.Sky = Sky;

})(Fly);