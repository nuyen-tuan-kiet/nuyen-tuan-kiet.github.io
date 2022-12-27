


class Node {
    constructor( vertex, priority)
    {
        this.element = vertex;
        this.priority = priority;
    }
}




function Priority_queue( ) {

    this.items = [];
    //  hàm thêm đỉnh vào hàng đợi
    Priority_queue.prototype.enqueue= function( vertex, priority)
    {
            // tạo đối tượng node là trong hàng đợi
        var vertex = new Node( vertex, priority);
        var contain = false;
     
            // lặp qua toàn bộ mảng item để thêm phần tử vào đúng vị trí của Queue
         for (var i = 0; i < this.items.length; i++)
        {
            if ( this.items[i].priority > vertex.priority)
            {
                // vị trí chính xác được tìm thấy thì item là enqueued
                this.items.splice(i, 0, vertex);
                contain = true;
                break;
            }
            else if( this.items[i].priority == vertex.priority )
            {
                this.items.splice(i+1, 0, vertex);
                contain = true;
                break;
            }
        }
           // nếu node có phần ưu tiên cao thì đưa xuống cùng của hàng đợi
         if (!contain) 
        {
            this.items.push(vertex);
        }
    }


    Priority_queue.prototype.dequeue = function ()
    {
      if (this.isEmpty())
      return "Underflow";
      return this.items.shift();
    };

    Priority_queue.prototype.isEmpty = function ()
    {
      //trả về gia tri boolean
      return this.items.length == 0;
    }
}
