export const photos = {
    namespaced: true,

    state() {
        return {
            all: [],
            cache: {}
        }
    },

    mutations: {
        setPhotosForCurrentAlbum(state, response) {
            state.all = response.photos
            state.cache[response.albumId] = response.photos
        }
    },

    actions: {
        async getByAlbum(ctx, payload) {
            if (ctx.state.cache[payload.albumId]) {
                ctx.commit('setPhotosForCurrentAlbum', { photos: ctx.state.cache[payload.albumId], albumId: payload.albumId})
                return
            }

            const res = await window.fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${payload.albumId}`)
            const json = await res.json()
            ctx.commit('setPhotosForCurrentAlbum', { photos: json, albumId: payload.albumId})
        }
    }
}