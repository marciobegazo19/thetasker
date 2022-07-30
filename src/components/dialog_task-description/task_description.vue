<template>
    <v-dialog v-model="display" class="task-dialog" width="500px" @click:outside="exit">
        <v-card class="dialog__card">
            <v-card-title class="text-h5 dialog__title">
                Editar descripción
            </v-card-title>
            <v-card-text class="dialog__body">
                <textarea class="dialog__textarea" v-model="task.description"></textarea>
            </v-card-text>
            <v-divider style="margin: 0"></v-divider>
            <v-card-actions class="dialog__footer">
                <div class="dialog__button">
                    <a @click="editDescription()">Hecho</a>
                </div>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
    export default {
        name: 'task-description',
        props:{
            display: undefined,
            task:undefined,
            component:undefined
        },
        data(){
            return{
                dialog:false,
                backlog:[],
                description:undefined
            }
        },
        methods:{
            editDescription(){
                let backlog
                this.description=this.task.description
                if (this.component=="today"){
                    console.log("nica pes1")
                     backlog = JSON.parse(localStorage.getItem('today'))
                    for (let i=0;i<backlog.length;i++){
                        if(backlog[i].text==this.task.text){
                            backlog[i].description=this.description
                        }
                    }
                    localStorage.setItem("today", JSON.stringify(backlog));
                }else if(this.component=="vault"){
                    console.log("nica pes2")
                     backlog = JSON.parse(localStorage.getItem('backlog'))
                    for (let i=0;i<backlog.length;i++){
                        if(backlog[i].text==this.task.text){
                            backlog[i].description=this.description
                        }
                    }
                    localStorage.setItem("backlog", JSON.stringify(backlog));
                }else{
                    console.log("caca")
                   for (let i=0;i<this.$store.state.vault.backlog.length;i++){
                       console.log(i)
                        if(this.$store.state.vault.backlog[i].text==this.task.text){
                            this.$store.state.vault.backlog[i].description=this.description
                        }
                    } 
                    this.save()
                }


                this.$emit('displayDialogEditDescription',this.dialog)
                this.description=""
            },
            exit(){
                this.$emit('displayDialogEditDescription',this.dialog)
            },
            save(){
            let db = JSON.parse(localStorage.getItem('vaults'))
             for( var i = 0; i < db.length; i++){ 
                if ( db[i].text === this.$store.state.vault.text) { 
                    db.splice(i, 1); 
                }
             }
            db.push(this.$store.state.vault)
            localStorage.setItem("vaults", JSON.stringify(db));
            }
        },
        created(){
        }
    }
</script>

<style src="./style.scss" lang="scss" scoped>

</style>
