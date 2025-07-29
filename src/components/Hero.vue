<script setup>



defineProps({
    title: {
        type: String,
        default: 'Add your wanted Arena runs',
    },
    subtitle: {
        type: String, 
        default: 'Unsure how Hearthstone Arena works?'
    },

    paragraph: {
        type:String,
        default: 'Show rules or write a longer para'
    }
})
</script>

<template>
    <section class="h-section banner banner-section">
       
        <div class="h-whitespace">
        </div>
        <div class="h-container-wrapper">
           
        <div class="h-container banner-column">

            <img src="/images/Arena.webp">
            <div class="h-wrapper">
                <h1 class="heading-xl">
                    {{ title }}
                </h1>
                <p class="heading-xl" id="heading-gray">
                    {{ subtitle }}
                </p>
                <p class="paragraph">
                 <pre>  {{ paragraph }}</pre> 
                </p>
            </div>
        </div>
        </div>

        <div class="h-whitespace"></div>
    </section>
</template>

<style>
#logo {
    opacity: 0.5;
}
.h-section{
    display: flex;
    justify-content: center;
    padding-top: 1rem;
   padding-bottom: 10px;
   width: 100vw;
   margin-top:80px;
   margin-bottom: 100px;
   height: 545px;
   

}
.h-container-wrapper {
    margin-top: 80px;
    border-radius: 20px;
    background-position: left 10px;
    background-size: 80%;
    display: flex;
    flex: 2;
    justify-content: center;
    background-color: var(--secondary-color);
    
   
}


#heading-gray {
    text-align: center;
    color: var(--main-color);
    margin: auto;
    background-color: var(--secondary-color);
    width: 380px;
}

.h-container{
display: flex; 
padding-left: 1rem;
padding-right: 1rem; 
flex-direction: column; 
border-radius: 20px;
align-items: center; 
 max-width: 80rem; 
}

.h-whitespace{
    height: 545px;
    background-color: white;
    border: solid white 1px;
    width: 20%;
}


.paragraph{
   text-wrap: balance;
    width: auto;
    background-color: var(--third-color);
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 10px;
   border-radius: 20px;
   padding-bottom: 8px;
}






</style>