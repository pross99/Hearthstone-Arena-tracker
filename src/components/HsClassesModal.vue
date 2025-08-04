<script>
import {defineProps, ref, computed, watch, onMounted } from 'vue';
import Modal from './Modal.vue'
import {useStore} from 'vuex';
import { useToast } from 'vue-toastification';


const showToast = useToast()

export default {


    props: {
        isOpen: Boolean,
        classes: Object,
		stats: Object
    },
    computed: {
        clsArray() {
            return Object.entries(this.classes).map(([id, data])=> ({
                id,
                ...data
            })).sort((a,b) =>a.className - b.className)
        }
    },
    emits: ["close", "add"],
    data() {
        return {
            showNextModal: false,
			clickCount: 0,
			selectedClass: null,
			sClsRework: {classId:null,className:null}
        }
    },
	components: {
		Modal
	},
    methods: {
		testClick(cls) {
			console.log(cls)
			this.showNextModal= true
			this.selectedClass = cls
			this.sClsRework.classId = this.selectedClass.id
			this.sClsRework.className = this.selectedClass.className
		},
        close() {
            this.$emit("close")
        },
        async handleFormSubmit(formData) {
             try {
        const newRun = await store.dispatch('submitRun', formData);
        this.$emit('add', newRun);
        this.showModal.value = false;
        showToast.success("Listing added successfully");
  } catch (error) {
    showToast.error("Error updating listing", error);
  }
        }
    }

};


</script>

<template>
    <div v-if="isOpen" class="m-overlay" @click.self="close">
        <div class="m-content">
            <button class="m-close" @click="close"> X</button>
			<div class="m-title">
				<h3>
					Pick Your class
				</h3>
			</div>
             <div class="cards">
    <div class="card" v-for="cls in clsArray" :key="cls.id">
      <div class="card-face" @click=testClick(cls)>
		<div class="card-background">
			
				<div class="card-class">
				<div class="card-label">{{ cls.className }}</div>
		</div>
		</div>
		
        
       
      </div>
    </div>
  </div>
  	<Modal 
	:isOpen="showNextModal" 
	@close="showNextModal = false" 
	@submit="handleFormSubmit" 
	:initialData="sClsRework"></Modal>
        </div>
		
    </div>



</template>

<style scoped>



.m-close {
    position: absolute;
    top: 10px;
    right: 10px;
    background: none;
    border: none;
    font-size: 36px;
    cursor: pointer;
    color: red;
}
.m-overlay {
    position: fixed;
    z-index: 99;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;

}

.m-title{
	padding-bottom: 200px;

}


.cards {
	 bottom: 0;
	 display: flex;
	 height: 190px;
	 padding: 0 50px;
	 justify-content: center;
	 position: fixed;
	 left: 0;
	 right: 0;
}
 .card {
	 height: 190px;
	 margin: 0 -15px;
	 position: relative;
	 width: 110px;
	 text-align: left;
}
 .card:after {
	 bottom: 0;
	 left: -60px;
	 position: absolute;
	 right: -60px;
	 top: 0px;
	 z-index: 10;
}
 .card-face {
	 bottom: 0;
	 cursor: pointer;
	 left: 0;
	 position: absolute;
	 right: 0;
	 top: 0;
	 transition: 800ms cubic-bezier(0.19, 1, 0.22, 1) transform;
}

 .card-face:after {
	 animation: none;
	 background: #fff;
	 bottom: 0;
	 content: '';
	 left: 0;
	 opacity: 0;
	 position: absolute;
	 right: 0;
	 top: 0;

}


 .card-bottom {
	 bottom: 0;
	 content: '';
	 left: 0;
	 pointer-events: none;
	 position: absolute;
	 right: 0;
	 transition: 800ms cubic-bezier(0.19, 1, 0.22, 1) transform;
}

 .card-bottom:after {
	 animation: none;
	 bottom: 0;
	 content: '';
	 left: 0;
	 opacity: 0;
	 position: absolute;
	 right: 0;
}



 .card-label {
	 font-size: 24px;
	 font-weight: bold;
	 letter-spacing: -0.025em;
	display: flex;
	justify-content: center;
	padding: 0;
	text-align: center;
	padding-top: 5px;
}

