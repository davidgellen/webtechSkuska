var menuData = {
    "menu":[
        {
            "title" : "Domov",
            "uri": "index.html"
        },
        {
            "title" : "Tím",
            "uri": "#",
            "submenu" : [
                {
                    "title":"Zuzka",
                    "uri": "#",
                    "submenu" : [
                        {
                            "title":"Informácie",
                            "uri": "zuzka_informacie.html"
                        },
                        {
                            "title":"Hra",
                            "uri":"zuzka_hra.html"
                        }
                    ]
                },
                {
                    "title":"David",
                    "uri": "#",
                    "submenu" : [
                        {
                            "title":"Informácie",
                            "uri": "david_informacie.html"
                        },
                        {
                            "title":"Hra",
                            "uri":"david_hra.html"
                        }
                    ]
                },
                {
                    "title":"Peťo",
                    "uri": "#",
                    "submenu" : [
                        {
                            "title":"Informácie",
                            "uri": "peto_informacie.html"
                        },
                        {
                            "title":"Hra",
                            "uri":"peto_hra.html"
                        }
                    ]
                },
                {
                    "title":"Paťo",
                    "uri": "#",
                    "submenu" : [
                        {
                            "title":"Informácie",
                            "uri": "pato_informacie.html"
                        },
                        {
                            "title":"Hra",
                            "uri":"pato_hra.html"
                        }
                    ]
                },
            ]
        },
        {
            "title" : "Checklist",
            "uri" : "checklist.html"
        }
    ]
};

const template = document.createElement("template");
template.innerHTML = `
<div id="container">
        <ul id="menu" class="menu"></ul>
    </div>
    <style>
        body{
            font-size: 12px;
            font-family:"Arial", Arial, sans-serif;
        }
        
        #container {
            width: 150px;
        }
        
        #container ul {
            margin: 0px;
            padding: 0px;
        }
        
        #container li {
            list-style: none;
            position: relative;
            z-index: 10;
        }
        
        li {
            border: 1px solid #292827;
            background-color: black;
            width: 120px;
            height: 20px;
            padding: 0 9px 0 9px;
        }
        
        #container a {
            color: #A36220;
            cursor: pointer;
            display: block;
            height: 25px;
            line-height: 20px;
            text-indent: 3px;
            text-decoration: none;
            width: 100%;
        }
        
        div {
            vertical-align: middle;
        }
        
        .arrow {
            float:right;
        }
        
        .title {
            float:left;
        }
        
        ul.subMenu li {
            float:left;
        }
        
        li .subMenu {
            display: block;
            position: absolute;
            left: 139px;
            top: -1px;
        }
    </style>
`;

class mojeMenu extends HTMLElement{
    constructor(){
        super();
        this.attachShadow({mode: "open"});
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }
    connectedCallback(){
            var menu = this.shadowRoot.querySelector("#menu");
            function menuElem(obj, el) {
                for (var i = 0; i < obj.length; i++) {
                    var menuElement = document.createElement("li");
                    el.appendChild(menuElement);
        
                    var menuLink = document.createElement("a");
                    menuLink.setAttribute("href", obj[i].uri);
                    menuLink.setAttribute("title", obj[i].title);
        
                    var title = document.createElement("div");
                    title.className = 'title';
                    title.innerHTML = obj[i].title;
        
                    menuLink.appendChild(title);
        
                    if (typeof obj[i].submenu != 'undefined') {
                        menuLink.className = 'subMenuLink';
                    }
        
                    menuElement.appendChild(menuLink);
        
                    if (typeof obj[i].submenu != 'undefined') {
                        var subMenu = document.createElement("ul");
                        subMenu.className = 'subMenu';
        
                        var properties = {submenu : obj[i].submenu, subMenuEl : subMenu, menuEl : menuElement};
        
                        menuLink.properties = properties;
        
                        openSubMenu(menuLink);
                    }
                }
            }
        
            function openSubMenu(el) {
                el.addEventListener("click", function(ev){
                    ev.stopPropagation();
        
                    var subMenus = ev.target.parentNode.parentNode.parentNode.getElementsByTagName("ul");
        
                    var links = ev.target.parentNode.parentNode.parentNode.getElementsByClassName('subMenuLink');
        
                    for (var i = 1; i < subMenus.length; i++) {
                        subMenus[i].parentNode.removeChild(subMenus[i]);
                    }
                    this.style.color = "#DBC195";
        
                    this.properties.subMenuEl.innerHTML = "";
                    this.properties.menuEl.appendChild(this.properties.subMenuEl);
                    menuElem(this.properties.submenu, this.properties.subMenuEl);
                });
        
            };
        
            menuElem(menuData.menu, menu);
    }
}
window.customElements.define("menu-komponent", mojeMenu);