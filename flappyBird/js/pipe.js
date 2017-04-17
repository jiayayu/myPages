/**
 * Created by Admin on 2017/4/12.
 */
(function (Fly) {
    'use strict';

    //一个管道对象中绘制上下两个管道
    function Pipe(params) {
        this.ctx = params.ctx;
        this.imgPipeTop = params.imgPipeTop;
        this.imgPipeBottom = params.imgPipeBottom;
        this.imgW = this.imgPipeTop.width;
        this.imgH = this.imgPipeTop.height;
        this.x = params.x || 0 ;
        this.topY = params.topY || 0;
        this.bottomY = params.bottomY || 0;
        this.speed = -0.15;
        this.pipeSpace = 150;

        //初始化管道高度
        this.initPipeHeight();
    }

    Pipe.prototype.initPipeHeight = function () {
        var pipeHeight = Math.random() *200 + 50;  //50~250
        this.topY = pipeHeight - this.imgH;
        this.bottomY = pipeHeight + this.pipeSpace;
    };

    Pipe.prototype.render = function (t) {
        var ctx = this.ctx;

        ctx.drawImage(this.imgPipeTop,this.x,this.topY);
        ctx.drawImage(this.imgPipeBottom,this.x,this.bottomY);

        // 碰撞路径绘制：
        // 绘制管道所在的路径
        // ctx.fillStyle = '#000';
        ctx.rect(this.x, this.topY, this.imgW, this.imgH);
        ctx.rect(this.x, this.bottomY, this.imgW, this.imgH);
        // ctx.fill();


        this.x += this.speed*t;
        if(this.x <= -this.imgW){
            // *3 表示每一组管道的宽度和间距（即管道之间间隔为2倍的管道宽度）
            // *6 表示有5组管道
            this.x += this.imgW * 3 * 6;

            //管道重新出现的时候，重新生成管道高度
            this.initPipeHeight();
        }

    };

    Fly.Pipe = Pipe;

})(Fly);