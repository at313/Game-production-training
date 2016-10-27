// 画面サイズ用変数
var size;

// ボール表示用変数
var ball_p;
var ball_p_layer;

// プレイヤー表示用変数
var pl_p;
var pl_dm_flg;

// エネミー表示用変数
var en_p = [];
var en_f = [];
var enslayer_p;
var en_shot_layer_p;
var en_shotinterval;

// 当たり判定用変数
var plBox_p;
var en_shotBox_p;

// 反射範囲表示用変数
var reflection_p;

// タイマーカウント用変数
var timer_p;

// 残機カウント用変数
var life_p;

// 各ラベルの表示用変数
var timelabel_p;
var lifelabel_p;
var stagelabel_p;
var roundlabel_p;

// 球の移動速度用変数
var ball_spd_x;
var ball_spd_y;

// スタート時のボール発射用フラグ
var start_ball;

// タッチしているかどうかの判定
var touching_p = false;

// フラグ変更カウント用変数
var fc01;
var fc02;

var TestScene = cc.Scene.extend({
  onEnter:function () {
    this._super();
    prt_gameLayer = new prt_game();
    prt_gameLayer.init();
    this.addChild(prt_gameLayer);
  }
});

var prt_game = cc.Layer.extend({
  init:function () {
    this._super();
    size = cc.director.getWinSize();
    // 各変数初期化 -----------------------------------------------------------------
    timer_p = 0.00;
    life_p = 2;
    ball_spd_x = 1;
    ball_spd_y = 1;
    pl_dm_flg = false;
    start_ball = false;
    en_shotinterval = false;
    en_f = [1, 1, 1, 1, 1];
    fc01 = 0;
    fc02 = 0;

    // 背景表示 ---------------------------------------------------------------------
    var back_p = new cc.Sprite(res_prt.test_back_png);
    back_p.setPosition(cc.p(size.width * 0.5, size.height * 0.5));
    var backlayer_p = cc.Layer.create();
    backlayer_p.addChild(back_p);
    this.addChild(backlayer_p);

    // 上部画像を表示 ----------------------------------------------------------------
    var up_p = new cc.Sprite(res_prt.test_up_design_png);
    up_p.setPosition(cc.p(size.width * 0.5, size.height * 0.95));
    var uplayer_p = cc.Layer.create();
    uplayer_p.addChild(up_p);
    this.addChild(uplayer_p);

    // タイマーラベル表示 -------------------------------------------------------------
    var m_p = 0;
    timelabel_p = new cc.LabelTTF("TIME - " + "0.00", "Arial", 10);
    var timelayer_p = cc.Layer.create();
    timelabel_p.setPosition(cc.p(size.width * 0.18, size.height * 0.97));
    timelayer_p.addChild(timelabel_p);
    this.addChild(timelayer_p);

    // 残機ラベル表示 ----------------------------------------------------------------
    lifelabel_p = new cc.LabelTTF("LIFE - " + life_p, "Arial", 10);
    var lifelayer_p = cc.Layer.create();
    lifelabel_p.setPosition(cc.p(size.width * 0.13, size.height * 0.92));
    lifelayer_p.addChild(lifelabel_p);
    this.addChild(lifelayer_p);

    // ステージラベル表示 -------------------------------------------------------------
    stagelabel_p = new cc.LabelTTF("STAGE - PRT", "Arial", 10);
    var stagelayer_p = cc.Layer.create();
    stagelabel_p.setPosition(cc.p(size.width * 0.8, size.height * 0.97));
    stagelayer_p.addChild(stagelabel_p);
    this.addChild(stagelayer_p);

    // ラウンドラベル表示 --------------------------------------------------------------
    roundlabel_p = new cc.LabelTTF("ROUND - 1/1", "Arial", 10);
    var roundlayer_p = cc.Layer.create();
    roundlabel_p.setPosition(cc.p(size.width * 0.79, size.height * 0.92));
    roundlayer_p.addChild(roundlabel_p);
    this.addChild(roundlayer_p);

    // ボール表示 -------------------------------------------------------------------

    ball_p_layer = cc.Layer.create();
    this.addChild(ball_p_layer);
    this.scheduleUpdate();

    // プレイヤー表示 ----------------------------------------------------------------
    pl_p = new cc.Sprite(res_prt.test_pl_png);
    pl_p.setPosition(cc.p(size.width * 0.5, size.height * 0.045));
    reflection_p = new cc.Sprite(res_prt.test_reflection_png);
    reflection_p.setPosition(12, -5);
    pl_p.addChild(reflection_p);
    var pllayer_p = cc.Layer.create();
    pllayer_p.addChild(pl_p);
    this.addChild(pllayer_p);

    // エネミー表示(5体) ------------------------------------------------------------
    enslayer_p = cc.Layer.create();
    for(var i = 0; i < 5; i++){
      en_p[i] = new Enemy_p();
      enslayer_p.addChild(en_p[i]);
    }
    en_p[0].setPosition(cc.p(size.width * 0.6, size.height * 0.3));
    en_p[1].setPosition(cc.p(size.width * 0.4, size.height * 0.42));
    en_p[2].setPosition(cc.p(size.width * 0.2, size.height * 0.54));
    en_p[3].setPosition(cc.p(size.width * 0.8, size.height * 0.66));
    en_p[4].setPosition(cc.p(size.width * 0.3, size.height * 0.78));

    this.addChild(enslayer_p);

    // エネミー移動 -----------------------------------------------------------------
    // エネミー１
    var move0_1 = cc.JumpTo.create(2,cc.p(en_p[0].getPositionX() + 50,en_p[0].getPositionY()),0, 1);
    var move0_2 = cc.JumpTo.create(2,cc.p(en_p[0].getPositionX() - 20,en_p[0].getPositionY()),0, 1);
    var seq0 = cc.sequence(move0_1, move0_2);
    var rep0 = cc.repeatForever(seq0);
    en_p[0].runAction(rep0);
    // エネミー2
    var move1_1 = cc.MoveTo.create(3.3, cc.p(en_p[1].getPositionX() + 90, en_p[1].getPositionY()));
    var move1_2 = cc.MoveTo.create(3.3, cc.p(en_p[1].getPositionX() - 50, en_p[1].getPositionY()));
    var seq1 = cc.sequence(move1_1, move1_2);
    var rep1 = cc.repeatForever(seq1);
    en_p[1].runAction(rep1);
    // エネミー3
    var move2_1 = cc.MoveTo.create(2.5, cc.p(en_p[2].getPositionX() + 40, en_p[2].getPositionY()));
    var move2_2 = cc.MoveTo.create(2.5, cc.p(en_p[2].getPositionX() - 20, en_p[2].getPositionY()));
    var seq2 = cc.sequence(move2_1, move2_2);
    var rep2 = cc.repeatForever(seq2);
    en_p[2].runAction(rep2);
    // エネミー4
    var move3_1 = cc.MoveTo.create(3.7, cc.p(en_p[3].getPositionX() - 100, en_p[3].getPositionY()));
    var move3_2 = cc.MoveTo.create(3.7, cc.p(en_p[3].getPositionX() + 10, en_p[3].getPositionY()));
    var seq3 = cc.sequence(move3_1, move3_2);
    var rep3 = cc.repeatForever(seq3);
    en_p[3].runAction(rep3);
    // エネミー5
    var move4_1 = cc.MoveTo.create(2.9, cc.p(en_p[4].getPositionX() + 100, en_p[4].getPositionY()));
    var move4_2 = cc.MoveTo.create(2.9, cc.p(en_p[4].getPositionX() - 10, en_p[4].getPositionY()));
    var seq4 = cc.sequence(move4_1, move4_2);
    var rep4 = cc.repeatForever(seq4);
    en_p[4].runAction(rep4);
    // エネミーショットレイヤー
    en_shot_layer_p = cc.Layer.create();
    this.addChild(en_shot_layer_p);

    // タッチイベントのリスナー追加
    cc.eventManager.addListener(touchListener, this);
  },
  update: function(dt){
    timer_p += 0.01;
    timelabel_p.setString("TIME - " + timer_p.toFixed(2));
    plBox_p = pl_p.getBoundingBox();
    if (en_shotinterval == true) {
      fc01++;
      if (fc01 == 100) {
        this.en_shotinterval_chenge();
        fc01 = 0;
      }
    }
  },
  // 敵削除用の関数
  remove_en: function(num){
    enslayer_p.removeChild(en_p[num]);
    en_p.splice( num, 1 ) ;
  },
  // エネミーショットフラグ回復
  en_shotinterval_chenge: function(){
    en_shotinterval = false;
  },
  en_remove_bullet: function(d_sprit){
    en_shot_layer_p.removeChild(d_sprit);
  }
});

