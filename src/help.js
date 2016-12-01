var help_Scene = cc.Scene.extend({
  onEnter: function(){
    this._super();
    var help_layer = new Help_Layer();
    this.addChild(help_layer);
  }
});

var tugi_sprite;
var mae_sprite;
var help_Array = [res.help_01_png, res.help_02_pmg, res.help_03_png, res.help_04_png,
             res.help_05_png, res.help_06_png, res.help_07_png, res.help_08_png];
var help_sprite;

var pg_count;

var Help_Layer = cc.Layer.extend({
  sprite1: null,
  sprite2: null,
  sp1_Box: null,
  sp2_Box: null,
  sp1_flg: false,
  sp2_flg: false,
  ctor: function(){
    this._super();
    size = cc.director.getWinSize();
    pg_count = 0;
    help_sprite = new cc.Sprite.create(help_Array[pg_count]);
    help_sprite.setPosition(cc.p(size.width * 0.5, size.height * 0.5));
    this.addChild(help_sprite);
    tugi_sprite = new cc.Sprite(res.tugi_button);
    tugi_sprite.setPosition(cc.p(size.width * 0.85, size.height * 0.95));
    this.addChild(tugi_sprite);
    mae_sprite = new cc.Sprite(res.mae_button);
    mae_sprite.setPosition(cc.p(size.width * 0.15, size.height * 0.95));
    this.addChild(mae_sprite);

    cc.eventManager.addListener({
          event: cc.EventListener.TOUCH_ONE_BY_ONE,
          swallowTouches: true,
          onTouchBegan: this.onTouchBegan,
          onTouchMoved: this.onTouchMoved,
          onTouchEnded: this.onTouchEnded
      }, this);
  },
  onTouchBegan: function(touch, event){
    this.sp1_Box = tugi_sprite.getBoundingBox();
    this.sp2_Box = mae_sprite.getBoundingBox();
    if (cc.rectContainsPoint(this.sp1_Box, touch.getLocation())){
      tugi_sprite.setOpacity(120);
      this.sp1_flg = true;
    }
    if (cc.rectContainsPoint(this.sp2_Box, touch.getLocation())){
      mae_sprite.setOpacity(120);
      this.sp2_flg = true;
    }
    return true;
  },
  onTouchMoved: function(touch, event){

  },
  onTouchEnded: function(touch, event){
    if (this.sp1_flg == true) {
      audio_engin.playEffect(res.se_button);
      if (pg_count == 7) {
        cc.director.runScene(cc.TransitionFade.create(1, new select_Scene()));
      }else {
        pg_count++;
        help_sprite.setTexture(help_Array[pg_count]);
      }
    }
    if (this.sp2_flg == true) {
      audio_engin.playEffect(res.se_button);
      if (pg_count == 0) {
        cc.director.runScene(cc.TransitionFade.create(1, new select_Scene()));
      }else {
        pg_count--;
        help_sprite.setTexture(help_Array[pg_count]);
      }
    }
    tugi_sprite.setOpacity(255);
    mae_sprite.setOpacity(255);
  }
});
