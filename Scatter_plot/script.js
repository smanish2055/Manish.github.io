
const container = document.getElementById("container");
class scatter{

    constructor(x, y) {

        this.x = x;
        this.y = y;   
        this.circle();
        
    }

    circle() {
        const c = document.createElement('div');
      
        c.className= "circle";
     
        c.style.top = this.x + "px";
        c.style.left = this.y + "px";

        
    
        container.appendChild(c);




        
    }
}


const obj = [
    {

    x: 100,
    y:200
    },
        {

    x: 50,
    y:200
},
    {

    x: 70,
    y:110
},
    {

    x: 130,
    y:160
    },
        {

    x: 200,
    y:200
},

]


obj.forEach((value) => {
new scatter(value.x, value.y);
    
})

