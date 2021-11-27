import apiRequest from "../utils/apiRequest";


export default {
    namespaced: true,
    state: {
        locations: [],
        regions: [],
        selectedLocation: null,
        newCoords: []

    },
    mutations: {
        SET_LOCATIONS(state, locations) {
            state.locations = locations
        },
        SET_REGIONS(state, regions) {
            state.regions = regions
        },
        SET_NEW_LOCATION(state, lacation) {
            state.locations.push(lacation)
        },
        SET_NEW_REGION(state, region,) {
            state.regions.push(region)
        },
        SET_NEW_COORDS(state, newCoords) {
            state.newCoords = newCoords
        },
        SET_SELECTED_LOCATION(state, selectedLocation) {
            state.selectedLocation = selectedLocation
        }
    },
    actions: {
        getAllLocations({dispatch}) {
            dispatch('getlocation')
            dispatch('getRegioons')
        },
        async getlocation({commit}) {
            await new Promise((resolve) => {
                apiRequest
                    .get('/admin/location/')
                    .then(res => {
                        commit('SET_LOCATIONS', res.data.results)
                        resolve()
                    })
            })
        },
        async getRegioons({commit}) {
            await new Promise((resolve) => {
                apiRequest
                    .get('/admin/address/')
                    .then(res => {
                        commit('SET_REGIONS', res.data.results)
                        resolve()
                    })
            })
        },
        async addRegion({commit}, newRegion) {
            await new Promise((resolve) => {
                apiRequest
                    .post('/admin/address/', newRegion)
                    .then(res => {
                        commit('SET_NEW_REGION', res.data)
                        resolve()
                    })
            })

        },
        async addLocation({commit}, newLocation) {
            await new Promise((resolve) => {
                apiRequest
                    .post('/admin/location/', newLocation)
                    .then(res => {
                        commit('SET_NEW_LOCATION', res.data)
                        alert("Локация " + newLocation.location + " добавлена в список!!! ")
                        resolve()
                    })
            })

        }

    },
    getters: {
        getlocations: state => {
            return state.locations;
        },
        getregions: state => {
            return state.regions;
        },
        getselectedlocation: state => {
            return state.selectedLocation;
        },
        getNewCoords: state => {
            return state.newCoords;
        },
        getlocationByRegion: (state) => (region) => {
            return state.locations.filter(todo => todo.addr === region);
        }

    }
}