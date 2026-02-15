class Character {
    constructor(name){
        this.name = name;
        this.level = 1;
        this.xp = 0;
        this.totalXP = 0;
    }

    xpToNext(){
        return this.level * 100;
    }

    addExperience(amount){
        this.xp += amount;
        this.totalXP += amount;
        if(this.xp >= this.xpToNext()){
            this.xp -= this.xpToNext();
            this.level++;
            alert("Уровень повышен!");
        }
        Storage.saveCharacter(this);
    }
}
