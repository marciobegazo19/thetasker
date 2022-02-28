import vault from '/src/components/vaults/vaults';
<template>

    <v-dialog v-model="displayNewTask" class="task-dialog" width="500px" @click:outside="exit">
        <v-card class="dialog__card">
            <v-card-title class="text-h5 dialog__title">
                New task
            </v-card-title>
            <v-card-text class="dialog__body">
                <input id="task-input" type="text" class="dialog__input"  v-model="text" v-on:keyup.enter="createTask()" >
            </v-card-text>
            <v-divider style="margin: 0"></v-divider>
            <v-card-actions class="dialog__footer">
                <div class="dialog__button">
                    <a @click="createTask()">Yes!</a>
                </div>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
    export default {
        name: "new-task",
        props:{
            displayNewTask: undefined,
            component:undefined
        },
        data(){
            return{
                dialog:false,
                backlog:[],
                text:undefined,
            }
        },
        methods:{
            createTask(){
                var task={
                        text:undefined,
                        description:undefined,
                        notebook:undefined
                    }
                if(this.component==="vault"){
                    let db = JSON.parse(localStorage.getItem('backlog'))
                    if(db==null){
                        this.backlog=[]
                    }else{
                        this.backlog=db
                    }
                    
                    task.text=this.text
                    task.description=""
                    this.backlog.push(task)
                    localStorage.setItem("backlog", JSON.stringify(this.backlog));
                    this.text=""
                    this.$emit('displayDialogNewTask',this.dialog)
                }else{
                    
                    task.text=this.text
                    task.description=""
                    task.notebook=this.$store.state.vault.text
                    this.$store.state.vault.backlog.push(task)
                    this.text=""
                    this.$emit('displayDialogNewTask',this.dialog)
                }


                
            },
            exit(){
                this.$emit('displayDialogNewTask',this.dialog)
                console.log("si")
            }
        },
        updated(){
            document.getElementById("task-input").focus()
            setTimeout(()=>{
                document.getElementById("task-input").focus()
            }, 100)
        },
        created(){


        }
    }
</script>

<style src="./style.scss" lang="scss" scoped>

</style>
