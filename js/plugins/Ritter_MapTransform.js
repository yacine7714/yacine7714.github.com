var Imported = Imported || {};
Imported.Ritter_MapTransform = true;

/*:
 *
 * @plugindesc Ritter Map Transform v1.0!
 * https://notritter.itch.io/
 *
 * @author Ritter 
 *
 * @target MZ
 *
 * @help
 *
 * ------------------------------------------------------------------
 *
 * Map Transform plugin allows you to change tile Ids on your game map!
 *
 * Feature List: 
 *
 * Change every layer of a tile, including regionId and shadows!
 * Swap out a tile with a tile from a TileMap!
 * Swap out an area of tiles with tiles from another map!
 * Easily change RegionId of tiles!
 * Create Prefabs on another map and display it on the game map!
 * Undo all changes to the map and return it back to default!
 * Make all changes to the map temporary or permanent!
 * Use Plugin Commands or Script calls, Both are available!
 * Demo Project available to poke around in!
 * 
 * 
 * This Plugin will not allow you to use tiles from multiple tilesets, tiles swapped must be from same tileset!
 * 	Example: Tileset Outside is used on Game Map and Tileset Outside is also used on Tile Map.
 *
 * ------------------------------------------------------------------
 *
 * Script Calls:
 *
 *
 *
   //-------------------------//
   // Get TileId Script Call  //
   //-------------------------// 
 *
 * Ritter.MapTransform.getTileId(x, y, z);
 *	Returns the Tile Id found at x, y, z
 * 
 * x = The X Location of the desired tile.
 * y = The Y Location of the desired tile.
 * z = The Layer of the desired tile.
 *
   //-------------------------//
   // Change Tile Script Call //
   //-------------------------//
 *
 * Ritter.MapTransform.changeTile(x, y, z, tileId, save);
 * 	Changes a layer of a tile.
 *
 * x = The X Location of the desired tile.
 * y = The Y Location of the desired tile.
 * z = The Layer to change.
 * tileId = The New Tile Id.
 * save = true/false; // Saves the changes made to the map if true.
 *
   //-----------------------//
   // Swap Tile Script Call //
   //-----------------------//
 *
 * Ritter.MapTransform.swapTile(mapId, x, y, sx, sy, changeRegion, save);
 * 	Swaps out a tile with a tile located on another map.
 *
 * mapId = Tile Map Id
 * x = The X Location on the Game Map to swap out.
 * y = The Y Location on the Game Map to swap out.
 * sx = The X Location of the desired tile on the Tile Map.
 * sy = The Y Location of the desired tile on the Tile Map.
 * changeRegion = true/false;  // Changes the regionId of tiles in area to match Tile Map tiles if true.
 * save = true/false;  // Saves the changes made to the map if true.
 *
 * 
   //-----------------------//
   // Swap Area Script Call //
   //-----------------------//
 *
 * Ritter.MapTransform.swapArea(mapId, sx, sy, width, height, x, y, changeRegion, save);
 * Swaps out an area of tiles with tiles found on another map.
 *
 * mapId = Tile Map Id
 * sx = The X Location of the upper left corner of the desired area on the Tile Map.
 * sy = The Y Location of the upper left corner of the desired area on the Tile Map.
 * width = The number of tiles wide the area is.
 * height = The number of tiles high the area is.
 * x = The X Location on the Game Map to swap out.
 * y = The Y Location on the Game Map to swap out.
 * changeRegion = true/false;  // Changes the regionId of tiles in area to match Tile Map tiles if true.
 * save = true/false;  // Saves the changes made to the map if true.
 *
 * 
   //-------------------------//
   // Revert Area Script Call //
   //-------------------------//
 *
 * Ritter.MapTransform.revertArea(x, y, width, height, save);
 * Returns the area back to its default tiles.
 *
 * x = The X Location of the upper left corner of the desired area.
 * y = The Y Location of the upper left corner of the desired area.
 * width = The number of tiles wide the area is.
 * height = The number of tiles high the area is.
 * save = true/false; // Saves the changes made to the map if true.
 *
 * 
   //-----------------------------//
   // Change RegionId Script Call //
   //-----------------------------//
 *
 * Ritter.MapTransform.changeRegionId(x, y, regionId, save);
 * 	Changes the Region Id of a tile.
 *
 * x = The X Location of the desired tile.
 * y = The Y Location of the desired tile.
 * regionId = The New Region Id to assign to the tile.
 * save = true/false; // Saves the changes made to the map if true.
 * 
 * 
   //------------------------//
   // Use Prefab Script Call //
   //------------------------//
 *
 * Ritter.MapTransform.usePrefab(Name, x, y, changeRegion, save);
 * 	Swaps out an area of tiles on the Game Map using a prefab set up in TileMap Notes.
 * 
 * Name = The "Name" you assigned the prefab.
 * x = The X Location of the upper left corner of the desired area.
 * y = The Y Location of hte upper left corner of the desired area.
 * changeRegion = true/false; // Changes the regionId of tiles in area to match Tile Map tiles if true.
 * save = true/false; // Saves the changes made to the map if true.
 * 
 * ------------------------------------------------------------------
 *
 * Terms of Use:
 * Can be used in Commercial and Non-Commercial games if purchased.
 * Personal edits are allowed for use in your game,
 * don't claim credit for this plugin.
 * Don't post this plugin elsewhere, modified or otherwise.
 * Don't remove my name from Author.
 * I am not liable for any problems you may encounter while
 * using this plugin, though I may, or may not, be available
 * for support on RPG Maker Forums or my itch.io page for this plugin.
 * I will not support edits to the code.
 * Please credit me in your games credits as: Craig "Ritter" B.
 *
 * --------------------------------------------------------------------------------
 *
 * Version log:
 *
 * 1.0: Released Plugin.
 *
 * --------------------------------------------------------------------------------
 * 
 * @param Tile Map Name Tag
 * @type text
 * @default ChildMap
 * @desc The tag added to Tile Maps to be used by the plugin.
 *
 * @command UsePrefab
 * @desc Shows a prefab on the game map.
 * Changes tiles on game map to match ids from prefab.
 *
 * @arg Name
 * @text Prefab Name
 * @desc Name of prefab to use.
 * @type select
 * @comment PrefabMaker Workspace Do Not Remove these lines.
 * @option b1
 * @option b2
 * @option b3
 * @option b4
 * @option b5
 * @option b6
 * @option b7
 * @option b8
 * @option b9
 * @option b10
 * @option b11
 * @option b12
 * @option b13
 * @option passage1
 * @option passage
 * @option passage2
 * @option passage3
 * @option Ruin alpha
 * @option ruin alpha
 * @comment End PrefabMaker Workspace.
 *
 * @arg x
 * @text X Location
 * @desc X location of top left tile of prefab.
 * @type text
 * @default $gameMap.event(1).x
 *
 * @arg y
 * @text Y Location
 * @desc Y location of top left tile of prefab.
 * @type text
 * @default $gameMap.event(1).y
 *
 * @arg ChangeRegion
 * @text Change Region Id?
 * @desc True to change regionIds with prefab.
 * False to preserve existing regionIds on map.
 * @type boolean
 * @default false
 *
 * @arg SaveChanges
 * @text Save Changes?
 * @desc True if map changes will be saved.
 * False if changes are temporary and reset on map change.
 * @type boolean
 * @default false
 *
 * @command ChangeTile
 * @desc Changes TileId of specified tile layer.
 *
 * @arg x
 * @text X Location
 * @desc The X Location of the Tile to change.
 * @type text
 * @default $gamePlayer.x
 *
 * @arg y
 * @text Y Location
 * @desc The Y Location of the Tile to change.
 * @type text
 * @default $gamePlayer.y
 *
 * @arg TileId
 * @text New TileId
 * @desc The TileId you want to change the tile to.
 * @type text
 * @default 0
 *
 * @arg Layer
 * @text Tile Layer
 * @desc The Tile Layer to change.
 * @type select
 * @default Layer1
 *
 * @option Layer 1
 * @value Layer1
 *
 * @option Layer 2
 * @value Layer2
 *
 * @option Layer 3
 * @value Layer3
 *
 * @option Layer 4
 * @value Layer4
 *
 * @option Shadows
 * @value Shadow
 *
 * @option RegionId
 * @value RegionId
 *
 * @arg SaveChanges
 * @text Save Changes?
 * @desc True if map changes will be saved.
 * False if changes are temporary and reset on map change.
 * @type boolean
 * @default false
 *
 * @command SwapTile
 * @desc Swap tile on the game map with a tile from another map.
 * 
 * @arg TileMapId
 * @text Tile Map Id
 * @desc The Id number of the Tile Map.
 * @type text
 *
 * @arg x
 * @text X Location
 * @desc X Location of tile on game map.
 * @type text
 * @default 0
 * 
 * @arg y
 * @text Y Location
 * @desc Y Location of tile on game map.
 * @type text
 * @default 0
 * 
 * @arg sx
 * @text TileMap X Location
 * @desc X Location of Tile on Tile Map.
 * @type text
 * @default 0
 * 
 * @arg sy
 * @text TileMap Y Location
 * @desc Y Location of Tile on Tile Map.
 * @type text
 * @default 0
 * 
 * @arg ChangeRegion
 * @text Change Region Id?
 * @desc True to change regionIds with prefab.
 * False to preserve existing regionIds on map.
 * @type boolean
 * @default false
 *
 * @arg SaveChanges
 * @text Save Changes?
 * @desc True if map changes will be saved.
 * False if changes are temporary and reset on map change.
 * @type boolean
 * @default false
 *
 * @command SwapArea
 * @desc Swap area on game map with tiles from tile map.
 *
 * @arg TileMapId
 * @text Tile Map Id
 * @desc The Id number of the Tile Map.
 * @type text
 *
 * @arg sx
 * @text TileMap X Location
 * @desc X Location of Tile on Tile Map.
 * @type text
 * @default 0
 * 
 * @arg sy
 * @text TileMap Y Location
 * @desc Y Location of Tile on Tile Map.
 * @type text
 * @default 0
 *
 * @arg width
 * @text Width of area
 * @desc The number of tiles wide the area is.
 * @type text
 * @default 3
 *
 * @arg height
 * @text Height of area
 * @desc The number of tiles high the area is.
 * @type text
 * @default 3
 *
 * @arg x
 * @text X Location
 * @desc X Location of tile on game map.
 * @type text
 * @default 0
 * 
 * @arg y
 * @text Y Location
 * @desc Y Location of tile on game map.
 * @type text
 * @default 0
 *
 * @arg ChangeRegion
 * @text Change Region Id?
 * @desc True to change regionIds with prefab.
 * False to preserve existing regionIds on map.
 * @type boolean
 * @default false
 *
 * @arg SaveChanges
 * @text Save Changes?
 * @desc True if map changes will be saved.
 * False if changes are temporary and reset on map change.
 * @type boolean
 * @default false
 *
 * @command RevertArea
 * @desc Reverts area on map back to original tiles.
 *
 * @arg x
 * @text X Location
 * @desc X Location of the upper left tile in area.
 Forms a rectangle using width/height from x,y.
 * @type text
 * @default 0
 *
 * @arg y
 * @text Y Location
 * @desc Y Location of the upper left tile in area.
 Forms a rectangle using width/height from x,y.
 * @type text
 * @default 0
 *
 * @arg width
 * @text Width of area
 * @desc The number of tiles wide the area is.
 * @type text
 * @default 3
 *
 * @arg height
 * @text Height of area
 * @desc The number of tiles high the area is.
 * @type text
 * @default 3
 *
 * @arg SaveChanges
 * @text Save Changes?
 * @desc True if map changes will be saved.
 * False if changes are temporary and reset on map change.
 * @type boolean
 * @default false
 *
 * @command ChangeRegionId
 * @desc Change Region Id of Tile.
 *
 * @arg x
 * @text X Location
 * @desc X Location of the upper left tile in area.
 Forms a rectangle using width/height from x,y.
 * @type text
 * @default 0
 *
 * @arg y
 * @text Y Location
 * @desc Y Location of the upper left tile in area.
 Forms a rectangle using width/height from x,y.
 * @type text
 * @default 0
 *
 * @arg regionId
 * @text New Region Id
 * @desc New Region Id to assign to tile.
 * @type text
 * @default 0
 *
 * @arg SaveChanges
 * @text Save Changes?
 * @desc True if map changes will be saved.
 * False if changes are temporary and reset on map change.
 * @type boolean
 * @default false
 *
*/

