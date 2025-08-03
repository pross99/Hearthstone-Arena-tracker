<script>
import {defineProps, ref, computed, watch, onMounted } from 'vue';
import Modal from './Modal.vue'
import {useStore} from 'vuex';

export default {
    props: {
        isOpen: Boolean,
        classes: Object
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
    showToast.error("Error updating listing");
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
        <div class="card-label">{{ showNextModal }}</div>
       
      </div>
      <div class="card-bottom">
       <div class="card-label">{{ cls.className }}</div>
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
	 margin: 0 -25px;
	 position: relative;
	 width: 100px;
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
	 background: #fff;
	 bottom: 0;
	 content: '';
	 left: 0;
	 opacity: 0;
	 position: absolute;
	 right: 0;
}



 .card-label {
    text-align: center;
	 font-size: 24px;
	 font-weight: bold;
	 letter-spacing: -0.025em;
	 padding: 15px 0 0 15px;
}

.card-label-bottom {
     text-align: center;
	 font-size: 24px;
	 font-weight: bold;
	 letter-spacing: -0.025em;
	 padding: 15px 0 0 15px;
}
 .card:nth-child(1) .card-face {
	 background: linear-gradient(-135deg, rgba(255, 153, 153, 1), rgba(218, 11, 11, 1));
	 box-shadow: -5px 5px 5px rgba(0, 0, 0, 0.15), inset 0 0 0 2px rgba(255, 153, 153, 0.75);
	 transform: translateY(45px) rotate(-28.125deg);
}
 .card:nth-child(1) .card-face .card-label {
	 color: rgba(219, 0, 0, 1);
	 text-shadow: -0.025em 0.025em 0 rgba(255, 128, 128, 1);
}
 .card:nth-child(1):hover .card-face {
	 box-shadow: 0 10px 20px rgba(0, 0, 0, 0.4), inset 0 0 0 2px rgba(255, 153, 153, 0.75);
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
	 background: linear-gradient(-135deg, rgba(255, 153, 214, 1), rgba(218, 11, 135, 1));
	 box-shadow: -5px 5px 5px rgba(0, 0, 0, 0.15), inset 0 0 0 2px rgba(255, 153, 214, 0.75);
	 transform: translateY(35px) rotate(-21.875deg);
}
 .card:nth-child(2) .card-face .card-label {
	 color: rgba(219, 0, 132, 1);
	 text-shadow: -0.025em 0.025em 0 rgba(255, 128, 204, 1);
}
 .card:nth-child(2):hover .card-face {
	 box-shadow: 0 10px 20px rgba(0, 0, 0, 0.4), inset 0 0 0 2px rgba(255, 153, 214, 0.75);
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
	 background: linear-gradient(-135deg, rgba(235, 153, 255, 1), rgba(177, 11, 218, 1));
	 box-shadow: -5px 5px 5px rgba(0, 0, 0, 0.15), inset 0 0 0 2px rgba(235, 153, 255, 0.75);
	 transform: translateY(25px) rotate(-15.625deg);
}
 .card:nth-child(3) .card-face .card-label {
	 color: rgba(175, 0, 219, 1);
	 text-shadow: -0.025em 0.025em 0 rgba(230, 128, 255, 1);
}
 .card:nth-child(3):hover .card-face {
	 box-shadow: 0 10px 20px rgba(0, 0, 0, 0.4), inset 0 0 0 2px rgba(235, 153, 255, 0.75);
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
	 background: linear-gradient(-135deg, rgba(173, 153, 255, 1), rgba(53, 11, 218, 1));
	 box-shadow: -5px 5px 5px rgba(0, 0, 0, 0.15), inset 0 0 0 2px rgba(173, 153, 255, 0.75);
	 transform: translateY(15px) rotate(-9.375deg);
}
 .card:nth-child(4) .card-face .card-label {
	 color: rgba(44, 0, 219, 1);
	 text-shadow: -0.025em 0.025em 0 rgba(153, 128, 255, 1);
}
 .card:nth-child(4):hover .card-face {
	 box-shadow: 0 10px 20px rgba(0, 0, 0, 0.4), inset 0 0 0 2px rgba(173, 153, 255, 0.75);
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
	 background: linear-gradient(-135deg, rgba(153, 194, 255, 1), rgba(11, 94, 218, 1));
	 box-shadow: -5px 5px 5px rgba(0, 0, 0, 0.15), inset 0 0 0 2px rgba(153, 194, 255, 0.75);
	 transform: translateY(5px) rotate(-3.125deg);
}
 .card:nth-child(5) .card-face .card-label {
	 color: rgba(0, 88, 219, 1);
	 text-shadow: -0.025em 0.025em 0 rgba(128, 179, 255, 1);
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
	 background: linear-gradient(-135deg, rgba(153, 255, 255, 1), rgba(11, 218, 218, 1));
	 box-shadow: -5px 5px 5px rgba(0, 0, 0, 0.15), inset 0 0 0 2px rgba(153, 255, 255, 0.75);
	 transform: translateY(5px) rotate(3.125deg);
}
 .card:nth-child(6) .card-face .card-label {
	 color: rgba(0, 219, 219, 1);
	 text-shadow: -0.025em 0.025em 0 rgba(128, 255, 255, 1);
}
 .card:nth-child(6):hover .card-face {
	 box-shadow: 0 10px 20px rgba(0, 0, 0, 0.4), inset 0 0 0 2px rgba(153, 255, 255, 0.75);
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
	 background: linear-gradient(-135deg, rgba(153, 255, 194, 1), rgba(11, 218, 94, 1));
	 box-shadow: -5px 5px 5px rgba(0, 0, 0, 0.15), inset 0 0 0 2px rgba(153, 255, 194, 0.75);
	 transform: translateY(15px) rotate(9.375deg);
}
 .card:nth-child(7) .card-face .card-label {
	 color: rgba(0, 219, 88, 1);
	 text-shadow: -0.025em 0.025em 0 rgba(128, 255, 179, 1);
}
 .card:nth-child(7):hover .card-face {
	 box-shadow: 0 10px 20px rgba(0, 0, 0, 0.4), inset 0 0 0 2px rgba(153, 255, 194, 0.75);
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
	 background: linear-gradient(-135deg, rgba(173, 255, 153, 1), rgba(53, 218, 11, 1));
	 box-shadow: -5px 5px 5px rgba(0, 0, 0, 0.15), inset 0 0 0 2px rgba(173, 255, 153, 0.75);
	 transform: translateY(25px) rotate(15.625deg);
}
 .card:nth-child(8) .card-face .card-label {
	 color: rgba(44, 219, 0, 1);
	 text-shadow: -0.025em 0.025em 0 rgba(153, 255, 128, 1);
}
 .card:nth-child(8):hover .card-face {
	 box-shadow: 0 10px 20px rgba(0, 0, 0, 0.4), inset 0 0 0 2px rgba(173, 255, 153, 0.75);
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
	 background: linear-gradient(-135deg, rgba(235, 255, 153, 1), rgba(177, 218, 11, 1));
	 box-shadow: -5px 5px 5px rgba(0, 0, 0, 0.15), inset 0 0 0 2px rgba(235, 255, 153, 0.75);
	 transform: translateY(35px) rotate(21.875deg);
}
 .card:nth-child(9) .card-face .card-label {
	 color: rgba(175, 219, 0, 1);
	 text-shadow: -0.025em 0.025em 0 rgba(230, 255, 128, 1);
}
 .card:nth-child(9):hover .card-face {
	 box-shadow: 0 10px 20px rgba(0, 0, 0, 0.4), inset 0 0 0 2px rgba(235, 255, 153, 0.75);
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
	 background: linear-gradient(-135deg, rgba(255, 214, 153, 1), rgba(218, 135, 11, 1));
	 box-shadow: -5px 5px 5px rgba(0, 0, 0, 0.15), inset 0 0 0 2px rgba(255, 214, 153, 0.75);
	 transform: translateY(45px) rotate(28.125deg);
}
 .card:nth-child(10) .card-face .card-label {
	 color: rgba(219, 132, 0, 1);
	 text-shadow: -0.025em 0.025em 0 rgba(255, 204, 128, 1);
}
 .card:nth-child(10):hover .card-face {
	 box-shadow: 0 10px 20px rgba(0, 0, 0, 0.4), inset 0 0 0 2px rgba(255, 214, 153, 0.75);
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
	 background: linear-gradient(-135deg, rgba(255, 214, 153, 1), rgba(218, 135, 11, 1));
	 box-shadow: -5px 5px 5px rgba(0, 0, 0, 0.15), inset 0 0 0 2px rgba(255, 214, 153, 0.75);
	 transform: translateY(45px) rotate(28.125deg);
}
 .card:nth-child(11) .card-face .card-label {
	 color: rgba(219, 132, 0, 1);
	 text-shadow: -0.025em 0.025em 0 rgba(255, 204, 128, 1);
}
 .card:nth-child(11):hover .card-face {
	 box-shadow: 0 10px 20px rgba(0, 0, 0, 0.4), inset 0 0 0 2px rgba(255, 214, 153, 0.75);
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

</style>