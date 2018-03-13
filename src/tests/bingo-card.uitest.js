import { Selector } from "testcafe";

fixture`Testing bingo card`.page`http://localhost:3000/`;

test("ShouldNotLetCardHaveMoreThan5Clicks", async t => {
  const addButton = Selector(
    "#root > div > div > div > div.col-10.gameBoard > div.btn-group.btn-matrix > div:nth-child(1) > div > button.btn.btn-success.bingo-card-btn"
  );
  const btnClickedNumber = Selector(
    "#root > div > div > div > div.col-10.gameBoard > div.btn-group.btn-matrix > div:nth-child(1) > div > p:nth-child(2)"
  );
  await t.click(addButton);
  await t.click(addButton);
  await t.click(addButton);
  await t.click(addButton);
  await t.click(addButton);

  await t.expect(btnClickedNumber.innerText).eql("Clicked: 4");
});

test("ShouldNotLetCardHaveNegativeClicks", async t => {
  const addButton = Selector(
    "#root > div > div > div > div.col-10.gameBoard > div.btn-group.btn-matrix > div:nth-child(1) > div > button.btn.btn-success.bingo-card-btn"
  );
  const delButton = Selector(
    "#root > div > div > div > div.col-10.gameBoard > div.btn-group.btn-matrix > div:nth-child(1) > div > button.btn.btn-danger.bingo-card-btn"
  );
  const btnClickedNumber = Selector(
    "#root > div > div > div > div.col-10.gameBoard > div.btn-group.btn-matrix > div:nth-child(1) > div > p:nth-child(2)"
  );
  await t.expect(btnClickedNumber.innerText).eql("Clicked: 0");
  await t.click(addButton);
  await t.expect(btnClickedNumber.innerText).eql("Clicked: 1");
  await t.click(delButton);
  await t.click(delButton);
  await t.expect(btnClickedNumber.innerText).eql("Clicked: 0");
});

test("ShouldHaveNoUndefinedAnswer", async t => {
  for (let i = 1; i < 25; i++) {
    if (i != 13) {
      await t.expect(
        Selector(
          `#root > div > div > div > div.col-10.gameBoard > div.btn-group.btn-matrix > div:nth-child(${i}) > div > p:nth-child(1)`
        )
      );
    }
  }
});

test("ShouldHaveBingoCardInTheMiddle", async t => {
  const bingoCard = Selector(
    "#root > div > div > div > div.col-10.gameBoard > div.btn-group.btn-matrix > div:nth-child(13) > div > h1"
  );
  await t.expect(bingoCard.innerText).eql("Bingo");
});

