//=============================================================================
// VisuStella MZ - Button Trigger Events
// VisuMZ_3_ButtonTriggerEvts.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_3_ButtonTriggerEvts = true;

var VisuMZ = VisuMZ || {};
VisuMZ.ButtonTriggerEvts = VisuMZ.ButtonTriggerEvts || {};
VisuMZ.ButtonTriggerEvts.version = 1.01;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 3] [Version 1.01] [ButtonTriggerEvts]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Main_Page
 * @base VisuMZ_1_EventsMoveCore
 * @orderAfter VisuMZ_1_EventsMoveCore
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * This plugin allows you, the game dev, the setup events that can be remotely
 * triggered by certain button presses even if the player character is across
 * the map. This can be used in a number of ways such as setting up specific
 * interactions or even reproducing a point and click navigation style.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Setup events that can remotely trigger upon the player pressing specific
 *   keyboard buttons. The player character doesn't need to be near the event.
 * * Setup which buttons will trigger the event. These buttons range from the
 *   directional arrows, the OK, cancel, Page Up, Page Down, CTRL, Shift, and
 *   Tab buttons on the keyboard.
 * * Automatically setup Click Triggers and icons based on the button assigned.
 * * When multiple events are assigned to a button key, the player will enter a
 *   spotlight mode to help determine which event the player wishes to interact
 *   with relative to the key press.
 * * Use custom settings or images for the spotlight mode.
 *
 * ============================================================================
 * Requirements
 * ============================================================================
 *
 * This plugin is made for RPG Maker MZ. This will not work in other iterations
 * of RPG Maker.
 *
 * ------ Required Plugin List ------
 *
 * * VisuMZ_1_EventsMoveCore
 *
 * This plugin requires the above listed plugins to be installed inside your
 * game's Plugin Manager list in order to work. You cannot start your game with
 * this plugin enabled without the listed plugins.
 *
 * ------ Tier 3 ------
 *
 * This plugin is a Tier 3 plugin. Place it under other plugins of lower tier
 * value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
 * that your plugins will have the best compatibility with the rest of the
 * VisuStella MZ library.
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
 * === Event-Related Notetags and Comment Tags ===
 * 
 * ---
 *
 * <Trigger Button: button>
 * <Trigger Buttons: button, button, button>
 *
 * - Used for: Event Notetags and Comment Tags
 * - Allows the event to remotely trigger upon the player pressing a specific
 *   keyboard button.
 *   - The event's Trigger condition must be either "Action Button",
 *     "Player Touch", or "Event Touch".
 *   - This does not work with "Autorun" or "Parallel".
 * - Insert the tag inside the Notebox to make the Button Trigger apply to ALL
 *   of the event's pages.
 * - Insert the tag inside of a Comment to make the Button Trigger apply ONLY
 *   to the specific event pages that have those comments on them.
 * - Replace 'button' with any of the following buttons (remove quotes):
 *   - "Down", "Left", "Right", "Up"
 *   - "OK", "Cancel", "PageUp", "PageDown",
 *   - "Control", "Shift", "Tab"
 *   - Typing in a button wrong (such as adding a space to "Page Up") will
 *     yield no results.
 *   - The "Cancel" button trigger will prevent the Main Menu from being called
 *     when pressed with the Keyboard, but it will NOT prevent the Main Menu
 *     from being called with mouse buttons or touch controls.
 * - Insert multiple buttons separated by commas to allow for multiple keyboard
 *   buttons to trigger them.
 * 
 * Examples:
 * 
 * <Trigger Button: OK>
 * <Trigger Button: Left, Down>
 * <Trigger Button: Up, Right>
 * <Trigger Button: PageUp, PageDown>
 *
 * ---
 *
 * <No Auto Trigger Icon>
 *
 * - Used for: Event Notetags and Comment Tags
 * - Prevents icons from being automatically assigned to the event if it is
 *   assigned a Trigger Button.
 *
 * ---
 *
 * <No Auto Click Trigger>
 *
 * - Used for: Event Notetags and Comment Tags
 * - Prevents click trigger from being automatically assigned to the event if
 *   it is assigned a Trigger Button.
 *
 * ---
 * 
 * === Map-Related Notetags ===
 * 
 * ---
 *
 * <Seal Input Move>
 *
 * - Used for: Map Notetags
 * - Prevents the player from being able to use directional inputs and touch
 *   navigation on this specific map.
 * - If this notetag is not used, the setting will default to whatever is set
 *   up in the Plugin Parameters > Auto QOL Settings > Auto <Seal Input Move>
 *   setting.
 *
 * ---
 *
 * <No Seal Input Move>
 *
 * - Used for: Map Notetags
 * - Allows the player to be able to use directional inputs and utilize touch
 *   navigation on this specific map.
 * - If this notetag is not used, the setting will default to whatever is set
 *   up in the Plugin Parameters > Auto QOL Settings > Auto <Seal Input Move>
 *   setting.
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
 * === System Plugin Commands ===
 * 
 * ---
 *
 * System: Enable Button Trigger Events
 * - Enable/disable Button Trigger Events from activating.
 *
 *   Enable/Disable?:
 *   - Enables Button Trigger Events and allows them to activate.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Automatic Quality of Life Settings
 * ============================================================================
 *
 * These Plugin Parameters allow you to quickly adjust and streamline your game
 * to utilize the Button Trigger Events in a more efficient manner.
 *
 * ---
 *
 * General
 * 
 *   Auto <Seal Input Move>:
 *   - Seal off input movement by default for every map?
 *   - Player will be unable to with the keyboard or with the mouse if enabled.
 * 
 *   Auto <Click Trigger>:
 *   - Add <Click Trigger> for events with Trigger Buttons?
 *   - Player can click the events and automatically trigger them.
 *
 * ---
 *
 * Auto <Icon: x>
 * 
 *   Direction:
 * 
 *     Down:
 *     Left:
 *     Right:
 *     Up:
 *     - Which icon do you wish to use for this button?
 *     - Use 0 for no changes.
 *     - If a Trigger Button is discovered using this key(s), this icon will
 *       be automatically assigned to the event.
 * 
 *   Actions:
 * 
 *     OK / Confirm:
 *     Menu / Cancel:
 *     Page Up:
 *     Page Down:
 *     - Which icon do you wish to use for this button?
 *     - Use 0 for no changes.
 *     - If a Trigger Button is discovered using this key(s), this icon will
 *       be automatically assigned to the event.
 * 
 *   Other:
 * 
 *     CTRL:
 *     Shift:
 *     Tab:
 *     - Which icon do you wish to use for this button?
 *     - Use 0 for no changes.
 *     - If a Trigger Button is discovered using this key(s), this icon will
 *       be automatically assigned to the event.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Spotlight Settings
 * ============================================================================
 *
 * If multiple events are assigned the same Trigger Button, then Spotlight Mode
 * will occur. The player character and all other events will freeze in place,
 * while the player selects which event to trigger.
 * 
 * Spotlight Mode will only enlist the events that are on the player's screen
 * and will filter out the ones that aren't close. If there aren't any near the
 * player's screen, then the one with the lowest event ID will automatically
 * trigger. Otherwise, the player will select from the events visible on the
 * screen close to the player.
 * 
 * You can assign a custom graphic for the spotlight. However, if no custom
 * graphic is used, an auto-generated one will be used instead. The generated
 * spotlight is a simplistic darkened screen with a light in the middle.
 *
 * ---
 *
 * Custom Graphic
 * 
 *   Filename:
 *   - Insert a filename here to use a custom graphic.
 *   - Leave empty to not use. Located in img/system/
 * 
 *   Anchor X:
 *   - Custom anchor X value for the custom spotlight.
 *   - 0.0 - left; 0.5 - center; 1.0 - right
 *   - This does NOT apply to the auto-generated spotlight.
 * 
 *   Anchor Y:
 *   - Custom anchor Y value for the custom spotlight.
 *   - 0.0 - top; 0.5 - middle; 1.0 - bottom
 *   - This does NOT apply to the auto-generated spotlight.
 * 
 *   Blend Mode:
 *   - What kind of blend mode do you wish to apply to the custom spotlight?
 *   - This does NOT apply to the auto-generated spotlight.
 *
 * ---
 *
 * Generated Image
 * 
 *   Radius:
 *   - If no custom graphic is used, generate a spotlight bitmap.
 *   - This determines the radius.
 *
 * ---
 *
 * Fade Effect
 * 
 *   Target Opacity:
 *   - What is the target opacity when the spotlight is visible?
 *   - 1 - More Transparent
 *   - 255 - Max Opaque
 * 
 *   Fade Speed:
 *   - What speed does the opacity fade in and out at?
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
 * * Olivia
 * * Irina
 * * Yanfly
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 * 
 * Version 1.01: February 3, 2022
 * * Documentation Update!
 * ** Added text for "Plugin Parameters: Spotlight Settings"
 * *** Spotlight Mode will only enlist the events that are on the player's
 *     screen and will filter out the ones that aren't close. If there aren't
 *     any near the player's screen, then the one with the lowest event ID will
 *     automatically trigger. Otherwise, the player will select from the events
 *     visible on the screen close to the player.
 * * Feature Update!
 * ** Updated the handling of event triggers for multiple events that may not
 *    appear on the player's screen. Update made by Arisu.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.00 Official Release Date: February 9, 2022
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemEnableButtonTriggerEvtsMenu
 * @text System: Enable Button Trigger Events
 * @desc Enable/disable Button Trigger Events from activating.
 *
 * @arg Enable:eval
 * @text Enable/Disable?
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables Button Trigger Events and allows them to activate.
 * @default true
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
 * @param ButtonTriggerEvts
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Auto:struct
 * @text Automatic QOL Settings
 * @type struct<Auto>
 * @desc Automatic Quality of Life settings.
 * @default {"AutoSealedMovement:eval":"false","AutoClickTrigger:eval":"true","AutoIcon":"","AutoIconDirection":"","AutoIconDOWN:num":"0","AutoIconLEFT:num":"0","AutoIconRIGHT:num":"0","AutoIconUP:num":"0","AutoIconActions":"","AutoIconOK:num":"0","AutoIconCANCEL:num":"0","AutoIconPAGEUP:num":"0","AutoIconPAGEDOWN:num":"0","AutoIconOutter":"","AutoIconCONTROL:num":"0","AutoIconSHIFT:num":"0","AutoIconTAB:num":"0"}
 *
 * @param Spotlight:struct
 * @text Spotlight Settings
 * @type struct<Spotlight>
 * @desc Settings used for the Spotlight Mode.
 * @default {"Custom":"","Filename:str":"","AnchorX:num":"0.5","AnchorY:num":"0.5","BlendMode:num":"0","Bitmap":"","Radius:num":"72","Fading":"","Opacity:num":"160","FadeSpeed:num":"8"}
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
/* ----------------------------------------------------------------------------
 * Automatic Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Auto:
 *
 * @param AutoSealedMovement:eval
 * @text Auto <Seal Input Move>
 * @parent Auto
 * @type boolean
 * @on Seal by Default
 * @off Normal Movement
 * @desc Seal off input movement by default for every map?
 * @default false
 *
 * @param AutoClickTrigger:eval
 * @text Auto <Click Trigger>
 * @parent Auto
 * @type boolean
 * @on Add <Click Trigger>
 * @off Do Not Add
 * @desc Add <Click Trigger> for events with Trigger Buttons?
 * @default true
 *
 * @param AutoIcon
 * @text Auto <Icon: x>
 * @parent Auto
 * 
 * @param AutoIconDirection
 * @text Direction
 * @parent AutoIcon
 *
 * @param AutoIconDOWN:num
 * @text Down
 * @parent AutoIconDirection
 * @desc Which icon do you wish to use for this button?
 * Use 0 for no changes.
 * @default 0
 *
 * @param AutoIconLEFT:num
 * @text Left
 * @parent AutoIconDirection
 * @desc Which icon do you wish to use for this button?
 * Use 0 for no changes.
 * @default 0
 *
 * @param AutoIconRIGHT:num
 * @text Right
 * @parent AutoIconDirection
 * @desc Which icon do you wish to use for this button?
 * Use 0 for no changes.
 * @default 0
 *
 * @param AutoIconUP:num
 * @text Up
 * @parent AutoIconDirection
 * @desc Which icon do you wish to use for this button?
 * Use 0 for no changes.
 * @default 0
 * 
 * @param AutoIconActions
 * @text Actions
 * @parent AutoIcon
 *
 * @param AutoIconOK:num
 * @text OK / Confirm
 * @parent AutoIconActions
 * @desc Which icon do you wish to use for this button?
 * Use 0 for no changes.
 * @default 0
 *
 * @param AutoIconCANCEL:num
 * @text Menu / Cancel
 * @parent AutoIconActions
 * @desc Which icon do you wish to use for this button?
 * Use 0 for no changes.
 * @default 0
 *
 * @param AutoIconPAGEUP:num
 * @text Page Up
 * @parent AutoIconActions
 * @desc Which icon do you wish to use for this button?
 * Use 0 for no changes.
 * @default 0
 *
 * @param AutoIconPAGEDOWN:num
 * @text Page Down
 * @parent AutoIconActions
 * @desc Which icon do you wish to use for this button?
 * Use 0 for no changes.
 * @default 0
 * 
 * @param AutoIconOutter
 * @text Other
 * @parent AutoIcon
 *
 * @param AutoIconCONTROL:num
 * @text CTRL
 * @parent AutoIconOutter
 * @desc Which icon do you wish to use for this button?
 * Use 0 for no changes.
 * @default 0
 *
 * @param AutoIconSHIFT:num
 * @text Shift
 * @parent AutoIconOutter
 * @desc Which icon do you wish to use for this button?
 * Use 0 for no changes.
 * @default 0
 *
 * @param AutoIconTAB:num
 * @text Tab
 * @parent AutoIconOutter
 * @desc Which icon do you wish to use for this button?
 * Use 0 for no changes.
 * @default 0
 *
 */
