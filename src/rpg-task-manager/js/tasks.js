class Task {
    constructor(title, desc, diff, xp){
        this.id = Date.now();
        this.title = title;
        this.desc = desc;
        this.diff = diff;
        this.xp = xp;
        this.done = false;
    }
}

class TaskManager {
    constructor(){
        this.tasks = Storage.loadTasks();
    }

    add(task){
        this.tasks.push(task);
        this.save();
    }

    toggle(id){
        const t = this.tasks.find(t=>t.id==id);
        t.done = !t.done;
        this.save();
        return t;
    }

    remove(id){
        this.tasks = this.tasks.filter(t=>t.id!=id);
        this.save();
    }

    save(){
        Storage.saveTasks(this.tasks);
    }
}
