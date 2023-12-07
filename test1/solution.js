// 문제에서 제시한 숫자 배열
const numbers = [1, 3, 5, 7, 9];

// 문제에서 주어진 숫자 배열의 모든 순열을 생성하는 함수
function getPermutations(digits) {
  // 모든 순열을 저장하는 배열
  const permutationsList = [];

  // 재귀를 이용하여 순열을 생성하는 함수
  function generatePermutations(digits, current = []) {
    if (digits.length === 0) {
      permutationsList.push(current.slice());
      return;
    }

    for (let i = 0; i < digits.length; i++) {
      const remaining = digits.slice(0, i).concat(digits.slice(i + 1));
      const next = current.concat(digits[i]);
      generatePermutations(remaining, next);
    }
  }
  generatePermutations(digits);

  return permutationsList;
}

// 주어진 순열을 이용하여 최대 곱을 계산하는 함수
function calcMaxProduct(digits) {
  // 하나의 순열에서 나올 수 있는 최대값의 후보들을 저장하는 배열
  const maxProducts = [
    digits[0] *
      (digits[1] * 1000 + digits[2] * 100 + digits[3] * 10 + digits[4] * 1),
    (digits[0] * 10 + digits[1]) *
      (digits[2] * 100 + digits[3] * 10 + digits[4] * 1),
    (digits[0] * 100 + digits[1] * 10 + digits[2]) *
      (digits[3] * 10 + digits[4] * 1),
    (digits[0] * 1000 + digits[1] * 100 + digits[2] * 10) * 1 +
      digits[3] * 1 +
      digits[4],
  ];

  // 주어진 순열에 대한 최대 곱.
  let maxProduct = 0;

  for (const product of maxProducts) {
    if (product > maxProduct) {
      maxProduct = product;
    }
  }

  return maxProduct;
}

// 입력 숫자 배열의 모든 순열을 담은 배열
const digitPermutations = getPermutations(numbers);

// 모든 순열에 대한 최대 곱 중 가장 큰 값(=정답)
let answer = 0;

for (const permutation of digitPermutations) {
  const maxProduct = calcMaxProduct(permutation);
  if (maxProduct > answer) {
    answer = maxProduct;
  }
}

console.log(answer);