/* ----------------------------------------------------------------------------
 * Spotlight Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Spotlight:
 *
 * @param Custom
 * @text Custom Graphic
 *
 * @param Filename:str
 * @text Filename
 * @parent Custom
 * @type file
 * @dir img/system/
 * @require 1
 * @desc Insert a filename here to use a custom graphic.
 * Leave empty to not use. Located in img/system/
 * @default 
 *
 * @param AnchorX:num
 * @text Anchor X
 * @parent Custom
 * @desc Custom anchor X value for the custom spotlight.
 * 0.0 - left; 0.5 - center; 1.0 - right
 * @default 0.5
 *
 * @param AnchorY:num
 * @text Anchor Y
 * @parent Custom
 * @desc Custom anchor Y value for the custom spotlight.
 * 0.0 - top; 0.5 - middle; 1.0 - bottom
 * @default 0.5
 *
 * @param BlendMode:num
 * @text Blend Mode
 * @parent Custom
 * @type select
 * @option 0 - Normal
 * @value 0
 * @option 1 - Additive
 * @value 1
 * @option 2 - Multiply
 * @value 2
 * @option 3 - Screen
 * @value 3
 * @desc What kind of blend mode do you wish to apply to the custom spotlight?
 * @default 0
 *
 * @param Bitmap
 * @text Generated Image
 *
 * @param Radius:num
 * @text Radius
 * @parent Bitmap
 * @type number
 * @min 1
 * @desc If no custom graphic is used, generate a spotlight bitmap. This determines the radius.
 * @default 72
 *
 * @param Fading
 * @text Fade Effect
 *
 * @param Opacity:num
 * @text Target Opacity
 * @parent Fading
 * @type number
 * @min 1
 * @max 255
 * @desc What is the target opacity when the spotlight is visible?
 * 1 - More Transparent; 255 - Max Opaque
 * @default 160
 *
 * @param FadeSpeed:num
 * @text Fade Speed
 * @parent Fading
 * @type number
 * @min 1
 * @max 255
 * @desc What speed does the opacity fade in and out at?
 * @default 8
 *
 */