// ボールスプライト -------------------------------------------------------------------------------------------
var Ball_p = cc.Sprite.extend({
  ctor: function(){
    this._super();
    this.initWithFile(res_prt.test_bullet_png);
  },
  onEnter: function(){
    this._super();
    this.setPosition(cc.p(pl_p.getPositionX(), pl_p.getPositionY()));
    this.scheduleUpdate();
  },
  aaa: function(param){
      console.log(param)
    },
  update: function(dt){
    // 球の移動処理
    if(this.getPositionX() > size.width -2.5 && ball_spd_x > 0) ball_spd_x *= -1;
    if(this.getPositionX() < 2.5 && ball_spd_x < 0) ball_spd_x *= -1;
    if(this.getPositionY() > size.height - 46.5 && ball_spd_y > 0 ) ball_spd_y *= -1;
    if(this.getPositionY() < 2.5 && ball_spd_y < 0 ){
    ball_spd_y *= -1;
      if(life_p > 0){
        life_p--;
        lifelabel_p.setString("LIFE - " + life_p);
        ball_p_layer.removeChild(ball_p);
        start_ball = false;
      }
    }
    this.setPosition(cc.p(this.getPositionX() + ball_spd_x, this.getPositionY() + ball_spd_y));

    // エネミーとの当たり判定
    for (var i = 0; i < en_p.length; i++) {
      var horizontal = en_p[i].getPositionX() - this.getPositionX();
      var vertical = en_p[i].getPositionY() - this.getPositionY();
      //console.log(horizontal + " : " + vertical );
      if ((horizontal * horizontal) + (vertical * vertical) <= (15 * 15)) {
        //console.log("hit");
        if(ball_spd_y < 0){
          if(en_p[i].getPositionX() < this.getPositionX() && ball_spd_x < 0)
            ball_spd_x *= -1;
          else if(en_p[i].getPositionX() > this.getPositionX() && ball_spd_x > 0)
            ball_spd_x *= -1;
          ball_spd_y *= -1;
          prt_gameLayer.remove_en(i);
        }
      }
    }
  }
});

