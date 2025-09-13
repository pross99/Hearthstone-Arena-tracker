<script setup>
import { defineProps, ref, computed, defineEmits } from 'vue';
import axios from 'axios'
import Modal from './Modal.vue'
import { useToast } from 'vue-toastification';

const props = defineProps({
    run: Object,
});


const emit = defineEmits(['update'])
//reactive state for modal visibility
const showModal = ref(false)
const showToast = useToast()
const handleFormSubmit = async (formData) => {

    if (!props.run || !props.run._id) {
        console.error("Where is the ID")
        console.log(props.run)
        return;
    }


    const updateRun = {
        id: props.run._id,
        classId: Number(formData.classId),
        placement: formData.placement,
        legendaryBracket: formData.legendaryBracket,
        priceWinnings: formData.priceWinnings,
        note: formData.note
    }
    try {
        console.log(updateRun)
        const response = await axios.put(`https://hs-arena-tracker-backend.onrender.com/api/runs/${props.run._id}`, updateRun)
        console.log(response)
        showToast.success("Listing updated successfully")
        emit('update', props.run.id, updateRun)
        showModal.value = false;

    } catch (error) {
        console.log("ERROR", error)
        showToast.error("Error updating listing")
    }
}



function checkScore() {
    const result = props.run.placement >= 7;
    return result

}

const goodScore = computed(() => {
    return props.run.placement > 7
})



const truncateNote = computed(() => {

    return props.run.note.length > 25
    ? props.run.note.substring(0, 25) + "..."
    : props.run.note
})

const truncateLegendaryBucket = computed(() => {
    return props.run.legendaryBracket.length > 25
    ? props.run.legendaryBracket.substring(0, 25) + "..."
    : props.run.legendaryBracket
})

</script>

<template>

    <div class="tas">

        <div class="tas-container" :class="props.run.classId === 1
                ? 'c-warrior'
                : props.run.classId === 2
                    ? 'c-warlock'
                    : props.run.classId === 3
                        ? 'c-rouge'
                        : props.run.classId === 4
                            ? 'c-druid'
                            : props.run.classId === 5
                                ? 'c-mage'
                                : props.run.classId === 6
                                    ? 'c-hunter'
                                    : props.run.classId === 7
                                        ? 'c-shaman'
                                        : props.run.classId === 8
                                            ? 'c-dh'
                                            : props.run.classId === 9
                                                ? 'c-dk'
                                                : props.run.classId === 10
                                                    ? 'c-priest'
                                                    : props.run.classId === 11
                                                        ? 'c-paladin'
                                                        : errorClass">

            <div class="tas-header" :class="props.run.classId === 1
                    ? 'h-warrior'
                    : props.run.classId === 2
                        ? 'h-warlock'
                        : props.run.classId === 3
                            ? 'h-rouge'
                            : props.run.classId === 4
                                ? 'h-druid'
                                : props.run.classId === 5
                                    ? 'h-mage'
                                    : props.run.classId === 6
                                        ? 'h-hunter'
                                        : props.run.classId === 7
                                            ? 'h-shaman'
                                            : props.run.classId === 8
                                                ? 'h-dh'
                                                : props.run.classId === 9
                                                    ? 'h-dk'
                                                    : props.run.classId === 10
                                                        ? 'h-priest'
                                                        : props.run.classId === 11
                                                            ? 'h-paladin'
                                                            : errorClass">
            </div>

            <div class="tas-text-note">
                    <p>
                        <fa icon="note-sticky" /> {{truncateNote}}
                    </p>
                    <p>
                        <fa icon="coins" /> {{ run.priceWinnings }}
                    </p>
                    <p>
                        <fa icon="skull" /> {{ truncateLegendaryBucket }}
                    </p>

            </div>
            <div class="tas-image-container">
            </div>
            <div :class="{ 'tas-run-wrapper-high': !goodScore, 'tas-run-wrapper-low': goodScore }"
                @click="showModal = true">


                <h5 :class="{ 'tas-high': goodScore, 'tas-low': !goodScore }">
                    Score: {{ run.placement }}-3

                </h5>


            </div>
            <Modal :isOpen="showModal" @close="showModal = false" @submit="handleFormSubmit" :initialData="run">
            </Modal>
        </div>
    </div>

</template>


<style lang="scss" src="../assets/runListing.scss"></style>