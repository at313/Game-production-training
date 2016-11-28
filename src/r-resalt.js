var R_resalt_Scene = cc.Scene.extend({
  onEnter: function(){
    this._super();
    var r_resalt_layer = new R_resalt();
    this.addChild(r_resalt_layer);
  }
});

var R_resalt = cc.Layer.extend({
  ctor: function(){
    this._super();

    var size = cc.director.getWinSize();

    resalt_life = 1;
    resalt_timer = 38.55;
    resalt_pl_dm = 3;
    resalt_life_dm = 5;
    game_clear = true;

    var r_resalt_back = new cc.Sprite(res.r_res_back_png);
    r_resalt_back.setPosition(cc.p(size.width * 0.5, size.height * 0.5));
    this.addChild(r_resalt_back);

    var resalt_life_label = cc.LabelTTF.create("" + resalt_life, "Arial", 15);
    resalt_life_label.setPosition(cc.p(size.width * 0.5, size.height * 0.698));
    this.addChild(resalt_life_label);

    var resalt_timer_label = cc.LabelTTF.create("" + resalt_timer, "Arial", 15);
    resalt_timer_label.setPosition(cc.p(size.width * 0.63, size.height * 0.59));
    this.addChild(resalt_timer_label);

    var resalt_pl_dm_label = cc.LabelTTF.create("" + resalt_pl_dm, "Arial", 15);
    resalt_pl_dm_label.setPosition(cc.p(size.width * 0.8, size.height * 0.48));
    this.addChild(resalt_pl_dm_label);

    var resalt_rank_label = cc.LabelTTF.create("", "Arial", 32);
    resalt_rank_label.setPosition(cc.p(size.width * 0.75, size.height * 0.25));
    this.addChild(resalt_rank_label);

    if (game_clear == true) {
      if (resalt_life_dm < 3) {
        if (resalt_pl_dm < 5) {
          if (resalt_timer < 45.00) {
            resalt_rank_label.setString("S");
            resalt_rank_label.setColor(255, 255, 0);
          }
        }
      }else if(resalt_life_dm < 4){
        if (resalt_pl_dm < 7) {
          if (resalt_timer < 60.00) {
            resalt_rank_label.setString("A");
            resalt_rank_label.setColor(255, 0, 0);
          }
        }
      }else if(resalt_life_dm < 6){
        if (resalt_pl_dm < 7) {
          if (resalt_timer < 90.00) {
            resalt_rank_label.setString("B");
            resalt_rank_label.setColor(229, 69, 0);
          }
        }
      }else {
        resalt_rank_label.setString("C");
        resalt_rank_label.setColor(25, 135, 22);
      }
    }
    if (game_clear == false) {
      resalt_rank_label.setString("D");
      resalt_rank_label.setColor(31, 30, 71);
    }
  }
});
