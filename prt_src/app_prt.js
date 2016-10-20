// 画面サイズ用変数
var size;

// 弾表示用変数
var ball_p;

// プレイヤー表示用変数
var pl_p;

// 当たり判定用変数
var plBox_p;
var ballBox_p;
var reflectionBox_p;

// 反射範囲表示用変数
var reflection_p;

// タイマーカウント用変数
var timer_p = 0;

// 残機カウント用変数
var life_p = 2;

// 球の移動速度用変数
var ball_spd_x = 1;
var ball_spd_y = 1;

// タッチしているかどうかの判定
var touching_p = false;

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
    var timelabel_p = new cc.LabelTTF("TIME - " + "00" + ":" + "00", "Arial", 10);
    var timelayer_p = cc.Layer.create();
    timelabel_p.setPosition(cc.p(size.width * 0.18, size.height * 0.97));
    timelayer_p.addChild(timelabel_p);
    this.addChild(timelayer_p);

    // 残機ラベル表示 ----------------------------------------------------------------
    var lifelabel_p = new cc.LabelTTF("LIFE - " + life_p, "Arial", 10);
    var lifelayer_p = cc.Layer.create();
    lifelabel_p.setPosition(cc.p(size.width * 0.13, size.height * 0.92));
    lifelayer_p.addChild(lifelabel_p);
    this.addChild(lifelayer_p);

    // ステージラベル表示 -------------------------------------------------------------
    var stagelabel_p = new cc.LabelTTF("STAGE - PRT", "Arial", 10);
    var stagelayer_p = cc.Layer.create();
    stagelabel_p.setPosition(cc.p(size.width * 0.8, size.height * 0.97));
    stagelayer_p.addChild(stagelabel_p);
    this.addChild(stagelayer_p);

    // ラウンドラベル表示 --------------------------------------------------------------
    var roundlabel_p = new cc.LabelTTF("ROUND - 1/1", "Arial", 10);
    var roundlayer_p = cc.Layer.create();
    roundlabel_p.setPosition(cc.p(size.width * 0.79, size.height * 0.92));
    roundlayer_p.addChild(roundlabel_p);
    this.addChild(roundlayer_p);

    // ボール表示 -------------------------------------------------------------------
    ball_p = new cc.Sprite(res_prt.test_bullet_png);
    ball_p.setPosition(cc.p(size.width * 0.5, size.height * 0.5));
    this.addChild(ball_p);
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

    // タッチイベントのリスナー追加
    cc.eventManager.addListener(touchListener, this);

  },
  update: function(dt){
    // 球の移動処理 -----------------------------------------------------------------
    if(ball_p.getPositionX() > size.width -2.5 && ball_spd_x > 0) ball_spd_x *= -1;
    if(ball_p.getPositionX() < 2.5 && ball_spd_x < 0) ball_spd_x *= -1;
    if(ball_p.getPositionY() > size.height - 46.5 && ball_spd_y > 0 ) ball_spd_y *= -1;
    if(ball_p.getPositionY() < 2.5 && ball_spd_y < 0 ) ball_spd_y *= -1;
    ball_p.setPosition(cc.p(ball_p.getPositionX() + ball_spd_x, ball_p.getPositionY() + ball_spd_y));

    // プレイヤー当たり判定
    plBox_p = pl_p.getBoundingBox();
  }

});

var touchListener = cc.EventListener.create({
  event: cc.EventListener.TOUCH_ONE_BY_ONE,
  swallowTouches: true,
  onTouchBegan: function(touch, event){
    if (cc.rectContainsPoint(plBox_p, touch.getLocation())) {
      touching_p = true;
    }
    return true; },
  onTouchMoved: function(touch, event){
    if(touching_p){
      pl_p.setPosition(cc.p(touch.getLocationX(), pl_p.getPositionY()));
    }
  },
  onTouchEnded: function(touch, event){
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
});
