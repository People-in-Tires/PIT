// import { doc } from "prettier"; // eslint-disable-line @typescript-eslint/no-unused-vars

class inventory implements interactable {
  html_element: HTMLElement;
  item: item | null = null;

  get html(): HTMLElement {
    return this.html_element;
  }
  set html(elem: HTMLElement) {
    this.html_element = elem;
  }
  constructor(clientX: number, clientY: number) {
    console.log("inv open");
    this.html_element = createElement(
      "inventory",
      "<body> empty </body>",
      clientX,
      clientY,
    );
  }

  //this refers to the first element up from onmousedown aka html use .bind to bind this to a set value
  grab_item(ev: MouseEvent): void {
    if (this.item === null) {
      return;
    }
    this.item.html.style.left = `${String(ev.clientX)}px`; // eslint doesnt want you to mix strings and numbers when adding
    this.item.html.style.top = `${String(ev.clientY)}px`;
    document.body.appendChild(this.item.html);
    const mouseoverevent = new Event("mousedown");
    this.item.html.dispatchEvent(mouseoverevent);
    this.item = null;
    this.html_element.innerHTML = "";
  }

  interact(elem: draggable | null): void {
    if (elem === null || this.item) return;
    this.item = elem as item;
    this.html.innerHTML = elem.html_element.innerHTML;
    this.html.onmousedown = this.grab_item.bind(this);
    document.body.removeChild(elem.html_element);
  }

  getRect(): DOMRect {
    return this.html_element.getBoundingClientRect();
  }
}

class item implements draggable {
  id: string | null = null;
  html_element: HTMLElement;
  get html(): HTMLElement {
    return this.html_element;
  }
  set html(elem: HTMLElement) {
    this.html_element = elem;
  }
  constructor(elem: HTMLElement) {
    this.html_element = elem;
  }
  getRect(): DOMRect {
    return this.html_element.getBoundingClientRect();
  }
}

class beer extends item {
  override id = "beer";
  constructor(clientX: number, clientY: number) {
    super(
      createElement("draggable", "<img src=./img/beer.png/>", clientX, clientY),
    );
  }
}

interface draggable extends html {
  getRect(): DOMRect;
  id: string | null;
}

interface interactable extends html {
  getRect(): DOMRect;
  interact(elem: draggable | null): void; //checks overlap and item id
}

interface html {
  html_element: HTMLElement;
}

//make constructor for each type of item, in this it makes a new html element that is stored and can be added
const inv_slots: inventory[] = [];
const interactables: interactable[] = [];
// const items: item[] = []; // eslint-disable-line @typescript-eslint/no-unused-vars

const cat: item = new beer(100, 100);
dragElement(cat);
document.body.appendChild(cat.html_element);

for (let i = 0; i < 4; i++) {
  const inv_temp = new inventory((i + 1) * 150, 800); //change to bottom instead of top
  inv_slots.push(inv_temp);
  document.body.appendChild(inv_temp.html);
}

function createElement(
  classname: string,
  innerHTML: string,
  clientX: number,
  clientY: number,
): HTMLElement {
  const tmp: HTMLDivElement = document.createElement("div");
  tmp.className = classname;
  tmp.innerHTML = innerHTML;
  tmp.style.left = `${String(clientX)}px`;
  tmp.style.top = `${String(clientY)}px`;
  return tmp;
}

//add html elements to javascript array interactable, inventory, items
function dragElement(elem: draggable): void {
  let pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;
  const foo = document.getElementById(elem.html_element.id + "header");
  if (foo) {
    // if present, the header is where you move the DIV from:
    foo.onmousedown = dragMouseDown;
  } else {
    // otherwise, move the DIV from anywhere inside the DIV:
    elem.html_element.onmousedown = dragMouseDown;
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
    elem.html_element.style.top = `${String(elem.html_element.offsetTop - pos2)}px`;
    elem.html_element.style.left = `${String(elem.html_element.offsetLeft - pos1)}px`;
  }

  function closeDragElement(ev: MouseEvent): void {
    ev.preventDefault();
    document.onmouseup = null;
    document.onmousemove = null;
    for (const tmp of interactables) {
      if (overlap(elem.getRect(), tmp.getRect())) tmp.interact(elem);
    }
    for (const tmp of inv_slots) {
      if (overlap(elem.getRect(), tmp.getRect())) tmp.interact(elem);
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
}

//template for open minigame
const button = document.createElement("button");
button.className = "button";
button.innerText = "press me for grill";
button.style.left = `${String(300)}px`;
button.style.top = `${String(0)}px`;

let ifrm: HTMLElement;
let window_open = false;
button.onclick = onbuttonclicked;
document.body.appendChild(button);

function onbuttonclicked(ev: PointerEvent) {
  if (!window_open) {
    ifrm = document.createElement("iframe");
    ifrm.setAttribute("src", "http://localhost:8080/minigames/grill.html");
    ifrm.className = "iframe";
    ifrm.style.width = `${String(640)}px`;
    ifrm.style.height = `${String(480)}px`;
    ifrm.style.left = `${String(ev.clientX)}px`;
    ifrm.style.top = `${String(ev.clientY)}px`;
    document.body.appendChild(ifrm);
    window_open = true;
  } else {
    document.body.removeChild(ifrm);
    window_open = false;
  }
}
