<script>


export default {
    props: {
        isOpen: Boolean,
        initialData: Object // new Prop for passing initial tattooo data
    },
    emits: ["close", "submit"],
    data() {
        return {
            
            formData: { ...this.initialData} // Clone InitialData into local state
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
                    Name:
                    <input type="text" v-model="formData.title"
                    />
                </label>

                <label>
                    Placement:
                    <input type="text" v-model="formData.placement"
                    />
                </label>

                 <label>
                    Theme:
                    <input v-model="formData.note" 
                   
                    ></input>
                </label>

                <label>
                    Price Estimate:
                    <input v-model="formData.priceGuess" 
                    :placeholder="initialData.priceGuess"
                    ></input>
                </label>


                <label>
                    ImageLink:
                    <input  v-model="formData.imageLink"
                    ></input>
                </label>

                <label>
                    Note:
                    <textarea v-model="formData.note" ></textarea>
                </label>

              

                <button type="submit">Submit</button>
            </form>
        </div>
    </div>
</template>

<style scoped>
.m-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
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
}

.m-close {
    position: absolute;
    top: 10px;
    right: 10px;
    background: none;
    border: none;
    font-size: 18px;
    cursor: pointer;
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
    background-color: #C4D9FF;
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