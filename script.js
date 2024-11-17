(function(){
    var script = {
 "verticalAlign": "top",
 "paddingTop": 0,
 "children": [
  "this.MainViewer",
  "this.Container_E12E97BC_FC5E_3EF0_41BB_846FF6F501CC",
  "this.Container_EE05509D_FD91_02BD_41EF_9AA91BF3F817",
  "this.Container_E5BB554E_FD93_039E_41E6_CA88984403B5",
  "this.HTMLText_1B417888_0B13_AC7C_41A1_5FCA0700A4F3",
  "this.IconButton_047915E6_0AF0_A7B4_419E_B4D24A966C32",
  "this.Container_1949E009_0CC4_4EFC_41A1_1A3EDD7D64F5"
 ],
 "id": "rootPlayer",
 "mobileMipmappingEnabled": false,
 "scrollBarOpacity": 0.5,
 "width": "100%",
 "scrollBarVisible": "rollOver",
 "start": "this.init(); this.visibleComponentsIfPlayerFlagEnabled([this.IconButton_E5B8A54E_FD93_039E_41E3_948216944E04], 'gyroscopeAvailable'); this.syncPlaylists([this.ThumbnailGrid_E12E87BC_FC5E_3EF0_41D3_CB6F3CE9141B_playlist,this.DropDown_EE05F09D_FD91_02BD_41DF_1E01DAA2A683_playlist,this.DropDown_EA966EC5_FDF1_3E82_41C7_D6D87EF404E1_playlist,this.mainPlayList]); if(!this.get('fullscreenAvailable')) { [this.IconButton_E5BB654E_FD93_039E_41EB_C8BE372978C3].forEach(function(component) { component.set('visible', false); }) }; this.playAudioList([this.audio_34B8EFE0_3927_E39C_41A9_0E256366AA0C])",
 "borderRadius": 0,
 "class": "Player",
 "vrPolyfillScale": 0.5,
 "creationPolicy": "inAdvance",
 "propagateClick": false,
 "paddingLeft": 0,
 "paddingRight": 0,
 "buttonToggleFullscreen": "this.IconButton_E5BB654E_FD93_039E_41EB_C8BE372978C3",
 "scripts": {
  "autotriggerAtStart": function(playList, callback, once){  var onChange = function(event){ callback(); if(once == true) playList.unbind('change', onChange, this); }; playList.bind('change', onChange, this); },
  "historyGoForward": function(playList){  var history = this.get('data')['history'][playList.get('id')]; if(history != undefined) { history.forward(); } },
  "showPopupPanoramaVideoOverlay": function(popupPanoramaOverlay, closeButtonProperties, stopAudios){  var self = this; var showEndFunction = function() { popupPanoramaOverlay.unbind('showEnd', showEndFunction); closeButton.bind('click', hideFunction, this); setCloseButtonPosition(); closeButton.set('visible', true); }; var endFunction = function() { if(!popupPanoramaOverlay.get('loop')) hideFunction(); }; var hideFunction = function() { self.MainViewer.set('toolTipEnabled', true); popupPanoramaOverlay.set('visible', false); closeButton.set('visible', false); closeButton.unbind('click', hideFunction, self); popupPanoramaOverlay.unbind('end', endFunction, self); popupPanoramaOverlay.unbind('hideEnd', hideFunction, self, true); self.resumePlayers(playersPaused, true); if(stopAudios) { self.resumeGlobalAudios(); } }; var setCloseButtonPosition = function() { var right = 10; var top = 10; closeButton.set('right', right); closeButton.set('top', top); }; this.MainViewer.set('toolTipEnabled', false); var closeButton = this.closeButtonPopupPanorama; if(closeButtonProperties){ for(var key in closeButtonProperties){ closeButton.set(key, closeButtonProperties[key]); } } var playersPaused = this.pauseCurrentPlayers(true); if(stopAudios) { this.pauseGlobalAudios(); } popupPanoramaOverlay.bind('end', endFunction, this, true); popupPanoramaOverlay.bind('showEnd', showEndFunction, this, true); popupPanoramaOverlay.bind('hideEnd', hideFunction, this, true); popupPanoramaOverlay.set('visible', true); },
  "updateVideoCues": function(playList, index){  var playListItem = playList.get('items')[index]; var video = playListItem.get('media'); if(video.get('cues').length == 0) return; var player = playListItem.get('player'); var cues = []; var changeFunction = function(){ if(playList.get('selectedIndex') != index){ video.unbind('cueChange', cueChangeFunction, this); playList.unbind('change', changeFunction, this); } }; var cueChangeFunction = function(event){ var activeCues = event.data.activeCues; for(var i = 0, count = cues.length; i<count; ++i){ var cue = cues[i]; if(activeCues.indexOf(cue) == -1 && (cue.get('startTime') > player.get('currentTime') || cue.get('endTime') < player.get('currentTime')+0.5)){ cue.trigger('end'); } } cues = activeCues; }; video.bind('cueChange', cueChangeFunction, this); playList.bind('change', changeFunction, this); },
  "setPanoramaCameraWithSpot": function(playListItem, yaw, pitch){  var panorama = playListItem.get('media'); var newCamera = this.cloneCamera(playListItem.get('camera')); var initialPosition = newCamera.get('initialPosition'); initialPosition.set('yaw', yaw); initialPosition.set('pitch', pitch); this.startPanoramaWithCamera(panorama, newCamera); },
  "showPopupPanoramaOverlay": function(popupPanoramaOverlay, closeButtonProperties, imageHD, toggleImage, toggleImageHD, autoCloseMilliSeconds, audio, stopBackgroundAudio){  var self = this; this.MainViewer.set('toolTipEnabled', false); var cardboardEnabled = this.isCardboardViewMode(); if(!cardboardEnabled) { var zoomImage = this.zoomImagePopupPanorama; var showDuration = popupPanoramaOverlay.get('showDuration'); var hideDuration = popupPanoramaOverlay.get('hideDuration'); var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); var popupMaxWidthBackup = popupPanoramaOverlay.get('popupMaxWidth'); var popupMaxHeightBackup = popupPanoramaOverlay.get('popupMaxHeight'); var showEndFunction = function() { var loadedFunction = function(){ if(!self.isCardboardViewMode()) popupPanoramaOverlay.set('visible', false); }; popupPanoramaOverlay.unbind('showEnd', showEndFunction, self); popupPanoramaOverlay.set('showDuration', 1); popupPanoramaOverlay.set('hideDuration', 1); self.showPopupImage(imageHD, toggleImageHD, popupPanoramaOverlay.get('popupMaxWidth'), popupPanoramaOverlay.get('popupMaxHeight'), null, null, closeButtonProperties, autoCloseMilliSeconds, audio, stopBackgroundAudio, loadedFunction, hideFunction); }; var hideFunction = function() { var restoreShowDurationFunction = function(){ popupPanoramaOverlay.unbind('showEnd', restoreShowDurationFunction, self); popupPanoramaOverlay.set('visible', false); popupPanoramaOverlay.set('showDuration', showDuration); popupPanoramaOverlay.set('popupMaxWidth', popupMaxWidthBackup); popupPanoramaOverlay.set('popupMaxHeight', popupMaxHeightBackup); }; self.resumePlayers(playersPaused, audio == null || !stopBackgroundAudio); var currentWidth = zoomImage.get('imageWidth'); var currentHeight = zoomImage.get('imageHeight'); popupPanoramaOverlay.bind('showEnd', restoreShowDurationFunction, self, true); popupPanoramaOverlay.set('showDuration', 1); popupPanoramaOverlay.set('hideDuration', hideDuration); popupPanoramaOverlay.set('popupMaxWidth', currentWidth); popupPanoramaOverlay.set('popupMaxHeight', currentHeight); if(popupPanoramaOverlay.get('visible')) restoreShowDurationFunction(); else popupPanoramaOverlay.set('visible', true); self.MainViewer.set('toolTipEnabled', true); }; if(!imageHD){ imageHD = popupPanoramaOverlay.get('image'); } if(!toggleImageHD && toggleImage){ toggleImageHD = toggleImage; } popupPanoramaOverlay.bind('showEnd', showEndFunction, this, true); } else { var hideEndFunction = function() { self.resumePlayers(playersPaused, audio == null || stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ self.resumeGlobalAudios(); } self.stopGlobalAudio(audio); } popupPanoramaOverlay.unbind('hideEnd', hideEndFunction, self); self.MainViewer.set('toolTipEnabled', true); }; var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ this.pauseGlobalAudios(); } this.playGlobalAudio(audio); } popupPanoramaOverlay.bind('hideEnd', hideEndFunction, this, true); } popupPanoramaOverlay.set('visible', true); },
  "setMainMediaByIndex": function(index){  var item = undefined; if(index >= 0 && index < this.mainPlayList.get('items').length){ this.mainPlayList.set('selectedIndex', index); item = this.mainPlayList.get('items')[index]; } return item; },
  "unregisterKey": function(key){  delete window[key]; },
  "getMediaByName": function(name){  var list = this.getByClassName('Media'); for(var i = 0, count = list.length; i<count; ++i){ var media = list[i]; if((media.get('class') == 'Audio' && media.get('data').label == name) || media.get('label') == name){ return media; } } return undefined; },
  "getComponentByName": function(name){  var list = this.getByClassName('UIComponent'); for(var i = 0, count = list.length; i<count; ++i){ var component = list[i]; var data = component.get('data'); if(data != undefined && data.name == name){ return component; } } return undefined; },
  "getMediaFromPlayer": function(player){  switch(player.get('class')){ case 'PanoramaPlayer': return player.get('panorama') || player.get('video'); case 'VideoPlayer': case 'Video360Player': return player.get('video'); case 'PhotoAlbumPlayer': return player.get('photoAlbum'); case 'MapPlayer': return player.get('map'); } },
  "setStartTimeVideoSync": function(video, player){  this.setStartTimeVideo(video, player.get('currentTime')); },
  "registerKey": function(key, value){  window[key] = value; },
  "getPanoramaOverlayByName": function(panorama, name){  var overlays = this.getOverlays(panorama); for(var i = 0, count = overlays.length; i<count; ++i){ var overlay = overlays[i]; var data = overlay.get('data'); if(data != undefined && data.label == name){ return overlay; } } return undefined; },
  "setPanoramaCameraWithCurrentSpot": function(playListItem){  var currentPlayer = this.getActivePlayerWithViewer(this.MainViewer); if(currentPlayer == undefined){ return; } var playerClass = currentPlayer.get('class'); if(playerClass != 'PanoramaPlayer' && playerClass != 'Video360Player'){ return; } var fromMedia = currentPlayer.get('panorama'); if(fromMedia == undefined) { fromMedia = currentPlayer.get('video'); } var panorama = playListItem.get('media'); var newCamera = this.cloneCamera(playListItem.get('camera')); this.setCameraSameSpotAsMedia(newCamera, fromMedia); this.startPanoramaWithCamera(panorama, newCamera); },
  "getOverlays": function(media){  switch(media.get('class')){ case 'Panorama': var overlays = media.get('overlays').concat() || []; var frames = media.get('frames'); for(var j = 0; j<frames.length; ++j){ overlays = overlays.concat(frames[j].get('overlays') || []); } return overlays; case 'Video360': case 'Map': return media.get('overlays') || []; default: return []; } },
  "showWindow": function(w, autoCloseMilliSeconds, containsAudio){  if(w.get('visible') == true){ return; } var closeFunction = function(){ clearAutoClose(); this.resumePlayers(playersPaused, !containsAudio); w.unbind('close', closeFunction, this); }; var clearAutoClose = function(){ w.unbind('click', clearAutoClose, this); if(timeoutID != undefined){ clearTimeout(timeoutID); } }; var timeoutID = undefined; if(autoCloseMilliSeconds){ var autoCloseFunction = function(){ w.hide(); }; w.bind('click', clearAutoClose, this); timeoutID = setTimeout(autoCloseFunction, autoCloseMilliSeconds); } var playersPaused = this.pauseCurrentPlayers(!containsAudio); w.bind('close', closeFunction, this); w.show(this, true); },
  "triggerOverlay": function(overlay, eventName){  if(overlay.get('areas') != undefined) { var areas = overlay.get('areas'); for(var i = 0; i<areas.length; ++i) { areas[i].trigger(eventName); } } else { overlay.trigger(eventName); } },
  "setMainMediaByName": function(name){  var items = this.mainPlayList.get('items'); for(var i = 0; i<items.length; ++i){ var item = items[i]; if(item.get('media').get('label') == name) { this.mainPlayList.set('selectedIndex', i); return item; } } },
  "keepComponentVisibility": function(component, keep){  var key = 'keepVisibility_' + component.get('id'); var value = this.getKey(key); if(value == undefined && keep) { this.registerKey(key, keep); } else if(value != undefined && !keep) { this.unregisterKey(key); } },
  "startPanoramaWithCamera": function(media, camera){  if(window.currentPanoramasWithCameraChanged != undefined && window.currentPanoramasWithCameraChanged.indexOf(media) != -1){ return; } var playLists = this.getByClassName('PlayList'); if(playLists.length == 0) return; var restoreItems = []; for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ var item = items[j]; if(item.get('media') == media && (item.get('class') == 'PanoramaPlayListItem' || item.get('class') == 'Video360PlayListItem')){ restoreItems.push({camera: item.get('camera'), item: item}); item.set('camera', camera); } } } if(restoreItems.length > 0) { if(window.currentPanoramasWithCameraChanged == undefined) { window.currentPanoramasWithCameraChanged = [media]; } else { window.currentPanoramasWithCameraChanged.push(media); } var restoreCameraOnStop = function(){ var index = window.currentPanoramasWithCameraChanged.indexOf(media); if(index != -1) { window.currentPanoramasWithCameraChanged.splice(index, 1); } for (var i = 0; i < restoreItems.length; i++) { restoreItems[i].item.set('camera', restoreItems[i].camera); restoreItems[i].item.unbind('stop', restoreCameraOnStop, this); } }; for (var i = 0; i < restoreItems.length; i++) { restoreItems[i].item.bind('stop', restoreCameraOnStop, this); } } },
  "getPixels": function(value){  var result = new RegExp('((\\+|\\-)?\\d+(\\.\\d*)?)(px|vw|vh|vmin|vmax)?', 'i').exec(value); if (result == undefined) { return 0; } var num = parseFloat(result[1]); var unit = result[4]; var vw = this.rootPlayer.get('actualWidth') / 100; var vh = this.rootPlayer.get('actualHeight') / 100; switch(unit) { case 'vw': return num * vw; case 'vh': return num * vh; case 'vmin': return num * Math.min(vw, vh); case 'vmax': return num * Math.max(vw, vh); default: return num; } },
  "isCardboardViewMode": function(){  var players = this.getByClassName('PanoramaPlayer'); return players.length > 0 && players[0].get('viewMode') == 'cardboard'; },
  "loadFromCurrentMediaPlayList": function(playList, delta){  var currentIndex = playList.get('selectedIndex'); var totalItems = playList.get('items').length; var newIndex = (currentIndex + delta) % totalItems; while(newIndex < 0){ newIndex = totalItems + newIndex; }; if(currentIndex != newIndex){ playList.set('selectedIndex', newIndex); } },
  "setStartTimeVideo": function(video, time){  var items = this.getPlayListItems(video); var startTimeBackup = []; var restoreStartTimeFunc = function() { for(var i = 0; i<items.length; ++i){ var item = items[i]; item.set('startTime', startTimeBackup[i]); item.unbind('stop', restoreStartTimeFunc, this); } }; for(var i = 0; i<items.length; ++i) { var item = items[i]; var player = item.get('player'); if(player.get('video') == video && player.get('state') == 'playing') { player.seek(time); } else { startTimeBackup.push(item.get('startTime')); item.set('startTime', time); item.bind('stop', restoreStartTimeFunc, this); } } },
  "pauseGlobalAudiosWhilePlayItem": function(playList, index, exclude){  var self = this; var item = playList.get('items')[index]; var media = item.get('media'); var player = item.get('player'); var caller = media.get('id'); var endFunc = function(){ if(playList.get('selectedIndex') != index) { if(hasState){ player.unbind('stateChange', stateChangeFunc, self); } self.resumeGlobalAudios(caller); } }; var stateChangeFunc = function(event){ var state = event.data.state; if(state == 'stopped'){ this.resumeGlobalAudios(caller); } else if(state == 'playing'){ this.pauseGlobalAudios(caller, exclude); } }; var mediaClass = media.get('class'); var hasState = mediaClass == 'Video360' || mediaClass == 'Video'; if(hasState){ player.bind('stateChange', stateChangeFunc, this); } this.pauseGlobalAudios(caller, exclude); this.executeFunctionWhenChange(playList, index, endFunc, endFunc); },
  "resumeGlobalAudios": function(caller){  if (window.pauseGlobalAudiosState == undefined || !(caller in window.pauseGlobalAudiosState)) return; var audiosPaused = window.pauseGlobalAudiosState[caller]; delete window.pauseGlobalAudiosState[caller]; var values = Object.values(window.pauseGlobalAudiosState); for (var i = 0, count = values.length; i<count; ++i) { var objAudios = values[i]; for (var j = audiosPaused.length-1; j>=0; --j) { var a = audiosPaused[j]; if(objAudios.indexOf(a) != -1) audiosPaused.splice(j, 1); } } for (var i = 0, count = audiosPaused.length; i<count; ++i) { var a = audiosPaused[i]; if (a.get('state') == 'paused') a.play(); } },
  "getGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios != undefined && audio.get('id') in audios){ audio = audios[audio.get('id')]; } return audio; },
  "changeBackgroundWhilePlay": function(playList, index, color){  var stopFunction = function(event){ playListItem.unbind('stop', stopFunction, this); if((color == viewerArea.get('backgroundColor')) && (colorRatios == viewerArea.get('backgroundColorRatios'))){ viewerArea.set('backgroundColor', backgroundColorBackup); viewerArea.set('backgroundColorRatios', backgroundColorRatiosBackup); } }; var playListItem = playList.get('items')[index]; var player = playListItem.get('player'); var viewerArea = player.get('viewerArea'); var backgroundColorBackup = viewerArea.get('backgroundColor'); var backgroundColorRatiosBackup = viewerArea.get('backgroundColorRatios'); var colorRatios = [0]; if((color != backgroundColorBackup) || (colorRatios != backgroundColorRatiosBackup)){ viewerArea.set('backgroundColor', color); viewerArea.set('backgroundColorRatios', colorRatios); playListItem.bind('stop', stopFunction, this); } },
  "cloneCamera": function(camera){  var newCamera = this.rootPlayer.createInstance(camera.get('class')); newCamera.set('id', camera.get('id') + '_copy'); newCamera.set('idleSequence', camera.get('initialSequence')); return newCamera; },
  "updateMediaLabelFromPlayList": function(playList, htmlText, playListItemStopToDispose){  var changeFunction = function(){ var index = playList.get('selectedIndex'); if(index >= 0){ var beginFunction = function(){ playListItem.unbind('begin', beginFunction); setMediaLabel(index); }; var setMediaLabel = function(index){ var media = playListItem.get('media'); var text = media.get('data'); if(!text) text = media.get('label'); setHtml(text); }; var setHtml = function(text){ if(text !== undefined) { htmlText.set('html', '<div style=\"text-align:left\"><SPAN STYLE=\"color:#FFFFFF;font-size:12px;font-family:Verdana\"><span color=\"white\" font-family=\"Verdana\" font-size=\"12px\">' + text + '</SPAN></div>'); } else { htmlText.set('html', ''); } }; var playListItem = playList.get('items')[index]; if(htmlText.get('html')){ setHtml('Loading...'); playListItem.bind('begin', beginFunction); } else{ setMediaLabel(index); } } }; var disposeFunction = function(){ htmlText.set('html', undefined); playList.unbind('change', changeFunction, this); playListItemStopToDispose.unbind('stop', disposeFunction, this); }; if(playListItemStopToDispose){ playListItemStopToDispose.bind('stop', disposeFunction, this); } playList.bind('change', changeFunction, this); changeFunction(); },
  "init": function(){  if(!Object.hasOwnProperty('values')) { Object.values = function(o){ return Object.keys(o).map(function(e) { return o[e]; }); }; } var history = this.get('data')['history']; var playListChangeFunc = function(e){ var playList = e.source; var index = playList.get('selectedIndex'); if(index < 0) return; var id = playList.get('id'); if(!history.hasOwnProperty(id)) history[id] = new HistoryData(playList); history[id].add(index); }; var playLists = this.getByClassName('PlayList'); for(var i = 0, count = playLists.length; i<count; ++i) { var playList = playLists[i]; playList.bind('change', playListChangeFunc, this); } },
  "changePlayListWithSameSpot": function(playList, newIndex){  var currentIndex = playList.get('selectedIndex'); if (currentIndex >= 0 && newIndex >= 0 && currentIndex != newIndex) { var currentItem = playList.get('items')[currentIndex]; var newItem = playList.get('items')[newIndex]; var currentPlayer = currentItem.get('player'); var newPlayer = newItem.get('player'); if ((currentPlayer.get('class') == 'PanoramaPlayer' || currentPlayer.get('class') == 'Video360Player') && (newPlayer.get('class') == 'PanoramaPlayer' || newPlayer.get('class') == 'Video360Player')) { var newCamera = this.cloneCamera(newItem.get('camera')); this.setCameraSameSpotAsMedia(newCamera, currentItem.get('media')); this.startPanoramaWithCamera(newItem.get('media'), newCamera); } } },
  "resumePlayers": function(players, onlyResumeCameraIfPanorama){  for(var i = 0; i<players.length; ++i){ var player = players[i]; if(onlyResumeCameraIfPanorama && player.get('class') == 'PanoramaPlayer' && typeof player.get('video') === 'undefined'){ player.resumeCamera(); } else{ player.play(); } } },
  "loopAlbum": function(playList, index){  var playListItem = playList.get('items')[index]; var player = playListItem.get('player'); var loopFunction = function(){ player.play(); }; this.executeFunctionWhenChange(playList, index, loopFunction); },
  "getMediaHeight": function(media){  switch(media.get('class')){ case 'Video360': var res = media.get('video'); if(res instanceof Array){ var maxH=0; for(var i=0; i<res.length; i++){ var r = res[i]; if(r.get('height') > maxH) maxH = r.get('height'); } return maxH; }else{ return r.get('height') } default: return media.get('height'); } },
  "getCurrentPlayerWithMedia": function(media){  var playerClass = undefined; var mediaPropertyName = undefined; switch(media.get('class')) { case 'Panorama': case 'LivePanorama': case 'HDRPanorama': playerClass = 'PanoramaPlayer'; mediaPropertyName = 'panorama'; break; case 'Video360': playerClass = 'PanoramaPlayer'; mediaPropertyName = 'video'; break; case 'PhotoAlbum': playerClass = 'PhotoAlbumPlayer'; mediaPropertyName = 'photoAlbum'; break; case 'Map': playerClass = 'MapPlayer'; mediaPropertyName = 'map'; break; case 'Video': playerClass = 'VideoPlayer'; mediaPropertyName = 'video'; break; }; if(playerClass != undefined) { var players = this.getByClassName(playerClass); for(var i = 0; i<players.length; ++i){ var player = players[i]; if(player.get(mediaPropertyName) == media) { return player; } } } else { return undefined; } },
  "historyGoBack": function(playList){  var history = this.get('data')['history'][playList.get('id')]; if(history != undefined) { history.back(); } },
  "pauseCurrentPlayers": function(onlyPauseCameraIfPanorama){  var players = this.getCurrentPlayers(); var i = players.length; while(i-- > 0){ var player = players[i]; if(player.get('state') == 'playing') { if(onlyPauseCameraIfPanorama && player.get('class') == 'PanoramaPlayer' && typeof player.get('video') === 'undefined'){ player.pauseCamera(); } else { player.pause(); } } else { players.splice(i, 1); } } return players; },
  "fixTogglePlayPauseButton": function(player){  var state = player.get('state'); var buttons = player.get('buttonPlayPause'); if(typeof buttons !== 'undefined' && player.get('state') == 'playing'){ if(!Array.isArray(buttons)) buttons = [buttons]; for(var i = 0; i<buttons.length; ++i) buttons[i].set('pressed', true); } },
  "playGlobalAudioWhilePlay": function(playList, index, audio, endCallback){  var changeFunction = function(event){ if(event.data.previousSelectedIndex == index){ this.stopGlobalAudio(audio); if(isPanorama) { var media = playListItem.get('media'); var audios = media.get('audios'); audios.splice(audios.indexOf(audio), 1); media.set('audios', audios); } playList.unbind('change', changeFunction, this); if(endCallback) endCallback(); } }; var audios = window.currentGlobalAudios; if(audios && audio.get('id') in audios){ audio = audios[audio.get('id')]; if(audio.get('state') != 'playing'){ audio.play(); } return audio; } playList.bind('change', changeFunction, this); var playListItem = playList.get('items')[index]; var isPanorama = playListItem.get('class') == 'PanoramaPlayListItem'; if(isPanorama) { var media = playListItem.get('media'); var audios = (media.get('audios') || []).slice(); if(audio.get('class') == 'MediaAudio') { var panoramaAudio = this.rootPlayer.createInstance('PanoramaAudio'); panoramaAudio.set('autoplay', false); panoramaAudio.set('audio', audio.get('audio')); panoramaAudio.set('loop', audio.get('loop')); panoramaAudio.set('id', audio.get('id')); var stateChangeFunctions = audio.getBindings('stateChange'); for(var i = 0; i<stateChangeFunctions.length; ++i){ var f = stateChangeFunctions[i]; if(typeof f == 'string') f = new Function('event', f); panoramaAudio.bind('stateChange', f, this); } audio = panoramaAudio; } audios.push(audio); media.set('audios', audios); } return this.playGlobalAudio(audio, endCallback); },
  "setCameraSameSpotAsMedia": function(camera, media){  var player = this.getCurrentPlayerWithMedia(media); if(player != undefined) { var position = camera.get('initialPosition'); position.set('yaw', player.get('yaw')); position.set('pitch', player.get('pitch')); position.set('hfov', player.get('hfov')); } },
  "playGlobalAudio": function(audio, endCallback){  var endFunction = function(){ audio.unbind('end', endFunction, this); this.stopGlobalAudio(audio); if(endCallback) endCallback(); }; audio = this.getGlobalAudio(audio); var audios = window.currentGlobalAudios; if(!audios){ audios = window.currentGlobalAudios = {}; } audios[audio.get('id')] = audio; if(audio.get('state') == 'playing'){ return audio; } if(!audio.get('loop')){ audio.bind('end', endFunction, this); } audio.play(); return audio; },
  "setMediaBehaviour": function(playList, index, mediaDispatcher){  var self = this; var stateChangeFunction = function(event){ if(event.data.state == 'stopped'){ dispose.call(this, true); } }; var onBeginFunction = function() { item.unbind('begin', onBeginFunction, self); var media = item.get('media'); if(media.get('class') != 'Panorama' || (media.get('camera') != undefined && media.get('camera').get('initialSequence') != undefined)){ player.bind('stateChange', stateChangeFunction, self); } }; var changeFunction = function(){ var index = playListDispatcher.get('selectedIndex'); if(index != -1){ indexDispatcher = index; dispose.call(this, false); } }; var disposeCallback = function(){ dispose.call(this, false); }; var dispose = function(forceDispose){ if(!playListDispatcher) return; var media = item.get('media'); if((media.get('class') == 'Video360' || media.get('class') == 'Video') && media.get('loop') == true && !forceDispose) return; playList.set('selectedIndex', -1); if(panoramaSequence && panoramaSequenceIndex != -1){ if(panoramaSequence) { if(panoramaSequenceIndex > 0 && panoramaSequence.get('movements')[panoramaSequenceIndex-1].get('class') == 'TargetPanoramaCameraMovement'){ var initialPosition = camera.get('initialPosition'); var oldYaw = initialPosition.get('yaw'); var oldPitch = initialPosition.get('pitch'); var oldHfov = initialPosition.get('hfov'); var previousMovement = panoramaSequence.get('movements')[panoramaSequenceIndex-1]; initialPosition.set('yaw', previousMovement.get('targetYaw')); initialPosition.set('pitch', previousMovement.get('targetPitch')); initialPosition.set('hfov', previousMovement.get('targetHfov')); var restoreInitialPositionFunction = function(event){ initialPosition.set('yaw', oldYaw); initialPosition.set('pitch', oldPitch); initialPosition.set('hfov', oldHfov); itemDispatcher.unbind('end', restoreInitialPositionFunction, this); }; itemDispatcher.bind('end', restoreInitialPositionFunction, this); } panoramaSequence.set('movementIndex', panoramaSequenceIndex); } } if(player){ item.unbind('begin', onBeginFunction, this); player.unbind('stateChange', stateChangeFunction, this); for(var i = 0; i<buttons.length; ++i) { buttons[i].unbind('click', disposeCallback, this); } } if(sameViewerArea){ var currentMedia = this.getMediaFromPlayer(player); if(currentMedia == undefined || currentMedia == item.get('media')){ playListDispatcher.set('selectedIndex', indexDispatcher); } if(playList != playListDispatcher) playListDispatcher.unbind('change', changeFunction, this); } else{ viewerArea.set('visible', viewerVisibility); } playListDispatcher = undefined; }; var mediaDispatcherByParam = mediaDispatcher != undefined; if(!mediaDispatcher){ var currentIndex = playList.get('selectedIndex'); var currentPlayer = (currentIndex != -1) ? playList.get('items')[playList.get('selectedIndex')].get('player') : this.getActivePlayerWithViewer(this.MainViewer); if(currentPlayer) { mediaDispatcher = this.getMediaFromPlayer(currentPlayer); } } var playListDispatcher = mediaDispatcher ? this.getPlayListWithMedia(mediaDispatcher, true) : undefined; if(!playListDispatcher){ playList.set('selectedIndex', index); return; } var indexDispatcher = playListDispatcher.get('selectedIndex'); if(playList.get('selectedIndex') == index || indexDispatcher == -1){ return; } var item = playList.get('items')[index]; var itemDispatcher = playListDispatcher.get('items')[indexDispatcher]; var player = item.get('player'); var viewerArea = player.get('viewerArea'); var viewerVisibility = viewerArea.get('visible'); var sameViewerArea = viewerArea == itemDispatcher.get('player').get('viewerArea'); if(sameViewerArea){ if(playList != playListDispatcher){ playListDispatcher.set('selectedIndex', -1); playListDispatcher.bind('change', changeFunction, this); } } else{ viewerArea.set('visible', true); } var panoramaSequenceIndex = -1; var panoramaSequence = undefined; var camera = itemDispatcher.get('camera'); if(camera){ panoramaSequence = camera.get('initialSequence'); if(panoramaSequence) { panoramaSequenceIndex = panoramaSequence.get('movementIndex'); } } playList.set('selectedIndex', index); var buttons = []; var addButtons = function(property){ var value = player.get(property); if(value == undefined) return; if(Array.isArray(value)) buttons = buttons.concat(value); else buttons.push(value); }; addButtons('buttonStop'); for(var i = 0; i<buttons.length; ++i) { buttons[i].bind('click', disposeCallback, this); } if(player != itemDispatcher.get('player') || !mediaDispatcherByParam){ item.bind('begin', onBeginFunction, self); } this.executeFunctionWhenChange(playList, index, disposeCallback); },
  "visibleComponentsIfPlayerFlagEnabled": function(components, playerFlag){  var enabled = this.get(playerFlag); for(var i in components){ components[i].set('visible', enabled); } },
  "getPlayListItems": function(media, player){  var itemClass = (function() { switch(media.get('class')) { case 'Panorama': case 'LivePanorama': case 'HDRPanorama': return 'PanoramaPlayListItem'; case 'Video360': return 'Video360PlayListItem'; case 'PhotoAlbum': return 'PhotoAlbumPlayListItem'; case 'Map': return 'MapPlayListItem'; case 'Video': return 'VideoPlayListItem'; } })(); if (itemClass != undefined) { var items = this.getByClassName(itemClass); for (var i = items.length-1; i>=0; --i) { var item = items[i]; if(item.get('media') != media || (player != undefined && item.get('player') != player)) { items.splice(i, 1); } } return items; } else { return []; } },
  "getMediaWidth": function(media){  switch(media.get('class')){ case 'Video360': var res = media.get('video'); if(res instanceof Array){ var maxW=0; for(var i=0; i<res.length; i++){ var r = res[i]; if(r.get('width') > maxW) maxW = r.get('width'); } return maxW; }else{ return r.get('width') } default: return media.get('width'); } },
  "getActivePlayerWithViewer": function(viewerArea){  var players = this.getByClassName('PanoramaPlayer'); players = players.concat(this.getByClassName('VideoPlayer')); players = players.concat(this.getByClassName('Video360Player')); players = players.concat(this.getByClassName('PhotoAlbumPlayer')); players = players.concat(this.getByClassName('MapPlayer')); var i = players.length; while(i-- > 0){ var player = players[i]; if(player.get('viewerArea') == viewerArea) { var playerClass = player.get('class'); if(playerClass == 'PanoramaPlayer' && (player.get('panorama') != undefined || player.get('video') != undefined)) return player; else if((playerClass == 'VideoPlayer' || playerClass == 'Video360Player') && player.get('video') != undefined) return player; else if(playerClass == 'PhotoAlbumPlayer' && player.get('photoAlbum') != undefined) return player; else if(playerClass == 'MapPlayer' && player.get('map') != undefined) return player; } } return undefined; },
  "getCurrentPlayers": function(){  var players = this.getByClassName('PanoramaPlayer'); players = players.concat(this.getByClassName('VideoPlayer')); players = players.concat(this.getByClassName('Video360Player')); players = players.concat(this.getByClassName('PhotoAlbumPlayer')); return players; },
  "getPlayListWithMedia": function(media, onlySelected){  var playLists = this.getByClassName('PlayList'); for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; if(onlySelected && playList.get('selectedIndex') == -1) continue; if(this.getPlayListItemByMedia(playList, media) != undefined) return playList; } return undefined; },
  "setOverlayBehaviour": function(overlay, media, action){  var executeFunc = function() { switch(action){ case 'triggerClick': this.triggerOverlay(overlay, 'click'); break; case 'stop': case 'play': case 'pause': overlay[action](); break; case 'togglePlayPause': case 'togglePlayStop': if(overlay.get('state') == 'playing') overlay[action == 'togglePlayPause' ? 'pause' : 'stop'](); else overlay.play(); break; } if(window.overlaysDispatched == undefined) window.overlaysDispatched = {}; var id = overlay.get('id'); window.overlaysDispatched[id] = true; setTimeout(function(){ delete window.overlaysDispatched[id]; }, 2000); }; if(window.overlaysDispatched != undefined && overlay.get('id') in window.overlaysDispatched) return; var playList = this.getPlayListWithMedia(media, true); if(playList != undefined){ var item = this.getPlayListItemByMedia(playList, media); if(playList.get('items').indexOf(item) != playList.get('selectedIndex')){ var beginFunc = function(e){ item.unbind('begin', beginFunc, this); executeFunc.call(this); }; item.bind('begin', beginFunc, this); return; } } executeFunc.call(this); },
  "stopGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios){ audio = audios[audio.get('id')]; if(audio){ delete audios[audio.get('id')]; if(Object.keys(audios).length == 0){ window.currentGlobalAudios = undefined; } } } if(audio) audio.stop(); },
  "showPopupMedia": function(w, media, playList, popupMaxWidth, popupMaxHeight, autoCloseWhenFinished, stopAudios){  var self = this; var closeFunction = function(){ playList.set('selectedIndex', -1); self.MainViewer.set('toolTipEnabled', true); if(stopAudios) { self.resumeGlobalAudios(); } this.resumePlayers(playersPaused, !stopAudios); if(isVideo) { this.unbind('resize', resizeFunction, this); } w.unbind('close', closeFunction, this); }; var endFunction = function(){ w.hide(); }; var resizeFunction = function(){ var getWinValue = function(property){ return w.get(property) || 0; }; var parentWidth = self.get('actualWidth'); var parentHeight = self.get('actualHeight'); var mediaWidth = self.getMediaWidth(media); var mediaHeight = self.getMediaHeight(media); var popupMaxWidthNumber = parseFloat(popupMaxWidth) / 100; var popupMaxHeightNumber = parseFloat(popupMaxHeight) / 100; var windowWidth = popupMaxWidthNumber * parentWidth; var windowHeight = popupMaxHeightNumber * parentHeight; var footerHeight = getWinValue('footerHeight'); var headerHeight = getWinValue('headerHeight'); if(!headerHeight) { var closeButtonHeight = getWinValue('closeButtonIconHeight') + getWinValue('closeButtonPaddingTop') + getWinValue('closeButtonPaddingBottom'); var titleHeight = self.getPixels(getWinValue('titleFontSize')) + getWinValue('titlePaddingTop') + getWinValue('titlePaddingBottom'); headerHeight = closeButtonHeight > titleHeight ? closeButtonHeight : titleHeight; headerHeight += getWinValue('headerPaddingTop') + getWinValue('headerPaddingBottom'); } var contentWindowWidth = windowWidth - getWinValue('bodyPaddingLeft') - getWinValue('bodyPaddingRight') - getWinValue('paddingLeft') - getWinValue('paddingRight'); var contentWindowHeight = windowHeight - headerHeight - footerHeight - getWinValue('bodyPaddingTop') - getWinValue('bodyPaddingBottom') - getWinValue('paddingTop') - getWinValue('paddingBottom'); var parentAspectRatio = contentWindowWidth / contentWindowHeight; var mediaAspectRatio = mediaWidth / mediaHeight; if(parentAspectRatio > mediaAspectRatio) { windowWidth = contentWindowHeight * mediaAspectRatio + getWinValue('bodyPaddingLeft') + getWinValue('bodyPaddingRight') + getWinValue('paddingLeft') + getWinValue('paddingRight'); } else { windowHeight = contentWindowWidth / mediaAspectRatio + headerHeight + footerHeight + getWinValue('bodyPaddingTop') + getWinValue('bodyPaddingBottom') + getWinValue('paddingTop') + getWinValue('paddingBottom'); } if(windowWidth > parentWidth * popupMaxWidthNumber) { windowWidth = parentWidth * popupMaxWidthNumber; } if(windowHeight > parentHeight * popupMaxHeightNumber) { windowHeight = parentHeight * popupMaxHeightNumber; } w.set('width', windowWidth); w.set('height', windowHeight); w.set('x', (parentWidth - getWinValue('actualWidth')) * 0.5); w.set('y', (parentHeight - getWinValue('actualHeight')) * 0.5); }; if(autoCloseWhenFinished){ this.executeFunctionWhenChange(playList, 0, endFunction); } var mediaClass = media.get('class'); var isVideo = mediaClass == 'Video' || mediaClass == 'Video360'; playList.set('selectedIndex', 0); if(isVideo){ this.bind('resize', resizeFunction, this); resizeFunction(); playList.get('items')[0].get('player').play(); } else { w.set('width', popupMaxWidth); w.set('height', popupMaxHeight); } this.MainViewer.set('toolTipEnabled', false); if(stopAudios) { this.pauseGlobalAudios(); } var playersPaused = this.pauseCurrentPlayers(!stopAudios); w.bind('close', closeFunction, this); w.show(this, true); },
  "playAudioList": function(audios){  if(audios.length == 0) return; var currentAudioCount = -1; var currentAudio; var playGlobalAudioFunction = this.playGlobalAudio; var playNext = function(){ if(++currentAudioCount >= audios.length) currentAudioCount = 0; currentAudio = audios[currentAudioCount]; playGlobalAudioFunction(currentAudio, playNext); }; playNext(); },
  "showComponentsWhileMouseOver": function(parentComponent, components, durationVisibleWhileOut){  var setVisibility = function(visible){ for(var i = 0, length = components.length; i<length; i++){ var component = components[i]; if(component.get('class') == 'HTMLText' && (component.get('html') == '' || component.get('html') == undefined)) { continue; } component.set('visible', visible); } }; if (this.rootPlayer.get('touchDevice') == true){ setVisibility(true); } else { var timeoutID = -1; var rollOverFunction = function(){ setVisibility(true); if(timeoutID >= 0) clearTimeout(timeoutID); parentComponent.unbind('rollOver', rollOverFunction, this); parentComponent.bind('rollOut', rollOutFunction, this); }; var rollOutFunction = function(){ var timeoutFunction = function(){ setVisibility(false); parentComponent.unbind('rollOver', rollOverFunction, this); }; parentComponent.unbind('rollOut', rollOutFunction, this); parentComponent.bind('rollOver', rollOverFunction, this); timeoutID = setTimeout(timeoutFunction, durationVisibleWhileOut); }; parentComponent.bind('rollOver', rollOverFunction, this); } },
  "pauseGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios){ audio = audios[audio.get('id')]; } if(audio.get('state') == 'playing') audio.pause(); },
  "pauseGlobalAudios": function(caller, exclude){  if (window.pauseGlobalAudiosState == undefined) window.pauseGlobalAudiosState = {}; if (window.pauseGlobalAudiosList == undefined) window.pauseGlobalAudiosList = []; if (caller in window.pauseGlobalAudiosState) { return; } var audios = this.getByClassName('Audio').concat(this.getByClassName('VideoPanoramaOverlay')); if (window.currentGlobalAudios != undefined) audios = audios.concat(Object.values(window.currentGlobalAudios)); var audiosPaused = []; var values = Object.values(window.pauseGlobalAudiosState); for (var i = 0, count = values.length; i<count; ++i) { var objAudios = values[i]; for (var j = 0; j<objAudios.length; ++j) { var a = objAudios[j]; if(audiosPaused.indexOf(a) == -1) audiosPaused.push(a); } } window.pauseGlobalAudiosState[caller] = audiosPaused; for (var i = 0, count = audios.length; i < count; ++i) { var a = audios[i]; if (a.get('state') == 'playing' && (exclude == undefined || exclude.indexOf(a) == -1)) { a.pause(); audiosPaused.push(a); } } },
  "existsKey": function(key){  return key in window; },
  "shareFacebook": function(url){  window.open('https://www.facebook.com/sharer/sharer.php?u=' + url, '_blank'); },
  "showPopupImage": function(image, toggleImage, customWidth, customHeight, showEffect, hideEffect, closeButtonProperties, autoCloseMilliSeconds, audio, stopBackgroundAudio, loadedCallback, hideCallback){  var self = this; var closed = false; var playerClickFunction = function() { zoomImage.unbind('loaded', loadedFunction, self); hideFunction(); }; var clearAutoClose = function(){ zoomImage.unbind('click', clearAutoClose, this); if(timeoutID != undefined){ clearTimeout(timeoutID); } }; var resizeFunction = function(){ setTimeout(setCloseButtonPosition, 0); }; var loadedFunction = function(){ self.unbind('click', playerClickFunction, self); veil.set('visible', true); setCloseButtonPosition(); closeButton.set('visible', true); zoomImage.unbind('loaded', loadedFunction, this); zoomImage.bind('userInteractionStart', userInteractionStartFunction, this); zoomImage.bind('userInteractionEnd', userInteractionEndFunction, this); zoomImage.bind('resize', resizeFunction, this); timeoutID = setTimeout(timeoutFunction, 200); }; var timeoutFunction = function(){ timeoutID = undefined; if(autoCloseMilliSeconds){ var autoCloseFunction = function(){ hideFunction(); }; zoomImage.bind('click', clearAutoClose, this); timeoutID = setTimeout(autoCloseFunction, autoCloseMilliSeconds); } zoomImage.bind('backgroundClick', hideFunction, this); if(toggleImage) { zoomImage.bind('click', toggleFunction, this); zoomImage.set('imageCursor', 'hand'); } closeButton.bind('click', hideFunction, this); if(loadedCallback) loadedCallback(); }; var hideFunction = function() { self.MainViewer.set('toolTipEnabled', true); closed = true; if(timeoutID) clearTimeout(timeoutID); if (timeoutUserInteractionID) clearTimeout(timeoutUserInteractionID); if(autoCloseMilliSeconds) clearAutoClose(); if(hideCallback) hideCallback(); zoomImage.set('visible', false); if(hideEffect && hideEffect.get('duration') > 0){ hideEffect.bind('end', endEffectFunction, this); } else{ zoomImage.set('image', null); } closeButton.set('visible', false); veil.set('visible', false); self.unbind('click', playerClickFunction, self); zoomImage.unbind('backgroundClick', hideFunction, this); zoomImage.unbind('userInteractionStart', userInteractionStartFunction, this); zoomImage.unbind('userInteractionEnd', userInteractionEndFunction, this, true); zoomImage.unbind('resize', resizeFunction, this); if(toggleImage) { zoomImage.unbind('click', toggleFunction, this); zoomImage.set('cursor', 'default'); } closeButton.unbind('click', hideFunction, this); self.resumePlayers(playersPaused, audio == null || stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ self.resumeGlobalAudios(); } self.stopGlobalAudio(audio); } }; var endEffectFunction = function() { zoomImage.set('image', null); hideEffect.unbind('end', endEffectFunction, this); }; var toggleFunction = function() { zoomImage.set('image', isToggleVisible() ? image : toggleImage); }; var isToggleVisible = function() { return zoomImage.get('image') == toggleImage; }; var setCloseButtonPosition = function() { var right = zoomImage.get('actualWidth') - zoomImage.get('imageLeft') - zoomImage.get('imageWidth') + 10; var top = zoomImage.get('imageTop') + 10; if(right < 10) right = 10; if(top < 10) top = 10; closeButton.set('right', right); closeButton.set('top', top); }; var userInteractionStartFunction = function() { if(timeoutUserInteractionID){ clearTimeout(timeoutUserInteractionID); timeoutUserInteractionID = undefined; } else{ closeButton.set('visible', false); } }; var userInteractionEndFunction = function() { if(!closed){ timeoutUserInteractionID = setTimeout(userInteractionTimeoutFunction, 300); } }; var userInteractionTimeoutFunction = function() { timeoutUserInteractionID = undefined; closeButton.set('visible', true); setCloseButtonPosition(); }; this.MainViewer.set('toolTipEnabled', false); var veil = this.veilPopupPanorama; var zoomImage = this.zoomImagePopupPanorama; var closeButton = this.closeButtonPopupPanorama; if(closeButtonProperties){ for(var key in closeButtonProperties){ closeButton.set(key, closeButtonProperties[key]); } } var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ this.pauseGlobalAudios(); } this.playGlobalAudio(audio); } var timeoutID = undefined; var timeoutUserInteractionID = undefined; zoomImage.bind('loaded', loadedFunction, this); setTimeout(function(){ self.bind('click', playerClickFunction, self, false); }, 0); zoomImage.set('image', image); zoomImage.set('customWidth', customWidth); zoomImage.set('customHeight', customHeight); zoomImage.set('showEffect', showEffect); zoomImage.set('hideEffect', hideEffect); zoomImage.set('visible', true); return zoomImage; },
  "setComponentVisibility": function(component, visible, applyAt, effect, propertyEffect, ignoreClearTimeout){  var keepVisibility = this.getKey('keepVisibility_' + component.get('id')); if(keepVisibility) return; this.unregisterKey('visibility_'+component.get('id')); var changeVisibility = function(){ if(effect && propertyEffect){ component.set(propertyEffect, effect); } component.set('visible', visible); if(component.get('class') == 'ViewerArea'){ try{ if(visible) component.restart(); else if(component.get('playbackState') == 'playing') component.pause(); } catch(e){}; } }; var effectTimeoutName = 'effectTimeout_'+component.get('id'); if(!ignoreClearTimeout && window.hasOwnProperty(effectTimeoutName)){ var effectTimeout = window[effectTimeoutName]; if(effectTimeout instanceof Array){ for(var i=0; i<effectTimeout.length; i++){ clearTimeout(effectTimeout[i]) } }else{ clearTimeout(effectTimeout); } delete window[effectTimeoutName]; } else if(visible == component.get('visible') && !ignoreClearTimeout) return; if(applyAt && applyAt > 0){ var effectTimeout = setTimeout(function(){ if(window[effectTimeoutName] instanceof Array) { var arrayTimeoutVal = window[effectTimeoutName]; var index = arrayTimeoutVal.indexOf(effectTimeout); arrayTimeoutVal.splice(index, 1); if(arrayTimeoutVal.length == 0){ delete window[effectTimeoutName]; } }else{ delete window[effectTimeoutName]; } changeVisibility(); }, applyAt); if(window.hasOwnProperty(effectTimeoutName)){ window[effectTimeoutName] = [window[effectTimeoutName], effectTimeout]; }else{ window[effectTimeoutName] = effectTimeout; } } else{ changeVisibility(); } },
  "shareTwitter": function(url){  window.open('https://twitter.com/intent/tweet?source=webclient&url=' + url, '_blank'); },
  "setMapLocation": function(panoramaPlayListItem, mapPlayer){  var resetFunction = function(){ panoramaPlayListItem.unbind('stop', resetFunction, this); player.set('mapPlayer', null); }; panoramaPlayListItem.bind('stop', resetFunction, this); var player = panoramaPlayListItem.get('player'); player.set('mapPlayer', mapPlayer); },
  "executeFunctionWhenChange": function(playList, index, endFunction, changeFunction){  var endObject = undefined; var changePlayListFunction = function(event){ if(event.data.previousSelectedIndex == index){ if(changeFunction) changeFunction.call(this); if(endFunction && endObject) endObject.unbind('end', endFunction, this); playList.unbind('change', changePlayListFunction, this); } }; if(endFunction){ var playListItem = playList.get('items')[index]; if(playListItem.get('class') == 'PanoramaPlayListItem'){ var camera = playListItem.get('camera'); if(camera != undefined) endObject = camera.get('initialSequence'); if(endObject == undefined) endObject = camera.get('idleSequence'); } else{ endObject = playListItem.get('media'); } if(endObject){ endObject.bind('end', endFunction, this); } } playList.bind('change', changePlayListFunction, this); },
  "setEndToItemIndex": function(playList, fromIndex, toIndex){  var endFunction = function(){ if(playList.get('selectedIndex') == fromIndex) playList.set('selectedIndex', toIndex); }; this.executeFunctionWhenChange(playList, fromIndex, endFunction); },
  "syncPlaylists": function(playLists){  var changeToMedia = function(media, playListDispatched){ for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; if(playList != playListDispatched){ var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ if(items[j].get('media') == media){ if(playList.get('selectedIndex') != j){ playList.set('selectedIndex', j); } break; } } } } }; var changeFunction = function(event){ var playListDispatched = event.source; var selectedIndex = playListDispatched.get('selectedIndex'); if(selectedIndex < 0) return; var media = playListDispatched.get('items')[selectedIndex].get('media'); changeToMedia(media, playListDispatched); }; var mapPlayerChangeFunction = function(event){ var panoramaMapLocation = event.source.get('panoramaMapLocation'); if(panoramaMapLocation){ var map = panoramaMapLocation.get('map'); changeToMedia(map); } }; for(var i = 0, count = playLists.length; i<count; ++i){ playLists[i].bind('change', changeFunction, this); } var mapPlayers = this.getByClassName('MapPlayer'); for(var i = 0, count = mapPlayers.length; i<count; ++i){ mapPlayers[i].bind('panoramaMapLocation_change', mapPlayerChangeFunction, this); } },
  "shareWhatsapp": function(url){  window.open('https://api.whatsapp.com/send/?text=' + encodeURIComponent(url), '_blank'); },
  "stopAndGoCamera": function(camera, ms){  var sequence = camera.get('initialSequence'); sequence.pause(); var timeoutFunction = function(){ sequence.play(); }; setTimeout(timeoutFunction, ms); },
  "initGA": function(){  var sendFunc = function(category, event, label) { ga('send', 'event', category, event, label); }; var media = this.getByClassName('Panorama'); media = media.concat(this.getByClassName('Video360')); media = media.concat(this.getByClassName('Map')); for(var i = 0, countI = media.length; i<countI; ++i){ var m = media[i]; var mediaLabel = m.get('label'); var overlays = this.getOverlays(m); for(var j = 0, countJ = overlays.length; j<countJ; ++j){ var overlay = overlays[j]; var overlayLabel = overlay.get('data') != undefined ? mediaLabel + ' - ' + overlay.get('data')['label'] : mediaLabel; switch(overlay.get('class')) { case 'HotspotPanoramaOverlay': case 'HotspotMapOverlay': var areas = overlay.get('areas'); for (var z = 0; z<areas.length; ++z) { areas[z].bind('click', sendFunc.bind(this, 'Hotspot', 'click', overlayLabel), this); } break; case 'CeilingCapPanoramaOverlay': case 'TripodCapPanoramaOverlay': overlay.bind('click', sendFunc.bind(this, 'Cap', 'click', overlayLabel), this); break; } } } var components = this.getByClassName('Button'); components = components.concat(this.getByClassName('IconButton')); for(var i = 0, countI = components.length; i<countI; ++i){ var c = components[i]; var componentLabel = c.get('data')['name']; c.bind('click', sendFunc.bind(this, 'Skin', 'click', componentLabel), this); } var items = this.getByClassName('PlayListItem'); var media2Item = {}; for(var i = 0, countI = items.length; i<countI; ++i) { var item = items[i]; var media = item.get('media'); if(!(media.get('id') in media2Item)) { item.bind('begin', sendFunc.bind(this, 'Media', 'play', media.get('label')), this); media2Item[media.get('id')] = item; } } },
  "getPlayListItemByMedia": function(playList, media){  var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ var item = items[j]; if(item.get('media') == media) return item; } return undefined; },
  "openLink": function(url, name){  if(url == location.href) { return; } var isElectron = (window && window.process && window.process.versions && window.process.versions['electron']) || (navigator && navigator.userAgent && navigator.userAgent.indexOf('Electron') >= 0); if (name == '_blank' && isElectron) { if (url.startsWith('/')) { var r = window.location.href.split('/'); r.pop(); url = r.join('/') + url; } var extension = url.split('.').pop().toLowerCase(); if(extension != 'pdf' || url.startsWith('file://')) { var shell = window.require('electron').shell; shell.openExternal(url); } else { window.open(url, name); } } else if(isElectron && (name == '_top' || name == '_self')) { window.location = url; } else { var newWindow = window.open(url, name); newWindow.focus(); } },
  "getKey": function(key){  return window[key]; }
 },
 "scrollBarMargin": 2,
 "desktopMipmappingEnabled": false,
 "contentOpaque": false,
 "minHeight": 20,
 "defaultVRPointer": "laser",
 "downloadEnabled": true,
 "layout": "absolute",
 "borderSize": 0,
 "scrollBarWidth": 10,
 "minWidth": 20,
 "backgroundPreloadEnabled": true,
 "buttonToggleMute": "this.IconButton_E5B8B54E_FD93_039E_41E4_16E8436FBD35",
 "horizontalAlign": "left",
 "paddingBottom": 0,
 "data": {
  "name": "Player435"
 },
 "mouseWheelEnabled": true,
 "height": "100%",
 "definitions": [{
 "hfovMax": 130,
 "label": "Ph\u00f2ng th\u00ed nhi\u1ec7m h\u1ec7 th\u1ed1ng \u0111i\u1ec7n view 2",
 "id": "panorama_342FDDE8_2413_6493_41BF_AC46041A8646",
 "overlays": [
  "this.overlay_339722EE_2413_1C6F_41C0_3AD64CD02836"
 ],
 "pitch": 0,
 "vfov": 180,
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_342B349F_2413_24AC_41B9_DADBE85884B1",
   "class": "AdjacentPanorama"
  }
 ],
 "thumbnailUrl": "media/panorama_342FDDE8_2413_6493_41BF_AC46041A8646_t.jpg",
 "hfovMin": "120%",
 "class": "Panorama",
 "hfov": 360,
 "partial": false,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_342FDDE8_2413_6493_41BF_AC46041A8646_0/f/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "rowCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_342FDDE8_2413_6493_41BF_AC46041A8646_0/f/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_342FDDE8_2413_6493_41BF_AC46041A8646_0/f/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_342FDDE8_2413_6493_41BF_AC46041A8646_0/f/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_342FDDE8_2413_6493_41BF_AC46041A8646_0/l/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "rowCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_342FDDE8_2413_6493_41BF_AC46041A8646_0/l/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_342FDDE8_2413_6493_41BF_AC46041A8646_0/l/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_342FDDE8_2413_6493_41BF_AC46041A8646_0/l/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_342FDDE8_2413_6493_41BF_AC46041A8646_0/u/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "rowCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_342FDDE8_2413_6493_41BF_AC46041A8646_0/u/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_342FDDE8_2413_6493_41BF_AC46041A8646_0/u/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_342FDDE8_2413_6493_41BF_AC46041A8646_0/u/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_342FDDE8_2413_6493_41BF_AC46041A8646_0/r/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "rowCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_342FDDE8_2413_6493_41BF_AC46041A8646_0/r/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_342FDDE8_2413_6493_41BF_AC46041A8646_0/r/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_342FDDE8_2413_6493_41BF_AC46041A8646_0/r/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_342FDDE8_2413_6493_41BF_AC46041A8646_0/b/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "rowCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_342FDDE8_2413_6493_41BF_AC46041A8646_0/b/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_342FDDE8_2413_6493_41BF_AC46041A8646_0/b/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_342FDDE8_2413_6493_41BF_AC46041A8646_0/b/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_342FDDE8_2413_6493_41BF_AC46041A8646_0/d/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "rowCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_342FDDE8_2413_6493_41BF_AC46041A8646_0/d/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_342FDDE8_2413_6493_41BF_AC46041A8646_0/d/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_342FDDE8_2413_6493_41BF_AC46041A8646_0/d/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "thumbnailUrl": "media/panorama_342FDDE8_2413_6493_41BF_AC46041A8646_t.jpg"
  }
 ]
},
{
 "initialPosition": {
  "yaw": -98.55,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "id": "camera_37021FCD_3924_63A4_41B0_3F242D082D40"
},
{
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_342FC184_2413_1C93_41A0_8E7108979C5B_camera"
},
{
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_342BDCA9_2410_E495_41A9_07B2F5EA07A9_camera"
},
{
 "hfovMax": 130,
 "label": "H\u00e0nh lang t\u1ea7ng 5 (nh\u00e0 8 t\u1ea7ng)",
 "id": "panorama_342FC184_2413_1C93_41A0_8E7108979C5B",
 "overlays": [
  "this.overlay_3DBC7F19_2417_65B4_4193_13F0734E74D0",
  "this.overlay_3CA03B2F_2411_6DED_41C0_609050F20E2C",
  "this.overlay_3D2D1D96_2411_24BF_419A_9CFC55FBB198"
 ],
 "pitch": 0,
 "vfov": 180,
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_342D5EBB_2413_24F5_41A3_4DE7DBE219BD",
   "yaw": 68.82,
   "class": "AdjacentPanorama",
   "distance": 1,
   "backwardYaw": 73.69
  },
  {
   "panorama": "this.panorama_342DC6C8_2410_E493_41B9_7E20A878670E",
   "yaw": 169.6,
   "class": "AdjacentPanorama",
   "distance": 1,
   "backwardYaw": -6.75
  },
  {
   "panorama": "this.panorama_342B429A_2413_1CB7_41B3_2AB31B934588",
   "yaw": 7.05,
   "class": "AdjacentPanorama",
   "distance": 1,
   "backwardYaw": 176.95
  }
 ],
 "thumbnailUrl": "media/panorama_342FC184_2413_1C93_41A0_8E7108979C5B_t.jpg",
 "hfovMin": "120%",
 "class": "Panorama",
 "hfov": 360,
 "partial": false,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_342FC184_2413_1C93_41A0_8E7108979C5B_0/f/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "rowCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_342FC184_2413_1C93_41A0_8E7108979C5B_0/f/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_342FC184_2413_1C93_41A0_8E7108979C5B_0/f/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_342FC184_2413_1C93_41A0_8E7108979C5B_0/f/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_342FC184_2413_1C93_41A0_8E7108979C5B_0/l/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "rowCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_342FC184_2413_1C93_41A0_8E7108979C5B_0/l/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_342FC184_2413_1C93_41A0_8E7108979C5B_0/l/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_342FC184_2413_1C93_41A0_8E7108979C5B_0/l/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_342FC184_2413_1C93_41A0_8E7108979C5B_0/u/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "rowCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_342FC184_2413_1C93_41A0_8E7108979C5B_0/u/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_342FC184_2413_1C93_41A0_8E7108979C5B_0/u/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_342FC184_2413_1C93_41A0_8E7108979C5B_0/u/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_342FC184_2413_1C93_41A0_8E7108979C5B_0/r/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "rowCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_342FC184_2413_1C93_41A0_8E7108979C5B_0/r/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_342FC184_2413_1C93_41A0_8E7108979C5B_0/r/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_342FC184_2413_1C93_41A0_8E7108979C5B_0/r/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_342FC184_2413_1C93_41A0_8E7108979C5B_0/b/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "rowCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_342FC184_2413_1C93_41A0_8E7108979C5B_0/b/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_342FC184_2413_1C93_41A0_8E7108979C5B_0/b/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_342FC184_2413_1C93_41A0_8E7108979C5B_0/b/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_342FC184_2413_1C93_41A0_8E7108979C5B_0/d/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "rowCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_342FC184_2413_1C93_41A0_8E7108979C5B_0/d/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_342FC184_2413_1C93_41A0_8E7108979C5B_0/d/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_342FC184_2413_1C93_41A0_8E7108979C5B_0/d/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "thumbnailUrl": "media/panorama_342FC184_2413_1C93_41A0_8E7108979C5B_t.jpg"
  }
 ]
},
{
 "initialPosition": {
  "yaw": -96.86,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "id": "camera_3431F085_3925_9DA4_41C7_AF491BC58BB5"
},
{
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_342D84E2_2413_E497_4196_24F58906D341_camera"
},
{
 "hfovMax": 130,
 "label": "C\u1eeda ph\u00f2ng th\u1ef1c h\u00e0nh \u0111i\u1ec7n t\u1eed",
 "id": "panorama_342DC6C8_2410_E493_41B9_7E20A878670E",
 "overlays": [
  "this.overlay_3DE2ABD5_2411_2CBD_41B0_03B9965ED1E8",
  "this.overlay_3DEFD5A8_2411_2493_41AA_ADB9ED2984D9"
 ],
 "pitch": 0,
 "vfov": 180,
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_342E346A_2413_7B97_41B3_D351C68A0619",
   "yaw": 81.65,
   "class": "AdjacentPanorama",
   "distance": 1,
   "backwardYaw": -141.94
  },
  {
   "panorama": "this.panorama_342FC184_2413_1C93_41A0_8E7108979C5B",
   "yaw": -6.75,
   "class": "AdjacentPanorama",
   "distance": 1,
   "backwardYaw": 169.6
  }
 ],
 "thumbnailUrl": "media/panorama_342DC6C8_2410_E493_41B9_7E20A878670E_t.jpg",
 "hfovMin": "120%",
 "class": "Panorama",
 "hfov": 360,
 "partial": false,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_342DC6C8_2410_E493_41B9_7E20A878670E_0/f/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "rowCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_342DC6C8_2410_E493_41B9_7E20A878670E_0/f/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_342DC6C8_2410_E493_41B9_7E20A878670E_0/f/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_342DC6C8_2410_E493_41B9_7E20A878670E_0/f/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_342DC6C8_2410_E493_41B9_7E20A878670E_0/l/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "rowCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_342DC6C8_2410_E493_41B9_7E20A878670E_0/l/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_342DC6C8_2410_E493_41B9_7E20A878670E_0/l/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_342DC6C8_2410_E493_41B9_7E20A878670E_0/l/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_342DC6C8_2410_E493_41B9_7E20A878670E_0/u/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "rowCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_342DC6C8_2410_E493_41B9_7E20A878670E_0/u/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_342DC6C8_2410_E493_41B9_7E20A878670E_0/u/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_342DC6C8_2410_E493_41B9_7E20A878670E_0/u/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_342DC6C8_2410_E493_41B9_7E20A878670E_0/r/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "rowCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_342DC6C8_2410_E493_41B9_7E20A878670E_0/r/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_342DC6C8_2410_E493_41B9_7E20A878670E_0/r/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_342DC6C8_2410_E493_41B9_7E20A878670E_0/r/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_342DC6C8_2410_E493_41B9_7E20A878670E_0/b/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "rowCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_342DC6C8_2410_E493_41B9_7E20A878670E_0/b/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_342DC6C8_2410_E493_41B9_7E20A878670E_0/b/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_342DC6C8_2410_E493_41B9_7E20A878670E_0/b/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_342DC6C8_2410_E493_41B9_7E20A878670E_0/d/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "rowCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_342DC6C8_2410_E493_41B9_7E20A878670E_0/d/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_342DC6C8_2410_E493_41B9_7E20A878670E_0/d/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_342DC6C8_2410_E493_41B9_7E20A878670E_0/d/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "thumbnailUrl": "media/panorama_342DC6C8_2410_E493_41B9_7E20A878670E_t.jpg"
  }
 ]
},
{
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_342E346A_2413_7B97_41B3_D351C68A0619_camera"
},
{
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_342FDDE8_2413_6493_41BF_AC46041A8646_camera"
},
{
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_34280C43_2413_2B94_41B4_A77E6ADEC474_camera"
},
{
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_342AC208_2413_3F93_4191_930FEFDE0ACE_camera"
},
{
 "hfovMax": 130,
 "label": "Ph\u00f2ng th\u1ef1c h\u00e0nh \u0111i\u1ec7n t\u1eeb view 1",
 "id": "panorama_342E346A_2413_7B97_41B3_D351C68A0619",
 "overlays": [
  "this.overlay_3E7FA3AE_241F_3CEF_41B4_A58C30AF6002",
  "this.overlay_3F4C831B_2411_3DB5_41A2_8601E6FE9DFA"
 ],
 "pitch": 0,
 "vfov": 180,
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_34281A46_2413_6F9F_4194_314606A9EFDA",
   "class": "AdjacentPanorama"
  },
  {
   "panorama": "this.panorama_342DC6C8_2410_E493_41B9_7E20A878670E",
   "yaw": -141.94,
   "class": "AdjacentPanorama",
   "distance": 1,
   "backwardYaw": 81.65
  }
 ],
 "thumbnailUrl": "media/panorama_342E346A_2413_7B97_41B3_D351C68A0619_t.jpg",
 "hfovMin": "120%",
 "class": "Panorama",
 "hfov": 360,
 "partial": false,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_342E346A_2413_7B97_41B3_D351C68A0619_0/f/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "rowCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_342E346A_2413_7B97_41B3_D351C68A0619_0/f/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_342E346A_2413_7B97_41B3_D351C68A0619_0/f/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_342E346A_2413_7B97_41B3_D351C68A0619_0/f/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_342E346A_2413_7B97_41B3_D351C68A0619_0/l/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "rowCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_342E346A_2413_7B97_41B3_D351C68A0619_0/l/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_342E346A_2413_7B97_41B3_D351C68A0619_0/l/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_342E346A_2413_7B97_41B3_D351C68A0619_0/l/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_342E346A_2413_7B97_41B3_D351C68A0619_0/u/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "rowCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_342E346A_2413_7B97_41B3_D351C68A0619_0/u/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_342E346A_2413_7B97_41B3_D351C68A0619_0/u/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_342E346A_2413_7B97_41B3_D351C68A0619_0/u/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_342E346A_2413_7B97_41B3_D351C68A0619_0/r/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "rowCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_342E346A_2413_7B97_41B3_D351C68A0619_0/r/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_342E346A_2413_7B97_41B3_D351C68A0619_0/r/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_342E346A_2413_7B97_41B3_D351C68A0619_0/r/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_342E346A_2413_7B97_41B3_D351C68A0619_0/b/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "rowCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_342E346A_2413_7B97_41B3_D351C68A0619_0/b/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_342E346A_2413_7B97_41B3_D351C68A0619_0/b/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_342E346A_2413_7B97_41B3_D351C68A0619_0/b/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_342E346A_2413_7B97_41B3_D351C68A0619_0/d/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "rowCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_342E346A_2413_7B97_41B3_D351C68A0619_0/d/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_342E346A_2413_7B97_41B3_D351C68A0619_0/d/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_342E346A_2413_7B97_41B3_D351C68A0619_0/d/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "thumbnailUrl": "media/panorama_342E346A_2413_7B97_41B3_D351C68A0619_t.jpg"
  }
 ]
},
{
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_342BD5E7_2413_249D_41C1_23B84F82611D_camera"
},
{
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_35543A08_2410_EF93_41B5_10CEB879EE30_camera"
},
{
 "hfovMax": 130,
 "label": "Ph\u00f2ng th\u1ef1c h\u00e0nh PLC view 1",
 "id": "panorama_3428501F_2413_1BAC_41BB_DB681B99BCAA",
 "overlays": [
  "this.overlay_3F290A95_2411_6CBD_41B1_6481D32DEEF7",
  "this.overlay_387AB658_2417_67B3_4196_CD7B5A7D2C68"
 ],
 "pitch": 0,
 "vfov": 180,
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_342BD5E7_2413_249D_41C1_23B84F82611D",
   "class": "AdjacentPanorama"
  },
  {
   "panorama": "this.panorama_342BDCA9_2410_E495_41A9_07B2F5EA07A9",
   "yaw": -77.89,
   "class": "AdjacentPanorama",
   "distance": 1,
   "backwardYaw": 84.65
  }
 ],
 "thumbnailUrl": "media/panorama_3428501F_2413_1BAC_41BB_DB681B99BCAA_t.jpg",
 "hfovMin": "120%",
 "class": "Panorama",
 "hfov": 360,
 "partial": false,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_3428501F_2413_1BAC_41BB_DB681B99BCAA_0/f/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "rowCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_3428501F_2413_1BAC_41BB_DB681B99BCAA_0/f/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_3428501F_2413_1BAC_41BB_DB681B99BCAA_0/f/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_3428501F_2413_1BAC_41BB_DB681B99BCAA_0/f/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_3428501F_2413_1BAC_41BB_DB681B99BCAA_0/l/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "rowCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_3428501F_2413_1BAC_41BB_DB681B99BCAA_0/l/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_3428501F_2413_1BAC_41BB_DB681B99BCAA_0/l/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_3428501F_2413_1BAC_41BB_DB681B99BCAA_0/l/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_3428501F_2413_1BAC_41BB_DB681B99BCAA_0/u/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "rowCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_3428501F_2413_1BAC_41BB_DB681B99BCAA_0/u/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_3428501F_2413_1BAC_41BB_DB681B99BCAA_0/u/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_3428501F_2413_1BAC_41BB_DB681B99BCAA_0/u/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_3428501F_2413_1BAC_41BB_DB681B99BCAA_0/r/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "rowCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_3428501F_2413_1BAC_41BB_DB681B99BCAA_0/r/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_3428501F_2413_1BAC_41BB_DB681B99BCAA_0/r/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_3428501F_2413_1BAC_41BB_DB681B99BCAA_0/r/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_3428501F_2413_1BAC_41BB_DB681B99BCAA_0/b/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "rowCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_3428501F_2413_1BAC_41BB_DB681B99BCAA_0/b/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_3428501F_2413_1BAC_41BB_DB681B99BCAA_0/b/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_3428501F_2413_1BAC_41BB_DB681B99BCAA_0/b/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_3428501F_2413_1BAC_41BB_DB681B99BCAA_0/d/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "rowCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_3428501F_2413_1BAC_41BB_DB681B99BCAA_0/d/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_3428501F_2413_1BAC_41BB_DB681B99BCAA_0/d/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_3428501F_2413_1BAC_41BB_DB681B99BCAA_0/d/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "thumbnailUrl": "media/panorama_3428501F_2413_1BAC_41BB_DB681B99BCAA_t.jpg"
  }
 ]
},
{
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_34281A46_2413_6F9F_4194_314606A9EFDA_camera"
},
{
 "hfovMax": 130,
 "label": "Ph\u00f2ng th\u1ef1c h\u00e0nh t\u1ef1 \u0111\u1ed9ng h\u00f3a view 1",
 "id": "panorama_34280C43_2413_2B94_41B4_A77E6ADEC474",
 "overlays": [
  "this.overlay_39EDCC2E_2413_6BEF_41C0_8ABA2B7D67D9",
  "this.overlay_3A071853_2411_2BB5_41A3_2D8BDB3FE302"
 ],
 "pitch": 0,
 "vfov": 180,
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_342B429A_2413_1CB7_41B3_2AB31B934588",
   "yaw": -58.64,
   "class": "AdjacentPanorama",
   "distance": 1,
   "backwardYaw": 83.14
  },
  {
   "panorama": "this.panorama_342AC208_2413_3F93_4191_930FEFDE0ACE",
   "class": "AdjacentPanorama"
  }
 ],
 "thumbnailUrl": "media/panorama_34280C43_2413_2B94_41B4_A77E6ADEC474_t.jpg",
 "hfovMin": "120%",
 "class": "Panorama",
 "hfov": 360,
 "partial": false,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_34280C43_2413_2B94_41B4_A77E6ADEC474_0/f/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "rowCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_34280C43_2413_2B94_41B4_A77E6ADEC474_0/f/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_34280C43_2413_2B94_41B4_A77E6ADEC474_0/f/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_34280C43_2413_2B94_41B4_A77E6ADEC474_0/f/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_34280C43_2413_2B94_41B4_A77E6ADEC474_0/l/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "rowCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_34280C43_2413_2B94_41B4_A77E6ADEC474_0/l/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_34280C43_2413_2B94_41B4_A77E6ADEC474_0/l/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_34280C43_2413_2B94_41B4_A77E6ADEC474_0/l/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_34280C43_2413_2B94_41B4_A77E6ADEC474_0/u/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "rowCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_34280C43_2413_2B94_41B4_A77E6ADEC474_0/u/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_34280C43_2413_2B94_41B4_A77E6ADEC474_0/u/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_34280C43_2413_2B94_41B4_A77E6ADEC474_0/u/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_34280C43_2413_2B94_41B4_A77E6ADEC474_0/r/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "rowCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_34280C43_2413_2B94_41B4_A77E6ADEC474_0/r/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_34280C43_2413_2B94_41B4_A77E6ADEC474_0/r/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_34280C43_2413_2B94_41B4_A77E6ADEC474_0/r/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_34280C43_2413_2B94_41B4_A77E6ADEC474_0/b/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "rowCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_34280C43_2413_2B94_41B4_A77E6ADEC474_0/b/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_34280C43_2413_2B94_41B4_A77E6ADEC474_0/b/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_34280C43_2413_2B94_41B4_A77E6ADEC474_0/b/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_34280C43_2413_2B94_41B4_A77E6ADEC474_0/d/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "rowCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_34280C43_2413_2B94_41B4_A77E6ADEC474_0/d/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_34280C43_2413_2B94_41B4_A77E6ADEC474_0/d/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_34280C43_2413_2B94_41B4_A77E6ADEC474_0/d/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "thumbnailUrl": "media/panorama_34280C43_2413_2B94_41B4_A77E6ADEC474_t.jpg"
  }
 ]
},
{
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_342D5EBB_2413_24F5_41A3_4DE7DBE219BD_camera"
},
{
 "initialPosition": {
  "yaw": -81.44,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "id": "camera_35C0402D_3925_9CE4_41CA_C08B3C749FB7"
},
{
 "initialPosition": {
  "yaw": 63.05,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "id": "camera_37356FC5_3924_63A4_41B1_C888ECC650A2"
},
{
 "initialPosition": {
  "yaw": -172.95,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "id": "camera_37664FEB_3924_636C_4184_D4A5367C8AD0"
},
{
 "hfovMax": 130,
 "label": "C\u1eeda ph\u00f2ng th\u1ef1c h\u00e0nh t\u1ef1 \u0111\u1ed9ng h\u00f3a",
 "id": "panorama_342B429A_2413_1CB7_41B3_2AB31B934588",
 "overlays": [
  "this.overlay_381B2DB7_2411_24FD_4197_615317AD8AD9",
  "this.overlay_38036BDF_2411_2CAD_41C1_E5A2EBC41030",
  "this.overlay_3973BBD2_2413_2CB7_416C_12E78AC7CC4A"
 ],
 "pitch": 0,
 "vfov": 180,
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_342FC184_2413_1C93_41A0_8E7108979C5B",
   "yaw": 176.95,
   "class": "AdjacentPanorama",
   "distance": 1,
   "backwardYaw": 7.05
  },
  {
   "panorama": "this.panorama_34280C43_2413_2B94_41B4_A77E6ADEC474",
   "yaw": 83.14,
   "class": "AdjacentPanorama",
   "distance": 1,
   "backwardYaw": -58.64
  },
  {
   "panorama": "this.panorama_342BDCA9_2410_E495_41A9_07B2F5EA07A9",
   "yaw": -0.16,
   "class": "AdjacentPanorama",
   "distance": 1,
   "backwardYaw": 176.2
  }
 ],
 "thumbnailUrl": "media/panorama_342B429A_2413_1CB7_41B3_2AB31B934588_t.jpg",
 "hfovMin": "120%",
 "class": "Panorama",
 "hfov": 360,
 "partial": false,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_342B429A_2413_1CB7_41B3_2AB31B934588_0/f/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "rowCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_342B429A_2413_1CB7_41B3_2AB31B934588_0/f/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_342B429A_2413_1CB7_41B3_2AB31B934588_0/f/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_342B429A_2413_1CB7_41B3_2AB31B934588_0/f/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_342B429A_2413_1CB7_41B3_2AB31B934588_0/l/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "rowCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_342B429A_2413_1CB7_41B3_2AB31B934588_0/l/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_342B429A_2413_1CB7_41B3_2AB31B934588_0/l/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_342B429A_2413_1CB7_41B3_2AB31B934588_0/l/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_342B429A_2413_1CB7_41B3_2AB31B934588_0/u/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "rowCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_342B429A_2413_1CB7_41B3_2AB31B934588_0/u/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_342B429A_2413_1CB7_41B3_2AB31B934588_0/u/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_342B429A_2413_1CB7_41B3_2AB31B934588_0/u/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_342B429A_2413_1CB7_41B3_2AB31B934588_0/r/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "rowCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_342B429A_2413_1CB7_41B3_2AB31B934588_0/r/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_342B429A_2413_1CB7_41B3_2AB31B934588_0/r/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_342B429A_2413_1CB7_41B3_2AB31B934588_0/r/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_342B429A_2413_1CB7_41B3_2AB31B934588_0/b/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "rowCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_342B429A_2413_1CB7_41B3_2AB31B934588_0/b/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_342B429A_2413_1CB7_41B3_2AB31B934588_0/b/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_342B429A_2413_1CB7_41B3_2AB31B934588_0/b/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_342B429A_2413_1CB7_41B3_2AB31B934588_0/d/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "rowCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_342B429A_2413_1CB7_41B3_2AB31B934588_0/d/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_342B429A_2413_1CB7_41B3_2AB31B934588_0/d/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_342B429A_2413_1CB7_41B3_2AB31B934588_0/d/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "thumbnailUrl": "media/panorama_342B429A_2413_1CB7_41B3_2AB31B934588_t.jpg"
  }
 ]
},
{
 "initialPosition": {
  "yaw": -92.46,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "id": "camera_3411D0A7_3925_9DE4_41C1_D8728F747F49"
},
{
 "items": [
  {
   "media": "this.panorama_35543A08_2410_EF93_41B5_10CEB879EE30",
   "camera": "this.panorama_35543A08_2410_EF93_41B5_10CEB879EE30_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 0, 1)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_342B97D5_2413_24BC_4161_1AF8B2777271",
   "camera": "this.panorama_342B97D5_2413_24BC_4161_1AF8B2777271_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 1, 2)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_342E9897_2413_2CBD_4188_A3C48D655DA0",
   "camera": "this.panorama_342E9897_2413_2CBD_4188_A3C48D655DA0_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 2, 3)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_34189E55_2413_27BC_41B9_93C0709397D9",
   "camera": "this.panorama_34189E55_2413_27BC_41B9_93C0709397D9_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 3, 4)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_342D84E2_2413_E497_4196_24F58906D341",
   "camera": "this.panorama_342D84E2_2413_E497_4196_24F58906D341_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 4, 5)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_342B349F_2413_24AC_41B9_DADBE85884B1",
   "camera": "this.panorama_342B349F_2413_24AC_41B9_DADBE85884B1_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 5, 6)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_342E07E9_2413_6495_41BA_9734E7BAC9CA",
   "camera": "this.panorama_342E07E9_2413_6495_41BA_9734E7BAC9CA_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 6, 7)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_342FDDE8_2413_6493_41BF_AC46041A8646",
   "camera": "this.panorama_342FDDE8_2413_6493_41BF_AC46041A8646_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 7, 8)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_342D5EBB_2413_24F5_41A3_4DE7DBE219BD",
   "camera": "this.panorama_342D5EBB_2413_24F5_41A3_4DE7DBE219BD_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 8, 9)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_342FC184_2413_1C93_41A0_8E7108979C5B",
   "camera": "this.panorama_342FC184_2413_1C93_41A0_8E7108979C5B_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 9, 10)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_342DC6C8_2410_E493_41B9_7E20A878670E",
   "camera": "this.panorama_342DC6C8_2410_E493_41B9_7E20A878670E_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 10, 11)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_342E346A_2413_7B97_41B3_D351C68A0619",
   "camera": "this.panorama_342E346A_2413_7B97_41B3_D351C68A0619_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 11, 12)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_34281A46_2413_6F9F_4194_314606A9EFDA",
   "camera": "this.panorama_34281A46_2413_6F9F_4194_314606A9EFDA_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 12, 13)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_342BDCA9_2410_E495_41A9_07B2F5EA07A9",
   "camera": "this.panorama_342BDCA9_2410_E495_41A9_07B2F5EA07A9_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 13, 14)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_3428501F_2413_1BAC_41BB_DB681B99BCAA",
   "camera": "this.panorama_3428501F_2413_1BAC_41BB_DB681B99BCAA_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 14, 15)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_342BD5E7_2413_249D_41C1_23B84F82611D",
   "camera": "this.panorama_342BD5E7_2413_249D_41C1_23B84F82611D_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 15, 16)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_342B429A_2413_1CB7_41B3_2AB31B934588",
   "camera": "this.panorama_342B429A_2413_1CB7_41B3_2AB31B934588_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 16, 17)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_34280C43_2413_2B94_41B4_A77E6ADEC474",
   "camera": "this.panorama_34280C43_2413_2B94_41B4_A77E6ADEC474_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 17, 18)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_342AC208_2413_3F93_4191_930FEFDE0ACE",
   "end": "this.trigger('tourEnded')",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 18, 0)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_342AC208_2413_3F93_4191_930FEFDE0ACE_camera",
   "class": "PanoramaPlayListItem"
  }
 ],
 "id": "mainPlayList",
 "class": "PlayList"
},
{
 "hfovMax": 130,
 "label": "Ph\u00f2ng th\u1ef1c h\u00e0nh t\u1ef1 \u0111\u1ed9ng h\u00f3a view 2",
 "id": "panorama_342AC208_2413_3F93_4191_930FEFDE0ACE",
 "overlays": [
  "this.overlay_3B730E77_242F_E47D_41A8_430BA66B17D1"
 ],
 "pitch": 0,
 "vfov": 180,
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_342B429A_2413_1CB7_41B3_2AB31B934588",
   "class": "AdjacentPanorama"
  }
 ],
 "thumbnailUrl": "media/panorama_342AC208_2413_3F93_4191_930FEFDE0ACE_t.jpg",
 "hfovMin": "120%",
 "class": "Panorama",
 "hfov": 360,
 "partial": false,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_342AC208_2413_3F93_4191_930FEFDE0ACE_0/f/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "rowCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_342AC208_2413_3F93_4191_930FEFDE0ACE_0/f/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_342AC208_2413_3F93_4191_930FEFDE0ACE_0/f/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_342AC208_2413_3F93_4191_930FEFDE0ACE_0/f/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_342AC208_2413_3F93_4191_930FEFDE0ACE_0/l/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "rowCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_342AC208_2413_3F93_4191_930FEFDE0ACE_0/l/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_342AC208_2413_3F93_4191_930FEFDE0ACE_0/l/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_342AC208_2413_3F93_4191_930FEFDE0ACE_0/l/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_342AC208_2413_3F93_4191_930FEFDE0ACE_0/u/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "rowCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_342AC208_2413_3F93_4191_930FEFDE0ACE_0/u/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_342AC208_2413_3F93_4191_930FEFDE0ACE_0/u/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_342AC208_2413_3F93_4191_930FEFDE0ACE_0/u/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_342AC208_2413_3F93_4191_930FEFDE0ACE_0/r/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "rowCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_342AC208_2413_3F93_4191_930FEFDE0ACE_0/r/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_342AC208_2413_3F93_4191_930FEFDE0ACE_0/r/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_342AC208_2413_3F93_4191_930FEFDE0ACE_0/r/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_342AC208_2413_3F93_4191_930FEFDE0ACE_0/b/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "rowCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_342AC208_2413_3F93_4191_930FEFDE0ACE_0/b/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_342AC208_2413_3F93_4191_930FEFDE0ACE_0/b/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_342AC208_2413_3F93_4191_930FEFDE0ACE_0/b/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_342AC208_2413_3F93_4191_930FEFDE0ACE_0/d/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "rowCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_342AC208_2413_3F93_4191_930FEFDE0ACE_0/d/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_342AC208_2413_3F93_4191_930FEFDE0ACE_0/d/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_342AC208_2413_3F93_4191_930FEFDE0ACE_0/d/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "thumbnailUrl": "media/panorama_342AC208_2413_3F93_4191_930FEFDE0ACE_t.jpg"
  }
 ]
},
{
 "initialPosition": {
  "yaw": 38.06,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "id": "camera_347FC0CC_3925_9DA4_4193_5BDDCF93EF18"
},
{
 "initialPosition": {
  "yaw": 122.89,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "id": "camera_37091FD6_3924_63A4_41C3_A93A813897EF"
},
{
 "items": [
  {
   "media": "this.panorama_35543A08_2410_EF93_41B5_10CEB879EE30",
   "camera": "this.panorama_35543A08_2410_EF93_41B5_10CEB879EE30_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailGrid_E12E87BC_FC5E_3EF0_41D3_CB6F3CE9141B_playlist, 0, 1)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_342B97D5_2413_24BC_4161_1AF8B2777271",
   "camera": "this.panorama_342B97D5_2413_24BC_4161_1AF8B2777271_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailGrid_E12E87BC_FC5E_3EF0_41D3_CB6F3CE9141B_playlist, 1, 2)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_342E9897_2413_2CBD_4188_A3C48D655DA0",
   "camera": "this.panorama_342E9897_2413_2CBD_4188_A3C48D655DA0_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailGrid_E12E87BC_FC5E_3EF0_41D3_CB6F3CE9141B_playlist, 2, 3)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_34189E55_2413_27BC_41B9_93C0709397D9",
   "camera": "this.panorama_34189E55_2413_27BC_41B9_93C0709397D9_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailGrid_E12E87BC_FC5E_3EF0_41D3_CB6F3CE9141B_playlist, 3, 4)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_342D84E2_2413_E497_4196_24F58906D341",
   "camera": "this.panorama_342D84E2_2413_E497_4196_24F58906D341_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailGrid_E12E87BC_FC5E_3EF0_41D3_CB6F3CE9141B_playlist, 4, 5)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_342B349F_2413_24AC_41B9_DADBE85884B1",
   "camera": "this.panorama_342B349F_2413_24AC_41B9_DADBE85884B1_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailGrid_E12E87BC_FC5E_3EF0_41D3_CB6F3CE9141B_playlist, 5, 6)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_342E07E9_2413_6495_41BA_9734E7BAC9CA",
   "camera": "this.panorama_342E07E9_2413_6495_41BA_9734E7BAC9CA_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailGrid_E12E87BC_FC5E_3EF0_41D3_CB6F3CE9141B_playlist, 6, 7)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_342FDDE8_2413_6493_41BF_AC46041A8646",
   "camera": "this.panorama_342FDDE8_2413_6493_41BF_AC46041A8646_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailGrid_E12E87BC_FC5E_3EF0_41D3_CB6F3CE9141B_playlist, 7, 8)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_342D5EBB_2413_24F5_41A3_4DE7DBE219BD",
   "camera": "this.panorama_342D5EBB_2413_24F5_41A3_4DE7DBE219BD_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailGrid_E12E87BC_FC5E_3EF0_41D3_CB6F3CE9141B_playlist, 8, 9)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_342FC184_2413_1C93_41A0_8E7108979C5B",
   "camera": "this.panorama_342FC184_2413_1C93_41A0_8E7108979C5B_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailGrid_E12E87BC_FC5E_3EF0_41D3_CB6F3CE9141B_playlist, 9, 10)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_342DC6C8_2410_E493_41B9_7E20A878670E",
   "camera": "this.panorama_342DC6C8_2410_E493_41B9_7E20A878670E_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailGrid_E12E87BC_FC5E_3EF0_41D3_CB6F3CE9141B_playlist, 10, 11)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_342E346A_2413_7B97_41B3_D351C68A0619",
   "camera": "this.panorama_342E346A_2413_7B97_41B3_D351C68A0619_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailGrid_E12E87BC_FC5E_3EF0_41D3_CB6F3CE9141B_playlist, 11, 12)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_34281A46_2413_6F9F_4194_314606A9EFDA",
   "camera": "this.panorama_34281A46_2413_6F9F_4194_314606A9EFDA_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailGrid_E12E87BC_FC5E_3EF0_41D3_CB6F3CE9141B_playlist, 12, 13)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_342BDCA9_2410_E495_41A9_07B2F5EA07A9",
   "camera": "this.panorama_342BDCA9_2410_E495_41A9_07B2F5EA07A9_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailGrid_E12E87BC_FC5E_3EF0_41D3_CB6F3CE9141B_playlist, 13, 14)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_3428501F_2413_1BAC_41BB_DB681B99BCAA",
   "camera": "this.panorama_3428501F_2413_1BAC_41BB_DB681B99BCAA_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailGrid_E12E87BC_FC5E_3EF0_41D3_CB6F3CE9141B_playlist, 14, 15)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_342BD5E7_2413_249D_41C1_23B84F82611D",
   "camera": "this.panorama_342BD5E7_2413_249D_41C1_23B84F82611D_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailGrid_E12E87BC_FC5E_3EF0_41D3_CB6F3CE9141B_playlist, 15, 16)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_342B429A_2413_1CB7_41B3_2AB31B934588",
   "camera": "this.panorama_342B429A_2413_1CB7_41B3_2AB31B934588_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailGrid_E12E87BC_FC5E_3EF0_41D3_CB6F3CE9141B_playlist, 16, 17)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_34280C43_2413_2B94_41B4_A77E6ADEC474",
   "camera": "this.panorama_34280C43_2413_2B94_41B4_A77E6ADEC474_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailGrid_E12E87BC_FC5E_3EF0_41D3_CB6F3CE9141B_playlist, 17, 18)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_342AC208_2413_3F93_4191_930FEFDE0ACE",
   "camera": "this.panorama_342AC208_2413_3F93_4191_930FEFDE0ACE_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailGrid_E12E87BC_FC5E_3EF0_41D3_CB6F3CE9141B_playlist, 18, 0)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  }
 ],
 "id": "ThumbnailGrid_E12E87BC_FC5E_3EF0_41D3_CB6F3CE9141B_playlist",
 "class": "PlayList"
},
{
 "initialPosition": {
  "yaw": -98.35,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "id": "camera_34B610F6_3925_9D64_41CB_5F472C6598A5"
},
{
 "initialPosition": {
  "yaw": 179.84,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "id": "camera_343D0093_3925_9DBC_41BB_2A930B06A5DA"
},
{
 "initialPosition": {
  "yaw": -95.31,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "id": "camera_3451F0DE_3925_9DA4_41C0_029A5719B27B"
},
{
 "duration": 200,
 "id": "effect_764B50D0_5098_666A_41CA_D502B62644A1",
 "class": "FadeOutEffect",
 "easing": "quad_in"
},
{
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_342E9897_2413_2CBD_4188_A3C48D655DA0",
   "yaw": -0.21,
   "class": "AdjacentPanorama",
   "distance": 1,
   "backwardYaw": 98.56
  },
  {
   "panorama": "this.panorama_342E07E9_2413_6495_41BA_9734E7BAC9CA",
   "yaw": 87.54,
   "class": "AdjacentPanorama",
   "distance": 1,
   "backwardYaw": -86.52
  }
 ],
 "label": "H\u00e0nh lang t\u1ea7ng 4 (nh\u00e0 4 t\u1ea7ng)",
 "id": "panorama_342B349F_2413_24AC_41B9_DADBE85884B1",
 "hfov": 360,
 "partial": false,
 "pitch": 0,
 "vfov": 180,
 "overlays": [
  "this.overlay_3D1E0568_246F_2593_41BD_7CE431E3E099",
  "this.overlay_339EEEA7_246F_249D_41BD_17FC158E37E7"
 ],
 "class": "Panorama",
 "thumbnailUrl": "media/panorama_342B349F_2413_24AC_41B9_DADBE85884B1_t.jpg",
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_342B349F_2413_24AC_41B9_DADBE85884B1_0/f/0/{row}_{column}.jpg",
      "colCount": 11,
      "tags": "ondemand",
      "width": 5632,
      "rowCount": 11,
      "class": "TiledImageResourceLevel",
      "height": 5632
     },
     {
      "url": "media/panorama_342B349F_2413_24AC_41B9_DADBE85884B1_0/f/1/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "rowCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_342B349F_2413_24AC_41B9_DADBE85884B1_0/f/2/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_342B349F_2413_24AC_41B9_DADBE85884B1_0/f/3/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_342B349F_2413_24AC_41B9_DADBE85884B1_0/f/4/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_342B349F_2413_24AC_41B9_DADBE85884B1_0/l/0/{row}_{column}.jpg",
      "colCount": 11,
      "tags": "ondemand",
      "width": 5632,
      "rowCount": 11,
      "class": "TiledImageResourceLevel",
      "height": 5632
     },
     {
      "url": "media/panorama_342B349F_2413_24AC_41B9_DADBE85884B1_0/l/1/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "rowCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_342B349F_2413_24AC_41B9_DADBE85884B1_0/l/2/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_342B349F_2413_24AC_41B9_DADBE85884B1_0/l/3/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_342B349F_2413_24AC_41B9_DADBE85884B1_0/l/4/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_342B349F_2413_24AC_41B9_DADBE85884B1_0/u/0/{row}_{column}.jpg",
      "colCount": 11,
      "tags": "ondemand",
      "width": 5632,
      "rowCount": 11,
      "class": "TiledImageResourceLevel",
      "height": 5632
     },
     {
      "url": "media/panorama_342B349F_2413_24AC_41B9_DADBE85884B1_0/u/1/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "rowCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_342B349F_2413_24AC_41B9_DADBE85884B1_0/u/2/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_342B349F_2413_24AC_41B9_DADBE85884B1_0/u/3/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_342B349F_2413_24AC_41B9_DADBE85884B1_0/u/4/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_342B349F_2413_24AC_41B9_DADBE85884B1_0/r/0/{row}_{column}.jpg",
      "colCount": 11,
      "tags": "ondemand",
      "width": 5632,
      "rowCount": 11,
      "class": "TiledImageResourceLevel",
      "height": 5632
     },
     {
      "url": "media/panorama_342B349F_2413_24AC_41B9_DADBE85884B1_0/r/1/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "rowCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_342B349F_2413_24AC_41B9_DADBE85884B1_0/r/2/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_342B349F_2413_24AC_41B9_DADBE85884B1_0/r/3/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_342B349F_2413_24AC_41B9_DADBE85884B1_0/r/4/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_342B349F_2413_24AC_41B9_DADBE85884B1_0/b/0/{row}_{column}.jpg",
      "colCount": 11,
      "tags": "ondemand",
      "width": 5632,
      "rowCount": 11,
      "class": "TiledImageResourceLevel",
      "height": 5632
     },
     {
      "url": "media/panorama_342B349F_2413_24AC_41B9_DADBE85884B1_0/b/1/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "rowCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_342B349F_2413_24AC_41B9_DADBE85884B1_0/b/2/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_342B349F_2413_24AC_41B9_DADBE85884B1_0/b/3/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_342B349F_2413_24AC_41B9_DADBE85884B1_0/b/4/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_342B349F_2413_24AC_41B9_DADBE85884B1_0/d/0/{row}_{column}.jpg",
      "colCount": 11,
      "tags": "ondemand",
      "width": 5632,
      "rowCount": 11,
      "class": "TiledImageResourceLevel",
      "height": 5632
     },
     {
      "url": "media/panorama_342B349F_2413_24AC_41B9_DADBE85884B1_0/d/1/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "rowCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_342B349F_2413_24AC_41B9_DADBE85884B1_0/d/2/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_342B349F_2413_24AC_41B9_DADBE85884B1_0/d/3/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_342B349F_2413_24AC_41B9_DADBE85884B1_0/d/4/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "thumbnailUrl": "media/panorama_342B349F_2413_24AC_41B9_DADBE85884B1_t.jpg"
  }
 ]
},
{
 "items": [
  {
   "media": "this.panorama_34189E55_2413_27BC_41B9_93C0709397D9",
   "camera": "this.panorama_34189E55_2413_27BC_41B9_93C0709397D9_camera",
   "begin": "this.setEndToItemIndex(this.DropDown_EA966EC5_FDF1_3E82_41C7_D6D87EF404E1_playlist, 0, 1)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_342D84E2_2413_E497_4196_24F58906D341",
   "camera": "this.panorama_342D84E2_2413_E497_4196_24F58906D341_camera",
   "begin": "this.setEndToItemIndex(this.DropDown_EA966EC5_FDF1_3E82_41C7_D6D87EF404E1_playlist, 1, 2)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_342E07E9_2413_6495_41BA_9734E7BAC9CA",
   "camera": "this.panorama_342E07E9_2413_6495_41BA_9734E7BAC9CA_camera",
   "begin": "this.setEndToItemIndex(this.DropDown_EA966EC5_FDF1_3E82_41C7_D6D87EF404E1_playlist, 2, 3)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_342FDDE8_2413_6493_41BF_AC46041A8646",
   "camera": "this.panorama_342FDDE8_2413_6493_41BF_AC46041A8646_camera",
   "begin": "this.setEndToItemIndex(this.DropDown_EA966EC5_FDF1_3E82_41C7_D6D87EF404E1_playlist, 3, 4)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_342E346A_2413_7B97_41B3_D351C68A0619",
   "camera": "this.panorama_342E346A_2413_7B97_41B3_D351C68A0619_camera",
   "begin": "this.setEndToItemIndex(this.DropDown_EA966EC5_FDF1_3E82_41C7_D6D87EF404E1_playlist, 4, 5)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_34281A46_2413_6F9F_4194_314606A9EFDA",
   "camera": "this.panorama_34281A46_2413_6F9F_4194_314606A9EFDA_camera",
   "begin": "this.setEndToItemIndex(this.DropDown_EA966EC5_FDF1_3E82_41C7_D6D87EF404E1_playlist, 5, 6)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_3428501F_2413_1BAC_41BB_DB681B99BCAA",
   "camera": "this.panorama_3428501F_2413_1BAC_41BB_DB681B99BCAA_camera",
   "begin": "this.setEndToItemIndex(this.DropDown_EA966EC5_FDF1_3E82_41C7_D6D87EF404E1_playlist, 6, 7)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_342BD5E7_2413_249D_41C1_23B84F82611D",
   "camera": "this.panorama_342BD5E7_2413_249D_41C1_23B84F82611D_camera",
   "begin": "this.setEndToItemIndex(this.DropDown_EA966EC5_FDF1_3E82_41C7_D6D87EF404E1_playlist, 7, 8)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_34280C43_2413_2B94_41B4_A77E6ADEC474",
   "camera": "this.panorama_34280C43_2413_2B94_41B4_A77E6ADEC474_camera",
   "begin": "this.setEndToItemIndex(this.DropDown_EA966EC5_FDF1_3E82_41C7_D6D87EF404E1_playlist, 8, 9)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_342AC208_2413_3F93_4191_930FEFDE0ACE",
   "camera": "this.panorama_342AC208_2413_3F93_4191_930FEFDE0ACE_camera",
   "begin": "this.setEndToItemIndex(this.DropDown_EA966EC5_FDF1_3E82_41C7_D6D87EF404E1_playlist, 9, 0)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  }
 ],
 "id": "DropDown_EA966EC5_FDF1_3E82_41C7_D6D87EF404E1_playlist",
 "class": "PlayList"
},
{
 "initialPosition": {
  "yaw": -111.18,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "id": "camera_35D51059_3925_9CAC_41C4_E7E7E4E139F3"
},
{
 "initialPosition": {
  "yaw": 102.11,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "id": "camera_3404509E_3925_9DA4_41C9_F4F7B7CDE572"
},
{
 "hfovMax": 130,
 "label": "Ph\u00f2ng th\u1ef1c h\u00e0nh \u0111i\u1ec7n t\u1eeb view 2",
 "id": "panorama_34281A46_2413_6F9F_4194_314606A9EFDA",
 "overlays": [
  "this.overlay_3EDBF755_2411_25BD_41B6_A94214F5DB10"
 ],
 "pitch": 0,
 "vfov": 180,
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_342DC6C8_2410_E493_41B9_7E20A878670E",
   "class": "AdjacentPanorama"
  }
 ],
 "thumbnailUrl": "media/panorama_34281A46_2413_6F9F_4194_314606A9EFDA_t.jpg",
 "hfovMin": "120%",
 "class": "Panorama",
 "hfov": 360,
 "partial": false,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_34281A46_2413_6F9F_4194_314606A9EFDA_0/f/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "rowCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_34281A46_2413_6F9F_4194_314606A9EFDA_0/f/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_34281A46_2413_6F9F_4194_314606A9EFDA_0/f/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_34281A46_2413_6F9F_4194_314606A9EFDA_0/f/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_34281A46_2413_6F9F_4194_314606A9EFDA_0/l/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "rowCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_34281A46_2413_6F9F_4194_314606A9EFDA_0/l/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_34281A46_2413_6F9F_4194_314606A9EFDA_0/l/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_34281A46_2413_6F9F_4194_314606A9EFDA_0/l/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_34281A46_2413_6F9F_4194_314606A9EFDA_0/u/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "rowCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_34281A46_2413_6F9F_4194_314606A9EFDA_0/u/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_34281A46_2413_6F9F_4194_314606A9EFDA_0/u/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_34281A46_2413_6F9F_4194_314606A9EFDA_0/u/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_34281A46_2413_6F9F_4194_314606A9EFDA_0/r/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "rowCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_34281A46_2413_6F9F_4194_314606A9EFDA_0/r/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_34281A46_2413_6F9F_4194_314606A9EFDA_0/r/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_34281A46_2413_6F9F_4194_314606A9EFDA_0/r/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_34281A46_2413_6F9F_4194_314606A9EFDA_0/b/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "rowCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_34281A46_2413_6F9F_4194_314606A9EFDA_0/b/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_34281A46_2413_6F9F_4194_314606A9EFDA_0/b/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_34281A46_2413_6F9F_4194_314606A9EFDA_0/b/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_34281A46_2413_6F9F_4194_314606A9EFDA_0/d/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "rowCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_34281A46_2413_6F9F_4194_314606A9EFDA_0/d/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_34281A46_2413_6F9F_4194_314606A9EFDA_0/d/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_34281A46_2413_6F9F_4194_314606A9EFDA_0/d/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "thumbnailUrl": "media/panorama_34281A46_2413_6F9F_4194_314606A9EFDA_t.jpg"
  }
 ]
},
{
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_342B349F_2413_24AC_41B9_DADBE85884B1_camera"
},
{
 "initialPosition": {
  "yaw": 121.36,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "id": "camera_3776AFF3_3924_637C_41C6_DFF61EB80C2A"
},
{
 "hfovMax": 130,
 "label": "V\u0103n ph\u00f2ng khoa \u0111i\u1ec7n view 1",
 "id": "panorama_34189E55_2413_27BC_41B9_93C0709397D9",
 "overlays": [
  "this.overlay_3183A59D_2477_64AD_41B4_6F87EBD97E48",
  "this.overlay_336BFB5E_2473_2DAC_41BB_0ED78BC2A8F1"
 ],
 "pitch": 0,
 "vfov": 180,
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_342D84E2_2413_E497_4196_24F58906D341",
   "yaw": 92.78,
   "class": "AdjacentPanorama",
   "distance": 1,
   "backwardYaw": 84.69
  },
  {
   "panorama": "this.panorama_342E9897_2413_2CBD_4188_A3C48D655DA0",
   "yaw": -121.44,
   "class": "AdjacentPanorama",
   "distance": 1,
   "backwardYaw": -154.85
  }
 ],
 "thumbnailUrl": "media/panorama_34189E55_2413_27BC_41B9_93C0709397D9_t.jpg",
 "hfovMin": "120%",
 "class": "Panorama",
 "hfov": 360,
 "partial": false,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_34189E55_2413_27BC_41B9_93C0709397D9_0/f/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "rowCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_34189E55_2413_27BC_41B9_93C0709397D9_0/f/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_34189E55_2413_27BC_41B9_93C0709397D9_0/f/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_34189E55_2413_27BC_41B9_93C0709397D9_0/f/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_34189E55_2413_27BC_41B9_93C0709397D9_0/l/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "rowCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_34189E55_2413_27BC_41B9_93C0709397D9_0/l/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_34189E55_2413_27BC_41B9_93C0709397D9_0/l/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_34189E55_2413_27BC_41B9_93C0709397D9_0/l/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_34189E55_2413_27BC_41B9_93C0709397D9_0/u/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "rowCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_34189E55_2413_27BC_41B9_93C0709397D9_0/u/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_34189E55_2413_27BC_41B9_93C0709397D9_0/u/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_34189E55_2413_27BC_41B9_93C0709397D9_0/u/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_34189E55_2413_27BC_41B9_93C0709397D9_0/r/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "rowCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_34189E55_2413_27BC_41B9_93C0709397D9_0/r/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_34189E55_2413_27BC_41B9_93C0709397D9_0/r/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_34189E55_2413_27BC_41B9_93C0709397D9_0/r/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_34189E55_2413_27BC_41B9_93C0709397D9_0/b/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "rowCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_34189E55_2413_27BC_41B9_93C0709397D9_0/b/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_34189E55_2413_27BC_41B9_93C0709397D9_0/b/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_34189E55_2413_27BC_41B9_93C0709397D9_0/b/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_34189E55_2413_27BC_41B9_93C0709397D9_0/d/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "rowCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_34189E55_2413_27BC_41B9_93C0709397D9_0/d/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_34189E55_2413_27BC_41B9_93C0709397D9_0/d/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_34189E55_2413_27BC_41B9_93C0709397D9_0/d/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "thumbnailUrl": "media/panorama_34189E55_2413_27BC_41B9_93C0709397D9_t.jpg"
  }
 ]
},
{
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_342E9897_2413_2CBD_4188_A3C48D655DA0_camera"
},
{
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_34189E55_2413_27BC_41B9_93C0709397D9_camera"
},
{
 "hfovMax": 130,
 "label": "H\u00e0nh lang t\u1ea7ng 1 (nh\u00e0 4 t\u1ea7ng)",
 "id": "panorama_342E9897_2413_2CBD_4188_A3C48D655DA0",
 "overlays": [
  "this.overlay_3160FB6A_2471_6D97_41C1_B43F27808ABC",
  "this.overlay_324BB8F1_2470_EC77_41B4_C715A4354DC9",
  "this.overlay_3DC3DBDD_2473_6CAD_41B6_B89893C65E91"
 ],
 "pitch": 0,
 "vfov": 180,
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_342B97D5_2413_24BC_4161_1AF8B2777271",
   "yaw": -62.25,
   "class": "AdjacentPanorama",
   "distance": 1,
   "backwardYaw": 79.5
  },
  {
   "panorama": "this.panorama_34189E55_2413_27BC_41B9_93C0709397D9",
   "yaw": -154.85,
   "class": "AdjacentPanorama",
   "distance": 1,
   "backwardYaw": -121.44
  },
  {
   "panorama": "this.panorama_342B349F_2413_24AC_41B9_DADBE85884B1",
   "yaw": 98.56,
   "class": "AdjacentPanorama",
   "distance": 1,
   "backwardYaw": -0.21
  }
 ],
 "thumbnailUrl": "media/panorama_342E9897_2413_2CBD_4188_A3C48D655DA0_t.jpg",
 "hfovMin": "120%",
 "class": "Panorama",
 "hfov": 360,
 "partial": false,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_342E9897_2413_2CBD_4188_A3C48D655DA0_0/f/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "rowCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_342E9897_2413_2CBD_4188_A3C48D655DA0_0/f/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_342E9897_2413_2CBD_4188_A3C48D655DA0_0/f/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_342E9897_2413_2CBD_4188_A3C48D655DA0_0/f/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_342E9897_2413_2CBD_4188_A3C48D655DA0_0/l/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "rowCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_342E9897_2413_2CBD_4188_A3C48D655DA0_0/l/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_342E9897_2413_2CBD_4188_A3C48D655DA0_0/l/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_342E9897_2413_2CBD_4188_A3C48D655DA0_0/l/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_342E9897_2413_2CBD_4188_A3C48D655DA0_0/u/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "rowCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_342E9897_2413_2CBD_4188_A3C48D655DA0_0/u/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_342E9897_2413_2CBD_4188_A3C48D655DA0_0/u/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_342E9897_2413_2CBD_4188_A3C48D655DA0_0/u/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_342E9897_2413_2CBD_4188_A3C48D655DA0_0/r/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "rowCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_342E9897_2413_2CBD_4188_A3C48D655DA0_0/r/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_342E9897_2413_2CBD_4188_A3C48D655DA0_0/r/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_342E9897_2413_2CBD_4188_A3C48D655DA0_0/r/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_342E9897_2413_2CBD_4188_A3C48D655DA0_0/b/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "rowCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_342E9897_2413_2CBD_4188_A3C48D655DA0_0/b/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_342E9897_2413_2CBD_4188_A3C48D655DA0_0/b/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_342E9897_2413_2CBD_4188_A3C48D655DA0_0/b/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_342E9897_2413_2CBD_4188_A3C48D655DA0_0/d/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "rowCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_342E9897_2413_2CBD_4188_A3C48D655DA0_0/d/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_342E9897_2413_2CBD_4188_A3C48D655DA0_0/d/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_342E9897_2413_2CBD_4188_A3C48D655DA0_0/d/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "thumbnailUrl": "media/panorama_342E9897_2413_2CBD_4188_A3C48D655DA0_t.jpg"
  }
 ]
},
{
 "initialPosition": {
  "yaw": 25.15,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "id": "camera_345DE0E5_3925_9D64_41B7_A8399E798E73"
},
{
 "initialPosition": {
  "yaw": 93.48,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "id": "camera_35C57038_3925_9CEC_419D_85FF8DD7FA34"
},
{
 "buttonToggleGyroscope": "this.IconButton_E5B8A54E_FD93_039E_41E3_948216944E04",
 "displayPlaybackBar": true,
 "mouseControlMode": "drag_acceleration",
 "viewerArea": "this.MainViewer",
 "gyroscopeVerticalDraggingEnabled": true,
 "id": "MainViewerPanoramaPlayer",
 "class": "PanoramaPlayer",
 "touchControlMode": "drag_rotation"
},
{
 "initialPosition": {
  "yaw": -41.56,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "id": "camera_35C82043_3925_9C9C_41BF_6561E8ACEBBC"
},
{
 "class": "MediaAudio",
 "audio": {
  "mp3Url": "media/audio_34B8EFE0_3927_E39C_41A9_0E256366AA0C.mp3",
  "class": "AudioResource",
  "oggUrl": "media/audio_34B8EFE0_3927_E39C_41A9_0E256366AA0C.ogg"
 },
 "autoplay": true,
 "id": "audio_34B8EFE0_3927_E39C_41A9_0E256366AA0C",
 "data": {
  "label": "Untitled-video-Made-with-Clipchamp"
 }
},
{
 "initialPosition": {
  "yaw": 173.25,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "id": "camera_3422506F_3925_9D64_41AD_BAE119B3B83A"
},
{
 "hfovMax": 130,
 "label": "H\u00e0nh lang t\u1ea7ng 1 (nh\u00e0 8 t\u1ea7ng)",
 "id": "panorama_342D5EBB_2413_24F5_41A3_4DE7DBE219BD",
 "overlays": [
  "this.overlay_3C205D91_2413_64B5_41B8_64D33E857762",
  "this.overlay_3D7270BB_2413_1CF5_41BF_588BB84A9E40",
  "this.overlay_3D2A5C4B_2411_2B95_41C0_B7E71FB2FF9A"
 ],
 "pitch": 0,
 "vfov": 180,
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_35543A08_2410_EF93_41B5_10CEB879EE30",
   "yaw": -116.95,
   "class": "AdjacentPanorama",
   "distance": 1,
   "backwardYaw": 138.44
  },
  {
   "panorama": "this.panorama_342B97D5_2413_24BC_4161_1AF8B2777271",
   "yaw": -57.11,
   "class": "AdjacentPanorama",
   "distance": 1,
   "backwardYaw": -144.56
  },
  {
   "panorama": "this.panorama_342FC184_2413_1C93_41A0_8E7108979C5B",
   "yaw": 73.69,
   "class": "AdjacentPanorama",
   "distance": 1,
   "backwardYaw": 68.82
  }
 ],
 "thumbnailUrl": "media/panorama_342D5EBB_2413_24F5_41A3_4DE7DBE219BD_t.jpg",
 "hfovMin": "120%",
 "class": "Panorama",
 "hfov": 360,
 "partial": false,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_342D5EBB_2413_24F5_41A3_4DE7DBE219BD_0/f/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "rowCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_342D5EBB_2413_24F5_41A3_4DE7DBE219BD_0/f/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_342D5EBB_2413_24F5_41A3_4DE7DBE219BD_0/f/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_342D5EBB_2413_24F5_41A3_4DE7DBE219BD_0/f/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_342D5EBB_2413_24F5_41A3_4DE7DBE219BD_0/l/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "rowCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_342D5EBB_2413_24F5_41A3_4DE7DBE219BD_0/l/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_342D5EBB_2413_24F5_41A3_4DE7DBE219BD_0/l/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_342D5EBB_2413_24F5_41A3_4DE7DBE219BD_0/l/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_342D5EBB_2413_24F5_41A3_4DE7DBE219BD_0/u/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "rowCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_342D5EBB_2413_24F5_41A3_4DE7DBE219BD_0/u/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_342D5EBB_2413_24F5_41A3_4DE7DBE219BD_0/u/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_342D5EBB_2413_24F5_41A3_4DE7DBE219BD_0/u/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_342D5EBB_2413_24F5_41A3_4DE7DBE219BD_0/r/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "rowCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_342D5EBB_2413_24F5_41A3_4DE7DBE219BD_0/r/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_342D5EBB_2413_24F5_41A3_4DE7DBE219BD_0/r/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_342D5EBB_2413_24F5_41A3_4DE7DBE219BD_0/r/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_342D5EBB_2413_24F5_41A3_4DE7DBE219BD_0/b/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "rowCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_342D5EBB_2413_24F5_41A3_4DE7DBE219BD_0/b/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_342D5EBB_2413_24F5_41A3_4DE7DBE219BD_0/b/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_342D5EBB_2413_24F5_41A3_4DE7DBE219BD_0/b/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_342D5EBB_2413_24F5_41A3_4DE7DBE219BD_0/d/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "rowCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_342D5EBB_2413_24F5_41A3_4DE7DBE219BD_0/d/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_342D5EBB_2413_24F5_41A3_4DE7DBE219BD_0/d/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_342D5EBB_2413_24F5_41A3_4DE7DBE219BD_0/d/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "thumbnailUrl": "media/panorama_342D5EBB_2413_24F5_41A3_4DE7DBE219BD_t.jpg"
  }
 ]
},
{
 "hfovMax": 130,
 "label": "C\u1ed5ng tr\u01b0\u1eddng",
 "id": "panorama_35543A08_2410_EF93_41B5_10CEB879EE30",
 "overlays": [
  "this.overlay_3739C375_2413_1C7D_419D_96252434BBDD",
  "this.overlay_3106BD2B_2411_2595_41BB_2DE00F988E6D"
 ],
 "pitch": 0,
 "vfov": 180,
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_342B97D5_2413_24BC_4161_1AF8B2777271",
   "yaw": 81.45,
   "class": "AdjacentPanorama",
   "distance": 1,
   "backwardYaw": -66.53
  },
  {
   "panorama": "this.panorama_342D5EBB_2413_24F5_41A3_4DE7DBE219BD",
   "yaw": 138.44,
   "class": "AdjacentPanorama",
   "distance": 1,
   "backwardYaw": -116.95
  }
 ],
 "thumbnailUrl": "media/panorama_35543A08_2410_EF93_41B5_10CEB879EE30_t.jpg",
 "hfovMin": "120%",
 "class": "Panorama",
 "hfov": 360,
 "partial": false,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_35543A08_2410_EF93_41B5_10CEB879EE30_0/f/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "rowCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_35543A08_2410_EF93_41B5_10CEB879EE30_0/f/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_35543A08_2410_EF93_41B5_10CEB879EE30_0/f/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_35543A08_2410_EF93_41B5_10CEB879EE30_0/f/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_35543A08_2410_EF93_41B5_10CEB879EE30_0/l/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "rowCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_35543A08_2410_EF93_41B5_10CEB879EE30_0/l/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_35543A08_2410_EF93_41B5_10CEB879EE30_0/l/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_35543A08_2410_EF93_41B5_10CEB879EE30_0/l/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_35543A08_2410_EF93_41B5_10CEB879EE30_0/u/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "rowCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_35543A08_2410_EF93_41B5_10CEB879EE30_0/u/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_35543A08_2410_EF93_41B5_10CEB879EE30_0/u/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_35543A08_2410_EF93_41B5_10CEB879EE30_0/u/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_35543A08_2410_EF93_41B5_10CEB879EE30_0/r/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "rowCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_35543A08_2410_EF93_41B5_10CEB879EE30_0/r/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_35543A08_2410_EF93_41B5_10CEB879EE30_0/r/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_35543A08_2410_EF93_41B5_10CEB879EE30_0/r/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_35543A08_2410_EF93_41B5_10CEB879EE30_0/b/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "rowCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_35543A08_2410_EF93_41B5_10CEB879EE30_0/b/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_35543A08_2410_EF93_41B5_10CEB879EE30_0/b/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_35543A08_2410_EF93_41B5_10CEB879EE30_0/b/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_35543A08_2410_EF93_41B5_10CEB879EE30_0/d/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "rowCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_35543A08_2410_EF93_41B5_10CEB879EE30_0/d/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_35543A08_2410_EF93_41B5_10CEB879EE30_0/d/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_35543A08_2410_EF93_41B5_10CEB879EE30_0/d/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "thumbnailUrl": "media/panorama_35543A08_2410_EF93_41B5_10CEB879EE30_t.jpg"
  }
 ]
},
{
 "initialPosition": {
  "yaw": -106.31,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "id": "camera_35D9D065_3925_9D64_41B6_6511ABF3017F"
},
{
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_342B97D5_2413_24BC_4161_1AF8B2777271_camera"
},
{
 "initialPosition": {
  "yaw": 35.44,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "id": "camera_35CC904D_3925_9CA4_41BC_1DEE9F194F38"
},
{
 "initialPosition": {
  "yaw": -95.35,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "id": "camera_34AA20EE_3925_9D64_41AE_C9CD1D7D8084"
},
{
 "initialPosition": {
  "yaw": 58.56,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "id": "camera_346430BA_3925_9DEC_4191_6CD00E7318A5"
},
{
 "hfovMax": 130,
 "label": "S\u00e2n tr\u01b0\u1eddng",
 "id": "panorama_342B97D5_2413_24BC_4161_1AF8B2777271",
 "overlays": [
  "this.overlay_311A3A31_2471_EFF5_41A2_3BF9809CA9DD",
  "this.overlay_31842339_2471_3DF5_41A5_2EB8A9C4B882",
  "this.overlay_309A2BD5_247F_2CBD_41A2_12EE96E3BC6F"
 ],
 "pitch": 0,
 "vfov": 180,
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_35543A08_2410_EF93_41B5_10CEB879EE30",
   "yaw": -66.53,
   "class": "AdjacentPanorama",
   "distance": 1,
   "backwardYaw": 81.45
  },
  {
   "panorama": "this.panorama_342D5EBB_2413_24F5_41A3_4DE7DBE219BD",
   "yaw": -144.56,
   "class": "AdjacentPanorama",
   "distance": 1,
   "backwardYaw": -57.11
  },
  {
   "panorama": "this.panorama_342E9897_2413_2CBD_4188_A3C48D655DA0",
   "yaw": 79.5,
   "class": "AdjacentPanorama",
   "distance": 1,
   "backwardYaw": -62.25
  }
 ],
 "thumbnailUrl": "media/panorama_342B97D5_2413_24BC_4161_1AF8B2777271_t.jpg",
 "hfovMin": "120%",
 "class": "Panorama",
 "hfov": 360,
 "partial": false,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_342B97D5_2413_24BC_4161_1AF8B2777271_0/f/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "rowCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_342B97D5_2413_24BC_4161_1AF8B2777271_0/f/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_342B97D5_2413_24BC_4161_1AF8B2777271_0/f/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_342B97D5_2413_24BC_4161_1AF8B2777271_0/f/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_342B97D5_2413_24BC_4161_1AF8B2777271_0/l/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "rowCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_342B97D5_2413_24BC_4161_1AF8B2777271_0/l/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_342B97D5_2413_24BC_4161_1AF8B2777271_0/l/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_342B97D5_2413_24BC_4161_1AF8B2777271_0/l/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_342B97D5_2413_24BC_4161_1AF8B2777271_0/u/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "rowCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_342B97D5_2413_24BC_4161_1AF8B2777271_0/u/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_342B97D5_2413_24BC_4161_1AF8B2777271_0/u/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_342B97D5_2413_24BC_4161_1AF8B2777271_0/u/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_342B97D5_2413_24BC_4161_1AF8B2777271_0/r/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "rowCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_342B97D5_2413_24BC_4161_1AF8B2777271_0/r/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_342B97D5_2413_24BC_4161_1AF8B2777271_0/r/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_342B97D5_2413_24BC_4161_1AF8B2777271_0/r/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_342B97D5_2413_24BC_4161_1AF8B2777271_0/b/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "rowCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_342B97D5_2413_24BC_4161_1AF8B2777271_0/b/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_342B97D5_2413_24BC_4161_1AF8B2777271_0/b/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_342B97D5_2413_24BC_4161_1AF8B2777271_0/b/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_342B97D5_2413_24BC_4161_1AF8B2777271_0/d/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "rowCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_342B97D5_2413_24BC_4161_1AF8B2777271_0/d/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_342B97D5_2413_24BC_4161_1AF8B2777271_0/d/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_342B97D5_2413_24BC_4161_1AF8B2777271_0/d/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "thumbnailUrl": "media/panorama_342B97D5_2413_24BC_4161_1AF8B2777271_t.jpg"
  }
 ]
},
{
 "initialPosition": {
  "yaw": 179.79,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "id": "camera_347170C2_3925_9D9C_41B6_4A221A2D904A"
},
{
 "initialPosition": {
  "yaw": -3.05,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "id": "camera_342AC07A_3925_9D6C_41A5_328913A3557B"
},
{
 "initialPosition": {
  "yaw": -100.5,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "id": "camera_341F00B1_3925_9DFC_41A0_38526F7AA265"
},
{
 "hfovMax": 130,
 "label": "Ph\u00f2ng th\u1ef1c h\u00e0nh PLC view 2",
 "id": "panorama_342BD5E7_2413_249D_41C1_23B84F82611D",
 "overlays": [
  "this.overlay_388265A6_2411_249F_41A5_4C53D61DD3EA"
 ],
 "pitch": 0,
 "vfov": 180,
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_342BDCA9_2410_E495_41A9_07B2F5EA07A9",
   "class": "AdjacentPanorama"
  }
 ],
 "thumbnailUrl": "media/panorama_342BD5E7_2413_249D_41C1_23B84F82611D_t.jpg",
 "hfovMin": "120%",
 "class": "Panorama",
 "hfov": 360,
 "partial": false,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_342BD5E7_2413_249D_41C1_23B84F82611D_0/f/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "rowCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_342BD5E7_2413_249D_41C1_23B84F82611D_0/f/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_342BD5E7_2413_249D_41C1_23B84F82611D_0/f/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_342BD5E7_2413_249D_41C1_23B84F82611D_0/f/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_342BD5E7_2413_249D_41C1_23B84F82611D_0/l/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "rowCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_342BD5E7_2413_249D_41C1_23B84F82611D_0/l/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_342BD5E7_2413_249D_41C1_23B84F82611D_0/l/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_342BD5E7_2413_249D_41C1_23B84F82611D_0/l/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_342BD5E7_2413_249D_41C1_23B84F82611D_0/u/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "rowCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_342BD5E7_2413_249D_41C1_23B84F82611D_0/u/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_342BD5E7_2413_249D_41C1_23B84F82611D_0/u/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_342BD5E7_2413_249D_41C1_23B84F82611D_0/u/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_342BD5E7_2413_249D_41C1_23B84F82611D_0/r/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "rowCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_342BD5E7_2413_249D_41C1_23B84F82611D_0/r/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_342BD5E7_2413_249D_41C1_23B84F82611D_0/r/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_342BD5E7_2413_249D_41C1_23B84F82611D_0/r/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_342BD5E7_2413_249D_41C1_23B84F82611D_0/b/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "rowCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_342BD5E7_2413_249D_41C1_23B84F82611D_0/b/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_342BD5E7_2413_249D_41C1_23B84F82611D_0/b/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_342BD5E7_2413_249D_41C1_23B84F82611D_0/b/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_342BD5E7_2413_249D_41C1_23B84F82611D_0/d/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "rowCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_342BD5E7_2413_249D_41C1_23B84F82611D_0/d/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_342BD5E7_2413_249D_41C1_23B84F82611D_0/d/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_342BD5E7_2413_249D_41C1_23B84F82611D_0/d/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "thumbnailUrl": "media/panorama_342BD5E7_2413_249D_41C1_23B84F82611D_t.jpg"
  }
 ]
},
{
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_342DC6C8_2410_E493_41B9_7E20A878670E_camera"
},
{
 "initialPosition": {
  "yaw": -3.8,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "id": "camera_3740DFFB_3924_636C_41B8_E59EE7FA798F"
},
{
 "initialPosition": {
  "yaw": -10.4,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "id": "camera_344BB0D5_3925_9DA4_41C4_85626D00D20D"
},
{
 "initialPosition": {
  "yaw": -87.22,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "id": "camera_3483E100_3925_9C9C_41CB_754D338E4455"
},
{
 "initialPosition": {
  "yaw": 113.47,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "id": "camera_372FBFB1_3924_63FC_41BF_92213EC0510F"
},
{
 "items": [
  {
   "media": "this.panorama_35543A08_2410_EF93_41B5_10CEB879EE30",
   "camera": "this.panorama_35543A08_2410_EF93_41B5_10CEB879EE30_camera",
   "begin": "this.setEndToItemIndex(this.DropDown_EE05F09D_FD91_02BD_41DF_1E01DAA2A683_playlist, 0, 1)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_342B97D5_2413_24BC_4161_1AF8B2777271",
   "camera": "this.panorama_342B97D5_2413_24BC_4161_1AF8B2777271_camera",
   "begin": "this.setEndToItemIndex(this.DropDown_EE05F09D_FD91_02BD_41DF_1E01DAA2A683_playlist, 1, 2)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_342E9897_2413_2CBD_4188_A3C48D655DA0",
   "camera": "this.panorama_342E9897_2413_2CBD_4188_A3C48D655DA0_camera",
   "begin": "this.setEndToItemIndex(this.DropDown_EE05F09D_FD91_02BD_41DF_1E01DAA2A683_playlist, 2, 3)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_342B349F_2413_24AC_41B9_DADBE85884B1",
   "camera": "this.panorama_342B349F_2413_24AC_41B9_DADBE85884B1_camera",
   "begin": "this.setEndToItemIndex(this.DropDown_EE05F09D_FD91_02BD_41DF_1E01DAA2A683_playlist, 3, 4)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_342D5EBB_2413_24F5_41A3_4DE7DBE219BD",
   "camera": "this.panorama_342D5EBB_2413_24F5_41A3_4DE7DBE219BD_camera",
   "begin": "this.setEndToItemIndex(this.DropDown_EE05F09D_FD91_02BD_41DF_1E01DAA2A683_playlist, 4, 5)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_342FC184_2413_1C93_41A0_8E7108979C5B",
   "camera": "this.panorama_342FC184_2413_1C93_41A0_8E7108979C5B_camera",
   "begin": "this.setEndToItemIndex(this.DropDown_EE05F09D_FD91_02BD_41DF_1E01DAA2A683_playlist, 5, 6)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_342DC6C8_2410_E493_41B9_7E20A878670E",
   "camera": "this.panorama_342DC6C8_2410_E493_41B9_7E20A878670E_camera",
   "begin": "this.setEndToItemIndex(this.DropDown_EE05F09D_FD91_02BD_41DF_1E01DAA2A683_playlist, 6, 7)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_342BDCA9_2410_E495_41A9_07B2F5EA07A9",
   "camera": "this.panorama_342BDCA9_2410_E495_41A9_07B2F5EA07A9_camera",
   "begin": "this.setEndToItemIndex(this.DropDown_EE05F09D_FD91_02BD_41DF_1E01DAA2A683_playlist, 7, 8)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_342B429A_2413_1CB7_41B3_2AB31B934588",
   "camera": "this.panorama_342B429A_2413_1CB7_41B3_2AB31B934588_camera",
   "begin": "this.setEndToItemIndex(this.DropDown_EE05F09D_FD91_02BD_41DF_1E01DAA2A683_playlist, 8, 0)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  }
 ],
 "id": "DropDown_EE05F09D_FD91_02BD_41DF_1E01DAA2A683_playlist",
 "class": "PlayList"
},
{
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_3428501F_2413_1BAC_41BB_DB681B99BCAA_camera"
},
{
 "initialPosition": {
  "yaw": 117.75,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "id": "camera_3714BFDF_3924_63A4_41C7_167C1FC5E803"
},
{
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_342E07E9_2413_6495_41BA_9734E7BAC9CA_camera"
},
{
 "hfovMax": 130,
 "label": "V\u0103n ph\u00f2ng khoa \u0111i\u1ec7n view 2",
 "id": "panorama_342D84E2_2413_E497_4196_24F58906D341",
 "overlays": [
  "this.overlay_33587585_2471_649D_41BF_3F9536E3CACA"
 ],
 "pitch": 0,
 "vfov": 180,
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_34189E55_2413_27BC_41B9_93C0709397D9",
   "yaw": 84.69,
   "class": "AdjacentPanorama",
   "distance": 1,
   "backwardYaw": 92.78
  }
 ],
 "thumbnailUrl": "media/panorama_342D84E2_2413_E497_4196_24F58906D341_t.jpg",
 "hfovMin": "120%",
 "class": "Panorama",
 "hfov": 360,
 "partial": false,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_342D84E2_2413_E497_4196_24F58906D341_0/f/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "rowCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_342D84E2_2413_E497_4196_24F58906D341_0/f/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_342D84E2_2413_E497_4196_24F58906D341_0/f/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_342D84E2_2413_E497_4196_24F58906D341_0/f/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_342D84E2_2413_E497_4196_24F58906D341_0/l/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "rowCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_342D84E2_2413_E497_4196_24F58906D341_0/l/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_342D84E2_2413_E497_4196_24F58906D341_0/l/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_342D84E2_2413_E497_4196_24F58906D341_0/l/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_342D84E2_2413_E497_4196_24F58906D341_0/u/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "rowCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_342D84E2_2413_E497_4196_24F58906D341_0/u/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_342D84E2_2413_E497_4196_24F58906D341_0/u/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_342D84E2_2413_E497_4196_24F58906D341_0/u/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_342D84E2_2413_E497_4196_24F58906D341_0/r/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "rowCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_342D84E2_2413_E497_4196_24F58906D341_0/r/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_342D84E2_2413_E497_4196_24F58906D341_0/r/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_342D84E2_2413_E497_4196_24F58906D341_0/r/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_342D84E2_2413_E497_4196_24F58906D341_0/b/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "rowCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_342D84E2_2413_E497_4196_24F58906D341_0/b/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_342D84E2_2413_E497_4196_24F58906D341_0/b/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_342D84E2_2413_E497_4196_24F58906D341_0/b/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_342D84E2_2413_E497_4196_24F58906D341_0/d/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "rowCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_342D84E2_2413_E497_4196_24F58906D341_0/d/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_342D84E2_2413_E497_4196_24F58906D341_0/d/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_342D84E2_2413_E497_4196_24F58906D341_0/d/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "thumbnailUrl": "media/panorama_342D84E2_2413_E497_4196_24F58906D341_t.jpg"
  }
 ]
},
{
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_342B429A_2413_1CB7_41B3_2AB31B934588_camera"
},
{
 "hfovMax": 130,
 "label": "C\u1eeda ph\u00f2ng th\u1ef1c h\u00e0nh PLC",
 "id": "panorama_342BDCA9_2410_E495_41A9_07B2F5EA07A9",
 "overlays": [
  "this.overlay_3E3488BF_2413_6CEC_41BE_44DB9EFB60DE",
  "this.overlay_386084F7_2410_E47D_419D_A6CDFB267E7F"
 ],
 "pitch": 0,
 "vfov": 180,
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_342B429A_2413_1CB7_41B3_2AB31B934588",
   "yaw": 176.2,
   "class": "AdjacentPanorama",
   "distance": 1,
   "backwardYaw": -0.16
  },
  {
   "panorama": "this.panorama_3428501F_2413_1BAC_41BB_DB681B99BCAA",
   "yaw": 84.65,
   "class": "AdjacentPanorama",
   "distance": 1,
   "backwardYaw": -77.89
  }
 ],
 "thumbnailUrl": "media/panorama_342BDCA9_2410_E495_41A9_07B2F5EA07A9_t.jpg",
 "hfovMin": "120%",
 "class": "Panorama",
 "hfov": 360,
 "partial": false,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_342BDCA9_2410_E495_41A9_07B2F5EA07A9_0/f/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "rowCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_342BDCA9_2410_E495_41A9_07B2F5EA07A9_0/f/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_342BDCA9_2410_E495_41A9_07B2F5EA07A9_0/f/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_342BDCA9_2410_E495_41A9_07B2F5EA07A9_0/f/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_342BDCA9_2410_E495_41A9_07B2F5EA07A9_0/l/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "rowCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_342BDCA9_2410_E495_41A9_07B2F5EA07A9_0/l/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_342BDCA9_2410_E495_41A9_07B2F5EA07A9_0/l/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_342BDCA9_2410_E495_41A9_07B2F5EA07A9_0/l/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_342BDCA9_2410_E495_41A9_07B2F5EA07A9_0/u/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "rowCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_342BDCA9_2410_E495_41A9_07B2F5EA07A9_0/u/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_342BDCA9_2410_E495_41A9_07B2F5EA07A9_0/u/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_342BDCA9_2410_E495_41A9_07B2F5EA07A9_0/u/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_342BDCA9_2410_E495_41A9_07B2F5EA07A9_0/r/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "rowCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_342BDCA9_2410_E495_41A9_07B2F5EA07A9_0/r/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_342BDCA9_2410_E495_41A9_07B2F5EA07A9_0/r/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_342BDCA9_2410_E495_41A9_07B2F5EA07A9_0/r/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_342BDCA9_2410_E495_41A9_07B2F5EA07A9_0/b/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "rowCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_342BDCA9_2410_E495_41A9_07B2F5EA07A9_0/b/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_342BDCA9_2410_E495_41A9_07B2F5EA07A9_0/b/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_342BDCA9_2410_E495_41A9_07B2F5EA07A9_0/b/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_342BDCA9_2410_E495_41A9_07B2F5EA07A9_0/d/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "rowCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_342BDCA9_2410_E495_41A9_07B2F5EA07A9_0/d/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_342BDCA9_2410_E495_41A9_07B2F5EA07A9_0/d/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_342BDCA9_2410_E495_41A9_07B2F5EA07A9_0/d/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "thumbnailUrl": "media/panorama_342BDCA9_2410_E495_41A9_07B2F5EA07A9_t.jpg"
  }
 ]
},
{
 "hfovMax": 130,
 "label": "Ph\u00f2ng th\u00ed nhi\u1ec7m h\u1ec7 th\u1ed1ng \u0111i\u1ec7n view 1",
 "id": "panorama_342E07E9_2413_6495_41BA_9734E7BAC9CA",
 "overlays": [
  "this.overlay_33595313_246F_1DB4_41A0_7D648124D0F6",
  "this.overlay_330E1246_2411_3F9F_41AF_F96898263C27"
 ],
 "pitch": 0,
 "vfov": 180,
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_342FDDE8_2413_6493_41BF_AC46041A8646",
   "class": "AdjacentPanorama"
  },
  {
   "panorama": "this.panorama_342B349F_2413_24AC_41B9_DADBE85884B1",
   "yaw": -86.52,
   "class": "AdjacentPanorama",
   "distance": 1,
   "backwardYaw": 87.54
  }
 ],
 "thumbnailUrl": "media/panorama_342E07E9_2413_6495_41BA_9734E7BAC9CA_t.jpg",
 "hfovMin": "120%",
 "class": "Panorama",
 "hfov": 360,
 "partial": false,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_342E07E9_2413_6495_41BA_9734E7BAC9CA_0/f/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "rowCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_342E07E9_2413_6495_41BA_9734E7BAC9CA_0/f/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_342E07E9_2413_6495_41BA_9734E7BAC9CA_0/f/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_342E07E9_2413_6495_41BA_9734E7BAC9CA_0/f/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_342E07E9_2413_6495_41BA_9734E7BAC9CA_0/l/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "rowCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_342E07E9_2413_6495_41BA_9734E7BAC9CA_0/l/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_342E07E9_2413_6495_41BA_9734E7BAC9CA_0/l/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_342E07E9_2413_6495_41BA_9734E7BAC9CA_0/l/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_342E07E9_2413_6495_41BA_9734E7BAC9CA_0/u/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "rowCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_342E07E9_2413_6495_41BA_9734E7BAC9CA_0/u/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_342E07E9_2413_6495_41BA_9734E7BAC9CA_0/u/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_342E07E9_2413_6495_41BA_9734E7BAC9CA_0/u/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_342E07E9_2413_6495_41BA_9734E7BAC9CA_0/r/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "rowCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_342E07E9_2413_6495_41BA_9734E7BAC9CA_0/r/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_342E07E9_2413_6495_41BA_9734E7BAC9CA_0/r/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_342E07E9_2413_6495_41BA_9734E7BAC9CA_0/r/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_342E07E9_2413_6495_41BA_9734E7BAC9CA_0/b/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "rowCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_342E07E9_2413_6495_41BA_9734E7BAC9CA_0/b/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_342E07E9_2413_6495_41BA_9734E7BAC9CA_0/b/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_342E07E9_2413_6495_41BA_9734E7BAC9CA_0/b/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_342E07E9_2413_6495_41BA_9734E7BAC9CA_0/d/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "rowCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_342E07E9_2413_6495_41BA_9734E7BAC9CA_0/d/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_342E07E9_2413_6495_41BA_9734E7BAC9CA_0/d/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_342E07E9_2413_6495_41BA_9734E7BAC9CA_0/d/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "thumbnailUrl": "media/panorama_342E07E9_2413_6495_41BA_9734E7BAC9CA_t.jpg"
  }
 ]
},
{
 "paddingTop": 0,
 "toolTipPaddingRight": 6,
 "id": "MainViewer",
 "left": 0,
 "progressBorderRadius": 0,
 "width": "100%",
 "toolTipPaddingLeft": 6,
 "toolTipPaddingTop": 4,
 "playbackBarProgressBackgroundColorRatios": [
  0
 ],
 "borderRadius": 0,
 "toolTipDisplayTime": 600,
 "playbackBarHeadShadowBlurRadius": 3,
 "class": "ViewerArea",
 "progressBackgroundColorRatios": [
  0
 ],
 "playbackBarHeadBackgroundColorRatios": [
  0,
  1
 ],
 "toolTipBorderRadius": 3,
 "playbackBarLeft": 0,
 "playbackBarHeadHeight": 15,
 "paddingLeft": 0,
 "progressBarBorderColor": "#000000",
 "progressBackgroundColorDirection": "vertical",
 "progressBorderColor": "#000000",
 "progressBarBackgroundColorRatios": [
  0
 ],
 "playbackBarBottom": 5,
 "toolTipShadowSpread": 0,
 "playbackBarHeadOpacity": 1,
 "minHeight": 50,
 "progressBarBackgroundColor": [
  "#3399FF"
 ],
 "toolTipBorderColor": "#767676",
 "progressBackgroundColor": [
  "#FFFFFF"
 ],
 "playbackBarProgressBackgroundColorDirection": "vertical",
 "toolTipOpacity": 0.64,
 "toolTipFontSize": "1.11vmin",
 "playbackBarBackgroundColor": [
  "#FFFFFF"
 ],
 "minWidth": 100,
 "toolTipShadowBlurRadius": 3,
 "height": "100%",
 "playbackBarHeight": 10,
 "playbackBarBackgroundColorDirection": "vertical",
 "toolTipTextShadowColor": "#000000",
 "playbackBarHeadWidth": 6,
 "toolTipTextShadowBlurRadius": 3,
 "playbackBarRight": 0,
 "paddingBottom": 0,
 "playbackBarProgressBorderSize": 0,
 "toolTipPaddingBottom": 4,
 "playbackBarProgressBorderRadius": 0,
 "progressBarBorderRadius": 0,
 "toolTipFontWeight": "normal",
 "toolTipShadowColor": "#333333",
 "progressBarBorderSize": 0,
 "shadow": false,
 "playbackBarBorderRadius": 0,
 "toolTipShadowHorizontalLength": 0,
 "transitionDuration": 500,
 "toolTipShadowOpacity": 1,
 "toolTipShadowVerticalLength": 0,
 "playbackBarProgressBorderColor": "#000000",
 "playbackBarHeadBorderColor": "#000000",
 "playbackBarHeadBorderRadius": 0,
 "toolTipFontStyle": "normal",
 "progressLeft": 0,
 "playbackBarHeadBorderSize": 0,
 "playbackBarProgressOpacity": 1,
 "playbackBarBorderSize": 0,
 "propagateClick": false,
 "playbackBarBackgroundOpacity": 1,
 "toolTipFontFamily": "Arial",
 "vrPointerSelectionColor": "#FF6600",
 "toolTipTextShadowOpacity": 0,
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "paddingRight": 0,
 "top": 0,
 "playbackBarHeadShadowColor": "#000000",
 "vrPointerSelectionTime": 2000,
 "progressRight": 0,
 "firstTransitionDuration": 0,
 "progressOpacity": 1,
 "transitionMode": "blending",
 "progressBarBackgroundColorDirection": "vertical",
 "displayTooltipInTouchScreens": true,
 "borderSize": 0,
 "playbackBarHeadShadow": true,
 "progressBottom": 0,
 "toolTipBackgroundColor": "#F6F6F6",
 "toolTipFontColor": "#606060",
 "playbackBarHeadShadowVerticalLength": 0,
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "progressBackgroundOpacity": 1,
 "playbackBarProgressBackgroundColor": [
  "#3399FF"
 ],
 "playbackBarOpacity": 1,
 "progressHeight": 10,
 "vrPointerColor": "#FFFFFF",
 "progressBarOpacity": 1,
 "playbackBarHeadShadowOpacity": 0.7,
 "playbackBarHeadShadowHorizontalLength": 0,
 "playbackBarBorderColor": "#FFFFFF",
 "progressBorderSize": 0,
 "toolTipBorderSize": 1,
 "data": {
  "name": "Main Viewer"
 }
},
{
 "verticalAlign": "top",
 "paddingTop": 0,
 "children": [
  "this.Container_E12EC7BC_FC5E_3EF0_41E3_9D6B481D6995"
 ],
 "backgroundOpacity": 0.6,
 "id": "Container_E12E97BC_FC5E_3EF0_41BB_846FF6F501CC",
 "left": "0%",
 "scrollBarOpacity": 0.5,
 "scrollBarVisible": "rollOver",
 "borderRadius": 0,
 "right": "0%",
 "class": "Container",
 "creationPolicy": "inAdvance",
 "propagateClick": false,
 "paddingLeft": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "paddingRight": 0,
 "top": "0%",
 "scrollBarMargin": 2,
 "bottom": "0%",
 "contentOpaque": false,
 "minHeight": 1,
 "layout": "absolute",
 "borderSize": 0,
 "scrollBarWidth": 10,
 "minWidth": 1,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "click": "this.setComponentVisibility(this.Container_E12E97BC_FC5E_3EF0_41BB_846FF6F501CC, false, 0, this.effect_764B50D0_5098_666A_41CA_D502B62644A1, 'hideEffect', false)",
 "backgroundColorDirection": "vertical",
 "horizontalAlign": "left",
 "paddingBottom": 0,
 "data": {
  "name": "--PANORAMA LIST"
 },
 "visible": false,
 "gap": 10,
 "scrollBarColor": "#000000",
 "overflow": "scroll",
 "shadow": false
},
{
 "verticalAlign": "top",
 "paddingTop": 0,
 "children": [
  "this.Label_EE05A09D_FD91_02BD_41DF_50C0E556F878",
  "this.Container_EE05809D_FD91_02BD_41E9_A9FC73C05CF9",
  "this.Image_E8809774_FDF1_0F82_41E5_C3E79692D2C1",
  "this.IconButton_EF9865FA_FDFC_2BB2_41D0_99D4A8F1A4A5"
 ],
 "backgroundOpacity": 1,
 "id": "Container_EE05509D_FD91_02BD_41EF_9AA91BF3F817",
 "left": "0%",
 "scrollBarOpacity": 0.5,
 "scrollBarVisible": "rollOver",
 "borderRadius": 0,
 "right": "0%",
 "class": "Container",
 "creationPolicy": "inAdvance",
 "propagateClick": true,
 "paddingLeft": 0,
 "backgroundColorRatios": [
  0
 ],
 "paddingRight": 0,
 "top": "0.11%",
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "backgroundColor": [
  "#FFFFFF"
 ],
 "minHeight": 1,
 "layout": "absolute",
 "borderSize": 0,
 "scrollBarWidth": 10,
 "minWidth": 1,
 "backgroundColorDirection": "vertical",
 "height": 61,
 "horizontalAlign": "left",
 "paddingBottom": 0,
 "data": {
  "name": "--BUTTON SET"
 },
 "gap": 10,
 "scrollBarColor": "#000000",
 "overflow": "visible",
 "shadow": false
},
{
 "verticalAlign": "top",
 "paddingTop": 0,
 "backgroundOpacity": 0,
 "id": "Container_E5BB554E_FD93_039E_41E6_CA88984403B5",
 "scrollBarOpacity": 0.5,
 "width": 63.1,
 "scrollBarVisible": "rollOver",
 "borderRadius": 0,
 "class": "Container",
 "right": "0%",
 "creationPolicy": "inAdvance",
 "propagateClick": true,
 "paddingLeft": 0,
 "scrollBarMargin": 2,
 "paddingRight": 0,
 "bottom": "0%",
 "contentOpaque": false,
 "minHeight": 1,
 "layout": "absolute",
 "borderSize": 0,
 "scrollBarWidth": 10,
 "minWidth": 1,
 "height": 332,
 "horizontalAlign": "left",
 "paddingBottom": 0,
 "data": {
  "name": "--SETTINGS"
 },
 "gap": 10,
 "scrollBarColor": "#000000",
 "overflow": "scroll",
 "shadow": false
},
{
 "paddingTop": 20,
 "backgroundOpacity": 0.91,
 "id": "HTMLText_1B417888_0B13_AC7C_41A1_5FCA0700A4F3",
 "left": "0.9%",
 "scrollBarOpacity": 0.5,
 "width": "33.046%",
 "shadowColor": "#000000",
 "borderRadius": 10,
 "shadowOpacity": 0.19,
 "class": "HTMLText",
 "shadowVerticalLength": 2,
 "propagateClick": false,
 "paddingLeft": 20,
 "backgroundColorRatios": [
  0.73,
  1
 ],
 "paddingRight": 20,
 "top": "9.37%",
 "scrollBarMargin": 2,
 "minHeight": 1,
 "scrollBarVisible": "rollOver",
 "borderSize": 0,
 "scrollBarWidth": 10,
 "minWidth": 1,
 "backgroundColor": [
  "#FFFFFF",
  "#CCCCCC"
 ],
 "backgroundColorDirection": "vertical",
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vmin;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#0099ff;font-size:3.91vmin;\"><B>\u0110\u00f3ng g\u00f3p x\u00e2y d\u1ef1ng</B></SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:0.87vmin;\"><BR STYLE=\"letter-spacing:0vmin;color:#000000;font-size:0.58vmin;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vmin;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:1.16vmin;\"><B>Ng\u01b0\u1eddi th\u1ef1c hi\u1ec7n: Nguy\u1ec5n \u0110\u1ee9c H\u1ee3p</B></SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:0.58vmin;\"><BR STYLE=\"letter-spacing:0vmin;color:#000000;font-size:0.58vmin;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vmin;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:1.16vmin;\"><B>Gi\u1ea3ng vi\u00ean h\u01b0\u1edbng d\u1eabn: Nguy\u1ec5n Qu\u1ed1c Kh\u00e1nh</B></SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:1.16vmin;\"><BR STYLE=\"letter-spacing:0vmin;color:#000000;font-size:0.58vmin;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:justify;\"><SPAN STYLE=\"letter-spacing:0vmin;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#333333;font-size:1.16vmin;\">V\u1edbi m\u1ee5c ti\u00eau mang \u0111\u1ebfn m\u1ed9t c\u00e1i nh\u00ecn t\u1ed5ng quan v\u00e0 ch\u00e2n th\u1ef1c nh\u1ea5t v\u1ec1 khoa \u0110i\u1ec7n, Tr\u01b0\u1eddng \u0110\u1ea1i h\u1ecdc C\u00f4ng nghi\u1ec7p Vi\u1ec7t Tr\u00ec, ch\u00fang t\u00f4i \u0111\u00e3 x\u00e2y d\u1ef1ng tour tham quan 3D hi\u1ec7n \u0111\u1ea1i v\u00e0 s\u1ed1ng \u0111\u1ed9ng. \u0110\u00e2y l\u00e0 c\u01a1 h\u1ed9i \u0111\u1ec3 c\u00e1c b\u1ea1n h\u1ecdc sinh v\u00e0 ph\u1ee5 huynh c\u00f3 th\u1ec3 tr\u1ea3i nghi\u1ec7m v\u00e0 kh\u00e1m ph\u00e1 m\u00f4i tr\u01b0\u1eddng h\u1ecdc t\u1eadp, c\u01a1 s\u1edf v\u1eadt ch\u1ea5t, c\u0169ng nh\u01b0 c\u00e1c ho\u1ea1t \u0111\u1ed9ng nghi\u00ean c\u1ee9u v\u00e0 ph\u00e1t tri\u1ec3n t\u1ea1i khoa. Ch\u00fang t\u00f4i hy v\u1ecdng r\u1eb1ng, th\u00f4ng qua tour tham quan n\u00e0y, c\u00e1c b\u1ea1n s\u1ebd c\u00f3 th\u00eam nhi\u1ec1u th\u00f4ng tin h\u1eefu \u00edch \u0111\u1ec3 \u0111\u01b0a ra quy\u1ebft \u0111\u1ecbnh \u0111\u00fang \u0111\u1eafn cho t\u01b0\u01a1ng lai h\u1ecdc t\u1eadp v\u00e0 ngh\u1ec1 nghi\u1ec7p c\u1ee7a m\u00ecnh.</SPAN></SPAN></DIV></div>",
 "shadowHorizontalLength": 2,
 "paddingBottom": 10,
 "data": {
  "name": "HTMLText53815"
 },
 "height": "25.065%",
 "shadowBlurRadius": 7,
 "shadowSpread": 1,
 "scrollBarColor": "#000000",
 "shadow": true
},
{
 "cursor": "hand",
 "verticalAlign": "middle",
 "paddingTop": 0,
 "backgroundOpacity": 0,
 "id": "IconButton_047915E6_0AF0_A7B4_419E_B4D24A966C32",
 "left": "1.21%",
 "width": 40,
 "pressedRollOverIconURL": "skin/IconButton_047915E6_0AF0_A7B4_419E_B4D24A966C32_pressed_rollover.png",
 "borderRadius": 0,
 "pressedIconURL": "skin/IconButton_047915E6_0AF0_A7B4_419E_B4D24A966C32_pressed.png",
 "class": "IconButton",
 "transparencyActive": false,
 "propagateClick": false,
 "paddingLeft": 0,
 "paddingRight": 0,
 "bottom": "2.21%",
 "iconURL": "skin/IconButton_047915E6_0AF0_A7B4_419E_B4D24A966C32.png",
 "mode": "toggle",
 "minHeight": 0,
 "borderSize": 0,
 "minWidth": 0,
 "height": 40,
 "click": "if(!this.HTMLText_1B417888_0B13_AC7C_41A1_5FCA0700A4F3.get('visible')){ this.setComponentVisibility(this.HTMLText_1B417888_0B13_AC7C_41A1_5FCA0700A4F3, true, 0, null, null, false) } else { this.setComponentVisibility(this.HTMLText_1B417888_0B13_AC7C_41A1_5FCA0700A4F3, false, 0, null, null, false) }",
 "rollOverIconURL": "skin/IconButton_047915E6_0AF0_A7B4_419E_B4D24A966C32_rollover.png",
 "horizontalAlign": "center",
 "paddingBottom": 0,
 "data": {
  "name": "Button6727"
 },
 "shadow": false
},
{
 "verticalAlign": "top",
 "paddingTop": 0,
 "children": [
  "this.IconButton_E5B8B54E_FD93_039E_41E4_16E8436FBD35",
  "this.IconButton_E5BB654E_FD93_039E_41EB_C8BE372978C3",
  "this.IconButton_E5B8A54E_FD93_039E_41E3_948216944E04"
 ],
 "backgroundOpacity": 0,
 "id": "Container_1949E009_0CC4_4EFC_41A1_1A3EDD7D64F5",
 "left": "89%",
 "scrollBarOpacity": 0.5,
 "scrollBarVisible": "rollOver",
 "borderRadius": 0,
 "class": "Container",
 "right": "0.48%",
 "propagateClick": false,
 "paddingLeft": 0,
 "scrollBarMargin": 2,
 "paddingRight": 0,
 "bottom": "0.78%",
 "contentOpaque": false,
 "creationPolicy": "inAdvance",
 "minHeight": 1,
 "layout": "absolute",
 "borderSize": 0,
 "scrollBarWidth": 10,
 "minWidth": 1,
 "horizontalAlign": "left",
 "height": "10.695%",
 "paddingBottom": 0,
 "data": {
  "name": "Container13631"
 },
 "gap": 10,
 "scrollBarColor": "#000000",
 "overflow": "scroll",
 "shadow": false
},
{
 "cursor": "hand",
 "verticalAlign": "middle",
 "paddingTop": 0,
 "backgroundOpacity": 0,
 "id": "IconButton_E5BB654E_FD93_039E_41EB_C8BE372978C3",
 "pressedRollOverIconURL": "skin/IconButton_E5BB654E_FD93_039E_41EB_C8BE372978C3_pressed_rollover.png",
 "width": 50,
 "transparencyActive": true,
 "maxWidth": 58,
 "pressedIconURL": "skin/IconButton_E5BB654E_FD93_039E_41EB_C8BE372978C3_pressed.png",
 "class": "IconButton",
 "maxHeight": 58,
 "borderRadius": 0,
 "right": "0%",
 "propagateClick": true,
 "paddingLeft": 0,
 "paddingRight": 0,
 "bottom": "-1.01%",
 "minHeight": 1,
 "iconURL": "skin/IconButton_E5BB654E_FD93_039E_41EB_C8BE372978C3.png",
 "mode": "toggle",
 "borderSize": 0,
 "minWidth": 1,
 "height": 50,
 "horizontalAlign": "center",
 "paddingBottom": 0,
 "data": {
  "name": "IconButton FULLSCREEN"
 },
 "shadow": false
},
{
 "cursor": "hand",
 "verticalAlign": "middle",
 "paddingTop": 0,
 "backgroundOpacity": 0,
 "id": "IconButton_E5B8B54E_FD93_039E_41E4_16E8436FBD35",
 "pressedRollOverIconURL": "skin/IconButton_E5B8B54E_FD93_039E_41E4_16E8436FBD35_pressed_rollover.png",
 "width": 50,
 "transparencyActive": true,
 "maxWidth": 58,
 "pressedIconURL": "skin/IconButton_E5B8B54E_FD93_039E_41E4_16E8436FBD35_pressed.png",
 "class": "IconButton",
 "maxHeight": 58,
 "borderRadius": 0,
 "right": "29.27%",
 "propagateClick": true,
 "paddingLeft": 0,
 "paddingRight": 0,
 "bottom": "-6.41%",
 "minHeight": 1,
 "iconURL": "skin/IconButton_E5B8B54E_FD93_039E_41E4_16E8436FBD35.png",
 "mode": "toggle",
 "borderSize": 0,
 "minWidth": 1,
 "height": 50,
 "horizontalAlign": "center",
 "paddingBottom": 0,
 "data": {
  "name": "IconButton MUTE"
 },
 "shadow": false
},
{
 "items": [
  {
   "image": "this.AnimatedImageResource_28EC4E81_251D_56B8_41B6_1F76C01DDF43",
   "pitch": -3.38,
   "yaw": 86.71,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 5.5,
   "distance": 100
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 5)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 5.5,
   "yaw": 86.71,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_342FDDE8_2413_6493_41BF_AC46041A8646_1_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -3.38
  }
 ],
 "id": "overlay_339722EE_2413_1C6F_41C0_3AD64CD02836",
 "data": {
  "label": "Circle Door 01"
 },
 "enabledInCardboard": true
},
{
 "items": [
  {
   "image": "this.AnimatedImageResource_28EE8E82_251D_56B8_41C0_FD50BF175228",
   "pitch": -10.14,
   "yaw": 68.82,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 7.26,
   "distance": 50
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_342D5EBB_2413_24F5_41A3_4DE7DBE219BD, this.camera_35D9D065_3925_9D64_41B6_6511ABF3017F); this.mainPlayList.set('selectedIndex', 8)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 7.26,
   "yaw": 68.82,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_342FC184_2413_1C93_41A0_8E7108979C5B_1_HS_0_0_0_map.gif",
      "width": 29,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -10.14
  }
 ],
 "id": "overlay_3DBC7F19_2417_65B4_4193_13F0734E74D0",
 "data": {
  "label": "Arrow 06a Left-Up"
 },
 "enabledInCardboard": true
},
{
 "items": [
  {
   "image": "this.AnimatedImageResource_28EC3E82_251D_56B8_41A6_F400149040F4",
   "pitch": -12.05,
   "yaw": 169.6,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 11.6,
   "distance": 100
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_342DC6C8_2410_E493_41B9_7E20A878670E, this.camera_3422506F_3925_9D64_41AD_BAE119B3B83A); this.mainPlayList.set('selectedIndex', 10)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 11.6,
   "yaw": 169.6,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_342FC184_2413_1C93_41A0_8E7108979C5B_1_HS_1_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -12.05
  }
 ],
 "id": "overlay_3CA03B2F_2411_6DED_41C0_609050F20E2C",
 "data": {
  "label": "Circle Generic 01"
 },
 "enabledInCardboard": true
},
{
 "items": [
  {
   "image": "this.AnimatedImageResource_28EDAE82_251D_56B8_41AE_48C9429C94CE",
   "pitch": -3.37,
   "yaw": 7.05,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 11.84,
   "distance": 100
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_342B429A_2413_1CB7_41B3_2AB31B934588, this.camera_342AC07A_3925_9D6C_41A5_328913A3557B); this.mainPlayList.set('selectedIndex', 16)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 11.84,
   "yaw": 7.05,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_342FC184_2413_1C93_41A0_8E7108979C5B_1_HS_2_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -3.37
  }
 ],
 "id": "overlay_3D2D1D96_2411_24BF_419A_9CFC55FBB198",
 "data": {
  "label": "Circle Generic 01"
 },
 "enabledInCardboard": true
},
{
 "items": [
  {
   "image": "this.AnimatedImageResource_28EDFE83_251D_56B8_41B2_CC50FB24DBF8",
   "pitch": -4.33,
   "yaw": 81.65,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 8.76,
   "distance": 100
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_342E346A_2413_7B97_41B3_D351C68A0619, this.camera_347FC0CC_3925_9DA4_4193_5BDDCF93EF18); this.mainPlayList.set('selectedIndex', 11)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 8.76,
   "yaw": 81.65,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_342DC6C8_2410_E493_41B9_7E20A878670E_1_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -4.33
  }
 ],
 "id": "overlay_3DE2ABD5_2411_2CBD_41B0_03B9965ED1E8",
 "data": {
  "label": "Circle Door 01"
 },
 "enabledInCardboard": true
},
{
 "items": [
  {
   "image": "this.AnimatedImageResource_28ED5E83_251D_56B8_41AA_18EE07B2D0BE",
   "pitch": -11.15,
   "yaw": -6.75,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 11.64,
   "distance": 100
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_342FC184_2413_1C93_41A0_8E7108979C5B, this.camera_344BB0D5_3925_9DA4_41C4_85626D00D20D); this.mainPlayList.set('selectedIndex', 9)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 11.64,
   "yaw": -6.75,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_342DC6C8_2410_E493_41B9_7E20A878670E_1_HS_1_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -11.15
  }
 ],
 "id": "overlay_3DEFD5A8_2411_2493_41AA_ADB9ED2984D9",
 "data": {
  "label": "Circle Generic 01"
 },
 "enabledInCardboard": true
},
{
 "items": [
  {
   "image": "this.AnimatedImageResource_28EECE83_251D_56B8_4194_4C54C5E23BDC",
   "pitch": -6.84,
   "yaw": -141.94,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 8.73,
   "distance": 100
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_342DC6C8_2410_E493_41B9_7E20A878670E, this.camera_34B610F6_3925_9D64_41CB_5F472C6598A5); this.mainPlayList.set('selectedIndex', 10)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 8.73,
   "yaw": -141.94,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_342E346A_2413_7B97_41B3_D351C68A0619_1_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -6.84
  }
 ],
 "id": "overlay_3E7FA3AE_241F_3CEF_41B4_A58C30AF6002",
 "data": {
  "label": "Circle Door 01"
 },
 "enabledInCardboard": true
},
{
 "items": [
  {
   "image": "this.AnimatedImageResource_28EE1E83_251D_56B8_4195_195EAEEBC93A",
   "pitch": -0.57,
   "yaw": 108.37,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 5.06,
   "distance": 100
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 12)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 5.06,
   "yaw": 108.37,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_342E346A_2413_7B97_41B3_D351C68A0619_1_HS_1_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -0.57
  }
 ],
 "id": "overlay_3F4C831B_2411_3DB5_41A2_8601E6FE9DFA",
 "data": {
  "label": "Circle Generic 01"
 },
 "enabledInCardboard": true
},
{
 "items": [
  {
   "image": "this.AnimatedImageResource_28E8AE84_251D_56B8_41A5_715711BB37EB",
   "pitch": 0.18,
   "yaw": 84.75,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 5.06,
   "distance": 100
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 15)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 5.06,
   "yaw": 84.75,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_3428501F_2413_1BAC_41BB_DB681B99BCAA_1_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 0.18
  }
 ],
 "id": "overlay_3F290A95_2411_6CBD_41B1_6481D32DEEF7",
 "data": {
  "label": "Circle Generic 01"
 },
 "enabledInCardboard": true
},
{
 "items": [
  {
   "image": "this.AnimatedImageResource_28E81E84_251D_56B8_41B2_F9A52E5CD9D2",
   "pitch": -6.84,
   "yaw": -77.89,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 8.73,
   "distance": 100
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_342BDCA9_2410_E495_41A9_07B2F5EA07A9, this.camera_34AA20EE_3925_9D64_41AE_C9CD1D7D8084); this.mainPlayList.set('selectedIndex', 13)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 8.73,
   "yaw": -77.89,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_3428501F_2413_1BAC_41BB_DB681B99BCAA_1_HS_1_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -6.84
  }
 ],
 "id": "overlay_387AB658_2417_67B3_4196_CD7B5A7D2C68",
 "data": {
  "label": "Circle Door 01"
 },
 "enabledInCardboard": true
},
{
 "items": [
  {
   "image": "this.AnimatedImageResource_28EAFE85_251D_56B8_41B9_BCBDF472C06B",
   "pitch": 2.96,
   "yaw": 89.3,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 5.05,
   "distance": 100
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 18)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 5.05,
   "yaw": 89.3,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_34280C43_2413_2B94_41B4_A77E6ADEC474_1_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 2.96
  }
 ],
 "id": "overlay_39EDCC2E_2413_6BEF_41C0_8ABA2B7D67D9",
 "data": {
  "label": "Circle Generic 01"
 },
 "enabledInCardboard": true
},
{
 "items": [
  {
   "image": "this.AnimatedImageResource_28EA5E85_251D_56B8_41B6_D3068F9664B3",
   "pitch": -13,
   "yaw": -58.64,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 13.49,
   "distance": 100
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_342B429A_2413_1CB7_41B3_2AB31B934588, this.camera_3431F085_3925_9DA4_41C7_AF491BC58BB5); this.mainPlayList.set('selectedIndex', 16)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 13.49,
   "yaw": -58.64,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_34280C43_2413_2B94_41B4_A77E6ADEC474_1_HS_1_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -13
  }
 ],
 "id": "overlay_3A071853_2411_2BB5_41A3_2D8BDB3FE302",
 "data": {
  "label": "Circle Door 01"
 },
 "enabledInCardboard": true
},
{
 "items": [
  {
   "image": "this.AnimatedImageResource_28E9CE85_251D_56B8_41B2_7289EAF06815",
   "pitch": -4.14,
   "yaw": 83.14,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 8.77,
   "distance": 100
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_34280C43_2413_2B94_41B4_A77E6ADEC474, this.camera_3776AFF3_3924_637C_41C6_DFF61EB80C2A); this.mainPlayList.set('selectedIndex', 17)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 8.77,
   "yaw": 83.14,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_342B429A_2413_1CB7_41B3_2AB31B934588_1_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -4.14
  }
 ],
 "id": "overlay_381B2DB7_2411_24FD_4197_615317AD8AD9",
 "data": {
  "label": "Circle Door 01"
 },
 "enabledInCardboard": true
},
{
 "items": [
  {
   "image": "this.AnimatedImageResource_28E95E85_251D_56B8_41B5_F19E012CD5D7",
   "pitch": -3.84,
   "yaw": -0.16,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 5.05,
   "distance": 100
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_342BDCA9_2410_E495_41A9_07B2F5EA07A9, this.camera_3740DFFB_3924_636C_41B8_E59EE7FA798F); this.mainPlayList.set('selectedIndex', 13)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 5.05,
   "yaw": -0.16,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_342B429A_2413_1CB7_41B3_2AB31B934588_1_HS_1_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -3.84
  }
 ],
 "id": "overlay_38036BDF_2411_2CAD_41C1_E5A2EBC41030",
 "data": {
  "label": "Circle Generic 01"
 },
 "enabledInCardboard": true
},
{
 "items": [
  {
   "image": "this.AnimatedImageResource_28EA9E85_251D_56B8_4192_0E6ECD6C4A53",
   "pitch": -4.59,
   "yaw": 176.95,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 5.04,
   "distance": 100
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_342FC184_2413_1C93_41A0_8E7108979C5B, this.camera_37664FEB_3924_636C_4184_D4A5367C8AD0); this.mainPlayList.set('selectedIndex', 9)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 5.04,
   "yaw": 176.95,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_342B429A_2413_1CB7_41B3_2AB31B934588_1_HS_2_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -4.59
  }
 ],
 "id": "overlay_3973BBD2_2413_2CB7_416C_12E78AC7CC4A",
 "data": {
  "label": "Circle Generic 01"
 },
 "enabledInCardboard": true
},
{
 "items": [
  {
   "image": "this.AnimatedImageResource_28EBBE86_251D_56B8_41BC_95092D8C94A0",
   "pitch": 3.24,
   "yaw": 77.96,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 5.65,
   "distance": 100
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 16)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 5.65,
   "yaw": 77.96,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_342AC208_2413_3F93_4191_930FEFDE0ACE_1_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 3.24
  }
 ],
 "id": "overlay_3B730E77_242F_E47D_41A8_430BA66B17D1",
 "data": {
  "label": "Circle Door 01"
 },
 "enabledInCardboard": true
},
{
 "items": [
  {
   "image": "this.AnimatedImageResource_28D3CE81_251D_56B8_41C0_F43AD41C631F",
   "pitch": -15.31,
   "yaw": -0.21,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 4.84,
   "distance": 50
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_342E9897_2413_2CBD_4188_A3C48D655DA0, this.camera_35C0402D_3925_9CE4_41CA_C08B3C749FB7); this.mainPlayList.set('selectedIndex', 2)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 4.84,
   "yaw": -0.21,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_342B349F_2413_24AC_41B9_DADBE85884B1_1_HS_0_0_0_map.gif",
      "width": 29,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -15.31
  }
 ],
 "id": "overlay_3D1E0568_246F_2593_41BD_7CE431E3E099",
 "data": {
  "label": "Arrow 06a Right-Up"
 },
 "enabledInCardboard": true
},
{
 "items": [
  {
   "image": "this.AnimatedImageResource_28D31E81_251D_56B8_41AA_A1A9A234928E",
   "pitch": -0.87,
   "yaw": 87.54,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 8.79,
   "distance": 100
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_342E07E9_2413_6495_41BA_9734E7BAC9CA, this.camera_35C57038_3925_9CEC_419D_85FF8DD7FA34); this.mainPlayList.set('selectedIndex', 6)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 8.79,
   "yaw": 87.54,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_342B349F_2413_24AC_41B9_DADBE85884B1_1_HS_1_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -0.87
  }
 ],
 "id": "overlay_339EEEA7_246F_249D_41BD_17FC158E37E7",
 "data": {
  "label": "Circle Door 01"
 },
 "enabledInCardboard": true
},
{
 "items": [
  {
   "image": "this.AnimatedImageResource_28EF8E83_251D_56B8_41C1_503BC29F4C77",
   "pitch": -0.23,
   "yaw": 83.85,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 5.68,
   "distance": 100
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 10)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 5.68,
   "yaw": 83.85,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_34281A46_2413_6F9F_4194_314606A9EFDA_1_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -0.23
  }
 ],
 "id": "overlay_3EDBF755_2411_25BD_41B6_A94214F5DB10",
 "data": {
  "label": "Circle Door 01"
 },
 "enabledInCardboard": true
},
{
 "items": [
  {
   "image": "this.AnimatedImageResource_28D2CE80_251D_56B8_4195_81FA2119B464",
   "pitch": -5.26,
   "yaw": -121.44,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 8.75,
   "distance": 100
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_342E9897_2413_2CBD_4188_A3C48D655DA0, this.camera_345DE0E5_3925_9D64_41B7_A8399E798E73); this.mainPlayList.set('selectedIndex', 2)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 8.75,
   "yaw": -121.44,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_34189E55_2413_27BC_41B9_93C0709397D9_1_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -5.26
  }
 ],
 "id": "overlay_3183A59D_2477_64AD_41B4_6F87EBD97E48",
 "data": {
  "label": "Circle Door 01"
 },
 "enabledInCardboard": true
},
{
 "items": [
  {
   "image": "this.AnimatedImageResource_28D22E80_251D_56B8_41B5_6CB52A886857",
   "pitch": -1.3,
   "yaw": 92.78,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 7.16,
   "distance": 100
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_342D84E2_2413_E497_4196_24F58906D341, this.camera_3451F0DE_3925_9DA4_41C0_029A5719B27B); this.mainPlayList.set('selectedIndex', 4)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 7.16,
   "yaw": 92.78,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_34189E55_2413_27BC_41B9_93C0709397D9_1_HS_1_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -1.3
  }
 ],
 "id": "overlay_336BFB5E_2473_2DAC_41BB_0ED78BC2A8F1",
 "data": {
  "label": "Circle Generic 01"
 },
 "enabledInCardboard": true
},
{
 "items": [
  {
   "image": "this.AnimatedImageResource_28D1EE80_251D_56B8_41BB_DB609E3FA4CE",
   "pitch": -19.82,
   "yaw": 98.56,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 4.96,
   "distance": 100
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_342B349F_2413_24AC_41B9_DADBE85884B1, this.camera_347170C2_3925_9D9C_41B6_4A221A2D904A); this.mainPlayList.set('selectedIndex', 5)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 4.96,
   "yaw": 98.56,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_342E9897_2413_2CBD_4188_A3C48D655DA0_1_HS_0_0_0_map.gif",
      "width": 32,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -19.82
  }
 ],
 "id": "overlay_3160FB6A_2471_6D97_41C1_B43F27808ABC",
 "data": {
  "label": "Arrow 06b"
 },
 "enabledInCardboard": true
},
{
 "items": [
  {
   "image": "this.AnimatedImageResource_28D14E80_251D_56B8_41A8_66C325216116",
   "pitch": -2.5,
   "yaw": -154.85,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 8.78,
   "distance": 100
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_34189E55_2413_27BC_41B9_93C0709397D9, this.camera_346430BA_3925_9DEC_4191_6CD00E7318A5); this.mainPlayList.set('selectedIndex', 3)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 8.78,
   "yaw": -154.85,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_342E9897_2413_2CBD_4188_A3C48D655DA0_1_HS_1_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -2.5
  }
 ],
 "id": "overlay_324BB8F1_2470_EC77_41B4_C715A4354DC9",
 "data": {
  "label": "Circle Door 01"
 },
 "enabledInCardboard": true
},
{
 "items": [
  {
   "image": "this.AnimatedImageResource_28D17E80_251D_56B8_41B0_C631DD8A652B",
   "pitch": -11.48,
   "yaw": -62.25,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 5.6,
   "distance": 50
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_342B97D5_2413_24BC_4161_1AF8B2777271, this.camera_341F00B1_3925_9DFC_41A0_38526F7AA265); this.mainPlayList.set('selectedIndex', 1)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 5.6,
   "yaw": -62.25,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_342E9897_2413_2CBD_4188_A3C48D655DA0_1_HS_2_0_0_map.gif",
      "width": 29,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -11.48
  }
 ],
 "id": "overlay_3DC3DBDD_2473_6CAD_41B6_B89893C65E91",
 "data": {
  "label": "Arrow 06a Right-Up"
 },
 "enabledInCardboard": true
},
{
 "cursor": "hand",
 "verticalAlign": "middle",
 "paddingTop": 0,
 "backgroundOpacity": 0,
 "id": "IconButton_E5B8A54E_FD93_039E_41E3_948216944E04",
 "left": "0.75%",
 "width": 50,
 "pressedRollOverIconURL": "skin/IconButton_E5B8A54E_FD93_039E_41E3_948216944E04_pressed_rollover.png",
 "maxWidth": 58,
 "pressedIconURL": "skin/IconButton_E5B8A54E_FD93_039E_41E3_948216944E04_pressed.png",
 "class": "IconButton",
 "maxHeight": 58,
 "borderRadius": 0,
 "transparencyActive": true,
 "propagateClick": true,
 "paddingLeft": 0,
 "paddingRight": 0,
 "bottom": "-6.76%",
 "minHeight": 1,
 "iconURL": "skin/IconButton_E5B8A54E_FD93_039E_41E3_948216944E04.png",
 "mode": "toggle",
 "borderSize": 0,
 "minWidth": 1,
 "height": 50,
 "horizontalAlign": "center",
 "paddingBottom": 0,
 "data": {
  "name": "IconButton GYRO"
 },
 "shadow": false
},
{
 "items": [
  {
   "image": "this.AnimatedImageResource_28EC7E81_251D_56B8_41C0_922C61E32CBA",
   "pitch": -6.24,
   "yaw": -57.11,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 5.24,
   "distance": 100
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_342B97D5_2413_24BC_4161_1AF8B2777271, this.camera_35CC904D_3925_9CA4_41BC_1DEE9F194F38); this.mainPlayList.set('selectedIndex', 1)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 5.24,
   "yaw": -57.11,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_342D5EBB_2413_24F5_41A3_4DE7DBE219BD_1_HS_0_0_0_map.gif",
      "width": 27,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -6.24
  }
 ],
 "id": "overlay_3C205D91_2413_64B5_41B8_64D33E857762",
 "data": {
  "label": "Arrow 06a"
 },
 "enabledInCardboard": true
},
{
 "items": [
  {
   "image": "this.AnimatedImageResource_28EDCE82_251D_56B8_41BB_36831A06CDDF",
   "pitch": -6.1,
   "yaw": -116.95,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 5.24,
   "distance": 100
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_35543A08_2410_EF93_41B5_10CEB879EE30, this.camera_35C82043_3925_9C9C_41BF_6561E8ACEBBC); this.mainPlayList.set('selectedIndex', 0)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 5.24,
   "yaw": -116.95,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_342D5EBB_2413_24F5_41A3_4DE7DBE219BD_1_HS_1_0_0_map.gif",
      "width": 27,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -6.1
  }
 ],
 "id": "overlay_3D7270BB_2413_1CF5_41BF_588BB84A9E40",
 "data": {
  "label": "Arrow 06a"
 },
 "enabledInCardboard": true
},
{
 "items": [
  {
   "image": "this.AnimatedImageResource_28ED0E82_251D_56B8_41A8_263AE4FA3940",
   "pitch": 10.22,
   "yaw": 73.69,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 5.62,
   "distance": 50
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_342FC184_2413_1C93_41A0_8E7108979C5B, this.camera_35D51059_3925_9CAC_41C4_E7E7E4E139F3); this.mainPlayList.set('selectedIndex', 9)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 5.62,
   "yaw": 73.69,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_342D5EBB_2413_24F5_41A3_4DE7DBE219BD_1_HS_2_0_0_map.gif",
      "width": 29,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 10.22
  }
 ],
 "id": "overlay_3D2A5C4B_2411_2B95_41C0_B7E71FB2FF9A",
 "data": {
  "label": "Arrow 06b Left-Up"
 },
 "enabledInCardboard": true
},
{
 "items": [
  {
   "image": "this.AnimatedImageResource_28D73E7E_251D_5648_41C1_FD26A2F1855F",
   "pitch": -3.74,
   "yaw": 81.45,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 5.26,
   "distance": 100
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_342B97D5_2413_24BC_4161_1AF8B2777271, this.camera_372FBFB1_3924_63FC_41BF_92213EC0510F); this.mainPlayList.set('selectedIndex', 1)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 5.26,
   "yaw": 81.45,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_35543A08_2410_EF93_41B5_10CEB879EE30_1_HS_0_0_0_map.gif",
      "width": 32,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -3.74
  }
 ],
 "id": "overlay_3739C375_2413_1C7D_419D_96252434BBDD",
 "data": {
  "label": "Arrow 06b"
 },
 "enabledInCardboard": true
},
{
 "items": [
  {
   "image": "this.AnimatedImageResource_28D0AE7F_251D_5648_41A9_905984EBB62B",
   "pitch": -3.47,
   "yaw": 138.44,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 5.26,
   "distance": 100
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_342D5EBB_2413_24F5_41A3_4DE7DBE219BD, this.camera_37356FC5_3924_63A4_41B1_C888ECC650A2); this.mainPlayList.set('selectedIndex', 8)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 5.26,
   "yaw": 138.44,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_35543A08_2410_EF93_41B5_10CEB879EE30_1_HS_1_0_0_map.gif",
      "width": 32,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -3.47
  }
 ],
 "id": "overlay_3106BD2B_2411_2595_41BB_2DE00F988E6D",
 "data": {
  "label": "Arrow 06b"
 },
 "enabledInCardboard": true
},
{
 "items": [
  {
   "image": "this.AnimatedImageResource_28D00E7F_251D_5648_41A7_339F0B671A4A",
   "pitch": -3.41,
   "yaw": 79.5,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 5.26,
   "distance": 100
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_342E9897_2413_2CBD_4188_A3C48D655DA0, this.camera_3714BFDF_3924_63A4_41C7_167C1FC5E803); this.mainPlayList.set('selectedIndex', 2)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 5.26,
   "yaw": 79.5,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_342B97D5_2413_24BC_4161_1AF8B2777271_1_HS_0_0_0_map.gif",
      "width": 32,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -3.41
  }
 ],
 "id": "overlay_311A3A31_2471_EFF5_41A2_3BF9809CA9DD",
 "data": {
  "label": "Arrow 06b"
 },
 "enabledInCardboard": true
},
{
 "items": [
  {
   "image": "this.AnimatedImageResource_28D03E7F_251D_5648_41AF_C26B6D1EE8ED",
   "pitch": -6.16,
   "yaw": -66.53,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 5.24,
   "distance": 100
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_35543A08_2410_EF93_41B5_10CEB879EE30, this.camera_37021FCD_3924_63A4_41B0_3F242D082D40); this.mainPlayList.set('selectedIndex', 0)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 5.24,
   "yaw": -66.53,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_342B97D5_2413_24BC_4161_1AF8B2777271_1_HS_1_0_0_map.gif",
      "width": 32,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -6.16
  }
 ],
 "id": "overlay_31842339_2471_3DF5_41A5_2EB8A9C4B882",
 "data": {
  "label": "Arrow 06b"
 },
 "enabledInCardboard": true
},
{
 "items": [
  {
   "image": "this.AnimatedImageResource_28D07E80_251D_56B8_41AE_AB600B28435C",
   "pitch": -5.1,
   "yaw": -144.56,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 5.25,
   "distance": 100
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_342D5EBB_2413_24F5_41A3_4DE7DBE219BD, this.camera_37091FD6_3924_63A4_41C3_A93A813897EF); this.mainPlayList.set('selectedIndex', 8)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 5.25,
   "yaw": -144.56,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_342B97D5_2413_24BC_4161_1AF8B2777271_1_HS_2_0_0_map.gif",
      "width": 32,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -5.1
  }
 ],
 "id": "overlay_309A2BD5_247F_2CBD_41A2_12EE96E3BC6F",
 "data": {
  "label": "Arrow 06b"
 },
 "enabledInCardboard": true
},
{
 "items": [
  {
   "image": "this.AnimatedImageResource_28E98E84_251D_56B8_41AF_5271BC5F05EB",
   "pitch": -0.24,
   "yaw": 80.67,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 3.7,
   "distance": 100
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 13)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 3.7,
   "yaw": 80.67,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_342BD5E7_2413_249D_41C1_23B84F82611D_1_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -0.24
  }
 ],
 "id": "overlay_388265A6_2411_249F_41A5_4C53D61DD3EA",
 "data": {
  "label": "Circle Door 01"
 },
 "enabledInCardboard": true
},
{
 "items": [
  {
   "image": "this.AnimatedImageResource_28D27E80_251D_56B8_41BB_04D9FA27D689",
   "pitch": -1.4,
   "yaw": 84.69,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 5.07,
   "distance": 100
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_34189E55_2413_27BC_41B9_93C0709397D9, this.camera_3483E100_3925_9C9C_41CB_754D338E4455); this.mainPlayList.set('selectedIndex', 3)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 5.07,
   "yaw": 84.69,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_342D84E2_2413_E497_4196_24F58906D341_1_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -1.4
  }
 ],
 "id": "overlay_33587585_2471_649D_41BF_3F9536E3CACA",
 "data": {
  "label": "Circle Door 01"
 },
 "enabledInCardboard": true
},
{
 "items": [
  {
   "image": "this.AnimatedImageResource_28EFEE84_251D_56B8_41B4_258F25B37D0D",
   "pitch": 2.2,
   "yaw": 84.65,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 8.78,
   "distance": 100
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_3428501F_2413_1BAC_41BB_DB681B99BCAA, this.camera_3404509E_3925_9DA4_41C9_F4F7B7CDE572); this.mainPlayList.set('selectedIndex', 14)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 8.78,
   "yaw": 84.65,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_342BDCA9_2410_E495_41A9_07B2F5EA07A9_1_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 2.2
  }
 ],
 "id": "overlay_3E3488BF_2413_6CEC_41BE_44DB9EFB60DE",
 "data": {
  "label": "Circle Door 01"
 },
 "enabledInCardboard": true
},
{
 "items": [
  {
   "image": "this.AnimatedImageResource_28EF5E84_251D_56B8_41A3_6FB6169210F2",
   "pitch": -4.84,
   "yaw": 176.2,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 5.04,
   "distance": 100
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_342B429A_2413_1CB7_41B3_2AB31B934588, this.camera_343D0093_3925_9DBC_41BB_2A930B06A5DA); this.mainPlayList.set('selectedIndex', 16)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 5.04,
   "yaw": 176.2,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_342BDCA9_2410_E495_41A9_07B2F5EA07A9_1_HS_1_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -4.84
  }
 ],
 "id": "overlay_386084F7_2410_E47D_419D_A6CDFB267E7F",
 "data": {
  "label": "Circle Generic 01"
 },
 "enabledInCardboard": true
},
{
 "items": [
  {
   "image": "this.AnimatedImageResource_28EC8E81_251D_56B8_41B5_87951844B339",
   "pitch": -2.5,
   "yaw": -86.52,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 8.78,
   "distance": 100
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_342B349F_2413_24AC_41B9_DADBE85884B1, this.camera_3411D0A7_3925_9DE4_41C1_D8728F747F49); this.mainPlayList.set('selectedIndex', 5)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 8.78,
   "yaw": -86.52,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_342E07E9_2413_6495_41BA_9734E7BAC9CA_1_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -2.5
  }
 ],
 "id": "overlay_33595313_246F_1DB4_41A0_7D648124D0F6",
 "data": {
  "label": "Circle Door 01"
 },
 "enabledInCardboard": true
},
{
 "items": [
  {
   "image": "this.AnimatedImageResource_28ECCE81_251D_56B8_41C0_A3A31AF094D9",
   "pitch": -0.79,
   "yaw": 75.7,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 7.16,
   "distance": 100
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 7)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 7.16,
   "yaw": 75.7,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_342E07E9_2413_6495_41BA_9734E7BAC9CA_1_HS_1_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -0.79
  }
 ],
 "id": "overlay_330E1246_2411_3F9F_41AF_F96898263C27",
 "data": {
  "label": "Circle Generic 01"
 },
 "enabledInCardboard": true
},
{
 "gap": 10,
 "verticalAlign": "top",
 "paddingTop": 0,
 "children": [
  "this.Container_E12ED7BC_FC5E_3EF0_41D7_04F5E15B2B27",
  "this.ThumbnailGrid_E12E87BC_FC5E_3EF0_41D3_CB6F3CE9141B"
 ],
 "backgroundOpacity": 1,
 "id": "Container_E12EC7BC_FC5E_3EF0_41E3_9D6B481D6995",
 "left": "15%",
 "scrollBarOpacity": 0.5,
 "overflow": "visible",
 "shadowColor": "#000000",
 "borderRadius": 0,
 "right": "15%",
 "layout": "vertical",
 "class": "Container",
 "shadowOpacity": 0.3,
 "shadowVerticalLength": 0,
 "propagateClick": false,
 "paddingLeft": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "paddingRight": 0,
 "top": "7%",
 "bottom": "7%",
 "contentOpaque": false,
 "minHeight": 1,
 "scrollBarMargin": 2,
 "creationPolicy": "inAdvance",
 "scrollBarVisible": "rollOver",
 "borderSize": 0,
 "scrollBarWidth": 10,
 "minWidth": 1,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "backgroundColorDirection": "vertical",
 "shadowHorizontalLength": 0,
 "horizontalAlign": "center",
 "paddingBottom": 0,
 "data": {
  "name": "Global"
 },
 "shadowBlurRadius": 25,
 "shadowSpread": 1,
 "scrollBarColor": "#000000",
 "shadow": true
},
{
 "fontFamily": "UVN Da Lat",
 "paddingTop": 0,
 "backgroundOpacity": 0,
 "id": "Label_EE05A09D_FD91_02BD_41DF_50C0E556F878",
 "left": "6.67%",
 "width": 1089,
 "verticalAlign": "middle",
 "borderRadius": 0,
 "class": "Label",
 "fontColor": "#333333",
 "propagateClick": true,
 "text": "MÔ HÌNH THAM QUAN ẢO KHOA ĐIỆN - TRƯỜNG ĐẠI HỌC CÔNG NGHIỆP VIỆT TRÌ",
 "paddingLeft": 0,
 "paddingRight": 0,
 "top": "0%",
 "minHeight": 1,
 "fontSize": "2.21vmin",
 "borderSize": 0,
 "minWidth": 1,
 "height": 61,
 "fontStyle": "normal",
 "horizontalAlign": "left",
 "paddingBottom": 0,
 "data": {
  "name": "Label Company Name"
 },
 "textDecoration": "none",
 "fontWeight": "bold",
 "shadow": false
},
{
 "verticalAlign": "middle",
 "paddingTop": 0,
 "children": [
  "this.DropDown_EE05F09D_FD91_02BD_41DF_1E01DAA2A683",
  "this.DropDown_EA966EC5_FDF1_3E82_41C7_D6D87EF404E1"
 ],
 "backgroundOpacity": 0,
 "id": "Container_EE05809D_FD91_02BD_41E9_A9FC73C05CF9",
 "scrollBarOpacity": 0.5,
 "width": 430.13,
 "scrollBarVisible": "rollOver",
 "borderRadius": 0,
 "class": "Container",
 "right": "5.01%",
 "creationPolicy": "inAdvance",
 "propagateClick": true,
 "paddingLeft": 0,
 "scrollBarMargin": 2,
 "paddingRight": 15,
 "top": "0%",
 "contentOpaque": false,
 "minHeight": 1,
 "layout": "horizontal",
 "borderSize": 0,
 "scrollBarWidth": 10,
 "minWidth": 1,
 "height": 60,
 "horizontalAlign": "right",
 "paddingBottom": 0,
 "data": {
  "name": "-button set container"
 },
 "gap": 3,
 "scrollBarColor": "#000000",
 "overflow": "scroll",
 "shadow": false
},
{
 "verticalAlign": "middle",
 "paddingTop": 0,
 "backgroundOpacity": 0,
 "id": "Image_E8809774_FDF1_0F82_41E5_C3E79692D2C1",
 "left": "0.42%",
 "width": "4.463%",
 "maxWidth": 1065,
 "class": "Image",
 "maxHeight": 1126,
 "borderRadius": 0,
 "propagateClick": false,
 "url": "skin/Image_E8809774_FDF1_0F82_41E5_C3E79692D2C1.png",
 "paddingLeft": 0,
 "paddingRight": 0,
 "top": "4.92%",
 "minHeight": 1,
 "borderSize": 0,
 "minWidth": 1,
 "horizontalAlign": "center",
 "height": "81.967%",
 "paddingBottom": 0,
 "scaleMode": "fit_inside",
 "data": {
  "name": "Image14499"
 },
 "shadow": false
},
{
 "verticalAlign": "middle",
 "paddingTop": 0,
 "backgroundOpacity": 0,
 "id": "IconButton_EF9865FA_FDFC_2BB2_41D0_99D4A8F1A4A5",
 "pressedRollOverIconURL": "skin/IconButton_EF9865FA_FDFC_2BB2_41D0_99D4A8F1A4A5_pressed_rollover.png",
 "width": 40,
 "transparencyActive": true,
 "borderRadius": 0,
 "pressedIconURL": "skin/IconButton_EF9865FA_FDFC_2BB2_41D0_99D4A8F1A4A5_pressed.png",
 "class": "IconButton",
 "right": "1.15%",
 "propagateClick": false,
 "paddingLeft": 0,
 "paddingRight": 0,
 "top": "15%",
 "iconURL": "skin/IconButton_EF9865FA_FDFC_2BB2_41D0_99D4A8F1A4A5.png",
 "mode": "toggle",
 "minHeight": 0,
 "borderSize": 0,
 "minWidth": 0,
 "height": 40,
 "click": "this.setComponentVisibility(this.Container_E12E97BC_FC5E_3EF0_41BB_846FF6F501CC, true, 0, null, null, false)",
 "horizontalAlign": "center",
 "paddingBottom": 0,
 "data": {
  "name": "Button1170"
 },
 "cursor": "hand",
 "shadow": false
},
{
 "rowCount": 6,
 "frameDuration": 41,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_342FDDE8_2413_6493_41BF_AC46041A8646_1_HS_0_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ],
 "colCount": 4,
 "frameCount": 24,
 "id": "AnimatedImageResource_28EC4E81_251D_56B8_41B6_1F76C01DDF43"
},
{
 "rowCount": 6,
 "frameDuration": 41,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_342FC184_2413_1C93_41A0_8E7108979C5B_1_HS_0_0.png",
   "width": 520,
   "class": "ImageResourceLevel",
   "height": 420
  }
 ],
 "colCount": 4,
 "frameCount": 24,
 "id": "AnimatedImageResource_28EE8E82_251D_56B8_41C0_FD50BF175228"
},
{
 "rowCount": 5,
 "frameDuration": 41,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_342FC184_2413_1C93_41A0_8E7108979C5B_1_HS_1_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 1350
  }
 ],
 "colCount": 4,
 "frameCount": 20,
 "id": "AnimatedImageResource_28EC3E82_251D_56B8_41A6_F400149040F4"
},
{
 "rowCount": 5,
 "frameDuration": 41,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_342FC184_2413_1C93_41A0_8E7108979C5B_1_HS_2_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 1350
  }
 ],
 "colCount": 4,
 "frameCount": 20,
 "id": "AnimatedImageResource_28EDAE82_251D_56B8_41AE_48C9429C94CE"
},
{
 "rowCount": 6,
 "frameDuration": 41,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_342DC6C8_2410_E493_41B9_7E20A878670E_1_HS_0_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ],
 "colCount": 4,
 "frameCount": 24,
 "id": "AnimatedImageResource_28EDFE83_251D_56B8_41B2_CC50FB24DBF8"
},
{
 "rowCount": 5,
 "frameDuration": 41,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_342DC6C8_2410_E493_41B9_7E20A878670E_1_HS_1_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 1350
  }
 ],
 "colCount": 4,
 "frameCount": 20,
 "id": "AnimatedImageResource_28ED5E83_251D_56B8_41AA_18EE07B2D0BE"
},
{
 "rowCount": 6,
 "frameDuration": 41,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_342E346A_2413_7B97_41B3_D351C68A0619_1_HS_0_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ],
 "colCount": 4,
 "frameCount": 24,
 "id": "AnimatedImageResource_28EECE83_251D_56B8_4194_4C54C5E23BDC"
},
{
 "rowCount": 5,
 "frameDuration": 41,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_342E346A_2413_7B97_41B3_D351C68A0619_1_HS_1_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 1350
  }
 ],
 "colCount": 4,
 "frameCount": 20,
 "id": "AnimatedImageResource_28EE1E83_251D_56B8_4195_195EAEEBC93A"
},
{
 "rowCount": 5,
 "frameDuration": 41,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_3428501F_2413_1BAC_41BB_DB681B99BCAA_1_HS_0_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 1350
  }
 ],
 "colCount": 4,
 "frameCount": 20,
 "id": "AnimatedImageResource_28E8AE84_251D_56B8_41A5_715711BB37EB"
},
{
 "rowCount": 6,
 "frameDuration": 41,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_3428501F_2413_1BAC_41BB_DB681B99BCAA_1_HS_1_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ],
 "colCount": 4,
 "frameCount": 24,
 "id": "AnimatedImageResource_28E81E84_251D_56B8_41B2_F9A52E5CD9D2"
},
{
 "rowCount": 5,
 "frameDuration": 41,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_34280C43_2413_2B94_41B4_A77E6ADEC474_1_HS_0_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 1350
  }
 ],
 "colCount": 4,
 "frameCount": 20,
 "id": "AnimatedImageResource_28EAFE85_251D_56B8_41B9_BCBDF472C06B"
},
{
 "rowCount": 6,
 "frameDuration": 41,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_34280C43_2413_2B94_41B4_A77E6ADEC474_1_HS_1_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ],
 "colCount": 4,
 "frameCount": 24,
 "id": "AnimatedImageResource_28EA5E85_251D_56B8_41B6_D3068F9664B3"
},
{
 "rowCount": 6,
 "frameDuration": 41,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_342B429A_2413_1CB7_41B3_2AB31B934588_1_HS_0_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ],
 "colCount": 4,
 "frameCount": 24,
 "id": "AnimatedImageResource_28E9CE85_251D_56B8_41B2_7289EAF06815"
},
{
 "rowCount": 5,
 "frameDuration": 41,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_342B429A_2413_1CB7_41B3_2AB31B934588_1_HS_1_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 1350
  }
 ],
 "colCount": 4,
 "frameCount": 20,
 "id": "AnimatedImageResource_28E95E85_251D_56B8_41B5_F19E012CD5D7"
},
{
 "rowCount": 5,
 "frameDuration": 41,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_342B429A_2413_1CB7_41B3_2AB31B934588_1_HS_2_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 1350
  }
 ],
 "colCount": 4,
 "frameCount": 20,
 "id": "AnimatedImageResource_28EA9E85_251D_56B8_4192_0E6ECD6C4A53"
},
{
 "rowCount": 6,
 "frameDuration": 41,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_342AC208_2413_3F93_4191_930FEFDE0ACE_1_HS_0_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ],
 "colCount": 4,
 "frameCount": 24,
 "id": "AnimatedImageResource_28EBBE86_251D_56B8_41BC_95092D8C94A0"
},
{
 "rowCount": 6,
 "frameDuration": 41,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_342B349F_2413_24AC_41B9_DADBE85884B1_1_HS_0_0.png",
   "width": 520,
   "class": "ImageResourceLevel",
   "height": 420
  }
 ],
 "colCount": 4,
 "frameCount": 24,
 "id": "AnimatedImageResource_28D3CE81_251D_56B8_41C0_F43AD41C631F"
},
{
 "rowCount": 6,
 "frameDuration": 41,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_342B349F_2413_24AC_41B9_DADBE85884B1_1_HS_1_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ],
 "colCount": 4,
 "frameCount": 24,
 "id": "AnimatedImageResource_28D31E81_251D_56B8_41AA_A1A9A234928E"
},
{
 "rowCount": 6,
 "frameDuration": 41,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_34281A46_2413_6F9F_4194_314606A9EFDA_1_HS_0_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ],
 "colCount": 4,
 "frameCount": 24,
 "id": "AnimatedImageResource_28EF8E83_251D_56B8_41C1_503BC29F4C77"
},
{
 "rowCount": 6,
 "frameDuration": 41,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_34189E55_2413_27BC_41B9_93C0709397D9_1_HS_0_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ],
 "colCount": 4,
 "frameCount": 24,
 "id": "AnimatedImageResource_28D2CE80_251D_56B8_4195_81FA2119B464"
},
{
 "rowCount": 5,
 "frameDuration": 41,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_34189E55_2413_27BC_41B9_93C0709397D9_1_HS_1_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 1350
  }
 ],
 "colCount": 4,
 "frameCount": 20,
 "id": "AnimatedImageResource_28D22E80_251D_56B8_41B5_6CB52A886857"
},
{
 "rowCount": 6,
 "frameDuration": 41,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_342E9897_2413_2CBD_4188_A3C48D655DA0_1_HS_0_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 360
  }
 ],
 "colCount": 4,
 "frameCount": 24,
 "id": "AnimatedImageResource_28D1EE80_251D_56B8_41BB_DB609E3FA4CE"
},
{
 "rowCount": 6,
 "frameDuration": 41,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_342E9897_2413_2CBD_4188_A3C48D655DA0_1_HS_1_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ],
 "colCount": 4,
 "frameCount": 24,
 "id": "AnimatedImageResource_28D14E80_251D_56B8_41A8_66C325216116"
},
{
 "rowCount": 6,
 "frameDuration": 41,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_342E9897_2413_2CBD_4188_A3C48D655DA0_1_HS_2_0.png",
   "width": 520,
   "class": "ImageResourceLevel",
   "height": 420
  }
 ],
 "colCount": 4,
 "frameCount": 24,
 "id": "AnimatedImageResource_28D17E80_251D_56B8_41B0_C631DD8A652B"
},
{
 "rowCount": 6,
 "frameDuration": 41,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_342D5EBB_2413_24F5_41A3_4DE7DBE219BD_1_HS_0_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 420
  }
 ],
 "colCount": 4,
 "frameCount": 24,
 "id": "AnimatedImageResource_28EC7E81_251D_56B8_41C0_922C61E32CBA"
},
{
 "rowCount": 6,
 "frameDuration": 41,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_342D5EBB_2413_24F5_41A3_4DE7DBE219BD_1_HS_1_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 420
  }
 ],
 "colCount": 4,
 "frameCount": 24,
 "id": "AnimatedImageResource_28EDCE82_251D_56B8_41BB_36831A06CDDF"
},
{
 "rowCount": 6,
 "frameDuration": 41,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_342D5EBB_2413_24F5_41A3_4DE7DBE219BD_1_HS_2_0.png",
   "width": 520,
   "class": "ImageResourceLevel",
   "height": 420
  }
 ],
 "colCount": 4,
 "frameCount": 24,
 "id": "AnimatedImageResource_28ED0E82_251D_56B8_41A8_263AE4FA3940"
},
{
 "rowCount": 6,
 "frameDuration": 41,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_35543A08_2410_EF93_41B5_10CEB879EE30_1_HS_0_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 360
  }
 ],
 "colCount": 4,
 "frameCount": 24,
 "id": "AnimatedImageResource_28D73E7E_251D_5648_41C1_FD26A2F1855F"
},
{
 "rowCount": 6,
 "frameDuration": 41,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_35543A08_2410_EF93_41B5_10CEB879EE30_1_HS_1_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 360
  }
 ],
 "colCount": 4,
 "frameCount": 24,
 "id": "AnimatedImageResource_28D0AE7F_251D_5648_41A9_905984EBB62B"
},
{
 "rowCount": 6,
 "frameDuration": 41,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_342B97D5_2413_24BC_4161_1AF8B2777271_1_HS_0_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 360
  }
 ],
 "colCount": 4,
 "frameCount": 24,
 "id": "AnimatedImageResource_28D00E7F_251D_5648_41A7_339F0B671A4A"
},
{
 "rowCount": 6,
 "frameDuration": 41,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_342B97D5_2413_24BC_4161_1AF8B2777271_1_HS_1_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 360
  }
 ],
 "colCount": 4,
 "frameCount": 24,
 "id": "AnimatedImageResource_28D03E7F_251D_5648_41AF_C26B6D1EE8ED"
},
{
 "rowCount": 6,
 "frameDuration": 41,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_342B97D5_2413_24BC_4161_1AF8B2777271_1_HS_2_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 360
  }
 ],
 "colCount": 4,
 "frameCount": 24,
 "id": "AnimatedImageResource_28D07E80_251D_56B8_41AE_AB600B28435C"
},
{
 "rowCount": 6,
 "frameDuration": 41,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_342BD5E7_2413_249D_41C1_23B84F82611D_1_HS_0_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ],
 "colCount": 4,
 "frameCount": 24,
 "id": "AnimatedImageResource_28E98E84_251D_56B8_41AF_5271BC5F05EB"
},
{
 "rowCount": 6,
 "frameDuration": 41,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_342D84E2_2413_E497_4196_24F58906D341_1_HS_0_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ],
 "colCount": 4,
 "frameCount": 24,
 "id": "AnimatedImageResource_28D27E80_251D_56B8_41BB_04D9FA27D689"
},
{
 "rowCount": 6,
 "frameDuration": 41,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_342BDCA9_2410_E495_41A9_07B2F5EA07A9_1_HS_0_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ],
 "colCount": 4,
 "frameCount": 24,
 "id": "AnimatedImageResource_28EFEE84_251D_56B8_41B4_258F25B37D0D"
},
{
 "rowCount": 5,
 "frameDuration": 41,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_342BDCA9_2410_E495_41A9_07B2F5EA07A9_1_HS_1_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 1350
  }
 ],
 "colCount": 4,
 "frameCount": 20,
 "id": "AnimatedImageResource_28EF5E84_251D_56B8_41A3_6FB6169210F2"
},
{
 "rowCount": 6,
 "frameDuration": 41,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_342E07E9_2413_6495_41BA_9734E7BAC9CA_1_HS_0_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ],
 "colCount": 4,
 "frameCount": 24,
 "id": "AnimatedImageResource_28EC8E81_251D_56B8_41B5_87951844B339"
},
{
 "rowCount": 5,
 "frameDuration": 41,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_342E07E9_2413_6495_41BA_9734E7BAC9CA_1_HS_1_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 1350
  }
 ],
 "colCount": 4,
 "frameCount": 20,
 "id": "AnimatedImageResource_28ECCE81_251D_56B8_41C0_A3A31AF094D9"
},
{
 "verticalAlign": "top",
 "paddingTop": 0,
 "children": [
  "this.Image_F2413F5E_FD8F_3FBE_41E0_21B994709E2C",
  "this.Button_F24A0512_FDB1_0386_41D6_D22C6FE0A9FB"
 ],
 "backgroundOpacity": 1,
 "id": "Container_E12ED7BC_FC5E_3EF0_41D7_04F5E15B2B27",
 "scrollBarOpacity": 0.5,
 "width": "100%",
 "scrollBarVisible": "rollOver",
 "borderRadius": 0,
 "class": "Container",
 "creationPolicy": "inAdvance",
 "propagateClick": false,
 "paddingLeft": 0,
 "backgroundColorRatios": [
  0
 ],
 "paddingRight": 0,
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "backgroundColor": [
  "#0066FF"
 ],
 "minHeight": 1,
 "layout": "absolute",
 "borderSize": 0,
 "scrollBarWidth": 10,
 "minWidth": 1,
 "backgroundColorDirection": "vertical",
 "height": 59,
 "horizontalAlign": "left",
 "paddingBottom": 0,
 "data": {
  "name": "header"
 },
 "gap": 10,
 "scrollBarColor": "#000000",
 "overflow": "visible",
 "shadow": false
},
{
 "selectedItemThumbnailShadow": true,
 "paddingTop": 30,
 "id": "ThumbnailGrid_E12E87BC_FC5E_3EF0_41D3_CB6F3CE9141B",
 "itemLabelGap": 18,
 "scrollBarOpacity": 0.5,
 "itemMode": "normal",
 "scrollBarVisible": "rollOver",
 "borderRadius": 5,
 "width": "99.948%",
 "class": "ThumbnailGrid",
 "itemMaxWidth": 1000,
 "selectedItemBackgroundOpacity": 0,
 "selectedItemThumbnailShadowHorizontalLength": 0,
 "itemLabelFontStyle": "normal",
 "rollOverItemThumbnailShadowColor": "#CCCCCC",
 "paddingLeft": 30,
 "itemPaddingRight": 3,
 "itemLabelFontFamily": "Oswald Regular",
 "rollOverItemThumbnailShadowVerticalLength": 9,
 "itemOpacity": 1,
 "itemLabelHorizontalAlign": "center",
 "minHeight": 1,
 "selectedItemThumbnailShadowBlurRadius": 16,
 "itemBorderRadius": 0,
 "rollOverItemLabelFontColor": "#333333",
 "itemHorizontalAlign": "center",
 "itemLabelPosition": "bottom",
 "height": "91.154%",
 "itemMaxHeight": 1000,
 "itemPaddingLeft": 3,
 "rollOverItemBorderSize": 0,
 "minWidth": 1,
 "selectedItemThumbnailShadowVerticalLength": 0,
 "itemThumbnailBorderRadius": 16,
 "itemBackgroundOpacity": 0,
 "rollOverItemThumbnailShadowBlurRadius": 0,
 "selectedItemLabelFontColor": "#0066FF",
 "paddingBottom": 64,
 "itemWidth": 200,
 "itemPaddingTop": 3,
 "itemBackgroundColor": [],
 "selectedItemLabelFontWeight": "bold",
 "shadow": false,
 "itemBackgroundColorRatios": [],
 "verticalAlign": "middle",
 "rollOverItemBackgroundColor": [],
 "rollOverItemBackgroundOpacity": 0,
 "backgroundOpacity": 0,
 "itemMinHeight": 50,
 "rollOverItemLabelFontWeight": "bold",
 "rollOverItemThumbnailShadowHorizontalLength": 3,
 "playList": "this.ThumbnailGrid_E12E87BC_FC5E_3EF0_41D3_CB6F3CE9141B_playlist",
 "itemVerticalAlign": "top",
 "rollOverItemThumbnailShadowOpacity": 1,
 "selectedItemLabelFontSize": "13px",
 "propagateClick": false,
 "scrollBarMargin": 2,
 "paddingRight": 30,
 "itemLabelFontWeight": "bold",
 "rollOverItemThumbnailShadow": true,
 "itemLabelTextDecoration": "none",
 "itemThumbnailHeight": 119,
 "itemHeight": 160,
 "itemThumbnailScaleMode": "fit_outside",
 "itemLabelFontSize": "13px",
 "itemMinWidth": 50,
 "borderSize": 0,
 "scrollBarWidth": 10,
 "click": "this.setComponentVisibility(this.Container_E12E97BC_FC5E_3EF0_41BB_846FF6F501CC, false, 0, null, null, false)",
 "itemLabelFontColor": "#666666",
 "horizontalAlign": "center",
 "rollOverItemBackgroundColorRatios": [],
 "itemBackgroundColorDirection": "horizontal",
 "rollOverItemLabelFontSize": "13px",
 "itemThumbnailOpacity": 1,
 "itemThumbnailWidth": 197,
 "itemThumbnailShadow": false,
 "data": {
  "name": "ThumbnailList5161"
 },
 "itemPaddingBottom": 3,
 "gap": 47,
 "scrollBarColor": "#666666"
},
{
 "fontFamily": "Tahoma",
 "paddingTop": 0,
 "popUpGap": 2,
 "backgroundOpacity": 1,
 "shadowSpread": 1,
 "id": "DropDown_EE05F09D_FD91_02BD_41DF_1E01DAA2A683",
 "width": 176,
 "data": {
  "name": "DropDown 1"
 },
 "shadowColor": "#000000",
 "borderRadius": 0,
 "shadowOpacity": 0,
 "fontColor": "#333333",
 "popUpBackgroundOpacity": 1,
 "class": "DropDown",
 "selectedPopUpFontColor": "#333333",
 "shadowVerticalLength": 0,
 "playList": "this.DropDown_EE05F09D_FD91_02BD_41DF_1E01DAA2A683_playlist",
 "propagateClick": false,
 "popUpShadowVerticalLength": 0,
 "paddingLeft": 15,
 "popUpPaddingTop": 10,
 "pressedRollOverArrowColor": "#000000",
 "backgroundColorRatios": [
  0
 ],
 "popUpShadow": true,
 "paddingRight": 15,
 "popUpFontColor": "#333333",
 "arrowColor": "#333333",
 "pressedBackgroundColor": [
  "#CCCCCC"
 ],
 "shadowHorizontalLength": 3,
 "popUpShadowBlurRadius": 6,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "popUpShadowOpacity": 0,
 "backgroundColor": [
  "#FFFFFF"
 ],
 "fontSize": "18.9563px",
 "popUpBorderRadius": 0,
 "popUpPaddingLeft": 15,
 "pressedRollOverBackgroundColorRatios": [
  0
 ],
 "popUpShadowColor": "#000000",
 "pressedBackgroundColorRatios": [
  0
 ],
 "minHeight": 1,
 "label": "Ngoại cảnh",
 "rollOverPopUpBackgroundColor": "#CCCCCC",
 "pressedRollOverBackgroundColor": [
  "#CCCCCC"
 ],
 "borderSize": 0,
 "height": 60,
 "rollOverBackgroundColor": [
  "#CCCCCC"
 ],
 "fontStyle": "normal",
 "minWidth": 1,
 "backgroundColorDirection": "vertical",
 "arrowBeforeLabel": false,
 "popUpShadowSpread": 1,
 "paddingBottom": 0,
 "rollOverPopUpFontColor": "#333333",
 "popUpBackgroundColor": "#FFFFFF",
 "gap": 0,
 "popUpPaddingBottom": 10,
 "fontWeight": "bold",
 "selectedPopUpBackgroundColor": "#CCCCCC",
 "textDecoration": "none",
 "popUpShadowHorizontalLength": 3,
 "shadow": true,
 "shadowBlurRadius": 6
},
{
 "fontFamily": "Tahoma",
 "paddingTop": 0,
 "popUpGap": 2,
 "backgroundOpacity": 1,
 "shadowSpread": 1,
 "id": "DropDown_EA966EC5_FDF1_3E82_41C7_D6D87EF404E1",
 "width": 170.95,
 "shadowColor": "#000000",
 "borderRadius": 0,
 "shadowOpacity": 0,
 "fontColor": "#333333",
 "popUpBackgroundOpacity": 1,
 "class": "DropDown",
 "selectedPopUpFontColor": "#333333",
 "shadowVerticalLength": 0,
 "playList": "this.DropDown_EA966EC5_FDF1_3E82_41C7_D6D87EF404E1_playlist",
 "propagateClick": false,
 "popUpShadowVerticalLength": 0,
 "paddingLeft": 15,
 "popUpPaddingTop": 10,
 "backgroundColorRatios": [
  0
 ],
 "popUpShadow": true,
 "paddingRight": 15,
 "popUpFontColor": "#333333",
 "prompt": "Các phòng ",
 "arrowColor": "#333333",
 "pressedBackgroundColor": [
  "#CCCCCC"
 ],
 "shadowHorizontalLength": 3,
 "popUpShadowBlurRadius": 6,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "popUpShadowOpacity": 0,
 "backgroundColor": [
  "#FFFFFF"
 ],
 "fontSize": "18.9563px",
 "popUpBorderRadius": 0,
 "popUpPaddingLeft": 15,
 "pressedRollOverBackgroundColorRatios": [
  0
 ],
 "popUpShadowColor": "#000000",
 "pressedBackgroundColorRatios": [
  0
 ],
 "minHeight": 1,
 "rollOverPopUpBackgroundColor": "#CCCCCC",
 "pressedRollOverBackgroundColor": [
  "#CCCCCC"
 ],
 "borderSize": 0,
 "height": 60,
 "rollOverBackgroundColor": [
  "#CCCCCC"
 ],
 "fontStyle": "normal",
 "minWidth": 1,
 "backgroundColorDirection": "vertical",
 "arrowBeforeLabel": false,
 "popUpShadowSpread": 1,
 "paddingBottom": 0,
 "data": {
  "name": "DropDown 1"
 },
 "popUpBackgroundColor": "#FFFFFF",
 "gap": 0,
 "popUpPaddingBottom": 10,
 "rollOverPopUpFontColor": "#333333",
 "fontWeight": "bold",
 "selectedPopUpBackgroundColor": "#CCCCCC",
 "textDecoration": "none",
 "popUpShadowHorizontalLength": 3,
 "shadow": true,
 "shadowBlurRadius": 6
},
{
 "verticalAlign": "middle",
 "paddingTop": 0,
 "backgroundOpacity": 0,
 "id": "Image_F2413F5E_FD8F_3FBE_41E0_21B994709E2C",
 "width": "7.065%",
 "maxWidth": 512,
 "class": "Image",
 "maxHeight": 512,
 "borderRadius": 0,
 "right": "0%",
 "propagateClick": false,
 "url": "skin/Image_F2413F5E_FD8F_3FBE_41E0_21B994709E2C.png",
 "paddingLeft": 0,
 "paddingRight": 0,
 "top": "8.73%",
 "minHeight": 1,
 "borderSize": 0,
 "minWidth": 1,
 "horizontalAlign": "center",
 "click": "this.setComponentVisibility(this.Container_E12E97BC_FC5E_3EF0_41BB_846FF6F501CC, false, 0, null, null, false)",
 "height": "75%",
 "paddingBottom": 0,
 "scaleMode": "fit_inside",
 "data": {
  "name": "Image4245"
 },
 "shadow": false
},
{
 "verticalAlign": "middle",
 "iconBeforeLabel": true,
 "paddingTop": 0,
 "backgroundOpacity": 0,
 "id": "Button_F24A0512_FDB1_0386_41D6_D22C6FE0A9FB",
 "left": "0.78%",
 "width": 131,
 "shadowColor": "#000000",
 "fontFamily": "Nirmala UI",
 "borderRadius": 0,
 "class": "Button",
 "iconWidth": 0,
 "gap": 5,
 "propagateClick": false,
 "fontColor": "#FFFFFF",
 "paddingLeft": 0,
 "backgroundColorRatios": [
  0
 ],
 "paddingRight": 0,
 "top": "15.25%",
 "borderColor": "#000000",
 "rollOverBackgroundOpacity": 0,
 "rollOverShadow": false,
 "pressedBackgroundColor": [
  "#BBD149"
 ],
 "rollOverBackgroundColorRatios": [
  0
 ],
 "iconHeight": 0,
 "mode": "push",
 "minHeight": 1,
 "fontSize": "23px",
 "layout": "horizontal",
 "pressedBackgroundColorRatios": [
  0
 ],
 "borderSize": 0,
 "minWidth": 1,
 "height": 40,
 "label": "Danh s\u00e1ch",
 "fontStyle": "normal",
 "backgroundColorDirection": "vertical",
 "rollOverBackgroundColor": [
  "#BBD149"
 ],
 "backgroundColor": [
  "#000000"
 ],
 "pressedBackgroundOpacity": 0,
 "horizontalAlign": "center",
 "paddingBottom": 0,
 "data": {
  "name": "Button house info"
 },
 "textDecoration": "none",
 "shadowBlurRadius": 15,
 "shadowSpread": 1,
 "cursor": "hand",
 "click": "this.setComponentVisibility(this.Container_04FE7C2D_1216_75ED_4197_E539B3CD3A95, true, 0, null, null, false)",
 "fontWeight": "bold",
 "shadow": false
}],
 "gap": 10,
 "scrollBarColor": "#000000",
 "overflow": "visible",
 "shadow": false
};

    
    function HistoryData(playList) {
        this.playList = playList;
        this.list = [];
        this.pointer = -1;
    }

    HistoryData.prototype.add = function(index){
        if(this.pointer < this.list.length && this.list[this.pointer] == index) {
            return;
        }
        ++this.pointer;
        this.list.splice(this.pointer, this.list.length - this.pointer, index);
    };

    HistoryData.prototype.back = function(){
        if(!this.canBack()) return;
        this.playList.set('selectedIndex', this.list[--this.pointer]);
    };

    HistoryData.prototype.forward = function(){
        if(!this.canForward()) return;
        this.playList.set('selectedIndex', this.list[++this.pointer]);
    };

    HistoryData.prototype.canBack = function(){
        return this.pointer > 0;
    };

    HistoryData.prototype.canForward = function(){
        return this.pointer >= 0 && this.pointer < this.list.length-1;
    };
    //

    if(script.data == undefined)
        script.data = {};
    script.data["history"] = {};    //playListID -> HistoryData

    TDV.PlayerAPI.defineScript(script);
})();
