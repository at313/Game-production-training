var Stage1_1Scene = cc.Scene.extend({
  space: null,
  gameLayer: null,
  initPhysics: function(){
    this.space = new cp.Space();
      // Gravity
      this.space.gravity = cp.v(0, 0);
  },
  onEnter:function () {
        this._super();
        this.initPhysics();

        this.gameLayer = new cc.Layer();

        //add three layer in the right order
        this.addChild(this.gameLayer);

        this.scheduleUpdate();
    },
    update: function(){
      // chipmunk step
        this.space.step(dt);
    }
});
