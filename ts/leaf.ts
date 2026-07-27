var interactables:interactable[] = [];

class leaf implements draggable {
  id = "leaf";
  html_element: HTMLElement;
  constructor (clientX : number, clientY : number){
    this.html_element = createElement("draggable", "<img src = ../img/leaf.png width=50px height=50px>", clientX, clientY);
  }
  getRect() : DOMRect{
    return (this.html_element.getBoundingClientRect());
  }
}

interface draggable extends html {
  getRect() : DOMRect;
  id : string | null;
}

interface interactable extends html {
  getRect() : DOMRect; 
	interact(elem : draggable | null) : void; //checks overlap and item id
}

interface html {
  html_element: HTMLElement;
}


function createElement(classname : string, innerHTML : string , clientX : number, clientY : number) : HTMLElement {
  var tmp : HTMLDivElement = document.createElement("div");
  tmp.className = classname;
  tmp.innerHTML = innerHTML;
  tmp.style.left = clientX + "px";
  tmp.style.top = clientY + "px";
  return tmp; 
}

class grill implements interactable{
  html_element: HTMLElement;
  interact(elem : draggable | null):void {
    if (elem === null || elem.html_element === null || elem.id != "leaf")
      return ;
    if (!overlap(elem.getRect(), this.getRect()))
    {
      leaf_count--;
      leaf_counter.innerText = "leafcount = " + leaf_count;
      document.body.removeChild(elem.html_element); //look for delete in js so the whole leaf class and all references to it can be deleted
    }
  }
  constructor (clientX : number, clientY : number){
    this.html_element = createElement("interactable", "<img src = ../img/grill.png/ width=400px height=300px>", clientX, clientY);
  }
  getRect() : DOMRect{
    return (this.html_element.getBoundingClientRect());
  }
}

function overlap(elem1: DOMRect, elem2: DOMRect): boolean {
    return !(
    elem1.right < elem2.left ||
    elem1.left > elem2.right ||
    elem1.bottom < elem2.top ||
    elem1.top > elem2.bottom
  );
}

var leaf_count : number = 4
var leaf_counter = createElement("div", "leafcount = " + leaf_count, 0,0);
document.body.appendChild(leaf_counter);
var front_grill : grill = new grill(0,0);
interactables.push(front_grill);
document.body.appendChild(front_grill.html_element)

for (let i : number = 0; i < leaf_count; i++)
{
  let x : number = Math.random() * front_grill.getRect().width;
  let y : number = Math.random() * front_grill.getRect().height;
  let inv_temp : leaf = new leaf(x + front_grill.getRect().left, y + front_grill.getRect().top);
  dragElement(inv_temp);
  document.body.appendChild(inv_temp.html_element)
}

function dragElement(elem: draggable): void {
  var pos1: number = 0,
    pos2: number = 0,
    pos3: number = 0,
    pos4: number = 0;
  if (elem.html_element)
  {
    var foo = document.getElementById(elem.html_element.id + "header");
    if (foo) {
      // if present, the header is where you move the DIV from:
      foo.onmousedown = dragMouseDown;
    } 
    else {
      // otherwise, move the DIV from anywhere inside the DIV:
      elem.html_element.onmousedown = dragMouseDown;
    }
  }

  function dragMouseDown(ev: MouseEvent): void {
    ev.preventDefault();
    pos3 = ev.clientX;
    pos4 = ev.clientY;
    document.onmousemove = elementDrag;
    document.onmouseup = closeDragElement;
  }

  function elementDrag(ev: MouseEvent): void {
    ev.preventDefault();
    pos1 = pos3 - ev.clientX;
    pos2 = pos4 - ev.clientY;
    pos3 = ev.clientX;
    pos4 = ev.clientY;
    // set the element's new position:
    if (elem.html_element)
    {
      elem.html_element.style.top = elem.html_element.offsetTop - pos2 + "px";
      elem.html_element.style.left = elem.html_element.offsetLeft - pos1 + "px";
    }
  }

  function closeDragElement(ev: MouseEvent): void {
    ev.preventDefault();
    document.onmouseup = null;
    document.onmousemove = null;
    for (let tmp of interactables)
    {
      tmp.interact(elem);
    }
  }
}