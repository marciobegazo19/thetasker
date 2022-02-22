<template>
    <div class="main">
        <div class="card">
            <div class="card__header">
                <h3>My Vault</h3>
            </div>
            <div class="menu">
                <div>
                    <a class="menu__item new" @click="newtask()">NEW TASK</a>
                    <v-icon color="#FDCF12">mdi-plus</v-icon>
                </div>
                <div>
                    <a class="menu__item clean" @click="newvault()">New vault</a>
                    <v-icon>mdi-folder-plus</v-icon>
                </div>
                <div>
                    <a class="menu__item clean" @click="cleanAll()">Clean all</a>
                    <v-icon>mdi-delete</v-icon>
                </div>
            </div>
            <div class="card__body">
                <div class="task" v-for="task in this.backlog" :key="task.text">
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
        <dialognewvault :displayNewTask="this.dialog3" v-on:displayDialogNewTask="incomeDialogvault"></dialognewvault>
    </div>
</template>

<script>
    import dialogdescription from '/src/components/dialog_task-description/task_description'
    import dialognewtask from '/src/components/dialog_new-task/new-task'
    import dialognewvault from '/src/components/dialog_new-vault/new-vault'
export default {
    name: 'my-vault',
    components: {
        dialogdescription,
        dialognewtask,
        dialognewvault
    },
    data(){
        return{
            dialog:false,
            dialog2:false,
            dialog3:false,
            text:undefined,
            chosenTask:undefined,
            sign:"vault",
            backlog:[],
        }
    },
    methods:{
        incomeDialog(dialog){
            this.dialog2=dialog
        },
        incomeDialogvault(dialog){
            this.dialog3=dialog
        },
        incomeDialogNewTask(dialog){
            this.dialog=dialog
            let db = JSON.parse(localStorage.getItem('backlog'))
            if(db==null){
                this.backlog=[]
            }else{
                this.backlog=db
            }
        },
        openDescription(task){
            this.dialog2=true
            this.chosenTask=task
            this.sign="vault"
        }
        ,newtask(){
            this.dialog=true

        },
        newvault(){
            this.dialog3=true

        },
        deleteTask(text){
            for (let i=0;i<this.backlog.length;i++){
                if(this.backlog[i].text==text){
                    this.backlog.splice(i,1)
                }
            }
            localStorage.setItem("backlog", JSON.stringify(this.backlog));
        },
        cleanAll(){
            this.backlog=[]
            localStorage.setItem("backlog", JSON.stringify(this.backlog));
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
        let db = JSON.parse(localStorage.getItem('backlog'))
        if(db==null){
            this.backlog=[]
        }else{
            this.backlog=db
        }

    },
}
</script>

<style src="./style.scss" lang="scss" scoped>
</style>
