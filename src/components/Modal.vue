<script>
import { useToast } from 'vue-toastification';
const showToast = useToast()


export default {
    props: {
        isOpen: Boolean,
        initialData: Object, // new Prop for passing initial data
        item: []
    },
    emits: ["close", "submit", "update-item", "add"],
    data() {
        return {

            formData: { ...this.initialData }, // Clone InitialData into local state
            showModal: false,
            errors: [],

        }
    },
    watch: {
        // Watch for changes to initialData and update formData
        initialData: {
            handler(newData) {
                this.formData = { ...newData };
            },
            deep: true, // Enables deep reactivity tracking
            immediate: true
        }
    },
    methods: {
        close() {
            this.$emit("close")
        },
        checkForm(error) {
            console.log(this.formData)
            if (
                (this.formData.priceWinnings || this.initialData.priceWinnings) &&
                (this.formData.legendaryBracket || this.initialData.legendaryBracket) &&
                (this.formData.placement || this.initialData.placement)
            ) {
                console.log("HI");
                this.$emit("submit", this.formData);
                this.close();
            }

            this.errors = [];

            if (!this.formData.priceWinnings || !this.initialData.priceWinnings) {
                this.errors.push('Input your glod won')
            }
            if (!this.formData.placement || !this.initialData.placement) {
                this.errors.push('Input your wins')
            }

            if (!this.formData.legendaryBracket || !this.initialData.legendaryBracket) {
                this.errors.push('Input your drafted legendary')
            }
            if (!this.formData.note && this.initialData.note) {
                this.formData.note = "No note given"
            }

            error.preventDefault();
        },
        submitForm() {

        },
    }
};

</script>

<template>
    <div v-if="isOpen" class="m-overlay" @click.self="close">
        <div class="m-content">
            <button class="m-close" @click="close"> X</button>
            <slot></slot>
            <div class="m-container">
                <div class="m-c-img">
                    <img src="/images/Arena.webp" />
                </div>

                <div class="m-form-c">


                    <form @submit="checkForm" method="post" novalidate="true">

                        <p v-if="errors.length">
                            <b>Please correct the following error(s):</b>
                        <ul>
                            <li v-for="error in errors"> {{ error }}</li>
                        </ul>
                        </p>

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
                                :placeholder="initialData.placement || '0 to 12'" min="0" max="12" />
                        </label>


                        <label>
                            Legendary Bucket:
                            <input type="text" v-model="formData.legendaryBracket"
                                :placeholder="initialData.legendaryBracket || 'Input your first legendary picked'"></input>
                        </label>
                        <label>
                            Price Winnings:
                            <input type="number" v-model="formData.priceWinnings"
                                :placeholder="initialData.priceWinnings || 'Gold won 0-2000'" min="0"
                                max="2000"></input>
                        </label>

                        <label>
                            Note:
                            <input type="text" v-model="formData.note"
                                :placeholder="initialData.note || 'Did you have fun?'"></input>
                        </label>



                        <button type="submit" class="form-btn-submit">Save Changes</button>
                    </form>
                </div>
            </div>

        </div>
    </div>
</template>

<style scoped lang="scss" src="../assets/modal.scss"></style>