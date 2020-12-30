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
<style> @import "../css/all.css"; </style>
<div class="container">
    <nav>
        <div class="mobile-nav">
            <span>Menu</span>
            <div class="nav-btn">
                <i class="fas fa-bars"></i>
            </div>
        </div>

        <ul class="nav">
        </ul>
    </nav>
</div>

<style>
    .container {
        margin: 0 auto;
        width: 75%;
    }
  
    .mobile-nav {
        background: #555;
        color: #fff;
        display: none;
        justify-content: space-between;
        align-items: center;
        height: 35px;
        padding: 20px;
        font-size: 20px;
    }
  
    .mobile-nav .nav-btn {
        cursor: pointer;
    }
  
    .nav {
        background: rgb(48, 48, 48);
    }
  
    ul {
        list-style: none;
        display: flex;
        background: rgb(48, 48, 48);
    }
  
    ul li a,
    ul li {
        cursor: pointer;
        font-size: 20px;
        text-decoration: none;
    }
  
    ul li {
        display: block;
        z-index: 10;
    }
  
    ul li a {
        padding: 15px 25px;
        background: rgb(48, 48, 48);
        color: #fff;
        display: block;
    }
  
    li a:hover {
        background-color: #ccc3;
        color: #111;
    }
  
    ul li ul {
        background: #555;
        padding-left: 5px;
        position: absolute;
        width: 10em;
        display: none;
    }
  
    li ul li a {
        padding: 10px;
        background: #555;
        color: #fff;
    }
  
    li ul li a:hover {
        background: #555;
    }
  
    ul li ul li {
        position: relative;
    }
  
    ul li ul li ul {
        position: absolute;
        top: 5px;
        left: 100%;
    }
  
    li:hover > ul,
    li:active > ul {
        display: block;
    }
  
    .dropdown {
        position: relative;
    }
  
    .dropdown > a,
    .dropdown > a:hover,
    .dropdown.active > a,
    .dropdown.active > a:hover {
        background: url("https://i.postimg.cc/y8b7mfcJ/arrow.png");
        background-position: right;
        background-size: 15px;
        background-repeat: no-repeat;
        color: #fff;
    }
  
    @media screen and (max-width: 768px) {
        .mobile-nav {
            display: flex;
        }
  
        ul.nav {
            visibility: hidden;
            transform: translateY(-120%);
            opacity: 0;
            transition: 0.5s ease-in-out;
        }
    
        ul.nav.toggle {
            visibility: visible;
            transform: translateY(0);
            opacity: 1;
        }
    
        ul {
            flex-direction: column;
        }
        ul li {
            overflow: hidden;
            border: none;
        }
    
        ul li ul {
            position: relative;
            width: 90%;
            padding: 0 5%;
            transform: translateX(-100%);
            display: block;
            visibility: hidden;
            height: 0;
            overflow: hidden;
            transition: transform 400ms ease;
        }
    
        ul li ul li ul {
            position: initial;
            background: #555;
            top: 0;
            width: 96%;
            padding: 0 2%;
        }
            li:hover > ul,
            li:active > ul {
            display: block;
        }
    
        li.active > ul{
            transform: translateX(0);
            visibility: visible;
            height: 100%;
        }
    
        .dropdown > a,
        .dropdown > a:hover,
        .dropdown.active > a,
        .dropdown.active > a:hover {
            background-position: 95% 50%;
        }
    }
`;

class mojeMenu extends HTMLElement{
    constructor(){
        super();
        this.attachShadow({mode: "open"});
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }
    connectedCallback(){
        var dropdowns = [];
        var menu = this.shadowRoot.querySelector("ul.nav");
        for (var i = 0; i < menuData.menu.length; i++) {
            var menuElement = document.createElement("li");

            var menuLink = document.createElement("a");
            menuLink.setAttribute("href", menuData.menu[i].uri);
            menuLink.textContent += menuData.menu[i].title;
            menuLink.setAttribute("title", menuData.menu[i].title);
            menuElement.appendChild(menuLink);
            if(typeof menuData.menu[i].submenu != 'undefined'){
                menuElement.classList.add("dropdown");
                dropdowns.push(menuLink);
                var subMenu = document.createElement("ul");
                for(var j = 0; j < menuData.menu[i].submenu.length; j++){
                    var subMenuElement = document.createElement("li");

                    var subMenuLink = document.createElement("a");
                    subMenuLink.setAttribute("href", menuData.menu[i].submenu[j].uri);
                    subMenuLink.textContent += menuData.menu[i].submenu[j].title;
                    subMenuLink.setAttribute("title", menuData.menu[i].submenu[j].title);
                    subMenuElement.appendChild(subMenuLink);
                    if(typeof menuData.menu[i].submenu[j].submenu != 'undefined'){
                        subMenuElement.classList.add("dropdown");
                        dropdowns.push(subMenuLink);
                        var subSubMenu = document.createElement("ul");
                        for(var k = 0; k < menuData.menu[i].submenu[j].submenu.length; k++){
                            var subSubMenuElement = document.createElement("li");
                            var subSubMenuLink = document.createElement("a");
                            subSubMenuLink.setAttribute("href", menuData.menu[i].submenu[j].submenu[k].uri);
                            subSubMenuLink.textContent += menuData.menu[i].submenu[j].submenu[k].title;
                            subSubMenuLink.setAttribute("title", menuData.menu[i].submenu[j].submenu[k].title);
                            subSubMenuElement.appendChild(subSubMenuLink);
                            subSubMenu.appendChild(subSubMenuElement);
                        }
                        subMenuElement.appendChild(subSubMenu);
                    }
                    subMenu.appendChild(subMenuElement);
                }
                menuElement.appendChild(subMenu);
            }
            menu.appendChild(menuElement);
        }
        var btn = this.shadowRoot.querySelector('.nav-btn');
        var nav = this.shadowRoot.querySelector('ul.nav');
        if(btn){
            btn.addEventListener('click', e=>{
                nav.classList.toggle('toggle');
            })
        }
        dropdowns.forEach((element) =>{
            element.addEventListener('click', e=>{
                if (window.innerWidth < 768) {
                e.target.parentElement.classList.toggle("active");  
                }
            })
        })
    }
}
window.customElements.define("menu-komponent", mojeMenu);