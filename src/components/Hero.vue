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
        type: String,
        default: 'Show rules or write a longer para'
    }
})
</script>

<template>
    <section class="h-section banner banner-section ">
        <div class="h-container-wrapper">

            <div class="h-container banner-column">
                <img src="/images/Arena.webp" id="spin-img">
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
        <div class="empty-div">

        </div>
    </section>
</template>

<style lang="scss" src="../assets/hero.scss"></style>