.card-label-bottom {
     text-align: center;
	 font-size: 24px;
	 font-weight: bold;
	 letter-spacing: -0.025em;
	 padding: 15px 0 0 15px;
}
 .card:nth-child(1) .card-face {
	 background: linear-gradient(-135deg, rgba(196, 30, 69, 1), rgb(126, 7, 39));
	 box-shadow: -5px 5px 5px rgba(0, 0, 0, 0.15), inset 0 0 0 2px rgba(196, 30, 69, 0.75);
	 transform: translateY(45px) rotate(-28.125deg);
}
 .card:nth-child(1) .card-face .card-label {
	 color: rgb(104, 1, 1);
	 text-shadow: -0.025em 0.025em 0 rgb(197, 23, 58);
}
 .card:nth-child(1):hover .card-face {
	 box-shadow: 0 10px 20px rgba(0, 0, 0, 0.4), inset 0 0 0 2px rgba(196, 30, 69, 0.75);
	 transform: translateY(-100px) rotate(0deg) scale(2);
	 transition-duration: 0ms;
	 z-index: 5;
}
 .card:nth-child(1):hover .card-face:after {
	 animation: fade 250ms ease-out forwards;
}
 .card:nth-child(1):hover:after {
	 top: -175px;
}
 .card:nth-child(2) .card-face {
	 background: linear-gradient(-135deg, rgba(163, 48, 201, 1), rgb(127, 23, 161));
	 box-shadow: -5px 5px 5px rgba(0, 0, 0, 0.15), inset 0 0 0 2px rgba(163, 48, 201, 0.75);
	 transform: translateY(35px) rotate(-21.875deg);
}
 .card:nth-child(2) .card-face .card-label {
	 color: rgb(104, 3, 138);
	 text-shadow: -0.025em 0.025em 0 rgb(140, 19, 180);
}
 .card:nth-child(2):hover .card-face {
	 box-shadow: 0 10px 20px rgba(0, 0, 0, 0.4), inset 0 0 0 2px rgba(163, 48, 201 0.75);
	 transform: translateY(-100px) rotate(0deg) scale(2);
	 transition-duration: 0ms;
	 z-index: 5;
}
 .card:nth-child(2):hover .card-face:after {
	 animation: fade 250ms ease-out forwards;
}
 .card:nth-child(2):hover:after {
	 top: -175px;
}
 .card:nth-child(3) .card-face {
	 background: linear-gradient(-135deg, rgb(255,125,10), rgb(155, 74, 3));
	 box-shadow: -5px 5px 5px rgba(0, 0, 0, 0.15), inset 0 0 0 2px rgba(255,125,10, 0.75);
	 transform: translateY(25px) rotate(-15.625deg);
}
 .card:nth-child(3) .card-face .card-label {
	 color: rgb(201, 94, 1);
	 text-shadow: -0.025em 0.025em 0 rgb(241, 120, 14);
}
 .card:nth-child(3):hover .card-face {
	 box-shadow: 0 10px 20px rgba(0, 0, 0, 0.4), inset 0 0 0 2px rgba(255,125,10, 0.75);
	 transform: translateY(-100px) rotate(0deg) scale(2);
	 transition-duration: 0ms;
	 z-index: 5;
}
 .card:nth-child(3):hover .card-face:after {
	 animation: fade 250ms ease-out forwards;
}
 .card:nth-child(3):hover:after {
	 top: -175px;
}
 .card:nth-child(4) .card-face {
	 background: linear-gradient(-135deg, rgba(171, 212, 115, 1), rgb(101, 161, 17));
	 box-shadow: -5px 5px 5px rgba(0, 0, 0, 0.15), inset 0 0 0 2px rgba(171, 212, 115, 0.75);
	 transform: translateY(15px) rotate(-9.375deg);
}
 .card:nth-child(4) .card-face .card-label {
	 color: rgb(112, 145, 66);
	 text-shadow: -0.025em 0.025em 0 rgb(81, 109, 41);
}
 .card:nth-child(4):hover .card-face {
	 box-shadow: 0 10px 20px rgba(0, 0, 0, 0.4), inset 0 0 0 2px rgba(171, 212, 115, 0.75);
	 transform: translateY(-100px) rotate(0deg) scale(2);
	 transition-duration: 0ms;
	 z-index: 5;
}
 .card:nth-child(4):hover .card-face:after {
	 animation: fade 250ms ease-out forwards;
}
 .card:nth-child(4):hover:after {
	 top: -175px;
}
 .card:nth-child(5) .card-face {
	 background: linear-gradient(-135deg, rgba(105, 204, 240, 1), rgb(45, 159, 201));
	 box-shadow: -5px 5px 5px rgba(0, 0, 0, 0.15), inset 0 0 0 2px rgba(105, 204, 240, 0.75);
	 transform: translateY(5px) rotate(-3.125deg);
}
 .card:nth-child(5) .card-face .card-label {
	 color: rgb(67, 160, 194);
	 text-shadow: -0.025em 0.025em 0 rgb(32, 118, 150);
}
 .card:nth-child(5):hover .card-face {
	 box-shadow: 0 10px 20px rgba(0, 0, 0, 0.4), inset 0 0 0 2px rgba(153, 194, 255, 0.75);
	 transform: translateY(-100px) rotate(0deg) scale(2);
	 transition-duration: 0ms;
	 z-index: 5;
}
 .card:nth-child(5):hover .card-face:after {
	 animation: fade 250ms ease-out forwards;
}
 .card:nth-child(5):hover:after {
	 top: -175px;
}
 .card:nth-child(6) .card-face {
	 background: linear-gradient(-135deg, rgba(245, 140, 186, 1), rgb(216, 33, 112));
	 box-shadow: -5px 5px 5px rgba(0, 0, 0, 0.15), inset 0 0 0 2px rgba(245, 140, 186, 0.75);
	 transform: translateY(5px) rotate(3.125deg);
}
 .card:nth-child(6) .card-face .card-label {
	 color: rgb(211, 74, 133);
	 text-shadow: -0.025em 0.025em 0 rgb(177, 40, 99);
}
 .card:nth-child(6):hover .card-face {
	 box-shadow: 0 10px 20px rgba(0, 0, 0, 0.4), inset 0 0 0 2px rgba(245, 140, 186, 0.75);
	 transform: translateY(-100px) rotate(0deg) scale(2);
	 transition-duration: 0ms;
	 z-index: 5;
}
 .card:nth-child(6):hover .card-face:after {
	 animation: fade 250ms ease-out forwards;
}
 .card:nth-child(6):hover:after {
	 top: -175px;
}
 .card:nth-child(7) .card-face {
	 background: linear-gradient(-135deg, rgba(255,255,255, 1), rgb(192, 192, 192));
	 box-shadow: -5px 5px 5px rgba(0, 0, 0, 0.15), inset 0 0 0 2px rgba(255,255,255, 0.75);
	 transform: translateY(15px) rotate(9.375deg);
}
 .card:nth-child(7) .card-face .card-label {
	 color: rgb(209, 209, 209);
	 text-shadow: -0.025em 0.025em 0 rgb(175, 175, 175);
}
 .card:nth-child(7):hover .card-face {
	 box-shadow: 0 10px 20px rgba(0, 0, 0, 0.4), inset 0 0 0 2px rgba(255,255,255, 0.75);
	 transform: translateY(-100px) rotate(0deg) scale(2);
	 transition-duration: 0ms;
	 z-index: 5;
}
 .card:nth-child(7):hover .card-face:after {
	 animation: fade 250ms ease-out forwards;
}
 .card:nth-child(7):hover:after {
	 top: -175px;
}
 .card:nth-child(8) .card-face {
	 background: linear-gradient(-135deg, rgba(255, 245, 105, 1), rgb(180, 169, 18));
	 box-shadow: -5px 5px 5px rgba(0, 0, 0, 0.15), inset 0 0 0 2px rgba(255, 245, 105, 0.75);
	 transform: translateY(25px) rotate(15.625deg);
}
 .card:nth-child(8) .card-face .card-label {
	 color: rgb(196, 185, 43);
	 text-shadow: -0.025em 0.025em 0 rgb(199, 188, 35);
}
 .card:nth-child(8):hover .card-face {
	 box-shadow: 0 10px 20px rgba(0, 0, 0, 0.4), inset 0 0 0 2px rgba(255, 245, 105, 0.75);
	 transform: translateY(-100px) rotate(0deg) scale(2);
	 transition-duration: 0ms;
	 z-index: 5;
}
 .card:nth-child(8):hover .card-face:after {
	 animation: fade 250ms ease-out forwards;
}
 .card:nth-child(8):hover:after {
	 top: -175px;
}
 .card:nth-child(9) .card-face {
	 background: linear-gradient(-135deg, rgba(0, 112, 222, 1), rgb(0, 60, 119));
	 box-shadow: -5px 5px 5px rgba(0, 0, 0, 0.15), inset 0 0 0 2px rgba(0, 112, 222, 0.75);
	 transform: translateY(35px) rotate(21.875deg);
}
 .card:nth-child(9) .card-face .card-label {
	 color: rgb(3, 60, 117);
	 text-shadow: -0.025em 0.025em 0 rgb(0, 76, 151);
}
 .card:nth-child(9):hover .card-face {
	 box-shadow: 0 10px 20px rgba(0, 0, 0, 0.4), inset 0 0 0 2px rgba(0, 112, 222, 0.75);
	 transform: translateY(-100px) rotate(0deg) scale(2);
	 transition-duration: 0ms;
	 z-index: 5;
}
 .card:nth-child(9):hover .card-face:after {
	 animation: fade 250ms ease-out forwards;
}
 .card:nth-child(9):hover:after {
	 top: -175px;
}
 .card:nth-child(10) .card-face {
	 background: linear-gradient(-135deg, rgba(148, 130, 201, 1), rgb(58, 20, 172));
	 box-shadow: -5px 5px 5px rgba(0, 0, 0, 0.15), inset 0 0 0 2px rgba(148, 130, 201, 0.75);
	 transform: translateY(45px) rotate(28.125deg);
}
 .card:nth-child(10) .card-face .card-label {
	 color: rgb(95, 67, 180);
	 text-shadow: -0.025em 0.025em 0 rgb(49, 20, 136);
}
 .card:nth-child(10):hover .card-face {
	 box-shadow: 0 10px 20px rgba(0, 0, 0, 0.4), inset 0 0 0 2px rgba(148, 130, 201, 0.75);
	 transform: translateY(-100px) rotate(0deg) scale(2);
	 transition-duration: 0ms;
	 z-index: 5;
}
 .card:nth-child(10):hover .card-face:after {
	 animation: fade 250ms ease-out forwards;
}
 .card:nth-child(10):hover:after {
	 top: -175px;
}

 .card:nth-child(11) .card-face {
	 background: linear-gradient(-135deg, rgba(199, 156, 110, 1), rgb(163, 94, 21));
	 box-shadow: -5px 5px 5px rgba(0, 0, 0, 0.15), inset 0 0 0 2px rgba(199, 156, 110, 0.75);
	 transform: translateY(45px) rotate(28.125deg);
}
 .card:nth-child(11) .card-face .card-label {
	 color: rgb(175, 110, 40);
	 text-shadow: -0.025em 0.025em 0 rgb(156, 95, 29);
}
 .card:nth-child(11):hover .card-face {
	 box-shadow: 0 10px 20px rgba(0, 0, 0, 0.4), inset 0 0 0 2px rgba(199, 156, 110, 0.75);
	 transform: translateY(-100px) rotate(0deg) scale(2);
	 transition-duration: 0ms;
	 z-index: 5;
}
 .card:nth-child(11):hover .card-face:after {
	 animation: fade 250ms ease-out forwards;
}
 .card:nth-child(11):hover:after {
	 top: -175px;
}

