
function lable_Control_console(lable,contain){

    const element = document.createTextNode(lable);
    const p1 = document.getElementById(contain);

    p1.appendChild(element);
     return element
}


function input_start_point(contain){
    const element = document.createElement("input");
    element.setAttribute("type", "text");
    element.setAttribute("style","margin-left:20px; width:50px; border-radius:3px;border:none");
    element.setAttribute("id", "input_edge");
    const p2 = document.getElementById(contain);
    
    p2.appendChild(element);
    return element
}


function button_run(contain){
      const  element = document.createElement("input");
      element.setAttribute("type", "button");
      element.setAttribute("style","margin-left:10px; width:80px; border-radius:3px;border:none");
      element.setAttribute("value", "run dijktra");
      element.setAttribute("id", "run_dijkstra");

    const p3 = document.getElementById(contain);
    
    p3.appendChild(element);
    return element
}



function Star(){
    lable_Control_console("Thuật toán dijktra tìm đường ngắn nhất","header");
    lable_Control_console("nhập điểm bắt đầu: ","control_table");
    input_start_point("control_table");
    button_run("control_table")
}


Star()