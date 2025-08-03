<script>
import { defineProps, defineEmits } from 'vue';

export default {
    props: {
        isOpen: Boolean,
        initialData: Object, // new Prop for passing initial data
        item: []
    },
    emits: ["close", "submit", "update-item", "add"],
    data() {
        return {
            
            formData: { ...this.initialData}, // Clone InitialData into local state
            showModal: false
        }
    },
    watch: {
        // Watch for changes to initialData and update formData
        initialData: {
            handler(newData) {
                this.formData = {...newData};
            },
            deep: true, // Enables deep reactivity tracking
            immediate: true
        }
    },
    methods: {
        close() {
            this.$emit("close")
        },
        submitForm() {
            this.$emit("submit", this.formData);
            this.close; //

        }
    }

};

</script>

<template>
    <div v-if="isOpen" class="m-overlay" @click.self="close">
        <div class="m-content">
            <button class="m-close" @click="close"> X</button>
            <slot></slot>
            <form @submit.prevent="submitForm">
             
                <label>
                    Class:
                    <select v-model="formData.classId">
                        <option label="Death Knight" value="1"></option>
                        <option label="Demon Hunter" value="2"></option>
                        <option label="Druid" value="3"></option>
                        <option label="Hunter" value="4"></option>
                        <option label="Mage" value="5"></option>
                        <option label="Paladin" value="6"></option>
                        <option label="Priest" value="7"></option>
                        <option label="Rouge" value="8"></option>
                        <option label="Shaman" value="9"></option>
                        <option label="Warlock" value="10"></option>
                        <option label="Warrior" value="11"></option>
                        
                    </select>
                </label>

                <label>
                    Wins:
                    <input type="number" v-model="formData.placement"
                    :placeholder="initialData.placement || '0 to 12'"
                    />
                </label>

                
                <label>
                    Legendary Bucket:
                    <input v-model="formData.legendaryBracket" 
                    :placeholder="initialData.legendaryBracket || 'Input your first legendary picked'"
                    ></input>
                </label>
                <label>
                    Price Winnings:
                    <input v-model="formData.priceWinnings" 
                    :placeholder="initialData.priceWinnings || 'Gold won'"
                    ></input>
                </label>

                 <label>
                    Note About run:
                    <input v-model="formData.note" 
                    :placeholder="initialData.note || 'Any notes for this run?'"
                    ></input>
                </label>

              

                <button type="submit">Save Changes</button>
            </form>
        </div>
    </div>
</template>

<style scoped>
.m-overlay {
    position: fixed;
    z-index: 100;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.9);
    display: flex;
    justify-content: center;
    align-items: center;

}

.m-content {
    background-color: rgb(251, 251, 251);
    padding: 20px;
    border-radius: 8px;
    min-width: 300px;
    position: relative;
    width: 800px;
}

.m-close {
    position: absolute;
    top: 10px;
    right: 10px;
    background: none;
    border: none;
    font-size: 18px;
    cursor: pointer;
    color: red;
}


form {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: 15px;
}

input, textarea {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 5px;
}

button[type="submit"] {
    background-color: #0056b3;
    color: white;
    border: none;
    padding: 10px;
    cursor: pointer;
    border-radius: 5px;
}

button[type="submit"]:hover {
    background-color: #0056b3;
}

</style>