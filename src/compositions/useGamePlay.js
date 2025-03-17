import { reactive, toRefs, watch } from "vue";
import { useRulesConfig } from "./useRulesConfig.js";

const gameState = reactive({
    lastPlayerThrow: {},
    lastComputerThrow: {},
    userScore: 0,
});

export const useGamePlay = () => {
    const { isStandardVersion, currentRulesConfig } = useRulesConfig();
    const chooseComputerThrow = () => {
        const userThrow = currentRulesConfig.value.indexOf(gameState.lastPlayerThrow);
        let randomThrow;
        do {
            randomThrow = Math.floor(Math.random() * currentRulesConfig.value.length);
        } while (randomThrow === userThrow)
        gameState.lastComputerThrow = currentRulesConfig.value[randomThrow];
    }

    const  isWinningThrow = (winnerThrow, loserThrow) => {
        return winnerThrow.beats.includes(loserThrow.name);
    }

    const defineWinner = (userThrow) => {
        gameState.lastPlayerThrow = userThrow;
        chooseComputerThrow();
        const isPlayerWin = isWinningThrow(gameState.lastPlayerThrow, gameState.lastComputerThrow);
        if(isPlayerWin) {
            setTimeout(() => gameState.userScore++, 6000);
        } else setTimeout(() => gameState.userScore--, 6000);
        return isPlayerWin;
    }

    const clearGameState = () => {
        gameState.lastComputerThrow = {};
        gameState.lastPlayerThrow = {};
    }

    const getScoreFromStorage = () => {
        if(isStandardVersion.value)
            gameState.userScore = JSON.parse(localStorage.getItem("userScore_standard")) || 0;
        else gameState.userScore = JSON.parse(localStorage.getItem("userScore_extended")) || 0;
    };

    const setScoreToStorage = (isStandardScore) => {
        if(isStandardScore)
            localStorage.setItem('userScore_standard', JSON.stringify(gameState.userScore));
        else localStorage.setItem('userScore_extended', JSON.stringify(gameState.userScore));
    }

    watch(() => isStandardVersion.value, (value, oldValue) => {
        setScoreToStorage(oldValue);
        setTimeout(() => {
            getScoreFromStorage();
        },250)
    });

    return {
        defineWinner,
        ...toRefs(gameState),
        clearGameState,
        getScoreFromStorage,
    }
}