import vault from '/src/components/vaults/vaults';
<template>

    <v-dialog v-model="displayNewTask" class="task-dialog" width="500px" @click:outside="exit">
        <v-card class="dialog__card">
            <v-card-title class="text-h5 dialog__title">
                Nueva tarea
            </v-card-title>
            <v-card-text class="dialog__body">
                <input id="task-input" type="text" class="dialog__input"  v-model="text" v-on:keyup.enter="createTask()" >
            </v-card-text>
            <v-divider style="margin: 0"></v-divider>
            <v-card-actions class="dialog__footer">
                <div class="dialog__button">
                    <a @click="createTask()">Hecho</a>
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
                text:"",
            }
        },
        methods:{
            createTask(){
                if(this.text.length>0){
                    var task={
                        text:undefined,
                        description:undefined,
                        notebook:undefined
                    }
                    let hay=false
                    let vault = this.$store.state.vault
                    console.log(vault)
                    
                    if(vault.backlog.length==0){
                        task.text=this.text
                        task.description=""
                        task.notebook=this.$store.state.vault.text
                        this.$store.state.vault.backlog.push(task)
                        this.text=""
                        this.$emit('displayDialogNewTask',this.dialog)
                    }else{
                        for(let i=0; i<vault.backlog.length; i++){
                        console.log("for")
                        console.log(this.text+"=="+vault.backlog[i].text)
                        if(this.text == vault.backlog[i].text){
                            hay=true
                        }
                        
                        }
                        if(hay!=true){
                            console.log("tu puta madre")
                            task.text=this.text
                            task.description=""
                            task.notebook=this.$store.state.vault.text
                            this.$store.state.vault.backlog.push(task)
                            this.text=""
                            this.$emit('displayDialogNewTask',this.dialog)
                        }
                    }

                    
                
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
