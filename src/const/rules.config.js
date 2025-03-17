import LizardIcon from '../assets/icons/icon-lizard.svg';
import PaperIcon from '../assets/icons/icon-paper.svg';
import RockIcon from '../assets/icons/icon-rock.svg';
import ScissorsIcon from '../assets/icons/icon-scissors.svg';
import SpockIcon from '../assets/icons/icon-spock.svg';

export const rulesConfig = [
    {
        name: 'rock',
        icon: RockIcon,
        beats: [
            'lizard',
            'scissors',
        ],
    },
    {
        name: 'paper',
        icon: PaperIcon,
        beats: [
            'rock',
            'spock',
        ],
    },
    {
        name:'scissors',
        icon: ScissorsIcon,
        beats: [
            'paper',
            'lizard',
        ],
    },
    {
        name: 'lizard',
        icon: LizardIcon,
        beats: [
            'spock',
            'paper',
        ],
    },
    {
        name: 'spock',
        icon: SpockIcon,
        beats: [
            'rock',
            'scissors',
        ],
    },
]