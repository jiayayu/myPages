/**
 * Created by Admin on 2017/4/10.
 */

(function (Fly) {

    'use strict';

    function Bird(params) {
        this.img = params.img;
        this.ctx = params.ctx;
        this.frameIndex = 0;
        this.imgFrameNum = params.imgFrameNum || 3;
        this.a = params.a || 0.0005;
        this.v = 0;
        this.t = 0;
        this.x = params.x || 100;
        this.y = params.y || 100;
        this.curAngle = 0;
        this.maxAngle = 45;
        this.maxSpeed = .5;
        this.imgW = params.img.width/3;
        this.imgH = params.img.height;
        this.listeners = [];
    }
    Bird.prototype = {
        constructor : Bird,
        draw : function (t) {
            var ctx = this.ctx;
            var imgW = this.imgW;
            var imgH = this.imgH;


            //控制小鸟加速下落
            this.v = this.v + this.a*t;
            this.y = this.y + this.v*t + 1/2*this.a*t*t;

            ctx.save();


            //控制小鸟旋转
            //小鸟在画布左上角，所以移动画布就是移动小鸟
            ctx.translate(this.x,this.y);
            this.curAngle = this.v/this.maxSpeed * this.maxAngle;
            if(this.curAngle>=45){
                this.curAngle = 45;
            }
            ctx.rotate(this.curAngle/180*Math.PI);
            ctx.drawImage(this.img,imgW*this.frameIndex++,0,imgW,imgH,-1/2*imgW,-1/2*imgH,imgW,imgH);
            //控制小鸟煽动翅膀
            this.frameIndex %= this.imgFrameNum;

            ctx.restore();


        },


        jump : function () {
            this.v = -.3;
        },

        //添加订阅方法（就是发布消息时其他对象中需要执行的方法）
        addListener : function (fn) {
            this.listeners.push(fn);
        },

        //发布消息方法
        trigger : function () {
            this.listeners.forEach(function (fn) {
                fn();
            })
        },

        //小鸟碰撞检测
        isDie : function () {

            if(this.y-8<=0 ||   //判断小鸟是否超出天空
                (this.y>=this.ctx.canvas.height-112) ||  //判断小鸟是否落到地上
                this.ctx.isPointInPath(this.x,this.y)        //判断小鸟是否碰到柱子
            //这里是通过isPointInPath方法判断小鸟的中心点是否在柱子的路径中来判断小鸟是否碰到柱子
            ){
                //发布消息，通知消息的订阅者
                //通知Game对象，让游戏停止
                this.trigger();
                // this.isStart = false;
            }
        }
    };

    Fly.Bird = Bird;
})(Fly);