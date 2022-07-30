<template>

    <v-dialog v-model="displayNewTask" class="task-dialog" width="500px" @click:outside="exit()">
        <v-card class="dialog__card">
            <v-card-title class="text-h5 dialog__title">
                Nuevo notebook
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
        name: "new-vault",
        props:{
            displayNewTask: undefined,
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
                    backlog:[]
                    }

                    let hay=false
                    let vaults = JSON.parse(localStorage.getItem('vaults'))
                    this.backlog=vaults
                    console.log(vaults)
                    
                    if(vaults.length==0){
                        task.text=this.text
                        this.backlog.push(task)
                        localStorage.setItem("vaults", JSON.stringify(this.backlog));
                        this.text=""
                        this.exit()
                    }else{
                        for(let i=0; i<vaults.length; i++){
                        console.log("for")
                        console.log(this.text+"=="+vaults[i].text)
                        if(this.text == vaults[i].text){
                            hay=true
                        }
                        
                        }
                        if(hay!=true){
                            console.log("tu puta madre")
                            task.text=this.text
                            this.backlog.push(task)
                            localStorage.setItem("vaults", JSON.stringify(this.backlog));
                            this.text=""
                            this.exit()
                        }
                    }

                    
                
                }
            
            },
            exit(){
                this.$emit('displayDialogNewTask',this.dialog)
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