test('ShouldColourBingoLineInYellow',async t =>{
  const firstBingoCard=Selector('#root > div > div > div > div.col-10.gameBoard > div.btn-group.btn-matrix > div:nth-child(1) > div');
  const secondBingoCard=Selector('#root > div > div > div > div.col-10.gameBoard > div.btn-group.btn-matrix > div:nth-child(6) > div');
  const thirdBingoCard=Selector('#root > div > div > div > div.col-10.gameBoard > div.btn-group.btn-matrix > div:nth-child(11) > div');
  const forthBingoCard=Selector('#root > div > div > div > div.col-10.gameBoard > div.btn-group.btn-matrix > div:nth-child(16) > div');
  const fifthBingoCard=Selector('#root > div > div > div > div.col-10.gameBoard > div.btn-group.btn-matrix > div:nth-child(21) > div');
  await t.expect(firstBingoCard.hasClass('bingo-card')).eql(false);
  await t.expect(secondBingoCard.hasClass('bingo-card')).eql(false);
  await t.expect(thirdBingoCard.hasClass('bingo-card')).eql(false);
  await t.expect(forthBingoCard.hasClass('bingo-card')).eql(false);
  await t.expect(fifthBingoCard.hasClass('bingo-card')).eql(false);
  const totalScore=Selector('#root > div > div > div > div.col-10.gameBoard > div:nth-child(1) > div > h3');
  const firstElement = Selector('#root > div > div > div > div.col-10.gameBoard > div.btn-group.btn-matrix > div:nth-child(1) > div > button.btn.btn-success.bingo-card-btn');
  const secondElement = Selector('#root > div > div > div > div.col-10.gameBoard > div.btn-group.btn-matrix > div:nth-child(6) > div > button.btn.btn-success.bingo-card-btn');
  const thirdElement = Selector('#root > div > div > div > div.col-10.gameBoard > div.btn-group.btn-matrix > div:nth-child(11) > div > button.btn.btn-success.bingo-card-btn');
  const forthElement = Selector('#root > div > div > div > div.col-10.gameBoard > div.btn-group.btn-matrix > div:nth-child(16) > div > button.btn.btn-success.bingo-card-btn');
  const fifthElement = Selector('#root > div > div > div > div.col-10.gameBoard > div.btn-group.btn-matrix > div:nth-child(21) > div > button.btn.btn-success.bingo-card-btn');
  await t.click(firstElement);
  await t.click(secondElement);
  await t.click(thirdElement);
  await t.click(forthElement);
  await t.click(fifthElement);
  await t.expect(firstBingoCard.hasClass('bingo-card')).eql(true);
  await t.expect(secondBingoCard.hasClass('bingo-card')).eql(true);
  await t.expect(thirdBingoCard.hasClass('bingo-card')).eql(true);
  await t.expect(forthBingoCard.hasClass('bingo-card')).eql(true);
  await t.expect(fifthBingoCard.hasClass('bingo-card')).eql(true);
})
test('ShouldColourBingoColumnInYellow',async t =>{
  const firstBingoCard=Selector('#root > div > div > div > div.col-10.gameBoard > div.btn-group.btn-matrix > div:nth-child(1) > div');
  const secondBingoCard=Selector('#root > div > div > div > div.col-10.gameBoard > div.btn-group.btn-matrix > div:nth-child(2) > div');
  const thirdBingoCard=Selector('#root > div > div > div > div.col-10.gameBoard > div.btn-group.btn-matrix > div:nth-child(3) > div');
  const forthBingoCard=Selector('#root > div > div > div > div.col-10.gameBoard > div.btn-group.btn-matrix > div:nth-child(4) > div');
  const fifthBingoCard=Selector('#root > div > div > div > div.col-10.gameBoard > div.btn-group.btn-matrix > div:nth-child(5) > div');
  await t.expect(firstBingoCard.hasClass('bingo-card')).eql(false);
  await t.expect(secondBingoCard.hasClass('bingo-card')).eql(false);
  await t.expect(thirdBingoCard.hasClass('bingo-card')).eql(false);
  await t.expect(forthBingoCard.hasClass('bingo-card')).eql(false);
  await t.expect(fifthBingoCard.hasClass('bingo-card')).eql(false);
  const totalScore=Selector('#root > div > div > div > div.col-10.gameBoard > div:nth-child(1) > div > h3');
  const firstElement = Selector('#root > div > div > div > div.col-10.gameBoard > div.btn-group.btn-matrix > div:nth-child(1) > div > button.btn.btn-success.bingo-card-btn');
  const secondElement = Selector('#root > div > div > div > div.col-10.gameBoard > div.btn-group.btn-matrix > div:nth-child(2) > div > button.btn.btn-success.bingo-card-btn');
  const thirdElement = Selector('#root > div > div > div > div.col-10.gameBoard > div.btn-group.btn-matrix > div:nth-child(3) > div > button.btn.btn-success.bingo-card-btn');
  const forthElement = Selector('#root > div > div > div > div.col-10.gameBoard > div.btn-group.btn-matrix > div:nth-child(4) > div > button.btn.btn-success.bingo-card-btn');
  const fifthElement = Selector('#root > div > div > div > div.col-10.gameBoard > div.btn-group.btn-matrix > div:nth-child(5) > div > button.btn.btn-success.bingo-card-btn');
  await t.click(firstElement);
  await t.click(secondElement);
  await t.click(thirdElement);
  await t.click(forthElement);
  await t.click(fifthElement);
  await t.expect(firstBingoCard.hasClass('bingo-card')).eql(true);
  await t.expect(secondBingoCard.hasClass('bingo-card')).eql(true);
  await t.expect(thirdBingoCard.hasClass('bingo-card')).eql(true);
  await t.expect(forthBingoCard.hasClass('bingo-card')).eql(true);
  await t.expect(fifthBingoCard.hasClass('bingo-card')).eql(true);
})
test('ShouldColourBingoDiagonalInYellow',async t =>{
  const firstBingoCard=Selector('#root > div > div > div > div.col-10.gameBoard > div.btn-group.btn-matrix > div:nth-child(1) > div');
  const secondBingoCard=Selector('#root > div > div > div > div.col-10.gameBoard > div.btn-group.btn-matrix > div:nth-child(7) > div');
  const forthBingoCard=Selector('#root > div > div > div > div.col-10.gameBoard > div.btn-group.btn-matrix > div:nth-child(19) > div');
  const fifthBingoCard=Selector('#root > div > div > div > div.col-10.gameBoard > div.btn-group.btn-matrix > div:nth-child(25) > div');
  await t.expect(firstBingoCard.hasClass('bingo-card')).eql(false);
  await t.expect(secondBingoCard.hasClass('bingo-card')).eql(false);
  await t.expect(forthBingoCard.hasClass('bingo-card')).eql(false);
  await t.expect(fifthBingoCard.hasClass('bingo-card')).eql(false);
  const totalScore=Selector('#root > div > div > div > div.col-10.gameBoard > div:nth-child(1) > div > h3');
  const firstElement = Selector('#root > div > div > div > div.col-10.gameBoard > div.btn-group.btn-matrix > div:nth-child(1) > div > button.btn.btn-success.bingo-card-btn');
  const secondElement = Selector('#root > div > div > div > div.col-10.gameBoard > div.btn-group.btn-matrix > div:nth-child(7) > div > button.btn.btn-success.bingo-card-btn');
  const forthElement = Selector('#root > div > div > div > div.col-10.gameBoard > div.btn-group.btn-matrix > div:nth-child(19) > div > button.btn.btn-success.bingo-card-btn');
  const fifthElement = Selector('#root > div > div > div > div.col-10.gameBoard > div.btn-group.btn-matrix > div:nth-child(25) > div > button.btn.btn-success.bingo-card-btn');
  await t.click(firstElement);
  await t.click(secondElement);
  await t.click(forthElement);
  await t.click(fifthElement);
  await t.expect(firstBingoCard.hasClass('bingo-card')).eql(true);
  await t.expect(secondBingoCard.hasClass('bingo-card')).eql(true);
  await t.expect(forthBingoCard.hasClass('bingo-card')).eql(true);
  await t.expect(fifthBingoCard.hasClass('bingo-card')).eql(true);
})
test('ShouldColourBingoInvertedDiagonalInYellow',async t =>{
  const firstBingoCard=Selector('#root > div > div > div > div.col-10.gameBoard > div.btn-group.btn-matrix > div:nth-child(5) > div');
  const secondBingoCard=Selector('#root > div > div > div > div.col-10.gameBoard > div.btn-group.btn-matrix > div:nth-child(9) > div');
  const forthBingoCard=Selector('#root > div > div > div > div.col-10.gameBoard > div.btn-group.btn-matrix > div:nth-child(17) > div');
  const fifthBingoCard=Selector('#root > div > div > div > div.col-10.gameBoard > div.btn-group.btn-matrix > div:nth-child(21) > div');
  await t.expect(firstBingoCard.hasClass('bingo-card')).eql(false);
  await t.expect(secondBingoCard.hasClass('bingo-card')).eql(false);
  await t.expect(forthBingoCard.hasClass('bingo-card')).eql(false);
  await t.expect(fifthBingoCard.hasClass('bingo-card')).eql(false);
  const totalScore=Selector('#root > div > div > div > div.col-10.gameBoard > div:nth-child(1) > div > h3');
  const firstElement = Selector('#root > div > div > div > div.col-10.gameBoard > div.btn-group.btn-matrix > div:nth-child(5) > div > button.btn.btn-success.bingo-card-btn');
  const secondElement = Selector('#root > div > div > div > div.col-10.gameBoard > div.btn-group.btn-matrix > div:nth-child(9) > div > button.btn.btn-success.bingo-card-btn');
  const forthElement = Selector('#root > div > div > div > div.col-10.gameBoard > div.btn-group.btn-matrix > div:nth-child(17) > div > button.btn.btn-success.bingo-card-btn');
  const fifthElement = Selector('#root > div > div > div > div.col-10.gameBoard > div.btn-group.btn-matrix > div:nth-child(21) > div > button.btn.btn-success.bingo-card-btn');
  await t.click(firstElement);
  await t.click(secondElement);
  await t.click(forthElement);
  await t.click(fifthElement);
  await t.expect(firstBingoCard.hasClass('bingo-card')).eql(true);
  await t.expect(secondBingoCard.hasClass('bingo-card')).eql(true);
  await t.expect(forthBingoCard.hasClass('bingo-card')).eql(true);
  await t.expect(fifthBingoCard.hasClass('bingo-card')).eql(true);
})

