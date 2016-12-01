// 画面サイズ用変数
var size;
var audio_engin;

// セレクト画面用変数 -----------------
var stage1_rank = null;
var stage2_rank = null;
var stage3_rank = null;
var stage2_on = true;
var stage3_on = true;
// ---------------------------------

// ステージ使用用変数 -----------------------------------------------
// スクロールバックグラウンド用変数
var sc_back;

// 各フラグ
// ゲームをクリアできたかどうかのフラグ
var game_clear = false;
// シングルタップかダブルタップ化のカウント用
var touch_count;
// プレイヤーをタッチしているかのフラグ
var pl_touching = false;
// ゲームスタートしているかどうかのフラグ
var start_ball = false;
// ミサイル発射可能かどうかのフラグ
var pl_atk = false;
// ミサイルが画面上に存在するかどうかのフラグ
var misail = false;
// ダブルタップ可能かどうかのフラグ
var doubl_tap = false;
// ダブルタップ検出待機カウント
var double_count;
// プレーヤーダメージフラグ
var pl_dm_flg;

// ボール関係
// Ball格納用変数
var ball;
// ballスプライト用変数
var ball_sprite;
// 通常ボールか貫通ボールかの状態格納用変数
var ball_type;
// x座標のボールの速度
var ball_spd_x;
// y座標のボールの速度
var ball_spd_y;
// ballレイヤー用変数
var ball_layer;

// プレイヤー関係
// プレイヤースプライト用変数
var player_sprite;
// 反射範囲スプライト用変数
var reflection_sprite;

// Misail格納用変数
var pl_misail;
// misailレイヤー用変数
var misairu_layer;

// エネミー関係
// エネミーレイヤー用変数
var enemys_layer;
// エネミー格納用変数
var enemy;
// エネミー撃破数格納変数
var enemy_death;

// エネミーの攻撃用の変数
var enemy_shot_layer;

// アイテム関係
// アイテムスプライト用変数
var item_sprite;
// アイテムレイヤー用変数
var item_layer;

// 残機用変数
// 残機カウント用変数
var life;
// 残機ラベル表示用変数
var lifelabel;

// 所要時間用変数
// 所要時間カウント用変数
var timer;
// 時間表示用変数
var timelabel;

// 被弾数カウント
var pl_dm_count;

// 減少した残機の数カウント
var dm_life;
// ----------------------------------------------------------------

// ラウンドリザルト用変数 -------------
var resalt_timer;
var resalt_life;
var resalt_life_dm;
var resalt_pl_dm;
var resalt_rank;
var round_flg;
// --------------------------------

// ステージ1リザルト用変数 -------------
var stage1_resalt;
var stage1_r1_rank;
var stage1_r2_rank;
// --------------------------------

// ステージ2リザルト用変数 -------------
var stage2_resalt;
var stage2_r1_rank;
var stage2_r2_rank;
var stage2_r3_rank;
// --------------------------------

// ステージ3リザルト用変数 -------------
var stage3_resalt;
var stage3_r1_rank;
var stage3_r2_rank;
var stage3_r3_rank;
// --------------------------------
