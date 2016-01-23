// Generated by CoffeeScript 1.8.0
(function() {
	this.Game = (function() {
		var YOUTUBE_ID, _endTime, _game, _generateNote, _isNoteGenerateTiming, _judge, _proccesRootSceneFrame, _status, _timing, _timingIndex, _yt;
		var _comboNum, _comboCounter;

		YOUTUBE_ID = 'HNYkOJ-T63k';

		_game = null;

		_yt = null;

		_judge = null;

		_comboNum = null;
		_comboCounter = 0;

		_timing = [6.14, 7.486, 8.155, 9.977, 10.377, 11.611, 12.062, 13.583, 14.223, 15.059, 16.241, 17.425, 20.186, 21.593, 22.313, 23.123, 24.297, 25.113, 26.148, 27.294, 28.103, 30.910, 31.601, 32.305, 33.024, 34.054, 35.360, 36.140, 37.028, 38.402, 39.129, 40.354, 41.051, 42.233, 43.043, 44.261, 45.705, 46.448, 47.416, 48.407, 50.158, 51.310, 52.363, 53.031, 54.417, 55.288, 56.472, 57.190, 58.110, 59.095, 60.776, 61.993, 62.370, 63.072, 64.493, 65.111, 66.414, 67.192, 68.891, 69.209, 70.056, 71.111, 72.861, 73.263, 74.639, 75.090, 75.941, 76.472, 76.992];

		_timingIndex = 0;

		_status = "stop";

		_endTime = 80;

		function Game(parms) {
			enchant();
			_game = new Core(800, 600);
			_game.fps = 30;
			_game.preload("icon.png", "shadow.png");
			_game.start();
			_game.onload = function() {
				var shadow, video;
				_game.rootScene.addEventListener("touchstart", function(e) {
					if (_yt.isReady()) {
						_game.rootScene.addEventListener("enterframe", _proccesRootSceneFrame);
						_status = "playing";
						return _yt.play();
					}
				});
				video = new Entity();
				video._element = document.createElement('div');
				video.x = 500;
				video.y = 300;
				video._element.innerHTML = '<iframe src="https://www.youtube.com/embed/' + YOUTUBE_ID + '?enablejsapi=1&controls=0&showinfo=0&autoplay=0&rel=0&vq=small"  width="300" height="200" frameborder="0" id="player"></iframe>';
				_game.rootScene.addChild(video);
				_yt = new Yt();
				_judge = new Label();
				_judge.font = "36px Arial";
				_judge.x = 100;
				_judge.y = 100;
				_game.rootScene.addChild(_judge);

				_comboNum = new Label();
				_comboNum.font = "25px Arial";
				_comboNum.x = 250;
				_comboNum.y = 100;
				_comboNum.text = "Combo : " + 0;
				_game.rootScene.addChild(_comboNum);

				shadow = new Sprite(80, 80);
				shadow.image = _game.assets["shadow.png"];
				shadow.x = 100;
				shadow.y = 380;
				return _game.rootScene.addChild(shadow);
			};
		}

		_isNoteGenerateTiming = function() {
			if (_timing[_timingIndex] != null) {
				if (_yt.getCurrentTime() > _timing[_timingIndex] - 1) {
					return true;
				}
			}
			return false;
		};

		_generateNote = function(number) {
			var note;
			note = new Sprite(80, 80);
			note.image = _game.assets["icon.png"];
			note.number = number;
			note.x = 100;
			note.y = -100;
			note.timing = _timing[number];
			_game.rootScene.addChild(note);
			note.tl.setTimeBased();
			note.tl.moveY(380, (_timing[number] - _yt.getCurrentTime()) * 1000);
			note.addEventListener("touchstart", function(e) {
				this.clearTime = _yt.getCurrentTime();
				return this.clear = true;
			});
			return note.addEventListener("enterframe", function() {
				var _ref, _ref1;
				if (_yt.getCurrentTime() > _timing[this.number] + 1) {
					_game.rootScene.removeChild(this);
				}
				if (this.clear) {
					this.opacity -= 0.2;
					this.scale(this.scaleX + 0.05, this.scaleY + 0.05);
					if (this.opacity <= 0) {
						_game.rootScene.removeChild(this);
						if ((-0.2 <= (_ref = this.clearTime - _timing[this.number]) && _ref <= 0.2)) {
							_judge.text = "COOL"
							_comboCounter ++;
							_comboNum.text = "Combo : " + _comboCounter;
							return 1;
						} else if ((-0.4 <= (_ref1 = this.clearTime - _timing[this.number]) && _ref1 <= 0.4)) {
							_comboCounter ++;
							_comboNum.text = "Combo : " + _comboCounter;
							return _judge.text = "GOOD";
						} else {
							_comboCounter = 0;
							_comboNum.text = "Combo : " + _comboCounter;
							return _judge.text = "BAD";
						}
					}
				}
			});
		};

		_proccesRootSceneFrame = function() {
			if (_status === "playing") {
				if (_isNoteGenerateTiming()) {
					_generateNote(_timingIndex);
					_timingIndex++;
				}
				if (_yt.getCurrentTime() >= _endTime) {
					_yt.setVolume(_youtube.getVolume() - 1);
					if (_yt.getVolume() <= 0) {
						_yt.stop();
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
			console.log(_player.getCurrentTime());
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
