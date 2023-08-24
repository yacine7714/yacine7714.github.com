//=============================================================================
// VisuStella MZ - Core Engine
// VisuMZ_0_CoreEngine.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_0_CoreEngine = true;

var VisuMZ = VisuMZ || {};
VisuMZ.CoreEngine = VisuMZ.CoreEngine || {};
VisuMZ.CoreEngine.version = 1.52;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 0] [Version 1.52] [CoreEngine]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Core_Engine_VisuStella_MZ
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Core Engine plugin is designed to fix any bugs that may have slipped
 * past RPG Maker MZ's source code and to give game devs more control over
 * RPG Maker MZ's various features, ranging from mechanics to aesthetics to
 * quality of life improvements.
 *
 * Features include all (but not limited to) the following:
 *
 * * Bug fixes for the problems existing in the RPG Maker MZ base code.
 * * Failsafes added for Script Call related event commands.
 * * Lots of Quality of Life Settings that can be activated through the
 *   Plugin Parameters.
 * * Control over the various Text Colors used throughout the game.
 * * Change up the maximum amount of gold carried, give it an icon attached to
 *   the label, and include text for overlap specifics.
 * * Preload images as the game boots up.
 * * Add specific background images for menus found throughout the game.
 * * A button assist window will appear at the top or bottom of the screen,
 *   detailing which buttons do what when inside a menu. This feature can be
 *   turned off.
 * * Choose which in-game battler parameters to display inside menus (ie ATK,
 *   DEF, AGI, etc.) and determine their maximum values, along with plenty of
 *   notetags to give more control over parameter, x-parameter, s-parameter
 *   bonuses through equipment, states, and other trait objects.
 * * Control over how the UI objects appear (such as the menu button, cancel
 *   button, left/right actor switch buttons).
 * * Reposition actors and enemies if the battle resolution is larger.
 * * Allow class names and nicknames to support text codes when displayed.
 * * Determine how windows behave in the game, if they will mask other windows,
 *   their line height properties, and more.
 *
 * ============================================================================
 * Requirements
 * ============================================================================
 *
 * This plugin is made for RPG Maker MZ. This will not work in other iterations
 * of RPG Maker.
 *
 * ------ Tier 0 ------
 *
 * This plugin is a Tier 0 plugin. Place it under other plugins of lower tier
 * value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
 * that your plugins will have the best compatibility with the rest of the
 * VisuStella MZ Plugin library.
 *
 * ============================================================================
 * Important Changes: Bug Fixes
 * ============================================================================
 *
 * This plugin also serves to fix various bugs found in RPG Maker MZ that have
 * been unaddressed or not yet taken care of. The following is a list of bugs
 * that have been fixed by this plugin:
 *
 * ---
 *
 * Attack Skill Trait
 *
 * Enemies are unaffected by the Attack Skill Trait. This means if they have
 * an Attack action, they will always use Attack over and over even if their
 * Attack Skill Trait has been changed. This plugin will change it up so that
 * the Attack skill will comply with whatever their Attack Skill Trait's skill
 * is set to.
 *
 * ---
 *
 * Auto Battle Actor Skill Usage
 *
 * If an actor with Auto Battle has access to a skill but not have any access
 * to that skill's type, that actor will still be able to use the skill during
 * Auto Battle despite the fact that the actor cannot use that skill during
 * manual input.
 *
 * ---
 * 
 * Auto Battle Attack Seal Bypass
 * 
 * By default, if the attack skill is sealed via a trait and an actor has
 * auto-battle, the action can still be used via auto-battle. This is now fixed
 * and actors should not be able to attack via auto-battle if their attack
 * ability is sealed.
 * 
 * ---
 * 
 * Auto Battle Lock Up
 * 
 * If an auto battle Actor fights against an enemy whose DEF/MDF is too high,
 * they will not use any actions at all. This can cause potential game freezing
 * and softlocks. This plugin will change that and have them default to a
 * regular Attack.
 * 
 * ---
 * 
 * Gamepad Repeat Input
 * 
 * Cleared inputs on gamepads do not have a downtime and will trigger the
 * following input frame. The causes problems with certain RPG Maker MZ menus
 * where the inputs have to be cleared as the next immediate frame will have
 * them inputted again. This plugin changes it so that whenever inputs are
 * cleared, there is a downtime equal to the keyboard clear frames before the
 * gamepad input is registered once more.
 * 
 * ---
 * 
 * Invisible Battle Sprites
 * 
 * If you removed a party member during battle and added that exact party
 * member back into the same slot, their sprite would appear invisible. The
 * VisuStella Core Engine will fix this problem and prevent it from happening.
 * 
 * ---
 * 
 * Instant Text Discrepancy for Window_Message
 * 
 * Window_Message displays text differently when it draws letters one by one
 * versus when the text is displayed instantly. This isn't noticeable with the
 * default font, but it's very visible when using something like Arial. The
 * error is due to Bitmap.measureTextWidth yielding a rounded value per letter
 * versus per word. The Core Engine will provide a bug fix that will single out
 * the cause and make it so that only Window_Message will not utilize any round
 * number values when determining the width of each letter, whether or not it
 * is shown instantly. This change will only affect Window_Message and not any
 * other window in order to prevent unintended side effects.
 * 
 * This can be disabled through the Plugin Parameters:
 * 
 * Plugin Parameters > QoL Settings > Misc > Font Width Fix
 * 
 * ---
 *
 * Move Picture, Origin Differences
 *
 * If a Show Picture event command is made with an Origin setting of
 * "Upper Left" and a Move Picture event command is made afterwards with an
 * Origin setting of "Center", RPG Maker MZ would originally have it instantly
 * jump into the new origin setting without making a clean transition between
 * them. This plugin will create that clean transition between origins.
 *
 * ---
 * 
 * Status Window Name Vertical Cutoffs
 * 
 * In the battle status windows, whenever actor names are displayed, the bitmap
 * used to display their name text do not extend vertically all the way,
 * causing letters like lowercase "Q" and "G" to be cut off, making them hard
 * to distinguish from one another. The Core Engine will remedy this by
 * extending the bitmap to allow enough room. Fix made by Irina.
 * 
 * ---
 * 
 * Termination Clear Effects
 * 
 * In RPG Maker MZ, requesting an animation while transitioning between
 * scenes, such as going from the map scene to the battle scene, can cause
 * crashes. This is because the animation queue does not take off immediately
 * and will likely register incorrect targets for the scene. This plugin will
 * forcefully clear any registered animations and balloon effects when
 * terminating a scene in order to prevent crashes.
 * 
 * ---
 * 
 * Timer Sprite
 * 
 * By default, RPG Maker MZ adds Sprite_Timer into its spriteset, either for
 * maps or for battles. There is one major problem with this: when spritesets
 * are affected by filters, zooms, and/or blurs, this hinders how readable the
 * timer sprite is, making the information perceived by the player to be much
 * harder than it needs to be. The Core Engine adds the sprite to the parent
 * scene instead of the spriteset to ensure it's unobscured by anything else.
 * 
 * ---
 * 
 * Unusable Battle Items
 * 
 * If any party member is able to use an item in battle, then all party members
 * are able to use said item, even if that party member is supposed to be
 * unable to use that item. This is now changed so that battle items are
 * checked on an individual basis and not on a party-wide basis.
 * 
 * ---
 * 
 * Window Arrows Sprite Tearing
 * 
 * If a window object in RPG Maker MZ were to have an odd number for width size
 * then the arrow elements found for the window would be positioned on a half
 * pixel, giving it a blurry look and also have sprite tearing issues. This is
 * now fixed by rounding the number to the nearest whole number.
 * 
 * ---
 * 
 * Window Client Area Scaling Bug
 * 
 * If the window has a scale value different from 1.0, the client area (the
 * interactable parts) will not scale properly and appear clipped out. This
 * is now fixed by adjusting the client area to the window's scale values and
 * rounding upward to the nearest whole number.
 * 
 * ---
 * 
 * Window Skin Bleeding
 * 
 * This bug is fixed in the core scripts for RPG Maker MZ v1.3.0+.
 * 
 * Since the v1.2.0 update, Window.prototype._refreshBack's frame value has
 * been set from 96 to 95. This results in the window skin bleeding past the
 * window's intended borders. The Core Engine now reverts this change to
 * prevent the bleeding effect from happening.
 * 
 * ---
 *
 * ============================================================================
 * Major Changes: New Hard-Coded Features
 * ============================================================================
 *
 * This plugin adds some new hard-coded features to RPG Maker MZ's functions.
 * The following is a list of them.
 *
 * ---
 *
 * Scroll-Linked Pictures
 *
 * - If a Parallax has a ! at the start of its filename, it is bound to the map
 * scrolling. The same thing now happens with pictures. If a Picture has a ! at
 * the start of its filename, it is bound to the map's scrolling as well.
 *
 * ---
 *
 * Movement Route Scripts
 *
 * - If code in a Movement Route Script command fails, instead of crashing the
 * game, it will now act as if nothing happened except to display the cause of
 * the error inside the console.
 *
 * ---
 * 
 * Script Call Failsafes
 * 
 * - If code found in Conditional Branches, Control Variables, and/or Script
 * Calls fail to activate, instead of crashing the game, it will now act as if
 * nothing happened except to display the cause of the error inside the
 * console.
 * 
 * ---
 * 
 * Digit Grouping
 * 
 * - There exists an option to change how numbers are displayed and converted
 * in your game. This option can be enabled or disabled by going into the
 * Plugin Manager > VisuMZ_0_OptionsCore > Quality of Life Settings >
 * Digit Grouping and toggling on/off whichever ones you want.
 * 
 * - Digit Grouping will follow the rules of whatever country/locale the Plugin
 * Parameters are set to. If it's to default 'en-US', then 1234567.123456 will
 * become 1,234,567.123456. Set it to 'es-ES' and it becomes 1.234.567,123456
 * instead.
 * 
 * - This uses JavaScript's Number.toLocaleString() function and will therefore
 * follow whatever rules it has. This means if there are trailing zeroes at the
 * end of a decimal, it will cut them off. Numbers like 123.45000 will become
 * 123.45 instead. Excess numbers past 6 decimal places will be rounded. A
 * number like 0.123456789 will become 0.123457 instead.
 * 
 * - Numbers in between [ and ], < and > will be excluded from digit grouping
 * in order for text codes to be preserved accurately. \I[1234] will remain as
 * \I[1234].
 * 
 * - If you would like to enter in a number without digit grouping, surround it
 * with {{ and }}. Typing in {{1234567890}} will yield 1234567890.
 * 
 * ---
 * 
 * Show Scrolling Text, additional functionality
 * 
 * The event command "Show Scrolling Text" now has additional functionality as
 * long as the VisuStella MZ Core Engine is installed. If the game dev inserts
 * "// Script Call" (without the quotes) inside the scrolling text, then the
 * entirity of the Show Scrolling Text event command will be ran as a giant
 * script call event command.
 * 
 * The reason why this functionality is added is because the "Script..." event
 * command contains only 12 lines maximum. This means for any script call
 * larger than 12 lines of code cannot be done by normal means as each script
 * call is ran as a separate instance.
 * 
 * By repurposing the "Show Scrolling Text" event command to be able to
 * function as an extended "Script..." event command, such a thing is now
 * possible with less hassle and more lines to code with.
 * 
 * This effect does not occur if the Show Scrolling Text event command does not
 * have "// Script Call" in its contents.
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
 * === Actors ===
 *
 * Parameter limits can be adjusted in the Plugin Parameters, but this won't
 * lift the ability to change the values of an actor's initial or max level
 * past the editor's limits. Instead, this must be done through the usage of
 * notetags to accomplish the feat.
 *
 * ---
 *
 * <Max Level: x>
 *
 * - Used for: Actor Notetags
 * - Replace 'x' with an integer to determine the actor's max level.
 * - This allows you to go over the database limit of 99.
 * - If this notetag isn't used, default to the actor's database value.
 *
 * ---
 *
 * <Initial Level: x>
 *
 * - Used for: Actor Notetags
 * - Replace 'x' with an integer to determine the actor's initial level.
 * - This allows you to go over the database limit of 99.
 * - If this notetag isn't used, default to the actor's database value.
 *
 * ---
 *
 * === Classes ===
 *
 * As actor levels can now surpass 99 due to the notetag system, there may be
 * some skills you wish certain classes can learn upon reaching higher levels
 * past 99, too.
 *
 * ---
 * 
 * <Learn At Level: x>
 *
 * - Used for: Class Skill Learn Notetags
 * - Replace 'x' with an integer to determine the level this class will learn
 *   the associated skill at.
 * - This allows you to go over the database limit of 99.
 * - If this notetag isn't used, default to the class's database value.
 *
 * ---
 *
 * === Enemies ===
 *
 * Enemies are now given levels. The levels don't do anything except to serve
 * as a container for a number value. This way, levels can be used in damage
 * formulas (ie. a.atk - b.level) without causing any errors. To give enemies
 * levels, use the notetags below. These notetags also allow you to adjust the
 * base parameters, EXP, and Gold past the database limitations.
 *
 * ---
 *
 * <Level: x>
 *
 * - Used for: Enemy Notetags
 * - Replace 'x' with an integer to determine the enemy's level.
 * - If no level is declared, the level will default to 1.
 *
 * ---
 *
 * <param: x>
 *
 * - Used for: Enemy Notetags
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to alter.
 *   - This notetag does NOT work with X Parameters, S Parameters, or any
 *     custom parameters. This notetag ONLY works with the base parameters.
 * - Replace 'x' with an integer to set an enemy's 'param' base value.
 * - This will overwrite the enemy's database value and can exceed the original
 *   value limitation in the database.
 * - If these notetags aren't used, default to the enemy's database value.
 *
 * ---
 *
 * <EXP: x>
 * <Gold: x>
 *
 * - Used for: Enemy Notetags
 * - Replace 'x' with an integer to determine the enemy's EXP or Gold values.
 * - This will overwrite the enemy's database value and can exceed the original
 *   value limitation in the database.
 * - If these notetags aren't used, default to the enemy's database value.
 *
 * ---
 * 
 * === Animations ===
 * 
 * Animations in RPG Maker MZ are done by Effekseer and the animation system
 * has been revamped. However, the animations are only centered on the targets
 * now, and cannot be attached to the head or foot. Insert these tags into
 * the names of the animations in the database to adjust their positions.
 * 
 * ---
 * 
 * <Head>
 * <Foot>
 * 
 * - Used for: Animation Name Tags
 * - Will set the animation to anchor on top of the sprite (if <Head> is used)
 *   or at the bottom of the sprite (if <Foot> is used).
 * 
 * ---
 * 
 * <Anchor X: x>
 * <Anchor Y: y>
 * 
 * <Anchor: x, y>
 * 
 * - Used for: Animation Name Tags
 * - Will anchor the animation at a specific point within the sprite based on
 *   the 'x' and 'y' values.
 * - Replace 'x' and 'y' with numeric values representing their positions based
 *   on a rate where 0.0 is the furthest left/up (x, y respectively) to 1.0 for
 *   the furthest right/down (x, y respectively).
 * 
 * Examples:
 * 
 * <Anchor X: 0.4>
 * <Anchor Y: 0.8>
 * 
 * <Anchor: 0.2, 0.9>
 * 
 * ---
 * 
 * <Offset X: +x>
 * <Offset X: -x>
 * <Offset Y: +y>
 * <Offset Y: -y>
 * 
 * <Offset: +x, +y>
 * <Offset: -x, -y>
 * 
 * - Used for: Animation Name Tags
 * - Will anchor the animation to be offset by an exact number of pixels.
 * - This does the same the editor does, except it lets you input values
 *   greater than 999 and lower than -999.
 * - Replace 'x' and 'y' with numeric values the exact number of pixels to
 *   offset the animation's x and y coordinates by.
 * 
 * Examples:
 * 
 * <Offset X: +20>
 * <Offset Y: -50>
 * 
 * <Offset: +10, -30>
 * 
 * ---
 * 
 * <Mirror Offset X>
 * <No Mirror Offset X>
 * 
 * - Used for: Animation Name Tags
 * - If an animation is mirrored, you can choose to have the animation's Offset
 *   X value be mirrored, too (or not at all).
 * - If no name tag is discovered, this will use the setting found in the
 *   Plugin Parameters > QoL Settings > Misc > Ani: Mirror Offset X setting.
 * 
 * ---
 *
 * === Quality of Life ===
 *
 * By default, RPG Maker MZ does not offer an encounter step minimum after a
 * random encounter has finished. This means that one step immediately after
 * finishing a battle, the player can immediately enter another battle. The
 * Quality of Life improvement: Minimum Encounter Steps allows you to set a
 * buffer range between battles for the player to have some breathing room.
 *
 * ---
 *
 * <Minimum Encounter Steps: x>
 *
 * - Used for: Map Notetags
 * - Replace 'x' with the minimum number of steps before the player enters a
 *   random encounter on that map.
 * - If this notetag is not used, then the minimum encounter steps for the map
 *   will default to Quality of Life Settings => Encounter Rate Min.
 *
 * ---
 *
 * Tile shadows are automatically added to certain tiles in the map editor.
 * These tile shadows may or may not fit some types of maps. You can turn them
 * on/off with the Quality of Life Plugin Parameters or you can override the
 * settings with the following notetags:
 *
 * ---
 *
 * <Show Tile Shadows>
 * <Hide Tile Shadows>
 *
 * - Used for: Map Notetags
 * - Use the respective notetag for the function you wish to achieve.
 * - If this notetag is not used, then the minimum encounter steps for the map
 *   will default to Quality of Life Settings => No Tile Shadows.
 *
 * ---
 *
 * === Basic, X, and S Parameters ===
 *
 * A battler's parameters, or stats as some devs know them as, are the values
 * that determine how a battler performs. These settings allow you to alter
 * behaviors and give boosts to trait objects in a more controlled manner.
 *
 * ---
 *
 * <param Plus: +x>
 * <param Plus: -x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'param' plus value when calculating totals.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'x' with an integer on how much to adjust the parameter by.
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <param Rate: x%>
 * <param Rate: x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Changes 'param' rate to 'x' to alter the total 'param' value.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <param Flat: +x>
 * <param Flat: -x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'param' plus value when calculating totals.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'x' with an integer on how much to adjust the parameter by.
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <param Max: x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Sets max caps for the 'param' to be 'x'. If there are multiple max caps
 *   available to the unit, then the highest will be selected.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'x' with an integer to determine what the max cap should be.
 *
 * ---
 *
 * <xparam Plus: +x%>
 * <xparam Plus: -x%>
 *
 * <xparam Plus: +x.x>
 * <xparam Plus: -x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'xparam' plus value when calculating totals.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <xparam Rate: x%>
 * <xparam Rate: x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Changes 'param' rate to 'x' to alter the total 'xparam' value.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <xparam Flat: +x%>
 * <xparam Flat: -x%>
 *
 * <xparam Flat: +x.x>
 * <xparam Flat: -x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'xparam' plus value when calculating totals.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <sparam Plus: +x%>
 * <sparam Plus: -x%>
 *
 * <sparam Plus: +x.x>
 * <sparam Plus: -x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'sparam' plus value when calculating totals.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   S Parameter => Formula.
 *
 * ---
 *
 * <sparam Rate: x%>
 * <sparam Rate: x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Changes 'param' rate to 'x' to alter the total 'sparam' value.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   S Parameter => Formula.
 *
 * ---
 *
 * <sparam Flat: +x%>
 * <sparam Flat: -x%>
 *
 * <sparam Flat: +x.x>
 * <sparam Flat: -x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'sparam' plus value when calculating totals.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   S Parameter => Formula.
 *
 * === JavaScript Notetags: Basic, X, and S Parameters ===
 *
 * The following are notetags made for users with JavaScript knowledge. These
 * notetags are primarily aimed at Basic, X, and S Parameters.
 *
 * ---
 *
 * <JS param Plus: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'param' plus value.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   plus amount for the parameter's total calculation.
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <JS param Rate: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'param' rate value.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   param rate amount for the parameter's total calculation.
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <JS param Flat: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'param' flat value.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   flat bonus amount for the parameter's total calculation.
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <JS param Max: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to determine what the max cap for 'param' should be. If there
 *   are multiple max caps available to the unit, then the highest is selected.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'code' with JavaScript code to determine the max cap for the
 *   desired parameter.
 *
 * ---
 *
 * <JS xparam Plus: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'xparam' plus value.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   plus amount for the X parameter's total calculation.
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <JS xparam Rate: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'xparam' rate value.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   param rate amount for the X parameter's total calculation.
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <JS xparam Flat: code>
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'xparam' flat value.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   flat bonus amount for the X parameter's total calculation.
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <JS sparam Plus: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'sparam' plus value.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   plus amount for the S parameter's total calculation.
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   S Parameter => Formula.
 *
 * ---
 *
 * <JS sparam Rate: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'sparam' rate value.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   param rate amount for the S parameter's total calculation.
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   S Parameter => Formula.
 *
 * ---
 *
 * <JS sparam Flat: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'sparam' flat value.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   flat bonus amount for the S parameter's total calculation.
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   S Parameter => Formula.
 *
 * ---
 * 
 * === Battle Setting-Related Notetags ===
 * 
 * These tags will change the settings for battle regardless of how the battle
 * system is set up normally. Insert these tags in either the noteboxes of maps
 * or the names of troops for them to take effect. If both are present for a
 * specific battle, then priority goes to the setting found in the troop name.
 * 
 * ---
 * 
 * <FV>
 * <Front View>
 * <Battle View: FV>
 * <Battle View: Front View>
 * 
 * - Used for: Map Notetags, Troop Name Tags, and Troop Comment Tags
 * - Changes the perspective of battle to front view for this specific map or
 *   battle.
 * - Make sure you have the enemy image files available in the img/enemies/
 *   folder as they will used instead of the "sv_enemies" graphics.
 * - If using Troop Comment Tags, then as long as the tag appears in a comment
 *   found on any of the Troop's pages (even if they don't run), the tag will
 *   be considered in effect.
 * 
 * ---
 * 
 * <SV>
 * <Side View>
 * <Battle View: SV>
 * <Battle View: Side View>
 * 
 * - Used for: Map Notetags, Troop Name Tags, and Troop Comment Tags
 * - Changes the perspective of battle to side view for this specific map or
 *   battle.
 * - Make sure you have the enemy image files available in the img/sv_enemies/
 *   folder as they will used instead of the "enemies" graphics.
 * - Make sure your actors have "sv_actor" graphics attached to them.
 * - If using Troop Comment Tags, then as long as the tag appears in a comment
 *   found on any of the Troop's pages (even if they don't run), the tag will
 *   be considered in effect.
 * 
 * ---
 * 
 * <DTB>
 * <Battle System: DTB>
 * 
 * - Used for: Map Notetags, Troop Name Tags, and Troop Comment Tags
 * - Changes the battle system to the default battle system (DTB).
 * - If using Troop Comment Tags, then as long as the tag appears in a comment
 *   found on any of the Troop's pages (even if they don't run), the tag will
 *   be considered in effect.
 * 
 * ---
 * 
 * <TPB Active>
 * <ATB Active>
 * <Battle System: TPB Active>
 * <Battle System: ATB Active>
 * 
 * <TPB Wait>
 * <ATB Wait>
 * <Battle System: TPB Wait>
 * <Battle System: ATB Wait>
 * 
 * - Used for: Map Notetags, Troop Name Tags, and Troop Comment Tags
 * - Changes the battle system to the time progress battle system (TPB) or
 *   active turn battle system (ATB) if you have VisuMZ_2_BattleSystemATB
 *   installed for the game project.
 * - If using Troop Comment Tags, then as long as the tag appears in a comment
 *   found on any of the Troop's pages (even if they don't run), the tag will
 *   be considered in effect.
 * 
 * ---
 * 
 * <BTB>
 * <Battle System: BTB>
 * 
 * <CTB>
 * <Battle System: CTB>
 * 
 * <ETB>
 * <Battle System: ETB>
 * 
 * <FTB>
 * <Battle System: FTB>
 * 
 * <OTB>
 * <Battle System: OTB>
 * 
 * <PTB>
 * <Battle System: PTB>
 * 
 * <STB>
 * <Battle System: STB>
 * 
 * - Used for: Map Notetags, Troop Name Tags, and Troop Comment Tags
 * - Changes the battle system to the respective battle system as long as you
 *   have those plugins installed in the current project.
 * - If using Troop Comment Tags, then as long as the tag appears in a comment
 *   found on any of the Troop's pages (even if they don't run), the tag will
 *   be considered in effect.
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
 * === Animation Commands ===
 * 
 * ---
 * 
 * Animation: Play at Coordinate
 * - Plays an animation on the screen at a specific x, y coordinate even if
 *   there is no sprite attached.
 * 
 *   Animation ID:
 *   - Plays this animation.
 * 
 *   Coordinates:
 * 
 *     X:
 *     Y:
 *     - X/Y coordinate used for the animation.
 *       You may use JavaScript code.
 * 
 *   Mirror Animation?:
 *   - Mirror the animation?
 * 
 *   Mute Animation?:
 *   - Mute the animation?
 * 
 * ---
 * 
 * === Export Plugin Commands ===
 * 
 * ---
 * 
 * Export: All Maps Text
 * - PLAY TEST ONLY. Exports all of the text from all maps,
 *   their events, event pages, and any associated Common Events.
 * 
 *   - Exports 'Show Text' event commands.
 *   - Exports 'Show Choices' event commands.
 *   - Exports 'Show Scrolling Text' event commands.
 *   - Exports 'Comments' event commands.
 *   - Only the raw text will be exported.
 *   - Only usable during Play Test.
 * 
 * ---
 * 
 * Export: All Troops Text
 * - PLAY TEST ONLY. Exports all of the text from all troops,
 *   their event pages, and any associated Common Events.
 * 
 *   - Exports 'Show Text' event commands.
 *   - Exports 'Show Choices' event commands.
 *   - Exports 'Show Scrolling Text' event commands.
 *   - Exports 'Comments' event commands.
 *   - Only the raw text will be exported.
 *   - Only usable during Play Test.
 * 
 * ---
 * 
 * Export: Current Map Text
 * - PLAY TEST ONLY. Exports all of the text on the current map,
 *   its events, the event pages, and any associated Common Events.
 * 
 *   - Exports 'Show Text' event commands.
 *   - Exports 'Show Choices' event commands.
 *   - Exports 'Show Scrolling Text' event commands.
 *   - Exports 'Comments' event commands.
 *   - Only the raw text will be exported.
 *   - Only usable during Play Test.
 *   - If not in battle, this Plugin Command will not work.
 * 
 * ---
 * 
 * Export: Current Troop Text
 * - PLAY TEST ONLY. Exports all of the text on the current troop,
 *   the troop's event pages, and any associated Common Events.
 * 
 *   - Exports 'Show Text' event commands.
 *   - Exports 'Show Choices' event commands.
 *   - Exports 'Show Scrolling Text' event commands.
 *   - Exports 'Comments' event commands.
 *   - Only the raw text will be exported.
 *   - Only usable during Play Test.
 *   - If not in battle, this Plugin Command will not work.
 * 
 * ---
 * 
 * === Game Plugin Commands ===
 * 
 * ---
 *
 * Game: Open URL
 * - Opens a website URL from the game.
 *
 *   URL:
 *   - Where do you want to take the player?
 *
 * ---
 * 
 * === Gold Plugin Commands ===
 * 
 * ---
 *
 * Gold: Gain/Lose
 * - Allows you to give/take more gold than the event editor limit.
 *
 *   Value:
 *   - How much gold should the player gain/lose?
 *   - Use negative values to remove gold.
 *
 * ---
 * 
 * === Map Plugin Commands ===
 * 
 * ---
 * 
 * Map: Once Parallel
 * - Plays a Common Event parallel to the event once without repeating itself
 *   when done.
 * - Map only!
 * 
 *   Common Event ID:
 *   - The ID of the parallel Common Event to play.
 *   - Does NOT repeat itself when finished.
 *   - When exiting map scene or changing maps, all Once Parallels are cleared.
 *   - Once Parallels are not retained upon reentering the scene or map.
 *   - Once Parallels are not stored in memory and cannot be saved.
 * 
 * ---
 * 
 * === Picture Plugin Commands ===
 * 
 * ---
 * 
 * Picture: Coordinates Mode
 * - Play Test Mode only! Gets the coordinates of a specific picture as you
 *   move it across the screen.
 * 
 *   Picture ID: 
 *   - The ID of the pictures to track the coordinates of.
 * 
 * ---
 *
 * Picture: Easing Type
 * - Changes the easing type to a number of options.
 *
 *   Picture ID:
 *   - Which picture do you wish to apply this easing to?
 *
 *   Easing Type:
 *   - Select which easing type you wish to apply.
 *
 *   Instructions:
 *   - Insert this Plugin Command after a "Move Picture" event command.
 *   - Turn off "Wait for Completion" in the "Move Picture" event.
 *   - You may have to add in your own "Wait" event command after.
 *
 * ---
 * 
 * Picture: Erase All
 * - Erases all pictures on the screen because it's extremely tedious to do it
 *   one by one.
 * 
 * ---
 * 
 * Picture: Erase Range
 * - Erases all pictures within a range of numbers because it's extremely
 *   tedious to do it one by one.
 * 
 *   Starting ID:
 *   - The starting ID of the pictures to erase.
 * 
 *   Ending ID:
 *   - The ending ID of the pictures to erase.
 * 
 * ---
 * 
 * Picture: Show Icon
 * - Shows an icon instead of a picture image.
 * - The picture icon can be controlled like any other picture.
 * 
 *   General:
 *
 *     Picture ID Number:
 *     - What is the ID of the picture you wish to show at?
 *     - Use a number between 1 and 100.
 *     - You may use JavaScript code.
 *
 *     Icon Index:
 *     - Select the icon index to use for this picture.
 *     - You may use JavaScript code.
 *
 *     Smooth Icon?:
 *     - This will make the icon smoothed out or pixelated.
 * 
 *   Picture Settings:
 * 
 *     Position:
 *
 *       Origin:
 *       - What is the origin of this picture icon?
 *         - Upper Left
 *         - Center
 *
 *       Position X:
 *       - X coordinate of the picture.
 *       - You may use JavaScript code.
 *
 *       Position Y:
 *       - Y coordinate of the picture.
 *       - You may use JavaScript code.
 * 
 *     Scale:
 *
 *       Width %:
 *       - Horizontal scale of the picture.
 *       - You may use JavaScript code.
 *       - 100 is 100%
 *
 *       Height %:
 *       - Vertical scale of the picture.
 *       - You may use JavaScript code.
 *       - 100 is 100%
 * 
 *     Blend:
 *
 *       Opacity:
 *       - Insert a number to determine opacity level.
 *       - Use a number between 0 and 255.
 *       - You may use JavaScript code.
 *
 *       Blend Mode:
 *       - What kind of blend mode do you wish to apply to the picture?
 * 
 * ---
 * 
 * === Screen Shake Plugin Commands ===
 * 
 * ---
 * 
 * Screen Shake: Custom:
 * - Creates a custom screen shake effect and also sets the following uses of
 *   screen shake to this style.
 * 
 *   Shake Style:
 *   - Select shake style type.
 *   - Original
 *   - Random
 *   - Horizontal
 *   - Vertical
 * 
 *   Power:
 *   - Power level for screen shake.
 * 
 *   Speed:
 *   - Speed level for screen shake.
 * 
 *   Duration:
 *   - Duration of screenshake.
 *   - You can use code as well.
 * 
 *   Wait for Completion:
 *   - Wait until completion before moving onto the next event?
 * 
 * ---
 * 
 * === Switch Plugin Commands ===
 * 
 * ---
 * 
 * Switches: Randomize ID(s)
 * - Select specific Switch ID's to randomize ON/OFF.
 * 
 *   Switch ID(s):
 *   - Select which Switch ID(s) to toggle.
 * 
 *   Chance for ON:
 *   - Chance out of 100 that determines the switches to be ON.
 * 
 * ---
 *
 * Switches: Randomize Range
 * - Select specific Switch ID Range to randomize ON/OFF.
 * - The ratio determines the ON/OFF distribution.
 *
 *   Starting ID:
 *   - The starting ID of the Switch to toggle.
 *
 *   Ending ID:
 *   - The ending ID of the Switch to toggle.
 *
 *   Chance for ON:
 *   - Chance out of 100 that determines the switches to be ON.
 *
 * ---
 *
 * Switches: Toggle ID(s)
 * - Select specific Switch ID's to toggle ON/OFF.
 * - ON becomes OFF. OFF becomes ON.
 *
 *   Switch ID(s):
 *   - Select which Switch ID(s) to toggle.
 *
 * ---
 *
 * Switches: Toggle Range
 * - Select specific Switch ID Range to toggle ON/OFF.
 * - ON becomes OFF. OFF becomes ON.
 *
 *   Starting ID:
 *   - The starting ID of the Switch to toggle.
 *
 *   Ending ID:
 *   - The ending ID of the Switch to toggle.
 *
 * ---
 * 
 * === System Plugin Commands ===
 * 
 * ---
 *
 * System: Battle System Change
 * - Switch to a different battle system in-game.
 * - Some battle systems REQUIRE their specific plugins!
 *
 *   Change To:
 *   - Choose which battle system to switch to.
 *     - Database Default (Use game database setting)
 *     - -
 *     - DTB: Default Turn Battle
 *     - TPB Active: Time Progress Battle (Active)
 *     - TPB Wait: Time Progress Battle (Wait)
 *     - -
 *     - BTB: Brave Turn Battle (Req VisuMZ_2_BattleSystemBTB)
 *     - CTB: Charge Turn Battle (Req VisuMZ_2_BattleSystemCTB)
 *     - OTB: Order Turn Battle (Req VisuMZ_2_BattleSystemOTB)
 *     - STB: Standard Turn Battle (Req VisuMZ_2_BattleSystemSTB)
 *
 * ---
 * 
 * System: Load Images
 * - Allows you to (pre) load up images ahead of time.
 *
 *   img/animations/:
 *   img/battlebacks1/:
 *   img/battlebacks2/:
 *   img/enemies/:
 *   img/faces/:
 *   img/parallaxes/:
 *   img/pictures/:
 *   img/sv_actors/:
 *   img/sv_enemies/:
 *   img/system/:
 *   img/tilesets/:
 *   img/titles1/:
 *   img/titles2/:
 *   - Which files do you wish to load from this directory?
 * 
 * ---
 *
 * System: Main Font Size
 * - Set the game's main font size.
 *
 *   Change To:
 *   - Change the font size to this number.
 *
 * ---
 *
 * System: Side View Battle
 * - Switch between Front View or Side View for battle.
 *
 *   Change To:
 *   - Choose which view type to switch to.
 *
 * ---
 *
 * System: Window Padding
 * - Change the game's window padding amount.
 *
 *   Change To:
 *   - Change the game's standard window padding to this value.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Quality of Life Settings
 * ============================================================================
 *
 * A variety of (optional) settings and changes are added with the Core Engine
 * to improve the quality of life for both the game devs and players alike.
 *
 * ---
 *
 * Play Test
 * 
 *   New Game on Boot:
 *   - Automatically start a new game on Play Test?
 *   - Only enabled during Play Test.
 *
 *   No Play Test Mode:
 *   - Force the game to be out of Play Test mode when play testing.
 * 
 *   Open Console on Boot:
 *   - Open the Debug Console upon booting up your game?
 *   - Only enabled during Play Test.
 *
 *   F6: Toggle Sound:
 *   - F6 Key Function: Turn on all sound to 100% or to 0%, toggling between
 *     the two.
 *   - Only enabled during Play Test.
 *
 *   F7: Toggle Fast Mode:
 *   - F7 Key Function: Toggle fast mode.
 *   - Only enabled during Play Test.
 *
 *   New Game > Common Event:
 *   - Runs a common event each time a new game is started.
 *   - Only enabled during Play Test.
 *
 * ---
 * 
 * Battle Test
 * 
 *   Add Item Type:
 *   Add Weapon Type:
 *   Add Armor Type:
 *   - Add copies of each database item, weapon, and/or armor?
 *   - Effective only during battle test.
 * 
 *   Added Quantity:
 *   - Determines how many items are added during a battle test instead of
 *     the maximum amount.
 * 
 * ---
 *
 * Digit Grouping
 *
 *   Standard Text:
 *   - Make numbers like 1234567 appear like 1,234,567 for standard text
 *     inside windows?
 *
 *   Ex Text:
 *   - Make numbers like 1234567 appear like 1,234,567 for ex text,
 *     written through drawTextEx (like messages)?
 *
 *   Damage Sprites:
 *   - Make numbers like 1234567 appear like 1,234,567 for in-battle
 *     damage sprites?
 *
 *   Gauge Sprites:
 *   - Make numbers like 1234567 appear like 1,234,567 for visible gauge
 *     sprites such as HP, MP, and TP gauges?
 * 
 *   Country/Locale
 *   - Base the digit grouping on which country/locale?
 *   - This will follow all of the digit grouping rules found here:
 *     https://www.w3schools.com/JSREF/jsref_tolocalestring_number.asp
 *
 * ---
 *
 * Player Benefit
 *
 *   Encounter Rate Min:
 *   - Minimum number of steps the player can take without any
 *     random encounters.
 *
 *   Escape Always:
 *   - If the player wants to escape a battle, let them escape the battle
 *     with 100% chance.
 *
 *   Accuracy Formula:
 *   - Accuracy formula calculation change to
 *     Skill Hit% * (User HIT - Target EVA) for better results.
 *
 *   Accuracy Boost:
 *   - Boost HIT and EVA rates in favor of the player.
 *
 *   Level Up -> Full HP:
 *   Level Up -> Full MP:
 *   - Recovers full HP or MP when an actor levels up.
 *
 * ---
 *
 * Misc
 * 
 *   Animation: Mirror Offset X:
 *   - When animations are mirrored, mirror their Offset X values, too.
 *   - The animation name tags <Mirror Offset X> and <No Mirror Offset X> will
 *     override this effect for that specific animation.
 * 
 *   Anti-Zoom Pictures:
 *   - If on, prevents pictures from being affected by zoom.
 *
 *   Font Shadows:
 *   - If on, text uses shadows instead of outlines.
 *
 *   Font Smoothing:
 *   - If on, smoothes fonts shown in-game.
 * 
 *   Font Width Fix:
 *   - Fixes the font width issue with instant display non-monospaced fonts
 *     in the Message Window.
 *
 *   Key Item Protection:
 *   - If on, prevents Key Items from being able to be sold and from being
 *     able to be consumed.
 *
 *   Modern Controls:
 *   - If on, allows usage of the Home/End buttons.
 *   - Home would scroll to the first item on a list.
 *   - End would scroll to the last item on a list.
 *   - Shift + Up would page up.
 *   - Shift + Down would page down.
 * 
 *   NewGame > CommonEvent:
 *   - Runs a common event each time a new game during any session is started.
 *   - Applies to all types of sessions, play test or not.
 *
 *   No Tile Shadows:
 *   - Removes tile shadows from being displayed in-game.
 *
 *   Pixel Image Rendering:
 *   - If on, pixelates the image rendering (for pixel games).
 *
 *   Require Focus?
 *   - Requires the game to be focused? If the game isn't focused, it will
 *     pause if it's not the active window.
 *
 *   Smart Event Collision:
 *   - Makes events only able to collide with one another if they're
 *    'Same as characters' priority.
 * 
 *   Subfolder Name Purge:
 *   - Purge subfolder name from Plugin Parameters when reading data to let
 *     Plugin Commands work properly.
 *   - This is for plugins (such as the VisuMZ library) that utilize dynamic
 *     name registrations for Plugin Commands. Turn this on if you plan on
 *     using subfolders with VisuMZ plugins.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Battle System
 * ============================================================================
 * 
 * Choose which battle system to use for your game.
 * 
 * Some battle systems REQUIRE their specific plugins! This means if you do not
 * have the required battle system plugin installed, it will not change over.
 * The Core Engine plugin does not contain data for all of the battle systems
 * inside its code.
 * 
 * ---
 * 
 *   Database Default (Use game database setting)
 * 
 *   -
 * 
 *   DTB: Default Turn Battle
 *   TPB Active: Time Progress Battle (Active)
 *   TPB Wait: Time Progress Battle (Wait)
 * 
 *   -
 * 
 *   BTB: Brave Turn Battle (Req VisuMZ_2_BattleSystemBTB)
 *   CTB: Charge Turn Battle (Req VisuMZ_2_BattleSystemCTB)
 *   ETB: Energy Turn Battle (Req VisuMZ_2_BattleSystemETB)
 *   FTB: Free Turn Battle (Req VisuMZ_2_BattleSystemFTB)
 *   OTB: Order Turn Battle (Req VisuMZ_2_BattleSystemOTB)
 *   PTB: Press Turn Battle (Req VisuMZ_2_BattleSystemPTB)
 *   STB: Standard Turn Battle (Req VisuMZ_2_BattleSystemSTB)
 * 
 *   -
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Color Settings
 * ============================================================================
 *
 * These settings allow you, the game dev, to have more control over which
 * colors appear for what conditions found in the game. You can use regular
 * numbers to use the colors predetermined by the game's Window Skin or you
 * can use the #rrggbb format for a hex color code.
 * 
 * If the game's Window Skin is changed mid-game, the colors used will still be
 * based off the default Window Skin's colors. This is due to storing them in a
 * cache and preventing extra processing and reduces lag.
 *
 * You can find out what hex codes belong to which color from this website:
 * https://htmlcolorcodes.com/
 *
 * ---
 *
 * Basic Colors
 * - These are colors that almost never change and are used globally throughout
 *   the in-game engine.
 *
 *   Normal:
 *   System:
 *   Crisis:
 *   Death:
 *   Gauge Back:
 *   HP Gauge:
 *   MP Gauge:
 *   MP Cost:
 *   Power Up:
 *   Power Down:
 *   CT Gauge:
 *   TP Gauge:
 *   Pending Color:
 *   EXP Gauge:
 *   MaxLv Gauge:
 *   - Use #rrggbb for custom colors or regular numbers
 *   for text colors from the Window Skin.
 *
 * ---
 *
 * Alpha Colors:
 * - These are colors that have a bit of transparency to them and are specified
 *   by the 'rgba(red, green, blue, alpha)' format.
 * - Replace 'red' with a number between 0-255 (integer).
 * - Replace 'green' with a number between 0-255 (integer).
 * - Replace 'blue' with a number between 0-255 (integer).
 * - Replace 'alpha' with a number between 0 and 1 (decimal).
 * 
 *   Window Font Outline:
 *   Gauge Number Outline:
 *   Dim Color:
 *   Item Back Color:
 *   - Colors with a bit of alpha settings.
 *   - Format rgba(0-255, 0-255, 0-255, 0-1)
 *
 * ---
 *
 * Conditional Colors:
 * - These require a bit of JavaScript knowledge. These determine what colors
 *   to use under which situations and uses such as different values of HP, MP,
 *   TP, for comparing equipment, and determine damage popup colors.
 * 
 *   JS: Actor HP Color:
 *   JS: Actor MP Color:
 *   JS: Actor TP Color:
 *   - Code used for determining what HP, MP, or TP color to use for actors.
 *
 *   JS: Parameter Change:
 *   - Code used for determining whatcolor to use for parameter changes.
 *
 *   JS: Damage Colors:
 *   - Code used for determining what color to use for damage types.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Gold Settings
 * ============================================================================
 *
 * Gold is the main currency in RPG Maker MZ. The settings provided here will
 * determine how Gold appears in the game and certain behaviors Gold has.
 *
 * ---
 *
 * Gold Settings
 *
 *   Gold Max:
 *   - Maximum amount of Gold the party can hold.
 *   - Default 99999999
 *
 *   Gold Font Size:
 *   - Font size used for displaying Gold inside Gold Windows.
 *   - Default: 26
 *
 *   Gold Icon:
 *   - Icon used to represent Gold.
 *   - Use 0 for no icon.
 *
 *   Gold Overlap:
 *   - Text used too much Gold to fit in the window.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Image Loading
 * ============================================================================
 *
 * Not all images are loaded at once in-game. RPG Maker MZ uses asynchronous
 * loading which means images are loaded when needed. This may cause delays in
 * when you want certain images to appear. However, if an image is loaded
 * beforehand, they can be used immediately provided they aren't removed from
 * the image cache.
 *
 * ---
 *
 * Image Loading
 *
 *   img/animations/:
 *   img/battlebacks1/:
 *   img/battlebacks2/:
 *   img/enemies/:
 *   img/faces/:
 *   img/parallaxes/:
 *   img/pictures/:
 *   img/sv_actors/:
 *   img/sv_enemies/:
 *   img/system/:
 *   img/tilesets/:
 *   img/titles1/:
 *   img/titles2/:
 *   - Which files do you wish to load from this directory upon starting
 *     up the game?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Keyboard Input Settings
 * ============================================================================
 *
 * Settings for the game that utilize keyboard input. These are primarily for
 * the name input scene (Scene_Name) and the number input event command. These
 * settings have only been tested on English keyboards and may or may not be
 * compatible with other languages, so please disable these features if they do
 * not fit in with your game.
 * 
 * If a controller is connected upon entering the name change scene, it will
 * use the default manual-entry mode instead of the keyboard-entry mode. If a
 * controller button is pressed during the keyboard-entry mode, it will
 * automatically switch to the manual-entry mode.
 * 
 * This plugin does not provide support for controllers that are undetected by
 * RPG Maker MZ's default controller support.
 *
 * ---
 * 
 * Controls
 * 
 *   WASD Movement:
 *   - Enables or disables WASD movement for your game project.
 *   - Moves the W page down button to E.
 * 
 *   R Button: Dash Toggle:
 *   - Enables or disables R button as an Always Dash option toggle.
 * 
 * ---
 *
 * Name Input
 * 
 *   Enable?:
 *   - Enables keyboard input for name entry.
 *   - Only tested with English keyboards.
 * 
 *   Default Mode:
 *   - Select default mode when entering the scene.
 *     - Default - Uses Arrow Keys to select letters.
 *     - Keyboard - Uses Keyboard to type in letters.
 * 
 *   QWERTY Layout:
 *   - Uses the QWERTY layout for manual entry.
 * 
 *   Keyboard Message:
 *   - The message displayed when allowing keyboard entry.
 *   - You may use text codes here.
 * 
 *   Banned Words:
 *   - Players cannot use these words for names.
 *   - These include words inside the names.
 *   - If a banned word is used, a buzzer sound will play.
 *
 * ---
 *
 * Number Input
 * 
 *   Enable?:
 *   - Enables keyboard input for number entry.
 *   - Only tested with English keyboards.
 *
 * ---
 * 
 * Button Assist
 * 
 *   Switch to Keyboard:
 *   - Text used to describe the keyboard switch.
 * 
 *   Switch To Manual:
 *   - Text used to describe the manual entry switch.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Menu Background Settings
 * ============================================================================
 *
 * These settings in the Plugin Parameters allow you to adjust the background
 * images used for each of the scenes. The images will be taken from the game
 * project folders img/titles1/ and img/titles2/ to load into the game.
 *
 * These settings are only available to scenes found within the Main Menu, the
 * Shop scene, and the Actor Naming scene.
 *
 * ---
 *
 * Menu Background Settings:
 *
 *   Scene_Menu:
 *   Scene_Item:
 *   Scene_Skill:
 *   Scene_Equip:
 *   Scene_Status:
 *   Scene_Options:
 *   Scene_Save:
 *   Scene_Load:
 *   Scene_GameEnd:
 *   Scene_Shop:
 *   Scene_Name:
 *   - Individual background settings for the scene.
 *
 *   Scene_Unlisted
 *   - Individual background settings for any scenes that aren't listed above.
 *
 * ---
 *
 * Background Settings
 *
 *   Snapshop Opacity:
 *   - Snapshot opacity for the scene.
 *
 *   Background 1:
 *   - Filename used for the bottom background image.
 *   - Leave empty if you don't wish to use one.
 *
 *   Background 2:
 *   - Filename used for the upper background image.
 *   - Leave empty if you don't wish to use one.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Menu Button Assist Window
 * ============================================================================
 *
 * In most modern RPG's, there exist small windows on the screen which tell the
 * player what the control schemes are for that scene. This plugin gives you
 * the option to add that window to the menu scenes in the form of a Button
 * Assist Window.
 *
 * ---
 *
 * General
 * 
 *   Enable:
 *   - Enable the Menu Button Assist Window.
 * 
 *   Location:
 *   - Determine the location of the Button Assist Window.
 *   - Requires Plugin Parameters => UI => Side Buttons ON.
 *
 *   Background Type:
 *   - Select background type for this window.
 *
 * ---
 *
 * Text
 * 
 *   Text Format:
 *   - Format on how the buttons are displayed.
 *   - Text codes allowed. %1 - Key, %2 - Text
 * 
 *   Multi-Key Format:
 *   - Format for actions with multiple keys.
 *   - Text codes allowed. %1 - Key 1, %2 - Key 2
 * 
 *   OK Text:
 *   Cancel Text:
 *   Switch Actor Text:
 *   - Default text used to display these various actions.
 *
 * ---
 *
 * Keys
 * 
 *   Key: Unlisted Format:
 *   - If a key is not listed below, use this format.
 *   - Text codes allowed. %1 - Key
 * 
 *   Key: Up:
 *   Key: Down:
 *   Key: Left:
 *   Key: Right:
 *   Key: Shift:
 *   Key: Tab:
 *   Key: A through Z:
 *   - How this key is shown in-game.
 *   - Text codes allowed.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Menu Layout Settings
 * ============================================================================
 *
 * These settings allow you to rearrange the positions of the scenes accessible
 * from the Main Menu, the Shop scene, and the Actor Naming scene. This will
 * require you to have some JavaScript knowledge to make the windows work the
 * way you would like.
 *
 * ---
 *
 * Menu Layout Settings
 *
 *   Scene_Title:
 *   Scene_Menu:
 *   Scene_Item:
 *   Scene_Skill:
 *   Scene_Equip:
 *   Scene_Status:
 *   Scene_Options:
 *   Scene_Save:
 *   Scene_Load:
 *   Scene_GameEnd:
 *   Scene_Shop:
 *   Scene_Name:
 *   - Various options on adjusting the selected scene.
 *
 * ---
 *
 * Scene Window Settings
 *
 *   Background Type:
 *   - Selects the background type for the selected window.
 *   - Window
 *   - Dim
 *   - Transparent
 *
 *   JS: X, Y, W, H
 *   - Code used to determine the dimensions for the selected window.
 *
 * ---
 *
 * Scene_Title Settings
 * - The following are settings unique to Scene_Title.
 *
 * Title Screen
 *
 *   Document Title Format:
 *   - Format to display text in document title.
 *   - %1 - Main Title, %2 - Subtitle, %3 - Version
 *
 *   Subtitle:
 *   - Subtitle to be displayed under the title name.
 *   
 *   Version:
 *   - Version to be display in the title screen corner.
 *   
 *   JS: Draw Title:
 *   - Code used to draw the game title.
 *   
 *   JS: Draw Subtitle:
 *   - Code used to draw the game subtitle.
 *   
 *   JS: Draw Version:
 *   - Code used to draw the game version.
 *   
 *   Button Fade Speed:
 *   - Speed at which the buttons fade in at (1-255).
 *
 * ---
 *
 * Scene_GameEnd Settings
 * - The following are settings unique to Scene_GameEnd.
 *   
 *   Command Window List:
 *   - Window commands used by the title screen.
 *   - Add new commands here.
 *
 * ---
 *
 * Command Window List
 * - This is found under Scene_Title and Scene_GameEnd settings.
 *
 *   Symbol:
 *   - The symbol used for this command.
 * 
 *   STR: Text:
 *   - Displayed text used for this title command.
 *   - If this has a value, ignore the JS: Text version.
 * 
 *   JS: Text:
 *   - JavaScript code used to determine string used for the displayed name.
 * 
 *   JS: Show:
 *   - JavaScript code used to determine if the item is shown or not.
 * 
 *   JS: Enable:
 *   - JavaScript code used to determine if the item is enabled or not.
 * 
 *   JS: Ext:
 *   - JavaScript code used to determine any ext data that should be added.
 * 
 *   JS: Run Code:
 *   - JavaScript code that runs once this command is selected.
 * 
 * ---
 *
 * Title Picture Buttons:
 * - This is found under Scene_Title settings.
 * 
 *   Picture's Filename:
 *   - Filename used for the picture.
 *
 *   Button URL:
 *   - URL for the button to go to upon being clicked.
 *
 *   JS: Position:
 *   - JavaScript code that helps determine the button's Position.
 *
 *   JS: On Load:
 *   - JavaScript code that runs once this button bitmap is loaded.
 *
 *   JS: Run Code:
 *   - JavaScript code that runs once this button is pressed.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Parameter Settings
 * ============================================================================
 *
 * A battler's parameters, or stats as some devs know them as, are the values
 * that determine how a battler performs. These settings allow you to alter
 * their behaviors and give boosts to trait objects in a controlled manner.
 *
 * ---
 *
 * Parameter Settings
 *
 *   Displayed Parameters
 *   - A list of the parameters that will be displayed in-game.
 *   - Shown in the Equip Menu.
 *   - Shown in the Status Menu.
 *
 *   Extended Parameters
 *   - The list shown in extended scenes (for other VisuStella plugins).
 *
 * ---
 *
 * === Basic Parameters ===
 *
 * MHP - MaxHP
 * - This is the maximum health points value. The amount of health points (HP)
 * a battler has determines whether or not the battler is in a living state or
 * a dead state. If the HP value is above 0, then the battler is living. If it
 * is 0 or below, the battler is in a dead state unless the battler has a way
 * to counteract death (usually through immortality). When the battler takes
 * damage, it is usually dealt to the HP value and reduces it. If the battler
 * is healed, then the HP value is increased. The MaxHP value determines what's
 * the maximum amount the HP value can be held at, meaning the battler cannot
 * be healed past that point.
 *
 * MMP - MaxMP
 * - This is the maximum magic points value. Magic points (MP) are typically
 * used for the cost of skills and spells in battle. If the battler has enough
 * MP to fit the cost of the said skill, the battler is able to use the said
 * skill provided that all of the skill's other conditions are met. If not, the
 * battler is then unable to use the skill. Upon using a skill that costs MP,
 * the battler's MP is reduced. However, the battler's MP can be recovered and
 * results in a gain of MP. The MaxMP value determines what is the maximum
 * amount the MP value can be held at, meaning the battler cannot recover MP
 * past the MaxMP value.
 *
 * ATK - Attack
 * - This is the attack value of the battler. By default, this stat is used for
 * the purpose of damage calculations only, and is typically used to represent
 * the battler's physical attack power. Given normal damage formulas, higher
 * values mean higher damage output for physical attacks.
 *
 * DEF - Defense
 * - This is the defense value of the battler. By default, this stat is used
 * for the purpose of damage calculations only, and is typically used to
 * represent the battler's physical defense. Given normal damage formulas,
 * higher values mean less damage received from physical attacks.
 *
 * MAT - Magic Attack
 * - This is the magic attack value of the battler. By default, this stat is
 * used for the purpose of damage calculations only, and is typically used to
 * represent the battler's magical attack power. Given normal damage formulas,
 * higher values mean higher damage output for magical attacks.
 *
 * MDF - Magic Defense
 * - This is the magic defense value of the battler. By default, this stat is
 * used for the purpose of damage calculations only, and is typically used to
 * represent the battler's magical defense. Given normal damage formulas,
 * higher values mean less damage received from magical attacks.
 *
 * AGI - Agility
 * - This is the agility value of the battler. By default, this stat is used to
 * determine battler's position in the battle turn's order. Given a normal turn
 * calculation formula, the higher the value, the faster the battler is, and
 * the more likely the battler will have its turn earlier in a turn.
 *
 * LUK - Luck
 * - This is the luck value of the battler. By default, this stat is used to
 * affect the success rate of states, buffs, and debuffs applied by the battler
 * and received by the battler. If the user has a higher LUK value, the state,
 * buff, or debuff is more likely to succeed. If the target has a higher LUK
 * value, then the state, buff, or debuff is less likely to succeed.
 *
 * ---
 *
 * Basic Parameters
 *
 *   HP Crisis Rate:
 *   - HP Ratio at which a battler can be considered in crisis mode.
 *
 *   JS: Formula:
 *   - Formula used to determine the total value all 8 basic parameters:
 *   - MaxHP, MaxMP, ATK, DEF, MAT, MDF, AGI, LUK.
 *
 * Parameter Caps:
 *
 *   MaxHP Cap:
 *   MaxMP Cap:
 *   ATK Cap:
 *   DEF Cap:
 *   MAT Cap:
 *   MDF Cap:
 *   AGI Cap:
 *   LUK Cap:
 *   - Formula used to determine the selected parameter's cap.
 *   - These settings DO NOT raise the editor's maximum values. If you want to
 *     raise an enemy's maximum parameter value past their default cap, use the
 *     associated notetag for them instead.
 *
 * ---
 *
 * === X Parameters ===
 *
 * HIT - Hit Rate%
 * - This determines the physical hit success rate of the any physical action.
 * All physical attacks make a check through the HIT rate to see if the attack
 * will connect. If the HIT value passes the randomizer check, the attack will
 * connect. If the HIT value fails to pass the randomizer check, the attack
 * will be considered a MISS.
 *
 * EVA - Evasion Rate%
 * - This determines the physical evasion rate against any incoming physical
 * actions. If the HIT value passes, the action is then passed to the EVA check
 * through a randomizer check. If the randomizer check passes, the physical
 * attack is evaded and will fail to connect. If the randomizer check passes,
 * the attempt to evade the action will fail and the action connects.
 *
 * CRI - Critical Hit Rate%
 * - Any actions that enable Critical Hits will make a randomizer check with
 * this number. If the randomizer check passes, extra damage will be carried
 * out by the initiated action. If the randomizer check fails, no extra damage
 * will be added upon the action.
 *
 * CEV - Critical Evasion Rate%
 * - This value is put against the Critical Hit Rate% in a multiplicative rate.
 * If the Critical Hit Rate is 90% and the Critical Evasion Rate is
 * 20%, then the randomizer check will make a check against 72% as the values
 * are calculated by the source code as CRI * (1 - CEV), therefore, with values
 * as 0.90 * (1 - 0.20) === 0.72.
 *
 * MEV - Magic Evasion Rate%
 * - Where EVA is the evasion rate against physical actions, MEV is the evasion
 * rate against magical actions. As there is not magical version of HIT, the
 * MEV value will always be bit against when a magical action is initiated. If
 * the randomizer check passes for MEV, the magical action will not connect. If
 * the randomizer check fails for MEV, the magical action will connect.
 *
 * MRF - Magic Reflect Rate%
 * - If a magical action connects and passes, there is a chance the magical
 * action can be bounced back to the caster. That chance is the Magic Reflect
 * Rate. If the randomizer check for the Magic Reflect Rate passes, then the
 * magical action is bounced back to the caster, ignoring the caster's Magic
 * Evasion Rate. If the randomizer check for the Magic Reflect Rate fails, then
 * the magical action will connect with its target.
 *
 * CNT - Counter Attack Rate%
 * - If a physical action connects and passes, there is a chance the physical
 * action can be avoided and a counter attack made by the user will land on the
 * attacking unit. This is the Counter Attack Rate. If the randomizer check for
 * the Counter Attack Rate passes, the physical action is evaded and the target
 * will counter attack the user. If the randomizer check fails, the physical
 * action will connect to the target.
 *
 * HRG - HP% Regeneration
 * - During a battler's regeneration phase, the battler will regenerate this
 * percentage of its MaxHP as gained HP with a 100% success rate.
 *
 * MRG - MP% Regeneration
 * - During a battler's regeneration phase, the battler will regenerate this
 * percentage of its MaxMP as gained MP with a 100% success rate.
 *
 * TRG - TP% Regeneration
 * - During a battler's regeneration phase, the battler will regenerate this
 * percentage of its MaxTP as gained TP with a 100% success rate.
 *
 * ---
 *
 * X Parameters
 *
 *   JS: Formula:
 *   - Formula used to determine the total value all 10 X parameters:
 *   - HIT, EVA, CRI, CEV, MEV, MRF, CNT, HRG, MRG, TRG.
 *
 * Vocabulary
 *
 *   HIT:
 *   EVA:
 *   CRI:
 *   CEV:
 *   MEV:
 *   MRF:
 *   CNT:
 *   HRG:
 *   MRG:
 *   TRG:
 *   - In-game vocabulary used for the selected X Parameter.
 *
 * ---
 *
 * === S Parameters ===
 *
 * TGR - Target Rate
 * - Against the standard enemy, the Target Rate value determines the odds of
 * an enemy specifically targeting the user for a single target attack. At 0%,
 * the enemy will almost never target the user. At 100%, it will have normal
 * targeting opportunity. At 100%+, the user will have an increased chance of
 * being targeted.
 * *NOTE: For those using the Battle A.I. Core, any actions that have specific
 * target conditions will bypass the TGR rate.
 *
 * GRD - Guard Effect
 * - This is the effectiveness of guarding. This affects the guard divisor
 * value of 2. At 100% GRD, damage will become 'damage / (2 * 1.00)'. At 50%
 * GRD, damage will become 'damage / (2 * 0.50)'. At 200% GRD, damage will
 * become 'damage / (2 * 2.00)' and so forth.
 *
 * REC - Recovery Effect
 * - This is how effective heals are towards the user. The higher the REC rate,
 * the more the user is healed. If a spell were to heal for 100 and the user
 * has 300% REC, then the user is healed for 300 instead.
 *
 * PHA - Pharmacology
 * - This is how effective items are when used by the user. The higher the PHA
 * rate, the more effective the item effect. If the user is using a Potion that
 * recovers 100% on a target ally and the user has 300% PHA, then the target
 * ally will receive healing for 300 instead.
 *
 * MCR - MP Cost Rate
 * - This rate affects how much MP skills with an MP Cost will require to use.
 * If the user has 100% MCR, then the MP Cost will be standard. If the user has
 * 50% MCR, then all skills that cost MP will cost only half the required MP.
 * If the user has 200% MCR, then all skills will cost 200% their MP cost.
 *
 * TCR - TP Charge Rate
 * - This rate affects how much TP skills with an TP will charge when gaining
 * TP through various actions. At 100%, TP will charge normally. At 50%, TP
 * will charge at half speed. At 200%, TP will charge twice as fast.
 *
 * PDR - Physical Damage Rate
 * - This rate affects how much damage the user will take from physical damage.
 * If the user has 100% PDR, then the user takes the normal amount. If the user
 * has 50% PDR, then all physical damage dealt to the user is halved. If the
 * user has 200% PDR, then all physical damage dealt to the user is doubled.
 *
 * MDR - Magical Damage Rate
 * - This rate affects how much damage the user will take from magical damage.
 * If the user has 100% MDR, then the user takes the normal amount. If the user
 * has 50% MDR, then all magical damage dealt to the user is halved. If the
 * user has 200% MDR, then all magical damage dealt to the user is doubled.
 *
 * FDR - Floor Damage Rate
 * - On the field map, this alters how much damage the user will take when the
 * player walks over a tile that damages the party. The FDR value only affects
 * the damage dealt to the particular actor and not the whole party. If FDR is
 * at 100%, then the user takes the full damage. If FDR is at 50%, then only
 * half of the damage goes through. If FDR is at 200%, then floor damage is
 * doubled for that actor.
 *
 * EXR - Experience Rate
 * - This determines the amount of experience gain the user whenever the user
 * gains any kind of EXP. At 100% EXR, the rate of experience gain is normal.
 * At 50%, the experience gain is halved. At 200%, the experience gain for the
 * user is doubled.
 *
 * ---
 *
 * S Parameters
 *
 *   JS: Formula
 *   - Formula used to determine the total value all 10 S parameters:
 *   - TGR, GRD, REC, PHA, MCR, TCR, PDR, MDR, FDR, EXR.
 *
 * Vocabulary
 *
 *   TGR:
 *   GRD:
 *   REC:
 *   PHA:
 *   MCR:
 *   TCR:
 *   PDR:
 *   MDR:
 *   FDR:
 *   EXR:
 *   - In-game vocabulary used for the selected S Parameter.
 *
 * ---
 *
 * Icons
 * 
 *   Draw Icons?
 *   - Draw icons next to parameter names?
 *
 *   MaxHP, MaxMP, ATK, DEF, MAT, MDF, AGI, LUK:
 *   HIT, EVA, CRI, CEV, MEV, MRF, CNT, HRG, MRG, TRG:
 *   TGR, GRD, REC, PHA, MCR, TCR, PDR, MDR, FDR, EXR:
 *   - Icon used for the selected parameter.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Custom Parameters Settings
 * ============================================================================
 *
 * As of version 1.07, you can add Custom Parameters to your game if RPG Maker
 * MZ's default set of parameters isn't enough for you. These parameters can
 * have variable functionality depending on how you code it. More importantly,
 * these are compatible with the VisuStella MZ menus and the VisuStella Core
 * Engine's Parameters settings.
 * 
 * For clarification, these settings do NOT create brand-new parameters for you
 * to use and add to your game nor are the bonuses supported by other plugins
 * in the VisuStella MZ library. These settings exist to function as a bridge
 * for non-VisuStella MZ plugins that have created their own parameter values
 * and to show them inside VisuStella menus.
 *
 * ---
 *
 * Custom Parameter
 * 
 *   Parameter Name:
 *   - What's the parameter's name?
 *   - Used for VisuStella MZ menus.
 * 
 *   Abbreviation:
 *   - What abbreviation do you want to use for the parameter?
 *   - Do not use special characters. Avoid numbers if possible.
 * 
 *   Icon:
 *   - What icon do you want to use to represent this parameter?
 *   - Used for VisuStella MZ menus.
 * 
 *   Type:
 *   - What kind of number value will be returned with this parameter?
 *     - Integer (Whole Numbers Only)
 *     - Float (Decimals are Allowed)
 * 
 *   JS: Value:
 *   - Run this code when this parameter is to be returned.
 *
 * ---
 * 
 * Instructions on Adding Custom Parameters to VisuStella Menus
 * 
 * In the Core Engine and Elements and Status Menu Core plugins, there are
 * plugin parameter fields for you to insert the parameters you want displayed
 * and visible to the player.
 * 
 * Insert in those the abbreviation of the custom parameter. For example, if
 * you want to add the "Strength" custom parameter and the abbreviation is
 * "str", then add "str" to the Core Engine/Elements and Status Menu Core's
 * plugin parameter field for "Strength" to appear in-game. Case does not
 * matter here so you can insert "str" or "STR" and it will register all the
 * same to make them appear in-game.
 * 
 * ---
 * 
 * Instructions on Using Custom Parameters as Mechanics
 * 
 * If you want to use a custom parameter in, say, a damage formula, refer to
 * the abbreviation you have set for the custom parameter. For example, if you
 * want to call upon the "Strength" custom parameter's value and its set
 * abbreviation is "str", then refer to it as such. This is case sensitive.
 * 
 * An example damage formula would be something like the following if using
 * "str" for "Strength" and "con" for "Constitution":
 * 
 *   a.str - b.con
 * 
 * These values are attached to the Game_Battlerbase prototype class.
 * 
 * ---
 * 
 * Instructions on Setting Custom Parameter Values
 * 
 * This requires JavaScript knowledge. There is no way around it. Whatever code
 * you insert into the "JS: Value" field will return the value desired. The
 * 'user' variable will refer to the Game_Battlerbase prototype object in which
 * the information is to be drawn from.
 * 
 * Depending on the "type" you've set for the Custom Parameter, the returned
 * value will be rounded using Math.round for integers and left alone if set as
 * a float number.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Screen Resolution Settings
 * ============================================================================
 *
 * Alter various properties to make the game look better for varying screen
 * resolutions. This is mostly for RPG Maker MZ version 1.3.0 and up where the
 * Troops tab has been updated to match the screen resolution settings found in
 * the System 2 Database tab.
 *
 * ---
 *
 * Troops
 * 
 *   Reposition Actors:
 *   - Update the position of actors in battle if the screen resolution
 *     has changed to become larger than 816x624.
 *   - Ignore if using the VisuStella MZ Battle Core.
 *   - When using the VisuStella MZ Battle Core, adjust the position through
 *     Battle Core > Parameters > Actor Battler Settings > JS: Home Position
 *
 *   Reposition Enemies:
 *   - Update the position of enemies in battle if the screen resolution
 *     has changed to become larger than 816x624.
 * 
 *     For MZ 1.3.0+?:
 *     - Both this parameter and its parent parameter need to be on when using
 *       RPG Maker MZ 1.3.0+.
 *     - If the Core Script is below 1.3.0, this setting is ignored. This does
 *       not take into account what version the editor is on. Pay attention to
 *       that as the plugin will not auto adjust for it.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Screen Shake Settings
 * ============================================================================
 *
 * Get more screen shake effects into your game!
 * 
 * These effects have been added by Aries of Sheratan!
 *
 * ---
 *
 * Settings
 * 
 *   Default Style:
 *   - The default style used for screen shakes.
 *   - Original
 *   - Random
 *   - Horizontal
 *   - Vertical
 * 
 *   JS: Original Style:
 *   JS: Random Style
 *   JS: Horizontal Style
 *   JS: Vertical Style
 *   - This code gives you control over screen shake for this screen
 *     shake style.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Title Command List Settings
 * ============================================================================
 *
 * This plugin parameter allows you to adjust the commands that appear on the
 * title screen. Some JavaScript knowledge is needed.
 *
 * ---
 *
 * Title Command
 * 
 *   Symbol:
 *   - The symbol used for this command.
 * 
 *   STR: Text:
 *   - Displayed text used for this title command.
 *   - If this has a value, ignore the JS: Text version.
 * 
 *   JS: Text:
 *   - JavaScript code used to determine string used for the displayed name.
 * 
 *   JS: Show:
 *   - JavaScript code used to determine if the item is shown or not.
 * 
 *   JS: Enable:
 *   - JavaScript code used to determine if the item is enabled or not.
 * 
 *   JS: Ext:
 *   - JavaScript code used to determine any ext data that should be added.
 * 
 *   JS: Run Code:
 *   - JavaScript code that runs once this command is selected.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Title Picture Buttons Settings
 * ============================================================================
 *
 * These allow you to insert picture buttons on your title screen that can
 * send users to various links on the internet when clicked.
 *
 * ---
 *
 * Settings
 * 
 *   Picture's Filename:
 *   - Filename used for the picture.
 * 
 *   Button URL:
 *   - URL for the button to go to upon being clicked.
 * 
 *   JS: Position:
 *   - JavaScript code that helps determine the button's Position.
 * 
 *   JS: On Load:
 *   - JavaScript code that runs once this button bitmap is loaded.
 * 
 *   JS: Run Code:
 *   - JavaScript code that runs once this button is pressed.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: UI Settings
 * ============================================================================
 *
 * In previous iterations of RPG Maker, the Core Engine would allow you to
 * change the screen resolution. In MZ, that functionality is provided by
 * default but a number of UI settings still remain. These settings allow you
 * adjust how certain in-game objects and menus are displayed.
 *
 * ---
 *
 * UI Area
 *
 *   Fade Speed:
 *   - Default fade speed for transitions.
 *
 *   Box Margin:
 *   - Set the margin in pixels for the screen borders.
 *
 *   Command Window Width:
 *   - Sets the width for standard Command Windows.
 *
 *   Bottom Help Window:
 *   - Put the Help Window at the bottom of the screen?
 *
 *   Right Aligned Menus:
 *   - Put most command windows to the right side of the screen.
 *
 *   Show Buttons:
 *   - Show clickable buttons in your game?
 * 
 *     Show Cancel Button:
 *     Show Menu Button:
 *     Show Page Up/Down:
 *     Show Number Buttons:
 *     - Show/hide these respective buttons if the above is enabled.
 *     - If 'Show Buttons' is false, these will be hidden no matter what.
 *
 *   Button Area Height:
 *   - Sets the height for the button area.
 *
 *   Bottom Buttons:
 *   - Put the buttons at the bottom of the screen?
 *
 *   Side Buttons:
 *   - Push buttons to the side of the UI if there is room.
 *
 * ---
 *
 * Larger Resolutions
 *
 * ---
 *
 * Menu Objects
 *
 *   Level -> EXP Gauge:
 *   - Draw an EXP Gauge under the drawn level.
 *
 *   Parameter Arrow:
 *   - The arrow used to show changes in the parameter values.
 *
 * ---
 *
 * Text Code Support
 *
 *   Class Names:
 *   - Make class names support text codes?
 *
 *   Nicknames:
 *   - Make nicknames support text codes?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Window Settings
 * ============================================================================
 *
 * Adjust the default settings of the windows in-game. This ranges from things
 * such as the line height (to better fit your font size) to the opacity level
 * (to fit your window skins).
 *
 * ---
 *
 * Window Defaults
 * 
 *   Line Height:
 *   - Default line height used for standard windows.
 * 
 *   Item Height Padding:
 *   - Default padding for selectable items.
 * 
 *   Item Padding:
 *   - Default line padding used for standard windows.
 * 
 *   Back Opacity:
 *   - Default back opacity used for standard windows.
 *   - As of version 1.3.0, this is no longer needed.
 *   - This will still work for lower versions.
 * 
 *   Translucent Opacity:
 *   - Default translucent opacity used for standard windows.
 * 
 *   Window Opening Speed:
 *   - Default open speed used for standard windows.
 *   - Default: 32 (Use a number between 0-255)
 * 
 *   Column Spacing:
 *   - Default column spacing for selectable windows.
 *   - Default: 8
 * 
 *   Row Spacing:
 *   - Default row spacing for selectable windows.
 *   - Default: 4
 *
 * ---
 * 
 * Selectable Items:
 * 
 *   Show Background?:
 *   - Selectable menu items have dark boxes behind them. Show them?
 * 
 *   Item Height Padding:
 *   - Default padding for selectable items.
 * 
 *   JS: Draw Background:
 *   - Code used to draw the background rectangle behind clickable menu objects
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: JS: Quick Functions
 * ============================================================================
 * 
 * WARNING: This feature is highly experimental! Use it at your own risk!
 * 
 * JavaScript Quick Functions allow you to quickly declare functions in the
 * global namespace for ease of access. It's so that these functions can be
 * used in Script Calls, Control Variable Script Inputs, Conditional Branch
 * Script Inputs, Damage Formulas, and more.
 * 
 * ---
 * 
 * JS: Quick Function
 * 
 *   Function Name:
 *   - The function's name in the global namespace.
 *   - Will not overwrite functions/variables of the same name.
 * 
 *   JS: Code:
 *   - Run this code when using the function.
 * 
 * ---
 * 
 * If you have a Function Name of "Example", then typing "Example()" in a
 * Script Call, Conditional Branch Script Input, or similar field will yield
 * whatever the code is instructed to return.
 * 
 * If a function or variable of a similar name already exists in the global
 * namespace, then the quick function will be ignored and not created.
 * 
 * If a quick function contains bad code that would otherwise crash the game,
 * a fail safe has been implemented to prevent it from doing so, display an
 * error log, and then return a 0 value.
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
 * ============================================================================
 * Credits
 * ============================================================================
 * 
 * If you are using this plugin, credit the following people in your game:
 *
 * Team VisuStella
 * * Yanfly
 * * Arisu
 * * Olivia
 * * Irina
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 * 
 * Version 1.52: December 16, 2021
 * * Compatibility Update!
 * ** RPG Maker MZ 1.4.0 compatibility update!
 * *** MV Animations played on screen level will now show up properly in the
 *     center of the screen.
 * 
 * Version 1.51: December 9, 2021
 * * Bug Fixes!
 * ** RPG Maker MZ Bug Fix!
 * *** In the battle status windows, whenever actor names are displayed, the
 *     bitmap used to display their name text do not extend vertically all the
 *     way, causing letters like lowercase "Q" and "G" to be cut off, making
 *     them hard to distinguish from one another. The Core Engine will remedy
 *     this by extending the bitmap to allow enough room. Fix made by Irina.
 * 
 * Version 1.50: November 4, 2021
 * * Bug Fixes!
 * ** RPG Maker MZ Bug Fix!
 * *** By default, if the attack skill is sealed via a trait and an actor has
 *     auto-battle, the action can still be used via auto-battle. This is now
 *     fixed and actors should not be able to attack via auto-battle if their
 *     attack ability is sealed. Fix made by Yanfly.
 * * Documentation Update!
 * ** Help file updated for new RPG Maker MZ bug fix.
 * 
 * Version 1.49: October 28, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Feature!
 * ** New Plugin Command added by Arisu and sponsored by Anon:
 * *** Map: Once Parallel
 * **** Plays a Common Event parallel to the event once without repeating
 *      itself when done. Map only!
 * **** When exiting map scene or changing maps, all Once Parallels are cleared
 * **** Once Parallels are not retained upon reentering the scene or map.
 * **** Once Parallels are not stored in memory and cannot be saved.
 * 
 * Version 1.48: October 21, 2021
 * * Feature Update!
 * ** Bitmap.blt function will now have source coordinates and destination X
 *    and Y coordinates rounded to prevent blurring. Update made by Olivia.
 * 
 * Version 1.47: October 14, 2021
 * * Bug Fixes!
 * ** Prevents Number Input window from having a NaN value due to holding down
 *    the fast forward key. Fix made by Arisu.
 * * Compatibility Update
 * ** Added compatibility functionality for future plugins.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Feature!
 * ** New Plugin Parameter added by Yanfly:
 * *** Plugin Parameters > QoL Settings > Misc > Font Width Fix
 * **** Fixes the font width issue with non-monospaced fonts in the Message
 *      Window. This is now an optional fix.
 * 
 * Version 1.46: September 23, 2021
 * * Documentation Update!
 * ** Added line to Plugin Command: "System: Battle System Change":
 * *** Some battle systems REQUIRE their specific plugins!
 * ** Added lines to "Plugin Parameters: Battle System":
 * *** Some battle systems REQUIRE their specific plugins! This means if you do
 *     not have the required battle system plugin installed, it will not change
 *     over. The Core Engine plugin does not contain data for all of the battle
 *     systems inside its code.
 * 
 * Version 1.45: September 17, 2021
 * * Bug Fixes!
 * ** Fixed a problem with "Picture: Coordinates Mode" to properly utilize the
 *    correct picture ID. Fix made by Arisu.
 * ** RPG Maker MZ Bug Fix:
 * *** Instant Text Discrepancy for Window_Message
 * **** Window_Message displays text differently when it draws letters one by
 *      one versus when the text is displayed instantly. This isn't noticeable
 *      with the default font, but it's very visible when using something like
 *      Arial. The error is due to Bitmap.measureTextWidth yielding a rounded
 *      value per letter versus per word. The Core Engine will provide a bug
 *      fix that will single out the cause and make it so that only
 *      Window_Message will not utilize any round number values when
 *      determining the width of each letter, whether or not it is shown
 *      instantly. This change will only affect Window_Message and not any
 *      other window in order to prevent unintended side effects.
 * **** Fix made by Yanfly.
 * * Compatibility Update!
 * ** RPG Maker MZ 1.3.3 compatibility.
 * *** Updated how gauges are drawn.
 * * Documentation Update!
 * ** Help file updated for new RPG Maker MZ bug fix.
 * 
 * Version 1.44: August 20, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Command added by Irina and sponsored by Anon.
 * *** "Animation: Play at Coordinate"
 * **** Plays an animation on the screen at a specific x, y coordinate even if
 *      there is no sprite attached.
 * 
 * Version 1.43: July 23, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Command added by Irina and sponsored by Archeia!
 * *** "Picture: Coordinates Mode"
 * **** Play Test Mode only!
 * **** Gets the coordinates of a specific picture as you move it across the
 *      screen.
 * **** Helpful for those who don't want to do guess work on the screen
 *      coordinates when it comes to placing down pictures.
 * 
 * Version 1.42: July 16, 2021
 * * Documentation Update
 * ** Added text to "Plugin Parameters: Color Settings" for clarification:
 * *** If the game's Window Skin is changed mid-game, the colors used will
 *     still be based off the default Window Skin's colors. This is due to
 *     storing them in a cache and preventing extra processing and reduces lag.
 * 
 * Version 1.41: July 2, 2021
 * * Compatibility Update
 * ** Further compatibility update with RPG Maker MZ 1.3.0+.
 * * Documentation Update
 * ** Added extra notes to "Important Changes: Bug Fixes" section for the
 *    "Window Skin Bleeding" bug:
 * *** This bug is fixed in the core scripts for RPG Maker MZ v1.3.0+.
 * 
 * Version 1.40: June 25, 2021
 * * Compatibility Update
 * ** Compatibility update with RPG Maker MZ 1.3.0+.
 * * Documentation Update:
 * ** Plugin Parameters > Window Settings > Back Opacity
 * *** As of version 1.3.0, this is no longer needed.
 * *** This will still work for lower versions.
 * ** Help file updated for new features.
 * * Feature Updates!
 * ** Window Skin Bleeding fix updated to newest version.
 * * New Plugin Parameters added:
 * ** Plugin Parmaeters > Screen Resolution Settings
 * *** These settings have been moved from the UI settings to be its own thing.
 * **** This is mostly for RPG Maker MZ version 1.3.0 and up where the Troops
 *      tab has been updated to match the screen resolution settings found in
 *      the System 2 Database tab.
 * *** Reposition Enemies > For MZ 1.3.0+?
 * **** Both of these plugin parameters need to be set to true in order for the
 *      repositioning to work for MZ v1.3.0.
 * **** If the Core Script is below 1.3.0, this setting is ignored. This does
 *      not take into account what version the editor is on. Pay attention to
 *      that as the plugin will not auto adjust for it.
 * 
 * Version 1.39: June 18, 2021
 * * Bug Fixes!
 * ** Number Inputs should now work with the controller if keyboard Number
 *    Input is enabled. Fix made by Olivia.
 * ** RPG Maker Bug: Termination Clear Effects
 * *** In RPG Maker MZ, requesting an animation while transitioning between
 *     scenes, such as going from the map scene to the battle scene, can cause
 *     crashes. This is because the animation queue does not take off
 *     immediately and will likely register incorrect targets for the scene.
 *     This plugin will forcefully clear any registered animations and balloon
 *     effects when terminating a scene in order to prevent crashes.
 * * Documentation Update!
 * ** Help file updated for updated features.
 * * Feature Update!
 * ** <Battle View: x> Troop Name tags can now work with comment tags.
 * ** <Battle System: x> Troop Name tags can now work with comment tags.
 * *** Updates made by Irina.
 * 
 * Version 1.38: June 11, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Command added by Irina and sponsored by Caz!
 * *** Picture: Show Icon
 * **** Shows an icon instead of a picture image.
 * **** The picture icon can be controlled like any other picture.
 * 
 * Version 1.37: May 21, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Commands added by Arisu:
 * *** Switches: Randomize ID(s)
 * *** Switches: Randomize Range
 * *** Switches: Toggle ID(s)
 * *** Switches: Toggle Range
 * **** These Plugin Commands allow you to randomize the ON/OFF positions of
 *      switches or toggle them so that they flip their ON/OFF status.
 * 
 * Version 1.36: May 14, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Commands added by Irina:
 * *** Export: All Maps Text
 * *** Export: All Troops Text
 * *** Export: Current Map Text
 * *** Export: Current Troop Text
 * **** Play Test Only Plugin Commands. These Plugin Commands are used for
 *      extracting all messages, show choices, comments, and scrolling text to
 *      parse and export them as a TXT file. Useful for getting a game's script
 *      to a voice actor or voice actress.
 * 
 * Version 1.35: May 7, 2021
 * * Documentation Update!
 * ** Added the following text to "Parameter Settings" Plugin Parameters for
 *    extra clarity regarding Parameter Caps:
 * *** These settings DO NOT raise the editor's maximum values. If you want to
 *     raise an enemy's maximum parameter value past their default cap, use the
 *     associated notetag for them instead.
 * 
 * Version 1.34: April 23, 2021
 * * Bug Fixes!
 * ** For the vanilla Equip Status window, custom parameters with integer
 *    values will now show up as integers and not percentiles. Fix by Olivia.
 * * Documentation Update!
 * ** Added clarity to the <param: x> notetag for enemies.
 * *** This notetag does NOT work with X Parameters, S Parameters, or any
 *     custom parameters. This notetag ONLY works with the base parameters.
 * 
 * Version 1.33: April 9, 2021
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: Window Skin Bleeding
 * *** Since the v1.2.0 update, Window.prototype._refreshBack's frame value has
 *     been set from 96 to 95. This results in the window skin bleeding past
 *     the window's intended borders. The Core Engine now reverts this change
 *     to prevent the bleeding effect from happening.
 * * Feature Update!
 * ** "Encounter Rate Minimum" now has a valid minimum value of 1. Update made
 *    by Olivia.
 * 
 * Version 1.32: April 2, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameters added by Yanfly:
 * *** Plugin Parameters > QoL Settings > Battle Test > Add Item Type
 * *** Plugin Parameters > QoL Settings > Battle Test > Add Weapon Type
 * *** Plugin Parameters > QoL Settings > Battle Test > Add Armor Type
 * *** Plugin Parameters > QoL Settings > Battle Test > Added Quantity
 * **** By default, RPG Maker MZ only adds 99 of items and not weapons or armor
 *      making it awkward for testing specific battle mechanics. These settings
 *      allow you to add in custom amounts of items, weapons, and/or armors if
 *      you so wish.
 * 
 * Version 1.31: March 26, 2021
 * * Feature Update!
 * ** Title screen buttons will now become fully opaque when hovered over them
 *    instead of only when pressed. Update made by Yanfly.
 * 
 * Version 1.30: March 19, 2021
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: Invisible Battle Sprites
 * *** If you removed a party member during battle and added that exact party
 *     member back into the same slot, their sprite would appear invisible. The
 *     VisuStella Core Engine will fix this problem and prevent it from
 *     happening. Fix made by Olivia.
 * * Compatibility Update
 * ** Added compatibility functionality for future plugins.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameter added by Arisu:
 * *** Plugin Parameters > QoL Settings > Misc > Ani: Mirror Offset
 * **** When animations are mirrored, mirror their Offset X values, too.
 * ** New animation name tags added by Arisu:
 * *** <Mirror Offset X> and <No Mirror Offset X>
 * **** If these text tags are placed in an animation's name, it will cause the
 *      offset X value to be mirrored when the animation is mirrored or have it
 *      ignored despite being mirrored.
 * 
 * Version 1.29: March 12, 2021
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: Interactable window client area does not conform to the
 *    window's declared scale when the scale is anything but 1.0. This will now
 *    be fixed through this plugin. Fix made by Olivia.
 * * Documentation Update!
 * ** Added documentation for new RPG Maker MZ bug fixes!
 * ** Help file updated for updated features.
 * * Feature Update!
 * ** Name Input should be more controller-friendly. If a controller is
 *    connected upon entering the name change scene, it will use the default
 *    manual-entry mode instead of the keyboard-entry mode. If a controller
 *    button is pressed during the keyboard-entry mode, it will automatically
 *    switch to the manual-entry mode.
 * ** This plugin does not provide support for controllers that are undetected
 *    by RPG Maker MZ's default controller support.
 * ** This feature was already implemented since version 1.27 but wasn't
 *    documented so here we are. Update made by Irina.
 * 
 * Version 1.28: March 5, 2021
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: The arrows drawn by a window skin will no longer by
 *    placed on a half pixel when a window's size is an odd number. This would
 *    cause sprite tearing problems and look awful. Fix made by Irina.
 * * Documentation Update!
 * ** Added documentation for new RPG Maker MZ bug fixes!
 * 
 * Version 1.27: February 26, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Moved "Show Scrolling Text, additional functionality" section from Bug
 *    Fixes to Major Changes as it was placed in the wrong section.
 * * New Features!
 * ** New Plugin Parameter added by Yanfly.
 * *** Plugin Parameters > Keyboard Input > Name Input > Banned Words
 * **** Insert words you don't want your players to use for character names.
 * 
 * Version 1.26: February 19, 2021
 * * Bug Fixes!
 * ** Certain Plugin Parameters no longer have settings that restrict them to
 *    a maximum of 1. Fix made by Arisu.
 * * Feature Update!
 * ** Changed the default value for a New Game > Common Event upon Play Testing
 *    to 0 to prevent confusion. Update made by Arisu.
 * 
 * Version 1.25: February 5, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** Show Scrolling Text, additional functionality added by Arisu
 * *** The event command "Show Scrolling Text" now has additional functionality
 *     as long as the VisuStella MZ Core Engine is installed. If the game dev
 *     inserts "// Script Call" (without the quotes) inside the scrolling text,
 *     then the entirity of the Show Scrolling Text event command will be ran
 *     as a giant script call event command.
 * *** The reason why this functionality is added is because the "Script..."
 *     event command contains only 12 lines maximum. This means for any script
 *     call larger than 12 lines of code cannot be done by normal means as each
 *     script call is ran as a separate instance.
 * *** By repurposing the "Show Scrolling Text" event command to be able to
 *     function as an extended "Script..." event command, such a thing is now
 *     possible with less hassle and more lines to code with.
 * *** This effect does not occur if the Show Scrolling Text event command does
 *     not have "// Script Call" in its contents.
 * 
 * Version 1.24: January 29, 2021
 * * Documentation Update!
 * ** Plugin Parameters: Custom Parameters Settings added the following note:
 * *** For clarification, these settings do NOT create brand-new parameters for
 *     you to use and add to your game nor are the bonuses supported by other
 *     plugins in the VisuStella MZ library. These settings exist to function
 *     as a bridge for non-VisuStella MZ plugins that have created their own
 *     parameter values and to show them inside VisuStella menus.
 * * Feature Update!
 * ** Default JS Plugin Parameter for the Title Command: "Shutdown" now has a
 *    note in it that reads: "Do NOT use this command with mobile devices or
 *    browser games. All it does is cause the game to display a blank, black
 *    canvas which the player is unable to do anything with. It does NOT force
 *    close the browser tab nor the app."
 * *** This is also why this command is disabled by default for any non-NodeJS
 *     client deployed game versions.
 * ** Disabled some bug fixes made by the Core Engine for the default RMMZ code
 *    base since the 1.1.1 version now contains those very same fixes.
 * 
 * Version 1.23: January 22, 2021
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.22: January 15, 2021
 * * Documentation Update!
 * ** Added documentation for new RPG Maker MZ bug fixes!
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: Sprite_Timer is added to the spriteset for the parent
 *    scene, making it affected by any filers, zooms, and/or blurs, hindering
 *    its readability.
 * 
 * Version 1.21: January 8, 2021
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * New Features!
 * ** New Plugin Parameters added by Arisu:
 * *** Plugin Parameters > Keyboard Input > Controls > WASD Movement
 * *** Plugin Parameters > Keyboard Input > Controls > R Button: Dash Toggle
 * 
 * Version 1.20: January 1, 2021
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.19: December 25, 2020
 * * Documentation Update!
 * ** Added documentation for new feature(s) and feature updates!
 * * Bug Fixes!
 * ** Fixed typo inside of the comments inside the JS: Quick Functions.
 * * Feature Update!
 * ** Plugin Parameters > Color Settings > Outline Color is now renamed to
 *    Font Outline.
 * * New Features!
 * ** New Plugin Parameters added by Shaz!
 * *** Plugin Parameters > Color Settings > Gauge Number Outline
 * 
 * Version 1.18: December 18, 2020
 * * Bug Fixes!
 * ** Compatible string text from the Items and Equips Core will no longer
 *    register MaxHP and MaxMP as percentile values for the info window.
 * ** RPG Maker MZ Bug: Gamepads no longer go rapidfire after a cleared input.
 *    There is now a period of delay for gamepads after an input clear.
 * ** RPG Maker MZ Bug: Unusable items on an individual-actor basis will no
 *    longer be overwritten by party-based usability for battle. Fix by Yanfly.
 * ** RPG Maker MV animations will no longer crash for unplayable sound
 *    effects. Fix made by Yanfly.
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * ** Added documentation for new RPG Maker MZ bug fixes!
 * * New Features!
 * ** New Plugin Parameters added by Yanfly!
 * *** Plugin Parameters > Button Assist > Key: Shift
 * *** Plugin Parameters > Button Assist > Key: Tab
 * **** These let you assign text codes to the Shift and Tab buttons for the
 *      Button Assist windows.
 * *** Plugin Parameters > QoL Settings > Misc > NewGame > CommonEvent
 * **** For an all version (including non-play test) common event to start new
 *      games with.
 * 
 * Version 1.17: December 11, 2020
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.16: December 4, 2020
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * Feature Update!
 * ** Button Assist Window for the change name scene will now default to "Tab"
 *    for switching between both modes. Update made by Yanfly.
 * * New Features!
 * ** New Plugin Parameter added by Yanfly:
 * *** Plugin Parameters > Keyboard Input > Default Mode
 * **** Select default mode when entering the scene.
 * 
 * Version 1.15: November 29, 2020
 * * Bug Fixes!
 * ** Pressing "Enter" in the change name scene while the actor's name is
 *    completely empty will no longer result in endless buzzer sounds. Fix made
 *    by Arisu.
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * Feature Update!
 * ** For the name change scene, the "Tab" key now also lets the user switch
 *    between the two modes. Update made by Yanfly.
 * * New Features!
 * ** Two new plugin parameters added to Keyboard Input:
 * *** "Switch To Keyboard" and "Switch To Manual"
 * **** These determine the text used for the button assist window when
 *      switching between the two modes. Update made by Yanfly.
 * **** Button Assist window now takes into consideration for these texts.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.14: November 22, 2020
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * New Features!
 * ** New Plugin Command added by Yanfly!
 * *** System: Load Images
 * **** Allows you to (pre) load up images ahead of time.
 * 
 * Version 1.13: November 15, 2020
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.12: November 8, 2020
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * Feature Update!
 * ** Screen Shake Plugin Parameters and JS: Quick Function Plugin Parameters
 *    have been taken off experimental status.
 * * New Features!
 * ** New plugin parameters added by Arisu.
 * *** Plugin Parameters > Keyboard Input
 * **** Settings for the game that utilize keyboard input. These are primarily
 *      for the name input scene (Scene_Name) and the number input event
 *      command. These settings have only been tested on English keyboards and
 *      may or may not be compatible with other languages, so please disable
 *      these features if they do not fit in with your game.
 * 
 * Version 1.11: November 1, 2020
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * * Feature Update!
 * ** Bitmap smoothing now takes into consideration for rounding coordinates.
 *    Update made by Irina.
 * 
 * Version 1.10: October 25, 2020
 * * Feature Update!
 * ** Sprite animation location now adjusts position relative to the sprite's
 *    scale, too. Update made by Arisu.
 *
 * Version 1.09: October 18, 2020
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: Auto Battle Lock Up. Fixed by Yanfly.
 * *** If an auto battle Actor fights against an enemy whose DEF/MDF is too
 *     high, they will not use any actions at all. This can cause potential
 *     game freezing and softlocks. This plugin will change that and have them
 *     default to a regular Attack.
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * 
 * Version 1.08: October 11, 2020
 * * Feature Update!
 * ** Altered sprite bitmaps via the various draw functions will now be marked
 *    as modified and will automatically purge themselves from graphical memory
 *    upon a sprite's removal to free up more resources. Change made by Yanfly.
 * ** Picture Sprite Origin anchors are now tied to the Game_Picture show and
 *    move commands instead of the Game_Interpretter commands. Change by Arisu.
 * 
 * Version 1.07: October 4, 2020
 * * Documentation Update!
 * ** New documentation added for the new Plugin Parameter category:
 *    "Custom Parameters".
 * * New Features!
 * ** New Plugin Parameter "Custom Parameters" added by Yanfly.
 * *** Create custom parameters for your game! These will appear in
 *     VisuStella MZ menus.
 * 
 * Version 1.06: September 27, 2020
 * * Bug Fixes!
 * ** Battler evasion pose can now occur if there is a miss. These were made
 *    separate in RPG Maker MZ and misses didn't enable the evasion pose. Fix
 *    made by Olivia.
 * * New Features!
 * ** New notetags for Maps and name tags for Troops added by Yanfly!
 * *** <Frontview>, <Sideview> to change the battle view for that specific map,
 *     or troop regardless of what other settings are.
 * *** <DTB>, <TPB Active>, <TPB Wait> to change the battle system for that
 *     specific map or troop regardless of what other settings are.
 * 
 * Version 1.05: September 20, 2020
 * * Bug Fixes!
 * ** <Level: x> notetag for enemies is now fixed! Fix made by Arisu.
 * * Documentation Update!
 * ** Documentation added for the new "System: Battle System Change" Plugin
 *    Command and removed the old "System: Set Time Progress Battle".
 * * Feature Update!
 * ** The Plugin Command "System: Set Time Progress Battle" has been replaced
 *    with "System: Battle System Change" instead. This is to accommodate
 *    future plugins that allow for different battle systems. Added by Yanfly.
 * *** If you have previously used "System: Set Time Progress Battle", please
 *     replace them. We apologize for the inconvenience.
 * * New Features!
 * ** In the Core Engine's plugin parameters, you can now set the Battle System
 *    used. This will default to whatever is the game database's setting. This
 *    feature is used for the future when new battle systems are made. Feature
 *    added by Yanfly.
 * 
 * Version 1.04: September 13, 2020
 * * Documentation Update!
 * ** Added new documentation for the "Title Command List" and Title Picture
 *    Buttons" plugin parameters. They now have a dedicated section each.
 * * Feature Updates!
 * ** Moved the "Title Command List" and "Title Picture Buttons" parameters
 *    from the Menu Layout > Title settings. They were far too hidden away and
 *    users had a hard time finding them. Update made by Yanfly.
 * *** Users who have customized these settings before will need to readjust
 *     them again. We apologize for the inconvenience.
 * 
 * Version 1.03: September 6, 2020
 * * Bug Fixes!
 * ** Having QoL > Modern Controls disabled (why would you) used to prevent the
 *    down button from working. It works again. Fix made by Yanfly.
 * * New Feature!
 * ** Plugin default settings now come with a "Game End" option on the title
 *    screen. For those updating from version 1.02 or order, you can add this
 *    in by opening the Core Engine > Plugin Parameters > Menu Layout Settings
 *    > press "delete" on Scene_Title > open it up, then the new settings will
 *    fill in automatically.
 * * New Experimental Feature Added:
 * ** Screen Shake Settings added to the Plugin Parameters.
 * *** Screen Shake: Custom Plugin Command added!
 * *** Credit to Aries of Sheratan, who gave us permission to use her formula.
 * *** We'll be expanding on more screen shaking options in the future.
 * * Optimization Update
 * ** Digit Grouping now works more efficiently.
 * 
 * Version 1.02: August 30, 2020
 * * New Feature!
 * ** New Plugin Command: "Picture: Erase All". Added by Olivia.
 * *** Erases all pictures on the screen because it's extremely tedious to do
 *     it one by one.
 * ** New Plugin Command: "Picture: Erase Range"
 * *** Erases all pictures within a range of numbers because it's extremely
 *     tedious to do it one by one.
 * * Optimization Update
 * ** Added a more accurate means of parsing numbers for Digit Grouping.
 * ** Window_Base.prototype.textSizeEx now stores data to a cache.
 * * Documentation Update
 * ** Added a section to Major Changes: New Hard-Coded Features on
 *    Digit Grouping and explaining its intricacies.
 * ** Added a note to Plugin Parameters > UI > Reposition Actors to ignore the
 *    setting if using the Battle Core.
 * 
 * Version 1.01: August 23, 2020
 * * Bug Fixes!
 * ** Digit grouping fixed to allow text codes to detect values larger than
 *    1000. Fix made by Olivia and Yanfly.
 * ** Param Plus, Rate, Flat notetags fixed. Fix made by Yanfly.
 * * New Experimental Feature Added:
 * ** JS: Quick Functions found in the Plugin Parameters
 *
 * Version 1.00: August 20, 2020
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command AnimationPoint
 * @text Animation: Play at Coordinate
 * @desc Plays an animation on the screen at a specific x, y
 * coordinate even if there is no sprite attached.
 *
 * @arg AnimationID:num
 * @text Animation ID
 * @parent Animation
 * @type animation
 * @desc Plays this animation.
 * @default 1
 * 
 * @arg Coordinates
 *
 * @arg pointX:eval
 * @text X
 * @parent Coordinates
 * @desc X coordinate used for the animation.
 * You may use JavaScript code.
 * @default Graphics.width / 2
 *
 * @arg pointY:eval
 * @text Y
 * @parent Coordinates
 * @desc Y coordinate used for the animation.
 * You may use JavaScript code.
 * @default Graphics.height / 2
 *
 * @arg Mirror:eval
 * @text Mirror Animation?
 * @parent Animation
 * @type boolean
 * @on Mirror
 * @off Normal
 * @desc Mirror the animation?
 * @default false
 *
 * @arg Mute:eval
 * @text Mute Animation?
 * @parent Animation
 * @type boolean
 * @on Mute
 * @off Normal
 * @desc Mute the animation?
 * @default false
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command ExportAllMapText
 * @text Export: All Maps Text
 * @desc PLAY TEST ONLY. Exports all of the text from all maps,
 * their events, event pages, and any associated Common Events.
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command ExportAllTroopText
 * @text Export: All Troops Text
 * @desc PLAY TEST ONLY. Exports all of the text from all troops,
 * their event pages, and any associated Common Events.
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command ExportCurMapText
 * @text Export: Current Map Text
 * @desc PLAY TEST ONLY. Exports all of the text on the current map,
 * its events, the event pages, and any associated Common Events.
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command ExportCurTroopText
 * @text Export: Current Troop Text
 * @desc PLAY TEST ONLY. Exports all of the text on the current troop,
 * the troop's event pages, and any associated Common Events.
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command OpenURL
 * @text Game: Open URL
 * @desc Opens a website URL from the game.
 *
 * @arg URL:str
 * @text URL
 * @desc Where do you want to take the player?
 * @default https://www.google.com/
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command GoldChange
 * @text Gold: Gain/Lose
 * @desc Allows you to give/take more gold than the event editor limit.
 *
 * @arg value:eval
 * @text Value
 * @desc How much gold should the player gain/lose?
 * Use negative values to remove gold.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MapOnceParallel
 * @text Map: Once Parallel
 * @desc Plays a Common Event parallel to the event once without
 * repeating itself when done. Map only!
 *
 * @arg CommonEventID:num
 * @text Common Event ID
 * @type common_event
 * @desc The ID of the parallel Common Event to play.
 * Does NOT repeat itself when finished.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureCoordinatesMode
 * @text Picture: Coordinates Mode
 * @desc Play Test Mode only! Gets the coordinates of a specific
 * picture as you move it across the screen.
 *
 * @arg PictureID:num
 * @text Picture ID
 * @type number
 * @min 1
 * @max 100
 * @desc The ID of the pictures to track the coordinates of.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureEasingType
 * @text Picture: Easing Type
 * @desc Changes the easing type to a number of options.
 *
 * @arg pictureId:num
 * @text Picture ID
 * @type number
 * @min 1
 * @max 100
 * @desc Which picture do you wish to apply this easing to?
 * @default 1
 *
 * @arg easingType:str
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
 * @default Linear
 *
 * @arg LineBreak
 * @text ------------------------
 * @default --------------------------------
 *
 * @arg Instructions1
 * @text Instructions
 * @default Insert this Plugin Command after
 *
 * @arg Instructions2
 * @text -
 * @default a "Move Picture" event command.
 * 
 * @arg Instructions3
 * @text -
 * @default Turn off "Wait for Completion"
 *
 * @arg Instructions4
 * @text -
 * @default in the "Move Picture" event.
 *
 * @arg Instructions5
 * @text -
 * @default You may have to add in your own
 *
 * @arg Instructions6
 * @text -
 * @default "Wait" event command after.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureEraseAll
 * @text Picture: Erase All
 * @desc Erases all pictures on the screen because it's extremely
 * tedious to do it one by one.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureEraseRange
 * @text Picture: Erase Range
 * @desc Erases all pictures within a range of numbers because it's
 * extremely tedious to do it one by one.
 *
 * @arg StartID:num
 * @text Starting ID
 * @type number
 * @min 1
 * @max 100
 * @desc The starting ID of the pictures to erase.
 * @default 1
 *
 * @arg EndingID:num
 * @text Ending ID
 * @type number
 * @min 1
 * @max 100
 * @desc The ending ID of the pictures to erase.
 * @default 100
 *
 * @ --------------------------------------------------------------------------
 * 
 * @command PictureShowIcon
 * @text Picture: Show Icon
 * @desc Shows an icon instead of a picture image.
 * The picture icon can be controlled like any other picture.
 * 
 * @arg General
 * 
 * @arg PictureID:eval
 * @text Picture ID Number
 * @parent General
 * @desc What is the ID of the picture you wish to show at? Use a
 * number between 1 and 100. You may use JavaScript code.
 * @default 1
 * 
 * @arg IconIndex:eval
 * @text Icon Index
 * @parent General
 * @desc Select the icon index to use for this picture.
 * You may use JavaScript code.
 * @default 23
 *
 * @arg Smooth:eval
 * @text Smooth Icon?
 * @parent General
 * @type boolean
 * @on Smooth
 * @off Pixelate
 * @desc This will make the icon smoothed out or pixelated.
 * @default false
 * 
 * @arg PictureSettings
 * @text Picture Settings
 *
 * @arg Settings:struct
 * @text Settings
 * @parent PictureSettings
 * @type struct<ShowPicture>
 * @desc Alter the settings for how the picture will be shown.
 * @default {"Position":"","Origin:num":"0","PositionX:eval":"0","PositionY:eval":"0","Scale":"","ScaleX:eval":"100","ScaleY:eval":"100","Blend":"","Opacity:eval":"255","BlendMode:num":"0"}
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command ScreenShake
 * @text Screen Shake: Custom
 * @desc Creates a custom screen shake effect and also sets
 * the following uses of screen shake to this style.
 *
 * @arg Type:str
 * @text Shake Style
 * @type select
 * @option Original
 * @value original
 * @option Random
 * @value random
 * @option Horizontal
 * @value horizontal
 * @option Vertical
 * @value vertical
 * @desc Select shake style type.
 * @default random
 *
 * @arg Power:num
 * @text Power
 * @type number
 * @min 1
 * @max 9
 * @desc Power level for screen shake.
 * @default 5
 *
 * @arg Speed:num
 * @text Speed
 * @type number
 * @min 1
 * @max 9
 * @desc Speed level for screen shake.
 * @default 5
 *
 * @arg Duration:eval
 * @text Duration
 * @desc Duration of screenshake.
 * You can use code as well.
 * @default 60
 *
 * @arg Wait:eval
 * @text Wait for Completion
 * @parent Duration:eval
 * @type boolean
 * @on Wait
 * @off Don't Wait
 * @desc Wait until completion before moving onto the next event?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SwitchRandomizeOne
 * @text Switches: Randomize ID(s)
 * @desc Select specific Switch ID's to randomize ON/OFF.
 *
 * @arg IDs:arraynum
 * @text Switch ID(s)
 * @type switch[]
 * @desc Select which Switch ID(s) to toggle.
 * @default ["1"]
 *
 * @arg Chance:num
 * @text Chance for ON
 * @type number
 * @min 1
 * @max 100
 * @desc Chance out of 100 that determines the switches to be ON.
 * @default 50
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SwitchRandomizeRange
 * @text Switches: Randomize Range
 * @desc Select specific Switch ID Range to randomize ON/OFF.
 * The ratio determines the ON/OFF distribution.
 *
 * @arg StartID:num
 * @text Starting ID
 * @type switch
 * @desc The starting ID of the Switch to toggle.
 * @default 1
 *
 * @arg EndingID:num
 * @text Ending ID
 * @type switch
 * @desc The ending ID of the Switch to toggle.
 * @default 20
 *
 * @arg Chance:num
 * @text Chance for ON
 * @type number
 * @min 1
 * @max 100
 * @desc Chance out of 100 that determines the switches to be ON.
 * @default 50
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SwitchToggleOne
 * @text Switches: Toggle ID(s)
 * @desc Select specific Switch ID's to toggle ON/OFF.
 * ON becomes OFF. OFF becomes ON.
 *
 * @arg IDs:arraynum
 * @text Switch ID(s)
 * @type switch[]
 * @desc Select which Switch ID(s) to toggle.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SwitchToggleRange
 * @text Switches: Toggle Range
 * @desc Select specific Switch ID Range to toggle ON/OFF.
 * ON becomes OFF. OFF becomes ON.
 *
 * @arg StartID:num
 * @text Starting ID
 * @type switch
 * @desc The starting ID of the Switch to toggle.
 * @default 1
 *
 * @arg EndingID:num
 * @text Ending ID
 * @type switch
 * @desc The ending ID of the Switch to toggle.
 * @default 20
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemSetBattleSystem
 * @text System: Battle System Change
 * @desc Switch to a different battle system in-game.
 * Some battle systems REQUIRE their specific plugins!
 *
 * @arg option:str
 * @text Change To
 * @type select
 * @option Database Default (Use game database setting)
 * @value database
 * @option -
 * @value database
 * @option DTB: Default Turn Battle
 * @value dtb
 * @option TPB Active: Time Progress Battle (Active)
 * @value tpb active
 * @option TPB Wait: Time Progress Battle (Wait)
 * @value tpb wait
 * @option -
 * @value database
 * @option BTB: Brave Turn Battle (Req VisuMZ_2_BattleSystemBTB)
 * @value btb
 * @option CTB: Charge Turn Battle (Req VisuMZ_2_BattleSystemCTB)
 * @value ctb
 * @option ETB: Energy Turn Battle (Req VisuMZ_2_BattleSystemETB)
 * @value etb
 * @option FTB: Free Turn Battle (Req VisuMZ_2_BattleSystemFTB)
 * @value ftb
 * @option OTB: Order Turn Battle (Req VisuMZ_2_BattleSystemOTB)
 * @value otb
 * @option PTB: Press Turn Battle (Req VisuMZ_2_BattleSystemPTB)
 * @value ptb
 * @option STB: Standard Turn Battle (Req VisuMZ_2_BattleSystemSTB)
 * @value stb
 * @desc Choose which battle system to switch to.
 * @default database
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemLoadImages
 * @text System: Load Images
 * @desc Allows you to (pre) load up images ahead of time.
 *
 * @arg animations:arraystr
 * @text img/animations/
 * @type file[]
 * @dir img/animations/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg battlebacks1:arraystr
 * @text img/battlebacks1/
 * @type file[]
 * @dir img/battlebacks1/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg battlebacks2:arraystr
 * @text img/battlebacks2/
 * @type file[]
 * @dir img/battlebacks2/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg characters:arraystr
 * @text img/characters/
 * @type file[]
 * @dir img/characters/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg enemies:arraystr
 * @text img/enemies/
 * @type file[]
 * @dir img/enemies/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg faces:arraystr
 * @text img/faces/
 * @type file[]
 * @dir img/faces/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg parallaxes:arraystr
 * @text img/parallaxes/
 * @type file[]
 * @dir img/parallaxes/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg pictures:arraystr
 * @text img/pictures/
 * @type file[]
 * @dir img/pictures/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg sv_actors:arraystr
 * @text img/sv_actors/
 * @type file[]
 * @dir img/sv_actors/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg sv_enemies:arraystr
 * @text img/sv_enemies/
 * @type file[]
 * @dir img/sv_enemies/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg system:arraystr
 * @text img/system/
 * @type file[]
 * @dir img/system/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg tilesets:arraystr
 * @text img/tilesets/
 * @type file[]
 * @dir img/tilesets/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg titles1:arraystr
 * @text img/titles1/
 * @type file[]
 * @dir img/titles1/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg titles2:arraystr
 * @text img/titles2/
 * @type file[]
 * @dir img/titles2/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemSetFontSize
 * @text System: Main Font Size
 * @desc Set the game's main font size.
 *
 * @arg option:num
 * @text Change To
 * @type number
 * @min 1
 * @desc Change the font size to this number.
 * @default 26
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemSetSideView
 * @text System: Side View Battle
 * @desc Switch between Front View or Side View for battle.
 *
 * @arg option:str
 * @text Change To
 * @type select
 * @option Front View
 * @value Front View
 * @option Side View
 * @value Side View
 * @option Toggle
 * @value Toggle
 * @desc Choose which view type to switch to.
 * @default Toggle
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemSetWindowPadding
 * @text System: Window Padding
 * @desc Change the game's window padding amount.
 *
 * @arg option:num
 * @text Change To
 * @type number
 * @min 1
 * @desc Change the game's standard window padding to this value.
 * Default: 12
 * @default 12
 *
 * @ ==========================================================================
 * @ Plugin Parameters
 * @ ==========================================================================
 *
 * @param BreakHead
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param CoreEngine
 * @default Plugin Parameters
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param QoL:struct
 * @text Quality of Life Settings
 * @type struct<QoLSettings>
 * @desc Quality of Life settings for both developers and players.
 * @default {"PlayTest":"","NewGameBoot:eval":"false","ForceNoPlayTest:eval":"false","OpenConsole:eval":"true","F6key:eval":"true","F7key:eval":"true","NewGameCommonEvent:num":"0","DigitGrouping":"","DigitGroupingStandardText:eval":"true","DigitGroupingExText:eval":"true","DigitGroupingDamageSprites:eval":"true","DigitGroupingGaugeSprites:eval":"true","DigitGroupingLocale:str":"en-US","PlayerBenefit":"","EncounterRateMinimum:num":"10","EscapeAlways:eval":"true","ImprovedAccuracySystem:eval":"true","AccuracyBoost:eval":"true","LevelUpFullHp:eval":"true","LevelUpFullMp:eval":"true","Misc":"","AntiZoomPictures:eval":"true","AutoStretch:str":"stretch","FontShadows:eval":"false","FontSmoothing:eval":"true","KeyItemProtect:eval":"true","ModernControls:eval":"true","NoTileShadows:eval":"true","PixelateImageRendering:eval":"false","RequireFocus:eval":"true","SmartEventCollisionPriority:eval":"true"}
 * 
 * @param BattleSystem:str
 * @text Battle System
 * @type select
 * @option Database Default (Use game database setting)
 * @value database
 * @option -
 * @value database
 * @option DTB: Default Turn Battle
 * @value dtb
 * @option TPB Active: Time Progress Battle (Active)
 * @value tpb active
 * @option TPB wait: Time Progress Battle (Wait)
 * @value tpb wait
 * @option -
 * @value database
 * @option BTB: Brave Turn Battle (Req VisuMZ_2_BattleSystemBTB)
 * @value btb
 * @option CTB: Charge Turn Battle (Req VisuMZ_2_BattleSystemCTB)
 * @value ctb
 * @option ETB: Energy Turn Battle (Req VisuMZ_2_BattleSystemETB)
 * @value etb
 * @option FTB: Free Turn Battle (Req VisuMZ_2_BattleSystemFTB)
 * @value ftb
 * @option OTB: Order Turn Battle (Req VisuMZ_2_BattleSystemOTB)
 * @value otb
 * @option PTB: Press Turn Battle (Req VisuMZ_2_BattleSystemPTB)
 * @value ptb
 * @option STB: Standard Turn Battle (Req VisuMZ_2_BattleSystemSTB)
 * @value stb
 * @desc Choose which battle system to use for your game.
 * Some battle systems REQUIRE their specific plugins!
 * @default database
 *
 * @param Color:struct
 * @text Color Settings
 * @type struct<Color>
 * @desc Change the colors used for in-game text.
 * @default {"BasicColors":"","ColorNormal:str":"0","ColorSystem:str":"16","ColorCrisis:str":"17","ColorDeath:str":"18","ColorGaugeBack:str":"19","ColorHPGauge1:str":"20","ColorHPGauge2:str":"21","ColorMPGauge1:str":"22","ColorMPGauge2:str":"23","ColorMPCost:str":"23","ColorPowerUp:str":"24","ColorPowerDown:str":"25","ColorCTGauge1:str":"26","ColorCTGauge2:str":"27","ColorTPGauge1:str":"28","ColorTPGauge2:str":"29","ColorTPCost:str":"29","ColorPending:str":"#2a847d","ColorExpGauge1:str":"30","ColorExpGauge2:str":"31","ColorMaxLvGauge1:str":"14","ColorMaxLvGauge2:str":"6","AlphaColors":"","OutlineColor:str":"rgba(0, 0, 0, 0.6)","DimColor1:str":"rgba(0, 0, 0, 0.6)","DimColor2:str":"rgba(0, 0, 0, 0)","ItemBackColor1:str":"rgba(32, 32, 32, 0.5)","ItemBackColor2:str":"rgba(0, 0, 0, 0.5)","ConditionalColors":"","ActorHPColor:func":"\"// Set the variables used in this function.\\nlet actor = arguments[0];\\n\\n// Check if the actor exists. If not, return normal.\\nif (!actor) {\\n    return this.normalColor();\\n\\n// If the actor is dead, return death color.\\n} else if (actor.isDead()) {\\n    return this.deathColor();\\n\\n// If the actor is dying, return crisis color.\\n} else if (actor.isDying()) {\\n    return this.crisisColor();\\n\\n// Otherwise, return the normal color.\\n} else {\\n    return this.normalColor();\\n}\"","ActorMPColor:func":"\"// Set the variables used in this function.\\nlet actor = arguments[0];\\n\\n// Check if the actor exists. If not, return normal.\\nif (!actor) {\\n    return this.normalColor();\\n\\n// If MP rate is below 25%, return crisis color.\\n} else if (actor.mpRate() < 0.25) {\\n    return this.crisisColor();\\n\\n// Otherwise, return the normal color.\\n} else {\\n    return this.normalColor();\\n}\"","ActorTPColor:func":"\"// Set the variables used in this function.\\nlet actor = arguments[0];\\n\\n// Check if the actor exists. If not, return normal.\\nif (!actor) {\\n    return this.normalColor();\\n\\n// If TP rate is below 25%, return crisis color.\\n} else if (actor.tpRate() < 0.25) {\\n    return this.crisisColor();\\n\\n// Otherwise, return the normal color.\\n} else {\\n    return this.normalColor();\\n}\"","ParamChange:func":"\"// Set the variables used in this function.\\nlet change = arguments[0];\\n\\n// If a positive change, use power up color.\\nif (change > 0) {\\n    return this.powerUpColor();\\n\\n// If a negative change, use power down color.\\n} else if (change < 0) {\\n    return this.powerDownColor();\\n\\n// Otherwise, return the normal color.\\n} else {\\n    return this.normalColor();\\n}\"","DamageColor:func":"\"// Set the variables used in this function.\\nlet colorType = arguments[0];\\n\\n// Check the value of the color type\\n// and return an appropriate color.\\nswitch (colorType) {\\n\\n    case 0: // HP damage\\n        return \\\"#ffffff\\\";\\n\\n    case 1: // HP recover\\n        return \\\"#b9ffb5\\\";\\n\\n    case 2: // MP damage\\n        return \\\"#bb88bb\\\";\\n\\n    case 3: // MP recover\\n        return \\\"#80b0ff\\\";\\n\\n    default:\\n        return \\\"#808080\\\";\\n}\""}
 *
 * @param Gold:struct
 * @text Gold Settings
 * @type struct<Gold>
 * @desc Change up how gold operates and is displayed in-game.
 * @default {"GoldMax:num":"999999999","GoldFontSize:num":"24","GoldIcon:num":"314","GoldOverlap:str":"A Lot","ItemStyle:eval":"true"}
 *
 * @param ImgLoad:struct
 * @text Image Loading
 * @type struct<ImgLoad>
 * @desc Game images that will be loaded upon booting up the game.
 * Use this responsibly!!!
 * @default {"animations:arraystr":"[]","battlebacks1:arraystr":"[]","battlebacks2:arraystr":"[]","characters:arraystr":"[]","enemies:arraystr":"[]","faces:arraystr":"[]","parallaxes:arraystr":"[]","pictures:arraystr":"[]","sv_actors:arraystr":"[]","sv_enemies:arraystr":"[]","system:arraystr":"[\"Balloon\",\"IconSet\"]","tilesets:arraystr":"[]","titles1:arraystr":"[]","titles2:arraystr":"[]"}
 *
 * @param KeyboardInput:struct
 * @text Keyboard Input
 * @type struct<KeyboardInput>
 * @desc Settings for the game that utilize keyboard input.
 * @default {"Controls":"","WASD:eval":"false","DashToggleR:eval":"false","NameInput":"","EnableNameInput:eval":"true","DefaultMode:str":"keyboard","QwertyLayout:eval":"true","NameInputMessage:eval":"\"Type in this character's name.\\nPress \\\\c[5]ENTER\\\\c[0] when you're done.\\n\\n-or-\\n\\nPress \\\\c[5]arrow keys\\\\c[0]/\\\\c[5]TAB\\\\c[0] to switch\\nto manual character entry.\\n\\nPress \\\\c[5]ESC\\\\c[0]/\\\\c[5]TAB\\\\c[0] to use to keyboard.\"","NumberInput":"","EnableNumberInput:eval":"true","ButtonAssist":"","Keyboard:str":"Keyboard","Manual:str":"Manual"}
 *
 * @param MenuBg:struct
 * @text Menu Background Settings
 * @type struct<MenuBg>
 * @desc Change how menu backgrounds look for each scene.
 * @default {"Scene_Menu:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Item:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Skill:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Equip:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Status:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Options:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Save:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Load:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_GameEnd:struct":"{\"SnapshotOpacity:num\":\"128\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Shop:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Name:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Unlisted:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}"}
 *
 * @param ButtonAssist:struct
 * @text Menu Button Assist Window
 * @type struct<ButtonAssist>
 * @desc Settings pertaining to the Button Assist window found in in-game menus.
 * @default {"General":"","Enable:eval":"true","Location:str":"bottom","BgType:num":"0","Text":"","TextFmt:str":"%1:%2","MultiKeyFmt:str":"%1/%2","OkText:str":"Select","CancelText:str":"Back","SwitchActorText:str":"Switch Ally","Keys":"","KeyUnlisted:str":"\\}❪%1❫\\{","KeyUP:str":"^","KeyDOWN:str":"v","KeyLEFT:str":"<<","KeyRIGHT:str":">>","KeySHIFT:str":"\\}❪SHIFT❫\\{","KeyTAB:str":"\\}❪TAB❫\\{","KeyA:str":"A","KeyB:str":"B","KeyC:str":"C","KeyD:str":"D","KeyE:str":"E","KeyF:str":"F","KeyG:str":"G","KeyH:str":"H","KeyI:str":"I","KeyJ:str":"J","KeyK:str":"K","KeyL:str":"L","KeyM:str":"M","KeyN:str":"N","KeyO:str":"O","KeyP:str":"P","KeyQ:str":"Q","KeyR:str":"R","KeyS:str":"S","KeyT:str":"T","KeyU:str":"U","KeyV:str":"V","KeyW:str":"W","KeyX:str":"X","KeyY:str":"Y","KeyZ:str":"Z"}
 *
 * @param MenuLayout:struct
 * @text Menu Layout Settings
 * @type struct<MenuLayout>
 * @desc Change how menu layouts look for each scene.
 * @default {"Title:struct":"{\"TitleScreen\":\"\",\"DocumentTitleFmt:str\":\"%1: %2 - Version %3\",\"Subtitle:str\":\"Subtitle\",\"Version:str\":\"0.00\",\"drawGameTitle:func\":\"\\\"const x = 20;\\\\nconst y = Graphics.height / 4;\\\\nconst maxWidth = Graphics.width - x * 2;\\\\nconst text = $dataSystem.gameTitle;\\\\nconst bitmap = this._gameTitleSprite.bitmap;\\\\nbitmap.fontFace = $gameSystem.mainFontFace();\\\\nbitmap.outlineColor = \\\\\\\"black\\\\\\\";\\\\nbitmap.outlineWidth = 8;\\\\nbitmap.fontSize = 72;\\\\nbitmap.drawText(text, x, y, maxWidth, 48, \\\\\\\"center\\\\\\\");\\\"\",\"drawGameSubtitle:func\":\"\\\"const x = 20;\\\\nconst y = Graphics.height / 4 + 72;\\\\nconst maxWidth = Graphics.width - x * 2;\\\\nconst text = Scene_Title.subtitle;\\\\nconst bitmap = this._gameTitleSprite.bitmap;\\\\nbitmap.fontFace = $gameSystem.mainFontFace();\\\\nbitmap.outlineColor = \\\\\\\"black\\\\\\\";\\\\nbitmap.outlineWidth = 6;\\\\nbitmap.fontSize = 48;\\\\nbitmap.drawText(text, x, y, maxWidth, 48, \\\\\\\"center\\\\\\\");\\\"\",\"drawGameVersion:func\":\"\\\"const bitmap = this._gameTitleSprite.bitmap;\\\\nconst x = 0;\\\\nconst y = Graphics.height - 20;\\\\nconst width = Math.round(Graphics.width / 4);\\\\nconst height = 20;\\\\nconst c1 = ColorManager.dimColor1();\\\\nconst c2 = ColorManager.dimColor2();\\\\nconst text = 'Version ' + Scene_Title.version;\\\\nbitmap.gradientFillRect(x, y, width, height, c1, c2);\\\\nbitmap.fontFace = $gameSystem.mainFontFace();\\\\nbitmap.outlineColor = \\\\\\\"black\\\\\\\";\\\\nbitmap.outlineWidth = 3;\\\\nbitmap.fontSize = 16;\\\\nbitmap.drawText(text, x + 4, y, Graphics.width, height, \\\\\\\"left\\\\\\\");\\\"\",\"CommandRect:func\":\"\\\"const offsetX = $dataSystem.titleCommandWindow.offsetX;\\\\nconst offsetY = $dataSystem.titleCommandWindow.offsetY;\\\\nconst rows = this.commandWindowRows();\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = (Graphics.boxWidth - width) / 2 + offsetX;\\\\nconst y = Graphics.boxHeight - height - 96 + offsetY;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ButtonFadeSpeed:num\":\"4\"}","MainMenu:struct":"{\"CommandWindow\":\"\",\"CommandBgType:num\":\"0\",\"CommandRect:func\":\"\\\"const width = this.mainCommandWidth();\\\\nconst height = this.mainAreaHeight() - this.goldWindowRect().height;\\\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"GoldWindow\":\"\",\"GoldBgType:num\":\"0\",\"GoldRect:func\":\"\\\"const rows = 1;\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\\\nconst y = this.mainAreaBottom() - height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const width = Graphics.boxWidth - this.mainCommandWidth();\\\\nconst height = this.mainAreaHeight();\\\\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","ItemMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.helpAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.helpAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"CategoryWindow\":\"\",\"CategoryBgType:num\":\"0\",\"CategoryRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ItemWindow\":\"\",\"ItemBgType:num\":\"0\",\"ItemRect:func\":\"\\\"const x = 0;\\\\nconst y = this._categoryWindow.y + this._categoryWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaBottom() - y;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ActorWindow\":\"\",\"ActorBgType:num\":\"0\",\"ActorRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","SkillMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.helpAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.helpAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"SkillTypeWindow\":\"\",\"SkillTypeBgType:num\":\"0\",\"SkillTypeRect:func\":\"\\\"const rows = 3;\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const width = Graphics.boxWidth - this.mainCommandWidth();\\\\nconst height = this._skillTypeWindow.height;\\\\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ItemWindow\":\"\",\"ItemBgType:num\":\"0\",\"ItemRect:func\":\"\\\"const x = 0;\\\\nconst y = this._statusWindow.y + this._statusWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight() - this._statusWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ActorWindow\":\"\",\"ActorBgType:num\":\"0\",\"ActorRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","EquipMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.helpAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.helpAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst width = this.statusWidth();\\\\nconst height = this.mainAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"CommandWindow\":\"\",\"CommandBgType:num\":\"0\",\"CommandRect:func\":\"\\\"const x = this.statusWidth();\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth - this.statusWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"SlotWindow\":\"\",\"SlotBgType:num\":\"0\",\"SlotRect:func\":\"\\\"const commandWindowRect = this.commandWindowRect();\\\\nconst x = this.statusWidth();\\\\nconst y = commandWindowRect.y + commandWindowRect.height;\\\\nconst width = Graphics.boxWidth - this.statusWidth();\\\\nconst height = this.mainAreaHeight() - commandWindowRect.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ItemWindow\":\"\",\"ItemBgType:num\":\"0\",\"ItemRect:func\":\"\\\"return this.slotWindowRect();\\\"\"}","StatusMenu:struct":"{\"ProfileWindow\":\"\",\"ProfileBgType:num\":\"0\",\"ProfileRect:func\":\"\\\"const width = Graphics.boxWidth;\\\\nconst height = this.profileHeight();\\\\nconst x = 0;\\\\nconst y = this.mainAreaBottom() - height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.statusParamsWindowRect().y - y;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusParamsWindow\":\"\",\"StatusParamsBgType:num\":\"0\",\"StatusParamsRect:func\":\"\\\"const width = this.statusParamsWidth();\\\\nconst height = this.statusParamsHeight();\\\\nconst x = 0;\\\\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusEquipWindow\":\"\",\"StatusEquipBgType:num\":\"0\",\"StatusEquipRect:func\":\"\\\"const width = Graphics.boxWidth - this.statusParamsWidth();\\\\nconst height = this.statusParamsHeight();\\\\nconst x = this.statusParamsWidth();\\\\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","OptionsMenu:struct":"{\"OptionsWindow\":\"\",\"OptionsBgType:num\":\"0\",\"OptionsRect:func\":\"\\\"const n = Math.min(this.maxCommands(), this.maxVisibleCommands());\\\\nconst width = 400;\\\\nconst height = this.calcWindowHeight(n, true);\\\\nconst x = (Graphics.boxWidth - width) / 2;\\\\nconst y = (Graphics.boxHeight - height) / 2;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","SaveMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.calcWindowHeight(rows, false);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ListWindow\":\"\",\"ListBgType:num\":\"0\",\"ListRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop() + this._helpWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight() - this._helpWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","LoadMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.calcWindowHeight(rows, false);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ListWindow\":\"\",\"ListBgType:num\":\"0\",\"ListRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop() + this._helpWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight() - this._helpWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","GameEnd:struct":"{\"CommandList:arraystruct\":\"[\\\"{\\\\\\\"Symbol:str\\\\\\\":\\\\\\\"toTitle\\\\\\\",\\\\\\\"TextStr:str\\\\\\\":\\\\\\\"Untitled\\\\\\\",\\\\\\\"TextJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return TextManager.toTitle;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ShowJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"EnableJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ExtJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return null;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"CallHandlerJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"SceneManager._scene.commandToTitle();\\\\\\\\\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"Symbol:str\\\\\\\":\\\\\\\"cancel\\\\\\\",\\\\\\\"TextStr:str\\\\\\\":\\\\\\\"Untitled\\\\\\\",\\\\\\\"TextJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return TextManager.cancel;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ShowJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"EnableJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ExtJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return null;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"CallHandlerJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"SceneManager._scene.popScene();\\\\\\\\\\\\\\\"\\\\\\\"}\\\"]\",\"CommandBgType:num\":\"0\",\"CommandRect:func\":\"\\\"const rows = 2;\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = (Graphics.boxWidth - width) / 2;\\\\nconst y = (Graphics.boxHeight - height) / 2;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","ShopMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const wx = 0;\\\\nconst wy = this.helpAreaTop();\\\\nconst ww = Graphics.boxWidth;\\\\nconst wh = this.helpAreaHeight();\\\\nreturn new Rectangle(wx, wy, ww, wh);\\\"\",\"GoldWindow\":\"\",\"GoldBgType:num\":\"0\",\"GoldRect:func\":\"\\\"const rows = 1;\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = Graphics.boxWidth - width;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"CommandWindow\":\"\",\"CommandBgType:num\":\"0\",\"CommandRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = this._goldWindow.x;\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"DummyWindow\":\"\",\"DummyBgType:num\":\"0\",\"DummyRect:func\":\"\\\"const x = 0;\\\\nconst y = this._commandWindow.y + this._commandWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight() - this._commandWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"NumberWindow\":\"\",\"NumberBgType:num\":\"0\",\"NumberRect:func\":\"\\\"const x = 0;\\\\nconst y = this._dummyWindow.y;\\\\nconst width = Graphics.boxWidth - this.statusWidth();\\\\nconst height = this._dummyWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const width = this.statusWidth();\\\\nconst height = this._dummyWindow.height;\\\\nconst x = Graphics.boxWidth - width;\\\\nconst y = this._dummyWindow.y;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"BuyWindow\":\"\",\"BuyBgType:num\":\"0\",\"BuyRect:func\":\"\\\"const x = 0;\\\\nconst y = this._dummyWindow.y;\\\\nconst width = Graphics.boxWidth - this.statusWidth();\\\\nconst height = this._dummyWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"CategoryWindow\":\"\",\"CategoryBgType:num\":\"0\",\"CategoryRect:func\":\"\\\"const x = 0;\\\\nconst y = this._dummyWindow.y;\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"SellWindow\":\"\",\"SellBgType:num\":\"0\",\"SellRect:func\":\"\\\"const x = 0;\\\\nconst y = this._categoryWindow.y + this._categoryWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height =\\\\n    this.mainAreaHeight() -\\\\n    this._commandWindow.height -\\\\n    this._categoryWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","NameMenu:struct":"{\"EditWindow\":\"\",\"EditBgType:num\":\"0\",\"EditRect:func\":\"\\\"const rows = 9;\\\\nconst inputWindowHeight = this.calcWindowHeight(rows, true);\\\\nconst padding = $gameSystem.windowPadding();\\\\nconst width = 600;\\\\nconst height = Math.min(ImageManager.faceHeight + padding * 2, this.mainAreaHeight() - inputWindowHeight);\\\\nconst x = (Graphics.boxWidth - width) / 2;\\\\nconst y = (this.mainAreaHeight() - (height + inputWindowHeight)) / 2 + this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"InputWindow\":\"\",\"InputBgType:num\":\"0\",\"InputRect:func\":\"\\\"const x = this._editWindow.x;\\\\nconst y = this._editWindow.y + this._editWindow.height;\\\\nconst rows = 9;\\\\nconst width = this._editWindow.width;\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}"}
 *
 * @param Param:struct
 * @text Parameter Settings
 * @type struct<Param>
 * @desc Change up the limits of parameters and how they're calculated.
 * @default {"DisplayedParams:arraystr":"[\"ATK\",\"DEF\",\"MAT\",\"MDF\",\"AGI\",\"LUK\"]","ExtDisplayedParams:arraystr":"[\"MaxHP\",\"MaxMP\",\"ATK\",\"DEF\",\"MAT\",\"MDF\",\"AGI\",\"LUK\"]","BasicParameters":"","CrisisRate:num":"0.25","BasicParameterFormula:func":"\"// Determine the variables used in this calculation.\\nlet paramId = arguments[0];\\nlet base = this.paramBase(paramId);\\nlet plus = this.paramPlus(paramId);\\nlet paramRate = this.paramRate(paramId);\\nlet buffRate = this.paramBuffRate(paramId);\\nlet flatBonus = this.paramFlatBonus(paramId);\\n\\n// Formula to determine total parameter value.\\nlet value = (base + plus) * paramRate * buffRate + flatBonus;\\n\\n// Determine the limits\\nconst maxValue = this.paramMax(paramId);\\nconst minValue = this.paramMin(paramId);\\n\\n// Final value\\nreturn Math.round(value.clamp(minValue, maxValue));\"","BasicParamCaps":"","BasicActorParamCaps":"","BasicActorParamMax0:str":"9999","BasicActorParamMax1:str":"9999","BasicActorParamMax2:str":"999","BasicActorParamMax3:str":"999","BasicActorParamMax4:str":"999","BasicActorParamMax5:str":"999","BasicActorParamMax6:str":"999","BasicActorParamMax7:str":"999","BasicEnemyParamCaps":"","BasicEnemyParamMax0:str":"999999","BasicEnemyParamMax1:str":"9999","BasicEnemyParamMax2:str":"999","BasicEnemyParamMax3:str":"999","BasicEnemyParamMax4:str":"999","BasicEnemyParamMax5:str":"999","BasicEnemyParamMax6:str":"999","BasicEnemyParamMax7:str":"999","XParameters":"","XParameterFormula:func":"\"// Determine the variables used in this calculation.\\nlet xparamId = arguments[0];\\nlet base = this.traitsSum(Game_BattlerBase.TRAIT_XPARAM, xparamId);\\nlet plus = this.xparamPlus(xparamId);\\nlet paramRate = this.xparamRate(xparamId);\\nlet flatBonus = this.xparamFlatBonus(xparamId);\\n\\n// Formula to determine total parameter value.\\nlet value = (base + plus) * paramRate + flatBonus;\\n\\n// Final value\\nreturn value;\"","XParamVocab":"","XParamVocab0:str":"Hit","XParamVocab1:str":"Evasion","XParamVocab2:str":"Critical Rate","XParamVocab3:str":"Critical Evade","XParamVocab4:str":"Magic Evade","XParamVocab5:str":"Magic Reflect","XParamVocab6:str":"Counter","XParamVocab7:str":"HP Regen","XParamVocab8:str":"MP Regen","XParamVocab9:str":"TP Regen","SParameters":"","SParameterFormula:func":"\"// Determine the variables used in this calculation.\\nlet sparamId = arguments[0];\\nlet base = this.traitsPi(Game_BattlerBase.TRAIT_SPARAM, sparamId);\\nlet plus = this.sparamPlus(sparamId);\\nlet paramRate = this.sparamRate(sparamId);\\nlet flatBonus = this.sparamFlatBonus(sparamId);\\n\\n// Formula to determine total parameter value.\\nlet value = (base + plus) * paramRate + flatBonus;\\n\\n// Final value\\nreturn value;\"","SParamVocab":"","SParamVocab0:str":"Aggro","SParamVocab1:str":"Guard","SParamVocab2:str":"Recovery","SParamVocab3:str":"Item Effect","SParamVocab4:str":"MP Cost","SParamVocab5:str":"TP Charge","SParamVocab6:str":"Physical DMG","SParamVocab7:str":"Magical DMG","SParamVocab8:str":"Floor DMG","SParamVocab9:str":"EXP Gain","Icons":"","DrawIcons:eval":"true","IconParam0:str":"84","IconParam1:str":"165","IconParam2:str":"76","IconParam3:str":"81","IconParam4:str":"101","IconParam5:str":"133","IconParam6:str":"140","IconParam7:str":"87","IconXParam0:str":"102","IconXParam1:str":"82","IconXParam2:str":"78","IconXParam3:str":"82","IconXParam4:str":"171","IconXParam5:str":"222","IconXParam6:str":"77","IconXParam7:str":"72","IconXParam8:str":"72","IconXParam9:str":"72","IconSParam0:str":"5","IconSParam1:str":"128","IconSParam2:str":"72","IconSParam3:str":"176","IconSParam4:str":"165","IconSParam5:str":"164","IconSParam6:str":"76","IconSParam7:str":"79","IconSParam8:str":"141","IconSParam9:str":"73"}
 *
 * @param CustomParam:arraystruct
 * @text Custom Parameters
 * @parent Param:struct
 * @type struct<CustomParam>[]
 * @desc Create custom parameters for your game!
 * These will appear in VisuStella MZ menus.
 * @default ["{\"ParamName:str\":\"Strength\",\"Abbreviation:str\":\"str\",\"Icon:num\":\"77\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.atk * 0.75) + (user.def * 0.25);\\\"\"}","{\"ParamName:str\":\"Dexterity\",\"Abbreviation:str\":\"dex\",\"Icon:num\":\"82\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.agi * 0.75) + (user.atk * 0.25);\\\"\"}","{\"ParamName:str\":\"Constitution\",\"Abbreviation:str\":\"con\",\"Icon:num\":\"81\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.def * 0.75) + (user.mdf * 0.25);\\\"\"}","{\"ParamName:str\":\"Intelligence\",\"Abbreviation:str\":\"int\",\"Icon:num\":\"79\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.mat * 0.75) + (user.mdf * 0.25);\\\"\"}","{\"ParamName:str\":\"Wisdom\",\"Abbreviation:str\":\"wis\",\"Icon:num\":\"72\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.mdf * 0.75) + (user.luk * 0.25);\\\"\"}","{\"ParamName:str\":\"Charisma\",\"Abbreviation:str\":\"cha\",\"Icon:num\":\"84\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.luk * 0.75) + (user.agi * 0.25);\\\"\"}"]
 *
 * @param ScreenResolution:struct
 * @text Screen Resolution Settings
 * @type struct<ScreenResolution>
 * @desc Alter various properties to make the game look better for varying screen resolutions.
 * @default {"Troops":"","RepositionActors:eval":"true","RepositionEnemies:eval":"true","RepositionEnemies130:eval":"false"}
 *
 * @param ScreenShake:struct
 * @text Screen Shake Settings
 * @type struct<ScreenShake>
 * @desc Get more screen shake effects into your game!
 * @default {"DefaultStyle:str":"random","originalJS:func":"\"// Calculation\\nthis.x += Math.round($gameScreen.shake());\"","randomJS:func":"\"// Calculation\\n// Original Formula by Aries of Sheratan\\nconst power = $gameScreen._shakePower * 0.75;\\nconst speed = $gameScreen._shakeSpeed * 0.60;\\nconst duration = $gameScreen._shakeDuration;\\nthis.x += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\\nthis.y += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\"","horzJS:func":"\"// Calculation\\n// Original Formula by Aries of Sheratan\\nconst power = $gameScreen._shakePower * 0.75;\\nconst speed = $gameScreen._shakeSpeed * 0.60;\\nconst duration = $gameScreen._shakeDuration;\\nthis.x += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\"","vertJS:func":"\"// Calculation\\n// Original Formula by Aries of Sheratan\\nconst power = $gameScreen._shakePower * 0.75;\\nconst speed = $gameScreen._shakeSpeed * 0.60;\\nconst duration = $gameScreen._shakeDuration;\\nthis.y += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\""}
 *
 * @param TitleCommandList:arraystruct
 * @text Title Command List
 * @type struct<Command>[]
 * @desc Window commands used by the title screen.
 * Add new commands here.
 * @default ["{\"Symbol:str\":\"newGame\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.newGame;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandNewGame();\\\"\"}","{\"Symbol:str\":\"continue\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.continue_;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return DataManager.isAnySavefileExists();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandContinue();\\\"\"}","{\"Symbol:str\":\"options\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.options;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandOptions();\\\"\"}","{\"Symbol:str\":\"shutdown\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.gameEnd;\\\"\",\"ShowJS:func\":\"\\\"return Utils.isNwjs();\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager.exit();\\\\n\\\\n// Note!\\\\n// Do NOT use this command with mobile devices or\\\\n// browser games. All it does is cause the game to\\\\n// display a blank, black canvas which the player\\\\n// is unable to do anything with. It does NOT force\\\\n// close the browser tab nor the app.\\\"\"}"]
 *
 * @param TitlePicButtons:arraystruct
 * @text Title Picture Buttons
 * @type struct<TitlePictureButton>[]
 * @desc Buttons that can be inserted into the title screen.
 * Add new title buttons here.
 * @default []
 *
 * @param UI:struct
 * @text UI Settings
 * @type struct<UI>
 * @desc Change up various in-game UI aspects.
 * @default {"UIArea":"","FadeSpeed:num":"24","BoxMargin:num":"4","CommandWidth:num":"240","BottomHelp:eval":"false","RightMenus:eval":"true","ShowButtons:eval":"true","cancelShowButton:eval":"true","menuShowButton:eval":"true","pagedownShowButton:eval":"true","numberShowButton:eval":"true","ButtonHeight:num":"52","BottomButtons:eval":"false","SideButtons:eval":"true","MenuObjects":"","LvExpGauge:eval":"true","ParamArrow:str":"→","TextCodeSupport":"","TextCodeClassNames:eval":"true","TextCodeNicknames:eval":"true"}
 *
 * @param Window:struct
 * @text Window Settings
 * @type struct<Window>
 * @desc Adjust various in-game window settings.
 * @default {"WindowDefaults":"","EnableMasking:eval":"false","LineHeight:num":"36","SelectableItems":"","ShowItemBackground:eval":"true","ItemHeight:num":"8","DrawItemBackgroundJS:func":"\"const rect = arguments[0];\\nconst c1 = ColorManager.itemBackColor1();\\nconst c2 = ColorManager.itemBackColor2();\\nconst x = rect.x;\\nconst y = rect.y;\\nconst w = rect.width;\\nconst h = rect.height;\\nthis.contentsBack.gradientFillRect(x, y, w, h, c1, c2, true);\\nthis.contentsBack.strokeRect(x, y, w, h, c1);\"","ItemPadding:num":"8","BackOpacity:num":"192","TranslucentOpacity:num":"160","OpenSpeed:num":"32","ColSpacing:num":"8","RowSpacing:num":"4"}
 *
 * @param jsQuickFunc:arraystruct
 * @text JS: Quick Functions
 * @type struct<jsQuickFunc>[]
 * @desc Create quick JavaScript functions available from the
 * global namespace. Use with caution and moderation!!!
 * @default ["{\"FunctionName:str\":\"Example\",\"CodeJS:json\":\"\\\"// Insert this as a function anywhere you can input code\\\\n// such as Script Calls or Conditional Branch Scripts.\\\\n\\\\n// Process Code\\\\nreturn 'Example';\\\"\"}","{\"FunctionName:str\":\"Bad  Code  Name\",\"CodeJS:json\":\"\\\"// If a function name has spaces in them, the spaces will\\\\n// be removed. \\\\\\\"Bad  Code  Name\\\\\\\" becomes \\\\\\\"BadeCodeName\\\\\\\".\\\\n\\\\n// Process Code\\\\nOhNoItsBadCode()\\\\n\\\\n// If a function has bad code, a fail safe will catch the\\\\n// error and display it in the console.\\\"\"}","{\"FunctionName:str\":\"RandomNumber\",\"CodeJS:json\":\"\\\"// This generates a random number from 0 to itself.\\\\n// Example: RandomNumber(10)\\\\n\\\\n// Process Code\\\\nconst number = (arguments[0] || 0) + 1;\\\\nreturn Math.floor(number * Math.random());\\\"\"}","{\"FunctionName:str\":\"RandomBetween\",\"CodeJS:json\":\"\\\"// This generates a random number between two arguments.\\\\n// Example: RandomNumber(5, 10)\\\\n\\\\n// Process Code\\\\nlet min = Math.min(arguments[0] || 0, arguments[1] || 0);\\\\nlet max = Math.max(arguments[0] || 0, arguments[1] || 0);\\\\nreturn Math.floor(Math.random() * (max - min + 1) + min);\\\"\"}","{\"FunctionName:str\":\"RandomFrom\",\"CodeJS:json\":\"\\\"// Selects a number from the list of inserted numbers.\\\\n// Example: RandomFrom(5, 10, 15, 20)\\\\n\\\\n// Process Code\\\\nreturn arguments[Math.randomInt(arguments.length)];\\\"\"}"]
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
 * Quality of Life Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~QoLSettings:
 *
 * @param PlayTest
 * @text Play Test
 *
 * @param NewGameBoot:eval
 * @text New Game on Boot
 * @parent PlayTest
 * @type boolean
 * @on Start New Game
 * @off Keep Title Screen
 * @desc Automatically start a new game on Play Test?
 * Only enabled during Play Test.
 * @default false
 *
 * @param ForceNoPlayTest:eval
 * @text No Play Test Mode
 * @parent PlayTest
 * @type boolean
 * @on Cancel Play Test
 * @off Keep Play Test
 * @desc Force the game to be out of Play Test mode when play testing.
 * @default false
 *
 * @param OpenConsole:eval
 * @text Open Console on Boot
 * @parent PlayTest
 * @type boolean
 * @on Open
 * @off Don't Open
 * @desc Open the Debug Console upon booting up your game?
 * Only enabled during Play Test.
 * @default true
 *
 * @param F6key:eval
 * @text F6: Toggle Sound
 * @parent PlayTest
 * @type boolean
 * @on Enable
 * @off Don't
 * @desc F6 Key Function: Turn on all sound to 100% or to 0%,
 * toggling between the two.
 * @default true
 *
 * @param F7key:eval
 * @text F7: Toggle Fast Mode
 * @parent PlayTest
 * @type boolean
 * @on Enable
 * @off Don't
 * @desc F7 Key Function: Toggle fast mode.
 * @default true
 *
 * @param NewGameCommonEvent:num
 * @text NewGame > CommonEvent
 * @parent PlayTest
 * @type common_event
 * @desc Runs a common event each time a new game during play test
 * session is started.
 * @default 0
 *
 * @param BattleTest
 * @text Battle Test
 *
 * @param BTestItems:eval
 * @text Add Item Type
 * @parent BattleTest
 * @type boolean
 * @on Add
 * @off Don't
 * @desc Add copies of each database item?
 * Effective only during battle test.
 * @default true
 *
 * @param BTestWeapons:eval
 * @text Add Weapon Type
 * @parent BattleTest
 * @type boolean
 * @on Add
 * @off Don't
 * @desc Add copies of each database weapon?
 * Effective only during battle test.
 * @default true
 *
 * @param BTestArmors:eval
 * @text Add Armor Type
 * @parent BattleTest
 * @type boolean
 * @on Add
 * @off Don't
 * @desc Add copies of each database armor?
 * Effective only during battle test.
 * @default true
 *
 * @param BTestAddedQuantity:num
 * @text Added Quantity
 * @parent BattleTest
 * @type number
 * @min 1
 * @desc Determines how many items are added during a battle test instead of the maximum amount.
 * @default 90
 *
 * @param DigitGrouping
 * @text Digit Grouping
 *
 * @param DigitGroupingStandardText:eval
 * @text Standard Text
 * @parent DigitGrouping
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Make numbers like 1234567 appear like 1,234,567 for
 * standard text inside windows?
 * @default true
 *
 * @param DigitGroupingExText:eval
 * @text Ex Text
 * @parent DigitGrouping
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Make numbers like 1234567 appear like 1,234,567 for
 * ex text, written through drawTextEx (like messages)?
 * @default true
 *
 * @param DigitGroupingDamageSprites:eval
 * @text Damage Sprites
 * @parent DigitGrouping
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Make numbers like 1234567 appear like 1,234,567 for
 * in-battle damage sprites?
 * @default true
 *
 * @param DigitGroupingGaugeSprites:eval
 * @text Gauge Sprites
 * @parent DigitGrouping
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Make numbers like 1234567 appear like 1,234,567 for
 * visible gauge sprites such as HP, MP, and TP gauges?
 * @default true
 *
 * @param DigitGroupingLocale:str
 * @text Country/Locale
 * @parent DigitGrouping
 * @type combo
 * @option ar-SA
 * @option bn-BD
 * @option bn-IN
 * @option cs-CZ
 * @option da-DK
 * @option de-AT
 * @option de-CH
 * @option de-DE
 * @option el-GR
 * @option en-AU
 * @option en-CA
 * @option en-GB
 * @option en-IE
 * @option en-IN
 * @option en-NZ
 * @option en-US
 * @option en-ZA
 * @option es-AR
 * @option es-CL
 * @option es-CO
 * @option es-ES
 * @option es-MX
 * @option es-US
 * @option fi-FI
 * @option fr-BE
 * @option fr-CA
 * @option fr-CH
 * @option fr-FR
 * @option he-IL
 * @option hi-IN
 * @option hu-HU
 * @option id-ID
 * @option it-CH
 * @option it-IT
 * @option jp-JP
 * @option ko-KR
 * @option nl-BE
 * @option nl-NL
 * @option no-NO
 * @option pl-PL
 * @option pt-BR
 * @option pt-PT
 * @option ro-RO
 * @option ru-RU
 * @option sk-SK
 * @option sv-SE
 * @option ta-IN
 * @option ta-LK
 * @option th-TH
 * @option tr-TR
 * @option zh-CN
 * @option zh-HK
 * @option zh-TW
 * @desc Base the digit grouping on which country/locale?
 * @default en-US
 *
 * @param PlayerBenefit
 * @text Player Benefit
 *
 * @param EncounterRateMinimum:num
 * @text Encounter Rate Min
 * @parent PlayerBenefit
 * @min 1
 * @desc Minimum number of steps the player can take without any random encounters.
 * @default 10
 *
 * @param EscapeAlways:eval
 * @text Escape Always
 * @parent PlayerBenefit
 * @type boolean
 * @on Always
 * @off Default
 * @desc If the player wants to escape a battle, let them escape the battle with 100% chance.
 * @default true
 *
 * @param ImprovedAccuracySystem:eval
 * @text Accuracy Formula
 * @parent PlayerBenefit
 * @type boolean
 * @on Improve
 * @off Default
 * @desc Accuracy formula calculation change to
 * Skill Hit% * (User HIT - Target EVA) for better results.
 * @default true
 *
 * @param AccuracyBoost:eval
 * @text Accuracy Boost
 * @parent PlayerBenefit
 * @type boolean
 * @on Boost
 * @off Default
 * @desc Boost HIT and EVA rates in favor of the player.
 * @default true
 *
 * @param LevelUpFullHp:eval
 * @text Level Up -> Full HP
 * @parent PlayerBenefit
 * @type boolean
 * @on Heal
 * @off Default
 * @desc Recovers full HP when an actor levels up.
 * @default true
 *
 * @param LevelUpFullMp:eval
 * @text Level Up -> Full MP
 * @parent PlayerBenefit
 * @type boolean
 * @on Heal
 * @off Default
 * @desc Recovers full MP when an actor levels up.
 * @default true
 *
 * @param Misc
 * @text Misc
 *
 * @param AnimationMirrorOffset:eval
 * @text Ani: Mirror Offset
 * @parent Misc
 * @type boolean
 * @on Mirror
 * @off Don't Mirror
 * @desc When animations are mirrored,
 * mirror their Offset X values, too.
 * @default false
 *
 * @param AntiZoomPictures:eval
 * @text Anti-Zoom Pictures
 * @parent Misc
 * @type boolean
 * @on Anti-Zoom
 * @off Normal
 * @desc If on, prevents pictures from being affected by zoom.
 * @default true
 *
 * @param AutoStretch:str
 * @text Auto-Stretch
 * @parent Misc
 * @type select
 * @option Default
 * @value default
 * @option Stretch
 * @value stretch
 * @option Normal
 * @value normal
 * @desc Automatically stretch the game to fit the size of the client?
 * @default default
 *
 * @param FontShadows:eval
 * @text Font Shadows
 * @parent Misc
 * @type boolean
 * @on Shadows
 * @off Outlines
 * @desc If on, text uses shadows instead of outlines.
 * @default false
 *
 * @param FontSmoothing:eval
 * @text Font Smoothing
 * @parent Misc
 * @type boolean
 * @on Smooth
 * @off None
 * @desc If on, smoothes fonts shown in-game.
 * @default true
 *
 * @param FontWidthFix:eval
 * @text Font Width Fix
 * @parent Misc
 * @type boolean
 * @on Fix
 * @off Default
 * @desc Fixes the font width issue with instant display
 * non-monospaced fonts in the Message Window.
 * @default true
 *
 * @param KeyItemProtect:eval
 * @text Key Item Protection
 * @parent Misc
 * @type boolean
 * @on Unsellable
 * @off Sellable
 * @desc If on, prevents Key Items from being able to be sold and from being able to be consumed.
 * @default true
 *
 * @param ModernControls:eval
 * @text Modern Controls
 * @parent Misc
 * @type boolean
 * @on Enable
 * @off Default
 * @desc If on, allows usage of the Home/End buttons as well as other modern configs. Affects other VisuStella plugins.
 * @default true
 *
 * @param NewGameCommonEventAll:num
 * @text NewGame > CommonEvent
 * @parent Misc
 * @type common_event
 * @desc Runs a common event each time a new game during any session is started.
 * @default 0
 *
 * @param NoTileShadows:eval
 * @text No Tile Shadows
 * @parent Misc
 * @type boolean
 * @on Disable Tile Shadows
 * @off Default
 * @desc Removes tile shadows from being displayed in-game.
 * @default false
 *
 * @param PixelateImageRendering:eval
 * @text Pixel Image Rendering
 * @parent Misc
 * @type boolean
 * @on Pixelate
 * @off Smooth
 * @desc If on, pixelates the image rendering (for pixel games).
 * @default false
 *
 * @param RequireFocus:eval
 * @text Require Focus?
 * @parent Misc
 * @type boolean
 * @on Require
 * @off No Requirement
 * @desc Requires the game to be focused? If the game isn't
 * focused, it will pause if it's not the active window.
 * @default true
 *
 * @param SmartEventCollisionPriority:eval
 * @text Smart Event Collision
 * @parent Misc
 * @type boolean
 * @on Only Same Level
 * @off Default
 * @desc Makes events only able to collide with one another if they're 'Same as characters' priority.
 * @default true
 *
 * @param SubfolderParse:eval
 * @text Subfolder Name Purge
 * @parent Misc
 * @type boolean
 * @on Purge Subfolders Names
 * @off Don't Purge Name
 * @desc Purge subfolder name from Plugin Parameters when reading
 * data to let Plugin Commands work properly.
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Color Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Color:
 *
 * @param BasicColors
 * @text Basic Colors
 *
 * @param ColorNormal:str
 * @text Normal
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 0
 *
 * @param ColorSystem:str
 * @text System
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 16
 *
 * @param ColorCrisis:str
 * @text Crisis
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 17
 *
 * @param ColorDeath:str
 * @text Death
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 18
 *
 * @param ColorGaugeBack:str
 * @text Gauge Back
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 19
 *
 * @param ColorHPGauge1:str
 * @text HP Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 20
 *
 * @param ColorHPGauge2:str
 * @text HP Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 21
 *
 * @param ColorMPGauge1:str
 * @text MP Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 22
 *
 * @param ColorMPGauge2:str
 * @text MP Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 23
 *
 * @param ColorMPCost:str
 * @text MP Cost
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 23
 *
 * @param ColorPowerUp:str
 * @text Power Up
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 24
 *
 * @param ColorPowerDown:str
 * @text Power Down
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 25
 *
 * @param ColorCTGauge1:str
 * @text CT Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 26
 *
 * @param ColorCTGauge2:str
 * @text CT Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 27
 *
 * @param ColorTPGauge1:str
 * @text TP Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 28
 *
 * @param ColorTPGauge2:str
 * @text TP Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 29
 *
 * @param ColorTPCost:str
 * @text TP Cost
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 29
 *
 * @param ColorPending:str
 * @text Pending Color
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default #2a847d
 *
 * @param ColorExpGauge1:str
 * @text EXP Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 30
 *
 * @param ColorExpGauge2:str
 * @text EXP Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 31
 *
 * @param ColorMaxLvGauge1:str
 * @text MaxLv Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 14
 *
 * @param ColorMaxLvGauge2:str
 * @text MaxLv Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 6
 *
 * @param AlphaColors
 * @text Alpha Colors
 *
 * @param OutlineColor:str
 * @text Window Font Outline
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 0.6)
 *
 * @param OutlineColorGauge:str
 * @text Gauge Number Outline
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 1.0)
 *
 * @param DimColor1:str
 * @text Dim Color 1
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 0.6)
 *
 * @param DimColor2:str
 * @text Dim Color 2
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 0)
 *
 * @param ItemBackColor1:str
 * @text Item Back Color 1
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(32, 32, 32, 0.5)
 *
 * @param ItemBackColor2:str
 * @text Item Back Color 2
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 0.5)
 *
 * @param ConditionalColors
 * @text Conditional Colors
 *
 * @param ActorHPColor:func
 * @text JS: Actor HP Color
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining what HP color to use for actors.
 * @default "// Set the variables used in this function.\nlet actor = arguments[0];\n\n// Check if the actor exists. If not, return normal.\nif (!actor) {\n    return this.normalColor();\n\n// If the actor is dead, return death color.\n} else if (actor.isDead()) {\n    return this.deathColor();\n\n// If the actor is dying, return crisis color.\n} else if (actor.isDying()) {\n    return this.crisisColor();\n\n// Otherwise, return the normal color.\n} else {\n    return this.normalColor();\n}"
 *
 * @param ActorMPColor:func
 * @text JS: Actor MP Color
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining what MP color to use for actors.
 * @default "// Set the variables used in this function.\nlet actor = arguments[0];\n\n// Check if the actor exists. If not, return normal.\nif (!actor) {\n    return this.normalColor();\n\n// If MP rate is below 25%, return crisis color.\n} else if (actor.mpRate() < 0.25) {\n    return this.crisisColor();\n\n// Otherwise, return the normal color.\n} else {\n    return this.normalColor();\n}"
 *
 * @param ActorTPColor:func
 * @text JS: Actor TP Color
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining what TP color to use for actors.
 * @default "// Set the variables used in this function.\nlet actor = arguments[0];\n\n// Check if the actor exists. If not, return normal.\nif (!actor) {\n    return this.normalColor();\n\n// If TP rate is below 25%, return crisis color.\n} else if (actor.tpRate() < 0.25) {\n    return this.crisisColor();\n\n// Otherwise, return the normal color.\n} else {\n    return this.normalColor();\n}"
 *
 * @param ParamChange:func
 * @text JS: Parameter Change
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining whatcolor to use for parameter changes.
 * @default "// Set the variables used in this function.\nlet change = arguments[0];\n\n// If a positive change, use power up color.\nif (change > 0) {\n    return this.powerUpColor();\n\n// If a negative change, use power down color.\n} else if (change < 0) {\n    return this.powerDownColor();\n\n// Otherwise, return the normal color.\n} else {\n    return this.normalColor();\n}"
 *
 * @param DamageColor:func
 * @text JS: Damage Colors
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining what color to use for damage types.
 * @default "// Set the variables used in this function.\nlet colorType = arguments[0];\n\n// Check the value of the color type\n// and return an appropriate color.\nswitch (colorType) {\n\n    case 0: // HP damage\n        return \"#ffffff\";\n\n    case 1: // HP recover\n        return \"#b9ffb5\";\n\n    case 2: // MP damage\n        return \"#bb88bb\";\n\n    case 3: // MP recover\n        return \"#80b0ff\";\n\n    default:\n        return \"#808080\";\n}"
 */
/* ----------------------------------------------------------------------------
 * Gold Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Gold:
 *
 * @param GoldMax:num
 * @text Gold Max
 * @type num
 * @min 1
 * @desc Maximum amount of Gold the party can hold.
 * Default 99999999
 * @default 99999999
 *
 * @param GoldFontSize:num
 * @text Gold Font Size
 * @type number
 * @min 1
 * @desc Font size used for displaying Gold inside Gold Windows.
 * Default: 26
 * @default 24
 *
 * @param GoldIcon:num
 * @text Gold Icon
 * @desc Icon used to represent Gold.
 * Use 0 for no icon.
 * @default 314
 *
 * @param GoldOverlap:str
 * @text Gold Overlap
 * @desc Text used too much Gold to fit in the window.
 * @default A Lot
 *
 * @param ItemStyle:eval
 * @text Item Style
 * @type boolean
 * @on Enable
 * @off Normal
 * @desc Draw gold in the item style?
 * ie: Icon, Label, Value
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Image Loading Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ImgLoad:
 *
 * @param animations:arraystr
 * @text img/animations/
 * @type file[]
 * @dir img/animations/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param battlebacks1:arraystr
 * @text img/battlebacks1/
 * @type file[]
 * @dir img/battlebacks1/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param battlebacks2:arraystr
 * @text img/battlebacks2/
 * @type file[]
 * @dir img/battlebacks2/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param characters:arraystr
 * @text img/characters/
 * @type file[]
 * @dir img/characters/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param enemies:arraystr
 * @text img/enemies/
 * @type file[]
 * @dir img/enemies/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param faces:arraystr
 * @text img/faces/
 * @type file[]
 * @dir img/faces/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param parallaxes:arraystr
 * @text img/parallaxes/
 * @type file[]
 * @dir img/parallaxes/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param pictures:arraystr
 * @text img/pictures/
 * @type file[]
 * @dir img/pictures/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param sv_actors:arraystr
 * @text img/sv_actors/
 * @type file[]
 * @dir img/sv_actors/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param sv_enemies:arraystr
 * @text img/sv_enemies/
 * @type file[]
 * @dir img/sv_enemies/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param system:arraystr
 * @text img/system/
 * @type file[]
 * @dir img/system/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default ["Balloon","IconSet"]
 *
 * @param tilesets:arraystr
 * @text img/tilesets/
 * @type file[]
 * @dir img/tilesets/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param titles1:arraystr
 * @text img/titles1/
 * @type file[]
 * @dir img/titles1/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param titles2:arraystr
 * @text img/titles2/
 * @type file[]
 * @dir img/titles2/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 */
/* ----------------------------------------------------------------------------
 * Keyboard Input Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~KeyboardInput:
 *
 * @param Controls
 *
 * @param WASD:eval
 * @text WASD Movement
 * @parent Controls
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables or disables WASD movement for your game project.
 * Moves the W page down button to E.
 * @default false
 *
 * @param DashToggleR:eval
 * @text R Button: Dash Toggle
 * @parent Controls
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables or disables R button as an Always Dash option toggle.
 * @default false
 *
 * @param NameInput
 * @text Name Input
 *
 * @param EnableNameInput:eval
 * @text Enable?
 * @parent NameInput
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables keyboard input for name entry.
 * Only tested with English keyboards.
 * @default true
 * 
 * @param DefaultMode:str
 * @text Default Mode
 * @parent NameInput
 * @type select
 * @option Default - Uses Arrow Keys to select letters.
 * @value default
 * @option Keyboard - Uses Keyboard to type in letters.
 * @value keyboard
 * @desc Select default mode when entering the scene.
 * @default keyboard
 *
 * @param QwertyLayout:eval
 * @text QWERTY Layout
 * @parent NameInput
 * @type boolean
 * @on QWERTY Layout
 * @off ABCDEF Layout
 * @desc Uses the QWERTY layout for manual entry.
 * @default true
 *
 * @param NameInputMessage:eval
 * @text Keyboard Message
 * @parent NameInput
 * @type note
 * @desc The message displayed when allowing keyboard entry.
 * You may use text codes here.
 * @default "Type in this character's name.\nPress \\c[5]ENTER\\c[0] when you're done.\n\n-or-\n\nPress \\c[5]arrow keys\\c[0]/\\c[5]TAB\\c[0] to switch\nto manual character entry.\n\nPress \\c[5]ESC\\c[0]/\\c[5]TAB\\c[0] to use to keyboard."
 * 
 * @param BannedWords:arraystr
 * @text Banned Words
 * @parent NameInput
 * @type string[]
 * @desc Players cannot use these words for names.
 * These include words inside the names.
 * @default []
 *
 * @param NumberInput
 * @text Number Input
 *
 * @param EnableNumberInput:eval
 * @text Enable?
 * @parent NumberInput
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables keyboard input for number entry.
 * Only tested with English keyboards.
 * @default true
 *
 * @param ButtonAssist
 * @text Button Assist
 * 
 * @param Keyboard:str
 * @text Switch To Keyboard
 * @parent ButtonAssist
 * @desc Text used to describe the keyboard switch.
 * @default Keyboard
 * 
 * @param Manual:str
 * @text Switch To Manual
 * @parent ButtonAssist
 * @desc Text used to describe the manual entry switch.
 * @default Manual
 *
 */
/* ----------------------------------------------------------------------------
 * Menu Background Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~MenuBg:
 *
 * @param Scene_Menu:struct
 * @text Scene_Menu
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Item:struct
 * @text Scene_Item
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Skill:struct
 * @text Scene_Skill
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Equip:struct
 * @text Scene_Equip
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Status:struct
 * @text Scene_Status
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Options:struct
 * @text Scene_Options
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Save:struct
 * @text Scene_Save
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Load:struct
 * @text Scene_Load
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_GameEnd:struct
 * @text Scene_GameEnd
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"128","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Shop:struct
 * @text Scene_Shop
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Name:struct
 * @text Scene_Name
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Unlisted:struct
 * @text Scene_Unlisted
 * @type struct<BgSettings>
 * @desc The individual background settings for any scenes that aren't listed here.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 */
/* ----------------------------------------------------------------------------
 * Background Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~BgSettings:
 *
 * @param SnapshotOpacity:num
 * @text Snapshop Opacity
 * @type number
 * @min 0
 * @max 255
 * @desc Snapshot opacity for the scene.
 * @default 192
 *
 * @param BgFilename1:str
 * @text Background 1
 * @type file
 * @dir img/titles1/
 * @desc Filename used for the bottom background image.
 * Leave empty if you don't wish to use one.
 * @default 
 *
 * @param BgFilename2:str
 * @text Background 2
 * @type file
 * @dir img/titles2/
 * @desc Filename used for the upper background image.
 * Leave empty if you don't wish to use one.
 * @default 
 *
 */
/* ----------------------------------------------------------------------------
 * Menu Button Assist Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ButtonAssist:
 *
 * @param General
 *
 * @param Enable:eval
 * @text Enable
 * @parent General
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Enable the Menu Button Assist Window.
 * @default true
 *
 * @param Location:str
 * @text Location
 * @parent General
 * @type select
 * @option Top of Screen
 * @value top
 * @option Bottom of Screen
 * @value bottom
 * @desc Determine the location of the Button Assist Window.
 * Requires Plugin Parameters => UI => Side Buttons ON.
 * @default bottom
 *
 * @param BgType:num
 * @text Background Type
 * @parent General
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param Text
 *
 * @param TextFmt:str
 * @text Text Format
 * @parent Text
 * @desc Format on how the buttons are displayed.
 * Text codes allowed. %1 - Key, %2 - Text
 * @default %1:%2
 *
 * @param MultiKeyFmt:str
 * @text Multi-Key Format
 * @parent Text
 * @desc Format for actions with multiple keys.
 * Text codes allowed. %1 - Key 1, %2 - Key 2
 * @default %1/%2
 *
 * @param OkText:str
 * @text OK Text
 * @parent Text
 * @desc Default text used to display OK Key Action.
 * Text codes allowed.
 * @default Select
 *
 * @param CancelText:str
 * @text Cancel Text
 * @parent Text
 * @desc Default text used to display Cancel Key Action.
 * Text codes allowed.
 * @default Back
 *
 * @param SwitchActorText:str
 * @text Switch Actor Text
 * @parent Text
 * @desc Default text used to display Switch Actor Action.
 * Text codes allowed.
 * @default Switch Ally
 *
 * @param Keys
 *
 * @param KeyUnlisted:str
 * @text Key: Unlisted Format
 * @parent Keys
 * @desc If a key is not listed below, use this format.
 * Text codes allowed. %1 - Key
 * @default \}❪%1❫\{
 *
 * @param KeyUP:str
 * @text Key: Up
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default ^
 *
 * @param KeyDOWN:str
 * @text Key: Down
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default v
 *
 * @param KeyLEFT:str
 * @text Key: Left
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default <<
 *
 * @param KeyRIGHT:str
 * @text Key: Right
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default >>
 *
 * @param KeySHIFT:str
 * @text Key: Shift
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default \}❪SHIFT❫\{
 *
 * @param KeyTAB:str
 * @text Key: Tab
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default \}❪TAB❫\{
 *
 * @param KeyA:str
 * @text Key: A
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default A
 *
 * @param KeyB:str
 * @text Key: B
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default B
 *
 * @param KeyC:str
 * @text Key: C
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default C
 *
 * @param KeyD:str
 * @text Key: D
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default D
 *
 * @param KeyE:str
 * @text Key: E
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default E
 *
 * @param KeyF:str
 * @text Key: F
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default F
 *
 * @param KeyG:str
 * @text Key: G
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default G
 *
 * @param KeyH:str
 * @text Key: H
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default H
 *
 * @param KeyI:str
 * @text Key: I
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default I
 *
 * @param KeyJ:str
 * @text Key: J
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default J
 *
 * @param KeyK:str
 * @text Key: K
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default K
 *
 * @param KeyL:str
 * @text Key: L
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default L
 *
 * @param KeyM:str
 * @text Key: M
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default M
 *
 * @param KeyN:str
 * @text Key: N
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default N
 *
 * @param KeyO:str
 * @text Key: O
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default O
 *
 * @param KeyP:str
 * @text Key: P
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default P
 *
 * @param KeyQ:str
 * @text Key: Q
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default Q
 *
 * @param KeyR:str
 * @text Key: R
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default R
 *
 * @param KeyS:str
 * @text Key: S
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default S
 *
 * @param KeyT:str
 * @text Key: T
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default T
 *
 * @param KeyU:str
 * @text Key: U
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default U
 *
 * @param KeyV:str
 * @text Key: V
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default V
 *
 * @param KeyW:str
 * @text Key: W
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default W
 *
 * @param KeyX:str
 * @text Key: X
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default X
 *
 * @param KeyY:str
 * @text Key: Y
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default Y
 *
 * @param KeyZ:str
 * @text Key: Z
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default Z
 *
 */
/* ----------------------------------------------------------------------------
 * Menu Layout Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~MenuLayout:
 *
 * @param Title:struct
 * @text Scene_Title
 * @parent SceneSettings
 * @type struct<Title>
 * @desc Various options on adjusting the Title Scene.
 * @default {"TitleScreen":"","DocumentTitleFmt:str":"%1: %2 - Version %3","Subtitle:str":"Subtitle","Version:str":"0.00","drawGameTitle:func":"\"const x = 20;\\nconst y = Graphics.height / 4;\\nconst maxWidth = Graphics.width - x * 2;\\nconst text = $dataSystem.gameTitle;\\nconst bitmap = this._gameTitleSprite.bitmap;\\nbitmap.fontFace = $gameSystem.mainFontFace();\\nbitmap.outlineColor = \\\"black\\\";\\nbitmap.outlineWidth = 8;\\nbitmap.fontSize = 72;\\nbitmap.drawText(text, x, y, maxWidth, 48, \\\"center\\\");\"","drawGameSubtitle:func":"\"const x = 20;\\nconst y = Graphics.height / 4 + 72;\\nconst maxWidth = Graphics.width - x * 2;\\nconst text = Scene_Title.subtitle;\\nconst bitmap = this._gameTitleSprite.bitmap;\\nbitmap.fontFace = $gameSystem.mainFontFace();\\nbitmap.outlineColor = \\\"black\\\";\\nbitmap.outlineWidth = 6;\\nbitmap.fontSize = 48;\\nbitmap.drawText(text, x, y, maxWidth, 48, \\\"center\\\");\"","drawGameVersion:func":"\"const bitmap = this._gameTitleSprite.bitmap;\\nconst x = 0;\\nconst y = Graphics.height - 20;\\nconst width = Math.round(Graphics.width / 4);\\nconst height = 20;\\nconst c1 = ColorManager.dimColor1();\\nconst c2 = ColorManager.dimColor2();\\nconst text = 'Version ' + Scene_Title.version;\\nbitmap.gradientFillRect(x, y, width, height, c1, c2);\\nbitmap.fontFace = $gameSystem.mainFontFace();\\nbitmap.outlineColor = \\\"black\\\";\\nbitmap.outlineWidth = 3;\\nbitmap.fontSize = 16;\\nbitmap.drawText(text, x + 4, y, Graphics.width, height, \\\"left\\\");\"","CommandRect:func":"\"const offsetX = $dataSystem.titleCommandWindow.offsetX;\\nconst offsetY = $dataSystem.titleCommandWindow.offsetY;\\nconst rows = this.commandWindowRows();\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = (Graphics.boxWidth - width) / 2 + offsetX;\\nconst y = Graphics.boxHeight - height - 96 + offsetY;\\nreturn new Rectangle(x, y, width, height);\"","ButtonFadeSpeed:num":"4"}
 *
 * @param MainMenu:struct
 * @text Scene_Menu
 * @parent SceneSettings
 * @type struct<MainMenu>
 * @desc Various options on adjusting the Main Menu Scene.
 * @default {"CommandWindow":"","CommandBgType:num":"0","CommandRect:func":"\"const width = this.mainCommandWidth();\\nconst height = this.mainAreaHeight() - this.goldWindowRect().height;\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","GoldWindow":"","GoldBgType:num":"0","GoldRect:func":"\"const rows = 1;\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\nconst y = this.mainAreaBottom() - height;\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const width = Graphics.boxWidth - this.mainCommandWidth();\\nconst height = this.mainAreaHeight();\\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param ItemMenu:struct
 * @text Scene_Item
 * @parent SceneSettings
 * @type struct<ItemMenu>
 * @desc Various options on adjusting the Item Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.helpAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.helpAreaHeight();\\nreturn new Rectangle(x, y, width, height);\"","CategoryWindow":"","CategoryBgType:num":"0","CategoryRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = Graphics.boxWidth;\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\"","ItemWindow":"","ItemBgType:num":"0","ItemRect:func":"\"const x = 0;\\nconst y = this._categoryWindow.y + this._categoryWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaBottom() - y;\\nreturn new Rectangle(x, y, width, height);\"","ActorWindow":"","ActorBgType:num":"0","ActorRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight();\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param SkillMenu:struct
 * @text Scene_Skill
 * @parent SceneSettings
 * @type struct<SkillMenu>
 * @desc Various options on adjusting the Skill Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.helpAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.helpAreaHeight();\\nreturn new Rectangle(x, y, width, height);\"","SkillTypeWindow":"","SkillTypeBgType:num":"0","SkillTypeRect:func":"\"const rows = 3;\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const width = Graphics.boxWidth - this.mainCommandWidth();\\nconst height = this._skillTypeWindow.height;\\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","ItemWindow":"","ItemBgType:num":"0","ItemRect:func":"\"const x = 0;\\nconst y = this._statusWindow.y + this._statusWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight() - this._statusWindow.height;\\nreturn new Rectangle(x, y, width, height);\"","ActorWindow":"","ActorBgType:num":"0","ActorRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight();\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param EquipMenu:struct
 * @text Scene_Equip
 * @parent SceneSettings
 * @type struct<EquipMenu>
 * @desc Various options on adjusting the Equip Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.helpAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.helpAreaHeight();\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst width = this.statusWidth();\\nconst height = this.mainAreaHeight();\\nreturn new Rectangle(x, y, width, height);\"","CommandWindow":"","CommandBgType:num":"0","CommandRect:func":"\"const x = this.statusWidth();\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = Graphics.boxWidth - this.statusWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\"","SlotWindow":"","SlotBgType:num":"0","SlotRect:func":"\"const commandWindowRect = this.commandWindowRect();\\nconst x = this.statusWidth();\\nconst y = commandWindowRect.y + commandWindowRect.height;\\nconst width = Graphics.boxWidth - this.statusWidth();\\nconst height = this.mainAreaHeight() - commandWindowRect.height;\\nreturn new Rectangle(x, y, width, height);\"","ItemWindow":"","ItemBgType:num":"0","ItemRect:func":"\"return this.slotWindowRect();\""}
 *
 * @param StatusMenu:struct
 * @text Scene_Status
 * @parent SceneSettings
 * @type struct<StatusMenu>
 * @desc Various options on adjusting the Status Menu Scene.
 * @default {"ProfileWindow":"","ProfileBgType:num":"0","ProfileRect:func":"\"const width = Graphics.boxWidth;\\nconst height = this.profileHeight();\\nconst x = 0;\\nconst y = this.mainAreaBottom() - height;\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.statusParamsWindowRect().y - y;\\nreturn new Rectangle(x, y, width, height);\"","StatusParamsWindow":"","StatusParamsBgType:num":"0","StatusParamsRect:func":"\"const width = this.statusParamsWidth();\\nconst height = this.statusParamsHeight();\\nconst x = 0;\\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\\nreturn new Rectangle(x, y, width, height);\"","StatusEquipWindow":"","StatusEquipBgType:num":"0","StatusEquipRect:func":"\"const width = Graphics.boxWidth - this.statusParamsWidth();\\nconst height = this.statusParamsHeight();\\nconst x = this.statusParamsWidth();\\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param OptionsMenu:struct
 * @text Scene_Options
 * @parent SceneSettings
 * @type struct<OptionsMenu>
 * @desc Various options on adjusting the Options Menu Scene.
 * @default {"OptionsWindow":"","OptionsBgType:num":"0","OptionsRect:func":"\"const n = Math.min(this.maxCommands(), this.maxVisibleCommands());\\nconst width = 400;\\nconst height = this.calcWindowHeight(n, true);\\nconst x = (Graphics.boxWidth - width) / 2;\\nconst y = (Graphics.boxHeight - height) / 2;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param SaveMenu:struct
 * @text Scene_Save
 * @parent SceneSettings
 * @type struct<SaveMenu>
 * @desc Various options on adjusting the Save Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = Graphics.boxWidth;\\nconst height = this.calcWindowHeight(rows, false);\\nreturn new Rectangle(x, y, width, height);\"","ListWindow":"","ListBgType:num":"0","ListRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop() + this._helpWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight() - this._helpWindow.height;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param LoadMenu:struct
 * @text Scene_Load
 * @parent SceneSettings
 * @type struct<LoadMenu>
 * @desc Various options on adjusting the Load Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = Graphics.boxWidth;\\nconst height = this.calcWindowHeight(rows, false);\\nreturn new Rectangle(x, y, width, height);\"","ListWindow":"","ListBgType:num":"0","ListRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop() + this._helpWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight() - this._helpWindow.height;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param GameEnd:struct
 * @text Scene_GameEnd
 * @parent SceneSettings
 * @type struct<GameEnd>
 * @desc Various options on adjusting the Game End Scene.
 * @default {"CommandList:arraystruct":"[\"{\\\"Symbol:str\\\":\\\"toTitle\\\",\\\"TextStr:str\\\":\\\"Untitled\\\",\\\"TextJS:func\\\":\\\"\\\\\\\"return TextManager.toTitle;\\\\\\\"\\\",\\\"ShowJS:func\\\":\\\"\\\\\\\"return true;\\\\\\\"\\\",\\\"EnableJS:func\\\":\\\"\\\\\\\"return true;\\\\\\\"\\\",\\\"ExtJS:func\\\":\\\"\\\\\\\"return null;\\\\\\\"\\\",\\\"CallHandlerJS:func\\\":\\\"\\\\\\\"SceneManager._scene.commandToTitle();\\\\\\\"\\\"}\",\"{\\\"Symbol:str\\\":\\\"cancel\\\",\\\"TextStr:str\\\":\\\"Untitled\\\",\\\"TextJS:func\\\":\\\"\\\\\\\"return TextManager.cancel;\\\\\\\"\\\",\\\"ShowJS:func\\\":\\\"\\\\\\\"return true;\\\\\\\"\\\",\\\"EnableJS:func\\\":\\\"\\\\\\\"return true;\\\\\\\"\\\",\\\"ExtJS:func\\\":\\\"\\\\\\\"return null;\\\\\\\"\\\",\\\"CallHandlerJS:func\\\":\\\"\\\\\\\"SceneManager._scene.popScene();\\\\\\\"\\\"}\"]","CommandBgType:num":"0","CommandRect:func":"\"const rows = 2;\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = (Graphics.boxWidth - width) / 2;\\nconst y = (Graphics.boxHeight - height) / 2;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param ShopMenu:struct
 * @text Scene_Shop
 * @parent SceneSettings
 * @type struct<ShopMenu>
 * @desc Various options on adjusting the Shop Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const wx = 0;\\nconst wy = this.helpAreaTop();\\nconst ww = Graphics.boxWidth;\\nconst wh = this.helpAreaHeight();\\nreturn new Rectangle(wx, wy, ww, wh);\"","GoldWindow":"","GoldBgType:num":"0","GoldRect:func":"\"const rows = 1;\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = Graphics.boxWidth - width;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","CommandWindow":"","CommandBgType:num":"0","CommandRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = this._goldWindow.x;\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\"","DummyWindow":"","DummyBgType:num":"0","DummyRect:func":"\"const x = 0;\\nconst y = this._commandWindow.y + this._commandWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight() - this._commandWindow.height;\\nreturn new Rectangle(x, y, width, height);\"","NumberWindow":"","NumberBgType:num":"0","NumberRect:func":"\"const x = 0;\\nconst y = this._dummyWindow.y;\\nconst width = Graphics.boxWidth - this.statusWidth();\\nconst height = this._dummyWindow.height;\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const width = this.statusWidth();\\nconst height = this._dummyWindow.height;\\nconst x = Graphics.boxWidth - width;\\nconst y = this._dummyWindow.y;\\nreturn new Rectangle(x, y, width, height);\"","BuyWindow":"","BuyBgType:num":"0","BuyRect:func":"\"const x = 0;\\nconst y = this._dummyWindow.y;\\nconst width = Graphics.boxWidth - this.statusWidth();\\nconst height = this._dummyWindow.height;\\nreturn new Rectangle(x, y, width, height);\"","CategoryWindow":"","CategoryBgType:num":"0","CategoryRect:func":"\"const x = 0;\\nconst y = this._dummyWindow.y;\\nconst rows = 1;\\nconst width = Graphics.boxWidth;\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\"","SellWindow":"","SellBgType:num":"0","SellRect:func":"\"const x = 0;\\nconst y = this._categoryWindow.y + this._categoryWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height =\\n    this.mainAreaHeight() -\\n    this._commandWindow.height -\\n    this._categoryWindow.height;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param NameMenu:struct
 * @text Scene_Name
 * @parent SceneSettings
 * @type struct<NameMenu>
 * @desc Various options on adjusting the Actor Rename Scene.
 * @default {"EditWindow":"","EditBgType:num":"0","EditRect:func":"\"const rows = 9;\\nconst inputWindowHeight = this.calcWindowHeight(rows, true);\\nconst padding = $gameSystem.windowPadding();\\nconst width = 600;\\nconst height = Math.min(ImageManager.faceHeight + padding * 2, this.mainAreaHeight() - inputWindowHeight);\\nconst x = (Graphics.boxWidth - width) / 2;\\nconst y = (this.mainAreaHeight() - (height + inputWindowHeight)) / 2 + this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","InputWindow":"","InputBgType:num":"0","InputRect:func":"\"const x = this._editWindow.x;\\nconst y = this._editWindow.y + this._editWindow.height;\\nconst rows = 9;\\nconst width = this._editWindow.width;\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\""}
 *
 */
/* ----------------------------------------------------------------------------
 * Main Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~MainMenu:
 *
 * @param CommandWindow
 * @text Command Window
 *
 * @param CommandBgType:num
 * @text Background Type
 * @parent CommandWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent CommandWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = this.mainCommandWidth();\nconst height = this.mainAreaHeight() - this.goldWindowRect().height;\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param GoldWindow
 * @text Gold Window
 *
 * @param GoldBgType:num
 * @text Background Type
 * @parent GoldWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param GoldRect:func
 * @text JS: X, Y, W, H
 * @parent GoldWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 1;\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\nconst y = this.mainAreaBottom() - height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = Graphics.boxWidth - this.mainCommandWidth();\nconst height = this.mainAreaHeight();\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Item Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ItemMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.helpAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.helpAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param CategoryWindow
 * @text Category Window
 *
 * @param CategoryBgType:num
 * @text Background Type
 * @parent CategoryWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CategoryRect:func
 * @text JS: X, Y, W, H
 * @parent CategoryWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = Graphics.boxWidth;\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ItemWindow
 * @text Item Window
 *
 * @param ItemBgType:num
 * @text Background Type
 * @parent ItemWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ItemRect:func
 * @text JS: X, Y, W, H
 * @parent ItemWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._categoryWindow.y + this._categoryWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaBottom() - y;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ActorWindow
 * @text Actor Window
 *
 * @param ActorBgType:num
 * @text Background Type
 * @parent ActorWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ActorRect:func
 * @text JS: X, Y, W, H
 * @parent ActorWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Skill Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~SkillMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.helpAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.helpAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param SkillTypeWindow
 * @text Skill Type Window
 *
 * @param SkillTypeBgType:num
 * @text Background Type
 * @parent SkillTypeWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param SkillTypeRect:func
 * @text JS: X, Y, W, H
 * @parent SkillTypeWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 3;\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = Graphics.boxWidth - this.mainCommandWidth();\nconst height = this._skillTypeWindow.height;\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ItemWindow
 * @text Item Window
 *
 * @param ItemBgType:num
 * @text Background Type
 * @parent ItemWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ItemRect:func
 * @text JS: X, Y, W, H
 * @parent ItemWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._statusWindow.y + this._statusWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight() - this._statusWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ActorWindow
 * @text Actor Window
 *
 * @param ActorBgType:num
 * @text Background Type
 * @parent ActorWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ActorRect:func
 * @text JS: X, Y, W, H
 * @parent ActorWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Equip Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~EquipMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.helpAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.helpAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst width = this.statusWidth();\nconst height = this.mainAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param CommandWindow
 * @text Command Window
 *
 * @param CommandBgType:num
 * @text Background Type
 * @parent CommandWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent CommandWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = this.statusWidth();\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = Graphics.boxWidth - this.statusWidth();\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param SlotWindow
 * @text Slot Window
 *
 * @param SlotBgType:num
 * @text Background Type
 * @parent SlotWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param SlotRect:func
 * @text JS: X, Y, W, H
 * @parent SlotWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const commandWindowRect = this.commandWindowRect();\nconst x = this.statusWidth();\nconst y = commandWindowRect.y + commandWindowRect.height;\nconst width = Graphics.boxWidth - this.statusWidth();\nconst height = this.mainAreaHeight() - commandWindowRect.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ItemWindow
 * @text Item Window
 *
 * @param ItemBgType:num
 * @text Background Type
 * @parent ItemWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ItemRect:func
 * @text JS: X, Y, W, H
 * @parent ItemWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "return this.slotWindowRect();"
 *
 */
/* ----------------------------------------------------------------------------
 * Status Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~StatusMenu:
 *
 * @param ProfileWindow
 * @text Profile Window
 *
 * @param ProfileBgType:num
 * @text Background Type
 * @parent ProfileWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ProfileRect:func
 * @text JS: X, Y, W, H
 * @parent ProfileWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = Graphics.boxWidth;\nconst height = this.profileHeight();\nconst x = 0;\nconst y = this.mainAreaBottom() - height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.statusParamsWindowRect().y - y;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusParamsWindow
 * @text Parameters Window
 *
 * @param StatusParamsBgType:num
 * @text Background Type
 * @parent StatusParamsWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusParamsRect:func
 * @text JS: X, Y, W, H
 * @parent StatusParamsWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = this.statusParamsWidth();\nconst height = this.statusParamsHeight();\nconst x = 0;\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusEquipWindow
 * @text Equipment Window
 *
 * @param StatusEquipBgType:num
 * @text Background Type
 * @parent StatusEquipWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusEquipRect:func
 * @text JS: X, Y, W, H
 * @parent StatusEquipWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = Graphics.boxWidth - this.statusParamsWidth();\nconst height = this.statusParamsHeight();\nconst x = this.statusParamsWidth();\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Options Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~OptionsMenu:
 *
 * @param OptionsWindow
 * @text Options Window
 *
 * @param OptionsBgType:num
 * @text Background Type
 * @parent OptionsWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param OptionsRect:func
 * @text JS: X, Y, W, H
 * @parent OptionsWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const n = Math.min(this.maxCommands(), this.maxVisibleCommands());\nconst width = 400;\nconst height = this.calcWindowHeight(n, true);\nconst x = (Graphics.boxWidth - width) / 2;\nconst y = (Graphics.boxHeight - height) / 2;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Save Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~SaveMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = Graphics.boxWidth;\nconst height = this.calcWindowHeight(rows, false);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ListWindow
 * @text List Window
 *
 * @param ListBgType:num
 * @text Background Type
 * @parent ListWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ListRect:func
 * @text JS: X, Y, W, H
 * @parent ListWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop() + this._helpWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight() - this._helpWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Load Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~LoadMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = Graphics.boxWidth;\nconst height = this.calcWindowHeight(rows, false);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ListWindow
 * @text List Window
 *
 * @param ListBgType:num
 * @text Background Type
 * @parent ListWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ListRect:func
 * @text JS: X, Y, W, H
 * @parent ListWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop() + this._helpWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight() - this._helpWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Game End Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~GameEnd:
 *
 * @param CommandList:arraystruct
 * @text Command Window List
 * @type struct<Command>[]
 * @desc Window commands used by the Game End screen.
 * Add new commands here.
 * @default ["{\"Symbol:str\":\"toTitle\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.toTitle;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandToTitle();\\\"\"}","{\"Symbol:str\":\"cancel\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.cancel;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.popScene();\\\"\"}"]
 *
 * @param CommandBgType:num
 * @text Background Type
 * @parent CommandList:arraystruct
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent CommandList:arraystruct
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 2;\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = (Graphics.boxWidth - width) / 2;\nconst y = (Graphics.boxHeight - height) / 2;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Shop Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ShopMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const wx = 0;\nconst wy = this.helpAreaTop();\nconst ww = Graphics.boxWidth;\nconst wh = this.helpAreaHeight();\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 * @param GoldWindow
 * @text Gold Window
 *
 * @param GoldBgType:num
 * @text Background Type
 * @parent GoldWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param GoldRect:func
 * @text JS: X, Y, W, H
 * @parent GoldWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 1;\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = Graphics.boxWidth - width;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param CommandWindow
 * @text Command Window
 *
 * @param CommandBgType:num
 * @text Background Type
 * @parent CommandWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent CommandWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = this._goldWindow.x;\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param DummyWindow
 * @text Dummy Window
 *
 * @param DummyBgType:num
 * @text Background Type
 * @parent DummyWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param DummyRect:func
 * @text JS: X, Y, W, H
 * @parent DummyWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._commandWindow.y + this._commandWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight() - this._commandWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param NumberWindow
 * @text Number Window
 *
 * @param NumberBgType:num
 * @text Background Type
 * @parent NumberWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param NumberRect:func
 * @text JS: X, Y, W, H
 * @parent NumberWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._dummyWindow.y;\nconst width = Graphics.boxWidth - this.statusWidth();\nconst height = this._dummyWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = this.statusWidth();\nconst height = this._dummyWindow.height;\nconst x = Graphics.boxWidth - width;\nconst y = this._dummyWindow.y;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param BuyWindow
 * @text Buy Window
 *
 * @param BuyBgType:num
 * @text Background Type
 * @parent BuyWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param BuyRect:func
 * @text JS: X, Y, W, H
 * @parent BuyWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._dummyWindow.y;\nconst width = Graphics.boxWidth - this.statusWidth();\nconst height = this._dummyWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param CategoryWindow
 * @text Category Window
 *
 * @param CategoryBgType:num
 * @text Background Type
 * @parent CategoryWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CategoryRect:func
 * @text JS: X, Y, W, H
 * @parent CategoryWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._dummyWindow.y;\nconst rows = 1;\nconst width = Graphics.boxWidth;\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param SellWindow
 * @text Sell Window
 *
 * @param SellBgType:num
 * @text Background Type
 * @parent SellWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param SellRect:func
 * @text JS: X, Y, W, H
 * @parent SellWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._categoryWindow.y + this._categoryWindow.height;\nconst width = Graphics.boxWidth;\nconst height =\n    this.mainAreaHeight() -\n    this._commandWindow.height -\n    this._categoryWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Name Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~NameMenu:
 *
 * @param EditWindow
 * @text Edit Window
 *
 * @param EditBgType:num
 * @text Background Type
 * @parent EditWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param EditRect:func
 * @text JS: X, Y, W, H
 * @parent EditWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 9;\nconst inputWindowHeight = this.calcWindowHeight(rows, true);\nconst padding = $gameSystem.windowPadding();\nconst width = 600;\nconst height = Math.min(ImageManager.faceHeight + padding * 2, this.mainAreaHeight() - inputWindowHeight);\nconst x = (Graphics.boxWidth - width) / 2;\nconst y = (this.mainAreaHeight() - (height + inputWindowHeight)) / 2 + this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param InputWindow
 * @text Input Window
 *
 * @param InputBgType:num
 * @text Background Type
 * @parent InputWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param InputRect:func
 * @text JS: X, Y, W, H
 * @parent InputWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = this._editWindow.x;\nconst y = this._editWindow.y + this._editWindow.height;\nconst rows = 9;\nconst width = this._editWindow.width;\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Title Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Title:
 *
 * @param TitleScreen
 * @text Title Screen
 *
 * @param DocumentTitleFmt:str
 * @text Document Title Format
 * @parent TitleScreen
 * @desc Format to display text in document title.
 * %1 - Main Title, %2 - Subtitle, %3 - Version
 * @default %1: %2 - Version %3
 *
 * @param Subtitle:str
 * @text Subtitle
 * @parent TitleScreen
 * @desc Subtitle to be displayed under the title name.
 * @default Subtitle
 *
 * @param Version:str
 * @text Version
 * @parent TitleScreen
 * @desc Version to be display in the title screen corner.
 * @default 0.00
 *
 * @param drawGameTitle:func
 * @text JS: Draw Title
 * @type note
 * @parent TitleScreen
 * @desc Code used to draw the game title.
 * @default "const x = 20;\nconst y = Graphics.height / 4;\nconst maxWidth = Graphics.width - x * 2;\nconst text = $dataSystem.gameTitle;\nconst bitmap = this._gameTitleSprite.bitmap;\nbitmap.fontFace = $gameSystem.mainFontFace();\nbitmap.outlineColor = \"black\";\nbitmap.outlineWidth = 8;\nbitmap.fontSize = 72;\nbitmap.drawText(text, x, y, maxWidth, 48, \"center\");"
 *
 * @param drawGameSubtitle:func
 * @text JS: Draw Subtitle
 * @type note
 * @parent TitleScreen
 * @desc Code used to draw the game subtitle.
 * @default "const x = 20;\nconst y = Graphics.height / 4 + 72;\nconst maxWidth = Graphics.width - x * 2;\nconst text = Scene_Title.subtitle;\nconst bitmap = this._gameTitleSprite.bitmap;\nbitmap.fontFace = $gameSystem.mainFontFace();\nbitmap.outlineColor = \"black\";\nbitmap.outlineWidth = 6;\nbitmap.fontSize = 48;\nbitmap.drawText(text, x, y, maxWidth, 48, \"center\");"
 *
 * @param drawGameVersion:func
 * @text JS: Draw Version
 * @type note
 * @parent TitleScreen
 * @desc Code used to draw the game version.
 * @default "const bitmap = this._gameTitleSprite.bitmap;\nconst x = 0;\nconst y = Graphics.height - 20;\nconst width = Math.round(Graphics.width / 4);\nconst height = 20;\nconst c1 = ColorManager.dimColor1();\nconst c2 = ColorManager.dimColor2();\nconst text = 'Version ' + Scene_Title.version;\nbitmap.gradientFillRect(x, y, width, height, c1, c2);\nbitmap.fontFace = $gameSystem.mainFontFace();\nbitmap.outlineColor = \"black\";\nbitmap.outlineWidth = 3;\nbitmap.fontSize = 16;\nbitmap.drawText(text, x + 4, y, Graphics.width, height, \"left\");"
 *
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent TitleScreen
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const offsetX = $dataSystem.titleCommandWindow.offsetX;\nconst offsetY = $dataSystem.titleCommandWindow.offsetY;\nconst rows = this.commandWindowRows();\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = (Graphics.boxWidth - width) / 2 + offsetX;\nconst y = Graphics.boxHeight - height - 96 + offsetY;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ButtonFadeSpeed:num
 * @text Button Fade Speed
 * @parent TitleScreen
 * @type number
 * @min 1
 * @max 255
 * @desc Speed at which the buttons fade in at (1-255).
 * @default 4
 *
 */
/* ----------------------------------------------------------------------------
 * Parameter Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Param:
 *
 * @param DisplayedParams:arraystr
 * @text Displayed Parameters
 * @type combo[]
 * @option MaxHP
 * @option MaxMP
 * @option ATK
 * @option DEF
 * @option MAT
 * @option MDF
 * @option AGI
 * @option LUK
 * @option HIT
 * @option EVA
 * @option CRI
 * @option CEV
 * @option MEV
 * @option MRF
 * @option CNT
 * @option HRG
 * @option MRG
 * @option TRG
 * @option TGR
 * @option GRD
 * @option REC
 * @option PHA
 * @option MCR
 * @option TCR
 * @option PDR
 * @option MDR
 * @option FDR
 * @option EXR
 * @desc A list of the parameters that will be displayed in-game.
 * @default ["ATK","DEF","MAT","MDF","AGI","LUK"]
 *
 * @param ExtDisplayedParams:arraystr
 * @text Extended Parameters
 * @parent DisplayedParams:arraystr
 * @type combo[]
 * @option MaxHP
 * @option MaxMP
 * @option ATK
 * @option DEF
 * @option MAT
 * @option MDF
 * @option AGI
 * @option LUK
 * @option HIT
 * @option EVA
 * @option CRI
 * @option CEV
 * @option MEV
 * @option MRF
 * @option CNT
 * @option HRG
 * @option MRG
 * @option TRG
 * @option TGR
 * @option GRD
 * @option REC
 * @option PHA
 * @option MCR
 * @option TCR
 * @option PDR
 * @option MDR
 * @option FDR
 * @option EXR
 * @desc The list shown in extended scenes (for other VisuStella plugins).
 * @default ["MaxHP","MaxMP","ATK","DEF","MAT","MDF","AGI","LUK"]
 *
 * @param BasicParameters
 * @text Basic Parameters
 *
 * @param CrisisRate:num
 * @text HP Crisis Rate
 * @parent BasicParameters
 * @desc HP Ratio at which a battler can be considered in crisis mode.
 * @default 0.25
 *
 * @param BasicParameterFormula:func
 * @text JS: Formula
 * @parent BasicParameters
 * @type note
 * @desc Formula used to determine the total value all 8 basic parameters: MaxHP, MaxMP, ATK, DEF, MAT, MDF, AGI, LUK.
 * @default "// Determine the variables used in this calculation.\nlet paramId = arguments[0];\nlet base = this.paramBase(paramId);\nlet plus = this.paramPlus(paramId);\nlet paramRate = this.paramRate(paramId);\nlet buffRate = this.paramBuffRate(paramId);\nlet flatBonus = this.paramFlatBonus(paramId);\n\n// Formula to determine total parameter value.\nlet value = (base + plus) * paramRate * buffRate + flatBonus;\n\n// Determine the limits\nconst maxValue = this.paramMax(paramId);\nconst minValue = this.paramMin(paramId);\n\n// Final value\nreturn Math.round(value.clamp(minValue, maxValue));"
 *
 * @param BasicParamCaps
 * @text Parameter Caps
 * @parent BasicParameters
 *
 * @param BasicActorParamCaps
 * @text Actors
 * @parent BasicParamCaps
 *
 * @param BasicActorParamMax0:str
 * @text MaxHP Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine MaxHP cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 9999
 *
 * @param BasicActorParamMax1:str
 * @text MaxMP Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine MaxMP cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 9999
 *
 * @param BasicActorParamMax2:str
 * @text ATK Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine ATK cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax3:str
 * @text DEF Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine DEF cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax4:str
 * @text MAT Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine MAT cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax5:str
 * @text MDF Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine MDF cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax6:str
 * @text AGI Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine AGI cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax7:str
 * @text LUK Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine LUK cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamCaps
 * @text Enemies
 * @parent BasicParamCaps
 *
 * @param BasicEnemyParamMax0:str
 * @text MaxHP Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine MaxHP cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999999
 *
 * @param BasicEnemyParamMax1:str
 * @text MaxMP Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine MaxMP cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 9999
 *
 * @param BasicEnemyParamMax2:str
 * @text ATK Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine ATK cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax3:str
 * @text DEF Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine DEF cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax4:str
 * @text MAT Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine MAT cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax5:str
 * @text MDF Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine MDF cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax6:str
 * @text AGI Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine AGI cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax7:str
 * @text LUK Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine LUK cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param XParameters
 * @text X Parameters
 *
 * @param XParameterFormula:func
 * @text JS: Formula
 * @parent XParameters
 * @type note
 * @desc Formula used to determine the total value all 10 X parameters: HIT, EVA, CRI, CEV, MEV, MRF, CNT, HRG, MRG, TRG.
 * @default "// Determine the variables used in this calculation.\nlet xparamId = arguments[0];\nlet base = this.traitsSum(Game_BattlerBase.TRAIT_XPARAM, xparamId);\nlet plus = this.xparamPlus(xparamId);\nlet paramRate = this.xparamRate(xparamId);\nlet flatBonus = this.xparamFlatBonus(xparamId);\n\n// Formula to determine total parameter value.\nlet value = (base + plus) * paramRate + flatBonus;\n\n// Final value\nreturn value;"
 *
 * @param XParamVocab
 * @text Vocabulary
 * @parent XParameters
 *
 * @param XParamVocab0:str
 * @text HIT
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Hit
 *
 * @param XParamVocab1:str
 * @text EVA
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Evasion
 *
 * @param XParamVocab2:str
 * @text CRI
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Crit.Rate
 *
 * @param XParamVocab3:str
 * @text CEV
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Crit.Evade
 *
 * @param XParamVocab4:str
 * @text MEV
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Magic Evade
 *
 * @param XParamVocab5:str
 * @text MRF
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Magic Reflect
 *
 * @param XParamVocab6:str
 * @text CNT
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Counter
 *
 * @param XParamVocab7:str
 * @text HRG
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default HP Regen
 *
 * @param XParamVocab8:str
 * @text MRG
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default MP Regen
 *
 * @param XParamVocab9:str
 * @text TRG
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default TP Regen
 *
 * @param SParameters
 * @text S Parameters
 *
 * @param SParameterFormula:func
 * @text JS: Formula
 * @parent SParameters
 * @type note
 * @desc Formula used to determine the total value all 10 S parameters: TGR, GRD, REC, PHA, MCR, TCR, PDR, MDR, FDR, EXR.
 * @default "// Determine the variables used in this calculation.\nlet sparamId = arguments[0];\nlet base = this.traitsPi(Game_BattlerBase.TRAIT_SPARAM, sparamId);\nlet plus = this.sparamPlus(sparamId);\nlet paramRate = this.sparamRate(sparamId);\nlet flatBonus = this.sparamFlatBonus(sparamId);\n\n// Formula to determine total parameter value.\nlet value = (base + plus) * paramRate + flatBonus;\n\n// Final value\nreturn value;"
 *
 * @param SParamVocab
 * @text Vocabulary
 * @parent SParameters
 *
 * @param SParamVocab0:str
 * @text TGR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Aggro
 *
 * @param SParamVocab1:str
 * @text GRD
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Guard
 *
 * @param SParamVocab2:str
 * @text REC
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Recovery
 *
 * @param SParamVocab3:str
 * @text PHA
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Item Effect
 *
 * @param SParamVocab4:str
 * @text MCR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default MP Cost
 *
 * @param SParamVocab5:str
 * @text TCR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default TP Charge
 *
 * @param SParamVocab6:str
 * @text PDR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Physical DMG
 *
 * @param SParamVocab7:str
 * @text MDR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Magical DMG
 *
 * @param SParamVocab8:str
 * @text FDR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Floor DMG
 *
 * @param SParamVocab9:str
 * @text EXR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default EXP Gain
 *
 * @param Icons
 * @text Icons
 *
 * @param DrawIcons:eval
 * @text Draw Icons?
 * @parent Icons
 * @type boolean
 * @on Draw
 * @off Don't Draw
 * @desc Draw icons next to parameter names?
 * @default true
 *
 * @param IconParam0:str
 * @text MaxHP
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 84
 *
 * @param IconParam1:str
 * @text MaxMP
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 165
 *
 * @param IconParam2:str
 * @text ATK
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 76
 *
 * @param IconParam3:str
 * @text DEF
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 81
 *
 * @param IconParam4:str
 * @text MAT
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 101
 *
 * @param IconParam5:str
 * @text MDF
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 133
 *
 * @param IconParam6:str
 * @text AGI
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 140
 *
 * @param IconParam7:str
 * @text LUK
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 87
 *
 * @param IconXParam0:str
 * @text HIT
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 102
 *
 * @param IconXParam1:str
 * @text EVA
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 82
 *
 * @param IconXParam2:str
 * @text CRI
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 78
 *
 * @param IconXParam3:str
 * @text CEV
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 82
 *
 * @param IconXParam4:str
 * @text MEV
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 171
 *
 * @param IconXParam5:str
 * @text MRF
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 222
 *
 * @param IconXParam6:str
 * @text CNT
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 77
 *
 * @param IconXParam7:str
 * @text HRG
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 72
 *
 * @param IconXParam8:str
 * @text MRG
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 72
 *
 * @param IconXParam9:str
 * @text TRG
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 72
 *
 * @param IconSParam0:str
 * @text TGR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 5
 *
 * @param IconSParam1:str
 * @text GRD
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 128
 *
 * @param IconSParam2:str
 * @text REC
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 72
 *
 * @param IconSParam3:str
 * @text PHA
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 176
 *
 * @param IconSParam4:str
 * @text MCR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 165
 *
 * @param IconSParam5:str
 * @text TCR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 164
 *
 * @param IconSParam6:str
 * @text PDR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 76
 *
 * @param IconSParam7:str
 * @text MDR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 79
 *
 * @param IconSParam8:str
 * @text FDR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 141
 *
 * @param IconSParam9:str
 * @text EXR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 73
 *
 */
/* ----------------------------------------------------------------------------
 * Commands Struct
 * ----------------------------------------------------------------------------
 */
/*~struct~Command:
 *
 * @param Symbol:str
 * @text Symbol
 * @desc The symbol used for this command.
 * @default Symbol
 *
 * @param TextStr:str
 * @text STR: Text
 * @desc Displayed text used for this title command.
 * If this has a value, ignore the JS: Text version.
 * @default Untitled
 *
 * @param TextJS:func
 * @text JS: Text
 * @type note
 * @desc JavaScript code used to determine string used for the displayed name.
 * @default "return 'Text';"
 *
 * @param ShowJS:func
 * @text JS: Show
 * @type note
 * @desc JavaScript code used to determine if the item is shown or not.
 * @default "return true;"
 *
 * @param EnableJS:func
 * @text JS: Enable
 * @type note
 * @desc JavaScript code used to determine if the item is enabled or not.
 * @default "return true;"
 *
 * @param ExtJS:func
 * @text JS: Ext
 * @type note
 * @desc JavaScript code used to determine any ext data that should be added.
 * @default "return null;"
 *
 * @param CallHandlerJS:func
 * @text JS: Run Code
 * @type note
 * @desc JavaScript code that runs once this command is selected.
 * @default ""
 *
 */
/* ----------------------------------------------------------------------------
 * Title Picture Buttons
 * ----------------------------------------------------------------------------
 */
/*~struct~TitlePictureButton:
 *
 * @param PictureFilename:str
 * @text Picture's Filename
 * @type file
 * @dir img/pictures/
 * @desc Filename used for the picture.
 * @default 
 *
 * @param ButtonURL:str
 * @text Button URL
 * @desc URL for the button to go to upon being clicked.
 * @default https://www.google.com/
 *
 * @param PositionJS:func
 * @text JS: Position
 * @type note
 * @desc JavaScript code that helps determine the button's Position.
 * @default "this.x = Graphics.width - this.bitmap.width - 20;\nthis.y = Graphics.height - this.bitmap.height - 20;"
 *
 * @param OnLoadJS:func
 * @text JS: On Load
 * @type note
 * @desc JavaScript code that runs once this button bitmap is loaded.
 * @default "this.opacity = 0;\nthis.visible = true;"
 *
 * @param CallHandlerJS:func
 * @text JS: Run Code
 * @type note
 * @desc JavaScript code that runs once this button is pressed.
 * @default "const url = this._data.ButtonURL;\nVisuMZ.openURL(url);"
 *
 */
/* ----------------------------------------------------------------------------
 * UI Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~UI:
 *
 * @param UIArea
 * @text UI Area
 *
 * @param FadeSpeed:num
 * @text Fade Speed
 * @parent UIArea
 * @desc Default fade speed for transitions.
 * @default 24
 *
 * @param BoxMargin:num
 * @text Box Margin
 * @parent UIArea
 * @type number
 * @min 0
 * @desc Set the margin in pixels for the screen borders.
 * Default: 4
 * @default 4
 *
 * @param CommandWidth:num
 * @text Command Window Width
 * @parent UIArea
 * @type number
 * @min 1
 * @desc Sets the width for standard Command Windows.
 * Default: 240
 * @default 240
 *
 * @param BottomHelp:eval
 * @text Bottom Help Window
 * @parent UIArea
 * @type boolean
 * @on Bottom
 * @off Top
 * @desc Put the Help Window at the bottom of the screen?
 * @default false
 *
 * @param RightMenus:eval
 * @text Right Aligned Menus
 * @parent UIArea
 * @type boolean
 * @on Right
 * @off Left
 * @desc Put most command windows to the right side of the screen.
 * @default true
 *
 * @param ShowButtons:eval
 * @text Show Buttons
 * @parent UIArea
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show clickable buttons in your game?
 * This will affect all buttons.
 * @default true
 *
 * @param cancelShowButton:eval
 * @text Show Cancel Button
 * @parent ShowButtons:eval
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show cancel button?
 * If 'Show Buttons' is false, this will be hidden.
 * @default true
 *
 * @param menuShowButton:eval
 * @text Show Menu Button
 * @parent ShowButtons:eval
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show main menu button from the map scene?
 * If 'Show Buttons' is false, this will be hidden.
 * @default true
 *
 * @param pagedownShowButton:eval
 * @text Show Page Up/Down
 * @parent ShowButtons:eval
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show page up/down buttons?
 * If 'Show Buttons' is false, this will be hidden.
 * @default true
 *
 * @param numberShowButton:eval
 * @text Show Number Buttons
 * @parent ShowButtons:eval
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show number adjustment buttons?
 * If 'Show Buttons' is false, this will be hidden.
 * @default true
 *
 * @param ButtonHeight:num
 * @text Button Area Height
 * @parent UIArea
 * @type number
 * @min 1
 * @desc Sets the height for the button area.
 * Default: 52
 * @default 52
 *
 * @param BottomButtons:eval
 * @text Bottom Buttons
 * @parent UIArea
 * @type boolean
 * @on Bottom
 * @off Top
 * @desc Put the buttons at the bottom of the screen?
 * @default false
 *
 * @param SideButtons:eval
 * @text Side Buttons
 * @parent UIArea
 * @type boolean
 * @on Side
 * @off Normal
 * @desc Push buttons to the side of the UI if there is room.
 * @default true
 *
 * @param MenuObjects
 * @text Menu Objects
 *
 * @param LvExpGauge:eval
 * @text Level -> EXP Gauge
 * @parent MenuObjects
 * @type boolean
 * @on Draw Gauge
 * @off Keep As Is
 * @desc Draw an EXP Gauge under the drawn level.
 * @default true
 *
 * @param ParamArrow:str
 * @text Parameter Arrow
 * @parent MenuObjects
 * @desc The arrow used to show changes in the parameter values.
 * @default →
 *
 * @param TextCodeSupport
 * @text Text Code Support
 *
 * @param TextCodeClassNames:eval
 * @text Class Names
 * @parent TextCodeSupport
 * @type boolean
 * @on Suport Text Codes
 * @off Normal Text
 * @desc Make class names support text codes?
 * @default true
 *
 * @param TextCodeNicknames:eval
 * @text Nicknames
 * @parent TextCodeSupport
 * @type boolean
 * @on Suport Text Codes
 * @off Normal Text
 * @desc Make nicknames support text codes?
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Window Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Window:
 *
 * @param WindowDefaults
 * @text Defaults
 *
 * @param EnableMasking:eval
 * @text Enable Masking
 * @parent WindowDefaults
 * @type boolean
 * @on Masking On
 * @off Masking Off
 * @desc Enable window masking (windows hide other windows behind 
 * them)? WARNING: Turning it on can obscure data.
 * @default false
 *
 * @param LineHeight:num
 * @text Line Height
 * @parent WindowDefaults
 * @desc Default line height used for standard windows.
 * Default: 36
 * @default 36
 *
 * @param ItemPadding:num
 * @text Item Padding
 * @parent WindowDefaults
 * @desc Default line padding used for standard windows.
 * Default: 8
 * @default 8
 *
 * @param BackOpacity:num
 * @text Back Opacity
 * @parent WindowDefaults
 * @desc Default back opacity used for standard windows.
 * Default: 192
 * @default 192
 *
 * @param TranslucentOpacity:num
 * @text Translucent Opacity
 * @parent WindowDefaults
 * @desc Default translucent opacity used for standard windows.
 * Default: 160
 * @default 160
 *
 * @param OpenSpeed:num
 * @text Window Opening Speed
 * @parent WindowDefaults
 * @desc Default open speed used for standard windows.
 * Default: 32 (Use a number between 0-255)
 * @default 32
 * @default 24
 *
 * @param ColSpacing:num
 * @text Column Spacing
 * @parent WindowDefaults
 * @desc Default column spacing for selectable windows.
 * Default: 8
 * @default 8
 *
 * @param RowSpacing:num
 * @text Row Spacing
 * @parent WindowDefaults
 * @desc Default row spacing for selectable windows.
 * Default: 4
 * @default 4
 * 
 * @param SelectableItems
 * @text Selectable Items
 *
 * @param ShowItemBackground:eval
 * @text Show Background?
 * @parent SelectableItems
 * @type boolean
 * @on Show Backgrounds
 * @off No backgrounds.
 * @desc Selectable menu items have dark boxes behind them. Show them?
 * @default true
 *
 * @param ItemHeight:num
 * @text Item Height Padding
 * @parent SelectableItems
 * @desc Default padding for selectable items.
 * Default: 8
 * @default 8
 *
 * @param DrawItemBackgroundJS:func
 * @text JS: Draw Background
 * @parent SelectableItems
 * @type note
 * @desc Code used to draw the background rectangle behind clickable menu objects
 * @default "const rect = arguments[0];\nconst c1 = ColorManager.itemBackColor1();\nconst c2 = ColorManager.itemBackColor2();\nconst x = rect.x;\nconst y = rect.y;\nconst w = rect.width;\nconst h = rect.height;\nthis.contentsBack.gradientFillRect(x, y, w, h, c1, c2, true);\nthis.contentsBack.strokeRect(x, y, w, h, c1);"
 */
/* ----------------------------------------------------------------------------
 * Screen Resolution Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ScreenResolution:
 *
 * @param Troops
 *
 * @param RepositionActors:eval
 * @text Reposition Actors
 * @parent Troops
 * @type boolean
 * @on Reposition
 * @off Keep As Is
 * @desc Update the position of actors in battle if the screen resolution has changed. Ignore if using Battle Core.
 * @default true
 *
 * @param RepositionEnemies:eval
 * @text Reposition Enemies
 * @parent Troops
 * @type boolean
 * @on Reposition
 * @off Keep As Is
 * @desc Update the position of enemies in battle if the screen resolution has changed.
 * @default true
 *
 * @param RepositionEnemies130:eval
 * @text For MZ 1.3.0+?
 * @parent RepositionEnemies:eval
 * @type boolean
 * @on Reposition
 * @off Keep As Is
 * @desc Both this parameter and its parent parameter need to be on when using RPG Maker MZ 1.3.0+.
 * @default false
 *
 */
/* ----------------------------------------------------------------------------
 * Screen Shake Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ScreenShake:
 *
 * @param DefaultStyle:str
 * @text Default Style
 * @type select
 * @option Original
 * @value original
 * @option Random
 * @value random
 * @option Horizontal
 * @value horizontal
 * @option Vertical
 * @value vertical
 * @desc The default style used for screen shakes.
 * @default random
 *
 * @param originalJS:func
 * @text JS: Original Style
 * @type note
 * @desc This code gives you control over screen shake for this
 * screen shake style.
 * @default "// Calculation\nthis.x += Math.round($gameScreen.shake());"
 *
 * @param randomJS:func
 * @text JS: Random Style
 * @type note
 * @desc This code gives you control over screen shake for this
 * screen shake style.
 * @default "// Calculation\n// Original Formula by Aries of Sheratan\nconst power = $gameScreen._shakePower * 0.75;\nconst speed = $gameScreen._shakeSpeed * 0.60;\nconst duration = $gameScreen._shakeDuration;\nthis.x += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\nthis.y += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);"
 *
 * @param horzJS:func
 * @text JS: Horizontal Style
 * @type note
 * @desc This code gives you control over screen shake for this
 * screen shake style.
 * @default "// Calculation\n// Original Formula by Aries of Sheratan\nconst power = $gameScreen._shakePower * 0.75;\nconst speed = $gameScreen._shakeSpeed * 0.60;\nconst duration = $gameScreen._shakeDuration;\nthis.x += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);"
 *
 * @param vertJS:func
 * @text JS: Vertical Style
 * @type note
 * @desc This code gives you control over screen shake for this
 * screen shake style.
 * @default "// Calculation\n// Original Formula by Aries of Sheratan\nconst power = $gameScreen._shakePower * 0.75;\nconst speed = $gameScreen._shakeSpeed * 0.60;\nconst duration = $gameScreen._shakeDuration;\nthis.y += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);"
 *
 */
/* ----------------------------------------------------------------------------
 * Custom Parameter Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~CustomParam:
 *
 * @param ParamName:str
 * @text Parameter Name
 * @desc What's the parameter's name?
 * Used for VisuStella MZ menus.
 * @default Untitled
 *
 * @param Abbreviation:str
 * @text Abbreviation
 * @parent ParamName:str
 * @desc What abbreviation do you want to use for the parameter?
 * Do not use special characters. Avoid numbers if possible.
 * @default unt
 *
 * @param Icon:num
 * @text Icon
 * @parent ParamName:str
 * @desc What icon do you want to use to represent this parameter?
 * Used for VisuStella MZ menus.
 * @default 160
 *
 * @param Type:str
 * @text Type
 * @parent ParamName:str
 * @type select
 * @option Integer (Whole Numbers Only)
 * @value integer
 * @option Float (Decimals are Allowed)
 * @value float
 * @desc What kind of number value will be returned with this parameter?
 * @default integer
 *
 * @param ValueJS:json
 * @text JS: Value
 * @type note
 * @desc Run this code when this parameter is to be returned.
 * @default "// Declare Constants\nconst user = this;\n\n// Calculations\nreturn 1;"
 *
 */
/* ----------------------------------------------------------------------------
 * Show Picture Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ShowPicture:
 * 
 * @param Position
 *
 * @param Origin:num
 * @text Origin
 * @parent Position
 * @type select
 * @option 0 - Upper Left
 * @value 0
 * @option 1 - Center
 * @value 1
 * @desc What is the origin of this picture icon?
 * @default 0
 *
 * @param PositionX:eval
 * @text Position X
 * @parent Position
 * @desc X coordinate of the picture.
 * You may use JavaScript code.
 * @default 0
 *
 * @param PositionY:eval
 * @text Position Y
 * @parent Position
 * @desc Y coordinate of the picture.
 * You may use JavaScript code.
 * @default 0
 * 
 * @param Scale
 *
 * @param ScaleX:eval
 * @text Width %
 * @parent Scale
 * @desc Horizontal scale of the picture.
 * You may use JavaScript code.
 * @default 100
 *
 * @param ScaleY:eval
 * @text Height %
 * @parent Scale
 * @desc Vertical scale of the picture.
 * You may use JavaScript code.
 * @default 100
 * 
 * @param Blend
 *
 * @param Opacity:eval
 * @text Opacity
 * @parent Blend
 * @desc Insert a number to determine opacity level. Use a
 * number between 0 and 255. You may use JavaScript code.
 * @default 255
 *
 * @param BlendMode:num
 * @text Blend Mode
 * @parent Blend
 * @type select
 * @option 0 - Normal
 * @value 0
 * @option 1 - Additive
 * @value 1
 * @option 2 - Multiply
 * @value 2
 * @option 3 - Screen
 * @value 3
 * @desc What kind of blend mode do you wish to apply to the picture?
 * @default 0
 *
 */
/* ----------------------------------------------------------------------------
 * JS Quick Function Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~jsQuickFunc:
 *
 * @param FunctionName:str
 * @text Function Name
 * @desc The function's name in the global namespace.
 * Will not overwrite functions/variables of the same name.
 * @default Untitled
 *
 * @param CodeJS:json
 * @text JS: Code
 * @type note
 * @desc Run this code when using the function.
 * @default "// Insert this as a function anywhere you can input code\n// such as Script Calls or Conditional Branch Scripts.\n\n// Process Code\n"
 *
 */
//=============================================================================

const _0x59226c=_0x232c;(function(_0x425a0e,_0x55cc0e){const _0x37ae30=_0x232c,_0x3db606=_0x425a0e();while(!![]){try{const _0x282e6d=parseInt(_0x37ae30(0x3ec))/0x1*(parseInt(_0x37ae30(0x57a))/0x2)+-parseInt(_0x37ae30(0x7a6))/0x3*(parseInt(_0x37ae30(0x747))/0x4)+parseInt(_0x37ae30(0x7b9))/0x5*(parseInt(_0x37ae30(0x8ef))/0x6)+-parseInt(_0x37ae30(0x846))/0x7*(parseInt(_0x37ae30(0x37d))/0x8)+-parseInt(_0x37ae30(0x1bb))/0x9+parseInt(_0x37ae30(0x5cd))/0xa+parseInt(_0x37ae30(0x45c))/0xb;if(_0x282e6d===_0x55cc0e)break;else _0x3db606['push'](_0x3db606['shift']());}catch(_0x22f984){_0x3db606['push'](_0x3db606['shift']());}}}(_0xaee0,0xc9756));var label=_0x59226c(0x2d3),tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x59226c(0x931)](function(_0x2f3ca1){const _0x157ec0=_0x59226c;return _0x2f3ca1['status']&&_0x2f3ca1[_0x157ec0(0x5a7)]['includes']('['+label+']');})[0x0];VisuMZ[label]['Settings']=VisuMZ[label][_0x59226c(0x6ad)]||{},VisuMZ[_0x59226c(0x5cf)]=function(_0x28c54b,_0x3339bb){const _0x5a5878=_0x59226c;for(const _0xec1e76 in _0x3339bb){if(_0xec1e76[_0x5a5878(0x25f)](/(.*):(.*)/i)){const _0x37498d=String(RegExp['$1']),_0x82b36=String(RegExp['$2'])[_0x5a5878(0x657)]()[_0x5a5878(0x7e8)]();let _0x5b8b3e,_0x51939e,_0x396b88;switch(_0x82b36){case _0x5a5878(0x3b1):_0x5b8b3e=_0x3339bb[_0xec1e76]!==''?Number(_0x3339bb[_0xec1e76]):0x0;break;case _0x5a5878(0x4c2):_0x51939e=_0x3339bb[_0xec1e76]!==''?JSON[_0x5a5878(0x43f)](_0x3339bb[_0xec1e76]):[],_0x5b8b3e=_0x51939e[_0x5a5878(0x8b1)](_0x4708ad=>Number(_0x4708ad));break;case _0x5a5878(0x3c1):_0x5b8b3e=_0x3339bb[_0xec1e76]!==''?eval(_0x3339bb[_0xec1e76]):null;break;case _0x5a5878(0x759):_0x51939e=_0x3339bb[_0xec1e76]!==''?JSON['parse'](_0x3339bb[_0xec1e76]):[],_0x5b8b3e=_0x51939e[_0x5a5878(0x8b1)](_0xd1a40d=>eval(_0xd1a40d));break;case _0x5a5878(0x79c):_0x5b8b3e=_0x3339bb[_0xec1e76]!==''?JSON[_0x5a5878(0x43f)](_0x3339bb[_0xec1e76]):'';break;case _0x5a5878(0x40b):_0x51939e=_0x3339bb[_0xec1e76]!==''?JSON[_0x5a5878(0x43f)](_0x3339bb[_0xec1e76]):[],_0x5b8b3e=_0x51939e[_0x5a5878(0x8b1)](_0x15c080=>JSON[_0x5a5878(0x43f)](_0x15c080));break;case _0x5a5878(0x505):_0x5b8b3e=_0x3339bb[_0xec1e76]!==''?new Function(JSON[_0x5a5878(0x43f)](_0x3339bb[_0xec1e76])):new Function('return\x200');break;case _0x5a5878(0x74f):_0x51939e=_0x3339bb[_0xec1e76]!==''?JSON[_0x5a5878(0x43f)](_0x3339bb[_0xec1e76]):[],_0x5b8b3e=_0x51939e[_0x5a5878(0x8b1)](_0x4478f4=>new Function(JSON[_0x5a5878(0x43f)](_0x4478f4)));break;case _0x5a5878(0x600):_0x5b8b3e=_0x3339bb[_0xec1e76]!==''?String(_0x3339bb[_0xec1e76]):'';break;case _0x5a5878(0x60a):_0x51939e=_0x3339bb[_0xec1e76]!==''?JSON[_0x5a5878(0x43f)](_0x3339bb[_0xec1e76]):[],_0x5b8b3e=_0x51939e[_0x5a5878(0x8b1)](_0x51e4e2=>String(_0x51e4e2));break;case _0x5a5878(0x6d9):_0x396b88=_0x3339bb[_0xec1e76]!==''?JSON[_0x5a5878(0x43f)](_0x3339bb[_0xec1e76]):{},_0x28c54b[_0x37498d]={},VisuMZ['ConvertParams'](_0x28c54b[_0x37498d],_0x396b88);continue;case _0x5a5878(0x5b2):_0x51939e=_0x3339bb[_0xec1e76]!==''?JSON[_0x5a5878(0x43f)](_0x3339bb[_0xec1e76]):[],_0x5b8b3e=_0x51939e[_0x5a5878(0x8b1)](_0x21fe30=>VisuMZ[_0x5a5878(0x5cf)]({},JSON['parse'](_0x21fe30)));break;default:continue;}_0x28c54b[_0x37498d]=_0x5b8b3e;}}return _0x28c54b;},(_0x2a418a=>{const _0x306fd7=_0x59226c,_0x749fd8=_0x2a418a[_0x306fd7(0x3b0)];for(const _0x2c9eb2 of dependencies){if('PglTx'===_0x306fd7(0x654))this[_0x306fd7(0x245)](_0x306fd7(0x421));else{if(!Imported[_0x2c9eb2]){if(_0x306fd7(0x394)!==_0x306fd7(0x35b)){alert(_0x306fd7(0x874)[_0x306fd7(0x538)](_0x749fd8,_0x2c9eb2)),SceneManager[_0x306fd7(0x436)]();break;}else{const _0x208eb6=0x90,_0x33ec06=0x60,_0x1a1255=0x18;this[_0x306fd7(0x8e5)][_0x306fd7(0x22a)]=this['_windowskin'],this[_0x306fd7(0x8e5)][_0x306fd7(0x697)]['x']=0.5,this[_0x306fd7(0x8e5)][_0x306fd7(0x697)]['y']=0x1,this[_0x306fd7(0x8e5)][_0x306fd7(0x39d)](_0x2adc97['round'](this['_width']/0x2),this[_0x306fd7(0x6a3)]),this['_pauseSignSprite'][_0x306fd7(0x828)](_0x208eb6,_0x33ec06,_0x1a1255,_0x1a1255),this['_pauseSignSprite'][_0x306fd7(0x5ac)]=0xff;}}}}const _0x53cb87=_0x2a418a[_0x306fd7(0x5a7)];if(_0x53cb87[_0x306fd7(0x25f)](/\[Version[ ](.*?)\]/i)){const _0x372ec3=Number(RegExp['$1']);_0x372ec3!==VisuMZ[label][_0x306fd7(0x799)]&&(alert(_0x306fd7(0x7e0)[_0x306fd7(0x538)](_0x749fd8,_0x372ec3)),SceneManager[_0x306fd7(0x436)]());}if(_0x53cb87[_0x306fd7(0x25f)](/\[Tier[ ](\d+)\]/i)){const _0x2fe338=Number(RegExp['$1']);if(_0x2fe338<tier){if(_0x306fd7(0x2eb)!==_0x306fd7(0x90e))alert(_0x306fd7(0x3ee)[_0x306fd7(0x538)](_0x749fd8,_0x2fe338,tier)),SceneManager['exit']();else{var _0x49d167=_0x26d71d(_0x38485c['$1'])/0x64;_0x39cb97+=_0x49d167;}}else _0x306fd7(0x710)!==_0x306fd7(0x710)?this[_0x306fd7(0x74a)]():tier=Math[_0x306fd7(0x228)](_0x2fe338,tier);}VisuMZ[_0x306fd7(0x5cf)](VisuMZ[label][_0x306fd7(0x6ad)],_0x2a418a[_0x306fd7(0x8bb)]);})(pluginData),((()=>{const _0x271fe7=_0x59226c;if(VisuMZ[_0x271fe7(0x2d3)][_0x271fe7(0x6ad)][_0x271fe7(0x509)][_0x271fe7(0x2fd)]??!![]){if(_0x271fe7(0x650)===_0x271fe7(0x951))return this[_0x271fe7(0x4af)][_0x271fe7(0x7d3)]();else for(const _0x27b001 in $plugins){const _0x5a0e28=$plugins[_0x27b001];if(_0x5a0e28[_0x271fe7(0x3b0)]['match'](/(.*)\/(.*)/i)){if('MteUa'!==_0x271fe7(0x87b))_0x5a0e28[_0x271fe7(0x3b0)]=String(RegExp['$2'][_0x271fe7(0x7e8)]());else{if(_0x3b6280[_0x271fe7(0x246)]['match'](/<SHOW TILE SHADOWS>/i))this[_0x271fe7(0x36c)]=![];if(_0x5a45d2[_0x271fe7(0x246)][_0x271fe7(0x25f)](/<HIDE TILE SHADOWS>/i))this['_hideTileShadows']=!![];}}}}})()),PluginManager[_0x59226c(0x2a4)](pluginData['name'],_0x59226c(0x45b),_0x4fc251=>{const _0x576ac1=_0x59226c;if(!SceneManager['_scene'])return;if(!SceneManager['_scene']['_spriteset'])return;VisuMZ[_0x576ac1(0x5cf)](_0x4fc251,_0x4fc251);const _0x8a35f4=Math[_0x576ac1(0x93a)](_0x4fc251[_0x576ac1(0x1cb)]),_0x153eb8=Math[_0x576ac1(0x93a)](_0x4fc251['pointY']);$gameTemp[_0x576ac1(0x937)](_0x8a35f4,_0x153eb8,_0x4fc251['AnimationID'],_0x4fc251[_0x576ac1(0x713)],_0x4fc251[_0x576ac1(0x1e1)]);}),PluginManager[_0x59226c(0x2a4)](pluginData[_0x59226c(0x3b0)],_0x59226c(0x788),_0x590eb8=>{const _0x22a62a=_0x59226c;if(!$gameTemp[_0x22a62a(0x31b)]())return;if(!Utils['isNwjs']())return;SceneManager[_0x22a62a(0x306)][_0x22a62a(0x304)]=![],VisuMZ['CoreEngine'][_0x22a62a(0x454)]();}),PluginManager[_0x59226c(0x2a4)](pluginData[_0x59226c(0x3b0)],_0x59226c(0x5b7),_0x5e5eca=>{const _0xbf0c8a=_0x59226c;if(!$gameTemp[_0xbf0c8a(0x31b)]())return;if(!Utils[_0xbf0c8a(0x2d5)]())return;SceneManager[_0xbf0c8a(0x306)][_0xbf0c8a(0x304)]=![],VisuMZ[_0xbf0c8a(0x2d3)]['ExportStrFromAllTroops']();}),PluginManager[_0x59226c(0x2a4)](pluginData['name'],_0x59226c(0x327),_0x144ba2=>{const _0x2b303f=_0x59226c;if(!$gameTemp[_0x2b303f(0x31b)]())return;if(!Utils[_0x2b303f(0x2d5)]())return;if(!$gameMap)return;if($gameMap['mapId']()<=0x0)return;VisuMZ[_0x2b303f(0x5cf)](_0x144ba2,_0x144ba2);const _0x2a4a92=_0x2b303f(0x28d)[_0x2b303f(0x538)]($gameMap[_0x2b303f(0x51a)]()[_0x2b303f(0x4f5)](0x3)),_0x2f5d98=VisuMZ[_0x2b303f(0x2d3)][_0x2b303f(0x72f)]($gameMap[_0x2b303f(0x51a)]());VisuMZ[_0x2b303f(0x2d3)][_0x2b303f(0x7ed)](_0x2f5d98,_0x2a4a92,!![]);}),PluginManager[_0x59226c(0x2a4)](pluginData['name'],'ExportCurTroopText',_0x591f0e=>{const _0x2ff2eb=_0x59226c;if(!$gameTemp[_0x2ff2eb(0x31b)]())return;if(!Utils[_0x2ff2eb(0x2d5)]())return;if(!$gameParty[_0x2ff2eb(0x2f1)]())return;VisuMZ[_0x2ff2eb(0x5cf)](_0x591f0e,_0x591f0e);const _0x40edb6=_0x2ff2eb(0x55b)[_0x2ff2eb(0x538)]($gameTroop[_0x2ff2eb(0x24a)]['padZero'](0x4)),_0x1f22ad=VisuMZ[_0x2ff2eb(0x2d3)]['ExtractStrFromTroop']($gameTroop[_0x2ff2eb(0x24a)]);VisuMZ[_0x2ff2eb(0x2d3)][_0x2ff2eb(0x7ed)](_0x1f22ad,_0x40edb6,!![]);}),VisuMZ[_0x59226c(0x2d3)][_0x59226c(0x7ed)]=function(_0x34c87e,_0x120a14,_0x1514e1){const _0x5a0c6a=_0x59226c,_0x5c10bf=require('fs');let _0xc14031=_0x5a0c6a(0x6d1)[_0x5a0c6a(0x538)](_0x120a14||'0');_0x5c10bf['writeFile'](_0xc14031,_0x34c87e,_0x2ec02a=>{const _0x284cc3=_0x5a0c6a;if(_0x2ec02a)throw err;else _0x1514e1&&(_0x284cc3(0x62c)!==_0x284cc3(0x62c)?this[_0x284cc3(0x729)][_0x284cc3(0x391)]<=0x60&&(this[_0x284cc3(0x729)][_0x284cc3(0x391)]+=0x6):alert('Saved\x20file\x20as\x20%1\x20in\x20project\x20folder.'['format'](_0xc14031)));});},VisuMZ[_0x59226c(0x2d3)]['ExportStrFromAllMaps']=function(){const _0x403b2e=_0x59226c,_0x1bb973=[];for(const _0x3d981c of $dataMapInfos){if(!_0x3d981c)continue;_0x1bb973['push'](_0x3d981c['id']);}const _0x5694be=_0x1bb973[_0x403b2e(0x587)]*0x64+Math[_0x403b2e(0x3ef)](0x64);alert(_0x403b2e(0x7ff)['format'](_0x5694be)),this[_0x403b2e(0x336)]=[],this[_0x403b2e(0x5df)]=$dataMap;for(const _0x4080c5 of _0x1bb973){VisuMZ[_0x403b2e(0x2d3)]['loadMapData'](_0x4080c5);}setTimeout(VisuMZ[_0x403b2e(0x2d3)][_0x403b2e(0x833)][_0x403b2e(0x938)](this),_0x5694be);},VisuMZ['CoreEngine']['loadMapData']=function(_0x2be1af){const _0x5b4b56=_0x59226c,_0x712911=_0x5b4b56(0x837)[_0x5b4b56(0x538)](_0x2be1af[_0x5b4b56(0x4f5)](0x3)),_0x3c0874=new XMLHttpRequest(),_0x4200d6=_0x5b4b56(0x40d)+_0x712911;_0x3c0874[_0x5b4b56(0x7e9)](_0x5b4b56(0x6fb),_0x4200d6),_0x3c0874[_0x5b4b56(0x5eb)](_0x5b4b56(0x872)),_0x3c0874[_0x5b4b56(0x766)]=()=>this[_0x5b4b56(0x202)](_0x3c0874,_0x2be1af,_0x712911,_0x4200d6),_0x3c0874[_0x5b4b56(0x6b2)]=()=>DataManager[_0x5b4b56(0x5ba)]('$dataMap',_0x712911,_0x4200d6),_0x3c0874[_0x5b4b56(0x378)]();},VisuMZ['CoreEngine'][_0x59226c(0x202)]=function(_0xd5b252,_0x2f4b65,_0x306606,_0x2eb08d){const _0x248e85=_0x59226c;$dataMap=JSON[_0x248e85(0x43f)](_0xd5b252[_0x248e85(0x296)]),DataManager[_0x248e85(0x81b)]($dataMap),this[_0x248e85(0x336)][_0x2f4b65]=VisuMZ[_0x248e85(0x2d3)][_0x248e85(0x72f)](_0x2f4b65),$dataMap=this['_currentMap'];},VisuMZ[_0x59226c(0x2d3)]['exportAllMapStrings']=function(){const _0x11f1a8=_0x59226c,_0x3c1c02=_0x11f1a8(0x76e);this[_0x11f1a8(0x336)][_0x11f1a8(0x60c)](undefined)[_0x11f1a8(0x60c)]('')[_0x11f1a8(0x60c)](null);const _0x1a7598=this[_0x11f1a8(0x336)][_0x11f1a8(0x6fd)](_0x11f1a8(0x2de))['trim']();VisuMZ['CoreEngine'][_0x11f1a8(0x7ed)](_0x1a7598,_0x3c1c02,!![]),SceneManager[_0x11f1a8(0x306)][_0x11f1a8(0x304)]=!![];},VisuMZ[_0x59226c(0x2d3)][_0x59226c(0x72f)]=function(_0x5ec513){const _0x5e3cc9=_0x59226c;if(!$dataMap)return'';let _0x25cede='█'[_0x5e3cc9(0x784)](0x46)+'\x0a\x0a',_0x3879a3='═'[_0x5e3cc9(0x784)](0x46)+'\x0a\x0a',_0x2c2bca='';this[_0x5e3cc9(0x52f)]=0x0;for(const _0x504c98 of $dataMap[_0x5e3cc9(0x73f)]){if(!_0x504c98)continue;let _0x2faffc=_0x504c98['id'],_0x1b53fe=_0x504c98[_0x5e3cc9(0x3b0)],_0x55aae8=_0x504c98[_0x5e3cc9(0x4ae)];for(const _0x376062 of _0x55aae8){const _0x2765e6=_0x55aae8['indexOf'](_0x376062)+0x1;let _0x1e69df=_0x3879a3+'《《《\x20Event\x20%1:\x20%2,\x20Page\x20%3\x20》》》\x0a%4\x0a',_0x42df5c=VisuMZ['CoreEngine'][_0x5e3cc9(0x8fa)](_0x376062['list']);if(_0x42df5c['length']>0x0){if(_0x2c2bca[_0x5e3cc9(0x587)]>0x0)'GvOmU'!=='GvOmU'?this[_0x5e3cc9(0x301)]['x']=_0x335b65['boxWidth']+0x4:_0x2c2bca+=_0x3879a3+_0x5e3cc9(0x2de);else{if(_0x5e3cc9(0x7ca)===_0x5e3cc9(0x2c1)){let _0x26d1af=_0x2f9781[_0x5e3cc9(0x228)](0x0,this[_0x5e3cc9(0x213)]());const _0x433caa=this['maxItems'](),_0x74fce2=this[_0x5e3cc9(0x8db)]();if(this[_0x5e3cc9(0x97c)]()&&_0x26d1af>0x0||_0x3e34df&&_0x74fce2===0x1){_0x26d1af-=_0x74fce2;if(_0x26d1af<=0x0)_0x26d1af=0x0;this['smoothSelect'](_0x26d1af);}else!this[_0x5e3cc9(0x97c)]()&&((_0x26d1af>=_0x74fce2||_0x1c06ff&&_0x74fce2===0x1)&&this[_0x5e3cc9(0x54f)]((_0x26d1af-_0x74fce2+_0x433caa)%_0x433caa));}else{const _0x4d8d59=$dataMapInfos[_0x5ec513]['name'];_0x2c2bca+=_0x25cede+_0x5e3cc9(0x66c)[_0x5e3cc9(0x538)](_0x5ec513,_0x4d8d59||_0x5e3cc9(0x3bf))+_0x25cede;}}_0x2c2bca+=_0x1e69df['format'](_0x2faffc,_0x1b53fe,_0x2765e6,_0x42df5c);}}}return _0x2c2bca['length']>0x0&&(_0x2c2bca+=_0x3879a3),_0x2c2bca;},VisuMZ[_0x59226c(0x2d3)]['ExportStrFromAllTroops']=function(){const _0x384a28=_0x59226c,_0x2c14f2=$dataTroops[_0x384a28(0x587)]*0xa+Math[_0x384a28(0x3ef)](0xa);alert('Export\x20Troop\x20Text\x20operation\x20will\x20finish\x20in\x20%1\x20ms(s)'['format'](_0x2c14f2));const _0x55da9f=[];for(const _0x4ab8f1 of $dataTroops){if(!_0x4ab8f1)continue;const _0x5b1eeb=_0x4ab8f1['id'];_0x55da9f[_0x5b1eeb]=VisuMZ[_0x384a28(0x2d3)][_0x384a28(0x6d5)](_0x5b1eeb);}setTimeout(VisuMZ[_0x384a28(0x2d3)][_0x384a28(0x599)][_0x384a28(0x938)](this,_0x55da9f),_0x2c14f2);},VisuMZ['CoreEngine']['ExtractStrFromTroop']=function(_0x4d3ba1){const _0x53fa4a=_0x59226c;if(!$dataTroops[_0x4d3ba1])return'';let _0x57836f='█'[_0x53fa4a(0x784)](0x46)+'\x0a\x0a',_0x3c8b2f='═'[_0x53fa4a(0x784)](0x46)+'\x0a\x0a',_0xcf08b6='';this[_0x53fa4a(0x52f)]=0x0;const _0x45bb13=$dataTroops[_0x4d3ba1];let _0x3fa2d1=_0x45bb13[_0x53fa4a(0x4ae)];for(const _0x470418 of _0x3fa2d1){const _0x1df591=_0x3fa2d1[_0x53fa4a(0x690)](_0x470418)+0x1;let _0x107165=_0x3c8b2f+_0x53fa4a(0x54b),_0x2695aa=VisuMZ[_0x53fa4a(0x2d3)][_0x53fa4a(0x8fa)](_0x470418['list']);_0x2695aa[_0x53fa4a(0x587)]>0x0&&(_0xcf08b6[_0x53fa4a(0x587)]>0x0?_0xcf08b6+=_0x3c8b2f+'\x0a\x0a\x0a\x0a\x0a':_0xcf08b6+=_0x57836f+_0x53fa4a(0x532)[_0x53fa4a(0x538)](_0x4d3ba1,_0x45bb13['name']||_0x53fa4a(0x3bf))+_0x57836f,_0xcf08b6+=_0x107165[_0x53fa4a(0x538)](_0x1df591,_0x2695aa));}return _0xcf08b6[_0x53fa4a(0x587)]>0x0&&(_0xcf08b6+=_0x3c8b2f),_0xcf08b6;},VisuMZ['CoreEngine'][_0x59226c(0x599)]=function(_0x5f19cf){const _0x30cff6=_0x59226c,_0x39b29a='AllTroops';_0x5f19cf['remove'](undefined)[_0x30cff6(0x60c)]('')[_0x30cff6(0x60c)](null);const _0x15a645=_0x5f19cf[_0x30cff6(0x6fd)](_0x30cff6(0x2de))[_0x30cff6(0x7e8)]();VisuMZ[_0x30cff6(0x2d3)][_0x30cff6(0x7ed)](_0x15a645,_0x39b29a,!![]),SceneManager['_scene'][_0x30cff6(0x304)]=!![];},VisuMZ[_0x59226c(0x2d3)][_0x59226c(0x8fa)]=function(_0x42e400){const _0x20f0e6=_0x59226c;let _0x521540='\x0a'+'─'['repeat'](0x46)+'\x0a',_0xf42c0c='\x0a'+'┄'['repeat'](0x46)+'\x0a',_0xeba8f6='';for(const _0x5b6c55 of _0x42e400){if(!_0x5b6c55)continue;if(_0x5b6c55[_0x20f0e6(0x83a)]===0x65)_0xeba8f6+=_0x521540+'\x0a',_0xeba8f6+=_0x20f0e6(0x7e1),_0x5b6c55[_0x20f0e6(0x8bb)][0x4]!==''&&_0x5b6c55[_0x20f0e6(0x8bb)][0x4]!==undefined&&(_0x20f0e6(0x3c8)!==_0x20f0e6(0x3c8)?(this[_0x20f0e6(0x94d)]=_0x235f63,this[_0x20f0e6(0x6b0)]=_0x1e2fd7[_0x20f0e6(0x8c0)](this['_anchor'])):_0xeba8f6+=_0x20f0e6(0x8d6)['format'](_0x5b6c55[_0x20f0e6(0x8bb)][0x4]));else{if(_0x5b6c55['code']===0x191)_0xeba8f6+=_0x20f0e6(0x468)[_0x20f0e6(0x538)](_0x5b6c55[_0x20f0e6(0x8bb)][0x0]);else{if(_0x5b6c55[_0x20f0e6(0x83a)]===0x192)_0xeba8f6+=_0x521540,_0xeba8f6+=_0x20f0e6(0x288)[_0x20f0e6(0x538)](_0xf42c0c,_0x5b6c55[_0x20f0e6(0x8bb)][0x0]+0x1,_0x5b6c55[_0x20f0e6(0x8bb)][0x1]);else{if(_0x5b6c55[_0x20f0e6(0x83a)]===0x193)_0xeba8f6+=_0x521540,_0xeba8f6+='%1〘Choice\x20Cancel〙%1'['format'](_0xf42c0c);else{if(_0x5b6c55['code']===0x194)_0xeba8f6+=_0x521540,_0xeba8f6+=_0x20f0e6(0x82d)['format'](_0xf42c0c);else{if(_0x5b6c55[_0x20f0e6(0x83a)]===0x69){if('ijSpI'===_0x20f0e6(0x577))_0xeba8f6+=_0x521540+'\x0a',_0xeba8f6+=_0x20f0e6(0x4d4);else{if(!_0x174789)return;if(!_0x286d6b['isActor']())return;const _0x447649=0x80,_0x4f3aea=_0x1058a8[_0x20f0e6(0x379)]();let _0x1312db=_0x5c3d9b[_0x20f0e6(0x53d)](),_0x44757c=_0xc9f06d[_0x20f0e6(0x37b)]();_0x4f3aea>=0x1&&(_0x1312db=_0x3cc695[_0x20f0e6(0x482)](),_0x44757c=_0x285cd0[_0x20f0e6(0x964)]()),this[_0x20f0e6(0x4c7)](_0x94a810,_0x5ac2d4,_0x447649,_0x4f3aea,_0x1312db,_0x44757c);}}else{if(_0x5b6c55[_0x20f0e6(0x83a)]===0x6c)_0xeba8f6+=_0x521540+'\x0a',_0xeba8f6+='》Comment《\x0a%1\x0a'[_0x20f0e6(0x538)](_0x5b6c55[_0x20f0e6(0x8bb)][0x0]);else{if(_0x5b6c55[_0x20f0e6(0x83a)]===0x198){if(_0x20f0e6(0x707)!==_0x20f0e6(0x707)){var _0x23530f=_0x58aa5c(_0x359041['$1']);_0x3373fa*=_0x23530f;}else _0xeba8f6+='%1\x0a'[_0x20f0e6(0x538)](_0x5b6c55[_0x20f0e6(0x8bb)][0x0]);}else{if(_0x5b6c55['code']===0x75){const _0x8c1952=$dataCommonEvents[_0x5b6c55[_0x20f0e6(0x8bb)][0x0]];if(_0x8c1952&&this[_0x20f0e6(0x52f)]<=0xa){if(_0x20f0e6(0x5ab)==='IcAnA'){this[_0x20f0e6(0x52f)]++;let _0x4e46d3=VisuMZ['CoreEngine'][_0x20f0e6(0x8fa)](_0x8c1952['list']);if(_0x4e46d3[_0x20f0e6(0x587)]>0x0){if(_0x20f0e6(0x4fb)===_0x20f0e6(0x2ba)){const _0x55e46f=_0x20f0e6(0x20d);this[_0x20f0e6(0x64f)]=this[_0x20f0e6(0x64f)]||{};if(this[_0x20f0e6(0x64f)][_0x55e46f])return this['_colorCache'][_0x55e46f];const _0x5364d2=_0x933fe[_0x20f0e6(0x2d3)]['Settings'][_0x20f0e6(0x801)][_0x20f0e6(0x211)];return this[_0x20f0e6(0x23a)](_0x55e46f,_0x5364d2);}else _0xeba8f6+=_0x521540,_0xeba8f6+=_0xf42c0c,_0xeba8f6+='〘Common\x20Event\x20%1:\x20%2〙\x20Start'[_0x20f0e6(0x538)](_0x8c1952['id'],_0x8c1952['name']),_0xeba8f6+=_0xf42c0c,_0xeba8f6+=_0x4e46d3,_0xeba8f6+=_0xf42c0c,_0xeba8f6+=_0x20f0e6(0x1e6)['format'](_0x8c1952['id'],_0x8c1952['name']),_0xeba8f6+=_0xf42c0c;}this[_0x20f0e6(0x52f)]--;}else _0x30e6eb+=_0x342756+'\x0a',_0x424735+='》Comment《\x0a%1\x0a'[_0x20f0e6(0x538)](_0xaf6b84[_0x20f0e6(0x8bb)][0x0]);}}}}}}}}}}}if(_0xeba8f6[_0x20f0e6(0x587)]>0x0){if(_0x20f0e6(0x521)!==_0x20f0e6(0x521))return _0x34f214=_0x8f178[_0x20f0e6(0x8a2)](/PRESERVCONVERSION\((\d+)\)/gi,(_0x3441cd,_0x4d7df4)=>_0x1260ab(_0x2d4154(_0x4d7df4))),_0x2ae3da;else _0xeba8f6+=_0x521540;}return _0xeba8f6;},PluginManager[_0x59226c(0x2a4)](pluginData[_0x59226c(0x3b0)],'OpenURL',_0x18560e=>{const _0x3ae409=_0x59226c;VisuMZ['ConvertParams'](_0x18560e,_0x18560e);const _0x2a73c0=_0x18560e[_0x3ae409(0x465)];VisuMZ[_0x3ae409(0x68c)](_0x2a73c0);}),PluginManager[_0x59226c(0x2a4)](pluginData['name'],'GoldChange',_0x2c05a9=>{const _0x5cb98c=_0x59226c;VisuMZ[_0x5cb98c(0x5cf)](_0x2c05a9,_0x2c05a9);const _0x4708e2=_0x2c05a9[_0x5cb98c(0x264)]||0x0;$gameParty[_0x5cb98c(0x82f)](_0x4708e2);}),PluginManager[_0x59226c(0x2a4)](pluginData['name'],_0x59226c(0x49e),_0x58b51d=>{const _0x1ac553=_0x59226c;if(!SceneManager[_0x1ac553(0x4aa)]())return;VisuMZ[_0x1ac553(0x5cf)](_0x58b51d,_0x58b51d);const _0x472d00=_0x58b51d[_0x1ac553(0x52a)];SceneManager['_scene'][_0x1ac553(0x1f3)](_0x472d00);}),PluginManager[_0x59226c(0x2a4)](pluginData[_0x59226c(0x3b0)],_0x59226c(0x2ab),_0x2e2627=>{const _0x383326=_0x59226c;if(!$gameTemp['isPlaytest']())return;if(!Utils[_0x383326(0x2d5)]())return;VisuMZ[_0x383326(0x5cf)](_0x2e2627,_0x2e2627);const _0x316931=_0x2e2627[_0x383326(0x86f)]||0x1;$gameTemp[_0x383326(0x5d1)]=_0x316931;}),PluginManager['registerCommand'](pluginData[_0x59226c(0x3b0)],'PictureEasingType',_0x39f3b0=>{const _0x59fc10=_0x59226c;VisuMZ[_0x59fc10(0x5cf)](_0x39f3b0,_0x39f3b0);const _0x154878=_0x39f3b0[_0x59fc10(0x49b)]||0x1,_0x25890b=_0x39f3b0['easingType']||_0x59fc10(0x561),_0x4d4f60=$gameScreen[_0x59fc10(0x67b)](_0x154878);_0x4d4f60&&_0x4d4f60[_0x59fc10(0x63e)](_0x25890b);}),PluginManager[_0x59226c(0x2a4)](pluginData[_0x59226c(0x3b0)],'PictureEraseAll',_0x3b7002=>{for(let _0x53aaa2=0x1;_0x53aaa2<=0x64;_0x53aaa2++){$gameScreen['erasePicture'](_0x53aaa2);}}),PluginManager[_0x59226c(0x2a4)](pluginData[_0x59226c(0x3b0)],'PictureEraseRange',_0x22703e=>{const _0x1faf7a=_0x59226c;VisuMZ['ConvertParams'](_0x22703e,_0x22703e);const _0x5e41a5=Math['min'](_0x22703e[_0x1faf7a(0x36a)],_0x22703e['EndingID']),_0x2df59b=Math['max'](_0x22703e[_0x1faf7a(0x36a)],_0x22703e['EndingID']);for(let _0x2e71de=_0x5e41a5;_0x2e71de<=_0x2df59b;_0x2e71de++){$gameScreen[_0x1faf7a(0x43b)](_0x2e71de);}}),PluginManager[_0x59226c(0x2a4)](pluginData[_0x59226c(0x3b0)],_0x59226c(0x74b),_0x53e2d2=>{const _0x107f4d=_0x59226c;VisuMZ[_0x107f4d(0x5cf)](_0x53e2d2,_0x53e2d2);const _0x3a776b=Math[_0x107f4d(0x93a)](_0x53e2d2['PictureID'])[_0x107f4d(0x3d1)](0x1,0x64),_0x1a7486=_0x53e2d2[_0x107f4d(0x6ad)],_0x2c4d7a=_0x1a7486[_0x107f4d(0x47f)][_0x107f4d(0x3d1)](0x0,0x1),_0x29b0f7=Math[_0x107f4d(0x93a)](_0x1a7486['PositionX']||0x0),_0x164b78=Math[_0x107f4d(0x93a)](_0x1a7486[_0x107f4d(0x810)]||0x0),_0x33f3ed=Math[_0x107f4d(0x93a)](_0x1a7486[_0x107f4d(0x967)]||0x0),_0x3e51e6=Math['round'](_0x1a7486[_0x107f4d(0x403)]||0x0),_0x15d955=Math[_0x107f4d(0x93a)](_0x1a7486[_0x107f4d(0x1e9)])[_0x107f4d(0x3d1)](0x0,0xff),_0x547a89=_0x1a7486[_0x107f4d(0x8e6)],_0x584ad6=_0x107f4d(0x79a),_0x1a2b9b=_0x53e2d2[_0x107f4d(0x1b4)]?_0x107f4d(0x1b4):_0x107f4d(0x53f),_0x2ce544=_0x584ad6[_0x107f4d(0x538)](_0x53e2d2['IconIndex'],_0x1a2b9b);$gameScreen[_0x107f4d(0x1b9)](_0x3a776b,_0x2ce544,_0x2c4d7a,_0x29b0f7,_0x164b78,_0x33f3ed,_0x3e51e6,_0x15d955,_0x547a89);}),PluginManager[_0x59226c(0x2a4)](pluginData[_0x59226c(0x3b0)],_0x59226c(0x66e),_0x38412e=>{const _0xf324b3=_0x59226c;VisuMZ[_0xf324b3(0x5cf)](_0x38412e,_0x38412e);const _0x558890=_0x38412e[_0xf324b3(0x721)]||_0xf324b3(0x8f1),_0x161267=_0x38412e[_0xf324b3(0x79b)][_0xf324b3(0x3d1)](0x1,0x9),_0x4a9e38=_0x38412e[_0xf324b3(0x540)][_0xf324b3(0x3d1)](0x1,0x9),_0x26f4fb=_0x38412e[_0xf324b3(0x941)]||0x1,_0x219cf6=_0x38412e[_0xf324b3(0x65c)];$gameScreen[_0xf324b3(0x817)](_0x558890),$gameScreen[_0xf324b3(0x508)](_0x161267,_0x4a9e38,_0x26f4fb);if(_0x219cf6){const _0x26af77=$gameTemp['getLastPluginCommandInterpreter']();if(_0x26af77)_0x26af77['wait'](_0x26f4fb);}}),PluginManager['registerCommand'](pluginData[_0x59226c(0x3b0)],'SystemSetFontSize',_0x56f222=>{const _0x4a5cdf=_0x59226c;VisuMZ['ConvertParams'](_0x56f222,_0x56f222);const _0x51add2=_0x56f222[_0x4a5cdf(0x547)]||0x1;$gameSystem[_0x4a5cdf(0x448)](_0x51add2);}),PluginManager[_0x59226c(0x2a4)](pluginData[_0x59226c(0x3b0)],_0x59226c(0x6ff),_0x5545e6=>{const _0x150297=_0x59226c;if($gameParty['inBattle']())return;VisuMZ[_0x150297(0x5cf)](_0x5545e6,_0x5545e6);const _0x58b048=_0x5545e6[_0x150297(0x547)];if(_0x58b048[_0x150297(0x25f)](/Front/i))_0x150297(0x95e)===_0x150297(0x95e)?$gameSystem['setSideView'](![]):_0x35349e['CoreEngine'][_0x150297(0x6ad)]['UI']['SideButtons']&&(this['_sideButtonLayout']=_0x2f2213);else{if(_0x58b048[_0x150297(0x25f)](/Side/i))$gameSystem[_0x150297(0x898)](!![]);else{if(_0x150297(0x961)===_0x150297(0x6f6)){const _0x3d54df=_0x8a855a[_0x150297(0x2d3)][_0x150297(0x6ad)][_0x150297(0x66e)];if(_0x3d54df&&_0x3d54df[_0x150297(0x738)])return _0x3d54df[_0x150297(0x738)][_0x150297(0x38e)](this);this['x']+=_0x1ffd2e['round'](_0x346cbf[_0x150297(0x84b)]());}else $gameSystem[_0x150297(0x898)](!$gameSystem[_0x150297(0x6c1)]());}}}),PluginManager[_0x59226c(0x2a4)](pluginData['name'],_0x59226c(0x77a),_0x15effa=>{const _0x3f5910=_0x59226c;if($gameParty[_0x3f5910(0x2f1)]())return;VisuMZ[_0x3f5910(0x5cf)](_0x15effa,_0x15effa);const _0x5ee77f=[_0x3f5910(0x4ec),_0x3f5910(0x915),'me','se'];for(const _0xa95032 of _0x5ee77f){if('WqZKe'===_0x3f5910(0x3f2))return this[_0x3f5910(0x34b)]();else{const _0x145e6a=_0x15effa[_0xa95032],_0x3830bf='%1/'[_0x3f5910(0x538)](_0xa95032);for(const _0x552974 of _0x145e6a){if('RefrS'!==_0x3f5910(0x229))AudioManager['createBuffer'](_0x3830bf,_0x552974);else return _0xc50d67[_0x3f5910(0x529)];}}}}),PluginManager[_0x59226c(0x2a4)](pluginData['name'],'SystemLoadImages',_0x162671=>{const _0x250ed4=_0x59226c;if($gameParty['inBattle']())return;VisuMZ['ConvertParams'](_0x162671,_0x162671);const _0x331a2a=['animations',_0x250ed4(0x75f),_0x250ed4(0x1b1),_0x250ed4(0x884),_0x250ed4(0x1b2),_0x250ed4(0x3f9),'parallaxes',_0x250ed4(0x4de),_0x250ed4(0x896),'sv_enemies',_0x250ed4(0x886),_0x250ed4(0x4b7),_0x250ed4(0x68f),_0x250ed4(0x5e9)];for(const _0x3fe7c3 of _0x331a2a){const _0x26eb87=_0x162671[_0x3fe7c3],_0x5d74eb=_0x250ed4(0x646)[_0x250ed4(0x538)](_0x3fe7c3);for(const _0x36efa3 of _0x26eb87){ImageManager[_0x250ed4(0x5a8)](_0x5d74eb,_0x36efa3);}}}),PluginManager[_0x59226c(0x2a4)](pluginData['name'],_0x59226c(0x7f4),_0x125ad5=>{const _0x5e3dce=_0x59226c;if($gameParty['inBattle']())return;VisuMZ['ConvertParams'](_0x125ad5,_0x125ad5);const _0x44eec9=_0x125ad5[_0x5e3dce(0x262)],_0x43df45=(_0x125ad5[_0x5e3dce(0x47b)]||0x0)/0x64;for(const _0x3fdc83 of _0x44eec9){const _0x38c827=Math['random']()<=_0x43df45;$gameSwitches['setValue'](_0x3fdc83,_0x38c827);}}),PluginManager[_0x59226c(0x2a4)](pluginData[_0x59226c(0x3b0)],_0x59226c(0x472),_0x45efc7=>{const _0x4026d9=_0x59226c;if($gameParty['inBattle']())return;VisuMZ[_0x4026d9(0x5cf)](_0x45efc7,_0x45efc7);const _0xab4dd7=Math[_0x4026d9(0x3d0)](_0x45efc7[_0x4026d9(0x36a)],_0x45efc7[_0x4026d9(0x991)]),_0x3d8ef9=Math[_0x4026d9(0x228)](_0x45efc7[_0x4026d9(0x36a)],_0x45efc7[_0x4026d9(0x991)]),_0x5ed6f5=(_0x45efc7['Chance']||0x0)/0x64;for(let _0x22bf58=_0xab4dd7;_0x22bf58<=_0x3d8ef9;_0x22bf58++){if(_0x4026d9(0x3e8)!==_0x4026d9(0x474)){const _0x38271b=Math['random']()<=_0x5ed6f5;$gameSwitches[_0x4026d9(0x565)](_0x22bf58,_0x38271b);}else _0x319c31['CoreEngine'][_0x4026d9(0x2dd)][_0x4026d9(0x38e)](this);}}),PluginManager['registerCommand'](pluginData[_0x59226c(0x3b0)],_0x59226c(0x493),_0x50a5d5=>{const _0x314b0d=_0x59226c;if($gameParty[_0x314b0d(0x2f1)]())return;VisuMZ[_0x314b0d(0x5cf)](_0x50a5d5,_0x50a5d5);const _0x2f676e=_0x50a5d5[_0x314b0d(0x262)];for(const _0x4716ec of _0x2f676e){if('LUjoj'!=='moDJi'){const _0x4bbb2d=$gameSwitches[_0x314b0d(0x264)](_0x4716ec);$gameSwitches[_0x314b0d(0x565)](_0x4716ec,!_0x4bbb2d);}else return _0x294664[_0x314b0d(0x517)]()>=0x1;}}),PluginManager[_0x59226c(0x2a4)](pluginData[_0x59226c(0x3b0)],_0x59226c(0x990),_0x5a1774=>{const _0x34bb88=_0x59226c;if($gameParty[_0x34bb88(0x2f1)]())return;VisuMZ[_0x34bb88(0x5cf)](_0x5a1774,_0x5a1774);const _0x5a6654=Math[_0x34bb88(0x3d0)](_0x5a1774[_0x34bb88(0x36a)],_0x5a1774[_0x34bb88(0x991)]),_0x2bc287=Math['max'](_0x5a1774[_0x34bb88(0x36a)],_0x5a1774[_0x34bb88(0x991)]);for(let _0x143f2c=_0x5a6654;_0x143f2c<=_0x2bc287;_0x143f2c++){const _0x482380=$gameSwitches['value'](_0x143f2c);$gameSwitches[_0x34bb88(0x565)](_0x143f2c,!_0x482380);}}),PluginManager[_0x59226c(0x2a4)](pluginData[_0x59226c(0x3b0)],_0x59226c(0x5b5),_0x49d874=>{const _0x135519=_0x59226c;if($gameParty[_0x135519(0x2f1)]())return;VisuMZ['ConvertParams'](_0x49d874,_0x49d874);const _0x495162=_0x49d874[_0x135519(0x547)][_0x135519(0x657)]()[_0x135519(0x7e8)](),_0x1ff59c=VisuMZ[_0x135519(0x2d3)][_0x135519(0x3c6)](_0x495162);$gameSystem[_0x135519(0x912)](_0x1ff59c);}),VisuMZ['CoreEngine'][_0x59226c(0x3c6)]=function(_0x63ae8c){const _0x3330e9=_0x59226c;_0x63ae8c=_0x63ae8c||_0x3330e9(0x284),_0x63ae8c=String(_0x63ae8c)[_0x3330e9(0x657)]()['trim']();switch(_0x63ae8c){case _0x3330e9(0x553):return 0x0;case _0x3330e9(0x219):Imported[_0x3330e9(0x4bd)]&&(ConfigManager[_0x3330e9(0x755)]=!![]);return 0x1;case'TPB\x20WAIT':Imported['VisuMZ_1_OptionsCore']&&(ConfigManager[_0x3330e9(0x755)]=![]);return 0x2;case'CTB':if(Imported[_0x3330e9(0x89f)])return _0x3330e9(0x239);break;case _0x3330e9(0x64e):if(Imported[_0x3330e9(0x6f9)])return _0x3330e9(0x64e);break;case _0x3330e9(0x816):if(Imported[_0x3330e9(0x570)])return _0x3330e9(0x816);break;case'FTB':if(Imported[_0x3330e9(0x3cb)])return _0x3330e9(0x363)!==_0x3330e9(0x487)?_0x3330e9(0x4a4):_0x277688?_0x440988(_0x106d79[_0x3330e9(0x93a)](_0x439eb0*0x64))+'%':_0x130df7;break;case _0x3330e9(0x858):if(Imported[_0x3330e9(0x610)])return _0x3330e9(0x858);break;case _0x3330e9(0x79e):if(Imported[_0x3330e9(0x6b3)])return'sruBx'!==_0x3330e9(0x258)?this['mainAreaTopSideButtonLayout']():'ETB';break;case _0x3330e9(0x413):if(Imported[_0x3330e9(0x851)])return _0x3330e9(0x413);break;}return $dataSystem[_0x3330e9(0x922)];},PluginManager[_0x59226c(0x2a4)](pluginData[_0x59226c(0x3b0)],_0x59226c(0x5a0),_0x49a1bd=>{const _0x5bf5b9=_0x59226c;VisuMZ[_0x5bf5b9(0x5cf)](_0x49a1bd,_0x49a1bd);const _0x4700ba=_0x49a1bd[_0x5bf5b9(0x547)]||0x1;$gameSystem[_0x5bf5b9(0x449)](_0x4700ba);}),VisuMZ[_0x59226c(0x2d3)][_0x59226c(0x41c)]=Scene_Boot['prototype'][_0x59226c(0x308)],Scene_Boot['prototype']['onDatabaseLoaded']=function(){const _0x5e96f5=_0x59226c;VisuMZ[_0x5e96f5(0x2d3)][_0x5e96f5(0x41c)]['call'](this),this[_0x5e96f5(0x91b)](),this[_0x5e96f5(0x2bc)](),this[_0x5e96f5(0x93c)](),this[_0x5e96f5(0x638)](),this[_0x5e96f5(0x791)](),VisuMZ['ParseAllNotetags']();},VisuMZ[_0x59226c(0x2d3)][_0x59226c(0x6ca)]={},Scene_Boot[_0x59226c(0x7bf)][_0x59226c(0x91b)]=function(){const _0x25fd97=_0x59226c,_0x63a35f=[_0x25fd97(0x7c6),_0x25fd97(0x503),_0x25fd97(0x982),'DEF',_0x25fd97(0x85e),_0x25fd97(0x29b),'AGI',_0x25fd97(0x91e)],_0x476398=[_0x25fd97(0x969),_0x25fd97(0x38c),_0x25fd97(0x5cb),_0x25fd97(0x429),_0x25fd97(0x7a2),_0x25fd97(0x269),_0x25fd97(0x921),_0x25fd97(0x675),_0x25fd97(0x910),'TRG'],_0x16795e=[_0x25fd97(0x402),_0x25fd97(0x405),_0x25fd97(0x67c),_0x25fd97(0x5d8),_0x25fd97(0x47e),_0x25fd97(0x541),_0x25fd97(0x811),_0x25fd97(0x42f),_0x25fd97(0x218),_0x25fd97(0x50a)],_0x4cc842=[_0x63a35f,_0x476398,_0x16795e],_0x310f8b=[_0x25fd97(0x643),_0x25fd97(0x52d),'Plus2','Max',_0x25fd97(0x365),_0x25fd97(0x41b),_0x25fd97(0x70c),_0x25fd97(0x4d8),_0x25fd97(0x855),'Flat2'];for(const _0x2673d7 of _0x4cc842){let _0x1951db='';if(_0x2673d7===_0x63a35f)_0x1951db=_0x25fd97(0x317);if(_0x2673d7===_0x476398)_0x1951db='xparam';if(_0x2673d7===_0x16795e)_0x1951db=_0x25fd97(0x2e9);for(const _0x12a958 of _0x310f8b){if(_0x25fd97(0x2ff)===_0x25fd97(0x58d))this[_0x25fd97(0x8e8)]['setBackgroundType'](_0x54dee0[_0x25fd97(0x957)][_0x25fd97(0x6ab)]);else{let _0x1e4a5b='%1%2'[_0x25fd97(0x538)](_0x1951db,_0x12a958);VisuMZ['CoreEngine']['RegExp'][_0x1e4a5b]=[],VisuMZ[_0x25fd97(0x2d3)]['RegExp'][_0x1e4a5b+'JS']=[];let _0xf9204=_0x25fd97(0x88f);if([_0x25fd97(0x643),_0x25fd97(0x4d8)][_0x25fd97(0x98d)](_0x12a958))_0x25fd97(0x82b)==='AStYS'?_0x55cb4d['VisuMZ_2_BattleSystemPTB']&&(this[_0x25fd97(0x43c)]='PTB'):_0xf9204+=_0x25fd97(0x84e);else{if(['Plus1','Flat1'][_0x25fd97(0x98d)](_0x12a958))_0x25fd97(0x6ce)!=='gYaTq'?this[_0x25fd97(0x47c)]['setBackgroundType'](_0x3df5ac[_0x25fd97(0x957)][_0x25fd97(0x923)]):_0xf9204+='([\x5c+\x5c-]\x5cd+)([%％])>';else{if([_0x25fd97(0x2fa),_0x25fd97(0x249)][_0x25fd97(0x98d)](_0x12a958))'Ofwtg'!==_0x25fd97(0x949)?_0xf9204+=_0x25fd97(0x8a7):(_0x5c06d2=_0x4a108d||_0x326b65[_0x25fd97(0x68e)],_0x524b90=_0x5758f9||_0x38696c[_0x25fd97(0x5d4)],_0x19ad8e=_0x488f13[_0x25fd97(0x93a)](_0x342f3b),_0x301a01=_0xc14fe2[_0x25fd97(0x93a)](_0x53b2b5),_0x48e819=_0x2f6bd1[_0x25fd97(0x93a)](_0x1636f1),_0x753986=_0x3be35a[_0x25fd97(0x93a)](_0x8ff1b8),_0x20b7d9[_0x25fd97(0x2d3)][_0x25fd97(0x21a)][_0x25fd97(0x38e)](this,_0x177969,_0x1e8487,_0x11e404,_0x1fe9da,_0x42b535,_0x2df0f6));else{if(_0x12a958===_0x25fd97(0x5d9)){if('PaShB'===_0x25fd97(0x50c))return _0x2a815d=_0x48eb12['replace'](/(\d)/gi,(_0x231ecb,_0x19412f)=>_0x25fd97(0x782)[_0x25fd97(0x538)](_0x16c0cb(_0x19412f))),_0x25fd97(0x455)[_0x25fd97(0x538)](_0xb0d0af,_0x4d95a3,_0x8ef5bd);else _0xf9204+=_0x25fd97(0x2ee);}else{if(_0x12a958===_0x25fd97(0x41b))_0xf9204+=_0x25fd97(0x1a3);else _0x12a958===_0x25fd97(0x70c)&&(_0xf9204+=_0x25fd97(0x407));}}}}for(const _0x462e82 of _0x2673d7){let _0x44d54b=_0x12a958[_0x25fd97(0x8a2)](/[\d+]/g,'')['toUpperCase']();const _0x3a8027=_0xf9204[_0x25fd97(0x538)](_0x462e82,_0x44d54b);VisuMZ['CoreEngine'][_0x25fd97(0x6ca)][_0x1e4a5b][_0x25fd97(0x564)](new RegExp(_0x3a8027,'i'));const _0xa264da='<JS\x20%1\x20%2:[\x20](.*)>'['format'](_0x462e82,_0x44d54b);VisuMZ[_0x25fd97(0x2d3)][_0x25fd97(0x6ca)][_0x1e4a5b+'JS']['push'](new RegExp(_0xa264da,'i'));}}}}},Scene_Boot[_0x59226c(0x7bf)][_0x59226c(0x2bc)]=function(){const _0x27807e=_0x59226c;if(VisuMZ[_0x27807e(0x71d)])return;},Scene_Boot['prototype'][_0x59226c(0x93c)]=function(){const _0x50903b=_0x59226c,_0x2da6a1=VisuMZ[_0x50903b(0x2d3)][_0x50903b(0x6ad)];_0x2da6a1[_0x50903b(0x509)]['OpenConsole']&&VisuMZ[_0x50903b(0x33f)](!![]);if(_0x2da6a1[_0x50903b(0x509)][_0x50903b(0x63a)]){if('Lycja'!==_0x50903b(0x602)){this[_0x50903b(0x435)](),this[_0x50903b(0x729)][_0x50903b(0x3b4)](),this['contents'][_0x50903b(0x391)]=_0x57845a[_0x50903b(0x2d3)]['Settings'][_0x50903b(0x1b0)][_0x50903b(0x7e4)];const _0x1550cd=_0x5d8907['CoreEngine'][_0x50903b(0x6ad)][_0x50903b(0x1b0)][_0x50903b(0x46d)],_0x4f4b43=this[_0x50903b(0x78d)](0x0);if(_0x1550cd>0x0){const _0x296b88=_0x4f4b43['y']+(this[_0x50903b(0x543)]()-_0x8d8542[_0x50903b(0x4e4)])/0x2;this['drawIcon'](_0x1550cd,_0x4f4b43['x'],_0x296b88);const _0x38ad4a=_0x5a5dae['iconWidth']+0x4;_0x4f4b43['x']+=_0x38ad4a,_0x4f4b43[_0x50903b(0x4d6)]-=_0x38ad4a;}this['changeTextColor'](_0x4b0ca8[_0x50903b(0x1f2)]()),this[_0x50903b(0x273)](this['currencyUnit'](),_0x4f4b43['x'],_0x4f4b43['y'],_0x4f4b43[_0x50903b(0x4d6)],'left');const _0x15aa08=this[_0x50903b(0x52b)](this[_0x50903b(0x3fd)]())+0x6;;_0x4f4b43['x']+=_0x15aa08,_0x4f4b43[_0x50903b(0x4d6)]-=_0x15aa08,this[_0x50903b(0x271)]();const _0x8d9d9b=this[_0x50903b(0x264)](),_0x2f56d8=this[_0x50903b(0x52b)](this[_0x50903b(0x78a)]?_0x1c4bcf[_0x50903b(0x807)](this[_0x50903b(0x264)]()):this[_0x50903b(0x264)]());_0x2f56d8>_0x4f4b43[_0x50903b(0x4d6)]?this[_0x50903b(0x273)](_0x6d6eac[_0x50903b(0x2d3)][_0x50903b(0x6ad)][_0x50903b(0x1b0)]['GoldOverlap'],_0x4f4b43['x'],_0x4f4b43['y'],_0x4f4b43[_0x50903b(0x4d6)],'right'):this[_0x50903b(0x273)](this[_0x50903b(0x264)](),_0x4f4b43['x'],_0x4f4b43['y'],_0x4f4b43[_0x50903b(0x4d6)],'right'),this[_0x50903b(0x435)]();}else Input[_0x50903b(0x2bd)][0x23]=_0x50903b(0x24d),Input[_0x50903b(0x2bd)][0x24]='home';}if(_0x2da6a1[_0x50903b(0x25d)]){if('Uzcxq'!==_0x50903b(0x5c3)){const _0x7b9077=_0x2da6a1[_0x50903b(0x25d)];_0x7b9077['KeySHIFT']=_0x7b9077[_0x50903b(0x217)]||_0x50903b(0x579),_0x7b9077[_0x50903b(0x847)]=_0x7b9077[_0x50903b(0x847)]||'\x5c}❪TAB❫\x5c{';}else _0x27c2ab['playBuzzer']();}if(_0x2da6a1[_0x50903b(0x4c8)][_0x50903b(0x3ff)]){if('snHNB'==='snHNB')Input[_0x50903b(0x2bd)][0x57]='up',Input[_0x50903b(0x2bd)][0x41]=_0x50903b(0x349),Input['keyMapper'][0x53]=_0x50903b(0x81c),Input[_0x50903b(0x2bd)][0x44]='right',Input[_0x50903b(0x2bd)][0x45]='pagedown';else{if(this[_0x50903b(0x571)])return;_0x335e8e[_0x50903b(0x2d3)][_0x50903b(0x7d2)][_0x50903b(0x38e)](this);}}_0x2da6a1[_0x50903b(0x4c8)][_0x50903b(0x86d)]&&(_0x50903b(0x723)===_0x50903b(0x723)?Input['keyMapper'][0x52]=_0x50903b(0x528):_0x39747b[_0x50903b(0x53e)](_0x5d0cd5)),_0x2da6a1[_0x50903b(0x959)][_0x50903b(0x2c7)]=_0x2da6a1[_0x50903b(0x959)][_0x50903b(0x2c7)]['map'](_0x11af56=>_0x11af56[_0x50903b(0x657)]()['trim']()),_0x2da6a1[_0x50903b(0x959)]['ExtDisplayedParams']=_0x2da6a1[_0x50903b(0x959)][_0x50903b(0x72c)][_0x50903b(0x8b1)](_0x410c33=>_0x410c33[_0x50903b(0x657)]()['trim']());},Scene_Boot[_0x59226c(0x7bf)][_0x59226c(0x638)]=function(){const _0x300b5d=_0x59226c;this[_0x300b5d(0x40a)]();},Scene_Boot[_0x59226c(0x7bf)]['process_VisuMZ_CoreEngine_jsQuickFunctions']=function(){const _0x2f8343=_0x59226c,_0x3dc8f6=VisuMZ[_0x2f8343(0x2d3)][_0x2f8343(0x6ad)][_0x2f8343(0x8d5)];for(const _0x2e3330 of _0x3dc8f6){const _0x561caf=_0x2e3330[_0x2f8343(0x2a3)]['replace'](/[ ]/g,''),_0x440db3=_0x2e3330[_0x2f8343(0x879)];VisuMZ[_0x2f8343(0x2d3)][_0x2f8343(0x903)](_0x561caf,_0x440db3);}},VisuMZ[_0x59226c(0x2d3)][_0x59226c(0x903)]=function(_0x2ecc8f,_0x1e9840){const _0xf47853=_0x59226c;if(!!window[_0x2ecc8f]){if($gameTemp['isPlaytest']())console[_0xf47853(0x735)](_0xf47853(0x4a3)[_0xf47853(0x538)](_0x2ecc8f));}const _0x4f1cde=_0xf47853(0x554)['format'](_0x2ecc8f,_0x1e9840);window[_0x2ecc8f]=new Function(_0x4f1cde);},Scene_Boot[_0x59226c(0x7bf)][_0x59226c(0x791)]=function(){const _0x3dd6c7=_0x59226c,_0x5ab370=VisuMZ[_0x3dd6c7(0x2d3)][_0x3dd6c7(0x6ad)]['CustomParam'];if(!_0x5ab370)return;for(const _0x199ac0 of _0x5ab370){if(_0x3dd6c7(0x7df)!==_0x3dd6c7(0x5d2)){if(!_0x199ac0)continue;VisuMZ[_0x3dd6c7(0x2d3)]['createCustomParameter'](_0x199ac0);}else this['switchModes'](_0x3dd6c7(0x421));}},VisuMZ[_0x59226c(0x2d3)][_0x59226c(0x226)]={},VisuMZ[_0x59226c(0x2d3)][_0x59226c(0x40e)]={},VisuMZ[_0x59226c(0x2d3)][_0x59226c(0x3a9)]={},VisuMZ['CoreEngine'][_0x59226c(0x7d9)]={},VisuMZ[_0x59226c(0x2d3)][_0x59226c(0x41a)]=function(_0x25bc73){const _0x2120cf=_0x59226c,_0x50ef22=_0x25bc73[_0x2120cf(0x974)],_0x2c8baa=_0x25bc73[_0x2120cf(0x682)],_0x5b23fc=_0x25bc73['Icon'],_0x36e35a=_0x25bc73['Type'],_0x3c1545=new Function(_0x25bc73[_0x2120cf(0x322)]);VisuMZ[_0x2120cf(0x2d3)][_0x2120cf(0x226)][_0x50ef22['toUpperCase']()[_0x2120cf(0x7e8)]()]=_0x2c8baa,VisuMZ[_0x2120cf(0x2d3)][_0x2120cf(0x40e)][_0x50ef22[_0x2120cf(0x657)]()[_0x2120cf(0x7e8)]()]=_0x5b23fc,VisuMZ[_0x2120cf(0x2d3)][_0x2120cf(0x3a9)][_0x50ef22[_0x2120cf(0x657)]()[_0x2120cf(0x7e8)]()]=_0x36e35a,VisuMZ['CoreEngine']['CustomParamAbb'][_0x50ef22[_0x2120cf(0x657)]()['trim']()]=_0x50ef22,Object[_0x2120cf(0x257)](Game_BattlerBase['prototype'],_0x50ef22,{'get'(){const _0xabf0dd=_0x2120cf,_0x3fda29=_0x3c1545[_0xabf0dd(0x38e)](this);return _0x36e35a===_0xabf0dd(0x624)?Math[_0xabf0dd(0x93a)](_0x3fda29):_0x3fda29;}});},VisuMZ['ParseAllNotetags']=function(){const _0x2da8e1=_0x59226c;for(const _0x4c3eee of $dataActors){if(_0x2da8e1(0x4a8)==='arpMy')this[_0x2da8e1(0x479)]-=_0x129043[_0x2da8e1(0x966)]((_0x1ce122['width']-_0x19818a[_0x2da8e1(0x8bc)])/0x2);else{if(_0x4c3eee)VisuMZ[_0x2da8e1(0x842)](_0x4c3eee);}}for(const _0x36f007 of $dataClasses){if(_0x36f007)VisuMZ[_0x2da8e1(0x285)](_0x36f007);}for(const _0x3e9875 of $dataSkills){if(_0x2da8e1(0x92c)===_0x2da8e1(0x91c))_0x5e7426+=_0xb9bb21,_0x154dfe+=_0x2da8e1(0x82d)[_0x2da8e1(0x538)](_0x5e4259);else{if(_0x3e9875)VisuMZ[_0x2da8e1(0x85b)](_0x3e9875);}}for(const _0x46cbc7 of $dataItems){if(_0x2da8e1(0x2ce)===_0x2da8e1(0x696)){var _0x3fabce=_0x3f989f-2.625/2.75;return 7.5625*_0x3fabce*_0x3fabce+0.984375;}else{if(_0x46cbc7)VisuMZ['ParseItemNotetags'](_0x46cbc7);}}for(const _0x8e3e3d of $dataWeapons){if(_0x2da8e1(0x66a)===_0x2da8e1(0x66a)){if(_0x8e3e3d)VisuMZ['ParseWeaponNotetags'](_0x8e3e3d);}else{if(!this[_0x2da8e1(0x5a3)]())return;const _0x9267f8=this[_0x2da8e1(0x32b)]();this['_buttonAssistWindow']=new _0x14340e(_0x9267f8),this[_0x2da8e1(0x69e)](this[_0x2da8e1(0x516)]);}}for(const _0x1d2e99 of $dataArmors){if(_0x1d2e99)VisuMZ['ParseArmorNotetags'](_0x1d2e99);}for(const _0x11a9f9 of $dataEnemies){if(_0x11a9f9)VisuMZ[_0x2da8e1(0x2e1)](_0x11a9f9);}for(const _0x425992 of $dataStates){if(_0x2da8e1(0x870)===_0x2da8e1(0x56a))this[_0x2da8e1(0x77e)]=this[_0x2da8e1(0x7c9)](),_0x2f646a[_0x2da8e1(0x2d3)][_0x2da8e1(0x533)][_0x2da8e1(0x38e)](this,_0x3af4cd),this[_0x2da8e1(0x77e)]==='default'?this[_0x2da8e1(0x356)](0x0):(_0x5dbe06[_0x2da8e1(0x3b4)](),this[_0x2da8e1(0x976)]());else{if(_0x425992)VisuMZ[_0x2da8e1(0x6f4)](_0x425992);}}for(const _0x88540d of $dataTilesets){if(_0x88540d)VisuMZ[_0x2da8e1(0x484)](_0x88540d);}},VisuMZ[_0x59226c(0x842)]=function(_0x17f1f7){},VisuMZ[_0x59226c(0x285)]=function(_0x5c710a){},VisuMZ[_0x59226c(0x85b)]=function(_0x1e481f){},VisuMZ['ParseItemNotetags']=function(_0xcdbd39){},VisuMZ[_0x59226c(0x2d0)]=function(_0x15bbfd){},VisuMZ[_0x59226c(0x7ee)]=function(_0x242c67){},VisuMZ[_0x59226c(0x2e1)]=function(_0x42e81f){},VisuMZ[_0x59226c(0x6f4)]=function(_0xdc7179){},VisuMZ[_0x59226c(0x484)]=function(_0x242386){},VisuMZ[_0x59226c(0x2d3)][_0x59226c(0x842)]=VisuMZ[_0x59226c(0x842)],VisuMZ['ParseActorNotetags']=function(_0x504993){const _0x408910=_0x59226c;VisuMZ['CoreEngine'][_0x408910(0x842)][_0x408910(0x38e)](this,_0x504993);const _0x31b4c9=_0x504993['note'];if(_0x31b4c9[_0x408910(0x25f)](/<MAX LEVEL:[ ](\d+)>/i)){_0x504993['maxLevel']=Number(RegExp['$1']);if(_0x504993[_0x408910(0x4be)]===0x0)_0x504993[_0x408910(0x4be)]=Number[_0x408910(0x2f7)];}_0x31b4c9[_0x408910(0x25f)](/<INITIAL LEVEL:[ ](\d+)>/i)&&(_0x504993[_0x408910(0x481)]=Math[_0x408910(0x3d0)](Number(RegExp['$1']),_0x504993[_0x408910(0x4be)]));},VisuMZ['CoreEngine']['ParseClassNotetags']=VisuMZ[_0x59226c(0x285)],VisuMZ['ParseClassNotetags']=function(_0x488063){const _0x4caeb2=_0x59226c;VisuMZ['CoreEngine'][_0x4caeb2(0x285)][_0x4caeb2(0x38e)](this,_0x488063);if(_0x488063[_0x4caeb2(0x6fa)]){if(_0x4caeb2(0x6f2)===_0x4caeb2(0x7ea)){_0xcebbf4[_0x4caeb2(0x5cf)](_0x2df949,_0x2542bc);const _0xfce80d=_0xe1de0d[_0x4caeb2(0x3d0)](_0x3ed7fc[_0x4caeb2(0x36a)],_0x463d64[_0x4caeb2(0x991)]),_0x18d2d4=_0x4b9aad[_0x4caeb2(0x228)](_0x45131f['StartID'],_0x356031[_0x4caeb2(0x991)]);for(let _0x181ba3=_0xfce80d;_0x181ba3<=_0x18d2d4;_0x181ba3++){_0x3d8841[_0x4caeb2(0x43b)](_0x181ba3);}}else for(const _0x236084 of _0x488063[_0x4caeb2(0x6fa)]){_0x236084['note']['match'](/<LEARN AT LEVEL:[ ](\d+)>/i)&&(_0x236084[_0x4caeb2(0x88a)]=Math[_0x4caeb2(0x228)](Number(RegExp['$1']),0x1));}}},VisuMZ[_0x59226c(0x2d3)][_0x59226c(0x2e1)]=VisuMZ['ParseEnemyNotetags'],VisuMZ['ParseEnemyNotetags']=function(_0x3fbcec){const _0x1518ca=_0x59226c;VisuMZ[_0x1518ca(0x2d3)][_0x1518ca(0x2e1)]['call'](this,_0x3fbcec),_0x3fbcec['level']=0x1;const _0x3ef1f1=_0x3fbcec['note'];if(_0x3ef1f1['match'](/<LEVEL:[ ](\d+)>/i))_0x3fbcec[_0x1518ca(0x88a)]=Number(RegExp['$1']);if(_0x3ef1f1[_0x1518ca(0x25f)](/<MAXHP:[ ](\d+)>/i))_0x3fbcec[_0x1518ca(0x8e0)][0x0]=Number(RegExp['$1']);if(_0x3ef1f1[_0x1518ca(0x25f)](/<MAXMP:[ ](\d+)>/i))_0x3fbcec[_0x1518ca(0x8e0)][0x1]=Number(RegExp['$1']);if(_0x3ef1f1[_0x1518ca(0x25f)](/<ATK:[ ](\d+)>/i))_0x3fbcec[_0x1518ca(0x8e0)][0x2]=Number(RegExp['$1']);if(_0x3ef1f1[_0x1518ca(0x25f)](/<DEF:[ ](\d+)>/i))_0x3fbcec[_0x1518ca(0x8e0)][0x3]=Number(RegExp['$1']);if(_0x3ef1f1[_0x1518ca(0x25f)](/<MAT:[ ](\d+)>/i))_0x3fbcec[_0x1518ca(0x8e0)][0x4]=Number(RegExp['$1']);if(_0x3ef1f1[_0x1518ca(0x25f)](/<MDF:[ ](\d+)>/i))_0x3fbcec[_0x1518ca(0x8e0)][0x5]=Number(RegExp['$1']);if(_0x3ef1f1['match'](/<AGI:[ ](\d+)>/i))_0x3fbcec[_0x1518ca(0x8e0)][0x6]=Number(RegExp['$1']);if(_0x3ef1f1[_0x1518ca(0x25f)](/<LUK:[ ](\d+)>/i))_0x3fbcec[_0x1518ca(0x8e0)][0x7]=Number(RegExp['$1']);if(_0x3ef1f1[_0x1518ca(0x25f)](/<EXP:[ ](\d+)>/i))_0x3fbcec[_0x1518ca(0x286)]=Number(RegExp['$1']);if(_0x3ef1f1[_0x1518ca(0x25f)](/<GOLD:[ ](\d+)>/i))_0x3fbcec[_0x1518ca(0x711)]=Number(RegExp['$1']);},VisuMZ[_0x59226c(0x2d3)][_0x59226c(0x29a)]=Graphics[_0x59226c(0x926)],Graphics[_0x59226c(0x926)]=function(){const _0x13a776=_0x59226c;switch(VisuMZ[_0x13a776(0x2d3)][_0x13a776(0x6ad)][_0x13a776(0x509)][_0x13a776(0x80d)]){case _0x13a776(0x61a):return!![];case _0x13a776(0x649):return![];default:return VisuMZ['CoreEngine'][_0x13a776(0x29a)][_0x13a776(0x38e)](this);}},VisuMZ[_0x59226c(0x2d3)]['Graphics_printError']=Graphics['printError'],Graphics['printError']=function(_0x45cff6,_0x333bfa,_0x354672=null){const _0x172a56=_0x59226c;VisuMZ[_0x172a56(0x2d3)][_0x172a56(0x20f)][_0x172a56(0x38e)](this,_0x45cff6,_0x333bfa,_0x354672),VisuMZ['ShowDevTools'](![]);},VisuMZ[_0x59226c(0x2d3)][_0x59226c(0x30d)]=Graphics['_centerElement'],Graphics[_0x59226c(0x888)]=function(_0x11138b){const _0x2aa29f=_0x59226c;VisuMZ[_0x2aa29f(0x2d3)][_0x2aa29f(0x30d)][_0x2aa29f(0x38e)](this,_0x11138b),this[_0x2aa29f(0x513)](_0x11138b);},Graphics['_centerElementCoreEngine']=function(_0x43d6cb){const _0x29e458=_0x59226c;if(VisuMZ[_0x29e458(0x2d3)][_0x29e458(0x6ad)]['QoL'][_0x29e458(0x6f5)]){if('QzSRd'!==_0x29e458(0x63f)){if(_0xc4a3bc)_0x19279b[_0x29e458(0x2e1)](_0x9e5c2b);}else _0x43d6cb['style'][_0x29e458(0x447)]=_0x29e458(0x512);}VisuMZ['CoreEngine'][_0x29e458(0x6ad)][_0x29e458(0x509)][_0x29e458(0x633)]&&(_0x43d6cb[_0x29e458(0x401)][_0x29e458(0x7a0)]=_0x29e458(0x658));const _0x350e92=Math[_0x29e458(0x228)](0x0,Math[_0x29e458(0x966)](_0x43d6cb[_0x29e458(0x4d6)]*this['_realScale'])),_0x1bd8ef=Math['max'](0x0,Math[_0x29e458(0x966)](_0x43d6cb[_0x29e458(0x235)]*this[_0x29e458(0x6e5)]));_0x43d6cb[_0x29e458(0x401)][_0x29e458(0x4d6)]=_0x350e92+'px',_0x43d6cb[_0x29e458(0x401)][_0x29e458(0x235)]=_0x1bd8ef+'px';},VisuMZ[_0x59226c(0x2d3)][_0x59226c(0x4d5)]=Bitmap[_0x59226c(0x7bf)][_0x59226c(0x72d)],Bitmap[_0x59226c(0x7bf)][_0x59226c(0x72d)]=function(_0x436b0d,_0x3ff6e7){const _0x3c4fe2=_0x59226c;VisuMZ['CoreEngine'][_0x3c4fe2(0x4d5)]['call'](this,_0x436b0d,_0x3ff6e7),this[_0x3c4fe2(0x1fa)]=!(VisuMZ[_0x3c4fe2(0x2d3)][_0x3c4fe2(0x6ad)][_0x3c4fe2(0x509)]['PixelateImageRendering']??!![]);},Bitmap[_0x59226c(0x7bf)]['markCoreEngineModified']=function(){const _0x3ca3d5=_0x59226c;this[_0x3ca3d5(0x6a2)]=!![];},VisuMZ[_0x59226c(0x2d3)][_0x59226c(0x2b6)]=Sprite[_0x59226c(0x7bf)][_0x59226c(0x207)],Sprite[_0x59226c(0x7bf)][_0x59226c(0x207)]=function(){const _0x382725=_0x59226c;VisuMZ[_0x382725(0x2d3)]['Sprite_destroy'][_0x382725(0x38e)](this),this['destroyCoreEngineMarkedBitmaps']();},Sprite[_0x59226c(0x7bf)][_0x59226c(0x940)]=function(){const _0x17ee95=_0x59226c;if(!this['bitmap'])return;if(!this[_0x17ee95(0x22a)][_0x17ee95(0x6a2)])return;if(this['bitmap'][_0x17ee95(0x563)]&&!this[_0x17ee95(0x3ba)]['_baseTexture'][_0x17ee95(0x4b3)]){if(_0x17ee95(0x686)!==_0x17ee95(0x724))this[_0x17ee95(0x22a)][_0x17ee95(0x207)]();else var _0x49648d=_0x5e7a18[_0x17ee95(0x748)](_0x2d359b*0x2-0x1,_0x17ee95(0x1d5))*0.5+0.5;}},VisuMZ[_0x59226c(0x2d3)][_0x59226c(0x2f2)]=Bitmap[_0x59226c(0x7bf)][_0x59226c(0x61d)],Bitmap[_0x59226c(0x7bf)][_0x59226c(0x61d)]=function(_0x22b294,_0x413b39){const _0x424dce=_0x59226c;VisuMZ['CoreEngine']['Bitmap_resize'][_0x424dce(0x38e)](this,_0x22b294,_0x413b39),this[_0x424dce(0x5d3)]();},VisuMZ[_0x59226c(0x2d3)][_0x59226c(0x534)]=Bitmap[_0x59226c(0x7bf)][_0x59226c(0x307)],Bitmap[_0x59226c(0x7bf)]['blt']=function(_0x46851d,_0x30e99b,_0x1d8c81,_0x54e1ef,_0x30a9cf,_0x5b7f1f,_0x418a33,_0x140455,_0x53985d){const _0x3491e=_0x59226c;_0x30e99b=Math[_0x3491e(0x93a)](_0x30e99b),_0x1d8c81=Math[_0x3491e(0x93a)](_0x1d8c81),_0x54e1ef=Math[_0x3491e(0x93a)](_0x54e1ef),_0x30a9cf=Math[_0x3491e(0x93a)](_0x30a9cf),_0x5b7f1f=Math[_0x3491e(0x93a)](_0x5b7f1f),_0x418a33=Math[_0x3491e(0x93a)](_0x418a33),VisuMZ['CoreEngine'][_0x3491e(0x534)][_0x3491e(0x38e)](this,_0x46851d,_0x30e99b,_0x1d8c81,_0x54e1ef,_0x30a9cf,_0x5b7f1f,_0x418a33,_0x140455,_0x53985d),this[_0x3491e(0x5d3)]();},VisuMZ['CoreEngine'][_0x59226c(0x7c2)]=Bitmap['prototype'][_0x59226c(0x656)],Bitmap['prototype'][_0x59226c(0x656)]=function(_0x281e81,_0x413b82,_0x1ffe07,_0x269990){const _0x572ddf=_0x59226c;VisuMZ[_0x572ddf(0x2d3)][_0x572ddf(0x7c2)][_0x572ddf(0x38e)](this,_0x281e81,_0x413b82,_0x1ffe07,_0x269990),this[_0x572ddf(0x5d3)]();},VisuMZ[_0x59226c(0x2d3)][_0x59226c(0x7ad)]=Bitmap[_0x59226c(0x7bf)][_0x59226c(0x5ad)],Bitmap['prototype'][_0x59226c(0x5ad)]=function(_0x1a001e,_0x5aea34,_0x22d65d,_0x16d810,_0x5a7eed){const _0x6fbc0f=_0x59226c;VisuMZ['CoreEngine'][_0x6fbc0f(0x7ad)][_0x6fbc0f(0x38e)](this,_0x1a001e,_0x5aea34,_0x22d65d,_0x16d810,_0x5a7eed),this[_0x6fbc0f(0x5d3)]();},VisuMZ[_0x59226c(0x2d3)][_0x59226c(0x5da)]=Bitmap[_0x59226c(0x7bf)]['strokeRect'],Bitmap[_0x59226c(0x7bf)][_0x59226c(0x568)]=function(_0x3dff2d,_0x40e217,_0x9e4152,_0x54a27f,_0x4cd31d){const _0x58f42d=_0x59226c;VisuMZ[_0x58f42d(0x2d3)][_0x58f42d(0x5da)]['call'](this,_0x3dff2d,_0x40e217,_0x9e4152,_0x54a27f,_0x4cd31d),this[_0x58f42d(0x5d3)]();},VisuMZ['CoreEngine'][_0x59226c(0x669)]=Bitmap['prototype'][_0x59226c(0x351)],Bitmap[_0x59226c(0x7bf)][_0x59226c(0x351)]=function(_0x3cf952,_0x312dbb,_0x3392dc,_0x438e45,_0x1964cd,_0x4a28b5,_0x673d2){const _0x2146b6=_0x59226c;VisuMZ[_0x2146b6(0x2d3)]['Bitmap_gradientFillRect'][_0x2146b6(0x38e)](this,_0x3cf952,_0x312dbb,_0x3392dc,_0x438e45,_0x1964cd,_0x4a28b5,_0x673d2),this['markCoreEngineModified']();},VisuMZ[_0x59226c(0x2d3)][_0x59226c(0x6b5)]=Bitmap[_0x59226c(0x7bf)][_0x59226c(0x640)],Bitmap[_0x59226c(0x7bf)]['drawCircle']=function(_0x35e45d,_0x5c3cf9,_0x3fba4f,_0x11ee5f){const _0x2da96b=_0x59226c;_0x35e45d=Math[_0x2da96b(0x93a)](_0x35e45d),_0x5c3cf9=Math[_0x2da96b(0x93a)](_0x5c3cf9),_0x3fba4f=Math[_0x2da96b(0x93a)](_0x3fba4f),VisuMZ['CoreEngine']['Bitmap_drawCircle'][_0x2da96b(0x38e)](this,_0x35e45d,_0x5c3cf9,_0x3fba4f,_0x11ee5f),this[_0x2da96b(0x5d3)]();},VisuMZ[_0x59226c(0x2d3)][_0x59226c(0x50d)]=Bitmap[_0x59226c(0x7bf)][_0x59226c(0x3b9)],Bitmap[_0x59226c(0x7bf)][_0x59226c(0x3b9)]=function(_0x2d8021){const _0x4d0751=_0x59226c;return Math[_0x4d0751(0x715)](VisuMZ[_0x4d0751(0x2d3)][_0x4d0751(0x50d)][_0x4d0751(0x38e)](this,_0x2d8021));},VisuMZ[_0x59226c(0x2d3)]['Bitmap_drawText']=Bitmap[_0x59226c(0x7bf)][_0x59226c(0x273)],Bitmap[_0x59226c(0x7bf)][_0x59226c(0x273)]=function(_0x109189,_0x41192c,_0x12dbaa,_0x4bdcb4,_0x778ff3,_0x45e9c3){const _0x50f309=_0x59226c;_0x41192c=Math[_0x50f309(0x93a)](_0x41192c),_0x12dbaa=Math[_0x50f309(0x93a)](_0x12dbaa),_0x4bdcb4=Math['round'](_0x4bdcb4),_0x778ff3=Math[_0x50f309(0x93a)](_0x778ff3),VisuMZ[_0x50f309(0x2d3)][_0x50f309(0x362)][_0x50f309(0x38e)](this,_0x109189,_0x41192c,_0x12dbaa,_0x4bdcb4,_0x778ff3,_0x45e9c3),this[_0x50f309(0x5d3)]();},VisuMZ[_0x59226c(0x2d3)]['Bitmap_drawTextOutline']=Bitmap[_0x59226c(0x7bf)][_0x59226c(0x688)],Bitmap[_0x59226c(0x7bf)][_0x59226c(0x688)]=function(_0x4ac8cc,_0x5a3685,_0x4257bf,_0x3c2254){const _0x488701=_0x59226c;VisuMZ[_0x488701(0x2d3)]['Settings'][_0x488701(0x509)][_0x488701(0x36e)]?this[_0x488701(0x566)](_0x4ac8cc,_0x5a3685,_0x4257bf,_0x3c2254):VisuMZ['CoreEngine'][_0x488701(0x588)][_0x488701(0x38e)](this,_0x4ac8cc,_0x5a3685,_0x4257bf,_0x3c2254);},Bitmap['prototype'][_0x59226c(0x566)]=function(_0x5cd55c,_0xcedda0,_0x573838,_0x4c6c8d){const _0x5d6784=_0x59226c,_0x38f5e4=this[_0x5d6784(0x5a5)];_0x38f5e4[_0x5d6784(0x7a5)]=this['outlineColor'],_0x38f5e4[_0x5d6784(0x895)](_0x5cd55c,_0xcedda0+0x2,_0x573838+0x2,_0x4c6c8d);},VisuMZ[_0x59226c(0x2d3)][_0x59226c(0x6e0)]=Input[_0x59226c(0x3b4)],Input[_0x59226c(0x3b4)]=function(){const _0xc19589=_0x59226c;VisuMZ[_0xc19589(0x2d3)][_0xc19589(0x6e0)][_0xc19589(0x38e)](this),this[_0xc19589(0x914)]=undefined,this[_0xc19589(0x252)]=undefined,this[_0xc19589(0x1a6)]=Input[_0xc19589(0x501)];},VisuMZ[_0x59226c(0x2d3)][_0x59226c(0x377)]=Input[_0x59226c(0x334)],Input['update']=function(){const _0x21a1cb=_0x59226c;VisuMZ[_0x21a1cb(0x2d3)][_0x21a1cb(0x377)]['call'](this);if(this['_gamepadWait'])this['_gamepadWait']--;},VisuMZ[_0x59226c(0x2d3)][_0x59226c(0x7b8)]=Input[_0x59226c(0x7b5)],Input[_0x59226c(0x7b5)]=function(){const _0x344ff8=_0x59226c;if(this[_0x344ff8(0x1a6)])return;VisuMZ[_0x344ff8(0x2d3)][_0x344ff8(0x7b8)][_0x344ff8(0x38e)](this);},VisuMZ['CoreEngine'][_0x59226c(0x8d8)]=Input[_0x59226c(0x29f)],Input[_0x59226c(0x29f)]=function(){const _0x45662c=_0x59226c;VisuMZ[_0x45662c(0x2d3)][_0x45662c(0x8d8)]['call'](this),document['addEventListener']('keypress',this[_0x45662c(0x250)][_0x45662c(0x938)](this));},VisuMZ[_0x59226c(0x2d3)][_0x59226c(0x398)]=Input['_onKeyDown'],Input['_onKeyDown']=function(_0x45aee0){const _0x368acd=_0x59226c;this[_0x368acd(0x252)]=_0x45aee0[_0x368acd(0x8ac)],VisuMZ['CoreEngine'][_0x368acd(0x398)][_0x368acd(0x38e)](this,_0x45aee0);},Input[_0x59226c(0x250)]=function(_0x3c7db8){const _0x2cf99d=_0x59226c;this[_0x2cf99d(0x549)](_0x3c7db8);},Input[_0x59226c(0x549)]=function(_0x25490a){const _0x4bb740=_0x59226c;this[_0x4bb740(0x252)]=_0x25490a[_0x4bb740(0x8ac)];let _0x4bdf5a=String[_0x4bb740(0x389)](_0x25490a['charCode']);if(this['_inputString']===undefined)this[_0x4bb740(0x914)]=_0x4bdf5a;else{if(_0x4bb740(0x597)===_0x4bb740(0x409)){const _0x32b789=_0x4bb740(0x606);this['_colorCache']=this[_0x4bb740(0x64f)]||{};if(this[_0x4bb740(0x64f)][_0x32b789])return this[_0x4bb740(0x64f)][_0x32b789];const _0x4e9e03=_0x39e3a5['CoreEngine'][_0x4bb740(0x6ad)][_0x4bb740(0x801)][_0x4bb740(0x1b3)];return this[_0x4bb740(0x23a)](_0x32b789,_0x4e9e03);}else this[_0x4bb740(0x914)]+=_0x4bdf5a;}},VisuMZ['CoreEngine'][_0x59226c(0x2ec)]=Input[_0x59226c(0x42c)],Input[_0x59226c(0x42c)]=function(_0x8fd618){const _0x7a1bc9=_0x59226c;if(_0x8fd618===0x8)return![];return VisuMZ[_0x7a1bc9(0x2d3)][_0x7a1bc9(0x2ec)][_0x7a1bc9(0x38e)](this,_0x8fd618);},Input[_0x59226c(0x2f4)]=function(_0x7ee079){const _0xf949ef=_0x59226c;if(_0x7ee079[_0xf949ef(0x25f)](/backspace/i))return this[_0xf949ef(0x252)]===0x8;if(_0x7ee079[_0xf949ef(0x25f)](/enter/i))return this[_0xf949ef(0x252)]===0xd;if(_0x7ee079[_0xf949ef(0x25f)](/escape/i))return this[_0xf949ef(0x252)]===0x1b;},Input['isNumpadPressed']=function(){const _0x4f8b0b=_0x59226c;return[0x30,0x31,0x32,0x33,0x34,0x35,0x36,0x37,0x38,0x39]['contains'](this[_0x4f8b0b(0x252)]);},Input['isArrowPressed']=function(){return[0x25,0x26,0x27,0x28]['contains'](this['_inputSpecialKeyCode']);},Input['isGamepadConnected']=function(){const _0x1d9f3b=_0x59226c;if(navigator[_0x1d9f3b(0x4c5)]){if(_0x1d9f3b(0x925)==='pvSSx'){const _0x45e5e3=navigator[_0x1d9f3b(0x4c5)]();if(_0x45e5e3){if(_0x1d9f3b(0x637)!==_0x1d9f3b(0x6b4))for(const _0x3a4cb4 of _0x45e5e3){if('UkaxU'===_0x1d9f3b(0x3f6)){this[_0x1d9f3b(0x36c)]=_0x308fed[_0x1d9f3b(0x2d3)][_0x1d9f3b(0x6ad)][_0x1d9f3b(0x509)]['NoTileShadows']||![];if(_0x281297&&_0xe68b75[_0x1d9f3b(0x246)]){if(_0x4ed398['note'][_0x1d9f3b(0x25f)](/<SHOW TILE SHADOWS>/i))this[_0x1d9f3b(0x36c)]=![];if(_0x26766d[_0x1d9f3b(0x246)][_0x1d9f3b(0x25f)](/<HIDE TILE SHADOWS>/i))this[_0x1d9f3b(0x36c)]=!![];}}else{if(_0x3a4cb4&&_0x3a4cb4[_0x1d9f3b(0x4f7)]){if('Zmvtj'!==_0x1d9f3b(0x7e7))return!![];else this[_0x1d9f3b(0x916)]();}}}else _0x26decd[_0x1d9f3b(0x3b4)](),this[_0x1d9f3b(0x374)]();}}else _0x3b8beb[_0x1d9f3b(0x22d)]&&_0x174ede['endAnimation']();}return![];},Input[_0x59226c(0x1c8)]=function(){const _0x5ebd09=_0x59226c;if(navigator[_0x5ebd09(0x4c5)]){if(_0x5ebd09(0x946)!==_0x5ebd09(0x946)){if(this[_0x5ebd09(0x77e)]==='keyboard')return;if(_0x53bd8d['isNumpadPressed']())return;_0x107063[_0x5ebd09(0x2d3)][_0x5ebd09(0x302)][_0x5ebd09(0x38e)](this),this[_0x5ebd09(0x245)](_0x5ebd09(0x421));}else{const _0x1dcf11=navigator[_0x5ebd09(0x4c5)]();if(_0x1dcf11){if(_0x5ebd09(0x609)!==_0x5ebd09(0x609))this[_0x5ebd09(0x8e8)][_0x5ebd09(0x573)](_0x2a3de6[_0x5ebd09(0x957)][_0x5ebd09(0x6ab)]);else for(const _0x30d8a3 of _0x1dcf11){if(_0x30d8a3&&_0x30d8a3[_0x5ebd09(0x4f7)]){if(_0x5ebd09(0x865)===_0x5ebd09(0x865)){if(this[_0x5ebd09(0x5be)](_0x30d8a3))return!![];}else _0x3378ed+=_0x5ebd09(0x8a7);}}}}}return![];},Input[_0x59226c(0x5be)]=function(_0x3f39a5){const _0x478a9b=_0x59226c,_0x5679a5=_0x3f39a5[_0x478a9b(0x859)];for(let _0x4ff037=0x0;_0x4ff037<_0x5679a5[_0x478a9b(0x587)];_0x4ff037++){if(_0x5679a5[_0x4ff037][_0x478a9b(0x7d6)])return!![];}return![];},VisuMZ[_0x59226c(0x2d3)][_0x59226c(0x443)]=Tilemap[_0x59226c(0x7bf)][_0x59226c(0x904)],Tilemap[_0x59226c(0x7bf)]['_addShadow']=function(_0x53d73d,_0x84cce,_0x5681e3,_0x43553a){const _0x41005e=_0x59226c;if($gameMap&&$gameMap[_0x41005e(0x1f7)]())return;VisuMZ[_0x41005e(0x2d3)][_0x41005e(0x443)][_0x41005e(0x38e)](this,_0x53d73d,_0x84cce,_0x5681e3,_0x43553a);},Tilemap[_0x59226c(0x3b6)][_0x59226c(0x7bf)]['_createInternalTextures']=function(){const _0x41d0c7=_0x59226c;this[_0x41d0c7(0x627)]();for(let _0xa23a6d=0x0;_0xa23a6d<Tilemap[_0x41d0c7(0x905)][_0x41d0c7(0x56c)];_0xa23a6d++){if(_0x41d0c7(0x233)!==_0x41d0c7(0x2e2)){const _0x4374b8=new PIXI['BaseTexture']();_0x4374b8[_0x41d0c7(0x930)](0x800,0x800),VisuMZ[_0x41d0c7(0x2d3)][_0x41d0c7(0x6ad)][_0x41d0c7(0x509)][_0x41d0c7(0x633)]&&(_0x4374b8[_0x41d0c7(0x869)]=PIXI[_0x41d0c7(0x329)][_0x41d0c7(0x416)]),this['_internalTextures'][_0x41d0c7(0x564)](_0x4374b8);}else this[_0x41d0c7(0x86e)](_0x18066f);}},WindowLayer[_0x59226c(0x7bf)][_0x59226c(0x2af)]=function(){const _0x502118=_0x59226c;if(SceneManager&&SceneManager[_0x502118(0x306)]){if('crYKW'!==_0x502118(0x527))return SceneManager[_0x502118(0x306)][_0x502118(0x522)]();else{if(_0xce0497['isPlaytest']())_0x48bd7e[_0x502118(0x735)](_0x32813e);}}else return!![];},VisuMZ[_0x59226c(0x2d3)][_0x59226c(0x95d)]=WindowLayer[_0x59226c(0x7bf)][_0x59226c(0x53e)],WindowLayer[_0x59226c(0x7bf)]['render']=function render(_0x15ea34){const _0x1e1f05=_0x59226c;if(this[_0x1e1f05(0x2af)]())VisuMZ['CoreEngine'][_0x1e1f05(0x95d)]['call'](this,_0x15ea34);else{if(_0x1e1f05(0x8aa)!==_0x1e1f05(0x8aa)){try{_0x38f8c3['CoreEngine'][_0x1e1f05(0x48e)][_0x1e1f05(0x38e)](this);}catch(_0xf02a4a){_0x1381ed['isPlaytest']()&&(_0x2ab951[_0x1e1f05(0x735)](_0x1e1f05(0x25c)),_0x31b3fe[_0x1e1f05(0x735)](_0xf02a4a));}return!![];}else this[_0x1e1f05(0x86e)](_0x15ea34);}},WindowLayer['prototype']['renderNoMask']=function render(_0x53d961){const _0x378d26=_0x59226c;if(!this['visible'])return;const _0x363f6c=new PIXI['Graphics'](),_0x25ca70=_0x53d961['gl'],_0x8c2ebd=this['children'][_0x378d26(0x1ac)]();_0x53d961['framebuffer'][_0x378d26(0x598)](),_0x363f6c[_0x378d26(0x40f)]=this['transform'],_0x53d961['batch'][_0x378d26(0x51c)](),_0x25ca70[_0x378d26(0x248)](_0x25ca70[_0x378d26(0x4ac)]);while(_0x8c2ebd[_0x378d26(0x587)]>0x0){if(_0x378d26(0x24c)===_0x378d26(0x24c)){const _0x307ef3=_0x8c2ebd[_0x378d26(0x7d3)]();_0x307ef3['_isWindow']&&_0x307ef3[_0x378d26(0x897)]&&_0x307ef3[_0x378d26(0x631)]>0x0&&(_0x378d26(0x309)==='GEgIk'?this['_opening']&&(this[_0x378d26(0x631)]+=this[_0x378d26(0x238)](),this[_0x378d26(0x960)]()&&(this[_0x378d26(0x6d3)]=![])):(_0x25ca70[_0x378d26(0x4a5)](_0x25ca70[_0x378d26(0x77f)],0x0,~0x0),_0x25ca70[_0x378d26(0x679)](_0x25ca70[_0x378d26(0x72a)],_0x25ca70[_0x378d26(0x72a)],_0x25ca70['KEEP']),_0x307ef3[_0x378d26(0x53e)](_0x53d961),_0x53d961[_0x378d26(0x831)][_0x378d26(0x51c)](),_0x363f6c[_0x378d26(0x3b4)](),_0x25ca70['stencilFunc'](_0x25ca70[_0x378d26(0x31a)],0x1,~0x0),_0x25ca70[_0x378d26(0x679)](_0x25ca70[_0x378d26(0x330)],_0x25ca70[_0x378d26(0x330)],_0x25ca70['REPLACE']),_0x25ca70[_0x378d26(0x708)](_0x25ca70[_0x378d26(0x73a)],_0x25ca70[_0x378d26(0x987)]),_0x363f6c[_0x378d26(0x53e)](_0x53d961),_0x53d961[_0x378d26(0x831)]['flush'](),_0x25ca70[_0x378d26(0x708)](_0x25ca70[_0x378d26(0x987)],_0x25ca70[_0x378d26(0x428)])));}else this[_0x378d26(0x81a)][_0x378d26(0x573)](_0x57a396[_0x378d26(0x957)][_0x378d26(0x3e3)]);}_0x25ca70[_0x378d26(0x1fd)](_0x25ca70['STENCIL_TEST']),_0x25ca70[_0x378d26(0x3b4)](_0x25ca70[_0x378d26(0x758)]),_0x25ca70[_0x378d26(0x464)](0x0),_0x53d961['batch'][_0x378d26(0x51c)]();for(const _0x245f2d of this[_0x378d26(0x1ec)]){!_0x245f2d[_0x378d26(0x47d)]&&_0x245f2d['visible']&&('taWmd'!==_0x378d26(0x8a8)?this[_0x378d26(0x26f)]():_0x245f2d[_0x378d26(0x53e)](_0x53d961));}_0x53d961['batch'][_0x378d26(0x51c)]();},DataManager[_0x59226c(0x65f)]=function(_0x1941fa){const _0x2a861f=_0x59226c;return this[_0x2a861f(0x55c)](_0x1941fa)&&_0x1941fa[_0x2a861f(0x2f0)]===0x2;},VisuMZ['CoreEngine'][_0x59226c(0x490)]=DataManager[_0x59226c(0x338)],DataManager[_0x59226c(0x338)]=function(){const _0x37cf8e=_0x59226c;VisuMZ['CoreEngine']['DataManager_setupNewGame']['call'](this),this['reservePlayTestNewGameCommonEvent'](),this[_0x37cf8e(0x84d)]();},DataManager[_0x59226c(0x878)]=function(){const _0x94f436=_0x59226c;if($gameTemp[_0x94f436(0x31b)]()){const _0x70e06e=VisuMZ[_0x94f436(0x2d3)][_0x94f436(0x6ad)]['QoL'][_0x94f436(0x5fe)];if(_0x70e06e>0x0)$gameTemp[_0x94f436(0x241)](_0x70e06e);}},DataManager[_0x59226c(0x84d)]=function(){const _0x3cce1b=_0x59226c,_0x4af0c2=VisuMZ[_0x3cce1b(0x2d3)][_0x3cce1b(0x6ad)][_0x3cce1b(0x509)][_0x3cce1b(0x917)]||0x0;if(_0x4af0c2>0x0)$gameTemp[_0x3cce1b(0x241)](_0x4af0c2);},DataManager['createTroopNote']=function(_0x94f544){const _0x1a66de=_0x59226c,_0x19e2b8=$dataTroops[_0x94f544];if(!_0x19e2b8)return'';let _0x4e7ab2='';_0x4e7ab2+=_0x19e2b8['name'];for(const _0x48119b of _0x19e2b8[_0x1a66de(0x4ae)]){if(_0x1a66de(0x66b)===_0x1a66de(0x4b1))return _0x19d9a8[_0x1a66de(0x957)][_0x1a66de(0x778)]['call'](this);else for(const _0x7e6a27 of _0x48119b[_0x1a66de(0x3d8)]){[0x6c,0x198][_0x1a66de(0x98d)](_0x7e6a27['code'])&&(_0x4e7ab2+='\x0a',_0x4e7ab2+=_0x7e6a27[_0x1a66de(0x8bb)][0x0]);}}return _0x4e7ab2;},TextManager[_0x59226c(0x5c0)]=['','','',_0x59226c(0x90b),'','','HELP','',_0x59226c(0x5c8),_0x59226c(0x932),'','',_0x59226c(0x3b2),_0x59226c(0x2a8),_0x59226c(0x61e),'',_0x59226c(0x2e4),_0x59226c(0x4f6),_0x59226c(0x956),_0x59226c(0x992),'CAPSLOCK',_0x59226c(0x832),'EISU',_0x59226c(0x849),'FINAL',_0x59226c(0x88b),'',_0x59226c(0x7b4),_0x59226c(0x84a),'NONCONVERT',_0x59226c(0x2a2),_0x59226c(0x590),_0x59226c(0x28c),_0x59226c(0x797),'PGDN','END',_0x59226c(0x28b),_0x59226c(0x7a9),'UP',_0x59226c(0x4a1),'DOWN',_0x59226c(0x544),_0x59226c(0x491),_0x59226c(0x42b),'PRINTSCREEN',_0x59226c(0x5d7),_0x59226c(0x7c4),'','0','1','2','3','4','5','6','7','8','9',_0x59226c(0x85f),_0x59226c(0x4df),_0x59226c(0x5ce),_0x59226c(0x730),'GREATER_THAN',_0x59226c(0x4e5),'AT','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z',_0x59226c(0x3af),'',_0x59226c(0x559),'',_0x59226c(0x7dc),_0x59226c(0x5f7),_0x59226c(0x440),_0x59226c(0x644),'NUMPAD3',_0x59226c(0x59b),_0x59226c(0x601),_0x59226c(0x1de),'NUMPAD7',_0x59226c(0x6a0),_0x59226c(0x7be),'MULTIPLY','ADD',_0x59226c(0x604),'SUBTRACT','DECIMAL',_0x59226c(0x2a5),'F1','F2','F3','F4','F5','F6','F7','F8','F9',_0x59226c(0x4fc),_0x59226c(0x5a4),_0x59226c(0x560),_0x59226c(0x243),_0x59226c(0x488),_0x59226c(0x2f8),'F16','F17','F18',_0x59226c(0x4cf),_0x59226c(0x1d8),_0x59226c(0x822),'F22',_0x59226c(0x27a),'F24','','','','','','','','','NUM_LOCK','SCROLL_LOCK',_0x59226c(0x818),'WIN_OEM_FJ_MASSHOU',_0x59226c(0x5c4),_0x59226c(0x813),_0x59226c(0x3e5),'','','','','','','','','',_0x59226c(0x274),_0x59226c(0x79f),_0x59226c(0x677),_0x59226c(0x34c),_0x59226c(0x770),_0x59226c(0x6ef),_0x59226c(0x945),'UNDERSCORE','OPEN_PAREN',_0x59226c(0x2df),_0x59226c(0x664),'PLUS',_0x59226c(0x82e),_0x59226c(0x736),_0x59226c(0x69b),_0x59226c(0x768),_0x59226c(0x4a6),'','','','','VOLUME_MUTE',_0x59226c(0x6e4),_0x59226c(0x616),'','',_0x59226c(0x4df),_0x59226c(0x730),_0x59226c(0x4c4),'MINUS',_0x59226c(0x660),_0x59226c(0x562),_0x59226c(0x6d0),'','','','','','','','','','','','','','','','','','','','','','','','','','',_0x59226c(0x574),'BACK_SLASH',_0x59226c(0x546),_0x59226c(0x316),'','META',_0x59226c(0x4dc),'','WIN_ICO_HELP',_0x59226c(0x5ca),'',_0x59226c(0x2d7),'','',_0x59226c(0x5c9),_0x59226c(0x373),_0x59226c(0x387),_0x59226c(0x567),_0x59226c(0x4c9),'WIN_OEM_WSCTRL',_0x59226c(0x4e0),_0x59226c(0x388),_0x59226c(0x984),_0x59226c(0x7b6),'WIN_OEM_AUTO',_0x59226c(0x2c3),'WIN_OEM_BACKTAB',_0x59226c(0x87a),_0x59226c(0x986),_0x59226c(0x655),_0x59226c(0x520),_0x59226c(0x524),'ZOOM','',_0x59226c(0x20b),_0x59226c(0x34f),''],TextManager['buttonAssistOk']=VisuMZ['CoreEngine']['Settings'][_0x59226c(0x25d)][_0x59226c(0x23b)],TextManager[_0x59226c(0x943)]=VisuMZ['CoreEngine'][_0x59226c(0x6ad)][_0x59226c(0x25d)]['CancelText'],TextManager['buttonAssistSwitch']=VisuMZ['CoreEngine'][_0x59226c(0x6ad)][_0x59226c(0x25d)][_0x59226c(0x6ec)],VisuMZ[_0x59226c(0x2d3)]['TextManager_param']=TextManager[_0x59226c(0x317)],TextManager[_0x59226c(0x317)]=function(_0x44d5fc){const _0x363bd2=_0x59226c;return typeof _0x44d5fc===_0x363bd2(0x4dd)?VisuMZ['CoreEngine']['TextManager_param']['call'](this,_0x44d5fc):this[_0x363bd2(0x5f3)](_0x44d5fc);},TextManager['paramName']=function(_0x115e9b){const _0x1f1d89=_0x59226c;_0x115e9b=String(_0x115e9b||'')['toUpperCase']();const _0x17cee0=VisuMZ['CoreEngine'][_0x1f1d89(0x6ad)][_0x1f1d89(0x959)];if(_0x115e9b==='MAXHP')return $dataSystem[_0x1f1d89(0x5b8)]['params'][0x0];if(_0x115e9b===_0x1f1d89(0x503))return $dataSystem[_0x1f1d89(0x5b8)]['params'][0x1];if(_0x115e9b===_0x1f1d89(0x982))return $dataSystem[_0x1f1d89(0x5b8)]['params'][0x2];if(_0x115e9b==='DEF')return $dataSystem[_0x1f1d89(0x5b8)][_0x1f1d89(0x8e0)][0x3];if(_0x115e9b==='MAT')return $dataSystem[_0x1f1d89(0x5b8)][_0x1f1d89(0x8e0)][0x4];if(_0x115e9b===_0x1f1d89(0x29b))return $dataSystem[_0x1f1d89(0x5b8)]['params'][0x5];if(_0x115e9b===_0x1f1d89(0x580))return $dataSystem[_0x1f1d89(0x5b8)][_0x1f1d89(0x8e0)][0x6];if(_0x115e9b===_0x1f1d89(0x91e))return $dataSystem[_0x1f1d89(0x5b8)]['params'][0x7];if(_0x115e9b==='HIT')return _0x17cee0[_0x1f1d89(0x5a2)];if(_0x115e9b==='EVA')return _0x17cee0['XParamVocab1'];if(_0x115e9b===_0x1f1d89(0x5cb))return _0x17cee0['XParamVocab2'];if(_0x115e9b==='CEV')return _0x17cee0[_0x1f1d89(0x502)];if(_0x115e9b===_0x1f1d89(0x7a2))return _0x17cee0[_0x1f1d89(0x76a)];if(_0x115e9b===_0x1f1d89(0x269))return _0x17cee0['XParamVocab5'];if(_0x115e9b===_0x1f1d89(0x921))return _0x17cee0['XParamVocab6'];if(_0x115e9b==='HRG')return _0x17cee0[_0x1f1d89(0x885)];if(_0x115e9b===_0x1f1d89(0x910))return _0x17cee0['XParamVocab8'];if(_0x115e9b==='TRG')return _0x17cee0['XParamVocab9'];if(_0x115e9b===_0x1f1d89(0x402))return _0x17cee0[_0x1f1d89(0x60b)];if(_0x115e9b===_0x1f1d89(0x405))return _0x17cee0[_0x1f1d89(0x1d7)];if(_0x115e9b===_0x1f1d89(0x67c))return _0x17cee0['SParamVocab2'];if(_0x115e9b===_0x1f1d89(0x5d8))return _0x17cee0[_0x1f1d89(0x6aa)];if(_0x115e9b===_0x1f1d89(0x47e))return _0x17cee0['SParamVocab4'];if(_0x115e9b==='TCR')return _0x17cee0[_0x1f1d89(0x90f)];if(_0x115e9b===_0x1f1d89(0x811))return _0x17cee0['SParamVocab6'];if(_0x115e9b==='MDR')return _0x17cee0[_0x1f1d89(0x2d6)];if(_0x115e9b===_0x1f1d89(0x218))return _0x17cee0[_0x1f1d89(0x8cb)];if(_0x115e9b==='EXR')return _0x17cee0[_0x1f1d89(0x7a4)];if(VisuMZ['CoreEngine'][_0x1f1d89(0x226)][_0x115e9b])return VisuMZ[_0x1f1d89(0x2d3)][_0x1f1d89(0x226)][_0x115e9b];return'';},TextManager[_0x59226c(0x206)]=function(_0x1632f8){const _0x22ce7a=_0x59226c;if(_0x1632f8==='cancel')_0x1632f8=_0x22ce7a(0x4fd);let _0xa16000=[];for(let _0x45d130 in Input[_0x22ce7a(0x2bd)]){_0x45d130=Number(_0x45d130);if(_0x45d130>=0x60&&_0x45d130<=0x69)continue;if([0x12,0x20]['includes'](_0x45d130))continue;_0x1632f8===Input[_0x22ce7a(0x2bd)][_0x45d130]&&_0xa16000[_0x22ce7a(0x564)](_0x45d130);}for(let _0x211bc4=0x0;_0x211bc4<_0xa16000[_0x22ce7a(0x587)];_0x211bc4++){_0xa16000[_0x211bc4]=TextManager[_0x22ce7a(0x5c0)][_0xa16000[_0x211bc4]];}return this[_0x22ce7a(0x887)](_0xa16000);},TextManager[_0x59226c(0x887)]=function(_0x4e87){const _0x1cbbc6=_0x59226c,_0x2fa0a7=VisuMZ[_0x1cbbc6(0x2d3)][_0x1cbbc6(0x6ad)][_0x1cbbc6(0x25d)],_0x18c05e=_0x2fa0a7[_0x1cbbc6(0x2fb)],_0x1ecf85=_0x4e87[_0x1cbbc6(0x221)](),_0x5e21fd=_0x1cbbc6(0x37a)[_0x1cbbc6(0x538)](_0x1ecf85);return _0x2fa0a7[_0x5e21fd]?_0x2fa0a7[_0x5e21fd]:_0x18c05e[_0x1cbbc6(0x538)](_0x1ecf85);},TextManager[_0x59226c(0x65d)]=function(_0x38fac0,_0xb91787){const _0x25b55b=_0x59226c,_0x18cd3d=VisuMZ[_0x25b55b(0x2d3)][_0x25b55b(0x6ad)][_0x25b55b(0x25d)],_0x55c7b4=_0x18cd3d[_0x25b55b(0x251)],_0x503e59=this[_0x25b55b(0x206)](_0x38fac0),_0x342ebb=this[_0x25b55b(0x206)](_0xb91787);return _0x55c7b4[_0x25b55b(0x538)](_0x503e59,_0x342ebb);},VisuMZ[_0x59226c(0x2d3)][_0x59226c(0x477)]=ColorManager['loadWindowskin'],ColorManager[_0x59226c(0x853)]=function(){const _0x37977b=_0x59226c;VisuMZ[_0x37977b(0x2d3)][_0x37977b(0x477)]['call'](this),this[_0x37977b(0x64f)]=this['_colorCache']||{};},ColorManager['getColorDataFromPluginParameters']=function(_0x14bcc6,_0x225cf7){const _0x49cc21=_0x59226c;return _0x225cf7=String(_0x225cf7),this[_0x49cc21(0x64f)]=this['_colorCache']||{},_0x225cf7[_0x49cc21(0x25f)](/#(.*)/i)?this[_0x49cc21(0x64f)][_0x14bcc6]=_0x49cc21(0x8f3)[_0x49cc21(0x538)](String(RegExp['$1'])):_0x49cc21(0x6e9)!==_0x49cc21(0x825)?this['_colorCache'][_0x14bcc6]=this['textColor'](Number(_0x225cf7)):(this[_0x49cc21(0x78a)]=_0x5430eb[_0x49cc21(0x2d3)][_0x49cc21(0x6ad)]['QoL'][_0x49cc21(0x205)],this['_digitGroupingEx']=_0x6b0bd3[_0x49cc21(0x2d3)][_0x49cc21(0x6ad)][_0x49cc21(0x509)]['DigitGroupingExText']),this['_colorCache'][_0x14bcc6];},ColorManager['getColor']=function(_0x1f5f63){const _0x48aa00=_0x59226c;_0x1f5f63=String(_0x1f5f63);if(_0x1f5f63['match'](/#(.*)/i)){if('xbbvR'===_0x48aa00(0x382))return _0x48aa00(0x8f3)[_0x48aa00(0x538)](String(RegExp['$1']));else{const _0x2345a7='_stored_maxLvGaugeColor2';this[_0x48aa00(0x64f)]=this['_colorCache']||{};if(this[_0x48aa00(0x64f)][_0x2345a7])return this[_0x48aa00(0x64f)][_0x2345a7];const _0x45bf54=_0x4f4068[_0x48aa00(0x2d3)][_0x48aa00(0x6ad)]['Color'][_0x48aa00(0x6c9)];return this[_0x48aa00(0x23a)](_0x2345a7,_0x45bf54);}}else{if('ByTma'===_0x48aa00(0x81f))return this[_0x48aa00(0x56d)](Number(_0x1f5f63));else{const _0xa4d648=_0x50bbf0[_0x48aa00(0x1b6)],_0x25e720=_0x242dda[_0x48aa00(0x4e4)],_0x3b26ff=this['_pictureName'][_0x48aa00(0x25f)](/SMOOTH/i);this[_0x48aa00(0x22a)]=new _0x22f0f8(_0xa4d648,_0x25e720);const _0x4ffddb=_0x3d53b4['loadSystem']('IconSet'),_0x49a700=_0x27b229%0x10*_0xa4d648,_0x531dc4=_0x485f4f[_0x48aa00(0x966)](_0x2107e6/0x10)*_0x25e720;this[_0x48aa00(0x22a)][_0x48aa00(0x902)]=_0x3b26ff,this[_0x48aa00(0x22a)][_0x48aa00(0x307)](_0x4ffddb,_0x49a700,_0x531dc4,_0xa4d648,_0x25e720,0x0,0x0,_0xa4d648,_0x25e720);}}},ColorManager[_0x59226c(0x539)]=function(){const _0x51dd61=_0x59226c;this[_0x51dd61(0x64f)]={};},ColorManager['normalColor']=function(){const _0x6b9c68=_0x59226c,_0x47fcec='_stored_normalColor';this[_0x6b9c68(0x64f)]=this[_0x6b9c68(0x64f)]||{};if(this[_0x6b9c68(0x64f)][_0x47fcec])return this[_0x6b9c68(0x64f)][_0x47fcec];const _0x11f752=VisuMZ[_0x6b9c68(0x2d3)]['Settings']['Color'][_0x6b9c68(0x82a)];return this['getColorDataFromPluginParameters'](_0x47fcec,_0x11f752);},ColorManager[_0x59226c(0x1f2)]=function(){const _0x4c517b=_0x59226c,_0x5038fc='_stored_systemColor';this[_0x4c517b(0x64f)]=this[_0x4c517b(0x64f)]||{};if(this[_0x4c517b(0x64f)][_0x5038fc])return this[_0x4c517b(0x64f)][_0x5038fc];const _0x3aebda=VisuMZ['CoreEngine'][_0x4c517b(0x6ad)][_0x4c517b(0x801)][_0x4c517b(0x1af)];return this[_0x4c517b(0x23a)](_0x5038fc,_0x3aebda);},ColorManager[_0x59226c(0x290)]=function(){const _0x2e00ab=_0x59226c,_0x2ace24=_0x2e00ab(0x95a);this[_0x2e00ab(0x64f)]=this[_0x2e00ab(0x64f)]||{};if(this['_colorCache'][_0x2ace24])return this[_0x2e00ab(0x64f)][_0x2ace24];const _0x6404ea=VisuMZ[_0x2e00ab(0x2d3)][_0x2e00ab(0x6ad)][_0x2e00ab(0x801)][_0x2e00ab(0x1d3)];return this[_0x2e00ab(0x23a)](_0x2ace24,_0x6404ea);},ColorManager[_0x59226c(0x7f7)]=function(){const _0x5c7765=_0x59226c,_0x32b698=_0x5c7765(0x8a3);this[_0x5c7765(0x64f)]=this[_0x5c7765(0x64f)]||{};if(this[_0x5c7765(0x64f)][_0x32b698])return this[_0x5c7765(0x64f)][_0x32b698];const _0x17ae3d=VisuMZ['CoreEngine'][_0x5c7765(0x6ad)]['Color']['ColorDeath'];return this[_0x5c7765(0x23a)](_0x32b698,_0x17ae3d);},ColorManager[_0x59226c(0x33a)]=function(){const _0x1a92a1=_0x59226c,_0x3244f4=_0x1a92a1(0x2b5);this[_0x1a92a1(0x64f)]=this[_0x1a92a1(0x64f)]||{};if(this[_0x1a92a1(0x64f)][_0x3244f4])return this[_0x1a92a1(0x64f)][_0x3244f4];const _0xa056b7=VisuMZ[_0x1a92a1(0x2d3)]['Settings'][_0x1a92a1(0x801)]['ColorGaugeBack'];return this[_0x1a92a1(0x23a)](_0x3244f4,_0xa056b7);},ColorManager[_0x59226c(0x87d)]=function(){const _0x378ea1=_0x59226c,_0x1d6bef=_0x378ea1(0x820);this[_0x378ea1(0x64f)]=this[_0x378ea1(0x64f)]||{};if(this['_colorCache'][_0x1d6bef])return this[_0x378ea1(0x64f)][_0x1d6bef];const _0x241123=VisuMZ['CoreEngine']['Settings']['Color'][_0x378ea1(0x4c0)];return this[_0x378ea1(0x23a)](_0x1d6bef,_0x241123);},ColorManager['hpGaugeColor2']=function(){const _0x5b8ed0=_0x59226c,_0x5baae5='_stored_hpGaugeColor2';this['_colorCache']=this[_0x5b8ed0(0x64f)]||{};if(this['_colorCache'][_0x5baae5])return this[_0x5b8ed0(0x64f)][_0x5baae5];const _0x5c480a=VisuMZ['CoreEngine'][_0x5b8ed0(0x6ad)][_0x5b8ed0(0x801)]['ColorHPGauge2'];return this[_0x5b8ed0(0x23a)](_0x5baae5,_0x5c480a);},ColorManager[_0x59226c(0x8bd)]=function(){const _0x5b52e8=_0x59226c,_0x5699d0=_0x5b52e8(0x977);this['_colorCache']=this[_0x5b52e8(0x64f)]||{};if(this[_0x5b52e8(0x64f)][_0x5699d0])return this[_0x5b52e8(0x64f)][_0x5699d0];const _0x4cf453=VisuMZ[_0x5b52e8(0x2d3)][_0x5b52e8(0x6ad)]['Color']['ColorMPGauge1'];return this['getColorDataFromPluginParameters'](_0x5699d0,_0x4cf453);},ColorManager[_0x59226c(0x5b0)]=function(){const _0x24df20=_0x59226c,_0x5e383d='_stored_mpGaugeColor2';this[_0x24df20(0x64f)]=this[_0x24df20(0x64f)]||{};if(this['_colorCache'][_0x5e383d])return this[_0x24df20(0x64f)][_0x5e383d];const _0x4cd465=VisuMZ[_0x24df20(0x2d3)][_0x24df20(0x6ad)][_0x24df20(0x801)]['ColorMPGauge2'];return this[_0x24df20(0x23a)](_0x5e383d,_0x4cd465);},ColorManager['mpCostColor']=function(){const _0x1d2f0e=_0x59226c,_0x562a50='_stored_mpCostColor';this[_0x1d2f0e(0x64f)]=this[_0x1d2f0e(0x64f)]||{};if(this[_0x1d2f0e(0x64f)][_0x562a50])return this[_0x1d2f0e(0x64f)][_0x562a50];const _0x25f592=VisuMZ['CoreEngine'][_0x1d2f0e(0x6ad)][_0x1d2f0e(0x801)][_0x1d2f0e(0x5b9)];return this[_0x1d2f0e(0x23a)](_0x562a50,_0x25f592);},ColorManager[_0x59226c(0x462)]=function(){const _0x3401b9=_0x59226c,_0x14a72e='_stored_powerUpColor';this[_0x3401b9(0x64f)]=this[_0x3401b9(0x64f)]||{};if(this[_0x3401b9(0x64f)][_0x14a72e])return this[_0x3401b9(0x64f)][_0x14a72e];const _0x5a4d1c=VisuMZ[_0x3401b9(0x2d3)]['Settings'][_0x3401b9(0x801)][_0x3401b9(0x87c)];return this['getColorDataFromPluginParameters'](_0x14a72e,_0x5a4d1c);},ColorManager[_0x59226c(0x87e)]=function(){const _0x34c165=_0x59226c,_0x5e8822=_0x34c165(0x4fe);this['_colorCache']=this[_0x34c165(0x64f)]||{};if(this[_0x34c165(0x64f)][_0x5e8822])return this[_0x34c165(0x64f)][_0x5e8822];const _0x171ad2=VisuMZ[_0x34c165(0x2d3)][_0x34c165(0x6ad)][_0x34c165(0x801)][_0x34c165(0x852)];return this['getColorDataFromPluginParameters'](_0x5e8822,_0x171ad2);},ColorManager[_0x59226c(0x2aa)]=function(){const _0x187ee5=_0x59226c,_0x2faea5='_stored_ctGaugeColor1';this[_0x187ee5(0x64f)]=this[_0x187ee5(0x64f)]||{};if(this[_0x187ee5(0x64f)][_0x2faea5])return this[_0x187ee5(0x64f)][_0x2faea5];const _0x31bf5d=VisuMZ['CoreEngine']['Settings'][_0x187ee5(0x801)][_0x187ee5(0x1b3)];return this[_0x187ee5(0x23a)](_0x2faea5,_0x31bf5d);},ColorManager[_0x59226c(0x526)]=function(){const _0x14d5f0=_0x59226c,_0x160744=_0x14d5f0(0x68d);this['_colorCache']=this['_colorCache']||{};if(this[_0x14d5f0(0x64f)][_0x160744])return this['_colorCache'][_0x160744];const _0x26abdb=VisuMZ[_0x14d5f0(0x2d3)][_0x14d5f0(0x6ad)]['Color'][_0x14d5f0(0x240)];return this[_0x14d5f0(0x23a)](_0x160744,_0x26abdb);},ColorManager['tpGaugeColor1']=function(){const _0x273f53=_0x59226c,_0xb968b4=_0x273f53(0x21c);this[_0x273f53(0x64f)]=this['_colorCache']||{};if(this[_0x273f53(0x64f)][_0xb968b4])return this['_colorCache'][_0xb968b4];const _0x4478a6=VisuMZ['CoreEngine'][_0x273f53(0x6ad)][_0x273f53(0x801)][_0x273f53(0x60f)];return this[_0x273f53(0x23a)](_0xb968b4,_0x4478a6);},ColorManager['tpGaugeColor2']=function(){const _0x33164e=_0x59226c,_0x1c364a=_0x33164e(0x20d);this[_0x33164e(0x64f)]=this['_colorCache']||{};if(this['_colorCache'][_0x1c364a])return this[_0x33164e(0x64f)][_0x1c364a];const _0x296943=VisuMZ[_0x33164e(0x2d3)][_0x33164e(0x6ad)]['Color'][_0x33164e(0x211)];return this[_0x33164e(0x23a)](_0x1c364a,_0x296943);},ColorManager['tpCostColor']=function(){const _0x5e9ce0=_0x59226c,_0x20ed0c=_0x5e9ce0(0x54e);this[_0x5e9ce0(0x64f)]=this[_0x5e9ce0(0x64f)]||{};if(this[_0x5e9ce0(0x64f)][_0x20ed0c])return this['_colorCache'][_0x20ed0c];const _0x5d9479=VisuMZ[_0x5e9ce0(0x2d3)][_0x5e9ce0(0x6ad)][_0x5e9ce0(0x801)][_0x5e9ce0(0x49f)];return this['getColorDataFromPluginParameters'](_0x20ed0c,_0x5d9479);},ColorManager[_0x59226c(0x80b)]=function(){const _0x552419=_0x59226c,_0x5759ae=_0x552419(0x48b);this[_0x552419(0x64f)]=this[_0x552419(0x64f)]||{};if(this['_colorCache'][_0x5759ae])return this[_0x552419(0x64f)][_0x5759ae];const _0x492182=VisuMZ['CoreEngine'][_0x552419(0x6ad)][_0x552419(0x801)]['ColorTPCost'];return this[_0x552419(0x23a)](_0x5759ae,_0x492182);},ColorManager[_0x59226c(0x53d)]=function(){const _0x56c50b=_0x59226c,_0x2f0048=_0x56c50b(0x525);this[_0x56c50b(0x64f)]=this[_0x56c50b(0x64f)]||{};if(this[_0x56c50b(0x64f)][_0x2f0048])return this[_0x56c50b(0x64f)][_0x2f0048];const _0x2b94ec=VisuMZ[_0x56c50b(0x2d3)]['Settings']['Color'][_0x56c50b(0x924)];return this[_0x56c50b(0x23a)](_0x2f0048,_0x2b94ec);},ColorManager[_0x59226c(0x37b)]=function(){const _0x4aeac2=_0x59226c,_0x1fc4d4='_stored_expGaugeColor2';this['_colorCache']=this['_colorCache']||{};if(this['_colorCache'][_0x1fc4d4])return this['_colorCache'][_0x1fc4d4];const _0x3c0a36=VisuMZ[_0x4aeac2(0x2d3)][_0x4aeac2(0x6ad)][_0x4aeac2(0x801)][_0x4aeac2(0x310)];return this[_0x4aeac2(0x23a)](_0x1fc4d4,_0x3c0a36);},ColorManager[_0x59226c(0x482)]=function(){const _0x166742=_0x59226c,_0x31a0e9=_0x166742(0x442);this['_colorCache']=this[_0x166742(0x64f)]||{};if(this[_0x166742(0x64f)][_0x31a0e9])return this[_0x166742(0x64f)][_0x31a0e9];const _0x35c2b8=VisuMZ[_0x166742(0x2d3)][_0x166742(0x6ad)][_0x166742(0x801)][_0x166742(0x685)];return this[_0x166742(0x23a)](_0x31a0e9,_0x35c2b8);},ColorManager[_0x59226c(0x964)]=function(){const _0x4ce7a7=_0x59226c,_0x49c959=_0x4ce7a7(0x4b2);this[_0x4ce7a7(0x64f)]=this[_0x4ce7a7(0x64f)]||{};if(this[_0x4ce7a7(0x64f)][_0x49c959])return this[_0x4ce7a7(0x64f)][_0x49c959];const _0x248ea7=VisuMZ[_0x4ce7a7(0x2d3)][_0x4ce7a7(0x6ad)]['Color'][_0x4ce7a7(0x6c9)];return this[_0x4ce7a7(0x23a)](_0x49c959,_0x248ea7);},ColorManager['hpColor']=function(_0x293d32){const _0x1655d2=_0x59226c;return VisuMZ['CoreEngine'][_0x1655d2(0x6ad)]['Color'][_0x1655d2(0x834)][_0x1655d2(0x38e)](this,_0x293d32);},ColorManager[_0x59226c(0x3d3)]=function(_0x130215){const _0x26d37a=_0x59226c;return VisuMZ[_0x26d37a(0x2d3)][_0x26d37a(0x6ad)][_0x26d37a(0x801)][_0x26d37a(0x968)][_0x26d37a(0x38e)](this,_0x130215);},ColorManager[_0x59226c(0x7cc)]=function(_0x38fed8){const _0xad7f31=_0x59226c;return VisuMZ[_0xad7f31(0x2d3)][_0xad7f31(0x6ad)][_0xad7f31(0x801)][_0xad7f31(0x80e)][_0xad7f31(0x38e)](this,_0x38fed8);},ColorManager[_0x59226c(0x3e2)]=function(_0x3bc8ef){const _0x4e54b7=_0x59226c;return VisuMZ['CoreEngine'][_0x4e54b7(0x6ad)][_0x4e54b7(0x801)][_0x4e54b7(0x1a4)][_0x4e54b7(0x38e)](this,_0x3bc8ef);},ColorManager[_0x59226c(0x720)]=function(_0x992d30){const _0x34c501=_0x59226c;return VisuMZ[_0x34c501(0x2d3)][_0x34c501(0x6ad)]['Color'][_0x34c501(0x550)][_0x34c501(0x38e)](this,_0x992d30);},ColorManager[_0x59226c(0x2b3)]=function(){const _0x24027a=_0x59226c;return VisuMZ[_0x24027a(0x2d3)]['Settings'][_0x24027a(0x801)]['OutlineColor'];},ColorManager[_0x59226c(0x6dc)]=function(){const _0x4274fe=_0x59226c;return VisuMZ['CoreEngine'][_0x4274fe(0x6ad)][_0x4274fe(0x801)][_0x4274fe(0x2a6)]||_0x4274fe(0x6f3);},ColorManager[_0x59226c(0x1f5)]=function(){const _0x2b1a33=_0x59226c;return VisuMZ[_0x2b1a33(0x2d3)]['Settings'][_0x2b1a33(0x801)][_0x2b1a33(0x53a)]||_0x2b1a33(0x39b);},ColorManager[_0x59226c(0x6d6)]=function(){const _0x4293fb=_0x59226c;return VisuMZ['CoreEngine'][_0x4293fb(0x6ad)][_0x4293fb(0x801)][_0x4293fb(0x909)];},ColorManager[_0x59226c(0x7f3)]=function(){const _0x549a56=_0x59226c;return VisuMZ[_0x549a56(0x2d3)][_0x549a56(0x6ad)]['Color'][_0x549a56(0x70f)];},ColorManager['itemBackColor1']=function(){const _0x218a20=_0x59226c;return VisuMZ['CoreEngine'][_0x218a20(0x6ad)][_0x218a20(0x801)][_0x218a20(0x7cd)];},ColorManager[_0x59226c(0x489)]=function(){const _0x49d6f7=_0x59226c;return VisuMZ[_0x49d6f7(0x2d3)][_0x49d6f7(0x6ad)][_0x49d6f7(0x801)][_0x49d6f7(0x765)];},SceneManager['_storedStack']=[],SceneManager[_0x59226c(0x578)]=function(){const _0x440f08=_0x59226c;return this[_0x440f08(0x306)]&&this['_scene'][_0x440f08(0x6c8)]===Scene_Battle;},SceneManager[_0x59226c(0x4aa)]=function(){const _0x42f666=_0x59226c;return this['_scene']&&this[_0x42f666(0x306)][_0x42f666(0x6c8)]===Scene_Map;},SceneManager[_0x59226c(0x278)]=function(){const _0x13b4c4=_0x59226c;return this[_0x13b4c4(0x306)]&&this[_0x13b4c4(0x306)]instanceof Scene_Map;},VisuMZ[_0x59226c(0x2d3)][_0x59226c(0x2d4)]=SceneManager[_0x59226c(0x72d)],SceneManager[_0x59226c(0x72d)]=function(){const _0xdeb58d=_0x59226c;VisuMZ['CoreEngine'][_0xdeb58d(0x2d4)][_0xdeb58d(0x38e)](this),this['initVisuMZCoreEngine']();},VisuMZ['CoreEngine'][_0x59226c(0x1c7)]=SceneManager[_0x59226c(0x8b2)],SceneManager[_0x59226c(0x8b2)]=function(_0x54288d){const _0x5f436c=_0x59226c;if($gameTemp)this['onKeyDownKeysF6F7'](_0x54288d);VisuMZ[_0x5f436c(0x2d3)][_0x5f436c(0x1c7)][_0x5f436c(0x38e)](this,_0x54288d);},SceneManager[_0x59226c(0x395)]=function(_0x271913){const _0x2bee66=_0x59226c;if(!_0x271913[_0x2bee66(0x4b6)]&&!_0x271913['altKey']){if(_0x2bee66(0x531)===_0x2bee66(0x531))switch(_0x271913['keyCode']){case 0x54:this[_0x2bee66(0x45e)]();break;case 0x75:this[_0x2bee66(0x523)]();break;case 0x76:if(Input['isPressed'](_0x2bee66(0x7d3))||Input['isPressed']('ctrl'))return;this[_0x2bee66(0x2be)]();break;}else{this[_0x2bee66(0x694)]();const _0x27df50=_0x37c9a4['titleCommandWindow'][_0x2bee66(0x4a0)],_0x45ad2f=this[_0x2bee66(0x1c0)]();this[_0x2bee66(0x81a)]=new _0x5e9a38(_0x45ad2f),this['_commandWindow'][_0x2bee66(0x573)](_0x27df50);const _0x21cb68=this[_0x2bee66(0x1c0)]();this[_0x2bee66(0x81a)][_0x2bee66(0x39d)](_0x21cb68['x'],_0x21cb68['y'],_0x21cb68[_0x2bee66(0x4d6)],_0x21cb68['height']),this[_0x2bee66(0x69e)](this['_commandWindow']);}}},SceneManager[_0x59226c(0x523)]=function(){const _0x2bbb5b=_0x59226c;if($gameTemp[_0x2bbb5b(0x31b)]()&&VisuMZ['CoreEngine']['Settings']['QoL'][_0x2bbb5b(0x648)]){ConfigManager[_0x2bbb5b(0x43d)]!==0x0?(ConfigManager['bgmVolume']=0x0,ConfigManager[_0x2bbb5b(0x437)]=0x0,ConfigManager[_0x2bbb5b(0x1d0)]=0x0,ConfigManager['seVolume']=0x0):(ConfigManager['bgmVolume']=0x64,ConfigManager['bgsVolume']=0x64,ConfigManager[_0x2bbb5b(0x1d0)]=0x64,ConfigManager[_0x2bbb5b(0x43d)]=0x64);ConfigManager[_0x2bbb5b(0x749)]();if(this['_scene'][_0x2bbb5b(0x6c8)]===Scene_Options){if(this['_scene']['_optionsWindow'])this[_0x2bbb5b(0x306)]['_optionsWindow'][_0x2bbb5b(0x6df)]();if(this['_scene'][_0x2bbb5b(0x934)])this['_scene'][_0x2bbb5b(0x934)]['refresh']();}}},SceneManager[_0x59226c(0x2be)]=function(){const _0x4e84d8=_0x59226c;$gameTemp[_0x4e84d8(0x31b)]()&&VisuMZ[_0x4e84d8(0x2d3)][_0x4e84d8(0x6ad)][_0x4e84d8(0x509)][_0x4e84d8(0x73d)]&&($gameTemp[_0x4e84d8(0x812)]=!$gameTemp[_0x4e84d8(0x812)]);},SceneManager['playTestCtrlT']=function(){const _0x44256e=_0x59226c;if(!$gameTemp[_0x44256e(0x31b)]())return;if(!SceneManager[_0x44256e(0x578)]())return;for(const _0x4dc627 of $gameParty[_0x44256e(0x2cf)]()){if(_0x44256e(0x8ed)!==_0x44256e(0x84f)){if(!_0x4dc627)continue;_0x4dc627[_0x44256e(0x492)](_0x4dc627[_0x44256e(0x8b0)]());}else return _0x45b9fc['layoutSettings'][_0x44256e(0x839)][_0x44256e(0x38e)](this);}},SceneManager['initVisuMZCoreEngine']=function(){const _0x26f40f=_0x59226c;this[_0x26f40f(0x386)]=![],this[_0x26f40f(0x1e3)]=!VisuMZ[_0x26f40f(0x2d3)][_0x26f40f(0x6ad)]['UI'][_0x26f40f(0x8e9)];},SceneManager[_0x59226c(0x399)]=function(_0x59d1e6){const _0x2c21cd=_0x59226c;if(VisuMZ[_0x2c21cd(0x2d3)][_0x2c21cd(0x6ad)]['UI'][_0x2c21cd(0x582)]){if(_0x2c21cd(0x4e9)!=='TMrZa')return _0x36a291[_0x2c21cd(0x2d3)][_0x2c21cd(0x6ad)][_0x2c21cd(0x510)][_0x2c21cd(0x587)];else this[_0x2c21cd(0x386)]=_0x59d1e6;}},SceneManager[_0x59226c(0x6e1)]=function(){return this['_sideButtonLayout'];},SceneManager[_0x59226c(0x31c)]=function(){const _0x12080e=_0x59226c;return this[_0x12080e(0x1e3)];},SceneManager[_0x59226c(0x46c)]=function(){const _0x508e23=_0x59226c;return this[_0x508e23(0x31c)]()||this['isSideButtonLayout']();},VisuMZ[_0x59226c(0x2d3)][_0x59226c(0x819)]=SceneManager['isGameActive'],SceneManager[_0x59226c(0x7c0)]=function(){const _0x3a074e=_0x59226c;if(VisuMZ[_0x3a074e(0x2d3)][_0x3a074e(0x6ad)][_0x3a074e(0x509)][_0x3a074e(0x2b4)]){if(_0x3a074e(0x1bf)===_0x3a074e(0x1bf))return VisuMZ[_0x3a074e(0x2d3)][_0x3a074e(0x819)][_0x3a074e(0x38e)](this);else{var _0x120ea0=_0x438ab5-1.5/2.75;return 7.5625*_0x120ea0*_0x120ea0+0.75;}}else return!![];},SceneManager[_0x59226c(0x6be)]=function(_0x2c6ed3){const _0x4d6966=_0x59226c;if(_0x2c6ed3 instanceof Error)_0x4d6966(0x2a9)!==_0x4d6966(0x808)?this[_0x4d6966(0x703)](_0x2c6ed3):_0x1455b8[_0x21a861]=_0x63adbd[_0x4d6966(0x5c0)][_0x2a472d[_0x76b54c]];else _0x2c6ed3 instanceof Array&&_0x2c6ed3[0x0]==='LoadError'?this[_0x4d6966(0x965)](_0x2c6ed3):this[_0x4d6966(0x3a3)](_0x2c6ed3);this['stop']();},VisuMZ[_0x59226c(0x2d3)][_0x59226c(0x59f)]=BattleManager[_0x59226c(0x1c9)],BattleManager['processEscape']=function(){const _0x2825f4=_0x59226c;if(VisuMZ[_0x2825f4(0x2d3)]['Settings']['QoL'][_0x2825f4(0x662)]){if(_0x2825f4(0x1a8)!=='OkzFh')return this['contents'][_0x2825f4(0x7f2)](_0x3a6238);else this[_0x2825f4(0x4b9)]();}else return VisuMZ[_0x2825f4(0x2d3)][_0x2825f4(0x59f)][_0x2825f4(0x38e)](this);},BattleManager[_0x59226c(0x4b9)]=function(){const _0x3059d0=_0x59226c;return $gameParty[_0x3059d0(0x97f)](),SoundManager[_0x3059d0(0x5f6)](),this[_0x3059d0(0x39a)](),!![];},BattleManager[_0x59226c(0x25e)]=function(){const _0x8239f1=_0x59226c;return $gameSystem[_0x8239f1(0x517)]()>=0x1;},BattleManager[_0x59226c(0x4ee)]=function(){const _0x5065ff=_0x59226c;return $gameSystem[_0x5065ff(0x517)]()===0x1;},VisuMZ[_0x59226c(0x2d3)][_0x59226c(0x3c0)]=Game_Temp[_0x59226c(0x7bf)]['initialize'],Game_Temp[_0x59226c(0x7bf)]['initialize']=function(){const _0x3f164d=_0x59226c;VisuMZ[_0x3f164d(0x2d3)]['Game_Temp_initialize'][_0x3f164d(0x38e)](this),this[_0x3f164d(0x1c1)](),this[_0x3f164d(0x8ad)](),this[_0x3f164d(0x2a1)]();},Game_Temp[_0x59226c(0x7bf)][_0x59226c(0x1c1)]=function(){const _0x1b630e=_0x59226c;if(VisuMZ[_0x1b630e(0x2d3)]['Settings']['QoL'][_0x1b630e(0x67d)]){if(_0x1b630e(0x900)===_0x1b630e(0x900))this[_0x1b630e(0x2b0)]=![];else{if(this['_mode']===_0x1b630e(0x75d)){this[_0x1b630e(0x729)][_0x1b630e(0x3b4)](),this[_0x1b630e(0x8f4)][_0x1b630e(0x3b4)](),this['resetTextColor']();let _0x101fa8=_0x17bb5c[_0x1b630e(0x2d3)][_0x1b630e(0x6ad)][_0x1b630e(0x4c8)][_0x1b630e(0x595)][_0x1b630e(0x54d)]('\x0a'),_0x4ff8d4=_0x101fa8[_0x1b630e(0x587)],_0x396fa6=(this['innerHeight']-_0x4ff8d4*this['lineHeight']())/0x2;for(let _0x887284=0x0;_0x887284<_0x4ff8d4;++_0x887284){let _0x2f312b=_0x101fa8[_0x887284],_0x4b680e=this['textSizeEx'](_0x2f312b)['width'],_0x2af862=_0x35b3a3[_0x1b630e(0x966)]((this[_0x1b630e(0x729)][_0x1b630e(0x4d6)]-_0x4b680e)/0x2);this[_0x1b630e(0x51e)](_0x2f312b,_0x2af862,_0x396fa6),_0x396fa6+=this[_0x1b630e(0x543)]();}}else _0xbc6f97[_0x1b630e(0x2d3)][_0x1b630e(0x2dd)][_0x1b630e(0x38e)](this);}}},Game_Temp['prototype'][_0x59226c(0x698)]=function(_0x5e54f2){const _0xbf326b=_0x59226c;this[_0xbf326b(0x58a)]=_0x5e54f2;},Game_Temp['prototype'][_0x59226c(0x1e4)]=function(){return this['_lastPluginCommandInterpreter'];},Game_Temp[_0x59226c(0x7bf)]['clearForcedGameTroopSettingsCoreEngine']=function(){const _0x475880=_0x59226c;this['_forcedTroopView']=undefined,this[_0x475880(0x43c)]=undefined;},Game_Temp['prototype']['applyForcedGameTroopSettingsCoreEngine']=function(_0x281e8d){const _0x4d0442=_0x59226c;$gameMap&&$dataMap&&$dataMap[_0x4d0442(0x246)]&&this[_0x4d0442(0x3bd)]($dataMap[_0x4d0442(0x246)]);const _0xc33e35=$dataTroops[_0x281e8d];if(_0xc33e35){let _0x4ab1ba=DataManager['createTroopNote'](_0xc33e35['id']);this[_0x4d0442(0x3bd)](_0x4ab1ba);}},Game_Temp[_0x59226c(0x7bf)][_0x59226c(0x3bd)]=function(_0x5d56e2){const _0x385033=_0x59226c;if(!_0x5d56e2)return;if(_0x5d56e2['match'](/<(?:FRONTVIEW|FRONT VIEW|FV)>/i))this[_0x385033(0x7aa)]='FV';else{if(_0x5d56e2['match'](/<(?:SIDEVIEW|SIDE VIEW|SV)>/i))this[_0x385033(0x7aa)]='SV';else{if(_0x5d56e2[_0x385033(0x25f)](/<(?:BATTLEVIEW|BATTLE VIEW):[ ](.*)>/i)){if(_0x385033(0x632)!==_0x385033(0x632)){let _0x170d36=_0x51493a;if(_0x170d36[0x0]==='0')return _0x170d36;if(_0x170d36[_0x170d36[_0x385033(0x587)]-0x1]==='.')return _0x251833(_0x170d36)[_0x385033(0x26c)](_0x5582bc,_0x23959d)+'.';else return _0x170d36[_0x170d36['length']-0x1]===','?_0x5bf2c6(_0x170d36)[_0x385033(0x26c)](_0x4a025e,_0x27a917)+',':_0x2579e2(_0x170d36)['toLocaleString'](_0x2eff54,_0xc19d13);}else{const _0x867a67=String(RegExp['$1']);if(_0x867a67[_0x385033(0x25f)](/(?:FRONTVIEW|FRONT VIEW|FV)/i))this['_forcedTroopView']='FV';else _0x867a67[_0x385033(0x25f)](/(?:SIDEVIEW|SIDE VIEW|SV)/i)&&(this['_forcedTroopView']='SV');}}}}if(_0x5d56e2[_0x385033(0x25f)](/<(?:DTB)>/i)){if(_0x385033(0x985)===_0x385033(0x985))this['_forcedBattleSys']=0x0;else{if(_0x415fd6===_0x413517&&_0x3a94d9%0x1===0x0)return _0x370e10;if(_0x5e5d69!==_0x5e18b3&&[_0x385033(0x7c6),'MAXMP',_0x385033(0x982),_0x385033(0x294),'MAT',_0x385033(0x29b),'AGI',_0x385033(0x91e)][_0x385033(0x98d)](_0x294733(_0x2be124)['toUpperCase']()[_0x385033(0x7e8)]()))return _0x2cd52c;_0x285196=_0x414349||0x0;if(_0x811757[_0x385033(0x2d3)][_0x385033(0x7d9)][_0x123dee])return _0x1508ef[_0x385033(0x2d3)][_0x385033(0x3a9)][_0x4101e6]===_0x385033(0x624)?_0x1db34f:_0x4c8511((_0x333124*0x64)['toFixed'](_0xd021bc))+'%';return _0x9d7b86((_0x26405b*0x64)[_0x385033(0x4bc)](_0x2a8bfe))+'%';}}else{if(_0x5d56e2[_0x385033(0x25f)](/<(?:TPB|ATB)[ ]ACTIVE>/i))this[_0x385033(0x43c)]=0x1;else{if(_0x5d56e2[_0x385033(0x25f)](/<(?:TPB|ATB)[ ]WAIT>/i))this[_0x385033(0x43c)]=0x2;else{if(_0x5d56e2[_0x385033(0x25f)](/<(?:CTB)>/i)){if(_0x385033(0x777)!=='NUlKH')return _0xe484e1['getBattleSystem']()===0x1;else{if(Imported[_0x385033(0x89f)]){if(_0x385033(0x371)!==_0x385033(0x203))this[_0x385033(0x43c)]='CTB';else return 0x0;}}}else{if(_0x5d56e2['match'](/<(?:STB)>/i))Imported['VisuMZ_2_BattleSystemSTB']&&(this[_0x385033(0x43c)]=_0x385033(0x64e));else{if(_0x5d56e2['match'](/<(?:BTB)>/i)){if(_0x385033(0x805)!=='OHNxO'){if(Imported[_0x385033(0x570)]){if(_0x385033(0x8d2)===_0x385033(0x8d2))this['_forcedBattleSys']=_0x385033(0x816);else return _0xdc9e90[_0x385033(0x6dc)]();}}else _0x325fde[_0x385033(0x2d3)][_0x385033(0x5fd)][_0x385033(0x38e)](this),this[_0x385033(0x746)](),this[_0x385033(0x3f1)](),this[_0x385033(0x44c)]();}else{if(_0x5d56e2[_0x385033(0x25f)](/<(?:FTB)>/i))Imported[_0x385033(0x3cb)]&&(this[_0x385033(0x43c)]=_0x385033(0x4a4));else{if(_0x5d56e2[_0x385033(0x25f)](/<(?:OTB)>/i)){if(_0x385033(0x315)===_0x385033(0x364))return _0x1746be['CoreEngine'][_0x385033(0x819)][_0x385033(0x38e)](this);else Imported[_0x385033(0x610)]&&(_0x385033(0x5db)!==_0x385033(0x854)?this[_0x385033(0x43c)]=_0x385033(0x858):this[_0x385033(0x703)](_0xc14c30));}else{if(_0x5d56e2[_0x385033(0x25f)](/<(?:ETB)>/i))Imported[_0x385033(0x6b3)]&&(this[_0x385033(0x43c)]=_0x385033(0x79e));else{if(_0x5d56e2[_0x385033(0x25f)](/<(?:PTB)>/i))Imported[_0x385033(0x851)]&&(this[_0x385033(0x43c)]='PTB');else{if(_0x5d56e2[_0x385033(0x25f)](/<(?:BATTLEVIEW|BATTLE VIEW):[ ](.*)>/i)){if(_0x385033(0x348)!=='XpWTW')return'';else{const _0x5cd797=String(RegExp['$1']);if(_0x5cd797[_0x385033(0x25f)](/DTB/i))_0x385033(0x983)===_0x385033(0x983)?this[_0x385033(0x43c)]=0x0:this[_0x385033(0x4d9)]();else{if(_0x5cd797[_0x385033(0x25f)](/(?:TPB|ATB)[ ]ACTIVE/i))this['_forcedBattleSys']=0x1;else{if(_0x5cd797[_0x385033(0x25f)](/(?:TPB|ATB)[ ]WAIT/i))this[_0x385033(0x43c)]=0x2;else{if(_0x5cd797['match'](/CTB/i)){if(_0x385033(0x7ae)!==_0x385033(0x7ae)){var _0x30414d=_0xcc7236(_0x4d9a14['$1']);_0x2352e7*=_0x30414d;}else{if(Imported[_0x385033(0x89f)]){if(_0x385033(0x726)===_0x385033(0x726))this[_0x385033(0x43c)]=_0x385033(0x239);else{const _0x932806=_0x3cec82[_0x385033(0x38e)](this);return _0xe914db==='integer'?_0x4fad04['round'](_0x932806):_0x932806;}}}}else{if(_0x5cd797[_0x385033(0x25f)](/STB/i)){if(_0x385033(0x1bc)===_0x385033(0x69a)){if(_0x5498fc[_0x385033(0x31b)]())_0xa64da0[_0x385033(0x735)](_0x52bf7e);}else Imported[_0x385033(0x6f9)]&&(this[_0x385033(0x43c)]='STB');}else{if(_0x5cd797['match'](/BTB/i))Imported[_0x385033(0x570)]&&(this['_forcedBattleSys']=_0x385033(0x816));else{if(_0x5cd797[_0x385033(0x25f)](/FTB/i))_0x385033(0x208)!=='STSca'?Imported[_0x385033(0x3cb)]&&(this[_0x385033(0x43c)]=_0x385033(0x4a4)):(_0x24b26c[_0x385033(0x2d3)][_0x385033(0x3c9)][_0x385033(0x38e)](this),this[_0x385033(0x86a)]());else{if(_0x5cd797[_0x385033(0x25f)](/OTB/i)){if(_0x385033(0x1e2)===_0x385033(0x1e2))Imported[_0x385033(0x610)]&&(this[_0x385033(0x43c)]=_0x385033(0x858));else{if(this[_0x385033(0x36c)]===_0x5e634b)this[_0x385033(0x78b)]();return this['_hideTileShadows'];}}else{if(_0x5cd797[_0x385033(0x25f)](/ETB/i))Imported[_0x385033(0x6b3)]&&(this[_0x385033(0x43c)]=_0x385033(0x79e));else _0x5cd797[_0x385033(0x25f)](/PTB/i)&&(Imported['VisuMZ_2_BattleSystemPTB']&&(_0x385033(0x5c7)!==_0x385033(0x33b)?this[_0x385033(0x43c)]=_0x385033(0x413):(this[_0x385033(0x857)]&&this[_0x385033(0x857)][_0x385033(0x573)](_0x5e35d3[_0x385033(0x957)][_0x385033(0x27e)]),this['_inputWindow']&&this[_0x385033(0x716)]['setBackgroundType'](_0x356de7[_0x385033(0x957)][_0x385033(0x77b)]))));}}}}}}}}}}}}}}}}}}}}},Game_Temp['prototype'][_0x59226c(0x8ad)]=function(){const _0x2457b3=_0x59226c;this[_0x2457b3(0x4af)]=[];},Game_Temp['prototype'][_0x59226c(0x2e3)]=function(_0x19aac,_0x242c8d,_0x221f24,_0x4c970a){const _0x1147b8=_0x59226c;if(!this[_0x1147b8(0x3ce)]())return;_0x221f24=_0x221f24||![],_0x4c970a=_0x4c970a||![];if($dataAnimations[_0x242c8d]){if(_0x1147b8(0x803)===_0x1147b8(0x803)){const _0x1a1c7e={'targets':_0x19aac,'animationId':_0x242c8d,'mirror':_0x221f24,'mute':_0x4c970a};this['_fauxAnimationQueue'][_0x1147b8(0x564)](_0x1a1c7e);for(const _0x2e6163 of _0x19aac){_0x2e6163[_0x1147b8(0x59e)]&&_0x2e6163[_0x1147b8(0x59e)]();}}else return'button';}},Game_Temp[_0x59226c(0x7bf)]['showFauxAnimations']=function(){return!![];},Game_Temp[_0x59226c(0x7bf)][_0x59226c(0x35f)]=function(){const _0x138a7d=_0x59226c;return this[_0x138a7d(0x4af)][_0x138a7d(0x7d3)]();},Game_Temp[_0x59226c(0x7bf)][_0x59226c(0x2a1)]=function(){const _0x4a4236=_0x59226c;this[_0x4a4236(0x214)]=[];},Game_Temp[_0x59226c(0x7bf)][_0x59226c(0x937)]=function(_0x67f8f8,_0x8f50b0,_0x417fff,_0x1fd363,_0xf5c20){const _0x5ed4f4=_0x59226c;if(!this[_0x5ed4f4(0x95b)]())return;_0x1fd363=_0x1fd363||![],_0xf5c20=_0xf5c20||![];if($dataAnimations[_0x417fff]){const _0x512208={'x':_0x67f8f8,'y':_0x8f50b0,'animationId':_0x417fff,'mirror':_0x1fd363,'mute':_0xf5c20};this['_pointAnimationQueue'][_0x5ed4f4(0x564)](_0x512208);}},Game_Temp[_0x59226c(0x7bf)][_0x59226c(0x95b)]=function(){return!![];},Game_Temp['prototype']['retrievePointAnimation']=function(){const _0x35ebbb=_0x59226c;return this[_0x35ebbb(0x214)][_0x35ebbb(0x7d3)]();},VisuMZ[_0x59226c(0x2d3)]['Game_System_initialize']=Game_System[_0x59226c(0x7bf)][_0x59226c(0x72d)],Game_System[_0x59226c(0x7bf)][_0x59226c(0x72d)]=function(){const _0x3d5a83=_0x59226c;VisuMZ['CoreEngine'][_0x3d5a83(0x254)][_0x3d5a83(0x38e)](this),this[_0x3d5a83(0x417)]();},Game_System['prototype']['initCoreEngine']=function(){const _0x546671=_0x59226c;this[_0x546671(0x24f)]={'SideView':$dataSystem[_0x546671(0x973)],'BattleSystem':this[_0x546671(0x1d4)](),'FontSize':$dataSystem[_0x546671(0x548)][_0x546671(0x391)],'Padding':0xc};},Game_System[_0x59226c(0x7bf)][_0x59226c(0x6c1)]=function(){const _0x52b3e2=_0x59226c;if($gameTemp[_0x52b3e2(0x7aa)]==='SV')return!![];else{if($gameTemp[_0x52b3e2(0x7aa)]==='FV'){if('kzhdS'!==_0x52b3e2(0x734))return![];else{if(!_0x301aa1[_0x52b3e2(0x31b)]())return;if(!_0x22df72[_0x52b3e2(0x2d5)]())return;if(!_0x6339da)return;if(_0x2a65e9['mapId']()<=0x0)return;_0x1ec25b[_0x52b3e2(0x5cf)](_0x220fa0,_0x2db81c);const _0xe3093a='Map%1'[_0x52b3e2(0x538)](_0x22d266['mapId']()[_0x52b3e2(0x4f5)](0x3)),_0x1faaff=_0x34c609[_0x52b3e2(0x2d3)][_0x52b3e2(0x72f)](_0x268a64[_0x52b3e2(0x51a)]());_0x1a3587['CoreEngine'][_0x52b3e2(0x7ed)](_0x1faaff,_0xe3093a,!![]);}}}if(this[_0x52b3e2(0x24f)]===undefined)this[_0x52b3e2(0x417)]();if(this[_0x52b3e2(0x24f)][_0x52b3e2(0x430)]===undefined)this[_0x52b3e2(0x417)]();return this[_0x52b3e2(0x24f)][_0x52b3e2(0x430)];},Game_System[_0x59226c(0x7bf)][_0x59226c(0x898)]=function(_0x79ba74){const _0x1185f6=_0x59226c;if(this[_0x1185f6(0x24f)]===undefined)this[_0x1185f6(0x417)]();if(this['_CoreEngineSettings']['SideView']===undefined)this['initCoreEngine']();this['_CoreEngineSettings']['SideView']=_0x79ba74;},Game_System[_0x59226c(0x7bf)][_0x59226c(0x3db)]=function(){const _0x34b31e=_0x59226c;if(this[_0x34b31e(0x24f)]===undefined)this['initCoreEngine']();this[_0x34b31e(0x24f)][_0x34b31e(0x62a)]=this[_0x34b31e(0x1d4)]();},Game_System[_0x59226c(0x7bf)][_0x59226c(0x1d4)]=function(){const _0x3281a5=_0x59226c,_0x2351ee=(VisuMZ[_0x3281a5(0x2d3)][_0x3281a5(0x6ad)][_0x3281a5(0x62a)]||_0x3281a5(0x284))['toUpperCase']()['trim']();return VisuMZ[_0x3281a5(0x2d3)]['CreateBattleSystemID'](_0x2351ee);},Game_System[_0x59226c(0x7bf)][_0x59226c(0x517)]=function(){const _0x46ea85=_0x59226c;if($gameTemp['_forcedBattleSys']!==undefined){if(_0x46ea85(0x85c)===_0x46ea85(0x85c))return $gameTemp[_0x46ea85(0x43c)];else{_0x23fafa-=_0x54cb2b;if(_0x3e4108<=0x0)_0x4ad216=0x0;this[_0x46ea85(0x54f)](_0x4ce525);}}if(this['_CoreEngineSettings']===undefined)this[_0x46ea85(0x417)]();if(this[_0x46ea85(0x24f)][_0x46ea85(0x62a)]===undefined)this[_0x46ea85(0x3db)]();return this['_CoreEngineSettings']['BattleSystem'];},Game_System[_0x59226c(0x7bf)][_0x59226c(0x912)]=function(_0x20a815){const _0x740cf8=_0x59226c;if(this[_0x740cf8(0x24f)]===undefined)this['initCoreEngine']();if(this['_CoreEngineSettings'][_0x740cf8(0x62a)]===undefined)this[_0x740cf8(0x3db)]();this[_0x740cf8(0x24f)][_0x740cf8(0x62a)]=_0x20a815;},Game_System[_0x59226c(0x7bf)][_0x59226c(0x3a4)]=function(){const _0x29014f=_0x59226c;if(this['_CoreEngineSettings']===undefined)this['initCoreEngine']();if(this['_CoreEngineSettings']['FontSize']===undefined)this[_0x29014f(0x417)]();return this[_0x29014f(0x24f)]['FontSize'];},Game_System[_0x59226c(0x7bf)][_0x59226c(0x448)]=function(_0x40a060){const _0x27e63c=_0x59226c;if(this[_0x27e63c(0x24f)]===undefined)this[_0x27e63c(0x417)]();if(this[_0x27e63c(0x24f)]['TimeProgress']===undefined)this[_0x27e63c(0x417)]();this[_0x27e63c(0x24f)][_0x27e63c(0x75e)]=_0x40a060;},Game_System['prototype'][_0x59226c(0x230)]=function(){const _0x48530b=_0x59226c;if(this[_0x48530b(0x24f)]===undefined)this[_0x48530b(0x417)]();if(this['_CoreEngineSettings'][_0x48530b(0x77c)]===undefined)this[_0x48530b(0x417)]();return this['_CoreEngineSettings']['Padding'];},Game_System[_0x59226c(0x7bf)][_0x59226c(0x449)]=function(_0x1100ff){const _0x410a62=_0x59226c;if(this[_0x410a62(0x24f)]===undefined)this['initCoreEngine']();if(this[_0x410a62(0x24f)][_0x410a62(0x37e)]===undefined)this['initCoreEngine']();this[_0x410a62(0x24f)][_0x410a62(0x77c)]=_0x1100ff;},VisuMZ[_0x59226c(0x2d3)][_0x59226c(0x2d9)]=Game_Screen['prototype'][_0x59226c(0x72d)],Game_Screen['prototype'][_0x59226c(0x72d)]=function(){const _0x1d786b=_0x59226c;VisuMZ['CoreEngine'][_0x1d786b(0x2d9)][_0x1d786b(0x38e)](this),this[_0x1d786b(0x8ee)]();},Game_Screen['prototype'][_0x59226c(0x8ee)]=function(){const _0x4d2c69=_0x59226c,_0x7d34ba=VisuMZ[_0x4d2c69(0x2d3)][_0x4d2c69(0x6ad)]['ScreenShake'];this[_0x4d2c69(0x74d)]=_0x7d34ba?.['DefaultStyle']||_0x4d2c69(0x8f1);},Game_Screen[_0x59226c(0x7bf)]['getCoreEngineScreenShakeStyle']=function(){if(this['_coreEngineShakeStyle']===undefined)this['initCoreEngineScreenShake']();return this['_coreEngineShakeStyle'];},Game_Screen[_0x59226c(0x7bf)][_0x59226c(0x817)]=function(_0x571ec7){const _0x17ee2a=_0x59226c;if(this[_0x17ee2a(0x74d)]===undefined)this[_0x17ee2a(0x8ee)]();this['_coreEngineShakeStyle']=_0x571ec7['toLowerCase']()['trim']();},Game_Picture['prototype'][_0x59226c(0x91f)]=function(){const _0x34656f=_0x59226c;if($gameParty[_0x34656f(0x2f1)]())return![];return this[_0x34656f(0x3b0)]()&&this['name']()[_0x34656f(0x687)](0x0)==='!';},VisuMZ[_0x59226c(0x2d3)][_0x59226c(0x90c)]=Game_Picture['prototype']['x'],Game_Picture[_0x59226c(0x7bf)]['x']=function(){const _0x58e202=_0x59226c;return this[_0x58e202(0x91f)]()?this[_0x58e202(0x298)]():_0x58e202(0x383)!==_0x58e202(0x383)?_0x1a58ff['CoreEngine'][_0x58e202(0x98a)]['call'](this)||this[_0x58e202(0x380)]():VisuMZ['CoreEngine'][_0x58e202(0x90c)][_0x58e202(0x38e)](this);},Game_Picture[_0x59226c(0x7bf)][_0x59226c(0x298)]=function(){const _0x1227d1=_0x59226c,_0x4a1f19=$gameMap[_0x1227d1(0x702)]()*$gameMap[_0x1227d1(0x65e)]();return this['_x']-_0x4a1f19;},VisuMZ[_0x59226c(0x2d3)]['Game_Picture_y']=Game_Picture[_0x59226c(0x7bf)]['y'],Game_Picture['prototype']['y']=function(){const _0xacf225=_0x59226c;return this['isMapScrollLinked']()?this['yScrollLinkedOffset']():VisuMZ[_0xacf225(0x2d3)][_0xacf225(0x5bd)][_0xacf225(0x38e)](this);},Game_Picture['prototype']['yScrollLinkedOffset']=function(){const _0x12260c=_0x59226c,_0x48c95b=$gameMap[_0x12260c(0x927)]()*$gameMap[_0x12260c(0x8ab)]();return this['_y']-_0x48c95b;},Game_Picture[_0x59226c(0x7bf)][_0x59226c(0x63e)]=function(_0x5196ee){const _0x4a899d=_0x59226c;this[_0x4a899d(0x41e)]=_0x5196ee;},VisuMZ[_0x59226c(0x2d3)][_0x59226c(0x50b)]=Game_Picture['prototype']['calcEasing'],Game_Picture[_0x59226c(0x7bf)][_0x59226c(0x838)]=function(_0x1e1a4e){const _0x501ebc=_0x59226c;this['_coreEasingType']=this[_0x501ebc(0x41e)]||0x0;if([0x0,0x1,0x2,0x3][_0x501ebc(0x98d)](this[_0x501ebc(0x41e)])){if('fzYMl'!==_0x501ebc(0x2fe))this[_0x501ebc(0x43c)]='CTB';else return VisuMZ[_0x501ebc(0x2d3)]['Game_Picture_calcEasing'][_0x501ebc(0x38e)](this,_0x1e1a4e);}else{if(_0x501ebc(0x67e)!==_0x501ebc(0x6cb))return VisuMZ[_0x501ebc(0x748)](_0x1e1a4e,this[_0x501ebc(0x41e)]);else this['_clickHandler']();}},VisuMZ[_0x59226c(0x2d3)][_0x59226c(0x593)]=Game_Action['prototype'][_0x59226c(0x95f)],Game_Action[_0x59226c(0x7bf)][_0x59226c(0x95f)]=function(_0x27a126){const _0x41acc9=_0x59226c;return VisuMZ['CoreEngine'][_0x41acc9(0x6ad)][_0x41acc9(0x509)][_0x41acc9(0x718)]?this[_0x41acc9(0x5af)](_0x27a126):VisuMZ[_0x41acc9(0x2d3)]['Game_Action_itemHit'][_0x41acc9(0x38e)](this,_0x27a126);},Game_Action[_0x59226c(0x7bf)][_0x59226c(0x5af)]=function(_0x2056b){const _0xa7ff7f=_0x59226c,_0x563448=this[_0xa7ff7f(0x7b2)](_0x2056b),_0x4430e1=this[_0xa7ff7f(0x8e3)](_0x2056b),_0x261e67=this[_0xa7ff7f(0x92b)](_0x2056b);return _0x563448*(_0x4430e1-_0x261e67);},VisuMZ[_0x59226c(0x2d3)][_0x59226c(0x280)]=Game_Action[_0x59226c(0x7bf)][_0x59226c(0x641)],Game_Action[_0x59226c(0x7bf)]['itemEva']=function(_0x4cfbb0){const _0x2e4197=_0x59226c;return VisuMZ[_0x2e4197(0x2d3)][_0x2e4197(0x6ad)][_0x2e4197(0x509)]['ImprovedAccuracySystem']?0x0:_0x2e4197(0x289)!==_0x2e4197(0x7fc)?VisuMZ[_0x2e4197(0x2d3)][_0x2e4197(0x280)][_0x2e4197(0x38e)](this,_0x4cfbb0):_0x32a78f[_0x2e4197(0x2d3)][_0x2e4197(0x6ad)]['QoL'][_0x2e4197(0x2b4)]?_0x161bc7[_0x2e4197(0x2d3)][_0x2e4197(0x819)][_0x2e4197(0x38e)](this):!![];},Game_Action['prototype']['itemSuccessRate']=function(_0x22c83a){const _0x5c6760=_0x59226c;return this['item']()[_0x5c6760(0x7d1)]*0.01;},Game_Action[_0x59226c(0x7bf)][_0x59226c(0x8e3)]=function(_0x18ea0e){const _0xfff8b4=_0x59226c;if(VisuMZ[_0xfff8b4(0x2d3)][_0xfff8b4(0x6ad)][_0xfff8b4(0x509)][_0xfff8b4(0x739)]&&this[_0xfff8b4(0x55c)]())return 0x1;return this[_0xfff8b4(0x23c)]()?VisuMZ['CoreEngine']['Settings']['QoL'][_0xfff8b4(0x739)]&&this['subject']()[_0xfff8b4(0x6cd)]()?this[_0xfff8b4(0x7ab)]()[_0xfff8b4(0x434)]+0.05:this[_0xfff8b4(0x7ab)]()['hit']:_0xfff8b4(0x272)!==_0xfff8b4(0x272)?(_0x3bdc8d=_0x1a7f7e(_0x42949e),_0x2fdd8c[_0xfff8b4(0x25f)](/#(.*)/i)?_0xfff8b4(0x8f3)[_0xfff8b4(0x538)](_0x25ba2b(_0x56de11['$1'])):this[_0xfff8b4(0x56d)](_0x251a46(_0x43e58a))):0x1;},Game_Action[_0x59226c(0x7bf)][_0x59226c(0x92b)]=function(_0x402da3){const _0x614822=_0x59226c;if(this['subject']()[_0x614822(0x6cd)]()===_0x402da3[_0x614822(0x6cd)]())return 0x0;if(this[_0x614822(0x23c)]()){if(VisuMZ[_0x614822(0x2d3)][_0x614822(0x6ad)][_0x614822(0x509)][_0x614822(0x739)]&&_0x402da3[_0x614822(0x719)]())return'jfkoj'===_0x614822(0x76f)?0x0:_0x402da3['eva']-0.05;else{if(_0x614822(0x1bd)!=='CjMBR'){if(_0x4096dd[_0x614822(0x256)]()&&this['isTouchedInsideFrame']())this[_0x614822(0x245)](_0x614822(0x421));else _0x393b9c[_0x614822(0x6bb)]()&&this[_0x614822(0x245)](_0x614822(0x421));}else return _0x402da3['eva'];}}else{if(this[_0x614822(0x712)]())return _0x402da3['mev'];else{if(_0x614822(0x3f3)!==_0x614822(0x3f3)){const _0x57c42e=_0x446947['skillId'];if(_0x57c42e===0x1&&this[_0x614822(0x7ab)]()[_0x614822(0x52e)]()!==0x1)this['setAttack']();else _0x57c42e===0x2&&this[_0x614822(0x7ab)]()[_0x614822(0x29c)]()!==0x2?this[_0x614822(0x8b4)]():this[_0x614822(0x419)](_0x57c42e);}else return 0x0;}}},VisuMZ[_0x59226c(0x2d3)][_0x59226c(0x223)]=Game_Action[_0x59226c(0x7bf)][_0x59226c(0x58f)],Game_Action[_0x59226c(0x7bf)][_0x59226c(0x58f)]=function(_0x2af20b){const _0x9c8e7=_0x59226c;VisuMZ[_0x9c8e7(0x2d3)][_0x9c8e7(0x223)][_0x9c8e7(0x38e)](this,_0x2af20b);if(VisuMZ[_0x9c8e7(0x2d3)][_0x9c8e7(0x6ad)][_0x9c8e7(0x509)]['ImprovedAccuracySystem'])return;const _0x10bb29=_0x2af20b[_0x9c8e7(0x511)]();if(_0x10bb29[_0x9c8e7(0x6d7)]){if(0x1-this[_0x9c8e7(0x641)](_0x2af20b)>this[_0x9c8e7(0x95f)](_0x2af20b)){if('MoTQj'!==_0x9c8e7(0x1db))_0x10bb29[_0x9c8e7(0x6d7)]=![],_0x10bb29[_0x9c8e7(0x981)]=!![];else return _0x3df254[_0x9c8e7(0x715)](_0x26b1bd['CoreEngine']['Bitmap_measureTextWidth']['call'](this,_0x96bfab));}}},VisuMZ['CoreEngine']['Game_BattlerBase_initMembers']=Game_BattlerBase[_0x59226c(0x7bf)][_0x59226c(0x3eb)],Game_BattlerBase[_0x59226c(0x7bf)]['initMembers']=function(){const _0xb348a4=_0x59226c;this[_0xb348a4(0x49a)]={},VisuMZ[_0xb348a4(0x2d3)][_0xb348a4(0x467)][_0xb348a4(0x38e)](this);},VisuMZ['CoreEngine'][_0x59226c(0x7bc)]=Game_BattlerBase[_0x59226c(0x7bf)]['refresh'],Game_BattlerBase[_0x59226c(0x7bf)][_0x59226c(0x6df)]=function(){const _0x360382=_0x59226c;this[_0x360382(0x49a)]={},VisuMZ['CoreEngine'][_0x360382(0x7bc)][_0x360382(0x38e)](this);},Game_BattlerBase[_0x59226c(0x7bf)]['checkCacheKey']=function(_0x4a7c9c){const _0x95ec0=_0x59226c;return this[_0x95ec0(0x49a)]=this[_0x95ec0(0x49a)]||{},this['_cache'][_0x4a7c9c]!==undefined;},Game_BattlerBase['prototype']['paramPlus']=function(_0x39c0c0){const _0x5498c4=_0x59226c,_0x284a39=(_0x1b93a0,_0x212e7f)=>{const _0x517ae9=_0x232c;if(_0x517ae9(0x68b)===_0x517ae9(0x66d))!this[_0x517ae9(0x287)]&&(this['_screenY']+=_0x28fca3[_0x517ae9(0x93a)]((_0x3d57f8[_0x517ae9(0x235)]-0x270)/0x2),this['_screenY']-=_0x37967e[_0x517ae9(0x966)]((_0x267a86[_0x517ae9(0x235)]-_0x54c95a['boxHeight'])/0x2),_0x10b431[_0x517ae9(0x6c1)]()?this[_0x517ae9(0x479)]-=_0x5d2753[_0x517ae9(0x966)]((_0x5ac28f['width']-_0x5cd420[_0x517ae9(0x8bc)])/0x2):this[_0x517ae9(0x479)]+=_0x291a4b[_0x517ae9(0x93a)]((_0x224ad1[_0x517ae9(0x8bc)]-0x330)/0x2)),this[_0x517ae9(0x287)]=!![];else{if(!_0x212e7f)return _0x1b93a0;if(_0x212e7f['note'][_0x517ae9(0x25f)](VisuMZ['CoreEngine'][_0x517ae9(0x6ca)][_0x517ae9(0x282)][_0x39c0c0])){var _0x512cc8=Number(RegExp['$1']);_0x1b93a0+=_0x512cc8;}if(_0x212e7f[_0x517ae9(0x246)][_0x517ae9(0x25f)](VisuMZ[_0x517ae9(0x2d3)]['RegExp'][_0x517ae9(0x8e4)][_0x39c0c0])){if(_0x517ae9(0x3e9)===_0x517ae9(0x3e9)){var _0x1f3137=String(RegExp['$1']);try{_0x1b93a0+=eval(_0x1f3137);}catch(_0x54b0ef){if(_0x517ae9(0x752)===_0x517ae9(0x225))this[_0x517ae9(0x857)][_0x517ae9(0x573)](_0x467bf2[_0x517ae9(0x957)][_0x517ae9(0x27e)]);else{if($gameTemp[_0x517ae9(0x31b)]())console[_0x517ae9(0x735)](_0x54b0ef);}}}else this[_0x517ae9(0x584)]=0x0;}return _0x1b93a0;}};return this['traitObjects']()['reduce'](_0x284a39,this[_0x5498c4(0x692)][_0x39c0c0]);},Game_BattlerBase['prototype'][_0x59226c(0x5e3)]=function(_0x1c389a){const _0x34b5bb=_0x59226c;var _0x5279bd=_0x34b5bb(0x795)+(this[_0x34b5bb(0x6cd)]()?_0x34b5bb(0x95c):_0x34b5bb(0x53b))+_0x34b5bb(0x8c4)+_0x1c389a;if(this[_0x34b5bb(0x4d0)](_0x5279bd))return this[_0x34b5bb(0x49a)][_0x5279bd];this[_0x34b5bb(0x49a)][_0x5279bd]=eval(VisuMZ[_0x34b5bb(0x2d3)][_0x34b5bb(0x6ad)][_0x34b5bb(0x959)][_0x5279bd]);const _0xce51ed=(_0x196c0c,_0x1c073b)=>{const _0x1c86fb=_0x34b5bb;if(!_0x1c073b)return _0x196c0c;if(_0x1c073b[_0x1c86fb(0x246)][_0x1c86fb(0x25f)](VisuMZ['CoreEngine'][_0x1c86fb(0x6ca)][_0x1c86fb(0x5e3)][_0x1c389a])){if(_0x1c86fb(0x781)===_0x1c86fb(0x889))_0x21a67d=_0x2d533f[_0x1c86fb(0x93a)](_0x2c8cfe),_0x1045bf=_0x213f88[_0x1c86fb(0x93a)](_0x2fb618),_0x3fe9e8[_0x1c86fb(0x2d3)][_0x1c86fb(0x215)][_0x1c86fb(0x38e)](this,_0x46d673,_0xe73ff,_0x446b06);else{var _0x2cd0cb=Number(RegExp['$1']);if(_0x2cd0cb===0x0)_0x2cd0cb=Number[_0x1c86fb(0x2f7)];_0x196c0c=Math[_0x1c86fb(0x228)](_0x196c0c,_0x2cd0cb);}}if(_0x1c073b[_0x1c86fb(0x246)][_0x1c86fb(0x25f)](VisuMZ[_0x1c86fb(0x2d3)]['RegExp']['paramMaxJS'][_0x1c389a])){var _0x35fdfd=String(RegExp['$1']);try{_0x196c0c=Math['max'](_0x196c0c,Number(eval(_0x35fdfd)));}catch(_0x2a4dd8){if($gameTemp['isPlaytest']())console[_0x1c86fb(0x735)](_0x2a4dd8);}}return _0x196c0c;};if(this[_0x34b5bb(0x49a)][_0x5279bd]===0x0)this['_cache'][_0x5279bd]=Number['MAX_SAFE_INTEGER'];return this[_0x34b5bb(0x49a)][_0x5279bd]=this[_0x34b5bb(0x8c2)]()['reduce'](_0xce51ed,this[_0x34b5bb(0x49a)][_0x5279bd]),this[_0x34b5bb(0x49a)][_0x5279bd];},Game_BattlerBase[_0x59226c(0x7bf)]['paramRate']=function(_0x7da068){const _0x359d56=_0x59226c,_0x3b70a5=this[_0x359d56(0x7db)](Game_BattlerBase[_0x359d56(0x653)],_0x7da068),_0x5d6574=(_0xad8207,_0x37a0cd)=>{const _0x45153b=_0x359d56;if(!_0x37a0cd)return _0xad8207;if(_0x37a0cd[_0x45153b(0x246)][_0x45153b(0x25f)](VisuMZ[_0x45153b(0x2d3)][_0x45153b(0x6ca)]['paramRate1'][_0x7da068])){var _0x4e76e5=Number(RegExp['$1'])/0x64;_0xad8207*=_0x4e76e5;}if(_0x37a0cd[_0x45153b(0x246)]['match'](VisuMZ[_0x45153b(0x2d3)][_0x45153b(0x6ca)][_0x45153b(0x3aa)][_0x7da068])){var _0x4e76e5=Number(RegExp['$1']);_0xad8207*=_0x4e76e5;}if(_0x37a0cd[_0x45153b(0x246)][_0x45153b(0x25f)](VisuMZ[_0x45153b(0x2d3)]['RegExp']['paramRateJS'][_0x7da068])){if(_0x45153b(0x901)!==_0x45153b(0x706)){var _0x528cc4=String(RegExp['$1']);try{_0x45153b(0x3fc)!==_0x45153b(0x3a7)?_0xad8207*=eval(_0x528cc4):_0x2f4bc4[_0x45153b(0x2d3)][_0x45153b(0x67a)]['call'](this);}catch(_0x1c10af){if($gameTemp[_0x45153b(0x31b)]())console[_0x45153b(0x735)](_0x1c10af);}}else{const _0x446521=_0x45153b(0x76e);this[_0x45153b(0x336)][_0x45153b(0x60c)](_0x4f2fa1)['remove']('')[_0x45153b(0x60c)](null);const _0x2a9b9e=this[_0x45153b(0x336)][_0x45153b(0x6fd)](_0x45153b(0x2de))['trim']();_0x17398d['CoreEngine'][_0x45153b(0x7ed)](_0x2a9b9e,_0x446521,!![]),_0x30d478[_0x45153b(0x306)][_0x45153b(0x304)]=!![];}}return _0xad8207;};return this[_0x359d56(0x8c2)]()[_0x359d56(0x779)](_0x5d6574,_0x3b70a5);},Game_BattlerBase[_0x59226c(0x7bf)][_0x59226c(0x415)]=function(_0x59482a){const _0x41f82f=_0x59226c,_0x4c92eb=(_0x46c9a2,_0x873a1a)=>{const _0x4e0a59=_0x232c;if(!_0x873a1a)return _0x46c9a2;if(_0x873a1a[_0x4e0a59(0x246)]['match'](VisuMZ[_0x4e0a59(0x2d3)][_0x4e0a59(0x6ca)][_0x4e0a59(0x5f0)][_0x59482a])){var _0x59cc7e=Number(RegExp['$1']);_0x46c9a2+=_0x59cc7e;}if(_0x873a1a['note'][_0x4e0a59(0x25f)](VisuMZ[_0x4e0a59(0x2d3)]['RegExp'][_0x4e0a59(0x5b1)][_0x59482a])){var _0x56f7fa=String(RegExp['$1']);try{_0x46c9a2+=eval(_0x56f7fa);}catch(_0x2472f3){if($gameTemp[_0x4e0a59(0x31b)]())console[_0x4e0a59(0x735)](_0x2472f3);}}return _0x46c9a2;};return this['traitObjects']()[_0x41f82f(0x779)](_0x4c92eb,0x0);},Game_BattlerBase[_0x59226c(0x7bf)][_0x59226c(0x317)]=function(_0x5cc0ca){const _0x52f1a6=_0x59226c;let _0x358e9e=_0x52f1a6(0x317)+_0x5cc0ca+_0x52f1a6(0x1aa);if(this['checkCacheKey'](_0x358e9e))return this[_0x52f1a6(0x49a)][_0x358e9e];return this[_0x52f1a6(0x49a)][_0x358e9e]=Math[_0x52f1a6(0x93a)](VisuMZ[_0x52f1a6(0x2d3)][_0x52f1a6(0x6ad)][_0x52f1a6(0x959)]['BasicParameterFormula'][_0x52f1a6(0x38e)](this,_0x5cc0ca)),this['_cache'][_0x358e9e];},Game_BattlerBase['prototype'][_0x59226c(0x48c)]=function(_0x2e3de7){const _0x248fb7=_0x59226c,_0x172f99=(_0xbfa1a6,_0xd8ce45)=>{const _0x561c61=_0x232c;if(!_0xd8ce45)return _0xbfa1a6;if(_0xd8ce45[_0x561c61(0x246)][_0x561c61(0x25f)](VisuMZ['CoreEngine'][_0x561c61(0x6ca)]['xparamPlus1'][_0x2e3de7])){var _0x4cf21a=Number(RegExp['$1'])/0x64;_0xbfa1a6+=_0x4cf21a;}if(_0xd8ce45[_0x561c61(0x246)][_0x561c61(0x25f)](VisuMZ[_0x561c61(0x2d3)][_0x561c61(0x6ca)][_0x561c61(0x204)][_0x2e3de7])){if('rCuzT'!==_0x561c61(0x701)){var _0x4cf21a=Number(RegExp['$1']);_0xbfa1a6+=_0x4cf21a;}else{if(_0x2d158e['_forcedTroopView']==='SV')return!![];else{if(_0x5ac3bc[_0x561c61(0x7aa)]==='FV')return![];}if(this[_0x561c61(0x24f)]===_0x7f85de)this[_0x561c61(0x417)]();if(this[_0x561c61(0x24f)][_0x561c61(0x430)]===_0xb9d47e)this[_0x561c61(0x417)]();return this[_0x561c61(0x24f)][_0x561c61(0x430)];}}if(_0xd8ce45['note']['match'](VisuMZ[_0x561c61(0x2d3)][_0x561c61(0x6ca)][_0x561c61(0x978)][_0x2e3de7])){var _0x49994d=String(RegExp['$1']);try{if(_0x561c61(0x61b)===_0x561c61(0x61b))_0xbfa1a6+=eval(_0x49994d);else{_0x47c7cf=_0x445cc1||0xa8,this[_0x561c61(0x271)]();if(_0x43919e[_0x561c61(0x2d3)][_0x561c61(0x6ad)]['UI'][_0x561c61(0x1dc)])this[_0x561c61(0x51e)](_0x17a3c9[_0x561c61(0x615)]()[_0x561c61(0x3b0)],_0xb2a97b,_0x549ad8,_0x3a5227);else{const _0x1a4efa=_0x1b1b9c['currentClass']()['name'][_0x561c61(0x8a2)](/\\I\[(\d+)\]/gi,'');this[_0x561c61(0x273)](_0x1a4efa,_0x23e2b4,_0x3cf5e6,_0x1549fd);}}}catch(_0x3c1392){if($gameTemp[_0x561c61(0x31b)]())console[_0x561c61(0x735)](_0x3c1392);}}return _0xbfa1a6;};return this[_0x248fb7(0x8c2)]()[_0x248fb7(0x779)](_0x172f99,0x0);},Game_BattlerBase[_0x59226c(0x7bf)][_0x59226c(0x8d7)]=function(_0xd85b75){const _0x54918c=_0x59226c,_0x4823c2=(_0x37548c,_0x52af58)=>{const _0xf97578=_0x232c;if(!_0x52af58)return _0x37548c;if(_0x52af58['note']['match'](VisuMZ['CoreEngine'][_0xf97578(0x6ca)][_0xf97578(0x794)][_0xd85b75])){if(_0xf97578(0x8fd)===_0xf97578(0x328)){if(_0xbeda42[_0xf97578(0x441)]())return _0xf97578(0x421);return _0x3fa157[_0xf97578(0x2d3)][_0xf97578(0x6ad)][_0xf97578(0x4c8)][_0xf97578(0x1dd)]||_0xf97578(0x75d);}else{var _0x4c9b70=Number(RegExp['$1'])/0x64;_0x37548c*=_0x4c9b70;}}if(_0x52af58['note']['match'](VisuMZ[_0xf97578(0x2d3)][_0xf97578(0x6ca)][_0xf97578(0x864)][_0xd85b75])){var _0x4c9b70=Number(RegExp['$1']);_0x37548c*=_0x4c9b70;}if(_0x52af58[_0xf97578(0x246)][_0xf97578(0x25f)](VisuMZ[_0xf97578(0x2d3)][_0xf97578(0x6ca)][_0xf97578(0x414)][_0xd85b75])){if(_0xf97578(0x4ad)===_0xf97578(0x4ad)){var _0x981ed6=String(RegExp['$1']);try{_0x37548c*=eval(_0x981ed6);}catch(_0x573050){if($gameTemp[_0xf97578(0x31b)]())console[_0xf97578(0x735)](_0x573050);}}else return _0x3c470a[_0xf97578(0x396)]()[_0xf97578(0x4e8)](_0x3108e3);}return _0x37548c;};return this[_0x54918c(0x8c2)]()[_0x54918c(0x779)](_0x4823c2,0x1);},Game_BattlerBase['prototype'][_0x59226c(0x31e)]=function(_0x326df9){const _0x542f63=_0x59226c,_0x48c9dc=(_0x4c45e4,_0x18f54d)=>{const _0x459c91=_0x232c;if(_0x459c91(0x4e3)!==_0x459c91(0x4e3)){_0x17d1bf+=_0x2324d5;if(_0x3a0bec>=_0xd258bc)_0x243c3d=_0x19cf4d-0x1;this[_0x459c91(0x54f)](_0x228d9f);}else{if(!_0x18f54d)return _0x4c45e4;if(_0x18f54d[_0x459c91(0x246)][_0x459c91(0x25f)](VisuMZ[_0x459c91(0x2d3)][_0x459c91(0x6ca)]['xparamFlat1'][_0x326df9])){if(_0x459c91(0x96e)!=='QbhXb'){var _0x1744b5=Number(RegExp['$1'])/0x64;_0x4c45e4+=_0x1744b5;}else _0x252fc1[_0x459c91(0x7bf)][_0x459c91(0x916)]['call'](this),!_0x791879['isNextScene'](_0x153215)&&(this['_spriteset'][_0x459c91(0x334)](),this[_0x459c91(0x7fa)][_0x459c91(0x670)](),this[_0x459c91(0x8fb)][_0x459c91(0x897)]=![],_0x1eb04e[_0x459c91(0x35c)]()),_0x53f493[_0x459c91(0x456)](),this['clearOnceParallelInterpreters']();}if(_0x18f54d[_0x459c91(0x246)][_0x459c91(0x25f)](VisuMZ[_0x459c91(0x2d3)][_0x459c91(0x6ca)][_0x459c91(0x2f3)][_0x326df9])){var _0x1744b5=Number(RegExp['$1']);_0x4c45e4+=_0x1744b5;}if(_0x18f54d['note'][_0x459c91(0x25f)](VisuMZ[_0x459c91(0x2d3)][_0x459c91(0x6ca)][_0x459c91(0x5f8)][_0x326df9])){var _0x8d4cbf=String(RegExp['$1']);try{_0x4c45e4+=eval(_0x8d4cbf);}catch(_0x58345e){if($gameTemp[_0x459c91(0x31b)]())console['log'](_0x58345e);}}return _0x4c45e4;}};return this[_0x542f63(0x8c2)]()['reduce'](_0x48c9dc,0x0);},Game_BattlerBase['prototype'][_0x59226c(0x7da)]=function(_0x1c3957){const _0x1b5707=_0x59226c;let _0x307f6c=_0x1b5707(0x7da)+_0x1c3957+_0x1b5707(0x1aa);if(this[_0x1b5707(0x4d0)](_0x307f6c))return this[_0x1b5707(0x49a)][_0x307f6c];return this[_0x1b5707(0x49a)][_0x307f6c]=VisuMZ[_0x1b5707(0x2d3)][_0x1b5707(0x6ad)][_0x1b5707(0x959)][_0x1b5707(0x466)][_0x1b5707(0x38e)](this,_0x1c3957),this['_cache'][_0x307f6c];},Game_BattlerBase[_0x59226c(0x7bf)][_0x59226c(0x6e7)]=function(_0x51fc72){const _0x18deb1=_0x59226c,_0x5dbc88=(_0x1e0fd1,_0xef4905)=>{const _0x1bd333=_0x232c;if(_0x1bd333(0x3ea)===_0x1bd333(0x3dd)){var _0x423c5d=_0x1e35f7(_0x409276['$1']);_0x1d40f2+=_0x423c5d;}else{if(!_0xef4905)return _0x1e0fd1;if(_0xef4905[_0x1bd333(0x246)][_0x1bd333(0x25f)](VisuMZ[_0x1bd333(0x2d3)][_0x1bd333(0x6ca)]['sparamPlus1'][_0x51fc72])){var _0x20f2ec=Number(RegExp['$1'])/0x64;_0x1e0fd1+=_0x20f2ec;}if(_0xef4905[_0x1bd333(0x246)][_0x1bd333(0x25f)](VisuMZ[_0x1bd333(0x2d3)]['RegExp']['sparamPlus2'][_0x51fc72])){var _0x20f2ec=Number(RegExp['$1']);_0x1e0fd1+=_0x20f2ec;}if(_0xef4905[_0x1bd333(0x246)]['match'](VisuMZ['CoreEngine']['RegExp']['sparamPlusJS'][_0x51fc72])){var _0x516d57=String(RegExp['$1']);try{_0x1e0fd1+=eval(_0x516d57);}catch(_0x14c44d){if('OCQpM'==='NLcDk'){_0x1ee6cb['CoreEngine']['Settings'][_0x1bd333(0x4cb)]['Title'][_0x1bd333(0x8af)][_0x1bd333(0x38e)](this);if(_0x2d3ead['subtitle']!==''&&_0x364bb8[_0x1bd333(0x425)]!==_0x1bd333(0x8f2))this[_0x1bd333(0x423)]();if(_0x255e98[_0x1bd333(0x799)]!==''&&_0x4d70d0[_0x1bd333(0x799)]!==_0x1bd333(0x76b))this[_0x1bd333(0x7e5)]();}else{if($gameTemp['isPlaytest']())console[_0x1bd333(0x735)](_0x14c44d);}}}return _0x1e0fd1;}};return this['traitObjects']()[_0x18deb1(0x779)](_0x5dbc88,0x0);},Game_BattlerBase[_0x59226c(0x7bf)]['sparamRate']=function(_0x1096ce){const _0x434cab=_0x59226c,_0x590aeb=(_0x167472,_0x2e2773)=>{const _0x53ae55=_0x232c;if('CsnNn'!==_0x53ae55(0x49c))return this[_0x53ae55(0x591)]()?this['contents']['measureTextWidthNoRounding'](_0x35aef8):_0x2386f6[_0x53ae55(0x7bf)][_0x53ae55(0x52b)][_0x53ae55(0x38e)](this,_0x5e0686);else{if(!_0x2e2773)return _0x167472;if(_0x2e2773[_0x53ae55(0x246)][_0x53ae55(0x25f)](VisuMZ['CoreEngine'][_0x53ae55(0x6ca)][_0x53ae55(0x69c)][_0x1096ce])){var _0x38ddd5=Number(RegExp['$1'])/0x64;_0x167472*=_0x38ddd5;}if(_0x2e2773[_0x53ae55(0x246)][_0x53ae55(0x25f)](VisuMZ['CoreEngine'][_0x53ae55(0x6ca)]['sparamRate2'][_0x1096ce])){var _0x38ddd5=Number(RegExp['$1']);_0x167472*=_0x38ddd5;}if(_0x2e2773[_0x53ae55(0x246)][_0x53ae55(0x25f)](VisuMZ[_0x53ae55(0x2d3)][_0x53ae55(0x6ca)][_0x53ae55(0x6f7)][_0x1096ce])){var _0x4103d5=String(RegExp['$1']);try{_0x167472*=eval(_0x4103d5);}catch(_0x3dd8ca){if($gameTemp[_0x53ae55(0x31b)]())console[_0x53ae55(0x735)](_0x3dd8ca);}}return _0x167472;}};return this[_0x434cab(0x8c2)]()[_0x434cab(0x779)](_0x590aeb,0x1);},Game_BattlerBase['prototype']['sparamFlatBonus']=function(_0x4eca82){const _0x363d6e=(_0x2c6526,_0x503675)=>{const _0x53ab6f=_0x232c;if('bSUob'===_0x53ab6f(0x6e8)){if(!_0x503675)return _0x2c6526;if(_0x503675[_0x53ab6f(0x246)]['match'](VisuMZ['CoreEngine'][_0x53ab6f(0x6ca)][_0x53ab6f(0x760)][_0x4eca82])){var _0x1d7ee3=Number(RegExp['$1'])/0x64;_0x2c6526+=_0x1d7ee3;}if(_0x503675[_0x53ab6f(0x246)][_0x53ab6f(0x25f)](VisuMZ['CoreEngine'][_0x53ab6f(0x6ca)][_0x53ab6f(0x397)][_0x4eca82])){var _0x1d7ee3=Number(RegExp['$1']);_0x2c6526+=_0x1d7ee3;}if(_0x503675[_0x53ab6f(0x246)]['match'](VisuMZ[_0x53ab6f(0x2d3)][_0x53ab6f(0x6ca)]['sparamFlatJS'][_0x4eca82])){if('gSnVH'===_0x53ab6f(0x506)){var _0x2da2ea=String(RegExp['$1']);try{_0x2c6526+=eval(_0x2da2ea);}catch(_0x15fb3f){if($gameTemp['isPlaytest']())console[_0x53ab6f(0x735)](_0x15fb3f);}}else return this[_0x53ab6f(0x647)]();}return _0x2c6526;}else{if(this['_CoreEngineSettings']===_0x3d2ec1)this['initCoreEngine']();if(this[_0x53ab6f(0x24f)][_0x53ab6f(0x37e)]===_0x2b1a03)this[_0x53ab6f(0x417)]();this[_0x53ab6f(0x24f)][_0x53ab6f(0x77c)]=_0x779f63;}};return this['traitObjects']()['reduce'](_0x363d6e,0x0);},Game_BattlerBase[_0x59226c(0x7bf)][_0x59226c(0x2e9)]=function(_0x1d6e38){const _0x69748a=_0x59226c;let _0x3385d6=_0x69748a(0x2e9)+_0x1d6e38+_0x69748a(0x1aa);if(this[_0x69748a(0x4d0)](_0x3385d6))return this[_0x69748a(0x49a)][_0x3385d6];return this['_cache'][_0x3385d6]=VisuMZ['CoreEngine'][_0x69748a(0x6ad)]['Param'][_0x69748a(0x6f0)][_0x69748a(0x38e)](this,_0x1d6e38),this[_0x69748a(0x49a)][_0x3385d6];},Game_BattlerBase[_0x59226c(0x7bf)][_0x59226c(0x2ef)]=function(_0x3f28c7,_0x4db379){const _0x26aaae=_0x59226c;if(typeof paramId===_0x26aaae(0x4dd))return this[_0x26aaae(0x317)](_0x3f28c7);_0x3f28c7=String(_0x3f28c7||'')['toUpperCase']();if(_0x3f28c7===_0x26aaae(0x7c6))return this['param'](0x0);if(_0x3f28c7==='MAXMP')return this['param'](0x1);if(_0x3f28c7===_0x26aaae(0x982))return this[_0x26aaae(0x317)](0x2);if(_0x3f28c7===_0x26aaae(0x294))return this['param'](0x3);if(_0x3f28c7===_0x26aaae(0x85e))return this['param'](0x4);if(_0x3f28c7===_0x26aaae(0x29b))return this[_0x26aaae(0x317)](0x5);if(_0x3f28c7==='AGI')return this['param'](0x6);if(_0x3f28c7===_0x26aaae(0x91e))return this[_0x26aaae(0x317)](0x7);if(_0x3f28c7==='HIT')return _0x4db379?String(Math[_0x26aaae(0x93a)](this[_0x26aaae(0x7da)](0x0)*0x64))+'%':this[_0x26aaae(0x7da)](0x0);if(_0x3f28c7===_0x26aaae(0x38c))return _0x4db379?String(Math[_0x26aaae(0x93a)](this['xparam'](0x1)*0x64))+'%':this[_0x26aaae(0x7da)](0x1);if(_0x3f28c7===_0x26aaae(0x5cb))return _0x4db379?String(Math[_0x26aaae(0x93a)](this[_0x26aaae(0x7da)](0x2)*0x64))+'%':this['xparam'](0x2);if(_0x3f28c7==='CEV')return _0x4db379?String(Math[_0x26aaae(0x93a)](this['xparam'](0x3)*0x64))+'%':this[_0x26aaae(0x7da)](0x3);if(_0x3f28c7===_0x26aaae(0x7a2))return _0x4db379?String(Math['round'](this[_0x26aaae(0x7da)](0x4)*0x64))+'%':this[_0x26aaae(0x7da)](0x4);if(_0x3f28c7===_0x26aaae(0x269))return _0x4db379?String(Math[_0x26aaae(0x93a)](this[_0x26aaae(0x7da)](0x5)*0x64))+'%':this[_0x26aaae(0x7da)](0x5);if(_0x3f28c7===_0x26aaae(0x921))return _0x4db379?String(Math[_0x26aaae(0x93a)](this[_0x26aaae(0x7da)](0x6)*0x64))+'%':this['xparam'](0x6);if(_0x3f28c7===_0x26aaae(0x675))return _0x4db379?String(Math[_0x26aaae(0x93a)](this[_0x26aaae(0x7da)](0x7)*0x64))+'%':this[_0x26aaae(0x7da)](0x7);if(_0x3f28c7===_0x26aaae(0x910))return _0x4db379?String(Math[_0x26aaae(0x93a)](this[_0x26aaae(0x7da)](0x8)*0x64))+'%':this[_0x26aaae(0x7da)](0x8);if(_0x3f28c7===_0x26aaae(0x800))return _0x4db379?String(Math[_0x26aaae(0x93a)](this['xparam'](0x9)*0x64))+'%':this['xparam'](0x9);if(_0x3f28c7===_0x26aaae(0x402))return _0x4db379?String(Math[_0x26aaae(0x93a)](this[_0x26aaae(0x2e9)](0x0)*0x64))+'%':this[_0x26aaae(0x2e9)](0x0);if(_0x3f28c7==='GRD')return _0x4db379?String(Math['round'](this[_0x26aaae(0x2e9)](0x1)*0x64))+'%':this[_0x26aaae(0x2e9)](0x1);if(_0x3f28c7===_0x26aaae(0x67c))return _0x4db379?String(Math[_0x26aaae(0x93a)](this[_0x26aaae(0x2e9)](0x2)*0x64))+'%':this[_0x26aaae(0x2e9)](0x2);if(_0x3f28c7==='PHA')return _0x4db379?String(Math[_0x26aaae(0x93a)](this[_0x26aaae(0x2e9)](0x3)*0x64))+'%':this[_0x26aaae(0x2e9)](0x3);if(_0x3f28c7===_0x26aaae(0x47e))return _0x4db379?String(Math['round'](this[_0x26aaae(0x2e9)](0x4)*0x64))+'%':this[_0x26aaae(0x2e9)](0x4);if(_0x3f28c7===_0x26aaae(0x541))return _0x4db379?String(Math[_0x26aaae(0x93a)](this[_0x26aaae(0x2e9)](0x5)*0x64))+'%':this[_0x26aaae(0x2e9)](0x5);if(_0x3f28c7===_0x26aaae(0x811))return _0x4db379?String(Math[_0x26aaae(0x93a)](this[_0x26aaae(0x2e9)](0x6)*0x64))+'%':this['sparam'](0x6);if(_0x3f28c7===_0x26aaae(0x42f))return _0x4db379?String(Math[_0x26aaae(0x93a)](this[_0x26aaae(0x2e9)](0x7)*0x64))+'%':this['sparam'](0x7);if(_0x3f28c7==='FDR')return _0x4db379?String(Math[_0x26aaae(0x93a)](this['sparam'](0x8)*0x64))+'%':this['sparam'](0x8);if(_0x3f28c7==='EXR')return _0x4db379?String(Math[_0x26aaae(0x93a)](this[_0x26aaae(0x2e9)](0x9)*0x64))+'%':this[_0x26aaae(0x2e9)](0x9);if(VisuMZ['CoreEngine']['CustomParamAbb'][_0x3f28c7]){const _0x613fea=VisuMZ[_0x26aaae(0x2d3)][_0x26aaae(0x7d9)][_0x3f28c7],_0x1290e5=this[_0x613fea];if(VisuMZ['CoreEngine'][_0x26aaae(0x3a9)][_0x3f28c7]==='integer'){if(_0x26aaae(0x8b3)!==_0x26aaae(0x48f))return _0x1290e5;else _0x56ffaa[_0x26aaae(0x7bf)]['update'][_0x26aaae(0x38e)](this),this[_0x26aaae(0x70b)]();}else{if(_0x26aaae(0x8a5)!==_0x26aaae(0x283))return _0x4db379?String(Math[_0x26aaae(0x93a)](_0x1290e5*0x64))+'%':_0x1290e5;else{const _0x2af6be=this[_0x26aaae(0x635)]/0x5,_0x2cf2c2=_0x495440[_0x26aaae(0x306)],_0x4bdd1f=_0x2cf2c2['buttonAssistKey%1'[_0x26aaae(0x538)](_0x3238ea)](),_0x5896cf=_0x2cf2c2[_0x26aaae(0x3a5)['format'](_0x3ec6ad)]();this[_0x26aaae(0x814)][_0x26aaae(0x700)[_0x26aaae(0x538)](_0xd3cc6e)]=_0x4bdd1f,this[_0x26aaae(0x814)]['text%1'[_0x26aaae(0x538)](_0x2e0e5e)]=_0x5896cf;if(_0x4bdd1f==='')return;if(_0x5896cf==='')return;const _0x591db8=_0x2cf2c2[_0x26aaae(0x4d7)['format'](_0x5443a9)](),_0x20abc5=this['itemPadding'](),_0x9f6a67=_0x2af6be*(_0xa78f63-0x1)+_0x20abc5+_0x591db8,_0x48b5b2=_0x3dbf31['CoreEngine'][_0x26aaae(0x6ad)][_0x26aaae(0x25d)][_0x26aaae(0x684)];this[_0x26aaae(0x51e)](_0x48b5b2['format'](_0x4bdd1f,_0x5896cf),_0x9f6a67,0x0,_0x2af6be-_0x20abc5*0x2);}}}return'';},Game_BattlerBase['prototype'][_0x59226c(0x619)]=function(){const _0x22382d=_0x59226c;return this[_0x22382d(0x4ce)]()&&this['_hp']<this[_0x22382d(0x1d1)]*VisuMZ[_0x22382d(0x2d3)][_0x22382d(0x6ad)]['Param'][_0x22382d(0x98c)];},Game_Battler[_0x59226c(0x7bf)]['performMiss']=function(){const _0x273e90=_0x59226c;SoundManager[_0x273e90(0x868)](),this['requestMotion'](_0x273e90(0x6bd));},VisuMZ['CoreEngine'][_0x59226c(0x843)]=Game_Actor[_0x59226c(0x7bf)][_0x59226c(0x6bf)],Game_Actor[_0x59226c(0x7bf)][_0x59226c(0x6bf)]=function(_0x3ef455){const _0x5dec6d=_0x59226c;if(this['level']>0x63)return this['paramBaseAboveLevel99'](_0x3ef455);return VisuMZ[_0x5dec6d(0x2d3)][_0x5dec6d(0x843)][_0x5dec6d(0x38e)](this,_0x3ef455);},Game_Actor['prototype'][_0x59226c(0x94f)]=function(_0xbfe5af){const _0x1937dd=_0x59226c,_0x23603a=this['currentClass']()[_0x1937dd(0x8e0)][_0xbfe5af][0x63],_0x2f36e5=this['currentClass']()[_0x1937dd(0x8e0)][_0xbfe5af][0x62];return _0x23603a+(_0x23603a-_0x2f36e5)*(this[_0x1937dd(0x88a)]-0x63);},VisuMZ[_0x59226c(0x2d3)][_0x59226c(0x495)]=Game_Actor[_0x59226c(0x7bf)][_0x59226c(0x2cc)],Game_Actor[_0x59226c(0x7bf)][_0x59226c(0x2cc)]=function(_0x3d8111,_0x1a8b77){const _0x24a986=_0x59226c;$gameTemp[_0x24a986(0x661)]=!![],VisuMZ['CoreEngine'][_0x24a986(0x495)]['call'](this,_0x3d8111,_0x1a8b77),$gameTemp['_changingClass']=undefined;},VisuMZ[_0x59226c(0x2d3)][_0x59226c(0x7f9)]=Game_Actor['prototype'][_0x59226c(0x80a)],Game_Actor[_0x59226c(0x7bf)][_0x59226c(0x80a)]=function(){const _0x2ff07c=_0x59226c;VisuMZ[_0x2ff07c(0x2d3)][_0x2ff07c(0x7f9)][_0x2ff07c(0x38e)](this);if(!$gameTemp[_0x2ff07c(0x661)])this[_0x2ff07c(0x7a3)]();},Game_Actor[_0x59226c(0x7bf)][_0x59226c(0x7a3)]=function(){const _0x560ea7=_0x59226c;this[_0x560ea7(0x49a)]={};if(VisuMZ[_0x560ea7(0x2d3)][_0x560ea7(0x6ad)][_0x560ea7(0x509)]['LevelUpFullHp'])this[_0x560ea7(0x5e5)]=this[_0x560ea7(0x1d1)];if(VisuMZ[_0x560ea7(0x2d3)][_0x560ea7(0x6ad)][_0x560ea7(0x509)][_0x560ea7(0x1d6)])this['_mp']=this[_0x560ea7(0x342)];},Game_Actor['prototype'][_0x59226c(0x379)]=function(){const _0x3da5a8=_0x59226c;if(this[_0x3da5a8(0x989)]())return 0x1;const _0x19aa7b=this[_0x3da5a8(0x4bf)]()-this[_0x3da5a8(0x44d)](),_0x14aa32=this['currentExp']()-this[_0x3da5a8(0x44d)]();return(_0x14aa32/_0x19aa7b)[_0x3da5a8(0x3d1)](0x0,0x1);},Game_Actor[_0x59226c(0x7bf)][_0x59226c(0x8c2)]=function(){const _0x4a39a5=_0x59226c,_0x3f33cd=Game_Battler['prototype']['traitObjects'][_0x4a39a5(0x38e)](this);for(const _0x4e2a4a of this[_0x4a39a5(0x1b8)]()){if(_0x4a39a5(0x7af)!=='Lyvbn')_0x4e2a4a&&('MamIl'!==_0x4a39a5(0x6b8)?this[_0x4a39a5(0x5fa)](_0x558a06[_0x4a39a5(0x256)](_0x4a39a5(0x1ca))):_0x3f33cd[_0x4a39a5(0x564)](_0x4e2a4a));else{const _0x27a0eb=_0x2827dc[_0x4a39a5(0x306)];if(!_0x27a0eb)return;!_0x27a0eb[_0x4a39a5(0x908)]&&(_0x34d332[_0x4a39a5(0x792)](),_0x27a0eb['_pictureCoordinatesWindow']=new _0x2e62a2(),_0x27a0eb['addChild'](_0x27a0eb['_pictureCoordinatesWindow'])),_0x3ad903['_pictureCoordinatesMode']===_0x13c4f4&&(_0x3c08c3[_0x4a39a5(0x4ab)](),_0x27a0eb[_0x4a39a5(0x5ec)](_0x27a0eb['_pictureCoordinatesWindow']),_0x27a0eb[_0x4a39a5(0x908)]=_0x2255d5);}}return _0x3f33cd[_0x4a39a5(0x564)](this[_0x4a39a5(0x615)](),this['actor']()),_0x3f33cd;},Object[_0x59226c(0x257)](Game_Enemy[_0x59226c(0x7bf)],_0x59226c(0x88a),{'get':function(){const _0x2820ba=_0x59226c;return this[_0x2820ba(0x34b)]();},'configurable':!![]}),Game_Enemy[_0x59226c(0x7bf)]['getLevel']=function(){const _0x48fffb=_0x59226c;return this[_0x48fffb(0x774)]()[_0x48fffb(0x88a)];},Game_Enemy[_0x59226c(0x7bf)][_0x59226c(0x47a)]=function(){const _0x313635=_0x59226c;!this[_0x313635(0x287)]&&(this['_screenY']+=Math[_0x313635(0x93a)]((Graphics[_0x313635(0x235)]-0x270)/0x2),this[_0x313635(0x2c6)]-=Math[_0x313635(0x966)]((Graphics[_0x313635(0x235)]-Graphics[_0x313635(0x5c5)])/0x2),$gameSystem[_0x313635(0x6c1)]()?this[_0x313635(0x479)]-=Math[_0x313635(0x966)]((Graphics['width']-Graphics[_0x313635(0x8bc)])/0x2):this['_screenX']+=Math[_0x313635(0x93a)]((Graphics[_0x313635(0x8bc)]-0x330)/0x2)),this['_repositioned']=!![];},Game_Party[_0x59226c(0x7bf)][_0x59226c(0x341)]=function(){const _0x5f2c64=_0x59226c;return VisuMZ['CoreEngine'][_0x5f2c64(0x6ad)][_0x5f2c64(0x1b0)]['GoldMax'];},VisuMZ[_0x59226c(0x2d3)][_0x59226c(0x4ea)]=Game_Party[_0x59226c(0x7bf)]['consumeItem'],Game_Party[_0x59226c(0x7bf)][_0x59226c(0x823)]=function(_0x553e23){const _0x410d5c=_0x59226c;if(VisuMZ[_0x410d5c(0x2d3)][_0x410d5c(0x6ad)][_0x410d5c(0x509)]['KeyItemProtect']&&DataManager[_0x410d5c(0x65f)](_0x553e23))return;VisuMZ[_0x410d5c(0x2d3)][_0x410d5c(0x4ea)][_0x410d5c(0x38e)](this,_0x553e23);},Game_Party['prototype'][_0x59226c(0x21e)]=function(){const _0x4795a8=_0x59226c,_0x3f5c62=VisuMZ['CoreEngine']['Settings'][_0x4795a8(0x509)],_0x2d9385=_0x3f5c62[_0x4795a8(0x756)]??0x63;let _0x89d96e=[];if(_0x3f5c62['BTestItems']??!![]){if(_0x4795a8(0x8a6)!==_0x4795a8(0x589))_0x89d96e=_0x89d96e['concat']($dataItems);else{if(_0x276b22[_0x4795a8(0x31b)]())_0x703b7a[_0x4795a8(0x735)](_0x2dd982);}}(_0x3f5c62['BTestWeapons']??!![])&&(_0x4795a8(0x2f9)===_0x4795a8(0x2f9)?_0x89d96e=_0x89d96e['concat']($dataWeapons):this[_0x4795a8(0x97c)]()&&_0x409b09&&this['maxCols']()===0x1&&this['index']()===0x0?this[_0x4795a8(0x54f)](this['maxItems']()-0x1):_0x127a37[_0x4795a8(0x2d3)][_0x4795a8(0x41f)]['call'](this,_0x3fade4));(_0x3f5c62[_0x4795a8(0x212)]??!![])&&(_0x89d96e=_0x89d96e[_0x4795a8(0x224)]($dataArmors));for(const _0x2cd36f of _0x89d96e){if(!_0x2cd36f)continue;if(_0x2cd36f[_0x4795a8(0x3b0)][_0x4795a8(0x7e8)]()<=0x0)continue;if(_0x2cd36f['name'][_0x4795a8(0x25f)](/-----/i))continue;this[_0x4795a8(0x913)](_0x2cd36f,_0x2d9385);}},VisuMZ[_0x59226c(0x2d3)][_0x59226c(0x7bd)]=Game_Troop[_0x59226c(0x7bf)][_0x59226c(0x275)],Game_Troop['prototype']['setup']=function(_0x578f4b){const _0xa9f831=_0x59226c;$gameTemp['clearForcedGameTroopSettingsCoreEngine'](),$gameTemp[_0xa9f831(0x424)](_0x578f4b),VisuMZ['CoreEngine']['Game_Troop_setup'][_0xa9f831(0x38e)](this,_0x578f4b);},VisuMZ[_0x59226c(0x2d3)][_0x59226c(0x69f)]=Game_Map[_0x59226c(0x7bf)][_0x59226c(0x275)],Game_Map['prototype']['setup']=function(_0x479098){const _0x4d6e16=_0x59226c;VisuMZ[_0x4d6e16(0x2d3)][_0x4d6e16(0x69f)][_0x4d6e16(0x38e)](this,_0x479098),this[_0x4d6e16(0x78b)](_0x479098);},Game_Map[_0x59226c(0x7bf)][_0x59226c(0x78b)]=function(){const _0x380afd=_0x59226c;this[_0x380afd(0x36c)]=VisuMZ[_0x380afd(0x2d3)][_0x380afd(0x6ad)][_0x380afd(0x509)][_0x380afd(0x39e)]||![];if($dataMap&&$dataMap['note']){if($dataMap[_0x380afd(0x246)][_0x380afd(0x25f)](/<SHOW TILE SHADOWS>/i))this[_0x380afd(0x36c)]=![];if($dataMap[_0x380afd(0x246)][_0x380afd(0x25f)](/<HIDE TILE SHADOWS>/i))this['_hideTileShadows']=!![];}},Game_Map[_0x59226c(0x7bf)][_0x59226c(0x1f7)]=function(){const _0x49d5cd=_0x59226c;if(this[_0x49d5cd(0x36c)]===undefined)this[_0x49d5cd(0x78b)]();return this[_0x49d5cd(0x36c)];},VisuMZ[_0x59226c(0x2d3)][_0x59226c(0x1ef)]=Game_Character[_0x59226c(0x7bf)][_0x59226c(0x757)],Game_Character[_0x59226c(0x7bf)][_0x59226c(0x757)]=function(_0x2ae9f5){const _0x233bde=_0x59226c;try{'sPIui'!=='sPIui'?(this[_0x233bde(0x678)]=new _0x1c8590['filters'][(_0x233bde(0x23f))](_0x461ed0=!![]),this[_0x233bde(0x876)]=new _0x3dbbeb(),this[_0x233bde(0x876)]['bitmap']=_0x291e18[_0x233bde(0x28a)](),this[_0x233bde(0x876)]['filters']=[this[_0x233bde(0x678)]],this[_0x233bde(0x806)][_0x233bde(0x83f)](this['_backgroundSprite'])):VisuMZ[_0x233bde(0x2d3)][_0x233bde(0x1ef)][_0x233bde(0x38e)](this,_0x2ae9f5);}catch(_0x40562f){if($gameTemp[_0x233bde(0x31b)]())console['log'](_0x40562f);}},Game_Player[_0x59226c(0x7bf)][_0x59226c(0x93d)]=function(){const _0x566b64=_0x59226c,_0x361e2d=$gameMap[_0x566b64(0x323)]();this[_0x566b64(0x83c)]=Math[_0x566b64(0x3ef)](_0x361e2d)+Math[_0x566b64(0x3ef)](_0x361e2d)+this[_0x566b64(0x2da)]();},Game_Player[_0x59226c(0x7bf)][_0x59226c(0x2da)]=function(){const _0x197bec=_0x59226c;if($dataMap&&$dataMap[_0x197bec(0x246)]&&$dataMap[_0x197bec(0x246)][_0x197bec(0x25f)](/<MINIMUM ENCOUNTER STEPS:[ ](\d+)>/i)){if(_0x197bec(0x3a6)!==_0x197bec(0x3a6)){const _0x37e973=this[_0x197bec(0x743)](_0x51cb9d,_0x304d56);_0x37e973[_0x197bec(0x22a)][_0x197bec(0x273)](_0x1dae90[_0x5321fc],0x0,0x0,_0x28e59f,_0x225bea,_0x197bec(0x545)),_0x37e973['x']=(_0x817ca2-(_0x335f37[_0x197bec(0x587)]-0x1)/0x2)*_0x4796e6,_0x37e973['dy']=-_0x161c3b;}else return Number(RegExp['$1']);}else{if(_0x197bec(0x6a8)!==_0x197bec(0x6a8)){if(_0x215788)_0x4195d5[_0x197bec(0x23d)]();_0x245f34[_0x197bec(0x2d3)][_0x197bec(0x4f1)][_0x197bec(0x38e)](this);}else return VisuMZ[_0x197bec(0x2d3)][_0x197bec(0x6ad)][_0x197bec(0x509)][_0x197bec(0x25b)];}},VisuMZ[_0x59226c(0x2d3)][_0x59226c(0x64b)]=Game_Event[_0x59226c(0x7bf)][_0x59226c(0x6c4)],Game_Event['prototype']['isCollidedWithEvents']=function(_0x22fd0f,_0x24b3ad){const _0x33866d=_0x59226c;return this[_0x33866d(0x2c0)]()?this['checkSmartEventCollision'](_0x22fd0f,_0x24b3ad):_0x33866d(0x459)===_0x33866d(0x459)?VisuMZ['CoreEngine'][_0x33866d(0x64b)][_0x33866d(0x38e)](this,_0x22fd0f,_0x24b3ad):this[_0x33866d(0x4ce)]()&&this[_0x33866d(0x5e5)]<this[_0x33866d(0x1d1)]*_0x314be0[_0x33866d(0x2d3)][_0x33866d(0x6ad)][_0x33866d(0x959)][_0x33866d(0x98c)];},Game_Event[_0x59226c(0x7bf)][_0x59226c(0x2c0)]=function(){const _0x5710ec=_0x59226c;return VisuMZ[_0x5710ec(0x2d3)][_0x5710ec(0x6ad)]['QoL'][_0x5710ec(0x5a6)];},Game_Event[_0x59226c(0x7bf)][_0x59226c(0x80c)]=function(_0x43d477,_0x5bffae){const _0x277a4b=_0x59226c;if(!this[_0x277a4b(0x815)]())return![];else{const _0x288477=$gameMap[_0x277a4b(0x6ee)](_0x43d477,_0x5bffae)[_0x277a4b(0x931)](_0x1753e7=>_0x1753e7[_0x277a4b(0x815)]());return _0x288477[_0x277a4b(0x587)]>0x0;}},VisuMZ['CoreEngine'][_0x59226c(0x7b1)]=Game_Interpreter[_0x59226c(0x7bf)]['command105'],Game_Interpreter['prototype'][_0x59226c(0x952)]=function(_0x430ef7){const _0x533a74=_0x59226c,_0x4a5ddb=this[_0x533a74(0x70e)]();return _0x4a5ddb[_0x533a74(0x25f)](/\/\/[ ]SCRIPT[ ]CALL/i)?this[_0x533a74(0x59a)](_0x4a5ddb):VisuMZ[_0x533a74(0x2d3)]['Game_Interpreter_command105'][_0x533a74(0x38e)](this,_0x430ef7);},Game_Interpreter[_0x59226c(0x7bf)]['getCombinedScrollingText']=function(){const _0xf331b7=_0x59226c;let _0x3aff72='',_0x39bcbb=this[_0xf331b7(0x6de)]+0x1;while(this[_0xf331b7(0x21d)][_0x39bcbb]&&this[_0xf331b7(0x21d)][_0x39bcbb][_0xf331b7(0x83a)]===0x195){_0x3aff72+=this[_0xf331b7(0x21d)][_0x39bcbb][_0xf331b7(0x8bb)][0x0]+'\x0a',_0x39bcbb++;}return _0x3aff72;},Game_Interpreter[_0x59226c(0x7bf)][_0x59226c(0x59a)]=function(_0x389e74){const _0x3e0dde=_0x59226c;try{if(_0x3e0dde(0x893)!==_0x3e0dde(0x893))var _0x16ff49=_0x33c655[_0x3e0dde(0x748)](_0x41b157*0x2,_0x3e0dde(0x3e4))*0.5;else eval(_0x389e74);}catch(_0x2eb659){if($gameTemp['isPlaytest']()){if(_0x3e0dde(0x555)!==_0x3e0dde(0x555))return!![];else console[_0x3e0dde(0x735)](_0x3e0dde(0x2dc)),console[_0x3e0dde(0x735)](_0x2eb659);}}return!![];},VisuMZ['CoreEngine']['Game_Interpreter_command111']=Game_Interpreter[_0x59226c(0x7bf)][_0x59226c(0x75a)],Game_Interpreter[_0x59226c(0x7bf)][_0x59226c(0x75a)]=function(_0x25f397){const _0x5cc5e6=_0x59226c;try{VisuMZ[_0x5cc5e6(0x2d3)][_0x5cc5e6(0x81d)][_0x5cc5e6(0x38e)](this,_0x25f397);}catch(_0x27d109){$gameTemp[_0x5cc5e6(0x31b)]()&&(console[_0x5cc5e6(0x735)]('Conditional\x20Branch\x20Script\x20Error'),console['log'](_0x27d109)),this[_0x5cc5e6(0x314)]();}return!![];},VisuMZ[_0x59226c(0x2d3)][_0x59226c(0x519)]=Game_Interpreter[_0x59226c(0x7bf)][_0x59226c(0x844)],Game_Interpreter[_0x59226c(0x7bf)][_0x59226c(0x844)]=function(_0x9f9ede){const _0x3d5d43=_0x59226c;try{VisuMZ[_0x3d5d43(0x2d3)][_0x3d5d43(0x519)][_0x3d5d43(0x38e)](this,_0x9f9ede);}catch(_0x230388){$gameTemp[_0x3d5d43(0x31b)]()&&(console[_0x3d5d43(0x735)](_0x3d5d43(0x265)),console[_0x3d5d43(0x735)](_0x230388));}return!![];},VisuMZ['CoreEngine'][_0x59226c(0x48e)]=Game_Interpreter[_0x59226c(0x7bf)][_0x59226c(0x767)],Game_Interpreter['prototype'][_0x59226c(0x767)]=function(){const _0x41f763=_0x59226c;try{VisuMZ[_0x41f763(0x2d3)][_0x41f763(0x48e)][_0x41f763(0x38e)](this);}catch(_0x1d88c5){$gameTemp[_0x41f763(0x31b)]()&&(console['log']('Script\x20Call\x20Error'),console[_0x41f763(0x735)](_0x1d88c5));}return!![];},VisuMZ[_0x59226c(0x2d3)][_0x59226c(0x44b)]=Game_Interpreter[_0x59226c(0x7bf)][_0x59226c(0x318)],Game_Interpreter['prototype'][_0x59226c(0x318)]=function(_0x50526c){const _0x5f55fc=_0x59226c;return $gameTemp[_0x5f55fc(0x698)](this),VisuMZ[_0x5f55fc(0x2d3)][_0x5f55fc(0x44b)][_0x5f55fc(0x38e)](this,_0x50526c);},Scene_Base[_0x59226c(0x7bf)][_0x59226c(0x65b)]=function(){const _0x29ffc3=_0x59226c;return VisuMZ[_0x29ffc3(0x2d3)][_0x29ffc3(0x6ad)]['UI'][_0x29ffc3(0x58c)];},Scene_Base['prototype'][_0x59226c(0x6cf)]=function(){const _0x31e5b5=_0x59226c;return VisuMZ[_0x31e5b5(0x2d3)][_0x31e5b5(0x6ad)]['UI']['BottomHelp'];},Scene_Base[_0x59226c(0x7bf)][_0x59226c(0x2d8)]=function(){const _0x23b1a9=_0x59226c;return VisuMZ[_0x23b1a9(0x2d3)][_0x23b1a9(0x6ad)]['UI'][_0x23b1a9(0x8b6)];},Scene_Base['prototype'][_0x59226c(0x26b)]=function(){const _0x43336a=_0x59226c;return VisuMZ['CoreEngine'][_0x43336a(0x6ad)]['UI'][_0x43336a(0x2ac)];},Scene_Base[_0x59226c(0x7bf)][_0x59226c(0x42d)]=function(){const _0x1d65e5=_0x59226c;return VisuMZ[_0x1d65e5(0x2d3)][_0x1d65e5(0x6ad)]['UI'][_0x1d65e5(0x3e1)];},Scene_Base[_0x59226c(0x7bf)]['buttonAreaHeight']=function(){const _0x2467b8=_0x59226c;return VisuMZ[_0x2467b8(0x2d3)]['Settings']['UI'][_0x2467b8(0x98e)];},Scene_Base[_0x59226c(0x7bf)][_0x59226c(0x522)]=function(){const _0x1c5fc7=_0x59226c;return VisuMZ[_0x1c5fc7(0x2d3)][_0x1c5fc7(0x6ad)]['Window'][_0x1c5fc7(0x393)];},VisuMZ[_0x59226c(0x2d3)][_0x59226c(0x498)]=Scene_Base[_0x59226c(0x7bf)][_0x59226c(0x972)],Scene_Base[_0x59226c(0x7bf)][_0x59226c(0x972)]=function(){const _0x3d117c=_0x59226c;VisuMZ[_0x3d117c(0x2d3)][_0x3d117c(0x498)][_0x3d117c(0x38e)](this),this['createButtonAssistWindow'](),this[_0x3d117c(0x8fb)]['x']=Math[_0x3d117c(0x93a)](this['_windowLayer']['x']),this[_0x3d117c(0x8fb)]['y']=Math[_0x3d117c(0x93a)](this['_windowLayer']['y']);},Scene_Base[_0x59226c(0x7bf)][_0x59226c(0x412)]=function(){},Scene_Base[_0x59226c(0x7bf)][_0x59226c(0x535)]=function(){const _0x5192a9=_0x59226c;return TextManager[_0x5192a9(0x65d)]('pageup',_0x5192a9(0x585));},Scene_Base[_0x59226c(0x7bf)][_0x59226c(0x54a)]=function(){const _0x53105b=_0x59226c;return TextManager[_0x53105b(0x206)](_0x53105b(0x5e8));},Scene_Base[_0x59226c(0x7bf)]['buttonAssistKey3']=function(){const _0x361bc3=_0x59226c;return TextManager[_0x361bc3(0x206)]('shift');},Scene_Base[_0x59226c(0x7bf)][_0x59226c(0x929)]=function(){const _0x5a2a79=_0x59226c;return TextManager[_0x5a2a79(0x206)]('ok');},Scene_Base['prototype']['buttonAssistKey5']=function(){const _0x5e735d=_0x59226c;return TextManager[_0x5e735d(0x206)](_0x5e735d(0x871));},Scene_Base[_0x59226c(0x7bf)]['buttonAssistText1']=function(){const _0x56f9e2=_0x59226c;if(this[_0x56f9e2(0x5f2)]&&this[_0x56f9e2(0x5f2)][_0x56f9e2(0x897)])return TextManager['buttonAssistSwitch'];else{if(_0x56f9e2(0x704)!==_0x56f9e2(0x51f))return'';else this[_0x56f9e2(0x54f)](_0x155d8c[_0x56f9e2(0x3d0)](this['index'](),0x0));}},Scene_Base[_0x59226c(0x7bf)]['buttonAssistText2']=function(){return'';},Scene_Base[_0x59226c(0x7bf)][_0x59226c(0x2ca)]=function(){return'';},Scene_Base[_0x59226c(0x7bf)]['buttonAssistText4']=function(){const _0x453865=_0x59226c;return TextManager[_0x453865(0x8f6)];},Scene_Base[_0x59226c(0x7bf)][_0x59226c(0x59d)]=function(){const _0x1428df=_0x59226c;return TextManager[_0x1428df(0x943)];},Scene_Base['prototype'][_0x59226c(0x796)]=function(){return 0x0;},Scene_Base[_0x59226c(0x7bf)]['buttonAssistOffset2']=function(){return 0x0;},Scene_Base[_0x59226c(0x7bf)][_0x59226c(0x5ee)]=function(){return 0x0;},Scene_Base['prototype'][_0x59226c(0x659)]=function(){return 0x0;},Scene_Base[_0x59226c(0x7bf)][_0x59226c(0x1c5)]=function(){return 0x0;},VisuMZ['CoreEngine']['Scene_Boot_loadSystemImages']=Scene_Boot[_0x59226c(0x7bf)]['loadSystemImages'],Scene_Boot['prototype'][_0x59226c(0x642)]=function(){const _0x16f91f=_0x59226c;VisuMZ[_0x16f91f(0x2d3)][_0x16f91f(0x433)][_0x16f91f(0x38e)](this),this[_0x16f91f(0x71c)]();},Scene_Boot['prototype'][_0x59226c(0x71c)]=function(){const _0xc98b4f=_0x59226c,_0x438a1d=[_0xc98b4f(0x769),_0xc98b4f(0x75f),'battlebacks2',_0xc98b4f(0x884),_0xc98b4f(0x1b2),_0xc98b4f(0x3f9),_0xc98b4f(0x92e),_0xc98b4f(0x4de),'sv_actors',_0xc98b4f(0x83b),'system',_0xc98b4f(0x4b7),_0xc98b4f(0x68f),'titles2'];for(const _0x14c9af of _0x438a1d){if(_0xc98b4f(0x480)==='spSSs'){let _0x1b2c7e=this['_mode'];this[_0xc98b4f(0x77e)]=_0x2ba9d8,_0x1b2c7e!==this['_mode']&&(this[_0xc98b4f(0x6df)](),_0x164268[_0xc98b4f(0x62e)](),this[_0xc98b4f(0x77e)]==='default'?this[_0xc98b4f(0x356)](0x0):this[_0xc98b4f(0x356)](-0x1));}else{const _0x4398a4=VisuMZ['CoreEngine']['Settings'][_0xc98b4f(0x270)][_0x14c9af],_0x449e3e='img/%1/'[_0xc98b4f(0x538)](_0x14c9af);for(const _0x227342 of _0x4398a4){ImageManager[_0xc98b4f(0x5a8)](_0x449e3e,_0x227342);}}}},VisuMZ[_0x59226c(0x2d3)]['Scene_Boot_startNormalGame']=Scene_Boot[_0x59226c(0x7bf)][_0x59226c(0x312)],Scene_Boot['prototype'][_0x59226c(0x312)]=function(){const _0x1c8202=_0x59226c;if(Utils[_0x1c8202(0x928)]('test')&&VisuMZ[_0x1c8202(0x2d3)][_0x1c8202(0x6ad)][_0x1c8202(0x509)][_0x1c8202(0x761)])this[_0x1c8202(0x557)]();else{if('bKmJt'===_0x1c8202(0x2c9))VisuMZ[_0x1c8202(0x2d3)][_0x1c8202(0x422)][_0x1c8202(0x38e)](this);else{const _0x3ffe64=_0x14bf44[_0x1c8202(0x242)]?(_0x33272d['prototype'][_0x1c8202(0x381)]()+0x6)*0x2:0x0,_0xeed1a=this[_0x1c8202(0x404)](),_0x4caacd=_0xf7c104[_0x1c8202(0x8bc)]-_0x3ffe64*0x2,_0x58200e=this['buttonAreaHeight']();return new _0x444706(_0x3ffe64,_0xeed1a,_0x4caacd,_0x58200e);}}},Scene_Boot[_0x59226c(0x7bf)]['startAutoNewGame']=function(){const _0xb54727=_0x59226c;DataManager[_0xb54727(0x338)](),SceneManager[_0xb54727(0x906)](Scene_Map);},Scene_Boot[_0x59226c(0x7bf)][_0x59226c(0x763)]=function(){const _0x3528aa=_0x59226c,_0xb95362=$dataSystem['advanced']['uiAreaWidth'],_0x535cbd=$dataSystem[_0x3528aa(0x548)][_0x3528aa(0x8cd)],_0x53fd98=VisuMZ[_0x3528aa(0x2d3)][_0x3528aa(0x6ad)]['UI'][_0x3528aa(0x26d)];Graphics[_0x3528aa(0x8bc)]=_0xb95362-_0x53fd98*0x2,Graphics[_0x3528aa(0x5c5)]=_0x535cbd-_0x53fd98*0x2,this[_0x3528aa(0x1fb)]();},VisuMZ['CoreEngine']['Scene_Boot_updateDocumentTitle']=Scene_Boot[_0x59226c(0x7bf)][_0x59226c(0x295)],Scene_Boot[_0x59226c(0x7bf)][_0x59226c(0x295)]=function(){const _0x207f4f=_0x59226c;this[_0x207f4f(0x8a9)]()?this['makeDocumentTitle']():_0x207f4f(0x607)!==_0x207f4f(0x266)?VisuMZ[_0x207f4f(0x2d3)]['Scene_Boot_updateDocumentTitle']['call'](this):_0xba0157[_0x207f4f(0x610)]&&(this['_forcedBattleSys']='OTB');},Scene_Boot[_0x59226c(0x7bf)][_0x59226c(0x8a9)]=function(){const _0x126f7c=_0x59226c;if(Scene_Title[_0x126f7c(0x425)]==='')return![];if(Scene_Title[_0x126f7c(0x425)]===_0x126f7c(0x8f2))return![];if(Scene_Title[_0x126f7c(0x799)]==='')return![];if(Scene_Title[_0x126f7c(0x799)]===_0x126f7c(0x76b))return![];return!![];},Scene_Boot[_0x59226c(0x7bf)][_0x59226c(0x2f5)]=function(){const _0x432980=_0x59226c,_0xa8c708=$dataSystem[_0x432980(0x667)],_0x3adf54=Scene_Title['subtitle']||'',_0x1f26cc=Scene_Title[_0x432980(0x799)]||'',_0x5d7f06=VisuMZ[_0x432980(0x2d3)]['Settings']['MenuLayout'][_0x432980(0x804)][_0x432980(0x3be)],_0x3b4b8e=_0x5d7f06[_0x432980(0x538)](_0xa8c708,_0x3adf54,_0x1f26cc);document[_0x432980(0x7c3)]=_0x3b4b8e;},Scene_Boot[_0x59226c(0x7bf)]['determineSideButtonLayoutValid']=function(){const _0x2b42a1=_0x59226c;if(VisuMZ['CoreEngine'][_0x2b42a1(0x6ad)]['UI'][_0x2b42a1(0x582)]){if('hjWaD'!==_0x2b42a1(0x7de)){const _0x45c5df=Graphics[_0x2b42a1(0x4d6)]-Graphics[_0x2b42a1(0x8bc)]-VisuMZ['CoreEngine'][_0x2b42a1(0x6ad)]['UI'][_0x2b42a1(0x26d)]*0x2,_0x21ee25=Sprite_Button['prototype']['blockWidth'][_0x2b42a1(0x38e)](this)*0x4;if(_0x45c5df>=_0x21ee25)SceneManager['setSideButtonLayout'](!![]);}else return _0x1ba8d3['getInputButtonString'](_0x2b42a1(0x871));}},Scene_Title[_0x59226c(0x425)]=VisuMZ[_0x59226c(0x2d3)]['Settings'][_0x59226c(0x4cb)][_0x59226c(0x804)][_0x59226c(0x8f2)],Scene_Title[_0x59226c(0x799)]=VisuMZ[_0x59226c(0x2d3)][_0x59226c(0x6ad)][_0x59226c(0x4cb)]['Title'][_0x59226c(0x85d)],Scene_Title[_0x59226c(0x321)]=VisuMZ['CoreEngine'][_0x59226c(0x6ad)]['TitlePicButtons'],VisuMZ[_0x59226c(0x2d3)][_0x59226c(0x4c3)]=Scene_Title['prototype'][_0x59226c(0x8af)],Scene_Title['prototype'][_0x59226c(0x8af)]=function(){const _0x3270db=_0x59226c;VisuMZ[_0x3270db(0x2d3)][_0x3270db(0x6ad)][_0x3270db(0x4cb)][_0x3270db(0x804)][_0x3270db(0x8af)][_0x3270db(0x38e)](this);if(Scene_Title['subtitle']!==''&&Scene_Title[_0x3270db(0x425)]!=='Subtitle')this[_0x3270db(0x423)]();if(Scene_Title[_0x3270db(0x799)]!==''&&Scene_Title['version']!==_0x3270db(0x76b))this['drawGameVersion']();},Scene_Title['prototype'][_0x59226c(0x423)]=function(){const _0x43cbbd=_0x59226c;VisuMZ[_0x43cbbd(0x2d3)][_0x43cbbd(0x6ad)][_0x43cbbd(0x4cb)][_0x43cbbd(0x804)][_0x43cbbd(0x423)]['call'](this);},Scene_Title[_0x59226c(0x7bf)][_0x59226c(0x7e5)]=function(){const _0xfd6758=_0x59226c;VisuMZ[_0xfd6758(0x2d3)][_0xfd6758(0x6ad)][_0xfd6758(0x4cb)][_0xfd6758(0x804)]['drawGameVersion']['call'](this);},Scene_Title['prototype'][_0x59226c(0x27c)]=function(){const _0x170df0=_0x59226c;this['createTitleButtons']();const _0xbd44b5=$dataSystem[_0x170df0(0x29e)][_0x170df0(0x4a0)],_0x12c43c=this[_0x170df0(0x1c0)]();this['_commandWindow']=new Window_TitleCommand(_0x12c43c),this[_0x170df0(0x81a)]['setBackgroundType'](_0xbd44b5);const _0xc71b55=this['commandWindowRect']();this[_0x170df0(0x81a)]['move'](_0xc71b55['x'],_0xc71b55['y'],_0xc71b55['width'],_0xc71b55[_0x170df0(0x235)]),this['addWindow'](this[_0x170df0(0x81a)]);},Scene_Title['prototype'][_0x59226c(0x5f9)]=function(){const _0x1acffb=_0x59226c;if(this[_0x1acffb(0x81a)]){if(_0x1acffb(0x2e6)===_0x1acffb(0x744))_0x38c0b9+=_0x1acffb(0x468)[_0x1acffb(0x538)](_0x1d81b7[_0x1acffb(0x8bb)][0x0]);else return this[_0x1acffb(0x81a)]['maxItems']();}else{if(_0x1acffb(0x355)!==_0x1acffb(0x355))_0xdd6a97[_0x1acffb(0x2d3)]['Game_Picture_move']['call'](this,_0x4b5791,_0x28803c,_0x36ca36,_0x426086,_0x4a536f,_0x1819cc,_0x375900,_0x732495,_0x1aaffd),this['setTargetAnchor']([{'x':0x0,'y':0x0},{'x':0.5,'y':0.5}][_0x19b2c5]||{'x':0x0,'y':0x0});else return VisuMZ[_0x1acffb(0x2d3)][_0x1acffb(0x6ad)][_0x1acffb(0x510)]['length'];}},Scene_Title['prototype'][_0x59226c(0x1c0)]=function(){const _0x22b476=_0x59226c;return VisuMZ[_0x22b476(0x2d3)]['Settings'][_0x22b476(0x4cb)][_0x22b476(0x804)][_0x22b476(0x839)][_0x22b476(0x38e)](this);},Scene_Title['prototype']['createTitleButtons']=function(){const _0x42a290=_0x59226c;for(const _0x4b0694 of Scene_Title[_0x42a290(0x321)]){if(_0x42a290(0x3ad)===_0x42a290(0x261)){var _0x1a79b7=_0x5dc1bf(_0x4b6ae3['$1']);_0x581530+=_0x1a79b7;}else{const _0x32542f=new Sprite_TitlePictureButton(_0x4b0694);this['addChild'](_0x32542f);}}},VisuMZ[_0x59226c(0x2d3)][_0x59226c(0x75b)]=Scene_Map[_0x59226c(0x7bf)]['initialize'],Scene_Map['prototype'][_0x59226c(0x72d)]=function(){const _0x1d240c=_0x59226c;VisuMZ[_0x1d240c(0x2d3)][_0x1d240c(0x75b)]['call'](this),$gameTemp['clearForcedGameTroopSettingsCoreEngine'](),this[_0x1d240c(0x728)]();},VisuMZ[_0x59226c(0x2d3)][_0x59226c(0x6eb)]=Scene_Map[_0x59226c(0x7bf)]['updateMainMultiply'],Scene_Map[_0x59226c(0x7bf)][_0x59226c(0x881)]=function(){const _0x4ff6d4=_0x59226c;VisuMZ[_0x4ff6d4(0x2d3)]['Scene_Map_updateMainMultiply'][_0x4ff6d4(0x38e)](this);if($gameTemp['_playTestFastMode']&&!$gameMessage[_0x4ff6d4(0x699)]()){if(_0x4ff6d4(0x919)!==_0x4ff6d4(0x8e7))this[_0x4ff6d4(0x3a1)](),SceneManager[_0x4ff6d4(0x6b1)]();else return _0x4ff6d4(0x413);}},Scene_Map[_0x59226c(0x7bf)][_0x59226c(0x916)]=function(){const _0x9ffcfa=_0x59226c;Scene_Message[_0x9ffcfa(0x7bf)][_0x9ffcfa(0x916)][_0x9ffcfa(0x38e)](this),!SceneManager[_0x9ffcfa(0x793)](Scene_Battle)&&(_0x9ffcfa(0x300)===_0x9ffcfa(0x3f4)?(this['_data']={},_0x337646[_0x9ffcfa(0x7bf)][_0x9ffcfa(0x72d)][_0x9ffcfa(0x38e)](this,_0x157cdb),this[_0x9ffcfa(0x573)](_0x2375d1[_0x9ffcfa(0x2d3)][_0x9ffcfa(0x6ad)]['ButtonAssist']['BgType']||0x0),this[_0x9ffcfa(0x6df)]()):(this['_spriteset']['update'](),this[_0x9ffcfa(0x7fa)][_0x9ffcfa(0x670)](),this['_windowLayer']['visible']=![],SceneManager[_0x9ffcfa(0x35c)]())),$gameScreen[_0x9ffcfa(0x456)](),this[_0x9ffcfa(0x728)]();},VisuMZ[_0x59226c(0x2d3)][_0x59226c(0x594)]=Scene_Map[_0x59226c(0x7bf)][_0x59226c(0x36b)],Scene_Map[_0x59226c(0x7bf)][_0x59226c(0x36b)]=function(){const _0x3c08ac=_0x59226c;VisuMZ[_0x3c08ac(0x2d3)]['Scene_Map_createMenuButton'][_0x3c08ac(0x38e)](this),SceneManager[_0x3c08ac(0x6e1)]()&&this[_0x3c08ac(0x22e)]();},Scene_Map['prototype']['moveMenuButtonSideButtonLayout']=function(){const _0x4f91e0=_0x59226c;this[_0x4f91e0(0x6fc)]['x']=Graphics['boxWidth']+0x4;},VisuMZ[_0x59226c(0x2d3)]['Scene_Map_updateScene']=Scene_Map['prototype'][_0x59226c(0x61f)],Scene_Map[_0x59226c(0x7bf)]['updateScene']=function(){const _0xaa1ecc=_0x59226c;VisuMZ['CoreEngine'][_0xaa1ecc(0x80f)][_0xaa1ecc(0x38e)](this),this[_0xaa1ecc(0x408)](),this[_0xaa1ecc(0x622)]();},Scene_Map[_0x59226c(0x7bf)][_0x59226c(0x408)]=function(){const _0x14b326=_0x59226c;Input[_0x14b326(0x256)](_0x14b326(0x528))&&(ConfigManager[_0x14b326(0x3f5)]=!ConfigManager['alwaysDash'],ConfigManager[_0x14b326(0x749)]());},Scene_Map[_0x59226c(0x7bf)][_0x59226c(0x728)]=function(){const _0x25b7ba=_0x59226c;this[_0x25b7ba(0x8de)]=[];},Scene_Map[_0x59226c(0x7bf)]['updateOnceParallelInterpreters']=function(){const _0x1787db=_0x59226c;if(!this['_onceParallelInterpreters'])return;for(const _0x513a1e of this[_0x1787db(0x8de)]){if(_0x513a1e){if('NTbKf'!==_0x1787db(0x62b))_0x513a1e[_0x1787db(0x334)]();else return 0x0;}}},Scene_Map['prototype'][_0x59226c(0x1f3)]=function(_0x34c1a3){const _0x49372e=_0x59226c,_0x430ee4=$dataCommonEvents[_0x34c1a3];if(!_0x430ee4)return;const _0x191ee0=new Game_OnceParallelInterpreter();this['addOnceParallelInterpreter'](_0x191ee0),_0x191ee0[_0x49372e(0x210)](_0x34c1a3);},Scene_Map[_0x59226c(0x7bf)][_0x59226c(0x6cc)]=function(_0x5b8419){const _0x2884bf=_0x59226c;this['_onceParallelInterpreters']=this[_0x2884bf(0x8de)]||[],this[_0x2884bf(0x8de)]['push'](_0x5b8419);},Scene_Map[_0x59226c(0x7bf)][_0x59226c(0x1d2)]=function(_0x1cbde8){const _0x5e6f49=_0x59226c;this['_onceParallelInterpreters']=this['_onceParallelInterpreters']||[],this['_onceParallelInterpreters'][_0x5e6f49(0x60c)](_0x1cbde8);};function _0x232c(_0x4f3dee,_0x95b9ba){const _0xaee08e=_0xaee0();return _0x232c=function(_0x232c48,_0x1656cb){_0x232c48=_0x232c48-0x1a1;let _0x1d4586=_0xaee08e[_0x232c48];return _0x1d4586;},_0x232c(_0x4f3dee,_0x95b9ba);}function Game_OnceParallelInterpreter(){const _0xd4de0a=_0x59226c;this[_0xd4de0a(0x72d)](...arguments);}function _0xaee0(){const _0x137a8e=['Game_Troop_setup','NUMPAD9','prototype','isGameActive','adjustSprite','Bitmap_clearRect','title','DELETE','vKuoV','MAXHP','nah','targets','defaultInputMode','zvXnH','skills','tpColor','ItemBackColor1','pkNGs','textSizeEx','gYyPV','successRate','Sprite_Animation_processSoundTimings','shift','_makeFontNameText','_backSprite1','pressed','UvxfL','opacity','CustomParamAbb','xparam','traitsPi','SLEEP','_origin','eqiGL','WUcce','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','〘Show\x20Text〙\x0a','_viewportSize','_sellWindow','GoldFontSize','drawGameVersion','setViewportCoreEngineFix','MUgQs','trim','open','JYBUF','GlxHF','ColSpacing','ExportString','ParseArmorNotetags','setEnemyAction','isAnimationPlaying','SkillTypeBgType','measureTextWidthNoRounding','dimColor2','SwitchRandomizeOne','Window_NameInput_cursorPageup','bitmapHeight','deathColor','addCommand','Game_Actor_levelUp','_mapNameWindow','ufuXQ','xerxt','stypeId','_lastX','Export\x20Map\x20Text\x20operation\x20will\x20finish\x20in\x20%1\x20ms(s)','TRG','Color','pageup','SUOkh','Title','uJNRg','_baseSprite','GroupDigits','RBzER','_playtestF7Looping','levelUp','pendingColor','checkSmartEventCollision','AutoStretch','ActorTPColor','Scene_Map_updateScene','PositionY','PDR','_playTestFastMode','WIN_OEM_FJ_LOYA','_data','isNormalPriority','BTB','setCoreEngineScreenShakeStyle','WIN_OEM_FJ_JISHO','SceneManager_isGameActive','_commandWindow','onLoad','down','Game_Interpreter_command111','whlbC','ByTma','_stored_hpGaugeColor1','updateCoreEasing','F21','consumeItem','Sprite_Animation_setViewport','kEJoM','BackOpacity','drawActorSimpleStatus','setFrame','numberWindowRect','ColorNormal','DDnMg','makeTargetSprites','%1〘End\x20Choice\x20Selection〙%1','PIPE','gainGold','yogFz','batch','KANA','exportAllMapStrings','ActorHPColor','OpenSpeed','mainAreaTop','Map%1.json','calcEasing','CommandRect','code','sv_enemies','_encounterCount','popScene','processCursorMove','addChild','movePageButtonSideButtonLayout','_maxDigits','ParseActorNotetags','Game_Actor_paramBase','command122','OHaDg','66423jPKUsB','KeyTAB','targetScaleY','JUNJA','CONVERT','shake','HTWEn','reserveNewGameCommonEvent','([\x5c+\x5c-]\x5cd+)>','SreuE','BgFilename1','VisuMZ_2_BattleSystemPTB','ColorPowerDown','loadWindowskin','HcarS','Flat1','lWUkB','_editWindow','OTB','buttons','hknBy','ParseSkillNotetags','bEAWD','Version','MAT','COLON','itemBackColor1','DZGDb','jGmwr','makeFontSmaller','xparamRate2','JFzKm','_shakeSpeed','INBOUNCE','playMiss','scaleMode','initMembersCoreEngine','animationBaseDelay','setupButtonImage','DashToggleR','renderNoMask','PictureID','VzDfn','cancel','application/json','cXIGE','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','useDigitGrouping','_backgroundSprite','iNXxn','reservePlayTestNewGameCommonEvent','CodeJS','ATTN','cefDR','ColorPowerUp','hpGaugeColor1','powerDownColor','usableSkills','scaleSprite','updateMainMultiply','ScreenResolution','fkmnx','characters','XParamVocab7','system','makeInputButtonString','_centerElement','TCeWk','level','HANJA','initDigitGrouping','IconParam1','paGCs','<%1\x20%2:[\x20]','mainAreaHeight','apply','PictureFilename','sjqfu','makeAutoBattleActions','fillText','sv_actors','visible','setSideView','QcGws','_isButtonHidden','GomaP','AZCbj','_tempActor','_targetOffsetX','VisuMZ_2_BattleSystemCTB','Upper\x20Left','numActions','replace','_stored_deathColor','setHandler','Jztjn','vudOo','([\x5c+\x5c-]\x5cd+\x5c.?\x5cd+)>','taWmd','isFullDocumentTitle','dKQoR','tileHeight','keyCode','createFauxAnimationQueue','isArrowPressed','drawGameTitle','maxTp','map','onKeyDown','qmutr','setGuard','GoldOverlap','BottomButtons','updateWaitMode','_pictureContainer','DummyBgType','Game_Picture_initBasic','parameters','boxWidth','mpGaugeColor1','paramX','Scene_Name_onInputOk','makeDeepCopy','createPageButtons','traitObjects','ZLYbA','ParamMax','evaluate','IconSParam2','drawActorClass','drawFace','Scene_Options_create','LineHeight','SParamVocab8','isRepeated','uiAreaHeight','getCoreEngineScreenShakeStyle','setActorHomeRepositioned','button','PositionX','NWXTL','updateTransform','getBackgroundOpacity','jsQuickFunc','【%1】\x0a','xparamRate','Input_setupEventHandlers','_duration','_mainSprite','maxCols','HelpRect','buttonAssistText1','_onceParallelInterpreters','listWindowRect','params','adjustPictureAntiZoom','_targetX','subjectHitRate','paramPlusJS','_pauseSignSprite','BlendMode','uaxDj','_helpWindow','ShowButtons','PIANp','cancelShowButton','processSoundTimings','MZjer','initCoreEngineScreenShake','148536XrQuoM','inputWindowRect','random','Subtitle','#%1','contentsBack','repositionCancelButtonSideButtonLayout','buttonAssistOk','NameMenu','string','Apeit','ExtractStrFromList','_windowLayer','IconParam3','LusMe','_hovered','nPMXO','IwOHf','enYgC','smooth','createJsQuickFunction','_addShadow','Layer','goto','playCursor','_pictureCoordinatesWindow','DimColor1','gMWaw','CANCEL','Game_Picture_x','CategoryBgType','YJKzD','SParamVocab5','MRG','OaFqF','setBattleSystem','gainItem','_inputString','bgs','terminate','NewGameCommonEventAll','_offsetY','vydpR','DRyGt','process_VisuMZ_CoreEngine_RegExp','QsNSY','StatusRect','LUK','isMapScrollLinked','INOUTSINE','CNT','battleSystem','SlotBgType','ColorExpGauge1','pvSSx','_defaultStretchMode','displayY','isOptionValid','buttonAssistKey4','jnsFE','targetEvaRate','umOIF','makeCoreEngineCommandList','parallaxes','ShowItemBackground','setSize','filter','TAB','_tilemap','_listWindow','itemHeight','UHmsY','requestPointAnimation','bind','Window_Base_createTextState','round','abs','process_VisuMZ_CoreEngine_Settings','makeEncounterCount','OUTQUART','setActorHome','destroyCoreEngineMarkedBitmaps','Duration','position','buttonAssistCancel','useDigitGroupingEx','AMPERSAND','dsAcZ','updatePosition','_movementWholeDuration','UyaBx','StatusBgType','_width','loadIconBitmap','_anchor','Pjtbi','paramBaseAboveLevel99','StmOC','hWcic','command105','Scene_Equip_create','_profileWindow','IzPec','ALT','layoutSettings','updatePositionCoreEngineShakeRand','Param','_stored_crisisColor','showPointAnimations','Actor','WindowLayer_render','kdrUI','itemHit','isOpen','IGciF','WugvH','BannedWords','maxLvGaugeColor2','catchLoadError','floor','ScaleX','ActorMPColor','HIT','ToTyY','doesNameContainBannedWords','mainAreaTopSideButtonLayout','maxBattleMembers','odDlY','Scene_GameEnd_createBackground','allowShiftScrolling','KIHdf','createWindowLayer','optSideView','Abbreviation','Game_Action_setAttack','deselect','_stored_mpGaugeColor1','xparamPlusJS','_blank','isTouchedInsideFrame','mute','isUseModernControls','FSaoi','buyWindowRect','performEscape','LvExpGauge','evaded','ATK','iVeJT','WIN_OEM_FINISH','oSimb','CRSEL','ONE','LATIN1','isMaxLevel','Spriteset_Base_isAnimationPlaying','globalAlpha','CrisisRate','includes','ButtonHeight','Sprite_Button_initialize','SwitchToggleRange','EndingID','PAUSE','processTimingData','updateMotion','(\x5cd+)([%％])>','ParamChange','ConvertNumberToString','_gamepadWait','ProfileBgType','OkzFh','mainAreaBottom','Total','processKeyboardEnd','clone','removeAllPointAnimations','BswFg','ColorSystem','Gold','battlebacks2','enemies','ColorCTGauge1','Smooth','cos','iconWidth','IconSParam9','equips','showPicture','up2','14357754wzdRXW','MngXJ','CjMBR','loadSystem','zBAwe','commandWindowRect','forceOutOfPlaytest','updateKeyText','horzJS','Window','buttonAssistOffset5','gaugeHeight','SceneManager_onKeyDown','isGamepadTriggered','processEscape','right','pointX','zeqHa','translucentOpacity','vrDvd','vertical','meVolume','mhp','removeOnceParallelInterpreter','ColorCrisis','initialBattleSystem','outbounce','LevelUpFullMp','SParamVocab1','F20','VmekF','_pictureName','NIurk','TextCodeClassNames','DefaultMode','NUMPAD6','statusWindowRect','processBack','Mute','fKasR','_hideButtons','getLastPluginCommandInterpreter','updateBackOpacity','〘Common\x20Event\x20%1:\x20%2〙\x20End','Sprite_AnimationMV_updatePosition','PCFef','Opacity','NizyH','EoRvs','children','Window_NameInput_processHandling','RiUTb','Game_Character_processMoveCommand','ItemStyle','child_process','systemColor','playOnceParallelInterpreter','createCustomBackgroundImages','outlineColorGauge','IconSParam8','areTileShadowsHidden','PreserveNumbers','_commandList','_smooth','determineSideButtonLayoutValid','Center','disable','Window_Selectable_processTouch','textBaseline','targetBackOpacity','HhZdu','storeMapData','mFjhX','xparamPlus2','DigitGroupingStandardText','getInputButtonString','destroy','pEyju','itemPadding','Scene_Name_create','PA1','OUTQUINT','_stored_tpGaugeColor2','valueOutlineColor','Graphics_printError','setCommonEvent','ColorTPGauge2','BTestArmors','index','_pointAnimationQueue','Window_StatusBase_drawActorSimpleStatus','qmVYo','KeySHIFT','FDR','TPB\x20ACTIVE','Window_Base_drawFace','UHlmE','_stored_tpGaugeColor1','_list','setupBattleTestItems','setupCoreEasing','drawActorNickname','pop','valueOutlineWidth','Game_Action_updateLastTarget','concat','NEHad','CustomParamNames','lCtLy','max','gfKFT','bitmap','_actor','skillTypes','endAnimation','moveMenuButtonSideButtonLayout','setActionState','windowPadding','setAnchor','getCustomBackgroundSettings','XwEkQ','DigitGroupingLocale','height','skillTypeWindowRect','IconParam0','openingSpeed','CTB','getColorDataFromPluginParameters','OkText','isPhysical','sceneTerminationClearEffects','QPtrg','BlurFilter','ColorCTGauge2','reserveCommonEvent','touchUI','F13','_categoryWindow','switchModes','note','_upArrowSprite','enable','Flat2','_troopId','updatePositionCoreEngineShakeOriginal','HVsOG','end','Scene_MenuBase_mainAreaHeight','_CoreEngineSettings','_onKeyPress','MultiKeyFmt','_inputSpecialKeyCode','gaugeLineHeight','Game_System_initialize','JrVfc','isTriggered','defineProperty','sruBx','duration','updateClose','EncounterRateMinimum','Script\x20Call\x20Error','ButtonAssist','isTpb','match','helpAreaTop','aMpKB','IDs','obMtQ','value','Control\x20Variables\x20Script\x20Error','hQUdW','IconParam6','_itemWindow','MRF','createSpriteset','isRightInputMode','toLocaleString','BoxMargin','enter','playCursorSound','ImgLoad','resetTextColor','nZKDa','drawText','CIRCUMFLEX','setup','ItemBgType','start','isInstanceOfSceneMap','paramY','F23','yCrNi','createCommandWindow','targetOpacity','EditBgType','_goldWindow','Game_Action_itemEva','buttonAssistKey%1','paramPlus','mDScK','DATABASE','ParseClassNotetags','exp','_repositioned','%1〘Choice\x20%2〙\x20%3%1','Srngd','backgroundBitmap','HOME','SPACE','Map%1','coreEngineRepositionEnemies','setClickHandler','crisisColor','YvQgS','Window_Selectable_drawBackgroundRect','setMute','DEF','updateDocumentTitle','responseText','HNUgg','xScrollLinkedOffset','processPointAnimationRequests','Graphics_defaultStretchMode','MDF','guardSkillId','_digitGroupingEx','titleCommandWindow','_setupEventHandlers','onInputOk','createPointAnimationQueue','ACCEPT','FunctionName','registerCommand','DIVIDE','OutlineColorDmg','qmZdE','ENTER','wgXxA','ctGaugeColor1','PictureCoordinatesMode','RightMenus','Scene_Battle_createSpriteset','_battlerName','isMaskingEnabled','_isPlaytest','OnLoadJS','WIHfP','outlineColor','RequireFocus','_stored_gaugeBackColor','Sprite_destroy','targetSpritePosition','DigitGroupingGaugeSprites','slice','ZinFy','Sprite_AnimationMV_processTimingData','process_VisuMZ_CoreEngine_Notetags','keyMapper','playTestF7','enableDigitGroupingEx','isSmartEventCollisionOn','iHkeX','wholeDuration','WIN_OEM_ENLW','filters','Sprite_Gauge_currentValue','_screenY','DisplayedParams','targetX','bKmJt','buttonAssistText3','_balloonQueue','changeClass','processDigitChange','mJzWY','members','ParseWeaponNotetags','targetContentsOpacity','maxItems','CoreEngine','SceneManager_initialize','isNwjs','SParamVocab7','WIN_ICO_CLEAR','isBottomButtonMode','Game_Screen_initialize','encounterStepsMinimum','processCursorHomeEndTrigger','Show\x20Scrolling\x20Text\x20Script\x20Error','Window_NameInput_refresh','\x0a\x0a\x0a\x0a\x0a','CLOSE_PAREN','INOUTQUAD','ParseEnemyNotetags','NdNwc','requestFauxAnimation','SHIFT','isExpGaugeDrawn','zMQwQ','OUTCUBIC','text','sparam','updateOpen','YwqDg','Input_shouldPreventDefault','pow','(\x5cd+)>','paramValueByName','itypeId','inBattle','Bitmap_resize','xparamFlat2','isSpecialCode','makeDocumentTitle','removeAllFauxAnimations','MAX_SAFE_INTEGER','F15','VCZGZ','Plus2','KeyUnlisted','drawValue','SubfolderParse','fzYMl','NVrAK','ohbsK','_cancelButton','Window_NameInput_cursorPagedown','AAwaY','_active','slotWindowRect','_scene','blt','onDatabaseLoaded','qDqFM','Scene_MenuBase_createBackground','createEnemies','updateAnchor','Graphics_centerElement','_downArrowSprite','startMove','ColorExpGauge2','processFauxAnimationRequests','startNormalGame','HAuTP','skipBranch','oYgSV','QUOTE','param','command357','ioZUK','ALWAYS','isPlaytest','areButtonsHidden','_timerSprite','xparamFlatBonus','_spriteset','restore','pictureButtons','ValueJS','encounterStep','_actorWindow','oHOpW','SlotRect','ExportCurMapText','WgwuD','SCALE_MODES','isOpenAndActive','buttonAssistWindowRect','needsUpdate','_optionsWindow','Scene_Shop_create','setupValueFont','REPLACE','AnimationMirrorOffset','Page','imageSmoothingEnabled','update','onClick','_storedMapText','Scene_Map_createSpriteset','setupNewGame','IconSParam5','gaugeBackColor','IcllK','OptionsBgType','RWTmf','contentsOpacity','ShowDevTools','updateShadow','maxGold','mmp','wqxEd','Spriteset_Base_updatePosition','SkillMenu','_statusParamsWindow','isHandled','XpWTW','left','dsQtp','getLevel','HASH','createBackground','ProfileRect','WIN_OEM_CLEAR','applyEasing','gradientFillRect','IconXParam6','ZZTYm','Window_NameInput_cursorUp','EJzNU','select','processKeyboardBackspace','OUTSINE','VJRFx','CUvCE','RVTOw','snapForBackground','targetScaleX','gVLpl','retrieveFauxAnimation','Sprite_Battler_startMove','processCursorMoveModernControls','Bitmap_drawText','jWfdv','rKCkL','Rate','Enable','Scene_Battle_update','gyJbI','RPGMAKER_VERSION','StartID','createMenuButton','_hideTileShadows','ListBgType','FontShadows','IconSet','bQvzC','VQSEW','iQJvO','WIN_OEM_JUMP','onNameOk','_shakeDuration','darwin','Input_update','send','expRate','Key%1','expGaugeColor2','viewport','344WzBHKd','TimeProgress','IylQs','isPointAnimationPlaying','blockWidth','xbbvR','fXLZK','rightArrowWidth','IconXParam4','_sideButtonLayout','WIN_OEM_PA1','WIN_OEM_ATTN','fromCharCode','_pointAnimationSprites','smallParamFontSize','EVA','drawAllParams','call','updateOrigin','initCoreEasing','fontSize','DigitGroupingDamageSprites','EnableMasking','pjrfp','onKeyDownKeysF6F7','actor','sparamFlat2','Input_onKeyDown','setSideButtonLayout','onEscapeSuccess','rgba(0,\x200,\x200,\x201.0)','createPointAnimation','move','NoTileShadows','clchB','Window_Selectable_cursorDown','updateMain','_battleField','catchUnknownError','mainFontSize','buttonAssistText%1','HRfHI','MmySa','CategoryRect','CustomParamType','paramRate2','IconParam5','_lastY','qowLS','processKeyboardDigitChange','OS_KEY','name','NUM','CLEAR','Qmfhe','clear','drawCharacter','Renderer','toLowerCase','focus','measureTextWidth','_bitmap','loadTitle1','Window_NameInput_cursorLeft','parseForcedGameTroopSettingsCoreEngine','DocumentTitleFmt','Unnamed','Game_Temp_initialize','EVAL','BuyBgType','hideButtonFromView','_coreEasing','TextJS','CreateBattleSystemID','DrawIcons','SsdGT','Spriteset_Base_initialize','original','VisuMZ_2_BattleSystemFTB','Window_EquipItem_isEnabled','XRnKV','showFauxAnimations','Scene_Battle_createCancelButton','min','clamp','MenuBg','mpColor','animationId','DWuAO','Window_NumberInput_start','pagedownShowButton','list','IconXParam5','createPointAnimationSprite','resetBattleSystem','hjCqO','xnwht','StatusParamsRect','kxiMq','yjkbv','CommandWidth','paramchangeTextColor','CommandBgType','inbounce','WIN_OEM_FJ_ROYA','home','ngMCw','ZdbfS','QNgdT','wyTBr','initMembers','1EVrIza','IWMRc','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','randomInt','Game_Picture_show','updateFauxAnimations','hIOHI','mNqTS','UWYzX','alwaysDash','qWwUA','drawActorExpGauge','cursorPageup','faces','GCfiu','setCoreEngineUpdateWindowBg','nzlby','currencyUnit','TextCodeNicknames','WASD','_scaleX','style','TGR','ScaleY','buttonY','GRD','_drawTextBody','(\x5cd+\x5c.?\x5cd+)>','updateDashToggle','jIBYR','process_VisuMZ_CoreEngine_jsQuickFunctions','ARRAYJSON','INOUTQUART','data/','CustomParamIcons','transform','Vcfgw','RFvcD','createButtonAssistWindow','PTB','xparamRateJS','paramFlatBonus','NEAREST','initCoreEngine','KeyItemProtect','setSkill','createCustomParameter','Rate1','Scene_Boot_onDatabaseLoaded','setMoveEasingType','_coreEasingType','Window_Selectable_cursorUp','_shakePower','default','Scene_Boot_startNormalGame','drawGameSubtitle','applyForcedGameTroopSettingsCoreEngine','subtitle','textHeight','Window_ShopSell_isEnabled','ONE_MINUS_SRC_ALPHA','CEV','initBasic','EXECUTE','_shouldPreventDefault','mainCommandWidth','IconXParam9','MDR','SideView','_targetScaleX','loadPicture','Scene_Boot_loadSystemImages','hit','resetFontSettings','exit','bgsVolume','processKeyboardDelete','goldWindowRect','SellBgType','erasePicture','_forcedBattleSys','seVolume','drawItem','parse','NUMPAD1','isGamepadConnected','_stored_maxLvGaugeColor1','Tilemap_addShadow','INBACK','INOUTBACK','_skillTypeWindow','font-smooth','setMainFontSize','setWindowPadding','Spriteset_Battle_createEnemies','Game_Interpreter_PluginCommand','updatePointAnimations','currentLevelExp','gaugeRate','Game_Action_numRepeats','EquipMenu','adTmz','mODFE','INCIRC','ExportStrFromAllMaps','%2%1%3','clearZoom','helpAreaTopSideButtonLayout','menu','cWXIZ','createFauxAnimationSprite','AnimationPoint','537262UtPdVp','drawActorLevel','playTestCtrlT','bTIqo','_margin','aXXGf','powerUpColor','drawCurrencyValue','clearStencil','URL','XParameterFormula','Game_BattlerBase_initMembers','%1\x0a','itemRect','xdg-open','izPIY','areButtonsOutsideMainUI','GoldIcon','IconSParam1','kieHl','applyCoreEasing','actorWindowRect','SwitchRandomizeRange','hWktC','Bzjfh','NumberRect','onButtonImageLoad','ColorManager_loadWindowskin','Scene_MenuBase_createPageButtons','_screenX','moveRelativeToResolutionChange','Chance','_slotWindow','_isWindow','MCR','Origin','zUKca','initialLevel','maxLvGaugeColor1','initButtonHidden','ParseTilesetNotetags','scale','buttonAssistWindowSideRect','IOQfS','F14','itemBackColor2','hiIwW','_stored_pendingColor','xparamPlus','Untitled','Game_Interpreter_command355','hNRCB','DataManager_setupNewGame','PRINT','gainSilentTp','SwitchToggleOne','isMVAnimation','Game_Actor_changeClass','IconParam7','Game_Picture_move','Scene_Base_createWindowLayer','ActorRect','_cache','pictureId','CsnNn','oTHTx','MapOnceParallel','ColorTPCost','background','RIGHT','create','WARNING:\x20%1\x20has\x20already\x20been\x20declared\x0aand\x20cannot\x20be\x20used\x20as\x20a\x20Quick\x20JS\x20Function','FTB','stencilFunc','TILDE','updateMove','jaBUm','qGtXT','isSceneMap','playCancel','STENCIL_TEST','jtdtF','pages','_fauxAnimationQueue','changeTextColor','iugMy','_stored_maxLvGaugeColor2','destroyed','calcCoreEasing','_cacheScaleY','ctrlKey','tilesets','updatePositionCoreEngineShakeVert','processAlwaysEscape','Window_Base_drawCharacter','DrawItemBackgroundJS','toFixed','VisuMZ_1_OptionsCore','maxLevel','nextLevelExp','ColorHPGauge1','backspace','ARRAYNUM','Scene_Title_drawGameTitle','COMMA','getGamepads','addChildToBack','drawGauge','KeyboardInput','WIN_OEM_PA3','PqsTW','MenuLayout','anchorCoreEasing','down2','isAlive','F19','checkCacheKey','createFauxAnimation','GoldBgType','NZwIt','〘Scrolling\x20Text〙\x0a','Bitmap_initialize','width','buttonAssistOffset%1','Flat','drawGoldItemStyle','YbPXp','pQZBL','ALTGR','number','pictures','SEMICOLON','WIN_OEM_CUSEL','rowSpacing','bitmapWidth','PiwVN','iconHeight','QUESTION_MARK','moveCancelButtonSideButtonLayout','refreshDimmerBitmap','canUse','TMrZa','Game_Party_consumeItem','isAnimationForEach','bgm','Sprite_Picture_loadBitmap','isActiveTpb','OptionsMenu','Scene_Item_create','Scene_Base_terminateAnimationClearBugFix','helpAreaHeight','createTextState','InputRect','padZero','CTRL','connected','yCAHv','BgType','Spriteset_Base_destroy','mfUiR','F10','escape','_stored_powerDownColor','_cacheScaleX','_closing','keyRepeatWait','XParamVocab3','MAXMP','asin','FUNC','gSnVH','ejzCy','startShake','QoL','EXR','Game_Picture_calcEasing','LfENM','Bitmap_measureTextWidth','_movementDuration','SkillTypeRect','TitleCommandList','result','none','_centerElementCoreEngine','numRepeats','_clickHandler','_buttonAssistWindow','getBattleSystem','hMvPC','Game_Interpreter_command122','mapId','backOpacity','flush','_numberWindow','drawTextEx','zvYal','EREOF','YxvMw','isWindowMaskingEnabled','playTestF6','PLAY','_stored_expGaugeColor1','ctGaugeColor2','aUWnc','dashToggle','eva','CommonEventID','textWidth','_refreshPauseSign','Plus1','attackSkillId','_commonEventLayers','HNLXL','oZYvZ','〖〖〖\x20Troop\x20%1:\x20%2\x20Script\x20〗〗〗\x0a\x0a','Window_NameInput_initialize','Bitmap_blt','buttonAssistKey1','setBackgroundOpacity','drawIconBySize','format','clearCachedKeys','OutlineColorGauge','Enemy','LINEAR','expGaugeColor1','render','Pixelated','Speed','TCR','Game_Picture_updateMove','lineHeight','SELECT','center','CLOSE_BRACKET','option','advanced','_registerKeyInput','buttonAssistKey2','《《《\x20Page\x20%1\x20》》》\x0a%2\x0a','helpAreaBottom','split','_stored_tpCostColor','smoothSelect','DamageColor','INQUART','NumberBgType','DTB','\x0a\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%2\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20console.log(\x27JS\x20Quick\x20Function\x20\x22%1\x22\x20Error!\x27);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x200;\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20','FZMLu','getButtonAssistLocation','startAutoNewGame','_offsetX','CONTEXT_MENU','Window_NumberInput_processDigitChange','Troop%1','isItem','LXAxI','_targetScaleY','makeFontBigger','F12','Linear','SLASH','_baseTexture','push','setValue','_drawTextShadow','WIN_OEM_PA2','strokeRect','itemWindowRect','EzSIK','PositionJS','MAX_GL_TEXTURES','textColor','_targetOffsetY','Window_Selectable_itemRect','VisuMZ_2_BattleSystemBTB','_muteSound','isClosed','setBackgroundType','OPEN_BRACKET','_animation','Window_Base_drawIcon','ijSpI','isSceneBattle','\x5c}❪SHIFT❫\x5c{','2557702jBXGcq','paramWidth','isFauxAnimationPlaying','_lastOrigin','add','Window_NameInput_cursorRight','AGI','ActorBgType','SideButtons','CXsZZ','padding','pagedown','createCancelButton','length','Bitmap_drawTextOutline','kAbgR','_lastPluginCommandInterpreter','_dimmerSprite','FadeSpeed','WughH','nickname','updateLastTarget','MODECHANGE','useFontWidthFix','poCGb','Game_Action_itemHit','Scene_Map_createMenuButton','NameInputMessage','top','tqCDP','forceStencil','exportAllTroopStrings','runCombinedScrollingTextAsCode','NUMPAD4','optionsWindowRect','buttonAssistText5','startAnimation','BattleManager_processEscape','SystemSetWindowPadding','GetParamIcon','XParamVocab0','isMenuButtonAssistEnabled','F11','context','SmartEventCollisionPriority','description','loadBitmap','Sprite_Actor_setActorHome','currentValue','IcAnA','alpha','fillRect','textAlign','itemHitImprovedAccuracy','mpGaugeColor2','paramFlatJS','ARRAYSTRUCT','jmRPj','dfHYr','SystemSetBattleSystem','caiFJ','ExportAllTroopText','terms','ColorMPCost','onXhrError','horizontal','win32','Game_Picture_y','isGamepadButtonPressed','getPointAnimationLayer','stringKeyMap','type','createPointAnimationTargets','gFUiq','WIN_OEM_FJ_TOUROKU','boxHeight','cMGAu','GMoXd','BACKSPACE','WIN_OEM_RESET','WIN_ICO_00','CRI','randomJS','8021470MVFTdn','LESS_THAN','ConvertParams','drawParamText','_pictureCoordinatesMode','qApuf','markCoreEngineModified','faceHeight','drawTextTopAligned','sqrt','INSERT','PHA','Max','Bitmap_strokeRect','AcZjI','text%1','_refreshArrows','_internalTextures','_currentMap','ParamArrow','_pagedownButton','JZRyt','paramMax','X:\x20%1','_hp','ItemHeight','innerHeight','tab','titles2','EnableNameInput','overrideMimeType','removeChild','Window_Selectable_processCursorMove','buttonAssistOffset3','MJwlC','paramFlat','MPgKS','_pageupButton','paramName','SuPrY','GfyfE','playEscape','NUMPAD0','xparamFlatJS','commandWindowRows','cursorRight','Game_Interpreter_updateWaitMode','zqkhD','Spriteset_Base_update','NewGameCommonEvent','makeCommandList','STR','NUMPAD5','Lycja','_effectsContainer','SEPARATOR','removeFauxAnimation','_stored_ctGaugeColor1','vVUuK','_opacity','HluGX','ARRAYSTR','SParamVocab0','remove','OUTEXPO','targetObjects','ColorTPGauge1','VisuMZ_2_BattleSystemOTB','RevertPreserveNumbers','setupFont','StatusEquipBgType','QwertyLayout','currentClass','VOLUME_UP','processHandling','SellRect','isDying','stretch','PzZpK','Sprite_Gauge_gaugeRate','resize','ENTER_SPECIAL','updateScene','IconSParam6','drawBackgroundRect','updateOnceParallelInterpreters','statusParamsWindowRect','integer','IconXParam7','cursorDown','_destroyInternalTextures','ExtJS','TextStr','BattleSystem','srhGU','PLJLZ','font','playOk','IconXParam1','item','openness','GYQRX','PixelateImageRendering','enableDigitGrouping','innerWidth','Keyboard','kaxDp','process_VisuMZ_CoreEngine_Functions','CommandList','ModernControls','_dummyWindow','Manual','aFsAe','setEasingType','QzSRd','drawCircle','itemEva','loadSystemImages','Plus','NUMPAD2','tExpK','img/%1/','buttonAssistWindowButtonRect','F6key','normal','isEnabled','Game_Event_isCollidedWithEvents','ItemMenu','updatePositionCoreEngineShakeHorz','STB','_colorCache','WXwHO','drawSegment','EFtGZ','TRAIT_PARAM','rioYo','EXSEL','clearRect','toUpperCase','pixelated','buttonAssistOffset4','setColorTone','fadeSpeed','Wait','getInputMultiButtonStrings','tileWidth','isKeyItem','PERIOD','_changingClass','EscapeAlways','_moveEasingType','ASTERISK','_context','show','gameTitle','setViewport','Bitmap_gradientFillRect','foHYM','yowlh','〖〖〖\x20Map\x20%1:\x20%2\x20Script\x20〗〗〗\x0a\x0a','qGTmF','ScreenShake','updatePositionCoreEngine','hide','nw.gui','fruZE','Location','IconParam4','HRG','targetY','DOUBLE_QUOTE','_backgroundFilter','stencilOp','Sprite_Button_updateOpacity','picture','REC','ForceNoPlayTest','MUvFI','PxKHa','cursorPagedown','MbocV','ParamName','_animationQueue','TextFmt','ColorMaxLvGauge1','dDQps','charAt','_drawTextOutline','platform','statusEquipWindowRect','yoOad','openURL','_stored_ctGaugeColor2','faceWidth','titles1','indexOf','_targetY','_paramPlus','adwPW','createTitleButtons','isItemStyle','bZeiK','anchor','setLastPluginCommandInterpreter','isBusy','Vldjz','OPEN_CURLY_BRACKET','sparamRate1','volume','addWindow','Game_Map_setup','NUMPAD8','isPlaying','_customModified','_height','JXGva','drawCurrentParam','ShopMenu','tuUiq','scnuS','wmeVg','SParamVocab3','HelpBgType','RepositionEnemies','Settings','INOUTCUBIC','EditRect','_targetAnchor','updateEffekseer','onerror','VisuMZ_2_BattleSystemETB','yxBBu','Bitmap_drawCircle','loCYu','animationNextDelay','MamIl','worldTransform','twQjr','isCancelled','Window_Base_initialize','evade','catchException','paramBase','updateOpacity','isSideView','VwAhN','numberShowButton','isCollidedWithEvents','bAfhd','EFesV','origin','constructor','ColorMaxLvGauge2','RegExp','rNRCJ','addOnceParallelInterpreter','isActor','gYaTq','isBottomHelpMode','BACK_QUOTE','Exported_Script_%1.txt','makeActionList','_opening','OHNmv','ExtractStrFromTroop','dimColor1','missed','yJEVz','STRUCT','removePointAnimation','loadTitle2','outlineColorDmg','isCursorMovable','_index','refresh','Input_clear','isSideButtonLayout','UpdatePictureCoordinates','NYTpe','VOLUME_DOWN','_realScale','vqkyo','sparamPlus','bSUob','IdofC','onInputBannedWords','Scene_Map_updateMainMultiply','SwitchActorText','GameEnd','eventsXyNt','PERCENT','SParameterFormula','INOUTBOUNCE','nqFBl','rgba(0,\x200,\x200,\x200.7)','ParseStateNotetags','FontSmoothing','joGzt','sparamRateJS','IZpMu','VisuMZ_2_BattleSystemSTB','learnings','GET','_menuButton','join','emjzr','SystemSetSideView','key%1','JXsmJ','displayX','catchNormalError','yorHc','Window_Base_update','uTeLm','aFtZE','blendFunc','IconSParam3','IconSParam7','updateData','Rate2','mirror','getCombinedScrollingText','DimColor2','WbELd','gold','isMagical','Mirror','cursorUp','ceil','_inputWindow','Window_NameInput_processTouch','ImprovedAccuracySystem','isEnemy','sin','INELASTIC','loadGameImagesCoreEngine','ParseAllNotetags','drawIcon','_backSprite2','damageColor','Type','vBwXK','AbPsg','nKtaE','isAnimationOffsetXMirrored','CJiaT','IHFrK','clearOnceParallelInterpreters','contents','KEEP','waiting','ExtDisplayedParams','initialize','setAction','ExtractStrFromMap','EQUALS','RKAII','EnableJS','playBuzzer','dxQQY','log','HYPHEN_MINUS','_fauxAnimationSprites','originalJS','AccuracyBoost','ZERO','pGRGZ','isNumpadPressed','F7key','helpWindowRect','events','shqhI','_statusEquipWindow','Sprite_Picture_updateOrigin','createChildSprite','zZEOa','updatePictureCoordinates','updatePictureAntiZoom','7292voAljx','ApplyEasing','save','repositionEnemiesByResolution','PictureShowIcon','_number','_coreEngineShakeStyle','INQUAD','ARRAYFUNC','nXzAi','Window_Base_drawText','cJagB','zrwMs','processTouch','atbActive','BTestAddedQuantity','processMoveCommand','STENCIL_BUFFER_BIT','ARRAYEVAL','command111','Scene_Map_initialize','showDevTools','keyboard','FontSize','battlebacks1','sparamFlat1','NewGameBoot','CallHandlerJS','adjustBoxSize','isPressed','ItemBackColor2','onload','command355','CLOSE_CURLY_BRACKET','animations','XParamVocab4','0.00','cursorLeft','Window_Gold_refresh','AllMaps','QoJOm','DOLLAR','RowSpacing','IconIndex','windowOpacity','enemy','updatePadding','redraw','NUlKH','ItemRect','reduce','SystemLoadAudio','InputBgType','Padding','CxwVf','_mode','EQUAL','_buyWindow','zLOlG','PRESERVCONVERSION(%1)','_clientArea','repeat','drawRightArrow','Scene_Status_create','INOUTEXPO','ExportAllMapText','offsetX','_digitGrouping','setupCoreEngine','Scene_MenuBase_mainAreaTop','itemLineRect','BuyRect','_windowskin','ShowJS','process_VisuMZ_CoreEngine_CustomParameters','playLoad','isNextScene','xparamRate1','Basic','buttonAssistOffset1','PGUP','GoldRect','version','VisuMZ\x20CoreEngine\x20PictureIcon\x20%1\x20%2','Power','JSON','canEquip','ETB','EXCLAMATION','image-rendering','Symbol','MEV','levelUpRecovery','SParamVocab9','fillStyle','765HBoIBs','_statusWindow','ItemPadding','LEFT','_forcedTroopView','subject','UmjZW','Bitmap_fillRect','jvvrS','jpgRM','MIN_SAFE_INTEGER','Game_Interpreter_command105','itemSuccessRate','ListRect','ESC','_pollGamepads','WIN_OEM_COPY','ButtonFadeSpeed','Input_pollGamepads','235hAsJIQ','addLoadListener','alphabetic','Game_BattlerBase_refresh'];_0xaee0=function(){return _0x137a8e;};return _0xaee0();}Game_OnceParallelInterpreter[_0x59226c(0x7bf)]=Object[_0x59226c(0x4a2)](Game_Interpreter[_0x59226c(0x7bf)]),Game_OnceParallelInterpreter[_0x59226c(0x7bf)][_0x59226c(0x6c8)]=Game_OnceParallelInterpreter,Game_OnceParallelInterpreter[_0x59226c(0x7bf)]['setCommonEvent']=function(_0x1f6fd8){const _0x4b1b91=_0x59226c,_0x5c36fd=$dataCommonEvents[_0x1f6fd8];if(_0x5c36fd){if(_0x4b1b91(0x5f4)===_0x4b1b91(0x5f4))this[_0x4b1b91(0x275)](_0x5c36fd[_0x4b1b91(0x3d8)],0x0);else return _0xd5a73(_0x323555['$1']);}else{if('nPMXO'!==_0x4b1b91(0x8ff))return this['_lastPluginCommandInterpreter'];else this['terminate']();}},Game_OnceParallelInterpreter[_0x59226c(0x7bf)][_0x59226c(0x916)]=function(){const _0x1b2cc2=_0x59226c;if(!SceneManager[_0x1b2cc2(0x4aa)]())return;SceneManager['_scene'][_0x1b2cc2(0x1d2)](this),Game_Interpreter[_0x1b2cc2(0x7bf)]['terminate'][_0x1b2cc2(0x38e)](this);},VisuMZ[_0x59226c(0x2d3)]['Scene_MenuBase_helpAreaTop']=Scene_MenuBase[_0x59226c(0x7bf)][_0x59226c(0x260)],Scene_MenuBase['prototype'][_0x59226c(0x260)]=function(){const _0x3d4f69=_0x59226c;let _0x3f4f0b=0x0;return SceneManager[_0x3d4f69(0x46c)]()?_0x3f4f0b=this[_0x3d4f69(0x457)]():_0x3f4f0b=VisuMZ[_0x3d4f69(0x2d3)]['Scene_MenuBase_helpAreaTop']['call'](this),this[_0x3d4f69(0x5a3)]()&&this['getButtonAssistLocation']()==='top'&&(_0x3f4f0b+=Window_ButtonAssist[_0x3d4f69(0x7bf)][_0x3d4f69(0x543)]()),_0x3f4f0b;},Scene_MenuBase[_0x59226c(0x7bf)][_0x59226c(0x457)]=function(){const _0x111dac=_0x59226c;if(this['isBottomHelpMode']()){if(_0x111dac(0x883)==='WwtSc')_0x4b4a21[_0x111dac(0x773)]?this['backOpacity']=_0x1c0e0e['windowOpacity']():this['backOpacity']=_0x31e1ed['CoreEngine']['Settings']['Window'][_0x111dac(0x826)];else return this[_0x111dac(0x1a9)]();}else return _0x111dac(0x39f)!==_0x111dac(0x1cc)?0x0:!![];},VisuMZ['CoreEngine'][_0x59226c(0x78c)]=Scene_MenuBase[_0x59226c(0x7bf)][_0x59226c(0x836)],Scene_MenuBase[_0x59226c(0x7bf)][_0x59226c(0x836)]=function(){const _0x3f4aa2=_0x59226c;if(SceneManager[_0x3f4aa2(0x46c)]())return this[_0x3f4aa2(0x96c)]();else{if(_0x3f4aa2(0x911)!==_0x3f4aa2(0x35e))return VisuMZ[_0x3f4aa2(0x2d3)]['Scene_MenuBase_mainAreaTop']['call'](this);else{const _0x406fe2=_0x36bc5f['encounterStep']();this[_0x3f4aa2(0x83c)]=_0x3688ae[_0x3f4aa2(0x3ef)](_0x406fe2)+_0x420c3b[_0x3f4aa2(0x3ef)](_0x406fe2)+this[_0x3f4aa2(0x2da)]();}}},Scene_MenuBase[_0x59226c(0x7bf)][_0x59226c(0x96c)]=function(){const _0x3eecd5=_0x59226c;if(!this[_0x3eecd5(0x6cf)]()){if('CoYOi'===_0x3eecd5(0x263)){if(_0x18956d[_0x3eecd5(0x5d1)]!==_0x44e3b0)return _0x1cd533['CoreEngine'][_0x3eecd5(0x6e2)]();return _0xe689a3[_0x3eecd5(0x2d3)][_0x3eecd5(0x5fb)]['call'](this);}else return this[_0x3eecd5(0x54c)]();}else return 0x0;},VisuMZ[_0x59226c(0x2d3)][_0x59226c(0x24e)]=Scene_MenuBase[_0x59226c(0x7bf)][_0x59226c(0x890)],Scene_MenuBase[_0x59226c(0x7bf)]['mainAreaHeight']=function(){const _0x2b9704=_0x59226c;let _0xe65282=0x0;if(SceneManager[_0x2b9704(0x46c)]()){if(_0x2b9704(0x3cd)!=='jwNsM')_0xe65282=this['mainAreaHeightSideButtonLayout']();else{var _0x20f9bd=_0x4c8098(_0x538727['$1']);try{_0x311d26+=_0xe57f42(_0x20f9bd);}catch(_0x1b4792){if(_0x406ad4[_0x2b9704(0x31b)]())_0x56405c[_0x2b9704(0x735)](_0x1b4792);}}}else _0xe65282=VisuMZ['CoreEngine'][_0x2b9704(0x24e)][_0x2b9704(0x38e)](this);return this[_0x2b9704(0x5a3)]()&&this[_0x2b9704(0x556)]()!==_0x2b9704(0x8d0)&&(_0xe65282-=Window_ButtonAssist[_0x2b9704(0x7bf)][_0x2b9704(0x543)]()),_0xe65282;},Scene_MenuBase['prototype']['mainAreaHeightSideButtonLayout']=function(){const _0x3d01e3=_0x59226c;return Graphics[_0x3d01e3(0x5c5)]-this['helpAreaHeight']();},VisuMZ['CoreEngine'][_0x59226c(0x30a)]=Scene_MenuBase[_0x59226c(0x7bf)][_0x59226c(0x34d)],Scene_MenuBase[_0x59226c(0x7bf)]['createBackground']=function(){const _0x3f06c8=_0x59226c;this[_0x3f06c8(0x678)]=new PIXI[(_0x3f06c8(0x2c4))]['BlurFilter'](clamp=!![]),this['_backgroundSprite']=new Sprite(),this[_0x3f06c8(0x876)]['bitmap']=SceneManager[_0x3f06c8(0x28a)](),this[_0x3f06c8(0x876)][_0x3f06c8(0x2c4)]=[this[_0x3f06c8(0x678)]],this[_0x3f06c8(0x83f)](this[_0x3f06c8(0x876)]),this['setBackgroundOpacity'](0xc0),this[_0x3f06c8(0x536)](this[_0x3f06c8(0x8d4)]()),this[_0x3f06c8(0x1f4)]();},Scene_MenuBase[_0x59226c(0x7bf)][_0x59226c(0x8d4)]=function(){const _0x4b5745=_0x59226c,_0x35fb2a=String(this[_0x4b5745(0x6c8)]['name']),_0x4b8708=this[_0x4b5745(0x232)](_0x35fb2a);return _0x4b8708?_0x4b8708['SnapshotOpacity']:0xc0;},Scene_MenuBase['prototype'][_0x59226c(0x1f4)]=function(){const _0x4f936c=_0x59226c,_0x134d88=String(this[_0x4f936c(0x6c8)]['name']),_0x200d70=this[_0x4f936c(0x232)](_0x134d88);_0x200d70&&(_0x200d70[_0x4f936c(0x850)]!==''||_0x200d70['BgFilename2']!=='')&&(_0x4f936c(0x46f)===_0x4f936c(0x6fe)?this[_0x4f936c(0x43c)]=0x0:(this[_0x4f936c(0x7d5)]=new Sprite(ImageManager[_0x4f936c(0x3bb)](_0x200d70[_0x4f936c(0x850)])),this[_0x4f936c(0x71f)]=new Sprite(ImageManager[_0x4f936c(0x6db)](_0x200d70['BgFilename2'])),this[_0x4f936c(0x83f)](this[_0x4f936c(0x7d5)]),this['addChild'](this['_backSprite2']),this[_0x4f936c(0x7d5)]['bitmap'][_0x4f936c(0x7ba)](this['adjustSprite'][_0x4f936c(0x938)](this,this['_backSprite1'])),this[_0x4f936c(0x71f)][_0x4f936c(0x22a)][_0x4f936c(0x7ba)](this[_0x4f936c(0x7c1)]['bind'](this,this['_backSprite2']))));},Scene_MenuBase[_0x59226c(0x7bf)][_0x59226c(0x232)]=function(_0x211fed){const _0x3d8b90=_0x59226c;return VisuMZ['CoreEngine'][_0x3d8b90(0x6ad)][_0x3d8b90(0x3d2)][_0x211fed]||VisuMZ[_0x3d8b90(0x2d3)][_0x3d8b90(0x6ad)][_0x3d8b90(0x3d2)]['Scene_Unlisted'];},Scene_MenuBase['prototype'][_0x59226c(0x7c1)]=function(_0x4c51a7){const _0x54e66e=_0x59226c;this[_0x54e66e(0x880)](_0x4c51a7),this['centerSprite'](_0x4c51a7);},VisuMZ[_0x59226c(0x2d3)]['Scene_MenuBase_createCancelButton']=Scene_MenuBase['prototype']['createCancelButton'],Scene_MenuBase[_0x59226c(0x7bf)][_0x59226c(0x586)]=function(){const _0x2c775e=_0x59226c;VisuMZ[_0x2c775e(0x2d3)]['Scene_MenuBase_createCancelButton'][_0x2c775e(0x38e)](this),SceneManager[_0x2c775e(0x6e1)]()&&this['moveCancelButtonSideButtonLayout']();},Scene_MenuBase['prototype'][_0x59226c(0x4e6)]=function(){const _0x4190e2=_0x59226c;this[_0x4190e2(0x301)]['x']=Graphics['boxWidth']+0x4;},VisuMZ[_0x59226c(0x2d3)][_0x59226c(0x478)]=Scene_MenuBase['prototype'][_0x59226c(0x8c1)],Scene_MenuBase['prototype']['createPageButtons']=function(){const _0x22b0e0=_0x59226c;VisuMZ['CoreEngine'][_0x22b0e0(0x478)][_0x22b0e0(0x38e)](this);if(SceneManager['isSideButtonLayout']()){if(_0x22b0e0(0x411)===_0x22b0e0(0x411))this[_0x22b0e0(0x840)]();else return _0xdfbabb[_0x22b0e0(0x957)][_0x22b0e0(0x7b3)][_0x22b0e0(0x38e)](this);}},Scene_MenuBase['prototype'][_0x59226c(0x840)]=function(){const _0x28deb9=_0x59226c;this['_pageupButton']['x']=-0x1*(this[_0x28deb9(0x5f2)][_0x28deb9(0x4d6)]+this[_0x28deb9(0x5e1)]['width']+0x8),this['_pagedownButton']['x']=-0x1*(this['_pagedownButton'][_0x28deb9(0x4d6)]+0x4);},Scene_MenuBase['prototype'][_0x59226c(0x5a3)]=function(){const _0x58d572=_0x59226c;return VisuMZ[_0x58d572(0x2d3)][_0x58d572(0x6ad)][_0x58d572(0x25d)][_0x58d572(0x366)];},Scene_MenuBase[_0x59226c(0x7bf)][_0x59226c(0x556)]=function(){const _0x5215e4=_0x59226c;return SceneManager[_0x5215e4(0x6e1)]()||SceneManager['areButtonsHidden']()?VisuMZ[_0x5215e4(0x2d3)][_0x5215e4(0x6ad)][_0x5215e4(0x25d)][_0x5215e4(0x673)]:_0x5215e4(0x5f1)===_0x5215e4(0x5f1)?_0x5215e4(0x8d0):_0x31d053[_0x5215e4(0x2d3)][_0x5215e4(0x6e2)]();},Scene_MenuBase['prototype'][_0x59226c(0x412)]=function(){const _0x13b805=_0x59226c;if(!this[_0x13b805(0x5a3)]())return;const _0x441294=this[_0x13b805(0x32b)]();this[_0x13b805(0x516)]=new Window_ButtonAssist(_0x441294),this[_0x13b805(0x69e)](this[_0x13b805(0x516)]);},Scene_MenuBase[_0x59226c(0x7bf)][_0x59226c(0x32b)]=function(){const _0x588c63=_0x59226c;if(this[_0x588c63(0x556)]()===_0x588c63(0x8d0))return _0x588c63(0x45f)!==_0x588c63(0x1eb)?this[_0x588c63(0x647)]():_0xc48fd7[_0x588c63(0x957)][_0x588c63(0x8dc)][_0x588c63(0x38e)](this);else{if('CBNwj'!==_0x588c63(0x830))return this[_0x588c63(0x486)]();else{if(_0xd5dc8e)this[_0x588c63(0x395)](_0x1298bb);_0x221cc7[_0x588c63(0x2d3)][_0x588c63(0x1c7)]['call'](this,_0x3b22ff);}}},Scene_MenuBase[_0x59226c(0x7bf)][_0x59226c(0x647)]=function(){const _0x201d67=_0x59226c,_0x9b76f2=ConfigManager[_0x201d67(0x242)]?(Sprite_Button[_0x201d67(0x7bf)][_0x201d67(0x381)]()+0x6)*0x2:0x0,_0x2f6a45=this[_0x201d67(0x404)](),_0x5a0e38=Graphics[_0x201d67(0x8bc)]-_0x9b76f2*0x2,_0x168be6=this['buttonAreaHeight']();return new Rectangle(_0x9b76f2,_0x2f6a45,_0x5a0e38,_0x168be6);},Scene_MenuBase[_0x59226c(0x7bf)]['buttonAssistWindowSideRect']=function(){const _0x2624c7=_0x59226c,_0x34e1f7=Graphics[_0x2624c7(0x8bc)],_0xbb0e66=Window_ButtonAssist[_0x2624c7(0x7bf)][_0x2624c7(0x543)](),_0x2e7dcd=0x0;let _0x12f89d=0x0;return this['getButtonAssistLocation']()===_0x2624c7(0x596)?_0x12f89d=0x0:_0x12f89d=Graphics[_0x2624c7(0x5c5)]-_0xbb0e66,new Rectangle(_0x2e7dcd,_0x12f89d,_0x34e1f7,_0xbb0e66);},Scene_Menu['layoutSettings']=VisuMZ['CoreEngine'][_0x59226c(0x6ad)][_0x59226c(0x4cb)]['MainMenu'],VisuMZ[_0x59226c(0x2d3)]['Scene_Menu_create']=Scene_Menu['prototype'][_0x59226c(0x4a2)],Scene_Menu[_0x59226c(0x7bf)][_0x59226c(0x4a2)]=function(){const _0x3f2261=_0x59226c;VisuMZ['CoreEngine']['Scene_Menu_create'][_0x3f2261(0x38e)](this),this['setCoreEngineUpdateWindowBg']();},Scene_Menu[_0x59226c(0x7bf)][_0x59226c(0x3fb)]=function(){const _0x81216a=_0x59226c;this[_0x81216a(0x81a)]&&this[_0x81216a(0x81a)][_0x81216a(0x573)](Scene_Menu[_0x81216a(0x957)][_0x81216a(0x3e3)]),this[_0x81216a(0x27f)]&&this[_0x81216a(0x27f)][_0x81216a(0x573)](Scene_Menu[_0x81216a(0x957)][_0x81216a(0x4d2)]),this[_0x81216a(0x7a7)]&&('RWTmf'===_0x81216a(0x33d)?this[_0x81216a(0x7a7)]['setBackgroundType'](Scene_Menu['layoutSettings'][_0x81216a(0x94a)]):(this[_0x81216a(0x74c)]=_0x474a28(_0x595344(this['_number'])['substring'](0x1)),this[_0x81216a(0x74c)]=_0x4e8366[_0x81216a(0x228)](0x0,this[_0x81216a(0x74c)]),_0x57ed2c[_0x81216a(0x3b4)](),this['refresh'](),_0x337e52[_0x81216a(0x907)](),this[_0x81216a(0x356)](this[_0x81216a(0x841)]-0x1)));},Scene_Menu['prototype'][_0x59226c(0x1c0)]=function(){const _0x5b0387=_0x59226c;return Scene_Menu[_0x5b0387(0x957)][_0x5b0387(0x839)][_0x5b0387(0x38e)](this);},Scene_Menu[_0x59226c(0x7bf)][_0x59226c(0x439)]=function(){const _0x520301=_0x59226c;return Scene_Menu[_0x520301(0x957)][_0x520301(0x798)][_0x520301(0x38e)](this);},Scene_Menu[_0x59226c(0x7bf)]['statusWindowRect']=function(){const _0xc9c453=_0x59226c;return Scene_Menu[_0xc9c453(0x957)][_0xc9c453(0x91d)][_0xc9c453(0x38e)](this);},Scene_Item[_0x59226c(0x957)]=VisuMZ[_0x59226c(0x2d3)][_0x59226c(0x6ad)][_0x59226c(0x4cb)][_0x59226c(0x64c)],VisuMZ[_0x59226c(0x2d3)][_0x59226c(0x4f0)]=Scene_Item[_0x59226c(0x7bf)]['create'],Scene_Item[_0x59226c(0x7bf)][_0x59226c(0x4a2)]=function(){const _0xa7ca36=_0x59226c;VisuMZ[_0xa7ca36(0x2d3)][_0xa7ca36(0x4f0)][_0xa7ca36(0x38e)](this),this['setCoreEngineUpdateWindowBg']();},Scene_Item[_0x59226c(0x7bf)][_0x59226c(0x3fb)]=function(){const _0x2393ae=_0x59226c;if(this['_helpWindow']){if(_0x2393ae(0x353)!==_0x2393ae(0x353)){const _0x4960df=this[_0x2393ae(0x1c0)]();this['_commandWindow']=new _0xcdc8b6(_0x4960df),this[_0x2393ae(0x81a)][_0x2393ae(0x8a4)]('cancel',this[_0x2393ae(0x83d)][_0x2393ae(0x938)](this)),this[_0x2393ae(0x69e)](this[_0x2393ae(0x81a)]),this['_commandWindow'][_0x2393ae(0x573)](_0x3a1901[_0x2393ae(0x957)]['CommandBgType']);}else this['_helpWindow'][_0x2393ae(0x573)](Scene_Item['layoutSettings'][_0x2393ae(0x6ab)]);}if(this[_0x2393ae(0x244)]){if(_0x2393ae(0x4a9)!==_0x2393ae(0x4a9))return _0x4e19eb[_0x2393ae(0x2d3)]['Settings']['UI'][_0x2393ae(0x58c)];else this[_0x2393ae(0x244)][_0x2393ae(0x573)](Scene_Item['layoutSettings']['CategoryBgType']);}this[_0x2393ae(0x268)]&&this[_0x2393ae(0x268)]['setBackgroundType'](Scene_Item[_0x2393ae(0x957)][_0x2393ae(0x276)]),this[_0x2393ae(0x324)]&&this[_0x2393ae(0x324)]['setBackgroundType'](Scene_Item['layoutSettings']['ActorBgType']);},Scene_Item['prototype'][_0x59226c(0x73e)]=function(){const _0x346d2c=_0x59226c;return Scene_Item[_0x346d2c(0x957)]['HelpRect'][_0x346d2c(0x38e)](this);},Scene_Item[_0x59226c(0x7bf)]['categoryWindowRect']=function(){const _0x15bfc3=_0x59226c;return Scene_Item[_0x15bfc3(0x957)][_0x15bfc3(0x3a8)][_0x15bfc3(0x38e)](this);},Scene_Item[_0x59226c(0x7bf)][_0x59226c(0x569)]=function(){const _0x191d55=_0x59226c;return Scene_Item['layoutSettings'][_0x191d55(0x778)][_0x191d55(0x38e)](this);},Scene_Item[_0x59226c(0x7bf)][_0x59226c(0x471)]=function(){const _0x195677=_0x59226c;return Scene_Item[_0x195677(0x957)][_0x195677(0x499)][_0x195677(0x38e)](this);},Scene_Skill[_0x59226c(0x957)]=VisuMZ[_0x59226c(0x2d3)][_0x59226c(0x6ad)][_0x59226c(0x4cb)][_0x59226c(0x345)],VisuMZ['CoreEngine']['Scene_Skill_create']=Scene_Skill[_0x59226c(0x7bf)][_0x59226c(0x4a2)],Scene_Skill['prototype'][_0x59226c(0x4a2)]=function(){const _0x3728d3=_0x59226c;VisuMZ['CoreEngine']['Scene_Skill_create'][_0x3728d3(0x38e)](this),this['setCoreEngineUpdateWindowBg']();},Scene_Skill[_0x59226c(0x7bf)][_0x59226c(0x3fb)]=function(){const _0x5370f6=_0x59226c;this['_helpWindow']&&this[_0x5370f6(0x8e8)][_0x5370f6(0x573)](Scene_Skill[_0x5370f6(0x957)]['HelpBgType']);this[_0x5370f6(0x446)]&&(_0x5370f6(0x85a)==='hknBy'?this[_0x5370f6(0x446)][_0x5370f6(0x573)](Scene_Skill['layoutSettings'][_0x5370f6(0x7f1)]):this[_0x5370f6(0x571)]=_0x1511ce);this[_0x5370f6(0x7a7)]&&this[_0x5370f6(0x7a7)][_0x5370f6(0x573)](Scene_Skill[_0x5370f6(0x957)][_0x5370f6(0x94a)]);if(this[_0x5370f6(0x268)]){if(_0x5370f6(0x5b3)!==_0x5370f6(0x5b3))return _0x279383(_0x1d6e4e)['toLocaleString'](_0x2df6f1,_0x5b5e0d);else this[_0x5370f6(0x268)][_0x5370f6(0x573)](Scene_Skill[_0x5370f6(0x957)]['ItemBgType']);}this[_0x5370f6(0x324)]&&this['_actorWindow'][_0x5370f6(0x573)](Scene_Skill[_0x5370f6(0x957)][_0x5370f6(0x581)]);},Scene_Skill[_0x59226c(0x7bf)][_0x59226c(0x73e)]=function(){const _0x5cbb71=_0x59226c;return Scene_Skill[_0x5cbb71(0x957)][_0x5cbb71(0x8dc)][_0x5cbb71(0x38e)](this);},Scene_Skill['prototype'][_0x59226c(0x236)]=function(){const _0x4961f6=_0x59226c;return Scene_Skill[_0x4961f6(0x957)][_0x4961f6(0x50f)][_0x4961f6(0x38e)](this);},Scene_Skill[_0x59226c(0x7bf)][_0x59226c(0x1df)]=function(){const _0xc92a71=_0x59226c;return Scene_Skill[_0xc92a71(0x957)][_0xc92a71(0x91d)][_0xc92a71(0x38e)](this);},Scene_Skill[_0x59226c(0x7bf)][_0x59226c(0x569)]=function(){const _0x331a66=_0x59226c;return Scene_Skill[_0x331a66(0x957)][_0x331a66(0x778)]['call'](this);},Scene_Skill['prototype'][_0x59226c(0x471)]=function(){const _0x3b3268=_0x59226c;return Scene_Skill[_0x3b3268(0x957)][_0x3b3268(0x499)]['call'](this);},Scene_Equip[_0x59226c(0x957)]=VisuMZ[_0x59226c(0x2d3)][_0x59226c(0x6ad)][_0x59226c(0x4cb)][_0x59226c(0x450)],VisuMZ[_0x59226c(0x2d3)]['Scene_Equip_create']=Scene_Equip[_0x59226c(0x7bf)][_0x59226c(0x4a2)],Scene_Equip[_0x59226c(0x7bf)][_0x59226c(0x4a2)]=function(){const _0x169d3b=_0x59226c;VisuMZ[_0x169d3b(0x2d3)][_0x169d3b(0x953)][_0x169d3b(0x38e)](this),this[_0x169d3b(0x3fb)]();},Scene_Equip[_0x59226c(0x7bf)][_0x59226c(0x3fb)]=function(){const _0x3319af=_0x59226c;this[_0x3319af(0x8e8)]&&this['_helpWindow'][_0x3319af(0x573)](Scene_Equip[_0x3319af(0x957)][_0x3319af(0x6ab)]);this[_0x3319af(0x7a7)]&&this[_0x3319af(0x7a7)][_0x3319af(0x573)](Scene_Equip['layoutSettings']['StatusBgType']);this[_0x3319af(0x81a)]&&this[_0x3319af(0x81a)]['setBackgroundType'](Scene_Equip[_0x3319af(0x957)]['CommandBgType']);this['_slotWindow']&&this['_slotWindow'][_0x3319af(0x573)](Scene_Equip[_0x3319af(0x957)][_0x3319af(0x923)]);if(this['_itemWindow']){if(_0x3319af(0x3fa)!==_0x3319af(0x3fa))return this[_0x3319af(0x81a)]['maxItems']();else this[_0x3319af(0x268)][_0x3319af(0x573)](Scene_Equip[_0x3319af(0x957)][_0x3319af(0x276)]);}},Scene_Equip[_0x59226c(0x7bf)][_0x59226c(0x73e)]=function(){const _0x3ffc72=_0x59226c;return Scene_Equip[_0x3ffc72(0x957)][_0x3ffc72(0x8dc)][_0x3ffc72(0x38e)](this);},Scene_Equip[_0x59226c(0x7bf)][_0x59226c(0x1df)]=function(){const _0x341359=_0x59226c;return Scene_Equip[_0x341359(0x957)]['StatusRect']['call'](this);},Scene_Equip['prototype'][_0x59226c(0x1c0)]=function(){const _0x4036a2=_0x59226c;return Scene_Equip[_0x4036a2(0x957)][_0x4036a2(0x839)][_0x4036a2(0x38e)](this);},Scene_Equip[_0x59226c(0x7bf)][_0x59226c(0x305)]=function(){const _0x169b5c=_0x59226c;return Scene_Equip[_0x169b5c(0x957)][_0x169b5c(0x326)][_0x169b5c(0x38e)](this);},Scene_Equip[_0x59226c(0x7bf)][_0x59226c(0x569)]=function(){const _0xf96faf=_0x59226c;return Scene_Equip['layoutSettings'][_0xf96faf(0x778)][_0xf96faf(0x38e)](this);},Scene_Status[_0x59226c(0x957)]=VisuMZ['CoreEngine'][_0x59226c(0x6ad)][_0x59226c(0x4cb)]['StatusMenu'],VisuMZ[_0x59226c(0x2d3)][_0x59226c(0x786)]=Scene_Status[_0x59226c(0x7bf)][_0x59226c(0x4a2)],Scene_Status[_0x59226c(0x7bf)]['create']=function(){const _0x198afc=_0x59226c;VisuMZ[_0x198afc(0x2d3)][_0x198afc(0x786)]['call'](this),this[_0x198afc(0x3fb)]();},Scene_Status[_0x59226c(0x7bf)][_0x59226c(0x3fb)]=function(){const _0x20b57a=_0x59226c;this[_0x20b57a(0x954)]&&(_0x20b57a(0x96a)===_0x20b57a(0x96a)?this['_profileWindow'][_0x20b57a(0x573)](Scene_Status['layoutSettings'][_0x20b57a(0x1a7)]):this['subject']()&&this[_0x20b57a(0x7ab)]()['canAttack']()?_0x1d8d1e[_0x20b57a(0x2d3)][_0x20b57a(0x975)][_0x20b57a(0x38e)](this):this['clear']());this[_0x20b57a(0x7a7)]&&this[_0x20b57a(0x7a7)][_0x20b57a(0x573)](Scene_Status[_0x20b57a(0x957)][_0x20b57a(0x94a)]);if(this['_statusParamsWindow']){if(_0x20b57a(0x507)!=='flWoP')this[_0x20b57a(0x346)][_0x20b57a(0x573)](Scene_Status[_0x20b57a(0x957)]['StatusParamsBgType']);else{var _0x24979f=_0x5bd8f4(_0x40a499['$1'])/0x64;_0x2f4b26+=_0x24979f;}}if(this[_0x20b57a(0x741)]){if('KikPM'==='odnsx'){const _0x3e8a96=_0x250c2d['CoreEngine'][_0x20b57a(0x6ad)][_0x20b57a(0x1c4)];if(_0x3e8a96['ShowItemBackground']===![])return;_0x3e8a96[_0x20b57a(0x4bb)]?_0x3e8a96[_0x20b57a(0x4bb)][_0x20b57a(0x38e)](this,_0x50f43a):_0x51d6b8[_0x20b57a(0x2d3)][_0x20b57a(0x292)][_0x20b57a(0x38e)](this,_0x391cf3);}else this[_0x20b57a(0x741)][_0x20b57a(0x573)](Scene_Status[_0x20b57a(0x957)][_0x20b57a(0x613)]);}},Scene_Status[_0x59226c(0x7bf)]['profileWindowRect']=function(){const _0x1008db=_0x59226c;return Scene_Status[_0x1008db(0x957)][_0x1008db(0x34e)][_0x1008db(0x38e)](this);},Scene_Status[_0x59226c(0x7bf)]['statusWindowRect']=function(){const _0x2fc89b=_0x59226c;return Scene_Status[_0x2fc89b(0x957)][_0x2fc89b(0x91d)][_0x2fc89b(0x38e)](this);},Scene_Status[_0x59226c(0x7bf)][_0x59226c(0x623)]=function(){const _0x2ecb40=_0x59226c;return Scene_Status[_0x2ecb40(0x957)][_0x2ecb40(0x3de)][_0x2ecb40(0x38e)](this);},Scene_Status[_0x59226c(0x7bf)][_0x59226c(0x68a)]=function(){const _0x5d4c4f=_0x59226c;return Scene_Status[_0x5d4c4f(0x957)]['StatusEquipRect']['call'](this);},Scene_Options[_0x59226c(0x957)]=VisuMZ['CoreEngine'][_0x59226c(0x6ad)]['MenuLayout'][_0x59226c(0x4ef)],VisuMZ['CoreEngine'][_0x59226c(0x8c9)]=Scene_Options[_0x59226c(0x7bf)]['create'],Scene_Options[_0x59226c(0x7bf)]['create']=function(){const _0x393c0d=_0x59226c;VisuMZ['CoreEngine'][_0x393c0d(0x8c9)][_0x393c0d(0x38e)](this),this['setCoreEngineUpdateWindowBg']();},Scene_Options[_0x59226c(0x7bf)][_0x59226c(0x3fb)]=function(){const _0x4c17f5=_0x59226c;this[_0x4c17f5(0x32d)]&&(_0x4c17f5(0x7fb)!=='tbOXP'?this[_0x4c17f5(0x32d)]['setBackgroundType'](Scene_Options[_0x4c17f5(0x957)][_0x4c17f5(0x33c)]):_0x57c536+=_0x4f12b8);},Scene_Options[_0x59226c(0x7bf)][_0x59226c(0x59c)]=function(){return Scene_Options['layoutSettings']['OptionsRect']['call'](this);},Scene_Save[_0x59226c(0x957)]=VisuMZ[_0x59226c(0x2d3)][_0x59226c(0x6ad)][_0x59226c(0x4cb)]['SaveMenu'],Scene_Save[_0x59226c(0x7bf)]['create']=function(){const _0x430e46=_0x59226c;Scene_File[_0x430e46(0x7bf)][_0x430e46(0x4a2)]['call'](this),this[_0x430e46(0x3fb)]();},Scene_Save[_0x59226c(0x7bf)][_0x59226c(0x3fb)]=function(){const _0x1fc57d=_0x59226c;this[_0x1fc57d(0x8e8)]&&this[_0x1fc57d(0x8e8)][_0x1fc57d(0x573)](Scene_Save[_0x1fc57d(0x957)][_0x1fc57d(0x6ab)]),this['_listWindow']&&this[_0x1fc57d(0x934)][_0x1fc57d(0x573)](Scene_Save[_0x1fc57d(0x957)][_0x1fc57d(0x36d)]);},Scene_Save[_0x59226c(0x7bf)][_0x59226c(0x73e)]=function(){const _0x347ddc=_0x59226c;return Scene_Save[_0x347ddc(0x957)][_0x347ddc(0x8dc)][_0x347ddc(0x38e)](this);},Scene_Save['prototype'][_0x59226c(0x8df)]=function(){const _0x537f9d=_0x59226c;return Scene_Save[_0x537f9d(0x957)][_0x537f9d(0x7b3)][_0x537f9d(0x38e)](this);},Scene_Load[_0x59226c(0x957)]=VisuMZ[_0x59226c(0x2d3)][_0x59226c(0x6ad)][_0x59226c(0x4cb)]['LoadMenu'],Scene_Load[_0x59226c(0x7bf)][_0x59226c(0x4a2)]=function(){const _0x20bdcd=_0x59226c;Scene_File[_0x20bdcd(0x7bf)][_0x20bdcd(0x4a2)][_0x20bdcd(0x38e)](this),this[_0x20bdcd(0x3fb)]();},Scene_Load[_0x59226c(0x7bf)][_0x59226c(0x3fb)]=function(){const _0x555214=_0x59226c;this['_helpWindow']&&(_0x555214(0x5fc)!==_0x555214(0x5fc)?this[_0x555214(0x8e8)][_0x555214(0x573)](_0xd25028[_0x555214(0x957)][_0x555214(0x6ab)]):this['_helpWindow']['setBackgroundType'](Scene_Load[_0x555214(0x957)][_0x555214(0x6ab)])),this['_listWindow']&&this['_listWindow'][_0x555214(0x573)](Scene_Load[_0x555214(0x957)][_0x555214(0x36d)]);},Scene_Load[_0x59226c(0x7bf)][_0x59226c(0x73e)]=function(){const _0x4d165b=_0x59226c;return Scene_Load[_0x4d165b(0x957)][_0x4d165b(0x8dc)][_0x4d165b(0x38e)](this);},Scene_Load['prototype'][_0x59226c(0x8df)]=function(){const _0x152b0e=_0x59226c;return Scene_Load[_0x152b0e(0x957)]['ListRect'][_0x152b0e(0x38e)](this);},Scene_GameEnd['layoutSettings']=VisuMZ['CoreEngine'][_0x59226c(0x6ad)][_0x59226c(0x4cb)][_0x59226c(0x6ed)],VisuMZ[_0x59226c(0x2d3)][_0x59226c(0x96f)]=Scene_GameEnd[_0x59226c(0x7bf)][_0x59226c(0x34d)],Scene_GameEnd[_0x59226c(0x7bf)][_0x59226c(0x34d)]=function(){const _0x52b37b=_0x59226c;Scene_MenuBase[_0x52b37b(0x7bf)][_0x52b37b(0x34d)][_0x52b37b(0x38e)](this);},Scene_GameEnd[_0x59226c(0x7bf)][_0x59226c(0x27c)]=function(){const _0x5d8691=_0x59226c,_0x22945f=this['commandWindowRect']();this['_commandWindow']=new Window_GameEnd(_0x22945f),this['_commandWindow'][_0x5d8691(0x8a4)](_0x5d8691(0x871),this[_0x5d8691(0x83d)][_0x5d8691(0x938)](this)),this['addWindow'](this[_0x5d8691(0x81a)]),this[_0x5d8691(0x81a)]['setBackgroundType'](Scene_GameEnd['layoutSettings'][_0x5d8691(0x3e3)]);},Scene_GameEnd[_0x59226c(0x7bf)][_0x59226c(0x1c0)]=function(){const _0x41a5e1=_0x59226c;return Scene_GameEnd[_0x41a5e1(0x957)][_0x41a5e1(0x839)]['call'](this);},Scene_Shop[_0x59226c(0x957)]=VisuMZ[_0x59226c(0x2d3)][_0x59226c(0x6ad)][_0x59226c(0x4cb)][_0x59226c(0x6a6)],VisuMZ['CoreEngine'][_0x59226c(0x32e)]=Scene_Shop[_0x59226c(0x7bf)][_0x59226c(0x4a2)],Scene_Shop[_0x59226c(0x7bf)][_0x59226c(0x4a2)]=function(){const _0x110cf2=_0x59226c;VisuMZ[_0x110cf2(0x2d3)]['Scene_Shop_create']['call'](this),this[_0x110cf2(0x3fb)]();},Scene_Shop[_0x59226c(0x7bf)][_0x59226c(0x3fb)]=function(){const _0x4720b3=_0x59226c;this['_helpWindow']&&this[_0x4720b3(0x8e8)]['setBackgroundType'](Scene_Shop[_0x4720b3(0x957)][_0x4720b3(0x6ab)]);this[_0x4720b3(0x27f)]&&this[_0x4720b3(0x27f)][_0x4720b3(0x573)](Scene_Shop[_0x4720b3(0x957)]['GoldBgType']);this[_0x4720b3(0x81a)]&&this[_0x4720b3(0x81a)][_0x4720b3(0x573)](Scene_Shop[_0x4720b3(0x957)][_0x4720b3(0x3e3)]);if(this[_0x4720b3(0x63b)]){if('OlOWD'!=='uWmVl')this[_0x4720b3(0x63b)][_0x4720b3(0x573)](Scene_Shop[_0x4720b3(0x957)][_0x4720b3(0x8b9)]);else{if(this['isExpGaugeDrawn']())this[_0x4720b3(0x3f7)](_0x28814b,_0x3ad410,_0x4bb298);_0x20bbf9['CoreEngine']['Window_StatusBase_drawActorLevel'][_0x4720b3(0x38e)](this,_0x50cc8e,_0x2d3ee7,_0x35f8fc);}}this[_0x4720b3(0x51d)]&&this['_numberWindow'][_0x4720b3(0x573)](Scene_Shop['layoutSettings'][_0x4720b3(0x552)]);this[_0x4720b3(0x7a7)]&&this['_statusWindow'][_0x4720b3(0x573)](Scene_Shop[_0x4720b3(0x957)][_0x4720b3(0x94a)]);if(this[_0x4720b3(0x780)]){if('LdqHS'!=='LdqHS')return this[_0x4720b3(0x29d)];else this[_0x4720b3(0x780)][_0x4720b3(0x573)](Scene_Shop[_0x4720b3(0x957)][_0x4720b3(0x3c2)]);}this[_0x4720b3(0x244)]&&this['_categoryWindow']['setBackgroundType'](Scene_Shop[_0x4720b3(0x957)][_0x4720b3(0x90d)]);if(this[_0x4720b3(0x7e3)]){if(_0x4720b3(0x6a9)===_0x4720b3(0x4da))for(const _0x379a5d of _0x9e50d5[_0x4720b3(0x1f9)]){if(_0x379a5d[_0x4720b3(0x790)][_0x4720b3(0x38e)](this)){const _0x76ff82=_0x379a5d['Symbol'];let _0x75f71c=_0x379a5d[_0x4720b3(0x629)];if(['','Untitled'][_0x4720b3(0x98d)](_0x75f71c))_0x75f71c=_0x379a5d[_0x4720b3(0x3c5)][_0x4720b3(0x38e)](this);const _0x56756d=_0x379a5d[_0x4720b3(0x732)][_0x4720b3(0x38e)](this),_0x5d4b71=_0x379a5d[_0x4720b3(0x628)]['call'](this);this[_0x4720b3(0x7f8)](_0x75f71c,_0x76ff82,_0x56756d,_0x5d4b71),this['setHandler'](_0x76ff82,_0x379a5d[_0x4720b3(0x762)]['bind'](this,_0x5d4b71));}}else this[_0x4720b3(0x7e3)][_0x4720b3(0x573)](Scene_Shop['layoutSettings'][_0x4720b3(0x43a)]);}},Scene_Shop[_0x59226c(0x7bf)][_0x59226c(0x73e)]=function(){const _0x3ca074=_0x59226c;return Scene_Shop['layoutSettings'][_0x3ca074(0x8dc)][_0x3ca074(0x38e)](this);},Scene_Shop[_0x59226c(0x7bf)][_0x59226c(0x439)]=function(){const _0x2d3ef1=_0x59226c;return Scene_Shop[_0x2d3ef1(0x957)][_0x2d3ef1(0x798)][_0x2d3ef1(0x38e)](this);},Scene_Shop[_0x59226c(0x7bf)][_0x59226c(0x1c0)]=function(){const _0x28b7a6=_0x59226c;return Scene_Shop[_0x28b7a6(0x957)][_0x28b7a6(0x839)][_0x28b7a6(0x38e)](this);},Scene_Shop[_0x59226c(0x7bf)]['dummyWindowRect']=function(){const _0x1f7e32=_0x59226c;return Scene_Shop['layoutSettings']['DummyRect'][_0x1f7e32(0x38e)](this);},Scene_Shop['prototype'][_0x59226c(0x829)]=function(){const _0x3c2938=_0x59226c;return Scene_Shop[_0x3c2938(0x957)][_0x3c2938(0x475)]['call'](this);},Scene_Shop[_0x59226c(0x7bf)]['statusWindowRect']=function(){const _0x47b336=_0x59226c;return Scene_Shop['layoutSettings']['StatusRect'][_0x47b336(0x38e)](this);},Scene_Shop[_0x59226c(0x7bf)][_0x59226c(0x97e)]=function(){const _0x2bc7ea=_0x59226c;return Scene_Shop[_0x2bc7ea(0x957)][_0x2bc7ea(0x78e)][_0x2bc7ea(0x38e)](this);},Scene_Shop[_0x59226c(0x7bf)]['categoryWindowRect']=function(){const _0x1a2148=_0x59226c;return Scene_Shop['layoutSettings'][_0x1a2148(0x3a8)][_0x1a2148(0x38e)](this);},Scene_Shop[_0x59226c(0x7bf)]['sellWindowRect']=function(){const _0x2be495=_0x59226c;return Scene_Shop[_0x2be495(0x957)][_0x2be495(0x618)][_0x2be495(0x38e)](this);},Scene_Name[_0x59226c(0x957)]=VisuMZ[_0x59226c(0x2d3)]['Settings']['MenuLayout'][_0x59226c(0x8f7)],VisuMZ[_0x59226c(0x2d3)][_0x59226c(0x20a)]=Scene_Name['prototype'][_0x59226c(0x4a2)],Scene_Name['prototype'][_0x59226c(0x4a2)]=function(){const _0x25ee43=_0x59226c;VisuMZ[_0x25ee43(0x2d3)][_0x25ee43(0x20a)][_0x25ee43(0x38e)](this),this['setCoreEngineUpdateWindowBg']();},Scene_Name[_0x59226c(0x7bf)][_0x59226c(0x3fb)]=function(){const _0x1104da=_0x59226c;this[_0x1104da(0x857)]&&this[_0x1104da(0x857)]['setBackgroundType'](Scene_Name[_0x1104da(0x957)][_0x1104da(0x27e)]);if(this[_0x1104da(0x716)]){if(_0x1104da(0x319)!==_0x1104da(0x319)){const _0x1ff266=_0x329e72[_0x1104da(0x615)]()[_0x1104da(0x3b0)][_0x1104da(0x8a2)](/\\I\[(\d+)\]/gi,'');this[_0x1104da(0x273)](_0x1ff266,_0x3f1168,_0x59123d,_0x1d8eee);}else this[_0x1104da(0x716)][_0x1104da(0x573)](Scene_Name['layoutSettings'][_0x1104da(0x77b)]);}},Scene_Name['prototype'][_0x59226c(0x4f2)]=function(){return 0x0;},Scene_Name[_0x59226c(0x7bf)]['editWindowRect']=function(){const _0x510254=_0x59226c;return Scene_Name[_0x510254(0x957)][_0x510254(0x6af)][_0x510254(0x38e)](this);},Scene_Name[_0x59226c(0x7bf)][_0x59226c(0x8f0)]=function(){const _0x13372a=_0x59226c;return Scene_Name[_0x13372a(0x957)][_0x13372a(0x4f4)][_0x13372a(0x38e)](this);},Scene_Name[_0x59226c(0x7bf)][_0x59226c(0x5ea)]=function(){const _0xbb1371=_0x59226c;if(!this[_0xbb1371(0x716)])return![];return VisuMZ[_0xbb1371(0x2d3)][_0xbb1371(0x6ad)][_0xbb1371(0x4c8)][_0xbb1371(0x5ea)];},Scene_Name[_0x59226c(0x7bf)][_0x59226c(0x535)]=function(){const _0x489a45=_0x59226c;return this[_0x489a45(0x5ea)]()?TextManager[_0x489a45(0x206)](_0x489a45(0x5e8)):Scene_MenuBase['prototype'][_0x489a45(0x535)]['call'](this);},Scene_Name[_0x59226c(0x7bf)]['buttonAssistText1']=function(){const _0x26aaaf=_0x59226c;if(this[_0x26aaaf(0x5ea)]()){if(_0x26aaaf(0x4db)!==_0x26aaaf(0x370)){const _0xc68e49=VisuMZ[_0x26aaaf(0x2d3)][_0x26aaaf(0x6ad)][_0x26aaaf(0x4c8)];if(this[_0x26aaaf(0x716)][_0x26aaaf(0x77e)]===_0x26aaaf(0x75d))return _0xc68e49[_0x26aaaf(0x636)]||_0x26aaaf(0x636);else{if('FgVel'!==_0x26aaaf(0x936))return _0xc68e49[_0x26aaaf(0x63c)]||_0x26aaaf(0x63c);else this[_0x26aaaf(0x245)](_0x26aaaf(0x421));}}else this['_colorCache'][_0x1de923]=this['textColor'](_0x1c1f8a(_0x45c4c6));}else return _0x26aaaf(0x845)===_0x26aaaf(0x5c6)?this[_0x26aaaf(0x6df)]():Scene_MenuBase['prototype'][_0x26aaaf(0x8dd)][_0x26aaaf(0x38e)](this);},VisuMZ['CoreEngine'][_0x59226c(0x8bf)]=Scene_Name[_0x59226c(0x7bf)]['onInputOk'],Scene_Name[_0x59226c(0x7bf)][_0x59226c(0x2a0)]=function(){const _0x54460c=_0x59226c;this['doesNameContainBannedWords']()?_0x54460c(0x6a7)!==_0x54460c(0x451)?this['onInputBannedWords']():_0x31500e['_playTestFastMode']=!_0x2559d1[_0x54460c(0x812)]:VisuMZ[_0x54460c(0x2d3)][_0x54460c(0x8bf)][_0x54460c(0x38e)](this);},Scene_Name[_0x59226c(0x7bf)][_0x59226c(0x96b)]=function(){const _0x4d0011=_0x59226c,_0x5bc806=VisuMZ[_0x4d0011(0x2d3)][_0x4d0011(0x6ad)][_0x4d0011(0x4c8)];if(!_0x5bc806)return![];const _0x7150d6=_0x5bc806[_0x4d0011(0x963)];if(!_0x7150d6)return![];const _0x47b80=this[_0x4d0011(0x857)][_0x4d0011(0x3b0)]()[_0x4d0011(0x3b7)]();for(const _0x1755c8 of _0x7150d6){if(_0x4d0011(0x227)===_0x4d0011(0x227)){if(_0x47b80[_0x4d0011(0x98d)](_0x1755c8[_0x4d0011(0x3b7)]()))return!![];}else _0x2c46a2[_0x4d0011(0x898)](!![]);}return![];},Scene_Name['prototype'][_0x59226c(0x6ea)]=function(){const _0x245ef3=_0x59226c;SoundManager[_0x245ef3(0x733)]();},VisuMZ[_0x59226c(0x2d3)][_0x59226c(0x367)]=Scene_Battle[_0x59226c(0x7bf)][_0x59226c(0x334)],Scene_Battle[_0x59226c(0x7bf)]['update']=function(){const _0x4dddee=_0x59226c;VisuMZ['CoreEngine'][_0x4dddee(0x367)][_0x4dddee(0x38e)](this);if($gameTemp['_playTestFastMode'])this['updatePlayTestF7']();},Scene_Battle[_0x59226c(0x7bf)]['updatePlayTestF7']=function(){const _0x280f27=_0x59226c;!BattleManager['isInputting']()&&!this[_0x280f27(0x809)]&&!$gameMessage['isBusy']()&&(this['_playtestF7Looping']=!![],this[_0x280f27(0x334)](),SceneManager[_0x280f27(0x6b1)](),this[_0x280f27(0x809)]=![]);},VisuMZ[_0x59226c(0x2d3)][_0x59226c(0x3cf)]=Scene_Battle['prototype'][_0x59226c(0x586)],Scene_Battle['prototype'][_0x59226c(0x586)]=function(){const _0x14e23f=_0x59226c;VisuMZ[_0x14e23f(0x2d3)][_0x14e23f(0x3cf)]['call'](this),SceneManager[_0x14e23f(0x6e1)]()&&this[_0x14e23f(0x8f5)]();},Scene_Battle[_0x59226c(0x7bf)][_0x59226c(0x8f5)]=function(){const _0x30d3c1=_0x59226c;this[_0x30d3c1(0x301)]['x']=Graphics[_0x30d3c1(0x8bc)]+0x4;if(this['isBottomButtonMode']()){if(_0x30d3c1(0x291)==='YvQgS')this['_cancelButton']['y']=Graphics[_0x30d3c1(0x5c5)]-this['buttonAreaHeight']();else{const _0x309821=_0x15e1bc[_0x754311[_0x30d3c1(0x3d4)]],_0xdef302=_0x4bb2fd[_0x30d3c1(0x7c8)],_0x1d5106=_0x264191[_0x30d3c1(0x70d)],_0xb74108=_0xba4c12[_0x30d3c1(0x97b)];let _0x42fac6=this[_0x30d3c1(0x86b)]();const _0x28b7b1=this['animationNextDelay']();if(this['isAnimationForEach'](_0x309821))for(const _0x238c3f of _0xdef302){this[_0x30d3c1(0x45a)]([_0x238c3f],_0x309821,_0x1d5106,_0x42fac6,_0xb74108),_0x42fac6+=_0x28b7b1;}else this[_0x30d3c1(0x45a)](_0xdef302,_0x309821,_0x1d5106,_0x42fac6,_0xb74108);}}else'bTcUC'==='SCxra'?(this[_0x30d3c1(0x3da)]([_0x1ab263],_0x379676,_0x494776,_0x537385,_0xada78e),_0x7ea6a4+=_0x54cbed):this[_0x30d3c1(0x301)]['y']=0x0;},VisuMZ[_0x59226c(0x2d3)][_0x59226c(0x98f)]=Sprite_Button[_0x59226c(0x7bf)]['initialize'],Sprite_Button[_0x59226c(0x7bf)][_0x59226c(0x72d)]=function(_0x3a063f){const _0xe9685f=_0x59226c;VisuMZ[_0xe9685f(0x2d3)]['Sprite_Button_initialize']['call'](this,_0x3a063f),this['initButtonHidden']();},Sprite_Button[_0x59226c(0x7bf)][_0x59226c(0x483)]=function(){const _0x46c63b=_0x59226c,_0xe150f4=VisuMZ[_0x46c63b(0x2d3)][_0x46c63b(0x6ad)]['UI'];this[_0x46c63b(0x89a)]=![];switch(this['_buttonType']){case _0x46c63b(0x871):this['_isButtonHidden']=!_0xe150f4[_0x46c63b(0x8eb)];break;case _0x46c63b(0x802):case _0x46c63b(0x585):this[_0x46c63b(0x89a)]=!_0xe150f4[_0x46c63b(0x3d7)];break;case _0x46c63b(0x81c):case'up':case _0x46c63b(0x4cd):case _0x46c63b(0x1ba):case'ok':this[_0x46c63b(0x89a)]=!_0xe150f4[_0x46c63b(0x6c3)];break;case _0x46c63b(0x458):this[_0x46c63b(0x89a)]=!_0xe150f4['menuShowButton'];break;}},VisuMZ[_0x59226c(0x2d3)][_0x59226c(0x67a)]=Sprite_Button[_0x59226c(0x7bf)][_0x59226c(0x6c0)],Sprite_Button[_0x59226c(0x7bf)][_0x59226c(0x6c0)]=function(){const _0x2a0f2e=_0x59226c;if(SceneManager[_0x2a0f2e(0x31c)]()||this[_0x2a0f2e(0x89a)])this[_0x2a0f2e(0x3c3)]();else{if(_0x2a0f2e(0x6d8)===_0x2a0f2e(0x8c3))return 0x0;else VisuMZ[_0x2a0f2e(0x2d3)][_0x2a0f2e(0x67a)]['call'](this);}},Sprite_Button[_0x59226c(0x7bf)][_0x59226c(0x3c3)]=function(){const _0x319256=_0x59226c;this[_0x319256(0x897)]=![],this[_0x319256(0x7d8)]=0x0,this['x']=Graphics[_0x319256(0x4d6)]*0xa,this['y']=Graphics[_0x319256(0x235)]*0xa;},VisuMZ[_0x59226c(0x2d3)][_0x59226c(0x360)]=Sprite_Battler[_0x59226c(0x7bf)][_0x59226c(0x30f)],Sprite_Battler['prototype'][_0x59226c(0x30f)]=function(_0x38fb9f,_0x88244d,_0x371a7e){const _0x59b14a=_0x59226c;(this[_0x59b14a(0x89e)]!==_0x38fb9f||this[_0x59b14a(0x56e)]!==_0x88244d)&&(_0x59b14a(0x962)!==_0x59b14a(0x37f)?(this[_0x59b14a(0x41d)](_0x59b14a(0x561)),this['_movementWholeDuration']=_0x371a7e):_0x42ff6f*=_0x521f69(_0x1e8c07)),VisuMZ['CoreEngine'][_0x59b14a(0x360)][_0x59b14a(0x38e)](this,_0x38fb9f,_0x88244d,_0x371a7e);},Sprite_Battler['prototype'][_0x59226c(0x41d)]=function(_0x370447){const _0x5c70a9=_0x59226c;this[_0x5c70a9(0x663)]=_0x370447;},Sprite_Battler[_0x59226c(0x7bf)][_0x59226c(0x4a7)]=function(){const _0x1e604b=_0x59226c;if(this[_0x1e604b(0x50e)]<=0x0)return;const _0x237989=this[_0x1e604b(0x50e)],_0x17e4fe=this[_0x1e604b(0x948)],_0x39e61f=this['_moveEasingType'];this[_0x1e604b(0x558)]=this['applyEasing'](this[_0x1e604b(0x558)],this[_0x1e604b(0x89e)],_0x237989,_0x17e4fe,_0x39e61f),this[_0x1e604b(0x918)]=this['applyEasing'](this[_0x1e604b(0x918)],this['_targetOffsetY'],_0x237989,_0x17e4fe,_0x39e61f),this[_0x1e604b(0x50e)]--;if(this[_0x1e604b(0x50e)]<=0x0)this['onMoveEnd']();},Sprite_Battler[_0x59226c(0x7bf)][_0x59226c(0x350)]=function(_0x478ce7,_0x556b0f,_0x122f50,_0xe28fcf,_0x2ea6f0){const _0x23e4c3=_0x59226c,_0x1f10b9=VisuMZ['ApplyEasing']((_0xe28fcf-_0x122f50)/_0xe28fcf,_0x2ea6f0||'Linear'),_0x44c00a=VisuMZ[_0x23e4c3(0x748)]((_0xe28fcf-_0x122f50+0x1)/_0xe28fcf,_0x2ea6f0||_0x23e4c3(0x561)),_0x16d095=(_0x478ce7-_0x556b0f*_0x1f10b9)/(0x1-_0x1f10b9);return _0x16d095+(_0x556b0f-_0x16d095)*_0x44c00a;},VisuMZ['CoreEngine'][_0x59226c(0x5a9)]=Sprite_Actor['prototype'][_0x59226c(0x93f)],Sprite_Actor[_0x59226c(0x7bf)][_0x59226c(0x93f)]=function(_0x1d75e4){const _0x1cbe2c=_0x59226c;VisuMZ['CoreEngine'][_0x1cbe2c(0x6ad)]['UI']['RepositionActors']?this[_0x1cbe2c(0x8cf)](_0x1d75e4):_0x1cbe2c(0x731)!=='BjKDe'?VisuMZ[_0x1cbe2c(0x2d3)]['Sprite_Actor_setActorHome'][_0x1cbe2c(0x38e)](this,_0x1d75e4):this['_inputString']+=_0x310dc8;},Sprite_Actor[_0x59226c(0x7bf)][_0x59226c(0x8cf)]=function(_0x24d468){const _0x10efa1=_0x59226c;let _0x272970=Math['round'](Graphics[_0x10efa1(0x4d6)]/0x2+0xc0);_0x272970-=Math[_0x10efa1(0x966)]((Graphics[_0x10efa1(0x4d6)]-Graphics[_0x10efa1(0x8bc)])/0x2),_0x272970+=_0x24d468*0x20;let _0x57c445=Graphics[_0x10efa1(0x235)]-0xc8-$gameParty[_0x10efa1(0x96d)]()*0x30;_0x57c445-=Math[_0x10efa1(0x966)]((Graphics[_0x10efa1(0x235)]-Graphics[_0x10efa1(0x5c5)])/0x2),_0x57c445+=_0x24d468*0x30,this['setHome'](_0x272970,_0x57c445);},Sprite_Actor['prototype']['retreat']=function(){const _0x1a26f6=_0x59226c;this[_0x1a26f6(0x30f)](0x4b0,0x0,0x78);},Sprite_Animation[_0x59226c(0x7bf)][_0x59226c(0x293)]=function(_0x8c1295){const _0x1fe804=_0x59226c;this[_0x1fe804(0x571)]=_0x8c1295;},VisuMZ[_0x59226c(0x2d3)][_0x59226c(0x7d2)]=Sprite_Animation[_0x59226c(0x7bf)][_0x59226c(0x8ec)],Sprite_Animation[_0x59226c(0x7bf)][_0x59226c(0x8ec)]=function(){const _0x25a29e=_0x59226c;if(this[_0x25a29e(0x571)])return;VisuMZ[_0x25a29e(0x2d3)]['Sprite_Animation_processSoundTimings'][_0x25a29e(0x38e)](this);},VisuMZ[_0x59226c(0x2d3)][_0x59226c(0x824)]=Sprite_Animation[_0x59226c(0x7bf)][_0x59226c(0x668)],Sprite_Animation[_0x59226c(0x7bf)][_0x59226c(0x668)]=function(_0x1ce63f){const _0x220ad8=_0x59226c;this[_0x220ad8(0x725)]()?this[_0x220ad8(0x7e6)](_0x1ce63f):VisuMZ[_0x220ad8(0x2d3)][_0x220ad8(0x824)][_0x220ad8(0x38e)](this,_0x1ce63f);},Sprite_Animation['prototype'][_0x59226c(0x725)]=function(){const _0x3cae9a=_0x59226c;if(!this['_animation'])return![];const _0x306e05=this[_0x3cae9a(0x575)][_0x3cae9a(0x3b0)]||'';if(_0x306e05[_0x3cae9a(0x25f)](/<MIRROR OFFSET X>/i))return!![];if(_0x306e05[_0x3cae9a(0x25f)](/<NO MIRROR OFFSET X>/i))return![];return VisuMZ[_0x3cae9a(0x2d3)][_0x3cae9a(0x6ad)]['QoL'][_0x3cae9a(0x331)];},Sprite_Animation[_0x59226c(0x7bf)][_0x59226c(0x7e6)]=function(_0x23e81b){const _0x3fea03=_0x59226c,_0x183c17=this['_viewportSize'],_0x418140=this[_0x3fea03(0x7e2)],_0x329521=this[_0x3fea03(0x575)][_0x3fea03(0x789)]*(this['_mirror']?-0x1:0x1)-_0x183c17/0x2,_0x2491e6=this[_0x3fea03(0x575)]['offsetY']-_0x418140/0x2,_0x1fac22=this['targetPosition'](_0x23e81b);_0x23e81b['gl'][_0x3fea03(0x37c)](_0x329521+_0x1fac22['x'],_0x2491e6+_0x1fac22['y'],_0x183c17,_0x418140);},Sprite_Animation[_0x59226c(0x7bf)][_0x59226c(0x2b7)]=function(_0x589263){const _0x382b47=_0x59226c;if(_0x589263[_0x382b47(0x8da)]){}const _0x408339=this['_animation']['name'];let _0x2f0e31=_0x589263[_0x382b47(0x235)]*_0x589263['scale']['y'],_0x1e2673=0x0,_0x4406ec=-_0x2f0e31/0x2;if(_0x408339[_0x382b47(0x25f)](/<(?:HEAD|HEADER|TOP)>/i))_0x4406ec=-_0x2f0e31;if(_0x408339[_0x382b47(0x25f)](/<(?:FOOT|FOOTER|BOTTOM)>/i))_0x4406ec=0x0;if(this[_0x382b47(0x575)]['alignBottom'])_0x4406ec=0x0;if(_0x408339[_0x382b47(0x25f)](/<(?:LEFT)>/i))_0x1e2673=-_0x589263['width']/0x2;if(_0x408339[_0x382b47(0x25f)](/<(?:RIGHT)>/i))_0x1e2673=_0x589263[_0x382b47(0x4d6)]/0x2;_0x408339['match'](/<ANCHOR X:[ ](\d+\.?\d*)>/i)&&(_0x382b47(0x97d)===_0x382b47(0x343)?(this[_0x382b47(0x71e)](_0x4952c9,_0x53b364+0x2,_0x4cc4c3+0x2),_0x2ea435-=_0x58d042['iconWidth']+0x4,_0x3ca562+=_0x3fe31f[_0x382b47(0x1b6)]+0x4):_0x1e2673=Number(RegExp['$1'])*_0x589263[_0x382b47(0x4d6)]);if(_0x408339['match'](/<ANCHOR Y:[ ](\d+\.?\d*)>/i)){if(_0x382b47(0x5b6)!=='caiFJ'){if(_0x11bdd6)_0x48cbc1[_0x382b47(0x85b)](_0x1fe68c);}else _0x4406ec=(0x1-Number(RegExp['$1']))*-_0x2f0e31;}_0x408339[_0x382b47(0x25f)](/<ANCHOR:[ ](\d+\.?\d*),[ ](\d+\.?\d*)>/i)&&(_0x1e2673=Number(RegExp['$1'])*_0x589263[_0x382b47(0x4d6)],_0x4406ec=(0x1-Number(RegExp['$2']))*-_0x2f0e31);if(_0x408339[_0x382b47(0x25f)](/<OFFSET X:[ ]([\+\-]\d+)>/i))_0x1e2673+=Number(RegExp['$1']);if(_0x408339[_0x382b47(0x25f)](/<OFFSET Y:[ ]([\+\-]\d+)>/i))_0x4406ec+=Number(RegExp['$1']);_0x408339[_0x382b47(0x25f)](/<OFFSET:[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i)&&(_0x1e2673+=Number(RegExp['$1']),_0x4406ec+=Number(RegExp['$2']));const _0x545454=new Point(_0x1e2673,_0x4406ec);return _0x589263[_0x382b47(0x8d3)](),_0x589263[_0x382b47(0x6b9)][_0x382b47(0x891)](_0x545454);},Sprite_AnimationMV[_0x59226c(0x7bf)][_0x59226c(0x293)]=function(_0x481f98){this['_muteSound']=_0x481f98;},VisuMZ[_0x59226c(0x2d3)][_0x59226c(0x2bb)]=Sprite_AnimationMV[_0x59226c(0x7bf)][_0x59226c(0x1a1)],Sprite_AnimationMV['prototype'][_0x59226c(0x1a1)]=function(_0x46bf25){const _0x363512=_0x59226c;this[_0x363512(0x571)]&&(_0x46bf25=JsonEx[_0x363512(0x8c0)](_0x46bf25),_0x46bf25['se']&&(_0x46bf25['se'][_0x363512(0x69d)]=0x0)),VisuMZ[_0x363512(0x2d3)][_0x363512(0x2bb)][_0x363512(0x38e)](this,_0x46bf25);},VisuMZ[_0x59226c(0x2d3)][_0x59226c(0x1e7)]=Sprite_AnimationMV[_0x59226c(0x7bf)][_0x59226c(0x947)],Sprite_AnimationMV[_0x59226c(0x7bf)][_0x59226c(0x947)]=function(){const _0x3256b1=_0x59226c;VisuMZ[_0x3256b1(0x2d3)]['Sprite_AnimationMV_updatePosition'][_0x3256b1(0x38e)](this);if(this[_0x3256b1(0x575)][_0x3256b1(0x942)]===0x3){if(_0x3256b1(0x89b)!=='GomaP')_0x274292[_0x3256b1(0x43b)](_0x1949c7);else{if(this['x']===0x0)this['x']=Math[_0x3256b1(0x93a)](Graphics[_0x3256b1(0x4d6)]/0x2);if(this['y']===0x0)this['y']=Math['round'](Graphics[_0x3256b1(0x235)]/0x2);}}},Sprite_Damage[_0x59226c(0x7bf)]['createDigits']=function(_0x2a0f8a){const _0x43de31=_0x59226c;let _0x56c45c=Math[_0x43de31(0x93b)](_0x2a0f8a)['toString']();this[_0x43de31(0x875)]()&&(_0x56c45c=VisuMZ['GroupDigits'](_0x56c45c));const _0x5e8f2d=this[_0x43de31(0x391)](),_0xef1a9a=Math[_0x43de31(0x966)](_0x5e8f2d*0.75);for(let _0x244329=0x0;_0x244329<_0x56c45c['length'];_0x244329++){if(_0x43de31(0x372)!=='tMRDj'){const _0x3ad87f=this[_0x43de31(0x743)](_0xef1a9a,_0x5e8f2d);_0x3ad87f['bitmap'][_0x43de31(0x273)](_0x56c45c[_0x244329],0x0,0x0,_0xef1a9a,_0x5e8f2d,_0x43de31(0x545)),_0x3ad87f['x']=(_0x244329-(_0x56c45c[_0x43de31(0x587)]-0x1)/0x2)*_0xef1a9a,_0x3ad87f['dy']=-_0x244329;}else for(let _0x5de870=0x1;_0x5de870<=0x64;_0x5de870++){_0x426c90[_0x43de31(0x43b)](_0x5de870);}}},Sprite_Damage[_0x59226c(0x7bf)][_0x59226c(0x875)]=function(){const _0x3e7bfd=_0x59226c;return VisuMZ[_0x3e7bfd(0x2d3)][_0x3e7bfd(0x6ad)][_0x3e7bfd(0x509)][_0x3e7bfd(0x392)];},Sprite_Damage[_0x59226c(0x7bf)][_0x59226c(0x20e)]=function(){const _0x467769=_0x59226c;return ColorManager[_0x467769(0x6dc)]();},VisuMZ[_0x59226c(0x2d3)][_0x59226c(0x61c)]=Sprite_Gauge[_0x59226c(0x7bf)][_0x59226c(0x44e)],Sprite_Gauge[_0x59226c(0x7bf)]['gaugeRate']=function(){const _0x3e1911=_0x59226c;return VisuMZ[_0x3e1911(0x2d3)][_0x3e1911(0x61c)]['call'](this)['clamp'](0x0,0x1);},VisuMZ['CoreEngine'][_0x59226c(0x2c5)]=Sprite_Gauge[_0x59226c(0x7bf)]['currentValue'],Sprite_Gauge[_0x59226c(0x7bf)][_0x59226c(0x5aa)]=function(){const _0x299bef=_0x59226c;let _0x57d334=VisuMZ[_0x299bef(0x2d3)][_0x299bef(0x2c5)][_0x299bef(0x38e)](this);return _0x57d334;},Sprite_Gauge['prototype'][_0x59226c(0x2fc)]=function(){const _0xa870f9=_0x59226c;let _0x165121=this['currentValue']();this[_0xa870f9(0x875)]()&&('DZGDb'===_0xa870f9(0x861)?_0x165121=VisuMZ[_0xa870f9(0x807)](_0x165121):this['setSkill'](_0x4b2c53));const _0x54543b=this[_0xa870f9(0x4e2)]()-0x1,_0x1df5b8=this[_0xa870f9(0x426)]?this[_0xa870f9(0x426)]():this['bitmapHeight']();this[_0xa870f9(0x32f)](),this['bitmap'][_0xa870f9(0x273)](_0x165121,0x0,0x0,_0x54543b,_0x1df5b8,'right');},Sprite_Gauge[_0x59226c(0x7bf)][_0x59226c(0x222)]=function(){return 0x3;},Sprite_Gauge[_0x59226c(0x7bf)][_0x59226c(0x875)]=function(){const _0x19190d=_0x59226c;return VisuMZ['CoreEngine'][_0x19190d(0x6ad)]['QoL'][_0x19190d(0x2b8)];},Sprite_Gauge[_0x59226c(0x7bf)]['valueOutlineColor']=function(){const _0x1b9e0e=_0x59226c;return ColorManager[_0x1b9e0e(0x1f5)]();},VisuMZ['CoreEngine']['Sprite_Picture_loadBitmap']=Sprite_Picture['prototype']['loadBitmap'],Sprite_Picture['prototype'][_0x59226c(0x5a8)]=function(){const _0x13da0b=_0x59226c;this[_0x13da0b(0x1da)]['match'](/VisuMZ CoreEngine PictureIcon (\d+)/i)?this[_0x13da0b(0x94c)](Number(RegExp['$1'])):_0x13da0b(0x1e8)==='pesEv'?_0x56b3c6['push'](_0x429bbe):VisuMZ['CoreEngine'][_0x13da0b(0x4ed)][_0x13da0b(0x38e)](this);},Sprite_Picture[_0x59226c(0x7bf)]['loadIconBitmap']=function(_0x461e2b){const _0x1b866b=_0x59226c,_0x4787cc=ImageManager['iconWidth'],_0x428c10=ImageManager[_0x1b866b(0x4e4)],_0x46270c=this['_pictureName'][_0x1b866b(0x25f)](/SMOOTH/i);this[_0x1b866b(0x22a)]=new Bitmap(_0x4787cc,_0x428c10);const _0x4e6605=ImageManager[_0x1b866b(0x1be)](_0x1b866b(0x36f)),_0x57cee2=_0x461e2b%0x10*_0x4787cc,_0x4187c6=Math[_0x1b866b(0x966)](_0x461e2b/0x10)*_0x428c10;this['bitmap'][_0x1b866b(0x902)]=_0x46270c,this[_0x1b866b(0x22a)][_0x1b866b(0x307)](_0x4e6605,_0x57cee2,_0x4187c6,_0x4787cc,_0x428c10,0x0,0x0,_0x4787cc,_0x428c10);};function Sprite_TitlePictureButton(){this['initialize'](...arguments);}Sprite_TitlePictureButton['prototype']=Object[_0x59226c(0x4a2)](Sprite_Clickable[_0x59226c(0x7bf)]),Sprite_TitlePictureButton['prototype'][_0x59226c(0x6c8)]=Sprite_TitlePictureButton,Sprite_TitlePictureButton[_0x59226c(0x7bf)][_0x59226c(0x72d)]=function(_0x35b573){const _0x19eab3=_0x59226c;Sprite_Clickable[_0x19eab3(0x7bf)]['initialize'][_0x19eab3(0x38e)](this),this[_0x19eab3(0x814)]=_0x35b573,this[_0x19eab3(0x515)]=null,this[_0x19eab3(0x275)]();},Sprite_TitlePictureButton[_0x59226c(0x7bf)]['setup']=function(){const _0x57c497=_0x59226c;this['x']=Graphics[_0x57c497(0x4d6)],this['y']=Graphics[_0x57c497(0x235)],this['visible']=![],this['setupButtonImage']();},Sprite_TitlePictureButton['prototype'][_0x59226c(0x86c)]=function(){const _0x2b13a1=_0x59226c;this[_0x2b13a1(0x22a)]=ImageManager[_0x2b13a1(0x432)](this[_0x2b13a1(0x814)][_0x2b13a1(0x892)]),this[_0x2b13a1(0x22a)][_0x2b13a1(0x7ba)](this[_0x2b13a1(0x476)]['bind'](this));},Sprite_TitlePictureButton[_0x59226c(0x7bf)]['onButtonImageLoad']=function(){const _0x2d04c6=_0x59226c;this['_data'][_0x2d04c6(0x2b1)][_0x2d04c6(0x38e)](this),this[_0x2d04c6(0x814)][_0x2d04c6(0x56b)]['call'](this),this[_0x2d04c6(0x28f)](this[_0x2d04c6(0x814)]['CallHandlerJS'][_0x2d04c6(0x938)](this));},Sprite_TitlePictureButton[_0x59226c(0x7bf)][_0x59226c(0x334)]=function(){const _0x12e314=_0x59226c;Sprite_Clickable[_0x12e314(0x7bf)][_0x12e314(0x334)][_0x12e314(0x38e)](this),this[_0x12e314(0x6c0)](),this[_0x12e314(0x754)]();},Sprite_TitlePictureButton['prototype']['fadeSpeed']=function(){const _0x21752f=_0x59226c;return VisuMZ[_0x21752f(0x2d3)][_0x21752f(0x6ad)][_0x21752f(0x4cb)][_0x21752f(0x804)][_0x21752f(0x7b7)];},Sprite_TitlePictureButton[_0x59226c(0x7bf)]['updateOpacity']=function(){const _0x59b62c=_0x59226c;this['_pressed']||this[_0x59b62c(0x8fe)]?this['opacity']=0xff:_0x59b62c(0x303)!=='AAwaY'?_0x22cd57[_0x59b62c(0x59e)]&&_0x2d4514[_0x59b62c(0x59e)]():(this[_0x59b62c(0x7d8)]+=this[_0x59b62c(0x897)]?this[_0x59b62c(0x65b)]():-0x1*this[_0x59b62c(0x65b)](),this[_0x59b62c(0x7d8)]=Math[_0x59b62c(0x3d0)](0xc0,this[_0x59b62c(0x7d8)]));},Sprite_TitlePictureButton['prototype']['setClickHandler']=function(_0xbaf3d6){const _0x27dcc8=_0x59226c;this[_0x27dcc8(0x515)]=_0xbaf3d6;},Sprite_TitlePictureButton[_0x59226c(0x7bf)][_0x59226c(0x335)]=function(){const _0x4dc30e=_0x59226c;if(this[_0x4dc30e(0x515)]){if(_0x4dc30e(0x693)!==_0x4dc30e(0x693)){const _0x475b77=_0x4dc30e(0x54e);this[_0x4dc30e(0x64f)]=this[_0x4dc30e(0x64f)]||{};if(this['_colorCache'][_0x475b77])return this[_0x4dc30e(0x64f)][_0x475b77];const _0x32d1c2=_0x48deff[_0x4dc30e(0x2d3)][_0x4dc30e(0x6ad)][_0x4dc30e(0x801)]['ColorTPCost'];return this[_0x4dc30e(0x23a)](_0x475b77,_0x32d1c2);}else this[_0x4dc30e(0x515)]();}},VisuMZ[_0x59226c(0x2d3)]['Spriteset_Base_initialize']=Spriteset_Base[_0x59226c(0x7bf)][_0x59226c(0x72d)],Spriteset_Base['prototype'][_0x59226c(0x72d)]=function(){const _0x282621=_0x59226c;VisuMZ['CoreEngine']['Spriteset_Base_initialize'][_0x282621(0x38e)](this),this[_0x282621(0x86a)]();},Spriteset_Base['prototype'][_0x59226c(0x86a)]=function(){const _0x132abf=_0x59226c;this['_fauxAnimationSprites']=[],this['_pointAnimationSprites']=[],this['_cacheScaleX']=this[_0x132abf(0x485)]['x'],this['_cacheScaleY']=this['scale']['y'];},VisuMZ[_0x59226c(0x2d3)]['Spriteset_Base_destroy']=Spriteset_Base[_0x59226c(0x7bf)][_0x59226c(0x207)],Spriteset_Base['prototype']['destroy']=function(_0x34492a){const _0x1935cf=_0x59226c;this[_0x1935cf(0x2f6)](),this[_0x1935cf(0x1ad)](),VisuMZ['CoreEngine'][_0x1935cf(0x4fa)][_0x1935cf(0x38e)](this,_0x34492a);},VisuMZ[_0x59226c(0x2d3)]['Spriteset_Base_update']=Spriteset_Base[_0x59226c(0x7bf)][_0x59226c(0x334)],Spriteset_Base['prototype'][_0x59226c(0x334)]=function(){const _0x32a04e=_0x59226c;VisuMZ[_0x32a04e(0x2d3)]['Spriteset_Base_update']['call'](this),this[_0x32a04e(0x746)](),this['updateFauxAnimations'](),this[_0x32a04e(0x44c)]();},Spriteset_Base['prototype'][_0x59226c(0x746)]=function(){const _0x84873b=_0x59226c;if(!VisuMZ[_0x84873b(0x2d3)][_0x84873b(0x6ad)][_0x84873b(0x509)]['AntiZoomPictures'])return;if(this[_0x84873b(0x4ff)]===this['scale']['x']&&this[_0x84873b(0x4b5)]===this[_0x84873b(0x485)]['y'])return;this['adjustPictureAntiZoom'](),this[_0x84873b(0x4ff)]=this[_0x84873b(0x485)]['x'],this[_0x84873b(0x4b5)]=this['scale']['y'];},Spriteset_Base['prototype'][_0x59226c(0x8e1)]=function(){const _0x1e96e3=_0x59226c;this[_0x1e96e3(0x485)]['x']!==0x0&&(_0x1e96e3(0x63d)!==_0x1e96e3(0x63d)?_0xb9fba4['DrawItemBackgroundJS'][_0x1e96e3(0x38e)](this,_0x4aee7a):(this[_0x1e96e3(0x8b8)][_0x1e96e3(0x485)]['x']=0x1/this[_0x1e96e3(0x485)]['x'],this['_pictureContainer']['x']=-(this['x']/this[_0x1e96e3(0x485)]['x']))),this[_0x1e96e3(0x485)]['y']!==0x0&&(this['_pictureContainer'][_0x1e96e3(0x485)]['y']=0x1/this[_0x1e96e3(0x485)]['y'],this[_0x1e96e3(0x8b8)]['y']=-(this['y']/this[_0x1e96e3(0x485)]['y']));},VisuMZ[_0x59226c(0x2d3)][_0x59226c(0x344)]=Spriteset_Base[_0x59226c(0x7bf)]['updatePosition'],Spriteset_Base['prototype'][_0x59226c(0x947)]=function(){const _0x481cf3=_0x59226c;VisuMZ[_0x481cf3(0x2d3)][_0x481cf3(0x344)][_0x481cf3(0x38e)](this),this[_0x481cf3(0x66f)]();},Spriteset_Base[_0x59226c(0x7bf)][_0x59226c(0x66f)]=function(){const _0x4bbef4=_0x59226c;if(!$gameScreen)return;if($gameScreen['_shakeDuration']<=0x0)return;this['x']-=Math[_0x4bbef4(0x93a)]($gameScreen[_0x4bbef4(0x84b)]());const _0x4f87ff=$gameScreen['getCoreEngineScreenShakeStyle']();switch($gameScreen[_0x4bbef4(0x8ce)]()){case _0x4bbef4(0x3ca):this['updatePositionCoreEngineShakeOriginal']();break;case _0x4bbef4(0x5bb):this[_0x4bbef4(0x64d)]();break;case _0x4bbef4(0x1cf):this[_0x4bbef4(0x4b8)]();break;default:this[_0x4bbef4(0x958)]();break;}},Spriteset_Base['prototype'][_0x59226c(0x24b)]=function(){const _0x182923=_0x59226c,_0x4b8bf0=VisuMZ[_0x182923(0x2d3)][_0x182923(0x6ad)][_0x182923(0x66e)];if(_0x4b8bf0&&_0x4b8bf0[_0x182923(0x738)])return _0x4b8bf0[_0x182923(0x738)][_0x182923(0x38e)](this);this['x']+=Math[_0x182923(0x93a)]($gameScreen[_0x182923(0x84b)]());},Spriteset_Base[_0x59226c(0x7bf)]['updatePositionCoreEngineShakeRand']=function(){const _0x3c96a6=_0x59226c,_0x4708bc=VisuMZ[_0x3c96a6(0x2d3)]['Settings'][_0x3c96a6(0x66e)];if(_0x4708bc&&_0x4708bc[_0x3c96a6(0x5cc)])return _0x4708bc[_0x3c96a6(0x5cc)]['call'](this);const _0x4424ca=$gameScreen[_0x3c96a6(0x420)]*0.75,_0x191106=$gameScreen[_0x3c96a6(0x866)]*0.6,_0x1ac4ce=$gameScreen[_0x3c96a6(0x375)];this['x']+=Math[_0x3c96a6(0x93a)](Math[_0x3c96a6(0x3ef)](_0x4424ca)-Math[_0x3c96a6(0x3ef)](_0x191106))*(Math[_0x3c96a6(0x3d0)](_0x1ac4ce,0x1e)*0.5),this['y']+=Math['round'](Math[_0x3c96a6(0x3ef)](_0x4424ca)-Math[_0x3c96a6(0x3ef)](_0x191106))*(Math[_0x3c96a6(0x3d0)](_0x1ac4ce,0x1e)*0.5);},Spriteset_Base[_0x59226c(0x7bf)][_0x59226c(0x64d)]=function(){const _0x306be8=_0x59226c,_0x5855d9=VisuMZ[_0x306be8(0x2d3)]['Settings'][_0x306be8(0x66e)];if(_0x5855d9&&_0x5855d9['horzJS'])return _0x5855d9[_0x306be8(0x1c3)][_0x306be8(0x38e)](this);const _0x320511=$gameScreen[_0x306be8(0x420)]*0.75,_0x2837a6=$gameScreen['_shakeSpeed']*0.6,_0x42fb0a=$gameScreen[_0x306be8(0x375)];this['x']+=Math['round'](Math[_0x306be8(0x3ef)](_0x320511)-Math[_0x306be8(0x3ef)](_0x2837a6))*(Math[_0x306be8(0x3d0)](_0x42fb0a,0x1e)*0.5);},Spriteset_Base[_0x59226c(0x7bf)][_0x59226c(0x4b8)]=function(){const _0x3f54bd=_0x59226c,_0x21149b=VisuMZ[_0x3f54bd(0x2d3)]['Settings'][_0x3f54bd(0x66e)];if(_0x21149b&&_0x21149b['vertJS'])return _0x21149b['vertJS'][_0x3f54bd(0x38e)](this);const _0x3df5cf=$gameScreen[_0x3f54bd(0x420)]*0.75,_0x3396ca=$gameScreen[_0x3f54bd(0x866)]*0.6,_0x459a13=$gameScreen['_shakeDuration'];this['y']+=Math[_0x3f54bd(0x93a)](Math[_0x3f54bd(0x3ef)](_0x3df5cf)-Math[_0x3f54bd(0x3ef)](_0x3396ca))*(Math[_0x3f54bd(0x3d0)](_0x459a13,0x1e)*0.5);},Spriteset_Base[_0x59226c(0x7bf)]['updateFauxAnimations']=function(){const _0x1097e9=_0x59226c;for(const _0x5c32bd of this[_0x1097e9(0x737)]){!_0x5c32bd[_0x1097e9(0x6a1)]()&&this[_0x1097e9(0x605)](_0x5c32bd);}this[_0x1097e9(0x311)]();},Spriteset_Base[_0x59226c(0x7bf)][_0x59226c(0x311)]=function(){const _0x544623=_0x59226c;for(;;){const _0x503c3f=$gameTemp[_0x544623(0x35f)]();if(_0x503c3f)this[_0x544623(0x4d1)](_0x503c3f);else{if(_0x544623(0x94e)==='LGXJa')!_0x5c768c[_0x544623(0x47d)]&&_0x27ec32[_0x544623(0x897)]&&_0x19e527[_0x544623(0x53e)](_0x27f7ed);else break;}}},Spriteset_Base[_0x59226c(0x7bf)]['createFauxAnimation']=function(_0x3a43e7){const _0x3ae5c6=_0x59226c,_0xc0adcf=$dataAnimations[_0x3a43e7[_0x3ae5c6(0x3d4)]],_0x571362=_0x3a43e7[_0x3ae5c6(0x7c8)],_0x4b58cc=_0x3a43e7[_0x3ae5c6(0x70d)],_0x1fa214=_0x3a43e7[_0x3ae5c6(0x97b)];let _0x47567b=this['animationBaseDelay']();const _0x16a0ae=this[_0x3ae5c6(0x6b7)]();if(this[_0x3ae5c6(0x4eb)](_0xc0adcf))for(const _0x16632f of _0x571362){this[_0x3ae5c6(0x45a)]([_0x16632f],_0xc0adcf,_0x4b58cc,_0x47567b,_0x1fa214),_0x47567b+=_0x16a0ae;}else this[_0x3ae5c6(0x45a)](_0x571362,_0xc0adcf,_0x4b58cc,_0x47567b,_0x1fa214);},Spriteset_Base['prototype']['createFauxAnimationSprite']=function(_0x120717,_0x486ad2,_0x2c4901,_0x205125,_0x691f){const _0x318ac4=_0x59226c,_0x4c8ac5=this[_0x318ac4(0x494)](_0x486ad2),_0x2b95b0=new(_0x4c8ac5?Sprite_AnimationMV:Sprite_Animation)(),_0x30328b=this[_0x318ac4(0x82c)](_0x120717);this['animationShouldMirror'](_0x120717[0x0])&&(_0x318ac4(0x410)!==_0x318ac4(0x722)?_0x2c4901=!_0x2c4901:!_0x513c10[_0x318ac4(0x6a1)]()&&this[_0x318ac4(0x605)](_0x1f4163)),_0x2b95b0['targetObjects']=_0x120717,_0x2b95b0[_0x318ac4(0x275)](_0x30328b,_0x486ad2,_0x2c4901,_0x205125),_0x2b95b0[_0x318ac4(0x293)](_0x691f),this[_0x318ac4(0x603)]['addChild'](_0x2b95b0),this[_0x318ac4(0x737)]['push'](_0x2b95b0);},Spriteset_Base['prototype'][_0x59226c(0x605)]=function(_0x3a6ccd){const _0x42bb11=_0x59226c;this[_0x42bb11(0x737)]['remove'](_0x3a6ccd),this[_0x42bb11(0x603)][_0x42bb11(0x5ec)](_0x3a6ccd);for(const _0x2024de of _0x3a6ccd[_0x42bb11(0x60e)]){_0x2024de[_0x42bb11(0x22d)]&&_0x2024de[_0x42bb11(0x22d)]();}_0x3a6ccd['destroy']();},Spriteset_Base['prototype']['removeAllFauxAnimations']=function(){const _0x37d368=_0x59226c;for(const _0x357e8e of this[_0x37d368(0x737)]){if('thPis'!==_0x37d368(0x862))this[_0x37d368(0x605)](_0x357e8e);else return this[_0x37d368(0x5f3)](_0x406574);}},Spriteset_Base[_0x59226c(0x7bf)][_0x59226c(0x57c)]=function(){const _0x4332a3=_0x59226c;return this[_0x4332a3(0x737)][_0x4332a3(0x587)]>0x0;},Spriteset_Base['prototype'][_0x59226c(0x44c)]=function(){const _0x5d4e2e=_0x59226c;for(const _0x3a3fe8 of this[_0x5d4e2e(0x38a)]){if(_0x5d4e2e(0x297)===_0x5d4e2e(0x297)){if(!_0x3a3fe8[_0x5d4e2e(0x6a1)]()){if('WxTqt'==='WxTqt')this[_0x5d4e2e(0x6da)](_0x3a3fe8);else return _0x412953[_0x5d4e2e(0x2d3)][_0x5d4e2e(0x6ad)][_0x5d4e2e(0x509)][_0x5d4e2e(0x718)]?0x0:_0x5b3699[_0x5d4e2e(0x2d3)][_0x5d4e2e(0x280)][_0x5d4e2e(0x38e)](this,_0x5d2078);}}else this['_menuButton']['x']=_0x2d09c8[_0x5d4e2e(0x8bc)]+0x4;}this['processPointAnimationRequests']();},Spriteset_Base[_0x59226c(0x7bf)][_0x59226c(0x299)]=function(){const _0x510f7a=_0x59226c;for(;;){const _0x445e2b=$gameTemp['retrievePointAnimation']();if(_0x445e2b)'IlXkz'==='ayHpa'?_0x4ba70e[_0x510f7a(0x2d3)][_0x510f7a(0x975)][_0x510f7a(0x38e)](this):this[_0x510f7a(0x39c)](_0x445e2b);else break;}},Spriteset_Base[_0x59226c(0x7bf)][_0x59226c(0x39c)]=function(_0x1a1278){const _0x4ae904=_0x59226c,_0x557da0=$dataAnimations[_0x1a1278['animationId']],_0xe66888=this['createPointAnimationTargets'](_0x1a1278),_0x24d6ce=_0x1a1278[_0x4ae904(0x70d)],_0x54b725=_0x1a1278[_0x4ae904(0x97b)];let _0x29880f=this[_0x4ae904(0x86b)]();const _0x1619da=this['animationNextDelay']();if(this[_0x4ae904(0x4eb)](_0x557da0))for(const _0x3246b1 of _0xe66888){if(_0x4ae904(0x46b)===_0x4ae904(0x46b))this[_0x4ae904(0x3da)]([_0x3246b1],_0x557da0,_0x24d6ce,_0x29880f,_0x54b725),_0x29880f+=_0x1619da;else{return _0x38c18e[_0x4ae904(0x7bf)][_0x4ae904(0x935)][_0x4ae904(0x38e)](this)+_0x1b63dd[_0x4ae904(0x2d3)][_0x4ae904(0x6ad)][_0x4ae904(0x1c4)][_0x4ae904(0x5e6)];;}}else _0x4ae904(0x313)===_0x4ae904(0x3dc)?this['_CoreEngineSettings']={'SideView':_0x1b1343['optSideView'],'BattleSystem':this[_0x4ae904(0x1d4)](),'FontSize':_0x560c62[_0x4ae904(0x548)][_0x4ae904(0x391)],'Padding':0xc}:this[_0x4ae904(0x3da)](_0xe66888,_0x557da0,_0x24d6ce,_0x29880f,_0x54b725);},Spriteset_Base[_0x59226c(0x7bf)][_0x59226c(0x5c2)]=function(_0x1e9371){const _0x2b4fd7=_0x59226c,_0x47a533=new Sprite_Clickable();_0x47a533['x']=_0x1e9371['x'],_0x47a533['y']=_0x1e9371['y'],_0x47a533['z']=0x64;const _0x195c5a=this[_0x2b4fd7(0x5bf)]();return _0x195c5a[_0x2b4fd7(0x83f)](_0x47a533),[_0x47a533];},Spriteset_Base[_0x59226c(0x7bf)][_0x59226c(0x5bf)]=function(){return this;},Spriteset_Map['prototype'][_0x59226c(0x5bf)]=function(){const _0x2ad25e=_0x59226c;return this[_0x2ad25e(0x933)]||this;},Spriteset_Battle[_0x59226c(0x7bf)]['getPointAnimationLayer']=function(){const _0x5230ab=_0x59226c;return this[_0x5230ab(0x3a2)]||this;},Spriteset_Base['prototype'][_0x59226c(0x3da)]=function(_0x2f44f7,_0x149206,_0x4a6092,_0x40c89e,_0x1d8e88){const _0x23e081=_0x59226c,_0x34508c=this[_0x23e081(0x494)](_0x149206),_0x3a67b4=new(_0x34508c?Sprite_AnimationMV:Sprite_Animation)();_0x3a67b4['targetObjects']=_0x2f44f7,_0x3a67b4['setup'](_0x2f44f7,_0x149206,_0x4a6092,_0x40c89e),_0x3a67b4[_0x23e081(0x293)](_0x1d8e88),this[_0x23e081(0x603)]['addChild'](_0x3a67b4),this[_0x23e081(0x38a)]['push'](_0x3a67b4);},Spriteset_Base[_0x59226c(0x7bf)][_0x59226c(0x6da)]=function(_0x1671a1){const _0x123420=_0x59226c;this['_pointAnimationSprites'][_0x123420(0x60c)](_0x1671a1),this[_0x123420(0x603)][_0x123420(0x5ec)](_0x1671a1);for(const _0x4e563a of _0x1671a1[_0x123420(0x60e)]){if(_0x123420(0x34a)===_0x123420(0x34a)){_0x4e563a[_0x123420(0x22d)]&&_0x4e563a[_0x123420(0x22d)]();const _0x41ddeb=this[_0x123420(0x5bf)]();if(_0x41ddeb)_0x41ddeb['removeChild'](_0x4e563a);}else return _0x4b52ae[_0x123420(0x2d3)][_0x123420(0x6ad)][_0x123420(0x1c4)][_0x123420(0x771)];}_0x1671a1['destroy']();},Spriteset_Base['prototype'][_0x59226c(0x1ad)]=function(){const _0x692751=_0x59226c;for(const _0x501025 of this[_0x692751(0x38a)]){this['removePointAnimation'](_0x501025);}},Spriteset_Base[_0x59226c(0x7bf)][_0x59226c(0x380)]=function(){const _0x327d39=_0x59226c;return this['_pointAnimationSprites'][_0x327d39(0x587)]>0x0;},VisuMZ[_0x59226c(0x2d3)]['Spriteset_Base_isAnimationPlaying']=Spriteset_Base[_0x59226c(0x7bf)][_0x59226c(0x7f0)],Spriteset_Base[_0x59226c(0x7bf)]['isAnimationPlaying']=function(){const _0x1dec22=_0x59226c;return VisuMZ[_0x1dec22(0x2d3)][_0x1dec22(0x98a)]['call'](this)||this['isPointAnimationPlaying']();},Spriteset_Battle[_0x59226c(0x7bf)][_0x59226c(0x34d)]=function(){const _0x38dd41=_0x59226c;this[_0x38dd41(0x678)]=new PIXI[(_0x38dd41(0x2c4))][(_0x38dd41(0x23f))](clamp=!![]),this['_backgroundSprite']=new Sprite(),this['_backgroundSprite'][_0x38dd41(0x22a)]=SceneManager['backgroundBitmap'](),this['_backgroundSprite'][_0x38dd41(0x2c4)]=[this[_0x38dd41(0x678)]],this[_0x38dd41(0x806)]['addChild'](this['_backgroundSprite']);},VisuMZ[_0x59226c(0x2d3)][_0x59226c(0x44a)]=Spriteset_Battle['prototype']['createEnemies'],Spriteset_Battle['prototype'][_0x59226c(0x30b)]=function(){const _0x2c682e=_0x59226c;this['coreEngineRepositionEnemies']()&&this[_0x2c682e(0x74a)](),VisuMZ[_0x2c682e(0x2d3)][_0x2c682e(0x44a)][_0x2c682e(0x38e)](this);},Spriteset_Battle[_0x59226c(0x7bf)][_0x59226c(0x28e)]=function(){const _0x328822=_0x59226c,_0x84d597=VisuMZ[_0x328822(0x2d3)]['Settings'][_0x328822(0x882)];if(!_0x84d597)return![];if(Utils[_0x328822(0x369)]>='1.3.0'&&!_0x84d597['RepositionEnemies130'])return![];return _0x84d597[_0x328822(0x6ac)];},Spriteset_Battle['prototype'][_0x59226c(0x74a)]=function(){const _0x198b2e=_0x59226c;for(member of $gameTroop[_0x198b2e(0x2cf)]()){member[_0x198b2e(0x47a)]();}},VisuMZ[_0x59226c(0x2d3)]['Window_Base_initialize']=Window_Base[_0x59226c(0x7bf)][_0x59226c(0x72d)],Window_Base[_0x59226c(0x7bf)]['initialize']=function(_0x11ab4f){const _0x5709bf=_0x59226c;_0x11ab4f['x']=Math[_0x5709bf(0x93a)](_0x11ab4f['x']),_0x11ab4f['y']=Math[_0x5709bf(0x93a)](_0x11ab4f['y']),_0x11ab4f[_0x5709bf(0x4d6)]=Math[_0x5709bf(0x93a)](_0x11ab4f[_0x5709bf(0x4d6)]),_0x11ab4f['height']=Math[_0x5709bf(0x93a)](_0x11ab4f[_0x5709bf(0x235)]),this[_0x5709bf(0x88c)](),VisuMZ[_0x5709bf(0x2d3)][_0x5709bf(0x6bc)][_0x5709bf(0x38e)](this,_0x11ab4f),this[_0x5709bf(0x390)]();},Window_Base[_0x59226c(0x7bf)][_0x59226c(0x88c)]=function(){const _0x4ef179=_0x59226c;this['_digitGrouping']=VisuMZ[_0x4ef179(0x2d3)][_0x4ef179(0x6ad)][_0x4ef179(0x509)]['DigitGroupingStandardText'],this[_0x4ef179(0x29d)]=VisuMZ[_0x4ef179(0x2d3)][_0x4ef179(0x6ad)][_0x4ef179(0x509)]['DigitGroupingExText'];},Window_Base[_0x59226c(0x7bf)][_0x59226c(0x543)]=function(){const _0x572ef7=_0x59226c;return VisuMZ[_0x572ef7(0x2d3)][_0x572ef7(0x6ad)][_0x572ef7(0x1c4)][_0x572ef7(0x8ca)];},Window_Base['prototype'][_0x59226c(0x209)]=function(){const _0xc3ccf4=_0x59226c;return VisuMZ[_0xc3ccf4(0x2d3)]['Settings'][_0xc3ccf4(0x1c4)][_0xc3ccf4(0x7a8)];},Window_Base[_0x59226c(0x7bf)][_0x59226c(0x1e5)]=function(){const _0x193f86=_0x59226c;if($gameSystem[_0x193f86(0x773)])this[_0x193f86(0x51b)]=$gameSystem[_0x193f86(0x773)]();else{if(_0x193f86(0x7c5)!==_0x193f86(0x727))this[_0x193f86(0x51b)]=VisuMZ[_0x193f86(0x2d3)][_0x193f86(0x6ad)][_0x193f86(0x1c4)][_0x193f86(0x826)];else return _0x55caa7['buttonAssistOk'];}},Window_Base[_0x59226c(0x7bf)][_0x59226c(0x1cd)]=function(){const _0xaaf62b=_0x59226c;return VisuMZ[_0xaaf62b(0x2d3)][_0xaaf62b(0x6ad)][_0xaaf62b(0x1c4)]['TranslucentOpacity'];},Window_Base[_0x59226c(0x7bf)][_0x59226c(0x238)]=function(){const _0x161046=_0x59226c;return VisuMZ['CoreEngine'][_0x161046(0x6ad)]['Window'][_0x161046(0x835)];},VisuMZ['CoreEngine']['Window_Base_update']=Window_Base['prototype'][_0x59226c(0x334)],Window_Base[_0x59226c(0x7bf)][_0x59226c(0x334)]=function(){const _0x52e7db=_0x59226c;VisuMZ[_0x52e7db(0x2d3)][_0x52e7db(0x705)][_0x52e7db(0x38e)](this),this[_0x52e7db(0x821)]();},Window_Base[_0x59226c(0x7bf)][_0x59226c(0x2ea)]=function(){const _0x717a10=_0x59226c;this[_0x717a10(0x6d3)]&&(this[_0x717a10(0x631)]+=this[_0x717a10(0x238)](),this[_0x717a10(0x960)]()&&(this[_0x717a10(0x6d3)]=![]));},Window_Base[_0x59226c(0x7bf)][_0x59226c(0x25a)]=function(){const _0x1130c7=_0x59226c;this[_0x1130c7(0x500)]&&(this[_0x1130c7(0x631)]-=this[_0x1130c7(0x238)](),this[_0x1130c7(0x572)]()&&(this[_0x1130c7(0x500)]=![]));},VisuMZ[_0x59226c(0x2d3)][_0x59226c(0x751)]=Window_Base[_0x59226c(0x7bf)][_0x59226c(0x273)],Window_Base['prototype'][_0x59226c(0x273)]=function(_0x212f10,_0x10f7d7,_0x6747ba,_0x1293e7,_0x5d44fe){const _0x1f5573=_0x59226c;if(this['useDigitGrouping']())_0x212f10=VisuMZ[_0x1f5573(0x807)](_0x212f10);VisuMZ[_0x1f5573(0x2d3)][_0x1f5573(0x751)]['call'](this,_0x212f10,_0x10f7d7,_0x6747ba,_0x1293e7,_0x5d44fe);},Window_Base[_0x59226c(0x7bf)][_0x59226c(0x875)]=function(){const _0x4f33cc=_0x59226c;return this[_0x4f33cc(0x78a)];},VisuMZ[_0x59226c(0x2d3)][_0x59226c(0x939)]=Window_Base[_0x59226c(0x7bf)][_0x59226c(0x4f3)],Window_Base[_0x59226c(0x7bf)][_0x59226c(0x4f3)]=function(_0x446db6,_0x5362be,_0x17c26b,_0x545a7e){const _0x17d5c0=_0x59226c;var _0x321519=VisuMZ['CoreEngine'][_0x17d5c0(0x939)][_0x17d5c0(0x38e)](this,_0x446db6,_0x5362be,_0x17c26b,_0x545a7e);if(this[_0x17d5c0(0x944)]())_0x321519[_0x17d5c0(0x2e8)]=VisuMZ[_0x17d5c0(0x807)](_0x321519['text']);return _0x321519;},Window_Base[_0x59226c(0x7bf)][_0x59226c(0x944)]=function(){const _0x64e405=_0x59226c;return this[_0x64e405(0x29d)];},Window_Base[_0x59226c(0x7bf)][_0x59226c(0x634)]=function(_0x292a82){const _0x46c1c2=_0x59226c;this[_0x46c1c2(0x78a)]=_0x292a82;},Window_Base[_0x59226c(0x7bf)][_0x59226c(0x2bf)]=function(_0x5f4e12){const _0x4bb68b=_0x59226c;this[_0x4bb68b(0x29d)]=_0x5f4e12;},VisuMZ['CoreEngine']['Window_Base_drawIcon']=Window_Base[_0x59226c(0x7bf)][_0x59226c(0x71e)],Window_Base[_0x59226c(0x7bf)][_0x59226c(0x71e)]=function(_0x295143,_0x1336da,_0x4dc1cf){const _0x166b03=_0x59226c;_0x1336da=Math['round'](_0x1336da),_0x4dc1cf=Math['round'](_0x4dc1cf),VisuMZ['CoreEngine'][_0x166b03(0x576)]['call'](this,_0x295143,_0x1336da,_0x4dc1cf);},VisuMZ[_0x59226c(0x2d3)][_0x59226c(0x21a)]=Window_Base['prototype'][_0x59226c(0x8c8)],Window_Base[_0x59226c(0x7bf)][_0x59226c(0x8c8)]=function(_0x2b8515,_0x23f656,_0x4efe63,_0x33435c,_0x2ad9da,_0x584dd8){const _0x175084=_0x59226c;_0x2ad9da=_0x2ad9da||ImageManager[_0x175084(0x68e)],_0x584dd8=_0x584dd8||ImageManager['faceHeight'],_0x4efe63=Math['round'](_0x4efe63),_0x33435c=Math[_0x175084(0x93a)](_0x33435c),_0x2ad9da=Math['round'](_0x2ad9da),_0x584dd8=Math['round'](_0x584dd8),VisuMZ['CoreEngine'][_0x175084(0x21a)]['call'](this,_0x2b8515,_0x23f656,_0x4efe63,_0x33435c,_0x2ad9da,_0x584dd8);},VisuMZ[_0x59226c(0x2d3)][_0x59226c(0x4ba)]=Window_Base[_0x59226c(0x7bf)][_0x59226c(0x3b5)],Window_Base[_0x59226c(0x7bf)][_0x59226c(0x3b5)]=function(_0x41a7a5,_0x32bc86,_0x2e9505,_0xba2b08){const _0x1dc441=_0x59226c;_0x2e9505=Math['round'](_0x2e9505),_0xba2b08=Math[_0x1dc441(0x93a)](_0xba2b08),VisuMZ['CoreEngine'][_0x1dc441(0x4ba)][_0x1dc441(0x38e)](this,_0x41a7a5,_0x32bc86,_0x2e9505,_0xba2b08);},VisuMZ[_0x59226c(0x2d3)][_0x59226c(0x56f)]=Window_Selectable[_0x59226c(0x7bf)][_0x59226c(0x469)],Window_Selectable[_0x59226c(0x7bf)][_0x59226c(0x469)]=function(_0x8de37a){const _0x1cccc3=_0x59226c;let _0x378b9c=VisuMZ[_0x1cccc3(0x2d3)][_0x1cccc3(0x56f)]['call'](this,_0x8de37a);return _0x378b9c['x']=Math[_0x1cccc3(0x93a)](_0x378b9c['x']),_0x378b9c['y']=Math[_0x1cccc3(0x93a)](_0x378b9c['y']),_0x378b9c['width']=Math[_0x1cccc3(0x93a)](_0x378b9c[_0x1cccc3(0x4d6)]),_0x378b9c['height']=Math[_0x1cccc3(0x93a)](_0x378b9c['height']),_0x378b9c;},VisuMZ[_0x59226c(0x2d3)][_0x59226c(0x215)]=Window_StatusBase[_0x59226c(0x7bf)][_0x59226c(0x827)],Window_StatusBase[_0x59226c(0x7bf)][_0x59226c(0x827)]=function(_0x1e5c32,_0x53e3e9,_0x4e550a){const _0x403d03=_0x59226c;_0x53e3e9=Math[_0x403d03(0x93a)](_0x53e3e9),_0x4e550a=Math['round'](_0x4e550a),VisuMZ[_0x403d03(0x2d3)][_0x403d03(0x215)][_0x403d03(0x38e)](this,_0x1e5c32,_0x53e3e9,_0x4e550a);},Window_Base[_0x59226c(0x7bf)][_0x59226c(0x390)]=function(){const _0x2f8c6c=_0x59226c;this['_coreEasing']={'duration':0x0,'wholeDuration':0x0,'type':_0x2f8c6c(0x53c),'targetX':this['x'],'targetY':this['y'],'targetScaleX':this[_0x2f8c6c(0x485)]['x'],'targetScaleY':this[_0x2f8c6c(0x485)]['y'],'targetOpacity':this[_0x2f8c6c(0x7d8)],'targetBackOpacity':this[_0x2f8c6c(0x51b)],'targetContentsOpacity':this['contentsOpacity']};},Window_Base[_0x59226c(0x7bf)][_0x59226c(0x821)]=function(){const _0x322a9f=_0x59226c;if(!this[_0x322a9f(0x3c4)])return;if(this[_0x322a9f(0x3c4)][_0x322a9f(0x259)]<=0x0)return;this['x']=this['applyCoreEasing'](this['x'],this[_0x322a9f(0x3c4)]['targetX']),this['y']=this[_0x322a9f(0x470)](this['y'],this['_coreEasing'][_0x322a9f(0x676)]),this['scale']['x']=this['applyCoreEasing'](this['scale']['x'],this[_0x322a9f(0x3c4)][_0x322a9f(0x35d)]),this['scale']['y']=this[_0x322a9f(0x470)](this[_0x322a9f(0x485)]['y'],this[_0x322a9f(0x3c4)][_0x322a9f(0x848)]),this[_0x322a9f(0x7d8)]=this[_0x322a9f(0x470)](this[_0x322a9f(0x7d8)],this[_0x322a9f(0x3c4)]['targetOpacity']),this[_0x322a9f(0x51b)]=this['applyCoreEasing'](this[_0x322a9f(0x51b)],this[_0x322a9f(0x3c4)]['targetBackOpacity']),this['contentsOpacity']=this[_0x322a9f(0x470)](this[_0x322a9f(0x33e)],this[_0x322a9f(0x3c4)][_0x322a9f(0x2d1)]),this['_coreEasing'][_0x322a9f(0x259)]--;},Window_Base[_0x59226c(0x7bf)]['applyCoreEasing']=function(_0x2bf500,_0x326527){const _0x5b579c=_0x59226c;if(!this['_coreEasing'])return _0x326527;const _0x19270f=this[_0x5b579c(0x3c4)][_0x5b579c(0x259)],_0x152be2=this[_0x5b579c(0x3c4)][_0x5b579c(0x2c2)],_0x35cff4=this['calcCoreEasing']((_0x152be2-_0x19270f)/_0x152be2),_0x298087=this['calcCoreEasing']((_0x152be2-_0x19270f+0x1)/_0x152be2),_0x429450=(_0x2bf500-_0x326527*_0x35cff4)/(0x1-_0x35cff4);return _0x429450+(_0x326527-_0x429450)*_0x298087;},Window_Base[_0x59226c(0x7bf)][_0x59226c(0x4b4)]=function(_0x159c09){const _0x4ddccf=_0x59226c;if(!this['_coreEasing'])return _0x159c09;return VisuMZ[_0x4ddccf(0x748)](_0x159c09,this['_coreEasing'][_0x4ddccf(0x5c1)]||_0x4ddccf(0x53c));},Window_Base['prototype'][_0x59226c(0x4cc)]=function(_0x3176f4,_0x11479a){const _0xd464f4=_0x59226c;if(!this[_0xd464f4(0x3c4)])return;this['x']=this[_0xd464f4(0x3c4)][_0xd464f4(0x2c8)],this['y']=this[_0xd464f4(0x3c4)][_0xd464f4(0x676)],this[_0xd464f4(0x485)]['x']=this[_0xd464f4(0x3c4)][_0xd464f4(0x35d)],this[_0xd464f4(0x485)]['y']=this['_coreEasing'][_0xd464f4(0x848)],this[_0xd464f4(0x7d8)]=this['_coreEasing'][_0xd464f4(0x27d)],this[_0xd464f4(0x51b)]=this['_coreEasing'][_0xd464f4(0x200)],this[_0xd464f4(0x33e)]=this['_coreEasing']['targetContentsOpacity'],this['setupCoreEasing'](_0x3176f4,_0x11479a,this['x'],this['y'],this[_0xd464f4(0x485)]['x'],this[_0xd464f4(0x485)]['y'],this['opacity'],this[_0xd464f4(0x51b)],this[_0xd464f4(0x33e)]);},Window_Base[_0x59226c(0x7bf)][_0x59226c(0x21f)]=function(_0x16b670,_0x305449,_0x1db72a,_0x262f6b,_0x762869,_0xb96c4f,_0x1bf003,_0x1d2eae,_0xc9410c){const _0x3599db=_0x59226c;this[_0x3599db(0x3c4)]={'duration':_0x16b670,'wholeDuration':_0x16b670,'type':_0x305449,'targetX':_0x1db72a,'targetY':_0x262f6b,'targetScaleX':_0x762869,'targetScaleY':_0xb96c4f,'targetOpacity':_0x1bf003,'targetBackOpacity':_0x1d2eae,'targetContentsOpacity':_0xc9410c};},Window_Base[_0x59226c(0x7bf)][_0x59226c(0x463)]=function(_0x519ffc,_0x571161,_0x44857d,_0x2e51ca,_0x2482e4){const _0x41c020=_0x59226c;this[_0x41c020(0x435)](),this[_0x41c020(0x729)][_0x41c020(0x391)]=VisuMZ[_0x41c020(0x2d3)][_0x41c020(0x6ad)][_0x41c020(0x1b0)][_0x41c020(0x7e4)];const _0x1b5f8f=VisuMZ[_0x41c020(0x2d3)]['Settings'][_0x41c020(0x1b0)][_0x41c020(0x46d)];if(_0x1b5f8f>0x0&&_0x571161===TextManager[_0x41c020(0x3fd)]){const _0x5bd4af=_0x2e51ca+(this[_0x41c020(0x543)]()-ImageManager['iconHeight'])/0x2;this[_0x41c020(0x71e)](_0x1b5f8f,_0x44857d+(_0x2482e4-ImageManager[_0x41c020(0x1b6)]),_0x5bd4af),_0x2482e4-=ImageManager[_0x41c020(0x1b6)]+0x4;}else{if(_0x41c020(0x6a4)!==_0x41c020(0x6a4)){const _0x3e78ef=new _0x4d64d9['BaseTexture']();_0x3e78ef[_0x41c020(0x930)](0x800,0x800),_0x1412a9[_0x41c020(0x2d3)]['Settings']['QoL'][_0x41c020(0x633)]&&(_0x3e78ef[_0x41c020(0x869)]=_0x2cd874['SCALE_MODES'][_0x41c020(0x416)]),this[_0x41c020(0x5de)][_0x41c020(0x564)](_0x3e78ef);}else this[_0x41c020(0x4b0)](ColorManager[_0x41c020(0x1f2)]()),this[_0x41c020(0x273)](_0x571161,_0x44857d,_0x2e51ca,_0x2482e4,'right'),_0x2482e4-=this[_0x41c020(0x52b)](_0x571161)+0x6;}this[_0x41c020(0x271)]();const _0x364585=this['textWidth'](this['_digitGrouping']?VisuMZ[_0x41c020(0x807)](_0x519ffc):_0x519ffc);_0x364585>_0x2482e4?this['drawText'](VisuMZ[_0x41c020(0x2d3)]['Settings'][_0x41c020(0x1b0)][_0x41c020(0x8b5)],_0x44857d,_0x2e51ca,_0x2482e4,_0x41c020(0x1ca)):this[_0x41c020(0x273)](_0x519ffc,_0x44857d,_0x2e51ca,_0x2482e4,_0x41c020(0x1ca)),this[_0x41c020(0x435)]();},Window_Base[_0x59226c(0x7bf)][_0x59226c(0x537)]=function(_0xfab46f,_0x1eff17,_0x59f6ab,_0x189938,_0x49ef04){const _0x19ebe9=_0x59226c,_0x30b6c2=ImageManager['loadSystem'](_0x19ebe9(0x36f)),_0x38504d=ImageManager[_0x19ebe9(0x1b6)],_0x1d6489=ImageManager[_0x19ebe9(0x4e4)],_0x523c11=_0xfab46f%0x10*_0x38504d,_0x250b7a=Math[_0x19ebe9(0x966)](_0xfab46f/0x10)*_0x1d6489,_0x155a78=_0x189938,_0x35c240=_0x189938;this[_0x19ebe9(0x729)]['_context'][_0x19ebe9(0x333)]=_0x49ef04,this[_0x19ebe9(0x729)][_0x19ebe9(0x307)](_0x30b6c2,_0x523c11,_0x250b7a,_0x38504d,_0x1d6489,_0x1eff17,_0x59f6ab,_0x155a78,_0x35c240),this[_0x19ebe9(0x729)][_0x19ebe9(0x665)][_0x19ebe9(0x333)]=!![];},Window_Base[_0x59226c(0x7bf)][_0x59226c(0x4c7)]=function(_0x447fc5,_0x2def28,_0x4800e5,_0x404944,_0x4ed4c6,_0x2261ec){const _0xe00ba7=_0x59226c,_0x1c9061=Math['floor']((_0x4800e5-0x2)*_0x404944),_0x10d5c9=Sprite_Gauge[_0xe00ba7(0x7bf)][_0xe00ba7(0x1c6)][_0xe00ba7(0x38e)](this),_0x5edaf1=_0x2def28+this['lineHeight']()-_0x10d5c9-0x2;this[_0xe00ba7(0x729)][_0xe00ba7(0x5ad)](_0x447fc5,_0x5edaf1,_0x4800e5,_0x10d5c9,ColorManager[_0xe00ba7(0x33a)]()),this[_0xe00ba7(0x729)]['gradientFillRect'](_0x447fc5+0x1,_0x5edaf1+0x1,_0x1c9061,_0x10d5c9-0x2,_0x4ed4c6,_0x2261ec);},Window_Selectable[_0x59226c(0x7bf)][_0x59226c(0x626)]=function(_0x1cdf1b){const _0x1756c5=_0x59226c;let _0x155b6d=this[_0x1756c5(0x213)]();const _0x1aca5e=this[_0x1756c5(0x2d2)](),_0x579986=this[_0x1756c5(0x8db)]();if(this[_0x1756c5(0x97c)]()&&(_0x155b6d<_0x1aca5e||_0x1cdf1b&&_0x579986===0x1)){if(_0x1756c5(0x49d)===_0x1756c5(0x518))return _0x459904[_0x1756c5(0x206)](_0x1756c5(0x5e8));else{_0x155b6d+=_0x579986;if(_0x155b6d>=_0x1aca5e)_0x155b6d=_0x1aca5e-0x1;this[_0x1756c5(0x54f)](_0x155b6d);}}else!this[_0x1756c5(0x97c)]()&&((_0x155b6d<_0x1aca5e-_0x579986||_0x1cdf1b&&_0x579986===0x1)&&this[_0x1756c5(0x54f)]((_0x155b6d+_0x579986)%_0x1aca5e));},VisuMZ[_0x59226c(0x2d3)][_0x59226c(0x3a0)]=Window_Selectable[_0x59226c(0x7bf)][_0x59226c(0x626)],Window_Selectable[_0x59226c(0x7bf)][_0x59226c(0x626)]=function(_0x36cc56){const _0x24b176=_0x59226c;if(this[_0x24b176(0x97c)]()&&_0x36cc56&&this['maxCols']()===0x1&&this[_0x24b176(0x213)]()===this[_0x24b176(0x2d2)]()-0x1){if(_0x24b176(0x592)!==_0x24b176(0x21b))this['smoothSelect'](0x0);else return this[_0x24b176(0x630)]()?_0x17b4ea[_0x24b176(0x2d3)][_0x24b176(0x44f)][_0x24b176(0x38e)](this):0x0;}else _0x24b176(0x368)===_0x24b176(0x325)?(_0x195050[_0x24b176(0x2d3)][_0x24b176(0x344)][_0x24b176(0x38e)](this),this[_0x24b176(0x66f)]()):VisuMZ[_0x24b176(0x2d3)]['Window_Selectable_cursorDown'][_0x24b176(0x38e)](this,_0x36cc56);},Window_Selectable[_0x59226c(0x7bf)][_0x59226c(0x714)]=function(_0x28fd06){const _0x145b46=_0x59226c;let _0x55eb9d=Math[_0x145b46(0x228)](0x0,this[_0x145b46(0x213)]());const _0x1c3e11=this[_0x145b46(0x2d2)](),_0x28d640=this[_0x145b46(0x8db)]();if(this[_0x145b46(0x97c)]()&&_0x55eb9d>0x0||_0x28fd06&&_0x28d640===0x1){_0x55eb9d-=_0x28d640;if(_0x55eb9d<=0x0)_0x55eb9d=0x0;this[_0x145b46(0x54f)](_0x55eb9d);}else!this['isUseModernControls']()&&((_0x55eb9d>=_0x28d640||_0x28fd06&&_0x28d640===0x1)&&this[_0x145b46(0x54f)]((_0x55eb9d-_0x28d640+_0x1c3e11)%_0x1c3e11));},VisuMZ['CoreEngine'][_0x59226c(0x41f)]=Window_Selectable[_0x59226c(0x7bf)][_0x59226c(0x714)],Window_Selectable[_0x59226c(0x7bf)]['cursorUp']=function(_0x5f3341){const _0x358746=_0x59226c;if(this[_0x358746(0x97c)]()&&_0x5f3341&&this[_0x358746(0x8db)]()===0x1&&this[_0x358746(0x213)]()===0x0)this[_0x358746(0x54f)](this[_0x358746(0x2d2)]()-0x1);else{if(_0x358746(0x1ae)!=='AlzVy')VisuMZ[_0x358746(0x2d3)]['Window_Selectable_cursorUp'][_0x358746(0x38e)](this,_0x5f3341);else{for(let _0x5bc0c1=0x0;_0x5bc0c1<this['numActions']();_0x5bc0c1++){const _0x5ac3b0=this['makeActionList']();let _0xae0dad=_0x28c461[_0x358746(0x7b0)];this[_0x358746(0x72e)](_0x5bc0c1,_0x5ac3b0[0x0]);for(const _0x860b4a of _0x5ac3b0){const _0x5a7a77=_0x860b4a[_0x358746(0x8c5)]();_0x5a7a77>_0xae0dad&&(_0xae0dad=_0x5a7a77,this[_0x358746(0x72e)](_0x5bc0c1,_0x860b4a));}}this[_0x358746(0x22f)](_0x358746(0x72b));}}},Window_Selectable[_0x59226c(0x7bf)][_0x59226c(0x97c)]=function(){const _0x25f280=_0x59226c;return VisuMZ['CoreEngine'][_0x25f280(0x6ad)][_0x25f280(0x509)]['ModernControls'];},VisuMZ['CoreEngine'][_0x59226c(0x5ed)]=Window_Selectable[_0x59226c(0x7bf)][_0x59226c(0x83e)],Window_Selectable[_0x59226c(0x7bf)][_0x59226c(0x83e)]=function(){const _0x264763=_0x59226c;if(this['isUseModernControls']())_0x264763(0x67f)===_0x264763(0x67f)?(this[_0x264763(0x361)](),this['processCursorHomeEndTrigger']()):this[_0x264763(0x7e3)]['setBackgroundType'](_0x31beb1['layoutSettings'][_0x264763(0x43a)]);else{if(_0x264763(0x3e0)!==_0x264763(0x899))VisuMZ[_0x264763(0x2d3)]['Window_Selectable_processCursorMove'][_0x264763(0x38e)](this);else{const _0x344f16=_0x439f53[_0x264763(0x7bf)]['traitObjects'][_0x264763(0x38e)](this);for(const _0x34491f of this[_0x264763(0x1b8)]()){_0x34491f&&_0x344f16[_0x264763(0x564)](_0x34491f);}return _0x344f16[_0x264763(0x564)](this[_0x264763(0x615)](),this[_0x264763(0x396)]()),_0x344f16;}}},Window_Selectable[_0x59226c(0x7bf)][_0x59226c(0x970)]=function(){return!![];},Window_Selectable[_0x59226c(0x7bf)][_0x59226c(0x361)]=function(){const _0x3ca2cb=_0x59226c;if(this[_0x3ca2cb(0x6dd)]()){const _0x33cd49=this[_0x3ca2cb(0x213)]();Input[_0x3ca2cb(0x8cc)](_0x3ca2cb(0x81c))&&(Input['isPressed']('shift')&&this[_0x3ca2cb(0x970)]()?this['cursorPagedown']():this['cursorDown'](Input['isTriggered'](_0x3ca2cb(0x81c))));if(Input[_0x3ca2cb(0x8cc)]('up')){if(_0x3ca2cb(0x89c)==='AZCbj'){if(Input[_0x3ca2cb(0x764)](_0x3ca2cb(0x7d3))&&this[_0x3ca2cb(0x970)]()){if(_0x3ca2cb(0x359)!=='IbLye')this[_0x3ca2cb(0x3f8)]();else{_0x24ff28['ConvertParams'](_0x489aa6,_0x143260);const _0x8fbdb7=_0x27639b[_0x3ca2cb(0x93a)](_0x13cb92[_0x3ca2cb(0x86f)])[_0x3ca2cb(0x3d1)](0x1,0x64),_0x194a82=_0x22edb4[_0x3ca2cb(0x6ad)],_0x574f1d=_0x194a82[_0x3ca2cb(0x47f)][_0x3ca2cb(0x3d1)](0x0,0x1),_0x425671=_0xa3114d[_0x3ca2cb(0x93a)](_0x194a82[_0x3ca2cb(0x8d1)]||0x0),_0x5236d1=_0x2cd55a[_0x3ca2cb(0x93a)](_0x194a82[_0x3ca2cb(0x810)]||0x0),_0x4aa509=_0x5a9dfe['round'](_0x194a82[_0x3ca2cb(0x967)]||0x0),_0x15047d=_0x48e2e4[_0x3ca2cb(0x93a)](_0x194a82[_0x3ca2cb(0x403)]||0x0),_0x3868b9=_0x24c623[_0x3ca2cb(0x93a)](_0x194a82['Opacity'])[_0x3ca2cb(0x3d1)](0x0,0xff),_0x46e1a9=_0x194a82[_0x3ca2cb(0x8e6)],_0x5e9ca1='VisuMZ\x20CoreEngine\x20PictureIcon\x20%1\x20%2',_0x1c1261=_0x13639b[_0x3ca2cb(0x1b4)]?'Smooth':_0x3ca2cb(0x53f),_0x1fd180=_0x5e9ca1[_0x3ca2cb(0x538)](_0x5d6032[_0x3ca2cb(0x772)],_0x1c1261);_0x2760bd[_0x3ca2cb(0x1b9)](_0x8fbdb7,_0x1fd180,_0x574f1d,_0x425671,_0x5236d1,_0x4aa509,_0x15047d,_0x3868b9,_0x46e1a9);}}else this['cursorUp'](Input['isTriggered']('up'));}else{if(!this[_0x3ca2cb(0x6dd)]())return;_0x1d2579[_0x3ca2cb(0x73c)]()?this[_0x3ca2cb(0x3ae)]():_0x4c97bf['prototype'][_0x3ca2cb(0x83e)]['call'](this);}}if(Input[_0x3ca2cb(0x8cc)]('right')){if('JrVfc'===_0x3ca2cb(0x255))this[_0x3ca2cb(0x5fa)](Input[_0x3ca2cb(0x256)](_0x3ca2cb(0x1ca)));else{const _0x1eab03=_0x2558fe[_0x3ca2cb(0x7e9)](_0x12e1e3,_0x3ca2cb(0x979));}}Input[_0x3ca2cb(0x8cc)](_0x3ca2cb(0x349))&&this[_0x3ca2cb(0x76c)](Input[_0x3ca2cb(0x256)](_0x3ca2cb(0x349))),!this['isHandled']('pagedown')&&Input['isRepeated'](_0x3ca2cb(0x585))&&this[_0x3ca2cb(0x680)](),!this[_0x3ca2cb(0x347)](_0x3ca2cb(0x802))&&Input[_0x3ca2cb(0x8cc)](_0x3ca2cb(0x802))&&(_0x3ca2cb(0x3d5)!==_0x3ca2cb(0x3d5)?_0x226272=_0x28401b['boxHeight']-_0x34c16c:this[_0x3ca2cb(0x3f8)]()),this[_0x3ca2cb(0x213)]()!==_0x33cd49&&('VocjH'!==_0x3ca2cb(0x5e2)?this[_0x3ca2cb(0x26f)]():(_0x34c8ea[_0x3ca2cb(0x2bd)][0x23]='end',_0x2afa6b[_0x3ca2cb(0x2bd)][0x24]=_0x3ca2cb(0x3e6)));}},Window_Selectable[_0x59226c(0x7bf)][_0x59226c(0x2db)]=function(){const _0x928f5=_0x59226c;if(this[_0x928f5(0x6dd)]()){const _0x2e3cd4=this[_0x928f5(0x213)]();Input[_0x928f5(0x256)](_0x928f5(0x3e6))&&this[_0x928f5(0x54f)](Math[_0x928f5(0x3d0)](this[_0x928f5(0x213)](),0x0)),Input[_0x928f5(0x256)](_0x928f5(0x24d))&&this[_0x928f5(0x54f)](Math[_0x928f5(0x228)](this[_0x928f5(0x213)](),this['maxItems']()-0x1)),this['index']()!==_0x2e3cd4&&(_0x928f5(0x3e7)===_0x928f5(0x3e7)?this[_0x928f5(0x26f)]():(this[_0x928f5(0x49a)]={},_0x502301[_0x928f5(0x2d3)]['Game_BattlerBase_refresh'][_0x928f5(0x38e)](this)));}},VisuMZ[_0x59226c(0x2d3)][_0x59226c(0x1fe)]=Window_Selectable[_0x59226c(0x7bf)][_0x59226c(0x754)],Window_Selectable[_0x59226c(0x7bf)]['processTouch']=function(){const _0x4a781c=_0x59226c;if(this[_0x4a781c(0x97c)]()){if('IWMRc'===_0x4a781c(0x3ed))this['processTouchModernControls']();else{const _0x4f9380=(_0x499a34[_0x4a781c(0x2d3)]['Settings'][_0x4a781c(0x62a)]||_0x4a781c(0x284))[_0x4a781c(0x657)]()[_0x4a781c(0x7e8)]();return _0x51ab38['CoreEngine'][_0x4a781c(0x3c6)](_0x4f9380);}}else VisuMZ[_0x4a781c(0x2d3)]['Window_Selectable_processTouch'][_0x4a781c(0x38e)](this);},Window_Selectable[_0x59226c(0x7bf)]['processTouchModernControls']=function(){const _0xfc3923=_0x59226c;VisuMZ[_0xfc3923(0x2d3)][_0xfc3923(0x1fe)][_0xfc3923(0x38e)](this);},Window_Selectable['prototype']['colSpacing']=function(){const _0x4a520a=_0x59226c;return VisuMZ['CoreEngine'][_0x4a520a(0x6ad)][_0x4a520a(0x1c4)][_0x4a520a(0x7ec)];},Window_Selectable['prototype'][_0x59226c(0x4e1)]=function(){const _0x2d1c33=_0x59226c;return VisuMZ[_0x2d1c33(0x2d3)][_0x2d1c33(0x6ad)][_0x2d1c33(0x1c4)][_0x2d1c33(0x771)];},Window_Selectable['prototype'][_0x59226c(0x935)]=function(){const _0x5eaffa=_0x59226c;return Window_Scrollable[_0x5eaffa(0x7bf)]['itemHeight'][_0x5eaffa(0x38e)](this)+VisuMZ[_0x5eaffa(0x2d3)][_0x5eaffa(0x6ad)]['Window']['ItemHeight'];;},VisuMZ[_0x59226c(0x2d3)][_0x59226c(0x292)]=Window_Selectable[_0x59226c(0x7bf)][_0x59226c(0x621)],Window_Selectable[_0x59226c(0x7bf)]['drawBackgroundRect']=function(_0x6b7540){const _0x2e0ad7=_0x59226c,_0x2b48fd=VisuMZ['CoreEngine']['Settings'][_0x2e0ad7(0x1c4)];if(_0x2b48fd[_0x2e0ad7(0x92f)]===![])return;_0x2b48fd['DrawItemBackgroundJS']?_0x2e0ad7(0x27b)===_0x2e0ad7(0x27b)?_0x2b48fd[_0x2e0ad7(0x4bb)][_0x2e0ad7(0x38e)](this,_0x6b7540):this[_0x2e0ad7(0x268)]['setBackgroundType'](_0x36e651['layoutSettings'][_0x2e0ad7(0x276)]):_0x2e0ad7(0x23e)!==_0x2e0ad7(0x1ee)?VisuMZ[_0x2e0ad7(0x2d3)][_0x2e0ad7(0x292)]['call'](this,_0x6b7540):_0x3ed1a6=this[_0x2e0ad7(0x457)]();},VisuMZ[_0x59226c(0x2d3)][_0x59226c(0x76d)]=Window_Gold['prototype']['refresh'],Window_Gold[_0x59226c(0x7bf)]['refresh']=function(){const _0x455738=_0x59226c;if(this[_0x455738(0x695)]()){if('qmZdE'!==_0x455738(0x2a7))return _0x235069[_0x455738(0x206)](_0x455738(0x7d3));else this['drawGoldItemStyle']();}else VisuMZ[_0x455738(0x2d3)]['Window_Gold_refresh']['call'](this);},Window_Gold['prototype']['isItemStyle']=function(){const _0x5c3b2d=_0x59226c;if(TextManager['currencyUnit']!==this[_0x5c3b2d(0x3fd)]())return![];return VisuMZ['CoreEngine'][_0x5c3b2d(0x6ad)][_0x5c3b2d(0x1b0)][_0x5c3b2d(0x1f0)];},Window_Gold['prototype'][_0x59226c(0x4d9)]=function(){const _0x2211bb=_0x59226c;this['resetFontSettings'](),this[_0x2211bb(0x729)][_0x2211bb(0x3b4)](),this[_0x2211bb(0x729)][_0x2211bb(0x391)]=VisuMZ[_0x2211bb(0x2d3)][_0x2211bb(0x6ad)]['Gold'][_0x2211bb(0x7e4)];const _0xf6c04f=VisuMZ[_0x2211bb(0x2d3)][_0x2211bb(0x6ad)]['Gold'][_0x2211bb(0x46d)],_0x15378e=this[_0x2211bb(0x78d)](0x0);if(_0xf6c04f>0x0){const _0x101412=_0x15378e['y']+(this[_0x2211bb(0x543)]()-ImageManager[_0x2211bb(0x4e4)])/0x2;this[_0x2211bb(0x71e)](_0xf6c04f,_0x15378e['x'],_0x101412);const _0x2d6604=ImageManager['iconWidth']+0x4;_0x15378e['x']+=_0x2d6604,_0x15378e[_0x2211bb(0x4d6)]-=_0x2d6604;}this['changeTextColor'](ColorManager[_0x2211bb(0x1f2)]()),this[_0x2211bb(0x273)](this[_0x2211bb(0x3fd)](),_0x15378e['x'],_0x15378e['y'],_0x15378e[_0x2211bb(0x4d6)],_0x2211bb(0x349));const _0x5089ee=this['textWidth'](this['currencyUnit']())+0x6;;_0x15378e['x']+=_0x5089ee,_0x15378e[_0x2211bb(0x4d6)]-=_0x5089ee,this[_0x2211bb(0x271)]();const _0x78d038=this[_0x2211bb(0x264)](),_0xdde156=this[_0x2211bb(0x52b)](this[_0x2211bb(0x78a)]?VisuMZ['GroupDigits'](this[_0x2211bb(0x264)]()):this[_0x2211bb(0x264)]());if(_0xdde156>_0x15378e['width'])_0x2211bb(0x35a)!=='CUvCE'?_0x1aa05d[_0x2211bb(0x7bf)][_0x2211bb(0x34d)][_0x2211bb(0x38e)](this):this[_0x2211bb(0x273)](VisuMZ[_0x2211bb(0x2d3)][_0x2211bb(0x6ad)][_0x2211bb(0x1b0)]['GoldOverlap'],_0x15378e['x'],_0x15378e['y'],_0x15378e[_0x2211bb(0x4d6)],_0x2211bb(0x1ca));else{if(_0x2211bb(0x753)===_0x2211bb(0x77d)){if(this[_0x2211bb(0x306)][_0x2211bb(0x32d)])this[_0x2211bb(0x306)][_0x2211bb(0x32d)][_0x2211bb(0x6df)]();if(this[_0x2211bb(0x306)][_0x2211bb(0x934)])this[_0x2211bb(0x306)][_0x2211bb(0x934)]['refresh']();}else this[_0x2211bb(0x273)](this['value'](),_0x15378e['x'],_0x15378e['y'],_0x15378e[_0x2211bb(0x4d6)],_0x2211bb(0x1ca));}this['resetFontSettings']();},Window_StatusBase['prototype']['drawParamText']=function(_0x46a82f,_0x3c5ebe,_0x1ddbd6,_0x57ba0c,_0xcf849f){const _0x12e41f=_0x59226c;_0x57ba0c=String(_0x57ba0c||'')[_0x12e41f(0x657)]();if(VisuMZ['CoreEngine'][_0x12e41f(0x6ad)][_0x12e41f(0x959)][_0x12e41f(0x3c7)]){if(_0x12e41f(0x6e3)!==_0x12e41f(0x6e3))return _0x3eab14[_0x12e41f(0x957)][_0x12e41f(0x7b3)]['call'](this);else{const _0x5515b1=VisuMZ[_0x12e41f(0x5a1)](_0x57ba0c);_0xcf849f?(this[_0x12e41f(0x537)](_0x5515b1,_0x46a82f,_0x3c5ebe,this[_0x12e41f(0x253)]()),_0x1ddbd6-=this[_0x12e41f(0x253)]()+0x2,_0x46a82f+=this[_0x12e41f(0x253)]()+0x2):(this['drawIcon'](_0x5515b1,_0x46a82f+0x2,_0x3c5ebe+0x2),_0x1ddbd6-=ImageManager[_0x12e41f(0x1b6)]+0x4,_0x46a82f+=ImageManager['iconWidth']+0x4);}}const _0x3f67ab=TextManager[_0x12e41f(0x317)](_0x57ba0c);this['resetFontSettings'](),this['changeTextColor'](ColorManager[_0x12e41f(0x1f2)]()),_0xcf849f?(this[_0x12e41f(0x729)][_0x12e41f(0x391)]=this[_0x12e41f(0x38b)](),this[_0x12e41f(0x729)][_0x12e41f(0x273)](_0x3f67ab,_0x46a82f,_0x3c5ebe,_0x1ddbd6,this[_0x12e41f(0x253)](),'left')):this[_0x12e41f(0x273)](_0x3f67ab,_0x46a82f,_0x3c5ebe,_0x1ddbd6),this['resetFontSettings']();},Window_StatusBase[_0x59226c(0x7bf)][_0x59226c(0x38b)]=function(){return $gameSystem['mainFontSize']()-0x8;},Window_StatusBase[_0x59226c(0x7bf)][_0x59226c(0x8c7)]=function(_0x26ecd2,_0x3baf44,_0x320da6,_0x360729){const _0x5b53a6=_0x59226c;_0x360729=_0x360729||0xa8,this[_0x5b53a6(0x271)]();if(VisuMZ['CoreEngine'][_0x5b53a6(0x6ad)]['UI'][_0x5b53a6(0x1dc)])this[_0x5b53a6(0x51e)](_0x26ecd2[_0x5b53a6(0x615)]()['name'],_0x3baf44,_0x320da6,_0x360729);else{const _0x243603=_0x26ecd2[_0x5b53a6(0x615)]()[_0x5b53a6(0x3b0)]['replace'](/\\I\[(\d+)\]/gi,'');this[_0x5b53a6(0x273)](_0x243603,_0x3baf44,_0x320da6,_0x360729);}},Window_StatusBase[_0x59226c(0x7bf)][_0x59226c(0x220)]=function(_0x26d69c,_0x47010a,_0x3eb43d,_0x4f4e4f){const _0x229267=_0x59226c;_0x4f4e4f=_0x4f4e4f||0x10e,this[_0x229267(0x271)]();if(VisuMZ[_0x229267(0x2d3)][_0x229267(0x6ad)]['UI'][_0x229267(0x3fe)])this[_0x229267(0x51e)](_0x26d69c['nickname'](),_0x47010a,_0x3eb43d,_0x4f4e4f);else{const _0xe50c03=_0x26d69c[_0x229267(0x58e)]()[_0x229267(0x8a2)](/\\I\[(\d+)\]/gi,'');this[_0x229267(0x273)](_0x26d69c[_0x229267(0x58e)](),_0x47010a,_0x3eb43d,_0x4f4e4f);}},VisuMZ[_0x59226c(0x2d3)]['Window_StatusBase_drawActorLevel']=Window_StatusBase['prototype'][_0x59226c(0x45d)],Window_StatusBase[_0x59226c(0x7bf)]['drawActorLevel']=function(_0x52e1b2,_0x39f832,_0x26c835){const _0x1d299=_0x59226c;if(this[_0x1d299(0x2e5)]())this[_0x1d299(0x3f7)](_0x52e1b2,_0x39f832,_0x26c835);VisuMZ[_0x1d299(0x2d3)]['Window_StatusBase_drawActorLevel'][_0x1d299(0x38e)](this,_0x52e1b2,_0x39f832,_0x26c835);},Window_StatusBase[_0x59226c(0x7bf)][_0x59226c(0x2e5)]=function(){const _0x3928d0=_0x59226c;return VisuMZ[_0x3928d0(0x2d3)]['Settings']['UI'][_0x3928d0(0x980)];},Window_StatusBase[_0x59226c(0x7bf)][_0x59226c(0x3f7)]=function(_0x4879ec,_0x596fe7,_0x10ceba){const _0x19d37b=_0x59226c;if(!_0x4879ec)return;if(!_0x4879ec[_0x19d37b(0x6cd)]())return;const _0x22748c=0x80,_0x11a727=_0x4879ec['expRate']();let _0x25a904=ColorManager[_0x19d37b(0x53d)](),_0x3ea92b=ColorManager[_0x19d37b(0x37b)]();_0x11a727>=0x1&&(_0x25a904=ColorManager[_0x19d37b(0x482)](),_0x3ea92b=ColorManager[_0x19d37b(0x964)]()),this[_0x19d37b(0x4c7)](_0x596fe7,_0x10ceba,_0x22748c,_0x11a727,_0x25a904,_0x3ea92b);},Window_EquipStatus[_0x59226c(0x7bf)][_0x59226c(0x38d)]=function(){const _0x415889=_0x59226c;let _0x166872=0x0;for(const _0x5b6ee8 of VisuMZ[_0x415889(0x2d3)][_0x415889(0x6ad)][_0x415889(0x959)][_0x415889(0x2c7)]){const _0x2d57c7=this[_0x415889(0x209)](),_0x5887f8=this[_0x415889(0x279)](_0x166872);this['drawItem'](_0x2d57c7,_0x5887f8,_0x5b6ee8),_0x166872++;}},Window_EquipStatus[_0x59226c(0x7bf)]['drawParamName']=function(_0x591c81,_0x59c8a0,_0x3065a2){const _0x2f9f12=_0x59226c,_0x5c3a80=this[_0x2f9f12(0x8be)]()-this[_0x2f9f12(0x209)]()*0x2;this[_0x2f9f12(0x5d0)](_0x591c81,_0x59c8a0,_0x5c3a80,_0x3065a2,![]);},Window_EquipStatus['prototype'][_0x59226c(0x6a5)]=function(_0x523199,_0x270aba,_0x1a1833){const _0x1c0ee1=_0x59226c,_0x67852e=this[_0x1c0ee1(0x57b)]();this[_0x1c0ee1(0x271)](),this[_0x1c0ee1(0x273)](this[_0x1c0ee1(0x22b)]['paramValueByName'](_0x1a1833,!![]),_0x523199,_0x270aba,_0x67852e,_0x1c0ee1(0x1ca));},Window_EquipStatus['prototype'][_0x59226c(0x785)]=function(_0x2530a4,_0x17ef11){const _0x13823c=_0x59226c,_0x439398=this[_0x13823c(0x384)]();this[_0x13823c(0x4b0)](ColorManager[_0x13823c(0x1f2)]());const _0x3ffad0=VisuMZ[_0x13823c(0x2d3)][_0x13823c(0x6ad)]['UI'][_0x13823c(0x5e0)];this['drawText'](_0x3ffad0,_0x2530a4,_0x17ef11,_0x439398,'center');},Window_EquipStatus['prototype']['drawNewParam']=function(_0x4a2fad,_0x34bfbd,_0x12b231){const _0x14472d=_0x59226c,_0x2f2a7c=this[_0x14472d(0x57b)](),_0x4bf945=this[_0x14472d(0x89d)]['paramValueByName'](_0x12b231),_0x1284c4=_0x4bf945-this[_0x14472d(0x22b)][_0x14472d(0x2ef)](_0x12b231);this['changeTextColor'](ColorManager[_0x14472d(0x3e2)](_0x1284c4)),this['drawText'](this['_tempActor'][_0x14472d(0x2ef)](_0x12b231,!![]),_0x4a2fad,_0x34bfbd,_0x2f2a7c,_0x14472d(0x1ca));},VisuMZ[_0x59226c(0x2d3)][_0x59226c(0x3cc)]=Window_EquipItem['prototype'][_0x59226c(0x64a)],Window_EquipItem['prototype'][_0x59226c(0x64a)]=function(_0x39230b){const _0x123099=_0x59226c;if(_0x39230b&&this['_actor'])return this['_actor'][_0x123099(0x79d)](_0x39230b);else{if('wQrtF'!=='OtemA')return VisuMZ[_0x123099(0x2d3)][_0x123099(0x3cc)][_0x123099(0x38e)](this,_0x39230b);else this[_0x123099(0x8a9)]()?this[_0x123099(0x2f5)]():_0x33dd2d[_0x123099(0x2d3)]['Scene_Boot_updateDocumentTitle']['call'](this);}},Window_StatusParams[_0x59226c(0x7bf)][_0x59226c(0x2d2)]=function(){const _0x3aea4f=_0x59226c;return VisuMZ[_0x3aea4f(0x2d3)][_0x3aea4f(0x6ad)][_0x3aea4f(0x959)][_0x3aea4f(0x2c7)][_0x3aea4f(0x587)];},Window_StatusParams[_0x59226c(0x7bf)][_0x59226c(0x43e)]=function(_0x590b5f){const _0x269611=_0x59226c,_0x3e9e47=this[_0x269611(0x78d)](_0x590b5f),_0x145949=VisuMZ[_0x269611(0x2d3)][_0x269611(0x6ad)][_0x269611(0x959)]['DisplayedParams'][_0x590b5f],_0x41599c=TextManager[_0x269611(0x317)](_0x145949),_0x443441=this['_actor']['paramValueByName'](_0x145949,!![]);this[_0x269611(0x5d0)](_0x3e9e47['x'],_0x3e9e47['y'],0xa0,_0x145949,![]),this[_0x269611(0x271)](),this[_0x269611(0x273)](_0x443441,_0x3e9e47['x']+0xa0,_0x3e9e47['y'],0x3c,'right');};if(VisuMZ[_0x59226c(0x2d3)]['Settings'][_0x59226c(0x4c8)][_0x59226c(0x5ea)]){VisuMZ[_0x59226c(0x2d3)][_0x59226c(0x6ad)]['KeyboardInput'][_0x59226c(0x614)]&&(Window_NameInput[_0x59226c(0x988)]=['Q','W','E','R','T','Y','U','I','O','P','A','S','D','F','G','H','J','K','L','\x27','`','Z','X','C','V','B','N','M',',','.','q','w','e','r','t','y','u','i','o','p','a','s','d','f','g','h','j','k','l',':','~','z','x','c','v','b','n','m','\x22',';','1','2','3','4','5','6','7','8','9','0','!','@','#','$','%','^','&','*','(',')','<','>','[',']','-','_','/','\x20',_0x59226c(0x332),'OK']);;VisuMZ['CoreEngine']['Window_NameInput_initialize']=Window_NameInput[_0x59226c(0x7bf)]['initialize'],Window_NameInput[_0x59226c(0x7bf)][_0x59226c(0x72d)]=function(_0x335334){const _0x5afb4d=_0x59226c;this[_0x5afb4d(0x77e)]=this['defaultInputMode'](),VisuMZ['CoreEngine'][_0x5afb4d(0x533)]['call'](this,_0x335334),this[_0x5afb4d(0x77e)]===_0x5afb4d(0x421)?_0x5afb4d(0x7ac)==='Fekjg'?(_0x24288e=_0x1eef3b[_0x5afb4d(0x93a)](_0x3c3629),_0x41a4fd=_0x543028[_0x5afb4d(0x93a)](_0x5b358b),_0x233536=_0x454bc9[_0x5afb4d(0x93a)](_0x53d848),_0x245e44=_0x2c52bf[_0x5afb4d(0x93a)](_0x24e664),_0x1d03eb=_0xcd0f60[_0x5afb4d(0x93a)](_0x1bd42b),_0x12beb7=_0x3317fc['round'](_0x562a83),_0xf562ad['CoreEngine'][_0x5afb4d(0x534)][_0x5afb4d(0x38e)](this,_0x47e29c,_0x23788f,_0x254e6c,_0x1c315b,_0xbdb8fe,_0x337339,_0x3f0d77,_0x1c75da,_0x352614),this[_0x5afb4d(0x5d3)]()):this['select'](0x0):_0x5afb4d(0x5f5)===_0x5afb4d(0x5f5)?(Input[_0x5afb4d(0x3b4)](),this[_0x5afb4d(0x976)]()):_0x51548e['CoreEngine']['loadMapData'](_0x209675);},Window_NameInput['prototype'][_0x59226c(0x7c9)]=function(){const _0x1030a7=_0x59226c;if(Input['isGamepadConnected']())return'default';return VisuMZ['CoreEngine'][_0x1030a7(0x6ad)][_0x1030a7(0x4c8)][_0x1030a7(0x1dd)]||_0x1030a7(0x75d);},VisuMZ[_0x59226c(0x2d3)][_0x59226c(0x1ed)]=Window_NameInput[_0x59226c(0x7bf)][_0x59226c(0x617)],Window_NameInput[_0x59226c(0x7bf)]['processHandling']=function(){const _0x38997d=_0x59226c;if(!this['isOpen']())return;if(!this['active'])return;if(this[_0x38997d(0x77e)]===_0x38997d(0x75d)&&Input[_0x38997d(0x1c8)]()){if(_0x38997d(0x4f8)==='sQIKY'){const _0x2bc7e9=_0x38997d(0x4fe);this['_colorCache']=this[_0x38997d(0x64f)]||{};if(this[_0x38997d(0x64f)][_0x2bc7e9])return this['_colorCache'][_0x2bc7e9];const _0x4dc0d7=_0x461be4[_0x38997d(0x2d3)][_0x38997d(0x6ad)][_0x38997d(0x801)][_0x38997d(0x852)];return this['getColorDataFromPluginParameters'](_0x2bc7e9,_0x4dc0d7);}else this[_0x38997d(0x245)](_0x38997d(0x421));}else{if(Input[_0x38997d(0x2f4)](_0x38997d(0x4c1)))Input[_0x38997d(0x3b4)](),this[_0x38997d(0x1e0)]();else{if(Input['isTriggered']('tab')){if(_0x38997d(0x81e)===_0x38997d(0x81e))Input[_0x38997d(0x3b4)](),this[_0x38997d(0x77e)]===_0x38997d(0x75d)?this[_0x38997d(0x245)](_0x38997d(0x421)):this[_0x38997d(0x245)]('keyboard');else return _0x440a74['layoutSettings']['HelpRect'][_0x38997d(0x38e)](this);}else{if(this[_0x38997d(0x77e)]===_0x38997d(0x75d))this['processKeyboardHandling']();else{if(Input['isSpecialCode'](_0x38997d(0x4fd)))Input[_0x38997d(0x3b4)](),this[_0x38997d(0x245)]('keyboard');else{if(_0x38997d(0x2b2)===_0x38997d(0x2b2))VisuMZ[_0x38997d(0x2d3)][_0x38997d(0x1ed)]['call'](this);else{let _0x120710=_0x38997d(0x7da)+_0x3c89cb+'Total';if(this['checkCacheKey'](_0x120710))return this['_cache'][_0x120710];return this[_0x38997d(0x49a)][_0x120710]=_0x566865[_0x38997d(0x2d3)][_0x38997d(0x6ad)]['Param']['XParameterFormula'][_0x38997d(0x38e)](this,_0x22d736),this[_0x38997d(0x49a)][_0x120710];}}}}}}},VisuMZ[_0x59226c(0x2d3)][_0x59226c(0x717)]=Window_NameInput[_0x59226c(0x7bf)]['processTouch'],Window_NameInput[_0x59226c(0x7bf)][_0x59226c(0x754)]=function(){const _0x77ca32=_0x59226c;if(!this[_0x77ca32(0x32a)]())return;if(this[_0x77ca32(0x77e)]==='keyboard'){if(TouchInput[_0x77ca32(0x256)]()&&this[_0x77ca32(0x97a)]())_0x77ca32(0x461)!==_0x77ca32(0x652)?this[_0x77ca32(0x245)](_0x77ca32(0x421)):this[_0x77ca32(0x43c)]=_0x77ca32(0x239);else TouchInput[_0x77ca32(0x6bb)]()&&this['switchModes'](_0x77ca32(0x421));}else VisuMZ['CoreEngine'][_0x77ca32(0x717)][_0x77ca32(0x38e)](this);},Window_NameInput[_0x59226c(0x7bf)]['processKeyboardHandling']=function(){const _0x3a0b74=_0x59226c;if(Input[_0x3a0b74(0x2f4)](_0x3a0b74(0x26e))){if('ZktUm'==='ZktUm')Input[_0x3a0b74(0x3b4)](),this[_0x3a0b74(0x374)]();else return _0xd7ba4[_0x3a0b74(0x957)]['StatusRect'][_0x3a0b74(0x38e)](this);}else{if(Input['_inputString']!==undefined){let _0x53a90a=Input[_0x3a0b74(0x914)],_0x233d11=_0x53a90a[_0x3a0b74(0x587)];for(let _0x3a13de=0x0;_0x3a13de<_0x233d11;++_0x3a13de){this[_0x3a0b74(0x857)][_0x3a0b74(0x57e)](_0x53a90a[_0x3a13de])?SoundManager[_0x3a0b74(0x62e)]():SoundManager['playBuzzer']();}Input['clear']();}}},Window_NameInput[_0x59226c(0x7bf)][_0x59226c(0x245)]=function(_0x2a1bc1){const _0x33ce94=_0x59226c;let _0x3d0e04=this['_mode'];this[_0x33ce94(0x77e)]=_0x2a1bc1;if(_0x3d0e04!==this[_0x33ce94(0x77e)]){this['refresh'](),SoundManager[_0x33ce94(0x62e)]();if(this[_0x33ce94(0x77e)]===_0x33ce94(0x421)){if(_0x33ce94(0x5ef)===_0x33ce94(0x7d7))return _0x4d1e2c[_0x33ce94(0x2d3)][_0x33ce94(0x6ad)][_0x33ce94(0x801)][_0x33ce94(0x53a)]||_0x33ce94(0x39b);else this[_0x33ce94(0x356)](0x0);}else{if(_0x33ce94(0x6c2)!==_0x33ce94(0x6d4))this[_0x33ce94(0x356)](-0x1);else return 0x3;}}},VisuMZ[_0x59226c(0x2d3)]['Window_NameInput_cursorDown']=Window_NameInput[_0x59226c(0x7bf)]['cursorDown'],Window_NameInput['prototype'][_0x59226c(0x626)]=function(_0x54f872){const _0x2c31bb=_0x59226c;if(this[_0x2c31bb(0x77e)]===_0x2c31bb(0x75d)&&!Input['isArrowPressed']())return;if(Input[_0x2c31bb(0x73c)]())return;VisuMZ[_0x2c31bb(0x2d3)]['Window_NameInput_cursorDown'][_0x2c31bb(0x38e)](this,_0x54f872),this[_0x2c31bb(0x245)](_0x2c31bb(0x421));},VisuMZ['CoreEngine'][_0x59226c(0x354)]=Window_NameInput['prototype'][_0x59226c(0x714)],Window_NameInput[_0x59226c(0x7bf)][_0x59226c(0x714)]=function(_0x2516c0){const _0x4e95cf=_0x59226c;if(this[_0x4e95cf(0x77e)]===_0x4e95cf(0x75d)&&!Input[_0x4e95cf(0x8ae)]())return;if(Input[_0x4e95cf(0x73c)]())return;VisuMZ['CoreEngine'][_0x4e95cf(0x354)][_0x4e95cf(0x38e)](this,_0x2516c0),this[_0x4e95cf(0x245)](_0x4e95cf(0x421));},VisuMZ['CoreEngine'][_0x59226c(0x57f)]=Window_NameInput[_0x59226c(0x7bf)][_0x59226c(0x5fa)],Window_NameInput[_0x59226c(0x7bf)][_0x59226c(0x5fa)]=function(_0xc88a3c){const _0x45027e=_0x59226c;if(this[_0x45027e(0x77e)]==='keyboard'&&!Input[_0x45027e(0x8ae)]())return;if(Input['isNumpadPressed']())return;VisuMZ[_0x45027e(0x2d3)][_0x45027e(0x57f)][_0x45027e(0x38e)](this,_0xc88a3c),this[_0x45027e(0x245)]('default');},VisuMZ['CoreEngine'][_0x59226c(0x3bc)]=Window_NameInput['prototype'][_0x59226c(0x76c)],Window_NameInput[_0x59226c(0x7bf)][_0x59226c(0x76c)]=function(_0x366c71){const _0x249845=_0x59226c;if(this[_0x249845(0x77e)]===_0x249845(0x75d)&&!Input[_0x249845(0x8ae)]())return;if(Input[_0x249845(0x73c)]())return;VisuMZ['CoreEngine'][_0x249845(0x3bc)][_0x249845(0x38e)](this,_0x366c71),this['switchModes'](_0x249845(0x421));},VisuMZ[_0x59226c(0x2d3)][_0x59226c(0x302)]=Window_NameInput['prototype'][_0x59226c(0x680)],Window_NameInput[_0x59226c(0x7bf)][_0x59226c(0x680)]=function(){const _0x59d9ce=_0x59226c;if(this['_mode']===_0x59d9ce(0x75d))return;if(Input[_0x59d9ce(0x73c)]())return;VisuMZ[_0x59d9ce(0x2d3)][_0x59d9ce(0x302)][_0x59d9ce(0x38e)](this),this[_0x59d9ce(0x245)]('default');},VisuMZ[_0x59226c(0x2d3)][_0x59226c(0x7f5)]=Window_NameInput[_0x59226c(0x7bf)][_0x59226c(0x3f8)],Window_NameInput[_0x59226c(0x7bf)][_0x59226c(0x3f8)]=function(){const _0x5920e1=_0x59226c;if(this[_0x5920e1(0x77e)]===_0x5920e1(0x75d))return;if(Input['isNumpadPressed']())return;VisuMZ[_0x5920e1(0x2d3)][_0x5920e1(0x7f5)][_0x5920e1(0x38e)](this),this[_0x5920e1(0x245)](_0x5920e1(0x421));},VisuMZ['CoreEngine'][_0x59226c(0x2dd)]=Window_NameInput['prototype'][_0x59226c(0x6df)],Window_NameInput[_0x59226c(0x7bf)][_0x59226c(0x6df)]=function(){const _0x2ffb79=_0x59226c;if(this[_0x2ffb79(0x77e)]===_0x2ffb79(0x75d)){if(_0x2ffb79(0x7eb)===_0x2ffb79(0x7eb)){this[_0x2ffb79(0x729)]['clear'](),this['contentsBack'][_0x2ffb79(0x3b4)](),this[_0x2ffb79(0x271)]();let _0x1fdf7d=VisuMZ[_0x2ffb79(0x2d3)]['Settings'][_0x2ffb79(0x4c8)][_0x2ffb79(0x595)][_0x2ffb79(0x54d)]('\x0a'),_0x1668a0=_0x1fdf7d[_0x2ffb79(0x587)],_0x2780f6=(this['innerHeight']-_0x1668a0*this['lineHeight']())/0x2;for(let _0x8d5223=0x0;_0x8d5223<_0x1668a0;++_0x8d5223){let _0x43e415=_0x1fdf7d[_0x8d5223],_0x5c59c8=this['textSizeEx'](_0x43e415)[_0x2ffb79(0x4d6)],_0x58e15a=Math[_0x2ffb79(0x966)]((this['contents'][_0x2ffb79(0x4d6)]-_0x5c59c8)/0x2);this['drawTextEx'](_0x43e415,_0x58e15a,_0x2780f6),_0x2780f6+=this[_0x2ffb79(0x543)]();}}else _0x1b23a3['atbActive']=!![];}else VisuMZ[_0x2ffb79(0x2d3)][_0x2ffb79(0x2dd)][_0x2ffb79(0x38e)](this);};};VisuMZ['CoreEngine']['Window_ShopSell_isEnabled']=Window_ShopSell['prototype'][_0x59226c(0x64a)],Window_ShopSell[_0x59226c(0x7bf)][_0x59226c(0x64a)]=function(_0x3765af){const _0x1e4198=_0x59226c;if(VisuMZ['CoreEngine'][_0x1e4198(0x6ad)][_0x1e4198(0x509)][_0x1e4198(0x418)]&&DataManager[_0x1e4198(0x65f)](_0x3765af))return _0x1e4198(0x740)!=='shqhI'?this[_0x1e4198(0x7ab)]()[_0x1e4198(0x434)]+0.05:![];else{if(_0x1e4198(0x750)!=='HYfCP')return VisuMZ[_0x1e4198(0x2d3)][_0x1e4198(0x427)][_0x1e4198(0x38e)](this,_0x3765af);else this['clear']();}},Window_NumberInput[_0x59226c(0x7bf)][_0x59226c(0x97c)]=function(){return![];};VisuMZ[_0x59226c(0x2d3)][_0x59226c(0x6ad)][_0x59226c(0x4c8)]['EnableNumberInput']&&(VisuMZ[_0x59226c(0x2d3)][_0x59226c(0x3d6)]=Window_NumberInput['prototype'][_0x59226c(0x277)],Window_NumberInput[_0x59226c(0x7bf)]['start']=function(){const _0x29a33e=_0x59226c;VisuMZ[_0x29a33e(0x2d3)][_0x29a33e(0x3d6)][_0x29a33e(0x38e)](this),this[_0x29a33e(0x356)](this[_0x29a33e(0x841)]-0x1),Input[_0x29a33e(0x3b4)]();},VisuMZ[_0x59226c(0x2d3)][_0x59226c(0x55a)]=Window_NumberInput[_0x59226c(0x7bf)]['processDigitChange'],Window_NumberInput[_0x59226c(0x7bf)][_0x59226c(0x2cd)]=function(){const _0x5bad1c=_0x59226c;if(!this['isOpenAndActive']())return;if(Input[_0x5bad1c(0x73c)]())this['processKeyboardDigitChange']();else{if(Input[_0x5bad1c(0x2f4)]('backspace'))this[_0x5bad1c(0x357)]();else{if(Input[_0x5bad1c(0x252)]===0x2e)this[_0x5bad1c(0x438)]();else{if(Input[_0x5bad1c(0x252)]===0x24)this['processKeyboardHome']();else{if(Input[_0x5bad1c(0x252)]===0x23)'zmhBi'===_0x5bad1c(0x7ce)?this[_0x5bad1c(0x626)](_0x2b6c21[_0x5bad1c(0x256)](_0x5bad1c(0x81c))):this[_0x5bad1c(0x1ab)]();else{if(_0x5bad1c(0x6c6)!=='BWEgN')VisuMZ['CoreEngine'][_0x5bad1c(0x55a)][_0x5bad1c(0x38e)](this);else{if(!_0x4c8138['isSceneMap']())return;_0x5cff8b[_0x5bad1c(0x5cf)](_0x56ad8a,_0x577bcb);const _0x31e0d9=_0x290640['CommonEventID'];_0x5ef8c1['_scene'][_0x5bad1c(0x1f3)](_0x31e0d9);}}}}}}},Window_NumberInput['prototype'][_0x59226c(0x83e)]=function(){const _0x4854de=_0x59226c;if(!this[_0x4854de(0x6dd)]())return;if(Input[_0x4854de(0x73c)]()){if('pGRGZ'===_0x4854de(0x73b))this[_0x4854de(0x3ae)]();else return _0x31b6b8['CoreEngine'][_0x4854de(0x6ad)][_0x4854de(0x4cb)][_0x4854de(0x804)][_0x4854de(0x7b7)];}else Window_Selectable[_0x4854de(0x7bf)][_0x4854de(0x83e)][_0x4854de(0x38e)](this);},Window_NumberInput[_0x59226c(0x7bf)]['processCursorHomeEndTrigger']=function(){},Window_NumberInput[_0x59226c(0x7bf)][_0x59226c(0x3ae)]=function(){const _0x3634e4=_0x59226c;if(String(this[_0x3634e4(0x74c)])['length']>=this[_0x3634e4(0x841)])return;const _0x33d9a5=Number(String(this[_0x3634e4(0x74c)])+Input[_0x3634e4(0x914)]);if(isNaN(_0x33d9a5))return;this[_0x3634e4(0x74c)]=_0x33d9a5;const _0xb0bf48='9'[_0x3634e4(0x784)](this[_0x3634e4(0x841)]);this[_0x3634e4(0x74c)]=this['_number']['clamp'](0x0,_0xb0bf48),Input[_0x3634e4(0x3b4)](),this[_0x3634e4(0x6df)](),SoundManager[_0x3634e4(0x907)](),this['select'](this['_maxDigits']-0x1);},Window_NumberInput[_0x59226c(0x7bf)][_0x59226c(0x357)]=function(){const _0x21f554=_0x59226c;this[_0x21f554(0x74c)]=Number(String(this[_0x21f554(0x74c)])[_0x21f554(0x2b9)](0x0,-0x1)),this[_0x21f554(0x74c)]=Math[_0x21f554(0x228)](0x0,this[_0x21f554(0x74c)]),Input[_0x21f554(0x3b4)](),this[_0x21f554(0x6df)](),SoundManager[_0x21f554(0x907)](),this[_0x21f554(0x356)](this[_0x21f554(0x841)]-0x1);},Window_NumberInput[_0x59226c(0x7bf)][_0x59226c(0x438)]=function(){const _0x572e39=_0x59226c;this[_0x572e39(0x74c)]=Number(String(this[_0x572e39(0x74c)])['substring'](0x1)),this[_0x572e39(0x74c)]=Math[_0x572e39(0x228)](0x0,this[_0x572e39(0x74c)]),Input[_0x572e39(0x3b4)](),this['refresh'](),SoundManager[_0x572e39(0x907)](),this[_0x572e39(0x356)](this[_0x572e39(0x841)]-0x1);});;Window_TitleCommand[_0x59226c(0x1f9)]=VisuMZ[_0x59226c(0x2d3)][_0x59226c(0x6ad)][_0x59226c(0x510)],Window_TitleCommand['prototype'][_0x59226c(0x5ff)]=function(){const _0x2c8e56=_0x59226c;this[_0x2c8e56(0x92d)]();},Window_TitleCommand[_0x59226c(0x7bf)][_0x59226c(0x92d)]=function(){const _0x259110=_0x59226c;for(const _0xb5a192 of Window_TitleCommand[_0x259110(0x1f9)]){if(_0xb5a192[_0x259110(0x790)][_0x259110(0x38e)](this)){if(_0x259110(0x856)===_0x259110(0x1ce))this['setMoveEasingType'](_0x259110(0x561)),this[_0x259110(0x948)]=_0x110183;else{const _0x5dbdd9=_0xb5a192[_0x259110(0x7a1)];let _0x43a17d=_0xb5a192[_0x259110(0x629)];if(['',_0x259110(0x48d)][_0x259110(0x98d)](_0x43a17d))_0x43a17d=_0xb5a192[_0x259110(0x3c5)]['call'](this);const _0x399d76=_0xb5a192[_0x259110(0x732)][_0x259110(0x38e)](this),_0x58d138=_0xb5a192[_0x259110(0x628)][_0x259110(0x38e)](this);this[_0x259110(0x7f8)](_0x43a17d,_0x5dbdd9,_0x399d76,_0x58d138),this[_0x259110(0x8a4)](_0x5dbdd9,_0xb5a192[_0x259110(0x762)][_0x259110(0x938)](this,_0x58d138));}}}},Window_GameEnd[_0x59226c(0x1f9)]=VisuMZ['CoreEngine']['Settings'][_0x59226c(0x4cb)][_0x59226c(0x6ed)][_0x59226c(0x639)],Window_GameEnd['prototype'][_0x59226c(0x5ff)]=function(){this['makeCoreEngineCommandList']();},Window_GameEnd['prototype'][_0x59226c(0x92d)]=function(){const _0x3e491e=_0x59226c;for(const _0xc6ef46 of Window_GameEnd['_commandList']){if(_0x3e491e(0x950)===_0x3e491e(0x216))return 0x0;else{if(_0xc6ef46[_0x3e491e(0x790)][_0x3e491e(0x38e)](this)){const _0x5e4551=_0xc6ef46['Symbol'];let _0x3bcda2=_0xc6ef46['TextStr'];if(['',_0x3e491e(0x48d)][_0x3e491e(0x98d)](_0x3bcda2))_0x3bcda2=_0xc6ef46[_0x3e491e(0x3c5)][_0x3e491e(0x38e)](this);const _0x48be4d=_0xc6ef46[_0x3e491e(0x732)][_0x3e491e(0x38e)](this),_0x44547c=_0xc6ef46['ExtJS']['call'](this);this[_0x3e491e(0x7f8)](_0x3bcda2,_0x5e4551,_0x48be4d,_0x44547c),this[_0x3e491e(0x8a4)](_0x5e4551,_0xc6ef46[_0x3e491e(0x762)][_0x3e491e(0x938)](this,_0x44547c));}}}};function Window_ButtonAssist(){const _0x339fa4=_0x59226c;this[_0x339fa4(0x72d)](...arguments);}Window_ButtonAssist['prototype']=Object[_0x59226c(0x4a2)](Window_Base['prototype']),Window_ButtonAssist[_0x59226c(0x7bf)]['constructor']=Window_ButtonAssist,Window_ButtonAssist[_0x59226c(0x7bf)][_0x59226c(0x72d)]=function(_0x2a8590){const _0x628fab=_0x59226c;this['_data']={},Window_Base['prototype'][_0x628fab(0x72d)][_0x628fab(0x38e)](this,_0x2a8590),this['setBackgroundType'](VisuMZ[_0x628fab(0x2d3)][_0x628fab(0x6ad)][_0x628fab(0x25d)][_0x628fab(0x4f9)]||0x0),this[_0x628fab(0x6df)]();},Window_ButtonAssist[_0x59226c(0x7bf)][_0x59226c(0x55f)]=function(){const _0x2e4da3=_0x59226c;this['contents'][_0x2e4da3(0x391)]<=0x60&&(this['contents'][_0x2e4da3(0x391)]+=0x6);},Window_ButtonAssist['prototype'][_0x59226c(0x863)]=function(){const _0x557d8a=_0x59226c;this[_0x557d8a(0x729)][_0x557d8a(0x391)]>=0x18&&(this[_0x557d8a(0x729)]['fontSize']-=0x6);},Window_ButtonAssist[_0x59226c(0x7bf)][_0x59226c(0x334)]=function(){const _0x22da9e=_0x59226c;Window_Base[_0x22da9e(0x7bf)][_0x22da9e(0x334)][_0x22da9e(0x38e)](this),this[_0x22da9e(0x1c2)]();},Window_ButtonAssist['prototype'][_0x59226c(0x775)]=function(){const _0x597943=_0x59226c;this[_0x597943(0x584)]=SceneManager[_0x597943(0x306)][_0x597943(0x556)]()!==_0x597943(0x8d0)?0x0:0x8;},Window_ButtonAssist[_0x59226c(0x7bf)][_0x59226c(0x1c2)]=function(){const _0xec548a=_0x59226c,_0x3fbfe2=SceneManager[_0xec548a(0x306)];for(let _0x1c281c=0x1;_0x1c281c<=0x5;_0x1c281c++){if(this['_data'][_0xec548a(0x700)['format'](_0x1c281c)]!==_0x3fbfe2[_0xec548a(0x281)[_0xec548a(0x538)](_0x1c281c)]()){if('NZwIt'!==_0xec548a(0x4d3))this[_0xec548a(0x7aa)]='SV';else return this[_0xec548a(0x6df)]();}if(this[_0xec548a(0x814)][_0xec548a(0x5dc)[_0xec548a(0x538)](_0x1c281c)]!==_0x3fbfe2[_0xec548a(0x3a5)[_0xec548a(0x538)](_0x1c281c)]())return this[_0xec548a(0x6df)]();}},Window_ButtonAssist[_0x59226c(0x7bf)][_0x59226c(0x6df)]=function(){const _0x351256=_0x59226c;this[_0x351256(0x729)][_0x351256(0x3b4)]();for(let _0x20da6c=0x1;_0x20da6c<=0x5;_0x20da6c++){if(_0x351256(0x7d0)===_0x351256(0x5b4))for(const _0x573b0c of _0x590c60['pictureButtons']){const _0x499edb=new _0x40ea54(_0x573b0c);this[_0x351256(0x83f)](_0x499edb);}else this[_0x351256(0x651)](_0x20da6c);}},Window_ButtonAssist[_0x59226c(0x7bf)]['drawSegment']=function(_0x574108){const _0xf9598c=_0x59226c,_0x296478=this[_0xf9598c(0x635)]/0x5,_0x19b707=SceneManager['_scene'],_0x1b9251=_0x19b707[_0xf9598c(0x281)['format'](_0x574108)](),_0x2d35e8=_0x19b707[_0xf9598c(0x3a5)[_0xf9598c(0x538)](_0x574108)]();this[_0xf9598c(0x814)]['key%1'[_0xf9598c(0x538)](_0x574108)]=_0x1b9251,this['_data'][_0xf9598c(0x5dc)[_0xf9598c(0x538)](_0x574108)]=_0x2d35e8;if(_0x1b9251==='')return;if(_0x2d35e8==='')return;const _0x180b2b=_0x19b707[_0xf9598c(0x4d7)[_0xf9598c(0x538)](_0x574108)](),_0x5002c8=this[_0xf9598c(0x209)](),_0xdbc884=_0x296478*(_0x574108-0x1)+_0x5002c8+_0x180b2b,_0x3860c9=VisuMZ[_0xf9598c(0x2d3)][_0xf9598c(0x6ad)][_0xf9598c(0x25d)][_0xf9598c(0x684)];this[_0xf9598c(0x51e)](_0x3860c9[_0xf9598c(0x538)](_0x1b9251,_0x2d35e8),_0xdbc884,0x0,_0x296478-_0x5002c8*0x2);},VisuMZ['CoreEngine'][_0x59226c(0x5fb)]=Game_Interpreter[_0x59226c(0x7bf)]['updateWaitMode'],Game_Interpreter[_0x59226c(0x7bf)][_0x59226c(0x8b7)]=function(){const _0x4352c0=_0x59226c;if($gameTemp['_pictureCoordinatesMode']!==undefined)return'ENsyH'!=='kCsIV'?VisuMZ[_0x4352c0(0x2d3)][_0x4352c0(0x6e2)]():_0x560c7b[_0x4352c0(0x2d3)][_0x4352c0(0x6ad)][_0x4352c0(0x1c4)][_0x4352c0(0x7a8)];return VisuMZ[_0x4352c0(0x2d3)][_0x4352c0(0x5fb)][_0x4352c0(0x38e)](this);},VisuMZ['CoreEngine'][_0x59226c(0x6e2)]=function(){const _0x2f3ae9=_0x59226c,_0x329888=$gameTemp['_pictureCoordinatesMode']||0x0;(_0x329888<0x0||_0x329888>0x64||TouchInput[_0x2f3ae9(0x6bb)]()||Input[_0x2f3ae9(0x256)](_0x2f3ae9(0x871)))&&(_0x2f3ae9(0x452)==='mODFE'?($gameTemp['_pictureCoordinatesMode']=undefined,Input[_0x2f3ae9(0x3b4)](),TouchInput[_0x2f3ae9(0x3b4)]()):(this['_anchor']['x']=this[_0x2f3ae9(0x6b0)]['x'],this['_anchor']['y']=this[_0x2f3ae9(0x6b0)]['y']));const _0x1e1b6f=$gameScreen['picture'](_0x329888);return _0x1e1b6f&&(_0x1e1b6f['_x']=TouchInput['_x'],_0x1e1b6f['_y']=TouchInput['_y']),VisuMZ[_0x2f3ae9(0x2d3)][_0x2f3ae9(0x745)](),$gameTemp[_0x2f3ae9(0x5d1)]!==undefined;},VisuMZ[_0x59226c(0x2d3)][_0x59226c(0x745)]=function(){const _0x1fc451=_0x59226c,_0x240117=SceneManager[_0x1fc451(0x306)];if(!_0x240117)return;!_0x240117[_0x1fc451(0x908)]&&(SoundManager[_0x1fc451(0x792)](),_0x240117[_0x1fc451(0x908)]=new Window_PictureCoordinates(),_0x240117['addChild'](_0x240117[_0x1fc451(0x908)])),$gameTemp[_0x1fc451(0x5d1)]===undefined&&('OPXtQ'===_0x1fc451(0x1ea)?this[_0x1fc451(0x54f)]((_0x19ba0c-_0x256920+_0x16c242)%_0x14740d):(SoundManager[_0x1fc451(0x4ab)](),_0x240117[_0x1fc451(0x5ec)](_0x240117[_0x1fc451(0x908)]),_0x240117[_0x1fc451(0x908)]=undefined));};function Window_PictureCoordinates(){const _0x31c610=_0x59226c;this[_0x31c610(0x72d)](...arguments);}Window_PictureCoordinates['prototype']=Object[_0x59226c(0x4a2)](Window_Base[_0x59226c(0x7bf)]),Window_PictureCoordinates['prototype']['constructor']=Window_PictureCoordinates,Window_PictureCoordinates[_0x59226c(0x7bf)][_0x59226c(0x72d)]=function(){const _0x2d6c8c=_0x59226c;this[_0x2d6c8c(0x57d)]=_0x2d6c8c(0x7c7),this[_0x2d6c8c(0x7fe)]=_0x2d6c8c(0x7c7),this[_0x2d6c8c(0x3ac)]='nah';const _0x42b77e=this['windowRect']();Window_Base[_0x2d6c8c(0x7bf)][_0x2d6c8c(0x72d)][_0x2d6c8c(0x38e)](this,_0x42b77e),this[_0x2d6c8c(0x573)](0x2);},Window_PictureCoordinates['prototype']['windowRect']=function(){const _0x2806d3=_0x59226c;let _0x45162f=0x0,_0x2902bf=Graphics[_0x2806d3(0x235)]-this['lineHeight'](),_0x5de5c6=Graphics['width'],_0x498012=this[_0x2806d3(0x543)]();return new Rectangle(_0x45162f,_0x2902bf,_0x5de5c6,_0x498012);},Window_PictureCoordinates[_0x59226c(0x7bf)][_0x59226c(0x775)]=function(){const _0x3bfd63=_0x59226c;this[_0x3bfd63(0x584)]=0x0;},Window_PictureCoordinates[_0x59226c(0x7bf)][_0x59226c(0x334)]=function(){const _0x15d990=_0x59226c;Window_Base[_0x15d990(0x7bf)]['update'][_0x15d990(0x38e)](this),this[_0x15d990(0x70b)]();},Window_PictureCoordinates[_0x59226c(0x7bf)][_0x59226c(0x70b)]=function(){const _0x49df50=_0x59226c;if(!this[_0x49df50(0x32c)]())return;this[_0x49df50(0x6df)]();},Window_PictureCoordinates[_0x59226c(0x7bf)]['needsUpdate']=function(){const _0x5cc5b2=_0x59226c,_0x55aa71=$gameTemp['_pictureCoordinatesMode'],_0x50f225=$gameScreen[_0x5cc5b2(0x67b)](_0x55aa71);if(_0x50f225){if(_0x5cc5b2(0x6f8)!==_0x5cc5b2(0x6c5))return this['_lastOrigin']!==_0x50f225[_0x5cc5b2(0x7dd)]||this['_lastX']!==_0x50f225['_x']||this[_0x5cc5b2(0x3ac)]!==_0x50f225['_y'];else{const _0x1ee292=new _0x229d1d();_0x1ee292['x']=_0x1de097['x'],_0x1ee292['y']=_0x2ec330['y'],_0x1ee292['z']=0x64;const _0x3f4be1=this[_0x5cc5b2(0x5bf)]();return _0x3f4be1['addChild'](_0x1ee292),[_0x1ee292];}}else return![];},Window_PictureCoordinates[_0x59226c(0x7bf)][_0x59226c(0x6df)]=function(){const _0x574d10=_0x59226c;this[_0x574d10(0x729)][_0x574d10(0x3b4)]();const _0x28dc9c=$gameTemp[_0x574d10(0x5d1)],_0x2dabe2=$gameScreen[_0x574d10(0x67b)](_0x28dc9c);if(!_0x2dabe2)return;this['_lastOrigin']=_0x2dabe2[_0x574d10(0x7dd)],this[_0x574d10(0x7fe)]=_0x2dabe2['_x'],this[_0x574d10(0x3ac)]=_0x2dabe2['_y'];const _0x42b191=ColorManager[_0x574d10(0x860)]();this[_0x574d10(0x729)][_0x574d10(0x5ad)](0x0,0x0,this[_0x574d10(0x635)],this[_0x574d10(0x5e7)],_0x42b191);const _0x30ad62='\x20Origin:\x20%1'[_0x574d10(0x538)](_0x2dabe2['_origin']===0x0?_0x574d10(0x8a0):_0x574d10(0x1fc)),_0x248143=_0x574d10(0x5e4)[_0x574d10(0x538)](_0x2dabe2['_x']),_0x11012c='Y:\x20%1'[_0x574d10(0x538)](_0x2dabe2['_y']),_0x1711ea='%1:\x20Exit\x20'[_0x574d10(0x538)](TextManager[_0x574d10(0x206)]('cancel'));let _0x58c655=Math[_0x574d10(0x966)](this[_0x574d10(0x635)]/0x4);this[_0x574d10(0x273)](_0x30ad62,_0x58c655*0x0,0x0,_0x58c655),this['drawText'](_0x248143,_0x58c655*0x1,0x0,_0x58c655,_0x574d10(0x545)),this[_0x574d10(0x273)](_0x11012c,_0x58c655*0x2,0x0,_0x58c655,'center');const _0x2fe56a=this[_0x574d10(0x7cf)](_0x1711ea)[_0x574d10(0x4d6)],_0x21aef1=this[_0x574d10(0x635)]-_0x2fe56a;this[_0x574d10(0x51e)](_0x1711ea,_0x21aef1,0x0,_0x2fe56a);},VisuMZ[_0x59226c(0x33f)]=function(_0x10c66e){const _0x4f60f8=_0x59226c;if(Utils['isOptionValid']('test')){var _0x1c6738=require(_0x4f60f8(0x671))[_0x4f60f8(0x1c4)]['get']();SceneManager[_0x4f60f8(0x75c)]();if(_0x10c66e)setTimeout(_0x1c6738[_0x4f60f8(0x3b8)]['bind'](_0x1c6738),0x190);}},VisuMZ[_0x59226c(0x748)]=function(_0xe7aac6,_0x88c37a){const _0x461f96=_0x59226c;_0x88c37a=_0x88c37a['toUpperCase']();var _0x3ae3f4=1.70158,_0x5a0e33=0.7;switch(_0x88c37a){case _0x461f96(0x53c):return _0xe7aac6;case'INSINE':return-0x1*Math[_0x461f96(0x1b5)](_0xe7aac6*(Math['PI']/0x2))+0x1;case _0x461f96(0x358):return Math[_0x461f96(0x71a)](_0xe7aac6*(Math['PI']/0x2));case _0x461f96(0x920):return-0.5*(Math[_0x461f96(0x1b5)](Math['PI']*_0xe7aac6)-0x1);case _0x461f96(0x74e):return _0xe7aac6*_0xe7aac6;case'OUTQUAD':return _0xe7aac6*(0x2-_0xe7aac6);case _0x461f96(0x2e0):return _0xe7aac6<0.5?0x2*_0xe7aac6*_0xe7aac6:-0x1+(0x4-0x2*_0xe7aac6)*_0xe7aac6;case'INCUBIC':return _0xe7aac6*_0xe7aac6*_0xe7aac6;case _0x461f96(0x2e7):var _0x322ea0=_0xe7aac6-0x1;return _0x322ea0*_0x322ea0*_0x322ea0+0x1;case _0x461f96(0x6ae):return _0xe7aac6<0.5?0x4*_0xe7aac6*_0xe7aac6*_0xe7aac6:(_0xe7aac6-0x1)*(0x2*_0xe7aac6-0x2)*(0x2*_0xe7aac6-0x2)+0x1;case _0x461f96(0x551):return _0xe7aac6*_0xe7aac6*_0xe7aac6*_0xe7aac6;case _0x461f96(0x93e):var _0x322ea0=_0xe7aac6-0x1;return 0x1-_0x322ea0*_0x322ea0*_0x322ea0*_0x322ea0;case _0x461f96(0x40c):var _0x322ea0=_0xe7aac6-0x1;return _0xe7aac6<0.5?0x8*_0xe7aac6*_0xe7aac6*_0xe7aac6*_0xe7aac6:0x1-0x8*_0x322ea0*_0x322ea0*_0x322ea0*_0x322ea0;case'INQUINT':return _0xe7aac6*_0xe7aac6*_0xe7aac6*_0xe7aac6*_0xe7aac6;case _0x461f96(0x20c):var _0x322ea0=_0xe7aac6-0x1;return 0x1+_0x322ea0*_0x322ea0*_0x322ea0*_0x322ea0*_0x322ea0;case'INOUTQUINT':var _0x322ea0=_0xe7aac6-0x1;return _0xe7aac6<0.5?0x10*_0xe7aac6*_0xe7aac6*_0xe7aac6*_0xe7aac6*_0xe7aac6:0x1+0x10*_0x322ea0*_0x322ea0*_0x322ea0*_0x322ea0*_0x322ea0;case'INEXPO':if(_0xe7aac6===0x0){if(_0x461f96(0x4ca)!==_0x461f96(0x4ca))this[_0x461f96(0x2af)]()?_0x1afa07[_0x461f96(0x2d3)]['WindowLayer_render'][_0x461f96(0x38e)](this,_0x1e4e37):this['renderNoMask'](_0x11a98e);else return 0x0;}return Math[_0x461f96(0x2ed)](0x2,0xa*(_0xe7aac6-0x1));case _0x461f96(0x60d):if(_0xe7aac6===0x1)return 0x1;return-Math[_0x461f96(0x2ed)](0x2,-0xa*_0xe7aac6)+0x1;case _0x461f96(0x787):if(_0xe7aac6===0x0||_0xe7aac6===0x1)return _0xe7aac6;var _0x44ed42=_0xe7aac6*0x2,_0x155cb4=_0x44ed42-0x1;if(_0x44ed42<0x1){if(_0x461f96(0x530)!=='HNLXL')_0x1936fa[_0x461f96(0x2d3)][_0x461f96(0x4f0)][_0x461f96(0x38e)](this),this[_0x461f96(0x3fb)]();else return 0.5*Math[_0x461f96(0x2ed)](0x2,0xa*_0x155cb4);}return 0.5*(-Math[_0x461f96(0x2ed)](0x2,-0xa*_0x155cb4)+0x2);case _0x461f96(0x453):var _0x44ed42=_0xe7aac6/0x1;return-0x1*(Math[_0x461f96(0x5d6)](0x1-_0x44ed42*_0xe7aac6)-0x1);case'OUTCIRC':var _0x322ea0=_0xe7aac6-0x1;return Math[_0x461f96(0x5d6)](0x1-_0x322ea0*_0x322ea0);case'INOUTCIRC':var _0x44ed42=_0xe7aac6*0x2,_0x155cb4=_0x44ed42-0x2;if(_0x44ed42<0x1){if(_0x461f96(0x48a)===_0x461f96(0x583))_0x5189f6[_0x461f96(0x2d3)][_0x461f96(0x254)][_0x461f96(0x38e)](this),this[_0x461f96(0x417)]();else return-0.5*(Math['sqrt'](0x1-_0x44ed42*_0x44ed42)-0x1);}return 0.5*(Math[_0x461f96(0x5d6)](0x1-_0x155cb4*_0x155cb4)+0x1);case _0x461f96(0x444):return _0xe7aac6*_0xe7aac6*((_0x3ae3f4+0x1)*_0xe7aac6-_0x3ae3f4);case'OUTBACK':var _0x44ed42=_0xe7aac6/0x1-0x1;return _0x44ed42*_0x44ed42*((_0x3ae3f4+0x1)*_0x44ed42+_0x3ae3f4)+0x1;break;case _0x461f96(0x445):var _0x44ed42=_0xe7aac6*0x2,_0x5ba1ed=_0x44ed42-0x2,_0x356f50=_0x3ae3f4*1.525;if(_0x44ed42<0x1)return 0.5*_0x44ed42*_0x44ed42*((_0x356f50+0x1)*_0x44ed42-_0x356f50);return 0.5*(_0x5ba1ed*_0x5ba1ed*((_0x356f50+0x1)*_0x5ba1ed+_0x356f50)+0x2);case _0x461f96(0x71b):if(_0xe7aac6===0x0||_0xe7aac6===0x1)return _0xe7aac6;var _0x44ed42=_0xe7aac6/0x1,_0x155cb4=_0x44ed42-0x1,_0x2985ef=0x1-_0x5a0e33,_0x356f50=_0x2985ef/(0x2*Math['PI'])*Math[_0x461f96(0x504)](0x1);return-(Math[_0x461f96(0x2ed)](0x2,0xa*_0x155cb4)*Math[_0x461f96(0x71a)]((_0x155cb4-_0x356f50)*(0x2*Math['PI'])/_0x2985ef));case'OUTELASTIC':var _0x2985ef=0x1-_0x5a0e33,_0x44ed42=_0xe7aac6*0x2;if(_0xe7aac6===0x0||_0xe7aac6===0x1)return _0xe7aac6;var _0x356f50=_0x2985ef/(0x2*Math['PI'])*Math[_0x461f96(0x504)](0x1);return Math[_0x461f96(0x2ed)](0x2,-0xa*_0x44ed42)*Math[_0x461f96(0x71a)]((_0x44ed42-_0x356f50)*(0x2*Math['PI'])/_0x2985ef)+0x1;case'INOUTELASTIC':var _0x2985ef=0x1-_0x5a0e33;if(_0xe7aac6===0x0||_0xe7aac6===0x1)return _0xe7aac6;var _0x44ed42=_0xe7aac6*0x2,_0x155cb4=_0x44ed42-0x1,_0x356f50=_0x2985ef/(0x2*Math['PI'])*Math[_0x461f96(0x504)](0x1);if(_0x44ed42<0x1)return-0.5*(Math['pow'](0x2,0xa*_0x155cb4)*Math[_0x461f96(0x71a)]((_0x155cb4-_0x356f50)*(0x2*Math['PI'])/_0x2985ef));return Math[_0x461f96(0x2ed)](0x2,-0xa*_0x155cb4)*Math[_0x461f96(0x71a)]((_0x155cb4-_0x356f50)*(0x2*Math['PI'])/_0x2985ef)*0.5+0x1;case'OUTBOUNCE':var _0x44ed42=_0xe7aac6/0x1;if(_0x44ed42<0x1/2.75)return 7.5625*_0x44ed42*_0x44ed42;else{if(_0x44ed42<0x2/2.75){if(_0x461f96(0x84c)===_0x461f96(0x1d9))this[_0x461f96(0x81a)][_0x461f96(0x573)](_0x3de5b6[_0x461f96(0x957)][_0x461f96(0x3e3)]);else{var _0x5ba1ed=_0x44ed42-1.5/2.75;return 7.5625*_0x5ba1ed*_0x5ba1ed+0.75;}}else{if(_0x44ed42<2.5/2.75){var _0x5ba1ed=_0x44ed42-2.25/2.75;return 7.5625*_0x5ba1ed*_0x5ba1ed+0.9375;}else{if(_0x461f96(0x88e)==='eIVoR'){var _0x2144da=_0x1b1036(_0x443337['$1']);try{_0xafb2a*=_0x331045(_0x2144da);}catch(_0x512b8c){if(_0x22ac7d[_0x461f96(0x31b)]())_0x498462[_0x461f96(0x735)](_0x512b8c);}}else{var _0x5ba1ed=_0x44ed42-2.625/2.75;return 7.5625*_0x5ba1ed*_0x5ba1ed+0.984375;}}}}case _0x461f96(0x867):var _0x2f145d=0x1-VisuMZ['ApplyEasing'](0x1-_0xe7aac6,'outbounce');return _0x2f145d;case _0x461f96(0x6f1):if(_0xe7aac6<0.5)var _0x2f145d=VisuMZ[_0x461f96(0x748)](_0xe7aac6*0x2,_0x461f96(0x3e4))*0.5;else{if(_0x461f96(0x955)!=='IzPec')_0x4ed5cb=_0x1a4104[_0x461f96(0x93a)](_0x85728f),_0x123281=_0x5541b4[_0x461f96(0x93a)](_0x596a7b),_0x32084e=_0x1ae219[_0x461f96(0x93a)](_0x34ec07),_0x5831db[_0x461f96(0x2d3)][_0x461f96(0x6b5)][_0x461f96(0x38e)](this,_0x3e7aa8,_0x55feb5,_0x2d224a,_0x5f4ffe),this[_0x461f96(0x5d3)]();else var _0x2f145d=VisuMZ[_0x461f96(0x748)](_0xe7aac6*0x2-0x1,_0x461f96(0x1d5))*0.5+0.5;}return _0x2f145d;default:return _0xe7aac6;}},VisuMZ['GetParamIcon']=function(_0x50f462){const _0x2ec3a6=_0x59226c;_0x50f462=String(_0x50f462)['toUpperCase']();const _0x19020e=VisuMZ['CoreEngine'][_0x2ec3a6(0x6ad)]['Param'];if(_0x50f462===_0x2ec3a6(0x7c6))return _0x19020e[_0x2ec3a6(0x237)];if(_0x50f462===_0x2ec3a6(0x503))return _0x19020e[_0x2ec3a6(0x88d)];if(_0x50f462===_0x2ec3a6(0x982))return _0x19020e['IconParam2'];if(_0x50f462===_0x2ec3a6(0x294))return _0x19020e[_0x2ec3a6(0x8fc)];if(_0x50f462==='MAT')return _0x19020e[_0x2ec3a6(0x674)];if(_0x50f462===_0x2ec3a6(0x29b))return _0x19020e[_0x2ec3a6(0x3ab)];if(_0x50f462===_0x2ec3a6(0x580))return _0x19020e[_0x2ec3a6(0x267)];if(_0x50f462===_0x2ec3a6(0x91e))return _0x19020e[_0x2ec3a6(0x496)];if(_0x50f462==='HIT')return _0x19020e['IconXParam0'];if(_0x50f462===_0x2ec3a6(0x38c))return _0x19020e[_0x2ec3a6(0x62f)];if(_0x50f462===_0x2ec3a6(0x5cb))return _0x19020e['IconXParam2'];if(_0x50f462===_0x2ec3a6(0x429))return _0x19020e['IconXParam3'];if(_0x50f462===_0x2ec3a6(0x7a2))return _0x19020e[_0x2ec3a6(0x385)];if(_0x50f462===_0x2ec3a6(0x269))return _0x19020e[_0x2ec3a6(0x3d9)];if(_0x50f462===_0x2ec3a6(0x921))return _0x19020e[_0x2ec3a6(0x352)];if(_0x50f462===_0x2ec3a6(0x675))return _0x19020e[_0x2ec3a6(0x625)];if(_0x50f462==='MRG')return _0x19020e['IconXParam8'];if(_0x50f462===_0x2ec3a6(0x800))return _0x19020e[_0x2ec3a6(0x42e)];if(_0x50f462==='TGR')return _0x19020e['IconSParam0'];if(_0x50f462===_0x2ec3a6(0x405))return _0x19020e[_0x2ec3a6(0x46e)];if(_0x50f462==='REC')return _0x19020e[_0x2ec3a6(0x8c6)];if(_0x50f462==='PHA')return _0x19020e[_0x2ec3a6(0x709)];if(_0x50f462===_0x2ec3a6(0x47e))return _0x19020e['IconSParam4'];if(_0x50f462===_0x2ec3a6(0x541))return _0x19020e[_0x2ec3a6(0x339)];if(_0x50f462===_0x2ec3a6(0x811))return _0x19020e[_0x2ec3a6(0x620)];if(_0x50f462===_0x2ec3a6(0x42f))return _0x19020e[_0x2ec3a6(0x70a)];if(_0x50f462===_0x2ec3a6(0x218))return _0x19020e[_0x2ec3a6(0x1f6)];if(_0x50f462===_0x2ec3a6(0x50a))return _0x19020e[_0x2ec3a6(0x1b7)];if(VisuMZ[_0x2ec3a6(0x2d3)][_0x2ec3a6(0x40e)][_0x50f462])return VisuMZ[_0x2ec3a6(0x2d3)][_0x2ec3a6(0x40e)][_0x50f462]||0x0;return 0x0;},VisuMZ[_0x59226c(0x1a5)]=function(_0x300bd2,_0x535621,_0x20112d){const _0x3f6ccf=_0x59226c;if(_0x20112d===undefined&&_0x300bd2%0x1===0x0)return _0x300bd2;if(_0x20112d!==undefined&&[_0x3f6ccf(0x7c6),_0x3f6ccf(0x503),_0x3f6ccf(0x982),_0x3f6ccf(0x294),'MAT','MDF',_0x3f6ccf(0x580),'LUK'][_0x3f6ccf(0x98d)](String(_0x20112d)['toUpperCase']()[_0x3f6ccf(0x7e8)]()))return _0x300bd2;_0x535621=_0x535621||0x0;if(VisuMZ[_0x3f6ccf(0x2d3)][_0x3f6ccf(0x7d9)][_0x20112d]){if(VisuMZ[_0x3f6ccf(0x2d3)][_0x3f6ccf(0x3a9)][_0x20112d]==='integer')return _0x300bd2;else{if(_0x3f6ccf(0x873)==='cXIGE')return String((_0x300bd2*0x64)['toFixed'](_0x535621))+'%';else{if(_0x4ae9d6&&_0x3be98a[_0x3f6ccf(0x4f7)]){if(this['isGamepadButtonPressed'](_0x3b62ce))return!![];}}}}return String((_0x300bd2*0x64)[_0x3f6ccf(0x4bc)](_0x535621))+'%';},VisuMZ['GroupDigits']=function(_0x119536){const _0x2be445=_0x59226c;_0x119536=String(_0x119536);if(!_0x119536)return _0x119536;if(typeof _0x119536!==_0x2be445(0x8f8))return _0x119536;const _0x433c26=VisuMZ[_0x2be445(0x2d3)]['Settings']['QoL'][_0x2be445(0x234)]||'en-US',_0x2b983c={'maximumFractionDigits':0x6};_0x119536=_0x119536[_0x2be445(0x8a2)](/\[(.*?)\]/g,(_0x28cb89,_0x1a403c)=>{const _0xf73c47=_0x2be445;return VisuMZ[_0xf73c47(0x1f8)](_0x1a403c,'[',']');}),_0x119536=_0x119536['replace'](/<(.*?)>/g,(_0x27a87d,_0xb6ce58)=>{const _0x47dbb0=_0x2be445;return VisuMZ[_0x47dbb0(0x1f8)](_0xb6ce58,'<','>');}),_0x119536=_0x119536[_0x2be445(0x8a2)](/\{\{(.*?)\}\}/g,(_0x1e5dde,_0x1119f5)=>{const _0x244743=_0x2be445;if(_0x244743(0x8f9)!==_0x244743(0x672))return VisuMZ[_0x244743(0x1f8)](_0x1119f5,'','');else _0x5120b3[_0x244743(0x2bd)][0x57]='up',_0x415d54[_0x244743(0x2bd)][0x41]='left',_0x5bce75['keyMapper'][0x53]=_0x244743(0x81c),_0x2c67cf[_0x244743(0x2bd)][0x44]='right',_0x53f61a[_0x244743(0x2bd)][0x45]=_0x244743(0x585);}),_0x119536=_0x119536[_0x2be445(0x8a2)](/(\d+\.?\d*)/g,(_0x2c1a74,_0x1ddd44)=>{const _0x1478c1=_0x2be445;if(_0x1478c1(0x90a)!==_0x1478c1(0x3df)){let _0x32f785=_0x1ddd44;if(_0x32f785[0x0]==='0')return _0x32f785;if(_0x32f785[_0x32f785[_0x1478c1(0x587)]-0x1]==='.')return Number(_0x32f785)[_0x1478c1(0x26c)](_0x433c26,_0x2b983c)+'.';else return _0x32f785[_0x32f785[_0x1478c1(0x587)]-0x1]===','?'KIHdf'===_0x1478c1(0x971)?Number(_0x32f785)['toLocaleString'](_0x433c26,_0x2b983c)+',':this[_0x1478c1(0x7cb)]()[_0x1478c1(0x931)](_0x554674=>this['canUse'](_0x554674)&&this[_0x1478c1(0x22c)]()[_0x1478c1(0x98d)](_0x554674[_0x1478c1(0x7fd)])):Number(_0x32f785)['toLocaleString'](_0x433c26,_0x2b983c);}else return _0x51a7b6[_0x1478c1(0x5c5)]-this['helpAreaHeight']();});let _0x408468=0x3;while(_0x408468--){_0x119536=VisuMZ['RevertPreserveNumbers'](_0x119536);}return _0x119536;},VisuMZ['PreserveNumbers']=function(_0x31f30e,_0x2289cf,_0x787655){const _0x130fe=_0x59226c;return _0x31f30e=_0x31f30e['replace'](/(\d)/gi,(_0x57b137,_0xa8fbca)=>_0x130fe(0x782)[_0x130fe(0x538)](Number(_0xa8fbca))),_0x130fe(0x455)[_0x130fe(0x538)](_0x31f30e,_0x2289cf,_0x787655);},VisuMZ[_0x59226c(0x611)]=function(_0x335e11){const _0x1d8ccd=_0x59226c;return _0x335e11=_0x335e11[_0x1d8ccd(0x8a2)](/PRESERVCONVERSION\((\d+)\)/gi,(_0x4419cc,_0x57c55c)=>Number(parseInt(_0x57c55c))),_0x335e11;},VisuMZ['openURL']=function(_0x4fdd9c){const _0x5b3efb=_0x59226c;SoundManager[_0x5b3efb(0x62e)]();if(!Utils[_0x5b3efb(0x2d5)]()){if(_0x5b3efb(0x6b6)!==_0x5b3efb(0x6b6))this[_0x5b3efb(0x716)][_0x5b3efb(0x573)](_0x2ef60d[_0x5b3efb(0x957)][_0x5b3efb(0x77b)]);else{const _0x232543=window[_0x5b3efb(0x7e9)](_0x4fdd9c,_0x5b3efb(0x979));}}else{const _0x2339ff=process[_0x5b3efb(0x689)]==_0x5b3efb(0x376)?_0x5b3efb(0x7e9):process[_0x5b3efb(0x689)]==_0x5b3efb(0x5bc)?'start':'xdg-open';require(_0x5b3efb(0x1f1))['exec'](_0x2339ff+'\x20'+_0x4fdd9c);}},Game_Picture[_0x59226c(0x7bf)]['anchor']=function(){const _0x34f0de=_0x59226c;return this[_0x34f0de(0x94d)];},VisuMZ[_0x59226c(0x2d3)][_0x59226c(0x8ba)]=Game_Picture[_0x59226c(0x7bf)]['initBasic'],Game_Picture[_0x59226c(0x7bf)][_0x59226c(0x42a)]=function(){const _0x21bebb=_0x59226c;VisuMZ[_0x21bebb(0x2d3)][_0x21bebb(0x8ba)]['call'](this),this[_0x21bebb(0x94d)]={'x':0x0,'y':0x0},this[_0x21bebb(0x6b0)]={'x':0x0,'y':0x0};},VisuMZ[_0x59226c(0x2d3)]['Game_Picture_updateMove']=Game_Picture[_0x59226c(0x7bf)][_0x59226c(0x4a7)],Game_Picture[_0x59226c(0x7bf)][_0x59226c(0x4a7)]=function(){const _0x346fd6=_0x59226c;this[_0x346fd6(0x30c)]();const _0x21b6e7=this[_0x346fd6(0x8d9)];VisuMZ['CoreEngine'][_0x346fd6(0x542)][_0x346fd6(0x38e)](this);if(_0x21b6e7>0x0&&this['_duration']<=0x0){if(_0x346fd6(0x3b3)!==_0x346fd6(0x3b3)){const _0x3a98d1=_0x5e1ac5[_0x346fd6(0x7a1)];let _0x2db18b=_0xd567da['TextStr'];if(['','Untitled'][_0x346fd6(0x98d)](_0x2db18b))_0x2db18b=_0x5d4512[_0x346fd6(0x3c5)]['call'](this);const _0x58ed04=_0x1d9062['EnableJS'][_0x346fd6(0x38e)](this),_0x5c2a7d=_0xc95687['ExtJS'][_0x346fd6(0x38e)](this);this[_0x346fd6(0x7f8)](_0x2db18b,_0x3a98d1,_0x58ed04,_0x5c2a7d),this[_0x346fd6(0x8a4)](_0x3a98d1,_0x41d532[_0x346fd6(0x762)]['bind'](this,_0x5c2a7d));}else this['_x']=this[_0x346fd6(0x8e2)],this['_y']=this[_0x346fd6(0x691)],this[_0x346fd6(0x400)]=this[_0x346fd6(0x431)],this['_scaleY']=this[_0x346fd6(0x55e)],this[_0x346fd6(0x608)]=this['_targetOpacity'],this[_0x346fd6(0x94d)]&&(this[_0x346fd6(0x94d)]['x']=this[_0x346fd6(0x6b0)]['x'],this[_0x346fd6(0x94d)]['y']=this['_targetAnchor']['y']);}},VisuMZ[_0x59226c(0x2d3)][_0x59226c(0x3f0)]=Game_Picture[_0x59226c(0x7bf)][_0x59226c(0x666)],Game_Picture[_0x59226c(0x7bf)][_0x59226c(0x666)]=function(_0x16e92f,_0x505cfc,_0x26f173,_0x5c1062,_0x283cb2,_0x427cc0,_0x3f1184,_0x5ce0f){const _0xc5c265=_0x59226c;VisuMZ[_0xc5c265(0x2d3)]['Game_Picture_show']['call'](this,_0x16e92f,_0x505cfc,_0x26f173,_0x5c1062,_0x283cb2,_0x427cc0,_0x3f1184,_0x5ce0f),this[_0xc5c265(0x231)]([{'x':0x0,'y':0x0},{'x':0.5,'y':0.5}][_0x505cfc]||{'x':0x0,'y':0x0});},VisuMZ[_0x59226c(0x2d3)][_0x59226c(0x497)]=Game_Picture[_0x59226c(0x7bf)][_0x59226c(0x39d)],Game_Picture[_0x59226c(0x7bf)][_0x59226c(0x39d)]=function(_0x290133,_0x4ce7c1,_0x34b417,_0x3efe5b,_0x456344,_0x501df2,_0x119f3c,_0x320127,_0x46f9f3){const _0x4a648a=_0x59226c;VisuMZ[_0x4a648a(0x2d3)][_0x4a648a(0x497)]['call'](this,_0x290133,_0x4ce7c1,_0x34b417,_0x3efe5b,_0x456344,_0x501df2,_0x119f3c,_0x320127,_0x46f9f3),this['setTargetAnchor']([{'x':0x0,'y':0x0},{'x':0.5,'y':0.5}][_0x290133]||{'x':0x0,'y':0x0});},Game_Picture[_0x59226c(0x7bf)][_0x59226c(0x30c)]=function(){const _0x592d15=_0x59226c;this[_0x592d15(0x8d9)]>0x0&&(_0x592d15(0x473)!=='UFhuo'?(this[_0x592d15(0x94d)]['x']=this['applyEasing'](this[_0x592d15(0x94d)]['x'],this[_0x592d15(0x6b0)]['x']),this[_0x592d15(0x94d)]['y']=this['applyEasing'](this[_0x592d15(0x94d)]['y'],this['_targetAnchor']['y'])):_0x13627e['CoreEngine'][_0x592d15(0x55a)]['call'](this));},Game_Picture[_0x59226c(0x7bf)]['setAnchor']=function(_0x15d8fe){const _0x521f0c=_0x59226c;this[_0x521f0c(0x94d)]=_0x15d8fe,this['_targetAnchor']=JsonEx[_0x521f0c(0x8c0)](this['_anchor']);},Game_Picture[_0x59226c(0x7bf)]['setTargetAnchor']=function(_0x3b896e){const _0x1a529e=_0x59226c;this[_0x1a529e(0x6b0)]=_0x3b896e;},VisuMZ[_0x59226c(0x2d3)][_0x59226c(0x742)]=Sprite_Picture[_0x59226c(0x7bf)][_0x59226c(0x38f)],Sprite_Picture[_0x59226c(0x7bf)][_0x59226c(0x38f)]=function(){const _0x4c2193=_0x59226c,_0x554b10=this[_0x4c2193(0x67b)]();!_0x554b10[_0x4c2193(0x697)]()?VisuMZ[_0x4c2193(0x2d3)]['Sprite_Picture_updateOrigin']['call'](this):(this[_0x4c2193(0x697)]['x']=_0x554b10['anchor']()['x'],this['anchor']['y']=_0x554b10[_0x4c2193(0x697)]()['y']);},Game_Action[_0x59226c(0x7bf)][_0x59226c(0x7ef)]=function(_0x26bab9){const _0x46fadf=_0x59226c;if(_0x26bab9){if(_0x46fadf(0x6ba)!=='QQxdR'){const _0x480c3c=_0x26bab9['skillId'];if(_0x480c3c===0x1&&this[_0x46fadf(0x7ab)]()[_0x46fadf(0x52e)]()!==0x1)this['setAttack']();else{if(_0x480c3c===0x2&&this[_0x46fadf(0x7ab)]()['guardSkillId']()!==0x2){if(_0x46fadf(0x92a)!==_0x46fadf(0x645))this[_0x46fadf(0x8b4)]();else return _0x4af4e4[_0x46fadf(0x957)][_0x46fadf(0x8dc)][_0x46fadf(0x38e)](this);}else this[_0x46fadf(0x419)](_0x480c3c);}}else _0x46d493[_0x46fadf(0x2d3)]['Bitmap_gradientFillRect'][_0x46fadf(0x38e)](this,_0x3845e3,_0x34d92e,_0x33efce,_0x1b53b8,_0x5c165e,_0x1a9e0b,_0x2a717a),this[_0x46fadf(0x5d3)]();}else this[_0x46fadf(0x3b4)]();},Game_Actor[_0x59226c(0x7bf)][_0x59226c(0x87f)]=function(){const _0x11b5f3=_0x59226c;return this['skills']()[_0x11b5f3(0x931)](_0x5decf5=>this[_0x11b5f3(0x4e8)](_0x5decf5)&&this[_0x11b5f3(0x22c)]()[_0x11b5f3(0x98d)](_0x5decf5[_0x11b5f3(0x7fd)]));},Window_Base[_0x59226c(0x7bf)]['createDimmerSprite']=function(){const _0x321298=_0x59226c;this['_dimmerSprite']=new Sprite(),this[_0x321298(0x58b)][_0x321298(0x22a)]=new Bitmap(0x0,0x0),this['_dimmerSprite']['x']=0x0,this[_0x321298(0x4c6)](this[_0x321298(0x58b)]);},Window_Base['prototype'][_0x59226c(0x4e7)]=function(){const _0x3a808c=_0x59226c;if(this['_dimmerSprite']){const _0x48ede5=this[_0x3a808c(0x58b)][_0x3a808c(0x22a)],_0xd6633b=this[_0x3a808c(0x4d6)],_0x34c3ea=this['height'],_0x439f9c=this['padding'],_0x22a2db=ColorManager['dimColor1'](),_0x3b63a6=ColorManager[_0x3a808c(0x7f3)]();_0x48ede5['resize'](_0xd6633b,_0x34c3ea),_0x48ede5[_0x3a808c(0x351)](0x0,0x0,_0xd6633b,_0x439f9c,_0x3b63a6,_0x22a2db,!![]),_0x48ede5['fillRect'](0x0,_0x439f9c,_0xd6633b,_0x34c3ea-_0x439f9c*0x2,_0x22a2db),_0x48ede5['gradientFillRect'](0x0,_0x34c3ea-_0x439f9c,_0xd6633b,_0x439f9c,_0x22a2db,_0x3b63a6,!![]),this['_dimmerSprite'][_0x3a808c(0x828)](0x0,0x0,_0xd6633b,_0x34c3ea);}},Game_Actor[_0x59226c(0x7bf)][_0x59226c(0x894)]=function(){const _0xa02156=_0x59226c;for(let _0x11563b=0x0;_0x11563b<this[_0xa02156(0x8a1)]();_0x11563b++){if(_0xa02156(0x6e6)!==_0xa02156(0x6e6))return this[_0xa02156(0x31c)]()||this[_0xa02156(0x6e1)]();else{const _0x512fa8=this[_0xa02156(0x6d2)]();let _0x245abf=Number[_0xa02156(0x7b0)];this[_0xa02156(0x72e)](_0x11563b,_0x512fa8[0x0]);for(const _0x8746aa of _0x512fa8){if(_0xa02156(0x201)==='nIcjm')return![];else{const _0x15e6d1=_0x8746aa[_0xa02156(0x8c5)]();_0x15e6d1>_0x245abf&&(_0x245abf=_0x15e6d1,this[_0xa02156(0x72e)](_0x11563b,_0x8746aa));}}}}this[_0xa02156(0x22f)]('waiting');},Window_BattleItem[_0x59226c(0x7bf)]['isEnabled']=function(_0x45ebd6){const _0x5eaf3=_0x59226c;return BattleManager[_0x5eaf3(0x396)]()?BattleManager[_0x5eaf3(0x396)]()[_0x5eaf3(0x4e8)](_0x45ebd6):Window_ItemList[_0x5eaf3(0x7bf)][_0x5eaf3(0x64a)]['call'](this,_0x45ebd6);},VisuMZ[_0x59226c(0x2d3)][_0x59226c(0x337)]=Scene_Map['prototype'][_0x59226c(0x26a)],Scene_Map[_0x59226c(0x7bf)][_0x59226c(0x26a)]=function(){const _0x44804d=_0x59226c;VisuMZ['CoreEngine'][_0x44804d(0x337)][_0x44804d(0x38e)](this);const _0x2acdb7=this[_0x44804d(0x31f)][_0x44804d(0x31d)];if(_0x2acdb7)this[_0x44804d(0x83f)](_0x2acdb7);},VisuMZ[_0x59226c(0x2d3)][_0x59226c(0x2ad)]=Scene_Battle[_0x59226c(0x7bf)]['createSpriteset'],Scene_Battle[_0x59226c(0x7bf)][_0x59226c(0x26a)]=function(){const _0x57df98=_0x59226c;VisuMZ[_0x57df98(0x2d3)]['Scene_Battle_createSpriteset'][_0x57df98(0x38e)](this);const _0x421f9f=this['_spriteset'][_0x57df98(0x31d)];if(_0x421f9f)this[_0x57df98(0x83f)](_0x421f9f);},Sprite_Actor[_0x59226c(0x7bf)][_0x59226c(0x334)]=function(){const _0x49e2e6=_0x59226c;Sprite_Battler[_0x49e2e6(0x7bf)][_0x49e2e6(0x334)][_0x49e2e6(0x38e)](this),this[_0x49e2e6(0x340)]();if(this['_actor'])this[_0x49e2e6(0x1a2)]();else this[_0x49e2e6(0x2ae)]!==''&&(this['_battlerName']='');},Window[_0x59226c(0x7bf)][_0x59226c(0x5dd)]=function(){const _0x593ed5=_0x59226c,_0x68d6f2=this['_width'],_0x354043=this[_0x593ed5(0x6a3)],_0x4b6735=0x18,_0x5750bc=_0x4b6735/0x2,_0x58ee9b=0x60+_0x4b6735,_0x51f01d=0x0+_0x4b6735;this[_0x593ed5(0x30e)][_0x593ed5(0x22a)]=this[_0x593ed5(0x78f)],this[_0x593ed5(0x30e)][_0x593ed5(0x697)]['x']=0.5,this['_downArrowSprite'][_0x593ed5(0x697)]['y']=0.5,this[_0x593ed5(0x30e)][_0x593ed5(0x828)](_0x58ee9b+_0x5750bc,_0x51f01d+_0x5750bc+_0x4b6735,_0x4b6735,_0x5750bc),this[_0x593ed5(0x30e)][_0x593ed5(0x39d)](Math[_0x593ed5(0x93a)](_0x68d6f2/0x2),Math[_0x593ed5(0x93a)](_0x354043-_0x5750bc)),this[_0x593ed5(0x247)][_0x593ed5(0x22a)]=this[_0x593ed5(0x78f)],this[_0x593ed5(0x247)][_0x593ed5(0x697)]['x']=0.5,this['_upArrowSprite'][_0x593ed5(0x697)]['y']=0.5,this[_0x593ed5(0x247)][_0x593ed5(0x828)](_0x58ee9b+_0x5750bc,_0x51f01d,_0x4b6735,_0x5750bc),this[_0x593ed5(0x247)]['move'](Math[_0x593ed5(0x93a)](_0x68d6f2/0x2),Math[_0x593ed5(0x93a)](_0x5750bc));},Window[_0x59226c(0x7bf)][_0x59226c(0x52c)]=function(){const _0x53fad7=_0x59226c,_0x2fda0b=0x90,_0x2b992d=0x60,_0x90dcae=0x18;this[_0x53fad7(0x8e5)][_0x53fad7(0x22a)]=this[_0x53fad7(0x78f)],this['_pauseSignSprite'][_0x53fad7(0x697)]['x']=0.5,this[_0x53fad7(0x8e5)][_0x53fad7(0x697)]['y']=0x1,this[_0x53fad7(0x8e5)]['move'](Math[_0x53fad7(0x93a)](this[_0x53fad7(0x94b)]/0x2),this[_0x53fad7(0x6a3)]),this[_0x53fad7(0x8e5)]['setFrame'](_0x2fda0b,_0x2b992d,_0x90dcae,_0x90dcae),this[_0x53fad7(0x8e5)][_0x53fad7(0x5ac)]=0xff;},Window[_0x59226c(0x7bf)]['_updateFilterArea']=function(){const _0x481c77=_0x59226c,_0x5b187e=this[_0x481c77(0x783)]['worldTransform']['apply'](new Point(0x0,0x0)),_0x1f086f=this[_0x481c77(0x783)]['filterArea'];_0x1f086f['x']=_0x5b187e['x']+this['origin']['x'],_0x1f086f['y']=_0x5b187e['y']+this[_0x481c77(0x6c7)]['y'],_0x1f086f[_0x481c77(0x4d6)]=Math[_0x481c77(0x715)](this[_0x481c77(0x635)]*this[_0x481c77(0x485)]['x']),_0x1f086f[_0x481c77(0x235)]=Math['ceil'](this[_0x481c77(0x5e7)]*this['scale']['y']);},Window['prototype']['_refreshBack']=function(){const _0x4cd764=_0x59226c,_0x30e493=this[_0x4cd764(0x460)],_0x3722a4=Math[_0x4cd764(0x228)](0x0,this[_0x4cd764(0x94b)]-_0x30e493*0x2),_0x4bed60=Math[_0x4cd764(0x228)](0x0,this['_height']-_0x30e493*0x2),_0x423e22=this['_backSprite'],_0x7c58eb=_0x423e22['children'][0x0];_0x423e22[_0x4cd764(0x22a)]=this[_0x4cd764(0x78f)],_0x423e22[_0x4cd764(0x828)](0x0,0x0,0x60,0x60),_0x423e22[_0x4cd764(0x39d)](_0x30e493,_0x30e493),_0x423e22[_0x4cd764(0x485)]['x']=_0x3722a4/0x60,_0x423e22['scale']['y']=_0x4bed60/0x60,_0x7c58eb[_0x4cd764(0x22a)]=this['_windowskin'],_0x7c58eb[_0x4cd764(0x828)](0x0,0x60,0x60,0x60),_0x7c58eb[_0x4cd764(0x39d)](0x0,0x0,_0x3722a4,_0x4bed60),_0x7c58eb[_0x4cd764(0x485)]['x']=0x1/_0x423e22[_0x4cd764(0x485)]['x'],_0x7c58eb[_0x4cd764(0x485)]['y']=0x1/_0x423e22[_0x4cd764(0x485)]['y'],_0x423e22[_0x4cd764(0x65a)](this['_colorTone']);},Game_Temp[_0x59226c(0x7bf)][_0x59226c(0x23d)]=function(){const _0x4a2ab6=_0x59226c;this[_0x4a2ab6(0x683)]=[],this[_0x4a2ab6(0x4af)]=[],this[_0x4a2ab6(0x214)]=[],this[_0x4a2ab6(0x2cb)]=[];},VisuMZ[_0x59226c(0x2d3)][_0x59226c(0x4f1)]=Scene_Base[_0x59226c(0x7bf)][_0x59226c(0x916)],Scene_Base[_0x59226c(0x7bf)][_0x59226c(0x916)]=function(){const _0x493489=_0x59226c;if($gameTemp)$gameTemp[_0x493489(0x23d)]();VisuMZ[_0x493489(0x2d3)][_0x493489(0x4f1)]['call'](this);},Bitmap['prototype'][_0x59226c(0x7f2)]=function(_0x6a1b02){const _0x3606cb=_0x59226c,_0x3908ff=this[_0x3606cb(0x5a5)];_0x3908ff[_0x3606cb(0x749)](),_0x3908ff[_0x3606cb(0x62d)]=this[_0x3606cb(0x7d4)]();const _0x9e61d5=_0x3908ff['measureText'](_0x6a1b02)[_0x3606cb(0x4d6)];return _0x3908ff[_0x3606cb(0x320)](),_0x9e61d5;},Window_Message[_0x59226c(0x7bf)][_0x59226c(0x52b)]=function(_0x503435){const _0x5c25c3=_0x59226c;return this[_0x5c25c3(0x591)]()?this['contents']['measureTextWidthNoRounding'](_0x503435):Window_Base[_0x5c25c3(0x7bf)][_0x5c25c3(0x52b)]['call'](this,_0x503435);},Window_Message[_0x59226c(0x7bf)][_0x59226c(0x591)]=function(){const _0x587f87=_0x59226c;return VisuMZ[_0x587f87(0x2d3)][_0x587f87(0x6ad)][_0x587f87(0x509)]['FontWidthFix']??!![];},VisuMZ['CoreEngine'][_0x59226c(0x44f)]=Game_Action[_0x59226c(0x7bf)][_0x59226c(0x514)],Game_Action[_0x59226c(0x7bf)][_0x59226c(0x514)]=function(){const _0x5d7b02=_0x59226c;if(this[_0x5d7b02(0x630)]()){if(_0x5d7b02(0x55d)!==_0x5d7b02(0x55d)){if(_0x416951[_0x5d7b02(0x3fd)]!==this['currencyUnit']())return![];return _0x273663[_0x5d7b02(0x2d3)][_0x5d7b02(0x6ad)][_0x5d7b02(0x1b0)][_0x5d7b02(0x1f0)];}else return VisuMZ[_0x5d7b02(0x2d3)][_0x5d7b02(0x44f)][_0x5d7b02(0x38e)](this);}else{if(_0x5d7b02(0x8ea)===_0x5d7b02(0x8ea))return 0x0;else{_0x4f541a[_0x5d7b02(0x62e)]();if(!_0x4d7b5d[_0x5d7b02(0x2d5)]()){const _0x4718b7=_0x24afdc[_0x5d7b02(0x7e9)](_0x45be1c,'_blank');}else{const _0x2059c1=_0x53e936[_0x5d7b02(0x689)]==_0x5d7b02(0x376)?'open':_0x56aaaa[_0x5d7b02(0x689)]==_0x5d7b02(0x5bc)?_0x5d7b02(0x277):_0x5d7b02(0x46a);_0x38af97('child_process')['exec'](_0x2059c1+'\x20'+_0x4d7780);}}}},VisuMZ[_0x59226c(0x2d3)]['Game_Action_setAttack']=Game_Action[_0x59226c(0x7bf)]['setAttack'],Game_Action[_0x59226c(0x7bf)]['setAttack']=function(){const _0x2d1d49=_0x59226c;this[_0x2d1d49(0x7ab)]()&&this['subject']()['canAttack']()?_0x2d1d49(0x877)===_0x2d1d49(0x877)?VisuMZ[_0x2d1d49(0x2d3)]['Game_Action_setAttack'][_0x2d1d49(0x38e)](this):this[_0x2d1d49(0x43c)]=_0x2d1d49(0x816):this[_0x2d1d49(0x3b4)]();},Sprite_Name[_0x59226c(0x7bf)][_0x59226c(0x7f6)]=function(){return 0x24;},Sprite_Name[_0x59226c(0x7bf)][_0x59226c(0x776)]=function(){const _0x1ea86d=_0x59226c,_0x134482=this[_0x1ea86d(0x3b0)](),_0x5a66a4=this[_0x1ea86d(0x4e2)](),_0x5b0c4f=this[_0x1ea86d(0x7f6)]();this[_0x1ea86d(0x612)](),this['bitmap'][_0x1ea86d(0x3b4)](),this[_0x1ea86d(0x22a)][_0x1ea86d(0x5d5)](_0x134482,0x0,0x0,_0x5a66a4,_0x5b0c4f,_0x1ea86d(0x349));},Bitmap[_0x59226c(0x7bf)][_0x59226c(0x5d5)]=function(_0x45819e,_0x236fcb,_0x4d9ff3,_0x3198b0,_0x5af2d1,_0x58adb5){const _0x45f8b4=_0x59226c,_0x5ac7aa=this[_0x45f8b4(0x5a5)],_0x2b4513=_0x5ac7aa[_0x45f8b4(0x98b)];_0x3198b0=_0x3198b0||0xffffffff;let _0x3bd459=_0x236fcb,_0x372740=Math['round'](_0x4d9ff3+0x18/0x2+this[_0x45f8b4(0x391)]*0.35);_0x58adb5===_0x45f8b4(0x545)&&(_0x45f8b4(0x91a)!==_0x45f8b4(0x681)?_0x3bd459+=_0x3198b0/0x2:this[_0x45f8b4(0x244)][_0x45f8b4(0x573)](_0x5aa86d['layoutSettings'][_0x45f8b4(0x90d)])),_0x58adb5===_0x45f8b4(0x1ca)&&(_0x3bd459+=_0x3198b0),_0x5ac7aa[_0x45f8b4(0x749)](),_0x5ac7aa[_0x45f8b4(0x62d)]=this[_0x45f8b4(0x7d4)](),_0x5ac7aa[_0x45f8b4(0x5ae)]=_0x58adb5,_0x5ac7aa[_0x45f8b4(0x1ff)]=_0x45f8b4(0x7bb),_0x5ac7aa[_0x45f8b4(0x98b)]=0x1,this[_0x45f8b4(0x688)](_0x45819e,_0x3bd459,_0x372740,_0x3198b0),_0x5ac7aa[_0x45f8b4(0x98b)]=_0x2b4513,this[_0x45f8b4(0x406)](_0x45819e,_0x3bd459,_0x372740,_0x3198b0),_0x5ac7aa['restore'](),this[_0x45f8b4(0x563)][_0x45f8b4(0x334)]();};