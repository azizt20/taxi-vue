import locations from '../fakeData/locations'
import regions from '../fakeData/regions.json'

export default {
    namespaced: true,
    state: {
        locations: [],
        regions: [],

    },
    mutations: {
        SET_LOCATIONS(state, locations) {
            state.locations = locations
        },
        SET_REGIONS(state, regions) {
            state.locations = regions
        },
        SET_NEW_LOCATION(state, newLacation) {
            state.locations.unshift(newLacation)
        },
        SET_NEW_REGION(state, newRegion) {
            state.regions.unshift(newRegion)
        }

    },
    actions: {
        async getFakeLocations({commit}) {
            await new Promise((resolve) => {
                setTimeout(() => {
                    commit('SET_LOCATIONS', locations)
                    commit('SET_REGIONS', regions)
                    resolve()
                }, 1000)
            })
        },

    },
    getters: {
        getlocations: state => {
            return state.locations;
        },
        getregions: state => {
            return state.locations;
        }

    }
}