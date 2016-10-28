// title_prt.js

var title_prt = cc.Layer.extend({
  ctor: function(){
   this._super();
   var size = cc.director.getWinSize();

   var title_back = new cc.Sprite(res_prt.test_title_png);
   title_back.setPosition(cc.p(size.width * 0.5, size.height * 0.5));
   var title_back_layer = cc.Layer.create();
   title_back_layer.addChild(title_back);
   this.addChild(title_back_layer);

   startlabel_p = new cc.LabelTTF("Click on START", "Arial", 10);
   var startlayer_p = cc.Layer.create();
   startlabel_p.setPosition(cc.p(size.width * 0.5, size.height * 0.2));
   startlayer_p.addChild(startlabel_p);
   this.addChild(startlayer_p);
   startlabel_p.runAction(cc.repeatForever(cc.Blink.create(1,1)));

   cc.eventManager.addListener(touchListener2, this);
 }
});

var touchListener2 = cc.EventListener.create({
  event: cc.EventListener.TOUCH_ONE_BY_ONE,
  swallowTouches: true,
  onTouchBegan: function(touch, event){
    return true;
   },
  onTouchMoved: function(touch, event){
  },
  onTouchEnded: function(touch, event){
    cc.director.runScene(new select_prtScene());
  }
});


var title_prtScene = cc.Scene.extend({
  onEnter: function(){
    this._super();

    var title_prttlayer = new title_prt();
    this.addChild(title_prttlayer);
  }
});
