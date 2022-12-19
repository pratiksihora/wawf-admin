import { GameType } from "../../enums/campaign/game/game-type.enum";

export const GAME_TYPE_CONSTANTS = [
  {
    type: GameType.SCRATCH_WIN,
    name: 'COMMON.GAME.SCRATCH_WIN',
    image: 'assets/media/inline-svg/game/scratch-and-win-hd-image.png',
    comming_soon: false,
  },
  {
    type: GameType.PEEL_REVEAL,
    name: 'COMMON.GAME.PEEL_REVEAL',
    image: 'assets/media/inline-svg/game/peel-and-reveal-hd-image.jpg',
    comming_soon: false,
  },
  {
    type: GameType.SPIN_WHEEL,
    name: 'COMMON.GAME.SPIN_WHEEL',
    image: 'assets/media/inline-svg/game/spin-and-wheel-hd-image.jpg',
    comming_soon: true,
  },
  {
    type: GameType.SLOT_MACHINE,
    name: 'COMMON.GAME.SLOT_MACHINE',
    image: 'assets/media/inline-svg/game/slot-machine-hd-image.jpg',
    comming_soon: true,
  },
]