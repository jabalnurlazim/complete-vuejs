<template>
    <form @submit.prevent="submit">
        <my-input 
            name="Username"
            :rules="{ required: true, min: 5 }"
            :value="username.value"
            :error="username.error"
            @update="update"
        />
        <my-input 
            name="Password"
            :rules="{ required: true, min: 12 }"
            :value="password.value"
            :error="password.error"
            type="password"
            @update="update"
        />
        <my-button 
            background="grey"
            color="white"
            :disabled="!valid"
        />
    </form>
</template>

<script>
    import MyButton from './MyButton.vue'
    import MyInput from './MyInput.vue'

    export default  {
        components: {
            MyButton,
            MyInput
        },

        data() {
            return {
                username: {
                    value: '',
                    error: ''
                },
                password: {
                    value: '',
                    error: ''
                }
            }
        },

        computed: {
            valid() {
                return (
                    !this.username.error &&
                    !this.password.error
                )
            }
        },  

        methods: {
            submit($event) {
                console.log('Event')
            },

            update({ name, value, error}) {
                this[name].value = value
                this[name].error = error
            }
        }
    }
</script>

<style  scoped>

</style>