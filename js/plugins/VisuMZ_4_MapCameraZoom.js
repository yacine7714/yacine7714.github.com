//=============================================================================
// VisuStella MZ - Map Camera Zoom
// VisuMZ_4_MapCameraZoom.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_4_MapCameraZoom = true;

var VisuMZ = VisuMZ || {};
VisuMZ.MapCameraZoom = VisuMZ.MapCameraZoom || {};
VisuMZ.MapCameraZoom.version = 1.00;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 4] [Version 1.00] [MapCameraZoom]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Map_Camera_Zoom_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * This plugin enables the ability to zoom the in-game camera inward and make
 * the visible game area larger and more focused. The camera can also focus on
 * events or specific tiles other than just the player, making it helpful for
 * cutscenes. Easing accessibility also makes the zoom and camera shifts more
 * soft and less rough feeling.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Zoom ability allows the camera to zoom inward and enlarge the focal point.
 * * Auto-zoom notetag allows for the camera to automatically shift when
 *   entering specific maps.
 * * Camera focus function allows the game camera to instantly move over to the
 *   target event or target tile.
 * * Easing accessibility allow for smoothing zooming and camera focus changes
 *   alongside dedicated wait time control.
 * * Wait for Zoom and Wait for Camera Focus plugin commands are available for
 *   more on the go flexibility in eventing.
 *
 * ============================================================================
 * Requirements
 * ============================================================================
 *
 * This plugin is made for RPG Maker MZ. This will not work in other iterations
 * of RPG Maker.
 *
 * ------ Tier 4 ------
 *
 * This plugin is a Tier 4 plugin. Place it under other plugins of lower tier
 * value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
 * that your plugins will have the best compatibility with the rest of the
 * VisuStella MZ library.
 *
 * ============================================================================
 * Major Changes
 * ============================================================================
 *
 * This plugin adds some new hard-coded features to RPG Maker MZ's functions.
 * The following is a list of them.
 *
 * ---
 *
 * Cannot Go Under 100%
 * 
 * You can zoom in (aka go above 100% zoom), but you cannot zoom out (aka go
 * under 100% zoom). The reasoning behind this is because of the limitation
 * between PixiJS and WebGL. Going under 100% zoom will break the tilemap and
 * cause large chunks of it to go missing.
 * 
 * This is true even without this plugin installed as you can try to use the
 * innate RPG Maker MZ zoom functions and try to set the zoom scale under 100%.
 * The tileset will immediately start to fall apart.
 *
 * ---
 * 
 * Sprites No Longer Smoothed
 * 
 * When using this plugin, certain resources like on-map character sprites and
 * some tile sprites will have bitmap smoothing removed. The reason for this is
 * due to PixiJS's texture bleeding problem when the sprites are zoomed in. If
 * left alone, this causes an ugly filmy border around the edges of the
 * sprite's dimensions that are otherwise an eye-sore to look at.
 * 
 * ---
 *
 * ============================================================================
 * VisuStella MZ Compatibility
 * ============================================================================
 *
 * While this plugin is compatible with the majority of the VisuStella MZ
 * plugin library, it is not compatible with specific plugins or specific
 * features. This section will highlight the main plugins/features that will
 * not be compatible with this plugin or put focus on how the make certain
 * features compatible.
 *
 * ---
 * 
 * VisuMZ_0_CoreEngine
 * 
 * Having the VisuMZ Core Engine installed will enable you to use easing when
 * it comes to zooming and camera panning.
 * 
 * ---
 * 
 * Picture Zooming
 * 
 * If you are NOT using the VisuMZ Core Engine, pictures will be bound to the
 * zoom scale. This is NOT a bug. If you are using pictures in a completely
 * vanilla RPG Maker MZ project without any plugins installed and enter a
 * battle, the battle zoom will also make the pictures zoom in as well.
 * 
 * ---
 *
 * ============================================================================
 * Notetags
 * ============================================================================
 *
 * The following are notetags that have been added through this plugin. These
 * notetags will not work with your game if this plugin is OFF or not present.
 *
 * ---
 * 
 * === Map-Related Notetags ===
 * 
 * ---
 *
 * <Zoom: x%>
 * <AutoZoom: x%>
 * <Auto Zoom: x%>
 *
 * - Used for: Map Notetags
 * - Causes the game camera to automatically zoom to x% when entering a map
 *   with this notetag.
 *   - This does NOT reverse itself when exiting the map. The zoom settings
 *     will carry over to other maps unless those maps have their own auto-zoom
 *     notetag present.
 * - The notetag variants do the same thing. Which you choose to use is
 *   entirely up to personal preference.
 * - Replace 'x' with a percentage value above 100% to represent the zoom scale
 *   you wish to change to when entering this map.
 *   - 'x' cannot be under 100%! Read the "Cannot Go Under 100%" section for
 *     more information as to why.
 *
 * ---
 *
 * ============================================================================
 * Plugin Commands
 * ============================================================================
 *
 * The following are Plugin Commands that come with this plugin. They can be
 * accessed through the Plugin Command event command.
 *
 * ---
 * 
 * === Camera Plugin Commands ===
 * 
 * ---
 *
 * Camera: Focus Player
 * - Puts the camera focus on the player character.
 *
 *   Duration:
 *   - How many frames should it take to finish focus?
 *   - 60 frames = 1 second.
 *
 *   Easing Type:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine!
 *
 * ---
 *
 * Camera: Focus Target Event
 * - Puts the camera focus on target event.
 *
 *   Event ID:
 *   - Insert the ID of the event to focus on.
 *   - Use 0 for this event.
 *   - You may use JavaScript code.
 *
 *   Duration:
 *   - How many frames should it take to finish focus?
 *   - 60 frames = 1 second.
 *
 *   Easing Type:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine!
 *
 * ---
 *
 * Camera: Focus Target Tile
 * - Puts the camera focus on target map tile.
 *
 *   Map Tile X:
 *   - What is the X coordinate of the target map tile?
 *   - You may use JavaScript code.
 *
 *   Map Tile Y:
 *   - What is the Y coordinate of the target map tile?
 *   - You may use JavaScript code.
 *
 *   Duration:
 *   - How many frames should it take to finish focus?
 *   - 60 frames = 1 second.
 *
 *   Easing Type:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine!
 *
 * ---
 *
 * Camera: Wait for Focus
 * - Waits for camera focus to finish changing before continuing.
 *
 * ---
 * 
 * === Zoom Plugin Commands ===
 * 
 * ---
 *
 * Zoom: Change Zoom
 * - Change the current zoom amount.
 *
 *   Target Zoom Scale:
 *   - What is the target zoom scale?
 *   - 1.0 = 100%; 1.5 = 150%; 2.0 = 200%;
 *   - Cannot go under 1.0!
 *
 *   Duration:
 *   - How many frames should it take to finish zooming?
 *   - 60 frames = 1 second.
 *
 *   Easing Type:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine!
 *
 * ---
 *
 * Zoom: Wait for Zoom
 * - Waits for zoom to finish changing before continuing.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Settings
 * ============================================================================
 *
 * These are the general settings used for the Map Camera Zoom plugin.
 *
 * ---
 *
 * Settings
 * 
 *   Default Zoom:
 *   - What is the default zoom value?
 *   - 1.0 = 100%; 1.5 = 150%; 2.0 = 200%;
 *   - Cannot go under 1.0!
 * 
 *   Adapt Battle Encounter Ani:
 *   - Adapt the battle encounter zoom effect?
 *   - Occurs when entering battle from the map.
 *
 * ---
 *
 * ============================================================================
 * Terms of Use
 * ============================================================================
 *
 * 1. These plugins may be used in free or commercial games provided that they
 * have been acquired through legitimate means at VisuStella.com and/or any
 * other official approved VisuStella sources. Exceptions and special
 * circumstances that may prohibit usage will be listed on VisuStella.com.
 * 
 * 2. All of the listed coders found in the Credits section of this plugin must
 * be given credit in your games or credited as a collective under the name:
 * "VisuStella".
 * 
 * 3. You may edit the source code to suit your needs, so long as you do not
 * claim the source code belongs to you. VisuStella also does not take
 * responsibility for the plugin if any changes have been made to the plugin's
 * code, nor does VisuStella take responsibility for user-provided custom code
 * used for custom control effects including advanced JavaScript notetags
 * and/or plugin parameters that allow custom JavaScript code.
 * 
 * 4. You may NOT redistribute these plugins nor take code from this plugin to
 * use as your own. These plugins and their code are only to be downloaded from
 * VisuStella.com and other official/approved VisuStella sources. A list of
 * official/approved sources can also be found on VisuStella.com.
 *
 * 5. VisuStella is not responsible for problems found in your game due to
 * unintended usage, incompatibility problems with plugins outside of the
 * VisuStella MZ library, plugin versions that aren't up to date, nor
 * responsible for the proper working of compatibility patches made by any
 * third parties. VisuStella is not responsible for errors caused by any
 * user-provided custom code used for custom control effects including advanced
 * JavaScript notetags and/or plugin parameters that allow JavaScript code.
 *
 * 6. If a compatibility patch needs to be made through a third party that is
 * unaffiliated with VisuStella that involves using code from the VisuStella MZ
 * library, contact must be made with a member from VisuStella and have it
 * approved. The patch would be placed on VisuStella.com as a free download
 * to the public. Such patches cannot be sold for monetary gain, including
 * commissions, crowdfunding, and/or donations.
 * 
 * 7. If this VisuStella MZ plugin is a paid product, all project team members
 * must purchase their own individual copies of the paid product if they are to
 * use it. Usage includes working on related game mechanics, managing related
 * code, and/or using related Plugin Commands and features. Redistribution of
 * the plugin and/or its code to other members of the team is NOT allowed
 * unless they own the plugin itself as that conflicts with Article 4.
 * 
 * 8. Any extensions and/or addendums made to this plugin's Terms of Use can be
 * found on VisuStella.com and must be followed.
 *
 * ============================================================================
 * Credits
 * ============================================================================
 * 
 * If you are using this plugin, credit the following people in your game:
 * 
 * Team VisuStella
 * * Arisu
 * * Irina
 * * Olivia
 * * Yanfly
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 * 
 * Version 1.00 Official Release Date: November 2, 2022
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Begin
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command CameraFocusPlayer
 * @text Camera: Focus Player
 * @desc Puts the camera focus on the player character.
 *
 * @arg Duration:num
 * @text Duration
 * @type number
 * @min 1
 * @desc How many frames should it take to finish focus?
 * 60 frames = 1 second.
 * @default 60
 *
 * @arg EasingType:str
 * @text Easing Type
 * @type combo
 * @option Linear
 * @option InSine
 * @option OutSine
 * @option InOutSine
 * @option InQuad
 * @option OutQuad
 * @option InOutQuad
 * @option InCubic
 * @option OutCubic
 * @option InOutCubic
 * @option InQuart
 * @option OutQuart
 * @option InOutQuart
 * @option InQuint
 * @option OutQuint
 * @option InOutQuint
 * @option InExpo
 * @option OutExpo
 * @option InOutExpo
 * @option InCirc
 * @option OutCirc
 * @option InOutCirc
 * @option InBack
 * @option OutBack
 * @option InOutBack
 * @option InElastic
 * @option OutElastic
 * @option InOutElastic
 * @option InBounce
 * @option OutBounce
 * @option InOutBounce
 * @desc Select which easing type you wish to apply.
 * Requires VisuMZ_0_CoreEngine!
 * @default InOutSine
 *
 * @ --------------------------------------------------------------------------
 *
 * @command CameraFocusTargetEvent
 * @text Camera: Focus Target Event
 * @desc Puts the camera focus on target event.
 *
 * @arg EventID:eval
 * @text Event ID
 * @desc Insert the ID of the event to focus on.
 * Use 0 for this event. You may use JavaScript code.
 * @default 0
 *
 * @arg Duration:num
 * @text Duration
 * @type number
 * @min 1
 * @desc How many frames should it take to finish focus?
 * 60 frames = 1 second.
 * @default 60
 *
 * @arg EasingType:str
 * @text Easing Type
 * @type combo
 * @option Linear
 * @option InSine
 * @option OutSine
 * @option InOutSine
 * @option InQuad
 * @option OutQuad
 * @option InOutQuad
 * @option InCubic
 * @option OutCubic
 * @option InOutCubic
 * @option InQuart
 * @option OutQuart
 * @option InOutQuart
 * @option InQuint
 * @option OutQuint
 * @option InOutQuint
 * @option InExpo
 * @option OutExpo
 * @option InOutExpo
 * @option InCirc
 * @option OutCirc
 * @option InOutCirc
 * @option InBack
 * @option OutBack
 * @option InOutBack
 * @option InElastic
 * @option OutElastic
 * @option InOutElastic
 * @option InBounce
 * @option OutBounce
 * @option InOutBounce
 * @desc Select which easing type you wish to apply.
 * Requires VisuMZ_0_CoreEngine!
 * @default InOutSine
 *
 * @ --------------------------------------------------------------------------
 *
 * @command CameraFocusTargetTile
 * @text Camera: Focus Target Tile
 * @desc Puts the camera focus on target map tile.
 *
 * @arg MapX:eval
 * @text Map Tile X
 * @desc What is the X coordinate of the target map tile?
 * You may use JavaScript code.
 * @default 0
 *
 * @arg MapY:eval
 * @text Map Tile Y
 * @desc What is the Y coordinate of the target map tile?
 * You may use JavaScript code.
 * @default 0
 *
 * @arg Duration:num
 * @text Duration
 * @type number
 * @min 1
 * @desc How many frames should it take to finish focus?
 * 60 frames = 1 second.
 * @default 60
 *
 * @arg EasingType:str
 * @text Easing Type
 * @type combo
 * @option Linear
 * @option InSine
 * @option OutSine
 * @option InOutSine
 * @option InQuad
 * @option OutQuad
 * @option InOutQuad
 * @option InCubic
 * @option OutCubic
 * @option InOutCubic
 * @option InQuart
 * @option OutQuart
 * @option InOutQuart
 * @option InQuint
 * @option OutQuint
 * @option InOutQuint
 * @option InExpo
 * @option OutExpo
 * @option InOutExpo
 * @option InCirc
 * @option OutCirc
 * @option InOutCirc
 * @option InBack
 * @option OutBack
 * @option InOutBack
 * @option InElastic
 * @option OutElastic
 * @option InOutElastic
 * @option InBounce
 * @option OutBounce
 * @option InOutBounce
 * @desc Select which easing type you wish to apply.
 * Requires VisuMZ_0_CoreEngine!
 * @default InOutSine
 *
 * @ --------------------------------------------------------------------------
 *
 * @command CameraFocusWait
 * @text Camera: Wait for Focus
 * @desc Waits for camera focus to finish changing before continuing.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Zoom
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ZoomChange
 * @text Zoom: Change Zoom
 * @desc Change the current zoom amount.
 *
 * @arg TargetScale:num
 * @text Target Zoom Scale
 * @desc What is the target zoom scale?
 * 1.0 = 100%; 1.5 = 150%; 2.0 = 200%; Cannot go under 1.0!
 * @default 1.0
 *
 * @arg Duration:num
 * @text Duration
 * @type number
 * @min 1
 * @desc How many frames should it take to finish zooming?
 * 60 frames = 1 second.
 * @default 60
 *
 * @arg EasingType:str
 * @text Easing Type
 * @type combo
 * @option Linear
 * @option InSine
 * @option OutSine
 * @option InOutSine
 * @option InQuad
 * @option OutQuad
 * @option InOutQuad
 * @option InCubic
 * @option OutCubic
 * @option InOutCubic
 * @option InQuart
 * @option OutQuart
 * @option InOutQuart
 * @option InQuint
 * @option OutQuint
 * @option InOutQuint
 * @option InExpo
 * @option OutExpo
 * @option InOutExpo
 * @option InCirc
 * @option OutCirc
 * @option InOutCirc
 * @option InBack
 * @option OutBack
 * @option InOutBack
 * @option InElastic
 * @option OutElastic
 * @option InOutElastic
 * @option InBounce
 * @option OutBounce
 * @option InOutBounce
 * @desc Select which easing type you wish to apply.
 * Requires VisuMZ_0_CoreEngine!
 * @default InOutSine
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ZoomWait
 * @text Zoom: Wait for Zoom
 * @desc Waits for zoom to finish changing before continuing.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_End
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @ ==========================================================================
 * @ Plugin Parameters
 * @ ==========================================================================
 *
 * @param BreakHead
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param MapCameraZoom
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param DefaultZoom:num
 * @text Default Zoom
 * @desc What is the default zoom value?
 * 1.0 = 100%; 1.5 = 150%; 2.0 = 200%; Cannot go under 1.0!
 * @default 1.0
 *
 * @param AdaptBattleEncZoom:eval
 * @text Adapt Battle Encounter Ani
 * @parent Animation
 * @type boolean
 * @on Adapt
 * @off Unchanged
 * @desc Adapt the battle encounter zoom effect?
 * Occurs when entering battle from the map.
 * @default true
 *
 * @param BreakEnd1
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param End Of
 * @default Plugin Parameters
 *
 * @param BreakEnd2
 * @text --------------------------
 * @default ----------------------------------
 *
 */