test('ShouldUncolourBingoColumnInYellow',async t =>{
  const firstBingoCard=Selector('#root > div > div > div > div.col-10.gameBoard > div.btn-group.btn-matrix > div:nth-child(1) > div');
  const secondBingoCard=Selector('#root > div > div > div > div.col-10.gameBoard > div.btn-group.btn-matrix > div:nth-child(2) > div');
  const thirdBingoCard=Selector('#root > div > div > div > div.col-10.gameBoard > div.btn-group.btn-matrix > div:nth-child(3) > div');
  const forthBingoCard=Selector('#root > div > div > div > div.col-10.gameBoard > div.btn-group.btn-matrix > div:nth-child(4) > div');
  const fifthBingoCard=Selector('#root > div > div > div > div.col-10.gameBoard > div.btn-group.btn-matrix > div:nth-child(5) > div');
  await t.expect(firstBingoCard.hasClass('bingo-card')).eql(false);
  await t.expect(secondBingoCard.hasClass('bingo-card')).eql(false);
  await t.expect(thirdBingoCard.hasClass('bingo-card')).eql(false);
  await t.expect(forthBingoCard.hasClass('bingo-card')).eql(false);
  await t.expect(fifthBingoCard.hasClass('bingo-card')).eql(false);
  const totalScore=Selector('#root > div > div > div > div.col-10.gameBoard > div:nth-child(1) > div > h3');
  const firstElement = Selector('#root > div > div > div > div.col-10.gameBoard > div.btn-group.btn-matrix > div:nth-child(1) > div > button.btn.btn-success.bingo-card-btn');
  const secondElement = Selector('#root > div > div > div > div.col-10.gameBoard > div.btn-group.btn-matrix > div:nth-child(2) > div > button.btn.btn-success.bingo-card-btn');
  const thirdElement = Selector('#root > div > div > div > div.col-10.gameBoard > div.btn-group.btn-matrix > div:nth-child(3) > div > button.btn.btn-success.bingo-card-btn');
  const forthElement = Selector('#root > div > div > div > div.col-10.gameBoard > div.btn-group.btn-matrix > div:nth-child(4) > div > button.btn.btn-success.bingo-card-btn');
  const fifthElement = Selector('#root > div > div > div > div.col-10.gameBoard > div.btn-group.btn-matrix > div:nth-child(5) > div > button.btn.btn-success.bingo-card-btn');
  await t.click(firstElement);
  await t.click(secondElement);
  await t.click(thirdElement);
  await t.click(forthElement);
  await t.click(fifthElement);
  await t.expect(firstBingoCard.hasClass('bingo-card')).eql(true);
  await t.expect(secondBingoCard.hasClass('bingo-card')).eql(true);
  await t.expect(thirdBingoCard.hasClass('bingo-card')).eql(true);
  await t.expect(forthBingoCard.hasClass('bingo-card')).eql(true);
  await t.expect(fifthBingoCard.hasClass('bingo-card')).eql(true);
  const removeBtn= Selector('#root > div > div > div > div.col-10.gameBoard > div.btn-group.btn-matrix > div:nth-child(2) > div > button.btn.btn-danger.bingo-card-btn');
  await t.click(removeBtn);
  await t.expect(firstBingoCard.hasClass('bingo-card')).eql(false);
  await t.expect(secondBingoCard.hasClass('bingo-card')).eql(false);
  await t.expect(thirdBingoCard.hasClass('bingo-card')).eql(false);
  await t.expect(forthBingoCard.hasClass('bingo-card')).eql(false);
  await t.expect(fifthBingoCard.hasClass('bingo-card')).eql(false);
})

