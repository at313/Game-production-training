var Player_Layer = cc.Layer.extend({
  pl_Box: null,
  damege_count: null,
  ctor: function(){
    this._super();
    player_sprite = new cc.Sprite.create(res.player_png);
    player_sprite.setPosition(cc.p(size.width * 0.5, size.height * 0.045));

    reflection_sprite = new cc.Sprite.create(res.reflection_png);
    reflection_sprite.setPosition(12, -5);
    player_sprite.addChild(reflection_sprite);

    this.damege_count = 0;

    this.addChild(player_sprite);

    cc.eventManager.addListener({
          event: cc.EventListener.TOUCH_ONE_BY_ONE,
          swallowTouches: true,
          onTouchBegan: this.onTouchBegan,
          onTouchMoved: this.onTouchMoved,
          onTouchEnded: this.onTouchEnded
      }, this);

      this.scheduleUpdate();
    },
    update: function(dt){
      if (doubl_tap == true) {
        double_count++;
        if (double_count == 50) {
          this.tap_count_reset();
        }
      }
      if (pl_dm_flg == true) {
        this.damege_count++;
        if (this.damege_count == 100) {
          pl_dm_flg = false;
          this.damege_count = 0;
        }
      }
    },
    onTouchBegan: function(touch, event){
      this.pl_Box = player_sprite.getBoundingBox();
      if (cc.rectContainsPoint(this.pl_Box, touch.getLocation())) {
      pl_touching = true;
    }
      return true;
    },
    onTouchMoved: function(touch, event){
      if(pl_touching == true && pl_dm_flg == false){
      player_sprite.setPosition(cc.p(touch.getLocationX(), player_sprite.getPositionY()));
    }
    },
    onTouchEnded: function(touch, event){
      if(pl_touching == true){
        // ダブルタップ判定及びミサイル発射処理
        if (touch_count < 2) {
          touch_count++;
          doubl_tap = true;
          if (touch_count == 2) {
            doubl_tap = false;
            touch_count = 0;
            double_count = 0;
            if (pl_atk == true) {
              pl_misail = new Misail();
              misairu_layer.addChild(pl_misail);
              pl_atk = false;
            }
          }
        }
        // ボール反射処理
        if(start_ball == true){
        var horizontal = (player_sprite.getPositionX()) - ball_sprite.getPositionX();
        var vertical = (player_sprite.getPositionY() - 12) - ball_sprite.getPositionY();
        if ((horizontal * horizontal) + (vertical * vertical) <= (38 * 38)) {
          if(ball_spd_y < 0){
            if(player_sprite.getPositionX() < ball_sprite.getPositionX() && ball_spd_x < 0)
              ball_spd_x *= -1;
              else if(player_sprite.getPositionX() > ball_sprite.getPositionX() && ball_spd_x > 0)
                ball_spd_x *= -1;
              ball_spd_y *= -1;
              if (Math.abs(ball_spd_x) < 3.5 && Math.abs(ball_spd_y) < 3.5) {
                if(ball_spd_x < 0) ball_spd_x -= 0.5;
                else ball_spd_x += 0.5;
                if(ball_spd_y < 0) ball_spd_y -= 0.5;
                else ball_spd_y += 0.5;
              }
            }
          }
        }
        // ボール発射処理
        if (start_ball == false) {
          start_ball = true;
          ball = new Ball_Layer();
          ball_layer.addChild(ball, 2);
        }
        pl_touching = false;
      }
    },
    tap_count_reset: function(){
      touch_count = 0;
      doubl_tap = false;
      double_count = 0;
    }
});

// ミサイル用スプライト
var Misail = cc.Sprite.extend({
  ctor: function(){
    this._super();
    this.initWithFile(res.pl_atk_png);
  },
  onEnter: function(){
    this._super();
    misail = true;
    this.setPosition(cc.p(player_sprite.getPositionX(), player_sprite.getPositionY()));
    var moveAction = cc.MoveTo.create(2, new cc.p(this.getPositionX(), 400));
    this.runAction(moveAction);

    this.scheduleUpdate();
  },
  update: function(dt) {
    if(this.getPositionY > 390){
      misail = false;
      misairu_layer.removeChild(this);
    }
  }
});
