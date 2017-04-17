/**
 * Created by Admin on 2017/4/12.
 */
(function (Fly) {
    'use strict';

    function Game(id) {
        this.ctx  = Fly.createCv(id);
        this.t = 0;
        this.lastFrameTime = new Date();
        this.curFrameTime = 0;
        this.imgSrc = ['birds', 'land', 'sky', 'pipe1', 'pipe2'];
        this.eleLists = [];
        this.isStart = true;

        this.bird = null;
    }
    Game.prototype = {
        constructor : Game,

        startGame : function () {
            var _this = this;
            Fly.loadImages(this.imgSrc, function (imgList) {
                _this.initEles(imgList);
                _this.draw(imgList);
                _this.bindEvent();
            });
        },

        gameOver : function () {
            this.isStart = false;
        },

        initEles : function (imgList) {
            var ctx = this.ctx;
            this.bird = Fly.factory('Bird',{
                'img' : imgList.birds,
                'ctx' : ctx,
                'x' : 200,
                'y' : 100
            });

            //创建天空
            for (var i = 0; i < 2; i++) {
                var sky = Fly.factory('Sky',{
                    ctx : ctx,
                    img : imgList.sky,
                    x : i*imgList.sky.width
                });
                this.eleLists.push(sky);
            }

            //创建管道
            for (var z = 0; z < 6; z++) {
                var pipe = Fly.factory('Pipe',{
                    ctx : ctx,
                    imgPipeTop : imgList.pipe2,
                    imgPipeBottom : imgList.pipe1,
                    x : z * imgList.pipe1.width * 3 + 350
                });
                this.eleLists.push(pipe);
            }


            //创建陆地
            for (var j = 0; j < 4; j++) {
                var land = Fly.factory('Land',{
                    ctx : ctx,
                    img : imgList.land,
                    x : j*imgList.land.width
                });
                this.eleLists.push(land);
            }

            //添加小鸟碰撞订阅
            // this.bird.addListener(this.gameOver.call(this));  //wrong  这里传过去的是个函数调用后的返回值
            this.bird.addListener( this.gameOver.bind(this) );
        },

        draw : function (imgList) {

            var ctx = this.ctx;
            var _this = this;
            var cv = this.ctx.canvas;

            (function render() {

                _this.curFrameTime = +new Date();
                // t 两帧的时间差
                _this.t = _this.curFrameTime-_this.lastFrameTime;
                _this.lastFrameTime = _this.curFrameTime;

                //清空画布
                ctx.clearRect(0,0,cv.width,cv.height);
                ctx.beginPath();

                //渲染天空/陆地
                _this.eleLists.forEach(function (ele) {
                    //这里的render方法是sky实例对象的render方法
                    ele.render(_this.t);
                });

                //渲染小鸟
                _this.bird.draw(_this.t);

                //小鸟碰撞检测
                _this.bird.isDie();

                if(_this.isStart){
                    window.requestAnimationFrame(render);
                }

            })();
        },

        bindEvent : function () {
            var _this = this;
            var cv = this.ctx.canvas;
            cv.addEventListener('click',function () {
                _this.bird.jump();
            })
        }
    };

    //通过单例模式保证Game全局唯一
    var instance = null;
    Fly.createGame = function(id){
        if(instance === null){
            instance = new Game(id);
        }
        return instance;
    };


    Fly.Game = Game;
})(Fly);