test('ShouldUncolourBingoLineInYellow',async t =>{
  const firstBingoCard=Selector('#root > div > div > div > div.col-10.gameBoard > div.btn-group.btn-matrix > div:nth-child(1) > div');
  const secondBingoCard=Selector('#root > div > div > div > div.col-10.gameBoard > div.btn-group.btn-matrix > div:nth-child(6) > div');
  const thirdBingoCard=Selector('#root > div > div > div > div.col-10.gameBoard > div.btn-group.btn-matrix > div:nth-child(11) > div');
  const forthBingoCard=Selector('#root > div > div > div > div.col-10.gameBoard > div.btn-group.btn-matrix > div:nth-child(16) > div');
  const fifthBingoCard=Selector('#root > div > div > div > div.col-10.gameBoard > div.btn-group.btn-matrix > div:nth-child(21) > div');
  await t.expect(firstBingoCard.hasClass('bingo-card')).eql(false);
  await t.expect(secondBingoCard.hasClass('bingo-card')).eql(false);
  await t.expect(thirdBingoCard.hasClass('bingo-card')).eql(false);
  await t.expect(forthBingoCard.hasClass('bingo-card')).eql(false);
  await t.expect(fifthBingoCard.hasClass('bingo-card')).eql(false);
  const totalScore=Selector('#root > div > div > div > div.col-10.gameBoard > div:nth-child(1) > div > h3');
  const firstElement = Selector('#root > div > div > div > div.col-10.gameBoard > div.btn-group.btn-matrix > div:nth-child(1) > div > button.btn.btn-success.bingo-card-btn');
  const secondElement = Selector('#root > div > div > div > div.col-10.gameBoard > div.btn-group.btn-matrix > div:nth-child(6) > div > button.btn.btn-success.bingo-card-btn');
  const thirdElement = Selector('#root > div > div > div > div.col-10.gameBoard > div.btn-group.btn-matrix > div:nth-child(11) > div > button.btn.btn-success.bingo-card-btn');
  const forthElement = Selector('#root > div > div > div > div.col-10.gameBoard > div.btn-group.btn-matrix > div:nth-child(16) > div > button.btn.btn-success.bingo-card-btn');
  const fifthElement = Selector('#root > div > div > div > div.col-10.gameBoard > div.btn-group.btn-matrix > div:nth-child(21) > div > button.btn.btn-success.bingo-card-btn');
  await t.click(firstElement);
  await t.click(secondElement);
  await t.click(thirdElement);
  await t.click(forthElement);
  await t.click(fifthElement);
  await t.expect(firstBingoCard.hasClass('bingo-card')).eql(true);
  await t.expect(secondBingoCard.hasClass('bingo-card')).eql(true);
  await t.expect(thirdBingoCard.hasClass('bingo-card')).eql(true);
  await t.expect(forthBingoCard.hasClass('bingo-card')).eql(true);
  await t.expect(fifthBingoCard.hasClass('bingo-card')).eql(true);
  const removeBtn=Selector('#root > div > div > div > div.col-10.gameBoard > div.btn-group.btn-matrix > div:nth-child(6) > div > button.btn.btn-danger.bingo-card-btn');
  await t.click(removeBtn);
  await t.expect(firstBingoCard.hasClass('bingo-card')).eql(false);
  await t.expect(secondBingoCard.hasClass('bingo-card')).eql(false);
  await t.expect(thirdBingoCard.hasClass('bingo-card')).eql(false);
  await t.expect(forthBingoCard.hasClass('bingo-card')).eql(false);
  await t.expect(fifthBingoCard.hasClass('bingo-card')).eql(false);
})
test('ShouldUncolourBingoDiagonalInYellow',async t =>{
  const firstBingoCard=Selector('#root > div > div > div > div.col-10.gameBoard > div.btn-group.btn-matrix > div:nth-child(1) > div');
  const secondBingoCard=Selector('#root > div > div > div > div.col-10.gameBoard > div.btn-group.btn-matrix > div:nth-child(7) > div');
  const forthBingoCard=Selector('#root > div > div > div > div.col-10.gameBoard > div.btn-group.btn-matrix > div:nth-child(19) > div');
  const fifthBingoCard=Selector('#root > div > div > div > div.col-10.gameBoard > div.btn-group.btn-matrix > div:nth-child(25) > div');
  await t.expect(firstBingoCard.hasClass('bingo-card')).eql(false);
  await t.expect(secondBingoCard.hasClass('bingo-card')).eql(false);
  await t.expect(forthBingoCard.hasClass('bingo-card')).eql(false);
  await t.expect(fifthBingoCard.hasClass('bingo-card')).eql(false);
  const totalScore=Selector('#root > div > div > div > div.col-10.gameBoard > div:nth-child(1) > div > h3');
  const firstElement = Selector('#root > div > div > div > div.col-10.gameBoard > div.btn-group.btn-matrix > div:nth-child(1) > div > button.btn.btn-success.bingo-card-btn');
  const secondElement = Selector('#root > div > div > div > div.col-10.gameBoard > div.btn-group.btn-matrix > div:nth-child(7) > div > button.btn.btn-success.bingo-card-btn');
  const forthElement = Selector('#root > div > div > div > div.col-10.gameBoard > div.btn-group.btn-matrix > div:nth-child(19) > div > button.btn.btn-success.bingo-card-btn');
  const fifthElement = Selector('#root > div > div > div > div.col-10.gameBoard > div.btn-group.btn-matrix > div:nth-child(25) > div > button.btn.btn-success.bingo-card-btn');
  await t.click(firstElement);
  await t.click(secondElement);
  await t.click(forthElement);
  await t.click(fifthElement);
  await t.expect(firstBingoCard.hasClass('bingo-card')).eql(true);
  await t.expect(secondBingoCard.hasClass('bingo-card')).eql(true);
  await t.expect(forthBingoCard.hasClass('bingo-card')).eql(true);
  await t.expect(fifthBingoCard.hasClass('bingo-card')).eql(true);
  const removeBtn=Selector('#root > div > div > div > div.col-10.gameBoard > div.btn-group.btn-matrix > div:nth-child(7) > div > button.btn.btn-danger.bingo-card-btn');
  await t.click(removeBtn);
  await t.expect(firstBingoCard.hasClass('bingo-card')).eql(false);
  await t.expect(secondBingoCard.hasClass('bingo-card')).eql(false);
  await t.expect(forthBingoCard.hasClass('bingo-card')).eql(false);
  await t.expect(fifthBingoCard.hasClass('bingo-card')).eql(false);
})
test('ShouldUncolourBingoInvertedDiagonalInYellow',async t =>{
  const firstBingoCard=Selector('#root > div > div > div > div.col-10.gameBoard > div.btn-group.btn-matrix > div:nth-child(5) > div');
  const secondBingoCard=Selector('#root > div > div > div > div.col-10.gameBoard > div.btn-group.btn-matrix > div:nth-child(9) > div');
  const forthBingoCard=Selector('#root > div > div > div > div.col-10.gameBoard > div.btn-group.btn-matrix > div:nth-child(17) > div');
  const fifthBingoCard=Selector('#root > div > div > div > div.col-10.gameBoard > div.btn-group.btn-matrix > div:nth-child(21) > div');
  await t.expect(firstBingoCard.hasClass('bingo-card')).eql(false);
  await t.expect(secondBingoCard.hasClass('bingo-card')).eql(false);
  await t.expect(forthBingoCard.hasClass('bingo-card')).eql(false);
  await t.expect(fifthBingoCard.hasClass('bingo-card')).eql(false);
  const totalScore=Selector('#root > div > div > div > div.col-10.gameBoard > div:nth-child(1) > div > h3');
  const firstElement = Selector('#root > div > div > div > div.col-10.gameBoard > div.btn-group.btn-matrix > div:nth-child(5) > div > button.btn.btn-success.bingo-card-btn');
  const secondElement = Selector('#root > div > div > div > div.col-10.gameBoard > div.btn-group.btn-matrix > div:nth-child(9) > div > button.btn.btn-success.bingo-card-btn');
  const forthElement = Selector('#root > div > div > div > div.col-10.gameBoard > div.btn-group.btn-matrix > div:nth-child(17) > div > button.btn.btn-success.bingo-card-btn');
  const fifthElement = Selector('#root > div > div > div > div.col-10.gameBoard > div.btn-group.btn-matrix > div:nth-child(21) > div > button.btn.btn-success.bingo-card-btn');
  await t.click(firstElement);
  await t.click(secondElement);
  await t.click(forthElement);
  await t.click(fifthElement);
  await t.expect(firstBingoCard.hasClass('bingo-card')).eql(true);
  await t.expect(secondBingoCard.hasClass('bingo-card')).eql(true);
  await t.expect(forthBingoCard.hasClass('bingo-card')).eql(true);
  await t.expect(fifthBingoCard.hasClass('bingo-card')).eql(true);
  const removeBtn=Selector('#root > div > div > div > div.col-10.gameBoard > div.btn-group.btn-matrix > div:nth-child(9) > div > button.btn.btn-danger.bingo-card-btn');
  await t.click(removeBtn);
  await t.expect(firstBingoCard.hasClass('bingo-card')).eql(false);
  await t.expect(secondBingoCard.hasClass('bingo-card')).eql(false);
  await t.expect(forthBingoCard.hasClass('bingo-card')).eql(false);
  await t.expect(fifthBingoCard.hasClass('bingo-card')).eql(false);
})
