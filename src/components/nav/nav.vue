<template>
    <div class="nav-container" >
        <nav class="navbar">
            <div class="container-fluid">
                <div class="navbar__title">
                    <a class="navbar__brand">Tasker</a>
                </div>
                <div class="menu">
                    <a class="menu__item" @click="navigateHome()" >Home</a>
                    <a class="menu__item" @click="navigateVault()">My Vault</a>
                </div>
            </div>
            <dialogwelcome :display="this.dialog"  v-on:displayWelcome="incomeDialog"></dialogwelcome>
        </nav>
    </div>
</template>

<script>
    import dialogwelcome from '../dialog_welcome/welcome.vue'
    export default {
        name: "nav",
        components:{
            dialogwelcome,
        },
        data:()=>({
            dialog:undefined,

        }),
        methods:{
            navigateHome(){
                this.$router.push("/home")
            },
            navigateVault(){
                this.$router.push("/myvault")
            },
            incomeDialog(dialog){
                this.dialog=dialog
            },
        },
        created(){
            let backlog = JSON.parse(localStorage.getItem('backlog'))
                if(backlog==null){
                    backlog=[]
                    this.dialog=true
                }else{
                    this.dialog=false
                }
        }
    }
</script>

<style src="./style.scss" lang="scss" scoped>


</style>
