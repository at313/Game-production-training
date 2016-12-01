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
    this.interval_count = 0;
    this.en_hp = 2;
    var rnd = Math.floor( Math.random() * 2 ) + 1;
    if (rnd == 1) {
      this.shot_interval = false;
    }else this.shot_interval = true;
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
            this.remove_en();
            enemy_death++;
        }
        if (cc.rectIntersectsRect(this.ball_Box, this.en_Box) && ball_type == 1) {
          this.remove_en();
          enemy_death++;
        }
      }
      if (misail == true) {
        // ミサイルとの当たり判定
        this.misail_Box = pl_misail.getBoundingBox();
        this.en_Box = this.getBoundingBox();
        if (cc.rectIntersectsRect(this.misail_Box, this.en_Box)) {
          audio_engin.playEffect(res.se_en_ban);
          this.remove_en();
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
        if (this.interval_count == 120) {
          this.shot_interval = false;
          this.interval_count = 0;
        }
      }
    },
    remove_en: function(){
      audio_engin.playEffect(res.se_en_ban);
      var exp = new cc.ParticleSystem(res.exp_plist);
      exp.setPosition(cc.p(this.getPositionX(), this.getPositionY()));
      enemys_layer.addChild(exp, 5);
      exp.setAutoRemoveOnFinish(true);
      enemys_layer.removeChild(this);
    }
});

var Enemy_Ace = cc.Sprite.extend({
  en_hp: 3,
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
    this.initWithFile(res.enemy_ace_png);
    this.def_x = _def_x;
    this.def_y = _def_y;
    this.move_x1 = _move_x1;
    this.move_x2 = _move_x2;
    this.move_count1 = _move_count1;
    this.move_count2 = _move_count2;
    this.setPosition(cc.p(this.def_x, this.def_y));
    this.interval_count = 0;
    var rnd = Math.floor( Math.random() * 2 ) + 1;
    if (rnd == 1) {
      this.shot_interval = false;
    }else this.shot_interval = true;
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
            audio_engin.playEffect(res.se_dm);
            this.en_hp--;
            this.runAction(cc.Blink.create(0.5, 2));
        }
        if (cc.rectIntersectsRect(this.ball_Box, this.en_Box) && ball_type == 1) {
          audio_engin.playEffect(res.se_dm);
          this.en_hp--;
          this.runAction(cc.Blink.create(0.5, 2));
        }
      }
      if (misail == true) {
        // ミサイルとの当たり判定
        this.misail_Box = pl_misail.getBoundingBox();
        this.en_Box = this.getBoundingBox();
        if (cc.rectIntersectsRect(this.misail_Box, this.en_Box)) {
          this.en_hp--;
          audio_engin.playEffect(res.se_dm);
          this.runAction(cc.Blink.create(0.5, 2));
          misairu_layer.removeChild(pl_misail);
          misail = false;
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
        if (this.interval_count == 80) {
          this.shot_interval = false;
          this.interval_count = 0;
        }
      }
      if (this.en_hp == 0) {
        this.remove_en();
      }
    },
    remove_en: function(){
      audio_engin.playEffect(res.se_en_ban);
      var exp = new cc.ParticleSystem(res.exp_plist);
      exp.setPosition(cc.p(this.getPositionX(), this.getPositionY()));
      enemys_layer.addChild(exp, 5);
      exp.setAutoRemoveOnFinish(true);
      enemys_layer.removeChild(this);
      enemy_death++;
    }
});