//=============================================================================

function _0x3135(_0x60a45b,_0xa05450){const _0x42cac8=_0x42ca();return _0x3135=function(_0x313560,_0xc7b6b1){_0x313560=_0x313560-0xcb;let _0xfa8717=_0x42cac8[_0x313560];return _0xfa8717;},_0x3135(_0x60a45b,_0xa05450);}const _0x113de4=_0x3135;(function(_0x36996a,_0xa85d26){const _0xd11647=_0x3135,_0x1cde4d=_0x36996a();while(!![]){try{const _0x3bd7a5=parseInt(_0xd11647(0x14c))/0x1*(parseInt(_0xd11647(0xed))/0x2)+-parseInt(_0xd11647(0x131))/0x3+-parseInt(_0xd11647(0x12d))/0x4*(parseInt(_0xd11647(0xdd))/0x5)+-parseInt(_0xd11647(0xe2))/0x6+-parseInt(_0xd11647(0x122))/0x7+-parseInt(_0xd11647(0x156))/0x8+parseInt(_0xd11647(0x124))/0x9*(parseInt(_0xd11647(0x17a))/0xa);if(_0x3bd7a5===_0xa85d26)break;else _0x1cde4d['push'](_0x1cde4d['shift']());}catch(_0x576663){_0x1cde4d['push'](_0x1cde4d['shift']());}}}(_0x42ca,0x23b04));var label=_0x113de4(0xd1),tier=tier||0x0,dependencies=['VisuMZ_1_EventsMoveCore'],pluginData=$plugins[_0x113de4(0x16b)](function(_0x3695c4){const _0xe945ae=_0x113de4;return _0x3695c4[_0xe945ae(0x15d)]&&_0x3695c4['description'][_0xe945ae(0x114)]('['+label+']');})[0x0];function _0x42ca(){const _0x121c58=['VisuMZ_2_FurnitureSystem','opacity','Game_Player_moveByInput','Scene_Map_isSceneChangeOk','JSON','drawCircle','_buttonTriggerEventsEnabled','#000000','1643642XHKRvU','clearPageSettings','45hDfequ','Radius','loadSystemImages','_buttonTriggerEventTargetIndex','setupPageSettings','isSceneMap','Game_Event_clearPageSettings','Sprite_Character_isAllowCharacterTilt','isTriggered','24kgBNPm','trim','hasButtonTriggerKey','STRUCT','752724Zmqkqh','left','screenHeight','updateButtonTriggerEventSpotlightSelect','Scene_Map_onMapTouch','min','customBlendMode','initButtonTriggerEventSettings','parameters','updateButtonTriggerEventSpotlightSprite','match','buttonTriggerEventSpotlight','Sprite_Character_getEventIconIndex','createLowerLayer','blendMode','playCursor','max','AutoClickTrigger','SealMovement','sort','getSelectedButtonTriggerEvent','setupButtonTriggerEventMultiple','ARRAYSTRUCT','registerCommand','isButtonTriggerEventSpotlightMode','right','Enable','892dGBkqi','NoAutoTriggerIcon','BUTTON_TRIGGER_EVENTS_DEFAULT_SEALED_MOVEMENT','toLowerCase','loadSystem','isEventButtonTriggered','split','canStartLocalEvents','clear','_triggerButtonKeys','2310928eyZNtG','createButtonTriggerEventSpotlightSprite','_buttonTriggerEventSpotlightSprite','pagedown','length','setupEventButtonTriggerEventList','Game_Event_updateSelfMovement','status','ceil','map','height','onButtonTriggerEventSpotlightInputDir','getButtonTriggerEventKeyIconIndex','_customModified','shift','isSceneChangeOk','Scene_Boot_loadSystemImages','Auto','setupButtonTriggerEventNotetags','STR','getEventIconIndex','filter','Game_Event_setupPageSettings','remove','SystemEnableButtonTriggerEvtsMenu','call','distance','eventId','FUNC','AutoIcon%1','NUM','updateButtonTriggerEventSpotlightInput','updateMove','fadeSpeed','_autoButtonTriggerEventIcon','_scene','2484170AQRMAy','start','_cached_ButtonTriggerEvts_Spotlight','clearButtonTriggerEventMultiple','updateButtonTriggerEventSpotlightPosition','_buttonTriggerEventTargets','ARRAYJSON','format','advanced','isAllowCharacterTilt','updateButtonTriggerEventSpotlightOpacity','setupEventButtonTrigger','isButtonTriggerEvent','updateSelfMovement','ARRAYFUNC','isTriggerIn','TriggerButtons','tileWidth','setupButtonTriggerEventCommentTags','update','#ffffff','_antiAutoButtonTriggerClickTrigger','push','_lastButtonTriggerEvents','deltaXFrom','isFurnitureSystemMode','parse','ButtonTriggerEvts','BUTTON_TRIGGER_EVENT_SPOTLIGHT_SETTINGS','radius','Scene_Map_isMenuEnabled','_character','ConvertParams','constructor','isMoving','filename','tileHeight','ARRAYSTR','customAnchorY','143410HeClER','hasClickTrigger','toString','_erased','tab','1553694nDBfRP','down','abs','screenWidth','version','AnchorY','toUpperCase','exit','Game_CharacterBase_updateMove','description','isRepeated','246MDTQtw','event','AnchorX','playCancel','initialize','NoAutoClickTrigger','checkButtonTriggerEventStringTags','setupButtonTriggerEventSettings','NoSealMovement','findTargetSprite','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','Spotlight','setupStartingMapEvent','prototype','round','Settings','code','anchor','dir4','hasSealedMovement','Game_System_initialize','events','screenX','note','isMenuEnabled','onMapTouch','list','Spriteset_Map_update','onButtonTriggerEventSpotlightOk','moveByInput','Opacity','addChild','bitmap','setButtonTriggerEventEnabled','Spriteset_Map_createLowerLayer','ARRAYNUM','indexOf','RegExp','isNearThePlayerScreen','includes','control','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','name','Game_Event_hasClickTrigger','pageup'];_0x42ca=function(){return _0x121c58;};return _0x42ca();}VisuMZ[label][_0x113de4(0xfc)]=VisuMZ[label][_0x113de4(0xfc)]||{},VisuMZ[_0x113de4(0xd6)]=function(_0x1ef44c,_0x190449){const _0x53cff5=_0x113de4;for(const _0x14e93d in _0x190449){if(_0x14e93d[_0x53cff5(0x13b)](/(.*):(.*)/i)){const _0x12de2d=String(RegExp['$1']),_0x451f33=String(RegExp['$2'])[_0x53cff5(0xe8)]()['trim']();let _0x33b486,_0x30dbc7,_0x366e17;switch(_0x451f33){case _0x53cff5(0x174):_0x33b486=_0x190449[_0x14e93d]!==''?Number(_0x190449[_0x14e93d]):0x0;break;case _0x53cff5(0x110):_0x30dbc7=_0x190449[_0x14e93d]!==''?JSON['parse'](_0x190449[_0x14e93d]):[],_0x33b486=_0x30dbc7[_0x53cff5(0x15f)](_0x529952=>Number(_0x529952));break;case'EVAL':_0x33b486=_0x190449[_0x14e93d]!==''?eval(_0x190449[_0x14e93d]):null;break;case'ARRAYEVAL':_0x30dbc7=_0x190449[_0x14e93d]!==''?JSON[_0x53cff5(0xd0)](_0x190449[_0x14e93d]):[],_0x33b486=_0x30dbc7[_0x53cff5(0x15f)](_0x2258ee=>eval(_0x2258ee));break;case _0x53cff5(0x11e):_0x33b486=_0x190449[_0x14e93d]!==''?JSON[_0x53cff5(0xd0)](_0x190449[_0x14e93d]):'';break;case _0x53cff5(0x180):_0x30dbc7=_0x190449[_0x14e93d]!==''?JSON[_0x53cff5(0xd0)](_0x190449[_0x14e93d]):[],_0x33b486=_0x30dbc7[_0x53cff5(0x15f)](_0x404dcc=>JSON['parse'](_0x404dcc));break;case _0x53cff5(0x172):_0x33b486=_0x190449[_0x14e93d]!==''?new Function(JSON[_0x53cff5(0xd0)](_0x190449[_0x14e93d])):new Function('return\x200');break;case _0x53cff5(0x188):_0x30dbc7=_0x190449[_0x14e93d]!==''?JSON[_0x53cff5(0xd0)](_0x190449[_0x14e93d]):[],_0x33b486=_0x30dbc7[_0x53cff5(0x15f)](_0x4b020d=>new Function(JSON[_0x53cff5(0xd0)](_0x4b020d)));break;case _0x53cff5(0x169):_0x33b486=_0x190449[_0x14e93d]!==''?String(_0x190449[_0x14e93d]):'';break;case _0x53cff5(0xdb):_0x30dbc7=_0x190449[_0x14e93d]!==''?JSON[_0x53cff5(0xd0)](_0x190449[_0x14e93d]):[],_0x33b486=_0x30dbc7[_0x53cff5(0x15f)](_0x407f7d=>String(_0x407f7d));break;case _0x53cff5(0x130):_0x366e17=_0x190449[_0x14e93d]!==''?JSON['parse'](_0x190449[_0x14e93d]):{},_0x33b486=VisuMZ[_0x53cff5(0xd6)]({},_0x366e17);break;case _0x53cff5(0x147):_0x30dbc7=_0x190449[_0x14e93d]!==''?JSON[_0x53cff5(0xd0)](_0x190449[_0x14e93d]):[],_0x33b486=_0x30dbc7[_0x53cff5(0x15f)](_0x1bc719=>VisuMZ[_0x53cff5(0xd6)]({},JSON['parse'](_0x1bc719)));break;default:continue;}_0x1ef44c[_0x12de2d]=_0x33b486;}}return _0x1ef44c;},(_0x11fa4a=>{const _0x4168dd=_0x113de4,_0x521bef=_0x11fa4a[_0x4168dd(0x117)];for(const _0x9134 of dependencies){if(!Imported[_0x9134]){alert('%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.'[_0x4168dd(0x181)](_0x521bef,_0x9134)),SceneManager[_0x4168dd(0xe9)]();break;}}const _0xeda40b=_0x11fa4a[_0x4168dd(0xeb)];if(_0xeda40b[_0x4168dd(0x13b)](/\[Version[ ](.*?)\]/i)){const _0x4ef0b9=Number(RegExp['$1']);_0x4ef0b9!==VisuMZ[label][_0x4168dd(0xe6)]&&(alert(_0x4168dd(0x116)[_0x4168dd(0x181)](_0x521bef,_0x4ef0b9)),SceneManager[_0x4168dd(0xe9)]());}if(_0xeda40b['match'](/\[Tier[ ](\d+)\]/i)){const _0x3ddb9e=Number(RegExp['$1']);_0x3ddb9e<tier?(alert(_0x4168dd(0xf7)[_0x4168dd(0x181)](_0x521bef,_0x3ddb9e,tier)),SceneManager[_0x4168dd(0xe9)]()):tier=Math[_0x4168dd(0x141)](_0x3ddb9e,tier);}VisuMZ[_0x4168dd(0xd6)](VisuMZ[label][_0x4168dd(0xfc)],_0x11fa4a[_0x4168dd(0x139)]);})(pluginData),VisuMZ[_0x113de4(0xd1)][_0x113de4(0x112)]={'TriggerButtons':/<TRIGGER (?:BUTTON|BUTTONS):[ ](.*?)>/gi,'NoAutoTriggerIcon':/<NO AUTO TRIGGER ICON>/i,'NoAutoClickTrigger':/<NO AUTO CLICK TRIGGER>/i,'SealMovement':/<(?:SEAL|SEALED) INPUT (?:MOVE|MOVEMENT)>/i,'NoSealMovement':/<NO (?:SEAL|SEALED) INPUT (?:MOVE|MOVEMENT)>/i},VisuMZ['ButtonTriggerEvts'][_0x113de4(0x166)]=Scene_Boot[_0x113de4(0xfa)][_0x113de4(0x126)],Scene_Boot[_0x113de4(0xfa)]['loadSystemImages']=function(){const _0x14ffa7=_0x113de4;VisuMZ['ButtonTriggerEvts']['Scene_Boot_loadSystemImages'][_0x14ffa7(0x16f)](this),ImageManager['buttonTriggerEventSpotlight']();},PluginManager[_0x113de4(0x148)](pluginData[_0x113de4(0x117)],_0x113de4(0x16e),_0x14ba89=>{const _0x3e359d=_0x113de4;VisuMZ[_0x3e359d(0xd6)](_0x14ba89,_0x14ba89),$gameSystem['setButtonTriggerEventEnabled'](_0x14ba89[_0x3e359d(0x14b)]);}),ImageManager[_0x113de4(0x13c)]=function(){const _0x49692b=_0x113de4;if(this['_cached_ButtonTriggerEvts_Spotlight'])return this['_cached_ButtonTriggerEvts_Spotlight'];const _0x4598d4=Math[_0x49692b(0x15e)]($dataSystem[_0x49692b(0x182)][_0x49692b(0xe5)]*2.5),_0x44534c=Math[_0x49692b(0x15e)]($dataSystem[_0x49692b(0x182)][_0x49692b(0x133)]*2.5),_0x4d12cb=new Bitmap(_0x4598d4,_0x44534c),_0x526a6a=Spriteset_Map[_0x49692b(0xd2)];return _0x4d12cb['fillRect'](0x0,0x0,_0x4598d4,_0x44534c,_0x49692b(0x121)),_0x4d12cb[_0x49692b(0x11f)](_0x4598d4/0x2,_0x44534c/0x2,_0x526a6a[_0x49692b(0xd3)],_0x49692b(0x18e)),_0x4d12cb[_0x49692b(0x163)]=![],this[_0x49692b(0x17c)]=_0x4d12cb,this['_cached_ButtonTriggerEvts_Spotlight'];},SceneManager[_0x113de4(0x129)]=function(){const _0x2d304c=_0x113de4;return this['_scene']&&this[_0x2d304c(0x179)][_0x2d304c(0xd7)]===Scene_Map;},VisuMZ[_0x113de4(0xd1)][_0x113de4(0x101)]=Game_System['prototype'][_0x113de4(0xf1)],Game_System[_0x113de4(0xfa)]['initialize']=function(){const _0x1c26e0=_0x113de4;VisuMZ['ButtonTriggerEvts'][_0x1c26e0(0x101)][_0x1c26e0(0x16f)](this),this[_0x1c26e0(0x138)]();},Game_System['prototype']['initButtonTriggerEventSettings']=function(){const _0x1f29f1=_0x113de4;this[_0x1f29f1(0x120)]=!![];},Game_System[_0x113de4(0xfa)]['isButtonTriggerEventEnabled']=function(){const _0x19d9dd=_0x113de4;return this[_0x19d9dd(0x120)]===undefined&&this['initButtonTriggerEventSettings'](),this[_0x19d9dd(0x120)];},Game_System[_0x113de4(0xfa)][_0x113de4(0x10e)]=function(_0xbac532){const _0x37de5c=_0x113de4;this[_0x37de5c(0x120)]===undefined&&this[_0x37de5c(0x138)](),this[_0x37de5c(0x120)]=_0xbac532;},Game_Map[_0x113de4(0x14e)]=VisuMZ[_0x113de4(0xd1)]['Settings'][_0x113de4(0x167)]['AutoSealedMovement'],Game_Map[_0x113de4(0xfa)][_0x113de4(0x100)]=function(){const _0x1599fc=_0x113de4,_0x13a001=VisuMZ[_0x1599fc(0xd1)][_0x1599fc(0x112)],_0x4b15a=($dataMap?$dataMap[_0x1599fc(0x104)]:'')||'';if(_0x4b15a[_0x1599fc(0x13b)](_0x13a001[_0x1599fc(0x143)]))return!![];else{if(_0x4b15a[_0x1599fc(0x13b)](_0x13a001[_0x1599fc(0xf5)]))return![];}return Game_Map['BUTTON_TRIGGER_EVENTS_DEFAULT_SEALED_MOVEMENT'];},Game_Map[_0x113de4(0xfa)][_0x113de4(0x151)]=function(_0x621cbb){const _0xa48952=_0x113de4;for(const _0x557508 of this[_0xa48952(0x102)]()){if(!_0x557508)continue;if(_0x557508[_0xa48952(0x12f)](_0x621cbb))return!![];}return![];},Game_Map[_0x113de4(0xfa)]['setupEventButtonTrigger']=function(_0x3608ec){const _0x3f04f=_0x113de4,_0xbf02a0=this['events']()['filter'](_0x199682=>_0x199682&&_0x199682[_0x3f04f(0x12f)](_0x3608ec));if(_0xbf02a0['length']<=0x0)return;else{if(_0xbf02a0[_0x3f04f(0x15a)]===0x1)this['setupEventButtonTriggerEventList'](_0xbf02a0);else{if(_0xbf02a0[_0x3f04f(0x15a)]>0x1){const _0x5b1cea=_0xbf02a0['filter'](_0xc35c64=>_0xc35c64[_0x3f04f(0x113)]());_0x5b1cea[_0x3f04f(0x15a)]===0x0?this[_0x3f04f(0x15b)](_0xbf02a0):this[_0x3f04f(0x146)](_0x5b1cea);}}}},Game_Map[_0x113de4(0xfa)][_0x113de4(0x15b)]=function(_0x269b32){const _0xe2d37f=_0x113de4,_0x1396f5=_0x269b32[0x0];_0x1396f5[_0xe2d37f(0x17b)](),this[_0xe2d37f(0xf9)]();},Game_Map[_0x113de4(0xfa)][_0x113de4(0x17d)]=function(){const _0x285d17=_0x113de4;this[_0x285d17(0x17f)]=undefined,Input[_0x285d17(0x154)]();},Game_Map[_0x113de4(0xfa)][_0x113de4(0x146)]=function(_0xb5b377){const _0x562dd6=_0x113de4;$gameTemp[_0x562dd6(0xcd)]=$gameTemp[_0x562dd6(0xcd)]||[],$gameTemp[_0x562dd6(0xcd)][_0x562dd6(0xdf)]()!==_0xb5b377[_0x562dd6(0x15f)](_0x4ac254=>_0x4ac254[_0x562dd6(0x171)]())[_0x562dd6(0xdf)]()&&(this['_buttonTriggerEventTargetIndex']=0x0),$gameTemp['_lastButtonTriggerEvents']=_0xb5b377[_0x562dd6(0x15f)](_0x159ad0=>_0x159ad0[_0x562dd6(0x171)]()),this['_buttonTriggerEventTargets']=_0xb5b377,this[_0x562dd6(0x127)]=this['_buttonTriggerEventTargetIndex']||0x0;},Game_Map[_0x113de4(0xfa)][_0x113de4(0x149)]=function(){const _0x5b6489=_0x113de4;return this[_0x5b6489(0x17f)]&&this[_0x5b6489(0x17f)]['length']>0x0;},Game_Map[_0x113de4(0xfa)][_0x113de4(0x145)]=function(){const _0x215ed7=_0x113de4;if(this[_0x215ed7(0x17f)]){const _0x35ca6f=this['_buttonTriggerEventTargetIndex'];return this[_0x215ed7(0x17f)][_0x35ca6f];}return null;},Game_Map['prototype'][_0x113de4(0x175)]=function(){const _0x26b902=_0x113de4;if(Input[_0x26b902(0x12c)]('cancel'))SoundManager[_0x26b902(0xf0)](),this[_0x26b902(0x17d)]();else{if(Input[_0x26b902(0x12c)]('ok'))this[_0x26b902(0x109)]();else(Input['isRepeated']('down')||Input[_0x26b902(0xec)]('up')||Input[_0x26b902(0xec)](_0x26b902(0x132))||Input[_0x26b902(0xec)]('right'))&&this[_0x26b902(0x161)]();}},Game_Map['prototype'][_0x113de4(0x109)]=function(){const _0x2024ce=_0x113de4,_0x3a37c9=this[_0x2024ce(0x145)]();_0x3a37c9&&(_0x3a37c9['start'](),this[_0x2024ce(0xf9)]()),this[_0x2024ce(0x17d)]();},Game_Map[_0x113de4(0xfa)][_0x113de4(0x161)]=function(){const _0x32b770=_0x113de4,_0x844a39=this[_0x32b770(0x127)];this[_0x32b770(0x134)](Input[_0x32b770(0xff)]),this[_0x32b770(0x127)]!==_0x844a39&&SoundManager[_0x32b770(0x140)]();},Game_Map[_0x113de4(0xfa)][_0x113de4(0x134)]=function(_0x2ff6bd){const _0x5d89dc=_0x113de4;Input[_0x5d89dc(0x154)]();const _0x225228=this[_0x5d89dc(0x17f)],_0x5062a9=this['getSelectedButtonTriggerEvent']();let _0x25266a=[];if(!_0x5062a9){this['_buttonTriggerEventTargets'][_0x5d89dc(0x16d)](null)[_0x5d89dc(0x16d)](undefined),this['_buttonTriggerEventTargetIndex']=0x0;return;}(_0x2ff6bd===0x2||_0x2ff6bd===0x8)&&(_0x2ff6bd===0x2?_0x25266a=_0x225228[_0x5d89dc(0x16b)](_0x339a41=>_0x339a41&&_0x339a41['y']>_0x5062a9['y']):_0x25266a=_0x225228[_0x5d89dc(0x16b)](_0x429630=>_0x429630&&_0x429630['y']<_0x5062a9['y']),_0x25266a[_0x5d89dc(0x15a)]>0x0&&_0x25266a[_0x5d89dc(0x144)]((_0x1e1515,_0x56ce18)=>{const _0x1a29b2=_0x5d89dc,_0x4e8228=Math[_0x1a29b2(0xe4)](_0x5062a9['y']-_0x1e1515['y']),_0x546bf9=Math[_0x1a29b2(0xe4)](_0x5062a9['y']-_0x56ce18['y']);if(_0x4e8228!==_0x546bf9)return _0x4e8228-_0x546bf9;const _0x35b24f=Math[_0x1a29b2(0xe4)](this[_0x1a29b2(0x170)](_0x5062a9['x'],_0x5062a9['y'],_0x1e1515['x'],_0x1e1515['y'])),_0x3c8250=Math[_0x1a29b2(0xe4)](this['distance'](_0x5062a9['x'],_0x5062a9['y'],_0x56ce18['x'],_0x56ce18['y']));if(_0x35b24f!==_0x3c8250)return _0x35b24f-_0x3c8250;return _0x1e1515[_0x1a29b2(0x171)]()-_0x56ce18[_0x1a29b2(0x171)]();}));(_0x2ff6bd===0x4||_0x2ff6bd===0x6)&&(_0x2ff6bd===0x4?_0x25266a=_0x225228[_0x5d89dc(0x16b)](_0x4211ec=>_0x4211ec&&_0x4211ec['x']<_0x5062a9['x']):_0x25266a=_0x225228[_0x5d89dc(0x16b)](_0xa2ab5e=>_0xa2ab5e&&_0xa2ab5e['x']>_0x5062a9['x']),_0x25266a['length']>0x0&&_0x25266a[_0x5d89dc(0x144)]((_0x2c9c92,_0x260afc)=>{const _0x4ee533=_0x5d89dc,_0x279393=Math[_0x4ee533(0xe4)](_0x5062a9['x']-_0x2c9c92['x']),_0x510888=Math[_0x4ee533(0xe4)](_0x5062a9['x']-_0x260afc['x']);if(_0x279393!==_0x510888)return _0x279393-_0x510888;const _0x5056cf=Math['abs'](this[_0x4ee533(0x170)](_0x5062a9['x'],_0x5062a9['y'],_0x2c9c92['x'],_0x2c9c92['y'])),_0x2f6f89=Math[_0x4ee533(0xe4)](this[_0x4ee533(0x170)](_0x5062a9['x'],_0x5062a9['y'],_0x260afc['x'],_0x260afc['y']));if(_0x5056cf!==_0x2f6f89)return _0x5056cf-_0x2f6f89;return _0x2c9c92[_0x4ee533(0x171)]()-_0x260afc[_0x4ee533(0x171)]();}));if(_0x25266a[_0x5d89dc(0x15a)]>0x0){const _0x540911=_0x25266a[0x0];this['_buttonTriggerEventTargetIndex']=_0x225228[_0x5d89dc(0x111)](_0x540911);}},VisuMZ['ButtonTriggerEvts'][_0x113de4(0xea)]=Game_CharacterBase['prototype'][_0x113de4(0x176)],Game_CharacterBase['prototype'][_0x113de4(0x176)]=function(){const _0x39f1a7=_0x113de4;if($gameMap&&$gameMap['isButtonTriggerEventSpotlightMode']())return;VisuMZ[_0x39f1a7(0xd1)][_0x39f1a7(0xea)][_0x39f1a7(0x16f)](this);},VisuMZ[_0x113de4(0xd1)][_0x113de4(0x15c)]=Game_Event[_0x113de4(0xfa)][_0x113de4(0x187)],Game_Event[_0x113de4(0xfa)]['updateSelfMovement']=function(){const _0x36a62f=_0x113de4;if($gameMap&&$gameMap['isButtonTriggerEventSpotlightMode']())return;VisuMZ[_0x36a62f(0xd1)][_0x36a62f(0x15c)]['call'](this);},Game_Event[_0x113de4(0xfa)]['isNearThePlayerScreen']=function(){const _0x5b43af=_0x113de4,_0x76843b=Math['ceil'](Graphics['width']/0x2/$gameMap[_0x5b43af(0x18b)]()),_0x38ad9f=Math[_0x5b43af(0x15e)](Graphics[_0x5b43af(0x160)]/0x2/$gameMap[_0x5b43af(0xda)]()),_0x20ac9a=Math['abs'](this[_0x5b43af(0xce)]($gamePlayer['x'])),_0xe50a55=Math[_0x5b43af(0xe4)](this['deltaYFrom']($gamePlayer['y']));return _0x20ac9a<_0x76843b&&_0xe50a55<_0x38ad9f;},VisuMZ[_0x113de4(0xd1)][_0x113de4(0x11c)]=Game_Player[_0x113de4(0xfa)][_0x113de4(0x10a)],Game_Player[_0x113de4(0xfa)][_0x113de4(0x10a)]=function(){const _0x5c13bc=_0x113de4;if(Imported[_0x5c13bc(0x11a)]){if($gameMap&&$gameMap[_0x5c13bc(0xcf)]()){VisuMZ['ButtonTriggerEvts'][_0x5c13bc(0x11c)][_0x5c13bc(0x16f)](this);return;}}if($gameMap&&$gameMap[_0x5c13bc(0x149)]()){$gameMap[_0x5c13bc(0x175)]();return;}if(!this[_0x5c13bc(0xd8)]()&&this['canMove']()){if(this[_0x5c13bc(0x186)]())return!![];}if($gameMap&&$gameMap[_0x5c13bc(0x100)]())return;VisuMZ[_0x5c13bc(0xd1)][_0x5c13bc(0x11c)][_0x5c13bc(0x16f)](this);},Game_Player[_0x113de4(0xfa)][_0x113de4(0x186)]=function(){const _0x7543a6=_0x113de4;if(!$gameSystem['isButtonTriggerEventEnabled']())return![];if(!this[_0x7543a6(0x153)]())return![];if(!SceneManager['isSceneMap']())return![];const _0x41d715=[_0x7543a6(0xe3),_0x7543a6(0x132),_0x7543a6(0x14a),'up','ok','cancel',_0x7543a6(0x119),_0x7543a6(0x159),_0x7543a6(0x115),_0x7543a6(0x164),_0x7543a6(0xe1)];for(let _0x38eac3 of _0x41d715){if(Input['isTriggered'](_0x38eac3)&&$gameMap[_0x7543a6(0x151)](_0x38eac3))return $gameMap[_0x7543a6(0x185)](_0x38eac3),!![];}return![];},VisuMZ[_0x113de4(0xd1)]['Game_Player_canStartLocalEvents']=Game_Player[_0x113de4(0xfa)][_0x113de4(0x153)],Game_Player[_0x113de4(0xfa)]['canStartLocalEvents']=function(){const _0x59298a=_0x113de4;if($gameMap&&$gameMap[_0x59298a(0x149)]())return![];return VisuMZ[_0x59298a(0xd1)]['Game_Player_canStartLocalEvents'][_0x59298a(0x16f)](this);},Game_Event['BUTTON_TRIGGER_AUTO_CLICK_TRIGGER']=VisuMZ[_0x113de4(0xd1)][_0x113de4(0xfc)][_0x113de4(0x167)][_0x113de4(0x142)];;VisuMZ['ButtonTriggerEvts'][_0x113de4(0x12a)]=Game_Event[_0x113de4(0xfa)][_0x113de4(0x123)],Game_Event[_0x113de4(0xfa)][_0x113de4(0x123)]=function(){const _0x1867e1=_0x113de4;VisuMZ[_0x1867e1(0xd1)][_0x1867e1(0x12a)]['call'](this),this[_0x1867e1(0x138)]();},Game_Event[_0x113de4(0xfa)][_0x113de4(0x138)]=function(){const _0x25f1e4=_0x113de4;this[_0x25f1e4(0x155)]=[],this[_0x25f1e4(0x178)]=!![],this[_0x25f1e4(0xcb)]=![];},VisuMZ[_0x113de4(0xd1)][_0x113de4(0x16c)]=Game_Event[_0x113de4(0xfa)][_0x113de4(0x128)],Game_Event[_0x113de4(0xfa)]['setupPageSettings']=function(){const _0x402815=_0x113de4;VisuMZ[_0x402815(0xd1)][_0x402815(0x16c)]['call'](this),this[_0x402815(0xf4)]();},Game_Event[_0x113de4(0xfa)][_0x113de4(0xf4)]=function(){const _0x4898ef=_0x113de4;if(!this['event']())return;this[_0x4898ef(0x138)](),this[_0x4898ef(0x168)](),this['setupButtonTriggerEventCommentTags']();},Game_Event[_0x113de4(0xfa)][_0x113de4(0x168)]=function(){const _0x49e6ef=_0x113de4;if(!this['event']())return;const _0x4e750e=this[_0x49e6ef(0xee)]()['note'];if(_0x4e750e==='')return;this[_0x49e6ef(0xf3)](_0x4e750e);},Game_Event[_0x113de4(0xfa)][_0x113de4(0x18c)]=function(){const _0x217f6f=_0x113de4;if(!this[_0x217f6f(0xee)]())return;if(!this['page']())return;const _0x3a9cab=this[_0x217f6f(0x107)]();let _0x25ad4a='';for(const _0x1b4527 of _0x3a9cab){if([0x6c,0x198][_0x217f6f(0x114)](_0x1b4527[_0x217f6f(0xfd)])){if(_0x25ad4a!=='')_0x25ad4a+='\x0a';_0x25ad4a+=_0x1b4527['parameters'][0x0];}}this[_0x217f6f(0xf3)](_0x25ad4a);},Game_Event[_0x113de4(0xfa)][_0x113de4(0xf3)]=function(_0x5b7643){const _0x5d388a=_0x113de4,_0x158a97=VisuMZ[_0x5d388a(0xd1)][_0x5d388a(0x112)],_0x109bb8=_0x5b7643[_0x5d388a(0x13b)](_0x158a97[_0x5d388a(0x18a)]);if(_0x109bb8)for(const _0x378c2e of _0x109bb8){_0x378c2e[_0x5d388a(0x13b)](_0x158a97[_0x5d388a(0x18a)]);const _0x20bb96=String(RegExp['$1'])[_0x5d388a(0x152)](',')[_0x5d388a(0x15f)](_0x5b1dfc=>_0x5b1dfc[_0x5d388a(0x14f)]()[_0x5d388a(0x12e)]());this[_0x5d388a(0x155)]=this['_triggerButtonKeys']||[];for(const _0x549e83 of _0x20bb96){!this['_triggerButtonKeys'][_0x5d388a(0x114)](_0x549e83)&&this[_0x5d388a(0x155)][_0x5d388a(0xcc)](_0x549e83);}}_0x5b7643[_0x5d388a(0x13b)](_0x158a97[_0x5d388a(0x14d)])&&(this[_0x5d388a(0x178)]=![]),_0x5b7643[_0x5d388a(0x13b)](_0x158a97[_0x5d388a(0xf2)])&&(this[_0x5d388a(0xcb)]=!![]);},Game_Event[_0x113de4(0xfa)][_0x113de4(0x12f)]=function(_0x51dc7e){const _0xbefccf=_0x113de4;if(!this[_0xbefccf(0x189)]([0x0,0x1,0x2]))return![];return _0x51dc7e=_0x51dc7e||'',this['_triggerButtonKeys']=this['_triggerButtonKeys']||[],this['_triggerButtonKeys'][_0xbefccf(0x114)](_0x51dc7e[_0xbefccf(0x14f)]()[_0xbefccf(0x12e)]());},VisuMZ[_0x113de4(0xd1)][_0x113de4(0x118)]=Game_Event[_0x113de4(0xfa)][_0x113de4(0xde)],Game_Event[_0x113de4(0xfa)][_0x113de4(0xde)]=function(){const _0x1f14ac=_0x113de4;if(this[_0x1f14ac(0xe0)])return![];if(Game_Event['BUTTON_TRIGGER_AUTO_CLICK_TRIGGER']&&this[_0x1f14ac(0x155)]&&this[_0x1f14ac(0x155)][_0x1f14ac(0x15a)]>0x0)return this[_0x1f14ac(0xcb)]?![]:!![];return VisuMZ['ButtonTriggerEvts'][_0x1f14ac(0x118)]['call'](this);},VisuMZ[_0x113de4(0xd1)][_0x113de4(0x11d)]=Scene_Map[_0x113de4(0xfa)][_0x113de4(0x165)],Scene_Map[_0x113de4(0xfa)]['isSceneChangeOk']=function(){const _0x313ca3=_0x113de4;if($gameMap[_0x313ca3(0x149)]())return![];return VisuMZ[_0x313ca3(0xd1)]['Scene_Map_isSceneChangeOk']['call'](this);},VisuMZ['ButtonTriggerEvts'][_0x113de4(0x135)]=Scene_Map[_0x113de4(0xfa)][_0x113de4(0x106)],Scene_Map[_0x113de4(0xfa)][_0x113de4(0x106)]=function(){const _0x2f4a04=_0x113de4;$gameMap['isButtonTriggerEventSpotlightMode']()&&$gameMap[_0x2f4a04(0x17d)](),VisuMZ[_0x2f4a04(0xd1)][_0x2f4a04(0x135)][_0x2f4a04(0x16f)](this);},VisuMZ[_0x113de4(0xd1)]['Scene_Map_isMenuEnabled']=Scene_Map['prototype'][_0x113de4(0x105)],Scene_Map['prototype'][_0x113de4(0x105)]=function(){const _0x438498=_0x113de4;if($gameMap[_0x438498(0x149)]())return![];return VisuMZ[_0x438498(0xd1)][_0x438498(0xd4)][_0x438498(0x16f)](this);},VisuMZ[_0x113de4(0xd1)][_0x113de4(0x12b)]=Sprite_Character[_0x113de4(0xfa)][_0x113de4(0x183)],Sprite_Character['prototype']['isAllowCharacterTilt']=function(){const _0x261d99=_0x113de4;if($gameMap&&$gameMap[_0x261d99(0x149)]())return![];if($gameMap&&$gameMap[_0x261d99(0x100)]())return![];return VisuMZ[_0x261d99(0xd1)]['Sprite_Character_isAllowCharacterTilt'][_0x261d99(0x16f)](this);},VisuMZ[_0x113de4(0xd1)][_0x113de4(0x13d)]=Sprite_Character[_0x113de4(0xfa)]['getEventIconIndex'],Sprite_Character[_0x113de4(0xfa)][_0x113de4(0x16a)]=function(){const _0x57a761=_0x113de4;let _0x41718d=VisuMZ['ButtonTriggerEvts'][_0x57a761(0x13d)][_0x57a761(0x16f)](this);if(_0x41718d>0x0)return _0x41718d;if(!this[_0x57a761(0xd5)])return _0x41718d;if(this[_0x57a761(0xd5)][_0x57a761(0xd7)][_0x57a761(0x117)]!=='Game_Event')return _0x41718d;if(!this[_0x57a761(0xd5)][_0x57a761(0x178)])return _0x41718d;return this[_0x57a761(0x162)](_0x41718d);},Sprite_Character['prototype'][_0x113de4(0x162)]=function(_0x162160){const _0x8d9a87=_0x113de4;this[_0x8d9a87(0xd5)][_0x8d9a87(0x155)]=this[_0x8d9a87(0xd5)][_0x8d9a87(0x155)]||[];if(this[_0x8d9a87(0xd5)][_0x8d9a87(0x155)][_0x8d9a87(0x15a)]>0x0){const _0x2e177c=VisuMZ['ButtonTriggerEvts'][_0x8d9a87(0xfc)][_0x8d9a87(0x167)],_0x78fe21=_0x8d9a87(0x173)[_0x8d9a87(0x181)](this[_0x8d9a87(0xd5)]['_triggerButtonKeys'][0x0][_0x8d9a87(0xe8)]()['trim']());_0x162160=_0x2e177c[_0x78fe21];}return _0x162160;},Spriteset_Map[_0x113de4(0xd2)]={'filename':VisuMZ[_0x113de4(0xd1)][_0x113de4(0xfc)][_0x113de4(0xf8)]['Filename']||'','customAnchorX':VisuMZ['ButtonTriggerEvts'][_0x113de4(0xfc)][_0x113de4(0xf8)][_0x113de4(0xef)]||0x0,'customAnchorY':VisuMZ[_0x113de4(0xd1)]['Settings'][_0x113de4(0xf8)][_0x113de4(0xe7)]||0x0,'customBlendMode':VisuMZ['ButtonTriggerEvts'][_0x113de4(0xfc)][_0x113de4(0xf8)]['BlendMode']||0x0,'radius':VisuMZ['ButtonTriggerEvts'][_0x113de4(0xfc)][_0x113de4(0xf8)][_0x113de4(0x125)]||0x1,'opacity':VisuMZ[_0x113de4(0xd1)][_0x113de4(0xfc)][_0x113de4(0xf8)][_0x113de4(0x10b)]||0x1,'fadeSpeed':VisuMZ[_0x113de4(0xd1)]['Settings'][_0x113de4(0xf8)]['FadeSpeed']||0x1},VisuMZ[_0x113de4(0xd1)]['Spriteset_Map_createLowerLayer']=Spriteset_Map[_0x113de4(0xfa)][_0x113de4(0x13e)],Spriteset_Map[_0x113de4(0xfa)][_0x113de4(0x13e)]=function(){const _0x414622=_0x113de4;VisuMZ[_0x414622(0xd1)][_0x414622(0x10f)][_0x414622(0x16f)](this),this[_0x414622(0x157)]();},Spriteset_Map[_0x113de4(0xfa)][_0x113de4(0x157)]=function(){const _0x58ccbb=_0x113de4,_0x41cb87=Spriteset_Map[_0x58ccbb(0xd2)],_0x939e45=new Sprite();_0x41cb87[_0x58ccbb(0xd9)]!==''?_0x939e45['bitmap']=ImageManager[_0x58ccbb(0x150)](_0x41cb87[_0x58ccbb(0xd9)]):_0x939e45[_0x58ccbb(0x10d)]=ImageManager[_0x58ccbb(0x13c)](),_0x939e45['opacity']=0x0,_0x41cb87[_0x58ccbb(0xd9)]!==''?(_0x939e45['anchor']['x']=_0x41cb87['customAnchorX'],_0x939e45[_0x58ccbb(0xfe)]['y']=_0x41cb87[_0x58ccbb(0xdc)],_0x939e45[_0x58ccbb(0x13f)]=_0x41cb87[_0x58ccbb(0x137)]):(_0x939e45['anchor']['x']=0.5,_0x939e45[_0x58ccbb(0xfe)]['y']=0.5,_0x939e45[_0x58ccbb(0x13f)]=0x2),this[_0x58ccbb(0x158)]=_0x939e45,this[_0x58ccbb(0x10c)](this[_0x58ccbb(0x158)]);},VisuMZ[_0x113de4(0xd1)][_0x113de4(0x108)]=Spriteset_Map['prototype'][_0x113de4(0x18d)],Spriteset_Map['prototype'][_0x113de4(0x18d)]=function(){const _0x16d430=_0x113de4;VisuMZ[_0x16d430(0xd1)][_0x16d430(0x108)][_0x16d430(0x16f)](this),this[_0x16d430(0x13a)]();},Spriteset_Map[_0x113de4(0xfa)][_0x113de4(0x13a)]=function(){const _0x1d6300=_0x113de4;this['updateButtonTriggerEventSpotlightOpacity'](),$gameMap[_0x1d6300(0x149)]()&&this[_0x1d6300(0x17e)]();},Spriteset_Map[_0x113de4(0xfa)][_0x113de4(0x184)]=function(){const _0x1ef3db=_0x113de4,_0x1746a6=this['_buttonTriggerEventSpotlightSprite'],_0x395073=Spriteset_Map[_0x1ef3db(0xd2)],_0x4ce081=$gameMap[_0x1ef3db(0x149)]()?_0x395073[_0x1ef3db(0x11b)]:0x0,_0x46f4b2=_0x395073[_0x1ef3db(0x177)];if(_0x1746a6&&_0x1746a6['opacity']!==_0x4ce081){if(_0x1746a6[_0x1ef3db(0x11b)]>_0x4ce081)_0x1746a6[_0x1ef3db(0x11b)]=Math[_0x1ef3db(0x141)](_0x1746a6[_0x1ef3db(0x11b)]-_0x46f4b2,_0x4ce081);else _0x1746a6['opacity']<_0x4ce081&&(_0x1746a6['opacity']=Math[_0x1ef3db(0x136)](_0x1746a6[_0x1ef3db(0x11b)]+_0x46f4b2,_0x4ce081));}},Spriteset_Map[_0x113de4(0xfa)][_0x113de4(0x17e)]=function(){const _0x1ea188=_0x113de4,_0x33abf8=this[_0x1ea188(0x158)];let _0x2fc39a=this[_0x1ea188(0xf6)]($gamePlayer);const _0x1a45e7=$gameMap[_0x1ea188(0x145)]();_0x1a45e7&&(_0x2fc39a=this[_0x1ea188(0xf6)](_0x1a45e7)),_0x33abf8['x']=_0x2fc39a['_character'][_0x1ea188(0x103)](),_0x33abf8['y']=_0x2fc39a['_character']['screenY']()-Math[_0x1ea188(0xfb)](_0x2fc39a[_0x1ea188(0x160)]/0x2);};