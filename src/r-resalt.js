var R_resalt_Scene = cc.Scene.extend({
  onEnter: function(){
    this._super();
    var r_resalt_layer = new R_resalt();
    this.addChild(r_resalt_layer);
  }
});

var R_resalt = cc.Layer.extend({
  ctor: function(){
    var r_resalt_back = new cc.Sprite(res.r_res_back_png);
    r_resalt_back.setPosition(cc.p(size.width * 0.5, size.height * 0.5));
    this.addChild(r_resalt_back);

    var resalt_life_label;

    this.addChild(resalt_life_label);

    var resalt_timer_label;

    this.addChild(resalt_timer_label);

    var resalt_pl_dm_label;

    this.addChild(resalt_pl_dm_label);
  }
});
