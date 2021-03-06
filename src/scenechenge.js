var Chenge_Scene = cc.Scene.extend({
  onEnter: function(){
    this._super();
    var scenechenge_layer = new Scene_cehnge();
    this.addChild(scenechenge_layer);
  }
});

var Scene_cehnge = cc.Layer.extend({
  label1: null,
  label2: null,

  ctor: function(){
    this._super();

    var chenge_back = new cc.Sprite(res.chenge_back_png);
    chenge_back.setPosition(cc.p(size.width * 0.5, size.height * 0.5));
    this.addChild(chenge_back);

    this.label1 = cc.LabelTTF.create("", "Arial", 15);
    this.label1.setPosition(cc.p(size.width * 0.5, size.height * 0.55));
    this.addChild(this.label1);

    this.label2 = cc.LabelTTF.create("", "Arial", 15);
    this.label2.setPosition(cc.p(size.width * 0.5, size.height * 0.45));
    this.addChild(this.label2);

    switch (round_flg) {
      case 11:
        audio_engin.stopMusic();
        audio_engin.playMusic(res.bgm_nomal1, true);
        this.label1.setString("STAGE 1");
        this.label2.setString("ROUND 1");
        break;
      case 12:
        this.label1.setString("STAGE 1");
        this.label2.setString("ROUND 2");
        break;
      case 21:
        audio_engin.stopMusic();
        audio_engin.playMusic(res.bgm_nomal1, true);
        this.label1.setString("STAGE 2");
        this.label2.setString("ROUND 1");
        break;
      case 22:
        this.label1.setString("STAGE 2");
        this.label2.setString("ROUND 2");
        break;
      case 23:
        audio_engin.stopMusic();
        audio_engin.playMusic(res.bgm_ace, true);
        this.label1.setString("STAGE 2");
        this.label2.setString("ROUND 3");
        break;
      case 31:
        audio_engin.stopMusic();
        audio_engin.playMusic(res.bgm_nomal2, true);
        this.label1.setString("STAGE 3");
        this.label2.setString("ROUND 1");
        break;
      case 32:
        this.label1.setString("STAGE 3");
        this.label2.setString("ROUND 2");
        break;
      case 33:
        audio_engin.stopMusic();
        audio_engin.playMusic(res.bgm_boss, true);
        this.label1.setString("STAGE 3");
        this.label2.setString("ROUND 3");
        break;
      default:
    }

    this.scheduleOnce(this.scene_chenge, 3);

  },
  scene_chenge: function(){
    switch (round_flg) {
      case 11:
        cc.director.runScene(new Stage1_1Scene());
        break;
      case 12:
        cc.director.runScene(new Stage1_2Scene());
        break;
      case 21:
        cc.director.runScene(new Stage2_1Scene());
        break;
      case 22:
        cc.director.runScene(new Stage2_2Scene());
        break;
      case 23:
        cc.director.runScene(new Stage2_3Scene());
        break;
      case 31:
        cc.director.runScene(new Stage3_1Scene());
        break;
      case 32:
        cc.director.runScene(new Stage3_2Scene());
        break;
      case 33:
        cc.director.runScene(new Stage3_3Scene());
        break;
      default:
    }
  }
});
