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
            const index = state.runs.findIndex(run => run.id === id)
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
                const response = await dispatch('apiCallWithLag', { call: () => axios.get(`${process.env.VUE_APP_API_URL}/api/runs`) }); // passing the function, not calling it
                await dispatch('loadRunsWithDelay', { runs: response.data, delay: 100 });
                const classRes = await axios.get(`${process.env.VUE_APP_API_URL}/api/classes`);
                console.log(classRes)
                commit('SET_CLASSES', classRes.data);
            } catch (error) {
                console.error('err', error);
            } finally {
                commit('SET_LOADING', false)
            }
        },
        async apiCallWithLag(dummyParameter, { call, delay: d }) {
            const [response] = await Promise.all([call(), delayMs(d)]); // Run both tasks at the same time and wait for both to finish. using brackets to only save take the first value i.e the call response
            return response;
        },
        async loadRunsWithDelay({ commit, state }, { runs, delay }) {
            const newRuns = [...state.runs]; // clone runs from the state to a new array. starting with a copy of current runs and can then add new runs below
            for (let run of runs) {
                await delayMs(delay);
                newRuns.push(run);
            }
            commit('SET_RUNS', newRuns);
        },
        async submitRun({ commit }, formData) {
            const newRun = {
                classId: Number(formData.classId),
                placement: formData.placement,
                legendaryBracket: formData.legendaryBracket,
                priceWinnings: formData.priceWinnings,
                note: formData.note
            };
            const res = await axios.post(`${process.env.VUE_APP_API_URL}/api/runs`, newRun);
            commit('ADD_RUN', res.data);
            return res.data;
        }
    },
    getters: { // computed properties for the store
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

function delayMs(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}