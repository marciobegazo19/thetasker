<template>
    <div class="main">
        <div class="card">
            <div class="header">
                <h3 style="color:white">Vaults</h3>
            </div>
            <div class="card__body">
                <div class="vault" v-for="vault in vaults" :key="vault">
                    <a class="vault-title"  @click="navigateVault(vault)">{{vault.text}}</a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    export default {
        name: "vaults",
        data:()=>({
            vaults:[],

    }),
        methods:{
            navigateVault(selectedVault){
                this.$store.state.vault=selectedVault
                this.$router.push("/vault")
            },
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