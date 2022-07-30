<template>
    <v-dialog v-model="display" class="task-dialog" width="500px" @click:outside="exit">
        <v-card class="dialog__card">
            <div class=" welcome">
                ¡Bienvenido!
            </div>
            <div class="body">
                Tasker es una herramienta de organización. Todo lo que debes o necesitas hacer es una tarea, ten eso en cuenta.
            </div>
            <ul>
                <li>En Notebooks podrás crear notebooks para anotar tareas y organizarte libremente.</li>
                <li>En Lista diaria verás las tareas que añadiste de algún notebook y completarás hoy ¡Debes terminar antes que acabe el día!</li>
                <li>Puedes crear notebooks con temáticas, por ejemplo: "Universidad" u "Hogar".</li>
                <li>Puedes añadir descripciones a tus tareas haciendo click en ellas.</li>
            </ul>
            <v-divider style="margin: 0"></v-divider>
            <v-card-actions class="dialog__footer">
                <div class="dialog__button">
                    <a @click="exit()">Empecemos</a>
                </div>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>
<script>
    export default {
        name: 'task-welcome',
        props:{
            display: undefined,
        },
        data(){
            return{
                dialog:false,
            }
        },
        methods:{
            exit(){
                this.$emit('displayWelcome',this.dialog)
            },
        },
        created(){
        }
    }
</script>

<style src="./style.scss" lang="scss" scoped>

</style>