var Enemy_Boss = cc.Sprite.extend({
  en_hp: 15,
  def_x: null,
  def_y: null,
  en_Box: null,
  ball_Box: null,
  misail_Box: null,
  shot_interval1: false,
  interval_count1: null,
  shot_interval2: false,
  interval_count2: null,
  shot_interval3: false,
  interval_count3: null,
  ctor: function(_def_x, _def_y){
    this._super();
    this.initWithFile(res.enemy_boss_png);
    this.def_x = _def_x;
    this.def_y = _def_y;
    this.setPosition(cc.p(this.def_x, this.def_y));
    this.interval_count1 = 0;
    this.interval_count2 = 0;
    this.interval_count3 = 0;
  },
  onEnter: function(){
    this._super();
    this.scheduleUpdate();
  },
  update: function(){
    if (start_ball == true) {
      // ボールとの当たり判定
      this.ball_Box = ball_sprite.getBoundingBox();
      this.en_Box = this.getBoundingBox();
      if (cc.rectIntersectsRect(this.ball_Box, this.en_Box) && ball_type == 0) {
            ball_spd_y *= -1;
            if (Math.abs(ball_spd_x) < 3.5 && Math.abs(ball_spd_y) < 3.5) {
              if(ball_spd_x < 0) ball_spd_x -= 0.3;
              else ball_spd_x += 0.3;
              if(ball_spd_y < 0) ball_spd_y -= 0.3;
              else ball_spd_y += 0.3;
            }
            var exp = new cc.ParticleSystem(res.exp_plist);
            exp.setPosition(cc.p(ball_sprite.getPositionX(), ball_sprite.getPositionY()));
            enemys_layer.addChild(exp, 5);
            exp.setAutoRemoveOnFinish(true);
            audio_engin.playEffect(res.se_dm);
            this.en_hp--;
        }
        if (cc.rectIntersectsRect(this.ball_Box, this.en_Box) && ball_type == 1) {
          ball_spd_y *= -1;
          if (Math.abs(ball_spd_x) < 3.5 && Math.abs(ball_spd_y) < 3.5) {
            if(ball_spd_x < 0) ball_spd_x -= 0.3;
            else ball_spd_x += 0.3;
            if(ball_spd_y < 0) ball_spd_y -= 0.3;
            else ball_spd_y += 0.3;
          }
          var exp = new cc.ParticleSystem(res.exp_plist);
          exp.setPosition(cc.p(ball_sprite.getPositionX(), ball_sprite.getPositionY()));
          enemys_layer.addChild(exp, 5);
          exp.setAutoRemoveOnFinish(true);
          audio_engin.playEffect(res.se_dm);
          this.en_hp -= 2;
        }
      }
      if (misail == true) {
        // ミサイルとの当たり判定
        this.misail_Box = pl_misail.getBoundingBox();
        this.en_Box = this.getBoundingBox();
        if (cc.rectIntersectsRect(this.misail_Box, this.en_Box)) {
          var exp = new cc.ParticleSystem(res.exp_plist);
          exp.setPosition(cc.p(pl_misail.getPositionX(), pl_misail.getPositionY()));
          enemys_layer.addChild(exp, 5);
          exp.setAutoRemoveOnFinish(true);
          this.en_hp--;
          audio_engin.playEffect(res.se_dm);
          this.runAction(cc.Blink.create(0.5, 2));
          misairu_layer.removeChild(pl_misail);
          misail = false;
        }
      }
      if (this.shot_interval1 == false) {
        // 攻撃発射処理1
        if (player_sprite.getPositionX() < 70) {
          var en_shot1 = new Enemy_bullet_B(this.getPositionX() - 30, this.getPositionY());
          enemy_shot_layer.addChild(en_shot1);
          this.shot_interval1 = true;
        }
      }

      if (this.shot_interval2 == false) {
        // 攻撃発射処理2
        if (70 < player_sprite.getPositionX() < 140) {
          var en_shot2 = new Enemy_bullet_B(this.getPositionX(), this.getPositionY());
          enemy_shot_layer.addChild(en_shot2);
          this.shot_interval2 = true;
        }
      }

      if (this.shot_interval3 == false) {
        // 攻撃発射処理3
        if (140 < player_sprite.getPositionX()) {
          var en_shot3 = new Enemy_bullet_B(this.getPositionX() + 30, this.getPositionY());
          enemy_shot_layer.addChild(en_shot3);
          this.shot_interval3 = true;
        }
      }

      // 攻撃間隔設定
      if (this.shot_interval1 == true) {
        this.interval_count1++;
        if (this.interval_count1 == 200) {
          this.shot_interval1 = false;
          this.interval_count1 = 0;
        }
      }
      if (this.shot_interval2 == true) {
        this.interval_count2++;
        if (this.interval_count2 == 200) {
          this.shot_interval2 = false;
          this.interval_count2 = 0;
        }
      }
      if (this.shot_interval3 == true) {
        this.interval_count3++;
        if (this.interval_count3 == 200) {
          this.shot_interval3 = false;
          this.interval_count3 = 0;
        }
      }
      if (this.en_hp == 0) {
        this.remove_en();
      }
    },
    remove_en: function(){
      audio_engin.playEffect(res.se_en_ban);
      var exp = new cc.ParticleSystem(res.exp_L_plist);
      exp.setPosition(cc.p(this.getPositionX(), this.getPositionY()));
      enemys_layer.addChild(exp, 5);
      exp.setAutoRemoveOnFinish(true);
      enemys_layer.removeChild(this);
      audio_engin = cc.audioEngine;
      enemy_death++;
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
      audio_engin.playEffect(res.se_dm);
      var exp = new cc.ParticleSystem(res.exp_plist);
      exp.setPosition(cc.p(this.getPositionX(), this.getPositionY()));
      enemys_layer.addChild(exp, 5);
      exp.setAutoRemoveOnFinish(true);
      player_sprite.runAction(cc.Blink.create(1, 5));
      pl_dm_flg = true;
      pl_dm_count++;
      enemy_shot_layer.removeChild(this);
    }
    if (this.getPositionY() < -5) {
      enemy_shot_layer.removeChild(this);
    }
  }
});

var Enemy_bullet_B = cc.Sprite.extend({
  en_shot_Box: null,
  pl_Box: null,
  ctor: function(en_x, en_y){
    this._super();
    this.initWithFile(res.en_shot_png);
    this.setPosition(cc.p(en_x, en_y));
    this.runAction(cc.MoveTo.create(2,cc.p(player_sprite.getPositionX(), -10)));
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
      audio_engin.playEffect(res.se_dm);
      var exp = new cc.ParticleSystem(res.exp_plist);
      exp.setPosition(cc.p(this.getPositionX(), this.getPositionY()));
      enemys_layer.addChild(exp, 5);
      exp.setAutoRemoveOnFinish(true);
      player_sprite.runAction(cc.Blink.create(1, 5));
      pl_dm_flg = true;
      pl_dm_count++;
      enemy_shot_layer.removeChild(this);
    }
    if (this.getPositionY() < -5) {
      enemy_shot_layer.removeChild(this);
    }
  }
});
