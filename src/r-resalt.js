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

    var r_resalt_back = new cc.Sprite(res.r_res_back_png);
    r_resalt_back.setPosition(cc.p(size.width * 0.5, size.height * 0.5));
    this.addChild(r_resalt_back);

    var resalt_life_label = cc.LabelTTF.create("" + resalt_life, "Arial", 15);
    resalt_life_label.setPosition(cc.p(size.width * 0.5, size.height * 0.698));
    this.addChild(resalt_life_label);

    var resalt_timer_label = cc.LabelTTF.create("" + resalt_timer.toFixed(2), "Arial", 15);
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
          if (resalt_timer.toFixed(2) < 45.00) {
            resalt_rank_label.setString("S");
            resalt_rank_label.setColor(cc.color(255, 255, 0, 255));
            resalt_rank = 5;
          }else if (resalt_timer.toFixed(2) < 60.00) {
            resalt_rank_label.setString("A");
            resalt_rank_label.setColor(cc.color(255, 0, 0, 255));
            resalt_rank = 4;
          }else if (resalt_timer.toFixed(2) < 90.00) {
            resalt_rank_label.setString("B");
            resalt_rank_label.setColor(cc.color(229, 69, 0, 255));
            resalt_rank = 3;
          }else {
            resalt_rank_label.setString("C");
            resalt_rank_label.setColor(cc.color(25, 135, 22, 255));
            resalt_rank = 2;
          }
        }else if (resalt_pl_dm < 7) {
          if (resalt_timer.toFixed(2) < 60.00) {
            resalt_rank_label.setString("A");
            resalt_rank_label.setColor(cc.color(255, 0, 0, 255));
            resalt_rank = 4;
          }else if (resalt_timer.toFixed(2) < 90.00) {
            resalt_rank_label.setString("B");
            resalt_rank_label.setColor(cc.color(229, 69, 0, 255));
            resalt_rank = 3;
          }else {
            resalt_rank_label.setString("C");
            resalt_rank_label.setColor(cc.color(25, 135, 22, 255));
            resalt_rank = 2;
          }
        }else {
          resalt_rank_label.setString("C");
          resalt_rank_label.setColor(cc.color(82, 162, 197, 255));
          resalt_rank = 2;
        }
      }else if(resalt_life_dm < 4){
        if (resalt_pl_dm < 7) {
          if (resalt_timer.toFixed(2) < 60.00) {
            resalt_rank_label.setString("A");
            resalt_rank_label.setColor(cc.color(255, 0, 0, 255));
            resalt_rank = 4;
          }else if (resalt_timer.toFixed(2) < 90.00) {
            resalt_rank_label.setString("B");
            resalt_rank_label.setColor(cc.color(229, 69, 0, 255));
            resalt_rank = 3;
          }else {
            resalt_rank_label.setString("C");
            resalt_rank_label.setColor(cc.color(82, 162, 197, 255));
            resalt_rank = 2;
          }
        }
      }else if(resalt_life_dm < 6){
        if (resalt_pl_dm < 7) {
          if (resalt_timer.toFixed(2) < 90.00) {
            resalt_rank_label.setString("B");
            resalt_rank_label.setColor(cc.color(229, 69, 0, 255));
            resalt_rank = 3;
          }else {
            resalt_rank_label.setString("C");
            resalt_rank_label.setColor(cc.color(82, 162, 197, 255));
            resalt_rank = 2;
          }
        }
      }else {
        resalt_rank_label.setString("C");
        resalt_rank_label.setColor(cc.color(82, 162, 197, 255));
        resalt_rank = 2;
      }
    }
    if (game_clear == false) {
      resalt_rank_label.setString("D");
      resalt_rank_label.setColor(cc.color(31, 30, 71, 255));
      resalt_rank = 1;
    }

    switch (round_flg) {
      case 11:
        stage1_r1_rank = resalt_rank;
        break;
      case 12:
        stage1_r2_rank = resalt_rank;
        break;
      case 21:
        stage2_r1_rank = resalt_rank;
        break;
      case 22:
        stage2_r2_rank = resalt_rank;
        break;
      case 31:
        stage3_r1_rank = resalt_rank;
        break;
      case 32:
        stage3_r2_rank = resalt_rank;
        break;
      case 33:
        stage3_r3_rank = resalt_rank;
        break;
      default:
    }

    cc.eventManager.addListener(touchListener_r_resalt, this);
  }
});

var touchListener_r_resalt = cc.EventListener.create({
  event: cc.EventListener.TOUCH_ONE_BY_ONE,
  swallowTouches: true,
  onTouchBegan: function(touch, event){
    console.log(round_flg);
    return true;
   },
  onTouchMoved: function(touch, event){
  },
  onTouchEnded: function(touch, event){
    switch (round_flg) {
      case 11:
        cc.director.runScene(new Stage1_2Scene());
        break;
      case 12:
        cc.director.runScene(new S1_resalt_Scene());
        break;
      case 21:
        //cc.director.runScene();
        break;
      case 22:
        //cc.director.runScene();
        break;
      case 23:
        //cc.director.runScene();
        break;
      case 31:
        //cc.director.runScene();
        break;
      case 32:
        //cc.director.runScene();
        break;
      case 33:
        //cc.director.runScene();
        break;
      default:
    }
  }
});