var Ritter = Ritter || {};
Ritter.Params = Ritter.Params || {};
Ritter.MapTransform = {};
Ritter._mapTileData = [];
Ritter._tempMapTileData = [];
Ritter._savedMapTileData = [];

Ritter.MapTransform.version = 1.0;


//Plugin Parameter

var parameters = PluginManager.parameters('Ritter_MapTransform');
Ritter.Params.TileMapTag = String(parameters["Tile Map Name Tag"]);



/* --------------PREFAB OBJECT SECTION--------------
 * Workspace for Prefab Maker Program to write to.
 * Do not remove these comment lines
 * You CAN edit prefabs below and create new ones too
 * as long as you follow the proper format.
 * If creating prefabs manually in the space below
 * the Prefab Maker Program will see those prefabs as well.
 * Don't forget to add the @option for plugin command arg too.
 * Use the following as a reference.
 * Ritter.MapTransform._prefabs.push([Name, x, y, width, height, mapId]);
 * Example: 
 *   Ritter.MapTransform._prefabs.push(["PrefabOne", 0, 0, 17, 13, 11]);
*/
Ritter.MapTransform._prefabs = [];

// ---> Prefabs Below This Line! <--- 
Ritter.MapTransform._prefabs.push(["b1", 0, 0, 23, 33, 171]);
Ritter.MapTransform._prefabs.push(["b2", 25, 0, 23, 33, 171]);
Ritter.MapTransform._prefabs.push(["b3", 50, 0, 23, 33, 171]);
Ritter.MapTransform._prefabs.push(["b4", 75, 0, 23, 33, 171]);
Ritter.MapTransform._prefabs.push(["b5", 100, 0, 23, 33, 171]);
Ritter.MapTransform._prefabs.push(["b6", 125, 0, 23, 33, 171]);
Ritter.MapTransform._prefabs.push(["b7", 150, 0, 23, 33, 171]);
Ritter.MapTransform._prefabs.push(["b8", 175, 0, 23, 33, 171]);
Ritter.MapTransform._prefabs.push(["b9", 200, 0, 23, 33, 171]);
Ritter.MapTransform._prefabs.push(["b10", 225, 0, 23, 33, 171]);
Ritter.MapTransform._prefabs.push(["b11", 0, 34, 23, 33, 171]);
Ritter.MapTransform._prefabs.push(["b12", 25, 34, 23, 33, 171]);
Ritter.MapTransform._prefabs.push(["b13", 50, 34, 23, 33, 171]);
Ritter.MapTransform._prefabs.push(["passage secret fin", 10, 1, 6, 3, 210]);
Ritter.MapTransform._prefabs.push(["passage1", 10, 1, 3, 2, 210]);
Ritter.MapTransform._prefabs.push(["passage2", 10, 3, 3, 2, 210]);
Ritter.MapTransform._prefabs.push(["passage3", 10, 5, 3, 2, 210]);
Ritter.MapTransform._prefabs.push(["Ruin alpha", 10, 7, 2, 2, 190]);
Ritter.MapTransform._prefabs.push(["ruin alpha", 10, 7, 1, 1, 190]);
// ---> Prefabs Above This Line! <--- 
// ------------END PREFAB OBJECT SECTION------------


