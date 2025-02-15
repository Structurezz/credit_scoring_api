export const preprocessData = (user) => {
    return {
      transactionHistory: normalize(user.transactionHistory),
      paymentBehavior: encodeCategorical(user.paymentBehavior),
      creditBureauData: scale(user.creditBureauData),
    };
  };
  
  // Example helper functions
  const normalize = (data) => data.map((value) => value / 1000); // Normalize example
  const encodeCategorical = (data) => ({ ...data, encoded: true }); // Encode example
  const scale = (data) => data.map((value) => (value - 50) / 100); // Scale example
  