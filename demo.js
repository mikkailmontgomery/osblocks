var perlin = require('./')
var geojson = require('./virginia1.json')
window.geojson = geojson
var textures = "http://commondatastorage.googleapis.com/voxeltextures/"

var game = require('voxel-hello-world')({
  generateChunks: false,
  chunkDistance: 2,
  	textures : './textures/',
		  materials: [['grass', 'dirt', 'grass_dirt'], 'brick', 'dirt'],
  materialFlatColor: false
})

window.generator = perlin('foo', 0, 5)
var chunkSize = 32


//chucksize is 32 in this description
//forward backward 0 to chuncksize
//down to up is chucksize * (0 to chucksize - 1)
//left to right chucksize * chucksize + (0 *to chunksize)
game.voxels.on('missingChunk', function(p) {
  //var voxels = generator(p, chunkSize)
console.log(p)
if(p[0] !== 0){
	return
}
    var voxels = new Int8Array(32 * 32 * 32)//generator(p, chunkSize)
  for (i = 0; i < voxels.length; i++) { 
//left to right, first row and last
//first row
if(i < 31){
	voxels[i] = 1
}
//second to last row
if(i > (32*32*30) -1 && i < (32*32*30)+31){
	voxels[i] = 1
}

//left to right, first row and last
if(32*32*(i -1) == i){
	voxels[i] = 1
}
voxels[34] = 1

}
//forward to end, first row and last.
for(i = 0;i < 31;i++){
	//voxels[32*31*i] = 1
	//last row
	voxels[(32*32*i)+30] = 2
	//first row
	voxels[32*32*i] = 2
	//voxels[32*32*i+31] = 1

	//bottom to top
	//corner 1
	voxels[32*i] = 1

}
/*
for (x = 0; x < 32; x++) { 
	for (y = 0; y < 32; y++) { 
		for (z = 0; z < 32; z++) { 
			if(stillx == x){

			}else{
			var stillx = x
			var idx = x + y + z
			voxels[idx] = 1
			}
		}
	}
}


voxels[0] = 1
voxels[1] = 1
voxels[2] = 1
voxels[3] = 1
voxels[4] = 1
voxels[5] = 1
voxels[6] = 1
voxels[7] = 1
voxels[8] = 1
voxels[9] = 1
voxels[10] = 1
voxels[11] = 1
voxels[12] = 1
voxels[13] = 1
voxels[14] = 1
voxels[15] = 1
voxels[16] = 1
voxels[17] = 1
voxels[18] = 1
voxels[19] = 1
voxels[20] = 1
voxels[21] = 1
voxels[22] = 1
voxels[23] = 1
voxels[24] = 1
voxels[25] = 1
voxels[26] = 1
voxels[27] = 1
voxels[28] = 1
voxels[29] = 1
voxels[30] = 1
//voxels[31] = 1

voxels[1024] = 1
voxels[1025] = 1
voxels[1026] = 1
voxels[1027] = 1
voxels[1028] = 1
voxels[1029] = 1
voxels[1030] = 1
voxels[1031] = 1
voxels[1032] = 1
voxels[1033] = 1
voxels[1034] = 1
voxels[1035] = 1
voxels[1036] = 1
voxels[1037] = 1
voxels[1038] = 1
voxels[1039] = 1
*/	
  var chunk = {
    position: p,
    dims: [chunkSize, chunkSize, chunkSize],
    voxels: voxels
  }
  game.showChunk(chunk)
})

game.paused = false

window.game = game
