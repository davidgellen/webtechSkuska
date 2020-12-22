const template = document.createElement('template1');
template.innerHTML = 
`   
    <div id="history">

        <p>História prehliadania:</p>
        <span id="crumbs"><span>

        <style>
            
            p{
                float:left;
                margin:0%;
                font-weight: bold;
            }
            span{
                color: black;
                font-weight: bold;
                margin-top: 15%;
                margin-left:1%;
                   
            }

            
            
            
        </style>
    </div>
`;


class BreadCrumbs extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    connectedCallback() {
        
        var pathArray=[];
        if(sessionStorage.getItem("first")!=undefined){
            pathArray[0]=sessionStorage.getItem("first");
        }
        if(sessionStorage.getItem("second")!=undefined){
            pathArray[1]=sessionStorage.getItem("second");
        }
        if(sessionStorage.getItem("third")!=undefined){
            pathArray[2]=sessionStorage.getItem("third");
        }
        if(sessionStorage.getItem("fourth")!=undefined){
            pathArray[3]=sessionStorage.getItem("fourth");
        }
        if(sessionStorage.getItem("fifth")!=undefined){
            pathArray[4]=sessionStorage.getItem("fifth");
        }

        

       /* var url=window.location.href;
        url=url.split('/');
        var j=0;
        while(url[j]!=undefined){
            j++;
        }
        */
        /*var finalUrl;
        url=url[j-1];
        url=url.split('.')
        finalUrl=url[0];    // nazov stranky ziskany z url bez rozsirenia(tzn. ,ze bolo odstranene ".html")
        if(pathArray[0]!=finalUrl){
            for(var i=4;i>0;i--){
                pathArray[i]=pathArray[i-1];
                
            }
        }
        */
        if(pathArray[0]!=document.title){
            for(var i=4;i>0;i--){
                pathArray[i]=pathArray[i-1];

            }
        }
        pathArray[0]= document.title;

        sessionStorage.setItem("first",pathArray[0]);
        sessionStorage.setItem("second",pathArray[1]);
        sessionStorage.setItem("third",pathArray[2]);
        sessionStorage.setItem("fourth",pathArray[3]);
        sessionStorage.setItem("fifth",pathArray[4]);

        
        for(var k=4;k>=0;k--){
            if(pathArray[k]!="undefined" && pathArray[k]!=undefined ){
               
                this.shadowRoot.getElementById('crumbs').innerHTML=this.shadowRoot.getElementById('crumbs').innerHTML + pathArray[k] ;
                if(k!=0){
                    this.shadowRoot.getElementById('crumbs').innerHTML=this.shadowRoot.getElementById('crumbs').innerHTML+"->";
                }
            } 
        }
        
    }
}
window.customElements.define('set-breadcrumbs', BreadCrumbs);

