<template>
    <div class="main">
        <div class="card">
            <div class="card__header">
                <h3>{{this.vault.text}}</h3>
            </div>
            <div class="menu">
                <div>
                    <a class="menu__item new" @click="newtask()">NEW TASK</a>
                    <v-icon color="#0CECDD">mdi-plus</v-icon>
                </div>
                <div>
                    <a class="menu__item clean" @click="cleanAll()">Clean all</a>
                    <v-icon>mdi-delete</v-icon>
                </div>
                <div>
                    <a class="menu__item clean" @click="cleanvault()">Delete vault</a>
                    <v-icon>mdi-delete</v-icon>
                </div>
                
            </div>
            <div class="card__body">
                <div class="task" v-for="task in this.vault.backlog" :key="task">
                    <a class="task__text" @click="openDescription(task)">{{task.text}}</a>
                    <div class="buttons">
                        <a class="task__add menu__item" @click="addToday(task)">
                            <v-icon>mdi-plus-circle</v-icon>
                        </a>
                        <a class="task__delete menu__item" @click="deleteTask(task.text)">
                            <v-icon>mdi-close-circle</v-icon>
                        </a>
                    </div>

                </div>
            </div>
        </div>
        <dialognewtask :displayNewTask="this.dialog" :component="this.sign" v-on:displayDialogNewTask="incomeDialogNewTask"></dialognewtask>
        <dialogdescription :display="this.dialog2" :task="this.chosenTask" :component="this.sign" v-on:displayDialogEditDescription="incomeDialog"></dialogdescription>
    
    </div>
</template>

<script>

    import dialogdescription from '/src/components/dialog_task-description/task_description'
    import dialognewtask from '/src/components/dialog_new-task/new-task'
export default {
    name: 'vault',
    components: {
        dialogdescription,
        dialognewtask,
    },
    data(){
        return{
            dialog:false,
            dialog2:false,
            text:undefined,
            chosenTask:undefined,
            sign:"vaulty",
            backlog:[],
            vault:undefined
        }
    },
    methods:{
        incomeDialog(dialog){
            this.dialog2=dialog
        },
        incomeDialogNewTask(dialog){
            this.dialog=dialog
            this.vault=this.$store.state.vault
            this.save()
        },
        save(){
            let db = JSON.parse(localStorage.getItem('vaults'))
             for( var i = 0; i < db.length; i++){ 
                if ( db[i].text === this.vault.text) { 
                    db.splice(i, 1); 
                }
             }
            db.push(this.vault)
            localStorage.setItem("vaults", JSON.stringify(db));
    
    
        },
        openDescription(task){
            this.dialog2=true
            this.chosenTask=task
            this.sign="vaulty"
        }
        ,newtask(){
            this.dialog=true

        },
        deleteTask(text){
            for (let i=0;i<this.$store.state.vault.backlog.length;i++){
                if(this.$store.state.vault.backlog[i].text==text){
                    this.$store.state.vault.backlog.splice(i,1)
                }
            }
            this.vault=this.$store.state.vault
            this.save()
        },
        cleanAll(){
            let db =[]
            this.$store.state.vault.backlog=db
            this.save()
        },
        cleanvault(){
            let db = JSON.parse(localStorage.getItem('vaults'))
             for( var i = 0; i < db.length; i++){ 
                if ( db[i].text === this.vault.text) { 
                    db.splice(i, 1); 
                }
             }
             localStorage.setItem("vaults", JSON.stringify(db));
             this.$router.push("/home")
        },
        
        addToday(task){
            let today = JSON.parse(localStorage.getItem('today'))
            if(today==null){
                today=[]
            }
            today.push(task)

            localStorage.setItem("today", JSON.stringify(today));
            this.deleteTask(task.text)
        }
    },
        created(){
            this.vault=this.$store.state.vault
        },
    }
</script>

<style src="./style.scss" lang="scss" scoped>


</style> 