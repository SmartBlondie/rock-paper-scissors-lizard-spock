import { rulesConfig } from "../const/rules.config.js";
import { STANDARD_THROWS } from "../const/throw.const.js";
import { ref } from "vue";

const isStandardVersion = ref(false);
const currentRulesConfig = ref(rulesConfig);


export const useRulesConfig = () => {

    const filterRulesByVersion = () => {
        if(isStandardVersion.value)
            currentRulesConfig.value = rulesConfig.filter((rule) => STANDARD_THROWS.includes(rule.name));
        else currentRulesConfig.value = rulesConfig;
    }

    const getRuleByName = (name) => currentRulesConfig.value.find(rule => rule.name === name);

    const changeVersion = () => {
        isStandardVersion.value = !isStandardVersion.value;
        filterRulesByVersion();
        localStorage.setItem('isStandardVersion', JSON.stringify(isStandardVersion.value));
    }

    const getVersionFromStorage = () => {
        isStandardVersion.value = JSON.parse(localStorage.getItem('isStandardVersion')) || false;
        filterRulesByVersion();
    }

    return {
        currentRulesConfig,
        isStandardVersion,
        changeVersion,
        getVersionFromStorage,
        getRuleByName,
    }
}