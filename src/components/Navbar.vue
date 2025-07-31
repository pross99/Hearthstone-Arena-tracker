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
                        <svg viewBox="0 0 500 500">
                            <path id="curve" d="M 100,250 A 200,200 0 0,1 400,250" fill="transparent"/> <!-- Command M 100,250, moved the point (100,250) The command A 200,200 0 0,1 400, 250 draws an arc from (100,250) to (400,250) with a radius of 200 units, creating a semi-circle -->
                              <text>
                                <textPath href="#curve" startOffset="50%" fill="#eaebca">
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

<style>
.nav {
    position: fixed;
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
    margin-top: 78px;
    width: 100%;
    height: 100%;
    display: block;
}
text {
     font-size: 40px;
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