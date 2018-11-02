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


const minhaTodo = new TodoList();
document.getElementById("novoTodo").onclick = function(){
    minhaTodo.add("Novo todo");
}

minhaTodo.mostraUser();