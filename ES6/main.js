class List {
    constructor() {
        this.data = [];
    }

    add(data) {
        this.data.push(data);
        console.log(this.data);
    }
}

class TodoList extends List {

    constructor(){
        super();
        this.user = "Rick"; 
    }

    mostraUser(){
        console.log(this.user);
    }
}

/*const minhaTodo = new TodoList();
document.getElementById("novoTodo").onclick = function(){
    minhaTodo.add("Novo todo");
}*/

const array = [1,2,3,4,5,6,7,8,9,10];

const newArray = array.map((item) => item * 2);

console.log(newArray);

const teste = () => ({ nome: "Rick", idade: 18 });

console.log(teste());