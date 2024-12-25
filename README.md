Basic.

```bash
npm install && node index.js
```

# Whats inside this game.

In this game everyone plays with the same prize pool of money `this.pool` and for every bet, the money goes into `this.pool` which would be use to handle all fo the payouts. No player can win more than the total in `this.pool`. The house takes 2% of bets as fees. and the house makes nothing from `this.pool`.

## 2Types of winning.

Theres 2 types of winning **Jackpot** & **Normal Wins**

### Jackpot

Gives u a % of prize pool. Odds are lower. Bet however much and u win a % of the prize pool.
There are **3** types of **Jackpot**.

-   **Minor**
    -   Chance to win of **1.5%**
    -   Win amount **10%** of total prize pool
-   **Major**
    -   Chance to win of **0.2%**
    -   Win amount **20%** of total prize pool
-   **Mega**
    -   Chance to win of **0.02%**
    -   Win amount **50%** of total prize pool

### Normal Wins

Multiply ur bets. Odds are higher based on multiplier.  
There are **3** types of Normal wins. **Small**, **Medium**, **Big**.  
Within a single bet ur able to win either 1 **Medium** or **Big** prize and also a **Small** prize.  
You could either win only 1 of these 3, win none or win a combo of **Medium & Small** or **Big & Small**

-   **Small**
    -   Chance to win of **60%**
    -   Win Multiplier between 0.2x–1x
-   **Medium**
    -   Chance to win of **18%**
    -   Win Multiplier between 1x–3x
-   **Big**
    -   Chance to win of **8%**
    -   Win Multiplier between 3x–15x

# A chance to increase luck

i added a `tryIncreaseLuck` param to help. if player plays the pray or whatever feature in our game. we will set `tryIncraseLuck` to `true` which will give the player a bonus 0-3% luck **FOR NORMAL WINS** ONLY!
The player will also have a `accumulatedLuck` which they can accumulate everytime they play with a cap of 2%.
