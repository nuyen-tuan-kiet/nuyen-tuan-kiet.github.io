
var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");

// vị trí các đỉnh trên đồ thị 
var X_POS_LOGICAL = [800, 725, 875, 650, 950, 725, 875, 800];
var Y_POS_LOGICAL = [25, 125, 125, 225, 225, 325, 325, 425];

// các cạnh nối các đỉnh
var X_line_LOGICAL = [800, 725+15, 875-15, 650+15, 950-15, 725-10, 875+10, 800];
var Y_line_LOGICAL = [25+20, 125+16, 125+16, 225-13, 225-10, 325-18, 325-18, 425-20];



//-----thiết lập cố định đừơng đi các cạnh được nối từ các đỉnh này với các đỉnh khác theo ma trận
// true của ALLOWED[0][2] :là có thể nối cạnh giữa đỉnh  0 và 2
//      0     1      2      3      4      5      6      7
//  0 false  true   true  true    true  false  false   false
// 1
// 2
// 3
// 4
// 5
// 6
// 7
var ALLLOWED = [[false, true,  true,  true,  true,  false, false, false],   
									 [true,  false, true,  true,  false, true,  false,  false],
									 [true,  true,  false, false, true,  false,  false,  false],
									 [true,  true,  false, false, false, true,  false, false],
									 [true,  false, true,  false, false,  false, true,  false],
									 [false, true,  false,  true,  false, false, true,  true],
									 [false, false,  true,  false, true,  true,  false, true],
									 [false, false, false, false,  false,  true,  true,  false]];


//----------------Tạo đường cong cho các cạnh trên canvas
                            //o-1    o-2      0-3         0-4
var curve_line_point_=[[[],[800,25],[800,30],[650, 20],[950, 20],[],[],[]],
							// 1-2       1-3          1-5
					 [[],[],[800,125],[700,160],[],[740,120],[],[]],
									//2-4        2-6
					 [ [],[],[],[],[900,160],[],[863, 150],[]],
					 //                 3-5
					[[],[],[],[], [],[700,270],[],[]],
					 //                4-6
					[[],[],[],[],[],[],[900,270],[]],
					//                 5-6        5-7
					[[],[],[],[],[],[],[900,300],[650,350]],
					//                      6-7
					[ [],[],[],[],[],[],[],[950,350]]
				   ]	
				     
//----------------Tạo lable cho các cạnh trên canvas	   
				         //o-1    o-2      0-3         0-4
var lable_edge = [[[],[755, 90],[835, 90],[660, 90],[920, 90],[],[],[]],
                    	// 1-2       1-3          1-5 
                  [[],[],[795, 130],[680,180],[],[710,220],[],[]] ,
				                  //2-4        2-6
				  [ [],[],[],[],[910,180],[],[875,220],[]],
                   //                 3-5
				  [[],[],[],[], [],[670,280],[],[]],
				       //                4-6
				  [[],[],[],[],[],[],[920,275],[]],
					//                 5-6        5-7
				  [[],[],[],[],[],[],[800,300], [740,400]],
					//                      6-7
				  [ [],[],[],[],[],[],[],[900,400]]
				]



				

