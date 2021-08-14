<template>

    <v-dialog v-model="displayNewTask" class="task-dialog" width="500px" @click:outside="exit()">
        <v-card class="dialog__card">
            <v-card-title class="text-h5 dialog__title">
                New vault
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
        name: "new-vault",
        props:{
            displayNewTask: undefined,
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
                let db = JSON.parse(localStorage.getItem('vaults'))
                if(db==null){
                    this.backlog=[]
                }else{
                    this.backlog=db
                }
                var task={
                    text:undefined,
                    backlog:[]
                }
                task.text=this.text
                this.backlog.push(task)
                localStorage.setItem("vaults", JSON.stringify(this.backlog));
                this.text=""
                this.exit()
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