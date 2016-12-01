var sozai_Scene = cc.Scene.extend({
  onEnter: function(){
    this._super();
    var sozai_layer = new Sozai_Layer();
    this.addChild(sozai_layer);
  }
});

var mae_sprite2;

var Sozai_Layer = cc.Layer.extend({
  sozai_sprite: null,
  mae_Box: null,
  mae_flg: false,
  ctor: function(){
    this._super();
    this.sozai_sprite = new cc.Sprite.create(res.sozai_png);
    this.sozai_sprite.setPosition(cc.p(size.width * 0.5, size.height * 0.5));
    this.addChild(this.sozai_sprite);

    mae_sprite2 = new cc.Sprite.create(res.mae_button);
    mae_sprite2.setPosition(cc.p(size.width * 0.15, size.height * 0.95));
    this.addChild(mae_sprite2);

    cc.eventManager.addListener({
          event: cc.EventListener.TOUCH_ONE_BY_ONE,
          swallowTouches: true,
          onTouchBegan: this.onTouchBegan,
          onTouchMoved: this.onTouchMoved,
          onTouchEnded: this.onTouchEnded
      }, this);
  },
  onTouchBegan: function(touch, event){
    this.mae_Box = mae_sprite2.getBoundingBox();
    if (cc.rectContainsPoint(this.mae_Box, touch.getLocation())){
      mae_sprite2.setOpacity(120);
      this.mae_flg = true;
    }
    return true;
  },
  onTouchMoved: function(touch, event){

  },
  onTouchEnded: function(touch, event){
    if (this.mae_flg == true) {
      audio_engin.playEffect(res.se_button);
      cc.director.runScene(cc.TransitionFade.create(1, new select_Scene()));
    }
    mae_sprite2.setOpacity(255);
  }
});
