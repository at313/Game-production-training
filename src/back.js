var background = cc.Layer.extend({
  ctor: function(){
    this._super();
    // 背景表示 ---------------------------------------------------------------------
    sc_back = new ScrollingBG();
    this.addChild(sc_back);

    this.scheduleUpdate();
  },
  update: function(dt){
    sc_back.scroll();
  }
});

var ScrollingBG = cc.Sprite.extend({
    //ctorはコンストラクタ　クラスがインスタンスされたときに必ず実行される
    ctor:function() {
        this._super();
        this.initWithFile(res.satge_back_png);
    },
    //onEnterメソッドはスプライト描画の際に必ず呼ばれる
    onEnter:function() {
      this.setPosition(size.width / 2,size.height);
    },
    scroll:function(){
      //座標を更新する
        this.setPosition(this.getPosition().x,this.getPosition().y - 1);
        //画面の端に到達したら反対側の座標にする
        if(this.getPosition().y < 0){
            this.setPosition(this.getPosition().x,this.getPosition().y + 375);
        }
    }
});
