module.exports = function zeros(expression) {
  const {'!': single, '!!': double} = parseExpression(expression);

  let twoCount = 0;
  let fiveCount = 0;

  for (const num of single) {
    twoCount += calcFactorCount(num, 2);
    fiveCount += calcFactorCount(num, 5);
  }

  for (const num of double) {
    const k = Math.floor(num / 2);
    if (num % 2 == 0) {
      // n = 2 * k => n!! = 2^k * k!
      twoCount += k + calcFactorCount(k, 2);
      fiveCount += calcFactorCount(k, 5);
    }
    else {
      // n = 2 * k + 1 => n!! = n! / (2^k * k!)
      twoCount += calcFactorCount(num, 2) - k - calcFactorCount(k, 2);
      fiveCount += calcFactorCount(num, 5) - calcFactorCount(k, 5);
    }
  }

  return Math.min(twoCount, fiveCount);

  // your solution
}

function parseExpression(expression) {
  const result = {
    '!': [],
    '!!': [],
  };

  const regexp = /(\d+)(!{1,2})/g;

  let matches;
  while ((matches = regexp.exec(expression)) != null) {
    result[matches[2]].push(+matches[1]);
  }

  return result;
}

function calcFactorCount(num, factor) {
  let count = 0;

  while (num > 0) {
    num = Math.floor(num / factor);
    count += num;
  }

  return count;
}
