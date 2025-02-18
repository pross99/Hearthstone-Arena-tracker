<script setup>
import {RouterLink, useRoute} from 'vue-router'
import logo from '../../images/477324.png'


const isActive = (routePath) => {
    const route = useRoute();

    return route.path === routePath
}

</script>

<template>
    <nav class="nav">
        <div class="navbar">
            <div class="navbarContainer">
                <div class="navbarItems">
                    <!--Logo-->
                    <RouterLink class="navbarLogo" to="/">
                        <img class="navbarLogoImg" :src="logo">
                    <span class="navbarLogoTxt"> Tattoos</span>
                    </RouterLink>
                    
                    <div class="">
                        <div class="navbarMenu">
                            <RouterLink to="/" :class="[isActive('/') ? active : notActive]">
                                Home
                            </RouterLink>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </nav>
</template>

<style>
.nav {
    background-color: #1E90FF;
    border-color: #1E90AA;
    border-bottom-width: 500px;
    position: fixed;
    top: 0;
    left: 0;
}
.navbar {
    margin-left: auto;
    margin-right: auto;
    max-width: 80rem;
    padding-left: 8px;
    padding-right: 8px
}

.navbarContainer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 5rem;

}

.navbarItems {
    display: flex;
    flex: 110%;
    justify-content: center;
    align-items: center;
}

.navbarLogo {
    display: flex;
    margin-right: 1rem;
    align-items: center;
}

.navbarLogoImg {
    width: auto;
    height: 2.5rem;
}

.navbarLogoTxt {
    display: none;
    margin-left: 0.5rem;
    font-size: 1.4rem;
    line-height: 2rem;
    font-weight: 700rem;
    color: #ffffff;
}

.navbarMenu {
    display: flex;
    margin-left: 0.5rem;
}





.active {
    background-color: gray;
}
.notActive {
    background-color: aliceblue;
}
</style>