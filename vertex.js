

var size_small = 7; // kich thuoc do thi

// thiết lập vị trí các node
var X_POS_LOGICAL = [800, 725, 875, 650, 950, 725, 875, 800];
var Y_POS_LOGICAL = [25, 125, 125, 225, 225, 325, 325, 425];
var SMALL_CURVE = [[0, 0.001, 0, 0.5, -0.5, 0, 0, 0],
								  [0, 0, 0, 0.001, 0, 0.001, -0.2, 0],
								  [0, 0.001, 0, 0, 0, 0.2, 0, 0],
								  [-0.5, 0, 0, 0, 0, 0.001, 0, 0.5],
								  [0.5, 0, 0, 0, 0, 0, 0, -0.5],
								  [0, 0, -0.2, 0, 0, 0, 0.001, 0.001],
								  [0, 0.2, 0, 0, 0, 0, 0, 0],
								  [0, 0, 0, -0.5, 0.5, 0, 0, 0]]



function vertexCircle (id, lable){

      ///   animation object 
      this.objectID = id;
      this.value= "infinity";
      this.minHeightDiff = 3;
      this.range = 5;
      this.font =ctx.font =  '15px sans-serif';
	  this.path= ctx.beginPath();
	  this.arc= ctx.arc(X_POS_LOGICAL[id], Y_POS_LOGICAL[id], 20, 0, 2 * Math.PI);
	  this.stroke= ctx.stroke();
	  this.text= ctx.fillText(id, X_POS_LOGICAL[id],Y_POS_LOGICAL[id] );



}



