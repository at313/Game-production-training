var Stage1_2Scene = cc.Scene.extend({
  onEnter:function () {
        this._super();
        stage1_2gamelayer = new stage1_2game();
        stage1_2gamelayer.init();
        this.addChild(stage1_2gamelayer);
    }
});

var stage1_2game = cc.Layer.extend({
  init: function(){
    this._super();
    round_flg = 12;
    touch_count = 0;
    ball_type = 0;
    ball_spd_x = 1;
    ball_spd_y = 1;
    timer = 0.00;
    life = 2;
    pl_touching = false;
    start_ball = false;
    doubl_tap = false;
    double_count = 0;
    enemy = [];
    pl_atk = false;
    misail = false;
    pl_dm_flg = false;
    pl_dm_count = 0;
    enemy_death = 0;
    dm_life = 0
    game_clear = false;

    // 上部画像を表示 ----------------------------------------------------------------
    var up_design = new cc.Sprite(res.up_design_png);
    up_design.setPosition(cc.p(size.width * 0.5, size.height * 0.95));
    var up_layer = cc.Layer.create();
    up_layer.addChild(up_design);
    this.addChild(up_layer, 10);

    // タイマーラベル表示
    timelabel = new cc.LabelTTF("TIME - " + "0.00", "Arial", 10);
    var timelayer = cc.Layer.create();
    timelabel.setPosition(cc.p(size.width * 0.18, size.height * 0.97));
    timelayer.addChild(timelabel);
    this.addChild(timelayer, 10);

    // 残機ラベル表示
    lifelabel = new cc.LabelTTF("LIFE - " + life, "Arial", 10);
    var lifelayer = cc.Layer.create();
    lifelabel.setPosition(cc.p(size.width * 0.13, size.height * 0.92));
    lifelayer.addChild(lifelabel);
    this.addChild(lifelayer, 10);

    // ステージラベル表示
    var stagelabel = new cc.LabelTTF("STAGE - 1", "Arial", 10);
    var stagelayer = cc.Layer.create();
    stagelabel.setPosition(cc.p(size.width * 0.8, size.height * 0.97));
    stagelayer.addChild(stagelabel);
    this.addChild(stagelayer, 10);

    // ラウンドラベル表示
    var roundlabel = new cc.LabelTTF("ROUND - 2/2", "Arial", 10);
    var roundlayer = cc.Layer.create();
    roundlabel.setPosition(cc.p(size.width * 0.79, size.height * 0.92));
    roundlayer.addChild(roundlabel);
    this.addChild(roundlayer, 10);

    // プレイヤー表示
    var player_layer = new Player_Layer();
    this.addChild(player_layer, 2);

    // 背景画像表示
    var back_ground = new background();
    this.addChild(back_ground);

    // エネミー表示
    enemys_layer = cc.Layer.create();
    enemy[0] = new Enemy(size.width * 0.2, size.height * 0.3,  40, -20, 2.5, 2.5);
    enemys_layer.addChild(enemy[0]);
    enemy[1] = new Enemy(size.width * 0.8, size.height * 0.52, -50, 10, 3.7, 3.7);
    enemys_layer.addChild(enemy[1]);
    enemy[2] = new Enemy(size.width - 30, size.height * 0.78, -160, 0, 2.9, 2.9);
    enemys_layer.addChild(enemy[2]);

    this.addChild(enemys_layer, 2);

    // アイテムレイヤー
    item_layer = cc.Layer.create();
    this.addChild(item_layer, 1);

    // ボールレイヤー
    ball_layer = cc.Layer.create();
    this.addChild(ball_layer, 1);

    // ミサイルレイヤー
    misairu_layer = cc.Layer.create();
    this.addChild(misairu_layer, 1);

    // エネミーショットレイヤー
    enemy_shot_layer = cc.Layer.create();
    this.addChild(enemy_shot_layer, 1);

    this.schedule(this.addItem, 15);
    this.scheduleUpdate();
  },
  update: function(dt){
    if (enemy_death < enemy.length) {
      timer += 0.01;
      timelabel.setString("TIME - " + timer.toFixed(2));
    }
    if (enemy_death >= enemy.length) {
      game_clear = true;
      resalt_timer = timer;
      resalt_life = life;
      resalt_pl_dm = pl_dm_count;
      resalt_life_dm = dm_life;
      this.scheduleOnce(this.scene_chenge, 0.5);
    }
  },
  addItem: function(){
    var item = new Item();
    item_layer.addChild(item);
  },
  scene_chenge: function(){
    cc.director.runScene(cc.TransitionFade.create(1, new R_resalt_Scene()));
  }
});