.card:nth-child(1) .card-class{
	width: 100%;
	height: 100%;
	   background-image: url("/images/Death_Knight_icon.webp");
    background-repeat: no-repeat;
    background-position: center;
	background-size: 30%;
}

.card:nth-child(2) .card-class{
	width: 100%;
	height: 100%;
	   background-image: url("/images/Demon_Hunter_icon.webp");
    background-repeat: no-repeat;
    background-position: center;
	background-size: 30%;
}


.card:nth-child(3) .card-class{
	width: 100%;
	height: 100%;
	   background-image: url("/images/Druid_icon.webp");
    background-repeat: no-repeat;
    background-position: center;
	background-size: 30%;
}


.card:nth-child(4) .card-class{
	width: 100%;
	height: 100%;
	   background-image: url("/images/Hunter_icon.webp");
    background-repeat: no-repeat;
    background-position: center;
	background-size: 30%;
}


.card:nth-child(5) .card-class{
	width: 100%;
	height: 100%;
	   background-image: url("/images/Mage_icon.webp");
    background-repeat: no-repeat;
    background-position: center;
	background-size: 30%;
}


.card:nth-child(6) .card-class{
	width: 100%;
	height: 100%;
	   background-image: url("/images/Paladin_icon.webp");
    background-repeat: no-repeat;
    background-position: center;
	background-size: 30%;
}


