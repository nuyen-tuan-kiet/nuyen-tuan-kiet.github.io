


function Result_table() {


    Result_table.prototype.make_coloum_vertex = (i) =>{

  
        this.style = ctx.strokeStyle = "black";
        this.color = ctx.fillStyle = "blue";
        this.font = ctx.font = "13px Arial";
        this.text = ctx.fillText(i, 40, 100+(30*i));
        this.rect= ctx.rect(20, 84+(29*i), 50, 30	);
        this.stroke = ctx.stroke();
        
    }


    Result_table.prototype.make_colum_cost = (i,value)=>{
        this.style = ctx.strokeStyle = "black";
        this.color = ctx.fillStyle = "black";
        this.font = ctx.font = "13px Arial";
        this.text = ctx.fillText(value, 90, 100+(30*i));
        this.rect= ctx.rect(70, 84+(29*i), 70, 30	);
        this.stroke = ctx.stroke();

    }

    Result_table.prototype.make_colum_path = (i,value)=>{

        this.rect= ctx.rect(70, 84+(29*i), 250, 30	);
        this.stroke = ctx.stroke();

    }


  
}