//Plugin Commands

PluginManager.registerCommand('Ritter_MapTransform', 'UsePrefab', (args) => {
	const name = String(args.Name);
	const x = eval(args.x);
	const y = eval(args.y);
	const changeRegion = args.ChangeRegion == "true" ? true : false;
	const save = args.SaveChanges == "true" ? true : false;

	Ritter.MapTransform.usePrefab(name, x, y, changeRegion, save);
});

PluginManager.registerCommand('Ritter_MapTransform', 'ChangeTile', (args) => {
	const x = eval(args.x);
	const y = eval(args.y);
	var z = 0;
	switch (args.Layer) {
		case "Layer1":
			z = 0;
			break;
		case "Layer2":
			z = 1;
			break;
		case "Layer3":
			z = 2;
			break;
		case "Layer4":
			z = 3;
			break;
		case "Shadow":
			z = 4;
			break;
		default:
			z = 5;
			break;
	}
	const tileId = eval(args.TileId);
	const save = args.SaveChanges == "true" ? true : false;
	
	Ritter.MapTransform.changeTile(x, y, z, tileId, save);
});

PluginManager.registerCommand('Ritter_MapTransform', 'SwapTile', (args) => {
	const x = eval(args.x);
	const y = eval(args.y);
	const sx = eval(args.sx);
	const sy = eval(args.sy);
	const mapId = eval(args.TileMapId);
	const changeRegion = args.ChangeRegion == "true" ? true : false;
	const save = args.SaveChanges == "true" ? true : false;
	
	Ritter.MapTransform.swapTile(mapId, x, y, sx, sy, changeRegion, save);
});

