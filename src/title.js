// title.js

var title = cc.Layer.extend({
  ctor: function(){
   this._super();
   size = cc.director.getWinSize();
   audio_engin = cc.audioEngine;

   audio_engin.playMusic(res.bgm_title2, true);
   audio_engin.setMusicVolume(0.5);

   var title_back = new cc.Sprite(res.title_png);
   title_back.setPosition(cc.p(size.width * 0.5, size.height * 0.5));
   var title_back_layer = cc.Layer.create();
   title_back_layer.addChild(title_back);
   this.addChild(title_back_layer);

   var  startlabel = new cc.LabelTTF("Click on START", "Arial", 10);
   var startlayer = cc.Layer.create();
   startlabel.setPosition(cc.p(size.width * 0.5, size.height * 0.2));
   startlayer.addChild(startlabel);
   this.addChild(startlayer);
   startlabel.runAction(cc.repeatForever(cc.Blink.create(1,1)));

   cc.eventManager.addListener(touchListener_title, this);
 }
});

var touchListener_title = cc.EventListener.create({
  event: cc.EventListener.TOUCH_ONE_BY_ONE,
  swallowTouches: true,
  onTouchBegan: function(touch, event){
    return true;
   },
  onTouchMoved: function(touch, event){
  },
  onTouchEnded: function(touch, event){
    audio_engin.stopMusic();
    cc.director.runScene(cc.TransitionFade.create(1, new select_Scene()));
  }
});


var titleScene = cc.Scene.extend({
  onEnter: function(){
    this._super();

    var titletlayer = new title();
    this.addChild(titletlayer);
  }
});
