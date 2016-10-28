// r_resalt_prt.js

var r_resalt_prt = cc.Layer.extend({
  ctor: function(){
   this._super();
   var size = cc.director.getWinSize();

   var r_resalt_back_prt = new cc.Sprite(res_prt.test_rou_res_png);
   r_resalt_back_prt.setPosition(cc.p(size.width * 0.5, size.height * 0.5));
   var r_resalt_back_prt_layer = cc.Layer.create();
   r_resalt_back_prt_layer.addChild(r_resalt_back_prt);
   this.addChild(r_resalt_back_prt_layer);
  }
});

var r_resalt_prtScene = cc.Scene.extend({
  onEnter: function(){
    this._super();

    var r_resalt_prttlayer = new r_resalt_prt();
    this.addChild(r_resalt_prttlayer);
  }
});
