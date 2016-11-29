var Enemy = cc.Sprite.extend({
  en_hp: null,
  def_x: null,
  def_y: null,
  move_x1: null,
  move_x2: null,
  move_count1: null,
  move_count2: null,
  en_Box: null,
  ball_Box: null,
  misail_Box: null,
  shot_interval: null,
  interval_count: null,
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
    this.shot_interval = false;
    this.interval_count = 0;
    this.en_hp = 2;
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
      // ボールとの当たり判定
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
            enemy_death++;
        }
        if (cc.rectIntersectsRect(this.ball_Box, this.en_Box) && ball_type == 1) {
          enemys_layer.removeChild(this);
          enemy_death++;
        }
      }
      if (misail == true) {
        // ミサイルとの当たり判定
        this.misail_Box = pl_misail.getBoundingBox();
        this.en_Box = this.getBoundingBox();
        if (cc.rectIntersectsRect(this.misail_Box, this.en_Box)) {
          enemys_layer.removeChild(this);
          misairu_layer.removeChild(pl_misail);
          misail = false;
          enemy_death++;
        }
      }
      if (this.shot_interval == false) {
        // 攻撃発射処理
        if (Math.abs(Math.floor(this.getPositionX()) - Math.floor(player_sprite.getPositionX()) < 1)) {
          var en_shot = new Enemy_bullet(this.getPositionX(), this.getPositionY());
          enemy_shot_layer.addChild(en_shot);
          this.shot_interval = true;
        }
      }
      // 攻撃間隔設定
      if (this.shot_interval == true) {
        this.interval_count++;
        if (this.interval_count == 100) {
          this.shot_interval = false;
          this.interval_count = 0;
        }
      }
    }
});

var Enemy_Ace = cc.Sprite.extend({
  ctor: function(){
    this._super();

  },
  onEnter: function(){
    this._super();

    this.scheduleUpdate();
  },
  update: function(dt){

  }
});

var Enemy_Boss = cc.Sprite.extend({
  ctor: function(){
    this._super();

  },
  onEnter: function(){
    this._super();

    this.scheduleUpdate();
  },
  update: function(dt){

  }
});

// エネミーの攻撃スプライト
var Enemy_bullet = cc.Sprite.extend({
  en_shot_Box: null,
  pl_Box: null,
  ctor: function(en_x, en_y){
    this._super();
    this.initWithFile(res.en_shot_png);
    this.setPosition(cc.p(en_x, en_y));
    this.runAction(cc.MoveTo.create(2,cc.p(this.getPositionX(), -10)));
  },
  onEnter: function(){
    this._super();
    this.scheduleUpdate();
  },
  update: function(dt){
    this.en_shot_Box = this.getBoundingBox();
    this.pl_Box = player_sprite.getBoundingBox();
    // プレイヤーとの当たり判定
    if (cc.rectIntersectsRect(this.pl_Box, this.en_shot_Box) && pl_dm_flg == false) {
      player_sprite.runAction(cc.Blink.create(1, 5));
      pl_dm_flg = true;
      pl_dm_count++;
    }
    if (this.getPositionY() < -5) {
      enemy_shot_layer.removeChild(this);
    }
  }
});
