var musicID;
function ID(id){
	musicID = id;
}

(function() {
	function KeyDownFunc(e){
		var key_code = e.keyCode;
		// console.log(key_code);
		return key_code;
	}

	function KeyUpFunc(e){
		var key_code = e.keyCode;
		// console.log(key_code);
		return key_code;
	}



	this.Game = (function() {
		var YOUTUBE_ID, _endTime, _game, _isNoteGenerateTiming, _judge, _proccesRootSceneFrame, _status, _timingIndex, _yt;
		var _comboNum, _comboCounter;
		var _maxScore = 0;
		var _generateNote = new Array(4); //4レーン分


		YOUTUBE_ID = ['JfgOjtq440o', 'UffMwLDfh_A', '4-Gw0TAM6-Q', 'bzhER32wO_U'];
		//クリスマス・ソング, トリセツ, R.Y.U.S.E.I., Ki・mi・ni・mu・chu
		var _timing = new Array(YOUTUBE_ID.length);

		_game = null;

		_yt = null;

		_judge = null;

		_comboNum = null;
		_comboCounter = 0;

		var bomNUM = 70; //落ちる球の数
		//クリスマス・ソング
		_timing[0] = [6.14, 7.486, 8.155, 9.977, 10.377, 11.611, 12.062, 13.583, 14.223, 15.059, 16.241, 17.425, 20.186, 21.593, 22.313, 23.123, 24.297, 25.113, 26.148, 27.294, 28.103, 30.910, 31.601, 32.305, 33.024, 34.054, 35.360, 36.140, 37.028, 38.402, 39.129, 40.354, 41.051, 42.233, 43.043, 44.261, 45.705, 46.448, 47.416, 48.407, 50.158, 51.310, 52.363, 53.031, 54.417, 55.288, 56.472, 57.190, 58.110, 59.095, 60.776, 61.993, 62.370, 63.072, 64.493, 65.111, 66.414, 67.192, 68.891, 69.209, 70.056, 71.111, 72.861, 73.263, 74.639, 75.090, 75.941, 76.472, 76.992, 78];
		//トリセツ
		_timing[1] = [6.14, 7.486, 8.155, 9.977, 10.377, 11.611, 12.062, 13.583, 14.223, 15.059, 16.241, 17.425, 20.186, 21.593, 22.313, 23.123, 24.297, 25.113, 26.148, 27.294, 28.103, 30.910, 31.601, 32.305, 33.024, 34.054, 35.360, 36.140, 37.028, 38.402, 39.129, 40.354, 41.051, 42.233, 43.043, 44.261, 45.705, 46.448, 47.416, 48.407, 50.158, 51.310, 52.363, 53.031, 54.417, 55.288, 56.472, 57.190, 58.110, 59.095, 60.776, 61.993, 62.370, 63.072, 64.493, 65.111, 66.414, 67.192, 68.891, 69.209, 70.056, 71.111, 72.861, 73.263, 74.639, 75.090, 75.941, 76.472, 76.992, 78];
		//ryusei
		_timing[2] = [6.14, 7.486, 8.155, 9.977, 10.377, 11.611, 12.062, 13.583, 14.223, 15.059, 16.241, 17.425, 20.186, 21.593, 22.313, 23.123, 24.297, 25.113, 26.148, 27.294, 28.103, 30.910, 31.601, 32.305, 33.024, 34.054, 35.360, 36.140, 37.028, 38.402, 39.129, 40.354, 41.051, 42.233, 43.043, 44.261, 45.705, 46.448, 47.416, 48.407, 50.158, 51.310, 52.363, 53.031, 54.417, 55.288, 56.472, 57.190, 58.110, 59.095, 60.776, 61.993, 62.370, 63.072, 64.493, 65.111, 66.414, 67.192, 68.891, 69.209, 70.056, 71.111, 72.861, 73.263, 74.639, 75.090, 75.941, 76.472, 76.992, 78];
		//kimninimuchu
		_timing[3] = [6.14, 7.486, 8.155, 9.977, 10.377, 11.611, 12.062, 13.583, 14.223, 15.059, 16.241, 17.425, 20.186, 21.593, 22.313, 23.123, 24.297, 25.113, 26.148, 27.294, 28.103, 30.910, 31.601, 32.305, 33.024, 34.054, 35.360, 36.140, 37.028, 38.402, 39.129, 40.354, 41.051, 42.233, 43.043, 44.261, 45.705, 46.448, 47.416, 48.407, 50.158, 51.310, 52.363, 53.031, 54.417, 55.288, 56.472, 57.190, 58.110, 59.095, 60.776, 61.993, 62.370, 63.072, 64.493, 65.111, 66.414, 67.192, 68.891, 69.209, 70.056, 71.111, 72.861, 73.263, 74.639, 75.090, 75.941, 76.472, 76.992, 78];


		_timingIndex = 0;

		var laneNumber = new Array(bomNUM);
		for(var i=0; i<bomNUM; i++){
			laneNumber[i] = Math.round( (Math.random()*10) % 3 );
		}

		_status = "stop";

		_endTime = 90;

		function Game(parms) {
			enchant();
			_game = new Core(800, 465); //ゲームの横幅、縦幅
			_game.fps = 30;
			_game.preload("./images/ocha.png", "./images/ochashadow.png");
			_game.start();
			_game.onload = function() {
				var video;
				var shadow = new Array(4);
				_game.rootScene.addEventListener("touchstart", function(e) {
					if (_yt.isReady()) {
						_game.rootScene.addEventListener("enterframe", _proccesRootSceneFrame);
						_status = "playing";
						return _yt.play();
					}
				});
				video = new Entity();
				video._element = document.createElement('div');
				video.x = 100000;
				video.y = 100000;
				video._element.innerHTML = '<iframe src="https://www.youtube.com/embed/' + YOUTUBE_ID[musicID] + '?enablejsapi=1&controls=0&showinfo=0&autoplay=0&rel=0&vq=small"  width="300" height="200" frameborder="0" id="player"></iframe>';
				_game.rootScene.addChild(video);

				// youube制御インスタンスを生成
				_yt = new Yt();

				// GREAT」などの判定結果を表示するラベルを生成
				_judge = new Label();
				_judge.font = "45px eMyfont";
				_judge.x = 315;
				_judge.y = 0;
				_judge.text = "";
				_game.rootScene.addChild(_judge);

				//コンボ数のラベルを生成
				_comboNum = new Label();
				_comboNum.font = "30px eMyfont";
				_comboNum.x = 750;
				_comboNum.y = 10;
				_comboNum.text = 0;
				_game.rootScene.addChild(_comboNum);

				 // 落下してくるオブジェクトの着地ポイントを示すイメージを設置する
				 for(var i=0; i<4; i++){
				 	shadow[i] = new Sprite(80, 66);
				 	shadow[i].image = _game.assets["./images/ochashadow.png"];
				 	shadow[i].x = 80+180*i;
				 	shadow[i].y = 380;
				 	_game.rootScene.addChild(shadow[i]);
				 }
				};
			}

			_isNoteGenerateTiming = function() {
				if (_timing[musicID][_timingIndex] != null) {
					if (_yt.getCurrentTime() > _timing[musicID][_timingIndex] - 1) {
						return true;
					}
				}
				return false;
			};


			_generateNote[0] = function(number) {
				var note;
				note = new Sprite(80, 66);
				note.image = _game.assets["./images/ocha.png"];
				note.number = number;
				note.x = 80;
				note.y = -100;
				note.timing = _timing[musicID][number];
				_game.rootScene.addChild(note);
				note.tl.setTimeBased();
				note.tl.moveY(380, (_timing[musicID][number] - _yt.getCurrentTime()) * 1000);
				note.addEventListener("touchstart", function(e) {
					this.clearTime = _yt.getCurrentTime();
					return this.clear = true;
				});

				return note.addEventListener("enterframe", function() {
					var _ref, _ref1;
					if (_yt.getCurrentTime() > _timing[musicID][this.number] + 1) {
						_game.rootScene.removeChild(this);
					}
					if (this.clear) {
						this.opacity -= 0.2;
						this.scale(this.scaleX + 0.05, this.scaleY + 0.05);
						if (this.opacity <= 0) {
							_game.rootScene.removeChild(this);
							if ((-0.2 <= (_ref = this.clearTime - _timing[musicID][this.number]) && _ref <= 0.2)) {
								_judge.text = "COOL"
								_comboCounter ++;
								_comboNum.text = _comboCounter;
								return 1;
							} else if ((-0.4 <= (_ref1 = this.clearTime - _timing[musicID][this.number]) && _ref1 <= 0.4)) {
								_comboCounter ++;
								_comboNum.text = _comboCounter;
								return _judge.text = "GOOD";
							} else {
								_comboCounter = 0;
								_comboNum.text = _comboCounter;
								return _judge.text = "  BAD";
							}
						}
					}
				});
			};

			_generateNote[1] = function(number) {
				var note;
				note = new Sprite(80, 66);
				note.image = _game.assets["./images/ocha.png"];
				note.number = number;
				note.x = 80+180;
				note.y = -100;
				note.timing = _timing[musicID][number];
				_game.rootScene.addChild(note);
				note.tl.setTimeBased();
				note.tl.moveY(380, (_timing[musicID][number] - _yt.getCurrentTime()) * 1000);
				note.addEventListener("touchstart", function(e) {
					this.clearTime = _yt.getCurrentTime();
					return this.clear = true;
				});

				return note.addEventListener("enterframe", function() {
					var _ref, _ref1;
					if (_yt.getCurrentTime() > _timing[musicID][this.number] + 1) {
						_game.rootScene.removeChild(this);
					}
					if (this.clear) {
						this.opacity -= 0.2;
						this.scale(this.scaleX + 0.05, this.scaleY + 0.05);
						if (this.opacity <= 0) {
							_game.rootScene.removeChild(this);
							if ((-0.2 <= (_ref = this.clearTime - _timing[musicID][this.number]) && _ref <= 0.2)) {
								_judge.text = "COOL"
								_comboCounter ++;
								_comboNum.text = _comboCounter;
								return 1;
							} else if ((-0.4 <= (_ref1 = this.clearTime - _timing[musicID][this.number]) && _ref1 <= 0.4)) {
								_comboCounter ++;
								_comboNum.text =  _comboCounter;
								return _judge.text = "GOOD";
							} else {
								_comboCounter = 0;
								_comboNum.text =  _comboCounter;
								return _judge.text = "  BAD";
							}
						}
					}
				});
			};
			_generateNote[2] = function(number) {
				var note;
				note = new Sprite(80, 66);
				note.image = _game.assets["./images/ocha.png"];
				note.number = number;
				note.x = 80+360;
				note.y = -100;
				note.timing = _timing[musicID][number];
				_game.rootScene.addChild(note);
				note.tl.setTimeBased();
				note.tl.moveY(380, (_timing[musicID][number] - _yt.getCurrentTime()) * 1000);
				note.addEventListener("touchstart", function(e) {
					this.clearTime = _yt.getCurrentTime();
					return this.clear = true;
				});
				return note.addEventListener("enterframe", function() {
					var _ref, _ref1;
					if (_yt.getCurrentTime() > _timing[musicID][this.number] + 1) {
						_game.rootScene.removeChild(this);
					}
					if (this.clear) {
						this.opacity -= 0.2;
						this.scale(this.scaleX + 0.05, this.scaleY + 0.05);
						if (this.opacity <= 0) {
							_game.rootScene.removeChild(this);
							if ((-0.2 <= (_ref = this.clearTime - _timing[musicID][this.number]) && _ref <= 0.2)) {
								_judge.text = "COOL"
								_comboCounter ++;
								_comboNum.text = _comboCounter;
								return 1;
							} else if ((-0.4 <= (_ref1 = this.clearTime - _timing[musicID][this.number]) && _ref1 <= 0.4)) {
								_comboCounter ++;
								_comboNum.text =  _comboCounter;
								return _judge.text = "GOOD";
							} else {
								_comboCounter = 0;
								_comboNum.text =  _comboCounter;
								return _judge.text = " BAD";
							}
						}
					}
				});
			};
			_generateNote[3] = function(number) {
				var note;
				note = new Sprite(80, 66);
				note.image = _game.assets["./images/ocha.png"];
				note.number = number;
				note.x = 80+540;
				note.y = -100;
				note.timing = _timing[musicID][number];
				_game.rootScene.addChild(note);
				note.tl.setTimeBased();
				note.tl.moveY(380, (_timing[musicID][number] - _yt.getCurrentTime()) * 1000);
				note.addEventListener("touchstart", function(e) {
					this.clearTime = _yt.getCurrentTime();
					return this.clear = true;
				});
				return note.addEventListener("enterframe", function() {
					var _ref, _ref1;
					if (_yt.getCurrentTime() > _timing[musicID][this.number] + 1) {
						_game.rootScene.removeChild(this);
					}
					if (this.clear) {
						this.opacity -= 0.2;
						this.scale(this.scaleX + 0.05, this.scaleY + 0.05);
						if (this.opacity <= 0) {
							_game.rootScene.removeChild(this);
							if ((-0.2 <= (_ref = this.clearTime - _timing[musicID][this.number]) && _ref <= 0.2)) {
								_judge.text = "COOL"
								_comboCounter ++;
								_comboNum.text =_comboCounter;
								return 1;
							} else if ((-0.4 <= (_ref1 = this.clearTime - _timing[musicID][this.number]) && _ref1 <= 0.4)) {
								_comboCounter ++;
								_comboNum.text =  _comboCounter;
								return _judge.text = "GOOD";
							} else {
								_comboCounter = 0;
								_comboNum.text =  _comboCounter;
								return _judge.text = " BAD";
							}
						}
					}
				});
			};


			_proccesRootSceneFrame = function() {
				if (_status === "playing") {
					if(_comboCounter > _maxScore){
						_maxScore = _comboCounter;
					}

					if (_isNoteGenerateTiming()) {
						_generateNote[laneNumber[_timingIndex]](_timingIndex);
						// _generateNote[0](_timingIndex);
						_timingIndex++;

					}
					if (_yt.getCurrentTime() >= _endTime) {
						_yt.setVolume(_yt.getVolume() - 1);
						if (_yt.getVolume() <= 0) {
							// _yt.stop();
							document.getElementById("score").innerHTML='<form action="rank.php" method "get"><input type="hidden" name="_maxScore"></form>';
							location.href="./rank.php"; //音楽が終わったら、結果のページへ移動
							return _status = "end";
						}
					}
				}
			};

			return Game;

		})();

		this.Yt = (function() {
			var onPlayerReady, _isReady, _player, _state;

			_player = null;

			_isReady = false;

			_state = null;

			function Yt(parms) {
				var firstScriptTag, tag;
				tag = document.createElement('script');
				tag.src = 'https://www.youtube.com/iframe_api';
				firstScriptTag = document.getElementsByTagName('script')[0];
				firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
			}

			Yt.prototype.play = function() {
				return _player.playVideo();
			};

			Yt.prototype.getCurrentTime = function() {
				return _player.getCurrentTime();
			};

			Yt.prototype.setVolume = function(volume) {
				return _player.setVolume(volume);
			};

			Yt.prototype.getVolume = function() {
				return _player.getVolume();
			};

			Yt.prototype.isReady = function() {
				return _isReady;
			};

			onPlayerReady = function() {
				return _isReady = true;
			};

			window.onYouTubeIframeAPIReady = function() {
				return _player = new YT.Player('player', {
					events: {
						'onReady': onPlayerReady
					}
				});
			};

			return Yt;

		})();


		new Game();

	}).call(this);
