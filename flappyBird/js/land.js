/**
 * Created by Admin on 2017/4/12.
 */
(function (Fly) {
    'use strict';

    function Land(params) {
        this.ctx = params.ctx;
        this.img = params.img;
        this.imgW = this.img.width;
        this.imgH = this.img.height;
        this.x = params.x || 0;
        this.y = params.y || this.ctx.canvas.height - this.imgH;
        this.speed = -0.15;
    }

    Land.prototype.render = function (t) {
        var ctx = this.ctx;

        ctx.drawImage(this.img, this.x, this.y);

        this.x += this.speed * t;
        if(this.x <= -this.imgW){
            this.x += this.imgW * 4;
        }

    };

    Fly.Land = Land;
})(Fly);