<template>
    <v-dialog v-model="display" class="task-dialog" width="500px" @click:outside="exit">
        <v-card class="dialog__card">
            <div class=" welcome">
                Welcome
            </div>
            <div class="body">
                Tasker is a tool for organization. Everything you need or have to do is a task or made of them so let's keep this in mind.
            </div>
            <ul>
                <li>My Vault saves every task you want to achieve sometime</li>
                <li>Today's list have the tasks you added from My vault in it. You have to finish them today!</li>
                <li>You can create specific vaults about whatever, for example: "College tasks"</li>
            </ul>
            <v-divider style="margin: 0"></v-divider>
            <v-card-actions class="dialog__footer">
                <div class="dialog__button">
                    <a @click="exit()">Let's start!</a>
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