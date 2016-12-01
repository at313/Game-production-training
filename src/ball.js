var Ball_Layer = cc.Layer.extend({
  dm_sprite: null,
  ctor: function(){
    this._super();
    ball_sprite = new cc.Sprite.create(res.ball_png);
    ball_sprite.setPosition(cc.p(player_sprite.getPositionX(), player_sprite.getPositionY()));
    this.addChild(ball_sprite);

    this.scheduleUpdate();
  },
  update: function(dt){
    if(ball_sprite.getPositionX() > size.width -2.5 && ball_spd_x > 0){
      audio_engin.playEffect(res.se_ball_kabe);
      ball_spd_x *= -1;
    }
    if(ball_sprite.getPositionX() < 2.5 && ball_spd_x < 0) {
      audio_engin.playEffect(res.se_ball_kabe);
      ball_spd_x *= -1;
    }
    if(ball_sprite.getPositionY() > size.height - 46.5 && ball_spd_y > 0 ){
      audio_engin.playEffect(res.se_ball_kabe);
      ball_spd_y *= -1;
    }
    if(ball_sprite.getPositionY() < 2.5 && ball_spd_y < 0 ){
      dm_life++;
      if (life == 0) {
        audio_engin.playEffect(res.se_life_dm);
        game_clear = false;
        resalt_timer = timer;
        resalt_life = life;
        resalt_pl_dm = pl_dm_count;
        resalt_life_dm = dm_life;
        cc.director.runScene(cc.TransitionFade.create(1, new R_resalt_Scene()));
      }else if(life > 0 && game_clear == false){
        audio_engin.playEffect(res.se_life_dm);
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
