Basic.

```bash
npm install && node index.js
```

# Whats inside this game.

## 2Types of winning.

Theres 2 types of winning **Jackpot** & **Normal Wins**

### Jackpot

Gives u a % of prize pool. Odds are lower. Bet however much and u win a % of the prize pool.
There are **3** types of **Jackpot**.

-   **Minor**
    -   Chance to win of **1%**
    -   Win amount **15%** of total prize pool
-   **Major**
    -   Chance to win of **0.1%**
    -   Win amount **30%** of total prize pool
-   **Mega**
    -   Chance to win of **0.01%**
    -   Win amount **60%** of total prize pool

### Normal Wins

Multiply ur bets. Odds are higher based on multiplier.
There are **3** types of **Normal wins**. **Small**, **Medium**, **Big**.
Within a single bet ur able to win either 1 **Medium** or **Big** prize and also a **Small** prize.
You could either win only 1 of these 3, win none or win a combo of **Medium & Small** or **Big & Small**

-   **Small**
    -   Chance to win of **50%**
    -   Win Multiplier between 0.1x–0.8x
-   **Medium**
    -   Chance to win of **15%**
    -   Win Multiplier between 1x–2x
-   **Big**
    -   Chance to win of **5%**
    -   Win Multiplier between 2x–10x

# A chance to increase luck

i added a `tryIncreaseLuck` param to help. if player plays the pray or whatever feature in our game. we will set `tryIncraseLuck` to `true` which will give the player a bonus 1-3% luck **FOR NORMAL WINS** ONLY!
