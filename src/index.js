import * as Vue from 'vue/dist/vue.esm-bundler.js'

const Num = {
    props: ['number'],

    template: `
        <button 
            v-bind:class="getClass(number)"
            v-on:click="click"
        >
            {{ number }}
        </button>
    `,

    methods: {
        click() {
            this.$emit('chosen', this.number)
        },
        getClass(num) {
            return this.isEven(num) ? 'blue' : 'red'
        },
        isEven(num) {
            return num % 2 === 0
        },
    }
}
const app = Vue.createApp({
    components: {
        Num
    },

    template: `
    <num
        v-for="number in numbers"
        v-bind:number="number"
        v-on:chosen="addNumber"
    />

    <hr />
    <h3>History</h3>

    <num
        v-for="number in numberHistory"
        v-bind:number="number"
    />
    `,
    
    data() {
        return {
            numbers: [1,2,3,4,5,6,7,8,9,10],
            numberHistory: []
        }
    },

    computed: {
        evenList() {
            return this.numbers.filter(num => this.isEven(num))
        },
    },

    methods: {
        addNumber(number){
            this.numberHistory.push(number)
        }
    }
})
app.mount("#app")