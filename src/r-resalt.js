var R_resalt_Scene = cc.Scene.extend({
  onEnter: function(){
    this._super();
    var r_resalt_layer = new R_resalt();
    this.addChild(r_resalt_layer);
  }
});

var r_chenge_flg = false;

var R_resalt = cc.Layer.extend({
  resalt_life_label: null,
  resalt_timer_label: null,
  resalt_pl_dm_label: null,
  resalt_rank_label: null,
  ctor: function(){
    this._super();

    var r_resalt_back = new cc.Sprite(res.r_res_back_png);
    r_resalt_back.setPosition(cc.p(size.width * 0.5, size.height * 0.5));
    this.addChild(r_resalt_back);

    this.resalt_life_label = cc.LabelTTF.create("" + resalt_life, "Arial", 15);
    this.resalt_life_label.setPosition(cc.p(size.width * 0.5, size.height * 0.698));
    this.resalt_life_label.setOpacity(0);
    this.addChild(this.resalt_life_label);

    this.resalt_timer_label = cc.LabelTTF.create("" + resalt_timer.toFixed(2), "Arial", 15);
    this.resalt_timer_label.setPosition(cc.p(size.width * 0.63, size.height * 0.59));
    this.resalt_timer_label.setOpacity(0);
    this.addChild(this.resalt_timer_label);

    this.resalt_pl_dm_label = cc.LabelTTF.create("" + resalt_pl_dm, "Arial", 15);
    this.resalt_pl_dm_label.setPosition(cc.p(size.width * 0.8, size.height * 0.48));
    this.resalt_pl_dm_label.setOpacity(0);
    this.addChild(this.resalt_pl_dm_label);

    this.resalt_rank_label = cc.LabelTTF.create("", "Arial", 32);
    this.resalt_rank_label.setPosition(cc.p(size.width * 0.75, size.height * 0.25));
    this.resalt_rank_label.setOpacity(0);
    this.addChild(this.resalt_rank_label);

    if (game_clear == true) {
      if (resalt_life_dm < 3) {
        if (resalt_pl_dm < 5) {
          if (resalt_timer.toFixed(2) < 45.00) {
            this.resalt_rank_label.setString("S");
            this.resalt_rank_label.setColor(cc.color(255, 255, 0, 255));
            resalt_rank = 5;
          }else if (resalt_timer.toFixed(2) < 60.00) {
            this.resalt_rank_label.setString("A");
            this.resalt_rank_label.setColor(cc.color(255, 0, 0, 255));
            resalt_rank = 4;
          }else if (resalt_timer.toFixed(2) < 90.00) {
            this.resalt_rank_label.setString("B");
            this.resalt_rank_label.setColor(cc.color(229, 69, 0, 255));
            resalt_rank = 3;
          }else {
            this.resalt_rank_label.setString("C");
            this.resalt_rank_label.setColor(cc.color(25, 135, 22, 255));
            resalt_rank = 2;
          }
        }else if (resalt_pl_dm < 7) {
          if (resalt_timer.toFixed(2) < 60.00) {
            this.resalt_rank_label.setString("A");
            this.resalt_rank_label.setColor(cc.color(255, 0, 0, 255));
            resalt_rank = 4;
          }else if (resalt_timer.toFixed(2) < 90.00) {
            this.resalt_rank_label.setString("B");
            this.resalt_rank_label.setColor(cc.color(229, 69, 0, 255));
            resalt_rank = 3;
          }else {
            this.resalt_rank_label.setString("C");
            this.resalt_rank_label.setColor(cc.color(25, 135, 22, 255));
            resalt_rank = 2;
          }
        }else {
          this.resalt_rank_label.setString("C");
          this.resalt_rank_label.setColor(cc.color(82, 162, 197, 255));
          resalt_rank = 2;
        }
      }else if(resalt_life_dm < 4){
        if (resalt_pl_dm < 7) {
          if (resalt_timer.toFixed(2) < 60.00) {
            this.resalt_rank_label.setString("A");
            this.resalt_rank_label.setColor(cc.color(255, 0, 0, 255));
            resalt_rank = 4;
          }else if (resalt_timer.toFixed(2) < 90.00) {
            this.resalt_rank_label.setString("B");
            this.resalt_rank_label.setColor(cc.color(229, 69, 0, 255));
            resalt_rank = 3;
          }else {
            this.resalt_rank_label.setString("C");
            this.resalt_rank_label.setColor(cc.color(82, 162, 197, 255));
            resalt_rank = 2;
          }
        }
      }else if(resalt_life_dm < 6){
        if (resalt_pl_dm < 7) {
          if (resalt_timer.toFixed(2) < 90.00) {
            this.resalt_rank_label.setString("B");
            this.resalt_rank_label.setColor(cc.color(229, 69, 0, 255));
            resalt_rank = 3;
          }else {
            this.resalt_rank_label.setString("C");
            this.resalt_rank_label.setColor(cc.color(82, 162, 197, 255));
            resalt_rank = 2;
          }
        }
      }else {
        this.resalt_rank_label.setString("C");
        this.resalt_rank_label.setColor(cc.color(82, 162, 197, 255));
        resalt_rank = 2;
      }
    }
    if (game_clear == false) {
      this.resalt_rank_label.setString("D");
      this.resalt_rank_label.setColor(cc.color(31, 30, 71, 255));
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
      case 23:
        stage2_r3_rank = resalt_rank;
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

    this.scheduleOnce(this.life_label_on, 1.5);

    cc.eventManager.addListener({
          event: cc.EventListener.TOUCH_ONE_BY_ONE,
          swallowTouches: true,
          onTouchBegan: this.onTouchBegan,
          onTouchMoved: this.onTouchMoved,
          onTouchEnded: this.onTouchEnded
      }, this);
  },
  life_label_on: function(){
    var fade = cc.FadeIn.create(0.1);
    this.resalt_life_label.runAction(fade);
    this.scheduleOnce(this.timer_label_on, 0.5);
  },
  timer_label_on:function(){
    var fade = cc.FadeIn.create(0.1);
    this.resalt_timer_label.runAction(fade);
    this.scheduleOnce(this.dm_label_on, 0.5);
  },
  dm_label_on: function(){
    var fade = cc.FadeIn.create(0.1);
    this.resalt_pl_dm_label.runAction(fade);
    this.scheduleOnce(this.rank_label_on, 0.8);
  },
  rank_label_on: function(){
    var fade = cc.FadeIn.create(0.3);
    this.resalt_rank_label.runAction(fade);
    this.scheduleOnce(this.flagchenger, 0.1);
  },
  flagchenger: function(){
    r_chenge_flg = true;
  },
  onTouchBegan: function(touch, event){
    return true;
   },
  onTouchMoved: function(touch, event){
  },
  onTouchEnded: function(touch, event){
    if (r_chenge_flg == true) {
      switch (round_flg) {
        case 11:
          if (game_clear == false) {
            cc.director.runScene(cc.TransitionFade.create(1, new S1_resalt_Scene()));
          }else {
            round_flg = 12;
            cc.director.runScene(cc.TransitionFade.create(1, new Chenge_Scene()));
          }
          break;
        case 12:
          cc.director.runScene(cc.TransitionFade.create(1, new S1_resalt_Scene()));
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
  }
});

var touchListener_r_resalt = cc.EventListener.create({
  event: cc.EventListener.TOUCH_ONE_BY_ONE,
  swallowTouches: true,

});