PluginManager.registerCommand('Ritter_MapTransform', 'SwapArea', (args) => {
	const sStartX = eval(args.sx);
	const sStartY = eval(args.sy);
	const width = eval(args.width);
	const height = eval(args.height);
	const startX = eval(args.x);
	const startY = eval(args.y);
	const mapId = eval(args.TileMapId);
	const changeRegion = args.ChangeRegion == "true" ? true : false;
	const save = args.SaveChanges == "true" ? true : false;
	
	Ritter.MapTransform.swapArea(mapId, sStartX, sStartY, width, height, startX, startY, changeRegion, save);
});

PluginManager.registerCommand('Ritter_MapTransform', 'RevertArea', (args) => {
	const startX = eval(args.x);
	const startY = eval(args.y);
	const width = eval(args.width);
	const height = eval(args.height);
	const save = args.SaveChanges == "true" ? true : false;
	
	Ritter.MapTransform.revertArea(startX, startY, width, height, save);
});

PluginManager.registerCommand('Ritter_MapTransform', 'ChangeRegionId', (args) => {
	const x = eval(args.x);
	const y = eval(args.y);
	const regionId = eval(args.regionId);
	const save = args.SaveChanges == "true" ? true : false;

	Ritter.MapTransform.changeRegionId(x, y, regionId, save);	
});

