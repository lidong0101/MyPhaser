var boot = function(game){
	
	this.preload = function(){
		game.load.image('world','assets/world.png');
	};

	this.create = function(){
		//单点触摸设定
		this.input.maxPointers = 1;
		//全屏显示
    	this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    	//水平居中
    	this.scale.pageAlignHorizontally = true;
    	//垂直居中
    	this.scale.pageAlignVertically = true;
    	//“激活”缩放
    	this.scale.setScreenSize = true;
		game.state.start('preload');
	};
};


var preload = function(game){

	var loading;

	this.preload = function(){
		// 显示加载中
		var world = game.add.sprite(game.width/2, game.height/2, 'world');
        world.anchor.set(0.5);
        loading = setInterval(function(){
	    	world.rotation += 0.03;
	    },20);
	    // 加载资源
	    game.load.spritesheet('monster', 'assets/monster-idle.png', 103, 131, 13);
	    game.load.image('background', 'assets/background.png');
	    game.load.image('floor', 'assets/floor.png');
	    game.load.spritesheet('candy', 'assets/candy.png', 82, 98);

	     // 加载进度
	    game.load.onFileComplete.add(function(progress){
	    	console.log(progress);
	    });
	};

	this.create = function(){
		// setTimeout(function(){
			clearInterval(loading);
			game.state.start('play');
		// },2000);
		
	};

};



var play = function(game){
	var _play = this;
	var _score = 0;

	this.create = function(){
		// 背景
		game.add.tileSprite(0, 0, game.width, game.height, 'background').autoScroll(-10,0);
		game.add.tileSprite(-10, game.height-160, game.width+10, 160, 'floor');
		// 怪物
		var monster = game.add.sprite(10, game.height-200, 'monster');
		monster.animations.add('stand');
        monster.animations.play('stand', 12, true);
        // 糖果
        setInterval(function(){
        	_play.createCandy();
        },2000);
	}

	this.update = function(){
		
	}

	this.createCandy = function(){
		var _dropPos = Math.floor(Math.random()*game.width);
    	var _dropOffset = [0, 30, 60, 90, 120];
    	var _candyType = Math.floor(Math.random()*5);
    	var _candy = game.add.sprite(_dropPos, _dropOffset[_candyType], 'candy', _candyType);
    	game.physics.enable(_candy, Phaser.Physics.ARCADE);
    	_candy.body.gravity.y = (_candyType+1)*100 + (_score*100);
    	_candy.anchor.setTo(0.5, 0.5);
    	_candy.rotateMe = (Math.random()*4)-2;
    	_candy.inputEnabled = true;
    	_candy.events.onInputDown.add(this.clickCandy, this);
    	_candy.checkWorldBounds = true;
    	_candy.events.onOutOfBounds.add(this.removeCandy, this);
	}

	this.clickCandy = function(c){
		console.log(c.x+','+c.y+','+_score);
		_score++;
		c.kill();
	}

	this.removeCandy = function(c){
		console.log(c.x+','+c.y);
		c.kill();
	}
};

