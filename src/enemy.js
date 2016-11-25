var Enemy = cc.Sprite.extend({
  def_x: null,
  def_y: null,
  move_x1: null,
  move_x2: null,
  move_count1: null,
  move_count2: null,
  en_Box: null,
  ball_Box: null,
  ctor: function(_def_x, _def_y, _move_x1, _move_x2, _move_count1, _move_count2){
    this._super();
    this.initWithFile(res.enemy_png);
    this.def_x = _def_x;
    this.def_y = _def_y;
    this.move_x1 = _move_x1;
    this.move_x2 = _move_x2;
    this.move_count1 = _move_count1;
    this.move_count2 = _move_count2;
    this.setPosition(cc.p(this.def_x, this.def_y));
  },
  onEnter: function(){
    this._super();
    this.scheduleUpdate();
    var move1 = cc.MoveTo.create(this.move_count1 ,cc.p(this.getPositionX() + this.move_x1, this.getPositionY()));
    var move2 = cc.MoveTo.create(this.move_count2 ,cc.p(this.getPositionX() + this.move_x2, this.getPositionY()));
    var seq = cc.sequence(move1, move2);
    var rep = cc.repeatForever(seq);
    this.runAction(rep);
  },
  update: function(){
    if (start_ball == true) {
      this.ball_Box = ball_sprite.getBoundingBox();
      this.en_Box = this.getBoundingBox();
      if (cc.rectIntersectsRect(this.ball_Box, this.en_Box) && ball_type == 0) {
          if(this.getPositionX() < ball_sprite.getPositionX() && ball_spd_x < 0)
            ball_spd_x *= -1;
            else if(this.getPositionX() > ball_sprite.getPositionX() && ball_spd_x > 0)
            ball_spd_x *= -1;
            ball_spd_y *= -1;
            if (Math.abs(ball_spd_x) < 3.5 && Math.abs(ball_spd_y) < 3.5) {
              if(ball_spd_x < 0) ball_spd_x -= 0.3;
              else ball_spd_x += 0.3;
              if(ball_spd_y < 0) ball_spd_y -= 0.3;
              else ball_spd_y += 0.3;
            }
            enemys_layer.removeChild(this);
        }
        if (cc.rectIntersectsRect(this.ball_Box, this.en_Box) && ball_type == 1) {
          enemys_layer.removeChild(this);
        }
      }
    }
});
