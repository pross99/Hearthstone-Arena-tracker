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
                    <div class="navbarLogoTxt">
                        <svg viewBox="0 0 300 70" xmlns="http://www.w3.org/2000/svg">
  <!-- A wide, gently curved arc -->
  <path id="curve" d="M 20,80 A 130,40 0 0,1 280,80" fill="transparent"/>
  
  <text>
    <textPath href="#curve" startOffset="50%" fill="#eaebca" text-anchor="middle">
      Arena Tracker
    </textPath>
  </text>
</svg>

                    </div> 
                    
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

<style scoped>
.nav {
    position: absolute;
    background-color: rgba(0, 0, 0, 0);
    width: 100%;
    top: 0;
    left: 0;
    z-index: 99;
    border: solid var(--third-color) 1px;
    border-left: 0px;
    border-top: 0px;
    border-right: 0px;
}
.navbar {
    margin-left: auto;
    margin-right: 87%;
    max-width: 80rem;
    padding-left: 8px;
    padding-right: 8px;
}

svg{
    width: 100%;
    height: 100%;
    display: block;
}
text {
     font-size: 32px;
    text-anchor: middle;
    
}

.navbarContainer {
    display: flex;
    align-items: center;
    height: 5rem;
    width: 95vw;


}
.navbarItems {
    display: flex;
    flex: 1;
    justify-content: space-between;
    border-radius: 20px;
    margin-left: 20px;
    padding-left: 20px;
    height: 80px;
  
}

.navbarLogo {
    display: flex;
    margin-right: 1.5rem;
    align-items: center;
}



.navbarMenu {
    display: flex;

    align-items: center;
    gap: 20px;
    padding-left: 10px;
    width: auto;
}



.notActive {
  align-items: center;
  appearance: none;
  background-color: var(--third-color);
  color: var(--secondary-color);
  border: 0;
  border-radius: 6px;
  box-sizing: border-box;
  cursor: pointer;
  display: inline-flex;
  height: 48px;
  justify-content: center;
  list-style: none;
  overflow: hidden;
  padding-left: 16px;
  padding-right: 16px;
}

.notActive:hover {
    scale: 1.1;
} 


.active {
  align-items: center;
  appearance: none;
  background-color: var(--third-color);
  color: white;
  border: 0;
  border-radius: 6px;
  box-sizing: border-box;
  cursor: pointer;
  display: inline-flex;
  height: 48px;
  justify-content: center;
  list-style: none;
  overflow: hidden;
  padding-left: 16px;
  padding-right: 16px;
}

.active:hover {
  scale: 1.1;
}
</style>