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
    position: fixed;
    background-color: var(--secondary-color);
    width: 100%;
    top: 0;
    left: 0;
    z-index: 99;
    margin-bottom: 10px;
    border: solid var(--third-color) 1px;
}
.navbar {
    margin-left: auto;
    margin-right: 87%;
    max-width: 80rem;
    padding-left: 8px;
    padding-right: 8px;
   
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

.navbarLogoTxt {
    line-height: 1;
    white-space: nowrap;
    color: var(--main-color);
    font-size: 36px;
    text-decoration:underline;
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