function Object_vertex()  // tạo các đỉnh
{
     ///
	 
	this.number_vertexs =8; // so luong đỉnh
    this.graph=[];
	this.vertex =  [];
	this.result=0;

	//tạo ma trận 
    this.adj_matrix = new Array(this.number_vertexs);
    this.matrix_edge = [];


//--------------------------------------------------------


	//tạo ma trận thiết lập các liên kết giữa các đỉnh
	Object_vertex.prototype.creatematrix = function()
	{
         
		// 
		for (i = 0; i < this.number_vertexs; i++)
		{
			 this.adj_matrix[i] = new Array(this.number_vertexs);
		}
		
		for (i = 0; i < this.number_vertexs; i++)
		{
			for (j = i+1; j < this.number_vertexs; j++)
			{
                 // tạo độ dài cạnh nối giữa các node cho phép
				if( (ALLLOWED[i][j]) )
				{
				var edge_length = Math.floor(Math.random()* 9) + 1;
				this.adj_matrix[i][j] = edge_length;
				this.adj_matrix[j][i] = edge_length;
				}
				else
				{
					this.adj_matrix[i][j] = -1;
			 	   this.adj_matrix[j][i] = -1;
			    }
			}
		}
	};



	Object_vertex.prototype.create_vertex = function()
	{
		var i;
      for ( i=0 ; i<this.number_vertexs ;i++)
	  {
        this.vertex[i] = new vertexCircle(i, String(i));		
      }   
	};


   ///  tạo các cạnh nối giữa các node
	Object_vertex.prototype.create_edge = function()
	{

             for (var i=0 ;i<7;i++)
			{

				for(var j=i+1; j<=7;j++)
				{
				  
					if( (ALLLOWED[i][j])  && Math.random() >0.3)
					{	
					
					// luu các cạnh đc tạo ngẫu nhiên vào mảng trung gian
					this.matrix_edge.push(`${[i,j]}`);
					this.adj_matrix[i][j] = new Line(this.adj_matrix[i][j],
						                              i,j,X_line_LOGICAL[i],
													  Y_line_LOGICAL[i],
					                                  X_line_LOGICAL[j],
													  Y_line_LOGICAL[j],
													  curve_line_point_[i][j][0],
													  curve_line_point_[i][j][1]
													  )
					}
					
			    }
			} 
	 };


	Object_vertex.prototype.create_lable_line = function ()
	{
       
		 for (var i=0 ;i<7;i++)
		{

			 for(var j=i+1; j<=7;j++)
			{
                if( (ALLLOWED[i][j]) && this.matrix_edge.includes(`${[i,j]}`) )
			   {
				
					this.adj_matrix[i][j] = new Lable(this.adj_matrix[i][j].value_edge,
						                            lable_edge[i][j][0],
													lable_edge[i][j][1],
					                                )

			    }
			}
		}
	};




	Object_vertex.prototype.create_table = function()
	{
		
     // lable vertex
		this.line= ctx.lineWidth = "1";
		this.lablel = ctx.font = "15px Arial";
		this.fill_text =ctx.fillText("Vertex", 21, 70);

    // lable cost
	    this.line= ctx.lineWidth = "1";
		this.lablel = ctx.font = "15px Arial";
		this.fill_text =ctx.fillText("Cost", 90, 70);

	// lable path
	    this.line= ctx.lineWidth = "1";
		this.lablel = ctx.font = "15px Arial";
		this.fill_text =ctx.fillText("Path", 200, 70);

		for(var i = 0;i<=7;i++)
	  {
		this.vertex[i] = new Result_table();
		this.vertex[i].make_coloum_vertex(i);
		this.vertex[i].make_colum_cost(i,"Infinity");
		this.vertex[i].make_colum_path(i,"nope");
	  }
	};


//    -----------cập nhật ---------------
	Object_vertex.prototype.set_value_cost = function(i,value)
	{
		 ctx.strokeStyle = "black";
         ctx.font = "13px Arial";
         ctx.fillText(value, 90, 100+(30*i));
	};

	Object_vertex.prototype.set_value_path = function(i,value)
	{
		ctx.strokeStyle = "black";
        ctx.font = "13px Arial";
        ctx.fillText(value, 150, 100+(30*i));
	}

//    -----------tô màu ---------------
	Object_vertex.prototype.high_light_cost=function(i)
	{
		ctx.beginPath();
        ctx.lineWidth = "4";
        ctx.strokeStyle = "red";
        ctx.rect(70, 84+(29*i), 70, 30	) 
        ctx.stroke();
	};

	Object_vertex.prototype.high_light_path=function(i)
	{
		ctx.beginPath();
        ctx.lineWidth = "4";
        ctx.strokeStyle = "red";
		ctx.rect(70, 84+(29*i), 250, 30	)
        ctx.stroke();
	};

//    ------------- xóa -----------------
	Object_vertex.prototype.clear_high_light_cost = function(i)
	{
		ctx.beginPath();
        ctx.lineWidth = "0";
        ctx.strokeStyle = "black";
        ctx.rect(70, 84+(29*i), 70, 30	) 
        ctx.stroke();
	};

	Object_vertex.prototype.clear_high_light_path = function(i)
	{
		ctx.beginPath();
        ctx.lineWidth = "0";
        ctx.strokeStyle = "black";
		ctx.rect(70, 84+(29*i), 250, 30	)
        ctx.stroke();
	};

	Object_vertex.prototype.clear_value_cost =function(i)
	{
		ctx.clearRect(78, 80+(30*i),50,18);
	};




	Object_vertex.prototype.draw = function(result)
	{
		// suy ra đường đi từ đỉnh gốc đến các đỉnh còn lại dựa vào kết quã thuật toán
		const path = result.prev.reduce((acc,curr,index)=>
		{
			   acc[index] = [index];
		       let j = curr;
               for( var i = 0; i<8 ; i++)
			  {    
				if(result.prev[j] == null)
				{
					acc[index].push("-->",j)
					break;
				}
				else
				{
				  acc[index].push("-->",j);
                   j = result.prev[j]
				}
			  } 
            
			  return acc
		},[])
      

	  
      let i=0;
	   myInterval= setInterval(()=>{	
		
			 if( i == 8)
			{
			 clearInterval(myInterval);
			}
			  else
			{
			this.clear_value_cost(i)
            this.set_value_cost(i,result.distance[i]=="Infinity"? "no path":result.distance[i]==0? 0:result.distance[i]);
			this.set_value_path(i,path[i] == null? 0 :path[i])
			this.high_light_cost(i);
			this.high_light_path(i)
		
			setTimeout(()=>{
				let j=i;
				this.clear_high_light_cost(j-=1)
				this.clear_high_light_path(j)
			},1000)
				i+=1;
			}

		  
	   },2000)
	
	  console.log(path)
	}
	

}





//--------------- THIẾT LẬP đồ thị-----------------

const run_agorrithim = new Algorithm();
//----tạo đồ thị ban đầu và lấy dữ liệu các đỉnh cạnh từ đồ thị -
run_agorrithim.get_Edges_vertex();

const tale_result = new Object_vertex();
//-------tạo trước bảng kết quả ---------
tale_result.create_table();



//------------------CHẠY THUẬT TOÁN------------------
const get_edge= document.getElementById("run_dijkstra");
get_edge.onclick = () =>{
   
       //----thực hiện thuât toán-------
     const result= run_agorrithim.Execute_Algorithm();

       //----- hiển thị kết quả---------
     const  draw_result= new Object_vertex();
           draw_result.draw(result);

}
