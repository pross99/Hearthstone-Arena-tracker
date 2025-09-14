<script setup>
import { RouterLink, useRoute } from 'vue-router'
import { ref } from 'vue';


const route = useRoute()
const isMenuOpen = ref(false)

const isActive = (routePath) => {
    return route.path === routePath
}

const toggleMenu = () => {
    isMenuOpen.value = !isMenuOpen.value
}


const closeMenu = () => {
    isMenuOpen.value = false
}


</script>

<template>
    <nav class="nav">
        <div class="navbar">
            <div class="navbarContainer">
                <div class="navbarItems">
                    <!--Logo-->
                    <RouterLink class="navbarLogo" to="/">
                        <div class="navbarLogoTxt">
                            <svg viewBox="0 0 300 70" xmlns="http://www.w3.org/2000/svg">
                                <!-- arc -->
                                <path id="curve" d="M 20,80 A 130,40 0 0,1 280,80" fill="transparent" />
                                <text>
                                    <textPath href="#curve" startOffset="50%" fill="#eaebca" text-anchor="middle">
                                        Arena Tracker
                                    </textPath>
                                </text>
                            </svg>
                        </div>
                    </RouterLink>


                    <!-- Desktop -->
                    <div class="navbarMenu" :class="{'menuOpen': isMenuOpen}">
                        <button @click="closeMenu">
                            <RouterLink to="/" :class="[isActive('/') ? 'active' : 'notActive']">
                                Home
                            </RouterLink>
                        </button>

                        <button @click="closeMenu">
                            <RouterLink to="/Rules" :class="[isActive('/Rules') ? 'active' : 'notActive']">
                                Arena Rules
                            </RouterLink>
                        </button>
                    </div>

                     <!-- Mobile  -->
                        <button class="hamburgerBtn" @click="toggleMenu" :class="{'open': isMenuOpen}"> 
                            <span></span>
                            <span></span>
                            <span></span>
                        </button>
                    
                </div>
            </div>
        </div>
    </nav>
</template>

<style lang="scss" src="../assets/navigation.scss"></style>