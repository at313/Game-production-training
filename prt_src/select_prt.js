// title_prt.js

var selectbutton_p;
var select_prtBox;
var start_flg = false;

var select_prt = cc.Layer.extend({
  ctor: function(){
   this._super();
   var size = cc.director.getWinSize();

   var select_prt_back = new cc.Sprite(res_prt.test_select_png);
   select_prt_back.setPosition(cc.p(size.width * 0.5, size.height * 0.5));
   var select_prt_back_layer = cc.Layer.create();
   select_prt_back_layer.addChild(select_prt_back);
   this.addChild(select_prt_back_layer);

   selectbutton_p = new cc.Sprite(res_prt.test_button_png);
   var selectlayer_p = cc.Layer.create();
   selectbutton_p.setPosition(cc.p(size.width * 0.5, size.height * 0.7));
   selectlayer_p.addChild(selectbutton_p);
   this.addChild(selectlayer_p);

   cc.eventManager.addListener(touchListener3, this);
 }
});

var touchListener3 = cc.EventListener.create({
  event: cc.EventListener.TOUCH_ONE_BY_ONE,
  swallowTouches: true,
  onTouchBegan: function(touch, event){
    select_prtBox = selectbutton_p.getBoundingBox();
    if (cc.rectContainsPoint(select_prtBox, touch.getLocation())){
      selectbutton_p.setOpacity(120);
      start_flg = true;
    }else {
      start_flg = false;
    }
    return true;
   },
  onTouchMoved: function(touch, event){
  },
  onTouchEnded: function(touch, event){
    selectbutton_p.setOpacity(255);
    cc.director.runScene(new TestScene());
  }
});


var select_prtScene = cc.Scene.extend({
  onEnter: function(){
    this._super();

    var select_prttlayer = new select_prt();
    this.addChild(select_prttlayer);
  }
});
