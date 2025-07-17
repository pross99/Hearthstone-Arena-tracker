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
    background-color:rgb(76, 86, 111);
    border-color: #1E90AA;
    border-bottom-width: 500px;
    width: 100%;
    position: fixed;
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
    border-radius: 25px;
    
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
  background-image: radial-gradient(100% 100% at 100% 0, rgb(0,0,0) 0, rgb(151,101,36) 100%);
  border: 0;
  border-radius: 6px;
  box-shadow: rgba(45, 35, 66, .4) 0 2px 4px,rgba(45, 35, 66, .3) 0 7px 13px -3px,rgba(58, 65, 111, .5) 0 -3px 0 inset;
  box-sizing: border-box;
  color: gray;
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
     box-shadow: rgb(151,101,36) 0 3px 7px inset;
  transform: translateY(2px);
  color: white;
} 


.active {
  align-items: center;
  appearance: none;
  background-image: radial-gradient(100% 100% at 100% 0, rgb(76,86,111) 0, rgb(151,101,36) 100%);
  border: 0;
  border-radius: 6px;
  box-shadow: rgba(45, 35, 66, .4) 0 2px 4px,rgba(45, 35, 66, .3) 0 7px 13px -3px,rgba(58, 65, 111, .5) 0 -3px 0 inset;
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
  box-shadow: rgb(151,101,36) 0 0 0 1.5px inset, rgba(45, 35, 66, .4) 0 2px 4px, rgba(45, 35, 66, .3) 0 7px 13px -3px, #3c4fe0 0 -3px 0 inset;
}

.active:hover {
  box-shadow: rgba(45, 35, 66, .4) 0 4px 8px, rgba(45, 35, 66, .3) 0 7px 13px -3px, rgb(151,101,36) 0 -3px 0 inset;
  transform: translateY(-2px);
}

.active:active {
  box-shadow: rgb(151,101,36) 0 3px 7px inset;
  transform: translateY(2px);
}
</style>