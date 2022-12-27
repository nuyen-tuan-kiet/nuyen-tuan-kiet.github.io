 


 function Line(value,i,j,start_x,start_y,end_x,end_y,curve_x,cruve_y){
    
     this.star_x = start_x;
     this.star_y = start_y;
     this.end_x = end_x;
     this.end_y = end_y;
     this.value_edge= value;
      this.c = document.getElementById("myCanvas");
     this.ctx = c.getContext("2d");
     this.path = ctx.beginPath();
     this.moveto = ctx.moveTo(start_x, start_y);
     this.curve= ctx.quadraticCurveTo(curve_x, cruve_y, end_x, end_y);
     this.stroke = ctx.stroke() ;


 }