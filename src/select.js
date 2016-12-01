var stage1_B;
var stage2_B;
var stage3_B;
var help_B;
var sozai_B;

var select_Scene = cc.Scene.extend({
  onEnter: function(){
    this._super();
    var select_layer = new select();
    this.addChild(select_layer);
  }
});

var select = cc.Layer.extend({
  ctor: function(){
   this._super();
   var size = cc.director.getWinSize();
   if (audio_engin.isMusicPlaying == false) {
     audio_engin.playMusic(res.bgm_select2, true);
   }


   var select_back = new cc.Sprite(res.select_back_png);
   select_back.setPosition(cc.p(size.width * 0.5, size.height * 0.5));
   var select_back_layer = cc.Layer.create();
   select_back_layer.addChild(select_back);
   this.addChild(select_back_layer);

   stage1_B = new cc.Sprite(res.button1_png);
   stage1_B.setPosition(cc.p(size.width * 0.5, size.height * 0.6));
   this.addChild(stage1_B);

   stage2_B = new cc.Sprite(res.button7_png);
   stage2_B.setPosition(cc.p(size.width * 0.5, size.height * 0.5));
   this.addChild(stage2_B);

   stage3_B = new cc.Sprite(res.button13_png);
   stage3_B.setPosition(cc.p(size.width * 0.5, size.height * 0.4));
   this.addChild(stage3_B);

   help_B = new cc.Sprite(res.button21_png);
   help_B.setPosition(cc.p(size.width * 0.2, size.height * 0.17));
   this.addChild(help_B);

   sozai_B = new cc.Sprite(res.button22_png);
   sozai_B.setPosition(cc.p(size.width * 0.8, size.height * 0.17));
   this.addChild(sozai_B);

   if (stage2_on == false) {
     stage2_B.setTexture(res.button19_png);
   }
   if (stage3_on == false) {
     stage3_B.setTexture(res.button20_png);
   }

   switch (stage1_rank) {
      case 5:
        stage1_B.setTexture(res.button2_png);
        break;
      case 4:
        stage1_B.setTexture(res.button3_png);
        break;
      case 3:
        stage1_B.setTexture(res.button4_png);
        break;
      case 2:
        stage1_B.setTexture(res.button5_png);
        break;
      case 1:
        stage1_B.setTexture(res.button6_png);
        break;
     default:
   }

   switch (stage2_rank) {
      case 5:
        stage2_B.setTexture(res.button8_png);
        break;
      case 4:
        stage2_B.setTexture(res.button9_png);
        break;
      case 3:
        stage2_B.setTexture(res.button10_png);
        break;
      case 2:
        stage2_B.setTexture(res.button11_png);
        break;
      case 1:
        stage2_B.setTexture(res.button12_png);
        break;
     default:
   }

   switch (stage3_rank) {
      case 5:
        stage3_B.setTexture(res.button14_png);
        break;
      case 4:
        stage3_B.setTexture(res.button15_png);
        break;
      case 3:
        stage3_B.setTexture(res.button16_png);
        break;
      case 2:
        stage3_B.setTexture(res.button17_png);
        break;
      case 1:
        stage3_B.setTexture(res.button18_png);
        break;
     default:
   }

   cc.eventManager.addListener(touchListener_select, this);

 }
});

var touchListener_select = cc.EventListener.create({
  stage1_Box: null,
  stage2_Box: null,
  stage3_Box: null,
  help_Box: null,
  sozai_Box: null,
  stage1_flg: false,
  stage2_flg: false,
  stage3_flg: false,
  help_flg: false,
  sozai_flg: false,
  event: cc.EventListener.TOUCH_ONE_BY_ONE,
  swallowTouches: true,
  onTouchBegan: function(touch, event){
    this.stage1_Box = stage1_B.getBoundingBox();
    this.stage2_Box = stage2_B.getBoundingBox();
    this.stage3_Box = stage3_B.getBoundingBox();
    this.help_Box = help_B.getBoundingBox();
    this.sozai_Box = sozai_B.getBoundingBox();
    if (cc.rectContainsPoint(this.stage1_Box, touch.getLocation())){
      stage1_B.setOpacity(120);
      this.stage1_flg = true;
    }
    if (cc.rectContainsPoint(this.stage2_Box, touch.getLocation()) && stage2_on == true){
      stage2_B.setOpacity(120);
      this.stage2_flg = true;
    }
    if (cc.rectContainsPoint(this.stage3_Box, touch.getLocation()) && stage3_on == true){
      stage3_B.setOpacity(120);
      this.stage3_flg = true;
    }
    if (cc.rectContainsPoint(this.help_Box, touch.getLocation())){
      help_B.setOpacity(120);
      this.help_flg = true;
    }
    if (cc.rectContainsPoint(this.sozai_Box, touch.getLocation())){
      sozai_B.setOpacity(120);
      this.sozai_flg = true;
    }
    return true;
   },
  onTouchMoved: function(touch, event){
  },
  onTouchEnded: function(touch, event){
    stage1_B.setOpacity(255);
    stage2_B.setOpacity(255);
    stage3_B.setOpacity(255);
    help_B.setOpacity(255);
    sozai_B.setOpacity(255);
    if (this.stage1_flg == true) {
      round_flg = 11;
      audio_engin.playEffect(res.se_button);
      cc.director.runScene(cc.TransitionFade.create(1, new Chenge_Scene()));
      this.stage1_flg = false;
    }
    if (this.stage2_flg == true) {
      round_flg = 21;
      audio_engin.playEffect(res.se_button);
      cc.director.runScene(cc.TransitionFade.create(1, new Chenge_Scene()));
      this.stage2_flg = false;
    }
    if (this.stage3_flg == true) {
      round_flg = 31
      audio_engin.playEffect(res.se_button);
      cc.director.runScene(cc.TransitionFade.create(1, new Chenge_Scene()));
      this.stage3_flg = false;
    }
    if (this.help_flg == true) {
      audio_engin.playEffect(res.se_button);
      cc.director.runScene(cc.TransitionFade.create(1, new help_Scene()));
      this.help_flg = false;
    }
    if (this.sozai_flg == true) {
      audio_engin.playEffect(res.se_button);
      cc.director.runScene(cc.TransitionFade.create(1, new sozai_Scene()));
      this.sozai_flg = false;
    }
  }
});
