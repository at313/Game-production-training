var Item = cc.Sprite.extend({
  value: null,
  item_Box: null,
  pl_Bpx: null,
  ctor: function(){
    this._super();
    this.value = Math.floor( Math.random() * 3 ) + 1;
    switch (this.value) {
      case 1:
        this.initWithFile(res.item01_png);
        break;
      case 2:
        this.initWithFile(res.item02_png);
        break;
      case 3:
        this.initWithFile(res.item03_png);
        break;
    }
  },
  onEnter: function(){
      this._super();
      this.setPosition(Math.random() * 196 + 15, 375);
      var moveAction = cc.MoveTo.create(8, new cc.p(this.getPositionX(), -50));
      this.runAction(moveAction);

      this.scheduleUpdate();
  },
  update: function(){
    this.item_Box = this.getBoundingBox();
    this.pl_Box = player_sprite.getBoundingBox();
    if(cc.rectIntersectsRect(this.item_Box, this.pl_Box)){
      switch (this.value) {
        case 1:
          ball_type = 1;
          ball_sprite.setTexture(res.ball2_png);
          item_layer.removeChild(this);
          break;
        case 2:
          life++;
          lifelabel.setString("LIFE - " + life);
          item_layer.removeChild(this);
          break;
        case 3:
          pl_atk = true;
          item_layer.removeChild(this);
          break;
        }
    }
    if (this.getPositionY() < -5) {
      item_layer.removeChild(this);
    }
  }
});