//=============================================================================

function _0xbc40(_0xc6cbdd,_0x591195){const _0x261266=_0x2612();return _0xbc40=function(_0xbc401f,_0x53db74){_0xbc401f=_0xbc401f-0xf9;let _0xb284eb=_0x261266[_0xbc401f];return _0xb284eb;},_0xbc40(_0xc6cbdd,_0x591195);}function _0x2612(){const _0x59be9b=['scrolledY','targetScale','ALhmy','ImageManager_loadCharacter','ARRAYNUM','Sprite_AnimationMV_updatePosition','Game_Screen_zoomScale','eventId','registerCommand','name','AutoZoom','version','1396989QImMnF','wholeDuration','Xrpgz','240615AGSAPu','tileFocus','_parallaxZero','jVcah','mapCameraSettings','_displayY','setDisplayPosMapCameraZoom','match','_parallaxY','parallaxOx','Game_Map_screenTileX','toUpperCase','centerMapCameraZoom','MAP_ZOOM_ENTER_BATTLE_ADAPT','updateMapCameraCenteredParallax','setMapCameraFocusToPlayer','setupMapCameraZoom','1524840PnRERx','CameraFocusPlayer','updateMapCameraFocusSmooth','_lastPluginCommandInterpreter','63REAGhn','tileHeight','Game_Player_clearTransferInfo','setZoom','trim','FUNC','YTejM','_mapZoomSettings','screenTileX','allowExtendMapZoom','_visualParallaxSettings','updatePosition','mapCameraFocusTarget','description','setup','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','constructor','parallaxOy','easingType','setupMapZoomSettings','STRUCT','MapCameraZoom','Game_Map_setup','tileWidth','_scene','Game_Map_parallaxOx','note','xScrollLinkedOffset','setBattleEncounterZoom','DEFAULT_MAP_ZOOM_SCALE','getLastPluginCommandInterpreter','update','event','includes','6595144BwGpIT','displayY','scale','updateMapZoom','_waitMode','_parallaxX','tileCoordinates','canvasToMapX','updateScrollSmoothCamera','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','EVAL','updateMapCameraFocus','_spriteset','applyEasing','ConvertParams','1xWsqrk','setupMapCameraZoomNotetags','updateEncounterEffect','dpdag','mapZoom','doBQy','centerX','duration','637450uWXjnt','aawfD','screenTileY','exit','currentCamera','3503928lUlyOf','max','centerY','TargetScale','Settings','displayX','VisuMZ_2_MovementEffects','setMapCameraFocusToEvent','7tgdYWK','isLoopVertical','1064460kqNPaV','_mapCameraSettings','Scene_Map_start','Yurfv','TpflP','canvasToMapY','CdmQW','floor','Game_Interpreter_updateWaitMode','command357','prototype','Linear','_realY','HYwGn','143NzxMFV','IconSet','_parallaxSx','STR','_mapZoomEnterBattle','CameraFocusTargetTile','updateMapZoomPosition','Game_Map_screenTileY','ApplyEasing','EventID','VisuMZ_4_VisualParallaxes','setCurrentCameraFocusTile','Game_Screen_setZoom','Vblmq','parent','EasingType','MapY','setMapCameraFocusToTile','Game_Screen_initialize','onUpdateMapZoomEnd','MapX','ImageManager_loadSystem','mapCameraFocus','isSceneMap','NUM','mapZoomEnterBattleSettings','Game_Event_update','Game_Map_updateParallax','clamp','setLastPluginCommandInterpreter','40TNqekN','EVJMJ','updateScroll','muuDb','zoomScale','hwhpN','eventTargetID','scrolledX','JSON','initialize','RegExp','_mapCameraParallaxUpdates','start','AdaptBattleEncZoom','parse','_parallaxLoopX','_parallaxLoopY','ARRAYFUNC','roundY','Game_Screen_updateZoom','DUYJJ','filter','isMapCameraFocusTarget','width','setWaitMode','_realX','loadSystem','call','loadTileset','loadCharacter','ZoomWait','CameraFocusWait','eventFocus','_displayX','Game_Map_parallaxOy','position','Game_Player_updateScroll','mapZoomSettings','yfaSB','onUpdateMapCameraFocusEnd','uOugx','Scene_Map_updateEncounterEffect','Game_Interpreter_PluginCommand','_animation','updateMapScrollLinkedCenteredParallax','format','updateParallax','Duration','bpJSt','playerFocus','canSmoothScroll','roundX','setupMapCameraSettings','clearTransferInfo','_mapEnterBattleZoom','ARRAYSTRUCT','map','isFurnitureSystemMode','height','startMapZoom','smooth','fHuBV','Zoom\x20cannot\x20go\x20under\x20100%.','updateWaitMode','WhLGV','ImageManager_loadTileset','mod','isPlaytest','ARRAYJSON'];_0x2612=function(){return _0x59be9b;};return _0x2612();}const _0x551847=_0xbc40;(function(_0x50f762,_0x5943b3){const _0x8e7e9d=_0xbc40,_0x57bc57=_0x50f762();while(!![]){try{const _0x570553=parseInt(_0x8e7e9d(0x10a))/0x1*(parseInt(_0x8e7e9d(0x121))/0x2)+parseInt(_0x8e7e9d(0x19e))/0x3+-parseInt(_0x8e7e9d(0x14d))/0x4*(-parseInt(_0x8e7e9d(0x1a1))/0x5)+-parseInt(_0x8e7e9d(0x117))/0x6+parseInt(_0x8e7e9d(0x11f))/0x7*(parseInt(_0x8e7e9d(0xfb))/0x8)+parseInt(_0x8e7e9d(0x1b6))/0x9*(parseInt(_0x8e7e9d(0x112))/0xa)+parseInt(_0x8e7e9d(0x12f))/0xb*(-parseInt(_0x8e7e9d(0x1b2))/0xc);if(_0x570553===_0x5943b3)break;else _0x57bc57['push'](_0x57bc57['shift']());}catch(_0x315271){_0x57bc57['push'](_0x57bc57['shift']());}}}(_0x2612,0x7d729));var label=_0x551847(0x1cb),tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x551847(0x162)](function(_0x266e24){const _0x518d98=_0x551847;return _0x266e24['status']&&_0x266e24['description'][_0x518d98(0xfa)]('['+label+']');})[0x0];VisuMZ[label]['Settings']=VisuMZ[label][_0x551847(0x11b)]||{},VisuMZ['ConvertParams']=function(_0x30a04b,_0x158087){const _0x229e8d=_0x551847;for(const _0x623c98 in _0x158087){if(_0x623c98[_0x229e8d(0x1a8)](/(.*):(.*)/i)){const _0x11d848=String(RegExp['$1']),_0x5a2042=String(RegExp['$2'])[_0x229e8d(0x1ac)]()[_0x229e8d(0x1ba)]();let _0xb42638,_0x46044c,_0x154ace;switch(_0x5a2042){case _0x229e8d(0x147):_0xb42638=_0x158087[_0x623c98]!==''?Number(_0x158087[_0x623c98]):0x0;break;case _0x229e8d(0x196):_0x46044c=_0x158087[_0x623c98]!==''?JSON[_0x229e8d(0x15b)](_0x158087[_0x623c98]):[],_0xb42638=_0x46044c[_0x229e8d(0x185)](_0x41bcf1=>Number(_0x41bcf1));break;case _0x229e8d(0x105):_0xb42638=_0x158087[_0x623c98]!==''?eval(_0x158087[_0x623c98]):null;break;case'ARRAYEVAL':_0x46044c=_0x158087[_0x623c98]!==''?JSON['parse'](_0x158087[_0x623c98]):[],_0xb42638=_0x46044c[_0x229e8d(0x185)](_0x505f05=>eval(_0x505f05));break;case _0x229e8d(0x155):_0xb42638=_0x158087[_0x623c98]!==''?JSON[_0x229e8d(0x15b)](_0x158087[_0x623c98]):'';break;case _0x229e8d(0x191):_0x46044c=_0x158087[_0x623c98]!==''?JSON[_0x229e8d(0x15b)](_0x158087[_0x623c98]):[],_0xb42638=_0x46044c[_0x229e8d(0x185)](_0x51fb22=>JSON[_0x229e8d(0x15b)](_0x51fb22));break;case _0x229e8d(0x1bb):_0xb42638=_0x158087[_0x623c98]!==''?new Function(JSON[_0x229e8d(0x15b)](_0x158087[_0x623c98])):new Function('return\x200');break;case _0x229e8d(0x15e):_0x46044c=_0x158087[_0x623c98]!==''?JSON['parse'](_0x158087[_0x623c98]):[],_0xb42638=_0x46044c[_0x229e8d(0x185)](_0x4c29ec=>new Function(JSON['parse'](_0x4c29ec)));break;case _0x229e8d(0x132):_0xb42638=_0x158087[_0x623c98]!==''?String(_0x158087[_0x623c98]):'';break;case'ARRAYSTR':_0x46044c=_0x158087[_0x623c98]!==''?JSON[_0x229e8d(0x15b)](_0x158087[_0x623c98]):[],_0xb42638=_0x46044c['map'](_0x7c7fce=>String(_0x7c7fce));break;case _0x229e8d(0x1ca):_0x154ace=_0x158087[_0x623c98]!==''?JSON[_0x229e8d(0x15b)](_0x158087[_0x623c98]):{},_0xb42638=VisuMZ[_0x229e8d(0x109)]({},_0x154ace);break;case _0x229e8d(0x184):_0x46044c=_0x158087[_0x623c98]!==''?JSON['parse'](_0x158087[_0x623c98]):[],_0xb42638=_0x46044c[_0x229e8d(0x185)](_0x5aad26=>VisuMZ[_0x229e8d(0x109)]({},JSON[_0x229e8d(0x15b)](_0x5aad26)));break;default:continue;}_0x30a04b[_0x11d848]=_0xb42638;}}return _0x30a04b;},(_0x25da38=>{const _0x22cb79=_0x551847,_0x156b9e=_0x25da38[_0x22cb79(0x19b)];for(const _0x1b94c of dependencies){if(!Imported[_0x1b94c]){if(_0x22cb79(0x194)!==_0x22cb79(0x194))return _0x2d65a9[_0x22cb79(0x116)];else{alert(_0x22cb79(0x104)[_0x22cb79(0x17a)](_0x156b9e,_0x1b94c)),SceneManager[_0x22cb79(0x115)]();break;}}}const _0x3e7e08=_0x25da38[_0x22cb79(0x1c3)];if(_0x3e7e08[_0x22cb79(0x1a8)](/\[Version[ ](.*?)\]/i)){const _0x4fc5d2=Number(RegExp['$1']);_0x4fc5d2!==VisuMZ[label][_0x22cb79(0x19d)]&&(alert('%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.'[_0x22cb79(0x17a)](_0x156b9e,_0x4fc5d2)),SceneManager[_0x22cb79(0x115)]());}if(_0x3e7e08['match'](/\[Tier[ ](\d+)\]/i)){const _0x56144f=Number(RegExp['$1']);if(_0x56144f<tier){if('dpdag'===_0x22cb79(0x10d))alert(_0x22cb79(0x1c5)[_0x22cb79(0x17a)](_0x156b9e,_0x56144f,tier)),SceneManager[_0x22cb79(0x115)]();else{if(!_0xe7ed7f['isSceneMap']())return;_0x543f7a[_0x22cb79(0x109)](_0x26e7f6,_0x50c0cd);const _0x5865db=_0x18e664[_0x22cb79(0x143)]['clamp'](0x0,_0x9933c3[_0x22cb79(0x164)]()-0x1),_0x1905d3=_0x59a5bc[_0x22cb79(0x13f)]['clamp'](0x0,_0x11a79f['height']()-0x1),_0x35c4ec=_0x5b51aa[_0x22cb79(0x17c)]||0x1,_0x3d5777=_0x4b94f8[_0x22cb79(0x13e)]||_0x22cb79(0x12c);_0x162bfc[_0x22cb79(0x140)](_0x5865db,_0x1905d3,_0x35c4ec,_0x3d5777);}}else'hwhpN'===_0x22cb79(0x152)?tier=Math[_0x22cb79(0x118)](_0x56144f,tier):(_0x1fa3bb['MapCameraZoom']['Game_Map_setup'][_0x22cb79(0x168)](this,_0x336f1f),this['setupMapCameraZoomNotetags'](),this[_0x22cb79(0x158)]=0x0);}VisuMZ[_0x22cb79(0x109)](VisuMZ[label][_0x22cb79(0x11b)],_0x25da38['parameters']);})(pluginData),PluginManager[_0x551847(0x19a)](pluginData['name'],_0x551847(0x1b3),_0x2cc2de=>{const _0x1e3ea0=_0x551847;if(!SceneManager['isSceneMap']())return;if($gamePlayer[_0x1e3ea0(0x163)]())return;VisuMZ[_0x1e3ea0(0x109)](_0x2cc2de,_0x2cc2de);const _0x21d10c=_0x2cc2de['Duration']||0x1,_0x2787d1=_0x2cc2de['EasingType']||_0x1e3ea0(0x12c);$gameScreen[_0x1e3ea0(0x1b0)](_0x21d10c,_0x2787d1);}),PluginManager[_0x551847(0x19a)](pluginData[_0x551847(0x19b)],'CameraFocusTargetEvent',_0x275fdf=>{const _0x3c1ad1=_0x551847;if(!SceneManager[_0x3c1ad1(0x146)]())return;VisuMZ['ConvertParams'](_0x275fdf,_0x275fdf);const _0xf040e4=$gameTemp[_0x3c1ad1(0x1d4)](),_0x180a98=_0x275fdf[_0x3c1ad1(0x138)]||_0xf040e4[_0x3c1ad1(0x199)](),_0x530cf2=$gameMap[_0x3c1ad1(0xf9)](_0x180a98),_0x56244e=_0x275fdf[_0x3c1ad1(0x17c)]||0x1,_0x597fa5=_0x275fdf['EasingType']||_0x3c1ad1(0x12c);if(!_0x530cf2)return;$gameScreen[_0x3c1ad1(0x11e)](_0x180a98,_0x56244e,_0x597fa5);}),PluginManager[_0x551847(0x19a)](pluginData['name'],_0x551847(0x134),_0x198438=>{const _0x303a6a=_0x551847;if(!SceneManager['isSceneMap']())return;VisuMZ[_0x303a6a(0x109)](_0x198438,_0x198438);const _0x4d61de=_0x198438['MapX']['clamp'](0x0,$gameMap[_0x303a6a(0x164)]()-0x1),_0x3dc025=_0x198438['MapY'][_0x303a6a(0x14b)](0x0,$gameMap['height']()-0x1),_0x221b25=_0x198438[_0x303a6a(0x17c)]||0x1,_0x29e7c0=_0x198438[_0x303a6a(0x13e)]||_0x303a6a(0x12c);$gameScreen[_0x303a6a(0x140)](_0x4d61de,_0x3dc025,_0x221b25,_0x29e7c0);}),PluginManager[_0x551847(0x19a)](pluginData[_0x551847(0x19b)],_0x551847(0x16c),_0x7f5252=>{const _0x2f22e1=_0x551847;if(!SceneManager[_0x2f22e1(0x146)]())return;const _0x30f2d0=$gameTemp[_0x2f22e1(0x1d4)]();_0x30f2d0['setWaitMode'](_0x2f22e1(0x145));}),PluginManager[_0x551847(0x19a)](pluginData[_0x551847(0x19b)],'ZoomChange',_0x32c1b8=>{const _0x1c30d7=_0x551847;if(!SceneManager[_0x1c30d7(0x146)]())return;VisuMZ[_0x1c30d7(0x109)](_0x32c1b8,_0x32c1b8);let _0x529cde=_0x32c1b8[_0x1c30d7(0x11a)];_0x529cde<0x1&&$gameTemp[_0x1c30d7(0x190)]()&&(_0x1c30d7(0x150)!==_0x1c30d7(0x150)?(_0x15deb9[_0x1c30d7(0x100)]=this['_displayX'],_0x358df0['_parallaxY']=this[_0x1c30d7(0x1a6)]):(alert('Zoom\x20cannot\x20go\x20under\x20100%.'),_0x529cde=0x1));const _0x5b9f97=_0x32c1b8[_0x1c30d7(0x17c)]||0x1,_0x19c669=_0x32c1b8['EasingType']||_0x1c30d7(0x12c);$gameScreen[_0x1c30d7(0x188)](_0x529cde,_0x5b9f97,_0x19c669);}),PluginManager[_0x551847(0x19a)](pluginData[_0x551847(0x19b)],_0x551847(0x16b),_0x2538ae=>{const _0x7082a=_0x551847;if(!SceneManager['isSceneMap']())return;const _0x2de62f=$gameTemp[_0x7082a(0x1d4)]();_0x2de62f[_0x7082a(0x165)](_0x7082a(0x10e));}),VisuMZ[_0x551847(0x1cb)]['RegExp']={'AutoZoom':/<(?:ZOOM|AUTO ZOOM|AUTOZOOM):[ ](\d+)([%％])>/i},VisuMZ['MapCameraZoom'][_0x551847(0x195)]=ImageManager[_0x551847(0x16a)],ImageManager[_0x551847(0x16a)]=function(_0x335bfc){const _0x4a59c4=_0x551847,_0x1e9ef1=VisuMZ[_0x4a59c4(0x1cb)]['ImageManager_loadCharacter'][_0x4a59c4(0x168)](this,_0x335bfc);return _0x1e9ef1[_0x4a59c4(0x189)]=![],_0x1e9ef1;},VisuMZ[_0x551847(0x1cb)]['ImageManager_loadSystem']=ImageManager['loadSystem'],ImageManager[_0x551847(0x167)]=function(_0x389b75){const _0x1a3f9d=_0x551847,_0x3a3a4a=VisuMZ[_0x1a3f9d(0x1cb)][_0x1a3f9d(0x144)][_0x1a3f9d(0x168)](this,_0x389b75);if(_0x389b75===_0x1a3f9d(0x130))_0x3a3a4a[_0x1a3f9d(0x189)]=![];return _0x3a3a4a;},VisuMZ[_0x551847(0x1cb)][_0x551847(0x18e)]=ImageManager['loadTileset'],ImageManager[_0x551847(0x169)]=function(_0x2e61b6){const _0x53d1a0=_0x551847,_0x5bb722=VisuMZ['MapCameraZoom'][_0x53d1a0(0x18e)][_0x53d1a0(0x168)](this,_0x2e61b6);return _0x5bb722[_0x53d1a0(0x189)]=![],_0x5bb722;},SceneManager[_0x551847(0x146)]=function(){const _0x35bae0=_0x551847;return this['_scene']&&this['_scene'][_0x35bae0(0x1c6)]===Scene_Map;},Game_Temp[_0x551847(0x12b)][_0x551847(0x14c)]=function(_0x419327){const _0x304f1a=_0x551847;this[_0x304f1a(0x1b5)]=_0x419327;},Game_Temp[_0x551847(0x12b)][_0x551847(0x1d4)]=function(){const _0x2bee48=_0x551847;return this[_0x2bee48(0x1b5)];},VisuMZ['MapCameraZoom'][_0x551847(0x177)]=Game_Interpreter[_0x551847(0x12b)][_0x551847(0x12a)],Game_Interpreter[_0x551847(0x12b)]['command357']=function(_0xe0d286){const _0x4979b4=_0x551847;return $gameTemp[_0x4979b4(0x14c)](this),VisuMZ[_0x4979b4(0x1cb)]['Game_Interpreter_PluginCommand']['call'](this,_0xe0d286);},Game_Screen['DEFAULT_MAP_ZOOM_SCALE']=Math[_0x551847(0x118)](0x1,VisuMZ['MapCameraZoom'][_0x551847(0x11b)]['DefaultZoom']||0x1),VisuMZ[_0x551847(0x1cb)][_0x551847(0x141)]=Game_Screen[_0x551847(0x12b)][_0x551847(0x156)],Game_Screen[_0x551847(0x12b)]['initialize']=function(){const _0x13f5fc=_0x551847;VisuMZ[_0x13f5fc(0x1cb)][_0x13f5fc(0x141)]['call'](this),this[_0x13f5fc(0x1b1)]();},Game_Screen[_0x551847(0x12b)][_0x551847(0x1b1)]=function(){const _0x547fd6=_0x551847;this['setupMapZoomSettings'](),this[_0x547fd6(0x181)]();},Game_Screen[_0x551847(0x12b)][_0x551847(0x1ad)]=function(){const _0x35b99e=_0x551847,_0x4f66d2=this[_0x35b99e(0x1c2)]();$gameMap[_0x35b99e(0x1ad)](_0x4f66d2[_0x35b99e(0x166)],_0x4f66d2[_0x35b99e(0x12d)]);},VisuMZ['MapCameraZoom'][_0x551847(0x160)]=Game_Screen[_0x551847(0x12b)]['updateZoom'],Game_Screen[_0x551847(0x12b)]['updateZoom']=function(){const _0x739a=_0x551847;VisuMZ[_0x739a(0x1cb)][_0x739a(0x160)][_0x739a(0x168)](this),this[_0x739a(0xfe)](),this[_0x739a(0x106)]();},Game_Screen['prototype'][_0x551847(0x1c9)]=function(){const _0x2edacd=_0x551847;this[_0x2edacd(0x1bd)]={'scale':Game_Screen[_0x2edacd(0x1d3)],'targetScale':Game_Screen[_0x2edacd(0x1d3)],'duration':0x0,'wholeDuration':0x0,'easingType':'Linear'},this['_mapEnterBattleZoom']={'scale':0x1,'targetScale':0x1,'duration':0x0,'wholeDuration':0x0,'easingType':_0x2edacd(0x12c)};},Game_Screen[_0x551847(0x12b)][_0x551847(0x172)]=function(){const _0x5395b8=_0x551847;if(this[_0x5395b8(0x1bd)]===undefined)this[_0x5395b8(0x1c9)]();return this['_mapZoomSettings'];},Game_Screen[_0x551847(0x12b)][_0x551847(0x148)]=function(){const _0x3295c0=_0x551847;if(this[_0x3295c0(0x183)]===undefined)this[_0x3295c0(0x1c9)]();return this[_0x3295c0(0x183)];},Game_Screen[_0x551847(0x12b)]['startMapZoom']=function(_0xbef0bc,_0x5ab1d8,_0x19b551){const _0x5d85f0=_0x551847,_0xfa27bb=this[_0x5d85f0(0x172)]();if(_0xfa27bb[_0x5d85f0(0x193)]===_0xbef0bc)return;_0xfa27bb[_0x5d85f0(0x193)]=_0xbef0bc,_0xfa27bb[_0x5d85f0(0x111)]=_0x5ab1d8||0x1,_0xfa27bb['wholeDuration']=_0x5ab1d8||0x1,_0xfa27bb[_0x5d85f0(0x1c8)]=_0x19b551;},VisuMZ[_0x551847(0x1cb)][_0x551847(0x198)]=Game_Screen[_0x551847(0x12b)][_0x551847(0x151)],Game_Screen['prototype']['zoomScale']=function(){const _0x4471c=_0x551847;let _0x23acf8=VisuMZ[_0x4471c(0x1cb)][_0x4471c(0x198)][_0x4471c(0x168)](this);if(!this[_0x4471c(0x1bf)]())return _0x23acf8;return SceneManager[_0x4471c(0x146)]()&&(_0x23acf8*=Math[_0x4471c(0x118)](this[_0x4471c(0x172)]()[_0x4471c(0xfd)],0x1),_0x23acf8*=Math['max'](this[_0x4471c(0x148)]()[_0x4471c(0xfd)],0x1)),_0x23acf8;},Game_Screen[_0x551847(0x12b)][_0x551847(0x1bf)]=function(){const _0xa1b25b=_0x551847;if(!SceneManager[_0xa1b25b(0x146)]())return![];if($gameTemp['_doodadEditorMode'])return![];if(Imported['VisuMZ_2_FurnitureSystem']&&$gameMap[_0xa1b25b(0x186)]())return![];return!![];},Game_Screen[_0x551847(0x12b)]['updateMapZoom']=function(){const _0x20f9f3=_0x551847,_0x1c253b=this[_0x20f9f3(0x172)]();if(_0x1c253b['duration']<=0x0)return;const _0xba645d=_0x1c253b[_0x20f9f3(0x111)],_0xd0a059=_0x1c253b[_0x20f9f3(0x19f)],_0x3e2682=_0x1c253b[_0x20f9f3(0x1c8)]||_0x20f9f3(0x12c),_0x568a4c=_0x1c253b[_0x20f9f3(0xfd)],_0xb5006c=_0x1c253b[_0x20f9f3(0x193)];_0x1c253b[_0x20f9f3(0xfd)]=VisuMZ[_0x20f9f3(0x1cb)][_0x20f9f3(0x108)](_0x568a4c,_0xb5006c,_0xba645d,_0xd0a059,_0x3e2682),this[_0x20f9f3(0x1ad)](),_0x1c253b['duration']--;if(_0x1c253b[_0x20f9f3(0x111)]<=0x0){if('EVJMJ'===_0x20f9f3(0x14e))this[_0x20f9f3(0x142)]();else{const _0x4caecd=this[_0x20f9f3(0x187)]()-this[_0x20f9f3(0x114)]();this[_0x20f9f3(0x1a6)]=_0x4caecd<0x0?_0x4caecd/0x2:_0x1b5c60['clamp'](0x0,_0x4caecd),this[_0x20f9f3(0x1a9)]=this[_0x20f9f3(0x1a6)];}}},Game_Screen[_0x551847(0x12b)]['onUpdateMapZoomEnd']=function(){const _0x478386=_0x551847,_0x42caf7=this[_0x478386(0x172)]();_0x42caf7[_0x478386(0xfd)]=_0x42caf7[_0x478386(0x193)];},VisuMZ['MapCameraZoom']['applyEasing']=function(_0x4d5a40,_0x1beeee,_0x52e6e3,_0x13dbbc,_0x540d33){const _0x5aedc8=_0x551847,_0xdb5a4a=VisuMZ[_0x5aedc8(0x137)]((_0x13dbbc-_0x52e6e3)/_0x13dbbc,_0x540d33||_0x5aedc8(0x12c)),_0x24f556=VisuMZ[_0x5aedc8(0x137)]((_0x13dbbc-_0x52e6e3+0x1)/_0x13dbbc,_0x540d33||_0x5aedc8(0x12c)),_0x5011cb=(_0x4d5a40-_0x1beeee*_0xdb5a4a)/(0x1-_0xdb5a4a);return _0x5011cb+(_0x1beeee-_0x5011cb)*_0x24f556;};!VisuMZ['ApplyEasing']&&(VisuMZ[_0x551847(0x137)]=function(_0x378715,_0x5ccd98){return _0x378715;});;Game_Screen[_0x551847(0x12b)][_0x551847(0x181)]=function(){this['_mapCameraSettings']={'playerFocus':!![],'eventFocus':![],'eventTargetID':0x0,'tileFocus':![],'tileCoordinates':{'_realX':0x0,'_realY':0x0},'duration':0x0,'wholeDuration':0x0,'easingType':'Linear','currentCamera':{'_realX':0x0,'_realY':0x0}};},Game_Screen[_0x551847(0x12b)][_0x551847(0x1a5)]=function(){const _0x561e40=_0x551847;if(this['_mapCameraSettings']===undefined)this[_0x561e40(0x181)]();return this['_mapCameraSettings'];},Game_Screen[_0x551847(0x12b)][_0x551847(0x1c2)]=function(_0x5cb997){const _0xc3ece5=_0x551847,_0x4b5eba=this['mapCameraSettings']();if(!_0x5cb997&&_0x4b5eba[_0xc3ece5(0x111)]>0x0){if(_0xc3ece5(0x113)!==_0xc3ece5(0x175))return _0x4b5eba[_0xc3ece5(0x116)];else{const _0x1bddf3=this['mapCameraSettings'](),_0x251c29=this[_0xc3ece5(0x1c2)]();_0x1bddf3[_0xc3ece5(0x116)][_0xc3ece5(0x166)]=_0x251c29[_0xc3ece5(0x166)],_0x1bddf3[_0xc3ece5(0x116)][_0xc3ece5(0x12d)]=_0x251c29['_realY'],_0x1bddf3[_0xc3ece5(0x111)]=_0xfac851||0x1,_0x1bddf3['wholeDuration']=_0x4e06e3||0x1,_0x1bddf3[_0xc3ece5(0x1c8)]=_0x319ce5||'Linear';}}else{if(_0x4b5eba[_0xc3ece5(0x17e)])return $gamePlayer;else{if(_0x4b5eba[_0xc3ece5(0x16d)])return $gameMap['event'](_0x4b5eba[_0xc3ece5(0x153)])||$gamePlayer;else{if(_0x4b5eba[_0xc3ece5(0x1a2)])return _0x4b5eba[_0xc3ece5(0x101)];}}}return $gamePlayer;},Game_Screen['prototype']['isChangingMapCameraFocusTargets']=function(){const _0x5cca1a=_0x551847;return this[_0x5cca1a(0x1c2)]()===this['mapCameraSettings']()[_0x5cca1a(0x116)];},Game_Screen[_0x551847(0x12b)]['setCurrentCameraFocusTile']=function(_0x5f4d07,_0x16df92){const _0x4edd5c=_0x551847,_0x41ed09=this[_0x4edd5c(0x1a5)](),_0x12e13e=this[_0x4edd5c(0x1c2)]();_0x41ed09[_0x4edd5c(0x116)][_0x4edd5c(0x166)]=_0x12e13e[_0x4edd5c(0x166)],_0x41ed09[_0x4edd5c(0x116)][_0x4edd5c(0x12d)]=_0x12e13e[_0x4edd5c(0x12d)],_0x41ed09[_0x4edd5c(0x111)]=_0x5f4d07||0x1,_0x41ed09[_0x4edd5c(0x19f)]=_0x5f4d07||0x1,_0x41ed09[_0x4edd5c(0x1c8)]=_0x16df92||_0x4edd5c(0x12c);},Game_Screen[_0x551847(0x12b)][_0x551847(0x1b0)]=function(_0x1a67d2,_0x338db1){const _0x3f3dbc=_0x551847,_0x1126d3=this[_0x3f3dbc(0x1a5)]();if($gamePlayer[_0x3f3dbc(0x163)]())return;this['setCurrentCameraFocusTile'](_0x1a67d2,_0x338db1),_0x1126d3[_0x3f3dbc(0x17e)]=!![],_0x1126d3[_0x3f3dbc(0x16d)]=![],_0x1126d3[_0x3f3dbc(0x1a2)]=![];const _0x2fcec2=_0x1126d3[_0x3f3dbc(0x101)];_0x2fcec2[_0x3f3dbc(0x166)]=-0x1,_0x2fcec2[_0x3f3dbc(0x12d)]=-0x1;},Game_Screen[_0x551847(0x12b)][_0x551847(0x11e)]=function(_0x1850d3,_0x2507f3,_0x479aae){const _0x539e82=_0x551847,_0xc9062b=$gameMap[_0x539e82(0xf9)](_0x1850d3);if(!_0xc9062b)return;const _0x501a76=this['mapCameraSettings']();if(_0xc9062b[_0x539e82(0x163)]())return;this[_0x539e82(0x13a)](_0x2507f3,_0x479aae),_0x501a76[_0x539e82(0x17e)]=![],_0x501a76[_0x539e82(0x16d)]=!![],_0x501a76[_0x539e82(0x1a2)]=![],_0x501a76['eventTargetID']=_0x1850d3;const _0x1df20c=_0x501a76[_0x539e82(0x101)];_0x1df20c[_0x539e82(0x166)]=-0x1,_0x1df20c[_0x539e82(0x12d)]=-0x1;},Game_Screen[_0x551847(0x12b)][_0x551847(0x140)]=function(_0x5f2744,_0x268170,_0x4f1f5c,_0x304293){const _0x23960d=_0x551847,_0x2fdc08=this[_0x23960d(0x1a5)](),_0x48690c=_0x2fdc08['tileCoordinates'];if(_0x48690c[_0x23960d(0x166)]===_0x5f2744&&_0x48690c[_0x23960d(0x12d)]===_0x268170)return;this[_0x23960d(0x13a)](_0x4f1f5c,_0x304293),_0x2fdc08['playerFocus']=![],_0x2fdc08[_0x23960d(0x16d)]=![],_0x2fdc08[_0x23960d(0x1a2)]=!![],_0x2fdc08[_0x23960d(0x101)][_0x23960d(0x166)]=_0x5f2744,_0x2fdc08[_0x23960d(0x101)][_0x23960d(0x12d)]=_0x268170;},Game_Screen[_0x551847(0x12b)]['updateMapCameraFocus']=function(){const _0x3526ac=_0x551847,_0x1e9077=this[_0x3526ac(0x1a5)]();if(_0x1e9077['duration']<=0x0)return;const _0x2e54df=_0x1e9077[_0x3526ac(0x111)],_0x2ace94=_0x1e9077[_0x3526ac(0x19f)],_0x3448e4=_0x1e9077[_0x3526ac(0x1c8)]||_0x3526ac(0x12c),_0x10327a=_0x1e9077['currentCamera'],_0x22d11a=this[_0x3526ac(0x1c2)](!![]),_0x37729d=$gameMap[_0x3526ac(0x16e)],_0x316d44=$gameMap['_displayY'];_0x10327a['_realX']=VisuMZ[_0x3526ac(0x1cb)][_0x3526ac(0x108)](_0x10327a[_0x3526ac(0x166)],_0x22d11a[_0x3526ac(0x166)],_0x2e54df,_0x2ace94,_0x3448e4),_0x10327a['_realY']=VisuMZ[_0x3526ac(0x1cb)][_0x3526ac(0x108)](_0x10327a[_0x3526ac(0x12d)],_0x22d11a[_0x3526ac(0x12d)],_0x2e54df,_0x2ace94,_0x3448e4),this[_0x3526ac(0x1ad)]();if(this['updateMapCameraFocusSmooth']()){if(_0x3526ac(0x173)===_0x3526ac(0x127)){const _0x5ca428=_0x5cfffc[_0x3526ac(0x1ce)][_0x3526ac(0x107)],_0x4972d0=_0x2ddc8b[_0x3526ac(0x151)](),_0x58e309=0.5/_0x4972d0,_0x2ab41e=-_0x5ca428['x']/_0x4972d0,_0x21f6a2=-_0x5ca428['y']/_0x4972d0;this['x']=this['parent'][_0x3526ac(0x164)]*_0x58e309+_0x2ab41e,this['y']=this[_0x3526ac(0x13d)][_0x3526ac(0x187)]*_0x58e309+_0x21f6a2;}else{const _0x118b95=$gameMap[_0x3526ac(0x16e)],_0x3c1d19=$gameMap[_0x3526ac(0x1a6)];$gameMap[_0x3526ac(0x16e)]=VisuMZ[_0x3526ac(0x1cb)][_0x3526ac(0x108)](_0x37729d,_0x118b95,_0x2e54df,_0x2ace94,_0x3448e4),$gameMap[_0x3526ac(0x1a6)]=VisuMZ[_0x3526ac(0x1cb)][_0x3526ac(0x108)](_0x316d44,_0x3c1d19,_0x2e54df,_0x2ace94,_0x3448e4);}}_0x1e9077['duration']--,_0x1e9077['duration']<=0x0&&this[_0x3526ac(0x174)]();},Game_Screen[_0x551847(0x12b)][_0x551847(0x1b4)]=function(){const _0x5a565b=_0x551847;return![];if(!Imported[_0x5a565b(0x11d)])return![];if(!$gamePlayer[_0x5a565b(0x17f)]())return![];const _0x7497e6=this[_0x5a565b(0x1a5)](),_0x1eed4b=_0x7497e6['duration'],_0x45ff59=_0x7497e6[_0x5a565b(0x19f)];return _0x1eed4b>_0x45ff59;},Game_Screen[_0x551847(0x12b)]['onUpdateMapCameraFocusEnd']=function(){const _0x2a5757=_0x551847,_0xc85689=this['mapCameraSettings'](),_0x87448f=_0xc85689[_0x2a5757(0x116)],_0x9e0b5=this[_0x2a5757(0x1c2)](!![]);_0x87448f['_realX']=_0x9e0b5[_0x2a5757(0x166)],_0x87448f[_0x2a5757(0x12d)]=_0x9e0b5['_realY'];},Game_Picture[_0x551847(0x12b)][_0x551847(0x1d1)]=function(){const _0x4d1cb7=_0x551847,_0x33fad3=$gameMap[_0x4d1cb7(0x11c)]()*$gameMap['tileWidth']();return(this['_x']-_0x33fad3)*$gameScreen[_0x4d1cb7(0x151)]();},Game_Picture[_0x551847(0x12b)]['yScrollLinkedOffset']=function(){const _0x144686=_0x551847,_0x1e460d=$gameMap[_0x144686(0xfc)]()*$gameMap[_0x144686(0x1b7)]();return(this['_y']-_0x1e460d)*$gameScreen[_0x144686(0x151)]();},VisuMZ[_0x551847(0x1cb)][_0x551847(0x1cc)]=Game_Map[_0x551847(0x12b)][_0x551847(0x1c4)],Game_Map[_0x551847(0x12b)]['setup']=function(_0x1dc0ac){const _0x30ce6b=_0x551847;VisuMZ[_0x30ce6b(0x1cb)][_0x30ce6b(0x1cc)]['call'](this,_0x1dc0ac),this[_0x30ce6b(0x10b)](),this['_mapCameraParallaxUpdates']=0x0;},Game_Map[_0x551847(0x12b)][_0x551847(0x10b)]=function(){const _0x211c5e=_0x551847,_0x305ebb=VisuMZ[_0x211c5e(0x1cb)][_0x211c5e(0x157)],_0xc607e2=$dataMap?$dataMap[_0x211c5e(0x1d0)]||'':'';if(_0xc607e2['match'](_0x305ebb[_0x211c5e(0x19c)])){if(_0x211c5e(0x12e)===_0x211c5e(0x13c)){if(!_0x4d3fe7['isSceneMap']())return;_0x3aab18['ConvertParams'](_0x2eaedd,_0x3e4b2d);const _0x43050b=_0x2c996f['getLastPluginCommandInterpreter'](),_0x455679=_0x3c49f8[_0x211c5e(0x138)]||_0x43050b['eventId'](),_0x527319=_0x1a7794[_0x211c5e(0xf9)](_0x455679),_0x1f8080=_0x2e7b19[_0x211c5e(0x17c)]||0x1,_0x1036ca=_0x3d7b75[_0x211c5e(0x13e)]||'Linear';if(!_0x527319)return;_0x53fb69[_0x211c5e(0x11e)](_0x455679,_0x1f8080,_0x1036ca);}else{let _0x2e509f=Number(RegExp['$1'])*0.01;_0x2e509f<0x1&&$gameTemp[_0x211c5e(0x190)]()&&alert(_0x211c5e(0x18b)),_0x2e509f=Math[_0x211c5e(0x118)](0x1,_0x2e509f),$gameScreen[_0x211c5e(0x172)]()[_0x211c5e(0xfd)]=_0x2e509f,$gameScreen['mapZoomSettings']()[_0x211c5e(0x193)]=_0x2e509f,$gameScreen[_0x211c5e(0x172)]()[_0x211c5e(0x111)]=0x0;}}$gameScreen[_0x211c5e(0x1ad)]();},Game_Map['prototype'][_0x551847(0x1ad)]=function(_0x5298dd,_0x2e6a1b){const _0x394cb4=_0x551847;_0x5298dd-=$gamePlayer['centerX'](),_0x2e6a1b-=$gamePlayer[_0x394cb4(0x119)](),this[_0x394cb4(0x1a7)](_0x5298dd,_0x2e6a1b),this[_0x394cb4(0x1af)](_0x5298dd,_0x2e6a1b),this[_0x394cb4(0x179)](_0x5298dd,_0x2e6a1b);},Game_Map[_0x551847(0x12b)][_0x551847(0x1a7)]=function(_0xac9d,_0x13b46a){const _0x366600=_0x551847;if(this['isLoopHorizontal']())this[_0x366600(0x16e)]=_0xac9d[_0x366600(0x18f)](this[_0x366600(0x164)]()),this[_0x366600(0x100)]=_0xac9d;else{if('DUYJJ'!==_0x366600(0x161))_0x345e30[_0x366600(0x1cb)][_0x366600(0x160)][_0x366600(0x168)](this),this[_0x366600(0xfe)](),this[_0x366600(0x106)]();else{const _0x35b136=this[_0x366600(0x164)]()-this[_0x366600(0x1be)]();this['_displayX']=_0x35b136<0x0?_0x35b136/0x2:_0xac9d[_0x366600(0x14b)](0x0,_0x35b136),this[_0x366600(0x100)]=this[_0x366600(0x16e)];}}if(this[_0x366600(0x120)]())this[_0x366600(0x1a6)]=_0x13b46a[_0x366600(0x18f)](this['height']()),this[_0x366600(0x1a9)]=_0x13b46a;else{const _0x2ea473=this[_0x366600(0x187)]()-this['screenTileY']();this[_0x366600(0x1a6)]=_0x2ea473<0x0?_0x2ea473/0x2:_0x13b46a[_0x366600(0x14b)](0x0,_0x2ea473),this[_0x366600(0x1a9)]=this[_0x366600(0x1a6)];}},Game_Map['prototype'][_0x551847(0x1af)]=function(_0x192715,_0x280048){const _0x36807f=_0x551847,_0xf756fc=this['_mapCameraParallaxUpdates']||0x0;if(_0xf756fc<=0x0)return;if(this[_0x36807f(0x15c)]){if(_0x36807f(0x1bc)!==_0x36807f(0x1bc))return _0x39ec42[_0x36807f(0x12b)][_0x36807f(0x119)][_0x36807f(0x168)](this);else this[_0x36807f(0x100)]+=this[_0x36807f(0x131)]/this[_0x36807f(0x1cd)]()/0x2*_0xf756fc;}this[_0x36807f(0x15d)]&&(this[_0x36807f(0x1a9)]+=this['_parallaxSy']/this['tileHeight']()/0x2*_0xf756fc);},Game_Map['prototype'][_0x551847(0x179)]=function(_0x5cabe7,_0x1ccf7c){const _0xee9a57=_0x551847;if(Imported[_0xee9a57(0x139)]){if('Xrpgz'!==_0xee9a57(0x1a0))return _0x5958ea[_0xee9a57(0x12b)][_0xee9a57(0x17f)][_0xee9a57(0x168)](this);else{this['_visualParallaxSettings']=this[_0xee9a57(0x1c0)]||[];for(const _0x166844 of this['getVisualParallaxes']()){if(!_0x166844)continue;_0x166844['_parallaxZero']&&(_0x166844[_0xee9a57(0x100)]=this[_0xee9a57(0x16e)],_0x166844[_0xee9a57(0x1a9)]=this[_0xee9a57(0x1a6)]);}}}},VisuMZ[_0x551847(0x1cb)][_0x551847(0x14a)]=Game_Map[_0x551847(0x12b)][_0x551847(0x17b)],Game_Map[_0x551847(0x12b)][_0x551847(0x17b)]=function(){const _0x2a246b=_0x551847;VisuMZ['MapCameraZoom'][_0x2a246b(0x14a)][_0x2a246b(0x168)](this),this[_0x2a246b(0x158)]=this[_0x2a246b(0x158)]||0x0,this[_0x2a246b(0x158)]++;},VisuMZ[_0x551847(0x1cb)][_0x551847(0x1cf)]=Game_Map['prototype'][_0x551847(0x1aa)],Game_Map['prototype'][_0x551847(0x1aa)]=function(){const _0x24c6ac=_0x551847;let _0x5bc554=VisuMZ[_0x24c6ac(0x1cb)][_0x24c6ac(0x1cf)][_0x24c6ac(0x168)](this);if(this['_parallaxZero'])_0x5bc554=Math['floor'](_0x5bc554);return _0x5bc554;},VisuMZ[_0x551847(0x1cb)][_0x551847(0x16f)]=Game_Map['prototype'][_0x551847(0x1c7)],Game_Map['prototype'][_0x551847(0x1c7)]=function(){const _0x516c52=_0x551847;let _0x136bd7=VisuMZ[_0x516c52(0x1cb)][_0x516c52(0x16f)][_0x516c52(0x168)](this);if(this[_0x516c52(0x1a3)])_0x136bd7=Math['floor'](_0x136bd7);return _0x136bd7;},Game_Map['prototype'][_0x551847(0x102)]=function(_0x1ad962){const _0x3fb4ba=_0x551847,_0x1c16d2=this[_0x3fb4ba(0x1cd)]()*$gameScreen[_0x3fb4ba(0x151)](),_0x160dd8=this['_displayX']*_0x1c16d2,_0x40d16e=Math[_0x3fb4ba(0x128)]((_0x160dd8+_0x1ad962)/_0x1c16d2);return this[_0x3fb4ba(0x180)](_0x40d16e);},Game_Map[_0x551847(0x12b)][_0x551847(0x126)]=function(_0x58673c){const _0x2bc0bc=_0x551847,_0x3b6650=this[_0x2bc0bc(0x1b7)]()*$gameScreen[_0x2bc0bc(0x151)](),_0x452e0c=this[_0x2bc0bc(0x1a6)]*_0x3b6650,_0x34a3a4=Math['floor']((_0x452e0c+_0x58673c)/_0x3b6650);return this['roundY'](_0x34a3a4);},VisuMZ['MapCameraZoom']['Game_Map_screenTileX']=Game_Map[_0x551847(0x12b)][_0x551847(0x1be)],Game_Map['prototype'][_0x551847(0x1be)]=function(){const _0x5397d7=_0x551847,_0x46dc4d=VisuMZ['MapCameraZoom'][_0x5397d7(0x1ab)][_0x5397d7(0x168)](this);return _0x46dc4d/$gameScreen['zoomScale']();},VisuMZ[_0x551847(0x1cb)][_0x551847(0x136)]=Game_Map[_0x551847(0x12b)][_0x551847(0x114)],Game_Map[_0x551847(0x12b)][_0x551847(0x114)]=function(){const _0x24f4bf=_0x551847,_0x109d58=VisuMZ[_0x24f4bf(0x1cb)]['Game_Map_screenTileY'][_0x24f4bf(0x168)](this);return _0x109d58/$gameScreen[_0x24f4bf(0x151)]();},Game_CharacterBase['prototype'][_0x551847(0x163)]=function(){return $gameScreen['mapCameraFocusTarget']()===this;},VisuMZ[_0x551847(0x1cb)][_0x551847(0x1b8)]=Game_Player[_0x551847(0x12b)][_0x551847(0x182)],Game_Player[_0x551847(0x12b)][_0x551847(0x182)]=function(){const _0x3524bb=_0x551847;VisuMZ[_0x3524bb(0x1cb)][_0x3524bb(0x1b8)][_0x3524bb(0x168)](this),$gameScreen[_0x3524bb(0x1b0)](0x1,_0x3524bb(0x12c)),$gameScreen[_0x3524bb(0x1ad)]();},VisuMZ[_0x551847(0x1cb)]['Game_Player_updateScroll']=Game_Player['prototype'][_0x551847(0x14f)],Game_Player[_0x551847(0x12b)][_0x551847(0x14f)]=function(_0x356c17,_0xa14341){const _0x1a77eb=_0x551847;if(!this[_0x1a77eb(0x163)]())return;VisuMZ[_0x1a77eb(0x1cb)][_0x1a77eb(0x171)][_0x1a77eb(0x168)](this,_0x356c17,_0xa14341);},Game_Event['prototype'][_0x551847(0x110)]=function(){const _0x4f1966=_0x551847;return Game_Player['prototype'][_0x4f1966(0x110)][_0x4f1966(0x168)](this);},Game_Event[_0x551847(0x12b)][_0x551847(0x119)]=function(){const _0xa8b961=_0x551847;return Game_Player['prototype'][_0xa8b961(0x119)][_0xa8b961(0x168)](this);},VisuMZ['MapCameraZoom'][_0x551847(0x149)]=Game_Event[_0x551847(0x12b)]['update'],Game_Event[_0x551847(0x12b)][_0x551847(0x1d5)]=function(){const _0x50f98b=_0x551847,_0x5e904c=this[_0x50f98b(0x154)](),_0xe6534d=this[_0x50f98b(0x192)]();VisuMZ[_0x50f98b(0x1cb)]['Game_Event_update'][_0x50f98b(0x168)](this);if(!this[_0x50f98b(0x163)]())return;this[_0x50f98b(0x14f)](_0x5e904c,_0xe6534d);},Game_Event[_0x551847(0x12b)][_0x551847(0x14f)]=function(_0x1ed36d,_0x2643ac){const _0x53341c=_0x551847;return Game_Player[_0x53341c(0x12b)]['updateScroll'][_0x53341c(0x168)](this,_0x1ed36d,_0x2643ac);},Game_Event[_0x551847(0x12b)][_0x551847(0x17f)]=function(){const _0x52c651=_0x551847;try{return Game_Player[_0x52c651(0x12b)]['canSmoothScroll'][_0x52c651(0x168)](this);}catch(_0x22dcc4){return![];}},Game_Event['prototype'][_0x551847(0x103)]=function(_0x12b2b3,_0x147a06){const _0x4d7c0=_0x551847;try{if(_0x4d7c0(0x18d)===_0x4d7c0(0x17d)){const _0x4e8faf=this[_0x4d7c0(0x1b7)]()*_0x62a3d1['zoomScale'](),_0x4f3eec=this['_displayY']*_0x4e8faf,_0x204560=_0x4d1ed7['floor']((_0x4f3eec+_0x3a71df)/_0x4e8faf);return this[_0x4d7c0(0x15f)](_0x204560);}else Game_Player[_0x4d7c0(0x12b)][_0x4d7c0(0x103)][_0x4d7c0(0x168)](this,_0x12b2b3,_0x147a06);}catch(_0x3dcada){VisuMZ['MovementEffects']['Game_Player_updateScroll'][_0x4d7c0(0x168)](this,_0x12b2b3,_0x147a06);}},Game_Event[_0x551847(0x12b)]['isInAirship']=function(){return![];},VisuMZ['MapCameraZoom'][_0x551847(0x129)]=Game_Interpreter[_0x551847(0x12b)]['updateWaitMode'],Game_Interpreter[_0x551847(0x12b)][_0x551847(0x18c)]=function(){const _0x52a13d=_0x551847;if(this[_0x52a13d(0xff)]===_0x52a13d(0x145)){if($gameScreen['mapCameraSettings']()[_0x52a13d(0x111)]>0x0){if(_0x52a13d(0x125)!=='QXOmw')return!![];else{if(this[_0x52a13d(0x122)]===_0x26fff2)this[_0x52a13d(0x181)]();return this[_0x52a13d(0x122)];}}this[_0x52a13d(0xff)]='';}else{if(this[_0x52a13d(0xff)]===_0x52a13d(0x10e)){if(_0x52a13d(0x18a)===_0x52a13d(0x18a)){if($gameScreen[_0x52a13d(0x172)]()[_0x52a13d(0x111)]>0x0)return!![];this['_waitMode']='';}else this[_0x52a13d(0x122)]={'playerFocus':!![],'eventFocus':![],'eventTargetID':0x0,'tileFocus':![],'tileCoordinates':{'_realX':0x0,'_realY':0x0},'duration':0x0,'wholeDuration':0x0,'easingType':_0x52a13d(0x12c),'currentCamera':{'_realX':0x0,'_realY':0x0}};}}return VisuMZ[_0x52a13d(0x1cb)][_0x52a13d(0x129)][_0x52a13d(0x168)](this);},Scene_Map[_0x551847(0x1ae)]=VisuMZ['MapCameraZoom']['Settings'][_0x551847(0x15a)],VisuMZ[_0x551847(0x1cb)][_0x551847(0x123)]=Scene_Map['prototype'][_0x551847(0x159)],Scene_Map[_0x551847(0x12b)][_0x551847(0x159)]=function(){const _0x3b5d1c=_0x551847;VisuMZ[_0x3b5d1c(0x1cb)][_0x3b5d1c(0x123)][_0x3b5d1c(0x168)](this),Scene_Map[_0x3b5d1c(0x1ae)]&&($gameScreen[_0x3b5d1c(0x148)]()[_0x3b5d1c(0xfd)]=0x1,$gameScreen[_0x3b5d1c(0x1ad)]());},VisuMZ['MapCameraZoom'][_0x551847(0x176)]=Scene_Map[_0x551847(0x12b)]['updateEncounterEffect'],Scene_Map[_0x551847(0x12b)][_0x551847(0x10c)]=function(){const _0x2cdb10=_0x551847;$gameTemp[_0x2cdb10(0x133)]=Scene_Map[_0x2cdb10(0x1ae)],VisuMZ[_0x2cdb10(0x1cb)]['Scene_Map_updateEncounterEffect'][_0x2cdb10(0x168)](this),$gameTemp[_0x2cdb10(0x133)]=undefined;},VisuMZ['MapCameraZoom'][_0x551847(0x13b)]=Game_Screen[_0x551847(0x12b)][_0x551847(0x1b9)],Game_Screen[_0x551847(0x12b)][_0x551847(0x1b9)]=function(_0xf90c9a,_0x20e99c,_0x5da4b6){const _0x122fcd=_0x551847;if($gameTemp[_0x122fcd(0x133)])_0x122fcd(0x10f)===_0x122fcd(0x124)?(_0xf84125[_0x122fcd(0x1cb)]['Scene_Map_start'][_0x122fcd(0x168)](this),_0x98fd81[_0x122fcd(0x1ae)]&&(_0x3ded18[_0x122fcd(0x148)]()[_0x122fcd(0xfd)]=0x1,_0x29cc33[_0x122fcd(0x1ad)]())):this[_0x122fcd(0x1d2)](_0x5da4b6);else{if(_0x122fcd(0x1a4)==='jVcah')VisuMZ['MapCameraZoom']['Game_Screen_setZoom']['call'](this,_0xf90c9a,_0x20e99c,_0x5da4b6);else{const _0x22f3db=_0x477b7e(_0x558d79['$1']);_0x22f3db!==_0x35961a[_0x38b57e]['version']&&(_0x4c7b6c('%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.'['format'](_0x3e4fb5,_0x22f3db)),_0x1eb57e['exit']());}}},Game_Screen[_0x551847(0x12b)]['setBattleEncounterZoom']=function(_0x5a6851){const _0x3028d1=_0x551847;this['mapZoomEnterBattleSettings']()[_0x3028d1(0xfd)]=_0x5a6851,this['centerMapCameraZoom']();},VisuMZ['MapCameraZoom']['Sprite_AnimationMV_updatePosition']=Sprite_AnimationMV[_0x551847(0x12b)][_0x551847(0x1c1)],Sprite_AnimationMV['prototype'][_0x551847(0x1c1)]=function(){const _0x1f2ca2=_0x551847;SceneManager[_0x1f2ca2(0x146)]()&&this[_0x1f2ca2(0x178)][_0x1f2ca2(0x170)]===0x3?this['updateMapZoomPosition']():VisuMZ[_0x1f2ca2(0x1cb)][_0x1f2ca2(0x197)][_0x1f2ca2(0x168)](this);},Sprite_AnimationMV[_0x551847(0x12b)][_0x551847(0x135)]=function(){const _0x48011d=_0x551847,_0x38450c=SceneManager[_0x48011d(0x1ce)][_0x48011d(0x107)],_0x389663=$gameScreen[_0x48011d(0x151)](),_0x106b8d=0.5/_0x389663,_0x580d9f=-_0x38450c['x']/_0x389663,_0xdd3f44=-_0x38450c['y']/_0x389663;this['x']=this['parent'][_0x48011d(0x164)]*_0x106b8d+_0x580d9f,this['y']=this[_0x48011d(0x13d)][_0x48011d(0x187)]*_0x106b8d+_0xdd3f44;};