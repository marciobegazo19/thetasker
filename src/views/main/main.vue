<template>
    <div class="main">
        <div class="card">
            <div class="card__header">
                <h3>Tareas del día</h3>
            </div>
            <div id="empty-message">
                {{this.notasks}}
            </div>
            <div class="card__body">
                <div class="task" v-for="task in today" :key="task">
                    <a class="task__text" @click="openDescription(task)">{{task.text}}</a>
                    <div class="buttons">
                        <a class="task__done menu__item" @click="doneTask(task.text)">
                            <v-icon>mdi-check-bold</v-icon>
                        </a>
                        <a class="task__delete menu__item" @click="removeTask(task)">
                            <v-icon>mdi-minus-circle</v-icon>
                        </a>
                    </div>

                </div>
            </div>
        </div>
        <dialogdescription :display="this.dialog2" :task="this.chosenTask" :component="this.sign" v-on:displayDialogEditDescription="incomeDialog"></dialogdescription>
    </div>
</template>

<script>
    import dialogdescription from '/src/components/dialog_task-description/task_description'
    export default {
        name: 'main',
        components: {
            dialogdescription,},
        data(){
            return{
                dialog:false,
                today:[],
                dialog2:false,
                chosenTask:undefined,
                sign:"today",
                notasks:"¡Has terminado todo por hoy! ...o quizás aún no has comenzado.",
            }
        },
        methods:{
            incomeDialog(dialog){
                this.dialog2=dialog
            },
            openDescription(task){
                this.dialog2=true
                this.chosenTask=task
                this.sign="today"
            },
            removeTask(task){
                let backlog = JSON.parse(localStorage.getItem('vaults'))
                for(let i=0;i<backlog.length;i++){
                    if(backlog[i].text==task.notebook){
                        backlog[i].backlog.push(task)
                        this.$store.state.vault=backlog[i]
                    }
                }
                localStorage.setItem("vaults", JSON.stringify(backlog));
                this.doneTask(task.text)
                
            },
            doneTask(text){ 
                for (let i=0;i<this.today.length;i++){
                    if(this.today[i].text==text){
                        this.today.splice(i,1)
                    }
                }
                localStorage.setItem("today", JSON.stringify(this.today));
            }
        },
        created(){
            let db = JSON.parse(localStorage.getItem('today'))
            if(db==null){
                this.today=[]
            }else{
                this.today=db
            }
            let notes=JSON.parse(localStorage.getItem('vaults'))
            if(notes==null){
                notes=[]
                var task={
                text:"undefined",
                backlog:[]
            }
                var tasky={
                        text:"Tengo que añadir una nueva tarea",
                        description:"¡Esta es mi primera tarea!",
                        notebook:"My notebook"
                    }
                
                task.text="Mi primer notebook"
                task.backlog.push(tasky)
                notes.push(task)
                localStorage.setItem("vaults", JSON.stringify(notes));
                
            }
            let vaults = JSON.parse(localStorage.getItem('vaults'))
            this.$store.state.vault=vaults[0]
            
        },
        mounted(){
            if(this.today.length==0){
                document.getElementById("empty-message").style.visibility='visible';
                document.getElementById("empty-message").style.paddingBottom='100px';
                document.getElementById("empty-message").style.paddingTop='100px';
            }
        },
        updated(){
            if(this.today.length==0){
                document.getElementById("empty-message").style.visibility='visible';
                document.getElementById("empty-message").style.paddingBottom='100px';
                document.getElementById("empty-message").style.paddingTop='100px';
            }
        },
    }
</script>

<style src="./style.scss" lang="scss" scoped>
</style>
