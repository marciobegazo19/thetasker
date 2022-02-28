<template>
    <div class="main">
        <div class="card">
            <div class="header">
                <div class="header__title">
                    <h3 style="color:white">Notebooks</h3>
                </div>
                
                <div class="header__button">
                    <a class="menu__item clean" @click="newvault()">New notebook</a>
                    <v-icon>mdi-folder-plus</v-icon>
                </div>
            </div>
            <div class="card__body">
                <div class="vault" v-for="vault in vaults" :key="vault">
                    <a class="vault-title"  @click="navigateVault(vault)">{{vault.text}}</a>
                </div>
            </div>
        </div>
        <dialognewvault :displayNewTask="this.dialog3" v-on:displayDialogNewTask="incomeDialogvault"></dialognewvault>
    </div>
</template>

<script>
import dialognewvault from '/src/components/dialog_new-vault/new-vault'
    export default {
        name: "vaults",
        components:{
            dialognewvault,
        },
        data:()=>({
            vaults:[],
            
            dialog3:false,

    }),
        methods:{
            navigateVault(selectedVault){
                this.$store.state.vault=selectedVault
                
            },
            incomeDialogvault(dialog){
                        this.dialog3=dialog
                        let db = JSON.parse(localStorage.getItem('vaults'))
                        if(db==null){
                            this.vaults=[]
                        }else{
                            this.vaults=db
                        }
            },
            newvault(){
            this.dialog3=true

            },
        },
        updated(){
            
        },
        created(){
            let db = JSON.parse(localStorage.getItem('vaults'))
            if(db==null){
                this.vaults=[]
            }else{
                this.vaults=db
            }
        },
    }
</script>

<style src="./style.scss" lang="scss" scoped>


</style>