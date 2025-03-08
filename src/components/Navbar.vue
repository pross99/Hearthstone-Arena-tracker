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
                            <RouterLink to="/" :class="[isActive('/') ? 'active' : 'notActive']">
                                Home
                            </RouterLink>
                            <RouterLink to="/test" :class="[isActive('/test') ? 'active' : 'notActive']">
                                Testing Page
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
    background-color: rgb(251, 251, 251);
    border-color: #1E90AA;
    border-bottom-width: 500px;
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    border-radius: 10px;
    z-index: 99;
    
}
.navbar {
    margin-left: auto;
    margin-right: 87%;
    max-width: 80rem;
    padding-left: 8px;
    padding-right: 8px;
    border-radius: 25px;
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
    margin-right: 1.5rem;
    align-items:flex-start;
}

.navbarLogo:hover {
    background-color: rgba(173, 216, 230, 0.6);
    border-radius: 15px;
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
    margin-left: 0.8rem;
    padding-left: 10px;
}





.active {
    background-color:rgb(196, 217, 255);
    width: 300px;
    border-radius: 50px;
    text-align: center;
    color: black;
    padding-right: 8px;

    
}
.active:hover {
    background-color: rgba(196, 217, 255, 0.6);
    border-radius: 5px;
    color: black;
    
}

.notActive {
    background-color: rgba(251, 251, 251, 0.2);
    border-radius: 5px;
    width: 300px;
}
</style>