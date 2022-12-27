var ALLLOWED = [[false, true,  true,  true,  true,  false, false, false],   
									 [true,  false, true,  true,  false, true,  false,  false],
									 [true,  true,  false, false, true,  false,  false,  false],
									 [true,  true,  false, false, false, true,  false, false],
									 [true,  false, true,  false, false,  false, true,  false],
									 [false, true,  false,  true,  false, false, true,  true],
									 [false, false,  true,  false, true,  true,  false, true],
									 [false, false, false, false,  false,  true,  true,  false]];


let distance = {};
let prev = [];
let pq = new Priority_queue();
let checked =[];

function Algorithm() {
  this.item = [];
  this.draw = new Object_vertex();
  this.Edges = [];
  this.vertex = [];
  this.draw.create_vertex();
  this.draw.creatematrix();
  this.draw.create_edge();
  this.draw.create_lable_line();


    // lấy dữ liệu các cạnh từ đồ họa
   Algorithm.prototype.get_Edges_vertex = function() 
   {  
      var graph = this.draw.matrix_edge.reduce((acc, current, index) =>
      {
        acc[index] = [ Math.floor(current.charAt(0)),
                      Math.floor( current.charAt( current.length - 1)),];
            return acc;
      },[]);

            // các cạnh trên đồ thị
          this.Edges = graph;
          console.log(this.Edges);


           //  các đỉnh trên đồ thị
          this.vertex=this.Edges.flat().reduce((acc,curent)=>
        {
             if(!acc[curent])
             acc[curent] = curent
             else acc[curent]
          return acc
        },[])


    };



  Algorithm.prototype.Execute_Algorithm = ()=>
  {
    //lấy đỉnh gốc đã nhập
    this.vertex_root = parseInt(document.getElementById("input_edge").value);
      // thiết lập 
       distance[this.vertex_root]= 0;
       pq.enqueue(this.vertex_root,0);
        this.vertex.forEach( element =>
        {
                if(element != this.vertex_root)
                {
                distance[element] = Infinity;
                }
                prev[element] = null;
         })
         while(!pq.isEmpty())
       {
          let minNode = pq.dequeue();
          let currentnode= minNode.element;
            for( var i=0 ;i<8;i++)
          {   
               // xét tìm cạnh kề đỉnh hiện tại(currentnode), các cạnh kề là i
              if (!checked.includes(i) &&
                currentnode !=i &&
                ALLLOWED[currentnode][i] &&
                this.draw.matrix_edge.includes(`${[currentnode,i]}`)||
                this.draw.matrix_edge.includes(`${[i,currentnode]}`) )
            {         
              let alt =  distance[currentnode] + this.draw.adj_matrix[currentnode][i].value_edge ;
              let alt_1 = distance[currentnode] + this.draw.adj_matrix[i][currentnode].value_edge ;
                         
                                if( alt < distance[i] || alt_1 < distance[i] )
                               {
                                 distance[i] = alt||alt_1;
                                 prev[i] = currentnode;
                                 pq.enqueue(i,distance[i]);
                                 checked.push(i);
                                 console.log(i, distance[i])
                               }
                                 else if( alt == distance[i] )
                               {
                                continue
                               }
             }
            }
        }

        return {distance,prev}
    }
}




