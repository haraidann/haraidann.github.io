const Storage = {
    saveCharacter(c){
        localStorage.setItem("character", JSON.stringify(c));
    },
    loadCharacter(){
        return JSON.parse(localStorage.getItem("character"));
    },
    saveTasks(t){
        localStorage.setItem("tasks", JSON.stringify(t));
    },
    loadTasks(){
        return JSON.parse(localStorage.getItem("tasks")) || [];
    },
    reset(){
        localStorage.clear();
        location.reload();
    }
}
