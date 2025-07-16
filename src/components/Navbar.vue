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
                        
                    <span class="navbarLogoTxt"> Arena tracker</span>
                    </RouterLink>
                    
                    
                        <div class="navbarMenu">
                            <RouterLink to="/" :class="[isActive('/') ? 'active' : 'notActive']">
                                Home
                            </RouterLink>
                            <RouterLink to="/Rules" :class="[isActive('/Rules') ? 'active' : 'notActive']">
                                Arena Rules
                            </RouterLink>
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
    background-image: url('/images/key.png');
    background-repeat: repeat;
    background-size: 30px;
    background-position: center;
    background-color: rgba(196, 217, 255, 0.5);
    
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
    flex: 1;
    gap: 50px;
    flex: 430%;
    align-items: center;
    justify-content: space-between;
    background-color: rgba(173, 216, 230, 0.9);
}

.navbarLogo {
    display: flex;
    margin-right: 1.5rem;
    align-items: center;
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
    font-size: 1.4rem;
    line-height: 1;
    white-space: nowrap;
    font-weight: 700;
    color: black
}

.navbarMenu {
    display: flex;

    align-items: center;
    gap: 20px;
    padding-left: 10px;
    width: auto;
}

.navbarMenu a {
      display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.5rem 1.5rem;
    white-space: nowrap;
    border-radius: 25px;
    font-size: 1rem;
    font-weight: 600;
    text-decoration: none;
    transition: background-color 0.3s, color 0.3s;
    height: 2.5rem
}





.active {
    color: blue
}
.active:hover {
    background-color: rgba(173, 216, 230, 0.9);
    color: black;
    
}

.notActive {
    background-color: transparent;
    color: black;
}

.notActive:hover {
    background-color: rgba(173, 216, 230, 0.5);
    color: black;
}
</style>