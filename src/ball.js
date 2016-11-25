var Ball_Layer = cc.Layer.extend({
  ctor: function(){
    this._super();
    ball_sprite = new cc.Sprite.create(res.ball_png);
    ball_sprite.setPosition(cc.p(player_sprite.getPositionX(), player_sprite.getPositionY()));
    this.addChild(ball_sprite);

    this.scheduleUpdate();
  },
  update: function(dt){
    if(ball_sprite.getPositionX() > size.width -2.5 && ball_spd_x > 0) ball_spd_x *= -1;
    if(ball_sprite.getPositionX() < 2.5 && ball_spd_x < 0) ball_spd_x *= -1;
    if(ball_sprite.getPositionY() > size.height - 46.5 && ball_spd_y > 0 ) ball_spd_y *= -1;
    if(ball_sprite.getPositionY() < 2.5 && ball_spd_y < 0 ){
    ball_spd_y *= -1;
      if(life > 0){
        life--;
        lifelabel.setString("LIFE - " + life);
        ball_layer.removeChild(this);
        start_ball = false;
        ball_type = 0;
        ball_spd_x = 1;
        ball_spd_y = 1;
      }
    }
    ball_sprite.setPosition(cc.p(ball_sprite.getPositionX() + ball_spd_x, ball_sprite.getPositionY() + ball_spd_y));
  }
});
