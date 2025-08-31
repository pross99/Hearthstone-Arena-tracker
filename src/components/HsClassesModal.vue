<script>
import { defineProps, ref, computed, watch, onMounted } from 'vue';
import Modal from './Modal.vue'
import { useStore } from 'vuex';
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
            return Object.entries(this.classes).map(([id, data]) => ({
                id,
                ...data
            })).sort((a, b) => a.className - b.className)
        }
    },
    emits: ["close", "add", "submit"],
    data() {
        return {
            showNextModal: false,
            showModal: false,
            selectedClass: null,
            sClsRework: { classId: null, className: null }
        }
    },
    components: {
        Modal
    },
    watch: {
        deep: true,
        immediate: true
    },
    methods: {
        testClick(cls) {
            console.log(cls)
            this.showNextModal = true
            this.selectedClass = cls
            this.sClsRework.classId = this.selectedClass.classId
            this.sClsRework.className = this.selectedClass.className
        },
        close() {
            this.$emit("close")
        },
        async handleFormSubmit(formData) {

            try {
                const newRun = await this.$store.dispatch('submitRun', formData);
                this.$emit('add', newRun);

                showToast.success("Listing added successfully");

                this.showNextModal = false;

                this.$emit("close")
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
            <Modal :isOpen="showNextModal" @close="showNextModal = false" @submit="handleFormSubmit"
                :initialData="sClsRework"></Modal>
        </div>

    </div>



</template>

<style scoped lang="scss" src="../assets/hsClassesModal.scss"></style>