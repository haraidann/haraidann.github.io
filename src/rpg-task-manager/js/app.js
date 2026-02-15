let char = Storage.loadCharacter();
if(!char){
    const name = prompt("Имя героя:");
    char = new Character(name);
    Storage.saveCharacter(char);
}else{
    char = Object.assign(new Character(), char);
}

const tasks = new TaskManager();

function render(){
    charName.innerText = "Герой: " + char.name;
    level.innerText = "Level " + char.level;
    xpText.innerText = `${char.xp} / ${char.xpToNext()} XP`;
    xpFill.style.width = (char.xp/char.xpToNext()*100)+"%";

    taskList.innerHTML="";
    let done=0;
    tasks.tasks.forEach(t=>{
        const li = document.createElement("li");
        li.className = t.done?"completed":"";
        li.innerHTML = `
            <span>${t.title} (+${t.xp} XP)</span>
            <input type="checkbox" ${t.done?"checked":""}>
            <button>❌</button>
        `;

        li.querySelector("input").onclick=()=>{
            const task = tasks.toggle(t.id);
            if(task.done) char.addExperience(task.xp);
            render();
        };

        li.querySelector("button").onclick=()=>{
            tasks.remove(t.id);
            render();
        };

        if(t.done) done++;
        taskList.appendChild(li);
    });

    doneCount.innerText = done;
    totalXP.innerText = char.totalXP;
}

addBtn.onclick = ()=>{
    const diffMap = {easy:10, medium:25, hard:50, epic:100};
    const diff = taskDifficulty.value;
    const task = new Task(taskTitle.value, taskDesc.value, diff, diffMap[diff]);
    tasks.add(task);
    taskTitle.value="";
    taskDesc.value="";
    render();
};

reset.onclick = ()=>{ if(confirm("Сбросить?")) Storage.reset(); }

render();
