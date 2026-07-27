import { doc } from "prettier";

class inventory implements interactable{
  html_element: HTMLElement;
  item: item | null = null;

  get html() : HTMLElement {
    return (this.html_element);
  }
  set html(elem : HTMLElement) {
    this.html_element = elem;
  }
  constructor (clientX : number, clientY : number){
    console.log("inv open");
    this.html_element = createElement("inventory", "<body> empty </body>", clientX, clientY);
  }

  //this refers to the first element up from onmousedown aka html use .bind to bind this to a set value
  grab_item(ev : MouseEvent) : void{
    if (this.item === null) {
      return ;
    }
    this.item.html_element.style.left = ev.clientX + "px";
    this.item.html_element.style.top = ev.clientY + "px";
    document.body.appendChild(this.item.html_element);
    const mouseoverevent = new Event('mousedown');
    this.item.html_element.dispatchEvent(mouseoverevent);
    this.item = null;
    this.html_element.innerHTML = "";
  }

  //have it not accept draggable non items
	interact(elem : draggable | null): void {
    if (elem === null || elem.html_element === null || this.item)
      return ;
    if (overlap(elem.getRect(), this.getRect()))
    {
      this.item = elem as item;
      this.html.innerHTML = elem.html_element.innerHTML;
      this.html.onmousedown = this.grab_item.bind(this);
      document.body.removeChild(elem.html_element);
    }
	}

  getRect() : DOMRect{
    return (this.html_element.getBoundingClientRect());
  }
}

class item implements draggable{
  id : string | null = null;
  html_element: HTMLElement;
  constructor (elem: HTMLElement){
    this.html_element = elem;
  }
  getRect() : DOMRect{
    return (this.html_element.getBoundingClientRect());
  }
}

class beer extends item {
  override id = "beer";
  constructor (clientX : number, clientY : number){
    super(createElement("draggable", "<img src=./img/beer.png/>", clientX, clientY));
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

var inv_slots:inventory[] = [];
var interactables:interactable[] = [];

var cat : item = new beer(100, 100);
dragElement(cat);
document.body.appendChild(cat.html_element)

for (let i : number = 0; i < 4; i++)
{
  let inv_temp = new inventory((i + 1) * 150, 800); //change to bottom instead of top
  inv_slots.push(inv_temp);
  document.body.appendChild(inv_temp.html)
}


function createElement(classname : string, innerHTML : string , clientX : number, clientY : number) : HTMLElement {
  var tmp : HTMLDivElement = document.createElement("div");
  tmp.className = classname;
  tmp.innerHTML = innerHTML;
  tmp.style.left = clientX + "px";
  tmp.style.top = clientY + "px";
  return tmp; 
}

//add html elements to javascript array interactable, inventory, items
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
    for (let tmp of inv_slots)
    {
      tmp.interact(elem);
    }
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

//template for open minigame
var button = document.createElement("button");
button.className = "button";
button.innerText = "press me for grill"
button.style.left = 300 + "px";
button.style.top = 0 + "px";

var ifrm : HTMLElement;
var window_open : boolean = false;
button.onclick = onbuttonclicked;
document.body.appendChild(button);

function onbuttonclicked(ev: PointerEvent) { 
  if (!window_open) {
    ifrm = document.createElement("iframe");
    ifrm.setAttribute("src", "http://localhost:8080/minigames/grill.html");
    ifrm.className = "iframe";
    ifrm.style.width = "640px";
    ifrm.style.height = "480px";
    ifrm.style.left = ev.clientX + "px";    
    ifrm.style.top = ev.clientY + "px";
    document.body.appendChild(ifrm);
    window_open = true;
  } else {
    document.body.removeChild(ifrm);
    window_open = false;
  }
}