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
        <div class="h-container-wrapper">
           
        <div class="h-container banner-column">

            <img src="/images/Arena.webp" id="spin-img">
            <div class="h-wrapper">
                <h1 class="heading-xl">
                    {{ title }}
                </h1>
                <h2 class="paragraph" id="heading-gray">
                    {{ subtitle }}
                </h2>
                <p class="paragraph">
                 <pre>  {{ paragraph }}</pre> 
                </p>
            </div>
        </div>
        
        </div>
        <div class="empty-div"></div>
    </section>
</template>

<style>

#logo {
    opacity: 0.5;
}
.h-section{
    background-image: url("/images/maik-jonietz-22W93iChREU-unsplash.jpg");
    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;
    display: flex;
    flex: 2;
    justify-content: space-between;
   width: 100vw;
   margin-bottom: 100px;
   height: 615px;

}
.h-container-wrapper {
    display: flex;
    justify-content: center;
    background-color: rgba(234, 235, 202, 0.6);
    padding-top: 80px;
    background: repeating-linear-gradient(
  45deg,
  var(--third-color), 10px,
  var(--third-color) 0px,
  rgba(0,0,0,0) 1125px,
  rgba(0,0,0,0) 0px
);
width: 50%;

height: 87%;
    

}
.h-container-wrapper img:hover {
    
   scale: 1.01; 
   
}

.heading-xl {
    color: white;
}


#heading-gray {
    text-align: center;
    color: white;
    padding: 8px;
    margin: auto;
   font-size: 19px;
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

/* .h-whitespace{
    height: 545px;
    background-color: white;
    border: solid white 1px;
    width: 20%;
} */


.paragraph{
   text-wrap: balance;
    width: auto;
   border-radius: 20px;
   padding-bottom: 8px;
    color: white;
    font-size: 14px;
    text-align: center;
}

#spin-img  {
    -webkit-animation: spin 3s;
}

@-webkit-keyframes spin {
	0%  {-webkit-transform: rotate(0deg);}
	100% {-webkit-transform: rotate(360deg);}	
}


</style>