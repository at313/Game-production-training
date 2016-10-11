// resalt_prt.js

var resalt_prt = cc.Layer.extend({
  ctor: function(){
   this._super();
   var size = cc.director.getWinSize();

   var resalt_back = new cc.Sprite(res_prt.test_back_png);
   resalt_back.setPosition(cc.p(size.width * 0.5, size.height * 0.5));
   var resalt_back_layer = cc.Layer.create();
   resalt_back_layer.addChild(resalt_back);
   this.addChild(resalt_back_layer);
  }
});

var resalt_prtScene = cc.Scene.extend({
  onEnter: function(){
    this._super();

    var resalt_prttlayer = new resalt_prt();
    this.addChild(resalt_prttlayer);
  }
});
