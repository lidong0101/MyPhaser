var boot = function(game){

	this.preload = function(){
		//加载进度条图片资源
		game.load.image('loading','assets/preloader.gif');
	}
	this.create = function(){
		//加载完成后，调用preload场景
		game.state.start('loader');
	}

};

var loader = function(game){

	this.preload = function(){
		var preloadSprite = game.add.sprite(50,game.height/2,'loading');
	    game.load.setPreloadSprite(preloadSprite);
	    // 加载资源
	    game.load.spritesheet('runDonw','assets/angle.png',48,48,4); //
	    game.load.spritesheet('runUp','assets/angle.png',48,48,4,-144); //

	}

	this.create = function(){
		game.state.start('play');
	}

};

var play = function(game){
	this.create = function(){
		var runDonw = game.add.sprite(0, 0, 'runDonw');
		runDonw.animations.add('down');
        runDonw.animations.play('down', 6, true);
        var runUp = game.add.sprite(48, 0, 'runUp');
        runUp.animations.add('up');
        runUp.animations.play('up', 6, true);

	}
};