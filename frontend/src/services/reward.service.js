export const rewardsService = {
    calculateRewardPoints: (difficulty, duration, competency) => {
      // Calculate the reward points based on the difficulty, duration, and competency
      let rewardPoints = 0;
      switch (difficulty) {
        case 'Facile':
          rewardPoints+= 100;
          break;
        case 'Moyen':
          rewardPoints += 200;
          break;
        case 'Difficile':
          rewardPoints += 300;
          break;
        default:
          rewardPoints = 0;
          break;
      }

      rewardPoints += duration * 2;
      rewardPoints += competency * 3;

      return rewardPoints;  
  
    },
    // getRewards: () => {
    //   return rewards;
    // },
    // getReward: (id) => {
    //   return rewards.find((reward) => reward.id === id);
    // },
    // addReward: (reward) => {
    //   rewards.push(reward);
    // },
    // updateReward: (id, reward) => {
    //   const index = rewards.findIndex((r) => r.id === id);
    //   if (index !== -1) index = 0
    // }
  }