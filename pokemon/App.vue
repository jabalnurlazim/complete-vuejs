<template>
    <pokemon-cards
        :pokemons="pokemons"
        @chosen="fetchEvolutions"
        :selectedId="selectedId"
    />
    <pokemon-cards :pokemons="evolutions" />
</template>

<script>
    import PokemonCards from './PokemonCards.vue'

    const url = 'https://pokeapi.co/api/v2/pokemon'
    const raw_ids = [1, 4, 7]

    export default  {
        components: {
            PokemonCards
        },

        data() {
            return {
                pokemons: [],
                evolutions: [],
                selectedId: null
            }
        },

        async created() {
            this.pokemons = await this.fetchData(raw_ids)
        },

        methods: {
            async fetchData(ids) {

                const responses = await Promise.all(
                    ids.map(id => window.fetch(`${url}/${id}`)) 
                )

                const json = await Promise.all(
                    responses.map(data => data.json())
                )
                
                return json.map(datum => ({
                    id: datum.id,
                    name: datum.name,
                    sprite: datum.sprites.other['official-artwork'].front_default,
                    sprite_home: datum.sprites.other.home.front_default,
                    types: datum.types.map(type => type.type.name)
                }))
                
            },

            async fetchEvolutions(pokemon) {
                this.evolutions = await this.fetchData(
                    [pokemon.id + 1, pokemon.id + 2]
                )
                this.selectedId = pokemon.id
            }
        }
    }
</script>

<style  scoped>
</style>