.card:nth-child(7) .card-class{
	width: 100%;
	height: 100%;
	   background-image: url("/images/Priest_icon.webp");
    background-repeat: no-repeat;
    background-position: center;
	background-size: 30%;
}


.card:nth-child(8) .card-class{
	width: 100%;
	height: 100%;
	   background-image: url("/images/Rogue_icon.webp");
    background-repeat: no-repeat;
    background-position: center;
	background-size: 30%;
}



.card:nth-child(9) .card-class{
	width: 100%;
	height: 100%;
	   background-image: url("/images/Shaman_icon.webp");
    background-repeat: no-repeat;
    background-position: center;
	background-size: 30%;
}

.card:nth-child(10) .card-class{
	width: 100%;
	height: 100%;
	   background-image: url("/images/Warlock_icon.webp");
    background-repeat: no-repeat;
    background-position: center;
	background-size: 30%;
}

.card:nth-child(11) .card-class{
	width: 100%;
	height: 100%;
	   background-image: url("/images/Warrior_icon.webp");
    background-repeat: no-repeat;
    background-position: center;
	background-size: 30%;
}

.card-background{
	height: 100%;
	width: 100%;
	background-image: url("/images/hsIconLogo-removebg-preview.png");
	background-size: 80%;
	background-position: center;
	background-repeat: no-repeat;
}

 @keyframes fade {
	 0% {
		 opacity: 0.9;
		 transform: scale(1);
	}
	 100% {
		 opacity: 0;
		 transform: scale(1.15);
	}
}


 

 .s-title {
  color: var(--third-color);
  font-size: 1.5rem;
  margin-bottom: 1rem;
  text-align: center;
}

</style>