// エネミースプライト -------------------------------------------------------------------------------------------------
var Enemy_p = cc.Sprite.extend({
  ctor: function(){
    this._super();
    this.initWithFile(res_prt.test_en_png);
  },
  onEnter: function(){
    this._super();
    this.scheduleUpdate();
  },
  update: function(){
    if(en_shotinterval == false){
      if(Math.abs(Math.floor(this.getPositionX()) - Math.floor(pl_p.getPositionX()) < 1)) {
       var shot_p = new Enemy_bullet(this.getPositionX(), this.getPositionY());
       en_shot_layer_p.addChild(shot_p);
        en_shotinterval = true;
      }
    }
  }
});

// エネミーショットスプライト --------------------------------------------------------------------------------------------
var Enemy_bullet = cc.Sprite.extend({
  ctor: function(paramX,paramY){
    this._super();
    this.initWithFile(res_prt.test_bullet_png);
    this.setPosition(cc.p(paramX, paramY));
    this.runAction(cc.MoveTo.create(2,cc.p(this.getPositionX(), -10)));
  },
  onEnter: function(){
    this._super();
    this.scheduleUpdate();
  },
  update: function(){
    en_shotBox_p = this.getBoundingBox();
    if(cc.rectIntersectsRect(plBox_p, en_shotBox_p) && pl_dm_flg == false){
      pl_p.runAction(cc.Blink.create(2,10));
      pl_dm_flg = true;
    }
    if (this.getPositionY() < -5) {
      prt_gameLayer.en_remove_bullet(this);
    }
    if (pl_dm_flg == true) {
      fc02++;
      if (fc02 == 200) {
        pl_dm_flg = false;
        fc02 = 0;
      }
    }
  }
});


// タッチイベント -----------------------------------------------------------------------------------------------------
var touchListener = cc.EventListener.create({
  event: cc.EventListener.TOUCH_ONE_BY_ONE,
  swallowTouches: true,
  onTouchBegan: function(touch, event){
    if (cc.rectContainsPoint(plBox_p, touch.getLocation())) {
      touching_p = true;
    }
    return true; },
  onTouchMoved: function(touch, event){
    if(touching_p && pl_dm_flg == false){
      pl_p.setPosition(cc.p(touch.getLocationX(), pl_p.getPositionY()));
    }
  },
  onTouchEnded: function(touch, event){
    if (start_ball == true){
      // プレイヤーのボール反射判定
      if(touching_p){
        var horizontal = (pl_p.getPositionX()) - ball_p.getPositionX();
        var vertical = (pl_p.getPositionY() - 12) - ball_p.getPositionY();
        //console.log(horizontal + " : " + vertical );
        if ((horizontal * horizontal) + (vertical * vertical) <= (38 * 38)) {
          console.log("hit");
          if(ball_spd_y < 0){
            if(pl_p.getPositionX() < ball_p.getPositionX() && ball_spd_x < 0)
              ball_spd_x *= -1;
              else if(pl_p.getPositionX() > ball_p.getPositionX() && ball_spd_x > 0)
                ball_spd_x *= -1;
              ball_spd_y *= -1;
              if (Math.abs(ball_spd_x) < 3.5 && Math.abs(ball_spd_y) < 3.5) {
                if(ball_spd_x < 0) ball_spd_x -= 0.3;
                else ball_spd_x += 0.3;
                if(ball_spd_y < 0) ball_spd_y -= 0.3;
                else ball_spd_y += 0.3;
              }
            }
          }
          touching_p = false;
        }
      }
    if(start_ball == false){
      start_ball = true;
      console.log(start_ball);
      ball_p = new Ball_p();
      ball_p_layer.addChild(ball_p);
    }
  }
});
