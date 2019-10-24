<template>
    <div class="pa-md-6">
        <p class="text-center headline">Type your document number here!</p>
        <!-- <v-text-field v-model="number" :label="label" :hint="message" :outlined="true" :solo="true" :persistent-hint="true" ></v-text-field>-->
        <div
            class="v-input theme--light v-text-field v-text-field--single-line v-text-field--solo v-text-field--is-booted v-text-field--enclosed v-text-field--outlined"
        >
            <div class="v-input__control">
                <div class="v-input__slot">
                    <div class="v-text-field__slot">
                        <the-mask
                            class="input-cpf-cnpj"
                            v-model="number"
                            :mask="['###.###.###-##', '##.###.###/####-##']"
                            :masked="true"
                        />
                    </div>
                </div>
                <div class="v-text-field__details">
                    <div class="v-messages theme--light">
                        <div class="v-messages__wrapper">{{ message }}</div>
                    </div>
                </div>
            </div>
        </div>

        <div class="text-center">
            <v-btn
                large
                class="ma-2"
                width="140"
                color="primary"
                dark
                @click="verifyDocument"
                >Verify</v-btn
            >
            <v-btn
                large
                class="ma-2"
                width="140"
                color="success"
                dark
                @click="insertDocument"
                >Insert</v-btn
            >
        </div>
    </div>
</template>

<script>
import validator from '../helpers/Validation.js';
import * as _ from 'lodash';

export default {
    mixins: [validator],
    data: () => ({
        number: '',
        message: ''
    }),

    methods: {
        insertDocument() {
            if (this.verifyDocument()) {
                this.message = 'The document is being inserted...';
                this.$api
                    .post('/documents', {
                        document: this.number,
                        active: true,
                        blacklist: false
                    })
                    .then(result => {
                        alert('The document was successfully added.');
                        this.$emit('documentInserted');
                        console.log('item inserted', result);
                        this.message = '';
                        this.number = '';
                    })
                    .catch(error => {
                        if (error.response && error.response.data.errors) {
                            let text = '';
                            _.forEach(error.response.data.errors, value => {
                                text += ` - ${value}\n`;
                            });
                            alert(
                                `The document was not saved.\nError(s): \n${text}`
                            );
                        } else {
                            console.error('Error inserting document', error);
                        }
                    });
            }
        },

        verifyDocument() {
            let valid = this.checkDocument(this.number);
            if (valid) {
                this.message = 'The document number is valid!';
            } else {
                this.message = 'The number you entered is NOT valid!';
            }
            return valid;
        }
    }
};
</script>

<style scoped>
.input-cpf-cnpj {
    background-color: rgba(0, 0, 0, 0);
    border-bottom-color: rgba(0, 0, 0, 0.87);
    border-bottom-left-radius: 0px;
    border-bottom-right-radius: 0px;
    border-bottom-style: none;
    border-bottom-width: 0px;
    border-image-outset: 0px;
    border-image-repeat: stretch;
    border-image-slice: 100%;
    border-image-source: none;
    border-image-width: 1;
    border-left-color: rgba(0, 0, 0, 0.87);
    border-left-style: none;
    border-left-width: 0px;
    border-right-color: rgba(0, 0, 0, 0.87);
    border-right-style: none;
    border-right-width: 0px;
    border-top-color: rgba(0, 0, 0, 0.87);
    border-top-left-radius: 0px;
    border-top-right-radius: 0px;
    border-top-style: none;
    border-top-width: 0px;
    box-sizing: border-box;
    color: rgba(0, 0, 0, 0.87);
    cursor: text;
    display: block;
    flex-basis: auto;
    flex-grow: 1;
    flex-shrink: 1;
    font-family: Roboto, sans-serif;
    font-size: 16px;
    font-stretch: 100%;
    font-style: normal;
    font-variant-caps: normal;
    font-variant-east-asian: normal;
    font-variant-ligatures: normal;
    font-variant-numeric: normal;
    font-weight: 400;
    height: 32px;
    letter-spacing: normal;
    line-height: 20px;
    margin-bottom: 0px;
    margin-left: 0px;
    margin-right: 0px;
    margin-top: 0px;
    max-height: 32px;
    max-width: 100%;
    min-width: 0px;
    padding-bottom: 8px;
    padding-left: 0px;
    padding-right: 0px;
    padding-top: 8px;
    text-align: start;
    text-indent: 0px;
    text-rendering: auto;
    text-shadow: none;
    text-size-adjust: 100%;
    text-transform: none;
    width: 380px;
    word-spacing: 0px;
    writing-mode: horizontal-tb;
    -webkit-appearance: none;
    -webkit-box-direction: normal;
    -webkit-box-flex: 1;
    -webkit-font-smoothing: antialiased;
    -webkit-rtl-ordering: logical;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}
</style>
