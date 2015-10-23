var boot = function(game){

	this.preload = function(){
		//加载进度条图片资源
		game.load.image('loading', 'assets/preloader.gif');
		game.load.json('angel_run', 'assets/angel/angel_run.json');
	}
	this.create = function(){
		//加载完成后，调用preload场景
		game.state.start('loader');
	}

};

var loader = function(game){

	this.preload = function(){
		var angel_run = game.cache.getJSON('angel_run');
		var preloadSprite = game.add.sprite(50,game.height/2,'loading');
	    game.load.setPreloadSprite(preloadSprite);
	    // 加载资源
	    game.load.atlasJSONHash('runUp', 'assets/angel/angel.png', null, angel_run.up);
	    game.load.atlasJSONHash('runDown', 'assets/angel/angel.png', null, angel_run.down);
	    game.load.atlasJSONHash('runLeft', 'assets/angel/angel.png', null, angel_run.left);
	    game.load.atlasJSONHash('runRight', 'assets/angel/angel.png', null, angel_run.right);
	}

	this.create = function(){
		game.state.start('play');
	}

};

var play = function(game){
	this.create = function(){
		var runDonw = game.add.sprite(0, 0, 'runDown');
		runDonw.animations.add('down');
        runDonw.animations.play('down', 4, true);
        var runUp = game.add.sprite(48, 0, 'runUp');
        runUp.animations.add('up');
        runUp.animations.play('up', 4, true);
        var runLeft = game.add.sprite(96, 0, 'runLeft');
        runLeft.animations.add('left');
        runLeft.animations.play('left', 4, true);
        var runRight = game.add.sprite(144, 0, 'runRight');
        runRight.animations.add('right');
        runRight.animations.play('right', 4, true);
	}
};