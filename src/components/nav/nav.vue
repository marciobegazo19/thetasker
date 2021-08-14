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
        </nav>
    </div>

</template>

<script>
    export default {
        name: "nav",
        data:()=>({


    }),
        methods:{
            navigateHome(){
                this.$router.push("/home")
            },
            navigateVault(){
                this.$router.push("/myvault")
            }
        }
    }
</script>

<style src="./style.scss" lang="scss" scoped>


</style>
