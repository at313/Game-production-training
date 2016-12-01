var S1_resalt_Scene = cc.Scene.extend({
  onEnter: function(){
    this._super();
     size = cc.director.getWinSize();
    var s1_resalt_layer = new S1_resalt();
    this.addChild(s1_resalt_layer);
  }
});

var s1_chenge_flg = false;

var S1_resalt = cc.Layer.extend({
  r1_resalt_label: null,
  r2_resalt_label: null,
  s_resalt_label: null,
  ctor: function(){
    this._super();

    var s1_back = cc.Sprite.create(res.s_res_back2_png);
    s1_back.setPosition(cc.p(size.width * 0.5, size.height * 0.5));
    this.addChild(s1_back);

    this.r1_resalt_label = cc.LabelTTF.create("-", "Arial", 30);
    this.r1_resalt_label.setPosition(cc.p(size.width * 0.6, size.height * 0.705));
    this.r1_resalt_label.setOpacity(0);
    this.addChild(this.r1_resalt_label);

    this.r2_resalt_label = cc.LabelTTF.create("-", "Arial", 30);
    this.r2_resalt_label.setPosition(cc.p(size.width * 0.6, size.height * 0.597));
    this.r2_resalt_label.setOpacity(0);
    this.addChild(this.r2_resalt_label);

    this.s_resalt_label = cc.LabelTTF.create("-", "Arial", 60);
    this.s_resalt_label.setPosition(cc.p(size.width * 0.8, size.height * 0.27));
    this.s_resalt_label.setOpacity(0);
    this.addChild(this.s_resalt_label);

    switch (stage1_r1_rank) {
      case 5:
      this.r1_resalt_label.setString("S");
      this.r1_resalt_label.setColor(cc.color(255, 255, 0, 255));
        break;
      case 4:
      this.r1_resalt_label.setString("A");
      this.r1_resalt_label.setColor(cc.color(255, 0, 0, 255));
        break;
      case 3:
      this.r1_resalt_label.setString("B");
      this.r1_resalt_label.setColor(cc.color(229, 69, 0, 255));
        break;
      case 2:
      this.r1_resalt_label.setString("C");
      this.r1_resalt_label.setColor(cc.color(82, 162, 197, 255));
        break;
      case 1:
      this.r1_resalt_label.setString("D");
      this.r1_resalt_label.setColor(cc.color(31, 30, 71, 255));
        break;
    }

    switch (stage1_r2_rank) {
      case 5:
      this.r2_resalt_label.setString("S");
      this.r2_resalt_label.setColor(cc.color(255, 255, 0, 255));
        break;
      case 4:
      this.r2_resalt_label.setString("A");
      this.r2_resalt_label.setColor(cc.color(255, 0, 0, 255));
        break;
      case 3:
      this.r2_resalt_label.setString("B");
      this.r2_resalt_label.setColor(cc.color(229, 69, 0, 255));
        break;
      case 2:
      this.r2_resalt_label.setString("C");
      this.r2_resalt_label.setColor(cc.color(82, 162, 197, 255));
        break;
      case 1:
      this.r2_resalt_label.setString("D");
      this.r2_resalt_label.setColor(cc.color(31, 30, 71, 255));
        break;
    }

    var stage_rank_num = Math.floor((stage1_r1_rank + stage1_r2_rank) / 2);

    switch (stage_rank_num) {
      case 5:
      this.s_resalt_label.setString("S");
      this.s_resalt_label.setColor(cc.color(255, 255, 0, 255));
      stage2_on = true;
        break;
      case 4:
      this.s_resalt_label.setString("A");
      this.s_resalt_label.setColor(cc.color(255, 0, 0, 255));
      stage2_on = true;
        break;
      case 3:
      this.s_resalt_label.setString("B");
      this.s_resalt_label.setColor(cc.color(229, 69, 0, 255));
      stage2_on = true;
        break;
      case 2:
      this.s_resalt_label.setString("C");
      this.s_resalt_label.setColor(cc.color(82, 162, 197, 255));
      stage2_on = true;
        break;
    }
    if (stage1_r1_rank == 1 || stage1_r2_rank == 1) {
      this.s_resalt_label.setString("D");
      this.s_resalt_label.setColor(cc.color(31, 30, 71, 255));
      stage_rank_num = 1;
    }

    if (stage1_rank != null) {
      if (stage1_rank < stage_rank_num) {
        stage1_rank = stage_rank_num;
      }
    }else {
      stage1_rank = stage_rank_num;
    }
    cc.eventManager.addListener(touchListener_s1_resalt, this);
    this.scheduleOnce(this.r1_label_on, 1.5);
  },
  r1_label_on:function(){
    var fade = cc.FadeIn.create(0.1);
    this.r1_resalt_label.runAction(fade);
    audio_engin.playEffect(res.se_res1);
    this.scheduleOnce(this.r2_label_on, 0.5);
  },
  r2_label_on: function(){
    var fade = cc.FadeIn.create(0.1);
    this.r2_resalt_label.runAction(fade);
    audio_engin.playEffect(res.se_res1);
    this.scheduleOnce(this.s_label_on, 0.8);
  },
  s_label_on: function(){
    var fade = cc.FadeIn.create(0.3);
    this.s_resalt_label.runAction(fade);
    audio_engin.playEffect(res.se_res2);
    this.scheduleOnce(this.flagchenger, 0.1);
  },
  flagchenger: function(){
    s1_chenge_flg = true;
  }
});

var touchListener_s1_resalt = cc.EventListener.create({
  event: cc.EventListener.TOUCH_ONE_BY_ONE,
  swallowTouches: true,
  onTouchBegan: function(touch, event){
    return true;
   },
  onTouchMoved: function(touch, event){
  },
  onTouchEnded: function(touch, event){
    if (s1_chenge_flg == true) {
      audio_engin.stopMusic();
      cc.director.runScene(cc.TransitionFade.create(1, new select_Scene()));
    }
  }
});
