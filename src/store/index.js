import { createStore } from 'vuex';
import axios from 'axios';

export default createStore({
    state: {
        runs: [],
        classes: [],
        isLoading: true
    },
    mutations: { // Mutations modify the state.
        SET_RUNS(state, runs) {
            state.runs = runs;
        },
        ADD_RUN(state, run) {
            state.runs.push(run);
        },
        UPDATE_RUN(state, { id, newData }) {
            const index = state.runs.findIndex(run => run._id === id)
            if (index !== -1) Object.assign(state.runs[index], newData)
        },
        SET_CLASSES(state, classes) {
            state.classes = classes;
        },
        SET_LOADING(state, loading) {
            state.isLoading = loading;
        }

    },
    actions: { // can commit mutations - dispatch is used to run actions
        async getRuns({ commit, dispatch, state }) {
            if (state.runs.length > 0) {
                return;
            }

            commit('SET_LOADING', true);
            try {
                const runResponse = await axios.get(`https://hs-arena-tracker-backend.onrender.com/api/runs`) 
                const classRes = await axios.get(`https://hs-arena-tracker-backend.onrender.com/api/classes`);
                console.log(runResponse);
                commit('SET_CLASSES', classRes.data);
                commit('SET_RUNS', runResponse.data);
            } catch (error) {
                console.error('err', error);
            } finally {
                commit('SET_LOADING', false)
            }
         
        }, 
        async submitRun({ commit }, formData) {
            const newRun = {
                classId: Number(formData.classId),
                placement: formData.placement,
                legendaryBracket: formData.legendaryBracket,
                priceWinnings: formData.priceWinnings,
                note: formData.note
            };
            const res = await axios.post(`https://hs-arena-tracker-backend.onrender.com/api/runs`, newRun);
            commit('ADD_RUN', res.data);
            return res.data;
        },

        async updateRun({ commit }, formData) {

            const updateRunObject = {
            classId: Number(formData.classId),
            placement: formData.placement,
            legendaryBracket: formData.legendaryBracket,
            priceWinnings: formData.priceWinnings,
            note: formData.note,

            }
            const res = await axios.put(`https://hs-arena-tracker-backend.onrender.com/api/runs/${formData.id}`, updateRunObject)
            commit('UPDATE_RUN', { id: formData.id, newData: res.data })
            return res.data
            },


        async refreshRuns({dispatch}) {
            await dispatch('getRuns')
    }
    },

   
    getters: { // computed properties for the store

        runs(state){
            return state.runs
        },


        runsWithClass(state) {
            return state.runs.map(run => {
                const cls = state.classes.find(c => String(c.classId) === String(run.classId)) ?? {};
                return { ...run, className: cls.className };
                //add className from different "table" with ids and attach it to runs
            })
        },

        classes(state) {
            return state.classes.map(cls => {
                return cls
            })
        },
        statsByClass(dummyParameter, getters) {
            const stats = {};
            getters.runsWithClass.forEach(run => {
                const clsId = run.classId;
                const clsName = run.className;
                if (!stats[clsId]) {
                    stats[clsId] = {
                        className: clsName,
                        totalRuns: 0,
                        totalWins: 0,
                        totalMatches: 0
                    };
                }
                const placement = Number(run.placement);
                const matchesPlayed = placement + 3;
                stats[clsId].totalRuns++;
                stats[clsId].totalWins += placement;
                stats[clsId].totalMatches += matchesPlayed;
            });

            Object.values(stats).forEach(s => {
                s.winrate = s.totalMatches > 0 ? (s.totalWins / s.totalMatches) * 100 : 0;
            });

            return stats;
        }

    }
});

/* function delayMs(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
} */