var S1_resalt_Scene = cc.Scene.extend({
  onEnter: function(){
    this._super();
    var s1_resalt_layer = new S1_resalt();
    this.addChild(s1_resalt_layer);
  }
});

var S1_resalt = cc.Layer.extend({
  ctor: function(){
    this._super();
    size = cc.director.getWinSize();

    var s1_back = cc.Sprite.create(res.s_res_back2_png);
    s1_back.setPosition(cc.p(size.width * 0.5, size.height * 0.5));
    this.addChild(s1_back);

    var r1_resalt_label = cc.LabelTTF.create("-", "Arial", 30);
    r1_resalt_label.setPosition(cc.p(size.width * 0.6, size.height * 0.705));
    this.addChild(r1_resalt_label);

    var r2_resalt_label = cc.LabelTTF.create("-", "Arial", 30);
    r2_resalt_label.setPosition(cc.p(size.width * 0.6, size.height * 0.597));
    this.addChild(r2_resalt_label);

    var s_resalt_label = cc.LabelTTF.create("-", "Arial", 60);
    s_resalt_label.setPosition(cc.p(size.width * 0.8, size.height * 0.27));
    this.addChild(s_resalt_label);

    switch (stage1_r1_rank) {
      case 5:
      r1_resalt_label.setString("S");
      r1_resalt_label.setColor(cc.color(255, 255, 0, 255));
        break;
      case 4:
      r1_resalt_label.setString("A");
      r1_resalt_label.setColor(cc.color(255, 0, 0, 255));
        break;
      case 3:
      r1_resalt_label.setString("B");
      r1_resalt_label.setColor(cc.color(229, 69, 0, 255));
        break;
      case 2:
      r1_resalt_label.setString("C");
      r1_resalt_label.setColor(cc.color(25, 135, 22, 255));
        break;
      case 1:
      r1_resalt_label.setString("D");
      r1_resalt_label.setColor(cc.color(31, 30, 71, 255));
        break;
    }

    switch (stage1_r2_rank) {
      case 5:
      r2_resalt_label.setString("S");
      r2_resalt_label.setColor(cc.color(255, 255, 0, 255));
        break;
      case 4:
      r2_resalt_label.setString("A");
      r2_resalt_label.setColor(cc.color(255, 0, 0, 255));
        break;
      case 3:
      r2_resalt_label.setString("B");
      r2_resalt_label.setColor(cc.color(229, 69, 0, 255));
        break;
      case 2:
      r2_resalt_label.setString("C");
      r2_resalt_label.setColor(cc.color(25, 135, 22, 255));
        break;
      case 1:
      r2_resalt_label.setString("D");
      r2_resalt_label.setColor(cc.color(31, 30, 71, 255));
        break;
    }

    var stage_rank_num = Math.floor((stage1_r1_rank + stage1_r2_rank) / 2);

    switch (stage_rank_num) {
      case 5:
      s_resalt_label.setString("S");
      s_resalt_label.setColor(cc.color(255, 255, 0, 255));
        break;
      case 4:
      s_resalt_label.setString("A");
      s_resalt_label.setColor(cc.color(255, 0, 0, 255));
        break;
      case 3:
      s_resalt_label.setString("B");
      s_resalt_label.setColor(cc.color(229, 69, 0, 255));
        break;
      case 2:
      s_resalt_label.setString("C");
      s_resalt_label.setColor(cc.color(25, 135, 22, 255));
        break;
    }
    if (stage1_r1_rank == 1 || stage1_r2_rank == 1) {
      s_resalt_label.setString("D");
      s_resalt_label.setColor(cc.color(31, 30, 71, 255));
    }

    cc.eventManager.addListener(touchListener_s1_resalt, this);
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
    cc.director.runScene(new titleScene());
  }
});