//Plugin Code

(function() {

//Preloading Tile Maps
	
Ritter_Scene_Title_Create = Scene_Title.prototype.create;
Scene_Title.prototype.create = function() {
    Ritter_Scene_Title_Create.call(this);
    DataManager.preloadTileMaps();
};

DataManager.preloadTileMaps = function() { 
	var childMaps = [];
	for (let i = 1; i < $dataMapInfos.length; i++) { 
		if (!$dataMapInfos[i]) continue;
		if ($dataMapInfos[i].name.toLowerCase().contains(Ritter.Params.TileMapTag.toLowerCase())) {
			childMaps.push($dataMapInfos[i].id);
		}
	}
	if (childMaps.length == 0) return;

	for (var i = 0; i < childMaps.length; i++) {
		var filename = 'Map%1.json'.format(childMaps[i].padZero(3));
		this.loadDataFile('$TileMap%1'.format(childMaps[i]), filename);
		var map = '$TileMap%1'.format(childMaps[i]);
		this.loadTileMap(childMaps[i]);
	}
};

Ritter.MapTransform._sortMapMeta = function(mapId) {
	//Handling Map meta data
	map = '$TileMap%1'.format(mapId);
	mapData = window['$TileMap%1'.format(mapId)];
	if (!!mapData.note) {
		meta = mapData.note.split(">");
		meta.splice(meta.length - 1, 1);
		start = 0;
		end = 0;
		
		for (i = 0; i < meta.length; i++) {
			if (meta[i].contains("MTPrefabsStart")) start = i + 1;
			if (i >= start && !meta[i].contains("MTPrefabsEnd")) {
				meta[i] += ", " + mapId;
			}
			if (meta[i].contains("MTPrefabsEnd")) { 
				end = i;
				break;
			}
		}
		
		for (i = start; i < end; i++) {
			if (!meta[i]) continue;
			meta[i] = meta[i].match(/[A-Za-z0-9, ]+/g).join('');
			meta[i] = meta[i].split(', ');
			Ritter.MapTransform._prefabs.push(meta[i]);
		}
		
		for (i = 0; i < Ritter.MapTransform._prefabs.length; i++) {
			if (Ritter.MapTransform._prefabs[i][5] == mapId) {
				for (j = 1; j < Ritter.MapTransform._prefabs[i].length; j++) {
					Ritter.MapTransform._prefabs[i][j] = parseInt(Ritter.MapTransform._prefabs[i][j]);
				}
			}
		}
	}
};

DataManager.loadTileMap = function(mapId) {
	var filename = 'Map%1.json'.format(mapId.padZero(3));
	this.loadDataFile('$TileMap%1'.format(mapId), filename);
	var url = 'data/Map%1.json'.format(mapId.padZero(3))
	var map = new XMLHttpRequest();
	map.open('GET', url);
	map.onload = function() {
		if (!window['$TileMap%1'.format(mapId)]) return DataManager.loadTileMap(mapId);
		DataManager.extractMetadata(window['$TileMap%1'.format(mapId)]);
		if (!!Ritter._mapTileData[mapId]) return;
		if (!Ritter._mapTileData[mapId]) Ritter._mapTileData[mapId] = [];
		var map = '$TileMap%1'.format(mapId);
		for (let x = 0; x < window[map].width; x++) {
			Ritter._mapTileData[mapId][x] = [];
			for (let y = 0; y < window[map].height; y++) {
				Ritter._mapTileData[mapId][x][y] = [];
				for (let z = 0; z < 6; z++) {
					let tileId = window[map].data[(z * window[map].width * window[map].height) + (y * window[map].width) + x];
					Ritter._mapTileData[mapId][x][y][z] = tileId;
				}
			}
		}
		Ritter.MapTransform._sortMapMeta(mapId);
	};
	map.onerror = function() { throw new Error('Failed to load: ' + url); };
	map.send();
};

// Main Plugin Functions

Ritter.MapTransform.getTileId = function(x, y, z) {
	return $dataMap.data[(z * $dataMap.width * $dataMap.height) + (y * $dataMap.width) + x];
};

Ritter.MapTransform.changeTile = function(x, y, z, tileId, save = false) {
	$dataMap.data[(z * $dataMap.width * $dataMap.height) + (y * $dataMap.width) + x] = tileId;
	if (save) {
		if (Ritter._tempMapTileData[$gameMap._mapId][x][y][z]) Ritter._tempMapTileData[$gameMap._mapId][x][y][z] = undefined;
		Ritter._savedMapTileData[$gameMap._mapId][x][y][z] = tileId;
	} else {
		Ritter._tempMapTileData[$gameMap._mapId][x][y][z] = tileId;
	}
	Ritter.MapTransform.refreshTilemap();
};

Ritter.MapTransform.swapTile = function(mapId, x, y, sx, sy, changeRegion, save = false) {
	if (x >= $dataMap.width || x < 0 || y >= $dataMap.height || y < 0) return;
	mapData = window['$TileMap%1'.format(mapId)];
	for (let z = 0; z < 6; z++) {
		if (z == 5 && changeRegion == false) break;
		tileId = mapData.data[(z * mapData.width * mapData.height) + (sy * mapData.width) + sx];
		$dataMap.data[(z * $dataMap.width * $dataMap.height) + (y * $dataMap.width) + x] = tileId;
		if (save) {
			Ritter._savedMapTileData[$gameMap._mapId][x][y][z] = tileId;
		} else {
			Ritter._tempMapTileData[$gameMap._mapId][x][y][z] = tileId;
		}
	}
	Ritter.MapTransform.refreshTilemap();
};

Ritter.MapTransform.swapArea = function(mapId, sStartX, sStartY, width, height, startX, startY, changeRegion = false, save = false) {
	for (let w = 0; w < width; w++) {
		for (let h = 0; h < height; h++) {
			x = startX + w;
			y = startY + h;
			sx = sStartX + w;
			sy = sStartY + h;
			this.swapTile(mapId, x, y, sx, sy, changeRegion, save);
		}
	}
};

Ritter.MapTransform.revertArea = function(startX, startY, width, height, save = false) {
	for (let w = 0; w < width; w++) {
		for (let h = 0; h < height; h++) {
			for (let z = 0; z < 6; z++) {
				x = startX + w;
				y = startY + h;
				this.changeTile(x, y, z, Ritter._mapTileData[$gameMap._mapId][x][y][z], save);
			}
		}
	}
};

Ritter.MapTransform.changeRegionId = function(x, y, regionId, save = false) {
	$dataMap.data[(5 * $dataMap.width * $dataMap.height) + (y * $dataMap.width) + x] = regionId;
	this.refreshTilemap();
};



//Prefab stuff

Ritter.MapTransform.usePrefab = function(Name, x, y, changeRegion = false, save = false) {
	prefab = this._getPrefabItem(Name);
	if (!!prefab)
		this.swapArea(prefab[5], prefab[1], prefab[2], prefab[3], prefab[4], x, y, changeRegion, save);
};

Ritter.MapTransform._getPrefabItem = function(name) {
	for (i = 0; i < this._prefabs.length; i++) {
		if (this._prefabs[i][0] == name)
			return this._prefabs[i];
	}
	return false;
};


//Other stuff

Ritter.MapTransform.getMapTileData = function() {
	let mapId = $gameMap._mapId;
	if (!!Ritter._mapTileData[mapId]) return;
	if (!Ritter._mapTileData[mapId]) Ritter._mapTileData[mapId] = [];
	for (let x = 0; x < $dataMap.width; x++) {
		Ritter._mapTileData[mapId][x] = [];
		for (let y = 0; y < $dataMap.height; y++) {
			Ritter._mapTileData[mapId][x][y] = [];
			for (let z = 0; z < 6; z++) {
				let tileId = Ritter.MapTransform.getTileId(x, y, z);
				Ritter._mapTileData[mapId][x][y][z] = tileId;
			}
		}
	}
};

Ritter_Scene_Map_onMapLoaded_MT = Scene_Map.prototype.onMapLoaded;
Scene_Map.prototype.onMapLoaded = function() {
	Ritter_Scene_Map_onMapLoaded_MT.call(this);
	this._mapId = $gameMap._mapId;
	if (!Ritter._mapTileData[this._mapId]) {
		Ritter.MapTransform.getMapTileData();
	}
	if (!Ritter._tempMapTileData[this._mapId]) {
		Ritter._tempMapTileData[this._mapId] = [];
		for (let x = 0; x < $dataMap.width; x++) {
			Ritter._tempMapTileData[this._mapId][x] = [];
			for (let y = 0; y < $dataMap.height; y++) {
				Ritter._tempMapTileData[this._mapId][x][y] = [];
			}
		}
	}
	
	if (!Ritter._savedMapTileData[this._mapId]) {
		Ritter._savedMapTileData[this._mapId] = [];
		for (let x = 0; x < $dataMap.width; x++) {
			Ritter._savedMapTileData[this._mapId][x] = [];
			for (let y = 0; y < $dataMap.height; y++) {
				Ritter._savedMapTileData[this._mapId][x][y] = [];
			}
		}
	} else {
		Ritter.MapTransform._restoreSavedMapData(this._mapId);
	}
};


Ritter_Game_Player_ReserveTransfer_MT = Game_Player.prototype.reserveTransfer;
Game_Player.prototype.reserveTransfer = function(mapId, x, y, d, fadeType) {
    if (SceneManager._scene instanceof Scene_Map) Ritter.MapTransform._clearTempData($gameMap._mapId);
	Ritter_Game_Player_ReserveTransfer_MT.call(this, mapId, x, y, d, fadeType);
};

Ritter.MapTransform._clearTempData = function(mapId) {
	for (let x = 0; x < $dataMap.width; x++) {
		for (let y = 0; y < $dataMap.height; y++) {
			Ritter._tempMapTileData[mapId][x][y] = [];
		}
	}
};

Ritter.MapTransform._clearSaveData = function(mapId) {
	for (let x = 0; x < $dataMap.width; x++) {
		for (let y = 0; y < $dataMap.height; y++) {
			Ritter._savedMapTileData[mapId][x][y] = [];
		}
	}
};

Ritter.MapTransform._restoreTempMapData = function(mapId) {
	if (!Ritter._tempMapTileData[mapId]) return;
	for (let x = 0; x < Ritter._tempMapTileData[mapId].length; x++) {
		for (let y = 0; y < Ritter._tempMapTileData[mapId][x].length; y++) {
			for (let z = 0; z < 6; z++) {
				if (Ritter._tempMapTileData[mapId][x][y].length > 0) {
					tileId = Ritter._tempMapTileData[mapId][x][y][z];
					Ritter.MapTransform._restoreTile(x, y, z, tileId);
				}
			}
		}
	}
};

Ritter.MapTransform.resetMapTiles = function(mapId = $gameMap._mapId) {
	for (let x = 0; x < Ritter._mapTileData[mapId].length; x++) {
		for (let y = 0; y < Ritter._mapTileData[mapId][x].length; y++) {
			for (let z = 0; z < 6; z++) {
				tileId = Ritter._mapTileData[mapId][x][y][z];
				this._restoreTile(x, y, z, tileId);
			}
		}
	}
}	

Ritter.MapTransform._restoreTile = function(x, y, z, tileId) {
	$dataMap.data[(z * $dataMap.width * $dataMap.height) + (y * $dataMap.width) + x] = tileId;
};

Ritter.MapTransform._restoreSavedMapData = function(mapId) {
	if (!SceneManager._scene instanceof Scene_Map) return;
	for (let x = 0; x < Ritter._savedMapTileData[mapId].length; x++) {
		for (let y = 0; y < Ritter._savedMapTileData[mapId][x].length; y++) {
			for (let z = 0; z < 6; z++) {
				if (Ritter._savedMapTileData[mapId][x][y].length > 0) {
					tileId = Ritter._savedMapTileData[mapId][x][y][z];
					Ritter.MapTransform._restoreTile(x, y, z, tileId);
				}
			}
		}
	}
	Ritter.MapTransform.refreshTilemap();
};

Ritter_Spriteset_Map_CreateLowerLayer_MT = Spriteset_Map.prototype.createLowerLayer;
Spriteset_Map.prototype.createLowerLayer = function() {
    Ritter_Spriteset_Map_CreateLowerLayer_MT.call(this);
	if (SceneManager._scene instanceof Scene_Map) Ritter.MapTransform._restoreTempMapData($gameMap._mapId);
};

Ritter.MapTransform.refreshTilemap = function() {
	SceneManager._scene._spriteset._tilemap.refresh();
};

})();
