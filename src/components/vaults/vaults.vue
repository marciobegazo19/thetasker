<template>
    <div class="main">
        <div class="card">
            <div class="header">
                <div class="header__title">
                    <h3 style="color:white">Notebooks</h3>
                </div>
                
                <div class="header__button">
                    <a class="menu__item clean" @click="newvault()">Nuevo notebook</a>
                    <v-icon>mdi-folder-plus</v-icon>
                </div>
            </div>
            <div class="card__body">
                <div class="vault" v-for="vault in vaults" :key="vault" name="vault">
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
            isSelected:"no",
            dialog3:false,

    }),
        methods:{
            navigateVault(selectedVault){
                this.$store.state.vault=selectedVault
                this.isSelected="si"
                let btn = document.getElementsByName("vault")
                //let btn = document.querySelector('#si')
                console.log(btn)
                console.log(selectedVault.text)
                console.log("selected")
                for(var i=0; i<=btn.length; i++){
                    if(btn[i].outerText==selectedVault.text){
                        btn[i].style.setProperty("background-color", "#F14C86")
                        btn[i].firstChild.style .setProperty("color","#FFF89C")
                    }else{
                        btn[i].style.setProperty("background-color", "#FFF89C")
                        btn[i].firstChild.style .setProperty("color","#B93160")
                    }
                }
                
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
            let btn = document.getElementsByName("vault")
            btn[0].style.setProperty("background-color", "#F14C86")
            btn[0].firstChild.style .setProperty("color","#FFF89C")
        },
        created(){
            let db = JSON.parse(localStorage.getItem('vaults'))
            if(db==null){
                this.vaults=[]
            }else{
                this.vaults=db
            }

            
        },
        mounted(){
            let btn = document.getElementsByName("vault")
            btn[0].style.setProperty("background-color", "#F14C86")
            btn[0].firstChild.style .setProperty("color","#FFF89C")
        }
    }
</script>

<style src="./style.scss" lang="scss" scoped>


</style>