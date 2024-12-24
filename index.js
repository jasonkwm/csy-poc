class GamblingGame {
    constructor() {
        this.pool = 0; // Total pool for prize distribution
        this.ownerFee = 0.02; // 2% of the bet goes to the owner
        this.miniJackpotPool = 0; // Mini Jackpot (20% of the pool)
        this.majorJackpotPool = 0; // Major Jackpot (30% of the pool)
        this.megaJackpotPool = 0; // Mega Jackpot (60% of the pool)
        this.miniJackpotChance = 0.05; // 5% chance to win mini jackpot
        this.majorJackpotChance = 0.02; // 2% chance to win major jackpot
        this.megaJackpotChance = 0.008; // 0.8% chance to win mega jackpot
        this.players = {}; // Store players {playerId: {bet: number, winnings: number}}
        this.baseSmallWinProbability = 0.5; // 50% chance for small win
        this.baseMediumWinProbability = 0.25; // 25% chance for medium win
        this.baseBigWinProbability = 0.05; // 5% chance for big win
        this.maxProbability = 0.5; // Max total win probability
    }

    placeBet(playerId, amount, tryIncreaseLuck = false) {
        if (amount <= 0) throw new Error("Bet amount must be positive.");

        if (!this.players[playerId]) {
            this.players[playerId] = { bet: amount, winnings: 0 };
        } else {
            this.players[playerId].bet += amount;
        }
        console.log("==============================================");
        console.log("Game Start!");

        const ownerFee = amount * this.ownerFee;
        const amountAfterFee = amount - ownerFee;
        const chance = Math.random(); // Number is inverted. 0.8 means 20% chance of winning
        const player = { bet: amountAfterFee, winnings: 0, bonusLuck: 0, chance };

        // Take 5% fee for the owner

        // Add the remaining amount (after fee) to the total prize pool
        this.pool += amountAfterFee;
        this.miniJackpotPool = this.pool * 0.15; // Mini Jackpot (20% of the pool)
        this.majorJackpotPool = this.pool * 0.3; // Major Jackpot (30% of the pool)
        this.megaJackpotPool = this.pool * 0.6; // Mega Jackpot (60% of the pool)
        console.log(`Current prize pool ${this.pool}.`);
        // Give feedback about the fee and jackpot contributions
        console.log(
            `Player ${playerId} placed a bet of $${amount}. Fee of $${ownerFee.toFixed(2)} taken for the owner.`
        );
        console.log(
            `Mini Jackpot: $${this.miniJackpotPool.toFixed(2)}, Major Jackpot: $${this.majorJackpotPool.toFixed(
                2
            )}, Mega Jackpot: $${this.megaJackpotPool.toFixed(2)}`
        );

        // Try to increase luck if specified
        if (tryIncreaseLuck) {
            const randomLuck = Math.random() * 0.03; // Luck increase between 0% and 3%
            player.bonusLuck += randomLuck;

            console.log(
                `Player ${playerId} tried increasing luck! Luck increased to ${(player.bonusLuck * 100).toFixed(2)}%.`
            );
        }

        let winnings = 0;
        let prizeType = "none";
        console.log(
            `Player ${playerId} has a luck of ${(player.chance * 100).toFixed(
                2
            )}%. Bonus luck does not apply to jackpot.`
        );
        // Jackpot Check: Random chance to win a jackpot
        if (player.chance < this.megaJackpotChance) {
            const jackpotPrize = this.megaJackpotPool;
            this.megaJackpotPool = 0; // Reset mega jackpot after winning
            winnings += jackpotPrize;
            prizeType = "megaJackpot";
            console.log(`Player ${playerId} won the Mega Jackpot of $${jackpotPrize.toFixed(2)}!`);
        } else if (player.chance < this.majorJackpotChance) {
            const jackpotPrize = this.majorJackpotPool;
            this.majorJackpotPool = 0; // Reset major jackpot after winning
            winnings += jackpotPrize;
            prizeType = "majorJackpot";
            console.log(`Player ${playerId} won the Major Jackpot of $${jackpotPrize.toFixed(2)}!`);
        } else if (player.chance < this.miniJackpotChance) {
            const jackpotPrize = this.miniJackpotPool;
            this.miniJackpotPool = 0; // Reset mini jackpot after winning
            winnings += jackpotPrize;
            prizeType = "miniJackpot";
            console.log(`Player ${playerId} won the Mini Jackpot of $${jackpotPrize.toFixed(2)}!`);
        }
        console.log(`Player ${playerId} did not manage to win any jackpot.`);
        if (!prizeType.includes("Jackpot")) {
            const scaledSmallWinProb = this.baseSmallWinProbability + player.bonusLuck;
            const scaledMediumWinProb = this.baseMediumWinProbability + player.bonusLuck;
            const scaledBigWinProb = this.baseBigWinProbability + player.bonusLuck / 2;
            console.log(
                `Scaled winnings with player bonus luck. Small Win: ${(scaledSmallWinProb * 100).toFixed(
                    2
                )}%, Medium Win: ${(scaledMediumWinProb * 100).toFixed(2)}%, Big Win: ${(
                    scaledBigWinProb * 100
                ).toFixed(2)}%`
            );
            // Big Prize Roll
            if (player.chance < scaledBigWinProb) {
                const bigWinMultiplier = 2 + player.chance * 8; // Multiplier between 2x–10x
                winnings += bigWinMultiplier * player.bet;
                console.log(`Player ${playerId} won ${bigWinMultiplier * player.bet}! Big Win!`);
                prizeType = "big";
                // Medium Prize Roll
            } else if (player.chance < scaledMediumWinProb) {
                const mediumWinMultiplier = 1 + player.chance * 2; // Multiplier between 1x–2x
                winnings += mediumWinMultiplier * player.bet;
                console.log(`Player ${playerId} won ${mediumWinMultiplier * player.bet}! Medium Win!`);
                prizeType = "medium";
            }
            // Small Prize Roll
            if (player.chance < scaledSmallWinProb) {
                const smallWinMultiplier = 0.1 + player.chance; // Multiplier between 0.1x–0.5x
                winnings += smallWinMultiplier * player.bet;
                console.log(`Player ${playerId} won ${smallWinMultiplier * player.bet}! Small Win!`);
                prizeType = prizeType === "big" || prizeType === "medium" ? "Combo!" : "small";
            }
        }

        // Ensure winnings don’t exceed the prize pool
        winnings = Math.min(winnings, this.pool);
        this.pool -= winnings;
        this.players[playerId].winnings += winnings;
        console.log(`Player ${playerId} won a total of $${winnings}!`);
        console.log(`Prize Pool has a remaining $${this.pool}!`);
        console.log("Game End!");
        console.log("==============================================");
        // Return result immediately
        return {
            playerId,
            bet: amount,
            feesEarned: ownerFee,
            prizeType,
            winnings,
            remainingPrizePool: this.pool,
        };
    }
}

const prompt = require("prompt-sync")();
const game = new GamblingGame();
while (true) {
    const userInput = prompt("Again?");
    const options = userInput.split(" ");

    // const result = game.placeBet(options[0], Number(options[1]), options[2] === "true" ? true : false);
    const result = game.placeBet("Potato", 100, true);
    console.log(result);
}
