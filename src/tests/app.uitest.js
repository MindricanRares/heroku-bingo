import { Selector } from 'testcafe';

fixture `Testing game board logic test`
    .page `http://localhost:3000/`;

test('shouldAwardBingoIf5InLineNoJoker',async t => {
    const totalScore=Selector('#root > div > div > div > div.col-10.gameBoard > div:nth-child(1) > div > h3');
    const firstElement = Selector('#root > div > div > div > div.col-10.gameBoard > div.btn-group.btn-matrix > div:nth-child(1) > div > button.btn.btn-success.bingo-card-btn');
    const secondElement = Selector('#root > div > div > div > div.col-10.gameBoard > div.btn-group.btn-matrix > div:nth-child(6) > div > button.btn.btn-success.bingo-card-btn');
    const thirdElement = Selector('#root > div > div > div > div.col-10.gameBoard > div.btn-group.btn-matrix > div:nth-child(11) > div > button.btn.btn-success.bingo-card-btn');
    const forthElement = Selector('#root > div > div > div > div.col-10.gameBoard > div.btn-group.btn-matrix > div:nth-child(16) > div > button.btn.btn-success.bingo-card-btn');
    const fifthElement = Selector('#root > div > div > div > div.col-10.gameBoard > div.btn-group.btn-matrix > div:nth-child(21) > div > button.btn.btn-success.bingo-card-btn');
    await t.expect(totalScore.innerText).eql('The total score is :0');
    await t.click(firstElement);
    await t.click(secondElement);
    await t.click(thirdElement);
    await t.click(forthElement);
    await t.click(fifthElement);
    await t.expect(totalScore.innerText).eql('The total score is :1000');
});
test('shouldAwardBingoIf5InColumnNoJoker',async t => {
  const totalScore=Selector('#root > div > div > div > div.col-10.gameBoard > div:nth-child(1) > div > h3');
  const firstElement = Selector('#root > div > div > div > div.col-10.gameBoard > div.btn-group.btn-matrix > div:nth-child(1) > div > button.btn.btn-success.bingo-card-btn');
  const secondElement = Selector('#root > div > div > div > div.col-10.gameBoard > div.btn-group.btn-matrix > div:nth-child(2) > div > button.btn.btn-success.bingo-card-btn');
  const thirdElement = Selector('#root > div > div > div > div.col-10.gameBoard > div.btn-group.btn-matrix > div:nth-child(3) > div > button.btn.btn-success.bingo-card-btn');
  const forthElement = Selector('#root > div > div > div > div.col-10.gameBoard > div.btn-group.btn-matrix > div:nth-child(4) > div > button.btn.btn-success.bingo-card-btn');
  const fifthElement = Selector('#root > div > div > div > div.col-10.gameBoard > div.btn-group.btn-matrix > div:nth-child(5) > div > button.btn.btn-success.bingo-card-btn');
  await t.expect(totalScore.innerText).eql('The total score is :0');
  await t.click(firstElement);
  await t.click(secondElement);
  await t.click(thirdElement);
  await t.click(forthElement);
  await t.click(fifthElement);
  await t.expect(totalScore.innerText).eql('The total score is :1000');
});
test('shouldAwardBingoIf5InDiagonal',async t => {
  const totalScore=Selector('#root > div > div > div > div.col-10.gameBoard > div:nth-child(1) > div > h3');
  const firstElement = Selector('#root > div > div > div > div.col-10.gameBoard > div.btn-group.btn-matrix > div:nth-child(1) > div > button.btn.btn-success.bingo-card-btn');
  const secondElement = Selector('#root > div > div > div > div.col-10.gameBoard > div.btn-group.btn-matrix > div:nth-child(7) > div > button.btn.btn-success.bingo-card-btn');
  const forthElement = Selector('#root > div > div > div > div.col-10.gameBoard > div.btn-group.btn-matrix > div:nth-child(19) > div > button.btn.btn-success.bingo-card-btn');
  const fifthElement = Selector('#root > div > div > div > div.col-10.gameBoard > div.btn-group.btn-matrix > div:nth-child(25) > div > button.btn.btn-success.bingo-card-btn');
  await t.expect(totalScore.innerText).eql('The total score is :0');
  await t.click(firstElement);
  await t.click(secondElement);
  await t.click(forthElement);
  await t.click(fifthElement);
  await t.expect(totalScore.innerText).eql('The total score is :900');
});
test('shouldAwardBingoIf5InInvertedDiagonal',async t => {
  const totalScore=Selector('#root > div > div > div > div.col-10.gameBoard > div:nth-child(1) > div > h3');
  const firstElement = Selector('#root > div > div > div > div.col-10.gameBoard > div.btn-group.btn-matrix > div:nth-child(5) > div > button.btn.btn-success.bingo-card-btn');
  const secondElement = Selector('#root > div > div > div > div.col-10.gameBoard > div.btn-group.btn-matrix > div:nth-child(9) > div > button.btn.btn-success.bingo-card-btn');
  const forthElement = Selector('#root > div > div > div > div.col-10.gameBoard > div.btn-group.btn-matrix > div:nth-child(17) > div > button.btn.btn-success.bingo-card-btn');
  const fifthElement = Selector('#root > div > div > div > div.col-10.gameBoard > div.btn-group.btn-matrix > div:nth-child(21) > div > button.btn.btn-success.bingo-card-btn');
  await t.expect(totalScore.innerText).eql('The total score is :0');
  await t.click(firstElement);
  await t.click(secondElement);
  await t.click(forthElement);
  await t.click(fifthElement);
  await t.expect(totalScore.innerText).eql('The total score is :900');
});





