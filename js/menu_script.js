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

(function () {
    function menuElem(obj, el) {
        for (var i = 0; i < obj.length; i++) {

            var menuElement = document.createElement("li");
            el.appendChild(menuElement);

            var menuLink = document.createElement("a");
            menuLink.setAttribute("href", obj[i].uri);
            menuLink.setAttribute("title", obj[i].title);

            /*var arrow = document.createElement("div");
            arrow.className = 'arrow';
            arrow.innerHTML = '>';*/

            var title = document.createElement("div");
            title.className = 'title';
            title.innerHTML = obj[i].title;

            menuLink.appendChild(title);

            if (typeof obj[i].submenu != 'undefined') {
                menuLink.className = 'subMenuLink';
                //menuLink.appendChild(arrow);
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

            /*for (var i = 0; i < links.length; i++) {
                links[i].style.color = "#A36220";
            };*/

            this.style.color = "#DBC195";

            this.properties.subMenuEl.innerHTML = "";
            this.properties.menuEl.appendChild(this.properties.subMenuEl);
            menuElem(this.properties.submenu, this.properties.subMenuEl);
        });

    };

    return menuElem(menuData.menu, document.getElementById("menu"));

})();

/*const template = document.createElement("template");
template.innerHTML = `
<div id="container">
        <ul id="menu" class="menu"></ul>
    </div>
`;

class mojeMenu extends HTMLElement{
    constructor(){
        super();
        this.attachShadow({mode: "open"});
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }
    connectedCallback(){
        var getMenuItem = function (itemData) {
            var item = $("<li>")
                .append(
            $("<a>", {
                href: itemData.link,
                html: itemData.name
            }));
            if (itemData.sub) {
                var subList = $("<ul>");
                $.each(itemData.sub, function () {
                    subList.append(getMenuItem(this));
                });
                item.append(subList);
            }
            return item;
        };
        
        var $menu = this.shadowRoot.querySelector("#menu");
        $.each(data.menu, function () {
            $menu.append(
                getMenuItem(this)
            );
        });
        $menu.menu();
    }
}
window.customElements.define("menu-komponent", mojeMenu);*/