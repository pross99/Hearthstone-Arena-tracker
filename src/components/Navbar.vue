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
    background-color: rgb(221,193,82);
    border-color: #1E90AA;
    width: 100%;
    top: 0;
    left: 0;
    z-index: 99;
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
    font-size: 1.4rem;
    line-height: 1;
    white-space: nowrap;
    font-weight: 700;
    color: white;
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
    
    font-size: 1rem;
    font-weight: 600;
    text-decoration: none;
    transition: background-color 0.3s, color 0.3s;
    height: 2.5rem
}



.notActive {
  align-items: center;
  appearance: none;
  background-image: radial-gradient(1% 1% at 10% 0, rgb(221,193,82) 0, rgb(84,53,26) 100%);
  border: 0;
  border-radius: 6px;
  box-sizing: border-box;
  color: rgb(201, 201, 201);
  cursor: pointer;
  display: inline-flex;
  font-family: "JetBrains Mono",monospace;
  height: 48px;
  justify-content: center;
  line-height: 1;
  list-style: none;
  overflow: hidden;
  padding-left: 16px;
  padding-right: 16px;
  position: relative;
  text-align: left;
  text-decoration: none;
  transition: box-shadow .15s,transform .15s;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  white-space: nowrap;
  will-change: box-shadow,transform;
  font-size: 18px;
}

.notActive:hover {
    box-shadow: rgb(221,193,82) 0 4px 8px, rgb(221,193,82) 0 7px 13px -3px, rgb(151,101,36) 0 -3px 0 inset;
    transform: translateY(-0.5px);
    color: #fff;
} 


.active {
  align-items: center;
  appearance: none;
  background-image: radial-gradient(1% 1% at 10% 0, rgb(221,193,82) 0, rgb(84,53,26) 100%);
  border: 0;
  border-radius: 6px;
  box-sizing: border-box;
  color: #fff;
  cursor: pointer;
  display: inline-flex;
  font-family: "JetBrains Mono",monospace;
  height: 48px;
  justify-content: center;
  list-style: none;
  overflow: hidden;
  padding-left: 16px;
  padding-right: 16px;
  position: relative;
  text-align: left;
  text-decoration: none;
  transition: box-shadow .15s,transform .15s;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  white-space: nowrap;
  will-change: box-shadow,transform;
  font-size: 18px;
}

.active:focus {

}

.active:hover {
  box-shadow: rgb(221,193,82) 0 4px 8px, rgb(221,193,82) 0 7px 13px -3px, rgb(151,101,36) 0 -3px 0 inset;
  transform: translateY(-0.5px);
}
</style>