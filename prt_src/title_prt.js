// r_resalt_prt.js

var title_prt = cc.Layer.extend({
  ctor: function(){
   this._super();
   var size = cc.director.getWinSize();

   var title_back = new cc.Sprite(res_prt.test_title_png);
   title_back.setPosition(cc.p(size.width * 0.5, size.height * 0.5));
   var title_back_layer = cc.Layer.create();
   title_back_layer.addChild(title_back);
   this.addChild(title_back_layer);

  }
});

var title_prtScene = cc.Scene.extend({
  onEnter: function(){
    this._super();

    var title_prttlayer = new title_prt();
    this.addChild(title_prttlayer);
  }
});
